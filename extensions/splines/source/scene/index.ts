/**
 * Scene-process half of the Splines extension: draws splines in the Scene
 * view, edits them with the mouse, and serves the panel and Inspector.
 *
 * Methods are called with execute-scene-script, which only reaches the edit
 * scene's process; that process marks itself primary. Play-in-Editor's
 * process loads this script too but only draws.
 */
import { cc, cce, findComponent, findNode, runtimeReady, repaint, allContainers } from './env';
import { S, DEFAULT_SETTINGS, note, bumpState } from './state';
import { drawFrame } from './render';
import { onMouseDown, onMouseMove, onMouseUp, onDblClick, onKeyDown, onKeyUp, PRIORITY, cancelActive } from './input';
import { installGuards, uninstallGuards, guardsInfo } from './guards';
import { panelState, maybeBroadcast, setContext, setTool, updateTargets } from './context';
import { eventCoordMode, removeOverlay, sceneCamera } from './view';
import {
    deleteSelection, setModeSelected, cycleModeSelected, linkSelected, unlinkSelected, splitSelected, joinSelected,
    reverseSelected, setClosedSelected, selectAll, clearSelection, setElementProps, containerInfo, editKnot, splineAction,
    createSplineNode, ElementProps,
} from './ops';
import { recordEdit, afterEdit } from './undo';

const PKG = 'splines';

let hooked = false;
let opHooked = false;

function onBeforeCommit(): void {
    try {
        drawFrame();
        maybeBroadcast();
    } catch (e) {
        note(`draw: ${(e as Error)?.stack || e}`);
    }
}

const listeners: [string, (ev: any) => boolean][] = [
    ['mousedown', onMouseDown],
    ['mousemove', onMouseMove],
    ['mouseup', onMouseUp],
    ['dblclick', onDblClick],
    ['keydown', onKeyDown],
    ['keyup', onKeyUp],
];

function hook(): void {
    if (!hooked) {
        const { director, Director } = cc();
        director.on(Director.EVENT_BEFORE_COMMIT, onBeforeCommit);
        hooked = true;
    }
    if (!opHooked) {
        const op = cce().Operation;
        if (op?.addListener) {
            for (const [type, fn] of listeners) op.addListener(type, fn, PRIORITY);
            opHooked = true;
        }
    }
    installGuards();
    S.hooked = hooked && opHooked;
}

function unhook(): void {
    try {
        if (hooked) {
            const { director, Director } = cc();
            director.off(Director.EVENT_BEFORE_COMMIT, onBeforeCommit);
        }
    } catch {
        // editor shutting down
    }
    hooked = false;
    try {
        const op = cce().Operation;
        if (opHooked && op?.removeListener) for (const [type, fn] of listeners) op.removeListener(type, fn);
    } catch {
        // editor shutting down
    }
    opHooked = false;
    uninstallGuards();
}

function markPrimary(): void {
    if (!S.primary) {
        S.primary = true;
        bumpState();
    }
    hook();
}

async function loadSettings(): Promise<void> {
    try {
        const saved = await Editor.Profile.getConfig(PKG, 'settings');
        if (saved && typeof saved === 'object') S.settings = { ...DEFAULT_SETTINGS, ...saved };
    } catch {
        // defaults
    }
    repaint();
}

async function saveSettings(): Promise<void> {
    try {
        await Editor.Profile.setConfig(PKG, 'settings', { ...S.settings }, 'global');
    } catch {
        // not persisted
    }
}

function broadcastNow(): any {
    updateTargets();
    maybeBroadcast(true);
    repaint();
    return panelState();
}

export const methods: Record<string, (...args: any[]) => any> = {
    /** Panel / Inspector handshake: marks this process as the edit scene. */
    spHello() {
        markPrimary();
        return broadcastNow();
    },

    spPrimary() {
        markPrimary();
        return true;
    },

    spState() {
        updateTargets();
        return panelState();
    },

    spSetContext(on: boolean) {
        markPrimary();
        updateTargets();
        if (on && !S.lastTargets.length) return panelState();
        setContext(!!on);
        return broadcastNow();
    },

    spSetTool(tool: 'select' | 'draw') {
        markPrimary();
        updateTargets();
        if (!S.lastTargets.length) return panelState();
        setTool(tool === 'draw' ? 'draw' : 'select');
        if (tool === 'draw') S.drawing = null;
        return broadcastNow();
    },

    spSetSetting(key: string, value: any) {
        if (!(key in S.settings)) return panelState();
        (S.settings as any)[key] = value;
        saveSettings();
        return broadcastNow();
    },

    async spSetElement(props: ElementProps) {
        markPrimary();
        await setElementProps(props || {});
        return broadcastNow();
    },

    async spAction(name: string, arg?: any) {
        markPrimary();
        updateTargets();
        switch (name) {
            case 'delete': await deleteSelection(); break;
            case 'mode': await setModeSelected(Number(arg)); break;
            case 'cycleMode': await cycleModeSelected(); break;
            case 'link': await linkSelected(); break;
            case 'unlink': await unlinkSelected(); break;
            case 'split': await splitSelected(); break;
            case 'join': await joinSelected(); break;
            case 'reverse': await reverseSelected(); break;
            case 'close': await setClosedSelected(arg === undefined ? undefined : !!arg); break;
            case 'selectAll': selectAll(); break;
            case 'clearSelection': clearSelection(); break;
            case 'finishDrawing': S.drawing = null; break;
        }
        return broadcastNow();
    },

    async spCreate(kind: string) {
        markPrimary();
        try {
            return await createSplineNode(kind);
        } catch (e) {
            note(`create: ${(e as Error)?.stack || e}`);
            console.error('[Splines] Could not create the spline:', e);
            return null;
        }
    },

    /** Inspector: data of one SplineContainer. */
    spContainerInfo(compUuid: string) {
        markPrimary();
        updateTargets();
        return containerInfo(compUuid);
    },

    async spEditKnot(compUuid: string, spline: number, knot: number, props: ElementProps) {
        markPrimary();
        await editKnot(compUuid, spline, knot, props || {});
        return containerInfo(compUuid);
    },

    async spSplineAction(compUuid: string, spline: number, action: string, arg?: any) {
        markPrimary();
        updateTargets();
        return splineAction(compUuid, spline, action, arg);
    },

    /** Inspector: turns SplineInstantiate's generated instances into regular nodes. */
    async spBakeInstances(compUuid: string) {
        markPrimary();
        const comp = findComponent(compUuid);
        if (!comp || typeof comp._bakeInfo !== 'function') return { count: 0 };
        const info: { prefab: string; position: number[]; rotation: number[]; scale: number[] }[] = comp._bakeInfo();
        if (!info.length) return { count: 0 };
        const parent = (await Editor.Message.request('scene', 'create-node', {
            parent: comp.node.uuid,
            name: `${comp.node.name} Instances`,
        } as any)) as unknown as string;
        let count = 0;
        for (const p of info) {
            const uuid = (await Editor.Message.request('scene', 'create-node', { parent, assetUuid: p.prefab } as any)) as unknown as string;
            const node = typeof uuid === 'string' ? findNode(uuid) : null;
            if (!node) continue;
            node.setWorldPosition(p.position[0], p.position[1], p.position[2]);
            node.setWorldRotation(p.rotation[0], p.rotation[1], p.rotation[2], p.rotation[3]);
            node.setScale(p.scale[0], p.scale[1], p.scale[2]);
            count++;
        }
        // Stop generating: the baked nodes replace the instances.
        await recordEdit([comp], () => {
            comp.enabled = false;
        });
        afterEdit([comp]);
        const parentNode = findNode(parent);
        if (parentNode) cce().Engine?.repaintInEditMode?.();
        return { count };
    },

    spDiagnostics() {
        const cam = sceneCamera();
        return {
            primary: S.primary,
            hooked: S.hooked,
            runtimeReady: runtimeReady(),
            context: S.context,
            tool: S.tool,
            settings: S.settings,
            selection: S.selection.all().map((e) => `${e.comp.node?.name}:${e.spline}:${e.knot}:${e.part}`),
            targets: S.lastTargets.map((c) => c.node?.name),
            containers: allContainers().map((c) => `${c.node?.name} (${c.splines.length} splines)`),
            camera: cam ? { name: cam.name, width: cam.width, height: cam.height, projection: cam.projectionType } : null,
            eventCoords: eventCoordMode(),
            operation: !!cce().Operation?.addListener,
            guards: guardsInfo(),
            gizmo: {
                tool: cce().Gizmo?.transformToolName,
                pivot: cce().Gizmo?.pivot,
                coordinate: cce().Gizmo?.coordinate,
                is2D: cce().Gizmo?.is2D,
            },
            diag: S.diag,
            url: typeof location !== 'undefined' ? location.href : '',
        };
    },
};

export function load(): void {
    loadSettings();
    // The engine and the editor managers may not be ready yet; retry.
    const tryHook = (n: number) => {
        try {
            hook();
            if (S.hooked) return;
        } catch {
            // retry
        }
        if (n > 0) setTimeout(() => tryHook(n - 1), 1000);
    };
    tryHook(30);
}

export function unload(): void {
    cancelActive();
    unhook();
    removeOverlay();
    setContext(false);
}
