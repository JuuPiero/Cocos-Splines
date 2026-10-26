# Splines for Cocos Creator 3.8

Unity-style Bezier splines: draw and edit them in the Scene view, move objects along them, extrude meshes and place prefabs. It follows Unity's Splines package (2.x): the same tangent modes, edit context, Draw tool, components and scripting API.

| Unity | Here |
|---|---|
| `SplineContainer`, `Spline`, `BezierKnot`, `TangentMode` | same names |
| Spline tool context, Draw Splines tool | **Edit Spline** / **Draw** (Scene view, panel, Inspector) |
| Spline Inspector overlay (Element Inspector) | **Panel → Splines** |
| `SplineAnimate`, `SplineExtrude`, `SplineInstantiate` | same names |
| `SplineUtility`, `SplineFactory` | `SplineUtility` (incl. `createShape`) |
| GameObject → Spline → Square, Circle… | **Node → Spline → …** |

## Quick start

1. **Node → Spline → Draw Splines Tool...** creates a node with a `SplineContainer` and starts the Draw tool. Click in the Scene view to add knots; click and drag to pull tangents. Click the first knot to close the spline, press **Enter** to finish it, **Esc** to leave the tool.
2. Or **Node → Spline → Line / Square / Rounded Square / Circle / Polygon / Star / Helix** for a ready-made shape, sized to the view.
3. Open **Panel → Splines** for the tools and the Element Inspector.

In a 2D scene view, splines are drawn in the XY plane (put the node under a Canvas to work in UI units). In 3D they are drawn on the ground (XZ plane of the node), or on scene geometry under the mouse.

## Editing in the Scene view

Splines of the selected nodes show their curve and knots. **Click a knot** (or **Edit Spline**) to enter the edit context, like Unity's spline tool context:

| Action | Result |
|---|---|
| Click knot / tangent | Select it |
| Shift / Ctrl + click | Add to / remove from the selection |
| Drag knot / tangent | Move it in the view plane (Ctrl: snap) |
| Drag on empty space | Select knots in a rectangle (Shift: add) |
| Click on empty space | Clear the knot selection; a second click selects objects as usual |
| **W / E / R** (Cocos tools) | Move / rotate / scale handles for the selected knots |
| Double-click a curve | Insert a knot (the shape does not change) |
| **Delete** / Backspace | Delete the selected knots (the node is not deleted) |
| **C** | Cycle the tangent mode of the selected knots |
| **X** | Cycle the handle orientation: Global → Local → Element |
| **Ctrl + A** | Select all knots |
| **Esc** | Clear the selection, then leave the context |

The handles use the Cocos toolbar's pivot setting (Pivot = last selected knot, Center = middle of the selection) and its snap settings (Ctrl inverts snapping, as in Unity). Linked knots move together.

Tangent handles are shown for the selected knots and the curves next to them (**Display → All tangents** shows every one). Dragging a tangent of an Auto Smooth knot turns it into a Continuous knot.

### Draw tool

| Action | Result |
|---|---|
| Click | Add a knot (default type: Auto Smooth or Linear, in the panel) |
| Click + drag | Add a Bezier knot with mirrored tangents |
| Click the first knot | Close the spline |
| Click an end knot of an open spline | Continue drawing from that end |
| Click a curve | Insert a knot |
| Enter | Finish the spline (the next click starts a new one in the same container) |
| Esc | Finish / leave the tool |
| Shift + S | Next container (when several are selected) |

### Tangent modes

| Mode | Behavior |
|---|---|
| **Auto Smooth** | Tangents follow the neighbor knots (Catmull-Rom; *Tension* 0 uniform, 0.5 centripetal, 1 chordal) |
| **Linear** | No tangents: straight segments |
| **Mirrored** | Opposite tangents of equal length |
| **Continuous** | Opposite tangents, lengths independent |
| **Broken** | Tangents independent |

## Splines panel

**Panel → Splines**:
- **Edit Spline / Draw** toggles and the handle orientation.
- **Element Inspector** for the selected knots: position and rotation (container space), tangent mode (Linear / Auto / Bezier: Mirrored, Continuous, Broken), tension, tangent lengths. Several knots: fields that differ are dimmed; editing one sets it on all.
- **Actions**: Link, Unlink, Split (split the spline at a knot), Join (join two end knots), Reverse (direction of travel), Close / Open, Select All, Delete.
- **Create Spline** shapes, **Display** options (all splines, flow direction, all tangents, knot indices, up vectors), and a list of shortcuts.

## Inspector

- **SplineContainer**: Edit Spline / Draw Spline buttons, each spline with its knots (position, tangent mode; ▾ for rotation, tension and tangent lengths), Closed, Reverse, Remove, + Knot, + Add Spline. Click a knot's index to select it in the Scene view.
- **SplineAnimate**: Preview: play / pause, scrub the time; Reset puts the object back.
- **SplineExtrude**: Rebuild Mesh.
- **SplineInstantiate**: Regenerate, Randomize (seed), Clear, Bake Instances.

All edits support undo.

## Components

### SplineContainer
Holds the splines in the node's local space. `t` is a normalized distance along a spline: 0 = start, 0.5 = halfway along its length, 1 = end.

### SplineAnimate
Moves its node along a spline.
- **Method**: Time (`duration`) or Speed (`maxSpeed`, units per second).
- **Loop Mode**: Once, Loop, Loop Ease In Once, Ping Pong. **Easing**: None, Ease In, Ease Out, Ease In Out.
- **Alignment**: None, Spline Element (along the spline, its up vector), Spline Object (the container's rotation), World. **Object Forward / Up Axis**: which axes of the object face along the spline and up. For 2D sprites use Forward = X, Up = Z.
- **Start Offset**, **Play On Awake**, **Completed Events**.
- Node events `spline-animate-updated` (position, rotation) and `spline-animate-completed`.

### SplineExtrude
Builds a mesh along all splines of a container: shape Circle (sides), Square, Road (flat strip) or Spline (the first spline of another container, read in its XY plane as the cross-section); radius, segments per unit, range, caps, flip normals, shadows, optional MeshCollider. Assign a **Material** (without one, a default material is used in the editor only). The mesh is generated on a hidden child node, is not saved with the scene, and is rebuilt when the spline changes (at runtime up to *Rebuild Frequency* times per second).

### SplineInstantiate
Places prefabs along all splines of a container:
- **Items** with a probability.
- **Method**: Instance Count (min–max), Spacing Distance (along the spline), Linear Distance (straight line).
- **Space**: Spline, Spline Object, World. **Up / Forward axes**.
- Position / rotation / scale offsets with min–max per axis, randomized per axis, in Spline / Spline Object / World / Object space.
- **Seed**, **Auto Refresh**.

Instances are generated and not saved with the scene, as in Unity. **Bake Instances** creates regular prefab instances under a new node and disables the component.

## Scripting

```ts
import { _decorator, Component, Vec3 } from 'cc';
import { SplineContainer, SplineUtility, TangentMode, PathIndexUnit } from 'db://splines/index';
const { ccclass, property } = _decorator;

@ccclass('Follower')
export class Follower extends Component {
    @property(SplineContainer) path: SplineContainer | null = null;
    @property speed = 3;
    private distance = 0;

    update(dt: number) {
        const c = this.path!;
        this.distance += this.speed * dt;
        const t = (this.distance / c.calculateLength()) % 1;
        this.node.worldPosition = c.evaluatePosition(t);          // world space
        this.node.worldRotation = c.evaluateRotation(t);          // +Z along the spline, +Y up
    }
}

// Build a spline in code (local space of the container).
const s = container.spline;
s.add(new Vec3(0, 0, 0));
s.add(new Vec3(5, 0, 2), TangentMode.Linear);
s.setTangentMode(0, TangentMode.Mirrored);
s.closed = false;
s.markDirty();                                                     // after changing knot fields directly

container.splines.push(SplineUtility.createShape('circle', { size: 3 }));
container.notifyChanged();
```

Main API:
- **SplineContainer** (world space): `evaluatePosition(t, splineIndex?)`, `evaluateTangent`, `evaluateDirection`, `evaluateUpVector`, `evaluate` (all three), `evaluateRotation`, `calculateLength`, `getNearestPoint(worldPoint)`, `getNearestPointAll`, `convertIndexUnit`, `getKnotWorldPosition`, `addSpline`, `removeSplineAt`, `insertKnot`, `removeKnots`, `reverseFlow`, `setKnotPosition` (moves linked knots too), `linkKnots`, `unlinkKnots`, `getLinkedKnots`, `splitKnot`, `joinKnots`, `notifyChanged`. Emits `SplineContainer.EventType.CHANGED` on its node.
- **Spline** (local space): `knots`, `closed`, `add`, `insert`, `removeAt`, `setKnot`, `setKnotPosition`, `setTangentMode`, `setAutoSmoothTension`, `insertOnCurve`, `setClosed`, `reverse`, `getLength`, `getCurveLength`, `getCurve`, `evaluatePosition`, `evaluateTangent`, `evaluateDirection`, `evaluateUpVector`, `getNearestPoint`, `getTAtDistance`, `convertIndexUnit` (`PathIndexUnit.Normalized / Distance / Knot`), `knotT`, `markDirty`.
- **SplineUtility**: the same evaluations as static functions, `getPointAtDistance`, `createShape(shape, options)` / `setShape` (line, square, rounded-square, circle, polygon, star, helix; `plane2D: true` for XY).
- **BezierKnot**: `position`, `rotation`, `tangentIn`, `tangentOut` (knot space: +Z is the direction of travel, +Y is up), `mode`, `tension`.

Up vectors come from the knot rotations and are carried along the curves without twisting (rotation minimizing frames), turning evenly where knots are rolled.

## How it works

- The runtime (`assets/`) is mounted into the project as `db://splines` and builds with the game. The spline math (`assets/core`) has no engine dependency.
- The extension's scene script draws into the Scene view camera's `GeometryRenderer` and listens to the Scene view's mouse and keyboard through the editor's operation manager, just above the editor's own gizmos and camera. Presses on knots, tangents and handles never reach the editor; everything else does.
- Edits are wrapped in the editor's `begin-recording` / `end-recording`, so each click or drag is one undo step, and the Inspector refreshes.
- The Delete and Ctrl+A shortcuts act on the knots while you edit them, not on the node.
- Play-in-Editor's scene shows splines but does not edit them (changes there are lost anyway).

Not in this version: per-knot data (Unity's `SplineData`), copy / paste of knots, the Scene view context menu.

**Extension → Splines → Save Diagnostics** writes `diagnostics.json` into the extension folder (what the scene script sees) for troubleshooting.

## Development

```bash
npm install
npm run build      # type-check + bundle to dist/ (Vue is bundled in)
npm test           # spline math, runtime components and the scene script against a fake editor
npm run preview    # tests/preview/out/preview.html: the panel and the Inspector with fake data
```

After a build, reload `splines` in **Extension → Extension Manager**.
