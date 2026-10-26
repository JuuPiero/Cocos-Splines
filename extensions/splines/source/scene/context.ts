/**
 * Edit context (Unity's spline tool context), the containers being edited,
 * and the state shown by the Splines panel and Inspector.
 */
import { v3, qToEuler, len } from '../../assets/core/math';
import { isLinked, isEndKnot, tangentInVec, tangentOutVec, TangentMode } from '../../assets/core/spline-core';
import { currentTargets, ElementRef, getKnot } from './model';
import { S, Tool, bumpState } from './state';
import { is2DView, repaint, transformToolName } from './env';

const BROADCAST_MS = 60;

export function updateTargets(): any[] {
    const targets = currentTargets();
    const key = targets.map((c) => c.uuid).join(',');
    if (key !== S.targetsKey) {
        S.targetsKey = key;
        bumpState();
    }
    S.lastTargets = targets;
    if (S.selection.validate(targets)) bumpState();
    const pending = S.pendingContext;
    if (pending) {
        if (targets.includes(pending.comp)) {
            S.pendingContext = null;
            setContext(true);
            setTool(pending.tool);
        } else if (Date.now() > pending.until) {
            S.pendingContext = null;
        }
    }
    if (!targets.length) {
        if (S.context) setContext(false);
        if (S.drawing) S.drawing = null;
    } else if (S.drawing && !targets.includes(S.drawing.comp)) {
        S.drawing = null;
    }
    return targets;
}

export function setContext(on: boolean): void {
    if (S.context === on) return;
    S.context = on;
    if (!on) {
        S.selection.clear();
        S.tool = 'select';
        S.drawing = null;
        S.preview = null;
        S.hover = null;
    }
    bumpState();
    repaint();
}

export function setTool(tool: Tool): void {
    if (tool === 'draw') setContext(true);
    if (S.tool === tool) return;
    S.tool = tool;
    S.drawing = null;
    S.preview = null;
    S.hover = null;
    bumpState();
    repaint();
}

// ------------------------------------------------------------ panel state

export interface ElementInfo {
    kind: 'knot' | 'tangent';
    count: number;
    knots: number;
    label: string;
    position: (number | null)[];
    rotation: (number | null)[];
    mode: number | null;
    tension: number | null;
    tangentIn: number | null;
    tangentOut: number | null;
    linked: boolean;
}

export interface PanelState {
    primary: boolean;
    ready: boolean;
    context: boolean;
    tool: Tool;
    drawing: boolean;
    is2D: boolean;
    transformTool: string;
    settings: typeof S.settings;
    targets: { uuid: string; node: string; name: string; splines: number; knots: number }[];
    selection: { count: number; knots: number; tangents: number };
    element: ElementInfo | null;
    actions: Record<string, boolean>;
    closed: boolean | null;
}

function shared<T>(values: T[], eq: (a: T, b: T) => boolean = (a, b) => a === b): T | null {
    if (!values.length) return null;
    return values.every((v) => eq(v, values[0])) ? values[0] : null;
}

function round(v: number): number {
    return Math.round(v * 10000) / 10000;
}

function elementInfo(list: ElementRef[]): ElementInfo | null {
    if (!list.length) return null;
    const knots = list.filter((e) => e.part === 'knot');
    const items = knots.length ? knots : list;
    const ks = items.map((e) => getKnot(e)).filter(Boolean);
    if (!ks.length) return null;
    const pos = (axis: 'x' | 'y' | 'z') => shared(ks.map((k: any) => round(k.position[axis])));
    const eulers = ks.map((k: any) => qToEuler(v3(), k.rotation));
    const rot = (axis: 'x' | 'y' | 'z') => shared(eulers.map((e) => round(e[axis])));
    const tin = shared(ks.map((k: any) => round(len(tangentInVec(v3(), k)))));
    const tout = shared(ks.map((k: any) => round(len(tangentOutVec(v3(), k)))));
    const first = items[0];
    const kind = knots.length ? 'knot' : 'tangent';
    let label: string;
    if (items.length === 1) {
        label = kind === 'knot'
            ? `Knot ${first.knot}` + (first.comp.splines.length > 1 ? ` (Spline ${first.spline})` : '')
            : `${first.part === 'in' ? 'In' : 'Out'} Tangent of Knot ${first.knot}`;
    } else {
        label = `${items.length} ${kind === 'knot' ? 'Knots' : 'Tangents'}`;
    }
    return {
        kind,
        count: list.length,
        knots: knots.length,
        label,
        position: [pos('x'), pos('y'), pos('z')],
        rotation: [rot('x'), rot('y'), rot('z')],
        mode: shared(ks.map((k: any) => k.mode)),
        tension: shared(ks.map((k: any) => round(k.tension))),
        tangentIn: tin,
        tangentOut: tout,
        linked: knots.some((e) => isLinked(e.comp, { spline: e.spline, knot: e.knot })),
    };
}

export function availableActions(): Record<string, boolean> {
    const knots = S.selection.knots();
    const sameComp = knots.length > 0 && knots.every((e) => e.comp === knots[0].comp);
    const ends = knots.filter((e) => isEndKnot(e.comp.splines[e.spline], e.knot));
    const one = knots.length === 1 ? knots[0] : null;
    const oneSpline = one ? one.comp.splines[one.spline] : null;
    return {
        delete: S.selection.size > 0,
        link: knots.length >= 2 && sameComp,
        unlink: knots.some((e) => isLinked(e.comp, { spline: e.spline, knot: e.knot })),
        split: !!one && !!oneSpline && (oneSpline.closed || (one.knot > 0 && one.knot < oneSpline.knots.length - 1)),
        join: knots.length === 2 && sameComp && ends.length === 2,
        reverse: knots.length > 0 || S.lastTargets.length > 0,
        close: S.lastTargets.length > 0,
        selectAll: S.lastTargets.length > 0,
    };
}

/** Spline of the selection (or the first spline of the edited containers) and whether it is closed. */
function closedState(): boolean | null {
    const knots = S.selection.all();
    const splines = new Set<any>();
    for (const e of knots) {
        const s = e.comp.splines[e.spline];
        if (s) splines.add(s);
    }
    if (!splines.size) for (const c of S.lastTargets) for (const s of c.splines) splines.add(s);
    if (!splines.size) return null;
    return shared([...splines].map((s) => !!s.closed));
}

export function panelState(): PanelState {
    // Undo or a delete may have removed selected knots since the last frame.
    if (S.selection.validate(S.lastTargets)) bumpState();
    const list = S.selection.all();
    return {
        primary: S.primary,
        ready: true,
        context: S.context,
        tool: S.tool,
        drawing: !!S.drawing,
        is2D: is2DView(),
        transformTool: transformToolName(),
        settings: { ...S.settings },
        targets: S.lastTargets.map((c) => ({
            uuid: c.uuid,
            node: c.node.uuid,
            name: c.node.name,
            splines: c.splines.length,
            knots: c.splines.reduce((a: number, s: any) => a + s.knots.length, 0),
        })),
        selection: { count: list.length, knots: S.selection.knots().length, tangents: S.selection.tangents().length },
        element: elementInfo(list),
        actions: availableActions(),
        closed: closedState(),
    };
}

let lastSent = '';
let lastSentAt = 0;
let timer: any = null;

/** Sends the panel state if it changed (throttled). */
export function maybeBroadcast(force = false): void {
    if (!S.primary) return;
    const now = Date.now();
    const wait = BROADCAST_MS - (now - lastSentAt);
    if (!force && wait > 0) {
        if (!timer) timer = setTimeout(() => {
            timer = null;
            maybeBroadcast();
        }, wait);
        return;
    }
    let json: string;
    const state = panelState();
    try {
        json = JSON.stringify(state);
    } catch {
        return;
    }
    if (!force && json === lastSent) return;
    lastSent = json;
    lastSentAt = now;
    try {
        Editor.Message.broadcast('splines:state', state);
    } catch {
        // editor shutting down
    }
}

export { TangentMode };
