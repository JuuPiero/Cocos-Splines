/**
 * The scene script against a fake editor: drawing, picking, dragging, the
 * Draw tool, keyboard, undo recordings and the panel / Inspector methods.
 */
import { log, scene, cce, cc, screen, selectNodes, geometry, setSceneMethods, domKey, findNode } from './stubs/editor';
import '../assets/index';
import { SplineContainer } from '../assets/runtime/SplineContainer';
import { TangentMode } from '../assets/runtime/BezierKnot';
import { methods, load } from '../source/scene/index';
import { S } from '../source/scene/state';
import assert from 'assert';
import { results } from './harness';

setSceneMethods(methods);

const tests: { name: string; fn: () => Promise<void> | void }[] = [];
function test(name: string, fn: () => Promise<void> | void) {
    tests.push({ name, fn });
}

const flush = () => new Promise((r) => setTimeout(r, 0));
const tick = () => (cc.director as any).tick();

function near(a: number, b: number, eps: number, msg = '') {
    assert.ok(Math.abs(a - b) <= eps, `${msg} ${a} != ${b} (±${eps})`);
}

function mouse(type: string, x: number, y: number, mods: Record<string, any> = {}) {
    return cce.Operation.emit(type, { x, y, button: 0, leftButton: true, ...mods });
}

async function click(x: number, y: number, mods: Record<string, any> = {}) {
    mouse('mousedown', x, y, mods);
    await flush();
    mouse('mouseup', x, y, mods);
    await flush();
    tick();
}

async function drag(from: { x: number; y: number }, to: { x: number; y: number }, mods: Record<string, any> = {}) {
    mouse('mousedown', from.x, from.y, mods);
    await flush();
    const steps = 5;
    for (let i = 1; i <= steps; i++) {
        mouse('mousemove', from.x + ((to.x - from.x) * i) / steps, from.y + ((to.y - from.y) * i) / steps, mods);
        await flush();
    }
    mouse('mouseup', to.x, to.y, mods);
    await flush();
    await flush();
    tick();
}

function key(k: string, mods: Record<string, any> = {}) {
    return cce.Operation.emit('keydown', { key: k, ...mods });
}

// ------------------------------------------------------------------ setup

const node = new cc.Node('Path');
node.setParent(scene);
const comp = node.addComponent(SplineContainer) as SplineContainer;
function reset() {
    const s = comp.splines[0];
    s.knots.length = 0;
    comp.splines.length = 1;
    comp.links.length = 0;
    s.closed = false;
    s.add(new cc.Vec3(0, 0, 0) as any);
    s.add(new cc.Vec3(5, 0, 0) as any);
    s.add(new cc.Vec3(10, 0, 5) as any);
    S.selection.clear();
    S.context = false;
    S.tool = 'select';
    S.drawing = null;
    selectNodes([node.uuid]);
    log.editorEvents.length = 0;
    log.removed.length = 0;
    tick();
}

load();
methods.spPrimary();

const knotScreen = (s: number, k: number) => {
    const p = comp.getKnotWorldPosition({ spline: s, knot: k });
    return screen(p.x, p.y, p.z);
};

// ------------------------------------------------------------------ tests

test('hooks into the editor and draws the selected spline', () => {
    reset();
    assert.ok(S.hooked, 'hooked');
    geometry.reset();
    tick();
    assert.ok(geometry.lines > 20, `lines drawn: ${geometry.lines}`);
    assert.ok(geometry.triangles > 0, 'knots drawn');
    assert.deepStrictEqual(S.lastTargets, [comp]);
});

test('clicking a knot enters the edit context and selects it; the editor never sees the click', async () => {
    reset();
    const p = knotScreen(0, 1);
    await click(p.x, p.y);
    assert.strictEqual(S.context, true);
    assert.deepStrictEqual(S.selection.all().map((e) => [e.knot, e.part]), [[1, 'knot']]);
    assert.ok(!log.editorEvents.includes('mousedown'), 'blocked');
});

test('outside the context, clicks on empty space go to the editor', async () => {
    reset();
    await click(screen(20, 0, 20).x, screen(20, 0, 20).y);
    assert.strictEqual(S.context, false);
    assert.ok(log.editorEvents.includes('mousedown') && log.editorEvents.includes('mouseup'));
});

test('dragging a knot moves it (one undo step)', async () => {
    reset();
    const before = log.requests.filter((r) => r.msg === 'begin-recording').length;
    await drag(knotScreen(0, 1), screen(5, 0, 3));
    const k = comp.splines[0].knots[1];
    near(k.position.x, 5, 0.05);
    near(k.position.z, 3, 0.05);
    const begins = log.requests.filter((r) => r.msg === 'begin-recording').length - before;
    const ends = log.requests.filter((r) => r.msg === 'end-recording').length;
    assert.strictEqual(begins, 1);
    assert.ok(ends >= 1);
    assert.ok(log.changes.some((c) => c.endsWith(node.uuid)), 'editor notified');
});

test('empty click clears the knot selection first, then reaches the editor', async () => {
    reset();
    await click(knotScreen(0, 0).x, knotScreen(0, 0).y);
    assert.strictEqual(S.selection.size, 1);
    log.editorEvents.length = 0;
    const empty = screen(-10, 0, -10);
    await click(empty.x, empty.y);
    assert.strictEqual(S.selection.size, 0);
    assert.ok(!log.editorEvents.includes('mousedown'), 'first click only clears');
    await click(empty.x, empty.y);
    assert.ok(log.editorEvents.includes('mousedown') && log.editorEvents.includes('mouseup'), 'second click replayed');
});

test('rectangle selection in the context', async () => {
    reset();
    S.context = true;
    await drag(screen(-1, 0, -1), screen(6, 0, 1));
    assert.deepStrictEqual(S.selection.knots().map((e) => e.knot).sort(), [0, 1]);
});

test('shift+click adds to the selection', async () => {
    reset();
    await click(knotScreen(0, 0).x, knotScreen(0, 0).y);
    await click(knotScreen(0, 2).x, knotScreen(0, 2).y, { shiftKey: true });
    assert.deepStrictEqual(S.selection.knots().map((e) => e.knot).sort(), [0, 2]);
});

test('move handle: dragging the X axis moves the selected knot along X only', async () => {
    reset();
    await click(knotScreen(0, 2).x, knotScreen(0, 2).y);
    const pivot = knotScreen(0, 2);
    // Grab the X arrow halfway along (90 px long), move 40 px right and some px up.
    const from = { x: pivot.x + 45, y: pivot.y };
    await drag(from, { x: from.x + 40, y: from.y + 30 });
    const k = comp.splines[0].knots[2];
    near(k.position.x, 12, 0.05);
    near(k.position.z, 5, 1e-6);
});

test('rotate tool turns a Bezier knot', async () => {
    reset();
    comp.splines[0].setTangentMode(1, TangentMode.Mirrored);
    await click(knotScreen(0, 1).x, knotScreen(0, 1).y);
    cce.Gizmo.transformToolName = 'rotation';
    tick();
    const before = comp.splines[0].knots[1].rotation.clone();
    const pivot = knotScreen(0, 1);
    // The view ring (1.15 x 90 px) is easy to grab from straight above.
    await drag({ x: pivot.x + 103, y: pivot.y }, { x: pivot.x, y: pivot.y + 103 });
    cce.Gizmo.transformToolName = 'position';
    const after = comp.splines[0].knots[1].rotation;
    const d = Math.abs(before.x * after.x + before.y * after.y + before.z * after.z + before.w * after.w);
    assert.ok(d < 0.9, `rotated (dot ${d})`);
});

test('double-click on a curve inserts a knot without changing the shape', async () => {
    reset();
    S.context = true;
    const spline = comp.splines[0];
    const mid = spline.evaluatePosition(0.25);
    const p = screen(mid.x, mid.y, mid.z);
    const r = cce.Operation.emit('dblclick', { x: p.x, y: p.y, button: 0 });
    assert.strictEqual(r, false, 'consumed');
    await flush();
    await flush();
    assert.strictEqual(spline.knots.length, 4);
    near(spline.knots[1].position.x, mid.x, 0.1);
});

test('Delete removes the selected knots, and the node delete that follows is blocked', async () => {
    reset();
    await click(knotScreen(0, 1).x, knotScreen(0, 1).y);
    const ev = domKey('Delete');
    assert.ok(ev.defaultPrevented && ev.stopped);
    // The same key also reaches the scene listeners (once only).
    key('Delete');
    await flush();
    await flush();
    assert.strictEqual(comp.splines[0].knots.length, 2);
    cce.SceneFacadeManager.removeNode({ uuid: node.uuid });
    assert.strictEqual(log.removed.length, 0, 'node not removed');
    S.deleteKeyAt = 0;
    cce.SceneFacadeManager.removeNode({ uuid: node.uuid });
    assert.strictEqual(log.removed.length, 1, 'later deletes go through');
});

test('C cycles the tangent mode, Escape clears then leaves', async () => {
    reset();
    await click(knotScreen(0, 1).x, knotScreen(0, 1).y);
    const before = comp.splines[0].knots[1].mode;
    key('c');
    await flush();
    await flush();
    assert.notStrictEqual(comp.splines[0].knots[1].mode, before);
    key('Escape');
    assert.strictEqual(S.selection.size, 0);
    assert.strictEqual(S.context, true);
    key('Escape');
    assert.strictEqual(S.context, false);
});

test('Ctrl+A selects all knots and keeps the editor from selecting all nodes', async () => {
    reset();
    S.context = true;
    domKey('a', { ctrlKey: true });
    key('a', { ctrlKey: true });
    cce.SceneFacadeManager.selectAllNodes();
    assert.strictEqual(S.selection.knots().length, 3);
    assert.strictEqual(log.selectAllNodes, 0);
});

test('Draw tool: clicks add knots on the ground, a drag pulls mirrored tangents, clicking the first knot closes', async () => {
    reset();
    comp.splines[0].knots.length = 0;
    comp.splines[0].markDirty();
    methods.spSetTool('draw');
    assert.strictEqual(S.tool, 'draw');
    await click(screen(0, 0, 0).x, screen(0, 0, 0).y);
    await drag(screen(4, 0, 0), screen(6, 0, 1));
    await click(screen(4, 0, 4).x, screen(4, 0, 4).y);
    const s = comp.splines[0];
    assert.strictEqual(s.knots.length, 3);
    near(s.knots[2].position.x, 4, 0.05);
    near(s.knots[2].position.z, 4, 0.05);
    near(s.knots[2].position.y, 0, 1e-6);
    assert.strictEqual(s.knots[1].mode, TangentMode.Mirrored);
    const out = s.knots[1].tangentOut;
    near(Math.hypot(out.x, out.y, out.z), Math.hypot(2, 1), 0.1);
    // Close by clicking the first knot.
    await click(screen(0, 0, 0).x, screen(0, 0, 0).y);
    await flush();
    assert.strictEqual(s.closed, true);
    assert.strictEqual(S.drawing, null);
    methods.spSetTool('select');
});

test('Draw tool: clicking a curve inserts, Enter finishes', async () => {
    reset();
    methods.spSetTool('draw');
    const mid = comp.splines[0].evaluatePosition(0.2);
    await click(screen(mid.x, mid.y, mid.z).x, screen(mid.x, mid.y, mid.z).y);
    await flush();
    assert.strictEqual(comp.splines[0].knots.length, 4);
    // A click on empty ground starts a new spline (the old one is not empty).
    await click(screen(-5, 0, 8).x, screen(-5, 0, 8).y);
    assert.strictEqual(comp.splines.length, 2);
    key('Enter');
    assert.strictEqual(S.drawing, null);
    key('Escape');
    assert.strictEqual(S.tool, 'select');
});

test('panel state describes the selection', async () => {
    reset();
    await click(knotScreen(0, 2).x, knotScreen(0, 2).y);
    const st = methods.spState();
    assert.strictEqual(st.context, true);
    assert.strictEqual(st.element.label, 'Knot 2');
    assert.deepStrictEqual(st.element.position, [10, 0, 5]);
    assert.strictEqual(st.targets[0].name, 'Path');
    assert.ok(log.broadcasts.some((b) => b.msg === 'splines:state'));
    JSON.stringify(st);
});

test('panel: set element fields, modes and actions with undo', async () => {
    reset();
    await click(knotScreen(0, 1).x, knotScreen(0, 1).y);
    await methods.spSetElement({ position: [null, 2, null] });
    near(comp.splines[0].knots[1].position.y, 2, 1e-9);
    await methods.spSetElement({ mode: TangentMode.Broken });
    assert.strictEqual(comp.splines[0].knots[1].mode, TangentMode.Broken);
    await methods.spSetElement({ tangentOut: 3 });
    const t = comp.splines[0].knots[1].tangentOut;
    near(Math.hypot(t.x, t.y, t.z), 3, 1e-6);
    await methods.spAction('split');
    assert.strictEqual(comp.splines.length, 2);
    await methods.spAction('selectAll');
    assert.strictEqual(S.selection.knots().length, 4);
    await methods.spAction('close', true);
    assert.ok(comp.splines.every((s) => s.closed));
});

test('Inspector: container info, knot edits and spline actions', async () => {
    reset();
    const info = methods.spContainerInfo(comp.uuid);
    assert.strictEqual(info.splines.length, 1);
    assert.strictEqual(info.splines[0].knots.length, 3);
    assert.ok(info.splines[0].length > 10);
    let res = await methods.spEditKnot(comp.uuid, 0, 0, { position: [1, null, null] });
    near(comp.splines[0].knots[0].position.x, 1, 1e-9);
    res = await methods.spSplineAction(comp.uuid, 0, 'addKnot');
    assert.strictEqual(res.splines[0].knots.length, 4);
    res = await methods.spSplineAction(comp.uuid, 0, 'closed', true);
    assert.strictEqual(res.splines[0].closed, true);
    res = await methods.spSplineAction(comp.uuid, 0, 'addSpline');
    assert.strictEqual(res.splines.length, 2);
    res = await methods.spSplineAction(comp.uuid, 1, 'removeSpline');
    assert.strictEqual(res.splines.length, 1);
    res = await methods.spSplineAction(comp.uuid, 0, 'selectKnot', { knot: 2 });
    assert.strictEqual(S.context, true);
    assert.ok(res.splines[0].knots[2].selected);
});

test('Node > Spline > Circle creates a selected spline node and enters the context', async () => {
    reset();
    selectNodes([]);
    tick();
    const uuid = await methods.spCreate('circle');
    const n = findNode(uuid)!;
    assert.ok(n, 'node created');
    const c = n.getComponent(SplineContainer)!;
    assert.strictEqual(c.splines[0].knots.length, 4);
    assert.strictEqual(c.splines[0].closed, true);
    assert.deepStrictEqual(cce.Selection.query(), [uuid]);
    tick();
    assert.strictEqual(S.context, true, 'context entered once selected');
    n.destroy();
    (SplineContainer as any).all.delete(c);
});

test('diagnostics are JSON', () => {
    const d = methods.spDiagnostics();
    JSON.stringify(d);
    assert.strictEqual(d.primary, true);
    assert.strictEqual(d.eventCoords, 'event');
});

(async () => {
    for (const t of tests) {
        try {
            await t.fn();
            results.passed++;
            console.log(`  ok   ${t.name}`);
        } catch (e) {
            results.failed++;
            console.log(`  FAIL ${t.name}\n       ${String((e as Error)?.stack || e).split('\n').slice(0, 6).join('\n       ')}`);
        }
    }
    console.log(`\n${results.passed} passed, ${results.failed} failed`);
    process.exitCode = results.failed ? 1 : 0;
})();
