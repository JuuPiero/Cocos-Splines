/**
 * Cubic Bezier curve math (pure, no engine dependency).
 *
 * A curve is the segment between two knots: p0 = knot position,
 * p1 = p0 + out tangent, p2 = next knot + its in tangent, p3 = next knot.
 */
import { V3, v3, set, copy, sub, scale, len, lerp, normalize, lenSq, EPSILON, dist } from './math';

export interface Curve {
    p0: V3;
    p1: V3;
    p2: V3;
    p3: V3;
}

export function curve(): Curve {
    return { p0: v3(), p1: v3(), p2: v3(), p3: v3() };
}

export function copyCurve(out: Curve, c: Curve): Curve {
    copy(out.p0, c.p0);
    copy(out.p1, c.p1);
    copy(out.p2, c.p2);
    copy(out.p3, c.p3);
    return out;
}

export function evalPosition<T extends V3>(out: T, c: Curve, t: number): T {
    const u = 1 - t;
    const a = u * u * u;
    const b = 3 * u * u * t;
    const d = 3 * u * t * t;
    const e = t * t * t;
    return set(
        out,
        a * c.p0.x + b * c.p1.x + d * c.p2.x + e * c.p3.x,
        a * c.p0.y + b * c.p1.y + d * c.p2.y + e * c.p3.y,
        a * c.p0.z + b * c.p1.z + d * c.p2.z + e * c.p3.z,
    );
}

/** First derivative dB/dt (not normalized). */
export function evalDerivative<T extends V3>(out: T, c: Curve, t: number): T {
    const u = 1 - t;
    const a = 3 * u * u;
    const b = 6 * u * t;
    const d = 3 * t * t;
    return set(
        out,
        a * (c.p1.x - c.p0.x) + b * (c.p2.x - c.p1.x) + d * (c.p3.x - c.p2.x),
        a * (c.p1.y - c.p0.y) + b * (c.p2.y - c.p1.y) + d * (c.p3.y - c.p2.y),
        a * (c.p1.z - c.p0.z) + b * (c.p2.z - c.p1.z) + d * (c.p3.z - c.p2.z),
    );
}

/** Second derivative d2B/dt2. */
export function evalAcceleration<T extends V3>(out: T, c: Curve, t: number): T {
    const u = 1 - t;
    return set(
        out,
        6 * u * (c.p2.x - 2 * c.p1.x + c.p0.x) + 6 * t * (c.p3.x - 2 * c.p2.x + c.p1.x),
        6 * u * (c.p2.y - 2 * c.p1.y + c.p0.y) + 6 * t * (c.p3.y - 2 * c.p2.y + c.p1.y),
        6 * u * (c.p2.z - 2 * c.p1.z + c.p0.z) + 6 * t * (c.p3.z - 2 * c.p2.z + c.p1.z),
    );
}

const _d = v3();

/**
 * Direction of travel at t, with a usable value even where the derivative
 * vanishes (linear knots have zero tangents, so B'(0) = 0): falls back to the
 * second derivative, then to the chord.
 */
export function evalDirection<T extends V3>(out: T, c: Curve, t: number): T {
    evalDerivative(_d, c, t);
    if (lenSq(_d) > EPSILON * EPSILON) return normalize(out, _d);
    // At an end with a zero tangent the curve leaves along the second derivative
    // (sign: towards the inside of the curve at t = 0, back along it at t = 1).
    evalAcceleration(_d, c, t);
    if (lenSq(_d) > EPSILON * EPSILON) {
        if (t > 0.5) scale(_d, _d, -1);
        return normalize(out, _d);
    }
    sub(_d, c.p3, c.p0);
    return normalize(out, _d);
}

/** Splits at t with de Casteljau; the halves share the split point. */
export function split(c: Curve, t: number, left: Curve, right: Curve): void {
    const p01 = lerp(v3(), c.p0, c.p1, t);
    const p12 = lerp(v3(), c.p1, c.p2, t);
    const p23 = lerp(v3(), c.p2, c.p3, t);
    const p012 = lerp(v3(), p01, p12, t);
    const p123 = lerp(v3(), p12, p23, t);
    const mid = lerp(v3(), p012, p123, t);
    const p0 = copy(v3(), c.p0);
    const p3 = copy(v3(), c.p3);
    copy(left.p0, p0);
    copy(left.p1, p01);
    copy(left.p2, p012);
    copy(left.p3, mid);
    copy(right.p0, mid);
    copy(right.p1, p123);
    copy(right.p2, p23);
    copy(right.p3, p3);
}

export function isLinear(c: Curve): boolean {
    // Both handles lie on the chord.
    const chord = sub(v3(), c.p3, c.p0);
    const l = len(chord);
    if (l < EPSILON) return dist(c.p1, c.p0) < EPSILON && dist(c.p2, c.p3) < EPSILON;
    return distToLine(c.p1, c.p0, chord, l) < l * 1e-5 && distToLine(c.p2, c.p0, chord, l) < l * 1e-5;
}

function distToLine(p: V3, o: V3, d: V3, dl: number): number {
    const px = p.x - o.x;
    const py = p.y - o.y;
    const pz = p.z - o.z;
    const cx = py * d.z - pz * d.y;
    const cy = pz * d.x - px * d.z;
    const cz = px * d.y - py * d.x;
    return Math.sqrt(cx * cx + cy * cy + cz * cz) / dl;
}

// 8-point Gauss-Legendre on [0, 1]: exact for polynomials up to degree 15,
// plenty for |B'(t)| over a short parameter range.
const GL_X = [
    0.0198550717512319, 0.1016667612931866, 0.2372337950418355, 0.4082826787521751,
    0.5917173212478249, 0.7627662049581645, 0.8983332387068134, 0.9801449282487681,
];
const GL_W = [
    0.0506142681451881, 0.1111905172266872, 0.1568533229389436, 0.1813418916891810,
    0.1813418916891810, 0.1568533229389436, 0.1111905172266872, 0.0506142681451881,
];

/** Arc length between parameters a and b. */
export function arcLength(c: Curve, a = 0, b = 1): number {
    if (b <= a) return 0;
    const h = b - a;
    let sum = 0;
    for (let i = 0; i < 8; i++) {
        evalDerivative(_d, c, a + h * GL_X[i]);
        sum += GL_W[i] * len(_d);
    }
    return sum * h;
}

/**
 * Cumulative arc length at evenly spaced parameters: lut[i] is the length from
 * t = 0 to t = i / (n - 1). Used to map distance to t.
 */
export function buildLengthTable(c: Curve, n: number, out?: Float64Array): Float64Array {
    const lut = out && out.length === n ? out : new Float64Array(n);
    lut[0] = 0;
    for (let i = 1; i < n; i++) {
        lut[i] = lut[i - 1] + arcLength(c, (i - 1) / (n - 1), i / (n - 1));
    }
    return lut;
}

/** Parameter t at arc length `d` along the curve, using a table from buildLengthTable. */
export function tAtLength(lut: Float64Array, d: number): number {
    const n = lut.length;
    const total = lut[n - 1];
    if (d <= 0 || total <= 0) return 0;
    if (d >= total) return 1;
    let lo = 0;
    let hi = n - 1;
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (lut[mid] < d) lo = mid;
        else hi = mid;
    }
    const seg = lut[hi] - lut[lo];
    const f = seg > 0 ? (d - lut[lo]) / seg : 0;
    return (lo + f) / (n - 1);
}

/** Arc length from 0 to t, using a table from buildLengthTable. */
export function lengthAtT(lut: Float64Array, t: number): number {
    const n = lut.length;
    if (t <= 0) return 0;
    if (t >= 1) return lut[n - 1];
    const x = t * (n - 1);
    const i = Math.floor(x);
    const f = x - i;
    return lut[i] + (lut[Math.min(i + 1, n - 1)] - lut[i]) * f;
}

/**
 * Closest parameter on the curve to point p: coarse sampling followed by
 * a few rounds of local refinement.
 */
export function nearestT(c: Curve, p: V3, samples = 16, iterations = 4): { t: number; distSq: number } {
    const q = v3();
    let bestT = 0;
    let best = Infinity;
    for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        evalPosition(q, c, t);
        const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2 + (q.z - p.z) ** 2;
        if (d < best) {
            best = d;
            bestT = t;
        }
    }
    let step = 1 / samples;
    for (let it = 0; it < iterations; it++) {
        step *= 0.5;
        for (const t of [bestT - step, bestT + step]) {
            if (t < 0 || t > 1) continue;
            evalPosition(q, c, t);
            const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2 + (q.z - p.z) ** 2;
            if (d < best) {
                best = d;
                bestT = t;
            }
        }
    }
    return { t: bestT, distSq: best };
}
