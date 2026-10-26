/**
 * What the Splines panel needs from the editor. The real bridge talks to the
 * scene script; the preview harness supplies a fake one.
 */
import type { PanelState } from '../../scene/context';
import { onBroadcast } from '../../shared/broadcast';

export type { PanelState };

export interface SplinesBridge {
    /** Calls a scene script method (sp*). */
    call(method: string, ...args: any[]): Promise<any>;
    /** Subscribes to state broadcasts; returns an unsubscribe function. */
    onState(fn: (state: PanelState) => void): () => void;
    /** Subscribes to editor selection changes. */
    onSelection(fn: () => void): () => void;
}

export function editorBridge(): SplinesBridge {
    return {
        call(method, ...args) {
            return Editor.Message.request('scene', 'execute-scene-script', { name: 'splines', method, args });
        },
        onState(fn) {
            return onBroadcast('splines:state', (state: PanelState) => fn(state));
        },
        onSelection(fn) {
            return onBroadcast(['selection:select', 'selection:unselect'], () => fn());
        },
    };
}
