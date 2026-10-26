/**
 * Spline elements (knots and tangent handles) of the edited containers, the
 * element selection, and local/world conversions.
 */
import {
    V3, Q4, v3, q4, copy, add, sub, normalize, qRotate, qMul, qInvert, qNormalize, m4TransformPoint, m4TransformDir, lenSq,
} from '../../assets/core/math';
import {
    KnotRef, setKnotPosition, setTangentVec, syncLinked, tangentInVec, tangentOutVec, curveCount,
} from '../../assets/core/spline-core';
import { cc, containerClass, findNode, selectedNodeUuids } from './env';

export type Part = 'knot' | 'in' | 'out';

export interface ElementRef {
    comp: any;
    spline: number;
    knot: number;
    part: Part;
}

export function elementKey(e: ElementRef): string {
    return `${e.comp.uuid}:${e.spline}:${e.knot}:${e.part}`;
}

export function sameElement(a: ElementRef | null | undefined, b: ElementRef | null | undefined): boolean {
    return !!a && !!b && a.comp === b.comp && a.spline === b.spline && a.knot === b.knot && a.part === b.part;
}

export function knotRef(e: ElementRef): KnotRef {
    return { spline: e.spline, knot: e.knot };
}

export function getKnot(e: { comp: any; spline: number; knot: number }): any {
    return e.comp?.splines?.[e.spline]?.knots?.[e.knot] ?? null;
}

export function isValidElement(e: ElementRef): boolean {
    if (!e.comp || !e.comp.isValid || !e.comp.node || !e.comp.node.isValid) return false;
    return !!getKnot(e);
}

/** Tangents that shape a curve: the in tangent of an open spline's first knot does not. */
export function tangentUsed(spline: any, knot: number, part: Part): boolean {
    if (part === 'knot') return true;
    if (spline.closed) return true;
    if (curveCount(spline) === 0) return false;
    if (part === 'in' && knot === 0) return false;
    if (part === 'out' && knot === spline.knots.length - 1) return false;
    return true;
}

// ------------------------------------------------------------ transforms

export function worldMatrix(comp: any): any {
    return comp.node.worldMatrix;
}

const _inv = new Map<any, { stamp: string; m: any }>();

/** Inverse of the container's world matrix (cached per matrix value). */
export function inverseMatrix(comp: any): any {
    const m = comp.node.worldMatrix;
    const stamp = `${m.m00},${m.m01},${m.m02},${m.m04},${m.m05},${m.m06},${m.m08},${m.m09},${m.m10},${m.m12},${m.m13},${m.m14}`;
    let e = _inv.get(comp);
    if (!e || e.stamp !== stamp) {
        const { Mat4 } = cc();
        const inv = new Mat4();
        Mat4.invert(inv, m);
        e = { stamp, m: inv };
        _inv.set(comp, e);
    }
    return e.m;
}

export function toWorld(comp: any, local: V3, out: V3 = v3()): V3 {
    return m4TransformPoint(out, worldMatrix(comp), local);
}

export function toLocal(comp: any, world: V3, out: V3 = v3()): V3 {
    return m4TransformPoint(out, inverseMatrix(comp), world);
}

export function dirToWorld(comp: any, local: V3, out: V3 = v3()): V3 {
    return m4TransformDir(out, worldMatrix(comp), local);
}

export function dirToLocal(comp: any, world: V3, out: V3 = v3()): V3 {
    return m4TransformDir(out, inverseMatrix(comp), world);
}

/** World rotation of the container node. */
export function containerRotation(comp: any): Q4 {
    const r = comp.node.worldRotation;
    return q4(r.x, r.y, r.z, r.w);
}

/** Knot rotation in world space. */
export function knotWorldRotation(comp: any, k: any, out: Q4 = q4()): Q4 {
    return qNormalize(out, qMul(out, containerRotation(comp), k.rotation));
}

export function knotWorldPosition(comp: any, s: number, k: number, out: V3 = v3()): V3 {
    const knot = comp.splines[s].knots[k];
    return toWorld(comp, knot.position, out);
}

/** World position of a tangent handle's end point. */
export function tangentWorldPosition(comp: any, s: number, k: number, part: 'in' | 'out', out: V3 = v3()): V3 {
    const knot = comp.splines[s].knots[k];
    const vec = part === 'in' ? tangentInVec(v3(), knot) : tangentOutVec(v3(), knot);
    return toWorld(comp, add(v3(), knot.position, vec), out);
}

export function elementWorldPosition(e: ElementRef, out: V3 = v3()): V3 {
    if (e.part === 'knot') return knotWorldPosition(e.comp, e.spline, e.knot, out);
    return tangentWorldPosition(e.comp, e.spline, e.knot, e.part, out);
}

/** Moves a knot to a world position (linked knots follow). */
export function setKnotWorld(comp: any, s: number, k: number, world: V3): void {
    const local = toLocal(comp, world);
    setKnotPosition(comp.splines[s], k, local);
    syncLinked(comp, { spline: s, knot: k });
}

/** Puts a tangent handle's end point at a world position (the knot's mode is kept). */
export function setTangentWorld(comp: any, s: number, k: number, part: 'in' | 'out', world: V3): void {
    const spline = comp.splines[s];
    const knot = spline.knots[k];
    const local = toLocal(comp, world);
    setTangentVec(spline, k, part, sub(v3(), local, knot.position));
}

/** Sets a tangent from a world-space offset vector. */
export function setTangentWorldVec(comp: any, s: number, k: number, part: 'in' | 'out', worldVec: V3): void {
    setTangentVec(comp.splines[s], k, part, dirToLocal(comp, worldVec));
}

/** World-space tangent offset vector. */
export function tangentWorldVec(comp: any, s: number, k: number, part: 'in' | 'out', out: V3 = v3()): V3 {
    const knot = comp.splines[s].knots[k];
    const vec = part === 'in' ? tangentInVec(v3(), knot) : tangentOutVec(v3(), knot);
    return dirToWorld(comp, vec, out);
}

/** Sets a knot's rotation from a world rotation. */
export function setKnotWorldRotation(comp: any, k: any, world: Q4): void {
    const local = qMul(q4(), qInvert(q4(), containerRotation(comp)), world);
    qNormalize(k.rotation, local);
}

// --------------------------------------------------------------- targets

/** SplineContainers on the selected nodes. */
export function currentTargets(): any[] {
    const C = containerClass();
    if (!C) return [];
    const res: any[] = [];
    for (const uuid of selectedNodeUuids()) {
        const node = findNode(uuid);
        if (!node || !node.isValid || !node.activeInHierarchy) continue;
        const comp = node.getComponent(C);
        if (comp && comp.enabledInHierarchy) res.push(comp);
    }
    return res;
}

// ------------------------------------------------------------- selection

export class ElementSelection {
    private map = new Map<string, ElementRef>();
    private order: string[] = [];
    /** Bumped on every change. */
    version = 0;

    get size(): number {
        return this.map.size;
    }

    has(e: ElementRef): boolean {
        return this.map.has(elementKey(e));
    }

    add(e: ElementRef): void {
        const k = elementKey(e);
        if (this.map.has(k)) {
            // Re-adding makes it the active element.
            this.order.splice(this.order.indexOf(k), 1);
        }
        this.map.set(k, { ...e });
        this.order.push(k);
        this.version++;
    }

    remove(e: ElementRef): void {
        const k = elementKey(e);
        if (!this.map.delete(k)) return;
        this.order.splice(this.order.indexOf(k), 1);
        this.version++;
    }

    toggle(e: ElementRef): void {
        if (this.has(e)) this.remove(e);
        else this.add(e);
    }

    clear(): void {
        if (!this.map.size) return;
        this.map.clear();
        this.order.length = 0;
        this.version++;
    }

    set(list: ElementRef[]): void {
        this.map.clear();
        this.order.length = 0;
        for (const e of list) {
            const k = elementKey(e);
            if (this.map.has(k)) continue;
            this.map.set(k, { ...e });
            this.order.push(k);
        }
        this.version++;
    }

    all(): ElementRef[] {
        return this.order.map((k) => this.map.get(k)!);
    }

    knots(): ElementRef[] {
        return this.all().filter((e) => e.part === 'knot');
    }

    tangents(): ElementRef[] {
        return this.all().filter((e) => e.part !== 'knot');
    }

    /** The last selected element. */
    active(): ElementRef | null {
        const k = this.order[this.order.length - 1];
        return k ? this.map.get(k)! : null;
    }

    hasKnot(comp: any, spline: number, knot: number): boolean {
        return this.map.has(`${comp.uuid}:${spline}:${knot}:knot`);
    }

    hasAnyOf(comp: any, spline: number, knot: number): boolean {
        const p = `${comp.uuid}:${spline}:${knot}:`;
        return this.map.has(`${p}knot`) || this.map.has(`${p}in`) || this.map.has(`${p}out`);
    }

    /** Drops elements that no longer exist or belong to containers not edited. */
    validate(targets: any[]): boolean {
        let changed = false;
        for (const k of [...this.order]) {
            const e = this.map.get(k)!;
            if (!isValidElement(e) || !targets.includes(e.comp)) {
                this.map.delete(k);
                this.order.splice(this.order.indexOf(k), 1);
                changed = true;
            }
        }
        if (changed) this.version++;
        return changed;
    }

    /** Comps that have selected elements. */
    comps(): any[] {
        const set = new Set<any>();
        for (const e of this.map.values()) set.add(e.comp);
        return [...set];
    }
}

/** World-space centroid of elements. */
export function centroid(list: ElementRef[], out: V3 = v3()): V3 {
    copy(out, v3());
    if (!list.length) return out;
    const p = v3();
    for (const e of list) add(out, out, elementWorldPosition(e, p));
    out.x /= list.length;
    out.y /= list.length;
    out.z /= list.length;
    return out;
}

/** Direction of a tangent element in world space (unit). */
export function tangentDirectionWorld(e: ElementRef, out: V3 = v3()): V3 {
    if (e.part === 'knot') return out;
    tangentWorldVec(e.comp, e.spline, e.knot, e.part, out);
    if (lenSq(out) > 1e-12) normalize(out, out);
    return out;
}

export { qRotate };
