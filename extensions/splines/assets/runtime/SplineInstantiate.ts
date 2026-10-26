import { _decorator, Component, ccenum, CCObject, instantiate, Node, Prefab, Quat, Vec2, Vec3 } from 'cc';
import { EDITOR } from 'cc/env';
import { SplineContainer } from './SplineContainer';
import { AlignAxis } from './SplineAnimate';

const { ccclass, property, executeInEditMode, menu } = _decorator;

export enum InstantiateMethod {
    /** A set number of instances, spread evenly. */
    InstanceCount = 0,
    /** A distance along the spline between instances. */
    SpacingDistance = 1,
    /** A straight-line distance between instances. */
    LinearDistance = 2,
}

export enum InstantiateSpace {
    /** Orient instances along the spline. */
    Spline = 0,
    /** Orient instances like the spline container node. */
    SplineObject = 1,
    /** Orient instances to the world axes. */
    World = 2,
}

export enum OffsetSpace {
    Spline = 0,
    SplineObject = 1,
    World = 2,
    /** The instance's own axes. */
    Object = 3,
}

ccenum(InstantiateMethod);
ccenum(InstantiateSpace);
ccenum(OffsetSpace);

@ccclass('splines.InstantiableItem')
export class InstantiableItem {
    @property({ type: Prefab, tooltip: 'Prefab to place.' })
    prefab: Prefab | null = null;

    @property({ range: [0, 100, 1], slide: true, tooltip: 'Relative chance of picking this prefab (%).' })
    probability = 100;
}

/** A min/max range per axis; axes without `random` use min. */
@ccclass('splines.InstantiateOffset')
export class InstantiateOffset {
    @property
    min = new Vec3();

    @property
    max = new Vec3();

    @property({ tooltip: 'Pick X at random between min and max.' })
    randomX = false;

    @property({ tooltip: 'Pick Y at random between min and max.' })
    randomY = false;

    @property({ tooltip: 'Pick Z at random between min and max.' })
    randomZ = false;

    @property({ type: OffsetSpace, tooltip: 'Axes the offset is applied along.' })
    space = OffsetSpace.Spline;

    constructor(space = OffsetSpace.Spline) {
        this.space = space;
    }

    get isZero(): boolean {
        return this.min.equals(Vec3.ZERO) && this.max.equals(Vec3.ZERO);
    }

    next(rand: () => number, out: Vec3): Vec3 {
        const pick = (lo: number, hi: number, random: boolean) => (random ? lo + (hi - lo) * rand() : lo);
        return out.set(
            pick(this.min.x, this.max.x, this.randomX),
            pick(this.min.y, this.max.y, this.randomY),
            pick(this.min.z, this.max.z, this.randomZ),
        );
    }
}

const AXES = [
    new Vec3(1, 0, 0), new Vec3(0, 1, 0), new Vec3(0, 0, 1),
    new Vec3(-1, 0, 0), new Vec3(0, -1, 0), new Vec3(0, 0, -1),
];

const GENERATED_FLAGS = CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy | CCObject.Flags.LockedInEditor;
const ROOT_NAME = '__SplineInstances';

/** Small deterministic PRNG (mulberry32). */
function rng(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const _p = new Vec3();
const _f = new Vec3();
const _u = new Vec3();
const _r = new Vec3();
const _q = new Quat();
const _q2 = new Quat();
const _off = new Vec3();

function lookRotation(out: Quat, forward: Readonly<Vec3>, up: Readonly<Vec3>): Quat {
    return Quat.fromViewUp(out, Vec3.normalize(new Vec3(), forward), Vec3.normalize(new Vec3(), up));
}

export interface Placement {
    spline: number;
    t: number;
    item: number;
    position: Vec3;
    rotation: Quat;
    scale: Vec3;
}

/**
 * Places prefab instances along the splines of a container (Unity's
 * SplineInstantiate). Instances are generated (not saved with the scene) and
 * rebuilt when the spline or a setting changes. Use Bake in the Inspector to
 * turn them into regular nodes.
 */
@ccclass('SplineInstantiate')
@executeInEditMode
@menu('Splines/SplineInstantiate')
export class SplineInstantiate extends Component {
    @property({ type: SplineContainer, tooltip: 'The splines to place instances along (all splines of the container).' })
    container: SplineContainer | null = null;

    @property({ type: [InstantiableItem], tooltip: 'Prefabs to place, picked at random by probability.' })
    items: InstantiableItem[] = [new InstantiableItem()];

    @property({ type: InstantiateMethod, tooltip: 'How instances are spaced.' })
    method = InstantiateMethod.SpacingDistance;

    @property({ tooltip: 'Number of instances per spline (random between x and y).', visible(this: SplineInstantiate) { return this.method === InstantiateMethod.InstanceCount; } })
    count = new Vec2(10, 10);

    @property({ tooltip: 'Distance between instances (random between x and y).', visible(this: SplineInstantiate) { return this.method !== InstantiateMethod.InstanceCount; } })
    spacing = new Vec2(1, 1);

    @property({ type: InstantiateSpace, tooltip: 'Axes the instances are oriented to.' })
    space = InstantiateSpace.Spline;

    @property({ type: AlignAxis, tooltip: 'Instance axis that points up.' })
    upAxis = AlignAxis.YAxis;

    @property({ type: AlignAxis, tooltip: 'Instance axis that points forward (along the spline).' })
    forwardAxis = AlignAxis.ZAxis;

    @property({ type: InstantiateOffset, tooltip: 'Position offset.' })
    positionOffset = new InstantiateOffset();

    @property({ type: InstantiateOffset, tooltip: 'Rotation offset (Euler angles, degrees).' })
    rotationOffset = new InstantiateOffset();

    @property({ type: InstantiateOffset, tooltip: 'Scale offset (added to the prefab’s scale).' })
    scaleOffset = new InstantiateOffset(OffsetSpace.Object);

    @property({ tooltip: 'Rebuild when the spline or a setting changes.' })
    autoRefresh = true;

    @property({ tooltip: 'Random seed.', step: 1 })
    seed = 0;

    private _root: Node | null = null;
    private _stamp = NaN;
    private _instances: Node[] = [];

    /** The generated instances. */
    get instances(): readonly Node[] {
        return this._instances;
    }

    resetInEditor() {
        this.container = this.getComponent(SplineContainer);
    }

    onLoad() {
        if (!this.container) this.container = this.getComponent(SplineContainer);
    }

    onEnable() {
        this.updateInstances();
    }

    onDisable() {
        this.clear();
    }

    onDestroy() {
        this.clear();
        if (this._root?.isValid) this._root.destroy();
        this._root = null;
    }

    update() {
        if (!this.autoRefresh) return;
        if (this.computeStamp() !== this._stamp) this.updateInstances();
    }

    /** Picks a new random seed and rebuilds. */
    randomizeSeed(): void {
        this.seed = Math.floor(Math.random() * 1e6);
        this.updateInstances();
    }

    private computeStamp(): number {
        const c = this.container;
        let h = c && c.isValid ? c.changeStamp : 0;
        const mix = (v: number) => {
            h = Math.imul(h ^ Math.round(v * 1e4), 16777619);
        };
        mix(this.method);
        mix(this.count.x);
        mix(this.count.y);
        mix(this.spacing.x);
        mix(this.spacing.y);
        mix(this.space);
        mix(this.upAxis);
        mix(this.forwardAxis);
        mix(this.seed);
        for (const o of [this.positionOffset, this.rotationOffset, this.scaleOffset]) {
            mix(o.min.x); mix(o.min.y); mix(o.min.z);
            mix(o.max.x); mix(o.max.y); mix(o.max.z);
            mix((o.randomX ? 1 : 0) | (o.randomY ? 2 : 0) | (o.randomZ ? 4 : 0));
            mix(o.space);
        }
        mix(this.items.length);
        for (const it of this.items) {
            mix(it.probability);
            const id = it.prefab ? String((it.prefab as any)._uuid || it.prefab.name || 'prefab') : '';
            for (let i = 0; i < id.length; i++) mix(id.charCodeAt(i));
        }
        if (c && c.isValid) {
            const m = c.node.worldMatrix;
            mix(m.m12); mix(m.m13); mix(m.m14); mix(m.m00); mix(m.m05); mix(m.m10); mix(m.m01); mix(m.m02);
        }
        return h;
    }

    /** Removes the generated instances. */
    clear(): void {
        for (const n of this._instances) if (n.isValid) n.destroy();
        this._instances.length = 0;
        if (this._root?.isValid) {
            for (const n of [...this._root.children]) n.destroy();
        }
    }

    private ensureRoot(): Node {
        if (this._root && this._root.isValid && this._root.parent === this.node) return this._root;
        let root = this.node.children.find((n) => n.name === ROOT_NAME && (n as any)._objFlags & CCObject.Flags.DontSave) || null;
        if (!root) {
            root = new Node(ROOT_NAME);
            (root as any)._objFlags |= GENERATED_FLAGS;
            root.parent = this.node;
        }
        this._root = root;
        return root;
    }

    /** Where instances go: positions, rotations and scales (world space) and which item. */
    computePlacements(): Placement[] {
        const c = this.container;
        const res: Placement[] = [];
        if (!c || !c.isValid) return res;
        const weights = this.items.map((it) => (it.prefab ? Math.max(0, it.probability) : 0));
        const total = weights.reduce((a, b) => a + b, 0);
        if (total <= 0) return res;
        const rand = rng(this.seed * 7919 + 1);
        const pickItem = () => {
            let r = rand() * total;
            for (let i = 0; i < weights.length; i++) {
                r -= weights[i];
                if (r < 0 && weights[i] > 0) return i;
            }
            return weights.findIndex((w) => w > 0);
        };
        const fwdAxis = AXES[this.forwardAxis] ?? AXES[2];
        let upAxis = AXES[this.upAxis] ?? AXES[1];
        if (Math.abs(Vec3.dot(fwdAxis, upAxis)) > 0.99) upAxis = Math.abs(fwdAxis.y) > 0.99 ? AXES[2] : AXES[1];
        const remap = Quat.invert(new Quat(), lookRotation(new Quat(), fwdAxis, upAxis));

        for (let si = 0; si < c.splines.length; si++) {
            const s = c.splines[si];
            if (s.count < 2) continue;
            const length = c.calculateLength(si);
            if (length <= 1e-6) continue;
            const ts = this.distributeT(c, si, length, s.closed, rand);
            for (const t of ts) {
                const item = pickItem();
                if (item < 0) continue;
                c.evaluatePosition(t, si, _p);
                switch (this.space) {
                    case InstantiateSpace.Spline:
                        c.evaluateDirection(t, si, _f);
                        c.evaluateUpVector(t, si, _u);
                        break;
                    case InstantiateSpace.SplineObject:
                        Vec3.transformQuat(_f, Vec3.UNIT_Z, c.node.worldRotation);
                        Vec3.transformQuat(_u, Vec3.UNIT_Y, c.node.worldRotation);
                        break;
                    default:
                        _f.set(0, 0, 1);
                        _u.set(0, 1, 0);
                        break;
                }
                const frame = lookRotation(new Quat(), _f, _u);
                const rotation = Quat.multiply(new Quat(), frame, remap);
                const position = _p.clone();
                const prefabNode = this.items[item].prefab!.data as Node;
                const scale = prefabNode ? prefabNode.scale.clone() : new Vec3(1, 1, 1);

                if (!this.positionOffset.isZero) {
                    this.positionOffset.next(rand, _off);
                    Vec3.transformQuat(_off, _off, this.offsetRotation(this.positionOffset.space, frame, c, rotation));
                    position.add(_off);
                }
                if (!this.rotationOffset.isZero) {
                    this.rotationOffset.next(rand, _off);
                    Quat.fromEuler(_q2, _off.x, _off.y, _off.z);
                    const sp = this.rotationOffset.space;
                    if (sp === OffsetSpace.Object) Quat.multiply(rotation, rotation, _q2);
                    else {
                        // Rotate about the chosen axes: R' = S * Δ * S⁻¹ * R
                        const S = this.offsetRotation(sp, frame, c, rotation).clone();
                        Quat.multiply(_q, S, _q2);
                        Quat.multiply(_q, _q, Quat.invert(new Quat(), S));
                        Quat.multiply(rotation, _q, rotation);
                    }
                }
                if (!this.scaleOffset.isZero) {
                    this.scaleOffset.next(rand, _off);
                    scale.add(_off);
                }
                res.push({ spline: si, t, item, position, rotation, scale });
            }
        }
        return res;
    }

    private offsetRotation(space: OffsetSpace, splineFrame: Quat, c: SplineContainer, instanceRotation: Quat): Quat {
        switch (space) {
            case OffsetSpace.Spline: return splineFrame;
            case OffsetSpace.SplineObject: return c.node.worldRotation as Quat;
            case OffsetSpace.Object: return instanceRotation;
            default: return Quat.IDENTITY as Quat;
        }
    }

    /** Normalized t values of the instances on one spline. */
    private distributeT(c: SplineContainer, si: number, length: number, closed: boolean, rand: () => number): number[] {
        const ts: number[] = [];
        const lo = (a: number, b: number) => Math.min(a, b);
        const hi = (a: number, b: number) => Math.max(a, b);
        if (this.method === InstantiateMethod.InstanceCount) {
            const a = Math.max(0, Math.round(lo(this.count.x, this.count.y)));
            const b = Math.max(0, Math.round(hi(this.count.x, this.count.y)));
            const n = a + Math.floor(rand() * (b - a + 1));
            if (n === 1) ts.push(0);
            else for (let i = 0; i < n; i++) ts.push(closed ? i / n : i / (n - 1));
            return ts;
        }
        const minS = Math.max(1e-3, lo(this.spacing.x, this.spacing.y));
        const maxS = Math.max(minS, hi(this.spacing.x, this.spacing.y));
        const next = () => minS + (maxS - minS) * rand();
        const MAX = 10000;
        if (this.method === InstantiateMethod.SpacingDistance) {
            let d = 0;
            while (d <= length + 1e-6 && ts.length < MAX) {
                if (closed && d >= length - 1e-6 && ts.length) break;
                ts.push(Math.min(1, d / length));
                d += next();
            }
            return ts;
        }
        // Linear distance: walk the spline until the straight-line distance reaches the spacing.
        const steps = Math.max(64, Math.ceil(length / minS) * 8);
        let t = 0;
        ts.push(0);
        const from = c.evaluatePosition(0, si, new Vec3());
        let want = next();
        const p = new Vec3();
        for (let i = 1; i <= steps && ts.length < MAX; i++) {
            const ti = i / steps;
            c.evaluatePosition(ti, si, p);
            if (Vec3.distance(p, from) >= want - 1e-6) {
                // Refine between the previous step and this one.
                let a = t;
                let b = ti;
                for (let k = 0; k < 12; k++) {
                    const m = (a + b) / 2;
                    c.evaluatePosition(m, si, p);
                    if (Vec3.distance(p, from) >= want - 1e-6) b = m;
                    else a = m;
                }
                if (closed && b >= 1 - 1e-6) break;
                ts.push(b);
                c.evaluatePosition(b, si, from);
                want = next();
                t = b;
            } else {
                t = ti;
            }
        }
        return ts;
    }

    /** Rebuilds the instances now. */
    updateInstances(): void {
        this._stamp = this.computeStamp();
        this.clear();
        if (!this.enabledInHierarchy) return;
        const placements = this.computePlacements();
        if (!placements.length) return;
        const root = this.ensureRoot();
        root.layer = this.node.layer;
        for (const pl of placements) {
            const prefab = this.items[pl.item].prefab;
            if (!prefab) continue;
            const n = instantiate(prefab);
            (n as any)._objFlags |= GENERATED_FLAGS;
            n.parent = root;
            n.setWorldPosition(pl.position);
            n.setWorldRotation(pl.rotation);
            n.setScale(pl.scale);
            this._instances.push(n);
        }
    }

    /** Editor helper: placements with prefab uuids, for baking into regular nodes. */
    _bakeInfo(): { prefab: string; position: number[]; rotation: number[]; scale: number[] }[] {
        if (!EDITOR) return [];
        return this.computePlacements()
            .filter((p) => this.items[p.item].prefab)
            .map((p) => ({
                prefab: (this.items[p.item].prefab as any)._uuid as string,
                position: [p.position.x, p.position.y, p.position.z],
                rotation: [p.rotation.x, p.rotation.y, p.rotation.z, p.rotation.w],
                scale: [p.scale.x, p.scale.y, p.scale.z],
            }));
    }
}
