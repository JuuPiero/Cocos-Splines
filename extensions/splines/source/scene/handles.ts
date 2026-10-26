/**
 * Move / rotate / scale handles for the selected knots and tangents (Unity's
 * SplineMoveTool, SplineRotateTool, SplineScaleTool). The handle follows the
 * Cocos transform tool (W / E / R) and pivot setting.
 */
import {
    V3, Q4, v3, q4, copy, add, sub, scale, scaleAndAdd, dot, cross, normalize, len, lenSq,
    qRotate, qMul, qFromAxisAngle, qLookRotation, EPSILON,
} from '../../assets/core/math';
import { tangentsEditable, applyTangentMode, knotUp, TangentMode } from '../../assets/core/spline-core';
import {
    cameraForward, cameraPosition, closestOnLine, distToSegment, pointInPolygon, rayPlane, screenRay, toScreen, worldPerPixel,
} from './view';
import * as D from './draw';
import {
    ElementRef, centroid, containerRotation, elementWorldPosition, getKnot, knotWorldRotation, setKnotWorld,
    setKnotWorldRotation, setTangentWorld, setTangentWorldVec, tangentWorldVec, knotWorldPosition,
} from './model';
import { HandleAxis, S } from './state';
import { is2DView, pivotMode, snapConfig, transformToolName } from './env';

export type HandleKind = 'move' | 'rotate' | 'scale';

export interface HandleFrame {
    kind: HandleKind;
    pivot: V3;
    axes: [V3, V3, V3];
    /** Axis length in world units. */
    size: number;
    is2D: boolean;
}

const AXIS_PX = 90;
const HIT_PX = 7;

export function handleKind(): HandleKind | null {
    switch (transformToolName()) {
        case 'position':
        case 'rect':
            return 'move';
        case 'rotation':
            return 'rotate';
        case 'scale':
            return 'scale';
        default:
            return null;
    }
}

/** Handle orientation axes (unit, world space). */
export function handleAxes(elements: ElementRef[]): [V3, V3, V3] {
    const active = elements[elements.length - 1];
    const mode = S.settings.orientation;
    let q: Q4 | null = null;
    if (active && mode === 'local') q = containerRotation(active.comp);
    else if (active && mode === 'element') {
        const k = getKnot(active);
        if (k) {
            if (active.part === 'knot') q = knotWorldRotation(active.comp, k);
            else {
                const dir = tangentWorldVec(active.comp, active.spline, active.knot, active.part);
                const up = qRotate(v3(), knotWorldRotation(active.comp, k), v3(0, 1, 0));
                q = lenSq(dir) > EPSILON ? qLookRotation(q4(), dir, up) : knotWorldRotation(active.comp, k);
            }
        }
    }
    if (!q) return [v3(1, 0, 0), v3(0, 1, 0), v3(0, 0, 1)];
    return [qRotate(v3(), q, v3(1, 0, 0)), qRotate(v3(), q, v3(0, 1, 0)), qRotate(v3(), q, v3(0, 0, 1))];
}

export function handlePivot(elements: ElementRef[]): V3 {
    if (pivotMode() === 'pivot' && elements.length) return elementWorldPosition(elements[elements.length - 1]);
    return centroid(elements);
}

export function computeFrame(cam: any, elements: ElementRef[], axesOverride?: [V3, V3, V3] | null): HandleFrame | null {
    const kind = handleKind();
    if (!kind || !elements.length) return null;
    const pivot = handlePivot(elements);
    const axes = axesOverride ?? handleAxes(elements);
    return { kind, pivot, axes, size: worldPerPixel(cam, pivot) * AXIS_PX, is2D: is2DView() };
}

const AXIS_INDEX: Record<string, number> = { x: 0, y: 1, z: 2 };
const PLANES: { axis: HandleAxis; a: number; b: number; n: number }[] = [
    { axis: 'xy', a: 0, b: 1, n: 2 },
    { axis: 'yz', a: 1, b: 2, n: 0 },
    { axis: 'xz', a: 0, b: 2, n: 1 },
];

function axisColor(i: number) {
    return i === 0 ? D.Colors.axisX : i === 1 ? D.Colors.axisY : D.Colors.axisZ;
}

function visibleAxes(f: HandleFrame): number[] {
    return f.is2D ? [0, 1] : [0, 1, 2];
}

function visiblePlanes(f: HandleFrame) {
    return f.is2D ? PLANES.filter((p) => p.axis === 'xy') : PLANES;
}

/** Plane handles sit on the side of each axis that faces the camera (like Unity). */
function planeSigns(cam: any, f: HandleFrame): [number, number, number] {
    const toCam = sub(v3(), cameraPosition(cam), f.pivot);
    if (lenSq(toCam) < EPSILON) return [1, 1, 1];
    return f.axes.map((a) => (dot(a, toCam) >= 0 ? 1 : -1)) as [number, number, number];
}

function planeQuad(cam: any, f: HandleFrame, p: { a: number; b: number }): V3[] {
    const s = planeSigns(cam, f);
    const lo = f.size * 0.16;
    const hi = f.size * 0.4;
    const A = scale(v3(), f.axes[p.a], s[p.a]);
    const B = scale(v3(), f.axes[p.b], s[p.b]);
    const pt = (x: number, y: number) => add(v3(), add(v3(), f.pivot, scale(v3(), A, x)), scale(v3(), B, y));
    return [pt(lo, lo), pt(hi, lo), pt(hi, hi), pt(lo, hi)];
}

function ringPoints(f: HandleFrame, normal: V3, radius: number, segments = 48): V3[] {
    const n = normalize(v3(), normal);
    const u = normalize(v3(), cross(v3(), Math.abs(n.y) < 0.99 ? v3(0, 1, 0) : v3(1, 0, 0), n));
    const w = cross(v3(), n, u);
    const pts: V3[] = [];
    for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        pts.push(add(v3(), f.pivot, add(v3(), scale(v3(), u, Math.cos(a) * radius), scale(v3(), w, Math.sin(a) * radius))));
    }
    return pts;
}

// ------------------------------------------------------------------- draw

export function drawHandle(cam: any, f: HandleFrame, hot: HandleAxis | null): void {
    const hotColor = D.Colors.axisHot;
    if (f.kind === 'rotate') {
        for (const i of visibleAxes(f)) {
            if (f.is2D && i !== 2) continue;
            const axis: HandleAxis = (['x', 'y', 'z'] as HandleAxis[])[i];
            D.ring(f.pivot, f.axes[i], f.size, hot === axis ? hotColor : axisColor(i), 64, false, !f.is2D);
        }
        if (f.is2D) {
            // In 2D only rotation around Z makes sense.
        }
        D.ring(f.pivot, cameraForward(cam), f.size * 1.15, hot === 'view' ? hotColor : D.Colors.axisView, 64);
        return;
    }
    for (const i of visibleAxes(f)) {
        const axis: HandleAxis = (['x', 'y', 'z'] as HandleAxis[])[i];
        const col = hot === axis ? hotColor : axisColor(i);
        const tip = scaleAndAdd(v3(), f.pivot, f.axes[i], f.size);
        D.thickLine(f.pivot, tip, col, 2);
        if (f.kind === 'move') D.cone(scaleAndAdd(v3(), f.pivot, f.axes[i], f.size * 0.82), f.axes[i], f.size * 0.22, f.size * 0.07, col);
        else D.cube(tip, f.size * 0.06, f.axes[0], f.axes[1], f.axes[2], col);
    }
    if (f.kind === 'move') {
        for (const p of visiblePlanes(f)) {
            const q = planeQuad(cam, f, p);
            const col = hot === p.axis ? hotColor : axisColor(p.n);
            D.quad(q[0], q[1], q[2], q[3], D.withAlpha(col, hot === p.axis ? 110 : 60), true);
            D.quad(q[0], q[1], q[2], q[3], col, false);
        }
        D.square(f.pivot, 5, hot === 'free' ? hotColor : D.Colors.axisView, false);
    } else {
        D.cube(f.pivot, f.size * 0.08, f.axes[0], f.axes[1], f.axes[2], hot === 'free' ? hotColor : D.Colors.axisView);
    }
}

// --------------------------------------------------------------- hit test

export function hitHandle(cam: any, f: HandleFrame, mx: number, my: number): HandleAxis | null {
    const sp = toScreen(cam, f.pivot);
    if (!sp.visible) return null;
    if (f.kind === 'rotate') {
        let best: HandleAxis | null = null;
        let bestD = HIT_PX;
        const test = (axis: HandleAxis, pts: V3[]) => {
            let prev = toScreen(cam, pts[0]);
            for (let i = 1; i < pts.length; i++) {
                const cur = toScreen(cam, pts[i]);
                const d = distToSegment(mx, my, prev.x, prev.y, cur.x, cur.y).dist;
                if (d < bestD) {
                    bestD = d;
                    best = axis;
                }
                prev = cur;
            }
        };
        for (const i of visibleAxes(f)) {
            if (f.is2D && i !== 2) continue;
            test((['x', 'y', 'z'] as HandleAxis[])[i], ringPoints(f, f.axes[i], f.size));
        }
        if (f.is2D) test('z', ringPoints(f, f.axes[2], f.size));
        test('view', ringPoints(f, cameraForward(cam), f.size * 1.15));
        return best;
    }
    if (Math.hypot(mx - sp.x, my - sp.y) <= (f.kind === 'scale' ? 9 : 7)) return 'free';
    let best: HandleAxis | null = null;
    let bestD = HIT_PX;
    for (const i of visibleAxes(f)) {
        const tip = toScreen(cam, scaleAndAdd(v3(), f.pivot, f.axes[i], f.size * 1.05));
        const d = distToSegment(mx, my, sp.x, sp.y, tip.x, tip.y).dist;
        if (d < bestD) {
            bestD = d;
            best = (['x', 'y', 'z'] as HandleAxis[])[i];
        }
    }
    if (best) return best;
    if (f.kind === 'move') {
        for (const p of visiblePlanes(f)) {
            const q = planeQuad(cam, f, p).map((w) => toScreen(cam, w));
            if (pointInPolygon(mx, my, q)) return p.axis;
        }
    }
    return null;
}

// ------------------------------------------------------------------- drag

interface ElementStart {
    e: ElementRef;
    pos: V3;
    rot: Q4 | null;
    tin: V3 | null;
    tout: V3 | null;
    tvec: V3 | null;
}

export interface HandleDrag {
    frame: HandleFrame;
    axis: HandleAxis;
    /** Applies the drag for the current mouse position. Returns a status text. */
    update(mx: number, my: number, ev: any): string;
}

function snapStep(v: number, step: number): number {
    return step > 0 ? Math.round(v / step) * step : v;
}

/** Selected elements whose owner knot is not also selected (those move with the knot). */
function effectiveElements(elements: ElementRef[]): ElementRef[] {
    return elements.filter((e) => e.part === 'knot' || !elements.some((o) => o.part === 'knot' && o.comp === e.comp && o.spline === e.spline && o.knot === e.knot));
}

function captureStarts(elements: ElementRef[]): ElementStart[] {
    return effectiveElements(elements).map((e) => {
        const k = getKnot(e);
        const isKnot = e.part === 'knot';
        return {
            e,
            pos: elementWorldPosition(e),
            rot: isKnot ? knotWorldRotation(e.comp, k) : null,
            tin: isKnot ? tangentWorldVec(e.comp, e.spline, e.knot, 'in') : null,
            tout: isKnot ? tangentWorldVec(e.comp, e.spline, e.knot, 'out') : null,
            tvec: !isKnot ? tangentWorldVec(e.comp, e.spline, e.knot, e.part as 'in' | 'out') : null,
        };
    });
}

export function startHandleDrag(cam: any, f: HandleFrame, axis: HandleAxis, mx: number, my: number, elements: ElementRef[]): HandleDrag | null {
    const starts = captureStarts(elements);
    if (!starts.length) return null;
    if (f.kind === 'move') return moveDrag(cam, f, axis, mx, my, starts);
    if (f.kind === 'rotate') return rotateDrag(cam, f, axis, mx, my, starts);
    return scaleDrag(cam, f, axis, mx, my, starts);
}

/** Point under the mouse on the drag constraint (axis line or plane). */
function constraintPoint(cam: any, f: HandleFrame, axis: HandleAxis, mx: number, my: number): V3 | null {
    const ray = screenRay(cam, mx, my);
    if (axis in AXIS_INDEX) return closestOnLine(ray, f.pivot, f.axes[AXIS_INDEX[axis]]);
    if (axis === 'free') return rayPlane(ray, f.pivot, cameraForward(cam), true);
    const p = PLANES.find((pl) => pl.axis === axis);
    if (!p) return null;
    return rayPlane(ray, f.pivot, f.axes[p.n], true);
}

function moveDrag(cam: any, f: HandleFrame, axis: HandleAxis, mx: number, my: number, starts: ElementStart[]): HandleDrag | null {
    const start = constraintPoint(cam, f, axis, mx, my);
    if (!start) return null;
    return {
        frame: f,
        axis,
        update(x, y, ev) {
            const cur = constraintPoint(cam, f, axis, x, y);
            if (!cur) return '';
            const delta = sub(v3(), cur, start);
            const snap = snapConfig();
            if (snap.isPositionSnapEnabled !== !!ev?.ctrlKey) {
                // Snap the movement along each handle axis.
                const steps = [snap.position.x, snap.position.y, snap.position.z];
                const out = v3();
                for (let i = 0; i < 3; i++) scaleAndAdd(out, out, f.axes[i], snapStep(dot(delta, f.axes[i]), steps[i]));
                copy(delta, out);
            }
            for (const s of starts) {
                const target = add(v3(), s.pos, delta);
                if (s.e.part === 'knot') setKnotWorld(s.e.comp, s.e.spline, s.e.knot, target);
                else setTangentWorld(s.e.comp, s.e.spline, s.e.knot, s.e.part, target);
            }
            const d = [dot(delta, f.axes[0]), dot(delta, f.axes[1]), dot(delta, f.axes[2])].map((n) => n.toFixed(3));
            return `Δ ${d.join(', ')}`;
        },
    };
}

function signedAngle(a: V3, b: V3, n: V3): number {
    return Math.atan2(dot(cross(v3(), a, b), n), dot(a, b));
}

function rotateDrag(cam: any, f: HandleFrame, axis: HandleAxis, mx: number, my: number, starts: ElementStart[]): HandleDrag | null {
    const n = axis === 'view' ? scale(v3(), cameraForward(cam), -1) : copy(v3(), f.axes[AXIS_INDEX[axis] ?? 2]);
    const pivot = copy(v3(), f.pivot);
    const sp = toScreen(cam, pivot);
    const onPlane = (x: number, y: number) => {
        const hit = rayPlane(screenRay(cam, x, y), pivot, n, true);
        if (!hit) return null;
        const v = sub(v3(), hit, pivot);
        return lenSq(v) > EPSILON ? v : null;
    };
    const facing = Math.abs(dot(n, cameraForward(cam)));
    const useScreen = facing < 0.15; // ring seen edge-on: use screen angle
    const v0 = useScreen ? null : onPlane(mx, my);
    const a0 = Math.atan2(my - sp.y, mx - sp.x);
    const screenSign = dot(n, cameraForward(cam)) > 0 ? 1 : -1;
    return {
        frame: f,
        axis,
        update(x, y, ev) {
            let angle: number;
            const v1 = v0 ? onPlane(x, y) : null;
            if (v0 && v1) angle = signedAngle(v0, v1, n);
            else angle = (Math.atan2(y - sp.y, x - sp.x) - a0) * -screenSign;
            const snap = snapConfig();
            let deg = (angle * 180) / Math.PI;
            if (snap.isRotationSnapEnabled !== !!ev?.ctrlKey) deg = snapStep(deg, snap.rotation || 15);
            const q = qFromAxisAngle(q4(), n, (deg * Math.PI) / 180);
            const many = starts.length > 1;
            for (const s of starts) {
                const e = s.e;
                const k = getKnot(e);
                if (!k) continue;
                if (e.part === 'knot') {
                    if (many || len(sub(v3(), s.pos, pivot)) > EPSILON) {
                        const p = add(v3(), pivot, qRotate(v3(), q, sub(v3(), s.pos, pivot)));
                        setKnotWorld(e.comp, e.spline, e.knot, p);
                    }
                    setKnotWorldRotation(e.comp, k, qMul(q4(), q, s.rot!));
                    applyTangentMode(e.comp.splines[e.spline], e.knot);
                } else {
                    setTangentWorldVec(e.comp, e.spline, e.knot, e.part as 'in' | 'out', qRotate(v3(), q, s.tvec!));
                }
            }
            return `${deg.toFixed(1)}°`;
        },
    };
}

function scaleDrag(cam: any, f: HandleFrame, axis: HandleAxis, mx: number, my: number, starts: ElementStart[]): HandleDrag | null {
    const pivot = copy(v3(), f.pivot);
    const sp = toScreen(cam, pivot);
    let dirX = 1;
    let dirY = 0;
    let screenLen = 80;
    if (axis in AXIS_INDEX) {
        const tip = toScreen(cam, scaleAndAdd(v3(), pivot, f.axes[AXIS_INDEX[axis]], f.size));
        const dx = tip.x - sp.x;
        const dy = tip.y - sp.y;
        const l = Math.hypot(dx, dy);
        if (l > 1) {
            dirX = dx / l;
            dirY = dy / l;
            screenLen = l;
        }
    }
    const ax = f.axes;
    // Applies a per-axis scale (in handle axes) to a world vector.
    const scaleVec = (v: V3, s: [number, number, number]) => {
        const out = v3();
        for (let i = 0; i < 3; i++) scaleAndAdd(out, out, ax[i], dot(v, ax[i]) * s[i]);
        return out;
    };
    return {
        frame: f,
        axis,
        update(x, y, ev) {
            let factor: number;
            if (axis === 'free') factor = 1 + ((x - mx) + (y - my)) / 120;
            else factor = 1 + ((x - mx) * dirX + (y - my) * dirY) / screenLen;
            const snap = snapConfig();
            if (snap.isScaleSnapEnabled !== !!ev?.ctrlKey) factor = 1 + snapStep(factor - 1, snap.scale || 0.1);
            const s: [number, number, number] = axis === 'free' ? [factor, factor, factor] : [1, 1, 1];
            if (axis in AXIS_INDEX) s[AXIS_INDEX[axis]] = factor;
            const many = starts.length > 1;
            for (const st of starts) {
                const e = st.e;
                const k = getKnot(e);
                if (!k) continue;
                if (e.part === 'knot') {
                    if (many) setKnotWorld(e.comp, e.spline, e.knot, add(v3(), pivot, scaleVec(sub(v3(), st.pos, pivot), s)));
                    const spline = e.comp.splines[e.spline];
                    if (tangentsEditable(k.mode)) {
                        // Scale both tangents; Broken keeps them independent.
                        const tin = scaleVec(st.tin!, s);
                        const tout = scaleVec(st.tout!, s);
                        setTangentWorldVec(e.comp, e.spline, e.knot, 'out', tout);
                        if (k.mode === TangentMode.Broken) setTangentWorldVec(e.comp, e.spline, e.knot, 'in', tin);
                        else if (k.mode === TangentMode.Continuous) {
                            // Continuous keeps its own in length: scale it too (Mirrored follows the out tangent).
                            const dir = normalize(v3(), tangentWorldVec(e.comp, e.spline, e.knot, 'in'));
                            if (lenSq(dir) > EPSILON) setTangentWorldVec(e.comp, e.spline, e.knot, 'in', scale(v3(), dir, len(tin)));
                        }
                    }
                    applyTangentMode(spline, e.knot);
                } else {
                    setTangentWorldVec(e.comp, e.spline, e.knot, e.part as 'in' | 'out', scaleVec(st.tvec!, s));
                }
            }
            return `× ${factor.toFixed(3)}`;
        },
    };
}

export { knotUp, knotWorldPosition };
