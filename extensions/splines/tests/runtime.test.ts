/**
 * Runtime components with the engine stub: container evaluation in world
 * space, SplineAnimate, SplineExtrude and SplineInstantiate.
 */
import assert from 'assert';
import * as cc from './stubs/cc';
import { SplineContainer } from '../assets/runtime/SplineContainer';
import { TangentMode } from '../assets/runtime/BezierKnot';
import { SplineAnimate, SplineAnimateLoopMode, SplineAnimateEasing, SplineAnimateAlignment, AlignAxis, SplineAnimateMethod } from '../assets/runtime/SplineAnimate';
import { SplineExtrude, ExtrudeShape } from '../assets/runtime/SplineExtrude';
import { SplineInstantiate, InstantiableItem, InstantiateMethod } from '../assets/runtime/SplineInstantiate';
import { SplineUtility } from '../assets/runtime/SplineUtility';
import { PathIndexUnit } from '../assets/runtime/Spline';
import { test, results } from './harness';

const scene = new cc.Node('Scene');
(scene as any).isScene = true;
cc.director._scene = scene;

function near(a: number, b: number, eps = 1e-4, msg = '') {
    assert.ok(Math.abs(a - b) <= eps, `${msg} ${a} != ${b} (±${eps})`);
}

function line(len = 10): { node: cc.Node; c: SplineContainer } {
    const node = new cc.Node('Spline');
    node.setParent(scene);
    const c = node.addComponent(SplineContainer) as SplineContainer;
    c.spline.add(new cc.Vec3(0, 0, 0) as any, TangentMode.Linear);
    c.spline.add(new cc.Vec3(len, 0, 0) as any, TangentMode.Linear);
    return { node, c };
}

console.log('\ncontainer');

test('world evaluation follows the node transform', () => {
    const { node, c } = line(10);
    node.setPosition(1, 2, 3);
    node.rotation.set(0, Math.SQRT1_2, 0, Math.SQRT1_2); // 90 degrees around Y: +X -> -Z
    const p = c.evaluatePosition(0.5);
    near(p.x, 1);
    near(p.y, 2);
    near(p.z, 3 - 5);
    const d = c.evaluateDirection(0.5);
    near(d.z, -1);
    near(c.calculateLength(), 10);
});

test('world length uses the node scale', () => {
    const { node, c } = line(10);
    node.setScale(2, 2, 2);
    near(c.calculateLength(), 20);
    near(c.spline.getLength(), 10, 1e-6, 'local length');
});

test('nearest point in world space', () => {
    const { node, c } = line(10);
    node.setPosition(0, 0, 5);
    const r = c.getNearestPoint(new cc.Vec3(4, 3, 5) as any)!;
    near(r.position.x, 4, 1e-3);
    near(r.distance, 3, 1e-3);
    near(r.t, 0.4, 1e-3);
});

test('units conversion and shapes', () => {
    const { c } = line(10);
    near(c.spline.convertIndexUnit(0.5, PathIndexUnit.Normalized, PathIndexUnit.Distance), 5);
    near(c.spline.convertIndexUnit(2.5, PathIndexUnit.Distance, PathIndexUnit.Normalized), 0.25);
    const circle = SplineUtility.createShape('circle', { size: 2 });
    near(circle.getLength(), Math.PI * 4, 0.02);
});

test('CHANGED is emitted when a spline changes', () => {
    const { node, c } = line(10);
    let n = 0;
    node.on(SplineContainer.EventType.CHANGED, () => n++);
    c.checkChanged();
    const before = n;
    c.spline.setKnotPosition(1, new cc.Vec3(12, 0, 0) as any);
    c.checkChanged();
    assert.strictEqual(n, before + 1);
    c.checkChanged();
    assert.strictEqual(n, before + 1, 'no change, no event');
});

console.log('\nSplineAnimate');

function animated(opts: Partial<SplineAnimate> = {}) {
    const { c } = line(10);
    const mover = new cc.Node('Mover');
    mover.setParent(scene);
    const a = mover.addComponent(SplineAnimate) as SplineAnimate;
    a.container = c;
    Object.assign(a, opts);
    return { a, mover, c };
}

test('time mode: position along the spline after some seconds', () => {
    const { a, mover } = animated({ duration: 4, loopMode: SplineAnimateLoopMode.Loop });
    a.play();
    a.update(1);
    near(mover.worldPosition.x, 2.5, 1e-3);
    a.update(4);
    near(mover.worldPosition.x, 2.5, 1e-3, 'looped');
});

test('once mode stops at the end and reports completion', () => {
    const { a, mover } = animated({ duration: 2, loopMode: SplineAnimateLoopMode.Once });
    let done = 0;
    mover.on(SplineAnimate.EventType.COMPLETED, () => done++);
    a.play();
    a.update(1.5);
    a.update(1.5);
    near(mover.worldPosition.x, 10, 1e-3);
    assert.strictEqual(a.isPlaying, false);
    assert.strictEqual(done, 1);
});

test('ping-pong comes back', () => {
    const { a, mover } = animated({ duration: 2, loopMode: SplineAnimateLoopMode.PingPong });
    a.play();
    a.update(3);
    near(mover.worldPosition.x, 5, 1e-3);
});

test('speed mode converts the speed into a duration', () => {
    const { a, mover } = animated({ method: SplineAnimateMethod.Speed, maxSpeed: 5 });
    near(a.currentDuration(), 2);
    a.play();
    a.update(1);
    near(mover.worldPosition.x, 5, 1e-3);
});

test('ease in starts slow', () => {
    const { a, mover } = animated({ duration: 2, easing: SplineAnimateEasing.EaseIn, loopMode: SplineAnimateLoopMode.Once });
    a.play();
    a.update(1);
    near(mover.worldPosition.x, 2.5, 1e-3); // t = 0.5 -> 0.25
});

test('alignment: the forward axis points along the spline', () => {
    const { a, mover } = animated({ duration: 1, alignment: SplineAnimateAlignment.SplineElement, objectForwardAxis: AlignAxis.ZAxis, objectUpAxis: AlignAxis.YAxis });
    a.normalizedTime = 0.5;
    const fwd = cc.Vec3.transformQuat(new cc.Vec3(), new cc.Vec3(0, 0, 1), mover.worldRotation);
    near(fwd.x, 1, 1e-4);
    // 2D sprites: +X along the spline, +Z up.
    a.objectForwardAxis = AlignAxis.XAxis;
    a.objectUpAxis = AlignAxis.ZAxis;
    a.normalizedTime = 0.5;
    const x = cc.Vec3.transformQuat(new cc.Vec3(), new cc.Vec3(1, 0, 0), mover.worldRotation);
    near(x.x, 1, 1e-4);
});

test('editor preview moves the object and puts it back', () => {
    const { a, mover } = animated({ duration: 2 });
    mover.setWorldPosition(0, 7, 0);
    const r = a._previewSetTime(1);
    near(r.normalizedTime, 0.5, 1e-6);
    near(mover.worldPosition.x, 5, 1e-3);
    a._previewStop();
    near(mover.worldPosition.y, 7, 1e-6);
    near(mover.worldPosition.x, 0, 1e-6);
});

console.log('\nSplineExtrude');

test('circle tube: vertex count, outward normals and caps', () => {
    const { node, c } = line(10);
    const e = node.addComponent(SplineExtrude) as SplineExtrude;
    e.container = c;
    e.sides = 8;
    e.radius = 0.5;
    e.segmentsPerUnit = 1;
    e.capped = true;
    e.rebuild();
    const g = (e.mesh as any).geometry;
    const rings = 11;
    const ringVerts = 9;
    const caps = 2 * (1 + ringVerts);
    assert.strictEqual(g.positions.length / 3, rings * ringVerts + caps);
    // Side normals point away from the spline axis.
    for (let i = 0; i < rings * ringVerts; i++) {
        const y = g.positions[i * 3 + 1];
        const z = g.positions[i * 3 + 2];
        const ny = g.normals[i * 3 + 1];
        const nz = g.normals[i * 3 + 2];
        assert.ok(y * ny + z * nz > 0.2, `normal ${i}`);
    }
    // Triangle winding agrees with the normals (counter-clockwise front faces).
    for (let t = 0; t < g.indices.length; t += 3) {
        const [a, b, d] = [g.indices[t], g.indices[t + 1], g.indices[t + 2]];
        const p = (i: number) => new cc.Vec3(g.positions[i * 3], g.positions[i * 3 + 1], g.positions[i * 3 + 2]);
        const n = cc.Vec3.cross(new cc.Vec3(), cc.Vec3.subtract(new cc.Vec3(), p(b), p(a)), cc.Vec3.subtract(new cc.Vec3(), p(d), p(a)));
        if (n.lengthSqr() < 1e-12) continue;
        const vn = new cc.Vec3(g.normals[a * 3], g.normals[a * 3 + 1], g.normals[a * 3 + 2]);
        assert.ok(cc.Vec3.dot(n, vn) > 0, `triangle ${t / 3} faces its normal`);
    }
});

test('road shape faces up; flip normals reverses', () => {
    const { node, c } = line(4);
    const e = node.addComponent(SplineExtrude) as SplineExtrude;
    e.container = c;
    e.shape = ExtrudeShape.Road;
    e.rebuild();
    const g = (e.mesh as any).geometry;
    assert.ok(g.normals[1] > 0.99, 'road normal +Y');
    e.flipNormals = true;
    e.rebuild();
    assert.ok((e.mesh as any).geometry.normals[1] < -0.99);
});

test('rebuilds when the spline changes', () => {
    const { node, c } = line(4);
    const e = node.addComponent(SplineExtrude) as SplineExtrude;
    e.container = c;
    e.rebuild();
    const m1 = e.mesh;
    e.update();
    assert.strictEqual(e.mesh, m1, 'no change, no rebuild');
    c.spline.setKnotPosition(1, new cc.Vec3(8, 0, 0) as any);
    (cc.director as any).tick?.();
    e.update();
    assert.notStrictEqual(e.mesh, m1);
});

console.log('\nSplineInstantiate');

function instantiateOn(len: number, opts: Partial<SplineInstantiate> = {}) {
    const { node, c } = line(len);
    const si = node.addComponent(SplineInstantiate) as SplineInstantiate;
    const item = new InstantiableItem();
    item.prefab = new cc.Prefab(new cc.Node('Tree')) as any;
    si.items = [item];
    si.container = c;
    Object.assign(si, opts);
    si.updateInstances();
    return si;
}

test('spacing distance places instances every unit', () => {
    const si = instantiateOn(10, { method: InstantiateMethod.SpacingDistance, spacing: new cc.Vec2(1, 1) as any });
    assert.strictEqual(si.instances.length, 11);
    near(si.instances[3].worldPosition.x, 3, 1e-3);
});

test('instance count spreads evenly', () => {
    const si = instantiateOn(10, { method: InstantiateMethod.InstanceCount, count: new cc.Vec2(5, 5) as any });
    assert.strictEqual(si.instances.length, 5);
    near(si.instances[4].worldPosition.x, 10, 1e-3);
});

test('linear distance measures straight lines', () => {
    const si = instantiateOn(10, { method: InstantiateMethod.LinearDistance, spacing: new cc.Vec2(2.5, 2.5) as any });
    assert.strictEqual(si.instances.length, 5);
    near(si.instances[2].worldPosition.x, 5, 1e-2);
});

test('random offsets are repeatable with a seed', () => {
    const a = instantiateOn(10, { seed: 7 });
    a.positionOffset.max.set(0, 1, 0);
    a.positionOffset.randomY = true;
    a.updateInstances();
    const ys = a.instances.map((n) => n.worldPosition.y);
    assert.ok(ys.some((y) => y > 0.01), 'offset applied');
    a.updateInstances();
    assert.deepStrictEqual(a.instances.map((n) => n.worldPosition.y), ys);
    a.seed = 8;
    a.updateInstances();
    assert.notDeepStrictEqual(a.instances.map((n) => n.worldPosition.y), ys);
});

test('generated instances are not saved', () => {
    const si = instantiateOn(4);
    for (const n of si.instances) {
        let flagged = false;
        for (let p: any = n; p; p = p.parent) if (p._objFlags & cc.CCObject.Flags.DontSave) flagged = true;
        assert.ok(flagged);
    }
    const info = si._bakeInfo();
    assert.strictEqual(info.length, si.instances.length);
});

console.log(`\n${results.passed} passed, ${results.failed} failed`);
process.exitCode = results.failed ? 1 : 0;
