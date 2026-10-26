/**
 * The Splines panel and the SplineContainer Inspector in a browser page with
 * fake editor data. `#interact` clicks through the UI and writes the checks
 * to #result.
 */
import { defineStubs } from './ui-stubs';
import { createSplinesApp, emptyState } from '../../source/panels/default/app';
import type { PanelState, SplinesBridge } from '../../source/panels/default/bridge';
import * as inspector from '../../source/inspector/spline-container';

defineStubs();

// ------------------------------------------------------------- fake data

const calls: { method: string; args: any[] }[] = [];

function state(): PanelState {
    const s = emptyState();
    s.primary = true;
    s.ready = true;
    s.context = true;
    s.tool = 'select';
    s.targets = [{ uuid: 'comp-1', node: 'node-1', name: 'Road', splines: 2, knots: 9 }];
    s.selection = { count: 1, knots: 1, tangents: 0 };
    s.element = {
        kind: 'knot', count: 1, knots: 1, label: 'Knot 3', position: [4.5, 0, -2.25], rotation: [0, 35, 0],
        mode: 2, tension: 0.5, tangentIn: 1.2, tangentOut: 1.2, linked: true,
    };
    s.actions = { delete: true, link: false, unlink: true, split: true, join: false, reverse: true, close: true, selectAll: true };
    s.closed = false;
    return s;
}

let listeners: ((s: PanelState) => void)[] = [];
const bridge: SplinesBridge = {
    async call(method, ...args) {
        calls.push({ method, args });
        return state();
    },
    onState(fn) {
        listeners.push(fn);
        return () => (listeners = listeners.filter((f) => f !== fn));
    },
    onSelection() {
        return () => undefined;
    },
};

const containerInfo = {
    uuid: 'comp-1',
    node: 'node-1',
    context: true,
    tool: 'select',
    drawing: false,
    splines: [
        {
            closed: false,
            length: 24.531,
            knots: [
                { position: [0, 0, 0], rotation: [0, 90, 0], mode: 0, tension: 0.5, tangentIn: 0.8, tangentOut: 0.8, linked: false, selected: false },
                { position: [5, 0, 2], rotation: [0, 60, 0], mode: 2, tension: 0.5, tangentIn: 1.5, tangentOut: 1.5, linked: true, selected: true },
                { position: [10, 0, -1], rotation: [0, 110, 0], mode: 1, tension: 0.5, tangentIn: 0, tangentOut: 0, linked: false, selected: false },
            ],
        },
        { closed: true, length: 12.566, knots: [] },
    ],
};

(window as any).Editor = {
    Message: {
        async request(_pkg: string, msg: string, opts: any) {
            calls.push({ method: opts?.method ?? msg, args: opts?.args ?? [] });
            if (opts?.method === 'spContainerInfo' || opts?.method === 'spSplineAction' || opts?.method === 'spEditKnot') return containerInfo;
            return null;
        },
        __protected__: { addBroadcastListener() {}, removeBroadcastListener() {} },
    },
    Selection: { getSelected: () => ['node-1'], clear() {}, select() {} },
};

// ------------------------------------------------------------------ mount

const panelHost = document.getElementById('panel')!;
const app = createSplinesApp(panelHost, bridge);

const inspHost = document.getElementById('inspector')!;
inspHost.innerHTML = `<style>${inspector.style}</style>${inspector.template}`;
const ctx: any = { $: {}, $this: inspHost };
for (const [k, sel] of Object.entries(inspector.$)) ctx.$[k] = inspHost.querySelector(sel as string);
inspector.ready.call(ctx);
inspector.update.call(ctx, {
    value: {
        uuid: { value: 'comp-1' },
        __scriptAsset: { visible: true, displayName: 'Script', value: { uuid: 'SplineContainer.ts' } },
        splines: { visible: true, value: [] },
        links: { visible: false, value: [] },
    },
});

// ---------------------------------------------------------------- checks

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function interact() {
    const out: string[] = [];
    const check = (name: string, ok: boolean) => out.push(`${ok ? 'ok  ' : 'FAIL'} ${name}`);
    await wait(100);
    const root = panelHost;
    check('status names the target', /Road: 2 splines, 9 knots/.test(root.textContent || ''));
    check('element title', (root.querySelector('.sp-title')?.textContent || '').includes('Knot 3'));
    check('linked badge', !!root.querySelector('.sp-badge'));
    const bezier = [...root.querySelectorAll('.sp-seg ui-button')].find((b) => b.textContent === 'Bezier') as HTMLElement;
    check('Bezier highlighted for a Mirrored knot', !!bezier?.classList.contains('blue'));
    const nums = root.querySelectorAll('.sp-vec ui-num-input') as NodeListOf<any>;
    check('position X shown', nums[0]?.value === 4.5);
    // Edit Y.
    nums[1].value = 3;
    nums[1].dispatchEvent(new CustomEvent('confirm', { bubbles: true }));
    await wait(20);
    const set = calls.find((c) => c.method === 'spSetElement');
    check('position edit sends one axis', JSON.stringify(set?.args) === JSON.stringify([{ position: [null, 3, null] }]));
    // Mode buttons.
    ([...root.querySelectorAll('.sp-seg ui-button')].find((b) => b.textContent === 'Linear') as HTMLElement).click();
    await wait(20);
    check('Linear button sets mode 1', calls.some((c) => c.method === 'spSetElement' && c.args[0]?.mode === 1));
    // Actions.
    const split = [...root.querySelectorAll('.sp-actions ui-button')].find((b) => b.textContent === 'Split') as HTMLElement;
    split.click();
    await wait(20);
    check('Split action', calls.some((c) => c.method === 'spAction' && c.args[0] === 'split'));
    const link = [...root.querySelectorAll('.sp-actions ui-button')].find((b) => b.textContent === 'Link') as any;
    check('Link disabled when not available', link.disabled === true || link.hasAttribute('disabled'));
    // Create.
    ([...root.querySelectorAll('.sp-grid ui-button')].find((b) => b.textContent === 'Circle') as HTMLElement).click();
    await wait(20);
    check('Create circle', calls.some((c) => c.method === 'spCreate' && c.args[0] === 'circle'));
    // Broadcast updates the view.
    const s2 = state();
    s2.element!.label = 'Knot 7';
    listeners.forEach((f) => f(s2));
    await wait(20);
    check('broadcast updates the panel', (root.querySelector('.sp-title')?.textContent || '').includes('Knot 7'));

    // Inspector.
    await wait(100);
    const rows = inspHost.querySelectorAll('tr.knot');
    check('inspector lists the knots', rows.length === 3);
    check('selected knot highlighted', rows[1]?.classList.contains('selected'));
    check('edit button reflects the context', (ctx.$.edit as HTMLElement).classList.contains('blue'));
    (rows[2].querySelector('td.idx') as HTMLElement).click();
    await wait(20);
    check('row click selects the knot in the scene', calls.some((c) => c.method === 'spSplineAction' && c.args[2] === 'selectKnot'));
    const pos = rows[0].querySelectorAll('td.pos ui-num-input') as NodeListOf<any>;
    pos[2].value = 7;
    pos[2].dispatchEvent(new CustomEvent('confirm', { bubbles: true }));
    await wait(20);
    check('knot edit from the inspector', calls.some((c) => c.method === 'spEditKnot' && JSON.stringify(c.args[3]) === JSON.stringify({ position: [null, null, 7] })));

    const res = document.createElement('div');
    res.id = 'result';
    res.textContent = out.join('\n');
    document.body.appendChild(res);
    void app;
}

if (location.hash === '#interact') interact();
