/**
 * Draws splines, knots, tangents and handles into the Scene view each frame,
 * and finds what is under the mouse.
 */
import { V3, v3, scaleAndAdd, normalize, lenSq } from '../../assets/core/math';
import { Curve, curve, evalPosition, evalDirection } from '../../assets/core/curve';
import {
    TangentMode, getCurve, curveCount, prevIndex, nextIndex, tangentsEditable, isLinked, curveUp,
} from '../../assets/core/spline-core';
import { allContainers, runtimeReady } from './env';
import {
    sceneCamera, toScreen, worldPerPixel, distToSegment, beginLabels, addLabel, endLabels, ScreenPoint,
} from './view';
import * as D from './draw';
import {
    ElementRef, Part, toWorld, dirToWorld, knotWorldPosition, tangentWorldPosition, tangentUsed, getKnot, elementWorldPosition,
} from './model';
import { Hit, S } from './state';
import { computeFrame, drawHandle, hitHandle, HandleFrame } from './handles';
import { updateTargets } from './context';

const KNOT_PX = 5;
const TANGENT_PX = 3.5;
const HIT_KNOT = 8;
const HIT_TANGENT = 7;
const HIT_CURVE = 6;

const _wc: Curve = curve();

/** A curve's control points in world space (Bezier curves are affine invariant). */
export function worldCurve(comp: any, spline: any, i: number, out: Curve = _wc): Curve {
    getCurve(spline, i, out);
    toWorld(comp, out.p0, out.p0);
    toWorld(comp, out.p1, out.p1);
    toWorld(comp, out.p2, out.p2);
    toWorld(comp, out.p3, out.p3);
    return out;
}

function curveSamples(cam: any, c: Curve): number {
    const a = toScreen(cam, c.p0);
    const b = toScreen(cam, c.p1);
    const d = toScreen(cam, c.p2);
    const e = toScreen(cam, c.p3);
    if (!a.visible && !e.visible) return 8;
    const l = Math.hypot(b.x - a.x, b.y - a.y) + Math.hypot(d.x - b.x, d.y - b.y) + Math.hypot(e.x - d.x, e.y - d.y);
    return Math.max(4, Math.min(64, Math.ceil(l / 10)));
}

const pts: V3[] = [];
function samplePoints(cam: any, c: Curve): V3[] {
    const n = curveSamples(cam, c);
    while (pts.length <= n) pts.push(v3());
    for (let i = 0; i <= n; i++) evalPosition(pts[i], c, i / n);
    return pts.slice(0, n + 1);
}

/** Tangent handles shown for the selection (Unity: the tangents of the curves next to selected elements). */
export function visibleTangents(targets: any[]): Set<string> {
    const set = new Set<string>();
    if (!S.context) return set;
    const addTangent = (comp: any, s: number, k: number, part: 'in' | 'out', allowAuto: boolean) => {
        const spline = comp.splines[s];
        const knot = spline?.knots[k];
        if (!knot || !tangentUsed(spline, k, part)) return;
        if (!tangentsEditable(knot.mode) && !(allowAuto && knot.mode === TangentMode.AutoSmooth)) return;
        set.add(`${comp.uuid}:${s}:${k}:${part}`);
    };
    if (S.settings.showAllTangents) {
        for (const comp of targets) {
            comp.splines.forEach((spline: any, s: number) => {
                for (let k = 0; k < spline.knots.length; k++) {
                    addTangent(comp, s, k, 'in', false);
                    addTangent(comp, s, k, 'out', false);
                }
            });
        }
    }
    for (const e of S.selection.all()) {
        const spline = e.comp.splines[e.spline];
        if (!spline) continue;
        const n = spline.knots.length;
        addTangent(e.comp, e.spline, e.knot, 'in', e.part === 'knot');
        addTangent(e.comp, e.spline, e.knot, 'out', e.part === 'knot');
        const p = prevIndex(e.knot, n, spline.closed);
        const q = nextIndex(e.knot, n, spline.closed);
        if (p !== e.knot) addTangent(e.comp, e.spline, p, 'out', false);
        if (q !== e.knot) addTangent(e.comp, e.spline, q, 'in', false);
    }
    return set;
}

function hoverIs(kind: 'knot' | 'tangent', comp: any, s: number, k: number, part: Part): boolean {
    const h = S.hover;
    if (!h || (h.kind !== kind)) return false;
    const r = (h as any).ref as ElementRef;
    return r.comp === comp && r.spline === s && r.knot === k && r.part === part;
}

function hoverCurve(comp: any, s: number, i: number): boolean {
    const h = S.hover;
    return !!h && h.kind === 'curve' && h.comp === comp && h.spline === s && h.curve === i;
}

// ------------------------------------------------------------------- draw

let handleAxesOverride: [V3, V3, V3] | null = null;

/** Keeps the handle orientation fixed during a drag. */
export function setHandleAxesOverride(axes: [V3, V3, V3] | null): void {
    handleAxesOverride = axes;
}

export function currentHandleFrame(cam: any): HandleFrame | null {
    if (!S.context || S.tool !== 'select') return null;
    const list = S.selection.all();
    if (!list.length) return null;
    return computeFrame(cam, list, handleAxesOverride);
}

export function drawFrame(): void {
    if (!runtimeReady()) return;
    const cam = sceneCamera();
    if (!cam) return;
    const targets = updateTargets();
    const containers = S.settings.showAll ? allContainers() : targets;
    if (!containers.length && !S.preview) {
        endLabels();
        return;
    }
    if (!D.beginDraw(cam)) return;
    S.diag.draws++;
    beginLabels();
    const tangents = visibleTangents(targets);
    for (const comp of containers) {
        try {
            drawContainer(cam, comp, targets.includes(comp), tangents);
        } catch (e) {
            S.diag.errors.length < 30 && S.diag.errors.push(String((e as Error)?.stack || e));
        }
    }
    if (S.context && S.tool === 'select') {
        const f = currentHandleFrame(cam);
        if (f) drawHandle(cam, f, S.hover?.kind === 'handle' ? S.hover.axis : dragAxis);
    }
    drawToolPreview(cam);
    endLabels();
}

/** Axis being dragged (highlighted). */
export let dragAxis: any = null;
export function setDragAxis(a: any): void {
    dragAxis = a;
}

/** Extra drawing hook for the Draw tool. */
let previewDrawer: ((cam: any) => void) | null = null;
export function setPreviewDrawer(fn: ((cam: any) => void) | null): void {
    previewDrawer = fn;
}

function drawToolPreview(cam: any): void {
    if (previewDrawer) previewDrawer(cam);
}

const _p = v3();
const _q = v3();

function drawContainer(cam: any, comp: any, isTarget: boolean, tangents: Set<string>): void {
    const edit = isTarget && S.context;
    comp.splines.forEach((spline: any, s: number) => {
        const count = curveCount(spline);
        for (let i = 0; i < count; i++) {
            const c = worldCurve(comp, spline, i);
            const points = samplePoints(cam, c);
            let col = isTarget ? D.Colors.curveSelected : D.Colors.curveDim;
            if (edit && hoverCurve(comp, s, i)) col = D.Colors.curveHover;
            D.polyline(points, col, isTarget ? 2 : 1);
            if (isTarget && S.settings.showFlow && points.length > 2) {
                // Direction arrow in the middle of each curve.
                evalPosition(_p, c, 0.5);
                evalDirection(_q, c, 0.5);
                D.chevron(_p, _q, 7, D.Colors.flow);
            }
            if (isTarget && S.settings.showNormals) {
                const n = 4;
                for (let j = 0; j <= n; j++) {
                    const t = j / n;
                    if (j === n && i < count - 1) continue;
                    evalPosition(_p, c, t);
                    const up = upAt(comp, spline, i, t);
                    const l = worldPerPixel(cam, _p) * 22;
                    D.line(_p, scaleAndAdd(v3(), _p, up, l), D.Colors.normal);
                }
            }
        }
        if (!isTarget) return;
        const n = spline.knots.length;
        for (let k = 0; k < n; k++) {
            const pos = knotWorldPosition(comp, s, k, v3());
            const sp = toScreen(cam, pos);
            if (!sp.visible) continue;
            if (edit) {
                for (const part of ['in', 'out'] as const) {
                    if (!tangents.has(`${comp.uuid}:${s}:${k}:${part}`)) continue;
                    drawTangent(cam, comp, s, k, part, pos);
                }
            }
            drawKnot(cam, comp, s, k, pos, edit);
            if (S.settings.showKnotIndices && edit) {
                addLabel(cam, sp.x, sp.y, n > 0 && spline.closed === false && k === 0 ? `${k} (start)` : String(k), '#ddd');
            }
        }
        if (n === 1 && edit) {
            // A lone knot still shows its direction.
            const k = spline.knots[0];
            const pos = knotWorldPosition(comp, s, 0, v3());
            const dir = dirToWorld(comp, rotateZ(k), v3());
            D.chevron(scaleAndAdd(v3(), pos, normalize(v3(), dir), worldPerPixel(cam, pos) * 22), dir, 7, D.Colors.flow);
        }
    });
}

function rotateZ(k: any): V3 {
    // Knot forward (+Z) in spline space.
    const q = k.rotation;
    const x = 2 * (q.x * q.z + q.w * q.y);
    const y = 2 * (q.y * q.z - q.w * q.x);
    const z = 1 - 2 * (q.x * q.x + q.y * q.y);
    return v3(x, y, z);
}

/** World up vector on curve `curveIndex` at curve parameter t. */
function upAt(comp: any, spline: any, curveIndex: number, t: number): V3 {
    try {
        const local = curveUp(spline, spline.cache, curveIndex, t, v3());
        const w = dirToWorld(comp, local, v3());
        return lenSq(w) > 0 ? normalize(w, w) : v3(0, 1, 0);
    } catch {
        return v3(0, 1, 0);
    }
}

function drawKnot(cam: any, comp: any, s: number, k: number, pos: V3, edit: boolean): void {
    const selected = edit && S.selection.hasKnot(comp, s, k);
    const hovered = edit && hoverIs('knot', comp, s, k, 'knot');
    const linked = isLinked(comp, { spline: s, knot: k });
    if (!edit) {
        D.disc(pos, 3, D.Colors.curveSelected, 10);
        return;
    }
    const r = selected || hovered ? KNOT_PX + 1 : KNOT_PX;
    D.disc(pos, r, selected ? D.Colors.selected : D.Colors.knot, 14);
    D.circle(pos, r, hovered ? D.Colors.hover : linked ? D.Colors.linked : D.Colors.knotOutline, 14);
    if (selected) {
        // Knot orientation: forward along the spline, up in green.
        const knot = comp.splines[s].knots[k];
        const wpp = worldPerPixel(cam, pos);
        const fwd = normalize(v3(), dirToWorld(comp, rotateZ(knot), v3()));
        const upLocal = upOf(knot);
        const up = normalize(v3(), dirToWorld(comp, upLocal, v3()));
        if (lenSq(up) > 0) D.line(pos, scaleAndAdd(v3(), pos, up, wpp * 20), D.Colors.normal);
        if (lenSq(fwd) > 0 && knot.mode === TangentMode.Linear) D.line(pos, scaleAndAdd(v3(), pos, fwd, wpp * 14), D.Colors.selected);
    }
}

function upOf(k: any): V3 {
    const q = k.rotation;
    const x = 2 * (q.x * q.y - q.w * q.z);
    const y = 1 - 2 * (q.x * q.x + q.z * q.z);
    const z = 2 * (q.y * q.z + q.w * q.x);
    return v3(x, y, z);
}

function drawTangent(cam: any, comp: any, s: number, k: number, part: 'in' | 'out', knotPos: V3): void {
    const end = tangentWorldPosition(comp, s, k, part, v3());
    const ref: ElementRef = { comp, spline: s, knot: k, part };
    const selected = S.selection.has(ref);
    const hovered = hoverIs('tangent', comp, s, k, part);
    const auto = comp.splines[s].knots[k].mode === TangentMode.AutoSmooth;
    const lineCol = selected ? D.Colors.selected : auto ? D.withAlpha(D.Colors.tangentLine, 120) : D.Colors.tangentLine;
    D.line(knotPos, end, lineCol);
    const col = selected ? D.Colors.selected : hovered ? D.Colors.hover : auto ? D.withAlpha(D.Colors.tangent, 140) : D.Colors.tangent;
    D.diamond(end, hovered || selected ? TANGENT_PX + 1 : TANGENT_PX, col, true);
}

// --------------------------------------------------------------- hit test

/** Element / handle / curve under a screen point (topmost first). */
export function hitTest(cam: any, mx: number, my: number, opts: { handles?: boolean; curves?: boolean; outsideContext?: boolean } = {}): Hit | null {
    const targets = S.lastTargets;
    if (!targets.length) return null;
    if (S.context && opts.handles !== false) {
        const f = currentHandleFrame(cam);
        if (f) {
            const axis = hitHandle(cam, f, mx, my);
            if (axis) return { kind: 'handle', axis };
        }
    }
    const sp: ScreenPoint = { x: 0, y: 0, visible: true };
    // Tangents first (they sit on top of knots when short).
    if (S.context) {
        let best: Hit | null = null;
        let bestD = HIT_TANGENT;
        for (const key of visibleTangents(targets)) {
            const [uuid, ss, kk, part] = key.split(':');
            const comp = targets.find((c) => c.uuid === uuid);
            if (!comp) continue;
            const s = Number(ss);
            const k = Number(kk);
            toScreen(cam, tangentWorldPosition(comp, s, k, part as 'in' | 'out'), sp);
            if (!sp.visible) continue;
            const d = Math.hypot(sp.x - mx, sp.y - my);
            if (d < bestD) {
                bestD = d;
                best = { kind: 'tangent', ref: { comp, spline: s, knot: k, part: part as Part } };
            }
        }
        if (best) return best;
    }
    if (S.context || opts.outsideContext) {
        let best: Hit | null = null;
        let bestD = HIT_KNOT;
        for (const comp of targets) {
            comp.splines.forEach((spline: any, s: number) => {
                for (let k = 0; k < spline.knots.length; k++) {
                    toScreen(cam, knotWorldPosition(comp, s, k), sp);
                    if (!sp.visible) continue;
                    const d = Math.hypot(sp.x - mx, sp.y - my);
                    if (d < bestD) {
                        bestD = d;
                        best = { kind: 'knot', ref: { comp, spline: s, knot: k, part: 'knot' } };
                    }
                }
            });
        }
        if (best) return best;
    }
    if (opts.curves !== false && (S.context || opts.outsideContext)) return hitCurve(cam, mx, my, targets);
    return null;
}

export function hitCurve(cam: any, mx: number, my: number, targets: any[], maxPx = HIT_CURVE): Hit | null {
    let best: Hit | null = null;
    let bestD = maxPx;
    const a: ScreenPoint = { x: 0, y: 0, visible: true };
    const b: ScreenPoint = { x: 0, y: 0, visible: true };
    for (const comp of targets) {
        comp.splines.forEach((spline: any, s: number) => {
            const count = curveCount(spline);
            for (let i = 0; i < count; i++) {
                const c = worldCurve(comp, spline, i, curve());
                const n = curveSamples(cam, c) * 2;
                const p = v3();
                evalPosition(p, c, 0);
                toScreen(cam, p, a);
                for (let j = 1; j <= n; j++) {
                    evalPosition(p, c, j / n);
                    toScreen(cam, p, b);
                    if (a.visible && b.visible) {
                        const r = distToSegment(mx, my, a.x, a.y, b.x, b.y);
                        if (r.dist < bestD) {
                            bestD = r.dist;
                            const t = (j - 1 + r.f) / n;
                            best = { kind: 'curve', comp, spline: s, curve: i, t, world: evalPosition(v3(), c, t) };
                        }
                    }
                    a.x = b.x;
                    a.y = b.y;
                    a.visible = b.visible;
                }
            }
        });
    }
    return best;
}

/** Knots inside a screen rectangle. */
export function knotsInRect(cam: any, x0: number, y0: number, x1: number, y1: number): ElementRef[] {
    const minX = Math.min(x0, x1);
    const maxX = Math.max(x0, x1);
    const minY = Math.min(y0, y1);
    const maxY = Math.max(y0, y1);
    const res: ElementRef[] = [];
    const sp: ScreenPoint = { x: 0, y: 0, visible: true };
    for (const comp of S.lastTargets) {
        comp.splines.forEach((spline: any, s: number) => {
            for (let k = 0; k < spline.knots.length; k++) {
                toScreen(cam, knotWorldPosition(comp, s, k), sp);
                if (sp.visible && sp.x >= minX && sp.x <= maxX && sp.y >= minY && sp.y <= maxY) {
                    res.push({ comp, spline: s, knot: k, part: 'knot' });
                }
            }
        });
    }
    return res;
}
