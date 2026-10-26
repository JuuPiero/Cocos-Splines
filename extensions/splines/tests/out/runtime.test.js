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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// tests/runtime.test.ts
var import_assert2 = __toESM(require("assert"));

// tests/stubs/cc.ts
var _Vec3 = class _Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    if (typeof x === "object") {
      const v = x;
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
    }
  }
  set(x = 0, y = 0, z = 0) {
    if (typeof x === "object") {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    return this;
  }
  clone() {
    return new _Vec3(this.x, this.y, this.z);
  }
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  lengthSqr() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.lengthSqr());
  }
  normalize() {
    const l = this.length();
    if (l > 0) {
      this.x /= l;
      this.y /= l;
      this.z /= l;
    }
    return this;
  }
  negative() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  equals(v, eps = 1e-6) {
    return Math.abs(this.x - v.x) <= eps && Math.abs(this.y - v.y) <= eps && Math.abs(this.z - v.z) <= eps;
  }
  static transformMat4(out, a, m) {
    const { x, y, z } = a;
    let w = m.m03 * x + m.m07 * y + m.m11 * z + m.m15;
    w = w ? 1 / w : 1;
    out.x = (m.m00 * x + m.m04 * y + m.m08 * z + m.m12) * w;
    out.y = (m.m01 * x + m.m05 * y + m.m09 * z + m.m13) * w;
    out.z = (m.m02 * x + m.m06 * y + m.m10 * z + m.m14) * w;
    return out;
  }
  static transformMat4Normal(out, a, m) {
    const { x, y, z } = a;
    out.x = m.m00 * x + m.m04 * y + m.m08 * z;
    out.y = m.m01 * x + m.m05 * y + m.m09 * z;
    out.z = m.m02 * x + m.m06 * y + m.m10 * z;
    return out;
  }
  static transformQuat(out, a, q) {
    const ix = q.w * a.x + q.y * a.z - q.z * a.y;
    const iy = q.w * a.y + q.z * a.x - q.x * a.z;
    const iz = q.w * a.z + q.x * a.y - q.y * a.x;
    const iw = -q.x * a.x - q.y * a.y - q.z * a.z;
    out.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;
    out.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;
    out.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;
    return out;
  }
  static normalize(out, a) {
    const l = Math.hypot(a.x, a.y, a.z);
    out.x = l ? a.x / l : 0;
    out.y = l ? a.y / l : 0;
    out.z = l ? a.z / l : 0;
    return out;
  }
  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
  static cross(out, a, b) {
    const x = a.y * b.z - a.z * b.y;
    const y = a.z * b.x - a.x * b.z;
    const z = a.x * b.y - a.y * b.x;
    out.x = x;
    out.y = y;
    out.z = z;
    return out;
  }
  static distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
  }
  static subtract(out, a, b) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    out.z = a.z - b.z;
    return out;
  }
  static lengthSqr(a) {
    return a.x * a.x + a.y * a.y + a.z * a.z;
  }
};
_Vec3.ZERO = Object.freeze(new _Vec3(0, 0, 0));
_Vec3.UNIT_X = Object.freeze(new _Vec3(1, 0, 0));
_Vec3.UNIT_Y = Object.freeze(new _Vec3(0, 1, 0));
_Vec3.UNIT_Z = Object.freeze(new _Vec3(0, 0, 1));
_Vec3.FORWARD = Object.freeze(new _Vec3(0, 0, -1));
var Vec3 = _Vec3;
var Vec2 = class _Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  clone() {
    return new _Vec2(this.x, this.y);
  }
};
var _Quat = class _Quat {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  set(x, y, z, w) {
    if (typeof x === "object") {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }
    return this;
  }
  clone() {
    return new _Quat(this.x, this.y, this.z, this.w);
  }
  static multiply(out, a, b) {
    const x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;
    const y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;
    const z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;
    const w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
  }
  static invert(out, a) {
    const d = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
    const inv = d ? 1 / d : 0;
    out.x = -a.x * inv;
    out.y = -a.y * inv;
    out.z = -a.z * inv;
    out.w = a.w * inv;
    return out;
  }
  static fromEuler(out, x, y, z) {
    const h = 0.5 * Math.PI / 180;
    x *= h;
    y *= h;
    z *= h;
    const sx = Math.sin(x), cx = Math.cos(x), sy = Math.sin(y), cy = Math.cos(y), sz = Math.sin(z), cz = Math.cos(z);
    out.x = sx * cy * cz + cx * sy * sz;
    out.y = cx * sy * cz + sx * cy * sz;
    out.z = cx * cy * sz - sx * sy * cz;
    out.w = cx * cy * cz - sx * sy * sz;
    return out;
  }
  /** Like Mat3.fromViewUp: +Z = view. */
  static fromViewUp(out, view, up = Vec3.UNIT_Y) {
    const x = Vec3.normalize(new Vec3(), Vec3.cross(new Vec3(), up, view));
    if (x.lengthSqr() < 1e-12) {
      out.x = 0;
      out.y = 0;
      out.z = 0;
      out.w = 1;
      return out;
    }
    const y = Vec3.cross(new Vec3(), view, x);
    const m00 = x.x, m01 = y.x, m02 = view.x;
    const m10 = x.y, m11 = y.y, m12 = view.y;
    const m20 = x.z, m21 = y.z, m22 = view.z;
    const trace = m00 + m11 + m22;
    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1);
      out.w = 0.25 / s;
      out.x = (m21 - m12) * s;
      out.y = (m02 - m20) * s;
      out.z = (m10 - m01) * s;
    } else if (m00 > m11 && m00 > m22) {
      const s = 2 * Math.sqrt(1 + m00 - m11 - m22);
      out.w = (m21 - m12) / s;
      out.x = 0.25 * s;
      out.y = (m01 + m10) / s;
      out.z = (m02 + m20) / s;
    } else if (m11 > m22) {
      const s = 2 * Math.sqrt(1 + m11 - m00 - m22);
      out.w = (m02 - m20) / s;
      out.x = (m01 + m10) / s;
      out.y = 0.25 * s;
      out.z = (m12 + m21) / s;
    } else {
      const s = 2 * Math.sqrt(1 + m22 - m00 - m11);
      out.w = (m10 - m01) / s;
      out.x = (m02 + m20) / s;
      out.y = (m12 + m21) / s;
      out.z = 0.25 * s;
    }
    return out;
  }
};
_Quat.IDENTITY = Object.freeze(new _Quat());
var Quat = _Quat;
var _Mat4 = class _Mat4 {
  constructor() {
    this.m00 = 1;
    this.m01 = 0;
    this.m02 = 0;
    this.m03 = 0;
    this.m04 = 0;
    this.m05 = 1;
    this.m06 = 0;
    this.m07 = 0;
    this.m08 = 0;
    this.m09 = 0;
    this.m10 = 1;
    this.m11 = 0;
    this.m12 = 0;
    this.m13 = 0;
    this.m14 = 0;
    this.m15 = 1;
  }
  static toArray(out, m) {
    const keys = ["m00", "m01", "m02", "m03", "m04", "m05", "m06", "m07", "m08", "m09", "m10", "m11", "m12", "m13", "m14", "m15"];
    keys.forEach((k, i) => out[i] = m[k]);
    return out;
  }
  static fromArray(out, a) {
    const keys = ["m00", "m01", "m02", "m03", "m04", "m05", "m06", "m07", "m08", "m09", "m10", "m11", "m12", "m13", "m14", "m15"];
    keys.forEach((k, i) => out[k] = a[i]);
    return out;
  }
  static multiply(out, a, b) {
    const A = _Mat4.toArray([], a);
    const B = _Mat4.toArray([], b);
    const R = new Array(16).fill(0);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += A[k * 4 + r] * B[c * 4 + k];
      R[c * 4 + r] = s;
    }
    return _Mat4.fromArray(out, R);
  }
  static invert(out, m) {
    const a = _Mat4.toArray([], m);
    const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = a;
    const b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) return _Mat4.fromArray(out, _Mat4.toArray([], _Mat4.IDENTITY));
    det = 1 / det;
    return _Mat4.fromArray(out, [
      (a11 * b11 - a12 * b10 + a13 * b09) * det,
      (a02 * b10 - a01 * b11 - a03 * b09) * det,
      (a31 * b05 - a32 * b04 + a33 * b03) * det,
      (a22 * b04 - a21 * b05 - a23 * b03) * det,
      (a12 * b08 - a10 * b11 - a13 * b07) * det,
      (a00 * b11 - a02 * b08 + a03 * b07) * det,
      (a32 * b02 - a30 * b05 - a33 * b01) * det,
      (a20 * b05 - a22 * b02 + a23 * b01) * det,
      (a10 * b10 - a11 * b08 + a13 * b06) * det,
      (a01 * b08 - a00 * b10 - a03 * b06) * det,
      (a30 * b04 - a31 * b02 + a33 * b00) * det,
      (a21 * b02 - a20 * b04 - a23 * b00) * det,
      (a11 * b07 - a10 * b09 - a12 * b06) * det,
      (a00 * b09 - a01 * b07 + a02 * b06) * det,
      (a31 * b01 - a30 * b03 - a32 * b00) * det,
      (a20 * b03 - a21 * b01 + a22 * b00) * det
    ]);
  }
  /** Translation * rotation * scale. */
  static fromRTS(out, q, t, s) {
    const { x, y, z, w } = q;
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
    return _Mat4.fromArray(out, [
      (1 - (yy + zz)) * s.x,
      (xy + wz) * s.x,
      (xz - wy) * s.x,
      0,
      (xy - wz) * s.y,
      (1 - (xx + zz)) * s.y,
      (yz + wx) * s.y,
      0,
      (xz + wy) * s.z,
      (yz - wx) * s.z,
      (1 - (xx + yy)) * s.z,
      0,
      t.x,
      t.y,
      t.z,
      1
    ]);
  }
};
_Mat4.IDENTITY = Object.freeze(new _Mat4());
var Mat4 = _Mat4;
var CCObject = {
  Flags: {
    DontSave: 1 << 3,
    EditorOnly: 1 << 4,
    LockedInEditor: 1 << 9,
    HideInHierarchy: 1 << 10
  }
};
var uuidSeq = 0;
function makeUuid(prefix = "id") {
  return `${prefix}-${++uuidSeq}`;
}
var Node = class {
  constructor(name = "Node") {
    this.uuid = makeUuid("node");
    this.parent = null;
    this.children = [];
    this.components = [];
    this.layer = 1;
    this.active = true;
    this.isValid = true;
    this._objFlags = 0;
    this.position = new Vec3();
    this.rotation = new Quat();
    this.scale = new Vec3(1, 1, 1);
    this.listeners = /* @__PURE__ */ new Map();
    this.name = name;
  }
  get activeInHierarchy() {
    return this.active && (!this.parent || this.parent.activeInHierarchy);
  }
  get scene() {
    let n = this;
    while (n.parent) n = n.parent;
    return n;
  }
  setParent(p) {
    if (this.parent) this.parent.children.splice(this.parent.children.indexOf(this), 1);
    this.parent = p;
    if (p) p.children.push(this);
  }
  get worldMatrix() {
    const local = Mat4.fromRTS(new Mat4(), this.rotation, this.position, this.scale);
    return this.parent && !this.parent.isScene ? Mat4.multiply(new Mat4(), this.parent.worldMatrix, local) : local;
  }
  get worldPosition() {
    const m = this.worldMatrix;
    return new Vec3(m.m12, m.m13, m.m14);
  }
  get worldRotation() {
    const local = this.rotation.clone();
    return this.parent && !this.parent.isScene ? Quat.multiply(new Quat(), this.parent.worldRotation, local) : local;
  }
  get forward() {
    return Vec3.transformQuat(new Vec3(), new Vec3(0, 0, -1), this.worldRotation);
  }
  get right() {
    return Vec3.transformQuat(new Vec3(), new Vec3(1, 0, 0), this.worldRotation);
  }
  get up() {
    return Vec3.transformQuat(new Vec3(), new Vec3(0, 1, 0), this.worldRotation);
  }
  setPosition(x, y, z) {
    this.position.set(x, y, z);
  }
  setWorldPosition(x, y, z) {
    const p = typeof x === "object" ? new Vec3(x.x, x.y, x.z) : new Vec3(x, y, z);
    if (this.parent && !this.parent.isScene) Vec3.transformMat4(p, p, Mat4.invert(new Mat4(), this.parent.worldMatrix));
    this.position.set(p);
  }
  setWorldRotation(x, y, z, w) {
    const q = typeof x === "object" ? new Quat(x.x, x.y, x.z, x.w) : new Quat(x, y, z, w);
    if (this.parent && !this.parent.isScene) Quat.multiply(q, Quat.invert(new Quat(), this.parent.worldRotation), q);
    this.rotation.set(q);
  }
  setScale(x, y, z) {
    this.scale.set(x, y, z);
  }
  // Loosely typed: the runtime classes are typed against the real engine.
  getComponent(C) {
    return this.components.find((c) => typeof C === "string" ? c.constructor.__cid === C : c instanceof C) ?? null;
  }
  addComponent(C) {
    const c = new C();
    c.node = this;
    this.components.push(c);
    c.__start();
    return c;
  }
  on(type, fn) {
    const l = this.listeners.get(type) || [];
    l.push(fn);
    this.listeners.set(type, l);
  }
  off(type, fn) {
    const l = this.listeners.get(type) || [];
    this.listeners.set(type, l.filter((f) => f !== fn));
  }
  hasEventListener(type) {
    return (this.listeners.get(type) || []).length > 0;
  }
  emit(type, ...args) {
    for (const f of this.listeners.get(type) || []) f(...args);
  }
  destroy() {
    this.isValid = false;
    for (const c of this.components) c.__destroy();
    this.setParent(null);
  }
};
var Component = class {
  constructor() {
    this.uuid = makeUuid("comp");
    this._enabled = true;
    this.isValid = true;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(v) {
    var _a, _b;
    if (v === this._enabled) return;
    this._enabled = v;
    if (v) (_a = this.onEnable) == null ? void 0 : _a.call(this);
    else (_b = this.onDisable) == null ? void 0 : _b.call(this);
  }
  get enabledInHierarchy() {
    return this._enabled && this.node.activeInHierarchy;
  }
  getComponent(C) {
    return this.node.getComponent(C);
  }
  __start() {
    var _a, _b;
    (_a = this.onLoad) == null ? void 0 : _a.call(this);
    if (this._enabled) (_b = this.onEnable) == null ? void 0 : _b.call(this);
  }
  __destroy() {
    var _a, _b;
    if (this._enabled) (_a = this.onDisable) == null ? void 0 : _a.call(this);
    (_b = this.onDestroy) == null ? void 0 : _b.call(this);
    this.isValid = false;
  }
  destroy() {
    this.__destroy();
    this.node.components.splice(this.node.components.indexOf(this), 1);
  }
};
var classes = /* @__PURE__ */ new Map();
function ccclass(name) {
  return (ctor) => {
    ctor.__cid = name;
    classes.set(name, ctor);
    return ctor;
  };
}
var noopDecorator = (..._a) => (..._b) => void 0;
function property(...args) {
  if (args.length >= 2 && typeof args[1] === "string") return void 0;
  return () => void 0;
}
var _decorator = {
  ccclass,
  property,
  executeInEditMode: (ctor) => ctor,
  disallowMultiple: (ctor) => ctor,
  menu: noopDecorator,
  requireComponent: noopDecorator
};
function ccenum(_e) {
  return _e;
}
var CCInteger = "Integer";
var js = {
  getClassByName(name) {
    return classes.get(name) ?? null;
  }
};
var EventHandler = class {
  static emitEvents(_handlers, ..._args) {
  }
};
var Material = class {
  initialize(_info) {
  }
};
var Mesh = class {
  constructor(geometry) {
    this.geometry = geometry;
  }
  destroy() {
  }
};
var MeshRenderer = class extends Component {
  constructor() {
    super(...arguments);
    this.mesh = null;
    this.materials = [];
    this.shadowCastingMode = 0;
    this.receiveShadow = 0;
  }
  setSharedMaterial(m, i) {
    this.materials[i] = m;
  }
};
var Prefab = class {
  constructor(data) {
    this.data = data;
  }
};
function instantiate(p) {
  const n = new Node(p.data.name);
  n.scale.set(p.data.scale);
  return n;
}
var utils = {
  MeshUtils: {
    createMesh(geometry) {
      return new Mesh(geometry);
    }
  }
};
var directorListeners = /* @__PURE__ */ new Map();
var totalFrames = 0;
var director = {
  root: null,
  _scene: null,
  getScene() {
    return this._scene;
  },
  getTotalFrames() {
    return totalFrames;
  },
  getTotalTime() {
    return totalFrames * 16;
  },
  on(type, fn) {
    const l = directorListeners.get(type) || [];
    l.push(fn);
    directorListeners.set(type, l);
  },
  off(type, fn) {
    directorListeners.set(type, (directorListeners.get(type) || []).filter((f) => f !== fn));
  },
  /** Test helper: one editor frame. */
  tick() {
    for (const f of directorListeners.get("director_before_commit") || []) f();
    totalFrames++;
  }
};

// tests/stubs/cc-env.ts
var EDITOR = true;

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
var TangentMode = /* @__PURE__ */ ((TangentMode2) => {
  TangentMode2[TangentMode2["AutoSmooth"] = 0] = "AutoSmooth";
  TangentMode2[TangentMode2["Linear"] = 1] = "Linear";
  TangentMode2[TangentMode2["Mirrored"] = 2] = "Mirrored";
  TangentMode2[TangentMode2["Continuous"] = 3] = "Continuous";
  TangentMode2[TangentMode2["Broken"] = 4] = "Broken";
  return TangentMode2;
})(TangentMode || {});
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
function setTension(s, i, tension) {
  s.knots[i].tension = tension;
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
function tAtDistanceFrom(s, cache, fromT, distance) {
  if (cache.total <= EPSILON) return clamp01(fromT);
  const t = fromT + distance / cache.total;
  return s.closed ? wrap(t, 1) : clamp01(t);
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
function insertOnCurve(s, curveIndex, t, factory) {
  const n = s.knots.length;
  const ia = curveIndex;
  const ib = (curveIndex + 1) % n;
  const a = s.knots[ia];
  const b = s.knots[ib];
  const c = getCurve(s, curveIndex);
  const left = curve();
  const right = curve();
  split(c, t, left, right);
  const k = factory.knot();
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
function isLinked(c, r) {
  return !!groupOf(c, r);
}
function linkKnots(c, refs, factory) {
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
  const g = factory.link();
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
function linksOnKnotInserted(c, spline, knot) {
  rewriteLinks(c, (r) => r.spline === spline && r.knot >= knot ? { spline, knot: r.knot + 1 } : r);
}
function linksOnKnotRemoved(c, spline, knot) {
  rewriteLinks(c, (r) => {
    if (r.spline !== spline) return r;
    if (r.knot === knot) return null;
    return r.knot > knot ? { spline, knot: r.knot - 1 } : r;
  });
}
function linksOnSplineRemoved(c, spline) {
  rewriteLinks(c, (r) => {
    if (r.spline === spline) return null;
    return r.spline > spline ? { spline: r.spline - 1, knot: r.knot } : r;
  });
}
function linksOnReversed(c, spline, count) {
  rewriteLinks(c, (r) => r.spline === spline ? { spline, knot: count - 1 - r.knot } : r);
}
function containerInsertKnot(c, spline, index, k) {
  linksOnKnotInserted(c, spline, index);
  insertKnot(c.splines[spline], index, k);
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
function containerReverse(c, spline) {
  const s = c.splines[spline];
  linksOnReversed(c, spline, s.knots.length);
  reverseFlow(s);
}
function containerRemoveSpline(c, spline) {
  c.splines.splice(spline, 1);
  linksOnSplineRemoved(c, spline);
}
function cloneKnot(k, factory) {
  return copyKnot(factory.knot(), k);
}
function splitKnot(c, r, factory) {
  const s = c.splines[r.spline];
  const n = s.knots.length;
  if (s.closed) {
    const order = [];
    for (let i = 0; i < n; i++) order.push(s.knots[(r.knot + i) % n]);
    rewriteLinks(c, (o) => o.spline === r.spline ? { spline: o.spline, knot: wrap(o.knot - r.knot, n) } : o);
    s.knots.length = 0;
    s.knots.push(...order, cloneKnot(order[0], factory));
    s.closed = false;
    refreshAll(s);
    const first = { spline: r.spline, knot: 0 };
    const last = { spline: r.spline, knot: n };
    linkKnots(c, [first, last], factory);
    return last;
  }
  if (r.knot <= 0 || r.knot >= n - 1) return null;
  const tail = factory.spline();
  tail.closed = false;
  tail.knots.length = 0;
  tail.knots.push(cloneKnot(s.knots[r.knot], factory), ...s.knots.slice(r.knot + 1));
  const newSpline = c.splines.length;
  rewriteLinks(c, (o) => o.spline === r.spline && o.knot > r.knot ? { spline: newSpline, knot: o.knot - r.knot } : o);
  s.knots.length = r.knot + 1;
  c.splines.push(tail);
  refreshAll(s);
  refreshAll(tail);
  const copyRef = { spline: newSpline, knot: 0 };
  linkKnots(c, [r, copyRef], factory);
  return copyRef;
}
function isEndKnot(s, knot) {
  return !s.closed && s.knots.length > 0 && (knot === 0 || knot === s.knots.length - 1);
}
function joinKnots(c, a, b, factory) {
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
function buildShape(s, kind, o, factory) {
  const shape = shapeKnots(kind, o);
  s.knots.length = 0;
  s.closed = shape.closed;
  const normal = o.plane2D ? v3(0, 0, 1) : v3(0, 1, 0);
  const n = shape.points.length;
  for (let i = 0; i < n; i++) {
    const k = factory.knot();
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

// assets/runtime/BezierKnot.ts
var { ccclass: ccclass2, property: property2 } = _decorator;
ccenum(TangentMode);
var BezierKnot = class {
  constructor(position, tangentIn, tangentOut, rotation, mode) {
    this.position = new Vec3();
    this.tangentIn = new Vec3();
    this.tangentOut = new Vec3();
    this.rotation = new Quat();
    this.mode = 0 /* AutoSmooth */;
    this.tension = DEFAULT_TENSION;
    if (position) this.position.set(position);
    if (tangentIn) this.tangentIn.set(tangentIn);
    if (tangentOut) this.tangentOut.set(tangentOut);
    if (rotation) this.rotation.set(rotation);
    if (mode !== void 0) this.mode = mode;
  }
  clone() {
    const k = new BezierKnot(this.position, this.tangentIn, this.tangentOut, this.rotation, this.mode);
    k.tension = this.tension;
    return k;
  }
};
__decorateClass([
  property2({ tooltip: "Position in the spline container\u2019s local space." })
], BezierKnot.prototype, "position", 2);
__decorateClass([
  property2({ tooltip: "In tangent, in the knot\u2019s space (points backwards along -Z)." })
], BezierKnot.prototype, "tangentIn", 2);
__decorateClass([
  property2({ tooltip: "Out tangent, in the knot\u2019s space (points forwards along +Z)." })
], BezierKnot.prototype, "tangentOut", 2);
__decorateClass([
  property2({ tooltip: "Knot rotation: +Z is the direction of travel, +Y the up vector." })
], BezierKnot.prototype, "rotation", 2);
__decorateClass([
  property2({ type: TangentMode, tooltip: "How the tangents are kept." })
], BezierKnot.prototype, "mode", 2);
__decorateClass([
  property2({ range: [0, 1, 0.01], slide: true, tooltip: "Auto Smooth tension (0 uniform, 0.5 centripetal, 1 chordal)." })
], BezierKnot.prototype, "tension", 2);
BezierKnot = __decorateClass([
  ccclass2("splines.BezierKnot")
], BezierKnot);

// assets/runtime/KnotLink.ts
var { ccclass: ccclass3, property: property3 } = _decorator;
var KnotLink = class {
  constructor() {
    this.knots = [];
  }
};
__decorateClass([
  property3({ type: [CCInteger] })
], KnotLink.prototype, "knots", 2);
KnotLink = __decorateClass([
  ccclass3("splines.KnotLink")
], KnotLink);

// assets/runtime/Spline.ts
var { ccclass: ccclass4, property: property4 } = _decorator;
var splineFactory = {
  knot: () => new BezierKnot(),
  spline: () => new Spline(),
  link: () => new KnotLink()
};
var Spline = class {
  constructor() {
    this.knots = [];
    this.closed = false;
    this._cache = new SplineCache();
    this._checkedFrame = -1;
    this._version = 0;
  }
  /** Bumped by every edit made through the Spline API (and markDirty). */
  get version() {
    return this._version;
  }
  get count() {
    return this.knots.length;
  }
  /** Number of curves (segments between knots). */
  get curveCount() {
    return curveCount(this);
  }
  /** Lengths and lookup tables, rebuilt when the knots change (checked once per frame). */
  get cache() {
    const frame = director.getTotalFrames();
    if (frame !== this._checkedFrame || this._checkedFrame < 0) {
      ensureCache(this, this._cache);
      this._checkedFrame = frame;
    }
    return this._cache;
  }
  /** Call after changing knots directly (not through the Spline methods). */
  markDirty() {
    this._checkedFrame = -1;
    this._version++;
  }
  // --------------------------------------------------------------- knots
  getKnot(index) {
    return this.knots[index];
  }
  /** Replaces a knot (copied) and updates the tangents that depend on it. */
  setKnot(index, knot) {
    const k = this.knots[index];
    k.position.set(knot.position);
    k.tangentIn.set(knot.tangentIn);
    k.tangentOut.set(knot.tangentOut);
    k.rotation.set(knot.rotation);
    k.mode = knot.mode;
    k.tension = knot.tension;
    refreshAround(this, index);
    this.markDirty();
  }
  /** Adds a knot at the end. With a position, creates a knot with the given mode. */
  add(knotOrPosition, mode = 0 /* AutoSmooth */) {
    return this.insert(this.knots.length, knotOrPosition, mode);
  }
  insert(index, knotOrPosition, mode = 0 /* AutoSmooth */) {
    let k;
    if (knotOrPosition instanceof BezierKnot) {
      k = knotOrPosition;
    } else {
      k = new BezierKnot(knotOrPosition);
      k.mode = mode;
      k.tension = DEFAULT_TENSION;
    }
    insertKnot(this, index, k);
    this.markDirty();
    return k;
  }
  removeAt(index) {
    removeKnot(this, index);
    this.markDirty();
  }
  clear() {
    this.knots.length = 0;
    this.markDirty();
  }
  setKnotPosition(index, position) {
    setKnotPosition(this, index, position);
    this.markDirty();
  }
  getTangentMode(index) {
    return this.knots[index].mode;
  }
  setTangentMode(index, mode) {
    setTangentMode(this, index, mode);
    this.markDirty();
  }
  /** Sets the mode of every knot. */
  setTangentModeAll(mode) {
    for (let i = 0; i < this.knots.length; i++) setTangentMode(this, i, mode);
    this.markDirty();
  }
  setAutoSmoothTension(index, tension) {
    setTension(this, index, tension);
    this.markDirty();
  }
  /** Inserts a knot on a curve without changing the shape. Returns its index. */
  insertOnCurve(curveIndex, curveT) {
    const i = insertOnCurve(this, curveIndex, curveT, splineFactory);
    this.markDirty();
    return i;
  }
  setClosed(closed) {
    setClosed(this, closed);
    this.markDirty();
  }
  /** Reverses the direction of travel (the shape is unchanged). */
  reverse() {
    reverseFlow(this);
    this.markDirty();
  }
  /** Re-applies every knot's tangent mode. */
  refresh() {
    refreshAll(this);
    this.markDirty();
  }
  /** Re-applies the tangent mode of one knot. */
  refreshKnot(index) {
    applyTangentMode(this, index);
    this.markDirty();
  }
  // ------------------------------------------------------------ queries
  /** Total length in local units. */
  getLength() {
    return this.cache.total;
  }
  getCurveLength(curveIndex) {
    return this.cache.lengths[curveIndex] ?? 0;
  }
  /** Control points of a curve (local space). */
  getCurve(curveIndex, out = curve()) {
    return getCurve(this, curveIndex, out);
  }
  evaluatePosition(t, out = new Vec3()) {
    return evaluatePosition(this, this.cache, t, out);
  }
  /** Derivative at t (direction times speed, like Unity's EvaluateTangent). */
  evaluateTangent(t, out = new Vec3()) {
    const cache = this.cache;
    if (!cache.curves.length) return evaluateDirection(this, cache, t, out);
    const p = curvePointAt(cache, t);
    evalDerivative(out, cache.curves[p.index], p.t);
    if (out.lengthSqr() < 1e-12) evaluateDirection(this, cache, t, out);
    return out;
  }
  /** Unit direction of travel at t. */
  evaluateDirection(t, out = new Vec3()) {
    return evaluateDirection(this, this.cache, t, out);
  }
  /** Unit up vector at t, interpolated between the knots' up vectors without twisting. */
  evaluateUpVector(t, out = new Vec3()) {
    return evaluateUp(this, this.cache, t, out);
  }
  /** Closest point to `point` (local space). Returns its t and position. */
  getNearestPoint(point, outPosition = new Vec3()) {
    const r = nearestPoint(this, this.cache, point);
    outPosition.set(r.position.x, r.position.y, r.position.z);
    return { t: r.t, position: outPosition, distance: r.distance };
  }
  /** The t reached after moving `distance` (local units, may be negative) from `fromT`. */
  getTAtDistance(fromT, distance) {
    return tAtDistanceFrom(this, this.cache, fromT, distance);
  }
  /** Converts a position along the spline between units (Unity's ConvertIndexUnit). */
  convertIndexUnit(value, from, to) {
    if (from === to) return value;
    const cache = this.cache;
    let t;
    if (from === 0 /* Normalized */) t = value;
    else if (from === 1 /* Distance */) t = cache.total > 0 ? value / cache.total : 0;
    else t = knotUnitToT(cache, value);
    if (to === 0 /* Normalized */) return t;
    if (to === 1 /* Distance */) return t * cache.total;
    return tToKnotUnit(cache, t);
  }
  /** Normalized t of a knot. */
  knotT(index) {
    const cache = this.cache;
    if (!cache.curves.length) return 0;
    if (index >= cache.curves.length) return 1;
    return normalizedTOf(cache, index, 0);
  }
};
__decorateClass([
  property4({ type: [BezierKnot], tooltip: "The knots of the spline." })
], Spline.prototype, "knots", 2);
__decorateClass([
  property4({ tooltip: "Connects the last knot back to the first." })
], Spline.prototype, "closed", 2);
Spline = __decorateClass([
  ccclass4("splines.Spline")
], Spline);

// assets/runtime/SplineContainer.ts
var { ccclass: ccclass5, property: property5, executeInEditMode, menu, disallowMultiple } = _decorator;
var _m = new Mat4();
var _v = new Vec3();
var _c = curve();
var SplineContainer = class extends Component {
  constructor() {
    super(...arguments);
    this.splines = [new Spline()];
    this.links = [];
    this._stamp = NaN;
    this._seen = /* @__PURE__ */ new WeakMap();
  }
  /** The first spline (created if there is none). */
  get spline() {
    if (!this.splines.length) this.splines.push(new Spline());
    return this.splines[0];
  }
  set spline(value) {
    if (this.splines.length) this.splines[0] = value;
    else this.splines.push(value);
    this.notifyChanged();
  }
  onEnable() {
    SplineContainer.all.add(this);
  }
  onDisable() {
    SplineContainer.all.delete(this);
  }
  onDestroy() {
    SplineContainer.all.delete(this);
  }
  update() {
    if (!EDITOR && !this.node.hasEventListener(SplineContainer.EventType.CHANGED)) return;
    this.checkChanged();
  }
  /**
   * A value that changes whenever any spline in the container changes.
   * Checked at most once per frame per spline.
   */
  get changeStamp() {
    let h = 2166136261 | 0;
    for (const s of this.splines) h = Math.imul(h ^ s.cache.stamp, 16777619);
    return Math.imul(h ^ this.splines.length, 16777619);
  }
  /** Emits CHANGED if a spline changed since the last check. Returns whether it did. */
  checkChanged() {
    if (EDITOR) this.repairAfterExternalEdit();
    const stamp = this.changeStamp;
    if (stamp === this._stamp) return false;
    this._stamp = stamp;
    this.node.emit(SplineContainer.EventType.CHANGED, this);
    return true;
  }
  /** Marks every spline dirty and emits CHANGED. */
  notifyChanged() {
    for (const s of this.splines) s.markDirty();
    this.checkChanged();
  }
  /**
   * Inspector edits and undo change knots behind the Spline API; re-apply the
   * tangent modes so AutoSmooth tangents follow moved knots.
   */
  repairAfterExternalEdit() {
    for (const s of this.splines) {
      const before = fingerprint(s);
      if (this._seen.get(s) === before) continue;
      refreshAll(s);
      const after = fingerprint(s);
      if (after !== before) s.markDirty();
      this._seen.set(s, after);
    }
  }
  // ------------------------------------------------------------ splines
  addSpline(spline = new Spline()) {
    this.splines.push(spline);
    this.notifyChanged();
    return spline;
  }
  removeSplineAt(index) {
    containerRemoveSpline(this, index);
    this.notifyChanged();
  }
  /** Container-level edits that keep knot links valid. */
  insertKnot(splineIndex, knotIndex, knot) {
    containerInsertKnot(this, splineIndex, knotIndex, knot);
    this.notifyChanged();
  }
  removeKnots(refs) {
    containerRemoveKnots(this, refs);
    this.notifyChanged();
  }
  reverseFlow(splineIndex) {
    containerReverse(this, splineIndex);
    this.notifyChanged();
  }
  /** Moves a knot and every knot linked to it. */
  setKnotPosition(ref, localPosition) {
    this.splines[ref.spline].setKnotPosition(ref.knot, localPosition);
    syncLinked(this, ref);
    this.notifyChanged();
  }
  linkKnots(refs) {
    linkKnots(this, refs, splineFactory);
    this.notifyChanged();
  }
  unlinkKnots(refs) {
    unlinkKnots(this, refs);
    this.notifyChanged();
  }
  getLinkedKnots(ref) {
    return linkedKnots(this, ref);
  }
  isKnotLinked(ref) {
    return isLinked(this, ref);
  }
  /** Unity's Split Knot. Returns the new copy of the knot, or null. */
  splitKnot(ref) {
    const r = splitKnot(this, ref, splineFactory);
    this.notifyChanged();
    return r;
  }
  /** Unity's Join Knots (two end knots). Returns the joined knot, or null. */
  joinKnots(a, b) {
    const r = joinKnots(this, a, b, splineFactory);
    this.notifyChanged();
    return r;
  }
  // --------------------------------------------------------- evaluation
  getSpline(index) {
    return this.splines[index] ?? null;
  }
  /** World-space position at t on a spline. */
  evaluatePosition(t, splineIndex = 0, out = new Vec3()) {
    const s = this.getSpline(splineIndex);
    if (!s) return out.set(this.node.worldPosition);
    s.evaluatePosition(t, out);
    return Vec3.transformMat4(out, out, this.node.worldMatrix);
  }
  /** World-space derivative at t (direction times speed, like Unity's EvaluateTangent). */
  evaluateTangent(t, splineIndex = 0, out = new Vec3()) {
    const s = this.getSpline(splineIndex);
    if (!s) return out.set(0, 0, 0);
    s.evaluateTangent(t, out);
    return Vec3.transformMat4Normal(out, out, this.node.worldMatrix);
  }
  /** World-space unit direction of travel at t. */
  evaluateDirection(t, splineIndex = 0, out = new Vec3()) {
    const s = this.getSpline(splineIndex);
    if (!s) return out.set(0, 0, 1);
    s.evaluateDirection(t, out);
    Vec3.transformMat4Normal(out, out, this.node.worldMatrix);
    return out.normalize();
  }
  /** World-space unit up vector at t. */
  evaluateUpVector(t, splineIndex = 0, out = new Vec3()) {
    const s = this.getSpline(splineIndex);
    if (!s) return out.set(0, 1, 0);
    s.evaluateUpVector(t, out);
    Vec3.transformMat4Normal(out, out, this.node.worldMatrix);
    return out.normalize();
  }
  /** Position, direction and up at t (world space). Returns false if there is no such spline. */
  evaluate(t, splineIndex = 0, out) {
    const s = this.getSpline(splineIndex);
    if (!s) return null;
    const res = out ?? { position: new Vec3(), tangent: new Vec3(), up: new Vec3() };
    this.evaluatePosition(t, splineIndex, res.position);
    this.evaluateDirection(t, splineIndex, res.tangent);
    this.evaluateUpVector(t, splineIndex, res.up);
    return res;
  }
  /** Rotation that faces along the spline at t (+Z forward, +Y up), world space. */
  evaluateRotation(t, splineIndex = 0, out = new Quat()) {
    const f = this.evaluateDirection(t, splineIndex, new Vec3());
    const u = this.evaluateUpVector(t, splineIndex, new Vec3());
    Quat.fromViewUp(out, f, u);
    return out;
  }
  /** World-space length of a spline. */
  calculateLength(splineIndex = 0) {
    const s = this.getSpline(splineIndex);
    if (!s) return 0;
    const m = this.node.worldMatrix;
    let total = 0;
    const count = s.curveCount;
    for (let i = 0; i < count; i++) {
      s.getCurve(i, _c);
      Vec3.transformMat4(_c.p0, _c.p0, m);
      Vec3.transformMat4(_c.p1, _c.p1, m);
      Vec3.transformMat4(_c.p2, _c.p2, m);
      Vec3.transformMat4(_c.p3, _c.p3, m);
      total += arcLength(_c);
    }
    return total;
  }
  /** Closest point on a spline to a world position. */
  getNearestPoint(worldPoint, splineIndex = 0) {
    const s = this.getSpline(splineIndex);
    if (!s) return null;
    Mat4.invert(_m, this.node.worldMatrix);
    Vec3.transformMat4(_v, worldPoint, _m);
    const r = nearestPoint(s, s.cache, _v);
    const position = new Vec3(r.position.x, r.position.y, r.position.z);
    Vec3.transformMat4(position, position, this.node.worldMatrix);
    return { t: r.t, position, distance: Vec3.distance(position, worldPoint) };
  }
  /** Closest point over all splines. */
  getNearestPointAll(worldPoint) {
    let best = null;
    for (let i = 0; i < this.splines.length; i++) {
      const r = this.getNearestPoint(worldPoint, i);
      if (r && (!best || r.distance < best.distance)) best = { spline: i, ...r };
    }
    return best;
  }
  /** Converts between normalized t, local distance and knot index units on a spline. */
  convertIndexUnit(value, from, to, splineIndex = 0) {
    const s = this.getSpline(splineIndex);
    return s ? s.convertIndexUnit(value, from, to) : 0;
  }
  /** Knot position in world space. */
  getKnotWorldPosition(ref, out = new Vec3()) {
    var _a;
    const k = (_a = this.splines[ref.spline]) == null ? void 0 : _a.knots[ref.knot];
    if (!k) return out.set(this.node.worldPosition);
    return Vec3.transformMat4(out, k.position, this.node.worldMatrix);
  }
  /** Sets every knot of every spline to a tangent mode. */
  setTangentModeAll(mode) {
    for (const s of this.splines) s.setTangentModeAll(mode);
    this.notifyChanged();
  }
};
SplineContainer.EventType = {
  /** (container: SplineContainer) */
  CHANGED: "spline-changed"
};
/** Enabled containers (used by the editor tools). */
SplineContainer.all = /* @__PURE__ */ new Set();
__decorateClass([
  property5({ type: [Spline], tooltip: "The splines in this container." })
], SplineContainer.prototype, "splines", 2);
__decorateClass([
  property5({ type: [KnotLink], visible: false })
], SplineContainer.prototype, "links", 2);
SplineContainer = __decorateClass([
  ccclass5("SplineContainer"),
  executeInEditMode,
  disallowMultiple,
  menu("Splines/SplineContainer")
], SplineContainer);

// assets/runtime/SplineAnimate.ts
var { ccclass: ccclass6, property: property6, menu: menu2 } = _decorator;
var SplineAnimateMethod = /* @__PURE__ */ ((SplineAnimateMethod2) => {
  SplineAnimateMethod2[SplineAnimateMethod2["Time"] = 0] = "Time";
  SplineAnimateMethod2[SplineAnimateMethod2["Speed"] = 1] = "Speed";
  return SplineAnimateMethod2;
})(SplineAnimateMethod || {});
var SplineAnimateLoopMode = /* @__PURE__ */ ((SplineAnimateLoopMode2) => {
  SplineAnimateLoopMode2[SplineAnimateLoopMode2["Once"] = 0] = "Once";
  SplineAnimateLoopMode2[SplineAnimateLoopMode2["Loop"] = 1] = "Loop";
  SplineAnimateLoopMode2[SplineAnimateLoopMode2["LoopEaseInOnce"] = 2] = "LoopEaseInOnce";
  SplineAnimateLoopMode2[SplineAnimateLoopMode2["PingPong"] = 3] = "PingPong";
  return SplineAnimateLoopMode2;
})(SplineAnimateLoopMode || {});
var SplineAnimateEasing = /* @__PURE__ */ ((SplineAnimateEasing2) => {
  SplineAnimateEasing2[SplineAnimateEasing2["None"] = 0] = "None";
  SplineAnimateEasing2[SplineAnimateEasing2["EaseIn"] = 1] = "EaseIn";
  SplineAnimateEasing2[SplineAnimateEasing2["EaseOut"] = 2] = "EaseOut";
  SplineAnimateEasing2[SplineAnimateEasing2["EaseInOut"] = 3] = "EaseInOut";
  return SplineAnimateEasing2;
})(SplineAnimateEasing || {});
var SplineAnimateAlignment = /* @__PURE__ */ ((SplineAnimateAlignment2) => {
  SplineAnimateAlignment2[SplineAnimateAlignment2["None"] = 0] = "None";
  SplineAnimateAlignment2[SplineAnimateAlignment2["SplineElement"] = 1] = "SplineElement";
  SplineAnimateAlignment2[SplineAnimateAlignment2["SplineObject"] = 2] = "SplineObject";
  SplineAnimateAlignment2[SplineAnimateAlignment2["World"] = 3] = "World";
  return SplineAnimateAlignment2;
})(SplineAnimateAlignment || {});
var AlignAxis = /* @__PURE__ */ ((AlignAxis2) => {
  AlignAxis2[AlignAxis2["XAxis"] = 0] = "XAxis";
  AlignAxis2[AlignAxis2["YAxis"] = 1] = "YAxis";
  AlignAxis2[AlignAxis2["ZAxis"] = 2] = "ZAxis";
  AlignAxis2[AlignAxis2["NegativeXAxis"] = 3] = "NegativeXAxis";
  AlignAxis2[AlignAxis2["NegativeYAxis"] = 4] = "NegativeYAxis";
  AlignAxis2[AlignAxis2["NegativeZAxis"] = 5] = "NegativeZAxis";
  return AlignAxis2;
})(AlignAxis || {});
ccenum(SplineAnimateMethod);
ccenum(SplineAnimateLoopMode);
ccenum(SplineAnimateEasing);
ccenum(SplineAnimateAlignment);
ccenum(AlignAxis);
var AXES = [
  new Vec3(1, 0, 0),
  new Vec3(0, 1, 0),
  new Vec3(0, 0, 1),
  new Vec3(-1, 0, 0),
  new Vec3(0, -1, 0),
  new Vec3(0, 0, -1)
];
var _pos = new Vec3();
var _fwd = new Vec3();
var _up = new Vec3();
var _rot = new Quat();
var _remap = new Quat();
function easeIn(t) {
  return t * t;
}
function easeOut(t) {
  return t * (2 - t);
}
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function pingPong(t, length) {
  const l2 = length * 2;
  const m = (t % l2 + l2) % l2;
  return length - Math.abs(m - length);
}
var _lf = new Vec3();
var _lu = new Vec3();
function lookRotation(out, forward, up) {
  return Quat.fromViewUp(out, Vec3.normalize(_lf, forward), Vec3.normalize(_lu, up));
}
var SplineAnimate = class extends Component {
  constructor() {
    super(...arguments);
    this.container = null;
    this.splineIndex = 0;
    this.playOnAwake = true;
    this.easing = 0 /* None */;
    this.loopMode = 1 /* Loop */;
    this.alignment = 1 /* SplineElement */;
    this.objectForwardAxis = 2 /* ZAxis */;
    this.objectUpAxis = 1 /* YAxis */;
    this.startOffset = 0;
    this.completedEvents = [];
    this._method = 0 /* Time */;
    this._duration = 1;
    this._maxSpeed = 10;
    this._elapsed = 0;
    this._lastElapsed = 0;
    this._playing = false;
    this._normalizedTime = 0;
    this._endReached = false;
    this._previewOrigin = null;
  }
  get method() {
    return this._method;
  }
  set method(v) {
    this._method = v;
  }
  get duration() {
    return this._duration;
  }
  set duration(v) {
    this._duration = Math.max(0, v);
  }
  get maxSpeed() {
    return this._maxSpeed;
  }
  set maxSpeed(v) {
    this._maxSpeed = Math.max(0, v);
  }
  get isPlaying() {
    return this._playing;
  }
  /** Seconds since the start (including loops). */
  get elapsedTime() {
    return this._elapsed;
  }
  set elapsedTime(v) {
    this._elapsed = Math.max(0, v);
    this.evaluateTime();
    this.applyTransform();
  }
  /** Progress along the spline; the integer part counts completed loops. */
  get normalizedTime() {
    return this._normalizedTime;
  }
  set normalizedTime(v) {
    const d = this.currentDuration();
    this._elapsed = Math.max(0, v) * d;
    this.evaluateTime();
    this.applyTransform();
  }
  start() {
    if (this.playOnAwake) this.play();
    else this.applyTransform();
  }
  update(dt) {
    if (!this._playing) return;
    this._elapsed += dt;
    this.evaluateTime();
    this.applyTransform();
  }
  play() {
    this._playing = true;
  }
  pause() {
    this._playing = false;
  }
  /** Back to the start; keeps playing if `autoplay`. */
  restart(autoplay = true) {
    this._elapsed = 0;
    this._lastElapsed = 0;
    this._normalizedTime = 0;
    this._endReached = false;
    this._playing = autoplay;
    this.applyTransform();
  }
  /** Length of the followed spline in world units. */
  get splineLength() {
    return this.container ? this.container.calculateLength(this.splineIndex) : 0;
  }
  /** Duration of one run (Speed mode converts the speed into a duration). */
  currentDuration() {
    if (this._method === 0 /* Time */) return this._duration;
    if (this._maxSpeed <= 0) return Infinity;
    const base = this.splineLength / this._maxSpeed;
    return this.easing === 0 /* None */ ? base : base * 2;
  }
  /** Spline t (0..1) for the current time, after looping, easing and the start offset. */
  getSplineT() {
    var _a, _b;
    let t = this._normalizedTime % 1;
    if (this._normalizedTime >= 1 && t === 0 && this.loopMode === 0 /* Once */) t = 1;
    t += this.startOffset;
    return t > 1 ? ((_b = (_a = this.container) == null ? void 0 : _a.splines[this.splineIndex]) == null ? void 0 : _b.closed) ? t % 1 : Math.min(t, 1) : t;
  }
  evaluateTime() {
    let duration = this.currentDuration();
    if (!(duration > 0) || !isFinite(duration)) {
      this._normalizedTime = 0;
      return;
    }
    if (this.loopMode !== 0 /* Once */ && this._elapsed > this._lastElapsed && Math.floor(this._elapsed / duration) > Math.floor(this._lastElapsed / duration)) {
      this._endReached = true;
    }
    this._lastElapsed = this._elapsed;
    let t = 0;
    const easeFirst = this.easing === 1 /* EaseIn */ || this.easing === 3 /* EaseInOut */;
    switch (this.loopMode) {
      case 0 /* Once */:
        t = Math.min(this._elapsed, duration);
        break;
      case 1 /* Loop */:
        t = this._elapsed % duration;
        break;
      case 2 /* LoopEaseInOnce */:
        if (easeFirst && this._elapsed >= duration) duration *= 0.5;
        t = this._elapsed % duration;
        break;
      case 3 /* PingPong */:
        t = pingPong(this._elapsed, duration);
        break;
    }
    t /= duration;
    if (this.loopMode === 2 /* LoopEaseInOnce */) {
      if (easeFirst && this._elapsed < duration) t = easeIn(t);
    } else {
      switch (this.easing) {
        case 1 /* EaseIn */:
          t = easeIn(t);
          break;
        case 2 /* EaseOut */:
          t = easeOut(t);
          break;
        case 3 /* EaseInOut */:
          t = easeInOut(t);
          break;
      }
    }
    const loops = Math.floor(this._elapsed / duration);
    this._normalizedTime = this.loopMode === 0 /* Once */ ? Math.min(1, t) : loops + t;
    if (this.loopMode === 0 /* Once */ && this._elapsed >= duration) {
      this._normalizedTime = 1;
      if (this._playing) {
        this._playing = false;
        this._endReached = true;
      }
    }
  }
  /** World position and rotation for the current time. */
  evaluatePositionAndRotation(outPosition = new Vec3(), outRotation = new Quat()) {
    const c = this.container;
    if (!c || !c.splines[this.splineIndex]) return false;
    const t = this.getSplineT();
    c.evaluatePosition(t, this.splineIndex, outPosition);
    if (this.alignment === 0 /* None */) {
      outRotation.set(this.node.worldRotation);
      return true;
    }
    const fwdAxis = AXES[this.objectForwardAxis] ?? AXES[2];
    let upAxis = AXES[this.objectUpAxis] ?? AXES[1];
    if (Math.abs(Vec3.dot(fwdAxis, upAxis)) > 0.99) upAxis = Math.abs(fwdAxis.y) > 0.99 ? AXES[2] : AXES[1];
    Quat.invert(_remap, lookRotation(_remap, fwdAxis, upAxis));
    switch (this.alignment) {
      case 1 /* SplineElement */:
        c.evaluateDirection(t, this.splineIndex, _fwd);
        c.evaluateUpVector(t, this.splineIndex, _up);
        break;
      case 2 /* SplineObject */:
        Vec3.transformQuat(_fwd, Vec3.UNIT_Z, c.node.worldRotation);
        Vec3.transformQuat(_up, Vec3.UNIT_Y, c.node.worldRotation);
        break;
      default:
        _fwd.set(0, 0, 1);
        _up.set(0, 1, 0);
        break;
    }
    lookRotation(outRotation, _fwd, _up);
    Quat.multiply(outRotation, outRotation, _remap);
    return true;
  }
  applyTransform() {
    if (!this.evaluatePositionAndRotation(_pos, _rot)) return;
    this.node.setWorldPosition(_pos);
    if (this.alignment !== 0 /* None */) this.node.setWorldRotation(_rot);
    this.node.emit(SplineAnimate.EventType.UPDATED, _pos, _rot);
    if (this._endReached) {
      this._endReached = false;
      this.node.emit(SplineAnimate.EventType.COMPLETED, this);
      EventHandler.emitEvents(this.completedEvents, this);
    }
  }
  // ----------------------------------------------------- editor preview
  /** Editor preview: shows the object at `seconds` (the original transform is kept for _previewStop). */
  _previewSetTime(seconds) {
    if (!this._previewOrigin) {
      this._previewOrigin = { position: this.node.worldPosition.clone(), rotation: this.node.worldRotation.clone() };
    }
    this._elapsed = Math.max(0, seconds);
    this.evaluateTime();
    this._endReached = false;
    this.applyTransform();
    return { normalizedTime: this._normalizedTime, duration: this.currentDuration() };
  }
  /** Editor preview: puts the object back where it was. */
  _previewStop() {
    if (this._previewOrigin) {
      this.node.setWorldPosition(this._previewOrigin.position);
      this.node.setWorldRotation(this._previewOrigin.rotation);
      this._previewOrigin = null;
    }
    this._elapsed = 0;
    this._normalizedTime = 0;
  }
  _previewInfo() {
    return { duration: this.currentDuration(), length: this.splineLength, previewing: !!this._previewOrigin };
  }
  onDisable() {
    if (EDITOR) this._previewStop();
  }
};
SplineAnimate.EventType = {
  UPDATED: "spline-animate-updated",
  COMPLETED: "spline-animate-completed"
};
__decorateClass([
  property6({ type: SplineContainer, tooltip: "The spline container to follow." })
], SplineAnimate.prototype, "container", 2);
__decorateClass([
  property6({ tooltip: "Which spline of the container to follow.", min: 0, step: 1 })
], SplineAnimate.prototype, "splineIndex", 2);
__decorateClass([
  property6({ tooltip: "Start playing when the component starts." })
], SplineAnimate.prototype, "playOnAwake", 2);
__decorateClass([
  property6({ type: SplineAnimateMethod, tooltip: "Time: travel the spline in a set duration. Speed: travel at a set speed." })
], SplineAnimate.prototype, "method", 1);
__decorateClass([
  property6({ tooltip: "Seconds to travel the spline once.", min: 0, visible() {
    return this._method === 0 /* Time */;
  } })
], SplineAnimate.prototype, "duration", 1);
__decorateClass([
  property6({ tooltip: "Speed in units per second.", min: 0, visible() {
    return this._method === 1 /* Speed */;
  } })
], SplineAnimate.prototype, "maxSpeed", 1);
__decorateClass([
  property6({ type: SplineAnimateEasing, tooltip: "Speed curve of each run." })
], SplineAnimate.prototype, "easing", 2);
__decorateClass([
  property6({ type: SplineAnimateLoopMode, tooltip: "What happens at the end of the spline." })
], SplineAnimate.prototype, "loopMode", 2);
__decorateClass([
  property6({ type: SplineAnimateAlignment, tooltip: "How the object rotates while it moves." })
], SplineAnimate.prototype, "alignment", 2);
__decorateClass([
  property6({ type: AlignAxis, tooltip: "The object axis that points along the spline (Z for 3D models, X for 2D sprites)." })
], SplineAnimate.prototype, "objectForwardAxis", 2);
__decorateClass([
  property6({ type: AlignAxis, tooltip: "The object axis that points along the spline\u2019s up vector." })
], SplineAnimate.prototype, "objectUpAxis", 2);
__decorateClass([
  property6({ range: [0, 1, 0.01], slide: true, tooltip: "Where on the spline to start (0..1 of its length)." })
], SplineAnimate.prototype, "startOffset", 2);
__decorateClass([
  property6({ type: [EventHandler], tooltip: "Called when a run ends or a loop wraps." })
], SplineAnimate.prototype, "completedEvents", 2);
__decorateClass([
  property6
], SplineAnimate.prototype, "_method", 2);
__decorateClass([
  property6
], SplineAnimate.prototype, "_duration", 2);
__decorateClass([
  property6
], SplineAnimate.prototype, "_maxSpeed", 2);
SplineAnimate = __decorateClass([
  ccclass6("SplineAnimate"),
  menu2("Splines/SplineAnimate")
], SplineAnimate);

// assets/runtime/SplineExtrude.ts
var { ccclass: ccclass7, property: property7, executeInEditMode: executeInEditMode2, menu: menu3 } = _decorator;
var ExtrudeShape = /* @__PURE__ */ ((ExtrudeShape2) => {
  ExtrudeShape2[ExtrudeShape2["Circle"] = 0] = "Circle";
  ExtrudeShape2[ExtrudeShape2["Square"] = 1] = "Square";
  ExtrudeShape2[ExtrudeShape2["Road"] = 2] = "Road";
  ExtrudeShape2[ExtrudeShape2["Spline"] = 3] = "Spline";
  return ExtrudeShape2;
})(ExtrudeShape || {});
ccenum(ExtrudeShape);
var GENERATED_FLAGS = CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy | CCObject.Flags.LockedInEditor;
var _p = new Vec3();
var _f = new Vec3();
var _u = new Vec3();
var _r = new Vec3();
var _m2 = new Mat4();
var SplineExtrude = class extends Component {
  constructor() {
    super(...arguments);
    this.container = null;
    this.material = null;
    this.rebuildOnSplineChange = true;
    this.rebuildFrequency = 30;
    this.shape = 0 /* Circle */;
    this.sides = 8;
    this.profile = null;
    this.profileSegments = 16;
    this.radius = 0.25;
    this.segmentsPerUnit = 4;
    this.capped = true;
    this.range = new Vec2(0, 1);
    this.flipNormals = false;
    this.castShadows = true;
    this.receiveShadows = true;
    this.generateCollider = false;
    this._child = null;
    this._mesh = null;
    this._stamp = NaN;
    this._lastBuild = -Infinity;
    this._fallbackMaterial = null;
  }
  /** The generated mesh (null before the first build). */
  get mesh() {
    return this._mesh;
  }
  resetInEditor() {
    this.container = this.getComponent(SplineContainer);
  }
  onLoad() {
    if (!this.container) this.container = this.getComponent(SplineContainer);
  }
  onEnable() {
    this.rebuild();
  }
  onDisable() {
    if (this._child) this._child.active = false;
  }
  onDestroy() {
    var _a;
    if (this._child && this._child.isValid) this._child.destroy();
    this._child = null;
    (_a = this._mesh) == null ? void 0 : _a.destroy();
    this._mesh = null;
  }
  update() {
    if (!EDITOR && !this.rebuildOnSplineChange) return;
    const stamp = this.computeStamp();
    if (stamp === this._stamp) return;
    if (!EDITOR) {
      const now = director.getTotalTime() / 1e3;
      if (now - this._lastBuild < 1 / Math.max(1, this.rebuildFrequency)) return;
      this._lastBuild = now;
    }
    this.rebuild();
  }
  computeStamp() {
    const c = this.container;
    let h = c && c.isValid ? c.changeStamp : 0;
    const mix2 = (v) => {
      h = Math.imul(h ^ Math.round(v * 1e5), 16777619);
    };
    mix2(this.shape);
    mix2(this.sides);
    mix2(this.radius);
    mix2(this.segmentsPerUnit);
    mix2(this.capped ? 1 : 0);
    mix2(this.range.x);
    mix2(this.range.y);
    mix2(this.flipNormals ? 1 : 0);
    mix2(this.castShadows ? 1 : 0);
    mix2(this.receiveShadows ? 1 : 0);
    mix2(this.generateCollider ? 1 : 0);
    mix2(this.profileSegments);
    if (this.profile && this.shape === 3 /* Spline */) mix2(this.profile.changeStamp);
    if (c && c.isValid && c.node !== this.node) {
      Mat4.invert(_m2, this.node.worldMatrix);
      Mat4.multiply(_m2, _m2, c.node.worldMatrix);
      for (const v of Mat4.toArray([], _m2)) mix2(v);
    }
    h = Math.imul(h ^ (this.material ? 1 : 0), 16777619);
    return h;
  }
  /** Regenerates the mesh now. */
  rebuild() {
    this._stamp = this.computeStamp();
    const geometry = this.buildGeometry();
    const child = this.ensureChild();
    const renderer = child.getComponent(MeshRenderer) || child.addComponent(MeshRenderer);
    const old = this._mesh;
    if (!geometry) {
      renderer.mesh = null;
      this._mesh = null;
    } else {
      this._mesh = utils.MeshUtils.createMesh(geometry, void 0, { calculateBounds: true });
      renderer.mesh = this._mesh;
    }
    if (old && old !== this._mesh) old.destroy();
    const mat = this.material || this.fallbackMaterial();
    if (mat) renderer.setSharedMaterial(mat, 0);
    renderer.shadowCastingMode = this.castShadows ? 1 : 0;
    renderer.receiveShadow = this.receiveShadows ? 1 : 0;
    this.updateCollider(child);
    child.active = this.enabledInHierarchy;
  }
  fallbackMaterial() {
    if (this._fallbackMaterial) return this._fallbackMaterial;
    try {
      const m = new Material();
      m.initialize({ effectName: "builtin-standard" });
      this._fallbackMaterial = m;
    } catch {
      this._fallbackMaterial = null;
    }
    return this._fallbackMaterial;
  }
  ensureChild() {
    if (this._child && this._child.isValid && this._child.parent === this.node) return this._child;
    let child = this.node.children.find((n) => n.name === "__SplineExtrudeMesh" && n._objFlags & CCObject.Flags.DontSave) || null;
    if (!child) {
      child = new Node("__SplineExtrudeMesh");
      child._objFlags |= GENERATED_FLAGS;
      child.parent = this.node;
    }
    child.layer = this.node.layer;
    this._child = child;
    return child;
  }
  updateCollider(child) {
    const ColliderClass = js.getClassByName("cc.MeshCollider");
    if (!ColliderClass) return;
    let collider = child.getComponent(ColliderClass);
    if (!this.generateCollider || !this._mesh) {
      if (collider) collider.destroy();
      return;
    }
    if (!collider) collider = child.addComponent(ColliderClass);
    collider.mesh = this._mesh;
  }
  makeProfile() {
    const p = { points: [], normals: [], u: [], edges: [], closed: true, perimeter: 0 };
    switch (this.shape) {
      case 0 /* Circle */: {
        const n = Math.max(3, Math.round(this.sides));
        for (let j = 0; j <= n; j++) {
          const a = j / n * Math.PI * 2;
          p.points.push(Math.cos(a), Math.sin(a));
          p.normals.push(Math.cos(a), Math.sin(a));
          p.u.push(j / n);
          if (j < n) p.edges.push(j, j + 1);
        }
        p.perimeter = Math.PI * 2;
        return p;
      }
      case 1 /* Square */: {
        const c = [[1, -1], [1, 1], [-1, 1], [-1, -1]];
        for (let k = 0; k < 4; k++) {
          const a = c[k];
          const b = c[(k + 1) % 4];
          const nx = (a[0] + b[0]) / 2;
          const ny = (a[1] + b[1]) / 2;
          const i = p.points.length / 2;
          p.points.push(a[0], a[1], b[0], b[1]);
          p.normals.push(nx, ny, nx, ny);
          p.u.push(k / 4, (k + 1) / 4);
          p.edges.push(i, i + 1);
        }
        p.perimeter = 8;
        return p;
      }
      case 2 /* Road */:
        p.points.push(1, 0, -1, 0);
        p.normals.push(0, 1, 0, 1);
        p.u.push(0, 1);
        p.edges.push(0, 1);
        p.closed = false;
        p.perimeter = 2;
        return p;
      case 3 /* Spline */:
        return this.splineProfile();
    }
    return null;
  }
  splineProfile() {
    var _a;
    const s = (_a = this.profile) == null ? void 0 : _a.splines[0];
    if (!s || s.count < 2) return null;
    const n = Math.max(2, Math.round(this.profileSegments));
    const p = { points: [], normals: [], u: [], edges: [], closed: s.closed, perimeter: 0 };
    const pts = [];
    for (let j = 0; j <= n; j++) {
      s.evaluatePosition(j / n, _p);
      pts.push(_p.x, _p.y);
    }
    let ext = 0;
    for (const v of pts) ext = Math.max(ext, Math.abs(v));
    const k = ext > 0 ? 1 / ext : 1;
    let dist2 = 0;
    for (let j = 0; j <= n; j++) {
      const x = pts[j * 2] * k;
      const y = pts[j * 2 + 1] * k;
      if (j > 0) dist2 += Math.hypot(x - pts[j * 2 - 2] * k, y - pts[j * 2 - 1] * k);
      s.evaluateDirection(j / n, _f);
      const l = Math.hypot(_f.x, _f.y) || 1;
      p.points.push(x, y);
      p.normals.push(_f.y / l, -_f.x / l);
      p.u.push(0);
      if (j < n) p.edges.push(j, j + 1);
    }
    for (let j = 0; j <= n; j++) p.u[j] = j / n;
    p.perimeter = dist2;
    return p;
  }
  buildGeometry() {
    const c = this.container;
    if (!c || !c.isValid) return null;
    const profile = this.makeProfile();
    if (!profile) return null;
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];
    const min = new Vec3(Infinity, Infinity, Infinity);
    const max = new Vec3(-Infinity, -Infinity, -Infinity);
    const sameNode = c.node === this.node;
    if (!sameNode) {
      Mat4.invert(_m2, this.node.worldMatrix);
      Mat4.multiply(_m2, _m2, c.node.worldMatrix);
    }
    const r0 = Math.max(0, Math.min(1, Math.min(this.range.x, this.range.y)));
    const r1 = Math.max(0, Math.min(1, Math.max(this.range.x, this.range.y)));
    if (r1 - r0 <= 1e-6) return null;
    const radius = this.radius;
    const pc = profile.points.length / 2;
    const addVertex = (x, y, z, nx, ny, nz, u, v) => {
      positions.push(x, y, z);
      normals.push(this.flipNormals ? -nx : nx, this.flipNormals ? -ny : ny, this.flipNormals ? -nz : nz);
      uvs.push(u, v);
      if (x < min.x) min.x = x;
      if (y < min.y) min.y = y;
      if (z < min.z) min.z = z;
      if (x > max.x) max.x = x;
      if (y > max.y) max.y = y;
      if (z > max.z) max.z = z;
      return positions.length / 3 - 1;
    };
    const tri = (a, b, cc) => {
      if (this.flipNormals) indices.push(a, cc, b);
      else indices.push(a, b, cc);
    };
    for (const s of c.splines) {
      if (s.count < 2) continue;
      const length = s.getLength();
      if (length <= 1e-6) continue;
      const segments = Math.max(1, Math.ceil(length * (r1 - r0) * this.segmentsPerUnit));
      const loop = s.closed && r0 <= 0 && r1 >= 1;
      const base = positions.length / 3;
      const ringFrames = [];
      const texScale = 1 / Math.max(1e-6, radius * profile.perimeter);
      for (let i = 0; i <= segments; i++) {
        const t = r0 + (r1 - r0) * i / segments;
        s.evaluatePosition(t, _p);
        s.evaluateDirection(t, _f);
        s.evaluateUpVector(t, _u);
        if (!sameNode) {
          Vec3.transformMat4(_p, _p, _m2);
          Vec3.transformMat4Normal(_f, _f, _m2).normalize();
          Vec3.transformMat4Normal(_u, _u, _m2).normalize();
        }
        Vec3.cross(_r, _u, _f).normalize();
        Vec3.cross(_u, _f, _r).normalize();
        ringFrames.push({ p: _p.clone(), f: _f.clone(), u: _u.clone(), r: _r.clone() });
        const v = length * (t - r0) * texScale;
        for (let j = 0; j < pc; j++) {
          const px = profile.points[j * 2] * radius;
          const py = profile.points[j * 2 + 1] * radius;
          const nx = profile.normals[j * 2];
          const ny = profile.normals[j * 2 + 1];
          addVertex(
            _p.x + _r.x * px + _u.x * py,
            _p.y + _r.y * px + _u.y * py,
            _p.z + _r.z * px + _u.z * py,
            _r.x * nx + _u.x * ny,
            _r.y * nx + _u.y * ny,
            _r.z * nx + _u.z * ny,
            profile.u[j],
            v
          );
        }
      }
      for (let i = 0; i < segments; i++) {
        const ra = base + i * pc;
        const rb = base + (i + 1) * pc;
        for (let e = 0; e < profile.edges.length; e += 2) {
          const a = profile.edges[e];
          const b = profile.edges[e + 1];
          tri(ra + a, ra + b, rb + a);
          tri(ra + b, rb + b, rb + a);
        }
      }
      if (this.capped && profile.closed && !loop) {
        this.addCap(ringFrames[0], profile, radius, true, addVertex, tri);
        this.addCap(ringFrames[ringFrames.length - 1], profile, radius, false, addVertex, tri);
      }
    }
    if (!indices.length) return null;
    return { positions, normals, uvs, indices, minPos: min, maxPos: max };
  }
  addCap(frame, profile, radius, start, addVertex, tri) {
    const { p, f, u, r } = frame;
    const s = start ? -1 : 1;
    const center = addVertex(p.x, p.y, p.z, f.x * s, f.y * s, f.z * s, 0.5, 0.5);
    const ids = [];
    const pc = profile.points.length / 2;
    for (let j = 0; j < pc; j++) {
      const px = profile.points[j * 2];
      const py = profile.points[j * 2 + 1];
      ids.push(addVertex(
        p.x + r.x * px * radius + u.x * py * radius,
        p.y + r.y * px * radius + u.y * py * radius,
        p.z + r.z * px * radius + u.z * py * radius,
        f.x * s,
        f.y * s,
        f.z * s,
        px * 0.5 + 0.5,
        py * 0.5 + 0.5
      ));
    }
    for (let e = 0; e < profile.edges.length; e += 2) {
      const a = ids[profile.edges[e]];
      const b = ids[profile.edges[e + 1]];
      if (start) tri(center, b, a);
      else tri(center, a, b);
    }
  }
};
__decorateClass([
  property7({ type: SplineContainer, tooltip: "The splines to extrude (all splines of the container)." })
], SplineExtrude.prototype, "container", 2);
__decorateClass([
  property7({ type: Material, tooltip: "Material of the generated mesh." })
], SplineExtrude.prototype, "material", 2);
__decorateClass([
  property7({ tooltip: "Rebuild the mesh when the spline changes (at runtime too)." })
], SplineExtrude.prototype, "rebuildOnSplineChange", 2);
__decorateClass([
  property7({ tooltip: "At most this many rebuilds per second at runtime.", min: 1, step: 1, visible() {
    return this.rebuildOnSplineChange;
  } })
], SplineExtrude.prototype, "rebuildFrequency", 2);
__decorateClass([
  property7({ type: ExtrudeShape, tooltip: "Cross-section of the mesh." })
], SplineExtrude.prototype, "shape", 2);
__decorateClass([
  property7({ tooltip: "Sides of the circle.", min: 3, step: 1, visible() {
    return this.shape === 0 /* Circle */;
  } })
], SplineExtrude.prototype, "sides", 2);
__decorateClass([
  property7({ type: SplineContainer, tooltip: "Container whose first spline is the cross-section (in its XY plane).", visible() {
    return this.shape === 3 /* Spline */;
  } })
], SplineExtrude.prototype, "profile", 2);
__decorateClass([
  property7({ tooltip: "Points sampled along the profile spline.", min: 2, step: 1, visible() {
    return this.shape === 3 /* Spline */;
  } })
], SplineExtrude.prototype, "profileSegments", 2);
__decorateClass([
  property7({ tooltip: "Radius (half width) of the cross-section.", min: 0 })
], SplineExtrude.prototype, "radius", 2);
__decorateClass([
  property7({ tooltip: "Edge loops per unit of spline length.", min: 0.01 })
], SplineExtrude.prototype, "segmentsPerUnit", 2);
__decorateClass([
  property7({ tooltip: "Close the ends of open splines." })
], SplineExtrude.prototype, "capped", 2);
__decorateClass([
  property7({ tooltip: "Part of each spline to extrude (0..1)." })
], SplineExtrude.prototype, "range", 2);
__decorateClass([
  property7({ tooltip: "Turn the mesh inside out." })
], SplineExtrude.prototype, "flipNormals", 2);
__decorateClass([
  property7({ tooltip: "Cast shadows." })
], SplineExtrude.prototype, "castShadows", 2);
__decorateClass([
  property7({ tooltip: "Receive shadows." })
], SplineExtrude.prototype, "receiveShadows", 2);
__decorateClass([
  property7({ tooltip: "Add a MeshCollider using the generated mesh (needs a physics backend with mesh colliders)." })
], SplineExtrude.prototype, "generateCollider", 2);
SplineExtrude = __decorateClass([
  ccclass7("SplineExtrude"),
  executeInEditMode2,
  menu3("Splines/SplineExtrude")
], SplineExtrude);

// assets/runtime/SplineInstantiate.ts
var { ccclass: ccclass8, property: property8, executeInEditMode: executeInEditMode3, menu: menu4 } = _decorator;
var InstantiateMethod = /* @__PURE__ */ ((InstantiateMethod2) => {
  InstantiateMethod2[InstantiateMethod2["InstanceCount"] = 0] = "InstanceCount";
  InstantiateMethod2[InstantiateMethod2["SpacingDistance"] = 1] = "SpacingDistance";
  InstantiateMethod2[InstantiateMethod2["LinearDistance"] = 2] = "LinearDistance";
  return InstantiateMethod2;
})(InstantiateMethod || {});
var InstantiateSpace = /* @__PURE__ */ ((InstantiateSpace2) => {
  InstantiateSpace2[InstantiateSpace2["Spline"] = 0] = "Spline";
  InstantiateSpace2[InstantiateSpace2["SplineObject"] = 1] = "SplineObject";
  InstantiateSpace2[InstantiateSpace2["World"] = 2] = "World";
  return InstantiateSpace2;
})(InstantiateSpace || {});
var OffsetSpace = /* @__PURE__ */ ((OffsetSpace2) => {
  OffsetSpace2[OffsetSpace2["Spline"] = 0] = "Spline";
  OffsetSpace2[OffsetSpace2["SplineObject"] = 1] = "SplineObject";
  OffsetSpace2[OffsetSpace2["World"] = 2] = "World";
  OffsetSpace2[OffsetSpace2["Object"] = 3] = "Object";
  return OffsetSpace2;
})(OffsetSpace || {});
ccenum(InstantiateMethod);
ccenum(InstantiateSpace);
ccenum(OffsetSpace);
var InstantiableItem = class {
  constructor() {
    this.prefab = null;
    this.probability = 100;
  }
};
__decorateClass([
  property8({ type: Prefab, tooltip: "Prefab to place." })
], InstantiableItem.prototype, "prefab", 2);
__decorateClass([
  property8({ range: [0, 100, 1], slide: true, tooltip: "Relative chance of picking this prefab (%)." })
], InstantiableItem.prototype, "probability", 2);
InstantiableItem = __decorateClass([
  ccclass8("splines.InstantiableItem")
], InstantiableItem);
var InstantiateOffset = class {
  constructor(space = 0 /* Spline */) {
    this.min = new Vec3();
    this.max = new Vec3();
    this.randomX = false;
    this.randomY = false;
    this.randomZ = false;
    this.space = 0 /* Spline */;
    this.space = space;
  }
  get isZero() {
    return this.min.equals(Vec3.ZERO) && this.max.equals(Vec3.ZERO);
  }
  next(rand, out) {
    const pick = (lo, hi, random) => random ? lo + (hi - lo) * rand() : lo;
    return out.set(
      pick(this.min.x, this.max.x, this.randomX),
      pick(this.min.y, this.max.y, this.randomY),
      pick(this.min.z, this.max.z, this.randomZ)
    );
  }
};
__decorateClass([
  property8
], InstantiateOffset.prototype, "min", 2);
__decorateClass([
  property8
], InstantiateOffset.prototype, "max", 2);
__decorateClass([
  property8({ tooltip: "Pick X at random between min and max." })
], InstantiateOffset.prototype, "randomX", 2);
__decorateClass([
  property8({ tooltip: "Pick Y at random between min and max." })
], InstantiateOffset.prototype, "randomY", 2);
__decorateClass([
  property8({ tooltip: "Pick Z at random between min and max." })
], InstantiateOffset.prototype, "randomZ", 2);
__decorateClass([
  property8({ type: OffsetSpace, tooltip: "Axes the offset is applied along." })
], InstantiateOffset.prototype, "space", 2);
InstantiateOffset = __decorateClass([
  ccclass8("splines.InstantiateOffset")
], InstantiateOffset);
var AXES2 = [
  new Vec3(1, 0, 0),
  new Vec3(0, 1, 0),
  new Vec3(0, 0, 1),
  new Vec3(-1, 0, 0),
  new Vec3(0, -1, 0),
  new Vec3(0, 0, -1)
];
var GENERATED_FLAGS2 = CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy | CCObject.Flags.LockedInEditor;
var ROOT_NAME = "__SplineInstances";
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = a + 1831565813 >>> 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
var _p2 = new Vec3();
var _f2 = new Vec3();
var _u2 = new Vec3();
var _r2 = new Vec3();
var _q = new Quat();
var _q2 = new Quat();
var _off = new Vec3();
function lookRotation2(out, forward, up) {
  return Quat.fromViewUp(out, Vec3.normalize(new Vec3(), forward), Vec3.normalize(new Vec3(), up));
}
var SplineInstantiate = class extends Component {
  constructor() {
    super(...arguments);
    this.container = null;
    this.items = [new InstantiableItem()];
    this.method = 1 /* SpacingDistance */;
    this.count = new Vec2(10, 10);
    this.spacing = new Vec2(1, 1);
    this.space = 0 /* Spline */;
    this.upAxis = 1 /* YAxis */;
    this.forwardAxis = 2 /* ZAxis */;
    this.positionOffset = new InstantiateOffset();
    this.rotationOffset = new InstantiateOffset();
    this.scaleOffset = new InstantiateOffset(3 /* Object */);
    this.autoRefresh = true;
    this.seed = 0;
    this._root = null;
    this._stamp = NaN;
    this._instances = [];
  }
  /** The generated instances. */
  get instances() {
    return this._instances;
  }
  resetInEditor() {
    this.container = this.getComponent(SplineContainer);
  }
  onLoad() {
    if (!this.container) this.container = this.getComponent(SplineContainer);
  }
  onEnable() {
    this.updateInstances();
  }
  onDisable() {
    this.clear();
  }
  onDestroy() {
    var _a;
    this.clear();
    if ((_a = this._root) == null ? void 0 : _a.isValid) this._root.destroy();
    this._root = null;
  }
  update() {
    if (!this.autoRefresh) return;
    if (this.computeStamp() !== this._stamp) this.updateInstances();
  }
  /** Picks a new random seed and rebuilds. */
  randomizeSeed() {
    this.seed = Math.floor(Math.random() * 1e6);
    this.updateInstances();
  }
  computeStamp() {
    const c = this.container;
    let h = c && c.isValid ? c.changeStamp : 0;
    const mix2 = (v) => {
      h = Math.imul(h ^ Math.round(v * 1e4), 16777619);
    };
    mix2(this.method);
    mix2(this.count.x);
    mix2(this.count.y);
    mix2(this.spacing.x);
    mix2(this.spacing.y);
    mix2(this.space);
    mix2(this.upAxis);
    mix2(this.forwardAxis);
    mix2(this.seed);
    for (const o of [this.positionOffset, this.rotationOffset, this.scaleOffset]) {
      mix2(o.min.x);
      mix2(o.min.y);
      mix2(o.min.z);
      mix2(o.max.x);
      mix2(o.max.y);
      mix2(o.max.z);
      mix2((o.randomX ? 1 : 0) | (o.randomY ? 2 : 0) | (o.randomZ ? 4 : 0));
      mix2(o.space);
    }
    mix2(this.items.length);
    for (const it of this.items) {
      mix2(it.probability);
      const id = it.prefab ? String(it.prefab._uuid || it.prefab.name || "prefab") : "";
      for (let i = 0; i < id.length; i++) mix2(id.charCodeAt(i));
    }
    if (c && c.isValid) {
      const m = c.node.worldMatrix;
      mix2(m.m12);
      mix2(m.m13);
      mix2(m.m14);
      mix2(m.m00);
      mix2(m.m05);
      mix2(m.m10);
      mix2(m.m01);
      mix2(m.m02);
    }
    return h;
  }
  /** Removes the generated instances. */
  clear() {
    var _a;
    for (const n of this._instances) if (n.isValid) n.destroy();
    this._instances.length = 0;
    if ((_a = this._root) == null ? void 0 : _a.isValid) {
      for (const n of [...this._root.children]) n.destroy();
    }
  }
  ensureRoot() {
    if (this._root && this._root.isValid && this._root.parent === this.node) return this._root;
    let root = this.node.children.find((n) => n.name === ROOT_NAME && n._objFlags & CCObject.Flags.DontSave) || null;
    if (!root) {
      root = new Node(ROOT_NAME);
      root._objFlags |= GENERATED_FLAGS2;
      root.parent = this.node;
    }
    this._root = root;
    return root;
  }
  /** Where instances go: positions, rotations and scales (world space) and which item. */
  computePlacements() {
    const c = this.container;
    const res = [];
    if (!c || !c.isValid) return res;
    const weights = this.items.map((it) => it.prefab ? Math.max(0, it.probability) : 0);
    const total = weights.reduce((a, b) => a + b, 0);
    if (total <= 0) return res;
    const rand = rng(this.seed * 7919 + 1);
    const pickItem = () => {
      let r = rand() * total;
      for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r < 0 && weights[i] > 0) return i;
      }
      return weights.findIndex((w) => w > 0);
    };
    const fwdAxis = AXES2[this.forwardAxis] ?? AXES2[2];
    let upAxis = AXES2[this.upAxis] ?? AXES2[1];
    if (Math.abs(Vec3.dot(fwdAxis, upAxis)) > 0.99) upAxis = Math.abs(fwdAxis.y) > 0.99 ? AXES2[2] : AXES2[1];
    const remap = Quat.invert(new Quat(), lookRotation2(new Quat(), fwdAxis, upAxis));
    for (let si = 0; si < c.splines.length; si++) {
      const s = c.splines[si];
      if (s.count < 2) continue;
      const length = c.calculateLength(si);
      if (length <= 1e-6) continue;
      const ts = this.distributeT(c, si, length, s.closed, rand);
      for (const t of ts) {
        const item = pickItem();
        if (item < 0) continue;
        c.evaluatePosition(t, si, _p2);
        switch (this.space) {
          case 0 /* Spline */:
            c.evaluateDirection(t, si, _f2);
            c.evaluateUpVector(t, si, _u2);
            break;
          case 1 /* SplineObject */:
            Vec3.transformQuat(_f2, Vec3.UNIT_Z, c.node.worldRotation);
            Vec3.transformQuat(_u2, Vec3.UNIT_Y, c.node.worldRotation);
            break;
          default:
            _f2.set(0, 0, 1);
            _u2.set(0, 1, 0);
            break;
        }
        const frame = lookRotation2(new Quat(), _f2, _u2);
        const rotation = Quat.multiply(new Quat(), frame, remap);
        const position = _p2.clone();
        const prefabNode = this.items[item].prefab.data;
        const scale2 = prefabNode ? prefabNode.scale.clone() : new Vec3(1, 1, 1);
        if (!this.positionOffset.isZero) {
          this.positionOffset.next(rand, _off);
          Vec3.transformQuat(_off, _off, this.offsetRotation(this.positionOffset.space, frame, c, rotation));
          position.add(_off);
        }
        if (!this.rotationOffset.isZero) {
          this.rotationOffset.next(rand, _off);
          Quat.fromEuler(_q2, _off.x, _off.y, _off.z);
          const sp = this.rotationOffset.space;
          if (sp === 3 /* Object */) Quat.multiply(rotation, rotation, _q2);
          else {
            const S = this.offsetRotation(sp, frame, c, rotation).clone();
            Quat.multiply(_q, S, _q2);
            Quat.multiply(_q, _q, Quat.invert(new Quat(), S));
            Quat.multiply(rotation, _q, rotation);
          }
        }
        if (!this.scaleOffset.isZero) {
          this.scaleOffset.next(rand, _off);
          scale2.add(_off);
        }
        res.push({ spline: si, t, item, position, rotation, scale: scale2 });
      }
    }
    return res;
  }
  offsetRotation(space, splineFrame, c, instanceRotation) {
    switch (space) {
      case 0 /* Spline */:
        return splineFrame;
      case 1 /* SplineObject */:
        return c.node.worldRotation;
      case 3 /* Object */:
        return instanceRotation;
      default:
        return Quat.IDENTITY;
    }
  }
  /** Normalized t values of the instances on one spline. */
  distributeT(c, si, length, closed, rand) {
    const ts = [];
    const lo = (a, b) => Math.min(a, b);
    const hi = (a, b) => Math.max(a, b);
    if (this.method === 0 /* InstanceCount */) {
      const a = Math.max(0, Math.round(lo(this.count.x, this.count.y)));
      const b = Math.max(0, Math.round(hi(this.count.x, this.count.y)));
      const n = a + Math.floor(rand() * (b - a + 1));
      if (n === 1) ts.push(0);
      else for (let i = 0; i < n; i++) ts.push(closed ? i / n : i / (n - 1));
      return ts;
    }
    const minS = Math.max(1e-3, lo(this.spacing.x, this.spacing.y));
    const maxS = Math.max(minS, hi(this.spacing.x, this.spacing.y));
    const next = () => minS + (maxS - minS) * rand();
    const MAX = 1e4;
    if (this.method === 1 /* SpacingDistance */) {
      let d = 0;
      while (d <= length + 1e-6 && ts.length < MAX) {
        if (closed && d >= length - 1e-6 && ts.length) break;
        ts.push(Math.min(1, d / length));
        d += next();
      }
      return ts;
    }
    const steps = Math.max(64, Math.ceil(length / minS) * 8);
    let t = 0;
    ts.push(0);
    const from = c.evaluatePosition(0, si, new Vec3());
    let want = next();
    const p = new Vec3();
    for (let i = 1; i <= steps && ts.length < MAX; i++) {
      const ti = i / steps;
      c.evaluatePosition(ti, si, p);
      if (Vec3.distance(p, from) >= want - 1e-6) {
        let a = t;
        let b = ti;
        for (let k = 0; k < 12; k++) {
          const m = (a + b) / 2;
          c.evaluatePosition(m, si, p);
          if (Vec3.distance(p, from) >= want - 1e-6) b = m;
          else a = m;
        }
        if (closed && b >= 1 - 1e-6) break;
        ts.push(b);
        c.evaluatePosition(b, si, from);
        want = next();
        t = b;
      } else {
        t = ti;
      }
    }
    return ts;
  }
  /** Rebuilds the instances now. */
  updateInstances() {
    this._stamp = this.computeStamp();
    this.clear();
    if (!this.enabledInHierarchy) return;
    const placements = this.computePlacements();
    if (!placements.length) return;
    const root = this.ensureRoot();
    root.layer = this.node.layer;
    for (const pl of placements) {
      const prefab = this.items[pl.item].prefab;
      if (!prefab) continue;
      const n = instantiate(prefab);
      n._objFlags |= GENERATED_FLAGS2;
      n.parent = root;
      n.setWorldPosition(pl.position);
      n.setWorldRotation(pl.rotation);
      n.setScale(pl.scale);
      this._instances.push(n);
    }
  }
  /** Editor helper: placements with prefab uuids, for baking into regular nodes. */
  _bakeInfo() {
    if (!EDITOR) return [];
    return this.computePlacements().filter((p) => this.items[p.item].prefab).map((p) => ({
      prefab: this.items[p.item].prefab._uuid,
      position: [p.position.x, p.position.y, p.position.z],
      rotation: [p.rotation.x, p.rotation.y, p.rotation.z, p.rotation.w],
      scale: [p.scale.x, p.scale.y, p.scale.z]
    }));
  }
};
__decorateClass([
  property8({ type: SplineContainer, tooltip: "The splines to place instances along (all splines of the container)." })
], SplineInstantiate.prototype, "container", 2);
__decorateClass([
  property8({ type: [InstantiableItem], tooltip: "Prefabs to place, picked at random by probability." })
], SplineInstantiate.prototype, "items", 2);
__decorateClass([
  property8({ type: InstantiateMethod, tooltip: "How instances are spaced." })
], SplineInstantiate.prototype, "method", 2);
__decorateClass([
  property8({ tooltip: "Number of instances per spline (random between x and y).", visible() {
    return this.method === 0 /* InstanceCount */;
  } })
], SplineInstantiate.prototype, "count", 2);
__decorateClass([
  property8({ tooltip: "Distance between instances (random between x and y).", visible() {
    return this.method !== 0 /* InstanceCount */;
  } })
], SplineInstantiate.prototype, "spacing", 2);
__decorateClass([
  property8({ type: InstantiateSpace, tooltip: "Axes the instances are oriented to." })
], SplineInstantiate.prototype, "space", 2);
__decorateClass([
  property8({ type: AlignAxis, tooltip: "Instance axis that points up." })
], SplineInstantiate.prototype, "upAxis", 2);
__decorateClass([
  property8({ type: AlignAxis, tooltip: "Instance axis that points forward (along the spline)." })
], SplineInstantiate.prototype, "forwardAxis", 2);
__decorateClass([
  property8({ type: InstantiateOffset, tooltip: "Position offset." })
], SplineInstantiate.prototype, "positionOffset", 2);
__decorateClass([
  property8({ type: InstantiateOffset, tooltip: "Rotation offset (Euler angles, degrees)." })
], SplineInstantiate.prototype, "rotationOffset", 2);
__decorateClass([
  property8({ type: InstantiateOffset, tooltip: "Scale offset (added to the prefab\u2019s scale)." })
], SplineInstantiate.prototype, "scaleOffset", 2);
__decorateClass([
  property8({ tooltip: "Rebuild when the spline or a setting changes." })
], SplineInstantiate.prototype, "autoRefresh", 2);
__decorateClass([
  property8({ tooltip: "Random seed.", step: 1 })
], SplineInstantiate.prototype, "seed", 2);
SplineInstantiate = __decorateClass([
  ccclass8("SplineInstantiate"),
  executeInEditMode3,
  menu4("Splines/SplineInstantiate")
], SplineInstantiate);

// assets/runtime/SplineUtility.ts
var SplineUtility = class {
  static evaluatePosition(spline, t, out = new Vec3()) {
    return spline.evaluatePosition(t, out);
  }
  static evaluateTangent(spline, t, out = new Vec3()) {
    return spline.evaluateTangent(t, out);
  }
  static evaluateDirection(spline, t, out = new Vec3()) {
    return spline.evaluateDirection(t, out);
  }
  static evaluateUpVector(spline, t, out = new Vec3()) {
    return spline.evaluateUpVector(t, out);
  }
  static calculateLength(spline) {
    return spline.getLength();
  }
  static getNearestPoint(spline, point) {
    return spline.getNearestPoint(point);
  }
  /** The point `distance` along the spline from `fromT` (negative goes back). */
  static getPointAtDistance(spline, fromT, distance, out = new Vec3()) {
    const t = spline.getTAtDistance(fromT, distance);
    return { t, position: spline.evaluatePosition(t, out) };
  }
  static convertIndexUnit(spline, value, from, to) {
    return spline.convertIndexUnit(value, from, to);
  }
  /**
   * A new spline in a template shape (like Unity's SplineFactory).
   * `size` is the half width / radius; `plane2D` lays it in XY instead of XZ.
   */
  static createShape(shape, options = {}) {
    const s = new Spline();
    buildShape(s, shape, { size: 1, ...options }, splineFactory);
    s.markDirty();
    return s;
  }
  /** Fills an existing spline with a template shape. */
  static setShape(spline, shape, options = {}) {
    buildShape(spline, shape, { size: 1, ...options }, splineFactory);
    spline.markDirty();
  }
};

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

// tests/runtime.test.ts
var scene = new Node("Scene");
scene.isScene = true;
director._scene = scene;
function near(a, b, eps = 1e-4, msg = "") {
  import_assert2.default.ok(Math.abs(a - b) <= eps, `${msg} ${a} != ${b} (\xB1${eps})`);
}
function line(len2 = 10) {
  const node = new Node("Spline");
  node.setParent(scene);
  const c = node.addComponent(SplineContainer);
  c.spline.add(new Vec3(0, 0, 0), 1 /* Linear */);
  c.spline.add(new Vec3(len2, 0, 0), 1 /* Linear */);
  return { node, c };
}
console.log("\ncontainer");
test("world evaluation follows the node transform", () => {
  const { node, c } = line(10);
  node.setPosition(1, 2, 3);
  node.rotation.set(0, Math.SQRT1_2, 0, Math.SQRT1_2);
  const p = c.evaluatePosition(0.5);
  near(p.x, 1);
  near(p.y, 2);
  near(p.z, 3 - 5);
  const d = c.evaluateDirection(0.5);
  near(d.z, -1);
  near(c.calculateLength(), 10);
});
test("world length uses the node scale", () => {
  const { node, c } = line(10);
  node.setScale(2, 2, 2);
  near(c.calculateLength(), 20);
  near(c.spline.getLength(), 10, 1e-6, "local length");
});
test("nearest point in world space", () => {
  const { node, c } = line(10);
  node.setPosition(0, 0, 5);
  const r = c.getNearestPoint(new Vec3(4, 3, 5));
  near(r.position.x, 4, 1e-3);
  near(r.distance, 3, 1e-3);
  near(r.t, 0.4, 1e-3);
});
test("units conversion and shapes", () => {
  const { c } = line(10);
  near(c.spline.convertIndexUnit(0.5, 0 /* Normalized */, 1 /* Distance */), 5);
  near(c.spline.convertIndexUnit(2.5, 1 /* Distance */, 0 /* Normalized */), 0.25);
  const circle = SplineUtility.createShape("circle", { size: 2 });
  near(circle.getLength(), Math.PI * 4, 0.02);
});
test("CHANGED is emitted when a spline changes", () => {
  const { node, c } = line(10);
  let n = 0;
  node.on(SplineContainer.EventType.CHANGED, () => n++);
  c.checkChanged();
  const before = n;
  c.spline.setKnotPosition(1, new Vec3(12, 0, 0));
  c.checkChanged();
  import_assert2.default.strictEqual(n, before + 1);
  c.checkChanged();
  import_assert2.default.strictEqual(n, before + 1, "no change, no event");
});
console.log("\nSplineAnimate");
function animated(opts = {}) {
  const { c } = line(10);
  const mover = new Node("Mover");
  mover.setParent(scene);
  const a = mover.addComponent(SplineAnimate);
  a.container = c;
  Object.assign(a, opts);
  return { a, mover, c };
}
test("time mode: position along the spline after some seconds", () => {
  const { a, mover } = animated({ duration: 4, loopMode: 1 /* Loop */ });
  a.play();
  a.update(1);
  near(mover.worldPosition.x, 2.5, 1e-3);
  a.update(4);
  near(mover.worldPosition.x, 2.5, 1e-3, "looped");
});
test("once mode stops at the end and reports completion", () => {
  const { a, mover } = animated({ duration: 2, loopMode: 0 /* Once */ });
  let done = 0;
  mover.on(SplineAnimate.EventType.COMPLETED, () => done++);
  a.play();
  a.update(1.5);
  a.update(1.5);
  near(mover.worldPosition.x, 10, 1e-3);
  import_assert2.default.strictEqual(a.isPlaying, false);
  import_assert2.default.strictEqual(done, 1);
});
test("ping-pong comes back", () => {
  const { a, mover } = animated({ duration: 2, loopMode: 3 /* PingPong */ });
  a.play();
  a.update(3);
  near(mover.worldPosition.x, 5, 1e-3);
});
test("speed mode converts the speed into a duration", () => {
  const { a, mover } = animated({ method: 1 /* Speed */, maxSpeed: 5 });
  near(a.currentDuration(), 2);
  a.play();
  a.update(1);
  near(mover.worldPosition.x, 5, 1e-3);
});
test("ease in starts slow", () => {
  const { a, mover } = animated({ duration: 2, easing: 1 /* EaseIn */, loopMode: 0 /* Once */ });
  a.play();
  a.update(1);
  near(mover.worldPosition.x, 2.5, 1e-3);
});
test("alignment: the forward axis points along the spline", () => {
  const { a, mover } = animated({ duration: 1, alignment: 1 /* SplineElement */, objectForwardAxis: 2 /* ZAxis */, objectUpAxis: 1 /* YAxis */ });
  a.normalizedTime = 0.5;
  const fwd = Vec3.transformQuat(new Vec3(), new Vec3(0, 0, 1), mover.worldRotation);
  near(fwd.x, 1, 1e-4);
  a.objectForwardAxis = 0 /* XAxis */;
  a.objectUpAxis = 2 /* ZAxis */;
  a.normalizedTime = 0.5;
  const x = Vec3.transformQuat(new Vec3(), new Vec3(1, 0, 0), mover.worldRotation);
  near(x.x, 1, 1e-4);
});
test("editor preview moves the object and puts it back", () => {
  const { a, mover } = animated({ duration: 2 });
  mover.setWorldPosition(0, 7, 0);
  const r = a._previewSetTime(1);
  near(r.normalizedTime, 0.5, 1e-6);
  near(mover.worldPosition.x, 5, 1e-3);
  a._previewStop();
  near(mover.worldPosition.y, 7, 1e-6);
  near(mover.worldPosition.x, 0, 1e-6);
});
console.log("\nSplineExtrude");
test("circle tube: vertex count, outward normals and caps", () => {
  const { node, c } = line(10);
  const e = node.addComponent(SplineExtrude);
  e.container = c;
  e.sides = 8;
  e.radius = 0.5;
  e.segmentsPerUnit = 1;
  e.capped = true;
  e.rebuild();
  const g = e.mesh.geometry;
  const rings = 11;
  const ringVerts = 9;
  const caps = 2 * (1 + ringVerts);
  import_assert2.default.strictEqual(g.positions.length / 3, rings * ringVerts + caps);
  for (let i = 0; i < rings * ringVerts; i++) {
    const y = g.positions[i * 3 + 1];
    const z = g.positions[i * 3 + 2];
    const ny = g.normals[i * 3 + 1];
    const nz = g.normals[i * 3 + 2];
    import_assert2.default.ok(y * ny + z * nz > 0.2, `normal ${i}`);
  }
  for (let t = 0; t < g.indices.length; t += 3) {
    const [a, b, d] = [g.indices[t], g.indices[t + 1], g.indices[t + 2]];
    const p = (i) => new Vec3(g.positions[i * 3], g.positions[i * 3 + 1], g.positions[i * 3 + 2]);
    const n = Vec3.cross(new Vec3(), Vec3.subtract(new Vec3(), p(b), p(a)), Vec3.subtract(new Vec3(), p(d), p(a)));
    if (n.lengthSqr() < 1e-12) continue;
    const vn = new Vec3(g.normals[a * 3], g.normals[a * 3 + 1], g.normals[a * 3 + 2]);
    import_assert2.default.ok(Vec3.dot(n, vn) > 0, `triangle ${t / 3} faces its normal`);
  }
});
test("road shape faces up; flip normals reverses", () => {
  const { node, c } = line(4);
  const e = node.addComponent(SplineExtrude);
  e.container = c;
  e.shape = 2 /* Road */;
  e.rebuild();
  const g = e.mesh.geometry;
  import_assert2.default.ok(g.normals[1] > 0.99, "road normal +Y");
  e.flipNormals = true;
  e.rebuild();
  import_assert2.default.ok(e.mesh.geometry.normals[1] < -0.99);
});
test("rebuilds when the spline changes", () => {
  var _a, _b;
  const { node, c } = line(4);
  const e = node.addComponent(SplineExtrude);
  e.container = c;
  e.rebuild();
  const m1 = e.mesh;
  e.update();
  import_assert2.default.strictEqual(e.mesh, m1, "no change, no rebuild");
  c.spline.setKnotPosition(1, new Vec3(8, 0, 0));
  (_b = (_a = director).tick) == null ? void 0 : _b.call(_a);
  e.update();
  import_assert2.default.notStrictEqual(e.mesh, m1);
});
console.log("\nSplineInstantiate");
function instantiateOn(len2, opts = {}) {
  const { node, c } = line(len2);
  const si = node.addComponent(SplineInstantiate);
  const item = new InstantiableItem();
  item.prefab = new Prefab(new Node("Tree"));
  si.items = [item];
  si.container = c;
  Object.assign(si, opts);
  si.updateInstances();
  return si;
}
test("spacing distance places instances every unit", () => {
  const si = instantiateOn(10, { method: 1 /* SpacingDistance */, spacing: new Vec2(1, 1) });
  import_assert2.default.strictEqual(si.instances.length, 11);
  near(si.instances[3].worldPosition.x, 3, 1e-3);
});
test("instance count spreads evenly", () => {
  const si = instantiateOn(10, { method: 0 /* InstanceCount */, count: new Vec2(5, 5) });
  import_assert2.default.strictEqual(si.instances.length, 5);
  near(si.instances[4].worldPosition.x, 10, 1e-3);
});
test("linear distance measures straight lines", () => {
  const si = instantiateOn(10, { method: 2 /* LinearDistance */, spacing: new Vec2(2.5, 2.5) });
  import_assert2.default.strictEqual(si.instances.length, 5);
  near(si.instances[2].worldPosition.x, 5, 0.01);
});
test("random offsets are repeatable with a seed", () => {
  const a = instantiateOn(10, { seed: 7 });
  a.positionOffset.max.set(0, 1, 0);
  a.positionOffset.randomY = true;
  a.updateInstances();
  const ys = a.instances.map((n) => n.worldPosition.y);
  import_assert2.default.ok(ys.some((y) => y > 0.01), "offset applied");
  a.updateInstances();
  import_assert2.default.deepStrictEqual(a.instances.map((n) => n.worldPosition.y), ys);
  a.seed = 8;
  a.updateInstances();
  import_assert2.default.notDeepStrictEqual(a.instances.map((n) => n.worldPosition.y), ys);
});
test("generated instances are not saved", () => {
  const si = instantiateOn(4);
  for (const n of si.instances) {
    let flagged = false;
    for (let p = n; p; p = p.parent) if (p._objFlags & CCObject.Flags.DontSave) flagged = true;
    import_assert2.default.ok(flagged);
  }
  const info = si._bakeInfo();
  import_assert2.default.strictEqual(info.length, si.instances.length);
});
console.log(`
${results.passed} passed, ${results.failed} failed`);
process.exitCode = results.failed ? 1 : 0;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcnVudGltZS50ZXN0LnRzIiwgIi4uL3N0dWJzL2NjLnRzIiwgIi4uL3N0dWJzL2NjLWVudi50cyIsICIuLi8uLi9hc3NldHMvY29yZS9tYXRoLnRzIiwgIi4uLy4uL2Fzc2V0cy9jb3JlL2N1cnZlLnRzIiwgIi4uLy4uL2Fzc2V0cy9jb3JlL3NwbGluZS1jb3JlLnRzIiwgIi4uLy4uL2Fzc2V0cy9ydW50aW1lL0Jlemllcktub3QudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvS25vdExpbmsudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lLnRzIiwgIi4uLy4uL2Fzc2V0cy9ydW50aW1lL1NwbGluZUNvbnRhaW5lci50cyIsICIuLi8uLi9hc3NldHMvcnVudGltZS9TcGxpbmVBbmltYXRlLnRzIiwgIi4uLy4uL2Fzc2V0cy9ydW50aW1lL1NwbGluZUV4dHJ1ZGUudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lSW5zdGFudGlhdGUudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lVXRpbGl0eS50cyIsICIuLi9oYXJuZXNzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIFJ1bnRpbWUgY29tcG9uZW50cyB3aXRoIHRoZSBlbmdpbmUgc3R1YjogY29udGFpbmVyIGV2YWx1YXRpb24gaW4gd29ybGRcbiAqIHNwYWNlLCBTcGxpbmVBbmltYXRlLCBTcGxpbmVFeHRydWRlIGFuZCBTcGxpbmVJbnN0YW50aWF0ZS5cbiAqL1xuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0ICogYXMgY2MgZnJvbSAnLi9zdHVicy9jYyc7XG5pbXBvcnQgeyBTcGxpbmVDb250YWluZXIgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9TcGxpbmVDb250YWluZXInO1xuaW1wb3J0IHsgVGFuZ2VudE1vZGUgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9CZXppZXJLbm90JztcbmltcG9ydCB7IFNwbGluZUFuaW1hdGUsIFNwbGluZUFuaW1hdGVMb29wTW9kZSwgU3BsaW5lQW5pbWF0ZUVhc2luZywgU3BsaW5lQW5pbWF0ZUFsaWdubWVudCwgQWxpZ25BeGlzLCBTcGxpbmVBbmltYXRlTWV0aG9kIH0gZnJvbSAnLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lQW5pbWF0ZSc7XG5pbXBvcnQgeyBTcGxpbmVFeHRydWRlLCBFeHRydWRlU2hhcGUgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9TcGxpbmVFeHRydWRlJztcbmltcG9ydCB7IFNwbGluZUluc3RhbnRpYXRlLCBJbnN0YW50aWFibGVJdGVtLCBJbnN0YW50aWF0ZU1ldGhvZCB9IGZyb20gJy4uL2Fzc2V0cy9ydW50aW1lL1NwbGluZUluc3RhbnRpYXRlJztcbmltcG9ydCB7IFNwbGluZVV0aWxpdHkgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9TcGxpbmVVdGlsaXR5JztcbmltcG9ydCB7IFBhdGhJbmRleFVuaXQgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9TcGxpbmUnO1xuaW1wb3J0IHsgdGVzdCwgcmVzdWx0cyB9IGZyb20gJy4vaGFybmVzcyc7XG5cbmNvbnN0IHNjZW5lID0gbmV3IGNjLk5vZGUoJ1NjZW5lJyk7XG4oc2NlbmUgYXMgYW55KS5pc1NjZW5lID0gdHJ1ZTtcbmNjLmRpcmVjdG9yLl9zY2VuZSA9IHNjZW5lO1xuXG5mdW5jdGlvbiBuZWFyKGE6IG51bWJlciwgYjogbnVtYmVyLCBlcHMgPSAxZS00LCBtc2cgPSAnJykge1xuICAgIGFzc2VydC5vayhNYXRoLmFicyhhIC0gYikgPD0gZXBzLCBgJHttc2d9ICR7YX0gIT0gJHtifSAoXHUwMEIxJHtlcHN9KWApO1xufVxuXG5mdW5jdGlvbiBsaW5lKGxlbiA9IDEwKTogeyBub2RlOiBjYy5Ob2RlOyBjOiBTcGxpbmVDb250YWluZXIgfSB7XG4gICAgY29uc3Qgbm9kZSA9IG5ldyBjYy5Ob2RlKCdTcGxpbmUnKTtcbiAgICBub2RlLnNldFBhcmVudChzY2VuZSk7XG4gICAgY29uc3QgYyA9IG5vZGUuYWRkQ29tcG9uZW50KFNwbGluZUNvbnRhaW5lcikgYXMgU3BsaW5lQ29udGFpbmVyO1xuICAgIGMuc3BsaW5lLmFkZChuZXcgY2MuVmVjMygwLCAwLCAwKSBhcyBhbnksIFRhbmdlbnRNb2RlLkxpbmVhcik7XG4gICAgYy5zcGxpbmUuYWRkKG5ldyBjYy5WZWMzKGxlbiwgMCwgMCkgYXMgYW55LCBUYW5nZW50TW9kZS5MaW5lYXIpO1xuICAgIHJldHVybiB7IG5vZGUsIGMgfTtcbn1cblxuY29uc29sZS5sb2coJ1xcbmNvbnRhaW5lcicpO1xuXG50ZXN0KCd3b3JsZCBldmFsdWF0aW9uIGZvbGxvd3MgdGhlIG5vZGUgdHJhbnNmb3JtJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgbm9kZSwgYyB9ID0gbGluZSgxMCk7XG4gICAgbm9kZS5zZXRQb3NpdGlvbigxLCAyLCAzKTtcbiAgICBub2RlLnJvdGF0aW9uLnNldCgwLCBNYXRoLlNRUlQxXzIsIDAsIE1hdGguU1FSVDFfMik7IC8vIDkwIGRlZ3JlZXMgYXJvdW5kIFk6ICtYIC0+IC1aXG4gICAgY29uc3QgcCA9IGMuZXZhbHVhdGVQb3NpdGlvbigwLjUpO1xuICAgIG5lYXIocC54LCAxKTtcbiAgICBuZWFyKHAueSwgMik7XG4gICAgbmVhcihwLnosIDMgLSA1KTtcbiAgICBjb25zdCBkID0gYy5ldmFsdWF0ZURpcmVjdGlvbigwLjUpO1xuICAgIG5lYXIoZC56LCAtMSk7XG4gICAgbmVhcihjLmNhbGN1bGF0ZUxlbmd0aCgpLCAxMCk7XG59KTtcblxudGVzdCgnd29ybGQgbGVuZ3RoIHVzZXMgdGhlIG5vZGUgc2NhbGUnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlLCBjIH0gPSBsaW5lKDEwKTtcbiAgICBub2RlLnNldFNjYWxlKDIsIDIsIDIpO1xuICAgIG5lYXIoYy5jYWxjdWxhdGVMZW5ndGgoKSwgMjApO1xuICAgIG5lYXIoYy5zcGxpbmUuZ2V0TGVuZ3RoKCksIDEwLCAxZS02LCAnbG9jYWwgbGVuZ3RoJyk7XG59KTtcblxudGVzdCgnbmVhcmVzdCBwb2ludCBpbiB3b3JsZCBzcGFjZScsICgpID0+IHtcbiAgICBjb25zdCB7IG5vZGUsIGMgfSA9IGxpbmUoMTApO1xuICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMCwgNSk7XG4gICAgY29uc3QgciA9IGMuZ2V0TmVhcmVzdFBvaW50KG5ldyBjYy5WZWMzKDQsIDMsIDUpIGFzIGFueSkhO1xuICAgIG5lYXIoci5wb3NpdGlvbi54LCA0LCAxZS0zKTtcbiAgICBuZWFyKHIuZGlzdGFuY2UsIDMsIDFlLTMpO1xuICAgIG5lYXIoci50LCAwLjQsIDFlLTMpO1xufSk7XG5cbnRlc3QoJ3VuaXRzIGNvbnZlcnNpb24gYW5kIHNoYXBlcycsICgpID0+IHtcbiAgICBjb25zdCB7IGMgfSA9IGxpbmUoMTApO1xuICAgIG5lYXIoYy5zcGxpbmUuY29udmVydEluZGV4VW5pdCgwLjUsIFBhdGhJbmRleFVuaXQuTm9ybWFsaXplZCwgUGF0aEluZGV4VW5pdC5EaXN0YW5jZSksIDUpO1xuICAgIG5lYXIoYy5zcGxpbmUuY29udmVydEluZGV4VW5pdCgyLjUsIFBhdGhJbmRleFVuaXQuRGlzdGFuY2UsIFBhdGhJbmRleFVuaXQuTm9ybWFsaXplZCksIDAuMjUpO1xuICAgIGNvbnN0IGNpcmNsZSA9IFNwbGluZVV0aWxpdHkuY3JlYXRlU2hhcGUoJ2NpcmNsZScsIHsgc2l6ZTogMiB9KTtcbiAgICBuZWFyKGNpcmNsZS5nZXRMZW5ndGgoKSwgTWF0aC5QSSAqIDQsIDAuMDIpO1xufSk7XG5cbnRlc3QoJ0NIQU5HRUQgaXMgZW1pdHRlZCB3aGVuIGEgc3BsaW5lIGNoYW5nZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlLCBjIH0gPSBsaW5lKDEwKTtcbiAgICBsZXQgbiA9IDA7XG4gICAgbm9kZS5vbihTcGxpbmVDb250YWluZXIuRXZlbnRUeXBlLkNIQU5HRUQsICgpID0+IG4rKyk7XG4gICAgYy5jaGVja0NoYW5nZWQoKTtcbiAgICBjb25zdCBiZWZvcmUgPSBuO1xuICAgIGMuc3BsaW5lLnNldEtub3RQb3NpdGlvbigxLCBuZXcgY2MuVmVjMygxMiwgMCwgMCkgYXMgYW55KTtcbiAgICBjLmNoZWNrQ2hhbmdlZCgpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChuLCBiZWZvcmUgKyAxKTtcbiAgICBjLmNoZWNrQ2hhbmdlZCgpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChuLCBiZWZvcmUgKyAxLCAnbm8gY2hhbmdlLCBubyBldmVudCcpO1xufSk7XG5cbmNvbnNvbGUubG9nKCdcXG5TcGxpbmVBbmltYXRlJyk7XG5cbmZ1bmN0aW9uIGFuaW1hdGVkKG9wdHM6IFBhcnRpYWw8U3BsaW5lQW5pbWF0ZT4gPSB7fSkge1xuICAgIGNvbnN0IHsgYyB9ID0gbGluZSgxMCk7XG4gICAgY29uc3QgbW92ZXIgPSBuZXcgY2MuTm9kZSgnTW92ZXInKTtcbiAgICBtb3Zlci5zZXRQYXJlbnQoc2NlbmUpO1xuICAgIGNvbnN0IGEgPSBtb3Zlci5hZGRDb21wb25lbnQoU3BsaW5lQW5pbWF0ZSkgYXMgU3BsaW5lQW5pbWF0ZTtcbiAgICBhLmNvbnRhaW5lciA9IGM7XG4gICAgT2JqZWN0LmFzc2lnbihhLCBvcHRzKTtcbiAgICByZXR1cm4geyBhLCBtb3ZlciwgYyB9O1xufVxuXG50ZXN0KCd0aW1lIG1vZGU6IHBvc2l0aW9uIGFsb25nIHRoZSBzcGxpbmUgYWZ0ZXIgc29tZSBzZWNvbmRzJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgYSwgbW92ZXIgfSA9IGFuaW1hdGVkKHsgZHVyYXRpb246IDQsIGxvb3BNb2RlOiBTcGxpbmVBbmltYXRlTG9vcE1vZGUuTG9vcCB9KTtcbiAgICBhLnBsYXkoKTtcbiAgICBhLnVwZGF0ZSgxKTtcbiAgICBuZWFyKG1vdmVyLndvcmxkUG9zaXRpb24ueCwgMi41LCAxZS0zKTtcbiAgICBhLnVwZGF0ZSg0KTtcbiAgICBuZWFyKG1vdmVyLndvcmxkUG9zaXRpb24ueCwgMi41LCAxZS0zLCAnbG9vcGVkJyk7XG59KTtcblxudGVzdCgnb25jZSBtb2RlIHN0b3BzIGF0IHRoZSBlbmQgYW5kIHJlcG9ydHMgY29tcGxldGlvbicsICgpID0+IHtcbiAgICBjb25zdCB7IGEsIG1vdmVyIH0gPSBhbmltYXRlZCh7IGR1cmF0aW9uOiAyLCBsb29wTW9kZTogU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLk9uY2UgfSk7XG4gICAgbGV0IGRvbmUgPSAwO1xuICAgIG1vdmVyLm9uKFNwbGluZUFuaW1hdGUuRXZlbnRUeXBlLkNPTVBMRVRFRCwgKCkgPT4gZG9uZSsrKTtcbiAgICBhLnBsYXkoKTtcbiAgICBhLnVwZGF0ZSgxLjUpO1xuICAgIGEudXBkYXRlKDEuNSk7XG4gICAgbmVhcihtb3Zlci53b3JsZFBvc2l0aW9uLngsIDEwLCAxZS0zKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYS5pc1BsYXlpbmcsIGZhbHNlKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZG9uZSwgMSk7XG59KTtcblxudGVzdCgncGluZy1wb25nIGNvbWVzIGJhY2snLCAoKSA9PiB7XG4gICAgY29uc3QgeyBhLCBtb3ZlciB9ID0gYW5pbWF0ZWQoeyBkdXJhdGlvbjogMiwgbG9vcE1vZGU6IFNwbGluZUFuaW1hdGVMb29wTW9kZS5QaW5nUG9uZyB9KTtcbiAgICBhLnBsYXkoKTtcbiAgICBhLnVwZGF0ZSgzKTtcbiAgICBuZWFyKG1vdmVyLndvcmxkUG9zaXRpb24ueCwgNSwgMWUtMyk7XG59KTtcblxudGVzdCgnc3BlZWQgbW9kZSBjb252ZXJ0cyB0aGUgc3BlZWQgaW50byBhIGR1cmF0aW9uJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgYSwgbW92ZXIgfSA9IGFuaW1hdGVkKHsgbWV0aG9kOiBTcGxpbmVBbmltYXRlTWV0aG9kLlNwZWVkLCBtYXhTcGVlZDogNSB9KTtcbiAgICBuZWFyKGEuY3VycmVudER1cmF0aW9uKCksIDIpO1xuICAgIGEucGxheSgpO1xuICAgIGEudXBkYXRlKDEpO1xuICAgIG5lYXIobW92ZXIud29ybGRQb3NpdGlvbi54LCA1LCAxZS0zKTtcbn0pO1xuXG50ZXN0KCdlYXNlIGluIHN0YXJ0cyBzbG93JywgKCkgPT4ge1xuICAgIGNvbnN0IHsgYSwgbW92ZXIgfSA9IGFuaW1hdGVkKHsgZHVyYXRpb246IDIsIGVhc2luZzogU3BsaW5lQW5pbWF0ZUVhc2luZy5FYXNlSW4sIGxvb3BNb2RlOiBTcGxpbmVBbmltYXRlTG9vcE1vZGUuT25jZSB9KTtcbiAgICBhLnBsYXkoKTtcbiAgICBhLnVwZGF0ZSgxKTtcbiAgICBuZWFyKG1vdmVyLndvcmxkUG9zaXRpb24ueCwgMi41LCAxZS0zKTsgLy8gdCA9IDAuNSAtPiAwLjI1XG59KTtcblxudGVzdCgnYWxpZ25tZW50OiB0aGUgZm9yd2FyZCBheGlzIHBvaW50cyBhbG9uZyB0aGUgc3BsaW5lJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgYSwgbW92ZXIgfSA9IGFuaW1hdGVkKHsgZHVyYXRpb246IDEsIGFsaWdubWVudDogU3BsaW5lQW5pbWF0ZUFsaWdubWVudC5TcGxpbmVFbGVtZW50LCBvYmplY3RGb3J3YXJkQXhpczogQWxpZ25BeGlzLlpBeGlzLCBvYmplY3RVcEF4aXM6IEFsaWduQXhpcy5ZQXhpcyB9KTtcbiAgICBhLm5vcm1hbGl6ZWRUaW1lID0gMC41O1xuICAgIGNvbnN0IGZ3ZCA9IGNjLlZlYzMudHJhbnNmb3JtUXVhdChuZXcgY2MuVmVjMygpLCBuZXcgY2MuVmVjMygwLCAwLCAxKSwgbW92ZXIud29ybGRSb3RhdGlvbik7XG4gICAgbmVhcihmd2QueCwgMSwgMWUtNCk7XG4gICAgLy8gMkQgc3ByaXRlczogK1ggYWxvbmcgdGhlIHNwbGluZSwgK1ogdXAuXG4gICAgYS5vYmplY3RGb3J3YXJkQXhpcyA9IEFsaWduQXhpcy5YQXhpcztcbiAgICBhLm9iamVjdFVwQXhpcyA9IEFsaWduQXhpcy5aQXhpcztcbiAgICBhLm5vcm1hbGl6ZWRUaW1lID0gMC41O1xuICAgIGNvbnN0IHggPSBjYy5WZWMzLnRyYW5zZm9ybVF1YXQobmV3IGNjLlZlYzMoKSwgbmV3IGNjLlZlYzMoMSwgMCwgMCksIG1vdmVyLndvcmxkUm90YXRpb24pO1xuICAgIG5lYXIoeC54LCAxLCAxZS00KTtcbn0pO1xuXG50ZXN0KCdlZGl0b3IgcHJldmlldyBtb3ZlcyB0aGUgb2JqZWN0IGFuZCBwdXRzIGl0IGJhY2snLCAoKSA9PiB7XG4gICAgY29uc3QgeyBhLCBtb3ZlciB9ID0gYW5pbWF0ZWQoeyBkdXJhdGlvbjogMiB9KTtcbiAgICBtb3Zlci5zZXRXb3JsZFBvc2l0aW9uKDAsIDcsIDApO1xuICAgIGNvbnN0IHIgPSBhLl9wcmV2aWV3U2V0VGltZSgxKTtcbiAgICBuZWFyKHIubm9ybWFsaXplZFRpbWUsIDAuNSwgMWUtNik7XG4gICAgbmVhcihtb3Zlci53b3JsZFBvc2l0aW9uLngsIDUsIDFlLTMpO1xuICAgIGEuX3ByZXZpZXdTdG9wKCk7XG4gICAgbmVhcihtb3Zlci53b3JsZFBvc2l0aW9uLnksIDcsIDFlLTYpO1xuICAgIG5lYXIobW92ZXIud29ybGRQb3NpdGlvbi54LCAwLCAxZS02KTtcbn0pO1xuXG5jb25zb2xlLmxvZygnXFxuU3BsaW5lRXh0cnVkZScpO1xuXG50ZXN0KCdjaXJjbGUgdHViZTogdmVydGV4IGNvdW50LCBvdXR3YXJkIG5vcm1hbHMgYW5kIGNhcHMnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlLCBjIH0gPSBsaW5lKDEwKTtcbiAgICBjb25zdCBlID0gbm9kZS5hZGRDb21wb25lbnQoU3BsaW5lRXh0cnVkZSkgYXMgU3BsaW5lRXh0cnVkZTtcbiAgICBlLmNvbnRhaW5lciA9IGM7XG4gICAgZS5zaWRlcyA9IDg7XG4gICAgZS5yYWRpdXMgPSAwLjU7XG4gICAgZS5zZWdtZW50c1BlclVuaXQgPSAxO1xuICAgIGUuY2FwcGVkID0gdHJ1ZTtcbiAgICBlLnJlYnVpbGQoKTtcbiAgICBjb25zdCBnID0gKGUubWVzaCBhcyBhbnkpLmdlb21ldHJ5O1xuICAgIGNvbnN0IHJpbmdzID0gMTE7XG4gICAgY29uc3QgcmluZ1ZlcnRzID0gOTtcbiAgICBjb25zdCBjYXBzID0gMiAqICgxICsgcmluZ1ZlcnRzKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZy5wb3NpdGlvbnMubGVuZ3RoIC8gMywgcmluZ3MgKiByaW5nVmVydHMgKyBjYXBzKTtcbiAgICAvLyBTaWRlIG5vcm1hbHMgcG9pbnQgYXdheSBmcm9tIHRoZSBzcGxpbmUgYXhpcy5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJpbmdzICogcmluZ1ZlcnRzOyBpKyspIHtcbiAgICAgICAgY29uc3QgeSA9IGcucG9zaXRpb25zW2kgKiAzICsgMV07XG4gICAgICAgIGNvbnN0IHogPSBnLnBvc2l0aW9uc1tpICogMyArIDJdO1xuICAgICAgICBjb25zdCBueSA9IGcubm9ybWFsc1tpICogMyArIDFdO1xuICAgICAgICBjb25zdCBueiA9IGcubm9ybWFsc1tpICogMyArIDJdO1xuICAgICAgICBhc3NlcnQub2soeSAqIG55ICsgeiAqIG56ID4gMC4yLCBgbm9ybWFsICR7aX1gKTtcbiAgICB9XG4gICAgLy8gVHJpYW5nbGUgd2luZGluZyBhZ3JlZXMgd2l0aCB0aGUgbm9ybWFscyAoY291bnRlci1jbG9ja3dpc2UgZnJvbnQgZmFjZXMpLlxuICAgIGZvciAobGV0IHQgPSAwOyB0IDwgZy5pbmRpY2VzLmxlbmd0aDsgdCArPSAzKSB7XG4gICAgICAgIGNvbnN0IFthLCBiLCBkXSA9IFtnLmluZGljZXNbdF0sIGcuaW5kaWNlc1t0ICsgMV0sIGcuaW5kaWNlc1t0ICsgMl1dO1xuICAgICAgICBjb25zdCBwID0gKGk6IG51bWJlcikgPT4gbmV3IGNjLlZlYzMoZy5wb3NpdGlvbnNbaSAqIDNdLCBnLnBvc2l0aW9uc1tpICogMyArIDFdLCBnLnBvc2l0aW9uc1tpICogMyArIDJdKTtcbiAgICAgICAgY29uc3QgbiA9IGNjLlZlYzMuY3Jvc3MobmV3IGNjLlZlYzMoKSwgY2MuVmVjMy5zdWJ0cmFjdChuZXcgY2MuVmVjMygpLCBwKGIpLCBwKGEpKSwgY2MuVmVjMy5zdWJ0cmFjdChuZXcgY2MuVmVjMygpLCBwKGQpLCBwKGEpKSk7XG4gICAgICAgIGlmIChuLmxlbmd0aFNxcigpIDwgMWUtMTIpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCB2biA9IG5ldyBjYy5WZWMzKGcubm9ybWFsc1thICogM10sIGcubm9ybWFsc1thICogMyArIDFdLCBnLm5vcm1hbHNbYSAqIDMgKyAyXSk7XG4gICAgICAgIGFzc2VydC5vayhjYy5WZWMzLmRvdChuLCB2bikgPiAwLCBgdHJpYW5nbGUgJHt0IC8gM30gZmFjZXMgaXRzIG5vcm1hbGApO1xuICAgIH1cbn0pO1xuXG50ZXN0KCdyb2FkIHNoYXBlIGZhY2VzIHVwOyBmbGlwIG5vcm1hbHMgcmV2ZXJzZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlLCBjIH0gPSBsaW5lKDQpO1xuICAgIGNvbnN0IGUgPSBub2RlLmFkZENvbXBvbmVudChTcGxpbmVFeHRydWRlKSBhcyBTcGxpbmVFeHRydWRlO1xuICAgIGUuY29udGFpbmVyID0gYztcbiAgICBlLnNoYXBlID0gRXh0cnVkZVNoYXBlLlJvYWQ7XG4gICAgZS5yZWJ1aWxkKCk7XG4gICAgY29uc3QgZyA9IChlLm1lc2ggYXMgYW55KS5nZW9tZXRyeTtcbiAgICBhc3NlcnQub2soZy5ub3JtYWxzWzFdID4gMC45OSwgJ3JvYWQgbm9ybWFsICtZJyk7XG4gICAgZS5mbGlwTm9ybWFscyA9IHRydWU7XG4gICAgZS5yZWJ1aWxkKCk7XG4gICAgYXNzZXJ0Lm9rKChlLm1lc2ggYXMgYW55KS5nZW9tZXRyeS5ub3JtYWxzWzFdIDwgLTAuOTkpO1xufSk7XG5cbnRlc3QoJ3JlYnVpbGRzIHdoZW4gdGhlIHNwbGluZSBjaGFuZ2VzJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgbm9kZSwgYyB9ID0gbGluZSg0KTtcbiAgICBjb25zdCBlID0gbm9kZS5hZGRDb21wb25lbnQoU3BsaW5lRXh0cnVkZSkgYXMgU3BsaW5lRXh0cnVkZTtcbiAgICBlLmNvbnRhaW5lciA9IGM7XG4gICAgZS5yZWJ1aWxkKCk7XG4gICAgY29uc3QgbTEgPSBlLm1lc2g7XG4gICAgZS51cGRhdGUoKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZS5tZXNoLCBtMSwgJ25vIGNoYW5nZSwgbm8gcmVidWlsZCcpO1xuICAgIGMuc3BsaW5lLnNldEtub3RQb3NpdGlvbigxLCBuZXcgY2MuVmVjMyg4LCAwLCAwKSBhcyBhbnkpO1xuICAgIChjYy5kaXJlY3RvciBhcyBhbnkpLnRpY2s/LigpO1xuICAgIGUudXBkYXRlKCk7XG4gICAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKGUubWVzaCwgbTEpO1xufSk7XG5cbmNvbnNvbGUubG9nKCdcXG5TcGxpbmVJbnN0YW50aWF0ZScpO1xuXG5mdW5jdGlvbiBpbnN0YW50aWF0ZU9uKGxlbjogbnVtYmVyLCBvcHRzOiBQYXJ0aWFsPFNwbGluZUluc3RhbnRpYXRlPiA9IHt9KSB7XG4gICAgY29uc3QgeyBub2RlLCBjIH0gPSBsaW5lKGxlbik7XG4gICAgY29uc3Qgc2kgPSBub2RlLmFkZENvbXBvbmVudChTcGxpbmVJbnN0YW50aWF0ZSkgYXMgU3BsaW5lSW5zdGFudGlhdGU7XG4gICAgY29uc3QgaXRlbSA9IG5ldyBJbnN0YW50aWFibGVJdGVtKCk7XG4gICAgaXRlbS5wcmVmYWIgPSBuZXcgY2MuUHJlZmFiKG5ldyBjYy5Ob2RlKCdUcmVlJykpIGFzIGFueTtcbiAgICBzaS5pdGVtcyA9IFtpdGVtXTtcbiAgICBzaS5jb250YWluZXIgPSBjO1xuICAgIE9iamVjdC5hc3NpZ24oc2ksIG9wdHMpO1xuICAgIHNpLnVwZGF0ZUluc3RhbmNlcygpO1xuICAgIHJldHVybiBzaTtcbn1cblxudGVzdCgnc3BhY2luZyBkaXN0YW5jZSBwbGFjZXMgaW5zdGFuY2VzIGV2ZXJ5IHVuaXQnLCAoKSA9PiB7XG4gICAgY29uc3Qgc2kgPSBpbnN0YW50aWF0ZU9uKDEwLCB7IG1ldGhvZDogSW5zdGFudGlhdGVNZXRob2QuU3BhY2luZ0Rpc3RhbmNlLCBzcGFjaW5nOiBuZXcgY2MuVmVjMigxLCAxKSBhcyBhbnkgfSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNpLmluc3RhbmNlcy5sZW5ndGgsIDExKTtcbiAgICBuZWFyKHNpLmluc3RhbmNlc1szXS53b3JsZFBvc2l0aW9uLngsIDMsIDFlLTMpO1xufSk7XG5cbnRlc3QoJ2luc3RhbmNlIGNvdW50IHNwcmVhZHMgZXZlbmx5JywgKCkgPT4ge1xuICAgIGNvbnN0IHNpID0gaW5zdGFudGlhdGVPbigxMCwgeyBtZXRob2Q6IEluc3RhbnRpYXRlTWV0aG9kLkluc3RhbmNlQ291bnQsIGNvdW50OiBuZXcgY2MuVmVjMig1LCA1KSBhcyBhbnkgfSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNpLmluc3RhbmNlcy5sZW5ndGgsIDUpO1xuICAgIG5lYXIoc2kuaW5zdGFuY2VzWzRdLndvcmxkUG9zaXRpb24ueCwgMTAsIDFlLTMpO1xufSk7XG5cbnRlc3QoJ2xpbmVhciBkaXN0YW5jZSBtZWFzdXJlcyBzdHJhaWdodCBsaW5lcycsICgpID0+IHtcbiAgICBjb25zdCBzaSA9IGluc3RhbnRpYXRlT24oMTAsIHsgbWV0aG9kOiBJbnN0YW50aWF0ZU1ldGhvZC5MaW5lYXJEaXN0YW5jZSwgc3BhY2luZzogbmV3IGNjLlZlYzIoMi41LCAyLjUpIGFzIGFueSB9KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2kuaW5zdGFuY2VzLmxlbmd0aCwgNSk7XG4gICAgbmVhcihzaS5pbnN0YW5jZXNbMl0ud29ybGRQb3NpdGlvbi54LCA1LCAxZS0yKTtcbn0pO1xuXG50ZXN0KCdyYW5kb20gb2Zmc2V0cyBhcmUgcmVwZWF0YWJsZSB3aXRoIGEgc2VlZCcsICgpID0+IHtcbiAgICBjb25zdCBhID0gaW5zdGFudGlhdGVPbigxMCwgeyBzZWVkOiA3IH0pO1xuICAgIGEucG9zaXRpb25PZmZzZXQubWF4LnNldCgwLCAxLCAwKTtcbiAgICBhLnBvc2l0aW9uT2Zmc2V0LnJhbmRvbVkgPSB0cnVlO1xuICAgIGEudXBkYXRlSW5zdGFuY2VzKCk7XG4gICAgY29uc3QgeXMgPSBhLmluc3RhbmNlcy5tYXAoKG4pID0+IG4ud29ybGRQb3NpdGlvbi55KTtcbiAgICBhc3NlcnQub2soeXMuc29tZSgoeSkgPT4geSA+IDAuMDEpLCAnb2Zmc2V0IGFwcGxpZWQnKTtcbiAgICBhLnVwZGF0ZUluc3RhbmNlcygpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYS5pbnN0YW5jZXMubWFwKChuKSA9PiBuLndvcmxkUG9zaXRpb24ueSksIHlzKTtcbiAgICBhLnNlZWQgPSA4O1xuICAgIGEudXBkYXRlSW5zdGFuY2VzKCk7XG4gICAgYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbChhLmluc3RhbmNlcy5tYXAoKG4pID0+IG4ud29ybGRQb3NpdGlvbi55KSwgeXMpO1xufSk7XG5cbnRlc3QoJ2dlbmVyYXRlZCBpbnN0YW5jZXMgYXJlIG5vdCBzYXZlZCcsICgpID0+IHtcbiAgICBjb25zdCBzaSA9IGluc3RhbnRpYXRlT24oNCk7XG4gICAgZm9yIChjb25zdCBuIG9mIHNpLmluc3RhbmNlcykge1xuICAgICAgICBsZXQgZmxhZ2dlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBwOiBhbnkgPSBuOyBwOyBwID0gcC5wYXJlbnQpIGlmIChwLl9vYmpGbGFncyAmIGNjLkNDT2JqZWN0LkZsYWdzLkRvbnRTYXZlKSBmbGFnZ2VkID0gdHJ1ZTtcbiAgICAgICAgYXNzZXJ0Lm9rKGZsYWdnZWQpO1xuICAgIH1cbiAgICBjb25zdCBpbmZvID0gc2kuX2Jha2VJbmZvKCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGluZm8ubGVuZ3RoLCBzaS5pbnN0YW5jZXMubGVuZ3RoKTtcbn0pO1xuXG5jb25zb2xlLmxvZyhgXFxuJHtyZXN1bHRzLnBhc3NlZH0gcGFzc2VkLCAke3Jlc3VsdHMuZmFpbGVkfSBmYWlsZWRgKTtcbnByb2Nlc3MuZXhpdENvZGUgPSByZXN1bHRzLmZhaWxlZCA/IDEgOiAwO1xuIiwgIi8qKlxuICogQSBzbWFsbCBzdGFuZC1pbiBmb3IgdGhlICdjYycgZW5naW5lIG1vZHVsZSwgZW5vdWdoIHRvIHJ1biB0aGUgcnVudGltZVxuICogY2xhc3NlcyBhbmQgdGhlIHNjZW5lIHNjcmlwdCBpbiBub2RlLiBNYXRoIGZvbGxvd3MgdGhlIGVuZ2luZSdzIGZvcm11bGFzLlxuICovXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWF0aFxuXG5leHBvcnQgY2xhc3MgVmVjMyB7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpFUk8gPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIDApKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgVU5JVF9YID0gT2JqZWN0LmZyZWV6ZShuZXcgVmVjMygxLCAwLCAwKSk7XG4gICAgc3RhdGljIHJlYWRvbmx5IFVOSVRfWSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMSwgMCkpO1xuICAgIHN0YXRpYyByZWFkb25seSBVTklUX1ogPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIDEpKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRk9SV0FSRCA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMCwgLTEpKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4ID0gMCwgcHVibGljIHkgPSAwLCBwdWJsaWMgeiA9IDApIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgdiA9IHggYXMgYW55O1xuICAgICAgICAgICAgdGhpcy54ID0gdi54O1xuICAgICAgICAgICAgdGhpcy55ID0gdi55O1xuICAgICAgICAgICAgdGhpcy56ID0gdi56O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0KHg6IGFueSA9IDAsIHkgPSAwLCB6ID0gMCk6IHRoaXMge1xuICAgICAgICBpZiAodHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4Lnk7XG4gICAgICAgICAgICB0aGlzLnogPSB4Lno7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgIHRoaXMueiA9IHo7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMyh0aGlzLngsIHRoaXMueSwgdGhpcy56KTtcbiAgICB9XG5cbiAgICBhZGQodjogYW55KSB7XG4gICAgICAgIHRoaXMueCArPSB2Lng7XG4gICAgICAgIHRoaXMueSArPSB2Lnk7XG4gICAgICAgIHRoaXMueiArPSB2Lno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxlbmd0aFNxcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMuejtcbiAgICB9XG5cbiAgICBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXIoKSk7XG4gICAgfVxuXG4gICAgbm9ybWFsaXplKCkge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5sZW5ndGgoKTtcbiAgICAgICAgaWYgKGwgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnggLz0gbDtcbiAgICAgICAgICAgIHRoaXMueSAvPSBsO1xuICAgICAgICAgICAgdGhpcy56IC89IGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbmVnYXRpdmUoKSB7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgICAgIHRoaXMueSA9IC10aGlzLnk7XG4gICAgICAgIHRoaXMueiA9IC10aGlzLno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGVxdWFscyh2OiBhbnksIGVwcyA9IDFlLTYpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMueCAtIHYueCkgPD0gZXBzICYmIE1hdGguYWJzKHRoaXMueSAtIHYueSkgPD0gZXBzICYmIE1hdGguYWJzKHRoaXMueiAtIHYueikgPD0gZXBzO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0KG91dDogYW55LCBhOiBhbnksIG06IGFueSkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XG4gICAgICAgIGxldCB3ID0gbS5tMDMgKiB4ICsgbS5tMDcgKiB5ICsgbS5tMTEgKiB6ICsgbS5tMTU7XG4gICAgICAgIHcgPSB3ID8gMSAvIHcgOiAxO1xuICAgICAgICBvdXQueCA9IChtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHogKyBtLm0xMikgKiB3O1xuICAgICAgICBvdXQueSA9IChtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0wOSAqIHogKyBtLm0xMykgKiB3O1xuICAgICAgICBvdXQueiA9IChtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHogKyBtLm0xNCkgKiB3O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0Tm9ybWFsKG91dDogYW55LCBhOiBhbnksIG06IGFueSkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XG4gICAgICAgIG91dC54ID0gbS5tMDAgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMDggKiB6O1xuICAgICAgICBvdXQueSA9IG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogejtcbiAgICAgICAgb3V0LnogPSBtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHo7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyYW5zZm9ybVF1YXQob3V0OiBhbnksIGE6IGFueSwgcTogYW55KSB7XG4gICAgICAgIGNvbnN0IGl4ID0gcS53ICogYS54ICsgcS55ICogYS56IC0gcS56ICogYS55O1xuICAgICAgICBjb25zdCBpeSA9IHEudyAqIGEueSArIHEueiAqIGEueCAtIHEueCAqIGEuejtcbiAgICAgICAgY29uc3QgaXogPSBxLncgKiBhLnogKyBxLnggKiBhLnkgLSBxLnkgKiBhLng7XG4gICAgICAgIGNvbnN0IGl3ID0gLXEueCAqIGEueCAtIHEueSAqIGEueSAtIHEueiAqIGEuejtcbiAgICAgICAgb3V0LnggPSBpeCAqIHEudyArIGl3ICogLXEueCArIGl5ICogLXEueiAtIGl6ICogLXEueTtcbiAgICAgICAgb3V0LnkgPSBpeSAqIHEudyArIGl3ICogLXEueSArIGl6ICogLXEueCAtIGl4ICogLXEuejtcbiAgICAgICAgb3V0LnogPSBpeiAqIHEudyArIGl3ICogLXEueiArIGl4ICogLXEueSAtIGl5ICogLXEueDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm9ybWFsaXplKG91dDogYW55LCBhOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbCA9IE1hdGguaHlwb3QoYS54LCBhLnksIGEueik7XG4gICAgICAgIG91dC54ID0gbCA/IGEueCAvIGwgOiAwO1xuICAgICAgICBvdXQueSA9IGwgPyBhLnkgLyBsIDogMDtcbiAgICAgICAgb3V0LnogPSBsID8gYS56IC8gbCA6IDA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRvdChhOiBhbnksIGI6IGFueSkge1xuICAgICAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55ICsgYS56ICogYi56O1xuICAgIH1cblxuICAgIHN0YXRpYyBjcm9zcyhvdXQ6IGFueSwgYTogYW55LCBiOiBhbnkpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueSAqIGIueiAtIGEueiAqIGIueTtcbiAgICAgICAgY29uc3QgeSA9IGEueiAqIGIueCAtIGEueCAqIGIuejtcbiAgICAgICAgY29uc3QgeiA9IGEueCAqIGIueSAtIGEueSAqIGIueDtcbiAgICAgICAgb3V0LnggPSB4O1xuICAgICAgICBvdXQueSA9IHk7XG4gICAgICAgIG91dC56ID0gejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzdGFuY2UoYTogYW55LCBiOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguaHlwb3QoYS54IC0gYi54LCBhLnkgLSBiLnksIGEueiAtIGIueik7XG4gICAgfVxuXG4gICAgc3RhdGljIHN1YnRyYWN0KG91dDogYW55LCBhOiBhbnksIGI6IGFueSkge1xuICAgICAgICBvdXQueCA9IGEueCAtIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgLSBiLnk7XG4gICAgICAgIG91dC56ID0gYS56IC0gYi56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyBsZW5ndGhTcXIoYTogYW55KSB7XG4gICAgICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLno7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmVjMiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHggPSAwLCBwdWJsaWMgeSA9IDApIHt9XG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUXVhdCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IElERU5USVRZID0gT2JqZWN0LmZyZWV6ZShuZXcgUXVhdCgpKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4ID0gMCwgcHVibGljIHkgPSAwLCBwdWJsaWMgeiA9IDAsIHB1YmxpYyB3ID0gMSkge31cblxuICAgIHNldCh4OiBhbnksIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIHc/OiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy54ID0geC54O1xuICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICAgICAgdGhpcy56ID0geC56O1xuICAgICAgICAgICAgdGhpcy53ID0geC53O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHkhO1xuICAgICAgICAgICAgdGhpcy56ID0geiE7XG4gICAgICAgICAgICB0aGlzLncgPSB3ITtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBRdWF0KHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMudyk7XG4gICAgfVxuXG4gICAgc3RhdGljIG11bHRpcGx5KG91dDogYW55LCBhOiBhbnksIGI6IGFueSkge1xuICAgICAgICBjb25zdCB4ID0gYS54ICogYi53ICsgYS53ICogYi54ICsgYS55ICogYi56IC0gYS56ICogYi55O1xuICAgICAgICBjb25zdCB5ID0gYS55ICogYi53ICsgYS53ICogYi55ICsgYS56ICogYi54IC0gYS54ICogYi56O1xuICAgICAgICBjb25zdCB6ID0gYS56ICogYi53ICsgYS53ICogYi56ICsgYS54ICogYi55IC0gYS55ICogYi54O1xuICAgICAgICBjb25zdCB3ID0gYS53ICogYi53IC0gYS54ICogYi54IC0gYS55ICogYi55IC0gYS56ICogYi56O1xuICAgICAgICBvdXQueCA9IHg7XG4gICAgICAgIG91dC55ID0geTtcbiAgICAgICAgb3V0LnogPSB6O1xuICAgICAgICBvdXQudyA9IHc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGludmVydChvdXQ6IGFueSwgYTogYW55KSB7XG4gICAgICAgIGNvbnN0IGQgPSBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLnc7XG4gICAgICAgIGNvbnN0IGludiA9IGQgPyAxIC8gZCA6IDA7XG4gICAgICAgIG91dC54ID0gLWEueCAqIGludjtcbiAgICAgICAgb3V0LnkgPSAtYS55ICogaW52O1xuICAgICAgICBvdXQueiA9IC1hLnogKiBpbnY7XG4gICAgICAgIG91dC53ID0gYS53ICogaW52O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tRXVsZXIob3V0OiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaCA9ICgwLjUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICAgICAgeCAqPSBoO1xuICAgICAgICB5ICo9IGg7XG4gICAgICAgIHogKj0gaDtcbiAgICAgICAgY29uc3Qgc3ggPSBNYXRoLnNpbih4KSwgY3ggPSBNYXRoLmNvcyh4KSwgc3kgPSBNYXRoLnNpbih5KSwgY3kgPSBNYXRoLmNvcyh5KSwgc3ogPSBNYXRoLnNpbih6KSwgY3ogPSBNYXRoLmNvcyh6KTtcbiAgICAgICAgb3V0LnggPSBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dC55ID0gY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXQueiA9IGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0LncgPSBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3o7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqIExpa2UgTWF0My5mcm9tVmlld1VwOiArWiA9IHZpZXcuICovXG4gICAgc3RhdGljIGZyb21WaWV3VXAob3V0OiBhbnksIHZpZXc6IGFueSwgdXA6IGFueSA9IFZlYzMuVU5JVF9ZKSB7XG4gICAgICAgIGNvbnN0IHggPSBWZWMzLm5vcm1hbGl6ZShuZXcgVmVjMygpLCBWZWMzLmNyb3NzKG5ldyBWZWMzKCksIHVwLCB2aWV3KSk7XG4gICAgICAgIGlmICh4Lmxlbmd0aFNxcigpIDwgMWUtMTIpIHtcbiAgICAgICAgICAgIG91dC54ID0gMDsgb3V0LnkgPSAwOyBvdXQueiA9IDA7IG91dC53ID0gMTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeSA9IFZlYzMuY3Jvc3MobmV3IFZlYzMoKSwgdmlldywgeCk7XG4gICAgICAgIGNvbnN0IG0wMCA9IHgueCwgbTAxID0geS54LCBtMDIgPSB2aWV3Lng7XG4gICAgICAgIGNvbnN0IG0xMCA9IHgueSwgbTExID0geS55LCBtMTIgPSB2aWV3Lnk7XG4gICAgICAgIGNvbnN0IG0yMCA9IHgueiwgbTIxID0geS56LCBtMjIgPSB2aWV3Lno7XG4gICAgICAgIGNvbnN0IHRyYWNlID0gbTAwICsgbTExICsgbTIyO1xuICAgICAgICBpZiAodHJhY2UgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gMC41IC8gTWF0aC5zcXJ0KHRyYWNlICsgMSk7XG4gICAgICAgICAgICBvdXQudyA9IDAuMjUgLyBzOyBvdXQueCA9IChtMjEgLSBtMTIpICogczsgb3V0LnkgPSAobTAyIC0gbTIwKSAqIHM7IG91dC56ID0gKG0xMCAtIG0wMSkgKiBzO1xuICAgICAgICB9IGVsc2UgaWYgKG0wMCA+IG0xMSAmJiBtMDAgPiBtMjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMDAgLSBtMTEgLSBtMjIpO1xuICAgICAgICAgICAgb3V0LncgPSAobTIxIC0gbTEyKSAvIHM7IG91dC54ID0gMC4yNSAqIHM7IG91dC55ID0gKG0wMSArIG0xMCkgLyBzOyBvdXQueiA9IChtMDIgKyBtMjApIC8gcztcbiAgICAgICAgfSBlbHNlIGlmIChtMTEgPiBtMjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMTEgLSBtMDAgLSBtMjIpO1xuICAgICAgICAgICAgb3V0LncgPSAobTAyIC0gbTIwKSAvIHM7IG91dC54ID0gKG0wMSArIG0xMCkgLyBzOyBvdXQueSA9IDAuMjUgKiBzOyBvdXQueiA9IChtMTIgKyBtMjEpIC8gcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMjIgLSBtMDAgLSBtMTEpO1xuICAgICAgICAgICAgb3V0LncgPSAobTEwIC0gbTAxKSAvIHM7IG91dC54ID0gKG0wMiArIG0yMCkgLyBzOyBvdXQueSA9IChtMTIgKyBtMjEpIC8gczsgb3V0LnogPSAwLjI1ICogcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hdDQge1xuICAgIG0wMCA9IDE7IG0wMSA9IDA7IG0wMiA9IDA7IG0wMyA9IDA7XG4gICAgbTA0ID0gMDsgbTA1ID0gMTsgbTA2ID0gMDsgbTA3ID0gMDtcbiAgICBtMDggPSAwOyBtMDkgPSAwOyBtMTAgPSAxOyBtMTEgPSAwO1xuICAgIG0xMiA9IDA7IG0xMyA9IDA7IG0xNCA9IDA7IG0xNSA9IDE7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgSURFTlRJVFkgPSBPYmplY3QuZnJlZXplKG5ldyBNYXQ0KCkpO1xuXG4gICAgc3RhdGljIHRvQXJyYXkob3V0OiBudW1iZXJbXSwgbTogYW55KSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBbJ20wMCcsICdtMDEnLCAnbTAyJywgJ20wMycsICdtMDQnLCAnbTA1JywgJ20wNicsICdtMDcnLCAnbTA4JywgJ20wOScsICdtMTAnLCAnbTExJywgJ20xMicsICdtMTMnLCAnbTE0JywgJ20xNSddO1xuICAgICAgICBrZXlzLmZvckVhY2goKGssIGkpID0+IChvdXRbaV0gPSBtW2tdKSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21BcnJheShvdXQ6IGFueSwgYTogbnVtYmVyW10pIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IFsnbTAwJywgJ20wMScsICdtMDInLCAnbTAzJywgJ20wNCcsICdtMDUnLCAnbTA2JywgJ20wNycsICdtMDgnLCAnbTA5JywgJ20xMCcsICdtMTEnLCAnbTEyJywgJ20xMycsICdtMTQnLCAnbTE1J107XG4gICAgICAgIGtleXMuZm9yRWFjaCgoaywgaSkgPT4gKG91dFtrXSA9IGFbaV0pKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbXVsdGlwbHkob3V0OiBhbnksIGE6IGFueSwgYjogYW55KSB7XG4gICAgICAgIGNvbnN0IEEgPSBNYXQ0LnRvQXJyYXkoW10sIGEpO1xuICAgICAgICBjb25zdCBCID0gTWF0NC50b0FycmF5KFtdLCBiKTtcbiAgICAgICAgY29uc3QgUjogbnVtYmVyW10gPSBuZXcgQXJyYXkoMTYpLmZpbGwoMCk7XG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgNDsgYysrKSBmb3IgKGxldCByID0gMDsgciA8IDQ7IHIrKykge1xuICAgICAgICAgICAgbGV0IHMgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA0OyBrKyspIHMgKz0gQVtrICogNCArIHJdICogQltjICogNCArIGtdO1xuICAgICAgICAgICAgUltjICogNCArIHJdID0gcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBSKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW52ZXJ0KG91dDogYW55LCBtOiBhbnkpIHtcbiAgICAgICAgY29uc3QgYSA9IE1hdDQudG9BcnJheShbXSwgbSk7XG4gICAgICAgIGNvbnN0IFthMDAsIGEwMSwgYTAyLCBhMDMsIGExMCwgYTExLCBhMTIsIGExMywgYTIwLCBhMjEsIGEyMiwgYTIzLCBhMzAsIGEzMSwgYTMyLCBhMzNdID0gYTtcbiAgICAgICAgY29uc3QgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICAgICAgY29uc3QgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICAgICAgY29uc3QgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbiAgICAgICAgaWYgKCFkZXQpIHJldHVybiBNYXQ0LmZyb21BcnJheShvdXQsIE1hdDQudG9BcnJheShbXSwgTWF0NC5JREVOVElUWSkpO1xuICAgICAgICBkZXQgPSAxIC8gZGV0O1xuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBbXG4gICAgICAgICAgICAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldCwgKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQsXG4gICAgICAgICAgICAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldCwgKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQsXG4gICAgICAgICAgICAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldCwgKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQsXG4gICAgICAgICAgICAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldCwgKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQsXG4gICAgICAgICAgICAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldCwgKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQsXG4gICAgICAgICAgICAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldCwgKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQsXG4gICAgICAgICAgICAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldCwgKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQsXG4gICAgICAgICAgICAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldCwgKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQsXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKiBUcmFuc2xhdGlvbiAqIHJvdGF0aW9uICogc2NhbGUuICovXG4gICAgc3RhdGljIGZyb21SVFMob3V0OiBhbnksIHE6IGFueSwgdDogYW55LCBzOiBhbnkpIHtcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6LCB3IH0gPSBxO1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4LCB5MiA9IHkgKyB5LCB6MiA9IHogKyB6O1xuICAgICAgICBjb25zdCB4eCA9IHggKiB4MiwgeHkgPSB4ICogeTIsIHh6ID0geCAqIHoyLCB5eSA9IHkgKiB5MiwgeXogPSB5ICogejIsIHp6ID0geiAqIHoyLCB3eCA9IHcgKiB4Miwgd3kgPSB3ICogeTIsIHd6ID0gdyAqIHoyO1xuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBbXG4gICAgICAgICAgICAoMSAtICh5eSArIHp6KSkgKiBzLngsICh4eSArIHd6KSAqIHMueCwgKHh6IC0gd3kpICogcy54LCAwLFxuICAgICAgICAgICAgKHh5IC0gd3opICogcy55LCAoMSAtICh4eCArIHp6KSkgKiBzLnksICh5eiArIHd4KSAqIHMueSwgMCxcbiAgICAgICAgICAgICh4eiArIHd5KSAqIHMueiwgKHl6IC0gd3gpICogcy56LCAoMSAtICh4eCArIHl5KSkgKiBzLnosIDAsXG4gICAgICAgICAgICB0LngsIHQueSwgdC56LCAxLFxuICAgICAgICBdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb2xvciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHIgPSAyNTUsIHB1YmxpYyBnID0gMjU1LCBwdWJsaWMgYiA9IDI1NSwgcHVibGljIGEgPSAyNTUpIHt9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG9iamVjdHNcblxuZXhwb3J0IGNvbnN0IENDT2JqZWN0ID0ge1xuICAgIEZsYWdzOiB7XG4gICAgICAgIERvbnRTYXZlOiAxIDw8IDMsXG4gICAgICAgIEVkaXRvck9ubHk6IDEgPDwgNCxcbiAgICAgICAgTG9ja2VkSW5FZGl0b3I6IDEgPDwgOSxcbiAgICAgICAgSGlkZUluSGllcmFyY2h5OiAxIDw8IDEwLFxuICAgIH0sXG59O1xuXG5sZXQgdXVpZFNlcSA9IDA7XG5leHBvcnQgZnVuY3Rpb24gbWFrZVV1aWQocHJlZml4ID0gJ2lkJykge1xuICAgIHJldHVybiBgJHtwcmVmaXh9LSR7Kyt1dWlkU2VxfWA7XG59XG5cbnR5cGUgQ3RvcjxUPiA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IFQ7XG5cbmV4cG9ydCBjbGFzcyBOb2RlIHtcbiAgICB1dWlkID0gbWFrZVV1aWQoJ25vZGUnKTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcGFyZW50OiBOb2RlIHwgbnVsbCA9IG51bGw7XG4gICAgY2hpbGRyZW46IE5vZGVbXSA9IFtdO1xuICAgIGNvbXBvbmVudHM6IENvbXBvbmVudFtdID0gW107XG4gICAgbGF5ZXIgPSAxO1xuICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgaXNWYWxpZCA9IHRydWU7XG4gICAgX29iakZsYWdzID0gMDtcbiAgICBwb3NpdGlvbiA9IG5ldyBWZWMzKCk7XG4gICAgcm90YXRpb24gPSBuZXcgUXVhdCgpO1xuICAgIHNjYWxlID0gbmV3IFZlYzMoMSwgMSwgMSk7XG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb25bXT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSAnTm9kZScpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlSW5IaWVyYXJjaHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZSAmJiAoIXRoaXMucGFyZW50IHx8IHRoaXMucGFyZW50LmFjdGl2ZUluSGllcmFyY2h5KTtcbiAgICB9XG5cbiAgICBnZXQgc2NlbmUoKTogYW55IHtcbiAgICAgICAgbGV0IG46IE5vZGUgPSB0aGlzO1xuICAgICAgICB3aGlsZSAobi5wYXJlbnQpIG4gPSBuLnBhcmVudDtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuXG4gICAgc2V0UGFyZW50KHA6IE5vZGUgfCBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyksIDEpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHA7XG4gICAgICAgIGlmIChwKSBwLmNoaWxkcmVuLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkTWF0cml4KCk6IE1hdDQge1xuICAgICAgICBjb25zdCBsb2NhbCA9IE1hdDQuZnJvbVJUUyhuZXcgTWF0NCgpLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnBvc2l0aW9uLCB0aGlzLnNjYWxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmICEodGhpcy5wYXJlbnQgYXMgYW55KS5pc1NjZW5lID8gTWF0NC5tdWx0aXBseShuZXcgTWF0NCgpLCB0aGlzLnBhcmVudC53b3JsZE1hdHJpeCwgbG9jYWwpIDogbG9jYWw7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkUG9zaXRpb24oKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLndvcmxkTWF0cml4O1xuICAgICAgICByZXR1cm4gbmV3IFZlYzMobS5tMTIsIG0ubTEzLCBtLm0xNCk7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkUm90YXRpb24oKTogUXVhdCB7XG4gICAgICAgIGNvbnN0IGxvY2FsID0gdGhpcy5yb3RhdGlvbi5jbG9uZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUgPyBRdWF0Lm11bHRpcGx5KG5ldyBRdWF0KCksIHRoaXMucGFyZW50LndvcmxkUm90YXRpb24sIGxvY2FsKSA6IGxvY2FsO1xuICAgIH1cblxuICAgIGdldCBmb3J3YXJkKCkge1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1RdWF0KG5ldyBWZWMzKCksIG5ldyBWZWMzKDAsIDAsIC0xKSwgdGhpcy53b3JsZFJvdGF0aW9uKTtcbiAgICB9XG4gICAgZ2V0IHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1RdWF0KG5ldyBWZWMzKCksIG5ldyBWZWMzKDEsIDAsIDApLCB0aGlzLndvcmxkUm90YXRpb24pO1xuICAgIH1cbiAgICBnZXQgdXAoKSB7XG4gICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybVF1YXQobmV3IFZlYzMoKSwgbmV3IFZlYzMoMCwgMSwgMCksIHRoaXMud29ybGRSb3RhdGlvbik7XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24oeDogYW55LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24uc2V0KHgsIHksIHopO1xuICAgIH1cblxuICAgIHNldFdvcmxkUG9zaXRpb24oeDogYW55LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHAgPSB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyBuZXcgVmVjMyh4LngsIHgueSwgeC56KSA6IG5ldyBWZWMzKHgsIHksIHopO1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUpIFZlYzMudHJhbnNmb3JtTWF0NChwLCBwLCBNYXQ0LmludmVydChuZXcgTWF0NCgpLCB0aGlzLnBhcmVudC53b3JsZE1hdHJpeCkpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldChwKTtcbiAgICB9XG5cbiAgICBzZXRXb3JsZFJvdGF0aW9uKHg6IGFueSwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xuICAgICAgICBjb25zdCBxID0gdHlwZW9mIHggPT09ICdvYmplY3QnID8gbmV3IFF1YXQoeC54LCB4LnksIHgueiwgeC53KSA6IG5ldyBRdWF0KHgsIHksIHosIHcpO1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUpIFF1YXQubXVsdGlwbHkocSwgUXVhdC5pbnZlcnQobmV3IFF1YXQoKSwgdGhpcy5wYXJlbnQud29ybGRSb3RhdGlvbiksIHEpO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnNldChxKTtcbiAgICB9XG5cbiAgICBzZXRTY2FsZSh4OiBhbnksIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY2FsZS5zZXQoeCwgeSwgeik7XG4gICAgfVxuXG4gICAgLy8gTG9vc2VseSB0eXBlZDogdGhlIHJ1bnRpbWUgY2xhc3NlcyBhcmUgdHlwZWQgYWdhaW5zdCB0aGUgcmVhbCBlbmdpbmUuXG4gICAgZ2V0Q29tcG9uZW50KEM6IGFueSk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHMuZmluZCgoYykgPT4gKHR5cGVvZiBDID09PSAnc3RyaW5nJyA/IChjLmNvbnN0cnVjdG9yIGFzIGFueSkuX19jaWQgPT09IEMgOiBjIGluc3RhbmNlb2YgQykpID8/IG51bGw7XG4gICAgfVxuXG4gICAgYWRkQ29tcG9uZW50KEM6IGFueSk6IGFueSB7XG4gICAgICAgIGNvbnN0IGMgPSBuZXcgQygpO1xuICAgICAgICBjLm5vZGUgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChjKTtcbiAgICAgICAgYy5fX3N0YXJ0KCk7XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cblxuICAgIG9uKHR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLmxpc3RlbmVycy5nZXQodHlwZSkgfHwgW107XG4gICAgICAgIGwucHVzaChmbik7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnNldCh0eXBlLCBsKTtcbiAgICB9XG5cbiAgICBvZmYodHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMubGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KHR5cGUsIGwuZmlsdGVyKChmKSA9PiBmICE9PSBmbikpO1xuICAgIH1cblxuICAgIGhhc0V2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5saXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdKS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGVtaXQodHlwZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5saXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdKSBmKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5jb21wb25lbnRzKSBjLl9fZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnNldFBhcmVudChudWxsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQge1xuICAgIG5vZGUhOiBOb2RlO1xuICAgIHV1aWQgPSBtYWtlVXVpZCgnY29tcCcpO1xuICAgIHByaXZhdGUgX2VuYWJsZWQgPSB0cnVlO1xuICAgIGlzVmFsaWQgPSB0cnVlO1xuXG4gICAgZ2V0IGVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICAgIH1cbiAgICBzZXQgZW5hYmxlZCh2OiBib29sZWFuKSB7XG4gICAgICAgIGlmICh2ID09PSB0aGlzLl9lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB2O1xuICAgICAgICBpZiAodikgKHRoaXMgYXMgYW55KS5vbkVuYWJsZT8uKCk7XG4gICAgICAgIGVsc2UgKHRoaXMgYXMgYW55KS5vbkRpc2FibGU/LigpO1xuICAgIH1cblxuICAgIGdldCBlbmFibGVkSW5IaWVyYXJjaHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkICYmIHRoaXMubm9kZS5hY3RpdmVJbkhpZXJhcmNoeTtcbiAgICB9XG5cbiAgICBnZXRDb21wb25lbnQ8VD4oQzogQ3RvcjxUPik6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDb21wb25lbnQoQyk7XG4gICAgfVxuXG4gICAgX19zdGFydCgpIHtcbiAgICAgICAgKHRoaXMgYXMgYW55KS5vbkxvYWQ/LigpO1xuICAgICAgICBpZiAodGhpcy5fZW5hYmxlZCkgKHRoaXMgYXMgYW55KS5vbkVuYWJsZT8uKCk7XG4gICAgfVxuXG4gICAgX19kZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5fZW5hYmxlZCkgKHRoaXMgYXMgYW55KS5vbkRpc2FibGU/LigpO1xuICAgICAgICAodGhpcyBhcyBhbnkpLm9uRGVzdHJveT8uKCk7XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX19kZXN0cm95KCk7XG4gICAgICAgIHRoaXMubm9kZS5jb21wb25lbnRzLnNwbGljZSh0aGlzLm5vZGUuY29tcG9uZW50cy5pbmRleE9mKHRoaXMpLCAxKTtcbiAgICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkZWNvcmF0b3JzXG5cbmNvbnN0IGNsYXNzZXMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG5mdW5jdGlvbiBjY2NsYXNzKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiAoY3RvcjogYW55KSA9PiB7XG4gICAgICAgIGN0b3IuX19jaWQgPSBuYW1lO1xuICAgICAgICBjbGFzc2VzLnNldChuYW1lLCBjdG9yKTtcbiAgICAgICAgcmV0dXJuIGN0b3I7XG4gICAgfTtcbn1cblxuY29uc3Qgbm9vcERlY29yYXRvciA9ICguLi5fYTogYW55W10pID0+ICguLi5fYjogYW55W10pID0+IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gcHJvcGVydHkoLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgIC8vIEBwcm9wZXJ0eSBvciBAcHJvcGVydHkoey4uLn0pXG4gICAgaWYgKGFyZ3MubGVuZ3RoID49IDIgJiYgdHlwZW9mIGFyZ3NbMV0gPT09ICdzdHJpbmcnKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiAoKSA9PiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBfZGVjb3JhdG9yID0ge1xuICAgIGNjY2xhc3MsXG4gICAgcHJvcGVydHksXG4gICAgZXhlY3V0ZUluRWRpdE1vZGU6IChjdG9yOiBhbnkpID0+IGN0b3IsXG4gICAgZGlzYWxsb3dNdWx0aXBsZTogKGN0b3I6IGFueSkgPT4gY3RvcixcbiAgICBtZW51OiBub29wRGVjb3JhdG9yLFxuICAgIHJlcXVpcmVDb21wb25lbnQ6IG5vb3BEZWNvcmF0b3IsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2NlbnVtKF9lOiBhbnkpIHtcbiAgICByZXR1cm4gX2U7XG59XG5cbmV4cG9ydCBjb25zdCBDQ0ludGVnZXIgPSAnSW50ZWdlcic7XG5cbmV4cG9ydCBjb25zdCBqcyA9IHtcbiAgICBnZXRDbGFzc0J5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuZ2V0KG5hbWUpID8/IG51bGw7XG4gICAgfSxcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBlbmdpbmVcblxuZXhwb3J0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgc3RhdGljIGVtaXRFdmVudHMoX2hhbmRsZXJzOiBhbnlbXSwgLi4uX2FyZ3M6IGFueVtdKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWwge1xuICAgIGluaXRpYWxpemUoX2luZm86IGFueSkge31cbn1cblxuZXhwb3J0IGNsYXNzIE1lc2gge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnZW9tZXRyeTogYW55KSB7fVxuICAgIGRlc3Ryb3koKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWVzaFJlbmRlcmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBtZXNoOiBhbnkgPSBudWxsO1xuICAgIG1hdGVyaWFsczogYW55W10gPSBbXTtcbiAgICBzaGFkb3dDYXN0aW5nTW9kZSA9IDA7XG4gICAgcmVjZWl2ZVNoYWRvdyA9IDA7XG4gICAgc2V0U2hhcmVkTWF0ZXJpYWwobTogYW55LCBpOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNbaV0gPSBtO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByZWZhYiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGRhdGE6IE5vZGUpIHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50aWF0ZShwOiBQcmVmYWIpOiBOb2RlIHtcbiAgICBjb25zdCBuID0gbmV3IE5vZGUocC5kYXRhLm5hbWUpO1xuICAgIG4uc2NhbGUuc2V0KHAuZGF0YS5zY2FsZSk7XG4gICAgcmV0dXJuIG47XG59XG5cbmV4cG9ydCBjb25zdCB1dGlscyA9IHtcbiAgICBNZXNoVXRpbHM6IHtcbiAgICAgICAgY3JlYXRlTWVzaChnZW9tZXRyeTogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1lc2goZ2VvbWV0cnkpO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG5jb25zdCBkaXJlY3Rvckxpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPigpO1xubGV0IHRvdGFsRnJhbWVzID0gMDtcblxuZXhwb3J0IGNvbnN0IGRpcmVjdG9yOiBhbnkgPSB7XG4gICAgcm9vdDogbnVsbCxcbiAgICBfc2NlbmU6IG51bGwgYXMgYW55LFxuICAgIGdldFNjZW5lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NlbmU7XG4gICAgfSxcbiAgICBnZXRUb3RhbEZyYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRvdGFsRnJhbWVzO1xuICAgIH0sXG4gICAgZ2V0VG90YWxUaW1lKCkge1xuICAgICAgICByZXR1cm4gdG90YWxGcmFtZXMgKiAxNjtcbiAgICB9LFxuICAgIG9uKHR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGwgPSBkaXJlY3Rvckxpc3RlbmVycy5nZXQodHlwZSkgfHwgW107XG4gICAgICAgIGwucHVzaChmbik7XG4gICAgICAgIGRpcmVjdG9yTGlzdGVuZXJzLnNldCh0eXBlLCBsKTtcbiAgICB9LFxuICAgIG9mZih0eXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAgICAgICBkaXJlY3Rvckxpc3RlbmVycy5zZXQodHlwZSwgKGRpcmVjdG9yTGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXSkuZmlsdGVyKChmKSA9PiBmICE9PSBmbikpO1xuICAgIH0sXG4gICAgLyoqIFRlc3QgaGVscGVyOiBvbmUgZWRpdG9yIGZyYW1lLiAqL1xuICAgIHRpY2soKSB7XG4gICAgICAgIGZvciAoY29uc3QgZiBvZiBkaXJlY3Rvckxpc3RlbmVycy5nZXQoJ2RpcmVjdG9yX2JlZm9yZV9jb21taXQnKSB8fCBbXSkgZigpO1xuICAgICAgICB0b3RhbEZyYW1lcysrO1xuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0b3IgPSB7IEVWRU5UX0JFRk9SRV9DT01NSVQ6ICdkaXJlY3Rvcl9iZWZvcmVfY29tbWl0JyB9O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyZXIgPSB7XG4gICAgc2NlbmU6IHtcbiAgICAgICAgQ2FtZXJhVXNhZ2U6IHsgU0NFTkVfVklFVzogNSB9LFxuICAgICAgICBDYW1lcmFQcm9qZWN0aW9uOiB7IE9SVEhPOiAwLCBQRVJTUEVDVElWRTogMSB9LFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZ2VvbWV0cnkgPSB7XG4gICAgUmF5OiBjbGFzcyB7XG4gICAgICAgIG86IFZlYzM7XG4gICAgICAgIGQ6IFZlYzM7XG4gICAgICAgIGNvbnN0cnVjdG9yKG94ID0gMCwgb3kgPSAwLCBveiA9IDAsIGR4ID0gMCwgZHkgPSAwLCBkeiA9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm8gPSBuZXcgVmVjMyhveCwgb3ksIG96KTtcbiAgICAgICAgICAgIHRoaXMuZCA9IG5ldyBWZWMzKGR4LCBkeSwgZHopO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBFUmF5Y2FzdE1vZGU6IHsgQUxMOiAwLCBDTE9TRVNUOiAxLCBBTlk6IDIgfSxcbiAgICBpbnRlcnNlY3Q6IHtcbiAgICAgICAgcmF5QUFCQjogKCkgPT4gdHJ1ZSxcbiAgICAgICAgcmF5TW9kZWw6ICgpID0+IDAsXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBnYW1lOiBhbnkgPSB7IGNhbnZhczogbnVsbCB9O1xuIiwgImV4cG9ydCBjb25zdCBFRElUT1IgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IEVESVRPUl9OT1RfSU5fUFJFVklFVyA9IHRydWU7XG5leHBvcnQgY29uc3QgUFJFVklFVyA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IEJVSUxEID0gZmFsc2U7XG5leHBvcnQgY29uc3QgREVCVUcgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IERFViA9IHRydWU7XG5leHBvcnQgY29uc3QgSlNCID0gZmFsc2U7XG4iLCAiLyoqXG4gKiBTbWFsbCB2ZWN0b3IgLyBxdWF0ZXJuaW9uIGhlbHBlcnMgb24gcGxhaW4ge3gsIHksIHp9IG9iamVjdHMuXG4gKlxuICogVGhlIHNwbGluZSBjb3JlIHVzZXMgdGhlc2UgaW5zdGVhZCBvZiBjYy5WZWMzIHNvIGl0IGhhcyBubyBlbmdpbmVcbiAqIGRlcGVuZGVuY3k6IGNjLlZlYzMgLyBjYy5RdWF0IHNhdGlzZnkgdGhlIGludGVyZmFjZXMsIGFuZCB0aGUgY29yZSBjYW4gYmVcbiAqIHVuaXQtdGVzdGVkIG91dHNpZGUgdGhlIGVkaXRvci5cbiAqXG4gKiBLbm90IHNwYWNlIGZvbGxvd3MgVW5pdHkncyBjb252ZW50aW9uOiBhIGtub3QncyBsb2NhbCArWiBpcyB0aGUgZGlyZWN0aW9uXG4gKiBvZiBpdHMgb3V0IHRhbmdlbnQgYW5kIGxvY2FsICtZIGlzIGl0cyB1cCB2ZWN0b3IuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBWMyB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB6OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUTQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgejogbnVtYmVyO1xuICAgIHc6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IEVQU0lMT04gPSAxZS02O1xuXG5leHBvcnQgZnVuY3Rpb24gdjMoeCA9IDAsIHkgPSAwLCB6ID0gMCk6IFYzIHtcbiAgICByZXR1cm4geyB4LCB5LCB6IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxNCh4ID0gMCwgeSA9IDAsIHogPSAwLCB3ID0gMSk6IFE0IHtcbiAgICByZXR1cm4geyB4LCB5LCB6LCB3IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQ8VCBleHRlbmRzIFYzPihvdXQ6IFQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBUIHtcbiAgICBvdXQueCA9IHg7XG4gICAgb3V0LnkgPSB5O1xuICAgIG91dC56ID0gejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weTxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMpOiBUIHtcbiAgICBvdXQueCA9IGEueDtcbiAgICBvdXQueSA9IGEueTtcbiAgICBvdXQueiA9IGEuejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUoYTogVjMpOiBWMyB7XG4gICAgcmV0dXJuIHsgeDogYS54LCB5OiBhLnksIHo6IGEueiB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMywgYjogVjMpOiBUIHtcbiAgICBvdXQueCA9IGEueCArIGIueDtcbiAgICBvdXQueSA9IGEueSArIGIueTtcbiAgICBvdXQueiA9IGEueiArIGIuejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3ViPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMywgYjogVjMpOiBUIHtcbiAgICBvdXQueCA9IGEueCAtIGIueDtcbiAgICBvdXQueSA9IGEueSAtIGIueTtcbiAgICBvdXQueiA9IGEueiAtIGIuejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGU8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBzOiBudW1iZXIpOiBUIHtcbiAgICBvdXQueCA9IGEueCAqIHM7XG4gICAgb3V0LnkgPSBhLnkgKiBzO1xuICAgIG91dC56ID0gYS56ICogcztcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKiogb3V0ID0gYSArIGIgKiBzICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVBbmRBZGQ8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBiOiBWMywgczogbnVtYmVyKTogVCB7XG4gICAgb3V0LnggPSBhLnggKyBiLnggKiBzO1xuICAgIG91dC55ID0gYS55ICsgYi55ICogcztcbiAgICBvdXQueiA9IGEueiArIGIueiAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMpOiBUIHtcbiAgICBvdXQueCA9IC1hLng7XG4gICAgb3V0LnkgPSAtYS55O1xuICAgIG91dC56ID0gLWEuejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG90KGE6IFYzLCBiOiBWMyk6IG51bWJlciB7XG4gICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIuejtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyb3NzPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMywgYjogVjMpOiBUIHtcbiAgICBjb25zdCB4ID0gYS55ICogYi56IC0gYS56ICogYi55O1xuICAgIGNvbnN0IHkgPSBhLnogKiBiLnggLSBhLnggKiBiLno7XG4gICAgY29uc3QgeiA9IGEueCAqIGIueSAtIGEueSAqIGIueDtcbiAgICBvdXQueCA9IHg7XG4gICAgb3V0LnkgPSB5O1xuICAgIG91dC56ID0gejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGVuU3EoYTogVjMpOiBudW1iZXIge1xuICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLno7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZW4oYTogVjMpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQoYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RTcShhOiBWMywgYjogVjMpOiBudW1iZXIge1xuICAgIGNvbnN0IHggPSBhLnggLSBiLng7XG4gICAgY29uc3QgeSA9IGEueSAtIGIueTtcbiAgICBjb25zdCB6ID0gYS56IC0gYi56O1xuICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0KGE6IFYzLCBiOiBWMyk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydChkaXN0U3EoYSwgYikpO1xufVxuXG4vKiogTm9ybWFsaXplcyBgYWAgaW50byBgb3V0YDsgYSB6ZXJvIHZlY3RvciBzdGF5cyB6ZXJvLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMpOiBUIHtcbiAgICBjb25zdCBsID0gbGVuKGEpO1xuICAgIGlmIChsIDwgRVBTSUxPTikgcmV0dXJuIHNldChvdXQsIDAsIDAsIDApO1xuICAgIHJldHVybiBzY2FsZShvdXQsIGEsIDEgLyBsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlcnA8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBiOiBWMywgdDogbnVtYmVyKTogVCB7XG4gICAgb3V0LnggPSBhLnggKyAoYi54IC0gYS54KSAqIHQ7XG4gICAgb3V0LnkgPSBhLnkgKyAoYi55IC0gYS55KSAqIHQ7XG4gICAgb3V0LnogPSBhLnogKyAoYi56IC0gYS56KSAqIHQ7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhOiBWMywgYjogVjMsIGVwcyA9IEVQU0lMT04pOiBib29sZWFuIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoYS54IC0gYi54KSA8PSBlcHMgJiYgTWF0aC5hYnMoYS55IC0gYi55KSA8PSBlcHMgJiYgTWF0aC5hYnMoYS56IC0gYi56KSA8PSBlcHM7XG59XG5cbi8qKiBBbnkgdW5pdCB2ZWN0b3IgcGVycGVuZGljdWxhciB0byBgYWAgKHdoaWNoIG11c3Qgbm90IGJlIHplcm8pLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFueVBlcnBlbmRpY3VsYXI8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzKTogVCB7XG4gICAgLy8gQ3Jvc3Mgd2l0aCB0aGUgYXhpcyBsZWFzdCBhbGlnbmVkIHdpdGggYGFgLlxuICAgIGNvbnN0IGF4ID0gTWF0aC5hYnMoYS54KTtcbiAgICBjb25zdCBheSA9IE1hdGguYWJzKGEueSk7XG4gICAgY29uc3QgYXogPSBNYXRoLmFicyhhLnopO1xuICAgIGlmIChheCA8PSBheSAmJiBheCA8PSBheikgY3Jvc3Mob3V0LCBhLCB7IHg6IDEsIHk6IDAsIHo6IDAgfSk7XG4gICAgZWxzZSBpZiAoYXkgPD0gYXopIGNyb3NzKG91dCwgYSwgeyB4OiAwLCB5OiAxLCB6OiAwIH0pO1xuICAgIGVsc2UgY3Jvc3Mob3V0LCBhLCB7IHg6IDAsIHk6IDAsIHo6IDEgfSk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIG91dCk7XG59XG5cbi8qKiBSZW1vdmVzIHRoZSBwYXJ0IG9mIGB2YCBhbG9uZyB1bml0IHZlY3RvciBgbmAuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdE9uUGxhbmU8VCBleHRlbmRzIFYzPihvdXQ6IFQsIHY6IFYzLCBuOiBWMyk6IFQge1xuICAgIGNvbnN0IGQgPSBkb3Qodiwgbik7XG4gICAgcmV0dXJuIHNjYWxlQW5kQWRkKG91dCwgdiwgbiwgLWQpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcXVhdGVybmlvbnNcblxuZXhwb3J0IGZ1bmN0aW9uIHFTZXQ8VCBleHRlbmRzIFE0PihvdXQ6IFQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcik6IFQge1xuICAgIG91dC54ID0geDtcbiAgICBvdXQueSA9IHk7XG4gICAgb3V0LnogPSB6O1xuICAgIG91dC53ID0gdztcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcUNvcHk8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGE6IFE0KTogVCB7XG4gICAgcmV0dXJuIHFTZXQob3V0LCBhLngsIGEueSwgYS56LCBhLncpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcUlkZW50aXR5PFQgZXh0ZW5kcyBRND4ob3V0OiBUKTogVCB7XG4gICAgcmV0dXJuIHFTZXQob3V0LCAwLCAwLCAwLCAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHFNdWw8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGE6IFE0LCBiOiBRNCk6IFQge1xuICAgIGNvbnN0IHggPSBhLncgKiBiLnggKyBhLnggKiBiLncgKyBhLnkgKiBiLnogLSBhLnogKiBiLnk7XG4gICAgY29uc3QgeSA9IGEudyAqIGIueSAtIGEueCAqIGIueiArIGEueSAqIGIudyArIGEueiAqIGIueDtcbiAgICBjb25zdCB6ID0gYS53ICogYi56ICsgYS54ICogYi55IC0gYS55ICogYi54ICsgYS56ICogYi53O1xuICAgIGNvbnN0IHcgPSBhLncgKiBiLncgLSBhLnggKiBiLnggLSBhLnkgKiBiLnkgLSBhLnogKiBiLno7XG4gICAgcmV0dXJuIHFTZXQob3V0LCB4LCB5LCB6LCB3KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHFOb3JtYWxpemU8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGE6IFE0KTogVCB7XG4gICAgY29uc3QgbCA9IE1hdGguc3FydChhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLncpO1xuICAgIGlmIChsIDwgRVBTSUxPTikgcmV0dXJuIHFJZGVudGl0eShvdXQpO1xuICAgIHJldHVybiBxU2V0KG91dCwgYS54IC8gbCwgYS55IC8gbCwgYS56IC8gbCwgYS53IC8gbCk7XG59XG5cbi8qKiBJbnZlcnNlIG9mIGEgdW5pdCBxdWF0ZXJuaW9uIChpdHMgY29uanVnYXRlKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxSW52ZXJ0PFQgZXh0ZW5kcyBRND4ob3V0OiBULCBhOiBRNCk6IFQge1xuICAgIGNvbnN0IGwgPSBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLnc7XG4gICAgaWYgKGwgPCBFUFNJTE9OKSByZXR1cm4gcUlkZW50aXR5KG91dCk7XG4gICAgcmV0dXJuIHFTZXQob3V0LCAtYS54IC8gbCwgLWEueSAvIGwsIC1hLnogLyBsLCBhLncgLyBsKTtcbn1cblxuLyoqIFJvdGF0ZXMgdmVjdG9yIGB2YCBieSBxdWF0ZXJuaW9uIGBxYC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxUm90YXRlPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBxOiBRNCwgdjogVjMpOiBUIHtcbiAgICAvLyB0ID0gMiAqIGNyb3NzKHEueHl6LCB2KTsgdicgPSB2ICsgdyAqIHQgKyBjcm9zcyhxLnh5eiwgdClcbiAgICBjb25zdCB0eCA9IDIgKiAocS55ICogdi56IC0gcS56ICogdi55KTtcbiAgICBjb25zdCB0eSA9IDIgKiAocS56ICogdi54IC0gcS54ICogdi56KTtcbiAgICBjb25zdCB0eiA9IDIgKiAocS54ICogdi55IC0gcS55ICogdi54KTtcbiAgICBjb25zdCB4ID0gdi54ICsgcS53ICogdHggKyAocS55ICogdHogLSBxLnogKiB0eSk7XG4gICAgY29uc3QgeSA9IHYueSArIHEudyAqIHR5ICsgKHEueiAqIHR4IC0gcS54ICogdHopO1xuICAgIGNvbnN0IHogPSB2LnogKyBxLncgKiB0eiArIChxLnggKiB0eSAtIHEueSAqIHR4KTtcbiAgICByZXR1cm4gc2V0KG91dCwgeCwgeSwgeik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxRnJvbUF4aXNBbmdsZTxUIGV4dGVuZHMgUTQ+KG91dDogVCwgYXhpczogVjMsIHJhZDogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgbiA9IG5vcm1hbGl6ZSh2MygpLCBheGlzKTtcbiAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkIC8gMik7XG4gICAgcmV0dXJuIHFTZXQob3V0LCBuLnggKiBzLCBuLnkgKiBzLCBuLnogKiBzLCBNYXRoLmNvcyhyYWQgLyAyKSk7XG59XG5cbi8qKiBSb3RhdGlvbiBtYXRyaXggY29sdW1ucyAoeCwgeSwgeiBheGVzKSB0byBxdWF0ZXJuaW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFGcm9tQXhlczxUIGV4dGVuZHMgUTQ+KG91dDogVCwgeDogVjMsIHk6IFYzLCB6OiBWMyk6IFQge1xuICAgIGNvbnN0IG0wMCA9IHgueCwgbTAxID0geS54LCBtMDIgPSB6Lng7XG4gICAgY29uc3QgbTEwID0geC55LCBtMTEgPSB5LnksIG0xMiA9IHoueTtcbiAgICBjb25zdCBtMjAgPSB4LnosIG0yMSA9IHkueiwgbTIyID0gei56O1xuICAgIGNvbnN0IHRyYWNlID0gbTAwICsgbTExICsgbTIyO1xuICAgIGlmICh0cmFjZSA+IDApIHtcbiAgICAgICAgY29uc3QgcyA9IDAuNSAvIE1hdGguc3FydCh0cmFjZSArIDEpO1xuICAgICAgICByZXR1cm4gcU5vcm1hbGl6ZShvdXQsIHFTZXQob3V0LCAobTIxIC0gbTEyKSAqIHMsIChtMDIgLSBtMjApICogcywgKG0xMCAtIG0wMSkgKiBzLCAwLjI1IC8gcykpO1xuICAgIH1cbiAgICBpZiAobTAwID4gbTExICYmIG0wMCA+IG0yMikge1xuICAgICAgICBjb25zdCBzID0gMiAqIE1hdGguc3FydCgxICsgbTAwIC0gbTExIC0gbTIyKTtcbiAgICAgICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgMC4yNSAqIHMsIChtMDEgKyBtMTApIC8gcywgKG0wMiArIG0yMCkgLyBzLCAobTIxIC0gbTEyKSAvIHMpKTtcbiAgICB9XG4gICAgaWYgKG0xMSA+IG0yMikge1xuICAgICAgICBjb25zdCBzID0gMiAqIE1hdGguc3FydCgxICsgbTExIC0gbTAwIC0gbTIyKTtcbiAgICAgICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgKG0wMSArIG0xMCkgLyBzLCAwLjI1ICogcywgKG0xMiArIG0yMSkgLyBzLCAobTAyIC0gbTIwKSAvIHMpKTtcbiAgICB9XG4gICAgY29uc3QgcyA9IDIgKiBNYXRoLnNxcnQoMSArIG0yMiAtIG0wMCAtIG0xMSk7XG4gICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgKG0wMiArIG0yMCkgLyBzLCAobTEyICsgbTIxKSAvIHMsIDAuMjUgKiBzLCAobTEwIC0gbTAxKSAvIHMpKTtcbn1cblxuLyoqXG4gKiBSb3RhdGlvbiB0aGF0IG1hcHMgK1ogdG8gYGZvcndhcmRgIGFuZCArWSBhcyBjbG9zZSBhcyBwb3NzaWJsZSB0byBgdXBgXG4gKiAoVW5pdHkncyBMb29rUm90YXRpb24pLiBEZWdlbmVyYXRlIGlucHV0IGZhbGxzIGJhY2sgdG8gYSBwZXJwZW5kaWN1bGFyIHVwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcUxvb2tSb3RhdGlvbjxUIGV4dGVuZHMgUTQ+KG91dDogVCwgZm9yd2FyZDogVjMsIHVwOiBWMyk6IFQge1xuICAgIGNvbnN0IHogPSBub3JtYWxpemUodjMoKSwgZm9yd2FyZCk7XG4gICAgaWYgKGxlblNxKHopIDwgRVBTSUxPTikgcmV0dXJuIHFJZGVudGl0eShvdXQpO1xuICAgIGNvbnN0IHggPSBjcm9zcyh2MygpLCB1cCwgeik7XG4gICAgaWYgKGxlblNxKHgpIDwgRVBTSUxPTikge1xuICAgICAgICAvLyB1cCBpcyBwYXJhbGxlbCB0byBmb3J3YXJkOiBrZWVwIGEgc3RhYmxlIHBlcnBlbmRpY3VsYXIuXG4gICAgICAgIGFueVBlcnBlbmRpY3VsYXIoeCwgeik7XG4gICAgfVxuICAgIG5vcm1hbGl6ZSh4LCB4KTtcbiAgICBjb25zdCB5ID0gY3Jvc3ModjMoKSwgeiwgeCk7XG4gICAgcmV0dXJuIHFGcm9tQXhlcyhvdXQsIHgsIHksIHopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcVNsZXJwPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBhOiBRNCwgYjogUTQsIHQ6IG51bWJlcik6IFQge1xuICAgIGxldCBieCA9IGIueCwgYnkgPSBiLnksIGJ6ID0gYi56LCBidyA9IGIudztcbiAgICBsZXQgY29zID0gYS54ICogYnggKyBhLnkgKiBieSArIGEueiAqIGJ6ICsgYS53ICogYnc7XG4gICAgaWYgKGNvcyA8IDApIHtcbiAgICAgICAgY29zID0gLWNvcztcbiAgICAgICAgYnggPSAtYng7XG4gICAgICAgIGJ5ID0gLWJ5O1xuICAgICAgICBieiA9IC1iejtcbiAgICAgICAgYncgPSAtYnc7XG4gICAgfVxuICAgIGxldCBzMDogbnVtYmVyO1xuICAgIGxldCBzMTogbnVtYmVyO1xuICAgIGlmICgxIC0gY29zID4gRVBTSUxPTikge1xuICAgICAgICBjb25zdCBvbWVnYSA9IE1hdGguYWNvcyhNYXRoLm1pbigxLCBjb3MpKTtcbiAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4ob21lZ2EpO1xuICAgICAgICBzMCA9IE1hdGguc2luKCgxIC0gdCkgKiBvbWVnYSkgLyBzaW47XG4gICAgICAgIHMxID0gTWF0aC5zaW4odCAqIG9tZWdhKSAvIHNpbjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzMCA9IDEgLSB0O1xuICAgICAgICBzMSA9IHQ7XG4gICAgfVxuICAgIHJldHVybiBxTm9ybWFsaXplKG91dCwgcVNldChvdXQsIHMwICogYS54ICsgczEgKiBieCwgczAgKiBhLnkgKyBzMSAqIGJ5LCBzMCAqIGEueiArIHMxICogYnosIHMwICogYS53ICsgczEgKiBidykpO1xufVxuXG4vKiogUm90YXRpb24gdGFraW5nIHVuaXQgdmVjdG9yIGBmcm9tYCBvbnRvIHVuaXQgdmVjdG9yIGB0b2AgKHNob3J0ZXN0IGFyYykuICovXG5leHBvcnQgZnVuY3Rpb24gcUZyb21UbzxUIGV4dGVuZHMgUTQ+KG91dDogVCwgZnJvbTogVjMsIHRvOiBWMyk6IFQge1xuICAgIGNvbnN0IGQgPSBkb3QoZnJvbSwgdG8pO1xuICAgIGlmIChkID49IDEgLSBFUFNJTE9OKSByZXR1cm4gcUlkZW50aXR5KG91dCk7XG4gICAgaWYgKGQgPD0gLTEgKyBFUFNJTE9OKSB7XG4gICAgICAgIGNvbnN0IGF4aXMgPSBhbnlQZXJwZW5kaWN1bGFyKHYzKCksIGZyb20pO1xuICAgICAgICByZXR1cm4gcVNldChvdXQsIGF4aXMueCwgYXhpcy55LCBheGlzLnosIDApO1xuICAgIH1cbiAgICBjb25zdCBjID0gY3Jvc3ModjMoKSwgZnJvbSwgdG8pO1xuICAgIHJldHVybiBxTm9ybWFsaXplKG91dCwgcVNldChvdXQsIGMueCwgYy55LCBjLnosIDEgKyBkKSk7XG59XG5cbi8qKiBFdWxlciBhbmdsZXMgaW4gZGVncmVlcyAoQ29jb3Mgb3JkZXI6IHJvdGF0ZSBhcm91bmQgWiwgdGhlbiBZLCB0aGVuIFguLi4gbWF0Y2hpbmcgY2MuUXVhdC50b0V1bGVyKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxVG9FdWxlcjxUIGV4dGVuZHMgVjM+KG91dDogVCwgcTogUTQpOiBUIHtcbiAgICAvLyBTYW1lIGZvcm11bGEgYXMgY2MuUXVhdC50b0V1bGVyIChvdXRlclogPSBmYWxzZSkuXG4gICAgY29uc3QgeyB4LCB5LCB6LCB3IH0gPSBxO1xuICAgIGxldCBiYW5rID0gMDtcbiAgICBsZXQgaGVhZGluZyA9IDA7XG4gICAgbGV0IGF0dGl0dWRlID0gMDtcbiAgICBjb25zdCB0ZXN0ID0geCAqIHkgKyB6ICogdztcbiAgICBpZiAodGVzdCA+IDAuNDk5OTk5KSB7XG4gICAgICAgIGJhbmsgPSAwO1xuICAgICAgICBoZWFkaW5nID0gKDIgKiBNYXRoLmF0YW4yKHgsIHcpICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIGF0dGl0dWRlID0gOTA7XG4gICAgfSBlbHNlIGlmICh0ZXN0IDwgLTAuNDk5OTk5KSB7XG4gICAgICAgIGJhbmsgPSAwO1xuICAgICAgICBoZWFkaW5nID0gKC0yICogTWF0aC5hdGFuMih4LCB3KSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgICAgICBhdHRpdHVkZSA9IC05MDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzcXggPSB4ICogeDtcbiAgICAgICAgY29uc3Qgc3F5ID0geSAqIHk7XG4gICAgICAgIGNvbnN0IHNxeiA9IHogKiB6O1xuICAgICAgICBiYW5rID0gKE1hdGguYXRhbjIoMiAqIHggKiB3IC0gMiAqIHkgKiB6LCAxIC0gMiAqIHNxeCAtIDIgKiBzcXopICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIGhlYWRpbmcgPSAoTWF0aC5hdGFuMigyICogeSAqIHcgLSAyICogeCAqIHosIDEgLSAyICogc3F5IC0gMiAqIHNxeikgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgYXR0aXR1ZGUgPSAoTWF0aC5hc2luKDIgKiB0ZXN0KSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgIH1cbiAgICByZXR1cm4gc2V0KG91dCwgYmFuaywgaGVhZGluZywgYXR0aXR1ZGUpO1xufVxuXG4vKiogSW52ZXJzZSBvZiBxVG9FdWxlciAoc2FtZSBhcyBjYy5RdWF0LmZyb21FdWxlcikuICovXG5leHBvcnQgZnVuY3Rpb24gcUZyb21FdWxlcjxUIGV4dGVuZHMgUTQ+KG91dDogVCwgZXg6IG51bWJlciwgZXk6IG51bWJlciwgZXo6IG51bWJlcik6IFQge1xuICAgIGNvbnN0IGhhbGZUb1JhZCA9ICgwLjUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICBjb25zdCB4ID0gZXggKiBoYWxmVG9SYWQ7XG4gICAgY29uc3QgeSA9IGV5ICogaGFsZlRvUmFkO1xuICAgIGNvbnN0IHogPSBleiAqIGhhbGZUb1JhZDtcbiAgICBjb25zdCBzeCA9IE1hdGguc2luKHgpO1xuICAgIGNvbnN0IGN4ID0gTWF0aC5jb3MoeCk7XG4gICAgY29uc3Qgc3kgPSBNYXRoLnNpbih5KTtcbiAgICBjb25zdCBjeSA9IE1hdGguY29zKHkpO1xuICAgIGNvbnN0IHN6ID0gTWF0aC5zaW4oeik7XG4gICAgY29uc3QgY3ogPSBNYXRoLmNvcyh6KTtcbiAgICByZXR1cm4gcVNldChcbiAgICAgICAgb3V0LFxuICAgICAgICBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3osXG4gICAgICAgIGN4ICogc3kgKiBjeiArIHN4ICogY3kgKiBzeixcbiAgICAgICAgY3ggKiBjeSAqIHN6IC0gc3ggKiBzeSAqIGN6LFxuICAgICAgICBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3osXG4gICAgKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1hdHJpY2VzXG5cbi8qKiBDb2x1bW4tbWFqb3IgNHg0IG1hdHJpeCwgbGFpZCBvdXQgbGlrZSBjYy5NYXQ0IChtMDAuLm0xNSkuICovXG5leHBvcnQgaW50ZXJmYWNlIE00IHtcbiAgICBtMDA6IG51bWJlcjsgbTAxOiBudW1iZXI7IG0wMjogbnVtYmVyOyBtMDM6IG51bWJlcjtcbiAgICBtMDQ6IG51bWJlcjsgbTA1OiBudW1iZXI7IG0wNjogbnVtYmVyOyBtMDc6IG51bWJlcjtcbiAgICBtMDg6IG51bWJlcjsgbTA5OiBudW1iZXI7IG0xMDogbnVtYmVyOyBtMTE6IG51bWJlcjtcbiAgICBtMTI6IG51bWJlcjsgbTEzOiBudW1iZXI7IG0xNDogbnVtYmVyOyBtMTU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG00VHJhbnNmb3JtUG9pbnQ8VCBleHRlbmRzIFYzPihvdXQ6IFQsIG06IE00LCBwOiBWMyk6IFQge1xuICAgIGNvbnN0IHsgeCwgeSwgeiB9ID0gcDtcbiAgICBsZXQgdyA9IG0ubTAzICogeCArIG0ubTA3ICogeSArIG0ubTExICogeiArIG0ubTE1O1xuICAgIHcgPSB3ID8gMSAvIHcgOiAxO1xuICAgIHJldHVybiBzZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgKG0ubTAwICogeCArIG0ubTA0ICogeSArIG0ubTA4ICogeiArIG0ubTEyKSAqIHcsXG4gICAgICAgIChtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0wOSAqIHogKyBtLm0xMykgKiB3LFxuICAgICAgICAobS5tMDIgKiB4ICsgbS5tMDYgKiB5ICsgbS5tMTAgKiB6ICsgbS5tMTQpICogdyxcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbTRUcmFuc2Zvcm1EaXI8VCBleHRlbmRzIFYzPihvdXQ6IFQsIG06IE00LCBkOiBWMyk6IFQge1xuICAgIGNvbnN0IHsgeCwgeSwgeiB9ID0gZDtcbiAgICByZXR1cm4gc2V0KG91dCwgbS5tMDAgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMDggKiB6LCBtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0wOSAqIHosIG0ubTAyICogeCArIG0ubTA2ICogeSArIG0ubTEwICogeik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCh2OiBudW1iZXIsIGxvOiBudW1iZXIsIGhpOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2IDwgbG8gPyBsbyA6IHYgPiBoaSA/IGhpIDogdjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wMDEodjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdiA8IDAgPyAwIDogdiA+IDEgPyAxIDogdjtcbn1cblxuLyoqIFBvc2l0aXZlIG1vZHVsbzogd3JhcHMgYHZgIGludG8gWzAsIG4pLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXAodjogbnVtYmVyLCBuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAoKHYgJSBuKSArIG4pICUgbjtcbn1cbiIsICIvKipcbiAqIEN1YmljIEJlemllciBjdXJ2ZSBtYXRoIChwdXJlLCBubyBlbmdpbmUgZGVwZW5kZW5jeSkuXG4gKlxuICogQSBjdXJ2ZSBpcyB0aGUgc2VnbWVudCBiZXR3ZWVuIHR3byBrbm90czogcDAgPSBrbm90IHBvc2l0aW9uLFxuICogcDEgPSBwMCArIG91dCB0YW5nZW50LCBwMiA9IG5leHQga25vdCArIGl0cyBpbiB0YW5nZW50LCBwMyA9IG5leHQga25vdC5cbiAqL1xuaW1wb3J0IHsgVjMsIHYzLCBzZXQsIGNvcHksIHN1Yiwgc2NhbGUsIGxlbiwgbGVycCwgbm9ybWFsaXplLCBsZW5TcSwgRVBTSUxPTiwgZGlzdCB9IGZyb20gJy4vbWF0aCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VydmUge1xuICAgIHAwOiBWMztcbiAgICBwMTogVjM7XG4gICAgcDI6IFYzO1xuICAgIHAzOiBWMztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnZlKCk6IEN1cnZlIHtcbiAgICByZXR1cm4geyBwMDogdjMoKSwgcDE6IHYzKCksIHAyOiB2MygpLCBwMzogdjMoKSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weUN1cnZlKG91dDogQ3VydmUsIGM6IEN1cnZlKTogQ3VydmUge1xuICAgIGNvcHkob3V0LnAwLCBjLnAwKTtcbiAgICBjb3B5KG91dC5wMSwgYy5wMSk7XG4gICAgY29weShvdXQucDIsIGMucDIpO1xuICAgIGNvcHkob3V0LnAzLCBjLnAzKTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZhbFBvc2l0aW9uPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBjOiBDdXJ2ZSwgdDogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgdSA9IDEgLSB0O1xuICAgIGNvbnN0IGEgPSB1ICogdSAqIHU7XG4gICAgY29uc3QgYiA9IDMgKiB1ICogdSAqIHQ7XG4gICAgY29uc3QgZCA9IDMgKiB1ICogdCAqIHQ7XG4gICAgY29uc3QgZSA9IHQgKiB0ICogdDtcbiAgICByZXR1cm4gc2V0KFxuICAgICAgICBvdXQsXG4gICAgICAgIGEgKiBjLnAwLnggKyBiICogYy5wMS54ICsgZCAqIGMucDIueCArIGUgKiBjLnAzLngsXG4gICAgICAgIGEgKiBjLnAwLnkgKyBiICogYy5wMS55ICsgZCAqIGMucDIueSArIGUgKiBjLnAzLnksXG4gICAgICAgIGEgKiBjLnAwLnogKyBiICogYy5wMS56ICsgZCAqIGMucDIueiArIGUgKiBjLnAzLnosXG4gICAgKTtcbn1cblxuLyoqIEZpcnN0IGRlcml2YXRpdmUgZEIvZHQgKG5vdCBub3JtYWxpemVkKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmFsRGVyaXZhdGl2ZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgYzogQ3VydmUsIHQ6IG51bWJlcik6IFQge1xuICAgIGNvbnN0IHUgPSAxIC0gdDtcbiAgICBjb25zdCBhID0gMyAqIHUgKiB1O1xuICAgIGNvbnN0IGIgPSA2ICogdSAqIHQ7XG4gICAgY29uc3QgZCA9IDMgKiB0ICogdDtcbiAgICByZXR1cm4gc2V0KFxuICAgICAgICBvdXQsXG4gICAgICAgIGEgKiAoYy5wMS54IC0gYy5wMC54KSArIGIgKiAoYy5wMi54IC0gYy5wMS54KSArIGQgKiAoYy5wMy54IC0gYy5wMi54KSxcbiAgICAgICAgYSAqIChjLnAxLnkgLSBjLnAwLnkpICsgYiAqIChjLnAyLnkgLSBjLnAxLnkpICsgZCAqIChjLnAzLnkgLSBjLnAyLnkpLFxuICAgICAgICBhICogKGMucDEueiAtIGMucDAueikgKyBiICogKGMucDIueiAtIGMucDEueikgKyBkICogKGMucDMueiAtIGMucDIueiksXG4gICAgKTtcbn1cblxuLyoqIFNlY29uZCBkZXJpdmF0aXZlIGQyQi9kdDIuICovXG5leHBvcnQgZnVuY3Rpb24gZXZhbEFjY2VsZXJhdGlvbjxUIGV4dGVuZHMgVjM+KG91dDogVCwgYzogQ3VydmUsIHQ6IG51bWJlcik6IFQge1xuICAgIGNvbnN0IHUgPSAxIC0gdDtcbiAgICByZXR1cm4gc2V0KFxuICAgICAgICBvdXQsXG4gICAgICAgIDYgKiB1ICogKGMucDIueCAtIDIgKiBjLnAxLnggKyBjLnAwLngpICsgNiAqIHQgKiAoYy5wMy54IC0gMiAqIGMucDIueCArIGMucDEueCksXG4gICAgICAgIDYgKiB1ICogKGMucDIueSAtIDIgKiBjLnAxLnkgKyBjLnAwLnkpICsgNiAqIHQgKiAoYy5wMy55IC0gMiAqIGMucDIueSArIGMucDEueSksXG4gICAgICAgIDYgKiB1ICogKGMucDIueiAtIDIgKiBjLnAxLnogKyBjLnAwLnopICsgNiAqIHQgKiAoYy5wMy56IC0gMiAqIGMucDIueiArIGMucDEueiksXG4gICAgKTtcbn1cblxuY29uc3QgX2QgPSB2MygpO1xuXG4vKipcbiAqIERpcmVjdGlvbiBvZiB0cmF2ZWwgYXQgdCwgd2l0aCBhIHVzYWJsZSB2YWx1ZSBldmVuIHdoZXJlIHRoZSBkZXJpdmF0aXZlXG4gKiB2YW5pc2hlcyAobGluZWFyIGtub3RzIGhhdmUgemVybyB0YW5nZW50cywgc28gQicoMCkgPSAwKTogZmFsbHMgYmFjayB0byB0aGVcbiAqIHNlY29uZCBkZXJpdmF0aXZlLCB0aGVuIHRvIHRoZSBjaG9yZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2YWxEaXJlY3Rpb248VCBleHRlbmRzIFYzPihvdXQ6IFQsIGM6IEN1cnZlLCB0OiBudW1iZXIpOiBUIHtcbiAgICBldmFsRGVyaXZhdGl2ZShfZCwgYywgdCk7XG4gICAgaWYgKGxlblNxKF9kKSA+IEVQU0lMT04gKiBFUFNJTE9OKSByZXR1cm4gbm9ybWFsaXplKG91dCwgX2QpO1xuICAgIC8vIEF0IGFuIGVuZCB3aXRoIGEgemVybyB0YW5nZW50IHRoZSBjdXJ2ZSBsZWF2ZXMgYWxvbmcgdGhlIHNlY29uZCBkZXJpdmF0aXZlXG4gICAgLy8gKHNpZ246IHRvd2FyZHMgdGhlIGluc2lkZSBvZiB0aGUgY3VydmUgYXQgdCA9IDAsIGJhY2sgYWxvbmcgaXQgYXQgdCA9IDEpLlxuICAgIGV2YWxBY2NlbGVyYXRpb24oX2QsIGMsIHQpO1xuICAgIGlmIChsZW5TcShfZCkgPiBFUFNJTE9OICogRVBTSUxPTikge1xuICAgICAgICBpZiAodCA+IDAuNSkgc2NhbGUoX2QsIF9kLCAtMSk7XG4gICAgICAgIHJldHVybiBub3JtYWxpemUob3V0LCBfZCk7XG4gICAgfVxuICAgIHN1YihfZCwgYy5wMywgYy5wMCk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIF9kKTtcbn1cblxuLyoqIFNwbGl0cyBhdCB0IHdpdGggZGUgQ2FzdGVsamF1OyB0aGUgaGFsdmVzIHNoYXJlIHRoZSBzcGxpdCBwb2ludC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdChjOiBDdXJ2ZSwgdDogbnVtYmVyLCBsZWZ0OiBDdXJ2ZSwgcmlnaHQ6IEN1cnZlKTogdm9pZCB7XG4gICAgY29uc3QgcDAxID0gbGVycCh2MygpLCBjLnAwLCBjLnAxLCB0KTtcbiAgICBjb25zdCBwMTIgPSBsZXJwKHYzKCksIGMucDEsIGMucDIsIHQpO1xuICAgIGNvbnN0IHAyMyA9IGxlcnAodjMoKSwgYy5wMiwgYy5wMywgdCk7XG4gICAgY29uc3QgcDAxMiA9IGxlcnAodjMoKSwgcDAxLCBwMTIsIHQpO1xuICAgIGNvbnN0IHAxMjMgPSBsZXJwKHYzKCksIHAxMiwgcDIzLCB0KTtcbiAgICBjb25zdCBtaWQgPSBsZXJwKHYzKCksIHAwMTIsIHAxMjMsIHQpO1xuICAgIGNvbnN0IHAwID0gY29weSh2MygpLCBjLnAwKTtcbiAgICBjb25zdCBwMyA9IGNvcHkodjMoKSwgYy5wMyk7XG4gICAgY29weShsZWZ0LnAwLCBwMCk7XG4gICAgY29weShsZWZ0LnAxLCBwMDEpO1xuICAgIGNvcHkobGVmdC5wMiwgcDAxMik7XG4gICAgY29weShsZWZ0LnAzLCBtaWQpO1xuICAgIGNvcHkocmlnaHQucDAsIG1pZCk7XG4gICAgY29weShyaWdodC5wMSwgcDEyMyk7XG4gICAgY29weShyaWdodC5wMiwgcDIzKTtcbiAgICBjb3B5KHJpZ2h0LnAzLCBwMyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpbmVhcihjOiBDdXJ2ZSk6IGJvb2xlYW4ge1xuICAgIC8vIEJvdGggaGFuZGxlcyBsaWUgb24gdGhlIGNob3JkLlxuICAgIGNvbnN0IGNob3JkID0gc3ViKHYzKCksIGMucDMsIGMucDApO1xuICAgIGNvbnN0IGwgPSBsZW4oY2hvcmQpO1xuICAgIGlmIChsIDwgRVBTSUxPTikgcmV0dXJuIGRpc3QoYy5wMSwgYy5wMCkgPCBFUFNJTE9OICYmIGRpc3QoYy5wMiwgYy5wMykgPCBFUFNJTE9OO1xuICAgIHJldHVybiBkaXN0VG9MaW5lKGMucDEsIGMucDAsIGNob3JkLCBsKSA8IGwgKiAxZS01ICYmIGRpc3RUb0xpbmUoYy5wMiwgYy5wMCwgY2hvcmQsIGwpIDwgbCAqIDFlLTU7XG59XG5cbmZ1bmN0aW9uIGRpc3RUb0xpbmUocDogVjMsIG86IFYzLCBkOiBWMywgZGw6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcHggPSBwLnggLSBvLng7XG4gICAgY29uc3QgcHkgPSBwLnkgLSBvLnk7XG4gICAgY29uc3QgcHogPSBwLnogLSBvLno7XG4gICAgY29uc3QgY3ggPSBweSAqIGQueiAtIHB6ICogZC55O1xuICAgIGNvbnN0IGN5ID0gcHogKiBkLnggLSBweCAqIGQuejtcbiAgICBjb25zdCBjeiA9IHB4ICogZC55IC0gcHkgKiBkLng7XG4gICAgcmV0dXJuIE1hdGguc3FydChjeCAqIGN4ICsgY3kgKiBjeSArIGN6ICogY3opIC8gZGw7XG59XG5cbi8vIDgtcG9pbnQgR2F1c3MtTGVnZW5kcmUgb24gWzAsIDFdOiBleGFjdCBmb3IgcG9seW5vbWlhbHMgdXAgdG8gZGVncmVlIDE1LFxuLy8gcGxlbnR5IGZvciB8QicodCl8IG92ZXIgYSBzaG9ydCBwYXJhbWV0ZXIgcmFuZ2UuXG5jb25zdCBHTF9YID0gW1xuICAgIDAuMDE5ODU1MDcxNzUxMjMxOSwgMC4xMDE2NjY3NjEyOTMxODY2LCAwLjIzNzIzMzc5NTA0MTgzNTUsIDAuNDA4MjgyNjc4NzUyMTc1MSxcbiAgICAwLjU5MTcxNzMyMTI0NzgyNDksIDAuNzYyNzY2MjA0OTU4MTY0NSwgMC44OTgzMzMyMzg3MDY4MTM0LCAwLjk4MDE0NDkyODI0ODc2ODEsXG5dO1xuY29uc3QgR0xfVyA9IFtcbiAgICAwLjA1MDYxNDI2ODE0NTE4ODEsIDAuMTExMTkwNTE3MjI2Njg3MiwgMC4xNTY4NTMzMjI5Mzg5NDM2LCAwLjE4MTM0MTg5MTY4OTE4MTAsXG4gICAgMC4xODEzNDE4OTE2ODkxODEwLCAwLjE1Njg1MzMyMjkzODk0MzYsIDAuMTExMTkwNTE3MjI2Njg3MiwgMC4wNTA2MTQyNjgxNDUxODgxLFxuXTtcblxuLyoqIEFyYyBsZW5ndGggYmV0d2VlbiBwYXJhbWV0ZXJzIGEgYW5kIGIuICovXG5leHBvcnQgZnVuY3Rpb24gYXJjTGVuZ3RoKGM6IEN1cnZlLCBhID0gMCwgYiA9IDEpOiBudW1iZXIge1xuICAgIGlmIChiIDw9IGEpIHJldHVybiAwO1xuICAgIGNvbnN0IGggPSBiIC0gYTtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICBldmFsRGVyaXZhdGl2ZShfZCwgYywgYSArIGggKiBHTF9YW2ldKTtcbiAgICAgICAgc3VtICs9IEdMX1dbaV0gKiBsZW4oX2QpO1xuICAgIH1cbiAgICByZXR1cm4gc3VtICogaDtcbn1cblxuLyoqXG4gKiBDdW11bGF0aXZlIGFyYyBsZW5ndGggYXQgZXZlbmx5IHNwYWNlZCBwYXJhbWV0ZXJzOiBsdXRbaV0gaXMgdGhlIGxlbmd0aCBmcm9tXG4gKiB0ID0gMCB0byB0ID0gaSAvIChuIC0gMSkuIFVzZWQgdG8gbWFwIGRpc3RhbmNlIHRvIHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZExlbmd0aFRhYmxlKGM6IEN1cnZlLCBuOiBudW1iZXIsIG91dD86IEZsb2F0NjRBcnJheSk6IEZsb2F0NjRBcnJheSB7XG4gICAgY29uc3QgbHV0ID0gb3V0ICYmIG91dC5sZW5ndGggPT09IG4gPyBvdXQgOiBuZXcgRmxvYXQ2NEFycmF5KG4pO1xuICAgIGx1dFswXSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgbHV0W2ldID0gbHV0W2kgLSAxXSArIGFyY0xlbmd0aChjLCAoaSAtIDEpIC8gKG4gLSAxKSwgaSAvIChuIC0gMSkpO1xuICAgIH1cbiAgICByZXR1cm4gbHV0O1xufVxuXG4vKiogUGFyYW1ldGVyIHQgYXQgYXJjIGxlbmd0aCBgZGAgYWxvbmcgdGhlIGN1cnZlLCB1c2luZyBhIHRhYmxlIGZyb20gYnVpbGRMZW5ndGhUYWJsZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0QXRMZW5ndGgobHV0OiBGbG9hdDY0QXJyYXksIGQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbiA9IGx1dC5sZW5ndGg7XG4gICAgY29uc3QgdG90YWwgPSBsdXRbbiAtIDFdO1xuICAgIGlmIChkIDw9IDAgfHwgdG90YWwgPD0gMCkgcmV0dXJuIDA7XG4gICAgaWYgKGQgPj0gdG90YWwpIHJldHVybiAxO1xuICAgIGxldCBsbyA9IDA7XG4gICAgbGV0IGhpID0gbiAtIDE7XG4gICAgd2hpbGUgKGhpIC0gbG8gPiAxKSB7XG4gICAgICAgIGNvbnN0IG1pZCA9IChsbyArIGhpKSA+PiAxO1xuICAgICAgICBpZiAobHV0W21pZF0gPCBkKSBsbyA9IG1pZDtcbiAgICAgICAgZWxzZSBoaSA9IG1pZDtcbiAgICB9XG4gICAgY29uc3Qgc2VnID0gbHV0W2hpXSAtIGx1dFtsb107XG4gICAgY29uc3QgZiA9IHNlZyA+IDAgPyAoZCAtIGx1dFtsb10pIC8gc2VnIDogMDtcbiAgICByZXR1cm4gKGxvICsgZikgLyAobiAtIDEpO1xufVxuXG4vKiogQXJjIGxlbmd0aCBmcm9tIDAgdG8gdCwgdXNpbmcgYSB0YWJsZSBmcm9tIGJ1aWxkTGVuZ3RoVGFibGUuICovXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoQXRUKGx1dDogRmxvYXQ2NEFycmF5LCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IG4gPSBsdXQubGVuZ3RoO1xuICAgIGlmICh0IDw9IDApIHJldHVybiAwO1xuICAgIGlmICh0ID49IDEpIHJldHVybiBsdXRbbiAtIDFdO1xuICAgIGNvbnN0IHggPSB0ICogKG4gLSAxKTtcbiAgICBjb25zdCBpID0gTWF0aC5mbG9vcih4KTtcbiAgICBjb25zdCBmID0geCAtIGk7XG4gICAgcmV0dXJuIGx1dFtpXSArIChsdXRbTWF0aC5taW4oaSArIDEsIG4gLSAxKV0gLSBsdXRbaV0pICogZjtcbn1cblxuLyoqXG4gKiBDbG9zZXN0IHBhcmFtZXRlciBvbiB0aGUgY3VydmUgdG8gcG9pbnQgcDogY29hcnNlIHNhbXBsaW5nIGZvbGxvd2VkIGJ5XG4gKiBhIGZldyByb3VuZHMgb2YgbG9jYWwgcmVmaW5lbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5lYXJlc3RUKGM6IEN1cnZlLCBwOiBWMywgc2FtcGxlcyA9IDE2LCBpdGVyYXRpb25zID0gNCk6IHsgdDogbnVtYmVyOyBkaXN0U3E6IG51bWJlciB9IHtcbiAgICBjb25zdCBxID0gdjMoKTtcbiAgICBsZXQgYmVzdFQgPSAwO1xuICAgIGxldCBiZXN0ID0gSW5maW5pdHk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2FtcGxlczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHQgPSBpIC8gc2FtcGxlcztcbiAgICAgICAgZXZhbFBvc2l0aW9uKHEsIGMsIHQpO1xuICAgICAgICBjb25zdCBkID0gKHEueCAtIHAueCkgKiogMiArIChxLnkgLSBwLnkpICoqIDIgKyAocS56IC0gcC56KSAqKiAyO1xuICAgICAgICBpZiAoZCA8IGJlc3QpIHtcbiAgICAgICAgICAgIGJlc3QgPSBkO1xuICAgICAgICAgICAgYmVzdFQgPSB0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdGVwID0gMSAvIHNhbXBsZXM7XG4gICAgZm9yIChsZXQgaXQgPSAwOyBpdCA8IGl0ZXJhdGlvbnM7IGl0KyspIHtcbiAgICAgICAgc3RlcCAqPSAwLjU7XG4gICAgICAgIGZvciAoY29uc3QgdCBvZiBbYmVzdFQgLSBzdGVwLCBiZXN0VCArIHN0ZXBdKSB7XG4gICAgICAgICAgICBpZiAodCA8IDAgfHwgdCA+IDEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgZXZhbFBvc2l0aW9uKHEsIGMsIHQpO1xuICAgICAgICAgICAgY29uc3QgZCA9IChxLnggLSBwLngpICoqIDIgKyAocS55IC0gcC55KSAqKiAyICsgKHEueiAtIHAueikgKiogMjtcbiAgICAgICAgICAgIGlmIChkIDwgYmVzdCkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBkO1xuICAgICAgICAgICAgICAgIGJlc3RUID0gdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB0OiBiZXN0VCwgZGlzdFNxOiBiZXN0IH07XG59XG4iLCAiLyoqXG4gKiBTcGxpbmUgbG9naWMgb24gcGxhaW4gZGF0YSAobm8gZW5naW5lIGRlcGVuZGVuY3kpLlxuICpcbiAqIEEgc3BsaW5lIGlzIGEgbGlzdCBvZiBCZXppZXIga25vdHMuIEVhY2gga25vdCBoYXMgYSBwb3NpdGlvbiwgYSByb3RhdGlvbiBhbmRcbiAqIHR3byB0YW5nZW50cyBleHByZXNzZWQgaW4gdGhlIGtub3QncyBvd24gc3BhY2UgKCtaID0gZGlyZWN0aW9uIG9mIHRyYXZlbCxcbiAqICtZID0gdXApLCBwbHVzIGEgdGFuZ2VudCBtb2RlIHRoYXQgZGVjaWRlcyBob3cgdGhlIHRhbmdlbnRzIGFyZSBrZXB0OlxuICpcbiAqIC0gQXV0b1Ntb290aDogdGFuZ2VudHMgY29tcHV0ZWQgZnJvbSB0aGUgbmVpZ2hib3IgcG9zaXRpb25zIChDYXRtdWxsLVJvbSkuXG4gKiAtIExpbmVhcjogICAgIG5vIHRhbmdlbnRzLCBzdHJhaWdodCBzZWdtZW50cy5cbiAqIC0gTWlycm9yZWQ6ICAgdGFuZ2VudHMgb3Bwb3NpdGUgYW5kIG9mIGVxdWFsIGxlbmd0aC5cbiAqIC0gQ29udGludW91czogdGFuZ2VudHMgb3Bwb3NpdGUsIGxlbmd0aHMgaW5kZXBlbmRlbnQuXG4gKiAtIEJyb2tlbjogICAgIHRhbmdlbnRzIGluZGVwZW5kZW50LlxuICpcbiAqIFBvc2l0aW9ucyBhcmUgaW4gdGhlIHNwbGluZSdzIGxvY2FsIHNwYWNlICh0aGUgU3BsaW5lQ29udGFpbmVyIG5vZGUpLlxuICovXG5pbXBvcnQge1xuICAgIFYzLCBRNCwgdjMsIHE0LCBzZXQsIGNvcHksIGFkZCwgc3ViLCBzY2FsZSwgbm9ybWFsaXplLCBsZW4sIGxlblNxLCBkb3QsIGNyb3NzLCBkaXN0LCBkaXN0U3EsXG4gICAgcVJvdGF0ZSwgcUludmVydCwgcU11bCwgcUNvcHksIHFMb29rUm90YXRpb24sIHFGcm9tQXhpc0FuZ2xlLCBxTm9ybWFsaXplLCBxSWRlbnRpdHksXG4gICAgcHJvamVjdE9uUGxhbmUsIGFueVBlcnBlbmRpY3VsYXIsIHdyYXAsIGNsYW1wMDEsIEVQU0lMT04sIHNjYWxlQW5kQWRkLCBsZXJwLFxufSBmcm9tICcuL21hdGgnO1xuaW1wb3J0IHtcbiAgICBDdXJ2ZSwgY3VydmUsIGV2YWxQb3NpdGlvbiwgZXZhbERpcmVjdGlvbiwgZXZhbERlcml2YXRpdmUsIHNwbGl0LCBidWlsZExlbmd0aFRhYmxlLCB0QXRMZW5ndGgsIGFyY0xlbmd0aCwgbmVhcmVzdFQsXG59IGZyb20gJy4vY3VydmUnO1xuXG5leHBvcnQgZW51bSBUYW5nZW50TW9kZSB7XG4gICAgQXV0b1Ntb290aCA9IDAsXG4gICAgTGluZWFyID0gMSxcbiAgICBNaXJyb3JlZCA9IDIsXG4gICAgQ29udGludW91cyA9IDMsXG4gICAgQnJva2VuID0gNCxcbn1cblxuLyoqIERlZmF1bHQgQ2F0bXVsbC1Sb20gcGFyYW1ldGVyaXphdGlvbiB1c2VkIGJ5IEF1dG9TbW9vdGgga25vdHMgKDAgdW5pZm9ybSwgMC41IGNlbnRyaXBldGFsLCAxIGNob3JkYWwpLiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVEVOU0lPTiA9IDAuNTtcblxuZXhwb3J0IGludGVyZmFjZSBLbm90TGlrZSB7XG4gICAgcG9zaXRpb246IFYzO1xuICAgIHRhbmdlbnRJbjogVjM7XG4gICAgdGFuZ2VudE91dDogVjM7XG4gICAgcm90YXRpb246IFE0O1xuICAgIG1vZGU6IG51bWJlcjtcbiAgICB0ZW5zaW9uOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BsaW5lTGlrZSB7XG4gICAga25vdHM6IEtub3RMaWtlW107XG4gICAgY2xvc2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpbmtMaWtlIHtcbiAgICAvKiogRmxhdHRlbmVkIChzcGxpbmVJbmRleCwga25vdEluZGV4KSBwYWlycy4gKi9cbiAgICBrbm90czogbnVtYmVyW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFpbmVyTGlrZSB7XG4gICAgc3BsaW5lczogU3BsaW5lTGlrZVtdO1xuICAgIGxpbmtzOiBMaW5rTGlrZVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY3Rvcnkge1xuICAgIGtub3QoKTogS25vdExpa2U7XG4gICAgc3BsaW5lKCk6IFNwbGluZUxpa2U7XG4gICAgbGluaygpOiBMaW5rTGlrZTtcbn1cblxuY29uc3QgVVA6IFYzID0geyB4OiAwLCB5OiAxLCB6OiAwIH07XG5jb25zdCBGT1JXQVJEOiBWMyA9IHsgeDogMCwgeTogMCwgejogMSB9O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaW5kaWNlc1xuXG5leHBvcnQgZnVuY3Rpb24gcHJldkluZGV4KGk6IG51bWJlciwgY291bnQ6IG51bWJlciwgY2xvc2VkOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY2xvc2VkID8gd3JhcChpIC0gMSwgY291bnQpIDogTWF0aC5tYXgoaSAtIDEsIDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dEluZGV4KGk6IG51bWJlciwgY291bnQ6IG51bWJlciwgY2xvc2VkOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY2xvc2VkID8gd3JhcChpICsgMSwgY291bnQpIDogTWF0aC5taW4oaSArIDEsIGNvdW50IC0gMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJ2ZUNvdW50KHM6IFNwbGluZUxpa2UpOiBudW1iZXIge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBpZiAobiA8IDIpIHJldHVybiAwO1xuICAgIHJldHVybiBzLmNsb3NlZCA/IG4gOiBuIC0gMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRhbmdlbnRzRWRpdGFibGUobW9kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1vZGUgPT09IFRhbmdlbnRNb2RlLk1pcnJvcmVkIHx8IG1vZGUgPT09IFRhbmdlbnRNb2RlLkNvbnRpbnVvdXMgfHwgbW9kZSA9PT0gVGFuZ2VudE1vZGUuQnJva2VuO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBrbm90c1xuXG5leHBvcnQgZnVuY3Rpb24gY29weUtub3Q8SyBleHRlbmRzIEtub3RMaWtlPihvdXQ6IEssIGs6IEtub3RMaWtlKTogSyB7XG4gICAgY29weShvdXQucG9zaXRpb24sIGsucG9zaXRpb24pO1xuICAgIGNvcHkob3V0LnRhbmdlbnRJbiwgay50YW5nZW50SW4pO1xuICAgIGNvcHkob3V0LnRhbmdlbnRPdXQsIGsudGFuZ2VudE91dCk7XG4gICAgcUNvcHkob3V0LnJvdGF0aW9uLCBrLnJvdGF0aW9uKTtcbiAgICBvdXQubW9kZSA9IGsubW9kZTtcbiAgICBvdXQudGVuc2lvbiA9IGsudGVuc2lvbjtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga25vdFVwPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBrOiBLbm90TGlrZSk6IFQge1xuICAgIHJldHVybiBxUm90YXRlKG91dCwgay5yb3RhdGlvbiwgVVApO1xufVxuXG4vKiogT3V0IHRhbmdlbnQgaW4gc3BsaW5lIHNwYWNlIChvZmZzZXQgZnJvbSB0aGUga25vdCBwb3NpdGlvbikuICovXG5leHBvcnQgZnVuY3Rpb24gdGFuZ2VudE91dFZlYzxUIGV4dGVuZHMgVjM+KG91dDogVCwgazogS25vdExpa2UpOiBUIHtcbiAgICByZXR1cm4gcVJvdGF0ZShvdXQsIGsucm90YXRpb24sIGsudGFuZ2VudE91dCk7XG59XG5cbi8qKiBJbiB0YW5nZW50IGluIHNwbGluZSBzcGFjZSAob2Zmc2V0IGZyb20gdGhlIGtub3QgcG9zaXRpb24pLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhbmdlbnRJblZlYzxUIGV4dGVuZHMgVjM+KG91dDogVCwgazogS25vdExpa2UpOiBUIHtcbiAgICByZXR1cm4gcVJvdGF0ZShvdXQsIGsucm90YXRpb24sIGsudGFuZ2VudEluKTtcbn1cblxuLyoqXG4gKiBLbm90IHJvdGF0aW9uIGZvciBhIHRhbmdlbnQgZGlyZWN0aW9uIGFuZCBhIG5vcm1hbCAodXApLiBMaWtlIFVuaXR5J3NcbiAqIEdldEtub3RSb3RhdGlvbjogdXAgaXMgdGhlIG5vcm1hbCBwcm9qZWN0ZWQgb2ZmIHRoZSB0YW5nZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24ga25vdFJvdGF0aW9uPFQgZXh0ZW5kcyBRND4ob3V0OiBULCB0YW5nZW50OiBWMywgbm9ybWFsOiBWMyk6IFQge1xuICAgIGNvbnN0IHQgPSBub3JtYWxpemUodjMoKSwgdGFuZ2VudCk7XG4gICAgbGV0IG4gPSBub3JtYWxpemUodjMoKSwgbm9ybWFsKTtcbiAgICBpZiAobGVuU3EobikgPCBFUFNJTE9OKSBuID0gY29weSh2MygpLCBVUCk7XG4gICAgaWYgKGxlblNxKHQpIDwgRVBTSUxPTikge1xuICAgICAgICAvLyBObyBkaXJlY3Rpb246IGZvcndhcmQgaXMgYW55IGRpcmVjdGlvbiBwZXJwZW5kaWN1bGFyIHRvIHRoZSBub3JtYWwuXG4gICAgICAgIGNvbnN0IGYgPSBhbnlQZXJwZW5kaWN1bGFyKHYzKCksIG4pO1xuICAgICAgICByZXR1cm4gcUxvb2tSb3RhdGlvbihvdXQsIGYsIG4pO1xuICAgIH1cbiAgICBpZiAoTWF0aC5hYnMoZG90KHQsIG4pKSA+IDEgLSAxZS01KSB7XG4gICAgICAgIC8vIE5vcm1hbCBwYXJhbGxlbCB0byB0aGUgdGFuZ2VudDogcGljayBhbiB1cCBwZXJwZW5kaWN1bGFyIHRvIGl0LlxuICAgICAgICBjb25zdCB1cCA9IGNyb3NzKHYzKCksIHQsIHsgeDogMSwgeTogMCwgejogMCB9KTtcbiAgICAgICAgaWYgKGxlblNxKHVwKSA8IEVQU0lMT04pIGNyb3NzKHVwLCB0LCB7IHg6IDAsIHk6IDAsIHo6IDEgfSk7XG4gICAgICAgIHJldHVybiBxTG9va1JvdGF0aW9uKG91dCwgdCwgbm9ybWFsaXplKHVwLCB1cCkpO1xuICAgIH1cbiAgICBjb25zdCB1cCA9IG5vcm1hbGl6ZSh2MygpLCBwcm9qZWN0T25QbGFuZSh2MygpLCBuLCB0KSk7XG4gICAgcmV0dXJuIHFMb29rUm90YXRpb24ob3V0LCB0LCB1cCk7XG59XG5cbi8qKlxuICogQXV0b1Ntb290aCB0YW5nZW50IGF0IGBjdXJgIGdpdmVuIGl0cyBuZWlnaGJvcnM6IGEgQ2F0bXVsbC1Sb20gdGFuZ2VudCB3aXRoXG4gKiB0aGUgcGFyYW1ldGVyaXphdGlvbiBgdGVuc2lvbmAgKGFscGhhKSwgc2NhbGVkIGZvciBhIGN1YmljIEJlemllciBoYW5kbGUuXG4gKiBCYXNlZCBvbiBZdWtzZWwgZXQgYWwuLCBcIlBhcmFtZXRlcml6YXRpb24gYW5kIGFwcGxpY2F0aW9ucyBvZiBDYXRtdWxsLVJvbSBjdXJ2ZXNcIi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF1dG9TbW9vdGhUYW5nZW50PFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBwcmV2OiBWMywgY3VyOiBWMywgbmV4dDogVjMsIHRlbnNpb246IG51bWJlcik6IFQge1xuICAgIGNvbnN0IGQxID0gZGlzdChjdXIsIHByZXYpO1xuICAgIGNvbnN0IGQyID0gZGlzdChuZXh0LCBjdXIpO1xuICAgIGlmIChkMSA8IEVQU0lMT04gJiYgZDIgPCBFUFNJTE9OKSByZXR1cm4gc2V0KG91dCwgMCwgMCwgMCk7XG4gICAgLy8gT25seSBvbmUgbmVpZ2hib3I6IGEgc2hvcnQgaGFuZGxlIHRvd2FyZHMgaXQsIGVub3VnaCB0byBnaXZlIHRoZSBrbm90IGEgZGlyZWN0aW9uLlxuICAgIGlmIChkMSA8IEVQU0lMT04pIHJldHVybiBzY2FsZShvdXQsIHN1YihvdXQsIG5leHQsIGN1ciksIDAuMSk7XG4gICAgaWYgKGQyIDwgRVBTSUxPTikgcmV0dXJuIHNjYWxlKG91dCwgc3ViKG91dCwgY3VyLCBwcmV2KSwgMC4xKTtcbiAgICBjb25zdCBhID0gdGVuc2lvbjtcbiAgICBjb25zdCBkMWEgPSBNYXRoLnBvdyhkMSwgYSk7XG4gICAgY29uc3QgZDJhID0gTWF0aC5wb3coZDIsIGEpO1xuICAgIGNvbnN0IGQxYTIgPSBkMWEgKiBkMWE7XG4gICAgY29uc3QgZDJhMiA9IGQyYSAqIGQyYTtcbiAgICBjb25zdCBrID0gMSAvICgzICogZDFhICogKGQxYSArIGQyYSkpO1xuICAgIHJldHVybiBzZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgKGQxYTIgKiBuZXh0LnggLSBkMmEyICogcHJldi54ICsgKGQyYTIgLSBkMWEyKSAqIGN1ci54KSAqIGssXG4gICAgICAgIChkMWEyICogbmV4dC55IC0gZDJhMiAqIHByZXYueSArIChkMmEyIC0gZDFhMikgKiBjdXIueSkgKiBrLFxuICAgICAgICAoZDFhMiAqIG5leHQueiAtIGQyYTIgKiBwcmV2LnogKyAoZDJhMiAtIGQxYTIpICogY3VyLnopICogayxcbiAgICApO1xufVxuXG4vKiogUmVjb21wdXRlcyB0aGUgdGFuZ2VudHMgKGFuZCByb3RhdGlvbikgYSBrbm90J3MgbW9kZSBpbXBsaWVzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VGFuZ2VudE1vZGUoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmIChpIDwgMCB8fCBpID49IG4pIHJldHVybjtcbiAgICBjb25zdCBrID0gcy5rbm90c1tpXTtcbiAgICBzd2l0Y2ggKGsubW9kZSkge1xuICAgICAgICBjYXNlIFRhbmdlbnRNb2RlLkxpbmVhcjpcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgMCk7XG4gICAgICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFRhbmdlbnRNb2RlLkF1dG9TbW9vdGg6IHtcbiAgICAgICAgICAgIGNvbnN0IHByZXYgPSBzLmtub3RzW3ByZXZJbmRleChpLCBuLCBzLmNsb3NlZCldLnBvc2l0aW9uO1xuICAgICAgICAgICAgY29uc3QgbmV4dCA9IHMua25vdHNbbmV4dEluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgICAgICAgICBjb25zdCB1cCA9IGtub3RVcCh2MygpLCBrKTtcbiAgICAgICAgICAgIGNvbnN0IHRpbiA9IGF1dG9TbW9vdGhUYW5nZW50KHYzKCksIG5leHQsIGsucG9zaXRpb24sIHByZXYsIGsudGVuc2lvbik7XG4gICAgICAgICAgICBjb25zdCB0b3V0ID0gYXV0b1Ntb290aFRhbmdlbnQodjMoKSwgcHJldiwgay5wb3NpdGlvbiwgbmV4dCwgay50ZW5zaW9uKTtcbiAgICAgICAgICAgIGxldCBsaW4gPSBsZW4odGluKTtcbiAgICAgICAgICAgIGxldCBsb3V0ID0gbGVuKHRvdXQpO1xuICAgICAgICAgICAgbGV0IGRpciA9IHRvdXQ7XG4gICAgICAgICAgICBpZiAobGluIDwgRVBTSUxPTikgbGluID0gbG91dDtcbiAgICAgICAgICAgIGlmIChsb3V0IDwgRVBTSUxPTikge1xuICAgICAgICAgICAgICAgIGxvdXQgPSBsaW47XG4gICAgICAgICAgICAgICAgZGlyID0gc2NhbGUodjMoKSwgdGluLCAtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGVuU3EoZGlyKSA+IEVQU0lMT04pIGtub3RSb3RhdGlvbihrLnJvdGF0aW9uLCBkaXIsIHVwKTtcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWxpbik7XG4gICAgICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCBsb3V0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgVGFuZ2VudE1vZGUuTWlycm9yZWQ6XG4gICAgICAgIGNhc2UgVGFuZ2VudE1vZGUuQ29udGludW91czpcbiAgICAgICAgICAgIGJha2VUYW5nZW50RGlyZWN0aW9uKGssIGsubW9kZSA9PT0gVGFuZ2VudE1vZGUuTWlycm9yZWQsIHRydWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbi8qKlxuICogVHVybnMgdGhlIGtub3Qgc28gaXRzIHRhbmdlbnRzIGxpZSBvbiBsb2NhbCBaICh0aGUgbWFpbiB0YW5nZW50IGtlZXBzIGl0c1xuICogZGlyZWN0aW9uKSwgYXMgTWlycm9yZWQgLyBDb250aW51b3VzIGtub3RzIHN0b3JlIHRoZW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiYWtlVGFuZ2VudERpcmVjdGlvbihrOiBLbm90TGlrZSwgbWlycm9yZWQ6IGJvb2xlYW4sIG91dElzTWFpbjogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRvdXQgPSB0YW5nZW50T3V0VmVjKHYzKCksIGspO1xuICAgIGNvbnN0IHRpbiA9IHRhbmdlbnRJblZlYyh2MygpLCBrKTtcbiAgICBjb25zdCBtYWluID0gb3V0SXNNYWluID8gdG91dCA6IHNjYWxlKHYzKCksIHRpbiwgLTEpO1xuICAgIGNvbnN0IG90aGVyID0gb3V0SXNNYWluID8gc2NhbGUodjMoKSwgdGluLCAtMSkgOiB0b3V0O1xuICAgIGNvbnN0IGRpciA9IGxlblNxKG1haW4pID4gRVBTSUxPTiA/IG1haW4gOiBvdGhlcjtcbiAgICBjb25zdCB1cCA9IGtub3RVcCh2MygpLCBrKTtcbiAgICBpZiAobGVuU3EoZGlyKSA+IEVQU0lMT04pIGtub3RSb3RhdGlvbihrLnJvdGF0aW9uLCBkaXIsIHVwKTtcbiAgICBjb25zdCBsbWFpbiA9IGxlbihtYWluKTtcbiAgICBjb25zdCBsb3RoZXIgPSBsZW4ob3RoZXIpO1xuICAgIGlmIChtaXJyb3JlZCkge1xuICAgICAgICBjb25zdCBsID0gbG1haW4gPiBFUFNJTE9OID8gbG1haW4gOiBsb3RoZXI7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGwpO1xuICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1sKTtcbiAgICB9IGVsc2UgaWYgKG91dElzTWFpbikge1xuICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCBsbWFpbik7XG4gICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWxvdGhlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbG1haW4pO1xuICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCBsb3RoZXIpO1xuICAgIH1cbn1cblxuLyoqIFJlY29tcHV0ZXMgdGhlIGtub3QgYW5kIGl0cyBBdXRvU21vb3RoIG5laWdoYm9ycyBhZnRlciBpdHMgcG9zaXRpb24gY2hhbmdlZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoQXJvdW5kKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBpZiAoIW4pIHJldHVybjtcbiAgICBjb25zdCBwID0gcHJldkluZGV4KGksIG4sIHMuY2xvc2VkKTtcbiAgICBjb25zdCBxID0gbmV4dEluZGV4KGksIG4sIHMuY2xvc2VkKTtcbiAgICBpZiAocCAhPT0gaSAmJiBzLmtub3RzW3BdLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpIGFwcGx5VGFuZ2VudE1vZGUocywgcCk7XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBpKTtcbiAgICBpZiAocSAhPT0gaSAmJiBxICE9PSBwICYmIHMua25vdHNbcV0ubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCkgYXBwbHlUYW5nZW50TW9kZShzLCBxKTtcbn1cblxuLyoqIFJlLWFwcGxpZXMgZXZlcnkga25vdCdzIG1vZGUgKGFmdGVyIGxvYWRpbmcgb3IgZXh0ZXJuYWwgZWRpdHMpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hBbGwoczogU3BsaW5lTGlrZSk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5rbm90cy5sZW5ndGg7IGkrKykgYXBwbHlUYW5nZW50TW9kZShzLCBpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEtub3RQb3NpdGlvbihzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIsIHA6IFYzKTogdm9pZCB7XG4gICAgY29weShzLmtub3RzW2ldLnBvc2l0aW9uLCBwKTtcbiAgICByZWZyZXNoQXJvdW5kKHMsIGkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGluIG9yIG91dCB0YW5nZW50IGZyb20gYSBzcGxpbmUtc3BhY2Ugb2Zmc2V0LCBrZWVwaW5nIHRoZSBrbm90J3NcbiAqIG1vZGUgY29uc3RyYWludHMuIFRhbmdlbnRzIG9mIEF1dG9TbW9vdGggLyBMaW5lYXIga25vdHMgYmVjb21lIENvbnRpbnVvdXNcbiAqICh0aGV5IGhhdmUgbm90aGluZyB0byBkcmFnIG90aGVyd2lzZSkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRUYW5nZW50VmVjKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlciwgd2hpY2g6ICdpbicgfCAnb3V0JywgdjogVjMpOiB2b2lkIHtcbiAgICBjb25zdCBrID0gcy5rbm90c1tpXTtcbiAgICBpZiAoIXRhbmdlbnRzRWRpdGFibGUoay5tb2RlKSkge1xuICAgICAgICBpZiAoay5tb2RlID09PSBUYW5nZW50TW9kZS5MaW5lYXIpIG1ha2VFeHBsaWNpdExpbmVhclRhbmdlbnRzKHMsIGkpO1xuICAgICAgICBrLm1vZGUgPSBUYW5nZW50TW9kZS5Db250aW51b3VzO1xuICAgIH1cbiAgICBpZiAoay5tb2RlID09PSBUYW5nZW50TW9kZS5Ccm9rZW4pIHtcbiAgICAgICAgY29uc3QgbG9jYWwgPSBxUm90YXRlKHYzKCksIHFJbnZlcnQocTQoKSwgay5yb3RhdGlvbiksIHYpO1xuICAgICAgICBjb3B5KHdoaWNoID09PSAnaW4nID8gay50YW5nZW50SW4gOiBrLnRhbmdlbnRPdXQsIGxvY2FsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBsID0gbGVuKHYpO1xuICAgIGNvbnN0IGRpciA9IHdoaWNoID09PSAnb3V0JyA/IGNvcHkodjMoKSwgdikgOiBzY2FsZSh2MygpLCB2LCAtMSk7XG4gICAgaWYgKGwgPiBFUFNJTE9OKSBrbm90Um90YXRpb24oay5yb3RhdGlvbiwgZGlyLCBrbm90VXAodjMoKSwgaykpO1xuICAgIGNvbnN0IG1pcnJvcmVkID0gay5tb2RlID09PSBUYW5nZW50TW9kZS5NaXJyb3JlZDtcbiAgICBpZiAod2hpY2ggPT09ICdvdXQnKSB7XG4gICAgICAgIGNvbnN0IGxpbiA9IG1pcnJvcmVkID8gbCA6IGxlbihrLnRhbmdlbnRJbik7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGwpO1xuICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1saW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxvdXQgPSBtaXJyb3JlZCA/IGwgOiBsZW4oay50YW5nZW50T3V0KTtcbiAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbCk7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGxvdXQpO1xuICAgIH1cbn1cblxuLyoqIExpbmVhciBrbm90cyBzdG9yZSB6ZXJvIHRhbmdlbnRzOyBnaXZlIHRoZW0gZ3JhYmJhYmxlIG9uZXMgcG9pbnRpbmcgYXQgdGhlIG5laWdoYm9ycy4gKi9cbmZ1bmN0aW9uIG1ha2VFeHBsaWNpdExpbmVhclRhbmdlbnRzKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBjb25zdCBrID0gcy5rbm90c1tpXTtcbiAgICBjb25zdCBpbnYgPSBxSW52ZXJ0KHE0KCksIGsucm90YXRpb24pO1xuICAgIGNvbnN0IHByZXYgPSBzLmtub3RzW3ByZXZJbmRleChpLCBuLCBzLmNsb3NlZCldLnBvc2l0aW9uO1xuICAgIGNvbnN0IG5leHQgPSBzLmtub3RzW25leHRJbmRleChpLCBuLCBzLmNsb3NlZCldLnBvc2l0aW9uO1xuICAgIHFSb3RhdGUoay50YW5nZW50SW4sIGludiwgc2NhbGUodjMoKSwgc3ViKHYzKCksIHByZXYsIGsucG9zaXRpb24pLCAxIC8gMykpO1xuICAgIHFSb3RhdGUoay50YW5nZW50T3V0LCBpbnYsIHNjYWxlKHYzKCksIHN1Yih2MygpLCBuZXh0LCBrLnBvc2l0aW9uKSwgMSAvIDMpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRhbmdlbnRNb2RlKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlciwgbW9kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgayA9IHMua25vdHNbaV07XG4gICAgaWYgKGsubW9kZSA9PT0gbW9kZSkge1xuICAgICAgICBhcHBseVRhbmdlbnRNb2RlKHMsIGkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChrLm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhciAmJiB0YW5nZW50c0VkaXRhYmxlKG1vZGUpKSBtYWtlRXhwbGljaXRMaW5lYXJUYW5nZW50cyhzLCBpKTtcbiAgICBrLm1vZGUgPSBtb2RlO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUZW5zaW9uKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlciwgdGVuc2lvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgcy5rbm90c1tpXS50ZW5zaW9uID0gdGVuc2lvbjtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIGkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Um90YXRpb24oczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCByOiBRNCk6IHZvaWQge1xuICAgIHFOb3JtYWxpemUocy5rbm90c1tpXS5yb3RhdGlvbiwgcik7XG4gICAgLy8gQXV0b1Ntb290aCBrbm90cyBvd24gdGhlaXIgcm90YXRpb24ncyBkaXJlY3Rpb247IG9ubHkgdGhlIHJvbGwgc3RpY2tzLlxuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY3VydmVzXG5cbi8qKiBDb250cm9sIHBvaW50cyBvZiBjdXJ2ZSBpIChiZXR3ZWVuIGtub3QgaSBhbmQgdGhlIG5leHQga25vdCkuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VydmUoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCBvdXQ6IEN1cnZlID0gY3VydmUoKSk6IEN1cnZlIHtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgY29uc3QgYSA9IHMua25vdHNbaV07XG4gICAgY29uc3QgYiA9IHMua25vdHNbKGkgKyAxKSAlIG5dO1xuICAgIGNvcHkob3V0LnAwLCBhLnBvc2l0aW9uKTtcbiAgICBhZGQob3V0LnAxLCBhLnBvc2l0aW9uLCB0YW5nZW50T3V0VmVjKG91dC5wMSwgYSkpO1xuICAgIGFkZChvdXQucDIsIGIucG9zaXRpb24sIHRhbmdlbnRJblZlYyhvdXQucDIsIGIpKTtcbiAgICBjb3B5KG91dC5wMywgYi5wb3NpdGlvbik7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY2FjaGVcblxuLyoqIFNhbXBsZXMgcGVyIGN1cnZlIGZvciB0aGUgZGlzdGFuY2UgdGFibGUuICovXG5leHBvcnQgY29uc3QgTEVOR1RIX1NBTVBMRVMgPSAzMjtcbi8qKiBTYW1wbGVzIHBlciBjdXJ2ZSBmb3IgdGhlIHVwLXZlY3RvciB0YWJsZS4gKi9cbmV4cG9ydCBjb25zdCBVUF9TQU1QTEVTID0gMTY7XG5cbmV4cG9ydCBjbGFzcyBTcGxpbmVDYWNoZSB7XG4gICAgLyoqIEZpbmdlcnByaW50IG9mIHRoZSBkYXRhIHRoZSBjYWNoZSB3YXMgYnVpbHQgZnJvbS4gKi9cbiAgICBzdGFtcCA9IE5hTjtcbiAgICBjdXJ2ZXM6IEN1cnZlW10gPSBbXTtcbiAgICBsZW5ndGhzOiBudW1iZXJbXSA9IFtdO1xuICAgIC8qKiBMZW5ndGggb2YgYWxsIGN1cnZlcyBiZWZvcmUgY3VydmUgaS4gKi9cbiAgICBzdGFydHM6IG51bWJlcltdID0gW107XG4gICAgdG90YWwgPSAwO1xuICAgIHRhYmxlczogRmxvYXQ2NEFycmF5W10gPSBbXTtcbiAgICB1cHM6IChGbG9hdDY0QXJyYXkgfCBudWxsKVtdID0gW107XG59XG5cbmNvbnN0IF9oYXNoQnVmID0gbmV3IEZsb2F0NjRBcnJheSgxKTtcbmNvbnN0IF9oYXNoSW50ID0gbmV3IEludDMyQXJyYXkoX2hhc2hCdWYuYnVmZmVyKTtcblxuZnVuY3Rpb24gbWl4KGg6IG51bWJlciwgdjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBfaGFzaEJ1ZlswXSA9IHY7XG4gICAgaCA9IE1hdGguaW11bChoIF4gX2hhc2hJbnRbMF0sIDE2Nzc3NjE5KTtcbiAgICBoID0gTWF0aC5pbXVsKGggXiBfaGFzaEludFsxXSwgMTY3Nzc2MTkpO1xuICAgIHJldHVybiBoO1xufVxuXG4vKiogQ2hlYXAgaGFzaCBvZiBldmVyeXRoaW5nIHRoYXQgc2hhcGVzIHRoZSBzcGxpbmUuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZ2VycHJpbnQoczogU3BsaW5lTGlrZSk6IG51bWJlciB7XG4gICAgbGV0IGggPSAyMTY2MTM2MjYxIHwgMDtcbiAgICBoID0gbWl4KGgsIHMua25vdHMubGVuZ3RoKTtcbiAgICBoID0gbWl4KGgsIHMuY2xvc2VkID8gMSA6IDApO1xuICAgIGZvciAoY29uc3QgayBvZiBzLmtub3RzKSB7XG4gICAgICAgIGggPSBtaXgoaCwgay5wb3NpdGlvbi54KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnBvc2l0aW9uLnkpO1xuICAgICAgICBoID0gbWl4KGgsIGsucG9zaXRpb24ueik7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50SW4ueCk7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50SW4ueSk7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50SW4ueik7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50T3V0LngpO1xuICAgICAgICBoID0gbWl4KGgsIGsudGFuZ2VudE91dC55KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRPdXQueik7XG4gICAgICAgIGggPSBtaXgoaCwgay5yb3RhdGlvbi54KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnJvdGF0aW9uLnkpO1xuICAgICAgICBoID0gbWl4KGgsIGsucm90YXRpb24ueik7XG4gICAgICAgIGggPSBtaXgoaCwgay5yb3RhdGlvbi53KTtcbiAgICAgICAgaCA9IG1peChoLCBrLm1vZGUpO1xuICAgICAgICBoID0gbWl4KGgsIGsudGVuc2lvbik7XG4gICAgfVxuICAgIHJldHVybiBoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRDYWNoZShzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIHN0YW1wID0gZmluZ2VycHJpbnQocykpOiBTcGxpbmVDYWNoZSB7XG4gICAgY29uc3QgY291bnQgPSBjdXJ2ZUNvdW50KHMpO1xuICAgIGNhY2hlLmN1cnZlcy5sZW5ndGggPSBjb3VudDtcbiAgICBjYWNoZS5sZW5ndGhzLmxlbmd0aCA9IGNvdW50O1xuICAgIGNhY2hlLnN0YXJ0cy5sZW5ndGggPSBjb3VudDtcbiAgICBjYWNoZS50YWJsZXMubGVuZ3RoID0gY291bnQ7XG4gICAgY2FjaGUudXBzLmxlbmd0aCA9IGNvdW50O1xuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGMgPSBnZXRDdXJ2ZShzLCBpLCBjYWNoZS5jdXJ2ZXNbaV0gfHwgY3VydmUoKSk7XG4gICAgICAgIGNhY2hlLmN1cnZlc1tpXSA9IGM7XG4gICAgICAgIGNvbnN0IHRhYmxlID0gYnVpbGRMZW5ndGhUYWJsZShjLCBMRU5HVEhfU0FNUExFUywgY2FjaGUudGFibGVzW2ldKTtcbiAgICAgICAgY2FjaGUudGFibGVzW2ldID0gdGFibGU7XG4gICAgICAgIGNhY2hlLnN0YXJ0c1tpXSA9IHRvdGFsO1xuICAgICAgICBjYWNoZS5sZW5ndGhzW2ldID0gdGFibGVbTEVOR1RIX1NBTVBMRVMgLSAxXTtcbiAgICAgICAgdG90YWwgKz0gY2FjaGUubGVuZ3Roc1tpXTtcbiAgICAgICAgY2FjaGUudXBzW2ldID0gbnVsbDsgLy8gYnVpbHQgb24gZGVtYW5kXG4gICAgfVxuICAgIGNhY2hlLnRvdGFsID0gdG90YWw7XG4gICAgY2FjaGUuc3RhbXAgPSBzdGFtcDtcbiAgICByZXR1cm4gY2FjaGU7XG59XG5cbi8qKiBSZWJ1aWxkcyB0aGUgY2FjaGUgd2hlbiB0aGUgc3BsaW5lIGNoYW5nZWQuIFJldHVybnMgdGhlIHVwLXRvLWRhdGUgY2FjaGUuICovXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlQ2FjaGUoczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlKTogU3BsaW5lQ2FjaGUge1xuICAgIGNvbnN0IHN0YW1wID0gZmluZ2VycHJpbnQocyk7XG4gICAgaWYgKHN0YW1wICE9PSBjYWNoZS5zdGFtcCkgYnVpbGRDYWNoZShzLCBjYWNoZSwgc3RhbXApO1xuICAgIHJldHVybiBjYWNoZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXJ2ZVBvaW50IHtcbiAgICAvKiogQ3VydmUgaW5kZXguICovXG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICAvKiogUGFyYW1ldGVyIG9uIHRoYXQgY3VydmUsIDAuLjEuICovXG4gICAgdDogbnVtYmVyO1xufVxuXG4vKiogQ3VydmUgYW5kIGN1cnZlIHBhcmFtZXRlciBhdCBhIG5vcm1hbGl6ZWQgZGlzdGFuY2UgdCAoMC4uMSkgYWxvbmcgdGhlIHdob2xlIHNwbGluZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjdXJ2ZVBvaW50QXQoY2FjaGU6IFNwbGluZUNhY2hlLCB0OiBudW1iZXIsIG91dDogQ3VydmVQb2ludCA9IHsgaW5kZXg6IDAsIHQ6IDAgfSk6IEN1cnZlUG9pbnQge1xuICAgIGNvbnN0IGNvdW50ID0gY2FjaGUuY3VydmVzLmxlbmd0aDtcbiAgICBpZiAoIWNvdW50KSB7XG4gICAgICAgIG91dC5pbmRleCA9IDA7XG4gICAgICAgIG91dC50ID0gMDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgaWYgKGNhY2hlLnRvdGFsIDw9IEVQU0lMT04pIHtcbiAgICAgICAgLy8gRGVnZW5lcmF0ZSAoYWxsIGtub3RzIG9uIG9uZSBwb2ludCk6IGZhbGwgYmFjayB0byB1bmlmb3JtIHBhcmFtZXRlcml6YXRpb24uXG4gICAgICAgIGNvbnN0IHggPSBjbGFtcDAxKHQpICogY291bnQ7XG4gICAgICAgIG91dC5pbmRleCA9IE1hdGgubWluKE1hdGguZmxvb3IoeCksIGNvdW50IC0gMSk7XG4gICAgICAgIG91dC50ID0geCAtIG91dC5pbmRleDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgY29uc3QgZCA9IGNsYW1wMDEodCkgKiBjYWNoZS50b3RhbDtcbiAgICBsZXQgbG8gPSAwO1xuICAgIGxldCBoaSA9IGNvdW50IC0gMTtcbiAgICB3aGlsZSAobG8gPCBoaSkge1xuICAgICAgICBjb25zdCBtaWQgPSAobG8gKyBoaSArIDEpID4+IDE7XG4gICAgICAgIGlmIChjYWNoZS5zdGFydHNbbWlkXSA8PSBkKSBsbyA9IG1pZDtcbiAgICAgICAgZWxzZSBoaSA9IG1pZCAtIDE7XG4gICAgfVxuICAgIG91dC5pbmRleCA9IGxvO1xuICAgIG91dC50ID0gcmVmaW5lVChjYWNoZS5jdXJ2ZXNbbG9dLCBjYWNoZS50YWJsZXNbbG9dLCBkIC0gY2FjaGUuc3RhcnRzW2xvXSk7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuY29uc3QgX2R2ID0gdjMoKTtcblxuLyoqIEV4YWN0IGFyYyBsZW5ndGggZnJvbSAwIHRvIHQ6IHRoZSB0YWJsZSB1cCB0byB0aGUgc2FtcGxlIGJlZm9yZSB0LCBpbnRlZ3JhdGVkIGZyb20gdGhlcmUuICovXG5mdW5jdGlvbiBleGFjdExlbmd0aEF0KGM6IEN1cnZlLCB0YWJsZTogRmxvYXQ2NEFycmF5LCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IG4gPSB0YWJsZS5sZW5ndGg7XG4gICAgaWYgKHQgPD0gMCkgcmV0dXJuIDA7XG4gICAgaWYgKHQgPj0gMSkgcmV0dXJuIHRhYmxlW24gLSAxXTtcbiAgICBjb25zdCBpID0gTWF0aC5taW4oTWF0aC5mbG9vcih0ICogKG4gLSAxKSksIG4gLSAyKTtcbiAgICByZXR1cm4gdGFibGVbaV0gKyBhcmNMZW5ndGgoYywgaSAvIChuIC0gMSksIHQpO1xufVxuXG4vKiogdCBhdCBhcmMgbGVuZ3RoIGQ6IHRhYmxlIGxvb2t1cCwgdGhlbiBOZXd0b24gc3RlcHMgb24gdGhlIGV4YWN0IGxlbmd0aC4gKi9cbmZ1bmN0aW9uIHJlZmluZVQoYzogQ3VydmUsIHRhYmxlOiBGbG9hdDY0QXJyYXksIGQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHQgPSB0QXRMZW5ndGgodGFibGUsIGQpO1xuICAgIGNvbnN0IG4gPSB0YWJsZS5sZW5ndGg7XG4gICAgaWYgKHQgPD0gMCB8fCB0ID49IDEpIHJldHVybiB0O1xuICAgIGNvbnN0IGkgPSBNYXRoLm1pbihNYXRoLmZsb29yKHQgKiAobiAtIDEpKSwgbiAtIDIpO1xuICAgIGNvbnN0IGxvID0gaSAvIChuIC0gMSk7XG4gICAgY29uc3QgaGkgPSAoaSArIDEpIC8gKG4gLSAxKTtcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IDI7IGsrKykge1xuICAgICAgICBjb25zdCBlcnIgPSB0YWJsZVtpXSArIGFyY0xlbmd0aChjLCBsbywgdCkgLSBkO1xuICAgICAgICBjb25zdCBzcGVlZCA9IGxlbihldmFsRGVyaXZhdGl2ZShfZHYsIGMsIHQpKTtcbiAgICAgICAgaWYgKHNwZWVkIDwgRVBTSUxPTikgYnJlYWs7XG4gICAgICAgIHQgPSBNYXRoLm1pbihoaSwgTWF0aC5tYXgobG8sIHQgLSBlcnIgLyBzcGVlZCkpO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn1cblxuLyoqIE5vcm1hbGl6ZWQgZGlzdGFuY2UgKDAuLjEpIG9mIGEgY3VydmUgcG9pbnQuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplZFRPZihjYWNoZTogU3BsaW5lQ2FjaGUsIGluZGV4OiBudW1iZXIsIHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFjYWNoZS5jdXJ2ZXMubGVuZ3RoKSByZXR1cm4gMDtcbiAgICBpZiAoY2FjaGUudG90YWwgPD0gRVBTSUxPTikgcmV0dXJuIChpbmRleCArIHQpIC8gY2FjaGUuY3VydmVzLmxlbmd0aDtcbiAgICByZXR1cm4gKGNhY2hlLnN0YXJ0c1tpbmRleF0gKyBleGFjdExlbmd0aEF0KGNhY2hlLmN1cnZlc1tpbmRleF0sIGNhY2hlLnRhYmxlc1tpbmRleF0sIHQpKSAvIGNhY2hlLnRvdGFsO1xufVxuXG4vKiogS25vdC1pbmRleCB1bml0IChjdXJ2ZSBpbmRleCArIGN1cnZlIHQsIGUuZy4gMi41ID0gaGFsZndheSBiZXR3ZWVuIGtub3RzIDIgYW5kIDMpIHRvIG5vcm1hbGl6ZWQgdC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrbm90VW5pdFRvVChjYWNoZTogU3BsaW5lQ2FjaGUsIGs6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY291bnQgPSBjYWNoZS5jdXJ2ZXMubGVuZ3RoO1xuICAgIGlmICghY291bnQpIHJldHVybiAwO1xuICAgIGNvbnN0IGkgPSBNYXRoLm1pbihNYXRoLm1heChNYXRoLmZsb29yKGspLCAwKSwgY291bnQgLSAxKTtcbiAgICByZXR1cm4gbm9ybWFsaXplZFRPZihjYWNoZSwgaSwgY2xhbXAwMShrIC0gaSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdFRvS25vdFVuaXQoY2FjaGU6IFNwbGluZUNhY2hlLCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHAgPSBjdXJ2ZVBvaW50QXQoY2FjaGUsIHQpO1xuICAgIHJldHVybiBwLmluZGV4ICsgcC50O1xufVxuXG5jb25zdCBfY3A6IEN1cnZlUG9pbnQgPSB7IGluZGV4OiAwLCB0OiAwIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZVBvc2l0aW9uPFQgZXh0ZW5kcyBWMz4oczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCB0OiBudW1iZXIsIG91dDogVCk6IFQge1xuICAgIGlmICghcy5rbm90cy5sZW5ndGgpIHJldHVybiBzZXQob3V0LCAwLCAwLCAwKTtcbiAgICBpZiAocy5rbm90cy5sZW5ndGggPT09IDEgfHwgIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHJldHVybiBjb3B5KG91dCwgcy5rbm90c1swXS5wb3NpdGlvbik7XG4gICAgY3VydmVQb2ludEF0KGNhY2hlLCB0LCBfY3ApO1xuICAgIHJldHVybiBldmFsUG9zaXRpb24ob3V0LCBjYWNoZS5jdXJ2ZXNbX2NwLmluZGV4XSwgX2NwLnQpO1xufVxuXG4vKiogVW5pdCBkaXJlY3Rpb24gb2YgdHJhdmVsIGF0IHQuICovXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVEaXJlY3Rpb248VCBleHRlbmRzIFYzPihzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIHQ6IG51bWJlciwgb3V0OiBUKTogVCB7XG4gICAgaWYgKHMua25vdHMubGVuZ3RoIDwgMiB8fCAhY2FjaGUuY3VydmVzLmxlbmd0aCkge1xuICAgICAgICBpZiAocy5rbm90cy5sZW5ndGggPT09IDEpIHJldHVybiBub3JtYWxpemUob3V0LCB0YW5nZW50T3V0VmVjKG91dCwgcy5rbm90c1swXSkpO1xuICAgICAgICByZXR1cm4gc2V0KG91dCwgMCwgMCwgMSk7XG4gICAgfVxuICAgIGN1cnZlUG9pbnRBdChjYWNoZSwgdCwgX2NwKTtcbiAgICByZXR1cm4gZXZhbERpcmVjdGlvbihvdXQsIGNhY2hlLmN1cnZlc1tfY3AuaW5kZXhdLCBfY3AudCk7XG59XG5cbi8qKiBVbml0IHVwIHZlY3RvciBhdCB0OiBrbm90IHVwIHZlY3RvcnMgY2FycmllZCBhbG9uZyB0aGUgY3VydmUgd2l0aG91dCB0d2lzdGluZy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZVVwPFQgZXh0ZW5kcyBWMz4oczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCB0OiBudW1iZXIsIG91dDogVCk6IFQge1xuICAgIGlmICghcy5rbm90cy5sZW5ndGgpIHJldHVybiBzZXQob3V0LCAwLCAxLCAwKTtcbiAgICBpZiAocy5rbm90cy5sZW5ndGggPT09IDEgfHwgIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHJldHVybiBrbm90VXAob3V0LCBzLmtub3RzWzBdKTtcbiAgICBjdXJ2ZVBvaW50QXQoY2FjaGUsIHQsIF9jcCk7XG4gICAgcmV0dXJuIGN1cnZlVXAocywgY2FjaGUsIF9jcC5pbmRleCwgX2NwLnQsIG91dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJ2ZVVwPFQgZXh0ZW5kcyBWMz4oczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCBpbmRleDogbnVtYmVyLCB0OiBudW1iZXIsIG91dDogVCk6IFQge1xuICAgIGxldCB0YWJsZSA9IGNhY2hlLnVwc1tpbmRleF07XG4gICAgaWYgKCF0YWJsZSkgdGFibGUgPSBjYWNoZS51cHNbaW5kZXhdID0gYnVpbGRVcFRhYmxlKHMsIGNhY2hlLmN1cnZlc1tpbmRleF0sIGluZGV4KTtcbiAgICBjb25zdCB4ID0gY2xhbXAwMSh0KSAqIFVQX1NBTVBMRVM7XG4gICAgY29uc3QgaSA9IE1hdGgubWluKE1hdGguZmxvb3IoeCksIFVQX1NBTVBMRVMgLSAxKTtcbiAgICBjb25zdCBmID0geCAtIGk7XG4gICAgY29uc3QgYSA9IHYzKHRhYmxlW2kgKiAzXSwgdGFibGVbaSAqIDMgKyAxXSwgdGFibGVbaSAqIDMgKyAyXSk7XG4gICAgY29uc3QgYiA9IHYzKHRhYmxlW2kgKiAzICsgM10sIHRhYmxlW2kgKiAzICsgNF0sIHRhYmxlW2kgKiAzICsgNV0pO1xuICAgIGxlcnAob3V0LCBhLCBiLCBmKTtcbiAgICAvLyBLZWVwIGl0IHBlcnBlbmRpY3VsYXIgdG8gdGhlIGRpcmVjdGlvbiBvZiB0cmF2ZWwuXG4gICAgY29uc3QgZGlyID0gZXZhbERpcmVjdGlvbih2MygpLCBjYWNoZS5jdXJ2ZXNbaW5kZXhdLCB0KTtcbiAgICBwcm9qZWN0T25QbGFuZShvdXQsIG91dCwgZGlyKTtcbiAgICBpZiAobGVuU3Eob3V0KSA8IEVQU0lMT04pIHJldHVybiBub3JtYWxpemUob3V0LCBhKTtcbiAgICByZXR1cm4gbm9ybWFsaXplKG91dCwgb3V0KTtcbn1cblxuLyoqXG4gKiBVcCB2ZWN0b3JzIGFsb25nIGEgY3VydmU6IHRoZSBzdGFydCBrbm90J3MgdXAgY2FycmllZCBieSBhIHJvdGF0aW9uXG4gKiBtaW5pbWl6aW5nIGZyYW1lIChkb3VibGUgcmVmbGVjdGlvbiksIHdpdGggdGhlIHR3aXN0IG5lZWRlZCB0byBtZWV0IHRoZSBlbmRcbiAqIGtub3QncyB1cCBzcHJlYWQgZXZlbmx5IG92ZXIgdGhlIGN1cnZlLlxuICovXG5mdW5jdGlvbiBidWlsZFVwVGFibGUoczogU3BsaW5lTGlrZSwgYzogQ3VydmUsIGluZGV4OiBudW1iZXIpOiBGbG9hdDY0QXJyYXkge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBjb25zdCBhID0gcy5rbm90c1tpbmRleF07XG4gICAgY29uc3QgYiA9IHMua25vdHNbKGluZGV4ICsgMSkgJSBuXTtcbiAgICBjb25zdCB0YWJsZSA9IG5ldyBGbG9hdDY0QXJyYXkoKFVQX1NBTVBMRVMgKyAxKSAqIDMpO1xuXG4gICAgY29uc3QgcG9zOiBWM1tdID0gW107XG4gICAgY29uc3QgZGlyczogVjNbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IFVQX1NBTVBMRVM7IGkrKykge1xuICAgICAgICBjb25zdCB0ID0gaSAvIFVQX1NBTVBMRVM7XG4gICAgICAgIHBvcy5wdXNoKGV2YWxQb3NpdGlvbih2MygpLCBjLCB0KSk7XG4gICAgICAgIGRpcnMucHVzaChldmFsRGlyZWN0aW9uKHYzKCksIGMsIHQpKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cHM6IFYzW10gPSBbXTtcbiAgICBsZXQgciA9IG5vcm1hbGl6ZSh2MygpLCBwcm9qZWN0T25QbGFuZSh2MygpLCBrbm90VXAodjMoKSwgYSksIGRpcnNbMF0pKTtcbiAgICBpZiAobGVuU3EocikgPCBFUFNJTE9OKSByID0gYW55UGVycGVuZGljdWxhcih2MygpLCBkaXJzWzBdKTtcbiAgICB1cHMucHVzaChyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IFVQX1NBTVBMRVM7IGkrKykge1xuICAgICAgICAvLyBEb3VibGUgcmVmbGVjdGlvbiAoV2FuZyBldCBhbC4gMjAwOCkuXG4gICAgICAgIGNvbnN0IHYxID0gc3ViKHYzKCksIHBvc1tpICsgMV0sIHBvc1tpXSk7XG4gICAgICAgIGNvbnN0IGMxID0gZG90KHYxLCB2MSk7XG4gICAgICAgIGNvbnN0IHJpID0gdXBzW2ldO1xuICAgICAgICBjb25zdCB0aSA9IGRpcnNbaV07XG4gICAgICAgIGxldCByTCA9IHJpO1xuICAgICAgICBsZXQgdEwgPSB0aTtcbiAgICAgICAgaWYgKGMxID4gRVBTSUxPTiAqIEVQU0lMT04pIHtcbiAgICAgICAgICAgIHJMID0gc2NhbGVBbmRBZGQodjMoKSwgcmksIHYxLCAoLTIgLyBjMSkgKiBkb3QodjEsIHJpKSk7XG4gICAgICAgICAgICB0TCA9IHNjYWxlQW5kQWRkKHYzKCksIHRpLCB2MSwgKC0yIC8gYzEpICogZG90KHYxLCB0aSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHYyID0gc3ViKHYzKCksIGRpcnNbaSArIDFdLCB0TCk7XG4gICAgICAgIGNvbnN0IGMyID0gZG90KHYyLCB2Mik7XG4gICAgICAgIGxldCBuZXh0ID0gckw7XG4gICAgICAgIGlmIChjMiA+IEVQU0lMT04gKiBFUFNJTE9OKSBuZXh0ID0gc2NhbGVBbmRBZGQodjMoKSwgckwsIHYyLCAoLTIgLyBjMikgKiBkb3QodjIsIHJMKSk7XG4gICAgICAgIG5leHQgPSBub3JtYWxpemUodjMoKSwgcHJvamVjdE9uUGxhbmUodjMoKSwgbmV4dCwgZGlyc1tpICsgMV0pKTtcbiAgICAgICAgaWYgKGxlblNxKG5leHQpIDwgRVBTSUxPTikgbmV4dCA9IGNvcHkodjMoKSwgdXBzW2ldKTtcbiAgICAgICAgdXBzLnB1c2gobmV4dCk7XG4gICAgfVxuXG4gICAgLy8gVHdpc3QgdG8gcmVhY2ggdGhlIGVuZCBrbm90J3MgdXAuXG4gICAgY29uc3QgZW5kVXAgPSBub3JtYWxpemUodjMoKSwgcHJvamVjdE9uUGxhbmUodjMoKSwga25vdFVwKHYzKCksIGIpLCBkaXJzW1VQX1NBTVBMRVNdKSk7XG4gICAgbGV0IHR3aXN0ID0gMDtcbiAgICBpZiAobGVuU3EoZW5kVXApID4gRVBTSUxPTikge1xuICAgICAgICBjb25zdCBsYXN0ID0gdXBzW1VQX1NBTVBMRVNdO1xuICAgICAgICBjb25zdCBjID0gY3Jvc3ModjMoKSwgbGFzdCwgZW5kVXApO1xuICAgICAgICB0d2lzdCA9IE1hdGguYXRhbjIoZG90KGMsIGRpcnNbVVBfU0FNUExFU10pLCBkb3QobGFzdCwgZW5kVXApKTtcbiAgICB9XG4gICAgY29uc3QgcSA9IHE0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gVVBfU0FNUExFUzsgaSsrKSB7XG4gICAgICAgIGxldCB1ID0gdXBzW2ldO1xuICAgICAgICBpZiAodHdpc3QgIT09IDApIHtcbiAgICAgICAgICAgIHFGcm9tQXhpc0FuZ2xlKHEsIGRpcnNbaV0sICh0d2lzdCAqIGkpIC8gVVBfU0FNUExFUyk7XG4gICAgICAgICAgICB1ID0gcVJvdGF0ZSh2MygpLCBxLCB1KTtcbiAgICAgICAgfVxuICAgICAgICB0YWJsZVtpICogM10gPSB1Lng7XG4gICAgICAgIHRhYmxlW2kgKiAzICsgMV0gPSB1Lnk7XG4gICAgICAgIHRhYmxlW2kgKiAzICsgMl0gPSB1Lno7XG4gICAgfVxuICAgIHJldHVybiB0YWJsZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOZWFyZXN0UmVzdWx0IHtcbiAgICAvKiogTm9ybWFsaXplZCBkaXN0YW5jZSBhbG9uZyB0aGUgc3BsaW5lICgwLi4xKS4gKi9cbiAgICB0OiBudW1iZXI7XG4gICAgY3VydmU6IG51bWJlcjtcbiAgICBjdXJ2ZVQ6IG51bWJlcjtcbiAgICBwb3NpdGlvbjogVjM7XG4gICAgZGlzdGFuY2U6IG51bWJlcjtcbn1cblxuLyoqIENsb3Nlc3QgcG9pbnQgb24gdGhlIHNwbGluZSB0byBgcGAgKHNwbGluZSBzcGFjZSkuICovXG5leHBvcnQgZnVuY3Rpb24gbmVhcmVzdFBvaW50KHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSwgcDogVjMpOiBOZWFyZXN0UmVzdWx0IHtcbiAgICBjb25zdCByZXM6IE5lYXJlc3RSZXN1bHQgPSB7IHQ6IDAsIGN1cnZlOiAwLCBjdXJ2ZVQ6IDAsIHBvc2l0aW9uOiB2MygpLCBkaXN0YW5jZTogSW5maW5pdHkgfTtcbiAgICBpZiAoIXMua25vdHMubGVuZ3RoKSByZXR1cm4gcmVzO1xuICAgIGlmICghY2FjaGUuY3VydmVzLmxlbmd0aCkge1xuICAgICAgICBjb3B5KHJlcy5wb3NpdGlvbiwgcy5rbm90c1swXS5wb3NpdGlvbik7XG4gICAgICAgIHJlcy5kaXN0YW5jZSA9IGRpc3QocCwgcmVzLnBvc2l0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgbGV0IGJlc3QgPSBJbmZpbml0eTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhY2hlLmN1cnZlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCByID0gbmVhcmVzdFQoY2FjaGUuY3VydmVzW2ldLCBwLCAxNiwgMTApO1xuICAgICAgICBpZiAoci5kaXN0U3EgPCBiZXN0KSB7XG4gICAgICAgICAgICBiZXN0ID0gci5kaXN0U3E7XG4gICAgICAgICAgICByZXMuY3VydmUgPSBpO1xuICAgICAgICAgICAgcmVzLmN1cnZlVCA9IHIudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBldmFsUG9zaXRpb24ocmVzLnBvc2l0aW9uLCBjYWNoZS5jdXJ2ZXNbcmVzLmN1cnZlXSwgcmVzLmN1cnZlVCk7XG4gICAgcmVzLmRpc3RhbmNlID0gTWF0aC5zcXJ0KGJlc3QpO1xuICAgIHJlcy50ID0gbm9ybWFsaXplZFRPZihjYWNoZSwgcmVzLmN1cnZlLCByZXMuY3VydmVUKTtcbiAgICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIE1vdmVzIGBkaXN0YW5jZWAgYWxvbmcgdGhlIHNwbGluZSBmcm9tIG5vcm1hbGl6ZWQgYGZyb21UYCAobmVnYXRpdmUgZ29lc1xuICogYmFjaykuIFJldHVybnMgdGhlIHJlc3VsdGluZyBub3JtYWxpemVkIHQgKGNsYW1wZWQgb24gb3BlbiBzcGxpbmVzLFxuICogd3JhcHBlZCBvbiBjbG9zZWQgb25lcykuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0QXREaXN0YW5jZUZyb20oczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCBmcm9tVDogbnVtYmVyLCBkaXN0YW5jZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoY2FjaGUudG90YWwgPD0gRVBTSUxPTikgcmV0dXJuIGNsYW1wMDEoZnJvbVQpO1xuICAgIGNvbnN0IHQgPSBmcm9tVCArIGRpc3RhbmNlIC8gY2FjaGUudG90YWw7XG4gICAgcmV0dXJuIHMuY2xvc2VkID8gd3JhcCh0LCAxKSA6IGNsYW1wMDEodCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBlZGl0IG9wc1xuXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0S25vdChzOiBTcGxpbmVMaWtlLCBpbmRleDogbnVtYmVyLCBrOiBLbm90TGlrZSk6IHZvaWQge1xuICAgIHMua25vdHMuc3BsaWNlKGluZGV4LCAwLCBrKTtcbiAgICByZWZyZXNoQXJvdW5kKHMsIGluZGV4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUtub3QoczogU3BsaW5lTGlrZSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHMua25vdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgaWYgKCFuKSByZXR1cm47XG4gICAgY29uc3QgbmV4dCA9IE1hdGgubWluKGluZGV4LCBuIC0gMSk7XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBwcmV2SW5kZXgobmV4dCwgbiwgcy5jbG9zZWQpKTtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIG5leHQpO1xufVxuXG4vKipcbiAqIEluc2VydHMgYSBrbm90IG9uIGN1cnZlIGBjdXJ2ZUluZGV4YCBhdCBwYXJhbWV0ZXIgdCB3aXRob3V0IGNoYW5naW5nIHRoZVxuICogc2hhcGUgKGRlIENhc3RlbGphdSBzcGxpdCkuIFJldHVybnMgdGhlIG5ldyBrbm90J3MgaW5kZXguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRPbkN1cnZlKHM6IFNwbGluZUxpa2UsIGN1cnZlSW5kZXg6IG51bWJlciwgdDogbnVtYmVyLCBmYWN0b3J5OiBGYWN0b3J5KTogbnVtYmVyIHtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgY29uc3QgaWEgPSBjdXJ2ZUluZGV4O1xuICAgIGNvbnN0IGliID0gKGN1cnZlSW5kZXggKyAxKSAlIG47XG4gICAgY29uc3QgYSA9IHMua25vdHNbaWFdO1xuICAgIGNvbnN0IGIgPSBzLmtub3RzW2liXTtcbiAgICBjb25zdCBjID0gZ2V0Q3VydmUocywgY3VydmVJbmRleCk7XG4gICAgY29uc3QgbGVmdCA9IGN1cnZlKCk7XG4gICAgY29uc3QgcmlnaHQgPSBjdXJ2ZSgpO1xuICAgIHNwbGl0KGMsIHQsIGxlZnQsIHJpZ2h0KTtcblxuICAgIGNvbnN0IGsgPSBmYWN0b3J5Lmtub3QoKTtcbiAgICBjb3B5KGsucG9zaXRpb24sIGxlZnQucDMpO1xuICAgIGsudGVuc2lvbiA9IERFRkFVTFRfVEVOU0lPTjtcblxuICAgIGNvbnN0IGJvdGhBdXRvID0gYS5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoICYmIGIubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aDtcbiAgICBjb25zdCBib3RoTGluZWFyID0gYS5tb2RlID09PSBUYW5nZW50TW9kZS5MaW5lYXIgJiYgYi5tb2RlID09PSBUYW5nZW50TW9kZS5MaW5lYXI7XG5cbiAgICAvLyBUaGUgbmV3IGtub3QncyB1cCBibGVuZHMgYmV0d2VlbiBpdHMgbmVpZ2hib3JzJy5cbiAgICBjb25zdCB1cCA9IGtub3RVcCh2MygpLCBhKTtcbiAgICBjb25zdCB1cEIgPSBrbm90VXAodjMoKSwgYik7XG4gICAgbGVycCh1cCwgdXAsIHVwQiwgdCk7XG4gICAgY29uc3Qgb3V0RGlyID0gc3ViKHYzKCksIHJpZ2h0LnAxLCByaWdodC5wMCk7XG4gICAga25vdFJvdGF0aW9uKGsucm90YXRpb24sIGxlblNxKG91dERpcikgPiBFUFNJTE9OID8gb3V0RGlyIDogc3ViKHYzKCksIHJpZ2h0LnAwLCBsZWZ0LnAyKSwgdXApO1xuXG4gICAgaWYgKGJvdGhBdXRvKSB7XG4gICAgICAgIGsubW9kZSA9IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGg7XG4gICAgfSBlbHNlIGlmIChib3RoTGluZWFyKSB7XG4gICAgICAgIGsubW9kZSA9IFRhbmdlbnRNb2RlLkxpbmVhcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBLZWVwIHRoZSBleGFjdCBzaGFwZTogc2hvcnRlbiB0aGUgbmVpZ2hib3JzJyBoYW5kbGVzLCB0aGUgbmV3IGtub3QgZ2V0cyB0aGUgc3BsaXQgaGFuZGxlcy5cbiAgICAgICAgaWYgKGEubW9kZSA9PT0gVGFuZ2VudE1vZGUuTWlycm9yZWQpIGEubW9kZSA9IFRhbmdlbnRNb2RlLkNvbnRpbnVvdXM7XG4gICAgICAgIGlmIChiLm1vZGUgPT09IFRhbmdlbnRNb2RlLk1pcnJvcmVkKSBiLm1vZGUgPSBUYW5nZW50TW9kZS5Db250aW51b3VzO1xuICAgICAgICBpZiAodGFuZ2VudHNFZGl0YWJsZShhLm1vZGUpKSB7XG4gICAgICAgICAgICBxUm90YXRlKGEudGFuZ2VudE91dCwgcUludmVydChxNCgpLCBhLnJvdGF0aW9uKSwgc3ViKHYzKCksIGxlZnQucDEsIGxlZnQucDApKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFuZ2VudHNFZGl0YWJsZShiLm1vZGUpKSB7XG4gICAgICAgICAgICBxUm90YXRlKGIudGFuZ2VudEluLCBxSW52ZXJ0KHE0KCksIGIucm90YXRpb24pLCBzdWIodjMoKSwgcmlnaHQucDIsIHJpZ2h0LnAzKSk7XG4gICAgICAgIH1cbiAgICAgICAgay5tb2RlID0gVGFuZ2VudE1vZGUuQ29udGludW91cztcbiAgICAgICAgY29uc3QgaW52ID0gcUludmVydChxNCgpLCBrLnJvdGF0aW9uKTtcbiAgICAgICAgcVJvdGF0ZShrLnRhbmdlbnRJbiwgaW52LCBzdWIodjMoKSwgbGVmdC5wMiwgbGVmdC5wMykpO1xuICAgICAgICBxUm90YXRlKGsudGFuZ2VudE91dCwgaW52LCBzdWIodjMoKSwgcmlnaHQucDEsIHJpZ2h0LnAwKSk7XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gaWEgKyAxO1xuICAgIHMua25vdHMuc3BsaWNlKGluZGV4LCAwLCBrKTtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIGluZGV4KTtcbiAgICBjb25zdCBtID0gcy5rbm90cy5sZW5ndGg7XG4gICAgY29uc3QgcCA9IHByZXZJbmRleChpbmRleCwgbSwgcy5jbG9zZWQpO1xuICAgIGNvbnN0IHEgPSBuZXh0SW5kZXgoaW5kZXgsIG0sIHMuY2xvc2VkKTtcbiAgICBpZiAocy5rbm90c1twXS5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoKSBhcHBseVRhbmdlbnRNb2RlKHMsIHApO1xuICAgIGlmIChzLmtub3RzW3FdLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpIGFwcGx5VGFuZ2VudE1vZGUocywgcSk7XG4gICAgcmV0dXJuIGluZGV4O1xufVxuXG5jb25zdCBZMTgwID0gcTQoMCwgMSwgMCwgMCk7XG5cbi8qKiBSZXZlcnNlcyB0aGUgZGlyZWN0aW9uIG9mIHRyYXZlbDsgdGhlIHNoYXBlIHN0YXlzIHRoZSBzYW1lLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VGbG93KHM6IFNwbGluZUxpa2UpOiB2b2lkIHtcbiAgICBzLmtub3RzLnJldmVyc2UoKTtcbiAgICBmb3IgKGNvbnN0IGsgb2Ygcy5rbm90cykge1xuICAgICAgICAvLyBUdXJuIHRoZSBrbm90IGFyb3VuZCBpdHMgdXAgYXhpczsgaW4gYW5kIG91dCBzd2FwIHBsYWNlcy5cbiAgICAgICAgY29uc3Qgb2xkSW4gPSBxUm90YXRlKHYzKCksIFkxODAsIGsudGFuZ2VudEluKTtcbiAgICAgICAgY29uc3Qgb2xkT3V0ID0gcVJvdGF0ZSh2MygpLCBZMTgwLCBrLnRhbmdlbnRPdXQpO1xuICAgICAgICBjb3B5KGsudGFuZ2VudEluLCBvbGRPdXQpO1xuICAgICAgICBjb3B5KGsudGFuZ2VudE91dCwgb2xkSW4pO1xuICAgICAgICBxTXVsKGsucm90YXRpb24sIGsucm90YXRpb24sIFkxODApO1xuICAgIH1cbiAgICByZWZyZXNoQWxsKHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q2xvc2VkKHM6IFNwbGluZUxpa2UsIGNsb3NlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHMuY2xvc2VkID0gY2xvc2VkO1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBpZiAoIW4pIHJldHVybjtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIDApO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgbiAtIDEpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNvbnRhaW5lciBvcHNcblxuZXhwb3J0IGludGVyZmFjZSBLbm90UmVmIHtcbiAgICBzcGxpbmU6IG51bWJlcjtcbiAgICBrbm90OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYW1lUmVmKGE6IEtub3RSZWYsIGI6IEtub3RSZWYpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYS5zcGxpbmUgPT09IGIuc3BsaW5lICYmIGEua25vdCA9PT0gYi5rbm90O1xufVxuXG5mdW5jdGlvbiBncm91cE9mKGM6IENvbnRhaW5lckxpa2UsIHI6IEtub3RSZWYpOiBMaW5rTGlrZSB8IG51bGwge1xuICAgIGZvciAoY29uc3QgZyBvZiBjLmxpbmtzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpICsgMSA8IGcua25vdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgIGlmIChnLmtub3RzW2ldID09PSByLnNwbGluZSAmJiBnLmtub3RzW2kgKyAxXSA9PT0gci5rbm90KSByZXR1cm4gZztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLyoqIEtub3RzIGxpbmtlZCB0byBgcmAgKGV4Y2x1ZGluZyByIGl0c2VsZikuICovXG5leHBvcnQgZnVuY3Rpb24gbGlua2VkS25vdHMoYzogQ29udGFpbmVyTGlrZSwgcjogS25vdFJlZik6IEtub3RSZWZbXSB7XG4gICAgY29uc3QgZyA9IGdyb3VwT2YoYywgcik7XG4gICAgaWYgKCFnKSByZXR1cm4gW107XG4gICAgY29uc3QgcmVzOiBLbm90UmVmW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBnLmtub3RzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGNvbnN0IG8gPSB7IHNwbGluZTogZy5rbm90c1tpXSwga25vdDogZy5rbm90c1tpICsgMV0gfTtcbiAgICAgICAgaWYgKCFzYW1lUmVmKG8sIHIpKSByZXMucHVzaChvKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlua2VkKGM6IENvbnRhaW5lckxpa2UsIHI6IEtub3RSZWYpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFncm91cE9mKGMsIHIpO1xufVxuXG4vKiogTGlua3MgYWxsIGdpdmVuIGtub3RzIHRvZ2V0aGVyIChtZXJnaW5nIHRoZWlyIGV4aXN0aW5nIGdyb3VwcykuICovXG5leHBvcnQgZnVuY3Rpb24gbGlua0tub3RzKGM6IENvbnRhaW5lckxpa2UsIHJlZnM6IEtub3RSZWZbXSwgZmFjdG9yeTogRmFjdG9yeSk6IHZvaWQge1xuICAgIGlmIChyZWZzLmxlbmd0aCA8IDIpIHJldHVybjtcbiAgICBjb25zdCBtZW1iZXJzOiBLbm90UmVmW10gPSBbXTtcbiAgICBjb25zdCBhZGQgPSAocjogS25vdFJlZikgPT4ge1xuICAgICAgICBpZiAoIW1lbWJlcnMuc29tZSgobSkgPT4gc2FtZVJlZihtLCByKSkpIG1lbWJlcnMucHVzaChyKTtcbiAgICB9O1xuICAgIGZvciAoY29uc3QgciBvZiByZWZzKSB7XG4gICAgICAgIGNvbnN0IGcgPSBncm91cE9mKGMsIHIpO1xuICAgICAgICBpZiAoZykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgZy5rbm90cy5sZW5ndGg7IGkgKz0gMikgYWRkKHsgc3BsaW5lOiBnLmtub3RzW2ldLCBrbm90OiBnLmtub3RzW2kgKyAxXSB9KTtcbiAgICAgICAgICAgIGMubGlua3Muc3BsaWNlKGMubGlua3MuaW5kZXhPZihnKSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkKHIpO1xuICAgIH1cbiAgICBjb25zdCBnID0gZmFjdG9yeS5saW5rKCk7XG4gICAgZy5rbm90cy5sZW5ndGggPSAwO1xuICAgIGZvciAoY29uc3QgbSBvZiBtZW1iZXJzKSBnLmtub3RzLnB1c2gobS5zcGxpbmUsIG0ua25vdCk7XG4gICAgYy5saW5rcy5wdXNoKGcpO1xuICAgIC8vIExpbmtlZCBrbm90cyBzaGFyZSB0aGUgZmlyc3Qga25vdCdzIHBvc2l0aW9uLlxuICAgIGNvbnN0IHAgPSBjLnNwbGluZXNbcmVmc1swXS5zcGxpbmVdLmtub3RzW3JlZnNbMF0ua25vdF0ucG9zaXRpb247XG4gICAgZm9yIChjb25zdCBtIG9mIG1lbWJlcnMpIHtcbiAgICAgICAgaWYgKHNhbWVSZWYobSwgcmVmc1swXSkpIGNvbnRpbnVlO1xuICAgICAgICBzZXRLbm90UG9zaXRpb24oYy5zcGxpbmVzW20uc3BsaW5lXSwgbS5rbm90LCBwKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmxpbmtLbm90cyhjOiBDb250YWluZXJMaWtlLCByZWZzOiBLbm90UmVmW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHIgb2YgcmVmcykge1xuICAgICAgICBjb25zdCBnID0gZ3JvdXBPZihjLCByKTtcbiAgICAgICAgaWYgKCFnKSBjb250aW51ZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgZy5rbm90cy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgaWYgKGcua25vdHNbaV0gPT09IHIuc3BsaW5lICYmIGcua25vdHNbaSArIDFdID09PSByLmtub3QpIHtcbiAgICAgICAgICAgICAgICBnLmtub3RzLnNwbGljZShpLCAyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZy5rbm90cy5sZW5ndGggPCA0KSBjLmxpbmtzLnNwbGljZShjLmxpbmtzLmluZGV4T2YoZyksIDEpO1xuICAgIH1cbn1cblxuLyoqIE1vdmVzIGV2ZXJ5IGtub3QgbGlua2VkIHRvIGByYCBvbnRvIHIncyBwb3NpdGlvbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzeW5jTGlua2VkKGM6IENvbnRhaW5lckxpa2UsIHI6IEtub3RSZWYpOiB2b2lkIHtcbiAgICBjb25zdCBwID0gYy5zcGxpbmVzW3Iuc3BsaW5lXS5rbm90c1tyLmtub3RdLnBvc2l0aW9uO1xuICAgIGZvciAoY29uc3QgbyBvZiBsaW5rZWRLbm90cyhjLCByKSkge1xuICAgICAgICBjb25zdCBzID0gYy5zcGxpbmVzW28uc3BsaW5lXTtcbiAgICAgICAgaWYgKCFzIHx8ICFzLmtub3RzW28ua25vdF0pIGNvbnRpbnVlO1xuICAgICAgICBzZXRLbm90UG9zaXRpb24ocywgby5rbm90LCBwKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJld3JpdGVMaW5rcyhjOiBDb250YWluZXJMaWtlLCBtYXA6IChyOiBLbm90UmVmKSA9PiBLbm90UmVmIHwgbnVsbCk6IHZvaWQge1xuICAgIGZvciAobGV0IGdpID0gYy5saW5rcy5sZW5ndGggLSAxOyBnaSA+PSAwOyBnaS0tKSB7XG4gICAgICAgIGNvbnN0IGcgPSBjLmxpbmtzW2dpXTtcbiAgICAgICAgY29uc3QgbmV4dDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgZy5rbm90cy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgY29uc3QgciA9IG1hcCh7IHNwbGluZTogZy5rbm90c1tpXSwga25vdDogZy5rbm90c1tpICsgMV0gfSk7XG4gICAgICAgICAgICBpZiAociAmJiAhbmV4dC5zb21lKChfLCBqKSA9PiBqICUgMiA9PT0gMCAmJiBuZXh0W2pdID09PSByLnNwbGluZSAmJiBuZXh0W2ogKyAxXSA9PT0gci5rbm90KSkgbmV4dC5wdXNoKHIuc3BsaW5lLCByLmtub3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0Lmxlbmd0aCA8IDQpIGMubGlua3Muc3BsaWNlKGdpLCAxKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBnLmtub3RzLnB1c2goLi4ubmV4dCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKiBVcGRhdGVzIGxpbmtzIGFmdGVyIGEga25vdCB3YXMgaW5zZXJ0ZWQgYXQgKHNwbGluZSwga25vdCkuICovXG5leHBvcnQgZnVuY3Rpb24gbGlua3NPbktub3RJbnNlcnRlZChjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlciwga25vdDogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV3cml0ZUxpbmtzKGMsIChyKSA9PiAoci5zcGxpbmUgPT09IHNwbGluZSAmJiByLmtub3QgPj0ga25vdCA/IHsgc3BsaW5lLCBrbm90OiByLmtub3QgKyAxIH0gOiByKSk7XG59XG5cbi8qKiBVcGRhdGVzIGxpbmtzIGFmdGVyIHRoZSBrbm90IGF0IChzcGxpbmUsIGtub3QpIHdhcyByZW1vdmVkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbmtzT25Lbm90UmVtb3ZlZChjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlciwga25vdDogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV3cml0ZUxpbmtzKGMsIChyKSA9PiB7XG4gICAgICAgIGlmIChyLnNwbGluZSAhPT0gc3BsaW5lKSByZXR1cm4gcjtcbiAgICAgICAgaWYgKHIua25vdCA9PT0ga25vdCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiByLmtub3QgPiBrbm90ID8geyBzcGxpbmUsIGtub3Q6IHIua25vdCAtIDEgfSA6IHI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5rc09uU3BsaW5lUmVtb3ZlZChjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlcik6IHZvaWQge1xuICAgIHJld3JpdGVMaW5rcyhjLCAocikgPT4ge1xuICAgICAgICBpZiAoci5zcGxpbmUgPT09IHNwbGluZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiByLnNwbGluZSA+IHNwbGluZSA/IHsgc3BsaW5lOiByLnNwbGluZSAtIDEsIGtub3Q6IHIua25vdCB9IDogcjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmtzT25SZXZlcnNlZChjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlciwgY291bnQ6IG51bWJlcik6IHZvaWQge1xuICAgIHJld3JpdGVMaW5rcyhjLCAocikgPT4gKHIuc3BsaW5lID09PSBzcGxpbmUgPyB7IHNwbGluZSwga25vdDogY291bnQgLSAxIC0gci5rbm90IH0gOiByKSk7XG59XG5cbi8qKiBDb250YWluZXItbGV2ZWwgaW5zZXJ0IHRoYXQga2VlcHMgbGlua3MgdmFsaWQuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVySW5zZXJ0S25vdChjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlciwgaW5kZXg6IG51bWJlciwgazogS25vdExpa2UpOiB2b2lkIHtcbiAgICBsaW5rc09uS25vdEluc2VydGVkKGMsIHNwbGluZSwgaW5kZXgpO1xuICAgIGluc2VydEtub3QoYy5zcGxpbmVzW3NwbGluZV0sIGluZGV4LCBrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5lckluc2VydE9uQ3VydmUoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIsIGN1cnZlSW5kZXg6IG51bWJlciwgdDogbnVtYmVyLCBmYWN0b3J5OiBGYWN0b3J5KTogbnVtYmVyIHtcbiAgICBjb25zdCBzID0gYy5zcGxpbmVzW3NwbGluZV07XG4gICAgY29uc3QgaW5kZXggPSBjdXJ2ZUluZGV4ICsgMTtcbiAgICBsaW5rc09uS25vdEluc2VydGVkKGMsIHNwbGluZSwgaW5kZXgpO1xuICAgIHJldHVybiBpbnNlcnRPbkN1cnZlKHMsIGN1cnZlSW5kZXgsIHQsIGZhY3RvcnkpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMga25vdHMgKHJlZnMgbWF5IHNwYW4gc3BsaW5lcykuIFNwbGluZXMgbGVmdCBlbXB0eSBhcmUgcmVtb3ZlZCxcbiAqIGV4Y2VwdCB0aGUgY29udGFpbmVyIGtlZXBzIGF0IGxlYXN0IG9uZSBzcGxpbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluZXJSZW1vdmVLbm90cyhjOiBDb250YWluZXJMaWtlLCByZWZzOiBLbm90UmVmW10pOiB2b2lkIHtcbiAgICBjb25zdCBzb3J0ZWQgPSBbLi4ucmVmc10uc29ydCgoYSwgYikgPT4gKGEuc3BsaW5lIC0gYi5zcGxpbmUpIHx8IChiLmtub3QgLSBhLmtub3QpKTtcbiAgICBmb3IgKGNvbnN0IHIgb2Ygc29ydGVkKSB7XG4gICAgICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbci5zcGxpbmVdO1xuICAgICAgICBpZiAoIXMgfHwgci5rbm90ID49IHMua25vdHMubGVuZ3RoKSBjb250aW51ZTtcbiAgICAgICAgcmVtb3ZlS25vdChzLCByLmtub3QpO1xuICAgICAgICBsaW5rc09uS25vdFJlbW92ZWQoYywgci5zcGxpbmUsIHIua25vdCk7XG4gICAgICAgIGlmIChzLmtub3RzLmxlbmd0aCA8IDMgJiYgcy5jbG9zZWQpIHMuY2xvc2VkID0gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSBjLnNwbGluZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGMuc3BsaW5lc1tpXS5rbm90cy5sZW5ndGggPT09IDAgJiYgYy5zcGxpbmVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGMuc3BsaW5lcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBsaW5rc09uU3BsaW5lUmVtb3ZlZChjLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5lclJldmVyc2UoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBzID0gYy5zcGxpbmVzW3NwbGluZV07XG4gICAgbGlua3NPblJldmVyc2VkKGMsIHNwbGluZSwgcy5rbm90cy5sZW5ndGgpO1xuICAgIHJldmVyc2VGbG93KHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVyUmVtb3ZlU3BsaW5lKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyKTogdm9pZCB7XG4gICAgYy5zcGxpbmVzLnNwbGljZShzcGxpbmUsIDEpO1xuICAgIGxpbmtzT25TcGxpbmVSZW1vdmVkKGMsIHNwbGluZSk7XG59XG5cbmZ1bmN0aW9uIGNsb25lS25vdChrOiBLbm90TGlrZSwgZmFjdG9yeTogRmFjdG9yeSk6IEtub3RMaWtlIHtcbiAgICByZXR1cm4gY29weUtub3QoZmFjdG9yeS5rbm90KCksIGspO1xufVxuXG4vKipcbiAqIFNwbGl0cyBhIHNwbGluZSBhdCBhIGtub3QgKFVuaXR5J3MgU3BsaXQgS25vdCk6IGFuIG9wZW4gc3BsaW5lIGJlY29tZXMgdHdvXG4gKiBzcGxpbmVzIHNoYXJpbmcgYSBjb3B5IG9mIHRoZSBrbm90LCBhIGNsb3NlZCBzcGxpbmUgb3BlbnMgYXQgdGhlIGtub3QuXG4gKiBUaGUgdHdvIGNvcGllcyBhcmUgbGlua2VkLiBSZXR1cm5zIHRoZSBuZXcgY29weSdzIHJlZiwgb3IgbnVsbCBpZiB0aGUga25vdFxuICogaXMgYW4gZW5kIG9mIGFuIG9wZW4gc3BsaW5lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRLbm90KGM6IENvbnRhaW5lckxpa2UsIHI6IEtub3RSZWYsIGZhY3Rvcnk6IEZhY3RvcnkpOiBLbm90UmVmIHwgbnVsbCB7XG4gICAgY29uc3QgcyA9IGMuc3BsaW5lc1tyLnNwbGluZV07XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmIChzLmNsb3NlZCkge1xuICAgICAgICAvLyBSb3RhdGUgc28gdGhlIGtub3QgaXMgZmlyc3QsIHRoZW4gZHVwbGljYXRlIGl0IGF0IHRoZSBlbmQuXG4gICAgICAgIGNvbnN0IG9yZGVyOiBLbm90TGlrZVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSBvcmRlci5wdXNoKHMua25vdHNbKHIua25vdCArIGkpICUgbl0pO1xuICAgICAgICByZXdyaXRlTGlua3MoYywgKG8pID0+IChvLnNwbGluZSA9PT0gci5zcGxpbmUgPyB7IHNwbGluZTogby5zcGxpbmUsIGtub3Q6IHdyYXAoby5rbm90IC0gci5rbm90LCBuKSB9IDogbykpO1xuICAgICAgICBzLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgICAgIHMua25vdHMucHVzaCguLi5vcmRlciwgY2xvbmVLbm90KG9yZGVyWzBdLCBmYWN0b3J5KSk7XG4gICAgICAgIHMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHJlZnJlc2hBbGwocyk7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0geyBzcGxpbmU6IHIuc3BsaW5lLCBrbm90OiAwIH07XG4gICAgICAgIGNvbnN0IGxhc3QgPSB7IHNwbGluZTogci5zcGxpbmUsIGtub3Q6IG4gfTtcbiAgICAgICAgbGlua0tub3RzKGMsIFtmaXJzdCwgbGFzdF0sIGZhY3RvcnkpO1xuICAgICAgICByZXR1cm4gbGFzdDtcbiAgICB9XG4gICAgaWYgKHIua25vdCA8PSAwIHx8IHIua25vdCA+PSBuIC0gMSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgdGFpbCA9IGZhY3Rvcnkuc3BsaW5lKCk7XG4gICAgdGFpbC5jbG9zZWQgPSBmYWxzZTtcbiAgICB0YWlsLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgdGFpbC5rbm90cy5wdXNoKGNsb25lS25vdChzLmtub3RzW3Iua25vdF0sIGZhY3RvcnkpLCAuLi5zLmtub3RzLnNsaWNlKHIua25vdCArIDEpKTtcbiAgICBjb25zdCBuZXdTcGxpbmUgPSBjLnNwbGluZXMubGVuZ3RoO1xuICAgIC8vIExpbmtzIG9uIGtub3RzIHRoYXQgbW92ZWQgdG8gdGhlIHRhaWwgZm9sbG93IHRoZW0uXG4gICAgcmV3cml0ZUxpbmtzKGMsIChvKSA9PiAoby5zcGxpbmUgPT09IHIuc3BsaW5lICYmIG8ua25vdCA+IHIua25vdCA/IHsgc3BsaW5lOiBuZXdTcGxpbmUsIGtub3Q6IG8ua25vdCAtIHIua25vdCB9IDogbykpO1xuICAgIHMua25vdHMubGVuZ3RoID0gci5rbm90ICsgMTtcbiAgICBjLnNwbGluZXMucHVzaCh0YWlsKTtcbiAgICByZWZyZXNoQWxsKHMpO1xuICAgIHJlZnJlc2hBbGwodGFpbCk7XG4gICAgY29uc3QgY29weVJlZiA9IHsgc3BsaW5lOiBuZXdTcGxpbmUsIGtub3Q6IDAgfTtcbiAgICBsaW5rS25vdHMoYywgW3IsIGNvcHlSZWZdLCBmYWN0b3J5KTtcbiAgICByZXR1cm4gY29weVJlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW5kS25vdChzOiBTcGxpbmVMaWtlLCBrbm90OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXMuY2xvc2VkICYmIHMua25vdHMubGVuZ3RoID4gMCAmJiAoa25vdCA9PT0gMCB8fCBrbm90ID09PSBzLmtub3RzLmxlbmd0aCAtIDEpO1xufVxuXG4vKipcbiAqIEpvaW5zIHR3byBlbmQga25vdHMgKFVuaXR5J3MgSm9pbiBLbm90cykuIEVuZHMgb2YgdGhlIHNhbWUgc3BsaW5lIGNsb3NlIGl0O1xuICogZW5kcyBvZiBkaWZmZXJlbnQgc3BsaW5lcyBtZXJnZSB0aGUgc2Vjb25kIHNwbGluZSBpbnRvIHRoZSBmaXJzdCwgdGhlXG4gKiBqb2luZWQga25vdCB0YWtpbmcgYGFgJ3MgcG9zaXRpb24uIFJldHVybnMgdGhlIGpvaW5lZCBrbm90LCBvciBudWxsIGlmIHRoZVxuICoga25vdHMgY2FuJ3QgYmUgam9pbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gam9pbktub3RzKGM6IENvbnRhaW5lckxpa2UsIGE6IEtub3RSZWYsIGI6IEtub3RSZWYsIGZhY3Rvcnk6IEZhY3RvcnkpOiBLbm90UmVmIHwgbnVsbCB7XG4gICAgY29uc3Qgc2EgPSBjLnNwbGluZXNbYS5zcGxpbmVdO1xuICAgIGNvbnN0IHNiID0gYy5zcGxpbmVzW2Iuc3BsaW5lXTtcbiAgICBpZiAoIXNhIHx8ICFzYiB8fCAhaXNFbmRLbm90KHNhLCBhLmtub3QpIHx8ICFpc0VuZEtub3Qoc2IsIGIua25vdCkpIHJldHVybiBudWxsO1xuICAgIGlmIChhLnNwbGluZSA9PT0gYi5zcGxpbmUpIHtcbiAgICAgICAgaWYgKGEua25vdCA9PT0gYi5rbm90IHx8IHNhLmtub3RzLmxlbmd0aCA8IDMpIHJldHVybiBudWxsO1xuICAgICAgICAvLyBEcm9wIHRoZSBkdXBsaWNhdGUgZW5kIGlmIGJvdGggZW5kcyBzaXQgb24gdGhlIHNhbWUgcG9pbnQuXG4gICAgICAgIGNvbnN0IGZpcnN0ID0gc2Eua25vdHNbMF07XG4gICAgICAgIGNvbnN0IGxhc3QgPSBzYS5rbm90c1tzYS5rbm90cy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGRpc3RTcShmaXJzdC5wb3NpdGlvbiwgbGFzdC5wb3NpdGlvbikgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICBjb3B5KGZpcnN0LnRhbmdlbnRJbiwgbGFzdC50YW5nZW50SW4pO1xuICAgICAgICAgICAgbGlua3NPbktub3RSZW1vdmVkKGMsIGEuc3BsaW5lLCBzYS5rbm90cy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHNhLmtub3RzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHNldENsb3NlZChzYSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB7IHNwbGluZTogYS5zcGxpbmUsIGtub3Q6IGEua25vdCA9PT0gMCA/IDAgOiBNYXRoLm1pbihhLmtub3QsIHNhLmtub3RzLmxlbmd0aCAtIDEpIH07XG4gICAgfVxuICAgIC8vIE9yaWVudCBib3RoIHNvIHRoYXQgYSBpcyB0aGUgbGFzdCBrbm90IG9mIEEgYW5kIGIgdGhlIGZpcnN0IGtub3Qgb2YgQi5cbiAgICBpZiAoYS5rbm90ID09PSAwKSB7XG4gICAgICAgIGNvbnRhaW5lclJldmVyc2UoYywgYS5zcGxpbmUpO1xuICAgICAgICBhID0geyBzcGxpbmU6IGEuc3BsaW5lLCBrbm90OiBzYS5rbm90cy5sZW5ndGggLSAxIH07XG4gICAgfVxuICAgIGlmIChiLmtub3QgIT09IDApIHtcbiAgICAgICAgY29udGFpbmVyUmV2ZXJzZShjLCBiLnNwbGluZSk7XG4gICAgICAgIGIgPSB7IHNwbGluZTogYi5zcGxpbmUsIGtub3Q6IDAgfTtcbiAgICB9XG4gICAgY29uc3Qga2EgPSBzYS5rbm90c1thLmtub3RdO1xuICAgIGNvbnN0IGtiID0gc2Iua25vdHNbMF07XG4gICAgLy8gVGhlIGpvaW5lZCBrbm90IGtlZXBzIEEncyBwb3NpdGlvbiBhbmQgaW4gdGFuZ2VudCwgYW5kIEIncyBvdXQgdGFuZ2VudC5cbiAgICBjb25zdCBvdXRXb3JsZCA9IHRhbmdlbnRPdXRWZWModjMoKSwga2IpO1xuICAgIGlmIChrYS5tb2RlID09PSBUYW5nZW50TW9kZS5MaW5lYXIgJiYga2IubW9kZSAhPT0gVGFuZ2VudE1vZGUuTGluZWFyKSBrYS5tb2RlID0gVGFuZ2VudE1vZGUuQnJva2VuO1xuICAgIGlmICh0YW5nZW50c0VkaXRhYmxlKGthLm1vZGUpKSB7XG4gICAgICAgIGthLm1vZGUgPSBUYW5nZW50TW9kZS5Ccm9rZW47XG4gICAgICAgIHFSb3RhdGUoa2EudGFuZ2VudE91dCwgcUludmVydChxNCgpLCBrYS5yb3RhdGlvbiksIG91dFdvcmxkKTtcbiAgICB9XG4gICAgY29uc3Qgb2Zmc2V0ID0gc2Eua25vdHMubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBiSW5kZXggPSBiLnNwbGluZTtcbiAgICAvLyBCJ3Mga25vdHMgKGFmdGVyIGl0cyBmaXJzdCkgbW92ZSB0byBBOyBsaW5rcyBmb2xsb3cuXG4gICAgcmV3cml0ZUxpbmtzKGMsIChvKSA9PiB7XG4gICAgICAgIGlmIChvLnNwbGluZSAhPT0gYkluZGV4KSByZXR1cm4gbztcbiAgICAgICAgaWYgKG8ua25vdCA9PT0gMCkgcmV0dXJuIHsgc3BsaW5lOiBhLnNwbGluZSwga25vdDogYS5rbm90IH07XG4gICAgICAgIHJldHVybiB7IHNwbGluZTogYS5zcGxpbmUsIGtub3Q6IG9mZnNldCArIG8ua25vdCB9O1xuICAgIH0pO1xuICAgIHNhLmtub3RzLnB1c2goLi4uc2Iua25vdHMuc2xpY2UoMSkpO1xuICAgIGMuc3BsaW5lcy5zcGxpY2UoYkluZGV4LCAxKTtcbiAgICByZXdyaXRlTGlua3MoYywgKG8pID0+IChvLnNwbGluZSA+IGJJbmRleCA/IHsgc3BsaW5lOiBvLnNwbGluZSAtIDEsIGtub3Q6IG8ua25vdCB9IDogbykpO1xuICAgIGNvbnN0IGFTcGxpbmUgPSBhLnNwbGluZSA+IGJJbmRleCA/IGEuc3BsaW5lIC0gMSA6IGEuc3BsaW5lO1xuICAgIHJlZnJlc2hBbGwoYy5zcGxpbmVzW2FTcGxpbmVdKTtcbiAgICByZXR1cm4geyBzcGxpbmU6IGFTcGxpbmUsIGtub3Q6IGEua25vdCB9O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNoYXBlc1xuXG5leHBvcnQgaW50ZXJmYWNlIFNoYXBlT3B0aW9ucyB7XG4gICAgLyoqIFNpemUgKHNxdWFyZSBzaWRlLCBjaXJjbGUgcmFkaXVzLi4uKS4gKi9cbiAgICBzaXplOiBudW1iZXI7XG4gICAgLyoqIFBvbHlnb24gLyBzdGFyIHBvaW50cy4gKi9cbiAgICBzaWRlcz86IG51bWJlcjtcbiAgICAvKiogSGVsaXggdHVybnMuICovXG4gICAgdHVybnM/OiBudW1iZXI7XG4gICAgLyoqIEhlbGl4IGhlaWdodC4gKi9cbiAgICBoZWlnaHQ/OiBudW1iZXI7XG4gICAgLyoqIE1ha2UgdGhlIHNoYXBlIGluIHRoZSBYWSBwbGFuZSAoMkQpIGluc3RlYWQgb2YgWFogKDNEKS4gKi9cbiAgICBwbGFuZTJEPzogYm9vbGVhbjtcbn1cblxuLyoqIEtub3QgcG9zaXRpb25zICsgbW9kZXMgZm9yIGEgdGVtcGxhdGUgc2hhcGUgKFVuaXR5J3MgU3BsaW5lID4gU3F1YXJlIC8gQ2lyY2xlIC8gLi4uKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGFwZUtub3RzKGtpbmQ6IHN0cmluZywgbzogU2hhcGVPcHRpb25zKTogeyBwb2ludHM6IFYzW107IG1vZGU6IG51bWJlcjsgY2xvc2VkOiBib29sZWFuOyB0YW5nZW50U2NhbGU/OiBudW1iZXIgfSB7XG4gICAgY29uc3QgciA9IG8uc2l6ZTtcbiAgICBjb25zdCBwdHM6IFYzW10gPSBbXTtcbiAgICBjb25zdCBmbGF0ID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCBoID0gMCk6IFYzID0+IChvLnBsYW5lMkQgPyB2Myh4LCB5LCBoKSA6IHYzKHgsIGgsIC15KSk7XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICAgIGNhc2UgJ3NxdWFyZSc6XG4gICAgICAgICAgICBwdHMucHVzaChmbGF0KC1yLCAtciksIGZsYXQoLXIsIHIpLCBmbGF0KHIsIHIpLCBmbGF0KHIsIC1yKSk7XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuTGluZWFyLCBjbG9zZWQ6IHRydWUgfTtcbiAgICAgICAgY2FzZSAncm91bmRlZC1zcXVhcmUnOiB7XG4gICAgICAgICAgICBjb25zdCBjID0gciAqIDAuNzU7XG4gICAgICAgICAgICBjb25zdCBlID0gcjtcbiAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoLWMsIC1lKSwgZmxhdCgtZSwgLWMpLCBmbGF0KC1lLCBjKSwgZmxhdCgtYywgZSksIGZsYXQoYywgZSksIGZsYXQoZSwgYyksIGZsYXQoZSwgLWMpLCBmbGF0KGMsIC1lKSk7XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuQXV0b1Ntb290aCwgY2xvc2VkOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnY2lyY2xlJzoge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKGkgLyA0KSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoTWF0aC5jb3MoYSkgKiByLCBNYXRoLnNpbihhKSAqIHIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIDQgTWlycm9yZWQga25vdHMgd2l0aCBoYW5kbGUgbGVuZ3RoIDAuNTUyMyByIG1ha2UgYSBuZWFyLXBlcmZlY3QgY2lyY2xlLlxuICAgICAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBwdHMsIG1vZGU6IFRhbmdlbnRNb2RlLk1pcnJvcmVkLCBjbG9zZWQ6IHRydWUsIHRhbmdlbnRTY2FsZTogMC41NTIzIH07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncG9seWdvbic6IHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBNYXRoLm1heCgzLCBNYXRoLnJvdW5kKG8uc2lkZXMgPz8gNikpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKGkgLyBuKSAqIE1hdGguUEkgKiAyICsgTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICAgICAgcHRzLnB1c2goZmxhdChNYXRoLmNvcyhhKSAqIHIsIE1hdGguc2luKGEpICogcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBwdHMsIG1vZGU6IFRhbmdlbnRNb2RlLkxpbmVhciwgY2xvc2VkOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnc3Rhcic6IHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBNYXRoLm1heCgzLCBNYXRoLnJvdW5kKG8uc2lkZXMgPz8gNSkpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuICogMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IChpIC8gKG4gKiAyKSkgKiBNYXRoLlBJICogMiArIE1hdGguUEkgLyAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJyID0gaSAlIDIgPT09IDAgPyByIDogciAqIDAuNDU7XG4gICAgICAgICAgICAgICAgcHRzLnB1c2goZmxhdChNYXRoLmNvcyhhKSAqIHJyLCBNYXRoLnNpbihhKSAqIHJyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuTGluZWFyLCBjbG9zZWQ6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdoZWxpeCc6IHtcbiAgICAgICAgICAgIGNvbnN0IHR1cm5zID0gTWF0aC5tYXgoMC4yNSwgby50dXJucyA/PyAzKTtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IG8uaGVpZ2h0ID8/IHIgKiAyO1xuICAgICAgICAgICAgY29uc3QgcGVyVHVybiA9IDg7XG4gICAgICAgICAgICBjb25zdCBuID0gTWF0aC5yb3VuZCh0dXJucyAqIHBlclR1cm4pO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IChpIC8gcGVyVHVybikgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICBwdHMucHVzaChmbGF0KE1hdGguY29zKGEpICogciwgTWF0aC5zaW4oYSkgKiByLCAoaSAvIG4pICogaGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuQXV0b1Ntb290aCwgY2xvc2VkOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcHRzLnB1c2goZmxhdCgtciwgMCksIGZsYXQociwgMCkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBwdHMsIG1vZGU6IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgsIGNsb3NlZDogZmFsc2UgfTtcbiAgICB9XG59XG5cbi8qKiBGaWxscyBhIHNwbGluZSB3aXRoIGEgc2hhcGUgZnJvbSBzaGFwZUtub3RzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU2hhcGUoczogU3BsaW5lTGlrZSwga2luZDogc3RyaW5nLCBvOiBTaGFwZU9wdGlvbnMsIGZhY3Rvcnk6IEZhY3RvcnkpOiB2b2lkIHtcbiAgICBjb25zdCBzaGFwZSA9IHNoYXBlS25vdHMoa2luZCwgbyk7XG4gICAgcy5rbm90cy5sZW5ndGggPSAwO1xuICAgIHMuY2xvc2VkID0gc2hhcGUuY2xvc2VkO1xuICAgIGNvbnN0IG5vcm1hbCA9IG8ucGxhbmUyRCA/IHYzKDAsIDAsIDEpIDogdjMoMCwgMSwgMCk7XG4gICAgY29uc3QgbiA9IHNoYXBlLnBvaW50cy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgY29uc3QgayA9IGZhY3Rvcnkua25vdCgpO1xuICAgICAgICBjb3B5KGsucG9zaXRpb24sIHNoYXBlLnBvaW50c1tpXSk7XG4gICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgMCk7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIDApO1xuICAgICAgICBxSWRlbnRpdHkoay5yb3RhdGlvbik7XG4gICAgICAgIGsubW9kZSA9IHNoYXBlLm1vZGU7XG4gICAgICAgIGsudGVuc2lvbiA9IERFRkFVTFRfVEVOU0lPTjtcbiAgICAgICAgcy5rbm90cy5wdXNoKGspO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICBjb25zdCBrID0gcy5rbm90c1tpXTtcbiAgICAgICAgY29uc3QgcHJldiA9IHMua25vdHNbcHJldkluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgICAgIGNvbnN0IG5leHQgPSBzLmtub3RzW25leHRJbmRleChpLCBuLCBzLmNsb3NlZCldLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCBkaXIgPSBzdWIodjMoKSwgbmV4dCwgcHJldik7XG4gICAgICAgIGlmIChsZW5TcShkaXIpIDwgRVBTSUxPTikgc3ViKGRpciwgbmV4dCwgay5wb3NpdGlvbik7XG4gICAgICAgIGtub3RSb3RhdGlvbihrLnJvdGF0aW9uLCBkaXIsIG5vcm1hbCk7XG4gICAgICAgIGlmIChzaGFwZS50YW5nZW50U2NhbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGwgPSBzaGFwZS50YW5nZW50U2NhbGUgKiBvLnNpemU7XG4gICAgICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1sKTtcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlZnJlc2hBbGwocyk7XG59XG5cbmV4cG9ydCB7IFVQIGFzIEtOT1RfVVAsIEZPUldBUkQgYXMgS05PVF9GT1JXQVJEIH07XG4iLCAiaW1wb3J0IHsgX2RlY29yYXRvciwgY2NlbnVtLCBRdWF0LCBWZWMzIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgREVGQVVMVF9URU5TSU9OLCBLbm90TGlrZSwgVGFuZ2VudE1vZGUgfSBmcm9tICcuLi9jb3JlL3NwbGluZS1jb3JlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuY2NlbnVtKFRhbmdlbnRNb2RlKTtcblxuLyoqXG4gKiBBIGNvbnRyb2wgcG9pbnQgb2YgYSBzcGxpbmU6IGEgcG9zaXRpb24sIGEgcm90YXRpb24gYW5kIHR3byB0YW5nZW50cy5cbiAqXG4gKiBUYW5nZW50cyBhcmUgaW4gdGhlIGtub3QncyBvd24gc3BhY2U6ICtaIGlzIHRoZSBkaXJlY3Rpb24gdGhlIHNwbGluZVxuICogdHJhdmVscyB0aHJvdWdoIHRoZSBrbm90IGFuZCArWSBpcyB0aGUga25vdCdzIHVwIHZlY3Rvci4gSG93IHRoZSB0YW5nZW50c1xuICogYXJlIGtlcHQgZGVwZW5kcyBvbiBgbW9kZWAgKHNlZSBUYW5nZW50TW9kZSkuXG4gKi9cbkBjY2NsYXNzKCdzcGxpbmVzLkJlemllcktub3QnKVxuZXhwb3J0IGNsYXNzIEJlemllcktub3QgaW1wbGVtZW50cyBLbm90TGlrZSB7XG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1Bvc2l0aW9uIGluIHRoZSBzcGxpbmUgY29udGFpbmVyXHUyMDE5cyBsb2NhbCBzcGFjZS4nIH0pXG4gICAgcG9zaXRpb24gPSBuZXcgVmVjMygpO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ0luIHRhbmdlbnQsIGluIHRoZSBrbm90XHUyMDE5cyBzcGFjZSAocG9pbnRzIGJhY2t3YXJkcyBhbG9uZyAtWikuJyB9KVxuICAgIHRhbmdlbnRJbiA9IG5ldyBWZWMzKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnT3V0IHRhbmdlbnQsIGluIHRoZSBrbm90XHUyMDE5cyBzcGFjZSAocG9pbnRzIGZvcndhcmRzIGFsb25nICtaKS4nIH0pXG4gICAgdGFuZ2VudE91dCA9IG5ldyBWZWMzKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnS25vdCByb3RhdGlvbjogK1ogaXMgdGhlIGRpcmVjdGlvbiBvZiB0cmF2ZWwsICtZIHRoZSB1cCB2ZWN0b3IuJyB9KVxuICAgIHJvdGF0aW9uID0gbmV3IFF1YXQoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFRhbmdlbnRNb2RlLCB0b29sdGlwOiAnSG93IHRoZSB0YW5nZW50cyBhcmUga2VwdC4nIH0pXG4gICAgbW9kZTogVGFuZ2VudE1vZGUgPSBUYW5nZW50TW9kZS5BdXRvU21vb3RoO1xuXG4gICAgQHByb3BlcnR5KHsgcmFuZ2U6IFswLCAxLCAwLjAxXSwgc2xpZGU6IHRydWUsIHRvb2x0aXA6ICdBdXRvIFNtb290aCB0ZW5zaW9uICgwIHVuaWZvcm0sIDAuNSBjZW50cmlwZXRhbCwgMSBjaG9yZGFsKS4nIH0pXG4gICAgdGVuc2lvbiA9IERFRkFVTFRfVEVOU0lPTjtcblxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uPzogUmVhZG9ubHk8VmVjMz4sIHRhbmdlbnRJbj86IFJlYWRvbmx5PFZlYzM+LCB0YW5nZW50T3V0PzogUmVhZG9ubHk8VmVjMz4sIHJvdGF0aW9uPzogUmVhZG9ubHk8UXVhdD4sIG1vZGU/OiBUYW5nZW50TW9kZSkge1xuICAgICAgICBpZiAocG9zaXRpb24pIHRoaXMucG9zaXRpb24uc2V0KHBvc2l0aW9uKTtcbiAgICAgICAgaWYgKHRhbmdlbnRJbikgdGhpcy50YW5nZW50SW4uc2V0KHRhbmdlbnRJbik7XG4gICAgICAgIGlmICh0YW5nZW50T3V0KSB0aGlzLnRhbmdlbnRPdXQuc2V0KHRhbmdlbnRPdXQpO1xuICAgICAgICBpZiAocm90YXRpb24pIHRoaXMucm90YXRpb24uc2V0KHJvdGF0aW9uKTtcbiAgICAgICAgaWYgKG1vZGUgIT09IHVuZGVmaW5lZCkgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB9XG5cbiAgICBjbG9uZSgpOiBCZXppZXJLbm90IHtcbiAgICAgICAgY29uc3QgayA9IG5ldyBCZXppZXJLbm90KHRoaXMucG9zaXRpb24sIHRoaXMudGFuZ2VudEluLCB0aGlzLnRhbmdlbnRPdXQsIHRoaXMucm90YXRpb24sIHRoaXMubW9kZSk7XG4gICAgICAgIGsudGVuc2lvbiA9IHRoaXMudGVuc2lvbjtcbiAgICAgICAgcmV0dXJuIGs7XG4gICAgfVxufVxuXG5leHBvcnQgeyBUYW5nZW50TW9kZSB9O1xuIiwgImltcG9ydCB7IF9kZWNvcmF0b3IsIENDSW50ZWdlciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IExpbmtMaWtlIH0gZnJvbSAnLi4vY29yZS9zcGxpbmUtY29yZSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbi8qKlxuICogQSBncm91cCBvZiBsaW5rZWQga25vdHM6IGtub3RzIHRoYXQgYWx3YXlzIHNoYXJlIG9uZSBwb3NpdGlvbiwgcG9zc2libHlcbiAqIG9uIGRpZmZlcmVudCBzcGxpbmVzIG9mIHRoZSBzYW1lIGNvbnRhaW5lci4gU3RvcmVkIGFzIGZsYXR0ZW5lZFxuICogKHNwbGluZUluZGV4LCBrbm90SW5kZXgpIHBhaXJzLlxuICovXG5AY2NjbGFzcygnc3BsaW5lcy5Lbm90TGluaycpXG5leHBvcnQgY2xhc3MgS25vdExpbmsgaW1wbGVtZW50cyBMaW5rTGlrZSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogW0NDSW50ZWdlcl0gfSlcbiAgICBrbm90czogbnVtYmVyW10gPSBbXTtcbn1cbiIsICJpbXBvcnQgeyBfZGVjb3JhdG9yLCBkaXJlY3RvciwgVmVjMyB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEJlemllcktub3QgfSBmcm9tICcuL0Jlemllcktub3QnO1xuaW1wb3J0IHtcbiAgICBTcGxpbmVDYWNoZSwgU3BsaW5lTGlrZSwgVGFuZ2VudE1vZGUsIERFRkFVTFRfVEVOU0lPTiwgRmFjdG9yeSxcbiAgICBlbnN1cmVDYWNoZSwgY3VydmVDb3VudCwgZ2V0Q3VydmUsIGV2YWx1YXRlUG9zaXRpb24sIGV2YWx1YXRlRGlyZWN0aW9uLCBldmFsdWF0ZVVwLCBjdXJ2ZVBvaW50QXQsXG4gICAgbmVhcmVzdFBvaW50LCB0QXREaXN0YW5jZUZyb20sIGtub3RVbml0VG9ULCB0VG9Lbm90VW5pdCwgbm9ybWFsaXplZFRPZixcbiAgICBpbnNlcnRLbm90LCByZW1vdmVLbm90LCBpbnNlcnRPbkN1cnZlLCByZXZlcnNlRmxvdywgc2V0Q2xvc2VkLCBzZXRUYW5nZW50TW9kZSwgc2V0VGVuc2lvbixcbiAgICBzZXRLbm90UG9zaXRpb24sIHJlZnJlc2hBbGwsIHJlZnJlc2hBcm91bmQsIGFwcGx5VGFuZ2VudE1vZGUsXG59IGZyb20gJy4uL2NvcmUvc3BsaW5lLWNvcmUnO1xuaW1wb3J0IHsgQ3VydmUsIGN1cnZlLCBldmFsRGVyaXZhdGl2ZSB9IGZyb20gJy4uL2NvcmUvY3VydmUnO1xuaW1wb3J0IHsgS25vdExpbmsgfSBmcm9tICcuL0tub3RMaW5rJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuLyoqIENyZWF0ZXMgZW5naW5lIG9iamVjdHMgZm9yIHRoZSBjb3JlJ3MgZWRpdCBvcGVyYXRpb25zLiAqL1xuZXhwb3J0IGNvbnN0IHNwbGluZUZhY3Rvcnk6IEZhY3RvcnkgPSB7XG4gICAga25vdDogKCkgPT4gbmV3IEJlemllcktub3QoKSxcbiAgICBzcGxpbmU6ICgpID0+IG5ldyBTcGxpbmUoKSxcbiAgICBsaW5rOiAoKSA9PiBuZXcgS25vdExpbmsoKSxcbn07XG5cbi8qKiBXaGVyZSBhIGRpc3RhbmNlIGFsb25nIHRoZSBzcGxpbmUgaXMgbWVhc3VyZWQgZnJvbSAoVW5pdHkncyBQYXRoSW5kZXhVbml0KS4gKi9cbmV4cG9ydCBlbnVtIFBhdGhJbmRleFVuaXQge1xuICAgIC8qKiAwLi4xIG92ZXIgdGhlIHNwbGluZSdzIGxlbmd0aC4gKi9cbiAgICBOb3JtYWxpemVkID0gMCxcbiAgICAvKiogRGlzdGFuY2UgaW4gdGhlIHNwbGluZSdzIGxvY2FsIHVuaXRzLiAqL1xuICAgIERpc3RhbmNlID0gMSxcbiAgICAvKiogS25vdCBpbmRleDogMi41IGlzIGhhbGZ3YXkgYmV0d2VlbiBrbm90cyAyIGFuZCAzLiAqL1xuICAgIEtub3QgPSAyLFxufVxuXG4vKipcbiAqIEEgQmV6aWVyIHNwbGluZTogYSBsaXN0IG9mIGtub3RzLCBvcGVuIG9yIGNsb3NlZC5cbiAqXG4gKiBQb3NpdGlvbnMgYXJlIGluIHRoZSBsb2NhbCBzcGFjZSBvZiB0aGUgU3BsaW5lQ29udGFpbmVyIHRoYXQgb3ducyB0aGVcbiAqIHNwbGluZS4gYHRgIGFyZ3VtZW50cyBhcmUgbm9ybWFsaXplZCBkaXN0YW5jZXM6IDAgaXMgdGhlIGZpcnN0IGtub3QgYW5kIDFcbiAqIHRoZSBlbmQsIGFuZCB0ID0gMC41IGlzIGhhbGZ3YXkgYWxvbmcgdGhlIHNwbGluZSdzIGxlbmd0aC5cbiAqXG4gKiBVc2UgdGhlIG1ldGhvZHMgdG8gZWRpdCBrbm90cyBzbyB0aGUgc3BsaW5lIHVwZGF0ZXMgaXRzIHRhbmdlbnRzIGFuZFxuICogY2FjaGVkIGxlbmd0aHMuIEFmdGVyIGNoYW5naW5nIGtub3QgZmllbGRzIGRpcmVjdGx5LCBjYWxsIG1hcmtEaXJ0eSgpLlxuICovXG5AY2NjbGFzcygnc3BsaW5lcy5TcGxpbmUnKVxuZXhwb3J0IGNsYXNzIFNwbGluZSBpbXBsZW1lbnRzIFNwbGluZUxpa2Uge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtCZXppZXJLbm90XSwgdG9vbHRpcDogJ1RoZSBrbm90cyBvZiB0aGUgc3BsaW5lLicgfSlcbiAgICBrbm90czogQmV6aWVyS25vdFtdID0gW107XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnQ29ubmVjdHMgdGhlIGxhc3Qga25vdCBiYWNrIHRvIHRoZSBmaXJzdC4nIH0pXG4gICAgY2xvc2VkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9jYWNoZSA9IG5ldyBTcGxpbmVDYWNoZSgpO1xuICAgIHByaXZhdGUgX2NoZWNrZWRGcmFtZSA9IC0xO1xuICAgIHByaXZhdGUgX3ZlcnNpb24gPSAwO1xuXG4gICAgLyoqIEJ1bXBlZCBieSBldmVyeSBlZGl0IG1hZGUgdGhyb3VnaCB0aGUgU3BsaW5lIEFQSSAoYW5kIG1hcmtEaXJ0eSkuICovXG4gICAgZ2V0IHZlcnNpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnNpb247XG4gICAgfVxuXG4gICAgZ2V0IGNvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmtub3RzLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKiogTnVtYmVyIG9mIGN1cnZlcyAoc2VnbWVudHMgYmV0d2VlbiBrbm90cykuICovXG4gICAgZ2V0IGN1cnZlQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGN1cnZlQ291bnQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqIExlbmd0aHMgYW5kIGxvb2t1cCB0YWJsZXMsIHJlYnVpbHQgd2hlbiB0aGUga25vdHMgY2hhbmdlIChjaGVja2VkIG9uY2UgcGVyIGZyYW1lKS4gKi9cbiAgICBnZXQgY2FjaGUoKTogU3BsaW5lQ2FjaGUge1xuICAgICAgICBjb25zdCBmcmFtZSA9IGRpcmVjdG9yLmdldFRvdGFsRnJhbWVzKCk7XG4gICAgICAgIGlmIChmcmFtZSAhPT0gdGhpcy5fY2hlY2tlZEZyYW1lIHx8IHRoaXMuX2NoZWNrZWRGcmFtZSA8IDApIHtcbiAgICAgICAgICAgIGVuc3VyZUNhY2hlKHRoaXMsIHRoaXMuX2NhY2hlKTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrZWRGcmFtZSA9IGZyYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZTtcbiAgICB9XG5cbiAgICAvKiogQ2FsbCBhZnRlciBjaGFuZ2luZyBrbm90cyBkaXJlY3RseSAobm90IHRocm91Z2ggdGhlIFNwbGluZSBtZXRob2RzKS4gKi9cbiAgICBtYXJrRGlydHkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NoZWNrZWRGcmFtZSA9IC0xO1xuICAgICAgICB0aGlzLl92ZXJzaW9uKys7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGtub3RzXG5cbiAgICBnZXRLbm90KGluZGV4OiBudW1iZXIpOiBCZXppZXJLbm90IHtcbiAgICAgICAgcmV0dXJuIHRoaXMua25vdHNbaW5kZXhdO1xuICAgIH1cblxuICAgIC8qKiBSZXBsYWNlcyBhIGtub3QgKGNvcGllZCkgYW5kIHVwZGF0ZXMgdGhlIHRhbmdlbnRzIHRoYXQgZGVwZW5kIG9uIGl0LiAqL1xuICAgIHNldEtub3QoaW5kZXg6IG51bWJlciwga25vdDogQmV6aWVyS25vdCk6IHZvaWQge1xuICAgICAgICBjb25zdCBrID0gdGhpcy5rbm90c1tpbmRleF07XG4gICAgICAgIGsucG9zaXRpb24uc2V0KGtub3QucG9zaXRpb24pO1xuICAgICAgICBrLnRhbmdlbnRJbi5zZXQoa25vdC50YW5nZW50SW4pO1xuICAgICAgICBrLnRhbmdlbnRPdXQuc2V0KGtub3QudGFuZ2VudE91dCk7XG4gICAgICAgIGsucm90YXRpb24uc2V0KGtub3Qucm90YXRpb24pO1xuICAgICAgICBrLm1vZGUgPSBrbm90Lm1vZGU7XG4gICAgICAgIGsudGVuc2lvbiA9IGtub3QudGVuc2lvbjtcbiAgICAgICAgcmVmcmVzaEFyb3VuZCh0aGlzLCBpbmRleCk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgLyoqIEFkZHMgYSBrbm90IGF0IHRoZSBlbmQuIFdpdGggYSBwb3NpdGlvbiwgY3JlYXRlcyBhIGtub3Qgd2l0aCB0aGUgZ2l2ZW4gbW9kZS4gKi9cbiAgICBhZGQoa25vdE9yUG9zaXRpb246IEJlemllcktub3QgfCBSZWFkb25seTxWZWMzPiwgbW9kZTogVGFuZ2VudE1vZGUgPSBUYW5nZW50TW9kZS5BdXRvU21vb3RoKTogQmV6aWVyS25vdCB7XG4gICAgICAgIHJldHVybiB0aGlzLmluc2VydCh0aGlzLmtub3RzLmxlbmd0aCwga25vdE9yUG9zaXRpb24sIG1vZGUpO1xuICAgIH1cblxuICAgIGluc2VydChpbmRleDogbnVtYmVyLCBrbm90T3JQb3NpdGlvbjogQmV6aWVyS25vdCB8IFJlYWRvbmx5PFZlYzM+LCBtb2RlOiBUYW5nZW50TW9kZSA9IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpOiBCZXppZXJLbm90IHtcbiAgICAgICAgbGV0IGs6IEJlemllcktub3Q7XG4gICAgICAgIGlmIChrbm90T3JQb3NpdGlvbiBpbnN0YW5jZW9mIEJlemllcktub3QpIHtcbiAgICAgICAgICAgIGsgPSBrbm90T3JQb3NpdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGsgPSBuZXcgQmV6aWVyS25vdChrbm90T3JQb3NpdGlvbiBhcyBWZWMzKTtcbiAgICAgICAgICAgIGsubW9kZSA9IG1vZGU7XG4gICAgICAgICAgICBrLnRlbnNpb24gPSBERUZBVUxUX1RFTlNJT047XG4gICAgICAgIH1cbiAgICAgICAgaW5zZXJ0S25vdCh0aGlzLCBpbmRleCwgayk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgICAgIHJldHVybiBrO1xuICAgIH1cblxuICAgIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgcmVtb3ZlS25vdCh0aGlzLCBpbmRleCk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMua25vdHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICBzZXRLbm90UG9zaXRpb24oaW5kZXg6IG51bWJlciwgcG9zaXRpb246IFJlYWRvbmx5PFZlYzM+KTogdm9pZCB7XG4gICAgICAgIHNldEtub3RQb3NpdGlvbih0aGlzLCBpbmRleCwgcG9zaXRpb24pO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIGdldFRhbmdlbnRNb2RlKGluZGV4OiBudW1iZXIpOiBUYW5nZW50TW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtub3RzW2luZGV4XS5tb2RlO1xuICAgIH1cblxuICAgIHNldFRhbmdlbnRNb2RlKGluZGV4OiBudW1iZXIsIG1vZGU6IFRhbmdlbnRNb2RlKTogdm9pZCB7XG4gICAgICAgIHNldFRhbmdlbnRNb2RlKHRoaXMsIGluZGV4LCBtb2RlKTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICAvKiogU2V0cyB0aGUgbW9kZSBvZiBldmVyeSBrbm90LiAqL1xuICAgIHNldFRhbmdlbnRNb2RlQWxsKG1vZGU6IFRhbmdlbnRNb2RlKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5rbm90cy5sZW5ndGg7IGkrKykgc2V0VGFuZ2VudE1vZGUodGhpcywgaSwgbW9kZSk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgc2V0QXV0b1Ntb290aFRlbnNpb24oaW5kZXg6IG51bWJlciwgdGVuc2lvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHNldFRlbnNpb24odGhpcywgaW5kZXgsIHRlbnNpb24pO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIC8qKiBJbnNlcnRzIGEga25vdCBvbiBhIGN1cnZlIHdpdGhvdXQgY2hhbmdpbmcgdGhlIHNoYXBlLiBSZXR1cm5zIGl0cyBpbmRleC4gKi9cbiAgICBpbnNlcnRPbkN1cnZlKGN1cnZlSW5kZXg6IG51bWJlciwgY3VydmVUOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpID0gaW5zZXJ0T25DdXJ2ZSh0aGlzLCBjdXJ2ZUluZGV4LCBjdXJ2ZVQsIHNwbGluZUZhY3RvcnkpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG5cbiAgICBzZXRDbG9zZWQoY2xvc2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHNldENsb3NlZCh0aGlzLCBjbG9zZWQpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIC8qKiBSZXZlcnNlcyB0aGUgZGlyZWN0aW9uIG9mIHRyYXZlbCAodGhlIHNoYXBlIGlzIHVuY2hhbmdlZCkuICovXG4gICAgcmV2ZXJzZSgpOiB2b2lkIHtcbiAgICAgICAgcmV2ZXJzZUZsb3codGhpcyk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgLyoqIFJlLWFwcGxpZXMgZXZlcnkga25vdCdzIHRhbmdlbnQgbW9kZS4gKi9cbiAgICByZWZyZXNoKCk6IHZvaWQge1xuICAgICAgICByZWZyZXNoQWxsKHRoaXMpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIC8qKiBSZS1hcHBsaWVzIHRoZSB0YW5nZW50IG1vZGUgb2Ygb25lIGtub3QuICovXG4gICAgcmVmcmVzaEtub3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBhcHBseVRhbmdlbnRNb2RlKHRoaXMsIGluZGV4KTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcXVlcmllc1xuXG4gICAgLyoqIFRvdGFsIGxlbmd0aCBpbiBsb2NhbCB1bml0cy4gKi9cbiAgICBnZXRMZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUudG90YWw7XG4gICAgfVxuXG4gICAgZ2V0Q3VydmVMZW5ndGgoY3VydmVJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUubGVuZ3Roc1tjdXJ2ZUluZGV4XSA/PyAwO1xuICAgIH1cblxuICAgIC8qKiBDb250cm9sIHBvaW50cyBvZiBhIGN1cnZlIChsb2NhbCBzcGFjZSkuICovXG4gICAgZ2V0Q3VydmUoY3VydmVJbmRleDogbnVtYmVyLCBvdXQ6IEN1cnZlID0gY3VydmUoKSk6IEN1cnZlIHtcbiAgICAgICAgcmV0dXJuIGdldEN1cnZlKHRoaXMsIGN1cnZlSW5kZXgsIG91dCk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGVQb3NpdGlvbih0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRlUG9zaXRpb24odGhpcywgdGhpcy5jYWNoZSwgdCwgb3V0KTtcbiAgICB9XG5cbiAgICAvKiogRGVyaXZhdGl2ZSBhdCB0IChkaXJlY3Rpb24gdGltZXMgc3BlZWQsIGxpa2UgVW5pdHkncyBFdmFsdWF0ZVRhbmdlbnQpLiAqL1xuICAgIGV2YWx1YXRlVGFuZ2VudCh0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgICAgICBpZiAoIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHJldHVybiBldmFsdWF0ZURpcmVjdGlvbih0aGlzLCBjYWNoZSwgdCwgb3V0KTtcbiAgICAgICAgY29uc3QgcCA9IGN1cnZlUG9pbnRBdChjYWNoZSwgdCk7XG4gICAgICAgIGV2YWxEZXJpdmF0aXZlKG91dCwgY2FjaGUuY3VydmVzW3AuaW5kZXhdLCBwLnQpO1xuICAgICAgICBpZiAob3V0Lmxlbmd0aFNxcigpIDwgMWUtMTIpIGV2YWx1YXRlRGlyZWN0aW9uKHRoaXMsIGNhY2hlLCB0LCBvdXQpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKiBVbml0IGRpcmVjdGlvbiBvZiB0cmF2ZWwgYXQgdC4gKi9cbiAgICBldmFsdWF0ZURpcmVjdGlvbih0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRlRGlyZWN0aW9uKHRoaXMsIHRoaXMuY2FjaGUsIHQsIG91dCk7XG4gICAgfVxuXG4gICAgLyoqIFVuaXQgdXAgdmVjdG9yIGF0IHQsIGludGVycG9sYXRlZCBiZXR3ZWVuIHRoZSBrbm90cycgdXAgdmVjdG9ycyB3aXRob3V0IHR3aXN0aW5nLiAqL1xuICAgIGV2YWx1YXRlVXBWZWN0b3IodDogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBldmFsdWF0ZVVwKHRoaXMsIHRoaXMuY2FjaGUsIHQsIG91dCk7XG4gICAgfVxuXG4gICAgLyoqIENsb3Nlc3QgcG9pbnQgdG8gYHBvaW50YCAobG9jYWwgc3BhY2UpLiBSZXR1cm5zIGl0cyB0IGFuZCBwb3NpdGlvbi4gKi9cbiAgICBnZXROZWFyZXN0UG9pbnQocG9pbnQ6IFJlYWRvbmx5PFZlYzM+LCBvdXRQb3NpdGlvbiA9IG5ldyBWZWMzKCkpOiB7IHQ6IG51bWJlcjsgcG9zaXRpb246IFZlYzM7IGRpc3RhbmNlOiBudW1iZXIgfSB7XG4gICAgICAgIGNvbnN0IHIgPSBuZWFyZXN0UG9pbnQodGhpcywgdGhpcy5jYWNoZSwgcG9pbnQpO1xuICAgICAgICBvdXRQb3NpdGlvbi5zZXQoci5wb3NpdGlvbi54LCByLnBvc2l0aW9uLnksIHIucG9zaXRpb24ueik7XG4gICAgICAgIHJldHVybiB7IHQ6IHIudCwgcG9zaXRpb246IG91dFBvc2l0aW9uLCBkaXN0YW5jZTogci5kaXN0YW5jZSB9O1xuICAgIH1cblxuICAgIC8qKiBUaGUgdCByZWFjaGVkIGFmdGVyIG1vdmluZyBgZGlzdGFuY2VgIChsb2NhbCB1bml0cywgbWF5IGJlIG5lZ2F0aXZlKSBmcm9tIGBmcm9tVGAuICovXG4gICAgZ2V0VEF0RGlzdGFuY2UoZnJvbVQ6IG51bWJlciwgZGlzdGFuY2U6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0QXREaXN0YW5jZUZyb20odGhpcywgdGhpcy5jYWNoZSwgZnJvbVQsIGRpc3RhbmNlKTtcbiAgICB9XG5cbiAgICAvKiogQ29udmVydHMgYSBwb3NpdGlvbiBhbG9uZyB0aGUgc3BsaW5lIGJldHdlZW4gdW5pdHMgKFVuaXR5J3MgQ29udmVydEluZGV4VW5pdCkuICovXG4gICAgY29udmVydEluZGV4VW5pdCh2YWx1ZTogbnVtYmVyLCBmcm9tOiBQYXRoSW5kZXhVbml0LCB0bzogUGF0aEluZGV4VW5pdCk6IG51bWJlciB7XG4gICAgICAgIGlmIChmcm9tID09PSB0bykgcmV0dXJuIHZhbHVlO1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgICAgIGxldCB0OiBudW1iZXI7XG4gICAgICAgIGlmIChmcm9tID09PSBQYXRoSW5kZXhVbml0Lk5vcm1hbGl6ZWQpIHQgPSB2YWx1ZTtcbiAgICAgICAgZWxzZSBpZiAoZnJvbSA9PT0gUGF0aEluZGV4VW5pdC5EaXN0YW5jZSkgdCA9IGNhY2hlLnRvdGFsID4gMCA/IHZhbHVlIC8gY2FjaGUudG90YWwgOiAwO1xuICAgICAgICBlbHNlIHQgPSBrbm90VW5pdFRvVChjYWNoZSwgdmFsdWUpO1xuICAgICAgICBpZiAodG8gPT09IFBhdGhJbmRleFVuaXQuTm9ybWFsaXplZCkgcmV0dXJuIHQ7XG4gICAgICAgIGlmICh0byA9PT0gUGF0aEluZGV4VW5pdC5EaXN0YW5jZSkgcmV0dXJuIHQgKiBjYWNoZS50b3RhbDtcbiAgICAgICAgcmV0dXJuIHRUb0tub3RVbml0KGNhY2hlLCB0KTtcbiAgICB9XG5cbiAgICAvKiogTm9ybWFsaXplZCB0IG9mIGEga25vdC4gKi9cbiAgICBrbm90VChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgICAgICBpZiAoIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHJldHVybiAwO1xuICAgICAgICBpZiAoaW5kZXggPj0gY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVkVE9mKGNhY2hlLCBpbmRleCwgMCk7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgTWF0NCwgVmVjMywgUXVhdCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUiB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcGxpbmUsIHNwbGluZUZhY3RvcnksIFBhdGhJbmRleFVuaXQgfSBmcm9tICcuL1NwbGluZSc7XG5pbXBvcnQgeyBLbm90TGluayB9IGZyb20gJy4vS25vdExpbmsnO1xuaW1wb3J0IHsgQmV6aWVyS25vdCwgVGFuZ2VudE1vZGUgfSBmcm9tICcuL0Jlemllcktub3QnO1xuaW1wb3J0IHtcbiAgICBDb250YWluZXJMaWtlLCBLbm90UmVmLCBsaW5rS25vdHMsIHVubGlua0tub3RzLCBsaW5rZWRLbm90cywgc3luY0xpbmtlZCwgaXNMaW5rZWQsXG4gICAgY29udGFpbmVyUmVtb3ZlU3BsaW5lLCBjb250YWluZXJJbnNlcnRLbm90LCBjb250YWluZXJSZW1vdmVLbm90cywgY29udGFpbmVyUmV2ZXJzZSxcbiAgICBzcGxpdEtub3QsIGpvaW5Lbm90cywgbmVhcmVzdFBvaW50LCBmaW5nZXJwcmludCwgcmVmcmVzaEFsbCxcbn0gZnJvbSAnLi4vY29yZS9zcGxpbmUtY29yZSc7XG5pbXBvcnQgeyBhcmNMZW5ndGgsIGN1cnZlLCBDdXJ2ZSB9IGZyb20gJy4uL2NvcmUvY3VydmUnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSwgbWVudSwgZGlzYWxsb3dNdWx0aXBsZSB9ID0gX2RlY29yYXRvcjtcblxuY29uc3QgX20gPSBuZXcgTWF0NCgpO1xuY29uc3QgX3YgPSBuZXcgVmVjMygpO1xuY29uc3QgX2M6IEN1cnZlID0gY3VydmUoKTtcblxuZXhwb3J0IGludGVyZmFjZSBTcGxpbmVTYW1wbGUge1xuICAgIHBvc2l0aW9uOiBWZWMzO1xuICAgIC8qKiBVbml0IGRpcmVjdGlvbiBvZiB0cmF2ZWwuICovXG4gICAgdGFuZ2VudDogVmVjMztcbiAgICAvKiogVW5pdCB1cCB2ZWN0b3IuICovXG4gICAgdXA6IFZlYzM7XG59XG5cbi8qKlxuICogSG9sZHMgb25lIG9yIG1vcmUgc3BsaW5lcyBpbiB0aGUgbm9kZSdzIGxvY2FsIHNwYWNlIChVbml0eSdzIFNwbGluZUNvbnRhaW5lcikuXG4gKlxuICogRXZhbHVhdGUgbWV0aG9kcyB3b3JrIGluIHdvcmxkIHNwYWNlOyB0aGUgU3BsaW5lIG9iamVjdHMgdGhlbXNlbHZlcyB3b3JrXG4gKiBpbiBsb2NhbCBzcGFjZS4gYHRgIGlzIGEgbm9ybWFsaXplZCBkaXN0YW5jZTogMCA9IHN0YXJ0LCAxID0gZW5kLlxuICpcbiAqIEVtaXRzIFNwbGluZUNvbnRhaW5lci5FdmVudFR5cGUuQ0hBTkdFRCBvbiBpdHMgbm9kZSB3aGVuIGEgc3BsaW5lIGNoYW5nZXNcbiAqIChpbiB0aGUgZWRpdG9yIGFsd2F5czsgYXQgcnVudGltZSB3aGVuIHNvbWVvbmUgbGlzdGVucykuXG4gKi9cbkBjY2NsYXNzKCdTcGxpbmVDb250YWluZXInKVxuQGV4ZWN1dGVJbkVkaXRNb2RlXG5AZGlzYWxsb3dNdWx0aXBsZVxuQG1lbnUoJ1NwbGluZXMvU3BsaW5lQ29udGFpbmVyJylcbmV4cG9ydCBjbGFzcyBTcGxpbmVDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQgaW1wbGVtZW50cyBDb250YWluZXJMaWtlIHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRXZlbnRUeXBlID0ge1xuICAgICAgICAvKiogKGNvbnRhaW5lcjogU3BsaW5lQ29udGFpbmVyKSAqL1xuICAgICAgICBDSEFOR0VEOiAnc3BsaW5lLWNoYW5nZWQnLFxuICAgIH07XG5cbiAgICAvKiogRW5hYmxlZCBjb250YWluZXJzICh1c2VkIGJ5IHRoZSBlZGl0b3IgdG9vbHMpLiAqL1xuICAgIHN0YXRpYyByZWFkb25seSBhbGwgPSBuZXcgU2V0PFNwbGluZUNvbnRhaW5lcj4oKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtTcGxpbmVdLCB0b29sdGlwOiAnVGhlIHNwbGluZXMgaW4gdGhpcyBjb250YWluZXIuJyB9KVxuICAgIHNwbGluZXM6IFNwbGluZVtdID0gW25ldyBTcGxpbmUoKV07XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbS25vdExpbmtdLCB2aXNpYmxlOiBmYWxzZSB9KVxuICAgIGxpbmtzOiBLbm90TGlua1tdID0gW107XG5cbiAgICBwcml2YXRlIF9zdGFtcCA9IE5hTjtcblxuICAgIC8qKiBUaGUgZmlyc3Qgc3BsaW5lIChjcmVhdGVkIGlmIHRoZXJlIGlzIG5vbmUpLiAqL1xuICAgIGdldCBzcGxpbmUoKTogU3BsaW5lIHtcbiAgICAgICAgaWYgKCF0aGlzLnNwbGluZXMubGVuZ3RoKSB0aGlzLnNwbGluZXMucHVzaChuZXcgU3BsaW5lKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpbmVzWzBdO1xuICAgIH1cblxuICAgIHNldCBzcGxpbmUodmFsdWU6IFNwbGluZSkge1xuICAgICAgICBpZiAodGhpcy5zcGxpbmVzLmxlbmd0aCkgdGhpcy5zcGxpbmVzWzBdID0gdmFsdWU7XG4gICAgICAgIGVsc2UgdGhpcy5zcGxpbmVzLnB1c2godmFsdWUpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgU3BsaW5lQ29udGFpbmVyLmFsbC5hZGQodGhpcyk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBTcGxpbmVDb250YWluZXIuYWxsLmRlbGV0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIFNwbGluZUNvbnRhaW5lci5hbGwuZGVsZXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCFFRElUT1IgJiYgIXRoaXMubm9kZS5oYXNFdmVudExpc3RlbmVyKFNwbGluZUNvbnRhaW5lci5FdmVudFR5cGUuQ0hBTkdFRCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5jaGVja0NoYW5nZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIHZhbHVlIHRoYXQgY2hhbmdlcyB3aGVuZXZlciBhbnkgc3BsaW5lIGluIHRoZSBjb250YWluZXIgY2hhbmdlcy5cbiAgICAgKiBDaGVja2VkIGF0IG1vc3Qgb25jZSBwZXIgZnJhbWUgcGVyIHNwbGluZS5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlU3RhbXAoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGggPSAyMTY2MTM2MjYxIHwgMDtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc3BsaW5lcykgaCA9IE1hdGguaW11bChoIF4gcy5jYWNoZS5zdGFtcCwgMTY3Nzc2MTkpO1xuICAgICAgICByZXR1cm4gTWF0aC5pbXVsKGggXiB0aGlzLnNwbGluZXMubGVuZ3RoLCAxNjc3NzYxOSk7XG4gICAgfVxuXG4gICAgLyoqIEVtaXRzIENIQU5HRUQgaWYgYSBzcGxpbmUgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBjaGVjay4gUmV0dXJucyB3aGV0aGVyIGl0IGRpZC4gKi9cbiAgICBjaGVja0NoYW5nZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChFRElUT1IpIHRoaXMucmVwYWlyQWZ0ZXJFeHRlcm5hbEVkaXQoKTtcbiAgICAgICAgY29uc3Qgc3RhbXAgPSB0aGlzLmNoYW5nZVN0YW1wO1xuICAgICAgICBpZiAoc3RhbXAgPT09IHRoaXMuX3N0YW1wKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N0YW1wID0gc3RhbXA7XG4gICAgICAgIHRoaXMubm9kZS5lbWl0KFNwbGluZUNvbnRhaW5lci5FdmVudFR5cGUuQ0hBTkdFRCwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKiBNYXJrcyBldmVyeSBzcGxpbmUgZGlydHkgYW5kIGVtaXRzIENIQU5HRUQuICovXG4gICAgbm90aWZ5Q2hhbmdlZCgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc3BsaW5lcykgcy5tYXJrRGlydHkoKTtcbiAgICAgICAgdGhpcy5jaGVja0NoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWVuID0gbmV3IFdlYWtNYXA8U3BsaW5lLCBudW1iZXI+KCk7XG5cbiAgICAvKipcbiAgICAgKiBJbnNwZWN0b3IgZWRpdHMgYW5kIHVuZG8gY2hhbmdlIGtub3RzIGJlaGluZCB0aGUgU3BsaW5lIEFQSTsgcmUtYXBwbHkgdGhlXG4gICAgICogdGFuZ2VudCBtb2RlcyBzbyBBdXRvU21vb3RoIHRhbmdlbnRzIGZvbGxvdyBtb3ZlZCBrbm90cy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlcGFpckFmdGVyRXh0ZXJuYWxFZGl0KCk6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgdGhpcy5zcGxpbmVzKSB7XG4gICAgICAgICAgICBjb25zdCBiZWZvcmUgPSBmaW5nZXJwcmludChzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWVuLmdldChzKSA9PT0gYmVmb3JlKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJlZnJlc2hBbGwocyk7XG4gICAgICAgICAgICBjb25zdCBhZnRlciA9IGZpbmdlcnByaW50KHMpO1xuICAgICAgICAgICAgaWYgKGFmdGVyICE9PSBiZWZvcmUpIHMubWFya0RpcnR5KCk7XG4gICAgICAgICAgICB0aGlzLl9zZWVuLnNldChzLCBhZnRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc3BsaW5lc1xuXG4gICAgYWRkU3BsaW5lKHNwbGluZTogU3BsaW5lID0gbmV3IFNwbGluZSgpKTogU3BsaW5lIHtcbiAgICAgICAgdGhpcy5zcGxpbmVzLnB1c2goc3BsaW5lKTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybiBzcGxpbmU7XG4gICAgfVxuXG4gICAgcmVtb3ZlU3BsaW5lQXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb250YWluZXJSZW1vdmVTcGxpbmUodGhpcywgaW5kZXgpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICAvKiogQ29udGFpbmVyLWxldmVsIGVkaXRzIHRoYXQga2VlcCBrbm90IGxpbmtzIHZhbGlkLiAqL1xuICAgIGluc2VydEtub3Qoc3BsaW5lSW5kZXg6IG51bWJlciwga25vdEluZGV4OiBudW1iZXIsIGtub3Q6IEJlemllcktub3QpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVySW5zZXJ0S25vdCh0aGlzLCBzcGxpbmVJbmRleCwga25vdEluZGV4LCBrbm90KTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlS25vdHMocmVmczogS25vdFJlZltdKTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lclJlbW92ZUtub3RzKHRoaXMsIHJlZnMpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICByZXZlcnNlRmxvdyhzcGxpbmVJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lclJldmVyc2UodGhpcywgc3BsaW5lSW5kZXgpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICAvKiogTW92ZXMgYSBrbm90IGFuZCBldmVyeSBrbm90IGxpbmtlZCB0byBpdC4gKi9cbiAgICBzZXRLbm90UG9zaXRpb24ocmVmOiBLbm90UmVmLCBsb2NhbFBvc2l0aW9uOiBSZWFkb25seTxWZWMzPik6IHZvaWQge1xuICAgICAgICB0aGlzLnNwbGluZXNbcmVmLnNwbGluZV0uc2V0S25vdFBvc2l0aW9uKHJlZi5rbm90LCBsb2NhbFBvc2l0aW9uKTtcbiAgICAgICAgc3luY0xpbmtlZCh0aGlzLCByZWYpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBsaW5rS25vdHMocmVmczogS25vdFJlZltdKTogdm9pZCB7XG4gICAgICAgIGxpbmtLbm90cyh0aGlzLCByZWZzLCBzcGxpbmVGYWN0b3J5KTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgdW5saW5rS25vdHMocmVmczogS25vdFJlZltdKTogdm9pZCB7XG4gICAgICAgIHVubGlua0tub3RzKHRoaXMsIHJlZnMpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBnZXRMaW5rZWRLbm90cyhyZWY6IEtub3RSZWYpOiBLbm90UmVmW10ge1xuICAgICAgICByZXR1cm4gbGlua2VkS25vdHModGhpcywgcmVmKTtcbiAgICB9XG5cbiAgICBpc0tub3RMaW5rZWQocmVmOiBLbm90UmVmKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc0xpbmtlZCh0aGlzLCByZWYpO1xuICAgIH1cblxuICAgIC8qKiBVbml0eSdzIFNwbGl0IEtub3QuIFJldHVybnMgdGhlIG5ldyBjb3B5IG9mIHRoZSBrbm90LCBvciBudWxsLiAqL1xuICAgIHNwbGl0S25vdChyZWY6IEtub3RSZWYpOiBLbm90UmVmIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHIgPSBzcGxpdEtub3QodGhpcywgcmVmLCBzcGxpbmVGYWN0b3J5KTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIC8qKiBVbml0eSdzIEpvaW4gS25vdHMgKHR3byBlbmQga25vdHMpLiBSZXR1cm5zIHRoZSBqb2luZWQga25vdCwgb3IgbnVsbC4gKi9cbiAgICBqb2luS25vdHMoYTogS25vdFJlZiwgYjogS25vdFJlZik6IEtub3RSZWYgfCBudWxsIHtcbiAgICAgICAgY29uc3QgciA9IGpvaW5Lbm90cyh0aGlzLCBhLCBiLCBzcGxpbmVGYWN0b3J5KTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBldmFsdWF0aW9uXG5cbiAgICBwcml2YXRlIGdldFNwbGluZShpbmRleDogbnVtYmVyKTogU3BsaW5lIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwbGluZXNbaW5kZXhdID8/IG51bGw7XG4gICAgfVxuXG4gICAgLyoqIFdvcmxkLXNwYWNlIHBvc2l0aW9uIGF0IHQgb24gYSBzcGxpbmUuICovXG4gICAgZXZhbHVhdGVQb3NpdGlvbih0OiBudW1iZXIsIHNwbGluZUluZGV4ID0gMCwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiBvdXQuc2V0KHRoaXMubm9kZS53b3JsZFBvc2l0aW9uKTtcbiAgICAgICAgcy5ldmFsdWF0ZVBvc2l0aW9uKHQsIG91dCk7XG4gICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LCBvdXQsIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgfVxuXG4gICAgLyoqIFdvcmxkLXNwYWNlIGRlcml2YXRpdmUgYXQgdCAoZGlyZWN0aW9uIHRpbWVzIHNwZWVkLCBsaWtlIFVuaXR5J3MgRXZhbHVhdGVUYW5nZW50KS4gKi9cbiAgICBldmFsdWF0ZVRhbmdlbnQodDogbnVtYmVyLCBzcGxpbmVJbmRleCA9IDAsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgaWYgKCFzKSByZXR1cm4gb3V0LnNldCgwLCAwLCAwKTtcbiAgICAgICAgcy5ldmFsdWF0ZVRhbmdlbnQodCwgb3V0KTtcbiAgICAgICAgcmV0dXJuIFZlYzMudHJhbnNmb3JtTWF0NE5vcm1hbChvdXQsIG91dCwgdGhpcy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICB9XG5cbiAgICAvKiogV29ybGQtc3BhY2UgdW5pdCBkaXJlY3Rpb24gb2YgdHJhdmVsIGF0IHQuICovXG4gICAgZXZhbHVhdGVEaXJlY3Rpb24odDogbnVtYmVyLCBzcGxpbmVJbmRleCA9IDAsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgaWYgKCFzKSByZXR1cm4gb3V0LnNldCgwLCAwLCAxKTtcbiAgICAgICAgcy5ldmFsdWF0ZURpcmVjdGlvbih0LCBvdXQpO1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDROb3JtYWwob3V0LCBvdXQsIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgIHJldHVybiBvdXQubm9ybWFsaXplKCk7XG4gICAgfVxuXG4gICAgLyoqIFdvcmxkLXNwYWNlIHVuaXQgdXAgdmVjdG9yIGF0IHQuICovXG4gICAgZXZhbHVhdGVVcFZlY3Rvcih0OiBudW1iZXIsIHNwbGluZUluZGV4ID0gMCwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiBvdXQuc2V0KDAsIDEsIDApO1xuICAgICAgICBzLmV2YWx1YXRlVXBWZWN0b3IodCwgb3V0KTtcbiAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0Tm9ybWFsKG91dCwgb3V0LCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICByZXR1cm4gb3V0Lm5vcm1hbGl6ZSgpO1xuICAgIH1cblxuICAgIC8qKiBQb3NpdGlvbiwgZGlyZWN0aW9uIGFuZCB1cCBhdCB0ICh3b3JsZCBzcGFjZSkuIFJldHVybnMgZmFsc2UgaWYgdGhlcmUgaXMgbm8gc3VjaCBzcGxpbmUuICovXG4gICAgZXZhbHVhdGUodDogbnVtYmVyLCBzcGxpbmVJbmRleCA9IDAsIG91dD86IFNwbGluZVNhbXBsZSk6IFNwbGluZVNhbXBsZSB8IG51bGwge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCByZXMgPSBvdXQgPz8geyBwb3NpdGlvbjogbmV3IFZlYzMoKSwgdGFuZ2VudDogbmV3IFZlYzMoKSwgdXA6IG5ldyBWZWMzKCkgfTtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZVBvc2l0aW9uKHQsIHNwbGluZUluZGV4LCByZXMucG9zaXRpb24pO1xuICAgICAgICB0aGlzLmV2YWx1YXRlRGlyZWN0aW9uKHQsIHNwbGluZUluZGV4LCByZXMudGFuZ2VudCk7XG4gICAgICAgIHRoaXMuZXZhbHVhdGVVcFZlY3Rvcih0LCBzcGxpbmVJbmRleCwgcmVzLnVwKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvKiogUm90YXRpb24gdGhhdCBmYWNlcyBhbG9uZyB0aGUgc3BsaW5lIGF0IHQgKCtaIGZvcndhcmQsICtZIHVwKSwgd29ybGQgc3BhY2UuICovXG4gICAgZXZhbHVhdGVSb3RhdGlvbih0OiBudW1iZXIsIHNwbGluZUluZGV4ID0gMCwgb3V0ID0gbmV3IFF1YXQoKSk6IFF1YXQge1xuICAgICAgICBjb25zdCBmID0gdGhpcy5ldmFsdWF0ZURpcmVjdGlvbih0LCBzcGxpbmVJbmRleCwgbmV3IFZlYzMoKSk7XG4gICAgICAgIGNvbnN0IHUgPSB0aGlzLmV2YWx1YXRlVXBWZWN0b3IodCwgc3BsaW5lSW5kZXgsIG5ldyBWZWMzKCkpO1xuICAgICAgICAvLyBRdWF0LmZyb21WaWV3VXAgbWFwcyArWiB0byB0aGUgdmlldyBkaXJlY3Rpb24sIGxpa2UgdGhlIGtub3RzLlxuICAgICAgICBRdWF0LmZyb21WaWV3VXAob3V0LCBmLCB1KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKiogV29ybGQtc3BhY2UgbGVuZ3RoIG9mIGEgc3BsaW5lLiAqL1xuICAgIGNhbGN1bGF0ZUxlbmd0aChzcGxpbmVJbmRleCA9IDApOiBudW1iZXIge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiAwO1xuICAgICAgICBjb25zdCBtID0gdGhpcy5ub2RlLndvcmxkTWF0cml4O1xuICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICBjb25zdCBjb3VudCA9IHMuY3VydmVDb3VudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBCZXppZXIgY3VydmVzIGFyZSBhZmZpbmUgaW52YXJpYW50OiB0cmFuc2Zvcm0gdGhlIGNvbnRyb2wgcG9pbnRzLlxuICAgICAgICAgICAgcy5nZXRDdXJ2ZShpLCBfYyk7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX2MucDAgYXMgVmVjMywgX2MucDAsIG0pO1xuICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KF9jLnAxIGFzIFZlYzMsIF9jLnAxLCBtKTtcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChfYy5wMiBhcyBWZWMzLCBfYy5wMiwgbSk7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX2MucDMgYXMgVmVjMywgX2MucDMsIG0pO1xuICAgICAgICAgICAgdG90YWwgKz0gYXJjTGVuZ3RoKF9jKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgfVxuXG4gICAgLyoqIENsb3Nlc3QgcG9pbnQgb24gYSBzcGxpbmUgdG8gYSB3b3JsZCBwb3NpdGlvbi4gKi9cbiAgICBnZXROZWFyZXN0UG9pbnQod29ybGRQb2ludDogUmVhZG9ubHk8VmVjMz4sIHNwbGluZUluZGV4ID0gMCk6IHsgdDogbnVtYmVyOyBwb3NpdGlvbjogVmVjMzsgZGlzdGFuY2U6IG51bWJlciB9IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFNwbGluZShzcGxpbmVJbmRleCk7XG4gICAgICAgIGlmICghcykgcmV0dXJuIG51bGw7XG4gICAgICAgIE1hdDQuaW52ZXJ0KF9tLCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX3YsIHdvcmxkUG9pbnQsIF9tKTtcbiAgICAgICAgY29uc3QgciA9IG5lYXJlc3RQb2ludChzLCBzLmNhY2hlLCBfdik7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gbmV3IFZlYzMoci5wb3NpdGlvbi54LCByLnBvc2l0aW9uLnksIHIucG9zaXRpb24ueik7XG4gICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChwb3NpdGlvbiwgcG9zaXRpb24sIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgIHJldHVybiB7IHQ6IHIudCwgcG9zaXRpb24sIGRpc3RhbmNlOiBWZWMzLmRpc3RhbmNlKHBvc2l0aW9uLCB3b3JsZFBvaW50KSB9O1xuICAgIH1cblxuICAgIC8qKiBDbG9zZXN0IHBvaW50IG92ZXIgYWxsIHNwbGluZXMuICovXG4gICAgZ2V0TmVhcmVzdFBvaW50QWxsKHdvcmxkUG9pbnQ6IFJlYWRvbmx5PFZlYzM+KTogeyBzcGxpbmU6IG51bWJlcjsgdDogbnVtYmVyOyBwb3NpdGlvbjogVmVjMzsgZGlzdGFuY2U6IG51bWJlciB9IHwgbnVsbCB7XG4gICAgICAgIGxldCBiZXN0OiB7IHNwbGluZTogbnVtYmVyOyB0OiBudW1iZXI7IHBvc2l0aW9uOiBWZWMzOyBkaXN0YW5jZTogbnVtYmVyIH0gfCBudWxsID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSB0aGlzLmdldE5lYXJlc3RQb2ludCh3b3JsZFBvaW50LCBpKTtcbiAgICAgICAgICAgIGlmIChyICYmICghYmVzdCB8fCByLmRpc3RhbmNlIDwgYmVzdC5kaXN0YW5jZSkpIGJlc3QgPSB7IHNwbGluZTogaSwgLi4uciB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0O1xuICAgIH1cblxuICAgIC8qKiBDb252ZXJ0cyBiZXR3ZWVuIG5vcm1hbGl6ZWQgdCwgbG9jYWwgZGlzdGFuY2UgYW5kIGtub3QgaW5kZXggdW5pdHMgb24gYSBzcGxpbmUuICovXG4gICAgY29udmVydEluZGV4VW5pdCh2YWx1ZTogbnVtYmVyLCBmcm9tOiBQYXRoSW5kZXhVbml0LCB0bzogUGF0aEluZGV4VW5pdCwgc3BsaW5lSW5kZXggPSAwKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgcmV0dXJuIHMgPyBzLmNvbnZlcnRJbmRleFVuaXQodmFsdWUsIGZyb20sIHRvKSA6IDA7XG4gICAgfVxuXG4gICAgLyoqIEtub3QgcG9zaXRpb24gaW4gd29ybGQgc3BhY2UuICovXG4gICAgZ2V0S25vdFdvcmxkUG9zaXRpb24ocmVmOiBLbm90UmVmLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IGsgPSB0aGlzLnNwbGluZXNbcmVmLnNwbGluZV0/Lmtub3RzW3JlZi5rbm90XTtcbiAgICAgICAgaWYgKCFrKSByZXR1cm4gb3V0LnNldCh0aGlzLm5vZGUud29ybGRQb3NpdGlvbik7XG4gICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LCBrLnBvc2l0aW9uLCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgIH1cblxuICAgIC8qKiBTZXRzIGV2ZXJ5IGtub3Qgb2YgZXZlcnkgc3BsaW5lIHRvIGEgdGFuZ2VudCBtb2RlLiAqL1xuICAgIHNldFRhbmdlbnRNb2RlQWxsKG1vZGU6IFRhbmdlbnRNb2RlKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNwbGluZXMpIHMuc2V0VGFuZ2VudE1vZGVBbGwobW9kZSk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgUGF0aEluZGV4VW5pdCB9O1xuIiwgImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgY2NlbnVtLCBFdmVudEhhbmRsZXIsIFF1YXQsIFZlYzMgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFRElUT1IgfSBmcm9tICdjYy9lbnYnO1xuaW1wb3J0IHsgU3BsaW5lQ29udGFpbmVyIH0gZnJvbSAnLi9TcGxpbmVDb250YWluZXInO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBfZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBTcGxpbmVBbmltYXRlTWV0aG9kIHtcbiAgICAvKiogVHJhdmVsIHRoZSBzcGxpbmUgaW4gYGR1cmF0aW9uYCBzZWNvbmRzLiAqL1xuICAgIFRpbWUgPSAwLFxuICAgIC8qKiBUcmF2ZWwgYXQgYG1heFNwZWVkYCB1bml0cyBwZXIgc2Vjb25kLiAqL1xuICAgIFNwZWVkID0gMSxcbn1cblxuZXhwb3J0IGVudW0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlIHtcbiAgICAvKiogUGxheSBvbmNlIGFuZCBzdG9wIGF0IHRoZSBlbmQuICovXG4gICAgT25jZSA9IDAsXG4gICAgLyoqIFJlc3RhcnQgZnJvbSB0aGUgYmVnaW5uaW5nIGF0IHRoZSBlbmQuICovXG4gICAgTG9vcCA9IDEsXG4gICAgLyoqIEVhc2UgaW4gb24gdGhlIGZpcnN0IGxvb3Agb25seSwgdGhlbiBsb29wIGF0IGNvbnN0YW50IHNwZWVkLiAqL1xuICAgIExvb3BFYXNlSW5PbmNlID0gMixcbiAgICAvKiogR28gYmFjayBhbmQgZm9ydGguICovXG4gICAgUGluZ1BvbmcgPSAzLFxufVxuXG5leHBvcnQgZW51bSBTcGxpbmVBbmltYXRlRWFzaW5nIHtcbiAgICBOb25lID0gMCxcbiAgICBFYXNlSW4gPSAxLFxuICAgIEVhc2VPdXQgPSAyLFxuICAgIEVhc2VJbk91dCA9IDMsXG59XG5cbmV4cG9ydCBlbnVtIFNwbGluZUFuaW1hdGVBbGlnbm1lbnQge1xuICAgIC8qKiBLZWVwIHRoZSBvYmplY3QncyByb3RhdGlvbi4gKi9cbiAgICBOb25lID0gMCxcbiAgICAvKiogRmFjZSBhbG9uZyB0aGUgc3BsaW5lLCB1c2luZyB0aGUgc3BsaW5lJ3MgdXAgdmVjdG9yLiAqL1xuICAgIFNwbGluZUVsZW1lbnQgPSAxLFxuICAgIC8qKiBNYXRjaCB0aGUgc3BsaW5lIGNvbnRhaW5lcidzIHJvdGF0aW9uLiAqL1xuICAgIFNwbGluZU9iamVjdCA9IDIsXG4gICAgLyoqIE1hdGNoIHRoZSB3b3JsZCBheGVzLiAqL1xuICAgIFdvcmxkID0gMyxcbn1cblxuZXhwb3J0IGVudW0gQWxpZ25BeGlzIHtcbiAgICBYQXhpcyA9IDAsXG4gICAgWUF4aXMgPSAxLFxuICAgIFpBeGlzID0gMixcbiAgICBOZWdhdGl2ZVhBeGlzID0gMyxcbiAgICBOZWdhdGl2ZVlBeGlzID0gNCxcbiAgICBOZWdhdGl2ZVpBeGlzID0gNSxcbn1cblxuY2NlbnVtKFNwbGluZUFuaW1hdGVNZXRob2QpO1xuY2NlbnVtKFNwbGluZUFuaW1hdGVMb29wTW9kZSk7XG5jY2VudW0oU3BsaW5lQW5pbWF0ZUVhc2luZyk7XG5jY2VudW0oU3BsaW5lQW5pbWF0ZUFsaWdubWVudCk7XG5jY2VudW0oQWxpZ25BeGlzKTtcblxuY29uc3QgQVhFUyA9IFtcbiAgICBuZXcgVmVjMygxLCAwLCAwKSwgbmV3IFZlYzMoMCwgMSwgMCksIG5ldyBWZWMzKDAsIDAsIDEpLFxuICAgIG5ldyBWZWMzKC0xLCAwLCAwKSwgbmV3IFZlYzMoMCwgLTEsIDApLCBuZXcgVmVjMygwLCAwLCAtMSksXG5dO1xuXG5jb25zdCBfcG9zID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9md2QgPSBuZXcgVmVjMygpO1xuY29uc3QgX3VwID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9yb3QgPSBuZXcgUXVhdCgpO1xuY29uc3QgX3JlbWFwID0gbmV3IFF1YXQoKTtcblxuZnVuY3Rpb24gZWFzZUluKHQ6IG51bWJlcikge1xuICAgIHJldHVybiB0ICogdDtcbn1cbmZ1bmN0aW9uIGVhc2VPdXQodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHQgKiAoMiAtIHQpO1xufVxuZnVuY3Rpb24gZWFzZUluT3V0KHQ6IG51bWJlcikge1xuICAgIHJldHVybiB0IDwgMC41ID8gMiAqIHQgKiB0IDogLTEgKyAoNCAtIDIgKiB0KSAqIHQ7XG59XG5mdW5jdGlvbiBwaW5nUG9uZyh0OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKSB7XG4gICAgY29uc3QgbDIgPSBsZW5ndGggKiAyO1xuICAgIGNvbnN0IG0gPSAoKHQgJSBsMikgKyBsMikgJSBsMjtcbiAgICByZXR1cm4gbGVuZ3RoIC0gTWF0aC5hYnMobSAtIGxlbmd0aCk7XG59XG5cbmNvbnN0IF9sZiA9IG5ldyBWZWMzKCk7XG5jb25zdCBfbHUgPSBuZXcgVmVjMygpO1xuXG4vKiogTG9vayByb3RhdGlvbiB3aXRoICtaID0gZm9yd2FyZCBhbmQgK1kgPSB1cCAobGlrZSBVbml0eSdzIFF1YXRlcm5pb24uTG9va1JvdGF0aW9uKS4gKi9cbmZ1bmN0aW9uIGxvb2tSb3RhdGlvbihvdXQ6IFF1YXQsIGZvcndhcmQ6IFJlYWRvbmx5PFZlYzM+LCB1cDogUmVhZG9ubHk8VmVjMz4pOiBRdWF0IHtcbiAgICByZXR1cm4gUXVhdC5mcm9tVmlld1VwKG91dCwgVmVjMy5ub3JtYWxpemUoX2xmLCBmb3J3YXJkKSwgVmVjMy5ub3JtYWxpemUoX2x1LCB1cCkpO1xufVxuXG4vKipcbiAqIE1vdmVzIGl0cyBub2RlIGFsb25nIGEgc3BsaW5lIChVbml0eSdzIFNwbGluZUFuaW1hdGUpLlxuICpcbiAqIE5vZGUgZXZlbnRzOiAnc3BsaW5lLWFuaW1hdGUtdXBkYXRlZCcgKHBvc2l0aW9uLCByb3RhdGlvbikgZXZlcnkgdXBkYXRlXG4gKiBhbmQgJ3NwbGluZS1hbmltYXRlLWNvbXBsZXRlZCcgd2hlbiBhIHJ1biBlbmRzIG9yIGEgbG9vcCB3cmFwcy5cbiAqL1xuQGNjY2xhc3MoJ1NwbGluZUFuaW1hdGUnKVxuQG1lbnUoJ1NwbGluZXMvU3BsaW5lQW5pbWF0ZScpXG5leHBvcnQgY2xhc3MgU3BsaW5lQW5pbWF0ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IEV2ZW50VHlwZSA9IHtcbiAgICAgICAgVVBEQVRFRDogJ3NwbGluZS1hbmltYXRlLXVwZGF0ZWQnLFxuICAgICAgICBDT01QTEVURUQ6ICdzcGxpbmUtYW5pbWF0ZS1jb21wbGV0ZWQnLFxuICAgIH07XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVDb250YWluZXIsIHRvb2x0aXA6ICdUaGUgc3BsaW5lIGNvbnRhaW5lciB0byBmb2xsb3cuJyB9KVxuICAgIGNvbnRhaW5lcjogU3BsaW5lQ29udGFpbmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnV2hpY2ggc3BsaW5lIG9mIHRoZSBjb250YWluZXIgdG8gZm9sbG93LicsIG1pbjogMCwgc3RlcDogMSB9KVxuICAgIHNwbGluZUluZGV4ID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdTdGFydCBwbGF5aW5nIHdoZW4gdGhlIGNvbXBvbmVudCBzdGFydHMuJyB9KVxuICAgIHBsYXlPbkF3YWtlID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUFuaW1hdGVNZXRob2QsIHRvb2x0aXA6ICdUaW1lOiB0cmF2ZWwgdGhlIHNwbGluZSBpbiBhIHNldCBkdXJhdGlvbi4gU3BlZWQ6IHRyYXZlbCBhdCBhIHNldCBzcGVlZC4nIH0pXG4gICAgZ2V0IG1ldGhvZCgpOiBTcGxpbmVBbmltYXRlTWV0aG9kIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZDtcbiAgICB9XG4gICAgc2V0IG1ldGhvZCh2OiBTcGxpbmVBbmltYXRlTWV0aG9kKSB7XG4gICAgICAgIHRoaXMuX21ldGhvZCA9IHY7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1NlY29uZHMgdG8gdHJhdmVsIHRoZSBzcGxpbmUgb25jZS4nLCBtaW46IDAsIHZpc2libGUodGhpczogU3BsaW5lQW5pbWF0ZSkgeyByZXR1cm4gdGhpcy5fbWV0aG9kID09PSBTcGxpbmVBbmltYXRlTWV0aG9kLlRpbWU7IH0gfSlcbiAgICBnZXQgZHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R1cmF0aW9uO1xuICAgIH1cbiAgICBzZXQgZHVyYXRpb24odjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gTWF0aC5tYXgoMCwgdik7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1NwZWVkIGluIHVuaXRzIHBlciBzZWNvbmQuJywgbWluOiAwLCB2aXNpYmxlKHRoaXM6IFNwbGluZUFuaW1hdGUpIHsgcmV0dXJuIHRoaXMuX21ldGhvZCA9PT0gU3BsaW5lQW5pbWF0ZU1ldGhvZC5TcGVlZDsgfSB9KVxuICAgIGdldCBtYXhTcGVlZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4U3BlZWQ7XG4gICAgfVxuICAgIHNldCBtYXhTcGVlZCh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWF4U3BlZWQgPSBNYXRoLm1heCgwLCB2KTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVBbmltYXRlRWFzaW5nLCB0b29sdGlwOiAnU3BlZWQgY3VydmUgb2YgZWFjaCBydW4uJyB9KVxuICAgIGVhc2luZyA9IFNwbGluZUFuaW1hdGVFYXNpbmcuTm9uZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUFuaW1hdGVMb29wTW9kZSwgdG9vbHRpcDogJ1doYXQgaGFwcGVucyBhdCB0aGUgZW5kIG9mIHRoZSBzcGxpbmUuJyB9KVxuICAgIGxvb3BNb2RlID0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLkxvb3A7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVBbmltYXRlQWxpZ25tZW50LCB0b29sdGlwOiAnSG93IHRoZSBvYmplY3Qgcm90YXRlcyB3aGlsZSBpdCBtb3Zlcy4nIH0pXG4gICAgYWxpZ25tZW50ID0gU3BsaW5lQW5pbWF0ZUFsaWdubWVudC5TcGxpbmVFbGVtZW50O1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQWxpZ25BeGlzLCB0b29sdGlwOiAnVGhlIG9iamVjdCBheGlzIHRoYXQgcG9pbnRzIGFsb25nIHRoZSBzcGxpbmUgKFogZm9yIDNEIG1vZGVscywgWCBmb3IgMkQgc3ByaXRlcykuJyB9KVxuICAgIG9iamVjdEZvcndhcmRBeGlzID0gQWxpZ25BeGlzLlpBeGlzO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQWxpZ25BeGlzLCB0b29sdGlwOiAnVGhlIG9iamVjdCBheGlzIHRoYXQgcG9pbnRzIGFsb25nIHRoZSBzcGxpbmVcdTIwMTlzIHVwIHZlY3Rvci4nIH0pXG4gICAgb2JqZWN0VXBBeGlzID0gQWxpZ25BeGlzLllBeGlzO1xuXG4gICAgQHByb3BlcnR5KHsgcmFuZ2U6IFswLCAxLCAwLjAxXSwgc2xpZGU6IHRydWUsIHRvb2x0aXA6ICdXaGVyZSBvbiB0aGUgc3BsaW5lIHRvIHN0YXJ0ICgwLi4xIG9mIGl0cyBsZW5ndGgpLicgfSlcbiAgICBzdGFydE9mZnNldCA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbRXZlbnRIYW5kbGVyXSwgdG9vbHRpcDogJ0NhbGxlZCB3aGVuIGEgcnVuIGVuZHMgb3IgYSBsb29wIHdyYXBzLicgfSlcbiAgICBjb21wbGV0ZWRFdmVudHM6IEV2ZW50SGFuZGxlcltdID0gW107XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9tZXRob2QgPSBTcGxpbmVBbmltYXRlTWV0aG9kLlRpbWU7XG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfZHVyYXRpb24gPSAxO1xuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX21heFNwZWVkID0gMTA7XG5cbiAgICBwcml2YXRlIF9lbGFwc2VkID0gMDtcbiAgICBwcml2YXRlIF9sYXN0RWxhcHNlZCA9IDA7XG4gICAgcHJpdmF0ZSBfcGxheWluZyA9IGZhbHNlO1xuICAgIHByaXZhdGUgX25vcm1hbGl6ZWRUaW1lID0gMDtcbiAgICBwcml2YXRlIF9lbmRSZWFjaGVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcHJldmlld09yaWdpbjogeyBwb3NpdGlvbjogVmVjMzsgcm90YXRpb246IFF1YXQgfSB8IG51bGwgPSBudWxsO1xuXG4gICAgZ2V0IGlzUGxheWluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYXlpbmc7XG4gICAgfVxuXG4gICAgLyoqIFNlY29uZHMgc2luY2UgdGhlIHN0YXJ0IChpbmNsdWRpbmcgbG9vcHMpLiAqL1xuICAgIGdldCBlbGFwc2VkVGltZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxhcHNlZDtcbiAgICB9XG5cbiAgICBzZXQgZWxhcHNlZFRpbWUodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSBNYXRoLm1heCgwLCB2KTtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZVRpbWUoKTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8qKiBQcm9ncmVzcyBhbG9uZyB0aGUgc3BsaW5lOyB0aGUgaW50ZWdlciBwYXJ0IGNvdW50cyBjb21wbGV0ZWQgbG9vcHMuICovXG4gICAgZ2V0IG5vcm1hbGl6ZWRUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkVGltZTtcbiAgICB9XG5cbiAgICBzZXQgbm9ybWFsaXplZFRpbWUodjogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGQgPSB0aGlzLmN1cnJlbnREdXJhdGlvbigpO1xuICAgICAgICB0aGlzLl9lbGFwc2VkID0gTWF0aC5tYXgoMCwgdikgKiBkO1xuICAgICAgICB0aGlzLmV2YWx1YXRlVGltZSgpO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYXlPbkF3YWtlKSB0aGlzLnBsYXkoKTtcbiAgICAgICAgZWxzZSB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5aW5nKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgKz0gZHQ7XG4gICAgICAgIHRoaXMuZXZhbHVhdGVUaW1lKCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBwbGF5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wbGF5aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwYXVzZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGxheWluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKiBCYWNrIHRvIHRoZSBzdGFydDsga2VlcHMgcGxheWluZyBpZiBgYXV0b3BsYXlgLiAqL1xuICAgIHJlc3RhcnQoYXV0b3BsYXkgPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLl9sYXN0RWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuX25vcm1hbGl6ZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fZW5kUmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wbGF5aW5nID0gYXV0b3BsYXk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICAvKiogTGVuZ3RoIG9mIHRoZSBmb2xsb3dlZCBzcGxpbmUgaW4gd29ybGQgdW5pdHMuICovXG4gICAgZ2V0IHNwbGluZUxlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIgPyB0aGlzLmNvbnRhaW5lci5jYWxjdWxhdGVMZW5ndGgodGhpcy5zcGxpbmVJbmRleCkgOiAwO1xuICAgIH1cblxuICAgIC8qKiBEdXJhdGlvbiBvZiBvbmUgcnVuIChTcGVlZCBtb2RlIGNvbnZlcnRzIHRoZSBzcGVlZCBpbnRvIGEgZHVyYXRpb24pLiAqL1xuICAgIGN1cnJlbnREdXJhdGlvbigpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fbWV0aG9kID09PSBTcGxpbmVBbmltYXRlTWV0aG9kLlRpbWUpIHJldHVybiB0aGlzLl9kdXJhdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuX21heFNwZWVkIDw9IDApIHJldHVybiBJbmZpbml0eTtcbiAgICAgICAgY29uc3QgYmFzZSA9IHRoaXMuc3BsaW5lTGVuZ3RoIC8gdGhpcy5fbWF4U3BlZWQ7XG4gICAgICAgIC8vIEVhc2VkIHJ1bnMgcmVhY2ggdHdpY2UgdGhlIGF2ZXJhZ2Ugc3BlZWQ7IGtlZXAgdGhlIHBlYWsgYXQgbWF4U3BlZWQuXG4gICAgICAgIHJldHVybiB0aGlzLmVhc2luZyA9PT0gU3BsaW5lQW5pbWF0ZUVhc2luZy5Ob25lID8gYmFzZSA6IGJhc2UgKiAyO1xuICAgIH1cblxuICAgIC8qKiBTcGxpbmUgdCAoMC4uMSkgZm9yIHRoZSBjdXJyZW50IHRpbWUsIGFmdGVyIGxvb3BpbmcsIGVhc2luZyBhbmQgdGhlIHN0YXJ0IG9mZnNldC4gKi9cbiAgICBnZXRTcGxpbmVUKCk6IG51bWJlciB7XG4gICAgICAgIGxldCB0ID0gdGhpcy5fbm9ybWFsaXplZFRpbWUgJSAxO1xuICAgICAgICBpZiAodGhpcy5fbm9ybWFsaXplZFRpbWUgPj0gMSAmJiB0ID09PSAwICYmIHRoaXMubG9vcE1vZGUgPT09IFNwbGluZUFuaW1hdGVMb29wTW9kZS5PbmNlKSB0ID0gMTtcbiAgICAgICAgdCArPSB0aGlzLnN0YXJ0T2Zmc2V0O1xuICAgICAgICByZXR1cm4gdCA+IDEgPyAodGhpcy5jb250YWluZXI/LnNwbGluZXNbdGhpcy5zcGxpbmVJbmRleF0/LmNsb3NlZCA/IHQgJSAxIDogTWF0aC5taW4odCwgMSkpIDogdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV2YWx1YXRlVGltZSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gdGhpcy5jdXJyZW50RHVyYXRpb24oKTtcbiAgICAgICAgaWYgKCEoZHVyYXRpb24gPiAwKSB8fCAhaXNGaW5pdGUoZHVyYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxpemVkVGltZSA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQSBsb29wIHdyYXBwZWQgKG9yIGEgcGluZy1wb25nIHR1cm5lZCkgc2luY2UgdGhlIGxhc3QgZXZhbHVhdGlvbi5cbiAgICAgICAgaWYgKHRoaXMubG9vcE1vZGUgIT09IFNwbGluZUFuaW1hdGVMb29wTW9kZS5PbmNlICYmIHRoaXMuX2VsYXBzZWQgPiB0aGlzLl9sYXN0RWxhcHNlZFxuICAgICAgICAgICAgJiYgTWF0aC5mbG9vcih0aGlzLl9lbGFwc2VkIC8gZHVyYXRpb24pID4gTWF0aC5mbG9vcih0aGlzLl9sYXN0RWxhcHNlZCAvIGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fZW5kUmVhY2hlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdEVsYXBzZWQgPSB0aGlzLl9lbGFwc2VkO1xuICAgICAgICBsZXQgdCA9IDA7XG4gICAgICAgIGNvbnN0IGVhc2VGaXJzdCA9IHRoaXMuZWFzaW5nID09PSBTcGxpbmVBbmltYXRlRWFzaW5nLkVhc2VJbiB8fCB0aGlzLmVhc2luZyA9PT0gU3BsaW5lQW5pbWF0ZUVhc2luZy5FYXNlSW5PdXQ7XG4gICAgICAgIHN3aXRjaCAodGhpcy5sb29wTW9kZSkge1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuT25jZTpcbiAgICAgICAgICAgICAgICB0ID0gTWF0aC5taW4odGhpcy5fZWxhcHNlZCwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuTG9vcDpcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5fZWxhcHNlZCAlIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuTG9vcEVhc2VJbk9uY2U6XG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgYW4gZWFzZWQtaW4gZmlyc3QgcnVuLCBjb25zdGFudCBzcGVlZCB0YWtlcyBoYWxmIGFzIGxvbmcuXG4gICAgICAgICAgICAgICAgaWYgKGVhc2VGaXJzdCAmJiB0aGlzLl9lbGFwc2VkID49IGR1cmF0aW9uKSBkdXJhdGlvbiAqPSAwLjU7XG4gICAgICAgICAgICAgICAgdCA9IHRoaXMuX2VsYXBzZWQgJSBkdXJhdGlvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLlBpbmdQb25nOlxuICAgICAgICAgICAgICAgIHQgPSBwaW5nUG9uZyh0aGlzLl9lbGFwc2VkLCBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdCAvPSBkdXJhdGlvbjtcbiAgICAgICAgaWYgKHRoaXMubG9vcE1vZGUgPT09IFNwbGluZUFuaW1hdGVMb29wTW9kZS5Mb29wRWFzZUluT25jZSkge1xuICAgICAgICAgICAgaWYgKGVhc2VGaXJzdCAmJiB0aGlzLl9lbGFwc2VkIDwgZHVyYXRpb24pIHQgPSBlYXNlSW4odCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZWFzaW5nKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlRWFzaW5nLkVhc2VJbjogdCA9IGVhc2VJbih0KTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlRWFzaW5nLkVhc2VPdXQ6IHQgPSBlYXNlT3V0KHQpOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVFYXNpbmcuRWFzZUluT3V0OiB0ID0gZWFzZUluT3V0KHQpOyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb29wcyA9IE1hdGguZmxvb3IodGhpcy5fZWxhcHNlZCAvIGR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5fbm9ybWFsaXplZFRpbWUgPSB0aGlzLmxvb3BNb2RlID09PSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuT25jZSA/IE1hdGgubWluKDEsIHQpIDogbG9vcHMgKyB0O1xuICAgICAgICBpZiAodGhpcy5sb29wTW9kZSA9PT0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLk9uY2UgJiYgdGhpcy5fZWxhcHNlZCA+PSBkdXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fbm9ybWFsaXplZFRpbWUgPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW5kUmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV29ybGQgcG9zaXRpb24gYW5kIHJvdGF0aW9uIGZvciB0aGUgY3VycmVudCB0aW1lLiAqL1xuICAgIGV2YWx1YXRlUG9zaXRpb25BbmRSb3RhdGlvbihvdXRQb3NpdGlvbiA9IG5ldyBWZWMzKCksIG91dFJvdGF0aW9uID0gbmV3IFF1YXQoKSk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGlmICghYyB8fCAhYy5zcGxpbmVzW3RoaXMuc3BsaW5lSW5kZXhdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLmdldFNwbGluZVQoKTtcbiAgICAgICAgYy5ldmFsdWF0ZVBvc2l0aW9uKHQsIHRoaXMuc3BsaW5lSW5kZXgsIG91dFBvc2l0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID09PSBTcGxpbmVBbmltYXRlQWxpZ25tZW50Lk5vbmUpIHtcbiAgICAgICAgICAgIG91dFJvdGF0aW9uLnNldCh0aGlzLm5vZGUud29ybGRSb3RhdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmd2RBeGlzID0gQVhFU1t0aGlzLm9iamVjdEZvcndhcmRBeGlzXSA/PyBBWEVTWzJdO1xuICAgICAgICBsZXQgdXBBeGlzID0gQVhFU1t0aGlzLm9iamVjdFVwQXhpc10gPz8gQVhFU1sxXTtcbiAgICAgICAgaWYgKE1hdGguYWJzKFZlYzMuZG90KGZ3ZEF4aXMsIHVwQXhpcykpID4gMC45OSkgdXBBeGlzID0gTWF0aC5hYnMoZndkQXhpcy55KSA+IDAuOTkgPyBBWEVTWzJdIDogQVhFU1sxXTtcbiAgICAgICAgUXVhdC5pbnZlcnQoX3JlbWFwLCBsb29rUm90YXRpb24oX3JlbWFwLCBmd2RBeGlzLCB1cEF4aXMpKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLmFsaWdubWVudCkge1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlQWxpZ25tZW50LlNwbGluZUVsZW1lbnQ6XG4gICAgICAgICAgICAgICAgYy5ldmFsdWF0ZURpcmVjdGlvbih0LCB0aGlzLnNwbGluZUluZGV4LCBfZndkKTtcbiAgICAgICAgICAgICAgICBjLmV2YWx1YXRlVXBWZWN0b3IodCwgdGhpcy5zcGxpbmVJbmRleCwgX3VwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3BsaW5lQW5pbWF0ZUFsaWdubWVudC5TcGxpbmVPYmplY3Q6XG4gICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KF9md2QsIFZlYzMuVU5JVF9aLCBjLm5vZGUud29ybGRSb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KF91cCwgVmVjMy5VTklUX1ksIGMubm9kZS53b3JsZFJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgX2Z3ZC5zZXQoMCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgX3VwLnNldCgwLCAxLCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsb29rUm90YXRpb24ob3V0Um90YXRpb24sIF9md2QsIF91cCk7XG4gICAgICAgIFF1YXQubXVsdGlwbHkob3V0Um90YXRpb24sIG91dFJvdGF0aW9uLCBfcmVtYXApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5VHJhbnNmb3JtKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZXZhbHVhdGVQb3NpdGlvbkFuZFJvdGF0aW9uKF9wb3MsIF9yb3QpKSByZXR1cm47XG4gICAgICAgIHRoaXMubm9kZS5zZXRXb3JsZFBvc2l0aW9uKF9wb3MpO1xuICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgIT09IFNwbGluZUFuaW1hdGVBbGlnbm1lbnQuTm9uZSkgdGhpcy5ub2RlLnNldFdvcmxkUm90YXRpb24oX3JvdCk7XG4gICAgICAgIHRoaXMubm9kZS5lbWl0KFNwbGluZUFuaW1hdGUuRXZlbnRUeXBlLlVQREFURUQsIF9wb3MsIF9yb3QpO1xuICAgICAgICBpZiAodGhpcy5fZW5kUmVhY2hlZCkge1xuICAgICAgICAgICAgdGhpcy5fZW5kUmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmVtaXQoU3BsaW5lQW5pbWF0ZS5FdmVudFR5cGUuQ09NUExFVEVELCB0aGlzKTtcbiAgICAgICAgICAgIEV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMuY29tcGxldGVkRXZlbnRzLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVkaXRvciBwcmV2aWV3XG5cbiAgICAvKiogRWRpdG9yIHByZXZpZXc6IHNob3dzIHRoZSBvYmplY3QgYXQgYHNlY29uZHNgICh0aGUgb3JpZ2luYWwgdHJhbnNmb3JtIGlzIGtlcHQgZm9yIF9wcmV2aWV3U3RvcCkuICovXG4gICAgX3ByZXZpZXdTZXRUaW1lKHNlY29uZHM6IG51bWJlcik6IHsgbm9ybWFsaXplZFRpbWU6IG51bWJlcjsgZHVyYXRpb246IG51bWJlciB9IHtcbiAgICAgICAgaWYgKCF0aGlzLl9wcmV2aWV3T3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aWV3T3JpZ2luID0geyBwb3NpdGlvbjogdGhpcy5ub2RlLndvcmxkUG9zaXRpb24uY2xvbmUoKSwgcm90YXRpb246IHRoaXMubm9kZS53b3JsZFJvdGF0aW9uLmNsb25lKCkgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lbGFwc2VkID0gTWF0aC5tYXgoMCwgc2Vjb25kcyk7XG4gICAgICAgIHRoaXMuZXZhbHVhdGVUaW1lKCk7XG4gICAgICAgIHRoaXMuX2VuZFJlYWNoZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgICAgICByZXR1cm4geyBub3JtYWxpemVkVGltZTogdGhpcy5fbm9ybWFsaXplZFRpbWUsIGR1cmF0aW9uOiB0aGlzLmN1cnJlbnREdXJhdGlvbigpIH07XG4gICAgfVxuXG4gICAgLyoqIEVkaXRvciBwcmV2aWV3OiBwdXRzIHRoZSBvYmplY3QgYmFjayB3aGVyZSBpdCB3YXMuICovXG4gICAgX3ByZXZpZXdTdG9wKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fcHJldmlld09yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFdvcmxkUG9zaXRpb24odGhpcy5fcHJldmlld09yaWdpbi5wb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0V29ybGRSb3RhdGlvbih0aGlzLl9wcmV2aWV3T3JpZ2luLnJvdGF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpZXdPcmlnaW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLl9ub3JtYWxpemVkVGltZSA9IDA7XG4gICAgfVxuXG4gICAgX3ByZXZpZXdJbmZvKCk6IHsgZHVyYXRpb246IG51bWJlcjsgbGVuZ3RoOiBudW1iZXI7IHByZXZpZXdpbmc6IGJvb2xlYW4gfSB7XG4gICAgICAgIHJldHVybiB7IGR1cmF0aW9uOiB0aGlzLmN1cnJlbnREdXJhdGlvbigpLCBsZW5ndGg6IHRoaXMuc3BsaW5lTGVuZ3RoLCBwcmV2aWV3aW5nOiAhIXRoaXMuX3ByZXZpZXdPcmlnaW4gfTtcbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIGlmIChFRElUT1IpIHRoaXMuX3ByZXZpZXdTdG9wKCk7XG4gICAgfVxufVxuIiwgImltcG9ydCB7XG4gICAgX2RlY29yYXRvciwgQ29tcG9uZW50LCBjY2VudW0sIENDT2JqZWN0LCBkaXJlY3RvciwganMsIE1hdGVyaWFsLCBNYXQ0LCBNZXNoLCBNZXNoUmVuZGVyZXIsIE5vZGUsIHV0aWxzLCBWZWMyLCBWZWMzLFxufSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFRElUT1IgfSBmcm9tICdjYy9lbnYnO1xuaW1wb3J0IHsgU3BsaW5lQ29udGFpbmVyIH0gZnJvbSAnLi9TcGxpbmVDb250YWluZXInO1xuaW1wb3J0IHsgU3BsaW5lIH0gZnJvbSAnLi9TcGxpbmUnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSwgbWVudSB9ID0gX2RlY29yYXRvcjtcblxuZXhwb3J0IGVudW0gRXh0cnVkZVNoYXBlIHtcbiAgICAvKiogQSB0dWJlLiAqL1xuICAgIENpcmNsZSA9IDAsXG4gICAgLyoqIEEgc3F1YXJlIHR1YmUuICovXG4gICAgU3F1YXJlID0gMSxcbiAgICAvKiogQSBmbGF0IHN0cmlwIGZhY2luZyB0aGUgc3BsaW5lJ3MgdXAgdmVjdG9yLiAqL1xuICAgIFJvYWQgPSAyLFxuICAgIC8qKiBUaGUgZmlyc3Qgc3BsaW5lIG9mIGFub3RoZXIgY29udGFpbmVyLCByZWFkIGluIGl0cyBYWSBwbGFuZS4gKi9cbiAgICBTcGxpbmUgPSAzLFxufVxuY2NlbnVtKEV4dHJ1ZGVTaGFwZSk7XG5cbi8qKiBIaWRkZW4gY2hpbGQgdGhhdCBob2xkcyB0aGUgZ2VuZXJhdGVkIG1lc2g6IG5vdCBzYXZlZCwgbm90IGxpc3RlZCwgbm90IHBpY2thYmxlLiAqL1xuY29uc3QgR0VORVJBVEVEX0ZMQUdTID0gQ0NPYmplY3QuRmxhZ3MuRG9udFNhdmUgfCBDQ09iamVjdC5GbGFncy5IaWRlSW5IaWVyYXJjaHkgfCBDQ09iamVjdC5GbGFncy5Mb2NrZWRJbkVkaXRvcjtcblxuaW50ZXJmYWNlIFByb2ZpbGUge1xuICAgIC8qKiAyRCBwb2ludHMgKHggYWxvbmcgdGhlIHJpZ2h0IHZlY3RvciwgeSBhbG9uZyB1cCkuICovXG4gICAgcG9pbnRzOiBudW1iZXJbXTtcbiAgICBub3JtYWxzOiBudW1iZXJbXTtcbiAgICB1OiBudW1iZXJbXTtcbiAgICAvKiogUGFpcnMgb2YgcG9pbnQgaW5kaWNlcyB0aGF0IGZvcm0gZmFjZXMuICovXG4gICAgZWRnZXM6IG51bWJlcltdO1xuICAgIC8qKiBQcm9maWxlIGVuY2xvc2VzIGFuIGFyZWEgKGNhcHMgcG9zc2libGUpLiAqL1xuICAgIGNsb3NlZDogYm9vbGVhbjtcbiAgICAvKiogUGVyaW1ldGVyIG9mIHRoZSBwcm9maWxlIGF0IHJhZGl1cyAxLCBmb3IgdGV4dHVyZSBzY2FsZSBhbG9uZyB0aGUgc3BsaW5lLiAqL1xuICAgIHBlcmltZXRlcjogbnVtYmVyO1xufVxuXG5jb25zdCBfcCA9IG5ldyBWZWMzKCk7XG5jb25zdCBfZiA9IG5ldyBWZWMzKCk7XG5jb25zdCBfdSA9IG5ldyBWZWMzKCk7XG5jb25zdCBfciA9IG5ldyBWZWMzKCk7XG5jb25zdCBfbSA9IG5ldyBNYXQ0KCk7XG5cbi8qKlxuICogQnVpbGRzIGEgbWVzaCBhbG9uZyB0aGUgc3BsaW5lcyBvZiBhIGNvbnRhaW5lciAoVW5pdHkncyBTcGxpbmVFeHRydWRlKS5cbiAqIFRoZSBtZXNoIGlzIHJlZ2VuZXJhdGVkIHdoZW4gdGhlIHNwbGluZSBvciBhIHNldHRpbmcgY2hhbmdlczsgaXQgbGl2ZXMgb25cbiAqIGEgaGlkZGVuIGNoaWxkIG5vZGUgYW5kIGlzIG5vdCBzYXZlZCB3aXRoIHRoZSBzY2VuZS5cbiAqL1xuQGNjY2xhc3MoJ1NwbGluZUV4dHJ1ZGUnKVxuQGV4ZWN1dGVJbkVkaXRNb2RlXG5AbWVudSgnU3BsaW5lcy9TcGxpbmVFeHRydWRlJylcbmV4cG9ydCBjbGFzcyBTcGxpbmVFeHRydWRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVDb250YWluZXIsIHRvb2x0aXA6ICdUaGUgc3BsaW5lcyB0byBleHRydWRlIChhbGwgc3BsaW5lcyBvZiB0aGUgY29udGFpbmVyKS4nIH0pXG4gICAgY29udGFpbmVyOiBTcGxpbmVDb250YWluZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IE1hdGVyaWFsLCB0b29sdGlwOiAnTWF0ZXJpYWwgb2YgdGhlIGdlbmVyYXRlZCBtZXNoLicgfSlcbiAgICBtYXRlcmlhbDogTWF0ZXJpYWwgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdSZWJ1aWxkIHRoZSBtZXNoIHdoZW4gdGhlIHNwbGluZSBjaGFuZ2VzIChhdCBydW50aW1lIHRvbykuJyB9KVxuICAgIHJlYnVpbGRPblNwbGluZUNoYW5nZSA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnQXQgbW9zdCB0aGlzIG1hbnkgcmVidWlsZHMgcGVyIHNlY29uZCBhdCBydW50aW1lLicsIG1pbjogMSwgc3RlcDogMSwgdmlzaWJsZSh0aGlzOiBTcGxpbmVFeHRydWRlKSB7IHJldHVybiB0aGlzLnJlYnVpbGRPblNwbGluZUNoYW5nZTsgfSB9KVxuICAgIHJlYnVpbGRGcmVxdWVuY3kgPSAzMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEV4dHJ1ZGVTaGFwZSwgdG9vbHRpcDogJ0Nyb3NzLXNlY3Rpb24gb2YgdGhlIG1lc2guJyB9KVxuICAgIHNoYXBlID0gRXh0cnVkZVNoYXBlLkNpcmNsZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdTaWRlcyBvZiB0aGUgY2lyY2xlLicsIG1pbjogMywgc3RlcDogMSwgdmlzaWJsZSh0aGlzOiBTcGxpbmVFeHRydWRlKSB7IHJldHVybiB0aGlzLnNoYXBlID09PSBFeHRydWRlU2hhcGUuQ2lyY2xlOyB9IH0pXG4gICAgc2lkZXMgPSA4O1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU3BsaW5lQ29udGFpbmVyLCB0b29sdGlwOiAnQ29udGFpbmVyIHdob3NlIGZpcnN0IHNwbGluZSBpcyB0aGUgY3Jvc3Mtc2VjdGlvbiAoaW4gaXRzIFhZIHBsYW5lKS4nLCB2aXNpYmxlKHRoaXM6IFNwbGluZUV4dHJ1ZGUpIHsgcmV0dXJuIHRoaXMuc2hhcGUgPT09IEV4dHJ1ZGVTaGFwZS5TcGxpbmU7IH0gfSlcbiAgICBwcm9maWxlOiBTcGxpbmVDb250YWluZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdQb2ludHMgc2FtcGxlZCBhbG9uZyB0aGUgcHJvZmlsZSBzcGxpbmUuJywgbWluOiAyLCBzdGVwOiAxLCB2aXNpYmxlKHRoaXM6IFNwbGluZUV4dHJ1ZGUpIHsgcmV0dXJuIHRoaXMuc2hhcGUgPT09IEV4dHJ1ZGVTaGFwZS5TcGxpbmU7IH0gfSlcbiAgICBwcm9maWxlU2VnbWVudHMgPSAxNjtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdSYWRpdXMgKGhhbGYgd2lkdGgpIG9mIHRoZSBjcm9zcy1zZWN0aW9uLicsIG1pbjogMCB9KVxuICAgIHJhZGl1cyA9IDAuMjU7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnRWRnZSBsb29wcyBwZXIgdW5pdCBvZiBzcGxpbmUgbGVuZ3RoLicsIG1pbjogMC4wMSB9KVxuICAgIHNlZ21lbnRzUGVyVW5pdCA9IDQ7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnQ2xvc2UgdGhlIGVuZHMgb2Ygb3BlbiBzcGxpbmVzLicgfSlcbiAgICBjYXBwZWQgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1BhcnQgb2YgZWFjaCBzcGxpbmUgdG8gZXh0cnVkZSAoMC4uMSkuJyB9KVxuICAgIHJhbmdlID0gbmV3IFZlYzIoMCwgMSk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnVHVybiB0aGUgbWVzaCBpbnNpZGUgb3V0LicgfSlcbiAgICBmbGlwTm9ybWFscyA9IGZhbHNlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ0Nhc3Qgc2hhZG93cy4nIH0pXG4gICAgY2FzdFNoYWRvd3MgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1JlY2VpdmUgc2hhZG93cy4nIH0pXG4gICAgcmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ0FkZCBhIE1lc2hDb2xsaWRlciB1c2luZyB0aGUgZ2VuZXJhdGVkIG1lc2ggKG5lZWRzIGEgcGh5c2ljcyBiYWNrZW5kIHdpdGggbWVzaCBjb2xsaWRlcnMpLicgfSlcbiAgICBnZW5lcmF0ZUNvbGxpZGVyID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9jaGlsZDogTm9kZSB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgX21lc2g6IE1lc2ggfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIF9zdGFtcCA9IE5hTjtcbiAgICBwcml2YXRlIF9sYXN0QnVpbGQgPSAtSW5maW5pdHk7XG4gICAgcHJpdmF0ZSBfZmFsbGJhY2tNYXRlcmlhbDogTWF0ZXJpYWwgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKiBUaGUgZ2VuZXJhdGVkIG1lc2ggKG51bGwgYmVmb3JlIHRoZSBmaXJzdCBidWlsZCkuICovXG4gICAgZ2V0IG1lc2goKTogTWVzaCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzaDtcbiAgICB9XG5cbiAgICByZXNldEluRWRpdG9yKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29tcG9uZW50KFNwbGluZUNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29tcG9uZW50KFNwbGluZUNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMucmVidWlsZCgpO1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkKSB0aGlzLl9jaGlsZC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZCAmJiB0aGlzLl9jaGlsZC5pc1ZhbGlkKSB0aGlzLl9jaGlsZC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2NoaWxkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWVzaD8uZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9tZXNoID0gbnVsbDtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICghRURJVE9SICYmICF0aGlzLnJlYnVpbGRPblNwbGluZUNoYW5nZSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBzdGFtcCA9IHRoaXMuY29tcHV0ZVN0YW1wKCk7XG4gICAgICAgIGlmIChzdGFtcCA9PT0gdGhpcy5fc3RhbXApIHJldHVybjtcbiAgICAgICAgaWYgKCFFRElUT1IpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IGRpcmVjdG9yLmdldFRvdGFsVGltZSgpIC8gMTAwMDtcbiAgICAgICAgICAgIGlmIChub3cgLSB0aGlzLl9sYXN0QnVpbGQgPCAxIC8gTWF0aC5tYXgoMSwgdGhpcy5yZWJ1aWxkRnJlcXVlbmN5KSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5fbGFzdEJ1aWxkID0gbm93O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVidWlsZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29tcHV0ZVN0YW1wKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgbGV0IGggPSBjICYmIGMuaXNWYWxpZCA/IGMuY2hhbmdlU3RhbXAgOiAwO1xuICAgICAgICBjb25zdCBtaXggPSAodjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBoID0gTWF0aC5pbXVsKGggXiBNYXRoLnJvdW5kKHYgKiAxZTUpLCAxNjc3NzYxOSk7XG4gICAgICAgIH07XG4gICAgICAgIG1peCh0aGlzLnNoYXBlKTtcbiAgICAgICAgbWl4KHRoaXMuc2lkZXMpO1xuICAgICAgICBtaXgodGhpcy5yYWRpdXMpO1xuICAgICAgICBtaXgodGhpcy5zZWdtZW50c1BlclVuaXQpO1xuICAgICAgICBtaXgodGhpcy5jYXBwZWQgPyAxIDogMCk7XG4gICAgICAgIG1peCh0aGlzLnJhbmdlLngpO1xuICAgICAgICBtaXgodGhpcy5yYW5nZS55KTtcbiAgICAgICAgbWl4KHRoaXMuZmxpcE5vcm1hbHMgPyAxIDogMCk7XG4gICAgICAgIG1peCh0aGlzLmNhc3RTaGFkb3dzID8gMSA6IDApO1xuICAgICAgICBtaXgodGhpcy5yZWNlaXZlU2hhZG93cyA/IDEgOiAwKTtcbiAgICAgICAgbWl4KHRoaXMuZ2VuZXJhdGVDb2xsaWRlciA/IDEgOiAwKTtcbiAgICAgICAgbWl4KHRoaXMucHJvZmlsZVNlZ21lbnRzKTtcbiAgICAgICAgaWYgKHRoaXMucHJvZmlsZSAmJiB0aGlzLnNoYXBlID09PSBFeHRydWRlU2hhcGUuU3BsaW5lKSBtaXgodGhpcy5wcm9maWxlLmNoYW5nZVN0YW1wKTtcbiAgICAgICAgaWYgKGMgJiYgYy5pc1ZhbGlkICYmIGMubm9kZSAhPT0gdGhpcy5ub2RlKSB7XG4gICAgICAgICAgICBNYXQ0LmludmVydChfbSwgdGhpcy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICAgICAgICAgIE1hdDQubXVsdGlwbHkoX20sIF9tLCBjLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCB2IG9mIE1hdDQudG9BcnJheShbXSwgX20pKSBtaXgodik7XG4gICAgICAgIH1cbiAgICAgICAgaCA9IE1hdGguaW11bChoIF4gKHRoaXMubWF0ZXJpYWwgPyAxIDogMCksIDE2Nzc3NjE5KTtcbiAgICAgICAgcmV0dXJuIGg7XG4gICAgfVxuXG4gICAgLyoqIFJlZ2VuZXJhdGVzIHRoZSBtZXNoIG5vdy4gKi9cbiAgICByZWJ1aWxkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdGFtcCA9IHRoaXMuY29tcHV0ZVN0YW1wKCk7XG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gdGhpcy5idWlsZEdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5lbnN1cmVDaGlsZCgpO1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IGNoaWxkLmdldENvbXBvbmVudChNZXNoUmVuZGVyZXIpIHx8IGNoaWxkLmFkZENvbXBvbmVudChNZXNoUmVuZGVyZXIpO1xuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLl9tZXNoO1xuICAgICAgICBpZiAoIWdlb21ldHJ5KSB7XG4gICAgICAgICAgICByZW5kZXJlci5tZXNoID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX21lc2ggPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWVzaCA9IHV0aWxzLk1lc2hVdGlscy5jcmVhdGVNZXNoKGdlb21ldHJ5LCB1bmRlZmluZWQsIHsgY2FsY3VsYXRlQm91bmRzOiB0cnVlIH0pO1xuICAgICAgICAgICAgcmVuZGVyZXIubWVzaCA9IHRoaXMuX21lc2g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZCAmJiBvbGQgIT09IHRoaXMuX21lc2gpIG9sZC5kZXN0cm95KCk7XG4gICAgICAgIGNvbnN0IG1hdCA9IHRoaXMubWF0ZXJpYWwgfHwgdGhpcy5mYWxsYmFja01hdGVyaWFsKCk7XG4gICAgICAgIGlmIChtYXQpIHJlbmRlcmVyLnNldFNoYXJlZE1hdGVyaWFsKG1hdCwgMCk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd0Nhc3RpbmdNb2RlID0gdGhpcy5jYXN0U2hhZG93cyA/IDEgOiAwO1xuICAgICAgICByZW5kZXJlci5yZWNlaXZlU2hhZG93ID0gdGhpcy5yZWNlaXZlU2hhZG93cyA/IDEgOiAwO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbGxpZGVyKGNoaWxkKTtcbiAgICAgICAgY2hpbGQuYWN0aXZlID0gdGhpcy5lbmFibGVkSW5IaWVyYXJjaHk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmYWxsYmFja01hdGVyaWFsKCk6IE1hdGVyaWFsIHwgbnVsbCB7XG4gICAgICAgIGlmICh0aGlzLl9mYWxsYmFja01hdGVyaWFsKSByZXR1cm4gdGhpcy5fZmFsbGJhY2tNYXRlcmlhbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG0gPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIG0uaW5pdGlhbGl6ZSh7IGVmZmVjdE5hbWU6ICdidWlsdGluLXN0YW5kYXJkJyB9KTtcbiAgICAgICAgICAgIHRoaXMuX2ZhbGxiYWNrTWF0ZXJpYWwgPSBtO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHRoaXMuX2ZhbGxiYWNrTWF0ZXJpYWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9mYWxsYmFja01hdGVyaWFsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW5zdXJlQ2hpbGQoKTogTm9kZSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZCAmJiB0aGlzLl9jaGlsZC5pc1ZhbGlkICYmIHRoaXMuX2NoaWxkLnBhcmVudCA9PT0gdGhpcy5ub2RlKSByZXR1cm4gdGhpcy5fY2hpbGQ7XG4gICAgICAgIC8vIFJldXNlIGEgZ2VuZXJhdGVkIGNoaWxkIGxlZnQgb3ZlciBmcm9tIGEgcHJldmlvdXMgaW5zdGFuY2UgKGUuZy4gYWZ0ZXIgdW5kbykuXG4gICAgICAgIGxldCBjaGlsZCA9IHRoaXMubm9kZS5jaGlsZHJlbi5maW5kKChuKSA9PiBuLm5hbWUgPT09ICdfX1NwbGluZUV4dHJ1ZGVNZXNoJyAmJiAobiBhcyBhbnkpLl9vYmpGbGFncyAmIENDT2JqZWN0LkZsYWdzLkRvbnRTYXZlKSB8fCBudWxsO1xuICAgICAgICBpZiAoIWNoaWxkKSB7XG4gICAgICAgICAgICBjaGlsZCA9IG5ldyBOb2RlKCdfX1NwbGluZUV4dHJ1ZGVNZXNoJyk7XG4gICAgICAgICAgICAoY2hpbGQgYXMgYW55KS5fb2JqRmxhZ3MgfD0gR0VORVJBVEVEX0ZMQUdTO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkLmxheWVyID0gdGhpcy5ub2RlLmxheWVyO1xuICAgICAgICB0aGlzLl9jaGlsZCA9IGNoaWxkO1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVDb2xsaWRlcihjaGlsZDogTm9kZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBDb2xsaWRlckNsYXNzID0ganMuZ2V0Q2xhc3NCeU5hbWUoJ2NjLk1lc2hDb2xsaWRlcicpIGFzIGFueTtcbiAgICAgICAgaWYgKCFDb2xsaWRlckNsYXNzKSByZXR1cm47XG4gICAgICAgIGxldCBjb2xsaWRlciA9IGNoaWxkLmdldENvbXBvbmVudChDb2xsaWRlckNsYXNzKSBhcyBhbnk7XG4gICAgICAgIGlmICghdGhpcy5nZW5lcmF0ZUNvbGxpZGVyIHx8ICF0aGlzLl9tZXNoKSB7XG4gICAgICAgICAgICBpZiAoY29sbGlkZXIpIGNvbGxpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbGxpZGVyKSBjb2xsaWRlciA9IGNoaWxkLmFkZENvbXBvbmVudChDb2xsaWRlckNsYXNzKTtcbiAgICAgICAgY29sbGlkZXIubWVzaCA9IHRoaXMuX21lc2g7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYWtlUHJvZmlsZSgpOiBQcm9maWxlIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHA6IFByb2ZpbGUgPSB7IHBvaW50czogW10sIG5vcm1hbHM6IFtdLCB1OiBbXSwgZWRnZXM6IFtdLCBjbG9zZWQ6IHRydWUsIHBlcmltZXRlcjogMCB9O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2hhcGUpIHtcbiAgICAgICAgICAgIGNhc2UgRXh0cnVkZVNoYXBlLkNpcmNsZToge1xuICAgICAgICAgICAgICAgIGNvbnN0IG4gPSBNYXRoLm1heCgzLCBNYXRoLnJvdW5kKHRoaXMuc2lkZXMpKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYSA9IChqIC8gbikgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICAgICAgcC5wb2ludHMucHVzaChNYXRoLmNvcyhhKSwgTWF0aC5zaW4oYSkpO1xuICAgICAgICAgICAgICAgICAgICBwLm5vcm1hbHMucHVzaChNYXRoLmNvcyhhKSwgTWF0aC5zaW4oYSkpO1xuICAgICAgICAgICAgICAgICAgICBwLnUucHVzaChqIC8gbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChqIDwgbikgcC5lZGdlcy5wdXNoKGosIGogKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcC5wZXJpbWV0ZXIgPSBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRXh0cnVkZVNoYXBlLlNxdWFyZToge1xuICAgICAgICAgICAgICAgIC8vIENvdW50ZXItY2xvY2t3aXNlIGNvcm5lcnMgaW4gdGhlIChyaWdodCwgdXApIHBsYW5lLCB0d28gdmVydGljZXMgcGVyIHNpZGUgZm9yIGZsYXQgbm9ybWFscy5cbiAgICAgICAgICAgICAgICBjb25zdCBjID0gW1sxLCAtMV0sIFsxLCAxXSwgWy0xLCAxXSwgWy0xLCAtMV1dO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgNDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBjW2tdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0gY1soayArIDEpICUgNF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG54ID0gKGFbMF0gKyBiWzBdKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG55ID0gKGFbMV0gKyBiWzFdKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBwLnBvaW50cy5sZW5ndGggLyAyO1xuICAgICAgICAgICAgICAgICAgICBwLnBvaW50cy5wdXNoKGFbMF0sIGFbMV0sIGJbMF0sIGJbMV0pO1xuICAgICAgICAgICAgICAgICAgICBwLm5vcm1hbHMucHVzaChueCwgbnksIG54LCBueSk7XG4gICAgICAgICAgICAgICAgICAgIHAudS5wdXNoKGsgLyA0LCAoayArIDEpIC8gNCk7XG4gICAgICAgICAgICAgICAgICAgIHAuZWRnZXMucHVzaChpLCBpICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHAucGVyaW1ldGVyID0gODtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRXh0cnVkZVNoYXBlLlJvYWQ6XG4gICAgICAgICAgICAgICAgcC5wb2ludHMucHVzaCgxLCAwLCAtMSwgMCk7XG4gICAgICAgICAgICAgICAgcC5ub3JtYWxzLnB1c2goMCwgMSwgMCwgMSk7XG4gICAgICAgICAgICAgICAgcC51LnB1c2goMCwgMSk7XG4gICAgICAgICAgICAgICAgcC5lZGdlcy5wdXNoKDAsIDEpO1xuICAgICAgICAgICAgICAgIHAuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcC5wZXJpbWV0ZXIgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgY2FzZSBFeHRydWRlU2hhcGUuU3BsaW5lOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNwbGluZVByb2ZpbGUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNwbGluZVByb2ZpbGUoKTogUHJvZmlsZSB8IG51bGwge1xuICAgICAgICBjb25zdCBzOiBTcGxpbmUgfCB1bmRlZmluZWQgPSB0aGlzLnByb2ZpbGU/LnNwbGluZXNbMF07XG4gICAgICAgIGlmICghcyB8fCBzLmNvdW50IDwgMikgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG4gPSBNYXRoLm1heCgyLCBNYXRoLnJvdW5kKHRoaXMucHJvZmlsZVNlZ21lbnRzKSk7XG4gICAgICAgIGNvbnN0IHA6IFByb2ZpbGUgPSB7IHBvaW50czogW10sIG5vcm1hbHM6IFtdLCB1OiBbXSwgZWRnZXM6IFtdLCBjbG9zZWQ6IHMuY2xvc2VkLCBwZXJpbWV0ZXI6IDAgfTtcbiAgICAgICAgY29uc3QgcHRzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHtcbiAgICAgICAgICAgIHMuZXZhbHVhdGVQb3NpdGlvbihqIC8gbiwgX3ApO1xuICAgICAgICAgICAgcHRzLnB1c2goX3AueCwgX3AueSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2NhbGUgc28gdGhlIHByb2ZpbGUgZml0cyBhIHVuaXQgcmFkaXVzICh0aGUgcmFkaXVzIHNldHRpbmcgc2l6ZXMgaXQpLlxuICAgICAgICBsZXQgZXh0ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCB2IG9mIHB0cykgZXh0ID0gTWF0aC5tYXgoZXh0LCBNYXRoLmFicyh2KSk7XG4gICAgICAgIGNvbnN0IGsgPSBleHQgPiAwID8gMSAvIGV4dCA6IDE7XG4gICAgICAgIGxldCBkaXN0ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gbjsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gcHRzW2ogKiAyXSAqIGs7XG4gICAgICAgICAgICBjb25zdCB5ID0gcHRzW2ogKiAyICsgMV0gKiBrO1xuICAgICAgICAgICAgaWYgKGogPiAwKSBkaXN0ICs9IE1hdGguaHlwb3QoeCAtIHB0c1tqICogMiAtIDJdICogaywgeSAtIHB0c1tqICogMiAtIDFdICogayk7XG4gICAgICAgICAgICBzLmV2YWx1YXRlRGlyZWN0aW9uKGogLyBuLCBfZik7XG4gICAgICAgICAgICAvLyBOb3JtYWw6IHRoZSBkaXJlY3Rpb24gdHVybmVkIC05MCBkZWdyZWVzIChvdXR3YXJkIGZvciBjb3VudGVyLWNsb2Nrd2lzZSBwcm9maWxlcykuXG4gICAgICAgICAgICBjb25zdCBsID0gTWF0aC5oeXBvdChfZi54LCBfZi55KSB8fCAxO1xuICAgICAgICAgICAgcC5wb2ludHMucHVzaCh4LCB5KTtcbiAgICAgICAgICAgIHAubm9ybWFscy5wdXNoKF9mLnkgLyBsLCAtX2YueCAvIGwpO1xuICAgICAgICAgICAgcC51LnB1c2goMCk7XG4gICAgICAgICAgICBpZiAoaiA8IG4pIHAuZWRnZXMucHVzaChqLCBqICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gbjsgaisrKSBwLnVbal0gPSAoaiAvIG4pO1xuICAgICAgICBwLnBlcmltZXRlciA9IGRpc3Q7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRHZW9tZXRyeSgpOiB7IHBvc2l0aW9uczogbnVtYmVyW107IG5vcm1hbHM6IG51bWJlcltdOyB1dnM6IG51bWJlcltdOyBpbmRpY2VzOiBudW1iZXJbXTsgbWluUG9zOiBWZWMzOyBtYXhQb3M6IFZlYzMgfSB8IG51bGwge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGlmICghYyB8fCAhYy5pc1ZhbGlkKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgcHJvZmlsZSA9IHRoaXMubWFrZVByb2ZpbGUoKTtcbiAgICAgICAgaWYgKCFwcm9maWxlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBjb25zdCBub3JtYWxzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBjb25zdCB1dnM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IGluZGljZXM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IG1pbiA9IG5ldyBWZWMzKEluZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHkpO1xuICAgICAgICBjb25zdCBtYXggPSBuZXcgVmVjMygtSW5maW5pdHksIC1JbmZpbml0eSwgLUluZmluaXR5KTtcblxuICAgICAgICAvLyBDb250YWluZXIgc3BhY2UgdG8gdGhpcyBub2RlJ3Mgc3BhY2UuXG4gICAgICAgIGNvbnN0IHNhbWVOb2RlID0gYy5ub2RlID09PSB0aGlzLm5vZGU7XG4gICAgICAgIGlmICghc2FtZU5vZGUpIHtcbiAgICAgICAgICAgIE1hdDQuaW52ZXJ0KF9tLCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICAgICAgTWF0NC5tdWx0aXBseShfbSwgX20sIGMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcjAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBNYXRoLm1pbih0aGlzLnJhbmdlLngsIHRoaXMucmFuZ2UueSkpKTtcbiAgICAgICAgY29uc3QgcjEgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBNYXRoLm1heCh0aGlzLnJhbmdlLngsIHRoaXMucmFuZ2UueSkpKTtcbiAgICAgICAgaWYgKHIxIC0gcjAgPD0gMWUtNikgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgICAgICBjb25zdCBwYyA9IHByb2ZpbGUucG9pbnRzLmxlbmd0aCAvIDI7XG5cbiAgICAgICAgY29uc3QgYWRkVmVydGV4ID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIG54OiBudW1iZXIsIG55OiBudW1iZXIsIG56OiBudW1iZXIsIHU6IG51bWJlciwgdjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBwb3NpdGlvbnMucHVzaCh4LCB5LCB6KTtcbiAgICAgICAgICAgIG5vcm1hbHMucHVzaCh0aGlzLmZsaXBOb3JtYWxzID8gLW54IDogbngsIHRoaXMuZmxpcE5vcm1hbHMgPyAtbnkgOiBueSwgdGhpcy5mbGlwTm9ybWFscyA/IC1ueiA6IG56KTtcbiAgICAgICAgICAgIHV2cy5wdXNoKHUsIHYpO1xuICAgICAgICAgICAgaWYgKHggPCBtaW4ueCkgbWluLnggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPCBtaW4ueSkgbWluLnkgPSB5O1xuICAgICAgICAgICAgaWYgKHogPCBtaW4ueikgbWluLnogPSB6O1xuICAgICAgICAgICAgaWYgKHggPiBtYXgueCkgbWF4LnggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPiBtYXgueSkgbWF4LnkgPSB5O1xuICAgICAgICAgICAgaWYgKHogPiBtYXgueikgbWF4LnogPSB6O1xuICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9ucy5sZW5ndGggLyAzIC0gMTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdHJpID0gKGE6IG51bWJlciwgYjogbnVtYmVyLCBjYzogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5mbGlwTm9ybWFscykgaW5kaWNlcy5wdXNoKGEsIGNjLCBiKTtcbiAgICAgICAgICAgIGVsc2UgaW5kaWNlcy5wdXNoKGEsIGIsIGNjKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgYy5zcGxpbmVzKSB7XG4gICAgICAgICAgICBpZiAocy5jb3VudCA8IDIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gcy5nZXRMZW5ndGgoKTtcbiAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMWUtNikgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbChsZW5ndGggKiAocjEgLSByMCkgKiB0aGlzLnNlZ21lbnRzUGVyVW5pdCkpO1xuICAgICAgICAgICAgY29uc3QgbG9vcCA9IHMuY2xvc2VkICYmIHIwIDw9IDAgJiYgcjEgPj0gMTtcbiAgICAgICAgICAgIGNvbnN0IGJhc2UgPSBwb3NpdGlvbnMubGVuZ3RoIC8gMztcbiAgICAgICAgICAgIGNvbnN0IHJpbmdGcmFtZXM6IHsgcDogVmVjMzsgZjogVmVjMzsgdTogVmVjMzsgcjogVmVjMyB9W10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHRleFNjYWxlID0gMSAvIE1hdGgubWF4KDFlLTYsIHJhZGl1cyAqIHByb2ZpbGUucGVyaW1ldGVyKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2VnbWVudHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHQgPSByMCArICgocjEgLSByMCkgKiBpKSAvIHNlZ21lbnRzO1xuICAgICAgICAgICAgICAgIHMuZXZhbHVhdGVQb3NpdGlvbih0LCBfcCk7XG4gICAgICAgICAgICAgICAgcy5ldmFsdWF0ZURpcmVjdGlvbih0LCBfZik7XG4gICAgICAgICAgICAgICAgcy5ldmFsdWF0ZVVwVmVjdG9yKHQsIF91KTtcbiAgICAgICAgICAgICAgICBpZiAoIXNhbWVOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChfcCwgX3AsIF9tKTtcbiAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0Tm9ybWFsKF9mLCBfZiwgX20pLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDROb3JtYWwoX3UsIF91LCBfbSkubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFZlYzMuY3Jvc3MoX3IsIF91LCBfZikubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgVmVjMy5jcm9zcyhfdSwgX2YsIF9yKS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICByaW5nRnJhbWVzLnB1c2goeyBwOiBfcC5jbG9uZSgpLCBmOiBfZi5jbG9uZSgpLCB1OiBfdS5jbG9uZSgpLCByOiBfci5jbG9uZSgpIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHYgPSAobGVuZ3RoICogKHQgLSByMCkpICogdGV4U2NhbGU7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHB4ID0gcHJvZmlsZS5wb2ludHNbaiAqIDJdICogcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBweSA9IHByb2ZpbGUucG9pbnRzW2ogKiAyICsgMV0gKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG54ID0gcHJvZmlsZS5ub3JtYWxzW2ogKiAyXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnkgPSBwcm9maWxlLm5vcm1hbHNbaiAqIDIgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgYWRkVmVydGV4KFxuICAgICAgICAgICAgICAgICAgICAgICAgX3AueCArIF9yLnggKiBweCArIF91LnggKiBweSwgX3AueSArIF9yLnkgKiBweCArIF91LnkgKiBweSwgX3AueiArIF9yLnogKiBweCArIF91LnogKiBweSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yLnggKiBueCArIF91LnggKiBueSwgX3IueSAqIG54ICsgX3UueSAqIG55LCBfci56ICogbnggKyBfdS56ICogbnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlLnVbal0sIHYsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmEgPSBiYXNlICsgaSAqIHBjO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJiID0gYmFzZSArIChpICsgMSkgKiBwYztcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlID0gMDsgZSA8IHByb2ZpbGUuZWRnZXMubGVuZ3RoOyBlICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYSA9IHByb2ZpbGUuZWRnZXNbZV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSBwcm9maWxlLmVkZ2VzW2UgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgdHJpKHJhICsgYSwgcmEgKyBiLCByYiArIGEpO1xuICAgICAgICAgICAgICAgICAgICB0cmkocmEgKyBiLCByYiArIGIsIHJiICsgYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY2FwcGVkICYmIHByb2ZpbGUuY2xvc2VkICYmICFsb29wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXAocmluZ0ZyYW1lc1swXSwgcHJvZmlsZSwgcmFkaXVzLCB0cnVlLCBhZGRWZXJ0ZXgsIHRyaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXAocmluZ0ZyYW1lc1tyaW5nRnJhbWVzLmxlbmd0aCAtIDFdLCBwcm9maWxlLCByYWRpdXMsIGZhbHNlLCBhZGRWZXJ0ZXgsIHRyaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpbmRpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB7IHBvc2l0aW9ucywgbm9ybWFscywgdXZzLCBpbmRpY2VzLCBtaW5Qb3M6IG1pbiwgbWF4UG9zOiBtYXggfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZENhcChcbiAgICAgICAgZnJhbWU6IHsgcDogVmVjMzsgZjogVmVjMzsgdTogVmVjMzsgcjogVmVjMyB9LFxuICAgICAgICBwcm9maWxlOiBQcm9maWxlLFxuICAgICAgICByYWRpdXM6IG51bWJlcixcbiAgICAgICAgc3RhcnQ6IGJvb2xlYW4sXG4gICAgICAgIGFkZFZlcnRleDogKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIG54OiBudW1iZXIsIG55OiBudW1iZXIsIG56OiBudW1iZXIsIHU6IG51bWJlciwgdjogbnVtYmVyKSA9PiBudW1iZXIsXG4gICAgICAgIHRyaTogKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIpID0+IHZvaWQsXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHsgcCwgZiwgdSwgciB9ID0gZnJhbWU7XG4gICAgICAgIGNvbnN0IHMgPSBzdGFydCA/IC0xIDogMTtcbiAgICAgICAgY29uc3QgY2VudGVyID0gYWRkVmVydGV4KHAueCwgcC55LCBwLnosIGYueCAqIHMsIGYueSAqIHMsIGYueiAqIHMsIDAuNSwgMC41KTtcbiAgICAgICAgY29uc3QgaWRzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBjb25zdCBwYyA9IHByb2ZpbGUucG9pbnRzLmxlbmd0aCAvIDI7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGM7IGorKykge1xuICAgICAgICAgICAgY29uc3QgcHggPSBwcm9maWxlLnBvaW50c1tqICogMl07XG4gICAgICAgICAgICBjb25zdCBweSA9IHByb2ZpbGUucG9pbnRzW2ogKiAyICsgMV07XG4gICAgICAgICAgICBpZHMucHVzaChhZGRWZXJ0ZXgoXG4gICAgICAgICAgICAgICAgcC54ICsgci54ICogcHggKiByYWRpdXMgKyB1LnggKiBweSAqIHJhZGl1cyxcbiAgICAgICAgICAgICAgICBwLnkgKyByLnkgKiBweCAqIHJhZGl1cyArIHUueSAqIHB5ICogcmFkaXVzLFxuICAgICAgICAgICAgICAgIHAueiArIHIueiAqIHB4ICogcmFkaXVzICsgdS56ICogcHkgKiByYWRpdXMsXG4gICAgICAgICAgICAgICAgZi54ICogcywgZi55ICogcywgZi56ICogcyxcbiAgICAgICAgICAgICAgICBweCAqIDAuNSArIDAuNSwgcHkgKiAwLjUgKyAwLjUsXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBlID0gMDsgZSA8IHByb2ZpbGUuZWRnZXMubGVuZ3RoOyBlICs9IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSBpZHNbcHJvZmlsZS5lZGdlc1tlXV07XG4gICAgICAgICAgICBjb25zdCBiID0gaWRzW3Byb2ZpbGUuZWRnZXNbZSArIDFdXTtcbiAgICAgICAgICAgIC8vIENvdW50ZXItY2xvY2t3aXNlIHByb2ZpbGUgZWRnZXMgZmFjZSArZm9yd2FyZDsgdGhlIHN0YXJ0IGNhcCBmYWNlcyBiYWNrLlxuICAgICAgICAgICAgaWYgKHN0YXJ0KSB0cmkoY2VudGVyLCBiLCBhKTtcbiAgICAgICAgICAgIGVsc2UgdHJpKGNlbnRlciwgYSwgYik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBjY2VudW0sIENDT2JqZWN0LCBpbnN0YW50aWF0ZSwgTm9kZSwgUHJlZmFiLCBRdWF0LCBWZWMyLCBWZWMzIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRURJVE9SIH0gZnJvbSAnY2MvZW52JztcbmltcG9ydCB7IFNwbGluZUNvbnRhaW5lciB9IGZyb20gJy4vU3BsaW5lQ29udGFpbmVyJztcbmltcG9ydCB7IEFsaWduQXhpcyB9IGZyb20gJy4vU3BsaW5lQW5pbWF0ZSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGVJbkVkaXRNb2RlLCBtZW51IH0gPSBfZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBJbnN0YW50aWF0ZU1ldGhvZCB7XG4gICAgLyoqIEEgc2V0IG51bWJlciBvZiBpbnN0YW5jZXMsIHNwcmVhZCBldmVubHkuICovXG4gICAgSW5zdGFuY2VDb3VudCA9IDAsXG4gICAgLyoqIEEgZGlzdGFuY2UgYWxvbmcgdGhlIHNwbGluZSBiZXR3ZWVuIGluc3RhbmNlcy4gKi9cbiAgICBTcGFjaW5nRGlzdGFuY2UgPSAxLFxuICAgIC8qKiBBIHN0cmFpZ2h0LWxpbmUgZGlzdGFuY2UgYmV0d2VlbiBpbnN0YW5jZXMuICovXG4gICAgTGluZWFyRGlzdGFuY2UgPSAyLFxufVxuXG5leHBvcnQgZW51bSBJbnN0YW50aWF0ZVNwYWNlIHtcbiAgICAvKiogT3JpZW50IGluc3RhbmNlcyBhbG9uZyB0aGUgc3BsaW5lLiAqL1xuICAgIFNwbGluZSA9IDAsXG4gICAgLyoqIE9yaWVudCBpbnN0YW5jZXMgbGlrZSB0aGUgc3BsaW5lIGNvbnRhaW5lciBub2RlLiAqL1xuICAgIFNwbGluZU9iamVjdCA9IDEsXG4gICAgLyoqIE9yaWVudCBpbnN0YW5jZXMgdG8gdGhlIHdvcmxkIGF4ZXMuICovXG4gICAgV29ybGQgPSAyLFxufVxuXG5leHBvcnQgZW51bSBPZmZzZXRTcGFjZSB7XG4gICAgU3BsaW5lID0gMCxcbiAgICBTcGxpbmVPYmplY3QgPSAxLFxuICAgIFdvcmxkID0gMixcbiAgICAvKiogVGhlIGluc3RhbmNlJ3Mgb3duIGF4ZXMuICovXG4gICAgT2JqZWN0ID0gMyxcbn1cblxuY2NlbnVtKEluc3RhbnRpYXRlTWV0aG9kKTtcbmNjZW51bShJbnN0YW50aWF0ZVNwYWNlKTtcbmNjZW51bShPZmZzZXRTcGFjZSk7XG5cbkBjY2NsYXNzKCdzcGxpbmVzLkluc3RhbnRpYWJsZUl0ZW0nKVxuZXhwb3J0IGNsYXNzIEluc3RhbnRpYWJsZUl0ZW0ge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFByZWZhYiwgdG9vbHRpcDogJ1ByZWZhYiB0byBwbGFjZS4nIH0pXG4gICAgcHJlZmFiOiBQcmVmYWIgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHJhbmdlOiBbMCwgMTAwLCAxXSwgc2xpZGU6IHRydWUsIHRvb2x0aXA6ICdSZWxhdGl2ZSBjaGFuY2Ugb2YgcGlja2luZyB0aGlzIHByZWZhYiAoJSkuJyB9KVxuICAgIHByb2JhYmlsaXR5ID0gMTAwO1xufVxuXG4vKiogQSBtaW4vbWF4IHJhbmdlIHBlciBheGlzOyBheGVzIHdpdGhvdXQgYHJhbmRvbWAgdXNlIG1pbi4gKi9cbkBjY2NsYXNzKCdzcGxpbmVzLkluc3RhbnRpYXRlT2Zmc2V0JylcbmV4cG9ydCBjbGFzcyBJbnN0YW50aWF0ZU9mZnNldCB7XG4gICAgQHByb3BlcnR5XG4gICAgbWluID0gbmV3IFZlYzMoKTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIG1heCA9IG5ldyBWZWMzKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUGljayBYIGF0IHJhbmRvbSBiZXR3ZWVuIG1pbiBhbmQgbWF4LicgfSlcbiAgICByYW5kb21YID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUGljayBZIGF0IHJhbmRvbSBiZXR3ZWVuIG1pbiBhbmQgbWF4LicgfSlcbiAgICByYW5kb21ZID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUGljayBaIGF0IHJhbmRvbSBiZXR3ZWVuIG1pbiBhbmQgbWF4LicgfSlcbiAgICByYW5kb21aID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBPZmZzZXRTcGFjZSwgdG9vbHRpcDogJ0F4ZXMgdGhlIG9mZnNldCBpcyBhcHBsaWVkIGFsb25nLicgfSlcbiAgICBzcGFjZSA9IE9mZnNldFNwYWNlLlNwbGluZTtcblxuICAgIGNvbnN0cnVjdG9yKHNwYWNlID0gT2Zmc2V0U3BhY2UuU3BsaW5lKSB7XG4gICAgICAgIHRoaXMuc3BhY2UgPSBzcGFjZTtcbiAgICB9XG5cbiAgICBnZXQgaXNaZXJvKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5taW4uZXF1YWxzKFZlYzMuWkVSTykgJiYgdGhpcy5tYXguZXF1YWxzKFZlYzMuWkVSTyk7XG4gICAgfVxuXG4gICAgbmV4dChyYW5kOiAoKSA9PiBudW1iZXIsIG91dDogVmVjMyk6IFZlYzMge1xuICAgICAgICBjb25zdCBwaWNrID0gKGxvOiBudW1iZXIsIGhpOiBudW1iZXIsIHJhbmRvbTogYm9vbGVhbikgPT4gKHJhbmRvbSA/IGxvICsgKGhpIC0gbG8pICogcmFuZCgpIDogbG8pO1xuICAgICAgICByZXR1cm4gb3V0LnNldChcbiAgICAgICAgICAgIHBpY2sodGhpcy5taW4ueCwgdGhpcy5tYXgueCwgdGhpcy5yYW5kb21YKSxcbiAgICAgICAgICAgIHBpY2sodGhpcy5taW4ueSwgdGhpcy5tYXgueSwgdGhpcy5yYW5kb21ZKSxcbiAgICAgICAgICAgIHBpY2sodGhpcy5taW4ueiwgdGhpcy5tYXgueiwgdGhpcy5yYW5kb21aKSxcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IEFYRVMgPSBbXG4gICAgbmV3IFZlYzMoMSwgMCwgMCksIG5ldyBWZWMzKDAsIDEsIDApLCBuZXcgVmVjMygwLCAwLCAxKSxcbiAgICBuZXcgVmVjMygtMSwgMCwgMCksIG5ldyBWZWMzKDAsIC0xLCAwKSwgbmV3IFZlYzMoMCwgMCwgLTEpLFxuXTtcblxuY29uc3QgR0VORVJBVEVEX0ZMQUdTID0gQ0NPYmplY3QuRmxhZ3MuRG9udFNhdmUgfCBDQ09iamVjdC5GbGFncy5IaWRlSW5IaWVyYXJjaHkgfCBDQ09iamVjdC5GbGFncy5Mb2NrZWRJbkVkaXRvcjtcbmNvbnN0IFJPT1RfTkFNRSA9ICdfX1NwbGluZUluc3RhbmNlcyc7XG5cbi8qKiBTbWFsbCBkZXRlcm1pbmlzdGljIFBSTkcgKG11bGJlcnJ5MzIpLiAqL1xuZnVuY3Rpb24gcm5nKHNlZWQ6IG51bWJlcik6ICgpID0+IG51bWJlciB7XG4gICAgbGV0IGEgPSBzZWVkID4+PiAwO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGEgPSAoYSArIDB4NmQyYjc5ZjUpID4+PiAwO1xuICAgICAgICBsZXQgdCA9IGE7XG4gICAgICAgIHQgPSBNYXRoLmltdWwodCBeICh0ID4+PiAxNSksIHQgfCAxKTtcbiAgICAgICAgdCBePSB0ICsgTWF0aC5pbXVsKHQgXiAodCA+Pj4gNyksIHQgfCA2MSk7XG4gICAgICAgIHJldHVybiAoKHQgXiAodCA+Pj4gMTQpKSA+Pj4gMCkgLyA0Mjk0OTY3Mjk2O1xuICAgIH07XG59XG5cbmNvbnN0IF9wID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9mID0gbmV3IFZlYzMoKTtcbmNvbnN0IF91ID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9yID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9xID0gbmV3IFF1YXQoKTtcbmNvbnN0IF9xMiA9IG5ldyBRdWF0KCk7XG5jb25zdCBfb2ZmID0gbmV3IFZlYzMoKTtcblxuZnVuY3Rpb24gbG9va1JvdGF0aW9uKG91dDogUXVhdCwgZm9yd2FyZDogUmVhZG9ubHk8VmVjMz4sIHVwOiBSZWFkb25seTxWZWMzPik6IFF1YXQge1xuICAgIHJldHVybiBRdWF0LmZyb21WaWV3VXAob3V0LCBWZWMzLm5vcm1hbGl6ZShuZXcgVmVjMygpLCBmb3J3YXJkKSwgVmVjMy5ub3JtYWxpemUobmV3IFZlYzMoKSwgdXApKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbGFjZW1lbnQge1xuICAgIHNwbGluZTogbnVtYmVyO1xuICAgIHQ6IG51bWJlcjtcbiAgICBpdGVtOiBudW1iZXI7XG4gICAgcG9zaXRpb246IFZlYzM7XG4gICAgcm90YXRpb246IFF1YXQ7XG4gICAgc2NhbGU6IFZlYzM7XG59XG5cbi8qKlxuICogUGxhY2VzIHByZWZhYiBpbnN0YW5jZXMgYWxvbmcgdGhlIHNwbGluZXMgb2YgYSBjb250YWluZXIgKFVuaXR5J3NcbiAqIFNwbGluZUluc3RhbnRpYXRlKS4gSW5zdGFuY2VzIGFyZSBnZW5lcmF0ZWQgKG5vdCBzYXZlZCB3aXRoIHRoZSBzY2VuZSkgYW5kXG4gKiByZWJ1aWx0IHdoZW4gdGhlIHNwbGluZSBvciBhIHNldHRpbmcgY2hhbmdlcy4gVXNlIEJha2UgaW4gdGhlIEluc3BlY3RvciB0b1xuICogdHVybiB0aGVtIGludG8gcmVndWxhciBub2Rlcy5cbiAqL1xuQGNjY2xhc3MoJ1NwbGluZUluc3RhbnRpYXRlJylcbkBleGVjdXRlSW5FZGl0TW9kZVxuQG1lbnUoJ1NwbGluZXMvU3BsaW5lSW5zdGFudGlhdGUnKVxuZXhwb3J0IGNsYXNzIFNwbGluZUluc3RhbnRpYXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVDb250YWluZXIsIHRvb2x0aXA6ICdUaGUgc3BsaW5lcyB0byBwbGFjZSBpbnN0YW5jZXMgYWxvbmcgKGFsbCBzcGxpbmVzIG9mIHRoZSBjb250YWluZXIpLicgfSlcbiAgICBjb250YWluZXI6IFNwbGluZUNvbnRhaW5lciB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW0luc3RhbnRpYWJsZUl0ZW1dLCB0b29sdGlwOiAnUHJlZmFicyB0byBwbGFjZSwgcGlja2VkIGF0IHJhbmRvbSBieSBwcm9iYWJpbGl0eS4nIH0pXG4gICAgaXRlbXM6IEluc3RhbnRpYWJsZUl0ZW1bXSA9IFtuZXcgSW5zdGFudGlhYmxlSXRlbSgpXTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEluc3RhbnRpYXRlTWV0aG9kLCB0b29sdGlwOiAnSG93IGluc3RhbmNlcyBhcmUgc3BhY2VkLicgfSlcbiAgICBtZXRob2QgPSBJbnN0YW50aWF0ZU1ldGhvZC5TcGFjaW5nRGlzdGFuY2U7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnTnVtYmVyIG9mIGluc3RhbmNlcyBwZXIgc3BsaW5lIChyYW5kb20gYmV0d2VlbiB4IGFuZCB5KS4nLCB2aXNpYmxlKHRoaXM6IFNwbGluZUluc3RhbnRpYXRlKSB7IHJldHVybiB0aGlzLm1ldGhvZCA9PT0gSW5zdGFudGlhdGVNZXRob2QuSW5zdGFuY2VDb3VudDsgfSB9KVxuICAgIGNvdW50ID0gbmV3IFZlYzIoMTAsIDEwKTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdEaXN0YW5jZSBiZXR3ZWVuIGluc3RhbmNlcyAocmFuZG9tIGJldHdlZW4geCBhbmQgeSkuJywgdmlzaWJsZSh0aGlzOiBTcGxpbmVJbnN0YW50aWF0ZSkgeyByZXR1cm4gdGhpcy5tZXRob2QgIT09IEluc3RhbnRpYXRlTWV0aG9kLkluc3RhbmNlQ291bnQ7IH0gfSlcbiAgICBzcGFjaW5nID0gbmV3IFZlYzIoMSwgMSk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBJbnN0YW50aWF0ZVNwYWNlLCB0b29sdGlwOiAnQXhlcyB0aGUgaW5zdGFuY2VzIGFyZSBvcmllbnRlZCB0by4nIH0pXG4gICAgc3BhY2UgPSBJbnN0YW50aWF0ZVNwYWNlLlNwbGluZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEFsaWduQXhpcywgdG9vbHRpcDogJ0luc3RhbmNlIGF4aXMgdGhhdCBwb2ludHMgdXAuJyB9KVxuICAgIHVwQXhpcyA9IEFsaWduQXhpcy5ZQXhpcztcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEFsaWduQXhpcywgdG9vbHRpcDogJ0luc3RhbmNlIGF4aXMgdGhhdCBwb2ludHMgZm9yd2FyZCAoYWxvbmcgdGhlIHNwbGluZSkuJyB9KVxuICAgIGZvcndhcmRBeGlzID0gQWxpZ25BeGlzLlpBeGlzO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogSW5zdGFudGlhdGVPZmZzZXQsIHRvb2x0aXA6ICdQb3NpdGlvbiBvZmZzZXQuJyB9KVxuICAgIHBvc2l0aW9uT2Zmc2V0ID0gbmV3IEluc3RhbnRpYXRlT2Zmc2V0KCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBJbnN0YW50aWF0ZU9mZnNldCwgdG9vbHRpcDogJ1JvdGF0aW9uIG9mZnNldCAoRXVsZXIgYW5nbGVzLCBkZWdyZWVzKS4nIH0pXG4gICAgcm90YXRpb25PZmZzZXQgPSBuZXcgSW5zdGFudGlhdGVPZmZzZXQoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEluc3RhbnRpYXRlT2Zmc2V0LCB0b29sdGlwOiAnU2NhbGUgb2Zmc2V0IChhZGRlZCB0byB0aGUgcHJlZmFiXHUyMDE5cyBzY2FsZSkuJyB9KVxuICAgIHNjYWxlT2Zmc2V0ID0gbmV3IEluc3RhbnRpYXRlT2Zmc2V0KE9mZnNldFNwYWNlLk9iamVjdCk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUmVidWlsZCB3aGVuIHRoZSBzcGxpbmUgb3IgYSBzZXR0aW5nIGNoYW5nZXMuJyB9KVxuICAgIGF1dG9SZWZyZXNoID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdSYW5kb20gc2VlZC4nLCBzdGVwOiAxIH0pXG4gICAgc2VlZCA9IDA7XG5cbiAgICBwcml2YXRlIF9yb290OiBOb2RlIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfc3RhbXAgPSBOYU47XG4gICAgcHJpdmF0ZSBfaW5zdGFuY2VzOiBOb2RlW10gPSBbXTtcblxuICAgIC8qKiBUaGUgZ2VuZXJhdGVkIGluc3RhbmNlcy4gKi9cbiAgICBnZXQgaW5zdGFuY2VzKCk6IHJlYWRvbmx5IE5vZGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZXM7XG4gICAgfVxuXG4gICAgcmVzZXRJbkVkaXRvcigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmdldENvbXBvbmVudChTcGxpbmVDb250YWluZXIpO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lcikgdGhpcy5jb250YWluZXIgPSB0aGlzLmdldENvbXBvbmVudChTcGxpbmVDb250YWluZXIpO1xuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUluc3RhbmNlcygpO1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBpZiAodGhpcy5fcm9vdD8uaXNWYWxpZCkgdGhpcy5fcm9vdC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX3Jvb3QgPSBudWxsO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmF1dG9SZWZyZXNoKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmNvbXB1dGVTdGFtcCgpICE9PSB0aGlzLl9zdGFtcCkgdGhpcy51cGRhdGVJbnN0YW5jZXMoKTtcbiAgICB9XG5cbiAgICAvKiogUGlja3MgYSBuZXcgcmFuZG9tIHNlZWQgYW5kIHJlYnVpbGRzLiAqL1xuICAgIHJhbmRvbWl6ZVNlZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VlZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDFlNik7XG4gICAgICAgIHRoaXMudXBkYXRlSW5zdGFuY2VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wdXRlU3RhbXAoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBsZXQgaCA9IGMgJiYgYy5pc1ZhbGlkID8gYy5jaGFuZ2VTdGFtcCA6IDA7XG4gICAgICAgIGNvbnN0IG1peCA9ICh2OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGggPSBNYXRoLmltdWwoaCBeIE1hdGgucm91bmQodiAqIDFlNCksIDE2Nzc3NjE5KTtcbiAgICAgICAgfTtcbiAgICAgICAgbWl4KHRoaXMubWV0aG9kKTtcbiAgICAgICAgbWl4KHRoaXMuY291bnQueCk7XG4gICAgICAgIG1peCh0aGlzLmNvdW50LnkpO1xuICAgICAgICBtaXgodGhpcy5zcGFjaW5nLngpO1xuICAgICAgICBtaXgodGhpcy5zcGFjaW5nLnkpO1xuICAgICAgICBtaXgodGhpcy5zcGFjZSk7XG4gICAgICAgIG1peCh0aGlzLnVwQXhpcyk7XG4gICAgICAgIG1peCh0aGlzLmZvcndhcmRBeGlzKTtcbiAgICAgICAgbWl4KHRoaXMuc2VlZCk7XG4gICAgICAgIGZvciAoY29uc3QgbyBvZiBbdGhpcy5wb3NpdGlvbk9mZnNldCwgdGhpcy5yb3RhdGlvbk9mZnNldCwgdGhpcy5zY2FsZU9mZnNldF0pIHtcbiAgICAgICAgICAgIG1peChvLm1pbi54KTsgbWl4KG8ubWluLnkpOyBtaXgoby5taW4ueik7XG4gICAgICAgICAgICBtaXgoby5tYXgueCk7IG1peChvLm1heC55KTsgbWl4KG8ubWF4LnopO1xuICAgICAgICAgICAgbWl4KChvLnJhbmRvbVggPyAxIDogMCkgfCAoby5yYW5kb21ZID8gMiA6IDApIHwgKG8ucmFuZG9tWiA/IDQgOiAwKSk7XG4gICAgICAgICAgICBtaXgoby5zcGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgbWl4KHRoaXMuaXRlbXMubGVuZ3RoKTtcbiAgICAgICAgZm9yIChjb25zdCBpdCBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICBtaXgoaXQucHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSBpdC5wcmVmYWIgPyBTdHJpbmcoKGl0LnByZWZhYiBhcyBhbnkpLl91dWlkIHx8IGl0LnByZWZhYi5uYW1lIHx8ICdwcmVmYWInKSA6ICcnO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZC5sZW5ndGg7IGkrKykgbWl4KGlkLmNoYXJDb2RlQXQoaSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjICYmIGMuaXNWYWxpZCkge1xuICAgICAgICAgICAgY29uc3QgbSA9IGMubm9kZS53b3JsZE1hdHJpeDtcbiAgICAgICAgICAgIG1peChtLm0xMik7IG1peChtLm0xMyk7IG1peChtLm0xNCk7IG1peChtLm0wMCk7IG1peChtLm0wNSk7IG1peChtLm0xMCk7IG1peChtLm0wMSk7IG1peChtLm0wMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGg7XG4gICAgfVxuXG4gICAgLyoqIFJlbW92ZXMgdGhlIGdlbmVyYXRlZCBpbnN0YW5jZXMuICovXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgbiBvZiB0aGlzLl9pbnN0YW5jZXMpIGlmIChuLmlzVmFsaWQpIG4uZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXMubGVuZ3RoID0gMDtcbiAgICAgICAgaWYgKHRoaXMuX3Jvb3Q/LmlzVmFsaWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbiBvZiBbLi4udGhpcy5fcm9vdC5jaGlsZHJlbl0pIG4uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbnN1cmVSb290KCk6IE5vZGUge1xuICAgICAgICBpZiAodGhpcy5fcm9vdCAmJiB0aGlzLl9yb290LmlzVmFsaWQgJiYgdGhpcy5fcm9vdC5wYXJlbnQgPT09IHRoaXMubm9kZSkgcmV0dXJuIHRoaXMuX3Jvb3Q7XG4gICAgICAgIGxldCByb290ID0gdGhpcy5ub2RlLmNoaWxkcmVuLmZpbmQoKG4pID0+IG4ubmFtZSA9PT0gUk9PVF9OQU1FICYmIChuIGFzIGFueSkuX29iakZsYWdzICYgQ0NPYmplY3QuRmxhZ3MuRG9udFNhdmUpIHx8IG51bGw7XG4gICAgICAgIGlmICghcm9vdCkge1xuICAgICAgICAgICAgcm9vdCA9IG5ldyBOb2RlKFJPT1RfTkFNRSk7XG4gICAgICAgICAgICAocm9vdCBhcyBhbnkpLl9vYmpGbGFncyB8PSBHRU5FUkFURURfRkxBR1M7XG4gICAgICAgICAgICByb290LnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yb290ID0gcm9vdDtcbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuXG4gICAgLyoqIFdoZXJlIGluc3RhbmNlcyBnbzogcG9zaXRpb25zLCByb3RhdGlvbnMgYW5kIHNjYWxlcyAod29ybGQgc3BhY2UpIGFuZCB3aGljaCBpdGVtLiAqL1xuICAgIGNvbXB1dGVQbGFjZW1lbnRzKCk6IFBsYWNlbWVudFtdIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCByZXM6IFBsYWNlbWVudFtdID0gW107XG4gICAgICAgIGlmICghYyB8fCAhYy5pc1ZhbGlkKSByZXR1cm4gcmVzO1xuICAgICAgICBjb25zdCB3ZWlnaHRzID0gdGhpcy5pdGVtcy5tYXAoKGl0KSA9PiAoaXQucHJlZmFiID8gTWF0aC5tYXgoMCwgaXQucHJvYmFiaWxpdHkpIDogMCkpO1xuICAgICAgICBjb25zdCB0b3RhbCA9IHdlaWdodHMucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG4gICAgICAgIGlmICh0b3RhbCA8PSAwKSByZXR1cm4gcmVzO1xuICAgICAgICBjb25zdCByYW5kID0gcm5nKHRoaXMuc2VlZCAqIDc5MTkgKyAxKTtcbiAgICAgICAgY29uc3QgcGlja0l0ZW0gPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgciA9IHJhbmQoKSAqIHRvdGFsO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWlnaHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgciAtPSB3ZWlnaHRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChyIDwgMCAmJiB3ZWlnaHRzW2ldID4gMCkgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd2VpZ2h0cy5maW5kSW5kZXgoKHcpID0+IHcgPiAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZndkQXhpcyA9IEFYRVNbdGhpcy5mb3J3YXJkQXhpc10gPz8gQVhFU1syXTtcbiAgICAgICAgbGV0IHVwQXhpcyA9IEFYRVNbdGhpcy51cEF4aXNdID8/IEFYRVNbMV07XG4gICAgICAgIGlmIChNYXRoLmFicyhWZWMzLmRvdChmd2RBeGlzLCB1cEF4aXMpKSA+IDAuOTkpIHVwQXhpcyA9IE1hdGguYWJzKGZ3ZEF4aXMueSkgPiAwLjk5ID8gQVhFU1syXSA6IEFYRVNbMV07XG4gICAgICAgIGNvbnN0IHJlbWFwID0gUXVhdC5pbnZlcnQobmV3IFF1YXQoKSwgbG9va1JvdGF0aW9uKG5ldyBRdWF0KCksIGZ3ZEF4aXMsIHVwQXhpcykpO1xuXG4gICAgICAgIGZvciAobGV0IHNpID0gMDsgc2kgPCBjLnNwbGluZXMubGVuZ3RoOyBzaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gYy5zcGxpbmVzW3NpXTtcbiAgICAgICAgICAgIGlmIChzLmNvdW50IDwgMikgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBjLmNhbGN1bGF0ZUxlbmd0aChzaSk7XG4gICAgICAgICAgICBpZiAobGVuZ3RoIDw9IDFlLTYpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgdHMgPSB0aGlzLmRpc3RyaWJ1dGVUKGMsIHNpLCBsZW5ndGgsIHMuY2xvc2VkLCByYW5kKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdCBvZiB0cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwaWNrSXRlbSgpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtIDwgMCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgYy5ldmFsdWF0ZVBvc2l0aW9uKHQsIHNpLCBfcCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSW5zdGFudGlhdGVTcGFjZS5TcGxpbmU6XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmV2YWx1YXRlRGlyZWN0aW9uKHQsIHNpLCBfZik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmV2YWx1YXRlVXBWZWN0b3IodCwgc2ksIF91KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEluc3RhbnRpYXRlU3BhY2UuU3BsaW5lT2JqZWN0OlxuICAgICAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KF9mLCBWZWMzLlVOSVRfWiwgYy5ub2RlLndvcmxkUm90YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KF91LCBWZWMzLlVOSVRfWSwgYy5ub2RlLndvcmxkUm90YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBfZi5zZXQoMCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdS5zZXQoMCwgMSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZnJhbWUgPSBsb29rUm90YXRpb24obmV3IFF1YXQoKSwgX2YsIF91KTtcbiAgICAgICAgICAgICAgICBjb25zdCByb3RhdGlvbiA9IFF1YXQubXVsdGlwbHkobmV3IFF1YXQoKSwgZnJhbWUsIHJlbWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IF9wLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJlZmFiTm9kZSA9IHRoaXMuaXRlbXNbaXRlbV0ucHJlZmFiIS5kYXRhIGFzIE5vZGU7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBwcmVmYWJOb2RlID8gcHJlZmFiTm9kZS5zY2FsZS5jbG9uZSgpIDogbmV3IFZlYzMoMSwgMSwgMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucG9zaXRpb25PZmZzZXQuaXNaZXJvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25PZmZzZXQubmV4dChyYW5kLCBfb2ZmKTtcbiAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KF9vZmYsIF9vZmYsIHRoaXMub2Zmc2V0Um90YXRpb24odGhpcy5wb3NpdGlvbk9mZnNldC5zcGFjZSwgZnJhbWUsIGMsIHJvdGF0aW9uKSk7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLmFkZChfb2ZmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJvdGF0aW9uT2Zmc2V0LmlzWmVybykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uT2Zmc2V0Lm5leHQocmFuZCwgX29mZik7XG4gICAgICAgICAgICAgICAgICAgIFF1YXQuZnJvbUV1bGVyKF9xMiwgX29mZi54LCBfb2ZmLnksIF9vZmYueik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwID0gdGhpcy5yb3RhdGlvbk9mZnNldC5zcGFjZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwID09PSBPZmZzZXRTcGFjZS5PYmplY3QpIFF1YXQubXVsdGlwbHkocm90YXRpb24sIHJvdGF0aW9uLCBfcTIpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJvdGF0ZSBhYm91dCB0aGUgY2hvc2VuIGF4ZXM6IFInID0gUyAqIFx1MDM5NCAqIFNcdTIwN0JcdTAwQjkgKiBSXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBTID0gdGhpcy5vZmZzZXRSb3RhdGlvbihzcCwgZnJhbWUsIGMsIHJvdGF0aW9uKS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgUXVhdC5tdWx0aXBseShfcSwgUywgX3EyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFF1YXQubXVsdGlwbHkoX3EsIF9xLCBRdWF0LmludmVydChuZXcgUXVhdCgpLCBTKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBRdWF0Lm11bHRpcGx5KHJvdGF0aW9uLCBfcSwgcm90YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zY2FsZU9mZnNldC5pc1plcm8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FsZU9mZnNldC5uZXh0KHJhbmQsIF9vZmYpO1xuICAgICAgICAgICAgICAgICAgICBzY2FsZS5hZGQoX29mZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKHsgc3BsaW5lOiBzaSwgdCwgaXRlbSwgcG9zaXRpb24sIHJvdGF0aW9uLCBzY2FsZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgb2Zmc2V0Um90YXRpb24oc3BhY2U6IE9mZnNldFNwYWNlLCBzcGxpbmVGcmFtZTogUXVhdCwgYzogU3BsaW5lQ29udGFpbmVyLCBpbnN0YW5jZVJvdGF0aW9uOiBRdWF0KTogUXVhdCB7XG4gICAgICAgIHN3aXRjaCAoc3BhY2UpIHtcbiAgICAgICAgICAgIGNhc2UgT2Zmc2V0U3BhY2UuU3BsaW5lOiByZXR1cm4gc3BsaW5lRnJhbWU7XG4gICAgICAgICAgICBjYXNlIE9mZnNldFNwYWNlLlNwbGluZU9iamVjdDogcmV0dXJuIGMubm9kZS53b3JsZFJvdGF0aW9uIGFzIFF1YXQ7XG4gICAgICAgICAgICBjYXNlIE9mZnNldFNwYWNlLk9iamVjdDogcmV0dXJuIGluc3RhbmNlUm90YXRpb247XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gUXVhdC5JREVOVElUWSBhcyBRdWF0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE5vcm1hbGl6ZWQgdCB2YWx1ZXMgb2YgdGhlIGluc3RhbmNlcyBvbiBvbmUgc3BsaW5lLiAqL1xuICAgIHByaXZhdGUgZGlzdHJpYnV0ZVQoYzogU3BsaW5lQ29udGFpbmVyLCBzaTogbnVtYmVyLCBsZW5ndGg6IG51bWJlciwgY2xvc2VkOiBib29sZWFuLCByYW5kOiAoKSA9PiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgICAgIGNvbnN0IHRzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBjb25zdCBsbyA9IChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4gTWF0aC5taW4oYSwgYik7XG4gICAgICAgIGNvbnN0IGhpID0gKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBNYXRoLm1heChhLCBiKTtcbiAgICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBJbnN0YW50aWF0ZU1ldGhvZC5JbnN0YW5jZUNvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBhID0gTWF0aC5tYXgoMCwgTWF0aC5yb3VuZChsbyh0aGlzLmNvdW50LngsIHRoaXMuY291bnQueSkpKTtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBNYXRoLm1heCgwLCBNYXRoLnJvdW5kKGhpKHRoaXMuY291bnQueCwgdGhpcy5jb3VudC55KSkpO1xuICAgICAgICAgICAgY29uc3QgbiA9IGEgKyBNYXRoLmZsb29yKHJhbmQoKSAqIChiIC0gYSArIDEpKTtcbiAgICAgICAgICAgIGlmIChuID09PSAxKSB0cy5wdXNoKDApO1xuICAgICAgICAgICAgZWxzZSBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgdHMucHVzaChjbG9zZWQgPyBpIC8gbiA6IGkgLyAobiAtIDEpKTtcbiAgICAgICAgICAgIHJldHVybiB0cztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtaW5TID0gTWF0aC5tYXgoMWUtMywgbG8odGhpcy5zcGFjaW5nLngsIHRoaXMuc3BhY2luZy55KSk7XG4gICAgICAgIGNvbnN0IG1heFMgPSBNYXRoLm1heChtaW5TLCBoaSh0aGlzLnNwYWNpbmcueCwgdGhpcy5zcGFjaW5nLnkpKTtcbiAgICAgICAgY29uc3QgbmV4dCA9ICgpID0+IG1pblMgKyAobWF4UyAtIG1pblMpICogcmFuZCgpO1xuICAgICAgICBjb25zdCBNQVggPSAxMDAwMDtcbiAgICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBJbnN0YW50aWF0ZU1ldGhvZC5TcGFjaW5nRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBkID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChkIDw9IGxlbmd0aCArIDFlLTYgJiYgdHMubGVuZ3RoIDwgTUFYKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlZCAmJiBkID49IGxlbmd0aCAtIDFlLTYgJiYgdHMubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICB0cy5wdXNoKE1hdGgubWluKDEsIGQgLyBsZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBkICs9IG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cztcbiAgICAgICAgfVxuICAgICAgICAvLyBMaW5lYXIgZGlzdGFuY2U6IHdhbGsgdGhlIHNwbGluZSB1bnRpbCB0aGUgc3RyYWlnaHQtbGluZSBkaXN0YW5jZSByZWFjaGVzIHRoZSBzcGFjaW5nLlxuICAgICAgICBjb25zdCBzdGVwcyA9IE1hdGgubWF4KDY0LCBNYXRoLmNlaWwobGVuZ3RoIC8gbWluUykgKiA4KTtcbiAgICAgICAgbGV0IHQgPSAwO1xuICAgICAgICB0cy5wdXNoKDApO1xuICAgICAgICBjb25zdCBmcm9tID0gYy5ldmFsdWF0ZVBvc2l0aW9uKDAsIHNpLCBuZXcgVmVjMygpKTtcbiAgICAgICAgbGV0IHdhbnQgPSBuZXh0KCk7XG4gICAgICAgIGNvbnN0IHAgPSBuZXcgVmVjMygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBzdGVwcyAmJiB0cy5sZW5ndGggPCBNQVg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdGkgPSBpIC8gc3RlcHM7XG4gICAgICAgICAgICBjLmV2YWx1YXRlUG9zaXRpb24odGksIHNpLCBwKTtcbiAgICAgICAgICAgIGlmIChWZWMzLmRpc3RhbmNlKHAsIGZyb20pID49IHdhbnQgLSAxZS02KSB7XG4gICAgICAgICAgICAgICAgLy8gUmVmaW5lIGJldHdlZW4gdGhlIHByZXZpb3VzIHN0ZXAgYW5kIHRoaXMgb25lLlxuICAgICAgICAgICAgICAgIGxldCBhID0gdDtcbiAgICAgICAgICAgICAgICBsZXQgYiA9IHRpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMTI7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtID0gKGEgKyBiKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGMuZXZhbHVhdGVQb3NpdGlvbihtLCBzaSwgcCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChWZWMzLmRpc3RhbmNlKHAsIGZyb20pID49IHdhbnQgLSAxZS02KSBiID0gbTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBhID0gbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlZCAmJiBiID49IDEgLSAxZS02KSBicmVhaztcbiAgICAgICAgICAgICAgICB0cy5wdXNoKGIpO1xuICAgICAgICAgICAgICAgIGMuZXZhbHVhdGVQb3NpdGlvbihiLCBzaSwgZnJvbSk7XG4gICAgICAgICAgICAgICAgd2FudCA9IG5leHQoKTtcbiAgICAgICAgICAgICAgICB0ID0gYjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdCA9IHRpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cztcbiAgICB9XG5cbiAgICAvKiogUmVidWlsZHMgdGhlIGluc3RhbmNlcyBub3cuICovXG4gICAgdXBkYXRlSW5zdGFuY2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdGFtcCA9IHRoaXMuY29tcHV0ZVN0YW1wKCk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRzID0gdGhpcy5jb21wdXRlUGxhY2VtZW50cygpO1xuICAgICAgICBpZiAoIXBsYWNlbWVudHMubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLmVuc3VyZVJvb3QoKTtcbiAgICAgICAgcm9vdC5sYXllciA9IHRoaXMubm9kZS5sYXllcjtcbiAgICAgICAgZm9yIChjb25zdCBwbCBvZiBwbGFjZW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBwcmVmYWIgPSB0aGlzLml0ZW1zW3BsLml0ZW1dLnByZWZhYjtcbiAgICAgICAgICAgIGlmICghcHJlZmFiKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBpbnN0YW50aWF0ZShwcmVmYWIpO1xuICAgICAgICAgICAgKG4gYXMgYW55KS5fb2JqRmxhZ3MgfD0gR0VORVJBVEVEX0ZMQUdTO1xuICAgICAgICAgICAgbi5wYXJlbnQgPSByb290O1xuICAgICAgICAgICAgbi5zZXRXb3JsZFBvc2l0aW9uKHBsLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIG4uc2V0V29ybGRSb3RhdGlvbihwbC5yb3RhdGlvbik7XG4gICAgICAgICAgICBuLnNldFNjYWxlKHBsLnNjYWxlKTtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlcy5wdXNoKG4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVkaXRvciBoZWxwZXI6IHBsYWNlbWVudHMgd2l0aCBwcmVmYWIgdXVpZHMsIGZvciBiYWtpbmcgaW50byByZWd1bGFyIG5vZGVzLiAqL1xuICAgIF9iYWtlSW5mbygpOiB7IHByZWZhYjogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyW107IHJvdGF0aW9uOiBudW1iZXJbXTsgc2NhbGU6IG51bWJlcltdIH1bXSB7XG4gICAgICAgIGlmICghRURJVE9SKSByZXR1cm4gW107XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVQbGFjZW1lbnRzKClcbiAgICAgICAgICAgIC5maWx0ZXIoKHApID0+IHRoaXMuaXRlbXNbcC5pdGVtXS5wcmVmYWIpXG4gICAgICAgICAgICAubWFwKChwKSA9PiAoe1xuICAgICAgICAgICAgICAgIHByZWZhYjogKHRoaXMuaXRlbXNbcC5pdGVtXS5wcmVmYWIgYXMgYW55KS5fdXVpZCBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFtwLnBvc2l0aW9uLngsIHAucG9zaXRpb24ueSwgcC5wb3NpdGlvbi56XSxcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogW3Aucm90YXRpb24ueCwgcC5yb3RhdGlvbi55LCBwLnJvdGF0aW9uLnosIHAucm90YXRpb24ud10sXG4gICAgICAgICAgICAgICAgc2NhbGU6IFtwLnNjYWxlLngsIHAuc2NhbGUueSwgcC5zY2FsZS56XSxcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgVmVjMyB9IGZyb20gJ2NjJztcbmltcG9ydCB7IFNwbGluZSwgc3BsaW5lRmFjdG9yeSwgUGF0aEluZGV4VW5pdCB9IGZyb20gJy4vU3BsaW5lJztcbmltcG9ydCB7IGJ1aWxkU2hhcGUsIFNoYXBlT3B0aW9ucyB9IGZyb20gJy4uL2NvcmUvc3BsaW5lLWNvcmUnO1xuXG5leHBvcnQgdHlwZSBTcGxpbmVTaGFwZSA9ICdsaW5lJyB8ICdzcXVhcmUnIHwgJ3JvdW5kZWQtc3F1YXJlJyB8ICdjaXJjbGUnIHwgJ3BvbHlnb24nIHwgJ3N0YXInIHwgJ2hlbGl4JztcblxuLyoqXG4gKiBTdGF0aWMgaGVscGVycyBpbiB0aGUgc3R5bGUgb2YgVW5pdHkncyBTcGxpbmVVdGlsaXR5IC8gU3BsaW5lRmFjdG9yeS5cbiAqIEFsbCBwb3NpdGlvbnMgYXJlIGluIHRoZSBzcGxpbmUncyBsb2NhbCBzcGFjZTsgdCBpcyBhIG5vcm1hbGl6ZWQgZGlzdGFuY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBTcGxpbmVVdGlsaXR5IHtcbiAgICBzdGF0aWMgZXZhbHVhdGVQb3NpdGlvbihzcGxpbmU6IFNwbGluZSwgdDogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBzcGxpbmUuZXZhbHVhdGVQb3NpdGlvbih0LCBvdXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBldmFsdWF0ZVRhbmdlbnQoc3BsaW5lOiBTcGxpbmUsIHQ6IG51bWJlciwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICByZXR1cm4gc3BsaW5lLmV2YWx1YXRlVGFuZ2VudCh0LCBvdXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBldmFsdWF0ZURpcmVjdGlvbihzcGxpbmU6IFNwbGluZSwgdDogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBzcGxpbmUuZXZhbHVhdGVEaXJlY3Rpb24odCwgb3V0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXZhbHVhdGVVcFZlY3RvcihzcGxpbmU6IFNwbGluZSwgdDogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBzcGxpbmUuZXZhbHVhdGVVcFZlY3Rvcih0LCBvdXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjYWxjdWxhdGVMZW5ndGgoc3BsaW5lOiBTcGxpbmUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc3BsaW5lLmdldExlbmd0aCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXROZWFyZXN0UG9pbnQoc3BsaW5lOiBTcGxpbmUsIHBvaW50OiBSZWFkb25seTxWZWMzPik6IHsgdDogbnVtYmVyOyBwb3NpdGlvbjogVmVjMzsgZGlzdGFuY2U6IG51bWJlciB9IHtcbiAgICAgICAgcmV0dXJuIHNwbGluZS5nZXROZWFyZXN0UG9pbnQocG9pbnQpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgcG9pbnQgYGRpc3RhbmNlYCBhbG9uZyB0aGUgc3BsaW5lIGZyb20gYGZyb21UYCAobmVnYXRpdmUgZ29lcyBiYWNrKS4gKi9cbiAgICBzdGF0aWMgZ2V0UG9pbnRBdERpc3RhbmNlKHNwbGluZTogU3BsaW5lLCBmcm9tVDogbnVtYmVyLCBkaXN0YW5jZTogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogeyB0OiBudW1iZXI7IHBvc2l0aW9uOiBWZWMzIH0ge1xuICAgICAgICBjb25zdCB0ID0gc3BsaW5lLmdldFRBdERpc3RhbmNlKGZyb21ULCBkaXN0YW5jZSk7XG4gICAgICAgIHJldHVybiB7IHQsIHBvc2l0aW9uOiBzcGxpbmUuZXZhbHVhdGVQb3NpdGlvbih0LCBvdXQpIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnZlcnRJbmRleFVuaXQoc3BsaW5lOiBTcGxpbmUsIHZhbHVlOiBudW1iZXIsIGZyb206IFBhdGhJbmRleFVuaXQsIHRvOiBQYXRoSW5kZXhVbml0KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNwbGluZS5jb252ZXJ0SW5kZXhVbml0KHZhbHVlLCBmcm9tLCB0byk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBuZXcgc3BsaW5lIGluIGEgdGVtcGxhdGUgc2hhcGUgKGxpa2UgVW5pdHkncyBTcGxpbmVGYWN0b3J5KS5cbiAgICAgKiBgc2l6ZWAgaXMgdGhlIGhhbGYgd2lkdGggLyByYWRpdXM7IGBwbGFuZTJEYCBsYXlzIGl0IGluIFhZIGluc3RlYWQgb2YgWFouXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVNoYXBlKHNoYXBlOiBTcGxpbmVTaGFwZSwgb3B0aW9uczogUGFydGlhbDxTaGFwZU9wdGlvbnM+ID0ge30pOiBTcGxpbmUge1xuICAgICAgICBjb25zdCBzID0gbmV3IFNwbGluZSgpO1xuICAgICAgICBidWlsZFNoYXBlKHMsIHNoYXBlLCB7IHNpemU6IDEsIC4uLm9wdGlvbnMgfSwgc3BsaW5lRmFjdG9yeSk7XG4gICAgICAgIHMubWFya0RpcnR5KCk7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIC8qKiBGaWxscyBhbiBleGlzdGluZyBzcGxpbmUgd2l0aCBhIHRlbXBsYXRlIHNoYXBlLiAqL1xuICAgIHN0YXRpYyBzZXRTaGFwZShzcGxpbmU6IFNwbGluZSwgc2hhcGU6IFNwbGluZVNoYXBlLCBvcHRpb25zOiBQYXJ0aWFsPFNoYXBlT3B0aW9ucz4gPSB7fSk6IHZvaWQge1xuICAgICAgICBidWlsZFNoYXBlKHNwbGluZSwgc2hhcGUsIHsgc2l6ZTogMSwgLi4ub3B0aW9ucyB9LCBzcGxpbmVGYWN0b3J5KTtcbiAgICAgICAgc3BsaW5lLm1hcmtEaXJ0eSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgUGF0aEluZGV4VW5pdCB9O1xuIiwgImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuZXhwb3J0IGNvbnN0IHJlc3VsdHMgPSB7IHBhc3NlZDogMCwgZmFpbGVkOiAwIH07XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KG5hbWU6IHN0cmluZywgZm46ICgpID0+IHZvaWQpIHtcbiAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgICByZXN1bHRzLnBhc3NlZCsrO1xuICAgICAgICBjb25zb2xlLmxvZyhgICBvayAgICR7bmFtZX1gKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlc3VsdHMuZmFpbGVkKys7XG4gICAgICAgIGNvbnN0IGVyciA9IGUgYXMgRXJyb3I7XG4gICAgICAgIGNvbnN0IGRldGFpbCA9IGVyciBpbnN0YW5jZW9mIGFzc2VydC5Bc3NlcnRpb25FcnJvciA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVycj8uc3RhY2sgfHwgZXJyKS5zcGxpdCgnXFxuJykuc2xpY2UoMCwgNSkuam9pbignXFxuJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAgIEZBSUwgJHtuYW1lfVxcbiAgICAgICAke2RldGFpbC5zcGxpdCgnXFxuJykuam9pbignXFxuICAgICAgICcpfWApO1xuICAgIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLElBQUFBLGlCQUFtQjs7O0FDR1osSUFBTSxRQUFOLE1BQU0sTUFBSztBQUFBLEVBT2QsWUFBbUIsSUFBSSxHQUFVLElBQUksR0FBVSxJQUFJLEdBQUc7QUFBbkM7QUFBYztBQUFjO0FBQzNDLFFBQUksT0FBTyxNQUFNLFVBQVU7QUFDdkIsWUFBTSxJQUFJO0FBQ1YsV0FBSyxJQUFJLEVBQUU7QUFDWCxXQUFLLElBQUksRUFBRTtBQUNYLFdBQUssSUFBSSxFQUFFO0FBQUEsSUFDZjtBQUFBLEVBQ0o7QUFBQSxFQUVBLElBQUksSUFBUyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQVM7QUFDaEMsUUFBSSxPQUFPLE1BQU0sVUFBVTtBQUN2QixXQUFLLElBQUksRUFBRTtBQUNYLFdBQUssSUFBSSxFQUFFO0FBQ1gsV0FBSyxJQUFJLEVBQUU7QUFBQSxJQUNmLE9BQU87QUFDSCxXQUFLLElBQUk7QUFDVCxXQUFLLElBQUk7QUFDVCxXQUFLLElBQUk7QUFBQSxJQUNiO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUVBLFFBQVE7QUFDSixXQUFPLElBQUksTUFBSyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUFBLEVBQzFDO0FBQUEsRUFFQSxJQUFJLEdBQVE7QUFDUixTQUFLLEtBQUssRUFBRTtBQUNaLFNBQUssS0FBSyxFQUFFO0FBQ1osU0FBSyxLQUFLLEVBQUU7QUFDWixXQUFPO0FBQUEsRUFDWDtBQUFBLEVBRUEsWUFBWTtBQUNSLFdBQU8sS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLO0FBQUEsRUFDN0Q7QUFBQSxFQUVBLFNBQVM7QUFDTCxXQUFPLEtBQUssS0FBSyxLQUFLLFVB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QUssR0FBRyxJQUFJO0FBQ3pGLFVBQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQ3hGLFVBQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQ3hGLFVBQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQ3hGLFVBQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU0sS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQ3hGLFFBQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUUsUUFBSSxDQUFDLElBQUssUUFBTyxNQUFLLFVBQVUsS0FBSyxNQUFLLFFBQVEsQ0FBQyxHQUFHLE1BQUssUUFBUSxDQUFDO0FBQ3BFLFVBQU0sSUFBSTtBQUNWLFdBQU8sTUFBSyxVQUFVLEtBQUs7QUFBQSxPQUN0QixNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLE9BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQSxPQUNoRixNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLE9BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQSxPQUNoRixNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLE9BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQSxPQUNoRixNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLE9BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQSxPQUNoRixNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLE9BQU0s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SyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQy9CO0FBRU8sU0FBUyxXQUF5QixLQUFRLEdBQVU7QUFDdkQsUUFBTSxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ2pFLE1BQUksSUFBSSxRQUFTLFFBQU8sVUFBVSxHQUFHO0FBQ3JDLFNBQU8sS0FBSyxLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQ3ZEO0FBR08sU0FBUyxRQUFzQixLQUFRLEdBQVU7QUFDcEQsUUFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3RELE1BQUksSUFBSSxRQUFTLFFBQU8sVUFBVSxHQUFHO0FBQ3JDLFNBQU8sS0FBSyxLQUFLLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQzFEO0FBR08sU0FBUyxRQUFzQixLQUFRLEdBQU8sR0FBVTtBQUUzRCxRQUFNLEtBQUssS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3BDLFFBQU0sS0FBSyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDcEMsUUFBTSxLQUFLLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNwQyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUM3QyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUM3QyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUs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QUcsR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksR0FBRyxnQkFBZ0I7QUFDcEQsSUFBRSxnQkFBZ0I7QUFDbEIsaUJBQUFBLFFBQU8sZ0JBQWdCLEVBQUUsVUFBVSxJQUFJLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxHQUFHLEVBQUU7QUFDcEUsSUFBRSxPQUFPO0FBQ1QsSUFBRSxnQkFBZ0I7QUFDbEIsaUJBQUFBLFFBQU8sbUJBQW1CLEVBQUUsVUFBVSxJQUFJLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxHQUFHLEVBQUU7QUFDM0UsQ0FBQztBQUVELEtBQUsscUNBQXFDLE1BQU07QUFDNUMsUUFBTSxLQUFLLGNBQWMsQ0FBQztBQUMxQixhQUFXLEtBQUssR0FBRyxXQUFXO0FBQzFCLFFBQUksVUFBVTtBQUNkLGFBQVMsSUFBUyxHQUFHLEdBQUcsSUFBSSxFQUFFLE9BQVEsS0FBSSxFQUFFLFlBQWUsU0FBUyxNQUFNLFNBQVUsV0FBVTtBQUM5RixtQkFBQUEsUUFBTyxHQUFHLE9BQU87QUFBQSxFQUNyQjtBQUNBLFFBQU0sT0FBTyxHQUFHLFVBQVU7QUFDMUIsaUJBQUFBLFFBQU8sWUFBWSxLQUFLLFFBQVEsR0FBRyxVQUFVLE1BQU07QUFDdkQsQ0FBQztBQUVELFFBQVEsSUFBSTtBQUFBLEVBQUssUUFBUSxNQUFNLFlBQVksUUFBUSxNQUFNLFNBQVM7QUFDbEUsUUFBUSxXQUFXLFFBQVEsU0FBUyxJQUFJOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfYXNzZXJ0IiwgInMiLCAiVGFuZ2VudE1vZGUiLCAidXAiLCAiYyIsICJhZGQiLCAiZyIsICJjY2NsYXNzIiwgInByb3BlcnR5IiwgImNjY2xhc3MiLCAicHJvcGVydHkiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJwcm9wZXJ0eSIsICJjY2NsYXNzIiwgImNjY2xhc3MiLCAicHJvcGVydHkiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJtZW51IiwgIlNwbGluZUFuaW1hdGVNZXRob2QiLCAiU3BsaW5lQW5pbWF0ZUxvb3BNb2RlIiwgIlNwbGluZUFuaW1hdGVFYXNpbmciLCAiU3BsaW5lQW5pbWF0ZUFsaWdubWVudCIsICJBbGlnbkF4aXMiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJleGVjdXRlSW5FZGl0TW9kZSIsICJtZW51IiwgIkV4dHJ1ZGVTaGFwZSIsICJfbSIsICJtaXgiLCAiZGlzdCIsICJjY2NsYXNzIiwgInByb3BlcnR5IiwgImV4ZWN1dGVJbkVkaXRNb2RlIiwgIm1lbnUiLCAiSW5zdGFudGlhdGVNZXRob2QiLCAiSW5zdGFudGlhdGVTcGFjZSIsICJPZmZzZXRTcGFjZSIsICJBWEVTIiwgIkdFTkVSQVRFRF9GTEFHUyIsICJfcCIsICJfZiIsICJfdSIsICJfciIsICJsb29rUm90YXRpb24iLCAibWl4IiwgInNjYWxlIiwgImFzc2VydCIsICJhc3NlcnQiLCAibGVuIl0KfQo=
