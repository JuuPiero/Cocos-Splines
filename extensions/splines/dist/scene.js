"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// source/scene/index.ts
var scene_exports = {};
__export(scene_exports, {
  load: () => load,
  methods: () => methods,
  unload: () => unload
});
module.exports = __toCommonJS(scene_exports);

// source/scene/env.ts
var import_path = require("path");
module.paths.push((0, import_path.join)(Editor.App.path, "node_modules"));
var ccModule = null;
function cc() {
  return ccModule || (ccModule = require("cc")), ccModule;
}
var cce = () => globalThis.cce || {}, editorExtends = () => globalThis.EditorExtends;
function classByName(name) {
  try {
    return cc().js.getClassByName(name) || null;
  } catch {
    return null;
  }
}
var containerClass = () => classByName("SplineContainer"), factory = {
  knot: () => new (classByName("splines.BezierKnot"))(),
  spline: () => new (classByName("splines.Spline"))(),
  link: () => new (classByName("splines.KnotLink"))()
};
function runtimeReady() {
  return !!containerClass() && !!classByName("splines.BezierKnot");
}
function currentScene() {
  try {
    return cc().director.getScene();
  } catch {
    return null;
  }
}
function findNode(uuid) {
  var _a2, _b2;
  if (!uuid) return null;
  let ext = editorExtends();
  try {
    let n = (_b2 = (_a2 = ext == null ? void 0 : ext.Node) == null ? void 0 : _a2.getNode) == null ? void 0 : _b2.call(_a2, uuid);
    if (n) return n;
  } catch {
  }
  let scene = currentScene();
  if (!scene) return null;
  let found = null, walk = (n) => {
    if (!found) {
      if (n.uuid === uuid) {
        found = n;
        return;
      }
      for (let c2 of n.children) walk(c2);
    }
  };
  return walk(scene), found;
}
function findComponent(uuid) {
  var _a2, _b2;
  let ext = editorExtends();
  try {
    let c2 = (_b2 = (_a2 = ext == null ? void 0 : ext.Component) == null ? void 0 : _a2.getComponent) == null ? void 0 : _b2.call(_a2, uuid);
    if (c2) return c2;
  } catch {
  }
  for (let comp of allContainers()) if (comp.uuid === uuid) return comp;
  let scene = currentScene();
  if (!scene) return null;
  let found = null, walk = (n) => {
    if (!found) {
      for (let c2 of n.components)
        if (c2.uuid === uuid) {
          found = c2;
          return;
        }
      for (let c2 of n.children) walk(c2);
    }
  };
  return walk(scene), found;
}
function allContainers() {
  let C = containerClass();
  if (!C || !C.all) return [];
  let scene = currentScene(), res = [];
  for (let c2 of C.all)
    c2 && c2.isValid && c2.node && c2.node.isValid && c2.node.scene === scene && res.push(c2);
  return res;
}
function repaint() {
  var _a2, _b2;
  try {
    (_b2 = (_a2 = cce().Engine) == null ? void 0 : _a2.repaintInEditMode) == null || _b2.call(_a2);
  } catch {
  }
}
function notifyNodeChanged(node) {
  var _a2, _b2, _c;
  if (!(!node || !node.isValid))
    try {
      (_c = (_b2 = (_a2 = editorExtends()) == null ? void 0 : _a2.Node) == null ? void 0 : _b2.emit) == null || _c.call(_b2, "change", node.uuid, node);
    } catch {
    }
}
function selectedNodeUuids() {
  var _a2, _b2;
  try {
    let ids = (_b2 = (_a2 = cce().Selection) == null ? void 0 : _a2.query) == null ? void 0 : _b2.call(_a2);
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}
function is2DView() {
  var _a2;
  try {
    let c2 = cce().Camera;
    return typeof (c2 == null ? void 0 : c2.is2D) == "boolean" ? c2.is2D : !!((_a2 = cce().Gizmo) != null && _a2.is2D);
  } catch {
    return !1;
  }
}
function transformToolName() {
  var _a2;
  try {
    return ((_a2 = cce().Gizmo) == null ? void 0 : _a2.transformToolName) || "position";
  } catch {
    return "position";
  }
}
function pivotMode() {
  var _a2;
  try {
    return ((_a2 = cce().Gizmo) == null ? void 0 : _a2.pivot) === "pivot" ? "pivot" : "center";
  } catch {
    return "center";
  }
}
function snapConfig() {
  var _a2, _b2;
  let fallback = {
    position: { x: 1, y: 1, z: 1 },
    rotation: 15,
    scale: 0.1,
    isPositionSnapEnabled: !1,
    isRotationSnapEnabled: !1,
    isScaleSnapEnabled: !1
  };
  try {
    let c2 = (_b2 = (_a2 = cce().Gizmo) == null ? void 0 : _a2.queryTransformSnapConfigs) == null ? void 0 : _b2.call(_a2);
    return c2 ? { ...fallback, ...c2 } : fallback;
  } catch {
    return fallback;
  }
}

// assets/core/math.ts
function v3(x = 0, y = 0, z = 0) {
  return { x, y, z };
}
function q4(x = 0, y = 0, z = 0, w = 1) {
  return { x, y, z, w };
}
function set(out, x, y, z) {
  return out.x = x, out.y = y, out.z = z, out;
}
function copy(out, a) {
  return out.x = a.x, out.y = a.y, out.z = a.z, out;
}
function add(out, a, b) {
  return out.x = a.x + b.x, out.y = a.y + b.y, out.z = a.z + b.z, out;
}
function sub(out, a, b) {
  return out.x = a.x - b.x, out.y = a.y - b.y, out.z = a.z - b.z, out;
}
function scale(out, a, s) {
  return out.x = a.x * s, out.y = a.y * s, out.z = a.z * s, out;
}
function scaleAndAdd(out, a, b, s) {
  return out.x = a.x + b.x * s, out.y = a.y + b.y * s, out.z = a.z + b.z * s, out;
}
function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
function cross(out, a, b) {
  let x = a.y * b.z - a.z * b.y, y = a.z * b.x - a.x * b.z, z = a.x * b.y - a.y * b.x;
  return out.x = x, out.y = y, out.z = z, out;
}
function lenSq(a) {
  return a.x * a.x + a.y * a.y + a.z * a.z;
}
function len(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
}
function distSq(a, b) {
  let x = a.x - b.x, y = a.y - b.y, z = a.z - b.z;
  return x * x + y * y + z * z;
}
function dist(a, b) {
  return Math.sqrt(distSq(a, b));
}
function normalize(out, a) {
  let l = len(a);
  return l < 1e-6 ? set(out, 0, 0, 0) : scale(out, a, 1 / l);
}
function lerp(out, a, b, t) {
  return out.x = a.x + (b.x - a.x) * t, out.y = a.y + (b.y - a.y) * t, out.z = a.z + (b.z - a.z) * t, out;
}
function anyPerpendicular(out, a) {
  let ax = Math.abs(a.x), ay = Math.abs(a.y), az = Math.abs(a.z);
  return ax <= ay && ax <= az ? cross(out, a, { x: 1, y: 0, z: 0 }) : ay <= az ? cross(out, a, { x: 0, y: 1, z: 0 }) : cross(out, a, { x: 0, y: 0, z: 1 }), normalize(out, out);
}
function projectOnPlane(out, v, n) {
  let d = dot(v, n);
  return scaleAndAdd(out, v, n, -d);
}
function qSet(out, x, y, z, w) {
  return out.x = x, out.y = y, out.z = z, out.w = w, out;
}
function qCopy(out, a) {
  return qSet(out, a.x, a.y, a.z, a.w);
}
function qIdentity(out) {
  return qSet(out, 0, 0, 0, 1);
}
function qMul(out, a, b) {
  let x = a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y, y = a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x, z = a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w, w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
  return qSet(out, x, y, z, w);
}
function qNormalize(out, a) {
  let l = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);
  return l < 1e-6 ? qIdentity(out) : qSet(out, a.x / l, a.y / l, a.z / l, a.w / l);
}
function qInvert(out, a) {
  let l = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
  return l < 1e-6 ? qIdentity(out) : qSet(out, -a.x / l, -a.y / l, -a.z / l, a.w / l);
}
function qRotate(out, q, v) {
  let tx = 2 * (q.y * v.z - q.z * v.y), ty = 2 * (q.z * v.x - q.x * v.z), tz = 2 * (q.x * v.y - q.y * v.x), x = v.x + q.w * tx + (q.y * tz - q.z * ty), y = v.y + q.w * ty + (q.z * tx - q.x * tz), z = v.z + q.w * tz + (q.x * ty - q.y * tx);
  return set(out, x, y, z);
}
function qFromAxisAngle(out, axis, rad) {
  let n = normalize(v3(), axis), s = Math.sin(rad / 2);
  return qSet(out, n.x * s, n.y * s, n.z * s, Math.cos(rad / 2));
}
function qFromAxes(out, x, y, z) {
  let m00 = x.x, m01 = y.x, m02 = z.x, m10 = x.y, m11 = y.y, m12 = z.y, m20 = x.z, m21 = y.z, m22 = z.z, trace = m00 + m11 + m22;
  if (trace > 0) {
    let s2 = 0.5 / Math.sqrt(trace + 1);
    return qNormalize(out, qSet(out, (m21 - m12) * s2, (m02 - m20) * s2, (m10 - m01) * s2, 0.25 / s2));
  }
  if (m00 > m11 && m00 > m22) {
    let s2 = 2 * Math.sqrt(1 + m00 - m11 - m22);
    return qNormalize(out, qSet(out, 0.25 * s2, (m01 + m10) / s2, (m02 + m20) / s2, (m21 - m12) / s2));
  }
  if (m11 > m22) {
    let s2 = 2 * Math.sqrt(1 + m11 - m00 - m22);
    return qNormalize(out, qSet(out, (m01 + m10) / s2, 0.25 * s2, (m12 + m21) / s2, (m02 - m20) / s2));
  }
  let s = 2 * Math.sqrt(1 + m22 - m00 - m11);
  return qNormalize(out, qSet(out, (m02 + m20) / s, (m12 + m21) / s, 0.25 * s, (m10 - m01) / s));
}
function qLookRotation(out, forward, up) {
  let z = normalize(v3(), forward);
  if (lenSq(z) < 1e-6) return qIdentity(out);
  let x = cross(v3(), up, z);
  lenSq(x) < 1e-6 && anyPerpendicular(x, z), normalize(x, x);
  let y = cross(v3(), z, x);
  return qFromAxes(out, x, y, z);
}
function qToEuler(out, q) {
  let { x, y, z, w } = q, bank = 0, heading = 0, attitude = 0, test = x * y + z * w;
  if (test > 0.499999)
    bank = 0, heading = 2 * Math.atan2(x, w) * 180 / Math.PI, attitude = 90;
  else if (test < -0.499999)
    bank = 0, heading = -2 * Math.atan2(x, w) * 180 / Math.PI, attitude = -90;
  else {
    let sqx = x * x, sqy = y * y, sqz = z * z;
    bank = Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz) * 180 / Math.PI, heading = Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz) * 180 / Math.PI, attitude = Math.asin(2 * test) * 180 / Math.PI;
  }
  return set(out, bank, heading, attitude);
}
function qFromEuler(out, ex, ey, ez) {
  let halfToRad = 0.5 * Math.PI / 180, x = ex * halfToRad, y = ey * halfToRad, z = ez * halfToRad, sx = Math.sin(x), cx = Math.cos(x), sy = Math.sin(y), cy = Math.cos(y), sz = Math.sin(z), cz = Math.cos(z);
  return qSet(
    out,
    sx * cy * cz + cx * sy * sz,
    cx * sy * cz + sx * cy * sz,
    cx * cy * sz - sx * sy * cz,
    cx * cy * cz - sx * sy * sz
  );
}
function m4TransformPoint(out, m, p) {
  let { x, y, z } = p, w = m.m03 * x + m.m07 * y + m.m11 * z + m.m15;
  return w = w ? 1 / w : 1, set(
    out,
    (m.m00 * x + m.m04 * y + m.m08 * z + m.m12) * w,
    (m.m01 * x + m.m05 * y + m.m09 * z + m.m13) * w,
    (m.m02 * x + m.m06 * y + m.m10 * z + m.m14) * w
  );
}
function m4TransformDir(out, m, d) {
  let { x, y, z } = d;
  return set(out, m.m00 * x + m.m04 * y + m.m08 * z, m.m01 * x + m.m05 * y + m.m09 * z, m.m02 * x + m.m06 * y + m.m10 * z);
}
function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
function wrap(v, n) {
  return (v % n + n) % n;
}

// assets/core/curve.ts
function curve() {
  return { p0: v3(), p1: v3(), p2: v3(), p3: v3() };
}
function evalPosition(out, c2, t) {
  let u = 1 - t, a = u * u * u, b = 3 * u * u * t, d = 3 * u * t * t, e = t * t * t;
  return set(
    out,
    a * c2.p0.x + b * c2.p1.x + d * c2.p2.x + e * c2.p3.x,
    a * c2.p0.y + b * c2.p1.y + d * c2.p2.y + e * c2.p3.y,
    a * c2.p0.z + b * c2.p1.z + d * c2.p2.z + e * c2.p3.z
  );
}
function evalDerivative(out, c2, t) {
  let u = 1 - t, a = 3 * u * u, b = 6 * u * t, d = 3 * t * t;
  return set(
    out,
    a * (c2.p1.x - c2.p0.x) + b * (c2.p2.x - c2.p1.x) + d * (c2.p3.x - c2.p2.x),
    a * (c2.p1.y - c2.p0.y) + b * (c2.p2.y - c2.p1.y) + d * (c2.p3.y - c2.p2.y),
    a * (c2.p1.z - c2.p0.z) + b * (c2.p2.z - c2.p1.z) + d * (c2.p3.z - c2.p2.z)
  );
}
function evalAcceleration(out, c2, t) {
  let u = 1 - t;
  return set(
    out,
    6 * u * (c2.p2.x - 2 * c2.p1.x + c2.p0.x) + 6 * t * (c2.p3.x - 2 * c2.p2.x + c2.p1.x),
    6 * u * (c2.p2.y - 2 * c2.p1.y + c2.p0.y) + 6 * t * (c2.p3.y - 2 * c2.p2.y + c2.p1.y),
    6 * u * (c2.p2.z - 2 * c2.p1.z + c2.p0.z) + 6 * t * (c2.p3.z - 2 * c2.p2.z + c2.p1.z)
  );
}
var _d = v3();
function evalDirection(out, c2, t) {
  return evalDerivative(_d, c2, t), lenSq(_d) > 1e-6 * 1e-6 ? normalize(out, _d) : (evalAcceleration(_d, c2, t), lenSq(_d) > 1e-6 * 1e-6 ? (t > 0.5 && scale(_d, _d, -1), normalize(out, _d)) : (sub(_d, c2.p3, c2.p0), normalize(out, _d)));
}
function split(c2, t, left, right) {
  let p01 = lerp(v3(), c2.p0, c2.p1, t), p12 = lerp(v3(), c2.p1, c2.p2, t), p23 = lerp(v3(), c2.p2, c2.p3, t), p012 = lerp(v3(), p01, p12, t), p123 = lerp(v3(), p12, p23, t), mid = lerp(v3(), p012, p123, t), p0 = copy(v3(), c2.p0), p3 = copy(v3(), c2.p3);
  copy(left.p0, p0), copy(left.p1, p01), copy(left.p2, p012), copy(left.p3, mid), copy(right.p0, mid), copy(right.p1, p123), copy(right.p2, p23), copy(right.p3, p3);
}

// assets/core/spline-core.ts
var DEFAULT_TENSION = 0.5, UP = { x: 0, y: 1, z: 0 };
function prevIndex(i, count, closed) {
  return closed ? wrap(i - 1, count) : Math.max(i - 1, 0);
}
function nextIndex(i, count, closed) {
  return closed ? wrap(i + 1, count) : Math.min(i + 1, count - 1);
}
function curveCount(s) {
  let n = s.knots.length;
  return n < 2 ? 0 : s.closed ? n : n - 1;
}
function tangentsEditable(mode) {
  return mode === 2 /* Mirrored */ || mode === 3 /* Continuous */ || mode === 4 /* Broken */;
}
function copyKnot(out, k) {
  return copy(out.position, k.position), copy(out.tangentIn, k.tangentIn), copy(out.tangentOut, k.tangentOut), qCopy(out.rotation, k.rotation), out.mode = k.mode, out.tension = k.tension, out;
}
function knotUp(out, k) {
  return qRotate(out, k.rotation, UP);
}
function tangentOutVec(out, k) {
  return qRotate(out, k.rotation, k.tangentOut);
}
function tangentInVec(out, k) {
  return qRotate(out, k.rotation, k.tangentIn);
}
function knotRotation(out, tangent, normal) {
  let t = normalize(v3(), tangent), n = normalize(v3(), normal);
  if (lenSq(n) < 1e-6 && (n = copy(v3(), UP)), lenSq(t) < 1e-6) {
    let f = anyPerpendicular(v3(), n);
    return qLookRotation(out, f, n);
  }
  if (Math.abs(dot(t, n)) > 1 - 1e-5) {
    let up2 = cross(v3(), t, { x: 1, y: 0, z: 0 });
    return lenSq(up2) < 1e-6 && cross(up2, t, { x: 0, y: 0, z: 1 }), qLookRotation(out, t, normalize(up2, up2));
  }
  let up = normalize(v3(), projectOnPlane(v3(), n, t));
  return qLookRotation(out, t, up);
}
function autoSmoothTangent(out, prev, cur, next, tension) {
  let d1 = dist(cur, prev), d2 = dist(next, cur);
  if (d1 < 1e-6 && d2 < 1e-6) return set(out, 0, 0, 0);
  if (d1 < 1e-6) return scale(out, sub(out, next, cur), 0.1);
  if (d2 < 1e-6) return scale(out, sub(out, cur, prev), 0.1);
  let a = tension, d1a = Math.pow(d1, a), d2a = Math.pow(d2, a), d1a2 = d1a * d1a, d2a2 = d2a * d2a, k = 1 / (3 * d1a * (d1a + d2a));
  return set(
    out,
    (d1a2 * next.x - d2a2 * prev.x + (d2a2 - d1a2) * cur.x) * k,
    (d1a2 * next.y - d2a2 * prev.y + (d2a2 - d1a2) * cur.y) * k,
    (d1a2 * next.z - d2a2 * prev.z + (d2a2 - d1a2) * cur.z) * k
  );
}
function applyTangentMode(s, i) {
  let n = s.knots.length;
  if (i < 0 || i >= n) return;
  let k = s.knots[i];
  switch (k.mode) {
    case 1 /* Linear */:
      set(k.tangentIn, 0, 0, 0), set(k.tangentOut, 0, 0, 0);
      break;
    case 0 /* AutoSmooth */: {
      let prev = s.knots[prevIndex(i, n, s.closed)].position, next = s.knots[nextIndex(i, n, s.closed)].position, up = knotUp(v3(), k), tin = autoSmoothTangent(v3(), next, k.position, prev, k.tension), tout = autoSmoothTangent(v3(), prev, k.position, next, k.tension), lin = len(tin), lout = len(tout), dir = tout;
      lin < 1e-6 && (lin = lout), lout < 1e-6 && (lout = lin, dir = scale(v3(), tin, -1)), lenSq(dir) > 1e-6 && knotRotation(k.rotation, dir, up), set(k.tangentIn, 0, 0, -lin), set(k.tangentOut, 0, 0, lout);
      break;
    }
    case 2 /* Mirrored */:
    case 3 /* Continuous */:
      bakeTangentDirection(k, k.mode === 2 /* Mirrored */, !0);
      break;
    default:
      break;
  }
}
function bakeTangentDirection(k, mirrored, outIsMain) {
  let tout = tangentOutVec(v3(), k), tin = tangentInVec(v3(), k), main = outIsMain ? tout : scale(v3(), tin, -1), other = outIsMain ? scale(v3(), tin, -1) : tout, dir = lenSq(main) > 1e-6 ? main : other, up = knotUp(v3(), k);
  lenSq(dir) > 1e-6 && knotRotation(k.rotation, dir, up);
  let lmain = len(main), lother = len(other);
  if (mirrored) {
    let l = lmain > 1e-6 ? lmain : lother;
    set(k.tangentOut, 0, 0, l), set(k.tangentIn, 0, 0, -l);
  } else outIsMain ? (set(k.tangentOut, 0, 0, lmain), set(k.tangentIn, 0, 0, -lother)) : (set(k.tangentIn, 0, 0, -lmain), set(k.tangentOut, 0, 0, lother));
}
function refreshAround(s, i) {
  let n = s.knots.length;
  if (!n) return;
  let p = prevIndex(i, n, s.closed), q = nextIndex(i, n, s.closed);
  p !== i && s.knots[p].mode === 0 /* AutoSmooth */ && applyTangentMode(s, p), applyTangentMode(s, i), q !== i && q !== p && s.knots[q].mode === 0 /* AutoSmooth */ && applyTangentMode(s, q);
}
function refreshAll(s) {
  for (let i = 0; i < s.knots.length; i++) applyTangentMode(s, i);
}
function setKnotPosition(s, i, p) {
  copy(s.knots[i].position, p), refreshAround(s, i);
}
function setTangentVec(s, i, which, v) {
  let k = s.knots[i];
  if (tangentsEditable(k.mode) || (k.mode === 1 /* Linear */ && makeExplicitLinearTangents(s, i), k.mode = 3 /* Continuous */), k.mode === 4 /* Broken */) {
    let local = qRotate(v3(), qInvert(q4(), k.rotation), v);
    copy(which === "in" ? k.tangentIn : k.tangentOut, local);
    return;
  }
  let l = len(v), dir = which === "out" ? copy(v3(), v) : scale(v3(), v, -1);
  l > 1e-6 && knotRotation(k.rotation, dir, knotUp(v3(), k));
  let mirrored = k.mode === 2 /* Mirrored */;
  if (which === "out") {
    let lin = mirrored ? l : len(k.tangentIn);
    set(k.tangentOut, 0, 0, l), set(k.tangentIn, 0, 0, -lin);
  } else {
    let lout = mirrored ? l : len(k.tangentOut);
    set(k.tangentIn, 0, 0, -l), set(k.tangentOut, 0, 0, lout);
  }
}
function makeExplicitLinearTangents(s, i) {
  let n = s.knots.length, k = s.knots[i], inv = qInvert(q4(), k.rotation), prev = s.knots[prevIndex(i, n, s.closed)].position, next = s.knots[nextIndex(i, n, s.closed)].position;
  qRotate(k.tangentIn, inv, scale(v3(), sub(v3(), prev, k.position), 1 / 3)), qRotate(k.tangentOut, inv, scale(v3(), sub(v3(), next, k.position), 1 / 3));
}
function setTangentMode(s, i, mode) {
  let k = s.knots[i];
  if (k.mode === mode) {
    applyTangentMode(s, i);
    return;
  }
  k.mode === 1 /* Linear */ && tangentsEditable(mode) && makeExplicitLinearTangents(s, i), k.mode = mode, applyTangentMode(s, i);
}
function setTension(s, i, tension) {
  s.knots[i].tension = tension, applyTangentMode(s, i);
}
function setRotation(s, i, r) {
  qNormalize(s.knots[i].rotation, r), applyTangentMode(s, i);
}
function getCurve(s, i, out = curve()) {
  let n = s.knots.length, a = s.knots[i], b = s.knots[(i + 1) % n];
  return copy(out.p0, a.position), add(out.p1, a.position, tangentOutVec(out.p1, a)), add(out.p2, b.position, tangentInVec(out.p2, b)), copy(out.p3, b.position), out;
}
var UP_SAMPLES = 16;
var _hashBuf = new Float64Array(1), _hashInt = new Int32Array(_hashBuf.buffer);
var _dv = v3();
function curveUp(s, cache2, index, t, out) {
  let table = cache2.ups[index];
  table || (table = cache2.ups[index] = buildUpTable(s, cache2.curves[index], index));
  let x = clamp01(t) * UP_SAMPLES, i = Math.min(Math.floor(x), UP_SAMPLES - 1), f = x - i, a = v3(table[i * 3], table[i * 3 + 1], table[i * 3 + 2]), b = v3(table[i * 3 + 3], table[i * 3 + 4], table[i * 3 + 5]);
  lerp(out, a, b, f);
  let dir = evalDirection(v3(), cache2.curves[index], t);
  return projectOnPlane(out, out, dir), lenSq(out) < 1e-6 ? normalize(out, a) : normalize(out, out);
}
function buildUpTable(s, c2, index) {
  let n = s.knots.length, a = s.knots[index], b = s.knots[(index + 1) % n], table = new Float64Array((UP_SAMPLES + 1) * 3), pos = [], dirs = [];
  for (let i = 0; i <= UP_SAMPLES; i++) {
    let t = i / UP_SAMPLES;
    pos.push(evalPosition(v3(), c2, t)), dirs.push(evalDirection(v3(), c2, t));
  }
  let ups = [], r = normalize(v3(), projectOnPlane(v3(), knotUp(v3(), a), dirs[0]));
  lenSq(r) < 1e-6 && (r = anyPerpendicular(v3(), dirs[0])), ups.push(r);
  for (let i = 0; i < UP_SAMPLES; i++) {
    let v1 = sub(v3(), pos[i + 1], pos[i]), c1 = dot(v1, v1), ri = ups[i], ti = dirs[i], rL = ri, tL = ti;
    c1 > 1e-6 * 1e-6 && (rL = scaleAndAdd(v3(), ri, v1, -2 / c1 * dot(v1, ri)), tL = scaleAndAdd(v3(), ti, v1, -2 / c1 * dot(v1, ti)));
    let v2 = sub(v3(), dirs[i + 1], tL), c22 = dot(v2, v2), next = rL;
    c22 > 1e-6 * 1e-6 && (next = scaleAndAdd(v3(), rL, v2, -2 / c22 * dot(v2, rL))), next = normalize(v3(), projectOnPlane(v3(), next, dirs[i + 1])), lenSq(next) < 1e-6 && (next = copy(v3(), ups[i])), ups.push(next);
  }
  let endUp = normalize(v3(), projectOnPlane(v3(), knotUp(v3(), b), dirs[UP_SAMPLES])), twist = 0;
  if (lenSq(endUp) > 1e-6) {
    let last = ups[UP_SAMPLES], c3 = cross(v3(), last, endUp);
    twist = Math.atan2(dot(c3, dirs[UP_SAMPLES]), dot(last, endUp));
  }
  let q = q4();
  for (let i = 0; i <= UP_SAMPLES; i++) {
    let u = ups[i];
    twist !== 0 && (qFromAxisAngle(q, dirs[i], twist * i / UP_SAMPLES), u = qRotate(v3(), q, u)), table[i * 3] = u.x, table[i * 3 + 1] = u.y, table[i * 3 + 2] = u.z;
  }
  return table;
}
function insertKnot(s, index, k) {
  s.knots.splice(index, 0, k), refreshAround(s, index);
}
function removeKnot(s, index) {
  s.knots.splice(index, 1);
  let n = s.knots.length;
  if (!n) return;
  let next = Math.min(index, n - 1);
  applyTangentMode(s, prevIndex(next, n, s.closed)), applyTangentMode(s, next);
}
function insertOnCurve(s, curveIndex, t, factory2) {
  let n = s.knots.length, ia = curveIndex, ib = (curveIndex + 1) % n, a = s.knots[ia], b = s.knots[ib], c2 = getCurve(s, curveIndex), left = curve(), right = curve();
  split(c2, t, left, right);
  let k = factory2.knot();
  copy(k.position, left.p3), k.tension = DEFAULT_TENSION;
  let bothAuto = a.mode === 0 /* AutoSmooth */ && b.mode === 0 /* AutoSmooth */, bothLinear = a.mode === 1 /* Linear */ && b.mode === 1 /* Linear */, up = knotUp(v3(), a), upB = knotUp(v3(), b);
  lerp(up, up, upB, t);
  let outDir = sub(v3(), right.p1, right.p0);
  if (knotRotation(k.rotation, lenSq(outDir) > 1e-6 ? outDir : sub(v3(), right.p0, left.p2), up), bothAuto)
    k.mode = 0 /* AutoSmooth */;
  else if (bothLinear)
    k.mode = 1 /* Linear */;
  else {
    a.mode === 2 /* Mirrored */ && (a.mode = 3 /* Continuous */), b.mode === 2 /* Mirrored */ && (b.mode = 3 /* Continuous */), tangentsEditable(a.mode) && qRotate(a.tangentOut, qInvert(q4(), a.rotation), sub(v3(), left.p1, left.p0)), tangentsEditable(b.mode) && qRotate(b.tangentIn, qInvert(q4(), b.rotation), sub(v3(), right.p2, right.p3)), k.mode = 3 /* Continuous */;
    let inv = qInvert(q4(), k.rotation);
    qRotate(k.tangentIn, inv, sub(v3(), left.p2, left.p3)), qRotate(k.tangentOut, inv, sub(v3(), right.p1, right.p0));
  }
  let index = ia + 1;
  s.knots.splice(index, 0, k), applyTangentMode(s, index);
  let m = s.knots.length, p = prevIndex(index, m, s.closed), q = nextIndex(index, m, s.closed);
  return s.knots[p].mode === 0 /* AutoSmooth */ && applyTangentMode(s, p), s.knots[q].mode === 0 /* AutoSmooth */ && applyTangentMode(s, q), index;
}
var Y180 = q4(0, 1, 0, 0);
function reverseFlow(s) {
  s.knots.reverse();
  for (let k of s.knots) {
    let oldIn = qRotate(v3(), Y180, k.tangentIn), oldOut = qRotate(v3(), Y180, k.tangentOut);
    copy(k.tangentIn, oldOut), copy(k.tangentOut, oldIn), qMul(k.rotation, k.rotation, Y180);
  }
  refreshAll(s);
}
function setClosed(s, closed) {
  s.closed = closed;
  let n = s.knots.length;
  n && (applyTangentMode(s, 0), applyTangentMode(s, n - 1));
}
function sameRef(a, b) {
  return a.spline === b.spline && a.knot === b.knot;
}
function groupOf(c2, r) {
  for (let g of c2.links)
    for (let i = 0; i + 1 < g.knots.length; i += 2)
      if (g.knots[i] === r.spline && g.knots[i + 1] === r.knot) return g;
  return null;
}
function linkedKnots(c2, r) {
  let g = groupOf(c2, r);
  if (!g) return [];
  let res = [];
  for (let i = 0; i + 1 < g.knots.length; i += 2) {
    let o = { spline: g.knots[i], knot: g.knots[i + 1] };
    sameRef(o, r) || res.push(o);
  }
  return res;
}
function isLinked(c2, r) {
  return !!groupOf(c2, r);
}
function linkKnots(c2, refs, factory2) {
  if (refs.length < 2) return;
  let members = [], add2 = (r) => {
    members.some((m) => sameRef(m, r)) || members.push(r);
  };
  for (let r of refs) {
    let g2 = groupOf(c2, r);
    if (g2) {
      for (let i = 0; i + 1 < g2.knots.length; i += 2) add2({ spline: g2.knots[i], knot: g2.knots[i + 1] });
      c2.links.splice(c2.links.indexOf(g2), 1);
    }
    add2(r);
  }
  let g = factory2.link();
  g.knots.length = 0;
  for (let m of members) g.knots.push(m.spline, m.knot);
  c2.links.push(g);
  let p = c2.splines[refs[0].spline].knots[refs[0].knot].position;
  for (let m of members)
    sameRef(m, refs[0]) || setKnotPosition(c2.splines[m.spline], m.knot, p);
}
function unlinkKnots(c2, refs) {
  for (let r of refs) {
    let g = groupOf(c2, r);
    if (g) {
      for (let i = 0; i + 1 < g.knots.length; i += 2)
        if (g.knots[i] === r.spline && g.knots[i + 1] === r.knot) {
          g.knots.splice(i, 2);
          break;
        }
      g.knots.length < 4 && c2.links.splice(c2.links.indexOf(g), 1);
    }
  }
}
function syncLinked(c2, r) {
  let p = c2.splines[r.spline].knots[r.knot].position;
  for (let o of linkedKnots(c2, r)) {
    let s = c2.splines[o.spline];
    !s || !s.knots[o.knot] || setKnotPosition(s, o.knot, p);
  }
}
function rewriteLinks(c2, map) {
  for (let gi = c2.links.length - 1; gi >= 0; gi--) {
    let g = c2.links[gi], next = [];
    for (let i = 0; i + 1 < g.knots.length; i += 2) {
      let r = map({ spline: g.knots[i], knot: g.knots[i + 1] });
      r && !next.some((_, j) => j % 2 === 0 && next[j] === r.spline && next[j + 1] === r.knot) && next.push(r.spline, r.knot);
    }
    next.length < 4 ? c2.links.splice(gi, 1) : (g.knots.length = 0, g.knots.push(...next));
  }
}
function linksOnKnotInserted(c2, spline, knot) {
  rewriteLinks(c2, (r) => r.spline === spline && r.knot >= knot ? { spline, knot: r.knot + 1 } : r);
}
function linksOnKnotRemoved(c2, spline, knot) {
  rewriteLinks(c2, (r) => r.spline !== spline ? r : r.knot === knot ? null : r.knot > knot ? { spline, knot: r.knot - 1 } : r);
}
function linksOnSplineRemoved(c2, spline) {
  rewriteLinks(c2, (r) => r.spline === spline ? null : r.spline > spline ? { spline: r.spline - 1, knot: r.knot } : r);
}
function linksOnReversed(c2, spline, count) {
  rewriteLinks(c2, (r) => r.spline === spline ? { spline, knot: count - 1 - r.knot } : r);
}
function containerInsertKnot(c2, spline, index, k) {
  linksOnKnotInserted(c2, spline, index), insertKnot(c2.splines[spline], index, k);
}
function containerInsertOnCurve(c2, spline, curveIndex, t, factory2) {
  let s = c2.splines[spline], index = curveIndex + 1;
  return linksOnKnotInserted(c2, spline, index), insertOnCurve(s, curveIndex, t, factory2);
}
function containerRemoveKnots(c2, refs) {
  let sorted = [...refs].sort((a, b) => a.spline - b.spline || b.knot - a.knot);
  for (let r of sorted) {
    let s = c2.splines[r.spline];
    !s || r.knot >= s.knots.length || (removeKnot(s, r.knot), linksOnKnotRemoved(c2, r.spline, r.knot), s.knots.length < 3 && s.closed && (s.closed = !1));
  }
  for (let i = c2.splines.length - 1; i >= 0; i--)
    c2.splines[i].knots.length === 0 && c2.splines.length > 1 && (c2.splines.splice(i, 1), linksOnSplineRemoved(c2, i));
}
function containerReverse(c2, spline) {
  let s = c2.splines[spline];
  linksOnReversed(c2, spline, s.knots.length), reverseFlow(s);
}
function containerRemoveSpline(c2, spline) {
  c2.splines.splice(spline, 1), linksOnSplineRemoved(c2, spline);
}
function cloneKnot(k, factory2) {
  return copyKnot(factory2.knot(), k);
}
function splitKnot(c2, r, factory2) {
  let s = c2.splines[r.spline], n = s.knots.length;
  if (s.closed) {
    let order = [];
    for (let i = 0; i < n; i++) order.push(s.knots[(r.knot + i) % n]);
    rewriteLinks(c2, (o) => o.spline === r.spline ? { spline: o.spline, knot: wrap(o.knot - r.knot, n) } : o), s.knots.length = 0, s.knots.push(...order, cloneKnot(order[0], factory2)), s.closed = !1, refreshAll(s);
    let first = { spline: r.spline, knot: 0 }, last = { spline: r.spline, knot: n };
    return linkKnots(c2, [first, last], factory2), last;
  }
  if (r.knot <= 0 || r.knot >= n - 1) return null;
  let tail = factory2.spline();
  tail.closed = !1, tail.knots.length = 0, tail.knots.push(cloneKnot(s.knots[r.knot], factory2), ...s.knots.slice(r.knot + 1));
  let newSpline = c2.splines.length;
  rewriteLinks(c2, (o) => o.spline === r.spline && o.knot > r.knot ? { spline: newSpline, knot: o.knot - r.knot } : o), s.knots.length = r.knot + 1, c2.splines.push(tail), refreshAll(s), refreshAll(tail);
  let copyRef = { spline: newSpline, knot: 0 };
  return linkKnots(c2, [r, copyRef], factory2), copyRef;
}
function isEndKnot(s, knot) {
  return !s.closed && s.knots.length > 0 && (knot === 0 || knot === s.knots.length - 1);
}
function joinKnots(c2, a, b, factory2) {
  let sa = c2.splines[a.spline], sb = c2.splines[b.spline];
  if (!sa || !sb || !isEndKnot(sa, a.knot) || !isEndKnot(sb, b.knot)) return null;
  if (a.spline === b.spline) {
    if (a.knot === b.knot || sa.knots.length < 3) return null;
    let first = sa.knots[0], last = sa.knots[sa.knots.length - 1];
    return distSq(first.position, last.position) < 1e-6 && (copy(first.tangentIn, last.tangentIn), linksOnKnotRemoved(c2, a.spline, sa.knots.length - 1), sa.knots.pop()), setClosed(sa, !0), { spline: a.spline, knot: a.knot === 0 ? 0 : Math.min(a.knot, sa.knots.length - 1) };
  }
  a.knot === 0 && (containerReverse(c2, a.spline), a = { spline: a.spline, knot: sa.knots.length - 1 }), b.knot !== 0 && (containerReverse(c2, b.spline), b = { spline: b.spline, knot: 0 });
  let ka = sa.knots[a.knot], kb = sb.knots[0], outWorld = tangentOutVec(v3(), kb);
  ka.mode === 1 /* Linear */ && kb.mode !== 1 /* Linear */ && (ka.mode = 4 /* Broken */), tangentsEditable(ka.mode) && (ka.mode = 4 /* Broken */, qRotate(ka.tangentOut, qInvert(q4(), ka.rotation), outWorld));
  let offset = sa.knots.length - 1, bIndex = b.spline;
  rewriteLinks(c2, (o) => o.spline !== bIndex ? o : o.knot === 0 ? { spline: a.spline, knot: a.knot } : { spline: a.spline, knot: offset + o.knot }), sa.knots.push(...sb.knots.slice(1)), c2.splines.splice(bIndex, 1), rewriteLinks(c2, (o) => o.spline > bIndex ? { spline: o.spline - 1, knot: o.knot } : o);
  let aSpline = a.spline > bIndex ? a.spline - 1 : a.spline;
  return refreshAll(c2.splines[aSpline]), { spline: aSpline, knot: a.knot };
}
function shapeKnots(kind, o) {
  let r = o.size, pts2 = [], flat = (x, y, h = 0) => o.plane2D ? v3(x, y, h) : v3(x, h, -y);
  switch (kind) {
    case "square":
      return pts2.push(flat(-r, -r), flat(-r, r), flat(r, r), flat(r, -r)), { points: pts2, mode: 1 /* Linear */, closed: !0 };
    case "rounded-square": {
      let c2 = r * 0.75, e = r;
      return pts2.push(flat(-c2, -e), flat(-e, -c2), flat(-e, c2), flat(-c2, e), flat(c2, e), flat(e, c2), flat(e, -c2), flat(c2, -e)), { points: pts2, mode: 0 /* AutoSmooth */, closed: !0 };
    }
    case "circle": {
      for (let i = 0; i < 4; i++) {
        let a = i / 4 * Math.PI * 2;
        pts2.push(flat(Math.cos(a) * r, Math.sin(a) * r));
      }
      return { points: pts2, mode: 2 /* Mirrored */, closed: !0, tangentScale: 0.5523 };
    }
    case "polygon": {
      let n = Math.max(3, Math.round(o.sides ?? 6));
      for (let i = 0; i < n; i++) {
        let a = i / n * Math.PI * 2 + Math.PI / 2;
        pts2.push(flat(Math.cos(a) * r, Math.sin(a) * r));
      }
      return { points: pts2, mode: 1 /* Linear */, closed: !0 };
    }
    case "star": {
      let n = Math.max(3, Math.round(o.sides ?? 5));
      for (let i = 0; i < n * 2; i++) {
        let a = i / (n * 2) * Math.PI * 2 + Math.PI / 2, rr = i % 2 === 0 ? r : r * 0.45;
        pts2.push(flat(Math.cos(a) * rr, Math.sin(a) * rr));
      }
      return { points: pts2, mode: 1 /* Linear */, closed: !0 };
    }
    case "helix": {
      let turns = Math.max(0.25, o.turns ?? 3), height = o.height ?? r * 2, perTurn = 8, n = Math.round(turns * perTurn);
      for (let i = 0; i <= n; i++) {
        let a = i / perTurn * Math.PI * 2;
        pts2.push(flat(Math.cos(a) * r, Math.sin(a) * r, i / n * height));
      }
      return { points: pts2, mode: 0 /* AutoSmooth */, closed: !1 };
    }
    case "line":
    default:
      return pts2.push(flat(-r, 0), flat(r, 0)), { points: pts2, mode: 0 /* AutoSmooth */, closed: !1 };
  }
}
function buildShape(s, kind, o, factory2) {
  let shape = shapeKnots(kind, o);
  s.knots.length = 0, s.closed = shape.closed;
  let normal = o.plane2D ? v3(0, 0, 1) : v3(0, 1, 0), n = shape.points.length;
  for (let i = 0; i < n; i++) {
    let k = factory2.knot();
    copy(k.position, shape.points[i]), set(k.tangentIn, 0, 0, 0), set(k.tangentOut, 0, 0, 0), qIdentity(k.rotation), k.mode = shape.mode, k.tension = DEFAULT_TENSION, s.knots.push(k);
  }
  for (let i = 0; i < n; i++) {
    let k = s.knots[i], prev = s.knots[prevIndex(i, n, s.closed)].position, next = s.knots[nextIndex(i, n, s.closed)].position, dir = sub(v3(), next, prev);
    if (lenSq(dir) < 1e-6 && sub(dir, next, k.position), knotRotation(k.rotation, dir, normal), shape.tangentScale) {
      let l = shape.tangentScale * o.size;
      set(k.tangentIn, 0, 0, -l), set(k.tangentOut, 0, 0, l);
    }
  }
  refreshAll(s);
}

// source/scene/model.ts
function elementKey(e) {
  return `${e.comp.uuid}:${e.spline}:${e.knot}:${e.part}`;
}
function getKnot(e) {
  var _a2, _b2, _c, _d2;
  return ((_d2 = (_c = (_b2 = (_a2 = e.comp) == null ? void 0 : _a2.splines) == null ? void 0 : _b2[e.spline]) == null ? void 0 : _c.knots) == null ? void 0 : _d2[e.knot]) ?? null;
}
function isValidElement(e) {
  return !e.comp || !e.comp.isValid || !e.comp.node || !e.comp.node.isValid ? !1 : !!getKnot(e);
}
function tangentUsed(spline, knot, part) {
  return part === "knot" || spline.closed ? !0 : !(curveCount(spline) === 0 || part === "in" && knot === 0 || part === "out" && knot === spline.knots.length - 1);
}
function worldMatrix(comp) {
  return comp.node.worldMatrix;
}
var _inv = /* @__PURE__ */ new Map();
function inverseMatrix(comp) {
  let m = comp.node.worldMatrix, stamp = `${m.m00},${m.m01},${m.m02},${m.m04},${m.m05},${m.m06},${m.m08},${m.m09},${m.m10},${m.m12},${m.m13},${m.m14}`, e = _inv.get(comp);
  if (!e || e.stamp !== stamp) {
    let { Mat4 } = cc(), inv = new Mat4();
    Mat4.invert(inv, m), e = { stamp, m: inv }, _inv.set(comp, e);
  }
  return e.m;
}
function toWorld(comp, local, out = v3()) {
  return m4TransformPoint(out, worldMatrix(comp), local);
}
function toLocal(comp, world, out = v3()) {
  return m4TransformPoint(out, inverseMatrix(comp), world);
}
function dirToWorld(comp, local, out = v3()) {
  return m4TransformDir(out, worldMatrix(comp), local);
}
function dirToLocal(comp, world, out = v3()) {
  return m4TransformDir(out, inverseMatrix(comp), world);
}
function containerRotation(comp) {
  let r = comp.node.worldRotation;
  return q4(r.x, r.y, r.z, r.w);
}
function knotWorldRotation(comp, k, out = q4()) {
  return qNormalize(out, qMul(out, containerRotation(comp), k.rotation));
}
function knotWorldPosition(comp, s, k, out = v3()) {
  let knot = comp.splines[s].knots[k];
  return toWorld(comp, knot.position, out);
}
function tangentWorldPosition(comp, s, k, part, out = v3()) {
  let knot = comp.splines[s].knots[k], vec = part === "in" ? tangentInVec(v3(), knot) : tangentOutVec(v3(), knot);
  return toWorld(comp, add(v3(), knot.position, vec), out);
}
function elementWorldPosition(e, out = v3()) {
  return e.part === "knot" ? knotWorldPosition(e.comp, e.spline, e.knot, out) : tangentWorldPosition(e.comp, e.spline, e.knot, e.part, out);
}
function setKnotWorld(comp, s, k, world) {
  let local = toLocal(comp, world);
  setKnotPosition(comp.splines[s], k, local), syncLinked(comp, { spline: s, knot: k });
}
function setTangentWorld(comp, s, k, part, world) {
  let spline = comp.splines[s], knot = spline.knots[k], local = toLocal(comp, world);
  setTangentVec(spline, k, part, sub(v3(), local, knot.position));
}
function setTangentWorldVec(comp, s, k, part, worldVec) {
  setTangentVec(comp.splines[s], k, part, dirToLocal(comp, worldVec));
}
function tangentWorldVec(comp, s, k, part, out = v3()) {
  let knot = comp.splines[s].knots[k], vec = part === "in" ? tangentInVec(v3(), knot) : tangentOutVec(v3(), knot);
  return dirToWorld(comp, vec, out);
}
function setKnotWorldRotation(comp, k, world) {
  let local = qMul(q4(), qInvert(q4(), containerRotation(comp)), world);
  qNormalize(k.rotation, local);
}
function currentTargets() {
  let C = containerClass();
  if (!C) return [];
  let res = [];
  for (let uuid of selectedNodeUuids()) {
    let node = findNode(uuid);
    if (!node || !node.isValid || !node.activeInHierarchy) continue;
    let comp = node.getComponent(C);
    comp && comp.enabledInHierarchy && res.push(comp);
  }
  return res;
}
var ElementSelection = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
    this.order = [];
    /** Bumped on every change. */
    this.version = 0;
  }
  get size() {
    return this.map.size;
  }
  has(e) {
    return this.map.has(elementKey(e));
  }
  add(e) {
    let k = elementKey(e);
    this.map.has(k) && this.order.splice(this.order.indexOf(k), 1), this.map.set(k, { ...e }), this.order.push(k), this.version++;
  }
  remove(e) {
    let k = elementKey(e);
    this.map.delete(k) && (this.order.splice(this.order.indexOf(k), 1), this.version++);
  }
  toggle(e) {
    this.has(e) ? this.remove(e) : this.add(e);
  }
  clear() {
    this.map.size && (this.map.clear(), this.order.length = 0, this.version++);
  }
  set(list) {
    this.map.clear(), this.order.length = 0;
    for (let e of list) {
      let k = elementKey(e);
      this.map.has(k) || (this.map.set(k, { ...e }), this.order.push(k));
    }
    this.version++;
  }
  all() {
    return this.order.map((k) => this.map.get(k));
  }
  knots() {
    return this.all().filter((e) => e.part === "knot");
  }
  tangents() {
    return this.all().filter((e) => e.part !== "knot");
  }
  /** The last selected element. */
  active() {
    let k = this.order[this.order.length - 1];
    return k ? this.map.get(k) : null;
  }
  hasKnot(comp, spline, knot) {
    return this.map.has(`${comp.uuid}:${spline}:${knot}:knot`);
  }
  hasAnyOf(comp, spline, knot) {
    let p = `${comp.uuid}:${spline}:${knot}:`;
    return this.map.has(`${p}knot`) || this.map.has(`${p}in`) || this.map.has(`${p}out`);
  }
  /** Drops elements that no longer exist or belong to containers not edited. */
  validate(targets) {
    let changed = !1;
    for (let k of [...this.order]) {
      let e = this.map.get(k);
      (!isValidElement(e) || !targets.includes(e.comp)) && (this.map.delete(k), this.order.splice(this.order.indexOf(k), 1), changed = !0);
    }
    return changed && this.version++, changed;
  }
  /** Comps that have selected elements. */
  comps() {
    let set2 = /* @__PURE__ */ new Set();
    for (let e of this.map.values()) set2.add(e.comp);
    return [...set2];
  }
};
function centroid(list, out = v3()) {
  if (copy(out, v3()), !list.length) return out;
  let p = v3();
  for (let e of list) add(out, out, elementWorldPosition(e, p));
  return out.x /= list.length, out.y /= list.length, out.z /= list.length, out;
}

// source/scene/state.ts
var DEFAULT_SETTINGS = {
  showAll: !0,
  showFlow: !0,
  showAllTangents: !1,
  showKnotIndices: !1,
  showNormals: !1,
  defaultMode: 0 /* AutoSmooth */,
  drawOnSurfaces: !0,
  orientation: "global"
}, S = {
  /** This process is the edit scene (Play-in-Editor's process only draws). */
  primary: !1,
  hooked: !1,
  /** Spline editing context is on (Unity's spline tool context). */
  context: !1,
  tool: "select",
  selection: new ElementSelection(),
  hover: null,
  /** Spline being drawn by the Draw tool. */
  drawing: null,
  /** Index (in the edited containers) of the container the Draw tool adds to. */
  drawTarget: 0,
  /** Draw tool preview position (world). */
  preview: null,
  settings: { ...DEFAULT_SETTINGS },
  /** Last time a delete key went through the scene view. */
  deleteKeyAt: 0,
  selectAllKeyAt: 0,
  /** Replaying a click into the editor's own handlers. */
  replaying: !1,
  lastTargets: [],
  /** Enter the context (with a tool) when this container becomes selected. */
  pendingContext: null,
  targetsKey: "",
  stateVersion: 0,
  diag: {
    draws: 0,
    mouseDowns: 0,
    blocked: 0,
    errors: []
  }
};
function note(msg) {
  S.diag.errors.push(`${(/* @__PURE__ */ new Date()).toISOString()} ${msg}`), S.diag.errors.length > 30 && S.diag.errors.shift();
}
function bumpState() {
  S.stateVersion++;
}

// source/scene/view.ts
var lastCamera = null;
function sceneCamera() {
  try {
    let { director, renderer } = cc(), root = director.root;
    if (!root) return null;
    if (lastCamera && lastCamera.enabled && lastCamera.window === root.mainWindow && root.cameraList.includes(lastCamera)) return lastCamera;
    for (let cam2 of root.cameraList)
      if (cam2.cameraUsage === renderer.scene.CameraUsage.SCENE_VIEW && cam2.enabled && cam2.window === root.mainWindow)
        return lastCamera = cam2, cam2;
  } catch {
  }
  return null;
}
var _tmp = v3();
function cameraPosition(cam2, out = v3()) {
  let p = cam2.node.worldPosition;
  return set(out, p.x, p.y, p.z);
}
function cameraForward(cam2, out = v3()) {
  let f = cam2.forward ?? cam2.node.forward;
  return normalize(out, set(out, f.x, f.y, f.z));
}
function cameraRight(cam2, out = v3()) {
  let r = cam2.node.right;
  return normalize(out, set(out, r.x, r.y, r.z));
}
function cameraUp(cam2, out = v3()) {
  let u = cam2.node.up;
  return normalize(out, set(out, u.x, u.y, u.z));
}
function isOrtho(cam2) {
  try {
    return cam2.projectionType === cc().renderer.scene.CameraProjection.ORTHO;
  } catch {
    return !1;
  }
}
var _ws = v3(), _fw = v3();
function toScreen(cam2, p, out = { x: 0, y: 0, visible: !0 }) {
  return cam2.worldToScreen(_ws, p), out.x = _ws.x, out.y = _ws.y, isOrtho(cam2) ? out.visible = !0 : (cameraPosition(cam2, _tmp), cameraForward(cam2, _fw), out.visible = dot(sub(_tmp, p, _tmp), _fw) > (cam2.nearClip ?? 0.01)), out;
}
function screenRay(cam2, x, y) {
  let { geometry } = cc(), r = new geometry.Ray();
  return cam2.screenPointToRay(r, x, y), { o: v3(r.o.x, r.o.y, r.o.z), d: normalize(v3(), v3(r.d.x, r.d.y, r.d.z)) };
}
function worldPerPixel(cam2, p) {
  let right = cameraRight(cam2), a = toScreen(cam2, p), b = toScreen(cam2, scaleAndAdd(v3(), p, right, 1)), d = Math.hypot(b.x - a.x, b.y - a.y);
  if (!(d > 1e-6) || !a.visible) {
    let dist2 = len(sub(v3(), p, cameraPosition(cam2)));
    return Math.max(dist2, 1) * 2e-3;
  }
  return 1 / d;
}
function rayPlane(ray, point, normal, allowBehind = !1) {
  let denom = dot(ray.d, normal);
  if (Math.abs(denom) < 1e-6) return null;
  let t = dot(sub(v3(), point, ray.o), normal) / denom;
  return t < 0 && !allowBehind ? null : scaleAndAdd(v3(), ray.o, ray.d, t);
}
function closestOnLine(ray, origin, dir) {
  let d1 = normalize(v3(), dir), d2 = ray.d, r = sub(v3(), origin, ray.o), a = dot(d1, d1), b = dot(d1, d2), c2 = dot(d2, d2), d = dot(d1, r), e = dot(d2, r), denom = a * c2 - b * b;
  if (Math.abs(denom) < 1e-8) return null;
  let s = (b * e - c2 * d) / denom;
  return scaleAndAdd(v3(), origin, d1, s);
}
function distToSegment(px, py, ax, ay, bx, by) {
  let dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy, f = l2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
  f = f < 0 ? 0 : f > 1 ? 1 : f;
  let x = ax + dx * f - px, y = ay + dy * f - py;
  return { dist: Math.sqrt(x * x + y * y), f };
}
function pointInPolygon(px, py, pts2) {
  let inside = !1;
  for (let i = 0, j = pts2.length - 1; i < pts2.length; j = i++) {
    let a = pts2[i], b = pts2[j];
    a.y > py != b.y > py && px < (b.x - a.x) * (py - a.y) / (b.y - a.y) + a.x && (inside = !inside);
  }
  return inside;
}
var coordMode = "unknown", coordSamples = 0;
function eventCoordMode() {
  return coordMode;
}
function canvasElement() {
  try {
    let c2 = cc().game.canvas;
    if (c2 && typeof c2.getBoundingClientRect == "function") return c2;
  } catch {
  }
  return typeof document < "u" ? document.querySelector("canvas") : null;
}
function eventToScreen(cam2, ev) {
  let canvas = canvasElement(), hasClient = typeof ev.clientX == "number" && typeof ev.clientY == "number", fromClient = null, css = null;
  if (canvas && hasClient) {
    let rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      let sx = cam2.width / rect.width, sy = cam2.height / rect.height, cx = ev.clientX - rect.left, cy = ev.clientY - rect.top;
      css = { x: cx, y: cy, sx, sy, h: rect.height }, fromClient = { x: cx * sx, y: (rect.height - cy) * sy };
    }
  }
  let hasXY = typeof ev.x == "number" && typeof ev.y == "number";
  if (coordMode === "unknown" || coordMode === "client" && coordSamples < 5)
    if (coordSamples++, hasXY && css) {
      let near = (a, b) => Math.abs(a - b) < 2.5;
      near(ev.x, css.x * css.sx) && near(ev.y, (css.h - css.y) * css.sy) ? coordMode = "event" : near(ev.x, css.x * css.sx) && near(ev.y, css.y * css.sy) ? coordMode = "event-flipped" : near(ev.x, css.x) && near(ev.y, css.h - css.y) ? coordMode = "event-css" : near(ev.x, css.x) && near(ev.y, css.y) ? coordMode = "event-css-flipped" : coordMode = "client";
    } else hasXY ? coordMode = "event" : css && (coordMode = "client");
  switch (coordMode) {
    case "event":
      return { x: ev.x, y: ev.y };
    case "event-flipped":
      return { x: ev.x, y: cam2.height - ev.y };
    case "event-css":
      return css ? { x: ev.x * css.sx, y: ev.y * css.sy } : { x: ev.x, y: ev.y };
    case "event-css-flipped":
      return css ? { x: ev.x * css.sx, y: (css.h - ev.y) * css.sy } : { x: ev.x, y: cam2.height - ev.y };
    default:
      return fromClient ?? { x: ev.x ?? 0, y: ev.y ?? 0 };
  }
}
var overlay = null;
function ensureOverlay() {
  if (overlay && overlay.root.isConnected) return overlay;
  if (typeof document > "u" || !document.body) return null;
  let root = document.createElement("div");
  root.id = "splines-overlay", root.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;pointer-events:none;z-index:2147483000;font:11px/1.2 sans-serif;";
  let rect = document.createElement("div");
  rect.style.cssText = "position:fixed;display:none;border:1px solid rgba(80,170,255,0.9);background:rgba(80,170,255,0.15);pointer-events:none;", root.appendChild(rect);
  let tip = document.createElement("div");
  return tip.style.cssText = "position:fixed;display:none;padding:2px 6px;border-radius:3px;background:rgba(20,20,20,0.85);color:#ddd;white-space:nowrap;pointer-events:none;", root.appendChild(tip), document.body.appendChild(root), overlay = { root, labels: [], used: 0, rect, tip }, overlay;
}
function cssOf(cam2, x, y) {
  let canvas = canvasElement();
  if (!canvas) return null;
  let r = canvas.getBoundingClientRect();
  return !(r.width > 0) || !(r.height > 0) ? null : { left: r.left + x * r.width / cam2.width, top: r.top + r.height - y * r.height / cam2.height };
}
function beginLabels() {
  let o = ensureOverlay();
  o && (o.used = 0);
}
function addLabel(cam2, x, y, text, color2 = "#fff") {
  let o = ensureOverlay();
  if (!o) return;
  let css = cssOf(cam2, x, y);
  if (!css) return;
  let el = o.labels[o.used];
  el || (el = document.createElement("div"), el.style.cssText = "position:fixed;transform:translate(6px,-100%);text-shadow:0 0 2px #000,0 0 2px #000;pointer-events:none;white-space:nowrap;", o.root.appendChild(el), o.labels.push(el)), o.used++, el.textContent !== text && (el.textContent = text), el.style.color = color2, el.style.left = `${css.left}px`, el.style.top = `${css.top}px`, el.style.display = "block";
}
function endLabels() {
  let o = overlay;
  if (o)
    for (let i = o.used; i < o.labels.length; i++) o.labels[i].style.display = "none";
}
function showRect(cam2, x0, y0, x1, y1) {
  let o = ensureOverlay();
  if (!o) return;
  let a = cssOf(cam2, Math.min(x0, x1), Math.max(y0, y1)), b = cssOf(cam2, Math.max(x0, x1), Math.min(y0, y1));
  !a || !b || (o.rect.style.left = `${a.left}px`, o.rect.style.top = `${a.top}px`, o.rect.style.width = `${Math.max(0, b.left - a.left)}px`, o.rect.style.height = `${Math.max(0, b.top - a.top)}px`, o.rect.style.display = "block");
}
function hideRect() {
  overlay && (overlay.rect.style.display = "none");
}
function showTip(cam2, x, y, text) {
  let o = ensureOverlay();
  if (!o) return;
  let css = cssOf(cam2, x, y);
  css && (o.tip.textContent = text, o.tip.style.left = `${css.left + 14}px`, o.tip.style.top = `${css.top + 14}px`, o.tip.style.display = "block");
}
function hideTip() {
  overlay && (overlay.tip.style.display = "none");
}
function removeOverlay() {
  overlay != null && overlay.root.isConnected && overlay.root.remove(), overlay = null;
}

// source/scene/draw.ts
var gr = null, cam = null, camRight = v3(), camUp = v3(), camFwd = v3();
function beginDraw(camera) {
  return cam = camera, !camera.geometryRenderer && camera.initGeometryRenderer && camera.initGeometryRenderer(), gr = camera.geometryRenderer || null, gr ? (cameraRight(camera, camRight), cameraUp(camera, camUp), cameraForward(camera, camFwd), !0) : !1;
}
function color(r, g, b, a = 255) {
  return new (cc()).Color(r, g, b, a);
}
var Colors = {
  get curve() {
    return c("curve", 200, 200, 200);
  },
  get curveDim() {
    return c("curveDim", 140, 140, 140, 200);
  },
  get curveSelected() {
    return c("curveSelected", 240, 240, 240);
  },
  get curveHover() {
    return c("curveHover", 255, 255, 255);
  },
  get knot() {
    return c("knot", 52, 52, 52);
  },
  get knotOutline() {
    return c("knotOutline", 230, 230, 230);
  },
  get selected() {
    return c("selected", 54, 179, 255);
  },
  get hover() {
    return c("hover", 255, 255, 255);
  },
  get linked() {
    return c("linked", 255, 196, 64);
  },
  get tangentLine() {
    return c("tangentLine", 160, 160, 160);
  },
  get tangent() {
    return c("tangent", 210, 210, 210);
  },
  get flow() {
    return c("flow", 255, 255, 255, 140);
  },
  get normal() {
    return c("normal", 120, 230, 120, 200);
  },
  get preview() {
    return c("preview", 255, 255, 255, 170);
  },
  get insert() {
    return c("insert", 120, 220, 120);
  },
  get axisX() {
    return c("axisX", 219, 62, 29);
  },
  get axisY() {
    return c("axisY", 154, 243, 72);
  },
  get axisZ() {
    return c("axisZ", 58, 122, 248);
  },
  get axisHot() {
    return c("axisHot", 246, 242, 50);
  },
  get axisView() {
    return c("axisView", 220, 220, 220);
  },
  get planeFill() {
    return c("planeFill", 255, 255, 255, 40);
  }
}, cache = /* @__PURE__ */ new Map();
function c(name, r, g, b, a = 255) {
  let col = cache.get(name);
  return col || (col = color(r, g, b, a), cache.set(name, col)), col;
}
function withAlpha(col, a) {
  let key = `${col.r},${col.g},${col.b},${a}`, res = cache.get(key);
  return res || (res = color(col.r, col.g, col.b, a), cache.set(key, res)), res;
}
function line(a, b, col, depthTest = !1) {
  gr.addLine(a, b, col, depthTest);
}
var _o = v3(), _a = v3(), _b = v3();
function thickLine(a, b, col, widthPx, depthTest = !1) {
  if (gr.addLine(a, b, col, depthTest), widthPx <= 1.2 || (sub(_o, b, a), cross(_o, _o, camFwd), lenSq(_o) < 1e-12)) return;
  normalize(_o, _o);
  let wpp = worldPerPixel(cam, a), half = Math.floor(widthPx / 2);
  for (let i = 1; i <= half; i++) {
    let s = wpp * i * 0.7;
    gr.addLine(scaleAndAdd(_a, a, _o, s), scaleAndAdd(_b, b, _o, s), col, depthTest), gr.addLine(scaleAndAdd(_a, a, _o, -s), scaleAndAdd(_b, b, _o, -s), col, depthTest);
  }
}
function polyline(points, col, widthPx = 1, depthTest = !1) {
  for (let i = 0; i + 1 < points.length; i++)
    widthPx > 1.2 ? thickLine(points[i], points[i + 1], col, widthPx, depthTest) : gr.addLine(points[i], points[i + 1], col, depthTest);
}
var circlePts = [];
function screenCirclePoints(center, radiusPx, segments) {
  let r = worldPerPixel(cam, center) * radiusPx;
  for (; circlePts.length <= segments; ) circlePts.push(v3());
  for (let i = 0; i <= segments; i++) {
    let a = i / segments * Math.PI * 2, p = circlePts[i];
    copy(p, center), scaleAndAdd(p, p, camRight, Math.cos(a) * r), scaleAndAdd(p, p, camUp, Math.sin(a) * r);
  }
  return circlePts;
}
function circle(center, radiusPx, col, segments = 16, depthTest = !1) {
  let pts2 = screenCirclePoints(center, radiusPx, segments);
  for (let i = 0; i < segments; i++) gr.addLine(pts2[i], pts2[i + 1], col, depthTest);
}
function disc(center, radiusPx, col, segments = 12, depthTest = !1) {
  let pts2 = screenCirclePoints(center, radiusPx, segments);
  for (let i = 0; i < segments; i++) gr.addTriangle(center, pts2[i], pts2[i + 1], col, !1, depthTest, !0);
}
function square(center, halfPx, col, filled, depthTest = !1) {
  let h = worldPerPixel(cam, center) * halfPx, p0 = add(v3(), scaleAndAdd(v3(), center, camRight, -h), scale(v3(), camUp, -h)), p1 = add(v3(), scaleAndAdd(v3(), center, camRight, h), scale(v3(), camUp, -h)), p2 = add(v3(), scaleAndAdd(v3(), center, camRight, h), scale(v3(), camUp, h)), p3 = add(v3(), scaleAndAdd(v3(), center, camRight, -h), scale(v3(), camUp, h));
  gr.addQuad(p0, p1, p2, p3, col, !filled, depthTest, !0);
}
function diamond(center, halfPx, col, filled, depthTest = !1) {
  let h = worldPerPixel(cam, center) * halfPx, p0 = scaleAndAdd(v3(), center, camUp, -h), p1 = scaleAndAdd(v3(), center, camRight, h), p2 = scaleAndAdd(v3(), center, camUp, h), p3 = scaleAndAdd(v3(), center, camRight, -h);
  gr.addQuad(p0, p1, p2, p3, col, !filled, depthTest, !0);
}
function ring(center, normal, radius, col, segments = 48, depthTest = !1, frontOnly = !1) {
  let n = normalize(v3(), normal), u = normalize(v3(), cross(v3(), Math.abs(n.y) < 0.99 ? v3(0, 1, 0) : v3(1, 0, 0), n)), w = cross(v3(), n, u), prev = null, toCam = v3();
  for (let i = 0; i <= segments; i++) {
    let a = i / segments * Math.PI * 2, p = add(v3(), center, add(v3(), scale(v3(), u, Math.cos(a) * radius), scale(v3(), w, Math.sin(a) * radius)));
    if (prev) {
      let draw = !0;
      if (frontOnly) {
        let mid = scale(v3(), add(v3(), prev, p), 0.5);
        sub(toCam, mid, center), draw = toCam.x * camFwd.x + toCam.y * camFwd.y + toCam.z * camFwd.z <= radius * 0.05;
      }
      draw && gr.addLine(prev, p, col, depthTest);
    }
    prev = p;
  }
}
function cone(base, dir, height, radius, col, depthTest = !1, segments = 10) {
  let d = normalize(v3(), dir), apex = scaleAndAdd(v3(), base, d, height), u = normalize(v3(), cross(v3(), Math.abs(d.y) < 0.99 ? v3(0, 1, 0) : v3(1, 0, 0), d)), w = cross(v3(), d, u), pts2 = [];
  for (let i = 0; i <= segments; i++) {
    let a = i / segments * Math.PI * 2;
    pts2.push(add(v3(), base, add(v3(), scale(v3(), u, Math.cos(a) * radius), scale(v3(), w, Math.sin(a) * radius))));
  }
  for (let i = 0; i < segments; i++)
    gr.addTriangle(apex, pts2[i], pts2[i + 1], col, !1, depthTest, !0), gr.addTriangle(base, pts2[i + 1], pts2[i], col, !1, depthTest, !0);
}
function cube(center, half, ax, ay, az, col, depthTest = !1) {
  let corner = (sx, sy, sz) => {
    let p = copy(v3(), center);
    return scaleAndAdd(p, p, ax, sx * half), scaleAndAdd(p, p, ay, sy * half), scaleAndAdd(p, p, az, sz * half), p;
  }, c000 = corner(-1, -1, -1), c100 = corner(1, -1, -1), c110 = corner(1, 1, -1), c010 = corner(-1, 1, -1), c001 = corner(-1, -1, 1), c101 = corner(1, -1, 1), c111 = corner(1, 1, 1), c011 = corner(-1, 1, 1), q = (a, b, cc2, d) => gr.addQuad(a, b, cc2, d, col, !1, depthTest, !0);
  q(c000, c100, c110, c010), q(c001, c011, c111, c101), q(c000, c010, c011, c001), q(c100, c101, c111, c110), q(c000, c001, c101, c100), q(c010, c110, c111, c011);
}
function quad(a, b, c2, d, col, filled, depthTest = !1) {
  gr.addQuad(a, b, c2, d, col, !filled, depthTest, !0);
}
function chevron(p, dir, sizePx, col, depthTest = !1) {
  let d = normalize(v3(), dir);
  if (lenSq(d) < 1e-12) return;
  let side = normalize(v3(), cross(v3(), d, camFwd));
  if (lenSq(side) < 1e-12) return;
  let s = worldPerPixel(cam, p) * sizePx, back = scaleAndAdd(v3(), p, d, -s);
  gr.addLine(scaleAndAdd(v3(), back, side, s * 0.7), p, col, depthTest), gr.addLine(scaleAndAdd(v3(), back, side, -s * 0.7), p, col, depthTest);
}

// source/scene/handles.ts
var AXIS_PX = 90, HIT_PX = 7;
function handleKind() {
  switch (transformToolName()) {
    case "position":
    case "rect":
      return "move";
    case "rotation":
      return "rotate";
    case "scale":
      return "scale";
    default:
      return null;
  }
}
function handleAxes(elements) {
  let active2 = elements[elements.length - 1], mode = S.settings.orientation, q = null;
  if (active2 && mode === "local") q = containerRotation(active2.comp);
  else if (active2 && mode === "element") {
    let k = getKnot(active2);
    if (k)
      if (active2.part === "knot") q = knotWorldRotation(active2.comp, k);
      else {
        let dir = tangentWorldVec(active2.comp, active2.spline, active2.knot, active2.part), up = qRotate(v3(), knotWorldRotation(active2.comp, k), v3(0, 1, 0));
        q = lenSq(dir) > 1e-6 ? qLookRotation(q4(), dir, up) : knotWorldRotation(active2.comp, k);
      }
  }
  return q ? [qRotate(v3(), q, v3(1, 0, 0)), qRotate(v3(), q, v3(0, 1, 0)), qRotate(v3(), q, v3(0, 0, 1))] : [v3(1, 0, 0), v3(0, 1, 0), v3(0, 0, 1)];
}
function handlePivot(elements) {
  return pivotMode() === "pivot" && elements.length ? elementWorldPosition(elements[elements.length - 1]) : centroid(elements);
}
function computeFrame(cam2, elements, axesOverride) {
  let kind = handleKind();
  if (!kind || !elements.length) return null;
  let pivot = handlePivot(elements), axes = axesOverride ?? handleAxes(elements);
  return { kind, pivot, axes, size: worldPerPixel(cam2, pivot) * AXIS_PX, is2D: is2DView() };
}
var AXIS_INDEX = { x: 0, y: 1, z: 2 }, PLANES = [
  { axis: "xy", a: 0, b: 1, n: 2 },
  { axis: "yz", a: 1, b: 2, n: 0 },
  { axis: "xz", a: 0, b: 2, n: 1 }
];
function axisColor(i) {
  return i === 0 ? Colors.axisX : i === 1 ? Colors.axisY : Colors.axisZ;
}
function visibleAxes(f) {
  return f.is2D ? [0, 1] : [0, 1, 2];
}
function visiblePlanes(f) {
  return f.is2D ? PLANES.filter((p) => p.axis === "xy") : PLANES;
}
function planeSigns(cam2, f) {
  let toCam = sub(v3(), cameraPosition(cam2), f.pivot);
  return lenSq(toCam) < 1e-6 ? [1, 1, 1] : f.axes.map((a) => dot(a, toCam) >= 0 ? 1 : -1);
}
function planeQuad(cam2, f, p) {
  let s = planeSigns(cam2, f), lo = f.size * 0.16, hi = f.size * 0.4, A = scale(v3(), f.axes[p.a], s[p.a]), B = scale(v3(), f.axes[p.b], s[p.b]), pt = (x, y) => add(v3(), add(v3(), f.pivot, scale(v3(), A, x)), scale(v3(), B, y));
  return [pt(lo, lo), pt(hi, lo), pt(hi, hi), pt(lo, hi)];
}
function ringPoints(f, normal, radius, segments = 48) {
  let n = normalize(v3(), normal), u = normalize(v3(), cross(v3(), Math.abs(n.y) < 0.99 ? v3(0, 1, 0) : v3(1, 0, 0), n)), w = cross(v3(), n, u), pts2 = [];
  for (let i = 0; i <= segments; i++) {
    let a = i / segments * Math.PI * 2;
    pts2.push(add(v3(), f.pivot, add(v3(), scale(v3(), u, Math.cos(a) * radius), scale(v3(), w, Math.sin(a) * radius))));
  }
  return pts2;
}
function drawHandle(cam2, f, hot) {
  let hotColor = Colors.axisHot;
  if (f.kind === "rotate") {
    for (let i of visibleAxes(f)) {
      if (f.is2D && i !== 2) continue;
      let axis = ["x", "y", "z"][i];
      ring(f.pivot, f.axes[i], f.size, hot === axis ? hotColor : axisColor(i), 64, !1, !f.is2D);
    }
    f.is2D, ring(f.pivot, cameraForward(cam2), f.size * 1.15, hot === "view" ? hotColor : Colors.axisView, 64);
    return;
  }
  for (let i of visibleAxes(f)) {
    let axis = ["x", "y", "z"][i], col = hot === axis ? hotColor : axisColor(i), tip = scaleAndAdd(v3(), f.pivot, f.axes[i], f.size);
    thickLine(f.pivot, tip, col, 2), f.kind === "move" ? cone(scaleAndAdd(v3(), f.pivot, f.axes[i], f.size * 0.82), f.axes[i], f.size * 0.22, f.size * 0.07, col) : cube(tip, f.size * 0.06, f.axes[0], f.axes[1], f.axes[2], col);
  }
  if (f.kind === "move") {
    for (let p of visiblePlanes(f)) {
      let q = planeQuad(cam2, f, p), col = hot === p.axis ? hotColor : axisColor(p.n);
      quad(q[0], q[1], q[2], q[3], withAlpha(col, hot === p.axis ? 110 : 60), !0), quad(q[0], q[1], q[2], q[3], col, !1);
    }
    square(f.pivot, 5, hot === "free" ? hotColor : Colors.axisView, !1);
  } else
    cube(f.pivot, f.size * 0.08, f.axes[0], f.axes[1], f.axes[2], hot === "free" ? hotColor : Colors.axisView);
}
function hitHandle(cam2, f, mx, my) {
  let sp = toScreen(cam2, f.pivot);
  if (!sp.visible) return null;
  if (f.kind === "rotate") {
    let best2 = null, bestD2 = HIT_PX, test = (axis, pts2) => {
      let prev = toScreen(cam2, pts2[0]);
      for (let i = 1; i < pts2.length; i++) {
        let cur = toScreen(cam2, pts2[i]), d = distToSegment(mx, my, prev.x, prev.y, cur.x, cur.y).dist;
        d < bestD2 && (bestD2 = d, best2 = axis), prev = cur;
      }
    };
    for (let i of visibleAxes(f))
      f.is2D && i !== 2 || test(["x", "y", "z"][i], ringPoints(f, f.axes[i], f.size));
    return f.is2D && test("z", ringPoints(f, f.axes[2], f.size)), test("view", ringPoints(f, cameraForward(cam2), f.size * 1.15)), best2;
  }
  if (Math.hypot(mx - sp.x, my - sp.y) <= (f.kind === "scale" ? 9 : 7)) return "free";
  let best = null, bestD = HIT_PX;
  for (let i of visibleAxes(f)) {
    let tip = toScreen(cam2, scaleAndAdd(v3(), f.pivot, f.axes[i], f.size * 1.05)), d = distToSegment(mx, my, sp.x, sp.y, tip.x, tip.y).dist;
    d < bestD && (bestD = d, best = ["x", "y", "z"][i]);
  }
  if (best) return best;
  if (f.kind === "move")
    for (let p of visiblePlanes(f)) {
      let q = planeQuad(cam2, f, p).map((w) => toScreen(cam2, w));
      if (pointInPolygon(mx, my, q)) return p.axis;
    }
  return null;
}
function snapStep(v, step) {
  return step > 0 ? Math.round(v / step) * step : v;
}
function effectiveElements(elements) {
  return elements.filter((e) => e.part === "knot" || !elements.some((o) => o.part === "knot" && o.comp === e.comp && o.spline === e.spline && o.knot === e.knot));
}
function captureStarts(elements) {
  return effectiveElements(elements).map((e) => {
    let k = getKnot(e), isKnot = e.part === "knot";
    return {
      e,
      pos: elementWorldPosition(e),
      rot: isKnot ? knotWorldRotation(e.comp, k) : null,
      tin: isKnot ? tangentWorldVec(e.comp, e.spline, e.knot, "in") : null,
      tout: isKnot ? tangentWorldVec(e.comp, e.spline, e.knot, "out") : null,
      tvec: isKnot ? null : tangentWorldVec(e.comp, e.spline, e.knot, e.part)
    };
  });
}
function startHandleDrag(cam2, f, axis, mx, my, elements) {
  let starts = captureStarts(elements);
  return starts.length ? f.kind === "move" ? moveDrag(cam2, f, axis, mx, my, starts) : f.kind === "rotate" ? rotateDrag(cam2, f, axis, mx, my, starts) : scaleDrag(cam2, f, axis, mx, my, starts) : null;
}
function constraintPoint(cam2, f, axis, mx, my) {
  let ray = screenRay(cam2, mx, my);
  if (axis in AXIS_INDEX) return closestOnLine(ray, f.pivot, f.axes[AXIS_INDEX[axis]]);
  if (axis === "free") return rayPlane(ray, f.pivot, cameraForward(cam2), !0);
  let p = PLANES.find((pl) => pl.axis === axis);
  return p ? rayPlane(ray, f.pivot, f.axes[p.n], !0) : null;
}
function moveDrag(cam2, f, axis, mx, my, starts) {
  let start = constraintPoint(cam2, f, axis, mx, my);
  return start ? {
    frame: f,
    axis,
    update(x, y, ev) {
      let cur = constraintPoint(cam2, f, axis, x, y);
      if (!cur) return "";
      let delta = sub(v3(), cur, start), snap = snapConfig();
      if (snap.isPositionSnapEnabled !== !!(ev != null && ev.ctrlKey)) {
        let steps = [snap.position.x, snap.position.y, snap.position.z], out = v3();
        for (let i = 0; i < 3; i++) scaleAndAdd(out, out, f.axes[i], snapStep(dot(delta, f.axes[i]), steps[i]));
        copy(delta, out);
      }
      for (let s of starts) {
        let target = add(v3(), s.pos, delta);
        s.e.part === "knot" ? setKnotWorld(s.e.comp, s.e.spline, s.e.knot, target) : setTangentWorld(s.e.comp, s.e.spline, s.e.knot, s.e.part, target);
      }
      return `\u0394 ${[dot(delta, f.axes[0]), dot(delta, f.axes[1]), dot(delta, f.axes[2])].map((n) => n.toFixed(3)).join(", ")}`;
    }
  } : null;
}
function signedAngle(a, b, n) {
  return Math.atan2(dot(cross(v3(), a, b), n), dot(a, b));
}
function rotateDrag(cam2, f, axis, mx, my, starts) {
  let n = axis === "view" ? scale(v3(), cameraForward(cam2), -1) : copy(v3(), f.axes[AXIS_INDEX[axis] ?? 2]), pivot = copy(v3(), f.pivot), sp = toScreen(cam2, pivot), onPlane = (x, y) => {
    let hit = rayPlane(screenRay(cam2, x, y), pivot, n, !0);
    if (!hit) return null;
    let v = sub(v3(), hit, pivot);
    return lenSq(v) > 1e-6 ? v : null;
  }, v0 = Math.abs(dot(n, cameraForward(cam2))) < 0.15 ? null : onPlane(mx, my), a0 = Math.atan2(my - sp.y, mx - sp.x), screenSign = dot(n, cameraForward(cam2)) > 0 ? 1 : -1;
  return {
    frame: f,
    axis,
    update(x, y, ev) {
      let angle, v1 = v0 ? onPlane(x, y) : null;
      v0 && v1 ? angle = signedAngle(v0, v1, n) : angle = (Math.atan2(y - sp.y, x - sp.x) - a0) * -screenSign;
      let snap = snapConfig(), deg = angle * 180 / Math.PI;
      snap.isRotationSnapEnabled !== !!(ev != null && ev.ctrlKey) && (deg = snapStep(deg, snap.rotation || 15));
      let q = qFromAxisAngle(q4(), n, deg * Math.PI / 180), many = starts.length > 1;
      for (let s of starts) {
        let e = s.e, k = getKnot(e);
        if (k)
          if (e.part === "knot") {
            if (many || len(sub(v3(), s.pos, pivot)) > 1e-6) {
              let p = add(v3(), pivot, qRotate(v3(), q, sub(v3(), s.pos, pivot)));
              setKnotWorld(e.comp, e.spline, e.knot, p);
            }
            setKnotWorldRotation(e.comp, k, qMul(q4(), q, s.rot)), applyTangentMode(e.comp.splines[e.spline], e.knot);
          } else
            setTangentWorldVec(e.comp, e.spline, e.knot, e.part, qRotate(v3(), q, s.tvec));
      }
      return `${deg.toFixed(1)}\xB0`;
    }
  };
}
function scaleDrag(cam2, f, axis, mx, my, starts) {
  let pivot = copy(v3(), f.pivot), sp = toScreen(cam2, pivot), dirX = 1, dirY = 0, screenLen = 80;
  if (axis in AXIS_INDEX) {
    let tip = toScreen(cam2, scaleAndAdd(v3(), pivot, f.axes[AXIS_INDEX[axis]], f.size)), dx = tip.x - sp.x, dy = tip.y - sp.y, l = Math.hypot(dx, dy);
    l > 1 && (dirX = dx / l, dirY = dy / l, screenLen = l);
  }
  let ax = f.axes, scaleVec = (v, s) => {
    let out = v3();
    for (let i = 0; i < 3; i++) scaleAndAdd(out, out, ax[i], dot(v, ax[i]) * s[i]);
    return out;
  };
  return {
    frame: f,
    axis,
    update(x, y, ev) {
      let factor;
      axis === "free" ? factor = 1 + (x - mx + (y - my)) / 120 : factor = 1 + ((x - mx) * dirX + (y - my) * dirY) / screenLen;
      let snap = snapConfig();
      snap.isScaleSnapEnabled !== !!(ev != null && ev.ctrlKey) && (factor = 1 + snapStep(factor - 1, snap.scale || 0.1));
      let s = axis === "free" ? [factor, factor, factor] : [1, 1, 1];
      axis in AXIS_INDEX && (s[AXIS_INDEX[axis]] = factor);
      let many = starts.length > 1;
      for (let st of starts) {
        let e = st.e, k = getKnot(e);
        if (k)
          if (e.part === "knot") {
            many && setKnotWorld(e.comp, e.spline, e.knot, add(v3(), pivot, scaleVec(sub(v3(), st.pos, pivot), s)));
            let spline = e.comp.splines[e.spline];
            if (tangentsEditable(k.mode)) {
              let tin = scaleVec(st.tin, s), tout = scaleVec(st.tout, s);
              if (setTangentWorldVec(e.comp, e.spline, e.knot, "out", tout), k.mode === 4 /* Broken */) setTangentWorldVec(e.comp, e.spline, e.knot, "in", tin);
              else if (k.mode === 3 /* Continuous */) {
                let dir = normalize(v3(), tangentWorldVec(e.comp, e.spline, e.knot, "in"));
                lenSq(dir) > 1e-6 && setTangentWorldVec(e.comp, e.spline, e.knot, "in", scale(v3(), dir, len(tin)));
              }
            }
            applyTangentMode(spline, e.knot);
          } else
            setTangentWorldVec(e.comp, e.spline, e.knot, e.part, scaleVec(st.tvec, s));
      }
      return `\xD7 ${factor.toFixed(3)}`;
    }
  };
}

// source/scene/context.ts
var BROADCAST_MS = 60;
function updateTargets() {
  let targets = currentTargets(), key = targets.map((c2) => c2.uuid).join(",");
  key !== S.targetsKey && (S.targetsKey = key, bumpState()), S.lastTargets = targets, S.selection.validate(targets) && bumpState();
  let pending = S.pendingContext;
  return pending && (targets.includes(pending.comp) ? (S.pendingContext = null, setContext(!0), setTool(pending.tool)) : Date.now() > pending.until && (S.pendingContext = null)), targets.length ? S.drawing && !targets.includes(S.drawing.comp) && (S.drawing = null) : (S.context && setContext(!1), S.drawing && (S.drawing = null)), targets;
}
function setContext(on) {
  S.context !== on && (S.context = on, on || (S.selection.clear(), S.tool = "select", S.drawing = null, S.preview = null, S.hover = null), bumpState(), repaint());
}
function setTool(tool) {
  tool === "draw" && setContext(!0), S.tool !== tool && (S.tool = tool, S.drawing = null, S.preview = null, S.hover = null, bumpState(), repaint());
}
function shared(values, eq = (a, b) => a === b) {
  return values.length && values.every((v) => eq(v, values[0])) ? values[0] : null;
}
function round(v) {
  return Math.round(v * 1e4) / 1e4;
}
function elementInfo(list) {
  if (!list.length) return null;
  let knots = list.filter((e) => e.part === "knot"), items = knots.length ? knots : list, ks = items.map((e) => getKnot(e)).filter(Boolean);
  if (!ks.length) return null;
  let pos = (axis) => shared(ks.map((k) => round(k.position[axis]))), eulers = ks.map((k) => qToEuler(v3(), k.rotation)), rot = (axis) => shared(eulers.map((e) => round(e[axis]))), tin = shared(ks.map((k) => round(len(tangentInVec(v3(), k))))), tout = shared(ks.map((k) => round(len(tangentOutVec(v3(), k))))), first = items[0], kind = knots.length ? "knot" : "tangent", label;
  return items.length === 1 ? label = kind === "knot" ? `Knot ${first.knot}` + (first.comp.splines.length > 1 ? ` (Spline ${first.spline})` : "") : `${first.part === "in" ? "In" : "Out"} Tangent of Knot ${first.knot}` : label = `${items.length} ${kind === "knot" ? "Knots" : "Tangents"}`, {
    kind,
    count: list.length,
    knots: knots.length,
    label,
    position: [pos("x"), pos("y"), pos("z")],
    rotation: [rot("x"), rot("y"), rot("z")],
    mode: shared(ks.map((k) => k.mode)),
    tension: shared(ks.map((k) => round(k.tension))),
    tangentIn: tin,
    tangentOut: tout,
    linked: knots.some((e) => isLinked(e.comp, { spline: e.spline, knot: e.knot }))
  };
}
function availableActions() {
  let knots = S.selection.knots(), sameComp = knots.length > 0 && knots.every((e) => e.comp === knots[0].comp), ends = knots.filter((e) => isEndKnot(e.comp.splines[e.spline], e.knot)), one = knots.length === 1 ? knots[0] : null, oneSpline = one ? one.comp.splines[one.spline] : null;
  return {
    delete: S.selection.size > 0,
    link: knots.length >= 2 && sameComp,
    unlink: knots.some((e) => isLinked(e.comp, { spline: e.spline, knot: e.knot })),
    split: !!one && !!oneSpline && (oneSpline.closed || one.knot > 0 && one.knot < oneSpline.knots.length - 1),
    join: knots.length === 2 && sameComp && ends.length === 2,
    reverse: knots.length > 0 || S.lastTargets.length > 0,
    close: S.lastTargets.length > 0,
    selectAll: S.lastTargets.length > 0
  };
}
function closedState() {
  let knots = S.selection.all(), splines = /* @__PURE__ */ new Set();
  for (let e of knots) {
    let s = e.comp.splines[e.spline];
    s && splines.add(s);
  }
  if (!splines.size) for (let c2 of S.lastTargets) for (let s of c2.splines) splines.add(s);
  return splines.size ? shared([...splines].map((s) => !!s.closed)) : null;
}
function panelState() {
  S.selection.validate(S.lastTargets) && bumpState();
  let list = S.selection.all();
  return {
    primary: S.primary,
    ready: !0,
    context: S.context,
    tool: S.tool,
    drawing: !!S.drawing,
    is2D: is2DView(),
    transformTool: transformToolName(),
    settings: { ...S.settings },
    targets: S.lastTargets.map((c2) => ({
      uuid: c2.uuid,
      node: c2.node.uuid,
      name: c2.node.name,
      splines: c2.splines.length,
      knots: c2.splines.reduce((a, s) => a + s.knots.length, 0)
    })),
    selection: { count: list.length, knots: S.selection.knots().length, tangents: S.selection.tangents().length },
    element: elementInfo(list),
    actions: availableActions(),
    closed: closedState()
  };
}
var lastSent = "", lastSentAt = 0, timer = null;
function maybeBroadcast(force = !1) {
  if (!S.primary) return;
  let now = Date.now(), wait = BROADCAST_MS - (now - lastSentAt);
  if (!force && wait > 0) {
    timer || (timer = setTimeout(() => {
      timer = null, maybeBroadcast();
    }, wait));
    return;
  }
  let json, state = panelState();
  try {
    json = JSON.stringify(state);
  } catch {
    return;
  }
  if (!(!force && json === lastSent)) {
    lastSent = json, lastSentAt = now;
    try {
      Editor.Message.broadcast("splines:state", state);
    } catch {
    }
  }
}

// source/scene/render.ts
var KNOT_PX = 5, TANGENT_PX = 3.5, HIT_KNOT = 8, HIT_TANGENT = 7, HIT_CURVE = 6, _wc = curve();
function worldCurve(comp, spline, i, out = _wc) {
  return getCurve(spline, i, out), toWorld(comp, out.p0, out.p0), toWorld(comp, out.p1, out.p1), toWorld(comp, out.p2, out.p2), toWorld(comp, out.p3, out.p3), out;
}
function curveSamples(cam2, c2) {
  let a = toScreen(cam2, c2.p0), b = toScreen(cam2, c2.p1), d = toScreen(cam2, c2.p2), e = toScreen(cam2, c2.p3);
  if (!a.visible && !e.visible) return 8;
  let l = Math.hypot(b.x - a.x, b.y - a.y) + Math.hypot(d.x - b.x, d.y - b.y) + Math.hypot(e.x - d.x, e.y - d.y);
  return Math.max(4, Math.min(64, Math.ceil(l / 10)));
}
var pts = [];
function samplePoints(cam2, c2) {
  let n = curveSamples(cam2, c2);
  for (; pts.length <= n; ) pts.push(v3());
  for (let i = 0; i <= n; i++) evalPosition(pts[i], c2, i / n);
  return pts.slice(0, n + 1);
}
function visibleTangents(targets) {
  let set2 = /* @__PURE__ */ new Set();
  if (!S.context) return set2;
  let addTangent = (comp, s, k, part, allowAuto) => {
    let spline = comp.splines[s], knot = spline == null ? void 0 : spline.knots[k];
    !knot || !tangentUsed(spline, k, part) || !tangentsEditable(knot.mode) && !(allowAuto && knot.mode === 0 /* AutoSmooth */) || set2.add(`${comp.uuid}:${s}:${k}:${part}`);
  };
  if (S.settings.showAllTangents)
    for (let comp of targets)
      comp.splines.forEach((spline, s) => {
        for (let k = 0; k < spline.knots.length; k++)
          addTangent(comp, s, k, "in", !1), addTangent(comp, s, k, "out", !1);
      });
  for (let e of S.selection.all()) {
    let spline = e.comp.splines[e.spline];
    if (!spline) continue;
    let n = spline.knots.length;
    addTangent(e.comp, e.spline, e.knot, "in", e.part === "knot"), addTangent(e.comp, e.spline, e.knot, "out", e.part === "knot");
    let p = prevIndex(e.knot, n, spline.closed), q = nextIndex(e.knot, n, spline.closed);
    p !== e.knot && addTangent(e.comp, e.spline, p, "out", !1), q !== e.knot && addTangent(e.comp, e.spline, q, "in", !1);
  }
  return set2;
}
function hoverIs(kind, comp, s, k, part) {
  let h = S.hover;
  if (!h || h.kind !== kind) return !1;
  let r = h.ref;
  return r.comp === comp && r.spline === s && r.knot === k && r.part === part;
}
function hoverCurve(comp, s, i) {
  let h = S.hover;
  return !!h && h.kind === "curve" && h.comp === comp && h.spline === s && h.curve === i;
}
var handleAxesOverride = null;
function setHandleAxesOverride(axes) {
  handleAxesOverride = axes;
}
function currentHandleFrame(cam2) {
  if (!S.context || S.tool !== "select") return null;
  let list = S.selection.all();
  return list.length ? computeFrame(cam2, list, handleAxesOverride) : null;
}
function drawFrame() {
  var _a2;
  if (!runtimeReady()) return;
  let cam2 = sceneCamera();
  if (!cam2) return;
  let targets = updateTargets(), containers = S.settings.showAll ? allContainers() : targets;
  if (!containers.length && !S.preview) {
    endLabels();
    return;
  }
  if (!beginDraw(cam2)) return;
  S.diag.draws++, beginLabels();
  let tangents = visibleTangents(targets);
  for (let comp of containers)
    try {
      drawContainer(cam2, comp, targets.includes(comp), tangents);
    } catch (e) {
      S.diag.errors.length < 30 && S.diag.errors.push(String((e == null ? void 0 : e.stack) || e));
    }
  if (S.context && S.tool === "select") {
    let f = currentHandleFrame(cam2);
    f && drawHandle(cam2, f, ((_a2 = S.hover) == null ? void 0 : _a2.kind) === "handle" ? S.hover.axis : dragAxis);
  }
  drawToolPreview(cam2), endLabels();
}
var dragAxis = null;
function setDragAxis(a) {
  dragAxis = a;
}
var previewDrawer = null;
function setPreviewDrawer(fn) {
  previewDrawer = fn;
}
function drawToolPreview(cam2) {
  previewDrawer && previewDrawer(cam2);
}
var _p = v3(), _q = v3();
function drawContainer(cam2, comp, isTarget, tangents) {
  let edit = isTarget && S.context;
  comp.splines.forEach((spline, s) => {
    let count = curveCount(spline);
    for (let i = 0; i < count; i++) {
      let c2 = worldCurve(comp, spline, i), points = samplePoints(cam2, c2), col = isTarget ? Colors.curveSelected : Colors.curveDim;
      if (edit && hoverCurve(comp, s, i) && (col = Colors.curveHover), polyline(points, col, isTarget ? 2 : 1), isTarget && S.settings.showFlow && points.length > 2 && (evalPosition(_p, c2, 0.5), evalDirection(_q, c2, 0.5), chevron(_p, _q, 7, Colors.flow)), isTarget && S.settings.showNormals)
        for (let j = 0; j <= 4; j++) {
          let t = j / 4;
          if (j === 4 && i < count - 1) continue;
          evalPosition(_p, c2, t);
          let up = upAt(comp, spline, i, t), l = worldPerPixel(cam2, _p) * 22;
          line(_p, scaleAndAdd(v3(), _p, up, l), Colors.normal);
        }
    }
    if (!isTarget) return;
    let n = spline.knots.length;
    for (let k = 0; k < n; k++) {
      let pos = knotWorldPosition(comp, s, k, v3()), sp = toScreen(cam2, pos);
      if (sp.visible) {
        if (edit)
          for (let part of ["in", "out"])
            tangents.has(`${comp.uuid}:${s}:${k}:${part}`) && drawTangent(cam2, comp, s, k, part, pos);
        drawKnot(cam2, comp, s, k, pos, edit), S.settings.showKnotIndices && edit && addLabel(cam2, sp.x, sp.y, n > 0 && spline.closed === !1 && k === 0 ? `${k} (start)` : String(k), "#ddd");
      }
    }
    if (n === 1 && edit) {
      let k = spline.knots[0], pos = knotWorldPosition(comp, s, 0, v3()), dir = dirToWorld(comp, rotateZ(k), v3());
      chevron(scaleAndAdd(v3(), pos, normalize(v3(), dir), worldPerPixel(cam2, pos) * 22), dir, 7, Colors.flow);
    }
  });
}
function rotateZ(k) {
  let q = k.rotation, x = 2 * (q.x * q.z + q.w * q.y), y = 2 * (q.y * q.z - q.w * q.x), z = 1 - 2 * (q.x * q.x + q.y * q.y);
  return v3(x, y, z);
}
function upAt(comp, spline, curveIndex, t) {
  try {
    let local = curveUp(spline, spline.cache, curveIndex, t, v3()), w = dirToWorld(comp, local, v3());
    return lenSq(w) > 0 ? normalize(w, w) : v3(0, 1, 0);
  } catch {
    return v3(0, 1, 0);
  }
}
function drawKnot(cam2, comp, s, k, pos, edit) {
  let selected = edit && S.selection.hasKnot(comp, s, k), hovered = edit && hoverIs("knot", comp, s, k, "knot"), linked = isLinked(comp, { spline: s, knot: k });
  if (!edit) {
    disc(pos, 3, Colors.curveSelected, 10);
    return;
  }
  let r = selected || hovered ? KNOT_PX + 1 : KNOT_PX;
  if (disc(pos, r, selected ? Colors.selected : Colors.knot, 14), circle(pos, r, hovered ? Colors.hover : linked ? Colors.linked : Colors.knotOutline, 14), selected) {
    let knot = comp.splines[s].knots[k], wpp = worldPerPixel(cam2, pos), fwd = normalize(v3(), dirToWorld(comp, rotateZ(knot), v3())), upLocal = upOf(knot), up = normalize(v3(), dirToWorld(comp, upLocal, v3()));
    lenSq(up) > 0 && line(pos, scaleAndAdd(v3(), pos, up, wpp * 20), Colors.normal), lenSq(fwd) > 0 && knot.mode === 1 /* Linear */ && line(pos, scaleAndAdd(v3(), pos, fwd, wpp * 14), Colors.selected);
  }
}
function upOf(k) {
  let q = k.rotation, x = 2 * (q.x * q.y - q.w * q.z), y = 1 - 2 * (q.x * q.x + q.z * q.z), z = 2 * (q.y * q.z + q.w * q.x);
  return v3(x, y, z);
}
function drawTangent(cam2, comp, s, k, part, knotPos) {
  let end = tangentWorldPosition(comp, s, k, part, v3()), ref = { comp, spline: s, knot: k, part }, selected = S.selection.has(ref), hovered = hoverIs("tangent", comp, s, k, part), auto = comp.splines[s].knots[k].mode === 0 /* AutoSmooth */, lineCol = selected ? Colors.selected : auto ? withAlpha(Colors.tangentLine, 120) : Colors.tangentLine;
  line(knotPos, end, lineCol);
  let col = selected ? Colors.selected : hovered ? Colors.hover : auto ? withAlpha(Colors.tangent, 140) : Colors.tangent;
  diamond(end, hovered || selected ? TANGENT_PX + 1 : TANGENT_PX, col, !0);
}
function hitTest(cam2, mx, my, opts = {}) {
  let targets = S.lastTargets;
  if (!targets.length) return null;
  if (S.context && opts.handles !== !1) {
    let f = currentHandleFrame(cam2);
    if (f) {
      let axis = hitHandle(cam2, f, mx, my);
      if (axis) return { kind: "handle", axis };
    }
  }
  let sp = { x: 0, y: 0, visible: !0 };
  if (S.context) {
    let best = null, bestD = HIT_TANGENT;
    for (let key of visibleTangents(targets)) {
      let [uuid, ss, kk, part] = key.split(":"), comp = targets.find((c2) => c2.uuid === uuid);
      if (!comp) continue;
      let s = Number(ss), k = Number(kk);
      if (toScreen(cam2, tangentWorldPosition(comp, s, k, part), sp), !sp.visible) continue;
      let d = Math.hypot(sp.x - mx, sp.y - my);
      d < bestD && (bestD = d, best = { kind: "tangent", ref: { comp, spline: s, knot: k, part } });
    }
    if (best) return best;
  }
  if (S.context || opts.outsideContext) {
    let best = null, bestD = HIT_KNOT;
    for (let comp of targets)
      comp.splines.forEach((spline, s) => {
        for (let k = 0; k < spline.knots.length; k++) {
          if (toScreen(cam2, knotWorldPosition(comp, s, k), sp), !sp.visible) continue;
          let d = Math.hypot(sp.x - mx, sp.y - my);
          d < bestD && (bestD = d, best = { kind: "knot", ref: { comp, spline: s, knot: k, part: "knot" } });
        }
      });
    if (best) return best;
  }
  return opts.curves !== !1 && (S.context || opts.outsideContext) ? hitCurve(cam2, mx, my, targets) : null;
}
function hitCurve(cam2, mx, my, targets, maxPx = HIT_CURVE) {
  let best = null, bestD = maxPx, a = { x: 0, y: 0, visible: !0 }, b = { x: 0, y: 0, visible: !0 };
  for (let comp of targets)
    comp.splines.forEach((spline, s) => {
      let count = curveCount(spline);
      for (let i = 0; i < count; i++) {
        let c2 = worldCurve(comp, spline, i, curve()), n = curveSamples(cam2, c2) * 2, p = v3();
        evalPosition(p, c2, 0), toScreen(cam2, p, a);
        for (let j = 1; j <= n; j++) {
          if (evalPosition(p, c2, j / n), toScreen(cam2, p, b), a.visible && b.visible) {
            let r = distToSegment(mx, my, a.x, a.y, b.x, b.y);
            if (r.dist < bestD) {
              bestD = r.dist;
              let t = (j - 1 + r.f) / n;
              best = { kind: "curve", comp, spline: s, curve: i, t, world: evalPosition(v3(), c2, t) };
            }
          }
          a.x = b.x, a.y = b.y, a.visible = b.visible;
        }
      }
    });
  return best;
}
function knotsInRect(cam2, x0, y0, x1, y1) {
  let minX = Math.min(x0, x1), maxX = Math.max(x0, x1), minY = Math.min(y0, y1), maxY = Math.max(y0, y1), res = [], sp = { x: 0, y: 0, visible: !0 };
  for (let comp of S.lastTargets)
    comp.splines.forEach((spline, s) => {
      for (let k = 0; k < spline.knots.length; k++)
        toScreen(cam2, knotWorldPosition(comp, s, k), sp), sp.visible && sp.x >= minX && sp.x <= maxX && sp.y >= minY && sp.y <= maxY && res.push({ comp, spline: s, knot: k, part: "knot" });
    });
  return res;
}

// source/scene/undo.ts
async function request(name, ...args) {
  return Editor.Message.request("scene", name, ...args);
}
async function beginRecording(uuids) {
  if (!uuids.length) return null;
  try {
    let id = await request("begin-recording", uuids);
    return typeof id == "string" && id ? id : null;
  } catch (e) {
    return console.warn("[Splines] begin-recording failed:", e), null;
  }
}
async function endRecording(id, cancel = !1) {
  if (id)
    try {
      await request(cancel ? "cancel-recording" : "end-recording", id);
    } catch (e) {
      console.warn("[Splines] end-recording failed:", e);
    }
}
function nodesOf(comps) {
  let set2 = /* @__PURE__ */ new Set();
  for (let c2 of comps) c2 && c2.isValid && c2.node && c2.node.isValid && set2.add(c2.node);
  return [...set2];
}
function afterEdit(comps) {
  var _a2, _b2;
  for (let c2 of comps)
    if (!(!c2 || !c2.isValid)) {
      for (let s of c2.splines) (_a2 = s.markDirty) == null || _a2.call(s);
      try {
        (_b2 = c2.checkChanged) == null || _b2.call(c2);
      } catch {
      }
    }
  for (let n of nodesOf(comps)) notifyNodeChanged(n);
  repaint();
}
async function recordEdit(comps, fn) {
  let id = await beginRecording(nodesOf(comps).map((n) => n.uuid)), ok = !1;
  try {
    fn(), ok = !0;
  } finally {
    afterEdit(comps), await endRecording(id, !ok);
  }
}
var NOTIFY_MS = 120, EditSession = class {
  constructor(comps) {
    this.comps = comps;
    this.id = null;
    this.opened = !1;
    this.ended = !1;
    this.pending = null;
    this.changed = !1;
    this.notifiedAt = 0;
    this.ready = beginRecording(nodesOf(comps).map((n) => n.uuid)).then((id) => {
      if (this.id = id, this.opened = !0, this.pending && !this.ended) {
        let fn = this.pending;
        this.pending = null, this.run(fn);
      }
    });
  }
  /** Applies an edit (now, or as soon as the recording is open). */
  apply(fn) {
    if (!this.ended) {
      if (!this.opened) {
        this.pending = fn;
        return;
      }
      this.run(fn);
    }
  }
  run(fn) {
    var _a2;
    fn(), this.changed = !0;
    for (let c2 of this.comps) for (let s of c2.splines) (_a2 = s.markDirty) == null || _a2.call(s);
    let now = Date.now();
    if (now - this.notifiedAt > NOTIFY_MS) {
      this.notifiedAt = now;
      for (let n of nodesOf(this.comps)) notifyNodeChanged(n);
    }
    repaint();
  }
  async end() {
    if (!this.ended) {
      if (this.ended = !0, await this.ready, this.pending) {
        let fn = this.pending;
        this.pending = null, this.run(fn);
      }
      this.changed && afterEdit(this.comps), await endRecording(this.id, !this.changed);
    }
  }
};

// source/scene/ops.ts
function compsOf(list) {
  return [...new Set(list.map((e) => e.comp))];
}
function touched() {
  bumpState(), maybeBroadcast(), repaint();
}
async function deleteSelection() {
  let list = S.selection.all();
  if (!list.length) return;
  let comps = compsOf(list);
  await recordEdit(comps, () => {
    for (let e of list) {
      if (e.part === "knot" || S.selection.hasKnot(e.comp, e.spline, e.knot)) continue;
      let spline = e.comp.splines[e.spline], k = spline == null ? void 0 : spline.knots[e.knot];
      k && (k.mode !== 4 /* Broken */ && setTangentMode(spline, e.knot, 4 /* Broken */), set(e.part === "in" ? k.tangentIn : k.tangentOut, 0, 0, 0));
    }
    for (let comp of comps) {
      let refs = list.filter((e) => e.comp === comp && e.part === "knot").map((e) => ({ spline: e.spline, knot: e.knot }));
      refs.length && containerRemoveKnots(comp, refs);
    }
  }), S.selection.clear(), touched();
}
async function setModeSelected(mode) {
  let knots = selectedOwnerKnots();
  knots.length && (await recordEdit(compsOf(knots), () => {
    for (let e of knots) setTangentMode(e.comp.splines[e.spline], e.knot, mode);
  }), touched());
}
function selectedOwnerKnots() {
  let seen = /* @__PURE__ */ new Set(), res = [];
  for (let e of S.selection.all()) {
    let key = `${e.comp.uuid}:${e.spline}:${e.knot}`;
    seen.has(key) || !getKnot(e) || (seen.add(key), res.push({ ...e, part: "knot" }));
  }
  return res;
}
var CYCLE = [1 /* Linear */, 0 /* AutoSmooth */, 2 /* Mirrored */, 3 /* Continuous */, 4 /* Broken */];
async function cycleModeSelected() {
  let knots = selectedOwnerKnots();
  if (!knots.length) return;
  let k = getKnot(knots[0]), next = CYCLE[(CYCLE.indexOf(k.mode) + 1) % CYCLE.length];
  await setModeSelected(next);
}
async function linkSelected() {
  let knots = S.selection.knots();
  if (knots.length < 2 || !knots.every((e) => e.comp === knots[0].comp)) return;
  let comp = knots[0].comp, ordered = [knots[knots.length - 1], ...knots.slice(0, -1)];
  await recordEdit([comp], () => linkKnots(comp, ordered.map((e) => ({ spline: e.spline, knot: e.knot })), factory)), touched();
}
async function unlinkSelected() {
  let knots = S.selection.knots();
  knots.length && (await recordEdit(compsOf(knots), () => {
    for (let comp of compsOf(knots))
      unlinkKnots(comp, knots.filter((e) => e.comp === comp).map((e) => ({ spline: e.spline, knot: e.knot })));
  }), touched());
}
async function splitSelected() {
  let knots = S.selection.knots();
  if (knots.length !== 1) return;
  let e = knots[0], res = null;
  await recordEdit([e.comp], () => {
    res = splitKnot(e.comp, { spline: e.spline, knot: e.knot }, factory);
  });
  let r = res;
  r && S.selection.set([{ comp: e.comp, spline: r.spline, knot: r.knot, part: "knot" }]), touched();
}
async function joinSelected() {
  let knots = S.selection.knots();
  if (knots.length !== 2 || knots[0].comp !== knots[1].comp) return;
  let comp = knots[0].comp, a = knots[1], b = knots[0], res = null;
  await recordEdit([comp], () => {
    res = joinKnots(comp, { spline: a.spline, knot: a.knot }, { spline: b.spline, knot: b.knot }, factory);
  });
  let r = res;
  S.selection.set(r ? [{ comp, spline: r.spline, knot: r.knot, part: "knot" }] : []), touched();
}
function selectedSplines() {
  let list = S.selection.all(), res = [], add2 = (comp, spline) => {
    res.some((r) => r.comp === comp && r.spline === spline) || res.push({ comp, spline });
  };
  if (list.length) for (let e of list) add2(e.comp, e.spline);
  else for (let comp of S.lastTargets) comp.splines.forEach((_, i) => add2(comp, i));
  return res;
}
async function reverseSelected() {
  let splines = selectedSplines();
  if (!splines.length) return;
  let before = S.selection.all().map((e) => {
    var _a2;
    return { ...e, count: ((_a2 = e.comp.splines[e.spline]) == null ? void 0 : _a2.knots.length) ?? 0 };
  });
  await recordEdit([...new Set(splines.map((s) => s.comp))], () => {
    for (let s of splines) containerReverse(s.comp, s.spline);
  }), S.selection.set(before.map((e) => ({
    comp: e.comp,
    spline: e.spline,
    knot: e.count - 1 - e.knot,
    part: e.part === "in" ? "out" : e.part === "out" ? "in" : "knot"
  }))), touched();
}
async function setClosedSelected(closed) {
  let splines = selectedSplines();
  if (!splines.length) return;
  let target = closed ?? !splines.every((s) => s.comp.splines[s.spline].closed);
  await recordEdit([...new Set(splines.map((s) => s.comp))], () => {
    for (let s of splines) {
      let spline = s.comp.splines[s.spline];
      (spline.knots.length >= 2 || !target) && setClosed(spline, target);
    }
  }), touched();
}
function selectAll() {
  let list = [];
  for (let comp of S.lastTargets)
    comp.splines.forEach((spline, s) => {
      for (let k = 0; k < spline.knots.length; k++) list.push({ comp, spline: s, knot: k, part: "knot" });
    });
  list.length && (setContext(!0), S.selection.set(list), touched());
}
function clearSelection() {
  S.selection.clear(), touched();
}
async function insertOnCurve2(comp, spline, curveIndex, t) {
  let index = -1;
  await recordEdit([comp], () => {
    index = containerInsertOnCurve(comp, spline, curveIndex, t, factory);
  }), index >= 0 && S.selection.set([{ comp, spline, knot: index, part: "knot" }]), touched();
}
function applyProps(comp, s, k, p) {
  let spline = comp.splines[s], knot = spline == null ? void 0 : spline.knots[k];
  if (knot) {
    if (p.position) {
      let pos = v3(knot.position.x, knot.position.y, knot.position.z);
      p.position[0] != null && (pos.x = p.position[0]), p.position[1] != null && (pos.y = p.position[1]), p.position[2] != null && (pos.z = p.position[2]), setKnotPosition(spline, k, pos), syncLinked(comp, { spline: s, knot: k });
    }
    if (p.rotation) {
      let e = qToEuler(v3(), knot.rotation);
      p.rotation[0] != null && (e.x = p.rotation[0]), p.rotation[1] != null && (e.y = p.rotation[1]), p.rotation[2] != null && (e.z = p.rotation[2]), setRotation(spline, k, qFromEuler(q4(), e.x, e.y, e.z));
    }
    p.mode !== void 0 && p.mode !== null && setTangentMode(spline, k, p.mode), p.tension !== void 0 && p.tension !== null && setTension(spline, k, Math.max(0, Math.min(1, p.tension)));
    for (let part of ["in", "out"]) {
      let value = part === "in" ? p.tangentIn : p.tangentOut;
      if (value == null) continue;
      let cur = part === "in" ? tangentInVec(v3(), knot) : tangentOutVec(v3(), knot), dir = normalize(v3(), cur);
      if (lenSq(dir) < 1e-12) {
        let fwd = tangentOutVec(v3(), { ...knot, tangentOut: { x: 0, y: 0, z: 1 } });
        dir = part === "in" ? scale(v3(), fwd, -1) : fwd;
      }
      setTangentVec(spline, k, part, scale(v3(), dir, Math.max(0, value)));
    }
  }
}
async function setElementProps(props) {
  let knots = selectedOwnerKnots();
  knots.length && (await recordEdit(compsOf(knots), () => {
    for (let e of knots) applyProps(e.comp, e.spline, e.knot, props);
  }), touched());
}
function knotInfo(comp, s, k, knot) {
  let e = qToEuler(v3(), knot.rotation), r = (n) => Math.round(n * 1e4) / 1e4;
  return {
    position: [r(knot.position.x), r(knot.position.y), r(knot.position.z)],
    rotation: [r(e.x), r(e.y), r(e.z)],
    mode: knot.mode,
    tension: r(knot.tension),
    tangentIn: r(len(tangentInVec(v3(), knot))),
    tangentOut: r(len(tangentOutVec(v3(), knot))),
    linked: isLinked(comp, { spline: s, knot: k }),
    selected: S.context && S.selection.hasKnot(comp, s, k)
  };
}
function containerInfo(compUuid) {
  let comp = findComponent(compUuid);
  return !comp || !comp.splines ? null : {
    uuid: comp.uuid,
    node: comp.node.uuid,
    context: S.context && S.lastTargets.includes(comp),
    tool: S.tool,
    drawing: !!S.drawing && S.drawing.comp === comp,
    splines: comp.splines.map((spline, s) => {
      var _a2;
      return {
        closed: !!spline.closed,
        length: Math.round((((_a2 = comp.calculateLength) == null ? void 0 : _a2.call(comp, s)) ?? 0) * 1e3) / 1e3,
        knots: spline.knots.map((knot, k) => knotInfo(comp, s, k, knot))
      };
    }),
    actions: availableActions()
  };
}
async function editKnot(compUuid, s, k, props) {
  let comp = findComponent(compUuid);
  comp && (await recordEdit([comp], () => applyProps(comp, s, k, props)), touched());
}
async function splineAction(compUuid, s, action, arg) {
  let comp = findComponent(compUuid);
  if (!comp) return null;
  switch (action) {
    case "addSpline": {
      await recordEdit([comp], () => {
        let spline = factory.spline();
        comp.splines.push(spline);
      });
      break;
    }
    case "removeSpline":
      comp.splines.length <= 1 ? await recordEdit([comp], () => {
        comp.splines[0].knots.length = 0, comp.splines[0].closed = !1, comp.links.length = 0;
      }) : await recordEdit([comp], () => containerRemoveSpline(comp, s)), S.selection.clear();
      break;
    case "reverse":
      await recordEdit([comp], () => containerReverse(comp, s)), S.selection.clear();
      break;
    case "closed":
      await recordEdit([comp], () => setClosed(comp.splines[s], !!arg));
      break;
    case "addKnot": {
      let spline = comp.splines[s];
      await recordEdit([comp], () => {
        let k = factory.knot(), n = spline.knots.length, last = spline.knots[n - 1], prev = spline.knots[n - 2];
        last && prev ? set(k.position, last.position.x * 2 - prev.position.x, last.position.y * 2 - prev.position.y, last.position.z * 2 - prev.position.z) : last && set(k.position, last.position.x + 1, last.position.y, last.position.z), k.mode = S.settings.defaultMode, k.tension = DEFAULT_TENSION, last && qCopy(k.rotation, last.rotation), spline.knots.push(k), applyTangentMode(spline, spline.knots.length - 1), n > 0 && applyTangentMode(spline, n - 1);
      });
      break;
    }
    case "removeKnot":
      await recordEdit([comp], () => containerRemoveKnots(comp, [{ spline: s, knot: Number(arg) }])), S.selection.clear();
      break;
    case "selectKnot": {
      setContext(!0);
      let e = { comp, spline: s, knot: Number((arg == null ? void 0 : arg.knot) ?? arg), part: "knot" };
      arg != null && arg.additive ? S.selection.toggle(e) : S.selection.set([e]);
      break;
    }
    case "setModeAll":
      await recordEdit([comp], () => {
        let spline = comp.splines[s];
        for (let i = 0; i < spline.knots.length; i++) setTangentMode(spline, i, Number(arg));
      });
      break;
    case "refresh":
      await recordEdit([comp], () => comp.splines.forEach((sp) => refreshAll(sp)));
      break;
  }
  return touched(), containerInfo(compUuid);
}
function niceSize(v) {
  if (!(v > 0)) return 1;
  let p = Math.pow(10, Math.floor(Math.log10(v))), m = v / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}
function viewCenter(is2D) {
  let cam2 = sceneCamera();
  if (!cam2) return { pos: v3(), size: is2D ? 100 : 1 };
  let ray = screenRay(cam2, cam2.width / 2, cam2.height / 2), pos = rayPlane(ray, v3(), is2D ? v3(0, 0, 1) : v3(0, 1, 0));
  if (!pos) {
    let f = cameraForward(cam2), c2 = cameraPosition(cam2);
    pos = v3(c2.x + f.x * 10, c2.y + f.y * 10, c2.z + f.z * 10);
  }
  let size = niceSize(worldPerPixel(cam2, pos) * Math.min(cam2.width, cam2.height) * 0.18);
  return { pos, size };
}
var SHAPES = ["line", "square", "rounded-square", "circle", "polygon", "star", "helix"];
async function createSplineNode(kind) {
  let is2D = is2DView(), sel = selectedNodeUuids(), options = { name: kind === "draw" ? "Spline" : `Spline ${kind.replace("-", " ").replace(/\b\w/g, (c2) => c2.toUpperCase())}` };
  sel.length && (options.parent = sel[0]), is2D && (options.canvasRequired = !0);
  let uuid = await Editor.Message.request("scene", "create-node", options);
  if (!uuid || typeof uuid != "string") return null;
  await Editor.Message.request("scene", "create-component", { uuid, component: "SplineContainer" });
  let node = findNode(uuid), C = containerClass(), comp = node && C ? node.getComponent(C) : null;
  if (!comp) return uuid;
  let { pos, size } = viewCenter(is2D);
  await recordEdit([comp], () => {
    node.setWorldPosition(pos.x, pos.y, pos.z), comp.splines.length || comp.splines.push(factory.spline());
    let spline = comp.splines[0];
    kind !== "draw" && SHAPES.includes(kind) ? buildShape(spline, kind, { size, plane2D: is2D, sides: kind === "star" ? 5 : 6, turns: 3, height: size * 2 }, factory) : spline.knots.length = 0;
  }), afterEdit([comp]);
  try {
    Editor.Selection.clear("node"), Editor.Selection.select("node", uuid);
  } catch {
  }
  return S.pendingContext = { comp, tool: kind === "draw" ? "draw" : "select", until: Date.now() + 3e3 }, repaint(), uuid;
}

// source/scene/input.ts
var PRIORITY = 100, DRAG_PX = 4, active = null, lastHoverKey = "";
function compsOf2(list) {
  return [...new Set(list.map((e) => e.comp))];
}
function hitKey(h) {
  if (!h) return "";
  switch (h.kind) {
    case "handle":
      return `h:${h.axis}`;
    case "knot":
    case "tangent":
      return `${h.kind}:${h.ref.comp.uuid}:${h.ref.spline}:${h.ref.knot}:${h.ref.part}`;
    case "curve":
      return `c:${h.comp.uuid}:${h.spline}:${h.curve}`;
  }
}
function setHover(h) {
  let key = hitKey(h);
  S.hover = h, key !== lastHoverKey && (lastHoverKey = key, repaint());
}
function selectionChanged() {
  bumpState(), maybeBroadcast(), repaint();
}
function canEdit() {
  return S.primary && !S.replaying && runtimeReady();
}
function pointer(ev) {
  let cam2 = sceneCamera();
  if (!cam2) return null;
  let p = eventToScreen(cam2, ev);
  return { cam: cam2, x: p.x, y: p.y };
}
function onMouseDown(ev) {
  if (!canEdit() || (active && cancelActive(), S.diag.mouseDowns++, !(ev.button === 0 || ev.button === void 0 && ev.leftButton) || ev.altKey)) return !0;
  let p = pointer(ev);
  if (!p || !updateTargets().length) return !0;
  try {
    return S.tool === "draw" ? drawDown(p.cam, p.x, p.y, ev) : selectDown(p.cam, p.x, p.y, ev);
  } catch (e) {
    return note(`mousedown: ${(e == null ? void 0 : e.stack) || e}`), active = null, !0;
  }
}
function selectDown(cam2, x, y, ev) {
  let hit = hitTest(cam2, x, y, { outsideContext: !S.context });
  if (!S.context) {
    if ((hit == null ? void 0 : hit.kind) !== "knot") return !0;
    setContext(!0);
  }
  if (S.diag.blocked++, (hit == null ? void 0 : hit.kind) === "handle") {
    let frame = currentHandleFrame(cam2), elements = S.selection.all();
    if (!frame) return !1;
    let drag = startHandleDrag(cam2, frame, hit.axis, x, y, elements);
    return drag && (setHandleAxesOverride(frame.axes), setDragAxis(hit.axis), active = { kind: "handle", drag, session: new EditSession(compsOf2(elements)) }), !1;
  }
  if ((hit == null ? void 0 : hit.kind) === "knot" || (hit == null ? void 0 : hit.kind) === "tangent") {
    let ref = hit.ref, additive = !!(ev.shiftKey || ev.ctrlKey || ev.metaKey), toggled = !1;
    return additive ? (S.selection.toggle(ref), toggled = !0) : S.selection.has(ref) ? S.selection.add(ref) : S.selection.set([ref]), selectionChanged(), active = { kind: "element", ref, x0: x, y0: y, dragging: !1, toggled, session: null, grab: null, starts: [] }, !1;
  }
  return active = {
    kind: "rect",
    x0: x,
    y0: y,
    moved: !1,
    additive: !!(ev.shiftKey || ev.ctrlKey || ev.metaKey),
    base: S.selection.all(),
    down: cloneEvent(ev),
    onCurve: (hit == null ? void 0 : hit.kind) === "curve"
  }, !1;
}
function cloneEvent(ev) {
  let o = {};
  for (let k in ev) {
    let v = ev[k];
    typeof v != "function" && (o[k] = v);
  }
  return o;
}
function onMouseMove(ev) {
  if (!canEdit()) return !0;
  let p = pointer(ev);
  if (!p) return !0;
  try {
    return active ? dragMove(p.cam, p.x, p.y, ev) : (hover(p.cam, p.x, p.y, ev), !0);
  } catch (e) {
    return note(`mousemove: ${(e == null ? void 0 : e.stack) || e}`), !0;
  }
}
function hover(cam2, x, y, ev) {
  if (!S.lastTargets.length) {
    S.hover && setHover(null);
    return;
  }
  if (S.tool === "draw") {
    let hit2 = hitTest(cam2, x, y, { handles: !1, outsideContext: !0 });
    setHover(hit2 && (hit2.kind === "knot" || hit2.kind === "curve") ? hit2 : null);
    let comp = drawComp(), place = comp ? placement(cam2, x, y, comp) : null;
    S.preview = place ? place.world : null, repaint();
    return;
  }
  let hit = hitTest(cam2, x, y, { outsideContext: !S.context, curves: S.context });
  setHover(S.context || (hit == null ? void 0 : hit.kind) === "knot" ? hit : null);
}
function dragMove(cam2, x, y, ev) {
  let a = active;
  switch (a.kind) {
    case "handle": {
      let text = "";
      return a.session.apply(() => {
        text = a.drag.update(x, y, ev);
      }), text && showTip(cam2, x, y, text), !1;
    }
    case "element": {
      if (!a.dragging) {
        if (Math.hypot(x - a.x0, y - a.y0) < DRAG_PX || a.toggled) return !1;
        a.dragging = !0;
        let elements = movableElements(S.selection.all());
        a.starts = elements.map((e) => ({ e, pos: elementWorldPosition(e) })), a.grab = elementWorldPosition(a.ref), a.session = new EditSession(compsOf2(elements));
      }
      let grab = a.grab, n = cameraForward(cam2), hit = rayPlane(screenRay(cam2, x, y), grab, n, !0);
      if (!hit) return !1;
      let delta = sub(v3(), hit, grab), snap = snapConfig();
      if (snap.isPositionSnapEnabled !== !!ev.ctrlKey && a.ref.part === "knot") {
        let target = add(v3(), grab, delta);
        target.x = Math.round(target.x / (snap.position.x || 1)) * (snap.position.x || 1), target.y = Math.round(target.y / (snap.position.y || 1)) * (snap.position.y || 1), is2DView() || (target.z = Math.round(target.z / (snap.position.z || 1)) * (snap.position.z || 1)), sub(delta, target, grab);
      }
      return a.session.apply(() => {
        for (let s of a.starts) {
          let target = add(v3(), s.pos, delta);
          s.e.part === "knot" ? setKnotWorld(s.e.comp, s.e.spline, s.e.knot, target) : setTangentWorld(s.e.comp, s.e.spline, s.e.knot, s.e.part, target);
        }
      }), !1;
    }
    case "rect": {
      if (!a.moved && Math.hypot(x - a.x0, y - a.y0) < DRAG_PX) return !1;
      a.moved = !0, showRect(cam2, a.x0, a.y0, x, y);
      let inside = knotsInRect(cam2, a.x0, a.y0, x, y);
      return S.selection.set(a.additive ? [...a.base, ...inside] : inside), selectionChanged(), !1;
    }
    case "draw":
      return drawDrag(cam2, x, y, a), !1;
  }
  return !1;
}
function movableElements(list) {
  return list.filter((e) => e.part === "knot" || !list.some((o) => o.part === "knot" && o.comp === e.comp && o.spline === e.spline && o.knot === e.knot));
}
function onMouseUp(ev) {
  if (S.replaying || !active) return !0;
  let a = active;
  active = null;
  let p = pointer(ev);
  try {
    switch (a.kind) {
      case "handle":
        a.session.end(), setHandleAxesOverride(null), setDragAxis(null), hideTip();
        break;
      case "element":
        a.session ? a.session.end() : !a.toggled && S.selection.size > 1 && !a.dragging && S.selection.set([a.ref]);
        break;
      case "rect":
        hideRect(), a.moved || (a.onCurve ? a.additive || clearSelection() : S.selection.size && !a.additive ? clearSelection() : a.additive || replayClick(a.down, ev));
        break;
      case "draw":
        a.session.end();
        break;
    }
  } catch (e) {
    note(`mouseup: ${(e == null ? void 0 : e.stack) || e}`);
  }
  return selectionChanged(), !1;
}
function replayClick(down, up) {
  let op = cce().Operation;
  if (op != null && op.emit) {
    S.replaying = !0;
    try {
      op.emit("mousedown", down), op.emit("mouseup", up);
    } catch (e) {
      note(`replay: ${e}`);
    } finally {
      S.replaying = !1;
    }
  }
}
function onDblClick(ev) {
  if (!canEdit() || !S.context || S.tool !== "select") return !0;
  let p = pointer(ev);
  if (!p) return !0;
  let hit = hitTest(p.cam, p.x, p.y, { handles: !1 });
  return (hit == null ? void 0 : hit.kind) !== "curve" ? !0 : (insertOnCurve2(hit.comp, hit.spline, hit.curve, hit.t), !1);
}
function cancelActive() {
  if (!active) return;
  let a = active;
  active = null, (a.kind === "handle" || a.kind === "draw") && a.session.end(), a.kind === "element" && a.session && a.session.end(), setHandleAxesOverride(null), setDragAxis(null), hideRect(), hideTip();
}
function isDragging() {
  return !!active;
}
function drawComp() {
  return S.drawing && S.lastTargets.includes(S.drawing.comp) ? S.drawing.comp : S.lastTargets[S.drawTarget % Math.max(1, S.lastTargets.length)] ?? null;
}
function drawNormal(comp) {
  let n = dirToWorld(comp, is2DView() ? v3(0, 0, 1) : v3(0, 1, 0));
  return lenSq(n) > 1e-12 ? normalize(n, n) : v3(0, 1, 0);
}
function placement(cam2, x, y, comp) {
  let ray = screenRay(cam2, x, y), normal = drawNormal(comp);
  if (S.settings.drawOnSurfaces && !is2DView()) {
    let hit = raycastScene(ray);
    if (hit) return { world: hit, normal };
  }
  let ref = toWorld(comp, v3());
  if (S.drawing && S.drawing.comp === comp) {
    let s = comp.splines[S.drawing.spline];
    if (s && s.knots.length) {
      let k = S.drawing.end === "end" ? s.knots.length - 1 : 0;
      ref = knotWorldPosition(comp, S.drawing.spline, k);
    }
  }
  let p = null;
  if (Math.abs(dot(ray.d, normal)) > 0.02 && (p = rayPlane(ray, ref, normal)), p || (p = rayPlane(ray, ref, cameraForward(cam2), !0)), !p) return null;
  if (!is2DView()) {
    let snap = snapConfig();
    snap.isPositionSnapEnabled && (p.x = Math.round(p.x / (snap.position.x || 1)) * (snap.position.x || 1), p.z = Math.round(p.z / (snap.position.z || 1)) * (snap.position.z || 1));
  }
  return { world: p, normal };
}
function raycastScene(ray) {
  try {
    let { director, geometry, CCObject } = cc(), scene = director.getScene(), rs = scene == null ? void 0 : scene.renderScene;
    if (!rs) return null;
    let r = new geometry.Ray(ray.o.x, ray.o.y, ray.o.z, ray.d.x, ray.d.y, ray.d.z), hidden = CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy, best = 1 / 0, opts = { mode: geometry.ERaycastMode.CLOSEST, distance: 1 / 0, doubleSided: !1 };
    for (let model of rs.models) {
      let node = model.node;
      if (!model.enabled || !node || !node.activeInHierarchy || node.scene !== scene || hasFlags(node, hidden) || model.worldBounds && !geometry.intersect.rayAABB(r, model.worldBounds)) continue;
      let d = geometry.intersect.rayModel(r, model, opts);
      d > 0 && d < best && (best = d);
    }
    return isFinite(best) ? scaleAndAdd(v3(), ray.o, ray.d, best) : null;
  } catch (e) {
    return note(`raycast: ${e}`), null;
  }
}
function hasFlags(node, flags) {
  for (let n = node; n; n = n.parent) if (n._objFlags & flags) return !0;
  return !1;
}
function drawDown(cam2, x, y, ev) {
  let comp = drawComp();
  if (!comp) return !0;
  S.diag.blocked++;
  let hit = hitTest(cam2, x, y, { handles: !1, outsideContext: !0 });
  if (S.drawing) {
    let d = S.drawing, s = d.comp.splines[d.spline];
    if ((hit == null ? void 0 : hit.kind) === "knot" && hit.ref.comp === d.comp && hit.ref.spline === d.spline && s && s.knots.length >= 2) {
      let other = d.end === "end" ? 0 : s.knots.length - 1;
      if (hit.ref.knot === other)
        return recordEdit([d.comp], () => setClosed(s, !0)), S.drawing = null, S.selection.set([{ comp: d.comp, spline: d.spline, knot: other, part: "knot" }]), selectionChanged(), !1;
    }
  } else if ((hit == null ? void 0 : hit.kind) === "knot") {
    let s = hit.ref.comp.splines[hit.ref.spline];
    if (s && isEndKnot(s, hit.ref.knot))
      return S.drawing = { comp: hit.ref.comp, spline: hit.ref.spline, end: hit.ref.knot === 0 && s.knots.length > 1 ? "start" : "end" }, S.selection.set([hit.ref]), selectionChanged(), !1;
  } else if ((hit == null ? void 0 : hit.kind) === "curve")
    return insertOnCurve2(hit.comp, hit.spline, hit.curve, hit.t), !1;
  let place = placement(cam2, x, y, comp);
  if (!place) return !1;
  let target = S.drawing ? S.drawing.comp : comp, session = new EditSession([target]), a = {
    kind: "draw",
    comp: target,
    spline: -1,
    knot: -1,
    part: "out",
    x0: x,
    y0: y,
    dragging: !1,
    session,
    normal: place.normal
  };
  return active = a, session.apply(() => {
    if (!S.drawing) {
      let index2 = target.splines.findIndex((s2) => s2.knots.length === 0);
      index2 < 0 && (target.splines.push(factory.spline()), index2 = target.splines.length - 1), S.drawing = { comp: target, spline: index2, end: "end" };
    }
    let d = S.drawing, s = target.splines[d.spline], k = factory.knot();
    copy(k.position, toLocal(target, place.world)), k.mode = S.settings.defaultMode;
    let prevIndex2 = d.end === "end" ? s.knots.length - 1 : 0, localNormal = normalize(v3(), dirToLocalSafe(target, place.normal));
    if (s.knots.length) {
      let prev = s.knots[prevIndex2].position, dir = d.end === "end" ? sub(v3(), k.position, prev) : sub(v3(), prev, k.position);
      knotRotation(k.rotation, dir, localNormal);
    } else
      knotRotation(k.rotation, v3(), localNormal);
    let index = d.end === "end" ? s.knots.length : 0;
    containerInsertKnot(target, d.spline, index, k), a.spline = d.spline, a.knot = index, a.part = d.end === "end" ? "out" : "in", S.selection.set([{ comp: target, spline: d.spline, knot: index, part: "knot" }]), selectionChanged();
  }), !1;
}
function dirToLocalSafe(comp, world) {
  let o = toLocal(comp, v3()), p = toLocal(comp, world);
  return sub(v3(), p, o);
}
function drawDrag(cam2, x, y, a) {
  if (a.knot < 0 || !a.dragging && Math.hypot(x - a.x0, y - a.y0) < DRAG_PX) return;
  a.dragging = !0;
  let pos = knotWorldPosition(a.comp, a.spline, a.knot), hit = rayPlane(screenRay(cam2, x, y), pos, a.normal);
  if (hit || (hit = rayPlane(screenRay(cam2, x, y), pos, cameraForward(cam2), !0)), !hit) return;
  let end = hit;
  a.session.apply(() => {
    let s = a.comp.splines[a.spline];
    !s || !s.knots[a.knot] || (s.knots[a.knot].mode !== 2 /* Mirrored */ && setTangentMode(s, a.knot, 2 /* Mirrored */), setTangentWorld(a.comp, a.spline, a.knot, a.part, end));
  });
}
function drawPreview(_cam) {
  if (!S.context || S.tool !== "draw") return;
  let h = S.hover;
  if ((h == null ? void 0 : h.kind) === "curve") {
    disc(h.world, 5, Colors.insert), circle(h.world, 7, Colors.insert);
    return;
  }
  if ((h == null ? void 0 : h.kind) === "knot" && S.drawing) {
    let d2 = S.drawing, s2 = d2.comp.splines[d2.spline], other = d2.end === "end" ? 0 : ((s2 == null ? void 0 : s2.knots.length) ?? 1) - 1;
    if (s2 && h.ref.comp === d2.comp && h.ref.spline === d2.spline && h.ref.knot === other && s2.knots.length >= 2) {
      circle(knotWorldPosition(d2.comp, d2.spline, other), 10, Colors.insert);
      return;
    }
  }
  if (!S.preview || active) return;
  let p = S.preview;
  disc(p, 4, Colors.preview);
  let d = S.drawing;
  if (!d) return;
  let s = d.comp.splines[d.spline];
  if (!s || !s.knots.length) return;
  let k = d.end === "end" ? s.knots.length - 1 : 0, knot = s.knots[k], from = knotWorldPosition(d.comp, d.spline, k), handleVec = d.end === "end" ? tangentOutVec(v3(), knot) : tangentInVec(v3(), knot), c2 = curve();
  copy(c2.p0, from), add(c2.p1, from, dirToWorld(d.comp, handleVec)), lenSq(sub(v3(), c2.p1, c2.p0)) < 1e-12 && scaleAndAdd(c2.p1, from, sub(v3(), p, from), 1 / 3), scaleAndAdd(c2.p2, p, sub(v3(), from, p), 1 / 3), copy(c2.p3, p);
  let n = 24, prev = copy(v3(), from), cur = v3();
  for (let i = 1; i <= n; i++)
    evalPosition(cur, c2, i / n), line(prev, cur, Colors.preview), copy(prev, cur);
}
setPreviewDrawer(drawPreview);
function plainKey(ev) {
  return !ev.ctrlKey && !ev.metaKey && !ev.altKey && !ev.shiftKey;
}
function onKeyDown(ev) {
  if (!canEdit() || !S.context) return !0;
  let key = String(ev.key || "").toLowerCase();
  try {
    switch (key) {
      case "escape":
        return active ? (cancelActive(), !1) : (S.tool === "draw" ? S.drawing ? S.drawing = null : setTool("select") : S.selection.size ? clearSelection() : setContext(!1), selectionChanged(), !1);
      case "enter":
        return S.tool === "draw" && S.drawing ? (S.drawing = null, selectionChanged(), !1) : !0;
      case "delete":
      case "backspace":
        return S.selection.size ? (deleteKey(), !1) : !0;
      case "c":
        return !plainKey(ev) || !S.selection.size ? !0 : (cycleModeSelected(), !1);
      case "x":
        return plainKey(ev) ? (S.settings.orientation = S.settings.orientation === "global" ? "local" : S.settings.orientation === "local" ? "element" : "global", selectionChanged(), !1) : !0;
      case "a":
        return !(ev.ctrlKey || ev.metaKey) || ev.altKey ? !0 : (S.selectAllKeyAt = Date.now(), selectAll(), !1);
      case "s":
        return S.tool === "draw" && ev.shiftKey && !ev.ctrlKey && S.lastTargets.length > 1 ? (S.drawTarget = (S.drawTarget + 1) % S.lastTargets.length, S.drawing = null, selectionChanged(), !1) : !0;
    }
  } catch (e) {
    note(`keydown: ${(e == null ? void 0 : e.stack) || e}`);
  }
  return !0;
}
function onKeyUp(_ev) {
  return !0;
}
function deleteKey() {
  let now = Date.now();
  now - S.deleteKeyAt < 150 || (S.deleteKeyAt = now, deleteSelection());
}

// source/scene/guards.ts
var KEY_WINDOW_MS = 800, undo = [], installed = !1;
function isTyping(e) {
  let t = e.target, tag = t == null ? void 0 : t.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || !!(t != null && t.isContentEditable);
}
function onKeyDownCapture(e) {
  if (!S.primary || !S.context || isTyping(e)) return;
  let k = e.key;
  (k === "Delete" || k === "Backspace") && S.selection.size && !e.ctrlKey && !e.metaKey ? (e.preventDefault(), e.stopImmediatePropagation(), deleteKey()) : (k === "a" || k === "A") && (e.ctrlKey || e.metaKey) && S.lastTargets.length && (S.selectAllKeyAt = Date.now());
}
function onBlur() {
  isDragging() && cancelActive();
}
function involvesEdited(options) {
  let ids = options == null ? void 0 : options.uuid, list = Array.isArray(ids) ? ids : typeof ids == "string" ? [ids] : [], edited = new Set(S.lastTargets.map((c2) => c2.node.uuid));
  return list.some((id) => edited.has(id)) || list.length === 0;
}
function wrap2(target, name, guard) {
  let orig = target == null ? void 0 : target[name];
  if (typeof orig != "function" || orig.__splinesGuard) return;
  let wrapped = function(...args) {
    try {
      if (guard(this, args)) return;
    } catch (e) {
      note(`guard ${name}: ${e}`);
    }
    return orig.apply(this, args);
  };
  wrapped.__splinesGuard = !0, target[name] = wrapped, undo.push(() => {
    target[name] === wrapped && (target[name] = orig);
  });
}
function installGuards() {
  if (installed) return;
  installed = !0, window.addEventListener("keydown", onKeyDownCapture, !0), window.addEventListener("blur", onBlur), undo.push(() => {
    window.removeEventListener("keydown", onKeyDownCapture, !0), window.removeEventListener("blur", onBlur);
  });
  let facade = cce().SceneFacadeManager, target = typeof facade == "function" ? facade.prototype : facade;
  target && (wrap2(target, "removeNode", (_self, args) => S.context && Date.now() - S.deleteKeyAt < KEY_WINDOW_MS && involvesEdited(args[0]) ? (note("Delete went to the selected knots, not the node"), !0) : !1), wrap2(target, "selectAllNodes", () => S.context && Date.now() - S.selectAllKeyAt < KEY_WINDOW_MS));
}
function uninstallGuards() {
  for (; undo.length; ) undo.pop()();
  installed = !1;
}
function guardsInfo() {
  var _a2, _b2;
  let facade = cce().SceneFacadeManager, target = typeof facade == "function" ? facade.prototype : facade;
  return {
    installed,
    facadeType: typeof facade,
    removeNodeGuarded: !!((_a2 = target == null ? void 0 : target.removeNode) != null && _a2.__splinesGuard),
    selectAllGuarded: !!((_b2 = target == null ? void 0 : target.selectAllNodes) != null && _b2.__splinesGuard)
  };
}

// source/scene/index.ts
var PKG = "splines", hooked = !1, opHooked = !1;
function onBeforeCommit() {
  try {
    drawFrame(), maybeBroadcast();
  } catch (e) {
    note(`draw: ${(e == null ? void 0 : e.stack) || e}`);
  }
}
var listeners = [
  ["mousedown", onMouseDown],
  ["mousemove", onMouseMove],
  ["mouseup", onMouseUp],
  ["dblclick", onDblClick],
  ["keydown", onKeyDown],
  ["keyup", onKeyUp]
];
function hook() {
  if (!hooked) {
    let { director, Director } = cc();
    director.on(Director.EVENT_BEFORE_COMMIT, onBeforeCommit), hooked = !0;
  }
  if (!opHooked) {
    let op = cce().Operation;
    if (op != null && op.addListener) {
      for (let [type, fn] of listeners) op.addListener(type, fn, PRIORITY);
      opHooked = !0;
    }
  }
  installGuards(), S.hooked = hooked && opHooked;
}
function unhook() {
  try {
    if (hooked) {
      let { director, Director } = cc();
      director.off(Director.EVENT_BEFORE_COMMIT, onBeforeCommit);
    }
  } catch {
  }
  hooked = !1;
  try {
    let op = cce().Operation;
    if (opHooked && (op != null && op.removeListener)) for (let [type, fn] of listeners) op.removeListener(type, fn);
  } catch {
  }
  opHooked = !1, uninstallGuards();
}
function markPrimary() {
  S.primary || (S.primary = !0, bumpState()), hook();
}
async function loadSettings() {
  try {
    let saved = await Editor.Profile.getConfig(PKG, "settings");
    saved && typeof saved == "object" && (S.settings = { ...DEFAULT_SETTINGS, ...saved });
  } catch {
  }
  repaint();
}
async function saveSettings() {
  try {
    await Editor.Profile.setConfig(PKG, "settings", { ...S.settings }, "global");
  } catch {
  }
}
function broadcastNow() {
  return updateTargets(), maybeBroadcast(!0), repaint(), panelState();
}
var methods = {
  /** Panel / Inspector handshake: marks this process as the edit scene. */
  spHello() {
    return markPrimary(), broadcastNow();
  },
  spPrimary() {
    return markPrimary(), !0;
  },
  spState() {
    return updateTargets(), panelState();
  },
  spSetContext(on) {
    return markPrimary(), updateTargets(), on && !S.lastTargets.length ? panelState() : (setContext(!!on), broadcastNow());
  },
  spSetTool(tool) {
    return markPrimary(), updateTargets(), S.lastTargets.length ? (setTool(tool === "draw" ? "draw" : "select"), tool === "draw" && (S.drawing = null), broadcastNow()) : panelState();
  },
  spSetSetting(key, value) {
    return key in S.settings ? (S.settings[key] = value, saveSettings(), broadcastNow()) : panelState();
  },
  async spSetElement(props) {
    return markPrimary(), await setElementProps(props || {}), broadcastNow();
  },
  async spAction(name, arg) {
    switch (markPrimary(), updateTargets(), name) {
      case "delete":
        await deleteSelection();
        break;
      case "mode":
        await setModeSelected(Number(arg));
        break;
      case "cycleMode":
        await cycleModeSelected();
        break;
      case "link":
        await linkSelected();
        break;
      case "unlink":
        await unlinkSelected();
        break;
      case "split":
        await splitSelected();
        break;
      case "join":
        await joinSelected();
        break;
      case "reverse":
        await reverseSelected();
        break;
      case "close":
        await setClosedSelected(arg === void 0 ? void 0 : !!arg);
        break;
      case "selectAll":
        selectAll();
        break;
      case "clearSelection":
        clearSelection();
        break;
      case "finishDrawing":
        S.drawing = null;
        break;
    }
    return broadcastNow();
  },
  async spCreate(kind) {
    markPrimary();
    try {
      return await createSplineNode(kind);
    } catch (e) {
      return note(`create: ${(e == null ? void 0 : e.stack) || e}`), console.error("[Splines] Could not create the spline:", e), null;
    }
  },
  /** Inspector: data of one SplineContainer. */
  spContainerInfo(compUuid) {
    return markPrimary(), updateTargets(), containerInfo(compUuid);
  },
  async spEditKnot(compUuid, spline, knot, props) {
    return markPrimary(), await editKnot(compUuid, spline, knot, props || {}), containerInfo(compUuid);
  },
  async spSplineAction(compUuid, spline, action, arg) {
    return markPrimary(), updateTargets(), splineAction(compUuid, spline, action, arg);
  },
  /** Inspector: turns SplineInstantiate's generated instances into regular nodes. */
  async spBakeInstances(compUuid) {
    var _a2, _b2;
    markPrimary();
    let comp = findComponent(compUuid);
    if (!comp || typeof comp._bakeInfo != "function") return { count: 0 };
    let info = comp._bakeInfo();
    if (!info.length) return { count: 0 };
    let parent = await Editor.Message.request("scene", "create-node", {
      parent: comp.node.uuid,
      name: `${comp.node.name} Instances`
    }), count = 0;
    for (let p of info) {
      let uuid = await Editor.Message.request("scene", "create-node", { parent, assetUuid: p.prefab }), node = typeof uuid == "string" ? findNode(uuid) : null;
      node && (node.setWorldPosition(p.position[0], p.position[1], p.position[2]), node.setWorldRotation(p.rotation[0], p.rotation[1], p.rotation[2], p.rotation[3]), node.setScale(p.scale[0], p.scale[1], p.scale[2]), count++);
    }
    return await recordEdit([comp], () => {
      comp.enabled = !1;
    }), afterEdit([comp]), findNode(parent) && ((_b2 = (_a2 = cce().Engine) == null ? void 0 : _a2.repaintInEditMode) == null || _b2.call(_a2)), { count };
  },
  spDiagnostics() {
    var _a2, _b2, _c, _d2, _e;
    let cam2 = sceneCamera();
    return {
      primary: S.primary,
      hooked: S.hooked,
      runtimeReady: runtimeReady(),
      context: S.context,
      tool: S.tool,
      settings: S.settings,
      selection: S.selection.all().map((e) => {
        var _a3;
        return `${(_a3 = e.comp.node) == null ? void 0 : _a3.name}:${e.spline}:${e.knot}:${e.part}`;
      }),
      targets: S.lastTargets.map((c2) => {
        var _a3;
        return (_a3 = c2.node) == null ? void 0 : _a3.name;
      }),
      containers: allContainers().map((c2) => {
        var _a3;
        return `${(_a3 = c2.node) == null ? void 0 : _a3.name} (${c2.splines.length} splines)`;
      }),
      camera: cam2 ? { name: cam2.name, width: cam2.width, height: cam2.height, projection: cam2.projectionType } : null,
      eventCoords: eventCoordMode(),
      operation: !!((_a2 = cce().Operation) != null && _a2.addListener),
      guards: guardsInfo(),
      gizmo: {
        tool: (_b2 = cce().Gizmo) == null ? void 0 : _b2.transformToolName,
        pivot: (_c = cce().Gizmo) == null ? void 0 : _c.pivot,
        coordinate: (_d2 = cce().Gizmo) == null ? void 0 : _d2.coordinate,
        is2D: (_e = cce().Gizmo) == null ? void 0 : _e.is2D
      },
      diag: S.diag,
      url: typeof location < "u" ? location.href : ""
    };
  }
};
function load() {
  loadSettings();
  let tryHook = (n) => {
    try {
      if (hook(), S.hooked) return;
    } catch {
    }
    n > 0 && setTimeout(() => tryHook(n - 1), 1e3);
  };
  tryHook(30);
}
function unload() {
  cancelActive(), unhook(), removeOverlay(), setContext(!1);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  load,
  methods,
  unload
});
//# sourceMappingURL=scene.js.map
