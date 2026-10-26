/**
 * The Splines panel: Unity's spline tool context toggle, Draw tool, Element
 * Inspector (selected knots) and spline actions, plus shape creation and
 * display options.
 */
import { createApp, reactive, computed, App } from 'vue';
import type { PanelState, SplinesBridge } from './bridge';

export const MODES = { AutoSmooth: 0, Linear: 1, Mirrored: 2, Continuous: 3, Broken: 4 };

const TEMPLATE = /* html */ `
<div class="sp-root">
  <div class="sp-toolbar">
    <ui-button class="sp-tool" :class="{ blue: s.context && s.tool === 'select' }" :disabled="!hasTargets"
      title="Edit the knots of the selected splines (Unity's spline tool context). Esc leaves." @click="toggleContext">Edit Spline</ui-button>
    <ui-button class="sp-tool" :class="{ blue: s.context && s.tool === 'draw' }" :disabled="!hasTargets"
      title="Draw Spline tool: click to add knots, drag to pull tangents." @click="toggleDraw">Draw</ui-button>
    <div class="sp-flex"></div>
    <ui-select class="sp-orient" :value="s.settings.orientation" title="Handle orientation (X cycles)"
      @change="setSetting('orientation', $event.target.value)">
      <option value="global">Global</option>
      <option value="local">Local</option>
      <option value="element">Element</option>
    </ui-select>
  </div>

  <div class="sp-status" :class="{ warn: !s.ready }">{{ status }}</div>

  <div v-if="s.context && s.tool === 'draw'" class="sp-box">
    <div class="sp-row">
      <span class="sp-label">Default Knot</span>
      <ui-select class="sp-grow" :value="String(s.settings.defaultMode)" @change="setSetting('defaultMode', Number($event.target.value))">
        <option value="0">Auto Smooth</option>
        <option value="1">Linear</option>
      </ui-select>
    </div>
    <div class="sp-row" v-if="!s.is2D">
      <ui-checkbox :value="s.settings.drawOnSurfaces" @change="setSetting('drawOnSurfaces', !!$event.target.value)">Place on surfaces</ui-checkbox>
    </div>
    <div class="sp-row">
      <ui-button class="sp-grow" :disabled="!s.drawing" @click="action('finishDrawing')">Finish Spline (Enter)</ui-button>
      <ui-button class="sp-grow" @click="setTool('select')">Done (Esc)</ui-button>
    </div>
  </div>

  <div v-if="el" class="sp-box">
    <div class="sp-title">{{ el.label }}<span v-if="el.linked" class="sp-badge">linked</span></div>
    <div class="sp-row">
      <span class="sp-label">Position</span>
      <div class="sp-vec">
        <label class="x">X</label><ui-num-input step="0.1" :value="num(el.position[0])" :class="{ mixed: el.position[0] === null }" @confirm="setVec('position', 0, $event)"></ui-num-input>
        <label class="y">Y</label><ui-num-input step="0.1" :value="num(el.position[1])" :class="{ mixed: el.position[1] === null }" @confirm="setVec('position', 1, $event)"></ui-num-input>
        <label class="z">Z</label><ui-num-input step="0.1" :value="num(el.position[2])" :class="{ mixed: el.position[2] === null }" @confirm="setVec('position', 2, $event)"></ui-num-input>
      </div>
    </div>
    <div class="sp-row">
      <span class="sp-label">Rotation</span>
      <div class="sp-vec">
        <label class="x">X</label><ui-num-input step="1" :value="num(el.rotation[0])" :class="{ mixed: el.rotation[0] === null }" @confirm="setVec('rotation', 0, $event)"></ui-num-input>
        <label class="y">Y</label><ui-num-input step="1" :value="num(el.rotation[1])" :class="{ mixed: el.rotation[1] === null }" @confirm="setVec('rotation', 1, $event)"></ui-num-input>
        <label class="z">Z</label><ui-num-input step="1" :value="num(el.rotation[2])" :class="{ mixed: el.rotation[2] === null }" @confirm="setVec('rotation', 2, $event)"></ui-num-input>
      </div>
    </div>
    <div class="sp-row">
      <span class="sp-label">Tangent Mode</span>
      <div class="sp-seg">
        <ui-button :class="{ blue: el.mode === 1 }" title="Linear: straight segments, no tangents" @click="setMode(1)">Linear</ui-button>
        <ui-button :class="{ blue: el.mode === 0 }" title="Auto Smooth: tangents follow the neighbor knots" @click="setMode(0)">Auto</ui-button>
        <ui-button :class="{ blue: isBezier }" title="Bezier: tangents you can drag" @click="setMode(bezierMode)">Bezier</ui-button>
      </div>
    </div>
    <div class="sp-row" v-if="isBezier">
      <span class="sp-label"></span>
      <ui-select class="sp-grow" :value="String(el.mode)" @change="setMode(Number($event.target.value))">
        <option value="2">Mirrored</option>
        <option value="3">Continuous</option>
        <option value="4">Broken</option>
      </ui-select>
    </div>
    <div class="sp-row" v-if="el.mode === 0">
      <span class="sp-label" title="0 uniform, 0.5 centripetal, 1 chordal">Tension</span>
      <ui-slider class="sp-grow" min="0" max="1" step="0.01" :value="el.tension === null ? 0.5 : el.tension" @confirm="setProp('tension', Number($event.target.value))"></ui-slider>
    </div>
    <div class="sp-row" v-if="el.mode !== 1 && el.mode !== null">
      <span class="sp-label">Tangents</span>
      <div class="sp-vec two">
        <label>In</label><ui-num-input min="0" step="0.1" :value="num(el.tangentIn)" :class="{ mixed: el.tangentIn === null }" @confirm="setProp('tangentIn', Number($event.target.value))"></ui-num-input>
        <label>Out</label><ui-num-input min="0" step="0.1" :value="num(el.tangentOut)" :class="{ mixed: el.tangentOut === null }" @confirm="setProp('tangentOut', Number($event.target.value))"></ui-num-input>
      </div>
    </div>
  </div>

  <div v-if="s.context" class="sp-actions">
    <ui-button :disabled="!s.actions.link" title="Knots on the same position move together" @click="action('link')">Link</ui-button>
    <ui-button :disabled="!s.actions.unlink" @click="action('unlink')">Unlink</ui-button>
    <ui-button :disabled="!s.actions.split" title="Split the spline at the knot" @click="action('split')">Split</ui-button>
    <ui-button :disabled="!s.actions.join" title="Join two end knots" @click="action('join')">Join</ui-button>
    <ui-button :disabled="!s.actions.reverse" title="Reverse the direction of travel" @click="action('reverse')">Reverse</ui-button>
    <ui-button :disabled="!s.actions.close" @click="action('close')">{{ s.closed ? 'Open' : 'Close' }}</ui-button>
    <ui-button :disabled="!s.actions.selectAll" @click="action('selectAll')">Select All</ui-button>
    <ui-button class="red" :disabled="!s.actions.delete" @click="action('delete')">Delete</ui-button>
  </div>

  <details class="sp-group" :open="ui.create" @toggle="ui.create = $event.target.open">
    <summary>Create Spline</summary>
    <div class="sp-grid">
      <ui-button v-for="sh in shapes" :key="sh.kind" :title="sh.tip" @click="create(sh.kind)">{{ sh.label }}</ui-button>
    </div>
  </details>

  <details class="sp-group" :open="ui.display" @toggle="ui.display = $event.target.open">
    <summary>Display</summary>
    <div class="sp-checks">
      <ui-checkbox :value="s.settings.showAll" @change="setSetting('showAll', !!$event.target.value)">Show all splines</ui-checkbox>
      <ui-checkbox :value="s.settings.showFlow" @change="setSetting('showFlow', !!$event.target.value)">Flow direction</ui-checkbox>
      <ui-checkbox :value="s.settings.showAllTangents" @change="setSetting('showAllTangents', !!$event.target.value)">All tangents</ui-checkbox>
      <ui-checkbox :value="s.settings.showKnotIndices" @change="setSetting('showKnotIndices', !!$event.target.value)">Knot indices</ui-checkbox>
      <ui-checkbox :value="s.settings.showNormals" @change="setSetting('showNormals', !!$event.target.value)">Up vectors</ui-checkbox>
    </div>
  </details>

  <details class="sp-group" :open="ui.help" @toggle="ui.help = $event.target.open">
    <summary>Shortcuts</summary>
    <table class="sp-keys">
      <tr><td>Click knot</td><td>Select (starts editing)</td></tr>
      <tr><td>Shift / Ctrl + click</td><td>Add to / remove from selection</td></tr>
      <tr><td>Drag knot / tangent</td><td>Move it (Ctrl: snap)</td></tr>
      <tr><td>Drag empty space</td><td>Select knots in a rectangle</td></tr>
      <tr><td>W / E / R</td><td>Move / rotate / scale the selected knots</td></tr>
      <tr><td>Double-click curve</td><td>Insert a knot</td></tr>
      <tr><td>Delete</td><td>Delete selected knots</td></tr>
      <tr><td>C</td><td>Cycle tangent mode</td></tr>
      <tr><td>X</td><td>Cycle handle orientation</td></tr>
      <tr><td>Ctrl + A</td><td>Select all knots</td></tr>
      <tr><td>Esc</td><td>Clear selection / leave editing</td></tr>
      <tr><td colspan="2" class="sp-sub">Draw tool</td></tr>
      <tr><td>Click / drag</td><td>Add a knot / with tangents</td></tr>
      <tr><td>Click first knot</td><td>Close the spline</td></tr>
      <tr><td>Click an end knot</td><td>Continue that spline</td></tr>
      <tr><td>Click a curve</td><td>Insert a knot</td></tr>
      <tr><td>Enter / Esc</td><td>Finish the spline / leave the tool</td></tr>
      <tr><td>Shift + S</td><td>Next spline container</td></tr>
    </table>
  </details>
</div>
`;

export const SHAPES = [
    { kind: 'draw', label: 'Draw…', tip: 'New empty spline and the Draw tool' },
    { kind: 'line', label: 'Line', tip: 'Two knots' },
    { kind: 'square', label: 'Square', tip: 'Closed, linear' },
    { kind: 'rounded-square', label: 'Rounded', tip: 'Rounded square' },
    { kind: 'circle', label: 'Circle', tip: 'Closed, four mirrored knots' },
    { kind: 'polygon', label: 'Polygon', tip: 'Hexagon' },
    { kind: 'star', label: 'Star', tip: 'Five-pointed star' },
    { kind: 'helix', label: 'Helix', tip: 'Three turns' },
];

export function emptyState(): PanelState {
    return {
        primary: false,
        ready: false,
        context: false,
        tool: 'select',
        drawing: false,
        is2D: false,
        transformTool: 'position',
        settings: {
            showAll: true, showFlow: true, showAllTangents: false, showKnotIndices: false, showNormals: false,
            defaultMode: 0, drawOnSurfaces: true, orientation: 'global',
        },
        targets: [],
        selection: { count: 0, knots: 0, tangents: 0 },
        element: null,
        actions: {},
        closed: null,
    };
}

export interface SplinesApp {
    app: App;
    state: { s: PanelState };
    refresh(): Promise<void>;
    dispose(): void;
}

const RETRY_MS = 2000;

export function createSplinesApp(el: HTMLElement, bridge: SplinesBridge): SplinesApp {
    const state = reactive({
        s: emptyState(),
        bezierMode: MODES.Mirrored,
        ui: { create: true, display: false, help: false },
    });
    let retry: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;

    function apply(st: PanelState | null | undefined) {
        if (!st || typeof st !== 'object') return;
        state.s = st;
        const m = st.element?.mode;
        if (m === MODES.Mirrored || m === MODES.Continuous || m === MODES.Broken) state.bezierMode = m;
    }

    async function call(method: string, ...args: any[]) {
        try {
            apply(await bridge.call(method, ...args));
        } catch (e) {
            console.warn(`[Splines] ${method} failed:`, e);
        }
    }

    async function refresh() {
        if (retry) clearTimeout(retry);
        retry = null;
        try {
            apply(await bridge.call('spHello'));
        } catch {
            state.s.ready = false;
            if (!disposed) retry = setTimeout(refresh, RETRY_MS);
        }
    }

    const offState = bridge.onState((st) => apply(st));
    let selTimer: ReturnType<typeof setTimeout> | null = null;
    const offSel = bridge.onSelection(() => {
        if (selTimer) clearTimeout(selTimer);
        selTimer = setTimeout(() => call('spState'), 80);
    });

    const app = createApp({
        template: TEMPLATE,
        setup() {
            const hasTargets = computed(() => state.s.targets.length > 0);
            const elInfo = computed(() => state.s.element);
            const isBezier = computed(() => {
                const m = state.s.element?.mode;
                return m === MODES.Mirrored || m === MODES.Continuous || m === MODES.Broken;
            });
            const status = computed(() => {
                const s = state.s;
                if (!s.ready) return 'Waiting for the scene…';
                if (!s.targets.length) return 'Select a node with a SplineContainer, or create a spline below.';
                const knots = s.targets.reduce((a, t) => a + t.knots, 0);
                const splines = s.targets.reduce((a, t) => a + t.splines, 0);
                const names = s.targets.map((t) => t.name).join(', ');
                const what = `${names}: ${splines} spline${splines === 1 ? '' : 's'}, ${knots} knot${knots === 1 ? '' : 's'}`;
                if (!s.context) return `${what}. Click Edit Spline or a knot to edit.`;
                if (s.tool === 'draw') return `${what}. Click to add knots, drag for tangents.`;
                if (!s.selection.count) return `${what}. Click a knot, or drag a rectangle.`;
                return what;
            });
            return {
                s: computed(() => state.s),
                ui: state.ui,
                el: elInfo,
                hasTargets,
                isBezier,
                status,
                shapes: SHAPES,
                bezierMode: computed(() => state.bezierMode),
                num: (v: number | null) => (v === null || v === undefined ? '' : v),
                toggleContext: () => call('spSetContext', !(state.s.context && state.s.tool === 'select')),
                toggleDraw: () => call('spSetTool', state.s.context && state.s.tool === 'draw' ? 'select' : 'draw'),
                setTool: (t: string) => call('spSetTool', t),
                setSetting: (key: string, value: any) => call('spSetSetting', key, value),
                setVec: (key: 'position' | 'rotation', i: number, ev: any) => {
                    const v = Number(ev?.target?.value);
                    if (!isFinite(v)) return;
                    const arr: (number | null)[] = [null, null, null];
                    arr[i] = v;
                    call('spSetElement', { [key]: arr });
                },
                setProp: (key: string, value: number) => {
                    if (!isFinite(value)) return;
                    call('spSetElement', { [key]: value });
                },
                setMode: (mode: number) => call('spSetElement', { mode }),
                action: (name: string, arg?: any) => call('spAction', name, arg),
                create: (kind: string) => bridge.call('spCreate', kind).catch((e) => console.warn('[Splines] create failed:', e)),
            };
        },
    });
    app.config.compilerOptions.isCustomElement = (tag: string) => tag.startsWith('ui-');
    app.mount(el);
    refresh();

    return {
        app,
        state,
        refresh,
        dispose() {
            disposed = true;
            if (retry) clearTimeout(retry);
            if (selTimer) clearTimeout(selTimer);
            offState();
            offSel();
            app.unmount();
        },
    };
}
