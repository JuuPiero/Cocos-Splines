/**
 * Spline logic on plain data (no engine dependency).
 *
 * A spline is a list of Bezier knots. Each knot has a position, a rotation and
 * two tangents expressed in the knot's own space (+Z = direction of travel,
 * +Y = up), plus a tangent mode that decides how the tangents are kept:
 *
 * - AutoSmooth: tangents computed from the neighbor positions (Catmull-Rom).
 * - Linear:     no tangents, straight segments.
 * - Mirrored:   tangents opposite and of equal length.
 * - Continuous: tangents opposite, lengths independent.
 * - Broken:     tangents independent.
 *
 * Positions are in the spline's local space (the SplineContainer node).
 */
import {
    V3, Q4, v3, q4, set, copy, add, sub, scale, normalize, len, lenSq, dot, cross, dist, distSq,
    qRotate, qInvert, qMul, qCopy, qLookRotation, qFromAxisAngle, qNormalize, qIdentity,
    projectOnPlane, anyPerpendicular, wrap, clamp01, EPSILON, scaleAndAdd, lerp,
} from './math';
import {
    Curve, curve, evalPosition, evalDirection, split, buildLengthTable, tAtLength, lengthAtT, nearestT,
} from './curve';

export enum TangentMode {
    AutoSmooth = 0,
    Linear = 1,
    Mirrored = 2,
    Continuous = 3,
    Broken = 4,
}

/** Default Catmull-Rom parameterization used by AutoSmooth knots (0 uniform, 0.5 centripetal, 1 chordal). */
export const DEFAULT_TENSION = 0.5;

export interface KnotLike {
    position: V3;
    tangentIn: V3;
    tangentOut: V3;
    rotation: Q4;
    mode: number;
    tension: number;
}

export interface SplineLike {
    knots: KnotLike[];
    closed: boolean;
}

export interface LinkLike {
    /** Flattened (splineIndex, knotIndex) pairs. */
    knots: number[];
}

export interface ContainerLike {
    splines: SplineLike[];
    links: LinkLike[];
}

export interface Factory {
    knot(): KnotLike;
    spline(): SplineLike;
    link(): LinkLike;
}

const UP: V3 = { x: 0, y: 1, z: 0 };
const FORWARD: V3 = { x: 0, y: 0, z: 1 };

// ------------------------------------------------------------------ indices

export function prevIndex(i: number, count: number, closed: boolean): number {
    return closed ? wrap(i - 1, count) : Math.max(i - 1, 0);
}

export function nextIndex(i: number, count: number, closed: boolean): number {
    return closed ? wrap(i + 1, count) : Math.min(i + 1, count - 1);
}

export function curveCount(s: SplineLike): number {
    const n = s.knots.length;
    if (n < 2) return 0;
    return s.closed ? n : n - 1;
}

export function tangentsEditable(mode: number): boolean {
    return mode === TangentMode.Mirrored || mode === TangentMode.Continuous || mode === TangentMode.Broken;
}

// -------------------------------------------------------------------- knots

export function copyKnot<K extends KnotLike>(out: K, k: KnotLike): K {
    copy(out.position, k.position);
    copy(out.tangentIn, k.tangentIn);
    copy(out.tangentOut, k.tangentOut);
    qCopy(out.rotation, k.rotation);
    out.mode = k.mode;
    out.tension = k.tension;
    return out;
}

export function knotUp<T extends V3>(out: T, k: KnotLike): T {
    return qRotate(out, k.rotation, UP);
}

/** Out tangent in spline space (offset from the knot position). */
export function tangentOutVec<T extends V3>(out: T, k: KnotLike): T {
    return qRotate(out, k.rotation, k.tangentOut);
}

/** In tangent in spline space (offset from the knot position). */
export function tangentInVec<T extends V3>(out: T, k: KnotLike): T {
    return qRotate(out, k.rotation, k.tangentIn);
}

/**
 * Knot rotation for a tangent direction and a normal (up). Like Unity's
 * GetKnotRotation: up is the normal projected off the tangent.
 */
export function knotRotation<T extends Q4>(out: T, tangent: V3, normal: V3): T {
    const t = normalize(v3(), tangent);
    let n = normalize(v3(), normal);
    if (lenSq(n) < EPSILON) n = copy(v3(), UP);
    if (lenSq(t) < EPSILON) {
        // No direction: forward is any direction perpendicular to the normal.
        const f = anyPerpendicular(v3(), n);
        return qLookRotation(out, f, n);
    }
    if (Math.abs(dot(t, n)) > 1 - 1e-5) {
        // Normal parallel to the tangent: pick an up perpendicular to it.
        const up = cross(v3(), t, { x: 1, y: 0, z: 0 });
        if (lenSq(up) < EPSILON) cross(up, t, { x: 0, y: 0, z: 1 });
        return qLookRotation(out, t, normalize(up, up));
    }
    const up = normalize(v3(), projectOnPlane(v3(), n, t));
    return qLookRotation(out, t, up);
}

/**
 * AutoSmooth tangent at `cur` given its neighbors: a Catmull-Rom tangent with
 * the parameterization `tension` (alpha), scaled for a cubic Bezier handle.
 * Based on Yuksel et al., "Parameterization and applications of Catmull-Rom curves".
 */
export function autoSmoothTangent<T extends V3>(out: T, prev: V3, cur: V3, next: V3, tension: number): T {
    const d1 = dist(cur, prev);
    const d2 = dist(next, cur);
    if (d1 < EPSILON && d2 < EPSILON) return set(out, 0, 0, 0);
    // Only one neighbor: a short handle towards it, enough to give the knot a direction.
    if (d1 < EPSILON) return scale(out, sub(out, next, cur), 0.1);
    if (d2 < EPSILON) return scale(out, sub(out, cur, prev), 0.1);
    const a = tension;
    const d1a = Math.pow(d1, a);
    const d2a = Math.pow(d2, a);
    const d1a2 = d1a * d1a;
    const d2a2 = d2a * d2a;
    const k = 1 / (3 * d1a * (d1a + d2a));
    return set(
        out,
        (d1a2 * next.x - d2a2 * prev.x + (d2a2 - d1a2) * cur.x) * k,
        (d1a2 * next.y - d2a2 * prev.y + (d2a2 - d1a2) * cur.y) * k,
        (d1a2 * next.z - d2a2 * prev.z + (d2a2 - d1a2) * cur.z) * k,
    );
}

/** Recomputes the tangents (and rotation) a knot's mode implies. */
export function applyTangentMode(s: SplineLike, i: number): void {
    const n = s.knots.length;
    if (i < 0 || i >= n) return;
    const k = s.knots[i];
    switch (k.mode) {
        case TangentMode.Linear:
            set(k.tangentIn, 0, 0, 0);
            set(k.tangentOut, 0, 0, 0);
            break;
        case TangentMode.AutoSmooth: {
            const prev = s.knots[prevIndex(i, n, s.closed)].position;
            const next = s.knots[nextIndex(i, n, s.closed)].position;
            const up = knotUp(v3(), k);
            const tin = autoSmoothTangent(v3(), next, k.position, prev, k.tension);
            const tout = autoSmoothTangent(v3(), prev, k.position, next, k.tension);
            let lin = len(tin);
            let lout = len(tout);
            let dir = tout;
            if (lin < EPSILON) lin = lout;
            if (lout < EPSILON) {
                lout = lin;
                dir = scale(v3(), tin, -1);
            }
            if (lenSq(dir) > EPSILON) knotRotation(k.rotation, dir, up);
            set(k.tangentIn, 0, 0, -lin);
            set(k.tangentOut, 0, 0, lout);
            break;
        }
        case TangentMode.Mirrored:
        case TangentMode.Continuous:
            bakeTangentDirection(k, k.mode === TangentMode.Mirrored, true);
            break;
        default:
            break;
    }
}

/**
 * Turns the knot so its tangents lie on local Z (the main tangent keeps its
 * direction), as Mirrored / Continuous knots store them.
 */
export function bakeTangentDirection(k: KnotLike, mirrored: boolean, outIsMain: boolean): void {
    const tout = tangentOutVec(v3(), k);
    const tin = tangentInVec(v3(), k);
    const main = outIsMain ? tout : scale(v3(), tin, -1);
    const other = outIsMain ? scale(v3(), tin, -1) : tout;
    const dir = lenSq(main) > EPSILON ? main : other;
    const up = knotUp(v3(), k);
    if (lenSq(dir) > EPSILON) knotRotation(k.rotation, dir, up);
    const lmain = len(main);
    const lother = len(other);
    if (mirrored) {
        const l = lmain > EPSILON ? lmain : lother;
        set(k.tangentOut, 0, 0, l);
        set(k.tangentIn, 0, 0, -l);
    } else if (outIsMain) {
        set(k.tangentOut, 0, 0, lmain);
        set(k.tangentIn, 0, 0, -lother);
    } else {
        set(k.tangentIn, 0, 0, -lmain);
        set(k.tangentOut, 0, 0, lother);
    }
}

/** Recomputes the knot and its AutoSmooth neighbors after its position changed. */
export function refreshAround(s: SplineLike, i: number): void {
    const n = s.knots.length;
    if (!n) return;
    const p = prevIndex(i, n, s.closed);
    const q = nextIndex(i, n, s.closed);
    if (p !== i && s.knots[p].mode === TangentMode.AutoSmooth) applyTangentMode(s, p);
    applyTangentMode(s, i);
    if (q !== i && q !== p && s.knots[q].mode === TangentMode.AutoSmooth) applyTangentMode(s, q);
}

/** Re-applies every knot's mode (after loading or external edits). */
export function refreshAll(s: SplineLike): void {
    for (let i = 0; i < s.knots.length; i++) applyTangentMode(s, i);
}

export function setKnotPosition(s: SplineLike, i: number, p: V3): void {
    copy(s.knots[i].position, p);
    refreshAround(s, i);
}

/**
 * Sets the in or out tangent from a spline-space offset, keeping the knot's
 * mode constraints. Tangents of AutoSmooth / Linear knots become Continuous
 * (they have nothing to drag otherwise).
 */
export function setTangentVec(s: SplineLike, i: number, which: 'in' | 'out', v: V3): void {
    const k = s.knots[i];
    if (!tangentsEditable(k.mode)) {
        if (k.mode === TangentMode.Linear) makeExplicitLinearTangents(s, i);
        k.mode = TangentMode.Continuous;
    }
    if (k.mode === TangentMode.Broken) {
        const local = qRotate(v3(), qInvert(q4(), k.rotation), v);
        copy(which === 'in' ? k.tangentIn : k.tangentOut, local);
        return;
    }
    const l = len(v);
    const dir = which === 'out' ? copy(v3(), v) : scale(v3(), v, -1);
    if (l > EPSILON) knotRotation(k.rotation, dir, knotUp(v3(), k));
    const mirrored = k.mode === TangentMode.Mirrored;
    if (which === 'out') {
        const lin = mirrored ? l : len(k.tangentIn);
        set(k.tangentOut, 0, 0, l);
        set(k.tangentIn, 0, 0, -lin);
    } else {
        const lout = mirrored ? l : len(k.tangentOut);
        set(k.tangentIn, 0, 0, -l);
        set(k.tangentOut, 0, 0, lout);
    }
}

/** Linear knots store zero tangents; give them grabbable ones pointing at the neighbors. */
function makeExplicitLinearTangents(s: SplineLike, i: number): void {
    const n = s.knots.length;
    const k = s.knots[i];
    const inv = qInvert(q4(), k.rotation);
    const prev = s.knots[prevIndex(i, n, s.closed)].position;
    const next = s.knots[nextIndex(i, n, s.closed)].position;
    qRotate(k.tangentIn, inv, scale(v3(), sub(v3(), prev, k.position), 1 / 3));
    qRotate(k.tangentOut, inv, scale(v3(), sub(v3(), next, k.position), 1 / 3));
}

export function setTangentMode(s: SplineLike, i: number, mode: number): void {
    const k = s.knots[i];
    if (k.mode === mode) {
        applyTangentMode(s, i);
        return;
    }
    if (k.mode === TangentMode.Linear && tangentsEditable(mode)) makeExplicitLinearTangents(s, i);
    k.mode = mode;
    applyTangentMode(s, i);
}

export function setTension(s: SplineLike, i: number, tension: number): void {
    s.knots[i].tension = tension;
    applyTangentMode(s, i);
}

export function setRotation(s: SplineLike, i: number, r: Q4): void {
    qNormalize(s.knots[i].rotation, r);
    // AutoSmooth knots own their rotation's direction; only the roll sticks.
    applyTangentMode(s, i);
}

// ------------------------------------------------------------------- curves

/** Control points of curve i (between knot i and the next knot). */
export function getCurve(s: SplineLike, i: number, out: Curve = curve()): Curve {
    const n = s.knots.length;
    const a = s.knots[i];
    const b = s.knots[(i + 1) % n];
    copy(out.p0, a.position);
    add(out.p1, a.position, tangentOutVec(out.p1, a));
    add(out.p2, b.position, tangentInVec(out.p2, b));
    copy(out.p3, b.position);
    return out;
}

// -------------------------------------------------------------------- cache

/** Samples per curve for the distance table. */
export const LENGTH_SAMPLES = 32;
/** Samples per curve for the up-vector table. */
export const UP_SAMPLES = 16;

export class SplineCache {
    /** Fingerprint of the data the cache was built from. */
    stamp = NaN;
    curves: Curve[] = [];
    lengths: number[] = [];
    /** Length of all curves before curve i. */
    starts: number[] = [];
    total = 0;
    tables: Float64Array[] = [];
    ups: (Float64Array | null)[] = [];
}

const _hashBuf = new Float64Array(1);
const _hashInt = new Int32Array(_hashBuf.buffer);

function mix(h: number, v: number): number {
    _hashBuf[0] = v;
    h = Math.imul(h ^ _hashInt[0], 16777619);
    h = Math.imul(h ^ _hashInt[1], 16777619);
    return h;
}

/** Cheap hash of everything that shapes the spline. */
export function fingerprint(s: SplineLike): number {
    let h = 2166136261 | 0;
    h = mix(h, s.knots.length);
    h = mix(h, s.closed ? 1 : 0);
    for (const k of s.knots) {
        h = mix(h, k.position.x);
        h = mix(h, k.position.y);
        h = mix(h, k.position.z);
        h = mix(h, k.tangentIn.x);
        h = mix(h, k.tangentIn.y);
        h = mix(h, k.tangentIn.z);
        h = mix(h, k.tangentOut.x);
        h = mix(h, k.tangentOut.y);
        h = mix(h, k.tangentOut.z);
        h = mix(h, k.rotation.x);
        h = mix(h, k.rotation.y);
        h = mix(h, k.rotation.z);
        h = mix(h, k.rotation.w);
        h = mix(h, k.mode);
        h = mix(h, k.tension);
    }
    return h;
}

export function buildCache(s: SplineLike, cache: SplineCache, stamp = fingerprint(s)): SplineCache {
    const count = curveCount(s);
    cache.curves.length = count;
    cache.lengths.length = count;
    cache.starts.length = count;
    cache.tables.length = count;
    cache.ups.length = count;
    let total = 0;
    for (let i = 0; i < count; i++) {
        const c = getCurve(s, i, cache.curves[i] || curve());
        cache.curves[i] = c;
        const table = buildLengthTable(c, LENGTH_SAMPLES, cache.tables[i]);
        cache.tables[i] = table;
        cache.starts[i] = total;
        cache.lengths[i] = table[LENGTH_SAMPLES - 1];
        total += cache.lengths[i];
        cache.ups[i] = null; // built on demand
    }
    cache.total = total;
    cache.stamp = stamp;
    return cache;
}

/** Rebuilds the cache when the spline changed. Returns the up-to-date cache. */
export function ensureCache(s: SplineLike, cache: SplineCache): SplineCache {
    const stamp = fingerprint(s);
    if (stamp !== cache.stamp) buildCache(s, cache, stamp);
    return cache;
}

export interface CurvePoint {
    /** Curve index. */
    index: number;
    /** Parameter on that curve, 0..1. */
    t: number;
}

/** Curve and curve parameter at a normalized distance t (0..1) along the whole spline. */
export function curvePointAt(cache: SplineCache, t: number, out: CurvePoint = { index: 0, t: 0 }): CurvePoint {
    const count = cache.curves.length;
    if (!count) {
        out.index = 0;
        out.t = 0;
        return out;
    }
    if (cache.total <= EPSILON) {
        // Degenerate (all knots on one point): fall back to uniform parameterization.
        const x = clamp01(t) * count;
        out.index = Math.min(Math.floor(x), count - 1);
        out.t = x - out.index;
        return out;
    }
    const d = clamp01(t) * cache.total;
    let lo = 0;
    let hi = count - 1;
    while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (cache.starts[mid] <= d) lo = mid;
        else hi = mid - 1;
    }
    out.index = lo;
    out.t = tAtLength(cache.tables[lo], d - cache.starts[lo]);
    return out;
}

/** Normalized distance (0..1) of a curve point. */
export function normalizedTOf(cache: SplineCache, index: number, t: number): number {
    if (!cache.curves.length) return 0;
    if (cache.total <= EPSILON) return (index + t) / cache.curves.length;
    return (cache.starts[index] + lengthAtT(cache.tables[index], t)) / cache.total;
}

/** Knot-index unit (curve index + curve t, e.g. 2.5 = halfway between knots 2 and 3) to normalized t. */
export function knotUnitToT(cache: SplineCache, k: number): number {
    const count = cache.curves.length;
    if (!count) return 0;
    const i = Math.min(Math.max(Math.floor(k), 0), count - 1);
    return normalizedTOf(cache, i, clamp01(k - i));
}

export function tToKnotUnit(cache: SplineCache, t: number): number {
    const p = curvePointAt(cache, t);
    return p.index + p.t;
}

const _cp: CurvePoint = { index: 0, t: 0 };

export function evaluatePosition<T extends V3>(s: SplineLike, cache: SplineCache, t: number, out: T): T {
    if (!s.knots.length) return set(out, 0, 0, 0);
    if (s.knots.length === 1 || !cache.curves.length) return copy(out, s.knots[0].position);
    curvePointAt(cache, t, _cp);
    return evalPosition(out, cache.curves[_cp.index], _cp.t);
}

/** Unit direction of travel at t. */
export function evaluateDirection<T extends V3>(s: SplineLike, cache: SplineCache, t: number, out: T): T {
    if (s.knots.length < 2 || !cache.curves.length) {
        if (s.knots.length === 1) return normalize(out, tangentOutVec(out, s.knots[0]));
        return set(out, 0, 0, 1);
    }
    curvePointAt(cache, t, _cp);
    return evalDirection(out, cache.curves[_cp.index], _cp.t);
}

/** Unit up vector at t: knot up vectors carried along the curve without twisting. */
export function evaluateUp<T extends V3>(s: SplineLike, cache: SplineCache, t: number, out: T): T {
    if (!s.knots.length) return set(out, 0, 1, 0);
    if (s.knots.length === 1 || !cache.curves.length) return knotUp(out, s.knots[0]);
    curvePointAt(cache, t, _cp);
    return curveUp(s, cache, _cp.index, _cp.t, out);
}

export function curveUp<T extends V3>(s: SplineLike, cache: SplineCache, index: number, t: number, out: T): T {
    let table = cache.ups[index];
    if (!table) table = cache.ups[index] = buildUpTable(s, cache.curves[index], index);
    const x = clamp01(t) * UP_SAMPLES;
    const i = Math.min(Math.floor(x), UP_SAMPLES - 1);
    const f = x - i;
    const a = v3(table[i * 3], table[i * 3 + 1], table[i * 3 + 2]);
    const b = v3(table[i * 3 + 3], table[i * 3 + 4], table[i * 3 + 5]);
    lerp(out, a, b, f);
    // Keep it perpendicular to the direction of travel.
    const dir = evalDirection(v3(), cache.curves[index], t);
    projectOnPlane(out, out, dir);
    if (lenSq(out) < EPSILON) return normalize(out, a);
    return normalize(out, out);
}

/**
 * Up vectors along a curve: the start knot's up carried by a rotation
 * minimizing frame (double reflection), with the twist needed to meet the end
 * knot's up spread evenly over the curve.
 */
function buildUpTable(s: SplineLike, c: Curve, index: number): Float64Array {
    const n = s.knots.length;
    const a = s.knots[index];
    const b = s.knots[(index + 1) % n];
    const table = new Float64Array((UP_SAMPLES + 1) * 3);

    const pos: V3[] = [];
    const dirs: V3[] = [];
    for (let i = 0; i <= UP_SAMPLES; i++) {
        const t = i / UP_SAMPLES;
        pos.push(evalPosition(v3(), c, t));
        dirs.push(evalDirection(v3(), c, t));
    }

    const ups: V3[] = [];
    let r = normalize(v3(), projectOnPlane(v3(), knotUp(v3(), a), dirs[0]));
    if (lenSq(r) < EPSILON) r = anyPerpendicular(v3(), dirs[0]);
    ups.push(r);
    for (let i = 0; i < UP_SAMPLES; i++) {
        // Double reflection (Wang et al. 2008).
        const v1 = sub(v3(), pos[i + 1], pos[i]);
        const c1 = dot(v1, v1);
        const ri = ups[i];
        const ti = dirs[i];
        let rL = ri;
        let tL = ti;
        if (c1 > EPSILON * EPSILON) {
            rL = scaleAndAdd(v3(), ri, v1, (-2 / c1) * dot(v1, ri));
            tL = scaleAndAdd(v3(), ti, v1, (-2 / c1) * dot(v1, ti));
        }
        const v2 = sub(v3(), dirs[i + 1], tL);
        const c2 = dot(v2, v2);
        let next = rL;
        if (c2 > EPSILON * EPSILON) next = scaleAndAdd(v3(), rL, v2, (-2 / c2) * dot(v2, rL));
        next = normalize(v3(), projectOnPlane(v3(), next, dirs[i + 1]));
        if (lenSq(next) < EPSILON) next = copy(v3(), ups[i]);
        ups.push(next);
    }

    // Twist to reach the end knot's up.
    const endUp = normalize(v3(), projectOnPlane(v3(), knotUp(v3(), b), dirs[UP_SAMPLES]));
    let twist = 0;
    if (lenSq(endUp) > EPSILON) {
        const last = ups[UP_SAMPLES];
        const c = cross(v3(), last, endUp);
        twist = Math.atan2(dot(c, dirs[UP_SAMPLES]), dot(last, endUp));
    }
    const q = q4();
    for (let i = 0; i <= UP_SAMPLES; i++) {
        let u = ups[i];
        if (twist !== 0) {
            qFromAxisAngle(q, dirs[i], (twist * i) / UP_SAMPLES);
            u = qRotate(v3(), q, u);
        }
        table[i * 3] = u.x;
        table[i * 3 + 1] = u.y;
        table[i * 3 + 2] = u.z;
    }
    return table;
}

export interface NearestResult {
    /** Normalized distance along the spline (0..1). */
    t: number;
    curve: number;
    curveT: number;
    position: V3;
    distance: number;
}

/** Closest point on the spline to `p` (spline space). */
export function nearestPoint(s: SplineLike, cache: SplineCache, p: V3): NearestResult {
    const res: NearestResult = { t: 0, curve: 0, curveT: 0, position: v3(), distance: Infinity };
    if (!s.knots.length) return res;
    if (!cache.curves.length) {
        copy(res.position, s.knots[0].position);
        res.distance = dist(p, res.position);
        return res;
    }
    let best = Infinity;
    for (let i = 0; i < cache.curves.length; i++) {
        const r = nearestT(cache.curves[i], p, 16, 10);
        if (r.distSq < best) {
            best = r.distSq;
            res.curve = i;
            res.curveT = r.t;
        }
    }
    evalPosition(res.position, cache.curves[res.curve], res.curveT);
    res.distance = Math.sqrt(best);
    res.t = normalizedTOf(cache, res.curve, res.curveT);
    return res;
}

/**
 * Moves `distance` along the spline from normalized `fromT` (negative goes
 * back). Returns the resulting normalized t (clamped on open splines,
 * wrapped on closed ones).
 */
export function tAtDistanceFrom(s: SplineLike, cache: SplineCache, fromT: number, distance: number): number {
    if (cache.total <= EPSILON) return clamp01(fromT);
    const t = fromT + distance / cache.total;
    return s.closed ? wrap(t, 1) : clamp01(t);
}

// --------------------------------------------------------------- edit ops

export function insertKnot(s: SplineLike, index: number, k: KnotLike): void {
    s.knots.splice(index, 0, k);
    refreshAround(s, index);
}

export function removeKnot(s: SplineLike, index: number): void {
    s.knots.splice(index, 1);
    const n = s.knots.length;
    if (!n) return;
    const next = Math.min(index, n - 1);
    applyTangentMode(s, prevIndex(next, n, s.closed));
    applyTangentMode(s, next);
}

/**
 * Inserts a knot on curve `curveIndex` at parameter t without changing the
 * shape (de Casteljau split). Returns the new knot's index.
 */
export function insertOnCurve(s: SplineLike, curveIndex: number, t: number, factory: Factory): number {
    const n = s.knots.length;
    const ia = curveIndex;
    const ib = (curveIndex + 1) % n;
    const a = s.knots[ia];
    const b = s.knots[ib];
    const c = getCurve(s, curveIndex);
    const left = curve();
    const right = curve();
    split(c, t, left, right);

    const k = factory.knot();
    copy(k.position, left.p3);
    k.tension = DEFAULT_TENSION;

    const bothAuto = a.mode === TangentMode.AutoSmooth && b.mode === TangentMode.AutoSmooth;
    const bothLinear = a.mode === TangentMode.Linear && b.mode === TangentMode.Linear;

    // The new knot's up blends between its neighbors'.
    const up = knotUp(v3(), a);
    const upB = knotUp(v3(), b);
    lerp(up, up, upB, t);
    const outDir = sub(v3(), right.p1, right.p0);
    knotRotation(k.rotation, lenSq(outDir) > EPSILON ? outDir : sub(v3(), right.p0, left.p2), up);

    if (bothAuto) {
        k.mode = TangentMode.AutoSmooth;
    } else if (bothLinear) {
        k.mode = TangentMode.Linear;
    } else {
        // Keep the exact shape: shorten the neighbors' handles, the new knot gets the split handles.
        if (a.mode === TangentMode.Mirrored) a.mode = TangentMode.Continuous;
        if (b.mode === TangentMode.Mirrored) b.mode = TangentMode.Continuous;
        if (tangentsEditable(a.mode)) {
            qRotate(a.tangentOut, qInvert(q4(), a.rotation), sub(v3(), left.p1, left.p0));
        }
        if (tangentsEditable(b.mode)) {
            qRotate(b.tangentIn, qInvert(q4(), b.rotation), sub(v3(), right.p2, right.p3));
        }
        k.mode = TangentMode.Continuous;
        const inv = qInvert(q4(), k.rotation);
        qRotate(k.tangentIn, inv, sub(v3(), left.p2, left.p3));
        qRotate(k.tangentOut, inv, sub(v3(), right.p1, right.p0));
    }
    const index = ia + 1;
    s.knots.splice(index, 0, k);
    applyTangentMode(s, index);
    const m = s.knots.length;
    const p = prevIndex(index, m, s.closed);
    const q = nextIndex(index, m, s.closed);
    if (s.knots[p].mode === TangentMode.AutoSmooth) applyTangentMode(s, p);
    if (s.knots[q].mode === TangentMode.AutoSmooth) applyTangentMode(s, q);
    return index;
}

const Y180 = q4(0, 1, 0, 0);

/** Reverses the direction of travel; the shape stays the same. */
export function reverseFlow(s: SplineLike): void {
    s.knots.reverse();
    for (const k of s.knots) {
        // Turn the knot around its up axis; in and out swap places.
        const oldIn = qRotate(v3(), Y180, k.tangentIn);
        const oldOut = qRotate(v3(), Y180, k.tangentOut);
        copy(k.tangentIn, oldOut);
        copy(k.tangentOut, oldIn);
        qMul(k.rotation, k.rotation, Y180);
    }
    refreshAll(s);
}

export function setClosed(s: SplineLike, closed: boolean): void {
    s.closed = closed;
    const n = s.knots.length;
    if (!n) return;
    applyTangentMode(s, 0);
    applyTangentMode(s, n - 1);
}

// ---------------------------------------------------------- container ops

export interface KnotRef {
    spline: number;
    knot: number;
}

export function sameRef(a: KnotRef, b: KnotRef): boolean {
    return a.spline === b.spline && a.knot === b.knot;
}

function groupOf(c: ContainerLike, r: KnotRef): LinkLike | null {
    for (const g of c.links) {
        for (let i = 0; i + 1 < g.knots.length; i += 2) {
            if (g.knots[i] === r.spline && g.knots[i + 1] === r.knot) return g;
        }
    }
    return null;
}

/** Knots linked to `r` (excluding r itself). */
export function linkedKnots(c: ContainerLike, r: KnotRef): KnotRef[] {
    const g = groupOf(c, r);
    if (!g) return [];
    const res: KnotRef[] = [];
    for (let i = 0; i + 1 < g.knots.length; i += 2) {
        const o = { spline: g.knots[i], knot: g.knots[i + 1] };
        if (!sameRef(o, r)) res.push(o);
    }
    return res;
}

export function isLinked(c: ContainerLike, r: KnotRef): boolean {
    return !!groupOf(c, r);
}

/** Links all given knots together (merging their existing groups). */
export function linkKnots(c: ContainerLike, refs: KnotRef[], factory: Factory): void {
    if (refs.length < 2) return;
    const members: KnotRef[] = [];
    const add = (r: KnotRef) => {
        if (!members.some((m) => sameRef(m, r))) members.push(r);
    };
    for (const r of refs) {
        const g = groupOf(c, r);
        if (g) {
            for (let i = 0; i + 1 < g.knots.length; i += 2) add({ spline: g.knots[i], knot: g.knots[i + 1] });
            c.links.splice(c.links.indexOf(g), 1);
        }
        add(r);
    }
    const g = factory.link();
    g.knots.length = 0;
    for (const m of members) g.knots.push(m.spline, m.knot);
    c.links.push(g);
    // Linked knots share the first knot's position.
    const p = c.splines[refs[0].spline].knots[refs[0].knot].position;
    for (const m of members) {
        if (sameRef(m, refs[0])) continue;
        setKnotPosition(c.splines[m.spline], m.knot, p);
    }
}

export function unlinkKnots(c: ContainerLike, refs: KnotRef[]): void {
    for (const r of refs) {
        const g = groupOf(c, r);
        if (!g) continue;
        for (let i = 0; i + 1 < g.knots.length; i += 2) {
            if (g.knots[i] === r.spline && g.knots[i + 1] === r.knot) {
                g.knots.splice(i, 2);
                break;
            }
        }
        if (g.knots.length < 4) c.links.splice(c.links.indexOf(g), 1);
    }
}

/** Moves every knot linked to `r` onto r's position. */
export function syncLinked(c: ContainerLike, r: KnotRef): void {
    const p = c.splines[r.spline].knots[r.knot].position;
    for (const o of linkedKnots(c, r)) {
        const s = c.splines[o.spline];
        if (!s || !s.knots[o.knot]) continue;
        setKnotPosition(s, o.knot, p);
    }
}

function rewriteLinks(c: ContainerLike, map: (r: KnotRef) => KnotRef | null): void {
    for (let gi = c.links.length - 1; gi >= 0; gi--) {
        const g = c.links[gi];
        const next: number[] = [];
        for (let i = 0; i + 1 < g.knots.length; i += 2) {
            const r = map({ spline: g.knots[i], knot: g.knots[i + 1] });
            if (r && !next.some((_, j) => j % 2 === 0 && next[j] === r.spline && next[j + 1] === r.knot)) next.push(r.spline, r.knot);
        }
        if (next.length < 4) c.links.splice(gi, 1);
        else {
            g.knots.length = 0;
            g.knots.push(...next);
        }
    }
}

/** Updates links after a knot was inserted at (spline, knot). */
export function linksOnKnotInserted(c: ContainerLike, spline: number, knot: number): void {
    rewriteLinks(c, (r) => (r.spline === spline && r.knot >= knot ? { spline, knot: r.knot + 1 } : r));
}

/** Updates links after the knot at (spline, knot) was removed. */
export function linksOnKnotRemoved(c: ContainerLike, spline: number, knot: number): void {
    rewriteLinks(c, (r) => {
        if (r.spline !== spline) return r;
        if (r.knot === knot) return null;
        return r.knot > knot ? { spline, knot: r.knot - 1 } : r;
    });
}

export function linksOnSplineRemoved(c: ContainerLike, spline: number): void {
    rewriteLinks(c, (r) => {
        if (r.spline === spline) return null;
        return r.spline > spline ? { spline: r.spline - 1, knot: r.knot } : r;
    });
}

export function linksOnReversed(c: ContainerLike, spline: number, count: number): void {
    rewriteLinks(c, (r) => (r.spline === spline ? { spline, knot: count - 1 - r.knot } : r));
}

/** Container-level insert that keeps links valid. */
export function containerInsertKnot(c: ContainerLike, spline: number, index: number, k: KnotLike): void {
    linksOnKnotInserted(c, spline, index);
    insertKnot(c.splines[spline], index, k);
}

export function containerInsertOnCurve(c: ContainerLike, spline: number, curveIndex: number, t: number, factory: Factory): number {
    const s = c.splines[spline];
    const index = curveIndex + 1;
    linksOnKnotInserted(c, spline, index);
    return insertOnCurve(s, curveIndex, t, factory);
}

/**
 * Removes knots (refs may span splines). Splines left empty are removed,
 * except the container keeps at least one spline.
 */
export function containerRemoveKnots(c: ContainerLike, refs: KnotRef[]): void {
    const sorted = [...refs].sort((a, b) => (a.spline - b.spline) || (b.knot - a.knot));
    for (const r of sorted) {
        const s = c.splines[r.spline];
        if (!s || r.knot >= s.knots.length) continue;
        removeKnot(s, r.knot);
        linksOnKnotRemoved(c, r.spline, r.knot);
        if (s.knots.length < 3 && s.closed) s.closed = false;
    }
    for (let i = c.splines.length - 1; i >= 0; i--) {
        if (c.splines[i].knots.length === 0 && c.splines.length > 1) {
            c.splines.splice(i, 1);
            linksOnSplineRemoved(c, i);
        }
    }
}

export function containerReverse(c: ContainerLike, spline: number): void {
    const s = c.splines[spline];
    linksOnReversed(c, spline, s.knots.length);
    reverseFlow(s);
}

export function containerRemoveSpline(c: ContainerLike, spline: number): void {
    c.splines.splice(spline, 1);
    linksOnSplineRemoved(c, spline);
}

function cloneKnot(k: KnotLike, factory: Factory): KnotLike {
    return copyKnot(factory.knot(), k);
}

/**
 * Splits a spline at a knot (Unity's Split Knot): an open spline becomes two
 * splines sharing a copy of the knot, a closed spline opens at the knot.
 * The two copies are linked. Returns the new copy's ref, or null if the knot
 * is an end of an open spline.
 */
export function splitKnot(c: ContainerLike, r: KnotRef, factory: Factory): KnotRef | null {
    const s = c.splines[r.spline];
    const n = s.knots.length;
    if (s.closed) {
        // Rotate so the knot is first, then duplicate it at the end.
        const order: KnotLike[] = [];
        for (let i = 0; i < n; i++) order.push(s.knots[(r.knot + i) % n]);
        rewriteLinks(c, (o) => (o.spline === r.spline ? { spline: o.spline, knot: wrap(o.knot - r.knot, n) } : o));
        s.knots.length = 0;
        s.knots.push(...order, cloneKnot(order[0], factory));
        s.closed = false;
        refreshAll(s);
        const first = { spline: r.spline, knot: 0 };
        const last = { spline: r.spline, knot: n };
        linkKnots(c, [first, last], factory);
        return last;
    }
    if (r.knot <= 0 || r.knot >= n - 1) return null;
    const tail = factory.spline();
    tail.closed = false;
    tail.knots.length = 0;
    tail.knots.push(cloneKnot(s.knots[r.knot], factory), ...s.knots.slice(r.knot + 1));
    const newSpline = c.splines.length;
    // Links on knots that moved to the tail follow them.
    rewriteLinks(c, (o) => (o.spline === r.spline && o.knot > r.knot ? { spline: newSpline, knot: o.knot - r.knot } : o));
    s.knots.length = r.knot + 1;
    c.splines.push(tail);
    refreshAll(s);
    refreshAll(tail);
    const copyRef = { spline: newSpline, knot: 0 };
    linkKnots(c, [r, copyRef], factory);
    return copyRef;
}

export function isEndKnot(s: SplineLike, knot: number): boolean {
    return !s.closed && s.knots.length > 0 && (knot === 0 || knot === s.knots.length - 1);
}

/**
 * Joins two end knots (Unity's Join Knots). Ends of the same spline close it;
 * ends of different splines merge the second spline into the first, the
 * joined knot taking `a`'s position. Returns the joined knot, or null if the
 * knots can't be joined.
 */
export function joinKnots(c: ContainerLike, a: KnotRef, b: KnotRef, factory: Factory): KnotRef | null {
    const sa = c.splines[a.spline];
    const sb = c.splines[b.spline];
    if (!sa || !sb || !isEndKnot(sa, a.knot) || !isEndKnot(sb, b.knot)) return null;
    if (a.spline === b.spline) {
        if (a.knot === b.knot || sa.knots.length < 3) return null;
        // Drop the duplicate end if both ends sit on the same point.
        const first = sa.knots[0];
        const last = sa.knots[sa.knots.length - 1];
        if (distSq(first.position, last.position) < EPSILON) {
            copy(first.tangentIn, last.tangentIn);
            linksOnKnotRemoved(c, a.spline, sa.knots.length - 1);
            sa.knots.pop();
        }
        setClosed(sa, true);
        return { spline: a.spline, knot: a.knot === 0 ? 0 : Math.min(a.knot, sa.knots.length - 1) };
    }
    // Orient both so that a is the last knot of A and b the first knot of B.
    if (a.knot === 0) {
        containerReverse(c, a.spline);
        a = { spline: a.spline, knot: sa.knots.length - 1 };
    }
    if (b.knot !== 0) {
        containerReverse(c, b.spline);
        b = { spline: b.spline, knot: 0 };
    }
    const ka = sa.knots[a.knot];
    const kb = sb.knots[0];
    // The joined knot keeps A's position and in tangent, and B's out tangent.
    const outWorld = tangentOutVec(v3(), kb);
    if (ka.mode === TangentMode.Linear && kb.mode !== TangentMode.Linear) ka.mode = TangentMode.Broken;
    if (tangentsEditable(ka.mode)) {
        ka.mode = TangentMode.Broken;
        qRotate(ka.tangentOut, qInvert(q4(), ka.rotation), outWorld);
    }
    const offset = sa.knots.length - 1;
    const bIndex = b.spline;
    // B's knots (after its first) move to A; links follow.
    rewriteLinks(c, (o) => {
        if (o.spline !== bIndex) return o;
        if (o.knot === 0) return { spline: a.spline, knot: a.knot };
        return { spline: a.spline, knot: offset + o.knot };
    });
    sa.knots.push(...sb.knots.slice(1));
    c.splines.splice(bIndex, 1);
    rewriteLinks(c, (o) => (o.spline > bIndex ? { spline: o.spline - 1, knot: o.knot } : o));
    const aSpline = a.spline > bIndex ? a.spline - 1 : a.spline;
    refreshAll(c.splines[aSpline]);
    return { spline: aSpline, knot: a.knot };
}

// ---------------------------------------------------------------- shapes

export interface ShapeOptions {
    /** Size (square side, circle radius...). */
    size: number;
    /** Polygon / star points. */
    sides?: number;
    /** Helix turns. */
    turns?: number;
    /** Helix height. */
    height?: number;
    /** Make the shape in the XY plane (2D) instead of XZ (3D). */
    plane2D?: boolean;
}

/** Knot positions + modes for a template shape (Unity's Spline > Square / Circle / ...). */
export function shapeKnots(kind: string, o: ShapeOptions): { points: V3[]; mode: number; closed: boolean; tangentScale?: number } {
    const r = o.size;
    const pts: V3[] = [];
    const flat = (x: number, y: number, h = 0): V3 => (o.plane2D ? v3(x, y, h) : v3(x, h, -y));
    switch (kind) {
        case 'square':
            pts.push(flat(-r, -r), flat(-r, r), flat(r, r), flat(r, -r));
            return { points: pts, mode: TangentMode.Linear, closed: true };
        case 'rounded-square': {
            const c = r * 0.75;
            const e = r;
            pts.push(flat(-c, -e), flat(-e, -c), flat(-e, c), flat(-c, e), flat(c, e), flat(e, c), flat(e, -c), flat(c, -e));
            return { points: pts, mode: TangentMode.AutoSmooth, closed: true };
        }
        case 'circle': {
            for (let i = 0; i < 4; i++) {
                const a = (i / 4) * Math.PI * 2;
                pts.push(flat(Math.cos(a) * r, Math.sin(a) * r));
            }
            // 4 Mirrored knots with handle length 0.5523 r make a near-perfect circle.
            return { points: pts, mode: TangentMode.Mirrored, closed: true, tangentScale: 0.5523 };
        }
        case 'polygon': {
            const n = Math.max(3, Math.round(o.sides ?? 6));
            for (let i = 0; i < n; i++) {
                const a = (i / n) * Math.PI * 2 + Math.PI / 2;
                pts.push(flat(Math.cos(a) * r, Math.sin(a) * r));
            }
            return { points: pts, mode: TangentMode.Linear, closed: true };
        }
        case 'star': {
            const n = Math.max(3, Math.round(o.sides ?? 5));
            for (let i = 0; i < n * 2; i++) {
                const a = (i / (n * 2)) * Math.PI * 2 + Math.PI / 2;
                const rr = i % 2 === 0 ? r : r * 0.45;
                pts.push(flat(Math.cos(a) * rr, Math.sin(a) * rr));
            }
            return { points: pts, mode: TangentMode.Linear, closed: true };
        }
        case 'helix': {
            const turns = Math.max(0.25, o.turns ?? 3);
            const height = o.height ?? r * 2;
            const perTurn = 8;
            const n = Math.round(turns * perTurn);
            for (let i = 0; i <= n; i++) {
                const a = (i / perTurn) * Math.PI * 2;
                pts.push(flat(Math.cos(a) * r, Math.sin(a) * r, (i / n) * height));
            }
            return { points: pts, mode: TangentMode.AutoSmooth, closed: false };
        }
        case 'line':
        default:
            pts.push(flat(-r, 0), flat(r, 0));
            return { points: pts, mode: TangentMode.AutoSmooth, closed: false };
    }
}

/** Fills a spline with a shape from shapeKnots. */
export function buildShape(s: SplineLike, kind: string, o: ShapeOptions, factory: Factory): void {
    const shape = shapeKnots(kind, o);
    s.knots.length = 0;
    s.closed = shape.closed;
    const normal = o.plane2D ? v3(0, 0, 1) : v3(0, 1, 0);
    const n = shape.points.length;
    for (let i = 0; i < n; i++) {
        const k = factory.knot();
        copy(k.position, shape.points[i]);
        set(k.tangentIn, 0, 0, 0);
        set(k.tangentOut, 0, 0, 0);
        qIdentity(k.rotation);
        k.mode = shape.mode;
        k.tension = DEFAULT_TENSION;
        s.knots.push(k);
    }
    for (let i = 0; i < n; i++) {
        const k = s.knots[i];
        const prev = s.knots[prevIndex(i, n, s.closed)].position;
        const next = s.knots[nextIndex(i, n, s.closed)].position;
        const dir = sub(v3(), next, prev);
        if (lenSq(dir) < EPSILON) sub(dir, next, k.position);
        knotRotation(k.rotation, dir, normal);
        if (shape.tangentScale) {
            const l = shape.tangentScale * o.size;
            set(k.tangentIn, 0, 0, -l);
            set(k.tangentOut, 0, 0, l);
        }
    }
    refreshAll(s);
}

export { UP as KNOT_UP, FORWARD as KNOT_FORWARD };
