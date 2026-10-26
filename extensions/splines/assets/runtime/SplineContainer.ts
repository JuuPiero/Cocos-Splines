import { _decorator, Component, Mat4, Vec3, Quat } from 'cc';
import { EDITOR } from 'cc/env';
import { Spline, splineFactory, PathIndexUnit } from './Spline';
import { KnotLink } from './KnotLink';
import { BezierKnot, TangentMode } from './BezierKnot';
import {
    ContainerLike, KnotRef, linkKnots, unlinkKnots, linkedKnots, syncLinked, isLinked,
    containerRemoveSpline, containerInsertKnot, containerRemoveKnots, containerReverse,
    splitKnot, joinKnots, nearestPoint, fingerprint, refreshAll,
} from '../core/spline-core';
import { arcLength, curve, Curve } from '../core/curve';

const { ccclass, property, executeInEditMode, menu, disallowMultiple } = _decorator;

const _m = new Mat4();
const _v = new Vec3();
const _c: Curve = curve();

export interface SplineSample {
    position: Vec3;
    /** Unit direction of travel. */
    tangent: Vec3;
    /** Unit up vector. */
    up: Vec3;
}

/**
 * Holds one or more splines in the node's local space (Unity's SplineContainer).
 *
 * Evaluate methods work in world space; the Spline objects themselves work
 * in local space. `t` is a normalized distance: 0 = start, 1 = end.
 *
 * Emits SplineContainer.EventType.CHANGED on its node when a spline changes
 * (in the editor always; at runtime when someone listens).
 */
@ccclass('SplineContainer')
@executeInEditMode
@disallowMultiple
@menu('Splines/SplineContainer')
export class SplineContainer extends Component implements ContainerLike {
    static readonly EventType = {
        /** (container: SplineContainer) */
        CHANGED: 'spline-changed',
    };

    /** Enabled containers (used by the editor tools). */
    static readonly all = new Set<SplineContainer>();

    @property({ type: [Spline], tooltip: 'The splines in this container.' })
    splines: Spline[] = [new Spline()];

    @property({ type: [KnotLink], visible: false })
    links: KnotLink[] = [];

    private _stamp = NaN;

    /** The first spline (created if there is none). */
    get spline(): Spline {
        if (!this.splines.length) this.splines.push(new Spline());
        return this.splines[0];
    }

    set spline(value: Spline) {
        if (this.splines.length) this.splines[0] = value;
        else this.splines.push(value);
        this.notifyChanged();
    }

    onEnable() {
        SplineContainer.all.add(this);
    }

    onDisable() {
        SplineContainer.all.delete(this);
    }

    onDestroy() {
        SplineContainer.all.delete(this);
    }

    update() {
        if (!EDITOR && !this.node.hasEventListener(SplineContainer.EventType.CHANGED)) return;
        this.checkChanged();
    }

    /**
     * A value that changes whenever any spline in the container changes.
     * Checked at most once per frame per spline.
     */
    get changeStamp(): number {
        let h = 2166136261 | 0;
        for (const s of this.splines) h = Math.imul(h ^ s.cache.stamp, 16777619);
        return Math.imul(h ^ this.splines.length, 16777619);
    }

    /** Emits CHANGED if a spline changed since the last check. Returns whether it did. */
    checkChanged(): boolean {
        if (EDITOR) this.repairAfterExternalEdit();
        const stamp = this.changeStamp;
        if (stamp === this._stamp) return false;
        this._stamp = stamp;
        this.node.emit(SplineContainer.EventType.CHANGED, this);
        return true;
    }

    /** Marks every spline dirty and emits CHANGED. */
    notifyChanged(): void {
        for (const s of this.splines) s.markDirty();
        this.checkChanged();
    }

    private _seen = new WeakMap<Spline, number>();

    /**
     * Inspector edits and undo change knots behind the Spline API; re-apply the
     * tangent modes so AutoSmooth tangents follow moved knots.
     */
    private repairAfterExternalEdit(): void {
        for (const s of this.splines) {
            const before = fingerprint(s);
            if (this._seen.get(s) === before) continue;
            refreshAll(s);
            const after = fingerprint(s);
            if (after !== before) s.markDirty();
            this._seen.set(s, after);
        }
    }

    // ------------------------------------------------------------ splines

    addSpline(spline: Spline = new Spline()): Spline {
        this.splines.push(spline);
        this.notifyChanged();
        return spline;
    }

    removeSplineAt(index: number): void {
        containerRemoveSpline(this, index);
        this.notifyChanged();
    }

    /** Container-level edits that keep knot links valid. */
    insertKnot(splineIndex: number, knotIndex: number, knot: BezierKnot): void {
        containerInsertKnot(this, splineIndex, knotIndex, knot);
        this.notifyChanged();
    }

    removeKnots(refs: KnotRef[]): void {
        containerRemoveKnots(this, refs);
        this.notifyChanged();
    }

    reverseFlow(splineIndex: number): void {
        containerReverse(this, splineIndex);
        this.notifyChanged();
    }

    /** Moves a knot and every knot linked to it. */
    setKnotPosition(ref: KnotRef, localPosition: Readonly<Vec3>): void {
        this.splines[ref.spline].setKnotPosition(ref.knot, localPosition);
        syncLinked(this, ref);
        this.notifyChanged();
    }

    linkKnots(refs: KnotRef[]): void {
        linkKnots(this, refs, splineFactory);
        this.notifyChanged();
    }

    unlinkKnots(refs: KnotRef[]): void {
        unlinkKnots(this, refs);
        this.notifyChanged();
    }

    getLinkedKnots(ref: KnotRef): KnotRef[] {
        return linkedKnots(this, ref);
    }

    isKnotLinked(ref: KnotRef): boolean {
        return isLinked(this, ref);
    }

    /** Unity's Split Knot. Returns the new copy of the knot, or null. */
    splitKnot(ref: KnotRef): KnotRef | null {
        const r = splitKnot(this, ref, splineFactory);
        this.notifyChanged();
        return r;
    }

    /** Unity's Join Knots (two end knots). Returns the joined knot, or null. */
    joinKnots(a: KnotRef, b: KnotRef): KnotRef | null {
        const r = joinKnots(this, a, b, splineFactory);
        this.notifyChanged();
        return r;
    }

    // --------------------------------------------------------- evaluation

    private getSpline(index: number): Spline | null {
        return this.splines[index] ?? null;
    }

    /** World-space position at t on a spline. */
    evaluatePosition(t: number, splineIndex = 0, out = new Vec3()): Vec3 {
        const s = this.getSpline(splineIndex);
        if (!s) return out.set(this.node.worldPosition);
        s.evaluatePosition(t, out);
        return Vec3.transformMat4(out, out, this.node.worldMatrix);
    }

    /** World-space derivative at t (direction times speed, like Unity's EvaluateTangent). */
    evaluateTangent(t: number, splineIndex = 0, out = new Vec3()): Vec3 {
        const s = this.getSpline(splineIndex);
        if (!s) return out.set(0, 0, 0);
        s.evaluateTangent(t, out);
        return Vec3.transformMat4Normal(out, out, this.node.worldMatrix);
    }

    /** World-space unit direction of travel at t. */
    evaluateDirection(t: number, splineIndex = 0, out = new Vec3()): Vec3 {
        const s = this.getSpline(splineIndex);
        if (!s) return out.set(0, 0, 1);
        s.evaluateDirection(t, out);
        Vec3.transformMat4Normal(out, out, this.node.worldMatrix);
        return out.normalize();
    }

    /** World-space unit up vector at t. */
    evaluateUpVector(t: number, splineIndex = 0, out = new Vec3()): Vec3 {
        const s = this.getSpline(splineIndex);
        if (!s) return out.set(0, 1, 0);
        s.evaluateUpVector(t, out);
        Vec3.transformMat4Normal(out, out, this.node.worldMatrix);
        return out.normalize();
    }

    /** Position, direction and up at t (world space). Returns false if there is no such spline. */
    evaluate(t: number, splineIndex = 0, out?: SplineSample): SplineSample | null {
        const s = this.getSpline(splineIndex);
        if (!s) return null;
        const res = out ?? { position: new Vec3(), tangent: new Vec3(), up: new Vec3() };
        this.evaluatePosition(t, splineIndex, res.position);
        this.evaluateDirection(t, splineIndex, res.tangent);
        this.evaluateUpVector(t, splineIndex, res.up);
        return res;
    }

    /** Rotation that faces along the spline at t (+Z forward, +Y up), world space. */
    evaluateRotation(t: number, splineIndex = 0, out = new Quat()): Quat {
        const f = this.evaluateDirection(t, splineIndex, new Vec3());
        const u = this.evaluateUpVector(t, splineIndex, new Vec3());
        // Quat.fromViewUp maps +Z to the view direction, like the knots.
        Quat.fromViewUp(out, f, u);
        return out;
    }

    /** World-space length of a spline. */
    calculateLength(splineIndex = 0): number {
        const s = this.getSpline(splineIndex);
        if (!s) return 0;
        const m = this.node.worldMatrix;
        let total = 0;
        const count = s.curveCount;
        for (let i = 0; i < count; i++) {
            // Bezier curves are affine invariant: transform the control points.
            s.getCurve(i, _c);
            Vec3.transformMat4(_c.p0 as Vec3, _c.p0, m);
            Vec3.transformMat4(_c.p1 as Vec3, _c.p1, m);
            Vec3.transformMat4(_c.p2 as Vec3, _c.p2, m);
            Vec3.transformMat4(_c.p3 as Vec3, _c.p3, m);
            total += arcLength(_c);
        }
        return total;
    }

    /** Closest point on a spline to a world position. */
    getNearestPoint(worldPoint: Readonly<Vec3>, splineIndex = 0): { t: number; position: Vec3; distance: number } | null {
        const s = this.getSpline(splineIndex);
        if (!s) return null;
        Mat4.invert(_m, this.node.worldMatrix);
        Vec3.transformMat4(_v, worldPoint, _m);
        const r = nearestPoint(s, s.cache, _v);
        const position = new Vec3(r.position.x, r.position.y, r.position.z);
        Vec3.transformMat4(position, position, this.node.worldMatrix);
        return { t: r.t, position, distance: Vec3.distance(position, worldPoint) };
    }

    /** Closest point over all splines. */
    getNearestPointAll(worldPoint: Readonly<Vec3>): { spline: number; t: number; position: Vec3; distance: number } | null {
        let best: { spline: number; t: number; position: Vec3; distance: number } | null = null;
        for (let i = 0; i < this.splines.length; i++) {
            const r = this.getNearestPoint(worldPoint, i);
            if (r && (!best || r.distance < best.distance)) best = { spline: i, ...r };
        }
        return best;
    }

    /** Converts between normalized t, local distance and knot index units on a spline. */
    convertIndexUnit(value: number, from: PathIndexUnit, to: PathIndexUnit, splineIndex = 0): number {
        const s = this.getSpline(splineIndex);
        return s ? s.convertIndexUnit(value, from, to) : 0;
    }

    /** Knot position in world space. */
    getKnotWorldPosition(ref: KnotRef, out = new Vec3()): Vec3 {
        const k = this.splines[ref.spline]?.knots[ref.knot];
        if (!k) return out.set(this.node.worldPosition);
        return Vec3.transformMat4(out, k.position, this.node.worldMatrix);
    }

    /** Sets every knot of every spline to a tangent mode. */
    setTangentModeAll(mode: TangentMode): void {
        for (const s of this.splines) s.setTangentModeAll(mode);
        this.notifyChanged();
    }
}

export { PathIndexUnit };
