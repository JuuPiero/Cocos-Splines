import {
    _decorator, Component, ccenum, CCObject, director, js, Material, Mat4, Mesh, MeshRenderer, Node, utils, Vec2, Vec3,
} from 'cc';
import { EDITOR } from 'cc/env';
import { SplineContainer } from './SplineContainer';
import { Spline } from './Spline';

const { ccclass, property, executeInEditMode, menu } = _decorator;

export enum ExtrudeShape {
    /** A tube. */
    Circle = 0,
    /** A square tube. */
    Square = 1,
    /** A flat strip facing the spline's up vector. */
    Road = 2,
    /** The first spline of another container, read in its XY plane. */
    Spline = 3,
}
ccenum(ExtrudeShape);

/** Hidden child that holds the generated mesh: not saved, not listed, not pickable. */
const GENERATED_FLAGS = CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy | CCObject.Flags.LockedInEditor;

interface Profile {
    /** 2D points (x along the right vector, y along up). */
    points: number[];
    normals: number[];
    u: number[];
    /** Pairs of point indices that form faces. */
    edges: number[];
    /** Profile encloses an area (caps possible). */
    closed: boolean;
    /** Perimeter of the profile at radius 1, for texture scale along the spline. */
    perimeter: number;
}

const _p = new Vec3();
const _f = new Vec3();
const _u = new Vec3();
const _r = new Vec3();
const _m = new Mat4();

/**
 * Builds a mesh along the splines of a container (Unity's SplineExtrude).
 * The mesh is regenerated when the spline or a setting changes; it lives on
 * a hidden child node and is not saved with the scene.
 */
@ccclass('SplineExtrude')
@executeInEditMode
@menu('Splines/SplineExtrude')
export class SplineExtrude extends Component {
    @property({ type: SplineContainer, tooltip: 'The splines to extrude (all splines of the container).' })
    container: SplineContainer | null = null;

    @property({ type: Material, tooltip: 'Material of the generated mesh.' })
    material: Material | null = null;

    @property({ tooltip: 'Rebuild the mesh when the spline changes (at runtime too).' })
    rebuildOnSplineChange = true;

    @property({ tooltip: 'At most this many rebuilds per second at runtime.', min: 1, step: 1, visible(this: SplineExtrude) { return this.rebuildOnSplineChange; } })
    rebuildFrequency = 30;

    @property({ type: ExtrudeShape, tooltip: 'Cross-section of the mesh.' })
    shape = ExtrudeShape.Circle;

    @property({ tooltip: 'Sides of the circle.', min: 3, step: 1, visible(this: SplineExtrude) { return this.shape === ExtrudeShape.Circle; } })
    sides = 8;

    @property({ type: SplineContainer, tooltip: 'Container whose first spline is the cross-section (in its XY plane).', visible(this: SplineExtrude) { return this.shape === ExtrudeShape.Spline; } })
    profile: SplineContainer | null = null;

    @property({ tooltip: 'Points sampled along the profile spline.', min: 2, step: 1, visible(this: SplineExtrude) { return this.shape === ExtrudeShape.Spline; } })
    profileSegments = 16;

    @property({ tooltip: 'Radius (half width) of the cross-section.', min: 0 })
    radius = 0.25;

    @property({ tooltip: 'Edge loops per unit of spline length.', min: 0.01 })
    segmentsPerUnit = 4;

    @property({ tooltip: 'Close the ends of open splines.' })
    capped = true;

    @property({ tooltip: 'Part of each spline to extrude (0..1).' })
    range = new Vec2(0, 1);

    @property({ tooltip: 'Turn the mesh inside out.' })
    flipNormals = false;

    @property({ tooltip: 'Cast shadows.' })
    castShadows = true;

    @property({ tooltip: 'Receive shadows.' })
    receiveShadows = true;

    @property({ tooltip: 'Add a MeshCollider using the generated mesh (needs a physics backend with mesh colliders).' })
    generateCollider = false;

    private _child: Node | null = null;
    private _mesh: Mesh | null = null;
    private _stamp = NaN;
    private _lastBuild = -Infinity;
    private _fallbackMaterial: Material | null = null;

    /** The generated mesh (null before the first build). */
    get mesh(): Mesh | null {
        return this._mesh;
    }

    resetInEditor() {
        this.container = this.getComponent(SplineContainer);
    }

    onLoad() {
        if (!this.container) this.container = this.getComponent(SplineContainer);
    }

    onEnable() {
        this.rebuild();
    }

    onDisable() {
        if (this._child) this._child.active = false;
    }

    onDestroy() {
        if (this._child && this._child.isValid) this._child.destroy();
        this._child = null;
        this._mesh?.destroy();
        this._mesh = null;
    }

    update() {
        if (!EDITOR && !this.rebuildOnSplineChange) return;
        const stamp = this.computeStamp();
        if (stamp === this._stamp) return;
        if (!EDITOR) {
            const now = director.getTotalTime() / 1000;
            if (now - this._lastBuild < 1 / Math.max(1, this.rebuildFrequency)) return;
            this._lastBuild = now;
        }
        this.rebuild();
    }

    private computeStamp(): number {
        const c = this.container;
        let h = c && c.isValid ? c.changeStamp : 0;
        const mix = (v: number) => {
            h = Math.imul(h ^ Math.round(v * 1e5), 16777619);
        };
        mix(this.shape);
        mix(this.sides);
        mix(this.radius);
        mix(this.segmentsPerUnit);
        mix(this.capped ? 1 : 0);
        mix(this.range.x);
        mix(this.range.y);
        mix(this.flipNormals ? 1 : 0);
        mix(this.castShadows ? 1 : 0);
        mix(this.receiveShadows ? 1 : 0);
        mix(this.generateCollider ? 1 : 0);
        mix(this.profileSegments);
        if (this.profile && this.shape === ExtrudeShape.Spline) mix(this.profile.changeStamp);
        if (c && c.isValid && c.node !== this.node) {
            Mat4.invert(_m, this.node.worldMatrix);
            Mat4.multiply(_m, _m, c.node.worldMatrix);
            for (const v of Mat4.toArray([], _m)) mix(v);
        }
        h = Math.imul(h ^ (this.material ? 1 : 0), 16777619);
        return h;
    }

    /** Regenerates the mesh now. */
    rebuild(): void {
        this._stamp = this.computeStamp();
        const geometry = this.buildGeometry();
        const child = this.ensureChild();
        const renderer = child.getComponent(MeshRenderer) || child.addComponent(MeshRenderer);
        const old = this._mesh;
        if (!geometry) {
            renderer.mesh = null;
            this._mesh = null;
        } else {
            this._mesh = utils.MeshUtils.createMesh(geometry, undefined, { calculateBounds: true });
            renderer.mesh = this._mesh;
        }
        if (old && old !== this._mesh) old.destroy();
        const mat = this.material || this.fallbackMaterial();
        if (mat) renderer.setSharedMaterial(mat, 0);
        renderer.shadowCastingMode = this.castShadows ? 1 : 0;
        renderer.receiveShadow = this.receiveShadows ? 1 : 0;
        this.updateCollider(child);
        child.active = this.enabledInHierarchy;
    }

    private fallbackMaterial(): Material | null {
        if (this._fallbackMaterial) return this._fallbackMaterial;
        try {
            const m = new Material();
            m.initialize({ effectName: 'builtin-standard' });
            this._fallbackMaterial = m;
        } catch {
            this._fallbackMaterial = null;
        }
        return this._fallbackMaterial;
    }

    private ensureChild(): Node {
        if (this._child && this._child.isValid && this._child.parent === this.node) return this._child;
        // Reuse a generated child left over from a previous instance (e.g. after undo).
        let child = this.node.children.find((n) => n.name === '__SplineExtrudeMesh' && (n as any)._objFlags & CCObject.Flags.DontSave) || null;
        if (!child) {
            child = new Node('__SplineExtrudeMesh');
            (child as any)._objFlags |= GENERATED_FLAGS;
            child.parent = this.node;
        }
        child.layer = this.node.layer;
        this._child = child;
        return child;
    }

    private updateCollider(child: Node): void {
        const ColliderClass = js.getClassByName('cc.MeshCollider') as any;
        if (!ColliderClass) return;
        let collider = child.getComponent(ColliderClass) as any;
        if (!this.generateCollider || !this._mesh) {
            if (collider) collider.destroy();
            return;
        }
        if (!collider) collider = child.addComponent(ColliderClass);
        collider.mesh = this._mesh;
    }

    private makeProfile(): Profile | null {
        const p: Profile = { points: [], normals: [], u: [], edges: [], closed: true, perimeter: 0 };
        switch (this.shape) {
            case ExtrudeShape.Circle: {
                const n = Math.max(3, Math.round(this.sides));
                for (let j = 0; j <= n; j++) {
                    const a = (j / n) * Math.PI * 2;
                    p.points.push(Math.cos(a), Math.sin(a));
                    p.normals.push(Math.cos(a), Math.sin(a));
                    p.u.push(j / n);
                    if (j < n) p.edges.push(j, j + 1);
                }
                p.perimeter = Math.PI * 2;
                return p;
            }
            case ExtrudeShape.Square: {
                // Counter-clockwise corners in the (right, up) plane, two vertices per side for flat normals.
                const c = [[1, -1], [1, 1], [-1, 1], [-1, -1]];
                for (let k = 0; k < 4; k++) {
                    const a = c[k];
                    const b = c[(k + 1) % 4];
                    const nx = (a[0] + b[0]) / 2;
                    const ny = (a[1] + b[1]) / 2;
                    const i = p.points.length / 2;
                    p.points.push(a[0], a[1], b[0], b[1]);
                    p.normals.push(nx, ny, nx, ny);
                    p.u.push(k / 4, (k + 1) / 4);
                    p.edges.push(i, i + 1);
                }
                p.perimeter = 8;
                return p;
            }
            case ExtrudeShape.Road:
                p.points.push(1, 0, -1, 0);
                p.normals.push(0, 1, 0, 1);
                p.u.push(0, 1);
                p.edges.push(0, 1);
                p.closed = false;
                p.perimeter = 2;
                return p;
            case ExtrudeShape.Spline:
                return this.splineProfile();
        }
        return null;
    }

    private splineProfile(): Profile | null {
        const s: Spline | undefined = this.profile?.splines[0];
        if (!s || s.count < 2) return null;
        const n = Math.max(2, Math.round(this.profileSegments));
        const p: Profile = { points: [], normals: [], u: [], edges: [], closed: s.closed, perimeter: 0 };
        const pts: number[] = [];
        for (let j = 0; j <= n; j++) {
            s.evaluatePosition(j / n, _p);
            pts.push(_p.x, _p.y);
        }
        // Scale so the profile fits a unit radius (the radius setting sizes it).
        let ext = 0;
        for (const v of pts) ext = Math.max(ext, Math.abs(v));
        const k = ext > 0 ? 1 / ext : 1;
        let dist = 0;
        for (let j = 0; j <= n; j++) {
            const x = pts[j * 2] * k;
            const y = pts[j * 2 + 1] * k;
            if (j > 0) dist += Math.hypot(x - pts[j * 2 - 2] * k, y - pts[j * 2 - 1] * k);
            s.evaluateDirection(j / n, _f);
            // Normal: the direction turned -90 degrees (outward for counter-clockwise profiles).
            const l = Math.hypot(_f.x, _f.y) || 1;
            p.points.push(x, y);
            p.normals.push(_f.y / l, -_f.x / l);
            p.u.push(0);
            if (j < n) p.edges.push(j, j + 1);
        }
        for (let j = 0; j <= n; j++) p.u[j] = (j / n);
        p.perimeter = dist;
        return p;
    }

    private buildGeometry(): { positions: number[]; normals: number[]; uvs: number[]; indices: number[]; minPos: Vec3; maxPos: Vec3 } | null {
        const c = this.container;
        if (!c || !c.isValid) return null;
        const profile = this.makeProfile();
        if (!profile) return null;
        const positions: number[] = [];
        const normals: number[] = [];
        const uvs: number[] = [];
        const indices: number[] = [];
        const min = new Vec3(Infinity, Infinity, Infinity);
        const max = new Vec3(-Infinity, -Infinity, -Infinity);

        // Container space to this node's space.
        const sameNode = c.node === this.node;
        if (!sameNode) {
            Mat4.invert(_m, this.node.worldMatrix);
            Mat4.multiply(_m, _m, c.node.worldMatrix);
        }
        const r0 = Math.max(0, Math.min(1, Math.min(this.range.x, this.range.y)));
        const r1 = Math.max(0, Math.min(1, Math.max(this.range.x, this.range.y)));
        if (r1 - r0 <= 1e-6) return null;
        const radius = this.radius;
        const pc = profile.points.length / 2;

        const addVertex = (x: number, y: number, z: number, nx: number, ny: number, nz: number, u: number, v: number) => {
            positions.push(x, y, z);
            normals.push(this.flipNormals ? -nx : nx, this.flipNormals ? -ny : ny, this.flipNormals ? -nz : nz);
            uvs.push(u, v);
            if (x < min.x) min.x = x;
            if (y < min.y) min.y = y;
            if (z < min.z) min.z = z;
            if (x > max.x) max.x = x;
            if (y > max.y) max.y = y;
            if (z > max.z) max.z = z;
            return positions.length / 3 - 1;
        };
        const tri = (a: number, b: number, cc: number) => {
            if (this.flipNormals) indices.push(a, cc, b);
            else indices.push(a, b, cc);
        };

        for (const s of c.splines) {
            if (s.count < 2) continue;
            const length = s.getLength();
            if (length <= 1e-6) continue;
            const segments = Math.max(1, Math.ceil(length * (r1 - r0) * this.segmentsPerUnit));
            const loop = s.closed && r0 <= 0 && r1 >= 1;
            const base = positions.length / 3;
            const ringFrames: { p: Vec3; f: Vec3; u: Vec3; r: Vec3 }[] = [];
            const texScale = 1 / Math.max(1e-6, radius * profile.perimeter);

            for (let i = 0; i <= segments; i++) {
                const t = r0 + ((r1 - r0) * i) / segments;
                s.evaluatePosition(t, _p);
                s.evaluateDirection(t, _f);
                s.evaluateUpVector(t, _u);
                if (!sameNode) {
                    Vec3.transformMat4(_p, _p, _m);
                    Vec3.transformMat4Normal(_f, _f, _m).normalize();
                    Vec3.transformMat4Normal(_u, _u, _m).normalize();
                }
                Vec3.cross(_r, _u, _f).normalize();
                Vec3.cross(_u, _f, _r).normalize();
                ringFrames.push({ p: _p.clone(), f: _f.clone(), u: _u.clone(), r: _r.clone() });
                const v = (length * (t - r0)) * texScale;
                for (let j = 0; j < pc; j++) {
                    const px = profile.points[j * 2] * radius;
                    const py = profile.points[j * 2 + 1] * radius;
                    const nx = profile.normals[j * 2];
                    const ny = profile.normals[j * 2 + 1];
                    addVertex(
                        _p.x + _r.x * px + _u.x * py, _p.y + _r.y * px + _u.y * py, _p.z + _r.z * px + _u.z * py,
                        _r.x * nx + _u.x * ny, _r.y * nx + _u.y * ny, _r.z * nx + _u.z * ny,
                        profile.u[j], v,
                    );
                }
            }
            for (let i = 0; i < segments; i++) {
                const ra = base + i * pc;
                const rb = base + (i + 1) * pc;
                for (let e = 0; e < profile.edges.length; e += 2) {
                    const a = profile.edges[e];
                    const b = profile.edges[e + 1];
                    tri(ra + a, ra + b, rb + a);
                    tri(ra + b, rb + b, rb + a);
                }
            }
            if (this.capped && profile.closed && !loop) {
                this.addCap(ringFrames[0], profile, radius, true, addVertex, tri);
                this.addCap(ringFrames[ringFrames.length - 1], profile, radius, false, addVertex, tri);
            }
        }
        if (!indices.length) return null;
        return { positions, normals, uvs, indices, minPos: min, maxPos: max };
    }

    private addCap(
        frame: { p: Vec3; f: Vec3; u: Vec3; r: Vec3 },
        profile: Profile,
        radius: number,
        start: boolean,
        addVertex: (x: number, y: number, z: number, nx: number, ny: number, nz: number, u: number, v: number) => number,
        tri: (a: number, b: number, c: number) => void,
    ): void {
        const { p, f, u, r } = frame;
        const s = start ? -1 : 1;
        const center = addVertex(p.x, p.y, p.z, f.x * s, f.y * s, f.z * s, 0.5, 0.5);
        const ids: number[] = [];
        const pc = profile.points.length / 2;
        for (let j = 0; j < pc; j++) {
            const px = profile.points[j * 2];
            const py = profile.points[j * 2 + 1];
            ids.push(addVertex(
                p.x + r.x * px * radius + u.x * py * radius,
                p.y + r.y * px * radius + u.y * py * radius,
                p.z + r.z * px * radius + u.z * py * radius,
                f.x * s, f.y * s, f.z * s,
                px * 0.5 + 0.5, py * 0.5 + 0.5,
            ));
        }
        for (let e = 0; e < profile.edges.length; e += 2) {
            const a = ids[profile.edges[e]];
            const b = ids[profile.edges[e + 1]];
            // Counter-clockwise profile edges face +forward; the start cap faces back.
            if (start) tri(center, b, a);
            else tri(center, a, b);
        }
    }
}
