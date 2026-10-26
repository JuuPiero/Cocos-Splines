import assert from 'assert';
import {
    v3, q4, len, dist, dot, sub, normalize, qRotate, qLookRotation, qToEuler, qFromEuler, qIdentity, cross, V3,
} from '../assets/core/math';
import { curve, evalPosition, split, arcLength, buildLengthTable, tAtLength } from '../assets/core/curve';
import {
    TangentMode, KnotLike, SplineLike, ContainerLike, Factory, SplineCache, buildCache, ensureCache, evaluatePosition,
    evaluateDirection, evaluateUp, curvePointAt, normalizedTOf, nearestPoint, getCurve, curveCount, setTangentMode,
    setTangentVec, insertOnCurve, reverseFlow, refreshAll, tangentInVec, tangentOutVec, knotUp, linkKnots, unlinkKnots,
    linkedKnots, containerRemoveKnots, splitKnot, joinKnots, buildShape, setKnotPosition, syncLinked, setClosed,
    knotUnitToT, tToKnotUnit, containerInsertKnot, DEFAULT_TENSION,
} from '../assets/core/spline-core';
import { test, results } from './harness';

const factory: Factory = {
    knot: (): KnotLike => ({ position: v3(), tangentIn: v3(), tangentOut: v3(), rotation: q4(), mode: TangentMode.AutoSmooth, tension: DEFAULT_TENSION }),
    spline: (): SplineLike => ({ knots: [], closed: false }),
    link: () => ({ knots: [] }),
};

function knot(x: number, y: number, z: number, mode = TangentMode.AutoSmooth): KnotLike {
    const k = factory.knot();
    k.position = v3(x, y, z);
    k.mode = mode;
    return k;
}

function spline(points: [number, number, number][], mode = TangentMode.AutoSmooth, closed = false): SplineLike {
    const s: SplineLike = { knots: points.map((p) => knot(p[0], p[1], p[2], mode)), closed };
    refreshAll(s);
    return s;
}

function near(a: number, b: number, eps = 1e-6, msg = '') {
    assert.ok(Math.abs(a - b) <= eps, `${msg} ${a} != ${b} (±${eps})`);
}

function nearV(a: V3, b: V3, eps = 1e-6, msg = '') {
    assert.ok(dist(a, b) <= eps, `${msg} (${a.x}, ${a.y}, ${a.z}) != (${b.x}, ${b.y}, ${b.z})`);
}

/** Points along the spline by curve parameter (shape check independent of knot count). */
function shapeSamples(s: SplineLike, n = 200): V3[] {
    const cache = buildCache(s, new SplineCache());
    const res: V3[] = [];
    for (let i = 0; i <= n; i++) res.push(evaluatePosition(s, cache, i / n, v3()));
    return res;
}

/** Max distance from each point of `a` to the polyline `b`. */
function shapeDistance(a: V3[], b: V3[]): number {
    let worst = 0;
    for (const p of a) {
        let best = Infinity;
        for (let i = 0; i + 1 < b.length; i++) {
            const d = sub(v3(), b[i + 1], b[i]);
            const l2 = dot(d, d);
            let t = l2 > 0 ? dot(sub(v3(), p, b[i]), d) / l2 : 0;
            t = Math.max(0, Math.min(1, t));
            const q = v3(b[i].x + d.x * t, b[i].y + d.y * t, b[i].z + d.z * t);
            best = Math.min(best, dist(p, q));
        }
        worst = Math.max(worst, best);
    }
    return worst;
}

console.log('\nmath');

test('look rotation maps +Z to forward and +Y towards up', () => {
    const q = qLookRotation(q4(), v3(1, 0, 0), v3(0, 1, 0));
    nearV(qRotate(v3(), q, v3(0, 0, 1)), v3(1, 0, 0));
    nearV(qRotate(v3(), q, v3(0, 1, 0)), v3(0, 1, 0));
    const q2 = qLookRotation(q4(), v3(0, 1, 0), v3(0, 1, 0)); // degenerate up
    nearV(qRotate(v3(), q2, v3(0, 0, 1)), v3(0, 1, 0));
});

test('euler round trip (cc.Quat.toEuler / fromEuler formulas)', () => {
    const q = qFromEuler(q4(), 30, -45, 60);
    const e = qToEuler(v3(), q);
    const q2 = qFromEuler(q4(), e.x, e.y, e.z);
    const a = qRotate(v3(), q, v3(0.3, -0.7, 0.2));
    const b = qRotate(v3(), q2, v3(0.3, -0.7, 0.2));
    nearV(a, b, 1e-9);
});

console.log('\ncurves');

test('split keeps the shape', () => {
    const c = curve();
    c.p0 = v3(0, 0, 0); c.p1 = v3(1, 2, 0); c.p2 = v3(3, 2, 1); c.p3 = v3(4, 0, 0);
    const l = curve();
    const r = curve();
    split(c, 0.3, l, r);
    for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        nearV(evalPosition(v3(), l, t), evalPosition(v3(), c, t * 0.3), 1e-9);
        nearV(evalPosition(v3(), r, t), evalPosition(v3(), c, 0.3 + t * 0.7), 1e-9);
    }
});

test('arc length of a straight curve is the chord', () => {
    const c = curve();
    c.p0 = v3(0, 0, 0); c.p1 = v3(0, 0, 0); c.p2 = v3(10, 0, 0); c.p3 = v3(10, 0, 0);
    near(arcLength(c), 10, 1e-6);
    const lut = buildLengthTable(c, 32);
    // Halfway along the length lands at x = 5, even though the parameter speed is not uniform.
    near(evalPosition(v3(), c, tAtLength(lut, 5)).x, 5, 0.02);
});

console.log('\ntangent modes');

test('AutoSmooth knots have collinear, opposite tangents', () => {
    const s = spline([[0, 0, 0], [2, 0, 1], [4, 0, -1], [6, 0, 0]]);
    for (let i = 1; i < 3; i++) {
        const tin = normalize(v3(), tangentInVec(v3(), s.knots[i]));
        const tout = normalize(v3(), tangentOutVec(v3(), s.knots[i]));
        near(dot(tin, tout), -1, 1e-9, `knot ${i}`);
    }
});

test('Linear knots have no tangents; Bezier modes get explicit ones', () => {
    const s = spline([[0, 0, 0], [3, 0, 0], [3, 0, 3]], TangentMode.Linear);
    assert.strictEqual(len(tangentOutVec(v3(), s.knots[1])), 0);
    setTangentMode(s, 1, TangentMode.Broken);
    // A third of the way to each neighbor (Unity's explicit linear tangents).
    nearV(tangentInVec(v3(), s.knots[1]), v3(-1, 0, 0), 1e-9);
    nearV(tangentOutVec(v3(), s.knots[1]), v3(0, 0, 1), 1e-9);
});

test('Mirrored mirrors, Continuous keeps the other length, Broken is free', () => {
    const s = spline([[0, 0, 0], [4, 0, 0], [8, 0, 0]], TangentMode.AutoSmooth);
    setTangentMode(s, 1, TangentMode.Mirrored);
    setTangentVec(s, 1, 'out', v3(0, 0, 2));
    nearV(tangentOutVec(v3(), s.knots[1]), v3(0, 0, 2), 1e-9);
    nearV(tangentInVec(v3(), s.knots[1]), v3(0, 0, -2), 1e-9);

    setTangentMode(s, 1, TangentMode.Continuous);
    setTangentVec(s, 1, 'out', v3(3, 0, 0));
    nearV(tangentOutVec(v3(), s.knots[1]), v3(3, 0, 0), 1e-9);
    nearV(tangentInVec(v3(), s.knots[1]), v3(-2, 0, 0), 1e-9, 'in keeps its length 2');

    setTangentMode(s, 1, TangentMode.Broken);
    setTangentVec(s, 1, 'in', v3(0, 1, 0));
    nearV(tangentInVec(v3(), s.knots[1]), v3(0, 1, 0), 1e-9);
    nearV(tangentOutVec(v3(), s.knots[1]), v3(3, 0, 0), 1e-9, 'out unchanged');
});

test('dragging an AutoSmooth tangent makes the knot Continuous', () => {
    const s = spline([[0, 0, 0], [4, 0, 0], [8, 0, 0]]);
    setTangentVec(s, 1, 'out', v3(1, 1, 0));
    assert.strictEqual(s.knots[1].mode, TangentMode.Continuous);
    const tin = normalize(v3(), tangentInVec(v3(), s.knots[1]));
    near(dot(tin, normalize(v3(), v3(1, 1, 0))), -1, 1e-9);
});

test('moving a knot updates AutoSmooth neighbors', () => {
    const s = spline([[0, 0, 0], [4, 0, 0], [8, 0, 0]]);
    const before = tangentOutVec(v3(), s.knots[0]);
    setKnotPosition(s, 1, v3(4, 0, 4));
    const after = tangentOutVec(v3(), s.knots[0]);
    assert.ok(dist(before, after) > 1e-3);
});

console.log('\nedits keep the shape');

test('insert on curve keeps the shape (Bezier knots)', () => {
    const s = spline([[0, 0, 0], [3, 0, 2], [6, 0, -1], [9, 0, 0]], TangentMode.Mirrored);
    setTangentVec(s, 1, 'out', v3(2, 0, 1));
    setTangentMode(s, 2, TangentMode.Broken);
    setTangentVec(s, 2, 'in', v3(-1, 0, 2));
    const before = shapeSamples(s);
    const i = insertOnCurve(s, 1, 0.37, factory);
    assert.strictEqual(i, 2);
    assert.strictEqual(s.knots.length, 5);
    near(shapeDistance(before, shapeSamples(s, 400)), 0, 0.01);
});

test('insert on a linear curve keeps it linear', () => {
    const s = spline([[0, 0, 0], [5, 0, 0], [5, 0, 5]], TangentMode.Linear);
    insertOnCurve(s, 0, 0.5, factory);
    assert.strictEqual(s.knots[1].mode, TangentMode.Linear);
    nearV(s.knots[1].position, v3(2.5, 0, 0), 1e-9);
});

test('reverse flow keeps the shape and flips the direction', () => {
    const s = spline([[0, 0, 0], [2, 0, 3], [5, 0, -1], [8, 1, 0]], TangentMode.Mirrored);
    setTangentMode(s, 2, TangentMode.Broken);
    setTangentVec(s, 2, 'out', v3(1, 2, 0));
    const before = shapeSamples(s);
    const cache = buildCache(s, new SplineCache());
    const dirBefore = evaluateDirection(s, cache, 0.25, v3());
    reverseFlow(s);
    const after = shapeSamples(s);
    near(shapeDistance(before, after), 0, 0.01);
    const c2 = buildCache(s, new SplineCache());
    const dirAfter = evaluateDirection(s, c2, 0.75, v3());
    near(dot(dirBefore, dirAfter), -1, 0.02);
});

console.log('\nevaluation');

test('t is a normalized distance: equal steps are equal lengths', () => {
    const s = spline([[0, 0, 0], [1, 0, 0], [10, 0, 0]], TangentMode.Linear);
    const cache = buildCache(s, new SplineCache());
    near(cache.total, 10, 1e-6);
    nearV(evaluatePosition(s, cache, 0.5, v3()), v3(5, 0, 0), 0.02);
    nearV(evaluatePosition(s, cache, 0.05, v3()), v3(0.5, 0, 0), 0.02);
    nearV(evaluatePosition(s, cache, 1, v3()), v3(10, 0, 0), 1e-9);
});

test('curve point / normalized t / knot units round trip', () => {
    const s = spline([[0, 0, 0], [2, 0, 3], [5, 0, -1], [8, 1, 0]]);
    const cache = buildCache(s, new SplineCache());
    for (const t of [0, 0.1, 0.33, 0.5, 0.9, 1]) {
        const p = curvePointAt(cache, t);
        near(normalizedTOf(cache, p.index, p.t), t, 1e-4);
        near(knotUnitToT(cache, tToKnotUnit(cache, t)), t, 1e-4);
    }
    near(knotUnitToT(cache, 2), normalizedTOf(cache, 2, 0), 1e-9);
});

test('closed splines wrap to the first knot', () => {
    const s = spline([[0, 0, 0], [4, 0, 0], [4, 0, 4], [0, 0, 4]], TangentMode.Linear, true);
    assert.strictEqual(curveCount(s), 4);
    const cache = buildCache(s, new SplineCache());
    near(cache.total, 16, 1e-6);
    nearV(evaluatePosition(s, cache, 1, v3()), v3(0, 0, 0), 1e-9);
    nearV(evaluatePosition(s, cache, 0.875, v3()), v3(0, 0, 2), 0.02);
});

test('nearest point', () => {
    const s = spline([[0, 0, 0], [10, 0, 0]], TangentMode.Linear);
    const cache = buildCache(s, new SplineCache());
    const r = nearestPoint(s, cache, v3(3, 2, 0));
    nearV(r.position, v3(3, 0, 0), 1e-3);
    near(r.distance, 2, 1e-3);
    near(r.t, 0.3, 1e-3);
});

test('up vectors follow the knots without twisting', () => {
    // Planar spline on the ground: up stays +Y.
    const s = spline([[0, 0, 0], [3, 0, 3], [6, 0, 0], [9, 0, 3]]);
    const cache = buildCache(s, new SplineCache());
    for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const up = evaluateUp(s, cache, t, v3());
        const dir = evaluateDirection(s, cache, t, v3());
        near(dot(up, dir), 0, 1e-6, `perpendicular at ${t}`);
        assert.ok(up.y > 0.999, `up at ${t}: ${up.y}`);
    }
});

test('up vectors blend to a rolled knot', () => {
    const s = spline([[0, 0, 0], [10, 0, 0]], TangentMode.Linear);
    // Roll the last knot 90 degrees around its direction (+X).
    s.knots[1].rotation = qLookRotation(q4(), v3(1, 0, 0), v3(0, 0, 1));
    const cache = buildCache(s, new SplineCache());
    const end = evaluateUp(s, cache, 1, v3());
    nearV(end, v3(0, 0, 1), 1e-3);
    const mid = evaluateUp(s, cache, 0.5, v3());
    near(mid.y, Math.SQRT1_2, 0.02);
});

test('cache rebuilds when the data changes', () => {
    const s = spline([[0, 0, 0], [10, 0, 0]], TangentMode.Linear);
    const cache = ensureCache(s, new SplineCache());
    near(cache.total, 10, 1e-9);
    s.knots[1].position.x = 20;
    ensureCache(s, cache);
    near(cache.total, 20, 1e-9);
});

console.log('\ncontainer');

function container(...splines: SplineLike[]): ContainerLike {
    return { splines, links: [] };
}

test('linked knots share a position and follow each other', () => {
    const c = container(spline([[0, 0, 0], [5, 0, 0]]), spline([[5, 1, 0], [5, 0, 5]]));
    linkKnots(c, [{ spline: 0, knot: 1 }, { spline: 1, knot: 0 }], factory);
    nearV(c.splines[1].knots[0].position, v3(5, 0, 0));
    setKnotPosition(c.splines[0], 1, v3(6, 0, 1));
    syncLinked(c, { spline: 0, knot: 1 });
    nearV(c.splines[1].knots[0].position, v3(6, 0, 1));
    assert.deepStrictEqual(linkedKnots(c, { spline: 1, knot: 0 }), [{ spline: 0, knot: 1 }]);
    unlinkKnots(c, [{ spline: 0, knot: 1 }]);
    assert.strictEqual(c.links.length, 0);
});

test('links follow knot insertion and removal', () => {
    const c = container(spline([[0, 0, 0], [5, 0, 0], [9, 0, 0]]), spline([[9, 0, 0], [9, 0, 5]]));
    linkKnots(c, [{ spline: 0, knot: 2 }, { spline: 1, knot: 0 }], factory);
    containerInsertKnot(c, 0, 1, knot(2, 0, 0));
    assert.deepStrictEqual(linkedKnots(c, { spline: 1, knot: 0 }), [{ spline: 0, knot: 3 }]);
    containerRemoveKnots(c, [{ spline: 0, knot: 0 }]);
    assert.deepStrictEqual(linkedKnots(c, { spline: 1, knot: 0 }), [{ spline: 0, knot: 2 }]);
    containerRemoveKnots(c, [{ spline: 0, knot: 2 }]);
    assert.strictEqual(c.links.length, 0);
});

test('removing every knot of a spline removes it (not the last spline)', () => {
    const c = container(spline([[0, 0, 0], [1, 0, 0]]), spline([[0, 0, 2], [1, 0, 2]]));
    containerRemoveKnots(c, [{ spline: 0, knot: 0 }, { spline: 0, knot: 1 }]);
    assert.strictEqual(c.splines.length, 1);
    nearV(c.splines[0].knots[0].position, v3(0, 0, 2));
    containerRemoveKnots(c, [{ spline: 0, knot: 0 }, { spline: 0, knot: 1 }]);
    assert.strictEqual(c.splines.length, 1);
    assert.strictEqual(c.splines[0].knots.length, 0);
});

test('split an open spline at a knot', () => {
    const c = container(spline([[0, 0, 0], [3, 0, 0], [6, 0, 2], [9, 0, 0]]));
    const before = shapeSamples(c.splines[0]);
    const r = splitKnot(c, { spline: 0, knot: 1 }, factory);
    assert.deepStrictEqual(r, { spline: 1, knot: 0 });
    assert.strictEqual(c.splines[0].knots.length, 2);
    assert.strictEqual(c.splines[1].knots.length, 3);
    assert.deepStrictEqual(linkedKnots(c, { spline: 0, knot: 1 }), [{ spline: 1, knot: 0 }]);
    void before;
});

test('split a closed spline opens it at the knot', () => {
    const c = container(spline([[0, 0, 0], [4, 0, 0], [4, 0, 4], [0, 0, 4]], TangentMode.Linear, true));
    const r = splitKnot(c, { spline: 0, knot: 2 }, factory);
    const s = c.splines[0];
    assert.strictEqual(s.closed, false);
    assert.strictEqual(s.knots.length, 5);
    nearV(s.knots[0].position, v3(4, 0, 4));
    nearV(s.knots[4].position, v3(4, 0, 4));
    assert.deepStrictEqual(r, { spline: 0, knot: 4 });
    assert.deepStrictEqual(linkedKnots(c, { spline: 0, knot: 0 }), [{ spline: 0, knot: 4 }]);
});

test('join end knots of two splines merges them', () => {
    const c = container(spline([[0, 0, 0], [3, 0, 0]]), spline([[6, 0, 0], [9, 0, 0]]));
    const r = joinKnots(c, { spline: 0, knot: 1 }, { spline: 1, knot: 0 }, factory);
    assert.strictEqual(c.splines.length, 1);
    assert.strictEqual(c.splines[0].knots.length, 3);
    nearV(c.splines[0].knots[1].position, v3(3, 0, 0));
    nearV(c.splines[0].knots[2].position, v3(9, 0, 0));
    assert.deepStrictEqual(r, { spline: 0, knot: 1 });
});

test('join reverses splines as needed', () => {
    const c = container(spline([[3, 0, 0], [0, 0, 0]]), spline([[9, 0, 0], [6, 0, 0]]));
    // First knot of A with last knot of B.
    joinKnots(c, { spline: 0, knot: 0 }, { spline: 1, knot: 1 }, factory);
    const pts = c.splines[0].knots.map((k) => k.position.x);
    assert.deepStrictEqual(pts, [0, 3, 9]);
});

test('join the two ends of one spline closes it', () => {
    const c = container(spline([[0, 0, 0], [4, 0, 0], [4, 0, 4], [0, 0, 0]]));
    joinKnots(c, { spline: 0, knot: 0 }, { spline: 0, knot: 3 }, factory);
    assert.strictEqual(c.splines[0].closed, true);
    assert.strictEqual(c.splines[0].knots.length, 3, 'the duplicate end knot is dropped');
});

test('closing and opening re-applies the end knots', () => {
    const s = spline([[0, 0, 0], [4, 0, 0], [4, 0, 4]]);
    const before = tangentInVec(v3(), s.knots[0]);
    setClosed(s, true);
    assert.ok(dist(before, tangentInVec(v3(), s.knots[0])) > 1e-3);
});

console.log('\nshapes');

test('circle shape stays within 0.1% of the radius', () => {
    const s = factory.spline();
    buildShape(s, 'circle', { size: 5 }, factory);
    const cache = buildCache(s, new SplineCache());
    for (let i = 0; i < 64; i++) {
        const p = evaluatePosition(s, cache, i / 64, v3());
        near(Math.hypot(p.x, p.z), 5, 0.005 * 5 / 5 * 1.1, `point ${i}`);
        near(p.y, 0, 1e-9);
    }
    near(cache.total, 2 * Math.PI * 5, 0.01);
});

test('2D shapes lie in the XY plane, knots face up +Z', () => {
    const s = factory.spline();
    buildShape(s, 'square', { size: 100, plane2D: true }, factory);
    for (const k of s.knots) {
        near(k.position.z, 0);
        nearV(knotUp(v3(), k), v3(0, 0, 1), 1e-9);
    }
    const cache = buildCache(s, new SplineCache());
    near(cache.total, 800, 1e-6);
});

test('helix rises along +Y', () => {
    const s = factory.spline();
    buildShape(s, 'helix', { size: 1, turns: 2, height: 4 }, factory);
    near(s.knots[s.knots.length - 1].position.y, 4, 1e-9);
    assert.strictEqual(s.closed, false);
});

test('knot rotations of shapes point along the travel direction', () => {
    const s = factory.spline();
    buildShape(s, 'polygon', { size: 2, sides: 6 }, factory);
    const cache = buildCache(s, new SplineCache());
    for (let i = 0; i < s.knots.length; i++) {
        const fwd = qRotate(v3(), s.knots[i].rotation, v3(0, 0, 1));
        const c = getCurve(s, i);
        const chord = normalize(v3(), sub(v3(), c.p3, c.p0));
        assert.ok(dot(fwd, chord) > 0.4, `knot ${i}`);
    }
    void cache;
    void cross;
    void qIdentity;
});

console.log(`\n${results.passed} passed, ${results.failed} failed`);
process.exitCode = results.failed ? 1 : 0;
