/**
 * Undoable spline edits used by the keyboard, the Splines panel and the
 * Inspector.
 */
import { V3, v3, q4, qToEuler, qFromEuler, qCopy, normalize, scale, lenSq, len, set } from '../../assets/core/math';
import {
    TangentMode, KnotRef, setTangentMode, setTension, setRotation, setKnotPosition, setTangentVec, syncLinked,
    tangentInVec, tangentOutVec, linkKnots, unlinkKnots, splitKnot, joinKnots, containerRemoveKnots, containerReverse,
    containerInsertOnCurve, containerRemoveSpline, setClosed, isEndKnot, buildShape, DEFAULT_TENSION, applyTangentMode,
    tangentsEditable, refreshAll, isLinked,
} from '../../assets/core/spline-core';
import { factory, findComponent, findNode, containerClass, currentScene, is2DView, selectedNodeUuids, repaint } from './env';
import { ElementRef, getKnot, toLocal } from './model';
import { S, bumpState } from './state';
import { recordEdit, afterEdit } from './undo';
import { setContext, setTool, maybeBroadcast, availableActions } from './context';
import { sceneCamera, screenRay, rayPlane, worldPerPixel, cameraForward, cameraPosition } from './view';

function compsOf(list: ElementRef[]): any[] {
    return [...new Set(list.map((e) => e.comp))];
}

function touched(): void {
    bumpState();
    maybeBroadcast();
    repaint();
}

// ---------------------------------------------------------- selection ops

export async function deleteSelection(): Promise<void> {
    const list = S.selection.all();
    if (!list.length) return;
    const comps = compsOf(list);
    await recordEdit(comps, () => {
        // Selected tangents of knots that stay: zero them (Unity's behavior).
        for (const e of list) {
            if (e.part === 'knot') continue;
            if (S.selection.hasKnot(e.comp, e.spline, e.knot)) continue;
            const spline = e.comp.splines[e.spline];
            const k = spline?.knots[e.knot];
            if (!k) continue;
            if (k.mode !== TangentMode.Broken) setTangentMode(spline, e.knot, TangentMode.Broken);
            set(e.part === 'in' ? k.tangentIn : k.tangentOut, 0, 0, 0);
        }
        for (const comp of comps) {
            const refs = list.filter((e) => e.comp === comp && e.part === 'knot').map((e) => ({ spline: e.spline, knot: e.knot }));
            if (refs.length) containerRemoveKnots(comp, refs);
        }
    });
    S.selection.clear();
    touched();
}

export async function setModeSelected(mode: number): Promise<void> {
    const knots = selectedOwnerKnots();
    if (!knots.length) return;
    await recordEdit(compsOf(knots), () => {
        for (const e of knots) setTangentMode(e.comp.splines[e.spline], e.knot, mode);
    });
    touched();
}

/** Knots of the selection, including owners of selected tangents. */
function selectedOwnerKnots(): ElementRef[] {
    const seen = new Set<string>();
    const res: ElementRef[] = [];
    for (const e of S.selection.all()) {
        const key = `${e.comp.uuid}:${e.spline}:${e.knot}`;
        if (seen.has(key) || !getKnot(e)) continue;
        seen.add(key);
        res.push({ ...e, part: 'knot' });
    }
    return res;
}

const CYCLE = [TangentMode.Linear, TangentMode.AutoSmooth, TangentMode.Mirrored, TangentMode.Continuous, TangentMode.Broken];

/** Unity's Cycle Tangent Mode (C). */
export async function cycleModeSelected(): Promise<void> {
    const knots = selectedOwnerKnots();
    if (!knots.length) return;
    const k = getKnot(knots[0]);
    const next = CYCLE[(CYCLE.indexOf(k.mode) + 1) % CYCLE.length];
    await setModeSelected(next);
}

export async function linkSelected(): Promise<void> {
    const knots = S.selection.knots();
    if (knots.length < 2 || !knots.every((e) => e.comp === knots[0].comp)) return;
    const comp = knots[0].comp;
    // The active (last selected) knot keeps its position.
    const ordered = [knots[knots.length - 1], ...knots.slice(0, -1)];
    await recordEdit([comp], () => linkKnots(comp, ordered.map((e) => ({ spline: e.spline, knot: e.knot })), factory));
    touched();
}

export async function unlinkSelected(): Promise<void> {
    const knots = S.selection.knots();
    if (!knots.length) return;
    await recordEdit(compsOf(knots), () => {
        for (const comp of compsOf(knots)) {
            unlinkKnots(comp, knots.filter((e) => e.comp === comp).map((e) => ({ spline: e.spline, knot: e.knot })));
        }
    });
    touched();
}

export async function splitSelected(): Promise<void> {
    const knots = S.selection.knots();
    if (knots.length !== 1) return;
    const e = knots[0];
    let res: KnotRef | null = null;
    await recordEdit([e.comp], () => {
        res = splitKnot(e.comp, { spline: e.spline, knot: e.knot }, factory);
    });
    const r = res as KnotRef | null;
    if (r) S.selection.set([{ comp: e.comp, spline: r.spline, knot: r.knot, part: 'knot' }]);
    touched();
}

export async function joinSelected(): Promise<void> {
    const knots = S.selection.knots();
    if (knots.length !== 2 || knots[0].comp !== knots[1].comp) return;
    const comp = knots[0].comp;
    // Unity keeps the active knot's position.
    const a = knots[1];
    const b = knots[0];
    let res: KnotRef | null = null;
    await recordEdit([comp], () => {
        res = joinKnots(comp, { spline: a.spline, knot: a.knot }, { spline: b.spline, knot: b.knot }, factory);
    });
    const r = res as KnotRef | null;
    S.selection.set(r ? [{ comp, spline: r.spline, knot: r.knot, part: 'knot' }] : []);
    touched();
}

/** Splines touched by the selection, or all splines of the edited containers. */
function selectedSplines(): { comp: any; spline: number }[] {
    const list = S.selection.all();
    const res: { comp: any; spline: number }[] = [];
    const add = (comp: any, spline: number) => {
        if (!res.some((r) => r.comp === comp && r.spline === spline)) res.push({ comp, spline });
    };
    if (list.length) for (const e of list) add(e.comp, e.spline);
    else for (const comp of S.lastTargets) comp.splines.forEach((_: any, i: number) => add(comp, i));
    return res;
}

export async function reverseSelected(): Promise<void> {
    const splines = selectedSplines();
    if (!splines.length) return;
    // Keep the same knots selected after reversing.
    const before = S.selection.all().map((e) => ({ ...e, count: e.comp.splines[e.spline]?.knots.length ?? 0 }));
    await recordEdit([...new Set(splines.map((s) => s.comp))], () => {
        for (const s of splines) containerReverse(s.comp, s.spline);
    });
    S.selection.set(before.map((e) => ({
        comp: e.comp,
        spline: e.spline,
        knot: e.count - 1 - e.knot,
        part: e.part === 'in' ? 'out' : e.part === 'out' ? 'in' : 'knot',
    })));
    touched();
}

export async function setClosedSelected(closed?: boolean): Promise<void> {
    const splines = selectedSplines();
    if (!splines.length) return;
    const target = closed ?? !splines.every((s) => s.comp.splines[s.spline].closed);
    await recordEdit([...new Set(splines.map((s) => s.comp))], () => {
        for (const s of splines) {
            const spline = s.comp.splines[s.spline];
            if (spline.knots.length >= 2 || !target) setClosed(spline, target);
        }
    });
    touched();
}

export function selectAll(): void {
    const list: ElementRef[] = [];
    for (const comp of S.lastTargets) {
        comp.splines.forEach((spline: any, s: number) => {
            for (let k = 0; k < spline.knots.length; k++) list.push({ comp, spline: s, knot: k, part: 'knot' });
        });
    }
    if (!list.length) return;
    setContext(true);
    S.selection.set(list);
    touched();
}

export function clearSelection(): void {
    S.selection.clear();
    touched();
}

/** Inserts a knot on a curve without changing its shape; selects it. */
export async function insertOnCurve(comp: any, spline: number, curveIndex: number, t: number): Promise<void> {
    let index = -1;
    await recordEdit([comp], () => {
        index = containerInsertOnCurve(comp, spline, curveIndex, t, factory);
    });
    if (index >= 0) S.selection.set([{ comp, spline, knot: index, part: 'knot' }]);
    touched();
}

// ------------------------------------------------------- element inspector

export interface ElementProps {
    position?: (number | null)[];
    rotation?: (number | null)[];
    mode?: number;
    tension?: number;
    tangentIn?: number;
    tangentOut?: number;
}

function applyProps(comp: any, s: number, k: number, p: ElementProps): void {
    const spline = comp.splines[s];
    const knot = spline?.knots[k];
    if (!knot) return;
    if (p.position) {
        const pos = v3(knot.position.x, knot.position.y, knot.position.z);
        if (p.position[0] != null) pos.x = p.position[0]!;
        if (p.position[1] != null) pos.y = p.position[1]!;
        if (p.position[2] != null) pos.z = p.position[2]!;
        setKnotPosition(spline, k, pos);
        syncLinked(comp, { spline: s, knot: k });
    }
    if (p.rotation) {
        const e = qToEuler(v3(), knot.rotation);
        if (p.rotation[0] != null) e.x = p.rotation[0]!;
        if (p.rotation[1] != null) e.y = p.rotation[1]!;
        if (p.rotation[2] != null) e.z = p.rotation[2]!;
        setRotation(spline, k, qFromEuler(q4(), e.x, e.y, e.z));
    }
    if (p.mode !== undefined && p.mode !== null) setTangentMode(spline, k, p.mode);
    if (p.tension !== undefined && p.tension !== null) setTension(spline, k, Math.max(0, Math.min(1, p.tension)));
    for (const part of ['in', 'out'] as const) {
        const value = part === 'in' ? p.tangentIn : p.tangentOut;
        if (value === undefined || value === null) continue;
        const cur = part === 'in' ? tangentInVec(v3(), knot) : tangentOutVec(v3(), knot);
        let dir = normalize(v3(), cur);
        if (lenSq(dir) < 1e-12) {
            // Zero tangent: point it along the knot's forward axis.
            const fwd = tangentOutVec(v3(), { ...knot, tangentOut: { x: 0, y: 0, z: 1 } });
            dir = part === 'in' ? scale(v3(), fwd, -1) : fwd;
        }
        setTangentVec(spline, k, part, scale(v3(), dir, Math.max(0, value)));
    }
}

/** Sets fields of the selected knots (null / missing fields stay as they are). */
export async function setElementProps(props: ElementProps): Promise<void> {
    const knots = selectedOwnerKnots();
    if (!knots.length) return;
    await recordEdit(compsOf(knots), () => {
        for (const e of knots) applyProps(e.comp, e.spline, e.knot, props);
    });
    touched();
}

// ------------------------------------------------------------ inspector

function knotInfo(comp: any, s: number, k: number, knot: any) {
    const e = qToEuler(v3(), knot.rotation);
    const r = (n: number) => Math.round(n * 10000) / 10000;
    return {
        position: [r(knot.position.x), r(knot.position.y), r(knot.position.z)],
        rotation: [r(e.x), r(e.y), r(e.z)],
        mode: knot.mode,
        tension: r(knot.tension),
        tangentIn: r(len(tangentInVec(v3(), knot))),
        tangentOut: r(len(tangentOutVec(v3(), knot))),
        linked: isLinked(comp, { spline: s, knot: k }),
        selected: S.context && S.selection.hasKnot(comp, s, k),
    };
}

/** Data for the SplineContainer Inspector. */
export function containerInfo(compUuid: string): any {
    const comp = findComponent(compUuid);
    if (!comp || !comp.splines) return null;
    return {
        uuid: comp.uuid,
        node: comp.node.uuid,
        context: S.context && S.lastTargets.includes(comp),
        tool: S.tool,
        drawing: !!S.drawing && S.drawing.comp === comp,
        splines: comp.splines.map((spline: any, s: number) => ({
            closed: !!spline.closed,
            length: Math.round((comp.calculateLength?.(s) ?? 0) * 1000) / 1000,
            knots: spline.knots.map((knot: any, k: number) => knotInfo(comp, s, k, knot)),
        })),
        actions: availableActions(),
    };
}

export async function editKnot(compUuid: string, s: number, k: number, props: ElementProps): Promise<void> {
    const comp = findComponent(compUuid);
    if (!comp) return;
    await recordEdit([comp], () => applyProps(comp, s, k, props));
    touched();
}

/** Inspector actions on a spline of a container. */
export async function splineAction(compUuid: string, s: number, action: string, arg?: any): Promise<any> {
    const comp = findComponent(compUuid);
    if (!comp) return null;
    switch (action) {
        case 'addSpline': {
            await recordEdit([comp], () => {
                const spline = factory.spline();
                comp.splines.push(spline);
            });
            break;
        }
        case 'removeSpline':
            if (comp.splines.length <= 1) {
                await recordEdit([comp], () => {
                    comp.splines[0].knots.length = 0;
                    comp.splines[0].closed = false;
                    comp.links.length = 0;
                });
            } else {
                await recordEdit([comp], () => containerRemoveSpline(comp, s));
            }
            S.selection.clear();
            break;
        case 'reverse':
            await recordEdit([comp], () => containerReverse(comp, s));
            S.selection.clear();
            break;
        case 'closed':
            await recordEdit([comp], () => setClosed(comp.splines[s], !!arg));
            break;
        case 'addKnot': {
            const spline = comp.splines[s];
            await recordEdit([comp], () => {
                const k = factory.knot();
                const n = spline.knots.length;
                const last = spline.knots[n - 1];
                const prev = spline.knots[n - 2];
                if (last && prev) {
                    // Continue in the direction of the last curve.
                    set(k.position, last.position.x * 2 - prev.position.x, last.position.y * 2 - prev.position.y, last.position.z * 2 - prev.position.z);
                } else if (last) {
                    set(k.position, last.position.x + 1, last.position.y, last.position.z);
                }
                k.mode = S.settings.defaultMode;
                k.tension = DEFAULT_TENSION;
                if (last) qCopy(k.rotation, last.rotation);
                spline.knots.push(k);
                applyTangentMode(spline, spline.knots.length - 1);
                if (n > 0) applyTangentMode(spline, n - 1);
            });
            break;
        }
        case 'removeKnot':
            await recordEdit([comp], () => containerRemoveKnots(comp, [{ spline: s, knot: Number(arg) }]));
            S.selection.clear();
            break;
        case 'selectKnot': {
            setContext(true);
            const e: ElementRef = { comp, spline: s, knot: Number(arg?.knot ?? arg), part: 'knot' };
            if (arg?.additive) S.selection.toggle(e);
            else S.selection.set([e]);
            break;
        }
        case 'setModeAll':
            await recordEdit([comp], () => {
                const spline = comp.splines[s];
                for (let i = 0; i < spline.knots.length; i++) setTangentMode(spline, i, Number(arg));
            });
            break;
        case 'refresh':
            await recordEdit([comp], () => comp.splines.forEach((sp: any) => refreshAll(sp)));
            break;
    }
    touched();
    return containerInfo(compUuid);
}

// ------------------------------------------------------------- creation

function niceSize(v: number): number {
    if (!(v > 0)) return 1;
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    const m = v / p;
    return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}

/** Where a new spline goes: the center of the Scene view on the ground (3D) or the z = 0 plane (2D). */
function viewCenter(is2D: boolean): { pos: V3; size: number } {
    const cam = sceneCamera();
    if (!cam) return { pos: v3(), size: is2D ? 100 : 1 };
    const ray = screenRay(cam, cam.width / 2, cam.height / 2);
    let pos: V3 | null = rayPlane(ray, v3(), is2D ? v3(0, 0, 1) : v3(0, 1, 0));
    if (!pos) {
        // Looking away from the ground: a point in front of the camera.
        const f = cameraForward(cam);
        const c = cameraPosition(cam);
        pos = v3(c.x + f.x * 10, c.y + f.y * 10, c.z + f.z * 10);
    }
    const size = niceSize(worldPerPixel(cam, pos) * Math.min(cam.width, cam.height) * 0.18);
    return { pos, size };
}

export const SHAPES = ['line', 'square', 'rounded-square', 'circle', 'polygon', 'star', 'helix'];

/**
 * Creates a node with a SplineContainer (Node > Spline menu). 'draw' makes
 * an empty spline and starts the Draw tool.
 */
export async function createSplineNode(kind: string): Promise<string | null> {
    const is2D = is2DView();
    const sel = selectedNodeUuids();
    const options: any = { name: kind === 'draw' ? 'Spline' : `Spline ${kind.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}` };
    if (sel.length) options.parent = sel[0];
    if (is2D) options.canvasRequired = true;
    const uuid = (await Editor.Message.request('scene', 'create-node', options)) as unknown as string;
    if (!uuid || typeof uuid !== 'string') return null;
    await Editor.Message.request('scene', 'create-component', { uuid, component: 'SplineContainer' } as any);
    const node = findNode(uuid);
    const C = containerClass();
    const comp = node && C ? node.getComponent(C) : null;
    if (!comp) return uuid;
    const { pos, size } = viewCenter(is2D);
    await recordEdit([comp], () => {
        node.setWorldPosition(pos.x, pos.y, pos.z);
        if (!comp.splines.length) comp.splines.push(factory.spline());
        const spline = comp.splines[0];
        if (kind !== 'draw' && SHAPES.includes(kind)) {
            buildShape(spline, kind, { size, plane2D: is2D, sides: kind === 'star' ? 5 : 6, turns: 3, height: size * 2 }, factory);
        } else {
            spline.knots.length = 0;
        }
    });
    afterEdit([comp]);
    try {
        Editor.Selection.clear('node');
        Editor.Selection.select('node', uuid);
    } catch {
        // selection API missing
    }
    // The selection reaches the scene asynchronously; the context starts once the node is selected.
    S.pendingContext = { comp, tool: kind === 'draw' ? 'draw' : 'select', until: Date.now() + 3000 };
    repaint();
    return uuid;
}

export { toLocal, currentScene, tangentsEditable, isEndKnot };
