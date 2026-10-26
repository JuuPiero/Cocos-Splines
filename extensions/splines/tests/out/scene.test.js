"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key2, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key2) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key2, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key2, result);
  return result;
};

// tests/stubs/cc.ts
var cc_exports = {};
__export(cc_exports, {
  CCInteger: () => CCInteger,
  CCObject: () => CCObject,
  Color: () => Color,
  Component: () => Component,
  Director: () => Director,
  EventHandler: () => EventHandler,
  Mat4: () => Mat4,
  Material: () => Material,
  Mesh: () => Mesh,
  MeshRenderer: () => MeshRenderer,
  Node: () => Node,
  Prefab: () => Prefab,
  Quat: () => Quat,
  Vec2: () => Vec2,
  Vec3: () => Vec3,
  _decorator: () => _decorator,
  ccenum: () => ccenum,
  director: () => director,
  game: () => game,
  geometry: () => geometry,
  instantiate: () => instantiate,
  js: () => js,
  makeUuid: () => makeUuid,
  renderer: () => renderer,
  utils: () => utils
});
function makeUuid(prefix = "id") {
  return `${prefix}-${++uuidSeq}`;
}
function ccclass(name) {
  return (ctor) => {
    ctor.__cid = name;
    classes.set(name, ctor);
    return ctor;
  };
}
function property(...args) {
  if (args.length >= 2 && typeof args[1] === "string") return void 0;
  return () => void 0;
}
function ccenum(_e) {
  return _e;
}
function instantiate(p) {
  const n = new Node(p.data.name);
  n.scale.set(p.data.scale);
  return n;
}
var _Vec3, Vec3, Vec2, _Quat, Quat, _Mat4, Mat4, Color, CCObject, uuidSeq, Node, Component, classes, noopDecorator, _decorator, CCInteger, js, EventHandler, Material, Mesh, MeshRenderer, Prefab, utils, directorListeners, totalFrames, director, Director, renderer, geometry, game;
var init_cc = __esm({
  "tests/stubs/cc.ts"() {
    "use strict";
    _Vec3 = class _Vec3 {
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
    Vec3 = _Vec3;
    Vec2 = class _Vec2 {
      constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }
      clone() {
        return new _Vec2(this.x, this.y);
      }
    };
    _Quat = class _Quat {
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
    Quat = _Quat;
    _Mat4 = class _Mat4 {
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
        for (let c2 = 0; c2 < 4; c2++) for (let r = 0; r < 4; r++) {
          let s = 0;
          for (let k = 0; k < 4; k++) s += A[k * 4 + r] * B[c2 * 4 + k];
          R[c2 * 4 + r] = s;
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
    Mat4 = _Mat4;
    Color = class {
      constructor(r = 255, g = 255, b = 255, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
      }
    };
    CCObject = {
      Flags: {
        DontSave: 1 << 3,
        EditorOnly: 1 << 4,
        LockedInEditor: 1 << 9,
        HideInHierarchy: 1 << 10
      }
    };
    uuidSeq = 0;
    Node = class {
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
        return this.components.find((c2) => typeof C === "string" ? c2.constructor.__cid === C : c2 instanceof C) ?? null;
      }
      addComponent(C) {
        const c2 = new C();
        c2.node = this;
        this.components.push(c2);
        c2.__start();
        return c2;
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
        for (const c2 of this.components) c2.__destroy();
        this.setParent(null);
      }
    };
    Component = class {
      constructor() {
        this.uuid = makeUuid("comp");
        this._enabled = true;
        this.isValid = true;
      }
      get enabled() {
        return this._enabled;
      }
      set enabled(v) {
        var _a2, _b2;
        if (v === this._enabled) return;
        this._enabled = v;
        if (v) (_a2 = this.onEnable) == null ? void 0 : _a2.call(this);
        else (_b2 = this.onDisable) == null ? void 0 : _b2.call(this);
      }
      get enabledInHierarchy() {
        return this._enabled && this.node.activeInHierarchy;
      }
      getComponent(C) {
        return this.node.getComponent(C);
      }
      __start() {
        var _a2, _b2;
        (_a2 = this.onLoad) == null ? void 0 : _a2.call(this);
        if (this._enabled) (_b2 = this.onEnable) == null ? void 0 : _b2.call(this);
      }
      __destroy() {
        var _a2, _b2;
        if (this._enabled) (_a2 = this.onDisable) == null ? void 0 : _a2.call(this);
        (_b2 = this.onDestroy) == null ? void 0 : _b2.call(this);
        this.isValid = false;
      }
      destroy() {
        this.__destroy();
        this.node.components.splice(this.node.components.indexOf(this), 1);
      }
    };
    classes = /* @__PURE__ */ new Map();
    noopDecorator = (..._a2) => (..._b2) => void 0;
    _decorator = {
      ccclass,
      property,
      executeInEditMode: (ctor) => ctor,
      disallowMultiple: (ctor) => ctor,
      menu: noopDecorator,
      requireComponent: noopDecorator
    };
    CCInteger = "Integer";
    js = {
      getClassByName(name) {
        return classes.get(name) ?? null;
      }
    };
    EventHandler = class {
      static emitEvents(_handlers, ..._args) {
      }
    };
    Material = class {
      initialize(_info) {
      }
    };
    Mesh = class {
      constructor(geometry3) {
        this.geometry = geometry3;
      }
      destroy() {
      }
    };
    MeshRenderer = class extends Component {
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
    Prefab = class {
      constructor(data) {
        this.data = data;
      }
    };
    utils = {
      MeshUtils: {
        createMesh(geometry3) {
          return new Mesh(geometry3);
        }
      }
    };
    directorListeners = /* @__PURE__ */ new Map();
    totalFrames = 0;
    director = {
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
    Director = { EVENT_BEFORE_COMMIT: "director_before_commit" };
    renderer = {
      scene: {
        CameraUsage: { SCENE_VIEW: 5 },
        CameraProjection: { ORTHO: 0, PERSPECTIVE: 1 }
      }
    };
    geometry = {
      Ray: class {
        constructor(ox = 0, oy = 0, oz = 0, dx = 0, dy = 0, dz = -1) {
          this.o = new Vec3(ox, oy, oz);
          this.d = new Vec3(dx, dy, dz);
        }
      },
      ERaycastMode: { ALL: 0, CLOSEST: 1, ANY: 2 },
      intersect: {
        rayAABB: () => true,
        rayModel: () => 0
      }
    };
    game = { canvas: null };
  }
});

// tests/stubs/editor.ts
init_cc();
var W = 800;
var H = 600;
var PX = 20;
var log = {
  requests: [],
  broadcasts: [],
  changes: [],
  repaints: 0,
  removed: [],
  selectAllNodes: 0,
  /** Events that reached the editor's own handlers (below our priority). */
  editorEvents: []
};
var scene = new Node("Scene");
scene.isScene = true;
director._scene = scene;
function walk(n, fn) {
  fn(n);
  for (const c2 of n.children) walk(c2, fn);
}
function findNode(uuid) {
  let found = null;
  walk(scene, (n) => {
    if (n.uuid === uuid) found = n;
  });
  return found;
}
function findComponent(uuid) {
  let found = null;
  walk(scene, (n) => {
    for (const c2 of n.components) if (c2.uuid === uuid) found = c2;
  });
  return found;
}
var geometry2 = {
  lines: 0,
  triangles: 0,
  quads: 0,
  reset() {
    this.lines = 0;
    this.triangles = 0;
    this.quads = 0;
  },
  addLine() {
    this.lines++;
  },
  addTriangle() {
    this.triangles++;
  },
  addQuad() {
    this.quads++;
  }
};
var camNode = new Node("Editor Camera");
camNode.rotation.set(-Math.SQRT1_2, 0, 0, Math.SQRT1_2);
camNode.position.set(0, 100, 0);
var camera = {
  name: "Editor Camera",
  cameraUsage: renderer.scene.CameraUsage.SCENE_VIEW,
  enabled: true,
  window: null,
  width: W,
  height: H,
  projectionType: renderer.scene.CameraProjection.ORTHO,
  nearClip: 0.1,
  node: camNode,
  get forward() {
    return new Vec3(0, -1, 0);
  },
  geometryRenderer: geometry2,
  initGeometryRenderer() {
  },
  worldToScreen(out, p) {
    out.x = p.x * PX + W / 2;
    out.y = -p.z * PX + H / 2;
    out.z = 0.5;
    return out;
  },
  screenPointToRay(ray, x, y) {
    ray.o.set((x - W / 2) / PX, 100, -(y - H / 2) / PX);
    ray.d.set(0, -1, 0);
    return ray;
  }
};
var mainWindow = {};
camera.window = mainWindow;
director.root = { mainWindow, cameraList: [camera] };
function screen(x, y, z) {
  return { x: x * PX + W / 2, y: -z * PX + H / 2 };
}
var opListeners = /* @__PURE__ */ new Map();
var selectedNodes = [];
function selectNodes(ids) {
  selectedNodes = ids;
}
var cce = {
  Operation: {
    addListener(type, fn, priority = 0) {
      const l = opListeners.get(type) || [];
      l.push({ fn, priority });
      l.sort((a, b) => b.priority - a.priority);
      opListeners.set(type, l);
    },
    removeListener(type, fn) {
      opListeners.set(type, (opListeners.get(type) || []).filter((l) => l.fn !== fn));
    },
    emit(type, ev) {
      for (const l of opListeners.get(type) || []) {
        if (l.fn(ev) === false) return false;
      }
      return true;
    }
  },
  Selection: {
    query: () => [...selectedNodes]
  },
  Camera: { is2D: false },
  Gizmo: {
    transformToolName: "position",
    pivot: "center",
    coordinate: "global",
    is2D: false,
    queryTransformSnapConfigs: () => ({
      position: { x: 1, y: 1, z: 1 },
      rotation: 15,
      scale: 0.1,
      isPositionSnapEnabled: false,
      isRotationSnapEnabled: false,
      isScaleSnapEnabled: false
    })
  },
  Engine: {
    repaintInEditMode() {
      log.repaints++;
    }
  },
  SceneFacadeManager: {
    removeNode(opts) {
      log.removed.push(opts);
    },
    selectAllNodes() {
      log.selectAllNodes++;
    }
  }
};
for (const type of ["mousedown", "mousemove", "mouseup", "dblclick", "keydown"]) {
  cce.Operation.addListener(type, () => {
    log.editorEvents.push(type);
    return true;
  }, 98);
}
globalThis.cce = cce;
globalThis.EditorExtends = {
  Node: {
    getNode: (uuid) => findNode(uuid),
    emit: (type, uuid) => log.changes.push(`${type}:${uuid}`)
  },
  Component: {
    getComponent: (uuid) => findComponent(uuid)
  }
};
var undoSeq = 0;
var sceneMethods = {};
function setSceneMethods(m) {
  sceneMethods = m;
}
async function request(pkg, msg, ...args) {
  var _a2;
  log.requests.push({ msg, args });
  if (pkg !== "scene") return void 0;
  switch (msg) {
    case "begin-recording":
      return `undo-${++undoSeq}`;
    case "end-recording":
    case "cancel-recording":
      return true;
    case "create-node": {
      const o = args[0] || {};
      const n = new Node(o.name || "Node");
      n.setParent(o.parent && findNode(o.parent) || scene);
      return n.uuid;
    }
    case "create-component": {
      const o = args[0];
      const n = findNode(o.uuid);
      const C = js.getClassByName(o.component);
      if (n && C) n.addComponent(C);
      return true;
    }
    case "execute-scene-script": {
      const o = args[0];
      return (_a2 = sceneMethods[o.method]) == null ? void 0 : _a2.call(sceneMethods, ...o.args || []);
    }
  }
  return void 0;
}
globalThis.Editor = {
  App: { path: __dirname, version: "test" },
  Message: {
    request,
    broadcast(msg, data) {
      log.broadcasts.push({ msg, data });
    },
    __protected__: {
      addBroadcastListener() {
      },
      removeBroadcastListener() {
      }
    }
  },
  Profile: {
    getConfig: async () => void 0,
    setConfig: async () => void 0
  },
  Selection: {
    clear() {
      selectedNodes = [];
    },
    select(_type, uuid) {
      selectedNodes = [...selectedNodes, uuid];
    },
    getSelected() {
      return [...selectedNodes];
    }
  }
};
var windowListeners = /* @__PURE__ */ new Map();
globalThis.window = {
  addEventListener(type, fn) {
    const l = windowListeners.get(type) || [];
    l.push(fn);
    windowListeners.set(type, l);
  },
  removeEventListener(type, fn) {
    windowListeners.set(type, (windowListeners.get(type) || []).filter((f) => f !== fn));
  }
};
function domKey(key2, mods = {}) {
  const ev = {
    key: key2,
    ctrlKey: !!mods.ctrlKey,
    metaKey: false,
    target: null,
    defaultPrevented: false,
    stopped: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    stopImmediatePropagation() {
      this.stopped = true;
    }
  };
  for (const f of windowListeners.get("keydown") || []) f(ev);
  return ev;
}

// assets/runtime/BezierKnot.ts
init_cc();

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
function m4TransformPoint(out, m, p) {
  const { x, y, z } = p;
  let w = m.m03 * x + m.m07 * y + m.m11 * z + m.m15;
  w = w ? 1 / w : 1;
  return set(
    out,
    (m.m00 * x + m.m04 * y + m.m08 * z + m.m12) * w,
    (m.m01 * x + m.m05 * y + m.m09 * z + m.m13) * w,
    (m.m02 * x + m.m06 * y + m.m10 * z + m.m14) * w
  );
}
function m4TransformDir(out, m, d) {
  const { x, y, z } = d;
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
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const d = 3 * u * t * t;
  const e = t * t * t;
  return set(
    out,
    a * c2.p0.x + b * c2.p1.x + d * c2.p2.x + e * c2.p3.x,
    a * c2.p0.y + b * c2.p1.y + d * c2.p2.y + e * c2.p3.y,
    a * c2.p0.z + b * c2.p1.z + d * c2.p2.z + e * c2.p3.z
  );
}
function evalDerivative(out, c2, t) {
  const u = 1 - t;
  const a = 3 * u * u;
  const b = 6 * u * t;
  const d = 3 * t * t;
  return set(
    out,
    a * (c2.p1.x - c2.p0.x) + b * (c2.p2.x - c2.p1.x) + d * (c2.p3.x - c2.p2.x),
    a * (c2.p1.y - c2.p0.y) + b * (c2.p2.y - c2.p1.y) + d * (c2.p3.y - c2.p2.y),
    a * (c2.p1.z - c2.p0.z) + b * (c2.p2.z - c2.p1.z) + d * (c2.p3.z - c2.p2.z)
  );
}
function evalAcceleration(out, c2, t) {
  const u = 1 - t;
  return set(
    out,
    6 * u * (c2.p2.x - 2 * c2.p1.x + c2.p0.x) + 6 * t * (c2.p3.x - 2 * c2.p2.x + c2.p1.x),
    6 * u * (c2.p2.y - 2 * c2.p1.y + c2.p0.y) + 6 * t * (c2.p3.y - 2 * c2.p2.y + c2.p1.y),
    6 * u * (c2.p2.z - 2 * c2.p1.z + c2.p0.z) + 6 * t * (c2.p3.z - 2 * c2.p2.z + c2.p1.z)
  );
}
var _d = v3();
function evalDirection(out, c2, t) {
  evalDerivative(_d, c2, t);
  if (lenSq(_d) > EPSILON * EPSILON) return normalize(out, _d);
  evalAcceleration(_d, c2, t);
  if (lenSq(_d) > EPSILON * EPSILON) {
    if (t > 0.5) scale(_d, _d, -1);
    return normalize(out, _d);
  }
  sub(_d, c2.p3, c2.p0);
  return normalize(out, _d);
}
function split(c2, t, left, right) {
  const p01 = lerp(v3(), c2.p0, c2.p1, t);
  const p12 = lerp(v3(), c2.p1, c2.p2, t);
  const p23 = lerp(v3(), c2.p2, c2.p3, t);
  const p012 = lerp(v3(), p01, p12, t);
  const p123 = lerp(v3(), p12, p23, t);
  const mid = lerp(v3(), p012, p123, t);
  const p0 = copy(v3(), c2.p0);
  const p3 = copy(v3(), c2.p3);
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
function arcLength(c2, a = 0, b = 1) {
  if (b <= a) return 0;
  const h = b - a;
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    evalDerivative(_d, c2, a + h * GL_X[i]);
    sum += GL_W[i] * len(_d);
  }
  return sum * h;
}
function buildLengthTable(c2, n, out) {
  const lut = out && out.length === n ? out : new Float64Array(n);
  lut[0] = 0;
  for (let i = 1; i < n; i++) {
    lut[i] = lut[i - 1] + arcLength(c2, (i - 1) / (n - 1), i / (n - 1));
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
function nearestT(c2, p, samples = 16, iterations = 4) {
  const q = v3();
  let bestT = 0;
  let best = Infinity;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    evalPosition(q, c2, t);
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
      evalPosition(q, c2, t);
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
function setTension(s, i, tension) {
  s.knots[i].tension = tension;
  applyTangentMode(s, i);
}
function setRotation(s, i, r) {
  qNormalize(s.knots[i].rotation, r);
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
function buildCache(s, cache2, stamp = fingerprint(s)) {
  const count = curveCount(s);
  cache2.curves.length = count;
  cache2.lengths.length = count;
  cache2.starts.length = count;
  cache2.tables.length = count;
  cache2.ups.length = count;
  let total = 0;
  for (let i = 0; i < count; i++) {
    const c2 = getCurve(s, i, cache2.curves[i] || curve());
    cache2.curves[i] = c2;
    const table = buildLengthTable(c2, LENGTH_SAMPLES, cache2.tables[i]);
    cache2.tables[i] = table;
    cache2.starts[i] = total;
    cache2.lengths[i] = table[LENGTH_SAMPLES - 1];
    total += cache2.lengths[i];
    cache2.ups[i] = null;
  }
  cache2.total = total;
  cache2.stamp = stamp;
  return cache2;
}
function ensureCache(s, cache2) {
  const stamp = fingerprint(s);
  if (stamp !== cache2.stamp) buildCache(s, cache2, stamp);
  return cache2;
}
function curvePointAt(cache2, t, out = { index: 0, t: 0 }) {
  const count = cache2.curves.length;
  if (!count) {
    out.index = 0;
    out.t = 0;
    return out;
  }
  if (cache2.total <= EPSILON) {
    const x = clamp01(t) * count;
    out.index = Math.min(Math.floor(x), count - 1);
    out.t = x - out.index;
    return out;
  }
  const d = clamp01(t) * cache2.total;
  let lo = 0;
  let hi = count - 1;
  while (lo < hi) {
    const mid = lo + hi + 1 >> 1;
    if (cache2.starts[mid] <= d) lo = mid;
    else hi = mid - 1;
  }
  out.index = lo;
  out.t = refineT(cache2.curves[lo], cache2.tables[lo], d - cache2.starts[lo]);
  return out;
}
var _dv = v3();
function exactLengthAt(c2, table, t) {
  const n = table.length;
  if (t <= 0) return 0;
  if (t >= 1) return table[n - 1];
  const i = Math.min(Math.floor(t * (n - 1)), n - 2);
  return table[i] + arcLength(c2, i / (n - 1), t);
}
function refineT(c2, table, d) {
  let t = tAtLength(table, d);
  const n = table.length;
  if (t <= 0 || t >= 1) return t;
  const i = Math.min(Math.floor(t * (n - 1)), n - 2);
  const lo = i / (n - 1);
  const hi = (i + 1) / (n - 1);
  for (let k = 0; k < 2; k++) {
    const err = table[i] + arcLength(c2, lo, t) - d;
    const speed = len(evalDerivative(_dv, c2, t));
    if (speed < EPSILON) break;
    t = Math.min(hi, Math.max(lo, t - err / speed));
  }
  return t;
}
function normalizedTOf(cache2, index, t) {
  if (!cache2.curves.length) return 0;
  if (cache2.total <= EPSILON) return (index + t) / cache2.curves.length;
  return (cache2.starts[index] + exactLengthAt(cache2.curves[index], cache2.tables[index], t)) / cache2.total;
}
function knotUnitToT(cache2, k) {
  const count = cache2.curves.length;
  if (!count) return 0;
  const i = Math.min(Math.max(Math.floor(k), 0), count - 1);
  return normalizedTOf(cache2, i, clamp01(k - i));
}
function tToKnotUnit(cache2, t) {
  const p = curvePointAt(cache2, t);
  return p.index + p.t;
}
var _cp = { index: 0, t: 0 };
function evaluatePosition(s, cache2, t, out) {
  if (!s.knots.length) return set(out, 0, 0, 0);
  if (s.knots.length === 1 || !cache2.curves.length) return copy(out, s.knots[0].position);
  curvePointAt(cache2, t, _cp);
  return evalPosition(out, cache2.curves[_cp.index], _cp.t);
}
function evaluateDirection(s, cache2, t, out) {
  if (s.knots.length < 2 || !cache2.curves.length) {
    if (s.knots.length === 1) return normalize(out, tangentOutVec(out, s.knots[0]));
    return set(out, 0, 0, 1);
  }
  curvePointAt(cache2, t, _cp);
  return evalDirection(out, cache2.curves[_cp.index], _cp.t);
}
function evaluateUp(s, cache2, t, out) {
  if (!s.knots.length) return set(out, 0, 1, 0);
  if (s.knots.length === 1 || !cache2.curves.length) return knotUp(out, s.knots[0]);
  curvePointAt(cache2, t, _cp);
  return curveUp(s, cache2, _cp.index, _cp.t, out);
}
function curveUp(s, cache2, index, t, out) {
  let table = cache2.ups[index];
  if (!table) table = cache2.ups[index] = buildUpTable(s, cache2.curves[index], index);
  const x = clamp01(t) * UP_SAMPLES;
  const i = Math.min(Math.floor(x), UP_SAMPLES - 1);
  const f = x - i;
  const a = v3(table[i * 3], table[i * 3 + 1], table[i * 3 + 2]);
  const b = v3(table[i * 3 + 3], table[i * 3 + 4], table[i * 3 + 5]);
  lerp(out, a, b, f);
  const dir = evalDirection(v3(), cache2.curves[index], t);
  projectOnPlane(out, out, dir);
  if (lenSq(out) < EPSILON) return normalize(out, a);
  return normalize(out, out);
}
function buildUpTable(s, c2, index) {
  const n = s.knots.length;
  const a = s.knots[index];
  const b = s.knots[(index + 1) % n];
  const table = new Float64Array((UP_SAMPLES + 1) * 3);
  const pos = [];
  const dirs = [];
  for (let i = 0; i <= UP_SAMPLES; i++) {
    const t = i / UP_SAMPLES;
    pos.push(evalPosition(v3(), c2, t));
    dirs.push(evalDirection(v3(), c2, t));
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
    const c22 = dot(v2, v2);
    let next = rL;
    if (c22 > EPSILON * EPSILON) next = scaleAndAdd(v3(), rL, v2, -2 / c22 * dot(v2, rL));
    next = normalize(v3(), projectOnPlane(v3(), next, dirs[i + 1]));
    if (lenSq(next) < EPSILON) next = copy(v3(), ups[i]);
    ups.push(next);
  }
  const endUp = normalize(v3(), projectOnPlane(v3(), knotUp(v3(), b), dirs[UP_SAMPLES]));
  let twist = 0;
  if (lenSq(endUp) > EPSILON) {
    const last = ups[UP_SAMPLES];
    const c3 = cross(v3(), last, endUp);
    twist = Math.atan2(dot(c3, dirs[UP_SAMPLES]), dot(last, endUp));
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
function nearestPoint(s, cache2, p) {
  const res = { t: 0, curve: 0, curveT: 0, position: v3(), distance: Infinity };
  if (!s.knots.length) return res;
  if (!cache2.curves.length) {
    copy(res.position, s.knots[0].position);
    res.distance = dist(p, res.position);
    return res;
  }
  let best = Infinity;
  for (let i = 0; i < cache2.curves.length; i++) {
    const r = nearestT(cache2.curves[i], p, 16, 10);
    if (r.distSq < best) {
      best = r.distSq;
      res.curve = i;
      res.curveT = r.t;
    }
  }
  evalPosition(res.position, cache2.curves[res.curve], res.curveT);
  res.distance = Math.sqrt(best);
  res.t = normalizedTOf(cache2, res.curve, res.curveT);
  return res;
}
function tAtDistanceFrom(s, cache2, fromT, distance) {
  if (cache2.total <= EPSILON) return clamp01(fromT);
  const t = fromT + distance / cache2.total;
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
function insertOnCurve(s, curveIndex, t, factory2) {
  const n = s.knots.length;
  const ia = curveIndex;
  const ib = (curveIndex + 1) % n;
  const a = s.knots[ia];
  const b = s.knots[ib];
  const c2 = getCurve(s, curveIndex);
  const left = curve();
  const right = curve();
  split(c2, t, left, right);
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
function groupOf(c2, r) {
  for (const g of c2.links) {
    for (let i = 0; i + 1 < g.knots.length; i += 2) {
      if (g.knots[i] === r.spline && g.knots[i + 1] === r.knot) return g;
    }
  }
  return null;
}
function linkedKnots(c2, r) {
  const g = groupOf(c2, r);
  if (!g) return [];
  const res = [];
  for (let i = 0; i + 1 < g.knots.length; i += 2) {
    const o = { spline: g.knots[i], knot: g.knots[i + 1] };
    if (!sameRef(o, r)) res.push(o);
  }
  return res;
}
function isLinked(c2, r) {
  return !!groupOf(c2, r);
}
function linkKnots(c2, refs, factory2) {
  if (refs.length < 2) return;
  const members = [];
  const add2 = (r) => {
    if (!members.some((m) => sameRef(m, r))) members.push(r);
  };
  for (const r of refs) {
    const g2 = groupOf(c2, r);
    if (g2) {
      for (let i = 0; i + 1 < g2.knots.length; i += 2) add2({ spline: g2.knots[i], knot: g2.knots[i + 1] });
      c2.links.splice(c2.links.indexOf(g2), 1);
    }
    add2(r);
  }
  const g = factory2.link();
  g.knots.length = 0;
  for (const m of members) g.knots.push(m.spline, m.knot);
  c2.links.push(g);
  const p = c2.splines[refs[0].spline].knots[refs[0].knot].position;
  for (const m of members) {
    if (sameRef(m, refs[0])) continue;
    setKnotPosition(c2.splines[m.spline], m.knot, p);
  }
}
function unlinkKnots(c2, refs) {
  for (const r of refs) {
    const g = groupOf(c2, r);
    if (!g) continue;
    for (let i = 0; i + 1 < g.knots.length; i += 2) {
      if (g.knots[i] === r.spline && g.knots[i + 1] === r.knot) {
        g.knots.splice(i, 2);
        break;
      }
    }
    if (g.knots.length < 4) c2.links.splice(c2.links.indexOf(g), 1);
  }
}
function syncLinked(c2, r) {
  const p = c2.splines[r.spline].knots[r.knot].position;
  for (const o of linkedKnots(c2, r)) {
    const s = c2.splines[o.spline];
    if (!s || !s.knots[o.knot]) continue;
    setKnotPosition(s, o.knot, p);
  }
}
function rewriteLinks(c2, map) {
  for (let gi = c2.links.length - 1; gi >= 0; gi--) {
    const g = c2.links[gi];
    const next = [];
    for (let i = 0; i + 1 < g.knots.length; i += 2) {
      const r = map({ spline: g.knots[i], knot: g.knots[i + 1] });
      if (r && !next.some((_, j) => j % 2 === 0 && next[j] === r.spline && next[j + 1] === r.knot)) next.push(r.spline, r.knot);
    }
    if (next.length < 4) c2.links.splice(gi, 1);
    else {
      g.knots.length = 0;
      g.knots.push(...next);
    }
  }
}
function linksOnKnotInserted(c2, spline, knot) {
  rewriteLinks(c2, (r) => r.spline === spline && r.knot >= knot ? { spline, knot: r.knot + 1 } : r);
}
function linksOnKnotRemoved(c2, spline, knot) {
  rewriteLinks(c2, (r) => {
    if (r.spline !== spline) return r;
    if (r.knot === knot) return null;
    return r.knot > knot ? { spline, knot: r.knot - 1 } : r;
  });
}
function linksOnSplineRemoved(c2, spline) {
  rewriteLinks(c2, (r) => {
    if (r.spline === spline) return null;
    return r.spline > spline ? { spline: r.spline - 1, knot: r.knot } : r;
  });
}
function linksOnReversed(c2, spline, count) {
  rewriteLinks(c2, (r) => r.spline === spline ? { spline, knot: count - 1 - r.knot } : r);
}
function containerInsertKnot(c2, spline, index, k) {
  linksOnKnotInserted(c2, spline, index);
  insertKnot(c2.splines[spline], index, k);
}
function containerInsertOnCurve(c2, spline, curveIndex, t, factory2) {
  const s = c2.splines[spline];
  const index = curveIndex + 1;
  linksOnKnotInserted(c2, spline, index);
  return insertOnCurve(s, curveIndex, t, factory2);
}
function containerRemoveKnots(c2, refs) {
  const sorted = [...refs].sort((a, b) => a.spline - b.spline || b.knot - a.knot);
  for (const r of sorted) {
    const s = c2.splines[r.spline];
    if (!s || r.knot >= s.knots.length) continue;
    removeKnot(s, r.knot);
    linksOnKnotRemoved(c2, r.spline, r.knot);
    if (s.knots.length < 3 && s.closed) s.closed = false;
  }
  for (let i = c2.splines.length - 1; i >= 0; i--) {
    if (c2.splines[i].knots.length === 0 && c2.splines.length > 1) {
      c2.splines.splice(i, 1);
      linksOnSplineRemoved(c2, i);
    }
  }
}
function containerReverse(c2, spline) {
  const s = c2.splines[spline];
  linksOnReversed(c2, spline, s.knots.length);
  reverseFlow(s);
}
function containerRemoveSpline(c2, spline) {
  c2.splines.splice(spline, 1);
  linksOnSplineRemoved(c2, spline);
}
function cloneKnot(k, factory2) {
  return copyKnot(factory2.knot(), k);
}
function splitKnot(c2, r, factory2) {
  const s = c2.splines[r.spline];
  const n = s.knots.length;
  if (s.closed) {
    const order = [];
    for (let i = 0; i < n; i++) order.push(s.knots[(r.knot + i) % n]);
    rewriteLinks(c2, (o) => o.spline === r.spline ? { spline: o.spline, knot: wrap(o.knot - r.knot, n) } : o);
    s.knots.length = 0;
    s.knots.push(...order, cloneKnot(order[0], factory2));
    s.closed = false;
    refreshAll(s);
    const first = { spline: r.spline, knot: 0 };
    const last = { spline: r.spline, knot: n };
    linkKnots(c2, [first, last], factory2);
    return last;
  }
  if (r.knot <= 0 || r.knot >= n - 1) return null;
  const tail = factory2.spline();
  tail.closed = false;
  tail.knots.length = 0;
  tail.knots.push(cloneKnot(s.knots[r.knot], factory2), ...s.knots.slice(r.knot + 1));
  const newSpline = c2.splines.length;
  rewriteLinks(c2, (o) => o.spline === r.spline && o.knot > r.knot ? { spline: newSpline, knot: o.knot - r.knot } : o);
  s.knots.length = r.knot + 1;
  c2.splines.push(tail);
  refreshAll(s);
  refreshAll(tail);
  const copyRef = { spline: newSpline, knot: 0 };
  linkKnots(c2, [r, copyRef], factory2);
  return copyRef;
}
function isEndKnot(s, knot) {
  return !s.closed && s.knots.length > 0 && (knot === 0 || knot === s.knots.length - 1);
}
function joinKnots(c2, a, b, factory2) {
  const sa = c2.splines[a.spline];
  const sb = c2.splines[b.spline];
  if (!sa || !sb || !isEndKnot(sa, a.knot) || !isEndKnot(sb, b.knot)) return null;
  if (a.spline === b.spline) {
    if (a.knot === b.knot || sa.knots.length < 3) return null;
    const first = sa.knots[0];
    const last = sa.knots[sa.knots.length - 1];
    if (distSq(first.position, last.position) < EPSILON) {
      copy(first.tangentIn, last.tangentIn);
      linksOnKnotRemoved(c2, a.spline, sa.knots.length - 1);
      sa.knots.pop();
    }
    setClosed(sa, true);
    return { spline: a.spline, knot: a.knot === 0 ? 0 : Math.min(a.knot, sa.knots.length - 1) };
  }
  if (a.knot === 0) {
    containerReverse(c2, a.spline);
    a = { spline: a.spline, knot: sa.knots.length - 1 };
  }
  if (b.knot !== 0) {
    containerReverse(c2, b.spline);
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
  rewriteLinks(c2, (o) => {
    if (o.spline !== bIndex) return o;
    if (o.knot === 0) return { spline: a.spline, knot: a.knot };
    return { spline: a.spline, knot: offset + o.knot };
  });
  sa.knots.push(...sb.knots.slice(1));
  c2.splines.splice(bIndex, 1);
  rewriteLinks(c2, (o) => o.spline > bIndex ? { spline: o.spline - 1, knot: o.knot } : o);
  const aSpline = a.spline > bIndex ? a.spline - 1 : a.spline;
  refreshAll(c2.splines[aSpline]);
  return { spline: aSpline, knot: a.knot };
}
function shapeKnots(kind, o) {
  const r = o.size;
  const pts2 = [];
  const flat = (x, y, h = 0) => o.plane2D ? v3(x, y, h) : v3(x, h, -y);
  switch (kind) {
    case "square":
      pts2.push(flat(-r, -r), flat(-r, r), flat(r, r), flat(r, -r));
      return { points: pts2, mode: 1 /* Linear */, closed: true };
    case "rounded-square": {
      const c2 = r * 0.75;
      const e = r;
      pts2.push(flat(-c2, -e), flat(-e, -c2), flat(-e, c2), flat(-c2, e), flat(c2, e), flat(e, c2), flat(e, -c2), flat(c2, -e));
      return { points: pts2, mode: 0 /* AutoSmooth */, closed: true };
    }
    case "circle": {
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2;
        pts2.push(flat(Math.cos(a) * r, Math.sin(a) * r));
      }
      return { points: pts2, mode: 2 /* Mirrored */, closed: true, tangentScale: 0.5523 };
    }
    case "polygon": {
      const n = Math.max(3, Math.round(o.sides ?? 6));
      for (let i = 0; i < n; i++) {
        const a = i / n * Math.PI * 2 + Math.PI / 2;
        pts2.push(flat(Math.cos(a) * r, Math.sin(a) * r));
      }
      return { points: pts2, mode: 1 /* Linear */, closed: true };
    }
    case "star": {
      const n = Math.max(3, Math.round(o.sides ?? 5));
      for (let i = 0; i < n * 2; i++) {
        const a = i / (n * 2) * Math.PI * 2 + Math.PI / 2;
        const rr = i % 2 === 0 ? r : r * 0.45;
        pts2.push(flat(Math.cos(a) * rr, Math.sin(a) * rr));
      }
      return { points: pts2, mode: 1 /* Linear */, closed: true };
    }
    case "helix": {
      const turns = Math.max(0.25, o.turns ?? 3);
      const height = o.height ?? r * 2;
      const perTurn = 8;
      const n = Math.round(turns * perTurn);
      for (let i = 0; i <= n; i++) {
        const a = i / perTurn * Math.PI * 2;
        pts2.push(flat(Math.cos(a) * r, Math.sin(a) * r, i / n * height));
      }
      return { points: pts2, mode: 0 /* AutoSmooth */, closed: false };
    }
    case "line":
    default:
      pts2.push(flat(-r, 0), flat(r, 0));
      return { points: pts2, mode: 0 /* AutoSmooth */, closed: false };
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

// assets/runtime/Spline.ts
init_cc();

// assets/runtime/KnotLink.ts
init_cc();
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
    const cache2 = this.cache;
    if (!cache2.curves.length) return evaluateDirection(this, cache2, t, out);
    const p = curvePointAt(cache2, t);
    evalDerivative(out, cache2.curves[p.index], p.t);
    if (out.lengthSqr() < 1e-12) evaluateDirection(this, cache2, t, out);
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
    const cache2 = this.cache;
    let t;
    if (from === 0 /* Normalized */) t = value;
    else if (from === 1 /* Distance */) t = cache2.total > 0 ? value / cache2.total : 0;
    else t = knotUnitToT(cache2, value);
    if (to === 0 /* Normalized */) return t;
    if (to === 1 /* Distance */) return t * cache2.total;
    return tToKnotUnit(cache2, t);
  }
  /** Normalized t of a knot. */
  knotT(index) {
    const cache2 = this.cache;
    if (!cache2.curves.length) return 0;
    if (index >= cache2.curves.length) return 1;
    return normalizedTOf(cache2, index, 0);
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
init_cc();

// tests/stubs/cc-env.ts
var EDITOR = true;

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
    var _a2;
    const k = (_a2 = this.splines[ref.spline]) == null ? void 0 : _a2.knots[ref.knot];
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
init_cc();
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
    var _a2, _b2;
    let t = this._normalizedTime % 1;
    if (this._normalizedTime >= 1 && t === 0 && this.loopMode === 0 /* Once */) t = 1;
    t += this.startOffset;
    return t > 1 ? ((_b2 = (_a2 = this.container) == null ? void 0 : _a2.splines[this.splineIndex]) == null ? void 0 : _b2.closed) ? t % 1 : Math.min(t, 1) : t;
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
    const c2 = this.container;
    if (!c2 || !c2.splines[this.splineIndex]) return false;
    const t = this.getSplineT();
    c2.evaluatePosition(t, this.splineIndex, outPosition);
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
        c2.evaluateDirection(t, this.splineIndex, _fwd);
        c2.evaluateUpVector(t, this.splineIndex, _up);
        break;
      case 2 /* SplineObject */:
        Vec3.transformQuat(_fwd, Vec3.UNIT_Z, c2.node.worldRotation);
        Vec3.transformQuat(_up, Vec3.UNIT_Y, c2.node.worldRotation);
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
init_cc();
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
    var _a2;
    if (this._child && this._child.isValid) this._child.destroy();
    this._child = null;
    (_a2 = this._mesh) == null ? void 0 : _a2.destroy();
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
    const c2 = this.container;
    let h = c2 && c2.isValid ? c2.changeStamp : 0;
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
    if (c2 && c2.isValid && c2.node !== this.node) {
      Mat4.invert(_m2, this.node.worldMatrix);
      Mat4.multiply(_m2, _m2, c2.node.worldMatrix);
      for (const v of Mat4.toArray([], _m2)) mix2(v);
    }
    h = Math.imul(h ^ (this.material ? 1 : 0), 16777619);
    return h;
  }
  /** Regenerates the mesh now. */
  rebuild() {
    this._stamp = this.computeStamp();
    const geometry3 = this.buildGeometry();
    const child = this.ensureChild();
    const renderer2 = child.getComponent(MeshRenderer) || child.addComponent(MeshRenderer);
    const old = this._mesh;
    if (!geometry3) {
      renderer2.mesh = null;
      this._mesh = null;
    } else {
      this._mesh = utils.MeshUtils.createMesh(geometry3, void 0, { calculateBounds: true });
      renderer2.mesh = this._mesh;
    }
    if (old && old !== this._mesh) old.destroy();
    const mat = this.material || this.fallbackMaterial();
    if (mat) renderer2.setSharedMaterial(mat, 0);
    renderer2.shadowCastingMode = this.castShadows ? 1 : 0;
    renderer2.receiveShadow = this.receiveShadows ? 1 : 0;
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
        const c2 = [[1, -1], [1, 1], [-1, 1], [-1, -1]];
        for (let k = 0; k < 4; k++) {
          const a = c2[k];
          const b = c2[(k + 1) % 4];
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
    var _a2;
    const s = (_a2 = this.profile) == null ? void 0 : _a2.splines[0];
    if (!s || s.count < 2) return null;
    const n = Math.max(2, Math.round(this.profileSegments));
    const p = { points: [], normals: [], u: [], edges: [], closed: s.closed, perimeter: 0 };
    const pts2 = [];
    for (let j = 0; j <= n; j++) {
      s.evaluatePosition(j / n, _p);
      pts2.push(_p.x, _p.y);
    }
    let ext = 0;
    for (const v of pts2) ext = Math.max(ext, Math.abs(v));
    const k = ext > 0 ? 1 / ext : 1;
    let dist2 = 0;
    for (let j = 0; j <= n; j++) {
      const x = pts2[j * 2] * k;
      const y = pts2[j * 2 + 1] * k;
      if (j > 0) dist2 += Math.hypot(x - pts2[j * 2 - 2] * k, y - pts2[j * 2 - 1] * k);
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
    const c2 = this.container;
    if (!c2 || !c2.isValid) return null;
    const profile = this.makeProfile();
    if (!profile) return null;
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];
    const min = new Vec3(Infinity, Infinity, Infinity);
    const max = new Vec3(-Infinity, -Infinity, -Infinity);
    const sameNode = c2.node === this.node;
    if (!sameNode) {
      Mat4.invert(_m2, this.node.worldMatrix);
      Mat4.multiply(_m2, _m2, c2.node.worldMatrix);
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
    const tri = (a, b, cc2) => {
      if (this.flipNormals) indices.push(a, cc2, b);
      else indices.push(a, b, cc2);
    };
    for (const s of c2.splines) {
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
init_cc();
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
    var _a2;
    this.clear();
    if ((_a2 = this._root) == null ? void 0 : _a2.isValid) this._root.destroy();
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
    const c2 = this.container;
    let h = c2 && c2.isValid ? c2.changeStamp : 0;
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
    if (c2 && c2.isValid) {
      const m = c2.node.worldMatrix;
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
    var _a2;
    for (const n of this._instances) if (n.isValid) n.destroy();
    this._instances.length = 0;
    if ((_a2 = this._root) == null ? void 0 : _a2.isValid) {
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
    const c2 = this.container;
    const res = [];
    if (!c2 || !c2.isValid) return res;
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
    for (let si = 0; si < c2.splines.length; si++) {
      const s = c2.splines[si];
      if (s.count < 2) continue;
      const length = c2.calculateLength(si);
      if (length <= 1e-6) continue;
      const ts = this.distributeT(c2, si, length, s.closed, rand);
      for (const t of ts) {
        const item = pickItem();
        if (item < 0) continue;
        c2.evaluatePosition(t, si, _p2);
        switch (this.space) {
          case 0 /* Spline */:
            c2.evaluateDirection(t, si, _f2);
            c2.evaluateUpVector(t, si, _u2);
            break;
          case 1 /* SplineObject */:
            Vec3.transformQuat(_f2, Vec3.UNIT_Z, c2.node.worldRotation);
            Vec3.transformQuat(_u2, Vec3.UNIT_Y, c2.node.worldRotation);
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
          Vec3.transformQuat(_off, _off, this.offsetRotation(this.positionOffset.space, frame, c2, rotation));
          position.add(_off);
        }
        if (!this.rotationOffset.isZero) {
          this.rotationOffset.next(rand, _off);
          Quat.fromEuler(_q2, _off.x, _off.y, _off.z);
          const sp = this.rotationOffset.space;
          if (sp === 3 /* Object */) Quat.multiply(rotation, rotation, _q2);
          else {
            const S2 = this.offsetRotation(sp, frame, c2, rotation).clone();
            Quat.multiply(_q, S2, _q2);
            Quat.multiply(_q, _q, Quat.invert(new Quat(), S2));
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
  offsetRotation(space, splineFrame, c2, instanceRotation) {
    switch (space) {
      case 0 /* Spline */:
        return splineFrame;
      case 1 /* SplineObject */:
        return c2.node.worldRotation;
      case 3 /* Object */:
        return instanceRotation;
      default:
        return Quat.IDENTITY;
    }
  }
  /** Normalized t values of the instances on one spline. */
  distributeT(c2, si, length, closed, rand) {
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
    const from = c2.evaluatePosition(0, si, new Vec3());
    let want = next();
    const p = new Vec3();
    for (let i = 1; i <= steps && ts.length < MAX; i++) {
      const ti = i / steps;
      c2.evaluatePosition(ti, si, p);
      if (Vec3.distance(p, from) >= want - 1e-6) {
        let a = t;
        let b = ti;
        for (let k = 0; k < 12; k++) {
          const m = (a + b) / 2;
          c2.evaluatePosition(m, si, p);
          if (Vec3.distance(p, from) >= want - 1e-6) b = m;
          else a = m;
        }
        if (closed && b >= 1 - 1e-6) break;
        ts.push(b);
        c2.evaluatePosition(b, si, from);
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
init_cc();

// source/scene/env.ts
var import_path = require("path");
module.paths.push((0, import_path.join)(Editor.App.path, "node_modules"));
var ccModule = null;
function cc() {
  if (!ccModule) ccModule = (init_cc(), __toCommonJS(cc_exports));
  return ccModule;
}
var cce2 = () => globalThis.cce || {};
var editorExtends = () => globalThis.EditorExtends;
function classByName(name) {
  try {
    return cc().js.getClassByName(name) || null;
  } catch {
    return null;
  }
}
var containerClass = () => classByName("SplineContainer");
var factory = {
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
function findNode2(uuid) {
  var _a2, _b2;
  if (!uuid) return null;
  const ext = editorExtends();
  try {
    const n = (_b2 = (_a2 = ext == null ? void 0 : ext.Node) == null ? void 0 : _a2.getNode) == null ? void 0 : _b2.call(_a2, uuid);
    if (n) return n;
  } catch {
  }
  const scene2 = currentScene();
  if (!scene2) return null;
  let found = null;
  const walk2 = (n) => {
    if (found) return;
    if (n.uuid === uuid) {
      found = n;
      return;
    }
    for (const c2 of n.children) walk2(c2);
  };
  walk2(scene2);
  return found;
}
function findComponent2(uuid) {
  var _a2, _b2;
  const ext = editorExtends();
  try {
    const c2 = (_b2 = (_a2 = ext == null ? void 0 : ext.Component) == null ? void 0 : _a2.getComponent) == null ? void 0 : _b2.call(_a2, uuid);
    if (c2) return c2;
  } catch {
  }
  for (const comp2 of allContainers()) if (comp2.uuid === uuid) return comp2;
  const scene2 = currentScene();
  if (!scene2) return null;
  let found = null;
  const walk2 = (n) => {
    if (found) return;
    for (const c2 of n.components) {
      if (c2.uuid === uuid) {
        found = c2;
        return;
      }
    }
    for (const c2 of n.children) walk2(c2);
  };
  walk2(scene2);
  return found;
}
function allContainers() {
  const C = containerClass();
  if (!C || !C.all) return [];
  const scene2 = currentScene();
  const res = [];
  for (const c2 of C.all) {
    if (c2 && c2.isValid && c2.node && c2.node.isValid && c2.node.scene === scene2) res.push(c2);
  }
  return res;
}
function repaint() {
  var _a2, _b2;
  try {
    (_b2 = (_a2 = cce2().Engine) == null ? void 0 : _a2.repaintInEditMode) == null ? void 0 : _b2.call(_a2);
  } catch {
  }
}
function notifyNodeChanged(node2) {
  var _a2, _b2, _c2;
  if (!node2 || !node2.isValid) return;
  try {
    (_c2 = (_b2 = (_a2 = editorExtends()) == null ? void 0 : _a2.Node) == null ? void 0 : _b2.emit) == null ? void 0 : _c2.call(_b2, "change", node2.uuid, node2);
  } catch {
  }
}
function selectedNodeUuids() {
  var _a2, _b2;
  try {
    const ids = (_b2 = (_a2 = cce2().Selection) == null ? void 0 : _a2.query) == null ? void 0 : _b2.call(_a2);
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}
function is2DView() {
  var _a2;
  try {
    const c2 = cce2().Camera;
    if (typeof (c2 == null ? void 0 : c2.is2D) === "boolean") return c2.is2D;
    return !!((_a2 = cce2().Gizmo) == null ? void 0 : _a2.is2D);
  } catch {
    return false;
  }
}
function transformToolName() {
  var _a2;
  try {
    return ((_a2 = cce2().Gizmo) == null ? void 0 : _a2.transformToolName) || "position";
  } catch {
    return "position";
  }
}
function pivotMode() {
  var _a2;
  try {
    return ((_a2 = cce2().Gizmo) == null ? void 0 : _a2.pivot) === "pivot" ? "pivot" : "center";
  } catch {
    return "center";
  }
}
function snapConfig() {
  var _a2, _b2;
  const fallback = {
    position: { x: 1, y: 1, z: 1 },
    rotation: 15,
    scale: 0.1,
    isPositionSnapEnabled: false,
    isRotationSnapEnabled: false,
    isScaleSnapEnabled: false
  };
  try {
    const c2 = (_b2 = (_a2 = cce2().Gizmo) == null ? void 0 : _a2.queryTransformSnapConfigs) == null ? void 0 : _b2.call(_a2);
    return c2 ? { ...fallback, ...c2 } : fallback;
  } catch {
    return fallback;
  }
}

// source/scene/model.ts
function elementKey(e) {
  return `${e.comp.uuid}:${e.spline}:${e.knot}:${e.part}`;
}
function getKnot(e) {
  var _a2, _b2, _c2, _d2;
  return ((_d2 = (_c2 = (_b2 = (_a2 = e.comp) == null ? void 0 : _a2.splines) == null ? void 0 : _b2[e.spline]) == null ? void 0 : _c2.knots) == null ? void 0 : _d2[e.knot]) ?? null;
}
function isValidElement(e) {
  if (!e.comp || !e.comp.isValid || !e.comp.node || !e.comp.node.isValid) return false;
  return !!getKnot(e);
}
function tangentUsed(spline, knot, part) {
  if (part === "knot") return true;
  if (spline.closed) return true;
  if (curveCount(spline) === 0) return false;
  if (part === "in" && knot === 0) return false;
  if (part === "out" && knot === spline.knots.length - 1) return false;
  return true;
}
function worldMatrix(comp2) {
  return comp2.node.worldMatrix;
}
var _inv = /* @__PURE__ */ new Map();
function inverseMatrix(comp2) {
  const m = comp2.node.worldMatrix;
  const stamp = `${m.m00},${m.m01},${m.m02},${m.m04},${m.m05},${m.m06},${m.m08},${m.m09},${m.m10},${m.m12},${m.m13},${m.m14}`;
  let e = _inv.get(comp2);
  if (!e || e.stamp !== stamp) {
    const { Mat4: Mat42 } = cc();
    const inv = new Mat42();
    Mat42.invert(inv, m);
    e = { stamp, m: inv };
    _inv.set(comp2, e);
  }
  return e.m;
}
function toWorld(comp2, local, out = v3()) {
  return m4TransformPoint(out, worldMatrix(comp2), local);
}
function toLocal(comp2, world, out = v3()) {
  return m4TransformPoint(out, inverseMatrix(comp2), world);
}
function dirToWorld(comp2, local, out = v3()) {
  return m4TransformDir(out, worldMatrix(comp2), local);
}
function dirToLocal(comp2, world, out = v3()) {
  return m4TransformDir(out, inverseMatrix(comp2), world);
}
function containerRotation(comp2) {
  const r = comp2.node.worldRotation;
  return q4(r.x, r.y, r.z, r.w);
}
function knotWorldRotation(comp2, k, out = q4()) {
  return qNormalize(out, qMul(out, containerRotation(comp2), k.rotation));
}
function knotWorldPosition(comp2, s, k, out = v3()) {
  const knot = comp2.splines[s].knots[k];
  return toWorld(comp2, knot.position, out);
}
function tangentWorldPosition(comp2, s, k, part, out = v3()) {
  const knot = comp2.splines[s].knots[k];
  const vec = part === "in" ? tangentInVec(v3(), knot) : tangentOutVec(v3(), knot);
  return toWorld(comp2, add(v3(), knot.position, vec), out);
}
function elementWorldPosition(e, out = v3()) {
  if (e.part === "knot") return knotWorldPosition(e.comp, e.spline, e.knot, out);
  return tangentWorldPosition(e.comp, e.spline, e.knot, e.part, out);
}
function setKnotWorld(comp2, s, k, world) {
  const local = toLocal(comp2, world);
  setKnotPosition(comp2.splines[s], k, local);
  syncLinked(comp2, { spline: s, knot: k });
}
function setTangentWorld(comp2, s, k, part, world) {
  const spline = comp2.splines[s];
  const knot = spline.knots[k];
  const local = toLocal(comp2, world);
  setTangentVec(spline, k, part, sub(v3(), local, knot.position));
}
function setTangentWorldVec(comp2, s, k, part, worldVec) {
  setTangentVec(comp2.splines[s], k, part, dirToLocal(comp2, worldVec));
}
function tangentWorldVec(comp2, s, k, part, out = v3()) {
  const knot = comp2.splines[s].knots[k];
  const vec = part === "in" ? tangentInVec(v3(), knot) : tangentOutVec(v3(), knot);
  return dirToWorld(comp2, vec, out);
}
function setKnotWorldRotation(comp2, k, world) {
  const local = qMul(q4(), qInvert(q4(), containerRotation(comp2)), world);
  qNormalize(k.rotation, local);
}
function currentTargets() {
  const C = containerClass();
  if (!C) return [];
  const res = [];
  for (const uuid of selectedNodeUuids()) {
    const node2 = findNode2(uuid);
    if (!node2 || !node2.isValid || !node2.activeInHierarchy) continue;
    const comp2 = node2.getComponent(C);
    if (comp2 && comp2.enabledInHierarchy) res.push(comp2);
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
    const k = elementKey(e);
    if (this.map.has(k)) {
      this.order.splice(this.order.indexOf(k), 1);
    }
    this.map.set(k, { ...e });
    this.order.push(k);
    this.version++;
  }
  remove(e) {
    const k = elementKey(e);
    if (!this.map.delete(k)) return;
    this.order.splice(this.order.indexOf(k), 1);
    this.version++;
  }
  toggle(e) {
    if (this.has(e)) this.remove(e);
    else this.add(e);
  }
  clear() {
    if (!this.map.size) return;
    this.map.clear();
    this.order.length = 0;
    this.version++;
  }
  set(list) {
    this.map.clear();
    this.order.length = 0;
    for (const e of list) {
      const k = elementKey(e);
      if (this.map.has(k)) continue;
      this.map.set(k, { ...e });
      this.order.push(k);
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
    const k = this.order[this.order.length - 1];
    return k ? this.map.get(k) : null;
  }
  hasKnot(comp2, spline, knot) {
    return this.map.has(`${comp2.uuid}:${spline}:${knot}:knot`);
  }
  hasAnyOf(comp2, spline, knot) {
    const p = `${comp2.uuid}:${spline}:${knot}:`;
    return this.map.has(`${p}knot`) || this.map.has(`${p}in`) || this.map.has(`${p}out`);
  }
  /** Drops elements that no longer exist or belong to containers not edited. */
  validate(targets) {
    let changed = false;
    for (const k of [...this.order]) {
      const e = this.map.get(k);
      if (!isValidElement(e) || !targets.includes(e.comp)) {
        this.map.delete(k);
        this.order.splice(this.order.indexOf(k), 1);
        changed = true;
      }
    }
    if (changed) this.version++;
    return changed;
  }
  /** Comps that have selected elements. */
  comps() {
    const set2 = /* @__PURE__ */ new Set();
    for (const e of this.map.values()) set2.add(e.comp);
    return [...set2];
  }
};
function centroid(list, out = v3()) {
  copy(out, v3());
  if (!list.length) return out;
  const p = v3();
  for (const e of list) add(out, out, elementWorldPosition(e, p));
  out.x /= list.length;
  out.y /= list.length;
  out.z /= list.length;
  return out;
}

// source/scene/state.ts
var DEFAULT_SETTINGS = {
  showAll: true,
  showFlow: true,
  showAllTangents: false,
  showKnotIndices: false,
  showNormals: false,
  defaultMode: 0 /* AutoSmooth */,
  drawOnSurfaces: true,
  orientation: "global"
};
var S = {
  /** This process is the edit scene (Play-in-Editor's process only draws). */
  primary: false,
  hooked: false,
  /** Spline editing context is on (Unity's spline tool context). */
  context: false,
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
  replaying: false,
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
  S.diag.errors.push(`${(/* @__PURE__ */ new Date()).toISOString()} ${msg}`);
  if (S.diag.errors.length > 30) S.diag.errors.shift();
}
function bumpState() {
  S.stateVersion++;
}

// source/scene/view.ts
var lastCamera = null;
function sceneCamera() {
  try {
    const { director: director2, renderer: renderer2 } = cc();
    const root = director2.root;
    if (!root) return null;
    if (lastCamera && lastCamera.enabled && lastCamera.window === root.mainWindow && root.cameraList.includes(lastCamera)) return lastCamera;
    for (const cam2 of root.cameraList) {
      if (cam2.cameraUsage === renderer2.scene.CameraUsage.SCENE_VIEW && cam2.enabled && cam2.window === root.mainWindow) {
        lastCamera = cam2;
        return cam2;
      }
    }
  } catch {
  }
  return null;
}
var _tmp = v3();
function cameraPosition(cam2, out = v3()) {
  const p = cam2.node.worldPosition;
  return set(out, p.x, p.y, p.z);
}
function cameraForward(cam2, out = v3()) {
  const f = cam2.forward ?? cam2.node.forward;
  return normalize(out, set(out, f.x, f.y, f.z));
}
function cameraRight(cam2, out = v3()) {
  const r = cam2.node.right;
  return normalize(out, set(out, r.x, r.y, r.z));
}
function cameraUp(cam2, out = v3()) {
  const u = cam2.node.up;
  return normalize(out, set(out, u.x, u.y, u.z));
}
function isOrtho(cam2) {
  try {
    return cam2.projectionType === cc().renderer.scene.CameraProjection.ORTHO;
  } catch {
    return false;
  }
}
var _ws = v3();
var _fw = v3();
function toScreen(cam2, p, out = { x: 0, y: 0, visible: true }) {
  cam2.worldToScreen(_ws, p);
  out.x = _ws.x;
  out.y = _ws.y;
  if (isOrtho(cam2)) out.visible = true;
  else {
    cameraPosition(cam2, _tmp);
    cameraForward(cam2, _fw);
    out.visible = dot(sub(_tmp, p, _tmp), _fw) > (cam2.nearClip ?? 0.01);
  }
  return out;
}
function screenRay(cam2, x, y) {
  const { geometry: geometry3 } = cc();
  const r = new geometry3.Ray();
  cam2.screenPointToRay(r, x, y);
  return { o: v3(r.o.x, r.o.y, r.o.z), d: normalize(v3(), v3(r.d.x, r.d.y, r.d.z)) };
}
function worldPerPixel(cam2, p) {
  const right = cameraRight(cam2);
  const a = toScreen(cam2, p);
  const b = toScreen(cam2, scaleAndAdd(v3(), p, right, 1));
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  if (!(d > EPSILON) || !a.visible) {
    const dist2 = len(sub(v3(), p, cameraPosition(cam2)));
    return Math.max(dist2, 1) * 2e-3;
  }
  return 1 / d;
}
function rayPlane(ray, point, normal, allowBehind = false) {
  const denom = dot(ray.d, normal);
  if (Math.abs(denom) < 1e-6) return null;
  const t = dot(sub(v3(), point, ray.o), normal) / denom;
  if (t < 0 && !allowBehind) return null;
  return scaleAndAdd(v3(), ray.o, ray.d, t);
}
function closestOnLine(ray, origin, dir) {
  const d1 = normalize(v3(), dir);
  const d2 = ray.d;
  const r = sub(v3(), origin, ray.o);
  const a = dot(d1, d1);
  const b = dot(d1, d2);
  const c2 = dot(d2, d2);
  const d = dot(d1, r);
  const e = dot(d2, r);
  const denom = a * c2 - b * b;
  if (Math.abs(denom) < 1e-8) return null;
  const s = (b * e - c2 * d) / denom;
  return scaleAndAdd(v3(), origin, d1, s);
}
function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  let f = l2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
  f = f < 0 ? 0 : f > 1 ? 1 : f;
  const x = ax + dx * f - px;
  const y = ay + dy * f - py;
  return { dist: Math.sqrt(x * x + y * y), f };
}
function pointInPolygon(px, py, pts2) {
  let inside = false;
  for (let i = 0, j = pts2.length - 1; i < pts2.length; j = i++) {
    const a = pts2[i];
    const b = pts2[j];
    if (a.y > py !== b.y > py && px < (b.x - a.x) * (py - a.y) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}
var coordMode = "unknown";
var coordSamples = 0;
function eventCoordMode() {
  return coordMode;
}
function canvasElement() {
  try {
    const c2 = cc().game.canvas;
    if (c2 && typeof c2.getBoundingClientRect === "function") return c2;
  } catch {
  }
  return typeof document !== "undefined" ? document.querySelector("canvas") : null;
}
function eventToScreen(cam2, ev) {
  const canvas = canvasElement();
  const hasClient = typeof ev.clientX === "number" && typeof ev.clientY === "number";
  let fromClient = null;
  let css = null;
  if (canvas && hasClient) {
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const sx = cam2.width / rect.width;
      const sy = cam2.height / rect.height;
      const cx = ev.clientX - rect.left;
      const cy = ev.clientY - rect.top;
      css = { x: cx, y: cy, sx, sy, h: rect.height };
      fromClient = { x: cx * sx, y: (rect.height - cy) * sy };
    }
  }
  const hasXY = typeof ev.x === "number" && typeof ev.y === "number";
  if (coordMode === "unknown" || coordMode === "client" && coordSamples < 5) {
    coordSamples++;
    if (hasXY && css) {
      const near2 = (a, b) => Math.abs(a - b) < 2.5;
      if (near2(ev.x, css.x * css.sx) && near2(ev.y, (css.h - css.y) * css.sy)) coordMode = "event";
      else if (near2(ev.x, css.x * css.sx) && near2(ev.y, css.y * css.sy)) coordMode = "event-flipped";
      else if (near2(ev.x, css.x) && near2(ev.y, css.h - css.y)) coordMode = "event-css";
      else if (near2(ev.x, css.x) && near2(ev.y, css.y)) coordMode = "event-css-flipped";
      else coordMode = "client";
    } else if (hasXY) {
      coordMode = "event";
    } else if (css) {
      coordMode = "client";
    }
  }
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
  if (typeof document === "undefined" || !document.body) return null;
  const root = document.createElement("div");
  root.id = "splines-overlay";
  root.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;pointer-events:none;z-index:2147483000;font:11px/1.2 sans-serif;";
  const rect = document.createElement("div");
  rect.style.cssText = "position:fixed;display:none;border:1px solid rgba(80,170,255,0.9);background:rgba(80,170,255,0.15);pointer-events:none;";
  root.appendChild(rect);
  const tip = document.createElement("div");
  tip.style.cssText = "position:fixed;display:none;padding:2px 6px;border-radius:3px;background:rgba(20,20,20,0.85);color:#ddd;white-space:nowrap;pointer-events:none;";
  root.appendChild(tip);
  document.body.appendChild(root);
  overlay = { root, labels: [], used: 0, rect, tip };
  return overlay;
}
function cssOf(cam2, x, y) {
  const canvas = canvasElement();
  if (!canvas) return null;
  const r = canvas.getBoundingClientRect();
  if (!(r.width > 0) || !(r.height > 0)) return null;
  return { left: r.left + x * r.width / cam2.width, top: r.top + r.height - y * r.height / cam2.height };
}
function beginLabels() {
  const o = ensureOverlay();
  if (o) o.used = 0;
}
function addLabel(cam2, x, y, text, color2 = "#fff") {
  const o = ensureOverlay();
  if (!o) return;
  const css = cssOf(cam2, x, y);
  if (!css) return;
  let el = o.labels[o.used];
  if (!el) {
    el = document.createElement("div");
    el.style.cssText = "position:fixed;transform:translate(6px,-100%);text-shadow:0 0 2px #000,0 0 2px #000;pointer-events:none;white-space:nowrap;";
    o.root.appendChild(el);
    o.labels.push(el);
  }
  o.used++;
  if (el.textContent !== text) el.textContent = text;
  el.style.color = color2;
  el.style.left = `${css.left}px`;
  el.style.top = `${css.top}px`;
  el.style.display = "block";
}
function endLabels() {
  const o = overlay;
  if (!o) return;
  for (let i = o.used; i < o.labels.length; i++) o.labels[i].style.display = "none";
}
function showRect(cam2, x0, y0, x1, y1) {
  const o = ensureOverlay();
  if (!o) return;
  const a = cssOf(cam2, Math.min(x0, x1), Math.max(y0, y1));
  const b = cssOf(cam2, Math.max(x0, x1), Math.min(y0, y1));
  if (!a || !b) return;
  o.rect.style.left = `${a.left}px`;
  o.rect.style.top = `${a.top}px`;
  o.rect.style.width = `${Math.max(0, b.left - a.left)}px`;
  o.rect.style.height = `${Math.max(0, b.top - a.top)}px`;
  o.rect.style.display = "block";
}
function hideRect() {
  if (overlay) overlay.rect.style.display = "none";
}
function showTip(cam2, x, y, text) {
  const o = ensureOverlay();
  if (!o) return;
  const css = cssOf(cam2, x, y);
  if (!css) return;
  o.tip.textContent = text;
  o.tip.style.left = `${css.left + 14}px`;
  o.tip.style.top = `${css.top + 14}px`;
  o.tip.style.display = "block";
}
function hideTip() {
  if (overlay) overlay.tip.style.display = "none";
}

// source/scene/draw.ts
var gr = null;
var cam = null;
var camRight = v3();
var camUp = v3();
var camFwd = v3();
function beginDraw(camera2) {
  cam = camera2;
  if (!camera2.geometryRenderer && camera2.initGeometryRenderer) camera2.initGeometryRenderer();
  gr = camera2.geometryRenderer || null;
  if (!gr) return false;
  cameraRight(camera2, camRight);
  cameraUp(camera2, camUp);
  cameraForward(camera2, camFwd);
  return true;
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
};
var cache = /* @__PURE__ */ new Map();
function c(name, r, g, b, a = 255) {
  let col = cache.get(name);
  if (!col) {
    col = color(r, g, b, a);
    cache.set(name, col);
  }
  return col;
}
function withAlpha(col, a) {
  const key2 = `${col.r},${col.g},${col.b},${a}`;
  let res = cache.get(key2);
  if (!res) {
    res = color(col.r, col.g, col.b, a);
    cache.set(key2, res);
  }
  return res;
}
function line(a, b, col, depthTest = false) {
  gr.addLine(a, b, col, depthTest);
}
var _o = v3();
var _a = v3();
var _b = v3();
function thickLine(a, b, col, widthPx, depthTest = false) {
  gr.addLine(a, b, col, depthTest);
  if (widthPx <= 1.2) return;
  sub(_o, b, a);
  cross(_o, _o, camFwd);
  if (lenSq(_o) < 1e-12) return;
  normalize(_o, _o);
  const wpp = worldPerPixel(cam, a);
  const half = Math.floor(widthPx / 2);
  for (let i = 1; i <= half; i++) {
    const s = wpp * i * 0.7;
    gr.addLine(scaleAndAdd(_a, a, _o, s), scaleAndAdd(_b, b, _o, s), col, depthTest);
    gr.addLine(scaleAndAdd(_a, a, _o, -s), scaleAndAdd(_b, b, _o, -s), col, depthTest);
  }
}
function polyline(points, col, widthPx = 1, depthTest = false) {
  for (let i = 0; i + 1 < points.length; i++) {
    if (widthPx > 1.2) thickLine(points[i], points[i + 1], col, widthPx, depthTest);
    else gr.addLine(points[i], points[i + 1], col, depthTest);
  }
}
var circlePts = [];
function screenCirclePoints(center, radiusPx, segments) {
  const r = worldPerPixel(cam, center) * radiusPx;
  while (circlePts.length <= segments) circlePts.push(v3());
  for (let i = 0; i <= segments; i++) {
    const a = i / segments * Math.PI * 2;
    const p = circlePts[i];
    copy(p, center);
    scaleAndAdd(p, p, camRight, Math.cos(a) * r);
    scaleAndAdd(p, p, camUp, Math.sin(a) * r);
  }
  return circlePts;
}
function circle(center, radiusPx, col, segments = 16, depthTest = false) {
  const pts2 = screenCirclePoints(center, radiusPx, segments);
  for (let i = 0; i < segments; i++) gr.addLine(pts2[i], pts2[i + 1], col, depthTest);
}
function disc(center, radiusPx, col, segments = 12, depthTest = false) {
  const pts2 = screenCirclePoints(center, radiusPx, segments);
  for (let i = 0; i < segments; i++) gr.addTriangle(center, pts2[i], pts2[i + 1], col, false, depthTest, true);
}
function square(center, halfPx, col, filled, depthTest = false) {
  const h = worldPerPixel(cam, center) * halfPx;
  const p0 = add(v3(), scaleAndAdd(v3(), center, camRight, -h), scale(v3(), camUp, -h));
  const p1 = add(v3(), scaleAndAdd(v3(), center, camRight, h), scale(v3(), camUp, -h));
  const p2 = add(v3(), scaleAndAdd(v3(), center, camRight, h), scale(v3(), camUp, h));
  const p3 = add(v3(), scaleAndAdd(v3(), center, camRight, -h), scale(v3(), camUp, h));
  gr.addQuad(p0, p1, p2, p3, col, !filled, depthTest, true);
}
function diamond(center, halfPx, col, filled, depthTest = false) {
  const h = worldPerPixel(cam, center) * halfPx;
  const p0 = scaleAndAdd(v3(), center, camUp, -h);
  const p1 = scaleAndAdd(v3(), center, camRight, h);
  const p2 = scaleAndAdd(v3(), center, camUp, h);
  const p3 = scaleAndAdd(v3(), center, camRight, -h);
  gr.addQuad(p0, p1, p2, p3, col, !filled, depthTest, true);
}
function ring(center, normal, radius, col, segments = 48, depthTest = false, frontOnly = false) {
  const n = normalize(v3(), normal);
  const u = normalize(v3(), cross(v3(), Math.abs(n.y) < 0.99 ? v3(0, 1, 0) : v3(1, 0, 0), n));
  const w = cross(v3(), n, u);
  let prev = null;
  const toCam = v3();
  for (let i = 0; i <= segments; i++) {
    const a = i / segments * Math.PI * 2;
    const p = add(v3(), center, add(v3(), scale(v3(), u, Math.cos(a) * radius), scale(v3(), w, Math.sin(a) * radius)));
    if (prev) {
      let draw = true;
      if (frontOnly) {
        const mid = scale(v3(), add(v3(), prev, p), 0.5);
        sub(toCam, mid, center);
        draw = toCam.x * camFwd.x + toCam.y * camFwd.y + toCam.z * camFwd.z <= radius * 0.05;
      }
      if (draw) gr.addLine(prev, p, col, depthTest);
    }
    prev = p;
  }
}
function cone(base, dir, height, radius, col, depthTest = false, segments = 10) {
  const d = normalize(v3(), dir);
  const apex = scaleAndAdd(v3(), base, d, height);
  const u = normalize(v3(), cross(v3(), Math.abs(d.y) < 0.99 ? v3(0, 1, 0) : v3(1, 0, 0), d));
  const w = cross(v3(), d, u);
  const pts2 = [];
  for (let i = 0; i <= segments; i++) {
    const a = i / segments * Math.PI * 2;
    pts2.push(add(v3(), base, add(v3(), scale(v3(), u, Math.cos(a) * radius), scale(v3(), w, Math.sin(a) * radius))));
  }
  for (let i = 0; i < segments; i++) {
    gr.addTriangle(apex, pts2[i], pts2[i + 1], col, false, depthTest, true);
    gr.addTriangle(base, pts2[i + 1], pts2[i], col, false, depthTest, true);
  }
}
function cube(center, half, ax, ay, az, col, depthTest = false) {
  const corner = (sx, sy, sz) => {
    const p = copy(v3(), center);
    scaleAndAdd(p, p, ax, sx * half);
    scaleAndAdd(p, p, ay, sy * half);
    scaleAndAdd(p, p, az, sz * half);
    return p;
  };
  const c000 = corner(-1, -1, -1);
  const c100 = corner(1, -1, -1);
  const c110 = corner(1, 1, -1);
  const c010 = corner(-1, 1, -1);
  const c001 = corner(-1, -1, 1);
  const c101 = corner(1, -1, 1);
  const c111 = corner(1, 1, 1);
  const c011 = corner(-1, 1, 1);
  const q = (a, b, cc2, d) => gr.addQuad(a, b, cc2, d, col, false, depthTest, true);
  q(c000, c100, c110, c010);
  q(c001, c011, c111, c101);
  q(c000, c010, c011, c001);
  q(c100, c101, c111, c110);
  q(c000, c001, c101, c100);
  q(c010, c110, c111, c011);
}
function quad(a, b, c2, d, col, filled, depthTest = false) {
  gr.addQuad(a, b, c2, d, col, !filled, depthTest, true);
}
function chevron(p, dir, sizePx, col, depthTest = false) {
  const d = normalize(v3(), dir);
  if (lenSq(d) < 1e-12) return;
  const side = normalize(v3(), cross(v3(), d, camFwd));
  if (lenSq(side) < 1e-12) return;
  const s = worldPerPixel(cam, p) * sizePx;
  const back = scaleAndAdd(v3(), p, d, -s);
  gr.addLine(scaleAndAdd(v3(), back, side, s * 0.7), p, col, depthTest);
  gr.addLine(scaleAndAdd(v3(), back, side, -s * 0.7), p, col, depthTest);
}

// source/scene/handles.ts
var AXIS_PX = 90;
var HIT_PX = 7;
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
  const active2 = elements[elements.length - 1];
  const mode = S.settings.orientation;
  let q = null;
  if (active2 && mode === "local") q = containerRotation(active2.comp);
  else if (active2 && mode === "element") {
    const k = getKnot(active2);
    if (k) {
      if (active2.part === "knot") q = knotWorldRotation(active2.comp, k);
      else {
        const dir = tangentWorldVec(active2.comp, active2.spline, active2.knot, active2.part);
        const up = qRotate(v3(), knotWorldRotation(active2.comp, k), v3(0, 1, 0));
        q = lenSq(dir) > EPSILON ? qLookRotation(q4(), dir, up) : knotWorldRotation(active2.comp, k);
      }
    }
  }
  if (!q) return [v3(1, 0, 0), v3(0, 1, 0), v3(0, 0, 1)];
  return [qRotate(v3(), q, v3(1, 0, 0)), qRotate(v3(), q, v3(0, 1, 0)), qRotate(v3(), q, v3(0, 0, 1))];
}
function handlePivot(elements) {
  if (pivotMode() === "pivot" && elements.length) return elementWorldPosition(elements[elements.length - 1]);
  return centroid(elements);
}
function computeFrame(cam2, elements, axesOverride) {
  const kind = handleKind();
  if (!kind || !elements.length) return null;
  const pivot = handlePivot(elements);
  const axes = axesOverride ?? handleAxes(elements);
  return { kind, pivot, axes, size: worldPerPixel(cam2, pivot) * AXIS_PX, is2D: is2DView() };
}
var AXIS_INDEX = { x: 0, y: 1, z: 2 };
var PLANES = [
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
  const toCam = sub(v3(), cameraPosition(cam2), f.pivot);
  if (lenSq(toCam) < EPSILON) return [1, 1, 1];
  return f.axes.map((a) => dot(a, toCam) >= 0 ? 1 : -1);
}
function planeQuad(cam2, f, p) {
  const s = planeSigns(cam2, f);
  const lo = f.size * 0.16;
  const hi = f.size * 0.4;
  const A = scale(v3(), f.axes[p.a], s[p.a]);
  const B = scale(v3(), f.axes[p.b], s[p.b]);
  const pt = (x, y) => add(v3(), add(v3(), f.pivot, scale(v3(), A, x)), scale(v3(), B, y));
  return [pt(lo, lo), pt(hi, lo), pt(hi, hi), pt(lo, hi)];
}
function ringPoints(f, normal, radius, segments = 48) {
  const n = normalize(v3(), normal);
  const u = normalize(v3(), cross(v3(), Math.abs(n.y) < 0.99 ? v3(0, 1, 0) : v3(1, 0, 0), n));
  const w = cross(v3(), n, u);
  const pts2 = [];
  for (let i = 0; i <= segments; i++) {
    const a = i / segments * Math.PI * 2;
    pts2.push(add(v3(), f.pivot, add(v3(), scale(v3(), u, Math.cos(a) * radius), scale(v3(), w, Math.sin(a) * radius))));
  }
  return pts2;
}
function drawHandle(cam2, f, hot) {
  const hotColor = Colors.axisHot;
  if (f.kind === "rotate") {
    for (const i of visibleAxes(f)) {
      if (f.is2D && i !== 2) continue;
      const axis = ["x", "y", "z"][i];
      ring(f.pivot, f.axes[i], f.size, hot === axis ? hotColor : axisColor(i), 64, false, !f.is2D);
    }
    if (f.is2D) {
    }
    ring(f.pivot, cameraForward(cam2), f.size * 1.15, hot === "view" ? hotColor : Colors.axisView, 64);
    return;
  }
  for (const i of visibleAxes(f)) {
    const axis = ["x", "y", "z"][i];
    const col = hot === axis ? hotColor : axisColor(i);
    const tip = scaleAndAdd(v3(), f.pivot, f.axes[i], f.size);
    thickLine(f.pivot, tip, col, 2);
    if (f.kind === "move") cone(scaleAndAdd(v3(), f.pivot, f.axes[i], f.size * 0.82), f.axes[i], f.size * 0.22, f.size * 0.07, col);
    else cube(tip, f.size * 0.06, f.axes[0], f.axes[1], f.axes[2], col);
  }
  if (f.kind === "move") {
    for (const p of visiblePlanes(f)) {
      const q = planeQuad(cam2, f, p);
      const col = hot === p.axis ? hotColor : axisColor(p.n);
      quad(q[0], q[1], q[2], q[3], withAlpha(col, hot === p.axis ? 110 : 60), true);
      quad(q[0], q[1], q[2], q[3], col, false);
    }
    square(f.pivot, 5, hot === "free" ? hotColor : Colors.axisView, false);
  } else {
    cube(f.pivot, f.size * 0.08, f.axes[0], f.axes[1], f.axes[2], hot === "free" ? hotColor : Colors.axisView);
  }
}
function hitHandle(cam2, f, mx, my) {
  const sp = toScreen(cam2, f.pivot);
  if (!sp.visible) return null;
  if (f.kind === "rotate") {
    let best2 = null;
    let bestD2 = HIT_PX;
    const test2 = (axis, pts2) => {
      let prev = toScreen(cam2, pts2[0]);
      for (let i = 1; i < pts2.length; i++) {
        const cur = toScreen(cam2, pts2[i]);
        const d = distToSegment(mx, my, prev.x, prev.y, cur.x, cur.y).dist;
        if (d < bestD2) {
          bestD2 = d;
          best2 = axis;
        }
        prev = cur;
      }
    };
    for (const i of visibleAxes(f)) {
      if (f.is2D && i !== 2) continue;
      test2(["x", "y", "z"][i], ringPoints(f, f.axes[i], f.size));
    }
    if (f.is2D) test2("z", ringPoints(f, f.axes[2], f.size));
    test2("view", ringPoints(f, cameraForward(cam2), f.size * 1.15));
    return best2;
  }
  if (Math.hypot(mx - sp.x, my - sp.y) <= (f.kind === "scale" ? 9 : 7)) return "free";
  let best = null;
  let bestD = HIT_PX;
  for (const i of visibleAxes(f)) {
    const tip = toScreen(cam2, scaleAndAdd(v3(), f.pivot, f.axes[i], f.size * 1.05));
    const d = distToSegment(mx, my, sp.x, sp.y, tip.x, tip.y).dist;
    if (d < bestD) {
      bestD = d;
      best = ["x", "y", "z"][i];
    }
  }
  if (best) return best;
  if (f.kind === "move") {
    for (const p of visiblePlanes(f)) {
      const q = planeQuad(cam2, f, p).map((w) => toScreen(cam2, w));
      if (pointInPolygon(mx, my, q)) return p.axis;
    }
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
    const k = getKnot(e);
    const isKnot = e.part === "knot";
    return {
      e,
      pos: elementWorldPosition(e),
      rot: isKnot ? knotWorldRotation(e.comp, k) : null,
      tin: isKnot ? tangentWorldVec(e.comp, e.spline, e.knot, "in") : null,
      tout: isKnot ? tangentWorldVec(e.comp, e.spline, e.knot, "out") : null,
      tvec: !isKnot ? tangentWorldVec(e.comp, e.spline, e.knot, e.part) : null
    };
  });
}
function startHandleDrag(cam2, f, axis, mx, my, elements) {
  const starts = captureStarts(elements);
  if (!starts.length) return null;
  if (f.kind === "move") return moveDrag(cam2, f, axis, mx, my, starts);
  if (f.kind === "rotate") return rotateDrag(cam2, f, axis, mx, my, starts);
  return scaleDrag(cam2, f, axis, mx, my, starts);
}
function constraintPoint(cam2, f, axis, mx, my) {
  const ray = screenRay(cam2, mx, my);
  if (axis in AXIS_INDEX) return closestOnLine(ray, f.pivot, f.axes[AXIS_INDEX[axis]]);
  if (axis === "free") return rayPlane(ray, f.pivot, cameraForward(cam2), true);
  const p = PLANES.find((pl) => pl.axis === axis);
  if (!p) return null;
  return rayPlane(ray, f.pivot, f.axes[p.n], true);
}
function moveDrag(cam2, f, axis, mx, my, starts) {
  const start = constraintPoint(cam2, f, axis, mx, my);
  if (!start) return null;
  return {
    frame: f,
    axis,
    update(x, y, ev) {
      const cur = constraintPoint(cam2, f, axis, x, y);
      if (!cur) return "";
      const delta = sub(v3(), cur, start);
      const snap = snapConfig();
      if (snap.isPositionSnapEnabled !== !!(ev == null ? void 0 : ev.ctrlKey)) {
        const steps = [snap.position.x, snap.position.y, snap.position.z];
        const out = v3();
        for (let i = 0; i < 3; i++) scaleAndAdd(out, out, f.axes[i], snapStep(dot(delta, f.axes[i]), steps[i]));
        copy(delta, out);
      }
      for (const s of starts) {
        const target = add(v3(), s.pos, delta);
        if (s.e.part === "knot") setKnotWorld(s.e.comp, s.e.spline, s.e.knot, target);
        else setTangentWorld(s.e.comp, s.e.spline, s.e.knot, s.e.part, target);
      }
      const d = [dot(delta, f.axes[0]), dot(delta, f.axes[1]), dot(delta, f.axes[2])].map((n) => n.toFixed(3));
      return `\u0394 ${d.join(", ")}`;
    }
  };
}
function signedAngle(a, b, n) {
  return Math.atan2(dot(cross(v3(), a, b), n), dot(a, b));
}
function rotateDrag(cam2, f, axis, mx, my, starts) {
  const n = axis === "view" ? scale(v3(), cameraForward(cam2), -1) : copy(v3(), f.axes[AXIS_INDEX[axis] ?? 2]);
  const pivot = copy(v3(), f.pivot);
  const sp = toScreen(cam2, pivot);
  const onPlane = (x, y) => {
    const hit = rayPlane(screenRay(cam2, x, y), pivot, n, true);
    if (!hit) return null;
    const v = sub(v3(), hit, pivot);
    return lenSq(v) > EPSILON ? v : null;
  };
  const facing = Math.abs(dot(n, cameraForward(cam2)));
  const useScreen = facing < 0.15;
  const v0 = useScreen ? null : onPlane(mx, my);
  const a0 = Math.atan2(my - sp.y, mx - sp.x);
  const screenSign = dot(n, cameraForward(cam2)) > 0 ? 1 : -1;
  return {
    frame: f,
    axis,
    update(x, y, ev) {
      let angle;
      const v1 = v0 ? onPlane(x, y) : null;
      if (v0 && v1) angle = signedAngle(v0, v1, n);
      else angle = (Math.atan2(y - sp.y, x - sp.x) - a0) * -screenSign;
      const snap = snapConfig();
      let deg = angle * 180 / Math.PI;
      if (snap.isRotationSnapEnabled !== !!(ev == null ? void 0 : ev.ctrlKey)) deg = snapStep(deg, snap.rotation || 15);
      const q = qFromAxisAngle(q4(), n, deg * Math.PI / 180);
      const many = starts.length > 1;
      for (const s of starts) {
        const e = s.e;
        const k = getKnot(e);
        if (!k) continue;
        if (e.part === "knot") {
          if (many || len(sub(v3(), s.pos, pivot)) > EPSILON) {
            const p = add(v3(), pivot, qRotate(v3(), q, sub(v3(), s.pos, pivot)));
            setKnotWorld(e.comp, e.spline, e.knot, p);
          }
          setKnotWorldRotation(e.comp, k, qMul(q4(), q, s.rot));
          applyTangentMode(e.comp.splines[e.spline], e.knot);
        } else {
          setTangentWorldVec(e.comp, e.spline, e.knot, e.part, qRotate(v3(), q, s.tvec));
        }
      }
      return `${deg.toFixed(1)}\xB0`;
    }
  };
}
function scaleDrag(cam2, f, axis, mx, my, starts) {
  const pivot = copy(v3(), f.pivot);
  const sp = toScreen(cam2, pivot);
  let dirX = 1;
  let dirY = 0;
  let screenLen = 80;
  if (axis in AXIS_INDEX) {
    const tip = toScreen(cam2, scaleAndAdd(v3(), pivot, f.axes[AXIS_INDEX[axis]], f.size));
    const dx = tip.x - sp.x;
    const dy = tip.y - sp.y;
    const l = Math.hypot(dx, dy);
    if (l > 1) {
      dirX = dx / l;
      dirY = dy / l;
      screenLen = l;
    }
  }
  const ax = f.axes;
  const scaleVec = (v, s) => {
    const out = v3();
    for (let i = 0; i < 3; i++) scaleAndAdd(out, out, ax[i], dot(v, ax[i]) * s[i]);
    return out;
  };
  return {
    frame: f,
    axis,
    update(x, y, ev) {
      let factor;
      if (axis === "free") factor = 1 + (x - mx + (y - my)) / 120;
      else factor = 1 + ((x - mx) * dirX + (y - my) * dirY) / screenLen;
      const snap = snapConfig();
      if (snap.isScaleSnapEnabled !== !!(ev == null ? void 0 : ev.ctrlKey)) factor = 1 + snapStep(factor - 1, snap.scale || 0.1);
      const s = axis === "free" ? [factor, factor, factor] : [1, 1, 1];
      if (axis in AXIS_INDEX) s[AXIS_INDEX[axis]] = factor;
      const many = starts.length > 1;
      for (const st of starts) {
        const e = st.e;
        const k = getKnot(e);
        if (!k) continue;
        if (e.part === "knot") {
          if (many) setKnotWorld(e.comp, e.spline, e.knot, add(v3(), pivot, scaleVec(sub(v3(), st.pos, pivot), s)));
          const spline = e.comp.splines[e.spline];
          if (tangentsEditable(k.mode)) {
            const tin = scaleVec(st.tin, s);
            const tout = scaleVec(st.tout, s);
            setTangentWorldVec(e.comp, e.spline, e.knot, "out", tout);
            if (k.mode === 4 /* Broken */) setTangentWorldVec(e.comp, e.spline, e.knot, "in", tin);
            else if (k.mode === 3 /* Continuous */) {
              const dir = normalize(v3(), tangentWorldVec(e.comp, e.spline, e.knot, "in"));
              if (lenSq(dir) > EPSILON) setTangentWorldVec(e.comp, e.spline, e.knot, "in", scale(v3(), dir, len(tin)));
            }
          }
          applyTangentMode(spline, e.knot);
        } else {
          setTangentWorldVec(e.comp, e.spline, e.knot, e.part, scaleVec(st.tvec, s));
        }
      }
      return `\xD7 ${factor.toFixed(3)}`;
    }
  };
}

// source/scene/context.ts
var BROADCAST_MS = 60;
function updateTargets() {
  const targets = currentTargets();
  const key2 = targets.map((c2) => c2.uuid).join(",");
  if (key2 !== S.targetsKey) {
    S.targetsKey = key2;
    bumpState();
  }
  S.lastTargets = targets;
  if (S.selection.validate(targets)) bumpState();
  const pending = S.pendingContext;
  if (pending) {
    if (targets.includes(pending.comp)) {
      S.pendingContext = null;
      setContext(true);
      setTool(pending.tool);
    } else if (Date.now() > pending.until) {
      S.pendingContext = null;
    }
  }
  if (!targets.length) {
    if (S.context) setContext(false);
    if (S.drawing) S.drawing = null;
  } else if (S.drawing && !targets.includes(S.drawing.comp)) {
    S.drawing = null;
  }
  return targets;
}
function setContext(on) {
  if (S.context === on) return;
  S.context = on;
  if (!on) {
    S.selection.clear();
    S.tool = "select";
    S.drawing = null;
    S.preview = null;
    S.hover = null;
  }
  bumpState();
  repaint();
}
function setTool(tool) {
  if (tool === "draw") setContext(true);
  if (S.tool === tool) return;
  S.tool = tool;
  S.drawing = null;
  S.preview = null;
  S.hover = null;
  bumpState();
  repaint();
}
function shared(values, eq = (a, b) => a === b) {
  if (!values.length) return null;
  return values.every((v) => eq(v, values[0])) ? values[0] : null;
}
function round(v) {
  return Math.round(v * 1e4) / 1e4;
}
function elementInfo(list) {
  if (!list.length) return null;
  const knots = list.filter((e) => e.part === "knot");
  const items = knots.length ? knots : list;
  const ks = items.map((e) => getKnot(e)).filter(Boolean);
  if (!ks.length) return null;
  const pos = (axis) => shared(ks.map((k) => round(k.position[axis])));
  const eulers = ks.map((k) => qToEuler(v3(), k.rotation));
  const rot = (axis) => shared(eulers.map((e) => round(e[axis])));
  const tin = shared(ks.map((k) => round(len(tangentInVec(v3(), k)))));
  const tout = shared(ks.map((k) => round(len(tangentOutVec(v3(), k)))));
  const first = items[0];
  const kind = knots.length ? "knot" : "tangent";
  let label;
  if (items.length === 1) {
    label = kind === "knot" ? `Knot ${first.knot}` + (first.comp.splines.length > 1 ? ` (Spline ${first.spline})` : "") : `${first.part === "in" ? "In" : "Out"} Tangent of Knot ${first.knot}`;
  } else {
    label = `${items.length} ${kind === "knot" ? "Knots" : "Tangents"}`;
  }
  return {
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
  const knots = S.selection.knots();
  const sameComp = knots.length > 0 && knots.every((e) => e.comp === knots[0].comp);
  const ends = knots.filter((e) => isEndKnot(e.comp.splines[e.spline], e.knot));
  const one = knots.length === 1 ? knots[0] : null;
  const oneSpline = one ? one.comp.splines[one.spline] : null;
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
  const knots = S.selection.all();
  const splines = /* @__PURE__ */ new Set();
  for (const e of knots) {
    const s = e.comp.splines[e.spline];
    if (s) splines.add(s);
  }
  if (!splines.size) for (const c2 of S.lastTargets) for (const s of c2.splines) splines.add(s);
  if (!splines.size) return null;
  return shared([...splines].map((s) => !!s.closed));
}
function panelState() {
  if (S.selection.validate(S.lastTargets)) bumpState();
  const list = S.selection.all();
  return {
    primary: S.primary,
    ready: true,
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
var lastSent = "";
var lastSentAt = 0;
var timer = null;
function maybeBroadcast(force = false) {
  if (!S.primary) return;
  const now = Date.now();
  const wait = BROADCAST_MS - (now - lastSentAt);
  if (!force && wait > 0) {
    if (!timer) timer = setTimeout(() => {
      timer = null;
      maybeBroadcast();
    }, wait);
    return;
  }
  let json;
  const state = panelState();
  try {
    json = JSON.stringify(state);
  } catch {
    return;
  }
  if (!force && json === lastSent) return;
  lastSent = json;
  lastSentAt = now;
  try {
    Editor.Message.broadcast("splines:state", state);
  } catch {
  }
}

// source/scene/render.ts
var KNOT_PX = 5;
var TANGENT_PX = 3.5;
var HIT_KNOT = 8;
var HIT_TANGENT = 7;
var HIT_CURVE = 6;
var _wc = curve();
function worldCurve(comp2, spline, i, out = _wc) {
  getCurve(spline, i, out);
  toWorld(comp2, out.p0, out.p0);
  toWorld(comp2, out.p1, out.p1);
  toWorld(comp2, out.p2, out.p2);
  toWorld(comp2, out.p3, out.p3);
  return out;
}
function curveSamples(cam2, c2) {
  const a = toScreen(cam2, c2.p0);
  const b = toScreen(cam2, c2.p1);
  const d = toScreen(cam2, c2.p2);
  const e = toScreen(cam2, c2.p3);
  if (!a.visible && !e.visible) return 8;
  const l = Math.hypot(b.x - a.x, b.y - a.y) + Math.hypot(d.x - b.x, d.y - b.y) + Math.hypot(e.x - d.x, e.y - d.y);
  return Math.max(4, Math.min(64, Math.ceil(l / 10)));
}
var pts = [];
function samplePoints(cam2, c2) {
  const n = curveSamples(cam2, c2);
  while (pts.length <= n) pts.push(v3());
  for (let i = 0; i <= n; i++) evalPosition(pts[i], c2, i / n);
  return pts.slice(0, n + 1);
}
function visibleTangents(targets) {
  const set2 = /* @__PURE__ */ new Set();
  if (!S.context) return set2;
  const addTangent = (comp2, s, k, part, allowAuto) => {
    const spline = comp2.splines[s];
    const knot = spline == null ? void 0 : spline.knots[k];
    if (!knot || !tangentUsed(spline, k, part)) return;
    if (!tangentsEditable(knot.mode) && !(allowAuto && knot.mode === 0 /* AutoSmooth */)) return;
    set2.add(`${comp2.uuid}:${s}:${k}:${part}`);
  };
  if (S.settings.showAllTangents) {
    for (const comp2 of targets) {
      comp2.splines.forEach((spline, s) => {
        for (let k = 0; k < spline.knots.length; k++) {
          addTangent(comp2, s, k, "in", false);
          addTangent(comp2, s, k, "out", false);
        }
      });
    }
  }
  for (const e of S.selection.all()) {
    const spline = e.comp.splines[e.spline];
    if (!spline) continue;
    const n = spline.knots.length;
    addTangent(e.comp, e.spline, e.knot, "in", e.part === "knot");
    addTangent(e.comp, e.spline, e.knot, "out", e.part === "knot");
    const p = prevIndex(e.knot, n, spline.closed);
    const q = nextIndex(e.knot, n, spline.closed);
    if (p !== e.knot) addTangent(e.comp, e.spline, p, "out", false);
    if (q !== e.knot) addTangent(e.comp, e.spline, q, "in", false);
  }
  return set2;
}
function hoverIs(kind, comp2, s, k, part) {
  const h = S.hover;
  if (!h || h.kind !== kind) return false;
  const r = h.ref;
  return r.comp === comp2 && r.spline === s && r.knot === k && r.part === part;
}
function hoverCurve(comp2, s, i) {
  const h = S.hover;
  return !!h && h.kind === "curve" && h.comp === comp2 && h.spline === s && h.curve === i;
}
var handleAxesOverride = null;
function setHandleAxesOverride(axes) {
  handleAxesOverride = axes;
}
function currentHandleFrame(cam2) {
  if (!S.context || S.tool !== "select") return null;
  const list = S.selection.all();
  if (!list.length) return null;
  return computeFrame(cam2, list, handleAxesOverride);
}
function drawFrame() {
  var _a2;
  if (!runtimeReady()) return;
  const cam2 = sceneCamera();
  if (!cam2) return;
  const targets = updateTargets();
  const containers = S.settings.showAll ? allContainers() : targets;
  if (!containers.length && !S.preview) {
    endLabels();
    return;
  }
  if (!beginDraw(cam2)) return;
  S.diag.draws++;
  beginLabels();
  const tangents = visibleTangents(targets);
  for (const comp2 of containers) {
    try {
      drawContainer(cam2, comp2, targets.includes(comp2), tangents);
    } catch (e) {
      S.diag.errors.length < 30 && S.diag.errors.push(String((e == null ? void 0 : e.stack) || e));
    }
  }
  if (S.context && S.tool === "select") {
    const f = currentHandleFrame(cam2);
    if (f) drawHandle(cam2, f, ((_a2 = S.hover) == null ? void 0 : _a2.kind) === "handle" ? S.hover.axis : dragAxis);
  }
  drawToolPreview(cam2);
  endLabels();
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
  if (previewDrawer) previewDrawer(cam2);
}
var _p3 = v3();
var _q3 = v3();
function drawContainer(cam2, comp2, isTarget, tangents) {
  const edit = isTarget && S.context;
  comp2.splines.forEach((spline, s) => {
    const count = curveCount(spline);
    for (let i = 0; i < count; i++) {
      const c2 = worldCurve(comp2, spline, i);
      const points = samplePoints(cam2, c2);
      let col = isTarget ? Colors.curveSelected : Colors.curveDim;
      if (edit && hoverCurve(comp2, s, i)) col = Colors.curveHover;
      polyline(points, col, isTarget ? 2 : 1);
      if (isTarget && S.settings.showFlow && points.length > 2) {
        evalPosition(_p3, c2, 0.5);
        evalDirection(_q3, c2, 0.5);
        chevron(_p3, _q3, 7, Colors.flow);
      }
      if (isTarget && S.settings.showNormals) {
        const n2 = 4;
        for (let j = 0; j <= n2; j++) {
          const t = j / n2;
          if (j === n2 && i < count - 1) continue;
          evalPosition(_p3, c2, t);
          const up = upAt(comp2, spline, i, t);
          const l = worldPerPixel(cam2, _p3) * 22;
          line(_p3, scaleAndAdd(v3(), _p3, up, l), Colors.normal);
        }
      }
    }
    if (!isTarget) return;
    const n = spline.knots.length;
    for (let k = 0; k < n; k++) {
      const pos = knotWorldPosition(comp2, s, k, v3());
      const sp = toScreen(cam2, pos);
      if (!sp.visible) continue;
      if (edit) {
        for (const part of ["in", "out"]) {
          if (!tangents.has(`${comp2.uuid}:${s}:${k}:${part}`)) continue;
          drawTangent(cam2, comp2, s, k, part, pos);
        }
      }
      drawKnot(cam2, comp2, s, k, pos, edit);
      if (S.settings.showKnotIndices && edit) {
        addLabel(cam2, sp.x, sp.y, n > 0 && spline.closed === false && k === 0 ? `${k} (start)` : String(k), "#ddd");
      }
    }
    if (n === 1 && edit) {
      const k = spline.knots[0];
      const pos = knotWorldPosition(comp2, s, 0, v3());
      const dir = dirToWorld(comp2, rotateZ(k), v3());
      chevron(scaleAndAdd(v3(), pos, normalize(v3(), dir), worldPerPixel(cam2, pos) * 22), dir, 7, Colors.flow);
    }
  });
}
function rotateZ(k) {
  const q = k.rotation;
  const x = 2 * (q.x * q.z + q.w * q.y);
  const y = 2 * (q.y * q.z - q.w * q.x);
  const z = 1 - 2 * (q.x * q.x + q.y * q.y);
  return v3(x, y, z);
}
function upAt(comp2, spline, curveIndex, t) {
  try {
    const local = curveUp(spline, spline.cache, curveIndex, t, v3());
    const w = dirToWorld(comp2, local, v3());
    return lenSq(w) > 0 ? normalize(w, w) : v3(0, 1, 0);
  } catch {
    return v3(0, 1, 0);
  }
}
function drawKnot(cam2, comp2, s, k, pos, edit) {
  const selected = edit && S.selection.hasKnot(comp2, s, k);
  const hovered = edit && hoverIs("knot", comp2, s, k, "knot");
  const linked = isLinked(comp2, { spline: s, knot: k });
  if (!edit) {
    disc(pos, 3, Colors.curveSelected, 10);
    return;
  }
  const r = selected || hovered ? KNOT_PX + 1 : KNOT_PX;
  disc(pos, r, selected ? Colors.selected : Colors.knot, 14);
  circle(pos, r, hovered ? Colors.hover : linked ? Colors.linked : Colors.knotOutline, 14);
  if (selected) {
    const knot = comp2.splines[s].knots[k];
    const wpp = worldPerPixel(cam2, pos);
    const fwd = normalize(v3(), dirToWorld(comp2, rotateZ(knot), v3()));
    const upLocal = upOf(knot);
    const up = normalize(v3(), dirToWorld(comp2, upLocal, v3()));
    if (lenSq(up) > 0) line(pos, scaleAndAdd(v3(), pos, up, wpp * 20), Colors.normal);
    if (lenSq(fwd) > 0 && knot.mode === 1 /* Linear */) line(pos, scaleAndAdd(v3(), pos, fwd, wpp * 14), Colors.selected);
  }
}
function upOf(k) {
  const q = k.rotation;
  const x = 2 * (q.x * q.y - q.w * q.z);
  const y = 1 - 2 * (q.x * q.x + q.z * q.z);
  const z = 2 * (q.y * q.z + q.w * q.x);
  return v3(x, y, z);
}
function drawTangent(cam2, comp2, s, k, part, knotPos) {
  const end = tangentWorldPosition(comp2, s, k, part, v3());
  const ref = { comp: comp2, spline: s, knot: k, part };
  const selected = S.selection.has(ref);
  const hovered = hoverIs("tangent", comp2, s, k, part);
  const auto = comp2.splines[s].knots[k].mode === 0 /* AutoSmooth */;
  const lineCol = selected ? Colors.selected : auto ? withAlpha(Colors.tangentLine, 120) : Colors.tangentLine;
  line(knotPos, end, lineCol);
  const col = selected ? Colors.selected : hovered ? Colors.hover : auto ? withAlpha(Colors.tangent, 140) : Colors.tangent;
  diamond(end, hovered || selected ? TANGENT_PX + 1 : TANGENT_PX, col, true);
}
function hitTest(cam2, mx, my, opts = {}) {
  const targets = S.lastTargets;
  if (!targets.length) return null;
  if (S.context && opts.handles !== false) {
    const f = currentHandleFrame(cam2);
    if (f) {
      const axis = hitHandle(cam2, f, mx, my);
      if (axis) return { kind: "handle", axis };
    }
  }
  const sp = { x: 0, y: 0, visible: true };
  if (S.context) {
    let best = null;
    let bestD = HIT_TANGENT;
    for (const key2 of visibleTangents(targets)) {
      const [uuid, ss, kk, part] = key2.split(":");
      const comp2 = targets.find((c2) => c2.uuid === uuid);
      if (!comp2) continue;
      const s = Number(ss);
      const k = Number(kk);
      toScreen(cam2, tangentWorldPosition(comp2, s, k, part), sp);
      if (!sp.visible) continue;
      const d = Math.hypot(sp.x - mx, sp.y - my);
      if (d < bestD) {
        bestD = d;
        best = { kind: "tangent", ref: { comp: comp2, spline: s, knot: k, part } };
      }
    }
    if (best) return best;
  }
  if (S.context || opts.outsideContext) {
    let best = null;
    let bestD = HIT_KNOT;
    for (const comp2 of targets) {
      comp2.splines.forEach((spline, s) => {
        for (let k = 0; k < spline.knots.length; k++) {
          toScreen(cam2, knotWorldPosition(comp2, s, k), sp);
          if (!sp.visible) continue;
          const d = Math.hypot(sp.x - mx, sp.y - my);
          if (d < bestD) {
            bestD = d;
            best = { kind: "knot", ref: { comp: comp2, spline: s, knot: k, part: "knot" } };
          }
        }
      });
    }
    if (best) return best;
  }
  if (opts.curves !== false && (S.context || opts.outsideContext)) return hitCurve(cam2, mx, my, targets);
  return null;
}
function hitCurve(cam2, mx, my, targets, maxPx = HIT_CURVE) {
  let best = null;
  let bestD = maxPx;
  const a = { x: 0, y: 0, visible: true };
  const b = { x: 0, y: 0, visible: true };
  for (const comp2 of targets) {
    comp2.splines.forEach((spline, s) => {
      const count = curveCount(spline);
      for (let i = 0; i < count; i++) {
        const c2 = worldCurve(comp2, spline, i, curve());
        const n = curveSamples(cam2, c2) * 2;
        const p = v3();
        evalPosition(p, c2, 0);
        toScreen(cam2, p, a);
        for (let j = 1; j <= n; j++) {
          evalPosition(p, c2, j / n);
          toScreen(cam2, p, b);
          if (a.visible && b.visible) {
            const r = distToSegment(mx, my, a.x, a.y, b.x, b.y);
            if (r.dist < bestD) {
              bestD = r.dist;
              const t = (j - 1 + r.f) / n;
              best = { kind: "curve", comp: comp2, spline: s, curve: i, t, world: evalPosition(v3(), c2, t) };
            }
          }
          a.x = b.x;
          a.y = b.y;
          a.visible = b.visible;
        }
      }
    });
  }
  return best;
}
function knotsInRect(cam2, x0, y0, x1, y1) {
  const minX = Math.min(x0, x1);
  const maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1);
  const maxY = Math.max(y0, y1);
  const res = [];
  const sp = { x: 0, y: 0, visible: true };
  for (const comp2 of S.lastTargets) {
    comp2.splines.forEach((spline, s) => {
      for (let k = 0; k < spline.knots.length; k++) {
        toScreen(cam2, knotWorldPosition(comp2, s, k), sp);
        if (sp.visible && sp.x >= minX && sp.x <= maxX && sp.y >= minY && sp.y <= maxY) {
          res.push({ comp: comp2, spline: s, knot: k, part: "knot" });
        }
      }
    });
  }
  return res;
}

// source/scene/undo.ts
async function request2(name, ...args) {
  return Editor.Message.request("scene", name, ...args);
}
async function beginRecording(uuids) {
  if (!uuids.length) return null;
  try {
    const id = await request2("begin-recording", uuids);
    return typeof id === "string" && id ? id : null;
  } catch (e) {
    console.warn("[Splines] begin-recording failed:", e);
    return null;
  }
}
async function endRecording(id, cancel = false) {
  if (!id) return;
  try {
    await request2(cancel ? "cancel-recording" : "end-recording", id);
  } catch (e) {
    console.warn("[Splines] end-recording failed:", e);
  }
}
function nodesOf(comps) {
  const set2 = /* @__PURE__ */ new Set();
  for (const c2 of comps) if (c2 && c2.isValid && c2.node && c2.node.isValid) set2.add(c2.node);
  return [...set2];
}
function afterEdit(comps) {
  var _a2, _b2;
  for (const c2 of comps) {
    if (!c2 || !c2.isValid) continue;
    for (const s of c2.splines) (_a2 = s.markDirty) == null ? void 0 : _a2.call(s);
    try {
      (_b2 = c2.checkChanged) == null ? void 0 : _b2.call(c2);
    } catch {
    }
  }
  for (const n of nodesOf(comps)) notifyNodeChanged(n);
  repaint();
}
async function recordEdit(comps, fn) {
  const id = await beginRecording(nodesOf(comps).map((n) => n.uuid));
  let ok = false;
  try {
    fn();
    ok = true;
  } finally {
    afterEdit(comps);
    await endRecording(id, !ok);
  }
}
var NOTIFY_MS = 120;
var EditSession = class {
  constructor(comps) {
    this.comps = comps;
    this.id = null;
    this.opened = false;
    this.ended = false;
    this.pending = null;
    this.changed = false;
    this.notifiedAt = 0;
    this.ready = beginRecording(nodesOf(comps).map((n) => n.uuid)).then((id) => {
      this.id = id;
      this.opened = true;
      if (this.pending && !this.ended) {
        const fn = this.pending;
        this.pending = null;
        this.run(fn);
      }
    });
  }
  /** Applies an edit (now, or as soon as the recording is open). */
  apply(fn) {
    if (this.ended) return;
    if (!this.opened) {
      this.pending = fn;
      return;
    }
    this.run(fn);
  }
  run(fn) {
    var _a2;
    fn();
    this.changed = true;
    for (const c2 of this.comps) for (const s of c2.splines) (_a2 = s.markDirty) == null ? void 0 : _a2.call(s);
    const now = Date.now();
    if (now - this.notifiedAt > NOTIFY_MS) {
      this.notifiedAt = now;
      for (const n of nodesOf(this.comps)) notifyNodeChanged(n);
    }
    repaint();
  }
  async end() {
    if (this.ended) return;
    this.ended = true;
    await this.ready;
    if (this.pending) {
      const fn = this.pending;
      this.pending = null;
      this.run(fn);
    }
    if (this.changed) afterEdit(this.comps);
    await endRecording(this.id, !this.changed);
  }
};

// source/scene/ops.ts
function compsOf(list) {
  return [...new Set(list.map((e) => e.comp))];
}
function touched() {
  bumpState();
  maybeBroadcast();
  repaint();
}
async function deleteSelection() {
  const list = S.selection.all();
  if (!list.length) return;
  const comps = compsOf(list);
  await recordEdit(comps, () => {
    for (const e of list) {
      if (e.part === "knot") continue;
      if (S.selection.hasKnot(e.comp, e.spline, e.knot)) continue;
      const spline = e.comp.splines[e.spline];
      const k = spline == null ? void 0 : spline.knots[e.knot];
      if (!k) continue;
      if (k.mode !== 4 /* Broken */) setTangentMode(spline, e.knot, 4 /* Broken */);
      set(e.part === "in" ? k.tangentIn : k.tangentOut, 0, 0, 0);
    }
    for (const comp2 of comps) {
      const refs = list.filter((e) => e.comp === comp2 && e.part === "knot").map((e) => ({ spline: e.spline, knot: e.knot }));
      if (refs.length) containerRemoveKnots(comp2, refs);
    }
  });
  S.selection.clear();
  touched();
}
async function setModeSelected(mode) {
  const knots = selectedOwnerKnots();
  if (!knots.length) return;
  await recordEdit(compsOf(knots), () => {
    for (const e of knots) setTangentMode(e.comp.splines[e.spline], e.knot, mode);
  });
  touched();
}
function selectedOwnerKnots() {
  const seen = /* @__PURE__ */ new Set();
  const res = [];
  for (const e of S.selection.all()) {
    const key2 = `${e.comp.uuid}:${e.spline}:${e.knot}`;
    if (seen.has(key2) || !getKnot(e)) continue;
    seen.add(key2);
    res.push({ ...e, part: "knot" });
  }
  return res;
}
var CYCLE = [1 /* Linear */, 0 /* AutoSmooth */, 2 /* Mirrored */, 3 /* Continuous */, 4 /* Broken */];
async function cycleModeSelected() {
  const knots = selectedOwnerKnots();
  if (!knots.length) return;
  const k = getKnot(knots[0]);
  const next = CYCLE[(CYCLE.indexOf(k.mode) + 1) % CYCLE.length];
  await setModeSelected(next);
}
async function linkSelected() {
  const knots = S.selection.knots();
  if (knots.length < 2 || !knots.every((e) => e.comp === knots[0].comp)) return;
  const comp2 = knots[0].comp;
  const ordered = [knots[knots.length - 1], ...knots.slice(0, -1)];
  await recordEdit([comp2], () => linkKnots(comp2, ordered.map((e) => ({ spline: e.spline, knot: e.knot })), factory));
  touched();
}
async function unlinkSelected() {
  const knots = S.selection.knots();
  if (!knots.length) return;
  await recordEdit(compsOf(knots), () => {
    for (const comp2 of compsOf(knots)) {
      unlinkKnots(comp2, knots.filter((e) => e.comp === comp2).map((e) => ({ spline: e.spline, knot: e.knot })));
    }
  });
  touched();
}
async function splitSelected() {
  const knots = S.selection.knots();
  if (knots.length !== 1) return;
  const e = knots[0];
  let res = null;
  await recordEdit([e.comp], () => {
    res = splitKnot(e.comp, { spline: e.spline, knot: e.knot }, factory);
  });
  const r = res;
  if (r) S.selection.set([{ comp: e.comp, spline: r.spline, knot: r.knot, part: "knot" }]);
  touched();
}
async function joinSelected() {
  const knots = S.selection.knots();
  if (knots.length !== 2 || knots[0].comp !== knots[1].comp) return;
  const comp2 = knots[0].comp;
  const a = knots[1];
  const b = knots[0];
  let res = null;
  await recordEdit([comp2], () => {
    res = joinKnots(comp2, { spline: a.spline, knot: a.knot }, { spline: b.spline, knot: b.knot }, factory);
  });
  const r = res;
  S.selection.set(r ? [{ comp: comp2, spline: r.spline, knot: r.knot, part: "knot" }] : []);
  touched();
}
function selectedSplines() {
  const list = S.selection.all();
  const res = [];
  const add2 = (comp2, spline) => {
    if (!res.some((r) => r.comp === comp2 && r.spline === spline)) res.push({ comp: comp2, spline });
  };
  if (list.length) for (const e of list) add2(e.comp, e.spline);
  else for (const comp2 of S.lastTargets) comp2.splines.forEach((_, i) => add2(comp2, i));
  return res;
}
async function reverseSelected() {
  const splines = selectedSplines();
  if (!splines.length) return;
  const before = S.selection.all().map((e) => {
    var _a2;
    return { ...e, count: ((_a2 = e.comp.splines[e.spline]) == null ? void 0 : _a2.knots.length) ?? 0 };
  });
  await recordEdit([...new Set(splines.map((s) => s.comp))], () => {
    for (const s of splines) containerReverse(s.comp, s.spline);
  });
  S.selection.set(before.map((e) => ({
    comp: e.comp,
    spline: e.spline,
    knot: e.count - 1 - e.knot,
    part: e.part === "in" ? "out" : e.part === "out" ? "in" : "knot"
  })));
  touched();
}
async function setClosedSelected(closed) {
  const splines = selectedSplines();
  if (!splines.length) return;
  const target = closed ?? !splines.every((s) => s.comp.splines[s.spline].closed);
  await recordEdit([...new Set(splines.map((s) => s.comp))], () => {
    for (const s of splines) {
      const spline = s.comp.splines[s.spline];
      if (spline.knots.length >= 2 || !target) setClosed(spline, target);
    }
  });
  touched();
}
function selectAll() {
  const list = [];
  for (const comp2 of S.lastTargets) {
    comp2.splines.forEach((spline, s) => {
      for (let k = 0; k < spline.knots.length; k++) list.push({ comp: comp2, spline: s, knot: k, part: "knot" });
    });
  }
  if (!list.length) return;
  setContext(true);
  S.selection.set(list);
  touched();
}
function clearSelection() {
  S.selection.clear();
  touched();
}
async function insertOnCurve2(comp2, spline, curveIndex, t) {
  let index = -1;
  await recordEdit([comp2], () => {
    index = containerInsertOnCurve(comp2, spline, curveIndex, t, factory);
  });
  if (index >= 0) S.selection.set([{ comp: comp2, spline, knot: index, part: "knot" }]);
  touched();
}
function applyProps(comp2, s, k, p) {
  const spline = comp2.splines[s];
  const knot = spline == null ? void 0 : spline.knots[k];
  if (!knot) return;
  if (p.position) {
    const pos = v3(knot.position.x, knot.position.y, knot.position.z);
    if (p.position[0] != null) pos.x = p.position[0];
    if (p.position[1] != null) pos.y = p.position[1];
    if (p.position[2] != null) pos.z = p.position[2];
    setKnotPosition(spline, k, pos);
    syncLinked(comp2, { spline: s, knot: k });
  }
  if (p.rotation) {
    const e = qToEuler(v3(), knot.rotation);
    if (p.rotation[0] != null) e.x = p.rotation[0];
    if (p.rotation[1] != null) e.y = p.rotation[1];
    if (p.rotation[2] != null) e.z = p.rotation[2];
    setRotation(spline, k, qFromEuler(q4(), e.x, e.y, e.z));
  }
  if (p.mode !== void 0 && p.mode !== null) setTangentMode(spline, k, p.mode);
  if (p.tension !== void 0 && p.tension !== null) setTension(spline, k, Math.max(0, Math.min(1, p.tension)));
  for (const part of ["in", "out"]) {
    const value = part === "in" ? p.tangentIn : p.tangentOut;
    if (value === void 0 || value === null) continue;
    const cur = part === "in" ? tangentInVec(v3(), knot) : tangentOutVec(v3(), knot);
    let dir = normalize(v3(), cur);
    if (lenSq(dir) < 1e-12) {
      const fwd = tangentOutVec(v3(), { ...knot, tangentOut: { x: 0, y: 0, z: 1 } });
      dir = part === "in" ? scale(v3(), fwd, -1) : fwd;
    }
    setTangentVec(spline, k, part, scale(v3(), dir, Math.max(0, value)));
  }
}
async function setElementProps(props) {
  const knots = selectedOwnerKnots();
  if (!knots.length) return;
  await recordEdit(compsOf(knots), () => {
    for (const e of knots) applyProps(e.comp, e.spline, e.knot, props);
  });
  touched();
}
function knotInfo(comp2, s, k, knot) {
  const e = qToEuler(v3(), knot.rotation);
  const r = (n) => Math.round(n * 1e4) / 1e4;
  return {
    position: [r(knot.position.x), r(knot.position.y), r(knot.position.z)],
    rotation: [r(e.x), r(e.y), r(e.z)],
    mode: knot.mode,
    tension: r(knot.tension),
    tangentIn: r(len(tangentInVec(v3(), knot))),
    tangentOut: r(len(tangentOutVec(v3(), knot))),
    linked: isLinked(comp2, { spline: s, knot: k }),
    selected: S.context && S.selection.hasKnot(comp2, s, k)
  };
}
function containerInfo(compUuid) {
  const comp2 = findComponent2(compUuid);
  if (!comp2 || !comp2.splines) return null;
  return {
    uuid: comp2.uuid,
    node: comp2.node.uuid,
    context: S.context && S.lastTargets.includes(comp2),
    tool: S.tool,
    drawing: !!S.drawing && S.drawing.comp === comp2,
    splines: comp2.splines.map((spline, s) => {
      var _a2;
      return {
        closed: !!spline.closed,
        length: Math.round((((_a2 = comp2.calculateLength) == null ? void 0 : _a2.call(comp2, s)) ?? 0) * 1e3) / 1e3,
        knots: spline.knots.map((knot, k) => knotInfo(comp2, s, k, knot))
      };
    }),
    actions: availableActions()
  };
}
async function editKnot(compUuid, s, k, props) {
  const comp2 = findComponent2(compUuid);
  if (!comp2) return;
  await recordEdit([comp2], () => applyProps(comp2, s, k, props));
  touched();
}
async function splineAction(compUuid, s, action, arg) {
  const comp2 = findComponent2(compUuid);
  if (!comp2) return null;
  switch (action) {
    case "addSpline": {
      await recordEdit([comp2], () => {
        const spline = factory.spline();
        comp2.splines.push(spline);
      });
      break;
    }
    case "removeSpline":
      if (comp2.splines.length <= 1) {
        await recordEdit([comp2], () => {
          comp2.splines[0].knots.length = 0;
          comp2.splines[0].closed = false;
          comp2.links.length = 0;
        });
      } else {
        await recordEdit([comp2], () => containerRemoveSpline(comp2, s));
      }
      S.selection.clear();
      break;
    case "reverse":
      await recordEdit([comp2], () => containerReverse(comp2, s));
      S.selection.clear();
      break;
    case "closed":
      await recordEdit([comp2], () => setClosed(comp2.splines[s], !!arg));
      break;
    case "addKnot": {
      const spline = comp2.splines[s];
      await recordEdit([comp2], () => {
        const k = factory.knot();
        const n = spline.knots.length;
        const last = spline.knots[n - 1];
        const prev = spline.knots[n - 2];
        if (last && prev) {
          set(k.position, last.position.x * 2 - prev.position.x, last.position.y * 2 - prev.position.y, last.position.z * 2 - prev.position.z);
        } else if (last) {
          set(k.position, last.position.x + 1, last.position.y, last.position.z);
        }
        k.mode = S.settings.defaultMode;
        k.tension = DEFAULT_TENSION;
        if (last) qCopy(k.rotation, last.rotation);
        spline.knots.push(k);
        applyTangentMode(spline, spline.knots.length - 1);
        if (n > 0) applyTangentMode(spline, n - 1);
      });
      break;
    }
    case "removeKnot":
      await recordEdit([comp2], () => containerRemoveKnots(comp2, [{ spline: s, knot: Number(arg) }]));
      S.selection.clear();
      break;
    case "selectKnot": {
      setContext(true);
      const e = { comp: comp2, spline: s, knot: Number((arg == null ? void 0 : arg.knot) ?? arg), part: "knot" };
      if (arg == null ? void 0 : arg.additive) S.selection.toggle(e);
      else S.selection.set([e]);
      break;
    }
    case "setModeAll":
      await recordEdit([comp2], () => {
        const spline = comp2.splines[s];
        for (let i = 0; i < spline.knots.length; i++) setTangentMode(spline, i, Number(arg));
      });
      break;
    case "refresh":
      await recordEdit([comp2], () => comp2.splines.forEach((sp) => refreshAll(sp)));
      break;
  }
  touched();
  return containerInfo(compUuid);
}
function niceSize(v) {
  if (!(v > 0)) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}
function viewCenter(is2D) {
  const cam2 = sceneCamera();
  if (!cam2) return { pos: v3(), size: is2D ? 100 : 1 };
  const ray = screenRay(cam2, cam2.width / 2, cam2.height / 2);
  let pos = rayPlane(ray, v3(), is2D ? v3(0, 0, 1) : v3(0, 1, 0));
  if (!pos) {
    const f = cameraForward(cam2);
    const c2 = cameraPosition(cam2);
    pos = v3(c2.x + f.x * 10, c2.y + f.y * 10, c2.z + f.z * 10);
  }
  const size = niceSize(worldPerPixel(cam2, pos) * Math.min(cam2.width, cam2.height) * 0.18);
  return { pos, size };
}
var SHAPES = ["line", "square", "rounded-square", "circle", "polygon", "star", "helix"];
async function createSplineNode(kind) {
  const is2D = is2DView();
  const sel = selectedNodeUuids();
  const options = { name: kind === "draw" ? "Spline" : `Spline ${kind.replace("-", " ").replace(/\b\w/g, (c2) => c2.toUpperCase())}` };
  if (sel.length) options.parent = sel[0];
  if (is2D) options.canvasRequired = true;
  const uuid = await Editor.Message.request("scene", "create-node", options);
  if (!uuid || typeof uuid !== "string") return null;
  await Editor.Message.request("scene", "create-component", { uuid, component: "SplineContainer" });
  const node2 = findNode2(uuid);
  const C = containerClass();
  const comp2 = node2 && C ? node2.getComponent(C) : null;
  if (!comp2) return uuid;
  const { pos, size } = viewCenter(is2D);
  await recordEdit([comp2], () => {
    node2.setWorldPosition(pos.x, pos.y, pos.z);
    if (!comp2.splines.length) comp2.splines.push(factory.spline());
    const spline = comp2.splines[0];
    if (kind !== "draw" && SHAPES.includes(kind)) {
      buildShape(spline, kind, { size, plane2D: is2D, sides: kind === "star" ? 5 : 6, turns: 3, height: size * 2 }, factory);
    } else {
      spline.knots.length = 0;
    }
  });
  afterEdit([comp2]);
  try {
    Editor.Selection.clear("node");
    Editor.Selection.select("node", uuid);
  } catch {
  }
  S.pendingContext = { comp: comp2, tool: kind === "draw" ? "draw" : "select", until: Date.now() + 3e3 };
  repaint();
  return uuid;
}

// source/scene/input.ts
var PRIORITY = 100;
var DRAG_PX = 4;
var active = null;
var lastHoverKey = "";
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
  const key2 = hitKey(h);
  S.hover = h;
  if (key2 !== lastHoverKey) {
    lastHoverKey = key2;
    repaint();
  }
}
function selectionChanged() {
  bumpState();
  maybeBroadcast();
  repaint();
}
function canEdit() {
  return S.primary && !S.replaying && runtimeReady();
}
function pointer(ev) {
  const cam2 = sceneCamera();
  if (!cam2) return null;
  const p = eventToScreen(cam2, ev);
  return { cam: cam2, x: p.x, y: p.y };
}
function onMouseDown(ev) {
  if (!canEdit()) return true;
  if (active) cancelActive();
  S.diag.mouseDowns++;
  const left = ev.button === 0 || ev.button === void 0 && ev.leftButton;
  if (!left || ev.altKey) return true;
  const p = pointer(ev);
  if (!p) return true;
  const targets = updateTargets();
  if (!targets.length) return true;
  try {
    if (S.tool === "draw") return drawDown(p.cam, p.x, p.y, ev);
    return selectDown(p.cam, p.x, p.y, ev);
  } catch (e) {
    note(`mousedown: ${(e == null ? void 0 : e.stack) || e}`);
    active = null;
    return true;
  }
}
function selectDown(cam2, x, y, ev) {
  const hit = hitTest(cam2, x, y, { outsideContext: !S.context });
  if (!S.context) {
    if ((hit == null ? void 0 : hit.kind) !== "knot") return true;
    setContext(true);
  }
  S.diag.blocked++;
  if ((hit == null ? void 0 : hit.kind) === "handle") {
    const frame = currentHandleFrame(cam2);
    const elements = S.selection.all();
    if (!frame) return false;
    const drag2 = startHandleDrag(cam2, frame, hit.axis, x, y, elements);
    if (!drag2) return false;
    setHandleAxesOverride(frame.axes);
    setDragAxis(hit.axis);
    active = { kind: "handle", drag: drag2, session: new EditSession(compsOf2(elements)) };
    return false;
  }
  if ((hit == null ? void 0 : hit.kind) === "knot" || (hit == null ? void 0 : hit.kind) === "tangent") {
    const ref = hit.ref;
    const additive = !!(ev.shiftKey || ev.ctrlKey || ev.metaKey);
    let toggled = false;
    if (additive) {
      S.selection.toggle(ref);
      toggled = true;
    } else if (!S.selection.has(ref)) {
      S.selection.set([ref]);
    } else {
      S.selection.add(ref);
    }
    selectionChanged();
    active = { kind: "element", ref, x0: x, y0: y, dragging: false, toggled, session: null, grab: null, starts: [] };
    return false;
  }
  active = {
    kind: "rect",
    x0: x,
    y0: y,
    moved: false,
    additive: !!(ev.shiftKey || ev.ctrlKey || ev.metaKey),
    base: S.selection.all(),
    down: cloneEvent(ev),
    onCurve: (hit == null ? void 0 : hit.kind) === "curve"
  };
  return false;
}
function cloneEvent(ev) {
  const o = {};
  for (const k in ev) {
    const v = ev[k];
    if (typeof v !== "function") o[k] = v;
  }
  return o;
}
function onMouseMove(ev) {
  if (!canEdit()) return true;
  const p = pointer(ev);
  if (!p) return true;
  try {
    if (!active) {
      hover(p.cam, p.x, p.y, ev);
      return true;
    }
    return dragMove(p.cam, p.x, p.y, ev);
  } catch (e) {
    note(`mousemove: ${(e == null ? void 0 : e.stack) || e}`);
    return true;
  }
}
function hover(cam2, x, y, ev) {
  if (!S.lastTargets.length) {
    if (S.hover) setHover(null);
    return;
  }
  if (S.tool === "draw") {
    const hit2 = hitTest(cam2, x, y, { handles: false, outsideContext: true });
    setHover(hit2 && (hit2.kind === "knot" || hit2.kind === "curve") ? hit2 : null);
    const comp2 = drawComp();
    const place = comp2 ? placement(cam2, x, y, comp2) : null;
    S.preview = place ? place.world : null;
    repaint();
    return;
  }
  const hit = hitTest(cam2, x, y, { outsideContext: !S.context, curves: S.context });
  setHover(S.context || (hit == null ? void 0 : hit.kind) === "knot" ? hit : null);
}
function dragMove(cam2, x, y, ev) {
  const a = active;
  switch (a.kind) {
    case "handle": {
      let text = "";
      a.session.apply(() => {
        text = a.drag.update(x, y, ev);
      });
      if (text) showTip(cam2, x, y, text);
      return false;
    }
    case "element": {
      if (!a.dragging) {
        if (Math.hypot(x - a.x0, y - a.y0) < DRAG_PX || a.toggled) return false;
        a.dragging = true;
        const elements = movableElements(S.selection.all());
        a.starts = elements.map((e) => ({ e, pos: elementWorldPosition(e) }));
        a.grab = elementWorldPosition(a.ref);
        a.session = new EditSession(compsOf2(elements));
      }
      const grab = a.grab;
      const n = cameraForward(cam2);
      const hit = rayPlane(screenRay(cam2, x, y), grab, n, true);
      if (!hit) return false;
      const delta = sub(v3(), hit, grab);
      const snap = snapConfig();
      if (snap.isPositionSnapEnabled !== !!ev.ctrlKey && a.ref.part === "knot") {
        const target = add(v3(), grab, delta);
        target.x = Math.round(target.x / (snap.position.x || 1)) * (snap.position.x || 1);
        target.y = Math.round(target.y / (snap.position.y || 1)) * (snap.position.y || 1);
        if (!is2DView()) target.z = Math.round(target.z / (snap.position.z || 1)) * (snap.position.z || 1);
        sub(delta, target, grab);
      }
      a.session.apply(() => {
        for (const s of a.starts) {
          const target = add(v3(), s.pos, delta);
          if (s.e.part === "knot") setKnotWorld(s.e.comp, s.e.spline, s.e.knot, target);
          else setTangentWorld(s.e.comp, s.e.spline, s.e.knot, s.e.part, target);
        }
      });
      return false;
    }
    case "rect": {
      if (!a.moved && Math.hypot(x - a.x0, y - a.y0) < DRAG_PX) return false;
      a.moved = true;
      showRect(cam2, a.x0, a.y0, x, y);
      const inside = knotsInRect(cam2, a.x0, a.y0, x, y);
      S.selection.set(a.additive ? [...a.base, ...inside] : inside);
      selectionChanged();
      return false;
    }
    case "draw":
      drawDrag(cam2, x, y, a);
      return false;
  }
  return false;
}
function movableElements(list) {
  return list.filter((e) => e.part === "knot" || !list.some((o) => o.part === "knot" && o.comp === e.comp && o.spline === e.spline && o.knot === e.knot));
}
function onMouseUp(ev) {
  if (S.replaying) return true;
  if (!active) return true;
  const a = active;
  active = null;
  const p = pointer(ev);
  try {
    switch (a.kind) {
      case "handle":
        a.session.end();
        setHandleAxesOverride(null);
        setDragAxis(null);
        hideTip();
        break;
      case "element":
        if (a.session) a.session.end();
        else if (!a.toggled && S.selection.size > 1 && !a.dragging) {
          S.selection.set([a.ref]);
        }
        break;
      case "rect":
        hideRect();
        if (!a.moved) {
          if (a.onCurve) {
            if (!a.additive) clearSelection();
          } else if (S.selection.size && !a.additive) {
            clearSelection();
          } else if (!a.additive) {
            replayClick(a.down, ev);
          }
        }
        break;
      case "draw":
        a.session.end();
        break;
    }
  } catch (e) {
    note(`mouseup: ${(e == null ? void 0 : e.stack) || e}`);
  }
  selectionChanged();
  return false;
}
function replayClick(down, up) {
  const op = cce2().Operation;
  if (!(op == null ? void 0 : op.emit)) return;
  S.replaying = true;
  try {
    op.emit("mousedown", down);
    op.emit("mouseup", up);
  } catch (e) {
    note(`replay: ${e}`);
  } finally {
    S.replaying = false;
  }
}
function onDblClick(ev) {
  if (!canEdit() || !S.context || S.tool !== "select") return true;
  const p = pointer(ev);
  if (!p) return true;
  const hit = hitTest(p.cam, p.x, p.y, { handles: false });
  if ((hit == null ? void 0 : hit.kind) !== "curve") return true;
  insertOnCurve2(hit.comp, hit.spline, hit.curve, hit.t);
  return false;
}
function cancelActive() {
  if (!active) return;
  const a = active;
  active = null;
  if (a.kind === "handle" || a.kind === "draw") a.session.end();
  if (a.kind === "element" && a.session) a.session.end();
  setHandleAxesOverride(null);
  setDragAxis(null);
  hideRect();
  hideTip();
}
function isDragging() {
  return !!active;
}
function drawComp() {
  if (S.drawing && S.lastTargets.includes(S.drawing.comp)) return S.drawing.comp;
  return S.lastTargets[S.drawTarget % Math.max(1, S.lastTargets.length)] ?? null;
}
function drawNormal(comp2) {
  const n = dirToWorld(comp2, is2DView() ? v3(0, 0, 1) : v3(0, 1, 0));
  return lenSq(n) > 1e-12 ? normalize(n, n) : v3(0, 1, 0);
}
function placement(cam2, x, y, comp2) {
  const ray = screenRay(cam2, x, y);
  const normal = drawNormal(comp2);
  if (S.settings.drawOnSurfaces && !is2DView()) {
    const hit = raycastScene(ray);
    if (hit) return { world: hit, normal };
  }
  let ref = toWorld(comp2, v3());
  if (S.drawing && S.drawing.comp === comp2) {
    const s = comp2.splines[S.drawing.spline];
    if (s && s.knots.length) {
      const k = S.drawing.end === "end" ? s.knots.length - 1 : 0;
      ref = knotWorldPosition(comp2, S.drawing.spline, k);
    }
  }
  let p = null;
  if (Math.abs(dot(ray.d, normal)) > 0.02) p = rayPlane(ray, ref, normal);
  if (!p) p = rayPlane(ray, ref, cameraForward(cam2), true);
  if (!p) return null;
  if (!is2DView()) {
    const snap = snapConfig();
    if (snap.isPositionSnapEnabled) {
      p.x = Math.round(p.x / (snap.position.x || 1)) * (snap.position.x || 1);
      p.z = Math.round(p.z / (snap.position.z || 1)) * (snap.position.z || 1);
    }
  }
  return { world: p, normal };
}
function raycastScene(ray) {
  try {
    const { director: director2, geometry: geometry3, CCObject: CCObject2 } = cc();
    const scene2 = director2.getScene();
    const rs = scene2 == null ? void 0 : scene2.renderScene;
    if (!rs) return null;
    const r = new geometry3.Ray(ray.o.x, ray.o.y, ray.o.z, ray.d.x, ray.d.y, ray.d.z);
    const hidden = CCObject2.Flags.DontSave | CCObject2.Flags.HideInHierarchy;
    let best = Infinity;
    const opts = { mode: geometry3.ERaycastMode.CLOSEST, distance: Infinity, doubleSided: false };
    for (const model of rs.models) {
      const node2 = model.node;
      if (!model.enabled || !node2 || !node2.activeInHierarchy || node2.scene !== scene2) continue;
      if (hasFlags(node2, hidden)) continue;
      if (model.worldBounds && !geometry3.intersect.rayAABB(r, model.worldBounds)) continue;
      const d = geometry3.intersect.rayModel(r, model, opts);
      if (d > 0 && d < best) best = d;
    }
    if (!isFinite(best)) return null;
    return scaleAndAdd(v3(), ray.o, ray.d, best);
  } catch (e) {
    note(`raycast: ${e}`);
    return null;
  }
}
function hasFlags(node2, flags) {
  for (let n = node2; n; n = n.parent) if ((n._objFlags & flags) !== 0) return true;
  return false;
}
function drawDown(cam2, x, y, ev) {
  const comp2 = drawComp();
  if (!comp2) return true;
  S.diag.blocked++;
  const hit = hitTest(cam2, x, y, { handles: false, outsideContext: true });
  if (S.drawing) {
    const d = S.drawing;
    const s = d.comp.splines[d.spline];
    if ((hit == null ? void 0 : hit.kind) === "knot" && hit.ref.comp === d.comp && hit.ref.spline === d.spline && s && s.knots.length >= 2) {
      const other = d.end === "end" ? 0 : s.knots.length - 1;
      if (hit.ref.knot === other) {
        recordEdit([d.comp], () => setClosed(s, true));
        S.drawing = null;
        S.selection.set([{ comp: d.comp, spline: d.spline, knot: other, part: "knot" }]);
        selectionChanged();
        return false;
      }
    }
  } else if ((hit == null ? void 0 : hit.kind) === "knot") {
    const s = hit.ref.comp.splines[hit.ref.spline];
    if (s && isEndKnot(s, hit.ref.knot)) {
      S.drawing = { comp: hit.ref.comp, spline: hit.ref.spline, end: hit.ref.knot === 0 && s.knots.length > 1 ? "start" : "end" };
      S.selection.set([hit.ref]);
      selectionChanged();
      return false;
    }
  } else if ((hit == null ? void 0 : hit.kind) === "curve") {
    insertOnCurve2(hit.comp, hit.spline, hit.curve, hit.t);
    return false;
  }
  const place = placement(cam2, x, y, comp2);
  if (!place) return false;
  const target = S.drawing ? S.drawing.comp : comp2;
  const session = new EditSession([target]);
  const a = {
    kind: "draw",
    comp: target,
    spline: -1,
    knot: -1,
    part: "out",
    x0: x,
    y0: y,
    dragging: false,
    session,
    normal: place.normal
  };
  active = a;
  session.apply(() => {
    if (!S.drawing) {
      let index2 = target.splines.findIndex((s2) => s2.knots.length === 0);
      if (index2 < 0) {
        target.splines.push(factory.spline());
        index2 = target.splines.length - 1;
      }
      S.drawing = { comp: target, spline: index2, end: "end" };
    }
    const d = S.drawing;
    const s = target.splines[d.spline];
    const k = factory.knot();
    copy(k.position, toLocal(target, place.world));
    k.mode = S.settings.defaultMode;
    const prevIndex2 = d.end === "end" ? s.knots.length - 1 : 0;
    const localNormal = normalize(v3(), dirToLocalSafe(target, place.normal));
    if (s.knots.length) {
      const prev = s.knots[prevIndex2].position;
      const dir = d.end === "end" ? sub(v3(), k.position, prev) : sub(v3(), prev, k.position);
      knotRotation(k.rotation, dir, localNormal);
    } else {
      knotRotation(k.rotation, v3(), localNormal);
    }
    const index = d.end === "end" ? s.knots.length : 0;
    containerInsertKnot(target, d.spline, index, k);
    a.spline = d.spline;
    a.knot = index;
    a.part = d.end === "end" ? "out" : "in";
    S.selection.set([{ comp: target, spline: d.spline, knot: index, part: "knot" }]);
    selectionChanged();
  });
  return false;
}
function dirToLocalSafe(comp2, world) {
  const o = toLocal(comp2, v3());
  const p = toLocal(comp2, world);
  return sub(v3(), p, o);
}
function drawDrag(cam2, x, y, a) {
  if (a.knot < 0) return;
  if (!a.dragging && Math.hypot(x - a.x0, y - a.y0) < DRAG_PX) return;
  a.dragging = true;
  const pos = knotWorldPosition(a.comp, a.spline, a.knot);
  let hit = rayPlane(screenRay(cam2, x, y), pos, a.normal);
  if (!hit) hit = rayPlane(screenRay(cam2, x, y), pos, cameraForward(cam2), true);
  if (!hit) return;
  const end = hit;
  a.session.apply(() => {
    const s = a.comp.splines[a.spline];
    if (!s || !s.knots[a.knot]) return;
    if (s.knots[a.knot].mode !== 2 /* Mirrored */) setTangentMode(s, a.knot, 2 /* Mirrored */);
    setTangentWorld(a.comp, a.spline, a.knot, a.part, end);
  });
}
function drawPreview(_cam) {
  if (!S.context || S.tool !== "draw") return;
  const h = S.hover;
  if ((h == null ? void 0 : h.kind) === "curve") {
    disc(h.world, 5, Colors.insert);
    circle(h.world, 7, Colors.insert);
    return;
  }
  if ((h == null ? void 0 : h.kind) === "knot" && S.drawing) {
    const d2 = S.drawing;
    const s2 = d2.comp.splines[d2.spline];
    const other = d2.end === "end" ? 0 : ((s2 == null ? void 0 : s2.knots.length) ?? 1) - 1;
    if (s2 && h.ref.comp === d2.comp && h.ref.spline === d2.spline && h.ref.knot === other && s2.knots.length >= 2) {
      circle(knotWorldPosition(d2.comp, d2.spline, other), 10, Colors.insert);
      return;
    }
  }
  if (!S.preview || active) return;
  const p = S.preview;
  disc(p, 4, Colors.preview);
  const d = S.drawing;
  if (!d) return;
  const s = d.comp.splines[d.spline];
  if (!s || !s.knots.length) return;
  const k = d.end === "end" ? s.knots.length - 1 : 0;
  const knot = s.knots[k];
  const from = knotWorldPosition(d.comp, d.spline, k);
  const handleVec = d.end === "end" ? tangentOutVec(v3(), knot) : tangentInVec(v3(), knot);
  const c2 = curve();
  copy(c2.p0, from);
  add(c2.p1, from, dirToWorld(d.comp, handleVec));
  if (lenSq(sub(v3(), c2.p1, c2.p0)) < 1e-12) {
    scaleAndAdd(c2.p1, from, sub(v3(), p, from), 1 / 3);
  }
  scaleAndAdd(c2.p2, p, sub(v3(), from, p), 1 / 3);
  copy(c2.p3, p);
  const n = 24;
  let prev = copy(v3(), from);
  const cur = v3();
  for (let i = 1; i <= n; i++) {
    evalPosition(cur, c2, i / n);
    line(prev, cur, Colors.preview);
    copy(prev, cur);
  }
}
setPreviewDrawer(drawPreview);
function plainKey(ev) {
  return !ev.ctrlKey && !ev.metaKey && !ev.altKey && !ev.shiftKey;
}
function onKeyDown(ev) {
  if (!canEdit() || !S.context) return true;
  const key2 = String(ev.key || "").toLowerCase();
  try {
    switch (key2) {
      case "escape":
        if (active) {
          cancelActive();
          return false;
        }
        if (S.tool === "draw") {
          if (S.drawing) S.drawing = null;
          else setTool("select");
        } else if (S.selection.size) {
          clearSelection();
        } else {
          setContext(false);
        }
        selectionChanged();
        return false;
      case "enter":
        if (S.tool === "draw" && S.drawing) {
          S.drawing = null;
          selectionChanged();
          return false;
        }
        return true;
      case "delete":
      case "backspace":
        if (!S.selection.size) return true;
        deleteKey();
        return false;
      case "c":
        if (!plainKey(ev) || !S.selection.size) return true;
        cycleModeSelected();
        return false;
      case "x":
        if (!plainKey(ev)) return true;
        S.settings.orientation = S.settings.orientation === "global" ? "local" : S.settings.orientation === "local" ? "element" : "global";
        selectionChanged();
        return false;
      case "a":
        if (!(ev.ctrlKey || ev.metaKey) || ev.altKey) return true;
        S.selectAllKeyAt = Date.now();
        selectAll();
        return false;
      case "s":
        if (S.tool === "draw" && ev.shiftKey && !ev.ctrlKey && S.lastTargets.length > 1) {
          S.drawTarget = (S.drawTarget + 1) % S.lastTargets.length;
          S.drawing = null;
          selectionChanged();
          return false;
        }
        return true;
    }
  } catch (e) {
    note(`keydown: ${(e == null ? void 0 : e.stack) || e}`);
  }
  return true;
}
function onKeyUp(_ev) {
  return true;
}
function deleteKey() {
  const now = Date.now();
  if (now - S.deleteKeyAt < 150) return;
  S.deleteKeyAt = now;
  deleteSelection();
}

// source/scene/guards.ts
var KEY_WINDOW_MS = 800;
var undo = [];
var installed = false;
function isTyping(e) {
  const t = e.target;
  const tag = t == null ? void 0 : t.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || !!(t == null ? void 0 : t.isContentEditable);
}
function onKeyDownCapture(e) {
  if (!S.primary || !S.context || isTyping(e)) return;
  const k = e.key;
  if ((k === "Delete" || k === "Backspace") && S.selection.size && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    e.stopImmediatePropagation();
    deleteKey();
  } else if ((k === "a" || k === "A") && (e.ctrlKey || e.metaKey) && S.lastTargets.length) {
    S.selectAllKeyAt = Date.now();
  }
}
function onBlur() {
  if (isDragging()) cancelActive();
}
function involvesEdited(options) {
  const ids = options == null ? void 0 : options.uuid;
  const list = Array.isArray(ids) ? ids : typeof ids === "string" ? [ids] : [];
  const edited = new Set(S.lastTargets.map((c2) => c2.node.uuid));
  return list.some((id) => edited.has(id)) || list.length === 0;
}
function wrap2(target, name, guard) {
  const orig = target == null ? void 0 : target[name];
  if (typeof orig !== "function" || orig.__splinesGuard) return;
  const wrapped = function(...args) {
    try {
      if (guard(this, args)) return void 0;
    } catch (e) {
      note(`guard ${name}: ${e}`);
    }
    return orig.apply(this, args);
  };
  wrapped.__splinesGuard = true;
  target[name] = wrapped;
  undo.push(() => {
    if (target[name] === wrapped) target[name] = orig;
  });
}
function installGuards() {
  if (installed) return;
  installed = true;
  window.addEventListener("keydown", onKeyDownCapture, true);
  window.addEventListener("blur", onBlur);
  undo.push(() => {
    window.removeEventListener("keydown", onKeyDownCapture, true);
    window.removeEventListener("blur", onBlur);
  });
  const facade = cce2().SceneFacadeManager;
  const target = typeof facade === "function" ? facade.prototype : facade;
  if (!target) return;
  wrap2(target, "removeNode", (_self, args) => {
    if (S.context && Date.now() - S.deleteKeyAt < KEY_WINDOW_MS && involvesEdited(args[0])) {
      note("Delete went to the selected knots, not the node");
      return true;
    }
    return false;
  });
  wrap2(target, "selectAllNodes", () => S.context && Date.now() - S.selectAllKeyAt < KEY_WINDOW_MS);
}
function guardsInfo() {
  var _a2, _b2;
  const facade = cce2().SceneFacadeManager;
  const target = typeof facade === "function" ? facade.prototype : facade;
  return {
    installed,
    facadeType: typeof facade,
    removeNodeGuarded: !!((_a2 = target == null ? void 0 : target.removeNode) == null ? void 0 : _a2.__splinesGuard),
    selectAllGuarded: !!((_b2 = target == null ? void 0 : target.selectAllNodes) == null ? void 0 : _b2.__splinesGuard)
  };
}

// source/scene/index.ts
var PKG = "splines";
var hooked = false;
var opHooked = false;
function onBeforeCommit() {
  try {
    drawFrame();
    maybeBroadcast();
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
    const { director: director2, Director: Director2 } = cc();
    director2.on(Director2.EVENT_BEFORE_COMMIT, onBeforeCommit);
    hooked = true;
  }
  if (!opHooked) {
    const op = cce2().Operation;
    if (op == null ? void 0 : op.addListener) {
      for (const [type, fn] of listeners) op.addListener(type, fn, PRIORITY);
      opHooked = true;
    }
  }
  installGuards();
  S.hooked = hooked && opHooked;
}
function markPrimary() {
  if (!S.primary) {
    S.primary = true;
    bumpState();
  }
  hook();
}
async function loadSettings() {
  try {
    const saved = await Editor.Profile.getConfig(PKG, "settings");
    if (saved && typeof saved === "object") S.settings = { ...DEFAULT_SETTINGS, ...saved };
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
  updateTargets();
  maybeBroadcast(true);
  repaint();
  return panelState();
}
var methods = {
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
  spSetContext(on) {
    markPrimary();
    updateTargets();
    if (on && !S.lastTargets.length) return panelState();
    setContext(!!on);
    return broadcastNow();
  },
  spSetTool(tool) {
    markPrimary();
    updateTargets();
    if (!S.lastTargets.length) return panelState();
    setTool(tool === "draw" ? "draw" : "select");
    if (tool === "draw") S.drawing = null;
    return broadcastNow();
  },
  spSetSetting(key2, value) {
    if (!(key2 in S.settings)) return panelState();
    S.settings[key2] = value;
    saveSettings();
    return broadcastNow();
  },
  async spSetElement(props) {
    markPrimary();
    await setElementProps(props || {});
    return broadcastNow();
  },
  async spAction(name, arg) {
    markPrimary();
    updateTargets();
    switch (name) {
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
      note(`create: ${(e == null ? void 0 : e.stack) || e}`);
      console.error("[Splines] Could not create the spline:", e);
      return null;
    }
  },
  /** Inspector: data of one SplineContainer. */
  spContainerInfo(compUuid) {
    markPrimary();
    updateTargets();
    return containerInfo(compUuid);
  },
  async spEditKnot(compUuid, spline, knot, props) {
    markPrimary();
    await editKnot(compUuid, spline, knot, props || {});
    return containerInfo(compUuid);
  },
  async spSplineAction(compUuid, spline, action, arg) {
    markPrimary();
    updateTargets();
    return splineAction(compUuid, spline, action, arg);
  },
  /** Inspector: turns SplineInstantiate's generated instances into regular nodes. */
  async spBakeInstances(compUuid) {
    var _a2, _b2;
    markPrimary();
    const comp2 = findComponent2(compUuid);
    if (!comp2 || typeof comp2._bakeInfo !== "function") return { count: 0 };
    const info = comp2._bakeInfo();
    if (!info.length) return { count: 0 };
    const parent = await Editor.Message.request("scene", "create-node", {
      parent: comp2.node.uuid,
      name: `${comp2.node.name} Instances`
    });
    let count = 0;
    for (const p of info) {
      const uuid = await Editor.Message.request("scene", "create-node", { parent, assetUuid: p.prefab });
      const node2 = typeof uuid === "string" ? findNode2(uuid) : null;
      if (!node2) continue;
      node2.setWorldPosition(p.position[0], p.position[1], p.position[2]);
      node2.setWorldRotation(p.rotation[0], p.rotation[1], p.rotation[2], p.rotation[3]);
      node2.setScale(p.scale[0], p.scale[1], p.scale[2]);
      count++;
    }
    await recordEdit([comp2], () => {
      comp2.enabled = false;
    });
    afterEdit([comp2]);
    const parentNode = findNode2(parent);
    if (parentNode) (_b2 = (_a2 = cce2().Engine) == null ? void 0 : _a2.repaintInEditMode) == null ? void 0 : _b2.call(_a2);
    return { count };
  },
  spDiagnostics() {
    var _a2, _b2, _c2, _d2, _e;
    const cam2 = sceneCamera();
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
      operation: !!((_a2 = cce2().Operation) == null ? void 0 : _a2.addListener),
      guards: guardsInfo(),
      gizmo: {
        tool: (_b2 = cce2().Gizmo) == null ? void 0 : _b2.transformToolName,
        pivot: (_c2 = cce2().Gizmo) == null ? void 0 : _c2.pivot,
        coordinate: (_d2 = cce2().Gizmo) == null ? void 0 : _d2.coordinate,
        is2D: (_e = cce2().Gizmo) == null ? void 0 : _e.is2D
      },
      diag: S.diag,
      url: typeof location !== "undefined" ? location.href : ""
    };
  }
};
function load() {
  loadSettings();
  const tryHook = (n) => {
    try {
      hook();
      if (S.hooked) return;
    } catch {
    }
    if (n > 0) setTimeout(() => tryHook(n - 1), 1e3);
  };
  tryHook(30);
}

// tests/scene.test.ts
var import_assert = __toESM(require("assert"));

// tests/harness.ts
var results = { passed: 0, failed: 0 };

// tests/scene.test.ts
setSceneMethods(methods);
var tests = [];
function test(name, fn) {
  tests.push({ name, fn });
}
var flush = () => new Promise((r) => setTimeout(r, 0));
var tick = () => cc_exports.director.tick();
function near(a, b, eps, msg = "") {
  import_assert.default.ok(Math.abs(a - b) <= eps, `${msg} ${a} != ${b} (\xB1${eps})`);
}
function mouse(type, x, y, mods = {}) {
  return cce.Operation.emit(type, { x, y, button: 0, leftButton: true, ...mods });
}
async function click(x, y, mods = {}) {
  mouse("mousedown", x, y, mods);
  await flush();
  mouse("mouseup", x, y, mods);
  await flush();
  tick();
}
async function drag(from, to, mods = {}) {
  mouse("mousedown", from.x, from.y, mods);
  await flush();
  const steps = 5;
  for (let i = 1; i <= steps; i++) {
    mouse("mousemove", from.x + (to.x - from.x) * i / steps, from.y + (to.y - from.y) * i / steps, mods);
    await flush();
  }
  mouse("mouseup", to.x, to.y, mods);
  await flush();
  await flush();
  tick();
}
function key(k, mods = {}) {
  return cce.Operation.emit("keydown", { key: k, ...mods });
}
var node = new cc_exports.Node("Path");
node.setParent(scene);
var comp = node.addComponent(SplineContainer);
function reset() {
  const s = comp.splines[0];
  s.knots.length = 0;
  comp.splines.length = 1;
  comp.links.length = 0;
  s.closed = false;
  s.add(new cc_exports.Vec3(0, 0, 0));
  s.add(new cc_exports.Vec3(5, 0, 0));
  s.add(new cc_exports.Vec3(10, 0, 5));
  S.selection.clear();
  S.context = false;
  S.tool = "select";
  S.drawing = null;
  selectNodes([node.uuid]);
  log.editorEvents.length = 0;
  log.removed.length = 0;
  tick();
}
load();
methods.spPrimary();
var knotScreen = (s, k) => {
  const p = comp.getKnotWorldPosition({ spline: s, knot: k });
  return screen(p.x, p.y, p.z);
};
test("hooks into the editor and draws the selected spline", () => {
  reset();
  import_assert.default.ok(S.hooked, "hooked");
  geometry2.reset();
  tick();
  import_assert.default.ok(geometry2.lines > 20, `lines drawn: ${geometry2.lines}`);
  import_assert.default.ok(geometry2.triangles > 0, "knots drawn");
  import_assert.default.deepStrictEqual(S.lastTargets, [comp]);
});
test("clicking a knot enters the edit context and selects it; the editor never sees the click", async () => {
  reset();
  const p = knotScreen(0, 1);
  await click(p.x, p.y);
  import_assert.default.strictEqual(S.context, true);
  import_assert.default.deepStrictEqual(S.selection.all().map((e) => [e.knot, e.part]), [[1, "knot"]]);
  import_assert.default.ok(!log.editorEvents.includes("mousedown"), "blocked");
});
test("outside the context, clicks on empty space go to the editor", async () => {
  reset();
  await click(screen(20, 0, 20).x, screen(20, 0, 20).y);
  import_assert.default.strictEqual(S.context, false);
  import_assert.default.ok(log.editorEvents.includes("mousedown") && log.editorEvents.includes("mouseup"));
});
test("dragging a knot moves it (one undo step)", async () => {
  reset();
  const before = log.requests.filter((r) => r.msg === "begin-recording").length;
  await drag(knotScreen(0, 1), screen(5, 0, 3));
  const k = comp.splines[0].knots[1];
  near(k.position.x, 5, 0.05);
  near(k.position.z, 3, 0.05);
  const begins = log.requests.filter((r) => r.msg === "begin-recording").length - before;
  const ends = log.requests.filter((r) => r.msg === "end-recording").length;
  import_assert.default.strictEqual(begins, 1);
  import_assert.default.ok(ends >= 1);
  import_assert.default.ok(log.changes.some((c2) => c2.endsWith(node.uuid)), "editor notified");
});
test("empty click clears the knot selection first, then reaches the editor", async () => {
  reset();
  await click(knotScreen(0, 0).x, knotScreen(0, 0).y);
  import_assert.default.strictEqual(S.selection.size, 1);
  log.editorEvents.length = 0;
  const empty = screen(-10, 0, -10);
  await click(empty.x, empty.y);
  import_assert.default.strictEqual(S.selection.size, 0);
  import_assert.default.ok(!log.editorEvents.includes("mousedown"), "first click only clears");
  await click(empty.x, empty.y);
  import_assert.default.ok(log.editorEvents.includes("mousedown") && log.editorEvents.includes("mouseup"), "second click replayed");
});
test("rectangle selection in the context", async () => {
  reset();
  S.context = true;
  await drag(screen(-1, 0, -1), screen(6, 0, 1));
  import_assert.default.deepStrictEqual(S.selection.knots().map((e) => e.knot).sort(), [0, 1]);
});
test("shift+click adds to the selection", async () => {
  reset();
  await click(knotScreen(0, 0).x, knotScreen(0, 0).y);
  await click(knotScreen(0, 2).x, knotScreen(0, 2).y, { shiftKey: true });
  import_assert.default.deepStrictEqual(S.selection.knots().map((e) => e.knot).sort(), [0, 2]);
});
test("move handle: dragging the X axis moves the selected knot along X only", async () => {
  reset();
  await click(knotScreen(0, 2).x, knotScreen(0, 2).y);
  const pivot = knotScreen(0, 2);
  const from = { x: pivot.x + 45, y: pivot.y };
  await drag(from, { x: from.x + 40, y: from.y + 30 });
  const k = comp.splines[0].knots[2];
  near(k.position.x, 12, 0.05);
  near(k.position.z, 5, 1e-6);
});
test("rotate tool turns a Bezier knot", async () => {
  reset();
  comp.splines[0].setTangentMode(1, 2 /* Mirrored */);
  await click(knotScreen(0, 1).x, knotScreen(0, 1).y);
  cce.Gizmo.transformToolName = "rotation";
  tick();
  const before = comp.splines[0].knots[1].rotation.clone();
  const pivot = knotScreen(0, 1);
  await drag({ x: pivot.x + 103, y: pivot.y }, { x: pivot.x, y: pivot.y + 103 });
  cce.Gizmo.transformToolName = "position";
  const after = comp.splines[0].knots[1].rotation;
  const d = Math.abs(before.x * after.x + before.y * after.y + before.z * after.z + before.w * after.w);
  import_assert.default.ok(d < 0.9, `rotated (dot ${d})`);
});
test("double-click on a curve inserts a knot without changing the shape", async () => {
  reset();
  S.context = true;
  const spline = comp.splines[0];
  const mid = spline.evaluatePosition(0.25);
  const p = screen(mid.x, mid.y, mid.z);
  const r = cce.Operation.emit("dblclick", { x: p.x, y: p.y, button: 0 });
  import_assert.default.strictEqual(r, false, "consumed");
  await flush();
  await flush();
  import_assert.default.strictEqual(spline.knots.length, 4);
  near(spline.knots[1].position.x, mid.x, 0.1);
});
test("Delete removes the selected knots, and the node delete that follows is blocked", async () => {
  reset();
  await click(knotScreen(0, 1).x, knotScreen(0, 1).y);
  const ev = domKey("Delete");
  import_assert.default.ok(ev.defaultPrevented && ev.stopped);
  key("Delete");
  await flush();
  await flush();
  import_assert.default.strictEqual(comp.splines[0].knots.length, 2);
  cce.SceneFacadeManager.removeNode({ uuid: node.uuid });
  import_assert.default.strictEqual(log.removed.length, 0, "node not removed");
  S.deleteKeyAt = 0;
  cce.SceneFacadeManager.removeNode({ uuid: node.uuid });
  import_assert.default.strictEqual(log.removed.length, 1, "later deletes go through");
});
test("C cycles the tangent mode, Escape clears then leaves", async () => {
  reset();
  await click(knotScreen(0, 1).x, knotScreen(0, 1).y);
  const before = comp.splines[0].knots[1].mode;
  key("c");
  await flush();
  await flush();
  import_assert.default.notStrictEqual(comp.splines[0].knots[1].mode, before);
  key("Escape");
  import_assert.default.strictEqual(S.selection.size, 0);
  import_assert.default.strictEqual(S.context, true);
  key("Escape");
  import_assert.default.strictEqual(S.context, false);
});
test("Ctrl+A selects all knots and keeps the editor from selecting all nodes", async () => {
  reset();
  S.context = true;
  domKey("a", { ctrlKey: true });
  key("a", { ctrlKey: true });
  cce.SceneFacadeManager.selectAllNodes();
  import_assert.default.strictEqual(S.selection.knots().length, 3);
  import_assert.default.strictEqual(log.selectAllNodes, 0);
});
test("Draw tool: clicks add knots on the ground, a drag pulls mirrored tangents, clicking the first knot closes", async () => {
  reset();
  comp.splines[0].knots.length = 0;
  comp.splines[0].markDirty();
  methods.spSetTool("draw");
  import_assert.default.strictEqual(S.tool, "draw");
  await click(screen(0, 0, 0).x, screen(0, 0, 0).y);
  await drag(screen(4, 0, 0), screen(6, 0, 1));
  await click(screen(4, 0, 4).x, screen(4, 0, 4).y);
  const s = comp.splines[0];
  import_assert.default.strictEqual(s.knots.length, 3);
  near(s.knots[2].position.x, 4, 0.05);
  near(s.knots[2].position.z, 4, 0.05);
  near(s.knots[2].position.y, 0, 1e-6);
  import_assert.default.strictEqual(s.knots[1].mode, 2 /* Mirrored */);
  const out = s.knots[1].tangentOut;
  near(Math.hypot(out.x, out.y, out.z), Math.hypot(2, 1), 0.1);
  await click(screen(0, 0, 0).x, screen(0, 0, 0).y);
  await flush();
  import_assert.default.strictEqual(s.closed, true);
  import_assert.default.strictEqual(S.drawing, null);
  methods.spSetTool("select");
});
test("Draw tool: clicking a curve inserts, Enter finishes", async () => {
  reset();
  methods.spSetTool("draw");
  const mid = comp.splines[0].evaluatePosition(0.2);
  await click(screen(mid.x, mid.y, mid.z).x, screen(mid.x, mid.y, mid.z).y);
  await flush();
  import_assert.default.strictEqual(comp.splines[0].knots.length, 4);
  await click(screen(-5, 0, 8).x, screen(-5, 0, 8).y);
  import_assert.default.strictEqual(comp.splines.length, 2);
  key("Enter");
  import_assert.default.strictEqual(S.drawing, null);
  key("Escape");
  import_assert.default.strictEqual(S.tool, "select");
});
test("panel state describes the selection", async () => {
  reset();
  await click(knotScreen(0, 2).x, knotScreen(0, 2).y);
  const st = methods.spState();
  import_assert.default.strictEqual(st.context, true);
  import_assert.default.strictEqual(st.element.label, "Knot 2");
  import_assert.default.deepStrictEqual(st.element.position, [10, 0, 5]);
  import_assert.default.strictEqual(st.targets[0].name, "Path");
  import_assert.default.ok(log.broadcasts.some((b) => b.msg === "splines:state"));
  JSON.stringify(st);
});
test("panel: set element fields, modes and actions with undo", async () => {
  reset();
  await click(knotScreen(0, 1).x, knotScreen(0, 1).y);
  await methods.spSetElement({ position: [null, 2, null] });
  near(comp.splines[0].knots[1].position.y, 2, 1e-9);
  await methods.spSetElement({ mode: 4 /* Broken */ });
  import_assert.default.strictEqual(comp.splines[0].knots[1].mode, 4 /* Broken */);
  await methods.spSetElement({ tangentOut: 3 });
  const t = comp.splines[0].knots[1].tangentOut;
  near(Math.hypot(t.x, t.y, t.z), 3, 1e-6);
  await methods.spAction("split");
  import_assert.default.strictEqual(comp.splines.length, 2);
  await methods.spAction("selectAll");
  import_assert.default.strictEqual(S.selection.knots().length, 4);
  await methods.spAction("close", true);
  import_assert.default.ok(comp.splines.every((s) => s.closed));
});
test("Inspector: container info, knot edits and spline actions", async () => {
  reset();
  const info = methods.spContainerInfo(comp.uuid);
  import_assert.default.strictEqual(info.splines.length, 1);
  import_assert.default.strictEqual(info.splines[0].knots.length, 3);
  import_assert.default.ok(info.splines[0].length > 10);
  let res = await methods.spEditKnot(comp.uuid, 0, 0, { position: [1, null, null] });
  near(comp.splines[0].knots[0].position.x, 1, 1e-9);
  res = await methods.spSplineAction(comp.uuid, 0, "addKnot");
  import_assert.default.strictEqual(res.splines[0].knots.length, 4);
  res = await methods.spSplineAction(comp.uuid, 0, "closed", true);
  import_assert.default.strictEqual(res.splines[0].closed, true);
  res = await methods.spSplineAction(comp.uuid, 0, "addSpline");
  import_assert.default.strictEqual(res.splines.length, 2);
  res = await methods.spSplineAction(comp.uuid, 1, "removeSpline");
  import_assert.default.strictEqual(res.splines.length, 1);
  res = await methods.spSplineAction(comp.uuid, 0, "selectKnot", { knot: 2 });
  import_assert.default.strictEqual(S.context, true);
  import_assert.default.ok(res.splines[0].knots[2].selected);
});
test("Node > Spline > Circle creates a selected spline node and enters the context", async () => {
  reset();
  selectNodes([]);
  tick();
  const uuid = await methods.spCreate("circle");
  const n = findNode(uuid);
  import_assert.default.ok(n, "node created");
  const c2 = n.getComponent(SplineContainer);
  import_assert.default.strictEqual(c2.splines[0].knots.length, 4);
  import_assert.default.strictEqual(c2.splines[0].closed, true);
  import_assert.default.deepStrictEqual(cce.Selection.query(), [uuid]);
  tick();
  import_assert.default.strictEqual(S.context, true, "context entered once selected");
  n.destroy();
  SplineContainer.all.delete(c2);
});
test("diagnostics are JSON", () => {
  const d = methods.spDiagnostics();
  JSON.stringify(d);
  import_assert.default.strictEqual(d.primary, true);
  import_assert.default.strictEqual(d.eventCoords, "event");
});
(async () => {
  for (const t of tests) {
    try {
      await t.fn();
      results.passed++;
      console.log(`  ok   ${t.name}`);
    } catch (e) {
      results.failed++;
      console.log(`  FAIL ${t.name}
       ${String((e == null ? void 0 : e.stack) || e).split("\n").slice(0, 6).join("\n       ")}`);
    }
  }
  console.log(`
${results.passed} passed, ${results.failed} failed`);
  process.exitCode = results.failed ? 1 : 0;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3R1YnMvY2MudHMiLCAiLi4vc3R1YnMvZWRpdG9yLnRzIiwgIi4uLy4uL2Fzc2V0cy9ydW50aW1lL0Jlemllcktub3QudHMiLCAiLi4vLi4vYXNzZXRzL2NvcmUvbWF0aC50cyIsICIuLi8uLi9hc3NldHMvY29yZS9jdXJ2ZS50cyIsICIuLi8uLi9hc3NldHMvY29yZS9zcGxpbmUtY29yZS50cyIsICIuLi8uLi9hc3NldHMvcnVudGltZS9TcGxpbmUudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvS25vdExpbmsudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lQ29udGFpbmVyLnRzIiwgIi4uL3N0dWJzL2NjLWVudi50cyIsICIuLi8uLi9hc3NldHMvcnVudGltZS9TcGxpbmVBbmltYXRlLnRzIiwgIi4uLy4uL2Fzc2V0cy9ydW50aW1lL1NwbGluZUV4dHJ1ZGUudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lSW5zdGFudGlhdGUudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lVXRpbGl0eS50cyIsICIuLi8uLi9zb3VyY2Uvc2NlbmUvZW52LnRzIiwgIi4uLy4uL3NvdXJjZS9zY2VuZS9tb2RlbC50cyIsICIuLi8uLi9zb3VyY2Uvc2NlbmUvc3RhdGUudHMiLCAiLi4vLi4vc291cmNlL3NjZW5lL3ZpZXcudHMiLCAiLi4vLi4vc291cmNlL3NjZW5lL2RyYXcudHMiLCAiLi4vLi4vc291cmNlL3NjZW5lL2hhbmRsZXMudHMiLCAiLi4vLi4vc291cmNlL3NjZW5lL2NvbnRleHQudHMiLCAiLi4vLi4vc291cmNlL3NjZW5lL3JlbmRlci50cyIsICIuLi8uLi9zb3VyY2Uvc2NlbmUvdW5kby50cyIsICIuLi8uLi9zb3VyY2Uvc2NlbmUvb3BzLnRzIiwgIi4uLy4uL3NvdXJjZS9zY2VuZS9pbnB1dC50cyIsICIuLi8uLi9zb3VyY2Uvc2NlbmUvZ3VhcmRzLnRzIiwgIi4uLy4uL3NvdXJjZS9zY2VuZS9pbmRleC50cyIsICIuLi9zY2VuZS50ZXN0LnRzIiwgIi4uL2hhcm5lc3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQSBzbWFsbCBzdGFuZC1pbiBmb3IgdGhlICdjYycgZW5naW5lIG1vZHVsZSwgZW5vdWdoIHRvIHJ1biB0aGUgcnVudGltZVxuICogY2xhc3NlcyBhbmQgdGhlIHNjZW5lIHNjcmlwdCBpbiBub2RlLiBNYXRoIGZvbGxvd3MgdGhlIGVuZ2luZSdzIGZvcm11bGFzLlxuICovXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWF0aFxuXG5leHBvcnQgY2xhc3MgVmVjMyB7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpFUk8gPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIDApKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgVU5JVF9YID0gT2JqZWN0LmZyZWV6ZShuZXcgVmVjMygxLCAwLCAwKSk7XG4gICAgc3RhdGljIHJlYWRvbmx5IFVOSVRfWSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMSwgMCkpO1xuICAgIHN0YXRpYyByZWFkb25seSBVTklUX1ogPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIDEpKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRk9SV0FSRCA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMCwgLTEpKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4ID0gMCwgcHVibGljIHkgPSAwLCBwdWJsaWMgeiA9IDApIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgdiA9IHggYXMgYW55O1xuICAgICAgICAgICAgdGhpcy54ID0gdi54O1xuICAgICAgICAgICAgdGhpcy55ID0gdi55O1xuICAgICAgICAgICAgdGhpcy56ID0gdi56O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0KHg6IGFueSA9IDAsIHkgPSAwLCB6ID0gMCk6IHRoaXMge1xuICAgICAgICBpZiAodHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4Lnk7XG4gICAgICAgICAgICB0aGlzLnogPSB4Lno7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgIHRoaXMueiA9IHo7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMyh0aGlzLngsIHRoaXMueSwgdGhpcy56KTtcbiAgICB9XG5cbiAgICBhZGQodjogYW55KSB7XG4gICAgICAgIHRoaXMueCArPSB2Lng7XG4gICAgICAgIHRoaXMueSArPSB2Lnk7XG4gICAgICAgIHRoaXMueiArPSB2Lno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxlbmd0aFNxcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMuejtcbiAgICB9XG5cbiAgICBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXIoKSk7XG4gICAgfVxuXG4gICAgbm9ybWFsaXplKCkge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5sZW5ndGgoKTtcbiAgICAgICAgaWYgKGwgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnggLz0gbDtcbiAgICAgICAgICAgIHRoaXMueSAvPSBsO1xuICAgICAgICAgICAgdGhpcy56IC89IGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbmVnYXRpdmUoKSB7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgICAgIHRoaXMueSA9IC10aGlzLnk7XG4gICAgICAgIHRoaXMueiA9IC10aGlzLno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGVxdWFscyh2OiBhbnksIGVwcyA9IDFlLTYpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMueCAtIHYueCkgPD0gZXBzICYmIE1hdGguYWJzKHRoaXMueSAtIHYueSkgPD0gZXBzICYmIE1hdGguYWJzKHRoaXMueiAtIHYueikgPD0gZXBzO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0KG91dDogYW55LCBhOiBhbnksIG06IGFueSkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XG4gICAgICAgIGxldCB3ID0gbS5tMDMgKiB4ICsgbS5tMDcgKiB5ICsgbS5tMTEgKiB6ICsgbS5tMTU7XG4gICAgICAgIHcgPSB3ID8gMSAvIHcgOiAxO1xuICAgICAgICBvdXQueCA9IChtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHogKyBtLm0xMikgKiB3O1xuICAgICAgICBvdXQueSA9IChtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0wOSAqIHogKyBtLm0xMykgKiB3O1xuICAgICAgICBvdXQueiA9IChtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHogKyBtLm0xNCkgKiB3O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0Tm9ybWFsKG91dDogYW55LCBhOiBhbnksIG06IGFueSkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XG4gICAgICAgIG91dC54ID0gbS5tMDAgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMDggKiB6O1xuICAgICAgICBvdXQueSA9IG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogejtcbiAgICAgICAgb3V0LnogPSBtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHo7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyYW5zZm9ybVF1YXQob3V0OiBhbnksIGE6IGFueSwgcTogYW55KSB7XG4gICAgICAgIGNvbnN0IGl4ID0gcS53ICogYS54ICsgcS55ICogYS56IC0gcS56ICogYS55O1xuICAgICAgICBjb25zdCBpeSA9IHEudyAqIGEueSArIHEueiAqIGEueCAtIHEueCAqIGEuejtcbiAgICAgICAgY29uc3QgaXogPSBxLncgKiBhLnogKyBxLnggKiBhLnkgLSBxLnkgKiBhLng7XG4gICAgICAgIGNvbnN0IGl3ID0gLXEueCAqIGEueCAtIHEueSAqIGEueSAtIHEueiAqIGEuejtcbiAgICAgICAgb3V0LnggPSBpeCAqIHEudyArIGl3ICogLXEueCArIGl5ICogLXEueiAtIGl6ICogLXEueTtcbiAgICAgICAgb3V0LnkgPSBpeSAqIHEudyArIGl3ICogLXEueSArIGl6ICogLXEueCAtIGl4ICogLXEuejtcbiAgICAgICAgb3V0LnogPSBpeiAqIHEudyArIGl3ICogLXEueiArIGl4ICogLXEueSAtIGl5ICogLXEueDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm9ybWFsaXplKG91dDogYW55LCBhOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbCA9IE1hdGguaHlwb3QoYS54LCBhLnksIGEueik7XG4gICAgICAgIG91dC54ID0gbCA/IGEueCAvIGwgOiAwO1xuICAgICAgICBvdXQueSA9IGwgPyBhLnkgLyBsIDogMDtcbiAgICAgICAgb3V0LnogPSBsID8gYS56IC8gbCA6IDA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRvdChhOiBhbnksIGI6IGFueSkge1xuICAgICAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55ICsgYS56ICogYi56O1xuICAgIH1cblxuICAgIHN0YXRpYyBjcm9zcyhvdXQ6IGFueSwgYTogYW55LCBiOiBhbnkpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueSAqIGIueiAtIGEueiAqIGIueTtcbiAgICAgICAgY29uc3QgeSA9IGEueiAqIGIueCAtIGEueCAqIGIuejtcbiAgICAgICAgY29uc3QgeiA9IGEueCAqIGIueSAtIGEueSAqIGIueDtcbiAgICAgICAgb3V0LnggPSB4O1xuICAgICAgICBvdXQueSA9IHk7XG4gICAgICAgIG91dC56ID0gejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzdGFuY2UoYTogYW55LCBiOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguaHlwb3QoYS54IC0gYi54LCBhLnkgLSBiLnksIGEueiAtIGIueik7XG4gICAgfVxuXG4gICAgc3RhdGljIHN1YnRyYWN0KG91dDogYW55LCBhOiBhbnksIGI6IGFueSkge1xuICAgICAgICBvdXQueCA9IGEueCAtIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgLSBiLnk7XG4gICAgICAgIG91dC56ID0gYS56IC0gYi56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyBsZW5ndGhTcXIoYTogYW55KSB7XG4gICAgICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLno7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmVjMiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHggPSAwLCBwdWJsaWMgeSA9IDApIHt9XG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUXVhdCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IElERU5USVRZID0gT2JqZWN0LmZyZWV6ZShuZXcgUXVhdCgpKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4ID0gMCwgcHVibGljIHkgPSAwLCBwdWJsaWMgeiA9IDAsIHB1YmxpYyB3ID0gMSkge31cblxuICAgIHNldCh4OiBhbnksIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIHc/OiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy54ID0geC54O1xuICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICAgICAgdGhpcy56ID0geC56O1xuICAgICAgICAgICAgdGhpcy53ID0geC53O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHkhO1xuICAgICAgICAgICAgdGhpcy56ID0geiE7XG4gICAgICAgICAgICB0aGlzLncgPSB3ITtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBRdWF0KHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMudyk7XG4gICAgfVxuXG4gICAgc3RhdGljIG11bHRpcGx5KG91dDogYW55LCBhOiBhbnksIGI6IGFueSkge1xuICAgICAgICBjb25zdCB4ID0gYS54ICogYi53ICsgYS53ICogYi54ICsgYS55ICogYi56IC0gYS56ICogYi55O1xuICAgICAgICBjb25zdCB5ID0gYS55ICogYi53ICsgYS53ICogYi55ICsgYS56ICogYi54IC0gYS54ICogYi56O1xuICAgICAgICBjb25zdCB6ID0gYS56ICogYi53ICsgYS53ICogYi56ICsgYS54ICogYi55IC0gYS55ICogYi54O1xuICAgICAgICBjb25zdCB3ID0gYS53ICogYi53IC0gYS54ICogYi54IC0gYS55ICogYi55IC0gYS56ICogYi56O1xuICAgICAgICBvdXQueCA9IHg7XG4gICAgICAgIG91dC55ID0geTtcbiAgICAgICAgb3V0LnogPSB6O1xuICAgICAgICBvdXQudyA9IHc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGludmVydChvdXQ6IGFueSwgYTogYW55KSB7XG4gICAgICAgIGNvbnN0IGQgPSBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLnc7XG4gICAgICAgIGNvbnN0IGludiA9IGQgPyAxIC8gZCA6IDA7XG4gICAgICAgIG91dC54ID0gLWEueCAqIGludjtcbiAgICAgICAgb3V0LnkgPSAtYS55ICogaW52O1xuICAgICAgICBvdXQueiA9IC1hLnogKiBpbnY7XG4gICAgICAgIG91dC53ID0gYS53ICogaW52O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tRXVsZXIob3V0OiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaCA9ICgwLjUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICAgICAgeCAqPSBoO1xuICAgICAgICB5ICo9IGg7XG4gICAgICAgIHogKj0gaDtcbiAgICAgICAgY29uc3Qgc3ggPSBNYXRoLnNpbih4KSwgY3ggPSBNYXRoLmNvcyh4KSwgc3kgPSBNYXRoLnNpbih5KSwgY3kgPSBNYXRoLmNvcyh5KSwgc3ogPSBNYXRoLnNpbih6KSwgY3ogPSBNYXRoLmNvcyh6KTtcbiAgICAgICAgb3V0LnggPSBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dC55ID0gY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXQueiA9IGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0LncgPSBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3o7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqIExpa2UgTWF0My5mcm9tVmlld1VwOiArWiA9IHZpZXcuICovXG4gICAgc3RhdGljIGZyb21WaWV3VXAob3V0OiBhbnksIHZpZXc6IGFueSwgdXA6IGFueSA9IFZlYzMuVU5JVF9ZKSB7XG4gICAgICAgIGNvbnN0IHggPSBWZWMzLm5vcm1hbGl6ZShuZXcgVmVjMygpLCBWZWMzLmNyb3NzKG5ldyBWZWMzKCksIHVwLCB2aWV3KSk7XG4gICAgICAgIGlmICh4Lmxlbmd0aFNxcigpIDwgMWUtMTIpIHtcbiAgICAgICAgICAgIG91dC54ID0gMDsgb3V0LnkgPSAwOyBvdXQueiA9IDA7IG91dC53ID0gMTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeSA9IFZlYzMuY3Jvc3MobmV3IFZlYzMoKSwgdmlldywgeCk7XG4gICAgICAgIGNvbnN0IG0wMCA9IHgueCwgbTAxID0geS54LCBtMDIgPSB2aWV3Lng7XG4gICAgICAgIGNvbnN0IG0xMCA9IHgueSwgbTExID0geS55LCBtMTIgPSB2aWV3Lnk7XG4gICAgICAgIGNvbnN0IG0yMCA9IHgueiwgbTIxID0geS56LCBtMjIgPSB2aWV3Lno7XG4gICAgICAgIGNvbnN0IHRyYWNlID0gbTAwICsgbTExICsgbTIyO1xuICAgICAgICBpZiAodHJhY2UgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gMC41IC8gTWF0aC5zcXJ0KHRyYWNlICsgMSk7XG4gICAgICAgICAgICBvdXQudyA9IDAuMjUgLyBzOyBvdXQueCA9IChtMjEgLSBtMTIpICogczsgb3V0LnkgPSAobTAyIC0gbTIwKSAqIHM7IG91dC56ID0gKG0xMCAtIG0wMSkgKiBzO1xuICAgICAgICB9IGVsc2UgaWYgKG0wMCA+IG0xMSAmJiBtMDAgPiBtMjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMDAgLSBtMTEgLSBtMjIpO1xuICAgICAgICAgICAgb3V0LncgPSAobTIxIC0gbTEyKSAvIHM7IG91dC54ID0gMC4yNSAqIHM7IG91dC55ID0gKG0wMSArIG0xMCkgLyBzOyBvdXQueiA9IChtMDIgKyBtMjApIC8gcztcbiAgICAgICAgfSBlbHNlIGlmIChtMTEgPiBtMjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMTEgLSBtMDAgLSBtMjIpO1xuICAgICAgICAgICAgb3V0LncgPSAobTAyIC0gbTIwKSAvIHM7IG91dC54ID0gKG0wMSArIG0xMCkgLyBzOyBvdXQueSA9IDAuMjUgKiBzOyBvdXQueiA9IChtMTIgKyBtMjEpIC8gcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMjIgLSBtMDAgLSBtMTEpO1xuICAgICAgICAgICAgb3V0LncgPSAobTEwIC0gbTAxKSAvIHM7IG91dC54ID0gKG0wMiArIG0yMCkgLyBzOyBvdXQueSA9IChtMTIgKyBtMjEpIC8gczsgb3V0LnogPSAwLjI1ICogcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hdDQge1xuICAgIG0wMCA9IDE7IG0wMSA9IDA7IG0wMiA9IDA7IG0wMyA9IDA7XG4gICAgbTA0ID0gMDsgbTA1ID0gMTsgbTA2ID0gMDsgbTA3ID0gMDtcbiAgICBtMDggPSAwOyBtMDkgPSAwOyBtMTAgPSAxOyBtMTEgPSAwO1xuICAgIG0xMiA9IDA7IG0xMyA9IDA7IG0xNCA9IDA7IG0xNSA9IDE7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgSURFTlRJVFkgPSBPYmplY3QuZnJlZXplKG5ldyBNYXQ0KCkpO1xuXG4gICAgc3RhdGljIHRvQXJyYXkob3V0OiBudW1iZXJbXSwgbTogYW55KSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBbJ20wMCcsICdtMDEnLCAnbTAyJywgJ20wMycsICdtMDQnLCAnbTA1JywgJ20wNicsICdtMDcnLCAnbTA4JywgJ20wOScsICdtMTAnLCAnbTExJywgJ20xMicsICdtMTMnLCAnbTE0JywgJ20xNSddO1xuICAgICAgICBrZXlzLmZvckVhY2goKGssIGkpID0+IChvdXRbaV0gPSBtW2tdKSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21BcnJheShvdXQ6IGFueSwgYTogbnVtYmVyW10pIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IFsnbTAwJywgJ20wMScsICdtMDInLCAnbTAzJywgJ20wNCcsICdtMDUnLCAnbTA2JywgJ20wNycsICdtMDgnLCAnbTA5JywgJ20xMCcsICdtMTEnLCAnbTEyJywgJ20xMycsICdtMTQnLCAnbTE1J107XG4gICAgICAgIGtleXMuZm9yRWFjaCgoaywgaSkgPT4gKG91dFtrXSA9IGFbaV0pKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbXVsdGlwbHkob3V0OiBhbnksIGE6IGFueSwgYjogYW55KSB7XG4gICAgICAgIGNvbnN0IEEgPSBNYXQ0LnRvQXJyYXkoW10sIGEpO1xuICAgICAgICBjb25zdCBCID0gTWF0NC50b0FycmF5KFtdLCBiKTtcbiAgICAgICAgY29uc3QgUjogbnVtYmVyW10gPSBuZXcgQXJyYXkoMTYpLmZpbGwoMCk7XG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgNDsgYysrKSBmb3IgKGxldCByID0gMDsgciA8IDQ7IHIrKykge1xuICAgICAgICAgICAgbGV0IHMgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA0OyBrKyspIHMgKz0gQVtrICogNCArIHJdICogQltjICogNCArIGtdO1xuICAgICAgICAgICAgUltjICogNCArIHJdID0gcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBSKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW52ZXJ0KG91dDogYW55LCBtOiBhbnkpIHtcbiAgICAgICAgY29uc3QgYSA9IE1hdDQudG9BcnJheShbXSwgbSk7XG4gICAgICAgIGNvbnN0IFthMDAsIGEwMSwgYTAyLCBhMDMsIGExMCwgYTExLCBhMTIsIGExMywgYTIwLCBhMjEsIGEyMiwgYTIzLCBhMzAsIGEzMSwgYTMyLCBhMzNdID0gYTtcbiAgICAgICAgY29uc3QgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICAgICAgY29uc3QgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICAgICAgY29uc3QgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbiAgICAgICAgaWYgKCFkZXQpIHJldHVybiBNYXQ0LmZyb21BcnJheShvdXQsIE1hdDQudG9BcnJheShbXSwgTWF0NC5JREVOVElUWSkpO1xuICAgICAgICBkZXQgPSAxIC8gZGV0O1xuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBbXG4gICAgICAgICAgICAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldCwgKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQsXG4gICAgICAgICAgICAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldCwgKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQsXG4gICAgICAgICAgICAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldCwgKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQsXG4gICAgICAgICAgICAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldCwgKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQsXG4gICAgICAgICAgICAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldCwgKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQsXG4gICAgICAgICAgICAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldCwgKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQsXG4gICAgICAgICAgICAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldCwgKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQsXG4gICAgICAgICAgICAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldCwgKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQsXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKiBUcmFuc2xhdGlvbiAqIHJvdGF0aW9uICogc2NhbGUuICovXG4gICAgc3RhdGljIGZyb21SVFMob3V0OiBhbnksIHE6IGFueSwgdDogYW55LCBzOiBhbnkpIHtcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6LCB3IH0gPSBxO1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4LCB5MiA9IHkgKyB5LCB6MiA9IHogKyB6O1xuICAgICAgICBjb25zdCB4eCA9IHggKiB4MiwgeHkgPSB4ICogeTIsIHh6ID0geCAqIHoyLCB5eSA9IHkgKiB5MiwgeXogPSB5ICogejIsIHp6ID0geiAqIHoyLCB3eCA9IHcgKiB4Miwgd3kgPSB3ICogeTIsIHd6ID0gdyAqIHoyO1xuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBbXG4gICAgICAgICAgICAoMSAtICh5eSArIHp6KSkgKiBzLngsICh4eSArIHd6KSAqIHMueCwgKHh6IC0gd3kpICogcy54LCAwLFxuICAgICAgICAgICAgKHh5IC0gd3opICogcy55LCAoMSAtICh4eCArIHp6KSkgKiBzLnksICh5eiArIHd4KSAqIHMueSwgMCxcbiAgICAgICAgICAgICh4eiArIHd5KSAqIHMueiwgKHl6IC0gd3gpICogcy56LCAoMSAtICh4eCArIHl5KSkgKiBzLnosIDAsXG4gICAgICAgICAgICB0LngsIHQueSwgdC56LCAxLFxuICAgICAgICBdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb2xvciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHIgPSAyNTUsIHB1YmxpYyBnID0gMjU1LCBwdWJsaWMgYiA9IDI1NSwgcHVibGljIGEgPSAyNTUpIHt9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG9iamVjdHNcblxuZXhwb3J0IGNvbnN0IENDT2JqZWN0ID0ge1xuICAgIEZsYWdzOiB7XG4gICAgICAgIERvbnRTYXZlOiAxIDw8IDMsXG4gICAgICAgIEVkaXRvck9ubHk6IDEgPDwgNCxcbiAgICAgICAgTG9ja2VkSW5FZGl0b3I6IDEgPDwgOSxcbiAgICAgICAgSGlkZUluSGllcmFyY2h5OiAxIDw8IDEwLFxuICAgIH0sXG59O1xuXG5sZXQgdXVpZFNlcSA9IDA7XG5leHBvcnQgZnVuY3Rpb24gbWFrZVV1aWQocHJlZml4ID0gJ2lkJykge1xuICAgIHJldHVybiBgJHtwcmVmaXh9LSR7Kyt1dWlkU2VxfWA7XG59XG5cbnR5cGUgQ3RvcjxUPiA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IFQ7XG5cbmV4cG9ydCBjbGFzcyBOb2RlIHtcbiAgICB1dWlkID0gbWFrZVV1aWQoJ25vZGUnKTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcGFyZW50OiBOb2RlIHwgbnVsbCA9IG51bGw7XG4gICAgY2hpbGRyZW46IE5vZGVbXSA9IFtdO1xuICAgIGNvbXBvbmVudHM6IENvbXBvbmVudFtdID0gW107XG4gICAgbGF5ZXIgPSAxO1xuICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgaXNWYWxpZCA9IHRydWU7XG4gICAgX29iakZsYWdzID0gMDtcbiAgICBwb3NpdGlvbiA9IG5ldyBWZWMzKCk7XG4gICAgcm90YXRpb24gPSBuZXcgUXVhdCgpO1xuICAgIHNjYWxlID0gbmV3IFZlYzMoMSwgMSwgMSk7XG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb25bXT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSAnTm9kZScpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlSW5IaWVyYXJjaHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZSAmJiAoIXRoaXMucGFyZW50IHx8IHRoaXMucGFyZW50LmFjdGl2ZUluSGllcmFyY2h5KTtcbiAgICB9XG5cbiAgICBnZXQgc2NlbmUoKTogYW55IHtcbiAgICAgICAgbGV0IG46IE5vZGUgPSB0aGlzO1xuICAgICAgICB3aGlsZSAobi5wYXJlbnQpIG4gPSBuLnBhcmVudDtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuXG4gICAgc2V0UGFyZW50KHA6IE5vZGUgfCBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyksIDEpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHA7XG4gICAgICAgIGlmIChwKSBwLmNoaWxkcmVuLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkTWF0cml4KCk6IE1hdDQge1xuICAgICAgICBjb25zdCBsb2NhbCA9IE1hdDQuZnJvbVJUUyhuZXcgTWF0NCgpLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnBvc2l0aW9uLCB0aGlzLnNjYWxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmICEodGhpcy5wYXJlbnQgYXMgYW55KS5pc1NjZW5lID8gTWF0NC5tdWx0aXBseShuZXcgTWF0NCgpLCB0aGlzLnBhcmVudC53b3JsZE1hdHJpeCwgbG9jYWwpIDogbG9jYWw7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkUG9zaXRpb24oKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLndvcmxkTWF0cml4O1xuICAgICAgICByZXR1cm4gbmV3IFZlYzMobS5tMTIsIG0ubTEzLCBtLm0xNCk7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkUm90YXRpb24oKTogUXVhdCB7XG4gICAgICAgIGNvbnN0IGxvY2FsID0gdGhpcy5yb3RhdGlvbi5jbG9uZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUgPyBRdWF0Lm11bHRpcGx5KG5ldyBRdWF0KCksIHRoaXMucGFyZW50LndvcmxkUm90YXRpb24sIGxvY2FsKSA6IGxvY2FsO1xuICAgIH1cblxuICAgIGdldCBmb3J3YXJkKCkge1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1RdWF0KG5ldyBWZWMzKCksIG5ldyBWZWMzKDAsIDAsIC0xKSwgdGhpcy53b3JsZFJvdGF0aW9uKTtcbiAgICB9XG4gICAgZ2V0IHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1RdWF0KG5ldyBWZWMzKCksIG5ldyBWZWMzKDEsIDAsIDApLCB0aGlzLndvcmxkUm90YXRpb24pO1xuICAgIH1cbiAgICBnZXQgdXAoKSB7XG4gICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybVF1YXQobmV3IFZlYzMoKSwgbmV3IFZlYzMoMCwgMSwgMCksIHRoaXMud29ybGRSb3RhdGlvbik7XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24oeDogYW55LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24uc2V0KHgsIHksIHopO1xuICAgIH1cblxuICAgIHNldFdvcmxkUG9zaXRpb24oeDogYW55LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHAgPSB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyBuZXcgVmVjMyh4LngsIHgueSwgeC56KSA6IG5ldyBWZWMzKHgsIHksIHopO1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUpIFZlYzMudHJhbnNmb3JtTWF0NChwLCBwLCBNYXQ0LmludmVydChuZXcgTWF0NCgpLCB0aGlzLnBhcmVudC53b3JsZE1hdHJpeCkpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldChwKTtcbiAgICB9XG5cbiAgICBzZXRXb3JsZFJvdGF0aW9uKHg6IGFueSwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xuICAgICAgICBjb25zdCBxID0gdHlwZW9mIHggPT09ICdvYmplY3QnID8gbmV3IFF1YXQoeC54LCB4LnksIHgueiwgeC53KSA6IG5ldyBRdWF0KHgsIHksIHosIHcpO1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUpIFF1YXQubXVsdGlwbHkocSwgUXVhdC5pbnZlcnQobmV3IFF1YXQoKSwgdGhpcy5wYXJlbnQud29ybGRSb3RhdGlvbiksIHEpO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnNldChxKTtcbiAgICB9XG5cbiAgICBzZXRTY2FsZSh4OiBhbnksIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY2FsZS5zZXQoeCwgeSwgeik7XG4gICAgfVxuXG4gICAgLy8gTG9vc2VseSB0eXBlZDogdGhlIHJ1bnRpbWUgY2xhc3NlcyBhcmUgdHlwZWQgYWdhaW5zdCB0aGUgcmVhbCBlbmdpbmUuXG4gICAgZ2V0Q29tcG9uZW50KEM6IGFueSk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHMuZmluZCgoYykgPT4gKHR5cGVvZiBDID09PSAnc3RyaW5nJyA/IChjLmNvbnN0cnVjdG9yIGFzIGFueSkuX19jaWQgPT09IEMgOiBjIGluc3RhbmNlb2YgQykpID8/IG51bGw7XG4gICAgfVxuXG4gICAgYWRkQ29tcG9uZW50KEM6IGFueSk6IGFueSB7XG4gICAgICAgIGNvbnN0IGMgPSBuZXcgQygpO1xuICAgICAgICBjLm5vZGUgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChjKTtcbiAgICAgICAgYy5fX3N0YXJ0KCk7XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cblxuICAgIG9uKHR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLmxpc3RlbmVycy5nZXQodHlwZSkgfHwgW107XG4gICAgICAgIGwucHVzaChmbik7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnNldCh0eXBlLCBsKTtcbiAgICB9XG5cbiAgICBvZmYodHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMubGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KHR5cGUsIGwuZmlsdGVyKChmKSA9PiBmICE9PSBmbikpO1xuICAgIH1cblxuICAgIGhhc0V2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5saXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdKS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGVtaXQodHlwZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5saXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdKSBmKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5jb21wb25lbnRzKSBjLl9fZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnNldFBhcmVudChudWxsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQge1xuICAgIG5vZGUhOiBOb2RlO1xuICAgIHV1aWQgPSBtYWtlVXVpZCgnY29tcCcpO1xuICAgIHByaXZhdGUgX2VuYWJsZWQgPSB0cnVlO1xuICAgIGlzVmFsaWQgPSB0cnVlO1xuXG4gICAgZ2V0IGVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICAgIH1cbiAgICBzZXQgZW5hYmxlZCh2OiBib29sZWFuKSB7XG4gICAgICAgIGlmICh2ID09PSB0aGlzLl9lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB2O1xuICAgICAgICBpZiAodikgKHRoaXMgYXMgYW55KS5vbkVuYWJsZT8uKCk7XG4gICAgICAgIGVsc2UgKHRoaXMgYXMgYW55KS5vbkRpc2FibGU/LigpO1xuICAgIH1cblxuICAgIGdldCBlbmFibGVkSW5IaWVyYXJjaHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkICYmIHRoaXMubm9kZS5hY3RpdmVJbkhpZXJhcmNoeTtcbiAgICB9XG5cbiAgICBnZXRDb21wb25lbnQ8VD4oQzogQ3RvcjxUPik6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDb21wb25lbnQoQyk7XG4gICAgfVxuXG4gICAgX19zdGFydCgpIHtcbiAgICAgICAgKHRoaXMgYXMgYW55KS5vbkxvYWQ/LigpO1xuICAgICAgICBpZiAodGhpcy5fZW5hYmxlZCkgKHRoaXMgYXMgYW55KS5vbkVuYWJsZT8uKCk7XG4gICAgfVxuXG4gICAgX19kZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5fZW5hYmxlZCkgKHRoaXMgYXMgYW55KS5vbkRpc2FibGU/LigpO1xuICAgICAgICAodGhpcyBhcyBhbnkpLm9uRGVzdHJveT8uKCk7XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX19kZXN0cm95KCk7XG4gICAgICAgIHRoaXMubm9kZS5jb21wb25lbnRzLnNwbGljZSh0aGlzLm5vZGUuY29tcG9uZW50cy5pbmRleE9mKHRoaXMpLCAxKTtcbiAgICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkZWNvcmF0b3JzXG5cbmNvbnN0IGNsYXNzZXMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG5mdW5jdGlvbiBjY2NsYXNzKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiAoY3RvcjogYW55KSA9PiB7XG4gICAgICAgIGN0b3IuX19jaWQgPSBuYW1lO1xuICAgICAgICBjbGFzc2VzLnNldChuYW1lLCBjdG9yKTtcbiAgICAgICAgcmV0dXJuIGN0b3I7XG4gICAgfTtcbn1cblxuY29uc3Qgbm9vcERlY29yYXRvciA9ICguLi5fYTogYW55W10pID0+ICguLi5fYjogYW55W10pID0+IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gcHJvcGVydHkoLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgIC8vIEBwcm9wZXJ0eSBvciBAcHJvcGVydHkoey4uLn0pXG4gICAgaWYgKGFyZ3MubGVuZ3RoID49IDIgJiYgdHlwZW9mIGFyZ3NbMV0gPT09ICdzdHJpbmcnKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiAoKSA9PiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBfZGVjb3JhdG9yID0ge1xuICAgIGNjY2xhc3MsXG4gICAgcHJvcGVydHksXG4gICAgZXhlY3V0ZUluRWRpdE1vZGU6IChjdG9yOiBhbnkpID0+IGN0b3IsXG4gICAgZGlzYWxsb3dNdWx0aXBsZTogKGN0b3I6IGFueSkgPT4gY3RvcixcbiAgICBtZW51OiBub29wRGVjb3JhdG9yLFxuICAgIHJlcXVpcmVDb21wb25lbnQ6IG5vb3BEZWNvcmF0b3IsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2NlbnVtKF9lOiBhbnkpIHtcbiAgICByZXR1cm4gX2U7XG59XG5cbmV4cG9ydCBjb25zdCBDQ0ludGVnZXIgPSAnSW50ZWdlcic7XG5cbmV4cG9ydCBjb25zdCBqcyA9IHtcbiAgICBnZXRDbGFzc0J5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuZ2V0KG5hbWUpID8/IG51bGw7XG4gICAgfSxcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBlbmdpbmVcblxuZXhwb3J0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgc3RhdGljIGVtaXRFdmVudHMoX2hhbmRsZXJzOiBhbnlbXSwgLi4uX2FyZ3M6IGFueVtdKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWwge1xuICAgIGluaXRpYWxpemUoX2luZm86IGFueSkge31cbn1cblxuZXhwb3J0IGNsYXNzIE1lc2gge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnZW9tZXRyeTogYW55KSB7fVxuICAgIGRlc3Ryb3koKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWVzaFJlbmRlcmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBtZXNoOiBhbnkgPSBudWxsO1xuICAgIG1hdGVyaWFsczogYW55W10gPSBbXTtcbiAgICBzaGFkb3dDYXN0aW5nTW9kZSA9IDA7XG4gICAgcmVjZWl2ZVNoYWRvdyA9IDA7XG4gICAgc2V0U2hhcmVkTWF0ZXJpYWwobTogYW55LCBpOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNbaV0gPSBtO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByZWZhYiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGRhdGE6IE5vZGUpIHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50aWF0ZShwOiBQcmVmYWIpOiBOb2RlIHtcbiAgICBjb25zdCBuID0gbmV3IE5vZGUocC5kYXRhLm5hbWUpO1xuICAgIG4uc2NhbGUuc2V0KHAuZGF0YS5zY2FsZSk7XG4gICAgcmV0dXJuIG47XG59XG5cbmV4cG9ydCBjb25zdCB1dGlscyA9IHtcbiAgICBNZXNoVXRpbHM6IHtcbiAgICAgICAgY3JlYXRlTWVzaChnZW9tZXRyeTogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1lc2goZ2VvbWV0cnkpO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG5jb25zdCBkaXJlY3Rvckxpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPigpO1xubGV0IHRvdGFsRnJhbWVzID0gMDtcblxuZXhwb3J0IGNvbnN0IGRpcmVjdG9yOiBhbnkgPSB7XG4gICAgcm9vdDogbnVsbCxcbiAgICBfc2NlbmU6IG51bGwgYXMgYW55LFxuICAgIGdldFNjZW5lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NlbmU7XG4gICAgfSxcbiAgICBnZXRUb3RhbEZyYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRvdGFsRnJhbWVzO1xuICAgIH0sXG4gICAgZ2V0VG90YWxUaW1lKCkge1xuICAgICAgICByZXR1cm4gdG90YWxGcmFtZXMgKiAxNjtcbiAgICB9LFxuICAgIG9uKHR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGwgPSBkaXJlY3Rvckxpc3RlbmVycy5nZXQodHlwZSkgfHwgW107XG4gICAgICAgIGwucHVzaChmbik7XG4gICAgICAgIGRpcmVjdG9yTGlzdGVuZXJzLnNldCh0eXBlLCBsKTtcbiAgICB9LFxuICAgIG9mZih0eXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAgICAgICBkaXJlY3Rvckxpc3RlbmVycy5zZXQodHlwZSwgKGRpcmVjdG9yTGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXSkuZmlsdGVyKChmKSA9PiBmICE9PSBmbikpO1xuICAgIH0sXG4gICAgLyoqIFRlc3QgaGVscGVyOiBvbmUgZWRpdG9yIGZyYW1lLiAqL1xuICAgIHRpY2soKSB7XG4gICAgICAgIGZvciAoY29uc3QgZiBvZiBkaXJlY3Rvckxpc3RlbmVycy5nZXQoJ2RpcmVjdG9yX2JlZm9yZV9jb21taXQnKSB8fCBbXSkgZigpO1xuICAgICAgICB0b3RhbEZyYW1lcysrO1xuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0b3IgPSB7IEVWRU5UX0JFRk9SRV9DT01NSVQ6ICdkaXJlY3Rvcl9iZWZvcmVfY29tbWl0JyB9O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyZXIgPSB7XG4gICAgc2NlbmU6IHtcbiAgICAgICAgQ2FtZXJhVXNhZ2U6IHsgU0NFTkVfVklFVzogNSB9LFxuICAgICAgICBDYW1lcmFQcm9qZWN0aW9uOiB7IE9SVEhPOiAwLCBQRVJTUEVDVElWRTogMSB9LFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZ2VvbWV0cnkgPSB7XG4gICAgUmF5OiBjbGFzcyB7XG4gICAgICAgIG86IFZlYzM7XG4gICAgICAgIGQ6IFZlYzM7XG4gICAgICAgIGNvbnN0cnVjdG9yKG94ID0gMCwgb3kgPSAwLCBveiA9IDAsIGR4ID0gMCwgZHkgPSAwLCBkeiA9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm8gPSBuZXcgVmVjMyhveCwgb3ksIG96KTtcbiAgICAgICAgICAgIHRoaXMuZCA9IG5ldyBWZWMzKGR4LCBkeSwgZHopO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBFUmF5Y2FzdE1vZGU6IHsgQUxMOiAwLCBDTE9TRVNUOiAxLCBBTlk6IDIgfSxcbiAgICBpbnRlcnNlY3Q6IHtcbiAgICAgICAgcmF5QUFCQjogKCkgPT4gdHJ1ZSxcbiAgICAgICAgcmF5TW9kZWw6ICgpID0+IDAsXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBnYW1lOiBhbnkgPSB7IGNhbnZhczogbnVsbCB9O1xuIiwgIi8qKlxuICogQSBmYWtlIGVkaXRvciBmb3IgcnVubmluZyB0aGUgc2NlbmUgc2NyaXB0IGluIG5vZGU6IEVkaXRvciwgY2NlLFxuICogRWRpdG9yRXh0ZW5kcywgYSB0b3AtZG93biBvcnRob2dyYXBoaWMgU2NlbmUgdmlldyBjYW1lcmEgYW5kIGEgc2NlbmUuXG4gKiBJbXBvcnQgdGhpcyBiZWZvcmUgYW55dGhpbmcgZnJvbSBzb3VyY2Uvc2NlbmUuXG4gKi9cbmltcG9ydCAqIGFzIGNjIGZyb20gJy4vY2MnO1xuXG5leHBvcnQgY29uc3QgVyA9IDgwMDtcbmV4cG9ydCBjb25zdCBIID0gNjAwO1xuLyoqIFBpeGVscyBwZXIgd29ybGQgdW5pdCBvZiB0aGUgZmFrZSBTY2VuZSB2aWV3IGNhbWVyYS4gKi9cbmV4cG9ydCBjb25zdCBQWCA9IDIwO1xuXG5leHBvcnQgY29uc3QgbG9nID0ge1xuICAgIHJlcXVlc3RzOiBbXSBhcyB7IG1zZzogc3RyaW5nOyBhcmdzOiBhbnlbXSB9W10sXG4gICAgYnJvYWRjYXN0czogW10gYXMgeyBtc2c6IHN0cmluZzsgZGF0YTogYW55IH1bXSxcbiAgICBjaGFuZ2VzOiBbXSBhcyBzdHJpbmdbXSxcbiAgICByZXBhaW50czogMCxcbiAgICByZW1vdmVkOiBbXSBhcyBhbnlbXSxcbiAgICBzZWxlY3RBbGxOb2RlczogMCxcbiAgICAvKiogRXZlbnRzIHRoYXQgcmVhY2hlZCB0aGUgZWRpdG9yJ3Mgb3duIGhhbmRsZXJzIChiZWxvdyBvdXIgcHJpb3JpdHkpLiAqL1xuICAgIGVkaXRvckV2ZW50czogW10gYXMgc3RyaW5nW10sXG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNjZW5lIGdyYXBoXG5cbmV4cG9ydCBjb25zdCBzY2VuZSA9IG5ldyBjYy5Ob2RlKCdTY2VuZScpO1xuKHNjZW5lIGFzIGFueSkuaXNTY2VuZSA9IHRydWU7XG5jYy5kaXJlY3Rvci5fc2NlbmUgPSBzY2VuZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHdhbGsobjogY2MuTm9kZSwgZm46IChuOiBjYy5Ob2RlKSA9PiB2b2lkKSB7XG4gICAgZm4obik7XG4gICAgZm9yIChjb25zdCBjIG9mIG4uY2hpbGRyZW4pIHdhbGsoYywgZm4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZE5vZGUodXVpZDogc3RyaW5nKTogY2MuTm9kZSB8IG51bGwge1xuICAgIGxldCBmb3VuZDogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xuICAgIHdhbGsoc2NlbmUsIChuKSA9PiB7XG4gICAgICAgIGlmIChuLnV1aWQgPT09IHV1aWQpIGZvdW5kID0gbjtcbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ29tcG9uZW50KHV1aWQ6IHN0cmluZyk6IGFueSB7XG4gICAgbGV0IGZvdW5kOiBhbnkgPSBudWxsO1xuICAgIHdhbGsoc2NlbmUsIChuKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBuLmNvbXBvbmVudHMpIGlmIChjLnV1aWQgPT09IHV1aWQpIGZvdW5kID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjYW1lcmFcblxuZXhwb3J0IGNvbnN0IGdlb21ldHJ5ID0ge1xuICAgIGxpbmVzOiAwLFxuICAgIHRyaWFuZ2xlczogMCxcbiAgICBxdWFkczogMCxcbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5saW5lcyA9IDA7XG4gICAgICAgIHRoaXMudHJpYW5nbGVzID0gMDtcbiAgICAgICAgdGhpcy5xdWFkcyA9IDA7XG4gICAgfSxcbiAgICBhZGRMaW5lKCkge1xuICAgICAgICB0aGlzLmxpbmVzKys7XG4gICAgfSxcbiAgICBhZGRUcmlhbmdsZSgpIHtcbiAgICAgICAgdGhpcy50cmlhbmdsZXMrKztcbiAgICB9LFxuICAgIGFkZFF1YWQoKSB7XG4gICAgICAgIHRoaXMucXVhZHMrKztcbiAgICB9LFxufTtcblxuY29uc3QgY2FtTm9kZSA9IG5ldyBjYy5Ob2RlKCdFZGl0b3IgQ2FtZXJhJyk7XG4vLyBMb29raW5nIHN0cmFpZ2h0IGRvd246IGZvcndhcmQgLVksIHNjcmVlbiB1cCA9IHdvcmxkIC1aLCByaWdodCA9ICtYLlxuY2FtTm9kZS5yb3RhdGlvbi5zZXQoLU1hdGguU1FSVDFfMiwgMCwgMCwgTWF0aC5TUVJUMV8yKTtcbmNhbU5vZGUucG9zaXRpb24uc2V0KDAsIDEwMCwgMCk7XG5cbmV4cG9ydCBjb25zdCBjYW1lcmE6IGFueSA9IHtcbiAgICBuYW1lOiAnRWRpdG9yIENhbWVyYScsXG4gICAgY2FtZXJhVXNhZ2U6IGNjLnJlbmRlcmVyLnNjZW5lLkNhbWVyYVVzYWdlLlNDRU5FX1ZJRVcsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICB3aW5kb3c6IG51bGwsXG4gICAgd2lkdGg6IFcsXG4gICAgaGVpZ2h0OiBILFxuICAgIHByb2plY3Rpb25UeXBlOiBjYy5yZW5kZXJlci5zY2VuZS5DYW1lcmFQcm9qZWN0aW9uLk9SVEhPLFxuICAgIG5lYXJDbGlwOiAwLjEsXG4gICAgbm9kZTogY2FtTm9kZSxcbiAgICBnZXQgZm9yd2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5WZWMzKDAsIC0xLCAwKTtcbiAgICB9LFxuICAgIGdlb21ldHJ5UmVuZGVyZXI6IGdlb21ldHJ5LFxuICAgIGluaXRHZW9tZXRyeVJlbmRlcmVyKCkge30sXG4gICAgd29ybGRUb1NjcmVlbihvdXQ6IGFueSwgcDogYW55KSB7XG4gICAgICAgIG91dC54ID0gcC54ICogUFggKyBXIC8gMjtcbiAgICAgICAgb3V0LnkgPSAtcC56ICogUFggKyBIIC8gMjtcbiAgICAgICAgb3V0LnogPSAwLjU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcbiAgICBzY3JlZW5Qb2ludFRvUmF5KHJheTogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICByYXkuby5zZXQoKHggLSBXIC8gMikgLyBQWCwgMTAwLCAtKHkgLSBIIC8gMikgLyBQWCk7XG4gICAgICAgIHJheS5kLnNldCgwLCAtMSwgMCk7XG4gICAgICAgIHJldHVybiByYXk7XG4gICAgfSxcbn07XG5cbmNvbnN0IG1haW5XaW5kb3cgPSB7fTtcbmNhbWVyYS53aW5kb3cgPSBtYWluV2luZG93O1xuY2MuZGlyZWN0b3Iucm9vdCA9IHsgbWFpbldpbmRvdywgY2FtZXJhTGlzdDogW2NhbWVyYV0gfTtcblxuLyoqIFNjcmVlbiBwb3NpdGlvbiBvZiBhIHdvcmxkIHBvaW50IChib3R0b20tbGVmdCBvcmlnaW4sIGxpa2UgdGhlIGVuZ2luZSkuICovXG5leHBvcnQgZnVuY3Rpb24gc2NyZWVuKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICByZXR1cm4geyB4OiB4ICogUFggKyBXIC8gMiwgeTogLXogKiBQWCArIEggLyAyIH07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY2NlXG5cbnR5cGUgTGlzdGVuZXIgPSB7IGZuOiAoZXY6IGFueSkgPT4gYW55OyBwcmlvcml0eTogbnVtYmVyIH07XG5jb25zdCBvcExpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBMaXN0ZW5lcltdPigpO1xuXG5leHBvcnQgbGV0IHNlbGVjdGVkTm9kZXM6IHN0cmluZ1tdID0gW107XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0Tm9kZXMoaWRzOiBzdHJpbmdbXSkge1xuICAgIHNlbGVjdGVkTm9kZXMgPSBpZHM7XG59XG5cbmV4cG9ydCBjb25zdCBjY2U6IGFueSA9IHtcbiAgICBPcGVyYXRpb246IHtcbiAgICAgICAgYWRkTGlzdGVuZXIodHlwZTogc3RyaW5nLCBmbjogYW55LCBwcmlvcml0eSA9IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGwgPSBvcExpc3RlbmVycy5nZXQodHlwZSkgfHwgW107XG4gICAgICAgICAgICBsLnB1c2goeyBmbiwgcHJpb3JpdHkgfSk7XG4gICAgICAgICAgICBsLnNvcnQoKGEsIGIpID0+IGIucHJpb3JpdHkgLSBhLnByaW9yaXR5KTtcbiAgICAgICAgICAgIG9wTGlzdGVuZXJzLnNldCh0eXBlLCBsKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodHlwZTogc3RyaW5nLCBmbjogYW55KSB7XG4gICAgICAgICAgICBvcExpc3RlbmVycy5zZXQodHlwZSwgKG9wTGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXSkuZmlsdGVyKChsKSA9PiBsLmZuICE9PSBmbikpO1xuICAgICAgICB9LFxuICAgICAgICBlbWl0KHR5cGU6IHN0cmluZywgZXY6IGFueSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBsIG9mIG9wTGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXSkge1xuICAgICAgICAgICAgICAgIGlmIChsLmZuKGV2KSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgU2VsZWN0aW9uOiB7XG4gICAgICAgIHF1ZXJ5OiAoKSA9PiBbLi4uc2VsZWN0ZWROb2Rlc10sXG4gICAgfSxcbiAgICBDYW1lcmE6IHsgaXMyRDogZmFsc2UgfSxcbiAgICBHaXptbzoge1xuICAgICAgICB0cmFuc2Zvcm1Ub29sTmFtZTogJ3Bvc2l0aW9uJyxcbiAgICAgICAgcGl2b3Q6ICdjZW50ZXInLFxuICAgICAgICBjb29yZGluYXRlOiAnZ2xvYmFsJyxcbiAgICAgICAgaXMyRDogZmFsc2UsXG4gICAgICAgIHF1ZXJ5VHJhbnNmb3JtU25hcENvbmZpZ3M6ICgpID0+ICh7XG4gICAgICAgICAgICBwb3NpdGlvbjogeyB4OiAxLCB5OiAxLCB6OiAxIH0sIHJvdGF0aW9uOiAxNSwgc2NhbGU6IDAuMSxcbiAgICAgICAgICAgIGlzUG9zaXRpb25TbmFwRW5hYmxlZDogZmFsc2UsIGlzUm90YXRpb25TbmFwRW5hYmxlZDogZmFsc2UsIGlzU2NhbGVTbmFwRW5hYmxlZDogZmFsc2UsXG4gICAgICAgIH0pLFxuICAgIH0sXG4gICAgRW5naW5lOiB7XG4gICAgICAgIHJlcGFpbnRJbkVkaXRNb2RlKCkge1xuICAgICAgICAgICAgbG9nLnJlcGFpbnRzKys7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBTY2VuZUZhY2FkZU1hbmFnZXI6IHtcbiAgICAgICAgcmVtb3ZlTm9kZShvcHRzOiBhbnkpIHtcbiAgICAgICAgICAgIGxvZy5yZW1vdmVkLnB1c2gob3B0cyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdEFsbE5vZGVzKCkge1xuICAgICAgICAgICAgbG9nLnNlbGVjdEFsbE5vZGVzKys7XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbi8vIFRoZSBlZGl0b3IncyBvd24gaGFuZGxlcnMsIGJlbG93IHRoZSBleHRlbnNpb24ncyBwcmlvcml0eS5cbmZvciAoY29uc3QgdHlwZSBvZiBbJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2V1cCcsICdkYmxjbGljaycsICdrZXlkb3duJ10pIHtcbiAgICBjY2UuT3BlcmF0aW9uLmFkZExpc3RlbmVyKHR5cGUsICgpID0+IHtcbiAgICAgICAgbG9nLmVkaXRvckV2ZW50cy5wdXNoKHR5cGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCA5OCk7XG59XG5cbihnbG9iYWxUaGlzIGFzIGFueSkuY2NlID0gY2NlO1xuKGdsb2JhbFRoaXMgYXMgYW55KS5FZGl0b3JFeHRlbmRzID0ge1xuICAgIE5vZGU6IHtcbiAgICAgICAgZ2V0Tm9kZTogKHV1aWQ6IHN0cmluZykgPT4gZmluZE5vZGUodXVpZCksXG4gICAgICAgIGVtaXQ6ICh0eXBlOiBzdHJpbmcsIHV1aWQ6IHN0cmluZykgPT4gbG9nLmNoYW5nZXMucHVzaChgJHt0eXBlfToke3V1aWR9YCksXG4gICAgfSxcbiAgICBDb21wb25lbnQ6IHtcbiAgICAgICAgZ2V0Q29tcG9uZW50OiAodXVpZDogc3RyaW5nKSA9PiBmaW5kQ29tcG9uZW50KHV1aWQpLFxuICAgIH0sXG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVkaXRvclxuXG5sZXQgdW5kb1NlcSA9IDA7XG5leHBvcnQgbGV0IHNjZW5lTWV0aG9kczogUmVjb3JkPHN0cmluZywgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk+ID0ge307XG5leHBvcnQgZnVuY3Rpb24gc2V0U2NlbmVNZXRob2RzKG06IFJlY29yZDxzdHJpbmcsICguLi5hcmdzOiBhbnlbXSkgPT4gYW55Pikge1xuICAgIHNjZW5lTWV0aG9kcyA9IG07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcXVlc3QocGtnOiBzdHJpbmcsIG1zZzogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8YW55PiB7XG4gICAgbG9nLnJlcXVlc3RzLnB1c2goeyBtc2csIGFyZ3MgfSk7XG4gICAgaWYgKHBrZyAhPT0gJ3NjZW5lJykgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBzd2l0Y2ggKG1zZykge1xuICAgICAgICBjYXNlICdiZWdpbi1yZWNvcmRpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIGB1bmRvLSR7Kyt1bmRvU2VxfWA7XG4gICAgICAgIGNhc2UgJ2VuZC1yZWNvcmRpbmcnOlxuICAgICAgICBjYXNlICdjYW5jZWwtcmVjb3JkaW5nJzpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjYXNlICdjcmVhdGUtbm9kZSc6IHtcbiAgICAgICAgICAgIGNvbnN0IG8gPSBhcmdzWzBdIHx8IHt9O1xuICAgICAgICAgICAgY29uc3QgbiA9IG5ldyBjYy5Ob2RlKG8ubmFtZSB8fCAnTm9kZScpO1xuICAgICAgICAgICAgbi5zZXRQYXJlbnQoKG8ucGFyZW50ICYmIGZpbmROb2RlKG8ucGFyZW50KSkgfHwgc2NlbmUpO1xuICAgICAgICAgICAgcmV0dXJuIG4udXVpZDtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdjcmVhdGUtY29tcG9uZW50Jzoge1xuICAgICAgICAgICAgY29uc3QgbyA9IGFyZ3NbMF07XG4gICAgICAgICAgICBjb25zdCBuID0gZmluZE5vZGUoby51dWlkKTtcbiAgICAgICAgICAgIGNvbnN0IEMgPSBjYy5qcy5nZXRDbGFzc0J5TmFtZShvLmNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAobiAmJiBDKSBuLmFkZENvbXBvbmVudChDKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jzoge1xuICAgICAgICAgICAgY29uc3QgbyA9IGFyZ3NbMF07XG4gICAgICAgICAgICByZXR1cm4gc2NlbmVNZXRob2RzW28ubWV0aG9kXT8uKC4uLihvLmFyZ3MgfHwgW10pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4oZ2xvYmFsVGhpcyBhcyBhbnkpLkVkaXRvciA9IHtcbiAgICBBcHA6IHsgcGF0aDogX19kaXJuYW1lLCB2ZXJzaW9uOiAndGVzdCcgfSxcbiAgICBNZXNzYWdlOiB7XG4gICAgICAgIHJlcXVlc3QsXG4gICAgICAgIGJyb2FkY2FzdChtc2c6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgICAgICAgICBsb2cuYnJvYWRjYXN0cy5wdXNoKHsgbXNnLCBkYXRhIH0pO1xuICAgICAgICB9LFxuICAgICAgICBfX3Byb3RlY3RlZF9fOiB7XG4gICAgICAgICAgICBhZGRCcm9hZGNhc3RMaXN0ZW5lcigpIHt9LFxuICAgICAgICAgICAgcmVtb3ZlQnJvYWRjYXN0TGlzdGVuZXIoKSB7fSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIFByb2ZpbGU6IHtcbiAgICAgICAgZ2V0Q29uZmlnOiBhc3luYyAoKSA9PiB1bmRlZmluZWQsXG4gICAgICAgIHNldENvbmZpZzogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgIH0sXG4gICAgU2VsZWN0aW9uOiB7XG4gICAgICAgIGNsZWFyKCkge1xuICAgICAgICAgICAgc2VsZWN0ZWROb2RlcyA9IFtdO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3QoX3R5cGU6IHN0cmluZywgdXVpZDogc3RyaW5nKSB7XG4gICAgICAgICAgICBzZWxlY3RlZE5vZGVzID0gWy4uLnNlbGVjdGVkTm9kZXMsIHV1aWRdO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTZWxlY3RlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4uc2VsZWN0ZWROb2Rlc107XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmNvbnN0IHdpbmRvd0xpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPigpO1xuKGdsb2JhbFRoaXMgYXMgYW55KS53aW5kb3cgPSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAgICAgICBjb25zdCBsID0gd2luZG93TGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXTtcbiAgICAgICAgbC5wdXNoKGZuKTtcbiAgICAgICAgd2luZG93TGlzdGVuZXJzLnNldCh0eXBlLCBsKTtcbiAgICB9LFxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pIHtcbiAgICAgICAgd2luZG93TGlzdGVuZXJzLnNldCh0eXBlLCAod2luZG93TGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXSkuZmlsdGVyKChmKSA9PiBmICE9PSBmbikpO1xuICAgIH0sXG59O1xuXG4vKiogRGlzcGF0Y2hlcyBhIERPTS1saWtlIGtleSBldmVudCB0byB3aW5kb3cgbGlzdGVuZXJzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvbUtleShrZXk6IHN0cmluZywgbW9kczogeyBjdHJsS2V5PzogYm9vbGVhbiB9ID0ge30pIHtcbiAgICBjb25zdCBldiA9IHtcbiAgICAgICAga2V5LCBjdHJsS2V5OiAhIW1vZHMuY3RybEtleSwgbWV0YUtleTogZmFsc2UsIHRhcmdldDogbnVsbCxcbiAgICAgICAgZGVmYXVsdFByZXZlbnRlZDogZmFsc2UsIHN0b3BwZWQ6IGZhbHNlLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdCgpIHsgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfSxcbiAgICAgICAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgeyB0aGlzLnN0b3BwZWQgPSB0cnVlOyB9LFxuICAgIH07XG4gICAgZm9yIChjb25zdCBmIG9mIHdpbmRvd0xpc3RlbmVycy5nZXQoJ2tleWRvd24nKSB8fCBbXSkgZihldik7XG4gICAgcmV0dXJuIGV2O1xufVxuXG5leHBvcnQgeyBjYyB9O1xuIiwgImltcG9ydCB7IF9kZWNvcmF0b3IsIGNjZW51bSwgUXVhdCwgVmVjMyB9IGZyb20gJ2NjJztcbmltcG9ydCB7IERFRkFVTFRfVEVOU0lPTiwgS25vdExpa2UsIFRhbmdlbnRNb2RlIH0gZnJvbSAnLi4vY29yZS9zcGxpbmUtY29yZSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbmNjZW51bShUYW5nZW50TW9kZSk7XG5cbi8qKlxuICogQSBjb250cm9sIHBvaW50IG9mIGEgc3BsaW5lOiBhIHBvc2l0aW9uLCBhIHJvdGF0aW9uIGFuZCB0d28gdGFuZ2VudHMuXG4gKlxuICogVGFuZ2VudHMgYXJlIGluIHRoZSBrbm90J3Mgb3duIHNwYWNlOiArWiBpcyB0aGUgZGlyZWN0aW9uIHRoZSBzcGxpbmVcbiAqIHRyYXZlbHMgdGhyb3VnaCB0aGUga25vdCBhbmQgK1kgaXMgdGhlIGtub3QncyB1cCB2ZWN0b3IuIEhvdyB0aGUgdGFuZ2VudHNcbiAqIGFyZSBrZXB0IGRlcGVuZHMgb24gYG1vZGVgIChzZWUgVGFuZ2VudE1vZGUpLlxuICovXG5AY2NjbGFzcygnc3BsaW5lcy5CZXppZXJLbm90JylcbmV4cG9ydCBjbGFzcyBCZXppZXJLbm90IGltcGxlbWVudHMgS25vdExpa2Uge1xuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdQb3NpdGlvbiBpbiB0aGUgc3BsaW5lIGNvbnRhaW5lclx1MjAxOXMgbG9jYWwgc3BhY2UuJyB9KVxuICAgIHBvc2l0aW9uID0gbmV3IFZlYzMoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdJbiB0YW5nZW50LCBpbiB0aGUga25vdFx1MjAxOXMgc3BhY2UgKHBvaW50cyBiYWNrd2FyZHMgYWxvbmcgLVopLicgfSlcbiAgICB0YW5nZW50SW4gPSBuZXcgVmVjMygpO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ091dCB0YW5nZW50LCBpbiB0aGUga25vdFx1MjAxOXMgc3BhY2UgKHBvaW50cyBmb3J3YXJkcyBhbG9uZyArWikuJyB9KVxuICAgIHRhbmdlbnRPdXQgPSBuZXcgVmVjMygpO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ0tub3Qgcm90YXRpb246ICtaIGlzIHRoZSBkaXJlY3Rpb24gb2YgdHJhdmVsLCArWSB0aGUgdXAgdmVjdG9yLicgfSlcbiAgICByb3RhdGlvbiA9IG5ldyBRdWF0KCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBUYW5nZW50TW9kZSwgdG9vbHRpcDogJ0hvdyB0aGUgdGFuZ2VudHMgYXJlIGtlcHQuJyB9KVxuICAgIG1vZGU6IFRhbmdlbnRNb2RlID0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aDtcblxuICAgIEBwcm9wZXJ0eSh7IHJhbmdlOiBbMCwgMSwgMC4wMV0sIHNsaWRlOiB0cnVlLCB0b29sdGlwOiAnQXV0byBTbW9vdGggdGVuc2lvbiAoMCB1bmlmb3JtLCAwLjUgY2VudHJpcGV0YWwsIDEgY2hvcmRhbCkuJyB9KVxuICAgIHRlbnNpb24gPSBERUZBVUxUX1RFTlNJT047XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbj86IFJlYWRvbmx5PFZlYzM+LCB0YW5nZW50SW4/OiBSZWFkb25seTxWZWMzPiwgdGFuZ2VudE91dD86IFJlYWRvbmx5PFZlYzM+LCByb3RhdGlvbj86IFJlYWRvbmx5PFF1YXQ+LCBtb2RlPzogVGFuZ2VudE1vZGUpIHtcbiAgICAgICAgaWYgKHBvc2l0aW9uKSB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbik7XG4gICAgICAgIGlmICh0YW5nZW50SW4pIHRoaXMudGFuZ2VudEluLnNldCh0YW5nZW50SW4pO1xuICAgICAgICBpZiAodGFuZ2VudE91dCkgdGhpcy50YW5nZW50T3V0LnNldCh0YW5nZW50T3V0KTtcbiAgICAgICAgaWYgKHJvdGF0aW9uKSB0aGlzLnJvdGF0aW9uLnNldChyb3RhdGlvbik7XG4gICAgICAgIGlmIChtb2RlICE9PSB1bmRlZmluZWQpIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgfVxuXG4gICAgY2xvbmUoKTogQmV6aWVyS25vdCB7XG4gICAgICAgIGNvbnN0IGsgPSBuZXcgQmV6aWVyS25vdCh0aGlzLnBvc2l0aW9uLCB0aGlzLnRhbmdlbnRJbiwgdGhpcy50YW5nZW50T3V0LCB0aGlzLnJvdGF0aW9uLCB0aGlzLm1vZGUpO1xuICAgICAgICBrLnRlbnNpb24gPSB0aGlzLnRlbnNpb247XG4gICAgICAgIHJldHVybiBrO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgVGFuZ2VudE1vZGUgfTtcbiIsICIvKipcbiAqIFNtYWxsIHZlY3RvciAvIHF1YXRlcm5pb24gaGVscGVycyBvbiBwbGFpbiB7eCwgeSwgen0gb2JqZWN0cy5cbiAqXG4gKiBUaGUgc3BsaW5lIGNvcmUgdXNlcyB0aGVzZSBpbnN0ZWFkIG9mIGNjLlZlYzMgc28gaXQgaGFzIG5vIGVuZ2luZVxuICogZGVwZW5kZW5jeTogY2MuVmVjMyAvIGNjLlF1YXQgc2F0aXNmeSB0aGUgaW50ZXJmYWNlcywgYW5kIHRoZSBjb3JlIGNhbiBiZVxuICogdW5pdC10ZXN0ZWQgb3V0c2lkZSB0aGUgZWRpdG9yLlxuICpcbiAqIEtub3Qgc3BhY2UgZm9sbG93cyBVbml0eSdzIGNvbnZlbnRpb246IGEga25vdCdzIGxvY2FsICtaIGlzIHRoZSBkaXJlY3Rpb25cbiAqIG9mIGl0cyBvdXQgdGFuZ2VudCBhbmQgbG9jYWwgK1kgaXMgaXRzIHVwIHZlY3Rvci5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIFYzIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHo6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBRNCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB6OiBudW1iZXI7XG4gICAgdzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgRVBTSUxPTiA9IDFlLTY7XG5cbmV4cG9ydCBmdW5jdGlvbiB2Myh4ID0gMCwgeSA9IDAsIHogPSAwKTogVjMge1xuICAgIHJldHVybiB7IHgsIHksIHogfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHE0KHggPSAwLCB5ID0gMCwgeiA9IDAsIHcgPSAxKTogUTQge1xuICAgIHJldHVybiB7IHgsIHksIHosIHcgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldDxUIGV4dGVuZHMgVjM+KG91dDogVCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IFQge1xuICAgIG91dC54ID0geDtcbiAgICBvdXQueSA9IHk7XG4gICAgb3V0LnogPSB6O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5PFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMyk6IFQge1xuICAgIG91dC54ID0gYS54O1xuICAgIG91dC55ID0gYS55O1xuICAgIG91dC56ID0gYS56O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhOiBWMyk6IFYzIHtcbiAgICByZXR1cm4geyB4OiBhLngsIHk6IGEueSwgejogYS56IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQ8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBiOiBWMyk6IFQge1xuICAgIG91dC54ID0gYS54ICsgYi54O1xuICAgIG91dC55ID0gYS55ICsgYi55O1xuICAgIG91dC56ID0gYS56ICsgYi56O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWI8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBiOiBWMyk6IFQge1xuICAgIG91dC54ID0gYS54IC0gYi54O1xuICAgIG91dC55ID0gYS55IC0gYi55O1xuICAgIG91dC56ID0gYS56IC0gYi56O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMsIHM6IG51bWJlcik6IFQge1xuICAgIG91dC54ID0gYS54ICogcztcbiAgICBvdXQueSA9IGEueSAqIHM7XG4gICAgb3V0LnogPSBhLnogKiBzO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKiBvdXQgPSBhICsgYiAqIHMgKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZUFuZEFkZDxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMsIGI6IFYzLCBzOiBudW1iZXIpOiBUIHtcbiAgICBvdXQueCA9IGEueCArIGIueCAqIHM7XG4gICAgb3V0LnkgPSBhLnkgKyBiLnkgKiBzO1xuICAgIG91dC56ID0gYS56ICsgYi56ICogcztcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmVnYXRlPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMyk6IFQge1xuICAgIG91dC54ID0gLWEueDtcbiAgICBvdXQueSA9IC1hLnk7XG4gICAgb3V0LnogPSAtYS56O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3QoYTogVjMsIGI6IFYzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55ICsgYS56ICogYi56O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3Jvc3M8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzLCBiOiBWMyk6IFQge1xuICAgIGNvbnN0IHggPSBhLnkgKiBiLnogLSBhLnogKiBiLnk7XG4gICAgY29uc3QgeSA9IGEueiAqIGIueCAtIGEueCAqIGIuejtcbiAgICBjb25zdCB6ID0gYS54ICogYi55IC0gYS55ICogYi54O1xuICAgIG91dC54ID0geDtcbiAgICBvdXQueSA9IHk7XG4gICAgb3V0LnogPSB6O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZW5TcShhOiBWMyk6IG51bWJlciB7XG4gICAgcmV0dXJuIGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEuejtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlbihhOiBWMyk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydChhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzdFNxKGE6IFYzLCBiOiBWMyk6IG51bWJlciB7XG4gICAgY29uc3QgeCA9IGEueCAtIGIueDtcbiAgICBjb25zdCB5ID0gYS55IC0gYi55O1xuICAgIGNvbnN0IHogPSBhLnogLSBiLno7XG4gICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogejtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3QoYTogVjMsIGI6IFYzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGRpc3RTcShhLCBiKSk7XG59XG5cbi8qKiBOb3JtYWxpemVzIGBhYCBpbnRvIGBvdXRgOyBhIHplcm8gdmVjdG9yIHN0YXlzIHplcm8uICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMyk6IFQge1xuICAgIGNvbnN0IGwgPSBsZW4oYSk7XG4gICAgaWYgKGwgPCBFUFNJTE9OKSByZXR1cm4gc2V0KG91dCwgMCwgMCwgMCk7XG4gICAgcmV0dXJuIHNjYWxlKG91dCwgYSwgMSAvIGwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGVycDxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMsIGI6IFYzLCB0OiBudW1iZXIpOiBUIHtcbiAgICBvdXQueCA9IGEueCArIChiLnggLSBhLngpICogdDtcbiAgICBvdXQueSA9IGEueSArIChiLnkgLSBhLnkpICogdDtcbiAgICBvdXQueiA9IGEueiArIChiLnogLSBhLnopICogdDtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGE6IFYzLCBiOiBWMywgZXBzID0gRVBTSUxPTik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBNYXRoLmFicyhhLnggLSBiLngpIDw9IGVwcyAmJiBNYXRoLmFicyhhLnkgLSBiLnkpIDw9IGVwcyAmJiBNYXRoLmFicyhhLnogLSBiLnopIDw9IGVwcztcbn1cblxuLyoqIEFueSB1bml0IHZlY3RvciBwZXJwZW5kaWN1bGFyIHRvIGBhYCAod2hpY2ggbXVzdCBub3QgYmUgemVybykuICovXG5leHBvcnQgZnVuY3Rpb24gYW55UGVycGVuZGljdWxhcjxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMpOiBUIHtcbiAgICAvLyBDcm9zcyB3aXRoIHRoZSBheGlzIGxlYXN0IGFsaWduZWQgd2l0aCBgYWAuXG4gICAgY29uc3QgYXggPSBNYXRoLmFicyhhLngpO1xuICAgIGNvbnN0IGF5ID0gTWF0aC5hYnMoYS55KTtcbiAgICBjb25zdCBheiA9IE1hdGguYWJzKGEueik7XG4gICAgaWYgKGF4IDw9IGF5ICYmIGF4IDw9IGF6KSBjcm9zcyhvdXQsIGEsIHsgeDogMSwgeTogMCwgejogMCB9KTtcbiAgICBlbHNlIGlmIChheSA8PSBheikgY3Jvc3Mob3V0LCBhLCB7IHg6IDAsIHk6IDEsIHo6IDAgfSk7XG4gICAgZWxzZSBjcm9zcyhvdXQsIGEsIHsgeDogMCwgeTogMCwgejogMSB9KTtcbiAgICByZXR1cm4gbm9ybWFsaXplKG91dCwgb3V0KTtcbn1cblxuLyoqIFJlbW92ZXMgdGhlIHBhcnQgb2YgYHZgIGFsb25nIHVuaXQgdmVjdG9yIGBuYC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0T25QbGFuZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgdjogVjMsIG46IFYzKTogVCB7XG4gICAgY29uc3QgZCA9IGRvdCh2LCBuKTtcbiAgICByZXR1cm4gc2NhbGVBbmRBZGQob3V0LCB2LCBuLCAtZCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBxdWF0ZXJuaW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gcVNldDxUIGV4dGVuZHMgUTQ+KG91dDogVCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKTogVCB7XG4gICAgb3V0LnggPSB4O1xuICAgIG91dC55ID0geTtcbiAgICBvdXQueiA9IHo7XG4gICAgb3V0LncgPSB3O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxQ29weTxUIGV4dGVuZHMgUTQ+KG91dDogVCwgYTogUTQpOiBUIHtcbiAgICByZXR1cm4gcVNldChvdXQsIGEueCwgYS55LCBhLnosIGEudyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxSWRlbnRpdHk8VCBleHRlbmRzIFE0PihvdXQ6IFQpOiBUIHtcbiAgICByZXR1cm4gcVNldChvdXQsIDAsIDAsIDAsIDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcU11bDxUIGV4dGVuZHMgUTQ+KG91dDogVCwgYTogUTQsIGI6IFE0KTogVCB7XG4gICAgY29uc3QgeCA9IGEudyAqIGIueCArIGEueCAqIGIudyArIGEueSAqIGIueiAtIGEueiAqIGIueTtcbiAgICBjb25zdCB5ID0gYS53ICogYi55IC0gYS54ICogYi56ICsgYS55ICogYi53ICsgYS56ICogYi54O1xuICAgIGNvbnN0IHogPSBhLncgKiBiLnogKyBhLnggKiBiLnkgLSBhLnkgKiBiLnggKyBhLnogKiBiLnc7XG4gICAgY29uc3QgdyA9IGEudyAqIGIudyAtIGEueCAqIGIueCAtIGEueSAqIGIueSAtIGEueiAqIGIuejtcbiAgICByZXR1cm4gcVNldChvdXQsIHgsIHksIHosIHcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcU5vcm1hbGl6ZTxUIGV4dGVuZHMgUTQ+KG91dDogVCwgYTogUTQpOiBUIHtcbiAgICBjb25zdCBsID0gTWF0aC5zcXJ0KGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEueiArIGEudyAqIGEudyk7XG4gICAgaWYgKGwgPCBFUFNJTE9OKSByZXR1cm4gcUlkZW50aXR5KG91dCk7XG4gICAgcmV0dXJuIHFTZXQob3V0LCBhLnggLyBsLCBhLnkgLyBsLCBhLnogLyBsLCBhLncgLyBsKTtcbn1cblxuLyoqIEludmVyc2Ugb2YgYSB1bml0IHF1YXRlcm5pb24gKGl0cyBjb25qdWdhdGUpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFJbnZlcnQ8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGE6IFE0KTogVCB7XG4gICAgY29uc3QgbCA9IGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEueiArIGEudyAqIGEudztcbiAgICBpZiAobCA8IEVQU0lMT04pIHJldHVybiBxSWRlbnRpdHkob3V0KTtcbiAgICByZXR1cm4gcVNldChvdXQsIC1hLnggLyBsLCAtYS55IC8gbCwgLWEueiAvIGwsIGEudyAvIGwpO1xufVxuXG4vKiogUm90YXRlcyB2ZWN0b3IgYHZgIGJ5IHF1YXRlcm5pb24gYHFgLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFSb3RhdGU8VCBleHRlbmRzIFYzPihvdXQ6IFQsIHE6IFE0LCB2OiBWMyk6IFQge1xuICAgIC8vIHQgPSAyICogY3Jvc3MocS54eXosIHYpOyB2JyA9IHYgKyB3ICogdCArIGNyb3NzKHEueHl6LCB0KVxuICAgIGNvbnN0IHR4ID0gMiAqIChxLnkgKiB2LnogLSBxLnogKiB2LnkpO1xuICAgIGNvbnN0IHR5ID0gMiAqIChxLnogKiB2LnggLSBxLnggKiB2LnopO1xuICAgIGNvbnN0IHR6ID0gMiAqIChxLnggKiB2LnkgLSBxLnkgKiB2LngpO1xuICAgIGNvbnN0IHggPSB2LnggKyBxLncgKiB0eCArIChxLnkgKiB0eiAtIHEueiAqIHR5KTtcbiAgICBjb25zdCB5ID0gdi55ICsgcS53ICogdHkgKyAocS56ICogdHggLSBxLnggKiB0eik7XG4gICAgY29uc3QgeiA9IHYueiArIHEudyAqIHR6ICsgKHEueCAqIHR5IC0gcS55ICogdHgpO1xuICAgIHJldHVybiBzZXQob3V0LCB4LCB5LCB6KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHFGcm9tQXhpc0FuZ2xlPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBheGlzOiBWMywgcmFkOiBudW1iZXIpOiBUIHtcbiAgICBjb25zdCBuID0gbm9ybWFsaXplKHYzKCksIGF4aXMpO1xuICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQgLyAyKTtcbiAgICByZXR1cm4gcVNldChvdXQsIG4ueCAqIHMsIG4ueSAqIHMsIG4ueiAqIHMsIE1hdGguY29zKHJhZCAvIDIpKTtcbn1cblxuLyoqIFJvdGF0aW9uIG1hdHJpeCBjb2x1bW5zICh4LCB5LCB6IGF4ZXMpIHRvIHF1YXRlcm5pb24uICovXG5leHBvcnQgZnVuY3Rpb24gcUZyb21BeGVzPFQgZXh0ZW5kcyBRND4ob3V0OiBULCB4OiBWMywgeTogVjMsIHo6IFYzKTogVCB7XG4gICAgY29uc3QgbTAwID0geC54LCBtMDEgPSB5LngsIG0wMiA9IHoueDtcbiAgICBjb25zdCBtMTAgPSB4LnksIG0xMSA9IHkueSwgbTEyID0gei55O1xuICAgIGNvbnN0IG0yMCA9IHgueiwgbTIxID0geS56LCBtMjIgPSB6Lno7XG4gICAgY29uc3QgdHJhY2UgPSBtMDAgKyBtMTEgKyBtMjI7XG4gICAgaWYgKHRyYWNlID4gMCkge1xuICAgICAgICBjb25zdCBzID0gMC41IC8gTWF0aC5zcXJ0KHRyYWNlICsgMSk7XG4gICAgICAgIHJldHVybiBxTm9ybWFsaXplKG91dCwgcVNldChvdXQsIChtMjEgLSBtMTIpICogcywgKG0wMiAtIG0yMCkgKiBzLCAobTEwIC0gbTAxKSAqIHMsIDAuMjUgLyBzKSk7XG4gICAgfVxuICAgIGlmIChtMDAgPiBtMTEgJiYgbTAwID4gbTIyKSB7XG4gICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMDAgLSBtMTEgLSBtMjIpO1xuICAgICAgICByZXR1cm4gcU5vcm1hbGl6ZShvdXQsIHFTZXQob3V0LCAwLjI1ICogcywgKG0wMSArIG0xMCkgLyBzLCAobTAyICsgbTIwKSAvIHMsIChtMjEgLSBtMTIpIC8gcykpO1xuICAgIH1cbiAgICBpZiAobTExID4gbTIyKSB7XG4gICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMTEgLSBtMDAgLSBtMjIpO1xuICAgICAgICByZXR1cm4gcU5vcm1hbGl6ZShvdXQsIHFTZXQob3V0LCAobTAxICsgbTEwKSAvIHMsIDAuMjUgKiBzLCAobTEyICsgbTIxKSAvIHMsIChtMDIgLSBtMjApIC8gcykpO1xuICAgIH1cbiAgICBjb25zdCBzID0gMiAqIE1hdGguc3FydCgxICsgbTIyIC0gbTAwIC0gbTExKTtcbiAgICByZXR1cm4gcU5vcm1hbGl6ZShvdXQsIHFTZXQob3V0LCAobTAyICsgbTIwKSAvIHMsIChtMTIgKyBtMjEpIC8gcywgMC4yNSAqIHMsIChtMTAgLSBtMDEpIC8gcykpO1xufVxuXG4vKipcbiAqIFJvdGF0aW9uIHRoYXQgbWFwcyArWiB0byBgZm9yd2FyZGAgYW5kICtZIGFzIGNsb3NlIGFzIHBvc3NpYmxlIHRvIGB1cGBcbiAqIChVbml0eSdzIExvb2tSb3RhdGlvbikuIERlZ2VuZXJhdGUgaW5wdXQgZmFsbHMgYmFjayB0byBhIHBlcnBlbmRpY3VsYXIgdXAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxTG9va1JvdGF0aW9uPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBmb3J3YXJkOiBWMywgdXA6IFYzKTogVCB7XG4gICAgY29uc3QgeiA9IG5vcm1hbGl6ZSh2MygpLCBmb3J3YXJkKTtcbiAgICBpZiAobGVuU3EoeikgPCBFUFNJTE9OKSByZXR1cm4gcUlkZW50aXR5KG91dCk7XG4gICAgY29uc3QgeCA9IGNyb3NzKHYzKCksIHVwLCB6KTtcbiAgICBpZiAobGVuU3EoeCkgPCBFUFNJTE9OKSB7XG4gICAgICAgIC8vIHVwIGlzIHBhcmFsbGVsIHRvIGZvcndhcmQ6IGtlZXAgYSBzdGFibGUgcGVycGVuZGljdWxhci5cbiAgICAgICAgYW55UGVycGVuZGljdWxhcih4LCB6KTtcbiAgICB9XG4gICAgbm9ybWFsaXplKHgsIHgpO1xuICAgIGNvbnN0IHkgPSBjcm9zcyh2MygpLCB6LCB4KTtcbiAgICByZXR1cm4gcUZyb21BeGVzKG91dCwgeCwgeSwgeik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxU2xlcnA8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGE6IFE0LCBiOiBRNCwgdDogbnVtYmVyKTogVCB7XG4gICAgbGV0IGJ4ID0gYi54LCBieSA9IGIueSwgYnogPSBiLnosIGJ3ID0gYi53O1xuICAgIGxldCBjb3MgPSBhLnggKiBieCArIGEueSAqIGJ5ICsgYS56ICogYnogKyBhLncgKiBidztcbiAgICBpZiAoY29zIDwgMCkge1xuICAgICAgICBjb3MgPSAtY29zO1xuICAgICAgICBieCA9IC1ieDtcbiAgICAgICAgYnkgPSAtYnk7XG4gICAgICAgIGJ6ID0gLWJ6O1xuICAgICAgICBidyA9IC1idztcbiAgICB9XG4gICAgbGV0IHMwOiBudW1iZXI7XG4gICAgbGV0IHMxOiBudW1iZXI7XG4gICAgaWYgKDEgLSBjb3MgPiBFUFNJTE9OKSB7XG4gICAgICAgIGNvbnN0IG9tZWdhID0gTWF0aC5hY29zKE1hdGgubWluKDEsIGNvcykpO1xuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihvbWVnYSk7XG4gICAgICAgIHMwID0gTWF0aC5zaW4oKDEgLSB0KSAqIG9tZWdhKSAvIHNpbjtcbiAgICAgICAgczEgPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2luO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHMwID0gMSAtIHQ7XG4gICAgICAgIHMxID0gdDtcbiAgICB9XG4gICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgczAgKiBhLnggKyBzMSAqIGJ4LCBzMCAqIGEueSArIHMxICogYnksIHMwICogYS56ICsgczEgKiBieiwgczAgKiBhLncgKyBzMSAqIGJ3KSk7XG59XG5cbi8qKiBSb3RhdGlvbiB0YWtpbmcgdW5pdCB2ZWN0b3IgYGZyb21gIG9udG8gdW5pdCB2ZWN0b3IgYHRvYCAoc2hvcnRlc3QgYXJjKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxRnJvbVRvPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBmcm9tOiBWMywgdG86IFYzKTogVCB7XG4gICAgY29uc3QgZCA9IGRvdChmcm9tLCB0byk7XG4gICAgaWYgKGQgPj0gMSAtIEVQU0lMT04pIHJldHVybiBxSWRlbnRpdHkob3V0KTtcbiAgICBpZiAoZCA8PSAtMSArIEVQU0lMT04pIHtcbiAgICAgICAgY29uc3QgYXhpcyA9IGFueVBlcnBlbmRpY3VsYXIodjMoKSwgZnJvbSk7XG4gICAgICAgIHJldHVybiBxU2V0KG91dCwgYXhpcy54LCBheGlzLnksIGF4aXMueiwgMCk7XG4gICAgfVxuICAgIGNvbnN0IGMgPSBjcm9zcyh2MygpLCBmcm9tLCB0byk7XG4gICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgYy54LCBjLnksIGMueiwgMSArIGQpKTtcbn1cblxuLyoqIEV1bGVyIGFuZ2xlcyBpbiBkZWdyZWVzIChDb2NvcyBvcmRlcjogcm90YXRlIGFyb3VuZCBaLCB0aGVuIFksIHRoZW4gWC4uLiBtYXRjaGluZyBjYy5RdWF0LnRvRXVsZXIpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFUb0V1bGVyPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBxOiBRNCk6IFQge1xuICAgIC8vIFNhbWUgZm9ybXVsYSBhcyBjYy5RdWF0LnRvRXVsZXIgKG91dGVyWiA9IGZhbHNlKS5cbiAgICBjb25zdCB7IHgsIHksIHosIHcgfSA9IHE7XG4gICAgbGV0IGJhbmsgPSAwO1xuICAgIGxldCBoZWFkaW5nID0gMDtcbiAgICBsZXQgYXR0aXR1ZGUgPSAwO1xuICAgIGNvbnN0IHRlc3QgPSB4ICogeSArIHogKiB3O1xuICAgIGlmICh0ZXN0ID4gMC40OTk5OTkpIHtcbiAgICAgICAgYmFuayA9IDA7XG4gICAgICAgIGhlYWRpbmcgPSAoMiAqIE1hdGguYXRhbjIoeCwgdykgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgYXR0aXR1ZGUgPSA5MDtcbiAgICB9IGVsc2UgaWYgKHRlc3QgPCAtMC40OTk5OTkpIHtcbiAgICAgICAgYmFuayA9IDA7XG4gICAgICAgIGhlYWRpbmcgPSAoLTIgKiBNYXRoLmF0YW4yKHgsIHcpICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIGF0dGl0dWRlID0gLTkwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNxeCA9IHggKiB4O1xuICAgICAgICBjb25zdCBzcXkgPSB5ICogeTtcbiAgICAgICAgY29uc3Qgc3F6ID0geiAqIHo7XG4gICAgICAgIGJhbmsgPSAoTWF0aC5hdGFuMigyICogeCAqIHcgLSAyICogeSAqIHosIDEgLSAyICogc3F4IC0gMiAqIHNxeikgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgaGVhZGluZyA9IChNYXRoLmF0YW4yKDIgKiB5ICogdyAtIDIgKiB4ICogeiwgMSAtIDIgKiBzcXkgLSAyICogc3F6KSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgICAgICBhdHRpdHVkZSA9IChNYXRoLmFzaW4oMiAqIHRlc3QpICogMTgwKSAvIE1hdGguUEk7XG4gICAgfVxuICAgIHJldHVybiBzZXQob3V0LCBiYW5rLCBoZWFkaW5nLCBhdHRpdHVkZSk7XG59XG5cbi8qKiBJbnZlcnNlIG9mIHFUb0V1bGVyIChzYW1lIGFzIGNjLlF1YXQuZnJvbUV1bGVyKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxRnJvbUV1bGVyPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBleDogbnVtYmVyLCBleTogbnVtYmVyLCBlejogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgaGFsZlRvUmFkID0gKDAuNSAqIE1hdGguUEkpIC8gMTgwO1xuICAgIGNvbnN0IHggPSBleCAqIGhhbGZUb1JhZDtcbiAgICBjb25zdCB5ID0gZXkgKiBoYWxmVG9SYWQ7XG4gICAgY29uc3QgeiA9IGV6ICogaGFsZlRvUmFkO1xuICAgIGNvbnN0IHN4ID0gTWF0aC5zaW4oeCk7XG4gICAgY29uc3QgY3ggPSBNYXRoLmNvcyh4KTtcbiAgICBjb25zdCBzeSA9IE1hdGguc2luKHkpO1xuICAgIGNvbnN0IGN5ID0gTWF0aC5jb3MoeSk7XG4gICAgY29uc3Qgc3ogPSBNYXRoLnNpbih6KTtcbiAgICBjb25zdCBjeiA9IE1hdGguY29zKHopO1xuICAgIHJldHVybiBxU2V0KFxuICAgICAgICBvdXQsXG4gICAgICAgIHN4ICogY3kgKiBjeiArIGN4ICogc3kgKiBzeixcbiAgICAgICAgY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6LFxuICAgICAgICBjeCAqIGN5ICogc3ogLSBzeCAqIHN5ICogY3osXG4gICAgICAgIGN4ICogY3kgKiBjeiAtIHN4ICogc3kgKiBzeixcbiAgICApO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWF0cmljZXNcblxuLyoqIENvbHVtbi1tYWpvciA0eDQgbWF0cml4LCBsYWlkIG91dCBsaWtlIGNjLk1hdDQgKG0wMC4ubTE1KS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTTQge1xuICAgIG0wMDogbnVtYmVyOyBtMDE6IG51bWJlcjsgbTAyOiBudW1iZXI7IG0wMzogbnVtYmVyO1xuICAgIG0wNDogbnVtYmVyOyBtMDU6IG51bWJlcjsgbTA2OiBudW1iZXI7IG0wNzogbnVtYmVyO1xuICAgIG0wODogbnVtYmVyOyBtMDk6IG51bWJlcjsgbTEwOiBudW1iZXI7IG0xMTogbnVtYmVyO1xuICAgIG0xMjogbnVtYmVyOyBtMTM6IG51bWJlcjsgbTE0OiBudW1iZXI7IG0xNTogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbTRUcmFuc2Zvcm1Qb2ludDxUIGV4dGVuZHMgVjM+KG91dDogVCwgbTogTTQsIHA6IFYzKTogVCB7XG4gICAgY29uc3QgeyB4LCB5LCB6IH0gPSBwO1xuICAgIGxldCB3ID0gbS5tMDMgKiB4ICsgbS5tMDcgKiB5ICsgbS5tMTEgKiB6ICsgbS5tMTU7XG4gICAgdyA9IHcgPyAxIC8gdyA6IDE7XG4gICAgcmV0dXJuIHNldChcbiAgICAgICAgb3V0LFxuICAgICAgICAobS5tMDAgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMDggKiB6ICsgbS5tMTIpICogdyxcbiAgICAgICAgKG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogeiArIG0ubTEzKSAqIHcsXG4gICAgICAgIChtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHogKyBtLm0xNCkgKiB3LFxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtNFRyYW5zZm9ybURpcjxUIGV4dGVuZHMgVjM+KG91dDogVCwgbTogTTQsIGQ6IFYzKTogVCB7XG4gICAgY29uc3QgeyB4LCB5LCB6IH0gPSBkO1xuICAgIHJldHVybiBzZXQob3V0LCBtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHosIG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogeiwgbS5tMDIgKiB4ICsgbS5tMDYgKiB5ICsgbS5tMTAgKiB6KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHY6IG51bWJlciwgbG86IG51bWJlciwgaGk6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHYgPCBsbyA/IGxvIDogdiA+IGhpID8gaGkgOiB2O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAwMSh2OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2IDwgMCA/IDAgOiB2ID4gMSA/IDEgOiB2O1xufVxuXG4vKiogUG9zaXRpdmUgbW9kdWxvOiB3cmFwcyBgdmAgaW50byBbMCwgbikuICovXG5leHBvcnQgZnVuY3Rpb24gd3JhcCh2OiBudW1iZXIsIG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuICgodiAlIG4pICsgbikgJSBuO1xufVxuIiwgIi8qKlxuICogQ3ViaWMgQmV6aWVyIGN1cnZlIG1hdGggKHB1cmUsIG5vIGVuZ2luZSBkZXBlbmRlbmN5KS5cbiAqXG4gKiBBIGN1cnZlIGlzIHRoZSBzZWdtZW50IGJldHdlZW4gdHdvIGtub3RzOiBwMCA9IGtub3QgcG9zaXRpb24sXG4gKiBwMSA9IHAwICsgb3V0IHRhbmdlbnQsIHAyID0gbmV4dCBrbm90ICsgaXRzIGluIHRhbmdlbnQsIHAzID0gbmV4dCBrbm90LlxuICovXG5pbXBvcnQgeyBWMywgdjMsIHNldCwgY29weSwgc3ViLCBzY2FsZSwgbGVuLCBsZXJwLCBub3JtYWxpemUsIGxlblNxLCBFUFNJTE9OLCBkaXN0IH0gZnJvbSAnLi9tYXRoJztcblxuZXhwb3J0IGludGVyZmFjZSBDdXJ2ZSB7XG4gICAgcDA6IFYzO1xuICAgIHAxOiBWMztcbiAgICBwMjogVjM7XG4gICAgcDM6IFYzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3VydmUoKTogQ3VydmUge1xuICAgIHJldHVybiB7IHAwOiB2MygpLCBwMTogdjMoKSwgcDI6IHYzKCksIHAzOiB2MygpIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5Q3VydmUob3V0OiBDdXJ2ZSwgYzogQ3VydmUpOiBDdXJ2ZSB7XG4gICAgY29weShvdXQucDAsIGMucDApO1xuICAgIGNvcHkob3V0LnAxLCBjLnAxKTtcbiAgICBjb3B5KG91dC5wMiwgYy5wMik7XG4gICAgY29weShvdXQucDMsIGMucDMpO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsUG9zaXRpb248VCBleHRlbmRzIFYzPihvdXQ6IFQsIGM6IEN1cnZlLCB0OiBudW1iZXIpOiBUIHtcbiAgICBjb25zdCB1ID0gMSAtIHQ7XG4gICAgY29uc3QgYSA9IHUgKiB1ICogdTtcbiAgICBjb25zdCBiID0gMyAqIHUgKiB1ICogdDtcbiAgICBjb25zdCBkID0gMyAqIHUgKiB0ICogdDtcbiAgICBjb25zdCBlID0gdCAqIHQgKiB0O1xuICAgIHJldHVybiBzZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgYSAqIGMucDAueCArIGIgKiBjLnAxLnggKyBkICogYy5wMi54ICsgZSAqIGMucDMueCxcbiAgICAgICAgYSAqIGMucDAueSArIGIgKiBjLnAxLnkgKyBkICogYy5wMi55ICsgZSAqIGMucDMueSxcbiAgICAgICAgYSAqIGMucDAueiArIGIgKiBjLnAxLnogKyBkICogYy5wMi56ICsgZSAqIGMucDMueixcbiAgICApO1xufVxuXG4vKiogRmlyc3QgZGVyaXZhdGl2ZSBkQi9kdCAobm90IG5vcm1hbGl6ZWQpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2YWxEZXJpdmF0aXZlPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBjOiBDdXJ2ZSwgdDogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgdSA9IDEgLSB0O1xuICAgIGNvbnN0IGEgPSAzICogdSAqIHU7XG4gICAgY29uc3QgYiA9IDYgKiB1ICogdDtcbiAgICBjb25zdCBkID0gMyAqIHQgKiB0O1xuICAgIHJldHVybiBzZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgYSAqIChjLnAxLnggLSBjLnAwLngpICsgYiAqIChjLnAyLnggLSBjLnAxLngpICsgZCAqIChjLnAzLnggLSBjLnAyLngpLFxuICAgICAgICBhICogKGMucDEueSAtIGMucDAueSkgKyBiICogKGMucDIueSAtIGMucDEueSkgKyBkICogKGMucDMueSAtIGMucDIueSksXG4gICAgICAgIGEgKiAoYy5wMS56IC0gYy5wMC56KSArIGIgKiAoYy5wMi56IC0gYy5wMS56KSArIGQgKiAoYy5wMy56IC0gYy5wMi56KSxcbiAgICApO1xufVxuXG4vKiogU2Vjb25kIGRlcml2YXRpdmUgZDJCL2R0Mi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmFsQWNjZWxlcmF0aW9uPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBjOiBDdXJ2ZSwgdDogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgdSA9IDEgLSB0O1xuICAgIHJldHVybiBzZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgNiAqIHUgKiAoYy5wMi54IC0gMiAqIGMucDEueCArIGMucDAueCkgKyA2ICogdCAqIChjLnAzLnggLSAyICogYy5wMi54ICsgYy5wMS54KSxcbiAgICAgICAgNiAqIHUgKiAoYy5wMi55IC0gMiAqIGMucDEueSArIGMucDAueSkgKyA2ICogdCAqIChjLnAzLnkgLSAyICogYy5wMi55ICsgYy5wMS55KSxcbiAgICAgICAgNiAqIHUgKiAoYy5wMi56IC0gMiAqIGMucDEueiArIGMucDAueikgKyA2ICogdCAqIChjLnAzLnogLSAyICogYy5wMi56ICsgYy5wMS56KSxcbiAgICApO1xufVxuXG5jb25zdCBfZCA9IHYzKCk7XG5cbi8qKlxuICogRGlyZWN0aW9uIG9mIHRyYXZlbCBhdCB0LCB3aXRoIGEgdXNhYmxlIHZhbHVlIGV2ZW4gd2hlcmUgdGhlIGRlcml2YXRpdmVcbiAqIHZhbmlzaGVzIChsaW5lYXIga25vdHMgaGF2ZSB6ZXJvIHRhbmdlbnRzLCBzbyBCJygwKSA9IDApOiBmYWxscyBiYWNrIHRvIHRoZVxuICogc2Vjb25kIGRlcml2YXRpdmUsIHRoZW4gdG8gdGhlIGNob3JkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXZhbERpcmVjdGlvbjxUIGV4dGVuZHMgVjM+KG91dDogVCwgYzogQ3VydmUsIHQ6IG51bWJlcik6IFQge1xuICAgIGV2YWxEZXJpdmF0aXZlKF9kLCBjLCB0KTtcbiAgICBpZiAobGVuU3EoX2QpID4gRVBTSUxPTiAqIEVQU0lMT04pIHJldHVybiBub3JtYWxpemUob3V0LCBfZCk7XG4gICAgLy8gQXQgYW4gZW5kIHdpdGggYSB6ZXJvIHRhbmdlbnQgdGhlIGN1cnZlIGxlYXZlcyBhbG9uZyB0aGUgc2Vjb25kIGRlcml2YXRpdmVcbiAgICAvLyAoc2lnbjogdG93YXJkcyB0aGUgaW5zaWRlIG9mIHRoZSBjdXJ2ZSBhdCB0ID0gMCwgYmFjayBhbG9uZyBpdCBhdCB0ID0gMSkuXG4gICAgZXZhbEFjY2VsZXJhdGlvbihfZCwgYywgdCk7XG4gICAgaWYgKGxlblNxKF9kKSA+IEVQU0lMT04gKiBFUFNJTE9OKSB7XG4gICAgICAgIGlmICh0ID4gMC41KSBzY2FsZShfZCwgX2QsIC0xKTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIF9kKTtcbiAgICB9XG4gICAgc3ViKF9kLCBjLnAzLCBjLnAwKTtcbiAgICByZXR1cm4gbm9ybWFsaXplKG91dCwgX2QpO1xufVxuXG4vKiogU3BsaXRzIGF0IHQgd2l0aCBkZSBDYXN0ZWxqYXU7IHRoZSBoYWx2ZXMgc2hhcmUgdGhlIHNwbGl0IHBvaW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0KGM6IEN1cnZlLCB0OiBudW1iZXIsIGxlZnQ6IEN1cnZlLCByaWdodDogQ3VydmUpOiB2b2lkIHtcbiAgICBjb25zdCBwMDEgPSBsZXJwKHYzKCksIGMucDAsIGMucDEsIHQpO1xuICAgIGNvbnN0IHAxMiA9IGxlcnAodjMoKSwgYy5wMSwgYy5wMiwgdCk7XG4gICAgY29uc3QgcDIzID0gbGVycCh2MygpLCBjLnAyLCBjLnAzLCB0KTtcbiAgICBjb25zdCBwMDEyID0gbGVycCh2MygpLCBwMDEsIHAxMiwgdCk7XG4gICAgY29uc3QgcDEyMyA9IGxlcnAodjMoKSwgcDEyLCBwMjMsIHQpO1xuICAgIGNvbnN0IG1pZCA9IGxlcnAodjMoKSwgcDAxMiwgcDEyMywgdCk7XG4gICAgY29uc3QgcDAgPSBjb3B5KHYzKCksIGMucDApO1xuICAgIGNvbnN0IHAzID0gY29weSh2MygpLCBjLnAzKTtcbiAgICBjb3B5KGxlZnQucDAsIHAwKTtcbiAgICBjb3B5KGxlZnQucDEsIHAwMSk7XG4gICAgY29weShsZWZ0LnAyLCBwMDEyKTtcbiAgICBjb3B5KGxlZnQucDMsIG1pZCk7XG4gICAgY29weShyaWdodC5wMCwgbWlkKTtcbiAgICBjb3B5KHJpZ2h0LnAxLCBwMTIzKTtcbiAgICBjb3B5KHJpZ2h0LnAyLCBwMjMpO1xuICAgIGNvcHkocmlnaHQucDMsIHAzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGluZWFyKGM6IEN1cnZlKTogYm9vbGVhbiB7XG4gICAgLy8gQm90aCBoYW5kbGVzIGxpZSBvbiB0aGUgY2hvcmQuXG4gICAgY29uc3QgY2hvcmQgPSBzdWIodjMoKSwgYy5wMywgYy5wMCk7XG4gICAgY29uc3QgbCA9IGxlbihjaG9yZCk7XG4gICAgaWYgKGwgPCBFUFNJTE9OKSByZXR1cm4gZGlzdChjLnAxLCBjLnAwKSA8IEVQU0lMT04gJiYgZGlzdChjLnAyLCBjLnAzKSA8IEVQU0lMT047XG4gICAgcmV0dXJuIGRpc3RUb0xpbmUoYy5wMSwgYy5wMCwgY2hvcmQsIGwpIDwgbCAqIDFlLTUgJiYgZGlzdFRvTGluZShjLnAyLCBjLnAwLCBjaG9yZCwgbCkgPCBsICogMWUtNTtcbn1cblxuZnVuY3Rpb24gZGlzdFRvTGluZShwOiBWMywgbzogVjMsIGQ6IFYzLCBkbDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBweCA9IHAueCAtIG8ueDtcbiAgICBjb25zdCBweSA9IHAueSAtIG8ueTtcbiAgICBjb25zdCBweiA9IHAueiAtIG8uejtcbiAgICBjb25zdCBjeCA9IHB5ICogZC56IC0gcHogKiBkLnk7XG4gICAgY29uc3QgY3kgPSBweiAqIGQueCAtIHB4ICogZC56O1xuICAgIGNvbnN0IGN6ID0gcHggKiBkLnkgLSBweSAqIGQueDtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGN4ICogY3ggKyBjeSAqIGN5ICsgY3ogKiBjeikgLyBkbDtcbn1cblxuLy8gOC1wb2ludCBHYXVzcy1MZWdlbmRyZSBvbiBbMCwgMV06IGV4YWN0IGZvciBwb2x5bm9taWFscyB1cCB0byBkZWdyZWUgMTUsXG4vLyBwbGVudHkgZm9yIHxCJyh0KXwgb3ZlciBhIHNob3J0IHBhcmFtZXRlciByYW5nZS5cbmNvbnN0IEdMX1ggPSBbXG4gICAgMC4wMTk4NTUwNzE3NTEyMzE5LCAwLjEwMTY2Njc2MTI5MzE4NjYsIDAuMjM3MjMzNzk1MDQxODM1NSwgMC40MDgyODI2Nzg3NTIxNzUxLFxuICAgIDAuNTkxNzE3MzIxMjQ3ODI0OSwgMC43NjI3NjYyMDQ5NTgxNjQ1LCAwLjg5ODMzMzIzODcwNjgxMzQsIDAuOTgwMTQ0OTI4MjQ4NzY4MSxcbl07XG5jb25zdCBHTF9XID0gW1xuICAgIDAuMDUwNjE0MjY4MTQ1MTg4MSwgMC4xMTExOTA1MTcyMjY2ODcyLCAwLjE1Njg1MzMyMjkzODk0MzYsIDAuMTgxMzQxODkxNjg5MTgxMCxcbiAgICAwLjE4MTM0MTg5MTY4OTE4MTAsIDAuMTU2ODUzMzIyOTM4OTQzNiwgMC4xMTExOTA1MTcyMjY2ODcyLCAwLjA1MDYxNDI2ODE0NTE4ODEsXG5dO1xuXG4vKiogQXJjIGxlbmd0aCBiZXR3ZWVuIHBhcmFtZXRlcnMgYSBhbmQgYi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcmNMZW5ndGgoYzogQ3VydmUsIGEgPSAwLCBiID0gMSk6IG51bWJlciB7XG4gICAgaWYgKGIgPD0gYSkgcmV0dXJuIDA7XG4gICAgY29uc3QgaCA9IGIgLSBhO1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgIGV2YWxEZXJpdmF0aXZlKF9kLCBjLCBhICsgaCAqIEdMX1hbaV0pO1xuICAgICAgICBzdW0gKz0gR0xfV1tpXSAqIGxlbihfZCk7XG4gICAgfVxuICAgIHJldHVybiBzdW0gKiBoO1xufVxuXG4vKipcbiAqIEN1bXVsYXRpdmUgYXJjIGxlbmd0aCBhdCBldmVubHkgc3BhY2VkIHBhcmFtZXRlcnM6IGx1dFtpXSBpcyB0aGUgbGVuZ3RoIGZyb21cbiAqIHQgPSAwIHRvIHQgPSBpIC8gKG4gLSAxKS4gVXNlZCB0byBtYXAgZGlzdGFuY2UgdG8gdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTGVuZ3RoVGFibGUoYzogQ3VydmUsIG46IG51bWJlciwgb3V0PzogRmxvYXQ2NEFycmF5KTogRmxvYXQ2NEFycmF5IHtcbiAgICBjb25zdCBsdXQgPSBvdXQgJiYgb3V0Lmxlbmd0aCA9PT0gbiA/IG91dCA6IG5ldyBGbG9hdDY0QXJyYXkobik7XG4gICAgbHV0WzBdID0gMDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgICBsdXRbaV0gPSBsdXRbaSAtIDFdICsgYXJjTGVuZ3RoKGMsIChpIC0gMSkgLyAobiAtIDEpLCBpIC8gKG4gLSAxKSk7XG4gICAgfVxuICAgIHJldHVybiBsdXQ7XG59XG5cbi8qKiBQYXJhbWV0ZXIgdCBhdCBhcmMgbGVuZ3RoIGBkYCBhbG9uZyB0aGUgY3VydmUsIHVzaW5nIGEgdGFibGUgZnJvbSBidWlsZExlbmd0aFRhYmxlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRBdExlbmd0aChsdXQ6IEZsb2F0NjRBcnJheSwgZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBuID0gbHV0Lmxlbmd0aDtcbiAgICBjb25zdCB0b3RhbCA9IGx1dFtuIC0gMV07XG4gICAgaWYgKGQgPD0gMCB8fCB0b3RhbCA8PSAwKSByZXR1cm4gMDtcbiAgICBpZiAoZCA+PSB0b3RhbCkgcmV0dXJuIDE7XG4gICAgbGV0IGxvID0gMDtcbiAgICBsZXQgaGkgPSBuIC0gMTtcbiAgICB3aGlsZSAoaGkgLSBsbyA+IDEpIHtcbiAgICAgICAgY29uc3QgbWlkID0gKGxvICsgaGkpID4+IDE7XG4gICAgICAgIGlmIChsdXRbbWlkXSA8IGQpIGxvID0gbWlkO1xuICAgICAgICBlbHNlIGhpID0gbWlkO1xuICAgIH1cbiAgICBjb25zdCBzZWcgPSBsdXRbaGldIC0gbHV0W2xvXTtcbiAgICBjb25zdCBmID0gc2VnID4gMCA/IChkIC0gbHV0W2xvXSkgLyBzZWcgOiAwO1xuICAgIHJldHVybiAobG8gKyBmKSAvIChuIC0gMSk7XG59XG5cbi8qKiBBcmMgbGVuZ3RoIGZyb20gMCB0byB0LCB1c2luZyBhIHRhYmxlIGZyb20gYnVpbGRMZW5ndGhUYWJsZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGhBdFQobHV0OiBGbG9hdDY0QXJyYXksIHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbiA9IGx1dC5sZW5ndGg7XG4gICAgaWYgKHQgPD0gMCkgcmV0dXJuIDA7XG4gICAgaWYgKHQgPj0gMSkgcmV0dXJuIGx1dFtuIC0gMV07XG4gICAgY29uc3QgeCA9IHQgKiAobiAtIDEpO1xuICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKHgpO1xuICAgIGNvbnN0IGYgPSB4IC0gaTtcbiAgICByZXR1cm4gbHV0W2ldICsgKGx1dFtNYXRoLm1pbihpICsgMSwgbiAtIDEpXSAtIGx1dFtpXSkgKiBmO1xufVxuXG4vKipcbiAqIENsb3Nlc3QgcGFyYW1ldGVyIG9uIHRoZSBjdXJ2ZSB0byBwb2ludCBwOiBjb2Fyc2Ugc2FtcGxpbmcgZm9sbG93ZWQgYnlcbiAqIGEgZmV3IHJvdW5kcyBvZiBsb2NhbCByZWZpbmVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbmVhcmVzdFQoYzogQ3VydmUsIHA6IFYzLCBzYW1wbGVzID0gMTYsIGl0ZXJhdGlvbnMgPSA0KTogeyB0OiBudW1iZXI7IGRpc3RTcTogbnVtYmVyIH0ge1xuICAgIGNvbnN0IHEgPSB2MygpO1xuICAgIGxldCBiZXN0VCA9IDA7XG4gICAgbGV0IGJlc3QgPSBJbmZpbml0eTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzYW1wbGVzOyBpKyspIHtcbiAgICAgICAgY29uc3QgdCA9IGkgLyBzYW1wbGVzO1xuICAgICAgICBldmFsUG9zaXRpb24ocSwgYywgdCk7XG4gICAgICAgIGNvbnN0IGQgPSAocS54IC0gcC54KSAqKiAyICsgKHEueSAtIHAueSkgKiogMiArIChxLnogLSBwLnopICoqIDI7XG4gICAgICAgIGlmIChkIDwgYmVzdCkge1xuICAgICAgICAgICAgYmVzdCA9IGQ7XG4gICAgICAgICAgICBiZXN0VCA9IHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0ZXAgPSAxIC8gc2FtcGxlcztcbiAgICBmb3IgKGxldCBpdCA9IDA7IGl0IDwgaXRlcmF0aW9uczsgaXQrKykge1xuICAgICAgICBzdGVwICo9IDAuNTtcbiAgICAgICAgZm9yIChjb25zdCB0IG9mIFtiZXN0VCAtIHN0ZXAsIGJlc3RUICsgc3RlcF0pIHtcbiAgICAgICAgICAgIGlmICh0IDwgMCB8fCB0ID4gMSkgY29udGludWU7XG4gICAgICAgICAgICBldmFsUG9zaXRpb24ocSwgYywgdCk7XG4gICAgICAgICAgICBjb25zdCBkID0gKHEueCAtIHAueCkgKiogMiArIChxLnkgLSBwLnkpICoqIDIgKyAocS56IC0gcC56KSAqKiAyO1xuICAgICAgICAgICAgaWYgKGQgPCBiZXN0KSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IGQ7XG4gICAgICAgICAgICAgICAgYmVzdFQgPSB0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHQ6IGJlc3RULCBkaXN0U3E6IGJlc3QgfTtcbn1cbiIsICIvKipcbiAqIFNwbGluZSBsb2dpYyBvbiBwbGFpbiBkYXRhIChubyBlbmdpbmUgZGVwZW5kZW5jeSkuXG4gKlxuICogQSBzcGxpbmUgaXMgYSBsaXN0IG9mIEJlemllciBrbm90cy4gRWFjaCBrbm90IGhhcyBhIHBvc2l0aW9uLCBhIHJvdGF0aW9uIGFuZFxuICogdHdvIHRhbmdlbnRzIGV4cHJlc3NlZCBpbiB0aGUga25vdCdzIG93biBzcGFjZSAoK1ogPSBkaXJlY3Rpb24gb2YgdHJhdmVsLFxuICogK1kgPSB1cCksIHBsdXMgYSB0YW5nZW50IG1vZGUgdGhhdCBkZWNpZGVzIGhvdyB0aGUgdGFuZ2VudHMgYXJlIGtlcHQ6XG4gKlxuICogLSBBdXRvU21vb3RoOiB0YW5nZW50cyBjb21wdXRlZCBmcm9tIHRoZSBuZWlnaGJvciBwb3NpdGlvbnMgKENhdG11bGwtUm9tKS5cbiAqIC0gTGluZWFyOiAgICAgbm8gdGFuZ2VudHMsIHN0cmFpZ2h0IHNlZ21lbnRzLlxuICogLSBNaXJyb3JlZDogICB0YW5nZW50cyBvcHBvc2l0ZSBhbmQgb2YgZXF1YWwgbGVuZ3RoLlxuICogLSBDb250aW51b3VzOiB0YW5nZW50cyBvcHBvc2l0ZSwgbGVuZ3RocyBpbmRlcGVuZGVudC5cbiAqIC0gQnJva2VuOiAgICAgdGFuZ2VudHMgaW5kZXBlbmRlbnQuXG4gKlxuICogUG9zaXRpb25zIGFyZSBpbiB0aGUgc3BsaW5lJ3MgbG9jYWwgc3BhY2UgKHRoZSBTcGxpbmVDb250YWluZXIgbm9kZSkuXG4gKi9cbmltcG9ydCB7XG4gICAgVjMsIFE0LCB2MywgcTQsIHNldCwgY29weSwgYWRkLCBzdWIsIHNjYWxlLCBub3JtYWxpemUsIGxlbiwgbGVuU3EsIGRvdCwgY3Jvc3MsIGRpc3QsIGRpc3RTcSxcbiAgICBxUm90YXRlLCBxSW52ZXJ0LCBxTXVsLCBxQ29weSwgcUxvb2tSb3RhdGlvbiwgcUZyb21BeGlzQW5nbGUsIHFOb3JtYWxpemUsIHFJZGVudGl0eSxcbiAgICBwcm9qZWN0T25QbGFuZSwgYW55UGVycGVuZGljdWxhciwgd3JhcCwgY2xhbXAwMSwgRVBTSUxPTiwgc2NhbGVBbmRBZGQsIGxlcnAsXG59IGZyb20gJy4vbWF0aCc7XG5pbXBvcnQge1xuICAgIEN1cnZlLCBjdXJ2ZSwgZXZhbFBvc2l0aW9uLCBldmFsRGlyZWN0aW9uLCBldmFsRGVyaXZhdGl2ZSwgc3BsaXQsIGJ1aWxkTGVuZ3RoVGFibGUsIHRBdExlbmd0aCwgYXJjTGVuZ3RoLCBuZWFyZXN0VCxcbn0gZnJvbSAnLi9jdXJ2ZSc7XG5cbmV4cG9ydCBlbnVtIFRhbmdlbnRNb2RlIHtcbiAgICBBdXRvU21vb3RoID0gMCxcbiAgICBMaW5lYXIgPSAxLFxuICAgIE1pcnJvcmVkID0gMixcbiAgICBDb250aW51b3VzID0gMyxcbiAgICBCcm9rZW4gPSA0LFxufVxuXG4vKiogRGVmYXVsdCBDYXRtdWxsLVJvbSBwYXJhbWV0ZXJpemF0aW9uIHVzZWQgYnkgQXV0b1Ntb290aCBrbm90cyAoMCB1bmlmb3JtLCAwLjUgY2VudHJpcGV0YWwsIDEgY2hvcmRhbCkuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9URU5TSU9OID0gMC41O1xuXG5leHBvcnQgaW50ZXJmYWNlIEtub3RMaWtlIHtcbiAgICBwb3NpdGlvbjogVjM7XG4gICAgdGFuZ2VudEluOiBWMztcbiAgICB0YW5nZW50T3V0OiBWMztcbiAgICByb3RhdGlvbjogUTQ7XG4gICAgbW9kZTogbnVtYmVyO1xuICAgIHRlbnNpb246IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTcGxpbmVMaWtlIHtcbiAgICBrbm90czogS25vdExpa2VbXTtcbiAgICBjbG9zZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua0xpa2Uge1xuICAgIC8qKiBGbGF0dGVuZWQgKHNwbGluZUluZGV4LCBrbm90SW5kZXgpIHBhaXJzLiAqL1xuICAgIGtub3RzOiBudW1iZXJbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb250YWluZXJMaWtlIHtcbiAgICBzcGxpbmVzOiBTcGxpbmVMaWtlW107XG4gICAgbGlua3M6IExpbmtMaWtlW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjdG9yeSB7XG4gICAga25vdCgpOiBLbm90TGlrZTtcbiAgICBzcGxpbmUoKTogU3BsaW5lTGlrZTtcbiAgICBsaW5rKCk6IExpbmtMaWtlO1xufVxuXG5jb25zdCBVUDogVjMgPSB7IHg6IDAsIHk6IDEsIHo6IDAgfTtcbmNvbnN0IEZPUldBUkQ6IFYzID0geyB4OiAwLCB5OiAwLCB6OiAxIH07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBpbmRpY2VzXG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2SW5kZXgoaTogbnVtYmVyLCBjb3VudDogbnVtYmVyLCBjbG9zZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIHJldHVybiBjbG9zZWQgPyB3cmFwKGkgLSAxLCBjb3VudCkgOiBNYXRoLm1heChpIC0gMSwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXh0SW5kZXgoaTogbnVtYmVyLCBjb3VudDogbnVtYmVyLCBjbG9zZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIHJldHVybiBjbG9zZWQgPyB3cmFwKGkgKyAxLCBjb3VudCkgOiBNYXRoLm1pbihpICsgMSwgY291bnQgLSAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnZlQ291bnQoczogU3BsaW5lTGlrZSk6IG51bWJlciB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmIChuIDwgMikgcmV0dXJuIDA7XG4gICAgcmV0dXJuIHMuY2xvc2VkID8gbiA6IG4gLSAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFuZ2VudHNFZGl0YWJsZShtb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbW9kZSA9PT0gVGFuZ2VudE1vZGUuTWlycm9yZWQgfHwgbW9kZSA9PT0gVGFuZ2VudE1vZGUuQ29udGludW91cyB8fCBtb2RlID09PSBUYW5nZW50TW9kZS5Ccm9rZW47XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGtub3RzXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5S25vdDxLIGV4dGVuZHMgS25vdExpa2U+KG91dDogSywgazogS25vdExpa2UpOiBLIHtcbiAgICBjb3B5KG91dC5wb3NpdGlvbiwgay5wb3NpdGlvbik7XG4gICAgY29weShvdXQudGFuZ2VudEluLCBrLnRhbmdlbnRJbik7XG4gICAgY29weShvdXQudGFuZ2VudE91dCwgay50YW5nZW50T3V0KTtcbiAgICBxQ29weShvdXQucm90YXRpb24sIGsucm90YXRpb24pO1xuICAgIG91dC5tb2RlID0gay5tb2RlO1xuICAgIG91dC50ZW5zaW9uID0gay50ZW5zaW9uO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBrbm90VXA8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGs6IEtub3RMaWtlKTogVCB7XG4gICAgcmV0dXJuIHFSb3RhdGUob3V0LCBrLnJvdGF0aW9uLCBVUCk7XG59XG5cbi8qKiBPdXQgdGFuZ2VudCBpbiBzcGxpbmUgc3BhY2UgKG9mZnNldCBmcm9tIHRoZSBrbm90IHBvc2l0aW9uKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0YW5nZW50T3V0VmVjPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBrOiBLbm90TGlrZSk6IFQge1xuICAgIHJldHVybiBxUm90YXRlKG91dCwgay5yb3RhdGlvbiwgay50YW5nZW50T3V0KTtcbn1cblxuLyoqIEluIHRhbmdlbnQgaW4gc3BsaW5lIHNwYWNlIChvZmZzZXQgZnJvbSB0aGUga25vdCBwb3NpdGlvbikuICovXG5leHBvcnQgZnVuY3Rpb24gdGFuZ2VudEluVmVjPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBrOiBLbm90TGlrZSk6IFQge1xuICAgIHJldHVybiBxUm90YXRlKG91dCwgay5yb3RhdGlvbiwgay50YW5nZW50SW4pO1xufVxuXG4vKipcbiAqIEtub3Qgcm90YXRpb24gZm9yIGEgdGFuZ2VudCBkaXJlY3Rpb24gYW5kIGEgbm9ybWFsICh1cCkuIExpa2UgVW5pdHknc1xuICogR2V0S25vdFJvdGF0aW9uOiB1cCBpcyB0aGUgbm9ybWFsIHByb2plY3RlZCBvZmYgdGhlIHRhbmdlbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrbm90Um90YXRpb248VCBleHRlbmRzIFE0PihvdXQ6IFQsIHRhbmdlbnQ6IFYzLCBub3JtYWw6IFYzKTogVCB7XG4gICAgY29uc3QgdCA9IG5vcm1hbGl6ZSh2MygpLCB0YW5nZW50KTtcbiAgICBsZXQgbiA9IG5vcm1hbGl6ZSh2MygpLCBub3JtYWwpO1xuICAgIGlmIChsZW5TcShuKSA8IEVQU0lMT04pIG4gPSBjb3B5KHYzKCksIFVQKTtcbiAgICBpZiAobGVuU3EodCkgPCBFUFNJTE9OKSB7XG4gICAgICAgIC8vIE5vIGRpcmVjdGlvbjogZm9yd2FyZCBpcyBhbnkgZGlyZWN0aW9uIHBlcnBlbmRpY3VsYXIgdG8gdGhlIG5vcm1hbC5cbiAgICAgICAgY29uc3QgZiA9IGFueVBlcnBlbmRpY3VsYXIodjMoKSwgbik7XG4gICAgICAgIHJldHVybiBxTG9va1JvdGF0aW9uKG91dCwgZiwgbik7XG4gICAgfVxuICAgIGlmIChNYXRoLmFicyhkb3QodCwgbikpID4gMSAtIDFlLTUpIHtcbiAgICAgICAgLy8gTm9ybWFsIHBhcmFsbGVsIHRvIHRoZSB0YW5nZW50OiBwaWNrIGFuIHVwIHBlcnBlbmRpY3VsYXIgdG8gaXQuXG4gICAgICAgIGNvbnN0IHVwID0gY3Jvc3ModjMoKSwgdCwgeyB4OiAxLCB5OiAwLCB6OiAwIH0pO1xuICAgICAgICBpZiAobGVuU3EodXApIDwgRVBTSUxPTikgY3Jvc3ModXAsIHQsIHsgeDogMCwgeTogMCwgejogMSB9KTtcbiAgICAgICAgcmV0dXJuIHFMb29rUm90YXRpb24ob3V0LCB0LCBub3JtYWxpemUodXAsIHVwKSk7XG4gICAgfVxuICAgIGNvbnN0IHVwID0gbm9ybWFsaXplKHYzKCksIHByb2plY3RPblBsYW5lKHYzKCksIG4sIHQpKTtcbiAgICByZXR1cm4gcUxvb2tSb3RhdGlvbihvdXQsIHQsIHVwKTtcbn1cblxuLyoqXG4gKiBBdXRvU21vb3RoIHRhbmdlbnQgYXQgYGN1cmAgZ2l2ZW4gaXRzIG5laWdoYm9yczogYSBDYXRtdWxsLVJvbSB0YW5nZW50IHdpdGhcbiAqIHRoZSBwYXJhbWV0ZXJpemF0aW9uIGB0ZW5zaW9uYCAoYWxwaGEpLCBzY2FsZWQgZm9yIGEgY3ViaWMgQmV6aWVyIGhhbmRsZS5cbiAqIEJhc2VkIG9uIFl1a3NlbCBldCBhbC4sIFwiUGFyYW1ldGVyaXphdGlvbiBhbmQgYXBwbGljYXRpb25zIG9mIENhdG11bGwtUm9tIGN1cnZlc1wiLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXV0b1Ntb290aFRhbmdlbnQ8VCBleHRlbmRzIFYzPihvdXQ6IFQsIHByZXY6IFYzLCBjdXI6IFYzLCBuZXh0OiBWMywgdGVuc2lvbjogbnVtYmVyKTogVCB7XG4gICAgY29uc3QgZDEgPSBkaXN0KGN1ciwgcHJldik7XG4gICAgY29uc3QgZDIgPSBkaXN0KG5leHQsIGN1cik7XG4gICAgaWYgKGQxIDwgRVBTSUxPTiAmJiBkMiA8IEVQU0lMT04pIHJldHVybiBzZXQob3V0LCAwLCAwLCAwKTtcbiAgICAvLyBPbmx5IG9uZSBuZWlnaGJvcjogYSBzaG9ydCBoYW5kbGUgdG93YXJkcyBpdCwgZW5vdWdoIHRvIGdpdmUgdGhlIGtub3QgYSBkaXJlY3Rpb24uXG4gICAgaWYgKGQxIDwgRVBTSUxPTikgcmV0dXJuIHNjYWxlKG91dCwgc3ViKG91dCwgbmV4dCwgY3VyKSwgMC4xKTtcbiAgICBpZiAoZDIgPCBFUFNJTE9OKSByZXR1cm4gc2NhbGUob3V0LCBzdWIob3V0LCBjdXIsIHByZXYpLCAwLjEpO1xuICAgIGNvbnN0IGEgPSB0ZW5zaW9uO1xuICAgIGNvbnN0IGQxYSA9IE1hdGgucG93KGQxLCBhKTtcbiAgICBjb25zdCBkMmEgPSBNYXRoLnBvdyhkMiwgYSk7XG4gICAgY29uc3QgZDFhMiA9IGQxYSAqIGQxYTtcbiAgICBjb25zdCBkMmEyID0gZDJhICogZDJhO1xuICAgIGNvbnN0IGsgPSAxIC8gKDMgKiBkMWEgKiAoZDFhICsgZDJhKSk7XG4gICAgcmV0dXJuIHNldChcbiAgICAgICAgb3V0LFxuICAgICAgICAoZDFhMiAqIG5leHQueCAtIGQyYTIgKiBwcmV2LnggKyAoZDJhMiAtIGQxYTIpICogY3VyLngpICogayxcbiAgICAgICAgKGQxYTIgKiBuZXh0LnkgLSBkMmEyICogcHJldi55ICsgKGQyYTIgLSBkMWEyKSAqIGN1ci55KSAqIGssXG4gICAgICAgIChkMWEyICogbmV4dC56IC0gZDJhMiAqIHByZXYueiArIChkMmEyIC0gZDFhMikgKiBjdXIueikgKiBrLFxuICAgICk7XG59XG5cbi8qKiBSZWNvbXB1dGVzIHRoZSB0YW5nZW50cyAoYW5kIHJvdGF0aW9uKSBhIGtub3QncyBtb2RlIGltcGxpZXMuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlUYW5nZW50TW9kZShzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbikgcmV0dXJuO1xuICAgIGNvbnN0IGsgPSBzLmtub3RzW2ldO1xuICAgIHN3aXRjaCAoay5tb2RlKSB7XG4gICAgICAgIGNhc2UgVGFuZ2VudE1vZGUuTGluZWFyOlxuICAgICAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGFuZ2VudE1vZGUuQXV0b1Ntb290aDoge1xuICAgICAgICAgICAgY29uc3QgcHJldiA9IHMua25vdHNbcHJldkluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gcy5rbm90c1tuZXh0SW5kZXgoaSwgbiwgcy5jbG9zZWQpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IHVwID0ga25vdFVwKHYzKCksIGspO1xuICAgICAgICAgICAgY29uc3QgdGluID0gYXV0b1Ntb290aFRhbmdlbnQodjMoKSwgbmV4dCwgay5wb3NpdGlvbiwgcHJldiwgay50ZW5zaW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdXQgPSBhdXRvU21vb3RoVGFuZ2VudCh2MygpLCBwcmV2LCBrLnBvc2l0aW9uLCBuZXh0LCBrLnRlbnNpb24pO1xuICAgICAgICAgICAgbGV0IGxpbiA9IGxlbih0aW4pO1xuICAgICAgICAgICAgbGV0IGxvdXQgPSBsZW4odG91dCk7XG4gICAgICAgICAgICBsZXQgZGlyID0gdG91dDtcbiAgICAgICAgICAgIGlmIChsaW4gPCBFUFNJTE9OKSBsaW4gPSBsb3V0O1xuICAgICAgICAgICAgaWYgKGxvdXQgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICAgICAgbG91dCA9IGxpbjtcbiAgICAgICAgICAgICAgICBkaXIgPSBzY2FsZSh2MygpLCB0aW4sIC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZW5TcShkaXIpID4gRVBTSUxPTikga25vdFJvdGF0aW9uKGsucm90YXRpb24sIGRpciwgdXApO1xuICAgICAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbGluKTtcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGxvdXQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBUYW5nZW50TW9kZS5NaXJyb3JlZDpcbiAgICAgICAgY2FzZSBUYW5nZW50TW9kZS5Db250aW51b3VzOlxuICAgICAgICAgICAgYmFrZVRhbmdlbnREaXJlY3Rpb24oaywgay5tb2RlID09PSBUYW5nZW50TW9kZS5NaXJyb3JlZCwgdHJ1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuLyoqXG4gKiBUdXJucyB0aGUga25vdCBzbyBpdHMgdGFuZ2VudHMgbGllIG9uIGxvY2FsIFogKHRoZSBtYWluIHRhbmdlbnQga2VlcHMgaXRzXG4gKiBkaXJlY3Rpb24pLCBhcyBNaXJyb3JlZCAvIENvbnRpbnVvdXMga25vdHMgc3RvcmUgdGhlbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJha2VUYW5nZW50RGlyZWN0aW9uKGs6IEtub3RMaWtlLCBtaXJyb3JlZDogYm9vbGVhbiwgb3V0SXNNYWluOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdG91dCA9IHRhbmdlbnRPdXRWZWModjMoKSwgayk7XG4gICAgY29uc3QgdGluID0gdGFuZ2VudEluVmVjKHYzKCksIGspO1xuICAgIGNvbnN0IG1haW4gPSBvdXRJc01haW4gPyB0b3V0IDogc2NhbGUodjMoKSwgdGluLCAtMSk7XG4gICAgY29uc3Qgb3RoZXIgPSBvdXRJc01haW4gPyBzY2FsZSh2MygpLCB0aW4sIC0xKSA6IHRvdXQ7XG4gICAgY29uc3QgZGlyID0gbGVuU3EobWFpbikgPiBFUFNJTE9OID8gbWFpbiA6IG90aGVyO1xuICAgIGNvbnN0IHVwID0ga25vdFVwKHYzKCksIGspO1xuICAgIGlmIChsZW5TcShkaXIpID4gRVBTSUxPTikga25vdFJvdGF0aW9uKGsucm90YXRpb24sIGRpciwgdXApO1xuICAgIGNvbnN0IGxtYWluID0gbGVuKG1haW4pO1xuICAgIGNvbnN0IGxvdGhlciA9IGxlbihvdGhlcik7XG4gICAgaWYgKG1pcnJvcmVkKSB7XG4gICAgICAgIGNvbnN0IGwgPSBsbWFpbiA+IEVQU0lMT04gPyBsbWFpbiA6IGxvdGhlcjtcbiAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbCk7XG4gICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWwpO1xuICAgIH0gZWxzZSBpZiAob3V0SXNNYWluKSB7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGxtYWluKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbG90aGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1sbWFpbik7XG4gICAgICAgIHNldChrLnRhbmdlbnRPdXQsIDAsIDAsIGxvdGhlcik7XG4gICAgfVxufVxuXG4vKiogUmVjb21wdXRlcyB0aGUga25vdCBhbmQgaXRzIEF1dG9TbW9vdGggbmVpZ2hib3JzIGFmdGVyIGl0cyBwb3NpdGlvbiBjaGFuZ2VkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hBcm91bmQoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmICghbikgcmV0dXJuO1xuICAgIGNvbnN0IHAgPSBwcmV2SW5kZXgoaSwgbiwgcy5jbG9zZWQpO1xuICAgIGNvbnN0IHEgPSBuZXh0SW5kZXgoaSwgbiwgcy5jbG9zZWQpO1xuICAgIGlmIChwICE9PSBpICYmIHMua25vdHNbcF0ubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCkgYXBwbHlUYW5nZW50TW9kZShzLCBwKTtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIGkpO1xuICAgIGlmIChxICE9PSBpICYmIHEgIT09IHAgJiYgcy5rbm90c1txXS5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoKSBhcHBseVRhbmdlbnRNb2RlKHMsIHEpO1xufVxuXG4vKiogUmUtYXBwbGllcyBldmVyeSBrbm90J3MgbW9kZSAoYWZ0ZXIgbG9hZGluZyBvciBleHRlcm5hbCBlZGl0cykuICovXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaEFsbChzOiBTcGxpbmVMaWtlKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmtub3RzLmxlbmd0aDsgaSsrKSBhcHBseVRhbmdlbnRNb2RlKHMsIGkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0S25vdFBvc2l0aW9uKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlciwgcDogVjMpOiB2b2lkIHtcbiAgICBjb3B5KHMua25vdHNbaV0ucG9zaXRpb24sIHApO1xuICAgIHJlZnJlc2hBcm91bmQocywgaSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaW4gb3Igb3V0IHRhbmdlbnQgZnJvbSBhIHNwbGluZS1zcGFjZSBvZmZzZXQsIGtlZXBpbmcgdGhlIGtub3Qnc1xuICogbW9kZSBjb25zdHJhaW50cy4gVGFuZ2VudHMgb2YgQXV0b1Ntb290aCAvIExpbmVhciBrbm90cyBiZWNvbWUgQ29udGludW91c1xuICogKHRoZXkgaGF2ZSBub3RoaW5nIHRvIGRyYWcgb3RoZXJ3aXNlKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRhbmdlbnRWZWMoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCB3aGljaDogJ2luJyB8ICdvdXQnLCB2OiBWMyk6IHZvaWQge1xuICAgIGNvbnN0IGsgPSBzLmtub3RzW2ldO1xuICAgIGlmICghdGFuZ2VudHNFZGl0YWJsZShrLm1vZGUpKSB7XG4gICAgICAgIGlmIChrLm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhcikgbWFrZUV4cGxpY2l0TGluZWFyVGFuZ2VudHMocywgaSk7XG4gICAgICAgIGsubW9kZSA9IFRhbmdlbnRNb2RlLkNvbnRpbnVvdXM7XG4gICAgfVxuICAgIGlmIChrLm1vZGUgPT09IFRhbmdlbnRNb2RlLkJyb2tlbikge1xuICAgICAgICBjb25zdCBsb2NhbCA9IHFSb3RhdGUodjMoKSwgcUludmVydChxNCgpLCBrLnJvdGF0aW9uKSwgdik7XG4gICAgICAgIGNvcHkod2hpY2ggPT09ICdpbicgPyBrLnRhbmdlbnRJbiA6IGsudGFuZ2VudE91dCwgbG9jYWwpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGwgPSBsZW4odik7XG4gICAgY29uc3QgZGlyID0gd2hpY2ggPT09ICdvdXQnID8gY29weSh2MygpLCB2KSA6IHNjYWxlKHYzKCksIHYsIC0xKTtcbiAgICBpZiAobCA+IEVQU0lMT04pIGtub3RSb3RhdGlvbihrLnJvdGF0aW9uLCBkaXIsIGtub3RVcCh2MygpLCBrKSk7XG4gICAgY29uc3QgbWlycm9yZWQgPSBrLm1vZGUgPT09IFRhbmdlbnRNb2RlLk1pcnJvcmVkO1xuICAgIGlmICh3aGljaCA9PT0gJ291dCcpIHtcbiAgICAgICAgY29uc3QgbGluID0gbWlycm9yZWQgPyBsIDogbGVuKGsudGFuZ2VudEluKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbCk7XG4gICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWxpbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbG91dCA9IG1pcnJvcmVkID8gbCA6IGxlbihrLnRhbmdlbnRPdXQpO1xuICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1sKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbG91dCk7XG4gICAgfVxufVxuXG4vKiogTGluZWFyIGtub3RzIHN0b3JlIHplcm8gdGFuZ2VudHM7IGdpdmUgdGhlbSBncmFiYmFibGUgb25lcyBwb2ludGluZyBhdCB0aGUgbmVpZ2hib3JzLiAqL1xuZnVuY3Rpb24gbWFrZUV4cGxpY2l0TGluZWFyVGFuZ2VudHMoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGNvbnN0IGsgPSBzLmtub3RzW2ldO1xuICAgIGNvbnN0IGludiA9IHFJbnZlcnQocTQoKSwgay5yb3RhdGlvbik7XG4gICAgY29uc3QgcHJldiA9IHMua25vdHNbcHJldkluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgY29uc3QgbmV4dCA9IHMua25vdHNbbmV4dEluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgcVJvdGF0ZShrLnRhbmdlbnRJbiwgaW52LCBzY2FsZSh2MygpLCBzdWIodjMoKSwgcHJldiwgay5wb3NpdGlvbiksIDEgLyAzKSk7XG4gICAgcVJvdGF0ZShrLnRhbmdlbnRPdXQsIGludiwgc2NhbGUodjMoKSwgc3ViKHYzKCksIG5leHQsIGsucG9zaXRpb24pLCAxIC8gMykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VGFuZ2VudE1vZGUoczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCBtb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBrID0gcy5rbm90c1tpXTtcbiAgICBpZiAoay5tb2RlID09PSBtb2RlKSB7XG4gICAgICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGsubW9kZSA9PT0gVGFuZ2VudE1vZGUuTGluZWFyICYmIHRhbmdlbnRzRWRpdGFibGUobW9kZSkpIG1ha2VFeHBsaWNpdExpbmVhclRhbmdlbnRzKHMsIGkpO1xuICAgIGsubW9kZSA9IG1vZGU7XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRlbnNpb24oczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCB0ZW5zaW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzLmtub3RzW2ldLnRlbnNpb24gPSB0ZW5zaW9uO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRSb3RhdGlvbihzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIsIHI6IFE0KTogdm9pZCB7XG4gICAgcU5vcm1hbGl6ZShzLmtub3RzW2ldLnJvdGF0aW9uLCByKTtcbiAgICAvLyBBdXRvU21vb3RoIGtub3RzIG93biB0aGVpciByb3RhdGlvbidzIGRpcmVjdGlvbjsgb25seSB0aGUgcm9sbCBzdGlja3MuXG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBpKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjdXJ2ZXNcblxuLyoqIENvbnRyb2wgcG9pbnRzIG9mIGN1cnZlIGkgKGJldHdlZW4ga25vdCBpIGFuZCB0aGUgbmV4dCBrbm90KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJ2ZShzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIsIG91dDogQ3VydmUgPSBjdXJ2ZSgpKTogQ3VydmUge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBjb25zdCBhID0gcy5rbm90c1tpXTtcbiAgICBjb25zdCBiID0gcy5rbm90c1soaSArIDEpICUgbl07XG4gICAgY29weShvdXQucDAsIGEucG9zaXRpb24pO1xuICAgIGFkZChvdXQucDEsIGEucG9zaXRpb24sIHRhbmdlbnRPdXRWZWMob3V0LnAxLCBhKSk7XG4gICAgYWRkKG91dC5wMiwgYi5wb3NpdGlvbiwgdGFuZ2VudEluVmVjKG91dC5wMiwgYikpO1xuICAgIGNvcHkob3V0LnAzLCBiLnBvc2l0aW9uKTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjYWNoZVxuXG4vKiogU2FtcGxlcyBwZXIgY3VydmUgZm9yIHRoZSBkaXN0YW5jZSB0YWJsZS4gKi9cbmV4cG9ydCBjb25zdCBMRU5HVEhfU0FNUExFUyA9IDMyO1xuLyoqIFNhbXBsZXMgcGVyIGN1cnZlIGZvciB0aGUgdXAtdmVjdG9yIHRhYmxlLiAqL1xuZXhwb3J0IGNvbnN0IFVQX1NBTVBMRVMgPSAxNjtcblxuZXhwb3J0IGNsYXNzIFNwbGluZUNhY2hlIHtcbiAgICAvKiogRmluZ2VycHJpbnQgb2YgdGhlIGRhdGEgdGhlIGNhY2hlIHdhcyBidWlsdCBmcm9tLiAqL1xuICAgIHN0YW1wID0gTmFOO1xuICAgIGN1cnZlczogQ3VydmVbXSA9IFtdO1xuICAgIGxlbmd0aHM6IG51bWJlcltdID0gW107XG4gICAgLyoqIExlbmd0aCBvZiBhbGwgY3VydmVzIGJlZm9yZSBjdXJ2ZSBpLiAqL1xuICAgIHN0YXJ0czogbnVtYmVyW10gPSBbXTtcbiAgICB0b3RhbCA9IDA7XG4gICAgdGFibGVzOiBGbG9hdDY0QXJyYXlbXSA9IFtdO1xuICAgIHVwczogKEZsb2F0NjRBcnJheSB8IG51bGwpW10gPSBbXTtcbn1cblxuY29uc3QgX2hhc2hCdWYgPSBuZXcgRmxvYXQ2NEFycmF5KDEpO1xuY29uc3QgX2hhc2hJbnQgPSBuZXcgSW50MzJBcnJheShfaGFzaEJ1Zi5idWZmZXIpO1xuXG5mdW5jdGlvbiBtaXgoaDogbnVtYmVyLCB2OiBudW1iZXIpOiBudW1iZXIge1xuICAgIF9oYXNoQnVmWzBdID0gdjtcbiAgICBoID0gTWF0aC5pbXVsKGggXiBfaGFzaEludFswXSwgMTY3Nzc2MTkpO1xuICAgIGggPSBNYXRoLmltdWwoaCBeIF9oYXNoSW50WzFdLCAxNjc3NzYxOSk7XG4gICAgcmV0dXJuIGg7XG59XG5cbi8qKiBDaGVhcCBoYXNoIG9mIGV2ZXJ5dGhpbmcgdGhhdCBzaGFwZXMgdGhlIHNwbGluZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5nZXJwcmludChzOiBTcGxpbmVMaWtlKTogbnVtYmVyIHtcbiAgICBsZXQgaCA9IDIxNjYxMzYyNjEgfCAwO1xuICAgIGggPSBtaXgoaCwgcy5rbm90cy5sZW5ndGgpO1xuICAgIGggPSBtaXgoaCwgcy5jbG9zZWQgPyAxIDogMCk7XG4gICAgZm9yIChjb25zdCBrIG9mIHMua25vdHMpIHtcbiAgICAgICAgaCA9IG1peChoLCBrLnBvc2l0aW9uLngpO1xuICAgICAgICBoID0gbWl4KGgsIGsucG9zaXRpb24ueSk7XG4gICAgICAgIGggPSBtaXgoaCwgay5wb3NpdGlvbi56KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRJbi54KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRJbi55KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRJbi56KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRPdXQueCk7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50T3V0LnkpO1xuICAgICAgICBoID0gbWl4KGgsIGsudGFuZ2VudE91dC56KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnJvdGF0aW9uLngpO1xuICAgICAgICBoID0gbWl4KGgsIGsucm90YXRpb24ueSk7XG4gICAgICAgIGggPSBtaXgoaCwgay5yb3RhdGlvbi56KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnJvdGF0aW9uLncpO1xuICAgICAgICBoID0gbWl4KGgsIGsubW9kZSk7XG4gICAgICAgIGggPSBtaXgoaCwgay50ZW5zaW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZENhY2hlKHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSwgc3RhbXAgPSBmaW5nZXJwcmludChzKSk6IFNwbGluZUNhY2hlIHtcbiAgICBjb25zdCBjb3VudCA9IGN1cnZlQ291bnQocyk7XG4gICAgY2FjaGUuY3VydmVzLmxlbmd0aCA9IGNvdW50O1xuICAgIGNhY2hlLmxlbmd0aHMubGVuZ3RoID0gY291bnQ7XG4gICAgY2FjaGUuc3RhcnRzLmxlbmd0aCA9IGNvdW50O1xuICAgIGNhY2hlLnRhYmxlcy5sZW5ndGggPSBjb3VudDtcbiAgICBjYWNoZS51cHMubGVuZ3RoID0gY291bnQ7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgYyA9IGdldEN1cnZlKHMsIGksIGNhY2hlLmN1cnZlc1tpXSB8fCBjdXJ2ZSgpKTtcbiAgICAgICAgY2FjaGUuY3VydmVzW2ldID0gYztcbiAgICAgICAgY29uc3QgdGFibGUgPSBidWlsZExlbmd0aFRhYmxlKGMsIExFTkdUSF9TQU1QTEVTLCBjYWNoZS50YWJsZXNbaV0pO1xuICAgICAgICBjYWNoZS50YWJsZXNbaV0gPSB0YWJsZTtcbiAgICAgICAgY2FjaGUuc3RhcnRzW2ldID0gdG90YWw7XG4gICAgICAgIGNhY2hlLmxlbmd0aHNbaV0gPSB0YWJsZVtMRU5HVEhfU0FNUExFUyAtIDFdO1xuICAgICAgICB0b3RhbCArPSBjYWNoZS5sZW5ndGhzW2ldO1xuICAgICAgICBjYWNoZS51cHNbaV0gPSBudWxsOyAvLyBidWlsdCBvbiBkZW1hbmRcbiAgICB9XG4gICAgY2FjaGUudG90YWwgPSB0b3RhbDtcbiAgICBjYWNoZS5zdGFtcCA9IHN0YW1wO1xuICAgIHJldHVybiBjYWNoZTtcbn1cblxuLyoqIFJlYnVpbGRzIHRoZSBjYWNoZSB3aGVuIHRoZSBzcGxpbmUgY2hhbmdlZC4gUmV0dXJucyB0aGUgdXAtdG8tZGF0ZSBjYWNoZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVDYWNoZShzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUpOiBTcGxpbmVDYWNoZSB7XG4gICAgY29uc3Qgc3RhbXAgPSBmaW5nZXJwcmludChzKTtcbiAgICBpZiAoc3RhbXAgIT09IGNhY2hlLnN0YW1wKSBidWlsZENhY2hlKHMsIGNhY2hlLCBzdGFtcCk7XG4gICAgcmV0dXJuIGNhY2hlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1cnZlUG9pbnQge1xuICAgIC8qKiBDdXJ2ZSBpbmRleC4gKi9cbiAgICBpbmRleDogbnVtYmVyO1xuICAgIC8qKiBQYXJhbWV0ZXIgb24gdGhhdCBjdXJ2ZSwgMC4uMS4gKi9cbiAgICB0OiBudW1iZXI7XG59XG5cbi8qKiBDdXJ2ZSBhbmQgY3VydmUgcGFyYW1ldGVyIGF0IGEgbm9ybWFsaXplZCBkaXN0YW5jZSB0ICgwLi4xKSBhbG9uZyB0aGUgd2hvbGUgc3BsaW5lLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGN1cnZlUG9pbnRBdChjYWNoZTogU3BsaW5lQ2FjaGUsIHQ6IG51bWJlciwgb3V0OiBDdXJ2ZVBvaW50ID0geyBpbmRleDogMCwgdDogMCB9KTogQ3VydmVQb2ludCB7XG4gICAgY29uc3QgY291bnQgPSBjYWNoZS5jdXJ2ZXMubGVuZ3RoO1xuICAgIGlmICghY291bnQpIHtcbiAgICAgICAgb3V0LmluZGV4ID0gMDtcbiAgICAgICAgb3V0LnQgPSAwO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICBpZiAoY2FjaGUudG90YWwgPD0gRVBTSUxPTikge1xuICAgICAgICAvLyBEZWdlbmVyYXRlIChhbGwga25vdHMgb24gb25lIHBvaW50KTogZmFsbCBiYWNrIHRvIHVuaWZvcm0gcGFyYW1ldGVyaXphdGlvbi5cbiAgICAgICAgY29uc3QgeCA9IGNsYW1wMDEodCkgKiBjb3VudDtcbiAgICAgICAgb3V0LmluZGV4ID0gTWF0aC5taW4oTWF0aC5mbG9vcih4KSwgY291bnQgLSAxKTtcbiAgICAgICAgb3V0LnQgPSB4IC0gb3V0LmluZGV4O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICBjb25zdCBkID0gY2xhbXAwMSh0KSAqIGNhY2hlLnRvdGFsO1xuICAgIGxldCBsbyA9IDA7XG4gICAgbGV0IGhpID0gY291bnQgLSAxO1xuICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICAgIGNvbnN0IG1pZCA9IChsbyArIGhpICsgMSkgPj4gMTtcbiAgICAgICAgaWYgKGNhY2hlLnN0YXJ0c1ttaWRdIDw9IGQpIGxvID0gbWlkO1xuICAgICAgICBlbHNlIGhpID0gbWlkIC0gMTtcbiAgICB9XG4gICAgb3V0LmluZGV4ID0gbG87XG4gICAgb3V0LnQgPSByZWZpbmVUKGNhY2hlLmN1cnZlc1tsb10sIGNhY2hlLnRhYmxlc1tsb10sIGQgLSBjYWNoZS5zdGFydHNbbG9dKTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5jb25zdCBfZHYgPSB2MygpO1xuXG4vKiogRXhhY3QgYXJjIGxlbmd0aCBmcm9tIDAgdG8gdDogdGhlIHRhYmxlIHVwIHRvIHRoZSBzYW1wbGUgYmVmb3JlIHQsIGludGVncmF0ZWQgZnJvbSB0aGVyZS4gKi9cbmZ1bmN0aW9uIGV4YWN0TGVuZ3RoQXQoYzogQ3VydmUsIHRhYmxlOiBGbG9hdDY0QXJyYXksIHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbiA9IHRhYmxlLmxlbmd0aDtcbiAgICBpZiAodCA8PSAwKSByZXR1cm4gMDtcbiAgICBpZiAodCA+PSAxKSByZXR1cm4gdGFibGVbbiAtIDFdO1xuICAgIGNvbnN0IGkgPSBNYXRoLm1pbihNYXRoLmZsb29yKHQgKiAobiAtIDEpKSwgbiAtIDIpO1xuICAgIHJldHVybiB0YWJsZVtpXSArIGFyY0xlbmd0aChjLCBpIC8gKG4gLSAxKSwgdCk7XG59XG5cbi8qKiB0IGF0IGFyYyBsZW5ndGggZDogdGFibGUgbG9va3VwLCB0aGVuIE5ld3RvbiBzdGVwcyBvbiB0aGUgZXhhY3QgbGVuZ3RoLiAqL1xuZnVuY3Rpb24gcmVmaW5lVChjOiBDdXJ2ZSwgdGFibGU6IEZsb2F0NjRBcnJheSwgZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgdCA9IHRBdExlbmd0aCh0YWJsZSwgZCk7XG4gICAgY29uc3QgbiA9IHRhYmxlLmxlbmd0aDtcbiAgICBpZiAodCA8PSAwIHx8IHQgPj0gMSkgcmV0dXJuIHQ7XG4gICAgY29uc3QgaSA9IE1hdGgubWluKE1hdGguZmxvb3IodCAqIChuIC0gMSkpLCBuIC0gMik7XG4gICAgY29uc3QgbG8gPSBpIC8gKG4gLSAxKTtcbiAgICBjb25zdCBoaSA9IChpICsgMSkgLyAobiAtIDEpO1xuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMjsgaysrKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IHRhYmxlW2ldICsgYXJjTGVuZ3RoKGMsIGxvLCB0KSAtIGQ7XG4gICAgICAgIGNvbnN0IHNwZWVkID0gbGVuKGV2YWxEZXJpdmF0aXZlKF9kdiwgYywgdCkpO1xuICAgICAgICBpZiAoc3BlZWQgPCBFUFNJTE9OKSBicmVhaztcbiAgICAgICAgdCA9IE1hdGgubWluKGhpLCBNYXRoLm1heChsbywgdCAtIGVyciAvIHNwZWVkKSk7XG4gICAgfVxuICAgIHJldHVybiB0O1xufVxuXG4vKiogTm9ybWFsaXplZCBkaXN0YW5jZSAoMC4uMSkgb2YgYSBjdXJ2ZSBwb2ludC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVkVE9mKGNhY2hlOiBTcGxpbmVDYWNoZSwgaW5kZXg6IG51bWJlciwgdDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHJldHVybiAwO1xuICAgIGlmIChjYWNoZS50b3RhbCA8PSBFUFNJTE9OKSByZXR1cm4gKGluZGV4ICsgdCkgLyBjYWNoZS5jdXJ2ZXMubGVuZ3RoO1xuICAgIHJldHVybiAoY2FjaGUuc3RhcnRzW2luZGV4XSArIGV4YWN0TGVuZ3RoQXQoY2FjaGUuY3VydmVzW2luZGV4XSwgY2FjaGUudGFibGVzW2luZGV4XSwgdCkpIC8gY2FjaGUudG90YWw7XG59XG5cbi8qKiBLbm90LWluZGV4IHVuaXQgKGN1cnZlIGluZGV4ICsgY3VydmUgdCwgZS5nLiAyLjUgPSBoYWxmd2F5IGJldHdlZW4ga25vdHMgMiBhbmQgMykgdG8gbm9ybWFsaXplZCB0LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGtub3RVbml0VG9UKGNhY2hlOiBTcGxpbmVDYWNoZSwgazogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBjb3VudCA9IGNhY2hlLmN1cnZlcy5sZW5ndGg7XG4gICAgaWYgKCFjb3VudCkgcmV0dXJuIDA7XG4gICAgY29uc3QgaSA9IE1hdGgubWluKE1hdGgubWF4KE1hdGguZmxvb3IoayksIDApLCBjb3VudCAtIDEpO1xuICAgIHJldHVybiBub3JtYWxpemVkVE9mKGNhY2hlLCBpLCBjbGFtcDAxKGsgLSBpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0VG9Lbm90VW5pdChjYWNoZTogU3BsaW5lQ2FjaGUsIHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcCA9IGN1cnZlUG9pbnRBdChjYWNoZSwgdCk7XG4gICAgcmV0dXJuIHAuaW5kZXggKyBwLnQ7XG59XG5cbmNvbnN0IF9jcDogQ3VydmVQb2ludCA9IHsgaW5kZXg6IDAsIHQ6IDAgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlUG9zaXRpb248VCBleHRlbmRzIFYzPihzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIHQ6IG51bWJlciwgb3V0OiBUKTogVCB7XG4gICAgaWYgKCFzLmtub3RzLmxlbmd0aCkgcmV0dXJuIHNldChvdXQsIDAsIDAsIDApO1xuICAgIGlmIChzLmtub3RzLmxlbmd0aCA9PT0gMSB8fCAhY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIGNvcHkob3V0LCBzLmtub3RzWzBdLnBvc2l0aW9uKTtcbiAgICBjdXJ2ZVBvaW50QXQoY2FjaGUsIHQsIF9jcCk7XG4gICAgcmV0dXJuIGV2YWxQb3NpdGlvbihvdXQsIGNhY2hlLmN1cnZlc1tfY3AuaW5kZXhdLCBfY3AudCk7XG59XG5cbi8qKiBVbml0IGRpcmVjdGlvbiBvZiB0cmF2ZWwgYXQgdC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZURpcmVjdGlvbjxUIGV4dGVuZHMgVjM+KHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSwgdDogbnVtYmVyLCBvdXQ6IFQpOiBUIHtcbiAgICBpZiAocy5rbm90cy5sZW5ndGggPCAyIHx8ICFjYWNoZS5jdXJ2ZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChzLmtub3RzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIHRhbmdlbnRPdXRWZWMob3V0LCBzLmtub3RzWzBdKSk7XG4gICAgICAgIHJldHVybiBzZXQob3V0LCAwLCAwLCAxKTtcbiAgICB9XG4gICAgY3VydmVQb2ludEF0KGNhY2hlLCB0LCBfY3ApO1xuICAgIHJldHVybiBldmFsRGlyZWN0aW9uKG91dCwgY2FjaGUuY3VydmVzW19jcC5pbmRleF0sIF9jcC50KTtcbn1cblxuLyoqIFVuaXQgdXAgdmVjdG9yIGF0IHQ6IGtub3QgdXAgdmVjdG9ycyBjYXJyaWVkIGFsb25nIHRoZSBjdXJ2ZSB3aXRob3V0IHR3aXN0aW5nLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlVXA8VCBleHRlbmRzIFYzPihzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIHQ6IG51bWJlciwgb3V0OiBUKTogVCB7XG4gICAgaWYgKCFzLmtub3RzLmxlbmd0aCkgcmV0dXJuIHNldChvdXQsIDAsIDEsIDApO1xuICAgIGlmIChzLmtub3RzLmxlbmd0aCA9PT0gMSB8fCAhY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIGtub3RVcChvdXQsIHMua25vdHNbMF0pO1xuICAgIGN1cnZlUG9pbnRBdChjYWNoZSwgdCwgX2NwKTtcbiAgICByZXR1cm4gY3VydmVVcChzLCBjYWNoZSwgX2NwLmluZGV4LCBfY3AudCwgb3V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnZlVXA8VCBleHRlbmRzIFYzPihzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIGluZGV4OiBudW1iZXIsIHQ6IG51bWJlciwgb3V0OiBUKTogVCB7XG4gICAgbGV0IHRhYmxlID0gY2FjaGUudXBzW2luZGV4XTtcbiAgICBpZiAoIXRhYmxlKSB0YWJsZSA9IGNhY2hlLnVwc1tpbmRleF0gPSBidWlsZFVwVGFibGUocywgY2FjaGUuY3VydmVzW2luZGV4XSwgaW5kZXgpO1xuICAgIGNvbnN0IHggPSBjbGFtcDAxKHQpICogVVBfU0FNUExFUztcbiAgICBjb25zdCBpID0gTWF0aC5taW4oTWF0aC5mbG9vcih4KSwgVVBfU0FNUExFUyAtIDEpO1xuICAgIGNvbnN0IGYgPSB4IC0gaTtcbiAgICBjb25zdCBhID0gdjModGFibGVbaSAqIDNdLCB0YWJsZVtpICogMyArIDFdLCB0YWJsZVtpICogMyArIDJdKTtcbiAgICBjb25zdCBiID0gdjModGFibGVbaSAqIDMgKyAzXSwgdGFibGVbaSAqIDMgKyA0XSwgdGFibGVbaSAqIDMgKyA1XSk7XG4gICAgbGVycChvdXQsIGEsIGIsIGYpO1xuICAgIC8vIEtlZXAgaXQgcGVycGVuZGljdWxhciB0byB0aGUgZGlyZWN0aW9uIG9mIHRyYXZlbC5cbiAgICBjb25zdCBkaXIgPSBldmFsRGlyZWN0aW9uKHYzKCksIGNhY2hlLmN1cnZlc1tpbmRleF0sIHQpO1xuICAgIHByb2plY3RPblBsYW5lKG91dCwgb3V0LCBkaXIpO1xuICAgIGlmIChsZW5TcShvdXQpIDwgRVBTSUxPTikgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIGEpO1xuICAgIHJldHVybiBub3JtYWxpemUob3V0LCBvdXQpO1xufVxuXG4vKipcbiAqIFVwIHZlY3RvcnMgYWxvbmcgYSBjdXJ2ZTogdGhlIHN0YXJ0IGtub3QncyB1cCBjYXJyaWVkIGJ5IGEgcm90YXRpb25cbiAqIG1pbmltaXppbmcgZnJhbWUgKGRvdWJsZSByZWZsZWN0aW9uKSwgd2l0aCB0aGUgdHdpc3QgbmVlZGVkIHRvIG1lZXQgdGhlIGVuZFxuICoga25vdCdzIHVwIHNwcmVhZCBldmVubHkgb3ZlciB0aGUgY3VydmUuXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkVXBUYWJsZShzOiBTcGxpbmVMaWtlLCBjOiBDdXJ2ZSwgaW5kZXg6IG51bWJlcik6IEZsb2F0NjRBcnJheSB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGNvbnN0IGEgPSBzLmtub3RzW2luZGV4XTtcbiAgICBjb25zdCBiID0gcy5rbm90c1soaW5kZXggKyAxKSAlIG5dO1xuICAgIGNvbnN0IHRhYmxlID0gbmV3IEZsb2F0NjRBcnJheSgoVVBfU0FNUExFUyArIDEpICogMyk7XG5cbiAgICBjb25zdCBwb3M6IFYzW10gPSBbXTtcbiAgICBjb25zdCBkaXJzOiBWM1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gVVBfU0FNUExFUzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHQgPSBpIC8gVVBfU0FNUExFUztcbiAgICAgICAgcG9zLnB1c2goZXZhbFBvc2l0aW9uKHYzKCksIGMsIHQpKTtcbiAgICAgICAgZGlycy5wdXNoKGV2YWxEaXJlY3Rpb24odjMoKSwgYywgdCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHVwczogVjNbXSA9IFtdO1xuICAgIGxldCByID0gbm9ybWFsaXplKHYzKCksIHByb2plY3RPblBsYW5lKHYzKCksIGtub3RVcCh2MygpLCBhKSwgZGlyc1swXSkpO1xuICAgIGlmIChsZW5TcShyKSA8IEVQU0lMT04pIHIgPSBhbnlQZXJwZW5kaWN1bGFyKHYzKCksIGRpcnNbMF0pO1xuICAgIHVwcy5wdXNoKHIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVVBfU0FNUExFUzsgaSsrKSB7XG4gICAgICAgIC8vIERvdWJsZSByZWZsZWN0aW9uIChXYW5nIGV0IGFsLiAyMDA4KS5cbiAgICAgICAgY29uc3QgdjEgPSBzdWIodjMoKSwgcG9zW2kgKyAxXSwgcG9zW2ldKTtcbiAgICAgICAgY29uc3QgYzEgPSBkb3QodjEsIHYxKTtcbiAgICAgICAgY29uc3QgcmkgPSB1cHNbaV07XG4gICAgICAgIGNvbnN0IHRpID0gZGlyc1tpXTtcbiAgICAgICAgbGV0IHJMID0gcmk7XG4gICAgICAgIGxldCB0TCA9IHRpO1xuICAgICAgICBpZiAoYzEgPiBFUFNJTE9OICogRVBTSUxPTikge1xuICAgICAgICAgICAgckwgPSBzY2FsZUFuZEFkZCh2MygpLCByaSwgdjEsICgtMiAvIGMxKSAqIGRvdCh2MSwgcmkpKTtcbiAgICAgICAgICAgIHRMID0gc2NhbGVBbmRBZGQodjMoKSwgdGksIHYxLCAoLTIgLyBjMSkgKiBkb3QodjEsIHRpKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdjIgPSBzdWIodjMoKSwgZGlyc1tpICsgMV0sIHRMKTtcbiAgICAgICAgY29uc3QgYzIgPSBkb3QodjIsIHYyKTtcbiAgICAgICAgbGV0IG5leHQgPSByTDtcbiAgICAgICAgaWYgKGMyID4gRVBTSUxPTiAqIEVQU0lMT04pIG5leHQgPSBzY2FsZUFuZEFkZCh2MygpLCByTCwgdjIsICgtMiAvIGMyKSAqIGRvdCh2MiwgckwpKTtcbiAgICAgICAgbmV4dCA9IG5vcm1hbGl6ZSh2MygpLCBwcm9qZWN0T25QbGFuZSh2MygpLCBuZXh0LCBkaXJzW2kgKyAxXSkpO1xuICAgICAgICBpZiAobGVuU3EobmV4dCkgPCBFUFNJTE9OKSBuZXh0ID0gY29weSh2MygpLCB1cHNbaV0pO1xuICAgICAgICB1cHMucHVzaChuZXh0KTtcbiAgICB9XG5cbiAgICAvLyBUd2lzdCB0byByZWFjaCB0aGUgZW5kIGtub3QncyB1cC5cbiAgICBjb25zdCBlbmRVcCA9IG5vcm1hbGl6ZSh2MygpLCBwcm9qZWN0T25QbGFuZSh2MygpLCBrbm90VXAodjMoKSwgYiksIGRpcnNbVVBfU0FNUExFU10pKTtcbiAgICBsZXQgdHdpc3QgPSAwO1xuICAgIGlmIChsZW5TcShlbmRVcCkgPiBFUFNJTE9OKSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB1cHNbVVBfU0FNUExFU107XG4gICAgICAgIGNvbnN0IGMgPSBjcm9zcyh2MygpLCBsYXN0LCBlbmRVcCk7XG4gICAgICAgIHR3aXN0ID0gTWF0aC5hdGFuMihkb3QoYywgZGlyc1tVUF9TQU1QTEVTXSksIGRvdChsYXN0LCBlbmRVcCkpO1xuICAgIH1cbiAgICBjb25zdCBxID0gcTQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBVUF9TQU1QTEVTOyBpKyspIHtcbiAgICAgICAgbGV0IHUgPSB1cHNbaV07XG4gICAgICAgIGlmICh0d2lzdCAhPT0gMCkge1xuICAgICAgICAgICAgcUZyb21BeGlzQW5nbGUocSwgZGlyc1tpXSwgKHR3aXN0ICogaSkgLyBVUF9TQU1QTEVTKTtcbiAgICAgICAgICAgIHUgPSBxUm90YXRlKHYzKCksIHEsIHUpO1xuICAgICAgICB9XG4gICAgICAgIHRhYmxlW2kgKiAzXSA9IHUueDtcbiAgICAgICAgdGFibGVbaSAqIDMgKyAxXSA9IHUueTtcbiAgICAgICAgdGFibGVbaSAqIDMgKyAyXSA9IHUuejtcbiAgICB9XG4gICAgcmV0dXJuIHRhYmxlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5lYXJlc3RSZXN1bHQge1xuICAgIC8qKiBOb3JtYWxpemVkIGRpc3RhbmNlIGFsb25nIHRoZSBzcGxpbmUgKDAuLjEpLiAqL1xuICAgIHQ6IG51bWJlcjtcbiAgICBjdXJ2ZTogbnVtYmVyO1xuICAgIGN1cnZlVDogbnVtYmVyO1xuICAgIHBvc2l0aW9uOiBWMztcbiAgICBkaXN0YW5jZTogbnVtYmVyO1xufVxuXG4vKiogQ2xvc2VzdCBwb2ludCBvbiB0aGUgc3BsaW5lIHRvIGBwYCAoc3BsaW5lIHNwYWNlKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuZWFyZXN0UG9pbnQoczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCBwOiBWMyk6IE5lYXJlc3RSZXN1bHQge1xuICAgIGNvbnN0IHJlczogTmVhcmVzdFJlc3VsdCA9IHsgdDogMCwgY3VydmU6IDAsIGN1cnZlVDogMCwgcG9zaXRpb246IHYzKCksIGRpc3RhbmNlOiBJbmZpbml0eSB9O1xuICAgIGlmICghcy5rbm90cy5sZW5ndGgpIHJldHVybiByZXM7XG4gICAgaWYgKCFjYWNoZS5jdXJ2ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvcHkocmVzLnBvc2l0aW9uLCBzLmtub3RzWzBdLnBvc2l0aW9uKTtcbiAgICAgICAgcmVzLmRpc3RhbmNlID0gZGlzdChwLCByZXMucG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBsZXQgYmVzdCA9IEluZmluaXR5O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FjaGUuY3VydmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHIgPSBuZWFyZXN0VChjYWNoZS5jdXJ2ZXNbaV0sIHAsIDE2LCAxMCk7XG4gICAgICAgIGlmIChyLmRpc3RTcSA8IGJlc3QpIHtcbiAgICAgICAgICAgIGJlc3QgPSByLmRpc3RTcTtcbiAgICAgICAgICAgIHJlcy5jdXJ2ZSA9IGk7XG4gICAgICAgICAgICByZXMuY3VydmVUID0gci50O1xuICAgICAgICB9XG4gICAgfVxuICAgIGV2YWxQb3NpdGlvbihyZXMucG9zaXRpb24sIGNhY2hlLmN1cnZlc1tyZXMuY3VydmVdLCByZXMuY3VydmVUKTtcbiAgICByZXMuZGlzdGFuY2UgPSBNYXRoLnNxcnQoYmVzdCk7XG4gICAgcmVzLnQgPSBub3JtYWxpemVkVE9mKGNhY2hlLCByZXMuY3VydmUsIHJlcy5jdXJ2ZVQpO1xuICAgIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogTW92ZXMgYGRpc3RhbmNlYCBhbG9uZyB0aGUgc3BsaW5lIGZyb20gbm9ybWFsaXplZCBgZnJvbVRgIChuZWdhdGl2ZSBnb2VzXG4gKiBiYWNrKS4gUmV0dXJucyB0aGUgcmVzdWx0aW5nIG5vcm1hbGl6ZWQgdCAoY2xhbXBlZCBvbiBvcGVuIHNwbGluZXMsXG4gKiB3cmFwcGVkIG9uIGNsb3NlZCBvbmVzKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRBdERpc3RhbmNlRnJvbShzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIGZyb21UOiBudW1iZXIsIGRpc3RhbmNlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChjYWNoZS50b3RhbCA8PSBFUFNJTE9OKSByZXR1cm4gY2xhbXAwMShmcm9tVCk7XG4gICAgY29uc3QgdCA9IGZyb21UICsgZGlzdGFuY2UgLyBjYWNoZS50b3RhbDtcbiAgICByZXR1cm4gcy5jbG9zZWQgPyB3cmFwKHQsIDEpIDogY2xhbXAwMSh0KTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVkaXQgb3BzXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRLbm90KHM6IFNwbGluZUxpa2UsIGluZGV4OiBudW1iZXIsIGs6IEtub3RMaWtlKTogdm9pZCB7XG4gICAgcy5rbm90cy5zcGxpY2UoaW5kZXgsIDAsIGspO1xuICAgIHJlZnJlc2hBcm91bmQocywgaW5kZXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlS25vdChzOiBTcGxpbmVMaWtlLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgcy5rbm90cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBpZiAoIW4pIHJldHVybjtcbiAgICBjb25zdCBuZXh0ID0gTWF0aC5taW4oaW5kZXgsIG4gLSAxKTtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIHByZXZJbmRleChuZXh0LCBuLCBzLmNsb3NlZCkpO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgbmV4dCk7XG59XG5cbi8qKlxuICogSW5zZXJ0cyBhIGtub3Qgb24gY3VydmUgYGN1cnZlSW5kZXhgIGF0IHBhcmFtZXRlciB0IHdpdGhvdXQgY2hhbmdpbmcgdGhlXG4gKiBzaGFwZSAoZGUgQ2FzdGVsamF1IHNwbGl0KS4gUmV0dXJucyB0aGUgbmV3IGtub3QncyBpbmRleC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydE9uQ3VydmUoczogU3BsaW5lTGlrZSwgY3VydmVJbmRleDogbnVtYmVyLCB0OiBudW1iZXIsIGZhY3Rvcnk6IEZhY3RvcnkpOiBudW1iZXIge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBjb25zdCBpYSA9IGN1cnZlSW5kZXg7XG4gICAgY29uc3QgaWIgPSAoY3VydmVJbmRleCArIDEpICUgbjtcbiAgICBjb25zdCBhID0gcy5rbm90c1tpYV07XG4gICAgY29uc3QgYiA9IHMua25vdHNbaWJdO1xuICAgIGNvbnN0IGMgPSBnZXRDdXJ2ZShzLCBjdXJ2ZUluZGV4KTtcbiAgICBjb25zdCBsZWZ0ID0gY3VydmUoKTtcbiAgICBjb25zdCByaWdodCA9IGN1cnZlKCk7XG4gICAgc3BsaXQoYywgdCwgbGVmdCwgcmlnaHQpO1xuXG4gICAgY29uc3QgayA9IGZhY3Rvcnkua25vdCgpO1xuICAgIGNvcHkoay5wb3NpdGlvbiwgbGVmdC5wMyk7XG4gICAgay50ZW5zaW9uID0gREVGQVVMVF9URU5TSU9OO1xuXG4gICAgY29uc3QgYm90aEF1dG8gPSBhLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGggJiYgYi5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoO1xuICAgIGNvbnN0IGJvdGhMaW5lYXIgPSBhLm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhciAmJiBiLm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhcjtcblxuICAgIC8vIFRoZSBuZXcga25vdCdzIHVwIGJsZW5kcyBiZXR3ZWVuIGl0cyBuZWlnaGJvcnMnLlxuICAgIGNvbnN0IHVwID0ga25vdFVwKHYzKCksIGEpO1xuICAgIGNvbnN0IHVwQiA9IGtub3RVcCh2MygpLCBiKTtcbiAgICBsZXJwKHVwLCB1cCwgdXBCLCB0KTtcbiAgICBjb25zdCBvdXREaXIgPSBzdWIodjMoKSwgcmlnaHQucDEsIHJpZ2h0LnAwKTtcbiAgICBrbm90Um90YXRpb24oay5yb3RhdGlvbiwgbGVuU3Eob3V0RGlyKSA+IEVQU0lMT04gPyBvdXREaXIgOiBzdWIodjMoKSwgcmlnaHQucDAsIGxlZnQucDIpLCB1cCk7XG5cbiAgICBpZiAoYm90aEF1dG8pIHtcbiAgICAgICAgay5tb2RlID0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aDtcbiAgICB9IGVsc2UgaWYgKGJvdGhMaW5lYXIpIHtcbiAgICAgICAgay5tb2RlID0gVGFuZ2VudE1vZGUuTGluZWFyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEtlZXAgdGhlIGV4YWN0IHNoYXBlOiBzaG9ydGVuIHRoZSBuZWlnaGJvcnMnIGhhbmRsZXMsIHRoZSBuZXcga25vdCBnZXRzIHRoZSBzcGxpdCBoYW5kbGVzLlxuICAgICAgICBpZiAoYS5tb2RlID09PSBUYW5nZW50TW9kZS5NaXJyb3JlZCkgYS5tb2RlID0gVGFuZ2VudE1vZGUuQ29udGludW91cztcbiAgICAgICAgaWYgKGIubW9kZSA9PT0gVGFuZ2VudE1vZGUuTWlycm9yZWQpIGIubW9kZSA9IFRhbmdlbnRNb2RlLkNvbnRpbnVvdXM7XG4gICAgICAgIGlmICh0YW5nZW50c0VkaXRhYmxlKGEubW9kZSkpIHtcbiAgICAgICAgICAgIHFSb3RhdGUoYS50YW5nZW50T3V0LCBxSW52ZXJ0KHE0KCksIGEucm90YXRpb24pLCBzdWIodjMoKSwgbGVmdC5wMSwgbGVmdC5wMCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YW5nZW50c0VkaXRhYmxlKGIubW9kZSkpIHtcbiAgICAgICAgICAgIHFSb3RhdGUoYi50YW5nZW50SW4sIHFJbnZlcnQocTQoKSwgYi5yb3RhdGlvbiksIHN1Yih2MygpLCByaWdodC5wMiwgcmlnaHQucDMpKTtcbiAgICAgICAgfVxuICAgICAgICBrLm1vZGUgPSBUYW5nZW50TW9kZS5Db250aW51b3VzO1xuICAgICAgICBjb25zdCBpbnYgPSBxSW52ZXJ0KHE0KCksIGsucm90YXRpb24pO1xuICAgICAgICBxUm90YXRlKGsudGFuZ2VudEluLCBpbnYsIHN1Yih2MygpLCBsZWZ0LnAyLCBsZWZ0LnAzKSk7XG4gICAgICAgIHFSb3RhdGUoay50YW5nZW50T3V0LCBpbnYsIHN1Yih2MygpLCByaWdodC5wMSwgcmlnaHQucDApKTtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSBpYSArIDE7XG4gICAgcy5rbm90cy5zcGxpY2UoaW5kZXgsIDAsIGspO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaW5kZXgpO1xuICAgIGNvbnN0IG0gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBjb25zdCBwID0gcHJldkluZGV4KGluZGV4LCBtLCBzLmNsb3NlZCk7XG4gICAgY29uc3QgcSA9IG5leHRJbmRleChpbmRleCwgbSwgcy5jbG9zZWQpO1xuICAgIGlmIChzLmtub3RzW3BdLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpIGFwcGx5VGFuZ2VudE1vZGUocywgcCk7XG4gICAgaWYgKHMua25vdHNbcV0ubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCkgYXBwbHlUYW5nZW50TW9kZShzLCBxKTtcbiAgICByZXR1cm4gaW5kZXg7XG59XG5cbmNvbnN0IFkxODAgPSBxNCgwLCAxLCAwLCAwKTtcblxuLyoqIFJldmVyc2VzIHRoZSBkaXJlY3Rpb24gb2YgdHJhdmVsOyB0aGUgc2hhcGUgc3RheXMgdGhlIHNhbWUuICovXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZUZsb3coczogU3BsaW5lTGlrZSk6IHZvaWQge1xuICAgIHMua25vdHMucmV2ZXJzZSgpO1xuICAgIGZvciAoY29uc3QgayBvZiBzLmtub3RzKSB7XG4gICAgICAgIC8vIFR1cm4gdGhlIGtub3QgYXJvdW5kIGl0cyB1cCBheGlzOyBpbiBhbmQgb3V0IHN3YXAgcGxhY2VzLlxuICAgICAgICBjb25zdCBvbGRJbiA9IHFSb3RhdGUodjMoKSwgWTE4MCwgay50YW5nZW50SW4pO1xuICAgICAgICBjb25zdCBvbGRPdXQgPSBxUm90YXRlKHYzKCksIFkxODAsIGsudGFuZ2VudE91dCk7XG4gICAgICAgIGNvcHkoay50YW5nZW50SW4sIG9sZE91dCk7XG4gICAgICAgIGNvcHkoay50YW5nZW50T3V0LCBvbGRJbik7XG4gICAgICAgIHFNdWwoay5yb3RhdGlvbiwgay5yb3RhdGlvbiwgWTE4MCk7XG4gICAgfVxuICAgIHJlZnJlc2hBbGwocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDbG9zZWQoczogU3BsaW5lTGlrZSwgY2xvc2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgcy5jbG9zZWQgPSBjbG9zZWQ7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmICghbikgcmV0dXJuO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgMCk7XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBuIC0gMSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY29udGFpbmVyIG9wc1xuXG5leHBvcnQgaW50ZXJmYWNlIEtub3RSZWYge1xuICAgIHNwbGluZTogbnVtYmVyO1xuICAgIGtub3Q6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhbWVSZWYoYTogS25vdFJlZiwgYjogS25vdFJlZik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhLnNwbGluZSA9PT0gYi5zcGxpbmUgJiYgYS5rbm90ID09PSBiLmtub3Q7XG59XG5cbmZ1bmN0aW9uIGdyb3VwT2YoYzogQ29udGFpbmVyTGlrZSwgcjogS25vdFJlZik6IExpbmtMaWtlIHwgbnVsbCB7XG4gICAgZm9yIChjb25zdCBnIG9mIGMubGlua3MpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgZy5rbm90cy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgaWYgKGcua25vdHNbaV0gPT09IHIuc3BsaW5lICYmIGcua25vdHNbaSArIDFdID09PSByLmtub3QpIHJldHVybiBnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG4vKiogS25vdHMgbGlua2VkIHRvIGByYCAoZXhjbHVkaW5nIHIgaXRzZWxmKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5rZWRLbm90cyhjOiBDb250YWluZXJMaWtlLCByOiBLbm90UmVmKTogS25vdFJlZltdIHtcbiAgICBjb25zdCBnID0gZ3JvdXBPZihjLCByKTtcbiAgICBpZiAoIWcpIHJldHVybiBbXTtcbiAgICBjb25zdCByZXM6IEtub3RSZWZbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpICsgMSA8IGcua25vdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgY29uc3QgbyA9IHsgc3BsaW5lOiBnLmtub3RzW2ldLCBrbm90OiBnLmtub3RzW2kgKyAxXSB9O1xuICAgICAgICBpZiAoIXNhbWVSZWYobywgcikpIHJlcy5wdXNoKG8pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaW5rZWQoYzogQ29udGFpbmVyTGlrZSwgcjogS25vdFJlZik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWdyb3VwT2YoYywgcik7XG59XG5cbi8qKiBMaW5rcyBhbGwgZ2l2ZW4ga25vdHMgdG9nZXRoZXIgKG1lcmdpbmcgdGhlaXIgZXhpc3RpbmcgZ3JvdXBzKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5rS25vdHMoYzogQ29udGFpbmVyTGlrZSwgcmVmczogS25vdFJlZltdLCBmYWN0b3J5OiBGYWN0b3J5KTogdm9pZCB7XG4gICAgaWYgKHJlZnMubGVuZ3RoIDwgMikgcmV0dXJuO1xuICAgIGNvbnN0IG1lbWJlcnM6IEtub3RSZWZbXSA9IFtdO1xuICAgIGNvbnN0IGFkZCA9IChyOiBLbm90UmVmKSA9PiB7XG4gICAgICAgIGlmICghbWVtYmVycy5zb21lKChtKSA9PiBzYW1lUmVmKG0sIHIpKSkgbWVtYmVycy5wdXNoKHIpO1xuICAgIH07XG4gICAgZm9yIChjb25zdCByIG9mIHJlZnMpIHtcbiAgICAgICAgY29uc3QgZyA9IGdyb3VwT2YoYywgcik7XG4gICAgICAgIGlmIChnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBnLmtub3RzLmxlbmd0aDsgaSArPSAyKSBhZGQoeyBzcGxpbmU6IGcua25vdHNbaV0sIGtub3Q6IGcua25vdHNbaSArIDFdIH0pO1xuICAgICAgICAgICAgYy5saW5rcy5zcGxpY2UoYy5saW5rcy5pbmRleE9mKGcpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBhZGQocik7XG4gICAgfVxuICAgIGNvbnN0IGcgPSBmYWN0b3J5LmxpbmsoKTtcbiAgICBnLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgZm9yIChjb25zdCBtIG9mIG1lbWJlcnMpIGcua25vdHMucHVzaChtLnNwbGluZSwgbS5rbm90KTtcbiAgICBjLmxpbmtzLnB1c2goZyk7XG4gICAgLy8gTGlua2VkIGtub3RzIHNoYXJlIHRoZSBmaXJzdCBrbm90J3MgcG9zaXRpb24uXG4gICAgY29uc3QgcCA9IGMuc3BsaW5lc1tyZWZzWzBdLnNwbGluZV0ua25vdHNbcmVmc1swXS5rbm90XS5wb3NpdGlvbjtcbiAgICBmb3IgKGNvbnN0IG0gb2YgbWVtYmVycykge1xuICAgICAgICBpZiAoc2FtZVJlZihtLCByZWZzWzBdKSkgY29udGludWU7XG4gICAgICAgIHNldEtub3RQb3NpdGlvbihjLnNwbGluZXNbbS5zcGxpbmVdLCBtLmtub3QsIHApO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVubGlua0tub3RzKGM6IENvbnRhaW5lckxpa2UsIHJlZnM6IEtub3RSZWZbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgciBvZiByZWZzKSB7XG4gICAgICAgIGNvbnN0IGcgPSBncm91cE9mKGMsIHIpO1xuICAgICAgICBpZiAoIWcpIGNvbnRpbnVlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBnLmtub3RzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICBpZiAoZy5rbm90c1tpXSA9PT0gci5zcGxpbmUgJiYgZy5rbm90c1tpICsgMV0gPT09IHIua25vdCkge1xuICAgICAgICAgICAgICAgIGcua25vdHMuc3BsaWNlKGksIDIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChnLmtub3RzLmxlbmd0aCA8IDQpIGMubGlua3Muc3BsaWNlKGMubGlua3MuaW5kZXhPZihnKSwgMSk7XG4gICAgfVxufVxuXG4vKiogTW92ZXMgZXZlcnkga25vdCBsaW5rZWQgdG8gYHJgIG9udG8gcidzIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN5bmNMaW5rZWQoYzogQ29udGFpbmVyTGlrZSwgcjogS25vdFJlZik6IHZvaWQge1xuICAgIGNvbnN0IHAgPSBjLnNwbGluZXNbci5zcGxpbmVdLmtub3RzW3Iua25vdF0ucG9zaXRpb247XG4gICAgZm9yIChjb25zdCBvIG9mIGxpbmtlZEtub3RzKGMsIHIpKSB7XG4gICAgICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbby5zcGxpbmVdO1xuICAgICAgICBpZiAoIXMgfHwgIXMua25vdHNbby5rbm90XSkgY29udGludWU7XG4gICAgICAgIHNldEtub3RQb3NpdGlvbihzLCBvLmtub3QsIHApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmV3cml0ZUxpbmtzKGM6IENvbnRhaW5lckxpa2UsIG1hcDogKHI6IEtub3RSZWYpID0+IEtub3RSZWYgfCBudWxsKTogdm9pZCB7XG4gICAgZm9yIChsZXQgZ2kgPSBjLmxpbmtzLmxlbmd0aCAtIDE7IGdpID49IDA7IGdpLS0pIHtcbiAgICAgICAgY29uc3QgZyA9IGMubGlua3NbZ2ldO1xuICAgICAgICBjb25zdCBuZXh0OiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBnLmtub3RzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICBjb25zdCByID0gbWFwKHsgc3BsaW5lOiBnLmtub3RzW2ldLCBrbm90OiBnLmtub3RzW2kgKyAxXSB9KTtcbiAgICAgICAgICAgIGlmIChyICYmICFuZXh0LnNvbWUoKF8sIGopID0+IGogJSAyID09PSAwICYmIG5leHRbal0gPT09IHIuc3BsaW5lICYmIG5leHRbaiArIDFdID09PSByLmtub3QpKSBuZXh0LnB1c2goci5zcGxpbmUsIHIua25vdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHQubGVuZ3RoIDwgNCkgYy5saW5rcy5zcGxpY2UoZ2ksIDEpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGcua25vdHMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGcua25vdHMucHVzaCguLi5uZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqIFVwZGF0ZXMgbGlua3MgYWZ0ZXIgYSBrbm90IHdhcyBpbnNlcnRlZCBhdCAoc3BsaW5lLCBrbm90KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5rc09uS25vdEluc2VydGVkKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyLCBrbm90OiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXdyaXRlTGlua3MoYywgKHIpID0+IChyLnNwbGluZSA9PT0gc3BsaW5lICYmIHIua25vdCA+PSBrbm90ID8geyBzcGxpbmUsIGtub3Q6IHIua25vdCArIDEgfSA6IHIpKTtcbn1cblxuLyoqIFVwZGF0ZXMgbGlua3MgYWZ0ZXIgdGhlIGtub3QgYXQgKHNwbGluZSwga25vdCkgd2FzIHJlbW92ZWQuICovXG5leHBvcnQgZnVuY3Rpb24gbGlua3NPbktub3RSZW1vdmVkKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyLCBrbm90OiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXdyaXRlTGlua3MoYywgKHIpID0+IHtcbiAgICAgICAgaWYgKHIuc3BsaW5lICE9PSBzcGxpbmUpIHJldHVybiByO1xuICAgICAgICBpZiAoci5rbm90ID09PSBrbm90KSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHIua25vdCA+IGtub3QgPyB7IHNwbGluZSwga25vdDogci5rbm90IC0gMSB9IDogcjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmtzT25TcGxpbmVSZW1vdmVkKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV3cml0ZUxpbmtzKGMsIChyKSA9PiB7XG4gICAgICAgIGlmIChyLnNwbGluZSA9PT0gc3BsaW5lKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHIuc3BsaW5lID4gc3BsaW5lID8geyBzcGxpbmU6IHIuc3BsaW5lIC0gMSwga25vdDogci5rbm90IH0gOiByO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlua3NPblJldmVyc2VkKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyLCBjb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV3cml0ZUxpbmtzKGMsIChyKSA9PiAoci5zcGxpbmUgPT09IHNwbGluZSA/IHsgc3BsaW5lLCBrbm90OiBjb3VudCAtIDEgLSByLmtub3QgfSA6IHIpKTtcbn1cblxuLyoqIENvbnRhaW5lci1sZXZlbCBpbnNlcnQgdGhhdCBrZWVwcyBsaW5rcyB2YWxpZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluZXJJbnNlcnRLbm90KGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyLCBpbmRleDogbnVtYmVyLCBrOiBLbm90TGlrZSk6IHZvaWQge1xuICAgIGxpbmtzT25Lbm90SW5zZXJ0ZWQoYywgc3BsaW5lLCBpbmRleCk7XG4gICAgaW5zZXJ0S25vdChjLnNwbGluZXNbc3BsaW5lXSwgaW5kZXgsIGspO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVySW5zZXJ0T25DdXJ2ZShjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlciwgY3VydmVJbmRleDogbnVtYmVyLCB0OiBudW1iZXIsIGZhY3Rvcnk6IEZhY3RvcnkpOiBudW1iZXIge1xuICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbc3BsaW5lXTtcbiAgICBjb25zdCBpbmRleCA9IGN1cnZlSW5kZXggKyAxO1xuICAgIGxpbmtzT25Lbm90SW5zZXJ0ZWQoYywgc3BsaW5lLCBpbmRleCk7XG4gICAgcmV0dXJuIGluc2VydE9uQ3VydmUocywgY3VydmVJbmRleCwgdCwgZmFjdG9yeSk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBrbm90cyAocmVmcyBtYXkgc3BhbiBzcGxpbmVzKS4gU3BsaW5lcyBsZWZ0IGVtcHR5IGFyZSByZW1vdmVkLFxuICogZXhjZXB0IHRoZSBjb250YWluZXIga2VlcHMgYXQgbGVhc3Qgb25lIHNwbGluZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5lclJlbW92ZUtub3RzKGM6IENvbnRhaW5lckxpa2UsIHJlZnM6IEtub3RSZWZbXSk6IHZvaWQge1xuICAgIGNvbnN0IHNvcnRlZCA9IFsuLi5yZWZzXS5zb3J0KChhLCBiKSA9PiAoYS5zcGxpbmUgLSBiLnNwbGluZSkgfHwgKGIua25vdCAtIGEua25vdCkpO1xuICAgIGZvciAoY29uc3QgciBvZiBzb3J0ZWQpIHtcbiAgICAgICAgY29uc3QgcyA9IGMuc3BsaW5lc1tyLnNwbGluZV07XG4gICAgICAgIGlmICghcyB8fCByLmtub3QgPj0gcy5rbm90cy5sZW5ndGgpIGNvbnRpbnVlO1xuICAgICAgICByZW1vdmVLbm90KHMsIHIua25vdCk7XG4gICAgICAgIGxpbmtzT25Lbm90UmVtb3ZlZChjLCByLnNwbGluZSwgci5rbm90KTtcbiAgICAgICAgaWYgKHMua25vdHMubGVuZ3RoIDwgMyAmJiBzLmNsb3NlZCkgcy5jbG9zZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IGMuc3BsaW5lcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoYy5zcGxpbmVzW2ldLmtub3RzLmxlbmd0aCA9PT0gMCAmJiBjLnNwbGluZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgYy5zcGxpbmVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGxpbmtzT25TcGxpbmVSZW1vdmVkKGMsIGkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVyUmV2ZXJzZShjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbc3BsaW5lXTtcbiAgICBsaW5rc09uUmV2ZXJzZWQoYywgc3BsaW5lLCBzLmtub3RzLmxlbmd0aCk7XG4gICAgcmV2ZXJzZUZsb3cocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluZXJSZW1vdmVTcGxpbmUoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjLnNwbGluZXMuc3BsaWNlKHNwbGluZSwgMSk7XG4gICAgbGlua3NPblNwbGluZVJlbW92ZWQoYywgc3BsaW5lKTtcbn1cblxuZnVuY3Rpb24gY2xvbmVLbm90KGs6IEtub3RMaWtlLCBmYWN0b3J5OiBGYWN0b3J5KTogS25vdExpa2Uge1xuICAgIHJldHVybiBjb3B5S25vdChmYWN0b3J5Lmtub3QoKSwgayk7XG59XG5cbi8qKlxuICogU3BsaXRzIGEgc3BsaW5lIGF0IGEga25vdCAoVW5pdHkncyBTcGxpdCBLbm90KTogYW4gb3BlbiBzcGxpbmUgYmVjb21lcyB0d29cbiAqIHNwbGluZXMgc2hhcmluZyBhIGNvcHkgb2YgdGhlIGtub3QsIGEgY2xvc2VkIHNwbGluZSBvcGVucyBhdCB0aGUga25vdC5cbiAqIFRoZSB0d28gY29waWVzIGFyZSBsaW5rZWQuIFJldHVybnMgdGhlIG5ldyBjb3B5J3MgcmVmLCBvciBudWxsIGlmIHRoZSBrbm90XG4gKiBpcyBhbiBlbmQgb2YgYW4gb3BlbiBzcGxpbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdEtub3QoYzogQ29udGFpbmVyTGlrZSwgcjogS25vdFJlZiwgZmFjdG9yeTogRmFjdG9yeSk6IEtub3RSZWYgfCBudWxsIHtcbiAgICBjb25zdCBzID0gYy5zcGxpbmVzW3Iuc3BsaW5lXTtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgaWYgKHMuY2xvc2VkKSB7XG4gICAgICAgIC8vIFJvdGF0ZSBzbyB0aGUga25vdCBpcyBmaXJzdCwgdGhlbiBkdXBsaWNhdGUgaXQgYXQgdGhlIGVuZC5cbiAgICAgICAgY29uc3Qgb3JkZXI6IEtub3RMaWtlW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIG9yZGVyLnB1c2gocy5rbm90c1soci5rbm90ICsgaSkgJSBuXSk7XG4gICAgICAgIHJld3JpdGVMaW5rcyhjLCAobykgPT4gKG8uc3BsaW5lID09PSByLnNwbGluZSA/IHsgc3BsaW5lOiBvLnNwbGluZSwga25vdDogd3JhcChvLmtub3QgLSByLmtub3QsIG4pIH0gOiBvKSk7XG4gICAgICAgIHMua25vdHMubGVuZ3RoID0gMDtcbiAgICAgICAgcy5rbm90cy5wdXNoKC4uLm9yZGVyLCBjbG9uZUtub3Qob3JkZXJbMF0sIGZhY3RvcnkpKTtcbiAgICAgICAgcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgcmVmcmVzaEFsbChzKTtcbiAgICAgICAgY29uc3QgZmlyc3QgPSB7IHNwbGluZTogci5zcGxpbmUsIGtub3Q6IDAgfTtcbiAgICAgICAgY29uc3QgbGFzdCA9IHsgc3BsaW5lOiByLnNwbGluZSwga25vdDogbiB9O1xuICAgICAgICBsaW5rS25vdHMoYywgW2ZpcnN0LCBsYXN0XSwgZmFjdG9yeSk7XG4gICAgICAgIHJldHVybiBsYXN0O1xuICAgIH1cbiAgICBpZiAoci5rbm90IDw9IDAgfHwgci5rbm90ID49IG4gLSAxKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB0YWlsID0gZmFjdG9yeS5zcGxpbmUoKTtcbiAgICB0YWlsLmNsb3NlZCA9IGZhbHNlO1xuICAgIHRhaWwua25vdHMubGVuZ3RoID0gMDtcbiAgICB0YWlsLmtub3RzLnB1c2goY2xvbmVLbm90KHMua25vdHNbci5rbm90XSwgZmFjdG9yeSksIC4uLnMua25vdHMuc2xpY2Uoci5rbm90ICsgMSkpO1xuICAgIGNvbnN0IG5ld1NwbGluZSA9IGMuc3BsaW5lcy5sZW5ndGg7XG4gICAgLy8gTGlua3Mgb24ga25vdHMgdGhhdCBtb3ZlZCB0byB0aGUgdGFpbCBmb2xsb3cgdGhlbS5cbiAgICByZXdyaXRlTGlua3MoYywgKG8pID0+IChvLnNwbGluZSA9PT0gci5zcGxpbmUgJiYgby5rbm90ID4gci5rbm90ID8geyBzcGxpbmU6IG5ld1NwbGluZSwga25vdDogby5rbm90IC0gci5rbm90IH0gOiBvKSk7XG4gICAgcy5rbm90cy5sZW5ndGggPSByLmtub3QgKyAxO1xuICAgIGMuc3BsaW5lcy5wdXNoKHRhaWwpO1xuICAgIHJlZnJlc2hBbGwocyk7XG4gICAgcmVmcmVzaEFsbCh0YWlsKTtcbiAgICBjb25zdCBjb3B5UmVmID0geyBzcGxpbmU6IG5ld1NwbGluZSwga25vdDogMCB9O1xuICAgIGxpbmtLbm90cyhjLCBbciwgY29weVJlZl0sIGZhY3RvcnkpO1xuICAgIHJldHVybiBjb3B5UmVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbmRLbm90KHM6IFNwbGluZUxpa2UsIGtub3Q6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhcy5jbG9zZWQgJiYgcy5rbm90cy5sZW5ndGggPiAwICYmIChrbm90ID09PSAwIHx8IGtub3QgPT09IHMua25vdHMubGVuZ3RoIC0gMSk7XG59XG5cbi8qKlxuICogSm9pbnMgdHdvIGVuZCBrbm90cyAoVW5pdHkncyBKb2luIEtub3RzKS4gRW5kcyBvZiB0aGUgc2FtZSBzcGxpbmUgY2xvc2UgaXQ7XG4gKiBlbmRzIG9mIGRpZmZlcmVudCBzcGxpbmVzIG1lcmdlIHRoZSBzZWNvbmQgc3BsaW5lIGludG8gdGhlIGZpcnN0LCB0aGVcbiAqIGpvaW5lZCBrbm90IHRha2luZyBgYWAncyBwb3NpdGlvbi4gUmV0dXJucyB0aGUgam9pbmVkIGtub3QsIG9yIG51bGwgaWYgdGhlXG4gKiBrbm90cyBjYW4ndCBiZSBqb2luZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb2luS25vdHMoYzogQ29udGFpbmVyTGlrZSwgYTogS25vdFJlZiwgYjogS25vdFJlZiwgZmFjdG9yeTogRmFjdG9yeSk6IEtub3RSZWYgfCBudWxsIHtcbiAgICBjb25zdCBzYSA9IGMuc3BsaW5lc1thLnNwbGluZV07XG4gICAgY29uc3Qgc2IgPSBjLnNwbGluZXNbYi5zcGxpbmVdO1xuICAgIGlmICghc2EgfHwgIXNiIHx8ICFpc0VuZEtub3Qoc2EsIGEua25vdCkgfHwgIWlzRW5kS25vdChzYiwgYi5rbm90KSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGEuc3BsaW5lID09PSBiLnNwbGluZSkge1xuICAgICAgICBpZiAoYS5rbm90ID09PSBiLmtub3QgfHwgc2Eua25vdHMubGVuZ3RoIDwgMykgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIERyb3AgdGhlIGR1cGxpY2F0ZSBlbmQgaWYgYm90aCBlbmRzIHNpdCBvbiB0aGUgc2FtZSBwb2ludC5cbiAgICAgICAgY29uc3QgZmlyc3QgPSBzYS5rbm90c1swXTtcbiAgICAgICAgY29uc3QgbGFzdCA9IHNhLmtub3RzW3NhLmtub3RzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoZGlzdFNxKGZpcnN0LnBvc2l0aW9uLCBsYXN0LnBvc2l0aW9uKSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIGNvcHkoZmlyc3QudGFuZ2VudEluLCBsYXN0LnRhbmdlbnRJbik7XG4gICAgICAgICAgICBsaW5rc09uS25vdFJlbW92ZWQoYywgYS5zcGxpbmUsIHNhLmtub3RzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgc2Eua25vdHMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0Q2xvc2VkKHNhLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHsgc3BsaW5lOiBhLnNwbGluZSwga25vdDogYS5rbm90ID09PSAwID8gMCA6IE1hdGgubWluKGEua25vdCwgc2Eua25vdHMubGVuZ3RoIC0gMSkgfTtcbiAgICB9XG4gICAgLy8gT3JpZW50IGJvdGggc28gdGhhdCBhIGlzIHRoZSBsYXN0IGtub3Qgb2YgQSBhbmQgYiB0aGUgZmlyc3Qga25vdCBvZiBCLlxuICAgIGlmIChhLmtub3QgPT09IDApIHtcbiAgICAgICAgY29udGFpbmVyUmV2ZXJzZShjLCBhLnNwbGluZSk7XG4gICAgICAgIGEgPSB7IHNwbGluZTogYS5zcGxpbmUsIGtub3Q6IHNhLmtub3RzLmxlbmd0aCAtIDEgfTtcbiAgICB9XG4gICAgaWYgKGIua25vdCAhPT0gMCkge1xuICAgICAgICBjb250YWluZXJSZXZlcnNlKGMsIGIuc3BsaW5lKTtcbiAgICAgICAgYiA9IHsgc3BsaW5lOiBiLnNwbGluZSwga25vdDogMCB9O1xuICAgIH1cbiAgICBjb25zdCBrYSA9IHNhLmtub3RzW2Eua25vdF07XG4gICAgY29uc3Qga2IgPSBzYi5rbm90c1swXTtcbiAgICAvLyBUaGUgam9pbmVkIGtub3Qga2VlcHMgQSdzIHBvc2l0aW9uIGFuZCBpbiB0YW5nZW50LCBhbmQgQidzIG91dCB0YW5nZW50LlxuICAgIGNvbnN0IG91dFdvcmxkID0gdGFuZ2VudE91dFZlYyh2MygpLCBrYik7XG4gICAgaWYgKGthLm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhciAmJiBrYi5tb2RlICE9PSBUYW5nZW50TW9kZS5MaW5lYXIpIGthLm1vZGUgPSBUYW5nZW50TW9kZS5Ccm9rZW47XG4gICAgaWYgKHRhbmdlbnRzRWRpdGFibGUoa2EubW9kZSkpIHtcbiAgICAgICAga2EubW9kZSA9IFRhbmdlbnRNb2RlLkJyb2tlbjtcbiAgICAgICAgcVJvdGF0ZShrYS50YW5nZW50T3V0LCBxSW52ZXJ0KHE0KCksIGthLnJvdGF0aW9uKSwgb3V0V29ybGQpO1xuICAgIH1cbiAgICBjb25zdCBvZmZzZXQgPSBzYS5rbm90cy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGJJbmRleCA9IGIuc3BsaW5lO1xuICAgIC8vIEIncyBrbm90cyAoYWZ0ZXIgaXRzIGZpcnN0KSBtb3ZlIHRvIEE7IGxpbmtzIGZvbGxvdy5cbiAgICByZXdyaXRlTGlua3MoYywgKG8pID0+IHtcbiAgICAgICAgaWYgKG8uc3BsaW5lICE9PSBiSW5kZXgpIHJldHVybiBvO1xuICAgICAgICBpZiAoby5rbm90ID09PSAwKSByZXR1cm4geyBzcGxpbmU6IGEuc3BsaW5lLCBrbm90OiBhLmtub3QgfTtcbiAgICAgICAgcmV0dXJuIHsgc3BsaW5lOiBhLnNwbGluZSwga25vdDogb2Zmc2V0ICsgby5rbm90IH07XG4gICAgfSk7XG4gICAgc2Eua25vdHMucHVzaCguLi5zYi5rbm90cy5zbGljZSgxKSk7XG4gICAgYy5zcGxpbmVzLnNwbGljZShiSW5kZXgsIDEpO1xuICAgIHJld3JpdGVMaW5rcyhjLCAobykgPT4gKG8uc3BsaW5lID4gYkluZGV4ID8geyBzcGxpbmU6IG8uc3BsaW5lIC0gMSwga25vdDogby5rbm90IH0gOiBvKSk7XG4gICAgY29uc3QgYVNwbGluZSA9IGEuc3BsaW5lID4gYkluZGV4ID8gYS5zcGxpbmUgLSAxIDogYS5zcGxpbmU7XG4gICAgcmVmcmVzaEFsbChjLnNwbGluZXNbYVNwbGluZV0pO1xuICAgIHJldHVybiB7IHNwbGluZTogYVNwbGluZSwga25vdDogYS5rbm90IH07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2hhcGVzXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcGVPcHRpb25zIHtcbiAgICAvKiogU2l6ZSAoc3F1YXJlIHNpZGUsIGNpcmNsZSByYWRpdXMuLi4pLiAqL1xuICAgIHNpemU6IG51bWJlcjtcbiAgICAvKiogUG9seWdvbiAvIHN0YXIgcG9pbnRzLiAqL1xuICAgIHNpZGVzPzogbnVtYmVyO1xuICAgIC8qKiBIZWxpeCB0dXJucy4gKi9cbiAgICB0dXJucz86IG51bWJlcjtcbiAgICAvKiogSGVsaXggaGVpZ2h0LiAqL1xuICAgIGhlaWdodD86IG51bWJlcjtcbiAgICAvKiogTWFrZSB0aGUgc2hhcGUgaW4gdGhlIFhZIHBsYW5lICgyRCkgaW5zdGVhZCBvZiBYWiAoM0QpLiAqL1xuICAgIHBsYW5lMkQ/OiBib29sZWFuO1xufVxuXG4vKiogS25vdCBwb3NpdGlvbnMgKyBtb2RlcyBmb3IgYSB0ZW1wbGF0ZSBzaGFwZSAoVW5pdHkncyBTcGxpbmUgPiBTcXVhcmUgLyBDaXJjbGUgLyAuLi4pLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoYXBlS25vdHMoa2luZDogc3RyaW5nLCBvOiBTaGFwZU9wdGlvbnMpOiB7IHBvaW50czogVjNbXTsgbW9kZTogbnVtYmVyOyBjbG9zZWQ6IGJvb2xlYW47IHRhbmdlbnRTY2FsZT86IG51bWJlciB9IHtcbiAgICBjb25zdCByID0gby5zaXplO1xuICAgIGNvbnN0IHB0czogVjNbXSA9IFtdO1xuICAgIGNvbnN0IGZsYXQgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIsIGggPSAwKTogVjMgPT4gKG8ucGxhbmUyRCA/IHYzKHgsIHksIGgpIDogdjMoeCwgaCwgLXkpKTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgICAgY2FzZSAnc3F1YXJlJzpcbiAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoLXIsIC1yKSwgZmxhdCgtciwgciksIGZsYXQociwgciksIGZsYXQociwgLXIpKTtcbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5MaW5lYXIsIGNsb3NlZDogdHJ1ZSB9O1xuICAgICAgICBjYXNlICdyb3VuZGVkLXNxdWFyZSc6IHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSByICogMC43NTtcbiAgICAgICAgICAgIGNvbnN0IGUgPSByO1xuICAgICAgICAgICAgcHRzLnB1c2goZmxhdCgtYywgLWUpLCBmbGF0KC1lLCAtYyksIGZsYXQoLWUsIGMpLCBmbGF0KC1jLCBlKSwgZmxhdChjLCBlKSwgZmxhdChlLCBjKSwgZmxhdChlLCAtYyksIGZsYXQoYywgLWUpKTtcbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5BdXRvU21vb3RoLCBjbG9zZWQ6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdjaXJjbGUnOiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSAoaSAvIDQpICogTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICAgICAgcHRzLnB1c2goZmxhdChNYXRoLmNvcyhhKSAqIHIsIE1hdGguc2luKGEpICogcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gNCBNaXJyb3JlZCBrbm90cyB3aXRoIGhhbmRsZSBsZW5ndGggMC41NTIzIHIgbWFrZSBhIG5lYXItcGVyZmVjdCBjaXJjbGUuXG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuTWlycm9yZWQsIGNsb3NlZDogdHJ1ZSwgdGFuZ2VudFNjYWxlOiAwLjU1MjMgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdwb2x5Z29uJzoge1xuICAgICAgICAgICAgY29uc3QgbiA9IE1hdGgubWF4KDMsIE1hdGgucm91bmQoby5zaWRlcyA/PyA2KSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSAoaSAvIG4pICogTWF0aC5QSSAqIDIgKyBNYXRoLlBJIC8gMjtcbiAgICAgICAgICAgICAgICBwdHMucHVzaChmbGF0KE1hdGguY29zKGEpICogciwgTWF0aC5zaW4oYSkgKiByKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuTGluZWFyLCBjbG9zZWQ6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdzdGFyJzoge1xuICAgICAgICAgICAgY29uc3QgbiA9IE1hdGgubWF4KDMsIE1hdGgucm91bmQoby5zaWRlcyA/PyA1KSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG4gKiAyOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKGkgLyAobiAqIDIpKSAqIE1hdGguUEkgKiAyICsgTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICAgICAgY29uc3QgcnIgPSBpICUgMiA9PT0gMCA/IHIgOiByICogMC40NTtcbiAgICAgICAgICAgICAgICBwdHMucHVzaChmbGF0KE1hdGguY29zKGEpICogcnIsIE1hdGguc2luKGEpICogcnIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5MaW5lYXIsIGNsb3NlZDogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2hlbGl4Jzoge1xuICAgICAgICAgICAgY29uc3QgdHVybnMgPSBNYXRoLm1heCgwLjI1LCBvLnR1cm5zID8/IDMpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gby5oZWlnaHQgPz8gciAqIDI7XG4gICAgICAgICAgICBjb25zdCBwZXJUdXJuID0gODtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBNYXRoLnJvdW5kKHR1cm5zICogcGVyVHVybik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKGkgLyBwZXJUdXJuKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoTWF0aC5jb3MoYSkgKiByLCBNYXRoLnNpbihhKSAqIHIsIChpIC8gbikgKiBoZWlnaHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5BdXRvU21vb3RoLCBjbG9zZWQ6IGZhbHNlIH07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnbGluZSc6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBwdHMucHVzaChmbGF0KC1yLCAwKSwgZmxhdChyLCAwKSk7XG4gICAgICAgICAgICByZXR1cm4geyBwb2ludHM6IHB0cywgbW9kZTogVGFuZ2VudE1vZGUuQXV0b1Ntb290aCwgY2xvc2VkOiBmYWxzZSB9O1xuICAgIH1cbn1cblxuLyoqIEZpbGxzIGEgc3BsaW5lIHdpdGggYSBzaGFwZSBmcm9tIHNoYXBlS25vdHMuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTaGFwZShzOiBTcGxpbmVMaWtlLCBraW5kOiBzdHJpbmcsIG86IFNoYXBlT3B0aW9ucywgZmFjdG9yeTogRmFjdG9yeSk6IHZvaWQge1xuICAgIGNvbnN0IHNoYXBlID0gc2hhcGVLbm90cyhraW5kLCBvKTtcbiAgICBzLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgcy5jbG9zZWQgPSBzaGFwZS5jbG9zZWQ7XG4gICAgY29uc3Qgbm9ybWFsID0gby5wbGFuZTJEID8gdjMoMCwgMCwgMSkgOiB2MygwLCAxLCAwKTtcbiAgICBjb25zdCBuID0gc2hhcGUucG9pbnRzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICBjb25zdCBrID0gZmFjdG9yeS5rbm90KCk7XG4gICAgICAgIGNvcHkoay5wb3NpdGlvbiwgc2hhcGUucG9pbnRzW2ldKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAwKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgMCk7XG4gICAgICAgIHFJZGVudGl0eShrLnJvdGF0aW9uKTtcbiAgICAgICAgay5tb2RlID0gc2hhcGUubW9kZTtcbiAgICAgICAgay50ZW5zaW9uID0gREVGQVVMVF9URU5TSU9OO1xuICAgICAgICBzLmtub3RzLnB1c2goayk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGsgPSBzLmtub3RzW2ldO1xuICAgICAgICBjb25zdCBwcmV2ID0gcy5rbm90c1twcmV2SW5kZXgoaSwgbiwgcy5jbG9zZWQpXS5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgbmV4dCA9IHMua25vdHNbbmV4dEluZGV4KGksIG4sIHMuY2xvc2VkKV0ucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGRpciA9IHN1Yih2MygpLCBuZXh0LCBwcmV2KTtcbiAgICAgICAgaWYgKGxlblNxKGRpcikgPCBFUFNJTE9OKSBzdWIoZGlyLCBuZXh0LCBrLnBvc2l0aW9uKTtcbiAgICAgICAga25vdFJvdGF0aW9uKGsucm90YXRpb24sIGRpciwgbm9ybWFsKTtcbiAgICAgICAgaWYgKHNoYXBlLnRhbmdlbnRTY2FsZSkge1xuICAgICAgICAgICAgY29uc3QgbCA9IHNoYXBlLnRhbmdlbnRTY2FsZSAqIG8uc2l6ZTtcbiAgICAgICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWwpO1xuICAgICAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVmcmVzaEFsbChzKTtcbn1cblxuZXhwb3J0IHsgVVAgYXMgS05PVF9VUCwgRk9SV0FSRCBhcyBLTk9UX0ZPUldBUkQgfTtcbiIsICJpbXBvcnQgeyBfZGVjb3JhdG9yLCBkaXJlY3RvciwgVmVjMyB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEJlemllcktub3QgfSBmcm9tICcuL0Jlemllcktub3QnO1xuaW1wb3J0IHtcbiAgICBTcGxpbmVDYWNoZSwgU3BsaW5lTGlrZSwgVGFuZ2VudE1vZGUsIERFRkFVTFRfVEVOU0lPTiwgRmFjdG9yeSxcbiAgICBlbnN1cmVDYWNoZSwgY3VydmVDb3VudCwgZ2V0Q3VydmUsIGV2YWx1YXRlUG9zaXRpb24sIGV2YWx1YXRlRGlyZWN0aW9uLCBldmFsdWF0ZVVwLCBjdXJ2ZVBvaW50QXQsXG4gICAgbmVhcmVzdFBvaW50LCB0QXREaXN0YW5jZUZyb20sIGtub3RVbml0VG9ULCB0VG9Lbm90VW5pdCwgbm9ybWFsaXplZFRPZixcbiAgICBpbnNlcnRLbm90LCByZW1vdmVLbm90LCBpbnNlcnRPbkN1cnZlLCByZXZlcnNlRmxvdywgc2V0Q2xvc2VkLCBzZXRUYW5nZW50TW9kZSwgc2V0VGVuc2lvbixcbiAgICBzZXRLbm90UG9zaXRpb24sIHJlZnJlc2hBbGwsIHJlZnJlc2hBcm91bmQsIGFwcGx5VGFuZ2VudE1vZGUsXG59IGZyb20gJy4uL2NvcmUvc3BsaW5lLWNvcmUnO1xuaW1wb3J0IHsgQ3VydmUsIGN1cnZlLCBldmFsRGVyaXZhdGl2ZSB9IGZyb20gJy4uL2NvcmUvY3VydmUnO1xuaW1wb3J0IHsgS25vdExpbmsgfSBmcm9tICcuL0tub3RMaW5rJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuLyoqIENyZWF0ZXMgZW5naW5lIG9iamVjdHMgZm9yIHRoZSBjb3JlJ3MgZWRpdCBvcGVyYXRpb25zLiAqL1xuZXhwb3J0IGNvbnN0IHNwbGluZUZhY3Rvcnk6IEZhY3RvcnkgPSB7XG4gICAga25vdDogKCkgPT4gbmV3IEJlemllcktub3QoKSxcbiAgICBzcGxpbmU6ICgpID0+IG5ldyBTcGxpbmUoKSxcbiAgICBsaW5rOiAoKSA9PiBuZXcgS25vdExpbmsoKSxcbn07XG5cbi8qKiBXaGVyZSBhIGRpc3RhbmNlIGFsb25nIHRoZSBzcGxpbmUgaXMgbWVhc3VyZWQgZnJvbSAoVW5pdHkncyBQYXRoSW5kZXhVbml0KS4gKi9cbmV4cG9ydCBlbnVtIFBhdGhJbmRleFVuaXQge1xuICAgIC8qKiAwLi4xIG92ZXIgdGhlIHNwbGluZSdzIGxlbmd0aC4gKi9cbiAgICBOb3JtYWxpemVkID0gMCxcbiAgICAvKiogRGlzdGFuY2UgaW4gdGhlIHNwbGluZSdzIGxvY2FsIHVuaXRzLiAqL1xuICAgIERpc3RhbmNlID0gMSxcbiAgICAvKiogS25vdCBpbmRleDogMi41IGlzIGhhbGZ3YXkgYmV0d2VlbiBrbm90cyAyIGFuZCAzLiAqL1xuICAgIEtub3QgPSAyLFxufVxuXG4vKipcbiAqIEEgQmV6aWVyIHNwbGluZTogYSBsaXN0IG9mIGtub3RzLCBvcGVuIG9yIGNsb3NlZC5cbiAqXG4gKiBQb3NpdGlvbnMgYXJlIGluIHRoZSBsb2NhbCBzcGFjZSBvZiB0aGUgU3BsaW5lQ29udGFpbmVyIHRoYXQgb3ducyB0aGVcbiAqIHNwbGluZS4gYHRgIGFyZ3VtZW50cyBhcmUgbm9ybWFsaXplZCBkaXN0YW5jZXM6IDAgaXMgdGhlIGZpcnN0IGtub3QgYW5kIDFcbiAqIHRoZSBlbmQsIGFuZCB0ID0gMC41IGlzIGhhbGZ3YXkgYWxvbmcgdGhlIHNwbGluZSdzIGxlbmd0aC5cbiAqXG4gKiBVc2UgdGhlIG1ldGhvZHMgdG8gZWRpdCBrbm90cyBzbyB0aGUgc3BsaW5lIHVwZGF0ZXMgaXRzIHRhbmdlbnRzIGFuZFxuICogY2FjaGVkIGxlbmd0aHMuIEFmdGVyIGNoYW5naW5nIGtub3QgZmllbGRzIGRpcmVjdGx5LCBjYWxsIG1hcmtEaXJ0eSgpLlxuICovXG5AY2NjbGFzcygnc3BsaW5lcy5TcGxpbmUnKVxuZXhwb3J0IGNsYXNzIFNwbGluZSBpbXBsZW1lbnRzIFNwbGluZUxpa2Uge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtCZXppZXJLbm90XSwgdG9vbHRpcDogJ1RoZSBrbm90cyBvZiB0aGUgc3BsaW5lLicgfSlcbiAgICBrbm90czogQmV6aWVyS25vdFtdID0gW107XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnQ29ubmVjdHMgdGhlIGxhc3Qga25vdCBiYWNrIHRvIHRoZSBmaXJzdC4nIH0pXG4gICAgY2xvc2VkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9jYWNoZSA9IG5ldyBTcGxpbmVDYWNoZSgpO1xuICAgIHByaXZhdGUgX2NoZWNrZWRGcmFtZSA9IC0xO1xuICAgIHByaXZhdGUgX3ZlcnNpb24gPSAwO1xuXG4gICAgLyoqIEJ1bXBlZCBieSBldmVyeSBlZGl0IG1hZGUgdGhyb3VnaCB0aGUgU3BsaW5lIEFQSSAoYW5kIG1hcmtEaXJ0eSkuICovXG4gICAgZ2V0IHZlcnNpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnNpb247XG4gICAgfVxuXG4gICAgZ2V0IGNvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmtub3RzLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKiogTnVtYmVyIG9mIGN1cnZlcyAoc2VnbWVudHMgYmV0d2VlbiBrbm90cykuICovXG4gICAgZ2V0IGN1cnZlQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGN1cnZlQ291bnQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqIExlbmd0aHMgYW5kIGxvb2t1cCB0YWJsZXMsIHJlYnVpbHQgd2hlbiB0aGUga25vdHMgY2hhbmdlIChjaGVja2VkIG9uY2UgcGVyIGZyYW1lKS4gKi9cbiAgICBnZXQgY2FjaGUoKTogU3BsaW5lQ2FjaGUge1xuICAgICAgICBjb25zdCBmcmFtZSA9IGRpcmVjdG9yLmdldFRvdGFsRnJhbWVzKCk7XG4gICAgICAgIGlmIChmcmFtZSAhPT0gdGhpcy5fY2hlY2tlZEZyYW1lIHx8IHRoaXMuX2NoZWNrZWRGcmFtZSA8IDApIHtcbiAgICAgICAgICAgIGVuc3VyZUNhY2hlKHRoaXMsIHRoaXMuX2NhY2hlKTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrZWRGcmFtZSA9IGZyYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZTtcbiAgICB9XG5cbiAgICAvKiogQ2FsbCBhZnRlciBjaGFuZ2luZyBrbm90cyBkaXJlY3RseSAobm90IHRocm91Z2ggdGhlIFNwbGluZSBtZXRob2RzKS4gKi9cbiAgICBtYXJrRGlydHkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NoZWNrZWRGcmFtZSA9IC0xO1xuICAgICAgICB0aGlzLl92ZXJzaW9uKys7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGtub3RzXG5cbiAgICBnZXRLbm90KGluZGV4OiBudW1iZXIpOiBCZXppZXJLbm90IHtcbiAgICAgICAgcmV0dXJuIHRoaXMua25vdHNbaW5kZXhdO1xuICAgIH1cblxuICAgIC8qKiBSZXBsYWNlcyBhIGtub3QgKGNvcGllZCkgYW5kIHVwZGF0ZXMgdGhlIHRhbmdlbnRzIHRoYXQgZGVwZW5kIG9uIGl0LiAqL1xuICAgIHNldEtub3QoaW5kZXg6IG51bWJlciwga25vdDogQmV6aWVyS25vdCk6IHZvaWQge1xuICAgICAgICBjb25zdCBrID0gdGhpcy5rbm90c1tpbmRleF07XG4gICAgICAgIGsucG9zaXRpb24uc2V0KGtub3QucG9zaXRpb24pO1xuICAgICAgICBrLnRhbmdlbnRJbi5zZXQoa25vdC50YW5nZW50SW4pO1xuICAgICAgICBrLnRhbmdlbnRPdXQuc2V0KGtub3QudGFuZ2VudE91dCk7XG4gICAgICAgIGsucm90YXRpb24uc2V0KGtub3Qucm90YXRpb24pO1xuICAgICAgICBrLm1vZGUgPSBrbm90Lm1vZGU7XG4gICAgICAgIGsudGVuc2lvbiA9IGtub3QudGVuc2lvbjtcbiAgICAgICAgcmVmcmVzaEFyb3VuZCh0aGlzLCBpbmRleCk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgLyoqIEFkZHMgYSBrbm90IGF0IHRoZSBlbmQuIFdpdGggYSBwb3NpdGlvbiwgY3JlYXRlcyBhIGtub3Qgd2l0aCB0aGUgZ2l2ZW4gbW9kZS4gKi9cbiAgICBhZGQoa25vdE9yUG9zaXRpb246IEJlemllcktub3QgfCBSZWFkb25seTxWZWMzPiwgbW9kZTogVGFuZ2VudE1vZGUgPSBUYW5nZW50TW9kZS5BdXRvU21vb3RoKTogQmV6aWVyS25vdCB7XG4gICAgICAgIHJldHVybiB0aGlzLmluc2VydCh0aGlzLmtub3RzLmxlbmd0aCwga25vdE9yUG9zaXRpb24sIG1vZGUpO1xuICAgIH1cblxuICAgIGluc2VydChpbmRleDogbnVtYmVyLCBrbm90T3JQb3NpdGlvbjogQmV6aWVyS25vdCB8IFJlYWRvbmx5PFZlYzM+LCBtb2RlOiBUYW5nZW50TW9kZSA9IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpOiBCZXppZXJLbm90IHtcbiAgICAgICAgbGV0IGs6IEJlemllcktub3Q7XG4gICAgICAgIGlmIChrbm90T3JQb3NpdGlvbiBpbnN0YW5jZW9mIEJlemllcktub3QpIHtcbiAgICAgICAgICAgIGsgPSBrbm90T3JQb3NpdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGsgPSBuZXcgQmV6aWVyS25vdChrbm90T3JQb3NpdGlvbiBhcyBWZWMzKTtcbiAgICAgICAgICAgIGsubW9kZSA9IG1vZGU7XG4gICAgICAgICAgICBrLnRlbnNpb24gPSBERUZBVUxUX1RFTlNJT047XG4gICAgICAgIH1cbiAgICAgICAgaW5zZXJ0S25vdCh0aGlzLCBpbmRleCwgayk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgICAgIHJldHVybiBrO1xuICAgIH1cblxuICAgIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgcmVtb3ZlS25vdCh0aGlzLCBpbmRleCk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMua25vdHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICBzZXRLbm90UG9zaXRpb24oaW5kZXg6IG51bWJlciwgcG9zaXRpb246IFJlYWRvbmx5PFZlYzM+KTogdm9pZCB7XG4gICAgICAgIHNldEtub3RQb3NpdGlvbih0aGlzLCBpbmRleCwgcG9zaXRpb24pO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIGdldFRhbmdlbnRNb2RlKGluZGV4OiBudW1iZXIpOiBUYW5nZW50TW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtub3RzW2luZGV4XS5tb2RlO1xuICAgIH1cblxuICAgIHNldFRhbmdlbnRNb2RlKGluZGV4OiBudW1iZXIsIG1vZGU6IFRhbmdlbnRNb2RlKTogdm9pZCB7XG4gICAgICAgIHNldFRhbmdlbnRNb2RlKHRoaXMsIGluZGV4LCBtb2RlKTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICAvKiogU2V0cyB0aGUgbW9kZSBvZiBldmVyeSBrbm90LiAqL1xuICAgIHNldFRhbmdlbnRNb2RlQWxsKG1vZGU6IFRhbmdlbnRNb2RlKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5rbm90cy5sZW5ndGg7IGkrKykgc2V0VGFuZ2VudE1vZGUodGhpcywgaSwgbW9kZSk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgc2V0QXV0b1Ntb290aFRlbnNpb24oaW5kZXg6IG51bWJlciwgdGVuc2lvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHNldFRlbnNpb24odGhpcywgaW5kZXgsIHRlbnNpb24pO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIC8qKiBJbnNlcnRzIGEga25vdCBvbiBhIGN1cnZlIHdpdGhvdXQgY2hhbmdpbmcgdGhlIHNoYXBlLiBSZXR1cm5zIGl0cyBpbmRleC4gKi9cbiAgICBpbnNlcnRPbkN1cnZlKGN1cnZlSW5kZXg6IG51bWJlciwgY3VydmVUOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpID0gaW5zZXJ0T25DdXJ2ZSh0aGlzLCBjdXJ2ZUluZGV4LCBjdXJ2ZVQsIHNwbGluZUZhY3RvcnkpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG5cbiAgICBzZXRDbG9zZWQoY2xvc2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHNldENsb3NlZCh0aGlzLCBjbG9zZWQpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIC8qKiBSZXZlcnNlcyB0aGUgZGlyZWN0aW9uIG9mIHRyYXZlbCAodGhlIHNoYXBlIGlzIHVuY2hhbmdlZCkuICovXG4gICAgcmV2ZXJzZSgpOiB2b2lkIHtcbiAgICAgICAgcmV2ZXJzZUZsb3codGhpcyk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgLyoqIFJlLWFwcGxpZXMgZXZlcnkga25vdCdzIHRhbmdlbnQgbW9kZS4gKi9cbiAgICByZWZyZXNoKCk6IHZvaWQge1xuICAgICAgICByZWZyZXNoQWxsKHRoaXMpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIC8qKiBSZS1hcHBsaWVzIHRoZSB0YW5nZW50IG1vZGUgb2Ygb25lIGtub3QuICovXG4gICAgcmVmcmVzaEtub3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBhcHBseVRhbmdlbnRNb2RlKHRoaXMsIGluZGV4KTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcXVlcmllc1xuXG4gICAgLyoqIFRvdGFsIGxlbmd0aCBpbiBsb2NhbCB1bml0cy4gKi9cbiAgICBnZXRMZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUudG90YWw7XG4gICAgfVxuXG4gICAgZ2V0Q3VydmVMZW5ndGgoY3VydmVJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUubGVuZ3Roc1tjdXJ2ZUluZGV4XSA/PyAwO1xuICAgIH1cblxuICAgIC8qKiBDb250cm9sIHBvaW50cyBvZiBhIGN1cnZlIChsb2NhbCBzcGFjZSkuICovXG4gICAgZ2V0Q3VydmUoY3VydmVJbmRleDogbnVtYmVyLCBvdXQ6IEN1cnZlID0gY3VydmUoKSk6IEN1cnZlIHtcbiAgICAgICAgcmV0dXJuIGdldEN1cnZlKHRoaXMsIGN1cnZlSW5kZXgsIG91dCk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGVQb3NpdGlvbih0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRlUG9zaXRpb24odGhpcywgdGhpcy5jYWNoZSwgdCwgb3V0KTtcbiAgICB9XG5cbiAgICAvKiogRGVyaXZhdGl2ZSBhdCB0IChkaXJlY3Rpb24gdGltZXMgc3BlZWQsIGxpa2UgVW5pdHkncyBFdmFsdWF0ZVRhbmdlbnQpLiAqL1xuICAgIGV2YWx1YXRlVGFuZ2VudCh0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgICAgICBpZiAoIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHJldHVybiBldmFsdWF0ZURpcmVjdGlvbih0aGlzLCBjYWNoZSwgdCwgb3V0KTtcbiAgICAgICAgY29uc3QgcCA9IGN1cnZlUG9pbnRBdChjYWNoZSwgdCk7XG4gICAgICAgIGV2YWxEZXJpdmF0aXZlKG91dCwgY2FjaGUuY3VydmVzW3AuaW5kZXhdLCBwLnQpO1xuICAgICAgICBpZiAob3V0Lmxlbmd0aFNxcigpIDwgMWUtMTIpIGV2YWx1YXRlRGlyZWN0aW9uKHRoaXMsIGNhY2hlLCB0LCBvdXQpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKiBVbml0IGRpcmVjdGlvbiBvZiB0cmF2ZWwgYXQgdC4gKi9cbiAgICBldmFsdWF0ZURpcmVjdGlvbih0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRlRGlyZWN0aW9uKHRoaXMsIHRoaXMuY2FjaGUsIHQsIG91dCk7XG4gICAgfVxuXG4gICAgLyoqIFVuaXQgdXAgdmVjdG9yIGF0IHQsIGludGVycG9sYXRlZCBiZXR3ZWVuIHRoZSBrbm90cycgdXAgdmVjdG9ycyB3aXRob3V0IHR3aXN0aW5nLiAqL1xuICAgIGV2YWx1YXRlVXBWZWN0b3IodDogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBldmFsdWF0ZVVwKHRoaXMsIHRoaXMuY2FjaGUsIHQsIG91dCk7XG4gICAgfVxuXG4gICAgLyoqIENsb3Nlc3QgcG9pbnQgdG8gYHBvaW50YCAobG9jYWwgc3BhY2UpLiBSZXR1cm5zIGl0cyB0IGFuZCBwb3NpdGlvbi4gKi9cbiAgICBnZXROZWFyZXN0UG9pbnQocG9pbnQ6IFJlYWRvbmx5PFZlYzM+LCBvdXRQb3NpdGlvbiA9IG5ldyBWZWMzKCkpOiB7IHQ6IG51bWJlcjsgcG9zaXRpb246IFZlYzM7IGRpc3RhbmNlOiBudW1iZXIgfSB7XG4gICAgICAgIGNvbnN0IHIgPSBuZWFyZXN0UG9pbnQodGhpcywgdGhpcy5jYWNoZSwgcG9pbnQpO1xuICAgICAgICBvdXRQb3NpdGlvbi5zZXQoci5wb3NpdGlvbi54LCByLnBvc2l0aW9uLnksIHIucG9zaXRpb24ueik7XG4gICAgICAgIHJldHVybiB7IHQ6IHIudCwgcG9zaXRpb246IG91dFBvc2l0aW9uLCBkaXN0YW5jZTogci5kaXN0YW5jZSB9O1xuICAgIH1cblxuICAgIC8qKiBUaGUgdCByZWFjaGVkIGFmdGVyIG1vdmluZyBgZGlzdGFuY2VgIChsb2NhbCB1bml0cywgbWF5IGJlIG5lZ2F0aXZlKSBmcm9tIGBmcm9tVGAuICovXG4gICAgZ2V0VEF0RGlzdGFuY2UoZnJvbVQ6IG51bWJlciwgZGlzdGFuY2U6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0QXREaXN0YW5jZUZyb20odGhpcywgdGhpcy5jYWNoZSwgZnJvbVQsIGRpc3RhbmNlKTtcbiAgICB9XG5cbiAgICAvKiogQ29udmVydHMgYSBwb3NpdGlvbiBhbG9uZyB0aGUgc3BsaW5lIGJldHdlZW4gdW5pdHMgKFVuaXR5J3MgQ29udmVydEluZGV4VW5pdCkuICovXG4gICAgY29udmVydEluZGV4VW5pdCh2YWx1ZTogbnVtYmVyLCBmcm9tOiBQYXRoSW5kZXhVbml0LCB0bzogUGF0aEluZGV4VW5pdCk6IG51bWJlciB7XG4gICAgICAgIGlmIChmcm9tID09PSB0bykgcmV0dXJuIHZhbHVlO1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgICAgIGxldCB0OiBudW1iZXI7XG4gICAgICAgIGlmIChmcm9tID09PSBQYXRoSW5kZXhVbml0Lk5vcm1hbGl6ZWQpIHQgPSB2YWx1ZTtcbiAgICAgICAgZWxzZSBpZiAoZnJvbSA9PT0gUGF0aEluZGV4VW5pdC5EaXN0YW5jZSkgdCA9IGNhY2hlLnRvdGFsID4gMCA/IHZhbHVlIC8gY2FjaGUudG90YWwgOiAwO1xuICAgICAgICBlbHNlIHQgPSBrbm90VW5pdFRvVChjYWNoZSwgdmFsdWUpO1xuICAgICAgICBpZiAodG8gPT09IFBhdGhJbmRleFVuaXQuTm9ybWFsaXplZCkgcmV0dXJuIHQ7XG4gICAgICAgIGlmICh0byA9PT0gUGF0aEluZGV4VW5pdC5EaXN0YW5jZSkgcmV0dXJuIHQgKiBjYWNoZS50b3RhbDtcbiAgICAgICAgcmV0dXJuIHRUb0tub3RVbml0KGNhY2hlLCB0KTtcbiAgICB9XG5cbiAgICAvKiogTm9ybWFsaXplZCB0IG9mIGEga25vdC4gKi9cbiAgICBrbm90VChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgICAgICBpZiAoIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHJldHVybiAwO1xuICAgICAgICBpZiAoaW5kZXggPj0gY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVkVE9mKGNhY2hlLCBpbmRleCwgMCk7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IF9kZWNvcmF0b3IsIENDSW50ZWdlciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IExpbmtMaWtlIH0gZnJvbSAnLi4vY29yZS9zcGxpbmUtY29yZSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbi8qKlxuICogQSBncm91cCBvZiBsaW5rZWQga25vdHM6IGtub3RzIHRoYXQgYWx3YXlzIHNoYXJlIG9uZSBwb3NpdGlvbiwgcG9zc2libHlcbiAqIG9uIGRpZmZlcmVudCBzcGxpbmVzIG9mIHRoZSBzYW1lIGNvbnRhaW5lci4gU3RvcmVkIGFzIGZsYXR0ZW5lZFxuICogKHNwbGluZUluZGV4LCBrbm90SW5kZXgpIHBhaXJzLlxuICovXG5AY2NjbGFzcygnc3BsaW5lcy5Lbm90TGluaycpXG5leHBvcnQgY2xhc3MgS25vdExpbmsgaW1wbGVtZW50cyBMaW5rTGlrZSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogW0NDSW50ZWdlcl0gfSlcbiAgICBrbm90czogbnVtYmVyW10gPSBbXTtcbn1cbiIsICJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb21wb25lbnQsIE1hdDQsIFZlYzMsIFF1YXQgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFRElUT1IgfSBmcm9tICdjYy9lbnYnO1xuaW1wb3J0IHsgU3BsaW5lLCBzcGxpbmVGYWN0b3J5LCBQYXRoSW5kZXhVbml0IH0gZnJvbSAnLi9TcGxpbmUnO1xuaW1wb3J0IHsgS25vdExpbmsgfSBmcm9tICcuL0tub3RMaW5rJztcbmltcG9ydCB7IEJlemllcktub3QsIFRhbmdlbnRNb2RlIH0gZnJvbSAnLi9CZXppZXJLbm90JztcbmltcG9ydCB7XG4gICAgQ29udGFpbmVyTGlrZSwgS25vdFJlZiwgbGlua0tub3RzLCB1bmxpbmtLbm90cywgbGlua2VkS25vdHMsIHN5bmNMaW5rZWQsIGlzTGlua2VkLFxuICAgIGNvbnRhaW5lclJlbW92ZVNwbGluZSwgY29udGFpbmVySW5zZXJ0S25vdCwgY29udGFpbmVyUmVtb3ZlS25vdHMsIGNvbnRhaW5lclJldmVyc2UsXG4gICAgc3BsaXRLbm90LCBqb2luS25vdHMsIG5lYXJlc3RQb2ludCwgZmluZ2VycHJpbnQsIHJlZnJlc2hBbGwsXG59IGZyb20gJy4uL2NvcmUvc3BsaW5lLWNvcmUnO1xuaW1wb3J0IHsgYXJjTGVuZ3RoLCBjdXJ2ZSwgQ3VydmUgfSBmcm9tICcuLi9jb3JlL2N1cnZlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgZXhlY3V0ZUluRWRpdE1vZGUsIG1lbnUsIGRpc2FsbG93TXVsdGlwbGUgfSA9IF9kZWNvcmF0b3I7XG5cbmNvbnN0IF9tID0gbmV3IE1hdDQoKTtcbmNvbnN0IF92ID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9jOiBDdXJ2ZSA9IGN1cnZlKCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BsaW5lU2FtcGxlIHtcbiAgICBwb3NpdGlvbjogVmVjMztcbiAgICAvKiogVW5pdCBkaXJlY3Rpb24gb2YgdHJhdmVsLiAqL1xuICAgIHRhbmdlbnQ6IFZlYzM7XG4gICAgLyoqIFVuaXQgdXAgdmVjdG9yLiAqL1xuICAgIHVwOiBWZWMzO1xufVxuXG4vKipcbiAqIEhvbGRzIG9uZSBvciBtb3JlIHNwbGluZXMgaW4gdGhlIG5vZGUncyBsb2NhbCBzcGFjZSAoVW5pdHkncyBTcGxpbmVDb250YWluZXIpLlxuICpcbiAqIEV2YWx1YXRlIG1ldGhvZHMgd29yayBpbiB3b3JsZCBzcGFjZTsgdGhlIFNwbGluZSBvYmplY3RzIHRoZW1zZWx2ZXMgd29ya1xuICogaW4gbG9jYWwgc3BhY2UuIGB0YCBpcyBhIG5vcm1hbGl6ZWQgZGlzdGFuY2U6IDAgPSBzdGFydCwgMSA9IGVuZC5cbiAqXG4gKiBFbWl0cyBTcGxpbmVDb250YWluZXIuRXZlbnRUeXBlLkNIQU5HRUQgb24gaXRzIG5vZGUgd2hlbiBhIHNwbGluZSBjaGFuZ2VzXG4gKiAoaW4gdGhlIGVkaXRvciBhbHdheXM7IGF0IHJ1bnRpbWUgd2hlbiBzb21lb25lIGxpc3RlbnMpLlxuICovXG5AY2NjbGFzcygnU3BsaW5lQ29udGFpbmVyJylcbkBleGVjdXRlSW5FZGl0TW9kZVxuQGRpc2FsbG93TXVsdGlwbGVcbkBtZW51KCdTcGxpbmVzL1NwbGluZUNvbnRhaW5lcicpXG5leHBvcnQgY2xhc3MgU3BsaW5lQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IGltcGxlbWVudHMgQ29udGFpbmVyTGlrZSB7XG4gICAgc3RhdGljIHJlYWRvbmx5IEV2ZW50VHlwZSA9IHtcbiAgICAgICAgLyoqIChjb250YWluZXI6IFNwbGluZUNvbnRhaW5lcikgKi9cbiAgICAgICAgQ0hBTkdFRDogJ3NwbGluZS1jaGFuZ2VkJyxcbiAgICB9O1xuXG4gICAgLyoqIEVuYWJsZWQgY29udGFpbmVycyAodXNlZCBieSB0aGUgZWRpdG9yIHRvb2xzKS4gKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgYWxsID0gbmV3IFNldDxTcGxpbmVDb250YWluZXI+KCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbU3BsaW5lXSwgdG9vbHRpcDogJ1RoZSBzcGxpbmVzIGluIHRoaXMgY29udGFpbmVyLicgfSlcbiAgICBzcGxpbmVzOiBTcGxpbmVbXSA9IFtuZXcgU3BsaW5lKCldO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW0tub3RMaW5rXSwgdmlzaWJsZTogZmFsc2UgfSlcbiAgICBsaW5rczogS25vdExpbmtbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfc3RhbXAgPSBOYU47XG5cbiAgICAvKiogVGhlIGZpcnN0IHNwbGluZSAoY3JlYXRlZCBpZiB0aGVyZSBpcyBub25lKS4gKi9cbiAgICBnZXQgc3BsaW5lKCk6IFNwbGluZSB7XG4gICAgICAgIGlmICghdGhpcy5zcGxpbmVzLmxlbmd0aCkgdGhpcy5zcGxpbmVzLnB1c2gobmV3IFNwbGluZSgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BsaW5lc1swXTtcbiAgICB9XG5cbiAgICBzZXQgc3BsaW5lKHZhbHVlOiBTcGxpbmUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3BsaW5lcy5sZW5ndGgpIHRoaXMuc3BsaW5lc1swXSA9IHZhbHVlO1xuICAgICAgICBlbHNlIHRoaXMuc3BsaW5lcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIFNwbGluZUNvbnRhaW5lci5hbGwuYWRkKHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgU3BsaW5lQ29udGFpbmVyLmFsbC5kZWxldGUodGhpcyk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBTcGxpbmVDb250YWluZXIuYWxsLmRlbGV0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICghRURJVE9SICYmICF0aGlzLm5vZGUuaGFzRXZlbnRMaXN0ZW5lcihTcGxpbmVDb250YWluZXIuRXZlbnRUeXBlLkNIQU5HRUQpKSByZXR1cm47XG4gICAgICAgIHRoaXMuY2hlY2tDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSB2YWx1ZSB0aGF0IGNoYW5nZXMgd2hlbmV2ZXIgYW55IHNwbGluZSBpbiB0aGUgY29udGFpbmVyIGNoYW5nZXMuXG4gICAgICogQ2hlY2tlZCBhdCBtb3N0IG9uY2UgcGVyIGZyYW1lIHBlciBzcGxpbmUuXG4gICAgICovXG4gICAgZ2V0IGNoYW5nZVN0YW1wKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBoID0gMjE2NjEzNjI2MSB8IDA7XG4gICAgICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNwbGluZXMpIGggPSBNYXRoLmltdWwoaCBeIHMuY2FjaGUuc3RhbXAsIDE2Nzc3NjE5KTtcbiAgICAgICAgcmV0dXJuIE1hdGguaW11bChoIF4gdGhpcy5zcGxpbmVzLmxlbmd0aCwgMTY3Nzc2MTkpO1xuICAgIH1cblxuICAgIC8qKiBFbWl0cyBDSEFOR0VEIGlmIGEgc3BsaW5lIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgY2hlY2suIFJldHVybnMgd2hldGhlciBpdCBkaWQuICovXG4gICAgY2hlY2tDaGFuZ2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoRURJVE9SKSB0aGlzLnJlcGFpckFmdGVyRXh0ZXJuYWxFZGl0KCk7XG4gICAgICAgIGNvbnN0IHN0YW1wID0gdGhpcy5jaGFuZ2VTdGFtcDtcbiAgICAgICAgaWYgKHN0YW1wID09PSB0aGlzLl9zdGFtcCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGFtcCA9IHN0YW1wO1xuICAgICAgICB0aGlzLm5vZGUuZW1pdChTcGxpbmVDb250YWluZXIuRXZlbnRUeXBlLkNIQU5HRUQsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiogTWFya3MgZXZlcnkgc3BsaW5lIGRpcnR5IGFuZCBlbWl0cyBDSEFOR0VELiAqL1xuICAgIG5vdGlmeUNoYW5nZWQoKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNwbGluZXMpIHMubWFya0RpcnR5KCk7XG4gICAgICAgIHRoaXMuY2hlY2tDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VlbiA9IG5ldyBXZWFrTWFwPFNwbGluZSwgbnVtYmVyPigpO1xuXG4gICAgLyoqXG4gICAgICogSW5zcGVjdG9yIGVkaXRzIGFuZCB1bmRvIGNoYW5nZSBrbm90cyBiZWhpbmQgdGhlIFNwbGluZSBBUEk7IHJlLWFwcGx5IHRoZVxuICAgICAqIHRhbmdlbnQgbW9kZXMgc28gQXV0b1Ntb290aCB0YW5nZW50cyBmb2xsb3cgbW92ZWQga25vdHMuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXBhaXJBZnRlckV4dGVybmFsRWRpdCgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc3BsaW5lcykge1xuICAgICAgICAgICAgY29uc3QgYmVmb3JlID0gZmluZ2VycHJpbnQocyk7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2Vlbi5nZXQocykgPT09IGJlZm9yZSkgY29udGludWU7XG4gICAgICAgICAgICByZWZyZXNoQWxsKHMpO1xuICAgICAgICAgICAgY29uc3QgYWZ0ZXIgPSBmaW5nZXJwcmludChzKTtcbiAgICAgICAgICAgIGlmIChhZnRlciAhPT0gYmVmb3JlKSBzLm1hcmtEaXJ0eSgpO1xuICAgICAgICAgICAgdGhpcy5fc2Vlbi5zZXQocywgYWZ0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNwbGluZXNcblxuICAgIGFkZFNwbGluZShzcGxpbmU6IFNwbGluZSA9IG5ldyBTcGxpbmUoKSk6IFNwbGluZSB7XG4gICAgICAgIHRoaXMuc3BsaW5lcy5wdXNoKHNwbGluZSk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgICAgICByZXR1cm4gc3BsaW5lO1xuICAgIH1cblxuICAgIHJlbW92ZVNwbGluZUF0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyUmVtb3ZlU3BsaW5lKHRoaXMsIGluZGV4KTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgLyoqIENvbnRhaW5lci1sZXZlbCBlZGl0cyB0aGF0IGtlZXAga25vdCBsaW5rcyB2YWxpZC4gKi9cbiAgICBpbnNlcnRLbm90KHNwbGluZUluZGV4OiBudW1iZXIsIGtub3RJbmRleDogbnVtYmVyLCBrbm90OiBCZXppZXJLbm90KTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lckluc2VydEtub3QodGhpcywgc3BsaW5lSW5kZXgsIGtub3RJbmRleCwga25vdCk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgIH1cblxuICAgIHJlbW92ZUtub3RzKHJlZnM6IEtub3RSZWZbXSk6IHZvaWQge1xuICAgICAgICBjb250YWluZXJSZW1vdmVLbm90cyh0aGlzLCByZWZzKTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgcmV2ZXJzZUZsb3coc3BsaW5lSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb250YWluZXJSZXZlcnNlKHRoaXMsIHNwbGluZUluZGV4KTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgLyoqIE1vdmVzIGEga25vdCBhbmQgZXZlcnkga25vdCBsaW5rZWQgdG8gaXQuICovXG4gICAgc2V0S25vdFBvc2l0aW9uKHJlZjogS25vdFJlZiwgbG9jYWxQb3NpdGlvbjogUmVhZG9ubHk8VmVjMz4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcGxpbmVzW3JlZi5zcGxpbmVdLnNldEtub3RQb3NpdGlvbihyZWYua25vdCwgbG9jYWxQb3NpdGlvbik7XG4gICAgICAgIHN5bmNMaW5rZWQodGhpcywgcmVmKTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgbGlua0tub3RzKHJlZnM6IEtub3RSZWZbXSk6IHZvaWQge1xuICAgICAgICBsaW5rS25vdHModGhpcywgcmVmcywgc3BsaW5lRmFjdG9yeSk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgIH1cblxuICAgIHVubGlua0tub3RzKHJlZnM6IEtub3RSZWZbXSk6IHZvaWQge1xuICAgICAgICB1bmxpbmtLbm90cyh0aGlzLCByZWZzKTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgZ2V0TGlua2VkS25vdHMocmVmOiBLbm90UmVmKTogS25vdFJlZltdIHtcbiAgICAgICAgcmV0dXJuIGxpbmtlZEtub3RzKHRoaXMsIHJlZik7XG4gICAgfVxuXG4gICAgaXNLbm90TGlua2VkKHJlZjogS25vdFJlZik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNMaW5rZWQodGhpcywgcmVmKTtcbiAgICB9XG5cbiAgICAvKiogVW5pdHkncyBTcGxpdCBLbm90LiBSZXR1cm5zIHRoZSBuZXcgY29weSBvZiB0aGUga25vdCwgb3IgbnVsbC4gKi9cbiAgICBzcGxpdEtub3QocmVmOiBLbm90UmVmKTogS25vdFJlZiB8IG51bGwge1xuICAgICAgICBjb25zdCByID0gc3BsaXRLbm90KHRoaXMsIHJlZiwgc3BsaW5lRmFjdG9yeSk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG5cbiAgICAvKiogVW5pdHkncyBKb2luIEtub3RzICh0d28gZW5kIGtub3RzKS4gUmV0dXJucyB0aGUgam9pbmVkIGtub3QsIG9yIG51bGwuICovXG4gICAgam9pbktub3RzKGE6IEtub3RSZWYsIGI6IEtub3RSZWYpOiBLbm90UmVmIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHIgPSBqb2luS25vdHModGhpcywgYSwgYiwgc3BsaW5lRmFjdG9yeSk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZXZhbHVhdGlvblxuXG4gICAgcHJpdmF0ZSBnZXRTcGxpbmUoaW5kZXg6IG51bWJlcik6IFNwbGluZSB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpbmVzW2luZGV4XSA/PyBudWxsO1xuICAgIH1cblxuICAgIC8qKiBXb3JsZC1zcGFjZSBwb3NpdGlvbiBhdCB0IG9uIGEgc3BsaW5lLiAqL1xuICAgIGV2YWx1YXRlUG9zaXRpb24odDogbnVtYmVyLCBzcGxpbmVJbmRleCA9IDAsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgaWYgKCFzKSByZXR1cm4gb3V0LnNldCh0aGlzLm5vZGUud29ybGRQb3NpdGlvbik7XG4gICAgICAgIHMuZXZhbHVhdGVQb3NpdGlvbih0LCBvdXQpO1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1NYXQ0KG91dCwgb3V0LCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgIH1cblxuICAgIC8qKiBXb3JsZC1zcGFjZSBkZXJpdmF0aXZlIGF0IHQgKGRpcmVjdGlvbiB0aW1lcyBzcGVlZCwgbGlrZSBVbml0eSdzIEV2YWx1YXRlVGFuZ2VudCkuICovXG4gICAgZXZhbHVhdGVUYW5nZW50KHQ6IG51bWJlciwgc3BsaW5lSW5kZXggPSAwLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFNwbGluZShzcGxpbmVJbmRleCk7XG4gICAgICAgIGlmICghcykgcmV0dXJuIG91dC5zZXQoMCwgMCwgMCk7XG4gICAgICAgIHMuZXZhbHVhdGVUYW5nZW50KHQsIG91dCk7XG4gICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybU1hdDROb3JtYWwob3V0LCBvdXQsIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgfVxuXG4gICAgLyoqIFdvcmxkLXNwYWNlIHVuaXQgZGlyZWN0aW9uIG9mIHRyYXZlbCBhdCB0LiAqL1xuICAgIGV2YWx1YXRlRGlyZWN0aW9uKHQ6IG51bWJlciwgc3BsaW5lSW5kZXggPSAwLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFNwbGluZShzcGxpbmVJbmRleCk7XG4gICAgICAgIGlmICghcykgcmV0dXJuIG91dC5zZXQoMCwgMCwgMSk7XG4gICAgICAgIHMuZXZhbHVhdGVEaXJlY3Rpb24odCwgb3V0KTtcbiAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0Tm9ybWFsKG91dCwgb3V0LCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICByZXR1cm4gb3V0Lm5vcm1hbGl6ZSgpO1xuICAgIH1cblxuICAgIC8qKiBXb3JsZC1zcGFjZSB1bml0IHVwIHZlY3RvciBhdCB0LiAqL1xuICAgIGV2YWx1YXRlVXBWZWN0b3IodDogbnVtYmVyLCBzcGxpbmVJbmRleCA9IDAsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgaWYgKCFzKSByZXR1cm4gb3V0LnNldCgwLCAxLCAwKTtcbiAgICAgICAgcy5ldmFsdWF0ZVVwVmVjdG9yKHQsIG91dCk7XG4gICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NE5vcm1hbChvdXQsIG91dCwgdGhpcy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICAgICAgcmV0dXJuIG91dC5ub3JtYWxpemUoKTtcbiAgICB9XG5cbiAgICAvKiogUG9zaXRpb24sIGRpcmVjdGlvbiBhbmQgdXAgYXQgdCAod29ybGQgc3BhY2UpLiBSZXR1cm5zIGZhbHNlIGlmIHRoZXJlIGlzIG5vIHN1Y2ggc3BsaW5lLiAqL1xuICAgIGV2YWx1YXRlKHQ6IG51bWJlciwgc3BsaW5lSW5kZXggPSAwLCBvdXQ/OiBTcGxpbmVTYW1wbGUpOiBTcGxpbmVTYW1wbGUgfCBudWxsIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgaWYgKCFzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgcmVzID0gb3V0ID8/IHsgcG9zaXRpb246IG5ldyBWZWMzKCksIHRhbmdlbnQ6IG5ldyBWZWMzKCksIHVwOiBuZXcgVmVjMygpIH07XG4gICAgICAgIHRoaXMuZXZhbHVhdGVQb3NpdGlvbih0LCBzcGxpbmVJbmRleCwgcmVzLnBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZURpcmVjdGlvbih0LCBzcGxpbmVJbmRleCwgcmVzLnRhbmdlbnQpO1xuICAgICAgICB0aGlzLmV2YWx1YXRlVXBWZWN0b3IodCwgc3BsaW5lSW5kZXgsIHJlcy51cCk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgLyoqIFJvdGF0aW9uIHRoYXQgZmFjZXMgYWxvbmcgdGhlIHNwbGluZSBhdCB0ICgrWiBmb3J3YXJkLCArWSB1cCksIHdvcmxkIHNwYWNlLiAqL1xuICAgIGV2YWx1YXRlUm90YXRpb24odDogbnVtYmVyLCBzcGxpbmVJbmRleCA9IDAsIG91dCA9IG5ldyBRdWF0KCkpOiBRdWF0IHtcbiAgICAgICAgY29uc3QgZiA9IHRoaXMuZXZhbHVhdGVEaXJlY3Rpb24odCwgc3BsaW5lSW5kZXgsIG5ldyBWZWMzKCkpO1xuICAgICAgICBjb25zdCB1ID0gdGhpcy5ldmFsdWF0ZVVwVmVjdG9yKHQsIHNwbGluZUluZGV4LCBuZXcgVmVjMygpKTtcbiAgICAgICAgLy8gUXVhdC5mcm9tVmlld1VwIG1hcHMgK1ogdG8gdGhlIHZpZXcgZGlyZWN0aW9uLCBsaWtlIHRoZSBrbm90cy5cbiAgICAgICAgUXVhdC5mcm9tVmlld1VwKG91dCwgZiwgdSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqIFdvcmxkLXNwYWNlIGxlbmd0aCBvZiBhIHNwbGluZS4gKi9cbiAgICBjYWxjdWxhdGVMZW5ndGgoc3BsaW5lSW5kZXggPSAwKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgaWYgKCFzKSByZXR1cm4gMDtcbiAgICAgICAgY29uc3QgbSA9IHRoaXMubm9kZS53b3JsZE1hdHJpeDtcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgY29uc3QgY291bnQgPSBzLmN1cnZlQ291bnQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgLy8gQmV6aWVyIGN1cnZlcyBhcmUgYWZmaW5lIGludmFyaWFudDogdHJhbnNmb3JtIHRoZSBjb250cm9sIHBvaW50cy5cbiAgICAgICAgICAgIHMuZ2V0Q3VydmUoaSwgX2MpO1xuICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KF9jLnAwIGFzIFZlYzMsIF9jLnAwLCBtKTtcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChfYy5wMSBhcyBWZWMzLCBfYy5wMSwgbSk7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX2MucDIgYXMgVmVjMywgX2MucDIsIG0pO1xuICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KF9jLnAzIGFzIFZlYzMsIF9jLnAzLCBtKTtcbiAgICAgICAgICAgIHRvdGFsICs9IGFyY0xlbmd0aChfYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cblxuICAgIC8qKiBDbG9zZXN0IHBvaW50IG9uIGEgc3BsaW5lIHRvIGEgd29ybGQgcG9zaXRpb24uICovXG4gICAgZ2V0TmVhcmVzdFBvaW50KHdvcmxkUG9pbnQ6IFJlYWRvbmx5PFZlYzM+LCBzcGxpbmVJbmRleCA9IDApOiB7IHQ6IG51bWJlcjsgcG9zaXRpb246IFZlYzM7IGRpc3RhbmNlOiBudW1iZXIgfSB8IG51bGwge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiBudWxsO1xuICAgICAgICBNYXQ0LmludmVydChfbSwgdGhpcy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KF92LCB3b3JsZFBvaW50LCBfbSk7XG4gICAgICAgIGNvbnN0IHIgPSBuZWFyZXN0UG9pbnQocywgcy5jYWNoZSwgX3YpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IG5ldyBWZWMzKHIucG9zaXRpb24ueCwgci5wb3NpdGlvbi55LCByLnBvc2l0aW9uLnopO1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQocG9zaXRpb24sIHBvc2l0aW9uLCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICByZXR1cm4geyB0OiByLnQsIHBvc2l0aW9uLCBkaXN0YW5jZTogVmVjMy5kaXN0YW5jZShwb3NpdGlvbiwgd29ybGRQb2ludCkgfTtcbiAgICB9XG5cbiAgICAvKiogQ2xvc2VzdCBwb2ludCBvdmVyIGFsbCBzcGxpbmVzLiAqL1xuICAgIGdldE5lYXJlc3RQb2ludEFsbCh3b3JsZFBvaW50OiBSZWFkb25seTxWZWMzPik6IHsgc3BsaW5lOiBudW1iZXI7IHQ6IG51bWJlcjsgcG9zaXRpb246IFZlYzM7IGRpc3RhbmNlOiBudW1iZXIgfSB8IG51bGwge1xuICAgICAgICBsZXQgYmVzdDogeyBzcGxpbmU6IG51bWJlcjsgdDogbnVtYmVyOyBwb3NpdGlvbjogVmVjMzsgZGlzdGFuY2U6IG51bWJlciB9IHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByID0gdGhpcy5nZXROZWFyZXN0UG9pbnQod29ybGRQb2ludCwgaSk7XG4gICAgICAgICAgICBpZiAociAmJiAoIWJlc3QgfHwgci5kaXN0YW5jZSA8IGJlc3QuZGlzdGFuY2UpKSBiZXN0ID0geyBzcGxpbmU6IGksIC4uLnIgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmVzdDtcbiAgICB9XG5cbiAgICAvKiogQ29udmVydHMgYmV0d2VlbiBub3JtYWxpemVkIHQsIGxvY2FsIGRpc3RhbmNlIGFuZCBrbm90IGluZGV4IHVuaXRzIG9uIGEgc3BsaW5lLiAqL1xuICAgIGNvbnZlcnRJbmRleFVuaXQodmFsdWU6IG51bWJlciwgZnJvbTogUGF0aEluZGV4VW5pdCwgdG86IFBhdGhJbmRleFVuaXQsIHNwbGluZUluZGV4ID0gMCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFNwbGluZShzcGxpbmVJbmRleCk7XG4gICAgICAgIHJldHVybiBzID8gcy5jb252ZXJ0SW5kZXhVbml0KHZhbHVlLCBmcm9tLCB0bykgOiAwO1xuICAgIH1cblxuICAgIC8qKiBLbm90IHBvc2l0aW9uIGluIHdvcmxkIHNwYWNlLiAqL1xuICAgIGdldEtub3RXb3JsZFBvc2l0aW9uKHJlZjogS25vdFJlZiwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICBjb25zdCBrID0gdGhpcy5zcGxpbmVzW3JlZi5zcGxpbmVdPy5rbm90c1tyZWYua25vdF07XG4gICAgICAgIGlmICghaykgcmV0dXJuIG91dC5zZXQodGhpcy5ub2RlLndvcmxkUG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1NYXQ0KG91dCwgay5wb3NpdGlvbiwgdGhpcy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICB9XG5cbiAgICAvKiogU2V0cyBldmVyeSBrbm90IG9mIGV2ZXJ5IHNwbGluZSB0byBhIHRhbmdlbnQgbW9kZS4gKi9cbiAgICBzZXRUYW5nZW50TW9kZUFsbChtb2RlOiBUYW5nZW50TW9kZSk6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgdGhpcy5zcGxpbmVzKSBzLnNldFRhbmdlbnRNb2RlQWxsKG1vZGUpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IFBhdGhJbmRleFVuaXQgfTtcbiIsICJleHBvcnQgY29uc3QgRURJVE9SID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBFRElUT1JfTk9UX0lOX1BSRVZJRVcgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IFBSRVZJRVcgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBCVUlMRCA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IERFQlVHID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBERVYgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IEpTQiA9IGZhbHNlO1xuIiwgImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgY2NlbnVtLCBFdmVudEhhbmRsZXIsIFF1YXQsIFZlYzMgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFRElUT1IgfSBmcm9tICdjYy9lbnYnO1xuaW1wb3J0IHsgU3BsaW5lQ29udGFpbmVyIH0gZnJvbSAnLi9TcGxpbmVDb250YWluZXInO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBfZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBTcGxpbmVBbmltYXRlTWV0aG9kIHtcbiAgICAvKiogVHJhdmVsIHRoZSBzcGxpbmUgaW4gYGR1cmF0aW9uYCBzZWNvbmRzLiAqL1xuICAgIFRpbWUgPSAwLFxuICAgIC8qKiBUcmF2ZWwgYXQgYG1heFNwZWVkYCB1bml0cyBwZXIgc2Vjb25kLiAqL1xuICAgIFNwZWVkID0gMSxcbn1cblxuZXhwb3J0IGVudW0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlIHtcbiAgICAvKiogUGxheSBvbmNlIGFuZCBzdG9wIGF0IHRoZSBlbmQuICovXG4gICAgT25jZSA9IDAsXG4gICAgLyoqIFJlc3RhcnQgZnJvbSB0aGUgYmVnaW5uaW5nIGF0IHRoZSBlbmQuICovXG4gICAgTG9vcCA9IDEsXG4gICAgLyoqIEVhc2UgaW4gb24gdGhlIGZpcnN0IGxvb3Agb25seSwgdGhlbiBsb29wIGF0IGNvbnN0YW50IHNwZWVkLiAqL1xuICAgIExvb3BFYXNlSW5PbmNlID0gMixcbiAgICAvKiogR28gYmFjayBhbmQgZm9ydGguICovXG4gICAgUGluZ1BvbmcgPSAzLFxufVxuXG5leHBvcnQgZW51bSBTcGxpbmVBbmltYXRlRWFzaW5nIHtcbiAgICBOb25lID0gMCxcbiAgICBFYXNlSW4gPSAxLFxuICAgIEVhc2VPdXQgPSAyLFxuICAgIEVhc2VJbk91dCA9IDMsXG59XG5cbmV4cG9ydCBlbnVtIFNwbGluZUFuaW1hdGVBbGlnbm1lbnQge1xuICAgIC8qKiBLZWVwIHRoZSBvYmplY3QncyByb3RhdGlvbi4gKi9cbiAgICBOb25lID0gMCxcbiAgICAvKiogRmFjZSBhbG9uZyB0aGUgc3BsaW5lLCB1c2luZyB0aGUgc3BsaW5lJ3MgdXAgdmVjdG9yLiAqL1xuICAgIFNwbGluZUVsZW1lbnQgPSAxLFxuICAgIC8qKiBNYXRjaCB0aGUgc3BsaW5lIGNvbnRhaW5lcidzIHJvdGF0aW9uLiAqL1xuICAgIFNwbGluZU9iamVjdCA9IDIsXG4gICAgLyoqIE1hdGNoIHRoZSB3b3JsZCBheGVzLiAqL1xuICAgIFdvcmxkID0gMyxcbn1cblxuZXhwb3J0IGVudW0gQWxpZ25BeGlzIHtcbiAgICBYQXhpcyA9IDAsXG4gICAgWUF4aXMgPSAxLFxuICAgIFpBeGlzID0gMixcbiAgICBOZWdhdGl2ZVhBeGlzID0gMyxcbiAgICBOZWdhdGl2ZVlBeGlzID0gNCxcbiAgICBOZWdhdGl2ZVpBeGlzID0gNSxcbn1cblxuY2NlbnVtKFNwbGluZUFuaW1hdGVNZXRob2QpO1xuY2NlbnVtKFNwbGluZUFuaW1hdGVMb29wTW9kZSk7XG5jY2VudW0oU3BsaW5lQW5pbWF0ZUVhc2luZyk7XG5jY2VudW0oU3BsaW5lQW5pbWF0ZUFsaWdubWVudCk7XG5jY2VudW0oQWxpZ25BeGlzKTtcblxuY29uc3QgQVhFUyA9IFtcbiAgICBuZXcgVmVjMygxLCAwLCAwKSwgbmV3IFZlYzMoMCwgMSwgMCksIG5ldyBWZWMzKDAsIDAsIDEpLFxuICAgIG5ldyBWZWMzKC0xLCAwLCAwKSwgbmV3IFZlYzMoMCwgLTEsIDApLCBuZXcgVmVjMygwLCAwLCAtMSksXG5dO1xuXG5jb25zdCBfcG9zID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9md2QgPSBuZXcgVmVjMygpO1xuY29uc3QgX3VwID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9yb3QgPSBuZXcgUXVhdCgpO1xuY29uc3QgX3JlbWFwID0gbmV3IFF1YXQoKTtcblxuZnVuY3Rpb24gZWFzZUluKHQ6IG51bWJlcikge1xuICAgIHJldHVybiB0ICogdDtcbn1cbmZ1bmN0aW9uIGVhc2VPdXQodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHQgKiAoMiAtIHQpO1xufVxuZnVuY3Rpb24gZWFzZUluT3V0KHQ6IG51bWJlcikge1xuICAgIHJldHVybiB0IDwgMC41ID8gMiAqIHQgKiB0IDogLTEgKyAoNCAtIDIgKiB0KSAqIHQ7XG59XG5mdW5jdGlvbiBwaW5nUG9uZyh0OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKSB7XG4gICAgY29uc3QgbDIgPSBsZW5ndGggKiAyO1xuICAgIGNvbnN0IG0gPSAoKHQgJSBsMikgKyBsMikgJSBsMjtcbiAgICByZXR1cm4gbGVuZ3RoIC0gTWF0aC5hYnMobSAtIGxlbmd0aCk7XG59XG5cbmNvbnN0IF9sZiA9IG5ldyBWZWMzKCk7XG5jb25zdCBfbHUgPSBuZXcgVmVjMygpO1xuXG4vKiogTG9vayByb3RhdGlvbiB3aXRoICtaID0gZm9yd2FyZCBhbmQgK1kgPSB1cCAobGlrZSBVbml0eSdzIFF1YXRlcm5pb24uTG9va1JvdGF0aW9uKS4gKi9cbmZ1bmN0aW9uIGxvb2tSb3RhdGlvbihvdXQ6IFF1YXQsIGZvcndhcmQ6IFJlYWRvbmx5PFZlYzM+LCB1cDogUmVhZG9ubHk8VmVjMz4pOiBRdWF0IHtcbiAgICByZXR1cm4gUXVhdC5mcm9tVmlld1VwKG91dCwgVmVjMy5ub3JtYWxpemUoX2xmLCBmb3J3YXJkKSwgVmVjMy5ub3JtYWxpemUoX2x1LCB1cCkpO1xufVxuXG4vKipcbiAqIE1vdmVzIGl0cyBub2RlIGFsb25nIGEgc3BsaW5lIChVbml0eSdzIFNwbGluZUFuaW1hdGUpLlxuICpcbiAqIE5vZGUgZXZlbnRzOiAnc3BsaW5lLWFuaW1hdGUtdXBkYXRlZCcgKHBvc2l0aW9uLCByb3RhdGlvbikgZXZlcnkgdXBkYXRlXG4gKiBhbmQgJ3NwbGluZS1hbmltYXRlLWNvbXBsZXRlZCcgd2hlbiBhIHJ1biBlbmRzIG9yIGEgbG9vcCB3cmFwcy5cbiAqL1xuQGNjY2xhc3MoJ1NwbGluZUFuaW1hdGUnKVxuQG1lbnUoJ1NwbGluZXMvU3BsaW5lQW5pbWF0ZScpXG5leHBvcnQgY2xhc3MgU3BsaW5lQW5pbWF0ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IEV2ZW50VHlwZSA9IHtcbiAgICAgICAgVVBEQVRFRDogJ3NwbGluZS1hbmltYXRlLXVwZGF0ZWQnLFxuICAgICAgICBDT01QTEVURUQ6ICdzcGxpbmUtYW5pbWF0ZS1jb21wbGV0ZWQnLFxuICAgIH07XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVDb250YWluZXIsIHRvb2x0aXA6ICdUaGUgc3BsaW5lIGNvbnRhaW5lciB0byBmb2xsb3cuJyB9KVxuICAgIGNvbnRhaW5lcjogU3BsaW5lQ29udGFpbmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnV2hpY2ggc3BsaW5lIG9mIHRoZSBjb250YWluZXIgdG8gZm9sbG93LicsIG1pbjogMCwgc3RlcDogMSB9KVxuICAgIHNwbGluZUluZGV4ID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdTdGFydCBwbGF5aW5nIHdoZW4gdGhlIGNvbXBvbmVudCBzdGFydHMuJyB9KVxuICAgIHBsYXlPbkF3YWtlID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUFuaW1hdGVNZXRob2QsIHRvb2x0aXA6ICdUaW1lOiB0cmF2ZWwgdGhlIHNwbGluZSBpbiBhIHNldCBkdXJhdGlvbi4gU3BlZWQ6IHRyYXZlbCBhdCBhIHNldCBzcGVlZC4nIH0pXG4gICAgZ2V0IG1ldGhvZCgpOiBTcGxpbmVBbmltYXRlTWV0aG9kIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZDtcbiAgICB9XG4gICAgc2V0IG1ldGhvZCh2OiBTcGxpbmVBbmltYXRlTWV0aG9kKSB7XG4gICAgICAgIHRoaXMuX21ldGhvZCA9IHY7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1NlY29uZHMgdG8gdHJhdmVsIHRoZSBzcGxpbmUgb25jZS4nLCBtaW46IDAsIHZpc2libGUodGhpczogU3BsaW5lQW5pbWF0ZSkgeyByZXR1cm4gdGhpcy5fbWV0aG9kID09PSBTcGxpbmVBbmltYXRlTWV0aG9kLlRpbWU7IH0gfSlcbiAgICBnZXQgZHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R1cmF0aW9uO1xuICAgIH1cbiAgICBzZXQgZHVyYXRpb24odjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gTWF0aC5tYXgoMCwgdik7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1NwZWVkIGluIHVuaXRzIHBlciBzZWNvbmQuJywgbWluOiAwLCB2aXNpYmxlKHRoaXM6IFNwbGluZUFuaW1hdGUpIHsgcmV0dXJuIHRoaXMuX21ldGhvZCA9PT0gU3BsaW5lQW5pbWF0ZU1ldGhvZC5TcGVlZDsgfSB9KVxuICAgIGdldCBtYXhTcGVlZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4U3BlZWQ7XG4gICAgfVxuICAgIHNldCBtYXhTcGVlZCh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWF4U3BlZWQgPSBNYXRoLm1heCgwLCB2KTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVBbmltYXRlRWFzaW5nLCB0b29sdGlwOiAnU3BlZWQgY3VydmUgb2YgZWFjaCBydW4uJyB9KVxuICAgIGVhc2luZyA9IFNwbGluZUFuaW1hdGVFYXNpbmcuTm9uZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUFuaW1hdGVMb29wTW9kZSwgdG9vbHRpcDogJ1doYXQgaGFwcGVucyBhdCB0aGUgZW5kIG9mIHRoZSBzcGxpbmUuJyB9KVxuICAgIGxvb3BNb2RlID0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLkxvb3A7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVBbmltYXRlQWxpZ25tZW50LCB0b29sdGlwOiAnSG93IHRoZSBvYmplY3Qgcm90YXRlcyB3aGlsZSBpdCBtb3Zlcy4nIH0pXG4gICAgYWxpZ25tZW50ID0gU3BsaW5lQW5pbWF0ZUFsaWdubWVudC5TcGxpbmVFbGVtZW50O1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQWxpZ25BeGlzLCB0b29sdGlwOiAnVGhlIG9iamVjdCBheGlzIHRoYXQgcG9pbnRzIGFsb25nIHRoZSBzcGxpbmUgKFogZm9yIDNEIG1vZGVscywgWCBmb3IgMkQgc3ByaXRlcykuJyB9KVxuICAgIG9iamVjdEZvcndhcmRBeGlzID0gQWxpZ25BeGlzLlpBeGlzO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQWxpZ25BeGlzLCB0b29sdGlwOiAnVGhlIG9iamVjdCBheGlzIHRoYXQgcG9pbnRzIGFsb25nIHRoZSBzcGxpbmVcdTIwMTlzIHVwIHZlY3Rvci4nIH0pXG4gICAgb2JqZWN0VXBBeGlzID0gQWxpZ25BeGlzLllBeGlzO1xuXG4gICAgQHByb3BlcnR5KHsgcmFuZ2U6IFswLCAxLCAwLjAxXSwgc2xpZGU6IHRydWUsIHRvb2x0aXA6ICdXaGVyZSBvbiB0aGUgc3BsaW5lIHRvIHN0YXJ0ICgwLi4xIG9mIGl0cyBsZW5ndGgpLicgfSlcbiAgICBzdGFydE9mZnNldCA9IDA7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbRXZlbnRIYW5kbGVyXSwgdG9vbHRpcDogJ0NhbGxlZCB3aGVuIGEgcnVuIGVuZHMgb3IgYSBsb29wIHdyYXBzLicgfSlcbiAgICBjb21wbGV0ZWRFdmVudHM6IEV2ZW50SGFuZGxlcltdID0gW107XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9tZXRob2QgPSBTcGxpbmVBbmltYXRlTWV0aG9kLlRpbWU7XG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfZHVyYXRpb24gPSAxO1xuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX21heFNwZWVkID0gMTA7XG5cbiAgICBwcml2YXRlIF9lbGFwc2VkID0gMDtcbiAgICBwcml2YXRlIF9sYXN0RWxhcHNlZCA9IDA7XG4gICAgcHJpdmF0ZSBfcGxheWluZyA9IGZhbHNlO1xuICAgIHByaXZhdGUgX25vcm1hbGl6ZWRUaW1lID0gMDtcbiAgICBwcml2YXRlIF9lbmRSZWFjaGVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcHJldmlld09yaWdpbjogeyBwb3NpdGlvbjogVmVjMzsgcm90YXRpb246IFF1YXQgfSB8IG51bGwgPSBudWxsO1xuXG4gICAgZ2V0IGlzUGxheWluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYXlpbmc7XG4gICAgfVxuXG4gICAgLyoqIFNlY29uZHMgc2luY2UgdGhlIHN0YXJ0IChpbmNsdWRpbmcgbG9vcHMpLiAqL1xuICAgIGdldCBlbGFwc2VkVGltZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxhcHNlZDtcbiAgICB9XG5cbiAgICBzZXQgZWxhcHNlZFRpbWUodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSBNYXRoLm1heCgwLCB2KTtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZVRpbWUoKTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8qKiBQcm9ncmVzcyBhbG9uZyB0aGUgc3BsaW5lOyB0aGUgaW50ZWdlciBwYXJ0IGNvdW50cyBjb21wbGV0ZWQgbG9vcHMuICovXG4gICAgZ2V0IG5vcm1hbGl6ZWRUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkVGltZTtcbiAgICB9XG5cbiAgICBzZXQgbm9ybWFsaXplZFRpbWUodjogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGQgPSB0aGlzLmN1cnJlbnREdXJhdGlvbigpO1xuICAgICAgICB0aGlzLl9lbGFwc2VkID0gTWF0aC5tYXgoMCwgdikgKiBkO1xuICAgICAgICB0aGlzLmV2YWx1YXRlVGltZSgpO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYXlPbkF3YWtlKSB0aGlzLnBsYXkoKTtcbiAgICAgICAgZWxzZSB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5aW5nKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgKz0gZHQ7XG4gICAgICAgIHRoaXMuZXZhbHVhdGVUaW1lKCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBwbGF5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wbGF5aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwYXVzZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGxheWluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKiBCYWNrIHRvIHRoZSBzdGFydDsga2VlcHMgcGxheWluZyBpZiBgYXV0b3BsYXlgLiAqL1xuICAgIHJlc3RhcnQoYXV0b3BsYXkgPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLl9sYXN0RWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuX25vcm1hbGl6ZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fZW5kUmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wbGF5aW5nID0gYXV0b3BsYXk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICAvKiogTGVuZ3RoIG9mIHRoZSBmb2xsb3dlZCBzcGxpbmUgaW4gd29ybGQgdW5pdHMuICovXG4gICAgZ2V0IHNwbGluZUxlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIgPyB0aGlzLmNvbnRhaW5lci5jYWxjdWxhdGVMZW5ndGgodGhpcy5zcGxpbmVJbmRleCkgOiAwO1xuICAgIH1cblxuICAgIC8qKiBEdXJhdGlvbiBvZiBvbmUgcnVuIChTcGVlZCBtb2RlIGNvbnZlcnRzIHRoZSBzcGVlZCBpbnRvIGEgZHVyYXRpb24pLiAqL1xuICAgIGN1cnJlbnREdXJhdGlvbigpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fbWV0aG9kID09PSBTcGxpbmVBbmltYXRlTWV0aG9kLlRpbWUpIHJldHVybiB0aGlzLl9kdXJhdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuX21heFNwZWVkIDw9IDApIHJldHVybiBJbmZpbml0eTtcbiAgICAgICAgY29uc3QgYmFzZSA9IHRoaXMuc3BsaW5lTGVuZ3RoIC8gdGhpcy5fbWF4U3BlZWQ7XG4gICAgICAgIC8vIEVhc2VkIHJ1bnMgcmVhY2ggdHdpY2UgdGhlIGF2ZXJhZ2Ugc3BlZWQ7IGtlZXAgdGhlIHBlYWsgYXQgbWF4U3BlZWQuXG4gICAgICAgIHJldHVybiB0aGlzLmVhc2luZyA9PT0gU3BsaW5lQW5pbWF0ZUVhc2luZy5Ob25lID8gYmFzZSA6IGJhc2UgKiAyO1xuICAgIH1cblxuICAgIC8qKiBTcGxpbmUgdCAoMC4uMSkgZm9yIHRoZSBjdXJyZW50IHRpbWUsIGFmdGVyIGxvb3BpbmcsIGVhc2luZyBhbmQgdGhlIHN0YXJ0IG9mZnNldC4gKi9cbiAgICBnZXRTcGxpbmVUKCk6IG51bWJlciB7XG4gICAgICAgIGxldCB0ID0gdGhpcy5fbm9ybWFsaXplZFRpbWUgJSAxO1xuICAgICAgICBpZiAodGhpcy5fbm9ybWFsaXplZFRpbWUgPj0gMSAmJiB0ID09PSAwICYmIHRoaXMubG9vcE1vZGUgPT09IFNwbGluZUFuaW1hdGVMb29wTW9kZS5PbmNlKSB0ID0gMTtcbiAgICAgICAgdCArPSB0aGlzLnN0YXJ0T2Zmc2V0O1xuICAgICAgICByZXR1cm4gdCA+IDEgPyAodGhpcy5jb250YWluZXI/LnNwbGluZXNbdGhpcy5zcGxpbmVJbmRleF0/LmNsb3NlZCA/IHQgJSAxIDogTWF0aC5taW4odCwgMSkpIDogdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV2YWx1YXRlVGltZSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gdGhpcy5jdXJyZW50RHVyYXRpb24oKTtcbiAgICAgICAgaWYgKCEoZHVyYXRpb24gPiAwKSB8fCAhaXNGaW5pdGUoZHVyYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxpemVkVGltZSA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQSBsb29wIHdyYXBwZWQgKG9yIGEgcGluZy1wb25nIHR1cm5lZCkgc2luY2UgdGhlIGxhc3QgZXZhbHVhdGlvbi5cbiAgICAgICAgaWYgKHRoaXMubG9vcE1vZGUgIT09IFNwbGluZUFuaW1hdGVMb29wTW9kZS5PbmNlICYmIHRoaXMuX2VsYXBzZWQgPiB0aGlzLl9sYXN0RWxhcHNlZFxuICAgICAgICAgICAgJiYgTWF0aC5mbG9vcih0aGlzLl9lbGFwc2VkIC8gZHVyYXRpb24pID4gTWF0aC5mbG9vcih0aGlzLl9sYXN0RWxhcHNlZCAvIGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fZW5kUmVhY2hlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdEVsYXBzZWQgPSB0aGlzLl9lbGFwc2VkO1xuICAgICAgICBsZXQgdCA9IDA7XG4gICAgICAgIGNvbnN0IGVhc2VGaXJzdCA9IHRoaXMuZWFzaW5nID09PSBTcGxpbmVBbmltYXRlRWFzaW5nLkVhc2VJbiB8fCB0aGlzLmVhc2luZyA9PT0gU3BsaW5lQW5pbWF0ZUVhc2luZy5FYXNlSW5PdXQ7XG4gICAgICAgIHN3aXRjaCAodGhpcy5sb29wTW9kZSkge1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuT25jZTpcbiAgICAgICAgICAgICAgICB0ID0gTWF0aC5taW4odGhpcy5fZWxhcHNlZCwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuTG9vcDpcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5fZWxhcHNlZCAlIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuTG9vcEVhc2VJbk9uY2U6XG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgYW4gZWFzZWQtaW4gZmlyc3QgcnVuLCBjb25zdGFudCBzcGVlZCB0YWtlcyBoYWxmIGFzIGxvbmcuXG4gICAgICAgICAgICAgICAgaWYgKGVhc2VGaXJzdCAmJiB0aGlzLl9lbGFwc2VkID49IGR1cmF0aW9uKSBkdXJhdGlvbiAqPSAwLjU7XG4gICAgICAgICAgICAgICAgdCA9IHRoaXMuX2VsYXBzZWQgJSBkdXJhdGlvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLlBpbmdQb25nOlxuICAgICAgICAgICAgICAgIHQgPSBwaW5nUG9uZyh0aGlzLl9lbGFwc2VkLCBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdCAvPSBkdXJhdGlvbjtcbiAgICAgICAgaWYgKHRoaXMubG9vcE1vZGUgPT09IFNwbGluZUFuaW1hdGVMb29wTW9kZS5Mb29wRWFzZUluT25jZSkge1xuICAgICAgICAgICAgaWYgKGVhc2VGaXJzdCAmJiB0aGlzLl9lbGFwc2VkIDwgZHVyYXRpb24pIHQgPSBlYXNlSW4odCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZWFzaW5nKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlRWFzaW5nLkVhc2VJbjogdCA9IGVhc2VJbih0KTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlRWFzaW5nLkVhc2VPdXQ6IHQgPSBlYXNlT3V0KHQpOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVFYXNpbmcuRWFzZUluT3V0OiB0ID0gZWFzZUluT3V0KHQpOyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb29wcyA9IE1hdGguZmxvb3IodGhpcy5fZWxhcHNlZCAvIGR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5fbm9ybWFsaXplZFRpbWUgPSB0aGlzLmxvb3BNb2RlID09PSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuT25jZSA/IE1hdGgubWluKDEsIHQpIDogbG9vcHMgKyB0O1xuICAgICAgICBpZiAodGhpcy5sb29wTW9kZSA9PT0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLk9uY2UgJiYgdGhpcy5fZWxhcHNlZCA+PSBkdXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fbm9ybWFsaXplZFRpbWUgPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW5kUmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV29ybGQgcG9zaXRpb24gYW5kIHJvdGF0aW9uIGZvciB0aGUgY3VycmVudCB0aW1lLiAqL1xuICAgIGV2YWx1YXRlUG9zaXRpb25BbmRSb3RhdGlvbihvdXRQb3NpdGlvbiA9IG5ldyBWZWMzKCksIG91dFJvdGF0aW9uID0gbmV3IFF1YXQoKSk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGlmICghYyB8fCAhYy5zcGxpbmVzW3RoaXMuc3BsaW5lSW5kZXhdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLmdldFNwbGluZVQoKTtcbiAgICAgICAgYy5ldmFsdWF0ZVBvc2l0aW9uKHQsIHRoaXMuc3BsaW5lSW5kZXgsIG91dFBvc2l0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50ID09PSBTcGxpbmVBbmltYXRlQWxpZ25tZW50Lk5vbmUpIHtcbiAgICAgICAgICAgIG91dFJvdGF0aW9uLnNldCh0aGlzLm5vZGUud29ybGRSb3RhdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmd2RBeGlzID0gQVhFU1t0aGlzLm9iamVjdEZvcndhcmRBeGlzXSA/PyBBWEVTWzJdO1xuICAgICAgICBsZXQgdXBBeGlzID0gQVhFU1t0aGlzLm9iamVjdFVwQXhpc10gPz8gQVhFU1sxXTtcbiAgICAgICAgaWYgKE1hdGguYWJzKFZlYzMuZG90KGZ3ZEF4aXMsIHVwQXhpcykpID4gMC45OSkgdXBBeGlzID0gTWF0aC5hYnMoZndkQXhpcy55KSA+IDAuOTkgPyBBWEVTWzJdIDogQVhFU1sxXTtcbiAgICAgICAgUXVhdC5pbnZlcnQoX3JlbWFwLCBsb29rUm90YXRpb24oX3JlbWFwLCBmd2RBeGlzLCB1cEF4aXMpKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLmFsaWdubWVudCkge1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlQWxpZ25tZW50LlNwbGluZUVsZW1lbnQ6XG4gICAgICAgICAgICAgICAgYy5ldmFsdWF0ZURpcmVjdGlvbih0LCB0aGlzLnNwbGluZUluZGV4LCBfZndkKTtcbiAgICAgICAgICAgICAgICBjLmV2YWx1YXRlVXBWZWN0b3IodCwgdGhpcy5zcGxpbmVJbmRleCwgX3VwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3BsaW5lQW5pbWF0ZUFsaWdubWVudC5TcGxpbmVPYmplY3Q6XG4gICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KF9md2QsIFZlYzMuVU5JVF9aLCBjLm5vZGUud29ybGRSb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KF91cCwgVmVjMy5VTklUX1ksIGMubm9kZS53b3JsZFJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgX2Z3ZC5zZXQoMCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgX3VwLnNldCgwLCAxLCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsb29rUm90YXRpb24ob3V0Um90YXRpb24sIF9md2QsIF91cCk7XG4gICAgICAgIFF1YXQubXVsdGlwbHkob3V0Um90YXRpb24sIG91dFJvdGF0aW9uLCBfcmVtYXApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5VHJhbnNmb3JtKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZXZhbHVhdGVQb3NpdGlvbkFuZFJvdGF0aW9uKF9wb3MsIF9yb3QpKSByZXR1cm47XG4gICAgICAgIHRoaXMubm9kZS5zZXRXb3JsZFBvc2l0aW9uKF9wb3MpO1xuICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgIT09IFNwbGluZUFuaW1hdGVBbGlnbm1lbnQuTm9uZSkgdGhpcy5ub2RlLnNldFdvcmxkUm90YXRpb24oX3JvdCk7XG4gICAgICAgIHRoaXMubm9kZS5lbWl0KFNwbGluZUFuaW1hdGUuRXZlbnRUeXBlLlVQREFURUQsIF9wb3MsIF9yb3QpO1xuICAgICAgICBpZiAodGhpcy5fZW5kUmVhY2hlZCkge1xuICAgICAgICAgICAgdGhpcy5fZW5kUmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmVtaXQoU3BsaW5lQW5pbWF0ZS5FdmVudFR5cGUuQ09NUExFVEVELCB0aGlzKTtcbiAgICAgICAgICAgIEV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMuY29tcGxldGVkRXZlbnRzLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVkaXRvciBwcmV2aWV3XG5cbiAgICAvKiogRWRpdG9yIHByZXZpZXc6IHNob3dzIHRoZSBvYmplY3QgYXQgYHNlY29uZHNgICh0aGUgb3JpZ2luYWwgdHJhbnNmb3JtIGlzIGtlcHQgZm9yIF9wcmV2aWV3U3RvcCkuICovXG4gICAgX3ByZXZpZXdTZXRUaW1lKHNlY29uZHM6IG51bWJlcik6IHsgbm9ybWFsaXplZFRpbWU6IG51bWJlcjsgZHVyYXRpb246IG51bWJlciB9IHtcbiAgICAgICAgaWYgKCF0aGlzLl9wcmV2aWV3T3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aWV3T3JpZ2luID0geyBwb3NpdGlvbjogdGhpcy5ub2RlLndvcmxkUG9zaXRpb24uY2xvbmUoKSwgcm90YXRpb246IHRoaXMubm9kZS53b3JsZFJvdGF0aW9uLmNsb25lKCkgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lbGFwc2VkID0gTWF0aC5tYXgoMCwgc2Vjb25kcyk7XG4gICAgICAgIHRoaXMuZXZhbHVhdGVUaW1lKCk7XG4gICAgICAgIHRoaXMuX2VuZFJlYWNoZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgICAgICByZXR1cm4geyBub3JtYWxpemVkVGltZTogdGhpcy5fbm9ybWFsaXplZFRpbWUsIGR1cmF0aW9uOiB0aGlzLmN1cnJlbnREdXJhdGlvbigpIH07XG4gICAgfVxuXG4gICAgLyoqIEVkaXRvciBwcmV2aWV3OiBwdXRzIHRoZSBvYmplY3QgYmFjayB3aGVyZSBpdCB3YXMuICovXG4gICAgX3ByZXZpZXdTdG9wKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fcHJldmlld09yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFdvcmxkUG9zaXRpb24odGhpcy5fcHJldmlld09yaWdpbi5wb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0V29ybGRSb3RhdGlvbih0aGlzLl9wcmV2aWV3T3JpZ2luLnJvdGF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpZXdPcmlnaW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLl9ub3JtYWxpemVkVGltZSA9IDA7XG4gICAgfVxuXG4gICAgX3ByZXZpZXdJbmZvKCk6IHsgZHVyYXRpb246IG51bWJlcjsgbGVuZ3RoOiBudW1iZXI7IHByZXZpZXdpbmc6IGJvb2xlYW4gfSB7XG4gICAgICAgIHJldHVybiB7IGR1cmF0aW9uOiB0aGlzLmN1cnJlbnREdXJhdGlvbigpLCBsZW5ndGg6IHRoaXMuc3BsaW5lTGVuZ3RoLCBwcmV2aWV3aW5nOiAhIXRoaXMuX3ByZXZpZXdPcmlnaW4gfTtcbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIGlmIChFRElUT1IpIHRoaXMuX3ByZXZpZXdTdG9wKCk7XG4gICAgfVxufVxuIiwgImltcG9ydCB7XG4gICAgX2RlY29yYXRvciwgQ29tcG9uZW50LCBjY2VudW0sIENDT2JqZWN0LCBkaXJlY3RvciwganMsIE1hdGVyaWFsLCBNYXQ0LCBNZXNoLCBNZXNoUmVuZGVyZXIsIE5vZGUsIHV0aWxzLCBWZWMyLCBWZWMzLFxufSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFRElUT1IgfSBmcm9tICdjYy9lbnYnO1xuaW1wb3J0IHsgU3BsaW5lQ29udGFpbmVyIH0gZnJvbSAnLi9TcGxpbmVDb250YWluZXInO1xuaW1wb3J0IHsgU3BsaW5lIH0gZnJvbSAnLi9TcGxpbmUnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSwgbWVudSB9ID0gX2RlY29yYXRvcjtcblxuZXhwb3J0IGVudW0gRXh0cnVkZVNoYXBlIHtcbiAgICAvKiogQSB0dWJlLiAqL1xuICAgIENpcmNsZSA9IDAsXG4gICAgLyoqIEEgc3F1YXJlIHR1YmUuICovXG4gICAgU3F1YXJlID0gMSxcbiAgICAvKiogQSBmbGF0IHN0cmlwIGZhY2luZyB0aGUgc3BsaW5lJ3MgdXAgdmVjdG9yLiAqL1xuICAgIFJvYWQgPSAyLFxuICAgIC8qKiBUaGUgZmlyc3Qgc3BsaW5lIG9mIGFub3RoZXIgY29udGFpbmVyLCByZWFkIGluIGl0cyBYWSBwbGFuZS4gKi9cbiAgICBTcGxpbmUgPSAzLFxufVxuY2NlbnVtKEV4dHJ1ZGVTaGFwZSk7XG5cbi8qKiBIaWRkZW4gY2hpbGQgdGhhdCBob2xkcyB0aGUgZ2VuZXJhdGVkIG1lc2g6IG5vdCBzYXZlZCwgbm90IGxpc3RlZCwgbm90IHBpY2thYmxlLiAqL1xuY29uc3QgR0VORVJBVEVEX0ZMQUdTID0gQ0NPYmplY3QuRmxhZ3MuRG9udFNhdmUgfCBDQ09iamVjdC5GbGFncy5IaWRlSW5IaWVyYXJjaHkgfCBDQ09iamVjdC5GbGFncy5Mb2NrZWRJbkVkaXRvcjtcblxuaW50ZXJmYWNlIFByb2ZpbGUge1xuICAgIC8qKiAyRCBwb2ludHMgKHggYWxvbmcgdGhlIHJpZ2h0IHZlY3RvciwgeSBhbG9uZyB1cCkuICovXG4gICAgcG9pbnRzOiBudW1iZXJbXTtcbiAgICBub3JtYWxzOiBudW1iZXJbXTtcbiAgICB1OiBudW1iZXJbXTtcbiAgICAvKiogUGFpcnMgb2YgcG9pbnQgaW5kaWNlcyB0aGF0IGZvcm0gZmFjZXMuICovXG4gICAgZWRnZXM6IG51bWJlcltdO1xuICAgIC8qKiBQcm9maWxlIGVuY2xvc2VzIGFuIGFyZWEgKGNhcHMgcG9zc2libGUpLiAqL1xuICAgIGNsb3NlZDogYm9vbGVhbjtcbiAgICAvKiogUGVyaW1ldGVyIG9mIHRoZSBwcm9maWxlIGF0IHJhZGl1cyAxLCBmb3IgdGV4dHVyZSBzY2FsZSBhbG9uZyB0aGUgc3BsaW5lLiAqL1xuICAgIHBlcmltZXRlcjogbnVtYmVyO1xufVxuXG5jb25zdCBfcCA9IG5ldyBWZWMzKCk7XG5jb25zdCBfZiA9IG5ldyBWZWMzKCk7XG5jb25zdCBfdSA9IG5ldyBWZWMzKCk7XG5jb25zdCBfciA9IG5ldyBWZWMzKCk7XG5jb25zdCBfbSA9IG5ldyBNYXQ0KCk7XG5cbi8qKlxuICogQnVpbGRzIGEgbWVzaCBhbG9uZyB0aGUgc3BsaW5lcyBvZiBhIGNvbnRhaW5lciAoVW5pdHkncyBTcGxpbmVFeHRydWRlKS5cbiAqIFRoZSBtZXNoIGlzIHJlZ2VuZXJhdGVkIHdoZW4gdGhlIHNwbGluZSBvciBhIHNldHRpbmcgY2hhbmdlczsgaXQgbGl2ZXMgb25cbiAqIGEgaGlkZGVuIGNoaWxkIG5vZGUgYW5kIGlzIG5vdCBzYXZlZCB3aXRoIHRoZSBzY2VuZS5cbiAqL1xuQGNjY2xhc3MoJ1NwbGluZUV4dHJ1ZGUnKVxuQGV4ZWN1dGVJbkVkaXRNb2RlXG5AbWVudSgnU3BsaW5lcy9TcGxpbmVFeHRydWRlJylcbmV4cG9ydCBjbGFzcyBTcGxpbmVFeHRydWRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVDb250YWluZXIsIHRvb2x0aXA6ICdUaGUgc3BsaW5lcyB0byBleHRydWRlIChhbGwgc3BsaW5lcyBvZiB0aGUgY29udGFpbmVyKS4nIH0pXG4gICAgY29udGFpbmVyOiBTcGxpbmVDb250YWluZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IE1hdGVyaWFsLCB0b29sdGlwOiAnTWF0ZXJpYWwgb2YgdGhlIGdlbmVyYXRlZCBtZXNoLicgfSlcbiAgICBtYXRlcmlhbDogTWF0ZXJpYWwgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdSZWJ1aWxkIHRoZSBtZXNoIHdoZW4gdGhlIHNwbGluZSBjaGFuZ2VzIChhdCBydW50aW1lIHRvbykuJyB9KVxuICAgIHJlYnVpbGRPblNwbGluZUNoYW5nZSA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnQXQgbW9zdCB0aGlzIG1hbnkgcmVidWlsZHMgcGVyIHNlY29uZCBhdCBydW50aW1lLicsIG1pbjogMSwgc3RlcDogMSwgdmlzaWJsZSh0aGlzOiBTcGxpbmVFeHRydWRlKSB7IHJldHVybiB0aGlzLnJlYnVpbGRPblNwbGluZUNoYW5nZTsgfSB9KVxuICAgIHJlYnVpbGRGcmVxdWVuY3kgPSAzMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEV4dHJ1ZGVTaGFwZSwgdG9vbHRpcDogJ0Nyb3NzLXNlY3Rpb24gb2YgdGhlIG1lc2guJyB9KVxuICAgIHNoYXBlID0gRXh0cnVkZVNoYXBlLkNpcmNsZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdTaWRlcyBvZiB0aGUgY2lyY2xlLicsIG1pbjogMywgc3RlcDogMSwgdmlzaWJsZSh0aGlzOiBTcGxpbmVFeHRydWRlKSB7IHJldHVybiB0aGlzLnNoYXBlID09PSBFeHRydWRlU2hhcGUuQ2lyY2xlOyB9IH0pXG4gICAgc2lkZXMgPSA4O1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU3BsaW5lQ29udGFpbmVyLCB0b29sdGlwOiAnQ29udGFpbmVyIHdob3NlIGZpcnN0IHNwbGluZSBpcyB0aGUgY3Jvc3Mtc2VjdGlvbiAoaW4gaXRzIFhZIHBsYW5lKS4nLCB2aXNpYmxlKHRoaXM6IFNwbGluZUV4dHJ1ZGUpIHsgcmV0dXJuIHRoaXMuc2hhcGUgPT09IEV4dHJ1ZGVTaGFwZS5TcGxpbmU7IH0gfSlcbiAgICBwcm9maWxlOiBTcGxpbmVDb250YWluZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdQb2ludHMgc2FtcGxlZCBhbG9uZyB0aGUgcHJvZmlsZSBzcGxpbmUuJywgbWluOiAyLCBzdGVwOiAxLCB2aXNpYmxlKHRoaXM6IFNwbGluZUV4dHJ1ZGUpIHsgcmV0dXJuIHRoaXMuc2hhcGUgPT09IEV4dHJ1ZGVTaGFwZS5TcGxpbmU7IH0gfSlcbiAgICBwcm9maWxlU2VnbWVudHMgPSAxNjtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdSYWRpdXMgKGhhbGYgd2lkdGgpIG9mIHRoZSBjcm9zcy1zZWN0aW9uLicsIG1pbjogMCB9KVxuICAgIHJhZGl1cyA9IDAuMjU7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnRWRnZSBsb29wcyBwZXIgdW5pdCBvZiBzcGxpbmUgbGVuZ3RoLicsIG1pbjogMC4wMSB9KVxuICAgIHNlZ21lbnRzUGVyVW5pdCA9IDQ7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnQ2xvc2UgdGhlIGVuZHMgb2Ygb3BlbiBzcGxpbmVzLicgfSlcbiAgICBjYXBwZWQgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1BhcnQgb2YgZWFjaCBzcGxpbmUgdG8gZXh0cnVkZSAoMC4uMSkuJyB9KVxuICAgIHJhbmdlID0gbmV3IFZlYzIoMCwgMSk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnVHVybiB0aGUgbWVzaCBpbnNpZGUgb3V0LicgfSlcbiAgICBmbGlwTm9ybWFscyA9IGZhbHNlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ0Nhc3Qgc2hhZG93cy4nIH0pXG4gICAgY2FzdFNoYWRvd3MgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1JlY2VpdmUgc2hhZG93cy4nIH0pXG4gICAgcmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ0FkZCBhIE1lc2hDb2xsaWRlciB1c2luZyB0aGUgZ2VuZXJhdGVkIG1lc2ggKG5lZWRzIGEgcGh5c2ljcyBiYWNrZW5kIHdpdGggbWVzaCBjb2xsaWRlcnMpLicgfSlcbiAgICBnZW5lcmF0ZUNvbGxpZGVyID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9jaGlsZDogTm9kZSB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgX21lc2g6IE1lc2ggfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIF9zdGFtcCA9IE5hTjtcbiAgICBwcml2YXRlIF9sYXN0QnVpbGQgPSAtSW5maW5pdHk7XG4gICAgcHJpdmF0ZSBfZmFsbGJhY2tNYXRlcmlhbDogTWF0ZXJpYWwgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKiBUaGUgZ2VuZXJhdGVkIG1lc2ggKG51bGwgYmVmb3JlIHRoZSBmaXJzdCBidWlsZCkuICovXG4gICAgZ2V0IG1lc2goKTogTWVzaCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzaDtcbiAgICB9XG5cbiAgICByZXNldEluRWRpdG9yKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29tcG9uZW50KFNwbGluZUNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29tcG9uZW50KFNwbGluZUNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMucmVidWlsZCgpO1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkKSB0aGlzLl9jaGlsZC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZCAmJiB0aGlzLl9jaGlsZC5pc1ZhbGlkKSB0aGlzLl9jaGlsZC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2NoaWxkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWVzaD8uZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9tZXNoID0gbnVsbDtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICghRURJVE9SICYmICF0aGlzLnJlYnVpbGRPblNwbGluZUNoYW5nZSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBzdGFtcCA9IHRoaXMuY29tcHV0ZVN0YW1wKCk7XG4gICAgICAgIGlmIChzdGFtcCA9PT0gdGhpcy5fc3RhbXApIHJldHVybjtcbiAgICAgICAgaWYgKCFFRElUT1IpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IGRpcmVjdG9yLmdldFRvdGFsVGltZSgpIC8gMTAwMDtcbiAgICAgICAgICAgIGlmIChub3cgLSB0aGlzLl9sYXN0QnVpbGQgPCAxIC8gTWF0aC5tYXgoMSwgdGhpcy5yZWJ1aWxkRnJlcXVlbmN5KSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5fbGFzdEJ1aWxkID0gbm93O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVidWlsZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29tcHV0ZVN0YW1wKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgbGV0IGggPSBjICYmIGMuaXNWYWxpZCA/IGMuY2hhbmdlU3RhbXAgOiAwO1xuICAgICAgICBjb25zdCBtaXggPSAodjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBoID0gTWF0aC5pbXVsKGggXiBNYXRoLnJvdW5kKHYgKiAxZTUpLCAxNjc3NzYxOSk7XG4gICAgICAgIH07XG4gICAgICAgIG1peCh0aGlzLnNoYXBlKTtcbiAgICAgICAgbWl4KHRoaXMuc2lkZXMpO1xuICAgICAgICBtaXgodGhpcy5yYWRpdXMpO1xuICAgICAgICBtaXgodGhpcy5zZWdtZW50c1BlclVuaXQpO1xuICAgICAgICBtaXgodGhpcy5jYXBwZWQgPyAxIDogMCk7XG4gICAgICAgIG1peCh0aGlzLnJhbmdlLngpO1xuICAgICAgICBtaXgodGhpcy5yYW5nZS55KTtcbiAgICAgICAgbWl4KHRoaXMuZmxpcE5vcm1hbHMgPyAxIDogMCk7XG4gICAgICAgIG1peCh0aGlzLmNhc3RTaGFkb3dzID8gMSA6IDApO1xuICAgICAgICBtaXgodGhpcy5yZWNlaXZlU2hhZG93cyA/IDEgOiAwKTtcbiAgICAgICAgbWl4KHRoaXMuZ2VuZXJhdGVDb2xsaWRlciA/IDEgOiAwKTtcbiAgICAgICAgbWl4KHRoaXMucHJvZmlsZVNlZ21lbnRzKTtcbiAgICAgICAgaWYgKHRoaXMucHJvZmlsZSAmJiB0aGlzLnNoYXBlID09PSBFeHRydWRlU2hhcGUuU3BsaW5lKSBtaXgodGhpcy5wcm9maWxlLmNoYW5nZVN0YW1wKTtcbiAgICAgICAgaWYgKGMgJiYgYy5pc1ZhbGlkICYmIGMubm9kZSAhPT0gdGhpcy5ub2RlKSB7XG4gICAgICAgICAgICBNYXQ0LmludmVydChfbSwgdGhpcy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICAgICAgICAgIE1hdDQubXVsdGlwbHkoX20sIF9tLCBjLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCB2IG9mIE1hdDQudG9BcnJheShbXSwgX20pKSBtaXgodik7XG4gICAgICAgIH1cbiAgICAgICAgaCA9IE1hdGguaW11bChoIF4gKHRoaXMubWF0ZXJpYWwgPyAxIDogMCksIDE2Nzc3NjE5KTtcbiAgICAgICAgcmV0dXJuIGg7XG4gICAgfVxuXG4gICAgLyoqIFJlZ2VuZXJhdGVzIHRoZSBtZXNoIG5vdy4gKi9cbiAgICByZWJ1aWxkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdGFtcCA9IHRoaXMuY29tcHV0ZVN0YW1wKCk7XG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gdGhpcy5idWlsZEdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5lbnN1cmVDaGlsZCgpO1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IGNoaWxkLmdldENvbXBvbmVudChNZXNoUmVuZGVyZXIpIHx8IGNoaWxkLmFkZENvbXBvbmVudChNZXNoUmVuZGVyZXIpO1xuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLl9tZXNoO1xuICAgICAgICBpZiAoIWdlb21ldHJ5KSB7XG4gICAgICAgICAgICByZW5kZXJlci5tZXNoID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX21lc2ggPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWVzaCA9IHV0aWxzLk1lc2hVdGlscy5jcmVhdGVNZXNoKGdlb21ldHJ5LCB1bmRlZmluZWQsIHsgY2FsY3VsYXRlQm91bmRzOiB0cnVlIH0pO1xuICAgICAgICAgICAgcmVuZGVyZXIubWVzaCA9IHRoaXMuX21lc2g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZCAmJiBvbGQgIT09IHRoaXMuX21lc2gpIG9sZC5kZXN0cm95KCk7XG4gICAgICAgIGNvbnN0IG1hdCA9IHRoaXMubWF0ZXJpYWwgfHwgdGhpcy5mYWxsYmFja01hdGVyaWFsKCk7XG4gICAgICAgIGlmIChtYXQpIHJlbmRlcmVyLnNldFNoYXJlZE1hdGVyaWFsKG1hdCwgMCk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd0Nhc3RpbmdNb2RlID0gdGhpcy5jYXN0U2hhZG93cyA/IDEgOiAwO1xuICAgICAgICByZW5kZXJlci5yZWNlaXZlU2hhZG93ID0gdGhpcy5yZWNlaXZlU2hhZG93cyA/IDEgOiAwO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbGxpZGVyKGNoaWxkKTtcbiAgICAgICAgY2hpbGQuYWN0aXZlID0gdGhpcy5lbmFibGVkSW5IaWVyYXJjaHk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmYWxsYmFja01hdGVyaWFsKCk6IE1hdGVyaWFsIHwgbnVsbCB7XG4gICAgICAgIGlmICh0aGlzLl9mYWxsYmFja01hdGVyaWFsKSByZXR1cm4gdGhpcy5fZmFsbGJhY2tNYXRlcmlhbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG0gPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIG0uaW5pdGlhbGl6ZSh7IGVmZmVjdE5hbWU6ICdidWlsdGluLXN0YW5kYXJkJyB9KTtcbiAgICAgICAgICAgIHRoaXMuX2ZhbGxiYWNrTWF0ZXJpYWwgPSBtO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHRoaXMuX2ZhbGxiYWNrTWF0ZXJpYWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9mYWxsYmFja01hdGVyaWFsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW5zdXJlQ2hpbGQoKTogTm9kZSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZCAmJiB0aGlzLl9jaGlsZC5pc1ZhbGlkICYmIHRoaXMuX2NoaWxkLnBhcmVudCA9PT0gdGhpcy5ub2RlKSByZXR1cm4gdGhpcy5fY2hpbGQ7XG4gICAgICAgIC8vIFJldXNlIGEgZ2VuZXJhdGVkIGNoaWxkIGxlZnQgb3ZlciBmcm9tIGEgcHJldmlvdXMgaW5zdGFuY2UgKGUuZy4gYWZ0ZXIgdW5kbykuXG4gICAgICAgIGxldCBjaGlsZCA9IHRoaXMubm9kZS5jaGlsZHJlbi5maW5kKChuKSA9PiBuLm5hbWUgPT09ICdfX1NwbGluZUV4dHJ1ZGVNZXNoJyAmJiAobiBhcyBhbnkpLl9vYmpGbGFncyAmIENDT2JqZWN0LkZsYWdzLkRvbnRTYXZlKSB8fCBudWxsO1xuICAgICAgICBpZiAoIWNoaWxkKSB7XG4gICAgICAgICAgICBjaGlsZCA9IG5ldyBOb2RlKCdfX1NwbGluZUV4dHJ1ZGVNZXNoJyk7XG4gICAgICAgICAgICAoY2hpbGQgYXMgYW55KS5fb2JqRmxhZ3MgfD0gR0VORVJBVEVEX0ZMQUdTO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkLmxheWVyID0gdGhpcy5ub2RlLmxheWVyO1xuICAgICAgICB0aGlzLl9jaGlsZCA9IGNoaWxkO1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVDb2xsaWRlcihjaGlsZDogTm9kZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBDb2xsaWRlckNsYXNzID0ganMuZ2V0Q2xhc3NCeU5hbWUoJ2NjLk1lc2hDb2xsaWRlcicpIGFzIGFueTtcbiAgICAgICAgaWYgKCFDb2xsaWRlckNsYXNzKSByZXR1cm47XG4gICAgICAgIGxldCBjb2xsaWRlciA9IGNoaWxkLmdldENvbXBvbmVudChDb2xsaWRlckNsYXNzKSBhcyBhbnk7XG4gICAgICAgIGlmICghdGhpcy5nZW5lcmF0ZUNvbGxpZGVyIHx8ICF0aGlzLl9tZXNoKSB7XG4gICAgICAgICAgICBpZiAoY29sbGlkZXIpIGNvbGxpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbGxpZGVyKSBjb2xsaWRlciA9IGNoaWxkLmFkZENvbXBvbmVudChDb2xsaWRlckNsYXNzKTtcbiAgICAgICAgY29sbGlkZXIubWVzaCA9IHRoaXMuX21lc2g7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYWtlUHJvZmlsZSgpOiBQcm9maWxlIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHA6IFByb2ZpbGUgPSB7IHBvaW50czogW10sIG5vcm1hbHM6IFtdLCB1OiBbXSwgZWRnZXM6IFtdLCBjbG9zZWQ6IHRydWUsIHBlcmltZXRlcjogMCB9O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2hhcGUpIHtcbiAgICAgICAgICAgIGNhc2UgRXh0cnVkZVNoYXBlLkNpcmNsZToge1xuICAgICAgICAgICAgICAgIGNvbnN0IG4gPSBNYXRoLm1heCgzLCBNYXRoLnJvdW5kKHRoaXMuc2lkZXMpKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYSA9IChqIC8gbikgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICAgICAgcC5wb2ludHMucHVzaChNYXRoLmNvcyhhKSwgTWF0aC5zaW4oYSkpO1xuICAgICAgICAgICAgICAgICAgICBwLm5vcm1hbHMucHVzaChNYXRoLmNvcyhhKSwgTWF0aC5zaW4oYSkpO1xuICAgICAgICAgICAgICAgICAgICBwLnUucHVzaChqIC8gbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChqIDwgbikgcC5lZGdlcy5wdXNoKGosIGogKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcC5wZXJpbWV0ZXIgPSBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRXh0cnVkZVNoYXBlLlNxdWFyZToge1xuICAgICAgICAgICAgICAgIC8vIENvdW50ZXItY2xvY2t3aXNlIGNvcm5lcnMgaW4gdGhlIChyaWdodCwgdXApIHBsYW5lLCB0d28gdmVydGljZXMgcGVyIHNpZGUgZm9yIGZsYXQgbm9ybWFscy5cbiAgICAgICAgICAgICAgICBjb25zdCBjID0gW1sxLCAtMV0sIFsxLCAxXSwgWy0xLCAxXSwgWy0xLCAtMV1dO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgNDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBjW2tdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0gY1soayArIDEpICUgNF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG54ID0gKGFbMF0gKyBiWzBdKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG55ID0gKGFbMV0gKyBiWzFdKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBwLnBvaW50cy5sZW5ndGggLyAyO1xuICAgICAgICAgICAgICAgICAgICBwLnBvaW50cy5wdXNoKGFbMF0sIGFbMV0sIGJbMF0sIGJbMV0pO1xuICAgICAgICAgICAgICAgICAgICBwLm5vcm1hbHMucHVzaChueCwgbnksIG54LCBueSk7XG4gICAgICAgICAgICAgICAgICAgIHAudS5wdXNoKGsgLyA0LCAoayArIDEpIC8gNCk7XG4gICAgICAgICAgICAgICAgICAgIHAuZWRnZXMucHVzaChpLCBpICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHAucGVyaW1ldGVyID0gODtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRXh0cnVkZVNoYXBlLlJvYWQ6XG4gICAgICAgICAgICAgICAgcC5wb2ludHMucHVzaCgxLCAwLCAtMSwgMCk7XG4gICAgICAgICAgICAgICAgcC5ub3JtYWxzLnB1c2goMCwgMSwgMCwgMSk7XG4gICAgICAgICAgICAgICAgcC51LnB1c2goMCwgMSk7XG4gICAgICAgICAgICAgICAgcC5lZGdlcy5wdXNoKDAsIDEpO1xuICAgICAgICAgICAgICAgIHAuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcC5wZXJpbWV0ZXIgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgY2FzZSBFeHRydWRlU2hhcGUuU3BsaW5lOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNwbGluZVByb2ZpbGUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNwbGluZVByb2ZpbGUoKTogUHJvZmlsZSB8IG51bGwge1xuICAgICAgICBjb25zdCBzOiBTcGxpbmUgfCB1bmRlZmluZWQgPSB0aGlzLnByb2ZpbGU/LnNwbGluZXNbMF07XG4gICAgICAgIGlmICghcyB8fCBzLmNvdW50IDwgMikgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG4gPSBNYXRoLm1heCgyLCBNYXRoLnJvdW5kKHRoaXMucHJvZmlsZVNlZ21lbnRzKSk7XG4gICAgICAgIGNvbnN0IHA6IFByb2ZpbGUgPSB7IHBvaW50czogW10sIG5vcm1hbHM6IFtdLCB1OiBbXSwgZWRnZXM6IFtdLCBjbG9zZWQ6IHMuY2xvc2VkLCBwZXJpbWV0ZXI6IDAgfTtcbiAgICAgICAgY29uc3QgcHRzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHtcbiAgICAgICAgICAgIHMuZXZhbHVhdGVQb3NpdGlvbihqIC8gbiwgX3ApO1xuICAgICAgICAgICAgcHRzLnB1c2goX3AueCwgX3AueSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2NhbGUgc28gdGhlIHByb2ZpbGUgZml0cyBhIHVuaXQgcmFkaXVzICh0aGUgcmFkaXVzIHNldHRpbmcgc2l6ZXMgaXQpLlxuICAgICAgICBsZXQgZXh0ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCB2IG9mIHB0cykgZXh0ID0gTWF0aC5tYXgoZXh0LCBNYXRoLmFicyh2KSk7XG4gICAgICAgIGNvbnN0IGsgPSBleHQgPiAwID8gMSAvIGV4dCA6IDE7XG4gICAgICAgIGxldCBkaXN0ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gbjsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gcHRzW2ogKiAyXSAqIGs7XG4gICAgICAgICAgICBjb25zdCB5ID0gcHRzW2ogKiAyICsgMV0gKiBrO1xuICAgICAgICAgICAgaWYgKGogPiAwKSBkaXN0ICs9IE1hdGguaHlwb3QoeCAtIHB0c1tqICogMiAtIDJdICogaywgeSAtIHB0c1tqICogMiAtIDFdICogayk7XG4gICAgICAgICAgICBzLmV2YWx1YXRlRGlyZWN0aW9uKGogLyBuLCBfZik7XG4gICAgICAgICAgICAvLyBOb3JtYWw6IHRoZSBkaXJlY3Rpb24gdHVybmVkIC05MCBkZWdyZWVzIChvdXR3YXJkIGZvciBjb3VudGVyLWNsb2Nrd2lzZSBwcm9maWxlcykuXG4gICAgICAgICAgICBjb25zdCBsID0gTWF0aC5oeXBvdChfZi54LCBfZi55KSB8fCAxO1xuICAgICAgICAgICAgcC5wb2ludHMucHVzaCh4LCB5KTtcbiAgICAgICAgICAgIHAubm9ybWFscy5wdXNoKF9mLnkgLyBsLCAtX2YueCAvIGwpO1xuICAgICAgICAgICAgcC51LnB1c2goMCk7XG4gICAgICAgICAgICBpZiAoaiA8IG4pIHAuZWRnZXMucHVzaChqLCBqICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gbjsgaisrKSBwLnVbal0gPSAoaiAvIG4pO1xuICAgICAgICBwLnBlcmltZXRlciA9IGRpc3Q7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRHZW9tZXRyeSgpOiB7IHBvc2l0aW9uczogbnVtYmVyW107IG5vcm1hbHM6IG51bWJlcltdOyB1dnM6IG51bWJlcltdOyBpbmRpY2VzOiBudW1iZXJbXTsgbWluUG9zOiBWZWMzOyBtYXhQb3M6IFZlYzMgfSB8IG51bGwge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGlmICghYyB8fCAhYy5pc1ZhbGlkKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgcHJvZmlsZSA9IHRoaXMubWFrZVByb2ZpbGUoKTtcbiAgICAgICAgaWYgKCFwcm9maWxlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBjb25zdCBub3JtYWxzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBjb25zdCB1dnM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IGluZGljZXM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IG1pbiA9IG5ldyBWZWMzKEluZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHkpO1xuICAgICAgICBjb25zdCBtYXggPSBuZXcgVmVjMygtSW5maW5pdHksIC1JbmZpbml0eSwgLUluZmluaXR5KTtcblxuICAgICAgICAvLyBDb250YWluZXIgc3BhY2UgdG8gdGhpcyBub2RlJ3Mgc3BhY2UuXG4gICAgICAgIGNvbnN0IHNhbWVOb2RlID0gYy5ub2RlID09PSB0aGlzLm5vZGU7XG4gICAgICAgIGlmICghc2FtZU5vZGUpIHtcbiAgICAgICAgICAgIE1hdDQuaW52ZXJ0KF9tLCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICAgICAgTWF0NC5tdWx0aXBseShfbSwgX20sIGMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcjAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBNYXRoLm1pbih0aGlzLnJhbmdlLngsIHRoaXMucmFuZ2UueSkpKTtcbiAgICAgICAgY29uc3QgcjEgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBNYXRoLm1heCh0aGlzLnJhbmdlLngsIHRoaXMucmFuZ2UueSkpKTtcbiAgICAgICAgaWYgKHIxIC0gcjAgPD0gMWUtNikgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgICAgICBjb25zdCBwYyA9IHByb2ZpbGUucG9pbnRzLmxlbmd0aCAvIDI7XG5cbiAgICAgICAgY29uc3QgYWRkVmVydGV4ID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIG54OiBudW1iZXIsIG55OiBudW1iZXIsIG56OiBudW1iZXIsIHU6IG51bWJlciwgdjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBwb3NpdGlvbnMucHVzaCh4LCB5LCB6KTtcbiAgICAgICAgICAgIG5vcm1hbHMucHVzaCh0aGlzLmZsaXBOb3JtYWxzID8gLW54IDogbngsIHRoaXMuZmxpcE5vcm1hbHMgPyAtbnkgOiBueSwgdGhpcy5mbGlwTm9ybWFscyA/IC1ueiA6IG56KTtcbiAgICAgICAgICAgIHV2cy5wdXNoKHUsIHYpO1xuICAgICAgICAgICAgaWYgKHggPCBtaW4ueCkgbWluLnggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPCBtaW4ueSkgbWluLnkgPSB5O1xuICAgICAgICAgICAgaWYgKHogPCBtaW4ueikgbWluLnogPSB6O1xuICAgICAgICAgICAgaWYgKHggPiBtYXgueCkgbWF4LnggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPiBtYXgueSkgbWF4LnkgPSB5O1xuICAgICAgICAgICAgaWYgKHogPiBtYXgueikgbWF4LnogPSB6O1xuICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9ucy5sZW5ndGggLyAzIC0gMTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdHJpID0gKGE6IG51bWJlciwgYjogbnVtYmVyLCBjYzogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5mbGlwTm9ybWFscykgaW5kaWNlcy5wdXNoKGEsIGNjLCBiKTtcbiAgICAgICAgICAgIGVsc2UgaW5kaWNlcy5wdXNoKGEsIGIsIGNjKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgYy5zcGxpbmVzKSB7XG4gICAgICAgICAgICBpZiAocy5jb3VudCA8IDIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gcy5nZXRMZW5ndGgoKTtcbiAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMWUtNikgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbChsZW5ndGggKiAocjEgLSByMCkgKiB0aGlzLnNlZ21lbnRzUGVyVW5pdCkpO1xuICAgICAgICAgICAgY29uc3QgbG9vcCA9IHMuY2xvc2VkICYmIHIwIDw9IDAgJiYgcjEgPj0gMTtcbiAgICAgICAgICAgIGNvbnN0IGJhc2UgPSBwb3NpdGlvbnMubGVuZ3RoIC8gMztcbiAgICAgICAgICAgIGNvbnN0IHJpbmdGcmFtZXM6IHsgcDogVmVjMzsgZjogVmVjMzsgdTogVmVjMzsgcjogVmVjMyB9W10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHRleFNjYWxlID0gMSAvIE1hdGgubWF4KDFlLTYsIHJhZGl1cyAqIHByb2ZpbGUucGVyaW1ldGVyKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2VnbWVudHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHQgPSByMCArICgocjEgLSByMCkgKiBpKSAvIHNlZ21lbnRzO1xuICAgICAgICAgICAgICAgIHMuZXZhbHVhdGVQb3NpdGlvbih0LCBfcCk7XG4gICAgICAgICAgICAgICAgcy5ldmFsdWF0ZURpcmVjdGlvbih0LCBfZik7XG4gICAgICAgICAgICAgICAgcy5ldmFsdWF0ZVVwVmVjdG9yKHQsIF91KTtcbiAgICAgICAgICAgICAgICBpZiAoIXNhbWVOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChfcCwgX3AsIF9tKTtcbiAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0Tm9ybWFsKF9mLCBfZiwgX20pLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDROb3JtYWwoX3UsIF91LCBfbSkubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFZlYzMuY3Jvc3MoX3IsIF91LCBfZikubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgVmVjMy5jcm9zcyhfdSwgX2YsIF9yKS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICByaW5nRnJhbWVzLnB1c2goeyBwOiBfcC5jbG9uZSgpLCBmOiBfZi5jbG9uZSgpLCB1OiBfdS5jbG9uZSgpLCByOiBfci5jbG9uZSgpIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHYgPSAobGVuZ3RoICogKHQgLSByMCkpICogdGV4U2NhbGU7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHB4ID0gcHJvZmlsZS5wb2ludHNbaiAqIDJdICogcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBweSA9IHByb2ZpbGUucG9pbnRzW2ogKiAyICsgMV0gKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG54ID0gcHJvZmlsZS5ub3JtYWxzW2ogKiAyXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnkgPSBwcm9maWxlLm5vcm1hbHNbaiAqIDIgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgYWRkVmVydGV4KFxuICAgICAgICAgICAgICAgICAgICAgICAgX3AueCArIF9yLnggKiBweCArIF91LnggKiBweSwgX3AueSArIF9yLnkgKiBweCArIF91LnkgKiBweSwgX3AueiArIF9yLnogKiBweCArIF91LnogKiBweSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yLnggKiBueCArIF91LnggKiBueSwgX3IueSAqIG54ICsgX3UueSAqIG55LCBfci56ICogbnggKyBfdS56ICogbnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlLnVbal0sIHYsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmEgPSBiYXNlICsgaSAqIHBjO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJiID0gYmFzZSArIChpICsgMSkgKiBwYztcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlID0gMDsgZSA8IHByb2ZpbGUuZWRnZXMubGVuZ3RoOyBlICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYSA9IHByb2ZpbGUuZWRnZXNbZV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSBwcm9maWxlLmVkZ2VzW2UgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgdHJpKHJhICsgYSwgcmEgKyBiLCByYiArIGEpO1xuICAgICAgICAgICAgICAgICAgICB0cmkocmEgKyBiLCByYiArIGIsIHJiICsgYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY2FwcGVkICYmIHByb2ZpbGUuY2xvc2VkICYmICFsb29wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXAocmluZ0ZyYW1lc1swXSwgcHJvZmlsZSwgcmFkaXVzLCB0cnVlLCBhZGRWZXJ0ZXgsIHRyaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXAocmluZ0ZyYW1lc1tyaW5nRnJhbWVzLmxlbmd0aCAtIDFdLCBwcm9maWxlLCByYWRpdXMsIGZhbHNlLCBhZGRWZXJ0ZXgsIHRyaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpbmRpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB7IHBvc2l0aW9ucywgbm9ybWFscywgdXZzLCBpbmRpY2VzLCBtaW5Qb3M6IG1pbiwgbWF4UG9zOiBtYXggfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZENhcChcbiAgICAgICAgZnJhbWU6IHsgcDogVmVjMzsgZjogVmVjMzsgdTogVmVjMzsgcjogVmVjMyB9LFxuICAgICAgICBwcm9maWxlOiBQcm9maWxlLFxuICAgICAgICByYWRpdXM6IG51bWJlcixcbiAgICAgICAgc3RhcnQ6IGJvb2xlYW4sXG4gICAgICAgIGFkZFZlcnRleDogKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIG54OiBudW1iZXIsIG55OiBudW1iZXIsIG56OiBudW1iZXIsIHU6IG51bWJlciwgdjogbnVtYmVyKSA9PiBudW1iZXIsXG4gICAgICAgIHRyaTogKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIpID0+IHZvaWQsXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHsgcCwgZiwgdSwgciB9ID0gZnJhbWU7XG4gICAgICAgIGNvbnN0IHMgPSBzdGFydCA/IC0xIDogMTtcbiAgICAgICAgY29uc3QgY2VudGVyID0gYWRkVmVydGV4KHAueCwgcC55LCBwLnosIGYueCAqIHMsIGYueSAqIHMsIGYueiAqIHMsIDAuNSwgMC41KTtcbiAgICAgICAgY29uc3QgaWRzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBjb25zdCBwYyA9IHByb2ZpbGUucG9pbnRzLmxlbmd0aCAvIDI7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGM7IGorKykge1xuICAgICAgICAgICAgY29uc3QgcHggPSBwcm9maWxlLnBvaW50c1tqICogMl07XG4gICAgICAgICAgICBjb25zdCBweSA9IHByb2ZpbGUucG9pbnRzW2ogKiAyICsgMV07XG4gICAgICAgICAgICBpZHMucHVzaChhZGRWZXJ0ZXgoXG4gICAgICAgICAgICAgICAgcC54ICsgci54ICogcHggKiByYWRpdXMgKyB1LnggKiBweSAqIHJhZGl1cyxcbiAgICAgICAgICAgICAgICBwLnkgKyByLnkgKiBweCAqIHJhZGl1cyArIHUueSAqIHB5ICogcmFkaXVzLFxuICAgICAgICAgICAgICAgIHAueiArIHIueiAqIHB4ICogcmFkaXVzICsgdS56ICogcHkgKiByYWRpdXMsXG4gICAgICAgICAgICAgICAgZi54ICogcywgZi55ICogcywgZi56ICogcyxcbiAgICAgICAgICAgICAgICBweCAqIDAuNSArIDAuNSwgcHkgKiAwLjUgKyAwLjUsXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBlID0gMDsgZSA8IHByb2ZpbGUuZWRnZXMubGVuZ3RoOyBlICs9IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSBpZHNbcHJvZmlsZS5lZGdlc1tlXV07XG4gICAgICAgICAgICBjb25zdCBiID0gaWRzW3Byb2ZpbGUuZWRnZXNbZSArIDFdXTtcbiAgICAgICAgICAgIC8vIENvdW50ZXItY2xvY2t3aXNlIHByb2ZpbGUgZWRnZXMgZmFjZSArZm9yd2FyZDsgdGhlIHN0YXJ0IGNhcCBmYWNlcyBiYWNrLlxuICAgICAgICAgICAgaWYgKHN0YXJ0KSB0cmkoY2VudGVyLCBiLCBhKTtcbiAgICAgICAgICAgIGVsc2UgdHJpKGNlbnRlciwgYSwgYik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBjY2VudW0sIENDT2JqZWN0LCBpbnN0YW50aWF0ZSwgTm9kZSwgUHJlZmFiLCBRdWF0LCBWZWMyLCBWZWMzIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRURJVE9SIH0gZnJvbSAnY2MvZW52JztcbmltcG9ydCB7IFNwbGluZUNvbnRhaW5lciB9IGZyb20gJy4vU3BsaW5lQ29udGFpbmVyJztcbmltcG9ydCB7IEFsaWduQXhpcyB9IGZyb20gJy4vU3BsaW5lQW5pbWF0ZSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGVJbkVkaXRNb2RlLCBtZW51IH0gPSBfZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBJbnN0YW50aWF0ZU1ldGhvZCB7XG4gICAgLyoqIEEgc2V0IG51bWJlciBvZiBpbnN0YW5jZXMsIHNwcmVhZCBldmVubHkuICovXG4gICAgSW5zdGFuY2VDb3VudCA9IDAsXG4gICAgLyoqIEEgZGlzdGFuY2UgYWxvbmcgdGhlIHNwbGluZSBiZXR3ZWVuIGluc3RhbmNlcy4gKi9cbiAgICBTcGFjaW5nRGlzdGFuY2UgPSAxLFxuICAgIC8qKiBBIHN0cmFpZ2h0LWxpbmUgZGlzdGFuY2UgYmV0d2VlbiBpbnN0YW5jZXMuICovXG4gICAgTGluZWFyRGlzdGFuY2UgPSAyLFxufVxuXG5leHBvcnQgZW51bSBJbnN0YW50aWF0ZVNwYWNlIHtcbiAgICAvKiogT3JpZW50IGluc3RhbmNlcyBhbG9uZyB0aGUgc3BsaW5lLiAqL1xuICAgIFNwbGluZSA9IDAsXG4gICAgLyoqIE9yaWVudCBpbnN0YW5jZXMgbGlrZSB0aGUgc3BsaW5lIGNvbnRhaW5lciBub2RlLiAqL1xuICAgIFNwbGluZU9iamVjdCA9IDEsXG4gICAgLyoqIE9yaWVudCBpbnN0YW5jZXMgdG8gdGhlIHdvcmxkIGF4ZXMuICovXG4gICAgV29ybGQgPSAyLFxufVxuXG5leHBvcnQgZW51bSBPZmZzZXRTcGFjZSB7XG4gICAgU3BsaW5lID0gMCxcbiAgICBTcGxpbmVPYmplY3QgPSAxLFxuICAgIFdvcmxkID0gMixcbiAgICAvKiogVGhlIGluc3RhbmNlJ3Mgb3duIGF4ZXMuICovXG4gICAgT2JqZWN0ID0gMyxcbn1cblxuY2NlbnVtKEluc3RhbnRpYXRlTWV0aG9kKTtcbmNjZW51bShJbnN0YW50aWF0ZVNwYWNlKTtcbmNjZW51bShPZmZzZXRTcGFjZSk7XG5cbkBjY2NsYXNzKCdzcGxpbmVzLkluc3RhbnRpYWJsZUl0ZW0nKVxuZXhwb3J0IGNsYXNzIEluc3RhbnRpYWJsZUl0ZW0ge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFByZWZhYiwgdG9vbHRpcDogJ1ByZWZhYiB0byBwbGFjZS4nIH0pXG4gICAgcHJlZmFiOiBQcmVmYWIgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHJhbmdlOiBbMCwgMTAwLCAxXSwgc2xpZGU6IHRydWUsIHRvb2x0aXA6ICdSZWxhdGl2ZSBjaGFuY2Ugb2YgcGlja2luZyB0aGlzIHByZWZhYiAoJSkuJyB9KVxuICAgIHByb2JhYmlsaXR5ID0gMTAwO1xufVxuXG4vKiogQSBtaW4vbWF4IHJhbmdlIHBlciBheGlzOyBheGVzIHdpdGhvdXQgYHJhbmRvbWAgdXNlIG1pbi4gKi9cbkBjY2NsYXNzKCdzcGxpbmVzLkluc3RhbnRpYXRlT2Zmc2V0JylcbmV4cG9ydCBjbGFzcyBJbnN0YW50aWF0ZU9mZnNldCB7XG4gICAgQHByb3BlcnR5XG4gICAgbWluID0gbmV3IFZlYzMoKTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIG1heCA9IG5ldyBWZWMzKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUGljayBYIGF0IHJhbmRvbSBiZXR3ZWVuIG1pbiBhbmQgbWF4LicgfSlcbiAgICByYW5kb21YID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUGljayBZIGF0IHJhbmRvbSBiZXR3ZWVuIG1pbiBhbmQgbWF4LicgfSlcbiAgICByYW5kb21ZID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUGljayBaIGF0IHJhbmRvbSBiZXR3ZWVuIG1pbiBhbmQgbWF4LicgfSlcbiAgICByYW5kb21aID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBPZmZzZXRTcGFjZSwgdG9vbHRpcDogJ0F4ZXMgdGhlIG9mZnNldCBpcyBhcHBsaWVkIGFsb25nLicgfSlcbiAgICBzcGFjZSA9IE9mZnNldFNwYWNlLlNwbGluZTtcblxuICAgIGNvbnN0cnVjdG9yKHNwYWNlID0gT2Zmc2V0U3BhY2UuU3BsaW5lKSB7XG4gICAgICAgIHRoaXMuc3BhY2UgPSBzcGFjZTtcbiAgICB9XG5cbiAgICBnZXQgaXNaZXJvKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5taW4uZXF1YWxzKFZlYzMuWkVSTykgJiYgdGhpcy5tYXguZXF1YWxzKFZlYzMuWkVSTyk7XG4gICAgfVxuXG4gICAgbmV4dChyYW5kOiAoKSA9PiBudW1iZXIsIG91dDogVmVjMyk6IFZlYzMge1xuICAgICAgICBjb25zdCBwaWNrID0gKGxvOiBudW1iZXIsIGhpOiBudW1iZXIsIHJhbmRvbTogYm9vbGVhbikgPT4gKHJhbmRvbSA/IGxvICsgKGhpIC0gbG8pICogcmFuZCgpIDogbG8pO1xuICAgICAgICByZXR1cm4gb3V0LnNldChcbiAgICAgICAgICAgIHBpY2sodGhpcy5taW4ueCwgdGhpcy5tYXgueCwgdGhpcy5yYW5kb21YKSxcbiAgICAgICAgICAgIHBpY2sodGhpcy5taW4ueSwgdGhpcy5tYXgueSwgdGhpcy5yYW5kb21ZKSxcbiAgICAgICAgICAgIHBpY2sodGhpcy5taW4ueiwgdGhpcy5tYXgueiwgdGhpcy5yYW5kb21aKSxcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IEFYRVMgPSBbXG4gICAgbmV3IFZlYzMoMSwgMCwgMCksIG5ldyBWZWMzKDAsIDEsIDApLCBuZXcgVmVjMygwLCAwLCAxKSxcbiAgICBuZXcgVmVjMygtMSwgMCwgMCksIG5ldyBWZWMzKDAsIC0xLCAwKSwgbmV3IFZlYzMoMCwgMCwgLTEpLFxuXTtcblxuY29uc3QgR0VORVJBVEVEX0ZMQUdTID0gQ0NPYmplY3QuRmxhZ3MuRG9udFNhdmUgfCBDQ09iamVjdC5GbGFncy5IaWRlSW5IaWVyYXJjaHkgfCBDQ09iamVjdC5GbGFncy5Mb2NrZWRJbkVkaXRvcjtcbmNvbnN0IFJPT1RfTkFNRSA9ICdfX1NwbGluZUluc3RhbmNlcyc7XG5cbi8qKiBTbWFsbCBkZXRlcm1pbmlzdGljIFBSTkcgKG11bGJlcnJ5MzIpLiAqL1xuZnVuY3Rpb24gcm5nKHNlZWQ6IG51bWJlcik6ICgpID0+IG51bWJlciB7XG4gICAgbGV0IGEgPSBzZWVkID4+PiAwO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGEgPSAoYSArIDB4NmQyYjc5ZjUpID4+PiAwO1xuICAgICAgICBsZXQgdCA9IGE7XG4gICAgICAgIHQgPSBNYXRoLmltdWwodCBeICh0ID4+PiAxNSksIHQgfCAxKTtcbiAgICAgICAgdCBePSB0ICsgTWF0aC5pbXVsKHQgXiAodCA+Pj4gNyksIHQgfCA2MSk7XG4gICAgICAgIHJldHVybiAoKHQgXiAodCA+Pj4gMTQpKSA+Pj4gMCkgLyA0Mjk0OTY3Mjk2O1xuICAgIH07XG59XG5cbmNvbnN0IF9wID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9mID0gbmV3IFZlYzMoKTtcbmNvbnN0IF91ID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9yID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9xID0gbmV3IFF1YXQoKTtcbmNvbnN0IF9xMiA9IG5ldyBRdWF0KCk7XG5jb25zdCBfb2ZmID0gbmV3IFZlYzMoKTtcblxuZnVuY3Rpb24gbG9va1JvdGF0aW9uKG91dDogUXVhdCwgZm9yd2FyZDogUmVhZG9ubHk8VmVjMz4sIHVwOiBSZWFkb25seTxWZWMzPik6IFF1YXQge1xuICAgIHJldHVybiBRdWF0LmZyb21WaWV3VXAob3V0LCBWZWMzLm5vcm1hbGl6ZShuZXcgVmVjMygpLCBmb3J3YXJkKSwgVmVjMy5ub3JtYWxpemUobmV3IFZlYzMoKSwgdXApKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbGFjZW1lbnQge1xuICAgIHNwbGluZTogbnVtYmVyO1xuICAgIHQ6IG51bWJlcjtcbiAgICBpdGVtOiBudW1iZXI7XG4gICAgcG9zaXRpb246IFZlYzM7XG4gICAgcm90YXRpb246IFF1YXQ7XG4gICAgc2NhbGU6IFZlYzM7XG59XG5cbi8qKlxuICogUGxhY2VzIHByZWZhYiBpbnN0YW5jZXMgYWxvbmcgdGhlIHNwbGluZXMgb2YgYSBjb250YWluZXIgKFVuaXR5J3NcbiAqIFNwbGluZUluc3RhbnRpYXRlKS4gSW5zdGFuY2VzIGFyZSBnZW5lcmF0ZWQgKG5vdCBzYXZlZCB3aXRoIHRoZSBzY2VuZSkgYW5kXG4gKiByZWJ1aWx0IHdoZW4gdGhlIHNwbGluZSBvciBhIHNldHRpbmcgY2hhbmdlcy4gVXNlIEJha2UgaW4gdGhlIEluc3BlY3RvciB0b1xuICogdHVybiB0aGVtIGludG8gcmVndWxhciBub2Rlcy5cbiAqL1xuQGNjY2xhc3MoJ1NwbGluZUluc3RhbnRpYXRlJylcbkBleGVjdXRlSW5FZGl0TW9kZVxuQG1lbnUoJ1NwbGluZXMvU3BsaW5lSW5zdGFudGlhdGUnKVxuZXhwb3J0IGNsYXNzIFNwbGluZUluc3RhbnRpYXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVDb250YWluZXIsIHRvb2x0aXA6ICdUaGUgc3BsaW5lcyB0byBwbGFjZSBpbnN0YW5jZXMgYWxvbmcgKGFsbCBzcGxpbmVzIG9mIHRoZSBjb250YWluZXIpLicgfSlcbiAgICBjb250YWluZXI6IFNwbGluZUNvbnRhaW5lciB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW0luc3RhbnRpYWJsZUl0ZW1dLCB0b29sdGlwOiAnUHJlZmFicyB0byBwbGFjZSwgcGlja2VkIGF0IHJhbmRvbSBieSBwcm9iYWJpbGl0eS4nIH0pXG4gICAgaXRlbXM6IEluc3RhbnRpYWJsZUl0ZW1bXSA9IFtuZXcgSW5zdGFudGlhYmxlSXRlbSgpXTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEluc3RhbnRpYXRlTWV0aG9kLCB0b29sdGlwOiAnSG93IGluc3RhbmNlcyBhcmUgc3BhY2VkLicgfSlcbiAgICBtZXRob2QgPSBJbnN0YW50aWF0ZU1ldGhvZC5TcGFjaW5nRGlzdGFuY2U7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnTnVtYmVyIG9mIGluc3RhbmNlcyBwZXIgc3BsaW5lIChyYW5kb20gYmV0d2VlbiB4IGFuZCB5KS4nLCB2aXNpYmxlKHRoaXM6IFNwbGluZUluc3RhbnRpYXRlKSB7IHJldHVybiB0aGlzLm1ldGhvZCA9PT0gSW5zdGFudGlhdGVNZXRob2QuSW5zdGFuY2VDb3VudDsgfSB9KVxuICAgIGNvdW50ID0gbmV3IFZlYzIoMTAsIDEwKTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdEaXN0YW5jZSBiZXR3ZWVuIGluc3RhbmNlcyAocmFuZG9tIGJldHdlZW4geCBhbmQgeSkuJywgdmlzaWJsZSh0aGlzOiBTcGxpbmVJbnN0YW50aWF0ZSkgeyByZXR1cm4gdGhpcy5tZXRob2QgIT09IEluc3RhbnRpYXRlTWV0aG9kLkluc3RhbmNlQ291bnQ7IH0gfSlcbiAgICBzcGFjaW5nID0gbmV3IFZlYzIoMSwgMSk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBJbnN0YW50aWF0ZVNwYWNlLCB0b29sdGlwOiAnQXhlcyB0aGUgaW5zdGFuY2VzIGFyZSBvcmllbnRlZCB0by4nIH0pXG4gICAgc3BhY2UgPSBJbnN0YW50aWF0ZVNwYWNlLlNwbGluZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEFsaWduQXhpcywgdG9vbHRpcDogJ0luc3RhbmNlIGF4aXMgdGhhdCBwb2ludHMgdXAuJyB9KVxuICAgIHVwQXhpcyA9IEFsaWduQXhpcy5ZQXhpcztcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEFsaWduQXhpcywgdG9vbHRpcDogJ0luc3RhbmNlIGF4aXMgdGhhdCBwb2ludHMgZm9yd2FyZCAoYWxvbmcgdGhlIHNwbGluZSkuJyB9KVxuICAgIGZvcndhcmRBeGlzID0gQWxpZ25BeGlzLlpBeGlzO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogSW5zdGFudGlhdGVPZmZzZXQsIHRvb2x0aXA6ICdQb3NpdGlvbiBvZmZzZXQuJyB9KVxuICAgIHBvc2l0aW9uT2Zmc2V0ID0gbmV3IEluc3RhbnRpYXRlT2Zmc2V0KCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBJbnN0YW50aWF0ZU9mZnNldCwgdG9vbHRpcDogJ1JvdGF0aW9uIG9mZnNldCAoRXVsZXIgYW5nbGVzLCBkZWdyZWVzKS4nIH0pXG4gICAgcm90YXRpb25PZmZzZXQgPSBuZXcgSW5zdGFudGlhdGVPZmZzZXQoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEluc3RhbnRpYXRlT2Zmc2V0LCB0b29sdGlwOiAnU2NhbGUgb2Zmc2V0IChhZGRlZCB0byB0aGUgcHJlZmFiXHUyMDE5cyBzY2FsZSkuJyB9KVxuICAgIHNjYWxlT2Zmc2V0ID0gbmV3IEluc3RhbnRpYXRlT2Zmc2V0KE9mZnNldFNwYWNlLk9iamVjdCk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUmVidWlsZCB3aGVuIHRoZSBzcGxpbmUgb3IgYSBzZXR0aW5nIGNoYW5nZXMuJyB9KVxuICAgIGF1dG9SZWZyZXNoID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdSYW5kb20gc2VlZC4nLCBzdGVwOiAxIH0pXG4gICAgc2VlZCA9IDA7XG5cbiAgICBwcml2YXRlIF9yb290OiBOb2RlIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfc3RhbXAgPSBOYU47XG4gICAgcHJpdmF0ZSBfaW5zdGFuY2VzOiBOb2RlW10gPSBbXTtcblxuICAgIC8qKiBUaGUgZ2VuZXJhdGVkIGluc3RhbmNlcy4gKi9cbiAgICBnZXQgaW5zdGFuY2VzKCk6IHJlYWRvbmx5IE5vZGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZXM7XG4gICAgfVxuXG4gICAgcmVzZXRJbkVkaXRvcigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmdldENvbXBvbmVudChTcGxpbmVDb250YWluZXIpO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lcikgdGhpcy5jb250YWluZXIgPSB0aGlzLmdldENvbXBvbmVudChTcGxpbmVDb250YWluZXIpO1xuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUluc3RhbmNlcygpO1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBpZiAodGhpcy5fcm9vdD8uaXNWYWxpZCkgdGhpcy5fcm9vdC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX3Jvb3QgPSBudWxsO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmF1dG9SZWZyZXNoKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmNvbXB1dGVTdGFtcCgpICE9PSB0aGlzLl9zdGFtcCkgdGhpcy51cGRhdGVJbnN0YW5jZXMoKTtcbiAgICB9XG5cbiAgICAvKiogUGlja3MgYSBuZXcgcmFuZG9tIHNlZWQgYW5kIHJlYnVpbGRzLiAqL1xuICAgIHJhbmRvbWl6ZVNlZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VlZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDFlNik7XG4gICAgICAgIHRoaXMudXBkYXRlSW5zdGFuY2VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wdXRlU3RhbXAoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBsZXQgaCA9IGMgJiYgYy5pc1ZhbGlkID8gYy5jaGFuZ2VTdGFtcCA6IDA7XG4gICAgICAgIGNvbnN0IG1peCA9ICh2OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGggPSBNYXRoLmltdWwoaCBeIE1hdGgucm91bmQodiAqIDFlNCksIDE2Nzc3NjE5KTtcbiAgICAgICAgfTtcbiAgICAgICAgbWl4KHRoaXMubWV0aG9kKTtcbiAgICAgICAgbWl4KHRoaXMuY291bnQueCk7XG4gICAgICAgIG1peCh0aGlzLmNvdW50LnkpO1xuICAgICAgICBtaXgodGhpcy5zcGFjaW5nLngpO1xuICAgICAgICBtaXgodGhpcy5zcGFjaW5nLnkpO1xuICAgICAgICBtaXgodGhpcy5zcGFjZSk7XG4gICAgICAgIG1peCh0aGlzLnVwQXhpcyk7XG4gICAgICAgIG1peCh0aGlzLmZvcndhcmRBeGlzKTtcbiAgICAgICAgbWl4KHRoaXMuc2VlZCk7XG4gICAgICAgIGZvciAoY29uc3QgbyBvZiBbdGhpcy5wb3NpdGlvbk9mZnNldCwgdGhpcy5yb3RhdGlvbk9mZnNldCwgdGhpcy5zY2FsZU9mZnNldF0pIHtcbiAgICAgICAgICAgIG1peChvLm1pbi54KTsgbWl4KG8ubWluLnkpOyBtaXgoby5taW4ueik7XG4gICAgICAgICAgICBtaXgoby5tYXgueCk7IG1peChvLm1heC55KTsgbWl4KG8ubWF4LnopO1xuICAgICAgICAgICAgbWl4KChvLnJhbmRvbVggPyAxIDogMCkgfCAoby5yYW5kb21ZID8gMiA6IDApIHwgKG8ucmFuZG9tWiA/IDQgOiAwKSk7XG4gICAgICAgICAgICBtaXgoby5zcGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgbWl4KHRoaXMuaXRlbXMubGVuZ3RoKTtcbiAgICAgICAgZm9yIChjb25zdCBpdCBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICBtaXgoaXQucHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSBpdC5wcmVmYWIgPyBTdHJpbmcoKGl0LnByZWZhYiBhcyBhbnkpLl91dWlkIHx8IGl0LnByZWZhYi5uYW1lIHx8ICdwcmVmYWInKSA6ICcnO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZC5sZW5ndGg7IGkrKykgbWl4KGlkLmNoYXJDb2RlQXQoaSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjICYmIGMuaXNWYWxpZCkge1xuICAgICAgICAgICAgY29uc3QgbSA9IGMubm9kZS53b3JsZE1hdHJpeDtcbiAgICAgICAgICAgIG1peChtLm0xMik7IG1peChtLm0xMyk7IG1peChtLm0xNCk7IG1peChtLm0wMCk7IG1peChtLm0wNSk7IG1peChtLm0xMCk7IG1peChtLm0wMSk7IG1peChtLm0wMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGg7XG4gICAgfVxuXG4gICAgLyoqIFJlbW92ZXMgdGhlIGdlbmVyYXRlZCBpbnN0YW5jZXMuICovXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgbiBvZiB0aGlzLl9pbnN0YW5jZXMpIGlmIChuLmlzVmFsaWQpIG4uZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXMubGVuZ3RoID0gMDtcbiAgICAgICAgaWYgKHRoaXMuX3Jvb3Q/LmlzVmFsaWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbiBvZiBbLi4udGhpcy5fcm9vdC5jaGlsZHJlbl0pIG4uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbnN1cmVSb290KCk6IE5vZGUge1xuICAgICAgICBpZiAodGhpcy5fcm9vdCAmJiB0aGlzLl9yb290LmlzVmFsaWQgJiYgdGhpcy5fcm9vdC5wYXJlbnQgPT09IHRoaXMubm9kZSkgcmV0dXJuIHRoaXMuX3Jvb3Q7XG4gICAgICAgIGxldCByb290ID0gdGhpcy5ub2RlLmNoaWxkcmVuLmZpbmQoKG4pID0+IG4ubmFtZSA9PT0gUk9PVF9OQU1FICYmIChuIGFzIGFueSkuX29iakZsYWdzICYgQ0NPYmplY3QuRmxhZ3MuRG9udFNhdmUpIHx8IG51bGw7XG4gICAgICAgIGlmICghcm9vdCkge1xuICAgICAgICAgICAgcm9vdCA9IG5ldyBOb2RlKFJPT1RfTkFNRSk7XG4gICAgICAgICAgICAocm9vdCBhcyBhbnkpLl9vYmpGbGFncyB8PSBHRU5FUkFURURfRkxBR1M7XG4gICAgICAgICAgICByb290LnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yb290ID0gcm9vdDtcbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuXG4gICAgLyoqIFdoZXJlIGluc3RhbmNlcyBnbzogcG9zaXRpb25zLCByb3RhdGlvbnMgYW5kIHNjYWxlcyAod29ybGQgc3BhY2UpIGFuZCB3aGljaCBpdGVtLiAqL1xuICAgIGNvbXB1dGVQbGFjZW1lbnRzKCk6IFBsYWNlbWVudFtdIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCByZXM6IFBsYWNlbWVudFtdID0gW107XG4gICAgICAgIGlmICghYyB8fCAhYy5pc1ZhbGlkKSByZXR1cm4gcmVzO1xuICAgICAgICBjb25zdCB3ZWlnaHRzID0gdGhpcy5pdGVtcy5tYXAoKGl0KSA9PiAoaXQucHJlZmFiID8gTWF0aC5tYXgoMCwgaXQucHJvYmFiaWxpdHkpIDogMCkpO1xuICAgICAgICBjb25zdCB0b3RhbCA9IHdlaWdodHMucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG4gICAgICAgIGlmICh0b3RhbCA8PSAwKSByZXR1cm4gcmVzO1xuICAgICAgICBjb25zdCByYW5kID0gcm5nKHRoaXMuc2VlZCAqIDc5MTkgKyAxKTtcbiAgICAgICAgY29uc3QgcGlja0l0ZW0gPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgciA9IHJhbmQoKSAqIHRvdGFsO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWlnaHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgciAtPSB3ZWlnaHRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChyIDwgMCAmJiB3ZWlnaHRzW2ldID4gMCkgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd2VpZ2h0cy5maW5kSW5kZXgoKHcpID0+IHcgPiAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZndkQXhpcyA9IEFYRVNbdGhpcy5mb3J3YXJkQXhpc10gPz8gQVhFU1syXTtcbiAgICAgICAgbGV0IHVwQXhpcyA9IEFYRVNbdGhpcy51cEF4aXNdID8/IEFYRVNbMV07XG4gICAgICAgIGlmIChNYXRoLmFicyhWZWMzLmRvdChmd2RBeGlzLCB1cEF4aXMpKSA+IDAuOTkpIHVwQXhpcyA9IE1hdGguYWJzKGZ3ZEF4aXMueSkgPiAwLjk5ID8gQVhFU1syXSA6IEFYRVNbMV07XG4gICAgICAgIGNvbnN0IHJlbWFwID0gUXVhdC5pbnZlcnQobmV3IFF1YXQoKSwgbG9va1JvdGF0aW9uKG5ldyBRdWF0KCksIGZ3ZEF4aXMsIHVwQXhpcykpO1xuXG4gICAgICAgIGZvciAobGV0IHNpID0gMDsgc2kgPCBjLnNwbGluZXMubGVuZ3RoOyBzaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gYy5zcGxpbmVzW3NpXTtcbiAgICAgICAgICAgIGlmIChzLmNvdW50IDwgMikgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBjLmNhbGN1bGF0ZUxlbmd0aChzaSk7XG4gICAgICAgICAgICBpZiAobGVuZ3RoIDw9IDFlLTYpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgdHMgPSB0aGlzLmRpc3RyaWJ1dGVUKGMsIHNpLCBsZW5ndGgsIHMuY2xvc2VkLCByYW5kKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdCBvZiB0cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwaWNrSXRlbSgpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtIDwgMCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgYy5ldmFsdWF0ZVBvc2l0aW9uKHQsIHNpLCBfcCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSW5zdGFudGlhdGVTcGFjZS5TcGxpbmU6XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmV2YWx1YXRlRGlyZWN0aW9uKHQsIHNpLCBfZik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmV2YWx1YXRlVXBWZWN0b3IodCwgc2ksIF91KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEluc3RhbnRpYXRlU3BhY2UuU3BsaW5lT2JqZWN0OlxuICAgICAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KF9mLCBWZWMzLlVOSVRfWiwgYy5ub2RlLndvcmxkUm90YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KF91LCBWZWMzLlVOSVRfWSwgYy5ub2RlLndvcmxkUm90YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBfZi5zZXQoMCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdS5zZXQoMCwgMSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZnJhbWUgPSBsb29rUm90YXRpb24obmV3IFF1YXQoKSwgX2YsIF91KTtcbiAgICAgICAgICAgICAgICBjb25zdCByb3RhdGlvbiA9IFF1YXQubXVsdGlwbHkobmV3IFF1YXQoKSwgZnJhbWUsIHJlbWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IF9wLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJlZmFiTm9kZSA9IHRoaXMuaXRlbXNbaXRlbV0ucHJlZmFiIS5kYXRhIGFzIE5vZGU7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBwcmVmYWJOb2RlID8gcHJlZmFiTm9kZS5zY2FsZS5jbG9uZSgpIDogbmV3IFZlYzMoMSwgMSwgMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucG9zaXRpb25PZmZzZXQuaXNaZXJvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25PZmZzZXQubmV4dChyYW5kLCBfb2ZmKTtcbiAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KF9vZmYsIF9vZmYsIHRoaXMub2Zmc2V0Um90YXRpb24odGhpcy5wb3NpdGlvbk9mZnNldC5zcGFjZSwgZnJhbWUsIGMsIHJvdGF0aW9uKSk7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLmFkZChfb2ZmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJvdGF0aW9uT2Zmc2V0LmlzWmVybykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uT2Zmc2V0Lm5leHQocmFuZCwgX29mZik7XG4gICAgICAgICAgICAgICAgICAgIFF1YXQuZnJvbUV1bGVyKF9xMiwgX29mZi54LCBfb2ZmLnksIF9vZmYueik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwID0gdGhpcy5yb3RhdGlvbk9mZnNldC5zcGFjZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwID09PSBPZmZzZXRTcGFjZS5PYmplY3QpIFF1YXQubXVsdGlwbHkocm90YXRpb24sIHJvdGF0aW9uLCBfcTIpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJvdGF0ZSBhYm91dCB0aGUgY2hvc2VuIGF4ZXM6IFInID0gUyAqIFx1MDM5NCAqIFNcdTIwN0JcdTAwQjkgKiBSXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBTID0gdGhpcy5vZmZzZXRSb3RhdGlvbihzcCwgZnJhbWUsIGMsIHJvdGF0aW9uKS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgUXVhdC5tdWx0aXBseShfcSwgUywgX3EyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFF1YXQubXVsdGlwbHkoX3EsIF9xLCBRdWF0LmludmVydChuZXcgUXVhdCgpLCBTKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBRdWF0Lm11bHRpcGx5KHJvdGF0aW9uLCBfcSwgcm90YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zY2FsZU9mZnNldC5pc1plcm8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FsZU9mZnNldC5uZXh0KHJhbmQsIF9vZmYpO1xuICAgICAgICAgICAgICAgICAgICBzY2FsZS5hZGQoX29mZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKHsgc3BsaW5lOiBzaSwgdCwgaXRlbSwgcG9zaXRpb24sIHJvdGF0aW9uLCBzY2FsZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgb2Zmc2V0Um90YXRpb24oc3BhY2U6IE9mZnNldFNwYWNlLCBzcGxpbmVGcmFtZTogUXVhdCwgYzogU3BsaW5lQ29udGFpbmVyLCBpbnN0YW5jZVJvdGF0aW9uOiBRdWF0KTogUXVhdCB7XG4gICAgICAgIHN3aXRjaCAoc3BhY2UpIHtcbiAgICAgICAgICAgIGNhc2UgT2Zmc2V0U3BhY2UuU3BsaW5lOiByZXR1cm4gc3BsaW5lRnJhbWU7XG4gICAgICAgICAgICBjYXNlIE9mZnNldFNwYWNlLlNwbGluZU9iamVjdDogcmV0dXJuIGMubm9kZS53b3JsZFJvdGF0aW9uIGFzIFF1YXQ7XG4gICAgICAgICAgICBjYXNlIE9mZnNldFNwYWNlLk9iamVjdDogcmV0dXJuIGluc3RhbmNlUm90YXRpb247XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gUXVhdC5JREVOVElUWSBhcyBRdWF0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE5vcm1hbGl6ZWQgdCB2YWx1ZXMgb2YgdGhlIGluc3RhbmNlcyBvbiBvbmUgc3BsaW5lLiAqL1xuICAgIHByaXZhdGUgZGlzdHJpYnV0ZVQoYzogU3BsaW5lQ29udGFpbmVyLCBzaTogbnVtYmVyLCBsZW5ndGg6IG51bWJlciwgY2xvc2VkOiBib29sZWFuLCByYW5kOiAoKSA9PiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgICAgIGNvbnN0IHRzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBjb25zdCBsbyA9IChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4gTWF0aC5taW4oYSwgYik7XG4gICAgICAgIGNvbnN0IGhpID0gKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBNYXRoLm1heChhLCBiKTtcbiAgICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBJbnN0YW50aWF0ZU1ldGhvZC5JbnN0YW5jZUNvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBhID0gTWF0aC5tYXgoMCwgTWF0aC5yb3VuZChsbyh0aGlzLmNvdW50LngsIHRoaXMuY291bnQueSkpKTtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBNYXRoLm1heCgwLCBNYXRoLnJvdW5kKGhpKHRoaXMuY291bnQueCwgdGhpcy5jb3VudC55KSkpO1xuICAgICAgICAgICAgY29uc3QgbiA9IGEgKyBNYXRoLmZsb29yKHJhbmQoKSAqIChiIC0gYSArIDEpKTtcbiAgICAgICAgICAgIGlmIChuID09PSAxKSB0cy5wdXNoKDApO1xuICAgICAgICAgICAgZWxzZSBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgdHMucHVzaChjbG9zZWQgPyBpIC8gbiA6IGkgLyAobiAtIDEpKTtcbiAgICAgICAgICAgIHJldHVybiB0cztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtaW5TID0gTWF0aC5tYXgoMWUtMywgbG8odGhpcy5zcGFjaW5nLngsIHRoaXMuc3BhY2luZy55KSk7XG4gICAgICAgIGNvbnN0IG1heFMgPSBNYXRoLm1heChtaW5TLCBoaSh0aGlzLnNwYWNpbmcueCwgdGhpcy5zcGFjaW5nLnkpKTtcbiAgICAgICAgY29uc3QgbmV4dCA9ICgpID0+IG1pblMgKyAobWF4UyAtIG1pblMpICogcmFuZCgpO1xuICAgICAgICBjb25zdCBNQVggPSAxMDAwMDtcbiAgICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBJbnN0YW50aWF0ZU1ldGhvZC5TcGFjaW5nRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBkID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChkIDw9IGxlbmd0aCArIDFlLTYgJiYgdHMubGVuZ3RoIDwgTUFYKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlZCAmJiBkID49IGxlbmd0aCAtIDFlLTYgJiYgdHMubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICB0cy5wdXNoKE1hdGgubWluKDEsIGQgLyBsZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBkICs9IG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cztcbiAgICAgICAgfVxuICAgICAgICAvLyBMaW5lYXIgZGlzdGFuY2U6IHdhbGsgdGhlIHNwbGluZSB1bnRpbCB0aGUgc3RyYWlnaHQtbGluZSBkaXN0YW5jZSByZWFjaGVzIHRoZSBzcGFjaW5nLlxuICAgICAgICBjb25zdCBzdGVwcyA9IE1hdGgubWF4KDY0LCBNYXRoLmNlaWwobGVuZ3RoIC8gbWluUykgKiA4KTtcbiAgICAgICAgbGV0IHQgPSAwO1xuICAgICAgICB0cy5wdXNoKDApO1xuICAgICAgICBjb25zdCBmcm9tID0gYy5ldmFsdWF0ZVBvc2l0aW9uKDAsIHNpLCBuZXcgVmVjMygpKTtcbiAgICAgICAgbGV0IHdhbnQgPSBuZXh0KCk7XG4gICAgICAgIGNvbnN0IHAgPSBuZXcgVmVjMygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBzdGVwcyAmJiB0cy5sZW5ndGggPCBNQVg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdGkgPSBpIC8gc3RlcHM7XG4gICAgICAgICAgICBjLmV2YWx1YXRlUG9zaXRpb24odGksIHNpLCBwKTtcbiAgICAgICAgICAgIGlmIChWZWMzLmRpc3RhbmNlKHAsIGZyb20pID49IHdhbnQgLSAxZS02KSB7XG4gICAgICAgICAgICAgICAgLy8gUmVmaW5lIGJldHdlZW4gdGhlIHByZXZpb3VzIHN0ZXAgYW5kIHRoaXMgb25lLlxuICAgICAgICAgICAgICAgIGxldCBhID0gdDtcbiAgICAgICAgICAgICAgICBsZXQgYiA9IHRpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMTI7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtID0gKGEgKyBiKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGMuZXZhbHVhdGVQb3NpdGlvbihtLCBzaSwgcCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChWZWMzLmRpc3RhbmNlKHAsIGZyb20pID49IHdhbnQgLSAxZS02KSBiID0gbTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBhID0gbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlZCAmJiBiID49IDEgLSAxZS02KSBicmVhaztcbiAgICAgICAgICAgICAgICB0cy5wdXNoKGIpO1xuICAgICAgICAgICAgICAgIGMuZXZhbHVhdGVQb3NpdGlvbihiLCBzaSwgZnJvbSk7XG4gICAgICAgICAgICAgICAgd2FudCA9IG5leHQoKTtcbiAgICAgICAgICAgICAgICB0ID0gYjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdCA9IHRpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cztcbiAgICB9XG5cbiAgICAvKiogUmVidWlsZHMgdGhlIGluc3RhbmNlcyBub3cuICovXG4gICAgdXBkYXRlSW5zdGFuY2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdGFtcCA9IHRoaXMuY29tcHV0ZVN0YW1wKCk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRzID0gdGhpcy5jb21wdXRlUGxhY2VtZW50cygpO1xuICAgICAgICBpZiAoIXBsYWNlbWVudHMubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLmVuc3VyZVJvb3QoKTtcbiAgICAgICAgcm9vdC5sYXllciA9IHRoaXMubm9kZS5sYXllcjtcbiAgICAgICAgZm9yIChjb25zdCBwbCBvZiBwbGFjZW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBwcmVmYWIgPSB0aGlzLml0ZW1zW3BsLml0ZW1dLnByZWZhYjtcbiAgICAgICAgICAgIGlmICghcHJlZmFiKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBpbnN0YW50aWF0ZShwcmVmYWIpO1xuICAgICAgICAgICAgKG4gYXMgYW55KS5fb2JqRmxhZ3MgfD0gR0VORVJBVEVEX0ZMQUdTO1xuICAgICAgICAgICAgbi5wYXJlbnQgPSByb290O1xuICAgICAgICAgICAgbi5zZXRXb3JsZFBvc2l0aW9uKHBsLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIG4uc2V0V29ybGRSb3RhdGlvbihwbC5yb3RhdGlvbik7XG4gICAgICAgICAgICBuLnNldFNjYWxlKHBsLnNjYWxlKTtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlcy5wdXNoKG4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVkaXRvciBoZWxwZXI6IHBsYWNlbWVudHMgd2l0aCBwcmVmYWIgdXVpZHMsIGZvciBiYWtpbmcgaW50byByZWd1bGFyIG5vZGVzLiAqL1xuICAgIF9iYWtlSW5mbygpOiB7IHByZWZhYjogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyW107IHJvdGF0aW9uOiBudW1iZXJbXTsgc2NhbGU6IG51bWJlcltdIH1bXSB7XG4gICAgICAgIGlmICghRURJVE9SKSByZXR1cm4gW107XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVQbGFjZW1lbnRzKClcbiAgICAgICAgICAgIC5maWx0ZXIoKHApID0+IHRoaXMuaXRlbXNbcC5pdGVtXS5wcmVmYWIpXG4gICAgICAgICAgICAubWFwKChwKSA9PiAoe1xuICAgICAgICAgICAgICAgIHByZWZhYjogKHRoaXMuaXRlbXNbcC5pdGVtXS5wcmVmYWIgYXMgYW55KS5fdXVpZCBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFtwLnBvc2l0aW9uLngsIHAucG9zaXRpb24ueSwgcC5wb3NpdGlvbi56XSxcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogW3Aucm90YXRpb24ueCwgcC5yb3RhdGlvbi55LCBwLnJvdGF0aW9uLnosIHAucm90YXRpb24ud10sXG4gICAgICAgICAgICAgICAgc2NhbGU6IFtwLnNjYWxlLngsIHAuc2NhbGUueSwgcC5zY2FsZS56XSxcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgVmVjMyB9IGZyb20gJ2NjJztcbmltcG9ydCB7IFNwbGluZSwgc3BsaW5lRmFjdG9yeSwgUGF0aEluZGV4VW5pdCB9IGZyb20gJy4vU3BsaW5lJztcbmltcG9ydCB7IGJ1aWxkU2hhcGUsIFNoYXBlT3B0aW9ucyB9IGZyb20gJy4uL2NvcmUvc3BsaW5lLWNvcmUnO1xuXG5leHBvcnQgdHlwZSBTcGxpbmVTaGFwZSA9ICdsaW5lJyB8ICdzcXVhcmUnIHwgJ3JvdW5kZWQtc3F1YXJlJyB8ICdjaXJjbGUnIHwgJ3BvbHlnb24nIHwgJ3N0YXInIHwgJ2hlbGl4JztcblxuLyoqXG4gKiBTdGF0aWMgaGVscGVycyBpbiB0aGUgc3R5bGUgb2YgVW5pdHkncyBTcGxpbmVVdGlsaXR5IC8gU3BsaW5lRmFjdG9yeS5cbiAqIEFsbCBwb3NpdGlvbnMgYXJlIGluIHRoZSBzcGxpbmUncyBsb2NhbCBzcGFjZTsgdCBpcyBhIG5vcm1hbGl6ZWQgZGlzdGFuY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBTcGxpbmVVdGlsaXR5IHtcbiAgICBzdGF0aWMgZXZhbHVhdGVQb3NpdGlvbihzcGxpbmU6IFNwbGluZSwgdDogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBzcGxpbmUuZXZhbHVhdGVQb3NpdGlvbih0LCBvdXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBldmFsdWF0ZVRhbmdlbnQoc3BsaW5lOiBTcGxpbmUsIHQ6IG51bWJlciwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICByZXR1cm4gc3BsaW5lLmV2YWx1YXRlVGFuZ2VudCh0LCBvdXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBldmFsdWF0ZURpcmVjdGlvbihzcGxpbmU6IFNwbGluZSwgdDogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBzcGxpbmUuZXZhbHVhdGVEaXJlY3Rpb24odCwgb3V0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXZhbHVhdGVVcFZlY3RvcihzcGxpbmU6IFNwbGluZSwgdDogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBzcGxpbmUuZXZhbHVhdGVVcFZlY3Rvcih0LCBvdXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjYWxjdWxhdGVMZW5ndGgoc3BsaW5lOiBTcGxpbmUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc3BsaW5lLmdldExlbmd0aCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXROZWFyZXN0UG9pbnQoc3BsaW5lOiBTcGxpbmUsIHBvaW50OiBSZWFkb25seTxWZWMzPik6IHsgdDogbnVtYmVyOyBwb3NpdGlvbjogVmVjMzsgZGlzdGFuY2U6IG51bWJlciB9IHtcbiAgICAgICAgcmV0dXJuIHNwbGluZS5nZXROZWFyZXN0UG9pbnQocG9pbnQpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgcG9pbnQgYGRpc3RhbmNlYCBhbG9uZyB0aGUgc3BsaW5lIGZyb20gYGZyb21UYCAobmVnYXRpdmUgZ29lcyBiYWNrKS4gKi9cbiAgICBzdGF0aWMgZ2V0UG9pbnRBdERpc3RhbmNlKHNwbGluZTogU3BsaW5lLCBmcm9tVDogbnVtYmVyLCBkaXN0YW5jZTogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogeyB0OiBudW1iZXI7IHBvc2l0aW9uOiBWZWMzIH0ge1xuICAgICAgICBjb25zdCB0ID0gc3BsaW5lLmdldFRBdERpc3RhbmNlKGZyb21ULCBkaXN0YW5jZSk7XG4gICAgICAgIHJldHVybiB7IHQsIHBvc2l0aW9uOiBzcGxpbmUuZXZhbHVhdGVQb3NpdGlvbih0LCBvdXQpIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnZlcnRJbmRleFVuaXQoc3BsaW5lOiBTcGxpbmUsIHZhbHVlOiBudW1iZXIsIGZyb206IFBhdGhJbmRleFVuaXQsIHRvOiBQYXRoSW5kZXhVbml0KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNwbGluZS5jb252ZXJ0SW5kZXhVbml0KHZhbHVlLCBmcm9tLCB0byk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBuZXcgc3BsaW5lIGluIGEgdGVtcGxhdGUgc2hhcGUgKGxpa2UgVW5pdHkncyBTcGxpbmVGYWN0b3J5KS5cbiAgICAgKiBgc2l6ZWAgaXMgdGhlIGhhbGYgd2lkdGggLyByYWRpdXM7IGBwbGFuZTJEYCBsYXlzIGl0IGluIFhZIGluc3RlYWQgb2YgWFouXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVNoYXBlKHNoYXBlOiBTcGxpbmVTaGFwZSwgb3B0aW9uczogUGFydGlhbDxTaGFwZU9wdGlvbnM+ID0ge30pOiBTcGxpbmUge1xuICAgICAgICBjb25zdCBzID0gbmV3IFNwbGluZSgpO1xuICAgICAgICBidWlsZFNoYXBlKHMsIHNoYXBlLCB7IHNpemU6IDEsIC4uLm9wdGlvbnMgfSwgc3BsaW5lRmFjdG9yeSk7XG4gICAgICAgIHMubWFya0RpcnR5KCk7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIC8qKiBGaWxscyBhbiBleGlzdGluZyBzcGxpbmUgd2l0aCBhIHRlbXBsYXRlIHNoYXBlLiAqL1xuICAgIHN0YXRpYyBzZXRTaGFwZShzcGxpbmU6IFNwbGluZSwgc2hhcGU6IFNwbGluZVNoYXBlLCBvcHRpb25zOiBQYXJ0aWFsPFNoYXBlT3B0aW9ucz4gPSB7fSk6IHZvaWQge1xuICAgICAgICBidWlsZFNoYXBlKHNwbGluZSwgc2hhcGUsIHsgc2l6ZTogMSwgLi4ub3B0aW9ucyB9LCBzcGxpbmVGYWN0b3J5KTtcbiAgICAgICAgc3BsaW5lLm1hcmtEaXJ0eSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgUGF0aEluZGV4VW5pdCB9O1xuIiwgIi8qKlxuICogQWNjZXNzIHRvIHRoZSBlbmdpbmUgYW5kIHRoZSBlZGl0b3IncyBzY2VuZS1wcm9jZXNzIGdsb2JhbHMuXG4gKlxuICogVGhlIHJ1bnRpbWUgY2xhc3NlcyAoU3BsaW5lQ29udGFpbmVyLCBCZXppZXJLbm90Li4uKSBhcmUgY29tcGlsZWQgYnkgdGhlXG4gKiBwcm9qZWN0LCBub3QgYnVuZGxlZCBoZXJlOiB0aGV5IGFyZSBsb29rZWQgdXAgYnkgY2xhc3MgbmFtZS4gVGhlIHNwbGluZVxuICogY29yZSAoYXNzZXRzL2NvcmUpIGlzIHBsYWluIGZ1bmN0aW9ucyBhbmQgaXMgYnVuZGxlZCBpbnRvIHRoaXMgc2NyaXB0LlxuICovXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgdHlwZSB7IEZhY3RvcnkgfSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9zcGxpbmUtY29yZSc7XG5cbm1vZHVsZS5wYXRocy5wdXNoKGpvaW4oRWRpdG9yLkFwcC5wYXRoLCAnbm9kZV9tb2R1bGVzJykpO1xuXG5leHBvcnQgdHlwZSBDQyA9IHR5cGVvZiBpbXBvcnQoJ2NjJyk7XG5cbmxldCBjY01vZHVsZTogQ0MgfCBudWxsID0gbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBjYygpOiBDQyB7XG4gICAgaWYgKCFjY01vZHVsZSkgY2NNb2R1bGUgPSByZXF1aXJlKCdjYycpIGFzIENDO1xuICAgIHJldHVybiBjY01vZHVsZTtcbn1cblxuZXhwb3J0IGNvbnN0IGNjZSA9ICgpOiBhbnkgPT4gKGdsb2JhbFRoaXMgYXMgYW55KS5jY2UgfHwge307XG5leHBvcnQgY29uc3QgZWRpdG9yRXh0ZW5kcyA9ICgpOiBhbnkgPT4gKGdsb2JhbFRoaXMgYXMgYW55KS5FZGl0b3JFeHRlbmRzO1xuXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NCeU5hbWUobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gY2MoKS5qcy5nZXRDbGFzc0J5TmFtZShuYW1lKSB8fCBudWxsO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBjb250YWluZXJDbGFzcyA9ICgpID0+IGNsYXNzQnlOYW1lKCdTcGxpbmVDb250YWluZXInKTtcblxuZXhwb3J0IGNvbnN0IGZhY3Rvcnk6IEZhY3RvcnkgPSB7XG4gICAga25vdDogKCkgPT4gbmV3IChjbGFzc0J5TmFtZSgnc3BsaW5lcy5CZXppZXJLbm90JykpKCksXG4gICAgc3BsaW5lOiAoKSA9PiBuZXcgKGNsYXNzQnlOYW1lKCdzcGxpbmVzLlNwbGluZScpKSgpLFxuICAgIGxpbms6ICgpID0+IG5ldyAoY2xhc3NCeU5hbWUoJ3NwbGluZXMuS25vdExpbmsnKSkoKSxcbn07XG5cbi8qKiBSdW50aW1lIGNsYXNzZXMgbG9hZGVkICh0aGUgcHJvamVjdCBjb21waWxlZCB0aGUgbW91bnRlZCBzY3JpcHRzKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydW50aW1lUmVhZHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhY29udGFpbmVyQ2xhc3MoKSAmJiAhIWNsYXNzQnlOYW1lKCdzcGxpbmVzLkJlemllcktub3QnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRTY2VuZSgpOiBhbnkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjYygpLmRpcmVjdG9yLmdldFNjZW5lKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmROb2RlKHV1aWQ6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCF1dWlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBleHQgPSBlZGl0b3JFeHRlbmRzKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbiA9IGV4dD8uTm9kZT8uZ2V0Tm9kZT8uKHV1aWQpO1xuICAgICAgICBpZiAobikgcmV0dXJuIG47XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIGZhbGwgdGhyb3VnaCB0byBhIHdhbGtcbiAgICB9XG4gICAgY29uc3Qgc2NlbmUgPSBjdXJyZW50U2NlbmUoKTtcbiAgICBpZiAoIXNjZW5lKSByZXR1cm4gbnVsbDtcbiAgICBsZXQgZm91bmQ6IGFueSA9IG51bGw7XG4gICAgY29uc3Qgd2FsayA9IChuOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGZvdW5kKSByZXR1cm47XG4gICAgICAgIGlmIChuLnV1aWQgPT09IHV1aWQpIHtcbiAgICAgICAgICAgIGZvdW5kID0gbjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygbi5jaGlsZHJlbikgd2FsayhjKTtcbiAgICB9O1xuICAgIHdhbGsoc2NlbmUpO1xuICAgIHJldHVybiBmb3VuZDtcbn1cblxuLyoqIENvbXBvbmVudCBieSB1dWlkIG9uIGFueSBub2RlIG9mIHRoZSBzY2VuZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ29tcG9uZW50KHV1aWQ6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgZXh0ID0gZWRpdG9yRXh0ZW5kcygpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGMgPSBleHQ/LkNvbXBvbmVudD8uZ2V0Q29tcG9uZW50Py4odXVpZCk7XG4gICAgICAgIGlmIChjKSByZXR1cm4gYztcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgfVxuICAgIGZvciAoY29uc3QgY29tcCBvZiBhbGxDb250YWluZXJzKCkpIGlmIChjb21wLnV1aWQgPT09IHV1aWQpIHJldHVybiBjb21wO1xuICAgIGNvbnN0IHNjZW5lID0gY3VycmVudFNjZW5lKCk7XG4gICAgaWYgKCFzY2VuZSkgcmV0dXJuIG51bGw7XG4gICAgbGV0IGZvdW5kOiBhbnkgPSBudWxsO1xuICAgIGNvbnN0IHdhbGsgPSAobjogYW55KSA9PiB7XG4gICAgICAgIGlmIChmb3VuZCkgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygbi5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBpZiAoYy51dWlkID09PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSBjO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygbi5jaGlsZHJlbikgd2FsayhjKTtcbiAgICB9O1xuICAgIHdhbGsoc2NlbmUpO1xuICAgIHJldHVybiBmb3VuZDtcbn1cblxuLyoqIEVuYWJsZWQgU3BsaW5lQ29udGFpbmVycyBpbiB0aGUgb3BlbiBzY2VuZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbGxDb250YWluZXJzKCk6IGFueVtdIHtcbiAgICBjb25zdCBDID0gY29udGFpbmVyQ2xhc3MoKTtcbiAgICBpZiAoIUMgfHwgIUMuYWxsKSByZXR1cm4gW107XG4gICAgY29uc3Qgc2NlbmUgPSBjdXJyZW50U2NlbmUoKTtcbiAgICBjb25zdCByZXM6IGFueVtdID0gW107XG4gICAgZm9yIChjb25zdCBjIG9mIEMuYWxsKSB7XG4gICAgICAgIGlmIChjICYmIGMuaXNWYWxpZCAmJiBjLm5vZGUgJiYgYy5ub2RlLmlzVmFsaWQgJiYgYy5ub2RlLnNjZW5lID09PSBzY2VuZSkgcmVzLnB1c2goYyk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBhaW50KCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICAgIGNjZSgpLkVuZ2luZT8ucmVwYWludEluRWRpdE1vZGU/LigpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBlZGl0b3Igc2h1dHRpbmcgZG93blxuICAgIH1cbn1cblxuLyoqIFRlbGxzIHRoZSBlZGl0b3IgYSBub2RlIGNoYW5nZWQgKEluc3BlY3RvciByZWZyZXNoLCBzY2VuZSBkaXJ0eSkuICovXG5leHBvcnQgZnVuY3Rpb24gbm90aWZ5Tm9kZUNoYW5nZWQobm9kZTogYW55KTogdm9pZCB7XG4gICAgaWYgKCFub2RlIHx8ICFub2RlLmlzVmFsaWQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgICBlZGl0b3JFeHRlbmRzKCk/Lk5vZGU/LmVtaXQ/LignY2hhbmdlJywgbm9kZS51dWlkLCBub2RlKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gbm90IGluIHRoZSBlZGl0b3JcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RlZE5vZGVVdWlkcygpOiBzdHJpbmdbXSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaWRzID0gY2NlKCkuU2VsZWN0aW9uPy5xdWVyeT8uKCk7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGlkcykgPyBpZHMgOiBbXTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzMkRWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGMgPSBjY2UoKS5DYW1lcmE7XG4gICAgICAgIGlmICh0eXBlb2YgYz8uaXMyRCA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gYy5pczJEO1xuICAgICAgICByZXR1cm4gISFjY2UoKS5HaXptbz8uaXMyRDtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqIFRoZSBDb2NvcyB0cmFuc2Zvcm0gdG9vbDogJ3Bvc2l0aW9uJyB8ICdyb3RhdGlvbicgfCAnc2NhbGUnIHwgJ3JlY3QnIHwgJ3ZpZXcnLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVRvb2xOYW1lKCk6IHN0cmluZyB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNjZSgpLkdpem1vPy50cmFuc2Zvcm1Ub29sTmFtZSB8fCAncG9zaXRpb24nO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gJ3Bvc2l0aW9uJztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwaXZvdE1vZGUoKTogJ3Bpdm90JyB8ICdjZW50ZXInIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gY2NlKCkuR2l6bW8/LnBpdm90ID09PSAncGl2b3QnID8gJ3Bpdm90JyA6ICdjZW50ZXInO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gJ2NlbnRlcic7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29vcmRpbmF0ZU1vZGUoKTogJ2xvY2FsJyB8ICdnbG9iYWwnIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gY2NlKCkuR2l6bW8/LmNvb3JkaW5hdGUgPT09ICdsb2NhbCcgPyAnbG9jYWwnIDogJ2dsb2JhbCc7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiAnZ2xvYmFsJztcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU25hcENvbmZpZyB7XG4gICAgcG9zaXRpb246IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IHo6IG51bWJlciB9O1xuICAgIHJvdGF0aW9uOiBudW1iZXI7XG4gICAgc2NhbGU6IG51bWJlcjtcbiAgICBpc1Bvc2l0aW9uU25hcEVuYWJsZWQ6IGJvb2xlYW47XG4gICAgaXNSb3RhdGlvblNuYXBFbmFibGVkOiBib29sZWFuO1xuICAgIGlzU2NhbGVTbmFwRW5hYmxlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNuYXBDb25maWcoKTogU25hcENvbmZpZyB7XG4gICAgY29uc3QgZmFsbGJhY2s6IFNuYXBDb25maWcgPSB7XG4gICAgICAgIHBvc2l0aW9uOiB7IHg6IDEsIHk6IDEsIHo6IDEgfSwgcm90YXRpb246IDE1LCBzY2FsZTogMC4xLFxuICAgICAgICBpc1Bvc2l0aW9uU25hcEVuYWJsZWQ6IGZhbHNlLCBpc1JvdGF0aW9uU25hcEVuYWJsZWQ6IGZhbHNlLCBpc1NjYWxlU25hcEVuYWJsZWQ6IGZhbHNlLFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYyA9IGNjZSgpLkdpem1vPy5xdWVyeVRyYW5zZm9ybVNuYXBDb25maWdzPy4oKTtcbiAgICAgICAgcmV0dXJuIGMgPyB7IC4uLmZhbGxiYWNrLCAuLi5jIH0gOiBmYWxsYmFjaztcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrO1xuICAgIH1cbn1cbiIsICIvKipcbiAqIFNwbGluZSBlbGVtZW50cyAoa25vdHMgYW5kIHRhbmdlbnQgaGFuZGxlcykgb2YgdGhlIGVkaXRlZCBjb250YWluZXJzLCB0aGVcbiAqIGVsZW1lbnQgc2VsZWN0aW9uLCBhbmQgbG9jYWwvd29ybGQgY29udmVyc2lvbnMuXG4gKi9cbmltcG9ydCB7XG4gICAgVjMsIFE0LCB2MywgcTQsIGNvcHksIGFkZCwgc3ViLCBub3JtYWxpemUsIHFSb3RhdGUsIHFNdWwsIHFJbnZlcnQsIHFOb3JtYWxpemUsIG00VHJhbnNmb3JtUG9pbnQsIG00VHJhbnNmb3JtRGlyLCBsZW5TcSxcbn0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvbWF0aCc7XG5pbXBvcnQge1xuICAgIEtub3RSZWYsIHNldEtub3RQb3NpdGlvbiwgc2V0VGFuZ2VudFZlYywgc3luY0xpbmtlZCwgdGFuZ2VudEluVmVjLCB0YW5nZW50T3V0VmVjLCBjdXJ2ZUNvdW50LFxufSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9zcGxpbmUtY29yZSc7XG5pbXBvcnQgeyBjYywgY29udGFpbmVyQ2xhc3MsIGZpbmROb2RlLCBzZWxlY3RlZE5vZGVVdWlkcyB9IGZyb20gJy4vZW52JztcblxuZXhwb3J0IHR5cGUgUGFydCA9ICdrbm90JyB8ICdpbicgfCAnb3V0JztcblxuZXhwb3J0IGludGVyZmFjZSBFbGVtZW50UmVmIHtcbiAgICBjb21wOiBhbnk7XG4gICAgc3BsaW5lOiBudW1iZXI7XG4gICAga25vdDogbnVtYmVyO1xuICAgIHBhcnQ6IFBhcnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50S2V5KGU6IEVsZW1lbnRSZWYpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtlLmNvbXAudXVpZH06JHtlLnNwbGluZX06JHtlLmtub3R9OiR7ZS5wYXJ0fWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYW1lRWxlbWVudChhOiBFbGVtZW50UmVmIHwgbnVsbCB8IHVuZGVmaW5lZCwgYjogRWxlbWVudFJlZiB8IG51bGwgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFhICYmICEhYiAmJiBhLmNvbXAgPT09IGIuY29tcCAmJiBhLnNwbGluZSA9PT0gYi5zcGxpbmUgJiYgYS5rbm90ID09PSBiLmtub3QgJiYgYS5wYXJ0ID09PSBiLnBhcnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBrbm90UmVmKGU6IEVsZW1lbnRSZWYpOiBLbm90UmVmIHtcbiAgICByZXR1cm4geyBzcGxpbmU6IGUuc3BsaW5lLCBrbm90OiBlLmtub3QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEtub3QoZTogeyBjb21wOiBhbnk7IHNwbGluZTogbnVtYmVyOyBrbm90OiBudW1iZXIgfSk6IGFueSB7XG4gICAgcmV0dXJuIGUuY29tcD8uc3BsaW5lcz8uW2Uuc3BsaW5lXT8ua25vdHM/LltlLmtub3RdID8/IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkRWxlbWVudChlOiBFbGVtZW50UmVmKTogYm9vbGVhbiB7XG4gICAgaWYgKCFlLmNvbXAgfHwgIWUuY29tcC5pc1ZhbGlkIHx8ICFlLmNvbXAubm9kZSB8fCAhZS5jb21wLm5vZGUuaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhIWdldEtub3QoZSk7XG59XG5cbi8qKiBUYW5nZW50cyB0aGF0IHNoYXBlIGEgY3VydmU6IHRoZSBpbiB0YW5nZW50IG9mIGFuIG9wZW4gc3BsaW5lJ3MgZmlyc3Qga25vdCBkb2VzIG5vdC4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0YW5nZW50VXNlZChzcGxpbmU6IGFueSwga25vdDogbnVtYmVyLCBwYXJ0OiBQYXJ0KTogYm9vbGVhbiB7XG4gICAgaWYgKHBhcnQgPT09ICdrbm90JykgcmV0dXJuIHRydWU7XG4gICAgaWYgKHNwbGluZS5jbG9zZWQpIHJldHVybiB0cnVlO1xuICAgIGlmIChjdXJ2ZUNvdW50KHNwbGluZSkgPT09IDApIHJldHVybiBmYWxzZTtcbiAgICBpZiAocGFydCA9PT0gJ2luJyAmJiBrbm90ID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHBhcnQgPT09ICdvdXQnICYmIGtub3QgPT09IHNwbGluZS5rbm90cy5sZW5ndGggLSAxKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB0cmFuc2Zvcm1zXG5cbmV4cG9ydCBmdW5jdGlvbiB3b3JsZE1hdHJpeChjb21wOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBjb21wLm5vZGUud29ybGRNYXRyaXg7XG59XG5cbmNvbnN0IF9pbnYgPSBuZXcgTWFwPGFueSwgeyBzdGFtcDogc3RyaW5nOyBtOiBhbnkgfT4oKTtcblxuLyoqIEludmVyc2Ugb2YgdGhlIGNvbnRhaW5lcidzIHdvcmxkIG1hdHJpeCAoY2FjaGVkIHBlciBtYXRyaXggdmFsdWUpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2VNYXRyaXgoY29tcDogYW55KTogYW55IHtcbiAgICBjb25zdCBtID0gY29tcC5ub2RlLndvcmxkTWF0cml4O1xuICAgIGNvbnN0IHN0YW1wID0gYCR7bS5tMDB9LCR7bS5tMDF9LCR7bS5tMDJ9LCR7bS5tMDR9LCR7bS5tMDV9LCR7bS5tMDZ9LCR7bS5tMDh9LCR7bS5tMDl9LCR7bS5tMTB9LCR7bS5tMTJ9LCR7bS5tMTN9LCR7bS5tMTR9YDtcbiAgICBsZXQgZSA9IF9pbnYuZ2V0KGNvbXApO1xuICAgIGlmICghZSB8fCBlLnN0YW1wICE9PSBzdGFtcCkge1xuICAgICAgICBjb25zdCB7IE1hdDQgfSA9IGNjKCk7XG4gICAgICAgIGNvbnN0IGludiA9IG5ldyBNYXQ0KCk7XG4gICAgICAgIE1hdDQuaW52ZXJ0KGludiwgbSk7XG4gICAgICAgIGUgPSB7IHN0YW1wLCBtOiBpbnYgfTtcbiAgICAgICAgX2ludi5zZXQoY29tcCwgZSk7XG4gICAgfVxuICAgIHJldHVybiBlLm07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1dvcmxkKGNvbXA6IGFueSwgbG9jYWw6IFYzLCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICByZXR1cm4gbTRUcmFuc2Zvcm1Qb2ludChvdXQsIHdvcmxkTWF0cml4KGNvbXApLCBsb2NhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0xvY2FsKGNvbXA6IGFueSwgd29ybGQ6IFYzLCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICByZXR1cm4gbTRUcmFuc2Zvcm1Qb2ludChvdXQsIGludmVyc2VNYXRyaXgoY29tcCksIHdvcmxkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpclRvV29ybGQoY29tcDogYW55LCBsb2NhbDogVjMsIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIHJldHVybiBtNFRyYW5zZm9ybURpcihvdXQsIHdvcmxkTWF0cml4KGNvbXApLCBsb2NhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXJUb0xvY2FsKGNvbXA6IGFueSwgd29ybGQ6IFYzLCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICByZXR1cm4gbTRUcmFuc2Zvcm1EaXIob3V0LCBpbnZlcnNlTWF0cml4KGNvbXApLCB3b3JsZCk7XG59XG5cbi8qKiBXb3JsZCByb3RhdGlvbiBvZiB0aGUgY29udGFpbmVyIG5vZGUuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVyUm90YXRpb24oY29tcDogYW55KTogUTQge1xuICAgIGNvbnN0IHIgPSBjb21wLm5vZGUud29ybGRSb3RhdGlvbjtcbiAgICByZXR1cm4gcTQoci54LCByLnksIHIueiwgci53KTtcbn1cblxuLyoqIEtub3Qgcm90YXRpb24gaW4gd29ybGQgc3BhY2UuICovXG5leHBvcnQgZnVuY3Rpb24ga25vdFdvcmxkUm90YXRpb24oY29tcDogYW55LCBrOiBhbnksIG91dDogUTQgPSBxNCgpKTogUTQge1xuICAgIHJldHVybiBxTm9ybWFsaXplKG91dCwgcU11bChvdXQsIGNvbnRhaW5lclJvdGF0aW9uKGNvbXApLCBrLnJvdGF0aW9uKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBrbm90V29ybGRQb3NpdGlvbihjb21wOiBhbnksIHM6IG51bWJlciwgazogbnVtYmVyLCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICBjb25zdCBrbm90ID0gY29tcC5zcGxpbmVzW3NdLmtub3RzW2tdO1xuICAgIHJldHVybiB0b1dvcmxkKGNvbXAsIGtub3QucG9zaXRpb24sIG91dCk7XG59XG5cbi8qKiBXb3JsZCBwb3NpdGlvbiBvZiBhIHRhbmdlbnQgaGFuZGxlJ3MgZW5kIHBvaW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhbmdlbnRXb3JsZFBvc2l0aW9uKGNvbXA6IGFueSwgczogbnVtYmVyLCBrOiBudW1iZXIsIHBhcnQ6ICdpbicgfCAnb3V0Jywgb3V0OiBWMyA9IHYzKCkpOiBWMyB7XG4gICAgY29uc3Qga25vdCA9IGNvbXAuc3BsaW5lc1tzXS5rbm90c1trXTtcbiAgICBjb25zdCB2ZWMgPSBwYXJ0ID09PSAnaW4nID8gdGFuZ2VudEluVmVjKHYzKCksIGtub3QpIDogdGFuZ2VudE91dFZlYyh2MygpLCBrbm90KTtcbiAgICByZXR1cm4gdG9Xb3JsZChjb21wLCBhZGQodjMoKSwga25vdC5wb3NpdGlvbiwgdmVjKSwgb3V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRXb3JsZFBvc2l0aW9uKGU6IEVsZW1lbnRSZWYsIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIGlmIChlLnBhcnQgPT09ICdrbm90JykgcmV0dXJuIGtub3RXb3JsZFBvc2l0aW9uKGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgb3V0KTtcbiAgICByZXR1cm4gdGFuZ2VudFdvcmxkUG9zaXRpb24oZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCBlLnBhcnQsIG91dCk7XG59XG5cbi8qKiBNb3ZlcyBhIGtub3QgdG8gYSB3b3JsZCBwb3NpdGlvbiAobGlua2VkIGtub3RzIGZvbGxvdykuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0S25vdFdvcmxkKGNvbXA6IGFueSwgczogbnVtYmVyLCBrOiBudW1iZXIsIHdvcmxkOiBWMyk6IHZvaWQge1xuICAgIGNvbnN0IGxvY2FsID0gdG9Mb2NhbChjb21wLCB3b3JsZCk7XG4gICAgc2V0S25vdFBvc2l0aW9uKGNvbXAuc3BsaW5lc1tzXSwgaywgbG9jYWwpO1xuICAgIHN5bmNMaW5rZWQoY29tcCwgeyBzcGxpbmU6IHMsIGtub3Q6IGsgfSk7XG59XG5cbi8qKiBQdXRzIGEgdGFuZ2VudCBoYW5kbGUncyBlbmQgcG9pbnQgYXQgYSB3b3JsZCBwb3NpdGlvbiAodGhlIGtub3QncyBtb2RlIGlzIGtlcHQpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRhbmdlbnRXb3JsZChjb21wOiBhbnksIHM6IG51bWJlciwgazogbnVtYmVyLCBwYXJ0OiAnaW4nIHwgJ291dCcsIHdvcmxkOiBWMyk6IHZvaWQge1xuICAgIGNvbnN0IHNwbGluZSA9IGNvbXAuc3BsaW5lc1tzXTtcbiAgICBjb25zdCBrbm90ID0gc3BsaW5lLmtub3RzW2tdO1xuICAgIGNvbnN0IGxvY2FsID0gdG9Mb2NhbChjb21wLCB3b3JsZCk7XG4gICAgc2V0VGFuZ2VudFZlYyhzcGxpbmUsIGssIHBhcnQsIHN1Yih2MygpLCBsb2NhbCwga25vdC5wb3NpdGlvbikpO1xufVxuXG4vKiogU2V0cyBhIHRhbmdlbnQgZnJvbSBhIHdvcmxkLXNwYWNlIG9mZnNldCB2ZWN0b3IuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VGFuZ2VudFdvcmxkVmVjKGNvbXA6IGFueSwgczogbnVtYmVyLCBrOiBudW1iZXIsIHBhcnQ6ICdpbicgfCAnb3V0Jywgd29ybGRWZWM6IFYzKTogdm9pZCB7XG4gICAgc2V0VGFuZ2VudFZlYyhjb21wLnNwbGluZXNbc10sIGssIHBhcnQsIGRpclRvTG9jYWwoY29tcCwgd29ybGRWZWMpKTtcbn1cblxuLyoqIFdvcmxkLXNwYWNlIHRhbmdlbnQgb2Zmc2V0IHZlY3Rvci4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0YW5nZW50V29ybGRWZWMoY29tcDogYW55LCBzOiBudW1iZXIsIGs6IG51bWJlciwgcGFydDogJ2luJyB8ICdvdXQnLCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICBjb25zdCBrbm90ID0gY29tcC5zcGxpbmVzW3NdLmtub3RzW2tdO1xuICAgIGNvbnN0IHZlYyA9IHBhcnQgPT09ICdpbicgPyB0YW5nZW50SW5WZWModjMoKSwga25vdCkgOiB0YW5nZW50T3V0VmVjKHYzKCksIGtub3QpO1xuICAgIHJldHVybiBkaXJUb1dvcmxkKGNvbXAsIHZlYywgb3V0KTtcbn1cblxuLyoqIFNldHMgYSBrbm90J3Mgcm90YXRpb24gZnJvbSBhIHdvcmxkIHJvdGF0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEtub3RXb3JsZFJvdGF0aW9uKGNvbXA6IGFueSwgazogYW55LCB3b3JsZDogUTQpOiB2b2lkIHtcbiAgICBjb25zdCBsb2NhbCA9IHFNdWwocTQoKSwgcUludmVydChxNCgpLCBjb250YWluZXJSb3RhdGlvbihjb21wKSksIHdvcmxkKTtcbiAgICBxTm9ybWFsaXplKGsucm90YXRpb24sIGxvY2FsKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHRhcmdldHNcblxuLyoqIFNwbGluZUNvbnRhaW5lcnMgb24gdGhlIHNlbGVjdGVkIG5vZGVzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRUYXJnZXRzKCk6IGFueVtdIHtcbiAgICBjb25zdCBDID0gY29udGFpbmVyQ2xhc3MoKTtcbiAgICBpZiAoIUMpIHJldHVybiBbXTtcbiAgICBjb25zdCByZXM6IGFueVtdID0gW107XG4gICAgZm9yIChjb25zdCB1dWlkIG9mIHNlbGVjdGVkTm9kZVV1aWRzKCkpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmROb2RlKHV1aWQpO1xuICAgICAgICBpZiAoIW5vZGUgfHwgIW5vZGUuaXNWYWxpZCB8fCAhbm9kZS5hY3RpdmVJbkhpZXJhcmNoeSkgY29udGludWU7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBub2RlLmdldENvbXBvbmVudChDKTtcbiAgICAgICAgaWYgKGNvbXAgJiYgY29tcC5lbmFibGVkSW5IaWVyYXJjaHkpIHJlcy5wdXNoKGNvbXApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNlbGVjdGlvblxuXG5leHBvcnQgY2xhc3MgRWxlbWVudFNlbGVjdGlvbiB7XG4gICAgcHJpdmF0ZSBtYXAgPSBuZXcgTWFwPHN0cmluZywgRWxlbWVudFJlZj4oKTtcbiAgICBwcml2YXRlIG9yZGVyOiBzdHJpbmdbXSA9IFtdO1xuICAgIC8qKiBCdW1wZWQgb24gZXZlcnkgY2hhbmdlLiAqL1xuICAgIHZlcnNpb24gPSAwO1xuXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnNpemU7XG4gICAgfVxuXG4gICAgaGFzKGU6IEVsZW1lbnRSZWYpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmhhcyhlbGVtZW50S2V5KGUpKTtcbiAgICB9XG5cbiAgICBhZGQoZTogRWxlbWVudFJlZik6IHZvaWQge1xuICAgICAgICBjb25zdCBrID0gZWxlbWVudEtleShlKTtcbiAgICAgICAgaWYgKHRoaXMubWFwLmhhcyhrKSkge1xuICAgICAgICAgICAgLy8gUmUtYWRkaW5nIG1ha2VzIGl0IHRoZSBhY3RpdmUgZWxlbWVudC5cbiAgICAgICAgICAgIHRoaXMub3JkZXIuc3BsaWNlKHRoaXMub3JkZXIuaW5kZXhPZihrKSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXAuc2V0KGssIHsgLi4uZSB9KTtcbiAgICAgICAgdGhpcy5vcmRlci5wdXNoKGspO1xuICAgICAgICB0aGlzLnZlcnNpb24rKztcbiAgICB9XG5cbiAgICByZW1vdmUoZTogRWxlbWVudFJlZik6IHZvaWQge1xuICAgICAgICBjb25zdCBrID0gZWxlbWVudEtleShlKTtcbiAgICAgICAgaWYgKCF0aGlzLm1hcC5kZWxldGUoaykpIHJldHVybjtcbiAgICAgICAgdGhpcy5vcmRlci5zcGxpY2UodGhpcy5vcmRlci5pbmRleE9mKGspLCAxKTtcbiAgICAgICAgdGhpcy52ZXJzaW9uKys7XG4gICAgfVxuXG4gICAgdG9nZ2xlKGU6IEVsZW1lbnRSZWYpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGUpKSB0aGlzLnJlbW92ZShlKTtcbiAgICAgICAgZWxzZSB0aGlzLmFkZChlKTtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcC5zaXplKSByZXR1cm47XG4gICAgICAgIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgICAgIHRoaXMub3JkZXIubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy52ZXJzaW9uKys7XG4gICAgfVxuXG4gICAgc2V0KGxpc3Q6IEVsZW1lbnRSZWZbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcC5jbGVhcigpO1xuICAgICAgICB0aGlzLm9yZGVyLmxlbmd0aCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgZSBvZiBsaXN0KSB7XG4gICAgICAgICAgICBjb25zdCBrID0gZWxlbWVudEtleShlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcC5oYXMoaykpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpcy5tYXAuc2V0KGssIHsgLi4uZSB9KTtcbiAgICAgICAgICAgIHRoaXMub3JkZXIucHVzaChrKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZlcnNpb24rKztcbiAgICB9XG5cbiAgICBhbGwoKTogRWxlbWVudFJlZltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JkZXIubWFwKChrKSA9PiB0aGlzLm1hcC5nZXQoaykhKTtcbiAgICB9XG5cbiAgICBrbm90cygpOiBFbGVtZW50UmVmW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGwoKS5maWx0ZXIoKGUpID0+IGUucGFydCA9PT0gJ2tub3QnKTtcbiAgICB9XG5cbiAgICB0YW5nZW50cygpOiBFbGVtZW50UmVmW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGwoKS5maWx0ZXIoKGUpID0+IGUucGFydCAhPT0gJ2tub3QnKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGxhc3Qgc2VsZWN0ZWQgZWxlbWVudC4gKi9cbiAgICBhY3RpdmUoKTogRWxlbWVudFJlZiB8IG51bGwge1xuICAgICAgICBjb25zdCBrID0gdGhpcy5vcmRlclt0aGlzLm9yZGVyLmxlbmd0aCAtIDFdO1xuICAgICAgICByZXR1cm4gayA/IHRoaXMubWFwLmdldChrKSEgOiBudWxsO1xuICAgIH1cblxuICAgIGhhc0tub3QoY29tcDogYW55LCBzcGxpbmU6IG51bWJlciwga25vdDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5oYXMoYCR7Y29tcC51dWlkfToke3NwbGluZX06JHtrbm90fTprbm90YCk7XG4gICAgfVxuXG4gICAgaGFzQW55T2YoY29tcDogYW55LCBzcGxpbmU6IG51bWJlciwga25vdDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHAgPSBgJHtjb21wLnV1aWR9OiR7c3BsaW5lfToke2tub3R9OmA7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5oYXMoYCR7cH1rbm90YCkgfHwgdGhpcy5tYXAuaGFzKGAke3B9aW5gKSB8fCB0aGlzLm1hcC5oYXMoYCR7cH1vdXRgKTtcbiAgICB9XG5cbiAgICAvKiogRHJvcHMgZWxlbWVudHMgdGhhdCBubyBsb25nZXIgZXhpc3Qgb3IgYmVsb25nIHRvIGNvbnRhaW5lcnMgbm90IGVkaXRlZC4gKi9cbiAgICB2YWxpZGF0ZSh0YXJnZXRzOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IGsgb2YgWy4uLnRoaXMub3JkZXJdKSB7XG4gICAgICAgICAgICBjb25zdCBlID0gdGhpcy5tYXAuZ2V0KGspITtcbiAgICAgICAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQoZSkgfHwgIXRhcmdldHMuaW5jbHVkZXMoZS5jb21wKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLmRlbGV0ZShrKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyLnNwbGljZSh0aGlzLm9yZGVyLmluZGV4T2YoayksIDEpO1xuICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VkKSB0aGlzLnZlcnNpb24rKztcbiAgICAgICAgcmV0dXJuIGNoYW5nZWQ7XG4gICAgfVxuXG4gICAgLyoqIENvbXBzIHRoYXQgaGF2ZSBzZWxlY3RlZCBlbGVtZW50cy4gKi9cbiAgICBjb21wcygpOiBhbnlbXSB7XG4gICAgICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8YW55PigpO1xuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgdGhpcy5tYXAudmFsdWVzKCkpIHNldC5hZGQoZS5jb21wKTtcbiAgICAgICAgcmV0dXJuIFsuLi5zZXRdO1xuICAgIH1cbn1cblxuLyoqIFdvcmxkLXNwYWNlIGNlbnRyb2lkIG9mIGVsZW1lbnRzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNlbnRyb2lkKGxpc3Q6IEVsZW1lbnRSZWZbXSwgb3V0OiBWMyA9IHYzKCkpOiBWMyB7XG4gICAgY29weShvdXQsIHYzKCkpO1xuICAgIGlmICghbGlzdC5sZW5ndGgpIHJldHVybiBvdXQ7XG4gICAgY29uc3QgcCA9IHYzKCk7XG4gICAgZm9yIChjb25zdCBlIG9mIGxpc3QpIGFkZChvdXQsIG91dCwgZWxlbWVudFdvcmxkUG9zaXRpb24oZSwgcCkpO1xuICAgIG91dC54IC89IGxpc3QubGVuZ3RoO1xuICAgIG91dC55IC89IGxpc3QubGVuZ3RoO1xuICAgIG91dC56IC89IGxpc3QubGVuZ3RoO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKiBEaXJlY3Rpb24gb2YgYSB0YW5nZW50IGVsZW1lbnQgaW4gd29ybGQgc3BhY2UgKHVuaXQpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhbmdlbnREaXJlY3Rpb25Xb3JsZChlOiBFbGVtZW50UmVmLCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICBpZiAoZS5wYXJ0ID09PSAna25vdCcpIHJldHVybiBvdXQ7XG4gICAgdGFuZ2VudFdvcmxkVmVjKGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgZS5wYXJ0LCBvdXQpO1xuICAgIGlmIChsZW5TcShvdXQpID4gMWUtMTIpIG5vcm1hbGl6ZShvdXQsIG91dCk7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IHsgcVJvdGF0ZSB9O1xuIiwgIi8qKlxuICogRWRpdGluZyBzdGF0ZSBzaGFyZWQgYnkgdGhlIHNjZW5lIHNjcmlwdCdzIG1vZHVsZXMuXG4gKi9cbmltcG9ydCB7IEVsZW1lbnRSZWYsIEVsZW1lbnRTZWxlY3Rpb24gfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7IFYzIH0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvbWF0aCc7XG5pbXBvcnQgeyBUYW5nZW50TW9kZSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL3NwbGluZS1jb3JlJztcblxuZXhwb3J0IHR5cGUgVG9vbCA9ICdzZWxlY3QnIHwgJ2RyYXcnO1xuZXhwb3J0IHR5cGUgT3JpZW50YXRpb24gPSAnZ2xvYmFsJyB8ICdsb2NhbCcgfCAnZWxlbWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3Mge1xuICAgIC8qKiBEcmF3IHNwbGluZXMgb2YgdW5zZWxlY3RlZCBub2RlcyB0b28uICovXG4gICAgc2hvd0FsbDogYm9vbGVhbjtcbiAgICAvKiogQXJyb3dzIHNob3dpbmcgdGhlIGRpcmVjdGlvbiBvZiB0cmF2ZWwuICovXG4gICAgc2hvd0Zsb3c6IGJvb2xlYW47XG4gICAgLyoqIFRhbmdlbnQgaGFuZGxlcyBvZiBldmVyeSBrbm90LCBub3Qgb25seSB0aGUgc2VsZWN0ZWQgb25lcy4gKi9cbiAgICBzaG93QWxsVGFuZ2VudHM6IGJvb2xlYW47XG4gICAgLyoqIEtub3QgaW5kZXggbGFiZWxzLiAqL1xuICAgIHNob3dLbm90SW5kaWNlczogYm9vbGVhbjtcbiAgICAvKiogVXAgdmVjdG9ycyBhbG9uZyB0aGUgc3BsaW5lLiAqL1xuICAgIHNob3dOb3JtYWxzOiBib29sZWFuO1xuICAgIC8qKiBNb2RlIG9mIGtub3RzIHBsYWNlZCB3aXRoIHRoZSBEcmF3IHRvb2wgKEF1dG9TbW9vdGggb3IgTGluZWFyKS4gKi9cbiAgICBkZWZhdWx0TW9kZTogbnVtYmVyO1xuICAgIC8qKiBQbGFjZSBkcmF3biBrbm90cyBvbiBzY2VuZSBnZW9tZXRyeSB1bmRlciB0aGUgbW91c2UuICovXG4gICAgZHJhd09uU3VyZmFjZXM6IGJvb2xlYW47XG4gICAgLyoqIEhhbmRsZSBvcmllbnRhdGlvbiBmb3Iga25vdCBlZGl0aW5nLiAqL1xuICAgIG9yaWVudGF0aW9uOiBPcmllbnRhdGlvbjtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFNldHRpbmdzID0ge1xuICAgIHNob3dBbGw6IHRydWUsXG4gICAgc2hvd0Zsb3c6IHRydWUsXG4gICAgc2hvd0FsbFRhbmdlbnRzOiBmYWxzZSxcbiAgICBzaG93S25vdEluZGljZXM6IGZhbHNlLFxuICAgIHNob3dOb3JtYWxzOiBmYWxzZSxcbiAgICBkZWZhdWx0TW9kZTogVGFuZ2VudE1vZGUuQXV0b1Ntb290aCxcbiAgICBkcmF3T25TdXJmYWNlczogdHJ1ZSxcbiAgICBvcmllbnRhdGlvbjogJ2dsb2JhbCcsXG59O1xuXG5leHBvcnQgdHlwZSBIYW5kbGVBeGlzID0gJ3gnIHwgJ3knIHwgJ3onIHwgJ3h5JyB8ICd5eicgfCAneHonIHwgJ3ZpZXcnIHwgJ2ZyZWUnO1xuXG5leHBvcnQgdHlwZSBIaXQgPVxuICAgIHwgeyBraW5kOiAnaGFuZGxlJzsgYXhpczogSGFuZGxlQXhpcyB9XG4gICAgfCB7IGtpbmQ6ICdrbm90JzsgcmVmOiBFbGVtZW50UmVmIH1cbiAgICB8IHsga2luZDogJ3RhbmdlbnQnOyByZWY6IEVsZW1lbnRSZWYgfVxuICAgIHwgeyBraW5kOiAnY3VydmUnOyBjb21wOiBhbnk7IHNwbGluZTogbnVtYmVyOyBjdXJ2ZTogbnVtYmVyOyB0OiBudW1iZXI7IHdvcmxkOiBWMyB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIERyYXdTdGF0ZSB7XG4gICAgY29tcDogYW55O1xuICAgIHNwbGluZTogbnVtYmVyO1xuICAgIC8qKiBLbm90cyBhcmUgYWRkZWQgYWZ0ZXIgdGhlIGxhc3Qga25vdCAoJ2VuZCcpIG9yIGJlZm9yZSB0aGUgZmlyc3QgKCdzdGFydCcpLiAqL1xuICAgIGVuZDogJ3N0YXJ0JyB8ICdlbmQnO1xufVxuXG5leHBvcnQgY29uc3QgUyA9IHtcbiAgICAvKiogVGhpcyBwcm9jZXNzIGlzIHRoZSBlZGl0IHNjZW5lIChQbGF5LWluLUVkaXRvcidzIHByb2Nlc3Mgb25seSBkcmF3cykuICovXG4gICAgcHJpbWFyeTogZmFsc2UsXG4gICAgaG9va2VkOiBmYWxzZSxcbiAgICAvKiogU3BsaW5lIGVkaXRpbmcgY29udGV4dCBpcyBvbiAoVW5pdHkncyBzcGxpbmUgdG9vbCBjb250ZXh0KS4gKi9cbiAgICBjb250ZXh0OiBmYWxzZSxcbiAgICB0b29sOiAnc2VsZWN0JyBhcyBUb29sLFxuICAgIHNlbGVjdGlvbjogbmV3IEVsZW1lbnRTZWxlY3Rpb24oKSxcbiAgICBob3ZlcjogbnVsbCBhcyBIaXQgfCBudWxsLFxuICAgIC8qKiBTcGxpbmUgYmVpbmcgZHJhd24gYnkgdGhlIERyYXcgdG9vbC4gKi9cbiAgICBkcmF3aW5nOiBudWxsIGFzIERyYXdTdGF0ZSB8IG51bGwsXG4gICAgLyoqIEluZGV4IChpbiB0aGUgZWRpdGVkIGNvbnRhaW5lcnMpIG9mIHRoZSBjb250YWluZXIgdGhlIERyYXcgdG9vbCBhZGRzIHRvLiAqL1xuICAgIGRyYXdUYXJnZXQ6IDAsXG4gICAgLyoqIERyYXcgdG9vbCBwcmV2aWV3IHBvc2l0aW9uICh3b3JsZCkuICovXG4gICAgcHJldmlldzogbnVsbCBhcyBWMyB8IG51bGwsXG4gICAgc2V0dGluZ3M6IHsgLi4uREVGQVVMVF9TRVRUSU5HUyB9LFxuICAgIC8qKiBMYXN0IHRpbWUgYSBkZWxldGUga2V5IHdlbnQgdGhyb3VnaCB0aGUgc2NlbmUgdmlldy4gKi9cbiAgICBkZWxldGVLZXlBdDogMCxcbiAgICBzZWxlY3RBbGxLZXlBdDogMCxcbiAgICAvKiogUmVwbGF5aW5nIGEgY2xpY2sgaW50byB0aGUgZWRpdG9yJ3Mgb3duIGhhbmRsZXJzLiAqL1xuICAgIHJlcGxheWluZzogZmFsc2UsXG4gICAgbGFzdFRhcmdldHM6IFtdIGFzIGFueVtdLFxuICAgIC8qKiBFbnRlciB0aGUgY29udGV4dCAod2l0aCBhIHRvb2wpIHdoZW4gdGhpcyBjb250YWluZXIgYmVjb21lcyBzZWxlY3RlZC4gKi9cbiAgICBwZW5kaW5nQ29udGV4dDogbnVsbCBhcyB7IGNvbXA6IGFueTsgdG9vbDogVG9vbDsgdW50aWw6IG51bWJlciB9IHwgbnVsbCxcbiAgICB0YXJnZXRzS2V5OiAnJyxcbiAgICBzdGF0ZVZlcnNpb246IDAsXG4gICAgZGlhZzoge1xuICAgICAgICBkcmF3czogMCxcbiAgICAgICAgbW91c2VEb3duczogMCxcbiAgICAgICAgYmxvY2tlZDogMCxcbiAgICAgICAgZXJyb3JzOiBbXSBhcyBzdHJpbmdbXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vdGUobXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBTLmRpYWcuZXJyb3JzLnB1c2goYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfSAke21zZ31gKTtcbiAgICBpZiAoUy5kaWFnLmVycm9ycy5sZW5ndGggPiAzMCkgUy5kaWFnLmVycm9ycy5zaGlmdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVtcFN0YXRlKCk6IHZvaWQge1xuICAgIFMuc3RhdGVWZXJzaW9uKys7XG59XG4iLCAiLyoqXG4gKiBUaGUgU2NlbmUgdmlldyBjYW1lcmEgYW5kIHNjcmVlbi1zcGFjZSBoZWxwZXJzLlxuICpcbiAqIFNjcmVlbiBjb29yZGluYXRlcyBmb2xsb3cgdGhlIGVuZ2luZSdzIGNhbWVyYSBjb252ZW50aW9uOiBwaXhlbHMgb2YgdGhlXG4gKiByZW5kZXIgd2luZG93IHdpdGggdGhlIG9yaWdpbiBhdCB0aGUgYm90dG9tLWxlZnQgKHdoYXQgc2NyZWVuUG9pbnRUb1JheVxuICogYW5kIHdvcmxkVG9TY3JlZW4gdXNlKS5cbiAqL1xuaW1wb3J0IHsgVjMsIHYzLCBzZXQsIHN1YiwgZG90LCBub3JtYWxpemUsIGxlbiwgY3Jvc3MsIHNjYWxlQW5kQWRkLCBFUFNJTE9OIH0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvbWF0aCc7XG5pbXBvcnQgeyBjYyB9IGZyb20gJy4vZW52JztcblxuZXhwb3J0IGludGVyZmFjZSBTY3JlZW5Qb2ludCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICAvKiogSW4gZnJvbnQgb2YgdGhlIGNhbWVyYS4gKi9cbiAgICB2aXNpYmxlOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJheSB7XG4gICAgbzogVjM7XG4gICAgZDogVjM7XG59XG5cbmxldCBsYXN0Q2FtZXJhOiBhbnkgPSBudWxsO1xuXG4vKiogVGhlIFNjZW5lIHZpZXcgY2FtZXJhIChub3QgZ2FtZSBjYW1lcmFzLCBub3QgdGhlIGdpem1vIGNhbWVyYSkuICovXG5leHBvcnQgZnVuY3Rpb24gc2NlbmVDYW1lcmEoKTogYW55IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGRpcmVjdG9yLCByZW5kZXJlciB9ID0gY2MoKTtcbiAgICAgICAgY29uc3Qgcm9vdDogYW55ID0gZGlyZWN0b3Iucm9vdDtcbiAgICAgICAgaWYgKCFyb290KSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKGxhc3RDYW1lcmEgJiYgbGFzdENhbWVyYS5lbmFibGVkICYmIGxhc3RDYW1lcmEud2luZG93ID09PSByb290Lm1haW5XaW5kb3cgJiYgcm9vdC5jYW1lcmFMaXN0LmluY2x1ZGVzKGxhc3RDYW1lcmEpKSByZXR1cm4gbGFzdENhbWVyYTtcbiAgICAgICAgZm9yIChjb25zdCBjYW0gb2Ygcm9vdC5jYW1lcmFMaXN0KSB7XG4gICAgICAgICAgICBpZiAoY2FtLmNhbWVyYVVzYWdlID09PSByZW5kZXJlci5zY2VuZS5DYW1lcmFVc2FnZS5TQ0VORV9WSUVXICYmIGNhbS5lbmFibGVkICYmIGNhbS53aW5kb3cgPT09IHJvb3QubWFpbldpbmRvdykge1xuICAgICAgICAgICAgICAgIGxhc3RDYW1lcmEgPSBjYW07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBlbmdpbmUgbm90IHJlYWR5XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfdG1wID0gdjMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVyYVBvc2l0aW9uKGNhbTogYW55LCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICBjb25zdCBwID0gY2FtLm5vZGUud29ybGRQb3NpdGlvbjtcbiAgICByZXR1cm4gc2V0KG91dCwgcC54LCBwLnksIHAueik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lcmFGb3J3YXJkKGNhbTogYW55LCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICBjb25zdCBmID0gY2FtLmZvcndhcmQgPz8gY2FtLm5vZGUuZm9yd2FyZDtcbiAgICByZXR1cm4gbm9ybWFsaXplKG91dCwgc2V0KG91dCwgZi54LCBmLnksIGYueikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FtZXJhUmlnaHQoY2FtOiBhbnksIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIGNvbnN0IHIgPSBjYW0ubm9kZS5yaWdodDtcbiAgICByZXR1cm4gbm9ybWFsaXplKG91dCwgc2V0KG91dCwgci54LCByLnksIHIueikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FtZXJhVXAoY2FtOiBhbnksIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIGNvbnN0IHUgPSBjYW0ubm9kZS51cDtcbiAgICByZXR1cm4gbm9ybWFsaXplKG91dCwgc2V0KG91dCwgdS54LCB1LnksIHUueikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPcnRobyhjYW06IGFueSk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjYW0ucHJvamVjdGlvblR5cGUgPT09IGNjKCkucmVuZGVyZXIuc2NlbmUuQ2FtZXJhUHJvamVjdGlvbi5PUlRITztcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuY29uc3QgX3dzID0gdjMoKTtcbmNvbnN0IF9mdyA9IHYzKCk7XG5cbi8qKiBXb3JsZCBwb3NpdGlvbiB0byBzY3JlZW4gcGl4ZWxzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvU2NyZWVuKGNhbTogYW55LCBwOiBWMywgb3V0OiBTY3JlZW5Qb2ludCA9IHsgeDogMCwgeTogMCwgdmlzaWJsZTogdHJ1ZSB9KTogU2NyZWVuUG9pbnQge1xuICAgIC8vIHdvcmxkVG9TY3JlZW4gb25seSByZWFkcy93cml0ZXMgeCwgeSwgeiwgc28gcGxhaW4gb2JqZWN0cyBkby5cbiAgICBjYW0ud29ybGRUb1NjcmVlbihfd3MsIHApO1xuICAgIG91dC54ID0gX3dzLng7XG4gICAgb3V0LnkgPSBfd3MueTtcbiAgICBpZiAoaXNPcnRobyhjYW0pKSBvdXQudmlzaWJsZSA9IHRydWU7XG4gICAgZWxzZSB7XG4gICAgICAgIGNhbWVyYVBvc2l0aW9uKGNhbSwgX3RtcCk7XG4gICAgICAgIGNhbWVyYUZvcndhcmQoY2FtLCBfZncpO1xuICAgICAgICBvdXQudmlzaWJsZSA9IGRvdChzdWIoX3RtcCwgcCwgX3RtcCksIF9mdykgPiAoY2FtLm5lYXJDbGlwID8/IDAuMDEpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKiogUmF5IGZyb20gdGhlIGNhbWVyYSB0aHJvdWdoIGEgc2NyZWVuIHBpeGVsLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjcmVlblJheShjYW06IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBSYXkge1xuICAgIGNvbnN0IHsgZ2VvbWV0cnkgfSA9IGNjKCk7XG4gICAgY29uc3QgciA9IG5ldyBnZW9tZXRyeS5SYXkoKTtcbiAgICBjYW0uc2NyZWVuUG9pbnRUb1JheShyLCB4LCB5KTtcbiAgICByZXR1cm4geyBvOiB2MyhyLm8ueCwgci5vLnksIHIuby56KSwgZDogbm9ybWFsaXplKHYzKCksIHYzKHIuZC54LCByLmQueSwgci5kLnopKSB9O1xufVxuXG4vKiogV29ybGQgdW5pdHMgcGVyIHNjcmVlbiBwaXhlbCBhdCBhIHdvcmxkIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdvcmxkUGVyUGl4ZWwoY2FtOiBhbnksIHA6IFYzKTogbnVtYmVyIHtcbiAgICBjb25zdCByaWdodCA9IGNhbWVyYVJpZ2h0KGNhbSk7XG4gICAgY29uc3QgYSA9IHRvU2NyZWVuKGNhbSwgcCk7XG4gICAgY29uc3QgYiA9IHRvU2NyZWVuKGNhbSwgc2NhbGVBbmRBZGQodjMoKSwgcCwgcmlnaHQsIDEpKTtcbiAgICBjb25zdCBkID0gTWF0aC5oeXBvdChiLnggLSBhLngsIGIueSAtIGEueSk7XG4gICAgaWYgKCEoZCA+IEVQU0lMT04pIHx8ICFhLnZpc2libGUpIHtcbiAgICAgICAgLy8gQmVoaW5kIHRoZSBjYW1lcmEgb3IgZGVnZW5lcmF0ZTogdXNlIHRoZSBkaXN0YW5jZSB0byB0aGUgY2FtZXJhLlxuICAgICAgICBjb25zdCBkaXN0ID0gbGVuKHN1Yih2MygpLCBwLCBjYW1lcmFQb3NpdGlvbihjYW0pKSk7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChkaXN0LCAxKSAqIDAuMDAyO1xuICAgIH1cbiAgICByZXR1cm4gMSAvIGQ7XG59XG5cbi8qKiBJbnRlcnNlY3Rpb24gb2YgYSByYXkgd2l0aCBhIHBsYW5lIChwb2ludCArIG5vcm1hbCk7IG51bGwgaWYgcGFyYWxsZWwgb3IgYmVoaW5kLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJheVBsYW5lKHJheTogUmF5LCBwb2ludDogVjMsIG5vcm1hbDogVjMsIGFsbG93QmVoaW5kID0gZmFsc2UpOiBWMyB8IG51bGwge1xuICAgIGNvbnN0IGRlbm9tID0gZG90KHJheS5kLCBub3JtYWwpO1xuICAgIGlmIChNYXRoLmFicyhkZW5vbSkgPCAxZS02KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB0ID0gZG90KHN1Yih2MygpLCBwb2ludCwgcmF5Lm8pLCBub3JtYWwpIC8gZGVub207XG4gICAgaWYgKHQgPCAwICYmICFhbGxvd0JlaGluZCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHNjYWxlQW5kQWRkKHYzKCksIHJheS5vLCByYXkuZCwgdCk7XG59XG5cbi8qKiBQb2ludCBvbiB0aGUgbGluZSAob3JpZ2luICsgcyAqIGRpcikgY2xvc2VzdCB0byB0aGUgcmF5LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3RPbkxpbmUocmF5OiBSYXksIG9yaWdpbjogVjMsIGRpcjogVjMpOiBWMyB8IG51bGwge1xuICAgIC8vIE1pbmltaXplIHwobzEgKyBzIGQxKSAtIChvMiArIHQgZDIpfC5cbiAgICBjb25zdCBkMSA9IG5vcm1hbGl6ZSh2MygpLCBkaXIpO1xuICAgIGNvbnN0IGQyID0gcmF5LmQ7XG4gICAgY29uc3QgciA9IHN1Yih2MygpLCBvcmlnaW4sIHJheS5vKTtcbiAgICBjb25zdCBhID0gZG90KGQxLCBkMSk7XG4gICAgY29uc3QgYiA9IGRvdChkMSwgZDIpO1xuICAgIGNvbnN0IGMgPSBkb3QoZDIsIGQyKTtcbiAgICBjb25zdCBkID0gZG90KGQxLCByKTtcbiAgICBjb25zdCBlID0gZG90KGQyLCByKTtcbiAgICBjb25zdCBkZW5vbSA9IGEgKiBjIC0gYiAqIGI7XG4gICAgaWYgKE1hdGguYWJzKGRlbm9tKSA8IDFlLTgpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHMgPSAoYiAqIGUgLSBjICogZCkgLyBkZW5vbTtcbiAgICByZXR1cm4gc2NhbGVBbmRBZGQodjMoKSwgb3JpZ2luLCBkMSwgcyk7XG59XG5cbi8qKiBEaXN0YW5jZSBmcm9tIHBvaW50IChweCwgcHkpIHRvIHRoZSBzZWdtZW50IGEtYiBpbiBzY3JlZW4gc3BhY2UuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzdFRvU2VnbWVudChweDogbnVtYmVyLCBweTogbnVtYmVyLCBheDogbnVtYmVyLCBheTogbnVtYmVyLCBieDogbnVtYmVyLCBieTogbnVtYmVyKTogeyBkaXN0OiBudW1iZXI7IGY6IG51bWJlciB9IHtcbiAgICBjb25zdCBkeCA9IGJ4IC0gYXg7XG4gICAgY29uc3QgZHkgPSBieSAtIGF5O1xuICAgIGNvbnN0IGwyID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgbGV0IGYgPSBsMiA+IDAgPyAoKHB4IC0gYXgpICogZHggKyAocHkgLSBheSkgKiBkeSkgLyBsMiA6IDA7XG4gICAgZiA9IGYgPCAwID8gMCA6IGYgPiAxID8gMSA6IGY7XG4gICAgY29uc3QgeCA9IGF4ICsgZHggKiBmIC0gcHg7XG4gICAgY29uc3QgeSA9IGF5ICsgZHkgKiBmIC0gcHk7XG4gICAgcmV0dXJuIHsgZGlzdDogTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpLCBmIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2ludEluUG9seWdvbihweDogbnVtYmVyLCBweTogbnVtYmVyLCBwdHM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVtdKTogYm9vbGVhbiB7XG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwLCBqID0gcHRzLmxlbmd0aCAtIDE7IGkgPCBwdHMubGVuZ3RoOyBqID0gaSsrKSB7XG4gICAgICAgIGNvbnN0IGEgPSBwdHNbaV07XG4gICAgICAgIGNvbnN0IGIgPSBwdHNbal07XG4gICAgICAgIGlmICgoYS55ID4gcHkpICE9PSAoYi55ID4gcHkpICYmIHB4IDwgKChiLnggLSBhLngpICogKHB5IC0gYS55KSkgLyAoYi55IC0gYS55KSArIGEueCkgaW5zaWRlID0gIWluc2lkZTtcbiAgICB9XG4gICAgcmV0dXJuIGluc2lkZTtcbn1cblxuLyoqIEEgcGxhbmUgZmFjaW5nIHRoZSBjYW1lcmEgdGhyb3VnaCBhIHBvaW50IChmb3IgZnJlZSBkcmFnZ2luZykuICovXG5leHBvcnQgZnVuY3Rpb24gdmlld1BsYW5lTm9ybWFsKGNhbTogYW55LCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICByZXR1cm4gY2FtZXJhRm9yd2FyZChjYW0sIG91dCk7XG59XG5cbi8qKiBSaWdodCAvIHVwIGF4ZXMgcGVycGVuZGljdWxhciB0byBgbmAuICovXG5leHBvcnQgZnVuY3Rpb24gcGxhbmVCYXNpcyhuOiBWMyk6IHsgdTogVjM7IHc6IFYzIH0ge1xuICAgIGNvbnN0IHVwID0gTWF0aC5hYnMobi55KSA8IDAuOTkgPyB2MygwLCAxLCAwKSA6IHYzKDEsIDAsIDApO1xuICAgIGNvbnN0IHUgPSBub3JtYWxpemUodjMoKSwgY3Jvc3ModjMoKSwgdXAsIG4pKTtcbiAgICBjb25zdCB3ID0gbm9ybWFsaXplKHYzKCksIGNyb3NzKHYzKCksIG4sIHUpKTtcbiAgICByZXR1cm4geyB1LCB3IH07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtb3VzZSBldmVudHNcblxuZXhwb3J0IHR5cGUgRXZlbnRDb29yZHMgPSAnZXZlbnQnIHwgJ2V2ZW50LWZsaXBwZWQnIHwgJ2V2ZW50LWNzcycgfCAnZXZlbnQtY3NzLWZsaXBwZWQnIHwgJ2NsaWVudCcgfCAndW5rbm93bic7XG5cbmxldCBjb29yZE1vZGU6IEV2ZW50Q29vcmRzID0gJ3Vua25vd24nO1xubGV0IGNvb3JkU2FtcGxlcyA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBldmVudENvb3JkTW9kZSgpOiBFdmVudENvb3JkcyB7XG4gICAgcmV0dXJuIGNvb3JkTW9kZTtcbn1cblxuZnVuY3Rpb24gY2FudmFzRWxlbWVudCgpOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGMgPSAoY2MoKS5nYW1lIGFzIGFueSkuY2FudmFzIGFzIEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgaWYgKGMgJiYgdHlwZW9mIChjIGFzIGFueSkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID09PSAnZnVuY3Rpb24nKSByZXR1cm4gYztcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJykgOiBudWxsO1xufVxuXG4vKipcbiAqIFNjcmVlbiBwaXhlbHMgKGJvdHRvbS1sZWZ0IG9yaWdpbikgb2YgYSBzY2VuZSBtb3VzZSBldmVudC4gVGhlIGVkaXRvcidzXG4gKiBldmVudCB4L3kgY29udmVudGlvbiBpcyBkZXRlY3RlZCBmcm9tIHRoZSBET00gY29vcmRpbmF0ZXMgb24gZmlyc3QgdXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXZlbnRUb1NjcmVlbihjYW06IGFueSwgZXY6IGFueSk6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzRWxlbWVudCgpO1xuICAgIGNvbnN0IGhhc0NsaWVudCA9IHR5cGVvZiBldi5jbGllbnRYID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgZXYuY2xpZW50WSA9PT0gJ251bWJlcic7XG4gICAgbGV0IGZyb21DbGllbnQ6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGwgPSBudWxsO1xuICAgIGxldCBjc3M6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IHN4OiBudW1iZXI7IHN5OiBudW1iZXI7IGg6IG51bWJlciB9IHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKGNhbnZhcyAmJiBoYXNDbGllbnQpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHJlY3Qud2lkdGggPiAwICYmIHJlY3QuaGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgc3ggPSBjYW0ud2lkdGggLyByZWN0LndpZHRoO1xuICAgICAgICAgICAgY29uc3Qgc3kgPSBjYW0uaGVpZ2h0IC8gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBjeCA9IGV2LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICBjb25zdCBjeSA9IGV2LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgIGNzcyA9IHsgeDogY3gsIHk6IGN5LCBzeCwgc3ksIGg6IHJlY3QuaGVpZ2h0IH07XG4gICAgICAgICAgICBmcm9tQ2xpZW50ID0geyB4OiBjeCAqIHN4LCB5OiAocmVjdC5oZWlnaHQgLSBjeSkgKiBzeSB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGhhc1hZID0gdHlwZW9mIGV2LnggPT09ICdudW1iZXInICYmIHR5cGVvZiBldi55ID09PSAnbnVtYmVyJztcbiAgICBpZiAoY29vcmRNb2RlID09PSAndW5rbm93bicgfHwgKGNvb3JkTW9kZSA9PT0gJ2NsaWVudCcgJiYgY29vcmRTYW1wbGVzIDwgNSkpIHtcbiAgICAgICAgY29vcmRTYW1wbGVzKys7XG4gICAgICAgIGlmIChoYXNYWSAmJiBjc3MpIHtcbiAgICAgICAgICAgIGNvbnN0IG5lYXIgPSAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IE1hdGguYWJzKGEgLSBiKSA8IDIuNTtcbiAgICAgICAgICAgIGlmIChuZWFyKGV2LngsIGNzcy54ICogY3NzLnN4KSAmJiBuZWFyKGV2LnksIChjc3MuaCAtIGNzcy55KSAqIGNzcy5zeSkpIGNvb3JkTW9kZSA9ICdldmVudCc7XG4gICAgICAgICAgICBlbHNlIGlmIChuZWFyKGV2LngsIGNzcy54ICogY3NzLnN4KSAmJiBuZWFyKGV2LnksIGNzcy55ICogY3NzLnN5KSkgY29vcmRNb2RlID0gJ2V2ZW50LWZsaXBwZWQnO1xuICAgICAgICAgICAgZWxzZSBpZiAobmVhcihldi54LCBjc3MueCkgJiYgbmVhcihldi55LCBjc3MuaCAtIGNzcy55KSkgY29vcmRNb2RlID0gJ2V2ZW50LWNzcyc7XG4gICAgICAgICAgICBlbHNlIGlmIChuZWFyKGV2LngsIGNzcy54KSAmJiBuZWFyKGV2LnksIGNzcy55KSkgY29vcmRNb2RlID0gJ2V2ZW50LWNzcy1mbGlwcGVkJztcbiAgICAgICAgICAgIGVsc2UgY29vcmRNb2RlID0gJ2NsaWVudCc7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzWFkpIHtcbiAgICAgICAgICAgIGNvb3JkTW9kZSA9ICdldmVudCc7XG4gICAgICAgIH0gZWxzZSBpZiAoY3NzKSB7XG4gICAgICAgICAgICBjb29yZE1vZGUgPSAnY2xpZW50JztcbiAgICAgICAgfVxuICAgIH1cbiAgICBzd2l0Y2ggKGNvb3JkTW9kZSkge1xuICAgICAgICBjYXNlICdldmVudCc6XG4gICAgICAgICAgICByZXR1cm4geyB4OiBldi54LCB5OiBldi55IH07XG4gICAgICAgIGNhc2UgJ2V2ZW50LWZsaXBwZWQnOlxuICAgICAgICAgICAgcmV0dXJuIHsgeDogZXYueCwgeTogY2FtLmhlaWdodCAtIGV2LnkgfTtcbiAgICAgICAgY2FzZSAnZXZlbnQtY3NzJzpcbiAgICAgICAgICAgIHJldHVybiBjc3MgPyB7IHg6IGV2LnggKiBjc3Muc3gsIHk6IGV2LnkgKiBjc3Muc3kgfSA6IHsgeDogZXYueCwgeTogZXYueSB9O1xuICAgICAgICBjYXNlICdldmVudC1jc3MtZmxpcHBlZCc6XG4gICAgICAgICAgICByZXR1cm4gY3NzID8geyB4OiBldi54ICogY3NzLnN4LCB5OiAoY3NzLmggLSBldi55KSAqIGNzcy5zeSB9IDogeyB4OiBldi54LCB5OiBjYW0uaGVpZ2h0IC0gZXYueSB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGZyb21DbGllbnQgPz8geyB4OiBldi54ID8/IDAsIHk6IGV2LnkgPz8gMCB9O1xuICAgIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIERPTSBvdmVybGF5XG5cbmludGVyZmFjZSBPdmVybGF5IHtcbiAgICByb290OiBIVE1MRGl2RWxlbWVudDtcbiAgICBsYWJlbHM6IEhUTUxEaXZFbGVtZW50W107XG4gICAgdXNlZDogbnVtYmVyO1xuICAgIHJlY3Q6IEhUTUxEaXZFbGVtZW50O1xuICAgIHRpcDogSFRNTERpdkVsZW1lbnQ7XG59XG5cbmxldCBvdmVybGF5OiBPdmVybGF5IHwgbnVsbCA9IG51bGw7XG5cbmZ1bmN0aW9uIGVuc3VyZU92ZXJsYXkoKTogT3ZlcmxheSB8IG51bGwge1xuICAgIGlmIChvdmVybGF5ICYmIG92ZXJsYXkucm9vdC5pc0Nvbm5lY3RlZCkgcmV0dXJuIG92ZXJsYXk7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWRvY3VtZW50LmJvZHkpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByb290LmlkID0gJ3NwbGluZXMtb3ZlcmxheSc7XG4gICAgcm9vdC5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmZpeGVkO2xlZnQ6MDt0b3A6MDt3aWR0aDowO2hlaWdodDowO3BvaW50ZXItZXZlbnRzOm5vbmU7ei1pbmRleDoyMTQ3NDgzMDAwO2ZvbnQ6MTFweC8xLjIgc2Fucy1zZXJpZjsnO1xuICAgIGNvbnN0IHJlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByZWN0LnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7ZGlzcGxheTpub25lO2JvcmRlcjoxcHggc29saWQgcmdiYSg4MCwxNzAsMjU1LDAuOSk7YmFja2dyb3VuZDpyZ2JhKDgwLDE3MCwyNTUsMC4xNSk7cG9pbnRlci1ldmVudHM6bm9uZTsnO1xuICAgIHJvb3QuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgY29uc3QgdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGlwLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7ZGlzcGxheTpub25lO3BhZGRpbmc6MnB4IDZweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOnJnYmEoMjAsMjAsMjAsMC44NSk7Y29sb3I6I2RkZDt3aGl0ZS1zcGFjZTpub3dyYXA7cG9pbnRlci1ldmVudHM6bm9uZTsnO1xuICAgIHJvb3QuYXBwZW5kQ2hpbGQodGlwKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJvb3QpO1xuICAgIG92ZXJsYXkgPSB7IHJvb3QsIGxhYmVsczogW10sIHVzZWQ6IDAsIHJlY3QsIHRpcCB9O1xuICAgIHJldHVybiBvdmVybGF5O1xufVxuXG5mdW5jdGlvbiBjc3NPZihjYW06IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB7IGxlZnQ6IG51bWJlcjsgdG9wOiBudW1iZXIgfSB8IG51bGwge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc0VsZW1lbnQoKTtcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgciA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoIShyLndpZHRoID4gMCkgfHwgIShyLmhlaWdodCA+IDApKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4geyBsZWZ0OiByLmxlZnQgKyAoeCAqIHIud2lkdGgpIC8gY2FtLndpZHRoLCB0b3A6IHIudG9wICsgci5oZWlnaHQgLSAoeSAqIHIuaGVpZ2h0KSAvIGNhbS5oZWlnaHQgfTtcbn1cblxuLyoqIFN0YXJ0cyBhIGZyYW1lIG9mIG92ZXJsYXkgbGFiZWxzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlZ2luTGFiZWxzKCk6IHZvaWQge1xuICAgIGNvbnN0IG8gPSBlbnN1cmVPdmVybGF5KCk7XG4gICAgaWYgKG8pIG8udXNlZCA9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRMYWJlbChjYW06IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHRleHQ6IHN0cmluZywgY29sb3IgPSAnI2ZmZicpOiB2b2lkIHtcbiAgICBjb25zdCBvID0gZW5zdXJlT3ZlcmxheSgpO1xuICAgIGlmICghbykgcmV0dXJuO1xuICAgIGNvbnN0IGNzcyA9IGNzc09mKGNhbSwgeCwgeSk7XG4gICAgaWYgKCFjc3MpIHJldHVybjtcbiAgICBsZXQgZWwgPSBvLmxhYmVsc1tvLnVzZWRdO1xuICAgIGlmICghZWwpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDt0cmFuc2Zvcm06dHJhbnNsYXRlKDZweCwtMTAwJSk7dGV4dC1zaGFkb3c6MCAwIDJweCAjMDAwLDAgMCAycHggIzAwMDtwb2ludGVyLWV2ZW50czpub25lO3doaXRlLXNwYWNlOm5vd3JhcDsnO1xuICAgICAgICBvLnJvb3QuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICBvLmxhYmVscy5wdXNoKGVsKTtcbiAgICB9XG4gICAgby51c2VkKys7XG4gICAgaWYgKGVsLnRleHRDb250ZW50ICE9PSB0ZXh0KSBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgZWwuc3R5bGUuY29sb3IgPSBjb2xvcjtcbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7Y3NzLmxlZnR9cHhgO1xuICAgIGVsLnN0eWxlLnRvcCA9IGAke2Nzcy50b3B9cHhgO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG4vKiogSGlkZXMgbGFiZWxzIG5vdCB1c2VkIHRoaXMgZnJhbWUuICovXG5leHBvcnQgZnVuY3Rpb24gZW5kTGFiZWxzKCk6IHZvaWQge1xuICAgIGNvbnN0IG8gPSBvdmVybGF5O1xuICAgIGlmICghbykgcmV0dXJuO1xuICAgIGZvciAobGV0IGkgPSBvLnVzZWQ7IGkgPCBvLmxhYmVscy5sZW5ndGg7IGkrKykgby5sYWJlbHNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dSZWN0KGNhbTogYW55LCB4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB4MTogbnVtYmVyLCB5MTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbyA9IGVuc3VyZU92ZXJsYXkoKTtcbiAgICBpZiAoIW8pIHJldHVybjtcbiAgICBjb25zdCBhID0gY3NzT2YoY2FtLCBNYXRoLm1pbih4MCwgeDEpLCBNYXRoLm1heCh5MCwgeTEpKTtcbiAgICBjb25zdCBiID0gY3NzT2YoY2FtLCBNYXRoLm1heCh4MCwgeDEpLCBNYXRoLm1pbih5MCwgeTEpKTtcbiAgICBpZiAoIWEgfHwgIWIpIHJldHVybjtcbiAgICBvLnJlY3Quc3R5bGUubGVmdCA9IGAke2EubGVmdH1weGA7XG4gICAgby5yZWN0LnN0eWxlLnRvcCA9IGAke2EudG9wfXB4YDtcbiAgICBvLnJlY3Quc3R5bGUud2lkdGggPSBgJHtNYXRoLm1heCgwLCBiLmxlZnQgLSBhLmxlZnQpfXB4YDtcbiAgICBvLnJlY3Quc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5tYXgoMCwgYi50b3AgLSBhLnRvcCl9cHhgO1xuICAgIG8ucmVjdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVSZWN0KCk6IHZvaWQge1xuICAgIGlmIChvdmVybGF5KSBvdmVybGF5LnJlY3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dUaXAoY2FtOiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBvID0gZW5zdXJlT3ZlcmxheSgpO1xuICAgIGlmICghbykgcmV0dXJuO1xuICAgIGNvbnN0IGNzcyA9IGNzc09mKGNhbSwgeCwgeSk7XG4gICAgaWYgKCFjc3MpIHJldHVybjtcbiAgICBvLnRpcC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgby50aXAuc3R5bGUubGVmdCA9IGAke2Nzcy5sZWZ0ICsgMTR9cHhgO1xuICAgIG8udGlwLnN0eWxlLnRvcCA9IGAke2Nzcy50b3AgKyAxNH1weGA7XG4gICAgby50aXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlVGlwKCk6IHZvaWQge1xuICAgIGlmIChvdmVybGF5KSBvdmVybGF5LnRpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlT3ZlcmxheSgpOiB2b2lkIHtcbiAgICBpZiAob3ZlcmxheT8ucm9vdC5pc0Nvbm5lY3RlZCkgb3ZlcmxheS5yb290LnJlbW92ZSgpO1xuICAgIG92ZXJsYXkgPSBudWxsO1xufVxuIiwgIi8qKlxuICogRHJhd2luZyBpbnRvIHRoZSBTY2VuZSB2aWV3IGNhbWVyYSdzIEdlb21ldHJ5UmVuZGVyZXIuIFNoYXBlcyBhZGRlZCBvblxuICogRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0NPTU1JVCByZW5kZXIgaW4gdGhlIHNhbWUgZnJhbWUuXG4gKlxuICogU2l6ZXMgZ2l2ZW4gaW4gcGl4ZWxzIGFyZSBjb252ZXJ0ZWQgdG8gd29ybGQgdW5pdHMgYXQgdGhlIHNoYXBlJ3MgcG9zaXRpb25cbiAqIHNvIGhhbmRsZXMga2VlcCBhIGNvbnN0YW50IHNpemUgb24gc2NyZWVuLlxuICovXG5pbXBvcnQgeyBWMywgdjMsIHNldCwgYWRkLCBzdWIsIHNjYWxlLCBzY2FsZUFuZEFkZCwgbm9ybWFsaXplLCBjcm9zcywgbGVuU3EsIGNvcHkgfSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9tYXRoJztcbmltcG9ydCB7IGNjIH0gZnJvbSAnLi9lbnYnO1xuaW1wb3J0IHsgY2FtZXJhRm9yd2FyZCwgY2FtZXJhUmlnaHQsIGNhbWVyYVVwLCB3b3JsZFBlclBpeGVsLCB0b1NjcmVlbiB9IGZyb20gJy4vdmlldyc7XG5cbmV4cG9ydCB0eXBlIENvbG9yID0gaW1wb3J0KCdjYycpLkNvbG9yO1xuXG5sZXQgZ3I6IGFueSA9IG51bGw7XG5sZXQgY2FtOiBhbnkgPSBudWxsO1xuY29uc3QgY2FtUmlnaHQgPSB2MygpO1xuY29uc3QgY2FtVXAgPSB2MygpO1xuY29uc3QgY2FtRndkID0gdjMoKTtcblxuLyoqIFN0YXJ0cyBkcmF3aW5nIGZvciB0aGlzIGZyYW1lLiBGYWxzZSBpZiB0aGUgY2FtZXJhIGhhcyBubyBnZW9tZXRyeSByZW5kZXJlci4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWdpbkRyYXcoY2FtZXJhOiBhbnkpOiBib29sZWFuIHtcbiAgICBjYW0gPSBjYW1lcmE7XG4gICAgaWYgKCFjYW1lcmEuZ2VvbWV0cnlSZW5kZXJlciAmJiBjYW1lcmEuaW5pdEdlb21ldHJ5UmVuZGVyZXIpIGNhbWVyYS5pbml0R2VvbWV0cnlSZW5kZXJlcigpO1xuICAgIGdyID0gY2FtZXJhLmdlb21ldHJ5UmVuZGVyZXIgfHwgbnVsbDtcbiAgICBpZiAoIWdyKSByZXR1cm4gZmFsc2U7XG4gICAgY2FtZXJhUmlnaHQoY2FtZXJhLCBjYW1SaWdodCk7XG4gICAgY2FtZXJhVXAoY2FtZXJhLCBjYW1VcCk7XG4gICAgY2FtZXJhRm9yd2FyZChjYW1lcmEsIGNhbUZ3ZCk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcihyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhID0gMjU1KTogQ29sb3Ige1xuICAgIHJldHVybiBuZXcgKGNjKCkuQ29sb3IpKHIsIGcsIGIsIGEpO1xufVxuXG4vKiogVW5pdHktbGlrZSBwYWxldHRlLiAqL1xuZXhwb3J0IGNvbnN0IENvbG9ycyA9IHtcbiAgICBnZXQgY3VydmUoKSB7IHJldHVybiBjKCdjdXJ2ZScsIDIwMCwgMjAwLCAyMDApOyB9LFxuICAgIGdldCBjdXJ2ZURpbSgpIHsgcmV0dXJuIGMoJ2N1cnZlRGltJywgMTQwLCAxNDAsIDE0MCwgMjAwKTsgfSxcbiAgICBnZXQgY3VydmVTZWxlY3RlZCgpIHsgcmV0dXJuIGMoJ2N1cnZlU2VsZWN0ZWQnLCAyNDAsIDI0MCwgMjQwKTsgfSxcbiAgICBnZXQgY3VydmVIb3ZlcigpIHsgcmV0dXJuIGMoJ2N1cnZlSG92ZXInLCAyNTUsIDI1NSwgMjU1KTsgfSxcbiAgICBnZXQga25vdCgpIHsgcmV0dXJuIGMoJ2tub3QnLCA1MiwgNTIsIDUyKTsgfSxcbiAgICBnZXQga25vdE91dGxpbmUoKSB7IHJldHVybiBjKCdrbm90T3V0bGluZScsIDIzMCwgMjMwLCAyMzApOyB9LFxuICAgIGdldCBzZWxlY3RlZCgpIHsgcmV0dXJuIGMoJ3NlbGVjdGVkJywgNTQsIDE3OSwgMjU1KTsgfSxcbiAgICBnZXQgaG92ZXIoKSB7IHJldHVybiBjKCdob3ZlcicsIDI1NSwgMjU1LCAyNTUpOyB9LFxuICAgIGdldCBsaW5rZWQoKSB7IHJldHVybiBjKCdsaW5rZWQnLCAyNTUsIDE5NiwgNjQpOyB9LFxuICAgIGdldCB0YW5nZW50TGluZSgpIHsgcmV0dXJuIGMoJ3RhbmdlbnRMaW5lJywgMTYwLCAxNjAsIDE2MCk7IH0sXG4gICAgZ2V0IHRhbmdlbnQoKSB7IHJldHVybiBjKCd0YW5nZW50JywgMjEwLCAyMTAsIDIxMCk7IH0sXG4gICAgZ2V0IGZsb3coKSB7IHJldHVybiBjKCdmbG93JywgMjU1LCAyNTUsIDI1NSwgMTQwKTsgfSxcbiAgICBnZXQgbm9ybWFsKCkgeyByZXR1cm4gYygnbm9ybWFsJywgMTIwLCAyMzAsIDEyMCwgMjAwKTsgfSxcbiAgICBnZXQgcHJldmlldygpIHsgcmV0dXJuIGMoJ3ByZXZpZXcnLCAyNTUsIDI1NSwgMjU1LCAxNzApOyB9LFxuICAgIGdldCBpbnNlcnQoKSB7IHJldHVybiBjKCdpbnNlcnQnLCAxMjAsIDIyMCwgMTIwKTsgfSxcbiAgICBnZXQgYXhpc1goKSB7IHJldHVybiBjKCdheGlzWCcsIDIxOSwgNjIsIDI5KTsgfSxcbiAgICBnZXQgYXhpc1koKSB7IHJldHVybiBjKCdheGlzWScsIDE1NCwgMjQzLCA3Mik7IH0sXG4gICAgZ2V0IGF4aXNaKCkgeyByZXR1cm4gYygnYXhpc1onLCA1OCwgMTIyLCAyNDgpOyB9LFxuICAgIGdldCBheGlzSG90KCkgeyByZXR1cm4gYygnYXhpc0hvdCcsIDI0NiwgMjQyLCA1MCk7IH0sXG4gICAgZ2V0IGF4aXNWaWV3KCkgeyByZXR1cm4gYygnYXhpc1ZpZXcnLCAyMjAsIDIyMCwgMjIwKTsgfSxcbiAgICBnZXQgcGxhbmVGaWxsKCkgeyByZXR1cm4gYygncGxhbmVGaWxsJywgMjU1LCAyNTUsIDI1NSwgNDApOyB9LFxufTtcblxuY29uc3QgY2FjaGUgPSBuZXcgTWFwPHN0cmluZywgQ29sb3I+KCk7XG5mdW5jdGlvbiBjKG5hbWU6IHN0cmluZywgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYSA9IDI1NSk6IENvbG9yIHtcbiAgICBsZXQgY29sID0gY2FjaGUuZ2V0KG5hbWUpO1xuICAgIGlmICghY29sKSB7XG4gICAgICAgIGNvbCA9IGNvbG9yKHIsIGcsIGIsIGEpO1xuICAgICAgICBjYWNoZS5zZXQobmFtZSwgY29sKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbDtcbn1cblxuLyoqIEEgY29weSBvZiBhIGNvbG9yIHdpdGggYW5vdGhlciBhbHBoYS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoQWxwaGEoY29sOiBDb2xvciwgYTogbnVtYmVyKTogQ29sb3Ige1xuICAgIGNvbnN0IGtleSA9IGAke2NvbC5yfSwke2NvbC5nfSwke2NvbC5ifSwke2F9YDtcbiAgICBsZXQgcmVzID0gY2FjaGUuZ2V0KGtleSk7XG4gICAgaWYgKCFyZXMpIHtcbiAgICAgICAgcmVzID0gY29sb3IoY29sLnIsIGNvbC5nLCBjb2wuYiwgYSk7XG4gICAgICAgIGNhY2hlLnNldChrZXksIHJlcyk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lKGE6IFYzLCBiOiBWMywgY29sOiBDb2xvciwgZGVwdGhUZXN0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBnci5hZGRMaW5lKGEsIGIsIGNvbCwgZGVwdGhUZXN0KTtcbn1cblxuY29uc3QgX28gPSB2MygpO1xuY29uc3QgX2EgPSB2MygpO1xuY29uc3QgX2IgPSB2MygpO1xuXG4vKiogQSBsaW5lIGB3aWR0aFB4YCB3aWRlLCBkcmF3biBhcyBwYXJhbGxlbCBsaW5lcyBvZmZzZXQgb24gc2NyZWVuLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRoaWNrTGluZShhOiBWMywgYjogVjMsIGNvbDogQ29sb3IsIHdpZHRoUHg6IG51bWJlciwgZGVwdGhUZXN0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBnci5hZGRMaW5lKGEsIGIsIGNvbCwgZGVwdGhUZXN0KTtcbiAgICBpZiAod2lkdGhQeCA8PSAxLjIpIHJldHVybjtcbiAgICAvLyBPZmZzZXQgcGVycGVuZGljdWxhciB0byB0aGUgbGluZSwgaW4gdGhlIHZpZXcgcGxhbmUuXG4gICAgc3ViKF9vLCBiLCBhKTtcbiAgICBjcm9zcyhfbywgX28sIGNhbUZ3ZCk7XG4gICAgaWYgKGxlblNxKF9vKSA8IDFlLTEyKSByZXR1cm47XG4gICAgbm9ybWFsaXplKF9vLCBfbyk7XG4gICAgY29uc3Qgd3BwID0gd29ybGRQZXJQaXhlbChjYW0sIGEpO1xuICAgIGNvbnN0IGhhbGYgPSBNYXRoLmZsb29yKHdpZHRoUHggLyAyKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBoYWxmOyBpKyspIHtcbiAgICAgICAgY29uc3QgcyA9IHdwcCAqIGkgKiAwLjc7XG4gICAgICAgIGdyLmFkZExpbmUoc2NhbGVBbmRBZGQoX2EsIGEsIF9vLCBzKSwgc2NhbGVBbmRBZGQoX2IsIGIsIF9vLCBzKSwgY29sLCBkZXB0aFRlc3QpO1xuICAgICAgICBnci5hZGRMaW5lKHNjYWxlQW5kQWRkKF9hLCBhLCBfbywgLXMpLCBzY2FsZUFuZEFkZChfYiwgYiwgX28sIC1zKSwgY29sLCBkZXB0aFRlc3QpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvbHlsaW5lKHBvaW50czogVjNbXSwgY29sOiBDb2xvciwgd2lkdGhQeCA9IDEsIGRlcHRoVGVzdCA9IGZhbHNlKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh3aWR0aFB4ID4gMS4yKSB0aGlja0xpbmUocG9pbnRzW2ldLCBwb2ludHNbaSArIDFdLCBjb2wsIHdpZHRoUHgsIGRlcHRoVGVzdCk7XG4gICAgICAgIGVsc2UgZ3IuYWRkTGluZShwb2ludHNbaV0sIHBvaW50c1tpICsgMV0sIGNvbCwgZGVwdGhUZXN0KTtcbiAgICB9XG59XG5cbmNvbnN0IGNpcmNsZVB0czogVjNbXSA9IFtdO1xuZnVuY3Rpb24gc2NyZWVuQ2lyY2xlUG9pbnRzKGNlbnRlcjogVjMsIHJhZGl1c1B4OiBudW1iZXIsIHNlZ21lbnRzOiBudW1iZXIpOiBWM1tdIHtcbiAgICBjb25zdCByID0gd29ybGRQZXJQaXhlbChjYW0sIGNlbnRlcikgKiByYWRpdXNQeDtcbiAgICB3aGlsZSAoY2lyY2xlUHRzLmxlbmd0aCA8PSBzZWdtZW50cykgY2lyY2xlUHRzLnB1c2godjMoKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2VnbWVudHM7IGkrKykge1xuICAgICAgICBjb25zdCBhID0gKGkgLyBzZWdtZW50cykgKiBNYXRoLlBJICogMjtcbiAgICAgICAgY29uc3QgcCA9IGNpcmNsZVB0c1tpXTtcbiAgICAgICAgY29weShwLCBjZW50ZXIpO1xuICAgICAgICBzY2FsZUFuZEFkZChwLCBwLCBjYW1SaWdodCwgTWF0aC5jb3MoYSkgKiByKTtcbiAgICAgICAgc2NhbGVBbmRBZGQocCwgcCwgY2FtVXAsIE1hdGguc2luKGEpICogcik7XG4gICAgfVxuICAgIHJldHVybiBjaXJjbGVQdHM7XG59XG5cbi8qKiBDaXJjbGUgZmFjaW5nIHRoZSBjYW1lcmEuICovXG5leHBvcnQgZnVuY3Rpb24gY2lyY2xlKGNlbnRlcjogVjMsIHJhZGl1c1B4OiBudW1iZXIsIGNvbDogQ29sb3IsIHNlZ21lbnRzID0gMTYsIGRlcHRoVGVzdCA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgcHRzID0gc2NyZWVuQ2lyY2xlUG9pbnRzKGNlbnRlciwgcmFkaXVzUHgsIHNlZ21lbnRzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzOyBpKyspIGdyLmFkZExpbmUocHRzW2ldLCBwdHNbaSArIDFdLCBjb2wsIGRlcHRoVGVzdCk7XG59XG5cbi8qKiBGaWxsZWQgZGlzYyBmYWNpbmcgdGhlIGNhbWVyYS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNjKGNlbnRlcjogVjMsIHJhZGl1c1B4OiBudW1iZXIsIGNvbDogQ29sb3IsIHNlZ21lbnRzID0gMTIsIGRlcHRoVGVzdCA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgcHRzID0gc2NyZWVuQ2lyY2xlUG9pbnRzKGNlbnRlciwgcmFkaXVzUHgsIHNlZ21lbnRzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzOyBpKyspIGdyLmFkZFRyaWFuZ2xlKGNlbnRlciwgcHRzW2ldLCBwdHNbaSArIDFdLCBjb2wsIGZhbHNlLCBkZXB0aFRlc3QsIHRydWUpO1xufVxuXG4vKiogU3F1YXJlIGZhY2luZyB0aGUgY2FtZXJhIChmaWxsZWQgb3Igb3V0bGluZSkuICovXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlKGNlbnRlcjogVjMsIGhhbGZQeDogbnVtYmVyLCBjb2w6IENvbG9yLCBmaWxsZWQ6IGJvb2xlYW4sIGRlcHRoVGVzdCA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgaCA9IHdvcmxkUGVyUGl4ZWwoY2FtLCBjZW50ZXIpICogaGFsZlB4O1xuICAgIGNvbnN0IHAwID0gYWRkKHYzKCksIHNjYWxlQW5kQWRkKHYzKCksIGNlbnRlciwgY2FtUmlnaHQsIC1oKSwgc2NhbGUodjMoKSwgY2FtVXAsIC1oKSk7XG4gICAgY29uc3QgcDEgPSBhZGQodjMoKSwgc2NhbGVBbmRBZGQodjMoKSwgY2VudGVyLCBjYW1SaWdodCwgaCksIHNjYWxlKHYzKCksIGNhbVVwLCAtaCkpO1xuICAgIGNvbnN0IHAyID0gYWRkKHYzKCksIHNjYWxlQW5kQWRkKHYzKCksIGNlbnRlciwgY2FtUmlnaHQsIGgpLCBzY2FsZSh2MygpLCBjYW1VcCwgaCkpO1xuICAgIGNvbnN0IHAzID0gYWRkKHYzKCksIHNjYWxlQW5kQWRkKHYzKCksIGNlbnRlciwgY2FtUmlnaHQsIC1oKSwgc2NhbGUodjMoKSwgY2FtVXAsIGgpKTtcbiAgICBnci5hZGRRdWFkKHAwLCBwMSwgcDIsIHAzLCBjb2wsICFmaWxsZWQsIGRlcHRoVGVzdCwgdHJ1ZSk7XG59XG5cbi8qKiBEaWFtb25kIGZhY2luZyB0aGUgY2FtZXJhIChmaWxsZWQgb3Igb3V0bGluZSkuICovXG5leHBvcnQgZnVuY3Rpb24gZGlhbW9uZChjZW50ZXI6IFYzLCBoYWxmUHg6IG51bWJlciwgY29sOiBDb2xvciwgZmlsbGVkOiBib29sZWFuLCBkZXB0aFRlc3QgPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IGggPSB3b3JsZFBlclBpeGVsKGNhbSwgY2VudGVyKSAqIGhhbGZQeDtcbiAgICBjb25zdCBwMCA9IHNjYWxlQW5kQWRkKHYzKCksIGNlbnRlciwgY2FtVXAsIC1oKTtcbiAgICBjb25zdCBwMSA9IHNjYWxlQW5kQWRkKHYzKCksIGNlbnRlciwgY2FtUmlnaHQsIGgpO1xuICAgIGNvbnN0IHAyID0gc2NhbGVBbmRBZGQodjMoKSwgY2VudGVyLCBjYW1VcCwgaCk7XG4gICAgY29uc3QgcDMgPSBzY2FsZUFuZEFkZCh2MygpLCBjZW50ZXIsIGNhbVJpZ2h0LCAtaCk7XG4gICAgZ3IuYWRkUXVhZChwMCwgcDEsIHAyLCBwMywgY29sLCAhZmlsbGVkLCBkZXB0aFRlc3QsIHRydWUpO1xufVxuXG4vKiogQ2lyY2xlIGluIHRoZSBwbGFuZSBwZXJwZW5kaWN1bGFyIHRvIGBub3JtYWxgICh3b3JsZCByYWRpdXMpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJpbmcoY2VudGVyOiBWMywgbm9ybWFsOiBWMywgcmFkaXVzOiBudW1iZXIsIGNvbDogQ29sb3IsIHNlZ21lbnRzID0gNDgsIGRlcHRoVGVzdCA9IGZhbHNlLCBmcm9udE9ubHkgPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IG4gPSBub3JtYWxpemUodjMoKSwgbm9ybWFsKTtcbiAgICBjb25zdCB1ID0gbm9ybWFsaXplKHYzKCksIGNyb3NzKHYzKCksIE1hdGguYWJzKG4ueSkgPCAwLjk5ID8gdjMoMCwgMSwgMCkgOiB2MygxLCAwLCAwKSwgbikpO1xuICAgIGNvbnN0IHcgPSBjcm9zcyh2MygpLCBuLCB1KTtcbiAgICBsZXQgcHJldjogVjMgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCB0b0NhbSA9IHYzKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2VnbWVudHM7IGkrKykge1xuICAgICAgICBjb25zdCBhID0gKGkgLyBzZWdtZW50cykgKiBNYXRoLlBJICogMjtcbiAgICAgICAgY29uc3QgcCA9IGFkZCh2MygpLCBjZW50ZXIsIGFkZCh2MygpLCBzY2FsZSh2MygpLCB1LCBNYXRoLmNvcyhhKSAqIHJhZGl1cyksIHNjYWxlKHYzKCksIHcsIE1hdGguc2luKGEpICogcmFkaXVzKSkpO1xuICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgbGV0IGRyYXcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGZyb250T25seSkge1xuICAgICAgICAgICAgICAgIC8vIFNraXAgdGhlIGhhbGYgZmFjaW5nIGF3YXkgZnJvbSB0aGUgY2FtZXJhLlxuICAgICAgICAgICAgICAgIGNvbnN0IG1pZCA9IHNjYWxlKHYzKCksIGFkZCh2MygpLCBwcmV2LCBwKSwgMC41KTtcbiAgICAgICAgICAgICAgICBzdWIodG9DYW0sIG1pZCwgY2VudGVyKTtcbiAgICAgICAgICAgICAgICBkcmF3ID0gdG9DYW0ueCAqIGNhbUZ3ZC54ICsgdG9DYW0ueSAqIGNhbUZ3ZC55ICsgdG9DYW0ueiAqIGNhbUZ3ZC56IDw9IHJhZGl1cyAqIDAuMDU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHJhdykgZ3IuYWRkTGluZShwcmV2LCBwLCBjb2wsIGRlcHRoVGVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJldiA9IHA7XG4gICAgfVxufVxuXG4vKiogRmlsbGVkIGNvbmUgZnJvbSBgYmFzZWAgcG9pbnRpbmcgYWxvbmcgYGRpcmAgKHdvcmxkIHNpemVzKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25lKGJhc2U6IFYzLCBkaXI6IFYzLCBoZWlnaHQ6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGNvbDogQ29sb3IsIGRlcHRoVGVzdCA9IGZhbHNlLCBzZWdtZW50cyA9IDEwKTogdm9pZCB7XG4gICAgY29uc3QgZCA9IG5vcm1hbGl6ZSh2MygpLCBkaXIpO1xuICAgIGNvbnN0IGFwZXggPSBzY2FsZUFuZEFkZCh2MygpLCBiYXNlLCBkLCBoZWlnaHQpO1xuICAgIGNvbnN0IHUgPSBub3JtYWxpemUodjMoKSwgY3Jvc3ModjMoKSwgTWF0aC5hYnMoZC55KSA8IDAuOTkgPyB2MygwLCAxLCAwKSA6IHYzKDEsIDAsIDApLCBkKSk7XG4gICAgY29uc3QgdyA9IGNyb3NzKHYzKCksIGQsIHUpO1xuICAgIGNvbnN0IHB0czogVjNbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHNlZ21lbnRzOyBpKyspIHtcbiAgICAgICAgY29uc3QgYSA9IChpIC8gc2VnbWVudHMpICogTWF0aC5QSSAqIDI7XG4gICAgICAgIHB0cy5wdXNoKGFkZCh2MygpLCBiYXNlLCBhZGQodjMoKSwgc2NhbGUodjMoKSwgdSwgTWF0aC5jb3MoYSkgKiByYWRpdXMpLCBzY2FsZSh2MygpLCB3LCBNYXRoLnNpbihhKSAqIHJhZGl1cykpKSk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudHM7IGkrKykge1xuICAgICAgICBnci5hZGRUcmlhbmdsZShhcGV4LCBwdHNbaV0sIHB0c1tpICsgMV0sIGNvbCwgZmFsc2UsIGRlcHRoVGVzdCwgdHJ1ZSk7XG4gICAgICAgIGdyLmFkZFRyaWFuZ2xlKGJhc2UsIHB0c1tpICsgMV0sIHB0c1tpXSwgY29sLCBmYWxzZSwgZGVwdGhUZXN0LCB0cnVlKTtcbiAgICB9XG59XG5cbi8qKiBGaWxsZWQgY3ViZSB3aXRoIHRoZSBnaXZlbiBheGVzIChoYWxmIHNpemUgaW4gd29ybGQgdW5pdHMpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGN1YmUoY2VudGVyOiBWMywgaGFsZjogbnVtYmVyLCBheDogVjMsIGF5OiBWMywgYXo6IFYzLCBjb2w6IENvbG9yLCBkZXB0aFRlc3QgPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IGNvcm5lciA9IChzeDogbnVtYmVyLCBzeTogbnVtYmVyLCBzejogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHAgPSBjb3B5KHYzKCksIGNlbnRlcik7XG4gICAgICAgIHNjYWxlQW5kQWRkKHAsIHAsIGF4LCBzeCAqIGhhbGYpO1xuICAgICAgICBzY2FsZUFuZEFkZChwLCBwLCBheSwgc3kgKiBoYWxmKTtcbiAgICAgICAgc2NhbGVBbmRBZGQocCwgcCwgYXosIHN6ICogaGFsZik7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH07XG4gICAgY29uc3QgYzAwMCA9IGNvcm5lcigtMSwgLTEsIC0xKTtcbiAgICBjb25zdCBjMTAwID0gY29ybmVyKDEsIC0xLCAtMSk7XG4gICAgY29uc3QgYzExMCA9IGNvcm5lcigxLCAxLCAtMSk7XG4gICAgY29uc3QgYzAxMCA9IGNvcm5lcigtMSwgMSwgLTEpO1xuICAgIGNvbnN0IGMwMDEgPSBjb3JuZXIoLTEsIC0xLCAxKTtcbiAgICBjb25zdCBjMTAxID0gY29ybmVyKDEsIC0xLCAxKTtcbiAgICBjb25zdCBjMTExID0gY29ybmVyKDEsIDEsIDEpO1xuICAgIGNvbnN0IGMwMTEgPSBjb3JuZXIoLTEsIDEsIDEpO1xuICAgIGNvbnN0IHEgPSAoYTogVjMsIGI6IFYzLCBjYzI6IFYzLCBkOiBWMykgPT4gZ3IuYWRkUXVhZChhLCBiLCBjYzIsIGQsIGNvbCwgZmFsc2UsIGRlcHRoVGVzdCwgdHJ1ZSk7XG4gICAgcShjMDAwLCBjMTAwLCBjMTEwLCBjMDEwKTtcbiAgICBxKGMwMDEsIGMwMTEsIGMxMTEsIGMxMDEpO1xuICAgIHEoYzAwMCwgYzAxMCwgYzAxMSwgYzAwMSk7XG4gICAgcShjMTAwLCBjMTAxLCBjMTExLCBjMTEwKTtcbiAgICBxKGMwMDAsIGMwMDEsIGMxMDEsIGMxMDApO1xuICAgIHEoYzAxMCwgYzExMCwgYzExMSwgYzAxMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWFkKGE6IFYzLCBiOiBWMywgYzI6IFYzLCBkOiBWMywgY29sOiBDb2xvciwgZmlsbGVkOiBib29sZWFuLCBkZXB0aFRlc3QgPSBmYWxzZSk6IHZvaWQge1xuICAgIGdyLmFkZFF1YWQoYSwgYiwgYzIsIGQsIGNvbCwgIWZpbGxlZCwgZGVwdGhUZXN0LCB0cnVlKTtcbn1cblxuLyoqIFNtYWxsIGFycm93IGhlYWQgKGNoZXZyb24pIGF0IGBwYCBwb2ludGluZyBhbG9uZyBgZGlyYCwgc2l6ZWQgaW4gcGl4ZWxzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZXZyb24ocDogVjMsIGRpcjogVjMsIHNpemVQeDogbnVtYmVyLCBjb2w6IENvbG9yLCBkZXB0aFRlc3QgPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IGQgPSBub3JtYWxpemUodjMoKSwgZGlyKTtcbiAgICBpZiAobGVuU3EoZCkgPCAxZS0xMikgcmV0dXJuO1xuICAgIGNvbnN0IHNpZGUgPSBub3JtYWxpemUodjMoKSwgY3Jvc3ModjMoKSwgZCwgY2FtRndkKSk7XG4gICAgaWYgKGxlblNxKHNpZGUpIDwgMWUtMTIpIHJldHVybjtcbiAgICBjb25zdCBzID0gd29ybGRQZXJQaXhlbChjYW0sIHApICogc2l6ZVB4O1xuICAgIGNvbnN0IGJhY2sgPSBzY2FsZUFuZEFkZCh2MygpLCBwLCBkLCAtcyk7XG4gICAgZ3IuYWRkTGluZShzY2FsZUFuZEFkZCh2MygpLCBiYWNrLCBzaWRlLCBzICogMC43KSwgcCwgY29sLCBkZXB0aFRlc3QpO1xuICAgIGdyLmFkZExpbmUoc2NhbGVBbmRBZGQodjMoKSwgYmFjaywgc2lkZSwgLXMgKiAwLjcpLCBwLCBjb2wsIGRlcHRoVGVzdCk7XG59XG5cbi8qKiBTY3JlZW4tc3BhY2UgbGVuZ3RoIG9mIGEgd29ybGQgc2VnbWVudCAocGl4ZWxzKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY3JlZW5MZW5ndGgoYTogVjMsIGI6IFYzKTogbnVtYmVyIHtcbiAgICBjb25zdCBzYSA9IHRvU2NyZWVuKGNhbSwgYSk7XG4gICAgY29uc3Qgc2IgPSB0b1NjcmVlbihjYW0sIGIpO1xuICAgIHJldHVybiBNYXRoLmh5cG90KHNiLnggLSBzYS54LCBzYi55IC0gc2EueSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJyZW50Q2FtZXJhKCk6IGFueSB7XG4gICAgcmV0dXJuIGNhbTtcbn1cblxuZXhwb3J0IHsgc2V0IGFzIHNldFYzIH07XG4iLCAiLyoqXG4gKiBNb3ZlIC8gcm90YXRlIC8gc2NhbGUgaGFuZGxlcyBmb3IgdGhlIHNlbGVjdGVkIGtub3RzIGFuZCB0YW5nZW50cyAoVW5pdHknc1xuICogU3BsaW5lTW92ZVRvb2wsIFNwbGluZVJvdGF0ZVRvb2wsIFNwbGluZVNjYWxlVG9vbCkuIFRoZSBoYW5kbGUgZm9sbG93cyB0aGVcbiAqIENvY29zIHRyYW5zZm9ybSB0b29sIChXIC8gRSAvIFIpIGFuZCBwaXZvdCBzZXR0aW5nLlxuICovXG5pbXBvcnQge1xuICAgIFYzLCBRNCwgdjMsIHE0LCBjb3B5LCBhZGQsIHN1Yiwgc2NhbGUsIHNjYWxlQW5kQWRkLCBkb3QsIGNyb3NzLCBub3JtYWxpemUsIGxlbiwgbGVuU3EsXG4gICAgcVJvdGF0ZSwgcU11bCwgcUZyb21BeGlzQW5nbGUsIHFMb29rUm90YXRpb24sIEVQU0lMT04sXG59IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL21hdGgnO1xuaW1wb3J0IHsgdGFuZ2VudHNFZGl0YWJsZSwgYXBwbHlUYW5nZW50TW9kZSwga25vdFVwLCBUYW5nZW50TW9kZSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL3NwbGluZS1jb3JlJztcbmltcG9ydCB7XG4gICAgY2FtZXJhRm9yd2FyZCwgY2FtZXJhUG9zaXRpb24sIGNsb3Nlc3RPbkxpbmUsIGRpc3RUb1NlZ21lbnQsIHBvaW50SW5Qb2x5Z29uLCByYXlQbGFuZSwgc2NyZWVuUmF5LCB0b1NjcmVlbiwgd29ybGRQZXJQaXhlbCxcbn0gZnJvbSAnLi92aWV3JztcbmltcG9ydCAqIGFzIEQgZnJvbSAnLi9kcmF3JztcbmltcG9ydCB7XG4gICAgRWxlbWVudFJlZiwgY2VudHJvaWQsIGNvbnRhaW5lclJvdGF0aW9uLCBlbGVtZW50V29ybGRQb3NpdGlvbiwgZ2V0S25vdCwga25vdFdvcmxkUm90YXRpb24sIHNldEtub3RXb3JsZCxcbiAgICBzZXRLbm90V29ybGRSb3RhdGlvbiwgc2V0VGFuZ2VudFdvcmxkLCBzZXRUYW5nZW50V29ybGRWZWMsIHRhbmdlbnRXb3JsZFZlYywga25vdFdvcmxkUG9zaXRpb24sXG59IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHsgSGFuZGxlQXhpcywgUyB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgaXMyRFZpZXcsIHBpdm90TW9kZSwgc25hcENvbmZpZywgdHJhbnNmb3JtVG9vbE5hbWUgfSBmcm9tICcuL2Vudic7XG5cbmV4cG9ydCB0eXBlIEhhbmRsZUtpbmQgPSAnbW92ZScgfCAncm90YXRlJyB8ICdzY2FsZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGFuZGxlRnJhbWUge1xuICAgIGtpbmQ6IEhhbmRsZUtpbmQ7XG4gICAgcGl2b3Q6IFYzO1xuICAgIGF4ZXM6IFtWMywgVjMsIFYzXTtcbiAgICAvKiogQXhpcyBsZW5ndGggaW4gd29ybGQgdW5pdHMuICovXG4gICAgc2l6ZTogbnVtYmVyO1xuICAgIGlzMkQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IEFYSVNfUFggPSA5MDtcbmNvbnN0IEhJVF9QWCA9IDc7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVLaW5kKCk6IEhhbmRsZUtpbmQgfCBudWxsIHtcbiAgICBzd2l0Y2ggKHRyYW5zZm9ybVRvb2xOYW1lKCkpIHtcbiAgICAgICAgY2FzZSAncG9zaXRpb24nOlxuICAgICAgICBjYXNlICdyZWN0JzpcbiAgICAgICAgICAgIHJldHVybiAnbW92ZSc7XG4gICAgICAgIGNhc2UgJ3JvdGF0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiAncm90YXRlJztcbiAgICAgICAgY2FzZSAnc2NhbGUnOlxuICAgICAgICAgICAgcmV0dXJuICdzY2FsZSc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbi8qKiBIYW5kbGUgb3JpZW50YXRpb24gYXhlcyAodW5pdCwgd29ybGQgc3BhY2UpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUF4ZXMoZWxlbWVudHM6IEVsZW1lbnRSZWZbXSk6IFtWMywgVjMsIFYzXSB7XG4gICAgY29uc3QgYWN0aXZlID0gZWxlbWVudHNbZWxlbWVudHMubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbW9kZSA9IFMuc2V0dGluZ3Mub3JpZW50YXRpb247XG4gICAgbGV0IHE6IFE0IHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKGFjdGl2ZSAmJiBtb2RlID09PSAnbG9jYWwnKSBxID0gY29udGFpbmVyUm90YXRpb24oYWN0aXZlLmNvbXApO1xuICAgIGVsc2UgaWYgKGFjdGl2ZSAmJiBtb2RlID09PSAnZWxlbWVudCcpIHtcbiAgICAgICAgY29uc3QgayA9IGdldEtub3QoYWN0aXZlKTtcbiAgICAgICAgaWYgKGspIHtcbiAgICAgICAgICAgIGlmIChhY3RpdmUucGFydCA9PT0gJ2tub3QnKSBxID0ga25vdFdvcmxkUm90YXRpb24oYWN0aXZlLmNvbXAsIGspO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlyID0gdGFuZ2VudFdvcmxkVmVjKGFjdGl2ZS5jb21wLCBhY3RpdmUuc3BsaW5lLCBhY3RpdmUua25vdCwgYWN0aXZlLnBhcnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVwID0gcVJvdGF0ZSh2MygpLCBrbm90V29ybGRSb3RhdGlvbihhY3RpdmUuY29tcCwgayksIHYzKDAsIDEsIDApKTtcbiAgICAgICAgICAgICAgICBxID0gbGVuU3EoZGlyKSA+IEVQU0lMT04gPyBxTG9va1JvdGF0aW9uKHE0KCksIGRpciwgdXApIDoga25vdFdvcmxkUm90YXRpb24oYWN0aXZlLmNvbXAsIGspO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghcSkgcmV0dXJuIFt2MygxLCAwLCAwKSwgdjMoMCwgMSwgMCksIHYzKDAsIDAsIDEpXTtcbiAgICByZXR1cm4gW3FSb3RhdGUodjMoKSwgcSwgdjMoMSwgMCwgMCkpLCBxUm90YXRlKHYzKCksIHEsIHYzKDAsIDEsIDApKSwgcVJvdGF0ZSh2MygpLCBxLCB2MygwLCAwLCAxKSldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlUGl2b3QoZWxlbWVudHM6IEVsZW1lbnRSZWZbXSk6IFYzIHtcbiAgICBpZiAocGl2b3RNb2RlKCkgPT09ICdwaXZvdCcgJiYgZWxlbWVudHMubGVuZ3RoKSByZXR1cm4gZWxlbWVudFdvcmxkUG9zaXRpb24oZWxlbWVudHNbZWxlbWVudHMubGVuZ3RoIC0gMV0pO1xuICAgIHJldHVybiBjZW50cm9pZChlbGVtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlRnJhbWUoY2FtOiBhbnksIGVsZW1lbnRzOiBFbGVtZW50UmVmW10sIGF4ZXNPdmVycmlkZT86IFtWMywgVjMsIFYzXSB8IG51bGwpOiBIYW5kbGVGcmFtZSB8IG51bGwge1xuICAgIGNvbnN0IGtpbmQgPSBoYW5kbGVLaW5kKCk7XG4gICAgaWYgKCFraW5kIHx8ICFlbGVtZW50cy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHBpdm90ID0gaGFuZGxlUGl2b3QoZWxlbWVudHMpO1xuICAgIGNvbnN0IGF4ZXMgPSBheGVzT3ZlcnJpZGUgPz8gaGFuZGxlQXhlcyhlbGVtZW50cyk7XG4gICAgcmV0dXJuIHsga2luZCwgcGl2b3QsIGF4ZXMsIHNpemU6IHdvcmxkUGVyUGl4ZWwoY2FtLCBwaXZvdCkgKiBBWElTX1BYLCBpczJEOiBpczJEVmlldygpIH07XG59XG5cbmNvbnN0IEFYSVNfSU5ERVg6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7IHg6IDAsIHk6IDEsIHo6IDIgfTtcbmNvbnN0IFBMQU5FUzogeyBheGlzOiBIYW5kbGVBeGlzOyBhOiBudW1iZXI7IGI6IG51bWJlcjsgbjogbnVtYmVyIH1bXSA9IFtcbiAgICB7IGF4aXM6ICd4eScsIGE6IDAsIGI6IDEsIG46IDIgfSxcbiAgICB7IGF4aXM6ICd5eicsIGE6IDEsIGI6IDIsIG46IDAgfSxcbiAgICB7IGF4aXM6ICd4eicsIGE6IDAsIGI6IDIsIG46IDEgfSxcbl07XG5cbmZ1bmN0aW9uIGF4aXNDb2xvcihpOiBudW1iZXIpIHtcbiAgICByZXR1cm4gaSA9PT0gMCA/IEQuQ29sb3JzLmF4aXNYIDogaSA9PT0gMSA/IEQuQ29sb3JzLmF4aXNZIDogRC5Db2xvcnMuYXhpc1o7XG59XG5cbmZ1bmN0aW9uIHZpc2libGVBeGVzKGY6IEhhbmRsZUZyYW1lKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBmLmlzMkQgPyBbMCwgMV0gOiBbMCwgMSwgMl07XG59XG5cbmZ1bmN0aW9uIHZpc2libGVQbGFuZXMoZjogSGFuZGxlRnJhbWUpIHtcbiAgICByZXR1cm4gZi5pczJEID8gUExBTkVTLmZpbHRlcigocCkgPT4gcC5heGlzID09PSAneHknKSA6IFBMQU5FUztcbn1cblxuLyoqIFBsYW5lIGhhbmRsZXMgc2l0IG9uIHRoZSBzaWRlIG9mIGVhY2ggYXhpcyB0aGF0IGZhY2VzIHRoZSBjYW1lcmEgKGxpa2UgVW5pdHkpLiAqL1xuZnVuY3Rpb24gcGxhbmVTaWducyhjYW06IGFueSwgZjogSGFuZGxlRnJhbWUpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICAgIGNvbnN0IHRvQ2FtID0gc3ViKHYzKCksIGNhbWVyYVBvc2l0aW9uKGNhbSksIGYucGl2b3QpO1xuICAgIGlmIChsZW5TcSh0b0NhbSkgPCBFUFNJTE9OKSByZXR1cm4gWzEsIDEsIDFdO1xuICAgIHJldHVybiBmLmF4ZXMubWFwKChhKSA9PiAoZG90KGEsIHRvQ2FtKSA+PSAwID8gMSA6IC0xKSkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXJdO1xufVxuXG5mdW5jdGlvbiBwbGFuZVF1YWQoY2FtOiBhbnksIGY6IEhhbmRsZUZyYW1lLCBwOiB7IGE6IG51bWJlcjsgYjogbnVtYmVyIH0pOiBWM1tdIHtcbiAgICBjb25zdCBzID0gcGxhbmVTaWducyhjYW0sIGYpO1xuICAgIGNvbnN0IGxvID0gZi5zaXplICogMC4xNjtcbiAgICBjb25zdCBoaSA9IGYuc2l6ZSAqIDAuNDtcbiAgICBjb25zdCBBID0gc2NhbGUodjMoKSwgZi5heGVzW3AuYV0sIHNbcC5hXSk7XG4gICAgY29uc3QgQiA9IHNjYWxlKHYzKCksIGYuYXhlc1twLmJdLCBzW3AuYl0pO1xuICAgIGNvbnN0IHB0ID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiBhZGQodjMoKSwgYWRkKHYzKCksIGYucGl2b3QsIHNjYWxlKHYzKCksIEEsIHgpKSwgc2NhbGUodjMoKSwgQiwgeSkpO1xuICAgIHJldHVybiBbcHQobG8sIGxvKSwgcHQoaGksIGxvKSwgcHQoaGksIGhpKSwgcHQobG8sIGhpKV07XG59XG5cbmZ1bmN0aW9uIHJpbmdQb2ludHMoZjogSGFuZGxlRnJhbWUsIG5vcm1hbDogVjMsIHJhZGl1czogbnVtYmVyLCBzZWdtZW50cyA9IDQ4KTogVjNbXSB7XG4gICAgY29uc3QgbiA9IG5vcm1hbGl6ZSh2MygpLCBub3JtYWwpO1xuICAgIGNvbnN0IHUgPSBub3JtYWxpemUodjMoKSwgY3Jvc3ModjMoKSwgTWF0aC5hYnMobi55KSA8IDAuOTkgPyB2MygwLCAxLCAwKSA6IHYzKDEsIDAsIDApLCBuKSk7XG4gICAgY29uc3QgdyA9IGNyb3NzKHYzKCksIG4sIHUpO1xuICAgIGNvbnN0IHB0czogVjNbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHNlZ21lbnRzOyBpKyspIHtcbiAgICAgICAgY29uc3QgYSA9IChpIC8gc2VnbWVudHMpICogTWF0aC5QSSAqIDI7XG4gICAgICAgIHB0cy5wdXNoKGFkZCh2MygpLCBmLnBpdm90LCBhZGQodjMoKSwgc2NhbGUodjMoKSwgdSwgTWF0aC5jb3MoYSkgKiByYWRpdXMpLCBzY2FsZSh2MygpLCB3LCBNYXRoLnNpbihhKSAqIHJhZGl1cykpKSk7XG4gICAgfVxuICAgIHJldHVybiBwdHM7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhd1xuXG5leHBvcnQgZnVuY3Rpb24gZHJhd0hhbmRsZShjYW06IGFueSwgZjogSGFuZGxlRnJhbWUsIGhvdDogSGFuZGxlQXhpcyB8IG51bGwpOiB2b2lkIHtcbiAgICBjb25zdCBob3RDb2xvciA9IEQuQ29sb3JzLmF4aXNIb3Q7XG4gICAgaWYgKGYua2luZCA9PT0gJ3JvdGF0ZScpIHtcbiAgICAgICAgZm9yIChjb25zdCBpIG9mIHZpc2libGVBeGVzKGYpKSB7XG4gICAgICAgICAgICBpZiAoZi5pczJEICYmIGkgIT09IDIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgYXhpczogSGFuZGxlQXhpcyA9IChbJ3gnLCAneScsICd6J10gYXMgSGFuZGxlQXhpc1tdKVtpXTtcbiAgICAgICAgICAgIEQucmluZyhmLnBpdm90LCBmLmF4ZXNbaV0sIGYuc2l6ZSwgaG90ID09PSBheGlzID8gaG90Q29sb3IgOiBheGlzQ29sb3IoaSksIDY0LCBmYWxzZSwgIWYuaXMyRCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGYuaXMyRCkge1xuICAgICAgICAgICAgLy8gSW4gMkQgb25seSByb3RhdGlvbiBhcm91bmQgWiBtYWtlcyBzZW5zZS5cbiAgICAgICAgfVxuICAgICAgICBELnJpbmcoZi5waXZvdCwgY2FtZXJhRm9yd2FyZChjYW0pLCBmLnNpemUgKiAxLjE1LCBob3QgPT09ICd2aWV3JyA/IGhvdENvbG9yIDogRC5Db2xvcnMuYXhpc1ZpZXcsIDY0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGkgb2YgdmlzaWJsZUF4ZXMoZikpIHtcbiAgICAgICAgY29uc3QgYXhpczogSGFuZGxlQXhpcyA9IChbJ3gnLCAneScsICd6J10gYXMgSGFuZGxlQXhpc1tdKVtpXTtcbiAgICAgICAgY29uc3QgY29sID0gaG90ID09PSBheGlzID8gaG90Q29sb3IgOiBheGlzQ29sb3IoaSk7XG4gICAgICAgIGNvbnN0IHRpcCA9IHNjYWxlQW5kQWRkKHYzKCksIGYucGl2b3QsIGYuYXhlc1tpXSwgZi5zaXplKTtcbiAgICAgICAgRC50aGlja0xpbmUoZi5waXZvdCwgdGlwLCBjb2wsIDIpO1xuICAgICAgICBpZiAoZi5raW5kID09PSAnbW92ZScpIEQuY29uZShzY2FsZUFuZEFkZCh2MygpLCBmLnBpdm90LCBmLmF4ZXNbaV0sIGYuc2l6ZSAqIDAuODIpLCBmLmF4ZXNbaV0sIGYuc2l6ZSAqIDAuMjIsIGYuc2l6ZSAqIDAuMDcsIGNvbCk7XG4gICAgICAgIGVsc2UgRC5jdWJlKHRpcCwgZi5zaXplICogMC4wNiwgZi5heGVzWzBdLCBmLmF4ZXNbMV0sIGYuYXhlc1syXSwgY29sKTtcbiAgICB9XG4gICAgaWYgKGYua2luZCA9PT0gJ21vdmUnKSB7XG4gICAgICAgIGZvciAoY29uc3QgcCBvZiB2aXNpYmxlUGxhbmVzKGYpKSB7XG4gICAgICAgICAgICBjb25zdCBxID0gcGxhbmVRdWFkKGNhbSwgZiwgcCk7XG4gICAgICAgICAgICBjb25zdCBjb2wgPSBob3QgPT09IHAuYXhpcyA/IGhvdENvbG9yIDogYXhpc0NvbG9yKHAubik7XG4gICAgICAgICAgICBELnF1YWQocVswXSwgcVsxXSwgcVsyXSwgcVszXSwgRC53aXRoQWxwaGEoY29sLCBob3QgPT09IHAuYXhpcyA/IDExMCA6IDYwKSwgdHJ1ZSk7XG4gICAgICAgICAgICBELnF1YWQocVswXSwgcVsxXSwgcVsyXSwgcVszXSwgY29sLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgRC5zcXVhcmUoZi5waXZvdCwgNSwgaG90ID09PSAnZnJlZScgPyBob3RDb2xvciA6IEQuQ29sb3JzLmF4aXNWaWV3LCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgRC5jdWJlKGYucGl2b3QsIGYuc2l6ZSAqIDAuMDgsIGYuYXhlc1swXSwgZi5heGVzWzFdLCBmLmF4ZXNbMl0sIGhvdCA9PT0gJ2ZyZWUnID8gaG90Q29sb3IgOiBELkNvbG9ycy5heGlzVmlldyk7XG4gICAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaGl0IHRlc3RcblxuZXhwb3J0IGZ1bmN0aW9uIGhpdEhhbmRsZShjYW06IGFueSwgZjogSGFuZGxlRnJhbWUsIG14OiBudW1iZXIsIG15OiBudW1iZXIpOiBIYW5kbGVBeGlzIHwgbnVsbCB7XG4gICAgY29uc3Qgc3AgPSB0b1NjcmVlbihjYW0sIGYucGl2b3QpO1xuICAgIGlmICghc3AudmlzaWJsZSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGYua2luZCA9PT0gJ3JvdGF0ZScpIHtcbiAgICAgICAgbGV0IGJlc3Q6IEhhbmRsZUF4aXMgfCBudWxsID0gbnVsbDtcbiAgICAgICAgbGV0IGJlc3REID0gSElUX1BYO1xuICAgICAgICBjb25zdCB0ZXN0ID0gKGF4aXM6IEhhbmRsZUF4aXMsIHB0czogVjNbXSkgPT4ge1xuICAgICAgICAgICAgbGV0IHByZXYgPSB0b1NjcmVlbihjYW0sIHB0c1swXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1ciA9IHRvU2NyZWVuKGNhbSwgcHRzW2ldKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkID0gZGlzdFRvU2VnbWVudChteCwgbXksIHByZXYueCwgcHJldi55LCBjdXIueCwgY3VyLnkpLmRpc3Q7XG4gICAgICAgICAgICAgICAgaWYgKGQgPCBiZXN0RCkge1xuICAgICAgICAgICAgICAgICAgICBiZXN0RCA9IGQ7XG4gICAgICAgICAgICAgICAgICAgIGJlc3QgPSBheGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2ID0gY3VyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmb3IgKGNvbnN0IGkgb2YgdmlzaWJsZUF4ZXMoZikpIHtcbiAgICAgICAgICAgIGlmIChmLmlzMkQgJiYgaSAhPT0gMikgY29udGludWU7XG4gICAgICAgICAgICB0ZXN0KChbJ3gnLCAneScsICd6J10gYXMgSGFuZGxlQXhpc1tdKVtpXSwgcmluZ1BvaW50cyhmLCBmLmF4ZXNbaV0sIGYuc2l6ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmLmlzMkQpIHRlc3QoJ3onLCByaW5nUG9pbnRzKGYsIGYuYXhlc1syXSwgZi5zaXplKSk7XG4gICAgICAgIHRlc3QoJ3ZpZXcnLCByaW5nUG9pbnRzKGYsIGNhbWVyYUZvcndhcmQoY2FtKSwgZi5zaXplICogMS4xNSkpO1xuICAgICAgICByZXR1cm4gYmVzdDtcbiAgICB9XG4gICAgaWYgKE1hdGguaHlwb3QobXggLSBzcC54LCBteSAtIHNwLnkpIDw9IChmLmtpbmQgPT09ICdzY2FsZScgPyA5IDogNykpIHJldHVybiAnZnJlZSc7XG4gICAgbGV0IGJlc3Q6IEhhbmRsZUF4aXMgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgYmVzdEQgPSBISVRfUFg7XG4gICAgZm9yIChjb25zdCBpIG9mIHZpc2libGVBeGVzKGYpKSB7XG4gICAgICAgIGNvbnN0IHRpcCA9IHRvU2NyZWVuKGNhbSwgc2NhbGVBbmRBZGQodjMoKSwgZi5waXZvdCwgZi5heGVzW2ldLCBmLnNpemUgKiAxLjA1KSk7XG4gICAgICAgIGNvbnN0IGQgPSBkaXN0VG9TZWdtZW50KG14LCBteSwgc3AueCwgc3AueSwgdGlwLngsIHRpcC55KS5kaXN0O1xuICAgICAgICBpZiAoZCA8IGJlc3REKSB7XG4gICAgICAgICAgICBiZXN0RCA9IGQ7XG4gICAgICAgICAgICBiZXN0ID0gKFsneCcsICd5JywgJ3onXSBhcyBIYW5kbGVBeGlzW10pW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChiZXN0KSByZXR1cm4gYmVzdDtcbiAgICBpZiAoZi5raW5kID09PSAnbW92ZScpIHtcbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHZpc2libGVQbGFuZXMoZikpIHtcbiAgICAgICAgICAgIGNvbnN0IHEgPSBwbGFuZVF1YWQoY2FtLCBmLCBwKS5tYXAoKHcpID0+IHRvU2NyZWVuKGNhbSwgdykpO1xuICAgICAgICAgICAgaWYgKHBvaW50SW5Qb2x5Z29uKG14LCBteSwgcSkpIHJldHVybiBwLmF4aXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZ1xuXG5pbnRlcmZhY2UgRWxlbWVudFN0YXJ0IHtcbiAgICBlOiBFbGVtZW50UmVmO1xuICAgIHBvczogVjM7XG4gICAgcm90OiBRNCB8IG51bGw7XG4gICAgdGluOiBWMyB8IG51bGw7XG4gICAgdG91dDogVjMgfCBudWxsO1xuICAgIHR2ZWM6IFYzIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIYW5kbGVEcmFnIHtcbiAgICBmcmFtZTogSGFuZGxlRnJhbWU7XG4gICAgYXhpczogSGFuZGxlQXhpcztcbiAgICAvKiogQXBwbGllcyB0aGUgZHJhZyBmb3IgdGhlIGN1cnJlbnQgbW91c2UgcG9zaXRpb24uIFJldHVybnMgYSBzdGF0dXMgdGV4dC4gKi9cbiAgICB1cGRhdGUobXg6IG51bWJlciwgbXk6IG51bWJlciwgZXY6IGFueSk6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gc25hcFN0ZXAodjogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBzdGVwID4gMCA/IE1hdGgucm91bmQodiAvIHN0ZXApICogc3RlcCA6IHY7XG59XG5cbi8qKiBTZWxlY3RlZCBlbGVtZW50cyB3aG9zZSBvd25lciBrbm90IGlzIG5vdCBhbHNvIHNlbGVjdGVkICh0aG9zZSBtb3ZlIHdpdGggdGhlIGtub3QpLiAqL1xuZnVuY3Rpb24gZWZmZWN0aXZlRWxlbWVudHMoZWxlbWVudHM6IEVsZW1lbnRSZWZbXSk6IEVsZW1lbnRSZWZbXSB7XG4gICAgcmV0dXJuIGVsZW1lbnRzLmZpbHRlcigoZSkgPT4gZS5wYXJ0ID09PSAna25vdCcgfHwgIWVsZW1lbnRzLnNvbWUoKG8pID0+IG8ucGFydCA9PT0gJ2tub3QnICYmIG8uY29tcCA9PT0gZS5jb21wICYmIG8uc3BsaW5lID09PSBlLnNwbGluZSAmJiBvLmtub3QgPT09IGUua25vdCkpO1xufVxuXG5mdW5jdGlvbiBjYXB0dXJlU3RhcnRzKGVsZW1lbnRzOiBFbGVtZW50UmVmW10pOiBFbGVtZW50U3RhcnRbXSB7XG4gICAgcmV0dXJuIGVmZmVjdGl2ZUVsZW1lbnRzKGVsZW1lbnRzKS5tYXAoKGUpID0+IHtcbiAgICAgICAgY29uc3QgayA9IGdldEtub3QoZSk7XG4gICAgICAgIGNvbnN0IGlzS25vdCA9IGUucGFydCA9PT0gJ2tub3QnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZSxcbiAgICAgICAgICAgIHBvczogZWxlbWVudFdvcmxkUG9zaXRpb24oZSksXG4gICAgICAgICAgICByb3Q6IGlzS25vdCA/IGtub3RXb3JsZFJvdGF0aW9uKGUuY29tcCwgaykgOiBudWxsLFxuICAgICAgICAgICAgdGluOiBpc0tub3QgPyB0YW5nZW50V29ybGRWZWMoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCAnaW4nKSA6IG51bGwsXG4gICAgICAgICAgICB0b3V0OiBpc0tub3QgPyB0YW5nZW50V29ybGRWZWMoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCAnb3V0JykgOiBudWxsLFxuICAgICAgICAgICAgdHZlYzogIWlzS25vdCA/IHRhbmdlbnRXb3JsZFZlYyhlLmNvbXAsIGUuc3BsaW5lLCBlLmtub3QsIGUucGFydCBhcyAnaW4nIHwgJ291dCcpIDogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0SGFuZGxlRHJhZyhjYW06IGFueSwgZjogSGFuZGxlRnJhbWUsIGF4aXM6IEhhbmRsZUF4aXMsIG14OiBudW1iZXIsIG15OiBudW1iZXIsIGVsZW1lbnRzOiBFbGVtZW50UmVmW10pOiBIYW5kbGVEcmFnIHwgbnVsbCB7XG4gICAgY29uc3Qgc3RhcnRzID0gY2FwdHVyZVN0YXJ0cyhlbGVtZW50cyk7XG4gICAgaWYgKCFzdGFydHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoZi5raW5kID09PSAnbW92ZScpIHJldHVybiBtb3ZlRHJhZyhjYW0sIGYsIGF4aXMsIG14LCBteSwgc3RhcnRzKTtcbiAgICBpZiAoZi5raW5kID09PSAncm90YXRlJykgcmV0dXJuIHJvdGF0ZURyYWcoY2FtLCBmLCBheGlzLCBteCwgbXksIHN0YXJ0cyk7XG4gICAgcmV0dXJuIHNjYWxlRHJhZyhjYW0sIGYsIGF4aXMsIG14LCBteSwgc3RhcnRzKTtcbn1cblxuLyoqIFBvaW50IHVuZGVyIHRoZSBtb3VzZSBvbiB0aGUgZHJhZyBjb25zdHJhaW50IChheGlzIGxpbmUgb3IgcGxhbmUpLiAqL1xuZnVuY3Rpb24gY29uc3RyYWludFBvaW50KGNhbTogYW55LCBmOiBIYW5kbGVGcmFtZSwgYXhpczogSGFuZGxlQXhpcywgbXg6IG51bWJlciwgbXk6IG51bWJlcik6IFYzIHwgbnVsbCB7XG4gICAgY29uc3QgcmF5ID0gc2NyZWVuUmF5KGNhbSwgbXgsIG15KTtcbiAgICBpZiAoYXhpcyBpbiBBWElTX0lOREVYKSByZXR1cm4gY2xvc2VzdE9uTGluZShyYXksIGYucGl2b3QsIGYuYXhlc1tBWElTX0lOREVYW2F4aXNdXSk7XG4gICAgaWYgKGF4aXMgPT09ICdmcmVlJykgcmV0dXJuIHJheVBsYW5lKHJheSwgZi5waXZvdCwgY2FtZXJhRm9yd2FyZChjYW0pLCB0cnVlKTtcbiAgICBjb25zdCBwID0gUExBTkVTLmZpbmQoKHBsKSA9PiBwbC5heGlzID09PSBheGlzKTtcbiAgICBpZiAoIXApIHJldHVybiBudWxsO1xuICAgIHJldHVybiByYXlQbGFuZShyYXksIGYucGl2b3QsIGYuYXhlc1twLm5dLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gbW92ZURyYWcoY2FtOiBhbnksIGY6IEhhbmRsZUZyYW1lLCBheGlzOiBIYW5kbGVBeGlzLCBteDogbnVtYmVyLCBteTogbnVtYmVyLCBzdGFydHM6IEVsZW1lbnRTdGFydFtdKTogSGFuZGxlRHJhZyB8IG51bGwge1xuICAgIGNvbnN0IHN0YXJ0ID0gY29uc3RyYWludFBvaW50KGNhbSwgZiwgYXhpcywgbXgsIG15KTtcbiAgICBpZiAoIXN0YXJ0KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgICBmcmFtZTogZixcbiAgICAgICAgYXhpcyxcbiAgICAgICAgdXBkYXRlKHgsIHksIGV2KSB7XG4gICAgICAgICAgICBjb25zdCBjdXIgPSBjb25zdHJhaW50UG9pbnQoY2FtLCBmLCBheGlzLCB4LCB5KTtcbiAgICAgICAgICAgIGlmICghY3VyKSByZXR1cm4gJyc7XG4gICAgICAgICAgICBjb25zdCBkZWx0YSA9IHN1Yih2MygpLCBjdXIsIHN0YXJ0KTtcbiAgICAgICAgICAgIGNvbnN0IHNuYXAgPSBzbmFwQ29uZmlnKCk7XG4gICAgICAgICAgICBpZiAoc25hcC5pc1Bvc2l0aW9uU25hcEVuYWJsZWQgIT09ICEhZXY/LmN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICAvLyBTbmFwIHRoZSBtb3ZlbWVudCBhbG9uZyBlYWNoIGhhbmRsZSBheGlzLlxuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXBzID0gW3NuYXAucG9zaXRpb24ueCwgc25hcC5wb3NpdGlvbi55LCBzbmFwLnBvc2l0aW9uLnpdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG91dCA9IHYzKCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHNjYWxlQW5kQWRkKG91dCwgb3V0LCBmLmF4ZXNbaV0sIHNuYXBTdGVwKGRvdChkZWx0YSwgZi5heGVzW2ldKSwgc3RlcHNbaV0pKTtcbiAgICAgICAgICAgICAgICBjb3B5KGRlbHRhLCBvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBzIG9mIHN0YXJ0cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGFkZCh2MygpLCBzLnBvcywgZGVsdGEpO1xuICAgICAgICAgICAgICAgIGlmIChzLmUucGFydCA9PT0gJ2tub3QnKSBzZXRLbm90V29ybGQocy5lLmNvbXAsIHMuZS5zcGxpbmUsIHMuZS5rbm90LCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGVsc2Ugc2V0VGFuZ2VudFdvcmxkKHMuZS5jb21wLCBzLmUuc3BsaW5lLCBzLmUua25vdCwgcy5lLnBhcnQsIHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkID0gW2RvdChkZWx0YSwgZi5heGVzWzBdKSwgZG90KGRlbHRhLCBmLmF4ZXNbMV0pLCBkb3QoZGVsdGEsIGYuYXhlc1syXSldLm1hcCgobikgPT4gbi50b0ZpeGVkKDMpKTtcbiAgICAgICAgICAgIHJldHVybiBgXHUwMzk0ICR7ZC5qb2luKCcsICcpfWA7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2lnbmVkQW5nbGUoYTogVjMsIGI6IFYzLCBuOiBWMyk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoZG90KGNyb3NzKHYzKCksIGEsIGIpLCBuKSwgZG90KGEsIGIpKTtcbn1cblxuZnVuY3Rpb24gcm90YXRlRHJhZyhjYW06IGFueSwgZjogSGFuZGxlRnJhbWUsIGF4aXM6IEhhbmRsZUF4aXMsIG14OiBudW1iZXIsIG15OiBudW1iZXIsIHN0YXJ0czogRWxlbWVudFN0YXJ0W10pOiBIYW5kbGVEcmFnIHwgbnVsbCB7XG4gICAgY29uc3QgbiA9IGF4aXMgPT09ICd2aWV3JyA/IHNjYWxlKHYzKCksIGNhbWVyYUZvcndhcmQoY2FtKSwgLTEpIDogY29weSh2MygpLCBmLmF4ZXNbQVhJU19JTkRFWFtheGlzXSA/PyAyXSk7XG4gICAgY29uc3QgcGl2b3QgPSBjb3B5KHYzKCksIGYucGl2b3QpO1xuICAgIGNvbnN0IHNwID0gdG9TY3JlZW4oY2FtLCBwaXZvdCk7XG4gICAgY29uc3Qgb25QbGFuZSA9ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBoaXQgPSByYXlQbGFuZShzY3JlZW5SYXkoY2FtLCB4LCB5KSwgcGl2b3QsIG4sIHRydWUpO1xuICAgICAgICBpZiAoIWhpdCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHYgPSBzdWIodjMoKSwgaGl0LCBwaXZvdCk7XG4gICAgICAgIHJldHVybiBsZW5TcSh2KSA+IEVQU0lMT04gPyB2IDogbnVsbDtcbiAgICB9O1xuICAgIGNvbnN0IGZhY2luZyA9IE1hdGguYWJzKGRvdChuLCBjYW1lcmFGb3J3YXJkKGNhbSkpKTtcbiAgICBjb25zdCB1c2VTY3JlZW4gPSBmYWNpbmcgPCAwLjE1OyAvLyByaW5nIHNlZW4gZWRnZS1vbjogdXNlIHNjcmVlbiBhbmdsZVxuICAgIGNvbnN0IHYwID0gdXNlU2NyZWVuID8gbnVsbCA6IG9uUGxhbmUobXgsIG15KTtcbiAgICBjb25zdCBhMCA9IE1hdGguYXRhbjIobXkgLSBzcC55LCBteCAtIHNwLngpO1xuICAgIGNvbnN0IHNjcmVlblNpZ24gPSBkb3QobiwgY2FtZXJhRm9yd2FyZChjYW0pKSA+IDAgPyAxIDogLTE7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZnJhbWU6IGYsXG4gICAgICAgIGF4aXMsXG4gICAgICAgIHVwZGF0ZSh4LCB5LCBldikge1xuICAgICAgICAgICAgbGV0IGFuZ2xlOiBudW1iZXI7XG4gICAgICAgICAgICBjb25zdCB2MSA9IHYwID8gb25QbGFuZSh4LCB5KSA6IG51bGw7XG4gICAgICAgICAgICBpZiAodjAgJiYgdjEpIGFuZ2xlID0gc2lnbmVkQW5nbGUodjAsIHYxLCBuKTtcbiAgICAgICAgICAgIGVsc2UgYW5nbGUgPSAoTWF0aC5hdGFuMih5IC0gc3AueSwgeCAtIHNwLngpIC0gYTApICogLXNjcmVlblNpZ247XG4gICAgICAgICAgICBjb25zdCBzbmFwID0gc25hcENvbmZpZygpO1xuICAgICAgICAgICAgbGV0IGRlZyA9IChhbmdsZSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgICAgICAgICAgaWYgKHNuYXAuaXNSb3RhdGlvblNuYXBFbmFibGVkICE9PSAhIWV2Py5jdHJsS2V5KSBkZWcgPSBzbmFwU3RlcChkZWcsIHNuYXAucm90YXRpb24gfHwgMTUpO1xuICAgICAgICAgICAgY29uc3QgcSA9IHFGcm9tQXhpc0FuZ2xlKHE0KCksIG4sIChkZWcgKiBNYXRoLlBJKSAvIDE4MCk7XG4gICAgICAgICAgICBjb25zdCBtYW55ID0gc3RhcnRzLmxlbmd0aCA+IDE7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3RhcnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZSA9IHMuZTtcbiAgICAgICAgICAgICAgICBjb25zdCBrID0gZ2V0S25vdChlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWspIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChlLnBhcnQgPT09ICdrbm90Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFueSB8fCBsZW4oc3ViKHYzKCksIHMucG9zLCBwaXZvdCkpID4gRVBTSUxPTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9IGFkZCh2MygpLCBwaXZvdCwgcVJvdGF0ZSh2MygpLCBxLCBzdWIodjMoKSwgcy5wb3MsIHBpdm90KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0S25vdFdvcmxkKGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2V0S25vdFdvcmxkUm90YXRpb24oZS5jb21wLCBrLCBxTXVsKHE0KCksIHEsIHMucm90ISkpO1xuICAgICAgICAgICAgICAgICAgICBhcHBseVRhbmdlbnRNb2RlKGUuY29tcC5zcGxpbmVzW2Uuc3BsaW5lXSwgZS5rbm90KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRUYW5nZW50V29ybGRWZWMoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCBlLnBhcnQgYXMgJ2luJyB8ICdvdXQnLCBxUm90YXRlKHYzKCksIHEsIHMudHZlYyEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYCR7ZGVnLnRvRml4ZWQoMSl9XHUwMEIwYDtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzY2FsZURyYWcoY2FtOiBhbnksIGY6IEhhbmRsZUZyYW1lLCBheGlzOiBIYW5kbGVBeGlzLCBteDogbnVtYmVyLCBteTogbnVtYmVyLCBzdGFydHM6IEVsZW1lbnRTdGFydFtdKTogSGFuZGxlRHJhZyB8IG51bGwge1xuICAgIGNvbnN0IHBpdm90ID0gY29weSh2MygpLCBmLnBpdm90KTtcbiAgICBjb25zdCBzcCA9IHRvU2NyZWVuKGNhbSwgcGl2b3QpO1xuICAgIGxldCBkaXJYID0gMTtcbiAgICBsZXQgZGlyWSA9IDA7XG4gICAgbGV0IHNjcmVlbkxlbiA9IDgwO1xuICAgIGlmIChheGlzIGluIEFYSVNfSU5ERVgpIHtcbiAgICAgICAgY29uc3QgdGlwID0gdG9TY3JlZW4oY2FtLCBzY2FsZUFuZEFkZCh2MygpLCBwaXZvdCwgZi5heGVzW0FYSVNfSU5ERVhbYXhpc11dLCBmLnNpemUpKTtcbiAgICAgICAgY29uc3QgZHggPSB0aXAueCAtIHNwLng7XG4gICAgICAgIGNvbnN0IGR5ID0gdGlwLnkgLSBzcC55O1xuICAgICAgICBjb25zdCBsID0gTWF0aC5oeXBvdChkeCwgZHkpO1xuICAgICAgICBpZiAobCA+IDEpIHtcbiAgICAgICAgICAgIGRpclggPSBkeCAvIGw7XG4gICAgICAgICAgICBkaXJZID0gZHkgLyBsO1xuICAgICAgICAgICAgc2NyZWVuTGVuID0gbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBheCA9IGYuYXhlcztcbiAgICAvLyBBcHBsaWVzIGEgcGVyLWF4aXMgc2NhbGUgKGluIGhhbmRsZSBheGVzKSB0byBhIHdvcmxkIHZlY3Rvci5cbiAgICBjb25zdCBzY2FsZVZlYyA9ICh2OiBWMywgczogW251bWJlciwgbnVtYmVyLCBudW1iZXJdKSA9PiB7XG4gICAgICAgIGNvbnN0IG91dCA9IHYzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSBzY2FsZUFuZEFkZChvdXQsIG91dCwgYXhbaV0sIGRvdCh2LCBheFtpXSkgKiBzW2ldKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIGZyYW1lOiBmLFxuICAgICAgICBheGlzLFxuICAgICAgICB1cGRhdGUoeCwgeSwgZXYpIHtcbiAgICAgICAgICAgIGxldCBmYWN0b3I6IG51bWJlcjtcbiAgICAgICAgICAgIGlmIChheGlzID09PSAnZnJlZScpIGZhY3RvciA9IDEgKyAoKHggLSBteCkgKyAoeSAtIG15KSkgLyAxMjA7XG4gICAgICAgICAgICBlbHNlIGZhY3RvciA9IDEgKyAoKHggLSBteCkgKiBkaXJYICsgKHkgLSBteSkgKiBkaXJZKSAvIHNjcmVlbkxlbjtcbiAgICAgICAgICAgIGNvbnN0IHNuYXAgPSBzbmFwQ29uZmlnKCk7XG4gICAgICAgICAgICBpZiAoc25hcC5pc1NjYWxlU25hcEVuYWJsZWQgIT09ICEhZXY/LmN0cmxLZXkpIGZhY3RvciA9IDEgKyBzbmFwU3RlcChmYWN0b3IgLSAxLCBzbmFwLnNjYWxlIHx8IDAuMSk7XG4gICAgICAgICAgICBjb25zdCBzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gPSBheGlzID09PSAnZnJlZScgPyBbZmFjdG9yLCBmYWN0b3IsIGZhY3Rvcl0gOiBbMSwgMSwgMV07XG4gICAgICAgICAgICBpZiAoYXhpcyBpbiBBWElTX0lOREVYKSBzW0FYSVNfSU5ERVhbYXhpc11dID0gZmFjdG9yO1xuICAgICAgICAgICAgY29uc3QgbWFueSA9IHN0YXJ0cy5sZW5ndGggPiAxO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzdCBvZiBzdGFydHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlID0gc3QuZTtcbiAgICAgICAgICAgICAgICBjb25zdCBrID0gZ2V0S25vdChlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWspIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChlLnBhcnQgPT09ICdrbm90Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFueSkgc2V0S25vdFdvcmxkKGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgYWRkKHYzKCksIHBpdm90LCBzY2FsZVZlYyhzdWIodjMoKSwgc3QucG9zLCBwaXZvdCksIHMpKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwbGluZSA9IGUuY29tcC5zcGxpbmVzW2Uuc3BsaW5lXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhbmdlbnRzRWRpdGFibGUoay5tb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2NhbGUgYm90aCB0YW5nZW50czsgQnJva2VuIGtlZXBzIHRoZW0gaW5kZXBlbmRlbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW4gPSBzY2FsZVZlYyhzdC50aW4hLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvdXQgPSBzY2FsZVZlYyhzdC50b3V0ISwgcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUYW5nZW50V29ybGRWZWMoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCAnb3V0JywgdG91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoay5tb2RlID09PSBUYW5nZW50TW9kZS5Ccm9rZW4pIHNldFRhbmdlbnRXb3JsZFZlYyhlLmNvbXAsIGUuc3BsaW5lLCBlLmtub3QsICdpbicsIHRpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChrLm1vZGUgPT09IFRhbmdlbnRNb2RlLkNvbnRpbnVvdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDb250aW51b3VzIGtlZXBzIGl0cyBvd24gaW4gbGVuZ3RoOiBzY2FsZSBpdCB0b28gKE1pcnJvcmVkIGZvbGxvd3MgdGhlIG91dCB0YW5nZW50KS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXIgPSBub3JtYWxpemUodjMoKSwgdGFuZ2VudFdvcmxkVmVjKGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgJ2luJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZW5TcShkaXIpID4gRVBTSUxPTikgc2V0VGFuZ2VudFdvcmxkVmVjKGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgJ2luJywgc2NhbGUodjMoKSwgZGlyLCBsZW4odGluKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5VGFuZ2VudE1vZGUoc3BsaW5lLCBlLmtub3QpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRhbmdlbnRXb3JsZFZlYyhlLmNvbXAsIGUuc3BsaW5lLCBlLmtub3QsIGUucGFydCBhcyAnaW4nIHwgJ291dCcsIHNjYWxlVmVjKHN0LnR2ZWMhLCBzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGBcdTAwRDcgJHtmYWN0b3IudG9GaXhlZCgzKX1gO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbmV4cG9ydCB7IGtub3RVcCwga25vdFdvcmxkUG9zaXRpb24gfTtcbiIsICIvKipcbiAqIEVkaXQgY29udGV4dCAoVW5pdHkncyBzcGxpbmUgdG9vbCBjb250ZXh0KSwgdGhlIGNvbnRhaW5lcnMgYmVpbmcgZWRpdGVkLFxuICogYW5kIHRoZSBzdGF0ZSBzaG93biBieSB0aGUgU3BsaW5lcyBwYW5lbCBhbmQgSW5zcGVjdG9yLlxuICovXG5pbXBvcnQgeyB2MywgcVRvRXVsZXIsIGxlbiB9IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL21hdGgnO1xuaW1wb3J0IHsgaXNMaW5rZWQsIGlzRW5kS25vdCwgdGFuZ2VudEluVmVjLCB0YW5nZW50T3V0VmVjLCBUYW5nZW50TW9kZSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL3NwbGluZS1jb3JlJztcbmltcG9ydCB7IGN1cnJlbnRUYXJnZXRzLCBFbGVtZW50UmVmLCBnZXRLbm90IH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyBTLCBUb29sLCBidW1wU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IGlzMkRWaWV3LCByZXBhaW50LCB0cmFuc2Zvcm1Ub29sTmFtZSB9IGZyb20gJy4vZW52JztcblxuY29uc3QgQlJPQURDQVNUX01TID0gNjA7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVUYXJnZXRzKCk6IGFueVtdIHtcbiAgICBjb25zdCB0YXJnZXRzID0gY3VycmVudFRhcmdldHMoKTtcbiAgICBjb25zdCBrZXkgPSB0YXJnZXRzLm1hcCgoYykgPT4gYy51dWlkKS5qb2luKCcsJyk7XG4gICAgaWYgKGtleSAhPT0gUy50YXJnZXRzS2V5KSB7XG4gICAgICAgIFMudGFyZ2V0c0tleSA9IGtleTtcbiAgICAgICAgYnVtcFN0YXRlKCk7XG4gICAgfVxuICAgIFMubGFzdFRhcmdldHMgPSB0YXJnZXRzO1xuICAgIGlmIChTLnNlbGVjdGlvbi52YWxpZGF0ZSh0YXJnZXRzKSkgYnVtcFN0YXRlKCk7XG4gICAgY29uc3QgcGVuZGluZyA9IFMucGVuZGluZ0NvbnRleHQ7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgICAgaWYgKHRhcmdldHMuaW5jbHVkZXMocGVuZGluZy5jb21wKSkge1xuICAgICAgICAgICAgUy5wZW5kaW5nQ29udGV4dCA9IG51bGw7XG4gICAgICAgICAgICBzZXRDb250ZXh0KHRydWUpO1xuICAgICAgICAgICAgc2V0VG9vbChwZW5kaW5nLnRvb2wpO1xuICAgICAgICB9IGVsc2UgaWYgKERhdGUubm93KCkgPiBwZW5kaW5nLnVudGlsKSB7XG4gICAgICAgICAgICBTLnBlbmRpbmdDb250ZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChTLmNvbnRleHQpIHNldENvbnRleHQoZmFsc2UpO1xuICAgICAgICBpZiAoUy5kcmF3aW5nKSBTLmRyYXdpbmcgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAoUy5kcmF3aW5nICYmICF0YXJnZXRzLmluY2x1ZGVzKFMuZHJhd2luZy5jb21wKSkge1xuICAgICAgICBTLmRyYXdpbmcgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENvbnRleHQob246IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoUy5jb250ZXh0ID09PSBvbikgcmV0dXJuO1xuICAgIFMuY29udGV4dCA9IG9uO1xuICAgIGlmICghb24pIHtcbiAgICAgICAgUy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICAgICAgUy50b29sID0gJ3NlbGVjdCc7XG4gICAgICAgIFMuZHJhd2luZyA9IG51bGw7XG4gICAgICAgIFMucHJldmlldyA9IG51bGw7XG4gICAgICAgIFMuaG92ZXIgPSBudWxsO1xuICAgIH1cbiAgICBidW1wU3RhdGUoKTtcbiAgICByZXBhaW50KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUb29sKHRvb2w6IFRvb2wpOiB2b2lkIHtcbiAgICBpZiAodG9vbCA9PT0gJ2RyYXcnKSBzZXRDb250ZXh0KHRydWUpO1xuICAgIGlmIChTLnRvb2wgPT09IHRvb2wpIHJldHVybjtcbiAgICBTLnRvb2wgPSB0b29sO1xuICAgIFMuZHJhd2luZyA9IG51bGw7XG4gICAgUy5wcmV2aWV3ID0gbnVsbDtcbiAgICBTLmhvdmVyID0gbnVsbDtcbiAgICBidW1wU3RhdGUoKTtcbiAgICByZXBhaW50KCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwYW5lbCBzdGF0ZVxuXG5leHBvcnQgaW50ZXJmYWNlIEVsZW1lbnRJbmZvIHtcbiAgICBraW5kOiAna25vdCcgfCAndGFuZ2VudCc7XG4gICAgY291bnQ6IG51bWJlcjtcbiAgICBrbm90czogbnVtYmVyO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgcG9zaXRpb246IChudW1iZXIgfCBudWxsKVtdO1xuICAgIHJvdGF0aW9uOiAobnVtYmVyIHwgbnVsbClbXTtcbiAgICBtb2RlOiBudW1iZXIgfCBudWxsO1xuICAgIHRlbnNpb246IG51bWJlciB8IG51bGw7XG4gICAgdGFuZ2VudEluOiBudW1iZXIgfCBudWxsO1xuICAgIHRhbmdlbnRPdXQ6IG51bWJlciB8IG51bGw7XG4gICAgbGlua2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhbmVsU3RhdGUge1xuICAgIHByaW1hcnk6IGJvb2xlYW47XG4gICAgcmVhZHk6IGJvb2xlYW47XG4gICAgY29udGV4dDogYm9vbGVhbjtcbiAgICB0b29sOiBUb29sO1xuICAgIGRyYXdpbmc6IGJvb2xlYW47XG4gICAgaXMyRDogYm9vbGVhbjtcbiAgICB0cmFuc2Zvcm1Ub29sOiBzdHJpbmc7XG4gICAgc2V0dGluZ3M6IHR5cGVvZiBTLnNldHRpbmdzO1xuICAgIHRhcmdldHM6IHsgdXVpZDogc3RyaW5nOyBub2RlOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgc3BsaW5lczogbnVtYmVyOyBrbm90czogbnVtYmVyIH1bXTtcbiAgICBzZWxlY3Rpb246IHsgY291bnQ6IG51bWJlcjsga25vdHM6IG51bWJlcjsgdGFuZ2VudHM6IG51bWJlciB9O1xuICAgIGVsZW1lbnQ6IEVsZW1lbnRJbmZvIHwgbnVsbDtcbiAgICBhY3Rpb25zOiBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPjtcbiAgICBjbG9zZWQ6IGJvb2xlYW4gfCBudWxsO1xufVxuXG5mdW5jdGlvbiBzaGFyZWQ8VD4odmFsdWVzOiBUW10sIGVxOiAoYTogVCwgYjogVCkgPT4gYm9vbGVhbiA9IChhLCBiKSA9PiBhID09PSBiKTogVCB8IG51bGwge1xuICAgIGlmICghdmFsdWVzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHZhbHVlcy5ldmVyeSgodikgPT4gZXEodiwgdmFsdWVzWzBdKSkgPyB2YWx1ZXNbMF0gOiBudWxsO1xufVxuXG5mdW5jdGlvbiByb3VuZCh2OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHYgKiAxMDAwMCkgLyAxMDAwMDtcbn1cblxuZnVuY3Rpb24gZWxlbWVudEluZm8obGlzdDogRWxlbWVudFJlZltdKTogRWxlbWVudEluZm8gfCBudWxsIHtcbiAgICBpZiAoIWxpc3QubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBrbm90cyA9IGxpc3QuZmlsdGVyKChlKSA9PiBlLnBhcnQgPT09ICdrbm90Jyk7XG4gICAgY29uc3QgaXRlbXMgPSBrbm90cy5sZW5ndGggPyBrbm90cyA6IGxpc3Q7XG4gICAgY29uc3Qga3MgPSBpdGVtcy5tYXAoKGUpID0+IGdldEtub3QoZSkpLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZiAoIWtzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcG9zID0gKGF4aXM6ICd4JyB8ICd5JyB8ICd6JykgPT4gc2hhcmVkKGtzLm1hcCgoazogYW55KSA9PiByb3VuZChrLnBvc2l0aW9uW2F4aXNdKSkpO1xuICAgIGNvbnN0IGV1bGVycyA9IGtzLm1hcCgoazogYW55KSA9PiBxVG9FdWxlcih2MygpLCBrLnJvdGF0aW9uKSk7XG4gICAgY29uc3Qgcm90ID0gKGF4aXM6ICd4JyB8ICd5JyB8ICd6JykgPT4gc2hhcmVkKGV1bGVycy5tYXAoKGUpID0+IHJvdW5kKGVbYXhpc10pKSk7XG4gICAgY29uc3QgdGluID0gc2hhcmVkKGtzLm1hcCgoazogYW55KSA9PiByb3VuZChsZW4odGFuZ2VudEluVmVjKHYzKCksIGspKSkpKTtcbiAgICBjb25zdCB0b3V0ID0gc2hhcmVkKGtzLm1hcCgoazogYW55KSA9PiByb3VuZChsZW4odGFuZ2VudE91dFZlYyh2MygpLCBrKSkpKSk7XG4gICAgY29uc3QgZmlyc3QgPSBpdGVtc1swXTtcbiAgICBjb25zdCBraW5kID0ga25vdHMubGVuZ3RoID8gJ2tub3QnIDogJ3RhbmdlbnQnO1xuICAgIGxldCBsYWJlbDogc3RyaW5nO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbGFiZWwgPSBraW5kID09PSAna25vdCdcbiAgICAgICAgICAgID8gYEtub3QgJHtmaXJzdC5rbm90fWAgKyAoZmlyc3QuY29tcC5zcGxpbmVzLmxlbmd0aCA+IDEgPyBgIChTcGxpbmUgJHtmaXJzdC5zcGxpbmV9KWAgOiAnJylcbiAgICAgICAgICAgIDogYCR7Zmlyc3QucGFydCA9PT0gJ2luJyA/ICdJbicgOiAnT3V0J30gVGFuZ2VudCBvZiBLbm90ICR7Zmlyc3Qua25vdH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxhYmVsID0gYCR7aXRlbXMubGVuZ3RofSAke2tpbmQgPT09ICdrbm90JyA/ICdLbm90cycgOiAnVGFuZ2VudHMnfWA7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQsXG4gICAgICAgIGNvdW50OiBsaXN0Lmxlbmd0aCxcbiAgICAgICAga25vdHM6IGtub3RzLmxlbmd0aCxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIHBvc2l0aW9uOiBbcG9zKCd4JyksIHBvcygneScpLCBwb3MoJ3onKV0sXG4gICAgICAgIHJvdGF0aW9uOiBbcm90KCd4JyksIHJvdCgneScpLCByb3QoJ3onKV0sXG4gICAgICAgIG1vZGU6IHNoYXJlZChrcy5tYXAoKGs6IGFueSkgPT4gay5tb2RlKSksXG4gICAgICAgIHRlbnNpb246IHNoYXJlZChrcy5tYXAoKGs6IGFueSkgPT4gcm91bmQoay50ZW5zaW9uKSkpLFxuICAgICAgICB0YW5nZW50SW46IHRpbixcbiAgICAgICAgdGFuZ2VudE91dDogdG91dCxcbiAgICAgICAgbGlua2VkOiBrbm90cy5zb21lKChlKSA9PiBpc0xpbmtlZChlLmNvbXAsIHsgc3BsaW5lOiBlLnNwbGluZSwga25vdDogZS5rbm90IH0pKSxcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXZhaWxhYmxlQWN0aW9ucygpOiBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPiB7XG4gICAgY29uc3Qga25vdHMgPSBTLnNlbGVjdGlvbi5rbm90cygpO1xuICAgIGNvbnN0IHNhbWVDb21wID0ga25vdHMubGVuZ3RoID4gMCAmJiBrbm90cy5ldmVyeSgoZSkgPT4gZS5jb21wID09PSBrbm90c1swXS5jb21wKTtcbiAgICBjb25zdCBlbmRzID0ga25vdHMuZmlsdGVyKChlKSA9PiBpc0VuZEtub3QoZS5jb21wLnNwbGluZXNbZS5zcGxpbmVdLCBlLmtub3QpKTtcbiAgICBjb25zdCBvbmUgPSBrbm90cy5sZW5ndGggPT09IDEgPyBrbm90c1swXSA6IG51bGw7XG4gICAgY29uc3Qgb25lU3BsaW5lID0gb25lID8gb25lLmNvbXAuc3BsaW5lc1tvbmUuc3BsaW5lXSA6IG51bGw7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVsZXRlOiBTLnNlbGVjdGlvbi5zaXplID4gMCxcbiAgICAgICAgbGluazoga25vdHMubGVuZ3RoID49IDIgJiYgc2FtZUNvbXAsXG4gICAgICAgIHVubGluazoga25vdHMuc29tZSgoZSkgPT4gaXNMaW5rZWQoZS5jb21wLCB7IHNwbGluZTogZS5zcGxpbmUsIGtub3Q6IGUua25vdCB9KSksXG4gICAgICAgIHNwbGl0OiAhIW9uZSAmJiAhIW9uZVNwbGluZSAmJiAob25lU3BsaW5lLmNsb3NlZCB8fCAob25lLmtub3QgPiAwICYmIG9uZS5rbm90IDwgb25lU3BsaW5lLmtub3RzLmxlbmd0aCAtIDEpKSxcbiAgICAgICAgam9pbjoga25vdHMubGVuZ3RoID09PSAyICYmIHNhbWVDb21wICYmIGVuZHMubGVuZ3RoID09PSAyLFxuICAgICAgICByZXZlcnNlOiBrbm90cy5sZW5ndGggPiAwIHx8IFMubGFzdFRhcmdldHMubGVuZ3RoID4gMCxcbiAgICAgICAgY2xvc2U6IFMubGFzdFRhcmdldHMubGVuZ3RoID4gMCxcbiAgICAgICAgc2VsZWN0QWxsOiBTLmxhc3RUYXJnZXRzLmxlbmd0aCA+IDAsXG4gICAgfTtcbn1cblxuLyoqIFNwbGluZSBvZiB0aGUgc2VsZWN0aW9uIChvciB0aGUgZmlyc3Qgc3BsaW5lIG9mIHRoZSBlZGl0ZWQgY29udGFpbmVycykgYW5kIHdoZXRoZXIgaXQgaXMgY2xvc2VkLiAqL1xuZnVuY3Rpb24gY2xvc2VkU3RhdGUoKTogYm9vbGVhbiB8IG51bGwge1xuICAgIGNvbnN0IGtub3RzID0gUy5zZWxlY3Rpb24uYWxsKCk7XG4gICAgY29uc3Qgc3BsaW5lcyA9IG5ldyBTZXQ8YW55PigpO1xuICAgIGZvciAoY29uc3QgZSBvZiBrbm90cykge1xuICAgICAgICBjb25zdCBzID0gZS5jb21wLnNwbGluZXNbZS5zcGxpbmVdO1xuICAgICAgICBpZiAocykgc3BsaW5lcy5hZGQocyk7XG4gICAgfVxuICAgIGlmICghc3BsaW5lcy5zaXplKSBmb3IgKGNvbnN0IGMgb2YgUy5sYXN0VGFyZ2V0cykgZm9yIChjb25zdCBzIG9mIGMuc3BsaW5lcykgc3BsaW5lcy5hZGQocyk7XG4gICAgaWYgKCFzcGxpbmVzLnNpemUpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBzaGFyZWQoWy4uLnNwbGluZXNdLm1hcCgocykgPT4gISFzLmNsb3NlZCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFuZWxTdGF0ZSgpOiBQYW5lbFN0YXRlIHtcbiAgICAvLyBVbmRvIG9yIGEgZGVsZXRlIG1heSBoYXZlIHJlbW92ZWQgc2VsZWN0ZWQga25vdHMgc2luY2UgdGhlIGxhc3QgZnJhbWUuXG4gICAgaWYgKFMuc2VsZWN0aW9uLnZhbGlkYXRlKFMubGFzdFRhcmdldHMpKSBidW1wU3RhdGUoKTtcbiAgICBjb25zdCBsaXN0ID0gUy5zZWxlY3Rpb24uYWxsKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJpbWFyeTogUy5wcmltYXJ5LFxuICAgICAgICByZWFkeTogdHJ1ZSxcbiAgICAgICAgY29udGV4dDogUy5jb250ZXh0LFxuICAgICAgICB0b29sOiBTLnRvb2wsXG4gICAgICAgIGRyYXdpbmc6ICEhUy5kcmF3aW5nLFxuICAgICAgICBpczJEOiBpczJEVmlldygpLFxuICAgICAgICB0cmFuc2Zvcm1Ub29sOiB0cmFuc2Zvcm1Ub29sTmFtZSgpLFxuICAgICAgICBzZXR0aW5nczogeyAuLi5TLnNldHRpbmdzIH0sXG4gICAgICAgIHRhcmdldHM6IFMubGFzdFRhcmdldHMubWFwKChjKSA9PiAoe1xuICAgICAgICAgICAgdXVpZDogYy51dWlkLFxuICAgICAgICAgICAgbm9kZTogYy5ub2RlLnV1aWQsXG4gICAgICAgICAgICBuYW1lOiBjLm5vZGUubmFtZSxcbiAgICAgICAgICAgIHNwbGluZXM6IGMuc3BsaW5lcy5sZW5ndGgsXG4gICAgICAgICAgICBrbm90czogYy5zcGxpbmVzLnJlZHVjZSgoYTogbnVtYmVyLCBzOiBhbnkpID0+IGEgKyBzLmtub3RzLmxlbmd0aCwgMCksXG4gICAgICAgIH0pKSxcbiAgICAgICAgc2VsZWN0aW9uOiB7IGNvdW50OiBsaXN0Lmxlbmd0aCwga25vdHM6IFMuc2VsZWN0aW9uLmtub3RzKCkubGVuZ3RoLCB0YW5nZW50czogUy5zZWxlY3Rpb24udGFuZ2VudHMoKS5sZW5ndGggfSxcbiAgICAgICAgZWxlbWVudDogZWxlbWVudEluZm8obGlzdCksXG4gICAgICAgIGFjdGlvbnM6IGF2YWlsYWJsZUFjdGlvbnMoKSxcbiAgICAgICAgY2xvc2VkOiBjbG9zZWRTdGF0ZSgpLFxuICAgIH07XG59XG5cbmxldCBsYXN0U2VudCA9ICcnO1xubGV0IGxhc3RTZW50QXQgPSAwO1xubGV0IHRpbWVyOiBhbnkgPSBudWxsO1xuXG4vKiogU2VuZHMgdGhlIHBhbmVsIHN0YXRlIGlmIGl0IGNoYW5nZWQgKHRocm90dGxlZCkuICovXG5leHBvcnQgZnVuY3Rpb24gbWF5YmVCcm9hZGNhc3QoZm9yY2UgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICghUy5wcmltYXJ5KSByZXR1cm47XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCB3YWl0ID0gQlJPQURDQVNUX01TIC0gKG5vdyAtIGxhc3RTZW50QXQpO1xuICAgIGlmICghZm9yY2UgJiYgd2FpdCA+IDApIHtcbiAgICAgICAgaWYgKCF0aW1lcikgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgICAgIG1heWJlQnJvYWRjYXN0KCk7XG4gICAgICAgIH0sIHdhaXQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBqc29uOiBzdHJpbmc7XG4gICAgY29uc3Qgc3RhdGUgPSBwYW5lbFN0YXRlKCk7XG4gICAgdHJ5IHtcbiAgICAgICAganNvbiA9IEpTT04uc3RyaW5naWZ5KHN0YXRlKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWZvcmNlICYmIGpzb24gPT09IGxhc3RTZW50KSByZXR1cm47XG4gICAgbGFzdFNlbnQgPSBqc29uO1xuICAgIGxhc3RTZW50QXQgPSBub3c7XG4gICAgdHJ5IHtcbiAgICAgICAgRWRpdG9yLk1lc3NhZ2UuYnJvYWRjYXN0KCdzcGxpbmVzOnN0YXRlJywgc3RhdGUpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBlZGl0b3Igc2h1dHRpbmcgZG93blxuICAgIH1cbn1cblxuZXhwb3J0IHsgVGFuZ2VudE1vZGUgfTtcbiIsICIvKipcbiAqIERyYXdzIHNwbGluZXMsIGtub3RzLCB0YW5nZW50cyBhbmQgaGFuZGxlcyBpbnRvIHRoZSBTY2VuZSB2aWV3IGVhY2ggZnJhbWUsXG4gKiBhbmQgZmluZHMgd2hhdCBpcyB1bmRlciB0aGUgbW91c2UuXG4gKi9cbmltcG9ydCB7IFYzLCB2Mywgc2NhbGVBbmRBZGQsIG5vcm1hbGl6ZSwgbGVuU3EgfSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9tYXRoJztcbmltcG9ydCB7IEN1cnZlLCBjdXJ2ZSwgZXZhbFBvc2l0aW9uLCBldmFsRGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvY3VydmUnO1xuaW1wb3J0IHtcbiAgICBUYW5nZW50TW9kZSwgZ2V0Q3VydmUsIGN1cnZlQ291bnQsIHByZXZJbmRleCwgbmV4dEluZGV4LCB0YW5nZW50c0VkaXRhYmxlLCBpc0xpbmtlZCwgY3VydmVVcCxcbn0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvc3BsaW5lLWNvcmUnO1xuaW1wb3J0IHsgYWxsQ29udGFpbmVycywgcnVudGltZVJlYWR5IH0gZnJvbSAnLi9lbnYnO1xuaW1wb3J0IHtcbiAgICBzY2VuZUNhbWVyYSwgdG9TY3JlZW4sIHdvcmxkUGVyUGl4ZWwsIGRpc3RUb1NlZ21lbnQsIGJlZ2luTGFiZWxzLCBhZGRMYWJlbCwgZW5kTGFiZWxzLCBTY3JlZW5Qb2ludCxcbn0gZnJvbSAnLi92aWV3JztcbmltcG9ydCAqIGFzIEQgZnJvbSAnLi9kcmF3JztcbmltcG9ydCB7XG4gICAgRWxlbWVudFJlZiwgUGFydCwgdG9Xb3JsZCwgZGlyVG9Xb3JsZCwga25vdFdvcmxkUG9zaXRpb24sIHRhbmdlbnRXb3JsZFBvc2l0aW9uLCB0YW5nZW50VXNlZCwgZ2V0S25vdCwgZWxlbWVudFdvcmxkUG9zaXRpb24sXG59IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHsgSGl0LCBTIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBjb21wdXRlRnJhbWUsIGRyYXdIYW5kbGUsIGhpdEhhbmRsZSwgSGFuZGxlRnJhbWUgfSBmcm9tICcuL2hhbmRsZXMnO1xuaW1wb3J0IHsgdXBkYXRlVGFyZ2V0cyB9IGZyb20gJy4vY29udGV4dCc7XG5cbmNvbnN0IEtOT1RfUFggPSA1O1xuY29uc3QgVEFOR0VOVF9QWCA9IDMuNTtcbmNvbnN0IEhJVF9LTk9UID0gODtcbmNvbnN0IEhJVF9UQU5HRU5UID0gNztcbmNvbnN0IEhJVF9DVVJWRSA9IDY7XG5cbmNvbnN0IF93YzogQ3VydmUgPSBjdXJ2ZSgpO1xuXG4vKiogQSBjdXJ2ZSdzIGNvbnRyb2wgcG9pbnRzIGluIHdvcmxkIHNwYWNlIChCZXppZXIgY3VydmVzIGFyZSBhZmZpbmUgaW52YXJpYW50KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3b3JsZEN1cnZlKGNvbXA6IGFueSwgc3BsaW5lOiBhbnksIGk6IG51bWJlciwgb3V0OiBDdXJ2ZSA9IF93Yyk6IEN1cnZlIHtcbiAgICBnZXRDdXJ2ZShzcGxpbmUsIGksIG91dCk7XG4gICAgdG9Xb3JsZChjb21wLCBvdXQucDAsIG91dC5wMCk7XG4gICAgdG9Xb3JsZChjb21wLCBvdXQucDEsIG91dC5wMSk7XG4gICAgdG9Xb3JsZChjb21wLCBvdXQucDIsIG91dC5wMik7XG4gICAgdG9Xb3JsZChjb21wLCBvdXQucDMsIG91dC5wMyk7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gY3VydmVTYW1wbGVzKGNhbTogYW55LCBjOiBDdXJ2ZSk6IG51bWJlciB7XG4gICAgY29uc3QgYSA9IHRvU2NyZWVuKGNhbSwgYy5wMCk7XG4gICAgY29uc3QgYiA9IHRvU2NyZWVuKGNhbSwgYy5wMSk7XG4gICAgY29uc3QgZCA9IHRvU2NyZWVuKGNhbSwgYy5wMik7XG4gICAgY29uc3QgZSA9IHRvU2NyZWVuKGNhbSwgYy5wMyk7XG4gICAgaWYgKCFhLnZpc2libGUgJiYgIWUudmlzaWJsZSkgcmV0dXJuIDg7XG4gICAgY29uc3QgbCA9IE1hdGguaHlwb3QoYi54IC0gYS54LCBiLnkgLSBhLnkpICsgTWF0aC5oeXBvdChkLnggLSBiLngsIGQueSAtIGIueSkgKyBNYXRoLmh5cG90KGUueCAtIGQueCwgZS55IC0gZC55KTtcbiAgICByZXR1cm4gTWF0aC5tYXgoNCwgTWF0aC5taW4oNjQsIE1hdGguY2VpbChsIC8gMTApKSk7XG59XG5cbmNvbnN0IHB0czogVjNbXSA9IFtdO1xuZnVuY3Rpb24gc2FtcGxlUG9pbnRzKGNhbTogYW55LCBjOiBDdXJ2ZSk6IFYzW10ge1xuICAgIGNvbnN0IG4gPSBjdXJ2ZVNhbXBsZXMoY2FtLCBjKTtcbiAgICB3aGlsZSAocHRzLmxlbmd0aCA8PSBuKSBwdHMucHVzaCh2MygpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBuOyBpKyspIGV2YWxQb3NpdGlvbihwdHNbaV0sIGMsIGkgLyBuKTtcbiAgICByZXR1cm4gcHRzLnNsaWNlKDAsIG4gKyAxKTtcbn1cblxuLyoqIFRhbmdlbnQgaGFuZGxlcyBzaG93biBmb3IgdGhlIHNlbGVjdGlvbiAoVW5pdHk6IHRoZSB0YW5nZW50cyBvZiB0aGUgY3VydmVzIG5leHQgdG8gc2VsZWN0ZWQgZWxlbWVudHMpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZpc2libGVUYW5nZW50cyh0YXJnZXRzOiBhbnlbXSk6IFNldDxzdHJpbmc+IHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBpZiAoIVMuY29udGV4dCkgcmV0dXJuIHNldDtcbiAgICBjb25zdCBhZGRUYW5nZW50ID0gKGNvbXA6IGFueSwgczogbnVtYmVyLCBrOiBudW1iZXIsIHBhcnQ6ICdpbicgfCAnb3V0JywgYWxsb3dBdXRvOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGNvbnN0IHNwbGluZSA9IGNvbXAuc3BsaW5lc1tzXTtcbiAgICAgICAgY29uc3Qga25vdCA9IHNwbGluZT8ua25vdHNba107XG4gICAgICAgIGlmICgha25vdCB8fCAhdGFuZ2VudFVzZWQoc3BsaW5lLCBrLCBwYXJ0KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRhbmdlbnRzRWRpdGFibGUoa25vdC5tb2RlKSAmJiAhKGFsbG93QXV0byAmJiBrbm90Lm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpKSByZXR1cm47XG4gICAgICAgIHNldC5hZGQoYCR7Y29tcC51dWlkfToke3N9OiR7a306JHtwYXJ0fWApO1xuICAgIH07XG4gICAgaWYgKFMuc2V0dGluZ3Muc2hvd0FsbFRhbmdlbnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgY29tcCBvZiB0YXJnZXRzKSB7XG4gICAgICAgICAgICBjb21wLnNwbGluZXMuZm9yRWFjaCgoc3BsaW5lOiBhbnksIHM6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc3BsaW5lLmtub3RzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFRhbmdlbnQoY29tcCwgcywgaywgJ2luJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBhZGRUYW5nZW50KGNvbXAsIHMsIGssICdvdXQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBlIG9mIFMuc2VsZWN0aW9uLmFsbCgpKSB7XG4gICAgICAgIGNvbnN0IHNwbGluZSA9IGUuY29tcC5zcGxpbmVzW2Uuc3BsaW5lXTtcbiAgICAgICAgaWYgKCFzcGxpbmUpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBuID0gc3BsaW5lLmtub3RzLmxlbmd0aDtcbiAgICAgICAgYWRkVGFuZ2VudChlLmNvbXAsIGUuc3BsaW5lLCBlLmtub3QsICdpbicsIGUucGFydCA9PT0gJ2tub3QnKTtcbiAgICAgICAgYWRkVGFuZ2VudChlLmNvbXAsIGUuc3BsaW5lLCBlLmtub3QsICdvdXQnLCBlLnBhcnQgPT09ICdrbm90Jyk7XG4gICAgICAgIGNvbnN0IHAgPSBwcmV2SW5kZXgoZS5rbm90LCBuLCBzcGxpbmUuY2xvc2VkKTtcbiAgICAgICAgY29uc3QgcSA9IG5leHRJbmRleChlLmtub3QsIG4sIHNwbGluZS5jbG9zZWQpO1xuICAgICAgICBpZiAocCAhPT0gZS5rbm90KSBhZGRUYW5nZW50KGUuY29tcCwgZS5zcGxpbmUsIHAsICdvdXQnLCBmYWxzZSk7XG4gICAgICAgIGlmIChxICE9PSBlLmtub3QpIGFkZFRhbmdlbnQoZS5jb21wLCBlLnNwbGluZSwgcSwgJ2luJywgZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gc2V0O1xufVxuXG5mdW5jdGlvbiBob3ZlcklzKGtpbmQ6ICdrbm90JyB8ICd0YW5nZW50JywgY29tcDogYW55LCBzOiBudW1iZXIsIGs6IG51bWJlciwgcGFydDogUGFydCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGggPSBTLmhvdmVyO1xuICAgIGlmICghaCB8fCAoaC5raW5kICE9PSBraW5kKSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHIgPSAoaCBhcyBhbnkpLnJlZiBhcyBFbGVtZW50UmVmO1xuICAgIHJldHVybiByLmNvbXAgPT09IGNvbXAgJiYgci5zcGxpbmUgPT09IHMgJiYgci5rbm90ID09PSBrICYmIHIucGFydCA9PT0gcGFydDtcbn1cblxuZnVuY3Rpb24gaG92ZXJDdXJ2ZShjb21wOiBhbnksIHM6IG51bWJlciwgaTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaCA9IFMuaG92ZXI7XG4gICAgcmV0dXJuICEhaCAmJiBoLmtpbmQgPT09ICdjdXJ2ZScgJiYgaC5jb21wID09PSBjb21wICYmIGguc3BsaW5lID09PSBzICYmIGguY3VydmUgPT09IGk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhd1xuXG5sZXQgaGFuZGxlQXhlc092ZXJyaWRlOiBbVjMsIFYzLCBWM10gfCBudWxsID0gbnVsbDtcblxuLyoqIEtlZXBzIHRoZSBoYW5kbGUgb3JpZW50YXRpb24gZml4ZWQgZHVyaW5nIGEgZHJhZy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRIYW5kbGVBeGVzT3ZlcnJpZGUoYXhlczogW1YzLCBWMywgVjNdIHwgbnVsbCk6IHZvaWQge1xuICAgIGhhbmRsZUF4ZXNPdmVycmlkZSA9IGF4ZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJyZW50SGFuZGxlRnJhbWUoY2FtOiBhbnkpOiBIYW5kbGVGcmFtZSB8IG51bGwge1xuICAgIGlmICghUy5jb250ZXh0IHx8IFMudG9vbCAhPT0gJ3NlbGVjdCcpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGxpc3QgPSBTLnNlbGVjdGlvbi5hbGwoKTtcbiAgICBpZiAoIWxpc3QubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29tcHV0ZUZyYW1lKGNhbSwgbGlzdCwgaGFuZGxlQXhlc092ZXJyaWRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdGcmFtZSgpOiB2b2lkIHtcbiAgICBpZiAoIXJ1bnRpbWVSZWFkeSgpKSByZXR1cm47XG4gICAgY29uc3QgY2FtID0gc2NlbmVDYW1lcmEoKTtcbiAgICBpZiAoIWNhbSkgcmV0dXJuO1xuICAgIGNvbnN0IHRhcmdldHMgPSB1cGRhdGVUYXJnZXRzKCk7XG4gICAgY29uc3QgY29udGFpbmVycyA9IFMuc2V0dGluZ3Muc2hvd0FsbCA/IGFsbENvbnRhaW5lcnMoKSA6IHRhcmdldHM7XG4gICAgaWYgKCFjb250YWluZXJzLmxlbmd0aCAmJiAhUy5wcmV2aWV3KSB7XG4gICAgICAgIGVuZExhYmVscygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghRC5iZWdpbkRyYXcoY2FtKSkgcmV0dXJuO1xuICAgIFMuZGlhZy5kcmF3cysrO1xuICAgIGJlZ2luTGFiZWxzKCk7XG4gICAgY29uc3QgdGFuZ2VudHMgPSB2aXNpYmxlVGFuZ2VudHModGFyZ2V0cyk7XG4gICAgZm9yIChjb25zdCBjb21wIG9mIGNvbnRhaW5lcnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRyYXdDb250YWluZXIoY2FtLCBjb21wLCB0YXJnZXRzLmluY2x1ZGVzKGNvbXApLCB0YW5nZW50cyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIFMuZGlhZy5lcnJvcnMubGVuZ3RoIDwgMzAgJiYgUy5kaWFnLmVycm9ycy5wdXNoKFN0cmluZygoZSBhcyBFcnJvcik/LnN0YWNrIHx8IGUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoUy5jb250ZXh0ICYmIFMudG9vbCA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgY29uc3QgZiA9IGN1cnJlbnRIYW5kbGVGcmFtZShjYW0pO1xuICAgICAgICBpZiAoZikgZHJhd0hhbmRsZShjYW0sIGYsIFMuaG92ZXI/LmtpbmQgPT09ICdoYW5kbGUnID8gUy5ob3Zlci5heGlzIDogZHJhZ0F4aXMpO1xuICAgIH1cbiAgICBkcmF3VG9vbFByZXZpZXcoY2FtKTtcbiAgICBlbmRMYWJlbHMoKTtcbn1cblxuLyoqIEF4aXMgYmVpbmcgZHJhZ2dlZCAoaGlnaGxpZ2h0ZWQpLiAqL1xuZXhwb3J0IGxldCBkcmFnQXhpczogYW55ID0gbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBzZXREcmFnQXhpcyhhOiBhbnkpOiB2b2lkIHtcbiAgICBkcmFnQXhpcyA9IGE7XG59XG5cbi8qKiBFeHRyYSBkcmF3aW5nIGhvb2sgZm9yIHRoZSBEcmF3IHRvb2wuICovXG5sZXQgcHJldmlld0RyYXdlcjogKChjYW06IGFueSkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRQcmV2aWV3RHJhd2VyKGZuOiAoKGNhbTogYW55KSA9PiB2b2lkKSB8IG51bGwpOiB2b2lkIHtcbiAgICBwcmV2aWV3RHJhd2VyID0gZm47XG59XG5cbmZ1bmN0aW9uIGRyYXdUb29sUHJldmlldyhjYW06IGFueSk6IHZvaWQge1xuICAgIGlmIChwcmV2aWV3RHJhd2VyKSBwcmV2aWV3RHJhd2VyKGNhbSk7XG59XG5cbmNvbnN0IF9wID0gdjMoKTtcbmNvbnN0IF9xID0gdjMoKTtcblxuZnVuY3Rpb24gZHJhd0NvbnRhaW5lcihjYW06IGFueSwgY29tcDogYW55LCBpc1RhcmdldDogYm9vbGVhbiwgdGFuZ2VudHM6IFNldDxzdHJpbmc+KTogdm9pZCB7XG4gICAgY29uc3QgZWRpdCA9IGlzVGFyZ2V0ICYmIFMuY29udGV4dDtcbiAgICBjb21wLnNwbGluZXMuZm9yRWFjaCgoc3BsaW5lOiBhbnksIHM6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjb3VudCA9IGN1cnZlQ291bnQoc3BsaW5lKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjID0gd29ybGRDdXJ2ZShjb21wLCBzcGxpbmUsIGkpO1xuICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gc2FtcGxlUG9pbnRzKGNhbSwgYyk7XG4gICAgICAgICAgICBsZXQgY29sID0gaXNUYXJnZXQgPyBELkNvbG9ycy5jdXJ2ZVNlbGVjdGVkIDogRC5Db2xvcnMuY3VydmVEaW07XG4gICAgICAgICAgICBpZiAoZWRpdCAmJiBob3ZlckN1cnZlKGNvbXAsIHMsIGkpKSBjb2wgPSBELkNvbG9ycy5jdXJ2ZUhvdmVyO1xuICAgICAgICAgICAgRC5wb2x5bGluZShwb2ludHMsIGNvbCwgaXNUYXJnZXQgPyAyIDogMSk7XG4gICAgICAgICAgICBpZiAoaXNUYXJnZXQgJiYgUy5zZXR0aW5ncy5zaG93RmxvdyAmJiBwb2ludHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIC8vIERpcmVjdGlvbiBhcnJvdyBpbiB0aGUgbWlkZGxlIG9mIGVhY2ggY3VydmUuXG4gICAgICAgICAgICAgICAgZXZhbFBvc2l0aW9uKF9wLCBjLCAwLjUpO1xuICAgICAgICAgICAgICAgIGV2YWxEaXJlY3Rpb24oX3EsIGMsIDAuNSk7XG4gICAgICAgICAgICAgICAgRC5jaGV2cm9uKF9wLCBfcSwgNywgRC5Db2xvcnMuZmxvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNUYXJnZXQgJiYgUy5zZXR0aW5ncy5zaG93Tm9ybWFscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG4gPSA0O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IG47IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gaiAvIG47XG4gICAgICAgICAgICAgICAgICAgIGlmIChqID09PSBuICYmIGkgPCBjb3VudCAtIDEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBldmFsUG9zaXRpb24oX3AsIGMsIHQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cCA9IHVwQXQoY29tcCwgc3BsaW5lLCBpLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbCA9IHdvcmxkUGVyUGl4ZWwoY2FtLCBfcCkgKiAyMjtcbiAgICAgICAgICAgICAgICAgICAgRC5saW5lKF9wLCBzY2FsZUFuZEFkZCh2MygpLCBfcCwgdXAsIGwpLCBELkNvbG9ycy5ub3JtYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVGFyZ2V0KSByZXR1cm47XG4gICAgICAgIGNvbnN0IG4gPSBzcGxpbmUua25vdHMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG47IGsrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zID0ga25vdFdvcmxkUG9zaXRpb24oY29tcCwgcywgaywgdjMoKSk7XG4gICAgICAgICAgICBjb25zdCBzcCA9IHRvU2NyZWVuKGNhbSwgcG9zKTtcbiAgICAgICAgICAgIGlmICghc3AudmlzaWJsZSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoZWRpdCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFydCBvZiBbJ2luJywgJ291dCddIGFzIGNvbnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGFuZ2VudHMuaGFzKGAke2NvbXAudXVpZH06JHtzfToke2t9OiR7cGFydH1gKSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdUYW5nZW50KGNhbSwgY29tcCwgcywgaywgcGFydCwgcG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkcmF3S25vdChjYW0sIGNvbXAsIHMsIGssIHBvcywgZWRpdCk7XG4gICAgICAgICAgICBpZiAoUy5zZXR0aW5ncy5zaG93S25vdEluZGljZXMgJiYgZWRpdCkge1xuICAgICAgICAgICAgICAgIGFkZExhYmVsKGNhbSwgc3AueCwgc3AueSwgbiA+IDAgJiYgc3BsaW5lLmNsb3NlZCA9PT0gZmFsc2UgJiYgayA9PT0gMCA/IGAke2t9IChzdGFydClgIDogU3RyaW5nKGspLCAnI2RkZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChuID09PSAxICYmIGVkaXQpIHtcbiAgICAgICAgICAgIC8vIEEgbG9uZSBrbm90IHN0aWxsIHNob3dzIGl0cyBkaXJlY3Rpb24uXG4gICAgICAgICAgICBjb25zdCBrID0gc3BsaW5lLmtub3RzWzBdO1xuICAgICAgICAgICAgY29uc3QgcG9zID0ga25vdFdvcmxkUG9zaXRpb24oY29tcCwgcywgMCwgdjMoKSk7XG4gICAgICAgICAgICBjb25zdCBkaXIgPSBkaXJUb1dvcmxkKGNvbXAsIHJvdGF0ZVooayksIHYzKCkpO1xuICAgICAgICAgICAgRC5jaGV2cm9uKHNjYWxlQW5kQWRkKHYzKCksIHBvcywgbm9ybWFsaXplKHYzKCksIGRpciksIHdvcmxkUGVyUGl4ZWwoY2FtLCBwb3MpICogMjIpLCBkaXIsIDcsIEQuQ29sb3JzLmZsb3cpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZVooazogYW55KTogVjMge1xuICAgIC8vIEtub3QgZm9yd2FyZCAoK1opIGluIHNwbGluZSBzcGFjZS5cbiAgICBjb25zdCBxID0gay5yb3RhdGlvbjtcbiAgICBjb25zdCB4ID0gMiAqIChxLnggKiBxLnogKyBxLncgKiBxLnkpO1xuICAgIGNvbnN0IHkgPSAyICogKHEueSAqIHEueiAtIHEudyAqIHEueCk7XG4gICAgY29uc3QgeiA9IDEgLSAyICogKHEueCAqIHEueCArIHEueSAqIHEueSk7XG4gICAgcmV0dXJuIHYzKHgsIHksIHopO1xufVxuXG4vKiogV29ybGQgdXAgdmVjdG9yIG9uIGN1cnZlIGBjdXJ2ZUluZGV4YCBhdCBjdXJ2ZSBwYXJhbWV0ZXIgdC4gKi9cbmZ1bmN0aW9uIHVwQXQoY29tcDogYW55LCBzcGxpbmU6IGFueSwgY3VydmVJbmRleDogbnVtYmVyLCB0OiBudW1iZXIpOiBWMyB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbG9jYWwgPSBjdXJ2ZVVwKHNwbGluZSwgc3BsaW5lLmNhY2hlLCBjdXJ2ZUluZGV4LCB0LCB2MygpKTtcbiAgICAgICAgY29uc3QgdyA9IGRpclRvV29ybGQoY29tcCwgbG9jYWwsIHYzKCkpO1xuICAgICAgICByZXR1cm4gbGVuU3EodykgPiAwID8gbm9ybWFsaXplKHcsIHcpIDogdjMoMCwgMSwgMCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiB2MygwLCAxLCAwKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdLbm90KGNhbTogYW55LCBjb21wOiBhbnksIHM6IG51bWJlciwgazogbnVtYmVyLCBwb3M6IFYzLCBlZGl0OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBlZGl0ICYmIFMuc2VsZWN0aW9uLmhhc0tub3QoY29tcCwgcywgayk7XG4gICAgY29uc3QgaG92ZXJlZCA9IGVkaXQgJiYgaG92ZXJJcygna25vdCcsIGNvbXAsIHMsIGssICdrbm90Jyk7XG4gICAgY29uc3QgbGlua2VkID0gaXNMaW5rZWQoY29tcCwgeyBzcGxpbmU6IHMsIGtub3Q6IGsgfSk7XG4gICAgaWYgKCFlZGl0KSB7XG4gICAgICAgIEQuZGlzYyhwb3MsIDMsIEQuQ29sb3JzLmN1cnZlU2VsZWN0ZWQsIDEwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByID0gc2VsZWN0ZWQgfHwgaG92ZXJlZCA/IEtOT1RfUFggKyAxIDogS05PVF9QWDtcbiAgICBELmRpc2MocG9zLCByLCBzZWxlY3RlZCA/IEQuQ29sb3JzLnNlbGVjdGVkIDogRC5Db2xvcnMua25vdCwgMTQpO1xuICAgIEQuY2lyY2xlKHBvcywgciwgaG92ZXJlZCA/IEQuQ29sb3JzLmhvdmVyIDogbGlua2VkID8gRC5Db2xvcnMubGlua2VkIDogRC5Db2xvcnMua25vdE91dGxpbmUsIDE0KTtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgLy8gS25vdCBvcmllbnRhdGlvbjogZm9yd2FyZCBhbG9uZyB0aGUgc3BsaW5lLCB1cCBpbiBncmVlbi5cbiAgICAgICAgY29uc3Qga25vdCA9IGNvbXAuc3BsaW5lc1tzXS5rbm90c1trXTtcbiAgICAgICAgY29uc3Qgd3BwID0gd29ybGRQZXJQaXhlbChjYW0sIHBvcyk7XG4gICAgICAgIGNvbnN0IGZ3ZCA9IG5vcm1hbGl6ZSh2MygpLCBkaXJUb1dvcmxkKGNvbXAsIHJvdGF0ZVooa25vdCksIHYzKCkpKTtcbiAgICAgICAgY29uc3QgdXBMb2NhbCA9IHVwT2Yoa25vdCk7XG4gICAgICAgIGNvbnN0IHVwID0gbm9ybWFsaXplKHYzKCksIGRpclRvV29ybGQoY29tcCwgdXBMb2NhbCwgdjMoKSkpO1xuICAgICAgICBpZiAobGVuU3EodXApID4gMCkgRC5saW5lKHBvcywgc2NhbGVBbmRBZGQodjMoKSwgcG9zLCB1cCwgd3BwICogMjApLCBELkNvbG9ycy5ub3JtYWwpO1xuICAgICAgICBpZiAobGVuU3EoZndkKSA+IDAgJiYga25vdC5tb2RlID09PSBUYW5nZW50TW9kZS5MaW5lYXIpIEQubGluZShwb3MsIHNjYWxlQW5kQWRkKHYzKCksIHBvcywgZndkLCB3cHAgKiAxNCksIEQuQ29sb3JzLnNlbGVjdGVkKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwT2YoazogYW55KTogVjMge1xuICAgIGNvbnN0IHEgPSBrLnJvdGF0aW9uO1xuICAgIGNvbnN0IHggPSAyICogKHEueCAqIHEueSAtIHEudyAqIHEueik7XG4gICAgY29uc3QgeSA9IDEgLSAyICogKHEueCAqIHEueCArIHEueiAqIHEueik7XG4gICAgY29uc3QgeiA9IDIgKiAocS55ICogcS56ICsgcS53ICogcS54KTtcbiAgICByZXR1cm4gdjMoeCwgeSwgeik7XG59XG5cbmZ1bmN0aW9uIGRyYXdUYW5nZW50KGNhbTogYW55LCBjb21wOiBhbnksIHM6IG51bWJlciwgazogbnVtYmVyLCBwYXJ0OiAnaW4nIHwgJ291dCcsIGtub3RQb3M6IFYzKTogdm9pZCB7XG4gICAgY29uc3QgZW5kID0gdGFuZ2VudFdvcmxkUG9zaXRpb24oY29tcCwgcywgaywgcGFydCwgdjMoKSk7XG4gICAgY29uc3QgcmVmOiBFbGVtZW50UmVmID0geyBjb21wLCBzcGxpbmU6IHMsIGtub3Q6IGssIHBhcnQgfTtcbiAgICBjb25zdCBzZWxlY3RlZCA9IFMuc2VsZWN0aW9uLmhhcyhyZWYpO1xuICAgIGNvbnN0IGhvdmVyZWQgPSBob3ZlcklzKCd0YW5nZW50JywgY29tcCwgcywgaywgcGFydCk7XG4gICAgY29uc3QgYXV0byA9IGNvbXAuc3BsaW5lc1tzXS5rbm90c1trXS5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoO1xuICAgIGNvbnN0IGxpbmVDb2wgPSBzZWxlY3RlZCA/IEQuQ29sb3JzLnNlbGVjdGVkIDogYXV0byA/IEQud2l0aEFscGhhKEQuQ29sb3JzLnRhbmdlbnRMaW5lLCAxMjApIDogRC5Db2xvcnMudGFuZ2VudExpbmU7XG4gICAgRC5saW5lKGtub3RQb3MsIGVuZCwgbGluZUNvbCk7XG4gICAgY29uc3QgY29sID0gc2VsZWN0ZWQgPyBELkNvbG9ycy5zZWxlY3RlZCA6IGhvdmVyZWQgPyBELkNvbG9ycy5ob3ZlciA6IGF1dG8gPyBELndpdGhBbHBoYShELkNvbG9ycy50YW5nZW50LCAxNDApIDogRC5Db2xvcnMudGFuZ2VudDtcbiAgICBELmRpYW1vbmQoZW5kLCBob3ZlcmVkIHx8IHNlbGVjdGVkID8gVEFOR0VOVF9QWCArIDEgOiBUQU5HRU5UX1BYLCBjb2wsIHRydWUpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaGl0IHRlc3RcblxuLyoqIEVsZW1lbnQgLyBoYW5kbGUgLyBjdXJ2ZSB1bmRlciBhIHNjcmVlbiBwb2ludCAodG9wbW9zdCBmaXJzdCkuICovXG5leHBvcnQgZnVuY3Rpb24gaGl0VGVzdChjYW06IGFueSwgbXg6IG51bWJlciwgbXk6IG51bWJlciwgb3B0czogeyBoYW5kbGVzPzogYm9vbGVhbjsgY3VydmVzPzogYm9vbGVhbjsgb3V0c2lkZUNvbnRleHQ/OiBib29sZWFuIH0gPSB7fSk6IEhpdCB8IG51bGwge1xuICAgIGNvbnN0IHRhcmdldHMgPSBTLmxhc3RUYXJnZXRzO1xuICAgIGlmICghdGFyZ2V0cy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIGlmIChTLmNvbnRleHQgJiYgb3B0cy5oYW5kbGVzICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBmID0gY3VycmVudEhhbmRsZUZyYW1lKGNhbSk7XG4gICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICBjb25zdCBheGlzID0gaGl0SGFuZGxlKGNhbSwgZiwgbXgsIG15KTtcbiAgICAgICAgICAgIGlmIChheGlzKSByZXR1cm4geyBraW5kOiAnaGFuZGxlJywgYXhpcyB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHNwOiBTY3JlZW5Qb2ludCA9IHsgeDogMCwgeTogMCwgdmlzaWJsZTogdHJ1ZSB9O1xuICAgIC8vIFRhbmdlbnRzIGZpcnN0ICh0aGV5IHNpdCBvbiB0b3Agb2Yga25vdHMgd2hlbiBzaG9ydCkuXG4gICAgaWYgKFMuY29udGV4dCkge1xuICAgICAgICBsZXQgYmVzdDogSGl0IHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGxldCBiZXN0RCA9IEhJVF9UQU5HRU5UO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB2aXNpYmxlVGFuZ2VudHModGFyZ2V0cykpIHtcbiAgICAgICAgICAgIGNvbnN0IFt1dWlkLCBzcywga2ssIHBhcnRdID0ga2V5LnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICBjb25zdCBjb21wID0gdGFyZ2V0cy5maW5kKChjKSA9PiBjLnV1aWQgPT09IHV1aWQpO1xuICAgICAgICAgICAgaWYgKCFjb21wKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBOdW1iZXIoc3MpO1xuICAgICAgICAgICAgY29uc3QgayA9IE51bWJlcihrayk7XG4gICAgICAgICAgICB0b1NjcmVlbihjYW0sIHRhbmdlbnRXb3JsZFBvc2l0aW9uKGNvbXAsIHMsIGssIHBhcnQgYXMgJ2luJyB8ICdvdXQnKSwgc3ApO1xuICAgICAgICAgICAgaWYgKCFzcC52aXNpYmxlKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBNYXRoLmh5cG90KHNwLnggLSBteCwgc3AueSAtIG15KTtcbiAgICAgICAgICAgIGlmIChkIDwgYmVzdEQpIHtcbiAgICAgICAgICAgICAgICBiZXN0RCA9IGQ7XG4gICAgICAgICAgICAgICAgYmVzdCA9IHsga2luZDogJ3RhbmdlbnQnLCByZWY6IHsgY29tcCwgc3BsaW5lOiBzLCBrbm90OiBrLCBwYXJ0OiBwYXJ0IGFzIFBhcnQgfSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChiZXN0KSByZXR1cm4gYmVzdDtcbiAgICB9XG4gICAgaWYgKFMuY29udGV4dCB8fCBvcHRzLm91dHNpZGVDb250ZXh0KSB7XG4gICAgICAgIGxldCBiZXN0OiBIaXQgfCBudWxsID0gbnVsbDtcbiAgICAgICAgbGV0IGJlc3REID0gSElUX0tOT1Q7XG4gICAgICAgIGZvciAoY29uc3QgY29tcCBvZiB0YXJnZXRzKSB7XG4gICAgICAgICAgICBjb21wLnNwbGluZXMuZm9yRWFjaCgoc3BsaW5lOiBhbnksIHM6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc3BsaW5lLmtub3RzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvU2NyZWVuKGNhbSwga25vdFdvcmxkUG9zaXRpb24oY29tcCwgcywgayksIHNwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzcC52aXNpYmxlKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZCA9IE1hdGguaHlwb3Qoc3AueCAtIG14LCBzcC55IC0gbXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZCA8IGJlc3REKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0RCA9IGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0ID0geyBraW5kOiAna25vdCcsIHJlZjogeyBjb21wLCBzcGxpbmU6IHMsIGtub3Q6IGssIHBhcnQ6ICdrbm90JyB9IH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmVzdCkgcmV0dXJuIGJlc3Q7XG4gICAgfVxuICAgIGlmIChvcHRzLmN1cnZlcyAhPT0gZmFsc2UgJiYgKFMuY29udGV4dCB8fCBvcHRzLm91dHNpZGVDb250ZXh0KSkgcmV0dXJuIGhpdEN1cnZlKGNhbSwgbXgsIG15LCB0YXJnZXRzKTtcbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpdEN1cnZlKGNhbTogYW55LCBteDogbnVtYmVyLCBteTogbnVtYmVyLCB0YXJnZXRzOiBhbnlbXSwgbWF4UHggPSBISVRfQ1VSVkUpOiBIaXQgfCBudWxsIHtcbiAgICBsZXQgYmVzdDogSGl0IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGJlc3REID0gbWF4UHg7XG4gICAgY29uc3QgYTogU2NyZWVuUG9pbnQgPSB7IHg6IDAsIHk6IDAsIHZpc2libGU6IHRydWUgfTtcbiAgICBjb25zdCBiOiBTY3JlZW5Qb2ludCA9IHsgeDogMCwgeTogMCwgdmlzaWJsZTogdHJ1ZSB9O1xuICAgIGZvciAoY29uc3QgY29tcCBvZiB0YXJnZXRzKSB7XG4gICAgICAgIGNvbXAuc3BsaW5lcy5mb3JFYWNoKChzcGxpbmU6IGFueSwgczogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IGN1cnZlQ291bnQoc3BsaW5lKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSB3b3JsZEN1cnZlKGNvbXAsIHNwbGluZSwgaSwgY3VydmUoKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbiA9IGN1cnZlU2FtcGxlcyhjYW0sIGMpICogMjtcbiAgICAgICAgICAgICAgICBjb25zdCBwID0gdjMoKTtcbiAgICAgICAgICAgICAgICBldmFsUG9zaXRpb24ocCwgYywgMCk7XG4gICAgICAgICAgICAgICAgdG9TY3JlZW4oY2FtLCBwLCBhKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSBuOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZXZhbFBvc2l0aW9uKHAsIGMsIGogLyBuKTtcbiAgICAgICAgICAgICAgICAgICAgdG9TY3JlZW4oY2FtLCBwLCBiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEudmlzaWJsZSAmJiBiLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHIgPSBkaXN0VG9TZWdtZW50KG14LCBteSwgYS54LCBhLnksIGIueCwgYi55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmRpc3QgPCBiZXN0RCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3REID0gci5kaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSAoaiAtIDEgKyByLmYpIC8gbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0ID0geyBraW5kOiAnY3VydmUnLCBjb21wLCBzcGxpbmU6IHMsIGN1cnZlOiBpLCB0LCB3b3JsZDogZXZhbFBvc2l0aW9uKHYzKCksIGMsIHQpIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYS54ID0gYi54O1xuICAgICAgICAgICAgICAgICAgICBhLnkgPSBiLnk7XG4gICAgICAgICAgICAgICAgICAgIGEudmlzaWJsZSA9IGIudmlzaWJsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYmVzdDtcbn1cblxuLyoqIEtub3RzIGluc2lkZSBhIHNjcmVlbiByZWN0YW5nbGUuICovXG5leHBvcnQgZnVuY3Rpb24ga25vdHNJblJlY3QoY2FtOiBhbnksIHgwOiBudW1iZXIsIHkwOiBudW1iZXIsIHgxOiBudW1iZXIsIHkxOiBudW1iZXIpOiBFbGVtZW50UmVmW10ge1xuICAgIGNvbnN0IG1pblggPSBNYXRoLm1pbih4MCwgeDEpO1xuICAgIGNvbnN0IG1heFggPSBNYXRoLm1heCh4MCwgeDEpO1xuICAgIGNvbnN0IG1pblkgPSBNYXRoLm1pbih5MCwgeTEpO1xuICAgIGNvbnN0IG1heFkgPSBNYXRoLm1heCh5MCwgeTEpO1xuICAgIGNvbnN0IHJlczogRWxlbWVudFJlZltdID0gW107XG4gICAgY29uc3Qgc3A6IFNjcmVlblBvaW50ID0geyB4OiAwLCB5OiAwLCB2aXNpYmxlOiB0cnVlIH07XG4gICAgZm9yIChjb25zdCBjb21wIG9mIFMubGFzdFRhcmdldHMpIHtcbiAgICAgICAgY29tcC5zcGxpbmVzLmZvckVhY2goKHNwbGluZTogYW55LCBzOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc3BsaW5lLmtub3RzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgdG9TY3JlZW4oY2FtLCBrbm90V29ybGRQb3NpdGlvbihjb21wLCBzLCBrKSwgc3ApO1xuICAgICAgICAgICAgICAgIGlmIChzcC52aXNpYmxlICYmIHNwLnggPj0gbWluWCAmJiBzcC54IDw9IG1heFggJiYgc3AueSA+PSBtaW5ZICYmIHNwLnkgPD0gbWF4WSkge1xuICAgICAgICAgICAgICAgICAgICByZXMucHVzaCh7IGNvbXAsIHNwbGluZTogcywga25vdDogaywgcGFydDogJ2tub3QnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG4iLCAiLyoqXG4gKiBVbmRvIHRocm91Z2ggdGhlIGVkaXRvcidzIHJlY29yZGluZyBBUEk6IGJlZ2luLXJlY29yZGluZyBzbmFwc2hvdHMgdGhlXG4gKiBub2RlcywgZW5kLXJlY29yZGluZyB0dXJucyB0aGUgZGlmZmVyZW5jZSBpbnRvIG9uZSB1bmRvIHN0ZXAuXG4gKlxuICogRWRpdHMgbWFkZSB3aGlsZSBhIHJlY29yZGluZyBpcyBiZWluZyBvcGVuZWQgYXJlIGhlbGQgYmFjayB1bnRpbCBpdCBpc1xuICogb3Blbiwgc28gdGhlIHNuYXBzaG90IGFsd2F5cyBoYXMgdGhlIHN0YXRlIGZyb20gYmVmb3JlIHRoZSBlZGl0LlxuICovXG5pbXBvcnQgeyBub3RpZnlOb2RlQ2hhbmdlZCwgcmVwYWludCB9IGZyb20gJy4vZW52JztcblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdChuYW1lOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCBuYW1lIGFzIGFueSwgLi4uYXJncyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBiZWdpblJlY29yZGluZyh1dWlkczogc3RyaW5nW10pOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICBpZiAoIXV1aWRzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaWQgPSBhd2FpdCByZXF1ZXN0KCdiZWdpbi1yZWNvcmRpbmcnLCB1dWlkcyk7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaWQgPT09ICdzdHJpbmcnICYmIGlkID8gaWQgOiBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdbU3BsaW5lc10gYmVnaW4tcmVjb3JkaW5nIGZhaWxlZDonLCBlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5kUmVjb3JkaW5nKGlkOiBzdHJpbmcgfCBudWxsLCBjYW5jZWwgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghaWQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCByZXF1ZXN0KGNhbmNlbCA/ICdjYW5jZWwtcmVjb3JkaW5nJyA6ICdlbmQtcmVjb3JkaW5nJywgaWQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdbU3BsaW5lc10gZW5kLXJlY29yZGluZyBmYWlsZWQ6JywgZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBub2Rlc09mKGNvbXBzOiBhbnlbXSk6IGFueVtdIHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PGFueT4oKTtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY29tcHMpIGlmIChjICYmIGMuaXNWYWxpZCAmJiBjLm5vZGUgJiYgYy5ub2RlLmlzVmFsaWQpIHNldC5hZGQoYy5ub2RlKTtcbiAgICByZXR1cm4gWy4uLnNldF07XG59XG5cbi8qKiBNYXJrcyBzcGxpbmVzIGRpcnR5IGFuZCB0ZWxscyB0aGUgZWRpdG9yIHRoZSBub2RlcyBjaGFuZ2VkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFmdGVyRWRpdChjb21wczogYW55W10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY29tcHMpIHtcbiAgICAgICAgaWYgKCFjIHx8ICFjLmlzVmFsaWQpIGNvbnRpbnVlO1xuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgYy5zcGxpbmVzKSBzLm1hcmtEaXJ0eT8uKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjLmNoZWNrQ2hhbmdlZD8uKCk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgLy8gbGlzdGVuZXJzIGZhaWxpbmcgbXVzdCBub3QgYnJlYWsgZWRpdGluZ1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgbiBvZiBub2Rlc09mKGNvbXBzKSkgbm90aWZ5Tm9kZUNoYW5nZWQobik7XG4gICAgcmVwYWludCgpO1xufVxuXG4vKiogT25lIHVuZG9hYmxlIGVkaXQgYXBwbGllZCBhdCBvbmNlLiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlY29yZEVkaXQoY29tcHM6IGFueVtdLCBmbjogKCkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlkID0gYXdhaXQgYmVnaW5SZWNvcmRpbmcobm9kZXNPZihjb21wcykubWFwKChuKSA9PiBuLnV1aWQpKTtcbiAgICBsZXQgb2sgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgICBvayA9IHRydWU7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgYWZ0ZXJFZGl0KGNvbXBzKTtcbiAgICAgICAgYXdhaXQgZW5kUmVjb3JkaW5nKGlkLCAhb2spO1xuICAgIH1cbn1cblxuY29uc3QgTk9USUZZX01TID0gMTIwO1xuXG4vKipcbiAqIEFuIHVuZG9hYmxlIGVkaXQgc3ByZWFkIG92ZXIgbWFueSB1cGRhdGVzIChhIGRyYWcpLiBgYXBwbHlgIGNhbGxzIGJlZm9yZVxuICogdGhlIHJlY29yZGluZyBpcyBvcGVuIGFyZSBkZWZlcnJlZDsgb25seSB0aGUgbGF0ZXN0IG9uZSBydW5zLlxuICovXG5leHBvcnQgY2xhc3MgRWRpdFNlc3Npb24ge1xuICAgIHByaXZhdGUgaWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgb3BlbmVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBlbmRlZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgcGVuZGluZzogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjaGFuZ2VkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBub3RpZmllZEF0ID0gMDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlYWR5OiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wczogYW55W10pIHtcbiAgICAgICAgdGhpcy5yZWFkeSA9IGJlZ2luUmVjb3JkaW5nKG5vZGVzT2YoY29tcHMpLm1hcCgobikgPT4gbi51dWlkKSkudGhlbigoaWQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmcgJiYgIXRoaXMuZW5kZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmbiA9IHRoaXMucGVuZGluZztcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmcgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMucnVuKGZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEFwcGxpZXMgYW4gZWRpdCAobm93LCBvciBhcyBzb29uIGFzIHRoZSByZWNvcmRpbmcgaXMgb3BlbikuICovXG4gICAgYXBwbHkoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZW5kZWQpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLm9wZW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nID0gZm47XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ydW4oZm4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcnVuKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIGZuKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLmNvbXBzKSBmb3IgKGNvbnN0IHMgb2YgYy5zcGxpbmVzKSBzLm1hcmtEaXJ0eT8uKCk7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGlmIChub3cgLSB0aGlzLm5vdGlmaWVkQXQgPiBOT1RJRllfTVMpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpZWRBdCA9IG5vdztcbiAgICAgICAgICAgIGZvciAoY29uc3QgbiBvZiBub2Rlc09mKHRoaXMuY29tcHMpKSBub3RpZnlOb2RlQ2hhbmdlZChuKTtcbiAgICAgICAgfVxuICAgICAgICByZXBhaW50KCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZW5kKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy5lbmRlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWFkeTtcbiAgICAgICAgaWYgKHRoaXMucGVuZGluZykge1xuICAgICAgICAgICAgY29uc3QgZm4gPSB0aGlzLnBlbmRpbmc7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmcgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5ydW4oZm4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNoYW5nZWQpIGFmdGVyRWRpdCh0aGlzLmNvbXBzKTtcbiAgICAgICAgYXdhaXQgZW5kUmVjb3JkaW5nKHRoaXMuaWQsICF0aGlzLmNoYW5nZWQpO1xuICAgIH1cbn1cbiIsICIvKipcbiAqIFVuZG9hYmxlIHNwbGluZSBlZGl0cyB1c2VkIGJ5IHRoZSBrZXlib2FyZCwgdGhlIFNwbGluZXMgcGFuZWwgYW5kIHRoZVxuICogSW5zcGVjdG9yLlxuICovXG5pbXBvcnQgeyBWMywgdjMsIHE0LCBxVG9FdWxlciwgcUZyb21FdWxlciwgcUNvcHksIG5vcm1hbGl6ZSwgc2NhbGUsIGxlblNxLCBsZW4sIHNldCB9IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL21hdGgnO1xuaW1wb3J0IHtcbiAgICBUYW5nZW50TW9kZSwgS25vdFJlZiwgc2V0VGFuZ2VudE1vZGUsIHNldFRlbnNpb24sIHNldFJvdGF0aW9uLCBzZXRLbm90UG9zaXRpb24sIHNldFRhbmdlbnRWZWMsIHN5bmNMaW5rZWQsXG4gICAgdGFuZ2VudEluVmVjLCB0YW5nZW50T3V0VmVjLCBsaW5rS25vdHMsIHVubGlua0tub3RzLCBzcGxpdEtub3QsIGpvaW5Lbm90cywgY29udGFpbmVyUmVtb3ZlS25vdHMsIGNvbnRhaW5lclJldmVyc2UsXG4gICAgY29udGFpbmVySW5zZXJ0T25DdXJ2ZSwgY29udGFpbmVyUmVtb3ZlU3BsaW5lLCBzZXRDbG9zZWQsIGlzRW5kS25vdCwgYnVpbGRTaGFwZSwgREVGQVVMVF9URU5TSU9OLCBhcHBseVRhbmdlbnRNb2RlLFxuICAgIHRhbmdlbnRzRWRpdGFibGUsIHJlZnJlc2hBbGwsIGlzTGlua2VkLFxufSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9zcGxpbmUtY29yZSc7XG5pbXBvcnQgeyBmYWN0b3J5LCBmaW5kQ29tcG9uZW50LCBmaW5kTm9kZSwgY29udGFpbmVyQ2xhc3MsIGN1cnJlbnRTY2VuZSwgaXMyRFZpZXcsIHNlbGVjdGVkTm9kZVV1aWRzLCByZXBhaW50IH0gZnJvbSAnLi9lbnYnO1xuaW1wb3J0IHsgRWxlbWVudFJlZiwgZ2V0S25vdCwgdG9Mb2NhbCB9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHsgUywgYnVtcFN0YXRlIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyByZWNvcmRFZGl0LCBhZnRlckVkaXQgfSBmcm9tICcuL3VuZG8nO1xuaW1wb3J0IHsgc2V0Q29udGV4dCwgc2V0VG9vbCwgbWF5YmVCcm9hZGNhc3QsIGF2YWlsYWJsZUFjdGlvbnMgfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHsgc2NlbmVDYW1lcmEsIHNjcmVlblJheSwgcmF5UGxhbmUsIHdvcmxkUGVyUGl4ZWwsIGNhbWVyYUZvcndhcmQsIGNhbWVyYVBvc2l0aW9uIH0gZnJvbSAnLi92aWV3JztcblxuZnVuY3Rpb24gY29tcHNPZihsaXN0OiBFbGVtZW50UmVmW10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIFsuLi5uZXcgU2V0KGxpc3QubWFwKChlKSA9PiBlLmNvbXApKV07XG59XG5cbmZ1bmN0aW9uIHRvdWNoZWQoKTogdm9pZCB7XG4gICAgYnVtcFN0YXRlKCk7XG4gICAgbWF5YmVCcm9hZGNhc3QoKTtcbiAgICByZXBhaW50KCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2VsZWN0aW9uIG9wc1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlU2VsZWN0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGxpc3QgPSBTLnNlbGVjdGlvbi5hbGwoKTtcbiAgICBpZiAoIWxpc3QubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgY29tcHMgPSBjb21wc09mKGxpc3QpO1xuICAgIGF3YWl0IHJlY29yZEVkaXQoY29tcHMsICgpID0+IHtcbiAgICAgICAgLy8gU2VsZWN0ZWQgdGFuZ2VudHMgb2Yga25vdHMgdGhhdCBzdGF5OiB6ZXJvIHRoZW0gKFVuaXR5J3MgYmVoYXZpb3IpLlxuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgbGlzdCkge1xuICAgICAgICAgICAgaWYgKGUucGFydCA9PT0gJ2tub3QnKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChTLnNlbGVjdGlvbi5oYXNLbm90KGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3Qgc3BsaW5lID0gZS5jb21wLnNwbGluZXNbZS5zcGxpbmVdO1xuICAgICAgICAgICAgY29uc3QgayA9IHNwbGluZT8ua25vdHNbZS5rbm90XTtcbiAgICAgICAgICAgIGlmICghaykgY29udGludWU7XG4gICAgICAgICAgICBpZiAoay5tb2RlICE9PSBUYW5nZW50TW9kZS5Ccm9rZW4pIHNldFRhbmdlbnRNb2RlKHNwbGluZSwgZS5rbm90LCBUYW5nZW50TW9kZS5Ccm9rZW4pO1xuICAgICAgICAgICAgc2V0KGUucGFydCA9PT0gJ2luJyA/IGsudGFuZ2VudEluIDogay50YW5nZW50T3V0LCAwLCAwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGNvbXAgb2YgY29tcHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlZnMgPSBsaXN0LmZpbHRlcigoZSkgPT4gZS5jb21wID09PSBjb21wICYmIGUucGFydCA9PT0gJ2tub3QnKS5tYXAoKGUpID0+ICh7IHNwbGluZTogZS5zcGxpbmUsIGtub3Q6IGUua25vdCB9KSk7XG4gICAgICAgICAgICBpZiAocmVmcy5sZW5ndGgpIGNvbnRhaW5lclJlbW92ZUtub3RzKGNvbXAsIHJlZnMpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgUy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRNb2RlU2VsZWN0ZWQobW9kZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qga25vdHMgPSBzZWxlY3RlZE93bmVyS25vdHMoKTtcbiAgICBpZiAoIWtub3RzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGF3YWl0IHJlY29yZEVkaXQoY29tcHNPZihrbm90cyksICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBlIG9mIGtub3RzKSBzZXRUYW5nZW50TW9kZShlLmNvbXAuc3BsaW5lc1tlLnNwbGluZV0sIGUua25vdCwgbW9kZSk7XG4gICAgfSk7XG4gICAgdG91Y2hlZCgpO1xufVxuXG4vKiogS25vdHMgb2YgdGhlIHNlbGVjdGlvbiwgaW5jbHVkaW5nIG93bmVycyBvZiBzZWxlY3RlZCB0YW5nZW50cy4gKi9cbmZ1bmN0aW9uIHNlbGVjdGVkT3duZXJLbm90cygpOiBFbGVtZW50UmVmW10ge1xuICAgIGNvbnN0IHNlZW4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBjb25zdCByZXM6IEVsZW1lbnRSZWZbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZSBvZiBTLnNlbGVjdGlvbi5hbGwoKSkge1xuICAgICAgICBjb25zdCBrZXkgPSBgJHtlLmNvbXAudXVpZH06JHtlLnNwbGluZX06JHtlLmtub3R9YDtcbiAgICAgICAgaWYgKHNlZW4uaGFzKGtleSkgfHwgIWdldEtub3QoZSkpIGNvbnRpbnVlO1xuICAgICAgICBzZWVuLmFkZChrZXkpO1xuICAgICAgICByZXMucHVzaCh7IC4uLmUsIHBhcnQ6ICdrbm90JyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuY29uc3QgQ1lDTEUgPSBbVGFuZ2VudE1vZGUuTGluZWFyLCBUYW5nZW50TW9kZS5BdXRvU21vb3RoLCBUYW5nZW50TW9kZS5NaXJyb3JlZCwgVGFuZ2VudE1vZGUuQ29udGludW91cywgVGFuZ2VudE1vZGUuQnJva2VuXTtcblxuLyoqIFVuaXR5J3MgQ3ljbGUgVGFuZ2VudCBNb2RlIChDKS4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjeWNsZU1vZGVTZWxlY3RlZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBrbm90cyA9IHNlbGVjdGVkT3duZXJLbm90cygpO1xuICAgIGlmICgha25vdHMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgayA9IGdldEtub3Qoa25vdHNbMF0pO1xuICAgIGNvbnN0IG5leHQgPSBDWUNMRVsoQ1lDTEUuaW5kZXhPZihrLm1vZGUpICsgMSkgJSBDWUNMRS5sZW5ndGhdO1xuICAgIGF3YWl0IHNldE1vZGVTZWxlY3RlZChuZXh0KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxpbmtTZWxlY3RlZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBrbm90cyA9IFMuc2VsZWN0aW9uLmtub3RzKCk7XG4gICAgaWYgKGtub3RzLmxlbmd0aCA8IDIgfHwgIWtub3RzLmV2ZXJ5KChlKSA9PiBlLmNvbXAgPT09IGtub3RzWzBdLmNvbXApKSByZXR1cm47XG4gICAgY29uc3QgY29tcCA9IGtub3RzWzBdLmNvbXA7XG4gICAgLy8gVGhlIGFjdGl2ZSAobGFzdCBzZWxlY3RlZCkga25vdCBrZWVwcyBpdHMgcG9zaXRpb24uXG4gICAgY29uc3Qgb3JkZXJlZCA9IFtrbm90c1trbm90cy5sZW5ndGggLSAxXSwgLi4ua25vdHMuc2xpY2UoMCwgLTEpXTtcbiAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4gbGlua0tub3RzKGNvbXAsIG9yZGVyZWQubWFwKChlKSA9PiAoeyBzcGxpbmU6IGUuc3BsaW5lLCBrbm90OiBlLmtub3QgfSkpLCBmYWN0b3J5KSk7XG4gICAgdG91Y2hlZCgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdW5saW5rU2VsZWN0ZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qga25vdHMgPSBTLnNlbGVjdGlvbi5rbm90cygpO1xuICAgIGlmICgha25vdHMubGVuZ3RoKSByZXR1cm47XG4gICAgYXdhaXQgcmVjb3JkRWRpdChjb21wc09mKGtub3RzKSwgKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGNvbXAgb2YgY29tcHNPZihrbm90cykpIHtcbiAgICAgICAgICAgIHVubGlua0tub3RzKGNvbXAsIGtub3RzLmZpbHRlcigoZSkgPT4gZS5jb21wID09PSBjb21wKS5tYXAoKGUpID0+ICh7IHNwbGluZTogZS5zcGxpbmUsIGtub3Q6IGUua25vdCB9KSkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdG91Y2hlZCgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3BsaXRTZWxlY3RlZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBrbm90cyA9IFMuc2VsZWN0aW9uLmtub3RzKCk7XG4gICAgaWYgKGtub3RzLmxlbmd0aCAhPT0gMSkgcmV0dXJuO1xuICAgIGNvbnN0IGUgPSBrbm90c1swXTtcbiAgICBsZXQgcmVzOiBLbm90UmVmIHwgbnVsbCA9IG51bGw7XG4gICAgYXdhaXQgcmVjb3JkRWRpdChbZS5jb21wXSwgKCkgPT4ge1xuICAgICAgICByZXMgPSBzcGxpdEtub3QoZS5jb21wLCB7IHNwbGluZTogZS5zcGxpbmUsIGtub3Q6IGUua25vdCB9LCBmYWN0b3J5KTtcbiAgICB9KTtcbiAgICBjb25zdCByID0gcmVzIGFzIEtub3RSZWYgfCBudWxsO1xuICAgIGlmIChyKSBTLnNlbGVjdGlvbi5zZXQoW3sgY29tcDogZS5jb21wLCBzcGxpbmU6IHIuc3BsaW5lLCBrbm90OiByLmtub3QsIHBhcnQ6ICdrbm90JyB9XSk7XG4gICAgdG91Y2hlZCgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gam9pblNlbGVjdGVkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGtub3RzID0gUy5zZWxlY3Rpb24ua25vdHMoKTtcbiAgICBpZiAoa25vdHMubGVuZ3RoICE9PSAyIHx8IGtub3RzWzBdLmNvbXAgIT09IGtub3RzWzFdLmNvbXApIHJldHVybjtcbiAgICBjb25zdCBjb21wID0ga25vdHNbMF0uY29tcDtcbiAgICAvLyBVbml0eSBrZWVwcyB0aGUgYWN0aXZlIGtub3QncyBwb3NpdGlvbi5cbiAgICBjb25zdCBhID0ga25vdHNbMV07XG4gICAgY29uc3QgYiA9IGtub3RzWzBdO1xuICAgIGxldCByZXM6IEtub3RSZWYgfCBudWxsID0gbnVsbDtcbiAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4ge1xuICAgICAgICByZXMgPSBqb2luS25vdHMoY29tcCwgeyBzcGxpbmU6IGEuc3BsaW5lLCBrbm90OiBhLmtub3QgfSwgeyBzcGxpbmU6IGIuc3BsaW5lLCBrbm90OiBiLmtub3QgfSwgZmFjdG9yeSk7XG4gICAgfSk7XG4gICAgY29uc3QgciA9IHJlcyBhcyBLbm90UmVmIHwgbnVsbDtcbiAgICBTLnNlbGVjdGlvbi5zZXQociA/IFt7IGNvbXAsIHNwbGluZTogci5zcGxpbmUsIGtub3Q6IHIua25vdCwgcGFydDogJ2tub3QnIH1dIDogW10pO1xuICAgIHRvdWNoZWQoKTtcbn1cblxuLyoqIFNwbGluZXMgdG91Y2hlZCBieSB0aGUgc2VsZWN0aW9uLCBvciBhbGwgc3BsaW5lcyBvZiB0aGUgZWRpdGVkIGNvbnRhaW5lcnMuICovXG5mdW5jdGlvbiBzZWxlY3RlZFNwbGluZXMoKTogeyBjb21wOiBhbnk7IHNwbGluZTogbnVtYmVyIH1bXSB7XG4gICAgY29uc3QgbGlzdCA9IFMuc2VsZWN0aW9uLmFsbCgpO1xuICAgIGNvbnN0IHJlczogeyBjb21wOiBhbnk7IHNwbGluZTogbnVtYmVyIH1bXSA9IFtdO1xuICAgIGNvbnN0IGFkZCA9IChjb21wOiBhbnksIHNwbGluZTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmICghcmVzLnNvbWUoKHIpID0+IHIuY29tcCA9PT0gY29tcCAmJiByLnNwbGluZSA9PT0gc3BsaW5lKSkgcmVzLnB1c2goeyBjb21wLCBzcGxpbmUgfSk7XG4gICAgfTtcbiAgICBpZiAobGlzdC5sZW5ndGgpIGZvciAoY29uc3QgZSBvZiBsaXN0KSBhZGQoZS5jb21wLCBlLnNwbGluZSk7XG4gICAgZWxzZSBmb3IgKGNvbnN0IGNvbXAgb2YgUy5sYXN0VGFyZ2V0cykgY29tcC5zcGxpbmVzLmZvckVhY2goKF86IGFueSwgaTogbnVtYmVyKSA9PiBhZGQoY29tcCwgaSkpO1xuICAgIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXZlcnNlU2VsZWN0ZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3BsaW5lcyA9IHNlbGVjdGVkU3BsaW5lcygpO1xuICAgIGlmICghc3BsaW5lcy5sZW5ndGgpIHJldHVybjtcbiAgICAvLyBLZWVwIHRoZSBzYW1lIGtub3RzIHNlbGVjdGVkIGFmdGVyIHJldmVyc2luZy5cbiAgICBjb25zdCBiZWZvcmUgPSBTLnNlbGVjdGlvbi5hbGwoKS5tYXAoKGUpID0+ICh7IC4uLmUsIGNvdW50OiBlLmNvbXAuc3BsaW5lc1tlLnNwbGluZV0/Lmtub3RzLmxlbmd0aCA/PyAwIH0pKTtcbiAgICBhd2FpdCByZWNvcmRFZGl0KFsuLi5uZXcgU2V0KHNwbGluZXMubWFwKChzKSA9PiBzLmNvbXApKV0sICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHNwbGluZXMpIGNvbnRhaW5lclJldmVyc2Uocy5jb21wLCBzLnNwbGluZSk7XG4gICAgfSk7XG4gICAgUy5zZWxlY3Rpb24uc2V0KGJlZm9yZS5tYXAoKGUpID0+ICh7XG4gICAgICAgIGNvbXA6IGUuY29tcCxcbiAgICAgICAgc3BsaW5lOiBlLnNwbGluZSxcbiAgICAgICAga25vdDogZS5jb3VudCAtIDEgLSBlLmtub3QsXG4gICAgICAgIHBhcnQ6IGUucGFydCA9PT0gJ2luJyA/ICdvdXQnIDogZS5wYXJ0ID09PSAnb3V0JyA/ICdpbicgOiAna25vdCcsXG4gICAgfSkpKTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRDbG9zZWRTZWxlY3RlZChjbG9zZWQ/OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3BsaW5lcyA9IHNlbGVjdGVkU3BsaW5lcygpO1xuICAgIGlmICghc3BsaW5lcy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCB0YXJnZXQgPSBjbG9zZWQgPz8gIXNwbGluZXMuZXZlcnkoKHMpID0+IHMuY29tcC5zcGxpbmVzW3Muc3BsaW5lXS5jbG9zZWQpO1xuICAgIGF3YWl0IHJlY29yZEVkaXQoWy4uLm5ldyBTZXQoc3BsaW5lcy5tYXAoKHMpID0+IHMuY29tcCkpXSwgKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3BsaW5lcykge1xuICAgICAgICAgICAgY29uc3Qgc3BsaW5lID0gcy5jb21wLnNwbGluZXNbcy5zcGxpbmVdO1xuICAgICAgICAgICAgaWYgKHNwbGluZS5rbm90cy5sZW5ndGggPj0gMiB8fCAhdGFyZ2V0KSBzZXRDbG9zZWQoc3BsaW5lLCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdG91Y2hlZCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIGNvbnN0IGxpc3Q6IEVsZW1lbnRSZWZbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgY29tcCBvZiBTLmxhc3RUYXJnZXRzKSB7XG4gICAgICAgIGNvbXAuc3BsaW5lcy5mb3JFYWNoKChzcGxpbmU6IGFueSwgczogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHNwbGluZS5rbm90cy5sZW5ndGg7IGsrKykgbGlzdC5wdXNoKHsgY29tcCwgc3BsaW5lOiBzLCBrbm90OiBrLCBwYXJ0OiAna25vdCcgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIWxpc3QubGVuZ3RoKSByZXR1cm47XG4gICAgc2V0Q29udGV4dCh0cnVlKTtcbiAgICBTLnNlbGVjdGlvbi5zZXQobGlzdCk7XG4gICAgdG91Y2hlZCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgUy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbi8qKiBJbnNlcnRzIGEga25vdCBvbiBhIGN1cnZlIHdpdGhvdXQgY2hhbmdpbmcgaXRzIHNoYXBlOyBzZWxlY3RzIGl0LiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluc2VydE9uQ3VydmUoY29tcDogYW55LCBzcGxpbmU6IG51bWJlciwgY3VydmVJbmRleDogbnVtYmVyLCB0OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4ge1xuICAgICAgICBpbmRleCA9IGNvbnRhaW5lckluc2VydE9uQ3VydmUoY29tcCwgc3BsaW5lLCBjdXJ2ZUluZGV4LCB0LCBmYWN0b3J5KTtcbiAgICB9KTtcbiAgICBpZiAoaW5kZXggPj0gMCkgUy5zZWxlY3Rpb24uc2V0KFt7IGNvbXAsIHNwbGluZSwga25vdDogaW5kZXgsIHBhcnQ6ICdrbm90JyB9XSk7XG4gICAgdG91Y2hlZCgpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVsZW1lbnQgaW5zcGVjdG9yXG5cbmV4cG9ydCBpbnRlcmZhY2UgRWxlbWVudFByb3BzIHtcbiAgICBwb3NpdGlvbj86IChudW1iZXIgfCBudWxsKVtdO1xuICAgIHJvdGF0aW9uPzogKG51bWJlciB8IG51bGwpW107XG4gICAgbW9kZT86IG51bWJlcjtcbiAgICB0ZW5zaW9uPzogbnVtYmVyO1xuICAgIHRhbmdlbnRJbj86IG51bWJlcjtcbiAgICB0YW5nZW50T3V0PzogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBhcHBseVByb3BzKGNvbXA6IGFueSwgczogbnVtYmVyLCBrOiBudW1iZXIsIHA6IEVsZW1lbnRQcm9wcyk6IHZvaWQge1xuICAgIGNvbnN0IHNwbGluZSA9IGNvbXAuc3BsaW5lc1tzXTtcbiAgICBjb25zdCBrbm90ID0gc3BsaW5lPy5rbm90c1trXTtcbiAgICBpZiAoIWtub3QpIHJldHVybjtcbiAgICBpZiAocC5wb3NpdGlvbikge1xuICAgICAgICBjb25zdCBwb3MgPSB2Myhrbm90LnBvc2l0aW9uLngsIGtub3QucG9zaXRpb24ueSwga25vdC5wb3NpdGlvbi56KTtcbiAgICAgICAgaWYgKHAucG9zaXRpb25bMF0gIT0gbnVsbCkgcG9zLnggPSBwLnBvc2l0aW9uWzBdITtcbiAgICAgICAgaWYgKHAucG9zaXRpb25bMV0gIT0gbnVsbCkgcG9zLnkgPSBwLnBvc2l0aW9uWzFdITtcbiAgICAgICAgaWYgKHAucG9zaXRpb25bMl0gIT0gbnVsbCkgcG9zLnogPSBwLnBvc2l0aW9uWzJdITtcbiAgICAgICAgc2V0S25vdFBvc2l0aW9uKHNwbGluZSwgaywgcG9zKTtcbiAgICAgICAgc3luY0xpbmtlZChjb21wLCB7IHNwbGluZTogcywga25vdDogayB9KTtcbiAgICB9XG4gICAgaWYgKHAucm90YXRpb24pIHtcbiAgICAgICAgY29uc3QgZSA9IHFUb0V1bGVyKHYzKCksIGtub3Qucm90YXRpb24pO1xuICAgICAgICBpZiAocC5yb3RhdGlvblswXSAhPSBudWxsKSBlLnggPSBwLnJvdGF0aW9uWzBdITtcbiAgICAgICAgaWYgKHAucm90YXRpb25bMV0gIT0gbnVsbCkgZS55ID0gcC5yb3RhdGlvblsxXSE7XG4gICAgICAgIGlmIChwLnJvdGF0aW9uWzJdICE9IG51bGwpIGUueiA9IHAucm90YXRpb25bMl0hO1xuICAgICAgICBzZXRSb3RhdGlvbihzcGxpbmUsIGssIHFGcm9tRXVsZXIocTQoKSwgZS54LCBlLnksIGUueikpO1xuICAgIH1cbiAgICBpZiAocC5tb2RlICE9PSB1bmRlZmluZWQgJiYgcC5tb2RlICE9PSBudWxsKSBzZXRUYW5nZW50TW9kZShzcGxpbmUsIGssIHAubW9kZSk7XG4gICAgaWYgKHAudGVuc2lvbiAhPT0gdW5kZWZpbmVkICYmIHAudGVuc2lvbiAhPT0gbnVsbCkgc2V0VGVuc2lvbihzcGxpbmUsIGssIE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHAudGVuc2lvbikpKTtcbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgWydpbicsICdvdXQnXSBhcyBjb25zdCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnQgPT09ICdpbicgPyBwLnRhbmdlbnRJbiA6IHAudGFuZ2VudE91dDtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBjdXIgPSBwYXJ0ID09PSAnaW4nID8gdGFuZ2VudEluVmVjKHYzKCksIGtub3QpIDogdGFuZ2VudE91dFZlYyh2MygpLCBrbm90KTtcbiAgICAgICAgbGV0IGRpciA9IG5vcm1hbGl6ZSh2MygpLCBjdXIpO1xuICAgICAgICBpZiAobGVuU3EoZGlyKSA8IDFlLTEyKSB7XG4gICAgICAgICAgICAvLyBaZXJvIHRhbmdlbnQ6IHBvaW50IGl0IGFsb25nIHRoZSBrbm90J3MgZm9yd2FyZCBheGlzLlxuICAgICAgICAgICAgY29uc3QgZndkID0gdGFuZ2VudE91dFZlYyh2MygpLCB7IC4uLmtub3QsIHRhbmdlbnRPdXQ6IHsgeDogMCwgeTogMCwgejogMSB9IH0pO1xuICAgICAgICAgICAgZGlyID0gcGFydCA9PT0gJ2luJyA/IHNjYWxlKHYzKCksIGZ3ZCwgLTEpIDogZndkO1xuICAgICAgICB9XG4gICAgICAgIHNldFRhbmdlbnRWZWMoc3BsaW5lLCBrLCBwYXJ0LCBzY2FsZSh2MygpLCBkaXIsIE1hdGgubWF4KDAsIHZhbHVlKSkpO1xuICAgIH1cbn1cblxuLyoqIFNldHMgZmllbGRzIG9mIHRoZSBzZWxlY3RlZCBrbm90cyAobnVsbCAvIG1pc3NpbmcgZmllbGRzIHN0YXkgYXMgdGhleSBhcmUpLiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldEVsZW1lbnRQcm9wcyhwcm9wczogRWxlbWVudFByb3BzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qga25vdHMgPSBzZWxlY3RlZE93bmVyS25vdHMoKTtcbiAgICBpZiAoIWtub3RzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGF3YWl0IHJlY29yZEVkaXQoY29tcHNPZihrbm90cyksICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBlIG9mIGtub3RzKSBhcHBseVByb3BzKGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgcHJvcHMpO1xuICAgIH0pO1xuICAgIHRvdWNoZWQoKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGluc3BlY3RvclxuXG5mdW5jdGlvbiBrbm90SW5mbyhjb21wOiBhbnksIHM6IG51bWJlciwgazogbnVtYmVyLCBrbm90OiBhbnkpIHtcbiAgICBjb25zdCBlID0gcVRvRXVsZXIodjMoKSwga25vdC5yb3RhdGlvbik7XG4gICAgY29uc3QgciA9IChuOiBudW1iZXIpID0+IE1hdGgucm91bmQobiAqIDEwMDAwKSAvIDEwMDAwO1xuICAgIHJldHVybiB7XG4gICAgICAgIHBvc2l0aW9uOiBbcihrbm90LnBvc2l0aW9uLngpLCByKGtub3QucG9zaXRpb24ueSksIHIoa25vdC5wb3NpdGlvbi56KV0sXG4gICAgICAgIHJvdGF0aW9uOiBbcihlLngpLCByKGUueSksIHIoZS56KV0sXG4gICAgICAgIG1vZGU6IGtub3QubW9kZSxcbiAgICAgICAgdGVuc2lvbjogcihrbm90LnRlbnNpb24pLFxuICAgICAgICB0YW5nZW50SW46IHIobGVuKHRhbmdlbnRJblZlYyh2MygpLCBrbm90KSkpLFxuICAgICAgICB0YW5nZW50T3V0OiByKGxlbih0YW5nZW50T3V0VmVjKHYzKCksIGtub3QpKSksXG4gICAgICAgIGxpbmtlZDogaXNMaW5rZWQoY29tcCwgeyBzcGxpbmU6IHMsIGtub3Q6IGsgfSksXG4gICAgICAgIHNlbGVjdGVkOiBTLmNvbnRleHQgJiYgUy5zZWxlY3Rpb24uaGFzS25vdChjb21wLCBzLCBrKSxcbiAgICB9O1xufVxuXG4vKiogRGF0YSBmb3IgdGhlIFNwbGluZUNvbnRhaW5lciBJbnNwZWN0b3IuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVySW5mbyhjb21wVXVpZDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBjb21wID0gZmluZENvbXBvbmVudChjb21wVXVpZCk7XG4gICAgaWYgKCFjb21wIHx8ICFjb21wLnNwbGluZXMpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICAgIHV1aWQ6IGNvbXAudXVpZCxcbiAgICAgICAgbm9kZTogY29tcC5ub2RlLnV1aWQsXG4gICAgICAgIGNvbnRleHQ6IFMuY29udGV4dCAmJiBTLmxhc3RUYXJnZXRzLmluY2x1ZGVzKGNvbXApLFxuICAgICAgICB0b29sOiBTLnRvb2wsXG4gICAgICAgIGRyYXdpbmc6ICEhUy5kcmF3aW5nICYmIFMuZHJhd2luZy5jb21wID09PSBjb21wLFxuICAgICAgICBzcGxpbmVzOiBjb21wLnNwbGluZXMubWFwKChzcGxpbmU6IGFueSwgczogbnVtYmVyKSA9PiAoe1xuICAgICAgICAgICAgY2xvc2VkOiAhIXNwbGluZS5jbG9zZWQsXG4gICAgICAgICAgICBsZW5ndGg6IE1hdGgucm91bmQoKGNvbXAuY2FsY3VsYXRlTGVuZ3RoPy4ocykgPz8gMCkgKiAxMDAwKSAvIDEwMDAsXG4gICAgICAgICAgICBrbm90czogc3BsaW5lLmtub3RzLm1hcCgoa25vdDogYW55LCBrOiBudW1iZXIpID0+IGtub3RJbmZvKGNvbXAsIHMsIGssIGtub3QpKSxcbiAgICAgICAgfSkpLFxuICAgICAgICBhY3Rpb25zOiBhdmFpbGFibGVBY3Rpb25zKCksXG4gICAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVkaXRLbm90KGNvbXBVdWlkOiBzdHJpbmcsIHM6IG51bWJlciwgazogbnVtYmVyLCBwcm9wczogRWxlbWVudFByb3BzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY29tcCA9IGZpbmRDb21wb25lbnQoY29tcFV1aWQpO1xuICAgIGlmICghY29tcCkgcmV0dXJuO1xuICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiBhcHBseVByb3BzKGNvbXAsIHMsIGssIHByb3BzKSk7XG4gICAgdG91Y2hlZCgpO1xufVxuXG4vKiogSW5zcGVjdG9yIGFjdGlvbnMgb24gYSBzcGxpbmUgb2YgYSBjb250YWluZXIuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3BsaW5lQWN0aW9uKGNvbXBVdWlkOiBzdHJpbmcsIHM6IG51bWJlciwgYWN0aW9uOiBzdHJpbmcsIGFyZz86IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgY29tcCA9IGZpbmRDb21wb25lbnQoY29tcFV1aWQpO1xuICAgIGlmICghY29tcCkgcmV0dXJuIG51bGw7XG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnYWRkU3BsaW5lJzoge1xuICAgICAgICAgICAgYXdhaXQgcmVjb3JkRWRpdChbY29tcF0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGxpbmUgPSBmYWN0b3J5LnNwbGluZSgpO1xuICAgICAgICAgICAgICAgIGNvbXAuc3BsaW5lcy5wdXNoKHNwbGluZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3JlbW92ZVNwbGluZSc6XG4gICAgICAgICAgICBpZiAoY29tcC5zcGxpbmVzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgcmVjb3JkRWRpdChbY29tcF0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29tcC5zcGxpbmVzWzBdLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbXAuc3BsaW5lc1swXS5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29tcC5saW5rcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4gY29udGFpbmVyUmVtb3ZlU3BsaW5lKGNvbXAsIHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmV2ZXJzZSc6XG4gICAgICAgICAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4gY29udGFpbmVyUmV2ZXJzZShjb21wLCBzKSk7XG4gICAgICAgICAgICBTLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Nsb3NlZCc6XG4gICAgICAgICAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4gc2V0Q2xvc2VkKGNvbXAuc3BsaW5lc1tzXSwgISFhcmcpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhZGRLbm90Jzoge1xuICAgICAgICAgICAgY29uc3Qgc3BsaW5lID0gY29tcC5zcGxpbmVzW3NdO1xuICAgICAgICAgICAgYXdhaXQgcmVjb3JkRWRpdChbY29tcF0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrID0gZmFjdG9yeS5rbm90KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbiA9IHNwbGluZS5rbm90cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdCA9IHNwbGluZS5rbm90c1tuIC0gMV07XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldiA9IHNwbGluZS5rbm90c1tuIC0gMl07XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QgJiYgcHJldikge1xuICAgICAgICAgICAgICAgICAgICAvLyBDb250aW51ZSBpbiB0aGUgZGlyZWN0aW9uIG9mIHRoZSBsYXN0IGN1cnZlLlxuICAgICAgICAgICAgICAgICAgICBzZXQoay5wb3NpdGlvbiwgbGFzdC5wb3NpdGlvbi54ICogMiAtIHByZXYucG9zaXRpb24ueCwgbGFzdC5wb3NpdGlvbi55ICogMiAtIHByZXYucG9zaXRpb24ueSwgbGFzdC5wb3NpdGlvbi56ICogMiAtIHByZXYucG9zaXRpb24ueik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldChrLnBvc2l0aW9uLCBsYXN0LnBvc2l0aW9uLnggKyAxLCBsYXN0LnBvc2l0aW9uLnksIGxhc3QucG9zaXRpb24ueik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGsubW9kZSA9IFMuc2V0dGluZ3MuZGVmYXVsdE1vZGU7XG4gICAgICAgICAgICAgICAgay50ZW5zaW9uID0gREVGQVVMVF9URU5TSU9OO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0KSBxQ29weShrLnJvdGF0aW9uLCBsYXN0LnJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICBzcGxpbmUua25vdHMucHVzaChrKTtcbiAgICAgICAgICAgICAgICBhcHBseVRhbmdlbnRNb2RlKHNwbGluZSwgc3BsaW5lLmtub3RzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmIChuID4gMCkgYXBwbHlUYW5nZW50TW9kZShzcGxpbmUsIG4gLSAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncmVtb3ZlS25vdCc6XG4gICAgICAgICAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4gY29udGFpbmVyUmVtb3ZlS25vdHMoY29tcCwgW3sgc3BsaW5lOiBzLCBrbm90OiBOdW1iZXIoYXJnKSB9XSkpO1xuICAgICAgICAgICAgUy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzZWxlY3RLbm90Jzoge1xuICAgICAgICAgICAgc2V0Q29udGV4dCh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGU6IEVsZW1lbnRSZWYgPSB7IGNvbXAsIHNwbGluZTogcywga25vdDogTnVtYmVyKGFyZz8ua25vdCA/PyBhcmcpLCBwYXJ0OiAna25vdCcgfTtcbiAgICAgICAgICAgIGlmIChhcmc/LmFkZGl0aXZlKSBTLnNlbGVjdGlvbi50b2dnbGUoZSk7XG4gICAgICAgICAgICBlbHNlIFMuc2VsZWN0aW9uLnNldChbZV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnc2V0TW9kZUFsbCc6XG4gICAgICAgICAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwbGluZSA9IGNvbXAuc3BsaW5lc1tzXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGluZS5rbm90cy5sZW5ndGg7IGkrKykgc2V0VGFuZ2VudE1vZGUoc3BsaW5lLCBpLCBOdW1iZXIoYXJnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZWZyZXNoJzpcbiAgICAgICAgICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiBjb21wLnNwbGluZXMuZm9yRWFjaCgoc3A6IGFueSkgPT4gcmVmcmVzaEFsbChzcCkpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0b3VjaGVkKCk7XG4gICAgcmV0dXJuIGNvbnRhaW5lckluZm8oY29tcFV1aWQpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNyZWF0aW9uXG5cbmZ1bmN0aW9uIG5pY2VTaXplKHY6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCEodiA+IDApKSByZXR1cm4gMTtcbiAgICBjb25zdCBwID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2cxMCh2KSkpO1xuICAgIGNvbnN0IG0gPSB2IC8gcDtcbiAgICByZXR1cm4gKG0gPCAxLjUgPyAxIDogbSA8IDMuNSA/IDIgOiBtIDwgNy41ID8gNSA6IDEwKSAqIHA7XG59XG5cbi8qKiBXaGVyZSBhIG5ldyBzcGxpbmUgZ29lczogdGhlIGNlbnRlciBvZiB0aGUgU2NlbmUgdmlldyBvbiB0aGUgZ3JvdW5kICgzRCkgb3IgdGhlIHogPSAwIHBsYW5lICgyRCkuICovXG5mdW5jdGlvbiB2aWV3Q2VudGVyKGlzMkQ6IGJvb2xlYW4pOiB7IHBvczogVjM7IHNpemU6IG51bWJlciB9IHtcbiAgICBjb25zdCBjYW0gPSBzY2VuZUNhbWVyYSgpO1xuICAgIGlmICghY2FtKSByZXR1cm4geyBwb3M6IHYzKCksIHNpemU6IGlzMkQgPyAxMDAgOiAxIH07XG4gICAgY29uc3QgcmF5ID0gc2NyZWVuUmF5KGNhbSwgY2FtLndpZHRoIC8gMiwgY2FtLmhlaWdodCAvIDIpO1xuICAgIGxldCBwb3M6IFYzIHwgbnVsbCA9IHJheVBsYW5lKHJheSwgdjMoKSwgaXMyRCA/IHYzKDAsIDAsIDEpIDogdjMoMCwgMSwgMCkpO1xuICAgIGlmICghcG9zKSB7XG4gICAgICAgIC8vIExvb2tpbmcgYXdheSBmcm9tIHRoZSBncm91bmQ6IGEgcG9pbnQgaW4gZnJvbnQgb2YgdGhlIGNhbWVyYS5cbiAgICAgICAgY29uc3QgZiA9IGNhbWVyYUZvcndhcmQoY2FtKTtcbiAgICAgICAgY29uc3QgYyA9IGNhbWVyYVBvc2l0aW9uKGNhbSk7XG4gICAgICAgIHBvcyA9IHYzKGMueCArIGYueCAqIDEwLCBjLnkgKyBmLnkgKiAxMCwgYy56ICsgZi56ICogMTApO1xuICAgIH1cbiAgICBjb25zdCBzaXplID0gbmljZVNpemUod29ybGRQZXJQaXhlbChjYW0sIHBvcykgKiBNYXRoLm1pbihjYW0ud2lkdGgsIGNhbS5oZWlnaHQpICogMC4xOCk7XG4gICAgcmV0dXJuIHsgcG9zLCBzaXplIH07XG59XG5cbmV4cG9ydCBjb25zdCBTSEFQRVMgPSBbJ2xpbmUnLCAnc3F1YXJlJywgJ3JvdW5kZWQtc3F1YXJlJywgJ2NpcmNsZScsICdwb2x5Z29uJywgJ3N0YXInLCAnaGVsaXgnXTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbm9kZSB3aXRoIGEgU3BsaW5lQ29udGFpbmVyIChOb2RlID4gU3BsaW5lIG1lbnUpLiAnZHJhdycgbWFrZXNcbiAqIGFuIGVtcHR5IHNwbGluZSBhbmQgc3RhcnRzIHRoZSBEcmF3IHRvb2wuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVTcGxpbmVOb2RlKGtpbmQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIGNvbnN0IGlzMkQgPSBpczJEVmlldygpO1xuICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkTm9kZVV1aWRzKCk7XG4gICAgY29uc3Qgb3B0aW9uczogYW55ID0geyBuYW1lOiBraW5kID09PSAnZHJhdycgPyAnU3BsaW5lJyA6IGBTcGxpbmUgJHtraW5kLnJlcGxhY2UoJy0nLCAnICcpLnJlcGxhY2UoL1xcYlxcdy9nLCAoYykgPT4gYy50b1VwcGVyQ2FzZSgpKX1gIH07XG4gICAgaWYgKHNlbC5sZW5ndGgpIG9wdGlvbnMucGFyZW50ID0gc2VsWzBdO1xuICAgIGlmIChpczJEKSBvcHRpb25zLmNhbnZhc1JlcXVpcmVkID0gdHJ1ZTtcbiAgICBjb25zdCB1dWlkID0gKGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2NyZWF0ZS1ub2RlJywgb3B0aW9ucykpIGFzIHVua25vd24gYXMgc3RyaW5nO1xuICAgIGlmICghdXVpZCB8fCB0eXBlb2YgdXVpZCAhPT0gJ3N0cmluZycpIHJldHVybiBudWxsO1xuICAgIGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2NyZWF0ZS1jb21wb25lbnQnLCB7IHV1aWQsIGNvbXBvbmVudDogJ1NwbGluZUNvbnRhaW5lcicgfSBhcyBhbnkpO1xuICAgIGNvbnN0IG5vZGUgPSBmaW5kTm9kZSh1dWlkKTtcbiAgICBjb25zdCBDID0gY29udGFpbmVyQ2xhc3MoKTtcbiAgICBjb25zdCBjb21wID0gbm9kZSAmJiBDID8gbm9kZS5nZXRDb21wb25lbnQoQykgOiBudWxsO1xuICAgIGlmICghY29tcCkgcmV0dXJuIHV1aWQ7XG4gICAgY29uc3QgeyBwb3MsIHNpemUgfSA9IHZpZXdDZW50ZXIoaXMyRCk7XG4gICAgYXdhaXQgcmVjb3JkRWRpdChbY29tcF0sICgpID0+IHtcbiAgICAgICAgbm9kZS5zZXRXb3JsZFBvc2l0aW9uKHBvcy54LCBwb3MueSwgcG9zLnopO1xuICAgICAgICBpZiAoIWNvbXAuc3BsaW5lcy5sZW5ndGgpIGNvbXAuc3BsaW5lcy5wdXNoKGZhY3Rvcnkuc3BsaW5lKCkpO1xuICAgICAgICBjb25zdCBzcGxpbmUgPSBjb21wLnNwbGluZXNbMF07XG4gICAgICAgIGlmIChraW5kICE9PSAnZHJhdycgJiYgU0hBUEVTLmluY2x1ZGVzKGtpbmQpKSB7XG4gICAgICAgICAgICBidWlsZFNoYXBlKHNwbGluZSwga2luZCwgeyBzaXplLCBwbGFuZTJEOiBpczJELCBzaWRlczoga2luZCA9PT0gJ3N0YXInID8gNSA6IDYsIHR1cm5zOiAzLCBoZWlnaHQ6IHNpemUgKiAyIH0sIGZhY3RvcnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3BsaW5lLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBhZnRlckVkaXQoW2NvbXBdKTtcbiAgICB0cnkge1xuICAgICAgICBFZGl0b3IuU2VsZWN0aW9uLmNsZWFyKCdub2RlJyk7XG4gICAgICAgIEVkaXRvci5TZWxlY3Rpb24uc2VsZWN0KCdub2RlJywgdXVpZCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIHNlbGVjdGlvbiBBUEkgbWlzc2luZ1xuICAgIH1cbiAgICAvLyBUaGUgc2VsZWN0aW9uIHJlYWNoZXMgdGhlIHNjZW5lIGFzeW5jaHJvbm91c2x5OyB0aGUgY29udGV4dCBzdGFydHMgb25jZSB0aGUgbm9kZSBpcyBzZWxlY3RlZC5cbiAgICBTLnBlbmRpbmdDb250ZXh0ID0geyBjb21wLCB0b29sOiBraW5kID09PSAnZHJhdycgPyAnZHJhdycgOiAnc2VsZWN0JywgdW50aWw6IERhdGUubm93KCkgKyAzMDAwIH07XG4gICAgcmVwYWludCgpO1xuICAgIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgeyB0b0xvY2FsLCBjdXJyZW50U2NlbmUsIHRhbmdlbnRzRWRpdGFibGUsIGlzRW5kS25vdCB9O1xuIiwgIi8qKlxuICogTW91c2UgYW5kIGtleWJvYXJkIGluIHRoZSBTY2VuZSB2aWV3LlxuICpcbiAqIExpc3RlbmVycyBhcmUgcmVnaXN0ZXJlZCBvbiBjY2UuT3BlcmF0aW9uIGFib3ZlIHRoZSBlZGl0b3IncyBnaXptb3MgYW5kXG4gKiBjYW1lcmEsIHNvIGEgcHJlc3Mgb24gYSBrbm90LCB0YW5nZW50IG9yIGhhbmRsZSBuZXZlciByZWFjaGVzIHRoZW0uXG4gKiBFdmVyeXRoaW5nIGVsc2UgcGFzc2VzIHRocm91Z2gsIGV4Y2VwdCBpbnNpZGUgdGhlIGVkaXQgY29udGV4dCB3aGVyZSBhblxuICogZW1wdHktc3BhY2UgZHJhZyBzZWxlY3RzIGtub3RzIGluIGEgcmVjdGFuZ2xlIChsaWtlIFVuaXR5KS5cbiAqL1xuaW1wb3J0IHsgVjMsIHYzLCBzdWIsIGFkZCwgZG90LCBub3JtYWxpemUsIGxlblNxLCBzY2FsZUFuZEFkZCwgY29weSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL21hdGgnO1xuaW1wb3J0IHsgQ3VydmUsIGN1cnZlLCBldmFsUG9zaXRpb24gfSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9jdXJ2ZSc7XG5pbXBvcnQge1xuICAgIFRhbmdlbnRNb2RlLCBjb250YWluZXJJbnNlcnRLbm90LCBzZXRDbG9zZWQsIGlzRW5kS25vdCwgc2V0VGFuZ2VudE1vZGUsIHRhbmdlbnRJblZlYywgdGFuZ2VudE91dFZlYywga25vdFJvdGF0aW9uLFxufSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9zcGxpbmUtY29yZSc7XG5pbXBvcnQgeyBjYywgY2NlLCBmYWN0b3J5LCBpczJEVmlldywgcnVudGltZVJlYWR5LCBzbmFwQ29uZmlnLCByZXBhaW50IH0gZnJvbSAnLi9lbnYnO1xuaW1wb3J0IHtcbiAgICBzY2VuZUNhbWVyYSwgZXZlbnRUb1NjcmVlbiwgc2NyZWVuUmF5LCByYXlQbGFuZSwgY2FtZXJhRm9yd2FyZCwgc2hvd1JlY3QsIGhpZGVSZWN0LCBzaG93VGlwLCBoaWRlVGlwLCBSYXksXG59IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge1xuICAgIEVsZW1lbnRSZWYsIGVsZW1lbnRXb3JsZFBvc2l0aW9uLCBzZXRLbm90V29ybGQsIHNldFRhbmdlbnRXb3JsZCwgdG9Mb2NhbCwgdG9Xb3JsZCwgZGlyVG9Xb3JsZCwga25vdFdvcmxkUG9zaXRpb24sXG59IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHsgUywgSGl0LCBub3RlLCBidW1wU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IGhpdFRlc3QsIGtub3RzSW5SZWN0LCBjdXJyZW50SGFuZGxlRnJhbWUsIHNldEhhbmRsZUF4ZXNPdmVycmlkZSwgc2V0RHJhZ0F4aXMsIHNldFByZXZpZXdEcmF3ZXIgfSBmcm9tICcuL3JlbmRlcic7XG5pbXBvcnQgeyBzdGFydEhhbmRsZURyYWcsIEhhbmRsZURyYWcgfSBmcm9tICcuL2hhbmRsZXMnO1xuaW1wb3J0IHsgRWRpdFNlc3Npb24sIHJlY29yZEVkaXQgfSBmcm9tICcuL3VuZG8nO1xuaW1wb3J0IHsgdXBkYXRlVGFyZ2V0cywgc2V0Q29udGV4dCwgc2V0VG9vbCwgbWF5YmVCcm9hZGNhc3QgfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHtcbiAgICBkZWxldGVTZWxlY3Rpb24sIGN5Y2xlTW9kZVNlbGVjdGVkLCBzZWxlY3RBbGwsIGluc2VydE9uQ3VydmUsIGNsZWFyU2VsZWN0aW9uLFxufSBmcm9tICcuL29wcyc7XG5pbXBvcnQgKiBhcyBEIGZyb20gJy4vZHJhdyc7XG5cbmV4cG9ydCBjb25zdCBQUklPUklUWSA9IDEwMDsgLy8gQ29jb3M6IGdpem1vcyA5OSwgY2FtZXJhIDk4XG5jb25zdCBEUkFHX1BYID0gNDtcblxudHlwZSBBY3RpdmUgPVxuICAgIHwgeyBraW5kOiAnaGFuZGxlJzsgZHJhZzogSGFuZGxlRHJhZzsgc2Vzc2lvbjogRWRpdFNlc3Npb24gfVxuICAgIHwge1xuICAgICAgICBraW5kOiAnZWxlbWVudCc7XG4gICAgICAgIHJlZjogRWxlbWVudFJlZjtcbiAgICAgICAgeDA6IG51bWJlcjtcbiAgICAgICAgeTA6IG51bWJlcjtcbiAgICAgICAgZHJhZ2dpbmc6IGJvb2xlYW47XG4gICAgICAgIHRvZ2dsZWQ6IGJvb2xlYW47XG4gICAgICAgIHNlc3Npb246IEVkaXRTZXNzaW9uIHwgbnVsbDtcbiAgICAgICAgZ3JhYjogVjMgfCBudWxsO1xuICAgICAgICBzdGFydHM6IHsgZTogRWxlbWVudFJlZjsgcG9zOiBWMyB9W107XG4gICAgfVxuICAgIHwge1xuICAgICAgICBraW5kOiAncmVjdCc7XG4gICAgICAgIHgwOiBudW1iZXI7XG4gICAgICAgIHkwOiBudW1iZXI7XG4gICAgICAgIG1vdmVkOiBib29sZWFuO1xuICAgICAgICBhZGRpdGl2ZTogYm9vbGVhbjtcbiAgICAgICAgYmFzZTogRWxlbWVudFJlZltdO1xuICAgICAgICBkb3duOiBhbnk7XG4gICAgICAgIG9uQ3VydmU6IGJvb2xlYW47XG4gICAgfVxuICAgIHwge1xuICAgICAgICBraW5kOiAnZHJhdyc7XG4gICAgICAgIGNvbXA6IGFueTtcbiAgICAgICAgc3BsaW5lOiBudW1iZXI7XG4gICAgICAgIGtub3Q6IG51bWJlcjtcbiAgICAgICAgcGFydDogJ2luJyB8ICdvdXQnO1xuICAgICAgICB4MDogbnVtYmVyO1xuICAgICAgICB5MDogbnVtYmVyO1xuICAgICAgICBkcmFnZ2luZzogYm9vbGVhbjtcbiAgICAgICAgc2Vzc2lvbjogRWRpdFNlc3Npb247XG4gICAgICAgIG5vcm1hbDogVjM7XG4gICAgfTtcblxubGV0IGFjdGl2ZTogQWN0aXZlIHwgbnVsbCA9IG51bGw7XG5sZXQgbGFzdEhvdmVyS2V5ID0gJyc7XG5cbmZ1bmN0aW9uIGNvbXBzT2YobGlzdDogRWxlbWVudFJlZltdKTogYW55W10ge1xuICAgIHJldHVybiBbLi4ubmV3IFNldChsaXN0Lm1hcCgoZSkgPT4gZS5jb21wKSldO1xufVxuXG5mdW5jdGlvbiBoaXRLZXkoaDogSGl0IHwgbnVsbCk6IHN0cmluZyB7XG4gICAgaWYgKCFoKSByZXR1cm4gJyc7XG4gICAgc3dpdGNoIChoLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnaGFuZGxlJzogcmV0dXJuIGBoOiR7aC5heGlzfWA7XG4gICAgICAgIGNhc2UgJ2tub3QnOlxuICAgICAgICBjYXNlICd0YW5nZW50JzogcmV0dXJuIGAke2gua2luZH06JHtoLnJlZi5jb21wLnV1aWR9OiR7aC5yZWYuc3BsaW5lfToke2gucmVmLmtub3R9OiR7aC5yZWYucGFydH1gO1xuICAgICAgICBjYXNlICdjdXJ2ZSc6IHJldHVybiBgYzoke2guY29tcC51dWlkfToke2guc3BsaW5lfToke2guY3VydmV9YDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEhvdmVyKGg6IEhpdCB8IG51bGwpOiB2b2lkIHtcbiAgICBjb25zdCBrZXkgPSBoaXRLZXkoaCk7XG4gICAgUy5ob3ZlciA9IGg7XG4gICAgaWYgKGtleSAhPT0gbGFzdEhvdmVyS2V5KSB7XG4gICAgICAgIGxhc3RIb3ZlcktleSA9IGtleTtcbiAgICAgICAgcmVwYWludCgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2VsZWN0aW9uQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICBidW1wU3RhdGUoKTtcbiAgICBtYXliZUJyb2FkY2FzdCgpO1xuICAgIHJlcGFpbnQoKTtcbn1cblxuZnVuY3Rpb24gY2FuRWRpdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gUy5wcmltYXJ5ICYmICFTLnJlcGxheWluZyAmJiBydW50aW1lUmVhZHkoKTtcbn1cblxuLyoqIFBvaW50ZXIgcG9zaXRpb24gZm9yIGFuIGV2ZW50LCBvciBudWxsIGlmIHRoZXJlIGlzIG5vIFNjZW5lIHZpZXcgY2FtZXJhLiAqL1xuZnVuY3Rpb24gcG9pbnRlcihldjogYW55KTogeyBjYW06IGFueTsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGwge1xuICAgIGNvbnN0IGNhbSA9IHNjZW5lQ2FtZXJhKCk7XG4gICAgaWYgKCFjYW0pIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHAgPSBldmVudFRvU2NyZWVuKGNhbSwgZXYpO1xuICAgIHJldHVybiB7IGNhbSwgeDogcC54LCB5OiBwLnkgfTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtb3VzZVxuXG5leHBvcnQgZnVuY3Rpb24gb25Nb3VzZURvd24oZXY6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICghY2FuRWRpdCgpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBIGRyYWcgd2hvc2UgbW91c2UtdXAgbmV2ZXIgYXJyaXZlZCAocmVsZWFzZWQgb3V0c2lkZSB0aGUgdmlldykgZW5kcyBoZXJlLlxuICAgIGlmIChhY3RpdmUpIGNhbmNlbEFjdGl2ZSgpO1xuICAgIFMuZGlhZy5tb3VzZURvd25zKys7XG4gICAgY29uc3QgbGVmdCA9IGV2LmJ1dHRvbiA9PT0gMCB8fCAoZXYuYnV0dG9uID09PSB1bmRlZmluZWQgJiYgZXYubGVmdEJ1dHRvbik7XG4gICAgaWYgKCFsZWZ0IHx8IGV2LmFsdEtleSkgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgcCA9IHBvaW50ZXIoZXYpO1xuICAgIGlmICghcCkgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgdGFyZ2V0cyA9IHVwZGF0ZVRhcmdldHMoKTtcbiAgICBpZiAoIXRhcmdldHMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICBpZiAoUy50b29sID09PSAnZHJhdycpIHJldHVybiBkcmF3RG93bihwLmNhbSwgcC54LCBwLnksIGV2KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdERvd24ocC5jYW0sIHAueCwgcC55LCBldik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBub3RlKGBtb3VzZWRvd246ICR7KGUgYXMgRXJyb3IpPy5zdGFjayB8fCBlfWApO1xuICAgICAgICBhY3RpdmUgPSBudWxsO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNlbGVjdERvd24oY2FtOiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyLCBldjogYW55KTogYm9vbGVhbiB7XG4gICAgY29uc3QgaGl0ID0gaGl0VGVzdChjYW0sIHgsIHksIHsgb3V0c2lkZUNvbnRleHQ6ICFTLmNvbnRleHQgfSk7XG4gICAgaWYgKCFTLmNvbnRleHQpIHtcbiAgICAgICAgLy8gQ2xpY2tpbmcgYSBrbm90IG9mIGEgc2VsZWN0ZWQgc3BsaW5lIHN0YXJ0cyBlZGl0aW5nIGl0LlxuICAgICAgICBpZiAoaGl0Py5raW5kICE9PSAna25vdCcpIHJldHVybiB0cnVlO1xuICAgICAgICBzZXRDb250ZXh0KHRydWUpO1xuICAgIH1cbiAgICBTLmRpYWcuYmxvY2tlZCsrO1xuICAgIGlmIChoaXQ/LmtpbmQgPT09ICdoYW5kbGUnKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gY3VycmVudEhhbmRsZUZyYW1lKGNhbSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gUy5zZWxlY3Rpb24uYWxsKCk7XG4gICAgICAgIGlmICghZnJhbWUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgZHJhZyA9IHN0YXJ0SGFuZGxlRHJhZyhjYW0sIGZyYW1lLCBoaXQuYXhpcywgeCwgeSwgZWxlbWVudHMpO1xuICAgICAgICBpZiAoIWRyYWcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgc2V0SGFuZGxlQXhlc092ZXJyaWRlKGZyYW1lLmF4ZXMpO1xuICAgICAgICBzZXREcmFnQXhpcyhoaXQuYXhpcyk7XG4gICAgICAgIGFjdGl2ZSA9IHsga2luZDogJ2hhbmRsZScsIGRyYWcsIHNlc3Npb246IG5ldyBFZGl0U2Vzc2lvbihjb21wc09mKGVsZW1lbnRzKSkgfTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaGl0Py5raW5kID09PSAna25vdCcgfHwgaGl0Py5raW5kID09PSAndGFuZ2VudCcpIHtcbiAgICAgICAgY29uc3QgcmVmID0gaGl0LnJlZjtcbiAgICAgICAgY29uc3QgYWRkaXRpdmUgPSAhIShldi5zaGlmdEtleSB8fCBldi5jdHJsS2V5IHx8IGV2Lm1ldGFLZXkpO1xuICAgICAgICBsZXQgdG9nZ2xlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgIFMuc2VsZWN0aW9uLnRvZ2dsZShyZWYpO1xuICAgICAgICAgICAgdG9nZ2xlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIVMuc2VsZWN0aW9uLmhhcyhyZWYpKSB7XG4gICAgICAgICAgICBTLnNlbGVjdGlvbi5zZXQoW3JlZl0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUy5zZWxlY3Rpb24uYWRkKHJlZik7IC8vIG1ha2UgaXQgdGhlIGFjdGl2ZSBlbGVtZW50XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICBhY3RpdmUgPSB7IGtpbmQ6ICdlbGVtZW50JywgcmVmLCB4MDogeCwgeTA6IHksIGRyYWdnaW5nOiBmYWxzZSwgdG9nZ2xlZCwgc2Vzc2lvbjogbnVsbCwgZ3JhYjogbnVsbCwgc3RhcnRzOiBbXSB9O1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGFjdGl2ZSA9IHtcbiAgICAgICAga2luZDogJ3JlY3QnLFxuICAgICAgICB4MDogeCxcbiAgICAgICAgeTA6IHksXG4gICAgICAgIG1vdmVkOiBmYWxzZSxcbiAgICAgICAgYWRkaXRpdmU6ICEhKGV2LnNoaWZ0S2V5IHx8IGV2LmN0cmxLZXkgfHwgZXYubWV0YUtleSksXG4gICAgICAgIGJhc2U6IFMuc2VsZWN0aW9uLmFsbCgpLFxuICAgICAgICBkb3duOiBjbG9uZUV2ZW50KGV2KSxcbiAgICAgICAgb25DdXJ2ZTogaGl0Py5raW5kID09PSAnY3VydmUnLFxuICAgIH07XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjbG9uZUV2ZW50KGV2OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IG86IGFueSA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBldikge1xuICAgICAgICBjb25zdCB2ID0gZXZba107XG4gICAgICAgIGlmICh0eXBlb2YgdiAhPT0gJ2Z1bmN0aW9uJykgb1trXSA9IHY7XG4gICAgfVxuICAgIHJldHVybiBvO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXY6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICghY2FuRWRpdCgpKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBwID0gcG9pbnRlcihldik7XG4gICAgaWYgKCFwKSByZXR1cm4gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgaG92ZXIocC5jYW0sIHAueCwgcC55LCBldik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZHJhZ01vdmUocC5jYW0sIHAueCwgcC55LCBldik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBub3RlKGBtb3VzZW1vdmU6ICR7KGUgYXMgRXJyb3IpPy5zdGFjayB8fCBlfWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhvdmVyKGNhbTogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlciwgZXY6IGFueSk6IHZvaWQge1xuICAgIGlmICghUy5sYXN0VGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKFMuaG92ZXIpIHNldEhvdmVyKG51bGwpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChTLnRvb2wgPT09ICdkcmF3Jykge1xuICAgICAgICBjb25zdCBoaXQgPSBoaXRUZXN0KGNhbSwgeCwgeSwgeyBoYW5kbGVzOiBmYWxzZSwgb3V0c2lkZUNvbnRleHQ6IHRydWUgfSk7XG4gICAgICAgIHNldEhvdmVyKGhpdCAmJiAoaGl0LmtpbmQgPT09ICdrbm90JyB8fCBoaXQua2luZCA9PT0gJ2N1cnZlJykgPyBoaXQgOiBudWxsKTtcbiAgICAgICAgY29uc3QgY29tcCA9IGRyYXdDb21wKCk7XG4gICAgICAgIGNvbnN0IHBsYWNlID0gY29tcCA/IHBsYWNlbWVudChjYW0sIHgsIHksIGNvbXApIDogbnVsbDtcbiAgICAgICAgUy5wcmV2aWV3ID0gcGxhY2UgPyBwbGFjZS53b3JsZCA6IG51bGw7XG4gICAgICAgIHJlcGFpbnQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoaXQgPSBoaXRUZXN0KGNhbSwgeCwgeSwgeyBvdXRzaWRlQ29udGV4dDogIVMuY29udGV4dCwgY3VydmVzOiBTLmNvbnRleHQgfSk7XG4gICAgc2V0SG92ZXIoUy5jb250ZXh0IHx8IGhpdD8ua2luZCA9PT0gJ2tub3QnID8gaGl0IDogbnVsbCk7XG4gICAgdm9pZCBldjtcbn1cblxuZnVuY3Rpb24gZHJhZ01vdmUoY2FtOiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyLCBldjogYW55KTogYm9vbGVhbiB7XG4gICAgY29uc3QgYSA9IGFjdGl2ZSE7XG4gICAgc3dpdGNoIChhLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnaGFuZGxlJzoge1xuICAgICAgICAgICAgbGV0IHRleHQgPSAnJztcbiAgICAgICAgICAgIGEuc2Vzc2lvbi5hcHBseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IGEuZHJhZy51cGRhdGUoeCwgeSwgZXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGV4dCkgc2hvd1RpcChjYW0sIHgsIHksIHRleHQpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2VsZW1lbnQnOiB7XG4gICAgICAgICAgICBpZiAoIWEuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5oeXBvdCh4IC0gYS54MCwgeSAtIGEueTApIDwgRFJBR19QWCB8fCBhLnRvZ2dsZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBTdGFydCBtb3ZpbmcgdGhlIHNlbGVjdGlvbiB3aXRoIHRoZSBlbGVtZW50IHVuZGVyIHRoZSBtb3VzZS5cbiAgICAgICAgICAgICAgICBhLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IG1vdmFibGVFbGVtZW50cyhTLnNlbGVjdGlvbi5hbGwoKSk7XG4gICAgICAgICAgICAgICAgYS5zdGFydHMgPSBlbGVtZW50cy5tYXAoKGUpID0+ICh7IGUsIHBvczogZWxlbWVudFdvcmxkUG9zaXRpb24oZSkgfSkpO1xuICAgICAgICAgICAgICAgIGEuZ3JhYiA9IGVsZW1lbnRXb3JsZFBvc2l0aW9uKGEucmVmKTtcbiAgICAgICAgICAgICAgICBhLnNlc3Npb24gPSBuZXcgRWRpdFNlc3Npb24oY29tcHNPZihlbGVtZW50cykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZ3JhYiA9IGEuZ3JhYiE7XG4gICAgICAgICAgICBjb25zdCBuID0gY2FtZXJhRm9yd2FyZChjYW0pO1xuICAgICAgICAgICAgY29uc3QgaGl0ID0gcmF5UGxhbmUoc2NyZWVuUmF5KGNhbSwgeCwgeSksIGdyYWIsIG4sIHRydWUpO1xuICAgICAgICAgICAgaWYgKCFoaXQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gc3ViKHYzKCksIGhpdCwgZ3JhYik7XG4gICAgICAgICAgICBjb25zdCBzbmFwID0gc25hcENvbmZpZygpO1xuICAgICAgICAgICAgaWYgKHNuYXAuaXNQb3NpdGlvblNuYXBFbmFibGVkICE9PSAhIWV2LmN0cmxLZXkgJiYgYS5yZWYucGFydCA9PT0gJ2tub3QnKSB7XG4gICAgICAgICAgICAgICAgLy8gU25hcCB0aGUgZHJhZ2dlZCBrbm90J3Mgd29ybGQgcG9zaXRpb24gdG8gdGhlIGdyaWQuXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gYWRkKHYzKCksIGdyYWIsIGRlbHRhKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQueCA9IE1hdGgucm91bmQodGFyZ2V0LnggLyAoc25hcC5wb3NpdGlvbi54IHx8IDEpKSAqIChzbmFwLnBvc2l0aW9uLnggfHwgMSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnkgPSBNYXRoLnJvdW5kKHRhcmdldC55IC8gKHNuYXAucG9zaXRpb24ueSB8fCAxKSkgKiAoc25hcC5wb3NpdGlvbi55IHx8IDEpO1xuICAgICAgICAgICAgICAgIGlmICghaXMyRFZpZXcoKSkgdGFyZ2V0LnogPSBNYXRoLnJvdW5kKHRhcmdldC56IC8gKHNuYXAucG9zaXRpb24ueiB8fCAxKSkgKiAoc25hcC5wb3NpdGlvbi56IHx8IDEpO1xuICAgICAgICAgICAgICAgIHN1YihkZWx0YSwgdGFyZ2V0LCBncmFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGEuc2Vzc2lvbiEuYXBwbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcyBvZiBhLnN0YXJ0cykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBhZGQodjMoKSwgcy5wb3MsIGRlbHRhKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuZS5wYXJ0ID09PSAna25vdCcpIHNldEtub3RXb3JsZChzLmUuY29tcCwgcy5lLnNwbGluZSwgcy5lLmtub3QsIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugc2V0VGFuZ2VudFdvcmxkKHMuZS5jb21wLCBzLmUuc3BsaW5lLCBzLmUua25vdCwgcy5lLnBhcnQsIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncmVjdCc6IHtcbiAgICAgICAgICAgIGlmICghYS5tb3ZlZCAmJiBNYXRoLmh5cG90KHggLSBhLngwLCB5IC0gYS55MCkgPCBEUkFHX1BYKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBhLm1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNob3dSZWN0KGNhbSwgYS54MCwgYS55MCwgeCwgeSk7XG4gICAgICAgICAgICBjb25zdCBpbnNpZGUgPSBrbm90c0luUmVjdChjYW0sIGEueDAsIGEueTAsIHgsIHkpO1xuICAgICAgICAgICAgUy5zZWxlY3Rpb24uc2V0KGEuYWRkaXRpdmUgPyBbLi4uYS5iYXNlLCAuLi5pbnNpZGVdIDogaW5zaWRlKTtcbiAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdkcmF3JzpcbiAgICAgICAgICAgIGRyYXdEcmFnKGNhbSwgeCwgeSwgYSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqIEVsZW1lbnRzIHRoYXQgbW92ZSB3aXRoIGEgZHJhZzogdGFuZ2VudHMgd2hvc2Uga25vdCBpcyBhbHNvIHNlbGVjdGVkIG1vdmUgd2l0aCBpdC4gKi9cbmZ1bmN0aW9uIG1vdmFibGVFbGVtZW50cyhsaXN0OiBFbGVtZW50UmVmW10pOiBFbGVtZW50UmVmW10ge1xuICAgIHJldHVybiBsaXN0LmZpbHRlcigoZSkgPT4gZS5wYXJ0ID09PSAna25vdCcgfHwgIWxpc3Quc29tZSgobykgPT4gby5wYXJ0ID09PSAna25vdCcgJiYgby5jb21wID09PSBlLmNvbXAgJiYgby5zcGxpbmUgPT09IGUuc3BsaW5lICYmIG8ua25vdCA9PT0gZS5rbm90KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdXNlVXAoZXY6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmIChTLnJlcGxheWluZykgcmV0dXJuIHRydWU7XG4gICAgaWYgKCFhY3RpdmUpIHJldHVybiB0cnVlO1xuICAgIGNvbnN0IGEgPSBhY3RpdmU7XG4gICAgYWN0aXZlID0gbnVsbDtcbiAgICBjb25zdCBwID0gcG9pbnRlcihldik7XG4gICAgdHJ5IHtcbiAgICAgICAgc3dpdGNoIChhLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hhbmRsZSc6XG4gICAgICAgICAgICAgICAgYS5zZXNzaW9uLmVuZCgpO1xuICAgICAgICAgICAgICAgIHNldEhhbmRsZUF4ZXNPdmVycmlkZShudWxsKTtcbiAgICAgICAgICAgICAgICBzZXREcmFnQXhpcyhudWxsKTtcbiAgICAgICAgICAgICAgICBoaWRlVGlwKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdlbGVtZW50JzpcbiAgICAgICAgICAgICAgICBpZiAoYS5zZXNzaW9uKSBhLnNlc3Npb24uZW5kKCk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIWEudG9nZ2xlZCAmJiBTLnNlbGVjdGlvbi5zaXplID4gMSAmJiAhYS5kcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBBIGNsaWNrIG9uIG9uZSBvZiBzZXZlcmFsIHNlbGVjdGVkIGVsZW1lbnRzIHNlbGVjdHMganVzdCBpdC5cbiAgICAgICAgICAgICAgICAgICAgUy5zZWxlY3Rpb24uc2V0KFthLnJlZl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlY3QnOlxuICAgICAgICAgICAgICAgIGhpZGVSZWN0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFhLm1vdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhLm9uQ3VydmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsaWNrcyBvbiBhIGN1cnZlIHN0YXkgaW4gdGhlIGVkaXRvciAoZG91YmxlLWNsaWNrIGluc2VydHMgYSBrbm90KS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYS5hZGRpdGl2ZSkgY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChTLnNlbGVjdGlvbi5zaXplICYmICFhLmFkZGl0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFhLmFkZGl0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYXlDbGljayhhLmRvd24sIGV2KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RyYXcnOlxuICAgICAgICAgICAgICAgIGEuc2Vzc2lvbi5lbmQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbm90ZShgbW91c2V1cDogJHsoZSBhcyBFcnJvcik/LnN0YWNrIHx8IGV9YCk7XG4gICAgfVxuICAgIHZvaWQgcDtcbiAgICBzZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKiogTGV0cyB0aGUgZWRpdG9yIGhhbmRsZSBhIGNsaWNrIHdlIGhlbGQgYmFjayAob2JqZWN0IHBpY2tpbmcpLiAqL1xuZnVuY3Rpb24gcmVwbGF5Q2xpY2soZG93bjogYW55LCB1cDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgb3AgPSBjY2UoKS5PcGVyYXRpb247XG4gICAgaWYgKCFvcD8uZW1pdCkgcmV0dXJuO1xuICAgIFMucmVwbGF5aW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICBvcC5lbWl0KCdtb3VzZWRvd24nLCBkb3duKTtcbiAgICAgICAgb3AuZW1pdCgnbW91c2V1cCcsIHVwKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIG5vdGUoYHJlcGxheTogJHtlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAgIFMucmVwbGF5aW5nID0gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25EYmxDbGljayhldjogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCFjYW5FZGl0KCkgfHwgIVMuY29udGV4dCB8fCBTLnRvb2wgIT09ICdzZWxlY3QnKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBwID0gcG9pbnRlcihldik7XG4gICAgaWYgKCFwKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBoaXQgPSBoaXRUZXN0KHAuY2FtLCBwLngsIHAueSwgeyBoYW5kbGVzOiBmYWxzZSB9KTtcbiAgICBpZiAoaGl0Py5raW5kICE9PSAnY3VydmUnKSByZXR1cm4gdHJ1ZTtcbiAgICBpbnNlcnRPbkN1cnZlKGhpdC5jb21wLCBoaXQuc3BsaW5lLCBoaXQuY3VydmUsIGhpdC50KTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKiBFbmRzIGFueSBkcmFnIChlLmcuIHRoZSBtb3VzZSB3YXMgcmVsZWFzZWQgb3V0c2lkZSB0aGUgU2NlbmUgdmlldykuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsQWN0aXZlKCk6IHZvaWQge1xuICAgIGlmICghYWN0aXZlKSByZXR1cm47XG4gICAgY29uc3QgYSA9IGFjdGl2ZTtcbiAgICBhY3RpdmUgPSBudWxsO1xuICAgIGlmIChhLmtpbmQgPT09ICdoYW5kbGUnIHx8IGEua2luZCA9PT0gJ2RyYXcnKSBhLnNlc3Npb24uZW5kKCk7XG4gICAgaWYgKGEua2luZCA9PT0gJ2VsZW1lbnQnICYmIGEuc2Vzc2lvbikgYS5zZXNzaW9uLmVuZCgpO1xuICAgIHNldEhhbmRsZUF4ZXNPdmVycmlkZShudWxsKTtcbiAgICBzZXREcmFnQXhpcyhudWxsKTtcbiAgICBoaWRlUmVjdCgpO1xuICAgIGhpZGVUaXAoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRHJhZ2dpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhYWN0aXZlO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYXcgdG9vbFxuXG5mdW5jdGlvbiBkcmF3Q29tcCgpOiBhbnkge1xuICAgIGlmIChTLmRyYXdpbmcgJiYgUy5sYXN0VGFyZ2V0cy5pbmNsdWRlcyhTLmRyYXdpbmcuY29tcCkpIHJldHVybiBTLmRyYXdpbmcuY29tcDtcbiAgICByZXR1cm4gUy5sYXN0VGFyZ2V0c1tTLmRyYXdUYXJnZXQgJSBNYXRoLm1heCgxLCBTLmxhc3RUYXJnZXRzLmxlbmd0aCldID8/IG51bGw7XG59XG5cbi8qKiBOb3JtYWwgb2YgdGhlIGRyYXdpbmcgcGxhbmU6IHRoZSBjb250YWluZXIncyB1cCAoWSBpbiAzRCwgWiBpbiAyRCkuICovXG5mdW5jdGlvbiBkcmF3Tm9ybWFsKGNvbXA6IGFueSk6IFYzIHtcbiAgICBjb25zdCBuID0gZGlyVG9Xb3JsZChjb21wLCBpczJEVmlldygpID8gdjMoMCwgMCwgMSkgOiB2MygwLCAxLCAwKSk7XG4gICAgcmV0dXJuIGxlblNxKG4pID4gMWUtMTIgPyBub3JtYWxpemUobiwgbikgOiB2MygwLCAxLCAwKTtcbn1cblxuLyoqIFdoZXJlIGEga25vdCBwbGFjZWQgYXQgc2NyZWVuIHBvaW50ICh4LCB5KSBnb2VzLiAqL1xuZnVuY3Rpb24gcGxhY2VtZW50KGNhbTogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlciwgY29tcDogYW55KTogeyB3b3JsZDogVjM7IG5vcm1hbDogVjMgfSB8IG51bGwge1xuICAgIGNvbnN0IHJheSA9IHNjcmVlblJheShjYW0sIHgsIHkpO1xuICAgIGNvbnN0IG5vcm1hbCA9IGRyYXdOb3JtYWwoY29tcCk7XG4gICAgaWYgKFMuc2V0dGluZ3MuZHJhd09uU3VyZmFjZXMgJiYgIWlzMkRWaWV3KCkpIHtcbiAgICAgICAgY29uc3QgaGl0ID0gcmF5Y2FzdFNjZW5lKHJheSk7XG4gICAgICAgIGlmIChoaXQpIHJldHVybiB7IHdvcmxkOiBoaXQsIG5vcm1hbCB9O1xuICAgIH1cbiAgICAvLyBUaGUgcGxhbmUgdGhyb3VnaCB0aGUga25vdCBkcmF3biBsYXN0IChvciB0aGUgY29udGFpbmVyKSwgZmFjaW5nIHRoZSBjb250YWluZXIncyB1cC5cbiAgICBsZXQgcmVmOiBWMyA9IHRvV29ybGQoY29tcCwgdjMoKSk7XG4gICAgaWYgKFMuZHJhd2luZyAmJiBTLmRyYXdpbmcuY29tcCA9PT0gY29tcCkge1xuICAgICAgICBjb25zdCBzID0gY29tcC5zcGxpbmVzW1MuZHJhd2luZy5zcGxpbmVdO1xuICAgICAgICBpZiAocyAmJiBzLmtub3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgayA9IFMuZHJhd2luZy5lbmQgPT09ICdlbmQnID8gcy5rbm90cy5sZW5ndGggLSAxIDogMDtcbiAgICAgICAgICAgIHJlZiA9IGtub3RXb3JsZFBvc2l0aW9uKGNvbXAsIFMuZHJhd2luZy5zcGxpbmUsIGspO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBwOiBWMyB8IG51bGwgPSBudWxsO1xuICAgIGlmIChNYXRoLmFicyhkb3QocmF5LmQsIG5vcm1hbCkpID4gMC4wMikgcCA9IHJheVBsYW5lKHJheSwgcmVmLCBub3JtYWwpO1xuICAgIGlmICghcCkgcCA9IHJheVBsYW5lKHJheSwgcmVmLCBjYW1lcmFGb3J3YXJkKGNhbSksIHRydWUpO1xuICAgIGlmICghcCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFpczJEVmlldygpKSB7XG4gICAgICAgIGNvbnN0IHNuYXAgPSBzbmFwQ29uZmlnKCk7XG4gICAgICAgIGlmIChzbmFwLmlzUG9zaXRpb25TbmFwRW5hYmxlZCkge1xuICAgICAgICAgICAgcC54ID0gTWF0aC5yb3VuZChwLnggLyAoc25hcC5wb3NpdGlvbi54IHx8IDEpKSAqIChzbmFwLnBvc2l0aW9uLnggfHwgMSk7XG4gICAgICAgICAgICBwLnogPSBNYXRoLnJvdW5kKHAueiAvIChzbmFwLnBvc2l0aW9uLnogfHwgMSkpICogKHNuYXAucG9zaXRpb24ueiB8fCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB3b3JsZDogcCwgbm9ybWFsIH07XG59XG5cbi8qKiBDbG9zZXN0IHNjZW5lIGdlb21ldHJ5IHVuZGVyIHRoZSByYXkgKG1vZGVscyBvZiB1c2VyIG5vZGVzIG9ubHkpLiAqL1xuZnVuY3Rpb24gcmF5Y2FzdFNjZW5lKHJheTogUmF5KTogVjMgfCBudWxsIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGRpcmVjdG9yLCBnZW9tZXRyeSwgQ0NPYmplY3QgfSA9IGNjKCk7XG4gICAgICAgIGNvbnN0IHNjZW5lOiBhbnkgPSBkaXJlY3Rvci5nZXRTY2VuZSgpO1xuICAgICAgICBjb25zdCBycyA9IHNjZW5lPy5yZW5kZXJTY2VuZTtcbiAgICAgICAgaWYgKCFycykgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHIgPSBuZXcgZ2VvbWV0cnkuUmF5KHJheS5vLngsIHJheS5vLnksIHJheS5vLnosIHJheS5kLngsIHJheS5kLnksIHJheS5kLnopO1xuICAgICAgICBjb25zdCBoaWRkZW4gPSBDQ09iamVjdC5GbGFncy5Eb250U2F2ZSB8IENDT2JqZWN0LkZsYWdzLkhpZGVJbkhpZXJhcmNoeTtcbiAgICAgICAgbGV0IGJlc3QgPSBJbmZpbml0eTtcbiAgICAgICAgY29uc3Qgb3B0czogYW55ID0geyBtb2RlOiBnZW9tZXRyeS5FUmF5Y2FzdE1vZGUuQ0xPU0VTVCwgZGlzdGFuY2U6IEluZmluaXR5LCBkb3VibGVTaWRlZDogZmFsc2UgfTtcbiAgICAgICAgZm9yIChjb25zdCBtb2RlbCBvZiBycy5tb2RlbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBtb2RlbC5ub2RlO1xuICAgICAgICAgICAgaWYgKCFtb2RlbC5lbmFibGVkIHx8ICFub2RlIHx8ICFub2RlLmFjdGl2ZUluSGllcmFyY2h5IHx8IG5vZGUuc2NlbmUgIT09IHNjZW5lKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChoYXNGbGFncyhub2RlLCBoaWRkZW4pKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtb2RlbC53b3JsZEJvdW5kcyAmJiAhZ2VvbWV0cnkuaW50ZXJzZWN0LnJheUFBQkIociwgbW9kZWwud29ybGRCb3VuZHMpKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBnZW9tZXRyeS5pbnRlcnNlY3QucmF5TW9kZWwociwgbW9kZWwsIG9wdHMpO1xuICAgICAgICAgICAgaWYgKGQgPiAwICYmIGQgPCBiZXN0KSBiZXN0ID0gZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRmluaXRlKGJlc3QpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNjYWxlQW5kQWRkKHYzKCksIHJheS5vLCByYXkuZCwgYmVzdCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBub3RlKGByYXljYXN0OiAke2V9YCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFzRmxhZ3Mobm9kZTogYW55LCBmbGFnczogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgbiA9IG5vZGU7IG47IG4gPSBuLnBhcmVudCkgaWYgKChuLl9vYmpGbGFncyAmIGZsYWdzKSAhPT0gMCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBkcmF3RG93bihjYW06IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIsIGV2OiBhbnkpOiBib29sZWFuIHtcbiAgICBjb25zdCBjb21wID0gZHJhd0NvbXAoKTtcbiAgICBpZiAoIWNvbXApIHJldHVybiB0cnVlO1xuICAgIFMuZGlhZy5ibG9ja2VkKys7XG4gICAgY29uc3QgaGl0ID0gaGl0VGVzdChjYW0sIHgsIHksIHsgaGFuZGxlczogZmFsc2UsIG91dHNpZGVDb250ZXh0OiB0cnVlIH0pO1xuICAgIGlmIChTLmRyYXdpbmcpIHtcbiAgICAgICAgLy8gQ2xpY2tpbmcgdGhlIG90aGVyIGVuZCBvZiB0aGUgc3BsaW5lIGJlaW5nIGRyYXduIGNsb3NlcyBpdC5cbiAgICAgICAgY29uc3QgZCA9IFMuZHJhd2luZztcbiAgICAgICAgY29uc3QgcyA9IGQuY29tcC5zcGxpbmVzW2Quc3BsaW5lXTtcbiAgICAgICAgaWYgKGhpdD8ua2luZCA9PT0gJ2tub3QnICYmIGhpdC5yZWYuY29tcCA9PT0gZC5jb21wICYmIGhpdC5yZWYuc3BsaW5lID09PSBkLnNwbGluZSAmJiBzICYmIHMua25vdHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gZC5lbmQgPT09ICdlbmQnID8gMCA6IHMua25vdHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmIChoaXQucmVmLmtub3QgPT09IG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkRWRpdChbZC5jb21wXSwgKCkgPT4gc2V0Q2xvc2VkKHMsIHRydWUpKTtcbiAgICAgICAgICAgICAgICBTLmRyYXdpbmcgPSBudWxsO1xuICAgICAgICAgICAgICAgIFMuc2VsZWN0aW9uLnNldChbeyBjb21wOiBkLmNvbXAsIHNwbGluZTogZC5zcGxpbmUsIGtub3Q6IG90aGVyLCBwYXJ0OiAna25vdCcgfV0pO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGhpdD8ua2luZCA9PT0gJ2tub3QnKSB7XG4gICAgICAgIC8vIENsaWNraW5nIHRoZSBlbmQgb2YgYW4gb3BlbiBzcGxpbmUgY29udGludWVzIGl0LlxuICAgICAgICBjb25zdCBzID0gaGl0LnJlZi5jb21wLnNwbGluZXNbaGl0LnJlZi5zcGxpbmVdO1xuICAgICAgICBpZiAocyAmJiBpc0VuZEtub3QocywgaGl0LnJlZi5rbm90KSkge1xuICAgICAgICAgICAgUy5kcmF3aW5nID0geyBjb21wOiBoaXQucmVmLmNvbXAsIHNwbGluZTogaGl0LnJlZi5zcGxpbmUsIGVuZDogaGl0LnJlZi5rbm90ID09PSAwICYmIHMua25vdHMubGVuZ3RoID4gMSA/ICdzdGFydCcgOiAnZW5kJyB9O1xuICAgICAgICAgICAgUy5zZWxlY3Rpb24uc2V0KFtoaXQucmVmXSk7XG4gICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGhpdD8ua2luZCA9PT0gJ2N1cnZlJykge1xuICAgICAgICBpbnNlcnRPbkN1cnZlKGhpdC5jb21wLCBoaXQuc3BsaW5lLCBoaXQuY3VydmUsIGhpdC50KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBwbGFjZSA9IHBsYWNlbWVudChjYW0sIHgsIHksIGNvbXApO1xuICAgIGlmICghcGxhY2UpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCB0YXJnZXQgPSBTLmRyYXdpbmcgPyBTLmRyYXdpbmcuY29tcCA6IGNvbXA7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBFZGl0U2Vzc2lvbihbdGFyZ2V0XSk7XG4gICAgLy8gVGhlIGtub3QgZXhpc3RzIG9uY2UgdGhlIHJlY29yZGluZyBpcyBvcGVuOyB0aGUgZHJhZyBhbmQgc2VsZWN0aW9uIGZvbGxvdyBpdCB0aGVuLlxuICAgIGNvbnN0IGE6IEV4dHJhY3Q8QWN0aXZlLCB7IGtpbmQ6ICdkcmF3JyB9PiA9IHtcbiAgICAgICAga2luZDogJ2RyYXcnLFxuICAgICAgICBjb21wOiB0YXJnZXQsXG4gICAgICAgIHNwbGluZTogLTEsXG4gICAgICAgIGtub3Q6IC0xLFxuICAgICAgICBwYXJ0OiAnb3V0JyxcbiAgICAgICAgeDA6IHgsXG4gICAgICAgIHkwOiB5LFxuICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgIHNlc3Npb24sXG4gICAgICAgIG5vcm1hbDogcGxhY2Uubm9ybWFsLFxuICAgIH07XG4gICAgYWN0aXZlID0gYTtcbiAgICBzZXNzaW9uLmFwcGx5KCgpID0+IHtcbiAgICAgICAgaWYgKCFTLmRyYXdpbmcpIHtcbiAgICAgICAgICAgIC8vIEEgbmV3IHNwbGluZTogcmV1c2UgYW4gZW1wdHkgb25lIGlmIHRoZXJlIGlzIG9uZS5cbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRhcmdldC5zcGxpbmVzLmZpbmRJbmRleCgoczogYW55KSA9PiBzLmtub3RzLmxlbmd0aCA9PT0gMCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNwbGluZXMucHVzaChmYWN0b3J5LnNwbGluZSgpKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHRhcmdldC5zcGxpbmVzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTLmRyYXdpbmcgPSB7IGNvbXA6IHRhcmdldCwgc3BsaW5lOiBpbmRleCwgZW5kOiAnZW5kJyB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGQgPSBTLmRyYXdpbmchO1xuICAgICAgICBjb25zdCBzID0gdGFyZ2V0LnNwbGluZXNbZC5zcGxpbmVdO1xuICAgICAgICBjb25zdCBrOiBhbnkgPSBmYWN0b3J5Lmtub3QoKTtcbiAgICAgICAgY29weShrLnBvc2l0aW9uLCB0b0xvY2FsKHRhcmdldCwgcGxhY2Uud29ybGQpKTtcbiAgICAgICAgay5tb2RlID0gUy5zZXR0aW5ncy5kZWZhdWx0TW9kZTtcbiAgICAgICAgLy8gT3JpZW50IHRvd2FyZHMgdGhlIHRyYXZlbCBkaXJlY3Rpb24sIHVwIGFsb25nIHRoZSBkcmF3aW5nIHBsYW5lIG5vcm1hbC5cbiAgICAgICAgY29uc3QgcHJldkluZGV4ID0gZC5lbmQgPT09ICdlbmQnID8gcy5rbm90cy5sZW5ndGggLSAxIDogMDtcbiAgICAgICAgY29uc3QgbG9jYWxOb3JtYWwgPSBub3JtYWxpemUodjMoKSwgZGlyVG9Mb2NhbFNhZmUodGFyZ2V0LCBwbGFjZS5ub3JtYWwpKTtcbiAgICAgICAgaWYgKHMua25vdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2ID0gcy5rbm90c1twcmV2SW5kZXhdLnBvc2l0aW9uO1xuICAgICAgICAgICAgY29uc3QgZGlyID0gZC5lbmQgPT09ICdlbmQnID8gc3ViKHYzKCksIGsucG9zaXRpb24sIHByZXYpIDogc3ViKHYzKCksIHByZXYsIGsucG9zaXRpb24pO1xuICAgICAgICAgICAga25vdFJvdGF0aW9uKGsucm90YXRpb24sIGRpciwgbG9jYWxOb3JtYWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga25vdFJvdGF0aW9uKGsucm90YXRpb24sIHYzKCksIGxvY2FsTm9ybWFsKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbmRleCA9IGQuZW5kID09PSAnZW5kJyA/IHMua25vdHMubGVuZ3RoIDogMDtcbiAgICAgICAgY29udGFpbmVySW5zZXJ0S25vdCh0YXJnZXQsIGQuc3BsaW5lLCBpbmRleCwgayk7XG4gICAgICAgIGEuc3BsaW5lID0gZC5zcGxpbmU7XG4gICAgICAgIGEua25vdCA9IGluZGV4O1xuICAgICAgICBhLnBhcnQgPSBkLmVuZCA9PT0gJ2VuZCcgPyAnb3V0JyA6ICdpbic7XG4gICAgICAgIFMuc2VsZWN0aW9uLnNldChbeyBjb21wOiB0YXJnZXQsIHNwbGluZTogZC5zcGxpbmUsIGtub3Q6IGluZGV4LCBwYXJ0OiAna25vdCcgfV0pO1xuICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgfSk7XG4gICAgdm9pZCBldjtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGRpclRvTG9jYWxTYWZlKGNvbXA6IGFueSwgd29ybGQ6IFYzKTogVjMge1xuICAgIGNvbnN0IG8gPSB0b0xvY2FsKGNvbXAsIHYzKCkpO1xuICAgIGNvbnN0IHAgPSB0b0xvY2FsKGNvbXAsIHdvcmxkKTtcbiAgICByZXR1cm4gc3ViKHYzKCksIHAsIG8pO1xufVxuXG5mdW5jdGlvbiBkcmF3RHJhZyhjYW06IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIsIGE6IEV4dHJhY3Q8QWN0aXZlLCB7IGtpbmQ6ICdkcmF3JyB9Pik6IHZvaWQge1xuICAgIGlmIChhLmtub3QgPCAwKSByZXR1cm47XG4gICAgaWYgKCFhLmRyYWdnaW5nICYmIE1hdGguaHlwb3QoeCAtIGEueDAsIHkgLSBhLnkwKSA8IERSQUdfUFgpIHJldHVybjtcbiAgICBhLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICBjb25zdCBwb3MgPSBrbm90V29ybGRQb3NpdGlvbihhLmNvbXAsIGEuc3BsaW5lLCBhLmtub3QpO1xuICAgIGxldCBoaXQgPSByYXlQbGFuZShzY3JlZW5SYXkoY2FtLCB4LCB5KSwgcG9zLCBhLm5vcm1hbCk7XG4gICAgaWYgKCFoaXQpIGhpdCA9IHJheVBsYW5lKHNjcmVlblJheShjYW0sIHgsIHkpLCBwb3MsIGNhbWVyYUZvcndhcmQoY2FtKSwgdHJ1ZSk7XG4gICAgaWYgKCFoaXQpIHJldHVybjtcbiAgICBjb25zdCBlbmQgPSBoaXQ7XG4gICAgYS5zZXNzaW9uLmFwcGx5KCgpID0+IHtcbiAgICAgICAgY29uc3QgcyA9IGEuY29tcC5zcGxpbmVzW2Euc3BsaW5lXTtcbiAgICAgICAgaWYgKCFzIHx8ICFzLmtub3RzW2Eua25vdF0pIHJldHVybjtcbiAgICAgICAgLy8gRHJhZ2dpbmcgd2hpbGUgcGxhY2luZyBtYWtlcyBhIEJlemllciBrbm90IHdpdGggbWlycm9yZWQgdGFuZ2VudHMgKFVuaXR5KS5cbiAgICAgICAgaWYgKHMua25vdHNbYS5rbm90XS5tb2RlICE9PSBUYW5nZW50TW9kZS5NaXJyb3JlZCkgc2V0VGFuZ2VudE1vZGUocywgYS5rbm90LCBUYW5nZW50TW9kZS5NaXJyb3JlZCk7XG4gICAgICAgIHNldFRhbmdlbnRXb3JsZChhLmNvbXAsIGEuc3BsaW5lLCBhLmtub3QsIGEucGFydCwgZW5kKTtcbiAgICB9KTtcbn1cblxuLyoqIFByZXZpZXcgb2YgdGhlIERyYXcgdG9vbDogdGhlIG5leHQgY3VydmUgYW5kIHdoZXJlIHRoZSBrbm90IHdvdWxkIGdvLiAqL1xuZnVuY3Rpb24gZHJhd1ByZXZpZXcoX2NhbTogYW55KTogdm9pZCB7XG4gICAgaWYgKCFTLmNvbnRleHQgfHwgUy50b29sICE9PSAnZHJhdycpIHJldHVybjtcbiAgICBjb25zdCBoID0gUy5ob3ZlcjtcbiAgICBpZiAoaD8ua2luZCA9PT0gJ2N1cnZlJykge1xuICAgICAgICBELmRpc2MoaC53b3JsZCwgNSwgRC5Db2xvcnMuaW5zZXJ0KTtcbiAgICAgICAgRC5jaXJjbGUoaC53b3JsZCwgNywgRC5Db2xvcnMuaW5zZXJ0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaD8ua2luZCA9PT0gJ2tub3QnICYmIFMuZHJhd2luZykge1xuICAgICAgICBjb25zdCBkID0gUy5kcmF3aW5nO1xuICAgICAgICBjb25zdCBzID0gZC5jb21wLnNwbGluZXNbZC5zcGxpbmVdO1xuICAgICAgICBjb25zdCBvdGhlciA9IGQuZW5kID09PSAnZW5kJyA/IDAgOiAocz8ua25vdHMubGVuZ3RoID8/IDEpIC0gMTtcbiAgICAgICAgaWYgKHMgJiYgaC5yZWYuY29tcCA9PT0gZC5jb21wICYmIGgucmVmLnNwbGluZSA9PT0gZC5zcGxpbmUgJiYgaC5yZWYua25vdCA9PT0gb3RoZXIgJiYgcy5rbm90cy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgRC5jaXJjbGUoa25vdFdvcmxkUG9zaXRpb24oZC5jb21wLCBkLnNwbGluZSwgb3RoZXIpLCAxMCwgRC5Db2xvcnMuaW5zZXJ0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIVMucHJldmlldyB8fCBhY3RpdmUpIHJldHVybjtcbiAgICBjb25zdCBwID0gUy5wcmV2aWV3O1xuICAgIEQuZGlzYyhwLCA0LCBELkNvbG9ycy5wcmV2aWV3KTtcbiAgICBjb25zdCBkID0gUy5kcmF3aW5nO1xuICAgIGlmICghZCkgcmV0dXJuO1xuICAgIGNvbnN0IHMgPSBkLmNvbXAuc3BsaW5lc1tkLnNwbGluZV07XG4gICAgaWYgKCFzIHx8ICFzLmtub3RzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IGsgPSBkLmVuZCA9PT0gJ2VuZCcgPyBzLmtub3RzLmxlbmd0aCAtIDEgOiAwO1xuICAgIGNvbnN0IGtub3QgPSBzLmtub3RzW2tdO1xuICAgIGNvbnN0IGZyb20gPSBrbm90V29ybGRQb3NpdGlvbihkLmNvbXAsIGQuc3BsaW5lLCBrKTtcbiAgICBjb25zdCBoYW5kbGVWZWMgPSBkLmVuZCA9PT0gJ2VuZCcgPyB0YW5nZW50T3V0VmVjKHYzKCksIGtub3QpIDogdGFuZ2VudEluVmVjKHYzKCksIGtub3QpO1xuICAgIGNvbnN0IGM6IEN1cnZlID0gY3VydmUoKTtcbiAgICBjb3B5KGMucDAsIGZyb20pO1xuICAgIGFkZChjLnAxLCBmcm9tLCBkaXJUb1dvcmxkKGQuY29tcCwgaGFuZGxlVmVjKSk7XG4gICAgaWYgKGxlblNxKHN1Yih2MygpLCBjLnAxLCBjLnAwKSkgPCAxZS0xMikge1xuICAgICAgICAvLyBMaW5lYXIgLyBBdXRvU21vb3RoIGVuZDogYSB0aGlyZCBvZiB0aGUgd2F5LlxuICAgICAgICBzY2FsZUFuZEFkZChjLnAxLCBmcm9tLCBzdWIodjMoKSwgcCwgZnJvbSksIDEgLyAzKTtcbiAgICB9XG4gICAgc2NhbGVBbmRBZGQoYy5wMiwgcCwgc3ViKHYzKCksIGZyb20sIHApLCAxIC8gMyk7XG4gICAgY29weShjLnAzLCBwKTtcbiAgICBjb25zdCBuID0gMjQ7XG4gICAgbGV0IHByZXYgPSBjb3B5KHYzKCksIGZyb20pO1xuICAgIGNvbnN0IGN1ciA9IHYzKCk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbjsgaSsrKSB7XG4gICAgICAgIGV2YWxQb3NpdGlvbihjdXIsIGMsIGkgLyBuKTtcbiAgICAgICAgRC5saW5lKHByZXYsIGN1ciwgRC5Db2xvcnMucHJldmlldyk7XG4gICAgICAgIGNvcHkocHJldiwgY3VyKTtcbiAgICB9XG59XG5cbnNldFByZXZpZXdEcmF3ZXIoZHJhd1ByZXZpZXcpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0ga2V5Ym9hcmRcblxuZnVuY3Rpb24gcGxhaW5LZXkoZXY6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhZXYuY3RybEtleSAmJiAhZXYubWV0YUtleSAmJiAhZXYuYWx0S2V5ICYmICFldi5zaGlmdEtleTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uS2V5RG93bihldjogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCFjYW5FZGl0KCkgfHwgIVMuY29udGV4dCkgcmV0dXJuIHRydWU7XG4gICAgY29uc3Qga2V5ID0gU3RyaW5nKGV2LmtleSB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICB0cnkge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgY2FzZSAnZXNjYXBlJzpcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChTLnRvb2wgPT09ICdkcmF3Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoUy5kcmF3aW5nKSBTLmRyYXdpbmcgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHNldFRvb2woJ3NlbGVjdCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoUy5zZWxlY3Rpb24uc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldENvbnRleHQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY2FzZSAnZW50ZXInOlxuICAgICAgICAgICAgICAgIGlmIChTLnRvb2wgPT09ICdkcmF3JyAmJiBTLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgUy5kcmF3aW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tzcGFjZSc6XG4gICAgICAgICAgICAgICAgaWYgKCFTLnNlbGVjdGlvbi5zaXplKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkZWxldGVLZXkoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICBpZiAoIXBsYWluS2V5KGV2KSB8fCAhUy5zZWxlY3Rpb24uc2l6ZSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgY3ljbGVNb2RlU2VsZWN0ZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjYXNlICd4JzpcbiAgICAgICAgICAgICAgICBpZiAoIXBsYWluS2V5KGV2KSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgUy5zZXR0aW5ncy5vcmllbnRhdGlvbiA9IFMuc2V0dGluZ3Mub3JpZW50YXRpb24gPT09ICdnbG9iYWwnID8gJ2xvY2FsJyA6IFMuc2V0dGluZ3Mub3JpZW50YXRpb24gPT09ICdsb2NhbCcgPyAnZWxlbWVudCcgOiAnZ2xvYmFsJztcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY2FzZSAnYSc6XG4gICAgICAgICAgICAgICAgaWYgKCEoZXYuY3RybEtleSB8fCBldi5tZXRhS2V5KSB8fCBldi5hbHRLZXkpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIFMuc2VsZWN0QWxsS2V5QXQgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIHNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgIGlmIChTLnRvb2wgPT09ICdkcmF3JyAmJiBldi5zaGlmdEtleSAmJiAhZXYuY3RybEtleSAmJiBTLmxhc3RUYXJnZXRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5pdHk6IFNoaWZ0K1MgY3ljbGVzIHRoZSBjb250YWluZXIgdGhlIERyYXcgdG9vbCBhZGRzIHRvLlxuICAgICAgICAgICAgICAgICAgICBTLmRyYXdUYXJnZXQgPSAoUy5kcmF3VGFyZ2V0ICsgMSkgJSBTLmxhc3RUYXJnZXRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgUy5kcmF3aW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBub3RlKGBrZXlkb3duOiAkeyhlIGFzIEVycm9yKT8uc3RhY2sgfHwgZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbktleVVwKF9ldjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8qKiBEZWxldGVzIHRoZSBzZWxlY3Rpb24gb25jZSBwZXIga2V5IHByZXNzICh0aGUga2V5IG1heSBhcnJpdmUgdHdpY2UpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUtleSgpOiB2b2lkIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGlmIChub3cgLSBTLmRlbGV0ZUtleUF0IDwgMTUwKSByZXR1cm47XG4gICAgUy5kZWxldGVLZXlBdCA9IG5vdztcbiAgICBkZWxldGVTZWxlY3Rpb24oKTtcbn1cbiIsICIvKipcbiAqIEtlZXBzIGVkaXRvciBzaG9ydGN1dHMgZnJvbSBhY3Rpbmcgb24gdGhlIG5vZGUgd2hpbGUga25vdHMgYXJlIGJlaW5nXG4gKiBlZGl0ZWQ6IERlbGV0ZSByZW1vdmVzIHRoZSBzZWxlY3RlZCBrbm90cyAobm90IHRoZSBub2RlKSwgQ3RybCtBIHNlbGVjdHNcbiAqIGFsbCBrbm90cyAobm90IGFsbCBub2RlcykuXG4gKlxuICogVGhlIGtleXMgcmVhY2ggdGhlIGVkaXRvcidzIHNob3J0Y3V0IHN5c3RlbSBhcyB3ZWxsIGFzIHRoZSBzY2VuZSwgc28gdGhlXG4gKiBzY2VuZSBmYWNhZGUncyByZW1vdmVOb2RlIC8gc2VsZWN0QWxsTm9kZXMgYXJlIHdyYXBwZWQ6IHJpZ2h0IGFmdGVyIHN1Y2ggYVxuICoga2V5IHdlbnQgdGhyb3VnaCB0aGUgU2NlbmUgdmlldyBpbiB0aGUgZWRpdCBjb250ZXh0LCB0aGV5IGRvIG5vdGhpbmcgZm9yXG4gKiB0aGUgZWRpdGVkIG5vZGVzLlxuICovXG5pbXBvcnQgeyBjY2UgfSBmcm9tICcuL2Vudic7XG5pbXBvcnQgeyBTLCBub3RlIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBkZWxldGVLZXksIGNhbmNlbEFjdGl2ZSwgaXNEcmFnZ2luZyB9IGZyb20gJy4vaW5wdXQnO1xuXG5jb25zdCBLRVlfV0lORE9XX01TID0gODAwO1xuY29uc3QgdW5kbzogKCgpID0+IHZvaWQpW10gPSBbXTtcbmxldCBpbnN0YWxsZWQgPSBmYWxzZTtcblxuZnVuY3Rpb24gaXNUeXBpbmcoZTogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgY29uc3QgdGFnID0gdD8udGFnTmFtZTtcbiAgICByZXR1cm4gdGFnID09PSAnSU5QVVQnIHx8IHRhZyA9PT0gJ1RFWFRBUkVBJyB8fCAhIXQ/LmlzQ29udGVudEVkaXRhYmxlO1xufVxuXG5mdW5jdGlvbiBvbktleURvd25DYXB0dXJlKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIVMucHJpbWFyeSB8fCAhUy5jb250ZXh0IHx8IGlzVHlwaW5nKGUpKSByZXR1cm47XG4gICAgY29uc3QgayA9IGUua2V5O1xuICAgIGlmICgoayA9PT0gJ0RlbGV0ZScgfHwgayA9PT0gJ0JhY2tzcGFjZScpICYmIFMuc2VsZWN0aW9uLnNpemUgJiYgIWUuY3RybEtleSAmJiAhZS5tZXRhS2V5KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZGVsZXRlS2V5KCk7XG4gICAgfSBlbHNlIGlmICgoayA9PT0gJ2EnIHx8IGsgPT09ICdBJykgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpICYmIFMubGFzdFRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIFMuc2VsZWN0QWxsS2V5QXQgPSBEYXRlLm5vdygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gb25CbHVyKCk6IHZvaWQge1xuICAgIGlmIChpc0RyYWdnaW5nKCkpIGNhbmNlbEFjdGl2ZSgpO1xufVxuXG5mdW5jdGlvbiBpbnZvbHZlc0VkaXRlZChvcHRpb25zOiBhbnkpOiBib29sZWFuIHtcbiAgICBjb25zdCBpZHMgPSBvcHRpb25zPy51dWlkO1xuICAgIGNvbnN0IGxpc3Q6IHN0cmluZ1tdID0gQXJyYXkuaXNBcnJheShpZHMpID8gaWRzIDogdHlwZW9mIGlkcyA9PT0gJ3N0cmluZycgPyBbaWRzXSA6IFtdO1xuICAgIGNvbnN0IGVkaXRlZCA9IG5ldyBTZXQoUy5sYXN0VGFyZ2V0cy5tYXAoKGMpID0+IGMubm9kZS51dWlkKSk7XG4gICAgcmV0dXJuIGxpc3Quc29tZSgoaWQpID0+IGVkaXRlZC5oYXMoaWQpKSB8fCBsaXN0Lmxlbmd0aCA9PT0gMDtcbn1cblxuZnVuY3Rpb24gd3JhcCh0YXJnZXQ6IGFueSwgbmFtZTogc3RyaW5nLCBndWFyZDogKHNlbGY6IGFueSwgYXJnczogYW55W10pID0+IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBvcmlnID0gdGFyZ2V0Py5bbmFtZV07XG4gICAgaWYgKHR5cGVvZiBvcmlnICE9PSAnZnVuY3Rpb24nIHx8IG9yaWcuX19zcGxpbmVzR3VhcmQpIHJldHVybjtcbiAgICBjb25zdCB3cmFwcGVkID0gZnVuY3Rpb24gKHRoaXM6IGFueSwgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChndWFyZCh0aGlzLCBhcmdzKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgbm90ZShgZ3VhcmQgJHtuYW1lfTogJHtlfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gICAgKHdyYXBwZWQgYXMgYW55KS5fX3NwbGluZXNHdWFyZCA9IHRydWU7XG4gICAgdGFyZ2V0W25hbWVdID0gd3JhcHBlZDtcbiAgICB1bmRvLnB1c2goKCkgPT4ge1xuICAgICAgICBpZiAodGFyZ2V0W25hbWVdID09PSB3cmFwcGVkKSB0YXJnZXRbbmFtZV0gPSBvcmlnO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbEd1YXJkcygpOiB2b2lkIHtcbiAgICBpZiAoaW5zdGFsbGVkKSByZXR1cm47XG4gICAgaW5zdGFsbGVkID0gdHJ1ZTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bkNhcHR1cmUsIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgb25CbHVyKTtcbiAgICB1bmRvLnB1c2goKCkgPT4ge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bkNhcHR1cmUsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uQmx1cik7XG4gICAgfSk7XG4gICAgY29uc3QgZmFjYWRlID0gY2NlKCkuU2NlbmVGYWNhZGVNYW5hZ2VyO1xuICAgIGNvbnN0IHRhcmdldCA9IHR5cGVvZiBmYWNhZGUgPT09ICdmdW5jdGlvbicgPyBmYWNhZGUucHJvdG90eXBlIDogZmFjYWRlO1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG4gICAgd3JhcCh0YXJnZXQsICdyZW1vdmVOb2RlJywgKF9zZWxmLCBhcmdzKSA9PiB7XG4gICAgICAgIGlmIChTLmNvbnRleHQgJiYgRGF0ZS5ub3coKSAtIFMuZGVsZXRlS2V5QXQgPCBLRVlfV0lORE9XX01TICYmIGludm9sdmVzRWRpdGVkKGFyZ3NbMF0pKSB7XG4gICAgICAgICAgICBub3RlKCdEZWxldGUgd2VudCB0byB0aGUgc2VsZWN0ZWQga25vdHMsIG5vdCB0aGUgbm9kZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIHdyYXAodGFyZ2V0LCAnc2VsZWN0QWxsTm9kZXMnLCAoKSA9PiBTLmNvbnRleHQgJiYgRGF0ZS5ub3coKSAtIFMuc2VsZWN0QWxsS2V5QXQgPCBLRVlfV0lORE9XX01TKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaW5zdGFsbEd1YXJkcygpOiB2b2lkIHtcbiAgICB3aGlsZSAodW5kby5sZW5ndGgpIHVuZG8ucG9wKCkhKCk7XG4gICAgaW5zdGFsbGVkID0gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWFyZHNJbmZvKCk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHtcbiAgICBjb25zdCBmYWNhZGUgPSBjY2UoKS5TY2VuZUZhY2FkZU1hbmFnZXI7XG4gICAgY29uc3QgdGFyZ2V0ID0gdHlwZW9mIGZhY2FkZSA9PT0gJ2Z1bmN0aW9uJyA/IGZhY2FkZS5wcm90b3R5cGUgOiBmYWNhZGU7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5zdGFsbGVkLFxuICAgICAgICBmYWNhZGVUeXBlOiB0eXBlb2YgZmFjYWRlLFxuICAgICAgICByZW1vdmVOb2RlR3VhcmRlZDogISF0YXJnZXQ/LnJlbW92ZU5vZGU/Ll9fc3BsaW5lc0d1YXJkLFxuICAgICAgICBzZWxlY3RBbGxHdWFyZGVkOiAhIXRhcmdldD8uc2VsZWN0QWxsTm9kZXM/Ll9fc3BsaW5lc0d1YXJkLFxuICAgIH07XG59XG4iLCAiLyoqXG4gKiBTY2VuZS1wcm9jZXNzIGhhbGYgb2YgdGhlIFNwbGluZXMgZXh0ZW5zaW9uOiBkcmF3cyBzcGxpbmVzIGluIHRoZSBTY2VuZVxuICogdmlldywgZWRpdHMgdGhlbSB3aXRoIHRoZSBtb3VzZSwgYW5kIHNlcnZlcyB0aGUgcGFuZWwgYW5kIEluc3BlY3Rvci5cbiAqXG4gKiBNZXRob2RzIGFyZSBjYWxsZWQgd2l0aCBleGVjdXRlLXNjZW5lLXNjcmlwdCwgd2hpY2ggb25seSByZWFjaGVzIHRoZSBlZGl0XG4gKiBzY2VuZSdzIHByb2Nlc3M7IHRoYXQgcHJvY2VzcyBtYXJrcyBpdHNlbGYgcHJpbWFyeS4gUGxheS1pbi1FZGl0b3Inc1xuICogcHJvY2VzcyBsb2FkcyB0aGlzIHNjcmlwdCB0b28gYnV0IG9ubHkgZHJhd3MuXG4gKi9cbmltcG9ydCB7IGNjLCBjY2UsIGZpbmRDb21wb25lbnQsIGZpbmROb2RlLCBydW50aW1lUmVhZHksIHJlcGFpbnQsIGFsbENvbnRhaW5lcnMgfSBmcm9tICcuL2Vudic7XG5pbXBvcnQgeyBTLCBERUZBVUxUX1NFVFRJTkdTLCBub3RlLCBidW1wU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IGRyYXdGcmFtZSB9IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCB7IG9uTW91c2VEb3duLCBvbk1vdXNlTW92ZSwgb25Nb3VzZVVwLCBvbkRibENsaWNrLCBvbktleURvd24sIG9uS2V5VXAsIFBSSU9SSVRZLCBjYW5jZWxBY3RpdmUgfSBmcm9tICcuL2lucHV0JztcbmltcG9ydCB7IGluc3RhbGxHdWFyZHMsIHVuaW5zdGFsbEd1YXJkcywgZ3VhcmRzSW5mbyB9IGZyb20gJy4vZ3VhcmRzJztcbmltcG9ydCB7IHBhbmVsU3RhdGUsIG1heWJlQnJvYWRjYXN0LCBzZXRDb250ZXh0LCBzZXRUb29sLCB1cGRhdGVUYXJnZXRzIH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7IGV2ZW50Q29vcmRNb2RlLCByZW1vdmVPdmVybGF5LCBzY2VuZUNhbWVyYSB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge1xuICAgIGRlbGV0ZVNlbGVjdGlvbiwgc2V0TW9kZVNlbGVjdGVkLCBjeWNsZU1vZGVTZWxlY3RlZCwgbGlua1NlbGVjdGVkLCB1bmxpbmtTZWxlY3RlZCwgc3BsaXRTZWxlY3RlZCwgam9pblNlbGVjdGVkLFxuICAgIHJldmVyc2VTZWxlY3RlZCwgc2V0Q2xvc2VkU2VsZWN0ZWQsIHNlbGVjdEFsbCwgY2xlYXJTZWxlY3Rpb24sIHNldEVsZW1lbnRQcm9wcywgY29udGFpbmVySW5mbywgZWRpdEtub3QsIHNwbGluZUFjdGlvbixcbiAgICBjcmVhdGVTcGxpbmVOb2RlLCBFbGVtZW50UHJvcHMsXG59IGZyb20gJy4vb3BzJztcbmltcG9ydCB7IHJlY29yZEVkaXQsIGFmdGVyRWRpdCB9IGZyb20gJy4vdW5kbyc7XG5cbmNvbnN0IFBLRyA9ICdzcGxpbmVzJztcblxubGV0IGhvb2tlZCA9IGZhbHNlO1xubGV0IG9wSG9va2VkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG9uQmVmb3JlQ29tbWl0KCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICAgIGRyYXdGcmFtZSgpO1xuICAgICAgICBtYXliZUJyb2FkY2FzdCgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbm90ZShgZHJhdzogJHsoZSBhcyBFcnJvcik/LnN0YWNrIHx8IGV9YCk7XG4gICAgfVxufVxuXG5jb25zdCBsaXN0ZW5lcnM6IFtzdHJpbmcsIChldjogYW55KSA9PiBib29sZWFuXVtdID0gW1xuICAgIFsnbW91c2Vkb3duJywgb25Nb3VzZURvd25dLFxuICAgIFsnbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmVdLFxuICAgIFsnbW91c2V1cCcsIG9uTW91c2VVcF0sXG4gICAgWydkYmxjbGljaycsIG9uRGJsQ2xpY2tdLFxuICAgIFsna2V5ZG93bicsIG9uS2V5RG93bl0sXG4gICAgWydrZXl1cCcsIG9uS2V5VXBdLFxuXTtcblxuZnVuY3Rpb24gaG9vaygpOiB2b2lkIHtcbiAgICBpZiAoIWhvb2tlZCkge1xuICAgICAgICBjb25zdCB7IGRpcmVjdG9yLCBEaXJlY3RvciB9ID0gY2MoKTtcbiAgICAgICAgZGlyZWN0b3Iub24oRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0NPTU1JVCwgb25CZWZvcmVDb21taXQpO1xuICAgICAgICBob29rZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoIW9wSG9va2VkKSB7XG4gICAgICAgIGNvbnN0IG9wID0gY2NlKCkuT3BlcmF0aW9uO1xuICAgICAgICBpZiAob3A/LmFkZExpc3RlbmVyKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFt0eXBlLCBmbl0gb2YgbGlzdGVuZXJzKSBvcC5hZGRMaXN0ZW5lcih0eXBlLCBmbiwgUFJJT1JJVFkpO1xuICAgICAgICAgICAgb3BIb29rZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluc3RhbGxHdWFyZHMoKTtcbiAgICBTLmhvb2tlZCA9IGhvb2tlZCAmJiBvcEhvb2tlZDtcbn1cblxuZnVuY3Rpb24gdW5ob29rKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChob29rZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGlyZWN0b3IsIERpcmVjdG9yIH0gPSBjYygpO1xuICAgICAgICAgICAgZGlyZWN0b3Iub2ZmKERpcmVjdG9yLkVWRU5UX0JFRk9SRV9DT01NSVQsIG9uQmVmb3JlQ29tbWl0KTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBlZGl0b3Igc2h1dHRpbmcgZG93blxuICAgIH1cbiAgICBob29rZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBvcCA9IGNjZSgpLk9wZXJhdGlvbjtcbiAgICAgICAgaWYgKG9wSG9va2VkICYmIG9wPy5yZW1vdmVMaXN0ZW5lcikgZm9yIChjb25zdCBbdHlwZSwgZm5dIG9mIGxpc3RlbmVycykgb3AucmVtb3ZlTGlzdGVuZXIodHlwZSwgZm4pO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBlZGl0b3Igc2h1dHRpbmcgZG93blxuICAgIH1cbiAgICBvcEhvb2tlZCA9IGZhbHNlO1xuICAgIHVuaW5zdGFsbEd1YXJkcygpO1xufVxuXG5mdW5jdGlvbiBtYXJrUHJpbWFyeSgpOiB2b2lkIHtcbiAgICBpZiAoIVMucHJpbWFyeSkge1xuICAgICAgICBTLnByaW1hcnkgPSB0cnVlO1xuICAgICAgICBidW1wU3RhdGUoKTtcbiAgICB9XG4gICAgaG9vaygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2F2ZWQgPSBhd2FpdCBFZGl0b3IuUHJvZmlsZS5nZXRDb25maWcoUEtHLCAnc2V0dGluZ3MnKTtcbiAgICAgICAgaWYgKHNhdmVkICYmIHR5cGVvZiBzYXZlZCA9PT0gJ29iamVjdCcpIFMuc2V0dGluZ3MgPSB7IC4uLkRFRkFVTFRfU0VUVElOR1MsIC4uLnNhdmVkIH07XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIGRlZmF1bHRzXG4gICAgfVxuICAgIHJlcGFpbnQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IEVkaXRvci5Qcm9maWxlLnNldENvbmZpZyhQS0csICdzZXR0aW5ncycsIHsgLi4uUy5zZXR0aW5ncyB9LCAnZ2xvYmFsJyk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIG5vdCBwZXJzaXN0ZWRcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGJyb2FkY2FzdE5vdygpOiBhbnkge1xuICAgIHVwZGF0ZVRhcmdldHMoKTtcbiAgICBtYXliZUJyb2FkY2FzdCh0cnVlKTtcbiAgICByZXBhaW50KCk7XG4gICAgcmV0dXJuIHBhbmVsU3RhdGUoKTtcbn1cblxuZXhwb3J0IGNvbnN0IG1ldGhvZHM6IFJlY29yZDxzdHJpbmcsICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PiA9IHtcbiAgICAvKiogUGFuZWwgLyBJbnNwZWN0b3IgaGFuZHNoYWtlOiBtYXJrcyB0aGlzIHByb2Nlc3MgYXMgdGhlIGVkaXQgc2NlbmUuICovXG4gICAgc3BIZWxsbygpIHtcbiAgICAgICAgbWFya1ByaW1hcnkoKTtcbiAgICAgICAgcmV0dXJuIGJyb2FkY2FzdE5vdygpO1xuICAgIH0sXG5cbiAgICBzcFByaW1hcnkoKSB7XG4gICAgICAgIG1hcmtQcmltYXJ5KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBzcFN0YXRlKCkge1xuICAgICAgICB1cGRhdGVUYXJnZXRzKCk7XG4gICAgICAgIHJldHVybiBwYW5lbFN0YXRlKCk7XG4gICAgfSxcblxuICAgIHNwU2V0Q29udGV4dChvbjogYm9vbGVhbikge1xuICAgICAgICBtYXJrUHJpbWFyeSgpO1xuICAgICAgICB1cGRhdGVUYXJnZXRzKCk7XG4gICAgICAgIGlmIChvbiAmJiAhUy5sYXN0VGFyZ2V0cy5sZW5ndGgpIHJldHVybiBwYW5lbFN0YXRlKCk7XG4gICAgICAgIHNldENvbnRleHQoISFvbik7XG4gICAgICAgIHJldHVybiBicm9hZGNhc3ROb3coKTtcbiAgICB9LFxuXG4gICAgc3BTZXRUb29sKHRvb2w6ICdzZWxlY3QnIHwgJ2RyYXcnKSB7XG4gICAgICAgIG1hcmtQcmltYXJ5KCk7XG4gICAgICAgIHVwZGF0ZVRhcmdldHMoKTtcbiAgICAgICAgaWYgKCFTLmxhc3RUYXJnZXRzLmxlbmd0aCkgcmV0dXJuIHBhbmVsU3RhdGUoKTtcbiAgICAgICAgc2V0VG9vbCh0b29sID09PSAnZHJhdycgPyAnZHJhdycgOiAnc2VsZWN0Jyk7XG4gICAgICAgIGlmICh0b29sID09PSAnZHJhdycpIFMuZHJhd2luZyA9IG51bGw7XG4gICAgICAgIHJldHVybiBicm9hZGNhc3ROb3coKTtcbiAgICB9LFxuXG4gICAgc3BTZXRTZXR0aW5nKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICghKGtleSBpbiBTLnNldHRpbmdzKSkgcmV0dXJuIHBhbmVsU3RhdGUoKTtcbiAgICAgICAgKFMuc2V0dGluZ3MgYXMgYW55KVtrZXldID0gdmFsdWU7XG4gICAgICAgIHNhdmVTZXR0aW5ncygpO1xuICAgICAgICByZXR1cm4gYnJvYWRjYXN0Tm93KCk7XG4gICAgfSxcblxuICAgIGFzeW5jIHNwU2V0RWxlbWVudChwcm9wczogRWxlbWVudFByb3BzKSB7XG4gICAgICAgIG1hcmtQcmltYXJ5KCk7XG4gICAgICAgIGF3YWl0IHNldEVsZW1lbnRQcm9wcyhwcm9wcyB8fCB7fSk7XG4gICAgICAgIHJldHVybiBicm9hZGNhc3ROb3coKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgc3BBY3Rpb24obmFtZTogc3RyaW5nLCBhcmc/OiBhbnkpIHtcbiAgICAgICAgbWFya1ByaW1hcnkoKTtcbiAgICAgICAgdXBkYXRlVGFyZ2V0cygpO1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6IGF3YWl0IGRlbGV0ZVNlbGVjdGlvbigpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vZGUnOiBhd2FpdCBzZXRNb2RlU2VsZWN0ZWQoTnVtYmVyKGFyZykpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2N5Y2xlTW9kZSc6IGF3YWl0IGN5Y2xlTW9kZVNlbGVjdGVkKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGluayc6IGF3YWl0IGxpbmtTZWxlY3RlZCgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3VubGluayc6IGF3YWl0IHVubGlua1NlbGVjdGVkKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc3BsaXQnOiBhd2FpdCBzcGxpdFNlbGVjdGVkKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnam9pbic6IGF3YWl0IGpvaW5TZWxlY3RlZCgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JldmVyc2UnOiBhd2FpdCByZXZlcnNlU2VsZWN0ZWQoKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjbG9zZSc6IGF3YWl0IHNldENsb3NlZFNlbGVjdGVkKGFyZyA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogISFhcmcpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NlbGVjdEFsbCc6IHNlbGVjdEFsbCgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NsZWFyU2VsZWN0aW9uJzogY2xlYXJTZWxlY3Rpb24oKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmaW5pc2hEcmF3aW5nJzogUy5kcmF3aW5nID0gbnVsbDsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJyb2FkY2FzdE5vdygpO1xuICAgIH0sXG5cbiAgICBhc3luYyBzcENyZWF0ZShraW5kOiBzdHJpbmcpIHtcbiAgICAgICAgbWFya1ByaW1hcnkoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBjcmVhdGVTcGxpbmVOb2RlKGtpbmQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBub3RlKGBjcmVhdGU6ICR7KGUgYXMgRXJyb3IpPy5zdGFjayB8fCBlfWApO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignW1NwbGluZXNdIENvdWxkIG5vdCBjcmVhdGUgdGhlIHNwbGluZTonLCBlKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKiBJbnNwZWN0b3I6IGRhdGEgb2Ygb25lIFNwbGluZUNvbnRhaW5lci4gKi9cbiAgICBzcENvbnRhaW5lckluZm8oY29tcFV1aWQ6IHN0cmluZykge1xuICAgICAgICBtYXJrUHJpbWFyeSgpO1xuICAgICAgICB1cGRhdGVUYXJnZXRzKCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXJJbmZvKGNvbXBVdWlkKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgc3BFZGl0S25vdChjb21wVXVpZDogc3RyaW5nLCBzcGxpbmU6IG51bWJlciwga25vdDogbnVtYmVyLCBwcm9wczogRWxlbWVudFByb3BzKSB7XG4gICAgICAgIG1hcmtQcmltYXJ5KCk7XG4gICAgICAgIGF3YWl0IGVkaXRLbm90KGNvbXBVdWlkLCBzcGxpbmUsIGtub3QsIHByb3BzIHx8IHt9KTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckluZm8oY29tcFV1aWQpO1xuICAgIH0sXG5cbiAgICBhc3luYyBzcFNwbGluZUFjdGlvbihjb21wVXVpZDogc3RyaW5nLCBzcGxpbmU6IG51bWJlciwgYWN0aW9uOiBzdHJpbmcsIGFyZz86IGFueSkge1xuICAgICAgICBtYXJrUHJpbWFyeSgpO1xuICAgICAgICB1cGRhdGVUYXJnZXRzKCk7XG4gICAgICAgIHJldHVybiBzcGxpbmVBY3Rpb24oY29tcFV1aWQsIHNwbGluZSwgYWN0aW9uLCBhcmcpO1xuICAgIH0sXG5cbiAgICAvKiogSW5zcGVjdG9yOiB0dXJucyBTcGxpbmVJbnN0YW50aWF0ZSdzIGdlbmVyYXRlZCBpbnN0YW5jZXMgaW50byByZWd1bGFyIG5vZGVzLiAqL1xuICAgIGFzeW5jIHNwQmFrZUluc3RhbmNlcyhjb21wVXVpZDogc3RyaW5nKSB7XG4gICAgICAgIG1hcmtQcmltYXJ5KCk7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBmaW5kQ29tcG9uZW50KGNvbXBVdWlkKTtcbiAgICAgICAgaWYgKCFjb21wIHx8IHR5cGVvZiBjb21wLl9iYWtlSW5mbyAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHsgY291bnQ6IDAgfTtcbiAgICAgICAgY29uc3QgaW5mbzogeyBwcmVmYWI6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcltdOyByb3RhdGlvbjogbnVtYmVyW107IHNjYWxlOiBudW1iZXJbXSB9W10gPSBjb21wLl9iYWtlSW5mbygpO1xuICAgICAgICBpZiAoIWluZm8ubGVuZ3RoKSByZXR1cm4geyBjb3VudDogMCB9O1xuICAgICAgICBjb25zdCBwYXJlbnQgPSAoYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnY3JlYXRlLW5vZGUnLCB7XG4gICAgICAgICAgICBwYXJlbnQ6IGNvbXAubm9kZS51dWlkLFxuICAgICAgICAgICAgbmFtZTogYCR7Y29tcC5ub2RlLm5hbWV9IEluc3RhbmNlc2AsXG4gICAgICAgIH0gYXMgYW55KSkgYXMgdW5rbm93biBhcyBzdHJpbmc7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgcCBvZiBpbmZvKSB7XG4gICAgICAgICAgICBjb25zdCB1dWlkID0gKGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2NyZWF0ZS1ub2RlJywgeyBwYXJlbnQsIGFzc2V0VXVpZDogcC5wcmVmYWIgfSBhcyBhbnkpKSBhcyB1bmtub3duIGFzIHN0cmluZztcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgPyBmaW5kTm9kZSh1dWlkKSA6IG51bGw7XG4gICAgICAgICAgICBpZiAoIW5vZGUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgbm9kZS5zZXRXb3JsZFBvc2l0aW9uKHAucG9zaXRpb25bMF0sIHAucG9zaXRpb25bMV0sIHAucG9zaXRpb25bMl0pO1xuICAgICAgICAgICAgbm9kZS5zZXRXb3JsZFJvdGF0aW9uKHAucm90YXRpb25bMF0sIHAucm90YXRpb25bMV0sIHAucm90YXRpb25bMl0sIHAucm90YXRpb25bM10pO1xuICAgICAgICAgICAgbm9kZS5zZXRTY2FsZShwLnNjYWxlWzBdLCBwLnNjYWxlWzFdLCBwLnNjYWxlWzJdKTtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU3RvcCBnZW5lcmF0aW5nOiB0aGUgYmFrZWQgbm9kZXMgcmVwbGFjZSB0aGUgaW5zdGFuY2VzLlxuICAgICAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4ge1xuICAgICAgICAgICAgY29tcC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBhZnRlckVkaXQoW2NvbXBdKTtcbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGZpbmROb2RlKHBhcmVudCk7XG4gICAgICAgIGlmIChwYXJlbnROb2RlKSBjY2UoKS5FbmdpbmU/LnJlcGFpbnRJbkVkaXRNb2RlPy4oKTtcbiAgICAgICAgcmV0dXJuIHsgY291bnQgfTtcbiAgICB9LFxuXG4gICAgc3BEaWFnbm9zdGljcygpIHtcbiAgICAgICAgY29uc3QgY2FtID0gc2NlbmVDYW1lcmEoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByaW1hcnk6IFMucHJpbWFyeSxcbiAgICAgICAgICAgIGhvb2tlZDogUy5ob29rZWQsXG4gICAgICAgICAgICBydW50aW1lUmVhZHk6IHJ1bnRpbWVSZWFkeSgpLFxuICAgICAgICAgICAgY29udGV4dDogUy5jb250ZXh0LFxuICAgICAgICAgICAgdG9vbDogUy50b29sLFxuICAgICAgICAgICAgc2V0dGluZ3M6IFMuc2V0dGluZ3MsXG4gICAgICAgICAgICBzZWxlY3Rpb246IFMuc2VsZWN0aW9uLmFsbCgpLm1hcCgoZSkgPT4gYCR7ZS5jb21wLm5vZGU/Lm5hbWV9OiR7ZS5zcGxpbmV9OiR7ZS5rbm90fToke2UucGFydH1gKSxcbiAgICAgICAgICAgIHRhcmdldHM6IFMubGFzdFRhcmdldHMubWFwKChjKSA9PiBjLm5vZGU/Lm5hbWUpLFxuICAgICAgICAgICAgY29udGFpbmVyczogYWxsQ29udGFpbmVycygpLm1hcCgoYykgPT4gYCR7Yy5ub2RlPy5uYW1lfSAoJHtjLnNwbGluZXMubGVuZ3RofSBzcGxpbmVzKWApLFxuICAgICAgICAgICAgY2FtZXJhOiBjYW0gPyB7IG5hbWU6IGNhbS5uYW1lLCB3aWR0aDogY2FtLndpZHRoLCBoZWlnaHQ6IGNhbS5oZWlnaHQsIHByb2plY3Rpb246IGNhbS5wcm9qZWN0aW9uVHlwZSB9IDogbnVsbCxcbiAgICAgICAgICAgIGV2ZW50Q29vcmRzOiBldmVudENvb3JkTW9kZSgpLFxuICAgICAgICAgICAgb3BlcmF0aW9uOiAhIWNjZSgpLk9wZXJhdGlvbj8uYWRkTGlzdGVuZXIsXG4gICAgICAgICAgICBndWFyZHM6IGd1YXJkc0luZm8oKSxcbiAgICAgICAgICAgIGdpem1vOiB7XG4gICAgICAgICAgICAgICAgdG9vbDogY2NlKCkuR2l6bW8/LnRyYW5zZm9ybVRvb2xOYW1lLFxuICAgICAgICAgICAgICAgIHBpdm90OiBjY2UoKS5HaXptbz8ucGl2b3QsXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZTogY2NlKCkuR2l6bW8/LmNvb3JkaW5hdGUsXG4gICAgICAgICAgICAgICAgaXMyRDogY2NlKCkuR2l6bW8/LmlzMkQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlhZzogUy5kaWFnLFxuICAgICAgICAgICAgdXJsOiB0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnID8gbG9jYXRpb24uaHJlZiA6ICcnLFxuICAgICAgICB9O1xuICAgIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZCgpOiB2b2lkIHtcbiAgICBsb2FkU2V0dGluZ3MoKTtcbiAgICAvLyBUaGUgZW5naW5lIGFuZCB0aGUgZWRpdG9yIG1hbmFnZXJzIG1heSBub3QgYmUgcmVhZHkgeWV0OyByZXRyeS5cbiAgICBjb25zdCB0cnlIb29rID0gKG46IG51bWJlcikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaG9vaygpO1xuICAgICAgICAgICAgaWYgKFMuaG9va2VkKSByZXR1cm47XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgLy8gcmV0cnlcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA+IDApIHNldFRpbWVvdXQoKCkgPT4gdHJ5SG9vayhuIC0gMSksIDEwMDApO1xuICAgIH07XG4gICAgdHJ5SG9vaygzMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmxvYWQoKTogdm9pZCB7XG4gICAgY2FuY2VsQWN0aXZlKCk7XG4gICAgdW5ob29rKCk7XG4gICAgcmVtb3ZlT3ZlcmxheSgpO1xuICAgIHNldENvbnRleHQoZmFsc2UpO1xufVxuIiwgIi8qKlxuICogVGhlIHNjZW5lIHNjcmlwdCBhZ2FpbnN0IGEgZmFrZSBlZGl0b3I6IGRyYXdpbmcsIHBpY2tpbmcsIGRyYWdnaW5nLCB0aGVcbiAqIERyYXcgdG9vbCwga2V5Ym9hcmQsIHVuZG8gcmVjb3JkaW5ncyBhbmQgdGhlIHBhbmVsIC8gSW5zcGVjdG9yIG1ldGhvZHMuXG4gKi9cbmltcG9ydCB7IGxvZywgc2NlbmUsIGNjZSwgY2MsIHNjcmVlbiwgc2VsZWN0Tm9kZXMsIGdlb21ldHJ5LCBzZXRTY2VuZU1ldGhvZHMsIGRvbUtleSwgZmluZE5vZGUgfSBmcm9tICcuL3N0dWJzL2VkaXRvcic7XG5pbXBvcnQgJy4uL2Fzc2V0cy9pbmRleCc7XG5pbXBvcnQgeyBTcGxpbmVDb250YWluZXIgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9TcGxpbmVDb250YWluZXInO1xuaW1wb3J0IHsgVGFuZ2VudE1vZGUgfSBmcm9tICcuLi9hc3NldHMvcnVudGltZS9CZXppZXJLbm90JztcbmltcG9ydCB7IG1ldGhvZHMsIGxvYWQgfSBmcm9tICcuLi9zb3VyY2Uvc2NlbmUvaW5kZXgnO1xuaW1wb3J0IHsgUyB9IGZyb20gJy4uL3NvdXJjZS9zY2VuZS9zdGF0ZSc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyByZXN1bHRzIH0gZnJvbSAnLi9oYXJuZXNzJztcblxuc2V0U2NlbmVNZXRob2RzKG1ldGhvZHMpO1xuXG5jb25zdCB0ZXN0czogeyBuYW1lOiBzdHJpbmc7IGZuOiAoKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZCB9W10gPSBbXTtcbmZ1bmN0aW9uIHRlc3QobmFtZTogc3RyaW5nLCBmbjogKCkgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWQpIHtcbiAgICB0ZXN0cy5wdXNoKHsgbmFtZSwgZm4gfSk7XG59XG5cbmNvbnN0IGZsdXNoID0gKCkgPT4gbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgMCkpO1xuY29uc3QgdGljayA9ICgpID0+IChjYy5kaXJlY3RvciBhcyBhbnkpLnRpY2soKTtcblxuZnVuY3Rpb24gbmVhcihhOiBudW1iZXIsIGI6IG51bWJlciwgZXBzOiBudW1iZXIsIG1zZyA9ICcnKSB7XG4gICAgYXNzZXJ0Lm9rKE1hdGguYWJzKGEgLSBiKSA8PSBlcHMsIGAke21zZ30gJHthfSAhPSAke2J9IChcdTAwQjEke2Vwc30pYCk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlKHR5cGU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIG1vZHM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fSkge1xuICAgIHJldHVybiBjY2UuT3BlcmF0aW9uLmVtaXQodHlwZSwgeyB4LCB5LCBidXR0b246IDAsIGxlZnRCdXR0b246IHRydWUsIC4uLm1vZHMgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsaWNrKHg6IG51bWJlciwgeTogbnVtYmVyLCBtb2RzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge30pIHtcbiAgICBtb3VzZSgnbW91c2Vkb3duJywgeCwgeSwgbW9kcyk7XG4gICAgYXdhaXQgZmx1c2goKTtcbiAgICBtb3VzZSgnbW91c2V1cCcsIHgsIHksIG1vZHMpO1xuICAgIGF3YWl0IGZsdXNoKCk7XG4gICAgdGljaygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkcmFnKGZyb206IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSwgdG86IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSwgbW9kczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9KSB7XG4gICAgbW91c2UoJ21vdXNlZG93bicsIGZyb20ueCwgZnJvbS55LCBtb2RzKTtcbiAgICBhd2FpdCBmbHVzaCgpO1xuICAgIGNvbnN0IHN0ZXBzID0gNTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBzdGVwczsgaSsrKSB7XG4gICAgICAgIG1vdXNlKCdtb3VzZW1vdmUnLCBmcm9tLnggKyAoKHRvLnggLSBmcm9tLngpICogaSkgLyBzdGVwcywgZnJvbS55ICsgKCh0by55IC0gZnJvbS55KSAqIGkpIC8gc3RlcHMsIG1vZHMpO1xuICAgICAgICBhd2FpdCBmbHVzaCgpO1xuICAgIH1cbiAgICBtb3VzZSgnbW91c2V1cCcsIHRvLngsIHRvLnksIG1vZHMpO1xuICAgIGF3YWl0IGZsdXNoKCk7XG4gICAgYXdhaXQgZmx1c2goKTtcbiAgICB0aWNrKCk7XG59XG5cbmZ1bmN0aW9uIGtleShrOiBzdHJpbmcsIG1vZHM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fSkge1xuICAgIHJldHVybiBjY2UuT3BlcmF0aW9uLmVtaXQoJ2tleWRvd24nLCB7IGtleTogaywgLi4ubW9kcyB9KTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNldHVwXG5cbmNvbnN0IG5vZGUgPSBuZXcgY2MuTm9kZSgnUGF0aCcpO1xubm9kZS5zZXRQYXJlbnQoc2NlbmUpO1xuY29uc3QgY29tcCA9IG5vZGUuYWRkQ29tcG9uZW50KFNwbGluZUNvbnRhaW5lcikgYXMgU3BsaW5lQ29udGFpbmVyO1xuZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgY29uc3QgcyA9IGNvbXAuc3BsaW5lc1swXTtcbiAgICBzLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgY29tcC5zcGxpbmVzLmxlbmd0aCA9IDE7XG4gICAgY29tcC5saW5rcy5sZW5ndGggPSAwO1xuICAgIHMuY2xvc2VkID0gZmFsc2U7XG4gICAgcy5hZGQobmV3IGNjLlZlYzMoMCwgMCwgMCkgYXMgYW55KTtcbiAgICBzLmFkZChuZXcgY2MuVmVjMyg1LCAwLCAwKSBhcyBhbnkpO1xuICAgIHMuYWRkKG5ldyBjYy5WZWMzKDEwLCAwLCA1KSBhcyBhbnkpO1xuICAgIFMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgUy5jb250ZXh0ID0gZmFsc2U7XG4gICAgUy50b29sID0gJ3NlbGVjdCc7XG4gICAgUy5kcmF3aW5nID0gbnVsbDtcbiAgICBzZWxlY3ROb2Rlcyhbbm9kZS51dWlkXSk7XG4gICAgbG9nLmVkaXRvckV2ZW50cy5sZW5ndGggPSAwO1xuICAgIGxvZy5yZW1vdmVkLmxlbmd0aCA9IDA7XG4gICAgdGljaygpO1xufVxuXG5sb2FkKCk7XG5tZXRob2RzLnNwUHJpbWFyeSgpO1xuXG5jb25zdCBrbm90U2NyZWVuID0gKHM6IG51bWJlciwgazogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgcCA9IGNvbXAuZ2V0S25vdFdvcmxkUG9zaXRpb24oeyBzcGxpbmU6IHMsIGtub3Q6IGsgfSk7XG4gICAgcmV0dXJuIHNjcmVlbihwLngsIHAueSwgcC56KTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB0ZXN0c1xuXG50ZXN0KCdob29rcyBpbnRvIHRoZSBlZGl0b3IgYW5kIGRyYXdzIHRoZSBzZWxlY3RlZCBzcGxpbmUnLCAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBhc3NlcnQub2soUy5ob29rZWQsICdob29rZWQnKTtcbiAgICBnZW9tZXRyeS5yZXNldCgpO1xuICAgIHRpY2soKTtcbiAgICBhc3NlcnQub2soZ2VvbWV0cnkubGluZXMgPiAyMCwgYGxpbmVzIGRyYXduOiAke2dlb21ldHJ5LmxpbmVzfWApO1xuICAgIGFzc2VydC5vayhnZW9tZXRyeS50cmlhbmdsZXMgPiAwLCAna25vdHMgZHJhd24nKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFMubGFzdFRhcmdldHMsIFtjb21wXSk7XG59KTtcblxudGVzdCgnY2xpY2tpbmcgYSBrbm90IGVudGVycyB0aGUgZWRpdCBjb250ZXh0IGFuZCBzZWxlY3RzIGl0OyB0aGUgZWRpdG9yIG5ldmVyIHNlZXMgdGhlIGNsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgY29uc3QgcCA9IGtub3RTY3JlZW4oMCwgMSk7XG4gICAgYXdhaXQgY2xpY2socC54LCBwLnkpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChTLmNvbnRleHQsIHRydWUpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoUy5zZWxlY3Rpb24uYWxsKCkubWFwKChlKSA9PiBbZS5rbm90LCBlLnBhcnRdKSwgW1sxLCAna25vdCddXSk7XG4gICAgYXNzZXJ0Lm9rKCFsb2cuZWRpdG9yRXZlbnRzLmluY2x1ZGVzKCdtb3VzZWRvd24nKSwgJ2Jsb2NrZWQnKTtcbn0pO1xuXG50ZXN0KCdvdXRzaWRlIHRoZSBjb250ZXh0LCBjbGlja3Mgb24gZW1wdHkgc3BhY2UgZ28gdG8gdGhlIGVkaXRvcicsIGFzeW5jICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGF3YWl0IGNsaWNrKHNjcmVlbigyMCwgMCwgMjApLngsIHNjcmVlbigyMCwgMCwgMjApLnkpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChTLmNvbnRleHQsIGZhbHNlKTtcbiAgICBhc3NlcnQub2sobG9nLmVkaXRvckV2ZW50cy5pbmNsdWRlcygnbW91c2Vkb3duJykgJiYgbG9nLmVkaXRvckV2ZW50cy5pbmNsdWRlcygnbW91c2V1cCcpKTtcbn0pO1xuXG50ZXN0KCdkcmFnZ2luZyBhIGtub3QgbW92ZXMgaXQgKG9uZSB1bmRvIHN0ZXApJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgY29uc3QgYmVmb3JlID0gbG9nLnJlcXVlc3RzLmZpbHRlcigocikgPT4gci5tc2cgPT09ICdiZWdpbi1yZWNvcmRpbmcnKS5sZW5ndGg7XG4gICAgYXdhaXQgZHJhZyhrbm90U2NyZWVuKDAsIDEpLCBzY3JlZW4oNSwgMCwgMykpO1xuICAgIGNvbnN0IGsgPSBjb21wLnNwbGluZXNbMF0ua25vdHNbMV07XG4gICAgbmVhcihrLnBvc2l0aW9uLngsIDUsIDAuMDUpO1xuICAgIG5lYXIoay5wb3NpdGlvbi56LCAzLCAwLjA1KTtcbiAgICBjb25zdCBiZWdpbnMgPSBsb2cucmVxdWVzdHMuZmlsdGVyKChyKSA9PiByLm1zZyA9PT0gJ2JlZ2luLXJlY29yZGluZycpLmxlbmd0aCAtIGJlZm9yZTtcbiAgICBjb25zdCBlbmRzID0gbG9nLnJlcXVlc3RzLmZpbHRlcigocikgPT4gci5tc2cgPT09ICdlbmQtcmVjb3JkaW5nJykubGVuZ3RoO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiZWdpbnMsIDEpO1xuICAgIGFzc2VydC5vayhlbmRzID49IDEpO1xuICAgIGFzc2VydC5vayhsb2cuY2hhbmdlcy5zb21lKChjKSA9PiBjLmVuZHNXaXRoKG5vZGUudXVpZCkpLCAnZWRpdG9yIG5vdGlmaWVkJyk7XG59KTtcblxudGVzdCgnZW1wdHkgY2xpY2sgY2xlYXJzIHRoZSBrbm90IHNlbGVjdGlvbiBmaXJzdCwgdGhlbiByZWFjaGVzIHRoZSBlZGl0b3InLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBhd2FpdCBjbGljayhrbm90U2NyZWVuKDAsIDApLngsIGtub3RTY3JlZW4oMCwgMCkueSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuc2VsZWN0aW9uLnNpemUsIDEpO1xuICAgIGxvZy5lZGl0b3JFdmVudHMubGVuZ3RoID0gMDtcbiAgICBjb25zdCBlbXB0eSA9IHNjcmVlbigtMTAsIDAsIC0xMCk7XG4gICAgYXdhaXQgY2xpY2soZW1wdHkueCwgZW1wdHkueSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuc2VsZWN0aW9uLnNpemUsIDApO1xuICAgIGFzc2VydC5vayghbG9nLmVkaXRvckV2ZW50cy5pbmNsdWRlcygnbW91c2Vkb3duJyksICdmaXJzdCBjbGljayBvbmx5IGNsZWFycycpO1xuICAgIGF3YWl0IGNsaWNrKGVtcHR5LngsIGVtcHR5LnkpO1xuICAgIGFzc2VydC5vayhsb2cuZWRpdG9yRXZlbnRzLmluY2x1ZGVzKCdtb3VzZWRvd24nKSAmJiBsb2cuZWRpdG9yRXZlbnRzLmluY2x1ZGVzKCdtb3VzZXVwJyksICdzZWNvbmQgY2xpY2sgcmVwbGF5ZWQnKTtcbn0pO1xuXG50ZXN0KCdyZWN0YW5nbGUgc2VsZWN0aW9uIGluIHRoZSBjb250ZXh0JywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgUy5jb250ZXh0ID0gdHJ1ZTtcbiAgICBhd2FpdCBkcmFnKHNjcmVlbigtMSwgMCwgLTEpLCBzY3JlZW4oNiwgMCwgMSkpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoUy5zZWxlY3Rpb24ua25vdHMoKS5tYXAoKGUpID0+IGUua25vdCkuc29ydCgpLCBbMCwgMV0pO1xufSk7XG5cbnRlc3QoJ3NoaWZ0K2NsaWNrIGFkZHMgdG8gdGhlIHNlbGVjdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGF3YWl0IGNsaWNrKGtub3RTY3JlZW4oMCwgMCkueCwga25vdFNjcmVlbigwLCAwKS55KTtcbiAgICBhd2FpdCBjbGljayhrbm90U2NyZWVuKDAsIDIpLngsIGtub3RTY3JlZW4oMCwgMikueSwgeyBzaGlmdEtleTogdHJ1ZSB9KTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFMuc2VsZWN0aW9uLmtub3RzKCkubWFwKChlKSA9PiBlLmtub3QpLnNvcnQoKSwgWzAsIDJdKTtcbn0pO1xuXG50ZXN0KCdtb3ZlIGhhbmRsZTogZHJhZ2dpbmcgdGhlIFggYXhpcyBtb3ZlcyB0aGUgc2VsZWN0ZWQga25vdCBhbG9uZyBYIG9ubHknLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBhd2FpdCBjbGljayhrbm90U2NyZWVuKDAsIDIpLngsIGtub3RTY3JlZW4oMCwgMikueSk7XG4gICAgY29uc3QgcGl2b3QgPSBrbm90U2NyZWVuKDAsIDIpO1xuICAgIC8vIEdyYWIgdGhlIFggYXJyb3cgaGFsZndheSBhbG9uZyAoOTAgcHggbG9uZyksIG1vdmUgNDAgcHggcmlnaHQgYW5kIHNvbWUgcHggdXAuXG4gICAgY29uc3QgZnJvbSA9IHsgeDogcGl2b3QueCArIDQ1LCB5OiBwaXZvdC55IH07XG4gICAgYXdhaXQgZHJhZyhmcm9tLCB7IHg6IGZyb20ueCArIDQwLCB5OiBmcm9tLnkgKyAzMCB9KTtcbiAgICBjb25zdCBrID0gY29tcC5zcGxpbmVzWzBdLmtub3RzWzJdO1xuICAgIG5lYXIoay5wb3NpdGlvbi54LCAxMiwgMC4wNSk7XG4gICAgbmVhcihrLnBvc2l0aW9uLnosIDUsIDFlLTYpO1xufSk7XG5cbnRlc3QoJ3JvdGF0ZSB0b29sIHR1cm5zIGEgQmV6aWVyIGtub3QnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBjb21wLnNwbGluZXNbMF0uc2V0VGFuZ2VudE1vZGUoMSwgVGFuZ2VudE1vZGUuTWlycm9yZWQpO1xuICAgIGF3YWl0IGNsaWNrKGtub3RTY3JlZW4oMCwgMSkueCwga25vdFNjcmVlbigwLCAxKS55KTtcbiAgICBjY2UuR2l6bW8udHJhbnNmb3JtVG9vbE5hbWUgPSAncm90YXRpb24nO1xuICAgIHRpY2soKTtcbiAgICBjb25zdCBiZWZvcmUgPSBjb21wLnNwbGluZXNbMF0ua25vdHNbMV0ucm90YXRpb24uY2xvbmUoKTtcbiAgICBjb25zdCBwaXZvdCA9IGtub3RTY3JlZW4oMCwgMSk7XG4gICAgLy8gVGhlIHZpZXcgcmluZyAoMS4xNSB4IDkwIHB4KSBpcyBlYXN5IHRvIGdyYWIgZnJvbSBzdHJhaWdodCBhYm92ZS5cbiAgICBhd2FpdCBkcmFnKHsgeDogcGl2b3QueCArIDEwMywgeTogcGl2b3QueSB9LCB7IHg6IHBpdm90LngsIHk6IHBpdm90LnkgKyAxMDMgfSk7XG4gICAgY2NlLkdpem1vLnRyYW5zZm9ybVRvb2xOYW1lID0gJ3Bvc2l0aW9uJztcbiAgICBjb25zdCBhZnRlciA9IGNvbXAuc3BsaW5lc1swXS5rbm90c1sxXS5yb3RhdGlvbjtcbiAgICBjb25zdCBkID0gTWF0aC5hYnMoYmVmb3JlLnggKiBhZnRlci54ICsgYmVmb3JlLnkgKiBhZnRlci55ICsgYmVmb3JlLnogKiBhZnRlci56ICsgYmVmb3JlLncgKiBhZnRlci53KTtcbiAgICBhc3NlcnQub2soZCA8IDAuOSwgYHJvdGF0ZWQgKGRvdCAke2R9KWApO1xufSk7XG5cbnRlc3QoJ2RvdWJsZS1jbGljayBvbiBhIGN1cnZlIGluc2VydHMgYSBrbm90IHdpdGhvdXQgY2hhbmdpbmcgdGhlIHNoYXBlJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgUy5jb250ZXh0ID0gdHJ1ZTtcbiAgICBjb25zdCBzcGxpbmUgPSBjb21wLnNwbGluZXNbMF07XG4gICAgY29uc3QgbWlkID0gc3BsaW5lLmV2YWx1YXRlUG9zaXRpb24oMC4yNSk7XG4gICAgY29uc3QgcCA9IHNjcmVlbihtaWQueCwgbWlkLnksIG1pZC56KTtcbiAgICBjb25zdCByID0gY2NlLk9wZXJhdGlvbi5lbWl0KCdkYmxjbGljaycsIHsgeDogcC54LCB5OiBwLnksIGJ1dHRvbjogMCB9KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwociwgZmFsc2UsICdjb25zdW1lZCcpO1xuICAgIGF3YWl0IGZsdXNoKCk7XG4gICAgYXdhaXQgZmx1c2goKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc3BsaW5lLmtub3RzLmxlbmd0aCwgNCk7XG4gICAgbmVhcihzcGxpbmUua25vdHNbMV0ucG9zaXRpb24ueCwgbWlkLngsIDAuMSk7XG59KTtcblxudGVzdCgnRGVsZXRlIHJlbW92ZXMgdGhlIHNlbGVjdGVkIGtub3RzLCBhbmQgdGhlIG5vZGUgZGVsZXRlIHRoYXQgZm9sbG93cyBpcyBibG9ja2VkJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgYXdhaXQgY2xpY2soa25vdFNjcmVlbigwLCAxKS54LCBrbm90U2NyZWVuKDAsIDEpLnkpO1xuICAgIGNvbnN0IGV2ID0gZG9tS2V5KCdEZWxldGUnKTtcbiAgICBhc3NlcnQub2soZXYuZGVmYXVsdFByZXZlbnRlZCAmJiBldi5zdG9wcGVkKTtcbiAgICAvLyBUaGUgc2FtZSBrZXkgYWxzbyByZWFjaGVzIHRoZSBzY2VuZSBsaXN0ZW5lcnMgKG9uY2Ugb25seSkuXG4gICAga2V5KCdEZWxldGUnKTtcbiAgICBhd2FpdCBmbHVzaCgpO1xuICAgIGF3YWl0IGZsdXNoKCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbXAuc3BsaW5lc1swXS5rbm90cy5sZW5ndGgsIDIpO1xuICAgIGNjZS5TY2VuZUZhY2FkZU1hbmFnZXIucmVtb3ZlTm9kZSh7IHV1aWQ6IG5vZGUudXVpZCB9KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwobG9nLnJlbW92ZWQubGVuZ3RoLCAwLCAnbm9kZSBub3QgcmVtb3ZlZCcpO1xuICAgIFMuZGVsZXRlS2V5QXQgPSAwO1xuICAgIGNjZS5TY2VuZUZhY2FkZU1hbmFnZXIucmVtb3ZlTm9kZSh7IHV1aWQ6IG5vZGUudXVpZCB9KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwobG9nLnJlbW92ZWQubGVuZ3RoLCAxLCAnbGF0ZXIgZGVsZXRlcyBnbyB0aHJvdWdoJyk7XG59KTtcblxudGVzdCgnQyBjeWNsZXMgdGhlIHRhbmdlbnQgbW9kZSwgRXNjYXBlIGNsZWFycyB0aGVuIGxlYXZlcycsIGFzeW5jICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGF3YWl0IGNsaWNrKGtub3RTY3JlZW4oMCwgMSkueCwga25vdFNjcmVlbigwLCAxKS55KTtcbiAgICBjb25zdCBiZWZvcmUgPSBjb21wLnNwbGluZXNbMF0ua25vdHNbMV0ubW9kZTtcbiAgICBrZXkoJ2MnKTtcbiAgICBhd2FpdCBmbHVzaCgpO1xuICAgIGF3YWl0IGZsdXNoKCk7XG4gICAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKGNvbXAuc3BsaW5lc1swXS5rbm90c1sxXS5tb2RlLCBiZWZvcmUpO1xuICAgIGtleSgnRXNjYXBlJyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuc2VsZWN0aW9uLnNpemUsIDApO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChTLmNvbnRleHQsIHRydWUpO1xuICAgIGtleSgnRXNjYXBlJyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuY29udGV4dCwgZmFsc2UpO1xufSk7XG5cbnRlc3QoJ0N0cmwrQSBzZWxlY3RzIGFsbCBrbm90cyBhbmQga2VlcHMgdGhlIGVkaXRvciBmcm9tIHNlbGVjdGluZyBhbGwgbm9kZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBTLmNvbnRleHQgPSB0cnVlO1xuICAgIGRvbUtleSgnYScsIHsgY3RybEtleTogdHJ1ZSB9KTtcbiAgICBrZXkoJ2EnLCB7IGN0cmxLZXk6IHRydWUgfSk7XG4gICAgY2NlLlNjZW5lRmFjYWRlTWFuYWdlci5zZWxlY3RBbGxOb2RlcygpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChTLnNlbGVjdGlvbi5rbm90cygpLmxlbmd0aCwgMyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGxvZy5zZWxlY3RBbGxOb2RlcywgMCk7XG59KTtcblxudGVzdCgnRHJhdyB0b29sOiBjbGlja3MgYWRkIGtub3RzIG9uIHRoZSBncm91bmQsIGEgZHJhZyBwdWxscyBtaXJyb3JlZCB0YW5nZW50cywgY2xpY2tpbmcgdGhlIGZpcnN0IGtub3QgY2xvc2VzJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgY29tcC5zcGxpbmVzWzBdLmtub3RzLmxlbmd0aCA9IDA7XG4gICAgY29tcC5zcGxpbmVzWzBdLm1hcmtEaXJ0eSgpO1xuICAgIG1ldGhvZHMuc3BTZXRUb29sKCdkcmF3Jyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMudG9vbCwgJ2RyYXcnKTtcbiAgICBhd2FpdCBjbGljayhzY3JlZW4oMCwgMCwgMCkueCwgc2NyZWVuKDAsIDAsIDApLnkpO1xuICAgIGF3YWl0IGRyYWcoc2NyZWVuKDQsIDAsIDApLCBzY3JlZW4oNiwgMCwgMSkpO1xuICAgIGF3YWl0IGNsaWNrKHNjcmVlbig0LCAwLCA0KS54LCBzY3JlZW4oNCwgMCwgNCkueSk7XG4gICAgY29uc3QgcyA9IGNvbXAuc3BsaW5lc1swXTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocy5rbm90cy5sZW5ndGgsIDMpO1xuICAgIG5lYXIocy5rbm90c1syXS5wb3NpdGlvbi54LCA0LCAwLjA1KTtcbiAgICBuZWFyKHMua25vdHNbMl0ucG9zaXRpb24ueiwgNCwgMC4wNSk7XG4gICAgbmVhcihzLmtub3RzWzJdLnBvc2l0aW9uLnksIDAsIDFlLTYpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzLmtub3RzWzFdLm1vZGUsIFRhbmdlbnRNb2RlLk1pcnJvcmVkKTtcbiAgICBjb25zdCBvdXQgPSBzLmtub3RzWzFdLnRhbmdlbnRPdXQ7XG4gICAgbmVhcihNYXRoLmh5cG90KG91dC54LCBvdXQueSwgb3V0LnopLCBNYXRoLmh5cG90KDIsIDEpLCAwLjEpO1xuICAgIC8vIENsb3NlIGJ5IGNsaWNraW5nIHRoZSBmaXJzdCBrbm90LlxuICAgIGF3YWl0IGNsaWNrKHNjcmVlbigwLCAwLCAwKS54LCBzY3JlZW4oMCwgMCwgMCkueSk7XG4gICAgYXdhaXQgZmx1c2goKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocy5jbG9zZWQsIHRydWUpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChTLmRyYXdpbmcsIG51bGwpO1xuICAgIG1ldGhvZHMuc3BTZXRUb29sKCdzZWxlY3QnKTtcbn0pO1xuXG50ZXN0KCdEcmF3IHRvb2w6IGNsaWNraW5nIGEgY3VydmUgaW5zZXJ0cywgRW50ZXIgZmluaXNoZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBtZXRob2RzLnNwU2V0VG9vbCgnZHJhdycpO1xuICAgIGNvbnN0IG1pZCA9IGNvbXAuc3BsaW5lc1swXS5ldmFsdWF0ZVBvc2l0aW9uKDAuMik7XG4gICAgYXdhaXQgY2xpY2soc2NyZWVuKG1pZC54LCBtaWQueSwgbWlkLnopLngsIHNjcmVlbihtaWQueCwgbWlkLnksIG1pZC56KS55KTtcbiAgICBhd2FpdCBmbHVzaCgpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb21wLnNwbGluZXNbMF0ua25vdHMubGVuZ3RoLCA0KTtcbiAgICAvLyBBIGNsaWNrIG9uIGVtcHR5IGdyb3VuZCBzdGFydHMgYSBuZXcgc3BsaW5lICh0aGUgb2xkIG9uZSBpcyBub3QgZW1wdHkpLlxuICAgIGF3YWl0IGNsaWNrKHNjcmVlbigtNSwgMCwgOCkueCwgc2NyZWVuKC01LCAwLCA4KS55KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29tcC5zcGxpbmVzLmxlbmd0aCwgMik7XG4gICAga2V5KCdFbnRlcicpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChTLmRyYXdpbmcsIG51bGwpO1xuICAgIGtleSgnRXNjYXBlJyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMudG9vbCwgJ3NlbGVjdCcpO1xufSk7XG5cbnRlc3QoJ3BhbmVsIHN0YXRlIGRlc2NyaWJlcyB0aGUgc2VsZWN0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgYXdhaXQgY2xpY2soa25vdFNjcmVlbigwLCAyKS54LCBrbm90U2NyZWVuKDAsIDIpLnkpO1xuICAgIGNvbnN0IHN0ID0gbWV0aG9kcy5zcFN0YXRlKCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHN0LmNvbnRleHQsIHRydWUpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzdC5lbGVtZW50LmxhYmVsLCAnS25vdCAyJyk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzdC5lbGVtZW50LnBvc2l0aW9uLCBbMTAsIDAsIDVdKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc3QudGFyZ2V0c1swXS5uYW1lLCAnUGF0aCcpO1xuICAgIGFzc2VydC5vayhsb2cuYnJvYWRjYXN0cy5zb21lKChiKSA9PiBiLm1zZyA9PT0gJ3NwbGluZXM6c3RhdGUnKSk7XG4gICAgSlNPTi5zdHJpbmdpZnkoc3QpO1xufSk7XG5cbnRlc3QoJ3BhbmVsOiBzZXQgZWxlbWVudCBmaWVsZHMsIG1vZGVzIGFuZCBhY3Rpb25zIHdpdGggdW5kbycsIGFzeW5jICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGF3YWl0IGNsaWNrKGtub3RTY3JlZW4oMCwgMSkueCwga25vdFNjcmVlbigwLCAxKS55KTtcbiAgICBhd2FpdCBtZXRob2RzLnNwU2V0RWxlbWVudCh7IHBvc2l0aW9uOiBbbnVsbCwgMiwgbnVsbF0gfSk7XG4gICAgbmVhcihjb21wLnNwbGluZXNbMF0ua25vdHNbMV0ucG9zaXRpb24ueSwgMiwgMWUtOSk7XG4gICAgYXdhaXQgbWV0aG9kcy5zcFNldEVsZW1lbnQoeyBtb2RlOiBUYW5nZW50TW9kZS5Ccm9rZW4gfSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbXAuc3BsaW5lc1swXS5rbm90c1sxXS5tb2RlLCBUYW5nZW50TW9kZS5Ccm9rZW4pO1xuICAgIGF3YWl0IG1ldGhvZHMuc3BTZXRFbGVtZW50KHsgdGFuZ2VudE91dDogMyB9KTtcbiAgICBjb25zdCB0ID0gY29tcC5zcGxpbmVzWzBdLmtub3RzWzFdLnRhbmdlbnRPdXQ7XG4gICAgbmVhcihNYXRoLmh5cG90KHQueCwgdC55LCB0LnopLCAzLCAxZS02KTtcbiAgICBhd2FpdCBtZXRob2RzLnNwQWN0aW9uKCdzcGxpdCcpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb21wLnNwbGluZXMubGVuZ3RoLCAyKTtcbiAgICBhd2FpdCBtZXRob2RzLnNwQWN0aW9uKCdzZWxlY3RBbGwnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoUy5zZWxlY3Rpb24ua25vdHMoKS5sZW5ndGgsIDQpO1xuICAgIGF3YWl0IG1ldGhvZHMuc3BBY3Rpb24oJ2Nsb3NlJywgdHJ1ZSk7XG4gICAgYXNzZXJ0Lm9rKGNvbXAuc3BsaW5lcy5ldmVyeSgocykgPT4gcy5jbG9zZWQpKTtcbn0pO1xuXG50ZXN0KCdJbnNwZWN0b3I6IGNvbnRhaW5lciBpbmZvLCBrbm90IGVkaXRzIGFuZCBzcGxpbmUgYWN0aW9ucycsIGFzeW5jICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGNvbnN0IGluZm8gPSBtZXRob2RzLnNwQ29udGFpbmVySW5mbyhjb21wLnV1aWQpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChpbmZvLnNwbGluZXMubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaW5mby5zcGxpbmVzWzBdLmtub3RzLmxlbmd0aCwgMyk7XG4gICAgYXNzZXJ0Lm9rKGluZm8uc3BsaW5lc1swXS5sZW5ndGggPiAxMCk7XG4gICAgbGV0IHJlcyA9IGF3YWl0IG1ldGhvZHMuc3BFZGl0S25vdChjb21wLnV1aWQsIDAsIDAsIHsgcG9zaXRpb246IFsxLCBudWxsLCBudWxsXSB9KTtcbiAgICBuZWFyKGNvbXAuc3BsaW5lc1swXS5rbm90c1swXS5wb3NpdGlvbi54LCAxLCAxZS05KTtcbiAgICByZXMgPSBhd2FpdCBtZXRob2RzLnNwU3BsaW5lQWN0aW9uKGNvbXAudXVpZCwgMCwgJ2FkZEtub3QnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzLnNwbGluZXNbMF0ua25vdHMubGVuZ3RoLCA0KTtcbiAgICByZXMgPSBhd2FpdCBtZXRob2RzLnNwU3BsaW5lQWN0aW9uKGNvbXAudXVpZCwgMCwgJ2Nsb3NlZCcsIHRydWUpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuc3BsaW5lc1swXS5jbG9zZWQsIHRydWUpO1xuICAgIHJlcyA9IGF3YWl0IG1ldGhvZHMuc3BTcGxpbmVBY3Rpb24oY29tcC51dWlkLCAwLCAnYWRkU3BsaW5lJyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5zcGxpbmVzLmxlbmd0aCwgMik7XG4gICAgcmVzID0gYXdhaXQgbWV0aG9kcy5zcFNwbGluZUFjdGlvbihjb21wLnV1aWQsIDEsICdyZW1vdmVTcGxpbmUnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzLnNwbGluZXMubGVuZ3RoLCAxKTtcbiAgICByZXMgPSBhd2FpdCBtZXRob2RzLnNwU3BsaW5lQWN0aW9uKGNvbXAudXVpZCwgMCwgJ3NlbGVjdEtub3QnLCB7IGtub3Q6IDIgfSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuY29udGV4dCwgdHJ1ZSk7XG4gICAgYXNzZXJ0Lm9rKHJlcy5zcGxpbmVzWzBdLmtub3RzWzJdLnNlbGVjdGVkKTtcbn0pO1xuXG50ZXN0KCdOb2RlID4gU3BsaW5lID4gQ2lyY2xlIGNyZWF0ZXMgYSBzZWxlY3RlZCBzcGxpbmUgbm9kZSBhbmQgZW50ZXJzIHRoZSBjb250ZXh0JywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgc2VsZWN0Tm9kZXMoW10pO1xuICAgIHRpY2soKTtcbiAgICBjb25zdCB1dWlkID0gYXdhaXQgbWV0aG9kcy5zcENyZWF0ZSgnY2lyY2xlJyk7XG4gICAgY29uc3QgbiA9IGZpbmROb2RlKHV1aWQpITtcbiAgICBhc3NlcnQub2sobiwgJ25vZGUgY3JlYXRlZCcpO1xuICAgIGNvbnN0IGMgPSBuLmdldENvbXBvbmVudChTcGxpbmVDb250YWluZXIpITtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYy5zcGxpbmVzWzBdLmtub3RzLmxlbmd0aCwgNCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGMuc3BsaW5lc1swXS5jbG9zZWQsIHRydWUpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoY2NlLlNlbGVjdGlvbi5xdWVyeSgpLCBbdXVpZF0pO1xuICAgIHRpY2soKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoUy5jb250ZXh0LCB0cnVlLCAnY29udGV4dCBlbnRlcmVkIG9uY2Ugc2VsZWN0ZWQnKTtcbiAgICBuLmRlc3Ryb3koKTtcbiAgICAoU3BsaW5lQ29udGFpbmVyIGFzIGFueSkuYWxsLmRlbGV0ZShjKTtcbn0pO1xuXG50ZXN0KCdkaWFnbm9zdGljcyBhcmUgSlNPTicsICgpID0+IHtcbiAgICBjb25zdCBkID0gbWV0aG9kcy5zcERpYWdub3N0aWNzKCk7XG4gICAgSlNPTi5zdHJpbmdpZnkoZCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGQucHJpbWFyeSwgdHJ1ZSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGQuZXZlbnRDb29yZHMsICdldmVudCcpO1xufSk7XG5cbihhc3luYyAoKSA9PiB7XG4gICAgZm9yIChjb25zdCB0IG9mIHRlc3RzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0LmZuKCk7XG4gICAgICAgICAgICByZXN1bHRzLnBhc3NlZCsrO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCAgb2sgICAke3QubmFtZX1gKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVzdWx0cy5mYWlsZWQrKztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAgIEZBSUwgJHt0Lm5hbWV9XFxuICAgICAgICR7U3RyaW5nKChlIGFzIEVycm9yKT8uc3RhY2sgfHwgZSkuc3BsaXQoJ1xcbicpLnNsaWNlKDAsIDYpLmpvaW4oJ1xcbiAgICAgICAnKX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgXFxuJHtyZXN1bHRzLnBhc3NlZH0gcGFzc2VkLCAke3Jlc3VsdHMuZmFpbGVkfSBmYWlsZWRgKTtcbiAgICBwcm9jZXNzLmV4aXRDb2RlID0gcmVzdWx0cy5mYWlsZWQgPyAxIDogMDtcbn0pKCk7XG4iLCAiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuXG5leHBvcnQgY29uc3QgcmVzdWx0cyA9IHsgcGFzc2VkOiAwLCBmYWlsZWQ6IDAgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QobmFtZTogc3RyaW5nLCBmbjogKCkgPT4gdm9pZCkge1xuICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICAgIHJlc3VsdHMucGFzc2VkKys7XG4gICAgICAgIGNvbnNvbGUubG9nKGAgIG9rICAgJHtuYW1lfWApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVzdWx0cy5mYWlsZWQrKztcbiAgICAgICAgY29uc3QgZXJyID0gZSBhcyBFcnJvcjtcbiAgICAgICAgY29uc3QgZGV0YWlsID0gZXJyIGluc3RhbmNlb2YgYXNzZXJ0LkFzc2VydGlvbkVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyPy5zdGFjayB8fCBlcnIpLnNwbGl0KCdcXG4nKS5zbGljZSgwLCA1KS5qb2luKCdcXG4nKTtcbiAgICAgICAgY29uc29sZS5sb2coYCAgRkFJTCAke25hbWV9XFxuICAgICAgICR7ZGV0YWlsLnNwbGl0KCdcXG4nKS5qb2luKCdcXG4gICAgICAgJyl9YCk7XG4gICAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtVTyxTQUFTLFNBQVMsU0FBUyxNQUFNO0FBQ3BDLFNBQU8sR0FBRyxNQUFNLElBQUksRUFBRSxPQUFPO0FBQ2pDO0FBd0tBLFNBQVMsUUFBUSxNQUFjO0FBQzNCLFNBQU8sQ0FBQyxTQUFjO0FBQ2xCLFNBQUssUUFBUTtBQUNiLFlBQVEsSUFBSSxNQUFNLElBQUk7QUFDdEIsV0FBTztBQUFBLEVBQ1g7QUFDSjtBQUlBLFNBQVMsWUFBWSxNQUFrQjtBQUVuQyxNQUFJLEtBQUssVUFBVSxLQUFL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O0FBR08sU0FBUyxRQUFzQixLQUFRLEdBQVU7QUFDcEQsUUFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3RELE1BQUksSUFBSSxRQUFTLFFBQU8sVUFBVSxHQUFHO0FBQ3JDLFNBQU8sS0FBSyxLQUFLLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQzFEO0FBR08sU0FBUyxRQUFzQixLQUFRLEdBQU8sR0FBVTtBQUUzRCxRQUFNLEtBQUssS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3BDLFFBQU0sS0FBSyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDcEMsUUFBTSxLQUFLLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNwQyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUM3QyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUM3QyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUM3QyxTQUFPLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUMzQjtBQUVPLFNBQVMsZUFBNkIsS0FBUSxNQUFVLEtBQWdCO0FBQzNFLFFBQU0sSUFBSSxVQUFVLEdBQUcsR0FBRyxJQUFJO0FBQzlCLFFBQU0sSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDO0FBQzFCLFNBQU8sS0FBSyxLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQztBQUNqRTtBQUdP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QUFNLElBQUksUUFBUSxjQUFjO0FBQ2hDLE9BQUssVUFBVSxDQUFDO0FBQ2hCLGdCQUFBRixRQUFPLFlBQVksRUFBRSxTQUFTLElBQUk7QUFDbEMsZ0JBQUFBLFFBQU8sWUFBWSxFQUFFLGFBQWEsT0FBTztBQUM3QyxDQUFDO0FBQUEsQ0FFQSxZQUFZO0FBQ1QsYUFBVyxLQUFLLE9BQU87QUFDbkIsUUFBSTtBQUNBLFlBQU0sRUFBRSxHQUFHO0FBQ1gsY0FBUTtBQUNSLGNBQVEsSUFBSSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQUEsSUFDbEMsU0FBUyxHQUFHO0FBQ1IsY0FBUTtBQUNSLGNBQVEsSUFBSSxVQUFVLEVBQUUsSUFBSTtBQUFBLFNBQVksUUFBUSx1QkFBYSxVQUFTLENBQUMsRUFBRSxNQUFNLElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDLEVBQUU7QUFBQSxJQUN4SDtBQUFBLEVBQ0o7QUFDQSxVQUFRLElBQUk7QUFBQSxFQUFLLFFBQVEsTUFBTSxZQUFZLFFBQVEsTUFBTSxTQUFTO0FBQ2xFLFVBQVEsV0FBVyxRQUFRLFNBQVMsSUFBSTtBQUM1QyxHQUFHOyIsCiAgIm5hbWVzIjogWyJjIiwgIl9hIiwgIl9iIiwgImdlb21ldHJ5IiwgImMiLCAiZ2VvbWV0cnkiLCAiX2EiLCAia2V5IiwgInMiLCAidGVzdCIsICJjIiwgImMiLCAiYyIsICJUYW5nZW50TW9kZSIsICJ1cCIsICJjYWNoZSIsICJjIiwgImMyIiwgImZhY3RvcnkiLCAiYWRkIiwgImciLCAicHRzIiwgImNjY2xhc3MiLCAicHJvcGVydHkiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJjY2NsYXNzIiwgInByb3BlcnR5IiwgImNhY2hlIiwgInByb3BlcnR5IiwgImNjY2xhc3MiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJfYSIsICJjY2NsYXNzIiwgInByb3BlcnR5IiwgIm1lbnUiLCAiU3BsaW5lQW5pbWF0ZU1ldGhvZCIsICJTcGxpbmVBbmltYXRlTG9vcE1vZGUiLCAiU3BsaW5lQW5pbWF0ZUVhc2luZyIsICJTcGxpbmVBbmltYXRlQWxpZ25tZW50IiwgIkFsaWduQXhpcyIsICJfYSIsICJfYiIsICJjIiwgImNjY2xhc3MiLCAicHJvcGVydHkiLCAiZXhlY3V0ZUluRWRpdE1vZGUiLCAibWVudSIsICJFeHRydWRlU2hhcGUiLCAiX20iLCAiX2EiLCAiYyIsICJtaXgiLCAiZ2VvbWV0cnkiLCAicmVuZGVyZXIiLCAicHRzIiwgImRpc3QiLCAiY2MiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJleGVjdXRlSW5FZGl0TW9kZSIsICJtZW51IiwgIkluc3RhbnRpYXRlTWV0aG9kIiwgIkluc3RhbnRpYXRlU3BhY2UiLCAiT2Zmc2V0U3BhY2UiLCAiQVhFUyIsICJHRU5FUkFURURfRkxBR1MiLCAiX3AiLCAiX2YiLCAiX3UiLCAiX3IiLCAibG9va1JvdGF0aW9uIiwgIl9hIiwgImMiLCAibWl4IiwgInNjYWxlIiwgIlMiLCAiY2NlIiwgImZpbmROb2RlIiwgIl9hIiwgIl9iIiwgInNjZW5lIiwgIndhbGsiLCAiYyIsICJmaW5kQ29tcG9uZW50IiwgImNvbXAiLCAibm9kZSIsICJfYyIsICJfYSIsICJfYiIsICJjIiwgImNjZSIsICJfYSIsICJfYiIsICJfYyIsICJfZCIsICJjb21wIiwgIk1hdDQiLCAibm9kZSIsICJmaW5kTm9kZSIsICJzZXQiLCAiZGlyZWN0b3IiLCAicmVuZGVyZXIiLCAiY2FtIiwgImdlb21ldHJ5IiwgImRpc3QiLCAiYyIsICJwdHMiLCAiYyIsICJjYW0iLCAibmVhciIsICJjb2xvciIsICJjYW1lcmEiLCAia2V5IiwgInB0cyIsICJhY3RpdmUiLCAiY2FtIiwgInB0cyIsICJiZXN0IiwgImJlc3REIiwgInRlc3QiLCAia2V5IiwgImMiLCAiY29tcCIsICJjYW0iLCAiYyIsICJzZXQiLCAiX2EiLCAiX3AiLCAiX3EiLCAibiIsICJrZXkiLCAicmVxdWVzdCIsICJzZXQiLCAiYyIsICJfYSIsICJfYiIsICJjb21wIiwgImtleSIsICJhZGQiLCAiX2EiLCAiaW5zZXJ0T25DdXJ2ZSIsICJmaW5kQ29tcG9uZW50IiwgImNhbSIsICJjIiwgIm5vZGUiLCAiZmluZE5vZGUiLCAiY29tcHNPZiIsICJrZXkiLCAiY2FtIiwgImRyYWciLCAiaGl0IiwgImNvbXAiLCAiY2NlIiwgImluc2VydE9uQ3VydmUiLCAiZGlyZWN0b3IiLCAiZ2VvbWV0cnkiLCAiQ0NPYmplY3QiLCAic2NlbmUiLCAibm9kZSIsICJpbmRleCIsICJzIiwgInByZXZJbmRleCIsICJkIiwgImMiLCAiYyIsICJ3cmFwIiwgImNjZSIsICJfYSIsICJfYiIsICJjY2UiLCAiZGlyZWN0b3IiLCAiRGlyZWN0b3IiLCAiY2NlIiwgImtleSIsICJfYSIsICJfYiIsICJjb21wIiwgImZpbmRDb21wb25lbnQiLCAibm9kZSIsICJmaW5kTm9kZSIsICJjY2UiLCAiX2MiLCAiX2QiLCAiY2FtIiwgImMiLCAiYXNzZXJ0IiwgImdlb21ldHJ5IiwgImMiXQp9Cg==
