/**
 * Inspector for SplineContainer: Edit / Draw buttons and the splines with
 * their knots (Unity's SplineContainer inspector). Knot edits go through the
 * scene script so tangent modes and links stay consistent, with undo.
 */
import { BASE_STYLE, RendererContext, callScene, componentUuids, h, isEditing, renderProps } from './shared';
import { onBroadcast } from '../shared/broadcast';

const MODE_NAMES = ['Auto Smooth', 'Linear', 'Mirrored', 'Continuous', 'Broken'];

interface KnotInfo {
    position: number[];
    rotation: number[];
    mode: number;
    tension: number;
    tangentIn: number;
    tangentOut: number;
    linked: boolean;
    selected: boolean;
}

interface Info {
    uuid: string;
    node: string;
    context: boolean;
    tool: string;
    drawing: boolean;
    splines: { closed: boolean; length: number; knots: KnotInfo[] }[];
}

export const template = /* html */ `
<div class="sp-container-inspector">
    <div class="props"></div>
    <div class="sp-section">
        <div class="sp-bar">
            <ui-button class="edit" title="Edit knots in the Scene view (Esc leaves)">Edit Spline</ui-button>
            <ui-button class="draw" title="Draw tool: click to add knots, drag for tangents">Draw Spline</ui-button>
        </div>
        <div class="splines"></div>
    </div>
</div>
`;

export const style = BASE_STYLE + /* css */ `
.sp-spline { margin-top: 6px; }
.sp-spline-head { display: flex; align-items: center; gap: 6px; padding: 2px 0; }
.sp-spline-head .fold { cursor: pointer; width: 14px; text-align: center; user-select: none; color: var(--color-normal-contrast-weaker, #aaa); }
.sp-spline-head .title { font-weight: bold; cursor: pointer; }
.sp-spline-head .meta { color: var(--color-normal-contrast-weaker, #999); font-size: 11px; }
.sp-spline-head ui-button { min-width: 0; }
.sp-knots { width: 100%; border-collapse: collapse; margin-top: 2px; }
.sp-knots td { padding: 1px 2px; vertical-align: middle; }
.sp-knots tr.knot:hover { background: rgba(255,255,255,0.04); }
.sp-knots tr.selected { background: rgba(54,179,255,0.18); }
.sp-knots td.idx { width: 22px; text-align: right; color: var(--color-normal-contrast-weaker, #aaa); cursor: pointer; }
.sp-knots td.pos { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; }
.sp-knots td.pos ui-num-input, .sp-knots td.more ui-num-input { width: 100%; min-width: 0; }
.sp-knots td.mode { width: 96px; }
.sp-knots td.mode ui-select { width: 100%; }
.sp-knots td.tools { width: 44px; white-space: nowrap; }
.sp-knots td.tools span { cursor: pointer; padding: 0 3px; color: var(--color-normal-contrast-weaker, #aaa); }
.sp-knots td.tools span:hover { color: var(--color-normal-contrast, #fff); }
.sp-knots tr.details td { padding: 2px 2px 6px 24px; }
.sp-detail { display: grid; grid-template-columns: 70px 1fr; gap: 3px 6px; align-items: center; }
.sp-detail .vec { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; }
.sp-detail span { color: var(--color-normal-contrast-weaker, #aaa); font-size: 11px; }
.sp-link { color: #ffc440; font-size: 10px; margin-left: 2px; }
.sp-add { display: flex; gap: 4px; margin-top: 4px; }
.sp-add ui-button { flex: 1; }
`;

export const $ = {
    props: '.props',
    edit: '.edit',
    draw: '.draw',
    splines: '.splines',
};

type Ctx = RendererContext & {
    info: Info | null;
    open: Set<number>;
    expanded: Set<string>;
    pending: boolean;
    offState?: () => void;
    refreshTimer?: any;
};

function compUuid(ctx: Ctx): string | null {
    const ids = componentUuids(ctx.dump);
    return ids.length === 1 ? ids[0] : null;
}

async function refresh(ctx: Ctx): Promise<void> {
    const uuid = compUuid(ctx);
    if (!uuid) {
        ctx.info = null;
        draw(ctx);
        return;
    }
    try {
        ctx.info = await callScene('spContainerInfo', uuid);
    } catch {
        ctx.info = null;
    }
    draw(ctx);
}

function scheduleRefresh(ctx: Ctx, delay = 30): void {
    clearTimeout(ctx.refreshTimer);
    ctx.refreshTimer = setTimeout(() => refresh(ctx), delay);
}

async function act(ctx: Ctx, s: number, action: string, arg?: any): Promise<void> {
    const uuid = compUuid(ctx);
    if (!uuid) return;
    try {
        const info = await callScene('spSplineAction', uuid, s, action, arg);
        if (info) ctx.info = info;
    } catch (e) {
        console.warn('[Splines]', e);
    }
    draw(ctx);
}

async function editKnot(ctx: Ctx, s: number, k: number, props: any): Promise<void> {
    const uuid = compUuid(ctx);
    if (!uuid) return;
    try {
        const info = await callScene('spEditKnot', uuid, s, k, props);
        if (info) ctx.info = info;
    } catch (e) {
        console.warn('[Splines]', e);
    }
    draw(ctx);
}

function num(value: number, onConfirm: (v: number) => void, step = 0.1): HTMLElement {
    const el = h('ui-num-input', { step: String(step) });
    (el as any).value = value;
    el.addEventListener('confirm', (e: any) => {
        const v = Number(e.target.value);
        if (isFinite(v)) onConfirm(v);
    });
    return el;
}

function modeSelect(mode: number, onChange: (m: number) => void): HTMLElement {
    const sel = h('ui-select', {}, MODE_NAMES.map((n, i) => h('option', { value: String(i) }, [n])));
    (sel as any).value = String(mode);
    sel.addEventListener('change', (e: any) => onChange(Number(e.target.value)));
    return sel;
}

function vec(values: number[], onAxis: (i: number, v: number) => void, step = 0.1): HTMLElement {
    return h('div', { class: 'vec' }, values.map((v, i) => num(v, (x) => onAxis(i, x), step)));
}

function draw(ctx: Ctx): void {
    const info = ctx.info;
    const edit = ctx.$.edit as any;
    const drawBtn = ctx.$.draw as any;
    edit.classList.toggle('blue', !!info?.context && info.tool === 'select');
    drawBtn.classList.toggle('blue', !!info?.context && info.tool === 'draw');
    edit.disabled = !info;
    drawBtn.disabled = !info;
    const root = ctx.$.splines;
    if (isEditing(root)) {
        // Don't rebuild under the user's cursor; try again shortly.
        ctx.pending = true;
        return;
    }
    ctx.pending = false;
    root.textContent = '';
    if (!info) {
        root.appendChild(h('div', { class: 'sp-note' }, [componentUuids(ctx.dump).length > 1
            ? 'Select a single node to edit its splines.'
            : 'Waiting for the scene…']));
        return;
    }
    info.splines.forEach((spline, s) => {
        const open = ctx.open.has(s) || info.splines.length === 1;
        const head = h('div', { class: 'sp-spline-head' }, [
            h('span', { class: 'fold', onclick: () => toggle(ctx, s) }, [open ? '▾' : '▸']),
            h('span', { class: 'title', onclick: () => toggle(ctx, s) }, [`Spline ${s}`]),
            h('span', { class: 'meta' }, [`${spline.knots.length} knots · ${spline.length}`]),
            h('span', { class: 'sp-flex' }),
            (() => {
                const cb = h('ui-checkbox', { title: 'Connect the last knot to the first' }, ['Closed']);
                (cb as any).value = spline.closed;
                cb.addEventListener('change', (e: any) => act(ctx, s, 'closed', !!e.target.value));
                return cb;
            })(),
            h('ui-button', { class: 'tiny', title: 'Reverse the direction of travel', onclick: () => act(ctx, s, 'reverse') }, ['⇄']),
            h('ui-button', { class: 'tiny red', title: 'Remove this spline', onclick: () => act(ctx, s, 'removeSpline') }, ['✕']),
        ]);
        const box = h('div', { class: 'sp-spline' }, [head]);
        if (open) {
            const table = h('table', { class: 'sp-knots' });
            spline.knots.forEach((knot, k) => {
                const key = `${s}:${k}`;
                const expanded = ctx.expanded.has(key);
                const row = h('tr', { class: `knot${knot.selected ? ' selected' : ''}` }, [
                    h('td', { class: 'idx', title: 'Select this knot in the Scene view (Shift: add)', onclick: (e: MouseEvent) => act(ctx, s, 'selectKnot', { knot: k, additive: e.shiftKey || e.ctrlKey }) }, [
                        String(k), knot.linked ? h('span', { class: 'sp-link', title: 'Linked' }, ['●']) : null,
                    ]),
                    h('td', { class: 'pos' }, knot.position.map((v, i) => num(v, (x) => {
                        const p: (number | null)[] = [null, null, null];
                        p[i] = x;
                        editKnot(ctx, s, k, { position: p });
                    }))),
                    h('td', { class: 'mode' }, [modeSelect(knot.mode, (m) => editKnot(ctx, s, k, { mode: m }))]),
                    h('td', { class: 'tools' }, [
                        h('span', { title: 'More', onclick: () => { expanded ? ctx.expanded.delete(key) : ctx.expanded.add(key); draw(ctx); } }, [expanded ? '▴' : '▾']),
                        h('span', { title: 'Delete knot', onclick: () => act(ctx, s, 'removeKnot', k) }, ['✕']),
                    ]),
                ]);
                table.appendChild(row);
                if (expanded) {
                    const detail = h('div', { class: 'sp-detail' }, [
                        h('span', {}, ['Rotation']),
                        vec(knot.rotation, (i, x) => {
                            const r: (number | null)[] = [null, null, null];
                            r[i] = x;
                            editKnot(ctx, s, k, { rotation: r });
                        }, 1),
                        knot.mode === 0 ? h('span', {}, ['Tension']) : null,
                        knot.mode === 0 ? num(knot.tension, (x) => editKnot(ctx, s, k, { tension: x }), 0.05) : null,
                        knot.mode !== 1 ? h('span', {}, ['Tangent In']) : null,
                        knot.mode !== 1 ? num(knot.tangentIn, (x) => editKnot(ctx, s, k, { tangentIn: x })) : null,
                        knot.mode !== 1 ? h('span', {}, ['Tangent Out']) : null,
                        knot.mode !== 1 ? num(knot.tangentOut, (x) => editKnot(ctx, s, k, { tangentOut: x })) : null,
                    ]);
                    table.appendChild(h('tr', { class: 'details' }, [h('td', { colspan: '4' }, [detail])]));
                }
            });
            box.appendChild(table);
            box.appendChild(h('div', { class: 'sp-add' }, [
                h('ui-button', { class: 'tiny', onclick: () => act(ctx, s, 'addKnot') }, ['+ Knot']),
            ]));
        }
        root.appendChild(box);
    });
    root.appendChild(h('div', { class: 'sp-add' }, [
        h('ui-button', { onclick: () => act(ctx, 0, 'addSpline') }, ['+ Add Spline']),
    ]));
}

function toggle(ctx: Ctx, s: number): void {
    if (ctx.open.has(s)) ctx.open.delete(s);
    else ctx.open.add(s);
    draw(ctx);
}

export function ready(this: Ctx) {
    this.info = null;
    this.open = new Set([0]);
    this.expanded = new Set();
    this.pending = false;
    this.$.edit.addEventListener('click', async () => {
        const on = !(this.info?.context && this.info.tool === 'select');
        if (on) await selectThisNode(this);
        await callScene('spSetContext', on).catch(() => undefined);
        scheduleRefresh(this, 0);
    });
    this.$.draw.addEventListener('click', async () => {
        const on = !(this.info?.context && this.info.tool === 'draw');
        if (on) await selectThisNode(this);
        await callScene('spSetTool', on ? 'draw' : 'select').catch(() => undefined);
        scheduleRefresh(this, 0);
    });
    this.offState = onBroadcast('splines:state', () => scheduleRefresh(this, 50));
    // Catch up after an edit that happened while a field had focus.
    this.$.splines.addEventListener('focusout', () => {
        if (this.pending) setTimeout(() => draw(this), 0);
    });
}

/** The edit context works on the selected nodes: make sure this one is. */
async function selectThisNode(ctx: Ctx): Promise<void> {
    const node = ctx.info?.node;
    if (!node) return;
    try {
        const sel = Editor.Selection.getSelected('node');
        if (!sel.includes(node)) {
            Editor.Selection.clear('node');
            Editor.Selection.select('node', node);
            await new Promise((r) => setTimeout(r, 80));
        }
    } catch {
        // selection API missing
    }
}

export function update(this: Ctx, dump: any) {
    this.dump = dump;
    renderProps(this, this.$.props, dump, ['splines', 'links']);
    scheduleRefresh(this);
}

export function close(this: Ctx) {
    clearTimeout(this.refreshTimer);
    this.offState?.();
}
