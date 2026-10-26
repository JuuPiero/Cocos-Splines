/**
 * Mouse and keyboard in the Scene view.
 *
 * Listeners are registered on cce.Operation above the editor's gizmos and
 * camera, so a press on a knot, tangent or handle never reaches them.
 * Everything else passes through, except inside the edit context where an
 * empty-space drag selects knots in a rectangle (like Unity).
 */
import { V3, v3, sub, add, dot, normalize, lenSq, scaleAndAdd, copy } from '../../assets/core/math';
import { Curve, curve, evalPosition } from '../../assets/core/curve';
import {
    TangentMode, containerInsertKnot, setClosed, isEndKnot, setTangentMode, tangentInVec, tangentOutVec, knotRotation,
} from '../../assets/core/spline-core';
import { cc, cce, factory, is2DView, runtimeReady, snapConfig, repaint } from './env';
import {
    sceneCamera, eventToScreen, screenRay, rayPlane, cameraForward, showRect, hideRect, showTip, hideTip, Ray,
} from './view';
import {
    ElementRef, elementWorldPosition, setKnotWorld, setTangentWorld, toLocal, toWorld, dirToWorld, knotWorldPosition,
} from './model';
import { S, Hit, note, bumpState } from './state';
import { hitTest, knotsInRect, currentHandleFrame, setHandleAxesOverride, setDragAxis, setPreviewDrawer } from './render';
import { startHandleDrag, HandleDrag } from './handles';
import { EditSession, recordEdit } from './undo';
import { updateTargets, setContext, setTool, maybeBroadcast } from './context';
import {
    deleteSelection, cycleModeSelected, selectAll, insertOnCurve, clearSelection,
} from './ops';
import * as D from './draw';

export const PRIORITY = 100; // Cocos: gizmos 99, camera 98
const DRAG_PX = 4;

type Active =
    | { kind: 'handle'; drag: HandleDrag; session: EditSession }
    | {
        kind: 'element';
        ref: ElementRef;
        x0: number;
        y0: number;
        dragging: boolean;
        toggled: boolean;
        session: EditSession | null;
        grab: V3 | null;
        starts: { e: ElementRef; pos: V3 }[];
    }
    | {
        kind: 'rect';
        x0: number;
        y0: number;
        moved: boolean;
        additive: boolean;
        base: ElementRef[];
        down: any;
        onCurve: boolean;
    }
    | {
        kind: 'draw';
        comp: any;
        spline: number;
        knot: number;
        part: 'in' | 'out';
        x0: number;
        y0: number;
        dragging: boolean;
        session: EditSession;
        normal: V3;
    };

let active: Active | null = null;
let lastHoverKey = '';

function compsOf(list: ElementRef[]): any[] {
    return [...new Set(list.map((e) => e.comp))];
}

function hitKey(h: Hit | null): string {
    if (!h) return '';
    switch (h.kind) {
        case 'handle': return `h:${h.axis}`;
        case 'knot':
        case 'tangent': return `${h.kind}:${h.ref.comp.uuid}:${h.ref.spline}:${h.ref.knot}:${h.ref.part}`;
        case 'curve': return `c:${h.comp.uuid}:${h.spline}:${h.curve}`;
    }
}

function setHover(h: Hit | null): void {
    const key = hitKey(h);
    S.hover = h;
    if (key !== lastHoverKey) {
        lastHoverKey = key;
        repaint();
    }
}

function selectionChanged(): void {
    bumpState();
    maybeBroadcast();
    repaint();
}

function canEdit(): boolean {
    return S.primary && !S.replaying && runtimeReady();
}

/** Pointer position for an event, or null if there is no Scene view camera. */
function pointer(ev: any): { cam: any; x: number; y: number } | null {
    const cam = sceneCamera();
    if (!cam) return null;
    const p = eventToScreen(cam, ev);
    return { cam, x: p.x, y: p.y };
}

// ---------------------------------------------------------------- mouse

export function onMouseDown(ev: any): boolean {
    if (!canEdit()) return true;
    // A drag whose mouse-up never arrived (released outside the view) ends here.
    if (active) cancelActive();
    S.diag.mouseDowns++;
    const left = ev.button === 0 || (ev.button === undefined && ev.leftButton);
    if (!left || ev.altKey) return true;
    const p = pointer(ev);
    if (!p) return true;
    const targets = updateTargets();
    if (!targets.length) return true;
    try {
        if (S.tool === 'draw') return drawDown(p.cam, p.x, p.y, ev);
        return selectDown(p.cam, p.x, p.y, ev);
    } catch (e) {
        note(`mousedown: ${(e as Error)?.stack || e}`);
        active = null;
        return true;
    }
}

function selectDown(cam: any, x: number, y: number, ev: any): boolean {
    const hit = hitTest(cam, x, y, { outsideContext: !S.context });
    if (!S.context) {
        // Clicking a knot of a selected spline starts editing it.
        if (hit?.kind !== 'knot') return true;
        setContext(true);
    }
    S.diag.blocked++;
    if (hit?.kind === 'handle') {
        const frame = currentHandleFrame(cam);
        const elements = S.selection.all();
        if (!frame) return false;
        const drag = startHandleDrag(cam, frame, hit.axis, x, y, elements);
        if (!drag) return false;
        setHandleAxesOverride(frame.axes);
        setDragAxis(hit.axis);
        active = { kind: 'handle', drag, session: new EditSession(compsOf(elements)) };
        return false;
    }
    if (hit?.kind === 'knot' || hit?.kind === 'tangent') {
        const ref = hit.ref;
        const additive = !!(ev.shiftKey || ev.ctrlKey || ev.metaKey);
        let toggled = false;
        if (additive) {
            S.selection.toggle(ref);
            toggled = true;
        } else if (!S.selection.has(ref)) {
            S.selection.set([ref]);
        } else {
            S.selection.add(ref); // make it the active element
        }
        selectionChanged();
        active = { kind: 'element', ref, x0: x, y0: y, dragging: false, toggled, session: null, grab: null, starts: [] };
        return false;
    }
    active = {
        kind: 'rect',
        x0: x,
        y0: y,
        moved: false,
        additive: !!(ev.shiftKey || ev.ctrlKey || ev.metaKey),
        base: S.selection.all(),
        down: cloneEvent(ev),
        onCurve: hit?.kind === 'curve',
    };
    return false;
}

function cloneEvent(ev: any): any {
    const o: any = {};
    for (const k in ev) {
        const v = ev[k];
        if (typeof v !== 'function') o[k] = v;
    }
    return o;
}

export function onMouseMove(ev: any): boolean {
    if (!canEdit()) return true;
    const p = pointer(ev);
    if (!p) return true;
    try {
        if (!active) {
            hover(p.cam, p.x, p.y, ev);
            return true;
        }
        return dragMove(p.cam, p.x, p.y, ev);
    } catch (e) {
        note(`mousemove: ${(e as Error)?.stack || e}`);
        return true;
    }
}

function hover(cam: any, x: number, y: number, ev: any): void {
    if (!S.lastTargets.length) {
        if (S.hover) setHover(null);
        return;
    }
    if (S.tool === 'draw') {
        const hit = hitTest(cam, x, y, { handles: false, outsideContext: true });
        setHover(hit && (hit.kind === 'knot' || hit.kind === 'curve') ? hit : null);
        const comp = drawComp();
        const place = comp ? placement(cam, x, y, comp) : null;
        S.preview = place ? place.world : null;
        repaint();
        return;
    }
    const hit = hitTest(cam, x, y, { outsideContext: !S.context, curves: S.context });
    setHover(S.context || hit?.kind === 'knot' ? hit : null);
    void ev;
}

function dragMove(cam: any, x: number, y: number, ev: any): boolean {
    const a = active!;
    switch (a.kind) {
        case 'handle': {
            let text = '';
            a.session.apply(() => {
                text = a.drag.update(x, y, ev);
            });
            if (text) showTip(cam, x, y, text);
            return false;
        }
        case 'element': {
            if (!a.dragging) {
                if (Math.hypot(x - a.x0, y - a.y0) < DRAG_PX || a.toggled) return false;
                // Start moving the selection with the element under the mouse.
                a.dragging = true;
                const elements = movableElements(S.selection.all());
                a.starts = elements.map((e) => ({ e, pos: elementWorldPosition(e) }));
                a.grab = elementWorldPosition(a.ref);
                a.session = new EditSession(compsOf(elements));
            }
            const grab = a.grab!;
            const n = cameraForward(cam);
            const hit = rayPlane(screenRay(cam, x, y), grab, n, true);
            if (!hit) return false;
            const delta = sub(v3(), hit, grab);
            const snap = snapConfig();
            if (snap.isPositionSnapEnabled !== !!ev.ctrlKey && a.ref.part === 'knot') {
                // Snap the dragged knot's world position to the grid.
                const target = add(v3(), grab, delta);
                target.x = Math.round(target.x / (snap.position.x || 1)) * (snap.position.x || 1);
                target.y = Math.round(target.y / (snap.position.y || 1)) * (snap.position.y || 1);
                if (!is2DView()) target.z = Math.round(target.z / (snap.position.z || 1)) * (snap.position.z || 1);
                sub(delta, target, grab);
            }
            a.session!.apply(() => {
                for (const s of a.starts) {
                    const target = add(v3(), s.pos, delta);
                    if (s.e.part === 'knot') setKnotWorld(s.e.comp, s.e.spline, s.e.knot, target);
                    else setTangentWorld(s.e.comp, s.e.spline, s.e.knot, s.e.part, target);
                }
            });
            return false;
        }
        case 'rect': {
            if (!a.moved && Math.hypot(x - a.x0, y - a.y0) < DRAG_PX) return false;
            a.moved = true;
            showRect(cam, a.x0, a.y0, x, y);
            const inside = knotsInRect(cam, a.x0, a.y0, x, y);
            S.selection.set(a.additive ? [...a.base, ...inside] : inside);
            selectionChanged();
            return false;
        }
        case 'draw':
            drawDrag(cam, x, y, a);
            return false;
    }
    return false;
}

/** Elements that move with a drag: tangents whose knot is also selected move with it. */
function movableElements(list: ElementRef[]): ElementRef[] {
    return list.filter((e) => e.part === 'knot' || !list.some((o) => o.part === 'knot' && o.comp === e.comp && o.spline === e.spline && o.knot === e.knot));
}

export function onMouseUp(ev: any): boolean {
    if (S.replaying) return true;
    if (!active) return true;
    const a = active;
    active = null;
    const p = pointer(ev);
    try {
        switch (a.kind) {
            case 'handle':
                a.session.end();
                setHandleAxesOverride(null);
                setDragAxis(null);
                hideTip();
                break;
            case 'element':
                if (a.session) a.session.end();
                else if (!a.toggled && S.selection.size > 1 && !a.dragging) {
                    // A click on one of several selected elements selects just it.
                    S.selection.set([a.ref]);
                }
                break;
            case 'rect':
                hideRect();
                if (!a.moved) {
                    if (a.onCurve) {
                        // Clicks on a curve stay in the editor (double-click inserts a knot).
                        if (!a.additive) clearSelection();
                    } else if (S.selection.size && !a.additive) {
                        clearSelection();
                    } else if (!a.additive) {
                        replayClick(a.down, ev);
                    }
                }
                break;
            case 'draw':
                a.session.end();
                break;
        }
    } catch (e) {
        note(`mouseup: ${(e as Error)?.stack || e}`);
    }
    void p;
    selectionChanged();
    return false;
}

/** Lets the editor handle a click we held back (object picking). */
function replayClick(down: any, up: any): void {
    const op = cce().Operation;
    if (!op?.emit) return;
    S.replaying = true;
    try {
        op.emit('mousedown', down);
        op.emit('mouseup', up);
    } catch (e) {
        note(`replay: ${e}`);
    } finally {
        S.replaying = false;
    }
}

export function onDblClick(ev: any): boolean {
    if (!canEdit() || !S.context || S.tool !== 'select') return true;
    const p = pointer(ev);
    if (!p) return true;
    const hit = hitTest(p.cam, p.x, p.y, { handles: false });
    if (hit?.kind !== 'curve') return true;
    insertOnCurve(hit.comp, hit.spline, hit.curve, hit.t);
    return false;
}

/** Ends any drag (e.g. the mouse was released outside the Scene view). */
export function cancelActive(): void {
    if (!active) return;
    const a = active;
    active = null;
    if (a.kind === 'handle' || a.kind === 'draw') a.session.end();
    if (a.kind === 'element' && a.session) a.session.end();
    setHandleAxesOverride(null);
    setDragAxis(null);
    hideRect();
    hideTip();
}

export function isDragging(): boolean {
    return !!active;
}

// ------------------------------------------------------------- draw tool

function drawComp(): any {
    if (S.drawing && S.lastTargets.includes(S.drawing.comp)) return S.drawing.comp;
    return S.lastTargets[S.drawTarget % Math.max(1, S.lastTargets.length)] ?? null;
}

/** Normal of the drawing plane: the container's up (Y in 3D, Z in 2D). */
function drawNormal(comp: any): V3 {
    const n = dirToWorld(comp, is2DView() ? v3(0, 0, 1) : v3(0, 1, 0));
    return lenSq(n) > 1e-12 ? normalize(n, n) : v3(0, 1, 0);
}

/** Where a knot placed at screen point (x, y) goes. */
function placement(cam: any, x: number, y: number, comp: any): { world: V3; normal: V3 } | null {
    const ray = screenRay(cam, x, y);
    const normal = drawNormal(comp);
    if (S.settings.drawOnSurfaces && !is2DView()) {
        const hit = raycastScene(ray);
        if (hit) return { world: hit, normal };
    }
    // The plane through the knot drawn last (or the container), facing the container's up.
    let ref: V3 = toWorld(comp, v3());
    if (S.drawing && S.drawing.comp === comp) {
        const s = comp.splines[S.drawing.spline];
        if (s && s.knots.length) {
            const k = S.drawing.end === 'end' ? s.knots.length - 1 : 0;
            ref = knotWorldPosition(comp, S.drawing.spline, k);
        }
    }
    let p: V3 | null = null;
    if (Math.abs(dot(ray.d, normal)) > 0.02) p = rayPlane(ray, ref, normal);
    if (!p) p = rayPlane(ray, ref, cameraForward(cam), true);
    if (!p) return null;
    if (!is2DView()) {
        const snap = snapConfig();
        if (snap.isPositionSnapEnabled) {
            p.x = Math.round(p.x / (snap.position.x || 1)) * (snap.position.x || 1);
            p.z = Math.round(p.z / (snap.position.z || 1)) * (snap.position.z || 1);
        }
    }
    return { world: p, normal };
}

/** Closest scene geometry under the ray (models of user nodes only). */
function raycastScene(ray: Ray): V3 | null {
    try {
        const { director, geometry, CCObject } = cc();
        const scene: any = director.getScene();
        const rs = scene?.renderScene;
        if (!rs) return null;
        const r = new geometry.Ray(ray.o.x, ray.o.y, ray.o.z, ray.d.x, ray.d.y, ray.d.z);
        const hidden = CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy;
        let best = Infinity;
        const opts: any = { mode: geometry.ERaycastMode.CLOSEST, distance: Infinity, doubleSided: false };
        for (const model of rs.models) {
            const node = model.node;
            if (!model.enabled || !node || !node.activeInHierarchy || node.scene !== scene) continue;
            if (hasFlags(node, hidden)) continue;
            if (model.worldBounds && !geometry.intersect.rayAABB(r, model.worldBounds)) continue;
            const d = geometry.intersect.rayModel(r, model, opts);
            if (d > 0 && d < best) best = d;
        }
        if (!isFinite(best)) return null;
        return scaleAndAdd(v3(), ray.o, ray.d, best);
    } catch (e) {
        note(`raycast: ${e}`);
        return null;
    }
}

function hasFlags(node: any, flags: number): boolean {
    for (let n = node; n; n = n.parent) if ((n._objFlags & flags) !== 0) return true;
    return false;
}

function drawDown(cam: any, x: number, y: number, ev: any): boolean {
    const comp = drawComp();
    if (!comp) return true;
    S.diag.blocked++;
    const hit = hitTest(cam, x, y, { handles: false, outsideContext: true });
    if (S.drawing) {
        // Clicking the other end of the spline being drawn closes it.
        const d = S.drawing;
        const s = d.comp.splines[d.spline];
        if (hit?.kind === 'knot' && hit.ref.comp === d.comp && hit.ref.spline === d.spline && s && s.knots.length >= 2) {
            const other = d.end === 'end' ? 0 : s.knots.length - 1;
            if (hit.ref.knot === other) {
                recordEdit([d.comp], () => setClosed(s, true));
                S.drawing = null;
                S.selection.set([{ comp: d.comp, spline: d.spline, knot: other, part: 'knot' }]);
                selectionChanged();
                return false;
            }
        }
    } else if (hit?.kind === 'knot') {
        // Clicking the end of an open spline continues it.
        const s = hit.ref.comp.splines[hit.ref.spline];
        if (s && isEndKnot(s, hit.ref.knot)) {
            S.drawing = { comp: hit.ref.comp, spline: hit.ref.spline, end: hit.ref.knot === 0 && s.knots.length > 1 ? 'start' : 'end' };
            S.selection.set([hit.ref]);
            selectionChanged();
            return false;
        }
    } else if (hit?.kind === 'curve') {
        insertOnCurve(hit.comp, hit.spline, hit.curve, hit.t);
        return false;
    }
    const place = placement(cam, x, y, comp);
    if (!place) return false;
    const target = S.drawing ? S.drawing.comp : comp;
    const session = new EditSession([target]);
    // The knot exists once the recording is open; the drag and selection follow it then.
    const a: Extract<Active, { kind: 'draw' }> = {
        kind: 'draw',
        comp: target,
        spline: -1,
        knot: -1,
        part: 'out',
        x0: x,
        y0: y,
        dragging: false,
        session,
        normal: place.normal,
    };
    active = a;
    session.apply(() => {
        if (!S.drawing) {
            // A new spline: reuse an empty one if there is one.
            let index = target.splines.findIndex((s: any) => s.knots.length === 0);
            if (index < 0) {
                target.splines.push(factory.spline());
                index = target.splines.length - 1;
            }
            S.drawing = { comp: target, spline: index, end: 'end' };
        }
        const d = S.drawing!;
        const s = target.splines[d.spline];
        const k: any = factory.knot();
        copy(k.position, toLocal(target, place.world));
        k.mode = S.settings.defaultMode;
        // Orient towards the travel direction, up along the drawing plane normal.
        const prevIndex = d.end === 'end' ? s.knots.length - 1 : 0;
        const localNormal = normalize(v3(), dirToLocalSafe(target, place.normal));
        if (s.knots.length) {
            const prev = s.knots[prevIndex].position;
            const dir = d.end === 'end' ? sub(v3(), k.position, prev) : sub(v3(), prev, k.position);
            knotRotation(k.rotation, dir, localNormal);
        } else {
            knotRotation(k.rotation, v3(), localNormal);
        }
        const index = d.end === 'end' ? s.knots.length : 0;
        containerInsertKnot(target, d.spline, index, k);
        a.spline = d.spline;
        a.knot = index;
        a.part = d.end === 'end' ? 'out' : 'in';
        S.selection.set([{ comp: target, spline: d.spline, knot: index, part: 'knot' }]);
        selectionChanged();
    });
    void ev;
    return false;
}

function dirToLocalSafe(comp: any, world: V3): V3 {
    const o = toLocal(comp, v3());
    const p = toLocal(comp, world);
    return sub(v3(), p, o);
}

function drawDrag(cam: any, x: number, y: number, a: Extract<Active, { kind: 'draw' }>): void {
    if (a.knot < 0) return;
    if (!a.dragging && Math.hypot(x - a.x0, y - a.y0) < DRAG_PX) return;
    a.dragging = true;
    const pos = knotWorldPosition(a.comp, a.spline, a.knot);
    let hit = rayPlane(screenRay(cam, x, y), pos, a.normal);
    if (!hit) hit = rayPlane(screenRay(cam, x, y), pos, cameraForward(cam), true);
    if (!hit) return;
    const end = hit;
    a.session.apply(() => {
        const s = a.comp.splines[a.spline];
        if (!s || !s.knots[a.knot]) return;
        // Dragging while placing makes a Bezier knot with mirrored tangents (Unity).
        if (s.knots[a.knot].mode !== TangentMode.Mirrored) setTangentMode(s, a.knot, TangentMode.Mirrored);
        setTangentWorld(a.comp, a.spline, a.knot, a.part, end);
    });
}

/** Preview of the Draw tool: the next curve and where the knot would go. */
function drawPreview(_cam: any): void {
    if (!S.context || S.tool !== 'draw') return;
    const h = S.hover;
    if (h?.kind === 'curve') {
        D.disc(h.world, 5, D.Colors.insert);
        D.circle(h.world, 7, D.Colors.insert);
        return;
    }
    if (h?.kind === 'knot' && S.drawing) {
        const d = S.drawing;
        const s = d.comp.splines[d.spline];
        const other = d.end === 'end' ? 0 : (s?.knots.length ?? 1) - 1;
        if (s && h.ref.comp === d.comp && h.ref.spline === d.spline && h.ref.knot === other && s.knots.length >= 2) {
            D.circle(knotWorldPosition(d.comp, d.spline, other), 10, D.Colors.insert);
            return;
        }
    }
    if (!S.preview || active) return;
    const p = S.preview;
    D.disc(p, 4, D.Colors.preview);
    const d = S.drawing;
    if (!d) return;
    const s = d.comp.splines[d.spline];
    if (!s || !s.knots.length) return;
    const k = d.end === 'end' ? s.knots.length - 1 : 0;
    const knot = s.knots[k];
    const from = knotWorldPosition(d.comp, d.spline, k);
    const handleVec = d.end === 'end' ? tangentOutVec(v3(), knot) : tangentInVec(v3(), knot);
    const c: Curve = curve();
    copy(c.p0, from);
    add(c.p1, from, dirToWorld(d.comp, handleVec));
    if (lenSq(sub(v3(), c.p1, c.p0)) < 1e-12) {
        // Linear / AutoSmooth end: a third of the way.
        scaleAndAdd(c.p1, from, sub(v3(), p, from), 1 / 3);
    }
    scaleAndAdd(c.p2, p, sub(v3(), from, p), 1 / 3);
    copy(c.p3, p);
    const n = 24;
    let prev = copy(v3(), from);
    const cur = v3();
    for (let i = 1; i <= n; i++) {
        evalPosition(cur, c, i / n);
        D.line(prev, cur, D.Colors.preview);
        copy(prev, cur);
    }
}

setPreviewDrawer(drawPreview);

// --------------------------------------------------------------- keyboard

function plainKey(ev: any): boolean {
    return !ev.ctrlKey && !ev.metaKey && !ev.altKey && !ev.shiftKey;
}

export function onKeyDown(ev: any): boolean {
    if (!canEdit() || !S.context) return true;
    const key = String(ev.key || '').toLowerCase();
    try {
        switch (key) {
            case 'escape':
                if (active) {
                    cancelActive();
                    return false;
                }
                if (S.tool === 'draw') {
                    if (S.drawing) S.drawing = null;
                    else setTool('select');
                } else if (S.selection.size) {
                    clearSelection();
                } else {
                    setContext(false);
                }
                selectionChanged();
                return false;
            case 'enter':
                if (S.tool === 'draw' && S.drawing) {
                    S.drawing = null;
                    selectionChanged();
                    return false;
                }
                return true;
            case 'delete':
            case 'backspace':
                if (!S.selection.size) return true;
                deleteKey();
                return false;
            case 'c':
                if (!plainKey(ev) || !S.selection.size) return true;
                cycleModeSelected();
                return false;
            case 'x':
                if (!plainKey(ev)) return true;
                S.settings.orientation = S.settings.orientation === 'global' ? 'local' : S.settings.orientation === 'local' ? 'element' : 'global';
                selectionChanged();
                return false;
            case 'a':
                if (!(ev.ctrlKey || ev.metaKey) || ev.altKey) return true;
                S.selectAllKeyAt = Date.now();
                selectAll();
                return false;
            case 's':
                if (S.tool === 'draw' && ev.shiftKey && !ev.ctrlKey && S.lastTargets.length > 1) {
                    // Unity: Shift+S cycles the container the Draw tool adds to.
                    S.drawTarget = (S.drawTarget + 1) % S.lastTargets.length;
                    S.drawing = null;
                    selectionChanged();
                    return false;
                }
                return true;
        }
    } catch (e) {
        note(`keydown: ${(e as Error)?.stack || e}`);
    }
    return true;
}

export function onKeyUp(_ev: any): boolean {
    return true;
}

/** Deletes the selection once per key press (the key may arrive twice). */
export function deleteKey(): void {
    const now = Date.now();
    if (now - S.deleteKeyAt < 150) return;
    S.deleteKeyAt = now;
    deleteSelection();
}
