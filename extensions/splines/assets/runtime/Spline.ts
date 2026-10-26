import { _decorator, director, Vec3 } from 'cc';
import { BezierKnot } from './BezierKnot';
import {
    SplineCache, SplineLike, TangentMode, DEFAULT_TENSION, Factory,
    ensureCache, curveCount, getCurve, evaluatePosition, evaluateDirection, evaluateUp, curvePointAt,
    nearestPoint, tAtDistanceFrom, knotUnitToT, tToKnotUnit, normalizedTOf,
    insertKnot, removeKnot, insertOnCurve, reverseFlow, setClosed, setTangentMode, setTension,
    setKnotPosition, refreshAll, refreshAround, applyTangentMode,
} from '../core/spline-core';
import { Curve, curve, evalDerivative } from '../core/curve';
import { KnotLink } from './KnotLink';

const { ccclass, property } = _decorator;

/** Creates engine objects for the core's edit operations. */
export const splineFactory: Factory = {
    knot: () => new BezierKnot(),
    spline: () => new Spline(),
    link: () => new KnotLink(),
};

/** Where a distance along the spline is measured from (Unity's PathIndexUnit). */
export enum PathIndexUnit {
    /** 0..1 over the spline's length. */
    Normalized = 0,
    /** Distance in the spline's local units. */
    Distance = 1,
    /** Knot index: 2.5 is halfway between knots 2 and 3. */
    Knot = 2,
}

/**
 * A Bezier spline: a list of knots, open or closed.
 *
 * Positions are in the local space of the SplineContainer that owns the
 * spline. `t` arguments are normalized distances: 0 is the first knot and 1
 * the end, and t = 0.5 is halfway along the spline's length.
 *
 * Use the methods to edit knots so the spline updates its tangents and
 * cached lengths. After changing knot fields directly, call markDirty().
 */
@ccclass('splines.Spline')
export class Spline implements SplineLike {
    @property({ type: [BezierKnot], tooltip: 'The knots of the spline.' })
    knots: BezierKnot[] = [];

    @property({ tooltip: 'Connects the last knot back to the first.' })
    closed = false;

    private _cache = new SplineCache();
    private _checkedFrame = -1;
    private _version = 0;

    /** Bumped by every edit made through the Spline API (and markDirty). */
    get version(): number {
        return this._version;
    }

    get count(): number {
        return this.knots.length;
    }

    /** Number of curves (segments between knots). */
    get curveCount(): number {
        return curveCount(this);
    }

    /** Lengths and lookup tables, rebuilt when the knots change (checked once per frame). */
    get cache(): SplineCache {
        const frame = director.getTotalFrames();
        if (frame !== this._checkedFrame || this._checkedFrame < 0) {
            ensureCache(this, this._cache);
            this._checkedFrame = frame;
        }
        return this._cache;
    }

    /** Call after changing knots directly (not through the Spline methods). */
    markDirty(): void {
        this._checkedFrame = -1;
        this._version++;
    }

    // --------------------------------------------------------------- knots

    getKnot(index: number): BezierKnot {
        return this.knots[index];
    }

    /** Replaces a knot (copied) and updates the tangents that depend on it. */
    setKnot(index: number, knot: BezierKnot): void {
        const k = this.knots[index];
        k.position.set(knot.position);
        k.tangentIn.set(knot.tangentIn);
        k.tangentOut.set(knot.tangentOut);
        k.rotation.set(knot.rotation);
        k.mode = knot.mode;
        k.tension = knot.tension;
        refreshAround(this, index);
        this.markDirty();
    }

    /** Adds a knot at the end. With a position, creates a knot with the given mode. */
    add(knotOrPosition: BezierKnot | Readonly<Vec3>, mode: TangentMode = TangentMode.AutoSmooth): BezierKnot {
        return this.insert(this.knots.length, knotOrPosition, mode);
    }

    insert(index: number, knotOrPosition: BezierKnot | Readonly<Vec3>, mode: TangentMode = TangentMode.AutoSmooth): BezierKnot {
        let k: BezierKnot;
        if (knotOrPosition instanceof BezierKnot) {
            k = knotOrPosition;
        } else {
            k = new BezierKnot(knotOrPosition as Vec3);
            k.mode = mode;
            k.tension = DEFAULT_TENSION;
        }
        insertKnot(this, index, k);
        this.markDirty();
        return k;
    }

    removeAt(index: number): void {
        removeKnot(this, index);
        this.markDirty();
    }

    clear(): void {
        this.knots.length = 0;
        this.markDirty();
    }

    setKnotPosition(index: number, position: Readonly<Vec3>): void {
        setKnotPosition(this, index, position);
        this.markDirty();
    }

    getTangentMode(index: number): TangentMode {
        return this.knots[index].mode;
    }

    setTangentMode(index: number, mode: TangentMode): void {
        setTangentMode(this, index, mode);
        this.markDirty();
    }

    /** Sets the mode of every knot. */
    setTangentModeAll(mode: TangentMode): void {
        for (let i = 0; i < this.knots.length; i++) setTangentMode(this, i, mode);
        this.markDirty();
    }

    setAutoSmoothTension(index: number, tension: number): void {
        setTension(this, index, tension);
        this.markDirty();
    }

    /** Inserts a knot on a curve without changing the shape. Returns its index. */
    insertOnCurve(curveIndex: number, curveT: number): number {
        const i = insertOnCurve(this, curveIndex, curveT, splineFactory);
        this.markDirty();
        return i;
    }

    setClosed(closed: boolean): void {
        setClosed(this, closed);
        this.markDirty();
    }

    /** Reverses the direction of travel (the shape is unchanged). */
    reverse(): void {
        reverseFlow(this);
        this.markDirty();
    }

    /** Re-applies every knot's tangent mode. */
    refresh(): void {
        refreshAll(this);
        this.markDirty();
    }

    /** Re-applies the tangent mode of one knot. */
    refreshKnot(index: number): void {
        applyTangentMode(this, index);
        this.markDirty();
    }

    // ------------------------------------------------------------ queries

    /** Total length in local units. */
    getLength(): number {
        return this.cache.total;
    }

    getCurveLength(curveIndex: number): number {
        return this.cache.lengths[curveIndex] ?? 0;
    }

    /** Control points of a curve (local space). */
    getCurve(curveIndex: number, out: Curve = curve()): Curve {
        return getCurve(this, curveIndex, out);
    }

    evaluatePosition(t: number, out = new Vec3()): Vec3 {
        return evaluatePosition(this, this.cache, t, out);
    }

    /** Derivative at t (direction times speed, like Unity's EvaluateTangent). */
    evaluateTangent(t: number, out = new Vec3()): Vec3 {
        const cache = this.cache;
        if (!cache.curves.length) return evaluateDirection(this, cache, t, out);
        const p = curvePointAt(cache, t);
        evalDerivative(out, cache.curves[p.index], p.t);
        if (out.lengthSqr() < 1e-12) evaluateDirection(this, cache, t, out);
        return out;
    }

    /** Unit direction of travel at t. */
    evaluateDirection(t: number, out = new Vec3()): Vec3 {
        return evaluateDirection(this, this.cache, t, out);
    }

    /** Unit up vector at t, interpolated between the knots' up vectors without twisting. */
    evaluateUpVector(t: number, out = new Vec3()): Vec3 {
        return evaluateUp(this, this.cache, t, out);
    }

    /** Closest point to `point` (local space). Returns its t and position. */
    getNearestPoint(point: Readonly<Vec3>, outPosition = new Vec3()): { t: number; position: Vec3; distance: number } {
        const r = nearestPoint(this, this.cache, point);
        outPosition.set(r.position.x, r.position.y, r.position.z);
        return { t: r.t, position: outPosition, distance: r.distance };
    }

    /** The t reached after moving `distance` (local units, may be negative) from `fromT`. */
    getTAtDistance(fromT: number, distance: number): number {
        return tAtDistanceFrom(this, this.cache, fromT, distance);
    }

    /** Converts a position along the spline between units (Unity's ConvertIndexUnit). */
    convertIndexUnit(value: number, from: PathIndexUnit, to: PathIndexUnit): number {
        if (from === to) return value;
        const cache = this.cache;
        let t: number;
        if (from === PathIndexUnit.Normalized) t = value;
        else if (from === PathIndexUnit.Distance) t = cache.total > 0 ? value / cache.total : 0;
        else t = knotUnitToT(cache, value);
        if (to === PathIndexUnit.Normalized) return t;
        if (to === PathIndexUnit.Distance) return t * cache.total;
        return tToKnotUnit(cache, t);
    }

    /** Normalized t of a knot. */
    knotT(index: number): number {
        const cache = this.cache;
        if (!cache.curves.length) return 0;
        if (index >= cache.curves.length) return 1;
        return normalizedTOf(cache, index, 0);
    }
}
