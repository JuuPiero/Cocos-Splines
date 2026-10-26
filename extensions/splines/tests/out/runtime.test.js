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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcnVudGltZS50ZXN0LnRzIiwgIi4uL3N0dWJzL2NjLnRzIiwgIi4uL3N0dWJzL2NjLWVudi50cyIsICIuLi8uLi9hc3NldHMvY29yZS9tYXRoLnRzIiwgIi4uLy4uL2Fzc2V0cy9jb3JlL2N1cnZlLnRzIiwgIi4uLy4uL2Fzc2V0cy9jb3JlL3NwbGluZS1jb3JlLnRzIiwgIi4uLy4uL2Fzc2V0cy9ydW50aW1lL0Jlemllcktub3QudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvS25vdExpbmsudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lLnRzIiwgIi4uLy4uL2Fzc2V0cy9ydW50aW1lL1NwbGluZUNvbnRhaW5lci50cyIsICIuLi8uLi9hc3NldHMvcnVudGltZS9TcGxpbmVBbmltYXRlLnRzIiwgIi4uLy4uL2Fzc2V0cy9ydW50aW1lL1NwbGluZUV4dHJ1ZGUudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lSW5zdGFudGlhdGUudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lVXRpbGl0eS50cyIsICIuLi9oYXJuZXNzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIFJ1bnRpbWUgY29tcG9uZW50cyB3aXRoIHRoZSBlbmdpbmUgc3R1YjogY29udGFpbmVyIGV2YWx1YXRpb24gaW4gd29ybGRcbiAqIHNwYWNlLCBTcGxpbmVBbmltYXRlLCBTcGxpbmVFeHRydWRlIGFuZCBTcGxpbmVJbnN0YW50aWF0ZS5cbiAqL1xuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0ICogYXMgY2MgZnJvbSAnLi9zdHVicy9jYyc7XG5pbXBvcnQgeyBTcGxpbmVDb250YWluZXIgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9TcGxpbmVDb250YWluZXInO1xuaW1wb3J0IHsgVGFuZ2VudE1vZGUgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9CZXppZXJLbm90JztcbmltcG9ydCB7IFNwbGluZUFuaW1hdGUsIFNwbGluZUFuaW1hdGVMb29wTW9kZSwgU3BsaW5lQW5pbWF0ZUVhc2luZywgU3BsaW5lQW5pbWF0ZUFsaWdubWVudCwgQWxpZ25BeGlzLCBTcGxpbmVBbmltYXRlTWV0aG9kIH0gZnJvbSAnLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lQW5pbWF0ZSc7XG5pbXBvcnQgeyBTcGxpbmVFeHRydWRlLCBFeHRydWRlU2hhcGUgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9TcGxpbmVFeHRydWRlJztcbmltcG9ydCB7IFNwbGluZUluc3RhbnRpYXRlLCBJbnN0YW50aWFibGVJdGVtLCBJbnN0YW50aWF0ZU1ldGhvZCB9IGZyb20gJy4uL2Fzc2V0cy9ydW50aW1lL1NwbGluZUluc3RhbnRpYXRlJztcbmltcG9ydCB7IFNwbGluZVV0aWxpdHkgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9TcGxpbmVVdGlsaXR5JztcbmltcG9ydCB7IFBhdGhJbmRleFVuaXQgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9TcGxpbmUnO1xuaW1wb3J0IHsgdGVzdCwgcmVzdWx0cyB9IGZyb20gJy4vaGFybmVzcyc7XG5cbmNvbnN0IHNjZW5lID0gbmV3IGNjLk5vZGUoJ1NjZW5lJyk7XG4oc2NlbmUgYXMgYW55KS5pc1NjZW5lID0gdHJ1ZTtcbmNjLmRpcmVjdG9yLl9zY2VuZSA9IHNjZW5lO1xuXG5mdW5jdGlvbiBuZWFyKGE6IG51bWJlciwgYjogbnVtYmVyLCBlcHMgPSAxZS00LCBtc2cgPSAnJykge1xuICAgIGFzc2VydC5vayhNYXRoLmFicyhhIC0gYikgPD0gZXBzLCBgJHttc2d9ICR7YX0gIT0gJHtifSAoXHUwMEIxJHtlcHN9KWApO1xufVxuXG5mdW5jdGlvbiBsaW5lKGxlbiA9IDEwKTogeyBub2RlOiBjYy5Ob2RlOyBjOiBTcGxpbmVDb250YWluZXIgfSB7XG4gICAgY29uc3Qgbm9kZSA9IG5ldyBjYy5Ob2RlKCdTcGxpbmUnKTtcbiAgICBub2RlLnNldFBhcmVudChzY2VuZSk7XG4gICAgY29uc3QgYyA9IG5vZGUuYWRkQ29tcG9uZW50KFNwbGluZUNvbnRhaW5lcikgYXMgU3BsaW5lQ29udGFpbmVyO1xuICAgIGMuc3BsaW5lLmFkZChuZXcgY2MuVmVjMygwLCAwLCAwKSBhcyBhbnksIFRhbmdlbnRNb2RlLkxpbmVhcik7XG4gICAgYy5zcGxpbmUuYWRkKG5ldyBjYy5WZWMzKGxlbiwgMCwgMCkgYXMgYW55LCBUYW5nZW50TW9kZS5MaW5lYXIpO1xuICAgIHJldHVybiB7IG5vZGUsIGMgfTtcbn1cblxuY29uc29sZS5sb2coJ1xcbmNvbnRhaW5lcicpO1xuXG50ZXN0KCd3b3JsZCBldmFsdWF0aW9uIGZvbGxvd3MgdGhlIG5vZGUgdHJhbnNmb3JtJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgbm9kZSwgYyB9ID0gbGluZSgxMCk7XG4gICAgbm9kZS5zZXRQb3NpdGlvbigxLCAyLCAzKTtcbiAgICBub2RlLnJvdGF0aW9uLnNldCgwLCBNYXRoLlNRUlQxXzIsIDAsIE1hdGguU1FSVDFfMik7IC8vIDkwIGRlZ3JlZXMgYXJvdW5kIFk6ICtYIC0+IC1aXG4gICAgY29uc3QgcCA9IGMuZXZhbHVhdGVQb3NpdGlvbigwLjUpO1xuICAgIG5lYXIocC54LCAxKTtcbiAgICBuZWFyKHAueSwgMik7XG4gICAgbmVhcihwLnosIDMgLSA1KTtcbiAgICBjb25zdCBkID0gYy5ldmFsdWF0ZURpcmVjdGlvbigwLjUpO1xuICAgIG5lYXIoZC56LCAtMSk7XG4gICAgbmVhcihjLmNhbGN1bGF0ZUxlbmd0aCgpLCAxMCk7XG59KTtcblxudGVzdCgnd29ybGQgbGVuZ3RoIHVzZXMgdGhlIG5vZGUgc2NhbGUnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlLCBjIH0gPSBsaW5lKDEwKTtcbiAgICBub2RlLnNldFNjYWxlKDIsIDIsIDIpO1xuICAgIG5lYXIoYy5jYWxjdWxhdGVMZW5ndGgoKSwgMjApO1xuICAgIG5lYXIoYy5zcGxpbmUuZ2V0TGVuZ3RoKCksIDEwLCAxZS02LCAnbG9jYWwgbGVuZ3RoJyk7XG59KTtcblxudGVzdCgnbmVhcmVzdCBwb2ludCBpbiB3b3JsZCBzcGFjZScsICgpID0+IHtcbiAgICBjb25zdCB7IG5vZGUsIGMgfSA9IGxpbmUoMTApO1xuICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMCwgNSk7XG4gICAgY29uc3QgciA9IGMuZ2V0TmVhcmVzdFBvaW50KG5ldyBjYy5WZWMzKDQsIDMsIDUpIGFzIGFueSkhO1xuICAgIG5lYXIoci5wb3NpdGlvbi54LCA0LCAxZS0zKTtcbiAgICBuZWFyKHIuZGlzdGFuY2UsIDMsIDFlLTMpO1xuICAgIG5lYXIoci50LCAwLjQsIDFlLTMpO1xufSk7XG5cbnRlc3QoJ3VuaXRzIGNvbnZlcnNpb24gYW5kIHNoYXBlcycsICgpID0+IHtcbiAgICBjb25zdCB7IGMgfSA9IGxpbmUoMTApO1xuICAgIG5lYXIoYy5zcGxpbmUuY29udmVydEluZGV4VW5pdCgwLjUsIFBhdGhJbmRleFVuaXQuTm9ybWFsaXplZCwgUGF0aEluZGV4VW5pdC5EaXN0YW5jZSksIDUpO1xuICAgIG5lYXIoYy5zcGxpbmUuY29udmVydEluZGV4VW5pdCgyLjUsIFBhdGhJbmRleFVuaXQuRGlzdGFuY2UsIFBhdGhJbmRleFVuaXQuTm9ybWFsaXplZCksIDAuMjUpO1xuICAgIGNvbnN0IGNpcmNsZSA9IFNwbGluZVV0aWxpdHkuY3JlYXRlU2hhcGUoJ2NpcmNsZScsIHsgc2l6ZTogMiB9KTtcbiAgICBuZWFyKGNpcmNsZS5nZXRMZW5ndGgoKSwgTWF0aC5QSSAqIDQsIDAuMDIpO1xufSk7XG5cbnRlc3QoJ0NIQU5HRUQgaXMgZW1pdHRlZCB3aGVuIGEgc3BsaW5lIGNoYW5nZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlLCBjIH0gPSBsaW5lKDEwKTtcbiAgICBsZXQgbiA9IDA7XG4gICAgbm9kZS5vbihTcGxpbmVDb250YWluZXIuRXZlbnRUeXBlLkNIQU5HRUQsICgpID0+IG4rKyk7XG4gICAgYy5jaGVja0NoYW5nZWQoKTtcbiAgICBjb25zdCBiZWZvcmUgPSBuO1xuICAgIGMuc3BsaW5lLnNldEtub3RQb3NpdGlvbigxLCBuZXcgY2MuVmVjMygxMiwgMCwgMCkgYXMgYW55KTtcbiAgICBjLmNoZWNrQ2hhbmdlZCgpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChuLCBiZWZvcmUgKyAxKTtcbiAgICBjLmNoZWNrQ2hhbmdlZCgpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChuLCBiZWZvcmUgKyAxLCAnbm8gY2hhbmdlLCBubyBldmVudCcpO1xufSk7XG5cbmNvbnNvbGUubG9nKCdcXG5TcGxpbmVBbmltYXRlJyk7XG5cbmZ1bmN0aW9uIGFuaW1hdGVkKG9wdHM6IFBhcnRpYWw8U3BsaW5lQW5pbWF0ZT4gPSB7fSkge1xuICAgIGNvbnN0IHsgYyB9ID0gbGluZSgxMCk7XG4gICAgY29uc3QgbW92ZXIgPSBuZXcgY2MuTm9kZSgnTW92ZXInKTtcbiAgICBtb3Zlci5zZXRQYXJlbnQoc2NlbmUpO1xuICAgIGNvbnN0IGEgPSBtb3Zlci5hZGRDb21wb25lbnQoU3BsaW5lQW5pbWF0ZSkgYXMgU3BsaW5lQW5pbWF0ZTtcbiAgICBhLmNvbnRhaW5lciA9IGM7XG4gICAgT2JqZWN0LmFzc2lnbihhLCBvcHRzKTtcbiAgICByZXR1cm4geyBhLCBtb3ZlciwgYyB9O1xufVxuXG50ZXN0KCd0aW1lIG1vZGU6IHBvc2l0aW9uIGFsb25nIHRoZSBzcGxpbmUgYWZ0ZXIgc29tZSBzZWNvbmRzJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgYSwgbW92ZXIgfSA9IGFuaW1hdGVkKHsgZHVyYXRpb246IDQsIGxvb3BNb2RlOiBTcGxpbmVBbmltYXRlTG9vcE1vZGUuTG9vcCB9KTtcbiAgICBhLnBsYXkoKTtcbiAgICBhLnVwZGF0ZSgxKTtcbiAgICBuZWFyKG1vdmVyLndvcmxkUG9zaXRpb24ueCwgMi41LCAxZS0zKTtcbiAgICBhLnVwZGF0ZSg0KTtcbiAgICBuZWFyKG1vdmVyLndvcmxkUG9zaXRpb24ueCwgMi41LCAxZS0zLCAnbG9vcGVkJyk7XG59KTtcblxudGVzdCgnb25jZSBtb2RlIHN0b3BzIGF0IHRoZSBlbmQgYW5kIHJlcG9ydHMgY29tcGxldGlvbicsICgpID0+IHtcbiAgICBjb25zdCB7IGEsIG1vdmVyIH0gPSBhbmltYXRlZCh7IGR1cmF0aW9uOiAyLCBsb29wTW9kZTogU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLk9uY2UgfSk7XG4gICAgbGV0IGRvbmUgPSAwO1xuICAgIG1vdmVyLm9uKFNwbGluZUFuaW1hdGUuRXZlbnRUeXBlLkNPTVBMRVRFRCwgKCkgPT4gZG9uZSsrKTtcbiAgICBhLnBsYXkoKTtcbiAgICBhLnVwZGF0ZSgxLjUpO1xuICAgIGEudXBkYXRlKDEuNSk7XG4gICAgbmVhcihtb3Zlci53b3JsZFBvc2l0aW9uLngsIDEwLCAxZS0zKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYS5pc1BsYXlpbmcsIGZhbHNlKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZG9uZSwgMSk7XG59KTtcblxudGVzdCgncGluZy1wb25nIGNvbWVzIGJhY2snLCAoKSA9PiB7XG4gICAgY29uc3QgeyBhLCBtb3ZlciB9ID0gYW5pbWF0ZWQoeyBkdXJhdGlvbjogMiwgbG9vcE1vZGU6IFNwbGluZUFuaW1hdGVMb29wTW9kZS5QaW5nUG9uZyB9KTtcbiAgICBhLnBsYXkoKTtcbiAgICBhLnVwZGF0ZSgzKTtcbiAgICBuZWFyKG1vdmVyLndvcmxkUG9zaXRpb24ueCwgNSwgMWUtMyk7XG59KTtcblxudGVzdCgnc3BlZWQgbW9kZSBjb252ZXJ0cyB0aGUgc3BlZWQgaW50byBhIGR1cmF0aW9uJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgYSwgbW92ZXIgfSA9IGFuaW1hdGVkKHsgbWV0aG9kOiBTcGxpbmVBbmltYXRlTWV0aG9kLlNwZWVkLCBtYXhTcGVlZDogNSB9KTtcbiAgICBuZWFyKGEuY3VycmVudER1cmF0aW9uKCksIDIpO1xuICAgIGEucGxheSgpO1xuICAgIGEudXBkYXRlKDEpO1xuICAgIG5lYXIobW92ZXIud29ybGRQb3NpdGlvbi54LCA1LCAxZS0zKTtcbn0pO1xuXG50ZXN0KCdlYXNlIGluIHN0YXJ0cyBzbG93JywgKCkgPT4ge1xuICAgIGNvbnN0IHsgYSwgbW92ZXIgfSA9IGFuaW1hdGVkKHsgZHVyYXRpb246IDIsIGVhc2luZzogU3BsaW5lQW5pbWF0ZUVhc2luZy5FYXNlSW4sIGxvb3BNb2RlOiBTcGxpbmVBbmltYXRlTG9vcE1vZGUuT25jZSB9KTtcbiAgICBhLnBsYXkoKTtcbiAgICBhLnVwZGF0ZSgxKTtcbiAgICBuZWFyKG1vdmVyLndvcmxkUG9zaXRpb24ueCwgMi41LCAxZS0zKTsgLy8gdCA9IDAuNSAtPiAwLjI1XG59KTtcblxudGVzdCgnYWxpZ25tZW50OiB0aGUgZm9yd2FyZCBheGlzIHBvaW50cyBhbG9uZyB0aGUgc3BsaW5lJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgYSwgbW92ZXIgfSA9IGFuaW1hdGVkKHsgZHVyYXRpb246IDEsIGFsaWdubWVudDogU3BsaW5lQW5pbWF0ZUFsaWdubWVudC5TcGxpbmVFbGVtZW50LCBvYmplY3RGb3J3YXJkQXhpczogQWxpZ25BeGlzLlpBeGlzLCBvYmplY3RVcEF4aXM6IEFsaWduQXhpcy5ZQXhpcyB9KTtcbiAgICBhLm5vcm1hbGl6ZWRUaW1lID0gMC41O1xuICAgIGNvbnN0IGZ3ZCA9IGNjLlZlYzMudHJhbnNmb3JtUXVhdChuZXcgY2MuVmVjMygpLCBuZXcgY2MuVmVjMygwLCAwLCAxKSwgbW92ZXIud29ybGRSb3RhdGlvbik7XG4gICAgbmVhcihmd2QueCwgMSwgMWUtNCk7XG4gICAgLy8gMkQgc3ByaXRlczogK1ggYWxvbmcgdGhlIHNwbGluZSwgK1ogdXAuXG4gICAgYS5vYmplY3RGb3J3YXJkQXhpcyA9IEFsaWduQXhpcy5YQXhpcztcbiAgICBhLm9iamVjdFVwQXhpcyA9IEFsaWduQXhpcy5aQXhpcztcbiAgICBhLm5vcm1hbGl6ZWRUaW1lID0gMC41O1xuICAgIGNvbnN0IHggPSBjYy5WZWMzLnRyYW5zZm9ybVF1YXQobmV3IGNjLlZlYzMoKSwgbmV3IGNjLlZlYzMoMSwgMCwgMCksIG1vdmVyLndvcmxkUm90YXRpb24pO1xuICAgIG5lYXIoeC54LCAxLCAxZS00KTtcbn0pO1xuXG50ZXN0KCdlZGl0b3IgcHJldmlldyBtb3ZlcyB0aGUgb2JqZWN0IGFuZCBwdXRzIGl0IGJhY2snLCAoKSA9PiB7XG4gICAgY29uc3QgeyBhLCBtb3ZlciB9ID0gYW5pbWF0ZWQoeyBkdXJhdGlvbjogMiB9KTtcbiAgICBtb3Zlci5zZXRXb3JsZFBvc2l0aW9uKDAsIDcsIDApO1xuICAgIGNvbnN0IHIgPSBhLl9wcmV2aWV3U2V0VGltZSgxKTtcbiAgICBuZWFyKHIubm9ybWFsaXplZFRpbWUsIDAuNSwgMWUtNik7XG4gICAgbmVhcihtb3Zlci53b3JsZFBvc2l0aW9uLngsIDUsIDFlLTMpO1xuICAgIGEuX3ByZXZpZXdTdG9wKCk7XG4gICAgbmVhcihtb3Zlci53b3JsZFBvc2l0aW9uLnksIDcsIDFlLTYpO1xuICAgIG5lYXIobW92ZXIud29ybGRQb3NpdGlvbi54LCAwLCAxZS02KTtcbn0pO1xuXG5jb25zb2xlLmxvZygnXFxuU3BsaW5lRXh0cnVkZScpO1xuXG50ZXN0KCdjaXJjbGUgdHViZTogdmVydGV4IGNvdW50LCBvdXR3YXJkIG5vcm1hbHMgYW5kIGNhcHMnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlLCBjIH0gPSBsaW5lKDEwKTtcbiAgICBjb25zdCBlID0gbm9kZS5hZGRDb21wb25lbnQoU3BsaW5lRXh0cnVkZSkgYXMgU3BsaW5lRXh0cnVkZTtcbiAgICBlLmNvbnRhaW5lciA9IGM7XG4gICAgZS5zaWRlcyA9IDg7XG4gICAgZS5yYWRpdXMgPSAwLjU7XG4gICAgZS5zZWdtZW50c1BlclVuaXQgPSAxO1xuICAgIGUuY2FwcGVkID0gdHJ1ZTtcbiAgICBlLnJlYnVpbGQoKTtcbiAgICBjb25zdCBnID0gKGUubWVzaCBhcyBhbnkpLmdlb21ldHJ5O1xuICAgIGNvbnN0IHJpbmdzID0gMTE7XG4gICAgY29uc3QgcmluZ1ZlcnRzID0gOTtcbiAgICBjb25zdCBjYXBzID0gMiAqICgxICsgcmluZ1ZlcnRzKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZy5wb3NpdGlvbnMubGVuZ3RoIC8gMywgcmluZ3MgKiByaW5nVmVydHMgKyBjYXBzKTtcbiAgICAvLyBTaWRlIG5vcm1hbHMgcG9pbnQgYXdheSBmcm9tIHRoZSBzcGxpbmUgYXhpcy5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJpbmdzICogcmluZ1ZlcnRzOyBpKyspIHtcbiAgICAgICAgY29uc3QgeSA9IGcucG9zaXRpb25zW2kgKiAzICsgMV07XG4gICAgICAgIGNvbnN0IHogPSBnLnBvc2l0aW9uc1tpICogMyArIDJdO1xuICAgICAgICBjb25zdCBueSA9IGcubm9ybWFsc1tpICogMyArIDFdO1xuICAgICAgICBjb25zdCBueiA9IGcubm9ybWFsc1tpICogMyArIDJdO1xuICAgICAgICBhc3NlcnQub2soeSAqIG55ICsgeiAqIG56ID4gMC4yLCBgbm9ybWFsICR7aX1gKTtcbiAgICB9XG4gICAgLy8gVHJpYW5nbGUgd2luZGluZyBhZ3JlZXMgd2l0aCB0aGUgbm9ybWFscyAoY291bnRlci1jbG9ja3dpc2UgZnJvbnQgZmFjZXMpLlxuICAgIGZvciAobGV0IHQgPSAwOyB0IDwgZy5pbmRpY2VzLmxlbmd0aDsgdCArPSAzKSB7XG4gICAgICAgIGNvbnN0IFthLCBiLCBkXSA9IFtnLmluZGljZXNbdF0sIGcuaW5kaWNlc1t0ICsgMV0sIGcuaW5kaWNlc1t0ICsgMl1dO1xuICAgICAgICBjb25zdCBwID0gKGk6IG51bWJlcikgPT4gbmV3IGNjLlZlYzMoZy5wb3NpdGlvbnNbaSAqIDNdLCBnLnBvc2l0aW9uc1tpICogMyArIDFdLCBnLnBvc2l0aW9uc1tpICogMyArIDJdKTtcbiAgICAgICAgY29uc3QgbiA9IGNjLlZlYzMuY3Jvc3MobmV3IGNjLlZlYzMoKSwgY2MuVmVjMy5zdWJ0cmFjdChuZXcgY2MuVmVjMygpLCBwKGIpLCBwKGEpKSwgY2MuVmVjMy5zdWJ0cmFjdChuZXcgY2MuVmVjMygpLCBwKGQpLCBwKGEpKSk7XG4gICAgICAgIGlmIChuLmxlbmd0aFNxcigpIDwgMWUtMTIpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCB2biA9IG5ldyBjYy5WZWMzKGcubm9ybWFsc1thICogM10sIGcubm9ybWFsc1thICogMyArIDFdLCBnLm5vcm1hbHNbYSAqIDMgKyAyXSk7XG4gICAgICAgIGFzc2VydC5vayhjYy5WZWMzLmRvdChuLCB2bikgPiAwLCBgdHJpYW5nbGUgJHt0IC8gM30gZmFjZXMgaXRzIG5vcm1hbGApO1xuICAgIH1cbn0pO1xuXG50ZXN0KCdyb2FkIHNoYXBlIGZhY2VzIHVwOyBmbGlwIG5vcm1hbHMgcmV2ZXJzZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBub2RlLCBjIH0gPSBsaW5lKDQpO1xuICAgIGNvbnN0IGUgPSBub2RlLmFkZENvbXBvbmVudChTcGxpbmVFeHRydWRlKSBhcyBTcGxpbmVFeHRydWRlO1xuICAgIGUuY29udGFpbmVyID0gYztcbiAgICBlLnNoYXBlID0gRXh0cnVkZVNoYXBlLlJvYWQ7XG4gICAgZS5yZWJ1aWxkKCk7XG4gICAgY29uc3QgZyA9IChlLm1lc2ggYXMgYW55KS5nZW9tZXRyeTtcbiAgICBhc3NlcnQub2soZy5ub3JtYWxzWzFdID4gMC45OSwgJ3JvYWQgbm9ybWFsICtZJyk7XG4gICAgZS5mbGlwTm9ybWFscyA9IHRydWU7XG4gICAgZS5yZWJ1aWxkKCk7XG4gICAgYXNzZXJ0Lm9rKChlLm1lc2ggYXMgYW55KS5nZW9tZXRyeS5ub3JtYWxzWzFdIDwgLTAuOTkpO1xufSk7XG5cbnRlc3QoJ3JlYnVpbGRzIHdoZW4gdGhlIHNwbGluZSBjaGFuZ2VzJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgbm9kZSwgYyB9ID0gbGluZSg0KTtcbiAgICBjb25zdCBlID0gbm9kZS5hZGRDb21wb25lbnQoU3BsaW5lRXh0cnVkZSkgYXMgU3BsaW5lRXh0cnVkZTtcbiAgICBlLmNvbnRhaW5lciA9IGM7XG4gICAgZS5yZWJ1aWxkKCk7XG4gICAgY29uc3QgbTEgPSBlLm1lc2g7XG4gICAgZS51cGRhdGUoKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZS5tZXNoLCBtMSwgJ25vIGNoYW5nZSwgbm8gcmVidWlsZCcpO1xuICAgIGMuc3BsaW5lLnNldEtub3RQb3NpdGlvbigxLCBuZXcgY2MuVmVjMyg4LCAwLCAwKSBhcyBhbnkpO1xuICAgIChjYy5kaXJlY3RvciBhcyBhbnkpLnRpY2s/LigpO1xuICAgIGUudXBkYXRlKCk7XG4gICAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKGUubWVzaCwgbTEpO1xufSk7XG5cbmNvbnNvbGUubG9nKCdcXG5TcGxpbmVJbnN0YW50aWF0ZScpO1xuXG5mdW5jdGlvbiBpbnN0YW50aWF0ZU9uKGxlbjogbnVtYmVyLCBvcHRzOiBQYXJ0aWFsPFNwbGluZUluc3RhbnRpYXRlPiA9IHt9KSB7XG4gICAgY29uc3QgeyBub2RlLCBjIH0gPSBsaW5lKGxlbik7XG4gICAgY29uc3Qgc2kgPSBub2RlLmFkZENvbXBvbmVudChTcGxpbmVJbnN0YW50aWF0ZSkgYXMgU3BsaW5lSW5zdGFudGlhdGU7XG4gICAgY29uc3QgaXRlbSA9IG5ldyBJbnN0YW50aWFibGVJdGVtKCk7XG4gICAgaXRlbS5wcmVmYWIgPSBuZXcgY2MuUHJlZmFiKG5ldyBjYy5Ob2RlKCdUcmVlJykpIGFzIGFueTtcbiAgICBzaS5pdGVtcyA9IFtpdGVtXTtcbiAgICBzaS5jb250YWluZXIgPSBjO1xuICAgIE9iamVjdC5hc3NpZ24oc2ksIG9wdHMpO1xuICAgIHNpLnVwZGF0ZUluc3RhbmNlcygpO1xuICAgIHJldHVybiBzaTtcbn1cblxudGVzdCgnc3BhY2luZyBkaXN0YW5jZSBwbGFjZXMgaW5zdGFuY2VzIGV2ZXJ5IHVuaXQnLCAoKSA9PiB7XG4gICAgY29uc3Qgc2kgPSBpbnN0YW50aWF0ZU9uKDEwLCB7IG1ldGhvZDogSW5zdGFudGlhdGVNZXRob2QuU3BhY2luZ0Rpc3RhbmNlLCBzcGFjaW5nOiBuZXcgY2MuVmVjMigxLCAxKSBhcyBhbnkgfSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNpLmluc3RhbmNlcy5sZW5ndGgsIDExKTtcbiAgICBuZWFyKHNpLmluc3RhbmNlc1szXS53b3JsZFBvc2l0aW9uLngsIDMsIDFlLTMpO1xufSk7XG5cbnRlc3QoJ2luc3RhbmNlIGNvdW50IHNwcmVhZHMgZXZlbmx5JywgKCkgPT4ge1xuICAgIGNvbnN0IHNpID0gaW5zdGFudGlhdGVPbigxMCwgeyBtZXRob2Q6IEluc3RhbnRpYXRlTWV0aG9kLkluc3RhbmNlQ291bnQsIGNvdW50OiBuZXcgY2MuVmVjMig1LCA1KSBhcyBhbnkgfSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNpLmluc3RhbmNlcy5sZW5ndGgsIDUpO1xuICAgIG5lYXIoc2kuaW5zdGFuY2VzWzRdLndvcmxkUG9zaXRpb24ueCwgMTAsIDFlLTMpO1xufSk7XG5cbnRlc3QoJ2xpbmVhciBkaXN0YW5jZSBtZWFzdXJlcyBzdHJhaWdodCBsaW5lcycsICgpID0+IHtcbiAgICBjb25zdCBzaSA9IGluc3RhbnRpYXRlT24oMTAsIHsgbWV0aG9kOiBJbnN0YW50aWF0ZU1ldGhvZC5MaW5lYXJEaXN0YW5jZSwgc3BhY2luZzogbmV3IGNjLlZlYzIoMi41LCAyLjUpIGFzIGFueSB9KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2kuaW5zdGFuY2VzLmxlbmd0aCwgNSk7XG4gICAgbmVhcihzaS5pbnN0YW5jZXNbMl0ud29ybGRQb3NpdGlvbi54LCA1LCAxZS0yKTtcbn0pO1xuXG50ZXN0KCdyYW5kb20gb2Zmc2V0cyBhcmUgcmVwZWF0YWJsZSB3aXRoIGEgc2VlZCcsICgpID0+IHtcbiAgICBjb25zdCBhID0gaW5zdGFudGlhdGVPbigxMCwgeyBzZWVkOiA3IH0pO1xuICAgIGEucG9zaXRpb25PZmZzZXQubWF4LnNldCgwLCAxLCAwKTtcbiAgICBhLnBvc2l0aW9uT2Zmc2V0LnJhbmRvbVkgPSB0cnVlO1xuICAgIGEudXBkYXRlSW5zdGFuY2VzKCk7XG4gICAgY29uc3QgeXMgPSBhLmluc3RhbmNlcy5tYXAoKG4pID0+IG4ud29ybGRQb3NpdGlvbi55KTtcbiAgICBhc3NlcnQub2soeXMuc29tZSgoeSkgPT4geSA+IDAuMDEpLCAnb2Zmc2V0IGFwcGxpZWQnKTtcbiAgICBhLnVwZGF0ZUluc3RhbmNlcygpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYS5pbnN0YW5jZXMubWFwKChuKSA9PiBuLndvcmxkUG9zaXRpb24ueSksIHlzKTtcbiAgICBhLnNlZWQgPSA4O1xuICAgIGEudXBkYXRlSW5zdGFuY2VzKCk7XG4gICAgYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbChhLmluc3RhbmNlcy5tYXAoKG4pID0+IG4ud29ybGRQb3NpdGlvbi55KSwgeXMpO1xufSk7XG5cbnRlc3QoJ2dlbmVyYXRlZCBpbnN0YW5jZXMgYXJlIG5vdCBzYXZlZCcsICgpID0+IHtcbiAgICBjb25zdCBzaSA9IGluc3RhbnRpYXRlT24oNCk7XG4gICAgZm9yIChjb25zdCBuIG9mIHNpLmluc3RhbmNlcykge1xuICAgICAgICBsZXQgZmxhZ2dlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBwOiBhbnkgPSBuOyBwOyBwID0gcC5wYXJlbnQpIGlmIChwLl9vYmpGbGFncyAmIGNjLkNDT2JqZWN0LkZsYWdzLkRvbnRTYXZlKSBmbGFnZ2VkID0gdHJ1ZTtcbiAgICAgICAgYXNzZXJ0Lm9rKGZsYWdnZWQpO1xuICAgIH1cbiAgICBjb25zdCBpbmZvID0gc2kuX2Jha2VJbmZvKCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGluZm8ubGVuZ3RoLCBzaS5pbnN0YW5jZXMubGVuZ3RoKTtcbn0pO1xuXG5jb25zb2xlLmxvZyhgXFxuJHtyZXN1bHRzLnBhc3NlZH0gcGFzc2VkLCAke3Jlc3VsdHMuZmFpbGVkfSBmYWlsZWRgKTtcbnByb2Nlc3MuZXhpdENvZGUgPSByZXN1bHRzLmZhaWxlZCA/IDEgOiAwO1xuIiwgIi8qKlxuICogQSBzbWFsbCBzdGFuZC1pbiBmb3IgdGhlICdjYycgZW5naW5lIG1vZHVsZSwgZW5vdWdoIHRvIHJ1biB0aGUgcnVudGltZVxuICogY2xhc3NlcyBhbmQgdGhlIHNjZW5lIHNjcmlwdCBpbiBub2RlLiBNYXRoIGZvbGxvd3MgdGhlIGVuZ2luZSdzIGZvcm11bGFzLlxuICovXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWF0aFxuXG5leHBvcnQgY2xhc3MgVmVjMyB7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpFUk8gPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIDApKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgVU5JVF9YID0gT2JqZWN0LmZyZWV6ZShuZXcgVmVjMygxLCAwLCAwKSk7XG4gICAgc3RhdGljIHJlYWRvbmx5IFVOSVRfWSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMSwgMCkpO1xuICAgIHN0YXRpYyByZWFkb25seSBVTklUX1ogPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIDEpKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRk9SV0FSRCA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMCwgLTEpKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4ID0gMCwgcHVibGljIHkgPSAwLCBwdWJsaWMgeiA9IDApIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgdiA9IHggYXMgYW55O1xuICAgICAgICAgICAgdGhpcy54ID0gdi54O1xuICAgICAgICAgICAgdGhpcy55ID0gdi55O1xuICAgICAgICAgICAgdGhpcy56ID0gdi56O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0KHg6IGFueSA9IDAsIHkgPSAwLCB6ID0gMCk6IHRoaXMge1xuICAgICAgICBpZiAodHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4Lnk7XG4gICAgICAgICAgICB0aGlzLnogPSB4Lno7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgIHRoaXMueiA9IHo7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMyh0aGlzLngsIHRoaXMueSwgdGhpcy56KTtcbiAgICB9XG5cbiAgICBhZGQodjogYW55KSB7XG4gICAgICAgIHRoaXMueCArPSB2Lng7XG4gICAgICAgIHRoaXMueSArPSB2Lnk7XG4gICAgICAgIHRoaXMueiArPSB2Lno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxlbmd0aFNxcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMuejtcbiAgICB9XG5cbiAgICBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXIoKSk7XG4gICAgfVxuXG4gICAgbm9ybWFsaXplKCkge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5sZW5ndGgoKTtcbiAgICAgICAgaWYgKGwgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnggLz0gbDtcbiAgICAgICAgICAgIHRoaXMueSAvPSBsO1xuICAgICAgICAgICAgdGhpcy56IC89IGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbmVnYXRpdmUoKSB7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgICAgIHRoaXMueSA9IC10aGlzLnk7XG4gICAgICAgIHRoaXMueiA9IC10aGlzLno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGVxdWFscyh2OiBhbnksIGVwcyA9IDFlLTYpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMueCAtIHYueCkgPD0gZXBzICYmIE1hdGguYWJzKHRoaXMueSAtIHYueSkgPD0gZXBzICYmIE1hdGguYWJzKHRoaXMueiAtIHYueikgPD0gZXBzO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0KG91dDogYW55LCBhOiBhbnksIG06IGFueSkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XG4gICAgICAgIGxldCB3ID0gbS5tMDMgKiB4ICsgbS5tMDcgKiB5ICsgbS5tMTEgKiB6ICsgbS5tMTU7XG4gICAgICAgIHcgPSB3ID8gMSAvIHcgOiAxO1xuICAgICAgICBvdXQueCA9IChtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHogKyBtLm0xMikgKiB3O1xuICAgICAgICBvdXQueSA9IChtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0wOSAqIHogKyBtLm0xMykgKiB3O1xuICAgICAgICBvdXQueiA9IChtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHogKyBtLm0xNCkgKiB3O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0Tm9ybWFsKG91dDogYW55LCBhOiBhbnksIG06IGFueSkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XG4gICAgICAgIG91dC54ID0gbS5tMDAgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMDggKiB6O1xuICAgICAgICBvdXQueSA9IG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogejtcbiAgICAgICAgb3V0LnogPSBtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHo7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyYW5zZm9ybVF1YXQob3V0OiBhbnksIGE6IGFueSwgcTogYW55KSB7XG4gICAgICAgIGNvbnN0IGl4ID0gcS53ICogYS54ICsgcS55ICogYS56IC0gcS56ICogYS55O1xuICAgICAgICBjb25zdCBpeSA9IHEudyAqIGEueSArIHEueiAqIGEueCAtIHEueCAqIGEuejtcbiAgICAgICAgY29uc3QgaXogPSBxLncgKiBhLnogKyBxLnggKiBhLnkgLSBxLnkgKiBhLng7XG4gICAgICAgIGNvbnN0IGl3ID0gLXEueCAqIGEueCAtIHEueSAqIGEueSAtIHEueiAqIGEuejtcbiAgICAgICAgb3V0LnggPSBpeCAqIHEudyArIGl3ICogLXEueCArIGl5ICogLXEueiAtIGl6ICogLXEueTtcbiAgICAgICAgb3V0LnkgPSBpeSAqIHEudyArIGl3ICogLXEueSArIGl6ICogLXEueCAtIGl4ICogLXEuejtcbiAgICAgICAgb3V0LnogPSBpeiAqIHEudyArIGl3ICogLXEueiArIGl4ICogLXEueSAtIGl5ICogLXEueDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm9ybWFsaXplKG91dDogYW55LCBhOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbCA9IE1hdGguaHlwb3QoYS54LCBhLnksIGEueik7XG4gICAgICAgIG91dC54ID0gbCA/IGEueCAvIGwgOiAwO1xuICAgICAgICBvdXQueSA9IGwgPyBhLnkgLyBsIDogMDtcbiAgICAgICAgb3V0LnogPSBsID8gYS56IC8gbCA6IDA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRvdChhOiBhbnksIGI6IGFueSkge1xuICAgICAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55ICsgYS56ICogYi56O1xuICAgIH1cblxuICAgIHN0YXRpYyBjcm9zcyhvdXQ6IGFueSwgYTogYW55LCBiOiBhbnkpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueSAqIGIueiAtIGEueiAqIGIueTtcbiAgICAgICAgY29uc3QgeSA9IGEueiAqIGIueCAtIGEueCAqIGIuejtcbiAgICAgICAgY29uc3QgeiA9IGEueCAqIGIueSAtIGEueSAqIGIueDtcbiAgICAgICAgb3V0LnggPSB4O1xuICAgICAgICBvdXQueSA9IHk7XG4gICAgICAgIG91dC56ID0gejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzdGFuY2UoYTogYW55LCBiOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguaHlwb3QoYS54IC0gYi54LCBhLnkgLSBiLnksIGEueiAtIGIueik7XG4gICAgfVxuXG4gICAgc3RhdGljIHN1YnRyYWN0KG91dDogYW55LCBhOiBhbnksIGI6IGFueSkge1xuICAgICAgICBvdXQueCA9IGEueCAtIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgLSBiLnk7XG4gICAgICAgIG91dC56ID0gYS56IC0gYi56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyBsZW5ndGhTcXIoYTogYW55KSB7XG4gICAgICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLno7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmVjMiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHggPSAwLCBwdWJsaWMgeSA9IDApIHt9XG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUXVhdCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IElERU5USVRZID0gT2JqZWN0LmZyZWV6ZShuZXcgUXVhdCgpKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4ID0gMCwgcHVibGljIHkgPSAwLCBwdWJsaWMgeiA9IDAsIHB1YmxpYyB3ID0gMSkge31cblxuICAgIHNldCh4OiBhbnksIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIHc/OiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy54ID0geC54O1xuICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICAgICAgdGhpcy56ID0geC56O1xuICAgICAgICAgICAgdGhpcy53ID0geC53O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHkhO1xuICAgICAgICAgICAgdGhpcy56ID0geiE7XG4gICAgICAgICAgICB0aGlzLncgPSB3ITtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBRdWF0KHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMudyk7XG4gICAgfVxuXG4gICAgc3RhdGljIG11bHRpcGx5KG91dDogYW55LCBhOiBhbnksIGI6IGFueSkge1xuICAgICAgICBjb25zdCB4ID0gYS54ICogYi53ICsgYS53ICogYi54ICsgYS55ICogYi56IC0gYS56ICogYi55O1xuICAgICAgICBjb25zdCB5ID0gYS55ICogYi53ICsgYS53ICogYi55ICsgYS56ICogYi54IC0gYS54ICogYi56O1xuICAgICAgICBjb25zdCB6ID0gYS56ICogYi53ICsgYS53ICogYi56ICsgYS54ICogYi55IC0gYS55ICogYi54O1xuICAgICAgICBjb25zdCB3ID0gYS53ICogYi53IC0gYS54ICogYi54IC0gYS55ICogYi55IC0gYS56ICogYi56O1xuICAgICAgICBvdXQueCA9IHg7XG4gICAgICAgIG91dC55ID0geTtcbiAgICAgICAgb3V0LnogPSB6O1xuICAgICAgICBvdXQudyA9IHc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGludmVydChvdXQ6IGFueSwgYTogYW55KSB7XG4gICAgICAgIGNvbnN0IGQgPSBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLnc7XG4gICAgICAgIGNvbnN0IGludiA9IGQgPyAxIC8gZCA6IDA7XG4gICAgICAgIG91dC54ID0gLWEueCAqIGludjtcbiAgICAgICAgb3V0LnkgPSAtYS55ICogaW52O1xuICAgICAgICBvdXQueiA9IC1hLnogKiBpbnY7XG4gICAgICAgIG91dC53ID0gYS53ICogaW52O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tRXVsZXIob3V0OiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaCA9ICgwLjUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICAgICAgeCAqPSBoO1xuICAgICAgICB5ICo9IGg7XG4gICAgICAgIHogKj0gaDtcbiAgICAgICAgY29uc3Qgc3ggPSBNYXRoLnNpbih4KSwgY3ggPSBNYXRoLmNvcyh4KSwgc3kgPSBNYXRoLnNpbih5KSwgY3kgPSBNYXRoLmNvcyh5KSwgc3ogPSBNYXRoLnNpbih6KSwgY3ogPSBNYXRoLmNvcyh6KTtcbiAgICAgICAgb3V0LnggPSBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dC55ID0gY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXQueiA9IGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0LncgPSBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3o7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqIExpa2UgTWF0My5mcm9tVmlld1VwOiArWiA9IHZpZXcuICovXG4gICAgc3RhdGljIGZyb21WaWV3VXAob3V0OiBhbnksIHZpZXc6IGFueSwgdXA6IGFueSA9IFZlYzMuVU5JVF9ZKSB7XG4gICAgICAgIGNvbnN0IHggPSBWZWMzLm5vcm1hbGl6ZShuZXcgVmVjMygpLCBWZWMzLmNyb3NzKG5ldyBWZWMzKCksIHVwLCB2aWV3KSk7XG4gICAgICAgIGlmICh4Lmxlbmd0aFNxcigpIDwgMWUtMTIpIHtcbiAgICAgICAgICAgIG91dC54ID0gMDsgb3V0LnkgPSAwOyBvdXQueiA9IDA7IG91dC53ID0gMTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeSA9IFZlYzMuY3Jvc3MobmV3IFZlYzMoKSwgdmlldywgeCk7XG4gICAgICAgIGNvbnN0IG0wMCA9IHgueCwgbTAxID0geS54LCBtMDIgPSB2aWV3Lng7XG4gICAgICAgIGNvbnN0IG0xMCA9IHgueSwgbTExID0geS55LCBtMTIgPSB2aWV3Lnk7XG4gICAgICAgIGNvbnN0IG0yMCA9IHgueiwgbTIxID0geS56LCBtMjIgPSB2aWV3Lno7XG4gICAgICAgIGNvbnN0IHRyYWNlID0gbTAwICsgbTExICsgbTIyO1xuICAgICAgICBpZiAodHJhY2UgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gMC41IC8gTWF0aC5zcXJ0KHRyYWNlICsgMSk7XG4gICAgICAgICAgICBvdXQudyA9IDAuMjUgLyBzOyBvdXQueCA9IChtMjEgLSBtMTIpICogczsgb3V0LnkgPSAobTAyIC0gbTIwKSAqIHM7IG91dC56ID0gKG0xMCAtIG0wMSkgKiBzO1xuICAgICAgICB9IGVsc2UgaWYgKG0wMCA+IG0xMSAmJiBtMDAgPiBtMjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMDAgLSBtMTEgLSBtMjIpO1xuICAgICAgICAgICAgb3V0LncgPSAobTIxIC0gbTEyKSAvIHM7IG91dC54ID0gMC4yNSAqIHM7IG91dC55ID0gKG0wMSArIG0xMCkgLyBzOyBvdXQueiA9IChtMDIgKyBtMjApIC8gcztcbiAgICAgICAgfSBlbHNlIGlmIChtMTEgPiBtMjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMTEgLSBtMDAgLSBtMjIpO1xuICAgICAgICAgICAgb3V0LncgPSAobTAyIC0gbTIwKSAvIHM7IG91dC54ID0gKG0wMSArIG0xMCkgLyBzOyBvdXQueSA9IDAuMjUgKiBzOyBvdXQueiA9IChtMTIgKyBtMjEpIC8gcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMjIgLSBtMDAgLSBtMTEpO1xuICAgICAgICAgICAgb3V0LncgPSAobTEwIC0gbTAxKSAvIHM7IG91dC54ID0gKG0wMiArIG0yMCkgLyBzOyBvdXQueSA9IChtMTIgKyBtMjEpIC8gczsgb3V0LnogPSAwLjI1ICogcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hdDQge1xuICAgIG0wMCA9IDE7IG0wMSA9IDA7IG0wMiA9IDA7IG0wMyA9IDA7XG4gICAgbTA0ID0gMDsgbTA1ID0gMTsgbTA2ID0gMDsgbTA3ID0gMDtcbiAgICBtMDggPSAwOyBtMDkgPSAwOyBtMTAgPSAxOyBtMTEgPSAwO1xuICAgIG0xMiA9IDA7IG0xMyA9IDA7IG0xNCA9IDA7IG0xNSA9IDE7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgSURFTlRJVFkgPSBPYmplY3QuZnJlZXplKG5ldyBNYXQ0KCkpO1xuXG4gICAgc3RhdGljIHRvQXJyYXkob3V0OiBudW1iZXJbXSwgbTogYW55KSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBbJ20wMCcsICdtMDEnLCAnbTAyJywgJ20wMycsICdtMDQnLCAnbTA1JywgJ20wNicsICdtMDcnLCAnbTA4JywgJ20wOScsICdtMTAnLCAnbTExJywgJ20xMicsICdtMTMnLCAnbTE0JywgJ20xNSddO1xuICAgICAgICBrZXlzLmZvckVhY2goKGssIGkpID0+IChvdXRbaV0gPSBtW2tdKSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21BcnJheShvdXQ6IGFueSwgYTogbnVtYmVyW10pIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IFsnbTAwJywgJ20wMScsICdtMDInLCAnbTAzJywgJ20wNCcsICdtMDUnLCAnbTA2JywgJ20wNycsICdtMDgnLCAnbTA5JywgJ20xMCcsICdtMTEnLCAnbTEyJywgJ20xMycsICdtMTQnLCAnbTE1J107XG4gICAgICAgIGtleXMuZm9yRWFjaCgoaywgaSkgPT4gKG91dFtrXSA9IGFbaV0pKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbXVsdGlwbHkob3V0OiBhbnksIGE6IGFueSwgYjogYW55KSB7XG4gICAgICAgIGNvbnN0IEEgPSBNYXQ0LnRvQXJyYXkoW10sIGEpO1xuICAgICAgICBjb25zdCBCID0gTWF0NC50b0FycmF5KFtdLCBiKTtcbiAgICAgICAgY29uc3QgUjogbnVtYmVyW10gPSBuZXcgQXJyYXkoMTYpLmZpbGwoMCk7XG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgNDsgYysrKSBmb3IgKGxldCByID0gMDsgciA8IDQ7IHIrKykge1xuICAgICAgICAgICAgbGV0IHMgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA0OyBrKyspIHMgKz0gQVtrICogNCArIHJdICogQltjICogNCArIGtdO1xuICAgICAgICAgICAgUltjICogNCArIHJdID0gcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBSKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW52ZXJ0KG91dDogYW55LCBtOiBhbnkpIHtcbiAgICAgICAgY29uc3QgYSA9IE1hdDQudG9BcnJheShbXSwgbSk7XG4gICAgICAgIGNvbnN0IFthMDAsIGEwMSwgYTAyLCBhMDMsIGExMCwgYTExLCBhMTIsIGExMywgYTIwLCBhMjEsIGEyMiwgYTIzLCBhMzAsIGEzMSwgYTMyLCBhMzNdID0gYTtcbiAgICAgICAgY29uc3QgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICAgICAgY29uc3QgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICAgICAgY29uc3QgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbiAgICAgICAgaWYgKCFkZXQpIHJldHVybiBNYXQ0LmZyb21BcnJheShvdXQsIE1hdDQudG9BcnJheShbXSwgTWF0NC5JREVOVElUWSkpO1xuICAgICAgICBkZXQgPSAxIC8gZGV0O1xuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBbXG4gICAgICAgICAgICAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldCwgKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQsXG4gICAgICAgICAgICAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldCwgKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQsXG4gICAgICAgICAgICAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldCwgKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQsXG4gICAgICAgICAgICAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldCwgKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQsXG4gICAgICAgICAgICAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldCwgKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQsXG4gICAgICAgICAgICAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldCwgKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQsXG4gICAgICAgICAgICAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldCwgKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQsXG4gICAgICAgICAgICAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldCwgKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQsXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKiBUcmFuc2xhdGlvbiAqIHJvdGF0aW9uICogc2NhbGUuICovXG4gICAgc3RhdGljIGZyb21SVFMob3V0OiBhbnksIHE6IGFueSwgdDogYW55LCBzOiBhbnkpIHtcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6LCB3IH0gPSBxO1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4LCB5MiA9IHkgKyB5LCB6MiA9IHogKyB6O1xuICAgICAgICBjb25zdCB4eCA9IHggKiB4MiwgeHkgPSB4ICogeTIsIHh6ID0geCAqIHoyLCB5eSA9IHkgKiB5MiwgeXogPSB5ICogejIsIHp6ID0geiAqIHoyLCB3eCA9IHcgKiB4Miwgd3kgPSB3ICogeTIsIHd6ID0gdyAqIHoyO1xuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBbXG4gICAgICAgICAgICAoMSAtICh5eSArIHp6KSkgKiBzLngsICh4eSArIHd6KSAqIHMueCwgKHh6IC0gd3kpICogcy54LCAwLFxuICAgICAgICAgICAgKHh5IC0gd3opICogcy55LCAoMSAtICh4eCArIHp6KSkgKiBzLnksICh5eiArIHd4KSAqIHMueSwgMCxcbiAgICAgICAgICAgICh4eiArIHd5KSAqIHMueiwgKHl6IC0gd3gpICogcy56LCAoMSAtICh4eCArIHl5KSkgKiBzLnosIDAsXG4gICAgICAgICAgICB0LngsIHQueSwgdC56LCAxLFxuICAgICAgICBdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb2xvciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHIgPSAyNTUsIHB1YmxpYyBnID0gMjU1LCBwdWJsaWMgYiA9IDI1NSwgcHVibGljIGEgPSAyNTUpIHt9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG9iamVjdHNcblxuZXhwb3J0IGNvbnN0IENDT2JqZWN0ID0ge1xuICAgIEZsYWdzOiB7XG4gICAgICAgIERvbnRTYXZlOiAxIDw8IDMsXG4gICAgICAgIEVkaXRvck9ubHk6IDEgPDwgNCxcbiAgICAgICAgTG9ja2VkSW5FZGl0b3I6IDEgPDwgOSxcbiAgICAgICAgSGlkZUluSGllcmFyY2h5OiAxIDw8IDEwLFxuICAgIH0sXG59O1xuXG5sZXQgdXVpZFNlcSA9IDA7XG5leHBvcnQgZnVuY3Rpb24gbWFrZVV1aWQocHJlZml4ID0gJ2lkJykge1xuICAgIHJldHVybiBgJHtwcmVmaXh9LSR7Kyt1dWlkU2VxfWA7XG59XG5cbnR5cGUgQ3RvcjxUPiA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IFQ7XG5cbmV4cG9ydCBjbGFzcyBOb2RlIHtcbiAgICB1dWlkID0gbWFrZVV1aWQoJ25vZGUnKTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcGFyZW50OiBOb2RlIHwgbnVsbCA9IG51bGw7XG4gICAgY2hpbGRyZW46IE5vZGVbXSA9IFtdO1xuICAgIGNvbXBvbmVudHM6IENvbXBvbmVudFtdID0gW107XG4gICAgbGF5ZXIgPSAxO1xuICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgaXNWYWxpZCA9IHRydWU7XG4gICAgX29iakZsYWdzID0gMDtcbiAgICBwb3NpdGlvbiA9IG5ldyBWZWMzKCk7XG4gICAgcm90YXRpb24gPSBuZXcgUXVhdCgpO1xuICAgIHNjYWxlID0gbmV3IFZlYzMoMSwgMSwgMSk7XG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb25bXT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSAnTm9kZScpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlSW5IaWVyYXJjaHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZSAmJiAoIXRoaXMucGFyZW50IHx8IHRoaXMucGFyZW50LmFjdGl2ZUluSGllcmFyY2h5KTtcbiAgICB9XG5cbiAgICBnZXQgc2NlbmUoKTogYW55IHtcbiAgICAgICAgbGV0IG46IE5vZGUgPSB0aGlzO1xuICAgICAgICB3aGlsZSAobi5wYXJlbnQpIG4gPSBuLnBhcmVudDtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuXG4gICAgc2V0UGFyZW50KHA6IE5vZGUgfCBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyksIDEpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHA7XG4gICAgICAgIGlmIChwKSBwLmNoaWxkcmVuLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkTWF0cml4KCk6IE1hdDQge1xuICAgICAgICBjb25zdCBsb2NhbCA9IE1hdDQuZnJvbVJUUyhuZXcgTWF0NCgpLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnBvc2l0aW9uLCB0aGlzLnNjYWxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmICEodGhpcy5wYXJlbnQgYXMgYW55KS5pc1NjZW5lID8gTWF0NC5tdWx0aXBseShuZXcgTWF0NCgpLCB0aGlzLnBhcmVudC53b3JsZE1hdHJpeCwgbG9jYWwpIDogbG9jYWw7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkUG9zaXRpb24oKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLndvcmxkTWF0cml4O1xuICAgICAgICByZXR1cm4gbmV3IFZlYzMobS5tMTIsIG0ubTEzLCBtLm0xNCk7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkUm90YXRpb24oKTogUXVhdCB7XG4gICAgICAgIGNvbnN0IGxvY2FsID0gdGhpcy5yb3RhdGlvbi5jbG9uZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUgPyBRdWF0Lm11bHRpcGx5KG5ldyBRdWF0KCksIHRoaXMucGFyZW50LndvcmxkUm90YXRpb24sIGxvY2FsKSA6IGxvY2FsO1xuICAgIH1cblxuICAgIGdldCBmb3J3YXJkKCkge1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1RdWF0KG5ldyBWZWMzKCksIG5ldyBWZWMzKDAsIDAsIC0xKSwgdGhpcy53b3JsZFJvdGF0aW9uKTtcbiAgICB9XG4gICAgZ2V0IHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1RdWF0KG5ldyBWZWMzKCksIG5ldyBWZWMzKDEsIDAsIDApLCB0aGlzLndvcmxkUm90YXRpb24pO1xuICAgIH1cbiAgICBnZXQgdXAoKSB7XG4gICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybVF1YXQobmV3IFZlYzMoKSwgbmV3IFZlYzMoMCwgMSwgMCksIHRoaXMud29ybGRSb3RhdGlvbik7XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24oeDogYW55LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24uc2V0KHgsIHksIHopO1xuICAgIH1cblxuICAgIHNldFdvcmxkUG9zaXRpb24oeDogYW55LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHAgPSB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyBuZXcgVmVjMyh4LngsIHgueSwgeC56KSA6IG5ldyBWZWMzKHgsIHksIHopO1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUpIFZlYzMudHJhbnNmb3JtTWF0NChwLCBwLCBNYXQ0LmludmVydChuZXcgTWF0NCgpLCB0aGlzLnBhcmVudC53b3JsZE1hdHJpeCkpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldChwKTtcbiAgICB9XG5cbiAgICBzZXRXb3JsZFJvdGF0aW9uKHg6IGFueSwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xuICAgICAgICBjb25zdCBxID0gdHlwZW9mIHggPT09ICdvYmplY3QnID8gbmV3IFF1YXQoeC54LCB4LnksIHgueiwgeC53KSA6IG5ldyBRdWF0KHgsIHksIHosIHcpO1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUpIFF1YXQubXVsdGlwbHkocSwgUXVhdC5pbnZlcnQobmV3IFF1YXQoKSwgdGhpcy5wYXJlbnQud29ybGRSb3RhdGlvbiksIHEpO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnNldChxKTtcbiAgICB9XG5cbiAgICBzZXRTY2FsZSh4OiBhbnksIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY2FsZS5zZXQoeCwgeSwgeik7XG4gICAgfVxuXG4gICAgZ2V0Q29tcG9uZW50PFQ+KEM6IEN0b3I8VD4gfCBzdHJpbmcpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiAodGhpcy5jb21wb25lbnRzLmZpbmQoKGMpID0+ICh0eXBlb2YgQyA9PT0gJ3N0cmluZycgPyAoYy5jb25zdHJ1Y3RvciBhcyBhbnkpLl9fY2lkID09PSBDIDogYyBpbnN0YW5jZW9mIChDIGFzIGFueSkpKSBhcyBhbnkpID8/IG51bGw7XG4gICAgfVxuXG4gICAgYWRkQ29tcG9uZW50PFQgZXh0ZW5kcyBDb21wb25lbnQ+KEM6IEN0b3I8VD4pOiBUIHtcbiAgICAgICAgY29uc3QgYyA9IG5ldyBDKCk7XG4gICAgICAgIGMubm9kZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKGMpO1xuICAgICAgICBjLl9fc3RhcnQoKTtcbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuXG4gICAgb24odHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMubGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXTtcbiAgICAgICAgbC5wdXNoKGZuKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KHR5cGUsIGwpO1xuICAgIH1cblxuICAgIG9mZih0eXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5saXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5zZXQodHlwZSwgbC5maWx0ZXIoKGYpID0+IGYgIT09IGZuKSk7XG4gICAgfVxuXG4gICAgaGFzRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmxpc3RlbmVycy5nZXQodHlwZSkgfHwgW10pLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZW1pdCh0eXBlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgZiBvZiB0aGlzLmxpc3RlbmVycy5nZXQodHlwZSkgfHwgW10pIGYoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLmNvbXBvbmVudHMpIGMuX19kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuc2V0UGFyZW50KG51bGwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCB7XG4gICAgbm9kZSE6IE5vZGU7XG4gICAgdXVpZCA9IG1ha2VVdWlkKCdjb21wJyk7XG4gICAgcHJpdmF0ZSBfZW5hYmxlZCA9IHRydWU7XG4gICAgaXNWYWxpZCA9IHRydWU7XG5cbiAgICBnZXQgZW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gICAgfVxuICAgIHNldCBlbmFibGVkKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHYgPT09IHRoaXMuX2VuYWJsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHY7XG4gICAgICAgIGlmICh2KSAodGhpcyBhcyBhbnkpLm9uRW5hYmxlPy4oKTtcbiAgICAgICAgZWxzZSAodGhpcyBhcyBhbnkpLm9uRGlzYWJsZT8uKCk7XG4gICAgfVxuXG4gICAgZ2V0IGVuYWJsZWRJbkhpZXJhcmNoeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZUluSGllcmFyY2h5O1xuICAgIH1cblxuICAgIGdldENvbXBvbmVudDxUPihDOiBDdG9yPFQ+KTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldENvbXBvbmVudChDKTtcbiAgICB9XG5cbiAgICBfX3N0YXJ0KCkge1xuICAgICAgICAodGhpcyBhcyBhbnkpLm9uTG9hZD8uKCk7XG4gICAgICAgIGlmICh0aGlzLl9lbmFibGVkKSAodGhpcyBhcyBhbnkpLm9uRW5hYmxlPy4oKTtcbiAgICB9XG5cbiAgICBfX2Rlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbmFibGVkKSAodGhpcyBhcyBhbnkpLm9uRGlzYWJsZT8uKCk7XG4gICAgICAgICh0aGlzIGFzIGFueSkub25EZXN0cm95Py4oKTtcbiAgICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fX2Rlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5ub2RlLmNvbXBvbmVudHMuc3BsaWNlKHRoaXMubm9kZS5jb21wb25lbnRzLmluZGV4T2YodGhpcyksIDEpO1xuICAgIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRlY29yYXRvcnNcblxuY29uc3QgY2xhc3NlcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbmZ1bmN0aW9uIGNjY2xhc3MobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIChjdG9yOiBhbnkpID0+IHtcbiAgICAgICAgY3Rvci5fX2NpZCA9IG5hbWU7XG4gICAgICAgIGNsYXNzZXMuc2V0KG5hbWUsIGN0b3IpO1xuICAgICAgICByZXR1cm4gY3RvcjtcbiAgICB9O1xufVxuXG5jb25zdCBub29wRGVjb3JhdG9yID0gKC4uLl9hOiBhbnlbXSkgPT4gKC4uLl9iOiBhbnlbXSkgPT4gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBwcm9wZXJ0eSguLi5hcmdzOiBhbnlbXSk6IGFueSB7XG4gICAgLy8gQHByb3BlcnR5IG9yIEBwcm9wZXJ0eSh7Li4ufSlcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gMiAmJiB0eXBlb2YgYXJnc1sxXSA9PT0gJ3N0cmluZycpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuICgpID0+IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNvbnN0IF9kZWNvcmF0b3IgPSB7XG4gICAgY2NjbGFzcyxcbiAgICBwcm9wZXJ0eSxcbiAgICBleGVjdXRlSW5FZGl0TW9kZTogKGN0b3I6IGFueSkgPT4gY3RvcixcbiAgICBkaXNhbGxvd011bHRpcGxlOiAoY3RvcjogYW55KSA9PiBjdG9yLFxuICAgIG1lbnU6IG5vb3BEZWNvcmF0b3IsXG4gICAgcmVxdWlyZUNvbXBvbmVudDogbm9vcERlY29yYXRvcixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjY2VudW0oX2U6IGFueSkge1xuICAgIHJldHVybiBfZTtcbn1cblxuZXhwb3J0IGNvbnN0IENDSW50ZWdlciA9ICdJbnRlZ2VyJztcblxuZXhwb3J0IGNvbnN0IGpzID0ge1xuICAgIGdldENsYXNzQnlOYW1lKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gY2xhc3Nlcy5nZXQobmFtZSkgPz8gbnVsbDtcbiAgICB9LFxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVuZ2luZVxuXG5leHBvcnQgY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICBzdGF0aWMgZW1pdEV2ZW50cyhfaGFuZGxlcnM6IGFueVtdLCAuLi5fYXJnczogYW55W10pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBNYXRlcmlhbCB7XG4gICAgaW5pdGlhbGl6ZShfaW5mbzogYW55KSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWVzaCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGdlb21ldHJ5OiBhbnkpIHt9XG4gICAgZGVzdHJveSgpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXNoUmVuZGVyZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIG1lc2g6IGFueSA9IG51bGw7XG4gICAgbWF0ZXJpYWxzOiBhbnlbXSA9IFtdO1xuICAgIHNoYWRvd0Nhc3RpbmdNb2RlID0gMDtcbiAgICByZWNlaXZlU2hhZG93ID0gMDtcbiAgICBzZXRTaGFyZWRNYXRlcmlhbChtOiBhbnksIGk6IG51bWJlcikge1xuICAgICAgICB0aGlzLm1hdGVyaWFsc1tpXSA9IG07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlZmFiIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YTogTm9kZSkge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRpYXRlKHA6IFByZWZhYik6IE5vZGUge1xuICAgIGNvbnN0IG4gPSBuZXcgTm9kZShwLmRhdGEubmFtZSk7XG4gICAgbi5zY2FsZS5zZXQocC5kYXRhLnNjYWxlKTtcbiAgICByZXR1cm4gbjtcbn1cblxuZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xuICAgIE1lc2hVdGlsczoge1xuICAgICAgICBjcmVhdGVNZXNoKGdlb21ldHJ5OiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWVzaChnZW9tZXRyeSk7XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmNvbnN0IGRpcmVjdG9yTGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+KCk7XG5sZXQgdG90YWxGcmFtZXMgPSAwO1xuXG5leHBvcnQgY29uc3QgZGlyZWN0b3I6IGFueSA9IHtcbiAgICByb290OiBudWxsLFxuICAgIF9zY2VuZTogbnVsbCBhcyBhbnksXG4gICAgZ2V0U2NlbmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2VuZTtcbiAgICB9LFxuICAgIGdldFRvdGFsRnJhbWVzKCkge1xuICAgICAgICByZXR1cm4gdG90YWxGcmFtZXM7XG4gICAgfSxcbiAgICBnZXRUb3RhbFRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0b3RhbEZyYW1lcyAqIDE2O1xuICAgIH0sXG4gICAgb24odHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgbCA9IGRpcmVjdG9yTGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXTtcbiAgICAgICAgbC5wdXNoKGZuKTtcbiAgICAgICAgZGlyZWN0b3JMaXN0ZW5lcnMuc2V0KHR5cGUsIGwpO1xuICAgIH0sXG4gICAgb2ZmKHR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKSB7XG4gICAgICAgIGRpcmVjdG9yTGlzdGVuZXJzLnNldCh0eXBlLCAoZGlyZWN0b3JMaXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdKS5maWx0ZXIoKGYpID0+IGYgIT09IGZuKSk7XG4gICAgfSxcbiAgICAvKiogVGVzdCBoZWxwZXI6IG9uZSBlZGl0b3IgZnJhbWUuICovXG4gICAgdGljaygpIHtcbiAgICAgICAgZm9yIChjb25zdCBmIG9mIGRpcmVjdG9yTGlzdGVuZXJzLmdldCgnZGlyZWN0b3JfYmVmb3JlX2NvbW1pdCcpIHx8IFtdKSBmKCk7XG4gICAgICAgIHRvdGFsRnJhbWVzKys7XG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBEaXJlY3RvciA9IHsgRVZFTlRfQkVGT1JFX0NPTU1JVDogJ2RpcmVjdG9yX2JlZm9yZV9jb21taXQnIH07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJlciA9IHtcbiAgICBzY2VuZToge1xuICAgICAgICBDYW1lcmFVc2FnZTogeyBTQ0VORV9WSUVXOiA1IH0sXG4gICAgICAgIENhbWVyYVByb2plY3Rpb246IHsgT1JUSE86IDAsIFBFUlNQRUNUSVZFOiAxIH0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBnZW9tZXRyeSA9IHtcbiAgICBSYXk6IGNsYXNzIHtcbiAgICAgICAgbzogVmVjMztcbiAgICAgICAgZDogVmVjMztcbiAgICAgICAgY29uc3RydWN0b3Iob3ggPSAwLCBveSA9IDAsIG96ID0gMCwgZHggPSAwLCBkeSA9IDAsIGR6ID0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMubyA9IG5ldyBWZWMzKG94LCBveSwgb3opO1xuICAgICAgICAgICAgdGhpcy5kID0gbmV3IFZlYzMoZHgsIGR5LCBkeik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVSYXljYXN0TW9kZTogeyBBTEw6IDAsIENMT1NFU1Q6IDEsIEFOWTogMiB9LFxuICAgIGludGVyc2VjdDoge1xuICAgICAgICByYXlBQUJCOiAoKSA9PiB0cnVlLFxuICAgICAgICByYXlNb2RlbDogKCkgPT4gMCxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGdhbWU6IGFueSA9IHsgY2FudmFzOiBudWxsIH07XG4iLCAiZXhwb3J0IGNvbnN0IEVESVRPUiA9IHRydWU7XG5leHBvcnQgY29uc3QgRURJVE9SX05PVF9JTl9QUkVWSUVXID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBQUkVWSUVXID0gZmFsc2U7XG5leHBvcnQgY29uc3QgQlVJTEQgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBERUJVRyA9IHRydWU7XG5leHBvcnQgY29uc3QgREVWID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBKU0IgPSBmYWxzZTtcbiIsICIvKipcbiAqIFNtYWxsIHZlY3RvciAvIHF1YXRlcm5pb24gaGVscGVycyBvbiBwbGFpbiB7eCwgeSwgen0gb2JqZWN0cy5cbiAqXG4gKiBUaGUgc3BsaW5lIGNvcmUgdXNlcyB0aGVzZSBpbnN0ZWFkIG9mIGNjLlZlYzMgc28gaXQgaGFzIG5vIGVuZ2luZVxuICogZGVwZW5kZW5jeTogY2MuVmVjMyAvIGNjLlF1YXQgc2F0aXNmeSB0aGUgaW50ZXJmYWNlcywgYW5kIHRoZSBjb3JlIGNhbiBiZVxuICogdW5pdC10ZXN0ZWQgb3V0c2lkZSB0aGUgZWRpdG9yLlxuICpcbiAqIEtub3Qgc3BhY2UgZm9sbG93cyBVbml0eSdzIGNvbnZlbnRpb246IGEga25vdCdzIGxvY2FsICtaIGlzIHRoZSBkaXJlY3Rpb25cbiAqIG9mIGl0cyBvdXQgdGFuZ2VudCBhbmQgbG9jYWwgK1kgaXMgaXRzIHVwIHZlY3Rvci5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIFYzIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHo6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBRNCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB6OiBudW1iZXI7XG4gICAgdzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgRVBTSUxPTiA9IDFlLTY7XG5cbmV4cG9ydCBmdW5jdGlvbiB2Myh4ID0gMCwgeSA9IDAsIHogPSAwKTogVjMge1xuICAgIHJldHVybiB7IHgsIHksIHogfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHE0KHggPSAwLCB5ID0gMCwgeiA9IDAsIHcgPSAxKTogUTQge1xuICAgIHJldHVybiB7IHgsIHksIHosIHcgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldDxUIGV4dGVuZHMgVjM+KG91dDogVCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IFQge1xuICAgIG91dC54ID0geDtcbiAgICBvdXQueSA9IHk7XG4gICAgb3V0LnogPSB6O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5PFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMyk6IFQge1xuICAgIG91dC54ID0gYS54O1xuICAgIG91dC55ID0gYS55O1xuICAgIG91dC56ID0gYS56O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhOiBWMyk6IFYzIHtcbiAgICByZXR1cm4geyB4OiBhLngsIHk6IGEueSwgejogYS56IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQ8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBiOiBWMyk6IFQge1xuICAgIG91dC54ID0gYS54ICsgYi54O1xuICAgIG91dC55ID0gYS55ICsgYi55O1xuICAgIG91dC56ID0gYS56ICsgYi56O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWI8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBiOiBWMyk6IFQge1xuICAgIG91dC54ID0gYS54IC0gYi54O1xuICAgIG91dC55ID0gYS55IC0gYi55O1xuICAgIG91dC56ID0gYS56IC0gYi56O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMsIHM6IG51bWJlcik6IFQge1xuICAgIG91dC54ID0gYS54ICogcztcbiAgICBvdXQueSA9IGEueSAqIHM7XG4gICAgb3V0LnogPSBhLnogKiBzO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKiBvdXQgPSBhICsgYiAqIHMgKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZUFuZEFkZDxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMsIGI6IFYzLCBzOiBudW1iZXIpOiBUIHtcbiAgICBvdXQueCA9IGEueCArIGIueCAqIHM7XG4gICAgb3V0LnkgPSBhLnkgKyBiLnkgKiBzO1xuICAgIG91dC56ID0gYS56ICsgYi56ICogcztcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmVnYXRlPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMyk6IFQge1xuICAgIG91dC54ID0gLWEueDtcbiAgICBvdXQueSA9IC1hLnk7XG4gICAgb3V0LnogPSAtYS56O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3QoYTogVjMsIGI6IFYzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55ICsgYS56ICogYi56O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3Jvc3M8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBiOiBWMyk6IFQge1xuICAgIGNvbnN0IHggPSBhLnkgKiBiLnogLSBhLnogKiBiLnk7XG4gICAgY29uc3QgeSA9IGEueiAqIGIueCAtIGEueCAqIGIuejtcbiAgICBjb25zdCB6ID0gYS54ICogYi55IC0gYS55ICogYi54O1xuICAgIG91dC54ID0geDtcbiAgICBvdXQueSA9IHk7XG4gICAgb3V0LnogPSB6O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZW5TcShhOiBWMyk6IG51bWJlciB7XG4gICAgcmV0dXJuIGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEuejtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlbihhOiBWMyk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydChhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzdFNxKGE6IFYzLCBiOiBWMyk6IG51bWJlciB7XG4gICAgY29uc3QgeCA9IGEueCAtIGIueDtcbiAgICBjb25zdCB5ID0gYS55IC0gYi55O1xuICAgIGNvbnN0IHogPSBhLnogLSBiLno7XG4gICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogejtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3QoYTogVjMsIGI6IFYzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGRpc3RTcShhLCBiKSk7XG59XG5cbi8qKiBOb3JtYWxpemVzIGBhYCBpbnRvIGBvdXRgOyBhIHplcm8gdmVjdG9yIHN0YXlzIHplcm8uICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMyk6IFQge1xuICAgIGNvbnN0IGwgPSBsZW4oYSk7XG4gICAgaWYgKGwgPCBFUFNJTE9OKSByZXR1cm4gc2V0KG91dCwgMCwgMCwgMCk7XG4gICAgcmV0dXJuIHNjYWxlKG91dCwgYSwgMSAvIGwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGVycDxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMsIGI6IFYzLCB0OiBudW1iZXIpOiBUIHtcbiAgICBvdXQueCA9IGEueCArIChiLnggLSBhLngpICogdDtcbiAgICBvdXQueSA9IGEueSArIChiLnkgLSBhLnkpICogdDtcbiAgICBvdXQueiA9IGEueiArIChiLnogLSBhLnopICogdDtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGE6IFYzLCBiOiBWMywgZXBzID0gRVBTSUxPTik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBNYXRoLmFicyhhLnggLSBiLngpIDw9IGVwcyAmJiBNYXRoLmFicyhhLnkgLSBiLnkpIDw9IGVwcyAmJiBNYXRoLmFicyhhLnogLSBiLnopIDw9IGVwcztcbn1cblxuLyoqIEFueSB1bml0IHZlY3RvciBwZXJwZW5kaWN1bGFyIHRvIGBhYCAod2hpY2ggbXVzdCBub3QgYmUgemVybykuICovXG5leHBvcnQgZnVuY3Rpb24gYW55UGVycGVuZGljdWxhcjxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMpOiBUIHtcbiAgICAvLyBDcm9zcyB3aXRoIHRoZSBheGlzIGxlYXN0IGFsaWduZWQgd2l0aCBgYWAuXG4gICAgY29uc3QgYXggPSBNYXRoLmFicyhhLngpO1xuICAgIGNvbnN0IGF5ID0gTWF0aC5hYnMoYS55KTtcbiAgICBjb25zdCBheiA9IE1hdGguYWJzKGEueik7XG4gICAgaWYgKGF4IDw9IGF5ICYmIGF4IDw9IGF6KSBjcm9zcyhvdXQsIGEsIHsgeDogMSwgeTogMCwgejogMCB9KTtcbiAgICBlbHNlIGlmIChheSA8PSBheikgY3Jvc3Mob3V0LCBhLCB7IHg6IDAsIHk6IDEsIHo6IDAgfSk7XG4gICAgZWxzZSBjcm9zcyhvdXQsIGEsIHsgeDogMCwgeTogMCwgejogMSB9KTtcbiAgICByZXR1cm4gbm9ybWFsaXplKG91dCwgb3V0KTtcbn1cblxuLyoqIFJlbW92ZXMgdGhlIHBhcnQgb2YgYHZgIGFsb25nIHVuaXQgdmVjdG9yIGBuYC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0T25QbGFuZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgdjogVjMsIG46IFYzKTogVCB7XG4gICAgY29uc3QgZCA9IGRvdCh2LCBuKTtcbiAgICByZXR1cm4gc2NhbGVBbmRBZGQob3V0LCB2LCBuLCAtZCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBxdWF0ZXJuaW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gcVNldDxUIGV4dGVuZHMgUTQ+KG91dDogVCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKTogVCB7XG4gICAgb3V0LnggPSB4O1xuICAgIG91dC55ID0geTtcbiAgICBvdXQueiA9IHo7XG4gICAgb3V0LncgPSB3O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxQ29weTxUIGV4dGVuZHMgUTQ+KG91dDogVCwgYTogUTQpOiBUIHtcbiAgICByZXR1cm4gcVNldChvdXQsIGEueCwgYS55LCBhLnosIGEudyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxSWRlbnRpdHk8VCBleHRlbmRzIFE0PihvdXQ6IFQpOiBUIHtcbiAgICByZXR1cm4gcVNldChvdXQsIDAsIDAsIDAsIDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcU11bDxUIGV4dGVuZHMgUTQ+KG91dDogVCwgYTogUTQsIGI6IFE0KTogVCB7XG4gICAgY29uc3QgeCA9IGEudyAqIGIueCArIGEueCAqIGIudyArIGEueSAqIGIueiAtIGEueiAqIGIueTtcbiAgICBjb25zdCB5ID0gYS53ICogYi55IC0gYS54ICogYi56ICsgYS55ICogYi53ICsgYS56ICogYi54O1xuICAgIGNvbnN0IHogPSBhLncgKiBiLnogKyBhLnggKiBiLnkgLSBhLnkgKiBiLnggKyBhLnogKiBiLnc7XG4gICAgY29uc3QgdyA9IGEudyAqIGIudyAtIGEueCAqIGIueCAtIGEueSAqIGIueSAtIGEueiAqIGIuejtcbiAgICByZXR1cm4gcVNldChvdXQsIHgsIHksIHosIHcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcU5vcm1hbGl6ZTxUIGV4dGVuZHMgUTQ+KG91dDogVCwgYTogUTQpOiBUIHtcbiAgICBjb25zdCBsID0gTWF0aC5zcXJ0KGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEueiArIGEudyAqIGEudyk7XG4gICAgaWYgKGwgPCBFUFNJTE9OKSByZXR1cm4gcUlkZW50aXR5KG91dCk7XG4gICAgcmV0dXJuIHFTZXQob3V0LCBhLnggLyBsLCBhLnkgLyBsLCBhLnogLyBsLCBhLncgLyBsKTtcbn1cblxuLyoqIEludmVyc2Ugb2YgYSB1bml0IHF1YXRlcm5pb24gKGl0cyBjb25qdWdhdGUpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFJbnZlcnQ8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGE6IFE0KTogVCB7XG4gICAgY29uc3QgbCA9IGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEueiArIGEudyAqIGEudztcbiAgICBpZiAobCA8IEVQU0lMT04pIHJldHVybiBxSWRlbnRpdHkob3V0KTtcbiAgICByZXR1cm4gcVNldChvdXQsIC1hLnggLyBsLCAtYS55IC8gbCwgLWEueiAvIGwsIGEudyAvIGwpO1xufVxuXG4vKiogUm90YXRlcyB2ZWN0b3IgYHZgIGJ5IHF1YXRlcm5pb24gYHFgLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFSb3RhdGU8VCBleHRlbmRzIFYzPihvdXQ6IFQsIHE6IFE0LCB2OiBWMyk6IFQge1xuICAgIC8vIHQgPSAyICogY3Jvc3MocS54eXosIHYpOyB2JyA9IHYgKyB3ICogdCArIGNyb3NzKHEueHl6LCB0KVxuICAgIGNvbnN0IHR4ID0gMiAqIChxLnkgKiB2LnogLSBxLnogKiB2LnkpO1xuICAgIGNvbnN0IHR5ID0gMiAqIChxLnogKiB2LnggLSBxLnggKiB2LnopO1xuICAgIGNvbnN0IHR6ID0gMiAqIChxLnggKiB2LnkgLSBxLnkgKiB2LngpO1xuICAgIGNvbnN0IHggPSB2LnggKyBxLncgKiB0eCArIChxLnkgKiB0eiAtIHEueiAqIHR5KTtcbiAgICBjb25zdCB5ID0gdi55ICsgcS53ICogdHkgKyAocS56ICogdHggLSBxLnggKiB0eik7XG4gICAgY29uc3QgeiA9IHYueiArIHEudyAqIHR6ICsgKHEueCAqIHR5IC0gcS55ICogdHgpO1xuICAgIHJldHVybiBzZXQob3V0LCB4LCB5LCB6KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHFGcm9tQXhpc0FuZ2xlPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBheGlzOiBWMywgcmFkOiBudW1iZXIpOiBUIHtcbiAgICBjb25zdCBuID0gbm9ybWFsaXplKHYzKCksIGF4aXMpO1xuICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQgLyAyKTtcbiAgICByZXR1cm4gcVNldChvdXQsIG4ueCAqIHMsIG4ueSAqIHMsIG4ueiAqIHMsIE1hdGguY29zKHJhZCAvIDIpKTtcbn1cblxuLyoqIFJvdGF0aW9uIG1hdHJpeCBjb2x1bW5zICh4LCB5LCB6IGF4ZXMpIHRvIHF1YXRlcm5pb24uICovXG5leHBvcnQgZnVuY3Rpb24gcUZyb21BeGVzPFQgZXh0ZW5kcyBRND4ob3V0OiBULCB4OiBWMywgeTogVjMsIHo6IFYzKTogVCB7XG4gICAgY29uc3QgbTAwID0geC54LCBtMDEgPSB5LngsIG0wMiA9IHoueDtcbiAgICBjb25zdCBtMTAgPSB4LnksIG0xMSA9IHkueSwgbTEyID0gei55O1xuICAgIGNvbnN0IG0yMCA9IHgueiwgbTIxID0geS56LCBtMjIgPSB6Lno7XG4gICAgY29uc3QgdHJhY2UgPSBtMDAgKyBtMTEgKyBtMjI7XG4gICAgaWYgKHRyYWNlID4gMCkge1xuICAgICAgICBjb25zdCBzID0gMC41IC8gTWF0aC5zcXJ0KHRyYWNlICsgMSk7XG4gICAgICAgIHJldHVybiBxTm9ybWFsaXplKG91dCwgcVNldChvdXQsIChtMjEgLSBtMTIpICogcywgKG0wMiAtIG0yMCkgKiBzLCAobTEwIC0gbTAxKSAqIHMsIDAuMjUgLyBzKSk7XG4gICAgfVxuICAgIGlmIChtMDAgPiBtMTEgJiYgbTAwID4gbTIyKSB7XG4gICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMDAgLSBtMTEgLSBtMjIpO1xuICAgICAgICByZXR1cm4gcU5vcm1hbGl6ZShvdXQsIHFTZXQob3V0LCAwLjI1ICogcywgKG0wMSArIG0xMCkgLyBzLCAobTAyICsgbTIwKSAvIHMsIChtMjEgLSBtMTIpIC8gcykpO1xuICAgIH1cbiAgICBpZiAobTExID4gbTIyKSB7XG4gICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMTEgLSBtMDAgLSBtMjIpO1xuICAgICAgICByZXR1cm4gcU5vcm1hbGl6ZShvdXQsIHFTZXQob3V0LCAobTAxICsgbTEwKSAvIHMsIDAuMjUgKiBzLCAobTEyICsgbTIxKSAvIHMsIChtMDIgLSBtMjApIC8gcykpO1xuICAgIH1cbiAgICBjb25zdCBzID0gMiAqIE1hdGguc3FydCgxICsgbTIyIC0gbTAwIC0gbTExKTtcbiAgICByZXR1cm4gcU5vcm1hbGl6ZShvdXQsIHFTZXQob3V0LCAobTAyICsgbTIwKSAvIHMsIChtMTIgKyBtMjEpIC8gcywgMC4yNSAqIHMsIChtMTAgLSBtMDEpIC8gcykpO1xufVxuXG4vKipcbiAqIFJvdGF0aW9uIHRoYXQgbWFwcyArWiB0byBgZm9yd2FyZGAgYW5kICtZIGFzIGNsb3NlIGFzIHBvc3NpYmxlIHRvIGB1cGBcbiAqIChVbml0eSdzIExvb2tSb3RhdGlvbikuIERlZ2VuZXJhdGUgaW5wdXQgZmFsbHMgYmFjayB0byBhIHBlcnBlbmRpY3VsYXIgdXAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxTG9va1JvdGF0aW9uPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBmb3J3YXJkOiBWMywgdXA6IFYzKTogVCB7XG4gICAgY29uc3QgeiA9IG5vcm1hbGl6ZSh2MygpLCBmb3J3YXJkKTtcbiAgICBpZiAobGVuU3EoeikgPCBFUFNJTE9OKSByZXR1cm4gcUlkZW50aXR5KG91dCk7XG4gICAgY29uc3QgeCA9IGNyb3NzKHYzKCksIHVwLCB6KTtcbiAgICBpZiAobGVuU3EoeCkgPCBFUFNJTE9OKSB7XG4gICAgICAgIC8vIHVwIGlzIHBhcmFsbGVsIHRvIGZvcndhcmQ6IGtlZXAgYSBzdGFibGUgcGVycGVuZGljdWxhci5cbiAgICAgICAgYW55UGVycGVuZGljdWxhcih4LCB6KTtcbiAgICB9XG4gICAgbm9ybWFsaXplKHgsIHgpO1xuICAgIGNvbnN0IHkgPSBjcm9zcyh2MygpLCB6LCB4KTtcbiAgICByZXR1cm4gcUZyb21BeGVzKG91dCwgeCwgeSwgeik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxU2xlcnA8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGE6IFE0LCBiOiBRNCwgdDogbnVtYmVyKTogVCB7XG4gICAgbGV0IGJ4ID0gYi54LCBieSA9IGIueSwgYnogPSBiLnosIGJ3ID0gYi53O1xuICAgIGxldCBjb3MgPSBhLnggKiBieCArIGEueSAqIGJ5ICsgYS56ICogYnogKyBhLncgKiBidztcbiAgICBpZiAoY29zIDwgMCkge1xuICAgICAgICBjb3MgPSAtY29zO1xuICAgICAgICBieCA9IC1ieDtcbiAgICAgICAgYnkgPSAtYnk7XG4gICAgICAgIGJ6ID0gLWJ6O1xuICAgICAgICBidyA9IC1idztcbiAgICB9XG4gICAgbGV0IHMwOiBudW1iZXI7XG4gICAgbGV0IHMxOiBudW1iZXI7XG4gICAgaWYgKDEgLSBjb3MgPiBFUFNJTE9OKSB7XG4gICAgICAgIGNvbnN0IG9tZWdhID0gTWF0aC5hY29zKE1hdGgubWluKDEsIGNvcykpO1xuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihvbWVnYSk7XG4gICAgICAgIHMwID0gTWF0aC5zaW4oKDEgLSB0KSAqIG9tZWdhKSAvIHNpbjtcbiAgICAgICAgczEgPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2luO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHMwID0gMSAtIHQ7XG4gICAgICAgIHMxID0gdDtcbiAgICB9XG4gICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgczAgKiBhLnggKyBzMSAqIGJ4LCBzMCAqIGEueSArIHMxICogYnksIHMwICogYS56ICsgczEgKiBieiwgczAgKiBhLncgKyBzMSAqIGJ3KSk7XG59XG5cbi8qKiBSb3RhdGlvbiB0YWtpbmcgdW5pdCB2ZWN0b3IgYGZyb21gIG9udG8gdW5pdCB2ZWN0b3IgYHRvYCAoc2hvcnRlc3QgYXJjKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxRnJvbVRvPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBmcm9tOiBWMywgdG86IFYzKTogVCB7XG4gICAgY29uc3QgZCA9IGRvdChmcm9tLCB0byk7XG4gICAgaWYgKGQgPj0gMSAtIEVQU0lMT04pIHJldHVybiBxSWRlbnRpdHkob3V0KTtcbiAgICBpZiAoZCA8PSAtMSArIEVQU0lMT04pIHtcbiAgICAgICAgY29uc3QgYXhpcyA9IGFueVBlcnBlbmRpY3VsYXIodjMoKSwgZnJvbSk7XG4gICAgICAgIHJldHVybiBxU2V0KG91dCwgYXhpcy54LCBheGlzLnksIGF4aXMueiwgMCk7XG4gICAgfVxuICAgIGNvbnN0IGMgPSBjcm9zcyh2MygpLCBmcm9tLCB0byk7XG4gICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgYy54LCBjLnksIGMueiwgMSArIGQpKTtcbn1cblxuLyoqIEV1bGVyIGFuZ2xlcyBpbiBkZWdyZWVzIChDb2NvcyBvcmRlcjogcm90YXRlIGFyb3VuZCBaLCB0aGVuIFksIHRoZW4gWC4uLiBtYXRjaGluZyBjYy5RdWF0LnRvRXVsZXIpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFUb0V1bGVyPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBxOiBRNCk6IFQge1xuICAgIC8vIFNhbWUgZm9ybXVsYSBhcyBjYy5RdWF0LnRvRXVsZXIgKG91dGVyWiA9IGZhbHNlKS5cbiAgICBjb25zdCB7IHgsIHksIHosIHcgfSA9IHE7XG4gICAgbGV0IGJhbmsgPSAwO1xuICAgIGxldCBoZWFkaW5nID0gMDtcbiAgICBsZXQgYXR0aXR1ZGUgPSAwO1xuICAgIGNvbnN0IHRlc3QgPSB4ICogeSArIHogKiB3O1xuICAgIGlmICh0ZXN0ID4gMC40OTk5OTkpIHtcbiAgICAgICAgYmFuayA9IDA7XG4gICAgICAgIGhlYWRpbmcgPSAoMiAqIE1hdGguYXRhbjIoeCwgdykgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgYXR0aXR1ZGUgPSA5MDtcbiAgICB9IGVsc2UgaWYgKHRlc3QgPCAtMC40OTk5OTkpIHtcbiAgICAgICAgYmFuayA9IDA7XG4gICAgICAgIGhlYWRpbmcgPSAoLTIgKiBNYXRoLmF0YW4yKHgsIHcpICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIGF0dGl0dWRlID0gLTkwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNxeCA9IHggKiB4O1xuICAgICAgICBjb25zdCBzcXkgPSB5ICogeTtcbiAgICAgICAgY29uc3Qgc3F6ID0geiAqIHo7XG4gICAgICAgIGJhbmsgPSAoTWF0aC5hdGFuMigyICogeCAqIHcgLSAyICogeSAqIHosIDEgLSAyICogc3F4IC0gMiAqIHNxeikgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgaGVhZGluZyA9IChNYXRoLmF0YW4yKDIgKiB5ICogdyAtIDIgKiB4ICogeiwgMSAtIDIgKiBzcXkgLSAyICogc3F6KSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgICAgICBhdHRpdHVkZSA9IChNYXRoLmFzaW4oMiAqIHRlc3QpICogMTgwKSAvIE1hdGguUEk7XG4gICAgfVxuICAgIHJldHVybiBzZXQob3V0LCBiYW5rLCBoZWFkaW5nLCBhdHRpdHVkZSk7XG59XG5cbi8qKiBJbnZlcnNlIG9mIHFUb0V1bGVyIChzYW1lIGFzIGNjLlF1YXQuZnJvbUV1bGVyKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxRnJvbUV1bGVyPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBleDogbnVtYmVyLCBleTogbnVtYmVyLCBlejogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgaGFsZlRvUmFkID0gKDAuNSAqIE1hdGguUEkpIC8gMTgwO1xuICAgIGNvbnN0IHggPSBleCAqIGhhbGZUb1JhZDtcbiAgICBjb25zdCB5ID0gZXkgKiBoYWxmVG9SYWQ7XG4gICAgY29uc3QgeiA9IGV6ICogaGFsZlRvUmFkO1xuICAgIGNvbnN0IHN4ID0gTWF0aC5zaW4oeCk7XG4gICAgY29uc3QgY3ggPSBNYXRoLmNvcyh4KTtcbiAgICBjb25zdCBzeSA9IE1hdGguc2luKHkpO1xuICAgIGNvbnN0IGN5ID0gTWF0aC5jb3MoeSk7XG4gICAgY29uc3Qgc3ogPSBNYXRoLnNpbih6KTtcbiAgICBjb25zdCBjeiA9IE1hdGguY29zKHopO1xuICAgIHJldHVybiBxU2V0KFxuICAgICAgICBvdXQsXG4gICAgICAgIHN4ICogY3kgKiBjeiArIGN4ICogc3kgKiBzeixcbiAgICAgICAgY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6LFxuICAgICAgICBjeCAqIGN5ICogc3ogLSBzeCAqIHN5ICogY3osXG4gICAgICAgIGN4ICogY3kgKiBjeiAtIHN4ICogc3kgKiBzeixcbiAgICApO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWF0cmljZXNcblxuLyoqIENvbHVtbi1tYWpvciA0eDQgbWF0cml4LCBsYWlkIG91dCBsaWtlIGNjLk1hdDQgKG0wMC4ubTE1KS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTTQge1xuICAgIG0wMDogbnVtYmVyOyBtMDE6IG51bWJlcjsgbTAyOiBudW1iZXI7IG0wMzogbnVtYmVyO1xuICAgIG0wNDogbnVtYmVyOyBtMDU6IG51bWJlcjsgbTA2OiBudW1iZXI7IG0wNzogbnVtYmVyO1xuICAgIG0wODogbnVtYmVyOyBtMDk6IG51bWJlcjsgbTEwOiBudW1iZXI7IG0xMTogbnVtYmVyO1xuICAgIG0xMjogbnVtYmVyOyBtMTM6IG51bWJlcjsgbTE0OiBudW1iZXI7IG0xNTogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbTRUcmFuc2Zvcm1Qb2ludDxUIGV4dGVuZHMgVjM+KG91dDogVCwgbTogTTQsIHA6IFYzKTogVCB7XG4gICAgY29uc3QgeyB4LCB5LCB6IH0gPSBwO1xuICAgIGxldCB3ID0gbS5tMDMgKiB4ICsgbS5tMDcgKiB5ICsgbS5tMTEgKiB6ICsgbS5tMTU7XG4gICAgdyA9IHcgPyAxIC8gdyA6IDE7XG4gICAgcmV0dXJuIHNldChcbiAgICAgICAgb3V0LFxuICAgICAgICAobS5tMDAgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMDggKiB6ICsgbS5tMTIpICogdyxcbiAgICAgICAgKG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogeiArIG0ubTEzKSAqIHcsXG4gICAgICAgIChtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHogKyBtLm0xNCkgKiB3LFxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtNFRyYW5zZm9ybURpcjxUIGV4dGVuZHMgVjM+KG91dDogVCwgbTogTTQsIGQ6IFYzKTogVCB7XG4gICAgY29uc3QgeyB4LCB5LCB6IH0gPSBkO1xuICAgIHJldHVybiBzZXQob3V0LCBtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHosIG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogeiwgbS5tMDIgKiB4ICsgbS5tMDYgKiB5ICsgbS5tMTAgKiB6KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHY6IG51bWJlciwgbG86IG51bWJlciwgaGk6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHYgPCBsbyA/IGxvIDogdiA+IGhpID8gaGkgOiB2O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAwMSh2OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2IDwgMCA/IDAgOiB2ID4gMSA/IDEgOiB2O1xufVxuXG4vKiogUG9zaXRpdmUgbW9kdWxvOiB3cmFwcyBgdmAgaW50byBbMCwgbikuICovXG5leHBvcnQgZnVuY3Rpb24gd3JhcCh2OiBudW1iZXIsIG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuICgodiAlIG4pICsgbikgJSBuO1xufVxuIiwgIi8qKlxuICogQ3ViaWMgQmV6aWVyIGN1cnZlIG1hdGggKHB1cmUsIG5vIGVuZ2luZSBkZXBlbmRlbmN5KS5cbiAqXG4gKiBBIGN1cnZlIGlzIHRoZSBzZWdtZW50IGJldHdlZW4gdHdvIGtub3RzOiBwMCA9IGtub3QgcG9zaXRpb24sXG4gKiBwMSA9IHAwICsgb3V0IHRhbmdlbnQsIHAyID0gbmV4dCBrbm90ICsgaXRzIGluIHRhbmdlbnQsIHAzID0gbmV4dCBrbm90LlxuICovXG5pbXBvcnQgeyBWMywgdjMsIHNldCwgY29weSwgc3ViLCBzY2FsZSwgbGVuLCBsZXJwLCBub3JtYWxpemUsIGxlblNxLCBFUFNJTE9OLCBkaXN0IH0gZnJvbSAnLi9tYXRoJztcblxuZXhwb3J0IGludGVyZmFjZSBDdXJ2ZSB7XG4gICAgcDA6IFYzO1xuICAgIHAxOiBWMztcbiAgICBwMjogVjM7XG4gICAgcDM6IFYzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3VydmUoKTogQ3VydmUge1xuICAgIHJldHVybiB7IHAwOiB2MygpLCBwMTogdjMoKSwgcDI6IHYzKCksIHAzOiB2MygpIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5Q3VydmUob3V0OiBDdXJ2ZSwgYzogQ3VydmUpOiBDdXJ2ZSB7XG4gICAgY29weShvdXQucDAsIGMucDApO1xuICAgIGNvcHkob3V0LnAxLCBjLnAxKTtcbiAgICBjb3B5KG91dC5wMiwgYy5wMik7XG4gICAgY29weShvdXQucDMsIGMucDMpO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsUG9zaXRpb248VCBleHRlbmRzIFYzPihvdXQ6IFQsIGM6IEN1cnZlLCB0OiBudW1iZXIpOiBUIHtcbiAgICBjb25zdCB1ID0gMSAtIHQ7XG4gICAgY29uc3QgYSA9IHUgKiB1ICogdTtcbiAgICBjb25zdCBiID0gMyAqIHUgKiB1ICogdDtcbiAgICBjb25zdCBkID0gMyAqIHUgKiB0ICogdDtcbiAgICBjb25zdCBlID0gdCAqIHQgKiB0O1xuICAgIHJldHVybiBzZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgYSAqIGMucDAueCArIGIgKiBjLnAxLnggKyBkICogYy5wMi54ICsgZSAqIGMucDMueCxcbiAgICAgICAgYSAqIGMucDAueSArIGIgKiBjLnAxLnkgKyBkICogYy5wMi55ICsgZSAqIGMucDMueSxcbiAgICAgICAgYSAqIGMucDAueiArIGIgKiBjLnAxLnogKyBkICogYy5wMi56ICsgZSAqIGMucDMueixcbiAgICApO1xufVxuXG4vKiogRmlyc3QgZGVyaXZhdGl2ZSBkQi9kdCAobm90IG5vcm1hbGl6ZWQpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2YWxEZXJpdmF0aXZlPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBjOiBDdXJ2ZSwgdDogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgdSA9IDEgLSB0O1xuICAgIGNvbnN0IGEgPSAzICogdSAqIHU7XG4gICAgY29uc3QgYiA9IDYgKiB1ICogdDtcbiAgICBjb25zdCBkID0gMyAqIHQgKiB0O1xuICAgIHJldHVybiBzZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgYSAqIChjLnAxLnggLSBjLnAwLngpICsgYiAqIChjLnAyLnggLSBjLnAxLngpICsgZCAqIChjLnAzLnggLSBjLnAyLngpLFxuICAgICAgICBhICogKGMucDEueSAtIGMucDAueSkgKyBiICogKGMucDIueSAtIGMucDEueSkgKyBkICogKGMucDMueSAtIGMucDIueSksXG4gICAgICAgIGEgKiAoYy5wMS56IC0gYy5wMC56KSArIGIgKiAoYy5wMi56IC0gYy5wMS56KSArIGQgKiAoYy5wMy56IC0gYy5wMi56KSxcbiAgICApO1xufVxuXG4vKiogU2Vjb25kIGRlcml2YXRpdmUgZDJCL2R0Mi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmFsQWNjZWxlcmF0aW9uPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBjOiBDdXJ2ZSwgdDogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgdSA9IDEgLSB0O1xuICAgIHJldHVybiBzZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgNiAqIHUgKiAoYy5wMi54IC0gMiAqIGMucDEueCArIGMucDAueCkgKyA2ICogdCAqIChjLnAzLnggLSAyICogYy5wMi54ICsgYy5wMS54KSxcbiAgICAgICAgNiAqIHUgKiAoYy5wMi55IC0gMiAqIGMucDEueSArIGMucDAueSkgKyA2ICogdCAqIChjLnAzLnkgLSAyICogYy5wMi55ICsgYy5wMS55KSxcbiAgICAgICAgNiAqIHUgKiAoYy5wMi56IC0gMiAqIGMucDEueiArIGMucDAueikgKyA2ICogdCAqIChjLnAzLnogLSAyICogYy5wMi56ICsgYy5wMS56KSxcbiAgICApO1xufVxuXG5jb25zdCBfZCA9IHYzKCk7XG5cbi8qKlxuICogRGlyZWN0aW9uIG9mIHRyYXZlbCBhdCB0LCB3aXRoIGEgdXNhYmxlIHZhbHVlIGV2ZW4gd2hlcmUgdGhlIGRlcml2YXRpdmVcbiAqIHZhbmlzaGVzIChsaW5lYXIga25vdHMgaGF2ZSB6ZXJvIHRhbmdlbnRzLCBzbyBCJygwKSA9IDApOiBmYWxscyBiYWNrIHRvIHRoZVxuICogc2Vjb25kIGRlcml2YXRpdmUsIHRoZW4gdG8gdGhlIGNob3JkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXZhbERpcmVjdGlvbjxUIGV4dGVuZHMgVjM+KG91dDogVCwgYzogQ3VydmUsIHQ6IG51bWJlcik6IFQge1xuICAgIGV2YWxEZXJpdmF0aXZlKF9kLCBjLCB0KTtcbiAgICBpZiAobGVuU3EoX2QpID4gRVBTSUxPTiAqIEVQU0lMT04pIHJldHVybiBub3JtYWxpemUob3V0LCBfZCk7XG4gICAgLy8gQXQgYW4gZW5kIHdpdGggYSB6ZXJvIHRhbmdlbnQgdGhlIGN1cnZlIGxlYXZlcyBhbG9uZyB0aGUgc2Vjb25kIGRlcml2YXRpdmVcbiAgICAvLyAoc2lnbjogdG93YXJkcyB0aGUgaW5zaWRlIG9mIHRoZSBjdXJ2ZSBhdCB0ID0gMCwgYmFjayBhbG9uZyBpdCBhdCB0ID0gMSkuXG4gICAgZXZhbEFjY2VsZXJhdGlvbihfZCwgYywgdCk7XG4gICAgaWYgKGxlblNxKF9kKSA+IEVQU0lMT04gKiBFUFNJTE9OKSB7XG4gICAgICAgIGlmICh0ID4gMC41KSBzY2FsZShfZCwgX2QsIC0xKTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIF9kKTtcbiAgICB9XG4gICAgc3ViKF9kLCBjLnAzLCBjLnAwKTtcbiAgICByZXR1cm4gbm9ybWFsaXplKG91dCwgX2QpO1xufVxuXG4vKiogU3BsaXRzIGF0IHQgd2l0aCBkZSBDYXN0ZWxqYXU7IHRoZSBoYWx2ZXMgc2hhcmUgdGhlIHNwbGl0IHBvaW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0KGM6IEN1cnZlLCB0OiBudW1iZXIsIGxlZnQ6IEN1cnZlLCByaWdodDogQ3VydmUpOiB2b2lkIHtcbiAgICBjb25zdCBwMDEgPSBsZXJwKHYzKCksIGMucDAsIGMucDEsIHQpO1xuICAgIGNvbnN0IHAxMiA9IGxlcnAodjMoKSwgYy5wMSwgYy5wMiwgdCk7XG4gICAgY29uc3QgcDIzID0gbGVycCh2MygpLCBjLnAyLCBjLnAzLCB0KTtcbiAgICBjb25zdCBwMDEyID0gbGVycCh2MygpLCBwMDEsIHAxMiwgdCk7XG4gICAgY29uc3QgcDEyMyA9IGxlcnAodjMoKSwgcDEyLCBwMjMsIHQpO1xuICAgIGNvbnN0IG1pZCA9IGxlcnAodjMoKSwgcDAxMiwgcDEyMywgdCk7XG4gICAgY29uc3QgcDAgPSBjb3B5KHYzKCksIGMucDApO1xuICAgIGNvbnN0IHAzID0gY29weSh2MygpLCBjLnAzKTtcbiAgICBjb3B5KGxlZnQucDAsIHAwKTtcbiAgICBjb3B5KGxlZnQucDEsIHAwMSk7XG4gICAgY29weShsZWZ0LnAyLCBwMDEyKTtcbiAgICBjb3B5KGxlZnQucDMsIG1pZCk7XG4gICAgY29weShyaWdodC5wMCwgbWlkKTtcbiAgICBjb3B5KHJpZ2h0LnAxLCBwMTIzKTtcbiAgICBjb3B5KHJpZ2h0LnAyLCBwMjMpO1xuICAgIGNvcHkocmlnaHQucDMsIHAzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGluZWFyKGM6IEN1cnZlKTogYm9vbGVhbiB7XG4gICAgLy8gQm90aCBoYW5kbGVzIGxpZSBvbiB0aGUgY2hvcmQuXG4gICAgY29uc3QgY2hvcmQgPSBzdWIodjMoKSwgYy5wMywgYy5wMCk7XG4gICAgY29uc3QgbCA9IGxlbihjaG9yZCk7XG4gICAgaWYgKGwgPCBFUFNJTE9OKSByZXR1cm4gZGlzdChjLnAxLCBjLnAwKSA8IEVQU0lMT04gJiYgZGlzdChjLnAyLCBjLnAzKSA8IEVQU0lMT047XG4gICAgcmV0dXJuIGRpc3RUb0xpbmUoYy5wMSwgYy5wMCwgY2hvcmQsIGwpIDwgbCAqIDFlLTUgJiYgZGlzdFRvTGluZShjLnAyLCBjLnAwLCBjaG9yZCwgbCkgPCBsICogMWUtNTtcbn1cblxuZnVuY3Rpb24gZGlzdFRvTGluZShwOiBWMywgbzogVjMsIGQ6IFYzLCBkbDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBweCA9IHAueCAtIG8ueDtcbiAgICBjb25zdCBweSA9IHAueSAtIG8ueTtcbiAgICBjb25zdCBweiA9IHAueiAtIG8uejtcbiAgICBjb25zdCBjeCA9IHB5ICogZC56IC0gcHogKiBkLnk7XG4gICAgY29uc3QgY3kgPSBweiAqIGQueCAtIHB4ICogZC56O1xuICAgIGNvbnN0IGN6ID0gcHggKiBkLnkgLSBweSAqIGQueDtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGN4ICogY3ggKyBjeSAqIGN5ICsgY3ogKiBjeikgLyBkbDtcbn1cblxuLy8gOC1wb2ludCBHYXVzcy1MZWdlbmRyZSBvbiBbMCwgMV06IGV4YWN0IGZvciBwb2x5bm9taWFscyB1cCB0byBkZWdyZWUgMTUsXG4vLyBwbGVudHkgZm9yIHxCJyh0KXwgb3ZlciBhIHNob3J0IHBhcmFtZXRlciByYW5nZS5cbmNvbnN0IEdMX1ggPSBbXG4gICAgMC4wMTk4NTUwNzE3NTEyMzE5LCAwLjEwMTY2Njc2MTI5MzE4NjYsIDAuMjM3MjMzNzk1MDQxODM1NSwgMC40MDgyODI2Nzg3NTIxNzUxLFxuICAgIDAuNTkxNzE3MzIxMjQ3ODI0OSwgMC43NjI3NjYyMDQ5NTgxNjQ1LCAwLjg5ODMzMzIzODcwNjgxMzQsIDAuOTgwMTQ0OTI4MjQ4NzY4MSxcbl07XG5jb25zdCBHTF9XID0gW1xuICAgIDAuMDUwNjE0MjY4MTQ1MTg4MSwgMC4xMTExOTA1MTcyMjY2ODcyLCAwLjE1Njg1MzMyMjkzODk0MzYsIDAuMTgxMzQxODkxNjg5MTgxMCxcbiAgICAwLjE4MTM0MTg5MTY4OTE4MTAsIDAuMTU2ODUzMzIyOTM4OTQzNiwgMC4xMTExOTA1MTcyMjY2ODcyLCAwLjA1MDYxNDI2ODE0NTE4ODEsXG5dO1xuXG4vKiogQXJjIGxlbmd0aCBiZXR3ZWVuIHBhcmFtZXRlcnMgYSBhbmQgYi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcmNMZW5ndGgoYzogQ3VydmUsIGEgPSAwLCBiID0gMSk6IG51bWJlciB7XG4gICAgaWYgKGIgPD0gYSkgcmV0dXJuIDA7XG4gICAgY29uc3QgaCA9IGIgLSBhO1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgIGV2YWxEZXJpdmF0aXZlKF9kLCBjLCBhICsgaCAqIEdMX1hbaV0pO1xuICAgICAgICBzdW0gKz0gR0xfV1tpXSAqIGxlbihfZCk7XG4gICAgfVxuICAgIHJldHVybiBzdW0gKiBoO1xufVxuXG4vKipcbiAqIEN1bXVsYXRpdmUgYXJjIGxlbmd0aCBhdCBldmVubHkgc3BhY2VkIHBhcmFtZXRlcnM6IGx1dFtpXSBpcyB0aGUgbGVuZ3RoIGZyb21cbiAqIHQgPSAwIHRvIHQgPSBpIC8gKG4gLSAxKS4gVXNlZCB0byBtYXAgZGlzdGFuY2UgdG8gdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTGVuZ3RoVGFibGUoYzogQ3VydmUsIG46IG51bWJlciwgb3V0PzogRmxvYXQ2NEFycmF5KTogRmxvYXQ2NEFycmF5IHtcbiAgICBjb25zdCBsdXQgPSBvdXQgJiYgb3V0Lmxlbmd0aCA9PT0gbiA/IG91dCA6IG5ldyBGbG9hdDY0QXJyYXkobik7XG4gICAgbHV0WzBdID0gMDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgICBsdXRbaV0gPSBsdXRbaSAtIDFdICsgYXJjTGVuZ3RoKGMsIChpIC0gMSkgLyAobiAtIDEpLCBpIC8gKG4gLSAxKSk7XG4gICAgfVxuICAgIHJldHVybiBsdXQ7XG59XG5cbi8qKiBQYXJhbWV0ZXIgdCBhdCBhcmMgbGVuZ3RoIGBkYCBhbG9uZyB0aGUgY3VydmUsIHVzaW5nIGEgdGFibGUgZnJvbSBidWlsZExlbmd0aFRhYmxlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRBdExlbmd0aChsdXQ6IEZsb2F0NjRBcnJheSwgZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBuID0gbHV0Lmxlbmd0aDtcbiAgICBjb25zdCB0b3RhbCA9IGx1dFtuIC0gMV07XG4gICAgaWYgKGQgPD0gMCB8fCB0b3RhbCA8PSAwKSByZXR1cm4gMDtcbiAgICBpZiAoZCA+PSB0b3RhbCkgcmV0dXJuIDE7XG4gICAgbGV0IGxvID0gMDtcbiAgICBsZXQgaGkgPSBuIC0gMTtcbiAgICB3aGlsZSAoaGkgLSBsbyA+IDEpIHtcbiAgICAgICAgY29uc3QgbWlkID0gKGxvICsgaGkpID4+IDE7XG4gICAgICAgIGlmIChsdXRbbWlkXSA8IGQpIGxvID0gbWlkO1xuICAgICAgICBlbHNlIGhpID0gbWlkO1xuICAgIH1cbiAgICBjb25zdCBzZWcgPSBsdXRbaGldIC0gbHV0W2xvXTtcbiAgICBjb25zdCBmID0gc2VnID4gMCA/IChkIC0gbHV0W2xvXSkgLyBzZWcgOiAwO1xuICAgIHJldHVybiAobG8gKyBmKSAvIChuIC0gMSk7XG59XG5cbi8qKiBBcmMgbGVuZ3RoIGZyb20gMCB0byB0LCB1c2luZyBhIHRhYmxlIGZyb20gYnVpbGRMZW5ndGhUYWJsZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGhBdFQobHV0OiBGbG9hdDY0QXJyYXksIHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbiA9IGx1dC5sZW5ndGg7XG4gICAgaWYgKHQgPD0gMCkgcmV0dXJuIDA7XG4gICAgaWYgKHQgPj0gMSkgcmV0dXJuIGx1dFtuIC0gMV07XG4gICAgY29uc3QgeCA9IHQgKiAobiAtIDEpO1xuICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKHgpO1xuICAgIGNvbnN0IGYgPSB4IC0gaTtcbiAgICByZXR1cm4gbHV0W2ldICsgKGx1dFtNYXRoLm1pbihpICsgMSwgbiAtIDEpXSAtIGx1dFtpXSkgKiBmO1xufVxuXG4vKipcbiAqIENsb3Nlc3QgcGFyYW1ldGVyIG9uIHRoZSBjdXJ2ZSB0byBwb2ludCBwOiBjb2Fyc2Ugc2FtcGxpbmcgZm9sbG93ZWQgYnlcbiAqIGEgZmV3IHJvdW5kcyBvZiBsb2NhbCByZWZpbmVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbmVhcmVzdFQoYzogQ3VydmUsIHA6IFYzLCBzYW1wbGVzID0gMTYsIGl0ZXJhdGlvbnMgPSA0KTogeyB0OiBudW1iZXI7IGRpc3RTcTogbnVtYmVyIH0ge1xuICAgIGNvbnN0IHEgPSB2MygpO1xuICAgIGxldCBiZXN0VCA9IDA7XG4gICAgbGV0IGJlc3QgPSBJbmZpbml0eTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzYW1wbGVzOyBpKyspIHtcbiAgICAgICAgY29uc3QgdCA9IGkgLyBzYW1wbGVzO1xuICAgICAgICBldmFsUG9zaXRpb24ocSwgYywgdCk7XG4gICAgICAgIGNvbnN0IGQgPSAocS54IC0gcC54KSAqKiAyICsgKHEueSAtIHAueSkgKiogMiArIChxLnogLSBwLnopICoqIDI7XG4gICAgICAgIGlmIChkIDwgYmVzdCkge1xuICAgICAgICAgICAgYmVzdCA9IGQ7XG4gICAgICAgICAgICBiZXN0VCA9IHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0ZXAgPSAxIC8gc2FtcGxlcztcbiAgICBmb3IgKGxldCBpdCA9IDA7IGl0IDwgaXRlcmF0aW9uczsgaXQrKykge1xuICAgICAgICBzdGVwICo9IDAuNTtcbiAgICAgICAgZm9yIChjb25zdCB0IG9mIFtiZXN0VCAtIHN0ZXAsIGJlc3RUICsgc3RlcF0pIHtcbiAgICAgICAgICAgIGlmICh0IDwgMCB8fCB0ID4gMSkgY29udGludWU7XG4gICAgICAgICAgICBldmFsUG9zaXRpb24ocSwgYywgdCk7XG4gICAgICAgICAgICBjb25zdCBkID0gKHEueCAtIHAueCkgKiogMiArIChxLnkgLSBwLnkpICoqIDIgKyAocS56IC0gcC56KSAqKiAyO1xuICAgICAgICAgICAgaWYgKGQgPCBiZXN0KSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IGQ7XG4gICAgICAgICAgICAgICAgYmVzdFQgPSB0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHQ6IGJlc3RULCBkaXN0U3E6IGJlc3QgfTtcbn1cbiIsICIvKipcbiAqIFNwbGluZSBsb2dpYyBvbiBwbGFpbiBkYXRhIChubyBlbmdpbmUgZGVwZW5kZW5jeSkuXG4gKlxuICogQSBzcGxpbmUgaXMgYSBsaXN0IG9mIEJlemllciBrbm90cy4gRWFjaCBrbm90IGhhcyBhIHBvc2l0aW9uLCBhIHJvdGF0aW9uIGFuZFxuICogdHdvIHRhbmdlbnRzIGV4cHJlc3NlZCBpbiB0aGUga25vdCdzIG93biBzcGFjZSAoK1ogPSBkaXJlY3Rpb24gb2YgdHJhdmVsLFxuICogK1kgPSB1cCksIHBsdXMgYSB0YW5nZW50IG1vZGUgdGhhdCBkZWNpZGVzIGhvdyB0aGUgdGFuZ2VudHMgYXJlIGtlcHQ6XG4gKlxuICogLSBBdXRvU21vb3RoOiB0YW5nZW50cyBjb21wdXRlZCBmcm9tIHRoZSBuZWlnaGJvciBwb3NpdGlvbnMgKENhdG11bGwtUm9tKS5cbiAqIC0gTGluZWFyOiAgICAgbm8gdGFuZ2VudHMsIHN0cmFpZ2h0IHNlZ21lbnRzLlxuICogLSBNaXJyb3JlZDogICB0YW5nZW50cyBvcHBvc2l0ZSBhbmQgb2YgZXF1YWwgbGVuZ3RoLlxuICogLSBDb250aW51b3VzOiB0YW5nZW50cyBvcHBvc2l0ZSwgbGVuZ3RocyBpbmRlcGVuZGVudC5cbiAqIC0gQnJva2VuOiAgICAgdGFuZ2VudHMgaW5kZXBlbmRlbnQuXG4gKlxuICogUG9zaXRpb25zIGFyZSBpbiB0aGUgc3BsaW5lJ3MgbG9jYWwgc3BhY2UgKHRoZSBTcGxpbmVDb250YWluZXIgbm9kZSkuXG4gKi9cbmltcG9ydCB7XG4gICAgVjMsIFE0LCB2MywgcTQsIHNldCwgY29weSwgYWRkLCBzdWIsIHNjYWxlLCBub3JtYWxpemUsIGxlbiwgbGVuU3EsIGRvdCwgY3Jvc3MsIGRpc3QsIGRpc3RTcSxcbiAgICBxUm90YXRlLCBxSW52ZXJ0LCBxTXVsLCBxQ29weSwgcUxvb2tSb3RhdGlvbiwgcUZyb21BeGlzQW5nbGUsIHFOb3JtYWxpemUsIHFJZGVudGl0eSxcbiAgICBwcm9qZWN0T25QbGFuZSwgYW55UGVycGVuZGljdWxhciwgd3JhcCwgY2xhbXAwMSwgRVBTSUxPTiwgc2NhbGVBbmRBZGQsIGxlcnAsXG59IGZyb20gJy4vbWF0aCc7XG5pbXBvcnQge1xuICAgIEN1cnZlLCBjdXJ2ZSwgZXZhbFBvc2l0aW9uLCBldmFsRGlyZWN0aW9uLCBldmFsRGVyaXZhdGl2ZSwgc3BsaXQsIGJ1aWxkTGVuZ3RoVGFibGUsIHRBdExlbmd0aCwgYXJjTGVuZ3RoLCBuZWFyZXN0VCxcbn0gZnJvbSAnLi9jdXJ2ZSc7XG5cbmV4cG9ydCBlbnVtIFRhbmdlbnRNb2RlIHtcbiAgICBBdXRvU21vb3RoID0gMCxcbiAgICBMaW5lYXIgPSAxLFxuICAgIE1pcnJvcmVkID0gMixcbiAgICBDb250aW51b3VzID0gMyxcbiAgICBCcm9rZW4gPSA0LFxufVxuXG4vKiogRGVmYXVsdCBDYXRtdWxsLVJvbSBwYXJhbWV0ZXJpemF0aW9uIHVzZWQgYnkgQXV0b1Ntb290aCBrbm90cyAoMCB1bmlmb3JtLCAwLjUgY2VudHJpcGV0YWwsIDEgY2hvcmRhbCkuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9URU5TSU9OID0gMC41O1xuXG5leHBvcnQgaW50ZXJmYWNlIEtub3RMaWtlIHtcbiAgICBwb3NpdGlvbjogVjM7XG4gICAgdGFuZ2VudEluOiBWMztcbiAgICB0YW5nZW50T3V0OiBWMztcbiAgICByb3RhdGlvbjogUTQ7XG4gICAgbW9kZTogbnVtYmVyO1xuICAgIHRlbnNpb246IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTcGxpbmVMaWtlIHtcbiAgICBrbm90czogS25vdExpa2VbXTtcbiAgICBjbG9zZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua0xpa2Uge1xuICAgIC8qKiBGbGF0dGVuZWQgKHNwbGluZUluZGV4LCBrbm90SW5kZXgpIHBhaXJzLiAqL1xuICAgIGtub3RzOiBudW1iZXJbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb250YWluZXJMaWtlIHtcbiAgICBzcGxpbmVzOiBTcGxpbmVMaWtlW107XG4gICAgbGlua3M6IExpbmtMaWtlW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjdG9yeSB7XG4gICAga25vdCgpOiBLbm90TGlrZTtcbiAgICBzcGxpbmUoKTogU3BsaW5lTGlrZTtcbiAgICBsaW5rKCk6IExpbmtMaWtlO1xufVxuXG5jb25zdCBVUDogVjMgPSB7IHg6IDAsIHk6IDEsIHo6IDAgfTtcbmNvbnN0IEZPUldBUkQ6IFYzID0geyB4OiAwLCB5OiAwLCB6OiAxIH07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBpbmRpY2VzXG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2SW5kZXgoaTogbnVtYmVyLCBjb3VudDogbnVtYmVyLCBjbG9zZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIHJldHVybiBjbG9zZWQgPyB3cmFwKGkgLSAxLCBjb3VudCkgOiBNYXRoLm1heChpIC0gMSwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXh0SW5kZXgoaTogbnVtYmVyLCBjb3VudDogbnVtYmVyLCBjbG9zZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIHJldHVybiBjbG9zZWQgPyB3cmFwKGkgKyAxLCBjb3VudCkgOiBNYXRoLm1pbihpICsgMSwgY291bnQgLSAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnZlQ291bnQoczogU3BsaW5lTGlrZSk6IG51bWJlciB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmIChuIDwgMikgcmV0dXJuIDA7XG4gICAgcmV0dXJuIHMuY2xvc2VkID8gbiA6IG4gLSAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFuZ2VudHNFZGl0YWJsZShtb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbW9kZSA9PT0gVGFuZ2VudE1vZGUuTWlycm9yZWQgfHwgbW9kZSA9PT0gVGFuZ2VudE1vZGUuQ29udGludW91cyB8fCBtb2RlID09PSBUYW5nZW50TW9kZS5Ccm9rZW47XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGtub3RzXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5S25vdDxLIGV4dGVuZHMgS25vdExpa2U+KG91dDogSywgazogS25vdExpa2UpOiBLIHtcbiAgICBjb3B5KG91dC5wb3NpdGlvbiwgay5wb3NpdGlvbik7XG4gICAgY29weShvdXQudGFuZ2VudEluLCBrLnRhbmdlbnRJbik7XG4gICAgY29weShvdXQudGFuZ2VudE91dCwgay50YW5nZW50T3V0KTtcbiAgICBxQ29weShvdXQucm90YXRpb24sIGsucm90YXRpb24pO1xuICAgIG91dC5tb2RlID0gay5tb2RlO1xuICAgIG91dC50ZW5zaW9uID0gay50ZW5zaW9uO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBrbm90VXA8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGs6IEtub3RMaWtlKTogVCB7XG4gICAgcmV0dXJuIHFSb3RhdGUob3V0LCBrLnJvdGF0aW9uLCBVUCk7XG59XG5cbi8qKiBPdXQgdGFuZ2VudCBpbiBzcGxpbmUgc3BhY2UgKG9mZnNldCBmcm9tIHRoZSBrbm90IHBvc2l0aW9uKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0YW5nZW50T3V0VmVjPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBrOiBLbm90TGlrZSk6IFQge1xuICAgIHJldHVybiBxUm90YXRlKG91dCwgay5yb3RhdGlvbiwgay50YW5nZW50T3V0KTtcbn1cblxuLyoqIEluIHRhbmdlbnQgaW4gc3BsaW5lIHNwYWNlIChvZmZzZXQgZnJvbSB0aGUga25vdCBwb3NpdGlvbikuICovXG5leHBvcnQgZnVuY3Rpb24gdGFuZ2VudEluVmVjPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBrOiBLbm90TGlrZSk6IFQge1xuICAgIHJldHVybiBxUm90YXRlKG91dCwgay5yb3RhdGlvbiwgay50YW5nZW50SW4pO1xufVxuXG4vKipcbiAqIEtub3Qgcm90YXRpb24gZm9yIGEgdGFuZ2VudCBkaXJlY3Rpb24gYW5kIGEgbm9ybWFsICh1cCkuIExpa2UgVW5pdHknc1xuICogR2V0S25vdFJvdGF0aW9uOiB1cCBpcyB0aGUgbm9ybWFsIHByb2plY3RlZCBvZmYgdGhlIHRhbmdlbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrbm90Um90YXRpb248VCBleHRlbmRzIFE0PihvdXQ6IFQsIHRhbmdlbnQ6IFYzLCBub3JtYWw6IFYzKTogVCB7XG4gICAgY29uc3QgdCA9IG5vcm1hbGl6ZSh2MygpLCB0YW5nZW50KTtcbiAgICBsZXQgbiA9IG5vcm1hbGl6ZSh2MygpLCBub3JtYWwpO1xuICAgIGlmIChsZW5TcShuKSA8IEVQU0lMT04pIG4gPSBjb3B5KHYzKCksIFVQKTtcbiAgICBpZiAobGVuU3EodCkgPCBFUFNJTE9OKSB7XG4gICAgICAgIC8vIE5vIGRpcmVjdGlvbjogZm9yd2FyZCBpcyBhbnkgZGlyZWN0aW9uIHBlcnBlbmRpY3VsYXIgdG8gdGhlIG5vcm1hbC5cbiAgICAgICAgY29uc3QgZiA9IGFueVBlcnBlbmRpY3VsYXIodjMoKSwgbik7XG4gICAgICAgIHJldHVybiBxTG9va1JvdGF0aW9uKG91dCwgZiwgbik7XG4gICAgfVxuICAgIGlmIChNYXRoLmFicyhkb3QodCwgbikpID4gMSAtIDFlLTUpIHtcbiAgICAgICAgLy8gTm9ybWFsIHBhcmFsbGVsIHRvIHRoZSB0YW5nZW50OiBwaWNrIGFuIHVwIHBlcnBlbmRpY3VsYXIgdG8gaXQuXG4gICAgICAgIGNvbnN0IHVwID0gY3Jvc3ModjMoKSwgdCwgeyB4OiAxLCB5OiAwLCB6OiAwIH0pO1xuICAgICAgICBpZiAobGVuU3EodXApIDwgRVBTSUxPTikgY3Jvc3ModXAsIHQsIHsgeDogMCwgeTogMCwgejogMSB9KTtcbiAgICAgICAgcmV0dXJuIHFMb29rUm90YXRpb24ob3V0LCB0LCBub3JtYWxpemUodXAsIHVwKSk7XG4gICAgfVxuICAgIGNvbnN0IHVwID0gbm9ybWFsaXplKHYzKCksIHByb2plY3RPblBsYW5lKHYzKCksIG4sIHQpKTtcbiAgICByZXR1cm4gcUxvb2tSb3RhdGlvbihvdXQsIHQsIHVwKTtcbn1cblxuLyoqXG4gKiBBdXRvU21vb3RoIHRhbmdlbnQgYXQgYGN1cmAgZ2l2ZW4gaXRzIG5laWdoYm9yczogYSBDYXRtdWxsLVJvbSB0YW5nZW50IHdpdGhcbiAqIHRoZSBwYXJhbWV0ZXJpemF0aW9uIGB0ZW5zaW9uYCAoYWxwaGEpLCBzY2FsZWQgZm9yIGEgY3ViaWMgQmV6aWVyIGhhbmRsZS5cbiAqIEJhc2VkIG9uIFl1a3NlbCBldCBhbC4sIFwiUGFyYW1ldGVyaXphdGlvbiBhbmQgYXBwbGljYXRpb25zIG9mIENhdG11bGwtUm9tIGN1cnZlc1wiLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXV0b1Ntb290aFRhbmdlbnQ8VCBleHRlbmRzIFYzPihvdXQ6IFQsIHByZXY6IFYzLCBjdXI6IFYzLCBuZXh0OiBWMywgdGVuc2lvbjogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgZDEgPSBkaXN0KGN1ciwgcHJldik7XG4gICAgY29uc3QgZDIgPSBkaXN0KG5leHQsIGN1cik7XG4gICAgaWYgKGQxIDwgRVBTSUxPTiAmJiBkMiA8IEVQU0lMT04pIHJldHVybiBzZXQob3V0LCAwLCAwLCAwKTtcbiAgICAvLyBPbmx5IG9uZSBuZWlnaGJvcjogYSBzaG9ydCBoYW5kbGUgdG93YXJkcyBpdCwgZW5vdWdoIHRvIGdpdmUgdGhlIGtub3QgYSBkaXJlY3Rpb24uXG4gICAgaWYgKGQxIDwgRVBTSUxPTikgcmV0dXJuIHNjYWxlKG91dCwgc3ViKG91dCwgbmV4dCwgY3VyKSwgMC4xKTtcbiAgICBpZiAoZDIgPCBFUFNJTE9OKSByZXR1cm4gc2NhbGUob3V0LCBzdWIob3V0LCBjdXIsIHByZXYpLCAwLjEpO1xuICAgIGNvbnN0IGEgPSB0ZW5zaW9uO1xuICAgIGNvbnN0IGQxYSA9IE1hdGgucG93KGQxLCBhKTtcbiAgICBjb25zdCBkMmEgPSBNYXRoLnBvdyhkMiwgYSk7XG4gICAgY29uc3QgZDFhMiA9IGQxYSAqIGQxYTtcbiAgICBjb25zdCBkMmEyID0gZDJhICogZDJhO1xuICAgIGNvbnN0IGsgPSAxIC8gKDMgKiBkMWEgKiAoZDFhICsgZDJhKSk7XG4gICAgcmV0dXJuIHNldChcbiAgICAgICAgb3V0LFxuICAgICAgICAoZDFhMiAqIG5leHQueCAtIGQyYTIgKiBwcmV2LnggKyAoZDJhMiAtIGQxYTIpICogY3VyLngpICogayxcbiAgICAgICAgKGQxYTIgKiBuZXh0LnkgLSBkMmEyICogcHJldi55ICsgKGQyYTIgLSBkMWEyKSAqIGN1ci55KSAqIGssXG4gICAgICAgIChkMWEyICogbmV4dC56IC0gZDJhMiAqIHByZXYueiArIChkMmEyIC0gZDFhMikgKiBjdXIueikgKiBrLFxuICAgICk7XG59XG5cbi8qKiBSZWNvbXB1dGVzIHRoZSB0YW5nZW50cyAoYW5kIHJvdGF0aW9uKSBhIGtub3QncyBtb2RlIGltcGxpZXMuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlUYW5nZW50TW9kZShzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbikgcmV0dXJuO1xuICAgIGNvbnN0IGsgPSBzLmtub3RzW2ldO1xuICAgIHN3aXRjaCAoay5tb2RlKSB7XG4gICAgICAgIGNhc2UgVGFuZ2VudE1vZGUuTGluZWFyOlxuICAgICAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGFuZ2VudE1vZGUuQXV0b1Ntb290aDoge1xuICAgICAgICAgICAgY29uc3QgcHJldiA9IHMua25vdHNbcHJldkluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gcy5rbm90c1tuZXh0SW5kZXgoaSwgbiwgcy5jbG9zZWQpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IHVwID0ga25vdFVwKHYzKCksIGspO1xuICAgICAgICAgICAgY29uc3QgdGluID0gYXV0b1Ntb290aFRhbmdlbnQodjMoKSwgbmV4dCwgay5wb3NpdGlvbiwgcHJldiwgay50ZW5zaW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdXQgPSBhdXRvU21vb3RoVGFuZ2VudCh2MygpLCBwcmV2LCBrLnBvc2l0aW9uLCBuZXh0LCBrLnRlbnNpb24pO1xuICAgICAgICAgICAgbGV0IGxpbiA9IGxlbih0aW4pO1xuICAgICAgICAgICAgbGV0IGxvdXQgPSBsZW4odG91dCk7XG4gICAgICAgICAgICBsZXQgZGlyID0gdG91dDtcbiAgICAgICAgICAgIGlmIChsaW4gPCBFUFNJTE9OKSBsaW4gPSBsb3V0O1xuICAgICAgICAgICAgaWYgKGxvdXQgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICAgICAgbG91dCA9IGxpbjtcbiAgICAgICAgICAgICAgICBkaXIgPSBzY2FsZSh2MygpLCB0aW4sIC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZW5TcShkaXIpID4gRVBTSUxPTikga25vdFJvdGF0aW9uKGsucm90YXRpb24sIGRpciwgdXApO1xuICAgICAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbGluKTtcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGxvdXQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBUYW5nZW50TW9kZS5NaXJyb3JlZDpcbiAgICAgICAgY2FzZSBUYW5nZW50TW9kZS5Db250aW51b3VzOlxuICAgICAgICAgICAgYmFrZVRhbmdlbnREaXJlY3Rpb24oaywgay5tb2RlID09PSBUYW5nZW50TW9kZS5NaXJyb3JlZCwgdHJ1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuLyoqXG4gKiBUdXJucyB0aGUga25vdCBzbyBpdHMgdGFuZ2VudHMgbGllIG9uIGxvY2FsIFogKHRoZSBtYWluIHRhbmdlbnQga2VlcHMgaXRzXG4gKiBkaXJlY3Rpb24pLCBhcyBNaXJyb3JlZCAvIENvbnRpbnVvdXMga25vdHMgc3RvcmUgdGhlbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJha2VUYW5nZW50RGlyZWN0aW9uKGs6IEtub3RMaWtlLCBtaXJyb3JlZDogYm9vbGVhbiwgb3V0SXNNYWluOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdG91dCA9IHRhbmdlbnRPdXRWZWModjMoKSwgayk7XG4gICAgY29uc3QgdGluID0gdGFuZ2VudEluVmVjKHYzKCksIGspO1xuICAgIGNvbnN0IG1haW4gPSBvdXRJc01haW4gPyB0b3V0IDogc2NhbGUodjMoKSwgdGluLCAtMSk7XG4gICAgY29uc3Qgb3RoZXIgPSBvdXRJc01haW4gPyBzY2FsZSh2MygpLCB0aW4sIC0xKSA6IHRvdXQ7XG4gICAgY29uc3QgZGlyID0gbGVuU3EobWFpbikgPiBFUFNJTE9OID8gbWFpbiA6IG90aGVyO1xuICAgIGNvbnN0IHVwID0ga25vdFVwKHYzKCksIGspO1xuICAgIGlmIChsZW5TcShkaXIpID4gRVBTSUxPTikga25vdFJvdGF0aW9uKGsucm90YXRpb24sIGRpciwgdXApO1xuICAgIGNvbnN0IGxtYWluID0gbGVuKG1haW4pO1xuICAgIGNvbnN0IGxvdGhlciA9IGxlbihvdGhlcik7XG4gICAgaWYgKG1pcnJvcmVkKSB7XG4gICAgICAgIGNvbnN0IGwgPSBsbWFpbiA+IEVQU0lMT04gPyBsbWFpbiA6IGxvdGhlcjtcbiAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbCk7XG4gICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWwpO1xuICAgIH0gZWxzZSBpZiAob3V0SXNNYWluKSB7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGxtYWluKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbG90aGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1sbWFpbik7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGxvdGhlcik7XG4gICAgfVxufVxuXG4vKiogUmVjb21wdXRlcyB0aGUga25vdCBhbmQgaXRzIEF1dG9TbW9vdGggbmVpZ2hib3JzIGFmdGVyIGl0cyBwb3NpdGlvbiBjaGFuZ2VkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hBcm91bmQoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmICghbikgcmV0dXJuO1xuICAgIGNvbnN0IHAgPSBwcmV2SW5kZXgoaSwgbiwgcy5jbG9zZWQpO1xuICAgIGNvbnN0IHEgPSBuZXh0SW5kZXgoaSwgbiwgcy5jbG9zZWQpO1xuICAgIGlmIChwICE9PSBpICYmIHMua25vdHNbcF0ubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCkgYXBwbHlUYW5nZW50TW9kZShzLCBwKTtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIGkpO1xuICAgIGlmIChxICE9PSBpICYmIHEgIT09IHAgJiYgcy5rbm90c1txXS5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoKSBhcHBseVRhbmdlbnRNb2RlKHMsIHEpO1xufVxuXG4vKiogUmUtYXBwbGllcyBldmVyeSBrbm90J3MgbW9kZSAoYWZ0ZXIgbG9hZGluZyBvciBleHRlcm5hbCBlZGl0cykuICovXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaEFsbChzOiBTcGxpbmVMaWtlKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmtub3RzLmxlbmd0aDsgaSsrKSBhcHBseVRhbmdlbnRNb2RlKHMsIGkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0S25vdFBvc2l0aW9uKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlciwgcDogVjMpOiB2b2lkIHtcbiAgICBjb3B5KHMua25vdHNbaV0ucG9zaXRpb24sIHApO1xuICAgIHJlZnJlc2hBcm91bmQocywgaSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaW4gb3Igb3V0IHRhbmdlbnQgZnJvbSBhIHNwbGluZS1zcGFjZSBvZmZzZXQsIGtlZXBpbmcgdGhlIGtub3Qnc1xuICogbW9kZSBjb25zdHJhaW50cy4gVGFuZ2VudHMgb2YgQXV0b1Ntb290aCAvIExpbmVhciBrbm90cyBiZWNvbWUgQ29udGludW91c1xuICogKHRoZXkgaGF2ZSBub3RoaW5nIHRvIGRyYWcgb3RoZXJ3aXNlKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRhbmdlbnRWZWMoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCB3aGljaDogJ2luJyB8ICdvdXQnLCB2OiBWMyk6IHZvaWQge1xuICAgIGNvbnN0IGsgPSBzLmtub3RzW2ldO1xuICAgIGlmICghdGFuZ2VudHNFZGl0YWJsZShrLm1vZGUpKSB7XG4gICAgICAgIGlmIChrLm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhcikgbWFrZUV4cGxpY2l0TGluZWFyVGFuZ2VudHMocywgaSk7XG4gICAgICAgIGsubW9kZSA9IFRhbmdlbnRNb2RlLkNvbnRpbnVvdXM7XG4gICAgfVxuICAgIGlmIChrLm1vZGUgPT09IFRhbmdlbnRNb2RlLkJyb2tlbikge1xuICAgICAgICBjb25zdCBsb2NhbCA9IHFSb3RhdGUodjMoKSwgcUludmVydChxNCgpLCBrLnJvdGF0aW9uKSwgdik7XG4gICAgICAgIGNvcHkod2hpY2ggPT09ICdpbicgPyBrLnRhbmdlbnRJbiA6IGsudGFuZ2VudE91dCwgbG9jYWwpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGwgPSBsZW4odik7XG4gICAgY29uc3QgZGlyID0gd2hpY2ggPT09ICdvdXQnID8gY29weSh2MygpLCB2KSA6IHNjYWxlKHYzKCksIHYsIC0xKTtcbiAgICBpZiAobCA+IEVQU0lMT04pIGtub3RSb3RhdGlvbihrLnJvdGF0aW9uLCBkaXIsIGtub3RVcCh2MygpLCBrKSk7XG4gICAgY29uc3QgbWlycm9yZWQgPSBrLm1vZGUgPT09IFRhbmdlbnRNb2RlLk1pcnJvcmVkO1xuICAgIGlmICh3aGljaCA9PT0gJ291dCcpIHtcbiAgICAgICAgY29uc3QgbGluID0gbWlycm9yZWQgPyBsIDogbGVuKGsudGFuZ2VudEluKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbCk7XG4gICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWxpbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbG91dCA9IG1pcnJvcmVkID8gbCA6IGxlbihrLnRhbmdlbnRPdXQpO1xuICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1sKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbG91dCk7XG4gICAgfVxufVxuXG4vKiogTGluZWFyIGtub3RzIHN0b3JlIHplcm8gdGFuZ2VudHM7IGdpdmUgdGhlbSBncmFiYmFibGUgb25lcyBwb2ludGluZyBhdCB0aGUgbmVpZ2hib3JzLiAqL1xuZnVuY3Rpb24gbWFrZUV4cGxpY2l0TGluZWFyVGFuZ2VudHMoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGNvbnN0IGsgPSBzLmtub3RzW2ldO1xuICAgIGNvbnN0IGludiA9IHFJbnZlcnQocTQoKSwgay5yb3RhdGlvbik7XG4gICAgY29uc3QgcHJldiA9IHMua25vdHNbcHJldkluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgY29uc3QgbmV4dCA9IHMua25vdHNbbmV4dEluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgcVJvdGF0ZShrLnRhbmdlbnRJbiwgaW52LCBzY2FsZSh2MygpLCBzdWIodjMoKSwgcHJldiwgay5wb3NpdGlvbiksIDEgLyAzKSk7XG4gICAgcVJvdGF0ZShrLnRhbmdlbnRPdXQsIGludiwgc2NhbGUodjMoKSwgc3ViKHYzKCksIG5leHQsIGsucG9zaXRpb24pLCAxIC8gMykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VGFuZ2VudE1vZGUoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCBtb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBrID0gcy5rbm90c1tpXTtcbiAgICBpZiAoay5tb2RlID09PSBtb2RlKSB7XG4gICAgICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGsubW9kZSA9PT0gVGFuZ2VudE1vZGUuTGluZWFyICYmIHRhbmdlbnRzRWRpdGFibGUobW9kZSkpIG1ha2VFeHBsaWNpdExpbmVhclRhbmdlbnRzKHMsIGkpO1xuICAgIGsubW9kZSA9IG1vZGU7XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRlbnNpb24oczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCB0ZW5zaW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzLmtub3RzW2ldLnRlbnNpb24gPSB0ZW5zaW9uO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRSb3RhdGlvbihzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIsIHI6IFE0KTogdm9pZCB7XG4gICAgcU5vcm1hbGl6ZShzLmtub3RzW2ldLnJvdGF0aW9uLCByKTtcbiAgICAvLyBBdXRvU21vb3RoIGtub3RzIG93biB0aGVpciByb3RhdGlvbidzIGRpcmVjdGlvbjsgb25seSB0aGUgcm9sbCBzdGlja3MuXG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBpKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjdXJ2ZXNcblxuLyoqIENvbnRyb2wgcG9pbnRzIG9mIGN1cnZlIGkgKGJldHdlZW4ga25vdCBpIGFuZCB0aGUgbmV4dCBrbm90KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJ2ZShzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIsIG91dDogQ3VydmUgPSBjdXJ2ZSgpKTogQ3VydmUge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBjb25zdCBhID0gcy5rbm90c1tpXTtcbiAgICBjb25zdCBiID0gcy5rbm90c1soaSArIDEpICUgbl07XG4gICAgY29weShvdXQucDAsIGEucG9zaXRpb24pO1xuICAgIGFkZChvdXQucDEsIGEucG9zaXRpb24sIHRhbmdlbnRPdXRWZWMob3V0LnAxLCBhKSk7XG4gICAgYWRkKG91dC5wMiwgYi5wb3NpdGlvbiwgdGFuZ2VudEluVmVjKG91dC5wMiwgYikpO1xuICAgIGNvcHkob3V0LnAzLCBiLnBvc2l0aW9uKTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjYWNoZVxuXG4vKiogU2FtcGxlcyBwZXIgY3VydmUgZm9yIHRoZSBkaXN0YW5jZSB0YWJsZS4gKi9cbmV4cG9ydCBjb25zdCBMRU5HVEhfU0FNUExFUyA9IDMyO1xuLyoqIFNhbXBsZXMgcGVyIGN1cnZlIGZvciB0aGUgdXAtdmVjdG9yIHRhYmxlLiAqL1xuZXhwb3J0IGNvbnN0IFVQX1NBTVBMRVMgPSAxNjtcblxuZXhwb3J0IGNsYXNzIFNwbGluZUNhY2hlIHtcbiAgICAvKiogRmluZ2VycHJpbnQgb2YgdGhlIGRhdGEgdGhlIGNhY2hlIHdhcyBidWlsdCBmcm9tLiAqL1xuICAgIHN0YW1wID0gTmFOO1xuICAgIGN1cnZlczogQ3VydmVbXSA9IFtdO1xuICAgIGxlbmd0aHM6IG51bWJlcltdID0gW107XG4gICAgLyoqIExlbmd0aCBvZiBhbGwgY3VydmVzIGJlZm9yZSBjdXJ2ZSBpLiAqL1xuICAgIHN0YXJ0czogbnVtYmVyW10gPSBbXTtcbiAgICB0b3RhbCA9IDA7XG4gICAgdGFibGVzOiBGbG9hdDY0QXJyYXlbXSA9IFtdO1xuICAgIHVwczogKEZsb2F0NjRBcnJheSB8IG51bGwpW10gPSBbXTtcbn1cblxuY29uc3QgX2hhc2hCdWYgPSBuZXcgRmxvYXQ2NEFycmF5KDEpO1xuY29uc3QgX2hhc2hJbnQgPSBuZXcgSW50MzJBcnJheShfaGFzaEJ1Zi5idWZmZXIpO1xuXG5mdW5jdGlvbiBtaXgoaDogbnVtYmVyLCB2OiBudW1iZXIpOiBudW1iZXIge1xuICAgIF9oYXNoQnVmWzBdID0gdjtcbiAgICBoID0gTWF0aC5pbXVsKGggXiBfaGFzaEludFswXSwgMTY3Nzc2MTkpO1xuICAgIGggPSBNYXRoLmltdWwoaCBeIF9oYXNoSW50WzFdLCAxNjc3NzYxOSk7XG4gICAgcmV0dXJuIGg7XG59XG5cbi8qKiBDaGVhcCBoYXNoIG9mIGV2ZXJ5dGhpbmcgdGhhdCBzaGFwZXMgdGhlIHNwbGluZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5nZXJwcmludChzOiBTcGxpbmVMaWtlKTogbnVtYmVyIHtcbiAgICBsZXQgaCA9IDIxNjYxMzYyNjEgfCAwO1xuICAgIGggPSBtaXgoaCwgcy5rbm90cy5sZW5ndGgpO1xuICAgIGggPSBtaXgoaCwgcy5jbG9zZWQgPyAxIDogMCk7XG4gICAgZm9yIChjb25zdCBrIG9mIHMua25vdHMpIHtcbiAgICAgICAgaCA9IG1peChoLCBrLnBvc2l0aW9uLngpO1xuICAgICAgICBoID0gbWl4KGgsIGsucG9zaXRpb24ueSk7XG4gICAgICAgIGggPSBtaXgoaCwgay5wb3NpdGlvbi56KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRJbi54KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRJbi55KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRJbi56KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRPdXQueCk7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50T3V0LnkpO1xuICAgICAgICBoID0gbWl4KGgsIGsudGFuZ2VudE91dC56KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnJvdGF0aW9uLngpO1xuICAgICAgICBoID0gbWl4KGgsIGsucm90YXRpb24ueSk7XG4gICAgICAgIGggPSBtaXgoaCwgay5yb3RhdGlvbi56KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnJvdGF0aW9uLncpO1xuICAgICAgICBoID0gbWl4KGgsIGsubW9kZSk7XG4gICAgICAgIGggPSBtaXgoaCwgay50ZW5zaW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZENhY2hlKHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSwgc3RhbXAgPSBmaW5nZXJwcmludChzKSk6IFNwbGluZUNhY2hlIHtcbiAgICBjb25zdCBjb3VudCA9IGN1cnZlQ291bnQocyk7XG4gICAgY2FjaGUuY3VydmVzLmxlbmd0aCA9IGNvdW50O1xuICAgIGNhY2hlLmxlbmd0aHMubGVuZ3RoID0gY291bnQ7XG4gICAgY2FjaGUuc3RhcnRzLmxlbmd0aCA9IGNvdW50O1xuICAgIGNhY2hlLnRhYmxlcy5sZW5ndGggPSBjb3VudDtcbiAgICBjYWNoZS51cHMubGVuZ3RoID0gY291bnQ7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgYyA9IGdldEN1cnZlKHMsIGksIGNhY2hlLmN1cnZlc1tpXSB8fCBjdXJ2ZSgpKTtcbiAgICAgICAgY2FjaGUuY3VydmVzW2ldID0gYztcbiAgICAgICAgY29uc3QgdGFibGUgPSBidWlsZExlbmd0aFRhYmxlKGMsIExFTkdUSF9TQU1QTEVTLCBjYWNoZS50YWJsZXNbaV0pO1xuICAgICAgICBjYWNoZS50YWJsZXNbaV0gPSB0YWJsZTtcbiAgICAgICAgY2FjaGUuc3RhcnRzW2ldID0gdG90YWw7XG4gICAgICAgIGNhY2hlLmxlbmd0aHNbaV0gPSB0YWJsZVtMRU5HVEhfU0FNUExFUyAtIDFdO1xuICAgICAgICB0b3RhbCArPSBjYWNoZS5sZW5ndGhzW2ldO1xuICAgICAgICBjYWNoZS51cHNbaV0gPSBudWxsOyAvLyBidWlsdCBvbiBkZW1hbmRcbiAgICB9XG4gICAgY2FjaGUudG90YWwgPSB0b3RhbDtcbiAgICBjYWNoZS5zdGFtcCA9IHN0YW1wO1xuICAgIHJldHVybiBjYWNoZTtcbn1cblxuLyoqIFJlYnVpbGRzIHRoZSBjYWNoZSB3aGVuIHRoZSBzcGxpbmUgY2hhbmdlZC4gUmV0dXJucyB0aGUgdXAtdG8tZGF0ZSBjYWNoZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVDYWNoZShzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUpOiBTcGxpbmVDYWNoZSB7XG4gICAgY29uc3Qgc3RhbXAgPSBmaW5nZXJwcmludChzKTtcbiAgICBpZiAoc3RhbXAgIT09IGNhY2hlLnN0YW1wKSBidWlsZENhY2hlKHMsIGNhY2hlLCBzdGFtcCk7XG4gICAgcmV0dXJuIGNhY2hlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1cnZlUG9pbnQge1xuICAgIC8qKiBDdXJ2ZSBpbmRleC4gKi9cbiAgICBpbmRleDogbnVtYmVyO1xuICAgIC8qKiBQYXJhbWV0ZXIgb24gdGhhdCBjdXJ2ZSwgMC4uMS4gKi9cbiAgICB0OiBudW1iZXI7XG59XG5cbi8qKiBDdXJ2ZSBhbmQgY3VydmUgcGFyYW1ldGVyIGF0IGEgbm9ybWFsaXplZCBkaXN0YW5jZSB0ICgwLi4xKSBhbG9uZyB0aGUgd2hvbGUgc3BsaW5lLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGN1cnZlUG9pbnRBdChjYWNoZTogU3BsaW5lQ2FjaGUsIHQ6IG51bWJlciwgb3V0OiBDdXJ2ZVBvaW50ID0geyBpbmRleDogMCwgdDogMCB9KTogQ3VydmVQb2ludCB7XG4gICAgY29uc3QgY291bnQgPSBjYWNoZS5jdXJ2ZXMubGVuZ3RoO1xuICAgIGlmICghY291bnQpIHtcbiAgICAgICAgb3V0LmluZGV4ID0gMDtcbiAgICAgICAgb3V0LnQgPSAwO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICBpZiAoY2FjaGUudG90YWwgPD0gRVBTSUxPTikge1xuICAgICAgICAvLyBEZWdlbmVyYXRlIChhbGwga25vdHMgb24gb25lIHBvaW50KTogZmFsbCBiYWNrIHRvIHVuaWZvcm0gcGFyYW1ldGVyaXphdGlvbi5cbiAgICAgICAgY29uc3QgeCA9IGNsYW1wMDEodCkgKiBjb3VudDtcbiAgICAgICAgb3V0LmluZGV4ID0gTWF0aC5taW4oTWF0aC5mbG9vcih4KSwgY291bnQgLSAxKTtcbiAgICAgICAgb3V0LnQgPSB4IC0gb3V0LmluZGV4O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICBjb25zdCBkID0gY2xhbXAwMSh0KSAqIGNhY2hlLnRvdGFsO1xuICAgIGxldCBsbyA9IDA7XG4gICAgbGV0IGhpID0gY291bnQgLSAxO1xuICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICAgIGNvbnN0IG1pZCA9IChsbyArIGhpICsgMSkgPj4gMTtcbiAgICAgICAgaWYgKGNhY2hlLnN0YXJ0c1ttaWRdIDw9IGQpIGxvID0gbWlkO1xuICAgICAgICBlbHNlIGhpID0gbWlkIC0gMTtcbiAgICB9XG4gICAgb3V0LmluZGV4ID0gbG87XG4gICAgb3V0LnQgPSByZWZpbmVUKGNhY2hlLmN1cnZlc1tsb10sIGNhY2hlLnRhYmxlc1tsb10sIGQgLSBjYWNoZS5zdGFydHNbbG9dKTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5jb25zdCBfZHYgPSB2MygpO1xuXG4vKiogRXhhY3QgYXJjIGxlbmd0aCBmcm9tIDAgdG8gdDogdGhlIHRhYmxlIHVwIHRvIHRoZSBzYW1wbGUgYmVmb3JlIHQsIGludGVncmF0ZWQgZnJvbSB0aGVyZS4gKi9cbmZ1bmN0aW9uIGV4YWN0TGVuZ3RoQXQoYzogQ3VydmUsIHRhYmxlOiBGbG9hdDY0QXJyYXksIHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbiA9IHRhYmxlLmxlbmd0aDtcbiAgICBpZiAodCA8PSAwKSByZXR1cm4gMDtcbiAgICBpZiAodCA+PSAxKSByZXR1cm4gdGFibGVbbiAtIDFdO1xuICAgIGNvbnN0IGkgPSBNYXRoLm1pbihNYXRoLmZsb29yKHQgKiAobiAtIDEpKSwgbiAtIDIpO1xuICAgIHJldHVybiB0YWJsZVtpXSArIGFyY0xlbmd0aChjLCBpIC8gKG4gLSAxKSwgdCk7XG59XG5cbi8qKiB0IGF0IGFyYyBsZW5ndGggZDogdGFibGUgbG9va3VwLCB0aGVuIE5ld3RvbiBzdGVwcyBvbiB0aGUgZXhhY3QgbGVuZ3RoLiAqL1xuZnVuY3Rpb24gcmVmaW5lVChjOiBDdXJ2ZSwgdGFibGU6IEZsb2F0NjRBcnJheSwgZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgdCA9IHRBdExlbmd0aCh0YWJsZSwgZCk7XG4gICAgY29uc3QgbiA9IHRhYmxlLmxlbmd0aDtcbiAgICBpZiAodCA8PSAwIHx8IHQgPj0gMSkgcmV0dXJuIHQ7XG4gICAgY29uc3QgaSA9IE1hdGgubWluKE1hdGguZmxvb3IodCAqIChuIC0gMSkpLCBuIC0gMik7XG4gICAgY29uc3QgbG8gPSBpIC8gKG4gLSAxKTtcbiAgICBjb25zdCBoaSA9IChpICsgMSkgLyAobiAtIDEpO1xuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMjsgaysrKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IHRhYmxlW2ldICsgYXJjTGVuZ3RoKGMsIGxvLCB0KSAtIGQ7XG4gICAgICAgIGNvbnN0IHNwZWVkID0gbGVuKGV2YWxEZXJpdmF0aXZlKF9kdiwgYywgdCkpO1xuICAgICAgICBpZiAoc3BlZWQgPCBFUFNJTE9OKSBicmVhaztcbiAgICAgICAgdCA9IE1hdGgubWluKGhpLCBNYXRoLm1heChsbywgdCAtIGVyciAvIHNwZWVkKSk7XG4gICAgfVxuICAgIHJldHVybiB0O1xufVxuXG4vKiogTm9ybWFsaXplZCBkaXN0YW5jZSAoMC4uMSkgb2YgYSBjdXJ2ZSBwb2ludC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVkVE9mKGNhY2hlOiBTcGxpbmVDYWNoZSwgaW5kZXg6IG51bWJlciwgdDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHJldHVybiAwO1xuICAgIGlmIChjYWNoZS50b3RhbCA8PSBFUFNJTE9OKSByZXR1cm4gKGluZGV4ICsgdCkgLyBjYWNoZS5jdXJ2ZXMubGVuZ3RoO1xuICAgIHJldHVybiAoY2FjaGUuc3RhcnRzW2luZGV4XSArIGV4YWN0TGVuZ3RoQXQoY2FjaGUuY3VydmVzW2luZGV4XSwgY2FjaGUudGFibGVzW2luZGV4XSwgdCkpIC8gY2FjaGUudG90YWw7XG59XG5cbi8qKiBLbm90LWluZGV4IHVuaXQgKGN1cnZlIGluZGV4ICsgY3VydmUgdCwgZS5nLiAyLjUgPSBoYWxmd2F5IGJldHdlZW4ga25vdHMgMiBhbmQgMykgdG8gbm9ybWFsaXplZCB0LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGtub3RVbml0VG9UKGNhY2hlOiBTcGxpbmVDYWNoZSwgazogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBjb3VudCA9IGNhY2hlLmN1cnZlcy5sZW5ndGg7XG4gICAgaWYgKCFjb3VudCkgcmV0dXJuIDA7XG4gICAgY29uc3QgaSA9IE1hdGgubWluKE1hdGgubWF4KE1hdGguZmxvb3IoayksIDApLCBjb3VudCAtIDEpO1xuICAgIHJldHVybiBub3JtYWxpemVkVE9mKGNhY2hlLCBpLCBjbGFtcDAxKGsgLSBpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0VG9Lbm90VW5pdChjYWNoZTogU3BsaW5lQ2FjaGUsIHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcCA9IGN1cnZlUG9pbnRBdChjYWNoZSwgdCk7XG4gICAgcmV0dXJuIHAuaW5kZXggKyBwLnQ7XG59XG5cbmNvbnN0IF9jcDogQ3VydmVQb2ludCA9IHsgaW5kZXg6IDAsIHQ6IDAgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlUG9zaXRpb248VCBleHRlbmRzIFYzPihzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIHQ6IG51bWJlciwgb3V0OiBUKTogVCB7XG4gICAgaWYgKCFzLmtub3RzLmxlbmd0aCkgcmV0dXJuIHNldChvdXQsIDAsIDAsIDApO1xuICAgIGlmIChzLmtub3RzLmxlbmd0aCA9PT0gMSB8fCAhY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIGNvcHkob3V0LCBzLmtub3RzWzBdLnBvc2l0aW9uKTtcbiAgICBjdXJ2ZVBvaW50QXQoY2FjaGUsIHQsIF9jcCk7XG4gICAgcmV0dXJuIGV2YWxQb3NpdGlvbihvdXQsIGNhY2hlLmN1cnZlc1tfY3AuaW5kZXhdLCBfY3AudCk7XG59XG5cbi8qKiBVbml0IGRpcmVjdGlvbiBvZiB0cmF2ZWwgYXQgdC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZURpcmVjdGlvbjxUIGV4dGVuZHMgVjM+KHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSwgdDogbnVtYmVyLCBvdXQ6IFQpOiBUIHtcbiAgICBpZiAocy5rbm90cy5sZW5ndGggPCAyIHx8ICFjYWNoZS5jdXJ2ZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChzLmtub3RzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIHRhbmdlbnRPdXRWZWMob3V0LCBzLmtub3RzWzBdKSk7XG4gICAgICAgIHJldHVybiBzZXQob3V0LCAwLCAwLCAxKTtcbiAgICB9XG4gICAgY3VydmVQb2ludEF0KGNhY2hlLCB0LCBfY3ApO1xuICAgIHJldHVybiBldmFsRGlyZWN0aW9uKG91dCwgY2FjaGUuY3VydmVzW19jcC5pbmRleF0sIF9jcC50KTtcbn1cblxuLyoqIFVuaXQgdXAgdmVjdG9yIGF0IHQ6IGtub3QgdXAgdmVjdG9ycyBjYXJyaWVkIGFsb25nIHRoZSBjdXJ2ZSB3aXRob3V0IHR3aXN0aW5nLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlVXA8VCBleHRlbmRzIFYzPihzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIHQ6IG51bWJlciwgb3V0OiBUKTogVCB7XG4gICAgaWYgKCFzLmtub3RzLmxlbmd0aCkgcmV0dXJuIHNldChvdXQsIDAsIDEsIDApO1xuICAgIGlmIChzLmtub3RzLmxlbmd0aCA9PT0gMSB8fCAhY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIGtub3RVcChvdXQsIHMua25vdHNbMF0pO1xuICAgIGN1cnZlUG9pbnRBdChjYWNoZSwgdCwgX2NwKTtcbiAgICByZXR1cm4gY3VydmVVcChzLCBjYWNoZSwgX2NwLmluZGV4LCBfY3AudCwgb3V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnZlVXA8VCBleHRlbmRzIFYzPihzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIGluZGV4OiBudW1iZXIsIHQ6IG51bWJlciwgb3V0OiBUKTogVCB7XG4gICAgbGV0IHRhYmxlID0gY2FjaGUudXBzW2luZGV4XTtcbiAgICBpZiAoIXRhYmxlKSB0YWJsZSA9IGNhY2hlLnVwc1tpbmRleF0gPSBidWlsZFVwVGFibGUocywgY2FjaGUuY3VydmVzW2luZGV4XSwgaW5kZXgpO1xuICAgIGNvbnN0IHggPSBjbGFtcDAxKHQpICogVVBfU0FNUExFUztcbiAgICBjb25zdCBpID0gTWF0aC5taW4oTWF0aC5mbG9vcih4KSwgVVBfU0FNUExFUyAtIDEpO1xuICAgIGNvbnN0IGYgPSB4IC0gaTtcbiAgICBjb25zdCBhID0gdjModGFibGVbaSAqIDNdLCB0YWJsZVtpICogMyArIDFdLCB0YWJsZVtpICogMyArIDJdKTtcbiAgICBjb25zdCBiID0gdjModGFibGVbaSAqIDMgKyAzXSwgdGFibGVbaSAqIDMgKyA0XSwgdGFibGVbaSAqIDMgKyA1XSk7XG4gICAgbGVycChvdXQsIGEsIGIsIGYpO1xuICAgIC8vIEtlZXAgaXQgcGVycGVuZGljdWxhciB0byB0aGUgZGlyZWN0aW9uIG9mIHRyYXZlbC5cbiAgICBjb25zdCBkaXIgPSBldmFsRGlyZWN0aW9uKHYzKCksIGNhY2hlLmN1cnZlc1tpbmRleF0sIHQpO1xuICAgIHByb2plY3RPblBsYW5lKG91dCwgb3V0LCBkaXIpO1xuICAgIGlmIChsZW5TcShvdXQpIDwgRVBTSUxPTikgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIGEpO1xuICAgIHJldHVybiBub3JtYWxpemUob3V0LCBvdXQpO1xufVxuXG4vKipcbiAqIFVwIHZlY3RvcnMgYWxvbmcgYSBjdXJ2ZTogdGhlIHN0YXJ0IGtub3QncyB1cCBjYXJyaWVkIGJ5IGEgcm90YXRpb25cbiAqIG1pbmltaXppbmcgZnJhbWUgKGRvdWJsZSByZWZsZWN0aW9uKSwgd2l0aCB0aGUgdHdpc3QgbmVlZGVkIHRvIG1lZXQgdGhlIGVuZFxuICoga25vdCdzIHVwIHNwcmVhZCBldmVubHkgb3ZlciB0aGUgY3VydmUuXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkVXBUYWJsZShzOiBTcGxpbmVMaWtlLCBjOiBDdXJ2ZSwgaW5kZXg6IG51bWJlcik6IEZsb2F0NjRBcnJheSB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGNvbnN0IGEgPSBzLmtub3RzW2luZGV4XTtcbiAgICBjb25zdCBiID0gcy5rbm90c1soaW5kZXggKyAxKSAlIG5dO1xuICAgIGNvbnN0IHRhYmxlID0gbmV3IEZsb2F0NjRBcnJheSgoVVBfU0FNUExFUyArIDEpICogMyk7XG5cbiAgICBjb25zdCBwb3M6IFYzW10gPSBbXTtcbiAgICBjb25zdCBkaXJzOiBWM1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gVVBfU0FNUExFUzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHQgPSBpIC8gVVBfU0FNUExFUztcbiAgICAgICAgcG9zLnB1c2goZXZhbFBvc2l0aW9uKHYzKCksIGMsIHQpKTtcbiAgICAgICAgZGlycy5wdXNoKGV2YWxEaXJlY3Rpb24odjMoKSwgYywgdCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHVwczogVjNbXSA9IFtdO1xuICAgIGxldCByID0gbm9ybWFsaXplKHYzKCksIHByb2plY3RPblBsYW5lKHYzKCksIGtub3RVcCh2MygpLCBhKSwgZGlyc1swXSkpO1xuICAgIGlmIChsZW5TcShyKSA8IEVQU0lMT04pIHIgPSBhbnlQZXJwZW5kaWN1bGFyKHYzKCksIGRpcnNbMF0pO1xuICAgIHVwcy5wdXNoKHIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVVBfU0FNUExFUzsgaSsrKSB7XG4gICAgICAgIC8vIERvdWJsZSByZWZsZWN0aW9uIChXYW5nIGV0IGFsLiAyMDA4KS5cbiAgICAgICAgY29uc3QgdjEgPSBzdWIodjMoKSwgcG9zW2kgKyAxXSwgcG9zW2ldKTtcbiAgICAgICAgY29uc3QgYzEgPSBkb3QodjEsIHYxKTtcbiAgICAgICAgY29uc3QgcmkgPSB1cHNbaV07XG4gICAgICAgIGNvbnN0IHRpID0gZGlyc1tpXTtcbiAgICAgICAgbGV0IHJMID0gcmk7XG4gICAgICAgIGxldCB0TCA9IHRpO1xuICAgICAgICBpZiAoYzEgPiBFUFNJTE9OICogRVBTSUxPTikge1xuICAgICAgICAgICAgckwgPSBzY2FsZUFuZEFkZCh2MygpLCByaSwgdjEsICgtMiAvIGMxKSAqIGRvdCh2MSwgcmkpKTtcbiAgICAgICAgICAgIHRMID0gc2NhbGVBbmRBZGQodjMoKSwgdGksIHYxLCAoLTIgLyBjMSkgKiBkb3QodjEsIHRpKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdjIgPSBzdWIodjMoKSwgZGlyc1tpICsgMV0sIHRMKTtcbiAgICAgICAgY29uc3QgYzIgPSBkb3QodjIsIHYyKTtcbiAgICAgICAgbGV0IG5leHQgPSByTDtcbiAgICAgICAgaWYgKGMyID4gRVBTSUxPTiAqIEVQU0lMT04pIG5leHQgPSBzY2FsZUFuZEFkZCh2MygpLCByTCwgdjIsICgtMiAvIGMyKSAqIGRvdCh2MiwgckwpKTtcbiAgICAgICAgbmV4dCA9IG5vcm1hbGl6ZSh2MygpLCBwcm9qZWN0T25QbGFuZSh2MygpLCBuZXh0LCBkaXJzW2kgKyAxXSkpO1xuICAgICAgICBpZiAobGVuU3EobmV4dCkgPCBFUFNJTE9OKSBuZXh0ID0gY29weSh2MygpLCB1cHNbaV0pO1xuICAgICAgICB1cHMucHVzaChuZXh0KTtcbiAgICB9XG5cbiAgICAvLyBUd2lzdCB0byByZWFjaCB0aGUgZW5kIGtub3QncyB1cC5cbiAgICBjb25zdCBlbmRVcCA9IG5vcm1hbGl6ZSh2MygpLCBwcm9qZWN0T25QbGFuZSh2MygpLCBrbm90VXAodjMoKSwgYiksIGRpcnNbVVBfU0FNUExFU10pKTtcbiAgICBsZXQgdHdpc3QgPSAwO1xuICAgIGlmIChsZW5TcShlbmRVcCkgPiBFUFNJTE9OKSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB1cHNbVVBfU0FNUExFU107XG4gICAgICAgIGNvbnN0IGMgPSBjcm9zcyh2MygpLCBsYXN0LCBlbmRVcCk7XG4gICAgICAgIHR3aXN0ID0gTWF0aC5hdGFuMihkb3QoYywgZGlyc1tVUF9TQU1QTEVTXSksIGRvdChsYXN0LCBlbmRVcCkpO1xuICAgIH1cbiAgICBjb25zdCBxID0gcTQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBVUF9TQU1QTEVTOyBpKyspIHtcbiAgICAgICAgbGV0IHUgPSB1cHNbaV07XG4gICAgICAgIGlmICh0d2lzdCAhPT0gMCkge1xuICAgICAgICAgICAgcUZyb21BeGlzQW5nbGUocSwgZGlyc1tpXSwgKHR3aXN0ICogaSkgLyBVUF9TQU1QTEVTKTtcbiAgICAgICAgICAgIHUgPSBxUm90YXRlKHYzKCksIHEsIHUpO1xuICAgICAgICB9XG4gICAgICAgIHRhYmxlW2kgKiAzXSA9IHUueDtcbiAgICAgICAgdGFibGVbaSAqIDMgKyAxXSA9IHUueTtcbiAgICAgICAgdGFibGVbaSAqIDMgKyAyXSA9IHUuejtcbiAgICB9XG4gICAgcmV0dXJuIHRhYmxlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5lYXJlc3RSZXN1bHQge1xuICAgIC8qKiBOb3JtYWxpemVkIGRpc3RhbmNlIGFsb25nIHRoZSBzcGxpbmUgKDAuLjEpLiAqL1xuICAgIHQ6IG51bWJlcjtcbiAgICBjdXJ2ZTogbnVtYmVyO1xuICAgIGN1cnZlVDogbnVtYmVyO1xuICAgIHBvc2l0aW9uOiBWMztcbiAgICBkaXN0YW5jZTogbnVtYmVyO1xufVxuXG4vKiogQ2xvc2VzdCBwb2ludCBvbiB0aGUgc3BsaW5lIHRvIGBwYCAoc3BsaW5lIHNwYWNlKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuZWFyZXN0UG9pbnQoczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCBwOiBWMyk6IE5lYXJlc3RSZXN1bHQge1xuICAgIGNvbnN0IHJlczogTmVhcmVzdFJlc3VsdCA9IHsgdDogMCwgY3VydmU6IDAsIGN1cnZlVDogMCwgcG9zaXRpb246IHYzKCksIGRpc3RhbmNlOiBJbmZpbml0eSB9O1xuICAgIGlmICghcy5rbm90cy5sZW5ndGgpIHJldHVybiByZXM7XG4gICAgaWYgKCFjYWNoZS5jdXJ2ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvcHkocmVzLnBvc2l0aW9uLCBzLmtub3RzWzBdLnBvc2l0aW9uKTtcbiAgICAgICAgcmVzLmRpc3RhbmNlID0gZGlzdChwLCByZXMucG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBsZXQgYmVzdCA9IEluZmluaXR5O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FjaGUuY3VydmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHIgPSBuZWFyZXN0VChjYWNoZS5jdXJ2ZXNbaV0sIHAsIDE2LCAxMCk7XG4gICAgICAgIGlmIChyLmRpc3RTcSA8IGJlc3QpIHtcbiAgICAgICAgICAgIGJlc3QgPSByLmRpc3RTcTtcbiAgICAgICAgICAgIHJlcy5jdXJ2ZSA9IGk7XG4gICAgICAgICAgICByZXMuY3VydmVUID0gci50O1xuICAgICAgICB9XG4gICAgfVxuICAgIGV2YWxQb3NpdGlvbihyZXMucG9zaXRpb24sIGNhY2hlLmN1cnZlc1tyZXMuY3VydmVdLCByZXMuY3VydmVUKTtcbiAgICByZXMuZGlzdGFuY2UgPSBNYXRoLnNxcnQoYmVzdCk7XG4gICAgcmVzLnQgPSBub3JtYWxpemVkVE9mKGNhY2hlLCByZXMuY3VydmUsIHJlcy5jdXJ2ZVQpO1xuICAgIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogTW92ZXMgYGRpc3RhbmNlYCBhbG9uZyB0aGUgc3BsaW5lIGZyb20gbm9ybWFsaXplZCBgZnJvbVRgIChuZWdhdGl2ZSBnb2VzXG4gKiBiYWNrKS4gUmV0dXJucyB0aGUgcmVzdWx0aW5nIG5vcm1hbGl6ZWQgdCAoY2xhbXBlZCBvbiBvcGVuIHNwbGluZXMsXG4gKiB3cmFwcGVkIG9uIGNsb3NlZCBvbmVzKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRBdERpc3RhbmNlRnJvbShzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIGZyb21UOiBudW1iZXIsIGRpc3RhbmNlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChjYWNoZS50b3RhbCA8PSBFUFNJTE9OKSByZXR1cm4gY2xhbXAwMShmcm9tVCk7XG4gICAgY29uc3QgdCA9IGZyb21UICsgZGlzdGFuY2UgLyBjYWNoZS50b3RhbDtcbiAgICByZXR1cm4gcy5jbG9zZWQgPyB3cmFwKHQsIDEpIDogY2xhbXAwMSh0KTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVkaXQgb3BzXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRLbm90KHM6IFNwbGluZUxpa2UsIGluZGV4OiBudW1iZXIsIGs6IEtub3RMaWtlKTogdm9pZCB7XG4gICAgcy5rbm90cy5zcGxpY2UoaW5kZXgsIDAsIGspO1xuICAgIHJlZnJlc2hBcm91bmQocywgaW5kZXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlS25vdChzOiBTcGxpbmVMaWtlLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgcy5rbm90cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBpZiAoIW4pIHJldHVybjtcbiAgICBjb25zdCBuZXh0ID0gTWF0aC5taW4oaW5kZXgsIG4gLSAxKTtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIHByZXZJbmRleChuZXh0LCBuLCBzLmNsb3NlZCkpO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgbmV4dCk7XG59XG5cbi8qKlxuICogSW5zZXJ0cyBhIGtub3Qgb24gY3VydmUgYGN1cnZlSW5kZXhgIGF0IHBhcmFtZXRlciB0IHdpdGhvdXQgY2hhbmdpbmcgdGhlXG4gKiBzaGFwZSAoZGUgQ2FzdGVsamF1IHNwbGl0KS4gUmV0dXJucyB0aGUgbmV3IGtub3QncyBpbmRleC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydE9uQ3VydmUoczogU3BsaW5lTGlrZSwgY3VydmVJbmRleDogbnVtYmVyLCB0OiBudW1iZXIsIGZhY3Rvcnk6IEZhY3RvcnkpOiBudW1iZXIge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBjb25zdCBpYSA9IGN1cnZlSW5kZXg7XG4gICAgY29uc3QgaWIgPSAoY3VydmVJbmRleCArIDEpICUgbjtcbiAgICBjb25zdCBhID0gcy5rbm90c1tpYV07XG4gICAgY29uc3QgYiA9IHMua25vdHNbaWJdO1xuICAgIGNvbnN0IGMgPSBnZXRDdXJ2ZShzLCBjdXJ2ZUluZGV4KTtcbiAgICBjb25zdCBsZWZ0ID0gY3VydmUoKTtcbiAgICBjb25zdCByaWdodCA9IGN1cnZlKCk7XG4gICAgc3BsaXQoYywgdCwgbGVmdCwgcmlnaHQpO1xuXG4gICAgY29uc3QgayA9IGZhY3Rvcnkua25vdCgpO1xuICAgIGNvcHkoay5wb3NpdGlvbiwgbGVmdC5wMyk7XG4gICAgay50ZW5zaW9uID0gREVGQVVMVF9URU5TSU9OO1xuXG4gICAgY29uc3QgYm90aEF1dG8gPSBhLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGggJiYgYi5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoO1xuICAgIGNvbnN0IGJvdGhMaW5lYXIgPSBhLm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhciAmJiBiLm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhcjtcblxuICAgIC8vIFRoZSBuZXcga25vdCdzIHVwIGJsZW5kcyBiZXR3ZWVuIGl0cyBuZWlnaGJvcnMnLlxuICAgIGNvbnN0IHVwID0ga25vdFVwKHYzKCksIGEpO1xuICAgIGNvbnN0IHVwQiA9IGtub3RVcCh2MygpLCBiKTtcbiAgICBsZXJwKHVwLCB1cCwgdXBCLCB0KTtcbiAgICBjb25zdCBvdXREaXIgPSBzdWIodjMoKSwgcmlnaHQucDEsIHJpZ2h0LnAwKTtcbiAgICBrbm90Um90YXRpb24oay5yb3RhdGlvbiwgbGVuU3Eob3V0RGlyKSA+IEVQU0lMT04gPyBvdXREaXIgOiBzdWIodjMoKSwgcmlnaHQucDAsIGxlZnQucDIpLCB1cCk7XG5cbiAgICBpZiAoYm90aEF1dG8pIHtcbiAgICAgICAgay5tb2RlID0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aDtcbiAgICB9IGVsc2UgaWYgKGJvdGhMaW5lYXIpIHtcbiAgICAgICAgay5tb2RlID0gVGFuZ2VudE1vZGUuTGluZWFyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEtlZXAgdGhlIGV4YWN0IHNoYXBlOiBzaG9ydGVuIHRoZSBuZWlnaGJvcnMnIGhhbmRsZXMsIHRoZSBuZXcga25vdCBnZXRzIHRoZSBzcGxpdCBoYW5kbGVzLlxuICAgICAgICBpZiAoYS5tb2RlID09PSBUYW5nZW50TW9kZS5NaXJyb3JlZCkgYS5tb2RlID0gVGFuZ2VudE1vZGUuQ29udGludW91cztcbiAgICAgICAgaWYgKGIubW9kZSA9PT0gVGFuZ2VudE1vZGUuTWlycm9yZWQpIGIubW9kZSA9IFRhbmdlbnRNb2RlLkNvbnRpbnVvdXM7XG4gICAgICAgIGlmICh0YW5nZW50c0VkaXRhYmxlKGEubW9kZSkpIHtcbiAgICAgICAgICAgIHFSb3RhdGUoYS50YW5nZW50T3V0LCBxSW52ZXJ0KHE0KCksIGEucm90YXRpb24pLCBzdWIodjMoKSwgbGVmdC5wMSwgbGVmdC5wMCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YW5nZW50c0VkaXRhYmxlKGIubW9kZSkpIHtcbiAgICAgICAgICAgIHFSb3RhdGUoYi50YW5nZW50SW4sIHFJbnZlcnQocTQoKSwgYi5yb3RhdGlvbiksIHN1Yih2MygpLCByaWdodC5wMiwgcmlnaHQucDMpKTtcbiAgICAgICAgfVxuICAgICAgICBrLm1vZGUgPSBUYW5nZW50TW9kZS5Db250aW51b3VzO1xuICAgICAgICBjb25zdCBpbnYgPSBxSW52ZXJ0KHE0KCksIGsucm90YXRpb24pO1xuICAgICAgICBxUm90YXRlKGsudGFuZ2VudEluLCBpbnYsIHN1Yih2MygpLCBsZWZ0LnAyLCBsZWZ0LnAzKSk7XG4gICAgICAgIHFSb3RhdGUoay50YW5nZW50T3V0LCBpbnYsIHN1Yih2MygpLCByaWdodC5wMSwgcmlnaHQucDApKTtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSBpYSArIDE7XG4gICAgcy5rbm90cy5zcGxpY2UoaW5kZXgsIDAsIGspO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaW5kZXgpO1xuICAgIGNvbnN0IG0gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBjb25zdCBwID0gcHJldkluZGV4KGluZGV4LCBtLCBzLmNsb3NlZCk7XG4gICAgY29uc3QgcSA9IG5leHRJbmRleChpbmRleCwgbSwgcy5jbG9zZWQpO1xuICAgIGlmIChzLmtub3RzW3BdLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpIGFwcGx5VGFuZ2VudE1vZGUocywgcCk7XG4gICAgaWYgKHMua25vdHNbcV0ubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCkgYXBwbHlUYW5nZW50TW9kZShzLCBxKTtcbiAgICByZXR1cm4gaW5kZXg7XG59XG5cbmNvbnN0IFkxODAgPSBxNCgwLCAxLCAwLCAwKTtcblxuLyoqIFJldmVyc2VzIHRoZSBkaXJlY3Rpb24gb2YgdHJhdmVsOyB0aGUgc2hhcGUgc3RheXMgdGhlIHNhbWUuICovXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZUZsb3coczogU3BsaW5lTGlrZSk6IHZvaWQge1xuICAgIHMua25vdHMucmV2ZXJzZSgpO1xuICAgIGZvciAoY29uc3QgayBvZiBzLmtub3RzKSB7XG4gICAgICAgIC8vIFR1cm4gdGhlIGtub3QgYXJvdW5kIGl0cyB1cCBheGlzOyBpbiBhbmQgb3V0IHN3YXAgcGxhY2VzLlxuICAgICAgICBjb25zdCBvbGRJbiA9IHFSb3RhdGUodjMoKSwgWTE4MCwgay50YW5nZW50SW4pO1xuICAgICAgICBjb25zdCBvbGRPdXQgPSBxUm90YXRlKHYzKCksIFkxODAsIGsudGFuZ2VudE91dCk7XG4gICAgICAgIGNvcHkoay50YW5nZW50SW4sIG9sZE91dCk7XG4gICAgICAgIGNvcHkoay50YW5nZW50T3V0LCBvbGRJbik7XG4gICAgICAgIHFNdWwoay5yb3RhdGlvbiwgay5yb3RhdGlvbiwgWTE4MCk7XG4gICAgfVxuICAgIHJlZnJlc2hBbGwocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDbG9zZWQoczogU3BsaW5lTGlrZSwgY2xvc2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgcy5jbG9zZWQgPSBjbG9zZWQ7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmICghbikgcmV0dXJuO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgMCk7XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBuIC0gMSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY29udGFpbmVyIG9wc1xuXG5leHBvcnQgaW50ZXJmYWNlIEtub3RSZWYge1xuICAgIHNwbGluZTogbnVtYmVyO1xuICAgIGtub3Q6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhbWVSZWYoYTogS25vdFJlZiwgYjogS25vdFJlZik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhLnNwbGluZSA9PT0gYi5zcGxpbmUgJiYgYS5rbm90ID09PSBiLmtub3Q7XG59XG5cbmZ1bmN0aW9uIGdyb3VwT2YoYzogQ29udGFpbmVyTGlrZSwgcjogS25vdFJlZik6IExpbmtMaWtlIHwgbnVsbCB7XG4gICAgZm9yIChjb25zdCBnIG9mIGMubGlua3MpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgZy5rbm90cy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgaWYgKGcua25vdHNbaV0gPT09IHIuc3BsaW5lICYmIGcua25vdHNbaSArIDFdID09PSByLmtub3QpIHJldHVybiBnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG4vKiogS25vdHMgbGlua2VkIHRvIGByYCAoZXhjbHVkaW5nIHIgaXRzZWxmKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5rZWRLbm90cyhjOiBDb250YWluZXJMaWtlLCByOiBLbm90UmVmKTogS25vdFJlZltdIHtcbiAgICBjb25zdCBnID0gZ3JvdXBPZihjLCByKTtcbiAgICBpZiAoIWcpIHJldHVybiBbXTtcbiAgICBjb25zdCByZXM6IEtub3RSZWZbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpICsgMSA8IGcua25vdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgY29uc3QgbyA9IHsgc3BsaW5lOiBnLmtub3RzW2ldLCBrbm90OiBnLmtub3RzW2kgKyAxXSB9O1xuICAgICAgICBpZiAoIXNhbWVSZWYobywgcikpIHJlcy5wdXNoKG8pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaW5rZWQoYzogQ29udGFpbmVyTGlrZSwgcjogS25vdFJlZik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWdyb3VwT2YoYywgcik7XG59XG5cbi8qKiBMaW5rcyBhbGwgZ2l2ZW4ga25vdHMgdG9nZXRoZXIgKG1lcmdpbmcgdGhlaXIgZXhpc3RpbmcgZ3JvdXBzKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5rS25vdHMoYzogQ29udGFpbmVyTGlrZSwgcmVmczogS25vdFJlZltdLCBmYWN0b3J5OiBGYWN0b3J5KTogdm9pZCB7XG4gICAgaWYgKHJlZnMubGVuZ3RoIDwgMikgcmV0dXJuO1xuICAgIGNvbnN0IG1lbWJlcnM6IEtub3RSZWZbXSA9IFtdO1xuICAgIGNvbnN0IGFkZCA9IChyOiBLbm90UmVmKSA9PiB7XG4gICAgICAgIGlmICghbWVtYmVycy5zb21lKChtKSA9PiBzYW1lUmVmKG0sIHIpKSkgbWVtYmVycy5wdXNoKHIpO1xuICAgIH07XG4gICAgZm9yIChjb25zdCByIG9mIHJlZnMpIHtcbiAgICAgICAgY29uc3QgZyA9IGdyb3VwT2YoYywgcik7XG4gICAgICAgIGlmIChnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBnLmtub3RzLmxlbmd0aDsgaSArPSAyKSBhZGQoeyBzcGxpbmU6IGcua25vdHNbaV0sIGtub3Q6IGcua25vdHNbaSArIDFdIH0pO1xuICAgICAgICAgICAgYy5saW5rcy5zcGxpY2UoYy5saW5rcy5pbmRleE9mKGcpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBhZGQocik7XG4gICAgfVxuICAgIGNvbnN0IGcgPSBmYWN0b3J5LmxpbmsoKTtcbiAgICBnLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgZm9yIChjb25zdCBtIG9mIG1lbWJlcnMpIGcua25vdHMucHVzaChtLnNwbGluZSwgbS5rbm90KTtcbiAgICBjLmxpbmtzLnB1c2goZyk7XG4gICAgLy8gTGlua2VkIGtub3RzIHNoYXJlIHRoZSBmaXJzdCBrbm90J3MgcG9zaXRpb24uXG4gICAgY29uc3QgcCA9IGMuc3BsaW5lc1tyZWZzWzBdLnNwbGluZV0ua25vdHNbcmVmc1swXS5rbm90XS5wb3NpdGlvbjtcbiAgICBmb3IgKGNvbnN0IG0gb2YgbWVtYmVycykge1xuICAgICAgICBpZiAoc2FtZVJlZihtLCByZWZzWzBdKSkgY29udGludWU7XG4gICAgICAgIHNldEtub3RQb3NpdGlvbihjLnNwbGluZXNbbS5zcGxpbmVdLCBtLmtub3QsIHApO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVubGlua0tub3RzKGM6IENvbnRhaW5lckxpa2UsIHJlZnM6IEtub3RSZWZbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgciBvZiByZWZzKSB7XG4gICAgICAgIGNvbnN0IGcgPSBncm91cE9mKGMsIHIpO1xuICAgICAgICBpZiAoIWcpIGNvbnRpbnVlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBnLmtub3RzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICBpZiAoZy5rbm90c1tpXSA9PT0gci5zcGxpbmUgJiYgZy5rbm90c1tpICsgMV0gPT09IHIua25vdCkge1xuICAgICAgICAgICAgICAgIGcua25vdHMuc3BsaWNlKGksIDIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChnLmtub3RzLmxlbmd0aCA8IDQpIGMubGlua3Muc3BsaWNlKGMubGlua3MuaW5kZXhPZihnKSwgMSk7XG4gICAgfVxufVxuXG4vKiogTW92ZXMgZXZlcnkga25vdCBsaW5rZWQgdG8gYHJgIG9udG8gcidzIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN5bmNMaW5rZWQoYzogQ29udGFpbmVyTGlrZSwgcjogS25vdFJlZik6IHZvaWQge1xuICAgIGNvbnN0IHAgPSBjLnNwbGluZXNbci5zcGxpbmVdLmtub3RzW3Iua25vdF0ucG9zaXRpb247XG4gICAgZm9yIChjb25zdCBvIG9mIGxpbmtlZEtub3RzKGMsIHIpKSB7XG4gICAgICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbby5zcGxpbmVdO1xuICAgICAgICBpZiAoIXMgfHwgIXMua25vdHNbby5rbm90XSkgY29udGludWU7XG4gICAgICAgIHNldEtub3RQb3NpdGlvbihzLCBvLmtub3QsIHApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmV3cml0ZUxpbmtzKGM6IENvbnRhaW5lckxpa2UsIG1hcDogKHI6IEtub3RSZWYpID0+IEtub3RSZWYgfCBudWxsKTogdm9pZCB7XG4gICAgZm9yIChsZXQgZ2kgPSBjLmxpbmtzLmxlbmd0aCAtIDE7IGdpID49IDA7IGdpLS0pIHtcbiAgICAgICAgY29uc3QgZyA9IGMubGlua3NbZ2ldO1xuICAgICAgICBjb25zdCBuZXh0OiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBnLmtub3RzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICBjb25zdCByID0gbWFwKHsgc3BsaW5lOiBnLmtub3RzW2ldLCBrbm90OiBnLmtub3RzW2kgKyAxXSB9KTtcbiAgICAgICAgICAgIGlmIChyICYmICFuZXh0LnNvbWUoKF8sIGopID0+IGogJSAyID09PSAwICYmIG5leHRbal0gPT09IHIuc3BsaW5lICYmIG5leHRbaiArIDFdID09PSByLmtub3QpKSBuZXh0LnB1c2goci5zcGxpbmUsIHIua25vdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHQubGVuZ3RoIDwgNCkgYy5saW5rcy5zcGxpY2UoZ2ksIDEpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGcua25vdHMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGcua25vdHMucHVzaCguLi5uZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqIFVwZGF0ZXMgbGlua3MgYWZ0ZXIgYSBrbm90IHdhcyBpbnNlcnRlZCBhdCAoc3BsaW5lLCBrbm90KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5rc09uS25vdEluc2VydGVkKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyLCBrbm90OiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXdyaXRlTGlua3MoYywgKHIpID0+IChyLnNwbGluZSA9PT0gc3BsaW5lICYmIHIua25vdCA+PSBrbm90ID8geyBzcGxpbmUsIGtub3Q6IHIua25vdCArIDEgfSA6IHIpKTtcbn1cblxuLyoqIFVwZGF0ZXMgbGlua3MgYWZ0ZXIgdGhlIGtub3QgYXQgKHNwbGluZSwga25vdCkgd2FzIHJlbW92ZWQuICovXG5leHBvcnQgZnVuY3Rpb24gbGlua3NPbktub3RSZW1vdmVkKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyLCBrbm90OiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXdyaXRlTGlua3MoYywgKHIpID0+IHtcbiAgICAgICAgaWYgKHIuc3BsaW5lICE9PSBzcGxpbmUpIHJldHVybiByO1xuICAgICAgICBpZiAoci5rbm90ID09PSBrbm90KSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHIua25vdCA+IGtub3QgPyB7IHNwbGluZSwga25vdDogci5rbm90IC0gMSB9IDogcjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmtzT25TcGxpbmVSZW1vdmVkKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV3cml0ZUxpbmtzKGMsIChyKSA9PiB7XG4gICAgICAgIGlmIChyLnNwbGluZSA9PT0gc3BsaW5lKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHIuc3BsaW5lID4gc3BsaW5lID8geyBzcGxpbmU6IHIuc3BsaW5lIC0gMSwga25vdDogci5rbm90IH0gOiByO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlua3NPblJldmVyc2VkKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyLCBjb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV3cml0ZUxpbmtzKGMsIChyKSA9PiAoci5zcGxpbmUgPT09IHNwbGluZSA/IHsgc3BsaW5lLCBrbm90OiBjb3VudCAtIDEgLSByLmtub3QgfSA6IHIpKTtcbn1cblxuLyoqIENvbnRhaW5lci1sZXZlbCBpbnNlcnQgdGhhdCBrZWVwcyBsaW5rcyB2YWxpZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluZXJJbnNlcnRLbm90KGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyLCBpbmRleDogbnVtYmVyLCBrOiBLbm90TGlrZSk6IHZvaWQge1xuICAgIGxpbmtzT25Lbm90SW5zZXJ0ZWQoYywgc3BsaW5lLCBpbmRleCk7XG4gICAgaW5zZXJ0S25vdChjLnNwbGluZXNbc3BsaW5lXSwgaW5kZXgsIGspO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVySW5zZXJ0T25DdXJ2ZShjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlciwgY3VydmVJbmRleDogbnVtYmVyLCB0OiBudW1iZXIsIGZhY3Rvcnk6IEZhY3RvcnkpOiBudW1iZXIge1xuICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbc3BsaW5lXTtcbiAgICBjb25zdCBpbmRleCA9IGN1cnZlSW5kZXggKyAxO1xuICAgIGxpbmtzT25Lbm90SW5zZXJ0ZWQoYywgc3BsaW5lLCBpbmRleCk7XG4gICAgcmV0dXJuIGluc2VydE9uQ3VydmUocywgY3VydmVJbmRleCwgdCwgZmFjdG9yeSk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBrbm90cyAocmVmcyBtYXkgc3BhbiBzcGxpbmVzKS4gU3BsaW5lcyBsZWZ0IGVtcHR5IGFyZSByZW1vdmVkLFxuICogZXhjZXB0IHRoZSBjb250YWluZXIga2VlcHMgYXQgbGVhc3Qgb25lIHNwbGluZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5lclJlbW92ZUtub3RzKGM6IENvbnRhaW5lckxpa2UsIHJlZnM6IEtub3RSZWZbXSk6IHZvaWQge1xuICAgIGNvbnN0IHNvcnRlZCA9IFsuLi5yZWZzXS5zb3J0KChhLCBiKSA9PiAoYS5zcGxpbmUgLSBiLnNwbGluZSkgfHwgKGIua25vdCAtIGEua25vdCkpO1xuICAgIGZvciAoY29uc3QgciBvZiBzb3J0ZWQpIHtcbiAgICAgICAgY29uc3QgcyA9IGMuc3BsaW5lc1tyLnNwbGluZV07XG4gICAgICAgIGlmICghcyB8fCByLmtub3QgPj0gcy5rbm90cy5sZW5ndGgpIGNvbnRpbnVlO1xuICAgICAgICByZW1vdmVLbm90KHMsIHIua25vdCk7XG4gICAgICAgIGxpbmtzT25Lbm90UmVtb3ZlZChjLCByLnNwbGluZSwgci5rbm90KTtcbiAgICAgICAgaWYgKHMua25vdHMubGVuZ3RoIDwgMyAmJiBzLmNsb3NlZCkgcy5jbG9zZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IGMuc3BsaW5lcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoYy5zcGxpbmVzW2ldLmtub3RzLmxlbmd0aCA9PT0gMCAmJiBjLnNwbGluZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgYy5zcGxpbmVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGxpbmtzT25TcGxpbmVSZW1vdmVkKGMsIGkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVyUmV2ZXJzZShjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbc3BsaW5lXTtcbiAgICBsaW5rc09uUmV2ZXJzZWQoYywgc3BsaW5lLCBzLmtub3RzLmxlbmd0aCk7XG4gICAgcmV2ZXJzZUZsb3cocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluZXJSZW1vdmVTcGxpbmUoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjLnNwbGluZXMuc3BsaWNlKHNwbGluZSwgMSk7XG4gICAgbGlua3NPblNwbGluZVJlbW92ZWQoYywgc3BsaW5lKTtcbn1cblxuZnVuY3Rpb24gY2xvbmVLbm90KGs6IEtub3RMaWtlLCBmYWN0b3J5OiBGYWN0b3J5KTogS25vdExpa2Uge1xuICAgIHJldHVybiBjb3B5S25vdChmYWN0b3J5Lmtub3QoKSwgayk7XG59XG5cbi8qKlxuICogU3BsaXRzIGEgc3BsaW5lIGF0IGEga25vdCAoVW5pdHkncyBTcGxpdCBLbm90KTogYW4gb3BlbiBzcGxpbmUgYmVjb21lcyB0d29cbiAqIHNwbGluZXMgc2hhcmluZyBhIGNvcHkgb2YgdGhlIGtub3QsIGEgY2xvc2VkIHNwbGluZSBvcGVucyBhdCB0aGUga25vdC5cbiAqIFRoZSB0d28gY29waWVzIGFyZSBsaW5rZWQuIFJldHVybnMgdGhlIG5ldyBjb3B5J3MgcmVmLCBvciBudWxsIGlmIHRoZSBrbm90XG4gKiBpcyBhbiBlbmQgb2YgYW4gb3BlbiBzcGxpbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdEtub3QoYzogQ29udGFpbmVyTGlrZSwgcjogS25vdFJlZiwgZmFjdG9yeTogRmFjdG9yeSk6IEtub3RSZWYgfCBudWxsIHtcbiAgICBjb25zdCBzID0gYy5zcGxpbmVzW3Iuc3BsaW5lXTtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgaWYgKHMuY2xvc2VkKSB7XG4gICAgICAgIC8vIFJvdGF0ZSBzbyB0aGUga25vdCBpcyBmaXJzdCwgdGhlbiBkdXBsaWNhdGUgaXQgYXQgdGhlIGVuZC5cbiAgICAgICAgY29uc3Qgb3JkZXI6IEtub3RMaWtlW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIG9yZGVyLnB1c2gocy5rbm90c1soci5rbm90ICsgaSkgJSBuXSk7XG4gICAgICAgIHJld3JpdGVMaW5rcyhjLCAobykgPT4gKG8uc3BsaW5lID09PSByLnNwbGluZSA/IHsgc3BsaW5lOiBvLnNwbGluZSwga25vdDogd3JhcChvLmtub3QgLSByLmtub3QsIG4pIH0gOiBvKSk7XG4gICAgICAgIHMua25vdHMubGVuZ3RoID0gMDtcbiAgICAgICAgcy5rbm90cy5wdXNoKC4uLm9yZGVyLCBjbG9uZUtub3Qob3JkZXJbMF0sIGZhY3RvcnkpKTtcbiAgICAgICAgcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgcmVmcmVzaEFsbChzKTtcbiAgICAgICAgY29uc3QgZmlyc3QgPSB7IHNwbGluZTogci5zcGxpbmUsIGtub3Q6IDAgfTtcbiAgICAgICAgY29uc3QgbGFzdCA9IHsgc3BsaW5lOiByLnNwbGluZSwga25vdDogbiB9O1xuICAgICAgICBsaW5rS25vdHMoYywgW2ZpcnN0LCBsYXN0XSwgZmFjdG9yeSk7XG4gICAgICAgIHJldHVybiBsYXN0O1xuICAgIH1cbiAgICBpZiAoci5rbm90IDw9IDAgfHwgci5rbm90ID49IG4gLSAxKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB0YWlsID0gZmFjdG9yeS5zcGxpbmUoKTtcbiAgICB0YWlsLmNsb3NlZCA9IGZhbHNlO1xuICAgIHRhaWwua25vdHMubGVuZ3RoID0gMDtcbiAgICB0YWlsLmtub3RzLnB1c2goY2xvbmVLbm90KHMua25vdHNbci5rbm90XSwgZmFjdG9yeSksIC4uLnMua25vdHMuc2xpY2Uoci5rbm90ICsgMSkpO1xuICAgIGNvbnN0IG5ld1NwbGluZSA9IGMuc3BsaW5lcy5sZW5ndGg7XG4gICAgLy8gTGlua3Mgb24ga25vdHMgdGhhdCBtb3ZlZCB0byB0aGUgdGFpbCBmb2xsb3cgdGhlbS5cbiAgICByZXdyaXRlTGlua3MoYywgKG8pID0+IChvLnNwbGluZSA9PT0gci5zcGxpbmUgJiYgby5rbm90ID4gci5rbm90ID8geyBzcGxpbmU6IG5ld1NwbGluZSwga25vdDogby5rbm90IC0gci5rbm90IH0gOiBvKSk7XG4gICAgcy5rbm90cy5sZW5ndGggPSByLmtub3QgKyAxO1xuICAgIGMuc3BsaW5lcy5wdXNoKHRhaWwpO1xuICAgIHJlZnJlc2hBbGwocyk7XG4gICAgcmVmcmVzaEFsbCh0YWlsKTtcbiAgICBjb25zdCBjb3B5UmVmID0geyBzcGxpbmU6IG5ld1NwbGluZSwga25vdDogMCB9O1xuICAgIGxpbmtLbm90cyhjLCBbciwgY29weVJlZl0sIGZhY3RvcnkpO1xuICAgIHJldHVybiBjb3B5UmVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbmRLbm90KHM6IFNwbGluZUxpa2UsIGtub3Q6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhcy5jbG9zZWQgJiYgcy5rbm90cy5sZW5ndGggPiAwICYmIChrbm90ID09PSAwIHx8IGtub3QgPT09IHMua25vdHMubGVuZ3RoIC0gMSk7XG59XG5cbi8qKlxuICogSm9pbnMgdHdvIGVuZCBrbm90cyAoVW5pdHkncyBKb2luIEtub3RzKS4gRW5kcyBvZiB0aGUgc2FtZSBzcGxpbmUgY2xvc2UgaXQ7XG4gKiBlbmRzIG9mIGRpZmZlcmVudCBzcGxpbmVzIG1lcmdlIHRoZSBzZWNvbmQgc3BsaW5lIGludG8gdGhlIGZpcnN0LCB0aGVcbiAqIGpvaW5lZCBrbm90IHRha2luZyBgYWAncyBwb3NpdGlvbi4gUmV0dXJucyB0aGUgam9pbmVkIGtub3QsIG9yIG51bGwgaWYgdGhlXG4gKiBrbm90cyBjYW4ndCBiZSBqb2luZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb2luS25vdHMoYzogQ29udGFpbmVyTGlrZSwgYTogS25vdFJlZiwgYjogS25vdFJlZiwgZmFjdG9yeTogRmFjdG9yeSk6IEtub3RSZWYgfCBudWxsIHtcbiAgICBjb25zdCBzYSA9IGMuc3BsaW5lc1thLnNwbGluZV07XG4gICAgY29uc3Qgc2IgPSBjLnNwbGluZXNbYi5zcGxpbmVdO1xuICAgIGlmICghc2EgfHwgIXNiIHx8ICFpc0VuZEtub3Qoc2EsIGEua25vdCkgfHwgIWlzRW5kS25vdChzYiwgYi5rbm90KSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGEuc3BsaW5lID09PSBiLnNwbGluZSkge1xuICAgICAgICBpZiAoYS5rbm90ID09PSBiLmtub3QgfHwgc2Eua25vdHMubGVuZ3RoIDwgMykgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIERyb3AgdGhlIGR1cGxpY2F0ZSBlbmQgaWYgYm90aCBlbmRzIHNpdCBvbiB0aGUgc2FtZSBwb2ludC5cbiAgICAgICAgY29uc3QgZmlyc3QgPSBzYS5rbm90c1swXTtcbiAgICAgICAgY29uc3QgbGFzdCA9IHNhLmtub3RzW3NhLmtub3RzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoZGlzdFNxKGZpcnN0LnBvc2l0aW9uLCBsYXN0LnBvc2l0aW9uKSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIGNvcHkoZmlyc3QudGFuZ2VudEluLCBsYXN0LnRhbmdlbnRJbik7XG4gICAgICAgICAgICBsaW5rc09uS25vdFJlbW92ZWQoYywgYS5zcGxpbmUsIHNhLmtub3RzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgc2Eua25vdHMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0Q2xvc2VkKHNhLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHsgc3BsaW5lOiBhLnNwbGluZSwga25vdDogYS5rbm90ID09PSAwID8gMCA6IE1hdGgubWluKGEua25vdCwgc2Eua25vdHMubGVuZ3RoIC0gMSkgfTtcbiAgICB9XG4gICAgLy8gT3JpZW50IGJvdGggc28gdGhhdCBhIGlzIHRoZSBsYXN0IGtub3Qgb2YgQSBhbmQgYiB0aGUgZmlyc3Qga25vdCBvZiBCLlxuICAgIGlmIChhLmtub3QgPT09IDApIHtcbiAgICAgICAgY29udGFpbmVyUmV2ZXJzZShjLCBhLnNwbGluZSk7XG4gICAgICAgIGEgPSB7IHNwbGluZTogYS5zcGxpbmUsIGtub3Q6IHNhLmtub3RzLmxlbmd0aCAtIDEgfTtcbiAgICB9XG4gICAgaWYgKGIua25vdCAhPT0gMCkge1xuICAgICAgICBjb250YWluZXJSZXZlcnNlKGMsIGIuc3BsaW5lKTtcbiAgICAgICAgYiA9IHsgc3BsaW5lOiBiLnNwbGluZSwga25vdDogMCB9O1xuICAgIH1cbiAgICBjb25zdCBrYSA9IHNhLmtub3RzW2Eua25vdF07XG4gICAgY29uc3Qga2IgPSBzYi5rbm90c1swXTtcbiAgICAvLyBUaGUgam9pbmVkIGtub3Qga2VlcHMgQSdzIHBvc2l0aW9uIGFuZCBpbiB0YW5nZW50LCBhbmQgQidzIG91dCB0YW5nZW50LlxuICAgIGNvbnN0IG91dFdvcmxkID0gdGFuZ2VudE91dFZlYyh2MygpLCBrYik7XG4gICAgaWYgKGthLm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhciAmJiBrYi5tb2RlICE9PSBUYW5nZW50TW9kZS5MaW5lYXIpIGthLm1vZGUgPSBUYW5nZW50TW9kZS5Ccm9rZW47XG4gICAgaWYgKHRhbmdlbnRzRWRpdGFibGUoa2EubW9kZSkpIHtcbiAgICAgICAga2EubW9kZSA9IFRhbmdlbnRNb2RlLkJyb2tlbjtcbiAgICAgICAgcVJvdGF0ZShrYS50YW5nZW50T3V0LCBxSW52ZXJ0KHE0KCksIGthLnJvdGF0aW9uKSwgb3V0V29ybGQpO1xuICAgIH1cbiAgICBjb25zdCBvZmZzZXQgPSBzYS5rbm90cy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGJJbmRleCA9IGIuc3BsaW5lO1xuICAgIC8vIEIncyBrbm90cyAoYWZ0ZXIgaXRzIGZpcnN0KSBtb3ZlIHRvIEE7IGxpbmtzIGZvbGxvdy5cbiAgICByZXdyaXRlTGlua3MoYywgKG8pID0+IHtcbiAgICAgICAgaWYgKG8uc3BsaW5lICE9PSBiSW5kZXgpIHJldHVybiBvO1xuICAgICAgICBpZiAoby5rbm90ID09PSAwKSByZXR1cm4geyBzcGxpbmU6IGEuc3BsaW5lLCBrbm90OiBhLmtub3QgfTtcbiAgICAgICAgcmV0dXJuIHsgc3BsaW5lOiBhLnNwbGluZSwga25vdDogb2Zmc2V0ICsgby5rbm90IH07XG4gICAgfSk7XG4gICAgc2Eua25vdHMucHVzaCguLi5zYi5rbm90cy5zbGljZSgxKSk7XG4gICAgYy5zcGxpbmVzLnNwbGljZShiSW5kZXgsIDEpO1xuICAgIHJld3JpdGVMaW5rcyhjLCAobykgPT4gKG8uc3BsaW5lID4gYkluZGV4ID8geyBzcGxpbmU6IG8uc3BsaW5lIC0gMSwga25vdDogby5rbm90IH0gOiBvKSk7XG4gICAgY29uc3QgYVNwbGluZSA9IGEuc3BsaW5lID4gYkluZGV4ID8gYS5zcGxpbmUgLSAxIDogYS5zcGxpbmU7XG4gICAgcmVmcmVzaEFsbChjLnNwbGluZXNbYVNwbGluZV0pO1xuICAgIHJldHVybiB7IHNwbGluZTogYVNwbGluZSwga25vdDogYS5rbm90IH07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2hhcGVzXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcGVPcHRpb25zIHtcbiAgICAvKiogU2l6ZSAoc3F1YXJlIHNpZGUsIGNpcmNsZSByYWRpdXMuLi4pLiAqL1xuICAgIHNpemU6IG51bWJlcjtcbiAgICAvKiogUG9seWdvbiAvIHN0YXIgcG9pbnRzLiAqL1xuICAgIHNpZGVzPzogbnVtYmVyO1xuICAgIC8qKiBIZWxpeCB0dXJucy4gKi9cbiAgICB0dXJucz86IG51bWJlcjtcbiAgICAvKiogSGVsaXggaGVpZ2h0LiAqL1xuICAgIGhlaWdodD86IG51bWJlcjtcbiAgICAvKiogTWFrZSB0aGUgc2hhcGUgaW4gdGhlIFhZIHBsYW5lICgyRCkgaW5zdGVhZCBvZiBYWiAoM0QpLiAqL1xuICAgIHBsYW5lMkQ/OiBib29sZWFuO1xufVxuXG4vKiogS25vdCBwb3NpdGlvbnMgKyBtb2RlcyBmb3IgYSB0ZW1wbGF0ZSBzaGFwZSAoVW5pdHkncyBTcGxpbmUgPiBTcXVhcmUgLyBDaXJjbGUgLyAuLi4pLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoYXBlS25vdHMoa2luZDogc3RyaW5nLCBvOiBTaGFwZU9wdGlvbnMpOiB7IHBvaW50czogVjNbXTsgbW9kZTogbnVtYmVyOyBjbG9zZWQ6IGJvb2xlYW47IHRhbmdlbnRTY2FsZT86IG51bWJlciB9IHtcbiAgICBjb25zdCByID0gby5zaXplO1xuICAgIGNvbnN0IHB0czogVjNbXSA9IFtdO1xuICAgIGNvbnN0IGZsYXQgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIsIGggPSAwKTogVjMgPT4gKG8ucGxhbmUyRCA/IHYzKHgsIHksIGgpIDogdjMoeCwgaCwgLXkpKTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgICAgY2FzZSAnc3F1YXJlJzpcbiAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoLXIsIC1yKSwgZmxhdCgtciwgciksIGZsYXQociwgciksIGZsYXQociwgLXIpKTtcbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5MaW5lYXIsIGNsb3NlZDogdHJ1ZSB9O1xuICAgICAgICBjYXNlICdyb3VuZGVkLXNxdWFyZSc6IHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSByICogMC43NTtcbiAgICAgICAgICAgIGNvbnN0IGUgPSByO1xuICAgICAgICAgICAgcHRzLnB1c2goZmxhdCgtYywgLWUpLCBmbGF0KC1lLCAtYyksIGZsYXQoLWUsIGMpLCBmbGF0KC1jLCBlKSwgZmxhdChjLCBlKSwgZmxhdChlLCBjKSwgZmxhdChlLCAtYyksIGZsYXQoYywgLWUpKTtcbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5BdXRvU21vb3RoLCBjbG9zZWQ6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdjaXJjbGUnOiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSAoaSAvIDQpICogTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICAgICAgcHRzLnB1c2goZmxhdChNYXRoLmNvcyhhKSAqIHIsIE1hdGguc2luKGEpICogcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gNCBNaXJyb3JlZCBrbm90cyB3aXRoIGhhbmRsZSBsZW5ndGggMC41NTIzIHIgbWFrZSBhIG5lYXItcGVyZmVjdCBjaXJjbGUuXG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuTWlycm9yZWQsIGNsb3NlZDogdHJ1ZSwgdGFuZ2VudFNjYWxlOiAwLjU1MjMgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdwb2x5Z29uJzoge1xuICAgICAgICAgICAgY29uc3QgbiA9IE1hdGgubWF4KDMsIE1hdGgucm91bmQoby5zaWRlcyA/PyA2KSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSAoaSAvIG4pICogTWF0aC5QSSAqIDIgKyBNYXRoLlBJIC8gMjtcbiAgICAgICAgICAgICAgICBwdHMucHVzaChmbGF0KE1hdGguY29zKGEpICogciwgTWF0aC5zaW4oYSkgKiByKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuTGluZWFyLCBjbG9zZWQ6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdzdGFyJzoge1xuICAgICAgICAgICAgY29uc3QgbiA9IE1hdGgubWF4KDMsIE1hdGgucm91bmQoby5zaWRlcyA/PyA1KSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG4gKiAyOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKGkgLyAobiAqIDIpKSAqIE1hdGguUEkgKiAyICsgTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICAgICAgY29uc3QgcnIgPSBpICUgMiA9PT0gMCA/IHIgOiByICogMC40NTtcbiAgICAgICAgICAgICAgICBwdHMucHVzaChmbGF0KE1hdGguY29zKGEpICogcnIsIE1hdGguc2luKGEpICogcnIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5MaW5lYXIsIGNsb3NlZDogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2hlbGl4Jzoge1xuICAgICAgICAgICAgY29uc3QgdHVybnMgPSBNYXRoLm1heCgwLjI1LCBvLnR1cm5zID8/IDMpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gby5oZWlnaHQgPz8gciAqIDI7XG4gICAgICAgICAgICBjb25zdCBwZXJUdXJuID0gODtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBNYXRoLnJvdW5kKHR1cm5zICogcGVyVHVybik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKGkgLyBwZXJUdXJuKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoTWF0aC5jb3MoYSkgKiByLCBNYXRoLnNpbihhKSAqIHIsIChpIC8gbikgKiBoZWlnaHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5BdXRvU21vb3RoLCBjbG9zZWQ6IGZhbHNlIH07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnbGluZSc6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBwdHMucHVzaChmbGF0KC1yLCAwKSwgZmxhdChyLCAwKSk7XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuQXV0b1Ntb290aCwgY2xvc2VkOiBmYWxzZSB9O1xuICAgIH1cbn1cblxuLyoqIEZpbGxzIGEgc3BsaW5lIHdpdGggYSBzaGFwZSBmcm9tIHNoYXBlS25vdHMuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTaGFwZShzOiBTcGxpbmVMaWtlLCBraW5kOiBzdHJpbmcsIG86IFNoYXBlT3B0aW9ucywgZmFjdG9yeTogRmFjdG9yeSk6IHZvaWQge1xuICAgIGNvbnN0IHNoYXBlID0gc2hhcGVLbm90cyhraW5kLCBvKTtcbiAgICBzLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgcy5jbG9zZWQgPSBzaGFwZS5jbG9zZWQ7XG4gICAgY29uc3Qgbm9ybWFsID0gby5wbGFuZTJEID8gdjMoMCwgMCwgMSkgOiB2MygwLCAxLCAwKTtcbiAgICBjb25zdCBuID0gc2hhcGUucG9pbnRzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICBjb25zdCBrID0gZmFjdG9yeS5rbm90KCk7XG4gICAgICAgIGNvcHkoay5wb3NpdGlvbiwgc2hhcGUucG9pbnRzW2ldKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAwKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgMCk7XG4gICAgICAgIHFJZGVudGl0eShrLnJvdGF0aW9uKTtcbiAgICAgICAgay5tb2RlID0gc2hhcGUubW9kZTtcbiAgICAgICAgay50ZW5zaW9uID0gREVGQVVMVF9URU5TSU9OO1xuICAgICAgICBzLmtub3RzLnB1c2goayk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGsgPSBzLmtub3RzW2ldO1xuICAgICAgICBjb25zdCBwcmV2ID0gcy5rbm90c1twcmV2SW5kZXgoaSwgbiwgcy5jbG9zZWQpXS5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgbmV4dCA9IHMua25vdHNbbmV4dEluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGRpciA9IHN1Yih2MygpLCBuZXh0LCBwcmV2KTtcbiAgICAgICAgaWYgKGxlblNxKGRpcikgPCBFUFNJTE9OKSBzdWIoZGlyLCBuZXh0LCBrLnBvc2l0aW9uKTtcbiAgICAgICAga25vdFJvdGF0aW9uKGsucm90YXRpb24sIGRpciwgbm9ybWFsKTtcbiAgICAgICAgaWYgKHNoYXBlLnRhbmdlbnRTY2FsZSkge1xuICAgICAgICAgICAgY29uc3QgbCA9IHNoYXBlLnRhbmdlbnRTY2FsZSAqIG8uc2l6ZTtcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWwpO1xuICAgICAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVmcmVzaEFsbChzKTtcbn1cblxuZXhwb3J0IHsgVVAgYXMgS05PVF9VUCwgRk9SV0FSRCBhcyBLTk9UX0ZPUldBUkQgfTtcbiIsICJpbXBvcnQgeyBfZGVjb3JhdG9yLCBjY2VudW0sIFF1YXQsIFZlYzMgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBERUZBVUxUX1RFTlNJT04sIEtub3RMaWtlLCBUYW5nZW50TW9kZSB9IGZyb20gJy4uL2NvcmUvc3BsaW5lLWNvcmUnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG5jY2VudW0oVGFuZ2VudE1vZGUpO1xuXG4vKipcbiAqIEEgY29udHJvbCBwb2ludCBvZiBhIHNwbGluZTogYSBwb3NpdGlvbiwgYSByb3RhdGlvbiBhbmQgdHdvIHRhbmdlbnRzLlxuICpcbiAqIFRhbmdlbnRzIGFyZSBpbiB0aGUga25vdCdzIG93biBzcGFjZTogK1ogaXMgdGhlIGRpcmVjdGlvbiB0aGUgc3BsaW5lXG4gKiB0cmF2ZWxzIHRocm91Z2ggdGhlIGtub3QgYW5kICtZIGlzIHRoZSBrbm90J3MgdXAgdmVjdG9yLiBIb3cgdGhlIHRhbmdlbnRzXG4gKiBhcmUga2VwdCBkZXBlbmRzIG9uIGBtb2RlYCAoc2VlIFRhbmdlbnRNb2RlKS5cbiAqL1xuQGNjY2xhc3MoJ3NwbGluZXMuQmV6aWVyS25vdCcpXG5leHBvcnQgY2xhc3MgQmV6aWVyS25vdCBpbXBsZW1lbnRzIEtub3RMaWtlIHtcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUG9zaXRpb24gaW4gdGhlIHNwbGluZSBjb250YWluZXJcdTIwMTlzIGxvY2FsIHNwYWNlLicgfSlcbiAgICBwb3NpdGlvbiA9IG5ldyBWZWMzKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnSW4gdGFuZ2VudCwgaW4gdGhlIGtub3RcdTIwMTlzIHNwYWNlIChwb2ludHMgYmFja3dhcmRzIGFsb25nIC1aKS4nIH0pXG4gICAgdGFuZ2VudEluID0gbmV3IFZlYzMoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdPdXQgdGFuZ2VudCwgaW4gdGhlIGtub3RcdTIwMTlzIHNwYWNlIChwb2ludHMgZm9yd2FyZHMgYWxvbmcgK1opLicgfSlcbiAgICB0YW5nZW50T3V0ID0gbmV3IFZlYzMoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdLbm90IHJvdGF0aW9uOiArWiBpcyB0aGUgZGlyZWN0aW9uIG9mIHRyYXZlbCwgK1kgdGhlIHVwIHZlY3Rvci4nIH0pXG4gICAgcm90YXRpb24gPSBuZXcgUXVhdCgpO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogVGFuZ2VudE1vZGUsIHRvb2x0aXA6ICdIb3cgdGhlIHRhbmdlbnRzIGFyZSBrZXB0LicgfSlcbiAgICBtb2RlOiBUYW5nZW50TW9kZSA9IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGg7XG5cbiAgICBAcHJvcGVydHkoeyByYW5nZTogWzAsIDEsIDAuMDFdLCBzbGlkZTogdHJ1ZSwgdG9vbHRpcDogJ0F1dG8gU21vb3RoIHRlbnNpb24gKDAgdW5pZm9ybSwgMC41IGNlbnRyaXBldGFsLCAxIGNob3JkYWwpLicgfSlcbiAgICB0ZW5zaW9uID0gREVGQVVMVF9URU5TSU9OO1xuXG4gICAgY29uc3RydWN0b3IocG9zaXRpb24/OiBSZWFkb25seTxWZWMzPiwgdGFuZ2VudEluPzogUmVhZG9ubHk8VmVjMz4sIHRhbmdlbnRPdXQ/OiBSZWFkb25seTxWZWMzPiwgcm90YXRpb24/OiBSZWFkb25seTxRdWF0PiwgbW9kZT86IFRhbmdlbnRNb2RlKSB7XG4gICAgICAgIGlmIChwb3NpdGlvbikgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24pO1xuICAgICAgICBpZiAodGFuZ2VudEluKSB0aGlzLnRhbmdlbnRJbi5zZXQodGFuZ2VudEluKTtcbiAgICAgICAgaWYgKHRhbmdlbnRPdXQpIHRoaXMudGFuZ2VudE91dC5zZXQodGFuZ2VudE91dCk7XG4gICAgICAgIGlmIChyb3RhdGlvbikgdGhpcy5yb3RhdGlvbi5zZXQocm90YXRpb24pO1xuICAgICAgICBpZiAobW9kZSAhPT0gdW5kZWZpbmVkKSB0aGlzLm1vZGUgPSBtb2RlO1xuICAgIH1cblxuICAgIGNsb25lKCk6IEJlemllcktub3Qge1xuICAgICAgICBjb25zdCBrID0gbmV3IEJlemllcktub3QodGhpcy5wb3NpdGlvbiwgdGhpcy50YW5nZW50SW4sIHRoaXMudGFuZ2VudE91dCwgdGhpcy5yb3RhdGlvbiwgdGhpcy5tb2RlKTtcbiAgICAgICAgay50ZW5zaW9uID0gdGhpcy50ZW5zaW9uO1xuICAgICAgICByZXR1cm4gaztcbiAgICB9XG59XG5cbmV4cG9ydCB7IFRhbmdlbnRNb2RlIH07XG4iLCAiaW1wb3J0IHsgX2RlY29yYXRvciwgQ0NJbnRlZ2VyIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgTGlua0xpa2UgfSBmcm9tICcuLi9jb3JlL3NwbGluZS1jb3JlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuLyoqXG4gKiBBIGdyb3VwIG9mIGxpbmtlZCBrbm90czoga25vdHMgdGhhdCBhbHdheXMgc2hhcmUgb25lIHBvc2l0aW9uLCBwb3NzaWJseVxuICogb24gZGlmZmVyZW50IHNwbGluZXMgb2YgdGhlIHNhbWUgY29udGFpbmVyLiBTdG9yZWQgYXMgZmxhdHRlbmVkXG4gKiAoc3BsaW5lSW5kZXgsIGtub3RJbmRleCkgcGFpcnMuXG4gKi9cbkBjY2NsYXNzKCdzcGxpbmVzLktub3RMaW5rJylcbmV4cG9ydCBjbGFzcyBLbm90TGluayBpbXBsZW1lbnRzIExpbmtMaWtlIHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbQ0NJbnRlZ2VyXSB9KVxuICAgIGtub3RzOiBudW1iZXJbXSA9IFtdO1xufVxuIiwgImltcG9ydCB7IF9kZWNvcmF0b3IsIGRpcmVjdG9yLCBWZWMzIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgQmV6aWVyS25vdCB9IGZyb20gJy4vQmV6aWVyS25vdCc7XG5pbXBvcnQge1xuICAgIFNwbGluZUNhY2hlLCBTcGxpbmVMaWtlLCBUYW5nZW50TW9kZSwgREVGQVVMVF9URU5TSU9OLCBGYWN0b3J5LFxuICAgIGVuc3VyZUNhY2hlLCBjdXJ2ZUNvdW50LCBnZXRDdXJ2ZSwgZXZhbHVhdGVQb3NpdGlvbiwgZXZhbHVhdGVEaXJlY3Rpb24sIGV2YWx1YXRlVXAsIGN1cnZlUG9pbnRBdCxcbiAgICBuZWFyZXN0UG9pbnQsIHRBdERpc3RhbmNlRnJvbSwga25vdFVuaXRUb1QsIHRUb0tub3RVbml0LCBub3JtYWxpemVkVE9mLFxuICAgIGluc2VydEtub3QsIHJlbW92ZUtub3QsIGluc2VydE9uQ3VydmUsIHJldmVyc2VGbG93LCBzZXRDbG9zZWQsIHNldFRhbmdlbnRNb2RlLCBzZXRUZW5zaW9uLFxuICAgIHNldEtub3RQb3NpdGlvbiwgcmVmcmVzaEFsbCwgcmVmcmVzaEFyb3VuZCwgYXBwbHlUYW5nZW50TW9kZSxcbn0gZnJvbSAnLi4vY29yZS9zcGxpbmUtY29yZSc7XG5pbXBvcnQgeyBDdXJ2ZSwgY3VydmUsIGV2YWxEZXJpdmF0aXZlIH0gZnJvbSAnLi4vY29yZS9jdXJ2ZSc7XG5pbXBvcnQgeyBLbm90TGluayB9IGZyb20gJy4vS25vdExpbmsnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG4vKiogQ3JlYXRlcyBlbmdpbmUgb2JqZWN0cyBmb3IgdGhlIGNvcmUncyBlZGl0IG9wZXJhdGlvbnMuICovXG5leHBvcnQgY29uc3Qgc3BsaW5lRmFjdG9yeTogRmFjdG9yeSA9IHtcbiAgICBrbm90OiAoKSA9PiBuZXcgQmV6aWVyS25vdCgpLFxuICAgIHNwbGluZTogKCkgPT4gbmV3IFNwbGluZSgpLFxuICAgIGxpbms6ICgpID0+IG5ldyBLbm90TGluaygpLFxufTtcblxuLyoqIFdoZXJlIGEgZGlzdGFuY2UgYWxvbmcgdGhlIHNwbGluZSBpcyBtZWFzdXJlZCBmcm9tIChVbml0eSdzIFBhdGhJbmRleFVuaXQpLiAqL1xuZXhwb3J0IGVudW0gUGF0aEluZGV4VW5pdCB7XG4gICAgLyoqIDAuLjEgb3ZlciB0aGUgc3BsaW5lJ3MgbGVuZ3RoLiAqL1xuICAgIE5vcm1hbGl6ZWQgPSAwLFxuICAgIC8qKiBEaXN0YW5jZSBpbiB0aGUgc3BsaW5lJ3MgbG9jYWwgdW5pdHMuICovXG4gICAgRGlzdGFuY2UgPSAxLFxuICAgIC8qKiBLbm90IGluZGV4OiAyLjUgaXMgaGFsZndheSBiZXR3ZWVuIGtub3RzIDIgYW5kIDMuICovXG4gICAgS25vdCA9IDIsXG59XG5cbi8qKlxuICogQSBCZXppZXIgc3BsaW5lOiBhIGxpc3Qgb2Yga25vdHMsIG9wZW4gb3IgY2xvc2VkLlxuICpcbiAqIFBvc2l0aW9ucyBhcmUgaW4gdGhlIGxvY2FsIHNwYWNlIG9mIHRoZSBTcGxpbmVDb250YWluZXIgdGhhdCBvd25zIHRoZVxuICogc3BsaW5lLiBgdGAgYXJndW1lbnRzIGFyZSBub3JtYWxpemVkIGRpc3RhbmNlczogMCBpcyB0aGUgZmlyc3Qga25vdCBhbmQgMVxuICogdGhlIGVuZCwgYW5kIHQgPSAwLjUgaXMgaGFsZndheSBhbG9uZyB0aGUgc3BsaW5lJ3MgbGVuZ3RoLlxuICpcbiAqIFVzZSB0aGUgbWV0aG9kcyB0byBlZGl0IGtub3RzIHNvIHRoZSBzcGxpbmUgdXBkYXRlcyBpdHMgdGFuZ2VudHMgYW5kXG4gKiBjYWNoZWQgbGVuZ3Rocy4gQWZ0ZXIgY2hhbmdpbmcga25vdCBmaWVsZHMgZGlyZWN0bHksIGNhbGwgbWFya0RpcnR5KCkuXG4gKi9cbkBjY2NsYXNzKCdzcGxpbmVzLlNwbGluZScpXG5leHBvcnQgY2xhc3MgU3BsaW5lIGltcGxlbWVudHMgU3BsaW5lTGlrZSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogW0Jlemllcktub3RdLCB0b29sdGlwOiAnVGhlIGtub3RzIG9mIHRoZSBzcGxpbmUuJyB9KVxuICAgIGtub3RzOiBCZXppZXJLbm90W10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdDb25uZWN0cyB0aGUgbGFzdCBrbm90IGJhY2sgdG8gdGhlIGZpcnN0LicgfSlcbiAgICBjbG9zZWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2NhY2hlID0gbmV3IFNwbGluZUNhY2hlKCk7XG4gICAgcHJpdmF0ZSBfY2hlY2tlZEZyYW1lID0gLTE7XG4gICAgcHJpdmF0ZSBfdmVyc2lvbiA9IDA7XG5cbiAgICAvKiogQnVtcGVkIGJ5IGV2ZXJ5IGVkaXQgbWFkZSB0aHJvdWdoIHRoZSBTcGxpbmUgQVBJIChhbmQgbWFya0RpcnR5KS4gKi9cbiAgICBnZXQgdmVyc2lvbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVyc2lvbjtcbiAgICB9XG5cbiAgICBnZXQgY291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua25vdHMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKiBOdW1iZXIgb2YgY3VydmVzIChzZWdtZW50cyBiZXR3ZWVuIGtub3RzKS4gKi9cbiAgICBnZXQgY3VydmVDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gY3VydmVDb3VudCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogTGVuZ3RocyBhbmQgbG9va3VwIHRhYmxlcywgcmVidWlsdCB3aGVuIHRoZSBrbm90cyBjaGFuZ2UgKGNoZWNrZWQgb25jZSBwZXIgZnJhbWUpLiAqL1xuICAgIGdldCBjYWNoZSgpOiBTcGxpbmVDYWNoZSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gZGlyZWN0b3IuZ2V0VG90YWxGcmFtZXMoKTtcbiAgICAgICAgaWYgKGZyYW1lICE9PSB0aGlzLl9jaGVja2VkRnJhbWUgfHwgdGhpcy5fY2hlY2tlZEZyYW1lIDwgMCkge1xuICAgICAgICAgICAgZW5zdXJlQ2FjaGUodGhpcywgdGhpcy5fY2FjaGUpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tlZEZyYW1lID0gZnJhbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlO1xuICAgIH1cblxuICAgIC8qKiBDYWxsIGFmdGVyIGNoYW5naW5nIGtub3RzIGRpcmVjdGx5IChub3QgdGhyb3VnaCB0aGUgU3BsaW5lIG1ldGhvZHMpLiAqL1xuICAgIG1hcmtEaXJ0eSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2hlY2tlZEZyYW1lID0gLTE7XG4gICAgICAgIHRoaXMuX3ZlcnNpb24rKztcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0ga25vdHNcblxuICAgIGdldEtub3QoaW5kZXg6IG51bWJlcik6IEJlemllcktub3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5rbm90c1tpbmRleF07XG4gICAgfVxuXG4gICAgLyoqIFJlcGxhY2VzIGEga25vdCAoY29waWVkKSBhbmQgdXBkYXRlcyB0aGUgdGFuZ2VudHMgdGhhdCBkZXBlbmQgb24gaXQuICovXG4gICAgc2V0S25vdChpbmRleDogbnVtYmVyLCBrbm90OiBCZXppZXJLbm90KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGsgPSB0aGlzLmtub3RzW2luZGV4XTtcbiAgICAgICAgay5wb3NpdGlvbi5zZXQoa25vdC5wb3NpdGlvbik7XG4gICAgICAgIGsudGFuZ2VudEluLnNldChrbm90LnRhbmdlbnRJbik7XG4gICAgICAgIGsudGFuZ2VudE91dC5zZXQoa25vdC50YW5nZW50T3V0KTtcbiAgICAgICAgay5yb3RhdGlvbi5zZXQoa25vdC5yb3RhdGlvbik7XG4gICAgICAgIGsubW9kZSA9IGtub3QubW9kZTtcbiAgICAgICAgay50ZW5zaW9uID0ga25vdC50ZW5zaW9uO1xuICAgICAgICByZWZyZXNoQXJvdW5kKHRoaXMsIGluZGV4KTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICAvKiogQWRkcyBhIGtub3QgYXQgdGhlIGVuZC4gV2l0aCBhIHBvc2l0aW9uLCBjcmVhdGVzIGEga25vdCB3aXRoIHRoZSBnaXZlbiBtb2RlLiAqL1xuICAgIGFkZChrbm90T3JQb3NpdGlvbjogQmV6aWVyS25vdCB8IFJlYWRvbmx5PFZlYzM+LCBtb2RlOiBUYW5nZW50TW9kZSA9IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpOiBCZXppZXJLbm90IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0KHRoaXMua25vdHMubGVuZ3RoLCBrbm90T3JQb3NpdGlvbiwgbW9kZSk7XG4gICAgfVxuXG4gICAgaW5zZXJ0KGluZGV4OiBudW1iZXIsIGtub3RPclBvc2l0aW9uOiBCZXppZXJLbm90IHwgUmVhZG9ubHk8VmVjMz4sIG1vZGU6IFRhbmdlbnRNb2RlID0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCk6IEJlemllcktub3Qge1xuICAgICAgICBsZXQgazogQmV6aWVyS25vdDtcbiAgICAgICAgaWYgKGtub3RPclBvc2l0aW9uIGluc3RhbmNlb2YgQmV6aWVyS25vdCkge1xuICAgICAgICAgICAgayA9IGtub3RPclBvc2l0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgayA9IG5ldyBCZXppZXJLbm90KGtub3RPclBvc2l0aW9uIGFzIFZlYzMpO1xuICAgICAgICAgICAgay5tb2RlID0gbW9kZTtcbiAgICAgICAgICAgIGsudGVuc2lvbiA9IERFRkFVTFRfVEVOU0lPTjtcbiAgICAgICAgfVxuICAgICAgICBpbnNlcnRLbm90KHRoaXMsIGluZGV4LCBrKTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICAgICAgcmV0dXJuIGs7XG4gICAgfVxuXG4gICAgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICByZW1vdmVLbm90KHRoaXMsIGluZGV4KTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5rbm90cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIHNldEtub3RQb3NpdGlvbihpbmRleDogbnVtYmVyLCBwb3NpdGlvbjogUmVhZG9ubHk8VmVjMz4pOiB2b2lkIHtcbiAgICAgICAgc2V0S25vdFBvc2l0aW9uKHRoaXMsIGluZGV4LCBwb3NpdGlvbik7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgZ2V0VGFuZ2VudE1vZGUoaW5kZXg6IG51bWJlcik6IFRhbmdlbnRNb2RlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua25vdHNbaW5kZXhdLm1vZGU7XG4gICAgfVxuXG4gICAgc2V0VGFuZ2VudE1vZGUoaW5kZXg6IG51bWJlciwgbW9kZTogVGFuZ2VudE1vZGUpOiB2b2lkIHtcbiAgICAgICAgc2V0VGFuZ2VudE1vZGUodGhpcywgaW5kZXgsIG1vZGUpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIC8qKiBTZXRzIHRoZSBtb2RlIG9mIGV2ZXJ5IGtub3QuICovXG4gICAgc2V0VGFuZ2VudE1vZGVBbGwobW9kZTogVGFuZ2VudE1vZGUpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmtub3RzLmxlbmd0aDsgaSsrKSBzZXRUYW5nZW50TW9kZSh0aGlzLCBpLCBtb2RlKTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICBzZXRBdXRvU21vb3RoVGVuc2lvbihpbmRleDogbnVtYmVyLCB0ZW5zaW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc2V0VGVuc2lvbih0aGlzLCBpbmRleCwgdGVuc2lvbik7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgLyoqIEluc2VydHMgYSBrbm90IG9uIGEgY3VydmUgd2l0aG91dCBjaGFuZ2luZyB0aGUgc2hhcGUuIFJldHVybnMgaXRzIGluZGV4LiAqL1xuICAgIGluc2VydE9uQ3VydmUoY3VydmVJbmRleDogbnVtYmVyLCBjdXJ2ZVQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGkgPSBpbnNlcnRPbkN1cnZlKHRoaXMsIGN1cnZlSW5kZXgsIGN1cnZlVCwgc3BsaW5lRmFjdG9yeSk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cblxuICAgIHNldENsb3NlZChjbG9zZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgc2V0Q2xvc2VkKHRoaXMsIGNsb3NlZCk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgLyoqIFJldmVyc2VzIHRoZSBkaXJlY3Rpb24gb2YgdHJhdmVsICh0aGUgc2hhcGUgaXMgdW5jaGFuZ2VkKS4gKi9cbiAgICByZXZlcnNlKCk6IHZvaWQge1xuICAgICAgICByZXZlcnNlRmxvdyh0aGlzKTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICAvKiogUmUtYXBwbGllcyBldmVyeSBrbm90J3MgdGFuZ2VudCBtb2RlLiAqL1xuICAgIHJlZnJlc2goKTogdm9pZCB7XG4gICAgICAgIHJlZnJlc2hBbGwodGhpcyk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgLyoqIFJlLWFwcGxpZXMgdGhlIHRhbmdlbnQgbW9kZSBvZiBvbmUga25vdC4gKi9cbiAgICByZWZyZXNoS25vdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGFwcGx5VGFuZ2VudE1vZGUodGhpcywgaW5kZXgpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBxdWVyaWVzXG5cbiAgICAvKiogVG90YWwgbGVuZ3RoIGluIGxvY2FsIHVuaXRzLiAqL1xuICAgIGdldExlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS50b3RhbDtcbiAgICB9XG5cbiAgICBnZXRDdXJ2ZUxlbmd0aChjdXJ2ZUluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS5sZW5ndGhzW2N1cnZlSW5kZXhdID8/IDA7XG4gICAgfVxuXG4gICAgLyoqIENvbnRyb2wgcG9pbnRzIG9mIGEgY3VydmUgKGxvY2FsIHNwYWNlKS4gKi9cbiAgICBnZXRDdXJ2ZShjdXJ2ZUluZGV4OiBudW1iZXIsIG91dDogQ3VydmUgPSBjdXJ2ZSgpKTogQ3VydmUge1xuICAgICAgICByZXR1cm4gZ2V0Q3VydmUodGhpcywgY3VydmVJbmRleCwgb3V0KTtcbiAgICB9XG5cbiAgICBldmFsdWF0ZVBvc2l0aW9uKHQ6IG51bWJlciwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICByZXR1cm4gZXZhbHVhdGVQb3NpdGlvbih0aGlzLCB0aGlzLmNhY2hlLCB0LCBvdXQpO1xuICAgIH1cblxuICAgIC8qKiBEZXJpdmF0aXZlIGF0IHQgKGRpcmVjdGlvbiB0aW1lcyBzcGVlZCwgbGlrZSBVbml0eSdzIEV2YWx1YXRlVGFuZ2VudCkuICovXG4gICAgZXZhbHVhdGVUYW5nZW50KHQ6IG51bWJlciwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgICAgIGlmICghY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIGV2YWx1YXRlRGlyZWN0aW9uKHRoaXMsIGNhY2hlLCB0LCBvdXQpO1xuICAgICAgICBjb25zdCBwID0gY3VydmVQb2ludEF0KGNhY2hlLCB0KTtcbiAgICAgICAgZXZhbERlcml2YXRpdmUob3V0LCBjYWNoZS5jdXJ2ZXNbcC5pbmRleF0sIHAudCk7XG4gICAgICAgIGlmIChvdXQubGVuZ3RoU3FyKCkgPCAxZS0xMikgZXZhbHVhdGVEaXJlY3Rpb24odGhpcywgY2FjaGUsIHQsIG91dCk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqIFVuaXQgZGlyZWN0aW9uIG9mIHRyYXZlbCBhdCB0LiAqL1xuICAgIGV2YWx1YXRlRGlyZWN0aW9uKHQ6IG51bWJlciwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICByZXR1cm4gZXZhbHVhdGVEaXJlY3Rpb24odGhpcywgdGhpcy5jYWNoZSwgdCwgb3V0KTtcbiAgICB9XG5cbiAgICAvKiogVW5pdCB1cCB2ZWN0b3IgYXQgdCwgaW50ZXJwb2xhdGVkIGJldHdlZW4gdGhlIGtub3RzJyB1cCB2ZWN0b3JzIHdpdGhvdXQgdHdpc3RpbmcuICovXG4gICAgZXZhbHVhdGVVcFZlY3Rvcih0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRlVXAodGhpcywgdGhpcy5jYWNoZSwgdCwgb3V0KTtcbiAgICB9XG5cbiAgICAvKiogQ2xvc2VzdCBwb2ludCB0byBgcG9pbnRgIChsb2NhbCBzcGFjZSkuIFJldHVybnMgaXRzIHQgYW5kIHBvc2l0aW9uLiAqL1xuICAgIGdldE5lYXJlc3RQb2ludChwb2ludDogUmVhZG9ubHk8VmVjMz4sIG91dFBvc2l0aW9uID0gbmV3IFZlYzMoKSk6IHsgdDogbnVtYmVyOyBwb3NpdGlvbjogVmVjMzsgZGlzdGFuY2U6IG51bWJlciB9IHtcbiAgICAgICAgY29uc3QgciA9IG5lYXJlc3RQb2ludCh0aGlzLCB0aGlzLmNhY2hlLCBwb2ludCk7XG4gICAgICAgIG91dFBvc2l0aW9uLnNldChyLnBvc2l0aW9uLngsIHIucG9zaXRpb24ueSwgci5wb3NpdGlvbi56KTtcbiAgICAgICAgcmV0dXJuIHsgdDogci50LCBwb3NpdGlvbjogb3V0UG9zaXRpb24sIGRpc3RhbmNlOiByLmRpc3RhbmNlIH07XG4gICAgfVxuXG4gICAgLyoqIFRoZSB0IHJlYWNoZWQgYWZ0ZXIgbW92aW5nIGBkaXN0YW5jZWAgKGxvY2FsIHVuaXRzLCBtYXkgYmUgbmVnYXRpdmUpIGZyb20gYGZyb21UYC4gKi9cbiAgICBnZXRUQXREaXN0YW5jZShmcm9tVDogbnVtYmVyLCBkaXN0YW5jZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRBdERpc3RhbmNlRnJvbSh0aGlzLCB0aGlzLmNhY2hlLCBmcm9tVCwgZGlzdGFuY2UpO1xuICAgIH1cblxuICAgIC8qKiBDb252ZXJ0cyBhIHBvc2l0aW9uIGFsb25nIHRoZSBzcGxpbmUgYmV0d2VlbiB1bml0cyAoVW5pdHkncyBDb252ZXJ0SW5kZXhVbml0KS4gKi9cbiAgICBjb252ZXJ0SW5kZXhVbml0KHZhbHVlOiBudW1iZXIsIGZyb206IFBhdGhJbmRleFVuaXQsIHRvOiBQYXRoSW5kZXhVbml0KTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGZyb20gPT09IHRvKSByZXR1cm4gdmFsdWU7XG4gICAgICAgIGNvbnN0IGNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICAgICAgbGV0IHQ6IG51bWJlcjtcbiAgICAgICAgaWYgKGZyb20gPT09IFBhdGhJbmRleFVuaXQuTm9ybWFsaXplZCkgdCA9IHZhbHVlO1xuICAgICAgICBlbHNlIGlmIChmcm9tID09PSBQYXRoSW5kZXhVbml0LkRpc3RhbmNlKSB0ID0gY2FjaGUudG90YWwgPiAwID8gdmFsdWUgLyBjYWNoZS50b3RhbCA6IDA7XG4gICAgICAgIGVsc2UgdCA9IGtub3RVbml0VG9UKGNhY2hlLCB2YWx1ZSk7XG4gICAgICAgIGlmICh0byA9PT0gUGF0aEluZGV4VW5pdC5Ob3JtYWxpemVkKSByZXR1cm4gdDtcbiAgICAgICAgaWYgKHRvID09PSBQYXRoSW5kZXhVbml0LkRpc3RhbmNlKSByZXR1cm4gdCAqIGNhY2hlLnRvdGFsO1xuICAgICAgICByZXR1cm4gdFRvS25vdFVuaXQoY2FjaGUsIHQpO1xuICAgIH1cblxuICAgIC8qKiBOb3JtYWxpemVkIHQgb2YgYSBrbm90LiAqL1xuICAgIGtub3RUKGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgICAgIGlmICghY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIDA7XG4gICAgICAgIGlmIChpbmRleCA+PSBjYWNoZS5jdXJ2ZXMubGVuZ3RoKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRUT2YoY2FjaGUsIGluZGV4LCAwKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBNYXQ0LCBWZWMzLCBRdWF0IH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRURJVE9SIH0gZnJvbSAnY2MvZW52JztcbmltcG9ydCB7IFNwbGluZSwgc3BsaW5lRmFjdG9yeSwgUGF0aEluZGV4VW5pdCB9IGZyb20gJy4vU3BsaW5lJztcbmltcG9ydCB7IEtub3RMaW5rIH0gZnJvbSAnLi9Lbm90TGluayc7XG5pbXBvcnQgeyBCZXppZXJLbm90LCBUYW5nZW50TW9kZSB9IGZyb20gJy4vQmV6aWVyS25vdCc7XG5pbXBvcnQge1xuICAgIENvbnRhaW5lckxpa2UsIEtub3RSZWYsIGxpbmtLbm90cywgdW5saW5rS25vdHMsIGxpbmtlZEtub3RzLCBzeW5jTGlua2VkLCBpc0xpbmtlZCxcbiAgICBjb250YWluZXJSZW1vdmVTcGxpbmUsIGNvbnRhaW5lckluc2VydEtub3QsIGNvbnRhaW5lclJlbW92ZUtub3RzLCBjb250YWluZXJSZXZlcnNlLFxuICAgIHNwbGl0S25vdCwgam9pbktub3RzLCBuZWFyZXN0UG9pbnQsIGZpbmdlcnByaW50LCByZWZyZXNoQWxsLFxufSBmcm9tICcuLi9jb3JlL3NwbGluZS1jb3JlJztcbmltcG9ydCB7IGFyY0xlbmd0aCwgY3VydmUsIEN1cnZlIH0gZnJvbSAnLi4vY29yZS9jdXJ2ZSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGVJbkVkaXRNb2RlLCBtZW51LCBkaXNhbGxvd011bHRpcGxlIH0gPSBfZGVjb3JhdG9yO1xuXG5jb25zdCBfbSA9IG5ldyBNYXQ0KCk7XG5jb25zdCBfdiA9IG5ldyBWZWMzKCk7XG5jb25zdCBfYzogQ3VydmUgPSBjdXJ2ZSgpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNwbGluZVNhbXBsZSB7XG4gICAgcG9zaXRpb246IFZlYzM7XG4gICAgLyoqIFVuaXQgZGlyZWN0aW9uIG9mIHRyYXZlbC4gKi9cbiAgICB0YW5nZW50OiBWZWMzO1xuICAgIC8qKiBVbml0IHVwIHZlY3Rvci4gKi9cbiAgICB1cDogVmVjMztcbn1cblxuLyoqXG4gKiBIb2xkcyBvbmUgb3IgbW9yZSBzcGxpbmVzIGluIHRoZSBub2RlJ3MgbG9jYWwgc3BhY2UgKFVuaXR5J3MgU3BsaW5lQ29udGFpbmVyKS5cbiAqXG4gKiBFdmFsdWF0ZSBtZXRob2RzIHdvcmsgaW4gd29ybGQgc3BhY2U7IHRoZSBTcGxpbmUgb2JqZWN0cyB0aGVtc2VsdmVzIHdvcmtcbiAqIGluIGxvY2FsIHNwYWNlLiBgdGAgaXMgYSBub3JtYWxpemVkIGRpc3RhbmNlOiAwID0gc3RhcnQsIDEgPSBlbmQuXG4gKlxuICogRW1pdHMgU3BsaW5lQ29udGFpbmVyLkV2ZW50VHlwZS5DSEFOR0VEIG9uIGl0cyBub2RlIHdoZW4gYSBzcGxpbmUgY2hhbmdlc1xuICogKGluIHRoZSBlZGl0b3IgYWx3YXlzOyBhdCBydW50aW1lIHdoZW4gc29tZW9uZSBsaXN0ZW5zKS5cbiAqL1xuQGNjY2xhc3MoJ1NwbGluZUNvbnRhaW5lcicpXG5AZXhlY3V0ZUluRWRpdE1vZGVcbkBkaXNhbGxvd011bHRpcGxlXG5AbWVudSgnU3BsaW5lcy9TcGxpbmVDb250YWluZXInKVxuZXhwb3J0IGNsYXNzIFNwbGluZUNvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRhaW5lckxpa2Uge1xuICAgIHN0YXRpYyByZWFkb25seSBFdmVudFR5cGUgPSB7XG4gICAgICAgIC8qKiAoY29udGFpbmVyOiBTcGxpbmVDb250YWluZXIpICovXG4gICAgICAgIENIQU5HRUQ6ICdzcGxpbmUtY2hhbmdlZCcsXG4gICAgfTtcblxuICAgIC8qKiBFbmFibGVkIGNvbnRhaW5lcnMgKHVzZWQgYnkgdGhlIGVkaXRvciB0b29scykuICovXG4gICAgc3RhdGljIHJlYWRvbmx5IGFsbCA9IG5ldyBTZXQ8U3BsaW5lQ29udGFpbmVyPigpO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW1NwbGluZV0sIHRvb2x0aXA6ICdUaGUgc3BsaW5lcyBpbiB0aGlzIGNvbnRhaW5lci4nIH0pXG4gICAgc3BsaW5lczogU3BsaW5lW10gPSBbbmV3IFNwbGluZSgpXTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtLbm90TGlua10sIHZpc2libGU6IGZhbHNlIH0pXG4gICAgbGlua3M6IEtub3RMaW5rW10gPSBbXTtcblxuICAgIHByaXZhdGUgX3N0YW1wID0gTmFOO1xuXG4gICAgLyoqIFRoZSBmaXJzdCBzcGxpbmUgKGNyZWF0ZWQgaWYgdGhlcmUgaXMgbm9uZSkuICovXG4gICAgZ2V0IHNwbGluZSgpOiBTcGxpbmUge1xuICAgICAgICBpZiAoIXRoaXMuc3BsaW5lcy5sZW5ndGgpIHRoaXMuc3BsaW5lcy5wdXNoKG5ldyBTcGxpbmUoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNwbGluZXNbMF07XG4gICAgfVxuXG4gICAgc2V0IHNwbGluZSh2YWx1ZTogU3BsaW5lKSB7XG4gICAgICAgIGlmICh0aGlzLnNwbGluZXMubGVuZ3RoKSB0aGlzLnNwbGluZXNbMF0gPSB2YWx1ZTtcbiAgICAgICAgZWxzZSB0aGlzLnNwbGluZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBTcGxpbmVDb250YWluZXIuYWxsLmFkZCh0aGlzKTtcbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIFNwbGluZUNvbnRhaW5lci5hbGwuZGVsZXRlKHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgU3BsaW5lQ29udGFpbmVyLmFsbC5kZWxldGUodGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIUVESVRPUiAmJiAhdGhpcy5ub2RlLmhhc0V2ZW50TGlzdGVuZXIoU3BsaW5lQ29udGFpbmVyLkV2ZW50VHlwZS5DSEFOR0VEKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNoZWNrQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgdmFsdWUgdGhhdCBjaGFuZ2VzIHdoZW5ldmVyIGFueSBzcGxpbmUgaW4gdGhlIGNvbnRhaW5lciBjaGFuZ2VzLlxuICAgICAqIENoZWNrZWQgYXQgbW9zdCBvbmNlIHBlciBmcmFtZSBwZXIgc3BsaW5lLlxuICAgICAqL1xuICAgIGdldCBjaGFuZ2VTdGFtcCgpOiBudW1iZXIge1xuICAgICAgICBsZXQgaCA9IDIxNjYxMzYyNjEgfCAwO1xuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgdGhpcy5zcGxpbmVzKSBoID0gTWF0aC5pbXVsKGggXiBzLmNhY2hlLnN0YW1wLCAxNjc3NzYxOSk7XG4gICAgICAgIHJldHVybiBNYXRoLmltdWwoaCBeIHRoaXMuc3BsaW5lcy5sZW5ndGgsIDE2Nzc3NjE5KTtcbiAgICB9XG5cbiAgICAvKiogRW1pdHMgQ0hBTkdFRCBpZiBhIHNwbGluZSBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGNoZWNrLiBSZXR1cm5zIHdoZXRoZXIgaXQgZGlkLiAqL1xuICAgIGNoZWNrQ2hhbmdlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKEVESVRPUikgdGhpcy5yZXBhaXJBZnRlckV4dGVybmFsRWRpdCgpO1xuICAgICAgICBjb25zdCBzdGFtcCA9IHRoaXMuY2hhbmdlU3RhbXA7XG4gICAgICAgIGlmIChzdGFtcCA9PT0gdGhpcy5fc3RhbXApIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3RhbXAgPSBzdGFtcDtcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoU3BsaW5lQ29udGFpbmVyLkV2ZW50VHlwZS5DSEFOR0VELCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqIE1hcmtzIGV2ZXJ5IHNwbGluZSBkaXJ0eSBhbmQgZW1pdHMgQ0hBTkdFRC4gKi9cbiAgICBub3RpZnlDaGFuZ2VkKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgdGhpcy5zcGxpbmVzKSBzLm1hcmtEaXJ0eSgpO1xuICAgICAgICB0aGlzLmNoZWNrQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlZW4gPSBuZXcgV2Vha01hcDxTcGxpbmUsIG51bWJlcj4oKTtcblxuICAgIC8qKlxuICAgICAqIEluc3BlY3RvciBlZGl0cyBhbmQgdW5kbyBjaGFuZ2Uga25vdHMgYmVoaW5kIHRoZSBTcGxpbmUgQVBJOyByZS1hcHBseSB0aGVcbiAgICAgKiB0YW5nZW50IG1vZGVzIHNvIEF1dG9TbW9vdGggdGFuZ2VudHMgZm9sbG93IG1vdmVkIGtub3RzLlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVwYWlyQWZ0ZXJFeHRlcm5hbEVkaXQoKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNwbGluZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IGZpbmdlcnByaW50KHMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NlZW4uZ2V0KHMpID09PSBiZWZvcmUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmVmcmVzaEFsbChzKTtcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyID0gZmluZ2VycHJpbnQocyk7XG4gICAgICAgICAgICBpZiAoYWZ0ZXIgIT09IGJlZm9yZSkgcy5tYXJrRGlydHkoKTtcbiAgICAgICAgICAgIHRoaXMuX3NlZW4uc2V0KHMsIGFmdGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBzcGxpbmVzXG5cbiAgICBhZGRTcGxpbmUoc3BsaW5lOiBTcGxpbmUgPSBuZXcgU3BsaW5lKCkpOiBTcGxpbmUge1xuICAgICAgICB0aGlzLnNwbGluZXMucHVzaChzcGxpbmUpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICAgICAgcmV0dXJuIHNwbGluZTtcbiAgICB9XG5cbiAgICByZW1vdmVTcGxpbmVBdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lclJlbW92ZVNwbGluZSh0aGlzLCBpbmRleCk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgIH1cblxuICAgIC8qKiBDb250YWluZXItbGV2ZWwgZWRpdHMgdGhhdCBrZWVwIGtub3QgbGlua3MgdmFsaWQuICovXG4gICAgaW5zZXJ0S25vdChzcGxpbmVJbmRleDogbnVtYmVyLCBrbm90SW5kZXg6IG51bWJlciwga25vdDogQmV6aWVyS25vdCk6IHZvaWQge1xuICAgICAgICBjb250YWluZXJJbnNlcnRLbm90KHRoaXMsIHNwbGluZUluZGV4LCBrbm90SW5kZXgsIGtub3QpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICByZW1vdmVLbm90cyhyZWZzOiBLbm90UmVmW10pOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyUmVtb3ZlS25vdHModGhpcywgcmVmcyk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgIH1cblxuICAgIHJldmVyc2VGbG93KHNwbGluZUluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyUmV2ZXJzZSh0aGlzLCBzcGxpbmVJbmRleCk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgIH1cblxuICAgIC8qKiBNb3ZlcyBhIGtub3QgYW5kIGV2ZXJ5IGtub3QgbGlua2VkIHRvIGl0LiAqL1xuICAgIHNldEtub3RQb3NpdGlvbihyZWY6IEtub3RSZWYsIGxvY2FsUG9zaXRpb246IFJlYWRvbmx5PFZlYzM+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BsaW5lc1tyZWYuc3BsaW5lXS5zZXRLbm90UG9zaXRpb24ocmVmLmtub3QsIGxvY2FsUG9zaXRpb24pO1xuICAgICAgICBzeW5jTGlua2VkKHRoaXMsIHJlZik7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgIH1cblxuICAgIGxpbmtLbm90cyhyZWZzOiBLbm90UmVmW10pOiB2b2lkIHtcbiAgICAgICAgbGlua0tub3RzKHRoaXMsIHJlZnMsIHNwbGluZUZhY3RvcnkpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICB1bmxpbmtLbm90cyhyZWZzOiBLbm90UmVmW10pOiB2b2lkIHtcbiAgICAgICAgdW5saW5rS25vdHModGhpcywgcmVmcyk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgIH1cblxuICAgIGdldExpbmtlZEtub3RzKHJlZjogS25vdFJlZik6IEtub3RSZWZbXSB7XG4gICAgICAgIHJldHVybiBsaW5rZWRLbm90cyh0aGlzLCByZWYpO1xuICAgIH1cblxuICAgIGlzS25vdExpbmtlZChyZWY6IEtub3RSZWYpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzTGlua2VkKHRoaXMsIHJlZik7XG4gICAgfVxuXG4gICAgLyoqIFVuaXR5J3MgU3BsaXQgS25vdC4gUmV0dXJucyB0aGUgbmV3IGNvcHkgb2YgdGhlIGtub3QsIG9yIG51bGwuICovXG4gICAgc3BsaXRLbm90KHJlZjogS25vdFJlZik6IEtub3RSZWYgfCBudWxsIHtcbiAgICAgICAgY29uc3QgciA9IHNwbGl0S25vdCh0aGlzLCByZWYsIHNwbGluZUZhY3RvcnkpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG4gICAgLyoqIFVuaXR5J3MgSm9pbiBLbm90cyAodHdvIGVuZCBrbm90cykuIFJldHVybnMgdGhlIGpvaW5lZCBrbm90LCBvciBudWxsLiAqL1xuICAgIGpvaW5Lbm90cyhhOiBLbm90UmVmLCBiOiBLbm90UmVmKTogS25vdFJlZiB8IG51bGwge1xuICAgICAgICBjb25zdCByID0gam9pbktub3RzKHRoaXMsIGEsIGIsIHNwbGluZUZhY3RvcnkpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGV2YWx1YXRpb25cblxuICAgIHByaXZhdGUgZ2V0U3BsaW5lKGluZGV4OiBudW1iZXIpOiBTcGxpbmUgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BsaW5lc1tpbmRleF0gPz8gbnVsbDtcbiAgICB9XG5cbiAgICAvKiogV29ybGQtc3BhY2UgcG9zaXRpb24gYXQgdCBvbiBhIHNwbGluZS4gKi9cbiAgICBldmFsdWF0ZVBvc2l0aW9uKHQ6IG51bWJlciwgc3BsaW5lSW5kZXggPSAwLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFNwbGluZShzcGxpbmVJbmRleCk7XG4gICAgICAgIGlmICghcykgcmV0dXJuIG91dC5zZXQodGhpcy5ub2RlLndvcmxkUG9zaXRpb24pO1xuICAgICAgICBzLmV2YWx1YXRlUG9zaXRpb24odCwgb3V0KTtcbiAgICAgICAgcmV0dXJuIFZlYzMudHJhbnNmb3JtTWF0NChvdXQsIG91dCwgdGhpcy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICB9XG5cbiAgICAvKiogV29ybGQtc3BhY2UgZGVyaXZhdGl2ZSBhdCB0IChkaXJlY3Rpb24gdGltZXMgc3BlZWQsIGxpa2UgVW5pdHkncyBFdmFsdWF0ZVRhbmdlbnQpLiAqL1xuICAgIGV2YWx1YXRlVGFuZ2VudCh0OiBudW1iZXIsIHNwbGluZUluZGV4ID0gMCwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiBvdXQuc2V0KDAsIDAsIDApO1xuICAgICAgICBzLmV2YWx1YXRlVGFuZ2VudCh0LCBvdXQpO1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1NYXQ0Tm9ybWFsKG91dCwgb3V0LCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgIH1cblxuICAgIC8qKiBXb3JsZC1zcGFjZSB1bml0IGRpcmVjdGlvbiBvZiB0cmF2ZWwgYXQgdC4gKi9cbiAgICBldmFsdWF0ZURpcmVjdGlvbih0OiBudW1iZXIsIHNwbGluZUluZGV4ID0gMCwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiBvdXQuc2V0KDAsIDAsIDEpO1xuICAgICAgICBzLmV2YWx1YXRlRGlyZWN0aW9uKHQsIG91dCk7XG4gICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NE5vcm1hbChvdXQsIG91dCwgdGhpcy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICAgICAgcmV0dXJuIG91dC5ub3JtYWxpemUoKTtcbiAgICB9XG5cbiAgICAvKiogV29ybGQtc3BhY2UgdW5pdCB1cCB2ZWN0b3IgYXQgdC4gKi9cbiAgICBldmFsdWF0ZVVwVmVjdG9yKHQ6IG51bWJlciwgc3BsaW5lSW5kZXggPSAwLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFNwbGluZShzcGxpbmVJbmRleCk7XG4gICAgICAgIGlmICghcykgcmV0dXJuIG91dC5zZXQoMCwgMSwgMCk7XG4gICAgICAgIHMuZXZhbHVhdGVVcFZlY3Rvcih0LCBvdXQpO1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDROb3JtYWwob3V0LCBvdXQsIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgIHJldHVybiBvdXQubm9ybWFsaXplKCk7XG4gICAgfVxuXG4gICAgLyoqIFBvc2l0aW9uLCBkaXJlY3Rpb24gYW5kIHVwIGF0IHQgKHdvcmxkIHNwYWNlKS4gUmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBubyBzdWNoIHNwbGluZS4gKi9cbiAgICBldmFsdWF0ZSh0OiBudW1iZXIsIHNwbGluZUluZGV4ID0gMCwgb3V0PzogU3BsaW5lU2FtcGxlKTogU3BsaW5lU2FtcGxlIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFNwbGluZShzcGxpbmVJbmRleCk7XG4gICAgICAgIGlmICghcykgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHJlcyA9IG91dCA/PyB7IHBvc2l0aW9uOiBuZXcgVmVjMygpLCB0YW5nZW50OiBuZXcgVmVjMygpLCB1cDogbmV3IFZlYzMoKSB9O1xuICAgICAgICB0aGlzLmV2YWx1YXRlUG9zaXRpb24odCwgc3BsaW5lSW5kZXgsIHJlcy5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuZXZhbHVhdGVEaXJlY3Rpb24odCwgc3BsaW5lSW5kZXgsIHJlcy50YW5nZW50KTtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZVVwVmVjdG9yKHQsIHNwbGluZUluZGV4LCByZXMudXApO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8qKiBSb3RhdGlvbiB0aGF0IGZhY2VzIGFsb25nIHRoZSBzcGxpbmUgYXQgdCAoK1ogZm9yd2FyZCwgK1kgdXApLCB3b3JsZCBzcGFjZS4gKi9cbiAgICBldmFsdWF0ZVJvdGF0aW9uKHQ6IG51bWJlciwgc3BsaW5lSW5kZXggPSAwLCBvdXQgPSBuZXcgUXVhdCgpKTogUXVhdCB7XG4gICAgICAgIGNvbnN0IGYgPSB0aGlzLmV2YWx1YXRlRGlyZWN0aW9uKHQsIHNwbGluZUluZGV4LCBuZXcgVmVjMygpKTtcbiAgICAgICAgY29uc3QgdSA9IHRoaXMuZXZhbHVhdGVVcFZlY3Rvcih0LCBzcGxpbmVJbmRleCwgbmV3IFZlYzMoKSk7XG4gICAgICAgIC8vIFF1YXQuZnJvbVZpZXdVcCBtYXBzICtaIHRvIHRoZSB2aWV3IGRpcmVjdGlvbiwgbGlrZSB0aGUga25vdHMuXG4gICAgICAgIFF1YXQuZnJvbVZpZXdVcChvdXQsIGYsIHUpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKiBXb3JsZC1zcGFjZSBsZW5ndGggb2YgYSBzcGxpbmUuICovXG4gICAgY2FsY3VsYXRlTGVuZ3RoKHNwbGluZUluZGV4ID0gMCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFNwbGluZShzcGxpbmVJbmRleCk7XG4gICAgICAgIGlmICghcykgcmV0dXJuIDA7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLm5vZGUud29ybGRNYXRyaXg7XG4gICAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gcy5jdXJ2ZUNvdW50O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIC8vIEJlemllciBjdXJ2ZXMgYXJlIGFmZmluZSBpbnZhcmlhbnQ6IHRyYW5zZm9ybSB0aGUgY29udHJvbCBwb2ludHMuXG4gICAgICAgICAgICBzLmdldEN1cnZlKGksIF9jKTtcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChfYy5wMCBhcyBWZWMzLCBfYy5wMCwgbSk7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX2MucDEgYXMgVmVjMywgX2MucDEsIG0pO1xuICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KF9jLnAyIGFzIFZlYzMsIF9jLnAyLCBtKTtcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChfYy5wMyBhcyBWZWMzLCBfYy5wMywgbSk7XG4gICAgICAgICAgICB0b3RhbCArPSBhcmNMZW5ndGgoX2MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9XG5cbiAgICAvKiogQ2xvc2VzdCBwb2ludCBvbiBhIHNwbGluZSB0byBhIHdvcmxkIHBvc2l0aW9uLiAqL1xuICAgIGdldE5lYXJlc3RQb2ludCh3b3JsZFBvaW50OiBSZWFkb25seTxWZWMzPiwgc3BsaW5lSW5kZXggPSAwKTogeyB0OiBudW1iZXI7IHBvc2l0aW9uOiBWZWMzOyBkaXN0YW5jZTogbnVtYmVyIH0gfCBudWxsIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgaWYgKCFzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgTWF0NC5pbnZlcnQoX20sIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChfdiwgd29ybGRQb2ludCwgX20pO1xuICAgICAgICBjb25zdCByID0gbmVhcmVzdFBvaW50KHMsIHMuY2FjaGUsIF92KTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBuZXcgVmVjMyhyLnBvc2l0aW9uLngsIHIucG9zaXRpb24ueSwgci5wb3NpdGlvbi56KTtcbiAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KHBvc2l0aW9uLCBwb3NpdGlvbiwgdGhpcy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICAgICAgcmV0dXJuIHsgdDogci50LCBwb3NpdGlvbiwgZGlzdGFuY2U6IFZlYzMuZGlzdGFuY2UocG9zaXRpb24sIHdvcmxkUG9pbnQpIH07XG4gICAgfVxuXG4gICAgLyoqIENsb3Nlc3QgcG9pbnQgb3ZlciBhbGwgc3BsaW5lcy4gKi9cbiAgICBnZXROZWFyZXN0UG9pbnRBbGwod29ybGRQb2ludDogUmVhZG9ubHk8VmVjMz4pOiB7IHNwbGluZTogbnVtYmVyOyB0OiBudW1iZXI7IHBvc2l0aW9uOiBWZWMzOyBkaXN0YW5jZTogbnVtYmVyIH0gfCBudWxsIHtcbiAgICAgICAgbGV0IGJlc3Q6IHsgc3BsaW5lOiBudW1iZXI7IHQ6IG51bWJlcjsgcG9zaXRpb246IFZlYzM7IGRpc3RhbmNlOiBudW1iZXIgfSB8IG51bGwgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3BsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgciA9IHRoaXMuZ2V0TmVhcmVzdFBvaW50KHdvcmxkUG9pbnQsIGkpO1xuICAgICAgICAgICAgaWYgKHIgJiYgKCFiZXN0IHx8IHIuZGlzdGFuY2UgPCBiZXN0LmRpc3RhbmNlKSkgYmVzdCA9IHsgc3BsaW5lOiBpLCAuLi5yIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJlc3Q7XG4gICAgfVxuXG4gICAgLyoqIENvbnZlcnRzIGJldHdlZW4gbm9ybWFsaXplZCB0LCBsb2NhbCBkaXN0YW5jZSBhbmQga25vdCBpbmRleCB1bml0cyBvbiBhIHNwbGluZS4gKi9cbiAgICBjb252ZXJ0SW5kZXhVbml0KHZhbHVlOiBudW1iZXIsIGZyb206IFBhdGhJbmRleFVuaXQsIHRvOiBQYXRoSW5kZXhVbml0LCBzcGxpbmVJbmRleCA9IDApOiBudW1iZXIge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICByZXR1cm4gcyA/IHMuY29udmVydEluZGV4VW5pdCh2YWx1ZSwgZnJvbSwgdG8pIDogMDtcbiAgICB9XG5cbiAgICAvKiogS25vdCBwb3NpdGlvbiBpbiB3b3JsZCBzcGFjZS4gKi9cbiAgICBnZXRLbm90V29ybGRQb3NpdGlvbihyZWY6IEtub3RSZWYsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgY29uc3QgayA9IHRoaXMuc3BsaW5lc1tyZWYuc3BsaW5lXT8ua25vdHNbcmVmLmtub3RdO1xuICAgICAgICBpZiAoIWspIHJldHVybiBvdXQuc2V0KHRoaXMubm9kZS53b3JsZFBvc2l0aW9uKTtcbiAgICAgICAgcmV0dXJuIFZlYzMudHJhbnNmb3JtTWF0NChvdXQsIGsucG9zaXRpb24sIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgfVxuXG4gICAgLyoqIFNldHMgZXZlcnkga25vdCBvZiBldmVyeSBzcGxpbmUgdG8gYSB0YW5nZW50IG1vZGUuICovXG4gICAgc2V0VGFuZ2VudE1vZGVBbGwobW9kZTogVGFuZ2VudE1vZGUpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc3BsaW5lcykgcy5zZXRUYW5nZW50TW9kZUFsbChtb2RlKTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBQYXRoSW5kZXhVbml0IH07XG4iLCAiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBjY2VudW0sIEV2ZW50SGFuZGxlciwgUXVhdCwgVmVjMyB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUiB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcGxpbmVDb250YWluZXIgfSBmcm9tICcuL1NwbGluZUNvbnRhaW5lcic7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IF9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIFNwbGluZUFuaW1hdGVNZXRob2Qge1xuICAgIC8qKiBUcmF2ZWwgdGhlIHNwbGluZSBpbiBgZHVyYXRpb25gIHNlY29uZHMuICovXG4gICAgVGltZSA9IDAsXG4gICAgLyoqIFRyYXZlbCBhdCBgbWF4U3BlZWRgIHVuaXRzIHBlciBzZWNvbmQuICovXG4gICAgU3BlZWQgPSAxLFxufVxuXG5leHBvcnQgZW51bSBTcGxpbmVBbmltYXRlTG9vcE1vZGUge1xuICAgIC8qKiBQbGF5IG9uY2UgYW5kIHN0b3AgYXQgdGhlIGVuZC4gKi9cbiAgICBPbmNlID0gMCxcbiAgICAvKiogUmVzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmcgYXQgdGhlIGVuZC4gKi9cbiAgICBMb29wID0gMSxcbiAgICAvKiogRWFzZSBpbiBvbiB0aGUgZmlyc3QgbG9vcCBvbmx5LCB0aGVuIGxvb3AgYXQgY29uc3RhbnQgc3BlZWQuICovXG4gICAgTG9vcEVhc2VJbk9uY2UgPSAyLFxuICAgIC8qKiBHbyBiYWNrIGFuZCBmb3J0aC4gKi9cbiAgICBQaW5nUG9uZyA9IDMsXG59XG5cbmV4cG9ydCBlbnVtIFNwbGluZUFuaW1hdGVFYXNpbmcge1xuICAgIE5vbmUgPSAwLFxuICAgIEVhc2VJbiA9IDEsXG4gICAgRWFzZU91dCA9IDIsXG4gICAgRWFzZUluT3V0ID0gMyxcbn1cblxuZXhwb3J0IGVudW0gU3BsaW5lQW5pbWF0ZUFsaWdubWVudCB7XG4gICAgLyoqIEtlZXAgdGhlIG9iamVjdCdzIHJvdGF0aW9uLiAqL1xuICAgIE5vbmUgPSAwLFxuICAgIC8qKiBGYWNlIGFsb25nIHRoZSBzcGxpbmUsIHVzaW5nIHRoZSBzcGxpbmUncyB1cCB2ZWN0b3IuICovXG4gICAgU3BsaW5lRWxlbWVudCA9IDEsXG4gICAgLyoqIE1hdGNoIHRoZSBzcGxpbmUgY29udGFpbmVyJ3Mgcm90YXRpb24uICovXG4gICAgU3BsaW5lT2JqZWN0ID0gMixcbiAgICAvKiogTWF0Y2ggdGhlIHdvcmxkIGF4ZXMuICovXG4gICAgV29ybGQgPSAzLFxufVxuXG5leHBvcnQgZW51bSBBbGlnbkF4aXMge1xuICAgIFhBeGlzID0gMCxcbiAgICBZQXhpcyA9IDEsXG4gICAgWkF4aXMgPSAyLFxuICAgIE5lZ2F0aXZlWEF4aXMgPSAzLFxuICAgIE5lZ2F0aXZlWUF4aXMgPSA0LFxuICAgIE5lZ2F0aXZlWkF4aXMgPSA1LFxufVxuXG5jY2VudW0oU3BsaW5lQW5pbWF0ZU1ldGhvZCk7XG5jY2VudW0oU3BsaW5lQW5pbWF0ZUxvb3BNb2RlKTtcbmNjZW51bShTcGxpbmVBbmltYXRlRWFzaW5nKTtcbmNjZW51bShTcGxpbmVBbmltYXRlQWxpZ25tZW50KTtcbmNjZW51bShBbGlnbkF4aXMpO1xuXG5jb25zdCBBWEVTID0gW1xuICAgIG5ldyBWZWMzKDEsIDAsIDApLCBuZXcgVmVjMygwLCAxLCAwKSwgbmV3IFZlYzMoMCwgMCwgMSksXG4gICAgbmV3IFZlYzMoLTEsIDAsIDApLCBuZXcgVmVjMygwLCAtMSwgMCksIG5ldyBWZWMzKDAsIDAsIC0xKSxcbl07XG5cbmNvbnN0IF9wb3MgPSBuZXcgVmVjMygpO1xuY29uc3QgX2Z3ZCA9IG5ldyBWZWMzKCk7XG5jb25zdCBfdXAgPSBuZXcgVmVjMygpO1xuY29uc3QgX3JvdCA9IG5ldyBRdWF0KCk7XG5jb25zdCBfcmVtYXAgPSBuZXcgUXVhdCgpO1xuXG5mdW5jdGlvbiBlYXNlSW4odDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHQgKiB0O1xufVxuZnVuY3Rpb24gZWFzZU91dCh0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdCAqICgyIC0gdCk7XG59XG5mdW5jdGlvbiBlYXNlSW5PdXQodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHQgPCAwLjUgPyAyICogdCAqIHQgOiAtMSArICg0IC0gMiAqIHQpICogdDtcbn1cbmZ1bmN0aW9uIHBpbmdQb25nKHQ6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpIHtcbiAgICBjb25zdCBsMiA9IGxlbmd0aCAqIDI7XG4gICAgY29uc3QgbSA9ICgodCAlIGwyKSArIGwyKSAlIGwyO1xuICAgIHJldHVybiBsZW5ndGggLSBNYXRoLmFicyhtIC0gbGVuZ3RoKTtcbn1cblxuY29uc3QgX2xmID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9sdSA9IG5ldyBWZWMzKCk7XG5cbi8qKiBMb29rIHJvdGF0aW9uIHdpdGggK1ogPSBmb3J3YXJkIGFuZCArWSA9IHVwIChsaWtlIFVuaXR5J3MgUXVhdGVybmlvbi5Mb29rUm90YXRpb24pLiAqL1xuZnVuY3Rpb24gbG9va1JvdGF0aW9uKG91dDogUXVhdCwgZm9yd2FyZDogUmVhZG9ubHk8VmVjMz4sIHVwOiBSZWFkb25seTxWZWMzPik6IFF1YXQge1xuICAgIHJldHVybiBRdWF0LmZyb21WaWV3VXAob3V0LCBWZWMzLm5vcm1hbGl6ZShfbGYsIGZvcndhcmQpLCBWZWMzLm5vcm1hbGl6ZShfbHUsIHVwKSk7XG59XG5cbi8qKlxuICogTW92ZXMgaXRzIG5vZGUgYWxvbmcgYSBzcGxpbmUgKFVuaXR5J3MgU3BsaW5lQW5pbWF0ZSkuXG4gKlxuICogTm9kZSBldmVudHM6ICdzcGxpbmUtYW5pbWF0ZS11cGRhdGVkJyAocG9zaXRpb24sIHJvdGF0aW9uKSBldmVyeSB1cGRhdGVcbiAqIGFuZCAnc3BsaW5lLWFuaW1hdGUtY29tcGxldGVkJyB3aGVuIGEgcnVuIGVuZHMgb3IgYSBsb29wIHdyYXBzLlxuICovXG5AY2NjbGFzcygnU3BsaW5lQW5pbWF0ZScpXG5AbWVudSgnU3BsaW5lcy9TcGxpbmVBbmltYXRlJylcbmV4cG9ydCBjbGFzcyBTcGxpbmVBbmltYXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRXZlbnRUeXBlID0ge1xuICAgICAgICBVUERBVEVEOiAnc3BsaW5lLWFuaW1hdGUtdXBkYXRlZCcsXG4gICAgICAgIENPTVBMRVRFRDogJ3NwbGluZS1hbmltYXRlLWNvbXBsZXRlZCcsXG4gICAgfTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUNvbnRhaW5lciwgdG9vbHRpcDogJ1RoZSBzcGxpbmUgY29udGFpbmVyIHRvIGZvbGxvdy4nIH0pXG4gICAgY29udGFpbmVyOiBTcGxpbmVDb250YWluZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdXaGljaCBzcGxpbmUgb2YgdGhlIGNvbnRhaW5lciB0byBmb2xsb3cuJywgbWluOiAwLCBzdGVwOiAxIH0pXG4gICAgc3BsaW5lSW5kZXggPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1N0YXJ0IHBsYXlpbmcgd2hlbiB0aGUgY29tcG9uZW50IHN0YXJ0cy4nIH0pXG4gICAgcGxheU9uQXdha2UgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU3BsaW5lQW5pbWF0ZU1ldGhvZCwgdG9vbHRpcDogJ1RpbWU6IHRyYXZlbCB0aGUgc3BsaW5lIGluIGEgc2V0IGR1cmF0aW9uLiBTcGVlZDogdHJhdmVsIGF0IGEgc2V0IHNwZWVkLicgfSlcbiAgICBnZXQgbWV0aG9kKCk6IFNwbGluZUFuaW1hdGVNZXRob2Qge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kO1xuICAgIH1cbiAgICBzZXQgbWV0aG9kKHY6IFNwbGluZUFuaW1hdGVNZXRob2QpIHtcbiAgICAgICAgdGhpcy5fbWV0aG9kID0gdjtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnU2Vjb25kcyB0byB0cmF2ZWwgdGhlIHNwbGluZSBvbmNlLicsIG1pbjogMCwgdmlzaWJsZSh0aGlzOiBTcGxpbmVBbmltYXRlKSB7IHJldHVybiB0aGlzLl9tZXRob2QgPT09IFNwbGluZUFuaW1hdGVNZXRob2QuVGltZTsgfSB9KVxuICAgIGdldCBkdXJhdGlvbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHVyYXRpb247XG4gICAgfVxuICAgIHNldCBkdXJhdGlvbih2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSBNYXRoLm1heCgwLCB2KTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnU3BlZWQgaW4gdW5pdHMgcGVyIHNlY29uZC4nLCBtaW46IDAsIHZpc2libGUodGhpczogU3BsaW5lQW5pbWF0ZSkgeyByZXR1cm4gdGhpcy5fbWV0aG9kID09PSBTcGxpbmVBbmltYXRlTWV0aG9kLlNwZWVkOyB9IH0pXG4gICAgZ2V0IG1heFNwZWVkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhTcGVlZDtcbiAgICB9XG4gICAgc2V0IG1heFNwZWVkKHY6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tYXhTcGVlZCA9IE1hdGgubWF4KDAsIHYpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUFuaW1hdGVFYXNpbmcsIHRvb2x0aXA6ICdTcGVlZCBjdXJ2ZSBvZiBlYWNoIHJ1bi4nIH0pXG4gICAgZWFzaW5nID0gU3BsaW5lQW5pbWF0ZUVhc2luZy5Ob25lO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLCB0b29sdGlwOiAnV2hhdCBoYXBwZW5zIGF0IHRoZSBlbmQgb2YgdGhlIHNwbGluZS4nIH0pXG4gICAgbG9vcE1vZGUgPSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuTG9vcDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUFuaW1hdGVBbGlnbm1lbnQsIHRvb2x0aXA6ICdIb3cgdGhlIG9iamVjdCByb3RhdGVzIHdoaWxlIGl0IG1vdmVzLicgfSlcbiAgICBhbGlnbm1lbnQgPSBTcGxpbmVBbmltYXRlQWxpZ25tZW50LlNwbGluZUVsZW1lbnQ7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBBbGlnbkF4aXMsIHRvb2x0aXA6ICdUaGUgb2JqZWN0IGF4aXMgdGhhdCBwb2ludHMgYWxvbmcgdGhlIHNwbGluZSAoWiBmb3IgM0QgbW9kZWxzLCBYIGZvciAyRCBzcHJpdGVzKS4nIH0pXG4gICAgb2JqZWN0Rm9yd2FyZEF4aXMgPSBBbGlnbkF4aXMuWkF4aXM7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBBbGlnbkF4aXMsIHRvb2x0aXA6ICdUaGUgb2JqZWN0IGF4aXMgdGhhdCBwb2ludHMgYWxvbmcgdGhlIHNwbGluZVx1MjAxOXMgdXAgdmVjdG9yLicgfSlcbiAgICBvYmplY3RVcEF4aXMgPSBBbGlnbkF4aXMuWUF4aXM7XG5cbiAgICBAcHJvcGVydHkoeyByYW5nZTogWzAsIDEsIDAuMDFdLCBzbGlkZTogdHJ1ZSwgdG9vbHRpcDogJ1doZXJlIG9uIHRoZSBzcGxpbmUgdG8gc3RhcnQgKDAuLjEgb2YgaXRzIGxlbmd0aCkuJyB9KVxuICAgIHN0YXJ0T2Zmc2V0ID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtFdmVudEhhbmRsZXJdLCB0b29sdGlwOiAnQ2FsbGVkIHdoZW4gYSBydW4gZW5kcyBvciBhIGxvb3Agd3JhcHMuJyB9KVxuICAgIGNvbXBsZXRlZEV2ZW50czogRXZlbnRIYW5kbGVyW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX21ldGhvZCA9IFNwbGluZUFuaW1hdGVNZXRob2QuVGltZTtcbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9kdXJhdGlvbiA9IDE7XG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfbWF4U3BlZWQgPSAxMDtcblxuICAgIHByaXZhdGUgX2VsYXBzZWQgPSAwO1xuICAgIHByaXZhdGUgX2xhc3RFbGFwc2VkID0gMDtcbiAgICBwcml2YXRlIF9wbGF5aW5nID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbm9ybWFsaXplZFRpbWUgPSAwO1xuICAgIHByaXZhdGUgX2VuZFJlYWNoZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9wcmV2aWV3T3JpZ2luOiB7IHBvc2l0aW9uOiBWZWMzOyByb3RhdGlvbjogUXVhdCB9IHwgbnVsbCA9IG51bGw7XG5cbiAgICBnZXQgaXNQbGF5aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxheWluZztcbiAgICB9XG5cbiAgICAvKiogU2Vjb25kcyBzaW5jZSB0aGUgc3RhcnQgKGluY2x1ZGluZyBsb29wcykuICovXG4gICAgZ2V0IGVsYXBzZWRUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGFwc2VkO1xuICAgIH1cblxuICAgIHNldCBlbGFwc2VkVGltZSh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZWxhcHNlZCA9IE1hdGgubWF4KDAsIHYpO1xuICAgICAgICB0aGlzLmV2YWx1YXRlVGltZSgpO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgLyoqIFByb2dyZXNzIGFsb25nIHRoZSBzcGxpbmU7IHRoZSBpbnRlZ2VyIHBhcnQgY291bnRzIGNvbXBsZXRlZCBsb29wcy4gKi9cbiAgICBnZXQgbm9ybWFsaXplZFRpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRUaW1lO1xuICAgIH1cblxuICAgIHNldCBub3JtYWxpemVkVGltZSh2OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZCA9IHRoaXMuY3VycmVudER1cmF0aW9uKCk7XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSBNYXRoLm1heCgwLCB2KSAqIGQ7XG4gICAgICAgIHRoaXMuZXZhbHVhdGVUaW1lKCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheU9uQXdha2UpIHRoaXMucGxheSgpO1xuICAgICAgICBlbHNlIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xuICAgICAgICBpZiAoIXRoaXMuX3BsYXlpbmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5fZWxhcHNlZCArPSBkdDtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZVRpbWUoKTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHBsYXkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BsYXlpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHBhdXNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wbGF5aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIEJhY2sgdG8gdGhlIHN0YXJ0OyBrZWVwcyBwbGF5aW5nIGlmIGBhdXRvcGxheWAuICovXG4gICAgcmVzdGFydChhdXRvcGxheSA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuX2xhc3RFbGFwc2VkID0gMDtcbiAgICAgICAgdGhpcy5fbm9ybWFsaXplZFRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9lbmRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BsYXlpbmcgPSBhdXRvcGxheTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8qKiBMZW5ndGggb2YgdGhlIGZvbGxvd2VkIHNwbGluZSBpbiB3b3JsZCB1bml0cy4gKi9cbiAgICBnZXQgc3BsaW5lTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lciA/IHRoaXMuY29udGFpbmVyLmNhbGN1bGF0ZUxlbmd0aCh0aGlzLnNwbGluZUluZGV4KSA6IDA7XG4gICAgfVxuXG4gICAgLyoqIER1cmF0aW9uIG9mIG9uZSBydW4gKFNwZWVkIG1vZGUgY29udmVydHMgdGhlIHNwZWVkIGludG8gYSBkdXJhdGlvbikuICovXG4gICAgY3VycmVudER1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9tZXRob2QgPT09IFNwbGluZUFuaW1hdGVNZXRob2QuVGltZSkgcmV0dXJuIHRoaXMuX2R1cmF0aW9uO1xuICAgICAgICBpZiAodGhpcy5fbWF4U3BlZWQgPD0gMCkgcmV0dXJuIEluZmluaXR5O1xuICAgICAgICBjb25zdCBiYXNlID0gdGhpcy5zcGxpbmVMZW5ndGggLyB0aGlzLl9tYXhTcGVlZDtcbiAgICAgICAgLy8gRWFzZWQgcnVucyByZWFjaCB0d2ljZSB0aGUgYXZlcmFnZSBzcGVlZDsga2VlcCB0aGUgcGVhayBhdCBtYXhTcGVlZC5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWFzaW5nID09PSBTcGxpbmVBbmltYXRlRWFzaW5nLk5vbmUgPyBiYXNlIDogYmFzZSAqIDI7XG4gICAgfVxuXG4gICAgLyoqIFNwbGluZSB0ICgwLi4xKSBmb3IgdGhlIGN1cnJlbnQgdGltZSwgYWZ0ZXIgbG9vcGluZywgZWFzaW5nIGFuZCB0aGUgc3RhcnQgb2Zmc2V0LiAqL1xuICAgIGdldFNwbGluZVQoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHQgPSB0aGlzLl9ub3JtYWxpemVkVGltZSAlIDE7XG4gICAgICAgIGlmICh0aGlzLl9ub3JtYWxpemVkVGltZSA+PSAxICYmIHQgPT09IDAgJiYgdGhpcy5sb29wTW9kZSA9PT0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLk9uY2UpIHQgPSAxO1xuICAgICAgICB0ICs9IHRoaXMuc3RhcnRPZmZzZXQ7XG4gICAgICAgIHJldHVybiB0ID4gMSA/ICh0aGlzLmNvbnRhaW5lcj8uc3BsaW5lc1t0aGlzLnNwbGluZUluZGV4XT8uY2xvc2VkID8gdCAlIDEgOiBNYXRoLm1pbih0LCAxKSkgOiB0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZXZhbHVhdGVUaW1lKCk6IHZvaWQge1xuICAgICAgICBsZXQgZHVyYXRpb24gPSB0aGlzLmN1cnJlbnREdXJhdGlvbigpO1xuICAgICAgICBpZiAoIShkdXJhdGlvbiA+IDApIHx8ICFpc0Zpbml0ZShkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuX25vcm1hbGl6ZWRUaW1lID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBBIGxvb3Agd3JhcHBlZCAob3IgYSBwaW5nLXBvbmcgdHVybmVkKSBzaW5jZSB0aGUgbGFzdCBldmFsdWF0aW9uLlxuICAgICAgICBpZiAodGhpcy5sb29wTW9kZSAhPT0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLk9uY2UgJiYgdGhpcy5fZWxhcHNlZCA+IHRoaXMuX2xhc3RFbGFwc2VkXG4gICAgICAgICAgICAmJiBNYXRoLmZsb29yKHRoaXMuX2VsYXBzZWQgLyBkdXJhdGlvbikgPiBNYXRoLmZsb29yKHRoaXMuX2xhc3RFbGFwc2VkIC8gZHVyYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRSZWFjaGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXN0RWxhcHNlZCA9IHRoaXMuX2VsYXBzZWQ7XG4gICAgICAgIGxldCB0ID0gMDtcbiAgICAgICAgY29uc3QgZWFzZUZpcnN0ID0gdGhpcy5lYXNpbmcgPT09IFNwbGluZUFuaW1hdGVFYXNpbmcuRWFzZUluIHx8IHRoaXMuZWFzaW5nID09PSBTcGxpbmVBbmltYXRlRWFzaW5nLkVhc2VJbk91dDtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvb3BNb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVMb29wTW9kZS5PbmNlOlxuICAgICAgICAgICAgICAgIHQgPSBNYXRoLm1pbih0aGlzLl9lbGFwc2VkLCBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVMb29wTW9kZS5Mb29wOlxuICAgICAgICAgICAgICAgIHQgPSB0aGlzLl9lbGFwc2VkICUgZHVyYXRpb247XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVMb29wTW9kZS5Mb29wRWFzZUluT25jZTpcbiAgICAgICAgICAgICAgICAvLyBBZnRlciBhbiBlYXNlZC1pbiBmaXJzdCBydW4sIGNvbnN0YW50IHNwZWVkIHRha2VzIGhhbGYgYXMgbG9uZy5cbiAgICAgICAgICAgICAgICBpZiAoZWFzZUZpcnN0ICYmIHRoaXMuX2VsYXBzZWQgPj0gZHVyYXRpb24pIGR1cmF0aW9uICo9IDAuNTtcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5fZWxhcHNlZCAlIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuUGluZ1Bvbmc6XG4gICAgICAgICAgICAgICAgdCA9IHBpbmdQb25nKHRoaXMuX2VsYXBzZWQsIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0IC89IGR1cmF0aW9uO1xuICAgICAgICBpZiAodGhpcy5sb29wTW9kZSA9PT0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLkxvb3BFYXNlSW5PbmNlKSB7XG4gICAgICAgICAgICBpZiAoZWFzZUZpcnN0ICYmIHRoaXMuX2VsYXBzZWQgPCBkdXJhdGlvbikgdCA9IGVhc2VJbih0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5lYXNpbmcpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVFYXNpbmcuRWFzZUluOiB0ID0gZWFzZUluKHQpOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVFYXNpbmcuRWFzZU91dDogdCA9IGVhc2VPdXQodCk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU3BsaW5lQW5pbWF0ZUVhc2luZy5FYXNlSW5PdXQ6IHQgPSBlYXNlSW5PdXQodCk7IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvb3BzID0gTWF0aC5mbG9vcih0aGlzLl9lbGFwc2VkIC8gZHVyYXRpb24pO1xuICAgICAgICB0aGlzLl9ub3JtYWxpemVkVGltZSA9IHRoaXMubG9vcE1vZGUgPT09IFNwbGluZUFuaW1hdGVMb29wTW9kZS5PbmNlID8gTWF0aC5taW4oMSwgdCkgOiBsb29wcyArIHQ7XG4gICAgICAgIGlmICh0aGlzLmxvb3BNb2RlID09PSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuT25jZSAmJiB0aGlzLl9lbGFwc2VkID49IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxpemVkVGltZSA9IDE7XG4gICAgICAgICAgICBpZiAodGhpcy5fcGxheWluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmRSZWFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXb3JsZCBwb3NpdGlvbiBhbmQgcm90YXRpb24gZm9yIHRoZSBjdXJyZW50IHRpbWUuICovXG4gICAgZXZhbHVhdGVQb3NpdGlvbkFuZFJvdGF0aW9uKG91dFBvc2l0aW9uID0gbmV3IFZlYzMoKSwgb3V0Um90YXRpb24gPSBuZXcgUXVhdCgpKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKCFjIHx8ICFjLnNwbGluZXNbdGhpcy5zcGxpbmVJbmRleF0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgdCA9IHRoaXMuZ2V0U3BsaW5lVCgpO1xuICAgICAgICBjLmV2YWx1YXRlUG9zaXRpb24odCwgdGhpcy5zcGxpbmVJbmRleCwgb3V0UG9zaXRpb24pO1xuICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPT09IFNwbGluZUFuaW1hdGVBbGlnbm1lbnQuTm9uZSkge1xuICAgICAgICAgICAgb3V0Um90YXRpb24uc2V0KHRoaXMubm9kZS53b3JsZFJvdGF0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZ3ZEF4aXMgPSBBWEVTW3RoaXMub2JqZWN0Rm9yd2FyZEF4aXNdID8/IEFYRVNbMl07XG4gICAgICAgIGxldCB1cEF4aXMgPSBBWEVTW3RoaXMub2JqZWN0VXBBeGlzXSA/PyBBWEVTWzFdO1xuICAgICAgICBpZiAoTWF0aC5hYnMoVmVjMy5kb3QoZndkQXhpcywgdXBBeGlzKSkgPiAwLjk5KSB1cEF4aXMgPSBNYXRoLmFicyhmd2RBeGlzLnkpID4gMC45OSA/IEFYRVNbMl0gOiBBWEVTWzFdO1xuICAgICAgICBRdWF0LmludmVydChfcmVtYXAsIGxvb2tSb3RhdGlvbihfcmVtYXAsIGZ3ZEF4aXMsIHVwQXhpcykpO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVBbGlnbm1lbnQuU3BsaW5lRWxlbWVudDpcbiAgICAgICAgICAgICAgICBjLmV2YWx1YXRlRGlyZWN0aW9uKHQsIHRoaXMuc3BsaW5lSW5kZXgsIF9md2QpO1xuICAgICAgICAgICAgICAgIGMuZXZhbHVhdGVVcFZlY3Rvcih0LCB0aGlzLnNwbGluZUluZGV4LCBfdXApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlQWxpZ25tZW50LlNwbGluZU9iamVjdDpcbiAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX2Z3ZCwgVmVjMy5VTklUX1osIGMubm9kZS53b3JsZFJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX3VwLCBWZWMzLlVOSVRfWSwgYy5ub2RlLndvcmxkUm90YXRpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBfZndkLnNldCgwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICBfdXAuc2V0KDAsIDEsIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGxvb2tSb3RhdGlvbihvdXRSb3RhdGlvbiwgX2Z3ZCwgX3VwKTtcbiAgICAgICAgUXVhdC5tdWx0aXBseShvdXRSb3RhdGlvbiwgb3V0Um90YXRpb24sIF9yZW1hcCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlUcmFuc2Zvcm0oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5ldmFsdWF0ZVBvc2l0aW9uQW5kUm90YXRpb24oX3BvcywgX3JvdCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5ub2RlLnNldFdvcmxkUG9zaXRpb24oX3Bvcyk7XG4gICAgICAgIGlmICh0aGlzLmFsaWdubWVudCAhPT0gU3BsaW5lQW5pbWF0ZUFsaWdubWVudC5Ob25lKSB0aGlzLm5vZGUuc2V0V29ybGRSb3RhdGlvbihfcm90KTtcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoU3BsaW5lQW5pbWF0ZS5FdmVudFR5cGUuVVBEQVRFRCwgX3BvcywgX3JvdCk7XG4gICAgICAgIGlmICh0aGlzLl9lbmRSZWFjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZW1pdChTcGxpbmVBbmltYXRlLkV2ZW50VHlwZS5DT01QTEVURUQsIHRoaXMpO1xuICAgICAgICAgICAgRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5jb21wbGV0ZWRFdmVudHMsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZWRpdG9yIHByZXZpZXdcblxuICAgIC8qKiBFZGl0b3IgcHJldmlldzogc2hvd3MgdGhlIG9iamVjdCBhdCBgc2Vjb25kc2AgKHRoZSBvcmlnaW5hbCB0cmFuc2Zvcm0gaXMga2VwdCBmb3IgX3ByZXZpZXdTdG9wKS4gKi9cbiAgICBfcHJldmlld1NldFRpbWUoc2Vjb25kczogbnVtYmVyKTogeyBub3JtYWxpemVkVGltZTogbnVtYmVyOyBkdXJhdGlvbjogbnVtYmVyIH0ge1xuICAgICAgICBpZiAoIXRoaXMuX3ByZXZpZXdPcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpZXdPcmlnaW4gPSB7IHBvc2l0aW9uOiB0aGlzLm5vZGUud29ybGRQb3NpdGlvbi5jbG9uZSgpLCByb3RhdGlvbjogdGhpcy5ub2RlLndvcmxkUm90YXRpb24uY2xvbmUoKSB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSBNYXRoLm1heCgwLCBzZWNvbmRzKTtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZVRpbWUoKTtcbiAgICAgICAgdGhpcy5fZW5kUmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgICAgIHJldHVybiB7IG5vcm1hbGl6ZWRUaW1lOiB0aGlzLl9ub3JtYWxpemVkVGltZSwgZHVyYXRpb246IHRoaXMuY3VycmVudER1cmF0aW9uKCkgfTtcbiAgICB9XG5cbiAgICAvKiogRWRpdG9yIHByZXZpZXc6IHB1dHMgdGhlIG9iamVjdCBiYWNrIHdoZXJlIGl0IHdhcy4gKi9cbiAgICBfcHJldmlld1N0b3AoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9wcmV2aWV3T3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0V29ybGRQb3NpdGlvbih0aGlzLl9wcmV2aWV3T3JpZ2luLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRXb3JsZFJvdGF0aW9uKHRoaXMuX3ByZXZpZXdPcmlnaW4ucm90YXRpb24pO1xuICAgICAgICAgICAgdGhpcy5fcHJldmlld09yaWdpbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuX25vcm1hbGl6ZWRUaW1lID0gMDtcbiAgICB9XG5cbiAgICBfcHJldmlld0luZm8oKTogeyBkdXJhdGlvbjogbnVtYmVyOyBsZW5ndGg6IG51bWJlcjsgcHJldmlld2luZzogYm9vbGVhbiB9IHtcbiAgICAgICAgcmV0dXJuIHsgZHVyYXRpb246IHRoaXMuY3VycmVudER1cmF0aW9uKCksIGxlbmd0aDogdGhpcy5zcGxpbmVMZW5ndGgsIHByZXZpZXdpbmc6ICEhdGhpcy5fcHJldmlld09yaWdpbiB9O1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKEVESVRPUikgdGhpcy5fcHJldmlld1N0b3AoKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgICBfZGVjb3JhdG9yLCBDb21wb25lbnQsIGNjZW51bSwgQ0NPYmplY3QsIGRpcmVjdG9yLCBqcywgTWF0ZXJpYWwsIE1hdDQsIE1lc2gsIE1lc2hSZW5kZXJlciwgTm9kZSwgdXRpbHMsIFZlYzIsIFZlYzMsXG59IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUiB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcGxpbmVDb250YWluZXIgfSBmcm9tICcuL1NwbGluZUNvbnRhaW5lcic7XG5pbXBvcnQgeyBTcGxpbmUgfSBmcm9tICcuL1NwbGluZSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGVJbkVkaXRNb2RlLCBtZW51IH0gPSBfZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBFeHRydWRlU2hhcGUge1xuICAgIC8qKiBBIHR1YmUuICovXG4gICAgQ2lyY2xlID0gMCxcbiAgICAvKiogQSBzcXVhcmUgdHViZS4gKi9cbiAgICBTcXVhcmUgPSAxLFxuICAgIC8qKiBBIGZsYXQgc3RyaXAgZmFjaW5nIHRoZSBzcGxpbmUncyB1cCB2ZWN0b3IuICovXG4gICAgUm9hZCA9IDIsXG4gICAgLyoqIFRoZSBmaXJzdCBzcGxpbmUgb2YgYW5vdGhlciBjb250YWluZXIsIHJlYWQgaW4gaXRzIFhZIHBsYW5lLiAqL1xuICAgIFNwbGluZSA9IDMsXG59XG5jY2VudW0oRXh0cnVkZVNoYXBlKTtcblxuLyoqIEhpZGRlbiBjaGlsZCB0aGF0IGhvbGRzIHRoZSBnZW5lcmF0ZWQgbWVzaDogbm90IHNhdmVkLCBub3QgbGlzdGVkLCBub3QgcGlja2FibGUuICovXG5jb25zdCBHRU5FUkFURURfRkxBR1MgPSBDQ09iamVjdC5GbGFncy5Eb250U2F2ZSB8IENDT2JqZWN0LkZsYWdzLkhpZGVJbkhpZXJhcmNoeSB8IENDT2JqZWN0LkZsYWdzLkxvY2tlZEluRWRpdG9yO1xuXG5pbnRlcmZhY2UgUHJvZmlsZSB7XG4gICAgLyoqIDJEIHBvaW50cyAoeCBhbG9uZyB0aGUgcmlnaHQgdmVjdG9yLCB5IGFsb25nIHVwKS4gKi9cbiAgICBwb2ludHM6IG51bWJlcltdO1xuICAgIG5vcm1hbHM6IG51bWJlcltdO1xuICAgIHU6IG51bWJlcltdO1xuICAgIC8qKiBQYWlycyBvZiBwb2ludCBpbmRpY2VzIHRoYXQgZm9ybSBmYWNlcy4gKi9cbiAgICBlZGdlczogbnVtYmVyW107XG4gICAgLyoqIFByb2ZpbGUgZW5jbG9zZXMgYW4gYXJlYSAoY2FwcyBwb3NzaWJsZSkuICovXG4gICAgY2xvc2VkOiBib29sZWFuO1xuICAgIC8qKiBQZXJpbWV0ZXIgb2YgdGhlIHByb2ZpbGUgYXQgcmFkaXVzIDEsIGZvciB0ZXh0dXJlIHNjYWxlIGFsb25nIHRoZSBzcGxpbmUuICovXG4gICAgcGVyaW1ldGVyOiBudW1iZXI7XG59XG5cbmNvbnN0IF9wID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9mID0gbmV3IFZlYzMoKTtcbmNvbnN0IF91ID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9yID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9tID0gbmV3IE1hdDQoKTtcblxuLyoqXG4gKiBCdWlsZHMgYSBtZXNoIGFsb25nIHRoZSBzcGxpbmVzIG9mIGEgY29udGFpbmVyIChVbml0eSdzIFNwbGluZUV4dHJ1ZGUpLlxuICogVGhlIG1lc2ggaXMgcmVnZW5lcmF0ZWQgd2hlbiB0aGUgc3BsaW5lIG9yIGEgc2V0dGluZyBjaGFuZ2VzOyBpdCBsaXZlcyBvblxuICogYSBoaWRkZW4gY2hpbGQgbm9kZSBhbmQgaXMgbm90IHNhdmVkIHdpdGggdGhlIHNjZW5lLlxuICovXG5AY2NjbGFzcygnU3BsaW5lRXh0cnVkZScpXG5AZXhlY3V0ZUluRWRpdE1vZGVcbkBtZW51KCdTcGxpbmVzL1NwbGluZUV4dHJ1ZGUnKVxuZXhwb3J0IGNsYXNzIFNwbGluZUV4dHJ1ZGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUNvbnRhaW5lciwgdG9vbHRpcDogJ1RoZSBzcGxpbmVzIHRvIGV4dHJ1ZGUgKGFsbCBzcGxpbmVzIG9mIHRoZSBjb250YWluZXIpLicgfSlcbiAgICBjb250YWluZXI6IFNwbGluZUNvbnRhaW5lciB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogTWF0ZXJpYWwsIHRvb2x0aXA6ICdNYXRlcmlhbCBvZiB0aGUgZ2VuZXJhdGVkIG1lc2guJyB9KVxuICAgIG1hdGVyaWFsOiBNYXRlcmlhbCB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1JlYnVpbGQgdGhlIG1lc2ggd2hlbiB0aGUgc3BsaW5lIGNoYW5nZXMgKGF0IHJ1bnRpbWUgdG9vKS4nIH0pXG4gICAgcmVidWlsZE9uU3BsaW5lQ2hhbmdlID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdBdCBtb3N0IHRoaXMgbWFueSByZWJ1aWxkcyBwZXIgc2Vjb25kIGF0IHJ1bnRpbWUuJywgbWluOiAxLCBzdGVwOiAxLCB2aXNpYmxlKHRoaXM6IFNwbGluZUV4dHJ1ZGUpIHsgcmV0dXJuIHRoaXMucmVidWlsZE9uU3BsaW5lQ2hhbmdlOyB9IH0pXG4gICAgcmVidWlsZEZyZXF1ZW5jeSA9IDMwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogRXh0cnVkZVNoYXBlLCB0b29sdGlwOiAnQ3Jvc3Mtc2VjdGlvbiBvZiB0aGUgbWVzaC4nIH0pXG4gICAgc2hhcGUgPSBFeHRydWRlU2hhcGUuQ2lyY2xlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1NpZGVzIG9mIHRoZSBjaXJjbGUuJywgbWluOiAzLCBzdGVwOiAxLCB2aXNpYmxlKHRoaXM6IFNwbGluZUV4dHJ1ZGUpIHsgcmV0dXJuIHRoaXMuc2hhcGUgPT09IEV4dHJ1ZGVTaGFwZS5DaXJjbGU7IH0gfSlcbiAgICBzaWRlcyA9IDg7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVDb250YWluZXIsIHRvb2x0aXA6ICdDb250YWluZXIgd2hvc2UgZmlyc3Qgc3BsaW5lIGlzIHRoZSBjcm9zcy1zZWN0aW9uIChpbiBpdHMgWFkgcGxhbmUpLicsIHZpc2libGUodGhpczogU3BsaW5lRXh0cnVkZSkgeyByZXR1cm4gdGhpcy5zaGFwZSA9PT0gRXh0cnVkZVNoYXBlLlNwbGluZTsgfSB9KVxuICAgIHByb2ZpbGU6IFNwbGluZUNvbnRhaW5lciB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1BvaW50cyBzYW1wbGVkIGFsb25nIHRoZSBwcm9maWxlIHNwbGluZS4nLCBtaW46IDIsIHN0ZXA6IDEsIHZpc2libGUodGhpczogU3BsaW5lRXh0cnVkZSkgeyByZXR1cm4gdGhpcy5zaGFwZSA9PT0gRXh0cnVkZVNoYXBlLlNwbGluZTsgfSB9KVxuICAgIHByb2ZpbGVTZWdtZW50cyA9IDE2O1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1JhZGl1cyAoaGFsZiB3aWR0aCkgb2YgdGhlIGNyb3NzLXNlY3Rpb24uJywgbWluOiAwIH0pXG4gICAgcmFkaXVzID0gMC4yNTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdFZGdlIGxvb3BzIHBlciB1bml0IG9mIHNwbGluZSBsZW5ndGguJywgbWluOiAwLjAxIH0pXG4gICAgc2VnbWVudHNQZXJVbml0ID0gNDtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdDbG9zZSB0aGUgZW5kcyBvZiBvcGVuIHNwbGluZXMuJyB9KVxuICAgIGNhcHBlZCA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUGFydCBvZiBlYWNoIHNwbGluZSB0byBleHRydWRlICgwLi4xKS4nIH0pXG4gICAgcmFuZ2UgPSBuZXcgVmVjMigwLCAxKTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdUdXJuIHRoZSBtZXNoIGluc2lkZSBvdXQuJyB9KVxuICAgIGZsaXBOb3JtYWxzID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnQ2FzdCBzaGFkb3dzLicgfSlcbiAgICBjYXN0U2hhZG93cyA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUmVjZWl2ZSBzaGFkb3dzLicgfSlcbiAgICByZWNlaXZlU2hhZG93cyA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnQWRkIGEgTWVzaENvbGxpZGVyIHVzaW5nIHRoZSBnZW5lcmF0ZWQgbWVzaCAobmVlZHMgYSBwaHlzaWNzIGJhY2tlbmQgd2l0aCBtZXNoIGNvbGxpZGVycykuJyB9KVxuICAgIGdlbmVyYXRlQ29sbGlkZXIgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2NoaWxkOiBOb2RlIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfbWVzaDogTWVzaCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgX3N0YW1wID0gTmFOO1xuICAgIHByaXZhdGUgX2xhc3RCdWlsZCA9IC1JbmZpbml0eTtcbiAgICBwcml2YXRlIF9mYWxsYmFja01hdGVyaWFsOiBNYXRlcmlhbCB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIFRoZSBnZW5lcmF0ZWQgbWVzaCAobnVsbCBiZWZvcmUgdGhlIGZpcnN0IGJ1aWxkKS4gKi9cbiAgICBnZXQgbWVzaCgpOiBNZXNoIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNoO1xuICAgIH1cblxuICAgIHJlc2V0SW5FZGl0b3IoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5nZXRDb21wb25lbnQoU3BsaW5lQ29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250YWluZXIpIHRoaXMuY29udGFpbmVyID0gdGhpcy5nZXRDb21wb25lbnQoU3BsaW5lQ29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZWJ1aWxkKCk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5fY2hpbGQpIHRoaXMuX2NoaWxkLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkICYmIHRoaXMuX2NoaWxkLmlzVmFsaWQpIHRoaXMuX2NoaWxkLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fY2hpbGQgPSBudWxsO1xuICAgICAgICB0aGlzLl9tZXNoPy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX21lc2ggPSBudWxsO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCFFRElUT1IgJiYgIXRoaXMucmVidWlsZE9uU3BsaW5lQ2hhbmdlKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHN0YW1wID0gdGhpcy5jb21wdXRlU3RhbXAoKTtcbiAgICAgICAgaWYgKHN0YW1wID09PSB0aGlzLl9zdGFtcCkgcmV0dXJuO1xuICAgICAgICBpZiAoIUVESVRPUikge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gZGlyZWN0b3IuZ2V0VG90YWxUaW1lKCkgLyAxMDAwO1xuICAgICAgICAgICAgaWYgKG5vdyAtIHRoaXMuX2xhc3RCdWlsZCA8IDEgLyBNYXRoLm1heCgxLCB0aGlzLnJlYnVpbGRGcmVxdWVuY3kpKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLl9sYXN0QnVpbGQgPSBub3c7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wdXRlU3RhbXAoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBsZXQgaCA9IGMgJiYgYy5pc1ZhbGlkID8gYy5jaGFuZ2VTdGFtcCA6IDA7XG4gICAgICAgIGNvbnN0IG1peCA9ICh2OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGggPSBNYXRoLmltdWwoaCBeIE1hdGgucm91bmQodiAqIDFlNSksIDE2Nzc3NjE5KTtcbiAgICAgICAgfTtcbiAgICAgICAgbWl4KHRoaXMuc2hhcGUpO1xuICAgICAgICBtaXgodGhpcy5zaWRlcyk7XG4gICAgICAgIG1peCh0aGlzLnJhZGl1cyk7XG4gICAgICAgIG1peCh0aGlzLnNlZ21lbnRzUGVyVW5pdCk7XG4gICAgICAgIG1peCh0aGlzLmNhcHBlZCA/IDEgOiAwKTtcbiAgICAgICAgbWl4KHRoaXMucmFuZ2UueCk7XG4gICAgICAgIG1peCh0aGlzLnJhbmdlLnkpO1xuICAgICAgICBtaXgodGhpcy5mbGlwTm9ybWFscyA/IDEgOiAwKTtcbiAgICAgICAgbWl4KHRoaXMuY2FzdFNoYWRvd3MgPyAxIDogMCk7XG4gICAgICAgIG1peCh0aGlzLnJlY2VpdmVTaGFkb3dzID8gMSA6IDApO1xuICAgICAgICBtaXgodGhpcy5nZW5lcmF0ZUNvbGxpZGVyID8gMSA6IDApO1xuICAgICAgICBtaXgodGhpcy5wcm9maWxlU2VnbWVudHMpO1xuICAgICAgICBpZiAodGhpcy5wcm9maWxlICYmIHRoaXMuc2hhcGUgPT09IEV4dHJ1ZGVTaGFwZS5TcGxpbmUpIG1peCh0aGlzLnByb2ZpbGUuY2hhbmdlU3RhbXApO1xuICAgICAgICBpZiAoYyAmJiBjLmlzVmFsaWQgJiYgYy5ub2RlICE9PSB0aGlzLm5vZGUpIHtcbiAgICAgICAgICAgIE1hdDQuaW52ZXJ0KF9tLCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICAgICAgTWF0NC5tdWx0aXBseShfbSwgX20sIGMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHYgb2YgTWF0NC50b0FycmF5KFtdLCBfbSkpIG1peCh2KTtcbiAgICAgICAgfVxuICAgICAgICBoID0gTWF0aC5pbXVsKGggXiAodGhpcy5tYXRlcmlhbCA/IDEgOiAwKSwgMTY3Nzc2MTkpO1xuICAgICAgICByZXR1cm4gaDtcbiAgICB9XG5cbiAgICAvKiogUmVnZW5lcmF0ZXMgdGhlIG1lc2ggbm93LiAqL1xuICAgIHJlYnVpbGQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N0YW1wID0gdGhpcy5jb21wdXRlU3RhbXAoKTtcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSB0aGlzLmJ1aWxkR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmVuc3VyZUNoaWxkKCk7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gY2hpbGQuZ2V0Q29tcG9uZW50KE1lc2hSZW5kZXJlcikgfHwgY2hpbGQuYWRkQ29tcG9uZW50KE1lc2hSZW5kZXJlcik7XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuX21lc2g7XG4gICAgICAgIGlmICghZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgIHJlbmRlcmVyLm1lc2ggPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fbWVzaCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tZXNoID0gdXRpbHMuTWVzaFV0aWxzLmNyZWF0ZU1lc2goZ2VvbWV0cnksIHVuZGVmaW5lZCwgeyBjYWxjdWxhdGVCb3VuZHM6IHRydWUgfSk7XG4gICAgICAgICAgICByZW5kZXJlci5tZXNoID0gdGhpcy5fbWVzaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkICYmIG9sZCAhPT0gdGhpcy5fbWVzaCkgb2xkLmRlc3Ryb3koKTtcbiAgICAgICAgY29uc3QgbWF0ID0gdGhpcy5tYXRlcmlhbCB8fCB0aGlzLmZhbGxiYWNrTWF0ZXJpYWwoKTtcbiAgICAgICAgaWYgKG1hdCkgcmVuZGVyZXIuc2V0U2hhcmVkTWF0ZXJpYWwobWF0LCAwKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93Q2FzdGluZ01vZGUgPSB0aGlzLmNhc3RTaGFkb3dzID8gMSA6IDA7XG4gICAgICAgIHJlbmRlcmVyLnJlY2VpdmVTaGFkb3cgPSB0aGlzLnJlY2VpdmVTaGFkb3dzID8gMSA6IDA7XG4gICAgICAgIHRoaXMudXBkYXRlQ29sbGlkZXIoY2hpbGQpO1xuICAgICAgICBjaGlsZC5hY3RpdmUgPSB0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZhbGxiYWNrTWF0ZXJpYWwoKTogTWF0ZXJpYWwgfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZhbGxiYWNrTWF0ZXJpYWwpIHJldHVybiB0aGlzLl9mYWxsYmFja01hdGVyaWFsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbSA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICAgICAgbS5pbml0aWFsaXplKHsgZWZmZWN0TmFtZTogJ2J1aWx0aW4tc3RhbmRhcmQnIH0pO1xuICAgICAgICAgICAgdGhpcy5fZmFsbGJhY2tNYXRlcmlhbCA9IG07XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgdGhpcy5fZmFsbGJhY2tNYXRlcmlhbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbGxiYWNrTWF0ZXJpYWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbnN1cmVDaGlsZCgpOiBOb2RlIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkICYmIHRoaXMuX2NoaWxkLmlzVmFsaWQgJiYgdGhpcy5fY2hpbGQucGFyZW50ID09PSB0aGlzLm5vZGUpIHJldHVybiB0aGlzLl9jaGlsZDtcbiAgICAgICAgLy8gUmV1c2UgYSBnZW5lcmF0ZWQgY2hpbGQgbGVmdCBvdmVyIGZyb20gYSBwcmV2aW91cyBpbnN0YW5jZSAoZS5nLiBhZnRlciB1bmRvKS5cbiAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5ub2RlLmNoaWxkcmVuLmZpbmQoKG4pID0+IG4ubmFtZSA9PT0gJ19fU3BsaW5lRXh0cnVkZU1lc2gnICYmIChuIGFzIGFueSkuX29iakZsYWdzICYgQ0NPYmplY3QuRmxhZ3MuRG9udFNhdmUpIHx8IG51bGw7XG4gICAgICAgIGlmICghY2hpbGQpIHtcbiAgICAgICAgICAgIGNoaWxkID0gbmV3IE5vZGUoJ19fU3BsaW5lRXh0cnVkZU1lc2gnKTtcbiAgICAgICAgICAgIChjaGlsZCBhcyBhbnkpLl9vYmpGbGFncyB8PSBHRU5FUkFURURfRkxBR1M7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGQubGF5ZXIgPSB0aGlzLm5vZGUubGF5ZXI7XG4gICAgICAgIHRoaXMuX2NoaWxkID0gY2hpbGQ7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUNvbGxpZGVyKGNoaWxkOiBOb2RlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IENvbGxpZGVyQ2xhc3MgPSBqcy5nZXRDbGFzc0J5TmFtZSgnY2MuTWVzaENvbGxpZGVyJykgYXMgYW55O1xuICAgICAgICBpZiAoIUNvbGxpZGVyQ2xhc3MpIHJldHVybjtcbiAgICAgICAgbGV0IGNvbGxpZGVyID0gY2hpbGQuZ2V0Q29tcG9uZW50KENvbGxpZGVyQ2xhc3MpIGFzIGFueTtcbiAgICAgICAgaWYgKCF0aGlzLmdlbmVyYXRlQ29sbGlkZXIgfHwgIXRoaXMuX21lc2gpIHtcbiAgICAgICAgICAgIGlmIChjb2xsaWRlcikgY29sbGlkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29sbGlkZXIpIGNvbGxpZGVyID0gY2hpbGQuYWRkQ29tcG9uZW50KENvbGxpZGVyQ2xhc3MpO1xuICAgICAgICBjb2xsaWRlci5tZXNoID0gdGhpcy5fbWVzaDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1ha2VQcm9maWxlKCk6IFByb2ZpbGUgfCBudWxsIHtcbiAgICAgICAgY29uc3QgcDogUHJvZmlsZSA9IHsgcG9pbnRzOiBbXSwgbm9ybWFsczogW10sIHU6IFtdLCBlZGdlczogW10sIGNsb3NlZDogdHJ1ZSwgcGVyaW1ldGVyOiAwIH07XG4gICAgICAgIHN3aXRjaCAodGhpcy5zaGFwZSkge1xuICAgICAgICAgICAgY2FzZSBFeHRydWRlU2hhcGUuQ2lyY2xlOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbiA9IE1hdGgubWF4KDMsIE1hdGgucm91bmQodGhpcy5zaWRlcykpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IG47IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gKGogLyBuKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgICAgICAgICBwLnBvaW50cy5wdXNoKE1hdGguY29zKGEpLCBNYXRoLnNpbihhKSk7XG4gICAgICAgICAgICAgICAgICAgIHAubm9ybWFscy5wdXNoKE1hdGguY29zKGEpLCBNYXRoLnNpbihhKSk7XG4gICAgICAgICAgICAgICAgICAgIHAudS5wdXNoKGogLyBuKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBuKSBwLmVkZ2VzLnB1c2goaiwgaiArIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwLnBlcmltZXRlciA9IE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBFeHRydWRlU2hhcGUuU3F1YXJlOiB7XG4gICAgICAgICAgICAgICAgLy8gQ291bnRlci1jbG9ja3dpc2UgY29ybmVycyBpbiB0aGUgKHJpZ2h0LCB1cCkgcGxhbmUsIHR3byB2ZXJ0aWNlcyBwZXIgc2lkZSBmb3IgZmxhdCBub3JtYWxzLlxuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBbWzEsIC0xXSwgWzEsIDFdLCBbLTEsIDFdLCBbLTEsIC0xXV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA0OyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYSA9IGNba107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSBjWyhrICsgMSkgJSA0XTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnggPSAoYVswXSArIGJbMF0pIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnkgPSAoYVsxXSArIGJbMV0pIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaSA9IHAucG9pbnRzLmxlbmd0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIHAucG9pbnRzLnB1c2goYVswXSwgYVsxXSwgYlswXSwgYlsxXSk7XG4gICAgICAgICAgICAgICAgICAgIHAubm9ybWFscy5wdXNoKG54LCBueSwgbngsIG55KTtcbiAgICAgICAgICAgICAgICAgICAgcC51LnB1c2goayAvIDQsIChrICsgMSkgLyA0KTtcbiAgICAgICAgICAgICAgICAgICAgcC5lZGdlcy5wdXNoKGksIGkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcC5wZXJpbWV0ZXIgPSA4O1xuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBFeHRydWRlU2hhcGUuUm9hZDpcbiAgICAgICAgICAgICAgICBwLnBvaW50cy5wdXNoKDEsIDAsIC0xLCAwKTtcbiAgICAgICAgICAgICAgICBwLm5vcm1hbHMucHVzaCgwLCAxLCAwLCAxKTtcbiAgICAgICAgICAgICAgICBwLnUucHVzaCgwLCAxKTtcbiAgICAgICAgICAgICAgICBwLmVkZ2VzLnB1c2goMCwgMSk7XG4gICAgICAgICAgICAgICAgcC5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwLnBlcmltZXRlciA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICBjYXNlIEV4dHJ1ZGVTaGFwZS5TcGxpbmU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3BsaW5lUHJvZmlsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3BsaW5lUHJvZmlsZSgpOiBQcm9maWxlIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHM6IFNwbGluZSB8IHVuZGVmaW5lZCA9IHRoaXMucHJvZmlsZT8uc3BsaW5lc1swXTtcbiAgICAgICAgaWYgKCFzIHx8IHMuY291bnQgPCAyKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgbiA9IE1hdGgubWF4KDIsIE1hdGgucm91bmQodGhpcy5wcm9maWxlU2VnbWVudHMpKTtcbiAgICAgICAgY29uc3QgcDogUHJvZmlsZSA9IHsgcG9pbnRzOiBbXSwgbm9ybWFsczogW10sIHU6IFtdLCBlZGdlczogW10sIGNsb3NlZDogcy5jbG9zZWQsIHBlcmltZXRlcjogMCB9O1xuICAgICAgICBjb25zdCBwdHM6IG51bWJlcltdID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IG47IGorKykge1xuICAgICAgICAgICAgcy5ldmFsdWF0ZVBvc2l0aW9uKGogLyBuLCBfcCk7XG4gICAgICAgICAgICBwdHMucHVzaChfcC54LCBfcC55KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTY2FsZSBzbyB0aGUgcHJvZmlsZSBmaXRzIGEgdW5pdCByYWRpdXMgKHRoZSByYWRpdXMgc2V0dGluZyBzaXplcyBpdCkuXG4gICAgICAgIGxldCBleHQgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IHYgb2YgcHRzKSBleHQgPSBNYXRoLm1heChleHQsIE1hdGguYWJzKHYpKTtcbiAgICAgICAgY29uc3QgayA9IGV4dCA+IDAgPyAxIC8gZXh0IDogMTtcbiAgICAgICAgbGV0IGRpc3QgPSAwO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBwdHNbaiAqIDJdICogaztcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwdHNbaiAqIDIgKyAxXSAqIGs7XG4gICAgICAgICAgICBpZiAoaiA+IDApIGRpc3QgKz0gTWF0aC5oeXBvdCh4IC0gcHRzW2ogKiAyIC0gMl0gKiBrLCB5IC0gcHRzW2ogKiAyIC0gMV0gKiBrKTtcbiAgICAgICAgICAgIHMuZXZhbHVhdGVEaXJlY3Rpb24oaiAvIG4sIF9mKTtcbiAgICAgICAgICAgIC8vIE5vcm1hbDogdGhlIGRpcmVjdGlvbiB0dXJuZWQgLTkwIGRlZ3JlZXMgKG91dHdhcmQgZm9yIGNvdW50ZXItY2xvY2t3aXNlIHByb2ZpbGVzKS5cbiAgICAgICAgICAgIGNvbnN0IGwgPSBNYXRoLmh5cG90KF9mLngsIF9mLnkpIHx8IDE7XG4gICAgICAgICAgICBwLnBvaW50cy5wdXNoKHgsIHkpO1xuICAgICAgICAgICAgcC5ub3JtYWxzLnB1c2goX2YueSAvIGwsIC1fZi54IC8gbCk7XG4gICAgICAgICAgICBwLnUucHVzaCgwKTtcbiAgICAgICAgICAgIGlmIChqIDwgbikgcC5lZGdlcy5wdXNoKGosIGogKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHAudVtqXSA9IChqIC8gbik7XG4gICAgICAgIHAucGVyaW1ldGVyID0gZGlzdDtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEdlb21ldHJ5KCk6IHsgcG9zaXRpb25zOiBudW1iZXJbXTsgbm9ybWFsczogbnVtYmVyW107IHV2czogbnVtYmVyW107IGluZGljZXM6IG51bWJlcltdOyBtaW5Qb3M6IFZlYzM7IG1heFBvczogVmVjMyB9IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKCFjIHx8ICFjLmlzVmFsaWQpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBwcm9maWxlID0gdGhpcy5tYWtlUHJvZmlsZSgpO1xuICAgICAgICBpZiAoIXByb2ZpbGUpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IG5vcm1hbHM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IHV2czogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgY29uc3QgaW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgY29uc3QgbWluID0gbmV3IFZlYzMoSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eSk7XG4gICAgICAgIGNvbnN0IG1heCA9IG5ldyBWZWMzKC1JbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHkpO1xuXG4gICAgICAgIC8vIENvbnRhaW5lciBzcGFjZSB0byB0aGlzIG5vZGUncyBzcGFjZS5cbiAgICAgICAgY29uc3Qgc2FtZU5vZGUgPSBjLm5vZGUgPT09IHRoaXMubm9kZTtcbiAgICAgICAgaWYgKCFzYW1lTm9kZSkge1xuICAgICAgICAgICAgTWF0NC5pbnZlcnQoX20sIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgICAgICBNYXQ0Lm11bHRpcGx5KF9tLCBfbSwgYy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByMCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIE1hdGgubWluKHRoaXMucmFuZ2UueCwgdGhpcy5yYW5nZS55KSkpO1xuICAgICAgICBjb25zdCByMSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIE1hdGgubWF4KHRoaXMucmFuZ2UueCwgdGhpcy5yYW5nZS55KSkpO1xuICAgICAgICBpZiAocjEgLSByMCA8PSAxZS02KSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gdGhpcy5yYWRpdXM7XG4gICAgICAgIGNvbnN0IHBjID0gcHJvZmlsZS5wb2ludHMubGVuZ3RoIC8gMjtcblxuICAgICAgICBjb25zdCBhZGRWZXJ0ZXggPSAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgbng6IG51bWJlciwgbnk6IG51bWJlciwgbno6IG51bWJlciwgdTogbnVtYmVyLCB2OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHgsIHksIHopO1xuICAgICAgICAgICAgbm9ybWFscy5wdXNoKHRoaXMuZmxpcE5vcm1hbHMgPyAtbnggOiBueCwgdGhpcy5mbGlwTm9ybWFscyA/IC1ueSA6IG55LCB0aGlzLmZsaXBOb3JtYWxzID8gLW56IDogbnopO1xuICAgICAgICAgICAgdXZzLnB1c2godSwgdik7XG4gICAgICAgICAgICBpZiAoeCA8IG1pbi54KSBtaW4ueCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA8IG1pbi55KSBtaW4ueSA9IHk7XG4gICAgICAgICAgICBpZiAoeiA8IG1pbi56KSBtaW4ueiA9IHo7XG4gICAgICAgICAgICBpZiAoeCA+IG1heC54KSBtYXgueCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA+IG1heC55KSBtYXgueSA9IHk7XG4gICAgICAgICAgICBpZiAoeiA+IG1heC56KSBtYXgueiA9IHo7XG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb25zLmxlbmd0aCAvIDMgLSAxO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB0cmkgPSAoYTogbnVtYmVyLCBiOiBudW1iZXIsIGNjOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZsaXBOb3JtYWxzKSBpbmRpY2VzLnB1c2goYSwgY2MsIGIpO1xuICAgICAgICAgICAgZWxzZSBpbmRpY2VzLnB1c2goYSwgYiwgY2MpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcyBvZiBjLnNwbGluZXMpIHtcbiAgICAgICAgICAgIGlmIChzLmNvdW50IDwgMikgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBzLmdldExlbmd0aCgpO1xuICAgICAgICAgICAgaWYgKGxlbmd0aCA8PSAxZS02KSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRzID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxlbmd0aCAqIChyMSAtIHIwKSAqIHRoaXMuc2VnbWVudHNQZXJVbml0KSk7XG4gICAgICAgICAgICBjb25zdCBsb29wID0gcy5jbG9zZWQgJiYgcjAgPD0gMCAmJiByMSA+PSAxO1xuICAgICAgICAgICAgY29uc3QgYmFzZSA9IHBvc2l0aW9ucy5sZW5ndGggLyAzO1xuICAgICAgICAgICAgY29uc3QgcmluZ0ZyYW1lczogeyBwOiBWZWMzOyBmOiBWZWMzOyB1OiBWZWMzOyByOiBWZWMzIH1bXSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgdGV4U2NhbGUgPSAxIC8gTWF0aC5tYXgoMWUtNiwgcmFkaXVzICogcHJvZmlsZS5wZXJpbWV0ZXIpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzZWdtZW50czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdCA9IHIwICsgKChyMSAtIHIwKSAqIGkpIC8gc2VnbWVudHM7XG4gICAgICAgICAgICAgICAgcy5ldmFsdWF0ZVBvc2l0aW9uKHQsIF9wKTtcbiAgICAgICAgICAgICAgICBzLmV2YWx1YXRlRGlyZWN0aW9uKHQsIF9mKTtcbiAgICAgICAgICAgICAgICBzLmV2YWx1YXRlVXBWZWN0b3IodCwgX3UpO1xuICAgICAgICAgICAgICAgIGlmICghc2FtZU5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KF9wLCBfcCwgX20pO1xuICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDROb3JtYWwoX2YsIF9mLCBfbSkubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NE5vcm1hbChfdSwgX3UsIF9tKS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgVmVjMy5jcm9zcyhfciwgX3UsIF9mKS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICBWZWMzLmNyb3NzKF91LCBfZiwgX3IpLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgICAgIHJpbmdGcmFtZXMucHVzaCh7IHA6IF9wLmNsb25lKCksIGY6IF9mLmNsb25lKCksIHU6IF91LmNsb25lKCksIHI6IF9yLmNsb25lKCkgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdiA9IChsZW5ndGggKiAodCAtIHIwKSkgKiB0ZXhTY2FsZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBjOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHggPSBwcm9maWxlLnBvaW50c1tqICogMl0gKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHB5ID0gcHJvZmlsZS5wb2ludHNbaiAqIDIgKyAxXSAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnggPSBwcm9maWxlLm5vcm1hbHNbaiAqIDJdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBueSA9IHByb2ZpbGUubm9ybWFsc1tqICogMiArIDFdO1xuICAgICAgICAgICAgICAgICAgICBhZGRWZXJ0ZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICBfcC54ICsgX3IueCAqIHB4ICsgX3UueCAqIHB5LCBfcC55ICsgX3IueSAqIHB4ICsgX3UueSAqIHB5LCBfcC56ICsgX3IueiAqIHB4ICsgX3UueiAqIHB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3IueCAqIG54ICsgX3UueCAqIG55LCBfci55ICogbnggKyBfdS55ICogbnksIF9yLnogKiBueCArIF91LnogKiBueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGUudVtqXSwgdixcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCByYSA9IGJhc2UgKyBpICogcGM7XG4gICAgICAgICAgICAgICAgY29uc3QgcmIgPSBiYXNlICsgKGkgKyAxKSAqIHBjO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGUgPSAwOyBlIDwgcHJvZmlsZS5lZGdlcy5sZW5ndGg7IGUgKz0gMikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gcHJvZmlsZS5lZGdlc1tlXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IHByb2ZpbGUuZWRnZXNbZSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0cmkocmEgKyBhLCByYSArIGIsIHJiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaShyYSArIGIsIHJiICsgYiwgcmIgKyBhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jYXBwZWQgJiYgcHJvZmlsZS5jbG9zZWQgJiYgIWxvb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcChyaW5nRnJhbWVzWzBdLCBwcm9maWxlLCByYWRpdXMsIHRydWUsIGFkZFZlcnRleCwgdHJpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcChyaW5nRnJhbWVzW3JpbmdGcmFtZXMubGVuZ3RoIC0gMV0sIHByb2ZpbGUsIHJhZGl1cywgZmFsc2UsIGFkZFZlcnRleCwgdHJpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWluZGljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHsgcG9zaXRpb25zLCBub3JtYWxzLCB1dnMsIGluZGljZXMsIG1pblBvczogbWluLCBtYXhQb3M6IG1heCB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2FwKFxuICAgICAgICBmcmFtZTogeyBwOiBWZWMzOyBmOiBWZWMzOyB1OiBWZWMzOyByOiBWZWMzIH0sXG4gICAgICAgIHByb2ZpbGU6IFByb2ZpbGUsXG4gICAgICAgIHJhZGl1czogbnVtYmVyLFxuICAgICAgICBzdGFydDogYm9vbGVhbixcbiAgICAgICAgYWRkVmVydGV4OiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgbng6IG51bWJlciwgbnk6IG51bWJlciwgbno6IG51bWJlciwgdTogbnVtYmVyLCB2OiBudW1iZXIpID0+IG51bWJlcixcbiAgICAgICAgdHJpOiAoYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlcikgPT4gdm9pZCxcbiAgICApOiB2b2lkIHtcbiAgICAgICAgY29uc3QgeyBwLCBmLCB1LCByIH0gPSBmcmFtZTtcbiAgICAgICAgY29uc3QgcyA9IHN0YXJ0ID8gLTEgOiAxO1xuICAgICAgICBjb25zdCBjZW50ZXIgPSBhZGRWZXJ0ZXgocC54LCBwLnksIHAueiwgZi54ICogcywgZi55ICogcywgZi56ICogcywgMC41LCAwLjUpO1xuICAgICAgICBjb25zdCBpZHM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IHBjID0gcHJvZmlsZS5wb2ludHMubGVuZ3RoIC8gMjtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYzsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBweCA9IHByb2ZpbGUucG9pbnRzW2ogKiAyXTtcbiAgICAgICAgICAgIGNvbnN0IHB5ID0gcHJvZmlsZS5wb2ludHNbaiAqIDIgKyAxXTtcbiAgICAgICAgICAgIGlkcy5wdXNoKGFkZFZlcnRleChcbiAgICAgICAgICAgICAgICBwLnggKyByLnggKiBweCAqIHJhZGl1cyArIHUueCAqIHB5ICogcmFkaXVzLFxuICAgICAgICAgICAgICAgIHAueSArIHIueSAqIHB4ICogcmFkaXVzICsgdS55ICogcHkgKiByYWRpdXMsXG4gICAgICAgICAgICAgICAgcC56ICsgci56ICogcHggKiByYWRpdXMgKyB1LnogKiBweSAqIHJhZGl1cyxcbiAgICAgICAgICAgICAgICBmLnggKiBzLCBmLnkgKiBzLCBmLnogKiBzLFxuICAgICAgICAgICAgICAgIHB4ICogMC41ICsgMC41LCBweSAqIDAuNSArIDAuNSxcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGUgPSAwOyBlIDwgcHJvZmlsZS5lZGdlcy5sZW5ndGg7IGUgKz0gMikge1xuICAgICAgICAgICAgY29uc3QgYSA9IGlkc1twcm9maWxlLmVkZ2VzW2VdXTtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBpZHNbcHJvZmlsZS5lZGdlc1tlICsgMV1dO1xuICAgICAgICAgICAgLy8gQ291bnRlci1jbG9ja3dpc2UgcHJvZmlsZSBlZGdlcyBmYWNlICtmb3J3YXJkOyB0aGUgc3RhcnQgY2FwIGZhY2VzIGJhY2suXG4gICAgICAgICAgICBpZiAoc3RhcnQpIHRyaShjZW50ZXIsIGIsIGEpO1xuICAgICAgICAgICAgZWxzZSB0cmkoY2VudGVyLCBhLCBiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb21wb25lbnQsIGNjZW51bSwgQ0NPYmplY3QsIGluc3RhbnRpYXRlLCBOb2RlLCBQcmVmYWIsIFF1YXQsIFZlYzIsIFZlYzMgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFRElUT1IgfSBmcm9tICdjYy9lbnYnO1xuaW1wb3J0IHsgU3BsaW5lQ29udGFpbmVyIH0gZnJvbSAnLi9TcGxpbmVDb250YWluZXInO1xuaW1wb3J0IHsgQWxpZ25BeGlzIH0gZnJvbSAnLi9TcGxpbmVBbmltYXRlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgZXhlY3V0ZUluRWRpdE1vZGUsIG1lbnUgfSA9IF9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIEluc3RhbnRpYXRlTWV0aG9kIHtcbiAgICAvKiogQSBzZXQgbnVtYmVyIG9mIGluc3RhbmNlcywgc3ByZWFkIGV2ZW5seS4gKi9cbiAgICBJbnN0YW5jZUNvdW50ID0gMCxcbiAgICAvKiogQSBkaXN0YW5jZSBhbG9uZyB0aGUgc3BsaW5lIGJldHdlZW4gaW5zdGFuY2VzLiAqL1xuICAgIFNwYWNpbmdEaXN0YW5jZSA9IDEsXG4gICAgLyoqIEEgc3RyYWlnaHQtbGluZSBkaXN0YW5jZSBiZXR3ZWVuIGluc3RhbmNlcy4gKi9cbiAgICBMaW5lYXJEaXN0YW5jZSA9IDIsXG59XG5cbmV4cG9ydCBlbnVtIEluc3RhbnRpYXRlU3BhY2Uge1xuICAgIC8qKiBPcmllbnQgaW5zdGFuY2VzIGFsb25nIHRoZSBzcGxpbmUuICovXG4gICAgU3BsaW5lID0gMCxcbiAgICAvKiogT3JpZW50IGluc3RhbmNlcyBsaWtlIHRoZSBzcGxpbmUgY29udGFpbmVyIG5vZGUuICovXG4gICAgU3BsaW5lT2JqZWN0ID0gMSxcbiAgICAvKiogT3JpZW50IGluc3RhbmNlcyB0byB0aGUgd29ybGQgYXhlcy4gKi9cbiAgICBXb3JsZCA9IDIsXG59XG5cbmV4cG9ydCBlbnVtIE9mZnNldFNwYWNlIHtcbiAgICBTcGxpbmUgPSAwLFxuICAgIFNwbGluZU9iamVjdCA9IDEsXG4gICAgV29ybGQgPSAyLFxuICAgIC8qKiBUaGUgaW5zdGFuY2UncyBvd24gYXhlcy4gKi9cbiAgICBPYmplY3QgPSAzLFxufVxuXG5jY2VudW0oSW5zdGFudGlhdGVNZXRob2QpO1xuY2NlbnVtKEluc3RhbnRpYXRlU3BhY2UpO1xuY2NlbnVtKE9mZnNldFNwYWNlKTtcblxuQGNjY2xhc3MoJ3NwbGluZXMuSW5zdGFudGlhYmxlSXRlbScpXG5leHBvcnQgY2xhc3MgSW5zdGFudGlhYmxlSXRlbSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogUHJlZmFiLCB0b29sdGlwOiAnUHJlZmFiIHRvIHBsYWNlLicgfSlcbiAgICBwcmVmYWI6IFByZWZhYiB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgcmFuZ2U6IFswLCAxMDAsIDFdLCBzbGlkZTogdHJ1ZSwgdG9vbHRpcDogJ1JlbGF0aXZlIGNoYW5jZSBvZiBwaWNraW5nIHRoaXMgcHJlZmFiICglKS4nIH0pXG4gICAgcHJvYmFiaWxpdHkgPSAxMDA7XG59XG5cbi8qKiBBIG1pbi9tYXggcmFuZ2UgcGVyIGF4aXM7IGF4ZXMgd2l0aG91dCBgcmFuZG9tYCB1c2UgbWluLiAqL1xuQGNjY2xhc3MoJ3NwbGluZXMuSW5zdGFudGlhdGVPZmZzZXQnKVxuZXhwb3J0IGNsYXNzIEluc3RhbnRpYXRlT2Zmc2V0IHtcbiAgICBAcHJvcGVydHlcbiAgICBtaW4gPSBuZXcgVmVjMygpO1xuXG4gICAgQHByb3BlcnR5XG4gICAgbWF4ID0gbmV3IFZlYzMoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdQaWNrIFggYXQgcmFuZG9tIGJldHdlZW4gbWluIGFuZCBtYXguJyB9KVxuICAgIHJhbmRvbVggPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdQaWNrIFkgYXQgcmFuZG9tIGJldHdlZW4gbWluIGFuZCBtYXguJyB9KVxuICAgIHJhbmRvbVkgPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdQaWNrIFogYXQgcmFuZG9tIGJldHdlZW4gbWluIGFuZCBtYXguJyB9KVxuICAgIHJhbmRvbVogPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IE9mZnNldFNwYWNlLCB0b29sdGlwOiAnQXhlcyB0aGUgb2Zmc2V0IGlzIGFwcGxpZWQgYWxvbmcuJyB9KVxuICAgIHNwYWNlID0gT2Zmc2V0U3BhY2UuU3BsaW5lO1xuXG4gICAgY29uc3RydWN0b3Ioc3BhY2UgPSBPZmZzZXRTcGFjZS5TcGxpbmUpIHtcbiAgICAgICAgdGhpcy5zcGFjZSA9IHNwYWNlO1xuICAgIH1cblxuICAgIGdldCBpc1plcm8oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbi5lcXVhbHMoVmVjMy5aRVJPKSAmJiB0aGlzLm1heC5lcXVhbHMoVmVjMy5aRVJPKTtcbiAgICB9XG5cbiAgICBuZXh0KHJhbmQ6ICgpID0+IG51bWJlciwgb3V0OiBWZWMzKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IHBpY2sgPSAobG86IG51bWJlciwgaGk6IG51bWJlciwgcmFuZG9tOiBib29sZWFuKSA9PiAocmFuZG9tID8gbG8gKyAoaGkgLSBsbykgKiByYW5kKCkgOiBsbyk7XG4gICAgICAgIHJldHVybiBvdXQuc2V0KFxuICAgICAgICAgICAgcGljayh0aGlzLm1pbi54LCB0aGlzLm1heC54LCB0aGlzLnJhbmRvbVgpLFxuICAgICAgICAgICAgcGljayh0aGlzLm1pbi55LCB0aGlzLm1heC55LCB0aGlzLnJhbmRvbVkpLFxuICAgICAgICAgICAgcGljayh0aGlzLm1pbi56LCB0aGlzLm1heC56LCB0aGlzLnJhbmRvbVopLFxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgQVhFUyA9IFtcbiAgICBuZXcgVmVjMygxLCAwLCAwKSwgbmV3IFZlYzMoMCwgMSwgMCksIG5ldyBWZWMzKDAsIDAsIDEpLFxuICAgIG5ldyBWZWMzKC0xLCAwLCAwKSwgbmV3IFZlYzMoMCwgLTEsIDApLCBuZXcgVmVjMygwLCAwLCAtMSksXG5dO1xuXG5jb25zdCBHRU5FUkFURURfRkxBR1MgPSBDQ09iamVjdC5GbGFncy5Eb250U2F2ZSB8IENDT2JqZWN0LkZsYWdzLkhpZGVJbkhpZXJhcmNoeSB8IENDT2JqZWN0LkZsYWdzLkxvY2tlZEluRWRpdG9yO1xuY29uc3QgUk9PVF9OQU1FID0gJ19fU3BsaW5lSW5zdGFuY2VzJztcblxuLyoqIFNtYWxsIGRldGVybWluaXN0aWMgUFJORyAobXVsYmVycnkzMikuICovXG5mdW5jdGlvbiBybmcoc2VlZDogbnVtYmVyKTogKCkgPT4gbnVtYmVyIHtcbiAgICBsZXQgYSA9IHNlZWQgPj4+IDA7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgYSA9IChhICsgMHg2ZDJiNzlmNSkgPj4+IDA7XG4gICAgICAgIGxldCB0ID0gYTtcbiAgICAgICAgdCA9IE1hdGguaW11bCh0IF4gKHQgPj4+IDE1KSwgdCB8IDEpO1xuICAgICAgICB0IF49IHQgKyBNYXRoLmltdWwodCBeICh0ID4+PiA3KSwgdCB8IDYxKTtcbiAgICAgICAgcmV0dXJuICgodCBeICh0ID4+PiAxNCkpID4+PiAwKSAvIDQyOTQ5NjcyOTY7XG4gICAgfTtcbn1cblxuY29uc3QgX3AgPSBuZXcgVmVjMygpO1xuY29uc3QgX2YgPSBuZXcgVmVjMygpO1xuY29uc3QgX3UgPSBuZXcgVmVjMygpO1xuY29uc3QgX3IgPSBuZXcgVmVjMygpO1xuY29uc3QgX3EgPSBuZXcgUXVhdCgpO1xuY29uc3QgX3EyID0gbmV3IFF1YXQoKTtcbmNvbnN0IF9vZmYgPSBuZXcgVmVjMygpO1xuXG5mdW5jdGlvbiBsb29rUm90YXRpb24ob3V0OiBRdWF0LCBmb3J3YXJkOiBSZWFkb25seTxWZWMzPiwgdXA6IFJlYWRvbmx5PFZlYzM+KTogUXVhdCB7XG4gICAgcmV0dXJuIFF1YXQuZnJvbVZpZXdVcChvdXQsIFZlYzMubm9ybWFsaXplKG5ldyBWZWMzKCksIGZvcndhcmQpLCBWZWMzLm5vcm1hbGl6ZShuZXcgVmVjMygpLCB1cCkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsYWNlbWVudCB7XG4gICAgc3BsaW5lOiBudW1iZXI7XG4gICAgdDogbnVtYmVyO1xuICAgIGl0ZW06IG51bWJlcjtcbiAgICBwb3NpdGlvbjogVmVjMztcbiAgICByb3RhdGlvbjogUXVhdDtcbiAgICBzY2FsZTogVmVjMztcbn1cblxuLyoqXG4gKiBQbGFjZXMgcHJlZmFiIGluc3RhbmNlcyBhbG9uZyB0aGUgc3BsaW5lcyBvZiBhIGNvbnRhaW5lciAoVW5pdHknc1xuICogU3BsaW5lSW5zdGFudGlhdGUpLiBJbnN0YW5jZXMgYXJlIGdlbmVyYXRlZCAobm90IHNhdmVkIHdpdGggdGhlIHNjZW5lKSBhbmRcbiAqIHJlYnVpbHQgd2hlbiB0aGUgc3BsaW5lIG9yIGEgc2V0dGluZyBjaGFuZ2VzLiBVc2UgQmFrZSBpbiB0aGUgSW5zcGVjdG9yIHRvXG4gKiB0dXJuIHRoZW0gaW50byByZWd1bGFyIG5vZGVzLlxuICovXG5AY2NjbGFzcygnU3BsaW5lSW5zdGFudGlhdGUnKVxuQGV4ZWN1dGVJbkVkaXRNb2RlXG5AbWVudSgnU3BsaW5lcy9TcGxpbmVJbnN0YW50aWF0ZScpXG5leHBvcnQgY2xhc3MgU3BsaW5lSW5zdGFudGlhdGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUNvbnRhaW5lciwgdG9vbHRpcDogJ1RoZSBzcGxpbmVzIHRvIHBsYWNlIGluc3RhbmNlcyBhbG9uZyAoYWxsIHNwbGluZXMgb2YgdGhlIGNvbnRhaW5lcikuJyB9KVxuICAgIGNvbnRhaW5lcjogU3BsaW5lQ29udGFpbmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbSW5zdGFudGlhYmxlSXRlbV0sIHRvb2x0aXA6ICdQcmVmYWJzIHRvIHBsYWNlLCBwaWNrZWQgYXQgcmFuZG9tIGJ5IHByb2JhYmlsaXR5LicgfSlcbiAgICBpdGVtczogSW5zdGFudGlhYmxlSXRlbVtdID0gW25ldyBJbnN0YW50aWFibGVJdGVtKCldO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogSW5zdGFudGlhdGVNZXRob2QsIHRvb2x0aXA6ICdIb3cgaW5zdGFuY2VzIGFyZSBzcGFjZWQuJyB9KVxuICAgIG1ldGhvZCA9IEluc3RhbnRpYXRlTWV0aG9kLlNwYWNpbmdEaXN0YW5jZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdOdW1iZXIgb2YgaW5zdGFuY2VzIHBlciBzcGxpbmUgKHJhbmRvbSBiZXR3ZWVuIHggYW5kIHkpLicsIHZpc2libGUodGhpczogU3BsaW5lSW5zdGFudGlhdGUpIHsgcmV0dXJuIHRoaXMubWV0aG9kID09PSBJbnN0YW50aWF0ZU1ldGhvZC5JbnN0YW5jZUNvdW50OyB9IH0pXG4gICAgY291bnQgPSBuZXcgVmVjMigxMCwgMTApO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ0Rpc3RhbmNlIGJldHdlZW4gaW5zdGFuY2VzIChyYW5kb20gYmV0d2VlbiB4IGFuZCB5KS4nLCB2aXNpYmxlKHRoaXM6IFNwbGluZUluc3RhbnRpYXRlKSB7IHJldHVybiB0aGlzLm1ldGhvZCAhPT0gSW5zdGFudGlhdGVNZXRob2QuSW5zdGFuY2VDb3VudDsgfSB9KVxuICAgIHNwYWNpbmcgPSBuZXcgVmVjMigxLCAxKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEluc3RhbnRpYXRlU3BhY2UsIHRvb2x0aXA6ICdBeGVzIHRoZSBpbnN0YW5jZXMgYXJlIG9yaWVudGVkIHRvLicgfSlcbiAgICBzcGFjZSA9IEluc3RhbnRpYXRlU3BhY2UuU3BsaW5lO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQWxpZ25BeGlzLCB0b29sdGlwOiAnSW5zdGFuY2UgYXhpcyB0aGF0IHBvaW50cyB1cC4nIH0pXG4gICAgdXBBeGlzID0gQWxpZ25BeGlzLllBeGlzO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQWxpZ25BeGlzLCB0b29sdGlwOiAnSW5zdGFuY2UgYXhpcyB0aGF0IHBvaW50cyBmb3J3YXJkIChhbG9uZyB0aGUgc3BsaW5lKS4nIH0pXG4gICAgZm9yd2FyZEF4aXMgPSBBbGlnbkF4aXMuWkF4aXM7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBJbnN0YW50aWF0ZU9mZnNldCwgdG9vbHRpcDogJ1Bvc2l0aW9uIG9mZnNldC4nIH0pXG4gICAgcG9zaXRpb25PZmZzZXQgPSBuZXcgSW5zdGFudGlhdGVPZmZzZXQoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEluc3RhbnRpYXRlT2Zmc2V0LCB0b29sdGlwOiAnUm90YXRpb24gb2Zmc2V0IChFdWxlciBhbmdsZXMsIGRlZ3JlZXMpLicgfSlcbiAgICByb3RhdGlvbk9mZnNldCA9IG5ldyBJbnN0YW50aWF0ZU9mZnNldCgpO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogSW5zdGFudGlhdGVPZmZzZXQsIHRvb2x0aXA6ICdTY2FsZSBvZmZzZXQgKGFkZGVkIHRvIHRoZSBwcmVmYWJcdTIwMTlzIHNjYWxlKS4nIH0pXG4gICAgc2NhbGVPZmZzZXQgPSBuZXcgSW5zdGFudGlhdGVPZmZzZXQoT2Zmc2V0U3BhY2UuT2JqZWN0KTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdSZWJ1aWxkIHdoZW4gdGhlIHNwbGluZSBvciBhIHNldHRpbmcgY2hhbmdlcy4nIH0pXG4gICAgYXV0b1JlZnJlc2ggPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1JhbmRvbSBzZWVkLicsIHN0ZXA6IDEgfSlcbiAgICBzZWVkID0gMDtcblxuICAgIHByaXZhdGUgX3Jvb3Q6IE5vZGUgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIF9zdGFtcCA9IE5hTjtcbiAgICBwcml2YXRlIF9pbnN0YW5jZXM6IE5vZGVbXSA9IFtdO1xuXG4gICAgLyoqIFRoZSBnZW5lcmF0ZWQgaW5zdGFuY2VzLiAqL1xuICAgIGdldCBpbnN0YW5jZXMoKTogcmVhZG9ubHkgTm9kZVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlcztcbiAgICB9XG5cbiAgICByZXNldEluRWRpdG9yKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29tcG9uZW50KFNwbGluZUNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29tcG9uZW50KFNwbGluZUNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5zdGFuY2VzKCk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIGlmICh0aGlzLl9yb290Py5pc1ZhbGlkKSB0aGlzLl9yb290LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fcm9vdCA9IG51bGw7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuYXV0b1JlZnJlc2gpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuY29tcHV0ZVN0YW1wKCkgIT09IHRoaXMuX3N0YW1wKSB0aGlzLnVwZGF0ZUluc3RhbmNlcygpO1xuICAgIH1cblxuICAgIC8qKiBQaWNrcyBhIG5ldyByYW5kb20gc2VlZCBhbmQgcmVidWlsZHMuICovXG4gICAgcmFuZG9taXplU2VlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWVkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMWU2KTtcbiAgICAgICAgdGhpcy51cGRhdGVJbnN0YW5jZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbXB1dGVTdGFtcCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGxldCBoID0gYyAmJiBjLmlzVmFsaWQgPyBjLmNoYW5nZVN0YW1wIDogMDtcbiAgICAgICAgY29uc3QgbWl4ID0gKHY6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaCA9IE1hdGguaW11bChoIF4gTWF0aC5yb3VuZCh2ICogMWU0KSwgMTY3Nzc2MTkpO1xuICAgICAgICB9O1xuICAgICAgICBtaXgodGhpcy5tZXRob2QpO1xuICAgICAgICBtaXgodGhpcy5jb3VudC54KTtcbiAgICAgICAgbWl4KHRoaXMuY291bnQueSk7XG4gICAgICAgIG1peCh0aGlzLnNwYWNpbmcueCk7XG4gICAgICAgIG1peCh0aGlzLnNwYWNpbmcueSk7XG4gICAgICAgIG1peCh0aGlzLnNwYWNlKTtcbiAgICAgICAgbWl4KHRoaXMudXBBeGlzKTtcbiAgICAgICAgbWl4KHRoaXMuZm9yd2FyZEF4aXMpO1xuICAgICAgICBtaXgodGhpcy5zZWVkKTtcbiAgICAgICAgZm9yIChjb25zdCBvIG9mIFt0aGlzLnBvc2l0aW9uT2Zmc2V0LCB0aGlzLnJvdGF0aW9uT2Zmc2V0LCB0aGlzLnNjYWxlT2Zmc2V0XSkge1xuICAgICAgICAgICAgbWl4KG8ubWluLngpOyBtaXgoby5taW4ueSk7IG1peChvLm1pbi56KTtcbiAgICAgICAgICAgIG1peChvLm1heC54KTsgbWl4KG8ubWF4LnkpOyBtaXgoby5tYXgueik7XG4gICAgICAgICAgICBtaXgoKG8ucmFuZG9tWCA/IDEgOiAwKSB8IChvLnJhbmRvbVkgPyAyIDogMCkgfCAoby5yYW5kb21aID8gNCA6IDApKTtcbiAgICAgICAgICAgIG1peChvLnNwYWNlKTtcbiAgICAgICAgfVxuICAgICAgICBtaXgodGhpcy5pdGVtcy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGNvbnN0IGl0IG9mIHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIG1peChpdC5wcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGl0LnByZWZhYiA/IFN0cmluZygoaXQucHJlZmFiIGFzIGFueSkuX3V1aWQgfHwgaXQucHJlZmFiLm5hbWUgfHwgJ3ByZWZhYicpIDogJyc7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkLmxlbmd0aDsgaSsrKSBtaXgoaWQuY2hhckNvZGVBdChpKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgJiYgYy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICBjb25zdCBtID0gYy5ub2RlLndvcmxkTWF0cml4O1xuICAgICAgICAgICAgbWl4KG0ubTEyKTsgbWl4KG0ubTEzKTsgbWl4KG0ubTE0KTsgbWl4KG0ubTAwKTsgbWl4KG0ubTA1KTsgbWl4KG0ubTEwKTsgbWl4KG0ubTAxKTsgbWl4KG0ubTAyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaDtcbiAgICB9XG5cbiAgICAvKiogUmVtb3ZlcyB0aGUgZ2VuZXJhdGVkIGluc3RhbmNlcy4gKi9cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBuIG9mIHRoaXMuX2luc3RhbmNlcykgaWYgKG4uaXNWYWxpZCkgbi5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlcy5sZW5ndGggPSAwO1xuICAgICAgICBpZiAodGhpcy5fcm9vdD8uaXNWYWxpZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBuIG9mIFsuLi50aGlzLl9yb290LmNoaWxkcmVuXSkgbi5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVuc3VyZVJvb3QoKTogTm9kZSB7XG4gICAgICAgIGlmICh0aGlzLl9yb290ICYmIHRoaXMuX3Jvb3QuaXNWYWxpZCAmJiB0aGlzLl9yb290LnBhcmVudCA9PT0gdGhpcy5ub2RlKSByZXR1cm4gdGhpcy5fcm9vdDtcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLm5vZGUuY2hpbGRyZW4uZmluZCgobikgPT4gbi5uYW1lID09PSBST09UX05BTUUgJiYgKG4gYXMgYW55KS5fb2JqRmxhZ3MgJiBDQ09iamVjdC5GbGFncy5Eb250U2F2ZSkgfHwgbnVsbDtcbiAgICAgICAgaWYgKCFyb290KSB7XG4gICAgICAgICAgICByb290ID0gbmV3IE5vZGUoUk9PVF9OQU1FKTtcbiAgICAgICAgICAgIChyb290IGFzIGFueSkuX29iakZsYWdzIHw9IEdFTkVSQVRFRF9GTEFHUztcbiAgICAgICAgICAgIHJvb3QucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jvb3QgPSByb290O1xuICAgICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG5cbiAgICAvKiogV2hlcmUgaW5zdGFuY2VzIGdvOiBwb3NpdGlvbnMsIHJvdGF0aW9ucyBhbmQgc2NhbGVzICh3b3JsZCBzcGFjZSkgYW5kIHdoaWNoIGl0ZW0uICovXG4gICAgY29tcHV0ZVBsYWNlbWVudHMoKTogUGxhY2VtZW50W10ge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGNvbnN0IHJlczogUGxhY2VtZW50W10gPSBbXTtcbiAgICAgICAgaWYgKCFjIHx8ICFjLmlzVmFsaWQpIHJldHVybiByZXM7XG4gICAgICAgIGNvbnN0IHdlaWdodHMgPSB0aGlzLml0ZW1zLm1hcCgoaXQpID0+IChpdC5wcmVmYWIgPyBNYXRoLm1heCgwLCBpdC5wcm9iYWJpbGl0eSkgOiAwKSk7XG4gICAgICAgIGNvbnN0IHRvdGFsID0gd2VpZ2h0cy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiAgICAgICAgaWYgKHRvdGFsIDw9IDApIHJldHVybiByZXM7XG4gICAgICAgIGNvbnN0IHJhbmQgPSBybmcodGhpcy5zZWVkICogNzkxOSArIDEpO1xuICAgICAgICBjb25zdCBwaWNrSXRlbSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCByID0gcmFuZCgpICogdG90YWw7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlaWdodHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByIC09IHdlaWdodHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHIgPCAwICYmIHdlaWdodHNbaV0gPiAwKSByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB3ZWlnaHRzLmZpbmRJbmRleCgodykgPT4gdyA+IDApO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmd2RBeGlzID0gQVhFU1t0aGlzLmZvcndhcmRBeGlzXSA/PyBBWEVTWzJdO1xuICAgICAgICBsZXQgdXBBeGlzID0gQVhFU1t0aGlzLnVwQXhpc10gPz8gQVhFU1sxXTtcbiAgICAgICAgaWYgKE1hdGguYWJzKFZlYzMuZG90KGZ3ZEF4aXMsIHVwQXhpcykpID4gMC45OSkgdXBBeGlzID0gTWF0aC5hYnMoZndkQXhpcy55KSA+IDAuOTkgPyBBWEVTWzJdIDogQVhFU1sxXTtcbiAgICAgICAgY29uc3QgcmVtYXAgPSBRdWF0LmludmVydChuZXcgUXVhdCgpLCBsb29rUm90YXRpb24obmV3IFF1YXQoKSwgZndkQXhpcywgdXBBeGlzKSk7XG5cbiAgICAgICAgZm9yIChsZXQgc2kgPSAwOyBzaSA8IGMuc3BsaW5lcy5sZW5ndGg7IHNpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbc2ldO1xuICAgICAgICAgICAgaWYgKHMuY291bnQgPCAyKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGMuY2FsY3VsYXRlTGVuZ3RoKHNpKTtcbiAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMWUtNikgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCB0cyA9IHRoaXMuZGlzdHJpYnV0ZVQoYywgc2ksIGxlbmd0aCwgcy5jbG9zZWQsIHJhbmQpO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0IG9mIHRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHBpY2tJdGVtKCk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gPCAwKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjLmV2YWx1YXRlUG9zaXRpb24odCwgc2ksIF9wKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnN0YW50aWF0ZVNwYWNlLlNwbGluZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuZXZhbHVhdGVEaXJlY3Rpb24odCwgc2ksIF9mKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuZXZhbHVhdGVVcFZlY3Rvcih0LCBzaSwgX3UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSW5zdGFudGlhdGVTcGFjZS5TcGxpbmVPYmplY3Q6XG4gICAgICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX2YsIFZlYzMuVU5JVF9aLCBjLm5vZGUud29ybGRSb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX3UsIFZlYzMuVU5JVF9ZLCBjLm5vZGUud29ybGRSb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9mLnNldCgwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF91LnNldCgwLCAxLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZSA9IGxvb2tSb3RhdGlvbihuZXcgUXVhdCgpLCBfZiwgX3UpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdGF0aW9uID0gUXVhdC5tdWx0aXBseShuZXcgUXVhdCgpLCBmcmFtZSwgcmVtYXApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gX3AuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmVmYWJOb2RlID0gdGhpcy5pdGVtc1tpdGVtXS5wcmVmYWIhLmRhdGEgYXMgTm9kZTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IHByZWZhYk5vZGUgPyBwcmVmYWJOb2RlLnNjYWxlLmNsb25lKCkgOiBuZXcgVmVjMygxLCAxLCAxKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wb3NpdGlvbk9mZnNldC5pc1plcm8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbk9mZnNldC5uZXh0KHJhbmQsIF9vZmYpO1xuICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX29mZiwgX29mZiwgdGhpcy5vZmZzZXRSb3RhdGlvbih0aGlzLnBvc2l0aW9uT2Zmc2V0LnNwYWNlLCBmcmFtZSwgYywgcm90YXRpb24pKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24uYWRkKF9vZmYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucm90YXRpb25PZmZzZXQuaXNaZXJvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm90YXRpb25PZmZzZXQubmV4dChyYW5kLCBfb2ZmKTtcbiAgICAgICAgICAgICAgICAgICAgUXVhdC5mcm9tRXVsZXIoX3EyLCBfb2ZmLngsIF9vZmYueSwgX29mZi56KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3AgPSB0aGlzLnJvdGF0aW9uT2Zmc2V0LnNwYWNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3AgPT09IE9mZnNldFNwYWNlLk9iamVjdCkgUXVhdC5tdWx0aXBseShyb3RhdGlvbiwgcm90YXRpb24sIF9xMik7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUm90YXRlIGFib3V0IHRoZSBjaG9zZW4gYXhlczogUicgPSBTICogXHUwMzk0ICogU1x1MjA3Qlx1MDBCOSAqIFJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFMgPSB0aGlzLm9mZnNldFJvdGF0aW9uKHNwLCBmcmFtZSwgYywgcm90YXRpb24pLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBRdWF0Lm11bHRpcGx5KF9xLCBTLCBfcTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgUXVhdC5tdWx0aXBseShfcSwgX3EsIFF1YXQuaW52ZXJ0KG5ldyBRdWF0KCksIFMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFF1YXQubXVsdGlwbHkocm90YXRpb24sIF9xLCByb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNjYWxlT2Zmc2V0LmlzWmVybykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYWxlT2Zmc2V0Lm5leHQocmFuZCwgX29mZik7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlLmFkZChfb2ZmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goeyBzcGxpbmU6IHNpLCB0LCBpdGVtLCBwb3NpdGlvbiwgcm90YXRpb24sIHNjYWxlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvZmZzZXRSb3RhdGlvbihzcGFjZTogT2Zmc2V0U3BhY2UsIHNwbGluZUZyYW1lOiBRdWF0LCBjOiBTcGxpbmVDb250YWluZXIsIGluc3RhbmNlUm90YXRpb246IFF1YXQpOiBRdWF0IHtcbiAgICAgICAgc3dpdGNoIChzcGFjZSkge1xuICAgICAgICAgICAgY2FzZSBPZmZzZXRTcGFjZS5TcGxpbmU6IHJldHVybiBzcGxpbmVGcmFtZTtcbiAgICAgICAgICAgIGNhc2UgT2Zmc2V0U3BhY2UuU3BsaW5lT2JqZWN0OiByZXR1cm4gYy5ub2RlLndvcmxkUm90YXRpb24gYXMgUXVhdDtcbiAgICAgICAgICAgIGNhc2UgT2Zmc2V0U3BhY2UuT2JqZWN0OiByZXR1cm4gaW5zdGFuY2VSb3RhdGlvbjtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBRdWF0LklERU5USVRZIGFzIFF1YXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTm9ybWFsaXplZCB0IHZhbHVlcyBvZiB0aGUgaW5zdGFuY2VzIG9uIG9uZSBzcGxpbmUuICovXG4gICAgcHJpdmF0ZSBkaXN0cmlidXRlVChjOiBTcGxpbmVDb250YWluZXIsIHNpOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBjbG9zZWQ6IGJvb2xlYW4sIHJhbmQ6ICgpID0+IG51bWJlcik6IG51bWJlcltdIHtcbiAgICAgICAgY29uc3QgdHM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IGxvID0gKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBNYXRoLm1pbihhLCBiKTtcbiAgICAgICAgY29uc3QgaGkgPSAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IE1hdGgubWF4KGEsIGIpO1xuICAgICAgICBpZiAodGhpcy5tZXRob2QgPT09IEluc3RhbnRpYXRlTWV0aG9kLkluc3RhbmNlQ291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSBNYXRoLm1heCgwLCBNYXRoLnJvdW5kKGxvKHRoaXMuY291bnQueCwgdGhpcy5jb3VudC55KSkpO1xuICAgICAgICAgICAgY29uc3QgYiA9IE1hdGgubWF4KDAsIE1hdGgucm91bmQoaGkodGhpcy5jb3VudC54LCB0aGlzLmNvdW50LnkpKSk7XG4gICAgICAgICAgICBjb25zdCBuID0gYSArIE1hdGguZmxvb3IocmFuZCgpICogKGIgLSBhICsgMSkpO1xuICAgICAgICAgICAgaWYgKG4gPT09IDEpIHRzLnB1c2goMCk7XG4gICAgICAgICAgICBlbHNlIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB0cy5wdXNoKGNsb3NlZCA/IGkgLyBuIDogaSAvIChuIC0gMSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1pblMgPSBNYXRoLm1heCgxZS0zLCBsbyh0aGlzLnNwYWNpbmcueCwgdGhpcy5zcGFjaW5nLnkpKTtcbiAgICAgICAgY29uc3QgbWF4UyA9IE1hdGgubWF4KG1pblMsIGhpKHRoaXMuc3BhY2luZy54LCB0aGlzLnNwYWNpbmcueSkpO1xuICAgICAgICBjb25zdCBuZXh0ID0gKCkgPT4gbWluUyArIChtYXhTIC0gbWluUykgKiByYW5kKCk7XG4gICAgICAgIGNvbnN0IE1BWCA9IDEwMDAwO1xuICAgICAgICBpZiAodGhpcy5tZXRob2QgPT09IEluc3RhbnRpYXRlTWV0aG9kLlNwYWNpbmdEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IGQgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGQgPD0gbGVuZ3RoICsgMWUtNiAmJiB0cy5sZW5ndGggPCBNQVgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VkICYmIGQgPj0gbGVuZ3RoIC0gMWUtNiAmJiB0cy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgIHRzLnB1c2goTWF0aC5taW4oMSwgZCAvIGxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIGQgKz0gbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRzO1xuICAgICAgICB9XG4gICAgICAgIC8vIExpbmVhciBkaXN0YW5jZTogd2FsayB0aGUgc3BsaW5lIHVudGlsIHRoZSBzdHJhaWdodC1saW5lIGRpc3RhbmNlIHJlYWNoZXMgdGhlIHNwYWNpbmcuXG4gICAgICAgIGNvbnN0IHN0ZXBzID0gTWF0aC5tYXgoNjQsIE1hdGguY2VpbChsZW5ndGggLyBtaW5TKSAqIDgpO1xuICAgICAgICBsZXQgdCA9IDA7XG4gICAgICAgIHRzLnB1c2goMCk7XG4gICAgICAgIGNvbnN0IGZyb20gPSBjLmV2YWx1YXRlUG9zaXRpb24oMCwgc2ksIG5ldyBWZWMzKCkpO1xuICAgICAgICBsZXQgd2FudCA9IG5leHQoKTtcbiAgICAgICAgY29uc3QgcCA9IG5ldyBWZWMzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHN0ZXBzICYmIHRzLmxlbmd0aCA8IE1BWDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0aSA9IGkgLyBzdGVwcztcbiAgICAgICAgICAgIGMuZXZhbHVhdGVQb3NpdGlvbih0aSwgc2ksIHApO1xuICAgICAgICAgICAgaWYgKFZlYzMuZGlzdGFuY2UocCwgZnJvbSkgPj0gd2FudCAtIDFlLTYpIHtcbiAgICAgICAgICAgICAgICAvLyBSZWZpbmUgYmV0d2VlbiB0aGUgcHJldmlvdXMgc3RlcCBhbmQgdGhpcyBvbmUuXG4gICAgICAgICAgICAgICAgbGV0IGEgPSB0O1xuICAgICAgICAgICAgICAgIGxldCBiID0gdGk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMjsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG0gPSAoYSArIGIpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgYy5ldmFsdWF0ZVBvc2l0aW9uKG0sIHNpLCBwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZlYzMuZGlzdGFuY2UocCwgZnJvbSkgPj0gd2FudCAtIDFlLTYpIGIgPSBtO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGEgPSBtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VkICYmIGIgPj0gMSAtIDFlLTYpIGJyZWFrO1xuICAgICAgICAgICAgICAgIHRzLnB1c2goYik7XG4gICAgICAgICAgICAgICAgYy5ldmFsdWF0ZVBvc2l0aW9uKGIsIHNpLCBmcm9tKTtcbiAgICAgICAgICAgICAgICB3YW50ID0gbmV4dCgpO1xuICAgICAgICAgICAgICAgIHQgPSBiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ID0gdGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRzO1xuICAgIH1cblxuICAgIC8qKiBSZWJ1aWxkcyB0aGUgaW5zdGFuY2VzIG5vdy4gKi9cbiAgICB1cGRhdGVJbnN0YW5jZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N0YW1wID0gdGhpcy5jb21wdXRlU3RhbXAoKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG4gICAgICAgIGNvbnN0IHBsYWNlbWVudHMgPSB0aGlzLmNvbXB1dGVQbGFjZW1lbnRzKCk7XG4gICAgICAgIGlmICghcGxhY2VtZW50cy5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuZW5zdXJlUm9vdCgpO1xuICAgICAgICByb290LmxheWVyID0gdGhpcy5ub2RlLmxheWVyO1xuICAgICAgICBmb3IgKGNvbnN0IHBsIG9mIHBsYWNlbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZWZhYiA9IHRoaXMuaXRlbXNbcGwuaXRlbV0ucHJlZmFiO1xuICAgICAgICAgICAgaWYgKCFwcmVmYWIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgbiA9IGluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgICAgICAobiBhcyBhbnkpLl9vYmpGbGFncyB8PSBHRU5FUkFURURfRkxBR1M7XG4gICAgICAgICAgICBuLnBhcmVudCA9IHJvb3Q7XG4gICAgICAgICAgICBuLnNldFdvcmxkUG9zaXRpb24ocGwucG9zaXRpb24pO1xuICAgICAgICAgICAgbi5zZXRXb3JsZFJvdGF0aW9uKHBsLnJvdGF0aW9uKTtcbiAgICAgICAgICAgIG4uc2V0U2NhbGUocGwuc2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VzLnB1c2gobik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRWRpdG9yIGhlbHBlcjogcGxhY2VtZW50cyB3aXRoIHByZWZhYiB1dWlkcywgZm9yIGJha2luZyBpbnRvIHJlZ3VsYXIgbm9kZXMuICovXG4gICAgX2Jha2VJbmZvKCk6IHsgcHJlZmFiOiBzdHJpbmc7IHBvc2l0aW9uOiBudW1iZXJbXTsgcm90YXRpb246IG51bWJlcltdOyBzY2FsZTogbnVtYmVyW10gfVtdIHtcbiAgICAgICAgaWYgKCFFRElUT1IpIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcHV0ZVBsYWNlbWVudHMoKVxuICAgICAgICAgICAgLmZpbHRlcigocCkgPT4gdGhpcy5pdGVtc1twLml0ZW1dLnByZWZhYilcbiAgICAgICAgICAgIC5tYXAoKHApID0+ICh7XG4gICAgICAgICAgICAgICAgcHJlZmFiOiAodGhpcy5pdGVtc1twLml0ZW1dLnByZWZhYiBhcyBhbnkpLl91dWlkIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogW3AucG9zaXRpb24ueCwgcC5wb3NpdGlvbi55LCBwLnBvc2l0aW9uLnpdLFxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBbcC5yb3RhdGlvbi54LCBwLnJvdGF0aW9uLnksIHAucm90YXRpb24ueiwgcC5yb3RhdGlvbi53XSxcbiAgICAgICAgICAgICAgICBzY2FsZTogW3Auc2NhbGUueCwgcC5zY2FsZS55LCBwLnNjYWxlLnpdLFxuICAgICAgICAgICAgfSkpO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBWZWMzIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgU3BsaW5lLCBzcGxpbmVGYWN0b3J5LCBQYXRoSW5kZXhVbml0IH0gZnJvbSAnLi9TcGxpbmUnO1xuaW1wb3J0IHsgYnVpbGRTaGFwZSwgU2hhcGVPcHRpb25zIH0gZnJvbSAnLi4vY29yZS9zcGxpbmUtY29yZSc7XG5cbmV4cG9ydCB0eXBlIFNwbGluZVNoYXBlID0gJ2xpbmUnIHwgJ3NxdWFyZScgfCAncm91bmRlZC1zcXVhcmUnIHwgJ2NpcmNsZScgfCAncG9seWdvbicgfCAnc3RhcicgfCAnaGVsaXgnO1xuXG4vKipcbiAqIFN0YXRpYyBoZWxwZXJzIGluIHRoZSBzdHlsZSBvZiBVbml0eSdzIFNwbGluZVV0aWxpdHkgLyBTcGxpbmVGYWN0b3J5LlxuICogQWxsIHBvc2l0aW9ucyBhcmUgaW4gdGhlIHNwbGluZSdzIGxvY2FsIHNwYWNlOyB0IGlzIGEgbm9ybWFsaXplZCBkaXN0YW5jZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFNwbGluZVV0aWxpdHkge1xuICAgIHN0YXRpYyBldmFsdWF0ZVBvc2l0aW9uKHNwbGluZTogU3BsaW5lLCB0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIHNwbGluZS5ldmFsdWF0ZVBvc2l0aW9uKHQsIG91dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGV2YWx1YXRlVGFuZ2VudChzcGxpbmU6IFNwbGluZSwgdDogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBzcGxpbmUuZXZhbHVhdGVUYW5nZW50KHQsIG91dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGV2YWx1YXRlRGlyZWN0aW9uKHNwbGluZTogU3BsaW5lLCB0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIHNwbGluZS5ldmFsdWF0ZURpcmVjdGlvbih0LCBvdXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBldmFsdWF0ZVVwVmVjdG9yKHNwbGluZTogU3BsaW5lLCB0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIHNwbGluZS5ldmFsdWF0ZVVwVmVjdG9yKHQsIG91dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNhbGN1bGF0ZUxlbmd0aChzcGxpbmU6IFNwbGluZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzcGxpbmUuZ2V0TGVuZ3RoKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5lYXJlc3RQb2ludChzcGxpbmU6IFNwbGluZSwgcG9pbnQ6IFJlYWRvbmx5PFZlYzM+KTogeyB0OiBudW1iZXI7IHBvc2l0aW9uOiBWZWMzOyBkaXN0YW5jZTogbnVtYmVyIH0ge1xuICAgICAgICByZXR1cm4gc3BsaW5lLmdldE5lYXJlc3RQb2ludChwb2ludCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBwb2ludCBgZGlzdGFuY2VgIGFsb25nIHRoZSBzcGxpbmUgZnJvbSBgZnJvbVRgIChuZWdhdGl2ZSBnb2VzIGJhY2spLiAqL1xuICAgIHN0YXRpYyBnZXRQb2ludEF0RGlzdGFuY2Uoc3BsaW5lOiBTcGxpbmUsIGZyb21UOiBudW1iZXIsIGRpc3RhbmNlOiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiB7IHQ6IG51bWJlcjsgcG9zaXRpb246IFZlYzMgfSB7XG4gICAgICAgIGNvbnN0IHQgPSBzcGxpbmUuZ2V0VEF0RGlzdGFuY2UoZnJvbVQsIGRpc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIHsgdCwgcG9zaXRpb246IHNwbGluZS5ldmFsdWF0ZVBvc2l0aW9uKHQsIG91dCkgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udmVydEluZGV4VW5pdChzcGxpbmU6IFNwbGluZSwgdmFsdWU6IG51bWJlciwgZnJvbTogUGF0aEluZGV4VW5pdCwgdG86IFBhdGhJbmRleFVuaXQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc3BsaW5lLmNvbnZlcnRJbmRleFVuaXQodmFsdWUsIGZyb20sIHRvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIG5ldyBzcGxpbmUgaW4gYSB0ZW1wbGF0ZSBzaGFwZSAobGlrZSBVbml0eSdzIFNwbGluZUZhY3RvcnkpLlxuICAgICAqIGBzaXplYCBpcyB0aGUgaGFsZiB3aWR0aCAvIHJhZGl1czsgYHBsYW5lMkRgIGxheXMgaXQgaW4gWFkgaW5zdGVhZCBvZiBYWi5cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlU2hhcGUoc2hhcGU6IFNwbGluZVNoYXBlLCBvcHRpb25zOiBQYXJ0aWFsPFNoYXBlT3B0aW9ucz4gPSB7fSk6IFNwbGluZSB7XG4gICAgICAgIGNvbnN0IHMgPSBuZXcgU3BsaW5lKCk7XG4gICAgICAgIGJ1aWxkU2hhcGUocywgc2hhcGUsIHsgc2l6ZTogMSwgLi4ub3B0aW9ucyB9LCBzcGxpbmVGYWN0b3J5KTtcbiAgICAgICAgcy5tYXJrRGlydHkoKTtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgLyoqIEZpbGxzIGFuIGV4aXN0aW5nIHNwbGluZSB3aXRoIGEgdGVtcGxhdGUgc2hhcGUuICovXG4gICAgc3RhdGljIHNldFNoYXBlKHNwbGluZTogU3BsaW5lLCBzaGFwZTogU3BsaW5lU2hhcGUsIG9wdGlvbnM6IFBhcnRpYWw8U2hhcGVPcHRpb25zPiA9IHt9KTogdm9pZCB7XG4gICAgICAgIGJ1aWxkU2hhcGUoc3BsaW5lLCBzaGFwZSwgeyBzaXplOiAxLCAuLi5vcHRpb25zIH0sIHNwbGluZUZhY3RvcnkpO1xuICAgICAgICBzcGxpbmUubWFya0RpcnR5KCk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBQYXRoSW5kZXhVbml0IH07XG4iLCAiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuXG5leHBvcnQgY29uc3QgcmVzdWx0cyA9IHsgcGFzc2VkOiAwLCBmYWlsZWQ6IDAgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QobmFtZTogc3RyaW5nLCBmbjogKCkgPT4gdm9pZCkge1xuICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICAgIHJlc3VsdHMucGFzc2VkKys7XG4gICAgICAgIGNvbnNvbGUubG9nKGAgIG9rICAgJHtuYW1lfWApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVzdWx0cy5mYWlsZWQrKztcbiAgICAgICAgY29uc3QgZXJyID0gZSBhcyBFcnJvcjtcbiAgICAgICAgY29uc3QgZGV0YWlsID0gZXJyIGluc3RhbmNlb2YgYXNzZXJ0LkFzc2VydGlvbkVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyPy5zdGFjayB8fCBlcnIpLnNwbGl0KCdcXG4nKS5zbGljZSgwLCA1KS5qb2luKCdcXG4nKTtcbiAgICAgICAgY29uc29sZS5sb2coYCAgRkFJTCAke25hbWV9XFxuICAgICAgICR7ZGV0YWlsLnNwbGl0KCdcXG4nKS5qb2luKCdcXG4gICAgICAgJyl9YCk7XG4gICAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsSUFBQUEsaUJBQW1COzs7QUNHWixJQUFNLFFBQU4sTUFBTSxNQUFLO0FBQUEsRUFPZCxZQUFtQixJQUFJLEdBQVUsSUFBSSxHQUFVLElBQUksR0FBRztBQUFuQztBQUFjO0FBQWM7QUFDM0MsUUFBSSxPQUFPLE1BQU0sVUFBVTtBQUN2QixZQUFNLElBQUk7QUFDVixXQUFLLElBQUksRUFBRTtBQUNYLFdBQUssSUFBSSxFQUFFO0FBQ1gsV0FBSyxJQUFJLEVBQUU7QUFBQSxJQUNmO0FBQUEsRUFDSjtBQUFBLEVBRUEsSUFBSSxJQUFTLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBUztBQUNoQyxRQUFJLE9BQU8sTUFBTSxVQUFVO0FBQ3ZCLFdBQUssSUFBSSxFQUFFO0FBQ1gsV0FBSyxJQUFJLEVBQUU7QUFDWCxXQUFLLElBQUksRUFBRTtBQUFBLElBQ2YsT0FBTztBQUNILFdBQUssSUFBSTtBQUNULFdBQUssSUFBSTtBQUNULFdBQUssSUFBSTtBQUFBLElBQ2I7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBRUEsUUFBUTtBQUNKLFdBQU8sSUFBSSxNQUFLLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQUEsRUFDMUM7QUFBQSxFQUVBLElBQUksR0FBUTtBQUNSLFNBQUssS0FBSyxFQUFFO0FBQ1osU0FBSyxLQUFLLEVBQUU7QUFDWixTQUFLLEtBQUssRUFBRTtBQUNaLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFFQSxZQUFZO0FBQ1IsV0FBTyxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUs7QUFBQSxFQUM3RDtBQUFBLEVBRUEsU0FBUztBQUNMLFdBQU8sS0FBSyxLQUFLLEtBQUssVUFBVSxDQUFDO0FBQUEsRUFD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LEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUN0RCxVQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDdEQsVUFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3RELFVBQU0sSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUN0RCxRQUFJLElBQUk7QUFDUixRQUFJLElBQUk7QUFDUixRQUFJLElBQUk7QUFDUixRQUFJLElBQUk7QUFDUixXQUFPO0FBQUEsRUFDWDtBQUFBLEVBRUEsT0FBTyxPQUFPLEtBQVUsR0FBUTtBQUM1QixVQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDdEQsVUFBTSxNQUFNLElBQUksSUFBSSxJQUFJO0FBQ3hCLFFBQUksSUFBSSxDQUFDLEVBQUUsSUFBSTtBQUNmLFFBQUksSUFBSSxDQUFDLEVBQUUsSUFBSTtBQUNmLFFBQUksSUFBSSxDQUFDLEVBQUUsSUFBSTtBQUNmLFFBQUksSUFBSSxFQUFFLElBQUk7QUFDZCxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBRUEsT0FBTyxVQUFVLEtBQVUsR0FBVyxHQUFXLEdBQVc7QUFDeEQsVUFBTSxJQUFLLE1BQU0sS0FBSyxLQUFNO0FBQzVCLFNBQUs7QUFDTCxTQUFLO0FBQ0wsU0FBSztBQUNMLFVBQU0sS0FBSyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLElBQUks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ekYsVUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDeEYsVUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDeEYsVUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDeEYsVUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDeEYsUUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1RSxRQUFJLENBQUMsSUFBSyxRQUFPLE1BQUssVUFBVSxLQUFLLE1BQUssUUFBUSxDQUFDLEdBQUcsTUFBSyxRQUFRLENBQUM7QUFDcEUsVUFBTSxJQUFJO0FBQ1YsV0FBTyxNQUFLLFVBQVUsS0FBSztBQUFBLE9BQ3RCLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsT0FBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLE9BQ2hGLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsT0FBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLE9BQ2hGLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsT0FBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLE9BQ2hGLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsT0FBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLE9BQ2hGLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsT0FBTSxNQUFNLE1BQU0sTUFBTSxN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QUFDO0FBQy9CO0FBRU8sU0FBUyxXQUF5QixLQUFRLEdBQVU7QUFDdkQsUUFBTSxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ2pFLE1BQUksSUFBSSxRQUFTLFFBQU8sVUFBVSxHQUFHO0FBQ3JDLFNBQU8sS0FBSyxLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQ3ZEO0FBR08sU0FBUyxRQUFzQixLQUFRLEdBQVU7QUFDcEQsUUFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3RELE1BQUksSUFBSSxRQUFTLFFBQU8sVUFBVSxHQUFHO0FBQ3JDLFNBQU8sS0FBSyxLQUFLLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQzFEO0FBR08sU0FBUyxRQUFzQixLQUFRLEdBQU8sR0FBVTtBQUUzRCxRQUFNLEtBQUssS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3BDLFFBQU0sS0FBSyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDcEMsUUFBTSxLQUFLLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNwQyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUM3QyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUM3QyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFB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TUFBTSxJQUFJLElBQUksR0FBRyxnQkFBZ0I7QUFDcEQsSUFBRSxnQkFBZ0I7QUFDbEIsaUJBQUFBLFFBQU8sZ0JBQWdCLEVBQUUsVUFBVSxJQUFJLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxHQUFHLEVBQUU7QUFDcEUsSUFBRSxPQUFPO0FBQ1QsSUFBRSxnQkFBZ0I7QUFDbEIsaUJBQUFBLFFBQU8sbUJBQW1CLEVBQUUsVUFBVSxJQUFJLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxHQUFHLEVBQUU7QUFDM0UsQ0FBQztBQUVELEtBQUsscUNBQXFDLE1BQU07QUFDNUMsUUFBTSxLQUFLLGNBQWMsQ0FBQztBQUMxQixhQUFXLEtBQUssR0FBRyxXQUFXO0FBQzFCLFFBQUksVUFBVTtBQUNkLGFBQVMsSUFBUyxHQUFHLEdBQUcsSUFBSSxFQUFFLE9BQVEsS0FBSSxFQUFFLFlBQWUsU0FBUyxNQUFNLFNBQVUsV0FBVTtBQUM5RixtQkFBQUEsUUFBTyxHQUFHLE9BQU87QUFBQSxFQUNyQjtBQUNBLFFBQU0sT0FBTyxHQUFHLFVBQVU7QUFDMUIsaUJBQUFBLFFBQU8sWUFBWSxLQUFLLFFBQVEsR0FBRyxVQUFVLE1BQU07QUFDdkQsQ0FBQztBQUVELFFBQVEsSUFBSTtBQUFBLEVBQUssUUFBUSxNQUFNLFlBQVksUUFBUSxNQUFNLFNBQVM7QUFDbEUsUUFBUSxXQUFXLFFBQVEsU0FBUyxJQUFJOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfYXNzZXJ0IiwgInMiLCAiVGFuZ2VudE1vZGUiLCAidXAiLCAiYyIsICJhZGQiLCAiZyIsICJjY2NsYXNzIiwgInByb3BlcnR5IiwgImNjY2xhc3MiLCAicHJvcGVydHkiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJwcm9wZXJ0eSIsICJjY2NsYXNzIiwgImNjY2xhc3MiLCAicHJvcGVydHkiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJtZW51IiwgIlNwbGluZUFuaW1hdGVNZXRob2QiLCAiU3BsaW5lQW5pbWF0ZUxvb3BNb2RlIiwgIlNwbGluZUFuaW1hdGVFYXNpbmciLCAiU3BsaW5lQW5pbWF0ZUFsaWdubWVudCIsICJBbGlnbkF4aXMiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJleGVjdXRlSW5FZGl0TW9kZSIsICJtZW51IiwgIkV4dHJ1ZGVTaGFwZSIsICJfbSIsICJtaXgiLCAiZGlzdCIsICJjY2NsYXNzIiwgInByb3BlcnR5IiwgImV4ZWN1dGVJbkVkaXRNb2RlIiwgIm1lbnUiLCAiSW5zdGFudGlhdGVNZXRob2QiLCAiSW5zdGFudGlhdGVTcGFjZSIsICJPZmZzZXRTcGFjZSIsICJBWEVTIiwgIkdFTkVSQVRFRF9GTEFHUyIsICJfcCIsICJfZiIsICJfdSIsICJfciIsICJsb29rUm90YXRpb24iLCAibWl4IiwgInNjYWxlIiwgImFzc2VydCIsICJhc3NlcnQiLCAibGVuIl0KfQo=
