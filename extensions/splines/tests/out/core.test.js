"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// tests/core.test.ts
var import_assert2 = __toESM(require("assert"));

// assets/core/math.ts
var EPSILON = 1e-6;
function v3(x = 0, y = 0, z = 0) {
  return { x, y, z };
}
function q4(x = 0, y = 0, z = 0, w = 1) {
  return { x, y, z, w };
}
function set(out, x, y, z) {
  out.x = x;
  out.y = y;
  out.z = z;
  return out;
}
function copy(out, a) {
  out.x = a.x;
  out.y = a.y;
  out.z = a.z;
  return out;
}
function add(out, a, b) {
  out.x = a.x + b.x;
  out.y = a.y + b.y;
  out.z = a.z + b.z;
  return out;
}
function sub(out, a, b) {
  out.x = a.x - b.x;
  out.y = a.y - b.y;
  out.z = a.z - b.z;
  return out;
}
function scale(out, a, s) {
  out.x = a.x * s;
  out.y = a.y * s;
  out.z = a.z * s;
  return out;
}
function scaleAndAdd(out, a, b, s) {
  out.x = a.x + b.x * s;
  out.y = a.y + b.y * s;
  out.z = a.z + b.z * s;
  return out;
}
function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
function cross(out, a, b) {
  const x = a.y * b.z - a.z * b.y;
  const y = a.z * b.x - a.x * b.z;
  const z = a.x * b.y - a.y * b.x;
  out.x = x;
  out.y = y;
  out.z = z;
  return out;
}
function lenSq(a) {
  return a.x * a.x + a.y * a.y + a.z * a.z;
}
function len(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
}
function distSq(a, b) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  const z = a.z - b.z;
  return x * x + y * y + z * z;
}
function dist(a, b) {
  return Math.sqrt(distSq(a, b));
}
function normalize(out, a) {
  const l = len(a);
  if (l < EPSILON) return set(out, 0, 0, 0);
  return scale(out, a, 1 / l);
}
function lerp(out, a, b, t) {
  out.x = a.x + (b.x - a.x) * t;
  out.y = a.y + (b.y - a.y) * t;
  out.z = a.z + (b.z - a.z) * t;
  return out;
}
function anyPerpendicular(out, a) {
  const ax = Math.abs(a.x);
  const ay = Math.abs(a.y);
  const az = Math.abs(a.z);
  if (ax <= ay && ax <= az) cross(out, a, { x: 1, y: 0, z: 0 });
  else if (ay <= az) cross(out, a, { x: 0, y: 1, z: 0 });
  else cross(out, a, { x: 0, y: 0, z: 1 });
  return normalize(out, out);
}
function projectOnPlane(out, v, n) {
  const d = dot(v, n);
  return scaleAndAdd(out, v, n, -d);
}
function qSet(out, x, y, z, w) {
  out.x = x;
  out.y = y;
  out.z = z;
  out.w = w;
  return out;
}
function qCopy(out, a) {
  return qSet(out, a.x, a.y, a.z, a.w);
}
function qIdentity(out) {
  return qSet(out, 0, 0, 0, 1);
}
function qMul(out, a, b) {
  const x = a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y;
  const y = a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x;
  const z = a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w;
  const w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
  return qSet(out, x, y, z, w);
}
function qNormalize(out, a) {
  const l = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);
  if (l < EPSILON) return qIdentity(out);
  return qSet(out, a.x / l, a.y / l, a.z / l, a.w / l);
}
function qInvert(out, a) {
  const l = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
  if (l < EPSILON) return qIdentity(out);
  return qSet(out, -a.x / l, -a.y / l, -a.z / l, a.w / l);
}
function qRotate(out, q, v) {
  const tx = 2 * (q.y * v.z - q.z * v.y);
  const ty = 2 * (q.z * v.x - q.x * v.z);
  const tz = 2 * (q.x * v.y - q.y * v.x);
  const x = v.x + q.w * tx + (q.y * tz - q.z * ty);
  const y = v.y + q.w * ty + (q.z * tx - q.x * tz);
  const z = v.z + q.w * tz + (q.x * ty - q.y * tx);
  return set(out, x, y, z);
}
function qFromAxisAngle(out, axis, rad) {
  const n = normalize(v3(), axis);
  const s = Math.sin(rad / 2);
  return qSet(out, n.x * s, n.y * s, n.z * s, Math.cos(rad / 2));
}
function qFromAxes(out, x, y, z) {
  const m00 = x.x, m01 = y.x, m02 = z.x;
  const m10 = x.y, m11 = y.y, m12 = z.y;
  const m20 = x.z, m21 = y.z, m22 = z.z;
  const trace = m00 + m11 + m22;
  if (trace > 0) {
    const s2 = 0.5 / Math.sqrt(trace + 1);
    return qNormalize(out, qSet(out, (m21 - m12) * s2, (m02 - m20) * s2, (m10 - m01) * s2, 0.25 / s2));
  }
  if (m00 > m11 && m00 > m22) {
    const s2 = 2 * Math.sqrt(1 + m00 - m11 - m22);
    return qNormalize(out, qSet(out, 0.25 * s2, (m01 + m10) / s2, (m02 + m20) / s2, (m21 - m12) / s2));
  }
  if (m11 > m22) {
    const s2 = 2 * Math.sqrt(1 + m11 - m00 - m22);
    return qNormalize(out, qSet(out, (m01 + m10) / s2, 0.25 * s2, (m12 + m21) / s2, (m02 - m20) / s2));
  }
  const s = 2 * Math.sqrt(1 + m22 - m00 - m11);
  return qNormalize(out, qSet(out, (m02 + m20) / s, (m12 + m21) / s, 0.25 * s, (m10 - m01) / s));
}
function qLookRotation(out, forward, up) {
  const z = normalize(v3(), forward);
  if (lenSq(z) < EPSILON) return qIdentity(out);
  const x = cross(v3(), up, z);
  if (lenSq(x) < EPSILON) {
    anyPerpendicular(x, z);
  }
  normalize(x, x);
  const y = cross(v3(), z, x);
  return qFromAxes(out, x, y, z);
}
function qToEuler(out, q) {
  const { x, y, z, w } = q;
  let bank = 0;
  let heading = 0;
  let attitude = 0;
  const test2 = x * y + z * w;
  if (test2 > 0.499999) {
    bank = 0;
    heading = 2 * Math.atan2(x, w) * 180 / Math.PI;
    attitude = 90;
  } else if (test2 < -0.499999) {
    bank = 0;
    heading = -2 * Math.atan2(x, w) * 180 / Math.PI;
    attitude = -90;
  } else {
    const sqx = x * x;
    const sqy = y * y;
    const sqz = z * z;
    bank = Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz) * 180 / Math.PI;
    heading = Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz) * 180 / Math.PI;
    attitude = Math.asin(2 * test2) * 180 / Math.PI;
  }
  return set(out, bank, heading, attitude);
}
function qFromEuler(out, ex, ey, ez) {
  const halfToRad = 0.5 * Math.PI / 180;
  const x = ex * halfToRad;
  const y = ey * halfToRad;
  const z = ez * halfToRad;
  const sx = Math.sin(x);
  const cx = Math.cos(x);
  const sy = Math.sin(y);
  const cy = Math.cos(y);
  const sz = Math.sin(z);
  const cz = Math.cos(z);
  return qSet(
    out,
    sx * cy * cz + cx * sy * sz,
    cx * sy * cz + sx * cy * sz,
    cx * cy * sz - sx * sy * cz,
    cx * cy * cz - sx * sy * sz
  );
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
function evalPosition(out, c, t) {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const d = 3 * u * t * t;
  const e = t * t * t;
  return set(
    out,
    a * c.p0.x + b * c.p1.x + d * c.p2.x + e * c.p3.x,
    a * c.p0.y + b * c.p1.y + d * c.p2.y + e * c.p3.y,
    a * c.p0.z + b * c.p1.z + d * c.p2.z + e * c.p3.z
  );
}
function evalDerivative(out, c, t) {
  const u = 1 - t;
  const a = 3 * u * u;
  const b = 6 * u * t;
  const d = 3 * t * t;
  return set(
    out,
    a * (c.p1.x - c.p0.x) + b * (c.p2.x - c.p1.x) + d * (c.p3.x - c.p2.x),
    a * (c.p1.y - c.p0.y) + b * (c.p2.y - c.p1.y) + d * (c.p3.y - c.p2.y),
    a * (c.p1.z - c.p0.z) + b * (c.p2.z - c.p1.z) + d * (c.p3.z - c.p2.z)
  );
}
function evalAcceleration(out, c, t) {
  const u = 1 - t;
  return set(
    out,
    6 * u * (c.p2.x - 2 * c.p1.x + c.p0.x) + 6 * t * (c.p3.x - 2 * c.p2.x + c.p1.x),
    6 * u * (c.p2.y - 2 * c.p1.y + c.p0.y) + 6 * t * (c.p3.y - 2 * c.p2.y + c.p1.y),
    6 * u * (c.p2.z - 2 * c.p1.z + c.p0.z) + 6 * t * (c.p3.z - 2 * c.p2.z + c.p1.z)
  );
}
var _d = v3();
function evalDirection(out, c, t) {
  evalDerivative(_d, c, t);
  if (lenSq(_d) > EPSILON * EPSILON) return normalize(out, _d);
  evalAcceleration(_d, c, t);
  if (lenSq(_d) > EPSILON * EPSILON) {
    if (t > 0.5) scale(_d, _d, -1);
    return normalize(out, _d);
  }
  sub(_d, c.p3, c.p0);
  return normalize(out, _d);
}
function split(c, t, left, right) {
  const p01 = lerp(v3(), c.p0, c.p1, t);
  const p12 = lerp(v3(), c.p1, c.p2, t);
  const p23 = lerp(v3(), c.p2, c.p3, t);
  const p012 = lerp(v3(), p01, p12, t);
  const p123 = lerp(v3(), p12, p23, t);
  const mid = lerp(v3(), p012, p123, t);
  const p0 = copy(v3(), c.p0);
  const p3 = copy(v3(), c.p3);
  copy(left.p0, p0);
  copy(left.p1, p01);
  copy(left.p2, p012);
  copy(left.p3, mid);
  copy(right.p0, mid);
  copy(right.p1, p123);
  copy(right.p2, p23);
  copy(right.p3, p3);
}
var GL_X = [
  0.0198550717512319,
  0.1016667612931866,
  0.2372337950418355,
  0.4082826787521751,
  0.591717321247825,
  0.7627662049581645,
  0.8983332387068134,
  0.9801449282487681
];
var GL_W = [
  0.0506142681451881,
  0.1111905172266872,
  0.1568533229389436,
  0.181341891689181,
  0.181341891689181,
  0.1568533229389436,
  0.1111905172266872,
  0.0506142681451881
];
function arcLength(c, a = 0, b = 1) {
  if (b <= a) return 0;
  const h = b - a;
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    evalDerivative(_d, c, a + h * GL_X[i]);
    sum += GL_W[i] * len(_d);
  }
  return sum * h;
}
function buildLengthTable(c, n, out) {
  const lut = out && out.length === n ? out : new Float64Array(n);
  lut[0] = 0;
  for (let i = 1; i < n; i++) {
    lut[i] = lut[i - 1] + arcLength(c, (i - 1) / (n - 1), i / (n - 1));
  }
  return lut;
}
function tAtLength(lut, d) {
  const n = lut.length;
  const total = lut[n - 1];
  if (d <= 0 || total <= 0) return 0;
  if (d >= total) return 1;
  let lo = 0;
  let hi = n - 1;
  while (hi - lo > 1) {
    const mid = lo + hi >> 1;
    if (lut[mid] < d) lo = mid;
    else hi = mid;
  }
  const seg = lut[hi] - lut[lo];
  const f = seg > 0 ? (d - lut[lo]) / seg : 0;
  return (lo + f) / (n - 1);
}
function nearestT(c, p, samples = 16, iterations = 4) {
  const q = v3();
  let bestT = 0;
  let best = Infinity;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    evalPosition(q, c, t);
    const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2 + (q.z - p.z) ** 2;
    if (d < best) {
      best = d;
      bestT = t;
    }
  }
  let step = 1 / samples;
  for (let it = 0; it < iterations; it++) {
    step *= 0.5;
    for (const t of [bestT - step, bestT + step]) {
      if (t < 0 || t > 1) continue;
      evalPosition(q, c, t);
      const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2 + (q.z - p.z) ** 2;
      if (d < best) {
        best = d;
        bestT = t;
      }
    }
  }
  return { t: bestT, distSq: best };
}

// assets/core/spline-core.ts
var DEFAULT_TENSION = 0.5;
var UP = { x: 0, y: 1, z: 0 };
function prevIndex(i, count, closed) {
  return closed ? wrap(i - 1, count) : Math.max(i - 1, 0);
}
function nextIndex(i, count, closed) {
  return closed ? wrap(i + 1, count) : Math.min(i + 1, count - 1);
}
function curveCount(s) {
  const n = s.knots.length;
  if (n < 2) return 0;
  return s.closed ? n : n - 1;
}
function tangentsEditable(mode) {
  return mode === 2 /* Mirrored */ || mode === 3 /* Continuous */ || mode === 4 /* Broken */;
}
function copyKnot(out, k) {
  copy(out.position, k.position);
  copy(out.tangentIn, k.tangentIn);
  copy(out.tangentOut, k.tangentOut);
  qCopy(out.rotation, k.rotation);
  out.mode = k.mode;
  out.tension = k.tension;
  return out;
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
  const t = normalize(v3(), tangent);
  let n = normalize(v3(), normal);
  if (lenSq(n) < EPSILON) n = copy(v3(), UP);
  if (lenSq(t) < EPSILON) {
    const f = anyPerpendicular(v3(), n);
    return qLookRotation(out, f, n);
  }
  if (Math.abs(dot(t, n)) > 1 - 1e-5) {
    const up2 = cross(v3(), t, { x: 1, y: 0, z: 0 });
    if (lenSq(up2) < EPSILON) cross(up2, t, { x: 0, y: 0, z: 1 });
    return qLookRotation(out, t, normalize(up2, up2));
  }
  const up = normalize(v3(), projectOnPlane(v3(), n, t));
  return qLookRotation(out, t, up);
}
function autoSmoothTangent(out, prev, cur, next, tension) {
  const d1 = dist(cur, prev);
  const d2 = dist(next, cur);
  if (d1 < EPSILON && d2 < EPSILON) return set(out, 0, 0, 0);
  if (d1 < EPSILON) return scale(out, sub(out, next, cur), 0.1);
  if (d2 < EPSILON) return scale(out, sub(out, cur, prev), 0.1);
  const a = tension;
  const d1a = Math.pow(d1, a);
  const d2a = Math.pow(d2, a);
  const d1a2 = d1a * d1a;
  const d2a2 = d2a * d2a;
  const k = 1 / (3 * d1a * (d1a + d2a));
  return set(
    out,
    (d1a2 * next.x - d2a2 * prev.x + (d2a2 - d1a2) * cur.x) * k,
    (d1a2 * next.y - d2a2 * prev.y + (d2a2 - d1a2) * cur.y) * k,
    (d1a2 * next.z - d2a2 * prev.z + (d2a2 - d1a2) * cur.z) * k
  );
}
function applyTangentMode(s, i) {
  const n = s.knots.length;
  if (i < 0 || i >= n) return;
  const k = s.knots[i];
  switch (k.mode) {
    case 1 /* Linear */:
      set(k.tangentIn, 0, 0, 0);
      set(k.tangentOut, 0, 0, 0);
      break;
    case 0 /* AutoSmooth */: {
      const prev = s.knots[prevIndex(i, n, s.closed)].position;
      const next = s.knots[nextIndex(i, n, s.closed)].position;
      const up = knotUp(v3(), k);
      const tin = autoSmoothTangent(v3(), next, k.position, prev, k.tension);
      const tout = autoSmoothTangent(v3(), prev, k.position, next, k.tension);
      let lin = len(tin);
      let lout = len(tout);
      let dir = tout;
      if (lin < EPSILON) lin = lout;
      if (lout < EPSILON) {
        lout = lin;
        dir = scale(v3(), tin, -1);
      }
      if (lenSq(dir) > EPSILON) knotRotation(k.rotation, dir, up);
      set(k.tangentIn, 0, 0, -lin);
      set(k.tangentOut, 0, 0, lout);
      break;
    }
    case 2 /* Mirrored */:
    case 3 /* Continuous */:
      bakeTangentDirection(k, k.mode === 2 /* Mirrored */, true);
      break;
    default:
      break;
  }
}
function bakeTangentDirection(k, mirrored, outIsMain) {
  const tout = tangentOutVec(v3(), k);
  const tin = tangentInVec(v3(), k);
  const main = outIsMain ? tout : scale(v3(), tin, -1);
  const other = outIsMain ? scale(v3(), tin, -1) : tout;
  const dir = lenSq(main) > EPSILON ? main : other;
  const up = knotUp(v3(), k);
  if (lenSq(dir) > EPSILON) knotRotation(k.rotation, dir, up);
  const lmain = len(main);
  const lother = len(other);
  if (mirrored) {
    const l = lmain > EPSILON ? lmain : lother;
    set(k.tangentOut, 0, 0, l);
    set(k.tangentIn, 0, 0, -l);
  } else if (outIsMain) {
    set(k.tangentOut, 0, 0, lmain);
    set(k.tangentIn, 0, 0, -lother);
  } else {
    set(k.tangentIn, 0, 0, -lmain);
    set(k.tangentOut, 0, 0, lother);
  }
}
function refreshAround(s, i) {
  const n = s.knots.length;
  if (!n) return;
  const p = prevIndex(i, n, s.closed);
  const q = nextIndex(i, n, s.closed);
  if (p !== i && s.knots[p].mode === 0 /* AutoSmooth */) applyTangentMode(s, p);
  applyTangentMode(s, i);
  if (q !== i && q !== p && s.knots[q].mode === 0 /* AutoSmooth */) applyTangentMode(s, q);
}
function refreshAll(s) {
  for (let i = 0; i < s.knots.length; i++) applyTangentMode(s, i);
}
function setKnotPosition(s, i, p) {
  copy(s.knots[i].position, p);
  refreshAround(s, i);
}
function setTangentVec(s, i, which, v) {
  const k = s.knots[i];
  if (!tangentsEditable(k.mode)) {
    if (k.mode === 1 /* Linear */) makeExplicitLinearTangents(s, i);
    k.mode = 3 /* Continuous */;
  }
  if (k.mode === 4 /* Broken */) {
    const local = qRotate(v3(), qInvert(q4(), k.rotation), v);
    copy(which === "in" ? k.tangentIn : k.tangentOut, local);
    return;
  }
  const l = len(v);
  const dir = which === "out" ? copy(v3(), v) : scale(v3(), v, -1);
  if (l > EPSILON) knotRotation(k.rotation, dir, knotUp(v3(), k));
  const mirrored = k.mode === 2 /* Mirrored */;
  if (which === "out") {
    const lin = mirrored ? l : len(k.tangentIn);
    set(k.tangentOut, 0, 0, l);
    set(k.tangentIn, 0, 0, -lin);
  } else {
    const lout = mirrored ? l : len(k.tangentOut);
    set(k.tangentIn, 0, 0, -l);
    set(k.tangentOut, 0, 0, lout);
  }
}
function makeExplicitLinearTangents(s, i) {
  const n = s.knots.length;
  const k = s.knots[i];
  const inv = qInvert(q4(), k.rotation);
  const prev = s.knots[prevIndex(i, n, s.closed)].position;
  const next = s.knots[nextIndex(i, n, s.closed)].position;
  qRotate(k.tangentIn, inv, scale(v3(), sub(v3(), prev, k.position), 1 / 3));
  qRotate(k.tangentOut, inv, scale(v3(), sub(v3(), next, k.position), 1 / 3));
}
function setTangentMode(s, i, mode) {
  const k = s.knots[i];
  if (k.mode === mode) {
    applyTangentMode(s, i);
    return;
  }
  if (k.mode === 1 /* Linear */ && tangentsEditable(mode)) makeExplicitLinearTangents(s, i);
  k.mode = mode;
  applyTangentMode(s, i);
}
function getCurve(s, i, out = curve()) {
  const n = s.knots.length;
  const a = s.knots[i];
  const b = s.knots[(i + 1) % n];
  copy(out.p0, a.position);
  add(out.p1, a.position, tangentOutVec(out.p1, a));
  add(out.p2, b.position, tangentInVec(out.p2, b));
  copy(out.p3, b.position);
  return out;
}
var LENGTH_SAMPLES = 32;
var UP_SAMPLES = 16;
var SplineCache = class {
  constructor() {
    /** Fingerprint of the data the cache was built from. */
    this.stamp = NaN;
    this.curves = [];
    this.lengths = [];
    /** Length of all curves before curve i. */
    this.starts = [];
    this.total = 0;
    this.tables = [];
    this.ups = [];
  }
};
var _hashBuf = new Float64Array(1);
var _hashInt = new Int32Array(_hashBuf.buffer);
function mix(h, v) {
  _hashBuf[0] = v;
  h = Math.imul(h ^ _hashInt[0], 16777619);
  h = Math.imul(h ^ _hashInt[1], 16777619);
  return h;
}
function fingerprint(s) {
  let h = 2166136261 | 0;
  h = mix(h, s.knots.length);
  h = mix(h, s.closed ? 1 : 0);
  for (const k of s.knots) {
    h = mix(h, k.position.x);
    h = mix(h, k.position.y);
    h = mix(h, k.position.z);
    h = mix(h, k.tangentIn.x);
    h = mix(h, k.tangentIn.y);
    h = mix(h, k.tangentIn.z);
    h = mix(h, k.tangentOut.x);
    h = mix(h, k.tangentOut.y);
    h = mix(h, k.tangentOut.z);
    h = mix(h, k.rotation.x);
    h = mix(h, k.rotation.y);
    h = mix(h, k.rotation.z);
    h = mix(h, k.rotation.w);
    h = mix(h, k.mode);
    h = mix(h, k.tension);
  }
  return h;
}
function buildCache(s, cache, stamp = fingerprint(s)) {
  const count = curveCount(s);
  cache.curves.length = count;
  cache.lengths.length = count;
  cache.starts.length = count;
  cache.tables.length = count;
  cache.ups.length = count;
  let total = 0;
  for (let i = 0; i < count; i++) {
    const c = getCurve(s, i, cache.curves[i] || curve());
    cache.curves[i] = c;
    const table = buildLengthTable(c, LENGTH_SAMPLES, cache.tables[i]);
    cache.tables[i] = table;
    cache.starts[i] = total;
    cache.lengths[i] = table[LENGTH_SAMPLES - 1];
    total += cache.lengths[i];
    cache.ups[i] = null;
  }
  cache.total = total;
  cache.stamp = stamp;
  return cache;
}
function ensureCache(s, cache) {
  const stamp = fingerprint(s);
  if (stamp !== cache.stamp) buildCache(s, cache, stamp);
  return cache;
}
function curvePointAt(cache, t, out = { index: 0, t: 0 }) {
  const count = cache.curves.length;
  if (!count) {
    out.index = 0;
    out.t = 0;
    return out;
  }
  if (cache.total <= EPSILON) {
    const x = clamp01(t) * count;
    out.index = Math.min(Math.floor(x), count - 1);
    out.t = x - out.index;
    return out;
  }
  const d = clamp01(t) * cache.total;
  let lo = 0;
  let hi = count - 1;
  while (lo < hi) {
    const mid = lo + hi + 1 >> 1;
    if (cache.starts[mid] <= d) lo = mid;
    else hi = mid - 1;
  }
  out.index = lo;
  out.t = refineT(cache.curves[lo], cache.tables[lo], d - cache.starts[lo]);
  return out;
}
var _dv = v3();
function exactLengthAt(c, table, t) {
  const n = table.length;
  if (t <= 0) return 0;
  if (t >= 1) return table[n - 1];
  const i = Math.min(Math.floor(t * (n - 1)), n - 2);
  return table[i] + arcLength(c, i / (n - 1), t);
}
function refineT(c, table, d) {
  let t = tAtLength(table, d);
  const n = table.length;
  if (t <= 0 || t >= 1) return t;
  const i = Math.min(Math.floor(t * (n - 1)), n - 2);
  const lo = i / (n - 1);
  const hi = (i + 1) / (n - 1);
  for (let k = 0; k < 2; k++) {
    const err = table[i] + arcLength(c, lo, t) - d;
    const speed = len(evalDerivative(_dv, c, t));
    if (speed < EPSILON) break;
    t = Math.min(hi, Math.max(lo, t - err / speed));
  }
  return t;
}
function normalizedTOf(cache, index, t) {
  if (!cache.curves.length) return 0;
  if (cache.total <= EPSILON) return (index + t) / cache.curves.length;
  return (cache.starts[index] + exactLengthAt(cache.curves[index], cache.tables[index], t)) / cache.total;
}
function knotUnitToT(cache, k) {
  const count = cache.curves.length;
  if (!count) return 0;
  const i = Math.min(Math.max(Math.floor(k), 0), count - 1);
  return normalizedTOf(cache, i, clamp01(k - i));
}
function tToKnotUnit(cache, t) {
  const p = curvePointAt(cache, t);
  return p.index + p.t;
}
var _cp = { index: 0, t: 0 };
function evaluatePosition(s, cache, t, out) {
  if (!s.knots.length) return set(out, 0, 0, 0);
  if (s.knots.length === 1 || !cache.curves.length) return copy(out, s.knots[0].position);
  curvePointAt(cache, t, _cp);
  return evalPosition(out, cache.curves[_cp.index], _cp.t);
}
function evaluateDirection(s, cache, t, out) {
  if (s.knots.length < 2 || !cache.curves.length) {
    if (s.knots.length === 1) return normalize(out, tangentOutVec(out, s.knots[0]));
    return set(out, 0, 0, 1);
  }
  curvePointAt(cache, t, _cp);
  return evalDirection(out, cache.curves[_cp.index], _cp.t);
}
function evaluateUp(s, cache, t, out) {
  if (!s.knots.length) return set(out, 0, 1, 0);
  if (s.knots.length === 1 || !cache.curves.length) return knotUp(out, s.knots[0]);
  curvePointAt(cache, t, _cp);
  return curveUp(s, cache, _cp.index, _cp.t, out);
}
function curveUp(s, cache, index, t, out) {
  let table = cache.ups[index];
  if (!table) table = cache.ups[index] = buildUpTable(s, cache.curves[index], index);
  const x = clamp01(t) * UP_SAMPLES;
  const i = Math.min(Math.floor(x), UP_SAMPLES - 1);
  const f = x - i;
  const a = v3(table[i * 3], table[i * 3 + 1], table[i * 3 + 2]);
  const b = v3(table[i * 3 + 3], table[i * 3 + 4], table[i * 3 + 5]);
  lerp(out, a, b, f);
  const dir = evalDirection(v3(), cache.curves[index], t);
  projectOnPlane(out, out, dir);
  if (lenSq(out) < EPSILON) return normalize(out, a);
  return normalize(out, out);
}
function buildUpTable(s, c, index) {
  const n = s.knots.length;
  const a = s.knots[index];
  const b = s.knots[(index + 1) % n];
  const table = new Float64Array((UP_SAMPLES + 1) * 3);
  const pos = [];
  const dirs = [];
  for (let i = 0; i <= UP_SAMPLES; i++) {
    const t = i / UP_SAMPLES;
    pos.push(evalPosition(v3(), c, t));
    dirs.push(evalDirection(v3(), c, t));
  }
  const ups = [];
  let r = normalize(v3(), projectOnPlane(v3(), knotUp(v3(), a), dirs[0]));
  if (lenSq(r) < EPSILON) r = anyPerpendicular(v3(), dirs[0]);
  ups.push(r);
  for (let i = 0; i < UP_SAMPLES; i++) {
    const v1 = sub(v3(), pos[i + 1], pos[i]);
    const c1 = dot(v1, v1);
    const ri = ups[i];
    const ti = dirs[i];
    let rL = ri;
    let tL = ti;
    if (c1 > EPSILON * EPSILON) {
      rL = scaleAndAdd(v3(), ri, v1, -2 / c1 * dot(v1, ri));
      tL = scaleAndAdd(v3(), ti, v1, -2 / c1 * dot(v1, ti));
    }
    const v2 = sub(v3(), dirs[i + 1], tL);
    const c2 = dot(v2, v2);
    let next = rL;
    if (c2 > EPSILON * EPSILON) next = scaleAndAdd(v3(), rL, v2, -2 / c2 * dot(v2, rL));
    next = normalize(v3(), projectOnPlane(v3(), next, dirs[i + 1]));
    if (lenSq(next) < EPSILON) next = copy(v3(), ups[i]);
    ups.push(next);
  }
  const endUp = normalize(v3(), projectOnPlane(v3(), knotUp(v3(), b), dirs[UP_SAMPLES]));
  let twist = 0;
  if (lenSq(endUp) > EPSILON) {
    const last = ups[UP_SAMPLES];
    const c2 = cross(v3(), last, endUp);
    twist = Math.atan2(dot(c2, dirs[UP_SAMPLES]), dot(last, endUp));
  }
  const q = q4();
  for (let i = 0; i <= UP_SAMPLES; i++) {
    let u = ups[i];
    if (twist !== 0) {
      qFromAxisAngle(q, dirs[i], twist * i / UP_SAMPLES);
      u = qRotate(v3(), q, u);
    }
    table[i * 3] = u.x;
    table[i * 3 + 1] = u.y;
    table[i * 3 + 2] = u.z;
  }
  return table;
}
function nearestPoint(s, cache, p) {
  const res = { t: 0, curve: 0, curveT: 0, position: v3(), distance: Infinity };
  if (!s.knots.length) return res;
  if (!cache.curves.length) {
    copy(res.position, s.knots[0].position);
    res.distance = dist(p, res.position);
    return res;
  }
  let best = Infinity;
  for (let i = 0; i < cache.curves.length; i++) {
    const r = nearestT(cache.curves[i], p, 16, 10);
    if (r.distSq < best) {
      best = r.distSq;
      res.curve = i;
      res.curveT = r.t;
    }
  }
  evalPosition(res.position, cache.curves[res.curve], res.curveT);
  res.distance = Math.sqrt(best);
  res.t = normalizedTOf(cache, res.curve, res.curveT);
  return res;
}
function insertKnot(s, index, k) {
  s.knots.splice(index, 0, k);
  refreshAround(s, index);
}
function removeKnot(s, index) {
  s.knots.splice(index, 1);
  const n = s.knots.length;
  if (!n) return;
  const next = Math.min(index, n - 1);
  applyTangentMode(s, prevIndex(next, n, s.closed));
  applyTangentMode(s, next);
}
function insertOnCurve(s, curveIndex, t, factory2) {
  const n = s.knots.length;
  const ia = curveIndex;
  const ib = (curveIndex + 1) % n;
  const a = s.knots[ia];
  const b = s.knots[ib];
  const c = getCurve(s, curveIndex);
  const left = curve();
  const right = curve();
  split(c, t, left, right);
  const k = factory2.knot();
  copy(k.position, left.p3);
  k.tension = DEFAULT_TENSION;
  const bothAuto = a.mode === 0 /* AutoSmooth */ && b.mode === 0 /* AutoSmooth */;
  const bothLinear = a.mode === 1 /* Linear */ && b.mode === 1 /* Linear */;
  const up = knotUp(v3(), a);
  const upB = knotUp(v3(), b);
  lerp(up, up, upB, t);
  const outDir = sub(v3(), right.p1, right.p0);
  knotRotation(k.rotation, lenSq(outDir) > EPSILON ? outDir : sub(v3(), right.p0, left.p2), up);
  if (bothAuto) {
    k.mode = 0 /* AutoSmooth */;
  } else if (bothLinear) {
    k.mode = 1 /* Linear */;
  } else {
    if (a.mode === 2 /* Mirrored */) a.mode = 3 /* Continuous */;
    if (b.mode === 2 /* Mirrored */) b.mode = 3 /* Continuous */;
    if (tangentsEditable(a.mode)) {
      qRotate(a.tangentOut, qInvert(q4(), a.rotation), sub(v3(), left.p1, left.p0));
    }
    if (tangentsEditable(b.mode)) {
      qRotate(b.tangentIn, qInvert(q4(), b.rotation), sub(v3(), right.p2, right.p3));
    }
    k.mode = 3 /* Continuous */;
    const inv = qInvert(q4(), k.rotation);
    qRotate(k.tangentIn, inv, sub(v3(), left.p2, left.p3));
    qRotate(k.tangentOut, inv, sub(v3(), right.p1, right.p0));
  }
  const index = ia + 1;
  s.knots.splice(index, 0, k);
  applyTangentMode(s, index);
  const m = s.knots.length;
  const p = prevIndex(index, m, s.closed);
  const q = nextIndex(index, m, s.closed);
  if (s.knots[p].mode === 0 /* AutoSmooth */) applyTangentMode(s, p);
  if (s.knots[q].mode === 0 /* AutoSmooth */) applyTangentMode(s, q);
  return index;
}
var Y180 = q4(0, 1, 0, 0);
function reverseFlow(s) {
  s.knots.reverse();
  for (const k of s.knots) {
    const oldIn = qRotate(v3(), Y180, k.tangentIn);
    const oldOut = qRotate(v3(), Y180, k.tangentOut);
    copy(k.tangentIn, oldOut);
    copy(k.tangentOut, oldIn);
    qMul(k.rotation, k.rotation, Y180);
  }
  refreshAll(s);
}
function setClosed(s, closed) {
  s.closed = closed;
  const n = s.knots.length;
  if (!n) return;
  applyTangentMode(s, 0);
  applyTangentMode(s, n - 1);
}
function sameRef(a, b) {
  return a.spline === b.spline && a.knot === b.knot;
}
function groupOf(c, r) {
  for (const g of c.links) {
    for (let i = 0; i + 1 < g.knots.length; i += 2) {
      if (g.knots[i] === r.spline && g.knots[i + 1] === r.knot) return g;
    }
  }
  return null;
}
function linkedKnots(c, r) {
  const g = groupOf(c, r);
  if (!g) return [];
  const res = [];
  for (let i = 0; i + 1 < g.knots.length; i += 2) {
    const o = { spline: g.knots[i], knot: g.knots[i + 1] };
    if (!sameRef(o, r)) res.push(o);
  }
  return res;
}
function linkKnots(c, refs, factory2) {
  if (refs.length < 2) return;
  const members = [];
  const add2 = (r) => {
    if (!members.some((m) => sameRef(m, r))) members.push(r);
  };
  for (const r of refs) {
    const g2 = groupOf(c, r);
    if (g2) {
      for (let i = 0; i + 1 < g2.knots.length; i += 2) add2({ spline: g2.knots[i], knot: g2.knots[i + 1] });
      c.links.splice(c.links.indexOf(g2), 1);
    }
    add2(r);
  }
  const g = factory2.link();
  g.knots.length = 0;
  for (const m of members) g.knots.push(m.spline, m.knot);
  c.links.push(g);
  const p = c.splines[refs[0].spline].knots[refs[0].knot].position;
  for (const m of members) {
    if (sameRef(m, refs[0])) continue;
    setKnotPosition(c.splines[m.spline], m.knot, p);
  }
}
function unlinkKnots(c, refs) {
  for (const r of refs) {
    const g = groupOf(c, r);
    if (!g) continue;
    for (let i = 0; i + 1 < g.knots.length; i += 2) {
      if (g.knots[i] === r.spline && g.knots[i + 1] === r.knot) {
        g.knots.splice(i, 2);
        break;
      }
    }
    if (g.knots.length < 4) c.links.splice(c.links.indexOf(g), 1);
  }
}
function syncLinked(c, r) {
  const p = c.splines[r.spline].knots[r.knot].position;
  for (const o of linkedKnots(c, r)) {
    const s = c.splines[o.spline];
    if (!s || !s.knots[o.knot]) continue;
    setKnotPosition(s, o.knot, p);
  }
}
function rewriteLinks(c, map) {
  for (let gi = c.links.length - 1; gi >= 0; gi--) {
    const g = c.links[gi];
    const next = [];
    for (let i = 0; i + 1 < g.knots.length; i += 2) {
      const r = map({ spline: g.knots[i], knot: g.knots[i + 1] });
      if (r && !next.some((_, j) => j % 2 === 0 && next[j] === r.spline && next[j + 1] === r.knot)) next.push(r.spline, r.knot);
    }
    if (next.length < 4) c.links.splice(gi, 1);
    else {
      g.knots.length = 0;
      g.knots.push(...next);
    }
  }
}
function linksOnKnotInserted(c, spline2, knot2) {
  rewriteLinks(c, (r) => r.spline === spline2 && r.knot >= knot2 ? { spline: spline2, knot: r.knot + 1 } : r);
}
function linksOnKnotRemoved(c, spline2, knot2) {
  rewriteLinks(c, (r) => {
    if (r.spline !== spline2) return r;
    if (r.knot === knot2) return null;
    return r.knot > knot2 ? { spline: spline2, knot: r.knot - 1 } : r;
  });
}
function linksOnSplineRemoved(c, spline2) {
  rewriteLinks(c, (r) => {
    if (r.spline === spline2) return null;
    return r.spline > spline2 ? { spline: r.spline - 1, knot: r.knot } : r;
  });
}
function linksOnReversed(c, spline2, count) {
  rewriteLinks(c, (r) => r.spline === spline2 ? { spline: spline2, knot: count - 1 - r.knot } : r);
}
function containerInsertKnot(c, spline2, index, k) {
  linksOnKnotInserted(c, spline2, index);
  insertKnot(c.splines[spline2], index, k);
}
function containerRemoveKnots(c, refs) {
  const sorted = [...refs].sort((a, b) => a.spline - b.spline || b.knot - a.knot);
  for (const r of sorted) {
    const s = c.splines[r.spline];
    if (!s || r.knot >= s.knots.length) continue;
    removeKnot(s, r.knot);
    linksOnKnotRemoved(c, r.spline, r.knot);
    if (s.knots.length < 3 && s.closed) s.closed = false;
  }
  for (let i = c.splines.length - 1; i >= 0; i--) {
    if (c.splines[i].knots.length === 0 && c.splines.length > 1) {
      c.splines.splice(i, 1);
      linksOnSplineRemoved(c, i);
    }
  }
}
function containerReverse(c, spline2) {
  const s = c.splines[spline2];
  linksOnReversed(c, spline2, s.knots.length);
  reverseFlow(s);
}
function cloneKnot(k, factory2) {
  return copyKnot(factory2.knot(), k);
}
function splitKnot(c, r, factory2) {
  const s = c.splines[r.spline];
  const n = s.knots.length;
  if (s.closed) {
    const order = [];
    for (let i = 0; i < n; i++) order.push(s.knots[(r.knot + i) % n]);
    rewriteLinks(c, (o) => o.spline === r.spline ? { spline: o.spline, knot: wrap(o.knot - r.knot, n) } : o);
    s.knots.length = 0;
    s.knots.push(...order, cloneKnot(order[0], factory2));
    s.closed = false;
    refreshAll(s);
    const first = { spline: r.spline, knot: 0 };
    const last = { spline: r.spline, knot: n };
    linkKnots(c, [first, last], factory2);
    return last;
  }
  if (r.knot <= 0 || r.knot >= n - 1) return null;
  const tail = factory2.spline();
  tail.closed = false;
  tail.knots.length = 0;
  tail.knots.push(cloneKnot(s.knots[r.knot], factory2), ...s.knots.slice(r.knot + 1));
  const newSpline = c.splines.length;
  rewriteLinks(c, (o) => o.spline === r.spline && o.knot > r.knot ? { spline: newSpline, knot: o.knot - r.knot } : o);
  s.knots.length = r.knot + 1;
  c.splines.push(tail);
  refreshAll(s);
  refreshAll(tail);
  const copyRef = { spline: newSpline, knot: 0 };
  linkKnots(c, [r, copyRef], factory2);
  return copyRef;
}
function isEndKnot(s, knot2) {
  return !s.closed && s.knots.length > 0 && (knot2 === 0 || knot2 === s.knots.length - 1);
}
function joinKnots(c, a, b, factory2) {
  const sa = c.splines[a.spline];
  const sb = c.splines[b.spline];
  if (!sa || !sb || !isEndKnot(sa, a.knot) || !isEndKnot(sb, b.knot)) return null;
  if (a.spline === b.spline) {
    if (a.knot === b.knot || sa.knots.length < 3) return null;
    const first = sa.knots[0];
    const last = sa.knots[sa.knots.length - 1];
    if (distSq(first.position, last.position) < EPSILON) {
      copy(first.tangentIn, last.tangentIn);
      linksOnKnotRemoved(c, a.spline, sa.knots.length - 1);
      sa.knots.pop();
    }
    setClosed(sa, true);
    return { spline: a.spline, knot: a.knot === 0 ? 0 : Math.min(a.knot, sa.knots.length - 1) };
  }
  if (a.knot === 0) {
    containerReverse(c, a.spline);
    a = { spline: a.spline, knot: sa.knots.length - 1 };
  }
  if (b.knot !== 0) {
    containerReverse(c, b.spline);
    b = { spline: b.spline, knot: 0 };
  }
  const ka = sa.knots[a.knot];
  const kb = sb.knots[0];
  const outWorld = tangentOutVec(v3(), kb);
  if (ka.mode === 1 /* Linear */ && kb.mode !== 1 /* Linear */) ka.mode = 4 /* Broken */;
  if (tangentsEditable(ka.mode)) {
    ka.mode = 4 /* Broken */;
    qRotate(ka.tangentOut, qInvert(q4(), ka.rotation), outWorld);
  }
  const offset = sa.knots.length - 1;
  const bIndex = b.spline;
  rewriteLinks(c, (o) => {
    if (o.spline !== bIndex) return o;
    if (o.knot === 0) return { spline: a.spline, knot: a.knot };
    return { spline: a.spline, knot: offset + o.knot };
  });
  sa.knots.push(...sb.knots.slice(1));
  c.splines.splice(bIndex, 1);
  rewriteLinks(c, (o) => o.spline > bIndex ? { spline: o.spline - 1, knot: o.knot } : o);
  const aSpline = a.spline > bIndex ? a.spline - 1 : a.spline;
  refreshAll(c.splines[aSpline]);
  return { spline: aSpline, knot: a.knot };
}
function shapeKnots(kind, o) {
  const r = o.size;
  const pts = [];
  const flat = (x, y, h = 0) => o.plane2D ? v3(x, y, h) : v3(x, h, -y);
  switch (kind) {
    case "square":
      pts.push(flat(-r, -r), flat(-r, r), flat(r, r), flat(r, -r));
      return { points: pts, mode: 1 /* Linear */, closed: true };
    case "rounded-square": {
      const c = r * 0.75;
      const e = r;
      pts.push(flat(-c, -e), flat(-e, -c), flat(-e, c), flat(-c, e), flat(c, e), flat(e, c), flat(e, -c), flat(c, -e));
      return { points: pts, mode: 0 /* AutoSmooth */, closed: true };
    }
    case "circle": {
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2;
        pts.push(flat(Math.cos(a) * r, Math.sin(a) * r));
      }
      return { points: pts, mode: 2 /* Mirrored */, closed: true, tangentScale: 0.5523 };
    }
    case "polygon": {
      const n = Math.max(3, Math.round(o.sides ?? 6));
      for (let i = 0; i < n; i++) {
        const a = i / n * Math.PI * 2 + Math.PI / 2;
        pts.push(flat(Math.cos(a) * r, Math.sin(a) * r));
      }
      return { points: pts, mode: 1 /* Linear */, closed: true };
    }
    case "star": {
      const n = Math.max(3, Math.round(o.sides ?? 5));
      for (let i = 0; i < n * 2; i++) {
        const a = i / (n * 2) * Math.PI * 2 + Math.PI / 2;
        const rr = i % 2 === 0 ? r : r * 0.45;
        pts.push(flat(Math.cos(a) * rr, Math.sin(a) * rr));
      }
      return { points: pts, mode: 1 /* Linear */, closed: true };
    }
    case "helix": {
      const turns = Math.max(0.25, o.turns ?? 3);
      const height = o.height ?? r * 2;
      const perTurn = 8;
      const n = Math.round(turns * perTurn);
      for (let i = 0; i <= n; i++) {
        const a = i / perTurn * Math.PI * 2;
        pts.push(flat(Math.cos(a) * r, Math.sin(a) * r, i / n * height));
      }
      return { points: pts, mode: 0 /* AutoSmooth */, closed: false };
    }
    case "line":
    default:
      pts.push(flat(-r, 0), flat(r, 0));
      return { points: pts, mode: 0 /* AutoSmooth */, closed: false };
  }
}
function buildShape(s, kind, o, factory2) {
  const shape = shapeKnots(kind, o);
  s.knots.length = 0;
  s.closed = shape.closed;
  const normal = o.plane2D ? v3(0, 0, 1) : v3(0, 1, 0);
  const n = shape.points.length;
  for (let i = 0; i < n; i++) {
    const k = factory2.knot();
    copy(k.position, shape.points[i]);
    set(k.tangentIn, 0, 0, 0);
    set(k.tangentOut, 0, 0, 0);
    qIdentity(k.rotation);
    k.mode = shape.mode;
    k.tension = DEFAULT_TENSION;
    s.knots.push(k);
  }
  for (let i = 0; i < n; i++) {
    const k = s.knots[i];
    const prev = s.knots[prevIndex(i, n, s.closed)].position;
    const next = s.knots[nextIndex(i, n, s.closed)].position;
    const dir = sub(v3(), next, prev);
    if (lenSq(dir) < EPSILON) sub(dir, next, k.position);
    knotRotation(k.rotation, dir, normal);
    if (shape.tangentScale) {
      const l = shape.tangentScale * o.size;
      set(k.tangentIn, 0, 0, -l);
      set(k.tangentOut, 0, 0, l);
    }
  }
  refreshAll(s);
}

// tests/harness.ts
var import_assert = __toESM(require("assert"));
var results = { passed: 0, failed: 0 };
function test(name, fn) {
  try {
    fn();
    results.passed++;
    console.log(`  ok   ${name}`);
  } catch (e) {
    results.failed++;
    const err = e;
    const detail = err instanceof import_assert.default.AssertionError ? err.message : String((err == null ? void 0 : err.stack) || err).split("\n").slice(0, 5).join("\n");
    console.log(`  FAIL ${name}
       ${detail.split("\n").join("\n       ")}`);
  }
}

// tests/core.test.ts
var factory = {
  knot: () => ({ position: v3(), tangentIn: v3(), tangentOut: v3(), rotation: q4(), mode: 0 /* AutoSmooth */, tension: DEFAULT_TENSION }),
  spline: () => ({ knots: [], closed: false }),
  link: () => ({ knots: [] })
};
function knot(x, y, z, mode = 0 /* AutoSmooth */) {
  const k = factory.knot();
  k.position = v3(x, y, z);
  k.mode = mode;
  return k;
}
function spline(points, mode = 0 /* AutoSmooth */, closed = false) {
  const s = { knots: points.map((p) => knot(p[0], p[1], p[2], mode)), closed };
  refreshAll(s);
  return s;
}
function near(a, b, eps = 1e-6, msg = "") {
  import_assert2.default.ok(Math.abs(a - b) <= eps, `${msg} ${a} != ${b} (\xB1${eps})`);
}
function nearV(a, b, eps = 1e-6, msg = "") {
  import_assert2.default.ok(dist(a, b) <= eps, `${msg} (${a.x}, ${a.y}, ${a.z}) != (${b.x}, ${b.y}, ${b.z})`);
}
function shapeSamples(s, n = 200) {
  const cache = buildCache(s, new SplineCache());
  const res = [];
  for (let i = 0; i <= n; i++) res.push(evaluatePosition(s, cache, i / n, v3()));
  return res;
}
function shapeDistance(a, b) {
  let worst = 0;
  for (const p of a) {
    let best = Infinity;
    for (let i = 0; i + 1 < b.length; i++) {
      const d = sub(v3(), b[i + 1], b[i]);
      const l2 = dot(d, d);
      let t = l2 > 0 ? dot(sub(v3(), p, b[i]), d) / l2 : 0;
      t = Math.max(0, Math.min(1, t));
      const q = v3(b[i].x + d.x * t, b[i].y + d.y * t, b[i].z + d.z * t);
      best = Math.min(best, dist(p, q));
    }
    worst = Math.max(worst, best);
  }
  return worst;
}
console.log("\nmath");
test("look rotation maps +Z to forward and +Y towards up", () => {
  const q = qLookRotation(q4(), v3(1, 0, 0), v3(0, 1, 0));
  nearV(qRotate(v3(), q, v3(0, 0, 1)), v3(1, 0, 0));
  nearV(qRotate(v3(), q, v3(0, 1, 0)), v3(0, 1, 0));
  const q2 = qLookRotation(q4(), v3(0, 1, 0), v3(0, 1, 0));
  nearV(qRotate(v3(), q2, v3(0, 0, 1)), v3(0, 1, 0));
});
test("euler round trip (cc.Quat.toEuler / fromEuler formulas)", () => {
  const q = qFromEuler(q4(), 30, -45, 60);
  const e = qToEuler(v3(), q);
  const q2 = qFromEuler(q4(), e.x, e.y, e.z);
  const a = qRotate(v3(), q, v3(0.3, -0.7, 0.2));
  const b = qRotate(v3(), q2, v3(0.3, -0.7, 0.2));
  nearV(a, b, 1e-9);
});
console.log("\ncurves");
test("split keeps the shape", () => {
  const c = curve();
  c.p0 = v3(0, 0, 0);
  c.p1 = v3(1, 2, 0);
  c.p2 = v3(3, 2, 1);
  c.p3 = v3(4, 0, 0);
  const l = curve();
  const r = curve();
  split(c, 0.3, l, r);
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    nearV(evalPosition(v3(), l, t), evalPosition(v3(), c, t * 0.3), 1e-9);
    nearV(evalPosition(v3(), r, t), evalPosition(v3(), c, 0.3 + t * 0.7), 1e-9);
  }
});
test("arc length of a straight curve is the chord", () => {
  const c = curve();
  c.p0 = v3(0, 0, 0);
  c.p1 = v3(0, 0, 0);
  c.p2 = v3(10, 0, 0);
  c.p3 = v3(10, 0, 0);
  near(arcLength(c), 10, 1e-6);
  const lut = buildLengthTable(c, 32);
  near(evalPosition(v3(), c, tAtLength(lut, 5)).x, 5, 0.02);
});
console.log("\ntangent modes");
test("AutoSmooth knots have collinear, opposite tangents", () => {
  const s = spline([[0, 0, 0], [2, 0, 1], [4, 0, -1], [6, 0, 0]]);
  for (let i = 1; i < 3; i++) {
    const tin = normalize(v3(), tangentInVec(v3(), s.knots[i]));
    const tout = normalize(v3(), tangentOutVec(v3(), s.knots[i]));
    near(dot(tin, tout), -1, 1e-9, `knot ${i}`);
  }
});
test("Linear knots have no tangents; Bezier modes get explicit ones", () => {
  const s = spline([[0, 0, 0], [3, 0, 0], [3, 0, 3]], 1 /* Linear */);
  import_assert2.default.strictEqual(len(tangentOutVec(v3(), s.knots[1])), 0);
  setTangentMode(s, 1, 4 /* Broken */);
  nearV(tangentInVec(v3(), s.knots[1]), v3(-1, 0, 0), 1e-9);
  nearV(tangentOutVec(v3(), s.knots[1]), v3(0, 0, 1), 1e-9);
});
test("Mirrored mirrors, Continuous keeps the other length, Broken is free", () => {
  const s = spline([[0, 0, 0], [4, 0, 0], [8, 0, 0]], 0 /* AutoSmooth */);
  setTangentMode(s, 1, 2 /* Mirrored */);
  setTangentVec(s, 1, "out", v3(0, 0, 2));
  nearV(tangentOutVec(v3(), s.knots[1]), v3(0, 0, 2), 1e-9);
  nearV(tangentInVec(v3(), s.knots[1]), v3(0, 0, -2), 1e-9);
  setTangentMode(s, 1, 3 /* Continuous */);
  setTangentVec(s, 1, "out", v3(3, 0, 0));
  nearV(tangentOutVec(v3(), s.knots[1]), v3(3, 0, 0), 1e-9);
  nearV(tangentInVec(v3(), s.knots[1]), v3(-2, 0, 0), 1e-9, "in keeps its length 2");
  setTangentMode(s, 1, 4 /* Broken */);
  setTangentVec(s, 1, "in", v3(0, 1, 0));
  nearV(tangentInVec(v3(), s.knots[1]), v3(0, 1, 0), 1e-9);
  nearV(tangentOutVec(v3(), s.knots[1]), v3(3, 0, 0), 1e-9, "out unchanged");
});
test("dragging an AutoSmooth tangent makes the knot Continuous", () => {
  const s = spline([[0, 0, 0], [4, 0, 0], [8, 0, 0]]);
  setTangentVec(s, 1, "out", v3(1, 1, 0));
  import_assert2.default.strictEqual(s.knots[1].mode, 3 /* Continuous */);
  const tin = normalize(v3(), tangentInVec(v3(), s.knots[1]));
  near(dot(tin, normalize(v3(), v3(1, 1, 0))), -1, 1e-9);
});
test("moving a knot updates AutoSmooth neighbors", () => {
  const s = spline([[0, 0, 0], [4, 0, 0], [8, 0, 0]]);
  const before = tangentOutVec(v3(), s.knots[0]);
  setKnotPosition(s, 1, v3(4, 0, 4));
  const after = tangentOutVec(v3(), s.knots[0]);
  import_assert2.default.ok(dist(before, after) > 1e-3);
});
console.log("\nedits keep the shape");
test("insert on curve keeps the shape (Bezier knots)", () => {
  const s = spline([[0, 0, 0], [3, 0, 2], [6, 0, -1], [9, 0, 0]], 2 /* Mirrored */);
  setTangentVec(s, 1, "out", v3(2, 0, 1));
  setTangentMode(s, 2, 4 /* Broken */);
  setTangentVec(s, 2, "in", v3(-1, 0, 2));
  const before = shapeSamples(s);
  const i = insertOnCurve(s, 1, 0.37, factory);
  import_assert2.default.strictEqual(i, 2);
  import_assert2.default.strictEqual(s.knots.length, 5);
  near(shapeDistance(before, shapeSamples(s, 400)), 0, 0.01);
});
test("insert on a linear curve keeps it linear", () => {
  const s = spline([[0, 0, 0], [5, 0, 0], [5, 0, 5]], 1 /* Linear */);
  insertOnCurve(s, 0, 0.5, factory);
  import_assert2.default.strictEqual(s.knots[1].mode, 1 /* Linear */);
  nearV(s.knots[1].position, v3(2.5, 0, 0), 1e-9);
});
test("reverse flow keeps the shape and flips the direction", () => {
  const s = spline([[0, 0, 0], [2, 0, 3], [5, 0, -1], [8, 1, 0]], 2 /* Mirrored */);
  setTangentMode(s, 2, 4 /* Broken */);
  setTangentVec(s, 2, "out", v3(1, 2, 0));
  const before = shapeSamples(s);
  const cache = buildCache(s, new SplineCache());
  const dirBefore = evaluateDirection(s, cache, 0.25, v3());
  reverseFlow(s);
  const after = shapeSamples(s);
  near(shapeDistance(before, after), 0, 0.01);
  const c2 = buildCache(s, new SplineCache());
  const dirAfter = evaluateDirection(s, c2, 0.75, v3());
  near(dot(dirBefore, dirAfter), -1, 0.02);
});
console.log("\nevaluation");
test("t is a normalized distance: equal steps are equal lengths", () => {
  const s = spline([[0, 0, 0], [1, 0, 0], [10, 0, 0]], 1 /* Linear */);
  const cache = buildCache(s, new SplineCache());
  near(cache.total, 10, 1e-6);
  nearV(evaluatePosition(s, cache, 0.5, v3()), v3(5, 0, 0), 0.02);
  nearV(evaluatePosition(s, cache, 0.05, v3()), v3(0.5, 0, 0), 0.02);
  nearV(evaluatePosition(s, cache, 1, v3()), v3(10, 0, 0), 1e-9);
});
test("curve point / normalized t / knot units round trip", () => {
  const s = spline([[0, 0, 0], [2, 0, 3], [5, 0, -1], [8, 1, 0]]);
  const cache = buildCache(s, new SplineCache());
  for (const t of [0, 0.1, 0.33, 0.5, 0.9, 1]) {
    const p = curvePointAt(cache, t);
    near(normalizedTOf(cache, p.index, p.t), t, 1e-4);
    near(knotUnitToT(cache, tToKnotUnit(cache, t)), t, 1e-4);
  }
  near(knotUnitToT(cache, 2), normalizedTOf(cache, 2, 0), 1e-9);
});
test("closed splines wrap to the first knot", () => {
  const s = spline([[0, 0, 0], [4, 0, 0], [4, 0, 4], [0, 0, 4]], 1 /* Linear */, true);
  import_assert2.default.strictEqual(curveCount(s), 4);
  const cache = buildCache(s, new SplineCache());
  near(cache.total, 16, 1e-6);
  nearV(evaluatePosition(s, cache, 1, v3()), v3(0, 0, 0), 1e-9);
  nearV(evaluatePosition(s, cache, 0.875, v3()), v3(0, 0, 2), 0.02);
});
test("nearest point", () => {
  const s = spline([[0, 0, 0], [10, 0, 0]], 1 /* Linear */);
  const cache = buildCache(s, new SplineCache());
  const r = nearestPoint(s, cache, v3(3, 2, 0));
  nearV(r.position, v3(3, 0, 0), 1e-3);
  near(r.distance, 2, 1e-3);
  near(r.t, 0.3, 1e-3);
});
test("up vectors follow the knots without twisting", () => {
  const s = spline([[0, 0, 0], [3, 0, 3], [6, 0, 0], [9, 0, 3]]);
  const cache = buildCache(s, new SplineCache());
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const up = evaluateUp(s, cache, t, v3());
    const dir = evaluateDirection(s, cache, t, v3());
    near(dot(up, dir), 0, 1e-6, `perpendicular at ${t}`);
    import_assert2.default.ok(up.y > 0.999, `up at ${t}: ${up.y}`);
  }
});
test("up vectors blend to a rolled knot", () => {
  const s = spline([[0, 0, 0], [10, 0, 0]], 1 /* Linear */);
  s.knots[1].rotation = qLookRotation(q4(), v3(1, 0, 0), v3(0, 0, 1));
  const cache = buildCache(s, new SplineCache());
  const end = evaluateUp(s, cache, 1, v3());
  nearV(end, v3(0, 0, 1), 1e-3);
  const mid = evaluateUp(s, cache, 0.5, v3());
  near(mid.y, Math.SQRT1_2, 0.02);
});
test("cache rebuilds when the data changes", () => {
  const s = spline([[0, 0, 0], [10, 0, 0]], 1 /* Linear */);
  const cache = ensureCache(s, new SplineCache());
  near(cache.total, 10, 1e-9);
  s.knots[1].position.x = 20;
  ensureCache(s, cache);
  near(cache.total, 20, 1e-9);
});
console.log("\ncontainer");
function container(...splines) {
  return { splines, links: [] };
}
test("linked knots share a position and follow each other", () => {
  const c = container(spline([[0, 0, 0], [5, 0, 0]]), spline([[5, 1, 0], [5, 0, 5]]));
  linkKnots(c, [{ spline: 0, knot: 1 }, { spline: 1, knot: 0 }], factory);
  nearV(c.splines[1].knots[0].position, v3(5, 0, 0));
  setKnotPosition(c.splines[0], 1, v3(6, 0, 1));
  syncLinked(c, { spline: 0, knot: 1 });
  nearV(c.splines[1].knots[0].position, v3(6, 0, 1));
  import_assert2.default.deepStrictEqual(linkedKnots(c, { spline: 1, knot: 0 }), [{ spline: 0, knot: 1 }]);
  unlinkKnots(c, [{ spline: 0, knot: 1 }]);
  import_assert2.default.strictEqual(c.links.length, 0);
});
test("links follow knot insertion and removal", () => {
  const c = container(spline([[0, 0, 0], [5, 0, 0], [9, 0, 0]]), spline([[9, 0, 0], [9, 0, 5]]));
  linkKnots(c, [{ spline: 0, knot: 2 }, { spline: 1, knot: 0 }], factory);
  containerInsertKnot(c, 0, 1, knot(2, 0, 0));
  import_assert2.default.deepStrictEqual(linkedKnots(c, { spline: 1, knot: 0 }), [{ spline: 0, knot: 3 }]);
  containerRemoveKnots(c, [{ spline: 0, knot: 0 }]);
  import_assert2.default.deepStrictEqual(linkedKnots(c, { spline: 1, knot: 0 }), [{ spline: 0, knot: 2 }]);
  containerRemoveKnots(c, [{ spline: 0, knot: 2 }]);
  import_assert2.default.strictEqual(c.links.length, 0);
});
test("removing every knot of a spline removes it (not the last spline)", () => {
  const c = container(spline([[0, 0, 0], [1, 0, 0]]), spline([[0, 0, 2], [1, 0, 2]]));
  containerRemoveKnots(c, [{ spline: 0, knot: 0 }, { spline: 0, knot: 1 }]);
  import_assert2.default.strictEqual(c.splines.length, 1);
  nearV(c.splines[0].knots[0].position, v3(0, 0, 2));
  containerRemoveKnots(c, [{ spline: 0, knot: 0 }, { spline: 0, knot: 1 }]);
  import_assert2.default.strictEqual(c.splines.length, 1);
  import_assert2.default.strictEqual(c.splines[0].knots.length, 0);
});
test("split an open spline at a knot", () => {
  const c = container(spline([[0, 0, 0], [3, 0, 0], [6, 0, 2], [9, 0, 0]]));
  const before = shapeSamples(c.splines[0]);
  const r = splitKnot(c, { spline: 0, knot: 1 }, factory);
  import_assert2.default.deepStrictEqual(r, { spline: 1, knot: 0 });
  import_assert2.default.strictEqual(c.splines[0].knots.length, 2);
  import_assert2.default.strictEqual(c.splines[1].knots.length, 3);
  import_assert2.default.deepStrictEqual(linkedKnots(c, { spline: 0, knot: 1 }), [{ spline: 1, knot: 0 }]);
});
test("split a closed spline opens it at the knot", () => {
  const c = container(spline([[0, 0, 0], [4, 0, 0], [4, 0, 4], [0, 0, 4]], 1 /* Linear */, true));
  const r = splitKnot(c, { spline: 0, knot: 2 }, factory);
  const s = c.splines[0];
  import_assert2.default.strictEqual(s.closed, false);
  import_assert2.default.strictEqual(s.knots.length, 5);
  nearV(s.knots[0].position, v3(4, 0, 4));
  nearV(s.knots[4].position, v3(4, 0, 4));
  import_assert2.default.deepStrictEqual(r, { spline: 0, knot: 4 });
  import_assert2.default.deepStrictEqual(linkedKnots(c, { spline: 0, knot: 0 }), [{ spline: 0, knot: 4 }]);
});
test("join end knots of two splines merges them", () => {
  const c = container(spline([[0, 0, 0], [3, 0, 0]]), spline([[6, 0, 0], [9, 0, 0]]));
  const r = joinKnots(c, { spline: 0, knot: 1 }, { spline: 1, knot: 0 }, factory);
  import_assert2.default.strictEqual(c.splines.length, 1);
  import_assert2.default.strictEqual(c.splines[0].knots.length, 3);
  nearV(c.splines[0].knots[1].position, v3(3, 0, 0));
  nearV(c.splines[0].knots[2].position, v3(9, 0, 0));
  import_assert2.default.deepStrictEqual(r, { spline: 0, knot: 1 });
});
test("join reverses splines as needed", () => {
  const c = container(spline([[3, 0, 0], [0, 0, 0]]), spline([[9, 0, 0], [6, 0, 0]]));
  joinKnots(c, { spline: 0, knot: 0 }, { spline: 1, knot: 1 }, factory);
  const pts = c.splines[0].knots.map((k) => k.position.x);
  import_assert2.default.deepStrictEqual(pts, [0, 3, 9]);
});
test("join the two ends of one spline closes it", () => {
  const c = container(spline([[0, 0, 0], [4, 0, 0], [4, 0, 4], [0, 0, 0]]));
  joinKnots(c, { spline: 0, knot: 0 }, { spline: 0, knot: 3 }, factory);
  import_assert2.default.strictEqual(c.splines[0].closed, true);
  import_assert2.default.strictEqual(c.splines[0].knots.length, 3, "the duplicate end knot is dropped");
});
test("closing and opening re-applies the end knots", () => {
  const s = spline([[0, 0, 0], [4, 0, 0], [4, 0, 4]]);
  const before = tangentInVec(v3(), s.knots[0]);
  setClosed(s, true);
  import_assert2.default.ok(dist(before, tangentInVec(v3(), s.knots[0])) > 1e-3);
});
console.log("\nshapes");
test("circle shape stays within 0.1% of the radius", () => {
  const s = factory.spline();
  buildShape(s, "circle", { size: 5 }, factory);
  const cache = buildCache(s, new SplineCache());
  for (let i = 0; i < 64; i++) {
    const p = evaluatePosition(s, cache, i / 64, v3());
    near(Math.hypot(p.x, p.z), 5, 5e-3 * 5 / 5 * 1.1, `point ${i}`);
    near(p.y, 0, 1e-9);
  }
  near(cache.total, 2 * Math.PI * 5, 0.01);
});
test("2D shapes lie in the XY plane, knots face up +Z", () => {
  const s = factory.spline();
  buildShape(s, "square", { size: 100, plane2D: true }, factory);
  for (const k of s.knots) {
    near(k.position.z, 0);
    nearV(knotUp(v3(), k), v3(0, 0, 1), 1e-9);
  }
  const cache = buildCache(s, new SplineCache());
  near(cache.total, 800, 1e-6);
});
test("helix rises along +Y", () => {
  const s = factory.spline();
  buildShape(s, "helix", { size: 1, turns: 2, height: 4 }, factory);
  near(s.knots[s.knots.length - 1].position.y, 4, 1e-9);
  import_assert2.default.strictEqual(s.closed, false);
});
test("knot rotations of shapes point along the travel direction", () => {
  const s = factory.spline();
  buildShape(s, "polygon", { size: 2, sides: 6 }, factory);
  const cache = buildCache(s, new SplineCache());
  for (let i = 0; i < s.knots.length; i++) {
    const fwd = qRotate(v3(), s.knots[i].rotation, v3(0, 0, 1));
    const c = getCurve(s, i);
    const chord = normalize(v3(), sub(v3(), c.p3, c.p0));
    import_assert2.default.ok(dot(fwd, chord) > 0.4, `knot ${i}`);
  }
});
console.log(`
${results.passed} passed, ${results.failed} failed`);
process.exitCode = results.failed ? 1 : 0;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY29yZS50ZXN0LnRzIiwgIi4uLy4uL2Fzc2V0cy9jb3JlL21hdGgudHMiLCAiLi4vLi4vYXNzZXRzL2NvcmUvY3VydmUudHMiLCAiLi4vLi4vYXNzZXRzL2NvcmUvc3BsaW5lLWNvcmUudHMiLCAiLi4vaGFybmVzcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtcbiAgICB2MywgcTQsIGxlbiwgZGlzdCwgZG90LCBzdWIsIG5vcm1hbGl6ZSwgcVJvdGF0ZSwgcUxvb2tSb3RhdGlvbiwgcVRvRXVsZXIsIHFGcm9tRXVsZXIsIHFJZGVudGl0eSwgY3Jvc3MsIFYzLFxufSBmcm9tICcuLi9hc3NldHMvY29yZS9tYXRoJztcbmltcG9ydCB7IGN1cnZlLCBldmFsUG9zaXRpb24sIHNwbGl0LCBhcmNMZW5ndGgsIGJ1aWxkTGVuZ3RoVGFibGUsIHRBdExlbmd0aCB9IGZyb20gJy4uL2Fzc2V0cy9jb3JlL2N1cnZlJztcbmltcG9ydCB7XG4gICAgVGFuZ2VudE1vZGUsIEtub3RMaWtlLCBTcGxpbmVMaWtlLCBDb250YWluZXJMaWtlLCBGYWN0b3J5LCBTcGxpbmVDYWNoZSwgYnVpbGRDYWNoZSwgZW5zdXJlQ2FjaGUsIGV2YWx1YXRlUG9zaXRpb24sXG4gICAgZXZhbHVhdGVEaXJlY3Rpb24sIGV2YWx1YXRlVXAsIGN1cnZlUG9pbnRBdCwgbm9ybWFsaXplZFRPZiwgbmVhcmVzdFBvaW50LCBnZXRDdXJ2ZSwgY3VydmVDb3VudCwgc2V0VGFuZ2VudE1vZGUsXG4gICAgc2V0VGFuZ2VudFZlYywgaW5zZXJ0T25DdXJ2ZSwgcmV2ZXJzZUZsb3csIHJlZnJlc2hBbGwsIHRhbmdlbnRJblZlYywgdGFuZ2VudE91dFZlYywga25vdFVwLCBsaW5rS25vdHMsIHVubGlua0tub3RzLFxuICAgIGxpbmtlZEtub3RzLCBjb250YWluZXJSZW1vdmVLbm90cywgc3BsaXRLbm90LCBqb2luS25vdHMsIGJ1aWxkU2hhcGUsIHNldEtub3RQb3NpdGlvbiwgc3luY0xpbmtlZCwgc2V0Q2xvc2VkLFxuICAgIGtub3RVbml0VG9ULCB0VG9Lbm90VW5pdCwgY29udGFpbmVySW5zZXJ0S25vdCwgREVGQVVMVF9URU5TSU9OLFxufSBmcm9tICcuLi9hc3NldHMvY29yZS9zcGxpbmUtY29yZSc7XG5pbXBvcnQgeyB0ZXN0LCByZXN1bHRzIH0gZnJvbSAnLi9oYXJuZXNzJztcblxuY29uc3QgZmFjdG9yeTogRmFjdG9yeSA9IHtcbiAgICBrbm90OiAoKTogS25vdExpa2UgPT4gKHsgcG9zaXRpb246IHYzKCksIHRhbmdlbnRJbjogdjMoKSwgdGFuZ2VudE91dDogdjMoKSwgcm90YXRpb246IHE0KCksIG1vZGU6IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgsIHRlbnNpb246IERFRkFVTFRfVEVOU0lPTiB9KSxcbiAgICBzcGxpbmU6ICgpOiBTcGxpbmVMaWtlID0+ICh7IGtub3RzOiBbXSwgY2xvc2VkOiBmYWxzZSB9KSxcbiAgICBsaW5rOiAoKSA9PiAoeyBrbm90czogW10gfSksXG59O1xuXG5mdW5jdGlvbiBrbm90KHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIG1vZGUgPSBUYW5nZW50TW9kZS5BdXRvU21vb3RoKTogS25vdExpa2Uge1xuICAgIGNvbnN0IGsgPSBmYWN0b3J5Lmtub3QoKTtcbiAgICBrLnBvc2l0aW9uID0gdjMoeCwgeSwgeik7XG4gICAgay5tb2RlID0gbW9kZTtcbiAgICByZXR1cm4gaztcbn1cblxuZnVuY3Rpb24gc3BsaW5lKHBvaW50czogW251bWJlciwgbnVtYmVyLCBudW1iZXJdW10sIG1vZGUgPSBUYW5nZW50TW9kZS5BdXRvU21vb3RoLCBjbG9zZWQgPSBmYWxzZSk6IFNwbGluZUxpa2Uge1xuICAgIGNvbnN0IHM6IFNwbGluZUxpa2UgPSB7IGtub3RzOiBwb2ludHMubWFwKChwKSA9PiBrbm90KHBbMF0sIHBbMV0sIHBbMl0sIG1vZGUpKSwgY2xvc2VkIH07XG4gICAgcmVmcmVzaEFsbChzKTtcbiAgICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gbmVhcihhOiBudW1iZXIsIGI6IG51bWJlciwgZXBzID0gMWUtNiwgbXNnID0gJycpIHtcbiAgICBhc3NlcnQub2soTWF0aC5hYnMoYSAtIGIpIDw9IGVwcywgYCR7bXNnfSAke2F9ICE9ICR7Yn0gKFx1MDBCMSR7ZXBzfSlgKTtcbn1cblxuZnVuY3Rpb24gbmVhclYoYTogVjMsIGI6IFYzLCBlcHMgPSAxZS02LCBtc2cgPSAnJykge1xuICAgIGFzc2VydC5vayhkaXN0KGEsIGIpIDw9IGVwcywgYCR7bXNnfSAoJHthLnh9LCAke2EueX0sICR7YS56fSkgIT0gKCR7Yi54fSwgJHtiLnl9LCAke2Iuen0pYCk7XG59XG5cbi8qKiBQb2ludHMgYWxvbmcgdGhlIHNwbGluZSBieSBjdXJ2ZSBwYXJhbWV0ZXIgKHNoYXBlIGNoZWNrIGluZGVwZW5kZW50IG9mIGtub3QgY291bnQpLiAqL1xuZnVuY3Rpb24gc2hhcGVTYW1wbGVzKHM6IFNwbGluZUxpa2UsIG4gPSAyMDApOiBWM1tdIHtcbiAgICBjb25zdCBjYWNoZSA9IGJ1aWxkQ2FjaGUocywgbmV3IFNwbGluZUNhY2hlKCkpO1xuICAgIGNvbnN0IHJlczogVjNbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG47IGkrKykgcmVzLnB1c2goZXZhbHVhdGVQb3NpdGlvbihzLCBjYWNoZSwgaSAvIG4sIHYzKCkpKTtcbiAgICByZXR1cm4gcmVzO1xufVxuXG4vKiogTWF4IGRpc3RhbmNlIGZyb20gZWFjaCBwb2ludCBvZiBgYWAgdG8gdGhlIHBvbHlsaW5lIGBiYC4gKi9cbmZ1bmN0aW9uIHNoYXBlRGlzdGFuY2UoYTogVjNbXSwgYjogVjNbXSk6IG51bWJlciB7XG4gICAgbGV0IHdvcnN0ID0gMDtcbiAgICBmb3IgKGNvbnN0IHAgb2YgYSkge1xuICAgICAgICBsZXQgYmVzdCA9IEluZmluaXR5O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gc3ViKHYzKCksIGJbaSArIDFdLCBiW2ldKTtcbiAgICAgICAgICAgIGNvbnN0IGwyID0gZG90KGQsIGQpO1xuICAgICAgICAgICAgbGV0IHQgPSBsMiA+IDAgPyBkb3Qoc3ViKHYzKCksIHAsIGJbaV0pLCBkKSAvIGwyIDogMDtcbiAgICAgICAgICAgIHQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0KSk7XG4gICAgICAgICAgICBjb25zdCBxID0gdjMoYltpXS54ICsgZC54ICogdCwgYltpXS55ICsgZC55ICogdCwgYltpXS56ICsgZC56ICogdCk7XG4gICAgICAgICAgICBiZXN0ID0gTWF0aC5taW4oYmVzdCwgZGlzdChwLCBxKSk7XG4gICAgICAgIH1cbiAgICAgICAgd29yc3QgPSBNYXRoLm1heCh3b3JzdCwgYmVzdCk7XG4gICAgfVxuICAgIHJldHVybiB3b3JzdDtcbn1cblxuY29uc29sZS5sb2coJ1xcbm1hdGgnKTtcblxudGVzdCgnbG9vayByb3RhdGlvbiBtYXBzICtaIHRvIGZvcndhcmQgYW5kICtZIHRvd2FyZHMgdXAnLCAoKSA9PiB7XG4gICAgY29uc3QgcSA9IHFMb29rUm90YXRpb24ocTQoKSwgdjMoMSwgMCwgMCksIHYzKDAsIDEsIDApKTtcbiAgICBuZWFyVihxUm90YXRlKHYzKCksIHEsIHYzKDAsIDAsIDEpKSwgdjMoMSwgMCwgMCkpO1xuICAgIG5lYXJWKHFSb3RhdGUodjMoKSwgcSwgdjMoMCwgMSwgMCkpLCB2MygwLCAxLCAwKSk7XG4gICAgY29uc3QgcTIgPSBxTG9va1JvdGF0aW9uKHE0KCksIHYzKDAsIDEsIDApLCB2MygwLCAxLCAwKSk7IC8vIGRlZ2VuZXJhdGUgdXBcbiAgICBuZWFyVihxUm90YXRlKHYzKCksIHEyLCB2MygwLCAwLCAxKSksIHYzKDAsIDEsIDApKTtcbn0pO1xuXG50ZXN0KCdldWxlciByb3VuZCB0cmlwIChjYy5RdWF0LnRvRXVsZXIgLyBmcm9tRXVsZXIgZm9ybXVsYXMpJywgKCkgPT4ge1xuICAgIGNvbnN0IHEgPSBxRnJvbUV1bGVyKHE0KCksIDMwLCAtNDUsIDYwKTtcbiAgICBjb25zdCBlID0gcVRvRXVsZXIodjMoKSwgcSk7XG4gICAgY29uc3QgcTIgPSBxRnJvbUV1bGVyKHE0KCksIGUueCwgZS55LCBlLnopO1xuICAgIGNvbnN0IGEgPSBxUm90YXRlKHYzKCksIHEsIHYzKDAuMywgLTAuNywgMC4yKSk7XG4gICAgY29uc3QgYiA9IHFSb3RhdGUodjMoKSwgcTIsIHYzKDAuMywgLTAuNywgMC4yKSk7XG4gICAgbmVhclYoYSwgYiwgMWUtOSk7XG59KTtcblxuY29uc29sZS5sb2coJ1xcbmN1cnZlcycpO1xuXG50ZXN0KCdzcGxpdCBrZWVwcyB0aGUgc2hhcGUnLCAoKSA9PiB7XG4gICAgY29uc3QgYyA9IGN1cnZlKCk7XG4gICAgYy5wMCA9IHYzKDAsIDAsIDApOyBjLnAxID0gdjMoMSwgMiwgMCk7IGMucDIgPSB2MygzLCAyLCAxKTsgYy5wMyA9IHYzKDQsIDAsIDApO1xuICAgIGNvbnN0IGwgPSBjdXJ2ZSgpO1xuICAgIGNvbnN0IHIgPSBjdXJ2ZSgpO1xuICAgIHNwbGl0KGMsIDAuMywgbCwgcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTA7IGkrKykge1xuICAgICAgICBjb25zdCB0ID0gaSAvIDEwO1xuICAgICAgICBuZWFyVihldmFsUG9zaXRpb24odjMoKSwgbCwgdCksIGV2YWxQb3NpdGlvbih2MygpLCBjLCB0ICogMC4zKSwgMWUtOSk7XG4gICAgICAgIG5lYXJWKGV2YWxQb3NpdGlvbih2MygpLCByLCB0KSwgZXZhbFBvc2l0aW9uKHYzKCksIGMsIDAuMyArIHQgKiAwLjcpLCAxZS05KTtcbiAgICB9XG59KTtcblxudGVzdCgnYXJjIGxlbmd0aCBvZiBhIHN0cmFpZ2h0IGN1cnZlIGlzIHRoZSBjaG9yZCcsICgpID0+IHtcbiAgICBjb25zdCBjID0gY3VydmUoKTtcbiAgICBjLnAwID0gdjMoMCwgMCwgMCk7IGMucDEgPSB2MygwLCAwLCAwKTsgYy5wMiA9IHYzKDEwLCAwLCAwKTsgYy5wMyA9IHYzKDEwLCAwLCAwKTtcbiAgICBuZWFyKGFyY0xlbmd0aChjKSwgMTAsIDFlLTYpO1xuICAgIGNvbnN0IGx1dCA9IGJ1aWxkTGVuZ3RoVGFibGUoYywgMzIpO1xuICAgIC8vIEhhbGZ3YXkgYWxvbmcgdGhlIGxlbmd0aCBsYW5kcyBhdCB4ID0gNSwgZXZlbiB0aG91Z2ggdGhlIHBhcmFtZXRlciBzcGVlZCBpcyBub3QgdW5pZm9ybS5cbiAgICBuZWFyKGV2YWxQb3NpdGlvbih2MygpLCBjLCB0QXRMZW5ndGgobHV0LCA1KSkueCwgNSwgMC4wMik7XG59KTtcblxuY29uc29sZS5sb2coJ1xcbnRhbmdlbnQgbW9kZXMnKTtcblxudGVzdCgnQXV0b1Ntb290aCBrbm90cyBoYXZlIGNvbGxpbmVhciwgb3Bwb3NpdGUgdGFuZ2VudHMnLCAoKSA9PiB7XG4gICAgY29uc3QgcyA9IHNwbGluZShbWzAsIDAsIDBdLCBbMiwgMCwgMV0sIFs0LCAwLCAtMV0sIFs2LCAwLCAwXV0pO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRpbiA9IG5vcm1hbGl6ZSh2MygpLCB0YW5nZW50SW5WZWModjMoKSwgcy5rbm90c1tpXSkpO1xuICAgICAgICBjb25zdCB0b3V0ID0gbm9ybWFsaXplKHYzKCksIHRhbmdlbnRPdXRWZWModjMoKSwgcy5rbm90c1tpXSkpO1xuICAgICAgICBuZWFyKGRvdCh0aW4sIHRvdXQpLCAtMSwgMWUtOSwgYGtub3QgJHtpfWApO1xuICAgIH1cbn0pO1xuXG50ZXN0KCdMaW5lYXIga25vdHMgaGF2ZSBubyB0YW5nZW50czsgQmV6aWVyIG1vZGVzIGdldCBleHBsaWNpdCBvbmVzJywgKCkgPT4ge1xuICAgIGNvbnN0IHMgPSBzcGxpbmUoW1swLCAwLCAwXSwgWzMsIDAsIDBdLCBbMywgMCwgM11dLCBUYW5nZW50TW9kZS5MaW5lYXIpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChsZW4odGFuZ2VudE91dFZlYyh2MygpLCBzLmtub3RzWzFdKSksIDApO1xuICAgIHNldFRhbmdlbnRNb2RlKHMsIDEsIFRhbmdlbnRNb2RlLkJyb2tlbik7XG4gICAgLy8gQSB0aGlyZCBvZiB0aGUgd2F5IHRvIGVhY2ggbmVpZ2hib3IgKFVuaXR5J3MgZXhwbGljaXQgbGluZWFyIHRhbmdlbnRzKS5cbiAgICBuZWFyVih0YW5nZW50SW5WZWModjMoKSwgcy5rbm90c1sxXSksIHYzKC0xLCAwLCAwKSwgMWUtOSk7XG4gICAgbmVhclYodGFuZ2VudE91dFZlYyh2MygpLCBzLmtub3RzWzFdKSwgdjMoMCwgMCwgMSksIDFlLTkpO1xufSk7XG5cbnRlc3QoJ01pcnJvcmVkIG1pcnJvcnMsIENvbnRpbnVvdXMga2VlcHMgdGhlIG90aGVyIGxlbmd0aCwgQnJva2VuIGlzIGZyZWUnLCAoKSA9PiB7XG4gICAgY29uc3QgcyA9IHNwbGluZShbWzAsIDAsIDBdLCBbNCwgMCwgMF0sIFs4LCAwLCAwXV0sIFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpO1xuICAgIHNldFRhbmdlbnRNb2RlKHMsIDEsIFRhbmdlbnRNb2RlLk1pcnJvcmVkKTtcbiAgICBzZXRUYW5nZW50VmVjKHMsIDEsICdvdXQnLCB2MygwLCAwLCAyKSk7XG4gICAgbmVhclYodGFuZ2VudE91dFZlYyh2MygpLCBzLmtub3RzWzFdKSwgdjMoMCwgMCwgMiksIDFlLTkpO1xuICAgIG5lYXJWKHRhbmdlbnRJblZlYyh2MygpLCBzLmtub3RzWzFdKSwgdjMoMCwgMCwgLTIpLCAxZS05KTtcblxuICAgIHNldFRhbmdlbnRNb2RlKHMsIDEsIFRhbmdlbnRNb2RlLkNvbnRpbnVvdXMpO1xuICAgIHNldFRhbmdlbnRWZWMocywgMSwgJ291dCcsIHYzKDMsIDAsIDApKTtcbiAgICBuZWFyVih0YW5nZW50T3V0VmVjKHYzKCksIHMua25vdHNbMV0pLCB2MygzLCAwLCAwKSwgMWUtOSk7XG4gICAgbmVhclYodGFuZ2VudEluVmVjKHYzKCksIHMua25vdHNbMV0pLCB2MygtMiwgMCwgMCksIDFlLTksICdpbiBrZWVwcyBpdHMgbGVuZ3RoIDInKTtcblxuICAgIHNldFRhbmdlbnRNb2RlKHMsIDEsIFRhbmdlbnRNb2RlLkJyb2tlbik7XG4gICAgc2V0VGFuZ2VudFZlYyhzLCAxLCAnaW4nLCB2MygwLCAxLCAwKSk7XG4gICAgbmVhclYodGFuZ2VudEluVmVjKHYzKCksIHMua25vdHNbMV0pLCB2MygwLCAxLCAwKSwgMWUtOSk7XG4gICAgbmVhclYodGFuZ2VudE91dFZlYyh2MygpLCBzLmtub3RzWzFdKSwgdjMoMywgMCwgMCksIDFlLTksICdvdXQgdW5jaGFuZ2VkJyk7XG59KTtcblxudGVzdCgnZHJhZ2dpbmcgYW4gQXV0b1Ntb290aCB0YW5nZW50IG1ha2VzIHRoZSBrbm90IENvbnRpbnVvdXMnLCAoKSA9PiB7XG4gICAgY29uc3QgcyA9IHNwbGluZShbWzAsIDAsIDBdLCBbNCwgMCwgMF0sIFs4LCAwLCAwXV0pO1xuICAgIHNldFRhbmdlbnRWZWMocywgMSwgJ291dCcsIHYzKDEsIDEsIDApKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocy5rbm90c1sxXS5tb2RlLCBUYW5nZW50TW9kZS5Db250aW51b3VzKTtcbiAgICBjb25zdCB0aW4gPSBub3JtYWxpemUodjMoKSwgdGFuZ2VudEluVmVjKHYzKCksIHMua25vdHNbMV0pKTtcbiAgICBuZWFyKGRvdCh0aW4sIG5vcm1hbGl6ZSh2MygpLCB2MygxLCAxLCAwKSkpLCAtMSwgMWUtOSk7XG59KTtcblxudGVzdCgnbW92aW5nIGEga25vdCB1cGRhdGVzIEF1dG9TbW9vdGggbmVpZ2hib3JzJywgKCkgPT4ge1xuICAgIGNvbnN0IHMgPSBzcGxpbmUoW1swLCAwLCAwXSwgWzQsIDAsIDBdLCBbOCwgMCwgMF1dKTtcbiAgICBjb25zdCBiZWZvcmUgPSB0YW5nZW50T3V0VmVjKHYzKCksIHMua25vdHNbMF0pO1xuICAgIHNldEtub3RQb3NpdGlvbihzLCAxLCB2Myg0LCAwLCA0KSk7XG4gICAgY29uc3QgYWZ0ZXIgPSB0YW5nZW50T3V0VmVjKHYzKCksIHMua25vdHNbMF0pO1xuICAgIGFzc2VydC5vayhkaXN0KGJlZm9yZSwgYWZ0ZXIpID4gMWUtMyk7XG59KTtcblxuY29uc29sZS5sb2coJ1xcbmVkaXRzIGtlZXAgdGhlIHNoYXBlJyk7XG5cbnRlc3QoJ2luc2VydCBvbiBjdXJ2ZSBrZWVwcyB0aGUgc2hhcGUgKEJlemllciBrbm90cyknLCAoKSA9PiB7XG4gICAgY29uc3QgcyA9IHNwbGluZShbWzAsIDAsIDBdLCBbMywgMCwgMl0sIFs2LCAwLCAtMV0sIFs5LCAwLCAwXV0sIFRhbmdlbnRNb2RlLk1pcnJvcmVkKTtcbiAgICBzZXRUYW5nZW50VmVjKHMsIDEsICdvdXQnLCB2MygyLCAwLCAxKSk7XG4gICAgc2V0VGFuZ2VudE1vZGUocywgMiwgVGFuZ2VudE1vZGUuQnJva2VuKTtcbiAgICBzZXRUYW5nZW50VmVjKHMsIDIsICdpbicsIHYzKC0xLCAwLCAyKSk7XG4gICAgY29uc3QgYmVmb3JlID0gc2hhcGVTYW1wbGVzKHMpO1xuICAgIGNvbnN0IGkgPSBpbnNlcnRPbkN1cnZlKHMsIDEsIDAuMzcsIGZhY3RvcnkpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChpLCAyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocy5rbm90cy5sZW5ndGgsIDUpO1xuICAgIG5lYXIoc2hhcGVEaXN0YW5jZShiZWZvcmUsIHNoYXBlU2FtcGxlcyhzLCA0MDApKSwgMCwgMC4wMSk7XG59KTtcblxudGVzdCgnaW5zZXJ0IG9uIGEgbGluZWFyIGN1cnZlIGtlZXBzIGl0IGxpbmVhcicsICgpID0+IHtcbiAgICBjb25zdCBzID0gc3BsaW5lKFtbMCwgMCwgMF0sIFs1LCAwLCAwXSwgWzUsIDAsIDVdXSwgVGFuZ2VudE1vZGUuTGluZWFyKTtcbiAgICBpbnNlcnRPbkN1cnZlKHMsIDAsIDAuNSwgZmFjdG9yeSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHMua25vdHNbMV0ubW9kZSwgVGFuZ2VudE1vZGUuTGluZWFyKTtcbiAgICBuZWFyVihzLmtub3RzWzFdLnBvc2l0aW9uLCB2MygyLjUsIDAsIDApLCAxZS05KTtcbn0pO1xuXG50ZXN0KCdyZXZlcnNlIGZsb3cga2VlcHMgdGhlIHNoYXBlIGFuZCBmbGlwcyB0aGUgZGlyZWN0aW9uJywgKCkgPT4ge1xuICAgIGNvbnN0IHMgPSBzcGxpbmUoW1swLCAwLCAwXSwgWzIsIDAsIDNdLCBbNSwgMCwgLTFdLCBbOCwgMSwgMF1dLCBUYW5nZW50TW9kZS5NaXJyb3JlZCk7XG4gICAgc2V0VGFuZ2VudE1vZGUocywgMiwgVGFuZ2VudE1vZGUuQnJva2VuKTtcbiAgICBzZXRUYW5nZW50VmVjKHMsIDIsICdvdXQnLCB2MygxLCAyLCAwKSk7XG4gICAgY29uc3QgYmVmb3JlID0gc2hhcGVTYW1wbGVzKHMpO1xuICAgIGNvbnN0IGNhY2hlID0gYnVpbGRDYWNoZShzLCBuZXcgU3BsaW5lQ2FjaGUoKSk7XG4gICAgY29uc3QgZGlyQmVmb3JlID0gZXZhbHVhdGVEaXJlY3Rpb24ocywgY2FjaGUsIDAuMjUsIHYzKCkpO1xuICAgIHJldmVyc2VGbG93KHMpO1xuICAgIGNvbnN0IGFmdGVyID0gc2hhcGVTYW1wbGVzKHMpO1xuICAgIG5lYXIoc2hhcGVEaXN0YW5jZShiZWZvcmUsIGFmdGVyKSwgMCwgMC4wMSk7XG4gICAgY29uc3QgYzIgPSBidWlsZENhY2hlKHMsIG5ldyBTcGxpbmVDYWNoZSgpKTtcbiAgICBjb25zdCBkaXJBZnRlciA9IGV2YWx1YXRlRGlyZWN0aW9uKHMsIGMyLCAwLjc1LCB2MygpKTtcbiAgICBuZWFyKGRvdChkaXJCZWZvcmUsIGRpckFmdGVyKSwgLTEsIDAuMDIpO1xufSk7XG5cbmNvbnNvbGUubG9nKCdcXG5ldmFsdWF0aW9uJyk7XG5cbnRlc3QoJ3QgaXMgYSBub3JtYWxpemVkIGRpc3RhbmNlOiBlcXVhbCBzdGVwcyBhcmUgZXF1YWwgbGVuZ3RocycsICgpID0+IHtcbiAgICBjb25zdCBzID0gc3BsaW5lKFtbMCwgMCwgMF0sIFsxLCAwLCAwXSwgWzEwLCAwLCAwXV0sIFRhbmdlbnRNb2RlLkxpbmVhcik7XG4gICAgY29uc3QgY2FjaGUgPSBidWlsZENhY2hlKHMsIG5ldyBTcGxpbmVDYWNoZSgpKTtcbiAgICBuZWFyKGNhY2hlLnRvdGFsLCAxMCwgMWUtNik7XG4gICAgbmVhclYoZXZhbHVhdGVQb3NpdGlvbihzLCBjYWNoZSwgMC41LCB2MygpKSwgdjMoNSwgMCwgMCksIDAuMDIpO1xuICAgIG5lYXJWKGV2YWx1YXRlUG9zaXRpb24ocywgY2FjaGUsIDAuMDUsIHYzKCkpLCB2MygwLjUsIDAsIDApLCAwLjAyKTtcbiAgICBuZWFyVihldmFsdWF0ZVBvc2l0aW9uKHMsIGNhY2hlLCAxLCB2MygpKSwgdjMoMTAsIDAsIDApLCAxZS05KTtcbn0pO1xuXG50ZXN0KCdjdXJ2ZSBwb2ludCAvIG5vcm1hbGl6ZWQgdCAvIGtub3QgdW5pdHMgcm91bmQgdHJpcCcsICgpID0+IHtcbiAgICBjb25zdCBzID0gc3BsaW5lKFtbMCwgMCwgMF0sIFsyLCAwLCAzXSwgWzUsIDAsIC0xXSwgWzgsIDEsIDBdXSk7XG4gICAgY29uc3QgY2FjaGUgPSBidWlsZENhY2hlKHMsIG5ldyBTcGxpbmVDYWNoZSgpKTtcbiAgICBmb3IgKGNvbnN0IHQgb2YgWzAsIDAuMSwgMC4zMywgMC41LCAwLjksIDFdKSB7XG4gICAgICAgIGNvbnN0IHAgPSBjdXJ2ZVBvaW50QXQoY2FjaGUsIHQpO1xuICAgICAgICBuZWFyKG5vcm1hbGl6ZWRUT2YoY2FjaGUsIHAuaW5kZXgsIHAudCksIHQsIDFlLTQpO1xuICAgICAgICBuZWFyKGtub3RVbml0VG9UKGNhY2hlLCB0VG9Lbm90VW5pdChjYWNoZSwgdCkpLCB0LCAxZS00KTtcbiAgICB9XG4gICAgbmVhcihrbm90VW5pdFRvVChjYWNoZSwgMiksIG5vcm1hbGl6ZWRUT2YoY2FjaGUsIDIsIDApLCAxZS05KTtcbn0pO1xuXG50ZXN0KCdjbG9zZWQgc3BsaW5lcyB3cmFwIHRvIHRoZSBmaXJzdCBrbm90JywgKCkgPT4ge1xuICAgIGNvbnN0IHMgPSBzcGxpbmUoW1swLCAwLCAwXSwgWzQsIDAsIDBdLCBbNCwgMCwgNF0sIFswLCAwLCA0XV0sIFRhbmdlbnRNb2RlLkxpbmVhciwgdHJ1ZSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGN1cnZlQ291bnQocyksIDQpO1xuICAgIGNvbnN0IGNhY2hlID0gYnVpbGRDYWNoZShzLCBuZXcgU3BsaW5lQ2FjaGUoKSk7XG4gICAgbmVhcihjYWNoZS50b3RhbCwgMTYsIDFlLTYpO1xuICAgIG5lYXJWKGV2YWx1YXRlUG9zaXRpb24ocywgY2FjaGUsIDEsIHYzKCkpLCB2MygwLCAwLCAwKSwgMWUtOSk7XG4gICAgbmVhclYoZXZhbHVhdGVQb3NpdGlvbihzLCBjYWNoZSwgMC44NzUsIHYzKCkpLCB2MygwLCAwLCAyKSwgMC4wMik7XG59KTtcblxudGVzdCgnbmVhcmVzdCBwb2ludCcsICgpID0+IHtcbiAgICBjb25zdCBzID0gc3BsaW5lKFtbMCwgMCwgMF0sIFsxMCwgMCwgMF1dLCBUYW5nZW50TW9kZS5MaW5lYXIpO1xuICAgIGNvbnN0IGNhY2hlID0gYnVpbGRDYWNoZShzLCBuZXcgU3BsaW5lQ2FjaGUoKSk7XG4gICAgY29uc3QgciA9IG5lYXJlc3RQb2ludChzLCBjYWNoZSwgdjMoMywgMiwgMCkpO1xuICAgIG5lYXJWKHIucG9zaXRpb24sIHYzKDMsIDAsIDApLCAxZS0zKTtcbiAgICBuZWFyKHIuZGlzdGFuY2UsIDIsIDFlLTMpO1xuICAgIG5lYXIoci50LCAwLjMsIDFlLTMpO1xufSk7XG5cbnRlc3QoJ3VwIHZlY3RvcnMgZm9sbG93IHRoZSBrbm90cyB3aXRob3V0IHR3aXN0aW5nJywgKCkgPT4ge1xuICAgIC8vIFBsYW5hciBzcGxpbmUgb24gdGhlIGdyb3VuZDogdXAgc3RheXMgK1kuXG4gICAgY29uc3QgcyA9IHNwbGluZShbWzAsIDAsIDBdLCBbMywgMCwgM10sIFs2LCAwLCAwXSwgWzksIDAsIDNdXSk7XG4gICAgY29uc3QgY2FjaGUgPSBidWlsZENhY2hlKHMsIG5ldyBTcGxpbmVDYWNoZSgpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAyMDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHQgPSBpIC8gMjA7XG4gICAgICAgIGNvbnN0IHVwID0gZXZhbHVhdGVVcChzLCBjYWNoZSwgdCwgdjMoKSk7XG4gICAgICAgIGNvbnN0IGRpciA9IGV2YWx1YXRlRGlyZWN0aW9uKHMsIGNhY2hlLCB0LCB2MygpKTtcbiAgICAgICAgbmVhcihkb3QodXAsIGRpciksIDAsIDFlLTYsIGBwZXJwZW5kaWN1bGFyIGF0ICR7dH1gKTtcbiAgICAgICAgYXNzZXJ0Lm9rKHVwLnkgPiAwLjk5OSwgYHVwIGF0ICR7dH06ICR7dXAueX1gKTtcbiAgICB9XG59KTtcblxudGVzdCgndXAgdmVjdG9ycyBibGVuZCB0byBhIHJvbGxlZCBrbm90JywgKCkgPT4ge1xuICAgIGNvbnN0IHMgPSBzcGxpbmUoW1swLCAwLCAwXSwgWzEwLCAwLCAwXV0sIFRhbmdlbnRNb2RlLkxpbmVhcik7XG4gICAgLy8gUm9sbCB0aGUgbGFzdCBrbm90IDkwIGRlZ3JlZXMgYXJvdW5kIGl0cyBkaXJlY3Rpb24gKCtYKS5cbiAgICBzLmtub3RzWzFdLnJvdGF0aW9uID0gcUxvb2tSb3RhdGlvbihxNCgpLCB2MygxLCAwLCAwKSwgdjMoMCwgMCwgMSkpO1xuICAgIGNvbnN0IGNhY2hlID0gYnVpbGRDYWNoZShzLCBuZXcgU3BsaW5lQ2FjaGUoKSk7XG4gICAgY29uc3QgZW5kID0gZXZhbHVhdGVVcChzLCBjYWNoZSwgMSwgdjMoKSk7XG4gICAgbmVhclYoZW5kLCB2MygwLCAwLCAxKSwgMWUtMyk7XG4gICAgY29uc3QgbWlkID0gZXZhbHVhdGVVcChzLCBjYWNoZSwgMC41LCB2MygpKTtcbiAgICBuZWFyKG1pZC55LCBNYXRoLlNRUlQxXzIsIDAuMDIpO1xufSk7XG5cbnRlc3QoJ2NhY2hlIHJlYnVpbGRzIHdoZW4gdGhlIGRhdGEgY2hhbmdlcycsICgpID0+IHtcbiAgICBjb25zdCBzID0gc3BsaW5lKFtbMCwgMCwgMF0sIFsxMCwgMCwgMF1dLCBUYW5nZW50TW9kZS5MaW5lYXIpO1xuICAgIGNvbnN0IGNhY2hlID0gZW5zdXJlQ2FjaGUocywgbmV3IFNwbGluZUNhY2hlKCkpO1xuICAgIG5lYXIoY2FjaGUudG90YWwsIDEwLCAxZS05KTtcbiAgICBzLmtub3RzWzFdLnBvc2l0aW9uLnggPSAyMDtcbiAgICBlbnN1cmVDYWNoZShzLCBjYWNoZSk7XG4gICAgbmVhcihjYWNoZS50b3RhbCwgMjAsIDFlLTkpO1xufSk7XG5cbmNvbnNvbGUubG9nKCdcXG5jb250YWluZXInKTtcblxuZnVuY3Rpb24gY29udGFpbmVyKC4uLnNwbGluZXM6IFNwbGluZUxpa2VbXSk6IENvbnRhaW5lckxpa2Uge1xuICAgIHJldHVybiB7IHNwbGluZXMsIGxpbmtzOiBbXSB9O1xufVxuXG50ZXN0KCdsaW5rZWQga25vdHMgc2hhcmUgYSBwb3NpdGlvbiBhbmQgZm9sbG93IGVhY2ggb3RoZXInLCAoKSA9PiB7XG4gICAgY29uc3QgYyA9IGNvbnRhaW5lcihzcGxpbmUoW1swLCAwLCAwXSwgWzUsIDAsIDBdXSksIHNwbGluZShbWzUsIDEsIDBdLCBbNSwgMCwgNV1dKSk7XG4gICAgbGlua0tub3RzKGMsIFt7IHNwbGluZTogMCwga25vdDogMSB9LCB7IHNwbGluZTogMSwga25vdDogMCB9XSwgZmFjdG9yeSk7XG4gICAgbmVhclYoYy5zcGxpbmVzWzFdLmtub3RzWzBdLnBvc2l0aW9uLCB2Myg1LCAwLCAwKSk7XG4gICAgc2V0S25vdFBvc2l0aW9uKGMuc3BsaW5lc1swXSwgMSwgdjMoNiwgMCwgMSkpO1xuICAgIHN5bmNMaW5rZWQoYywgeyBzcGxpbmU6IDAsIGtub3Q6IDEgfSk7XG4gICAgbmVhclYoYy5zcGxpbmVzWzFdLmtub3RzWzBdLnBvc2l0aW9uLCB2Myg2LCAwLCAxKSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChsaW5rZWRLbm90cyhjLCB7IHNwbGluZTogMSwga25vdDogMCB9KSwgW3sgc3BsaW5lOiAwLCBrbm90OiAxIH1dKTtcbiAgICB1bmxpbmtLbm90cyhjLCBbeyBzcGxpbmU6IDAsIGtub3Q6IDEgfV0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjLmxpbmtzLmxlbmd0aCwgMCk7XG59KTtcblxudGVzdCgnbGlua3MgZm9sbG93IGtub3QgaW5zZXJ0aW9uIGFuZCByZW1vdmFsJywgKCkgPT4ge1xuICAgIGNvbnN0IGMgPSBjb250YWluZXIoc3BsaW5lKFtbMCwgMCwgMF0sIFs1LCAwLCAwXSwgWzksIDAsIDBdXSksIHNwbGluZShbWzksIDAsIDBdLCBbOSwgMCwgNV1dKSk7XG4gICAgbGlua0tub3RzKGMsIFt7IHNwbGluZTogMCwga25vdDogMiB9LCB7IHNwbGluZTogMSwga25vdDogMCB9XSwgZmFjdG9yeSk7XG4gICAgY29udGFpbmVySW5zZXJ0S25vdChjLCAwLCAxLCBrbm90KDIsIDAsIDApKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGxpbmtlZEtub3RzKGMsIHsgc3BsaW5lOiAxLCBrbm90OiAwIH0pLCBbeyBzcGxpbmU6IDAsIGtub3Q6IDMgfV0pO1xuICAgIGNvbnRhaW5lclJlbW92ZUtub3RzKGMsIFt7IHNwbGluZTogMCwga25vdDogMCB9XSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChsaW5rZWRLbm90cyhjLCB7IHNwbGluZTogMSwga25vdDogMCB9KSwgW3sgc3BsaW5lOiAwLCBrbm90OiAyIH1dKTtcbiAgICBjb250YWluZXJSZW1vdmVLbm90cyhjLCBbeyBzcGxpbmU6IDAsIGtub3Q6IDIgfV0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjLmxpbmtzLmxlbmd0aCwgMCk7XG59KTtcblxudGVzdCgncmVtb3ZpbmcgZXZlcnkga25vdCBvZiBhIHNwbGluZSByZW1vdmVzIGl0IChub3QgdGhlIGxhc3Qgc3BsaW5lKScsICgpID0+IHtcbiAgICBjb25zdCBjID0gY29udGFpbmVyKHNwbGluZShbWzAsIDAsIDBdLCBbMSwgMCwgMF1dKSwgc3BsaW5lKFtbMCwgMCwgMl0sIFsxLCAwLCAyXV0pKTtcbiAgICBjb250YWluZXJSZW1vdmVLbm90cyhjLCBbeyBzcGxpbmU6IDAsIGtub3Q6IDAgfSwgeyBzcGxpbmU6IDAsIGtub3Q6IDEgfV0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjLnNwbGluZXMubGVuZ3RoLCAxKTtcbiAgICBuZWFyVihjLnNwbGluZXNbMF0ua25vdHNbMF0ucG9zaXRpb24sIHYzKDAsIDAsIDIpKTtcbiAgICBjb250YWluZXJSZW1vdmVLbm90cyhjLCBbeyBzcGxpbmU6IDAsIGtub3Q6IDAgfSwgeyBzcGxpbmU6IDAsIGtub3Q6IDEgfV0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjLnNwbGluZXMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYy5zcGxpbmVzWzBdLmtub3RzLmxlbmd0aCwgMCk7XG59KTtcblxudGVzdCgnc3BsaXQgYW4gb3BlbiBzcGxpbmUgYXQgYSBrbm90JywgKCkgPT4ge1xuICAgIGNvbnN0IGMgPSBjb250YWluZXIoc3BsaW5lKFtbMCwgMCwgMF0sIFszLCAwLCAwXSwgWzYsIDAsIDJdLCBbOSwgMCwgMF1dKSk7XG4gICAgY29uc3QgYmVmb3JlID0gc2hhcGVTYW1wbGVzKGMuc3BsaW5lc1swXSk7XG4gICAgY29uc3QgciA9IHNwbGl0S25vdChjLCB7IHNwbGluZTogMCwga25vdDogMSB9LCBmYWN0b3J5KTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHIsIHsgc3BsaW5lOiAxLCBrbm90OiAwIH0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjLnNwbGluZXNbMF0ua25vdHMubGVuZ3RoLCAyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYy5zcGxpbmVzWzFdLmtub3RzLmxlbmd0aCwgMyk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChsaW5rZWRLbm90cyhjLCB7IHNwbGluZTogMCwga25vdDogMSB9KSwgW3sgc3BsaW5lOiAxLCBrbm90OiAwIH1dKTtcbiAgICB2b2lkIGJlZm9yZTtcbn0pO1xuXG50ZXN0KCdzcGxpdCBhIGNsb3NlZCBzcGxpbmUgb3BlbnMgaXQgYXQgdGhlIGtub3QnLCAoKSA9PiB7XG4gICAgY29uc3QgYyA9IGNvbnRhaW5lcihzcGxpbmUoW1swLCAwLCAwXSwgWzQsIDAsIDBdLCBbNCwgMCwgNF0sIFswLCAwLCA0XV0sIFRhbmdlbnRNb2RlLkxpbmVhciwgdHJ1ZSkpO1xuICAgIGNvbnN0IHIgPSBzcGxpdEtub3QoYywgeyBzcGxpbmU6IDAsIGtub3Q6IDIgfSwgZmFjdG9yeSk7XG4gICAgY29uc3QgcyA9IGMuc3BsaW5lc1swXTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocy5jbG9zZWQsIGZhbHNlKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocy5rbm90cy5sZW5ndGgsIDUpO1xuICAgIG5lYXJWKHMua25vdHNbMF0ucG9zaXRpb24sIHYzKDQsIDAsIDQpKTtcbiAgICBuZWFyVihzLmtub3RzWzRdLnBvc2l0aW9uLCB2Myg0LCAwLCA0KSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyLCB7IHNwbGluZTogMCwga25vdDogNCB9KTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGxpbmtlZEtub3RzKGMsIHsgc3BsaW5lOiAwLCBrbm90OiAwIH0pLCBbeyBzcGxpbmU6IDAsIGtub3Q6IDQgfV0pO1xufSk7XG5cbnRlc3QoJ2pvaW4gZW5kIGtub3RzIG9mIHR3byBzcGxpbmVzIG1lcmdlcyB0aGVtJywgKCkgPT4ge1xuICAgIGNvbnN0IGMgPSBjb250YWluZXIoc3BsaW5lKFtbMCwgMCwgMF0sIFszLCAwLCAwXV0pLCBzcGxpbmUoW1s2LCAwLCAwXSwgWzksIDAsIDBdXSkpO1xuICAgIGNvbnN0IHIgPSBqb2luS25vdHMoYywgeyBzcGxpbmU6IDAsIGtub3Q6IDEgfSwgeyBzcGxpbmU6IDEsIGtub3Q6IDAgfSwgZmFjdG9yeSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGMuc3BsaW5lcy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjLnNwbGluZXNbMF0ua25vdHMubGVuZ3RoLCAzKTtcbiAgICBuZWFyVihjLnNwbGluZXNbMF0ua25vdHNbMV0ucG9zaXRpb24sIHYzKDMsIDAsIDApKTtcbiAgICBuZWFyVihjLnNwbGluZXNbMF0ua25vdHNbMl0ucG9zaXRpb24sIHYzKDksIDAsIDApKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHIsIHsgc3BsaW5lOiAwLCBrbm90OiAxIH0pO1xufSk7XG5cbnRlc3QoJ2pvaW4gcmV2ZXJzZXMgc3BsaW5lcyBhcyBuZWVkZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgYyA9IGNvbnRhaW5lcihzcGxpbmUoW1szLCAwLCAwXSwgWzAsIDAsIDBdXSksIHNwbGluZShbWzksIDAsIDBdLCBbNiwgMCwgMF1dKSk7XG4gICAgLy8gRmlyc3Qga25vdCBvZiBBIHdpdGggbGFzdCBrbm90IG9mIEIuXG4gICAgam9pbktub3RzKGMsIHsgc3BsaW5lOiAwLCBrbm90OiAwIH0sIHsgc3BsaW5lOiAxLCBrbm90OiAxIH0sIGZhY3RvcnkpO1xuICAgIGNvbnN0IHB0cyA9IGMuc3BsaW5lc1swXS5rbm90cy5tYXAoKGspID0+IGsucG9zaXRpb24ueCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChwdHMsIFswLCAzLCA5XSk7XG59KTtcblxudGVzdCgnam9pbiB0aGUgdHdvIGVuZHMgb2Ygb25lIHNwbGluZSBjbG9zZXMgaXQnLCAoKSA9PiB7XG4gICAgY29uc3QgYyA9IGNvbnRhaW5lcihzcGxpbmUoW1swLCAwLCAwXSwgWzQsIDAsIDBdLCBbNCwgMCwgNF0sIFswLCAwLCAwXV0pKTtcbiAgICBqb2luS25vdHMoYywgeyBzcGxpbmU6IDAsIGtub3Q6IDAgfSwgeyBzcGxpbmU6IDAsIGtub3Q6IDMgfSwgZmFjdG9yeSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGMuc3BsaW5lc1swXS5jbG9zZWQsIHRydWUpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjLnNwbGluZXNbMF0ua25vdHMubGVuZ3RoLCAzLCAndGhlIGR1cGxpY2F0ZSBlbmQga25vdCBpcyBkcm9wcGVkJyk7XG59KTtcblxudGVzdCgnY2xvc2luZyBhbmQgb3BlbmluZyByZS1hcHBsaWVzIHRoZSBlbmQga25vdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgcyA9IHNwbGluZShbWzAsIDAsIDBdLCBbNCwgMCwgMF0sIFs0LCAwLCA0XV0pO1xuICAgIGNvbnN0IGJlZm9yZSA9IHRhbmdlbnRJblZlYyh2MygpLCBzLmtub3RzWzBdKTtcbiAgICBzZXRDbG9zZWQocywgdHJ1ZSk7XG4gICAgYXNzZXJ0Lm9rKGRpc3QoYmVmb3JlLCB0YW5nZW50SW5WZWModjMoKSwgcy5rbm90c1swXSkpID4gMWUtMyk7XG59KTtcblxuY29uc29sZS5sb2coJ1xcbnNoYXBlcycpO1xuXG50ZXN0KCdjaXJjbGUgc2hhcGUgc3RheXMgd2l0aGluIDAuMSUgb2YgdGhlIHJhZGl1cycsICgpID0+IHtcbiAgICBjb25zdCBzID0gZmFjdG9yeS5zcGxpbmUoKTtcbiAgICBidWlsZFNoYXBlKHMsICdjaXJjbGUnLCB7IHNpemU6IDUgfSwgZmFjdG9yeSk7XG4gICAgY29uc3QgY2FjaGUgPSBidWlsZENhY2hlKHMsIG5ldyBTcGxpbmVDYWNoZSgpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY0OyBpKyspIHtcbiAgICAgICAgY29uc3QgcCA9IGV2YWx1YXRlUG9zaXRpb24ocywgY2FjaGUsIGkgLyA2NCwgdjMoKSk7XG4gICAgICAgIG5lYXIoTWF0aC5oeXBvdChwLngsIHAueiksIDUsIDAuMDA1ICogNSAvIDUgKiAxLjEsIGBwb2ludCAke2l9YCk7XG4gICAgICAgIG5lYXIocC55LCAwLCAxZS05KTtcbiAgICB9XG4gICAgbmVhcihjYWNoZS50b3RhbCwgMiAqIE1hdGguUEkgKiA1LCAwLjAxKTtcbn0pO1xuXG50ZXN0KCcyRCBzaGFwZXMgbGllIGluIHRoZSBYWSBwbGFuZSwga25vdHMgZmFjZSB1cCArWicsICgpID0+IHtcbiAgICBjb25zdCBzID0gZmFjdG9yeS5zcGxpbmUoKTtcbiAgICBidWlsZFNoYXBlKHMsICdzcXVhcmUnLCB7IHNpemU6IDEwMCwgcGxhbmUyRDogdHJ1ZSB9LCBmYWN0b3J5KTtcbiAgICBmb3IgKGNvbnN0IGsgb2Ygcy5rbm90cykge1xuICAgICAgICBuZWFyKGsucG9zaXRpb24ueiwgMCk7XG4gICAgICAgIG5lYXJWKGtub3RVcCh2MygpLCBrKSwgdjMoMCwgMCwgMSksIDFlLTkpO1xuICAgIH1cbiAgICBjb25zdCBjYWNoZSA9IGJ1aWxkQ2FjaGUocywgbmV3IFNwbGluZUNhY2hlKCkpO1xuICAgIG5lYXIoY2FjaGUudG90YWwsIDgwMCwgMWUtNik7XG59KTtcblxudGVzdCgnaGVsaXggcmlzZXMgYWxvbmcgK1knLCAoKSA9PiB7XG4gICAgY29uc3QgcyA9IGZhY3Rvcnkuc3BsaW5lKCk7XG4gICAgYnVpbGRTaGFwZShzLCAnaGVsaXgnLCB7IHNpemU6IDEsIHR1cm5zOiAyLCBoZWlnaHQ6IDQgfSwgZmFjdG9yeSk7XG4gICAgbmVhcihzLmtub3RzW3Mua25vdHMubGVuZ3RoIC0gMV0ucG9zaXRpb24ueSwgNCwgMWUtOSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHMuY2xvc2VkLCBmYWxzZSk7XG59KTtcblxudGVzdCgna25vdCByb3RhdGlvbnMgb2Ygc2hhcGVzIHBvaW50IGFsb25nIHRoZSB0cmF2ZWwgZGlyZWN0aW9uJywgKCkgPT4ge1xuICAgIGNvbnN0IHMgPSBmYWN0b3J5LnNwbGluZSgpO1xuICAgIGJ1aWxkU2hhcGUocywgJ3BvbHlnb24nLCB7IHNpemU6IDIsIHNpZGVzOiA2IH0sIGZhY3RvcnkpO1xuICAgIGNvbnN0IGNhY2hlID0gYnVpbGRDYWNoZShzLCBuZXcgU3BsaW5lQ2FjaGUoKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmtub3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZ3ZCA9IHFSb3RhdGUodjMoKSwgcy5rbm90c1tpXS5yb3RhdGlvbiwgdjMoMCwgMCwgMSkpO1xuICAgICAgICBjb25zdCBjID0gZ2V0Q3VydmUocywgaSk7XG4gICAgICAgIGNvbnN0IGNob3JkID0gbm9ybWFsaXplKHYzKCksIHN1Yih2MygpLCBjLnAzLCBjLnAwKSk7XG4gICAgICAgIGFzc2VydC5vayhkb3QoZndkLCBjaG9yZCkgPiAwLjQsIGBrbm90ICR7aX1gKTtcbiAgICB9XG4gICAgdm9pZCBjYWNoZTtcbiAgICB2b2lkIGNyb3NzO1xuICAgIHZvaWQgcUlkZW50aXR5O1xufSk7XG5cbmNvbnNvbGUubG9nKGBcXG4ke3Jlc3VsdHMucGFzc2VkfSBwYXNzZWQsICR7cmVzdWx0cy5mYWlsZWR9IGZhaWxlZGApO1xucHJvY2Vzcy5leGl0Q29kZSA9IHJlc3VsdHMuZmFpbGVkID8gMSA6IDA7XG4iLCAiLyoqXG4gKiBTbWFsbCB2ZWN0b3IgLyBxdWF0ZXJuaW9uIGhlbHBlcnMgb24gcGxhaW4ge3gsIHksIHp9IG9iamVjdHMuXG4gKlxuICogVGhlIHNwbGluZSBjb3JlIHVzZXMgdGhlc2UgaW5zdGVhZCBvZiBjYy5WZWMzIHNvIGl0IGhhcyBubyBlbmdpbmVcbiAqIGRlcGVuZGVuY3k6IGNjLlZlYzMgLyBjYy5RdWF0IHNhdGlzZnkgdGhlIGludGVyZmFjZXMsIGFuZCB0aGUgY29yZSBjYW4gYmVcbiAqIHVuaXQtdGVzdGVkIG91dHNpZGUgdGhlIGVkaXRvci5cbiAqXG4gKiBLbm90IHNwYWNlIGZvbGxvd3MgVW5pdHkncyBjb252ZW50aW9uOiBhIGtub3QncyBsb2NhbCArWiBpcyB0aGUgZGlyZWN0aW9uXG4gKiBvZiBpdHMgb3V0IHRhbmdlbnQgYW5kIGxvY2FsICtZIGlzIGl0cyB1cCB2ZWN0b3IuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBWMyB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB6OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUTQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgejogbnVtYmVyO1xuICAgIHc6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IEVQU0lMT04gPSAxZS02O1xuXG5leHBvcnQgZnVuY3Rpb24gdjMoeCA9IDAsIHkgPSAwLCB6ID0gMCk6IFYzIHtcbiAgICByZXR1cm4geyB4LCB5LCB6IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxNCh4ID0gMCwgeSA9IDAsIHogPSAwLCB3ID0gMSk6IFE0IHtcbiAgICByZXR1cm4geyB4LCB5LCB6LCB3IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQ8VCBleHRlbmRzIFYzPihvdXQ6IFQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBUIHtcbiAgICBvdXQueCA9IHg7XG4gICAgb3V0LnkgPSB5O1xuICAgIG91dC56ID0gejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weTxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMpOiBUIHtcbiAgICBvdXQueCA9IGEueDtcbiAgICBvdXQueSA9IGEueTtcbiAgICBvdXQueiA9IGEuejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUoYTogVjMpOiBWMyB7XG4gICAgcmV0dXJuIHsgeDogYS54LCB5OiBhLnksIHo6IGEueiB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMywgYjogVjMpOiBUIHtcbiAgICBvdXQueCA9IGEueCArIGIueDtcbiAgICBvdXQueSA9IGEueSArIGIueTtcbiAgICBvdXQueiA9IGEueiArIGIuejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3ViPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMywgYjogVjMpOiBUIHtcbiAgICBvdXQueCA9IGEueCAtIGIueDtcbiAgICBvdXQueSA9IGEueSAtIGIueTtcbiAgICBvdXQueiA9IGEueiAtIGIuejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGU8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBzOiBudW1iZXIpOiBUIHtcbiAgICBvdXQueCA9IGEueCAqIHM7XG4gICAgb3V0LnkgPSBhLnkgKiBzO1xuICAgIG91dC56ID0gYS56ICogcztcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKiogb3V0ID0gYSArIGIgKiBzICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVBbmRBZGQ8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBiOiBWMywgczogbnVtYmVyKTogVCB7XG4gICAgb3V0LnggPSBhLnggKyBiLnggKiBzO1xuICAgIG91dC55ID0gYS55ICsgYi55ICogcztcbiAgICBvdXQueiA9IGEueiArIGIueiAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMpOiBUIHtcbiAgICBvdXQueCA9IC1hLng7XG4gICAgb3V0LnkgPSAtYS55O1xuICAgIG91dC56ID0gLWEuejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG90KGE6IFYzLCBiOiBWMyk6IG51bWJlciB7XG4gICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIuejtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyb3NzPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMywgYjogVjMpOiBUIHtcbiAgICBjb25zdCB4ID0gYS55ICogYi56IC0gYS56ICogYi55O1xuICAgIGNvbnN0IHkgPSBhLnogKiBiLnggLSBhLnggKiBiLno7XG4gICAgY29uc3QgeiA9IGEueCAqIGIueSAtIGEueSAqIGIueDtcbiAgICBvdXQueCA9IHg7XG4gICAgb3V0LnkgPSB5O1xuICAgIG91dC56ID0gejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGVuU3EoYTogVjMpOiBudW1iZXIge1xuICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLno7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZW4oYTogVjMpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQoYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RTcShhOiBWMywgYjogVjMpOiBudW1iZXIge1xuICAgIGNvbnN0IHggPSBhLnggLSBiLng7XG4gICAgY29uc3QgeSA9IGEueSAtIGIueTtcbiAgICBjb25zdCB6ID0gYS56IC0gYi56O1xuICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0KGE6IFYzLCBiOiBWMyk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydChkaXN0U3EoYSwgYikpO1xufVxuXG4vKiogTm9ybWFsaXplcyBgYWAgaW50byBgb3V0YDsgYSB6ZXJvIHZlY3RvciBzdGF5cyB6ZXJvLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMpOiBUIHtcbiAgICBjb25zdCBsID0gbGVuKGEpO1xuICAgIGlmIChsIDwgRVBTSUxPTikgcmV0dXJuIHNldChvdXQsIDAsIDAsIDApO1xuICAgIHJldHVybiBzY2FsZShvdXQsIGEsIDEgLyBsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlcnA8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBiOiBWMywgdDogbnVtYmVyKTogVCB7XG4gICAgb3V0LnggPSBhLnggKyAoYi54IC0gYS54KSAqIHQ7XG4gICAgb3V0LnkgPSBhLnkgKyAoYi55IC0gYS55KSAqIHQ7XG4gICAgb3V0LnogPSBhLnogKyAoYi56IC0gYS56KSAqIHQ7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhOiBWMywgYjogVjMsIGVwcyA9IEVQU0lMT04pOiBib29sZWFuIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoYS54IC0gYi54KSA8PSBlcHMgJiYgTWF0aC5hYnMoYS55IC0gYi55KSA8PSBlcHMgJiYgTWF0aC5hYnMoYS56IC0gYi56KSA8PSBlcHM7XG59XG5cbi8qKiBBbnkgdW5pdCB2ZWN0b3IgcGVycGVuZGljdWxhciB0byBgYWAgKHdoaWNoIG11c3Qgbm90IGJlIHplcm8pLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFueVBlcnBlbmRpY3VsYXI8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzKTogVCB7XG4gICAgLy8gQ3Jvc3Mgd2l0aCB0aGUgYXhpcyBsZWFzdCBhbGlnbmVkIHdpdGggYGFgLlxuICAgIGNvbnN0IGF4ID0gTWF0aC5hYnMoYS54KTtcbiAgICBjb25zdCBheSA9IE1hdGguYWJzKGEueSk7XG4gICAgY29uc3QgYXogPSBNYXRoLmFicyhhLnopO1xuICAgIGlmIChheCA8PSBheSAmJiBheCA8PSBheikgY3Jvc3Mob3V0LCBhLCB7IHg6IDEsIHk6IDAsIHo6IDAgfSk7XG4gICAgZWxzZSBpZiAoYXkgPD0gYXopIGNyb3NzKG91dCwgYSwgeyB4OiAwLCB5OiAxLCB6OiAwIH0pO1xuICAgIGVsc2UgY3Jvc3Mob3V0LCBhLCB7IHg6IDAsIHk6IDAsIHo6IDEgfSk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIG91dCk7XG59XG5cbi8qKiBSZW1vdmVzIHRoZSBwYXJ0IG9mIGB2YCBhbG9uZyB1bml0IHZlY3RvciBgbmAuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdE9uUGxhbmU8VCBleHRlbmRzIFYzPihvdXQ6IFQsIHY6IFYzLCBuOiBWMyk6IFQge1xuICAgIGNvbnN0IGQgPSBkb3Qodiwgbik7XG4gICAgcmV0dXJuIHNjYWxlQW5kQWRkKG91dCwgdiwgbiwgLWQpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcXVhdGVybmlvbnNcblxuZXhwb3J0IGZ1bmN0aW9uIHFTZXQ8VCBleHRlbmRzIFE0PihvdXQ6IFQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcik6IFQge1xuICAgIG91dC54ID0geDtcbiAgICBvdXQueSA9IHk7XG4gICAgb3V0LnogPSB6O1xuICAgIG91dC53ID0gdztcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcUNvcHk8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGE6IFE0KTogVCB7XG4gICAgcmV0dXJuIHFTZXQob3V0LCBhLngsIGEueSwgYS56LCBhLncpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcUlkZW50aXR5PFQgZXh0ZW5kcyBRND4ob3V0OiBUKTogVCB7XG4gICAgcmV0dXJuIHFTZXQob3V0LCAwLCAwLCAwLCAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHFNdWw8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGE6IFE0LCBiOiBRNCk6IFQge1xuICAgIGNvbnN0IHggPSBhLncgKiBiLnggKyBhLnggKiBiLncgKyBhLnkgKiBiLnogLSBhLnogKiBiLnk7XG4gICAgY29uc3QgeSA9IGEudyAqIGIueSAtIGEueCAqIGIueiArIGEueSAqIGIudyArIGEueiAqIGIueDtcbiAgICBjb25zdCB6ID0gYS53ICogYi56ICsgYS54ICogYi55IC0gYS55ICogYi54ICsgYS56ICogYi53O1xuICAgIGNvbnN0IHcgPSBhLncgKiBiLncgLSBhLnggKiBiLnggLSBhLnkgKiBiLnkgLSBhLnogKiBiLno7XG4gICAgcmV0dXJuIHFTZXQob3V0LCB4LCB5LCB6LCB3KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHFOb3JtYWxpemU8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGE6IFE0KTogVCB7XG4gICAgY29uc3QgbCA9IE1hdGguc3FydChhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLncpO1xuICAgIGlmIChsIDwgRVBTSUxPTikgcmV0dXJuIHFJZGVudGl0eShvdXQpO1xuICAgIHJldHVybiBxU2V0KG91dCwgYS54IC8gbCwgYS55IC8gbCwgYS56IC8gbCwgYS53IC8gbCk7XG59XG5cbi8qKiBJbnZlcnNlIG9mIGEgdW5pdCBxdWF0ZXJuaW9uIChpdHMgY29uanVnYXRlKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxSW52ZXJ0PFQgZXh0ZW5kcyBRND4ob3V0OiBULCBhOiBRNCk6IFQge1xuICAgIGNvbnN0IGwgPSBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLnc7XG4gICAgaWYgKGwgPCBFUFNJTE9OKSByZXR1cm4gcUlkZW50aXR5KG91dCk7XG4gICAgcmV0dXJuIHFTZXQob3V0LCAtYS54IC8gbCwgLWEueSAvIGwsIC1hLnogLyBsLCBhLncgLyBsKTtcbn1cblxuLyoqIFJvdGF0ZXMgdmVjdG9yIGB2YCBieSBxdWF0ZXJuaW9uIGBxYC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxUm90YXRlPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBxOiBRNCwgdjogVjMpOiBUIHtcbiAgICAvLyB0ID0gMiAqIGNyb3NzKHEueHl6LCB2KTsgdicgPSB2ICsgdyAqIHQgKyBjcm9zcyhxLnh5eiwgdClcbiAgICBjb25zdCB0eCA9IDIgKiAocS55ICogdi56IC0gcS56ICogdi55KTtcbiAgICBjb25zdCB0eSA9IDIgKiAocS56ICogdi54IC0gcS54ICogdi56KTtcbiAgICBjb25zdCB0eiA9IDIgKiAocS54ICogdi55IC0gcS55ICogdi54KTtcbiAgICBjb25zdCB4ID0gdi54ICsgcS53ICogdHggKyAocS55ICogdHogLSBxLnogKiB0eSk7XG4gICAgY29uc3QgeSA9IHYueSArIHEudyAqIHR5ICsgKHEueiAqIHR4IC0gcS54ICogdHopO1xuICAgIGNvbnN0IHogPSB2LnogKyBxLncgKiB0eiArIChxLnggKiB0eSAtIHEueSAqIHR4KTtcbiAgICByZXR1cm4gc2V0KG91dCwgeCwgeSwgeik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxRnJvbUF4aXNBbmdsZTxUIGV4dGVuZHMgUTQ+KG91dDogVCwgYXhpczogVjMsIHJhZDogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgbiA9IG5vcm1hbGl6ZSh2MygpLCBheGlzKTtcbiAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkIC8gMik7XG4gICAgcmV0dXJuIHFTZXQob3V0LCBuLnggKiBzLCBuLnkgKiBzLCBuLnogKiBzLCBNYXRoLmNvcyhyYWQgLyAyKSk7XG59XG5cbi8qKiBSb3RhdGlvbiBtYXRyaXggY29sdW1ucyAoeCwgeSwgeiBheGVzKSB0byBxdWF0ZXJuaW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFGcm9tQXhlczxUIGV4dGVuZHMgUTQ+KG91dDogVCwgeDogVjMsIHk6IFYzLCB6OiBWMyk6IFQge1xuICAgIGNvbnN0IG0wMCA9IHgueCwgbTAxID0geS54LCBtMDIgPSB6Lng7XG4gICAgY29uc3QgbTEwID0geC55LCBtMTEgPSB5LnksIG0xMiA9IHoueTtcbiAgICBjb25zdCBtMjAgPSB4LnosIG0yMSA9IHkueiwgbTIyID0gei56O1xuICAgIGNvbnN0IHRyYWNlID0gbTAwICsgbTExICsgbTIyO1xuICAgIGlmICh0cmFjZSA+IDApIHtcbiAgICAgICAgY29uc3QgcyA9IDAuNSAvIE1hdGguc3FydCh0cmFjZSArIDEpO1xuICAgICAgICByZXR1cm4gcU5vcm1hbGl6ZShvdXQsIHFTZXQob3V0LCAobTIxIC0gbTEyKSAqIHMsIChtMDIgLSBtMjApICogcywgKG0xMCAtIG0wMSkgKiBzLCAwLjI1IC8gcykpO1xuICAgIH1cbiAgICBpZiAobTAwID4gbTExICYmIG0wMCA+IG0yMikge1xuICAgICAgICBjb25zdCBzID0gMiAqIE1hdGguc3FydCgxICsgbTAwIC0gbTExIC0gbTIyKTtcbiAgICAgICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgMC4yNSAqIHMsIChtMDEgKyBtMTApIC8gcywgKG0wMiArIG0yMCkgLyBzLCAobTIxIC0gbTEyKSAvIHMpKTtcbiAgICB9XG4gICAgaWYgKG0xMSA+IG0yMikge1xuICAgICAgICBjb25zdCBzID0gMiAqIE1hdGguc3FydCgxICsgbTExIC0gbTAwIC0gbTIyKTtcbiAgICAgICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgKG0wMSArIG0xMCkgLyBzLCAwLjI1ICogcywgKG0xMiArIG0yMSkgLyBzLCAobTAyIC0gbTIwKSAvIHMpKTtcbiAgICB9XG4gICAgY29uc3QgcyA9IDIgKiBNYXRoLnNxcnQoMSArIG0yMiAtIG0wMCAtIG0xMSk7XG4gICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgKG0wMiArIG0yMCkgLyBzLCAobTEyICsgbTIxKSAvIHMsIDAuMjUgKiBzLCAobTEwIC0gbTAxKSAvIHMpKTtcbn1cblxuLyoqXG4gKiBSb3RhdGlvbiB0aGF0IG1hcHMgK1ogdG8gYGZvcndhcmRgIGFuZCArWSBhcyBjbG9zZSBhcyBwb3NzaWJsZSB0byBgdXBgXG4gKiAoVW5pdHkncyBMb29rUm90YXRpb24pLiBEZWdlbmVyYXRlIGlucHV0IGZhbGxzIGJhY2sgdG8gYSBwZXJwZW5kaWN1bGFyIHVwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcUxvb2tSb3RhdGlvbjxUIGV4dGVuZHMgUTQ+KG91dDogVCwgZm9yd2FyZDogVjMsIHVwOiBWMyk6IFQge1xuICAgIGNvbnN0IHogPSBub3JtYWxpemUodjMoKSwgZm9yd2FyZCk7XG4gICAgaWYgKGxlblNxKHopIDwgRVBTSUxPTikgcmV0dXJuIHFJZGVudGl0eShvdXQpO1xuICAgIGNvbnN0IHggPSBjcm9zcyh2MygpLCB1cCwgeik7XG4gICAgaWYgKGxlblNxKHgpIDwgRVBTSUxPTikge1xuICAgICAgICAvLyB1cCBpcyBwYXJhbGxlbCB0byBmb3J3YXJkOiBrZWVwIGEgc3RhYmxlIHBlcnBlbmRpY3VsYXIuXG4gICAgICAgIGFueVBlcnBlbmRpY3VsYXIoeCwgeik7XG4gICAgfVxuICAgIG5vcm1hbGl6ZSh4LCB4KTtcbiAgICBjb25zdCB5ID0gY3Jvc3ModjMoKSwgeiwgeCk7XG4gICAgcmV0dXJuIHFGcm9tQXhlcyhvdXQsIHgsIHksIHopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcVNsZXJwPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBhOiBRNCwgYjogUTQsIHQ6IG51bWJlcik6IFQge1xuICAgIGxldCBieCA9IGIueCwgYnkgPSBiLnksIGJ6ID0gYi56LCBidyA9IGIudztcbiAgICBsZXQgY29zID0gYS54ICogYnggKyBhLnkgKiBieSArIGEueiAqIGJ6ICsgYS53ICogYnc7XG4gICAgaWYgKGNvcyA8IDApIHtcbiAgICAgICAgY29zID0gLWNvcztcbiAgICAgICAgYnggPSAtYng7XG4gICAgICAgIGJ5ID0gLWJ5O1xuICAgICAgICBieiA9IC1iejtcbiAgICAgICAgYncgPSAtYnc7XG4gICAgfVxuICAgIGxldCBzMDogbnVtYmVyO1xuICAgIGxldCBzMTogbnVtYmVyO1xuICAgIGlmICgxIC0gY29zID4gRVBTSUxPTikge1xuICAgICAgICBjb25zdCBvbWVnYSA9IE1hdGguYWNvcyhNYXRoLm1pbigxLCBjb3MpKTtcbiAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4ob21lZ2EpO1xuICAgICAgICBzMCA9IE1hdGguc2luKCgxIC0gdCkgKiBvbWVnYSkgLyBzaW47XG4gICAgICAgIHMxID0gTWF0aC5zaW4odCAqIG9tZWdhKSAvIHNpbjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzMCA9IDEgLSB0O1xuICAgICAgICBzMSA9IHQ7XG4gICAgfVxuICAgIHJldHVybiBxTm9ybWFsaXplKG91dCwgcVNldChvdXQsIHMwICogYS54ICsgczEgKiBieCwgczAgKiBhLnkgKyBzMSAqIGJ5LCBzMCAqIGEueiArIHMxICogYnosIHMwICogYS53ICsgczEgKiBidykpO1xufVxuXG4vKiogUm90YXRpb24gdGFraW5nIHVuaXQgdmVjdG9yIGBmcm9tYCBvbnRvIHVuaXQgdmVjdG9yIGB0b2AgKHNob3J0ZXN0IGFyYykuICovXG5leHBvcnQgZnVuY3Rpb24gcUZyb21UbzxUIGV4dGVuZHMgUTQ+KG91dDogVCwgZnJvbTogVjMsIHRvOiBWMyk6IFQge1xuICAgIGNvbnN0IGQgPSBkb3QoZnJvbSwgdG8pO1xuICAgIGlmIChkID49IDEgLSBFUFNJTE9OKSByZXR1cm4gcUlkZW50aXR5KG91dCk7XG4gICAgaWYgKGQgPD0gLTEgKyBFUFNJTE9OKSB7XG4gICAgICAgIGNvbnN0IGF4aXMgPSBhbnlQZXJwZW5kaWN1bGFyKHYzKCksIGZyb20pO1xuICAgICAgICByZXR1cm4gcVNldChvdXQsIGF4aXMueCwgYXhpcy55LCBheGlzLnosIDApO1xuICAgIH1cbiAgICBjb25zdCBjID0gY3Jvc3ModjMoKSwgZnJvbSwgdG8pO1xuICAgIHJldHVybiBxTm9ybWFsaXplKG91dCwgcVNldChvdXQsIGMueCwgYy55LCBjLnosIDEgKyBkKSk7XG59XG5cbi8qKiBFdWxlciBhbmdsZXMgaW4gZGVncmVlcyAoQ29jb3Mgb3JkZXI6IHJvdGF0ZSBhcm91bmQgWiwgdGhlbiBZLCB0aGVuIFguLi4gbWF0Y2hpbmcgY2MuUXVhdC50b0V1bGVyKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxVG9FdWxlcjxUIGV4dGVuZHMgVjM+KG91dDogVCwgcTogUTQpOiBUIHtcbiAgICAvLyBTYW1lIGZvcm11bGEgYXMgY2MuUXVhdC50b0V1bGVyIChvdXRlclogPSBmYWxzZSkuXG4gICAgY29uc3QgeyB4LCB5LCB6LCB3IH0gPSBxO1xuICAgIGxldCBiYW5rID0gMDtcbiAgICBsZXQgaGVhZGluZyA9IDA7XG4gICAgbGV0IGF0dGl0dWRlID0gMDtcbiAgICBjb25zdCB0ZXN0ID0geCAqIHkgKyB6ICogdztcbiAgICBpZiAodGVzdCA+IDAuNDk5OTk5KSB7XG4gICAgICAgIGJhbmsgPSAwO1xuICAgICAgICBoZWFkaW5nID0gKDIgKiBNYXRoLmF0YW4yKHgsIHcpICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIGF0dGl0dWRlID0gOTA7XG4gICAgfSBlbHNlIGlmICh0ZXN0IDwgLTAuNDk5OTk5KSB7XG4gICAgICAgIGJhbmsgPSAwO1xuICAgICAgICBoZWFkaW5nID0gKC0yICogTWF0aC5hdGFuMih4LCB3KSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgICAgICBhdHRpdHVkZSA9IC05MDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzcXggPSB4ICogeDtcbiAgICAgICAgY29uc3Qgc3F5ID0geSAqIHk7XG4gICAgICAgIGNvbnN0IHNxeiA9IHogKiB6O1xuICAgICAgICBiYW5rID0gKE1hdGguYXRhbjIoMiAqIHggKiB3IC0gMiAqIHkgKiB6LCAxIC0gMiAqIHNxeCAtIDIgKiBzcXopICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIGhlYWRpbmcgPSAoTWF0aC5hdGFuMigyICogeSAqIHcgLSAyICogeCAqIHosIDEgLSAyICogc3F5IC0gMiAqIHNxeikgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgYXR0aXR1ZGUgPSAoTWF0aC5hc2luKDIgKiB0ZXN0KSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgIH1cbiAgICByZXR1cm4gc2V0KG91dCwgYmFuaywgaGVhZGluZywgYXR0aXR1ZGUpO1xufVxuXG4vKiogSW52ZXJzZSBvZiBxVG9FdWxlciAoc2FtZSBhcyBjYy5RdWF0LmZyb21FdWxlcikuICovXG5leHBvcnQgZnVuY3Rpb24gcUZyb21FdWxlcjxUIGV4dGVuZHMgUTQ+KG91dDogVCwgZXg6IG51bWJlciwgZXk6IG51bWJlciwgZXo6IG51bWJlcik6IFQge1xuICAgIGNvbnN0IGhhbGZUb1JhZCA9ICgwLjUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICBjb25zdCB4ID0gZXggKiBoYWxmVG9SYWQ7XG4gICAgY29uc3QgeSA9IGV5ICogaGFsZlRvUmFkO1xuICAgIGNvbnN0IHogPSBleiAqIGhhbGZUb1JhZDtcbiAgICBjb25zdCBzeCA9IE1hdGguc2luKHgpO1xuICAgIGNvbnN0IGN4ID0gTWF0aC5jb3MoeCk7XG4gICAgY29uc3Qgc3kgPSBNYXRoLnNpbih5KTtcbiAgICBjb25zdCBjeSA9IE1hdGguY29zKHkpO1xuICAgIGNvbnN0IHN6ID0gTWF0aC5zaW4oeik7XG4gICAgY29uc3QgY3ogPSBNYXRoLmNvcyh6KTtcbiAgICByZXR1cm4gcVNldChcbiAgICAgICAgb3V0LFxuICAgICAgICBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3osXG4gICAgICAgIGN4ICogc3kgKiBjeiArIHN4ICogY3kgKiBzeixcbiAgICAgICAgY3ggKiBjeSAqIHN6IC0gc3ggKiBzeSAqIGN6LFxuICAgICAgICBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3osXG4gICAgKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1hdHJpY2VzXG5cbi8qKiBDb2x1bW4tbWFqb3IgNHg0IG1hdHJpeCwgbGFpZCBvdXQgbGlrZSBjYy5NYXQ0IChtMDAuLm0xNSkuICovXG5leHBvcnQgaW50ZXJmYWNlIE00IHtcbiAgICBtMDA6IG51bWJlcjsgbTAxOiBudW1iZXI7IG0wMjogbnVtYmVyOyBtMDM6IG51bWJlcjtcbiAgICBtMDQ6IG51bWJlcjsgbTA1OiBudW1iZXI7IG0wNjogbnVtYmVyOyBtMDc6IG51bWJlcjtcbiAgICBtMDg6IG51bWJlcjsgbTA5OiBudW1iZXI7IG0xMDogbnVtYmVyOyBtMTE6IG51bWJlcjtcbiAgICBtMTI6IG51bWJlcjsgbTEzOiBudW1iZXI7IG0xNDogbnVtYmVyOyBtMTU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG00VHJhbnNmb3JtUG9pbnQ8VCBleHRlbmRzIFYzPihvdXQ6IFQsIG06IE00LCBwOiBWMyk6IFQge1xuICAgIGNvbnN0IHsgeCwgeSwgeiB9ID0gcDtcbiAgICBsZXQgdyA9IG0ubTAzICogeCArIG0ubTA3ICogeSArIG0ubTExICogeiArIG0ubTE1O1xuICAgIHcgPSB3ID8gMSAvIHcgOiAxO1xuICAgIHJldHVybiBzZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgKG0ubTAwICogeCArIG0ubTA0ICogeSArIG0ubTA4ICogeiArIG0ubTEyKSAqIHcsXG4gICAgICAgIChtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0wOSAqIHogKyBtLm0xMykgKiB3LFxuICAgICAgICAobS5tMDIgKiB4ICsgbS5tMDYgKiB5ICsgbS5tMTAgKiB6ICsgbS5tMTQpICogdyxcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbTRUcmFuc2Zvcm1EaXI8VCBleHRlbmRzIFYzPihvdXQ6IFQsIG06IE00LCBkOiBWMyk6IFQge1xuICAgIGNvbnN0IHsgeCwgeSwgeiB9ID0gZDtcbiAgICByZXR1cm4gc2V0KG91dCwgbS5tMDAgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMDggKiB6LCBtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0wOSAqIHosIG0ubTAyICogeCArIG0ubTA2ICogeSArIG0ubTEwICogeik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCh2OiBudW1iZXIsIGxvOiBudW1iZXIsIGhpOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2IDwgbG8gPyBsbyA6IHYgPiBoaSA/IGhpIDogdjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wMDEodjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdiA8IDAgPyAwIDogdiA+IDEgPyAxIDogdjtcbn1cblxuLyoqIFBvc2l0aXZlIG1vZHVsbzogd3JhcHMgYHZgIGludG8gWzAsIG4pLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXAodjogbnVtYmVyLCBuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAoKHYgJSBuKSArIG4pICUgbjtcbn1cbiIsICIvKipcbiAqIEN1YmljIEJlemllciBjdXJ2ZSBtYXRoIChwdXJlLCBubyBlbmdpbmUgZGVwZW5kZW5jeSkuXG4gKlxuICogQSBjdXJ2ZSBpcyB0aGUgc2VnbWVudCBiZXR3ZWVuIHR3byBrbm90czogcDAgPSBrbm90IHBvc2l0aW9uLFxuICogcDEgPSBwMCArIG91dCB0YW5nZW50LCBwMiA9IG5leHQga25vdCArIGl0cyBpbiB0YW5nZW50LCBwMyA9IG5leHQga25vdC5cbiAqL1xuaW1wb3J0IHsgVjMsIHYzLCBzZXQsIGNvcHksIHN1Yiwgc2NhbGUsIGxlbiwgbGVycCwgbm9ybWFsaXplLCBsZW5TcSwgRVBTSUxPTiwgZGlzdCB9IGZyb20gJy4vbWF0aCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VydmUge1xuICAgIHAwOiBWMztcbiAgICBwMTogVjM7XG4gICAgcDI6IFYzO1xuICAgIHAzOiBWMztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnZlKCk6IEN1cnZlIHtcbiAgICByZXR1cm4geyBwMDogdjMoKSwgcDE6IHYzKCksIHAyOiB2MygpLCBwMzogdjMoKSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weUN1cnZlKG91dDogQ3VydmUsIGM6IEN1cnZlKTogQ3VydmUge1xuICAgIGNvcHkob3V0LnAwLCBjLnAwKTtcbiAgICBjb3B5KG91dC5wMSwgYy5wMSk7XG4gICAgY29weShvdXQucDIsIGMucDIpO1xuICAgIGNvcHkob3V0LnAzLCBjLnAzKTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZhbFBvc2l0aW9uPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBjOiBDdXJ2ZSwgdDogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgdSA9IDEgLSB0O1xuICAgIGNvbnN0IGEgPSB1ICogdSAqIHU7XG4gICAgY29uc3QgYiA9IDMgKiB1ICogdSAqIHQ7XG4gICAgY29uc3QgZCA9IDMgKiB1ICogdCAqIHQ7XG4gICAgY29uc3QgZSA9IHQgKiB0ICogdDtcbiAgICByZXR1cm4gc2V0KFxuICAgICAgICBvdXQsXG4gICAgICAgIGEgKiBjLnAwLnggKyBiICogYy5wMS54ICsgZCAqIGMucDIueCArIGUgKiBjLnAzLngsXG4gICAgICAgIGEgKiBjLnAwLnkgKyBiICogYy5wMS55ICsgZCAqIGMucDIueSArIGUgKiBjLnAzLnksXG4gICAgICAgIGEgKiBjLnAwLnogKyBiICogYy5wMS56ICsgZCAqIGMucDIueiArIGUgKiBjLnAzLnosXG4gICAgKTtcbn1cblxuLyoqIEZpcnN0IGRlcml2YXRpdmUgZEIvZHQgKG5vdCBub3JtYWxpemVkKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmFsRGVyaXZhdGl2ZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgYzogQ3VydmUsIHQ6IG51bWJlcik6IFQge1xuICAgIGNvbnN0IHUgPSAxIC0gdDtcbiAgICBjb25zdCBhID0gMyAqIHUgKiB1O1xuICAgIGNvbnN0IGIgPSA2ICogdSAqIHQ7XG4gICAgY29uc3QgZCA9IDMgKiB0ICogdDtcbiAgICByZXR1cm4gc2V0KFxuICAgICAgICBvdXQsXG4gICAgICAgIGEgKiAoYy5wMS54IC0gYy5wMC54KSArIGIgKiAoYy5wMi54IC0gYy5wMS54KSArIGQgKiAoYy5wMy54IC0gYy5wMi54KSxcbiAgICAgICAgYSAqIChjLnAxLnkgLSBjLnAwLnkpICsgYiAqIChjLnAyLnkgLSBjLnAxLnkpICsgZCAqIChjLnAzLnkgLSBjLnAyLnkpLFxuICAgICAgICBhICogKGMucDEueiAtIGMucDAueikgKyBiICogKGMucDIueiAtIGMucDEueikgKyBkICogKGMucDMueiAtIGMucDIueiksXG4gICAgKTtcbn1cblxuLyoqIFNlY29uZCBkZXJpdmF0aXZlIGQyQi9kdDIuICovXG5leHBvcnQgZnVuY3Rpb24gZXZhbEFjY2VsZXJhdGlvbjxUIGV4dGVuZHMgVjM+KG91dDogVCwgYzogQ3VydmUsIHQ6IG51bWJlcik6IFQge1xuICAgIGNvbnN0IHUgPSAxIC0gdDtcbiAgICByZXR1cm4gc2V0KFxuICAgICAgICBvdXQsXG4gICAgICAgIDYgKiB1ICogKGMucDIueCAtIDIgKiBjLnAxLnggKyBjLnAwLngpICsgNiAqIHQgKiAoYy5wMy54IC0gMiAqIGMucDIueCArIGMucDEueCksXG4gICAgICAgIDYgKiB1ICogKGMucDIueSAtIDIgKiBjLnAxLnkgKyBjLnAwLnkpICsgNiAqIHQgKiAoYy5wMy55IC0gMiAqIGMucDIueSArIGMucDEueSksXG4gICAgICAgIDYgKiB1ICogKGMucDIueiAtIDIgKiBjLnAxLnogKyBjLnAwLnopICsgNiAqIHQgKiAoYy5wMy56IC0gMiAqIGMucDIueiArIGMucDEueiksXG4gICAgKTtcbn1cblxuY29uc3QgX2QgPSB2MygpO1xuXG4vKipcbiAqIERpcmVjdGlvbiBvZiB0cmF2ZWwgYXQgdCwgd2l0aCBhIHVzYWJsZSB2YWx1ZSBldmVuIHdoZXJlIHRoZSBkZXJpdmF0aXZlXG4gKiB2YW5pc2hlcyAobGluZWFyIGtub3RzIGhhdmUgemVybyB0YW5nZW50cywgc28gQicoMCkgPSAwKTogZmFsbHMgYmFjayB0byB0aGVcbiAqIHNlY29uZCBkZXJpdmF0aXZlLCB0aGVuIHRvIHRoZSBjaG9yZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2YWxEaXJlY3Rpb248VCBleHRlbmRzIFYzPihvdXQ6IFQsIGM6IEN1cnZlLCB0OiBudW1iZXIpOiBUIHtcbiAgICBldmFsRGVyaXZhdGl2ZShfZCwgYywgdCk7XG4gICAgaWYgKGxlblNxKF9kKSA+IEVQU0lMT04gKiBFUFNJTE9OKSByZXR1cm4gbm9ybWFsaXplKG91dCwgX2QpO1xuICAgIC8vIEF0IGFuIGVuZCB3aXRoIGEgemVybyB0YW5nZW50IHRoZSBjdXJ2ZSBsZWF2ZXMgYWxvbmcgdGhlIHNlY29uZCBkZXJpdmF0aXZlXG4gICAgLy8gKHNpZ246IHRvd2FyZHMgdGhlIGluc2lkZSBvZiB0aGUgY3VydmUgYXQgdCA9IDAsIGJhY2sgYWxvbmcgaXQgYXQgdCA9IDEpLlxuICAgIGV2YWxBY2NlbGVyYXRpb24oX2QsIGMsIHQpO1xuICAgIGlmIChsZW5TcShfZCkgPiBFUFNJTE9OICogRVBTSUxPTikge1xuICAgICAgICBpZiAodCA+IDAuNSkgc2NhbGUoX2QsIF9kLCAtMSk7XG4gICAgICAgIHJldHVybiBub3JtYWxpemUob3V0LCBfZCk7XG4gICAgfVxuICAgIHN1YihfZCwgYy5wMywgYy5wMCk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIF9kKTtcbn1cblxuLyoqIFNwbGl0cyBhdCB0IHdpdGggZGUgQ2FzdGVsamF1OyB0aGUgaGFsdmVzIHNoYXJlIHRoZSBzcGxpdCBwb2ludC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdChjOiBDdXJ2ZSwgdDogbnVtYmVyLCBsZWZ0OiBDdXJ2ZSwgcmlnaHQ6IEN1cnZlKTogdm9pZCB7XG4gICAgY29uc3QgcDAxID0gbGVycCh2MygpLCBjLnAwLCBjLnAxLCB0KTtcbiAgICBjb25zdCBwMTIgPSBsZXJwKHYzKCksIGMucDEsIGMucDIsIHQpO1xuICAgIGNvbnN0IHAyMyA9IGxlcnAodjMoKSwgYy5wMiwgYy5wMywgdCk7XG4gICAgY29uc3QgcDAxMiA9IGxlcnAodjMoKSwgcDAxLCBwMTIsIHQpO1xuICAgIGNvbnN0IHAxMjMgPSBsZXJwKHYzKCksIHAxMiwgcDIzLCB0KTtcbiAgICBjb25zdCBtaWQgPSBsZXJwKHYzKCksIHAwMTIsIHAxMjMsIHQpO1xuICAgIGNvbnN0IHAwID0gY29weSh2MygpLCBjLnAwKTtcbiAgICBjb25zdCBwMyA9IGNvcHkodjMoKSwgYy5wMyk7XG4gICAgY29weShsZWZ0LnAwLCBwMCk7XG4gICAgY29weShsZWZ0LnAxLCBwMDEpO1xuICAgIGNvcHkobGVmdC5wMiwgcDAxMik7XG4gICAgY29weShsZWZ0LnAzLCBtaWQpO1xuICAgIGNvcHkocmlnaHQucDAsIG1pZCk7XG4gICAgY29weShyaWdodC5wMSwgcDEyMyk7XG4gICAgY29weShyaWdodC5wMiwgcDIzKTtcbiAgICBjb3B5KHJpZ2h0LnAzLCBwMyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpbmVhcihjOiBDdXJ2ZSk6IGJvb2xlYW4ge1xuICAgIC8vIEJvdGggaGFuZGxlcyBsaWUgb24gdGhlIGNob3JkLlxuICAgIGNvbnN0IGNob3JkID0gc3ViKHYzKCksIGMucDMsIGMucDApO1xuICAgIGNvbnN0IGwgPSBsZW4oY2hvcmQpO1xuICAgIGlmIChsIDwgRVBTSUxPTikgcmV0dXJuIGRpc3QoYy5wMSwgYy5wMCkgPCBFUFNJTE9OICYmIGRpc3QoYy5wMiwgYy5wMykgPCBFUFNJTE9OO1xuICAgIHJldHVybiBkaXN0VG9MaW5lKGMucDEsIGMucDAsIGNob3JkLCBsKSA8IGwgKiAxZS01ICYmIGRpc3RUb0xpbmUoYy5wMiwgYy5wMCwgY2hvcmQsIGwpIDwgbCAqIDFlLTU7XG59XG5cbmZ1bmN0aW9uIGRpc3RUb0xpbmUocDogVjMsIG86IFYzLCBkOiBWMywgZGw6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcHggPSBwLnggLSBvLng7XG4gICAgY29uc3QgcHkgPSBwLnkgLSBvLnk7XG4gICAgY29uc3QgcHogPSBwLnogLSBvLno7XG4gICAgY29uc3QgY3ggPSBweSAqIGQueiAtIHB6ICogZC55O1xuICAgIGNvbnN0IGN5ID0gcHogKiBkLnggLSBweCAqIGQuejtcbiAgICBjb25zdCBjeiA9IHB4ICogZC55IC0gcHkgKiBkLng7XG4gICAgcmV0dXJuIE1hdGguc3FydChjeCAqIGN4ICsgY3kgKiBjeSArIGN6ICogY3opIC8gZGw7XG59XG5cbi8vIDgtcG9pbnQgR2F1c3MtTGVnZW5kcmUgb24gWzAsIDFdOiBleGFjdCBmb3IgcG9seW5vbWlhbHMgdXAgdG8gZGVncmVlIDE1LFxuLy8gcGxlbnR5IGZvciB8QicodCl8IG92ZXIgYSBzaG9ydCBwYXJhbWV0ZXIgcmFuZ2UuXG5jb25zdCBHTF9YID0gW1xuICAgIDAuMDE5ODU1MDcxNzUxMjMxOSwgMC4xMDE2NjY3NjEyOTMxODY2LCAwLjIzNzIzMzc5NTA0MTgzNTUsIDAuNDA4MjgyNjc4NzUyMTc1MSxcbiAgICAwLjU5MTcxNzMyMTI0NzgyNDksIDAuNzYyNzY2MjA0OTU4MTY0NSwgMC44OTgzMzMyMzg3MDY4MTM0LCAwLjk4MDE0NDkyODI0ODc2ODEsXG5dO1xuY29uc3QgR0xfVyA9IFtcbiAgICAwLjA1MDYxNDI2ODE0NTE4ODEsIDAuMTExMTkwNTE3MjI2Njg3MiwgMC4xNTY4NTMzMjI5Mzg5NDM2LCAwLjE4MTM0MTg5MTY4OTE4MTAsXG4gICAgMC4xODEzNDE4OTE2ODkxODEwLCAwLjE1Njg1MzMyMjkzODk0MzYsIDAuMTExMTkwNTE3MjI2Njg3MiwgMC4wNTA2MTQyNjgxNDUxODgxLFxuXTtcblxuLyoqIEFyYyBsZW5ndGggYmV0d2VlbiBwYXJhbWV0ZXJzIGEgYW5kIGIuICovXG5leHBvcnQgZnVuY3Rpb24gYXJjTGVuZ3RoKGM6IEN1cnZlLCBhID0gMCwgYiA9IDEpOiBudW1iZXIge1xuICAgIGlmIChiIDw9IGEpIHJldHVybiAwO1xuICAgIGNvbnN0IGggPSBiIC0gYTtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICBldmFsRGVyaXZhdGl2ZShfZCwgYywgYSArIGggKiBHTF9YW2ldKTtcbiAgICAgICAgc3VtICs9IEdMX1dbaV0gKiBsZW4oX2QpO1xuICAgIH1cbiAgICByZXR1cm4gc3VtICogaDtcbn1cblxuLyoqXG4gKiBDdW11bGF0aXZlIGFyYyBsZW5ndGggYXQgZXZlbmx5IHNwYWNlZCBwYXJhbWV0ZXJzOiBsdXRbaV0gaXMgdGhlIGxlbmd0aCBmcm9tXG4gKiB0ID0gMCB0byB0ID0gaSAvIChuIC0gMSkuIFVzZWQgdG8gbWFwIGRpc3RhbmNlIHRvIHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZExlbmd0aFRhYmxlKGM6IEN1cnZlLCBuOiBudW1iZXIsIG91dD86IEZsb2F0NjRBcnJheSk6IEZsb2F0NjRBcnJheSB7XG4gICAgY29uc3QgbHV0ID0gb3V0ICYmIG91dC5sZW5ndGggPT09IG4gPyBvdXQgOiBuZXcgRmxvYXQ2NEFycmF5KG4pO1xuICAgIGx1dFswXSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgbHV0W2ldID0gbHV0W2kgLSAxXSArIGFyY0xlbmd0aChjLCAoaSAtIDEpIC8gKG4gLSAxKSwgaSAvIChuIC0gMSkpO1xuICAgIH1cbiAgICByZXR1cm4gbHV0O1xufVxuXG4vKiogUGFyYW1ldGVyIHQgYXQgYXJjIGxlbmd0aCBgZGAgYWxvbmcgdGhlIGN1cnZlLCB1c2luZyBhIHRhYmxlIGZyb20gYnVpbGRMZW5ndGhUYWJsZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0QXRMZW5ndGgobHV0OiBGbG9hdDY0QXJyYXksIGQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbiA9IGx1dC5sZW5ndGg7XG4gICAgY29uc3QgdG90YWwgPSBsdXRbbiAtIDFdO1xuICAgIGlmIChkIDw9IDAgfHwgdG90YWwgPD0gMCkgcmV0dXJuIDA7XG4gICAgaWYgKGQgPj0gdG90YWwpIHJldHVybiAxO1xuICAgIGxldCBsbyA9IDA7XG4gICAgbGV0IGhpID0gbiAtIDE7XG4gICAgd2hpbGUgKGhpIC0gbG8gPiAxKSB7XG4gICAgICAgIGNvbnN0IG1pZCA9IChsbyArIGhpKSA+PiAxO1xuICAgICAgICBpZiAobHV0W21pZF0gPCBkKSBsbyA9IG1pZDtcbiAgICAgICAgZWxzZSBoaSA9IG1pZDtcbiAgICB9XG4gICAgY29uc3Qgc2VnID0gbHV0W2hpXSAtIGx1dFtsb107XG4gICAgY29uc3QgZiA9IHNlZyA+IDAgPyAoZCAtIGx1dFtsb10pIC8gc2VnIDogMDtcbiAgICByZXR1cm4gKGxvICsgZikgLyAobiAtIDEpO1xufVxuXG4vKiogQXJjIGxlbmd0aCBmcm9tIDAgdG8gdCwgdXNpbmcgYSB0YWJsZSBmcm9tIGJ1aWxkTGVuZ3RoVGFibGUuICovXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoQXRUKGx1dDogRmxvYXQ2NEFycmF5LCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IG4gPSBsdXQubGVuZ3RoO1xuICAgIGlmICh0IDw9IDApIHJldHVybiAwO1xuICAgIGlmICh0ID49IDEpIHJldHVybiBsdXRbbiAtIDFdO1xuICAgIGNvbnN0IHggPSB0ICogKG4gLSAxKTtcbiAgICBjb25zdCBpID0gTWF0aC5mbG9vcih4KTtcbiAgICBjb25zdCBmID0geCAtIGk7XG4gICAgcmV0dXJuIGx1dFtpXSArIChsdXRbTWF0aC5taW4oaSArIDEsIG4gLSAxKV0gLSBsdXRbaV0pICogZjtcbn1cblxuLyoqXG4gKiBDbG9zZXN0IHBhcmFtZXRlciBvbiB0aGUgY3VydmUgdG8gcG9pbnQgcDogY29hcnNlIHNhbXBsaW5nIGZvbGxvd2VkIGJ5XG4gKiBhIGZldyByb3VuZHMgb2YgbG9jYWwgcmVmaW5lbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5lYXJlc3RUKGM6IEN1cnZlLCBwOiBWMywgc2FtcGxlcyA9IDE2LCBpdGVyYXRpb25zID0gNCk6IHsgdDogbnVtYmVyOyBkaXN0U3E6IG51bWJlciB9IHtcbiAgICBjb25zdCBxID0gdjMoKTtcbiAgICBsZXQgYmVzdFQgPSAwO1xuICAgIGxldCBiZXN0ID0gSW5maW5pdHk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2FtcGxlczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHQgPSBpIC8gc2FtcGxlcztcbiAgICAgICAgZXZhbFBvc2l0aW9uKHEsIGMsIHQpO1xuICAgICAgICBjb25zdCBkID0gKHEueCAtIHAueCkgKiogMiArIChxLnkgLSBwLnkpICoqIDIgKyAocS56IC0gcC56KSAqKiAyO1xuICAgICAgICBpZiAoZCA8IGJlc3QpIHtcbiAgICAgICAgICAgIGJlc3QgPSBkO1xuICAgICAgICAgICAgYmVzdFQgPSB0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdGVwID0gMSAvIHNhbXBsZXM7XG4gICAgZm9yIChsZXQgaXQgPSAwOyBpdCA8IGl0ZXJhdGlvbnM7IGl0KyspIHtcbiAgICAgICAgc3RlcCAqPSAwLjU7XG4gICAgICAgIGZvciAoY29uc3QgdCBvZiBbYmVzdFQgLSBzdGVwLCBiZXN0VCArIHN0ZXBdKSB7XG4gICAgICAgICAgICBpZiAodCA8IDAgfHwgdCA+IDEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgZXZhbFBvc2l0aW9uKHEsIGMsIHQpO1xuICAgICAgICAgICAgY29uc3QgZCA9IChxLnggLSBwLngpICoqIDIgKyAocS55IC0gcC55KSAqKiAyICsgKHEueiAtIHAueikgKiogMjtcbiAgICAgICAgICAgIGlmIChkIDwgYmVzdCkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBkO1xuICAgICAgICAgICAgICAgIGJlc3RUID0gdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB0OiBiZXN0VCwgZGlzdFNxOiBiZXN0IH07XG59XG4iLCAiLyoqXG4gKiBTcGxpbmUgbG9naWMgb24gcGxhaW4gZGF0YSAobm8gZW5naW5lIGRlcGVuZGVuY3kpLlxuICpcbiAqIEEgc3BsaW5lIGlzIGEgbGlzdCBvZiBCZXppZXIga25vdHMuIEVhY2gga25vdCBoYXMgYSBwb3NpdGlvbiwgYSByb3RhdGlvbiBhbmRcbiAqIHR3byB0YW5nZW50cyBleHByZXNzZWQgaW4gdGhlIGtub3QncyBvd24gc3BhY2UgKCtaID0gZGlyZWN0aW9uIG9mIHRyYXZlbCxcbiAqICtZID0gdXApLCBwbHVzIGEgdGFuZ2VudCBtb2RlIHRoYXQgZGVjaWRlcyBob3cgdGhlIHRhbmdlbnRzIGFyZSBrZXB0OlxuICpcbiAqIC0gQXV0b1Ntb290aDogdGFuZ2VudHMgY29tcHV0ZWQgZnJvbSB0aGUgbmVpZ2hib3IgcG9zaXRpb25zIChDYXRtdWxsLVJvbSkuXG4gKiAtIExpbmVhcjogICAgIG5vIHRhbmdlbnRzLCBzdHJhaWdodCBzZWdtZW50cy5cbiAqIC0gTWlycm9yZWQ6ICAgdGFuZ2VudHMgb3Bwb3NpdGUgYW5kIG9mIGVxdWFsIGxlbmd0aC5cbiAqIC0gQ29udGludW91czogdGFuZ2VudHMgb3Bwb3NpdGUsIGxlbmd0aHMgaW5kZXBlbmRlbnQuXG4gKiAtIEJyb2tlbjogICAgIHRhbmdlbnRzIGluZGVwZW5kZW50LlxuICpcbiAqIFBvc2l0aW9ucyBhcmUgaW4gdGhlIHNwbGluZSdzIGxvY2FsIHNwYWNlICh0aGUgU3BsaW5lQ29udGFpbmVyIG5vZGUpLlxuICovXG5pbXBvcnQge1xuICAgIFYzLCBRNCwgdjMsIHE0LCBzZXQsIGNvcHksIGFkZCwgc3ViLCBzY2FsZSwgbm9ybWFsaXplLCBsZW4sIGxlblNxLCBkb3QsIGNyb3NzLCBkaXN0LCBkaXN0U3EsXG4gICAgcVJvdGF0ZSwgcUludmVydCwgcU11bCwgcUNvcHksIHFMb29rUm90YXRpb24sIHFGcm9tQXhpc0FuZ2xlLCBxTm9ybWFsaXplLCBxSWRlbnRpdHksXG4gICAgcHJvamVjdE9uUGxhbmUsIGFueVBlcnBlbmRpY3VsYXIsIHdyYXAsIGNsYW1wMDEsIEVQU0lMT04sIHNjYWxlQW5kQWRkLCBsZXJwLFxufSBmcm9tICcuL21hdGgnO1xuaW1wb3J0IHtcbiAgICBDdXJ2ZSwgY3VydmUsIGV2YWxQb3NpdGlvbiwgZXZhbERpcmVjdGlvbiwgZXZhbERlcml2YXRpdmUsIHNwbGl0LCBidWlsZExlbmd0aFRhYmxlLCB0QXRMZW5ndGgsIGFyY0xlbmd0aCwgbmVhcmVzdFQsXG59IGZyb20gJy4vY3VydmUnO1xuXG5leHBvcnQgZW51bSBUYW5nZW50TW9kZSB7XG4gICAgQXV0b1Ntb290aCA9IDAsXG4gICAgTGluZWFyID0gMSxcbiAgICBNaXJyb3JlZCA9IDIsXG4gICAgQ29udGludW91cyA9IDMsXG4gICAgQnJva2VuID0gNCxcbn1cblxuLyoqIERlZmF1bHQgQ2F0bXVsbC1Sb20gcGFyYW1ldGVyaXphdGlvbiB1c2VkIGJ5IEF1dG9TbW9vdGgga25vdHMgKDAgdW5pZm9ybSwgMC41IGNlbnRyaXBldGFsLCAxIGNob3JkYWwpLiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVEVOU0lPTiA9IDAuNTtcblxuZXhwb3J0IGludGVyZmFjZSBLbm90TGlrZSB7XG4gICAgcG9zaXRpb246IFYzO1xuICAgIHRhbmdlbnRJbjogVjM7XG4gICAgdGFuZ2VudE91dDogVjM7XG4gICAgcm90YXRpb246IFE0O1xuICAgIG1vZGU6IG51bWJlcjtcbiAgICB0ZW5zaW9uOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BsaW5lTGlrZSB7XG4gICAga25vdHM6IEtub3RMaWtlW107XG4gICAgY2xvc2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpbmtMaWtlIHtcbiAgICAvKiogRmxhdHRlbmVkIChzcGxpbmVJbmRleCwga25vdEluZGV4KSBwYWlycy4gKi9cbiAgICBrbm90czogbnVtYmVyW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFpbmVyTGlrZSB7XG4gICAgc3BsaW5lczogU3BsaW5lTGlrZVtdO1xuICAgIGxpbmtzOiBMaW5rTGlrZVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY3Rvcnkge1xuICAgIGtub3QoKTogS25vdExpa2U7XG4gICAgc3BsaW5lKCk6IFNwbGluZUxpa2U7XG4gICAgbGluaygpOiBMaW5rTGlrZTtcbn1cblxuY29uc3QgVVA6IFYzID0geyB4OiAwLCB5OiAxLCB6OiAwIH07XG5jb25zdCBGT1JXQVJEOiBWMyA9IHsgeDogMCwgeTogMCwgejogMSB9O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaW5kaWNlc1xuXG5leHBvcnQgZnVuY3Rpb24gcHJldkluZGV4KGk6IG51bWJlciwgY291bnQ6IG51bWJlciwgY2xvc2VkOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY2xvc2VkID8gd3JhcChpIC0gMSwgY291bnQpIDogTWF0aC5tYXgoaSAtIDEsIDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dEluZGV4KGk6IG51bWJlciwgY291bnQ6IG51bWJlciwgY2xvc2VkOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY2xvc2VkID8gd3JhcChpICsgMSwgY291bnQpIDogTWF0aC5taW4oaSArIDEsIGNvdW50IC0gMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJ2ZUNvdW50KHM6IFNwbGluZUxpa2UpOiBudW1iZXIge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBpZiAobiA8IDIpIHJldHVybiAwO1xuICAgIHJldHVybiBzLmNsb3NlZCA/IG4gOiBuIC0gMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRhbmdlbnRzRWRpdGFibGUobW9kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1vZGUgPT09IFRhbmdlbnRNb2RlLk1pcnJvcmVkIHx8IG1vZGUgPT09IFRhbmdlbnRNb2RlLkNvbnRpbnVvdXMgfHwgbW9kZSA9PT0gVGFuZ2VudE1vZGUuQnJva2VuO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBrbm90c1xuXG5leHBvcnQgZnVuY3Rpb24gY29weUtub3Q8SyBleHRlbmRzIEtub3RMaWtlPihvdXQ6IEssIGs6IEtub3RMaWtlKTogSyB7XG4gICAgY29weShvdXQucG9zaXRpb24sIGsucG9zaXRpb24pO1xuICAgIGNvcHkob3V0LnRhbmdlbnRJbiwgay50YW5nZW50SW4pO1xuICAgIGNvcHkob3V0LnRhbmdlbnRPdXQsIGsudGFuZ2VudE91dCk7XG4gICAgcUNvcHkob3V0LnJvdGF0aW9uLCBrLnJvdGF0aW9uKTtcbiAgICBvdXQubW9kZSA9IGsubW9kZTtcbiAgICBvdXQudGVuc2lvbiA9IGsudGVuc2lvbjtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga25vdFVwPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBrOiBLbm90TGlrZSk6IFQge1xuICAgIHJldHVybiBxUm90YXRlKG91dCwgay5yb3RhdGlvbiwgVVApO1xufVxuXG4vKiogT3V0IHRhbmdlbnQgaW4gc3BsaW5lIHNwYWNlIChvZmZzZXQgZnJvbSB0aGUga25vdCBwb3NpdGlvbikuICovXG5leHBvcnQgZnVuY3Rpb24gdGFuZ2VudE91dFZlYzxUIGV4dGVuZHMgVjM+KG91dDogVCwgazogS25vdExpa2UpOiBUIHtcbiAgICByZXR1cm4gcVJvdGF0ZShvdXQsIGsucm90YXRpb24sIGsudGFuZ2VudE91dCk7XG59XG5cbi8qKiBJbiB0YW5nZW50IGluIHNwbGluZSBzcGFjZSAob2Zmc2V0IGZyb20gdGhlIGtub3QgcG9zaXRpb24pLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhbmdlbnRJblZlYzxUIGV4dGVuZHMgVjM+KG91dDogVCwgazogS25vdExpa2UpOiBUIHtcbiAgICByZXR1cm4gcVJvdGF0ZShvdXQsIGsucm90YXRpb24sIGsudGFuZ2VudEluKTtcbn1cblxuLyoqXG4gKiBLbm90IHJvdGF0aW9uIGZvciBhIHRhbmdlbnQgZGlyZWN0aW9uIGFuZCBhIG5vcm1hbCAodXApLiBMaWtlIFVuaXR5J3NcbiAqIEdldEtub3RSb3RhdGlvbjogdXAgaXMgdGhlIG5vcm1hbCBwcm9qZWN0ZWQgb2ZmIHRoZSB0YW5nZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24ga25vdFJvdGF0aW9uPFQgZXh0ZW5kcyBRND4ob3V0OiBULCB0YW5nZW50OiBWMywgbm9ybWFsOiBWMyk6IFQge1xuICAgIGNvbnN0IHQgPSBub3JtYWxpemUodjMoKSwgdGFuZ2VudCk7XG4gICAgbGV0IG4gPSBub3JtYWxpemUodjMoKSwgbm9ybWFsKTtcbiAgICBpZiAobGVuU3EobikgPCBFUFNJTE9OKSBuID0gY29weSh2MygpLCBVUCk7XG4gICAgaWYgKGxlblNxKHQpIDwgRVBTSUxPTikge1xuICAgICAgICAvLyBObyBkaXJlY3Rpb246IGZvcndhcmQgaXMgYW55IGRpcmVjdGlvbiBwZXJwZW5kaWN1bGFyIHRvIHRoZSBub3JtYWwuXG4gICAgICAgIGNvbnN0IGYgPSBhbnlQZXJwZW5kaWN1bGFyKHYzKCksIG4pO1xuICAgICAgICByZXR1cm4gcUxvb2tSb3RhdGlvbihvdXQsIGYsIG4pO1xuICAgIH1cbiAgICBpZiAoTWF0aC5hYnMoZG90KHQsIG4pKSA+IDEgLSAxZS01KSB7XG4gICAgICAgIC8vIE5vcm1hbCBwYXJhbGxlbCB0byB0aGUgdGFuZ2VudDogcGljayBhbiB1cCBwZXJwZW5kaWN1bGFyIHRvIGl0LlxuICAgICAgICBjb25zdCB1cCA9IGNyb3NzKHYzKCksIHQsIHsgeDogMSwgeTogMCwgejogMCB9KTtcbiAgICAgICAgaWYgKGxlblNxKHVwKSA8IEVQU0lMT04pIGNyb3NzKHVwLCB0LCB7IHg6IDAsIHk6IDAsIHo6IDEgfSk7XG4gICAgICAgIHJldHVybiBxTG9va1JvdGF0aW9uKG91dCwgdCwgbm9ybWFsaXplKHVwLCB1cCkpO1xuICAgIH1cbiAgICBjb25zdCB1cCA9IG5vcm1hbGl6ZSh2MygpLCBwcm9qZWN0T25QbGFuZSh2MygpLCBuLCB0KSk7XG4gICAgcmV0dXJuIHFMb29rUm90YXRpb24ob3V0LCB0LCB1cCk7XG59XG5cbi8qKlxuICogQXV0b1Ntb290aCB0YW5nZW50IGF0IGBjdXJgIGdpdmVuIGl0cyBuZWlnaGJvcnM6IGEgQ2F0bXVsbC1Sb20gdGFuZ2VudCB3aXRoXG4gKiB0aGUgcGFyYW1ldGVyaXphdGlvbiBgdGVuc2lvbmAgKGFscGhhKSwgc2NhbGVkIGZvciBhIGN1YmljIEJlemllciBoYW5kbGUuXG4gKiBCYXNlZCBvbiBZdWtzZWwgZXQgYWwuLCBcIlBhcmFtZXRlcml6YXRpb24gYW5kIGFwcGxpY2F0aW9ucyBvZiBDYXRtdWxsLVJvbSBjdXJ2ZXNcIi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF1dG9TbW9vdGhUYW5nZW50PFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBwcmV2OiBWMywgY3VyOiBWMywgbmV4dDogVjMsIHRlbnNpb246IG51bWJlcik6IFQge1xuICAgIGNvbnN0IGQxID0gZGlzdChjdXIsIHByZXYpO1xuICAgIGNvbnN0IGQyID0gZGlzdChuZXh0LCBjdXIpO1xuICAgIGlmIChkMSA8IEVQU0lMT04gJiYgZDIgPCBFUFNJTE9OKSByZXR1cm4gc2V0KG91dCwgMCwgMCwgMCk7XG4gICAgLy8gT25seSBvbmUgbmVpZ2hib3I6IGEgc2hvcnQgaGFuZGxlIHRvd2FyZHMgaXQsIGVub3VnaCB0byBnaXZlIHRoZSBrbm90IGEgZGlyZWN0aW9uLlxuICAgIGlmIChkMSA8IEVQU0lMT04pIHJldHVybiBzY2FsZShvdXQsIHN1YihvdXQsIG5leHQsIGN1ciksIDAuMSk7XG4gICAgaWYgKGQyIDwgRVBTSUxPTikgcmV0dXJuIHNjYWxlKG91dCwgc3ViKG91dCwgY3VyLCBwcmV2KSwgMC4xKTtcbiAgICBjb25zdCBhID0gdGVuc2lvbjtcbiAgICBjb25zdCBkMWEgPSBNYXRoLnBvdyhkMSwgYSk7XG4gICAgY29uc3QgZDJhID0gTWF0aC5wb3coZDIsIGEpO1xuICAgIGNvbnN0IGQxYTIgPSBkMWEgKiBkMWE7XG4gICAgY29uc3QgZDJhMiA9IGQyYSAqIGQyYTtcbiAgICBjb25zdCBrID0gMSAvICgzICogZDFhICogKGQxYSArIGQyYSkpO1xuICAgIHJldHVybiBzZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgKGQxYTIgKiBuZXh0LnggLSBkMmEyICogcHJldi54ICsgKGQyYTIgLSBkMWEyKSAqIGN1ci54KSAqIGssXG4gICAgICAgIChkMWEyICogbmV4dC55IC0gZDJhMiAqIHByZXYueSArIChkMmEyIC0gZDFhMikgKiBjdXIueSkgKiBrLFxuICAgICAgICAoZDFhMiAqIG5leHQueiAtIGQyYTIgKiBwcmV2LnogKyAoZDJhMiAtIGQxYTIpICogY3VyLnopICogayxcbiAgICApO1xufVxuXG4vKiogUmVjb21wdXRlcyB0aGUgdGFuZ2VudHMgKGFuZCByb3RhdGlvbikgYSBrbm90J3MgbW9kZSBpbXBsaWVzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VGFuZ2VudE1vZGUoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmIChpIDwgMCB8fCBpID49IG4pIHJldHVybjtcbiAgICBjb25zdCBrID0gcy5rbm90c1tpXTtcbiAgICBzd2l0Y2ggKGsubW9kZSkge1xuICAgICAgICBjYXNlIFRhbmdlbnRNb2RlLkxpbmVhcjpcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgMCk7XG4gICAgICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFRhbmdlbnRNb2RlLkF1dG9TbW9vdGg6IHtcbiAgICAgICAgICAgIGNvbnN0IHByZXYgPSBzLmtub3RzW3ByZXZJbmRleChpLCBuLCBzLmNsb3NlZCldLnBvc2l0aW9uO1xuICAgICAgICAgICAgY29uc3QgbmV4dCA9IHMua25vdHNbbmV4dEluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgICAgICAgICBjb25zdCB1cCA9IGtub3RVcCh2MygpLCBrKTtcbiAgICAgICAgICAgIGNvbnN0IHRpbiA9IGF1dG9TbW9vdGhUYW5nZW50KHYzKCksIG5leHQsIGsucG9zaXRpb24sIHByZXYsIGsudGVuc2lvbik7XG4gICAgICAgICAgICBjb25zdCB0b3V0ID0gYXV0b1Ntb290aFRhbmdlbnQodjMoKSwgcHJldiwgay5wb3NpdGlvbiwgbmV4dCwgay50ZW5zaW9uKTtcbiAgICAgICAgICAgIGxldCBsaW4gPSBsZW4odGluKTtcbiAgICAgICAgICAgIGxldCBsb3V0ID0gbGVuKHRvdXQpO1xuICAgICAgICAgICAgbGV0IGRpciA9IHRvdXQ7XG4gICAgICAgICAgICBpZiAobGluIDwgRVBTSUxPTikgbGluID0gbG91dDtcbiAgICAgICAgICAgIGlmIChsb3V0IDwgRVBTSUxPTikge1xuICAgICAgICAgICAgICAgIGxvdXQgPSBsaW47XG4gICAgICAgICAgICAgICAgZGlyID0gc2NhbGUodjMoKSwgdGluLCAtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGVuU3EoZGlyKSA+IEVQU0lMT04pIGtub3RSb3RhdGlvbihrLnJvdGF0aW9uLCBkaXIsIHVwKTtcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWxpbik7XG4gICAgICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCBsb3V0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgVGFuZ2VudE1vZGUuTWlycm9yZWQ6XG4gICAgICAgIGNhc2UgVGFuZ2VudE1vZGUuQ29udGludW91czpcbiAgICAgICAgICAgIGJha2VUYW5nZW50RGlyZWN0aW9uKGssIGsubW9kZSA9PT0gVGFuZ2VudE1vZGUuTWlycm9yZWQsIHRydWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbi8qKlxuICogVHVybnMgdGhlIGtub3Qgc28gaXRzIHRhbmdlbnRzIGxpZSBvbiBsb2NhbCBaICh0aGUgbWFpbiB0YW5nZW50IGtlZXBzIGl0c1xuICogZGlyZWN0aW9uKSwgYXMgTWlycm9yZWQgLyBDb250aW51b3VzIGtub3RzIHN0b3JlIHRoZW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiYWtlVGFuZ2VudERpcmVjdGlvbihrOiBLbm90TGlrZSwgbWlycm9yZWQ6IGJvb2xlYW4sIG91dElzTWFpbjogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRvdXQgPSB0YW5nZW50T3V0VmVjKHYzKCksIGspO1xuICAgIGNvbnN0IHRpbiA9IHRhbmdlbnRJblZlYyh2MygpLCBrKTtcbiAgICBjb25zdCBtYWluID0gb3V0SXNNYWluID8gdG91dCA6IHNjYWxlKHYzKCksIHRpbiwgLTEpO1xuICAgIGNvbnN0IG90aGVyID0gb3V0SXNNYWluID8gc2NhbGUodjMoKSwgdGluLCAtMSkgOiB0b3V0O1xuICAgIGNvbnN0IGRpciA9IGxlblNxKG1haW4pID4gRVBTSUxPTiA/IG1haW4gOiBvdGhlcjtcbiAgICBjb25zdCB1cCA9IGtub3RVcCh2MygpLCBrKTtcbiAgICBpZiAobGVuU3EoZGlyKSA+IEVQU0lMT04pIGtub3RSb3RhdGlvbihrLnJvdGF0aW9uLCBkaXIsIHVwKTtcbiAgICBjb25zdCBsbWFpbiA9IGxlbihtYWluKTtcbiAgICBjb25zdCBsb3RoZXIgPSBsZW4ob3RoZXIpO1xuICAgIGlmIChtaXJyb3JlZCkge1xuICAgICAgICBjb25zdCBsID0gbG1haW4gPiBFUFNJTE9OID8gbG1haW4gOiBsb3RoZXI7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGwpO1xuICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1sKTtcbiAgICB9IGVsc2UgaWYgKG91dElzTWFpbikge1xuICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCBsbWFpbik7XG4gICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWxvdGhlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbG1haW4pO1xuICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCBsb3RoZXIpO1xuICAgIH1cbn1cblxuLyoqIFJlY29tcHV0ZXMgdGhlIGtub3QgYW5kIGl0cyBBdXRvU21vb3RoIG5laWdoYm9ycyBhZnRlciBpdHMgcG9zaXRpb24gY2hhbmdlZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoQXJvdW5kKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBpZiAoIW4pIHJldHVybjtcbiAgICBjb25zdCBwID0gcHJldkluZGV4KGksIG4sIHMuY2xvc2VkKTtcbiAgICBjb25zdCBxID0gbmV4dEluZGV4KGksIG4sIHMuY2xvc2VkKTtcbiAgICBpZiAocCAhPT0gaSAmJiBzLmtub3RzW3BdLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpIGFwcGx5VGFuZ2VudE1vZGUocywgcCk7XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBpKTtcbiAgICBpZiAocSAhPT0gaSAmJiBxICE9PSBwICYmIHMua25vdHNbcV0ubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCkgYXBwbHlUYW5nZW50TW9kZShzLCBxKTtcbn1cblxuLyoqIFJlLWFwcGxpZXMgZXZlcnkga25vdCdzIG1vZGUgKGFmdGVyIGxvYWRpbmcgb3IgZXh0ZXJuYWwgZWRpdHMpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hBbGwoczogU3BsaW5lTGlrZSk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5rbm90cy5sZW5ndGg7IGkrKykgYXBwbHlUYW5nZW50TW9kZShzLCBpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEtub3RQb3NpdGlvbihzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIsIHA6IFYzKTogdm9pZCB7XG4gICAgY29weShzLmtub3RzW2ldLnBvc2l0aW9uLCBwKTtcbiAgICByZWZyZXNoQXJvdW5kKHMsIGkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGluIG9yIG91dCB0YW5nZW50IGZyb20gYSBzcGxpbmUtc3BhY2Ugb2Zmc2V0LCBrZWVwaW5nIHRoZSBrbm90J3NcbiAqIG1vZGUgY29uc3RyYWludHMuIFRhbmdlbnRzIG9mIEF1dG9TbW9vdGggLyBMaW5lYXIga25vdHMgYmVjb21lIENvbnRpbnVvdXNcbiAqICh0aGV5IGhhdmUgbm90aGluZyB0byBkcmFnIG90aGVyd2lzZSkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRUYW5nZW50VmVjKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlciwgd2hpY2g6ICdpbicgfCAnb3V0JywgdjogVjMpOiB2b2lkIHtcbiAgICBjb25zdCBrID0gcy5rbm90c1tpXTtcbiAgICBpZiAoIXRhbmdlbnRzRWRpdGFibGUoay5tb2RlKSkge1xuICAgICAgICBpZiAoay5tb2RlID09PSBUYW5nZW50TW9kZS5MaW5lYXIpIG1ha2VFeHBsaWNpdExpbmVhclRhbmdlbnRzKHMsIGkpO1xuICAgICAgICBrLm1vZGUgPSBUYW5nZW50TW9kZS5Db250aW51b3VzO1xuICAgIH1cbiAgICBpZiAoay5tb2RlID09PSBUYW5nZW50TW9kZS5Ccm9rZW4pIHtcbiAgICAgICAgY29uc3QgbG9jYWwgPSBxUm90YXRlKHYzKCksIHFJbnZlcnQocTQoKSwgay5yb3RhdGlvbiksIHYpO1xuICAgICAgICBjb3B5KHdoaWNoID09PSAnaW4nID8gay50YW5nZW50SW4gOiBrLnRhbmdlbnRPdXQsIGxvY2FsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBsID0gbGVuKHYpO1xuICAgIGNvbnN0IGRpciA9IHdoaWNoID09PSAnb3V0JyA/IGNvcHkodjMoKSwgdikgOiBzY2FsZSh2MygpLCB2LCAtMSk7XG4gICAgaWYgKGwgPiBFUFNJTE9OKSBrbm90Um90YXRpb24oay5yb3RhdGlvbiwgZGlyLCBrbm90VXAodjMoKSwgaykpO1xuICAgIGNvbnN0IG1pcnJvcmVkID0gay5tb2RlID09PSBUYW5nZW50TW9kZS5NaXJyb3JlZDtcbiAgICBpZiAod2hpY2ggPT09ICdvdXQnKSB7XG4gICAgICAgIGNvbnN0IGxpbiA9IG1pcnJvcmVkID8gbCA6IGxlbihrLnRhbmdlbnRJbik7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGwpO1xuICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1saW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxvdXQgPSBtaXJyb3JlZCA/IGwgOiBsZW4oay50YW5nZW50T3V0KTtcbiAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbCk7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGxvdXQpO1xuICAgIH1cbn1cblxuLyoqIExpbmVhciBrbm90cyBzdG9yZSB6ZXJvIHRhbmdlbnRzOyBnaXZlIHRoZW0gZ3JhYmJhYmxlIG9uZXMgcG9pbnRpbmcgYXQgdGhlIG5laWdoYm9ycy4gKi9cbmZ1bmN0aW9uIG1ha2VFeHBsaWNpdExpbmVhclRhbmdlbnRzKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBjb25zdCBrID0gcy5rbm90c1tpXTtcbiAgICBjb25zdCBpbnYgPSBxSW52ZXJ0KHE0KCksIGsucm90YXRpb24pO1xuICAgIGNvbnN0IHByZXYgPSBzLmtub3RzW3ByZXZJbmRleChpLCBuLCBzLmNsb3NlZCldLnBvc2l0aW9uO1xuICAgIGNvbnN0IG5leHQgPSBzLmtub3RzW25leHRJbmRleChpLCBuLCBzLmNsb3NlZCldLnBvc2l0aW9uO1xuICAgIHFSb3RhdGUoay50YW5nZW50SW4sIGludiwgc2NhbGUodjMoKSwgc3ViKHYzKCksIHByZXYsIGsucG9zaXRpb24pLCAxIC8gMykpO1xuICAgIHFSb3RhdGUoay50YW5nZW50T3V0LCBpbnYsIHNjYWxlKHYzKCksIHN1Yih2MygpLCBuZXh0LCBrLnBvc2l0aW9uKSwgMSAvIDMpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRhbmdlbnRNb2RlKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlciwgbW9kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgayA9IHMua25vdHNbaV07XG4gICAgaWYgKGsubW9kZSA9PT0gbW9kZSkge1xuICAgICAgICBhcHBseVRhbmdlbnRNb2RlKHMsIGkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChrLm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhciAmJiB0YW5nZW50c0VkaXRhYmxlKG1vZGUpKSBtYWtlRXhwbGljaXRMaW5lYXJUYW5nZW50cyhzLCBpKTtcbiAgICBrLm1vZGUgPSBtb2RlO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUZW5zaW9uKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlciwgdGVuc2lvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgcy5rbm90c1tpXS50ZW5zaW9uID0gdGVuc2lvbjtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIGkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Um90YXRpb24oczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCByOiBRNCk6IHZvaWQge1xuICAgIHFOb3JtYWxpemUocy5rbm90c1tpXS5yb3RhdGlvbiwgcik7XG4gICAgLy8gQXV0b1Ntb290aCBrbm90cyBvd24gdGhlaXIgcm90YXRpb24ncyBkaXJlY3Rpb247IG9ubHkgdGhlIHJvbGwgc3RpY2tzLlxuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY3VydmVzXG5cbi8qKiBDb250cm9sIHBvaW50cyBvZiBjdXJ2ZSBpIChiZXR3ZWVuIGtub3QgaSBhbmQgdGhlIG5leHQga25vdCkuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VydmUoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCBvdXQ6IEN1cnZlID0gY3VydmUoKSk6IEN1cnZlIHtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgY29uc3QgYSA9IHMua25vdHNbaV07XG4gICAgY29uc3QgYiA9IHMua25vdHNbKGkgKyAxKSAlIG5dO1xuICAgIGNvcHkob3V0LnAwLCBhLnBvc2l0aW9uKTtcbiAgICBhZGQob3V0LnAxLCBhLnBvc2l0aW9uLCB0YW5nZW50T3V0VmVjKG91dC5wMSwgYSkpO1xuICAgIGFkZChvdXQucDIsIGIucG9zaXRpb24sIHRhbmdlbnRJblZlYyhvdXQucDIsIGIpKTtcbiAgICBjb3B5KG91dC5wMywgYi5wb3NpdGlvbik7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY2FjaGVcblxuLyoqIFNhbXBsZXMgcGVyIGN1cnZlIGZvciB0aGUgZGlzdGFuY2UgdGFibGUuICovXG5leHBvcnQgY29uc3QgTEVOR1RIX1NBTVBMRVMgPSAzMjtcbi8qKiBTYW1wbGVzIHBlciBjdXJ2ZSBmb3IgdGhlIHVwLXZlY3RvciB0YWJsZS4gKi9cbmV4cG9ydCBjb25zdCBVUF9TQU1QTEVTID0gMTY7XG5cbmV4cG9ydCBjbGFzcyBTcGxpbmVDYWNoZSB7XG4gICAgLyoqIEZpbmdlcnByaW50IG9mIHRoZSBkYXRhIHRoZSBjYWNoZSB3YXMgYnVpbHQgZnJvbS4gKi9cbiAgICBzdGFtcCA9IE5hTjtcbiAgICBjdXJ2ZXM6IEN1cnZlW10gPSBbXTtcbiAgICBsZW5ndGhzOiBudW1iZXJbXSA9IFtdO1xuICAgIC8qKiBMZW5ndGggb2YgYWxsIGN1cnZlcyBiZWZvcmUgY3VydmUgaS4gKi9cbiAgICBzdGFydHM6IG51bWJlcltdID0gW107XG4gICAgdG90YWwgPSAwO1xuICAgIHRhYmxlczogRmxvYXQ2NEFycmF5W10gPSBbXTtcbiAgICB1cHM6IChGbG9hdDY0QXJyYXkgfCBudWxsKVtdID0gW107XG59XG5cbmNvbnN0IF9oYXNoQnVmID0gbmV3IEZsb2F0NjRBcnJheSgxKTtcbmNvbnN0IF9oYXNoSW50ID0gbmV3IEludDMyQXJyYXkoX2hhc2hCdWYuYnVmZmVyKTtcblxuZnVuY3Rpb24gbWl4KGg6IG51bWJlciwgdjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBfaGFzaEJ1ZlswXSA9IHY7XG4gICAgaCA9IE1hdGguaW11bChoIF4gX2hhc2hJbnRbMF0sIDE2Nzc3NjE5KTtcbiAgICBoID0gTWF0aC5pbXVsKGggXiBfaGFzaEludFsxXSwgMTY3Nzc2MTkpO1xuICAgIHJldHVybiBoO1xufVxuXG4vKiogQ2hlYXAgaGFzaCBvZiBldmVyeXRoaW5nIHRoYXQgc2hhcGVzIHRoZSBzcGxpbmUuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZ2VycHJpbnQoczogU3BsaW5lTGlrZSk6IG51bWJlciB7XG4gICAgbGV0IGggPSAyMTY2MTM2MjYxIHwgMDtcbiAgICBoID0gbWl4KGgsIHMua25vdHMubGVuZ3RoKTtcbiAgICBoID0gbWl4KGgsIHMuY2xvc2VkID8gMSA6IDApO1xuICAgIGZvciAoY29uc3QgayBvZiBzLmtub3RzKSB7XG4gICAgICAgIGggPSBtaXgoaCwgay5wb3NpdGlvbi54KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnBvc2l0aW9uLnkpO1xuICAgICAgICBoID0gbWl4KGgsIGsucG9zaXRpb24ueik7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50SW4ueCk7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50SW4ueSk7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50SW4ueik7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50T3V0LngpO1xuICAgICAgICBoID0gbWl4KGgsIGsudGFuZ2VudE91dC55KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRPdXQueik7XG4gICAgICAgIGggPSBtaXgoaCwgay5yb3RhdGlvbi54KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnJvdGF0aW9uLnkpO1xuICAgICAgICBoID0gbWl4KGgsIGsucm90YXRpb24ueik7XG4gICAgICAgIGggPSBtaXgoaCwgay5yb3RhdGlvbi53KTtcbiAgICAgICAgaCA9IG1peChoLCBrLm1vZGUpO1xuICAgICAgICBoID0gbWl4KGgsIGsudGVuc2lvbik7XG4gICAgfVxuICAgIHJldHVybiBoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRDYWNoZShzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIHN0YW1wID0gZmluZ2VycHJpbnQocykpOiBTcGxpbmVDYWNoZSB7XG4gICAgY29uc3QgY291bnQgPSBjdXJ2ZUNvdW50KHMpO1xuICAgIGNhY2hlLmN1cnZlcy5sZW5ndGggPSBjb3VudDtcbiAgICBjYWNoZS5sZW5ndGhzLmxlbmd0aCA9IGNvdW50O1xuICAgIGNhY2hlLnN0YXJ0cy5sZW5ndGggPSBjb3VudDtcbiAgICBjYWNoZS50YWJsZXMubGVuZ3RoID0gY291bnQ7XG4gICAgY2FjaGUudXBzLmxlbmd0aCA9IGNvdW50O1xuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGMgPSBnZXRDdXJ2ZShzLCBpLCBjYWNoZS5jdXJ2ZXNbaV0gfHwgY3VydmUoKSk7XG4gICAgICAgIGNhY2hlLmN1cnZlc1tpXSA9IGM7XG4gICAgICAgIGNvbnN0IHRhYmxlID0gYnVpbGRMZW5ndGhUYWJsZShjLCBMRU5HVEhfU0FNUExFUywgY2FjaGUudGFibGVzW2ldKTtcbiAgICAgICAgY2FjaGUudGFibGVzW2ldID0gdGFibGU7XG4gICAgICAgIGNhY2hlLnN0YXJ0c1tpXSA9IHRvdGFsO1xuICAgICAgICBjYWNoZS5sZW5ndGhzW2ldID0gdGFibGVbTEVOR1RIX1NBTVBMRVMgLSAxXTtcbiAgICAgICAgdG90YWwgKz0gY2FjaGUubGVuZ3Roc1tpXTtcbiAgICAgICAgY2FjaGUudXBzW2ldID0gbnVsbDsgLy8gYnVpbHQgb24gZGVtYW5kXG4gICAgfVxuICAgIGNhY2hlLnRvdGFsID0gdG90YWw7XG4gICAgY2FjaGUuc3RhbXAgPSBzdGFtcDtcbiAgICByZXR1cm4gY2FjaGU7XG59XG5cbi8qKiBSZWJ1aWxkcyB0aGUgY2FjaGUgd2hlbiB0aGUgc3BsaW5lIGNoYW5nZWQuIFJldHVybnMgdGhlIHVwLXRvLWRhdGUgY2FjaGUuICovXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlQ2FjaGUoczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlKTogU3BsaW5lQ2FjaGUge1xuICAgIGNvbnN0IHN0YW1wID0gZmluZ2VycHJpbnQocyk7XG4gICAgaWYgKHN0YW1wICE9PSBjYWNoZS5zdGFtcCkgYnVpbGRDYWNoZShzLCBjYWNoZSwgc3RhbXApO1xuICAgIHJldHVybiBjYWNoZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXJ2ZVBvaW50IHtcbiAgICAvKiogQ3VydmUgaW5kZXguICovXG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICAvKiogUGFyYW1ldGVyIG9uIHRoYXQgY3VydmUsIDAuLjEuICovXG4gICAgdDogbnVtYmVyO1xufVxuXG4vKiogQ3VydmUgYW5kIGN1cnZlIHBhcmFtZXRlciBhdCBhIG5vcm1hbGl6ZWQgZGlzdGFuY2UgdCAoMC4uMSkgYWxvbmcgdGhlIHdob2xlIHNwbGluZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjdXJ2ZVBvaW50QXQoY2FjaGU6IFNwbGluZUNhY2hlLCB0OiBudW1iZXIsIG91dDogQ3VydmVQb2ludCA9IHsgaW5kZXg6IDAsIHQ6IDAgfSk6IEN1cnZlUG9pbnQge1xuICAgIGNvbnN0IGNvdW50ID0gY2FjaGUuY3VydmVzLmxlbmd0aDtcbiAgICBpZiAoIWNvdW50KSB7XG4gICAgICAgIG91dC5pbmRleCA9IDA7XG4gICAgICAgIG91dC50ID0gMDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgaWYgKGNhY2hlLnRvdGFsIDw9IEVQU0lMT04pIHtcbiAgICAgICAgLy8gRGVnZW5lcmF0ZSAoYWxsIGtub3RzIG9uIG9uZSBwb2ludCk6IGZhbGwgYmFjayB0byB1bmlmb3JtIHBhcmFtZXRlcml6YXRpb24uXG4gICAgICAgIGNvbnN0IHggPSBjbGFtcDAxKHQpICogY291bnQ7XG4gICAgICAgIG91dC5pbmRleCA9IE1hdGgubWluKE1hdGguZmxvb3IoeCksIGNvdW50IC0gMSk7XG4gICAgICAgIG91dC50ID0geCAtIG91dC5pbmRleDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgY29uc3QgZCA9IGNsYW1wMDEodCkgKiBjYWNoZS50b3RhbDtcbiAgICBsZXQgbG8gPSAwO1xuICAgIGxldCBoaSA9IGNvdW50IC0gMTtcbiAgICB3aGlsZSAobG8gPCBoaSkge1xuICAgICAgICBjb25zdCBtaWQgPSAobG8gKyBoaSArIDEpID4+IDE7XG4gICAgICAgIGlmIChjYWNoZS5zdGFydHNbbWlkXSA8PSBkKSBsbyA9IG1pZDtcbiAgICAgICAgZWxzZSBoaSA9IG1pZCAtIDE7XG4gICAgfVxuICAgIG91dC5pbmRleCA9IGxvO1xuICAgIG91dC50ID0gcmVmaW5lVChjYWNoZS5jdXJ2ZXNbbG9dLCBjYWNoZS50YWJsZXNbbG9dLCBkIC0gY2FjaGUuc3RhcnRzW2xvXSk7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuY29uc3QgX2R2ID0gdjMoKTtcblxuLyoqIEV4YWN0IGFyYyBsZW5ndGggZnJvbSAwIHRvIHQ6IHRoZSB0YWJsZSB1cCB0byB0aGUgc2FtcGxlIGJlZm9yZSB0LCBpbnRlZ3JhdGVkIGZyb20gdGhlcmUuICovXG5mdW5jdGlvbiBleGFjdExlbmd0aEF0KGM6IEN1cnZlLCB0YWJsZTogRmxvYXQ2NEFycmF5LCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IG4gPSB0YWJsZS5sZW5ndGg7XG4gICAgaWYgKHQgPD0gMCkgcmV0dXJuIDA7XG4gICAgaWYgKHQgPj0gMSkgcmV0dXJuIHRhYmxlW24gLSAxXTtcbiAgICBjb25zdCBpID0gTWF0aC5taW4oTWF0aC5mbG9vcih0ICogKG4gLSAxKSksIG4gLSAyKTtcbiAgICByZXR1cm4gdGFibGVbaV0gKyBhcmNMZW5ndGgoYywgaSAvIChuIC0gMSksIHQpO1xufVxuXG4vKiogdCBhdCBhcmMgbGVuZ3RoIGQ6IHRhYmxlIGxvb2t1cCwgdGhlbiBOZXd0b24gc3RlcHMgb24gdGhlIGV4YWN0IGxlbmd0aC4gKi9cbmZ1bmN0aW9uIHJlZmluZVQoYzogQ3VydmUsIHRhYmxlOiBGbG9hdDY0QXJyYXksIGQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHQgPSB0QXRMZW5ndGgodGFibGUsIGQpO1xuICAgIGNvbnN0IG4gPSB0YWJsZS5sZW5ndGg7XG4gICAgaWYgKHQgPD0gMCB8fCB0ID49IDEpIHJldHVybiB0O1xuICAgIGNvbnN0IGkgPSBNYXRoLm1pbihNYXRoLmZsb29yKHQgKiAobiAtIDEpKSwgbiAtIDIpO1xuICAgIGNvbnN0IGxvID0gaSAvIChuIC0gMSk7XG4gICAgY29uc3QgaGkgPSAoaSArIDEpIC8gKG4gLSAxKTtcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IDI7IGsrKykge1xuICAgICAgICBjb25zdCBlcnIgPSB0YWJsZVtpXSArIGFyY0xlbmd0aChjLCBsbywgdCkgLSBkO1xuICAgICAgICBjb25zdCBzcGVlZCA9IGxlbihldmFsRGVyaXZhdGl2ZShfZHYsIGMsIHQpKTtcbiAgICAgICAgaWYgKHNwZWVkIDwgRVBTSUxPTikgYnJlYWs7XG4gICAgICAgIHQgPSBNYXRoLm1pbihoaSwgTWF0aC5tYXgobG8sIHQgLSBlcnIgLyBzcGVlZCkpO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn1cblxuLyoqIE5vcm1hbGl6ZWQgZGlzdGFuY2UgKDAuLjEpIG9mIGEgY3VydmUgcG9pbnQuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplZFRPZihjYWNoZTogU3BsaW5lQ2FjaGUsIGluZGV4OiBudW1iZXIsIHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFjYWNoZS5jdXJ2ZXMubGVuZ3RoKSByZXR1cm4gMDtcbiAgICBpZiAoY2FjaGUudG90YWwgPD0gRVBTSUxPTikgcmV0dXJuIChpbmRleCArIHQpIC8gY2FjaGUuY3VydmVzLmxlbmd0aDtcbiAgICByZXR1cm4gKGNhY2hlLnN0YXJ0c1tpbmRleF0gKyBleGFjdExlbmd0aEF0KGNhY2hlLmN1cnZlc1tpbmRleF0sIGNhY2hlLnRhYmxlc1tpbmRleF0sIHQpKSAvIGNhY2hlLnRvdGFsO1xufVxuXG4vKiogS25vdC1pbmRleCB1bml0IChjdXJ2ZSBpbmRleCArIGN1cnZlIHQsIGUuZy4gMi41ID0gaGFsZndheSBiZXR3ZWVuIGtub3RzIDIgYW5kIDMpIHRvIG5vcm1hbGl6ZWQgdC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrbm90VW5pdFRvVChjYWNoZTogU3BsaW5lQ2FjaGUsIGs6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY291bnQgPSBjYWNoZS5jdXJ2ZXMubGVuZ3RoO1xuICAgIGlmICghY291bnQpIHJldHVybiAwO1xuICAgIGNvbnN0IGkgPSBNYXRoLm1pbihNYXRoLm1heChNYXRoLmZsb29yKGspLCAwKSwgY291bnQgLSAxKTtcbiAgICByZXR1cm4gbm9ybWFsaXplZFRPZihjYWNoZSwgaSwgY2xhbXAwMShrIC0gaSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdFRvS25vdFVuaXQoY2FjaGU6IFNwbGluZUNhY2hlLCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHAgPSBjdXJ2ZVBvaW50QXQoY2FjaGUsIHQpO1xuICAgIHJldHVybiBwLmluZGV4ICsgcC50O1xufVxuXG5jb25zdCBfY3A6IEN1cnZlUG9pbnQgPSB7IGluZGV4OiAwLCB0OiAwIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZVBvc2l0aW9uPFQgZXh0ZW5kcyBWMz4oczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCB0OiBudW1iZXIsIG91dDogVCk6IFQge1xuICAgIGlmICghcy5rbm90cy5sZW5ndGgpIHJldHVybiBzZXQob3V0LCAwLCAwLCAwKTtcbiAgICBpZiAocy5rbm90cy5sZW5ndGggPT09IDEgfHwgIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHJldHVybiBjb3B5KG91dCwgcy5rbm90c1swXS5wb3NpdGlvbik7XG4gICAgY3VydmVQb2ludEF0KGNhY2hlLCB0LCBfY3ApO1xuICAgIHJldHVybiBldmFsUG9zaXRpb24ob3V0LCBjYWNoZS5jdXJ2ZXNbX2NwLmluZGV4XSwgX2NwLnQpO1xufVxuXG4vKiogVW5pdCBkaXJlY3Rpb24gb2YgdHJhdmVsIGF0IHQuICovXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVEaXJlY3Rpb248VCBleHRlbmRzIFYzPihzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIHQ6IG51bWJlciwgb3V0OiBUKTogVCB7XG4gICAgaWYgKHMua25vdHMubGVuZ3RoIDwgMiB8fCAhY2FjaGUuY3VydmVzLmxlbmd0aCkge1xuICAgICAgICBpZiAocy5rbm90cy5sZW5ndGggPT09IDEpIHJldHVybiBub3JtYWxpemUob3V0LCB0YW5nZW50T3V0VmVjKG91dCwgcy5rbm90c1swXSkpO1xuICAgICAgICByZXR1cm4gc2V0KG91dCwgMCwgMCwgMSk7XG4gICAgfVxuICAgIGN1cnZlUG9pbnRBdChjYWNoZSwgdCwgX2NwKTtcbiAgICByZXR1cm4gZXZhbERpcmVjdGlvbihvdXQsIGNhY2hlLmN1cnZlc1tfY3AuaW5kZXhdLCBfY3AudCk7XG59XG5cbi8qKiBVbml0IHVwIHZlY3RvciBhdCB0OiBrbm90IHVwIHZlY3RvcnMgY2FycmllZCBhbG9uZyB0aGUgY3VydmUgd2l0aG91dCB0d2lzdGluZy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZVVwPFQgZXh0ZW5kcyBWMz4oczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCB0OiBudW1iZXIsIG91dDogVCk6IFQge1xuICAgIGlmICghcy5rbm90cy5sZW5ndGgpIHJldHVybiBzZXQob3V0LCAwLCAxLCAwKTtcbiAgICBpZiAocy5rbm90cy5sZW5ndGggPT09IDEgfHwgIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHJldHVybiBrbm90VXAob3V0LCBzLmtub3RzWzBdKTtcbiAgICBjdXJ2ZVBvaW50QXQoY2FjaGUsIHQsIF9jcCk7XG4gICAgcmV0dXJuIGN1cnZlVXAocywgY2FjaGUsIF9jcC5pbmRleCwgX2NwLnQsIG91dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJ2ZVVwPFQgZXh0ZW5kcyBWMz4oczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCBpbmRleDogbnVtYmVyLCB0OiBudW1iZXIsIG91dDogVCk6IFQge1xuICAgIGxldCB0YWJsZSA9IGNhY2hlLnVwc1tpbmRleF07XG4gICAgaWYgKCF0YWJsZSkgdGFibGUgPSBjYWNoZS51cHNbaW5kZXhdID0gYnVpbGRVcFRhYmxlKHMsIGNhY2hlLmN1cnZlc1tpbmRleF0sIGluZGV4KTtcbiAgICBjb25zdCB4ID0gY2xhbXAwMSh0KSAqIFVQX1NBTVBMRVM7XG4gICAgY29uc3QgaSA9IE1hdGgubWluKE1hdGguZmxvb3IoeCksIFVQX1NBTVBMRVMgLSAxKTtcbiAgICBjb25zdCBmID0geCAtIGk7XG4gICAgY29uc3QgYSA9IHYzKHRhYmxlW2kgKiAzXSwgdGFibGVbaSAqIDMgKyAxXSwgdGFibGVbaSAqIDMgKyAyXSk7XG4gICAgY29uc3QgYiA9IHYzKHRhYmxlW2kgKiAzICsgM10sIHRhYmxlW2kgKiAzICsgNF0sIHRhYmxlW2kgKiAzICsgNV0pO1xuICAgIGxlcnAob3V0LCBhLCBiLCBmKTtcbiAgICAvLyBLZWVwIGl0IHBlcnBlbmRpY3VsYXIgdG8gdGhlIGRpcmVjdGlvbiBvZiB0cmF2ZWwuXG4gICAgY29uc3QgZGlyID0gZXZhbERpcmVjdGlvbih2MygpLCBjYWNoZS5jdXJ2ZXNbaW5kZXhdLCB0KTtcbiAgICBwcm9qZWN0T25QbGFuZShvdXQsIG91dCwgZGlyKTtcbiAgICBpZiAobGVuU3Eob3V0KSA8IEVQU0lMT04pIHJldHVybiBub3JtYWxpemUob3V0LCBhKTtcbiAgICByZXR1cm4gbm9ybWFsaXplKG91dCwgb3V0KTtcbn1cblxuLyoqXG4gKiBVcCB2ZWN0b3JzIGFsb25nIGEgY3VydmU6IHRoZSBzdGFydCBrbm90J3MgdXAgY2FycmllZCBieSBhIHJvdGF0aW9uXG4gKiBtaW5pbWl6aW5nIGZyYW1lIChkb3VibGUgcmVmbGVjdGlvbiksIHdpdGggdGhlIHR3aXN0IG5lZWRlZCB0byBtZWV0IHRoZSBlbmRcbiAqIGtub3QncyB1cCBzcHJlYWQgZXZlbmx5IG92ZXIgdGhlIGN1cnZlLlxuICovXG5mdW5jdGlvbiBidWlsZFVwVGFibGUoczogU3BsaW5lTGlrZSwgYzogQ3VydmUsIGluZGV4OiBudW1iZXIpOiBGbG9hdDY0QXJyYXkge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBjb25zdCBhID0gcy5rbm90c1tpbmRleF07XG4gICAgY29uc3QgYiA9IHMua25vdHNbKGluZGV4ICsgMSkgJSBuXTtcbiAgICBjb25zdCB0YWJsZSA9IG5ldyBGbG9hdDY0QXJyYXkoKFVQX1NBTVBMRVMgKyAxKSAqIDMpO1xuXG4gICAgY29uc3QgcG9zOiBWM1tdID0gW107XG4gICAgY29uc3QgZGlyczogVjNbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IFVQX1NBTVBMRVM7IGkrKykge1xuICAgICAgICBjb25zdCB0ID0gaSAvIFVQX1NBTVBMRVM7XG4gICAgICAgIHBvcy5wdXNoKGV2YWxQb3NpdGlvbih2MygpLCBjLCB0KSk7XG4gICAgICAgIGRpcnMucHVzaChldmFsRGlyZWN0aW9uKHYzKCksIGMsIHQpKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cHM6IFYzW10gPSBbXTtcbiAgICBsZXQgciA9IG5vcm1hbGl6ZSh2MygpLCBwcm9qZWN0T25QbGFuZSh2MygpLCBrbm90VXAodjMoKSwgYSksIGRpcnNbMF0pKTtcbiAgICBpZiAobGVuU3EocikgPCBFUFNJTE9OKSByID0gYW55UGVycGVuZGljdWxhcih2MygpLCBkaXJzWzBdKTtcbiAgICB1cHMucHVzaChyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IFVQX1NBTVBMRVM7IGkrKykge1xuICAgICAgICAvLyBEb3VibGUgcmVmbGVjdGlvbiAoV2FuZyBldCBhbC4gMjAwOCkuXG4gICAgICAgIGNvbnN0IHYxID0gc3ViKHYzKCksIHBvc1tpICsgMV0sIHBvc1tpXSk7XG4gICAgICAgIGNvbnN0IGMxID0gZG90KHYxLCB2MSk7XG4gICAgICAgIGNvbnN0IHJpID0gdXBzW2ldO1xuICAgICAgICBjb25zdCB0aSA9IGRpcnNbaV07XG4gICAgICAgIGxldCByTCA9IHJpO1xuICAgICAgICBsZXQgdEwgPSB0aTtcbiAgICAgICAgaWYgKGMxID4gRVBTSUxPTiAqIEVQU0lMT04pIHtcbiAgICAgICAgICAgIHJMID0gc2NhbGVBbmRBZGQodjMoKSwgcmksIHYxLCAoLTIgLyBjMSkgKiBkb3QodjEsIHJpKSk7XG4gICAgICAgICAgICB0TCA9IHNjYWxlQW5kQWRkKHYzKCksIHRpLCB2MSwgKC0yIC8gYzEpICogZG90KHYxLCB0aSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHYyID0gc3ViKHYzKCksIGRpcnNbaSArIDFdLCB0TCk7XG4gICAgICAgIGNvbnN0IGMyID0gZG90KHYyLCB2Mik7XG4gICAgICAgIGxldCBuZXh0ID0gckw7XG4gICAgICAgIGlmIChjMiA+IEVQU0lMT04gKiBFUFNJTE9OKSBuZXh0ID0gc2NhbGVBbmRBZGQodjMoKSwgckwsIHYyLCAoLTIgLyBjMikgKiBkb3QodjIsIHJMKSk7XG4gICAgICAgIG5leHQgPSBub3JtYWxpemUodjMoKSwgcHJvamVjdE9uUGxhbmUodjMoKSwgbmV4dCwgZGlyc1tpICsgMV0pKTtcbiAgICAgICAgaWYgKGxlblNxKG5leHQpIDwgRVBTSUxPTikgbmV4dCA9IGNvcHkodjMoKSwgdXBzW2ldKTtcbiAgICAgICAgdXBzLnB1c2gobmV4dCk7XG4gICAgfVxuXG4gICAgLy8gVHdpc3QgdG8gcmVhY2ggdGhlIGVuZCBrbm90J3MgdXAuXG4gICAgY29uc3QgZW5kVXAgPSBub3JtYWxpemUodjMoKSwgcHJvamVjdE9uUGxhbmUodjMoKSwga25vdFVwKHYzKCksIGIpLCBkaXJzW1VQX1NBTVBMRVNdKSk7XG4gICAgbGV0IHR3aXN0ID0gMDtcbiAgICBpZiAobGVuU3EoZW5kVXApID4gRVBTSUxPTikge1xuICAgICAgICBjb25zdCBsYXN0ID0gdXBzW1VQX1NBTVBMRVNdO1xuICAgICAgICBjb25zdCBjID0gY3Jvc3ModjMoKSwgbGFzdCwgZW5kVXApO1xuICAgICAgICB0d2lzdCA9IE1hdGguYXRhbjIoZG90KGMsIGRpcnNbVVBfU0FNUExFU10pLCBkb3QobGFzdCwgZW5kVXApKTtcbiAgICB9XG4gICAgY29uc3QgcSA9IHE0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gVVBfU0FNUExFUzsgaSsrKSB7XG4gICAgICAgIGxldCB1ID0gdXBzW2ldO1xuICAgICAgICBpZiAodHdpc3QgIT09IDApIHtcbiAgICAgICAgICAgIHFGcm9tQXhpc0FuZ2xlKHEsIGRpcnNbaV0sICh0d2lzdCAqIGkpIC8gVVBfU0FNUExFUyk7XG4gICAgICAgICAgICB1ID0gcVJvdGF0ZSh2MygpLCBxLCB1KTtcbiAgICAgICAgfVxuICAgICAgICB0YWJsZVtpICogM10gPSB1Lng7XG4gICAgICAgIHRhYmxlW2kgKiAzICsgMV0gPSB1Lnk7XG4gICAgICAgIHRhYmxlW2kgKiAzICsgMl0gPSB1Lno7XG4gICAgfVxuICAgIHJldHVybiB0YWJsZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOZWFyZXN0UmVzdWx0IHtcbiAgICAvKiogTm9ybWFsaXplZCBkaXN0YW5jZSBhbG9uZyB0aGUgc3BsaW5lICgwLi4xKS4gKi9cbiAgICB0OiBudW1iZXI7XG4gICAgY3VydmU6IG51bWJlcjtcbiAgICBjdXJ2ZVQ6IG51bWJlcjtcbiAgICBwb3NpdGlvbjogVjM7XG4gICAgZGlzdGFuY2U6IG51bWJlcjtcbn1cblxuLyoqIENsb3Nlc3QgcG9pbnQgb24gdGhlIHNwbGluZSB0byBgcGAgKHNwbGluZSBzcGFjZSkuICovXG5leHBvcnQgZnVuY3Rpb24gbmVhcmVzdFBvaW50KHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSwgcDogVjMpOiBOZWFyZXN0UmVzdWx0IHtcbiAgICBjb25zdCByZXM6IE5lYXJlc3RSZXN1bHQgPSB7IHQ6IDAsIGN1cnZlOiAwLCBjdXJ2ZVQ6IDAsIHBvc2l0aW9uOiB2MygpLCBkaXN0YW5jZTogSW5maW5pdHkgfTtcbiAgICBpZiAoIXMua25vdHMubGVuZ3RoKSByZXR1cm4gcmVzO1xuICAgIGlmICghY2FjaGUuY3VydmVzLmxlbmd0aCkge1xuICAgICAgICBjb3B5KHJlcy5wb3NpdGlvbiwgcy5rbm90c1swXS5wb3NpdGlvbik7XG4gICAgICAgIHJlcy5kaXN0YW5jZSA9IGRpc3QocCwgcmVzLnBvc2l0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgbGV0IGJlc3QgPSBJbmZpbml0eTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhY2hlLmN1cnZlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCByID0gbmVhcmVzdFQoY2FjaGUuY3VydmVzW2ldLCBwLCAxNiwgMTApO1xuICAgICAgICBpZiAoci5kaXN0U3EgPCBiZXN0KSB7XG4gICAgICAgICAgICBiZXN0ID0gci5kaXN0U3E7XG4gICAgICAgICAgICByZXMuY3VydmUgPSBpO1xuICAgICAgICAgICAgcmVzLmN1cnZlVCA9IHIudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBldmFsUG9zaXRpb24ocmVzLnBvc2l0aW9uLCBjYWNoZS5jdXJ2ZXNbcmVzLmN1cnZlXSwgcmVzLmN1cnZlVCk7XG4gICAgcmVzLmRpc3RhbmNlID0gTWF0aC5zcXJ0KGJlc3QpO1xuICAgIHJlcy50ID0gbm9ybWFsaXplZFRPZihjYWNoZSwgcmVzLmN1cnZlLCByZXMuY3VydmVUKTtcbiAgICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIE1vdmVzIGBkaXN0YW5jZWAgYWxvbmcgdGhlIHNwbGluZSBmcm9tIG5vcm1hbGl6ZWQgYGZyb21UYCAobmVnYXRpdmUgZ29lc1xuICogYmFjaykuIFJldHVybnMgdGhlIHJlc3VsdGluZyBub3JtYWxpemVkIHQgKGNsYW1wZWQgb24gb3BlbiBzcGxpbmVzLFxuICogd3JhcHBlZCBvbiBjbG9zZWQgb25lcykuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0QXREaXN0YW5jZUZyb20oczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCBmcm9tVDogbnVtYmVyLCBkaXN0YW5jZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoY2FjaGUudG90YWwgPD0gRVBTSUxPTikgcmV0dXJuIGNsYW1wMDEoZnJvbVQpO1xuICAgIGNvbnN0IHQgPSBmcm9tVCArIGRpc3RhbmNlIC8gY2FjaGUudG90YWw7XG4gICAgcmV0dXJuIHMuY2xvc2VkID8gd3JhcCh0LCAxKSA6IGNsYW1wMDEodCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBlZGl0IG9wc1xuXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0S25vdChzOiBTcGxpbmVMaWtlLCBpbmRleDogbnVtYmVyLCBrOiBLbm90TGlrZSk6IHZvaWQge1xuICAgIHMua25vdHMuc3BsaWNlKGluZGV4LCAwLCBrKTtcbiAgICByZWZyZXNoQXJvdW5kKHMsIGluZGV4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUtub3QoczogU3BsaW5lTGlrZSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHMua25vdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgaWYgKCFuKSByZXR1cm47XG4gICAgY29uc3QgbmV4dCA9IE1hdGgubWluKGluZGV4LCBuIC0gMSk7XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBwcmV2SW5kZXgobmV4dCwgbiwgcy5jbG9zZWQpKTtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIG5leHQpO1xufVxuXG4vKipcbiAqIEluc2VydHMgYSBrbm90IG9uIGN1cnZlIGBjdXJ2ZUluZGV4YCBhdCBwYXJhbWV0ZXIgdCB3aXRob3V0IGNoYW5naW5nIHRoZVxuICogc2hhcGUgKGRlIENhc3RlbGphdSBzcGxpdCkuIFJldHVybnMgdGhlIG5ldyBrbm90J3MgaW5kZXguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRPbkN1cnZlKHM6IFNwbGluZUxpa2UsIGN1cnZlSW5kZXg6IG51bWJlciwgdDogbnVtYmVyLCBmYWN0b3J5OiBGYWN0b3J5KTogbnVtYmVyIHtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgY29uc3QgaWEgPSBjdXJ2ZUluZGV4O1xuICAgIGNvbnN0IGliID0gKGN1cnZlSW5kZXggKyAxKSAlIG47XG4gICAgY29uc3QgYSA9IHMua25vdHNbaWFdO1xuICAgIGNvbnN0IGIgPSBzLmtub3RzW2liXTtcbiAgICBjb25zdCBjID0gZ2V0Q3VydmUocywgY3VydmVJbmRleCk7XG4gICAgY29uc3QgbGVmdCA9IGN1cnZlKCk7XG4gICAgY29uc3QgcmlnaHQgPSBjdXJ2ZSgpO1xuICAgIHNwbGl0KGMsIHQsIGxlZnQsIHJpZ2h0KTtcblxuICAgIGNvbnN0IGsgPSBmYWN0b3J5Lmtub3QoKTtcbiAgICBjb3B5KGsucG9zaXRpb24sIGxlZnQucDMpO1xuICAgIGsudGVuc2lvbiA9IERFRkFVTFRfVEVOU0lPTjtcblxuICAgIGNvbnN0IGJvdGhBdXRvID0gYS5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoICYmIGIubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aDtcbiAgICBjb25zdCBib3RoTGluZWFyID0gYS5tb2RlID09PSBUYW5nZW50TW9kZS5MaW5lYXIgJiYgYi5tb2RlID09PSBUYW5nZW50TW9kZS5MaW5lYXI7XG5cbiAgICAvLyBUaGUgbmV3IGtub3QncyB1cCBibGVuZHMgYmV0d2VlbiBpdHMgbmVpZ2hib3JzJy5cbiAgICBjb25zdCB1cCA9IGtub3RVcCh2MygpLCBhKTtcbiAgICBjb25zdCB1cEIgPSBrbm90VXAodjMoKSwgYik7XG4gICAgbGVycCh1cCwgdXAsIHVwQiwgdCk7XG4gICAgY29uc3Qgb3V0RGlyID0gc3ViKHYzKCksIHJpZ2h0LnAxLCByaWdodC5wMCk7XG4gICAga25vdFJvdGF0aW9uKGsucm90YXRpb24sIGxlblNxKG91dERpcikgPiBFUFNJTE9OID8gb3V0RGlyIDogc3ViKHYzKCksIHJpZ2h0LnAwLCBsZWZ0LnAyKSwgdXApO1xuXG4gICAgaWYgKGJvdGhBdXRvKSB7XG4gICAgICAgIGsubW9kZSA9IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGg7XG4gICAgfSBlbHNlIGlmIChib3RoTGluZWFyKSB7XG4gICAgICAgIGsubW9kZSA9IFRhbmdlbnRNb2RlLkxpbmVhcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBLZWVwIHRoZSBleGFjdCBzaGFwZTogc2hvcnRlbiB0aGUgbmVpZ2hib3JzJyBoYW5kbGVzLCB0aGUgbmV3IGtub3QgZ2V0cyB0aGUgc3BsaXQgaGFuZGxlcy5cbiAgICAgICAgaWYgKGEubW9kZSA9PT0gVGFuZ2VudE1vZGUuTWlycm9yZWQpIGEubW9kZSA9IFRhbmdlbnRNb2RlLkNvbnRpbnVvdXM7XG4gICAgICAgIGlmIChiLm1vZGUgPT09IFRhbmdlbnRNb2RlLk1pcnJvcmVkKSBiLm1vZGUgPSBUYW5nZW50TW9kZS5Db250aW51b3VzO1xuICAgICAgICBpZiAodGFuZ2VudHNFZGl0YWJsZShhLm1vZGUpKSB7XG4gICAgICAgICAgICBxUm90YXRlKGEudGFuZ2VudE91dCwgcUludmVydChxNCgpLCBhLnJvdGF0aW9uKSwgc3ViKHYzKCksIGxlZnQucDEsIGxlZnQucDApKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFuZ2VudHNFZGl0YWJsZShiLm1vZGUpKSB7XG4gICAgICAgICAgICBxUm90YXRlKGIudGFuZ2VudEluLCBxSW52ZXJ0KHE0KCksIGIucm90YXRpb24pLCBzdWIodjMoKSwgcmlnaHQucDIsIHJpZ2h0LnAzKSk7XG4gICAgICAgIH1cbiAgICAgICAgay5tb2RlID0gVGFuZ2VudE1vZGUuQ29udGludW91cztcbiAgICAgICAgY29uc3QgaW52ID0gcUludmVydChxNCgpLCBrLnJvdGF0aW9uKTtcbiAgICAgICAgcVJvdGF0ZShrLnRhbmdlbnRJbiwgaW52LCBzdWIodjMoKSwgbGVmdC5wMiwgbGVmdC5wMykpO1xuICAgICAgICBxUm90YXRlKGsudGFuZ2VudE91dCwgaW52LCBzdWIodjMoKSwgcmlnaHQucDEsIHJpZ2h0LnAwKSk7XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gaWEgKyAxO1xuICAgIHMua25vdHMuc3BsaWNlKGluZGV4LCAwLCBrKTtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIGluZGV4KTtcbiAgICBjb25zdCBtID0gcy5rbm90cy5sZW5ndGg7XG4gICAgY29uc3QgcCA9IHByZXZJbmRleChpbmRleCwgbSwgcy5jbG9zZWQpO1xuICAgIGNvbnN0IHEgPSBuZXh0SW5kZXgoaW5kZXgsIG0sIHMuY2xvc2VkKTtcbiAgICBpZiAocy5rbm90c1twXS5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoKSBhcHBseVRhbmdlbnRNb2RlKHMsIHApO1xuICAgIGlmIChzLmtub3RzW3FdLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpIGFwcGx5VGFuZ2VudE1vZGUocywgcSk7XG4gICAgcmV0dXJuIGluZGV4O1xufVxuXG5jb25zdCBZMTgwID0gcTQoMCwgMSwgMCwgMCk7XG5cbi8qKiBSZXZlcnNlcyB0aGUgZGlyZWN0aW9uIG9mIHRyYXZlbDsgdGhlIHNoYXBlIHN0YXlzIHRoZSBzYW1lLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VGbG93KHM6IFNwbGluZUxpa2UpOiB2b2lkIHtcbiAgICBzLmtub3RzLnJldmVyc2UoKTtcbiAgICBmb3IgKGNvbnN0IGsgb2Ygcy5rbm90cykge1xuICAgICAgICAvLyBUdXJuIHRoZSBrbm90IGFyb3VuZCBpdHMgdXAgYXhpczsgaW4gYW5kIG91dCBzd2FwIHBsYWNlcy5cbiAgICAgICAgY29uc3Qgb2xkSW4gPSBxUm90YXRlKHYzKCksIFkxODAsIGsudGFuZ2VudEluKTtcbiAgICAgICAgY29uc3Qgb2xkT3V0ID0gcVJvdGF0ZSh2MygpLCBZMTgwLCBrLnRhbmdlbnRPdXQpO1xuICAgICAgICBjb3B5KGsudGFuZ2VudEluLCBvbGRPdXQpO1xuICAgICAgICBjb3B5KGsudGFuZ2VudE91dCwgb2xkSW4pO1xuICAgICAgICBxTXVsKGsucm90YXRpb24sIGsucm90YXRpb24sIFkxODApO1xuICAgIH1cbiAgICByZWZyZXNoQWxsKHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q2xvc2VkKHM6IFNwbGluZUxpa2UsIGNsb3NlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHMuY2xvc2VkID0gY2xvc2VkO1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBpZiAoIW4pIHJldHVybjtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIDApO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgbiAtIDEpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNvbnRhaW5lciBvcHNcblxuZXhwb3J0IGludGVyZmFjZSBLbm90UmVmIHtcbiAgICBzcGxpbmU6IG51bWJlcjtcbiAgICBrbm90OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYW1lUmVmKGE6IEtub3RSZWYsIGI6IEtub3RSZWYpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYS5zcGxpbmUgPT09IGIuc3BsaW5lICYmIGEua25vdCA9PT0gYi5rbm90O1xufVxuXG5mdW5jdGlvbiBncm91cE9mKGM6IENvbnRhaW5lckxpa2UsIHI6IEtub3RSZWYpOiBMaW5rTGlrZSB8IG51bGwge1xuICAgIGZvciAoY29uc3QgZyBvZiBjLmxpbmtzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpICsgMSA8IGcua25vdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgIGlmIChnLmtub3RzW2ldID09PSByLnNwbGluZSAmJiBnLmtub3RzW2kgKyAxXSA9PT0gci5rbm90KSByZXR1cm4gZztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLyoqIEtub3RzIGxpbmtlZCB0byBgcmAgKGV4Y2x1ZGluZyByIGl0c2VsZikuICovXG5leHBvcnQgZnVuY3Rpb24gbGlua2VkS25vdHMoYzogQ29udGFpbmVyTGlrZSwgcjogS25vdFJlZik6IEtub3RSZWZbXSB7XG4gICAgY29uc3QgZyA9IGdyb3VwT2YoYywgcik7XG4gICAgaWYgKCFnKSByZXR1cm4gW107XG4gICAgY29uc3QgcmVzOiBLbm90UmVmW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBnLmtub3RzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGNvbnN0IG8gPSB7IHNwbGluZTogZy5rbm90c1tpXSwga25vdDogZy5rbm90c1tpICsgMV0gfTtcbiAgICAgICAgaWYgKCFzYW1lUmVmKG8sIHIpKSByZXMucHVzaChvKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlua2VkKGM6IENvbnRhaW5lckxpa2UsIHI6IEtub3RSZWYpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFncm91cE9mKGMsIHIpO1xufVxuXG4vKiogTGlua3MgYWxsIGdpdmVuIGtub3RzIHRvZ2V0aGVyIChtZXJnaW5nIHRoZWlyIGV4aXN0aW5nIGdyb3VwcykuICovXG5leHBvcnQgZnVuY3Rpb24gbGlua0tub3RzKGM6IENvbnRhaW5lckxpa2UsIHJlZnM6IEtub3RSZWZbXSwgZmFjdG9yeTogRmFjdG9yeSk6IHZvaWQge1xuICAgIGlmIChyZWZzLmxlbmd0aCA8IDIpIHJldHVybjtcbiAgICBjb25zdCBtZW1iZXJzOiBLbm90UmVmW10gPSBbXTtcbiAgICBjb25zdCBhZGQgPSAocjogS25vdFJlZikgPT4ge1xuICAgICAgICBpZiAoIW1lbWJlcnMuc29tZSgobSkgPT4gc2FtZVJlZihtLCByKSkpIG1lbWJlcnMucHVzaChyKTtcbiAgICB9O1xuICAgIGZvciAoY29uc3QgciBvZiByZWZzKSB7XG4gICAgICAgIGNvbnN0IGcgPSBncm91cE9mKGMsIHIpO1xuICAgICAgICBpZiAoZykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgZy5rbm90cy5sZW5ndGg7IGkgKz0gMikgYWRkKHsgc3BsaW5lOiBnLmtub3RzW2ldLCBrbm90OiBnLmtub3RzW2kgKyAxXSB9KTtcbiAgICAgICAgICAgIGMubGlua3Muc3BsaWNlKGMubGlua3MuaW5kZXhPZihnKSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkKHIpO1xuICAgIH1cbiAgICBjb25zdCBnID0gZmFjdG9yeS5saW5rKCk7XG4gICAgZy5rbm90cy5sZW5ndGggPSAwO1xuICAgIGZvciAoY29uc3QgbSBvZiBtZW1iZXJzKSBnLmtub3RzLnB1c2gobS5zcGxpbmUsIG0ua25vdCk7XG4gICAgYy5saW5rcy5wdXNoKGcpO1xuICAgIC8vIExpbmtlZCBrbm90cyBzaGFyZSB0aGUgZmlyc3Qga25vdCdzIHBvc2l0aW9uLlxuICAgIGNvbnN0IHAgPSBjLnNwbGluZXNbcmVmc1swXS5zcGxpbmVdLmtub3RzW3JlZnNbMF0ua25vdF0ucG9zaXRpb247XG4gICAgZm9yIChjb25zdCBtIG9mIG1lbWJlcnMpIHtcbiAgICAgICAgaWYgKHNhbWVSZWYobSwgcmVmc1swXSkpIGNvbnRpbnVlO1xuICAgICAgICBzZXRLbm90UG9zaXRpb24oYy5zcGxpbmVzW20uc3BsaW5lXSwgbS5rbm90LCBwKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmxpbmtLbm90cyhjOiBDb250YWluZXJMaWtlLCByZWZzOiBLbm90UmVmW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHIgb2YgcmVmcykge1xuICAgICAgICBjb25zdCBnID0gZ3JvdXBPZihjLCByKTtcbiAgICAgICAgaWYgKCFnKSBjb250aW51ZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgZy5rbm90cy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgaWYgKGcua25vdHNbaV0gPT09IHIuc3BsaW5lICYmIGcua25vdHNbaSArIDFdID09PSByLmtub3QpIHtcbiAgICAgICAgICAgICAgICBnLmtub3RzLnNwbGljZShpLCAyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZy5rbm90cy5sZW5ndGggPCA0KSBjLmxpbmtzLnNwbGljZShjLmxpbmtzLmluZGV4T2YoZyksIDEpO1xuICAgIH1cbn1cblxuLyoqIE1vdmVzIGV2ZXJ5IGtub3QgbGlua2VkIHRvIGByYCBvbnRvIHIncyBwb3NpdGlvbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzeW5jTGlua2VkKGM6IENvbnRhaW5lckxpa2UsIHI6IEtub3RSZWYpOiB2b2lkIHtcbiAgICBjb25zdCBwID0gYy5zcGxpbmVzW3Iuc3BsaW5lXS5rbm90c1tyLmtub3RdLnBvc2l0aW9uO1xuICAgIGZvciAoY29uc3QgbyBvZiBsaW5rZWRLbm90cyhjLCByKSkge1xuICAgICAgICBjb25zdCBzID0gYy5zcGxpbmVzW28uc3BsaW5lXTtcbiAgICAgICAgaWYgKCFzIHx8ICFzLmtub3RzW28ua25vdF0pIGNvbnRpbnVlO1xuICAgICAgICBzZXRLbm90UG9zaXRpb24ocywgby5rbm90LCBwKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJld3JpdGVMaW5rcyhjOiBDb250YWluZXJMaWtlLCBtYXA6IChyOiBLbm90UmVmKSA9PiBLbm90UmVmIHwgbnVsbCk6IHZvaWQge1xuICAgIGZvciAobGV0IGdpID0gYy5saW5rcy5sZW5ndGggLSAxOyBnaSA+PSAwOyBnaS0tKSB7XG4gICAgICAgIGNvbnN0IGcgPSBjLmxpbmtzW2dpXTtcbiAgICAgICAgY29uc3QgbmV4dDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgZy5rbm90cy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgY29uc3QgciA9IG1hcCh7IHNwbGluZTogZy5rbm90c1tpXSwga25vdDogZy5rbm90c1tpICsgMV0gfSk7XG4gICAgICAgICAgICBpZiAociAmJiAhbmV4dC5zb21lKChfLCBqKSA9PiBqICUgMiA9PT0gMCAmJiBuZXh0W2pdID09PSByLnNwbGluZSAmJiBuZXh0W2ogKyAxXSA9PT0gci5rbm90KSkgbmV4dC5wdXNoKHIuc3BsaW5lLCByLmtub3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0Lmxlbmd0aCA8IDQpIGMubGlua3Muc3BsaWNlKGdpLCAxKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBnLmtub3RzLnB1c2goLi4ubmV4dCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKiBVcGRhdGVzIGxpbmtzIGFmdGVyIGEga25vdCB3YXMgaW5zZXJ0ZWQgYXQgKHNwbGluZSwga25vdCkuICovXG5leHBvcnQgZnVuY3Rpb24gbGlua3NPbktub3RJbnNlcnRlZChjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlciwga25vdDogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV3cml0ZUxpbmtzKGMsIChyKSA9PiAoci5zcGxpbmUgPT09IHNwbGluZSAmJiByLmtub3QgPj0ga25vdCA/IHsgc3BsaW5lLCBrbm90OiByLmtub3QgKyAxIH0gOiByKSk7XG59XG5cbi8qKiBVcGRhdGVzIGxpbmtzIGFmdGVyIHRoZSBrbm90IGF0IChzcGxpbmUsIGtub3QpIHdhcyByZW1vdmVkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbmtzT25Lbm90UmVtb3ZlZChjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlciwga25vdDogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV3cml0ZUxpbmtzKGMsIChyKSA9PiB7XG4gICAgICAgIGlmIChyLnNwbGluZSAhPT0gc3BsaW5lKSByZXR1cm4gcjtcbiAgICAgICAgaWYgKHIua25vdCA9PT0ga25vdCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiByLmtub3QgPiBrbm90ID8geyBzcGxpbmUsIGtub3Q6IHIua25vdCAtIDEgfSA6IHI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5rc09uU3BsaW5lUmVtb3ZlZChjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlcik6IHZvaWQge1xuICAgIHJld3JpdGVMaW5rcyhjLCAocikgPT4ge1xuICAgICAgICBpZiAoci5zcGxpbmUgPT09IHNwbGluZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiByLnNwbGluZSA+IHNwbGluZSA/IHsgc3BsaW5lOiByLnNwbGluZSAtIDEsIGtub3Q6IHIua25vdCB9IDogcjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmtzT25SZXZlcnNlZChjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlciwgY291bnQ6IG51bWJlcik6IHZvaWQge1xuICAgIHJld3JpdGVMaW5rcyhjLCAocikgPT4gKHIuc3BsaW5lID09PSBzcGxpbmUgPyB7IHNwbGluZSwga25vdDogY291bnQgLSAxIC0gci5rbm90IH0gOiByKSk7XG59XG5cbi8qKiBDb250YWluZXItbGV2ZWwgaW5zZXJ0IHRoYXQga2VlcHMgbGlua3MgdmFsaWQuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVySW5zZXJ0S25vdChjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlciwgaW5kZXg6IG51bWJlciwgazogS25vdExpa2UpOiB2b2lkIHtcbiAgICBsaW5rc09uS25vdEluc2VydGVkKGMsIHNwbGluZSwgaW5kZXgpO1xuICAgIGluc2VydEtub3QoYy5zcGxpbmVzW3NwbGluZV0sIGluZGV4LCBrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5lckluc2VydE9uQ3VydmUoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIsIGN1cnZlSW5kZXg6IG51bWJlciwgdDogbnVtYmVyLCBmYWN0b3J5OiBGYWN0b3J5KTogbnVtYmVyIHtcbiAgICBjb25zdCBzID0gYy5zcGxpbmVzW3NwbGluZV07XG4gICAgY29uc3QgaW5kZXggPSBjdXJ2ZUluZGV4ICsgMTtcbiAgICBsaW5rc09uS25vdEluc2VydGVkKGMsIHNwbGluZSwgaW5kZXgpO1xuICAgIHJldHVybiBpbnNlcnRPbkN1cnZlKHMsIGN1cnZlSW5kZXgsIHQsIGZhY3RvcnkpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMga25vdHMgKHJlZnMgbWF5IHNwYW4gc3BsaW5lcykuIFNwbGluZXMgbGVmdCBlbXB0eSBhcmUgcmVtb3ZlZCxcbiAqIGV4Y2VwdCB0aGUgY29udGFpbmVyIGtlZXBzIGF0IGxlYXN0IG9uZSBzcGxpbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluZXJSZW1vdmVLbm90cyhjOiBDb250YWluZXJMaWtlLCByZWZzOiBLbm90UmVmW10pOiB2b2lkIHtcbiAgICBjb25zdCBzb3J0ZWQgPSBbLi4ucmVmc10uc29ydCgoYSwgYikgPT4gKGEuc3BsaW5lIC0gYi5zcGxpbmUpIHx8IChiLmtub3QgLSBhLmtub3QpKTtcbiAgICBmb3IgKGNvbnN0IHIgb2Ygc29ydGVkKSB7XG4gICAgICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbci5zcGxpbmVdO1xuICAgICAgICBpZiAoIXMgfHwgci5rbm90ID49IHMua25vdHMubGVuZ3RoKSBjb250aW51ZTtcbiAgICAgICAgcmVtb3ZlS25vdChzLCByLmtub3QpO1xuICAgICAgICBsaW5rc09uS25vdFJlbW92ZWQoYywgci5zcGxpbmUsIHIua25vdCk7XG4gICAgICAgIGlmIChzLmtub3RzLmxlbmd0aCA8IDMgJiYgcy5jbG9zZWQpIHMuY2xvc2VkID0gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSBjLnNwbGluZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGMuc3BsaW5lc1tpXS5rbm90cy5sZW5ndGggPT09IDAgJiYgYy5zcGxpbmVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGMuc3BsaW5lcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBsaW5rc09uU3BsaW5lUmVtb3ZlZChjLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5lclJldmVyc2UoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBzID0gYy5zcGxpbmVzW3NwbGluZV07XG4gICAgbGlua3NPblJldmVyc2VkKGMsIHNwbGluZSwgcy5rbm90cy5sZW5ndGgpO1xuICAgIHJldmVyc2VGbG93KHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVyUmVtb3ZlU3BsaW5lKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyKTogdm9pZCB7XG4gICAgYy5zcGxpbmVzLnNwbGljZShzcGxpbmUsIDEpO1xuICAgIGxpbmtzT25TcGxpbmVSZW1vdmVkKGMsIHNwbGluZSk7XG59XG5cbmZ1bmN0aW9uIGNsb25lS25vdChrOiBLbm90TGlrZSwgZmFjdG9yeTogRmFjdG9yeSk6IEtub3RMaWtlIHtcbiAgICByZXR1cm4gY29weUtub3QoZmFjdG9yeS5rbm90KCksIGspO1xufVxuXG4vKipcbiAqIFNwbGl0cyBhIHNwbGluZSBhdCBhIGtub3QgKFVuaXR5J3MgU3BsaXQgS25vdCk6IGFuIG9wZW4gc3BsaW5lIGJlY29tZXMgdHdvXG4gKiBzcGxpbmVzIHNoYXJpbmcgYSBjb3B5IG9mIHRoZSBrbm90LCBhIGNsb3NlZCBzcGxpbmUgb3BlbnMgYXQgdGhlIGtub3QuXG4gKiBUaGUgdHdvIGNvcGllcyBhcmUgbGlua2VkLiBSZXR1cm5zIHRoZSBuZXcgY29weSdzIHJlZiwgb3IgbnVsbCBpZiB0aGUga25vdFxuICogaXMgYW4gZW5kIG9mIGFuIG9wZW4gc3BsaW5lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRLbm90KGM6IENvbnRhaW5lckxpa2UsIHI6IEtub3RSZWYsIGZhY3Rvcnk6IEZhY3RvcnkpOiBLbm90UmVmIHwgbnVsbCB7XG4gICAgY29uc3QgcyA9IGMuc3BsaW5lc1tyLnNwbGluZV07XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmIChzLmNsb3NlZCkge1xuICAgICAgICAvLyBSb3RhdGUgc28gdGhlIGtub3QgaXMgZmlyc3QsIHRoZW4gZHVwbGljYXRlIGl0IGF0IHRoZSBlbmQuXG4gICAgICAgIGNvbnN0IG9yZGVyOiBLbm90TGlrZVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSBvcmRlci5wdXNoKHMua25vdHNbKHIua25vdCArIGkpICUgbl0pO1xuICAgICAgICByZXdyaXRlTGlua3MoYywgKG8pID0+IChvLnNwbGluZSA9PT0gci5zcGxpbmUgPyB7IHNwbGluZTogby5zcGxpbmUsIGtub3Q6IHdyYXAoby5rbm90IC0gci5rbm90LCBuKSB9IDogbykpO1xuICAgICAgICBzLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgICAgIHMua25vdHMucHVzaCguLi5vcmRlciwgY2xvbmVLbm90KG9yZGVyWzBdLCBmYWN0b3J5KSk7XG4gICAgICAgIHMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHJlZnJlc2hBbGwocyk7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0geyBzcGxpbmU6IHIuc3BsaW5lLCBrbm90OiAwIH07XG4gICAgICAgIGNvbnN0IGxhc3QgPSB7IHNwbGluZTogci5zcGxpbmUsIGtub3Q6IG4gfTtcbiAgICAgICAgbGlua0tub3RzKGMsIFtmaXJzdCwgbGFzdF0sIGZhY3RvcnkpO1xuICAgICAgICByZXR1cm4gbGFzdDtcbiAgICB9XG4gICAgaWYgKHIua25vdCA8PSAwIHx8IHIua25vdCA+PSBuIC0gMSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgdGFpbCA9IGZhY3Rvcnkuc3BsaW5lKCk7XG4gICAgdGFpbC5jbG9zZWQgPSBmYWxzZTtcbiAgICB0YWlsLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgdGFpbC5rbm90cy5wdXNoKGNsb25lS25vdChzLmtub3RzW3Iua25vdF0sIGZhY3RvcnkpLCAuLi5zLmtub3RzLnNsaWNlKHIua25vdCArIDEpKTtcbiAgICBjb25zdCBuZXdTcGxpbmUgPSBjLnNwbGluZXMubGVuZ3RoO1xuICAgIC8vIExpbmtzIG9uIGtub3RzIHRoYXQgbW92ZWQgdG8gdGhlIHRhaWwgZm9sbG93IHRoZW0uXG4gICAgcmV3cml0ZUxpbmtzKGMsIChvKSA9PiAoby5zcGxpbmUgPT09IHIuc3BsaW5lICYmIG8ua25vdCA+IHIua25vdCA/IHsgc3BsaW5lOiBuZXdTcGxpbmUsIGtub3Q6IG8ua25vdCAtIHIua25vdCB9IDogbykpO1xuICAgIHMua25vdHMubGVuZ3RoID0gci5rbm90ICsgMTtcbiAgICBjLnNwbGluZXMucHVzaCh0YWlsKTtcbiAgICByZWZyZXNoQWxsKHMpO1xuICAgIHJlZnJlc2hBbGwodGFpbCk7XG4gICAgY29uc3QgY29weVJlZiA9IHsgc3BsaW5lOiBuZXdTcGxpbmUsIGtub3Q6IDAgfTtcbiAgICBsaW5rS25vdHMoYywgW3IsIGNvcHlSZWZdLCBmYWN0b3J5KTtcbiAgICByZXR1cm4gY29weVJlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW5kS25vdChzOiBTcGxpbmVMaWtlLCBrbm90OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXMuY2xvc2VkICYmIHMua25vdHMubGVuZ3RoID4gMCAmJiAoa25vdCA9PT0gMCB8fCBrbm90ID09PSBzLmtub3RzLmxlbmd0aCAtIDEpO1xufVxuXG4vKipcbiAqIEpvaW5zIHR3byBlbmQga25vdHMgKFVuaXR5J3MgSm9pbiBLbm90cykuIEVuZHMgb2YgdGhlIHNhbWUgc3BsaW5lIGNsb3NlIGl0O1xuICogZW5kcyBvZiBkaWZmZXJlbnQgc3BsaW5lcyBtZXJnZSB0aGUgc2Vjb25kIHNwbGluZSBpbnRvIHRoZSBmaXJzdCwgdGhlXG4gKiBqb2luZWQga25vdCB0YWtpbmcgYGFgJ3MgcG9zaXRpb24uIFJldHVybnMgdGhlIGpvaW5lZCBrbm90LCBvciBudWxsIGlmIHRoZVxuICoga25vdHMgY2FuJ3QgYmUgam9pbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gam9pbktub3RzKGM6IENvbnRhaW5lckxpa2UsIGE6IEtub3RSZWYsIGI6IEtub3RSZWYsIGZhY3Rvcnk6IEZhY3RvcnkpOiBLbm90UmVmIHwgbnVsbCB7XG4gICAgY29uc3Qgc2EgPSBjLnNwbGluZXNbYS5zcGxpbmVdO1xuICAgIGNvbnN0IHNiID0gYy5zcGxpbmVzW2Iuc3BsaW5lXTtcbiAgICBpZiAoIXNhIHx8ICFzYiB8fCAhaXNFbmRLbm90KHNhLCBhLmtub3QpIHx8ICFpc0VuZEtub3Qoc2IsIGIua25vdCkpIHJldHVybiBudWxsO1xuICAgIGlmIChhLnNwbGluZSA9PT0gYi5zcGxpbmUpIHtcbiAgICAgICAgaWYgKGEua25vdCA9PT0gYi5rbm90IHx8IHNhLmtub3RzLmxlbmd0aCA8IDMpIHJldHVybiBudWxsO1xuICAgICAgICAvLyBEcm9wIHRoZSBkdXBsaWNhdGUgZW5kIGlmIGJvdGggZW5kcyBzaXQgb24gdGhlIHNhbWUgcG9pbnQuXG4gICAgICAgIGNvbnN0IGZpcnN0ID0gc2Eua25vdHNbMF07XG4gICAgICAgIGNvbnN0IGxhc3QgPSBzYS5rbm90c1tzYS5rbm90cy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGRpc3RTcShmaXJzdC5wb3NpdGlvbiwgbGFzdC5wb3NpdGlvbikgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICBjb3B5KGZpcnN0LnRhbmdlbnRJbiwgbGFzdC50YW5nZW50SW4pO1xuICAgICAgICAgICAgbGlua3NPbktub3RSZW1vdmVkKGMsIGEuc3BsaW5lLCBzYS5rbm90cy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHNhLmtub3RzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHNldENsb3NlZChzYSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB7IHNwbGluZTogYS5zcGxpbmUsIGtub3Q6IGEua25vdCA9PT0gMCA/IDAgOiBNYXRoLm1pbihhLmtub3QsIHNhLmtub3RzLmxlbmd0aCAtIDEpIH07XG4gICAgfVxuICAgIC8vIE9yaWVudCBib3RoIHNvIHRoYXQgYSBpcyB0aGUgbGFzdCBrbm90IG9mIEEgYW5kIGIgdGhlIGZpcnN0IGtub3Qgb2YgQi5cbiAgICBpZiAoYS5rbm90ID09PSAwKSB7XG4gICAgICAgIGNvbnRhaW5lclJldmVyc2UoYywgYS5zcGxpbmUpO1xuICAgICAgICBhID0geyBzcGxpbmU6IGEuc3BsaW5lLCBrbm90OiBzYS5rbm90cy5sZW5ndGggLSAxIH07XG4gICAgfVxuICAgIGlmIChiLmtub3QgIT09IDApIHtcbiAgICAgICAgY29udGFpbmVyUmV2ZXJzZShjLCBiLnNwbGluZSk7XG4gICAgICAgIGIgPSB7IHNwbGluZTogYi5zcGxpbmUsIGtub3Q6IDAgfTtcbiAgICB9XG4gICAgY29uc3Qga2EgPSBzYS5rbm90c1thLmtub3RdO1xuICAgIGNvbnN0IGtiID0gc2Iua25vdHNbMF07XG4gICAgLy8gVGhlIGpvaW5lZCBrbm90IGtlZXBzIEEncyBwb3NpdGlvbiBhbmQgaW4gdGFuZ2VudCwgYW5kIEIncyBvdXQgdGFuZ2VudC5cbiAgICBjb25zdCBvdXRXb3JsZCA9IHRhbmdlbnRPdXRWZWModjMoKSwga2IpO1xuICAgIGlmIChrYS5tb2RlID09PSBUYW5nZW50TW9kZS5MaW5lYXIgJiYga2IubW9kZSAhPT0gVGFuZ2VudE1vZGUuTGluZWFyKSBrYS5tb2RlID0gVGFuZ2VudE1vZGUuQnJva2VuO1xuICAgIGlmICh0YW5nZW50c0VkaXRhYmxlKGthLm1vZGUpKSB7XG4gICAgICAgIGthLm1vZGUgPSBUYW5nZW50TW9kZS5Ccm9rZW47XG4gICAgICAgIHFSb3RhdGUoa2EudGFuZ2VudE91dCwgcUludmVydChxNCgpLCBrYS5yb3RhdGlvbiksIG91dFdvcmxkKTtcbiAgICB9XG4gICAgY29uc3Qgb2Zmc2V0ID0gc2Eua25vdHMubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBiSW5kZXggPSBiLnNwbGluZTtcbiAgICAvLyBCJ3Mga25vdHMgKGFmdGVyIGl0cyBmaXJzdCkgbW92ZSB0byBBOyBsaW5rcyBmb2xsb3cuXG4gICAgcmV3cml0ZUxpbmtzKGMsIChvKSA9PiB7XG4gICAgICAgIGlmIChvLnNwbGluZSAhPT0gYkluZGV4KSByZXR1cm4gbztcbiAgICAgICAgaWYgKG8ua25vdCA9PT0gMCkgcmV0dXJuIHsgc3BsaW5lOiBhLnNwbGluZSwga25vdDogYS5rbm90IH07XG4gICAgICAgIHJldHVybiB7IHNwbGluZTogYS5zcGxpbmUsIGtub3Q6IG9mZnNldCArIG8ua25vdCB9O1xuICAgIH0pO1xuICAgIHNhLmtub3RzLnB1c2goLi4uc2Iua25vdHMuc2xpY2UoMSkpO1xuICAgIGMuc3BsaW5lcy5zcGxpY2UoYkluZGV4LCAxKTtcbiAgICByZXdyaXRlTGlua3MoYywgKG8pID0+IChvLnNwbGluZSA+IGJJbmRleCA/IHsgc3BsaW5lOiBvLnNwbGluZSAtIDEsIGtub3Q6IG8ua25vdCB9IDogbykpO1xuICAgIGNvbnN0IGFTcGxpbmUgPSBhLnNwbGluZSA+IGJJbmRleCA/IGEuc3BsaW5lIC0gMSA6IGEuc3BsaW5lO1xuICAgIHJlZnJlc2hBbGwoYy5zcGxpbmVzW2FTcGxpbmVdKTtcbiAgICByZXR1cm4geyBzcGxpbmU6IGFTcGxpbmUsIGtub3Q6IGEua25vdCB9O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNoYXBlc1xuXG5leHBvcnQgaW50ZXJmYWNlIFNoYXBlT3B0aW9ucyB7XG4gICAgLyoqIFNpemUgKHNxdWFyZSBzaWRlLCBjaXJjbGUgcmFkaXVzLi4uKS4gKi9cbiAgICBzaXplOiBudW1iZXI7XG4gICAgLyoqIFBvbHlnb24gLyBzdGFyIHBvaW50cy4gKi9cbiAgICBzaWRlcz86IG51bWJlcjtcbiAgICAvKiogSGVsaXggdHVybnMuICovXG4gICAgdHVybnM/OiBudW1iZXI7XG4gICAgLyoqIEhlbGl4IGhlaWdodC4gKi9cbiAgICBoZWlnaHQ/OiBudW1iZXI7XG4gICAgLyoqIE1ha2UgdGhlIHNoYXBlIGluIHRoZSBYWSBwbGFuZSAoMkQpIGluc3RlYWQgb2YgWFogKDNEKS4gKi9cbiAgICBwbGFuZTJEPzogYm9vbGVhbjtcbn1cblxuLyoqIEtub3QgcG9zaXRpb25zICsgbW9kZXMgZm9yIGEgdGVtcGxhdGUgc2hhcGUgKFVuaXR5J3MgU3BsaW5lID4gU3F1YXJlIC8gQ2lyY2xlIC8gLi4uKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGFwZUtub3RzKGtpbmQ6IHN0cmluZywgbzogU2hhcGVPcHRpb25zKTogeyBwb2ludHM6IFYzW107IG1vZGU6IG51bWJlcjsgY2xvc2VkOiBib29sZWFuOyB0YW5nZW50U2NhbGU/OiBudW1iZXIgfSB7XG4gICAgY29uc3QgciA9IG8uc2l6ZTtcbiAgICBjb25zdCBwdHM6IFYzW10gPSBbXTtcbiAgICBjb25zdCBmbGF0ID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCBoID0gMCk6IFYzID0+IChvLnBsYW5lMkQgPyB2Myh4LCB5LCBoKSA6IHYzKHgsIGgsIC15KSk7XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICAgIGNhc2UgJ3NxdWFyZSc6XG4gICAgICAgICAgICBwdHMucHVzaChmbGF0KC1yLCAtciksIGZsYXQoLXIsIHIpLCBmbGF0KHIsIHIpLCBmbGF0KHIsIC1yKSk7XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuTGluZWFyLCBjbG9zZWQ6IHRydWUgfTtcbiAgICAgICAgY2FzZSAncm91bmRlZC1zcXVhcmUnOiB7XG4gICAgICAgICAgICBjb25zdCBjID0gciAqIDAuNzU7XG4gICAgICAgICAgICBjb25zdCBlID0gcjtcbiAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoLWMsIC1lKSwgZmxhdCgtZSwgLWMpLCBmbGF0KC1lLCBjKSwgZmxhdCgtYywgZSksIGZsYXQoYywgZSksIGZsYXQoZSwgYyksIGZsYXQoZSwgLWMpLCBmbGF0KGMsIC1lKSk7XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuQXV0b1Ntb290aCwgY2xvc2VkOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnY2lyY2xlJzoge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKGkgLyA0KSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoTWF0aC5jb3MoYSkgKiByLCBNYXRoLnNpbihhKSAqIHIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIDQgTWlycm9yZWQga25vdHMgd2l0aCBoYW5kbGUgbGVuZ3RoIDAuNTUyMyByIG1ha2UgYSBuZWFyLXBlcmZlY3QgY2lyY2xlLlxuICAgICAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBwdHMsIG1vZGU6IFRhbmdlbnRNb2RlLk1pcnJvcmVkLCBjbG9zZWQ6IHRydWUsIHRhbmdlbnRTY2FsZTogMC41NTIzIH07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncG9seWdvbic6IHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBNYXRoLm1heCgzLCBNYXRoLnJvdW5kKG8uc2lkZXMgPz8gNikpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKGkgLyBuKSAqIE1hdGguUEkgKiAyICsgTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICAgICAgcHRzLnB1c2goZmxhdChNYXRoLmNvcyhhKSAqIHIsIE1hdGguc2luKGEpICogcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBwdHMsIG1vZGU6IFRhbmdlbnRNb2RlLkxpbmVhciwgY2xvc2VkOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnc3Rhcic6IHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBNYXRoLm1heCgzLCBNYXRoLnJvdW5kKG8uc2lkZXMgPz8gNSkpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuICogMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IChpIC8gKG4gKiAyKSkgKiBNYXRoLlBJICogMiArIE1hdGguUEkgLyAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJyID0gaSAlIDIgPT09IDAgPyByIDogciAqIDAuNDU7XG4gICAgICAgICAgICAgICAgcHRzLnB1c2goZmxhdChNYXRoLmNvcyhhKSAqIHJyLCBNYXRoLnNpbihhKSAqIHJyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuTGluZWFyLCBjbG9zZWQ6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdoZWxpeCc6IHtcbiAgICAgICAgICAgIGNvbnN0IHR1cm5zID0gTWF0aC5tYXgoMC4yNSwgby50dXJucyA/PyAzKTtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IG8uaGVpZ2h0ID8/IHIgKiAyO1xuICAgICAgICAgICAgY29uc3QgcGVyVHVybiA9IDg7XG4gICAgICAgICAgICBjb25zdCBuID0gTWF0aC5yb3VuZCh0dXJucyAqIHBlclR1cm4pO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IChpIC8gcGVyVHVybikgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICBwdHMucHVzaChmbGF0KE1hdGguY29zKGEpICogciwgTWF0aC5zaW4oYSkgKiByLCAoaSAvIG4pICogaGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuQXV0b1Ntb290aCwgY2xvc2VkOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcHRzLnB1c2goZmxhdCgtciwgMCksIGZsYXQociwgMCkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBwdHMsIG1vZGU6IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgsIGNsb3NlZDogZmFsc2UgfTtcbiAgICB9XG59XG5cbi8qKiBGaWxscyBhIHNwbGluZSB3aXRoIGEgc2hhcGUgZnJvbSBzaGFwZUtub3RzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU2hhcGUoczogU3BsaW5lTGlrZSwga2luZDogc3RyaW5nLCBvOiBTaGFwZU9wdGlvbnMsIGZhY3Rvcnk6IEZhY3RvcnkpOiB2b2lkIHtcbiAgICBjb25zdCBzaGFwZSA9IHNoYXBlS25vdHMoa2luZCwgbyk7XG4gICAgcy5rbm90cy5sZW5ndGggPSAwO1xuICAgIHMuY2xvc2VkID0gc2hhcGUuY2xvc2VkO1xuICAgIGNvbnN0IG5vcm1hbCA9IG8ucGxhbmUyRCA/IHYzKDAsIDAsIDEpIDogdjMoMCwgMSwgMCk7XG4gICAgY29uc3QgbiA9IHNoYXBlLnBvaW50cy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgY29uc3QgayA9IGZhY3Rvcnkua25vdCgpO1xuICAgICAgICBjb3B5KGsucG9zaXRpb24sIHNoYXBlLnBvaW50c1tpXSk7XG4gICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgMCk7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIDApO1xuICAgICAgICBxSWRlbnRpdHkoay5yb3RhdGlvbik7XG4gICAgICAgIGsubW9kZSA9IHNoYXBlLm1vZGU7XG4gICAgICAgIGsudGVuc2lvbiA9IERFRkFVTFRfVEVOU0lPTjtcbiAgICAgICAgcy5rbm90cy5wdXNoKGspO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICBjb25zdCBrID0gcy5rbm90c1tpXTtcbiAgICAgICAgY29uc3QgcHJldiA9IHMua25vdHNbcHJldkluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgICAgIGNvbnN0IG5leHQgPSBzLmtub3RzW25leHRJbmRleChpLCBuLCBzLmNsb3NlZCldLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCBkaXIgPSBzdWIodjMoKSwgbmV4dCwgcHJldik7XG4gICAgICAgIGlmIChsZW5TcShkaXIpIDwgRVBTSUxPTikgc3ViKGRpciwgbmV4dCwgay5wb3NpdGlvbik7XG4gICAgICAgIGtub3RSb3RhdGlvbihrLnJvdGF0aW9uLCBkaXIsIG5vcm1hbCk7XG4gICAgICAgIGlmIChzaGFwZS50YW5nZW50U2NhbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGwgPSBzaGFwZS50YW5nZW50U2NhbGUgKiBvLnNpemU7XG4gICAgICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1sKTtcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlZnJlc2hBbGwocyk7XG59XG5cbmV4cG9ydCB7IFVQIGFzIEtOT1RfVVAsIEZPUldBUkQgYXMgS05PVF9GT1JXQVJEIH07XG4iLCAiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuXG5leHBvcnQgY29uc3QgcmVzdWx0cyA9IHsgcGFzc2VkOiAwLCBmYWlsZWQ6IDAgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QobmFtZTogc3RyaW5nLCBmbjogKCkgPT4gdm9pZCkge1xuICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICAgIHJlc3VsdHMucGFzc2VkKys7XG4gICAgICAgIGNvbnNvbGUubG9nKGAgIG9rICAgJHtuYW1lfWApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVzdWx0cy5mYWlsZWQrKztcbiAgICAgICAgY29uc3QgZXJyID0gZSBhcyBFcnJvcjtcbiAgICAgICAgY29uc3QgZGV0YWlsID0gZXJyIGluc3RhbmNlb2YgYXNzZXJ0LkFzc2VydGlvbkVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyPy5zdGFjayB8fCBlcnIpLnNwbGl0KCdcXG4nKS5zbGljZSgwLCA1KS5qb2luKCdcXG4nKTtcbiAgICAgICAgY29uc29sZS5sb2coYCAgRkFJTCAke25hbWV9XFxuICAgICAgICR7ZGV0YWlsLnNwbGl0KCdcXG4nKS5qb2luKCdcXG4gICAgICAgJyl9YCk7XG4gICAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGlCQUFtQjs7O0FDd0JaLElBQU0sVUFBVTtBQUVoQixTQUFTLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQU87QUFDeEMsU0FBTyxFQUFFLEdBQUcsR0FBRyxFQUFFO0FBQ3JCO0FBRU8sU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBTztBQUMvQyxTQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRTtBQUN4QjtBQUVPLFNBQVMsSUFBa0IsS0FBUSxHQUFXLEdBQVcsR0FBYztBQUMxRSxNQUFJLElBQUk7QUFD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SSxFQUFFLElBQUksRUFBRTtBQUN0RCxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDdEQsUUFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3RELFFBQU0sSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUN0RCxTQUFPLEtBQUssS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQy9CO0FBRU8sU0FBUyxXQUF5QixLQUFRLEdBQVU7QUFDdkQsUUFBTSxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ2pFLE1BQUksSUFBSSxRQUFTLFFBQU8sVUFBVSxHQUFHO0FBQ3JDLFNBQU8sS0FBSyxLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQ3ZEO0FBR08sU0FBUyxRQUFzQixLQUFRLEdBQVU7QUFDcEQsUUFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3RELE1BQUksSUFBSSxRQUFTLFFBQU8sVUFBVSxHQUFHO0FBQ3JDLFNBQU8sS0FBSyxLQUFLLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQzFEO0FBR08sU0FBUyxRQUFzQixLQUFRLEdBQU8sR0FBVTtBQUUzRCxRQUFNLEtBQUssS0FBSyxF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LElBQUksSUFBSSxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxHQUFHO0FBQUEsRUFDcEQ7QUFDSjtBQUdPLFNBQVMsZUFBNkIsS0FBUSxHQUFVLEdBQWM7QUFDekUsUUFBTSxJQUFJLElBQUk7QUFDZCxRQUFNLElBQUksSUFBSSxJQUFJO0FBQ2xCLFFBQU0sSUFBSSxJQUFJLElBQUk7QUFDbEIsUUFBTSxJQUFJLElBQUksSUFBSTtBQUNsQixTQUFPO0FBQUEsSUFDSDtBQUFBLElBQ0EsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsS0FBSyxLQUFLLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxLQUFLLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxHQUFHO0FBQUEsSUFDbkUsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsS0FBSyxLQUFLLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxLQUFLLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxHQUFHO0FBQUEsSUFDbkUsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsS0FBSyxLQUFLLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxLQUFLLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxHQUFHO0FBQUEsRUFDdkU7QUFDSjtBQUdPLFNBQVMsaUJBQStCLEtBQVEsR0FBVSxHQUFjO0FBQzNFLFFBQU0sSUFBSSxJQUFJO0FBQ2QsU0FBTztBQUFBLElBQ0g7QUFBQSxJQUNBLElBQUksS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxLQUFLLElBQUksS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRztBQUFBLElBQzdFLElBQUksS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxLQUFLLElBQUksS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRztBQUFBLElBQzdFLElBQUksS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxLQUFLLElBQUksS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRztBQUFBLEVBQ2pGO0FBQ0o7QUFFQSxJQUFNLEtBQUssR0FBRztBQU9QLFNBQVMsY0FBNEIsS0FBUSxHQUFVLEdBQWM7QUFDeEUsaUJBQWUsSUFBSSxHQUFHLENBQUM7QUFDdkIsTUFBSSxNQUFNLEVBQUUsSUFBSSxVQUFVLFFBQVMsUUFBTyxVQUFVLEtBQUssRUFBRTtBQUczRCxtQkFBaUIsSUFBSSxHQUFHLENBQUM7QUFDekIsTUFBSSxNQUFNLEVBQUUsSUFBSSxVQUFVLFNBQVM7QUFDL0IsUUFBSSxJQUFJLElBQUssT0FBTSxJQUFJLElBQUksRUFBRTtBQUM3QixXQUFPLFVBQVUsS0FBSyxFQUFFO0FBQUEsRUFDNUI7QUFDQSxNQUFJLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtBQUNsQixTQUFPLFVBQVUsS0FBSyxFQUFFO0FBQzVCO0FBR08sU0FBUyxNQUFNLEdBQVUsR0FBVyxNQUFhLE9BQW9CO0FBQ3hFLFFBQU0sTUFBTSxLQUFLLEdBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7QUFDcEMsUUFBTSxNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztBQUNwQyxRQUFNLE1BQU0sS0FBSyxHQUFHLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0FBQ3BDLFFBQU0sT0FBTyxLQUFLLEdBQUcsR0FBRyxLQUFLLEtBQUssQ0FBQztBQUNuQyxRQUFNLE9BQU8sS0FBSyxHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUM7QUFDbkMsUUFBTSxNQUFNLEtBQUssR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLFFBQU0sS0FBSyxLQUFLLEdBQUcsR0FBRyxFQUFFLEVBQUU7QUFDMUIsUUFBTSxLQUFLLEtBQUssR0FBRyxHQUFHLEVBQUUsRUFBRTtBQUMxQixPQUFLLEtBQUssSUFBSSxFQUFFO0FBQ2hCLE9BQUssS0FBSyxJQUFJLEdBQUc7QUFDakIsT0FBSyxLQUFLLElBQUksSUFBSTtBQUNsQixPQUFLLEtBQUssSUFBSSxHQUFHO0FBQ2pCLE9BQUssTUFBTSxJQUFJLEdBQUc7QUFDbEIsT0FBSyxNQUFNLElBQUksSUFBSTtBQUNuQixPQUFLLE1BQU0sSUFBSSxHQUFHO0FBQ2xCLE9BQUssTUFBTSxJQUFJLEVBQUU7QUFDckI7QUFzQkEsSUFBTSxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQW9CO0FBQUEsRUFBb0I7QUFBQSxFQUFvQjtBQUFBLEVBQzVEO0FBQUEsRUFBb0I7QUFBQSxFQUFvQjtBQUFBLEVBQW9CO0FBQ2hFO0FBQ0EsSUFBTSxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQW9CO0FBQUEsRUFBb0I7QUFBQSxFQUFvQjtBQUFBLEVBQzVEO0FBQUEsRUFBb0I7QUFBQSxFQUFvQjtBQUFBLEVBQW9CO0FBQ2hFO0FBR08sU0FBUyxVQUFVLEdBQVUsSUFBSSxHQUFHLElBQUksR0FBVztBQUN0RCxNQUFJLEtBQUssRUFBRyxRQUFPO0FBQ25CLFFBQU0sSUFBSSxJQUFJO0FBQ2QsTUFBSSxNQUFNO0FBQ1YsV0FBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7QUFDeEIsbUJBQWUsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQztBQUNyQyxXQUFPLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRTtBQUFBLEVBQzNCO0FBQ0EsU0FBTyxNQUFNO0FBQ2pCO0FBTU8sU0FBUyxpQkFBaUIsR0FBVSxHQUFXLEtBQWtDO0FBQ3BGLFFBQU0sTUFBTSxPQUFPLElBQUksV0FBVyxJQUFJLE1BQU0sSUFBSSxhQUFhLENBQUM7QUFDOUQsTUFBSSxDQUFDLElBQUk7QUFDVCxXQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUN4QixRQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLFVBQVUsSUFBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQUEsRUFDckU7QUFDQSxTQUFPO0FBQ1g7QUFHTyxTQUFTLFVBQVUsS0FBbUIsR0FBbUI7QUFDNUQsUUFBTSxJQUFJLElBQUk7QUFDZCxRQUFNLFFBQVEsSUFBSSxJQUFJLENBQUM7QUFDdkIsTUFBSSxLQUFLLEtBQUssU0FBUyxFQUFHLFFBQU87QUFDakMsTUFBSSxLQUFLLE1BQU8sUUFBTztBQUN2QixNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUssSUFBSTtBQUNiLFNBQU8sS0FBSyxLQUFLLEdBQUc7QUFDaEIsVUFBTSxNQUFPLEtBQUssTUFBTztBQUN6QixRQUFJLElBQUksR0FBRyxJQUFJLEVBQUcsTUFBSztBQUFBLFFBQ2xCLE1BQUs7QUFBQSxFQUNkO0FBQ0EsUUFBTSxNQUFNLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtBQUM1QixRQUFNLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxFQUFFLEtBQUssTUFBTTtBQUMxQyxVQUFRLEtBQUssTUFBTSxJQUFJO0FBQzNCO0FBaUJPLFNBQVMsU0FBUyxHQUFVLEdBQU8sVUFBVSxJQUFJLGFBQWEsR0FBa0M7QUFDbkcsUUFBTSxJQUFJLEdBQUc7QUFDYixNQUFJLFFBQVE7QUFDWixNQUFJLE9BQU87QUFDWCxXQUFTLElBQUksR0FBRyxLQUFLLFNBQVMsS0FBSztBQUMvQixVQUFNLElBQUksSUFBSTtBQUNkLGlCQUFhLEdBQUcsR0FBRyxDQUFDO0FBQ3BCLFVBQU0sS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU07QUFDL0QsUUFBSSxJQUFJLE1BQU07QUFDVixhQUFPO0FBQ1AsY0FBUTtBQUFBLElBQ1o7QUFBQSxFQUNKO0FBQ0EsTUFBSSxPQUFPLElBQUk7QUFDZixXQUFTLEtBQUssR0FBRyxLQUFLLFlBQVksTUFBTTtBQUNwQyxZQUFRO0FBQ1IsZUFBVyxLQUFLLENBQUMsUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHO0FBQzFDLFVBQUksSUFBSSxLQUFLLElBQUksRUFBRztBQUNwQixtQkFBYSxHQUFHLEdBQUcsQ0FBQztBQUNwQixZQUFNLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNO0FBQy9ELFVBQUksSUFBSSxNQUFNO0FBQ1YsZUFBTztBQUNQLGdCQUFRO0FBQUEsTUFDWjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0EsU0FBTyxFQUFFLEdBQUcsT0FBTyxRQUFRLEtBQUs7QUFDcEM7OztBQzVMTyxJQUFNLGtCQUFrQjtBQWdDL0IsSUFBTSxLQUFTLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUU7QUFLM0IsU0FBUyxVQUFVLEdBQVcsT0FBZSxRQUF5QjtBQUN6RSxTQUFPLFNBQVMsS0FBSyxJQUFJLEdBQUcsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQztBQUMxRDtBQUVPLFNBQVMsVUFBVSxHQUFXLE9BQWUsUUFBeUI7QUFDekUsU0FBTyxTQUFTLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztBQUNsRTtBQUVPLFNBQVMsV0FBVyxHQUF1QjtBQUM5QyxRQUFNLElBQUksRUFBRSxNQUFNO0FBQ2xCLE1BQUksSUFBSSxFQUFHLFFBQU87QUFDbEIsU0FBTyxFQUFFLFNBQVMsSUFBSSxJQUFJO0FBQzlCO0FBRU8sU0FBUyxpQkFBaUIsTUFBdUI7QUFDcEQsU0FBTyxTQUFTLG9CQUF3QixTQUFTLHNCQUEwQixTQUFTO0FBQ3hGO0FBSU8sU0FBUyxTQUE2QixLQUFRLEdBQWdCO0FBQ2pFLE9BQUssSUFBSSxVQUFVLEVBQUUsUUFBUTtBQUM3QixPQUFLLElBQUksV0FBVyxFQUFFLFNBQVM7QUFDL0IsT0FBSyxJQUFJLFlBQVksRUFBRSxVQUFVO0FBQ2pDLFFBQU0sSUFBSSxVQUFVLEVBQUUsUUFBUTtBQUM5QixNQUFJLE9BQU8sRUFBRTtBQUNiLE1BQUksVUFBVSxFQUFFO0FBQ2hCLFNBQU87QUFDWDtBQUVPLFNBQVMsT0FBcUIsS0FBUSxHQUFnQjtBQUN6RCxTQUFPLFFBQVEsS0FBSyxFQUFFLFVBQVUsRUFBRTtBQUN0QztBQUdPLFNBQVMsY0FBNEIsS0FBUSxHQUFnQjtBQUNoRSxTQUFPLFFBQVEsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVO0FBQ2hEO0FBR08sU0FBUyxhQUEyQixLQUFRLEdBQWdCO0FBQy9ELFNBQU8sUUFBUSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVM7QUFDL0M7QUFNTyxTQUFTLGFBQTJCLEtBQVEsU0FBYSxRQUFlO0FBQzNFLFFBQU0sSUFBSSxVQUFVLEdBQUcsR0FBRyxPQUFPO0FBQ2pDLE1BQUksSUFBSSxVQUFVLEdBQUcsR0FBRyxNQUFNO0FBQzlCLE1BQUksTUFBTSxDQUFDLElBQUksUUFBUyxLQUFJLEtBQUssR0FBRyxHQUFHLEVBQUU7QUFDekMsTUFBSSxNQUFNLENBQUMsSUFBSSxTQUFTO0FBRXBCLFVBQU0sSUFBSSxpQkFBaUIsR0FBRyxHQUFHLENBQUM7QUFDbEMsV0FBTyxjQUFjLEtBQUssR0FBRyxDQUFDO0FBQUEsRUFDbEM7QUFDQSxNQUFJLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNO0FBRWhDLFVBQU1DLE1BQUssTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDOUMsUUFBSSxNQUFNQSxHQUFFLElBQUksUUFBUyxPQUFNQSxLQUFJLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQzFELFdBQU8sY0FBYyxLQUFLLEdBQUcsVUFBVUEsS0FBSUEsR0FBRSxDQUFDO0FBQUEsRUFDbEQ7QUFDQSxRQUFNLEtBQUssVUFBVSxHQUFHLEdBQUcsZUFBZSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDckQsU0FBTyxjQUFjLEtBQUssR0FBRyxFQUFFO0FBQ25DO0FBT08sU0FBUyxrQkFBZ0MsS0FBUSxNQUFVLEtBQVMsTUFBVSxTQUFvQjtBQUNyRyxRQUFNLEtBQUssS0FBSyxLQUFLLElBQUk7QUFDekIsUUFBTSxLQUFLLEtBQUssTUFBTSxHQUFHO0FBQ3pCLE1BQUksS0FBSyxXQUFXLEtBQUssUUFBUyxRQUFPLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUV6RCxNQUFJLEtBQUssUUFBUyxRQUFPLE1BQU0sS0FBSyxJQUFJLEtBQUssTUFBTSxHQUFHLEdBQUcsR0FBRztBQUM1RCxNQUFJLEtBQUssUUFBUyxRQUFPLE1BQU0sS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLEdBQUcsR0FBRztBQUM1RCxRQUFNLElBQUk7QUFDVixRQUFNLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQztBQUMxQixRQUFNLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQztBQUMxQixRQUFNLE9BQU8sTUFBTTtBQUNuQixRQUFNLE9BQU8sTUFBTTtBQUNuQixRQUFNLElBQUksS0FBSyxJQUFJLE9BQU8sTUFBTTtBQUNoQyxTQUFPO0FBQUEsSUFDSDtBQUFBLEtBQ0MsT0FBTyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssT0FBTyxRQUFRLElBQUksS0FBSztBQUFBLEtBQ3pELE9BQU8sS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLE9BQU8sUUFBUSxJQUFJLEtBQUs7QUFBQSxLQUN6RCxPQUFPLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxPQUFPLFFBQVEsSUFBSSxLQUFLO0FBQUEsRUFDOUQ7QUFDSjtBQUdPLFNBQVMsaUJBQWlCLEdBQWUsR0FBaUI7QUFDN0QsUUFBTSxJQUFJLEVBQUUsTUFBTTtBQUNsQixNQUFJLElBQUksS0FBSyxLQUFLLEVBQUc7QUFDckIsUUFBTSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBQ25CLFVBQVEsRUFBRSxNQUFNO0FBQUEsSUFDWixLQUFLO0FBQ0QsVUFBSSxFQUFFLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDeEIsVUFBSSxFQUFFLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDekI7QUFBQSxJQUNKLEtBQUssb0JBQXdCO0FBQ3pCLFlBQU0sT0FBTyxFQUFFLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRTtBQUNoRCxZQUFNLE9BQU8sRUFBRSxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUU7QUFDaEQsWUFBTSxLQUFLLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDekIsWUFBTSxNQUFNLGtCQUFrQixHQUFHLEdBQUcsTUFBTSxFQUFFLFVBQVUsTUFBTSxFQUFFLE9BQU87QUFDckUsWUFBTSxPQUFPLGtCQUFrQixHQUFHLEdBQUcsTUFBTSxFQUFFLFVBQVUsTUFBTSxFQUFFLE9BQU87QUFDdEUsVUFBSSxNQUFNLElBQUksR0FBRztBQUNqQixVQUFJLE9BQU8sSUFBSSxJQUFJO0FBQ25CLFVBQUksTUFBTTtBQUNWLFVBQUksTUFBTSxRQUFTLE9BQU07QUFDekIsVUFBSSxPQUFPLFNBQVM7QUFDaEIsZUFBTztBQUNQLGNBQU0sTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUFFO0FBQUEsTUFDN0I7QUFDQSxVQUFJLE1BQU0sR0FBRyxJQUFJLFFBQVMsY0FBYSxFQUFFLFVBQVUsS0FBSyxFQUFFO0FBQzFELFVBQUksRUFBRSxXQUFXLEdBQUcsR0FBRyxDQUFDLEdBQUc7QUFDM0IsVUFBSSxFQUFFLFlBQVksR0FBRyxHQUFHLElBQUk7QUFDNUI7QUFBQSxJQUNKO0FBQUEsSUFDQSxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQ0QsMkJBQXFCLEdBQUcsRUFBRSxTQUFTLGtCQUFzQixJQUFJO0FBQzdEO0FBQUEsSUFDSjtBQUNJO0FBQUEsRUFDUjtBQUNKO0FBTU8sU0FBUyxxQkFBcUIsR0FBYSxVQUFtQixXQUEwQjtBQUMzRixRQUFNLE9BQU8sY0FBYyxHQUFHLEdBQUcsQ0FBQztBQUNsQyxRQUFNLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUNoQyxRQUFNLE9BQU8sWUFBWSxPQUFPLE1BQU0sR0FBRyxHQUFHLEtBQUssRUFBRTtBQUNuRCxRQUFNLFFBQVEsWUFBWSxNQUFNLEdBQUcsR0FBRyxLQUFLLEVBQUUsSUFBSTtBQUNqRCxRQUFNLE1BQU0sTUFBTSxJQUFJLElBQUksVUFBVSxPQUFPO0FBQzNDLFFBQU0sS0FBSyxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLE1BQUksTUFBTSxHQUFHLElBQUksUUFBUyxjQUFhLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDMUQsUUFBTSxRQUFRLElBQUksSUFBSTtBQUN0QixRQUFNLFNBQVMsSUFBSSxLQUFLO0FBQ3hCLE1BQUksVUFBVTtBQUNWLFVBQU0sSUFBSSxRQUFRLFVBQVUsUUFBUTtBQUNwQyxRQUFJLEVBQUUsWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUN6QixRQUFJLEVBQUUsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQUEsRUFDN0IsV0FBVyxXQUFXO0FBQ2xCLFFBQUksRUFBRSxZQUFZLEdBQUcsR0FBRyxLQUFLO0FBQzdCLFFBQUksRUFBRSxXQUFXLEdBQUcsR0FBRyxDQUFDLE1BQU07QUFBQSxFQUNsQyxPQUFPO0FBQ0gsUUFBSSxFQUFFLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSztBQUM3QixRQUFJLEVBQUUsWUFBWSxHQUFHLEdBQUcsTUFBTTtBQUFBLEVBQ2xDO0FBQ0o7QUFHTyxTQUFTLGNBQWMsR0FBZSxHQUFpQjtBQUMxRCxRQUFNLElBQUksRUFBRSxNQUFNO0FBQ2xCLE1BQUksQ0FBQyxFQUFHO0FBQ1IsUUFBTSxJQUFJLFVBQVUsR0FBRyxHQUFHLEVBQUUsTUFBTTtBQUNsQyxRQUFNLElBQUksVUFBVSxHQUFHLEdBQUcsRUFBRSxNQUFNO0FBQ2xDLE1BQUksTUFBTSxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsU0FBUyxtQkFBd0Isa0JBQWlCLEdBQUcsQ0FBQztBQUNoRixtQkFBaUIsR0FBRyxDQUFDO0FBQ3JCLE1BQUksTUFBTSxLQUFLLE1BQU0sS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLFNBQVMsbUJBQXdCLGtCQUFpQixHQUFHLENBQUM7QUFDL0Y7QUFHTyxTQUFTLFdBQVcsR0FBcUI7QUFDNUMsV0FBUyxJQUFJLEdBQUcsSUFBSSxFQUFFLE1BQU0sUUFBUSxJQUFLLGtCQUFpQixHQUFHLENBQUM7QUFDbEU7QUFFTyxTQUFTLGdCQUFnQixHQUFlLEdBQVcsR0FBYTtBQUNuRSxPQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsVUFBVSxDQUFDO0FBQzNCLGdCQUFjLEdBQUcsQ0FBQztBQUN0QjtBQU9PLFNBQVMsY0FBYyxHQUFlLEdBQVcsT0FBcUIsR0FBYTtBQUN0RixRQUFNLElBQUksRUFBRSxNQUFNLENBQUM7QUFDbkIsTUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksR0FBRztBQUMzQixRQUFJLEVBQUUsU0FBUyxlQUFvQiw0QkFBMkIsR0FBRyxDQUFDO0FBQ2xFLE1BQUUsT0FBTztBQUFBLEVBQ2I7QUFDQSxNQUFJLEVBQUUsU0FBUyxnQkFBb0I7QUFDL0IsVUFBTSxRQUFRLFFBQVEsR0FBRyxHQUFHLFFBQVEsR0FBRyxHQUFHLEVBQUUsUUFBUSxHQUFHLENBQUM7QUFDeEQsU0FBSyxVQUFVLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxLQUFLO0FBQ3ZEO0FBQUEsRUFDSjtBQUNBLFFBQU0sSUFBSSxJQUFJLENBQUM7QUFDZixRQUFNLE1BQU0sVUFBVSxRQUFRLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7QUFDL0QsTUFBSSxJQUFJLFFBQVMsY0FBYSxFQUFFLFVBQVUsS0FBSyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDOUQsUUFBTSxXQUFXLEVBQUUsU0FBUztBQUM1QixNQUFJLFVBQVUsT0FBTztBQUNqQixVQUFNLE1BQU0sV0FBVyxJQUFJLElBQUksRUFBRSxTQUFTO0FBQzFDLFFBQUksRUFBRSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLFFBQUksRUFBRSxXQUFXLEdBQUcsR0FBRyxDQUFDLEdBQUc7QUFBQSxFQUMvQixPQUFPO0FBQ0gsVUFBTSxPQUFPLFdBQVcsSUFBSSxJQUFJLEVBQUUsVUFBVTtBQUM1QyxRQUFJLEVBQUUsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLFFBQUksRUFBRSxZQUFZLEdBQUcsR0FBRyxJQUFJO0FBQUEsRUFDaEM7QUFDSjtBQUdBLFNBQVMsMkJBQTJCLEdBQWUsR0FBaUI7QUFDaEUsUUFBTSxJQUFJLEVBQUUsTUFBTTtBQUNsQixRQUFNLElBQUksRUFBRSxNQUFNLENBQUM7QUFDbkIsUUFBTSxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUUsUUFBUTtBQUNwQyxRQUFNLE9BQU8sRUFBRSxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUU7QUFDaEQsUUFBTSxPQUFPLEVBQUUsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFO0FBQ2hELFVBQVEsRUFBRSxXQUFXLEtBQUssTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN6RSxVQUFRLEVBQUUsWUFBWSxLQUFLLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDOUU7QUFFTyxTQUFTLGVBQWUsR0FBZSxHQUFXLE1BQW9CO0FBQ3pFLFFBQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQztBQUNuQixNQUFJLEVBQUUsU0FBUyxNQUFNO0FBQ2pCLHFCQUFpQixHQUFHLENBQUM7QUFDckI7QUFBQSxFQUNKO0FBQ0EsTUFBSSxFQUFFLFNBQVMsa0JBQXNCLGlCQUFpQixJQUFJLEVBQUcsNEJBQTJCLEdBQUcsQ0FBQztBQUM1RixJQUFFLE9BQU87QUFDVCxtQkFBaUIsR0FBRyxDQUFDO0FBQ3pCO0FBZ0JPLFNBQVMsU0FBUyxHQUFlLEdBQVcsTUFBYSxNQUFNLEdBQVU7QUFDNUUsUUFBTSxJQUFJLEVBQUUsTUFBTTtBQUNsQixRQUFNLElBQUksRUFBRSxNQUFNLENBQUM7QUFDbkIsUUFBTSxJQUFJLEVBQUUsT0FBTyxJQUFJLEtBQUssQ0FBQztBQUM3QixPQUFLLElBQUksSUFBSSxFQUFFLFFBQVE7QUFDdkIsTUFBSSxJQUFJLElBQUksRUFBRSxVQUFVLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQztBQUNoRCxNQUFJLElBQUksSUFBSSxFQUFFLFVBQVUsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDO0FBQy9DLE9BQUssSUFBSSxJQUFJLEVBQUUsUUFBUTtBQUN2QixTQUFPO0FBQ1g7QUFLTyxJQUFNLGlCQUFpQjtBQUV2QixJQUFNLGFBQWE7QUFFbkIsSUFBTSxjQUFOLE1BQWtCO0FBQUEsRUFBbEI7QUFFSDtBQUFBLGlCQUFRO0FBQ1Isa0JBQWtCLENBQUM7QUFDbkIsbUJBQW9CLENBQUM7QUFFckI7QUFBQSxrQkFBbUIsQ0FBQztBQUNwQixpQkFBUTtBQUNSLGtCQUF5QixDQUFDO0FBQzFCLGVBQStCLENBQUM7QUFBQTtBQUNwQztBQUVBLElBQU0sV0FBVyxJQUFJLGFBQWEsQ0FBQztBQUNuQyxJQUFNLFdBQVcsSUFBSSxXQUFXLFNBQVMsTUFBTTtBQUUvQyxTQUFTLElBQUksR0FBVyxHQUFtQjtBQUN2QyxXQUFTLENBQUMsSUFBSTtBQUNkLE1BQUksS0FBSyxLQUFLLElBQUksU0FBUyxDQUFDLEdBQUcsUUFBUTtBQUN2QyxNQUFJLEtBQUssS0FBSyxJQUFJLFNBQVMsQ0FBQyxHQUFHLFFBQVE7QUFDdkMsU0FBTztBQUNYO0FBR08sU0FBUyxZQUFZLEdBQXVCO0FBQy9DLE1BQUksSUFBSSxhQUFhO0FBQ3JCLE1BQUksSUFBSSxHQUFHLEVBQUUsTUFBTSxNQUFNO0FBQ3pCLE1BQUksSUFBSSxHQUFHLEVBQUUsU0FBUyxJQUFJLENBQUM7QUFDM0IsYUFBVyxLQUFLLEVBQUUsT0FBTztBQUNyQixRQUFJLElBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQztBQUN2QixRQUFJLElBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQztBQUN2QixRQUFJLElBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQztBQUN2QixRQUFJLElBQUksR0FBRyxFQUFFLFVBQVUsQ0FBQztBQUN4QixRQUFJLElBQUksR0FBRyxFQUFFLFVBQVUsQ0FBQztBQUN4QixRQUFJLElBQUksR0FBRyxFQUFFLFVBQVUsQ0FBQztBQUN4QixRQUFJLElBQUksR0FBRyxFQUFFLFdBQVcsQ0FBQztBQUN6QixRQUFJLElBQUksR0FBRyxFQUFFLFdBQVcsQ0FBQztBQUN6QixRQUFJLElBQUksR0FBRyxFQUFFLFdBQVcsQ0FBQztBQUN6QixRQUFJLElBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQztBQUN2QixRQUFJLElBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQztBQUN2QixRQUFJLElBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQztBQUN2QixRQUFJLElBQUksR0FBRyxFQUFFLFNBQVMsQ0FBQztBQUN2QixRQUFJLElBQUksR0FBRyxFQUFFLElBQUk7QUFDakIsUUFBSSxJQUFJLEdBQUcsRUFBRSxPQUFPO0FBQUEsRUFDeEI7QUFDQSxTQUFPO0FBQ1g7QUFFTyxTQUFTLFdBQVcsR0FBZSxPQUFvQixRQUFRLFlBQVksQ0FBQyxHQUFnQjtBQUMvRixRQUFNLFFBQVEsV0FBVyxDQUFDO0FBQzFCLFFBQU0sT0FBTyxTQUFTO0FBQ3RCLFFBQU0sUUFBUSxTQUFTO0FBQ3ZCLFFBQU0sT0FBTyxTQUFTO0FBQ3RCLFFBQU0sT0FBTyxTQUFTO0FBQ3RCLFFBQU0sSUFBSSxTQUFTO0FBQ25CLE1BQUksUUFBUTtBQUNaLFdBQVMsSUFBSSxHQUFHLElBQUksT0FBTyxLQUFLO0FBQzVCLFVBQU0sSUFBSSxTQUFTLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLE1BQU0sQ0FBQztBQUNuRCxVQUFNLE9BQU8sQ0FBQyxJQUFJO0FBQ2xCLFVBQU0sUUFBUSxpQkFBaUIsR0FBRyxnQkFBZ0IsTUFBTSxPQUFPLENBQUMsQ0FBQztBQUNqRSxVQUFNLE9BQU8sQ0FBQyxJQUFJO0FBQ2xCLFVBQU0sT0FBTyxDQUFDLElBQUk7QUFDbEIsVUFBTSxRQUFRLENBQUMsSUFBSSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLGFBQVMsTUFBTSxRQUFRLENBQUM7QUFDeEIsVUFBTSxJQUFJLENBQUMsSUFBSTtBQUFBLEVBQ25CO0FBQ0EsUUFBTSxRQUFRO0FBQ2QsUUFBTSxRQUFRO0FBQ2QsU0FBTztBQUNYO0FBR08sU0FBUyxZQUFZLEdBQWUsT0FBaUM7QUFDeEUsUUFBTSxRQUFRLFlBQVksQ0FBQztBQUMzQixNQUFJLFVBQVUsTUFBTSxNQUFPLFlBQVcsR0FBRyxPQUFPLEtBQUs7QUFDckQsU0FBTztBQUNYO0FBVU8sU0FBUyxhQUFhLE9BQW9CLEdBQVcsTUFBa0IsRUFBRSxPQUFPLEdBQUcsR0FBRyxFQUFFLEdBQWU7QUFDMUcsUUFBTSxRQUFRLE1BQU0sT0FBTztBQUMzQixNQUFJLENBQUMsT0FBTztBQUNSLFFBQUksUUFBUTtBQUNaLFFBQUksSUFBSTtBQUNSLFdBQU87QUFBQSxFQUNYO0FBQ0EsTUFBSSxNQUFNLFNBQVMsU0FBUztBQUV4QixVQUFNLElBQUksUUFBUSxDQUFDLElBQUk7QUFDdkIsUUFBSSxRQUFRLEtBQUssSUFBSSxLQUFLLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQztBQUM3QyxRQUFJLElBQUksSUFBSSxJQUFJO0FBQ2hCLFdBQU87QUFBQSxFQUNYO0FBQ0EsUUFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLE1BQU07QUFDN0IsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLLFFBQVE7QUFDakIsU0FBTyxLQUFLLElBQUk7QUFDWixVQUFNLE1BQU8sS0FBSyxLQUFLLEtBQU07QUFDN0IsUUFBSSxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUcsTUFBSztBQUFBLFFBQzVCLE1BQUssTUFBTTtBQUFBLEVBQ3BCO0FBQ0EsTUFBSSxRQUFRO0FBQ1osTUFBSSxJQUFJLFFBQVEsTUFBTSxPQUFPLEVBQUUsR0FBRyxNQUFNLE9BQU8sRUFBRSxHQUFHLElBQUksTUFBTSxPQUFPLEVBQUUsQ0FBQztBQUN4RSxTQUFPO0FBQ1g7QUFFQSxJQUFNLE1BQU0sR0FBRztBQUdmLFNBQVMsY0FBYyxHQUFVLE9BQXFCLEdBQW1CO0FBQ3JFLFFBQU0sSUFBSSxNQUFNO0FBQ2hCLE1BQUksS0FBSyxFQUFHLFFBQU87QUFDbkIsTUFBSSxLQUFLLEVBQUcsUUFBTyxNQUFNLElBQUksQ0FBQztBQUM5QixRQUFNLElBQUksS0FBSyxJQUFJLEtBQUssTUFBTSxLQUFLLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztBQUNqRCxTQUFPLE1BQU0sQ0FBQyxJQUFJLFVBQVUsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDO0FBQ2pEO0FBR0EsU0FBUyxRQUFRLEdBQVUsT0FBcUIsR0FBbUI7QUFDL0QsTUFBSSxJQUFJLFVBQVUsT0FBTyxDQUFDO0FBQzFCLFFBQU0sSUFBSSxNQUFNO0FBQ2hCLE1BQUksS0FBSyxLQUFLLEtBQUssRUFBRyxRQUFPO0FBQzdCLFFBQU0sSUFBSSxLQUFLLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2pELFFBQU0sS0FBSyxLQUFLLElBQUk7QUFDcEIsUUFBTSxNQUFNLElBQUksTUFBTSxJQUFJO0FBQzFCLFdBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ3hCLFVBQU0sTUFBTSxNQUFNLENBQUMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUk7QUFDN0MsVUFBTSxRQUFRLElBQUksZUFBZSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLFFBQUksUUFBUSxRQUFTO0FBQ3JCLFFBQUksS0FBSyxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxNQUFNLEtBQUssQ0FBQztBQUFBLEVBQ2xEO0FBQ0EsU0FBTztBQUNYO0FBR08sU0FBUyxjQUFjLE9BQW9CLE9BQWUsR0FBbUI7QUFDaEYsTUFBSSxDQUFDLE1BQU0sT0FBTyxPQUFRLFFBQU87QUFDakMsTUFBSSxNQUFNLFNBQVMsUUFBUyxTQUFRLFFBQVEsS0FBSyxNQUFNLE9BQU87QUFDOUQsVUFBUSxNQUFNLE9BQU8sS0FBSyxJQUFJLGNBQWMsTUFBTSxPQUFPLEtBQUssR0FBRyxNQUFNLE9BQU8sS0FBSyxHQUFHLENBQUMsS0FBSyxNQUFNO0FBQ3RHO0FBR08sU0FBUyxZQUFZLE9BQW9CLEdBQW1CO0FBQy9ELFFBQU0sUUFBUSxNQUFNLE9BQU87QUFDM0IsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUNuQixRQUFNLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7QUFDeEQsU0FBTyxjQUFjLE9BQU8sR0FBRyxRQUFRLElBQUksQ0FBQyxDQUFDO0FBQ2pEO0FBRU8sU0FBUyxZQUFZLE9BQW9CLEdBQW1CO0FBQy9ELFFBQU0sSUFBSSxhQUFhLE9BQU8sQ0FBQztBQUMvQixTQUFPLEVBQUUsUUFBUSxFQUFFO0FBQ3ZCO0FBRUEsSUFBTSxNQUFrQixFQUFFLE9BQU8sR0FBRyxHQUFHLEVBQUU7QUFFbEMsU0FBUyxpQkFBK0IsR0FBZSxPQUFvQixHQUFXLEtBQVc7QUFDcEcsTUFBSSxDQUFDLEVBQUUsTUFBTSxPQUFRLFFBQU8sSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQzVDLE1BQUksRUFBRSxNQUFNLFdBQVcsS0FBSyxDQUFDLE1BQU0sT0FBTyxPQUFRLFFBQU8sS0FBSyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsUUFBUTtBQUN0RixlQUFhLE9BQU8sR0FBRyxHQUFHO0FBQzFCLFNBQU8sYUFBYSxLQUFLLE1BQU0sT0FBTyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDM0Q7QUFHTyxTQUFTLGtCQUFnQyxHQUFlLE9BQW9CLEdBQVcsS0FBVztBQUNyRyxNQUFJLEVBQUUsTUFBTSxTQUFTLEtBQUssQ0FBQyxNQUFNLE9BQU8sUUFBUTtBQUM1QyxRQUFJLEVBQUUsTUFBTSxXQUFXLEVBQUcsUUFBTyxVQUFVLEtBQUssY0FBYyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM5RSxXQUFPLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQzNCO0FBQ0EsZUFBYSxPQUFPLEdBQUcsR0FBRztBQUMxQixTQUFPLGNBQWMsS0FBSyxNQUFNLE9BQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQzVEO0FBR08sU0FBUyxXQUF5QixHQUFlLE9BQW9CLEdBQVcsS0FBVztBQUM5RixNQUFJLENBQUMsRUFBRSxNQUFNLE9BQVEsUUFBTyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDNUMsTUFBSSxFQUFFLE1BQU0sV0FBVyxLQUFLLENBQUMsTUFBTSxPQUFPLE9BQVEsUUFBTyxPQUFPLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvRSxlQUFhLE9BQU8sR0FBRyxHQUFHO0FBQzFCLFNBQU8sUUFBUSxHQUFHLE9BQU8sSUFBSSxPQUFPLElBQUksR0FBRyxHQUFHO0FBQ2xEO0FBRU8sU0FBUyxRQUFzQixHQUFlLE9BQW9CLE9BQWUsR0FBVyxLQUFXO0FBQzFHLE1BQUksUUFBUSxNQUFNLElBQUksS0FBSztBQUMzQixNQUFJLENBQUMsTUFBTyxTQUFRLE1BQU0sSUFBSSxLQUFLLElBQUksYUFBYSxHQUFHLE1BQU0sT0FBTyxLQUFLLEdBQUcsS0FBSztBQUNqRixRQUFNLElBQUksUUFBUSxDQUFDLElBQUk7QUFDdkIsUUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLE1BQU0sQ0FBQyxHQUFHLGFBQWEsQ0FBQztBQUNoRCxRQUFNLElBQUksSUFBSTtBQUNkLFFBQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQztBQUM3RCxRQUFNLElBQUksR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQztBQUNqRSxPQUFLLEtBQUssR0FBRyxHQUFHLENBQUM7QUFFakIsUUFBTSxNQUFNLGNBQWMsR0FBRyxHQUFHLE1BQU0sT0FBTyxLQUFLLEdBQUcsQ0FBQztBQUN0RCxpQkFBZSxLQUFLLEtBQUssR0FBRztBQUM1QixNQUFJLE1BQU0sR0FBRyxJQUFJLFFBQVMsUUFBTyxVQUFVLEtBQUssQ0FBQztBQUNqRCxTQUFPLFVBQVUsS0FBSyxHQUFHO0FBQzdCO0FBT0EsU0FBUyxhQUFhLEdBQWUsR0FBVSxPQUE2QjtBQUN4RSxRQUFNLElBQUksRUFBRSxNQUFNO0FBQ2xCLFFBQU0sSUFBSSxFQUFFLE1BQU0sS0FBSztBQUN2QixRQUFNLElBQUksRUFBRSxPQUFPLFFBQVEsS0FBSyxDQUFDO0FBQ2pDLFFBQU0sUUFBUSxJQUFJLGNBQWMsYUFBYSxLQUFLLENBQUM7QUFFbkQsUUFBTSxNQUFZLENBQUM7QUFDbkIsUUFBTSxPQUFhLENBQUM7QUFDcEIsV0FBUyxJQUFJLEdBQUcsS0FBSyxZQUFZLEtBQUs7QUFDbEMsVUFBTSxJQUFJLElBQUk7QUFDZCxRQUFJLEtBQUssYUFBYSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDakMsU0FBSyxLQUFLLGNBQWMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQUEsRUFDdkM7QUFFQSxRQUFNLE1BQVksQ0FBQztBQUNuQixNQUFJLElBQUksVUFBVSxHQUFHLEdBQUcsZUFBZSxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDdEUsTUFBSSxNQUFNLENBQUMsSUFBSSxRQUFTLEtBQUksaUJBQWlCLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUMxRCxNQUFJLEtBQUssQ0FBQztBQUNWLFdBQVMsSUFBSSxHQUFHLElBQUksWUFBWSxLQUFLO0FBRWpDLFVBQU0sS0FBSyxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLFVBQU0sS0FBSyxJQUFJLElBQUksRUFBRTtBQUNyQixVQUFNLEtBQUssSUFBSSxDQUFDO0FBQ2hCLFVBQU0sS0FBSyxLQUFLLENBQUM7QUFDakIsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLLFVBQVUsU0FBUztBQUN4QixXQUFLLFlBQVksR0FBRyxHQUFHLElBQUksSUFBSyxLQUFLLEtBQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN0RCxXQUFLLFlBQVksR0FBRyxHQUFHLElBQUksSUFBSyxLQUFLLEtBQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBLElBQzFEO0FBQ0EsVUFBTSxLQUFLLElBQUksR0FBRyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNwQyxVQUFNLEtBQUssSUFBSSxJQUFJLEVBQUU7QUFDckIsUUFBSSxPQUFPO0FBQ1gsUUFBSSxLQUFLLFVBQVUsUUFBUyxRQUFPLFlBQVksR0FBRyxHQUFHLElBQUksSUFBSyxLQUFLLEtBQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNwRixXQUFPLFVBQVUsR0FBRyxHQUFHLGVBQWUsR0FBRyxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzlELFFBQUksTUFBTSxJQUFJLElBQUksUUFBUyxRQUFPLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ25ELFFBQUksS0FBSyxJQUFJO0FBQUEsRUFDakI7QUFHQSxRQUFNLFFBQVEsVUFBVSxHQUFHLEdBQUcsZUFBZSxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLENBQUM7QUFDckYsTUFBSSxRQUFRO0FBQ1osTUFBSSxNQUFNLEtBQUssSUFBSSxTQUFTO0FBQ3hCLFVBQU0sT0FBTyxJQUFJLFVBQVU7QUFDM0IsVUFBTUMsS0FBSSxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUs7QUFDakMsWUFBUSxLQUFLLE1BQU0sSUFBSUEsSUFBRyxLQUFLLFVBQVUsQ0FBQyxHQUFHLElBQUksTUFBTSxLQUFLLENBQUM7QUFBQSxFQUNqRTtBQUNBLFFBQU0sSUFBSSxHQUFHO0FBQ2IsV0FBUyxJQUFJLEdBQUcsS0FBSyxZQUFZLEtBQUs7QUFDbEMsUUFBSSxJQUFJLElBQUksQ0FBQztBQUNiLFFBQUksVUFBVSxHQUFHO0FBQ2IscUJBQWUsR0FBRyxLQUFLLENBQUMsR0FBSSxRQUFRLElBQUssVUFBVTtBQUNuRCxVQUFJLFFBQVEsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQzFCO0FBQ0EsVUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2pCLFVBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ3JCLFVBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQUEsRUFDekI7QUFDQSxTQUFPO0FBQ1g7QUFZTyxTQUFTLGFBQWEsR0FBZSxPQUFvQixHQUFzQjtBQUNsRixRQUFNLE1BQXFCLEVBQUUsR0FBRyxHQUFHLE9BQU8sR0FBRyxRQUFRLEdBQUcsVUFBVSxHQUFHLEdBQUcsVUFBVSxTQUFTO0FBQzNGLE1BQUksQ0FBQyxFQUFFLE1BQU0sT0FBUSxRQUFPO0FBQzVCLE1BQUksQ0FBQyxNQUFNLE9BQU8sUUFBUTtBQUN0QixTQUFLLElBQUksVUFBVSxFQUFFLE1BQU0sQ0FBQyxFQUFFLFFBQVE7QUFDdEMsUUFBSSxXQUFXLEtBQUssR0FBRyxJQUFJLFFBQVE7QUFDbkMsV0FBTztBQUFBLEVBQ1g7QUFDQSxNQUFJLE9BQU87QUFDWCxXQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sT0FBTyxRQUFRLEtBQUs7QUFDMUMsVUFBTSxJQUFJLFNBQVMsTUFBTSxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRTtBQUM3QyxRQUFJLEVBQUUsU0FBUyxNQUFNO0FBQ2pCLGFBQU8sRUFBRTtBQUNULFVBQUksUUFBUTtBQUNaLFVBQUksU0FBUyxFQUFFO0FBQUEsSUFDbkI7QUFBQSxFQUNKO0FBQ0EsZUFBYSxJQUFJLFVBQVUsTUFBTSxPQUFPLElBQUksS0FBSyxHQUFHLElBQUksTUFBTTtBQUM5RCxNQUFJLFdBQVcsS0FBSyxLQUFLLElBQUk7QUFDN0IsTUFBSSxJQUFJLGNBQWMsT0FBTyxJQUFJLE9BQU8sSUFBSSxNQUFNO0FBQ2xELFNBQU87QUFDWDtBQWVPLFNBQVMsV0FBVyxHQUFlLE9BQWUsR0FBbUI7QUFDeEUsSUFBRSxNQUFNLE9BQU8sT0FBTyxHQUFHLENBQUM7QUFDMUIsZ0JBQWMsR0FBRyxLQUFLO0FBQzFCO0FBRU8sU0FBUyxXQUFXLEdBQWUsT0FBcUI7QUFDM0QsSUFBRSxNQUFNLE9BQU8sT0FBTyxDQUFDO0FBQ3ZCLFFBQU0sSUFBSSxFQUFFLE1BQU07QUFDbEIsTUFBSSxDQUFDLEVBQUc7QUFDUixRQUFNLE9BQU8sS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2xDLG1CQUFpQixHQUFHLFVBQVUsTUFBTSxHQUFHLEVBQUUsTUFBTSxDQUFDO0FBQ2hELG1CQUFpQixHQUFHLElBQUk7QUFDNUI7QUFNTyxTQUFTLGNBQWMsR0FBZSxZQUFvQixHQUFXQyxVQUEwQjtBQUNsRyxRQUFNLElBQUksRUFBRSxNQUFNO0FBQ2xCLFFBQU0sS0FBSztBQUNYLFFBQU0sTUFBTSxhQUFhLEtBQUs7QUFDOUIsUUFBTSxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLFFBQU0sSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNwQixRQUFNLElBQUksU0FBUyxHQUFHLFVBQVU7QUFDaEMsUUFBTSxPQUFPLE1BQU07QUFDbkIsUUFBTSxRQUFRLE1BQU07QUFDcEIsUUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLO0FBRXZCLFFBQU0sSUFBSUEsU0FBUSxLQUFLO0FBQ3ZCLE9BQUssRUFBRSxVQUFVLEtBQUssRUFBRTtBQUN4QixJQUFFLFVBQVU7QUFFWixRQUFNLFdBQVcsRUFBRSxTQUFTLHNCQUEwQixFQUFFLFNBQVM7QUFDakUsUUFBTSxhQUFhLEVBQUUsU0FBUyxrQkFBc0IsRUFBRSxTQUFTO0FBRy9ELFFBQU0sS0FBSyxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLFFBQU0sTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQzFCLE9BQUssSUFBSSxJQUFJLEtBQUssQ0FBQztBQUNuQixRQUFNLFNBQVMsSUFBSSxHQUFHLEdBQUcsTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUMzQyxlQUFhLEVBQUUsVUFBVSxNQUFNLE1BQU0sSUFBSSxVQUFVLFNBQVMsSUFBSSxHQUFHLEdBQUcsTUFBTSxJQUFJLEtBQUssRUFBRSxHQUFHLEVBQUU7QUFFNUYsTUFBSSxVQUFVO0FBQ1YsTUFBRSxPQUFPO0FBQUEsRUFDYixXQUFXLFlBQVk7QUFDbkIsTUFBRSxPQUFPO0FBQUEsRUFDYixPQUFPO0FBRUgsUUFBSSxFQUFFLFNBQVMsaUJBQXNCLEdBQUUsT0FBTztBQUM5QyxRQUFJLEVBQUUsU0FBUyxpQkFBc0IsR0FBRSxPQUFPO0FBQzlDLFFBQUksaUJBQWlCLEVBQUUsSUFBSSxHQUFHO0FBQzFCLGNBQVEsRUFBRSxZQUFZLFFBQVEsR0FBRyxHQUFHLEVBQUUsUUFBUSxHQUFHLElBQUksR0FBRyxHQUFHLEtBQUssSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUFBLElBQ2hGO0FBQ0EsUUFBSSxpQkFBaUIsRUFBRSxJQUFJLEdBQUc7QUFDMUIsY0FBUSxFQUFFLFdBQVcsUUFBUSxHQUFHLEdBQUcsRUFBRSxRQUFRLEdBQUcsSUFBSSxHQUFHLEdBQUcsTUFBTSxJQUFJLE1BQU0sRUFBRSxDQUFDO0FBQUEsSUFDakY7QUFDQSxNQUFFLE9BQU87QUFDVCxVQUFNLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRSxRQUFRO0FBQ3BDLFlBQVEsRUFBRSxXQUFXLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ3JELFlBQVEsRUFBRSxZQUFZLEtBQUssSUFBSSxHQUFHLEdBQUcsTUFBTSxJQUFJLE1BQU0sRUFBRSxDQUFDO0FBQUEsRUFDNUQ7QUFDQSxRQUFNLFFBQVEsS0FBSztBQUNuQixJQUFFLE1BQU0sT0FBTyxPQUFPLEdBQUcsQ0FBQztBQUMxQixtQkFBaUIsR0FBRyxLQUFLO0FBQ3pCLFFBQU0sSUFBSSxFQUFFLE1BQU07QUFDbEIsUUFBTSxJQUFJLFVBQVUsT0FBTyxHQUFHLEVBQUUsTUFBTTtBQUN0QyxRQUFNLElBQUksVUFBVSxPQUFPLEdBQUcsRUFBRSxNQUFNO0FBQ3RDLE1BQUksRUFBRSxNQUFNLENBQUMsRUFBRSxTQUFTLG1CQUF3QixrQkFBaUIsR0FBRyxDQUFDO0FBQ3JFLE1BQUksRUFBRSxNQUFNLENBQUMsRUFBRSxTQUFTLG1CQUF3QixrQkFBaUIsR0FBRyxDQUFDO0FBQ3JFLFNBQU87QUFDWDtBQUVBLElBQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFHbkIsU0FBUyxZQUFZLEdBQXFCO0FBQzdDLElBQUUsTUFBTSxRQUFRO0FBQ2hCLGFBQVcsS0FBSyxFQUFFLE9BQU87QUFFckIsVUFBTSxRQUFRLFFBQVEsR0FBRyxHQUFHLE1BQU0sRUFBRSxTQUFTO0FBQzdDLFVBQU0sU0FBUyxRQUFRLEdBQUcsR0FBRyxNQUFNLEVBQUUsVUFBVTtBQUMvQyxTQUFLLEVBQUUsV0FBVyxNQUFNO0FBQ3hCLFNBQUssRUFBRSxZQUFZLEtBQUs7QUFDeEIsU0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLElBQUk7QUFBQSxFQUNyQztBQUNBLGFBQVcsQ0FBQztBQUNoQjtBQUVPLFNBQVMsVUFBVSxHQUFlLFFBQXVCO0FBQzVELElBQUUsU0FBUztBQUNYLFFBQU0sSUFBSSxFQUFFLE1BQU07QUFDbEIsTUFBSSxDQUFDLEVBQUc7QUFDUixtQkFBaUIsR0FBRyxDQUFDO0FBQ3JCLG1CQUFpQixHQUFHLElBQUksQ0FBQztBQUM3QjtBQVNPLFNBQVMsUUFBUSxHQUFZLEdBQXFCO0FBQ3JELFNBQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRTtBQUNqRDtBQUVBLFNBQVMsUUFBUSxHQUFrQixHQUE2QjtBQUM1RCxhQUFXLEtBQUssRUFBRSxPQUFPO0FBQ3JCLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLE1BQU0sUUFBUSxLQUFLLEdBQUc7QUFDNUMsVUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFNLFFBQU87QUFBQSxJQUNyRTtBQUFBLEVBQ0o7QUFDQSxTQUFPO0FBQ1g7QUFHTyxTQUFTLFlBQVksR0FBa0IsR0FBdUI7QUFDakUsUUFBTSxJQUFJLFFBQVEsR0FBRyxDQUFDO0FBQ3RCLE1BQUksQ0FBQyxFQUFHLFFBQU8sQ0FBQztBQUNoQixRQUFNLE1BQWlCLENBQUM7QUFDeEIsV0FBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsTUFBTSxRQUFRLEtBQUssR0FBRztBQUM1QyxVQUFNLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUU7QUFDckQsUUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUcsS0FBSSxLQUFLLENBQUM7QUFBQSxFQUNsQztBQUNBLFNBQU87QUFDWDtBQU9PLFNBQVMsVUFBVSxHQUFrQixNQUFpQkMsVUFBd0I7QUFDakYsTUFBSSxLQUFLLFNBQVMsRUFBRztBQUNyQixRQUFNLFVBQXFCLENBQUM7QUFDNUIsUUFBTUMsT0FBTSxDQUFDLE1BQWU7QUFDeEIsUUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFHLFNBQVEsS0FBSyxDQUFDO0FBQUEsRUFDM0Q7QUFDQSxhQUFXLEtBQUssTUFBTTtBQUNsQixVQUFNQyxLQUFJLFFBQVEsR0FBRyxDQUFDO0FBQ3RCLFFBQUlBLElBQUc7QUFDSCxlQUFTLElBQUksR0FBRyxJQUFJLElBQUlBLEdBQUUsTUFBTSxRQUFRLEtBQUssRUFBRyxDQUFBRCxLQUFJLEVBQUUsUUFBUUMsR0FBRSxNQUFNLENBQUMsR0FBRyxNQUFNQSxHQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUNoRyxRQUFFLE1BQU0sT0FBTyxFQUFFLE1BQU0sUUFBUUEsRUFBQyxHQUFHLENBQUM7QUFBQSxJQUN4QztBQUNBLElBQUFELEtBQUksQ0FBQztBQUFBLEVBQ1Q7QUFDQSxRQUFNLElBQUlELFNBQVEsS0FBSztBQUN2QixJQUFFLE1BQU0sU0FBUztBQUNqQixhQUFXLEtBQUssUUFBUyxHQUFFLE1BQU0sS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJO0FBQ3RELElBQUUsTUFBTSxLQUFLLENBQUM7QUFFZCxRQUFNLElBQUksRUFBRSxRQUFRLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRTtBQUN4RCxhQUFXLEtBQUssU0FBUztBQUNyQixRQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFHO0FBQ3pCLG9CQUFnQixFQUFFLFFBQVEsRUFBRSxNQUFNLEdBQUcsRUFBRSxNQUFNLENBQUM7QUFBQSxFQUNsRDtBQUNKO0FBRU8sU0FBUyxZQUFZLEdBQWtCLE1BQXVCO0FBQ2pFLGFBQVcsS0FBSyxNQUFNO0FBQ2xCLFVBQU0sSUFBSSxRQUFRLEdBQUcsQ0FBQztBQUN0QixRQUFJLENBQUMsRUFBRztBQUNSLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLE1BQU0sUUFBUSxLQUFLLEdBQUc7QUFDNUMsVUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNO0FBQ3RELFVBQUUsTUFBTSxPQUFPLEdBQUcsQ0FBQztBQUNuQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQ0EsUUFBSSxFQUFFLE1BQU0sU0FBUyxFQUFHLEdBQUUsTUFBTSxPQUFPLEVBQUUsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDaEU7QUFDSjtBQUdPLFNBQVMsV0FBVyxHQUFrQixHQUFrQjtBQUMzRCxRQUFNLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDNUMsYUFBVyxLQUFLLFlBQVksR0FBRyxDQUFDLEdBQUc7QUFDL0IsVUFBTSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU07QUFDNUIsUUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUc7QUFDNUIsb0JBQWdCLEdBQUcsRUFBRSxNQUFNLENBQUM7QUFBQSxFQUNoQztBQUNKO0FBRUEsU0FBUyxhQUFhLEdBQWtCLEtBQTJDO0FBQy9FLFdBQVMsS0FBSyxFQUFFLE1BQU0sU0FBUyxHQUFHLE1BQU0sR0FBRyxNQUFNO0FBQzdDLFVBQU0sSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNwQixVQUFNLE9BQWlCLENBQUM7QUFDeEIsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsTUFBTSxRQUFRLEtBQUssR0FBRztBQUM1QyxZQUFNLElBQUksSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQzFELFVBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLEdBQUcsTUFBTSxJQUFJLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRyxNQUFLLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSTtBQUFBLElBQzVIO0FBQ0EsUUFBSSxLQUFLLFNBQVMsRUFBRyxHQUFFLE1BQU0sT0FBTyxJQUFJLENBQUM7QUFBQSxTQUNwQztBQUNELFFBQUUsTUFBTSxTQUFTO0FBQ2pCLFFBQUUsTUFBTSxLQUFLLEdBQUcsSUFBSTtBQUFBLElBQ3hCO0FBQUEsRUFDSjtBQUNKO0FBR08sU0FBUyxvQkFBb0IsR0FBa0JHLFNBQWdCQyxPQUFvQjtBQUN0RixlQUFhLEdBQUcsQ0FBQyxNQUFPLEVBQUUsV0FBV0QsV0FBVSxFQUFFLFFBQVFDLFFBQU8sRUFBRSxRQUFBRCxTQUFRLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFFO0FBQ3JHO0FBR08sU0FBUyxtQkFBbUIsR0FBa0JBLFNBQWdCQyxPQUFvQjtBQUNyRixlQUFhLEdBQUcsQ0FBQyxNQUFNO0FBQ25CLFFBQUksRUFBRSxXQUFXRCxRQUFRLFFBQU87QUFDaEMsUUFBSSxFQUFFLFNBQVNDLE1BQU0sUUFBTztBQUM1QixXQUFPLEVBQUUsT0FBT0EsUUFBTyxFQUFFLFFBQUFELFNBQVEsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJO0FBQUEsRUFDMUQsQ0FBQztBQUNMO0FBRU8sU0FBUyxxQkFBcUIsR0FBa0JBLFNBQXNCO0FBQ3pFLGVBQWEsR0FBRyxDQUFDLE1BQU07QUFDbkIsUUFBSSxFQUFFLFdBQVdBLFFBQVEsUUFBTztBQUNoQyxXQUFPLEVBQUUsU0FBU0EsVUFBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEdBQUcsTUFBTSxFQUFFLEtBQUssSUFBSTtBQUFBLEVBQ3hFLENBQUM7QUFDTDtBQUVPLFNBQVMsZ0JBQWdCLEdBQWtCQSxTQUFnQixPQUFxQjtBQUNuRixlQUFhLEdBQUcsQ0FBQyxNQUFPLEVBQUUsV0FBV0EsVUFBUyxFQUFFLFFBQUFBLFNBQVEsTUFBTSxRQUFRLElBQUksRUFBRSxLQUFLLElBQUksQ0FBRTtBQUMzRjtBQUdPLFNBQVMsb0JBQW9CLEdBQWtCQSxTQUFnQixPQUFlLEdBQW1CO0FBQ3BHLHNCQUFvQixHQUFHQSxTQUFRLEtBQUs7QUFDcEMsYUFBVyxFQUFFLFFBQVFBLE9BQU0sR0FBRyxPQUFPLENBQUM7QUFDMUM7QUFhTyxTQUFTLHFCQUFxQixHQUFrQixNQUF1QjtBQUMxRSxRQUFNLFNBQVMsQ0FBQyxHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVksRUFBRSxPQUFPLEVBQUUsSUFBSztBQUNsRixhQUFXLEtBQUssUUFBUTtBQUNwQixVQUFNLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTTtBQUM1QixRQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQVE7QUFDcEMsZUFBVyxHQUFHLEVBQUUsSUFBSTtBQUNwQix1QkFBbUIsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJO0FBQ3RDLFFBQUksRUFBRSxNQUFNLFNBQVMsS0FBSyxFQUFFLE9BQVEsR0FBRSxTQUFTO0FBQUEsRUFDbkQ7QUFDQSxXQUFTLElBQUksRUFBRSxRQUFRLFNBQVMsR0FBRyxLQUFLLEdBQUcsS0FBSztBQUM1QyxRQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUUsTUFBTSxXQUFXLEtBQUssRUFBRSxRQUFRLFNBQVMsR0FBRztBQUN6RCxRQUFFLFFBQVEsT0FBTyxHQUFHLENBQUM7QUFDckIsMkJBQXFCLEdBQUcsQ0FBQztBQUFBLElBQzdCO0FBQUEsRUFDSjtBQUNKO0FBRU8sU0FBUyxpQkFBaUIsR0FBa0JFLFNBQXNCO0FBQ3JFLFFBQU0sSUFBSSxFQUFFLFFBQVFBLE9BQU07QUFDMUIsa0JBQWdCLEdBQUdBLFNBQVEsRUFBRSxNQUFNLE1BQU07QUFDekMsY0FBWSxDQUFDO0FBQ2pCO0FBT0EsU0FBUyxVQUFVLEdBQWFDLFVBQTRCO0FBQ3hELFNBQU8sU0FBU0EsU0FBUSxLQUFLLEdBQUcsQ0FBQztBQUNyQztBQVFPLFNBQVMsVUFBVSxHQUFrQixHQUFZQSxVQUFrQztBQUN0RixRQUFNLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTTtBQUM1QixRQUFNLElBQUksRUFBRSxNQUFNO0FBQ2xCLE1BQUksRUFBRSxRQUFRO0FBRVYsVUFBTSxRQUFvQixDQUFDO0FBQzNCLGFBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFLLE9BQU0sS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEtBQUssQ0FBQyxDQUFDO0FBQ2hFLGlCQUFhLEdBQUcsQ0FBQyxNQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxNQUFNLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFFO0FBQ3pHLE1BQUUsTUFBTSxTQUFTO0FBQ2pCLE1BQUUsTUFBTSxLQUFLLEdBQUcsT0FBTyxVQUFVLE1BQU0sQ0FBQyxHQUFHQSxRQUFPLENBQUM7QUFDbkQsTUFBRSxTQUFTO0FBQ1gsZUFBVyxDQUFDO0FBQ1osVUFBTSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsTUFBTSxFQUFFO0FBQzFDLFVBQU0sT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLE1BQU0sRUFBRTtBQUN6QyxjQUFVLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBR0EsUUFBTztBQUNuQyxXQUFPO0FBQUEsRUFDWDtBQUNBLE1BQUksRUFBRSxRQUFRLEtBQUssRUFBRSxRQUFRLElBQUksRUFBRyxRQUFPO0FBQzNDLFFBQU0sT0FBT0EsU0FBUSxPQUFPO0FBQzVCLE9BQUssU0FBUztBQUNkLE9BQUssTUFBTSxTQUFTO0FBQ3BCLE9BQUssTUFBTSxLQUFLLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxHQUFHQSxRQUFPLEdBQUcsR0FBRyxFQUFFLE1BQU0sTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pGLFFBQU0sWUFBWSxFQUFFLFFBQVE7QUFFNUIsZUFBYSxHQUFHLENBQUMsTUFBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLFdBQVcsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBRTtBQUNwSCxJQUFFLE1BQU0sU0FBUyxFQUFFLE9BQU87QUFDMUIsSUFBRSxRQUFRLEtBQUssSUFBSTtBQUNuQixhQUFXLENBQUM7QUFDWixhQUFXLElBQUk7QUFDZixRQUFNLFVBQVUsRUFBRSxRQUFRLFdBQVcsTUFBTSxFQUFFO0FBQzdDLFlBQVUsR0FBRyxDQUFDLEdBQUcsT0FBTyxHQUFHQSxRQUFPO0FBQ2xDLFNBQU87QUFDWDtBQUVPLFNBQVMsVUFBVSxHQUFlQyxPQUF1QjtBQUM1RCxTQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxTQUFTLE1BQU1BLFVBQVMsS0FBS0EsVUFBUyxFQUFFLE1BQU0sU0FBUztBQUN2RjtBQVFPLFNBQVMsVUFBVSxHQUFrQixHQUFZLEdBQVlELFVBQWtDO0FBQ2xHLFFBQU0sS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNO0FBQzdCLFFBQU0sS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNO0FBQzdCLE1BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLFVBQVUsSUFBSSxFQUFFLElBQUksRUFBRyxRQUFPO0FBQzNFLE1BQUksRUFBRSxXQUFXLEVBQUUsUUFBUTtBQUN2QixRQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsR0FBRyxNQUFNLFNBQVMsRUFBRyxRQUFPO0FBRXJELFVBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQztBQUN4QixVQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUM7QUFDekMsUUFBSSxPQUFPLE1BQU0sVUFBVSxLQUFLLFFBQVEsSUFBSSxTQUFTO0FBQ2pELFdBQUssTUFBTSxXQUFXLEtBQUssU0FBUztBQUNwQyx5QkFBbUIsR0FBRyxFQUFFLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQztBQUNuRCxTQUFHLE1BQU0sSUFBSTtBQUFBLElBQ2pCO0FBQ0EsY0FBVSxJQUFJLElBQUk7QUFDbEIsV0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLE1BQU0sRUFBRSxTQUFTLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsRUFBRTtBQUFBLEVBQzlGO0FBRUEsTUFBSSxFQUFFLFNBQVMsR0FBRztBQUNkLHFCQUFpQixHQUFHLEVBQUUsTUFBTTtBQUM1QixRQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsTUFBTSxHQUFHLE1BQU0sU0FBUyxFQUFFO0FBQUEsRUFDdEQ7QUFDQSxNQUFJLEVBQUUsU0FBUyxHQUFHO0FBQ2QscUJBQWlCLEdBQUcsRUFBRSxNQUFNO0FBQzVCLFFBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxNQUFNLEVBQUU7QUFBQSxFQUNwQztBQUNBLFFBQU0sS0FBSyxHQUFHLE1BQU0sRUFBRSxJQUFJO0FBQzFCLFFBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQztBQUVyQixRQUFNLFdBQVcsY0FBYyxHQUFHLEdBQUcsRUFBRTtBQUN2QyxNQUFJLEdBQUcsU0FBUyxrQkFBc0IsR0FBRyxTQUFTLGVBQW9CLElBQUcsT0FBTztBQUNoRixNQUFJLGlCQUFpQixHQUFHLElBQUksR0FBRztBQUMzQixPQUFHLE9BQU87QUFDVixZQUFRLEdBQUcsWUFBWSxRQUFRLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxRQUFRO0FBQUEsRUFDL0Q7QUFDQSxRQUFNLFNBQVMsR0FBRyxNQUFNLFNBQVM7QUFDakMsUUFBTSxTQUFTLEVBQUU7QUFFakIsZUFBYSxHQUFHLENBQUMsTUFBTTtBQUNuQixRQUFJLEVBQUUsV0FBVyxPQUFRLFFBQU87QUFDaEMsUUFBSSxFQUFFLFNBQVMsRUFBRyxRQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsTUFBTSxFQUFFLEtBQUs7QUFDMUQsV0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLE1BQU0sU0FBUyxFQUFFLEtBQUs7QUFBQSxFQUNyRCxDQUFDO0FBQ0QsS0FBRyxNQUFNLEtBQUssR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLENBQUM7QUFDbEMsSUFBRSxRQUFRLE9BQU8sUUFBUSxDQUFDO0FBQzFCLGVBQWEsR0FBRyxDQUFDLE1BQU8sRUFBRSxTQUFTLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxHQUFHLE1BQU0sRUFBRSxLQUFLLElBQUksQ0FBRTtBQUN2RixRQUFNLFVBQVUsRUFBRSxTQUFTLFNBQVMsRUFBRSxTQUFTLElBQUksRUFBRTtBQUNyRCxhQUFXLEVBQUUsUUFBUSxPQUFPLENBQUM7QUFDN0IsU0FBTyxFQUFFLFFBQVEsU0FBUyxNQUFNLEVBQUUsS0FBSztBQUMzQztBQWtCTyxTQUFTLFdBQVcsTUFBYyxHQUF5RjtBQUM5SCxRQUFNLElBQUksRUFBRTtBQUNaLFFBQU0sTUFBWSxDQUFDO0FBQ25CLFFBQU0sT0FBTyxDQUFDLEdBQVcsR0FBVyxJQUFJLE1BQVcsRUFBRSxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDeEYsVUFBUSxNQUFNO0FBQUEsSUFDVixLQUFLO0FBQ0QsVUFBSSxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzRCxhQUFPLEVBQUUsUUFBUSxLQUFLLE1BQU0sZ0JBQW9CLFFBQVEsS0FBSztBQUFBLElBQ2pFLEtBQUssa0JBQWtCO0FBQ25CLFlBQU0sSUFBSSxJQUFJO0FBQ2QsWUFBTSxJQUFJO0FBQ1YsVUFBSSxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0csYUFBTyxFQUFFLFFBQVEsS0FBSyxNQUFNLG9CQUF3QixRQUFRLEtBQUs7QUFBQSxJQUNyRTtBQUFBLElBQ0EsS0FBSyxVQUFVO0FBQ1gsZUFBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7QUFDeEIsY0FBTSxJQUFLLElBQUksSUFBSyxLQUFLLEtBQUs7QUFDOUIsWUFBSSxLQUFLLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQUEsTUFDbkQ7QUFFQSxhQUFPLEVBQUUsUUFBUSxLQUFLLE1BQU0sa0JBQXNCLFFBQVEsTUFBTSxjQUFjLE9BQU87QUFBQSxJQUN6RjtBQUFBLElBQ0EsS0FBSyxXQUFXO0FBQ1osWUFBTSxJQUFJLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzlDLGVBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ3hCLGNBQU0sSUFBSyxJQUFJLElBQUssS0FBSyxLQUFLLElBQUksS0FBSyxLQUFLO0FBQzVDLFlBQUksS0FBSyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUFBLE1BQ25EO0FBQ0EsYUFBTyxFQUFFLFFBQVEsS0FBSyxNQUFNLGdCQUFvQixRQUFRLEtBQUs7QUFBQSxJQUNqRTtBQUFBLElBQ0EsS0FBSyxRQUFRO0FBQ1QsWUFBTSxJQUFJLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzlDLGVBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxHQUFHLEtBQUs7QUFDNUIsY0FBTSxJQUFLLEtBQUssSUFBSSxLQUFNLEtBQUssS0FBSyxJQUFJLEtBQUssS0FBSztBQUNsRCxjQUFNLEtBQUssSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJO0FBQ2pDLFlBQUksS0FBSyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUFBLE1BQ3JEO0FBQ0EsYUFBTyxFQUFFLFFBQVEsS0FBSyxNQUFNLGdCQUFvQixRQUFRLEtBQUs7QUFBQSxJQUNqRTtBQUFBLElBQ0EsS0FBSyxTQUFTO0FBQ1YsWUFBTSxRQUFRLEtBQUssSUFBSSxNQUFNLEVBQUUsU0FBUyxDQUFDO0FBQ3pDLFlBQU0sU0FBUyxFQUFFLFVBQVUsSUFBSTtBQUMvQixZQUFNLFVBQVU7QUFDaEIsWUFBTSxJQUFJLEtBQUssTUFBTSxRQUFRLE9BQU87QUFDcEMsZUFBUyxJQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUs7QUFDekIsY0FBTSxJQUFLLElBQUksVUFBVyxLQUFLLEtBQUs7QUFDcEMsWUFBSSxLQUFLLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksR0FBSSxJQUFJLElBQUssTUFBTSxDQUFDO0FBQUEsTUFDckU7QUFDQSxhQUFPLEVBQUUsUUFBUSxLQUFLLE1BQU0sb0JBQXdCLFFBQVEsTUFBTTtBQUFBLElBQ3RFO0FBQUEsSUFDQSxLQUFLO0FBQUEsSUFDTDtBQUNJLFVBQUksS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNoQyxhQUFPLEVBQUUsUUFBUSxLQUFLLE1BQU0sb0JBQXdCLFFBQVEsTUFBTTtBQUFBLEVBQzFFO0FBQ0o7QUFHTyxTQUFTLFdBQVcsR0FBZSxNQUFjLEdBQWlCQSxVQUF3QjtBQUM3RixRQUFNLFFBQVEsV0FBVyxNQUFNLENBQUM7QUFDaEMsSUFBRSxNQUFNLFNBQVM7QUFDakIsSUFBRSxTQUFTLE1BQU07QUFDakIsUUFBTSxTQUFTLEVBQUUsVUFBVSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNuRCxRQUFNLElBQUksTUFBTSxPQUFPO0FBQ3ZCLFdBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ3hCLFVBQU0sSUFBSUEsU0FBUSxLQUFLO0FBQ3ZCLFNBQUssRUFBRSxVQUFVLE1BQU0sT0FBTyxDQUFDLENBQUM7QUFDaEMsUUFBSSxFQUFFLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDeEIsUUFBSSxFQUFFLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDekIsY0FBVSxFQUFFLFFBQVE7QUFDcEIsTUFBRSxPQUFPLE1BQU07QUFDZixNQUFFLFVBQVU7QUFDWixNQUFFLE1BQU0sS0FBSyxDQUFDO0FBQUEsRUFDbEI7QUFDQSxXQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUN4QixVQUFNLElBQUksRUFBRSxNQUFNLENBQUM7QUFDbkIsVUFBTSxPQUFPLEVBQUUsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFO0FBQ2hELFVBQU0sT0FBTyxFQUFFLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRTtBQUNoRCxVQUFNLE1BQU0sSUFBSSxHQUFHLEdBQUcsTUFBTSxJQUFJO0FBQ2hDLFFBQUksTUFBTSxHQUFHLElBQUksUUFBUyxLQUFJLEtBQUssTUFBTSxFQUFFLFFBQVE7QUFDbkQsaUJBQWEsRUFBRSxVQUFVLEtBQUssTUFBTTtBQUNwQyxRQUFJLE1BQU0sY0FBYztBQUNwQixZQUFNLElBQUksTUFBTSxlQUFlLEVBQUU7QUFDakMsVUFBSSxFQUFFLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUN6QixVQUFJLEVBQUUsWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQzdCO0FBQUEsRUFDSjtBQUNBLGFBQVcsQ0FBQztBQUNoQjs7O0FDeG1DQSxvQkFBbUI7QUFFWixJQUFNLFVBQVUsRUFBRSxRQUFRLEdBQUcsUUFBUSxFQUFFO0FBRXZDLFNBQVMsS0FBSyxNQUFjLElBQWdCO0FBQy9DLE1BQUk7QUFDQSxPQUFHO0FBQ0gsWUFBUTtBQUNSLFlBQVEsSUFBSSxVQUFVLElBQUksRUFBRTtBQUFBLEVBQ2hDLFNBQVMsR0FBRztBQUNSLFlBQVE7QUFDUixVQUFNLE1BQU07QUFDWixVQUFNLFNBQVMsZUFBZSxjQUFBRSxRQUFPLGlCQUFpQixJQUFJLFVBQVUsUUFBTywyQkFBSyxVQUFTLEdBQUcsRUFBRSxNQUFNLElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSTtBQUMvSCxZQUFRLElBQUksVUFBVSxJQUFJO0FBQUEsU0FBWSxPQUFPLE1BQU0sSUFBSSxFQUFFLEtBQUssV0FBVyxDQUFDLEVBQUU7QUFBQSxFQUNoRjtBQUNKOzs7QUpEQSxJQUFNLFVBQW1CO0FBQUEsRUFDckIsTUFBTSxPQUFpQixFQUFFLFVBQVUsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLFlBQVksR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHLDBCQUE4QixTQUFTLGdCQUFnQjtBQUFBLEVBQ25KLFFBQVEsT0FBbUIsRUFBRSxPQUFPLENBQUMsR0FBRyxRQUFRLE1BQU07QUFBQSxFQUN0RCxNQUFNLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRTtBQUM3QjtBQUVBLFNBQVMsS0FBSyxHQUFXLEdBQVcsR0FBVywyQkFBeUM7QUFDcEYsUUFBTSxJQUFJLFFBQVEsS0FBSztBQUN2QixJQUFFLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUN2QixJQUFFLE9BQU87QUFDVCxTQUFPO0FBQ1g7QUFFQSxTQUFTLE9BQU8sUUFBb0MsMkJBQStCLFNBQVMsT0FBbUI7QUFDM0csUUFBTSxJQUFnQixFQUFFLE9BQU8sT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLE9BQU87QUFDdkYsYUFBVyxDQUFDO0FBQ1osU0FBTztBQUNYO0FBRUEsU0FBUyxLQUFLLEdBQVcsR0FBVyxNQUFNLE1BQU0sTUFBTSxJQUFJO0FBQ3RELGlCQUFBQyxRQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBTSxHQUFHLEdBQUc7QUFDckU7QUFFQSxTQUFTLE1BQU0sR0FBTyxHQUFPLE1BQU0sTUFBTSxNQUFNLElBQUk7QUFDL0MsaUJBQUFBLFFBQU8sR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUssR0FBRyxHQUFHLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUc7QUFDOUY7QUFHQSxTQUFTLGFBQWEsR0FBZSxJQUFJLEtBQVc7QUFDaEQsUUFBTSxRQUFRLFdBQVcsR0FBRyxJQUFJLFlBQVksQ0FBQztBQUM3QyxRQUFNLE1BQVksQ0FBQztBQUNuQixXQUFTLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSyxLQUFJLEtBQUssaUJBQWlCLEdBQUcsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDN0UsU0FBTztBQUNYO0FBR0EsU0FBUyxjQUFjLEdBQVMsR0FBaUI7QUFDN0MsTUFBSSxRQUFRO0FBQ1osYUFBVyxLQUFLLEdBQUc7QUFDZixRQUFJLE9BQU87QUFDWCxhQUFTLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxRQUFRLEtBQUs7QUFDbkMsWUFBTSxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDbEMsWUFBTSxLQUFLLElBQUksR0FBRyxDQUFDO0FBQ25CLFVBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUs7QUFDbkQsVUFBSSxLQUFLLElBQUksR0FBRyxLQUFLLElBQUksR0FBRyxDQUFDLENBQUM7QUFDOUIsWUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7QUFDakUsYUFBTyxLQUFLLElBQUksTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQUEsSUFDcEM7QUFDQSxZQUFRLEtBQUssSUFBSSxPQUFPLElBQUk7QUFBQSxFQUNoQztBQUNBLFNBQU87QUFDWDtBQUVBLFFBQVEsSUFBSSxRQUFRO0FBRXBCLEtBQUssc0RBQXNELE1BQU07QUFDN0QsUUFBTSxJQUFJLGNBQWMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDdEQsUUFBTSxRQUFRLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNoRCxRQUFNLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELFFBQU0sS0FBSyxjQUFjLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZELFFBQU0sUUFBUSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUVELEtBQUssMkRBQTJELE1BQU07QUFDbEUsUUFBTSxJQUFJLFdBQVcsR0FBRyxHQUFHLElBQUksS0FBSyxFQUFFO0FBQ3RDLFFBQU0sSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQzFCLFFBQU0sS0FBSyxXQUFXLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUN6QyxRQUFNLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssTUFBTSxHQUFHLENBQUM7QUFDN0MsUUFBTSxJQUFJLFFBQVEsR0FBRyxHQUFHLElBQUksR0FBRyxLQUFLLE1BQU0sR0FBRyxDQUFDO0FBQzlDLFFBQU0sR0FBRyxHQUFHLElBQUk7QUFDcEIsQ0FBQztBQUVELFFBQVEsSUFBSSxVQUFVO0FBRXRCLEtBQUsseUJBQXlCLE1BQU07QUFDaEMsUUFBTSxJQUFJLE1BQU07QUFDaEIsSUFBRSxLQUFLLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBRyxJQUFFLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFHLElBQUUsS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUcsSUFBRSxLQUFLLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDN0UsUUFBTSxJQUFJLE1BQU07QUFDaEIsUUFBTSxJQUFJLE1BQU07QUFDaEIsUUFBTSxHQUFHLEtBQUssR0FBRyxDQUFDO0FBQ2xCLFdBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxLQUFLO0FBQzFCLFVBQU0sSUFBSSxJQUFJO0FBQ2QsVUFBTSxhQUFhLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxhQUFhLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUk7QUFDcEUsVUFBTSxhQUFhLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxhQUFhLEdBQUcsR0FBRyxHQUFHLE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSTtBQUFBLEVBQzlFO0FBQ0osQ0FBQztBQUVELEtBQUssK0NBQStDLE1BQU07QUFDdEQsUUFBTSxJQUFJLE1BQU07QUFDaEIsSUFBRSxLQUFLLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBRyxJQUFFLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFHLElBQUUsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDO0FBQUcsSUFBRSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUM7QUFDL0UsT0FBSyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUk7QUFDM0IsUUFBTSxNQUFN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LENBQUM7QUFFRCxLQUFLLHdCQUF3QixNQUFNO0FBQy9CLFFBQU0sSUFBSSxRQUFRLE9BQU87QUFDekIsYUFBVyxHQUFHLFNBQVMsRUFBRSxNQUFNLEdBQUcsT0FBTyxHQUFHLFFBQVEsRUFBRSxHQUFHLE9BQU87QUFDaEUsT0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQyxFQUFFLFNBQVMsR0FBRyxHQUFHLElBQUk7QUFDcEQsaUJBQUFBLFFBQU8sWUFBWSxFQUFFLFFBQVEsS0FBSztBQUN0QyxDQUFDO0FBRUQsS0FBSyw2REFBNkQsTUFBTTtBQUNwRSxRQUFNLElBQUksUUFBUSxPQUFPO0FBQ3pCLGFBQVcsR0FBRyxXQUFXLEVBQUUsTUFBTSxHQUFHLE9BQU8sRUFBRSxHQUFHLE9BQU87QUFDdkQsUUFBTSxRQUFRLFdBQVcsR0FBRyxJQUFJLFlBQVksQ0FBQztBQUM3QyxXQUFTLElBQUksR0FBRyxJQUFJLEVBQUUsTUFBTSxRQUFRLEtBQUs7QUFDckMsVUFBTSxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUUsVUFBVSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDMUQsVUFBTSxJQUFJLFNBQVMsR0FBRyxDQUFDO0FBQ3ZCLFVBQU0sUUFBUSxVQUFVLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7QUFDbkQsbUJBQUFBLFFBQU8sR0FBRyxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssUUFBUSxDQUFDLEVBQUU7QUFBQSxFQUNoRDtBQUlKLENBQUM7QUFFRCxRQUFRLElBQUk7QUFBQSxFQUFLLFFBQVEsTUFBTSxZQUFZLFFBQVEsTUFBTSxTQUFTO0FBQ2xFLFFBQVEsV0FBVyxRQUFRLFNBQVMsSUFBSTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2Fzc2VydCIsICJzIiwgInRlc3QiLCAidXAiLCAiYyIsICJmYWN0b3J5IiwgImZhY3RvcnkiLCAiYWRkIiwgImciLCAic3BsaW5lIiwgImtub3QiLCAic3BsaW5lIiwgImZhY3RvcnkiLCAia25vdCIsICJhc3NlcnQiLCAiYXNzZXJ0Il0KfQo=
