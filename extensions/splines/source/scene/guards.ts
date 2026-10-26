/**
 * Keeps editor shortcuts from acting on the node while knots are being
 * edited: Delete removes the selected knots (not the node), Ctrl+A selects
 * all knots (not all nodes).
 *
 * The keys reach the editor's shortcut system as well as the scene, so the
 * scene facade's removeNode / selectAllNodes are wrapped: right after such a
 * key went through the Scene view in the edit context, they do nothing for
 * the edited nodes.
 */
import { cce } from './env';
import { S, note } from './state';
import { deleteKey, cancelActive, isDragging } from './input';

const KEY_WINDOW_MS = 800;
const undo: (() => void)[] = [];
let installed = false;

function isTyping(e: KeyboardEvent): boolean {
    const t = e.target as HTMLElement | null;
    const tag = t?.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || !!t?.isContentEditable;
}

function onKeyDownCapture(e: KeyboardEvent): void {
    if (!S.primary || !S.context || isTyping(e)) return;
    const k = e.key;
    if ((k === 'Delete' || k === 'Backspace') && S.selection.size && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        e.stopImmediatePropagation();
        deleteKey();
    } else if ((k === 'a' || k === 'A') && (e.ctrlKey || e.metaKey) && S.lastTargets.length) {
        S.selectAllKeyAt = Date.now();
    }
}

function onBlur(): void {
    if (isDragging()) cancelActive();
}

function involvesEdited(options: any): boolean {
    const ids = options?.uuid;
    const list: string[] = Array.isArray(ids) ? ids : typeof ids === 'string' ? [ids] : [];
    const edited = new Set(S.lastTargets.map((c) => c.node.uuid));
    return list.some((id) => edited.has(id)) || list.length === 0;
}

function wrap(target: any, name: string, guard: (self: any, args: any[]) => boolean): void {
    const orig = target?.[name];
    if (typeof orig !== 'function' || orig.__splinesGuard) return;
    const wrapped = function (this: any, ...args: any[]) {
        try {
            if (guard(this, args)) return undefined;
        } catch (e) {
            note(`guard ${name}: ${e}`);
        }
        return orig.apply(this, args);
    };
    (wrapped as any).__splinesGuard = true;
    target[name] = wrapped;
    undo.push(() => {
        if (target[name] === wrapped) target[name] = orig;
    });
}

export function installGuards(): void {
    if (installed) return;
    installed = true;
    window.addEventListener('keydown', onKeyDownCapture, true);
    window.addEventListener('blur', onBlur);
    undo.push(() => {
        window.removeEventListener('keydown', onKeyDownCapture, true);
        window.removeEventListener('blur', onBlur);
    });
    const facade = cce().SceneFacadeManager;
    const target = typeof facade === 'function' ? facade.prototype : facade;
    if (!target) return;
    wrap(target, 'removeNode', (_self, args) => {
        if (S.context && Date.now() - S.deleteKeyAt < KEY_WINDOW_MS && involvesEdited(args[0])) {
            note('Delete went to the selected knots, not the node');
            return true;
        }
        return false;
    });
    wrap(target, 'selectAllNodes', () => S.context && Date.now() - S.selectAllKeyAt < KEY_WINDOW_MS);
}

export function uninstallGuards(): void {
    while (undo.length) undo.pop()!();
    installed = false;
}

export function guardsInfo(): Record<string, unknown> {
    const facade = cce().SceneFacadeManager;
    const target = typeof facade === 'function' ? facade.prototype : facade;
    return {
        installed,
        facadeType: typeof facade,
        removeNodeGuarded: !!target?.removeNode?.__splinesGuard,
        selectAllGuarded: !!target?.selectAllNodes?.__splinesGuard,
    };
}
