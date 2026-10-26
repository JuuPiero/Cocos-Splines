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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3R1YnMvY2MudHMiLCAiLi4vc3R1YnMvZWRpdG9yLnRzIiwgIi4uLy4uL2Fzc2V0cy9ydW50aW1lL0Jlemllcktub3QudHMiLCAiLi4vLi4vYXNzZXRzL2NvcmUvbWF0aC50cyIsICIuLi8uLi9hc3NldHMvY29yZS9jdXJ2ZS50cyIsICIuLi8uLi9hc3NldHMvY29yZS9zcGxpbmUtY29yZS50cyIsICIuLi8uLi9hc3NldHMvcnVudGltZS9TcGxpbmUudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvS25vdExpbmsudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lQ29udGFpbmVyLnRzIiwgIi4uL3N0dWJzL2NjLWVudi50cyIsICIuLi8uLi9hc3NldHMvcnVudGltZS9TcGxpbmVBbmltYXRlLnRzIiwgIi4uLy4uL2Fzc2V0cy9ydW50aW1lL1NwbGluZUV4dHJ1ZGUudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lSW5zdGFudGlhdGUudHMiLCAiLi4vLi4vYXNzZXRzL3J1bnRpbWUvU3BsaW5lVXRpbGl0eS50cyIsICIuLi8uLi9zb3VyY2Uvc2NlbmUvZW52LnRzIiwgIi4uLy4uL3NvdXJjZS9zY2VuZS9tb2RlbC50cyIsICIuLi8uLi9zb3VyY2Uvc2NlbmUvc3RhdGUudHMiLCAiLi4vLi4vc291cmNlL3NjZW5lL3ZpZXcudHMiLCAiLi4vLi4vc291cmNlL3NjZW5lL2RyYXcudHMiLCAiLi4vLi4vc291cmNlL3NjZW5lL2hhbmRsZXMudHMiLCAiLi4vLi4vc291cmNlL3NjZW5lL2NvbnRleHQudHMiLCAiLi4vLi4vc291cmNlL3NjZW5lL3JlbmRlci50cyIsICIuLi8uLi9zb3VyY2Uvc2NlbmUvdW5kby50cyIsICIuLi8uLi9zb3VyY2Uvc2NlbmUvb3BzLnRzIiwgIi4uLy4uL3NvdXJjZS9zY2VuZS9pbnB1dC50cyIsICIuLi8uLi9zb3VyY2Uvc2NlbmUvZ3VhcmRzLnRzIiwgIi4uLy4uL3NvdXJjZS9zY2VuZS9pbmRleC50cyIsICIuLi9zY2VuZS50ZXN0LnRzIiwgIi4uL2hhcm5lc3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQSBzbWFsbCBzdGFuZC1pbiBmb3IgdGhlICdjYycgZW5naW5lIG1vZHVsZSwgZW5vdWdoIHRvIHJ1biB0aGUgcnVudGltZVxuICogY2xhc3NlcyBhbmQgdGhlIHNjZW5lIHNjcmlwdCBpbiBub2RlLiBNYXRoIGZvbGxvd3MgdGhlIGVuZ2luZSdzIGZvcm11bGFzLlxuICovXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWF0aFxuXG5leHBvcnQgY2xhc3MgVmVjMyB7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpFUk8gPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIDApKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgVU5JVF9YID0gT2JqZWN0LmZyZWV6ZShuZXcgVmVjMygxLCAwLCAwKSk7XG4gICAgc3RhdGljIHJlYWRvbmx5IFVOSVRfWSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMSwgMCkpO1xuICAgIHN0YXRpYyByZWFkb25seSBVTklUX1ogPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIDEpKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRk9SV0FSRCA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMCwgLTEpKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4ID0gMCwgcHVibGljIHkgPSAwLCBwdWJsaWMgeiA9IDApIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgdiA9IHggYXMgYW55O1xuICAgICAgICAgICAgdGhpcy54ID0gdi54O1xuICAgICAgICAgICAgdGhpcy55ID0gdi55O1xuICAgICAgICAgICAgdGhpcy56ID0gdi56O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0KHg6IGFueSA9IDAsIHkgPSAwLCB6ID0gMCk6IHRoaXMge1xuICAgICAgICBpZiAodHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4Lnk7XG4gICAgICAgICAgICB0aGlzLnogPSB4Lno7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgIHRoaXMueiA9IHo7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMyh0aGlzLngsIHRoaXMueSwgdGhpcy56KTtcbiAgICB9XG5cbiAgICBhZGQodjogYW55KSB7XG4gICAgICAgIHRoaXMueCArPSB2Lng7XG4gICAgICAgIHRoaXMueSArPSB2Lnk7XG4gICAgICAgIHRoaXMueiArPSB2Lno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxlbmd0aFNxcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMuejtcbiAgICB9XG5cbiAgICBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXIoKSk7XG4gICAgfVxuXG4gICAgbm9ybWFsaXplKCkge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5sZW5ndGgoKTtcbiAgICAgICAgaWYgKGwgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnggLz0gbDtcbiAgICAgICAgICAgIHRoaXMueSAvPSBsO1xuICAgICAgICAgICAgdGhpcy56IC89IGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbmVnYXRpdmUoKSB7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgICAgIHRoaXMueSA9IC10aGlzLnk7XG4gICAgICAgIHRoaXMueiA9IC10aGlzLno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGVxdWFscyh2OiBhbnksIGVwcyA9IDFlLTYpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMueCAtIHYueCkgPD0gZXBzICYmIE1hdGguYWJzKHRoaXMueSAtIHYueSkgPD0gZXBzICYmIE1hdGguYWJzKHRoaXMueiAtIHYueikgPD0gZXBzO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0KG91dDogYW55LCBhOiBhbnksIG06IGFueSkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XG4gICAgICAgIGxldCB3ID0gbS5tMDMgKiB4ICsgbS5tMDcgKiB5ICsgbS5tMTEgKiB6ICsgbS5tMTU7XG4gICAgICAgIHcgPSB3ID8gMSAvIHcgOiAxO1xuICAgICAgICBvdXQueCA9IChtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHogKyBtLm0xMikgKiB3O1xuICAgICAgICBvdXQueSA9IChtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0wOSAqIHogKyBtLm0xMykgKiB3O1xuICAgICAgICBvdXQueiA9IChtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHogKyBtLm0xNCkgKiB3O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0Tm9ybWFsKG91dDogYW55LCBhOiBhbnksIG06IGFueSkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XG4gICAgICAgIG91dC54ID0gbS5tMDAgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMDggKiB6O1xuICAgICAgICBvdXQueSA9IG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogejtcbiAgICAgICAgb3V0LnogPSBtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHo7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyYW5zZm9ybVF1YXQob3V0OiBhbnksIGE6IGFueSwgcTogYW55KSB7XG4gICAgICAgIGNvbnN0IGl4ID0gcS53ICogYS54ICsgcS55ICogYS56IC0gcS56ICogYS55O1xuICAgICAgICBjb25zdCBpeSA9IHEudyAqIGEueSArIHEueiAqIGEueCAtIHEueCAqIGEuejtcbiAgICAgICAgY29uc3QgaXogPSBxLncgKiBhLnogKyBxLnggKiBhLnkgLSBxLnkgKiBhLng7XG4gICAgICAgIGNvbnN0IGl3ID0gLXEueCAqIGEueCAtIHEueSAqIGEueSAtIHEueiAqIGEuejtcbiAgICAgICAgb3V0LnggPSBpeCAqIHEudyArIGl3ICogLXEueCArIGl5ICogLXEueiAtIGl6ICogLXEueTtcbiAgICAgICAgb3V0LnkgPSBpeSAqIHEudyArIGl3ICogLXEueSArIGl6ICogLXEueCAtIGl4ICogLXEuejtcbiAgICAgICAgb3V0LnogPSBpeiAqIHEudyArIGl3ICogLXEueiArIGl4ICogLXEueSAtIGl5ICogLXEueDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm9ybWFsaXplKG91dDogYW55LCBhOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbCA9IE1hdGguaHlwb3QoYS54LCBhLnksIGEueik7XG4gICAgICAgIG91dC54ID0gbCA/IGEueCAvIGwgOiAwO1xuICAgICAgICBvdXQueSA9IGwgPyBhLnkgLyBsIDogMDtcbiAgICAgICAgb3V0LnogPSBsID8gYS56IC8gbCA6IDA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRvdChhOiBhbnksIGI6IGFueSkge1xuICAgICAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55ICsgYS56ICogYi56O1xuICAgIH1cblxuICAgIHN0YXRpYyBjcm9zcyhvdXQ6IGFueSwgYTogYW55LCBiOiBhbnkpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueSAqIGIueiAtIGEueiAqIGIueTtcbiAgICAgICAgY29uc3QgeSA9IGEueiAqIGIueCAtIGEueCAqIGIuejtcbiAgICAgICAgY29uc3QgeiA9IGEueCAqIGIueSAtIGEueSAqIGIueDtcbiAgICAgICAgb3V0LnggPSB4O1xuICAgICAgICBvdXQueSA9IHk7XG4gICAgICAgIG91dC56ID0gejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzdGFuY2UoYTogYW55LCBiOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguaHlwb3QoYS54IC0gYi54LCBhLnkgLSBiLnksIGEueiAtIGIueik7XG4gICAgfVxuXG4gICAgc3RhdGljIHN1YnRyYWN0KG91dDogYW55LCBhOiBhbnksIGI6IGFueSkge1xuICAgICAgICBvdXQueCA9IGEueCAtIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgLSBiLnk7XG4gICAgICAgIG91dC56ID0gYS56IC0gYi56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyBsZW5ndGhTcXIoYTogYW55KSB7XG4gICAgICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLno7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmVjMiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHggPSAwLCBwdWJsaWMgeSA9IDApIHt9XG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUXVhdCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IElERU5USVRZID0gT2JqZWN0LmZyZWV6ZShuZXcgUXVhdCgpKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4ID0gMCwgcHVibGljIHkgPSAwLCBwdWJsaWMgeiA9IDAsIHB1YmxpYyB3ID0gMSkge31cblxuICAgIHNldCh4OiBhbnksIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIHc/OiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy54ID0geC54O1xuICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICAgICAgdGhpcy56ID0geC56O1xuICAgICAgICAgICAgdGhpcy53ID0geC53O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHkhO1xuICAgICAgICAgICAgdGhpcy56ID0geiE7XG4gICAgICAgICAgICB0aGlzLncgPSB3ITtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBRdWF0KHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMudyk7XG4gICAgfVxuXG4gICAgc3RhdGljIG11bHRpcGx5KG91dDogYW55LCBhOiBhbnksIGI6IGFueSkge1xuICAgICAgICBjb25zdCB4ID0gYS54ICogYi53ICsgYS53ICogYi54ICsgYS55ICogYi56IC0gYS56ICogYi55O1xuICAgICAgICBjb25zdCB5ID0gYS55ICogYi53ICsgYS53ICogYi55ICsgYS56ICogYi54IC0gYS54ICogYi56O1xuICAgICAgICBjb25zdCB6ID0gYS56ICogYi53ICsgYS53ICogYi56ICsgYS54ICogYi55IC0gYS55ICogYi54O1xuICAgICAgICBjb25zdCB3ID0gYS53ICogYi53IC0gYS54ICogYi54IC0gYS55ICogYi55IC0gYS56ICogYi56O1xuICAgICAgICBvdXQueCA9IHg7XG4gICAgICAgIG91dC55ID0geTtcbiAgICAgICAgb3V0LnogPSB6O1xuICAgICAgICBvdXQudyA9IHc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGludmVydChvdXQ6IGFueSwgYTogYW55KSB7XG4gICAgICAgIGNvbnN0IGQgPSBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLnc7XG4gICAgICAgIGNvbnN0IGludiA9IGQgPyAxIC8gZCA6IDA7XG4gICAgICAgIG91dC54ID0gLWEueCAqIGludjtcbiAgICAgICAgb3V0LnkgPSAtYS55ICogaW52O1xuICAgICAgICBvdXQueiA9IC1hLnogKiBpbnY7XG4gICAgICAgIG91dC53ID0gYS53ICogaW52O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tRXVsZXIob3V0OiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaCA9ICgwLjUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICAgICAgeCAqPSBoO1xuICAgICAgICB5ICo9IGg7XG4gICAgICAgIHogKj0gaDtcbiAgICAgICAgY29uc3Qgc3ggPSBNYXRoLnNpbih4KSwgY3ggPSBNYXRoLmNvcyh4KSwgc3kgPSBNYXRoLnNpbih5KSwgY3kgPSBNYXRoLmNvcyh5KSwgc3ogPSBNYXRoLnNpbih6KSwgY3ogPSBNYXRoLmNvcyh6KTtcbiAgICAgICAgb3V0LnggPSBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dC55ID0gY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXQueiA9IGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0LncgPSBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3o7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqIExpa2UgTWF0My5mcm9tVmlld1VwOiArWiA9IHZpZXcuICovXG4gICAgc3RhdGljIGZyb21WaWV3VXAob3V0OiBhbnksIHZpZXc6IGFueSwgdXA6IGFueSA9IFZlYzMuVU5JVF9ZKSB7XG4gICAgICAgIGNvbnN0IHggPSBWZWMzLm5vcm1hbGl6ZShuZXcgVmVjMygpLCBWZWMzLmNyb3NzKG5ldyBWZWMzKCksIHVwLCB2aWV3KSk7XG4gICAgICAgIGlmICh4Lmxlbmd0aFNxcigpIDwgMWUtMTIpIHtcbiAgICAgICAgICAgIG91dC54ID0gMDsgb3V0LnkgPSAwOyBvdXQueiA9IDA7IG91dC53ID0gMTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeSA9IFZlYzMuY3Jvc3MobmV3IFZlYzMoKSwgdmlldywgeCk7XG4gICAgICAgIGNvbnN0IG0wMCA9IHgueCwgbTAxID0geS54LCBtMDIgPSB2aWV3Lng7XG4gICAgICAgIGNvbnN0IG0xMCA9IHgueSwgbTExID0geS55LCBtMTIgPSB2aWV3Lnk7XG4gICAgICAgIGNvbnN0IG0yMCA9IHgueiwgbTIxID0geS56LCBtMjIgPSB2aWV3Lno7XG4gICAgICAgIGNvbnN0IHRyYWNlID0gbTAwICsgbTExICsgbTIyO1xuICAgICAgICBpZiAodHJhY2UgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gMC41IC8gTWF0aC5zcXJ0KHRyYWNlICsgMSk7XG4gICAgICAgICAgICBvdXQudyA9IDAuMjUgLyBzOyBvdXQueCA9IChtMjEgLSBtMTIpICogczsgb3V0LnkgPSAobTAyIC0gbTIwKSAqIHM7IG91dC56ID0gKG0xMCAtIG0wMSkgKiBzO1xuICAgICAgICB9IGVsc2UgaWYgKG0wMCA+IG0xMSAmJiBtMDAgPiBtMjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMDAgLSBtMTEgLSBtMjIpO1xuICAgICAgICAgICAgb3V0LncgPSAobTIxIC0gbTEyKSAvIHM7IG91dC54ID0gMC4yNSAqIHM7IG91dC55ID0gKG0wMSArIG0xMCkgLyBzOyBvdXQueiA9IChtMDIgKyBtMjApIC8gcztcbiAgICAgICAgfSBlbHNlIGlmIChtMTEgPiBtMjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMTEgLSBtMDAgLSBtMjIpO1xuICAgICAgICAgICAgb3V0LncgPSAobTAyIC0gbTIwKSAvIHM7IG91dC54ID0gKG0wMSArIG0xMCkgLyBzOyBvdXQueSA9IDAuMjUgKiBzOyBvdXQueiA9IChtMTIgKyBtMjEpIC8gcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMjIgLSBtMDAgLSBtMTEpO1xuICAgICAgICAgICAgb3V0LncgPSAobTEwIC0gbTAxKSAvIHM7IG91dC54ID0gKG0wMiArIG0yMCkgLyBzOyBvdXQueSA9IChtMTIgKyBtMjEpIC8gczsgb3V0LnogPSAwLjI1ICogcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hdDQge1xuICAgIG0wMCA9IDE7IG0wMSA9IDA7IG0wMiA9IDA7IG0wMyA9IDA7XG4gICAgbTA0ID0gMDsgbTA1ID0gMTsgbTA2ID0gMDsgbTA3ID0gMDtcbiAgICBtMDggPSAwOyBtMDkgPSAwOyBtMTAgPSAxOyBtMTEgPSAwO1xuICAgIG0xMiA9IDA7IG0xMyA9IDA7IG0xNCA9IDA7IG0xNSA9IDE7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgSURFTlRJVFkgPSBPYmplY3QuZnJlZXplKG5ldyBNYXQ0KCkpO1xuXG4gICAgc3RhdGljIHRvQXJyYXkob3V0OiBudW1iZXJbXSwgbTogYW55KSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBbJ20wMCcsICdtMDEnLCAnbTAyJywgJ20wMycsICdtMDQnLCAnbTA1JywgJ20wNicsICdtMDcnLCAnbTA4JywgJ20wOScsICdtMTAnLCAnbTExJywgJ20xMicsICdtMTMnLCAnbTE0JywgJ20xNSddO1xuICAgICAgICBrZXlzLmZvckVhY2goKGssIGkpID0+IChvdXRbaV0gPSBtW2tdKSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21BcnJheShvdXQ6IGFueSwgYTogbnVtYmVyW10pIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IFsnbTAwJywgJ20wMScsICdtMDInLCAnbTAzJywgJ20wNCcsICdtMDUnLCAnbTA2JywgJ20wNycsICdtMDgnLCAnbTA5JywgJ20xMCcsICdtMTEnLCAnbTEyJywgJ20xMycsICdtMTQnLCAnbTE1J107XG4gICAgICAgIGtleXMuZm9yRWFjaCgoaywgaSkgPT4gKG91dFtrXSA9IGFbaV0pKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbXVsdGlwbHkob3V0OiBhbnksIGE6IGFueSwgYjogYW55KSB7XG4gICAgICAgIGNvbnN0IEEgPSBNYXQ0LnRvQXJyYXkoW10sIGEpO1xuICAgICAgICBjb25zdCBCID0gTWF0NC50b0FycmF5KFtdLCBiKTtcbiAgICAgICAgY29uc3QgUjogbnVtYmVyW10gPSBuZXcgQXJyYXkoMTYpLmZpbGwoMCk7XG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgNDsgYysrKSBmb3IgKGxldCByID0gMDsgciA8IDQ7IHIrKykge1xuICAgICAgICAgICAgbGV0IHMgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA0OyBrKyspIHMgKz0gQVtrICogNCArIHJdICogQltjICogNCArIGtdO1xuICAgICAgICAgICAgUltjICogNCArIHJdID0gcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBSKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW52ZXJ0KG91dDogYW55LCBtOiBhbnkpIHtcbiAgICAgICAgY29uc3QgYSA9IE1hdDQudG9BcnJheShbXSwgbSk7XG4gICAgICAgIGNvbnN0IFthMDAsIGEwMSwgYTAyLCBhMDMsIGExMCwgYTExLCBhMTIsIGExMywgYTIwLCBhMjEsIGEyMiwgYTIzLCBhMzAsIGEzMSwgYTMyLCBhMzNdID0gYTtcbiAgICAgICAgY29uc3QgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICAgICAgY29uc3QgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICAgICAgY29uc3QgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbiAgICAgICAgaWYgKCFkZXQpIHJldHVybiBNYXQ0LmZyb21BcnJheShvdXQsIE1hdDQudG9BcnJheShbXSwgTWF0NC5JREVOVElUWSkpO1xuICAgICAgICBkZXQgPSAxIC8gZGV0O1xuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBbXG4gICAgICAgICAgICAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldCwgKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQsXG4gICAgICAgICAgICAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldCwgKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQsXG4gICAgICAgICAgICAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldCwgKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQsXG4gICAgICAgICAgICAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldCwgKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQsXG4gICAgICAgICAgICAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldCwgKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQsXG4gICAgICAgICAgICAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldCwgKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQsXG4gICAgICAgICAgICAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldCwgKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQsXG4gICAgICAgICAgICAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldCwgKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQsXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKiBUcmFuc2xhdGlvbiAqIHJvdGF0aW9uICogc2NhbGUuICovXG4gICAgc3RhdGljIGZyb21SVFMob3V0OiBhbnksIHE6IGFueSwgdDogYW55LCBzOiBhbnkpIHtcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6LCB3IH0gPSBxO1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4LCB5MiA9IHkgKyB5LCB6MiA9IHogKyB6O1xuICAgICAgICBjb25zdCB4eCA9IHggKiB4MiwgeHkgPSB4ICogeTIsIHh6ID0geCAqIHoyLCB5eSA9IHkgKiB5MiwgeXogPSB5ICogejIsIHp6ID0geiAqIHoyLCB3eCA9IHcgKiB4Miwgd3kgPSB3ICogeTIsIHd6ID0gdyAqIHoyO1xuICAgICAgICByZXR1cm4gTWF0NC5mcm9tQXJyYXkob3V0LCBbXG4gICAgICAgICAgICAoMSAtICh5eSArIHp6KSkgKiBzLngsICh4eSArIHd6KSAqIHMueCwgKHh6IC0gd3kpICogcy54LCAwLFxuICAgICAgICAgICAgKHh5IC0gd3opICogcy55LCAoMSAtICh4eCArIHp6KSkgKiBzLnksICh5eiArIHd4KSAqIHMueSwgMCxcbiAgICAgICAgICAgICh4eiArIHd5KSAqIHMueiwgKHl6IC0gd3gpICogcy56LCAoMSAtICh4eCArIHl5KSkgKiBzLnosIDAsXG4gICAgICAgICAgICB0LngsIHQueSwgdC56LCAxLFxuICAgICAgICBdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb2xvciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHIgPSAyNTUsIHB1YmxpYyBnID0gMjU1LCBwdWJsaWMgYiA9IDI1NSwgcHVibGljIGEgPSAyNTUpIHt9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG9iamVjdHNcblxuZXhwb3J0IGNvbnN0IENDT2JqZWN0ID0ge1xuICAgIEZsYWdzOiB7XG4gICAgICAgIERvbnRTYXZlOiAxIDw8IDMsXG4gICAgICAgIEVkaXRvck9ubHk6IDEgPDwgNCxcbiAgICAgICAgTG9ja2VkSW5FZGl0b3I6IDEgPDwgOSxcbiAgICAgICAgSGlkZUluSGllcmFyY2h5OiAxIDw8IDEwLFxuICAgIH0sXG59O1xuXG5sZXQgdXVpZFNlcSA9IDA7XG5leHBvcnQgZnVuY3Rpb24gbWFrZVV1aWQocHJlZml4ID0gJ2lkJykge1xuICAgIHJldHVybiBgJHtwcmVmaXh9LSR7Kyt1dWlkU2VxfWA7XG59XG5cbnR5cGUgQ3RvcjxUPiA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IFQ7XG5cbmV4cG9ydCBjbGFzcyBOb2RlIHtcbiAgICB1dWlkID0gbWFrZVV1aWQoJ25vZGUnKTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcGFyZW50OiBOb2RlIHwgbnVsbCA9IG51bGw7XG4gICAgY2hpbGRyZW46IE5vZGVbXSA9IFtdO1xuICAgIGNvbXBvbmVudHM6IENvbXBvbmVudFtdID0gW107XG4gICAgbGF5ZXIgPSAxO1xuICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgaXNWYWxpZCA9IHRydWU7XG4gICAgX29iakZsYWdzID0gMDtcbiAgICBwb3NpdGlvbiA9IG5ldyBWZWMzKCk7XG4gICAgcm90YXRpb24gPSBuZXcgUXVhdCgpO1xuICAgIHNjYWxlID0gbmV3IFZlYzMoMSwgMSwgMSk7XG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb25bXT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSAnTm9kZScpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlSW5IaWVyYXJjaHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZSAmJiAoIXRoaXMucGFyZW50IHx8IHRoaXMucGFyZW50LmFjdGl2ZUluSGllcmFyY2h5KTtcbiAgICB9XG5cbiAgICBnZXQgc2NlbmUoKTogYW55IHtcbiAgICAgICAgbGV0IG46IE5vZGUgPSB0aGlzO1xuICAgICAgICB3aGlsZSAobi5wYXJlbnQpIG4gPSBuLnBhcmVudDtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuXG4gICAgc2V0UGFyZW50KHA6IE5vZGUgfCBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyksIDEpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHA7XG4gICAgICAgIGlmIChwKSBwLmNoaWxkcmVuLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkTWF0cml4KCk6IE1hdDQge1xuICAgICAgICBjb25zdCBsb2NhbCA9IE1hdDQuZnJvbVJUUyhuZXcgTWF0NCgpLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnBvc2l0aW9uLCB0aGlzLnNjYWxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmICEodGhpcy5wYXJlbnQgYXMgYW55KS5pc1NjZW5lID8gTWF0NC5tdWx0aXBseShuZXcgTWF0NCgpLCB0aGlzLnBhcmVudC53b3JsZE1hdHJpeCwgbG9jYWwpIDogbG9jYWw7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkUG9zaXRpb24oKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLndvcmxkTWF0cml4O1xuICAgICAgICByZXR1cm4gbmV3IFZlYzMobS5tMTIsIG0ubTEzLCBtLm0xNCk7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkUm90YXRpb24oKTogUXVhdCB7XG4gICAgICAgIGNvbnN0IGxvY2FsID0gdGhpcy5yb3RhdGlvbi5jbG9uZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUgPyBRdWF0Lm11bHRpcGx5KG5ldyBRdWF0KCksIHRoaXMucGFyZW50LndvcmxkUm90YXRpb24sIGxvY2FsKSA6IGxvY2FsO1xuICAgIH1cblxuICAgIGdldCBmb3J3YXJkKCkge1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1RdWF0KG5ldyBWZWMzKCksIG5ldyBWZWMzKDAsIDAsIC0xKSwgdGhpcy53b3JsZFJvdGF0aW9uKTtcbiAgICB9XG4gICAgZ2V0IHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1RdWF0KG5ldyBWZWMzKCksIG5ldyBWZWMzKDEsIDAsIDApLCB0aGlzLndvcmxkUm90YXRpb24pO1xuICAgIH1cbiAgICBnZXQgdXAoKSB7XG4gICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybVF1YXQobmV3IFZlYzMoKSwgbmV3IFZlYzMoMCwgMSwgMCksIHRoaXMud29ybGRSb3RhdGlvbik7XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24oeDogYW55LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24uc2V0KHgsIHksIHopO1xuICAgIH1cblxuICAgIHNldFdvcmxkUG9zaXRpb24oeDogYW55LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHAgPSB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyBuZXcgVmVjMyh4LngsIHgueSwgeC56KSA6IG5ldyBWZWMzKHgsIHksIHopO1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUpIFZlYzMudHJhbnNmb3JtTWF0NChwLCBwLCBNYXQ0LmludmVydChuZXcgTWF0NCgpLCB0aGlzLnBhcmVudC53b3JsZE1hdHJpeCkpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldChwKTtcbiAgICB9XG5cbiAgICBzZXRXb3JsZFJvdGF0aW9uKHg6IGFueSwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xuICAgICAgICBjb25zdCBxID0gdHlwZW9mIHggPT09ICdvYmplY3QnID8gbmV3IFF1YXQoeC54LCB4LnksIHgueiwgeC53KSA6IG5ldyBRdWF0KHgsIHksIHosIHcpO1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgISh0aGlzLnBhcmVudCBhcyBhbnkpLmlzU2NlbmUpIFF1YXQubXVsdGlwbHkocSwgUXVhdC5pbnZlcnQobmV3IFF1YXQoKSwgdGhpcy5wYXJlbnQud29ybGRSb3RhdGlvbiksIHEpO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnNldChxKTtcbiAgICB9XG5cbiAgICBzZXRTY2FsZSh4OiBhbnksIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY2FsZS5zZXQoeCwgeSwgeik7XG4gICAgfVxuXG4gICAgZ2V0Q29tcG9uZW50PFQ+KEM6IEN0b3I8VD4gfCBzdHJpbmcpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiAodGhpcy5jb21wb25lbnRzLmZpbmQoKGMpID0+ICh0eXBlb2YgQyA9PT0gJ3N0cmluZycgPyAoYy5jb25zdHJ1Y3RvciBhcyBhbnkpLl9fY2lkID09PSBDIDogYyBpbnN0YW5jZW9mIChDIGFzIGFueSkpKSBhcyBhbnkpID8/IG51bGw7XG4gICAgfVxuXG4gICAgYWRkQ29tcG9uZW50PFQgZXh0ZW5kcyBDb21wb25lbnQ+KEM6IEN0b3I8VD4pOiBUIHtcbiAgICAgICAgY29uc3QgYyA9IG5ldyBDKCk7XG4gICAgICAgIGMubm9kZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKGMpO1xuICAgICAgICBjLl9fc3RhcnQoKTtcbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuXG4gICAgb24odHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMubGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXTtcbiAgICAgICAgbC5wdXNoKGZuKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KHR5cGUsIGwpO1xuICAgIH1cblxuICAgIG9mZih0eXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5saXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5zZXQodHlwZSwgbC5maWx0ZXIoKGYpID0+IGYgIT09IGZuKSk7XG4gICAgfVxuXG4gICAgaGFzRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmxpc3RlbmVycy5nZXQodHlwZSkgfHwgW10pLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZW1pdCh0eXBlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgZiBvZiB0aGlzLmxpc3RlbmVycy5nZXQodHlwZSkgfHwgW10pIGYoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLmNvbXBvbmVudHMpIGMuX19kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuc2V0UGFyZW50KG51bGwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCB7XG4gICAgbm9kZSE6IE5vZGU7XG4gICAgdXVpZCA9IG1ha2VVdWlkKCdjb21wJyk7XG4gICAgcHJpdmF0ZSBfZW5hYmxlZCA9IHRydWU7XG4gICAgaXNWYWxpZCA9IHRydWU7XG5cbiAgICBnZXQgZW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gICAgfVxuICAgIHNldCBlbmFibGVkKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHYgPT09IHRoaXMuX2VuYWJsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHY7XG4gICAgICAgIGlmICh2KSAodGhpcyBhcyBhbnkpLm9uRW5hYmxlPy4oKTtcbiAgICAgICAgZWxzZSAodGhpcyBhcyBhbnkpLm9uRGlzYWJsZT8uKCk7XG4gICAgfVxuXG4gICAgZ2V0IGVuYWJsZWRJbkhpZXJhcmNoeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZUluSGllcmFyY2h5O1xuICAgIH1cblxuICAgIGdldENvbXBvbmVudDxUPihDOiBDdG9yPFQ+KTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldENvbXBvbmVudChDKTtcbiAgICB9XG5cbiAgICBfX3N0YXJ0KCkge1xuICAgICAgICAodGhpcyBhcyBhbnkpLm9uTG9hZD8uKCk7XG4gICAgICAgIGlmICh0aGlzLl9lbmFibGVkKSAodGhpcyBhcyBhbnkpLm9uRW5hYmxlPy4oKTtcbiAgICB9XG5cbiAgICBfX2Rlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbmFibGVkKSAodGhpcyBhcyBhbnkpLm9uRGlzYWJsZT8uKCk7XG4gICAgICAgICh0aGlzIGFzIGFueSkub25EZXN0cm95Py4oKTtcbiAgICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fX2Rlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5ub2RlLmNvbXBvbmVudHMuc3BsaWNlKHRoaXMubm9kZS5jb21wb25lbnRzLmluZGV4T2YodGhpcyksIDEpO1xuICAgIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRlY29yYXRvcnNcblxuY29uc3QgY2xhc3NlcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbmZ1bmN0aW9uIGNjY2xhc3MobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIChjdG9yOiBhbnkpID0+IHtcbiAgICAgICAgY3Rvci5fX2NpZCA9IG5hbWU7XG4gICAgICAgIGNsYXNzZXMuc2V0KG5hbWUsIGN0b3IpO1xuICAgICAgICByZXR1cm4gY3RvcjtcbiAgICB9O1xufVxuXG5jb25zdCBub29wRGVjb3JhdG9yID0gKC4uLl9hOiBhbnlbXSkgPT4gKC4uLl9iOiBhbnlbXSkgPT4gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBwcm9wZXJ0eSguLi5hcmdzOiBhbnlbXSk6IGFueSB7XG4gICAgLy8gQHByb3BlcnR5IG9yIEBwcm9wZXJ0eSh7Li4ufSlcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gMiAmJiB0eXBlb2YgYXJnc1sxXSA9PT0gJ3N0cmluZycpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuICgpID0+IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNvbnN0IF9kZWNvcmF0b3IgPSB7XG4gICAgY2NjbGFzcyxcbiAgICBwcm9wZXJ0eSxcbiAgICBleGVjdXRlSW5FZGl0TW9kZTogKGN0b3I6IGFueSkgPT4gY3RvcixcbiAgICBkaXNhbGxvd011bHRpcGxlOiAoY3RvcjogYW55KSA9PiBjdG9yLFxuICAgIG1lbnU6IG5vb3BEZWNvcmF0b3IsXG4gICAgcmVxdWlyZUNvbXBvbmVudDogbm9vcERlY29yYXRvcixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjY2VudW0oX2U6IGFueSkge1xuICAgIHJldHVybiBfZTtcbn1cblxuZXhwb3J0IGNvbnN0IENDSW50ZWdlciA9ICdJbnRlZ2VyJztcblxuZXhwb3J0IGNvbnN0IGpzID0ge1xuICAgIGdldENsYXNzQnlOYW1lKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gY2xhc3Nlcy5nZXQobmFtZSkgPz8gbnVsbDtcbiAgICB9LFxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVuZ2luZVxuXG5leHBvcnQgY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICBzdGF0aWMgZW1pdEV2ZW50cyhfaGFuZGxlcnM6IGFueVtdLCAuLi5fYXJnczogYW55W10pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBNYXRlcmlhbCB7XG4gICAgaW5pdGlhbGl6ZShfaW5mbzogYW55KSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWVzaCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGdlb21ldHJ5OiBhbnkpIHt9XG4gICAgZGVzdHJveSgpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXNoUmVuZGVyZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIG1lc2g6IGFueSA9IG51bGw7XG4gICAgbWF0ZXJpYWxzOiBhbnlbXSA9IFtdO1xuICAgIHNoYWRvd0Nhc3RpbmdNb2RlID0gMDtcbiAgICByZWNlaXZlU2hhZG93ID0gMDtcbiAgICBzZXRTaGFyZWRNYXRlcmlhbChtOiBhbnksIGk6IG51bWJlcikge1xuICAgICAgICB0aGlzLm1hdGVyaWFsc1tpXSA9IG07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlZmFiIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YTogTm9kZSkge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRpYXRlKHA6IFByZWZhYik6IE5vZGUge1xuICAgIGNvbnN0IG4gPSBuZXcgTm9kZShwLmRhdGEubmFtZSk7XG4gICAgbi5zY2FsZS5zZXQocC5kYXRhLnNjYWxlKTtcbiAgICByZXR1cm4gbjtcbn1cblxuZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xuICAgIE1lc2hVdGlsczoge1xuICAgICAgICBjcmVhdGVNZXNoKGdlb21ldHJ5OiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWVzaChnZW9tZXRyeSk7XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmNvbnN0IGRpcmVjdG9yTGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+KCk7XG5sZXQgdG90YWxGcmFtZXMgPSAwO1xuXG5leHBvcnQgY29uc3QgZGlyZWN0b3I6IGFueSA9IHtcbiAgICByb290OiBudWxsLFxuICAgIF9zY2VuZTogbnVsbCBhcyBhbnksXG4gICAgZ2V0U2NlbmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2VuZTtcbiAgICB9LFxuICAgIGdldFRvdGFsRnJhbWVzKCkge1xuICAgICAgICByZXR1cm4gdG90YWxGcmFtZXM7XG4gICAgfSxcbiAgICBnZXRUb3RhbFRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0b3RhbEZyYW1lcyAqIDE2O1xuICAgIH0sXG4gICAgb24odHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgbCA9IGRpcmVjdG9yTGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXTtcbiAgICAgICAgbC5wdXNoKGZuKTtcbiAgICAgICAgZGlyZWN0b3JMaXN0ZW5lcnMuc2V0KHR5cGUsIGwpO1xuICAgIH0sXG4gICAgb2ZmKHR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKSB7XG4gICAgICAgIGRpcmVjdG9yTGlzdGVuZXJzLnNldCh0eXBlLCAoZGlyZWN0b3JMaXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdKS5maWx0ZXIoKGYpID0+IGYgIT09IGZuKSk7XG4gICAgfSxcbiAgICAvKiogVGVzdCBoZWxwZXI6IG9uZSBlZGl0b3IgZnJhbWUuICovXG4gICAgdGljaygpIHtcbiAgICAgICAgZm9yIChjb25zdCBmIG9mIGRpcmVjdG9yTGlzdGVuZXJzLmdldCgnZGlyZWN0b3JfYmVmb3JlX2NvbW1pdCcpIHx8IFtdKSBmKCk7XG4gICAgICAgIHRvdGFsRnJhbWVzKys7XG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBEaXJlY3RvciA9IHsgRVZFTlRfQkVGT1JFX0NPTU1JVDogJ2RpcmVjdG9yX2JlZm9yZV9jb21taXQnIH07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJlciA9IHtcbiAgICBzY2VuZToge1xuICAgICAgICBDYW1lcmFVc2FnZTogeyBTQ0VORV9WSUVXOiA1IH0sXG4gICAgICAgIENhbWVyYVByb2plY3Rpb246IHsgT1JUSE86IDAsIFBFUlNQRUNUSVZFOiAxIH0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBnZW9tZXRyeSA9IHtcbiAgICBSYXk6IGNsYXNzIHtcbiAgICAgICAgbzogVmVjMztcbiAgICAgICAgZDogVmVjMztcbiAgICAgICAgY29uc3RydWN0b3Iob3ggPSAwLCBveSA9IDAsIG96ID0gMCwgZHggPSAwLCBkeSA9IDAsIGR6ID0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMubyA9IG5ldyBWZWMzKG94LCBveSwgb3opO1xuICAgICAgICAgICAgdGhpcy5kID0gbmV3IFZlYzMoZHgsIGR5LCBkeik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVSYXljYXN0TW9kZTogeyBBTEw6IDAsIENMT1NFU1Q6IDEsIEFOWTogMiB9LFxuICAgIGludGVyc2VjdDoge1xuICAgICAgICByYXlBQUJCOiAoKSA9PiB0cnVlLFxuICAgICAgICByYXlNb2RlbDogKCkgPT4gMCxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGdhbWU6IGFueSA9IHsgY2FudmFzOiBudWxsIH07XG4iLCAiLyoqXG4gKiBBIGZha2UgZWRpdG9yIGZvciBydW5uaW5nIHRoZSBzY2VuZSBzY3JpcHQgaW4gbm9kZTogRWRpdG9yLCBjY2UsXG4gKiBFZGl0b3JFeHRlbmRzLCBhIHRvcC1kb3duIG9ydGhvZ3JhcGhpYyBTY2VuZSB2aWV3IGNhbWVyYSBhbmQgYSBzY2VuZS5cbiAqIEltcG9ydCB0aGlzIGJlZm9yZSBhbnl0aGluZyBmcm9tIHNvdXJjZS9zY2VuZS5cbiAqL1xuaW1wb3J0ICogYXMgY2MgZnJvbSAnLi9jYyc7XG5cbmV4cG9ydCBjb25zdCBXID0gODAwO1xuZXhwb3J0IGNvbnN0IEggPSA2MDA7XG4vKiogUGl4ZWxzIHBlciB3b3JsZCB1bml0IG9mIHRoZSBmYWtlIFNjZW5lIHZpZXcgY2FtZXJhLiAqL1xuZXhwb3J0IGNvbnN0IFBYID0gMjA7XG5cbmV4cG9ydCBjb25zdCBsb2cgPSB7XG4gICAgcmVxdWVzdHM6IFtdIGFzIHsgbXNnOiBzdHJpbmc7IGFyZ3M6IGFueVtdIH1bXSxcbiAgICBicm9hZGNhc3RzOiBbXSBhcyB7IG1zZzogc3RyaW5nOyBkYXRhOiBhbnkgfVtdLFxuICAgIGNoYW5nZXM6IFtdIGFzIHN0cmluZ1tdLFxuICAgIHJlcGFpbnRzOiAwLFxuICAgIHJlbW92ZWQ6IFtdIGFzIGFueVtdLFxuICAgIHNlbGVjdEFsbE5vZGVzOiAwLFxuICAgIC8qKiBFdmVudHMgdGhhdCByZWFjaGVkIHRoZSBlZGl0b3IncyBvd24gaGFuZGxlcnMgKGJlbG93IG91ciBwcmlvcml0eSkuICovXG4gICAgZWRpdG9yRXZlbnRzOiBbXSBhcyBzdHJpbmdbXSxcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2NlbmUgZ3JhcGhcblxuZXhwb3J0IGNvbnN0IHNjZW5lID0gbmV3IGNjLk5vZGUoJ1NjZW5lJyk7XG4oc2NlbmUgYXMgYW55KS5pc1NjZW5lID0gdHJ1ZTtcbmNjLmRpcmVjdG9yLl9zY2VuZSA9IHNjZW5lO1xuXG5leHBvcnQgZnVuY3Rpb24gd2FsayhuOiBjYy5Ob2RlLCBmbjogKG46IGNjLk5vZGUpID0+IHZvaWQpIHtcbiAgICBmbihuKTtcbiAgICBmb3IgKGNvbnN0IGMgb2Ygbi5jaGlsZHJlbikgd2FsayhjLCBmbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZSh1dWlkOiBzdHJpbmcpOiBjYy5Ob2RlIHwgbnVsbCB7XG4gICAgbGV0IGZvdW5kOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XG4gICAgd2FsayhzY2VuZSwgKG4pID0+IHtcbiAgICAgICAgaWYgKG4udXVpZCA9PT0gdXVpZCkgZm91bmQgPSBuO1xuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb21wb25lbnQodXVpZDogc3RyaW5nKTogYW55IHtcbiAgICBsZXQgZm91bmQ6IGFueSA9IG51bGw7XG4gICAgd2FsayhzY2VuZSwgKG4pID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIG4uY29tcG9uZW50cykgaWYgKGMudXVpZCA9PT0gdXVpZCkgZm91bmQgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNhbWVyYVxuXG5leHBvcnQgY29uc3QgZ2VvbWV0cnkgPSB7XG4gICAgbGluZXM6IDAsXG4gICAgdHJpYW5nbGVzOiAwLFxuICAgIHF1YWRzOiAwLFxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmxpbmVzID0gMDtcbiAgICAgICAgdGhpcy50cmlhbmdsZXMgPSAwO1xuICAgICAgICB0aGlzLnF1YWRzID0gMDtcbiAgICB9LFxuICAgIGFkZExpbmUoKSB7XG4gICAgICAgIHRoaXMubGluZXMrKztcbiAgICB9LFxuICAgIGFkZFRyaWFuZ2xlKCkge1xuICAgICAgICB0aGlzLnRyaWFuZ2xlcysrO1xuICAgIH0sXG4gICAgYWRkUXVhZCgpIHtcbiAgICAgICAgdGhpcy5xdWFkcysrO1xuICAgIH0sXG59O1xuXG5jb25zdCBjYW1Ob2RlID0gbmV3IGNjLk5vZGUoJ0VkaXRvciBDYW1lcmEnKTtcbi8vIExvb2tpbmcgc3RyYWlnaHQgZG93bjogZm9yd2FyZCAtWSwgc2NyZWVuIHVwID0gd29ybGQgLVosIHJpZ2h0ID0gK1guXG5jYW1Ob2RlLnJvdGF0aW9uLnNldCgtTWF0aC5TUVJUMV8yLCAwLCAwLCBNYXRoLlNRUlQxXzIpO1xuY2FtTm9kZS5wb3NpdGlvbi5zZXQoMCwgMTAwLCAwKTtcblxuZXhwb3J0IGNvbnN0IGNhbWVyYTogYW55ID0ge1xuICAgIG5hbWU6ICdFZGl0b3IgQ2FtZXJhJyxcbiAgICBjYW1lcmFVc2FnZTogY2MucmVuZGVyZXIuc2NlbmUuQ2FtZXJhVXNhZ2UuU0NFTkVfVklFVyxcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIHdpbmRvdzogbnVsbCxcbiAgICB3aWR0aDogVyxcbiAgICBoZWlnaHQ6IEgsXG4gICAgcHJvamVjdGlvblR5cGU6IGNjLnJlbmRlcmVyLnNjZW5lLkNhbWVyYVByb2plY3Rpb24uT1JUSE8sXG4gICAgbmVhckNsaXA6IDAuMSxcbiAgICBub2RlOiBjYW1Ob2RlLFxuICAgIGdldCBmb3J3YXJkKCkge1xuICAgICAgICByZXR1cm4gbmV3IGNjLlZlYzMoMCwgLTEsIDApO1xuICAgIH0sXG4gICAgZ2VvbWV0cnlSZW5kZXJlcjogZ2VvbWV0cnksXG4gICAgaW5pdEdlb21ldHJ5UmVuZGVyZXIoKSB7fSxcbiAgICB3b3JsZFRvU2NyZWVuKG91dDogYW55LCBwOiBhbnkpIHtcbiAgICAgICAgb3V0LnggPSBwLnggKiBQWCArIFcgLyAyO1xuICAgICAgICBvdXQueSA9IC1wLnogKiBQWCArIEggLyAyO1xuICAgICAgICBvdXQueiA9IDAuNTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuICAgIHNjcmVlblBvaW50VG9SYXkocmF5OiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHJheS5vLnNldCgoeCAtIFcgLyAyKSAvIFBYLCAxMDAsIC0oeSAtIEggLyAyKSAvIFBYKTtcbiAgICAgICAgcmF5LmQuc2V0KDAsIC0xLCAwKTtcbiAgICAgICAgcmV0dXJuIHJheTtcbiAgICB9LFxufTtcblxuY29uc3QgbWFpbldpbmRvdyA9IHt9O1xuY2FtZXJhLndpbmRvdyA9IG1haW5XaW5kb3c7XG5jYy5kaXJlY3Rvci5yb290ID0geyBtYWluV2luZG93LCBjYW1lcmFMaXN0OiBbY2FtZXJhXSB9O1xuXG4vKiogU2NyZWVuIHBvc2l0aW9uIG9mIGEgd29ybGQgcG9pbnQgKGJvdHRvbS1sZWZ0IG9yaWdpbiwgbGlrZSB0aGUgZW5naW5lKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY3JlZW4oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuICAgIHJldHVybiB7IHg6IHggKiBQWCArIFcgLyAyLCB5OiAteiAqIFBYICsgSCAvIDIgfTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjY2VcblxudHlwZSBMaXN0ZW5lciA9IHsgZm46IChldjogYW55KSA9PiBhbnk7IHByaW9yaXR5OiBudW1iZXIgfTtcbmNvbnN0IG9wTGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIExpc3RlbmVyW10+KCk7XG5cbmV4cG9ydCBsZXQgc2VsZWN0ZWROb2Rlczogc3RyaW5nW10gPSBbXTtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgc2VsZWN0ZWROb2RlcyA9IGlkcztcbn1cblxuZXhwb3J0IGNvbnN0IGNjZTogYW55ID0ge1xuICAgIE9wZXJhdGlvbjoge1xuICAgICAgICBhZGRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGZuOiBhbnksIHByaW9yaXR5ID0gMCkge1xuICAgICAgICAgICAgY29uc3QgbCA9IG9wTGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXTtcbiAgICAgICAgICAgIGwucHVzaCh7IGZuLCBwcmlvcml0eSB9KTtcbiAgICAgICAgICAgIGwuc29ydCgoYSwgYikgPT4gYi5wcmlvcml0eSAtIGEucHJpb3JpdHkpO1xuICAgICAgICAgICAgb3BMaXN0ZW5lcnMuc2V0KHR5cGUsIGwpO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGZuOiBhbnkpIHtcbiAgICAgICAgICAgIG9wTGlzdGVuZXJzLnNldCh0eXBlLCAob3BMaXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdKS5maWx0ZXIoKGwpID0+IGwuZm4gIT09IGZuKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVtaXQodHlwZTogc3RyaW5nLCBldjogYW55KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGwgb2Ygb3BMaXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGwuZm4oZXYpID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBTZWxlY3Rpb246IHtcbiAgICAgICAgcXVlcnk6ICgpID0+IFsuLi5zZWxlY3RlZE5vZGVzXSxcbiAgICB9LFxuICAgIENhbWVyYTogeyBpczJEOiBmYWxzZSB9LFxuICAgIEdpem1vOiB7XG4gICAgICAgIHRyYW5zZm9ybVRvb2xOYW1lOiAncG9zaXRpb24nLFxuICAgICAgICBwaXZvdDogJ2NlbnRlcicsXG4gICAgICAgIGNvb3JkaW5hdGU6ICdnbG9iYWwnLFxuICAgICAgICBpczJEOiBmYWxzZSxcbiAgICAgICAgcXVlcnlUcmFuc2Zvcm1TbmFwQ29uZmlnczogKCkgPT4gKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IHg6IDEsIHk6IDEsIHo6IDEgfSwgcm90YXRpb246IDE1LCBzY2FsZTogMC4xLFxuICAgICAgICAgICAgaXNQb3NpdGlvblNuYXBFbmFibGVkOiBmYWxzZSwgaXNSb3RhdGlvblNuYXBFbmFibGVkOiBmYWxzZSwgaXNTY2FsZVNuYXBFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgfSksXG4gICAgfSxcbiAgICBFbmdpbmU6IHtcbiAgICAgICAgcmVwYWludEluRWRpdE1vZGUoKSB7XG4gICAgICAgICAgICBsb2cucmVwYWludHMrKztcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIFNjZW5lRmFjYWRlTWFuYWdlcjoge1xuICAgICAgICByZW1vdmVOb2RlKG9wdHM6IGFueSkge1xuICAgICAgICAgICAgbG9nLnJlbW92ZWQucHVzaChvcHRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0QWxsTm9kZXMoKSB7XG4gICAgICAgICAgICBsb2cuc2VsZWN0QWxsTm9kZXMrKztcbiAgICAgICAgfSxcbiAgICB9LFxufTtcblxuLy8gVGhlIGVkaXRvcidzIG93biBoYW5kbGVycywgYmVsb3cgdGhlIGV4dGVuc2lvbidzIHByaW9yaXR5LlxuZm9yIChjb25zdCB0eXBlIG9mIFsnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJywgJ2RibGNsaWNrJywgJ2tleWRvd24nXSkge1xuICAgIGNjZS5PcGVyYXRpb24uYWRkTGlzdGVuZXIodHlwZSwgKCkgPT4ge1xuICAgICAgICBsb2cuZWRpdG9yRXZlbnRzLnB1c2godHlwZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIDk4KTtcbn1cblxuKGdsb2JhbFRoaXMgYXMgYW55KS5jY2UgPSBjY2U7XG4oZ2xvYmFsVGhpcyBhcyBhbnkpLkVkaXRvckV4dGVuZHMgPSB7XG4gICAgTm9kZToge1xuICAgICAgICBnZXROb2RlOiAodXVpZDogc3RyaW5nKSA9PiBmaW5kTm9kZSh1dWlkKSxcbiAgICAgICAgZW1pdDogKHR5cGU6IHN0cmluZywgdXVpZDogc3RyaW5nKSA9PiBsb2cuY2hhbmdlcy5wdXNoKGAke3R5cGV9OiR7dXVpZH1gKSxcbiAgICB9LFxuICAgIENvbXBvbmVudDoge1xuICAgICAgICBnZXRDb21wb25lbnQ6ICh1dWlkOiBzdHJpbmcpID0+IGZpbmRDb21wb25lbnQodXVpZCksXG4gICAgfSxcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRWRpdG9yXG5cbmxldCB1bmRvU2VxID0gMDtcbmV4cG9ydCBsZXQgc2NlbmVNZXRob2RzOiBSZWNvcmQ8c3RyaW5nLCAoLi4uYXJnczogYW55W10pID0+IGFueT4gPSB7fTtcbmV4cG9ydCBmdW5jdGlvbiBzZXRTY2VuZU1ldGhvZHMobTogUmVjb3JkPHN0cmluZywgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk+KSB7XG4gICAgc2NlbmVNZXRob2RzID0gbTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdChwa2c6IHN0cmluZywgbXNnOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogUHJvbWlzZTxhbnk+IHtcbiAgICBsb2cucmVxdWVzdHMucHVzaCh7IG1zZywgYXJncyB9KTtcbiAgICBpZiAocGtnICE9PSAnc2NlbmUnKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHN3aXRjaCAobXNnKSB7XG4gICAgICAgIGNhc2UgJ2JlZ2luLXJlY29yZGluZyc6XG4gICAgICAgICAgICByZXR1cm4gYHVuZG8tJHsrK3VuZG9TZXF9YDtcbiAgICAgICAgY2FzZSAnZW5kLXJlY29yZGluZyc6XG4gICAgICAgIGNhc2UgJ2NhbmNlbC1yZWNvcmRpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNhc2UgJ2NyZWF0ZS1ub2RlJzoge1xuICAgICAgICAgICAgY29uc3QgbyA9IGFyZ3NbMF0gfHwge307XG4gICAgICAgICAgICBjb25zdCBuID0gbmV3IGNjLk5vZGUoby5uYW1lIHx8ICdOb2RlJyk7XG4gICAgICAgICAgICBuLnNldFBhcmVudCgoby5wYXJlbnQgJiYgZmluZE5vZGUoby5wYXJlbnQpKSB8fCBzY2VuZSk7XG4gICAgICAgICAgICByZXR1cm4gbi51dWlkO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NyZWF0ZS1jb21wb25lbnQnOiB7XG4gICAgICAgICAgICBjb25zdCBvID0gYXJnc1swXTtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBmaW5kTm9kZShvLnV1aWQpO1xuICAgICAgICAgICAgY29uc3QgQyA9IGNjLmpzLmdldENsYXNzQnlOYW1lKG8uY29tcG9uZW50KTtcbiAgICAgICAgICAgIGlmIChuICYmIEMpIG4uYWRkQ29tcG9uZW50KEMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnOiB7XG4gICAgICAgICAgICBjb25zdCBvID0gYXJnc1swXTtcbiAgICAgICAgICAgIHJldHVybiBzY2VuZU1ldGhvZHNbby5tZXRob2RdPy4oLi4uKG8uYXJncyB8fCBbXSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbihnbG9iYWxUaGlzIGFzIGFueSkuRWRpdG9yID0ge1xuICAgIEFwcDogeyBwYXRoOiBfX2Rpcm5hbWUsIHZlcnNpb246ICd0ZXN0JyB9LFxuICAgIE1lc3NhZ2U6IHtcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgYnJvYWRjYXN0KG1zZzogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgICAgIGxvZy5icm9hZGNhc3RzLnB1c2goeyBtc2csIGRhdGEgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIF9fcHJvdGVjdGVkX186IHtcbiAgICAgICAgICAgIGFkZEJyb2FkY2FzdExpc3RlbmVyKCkge30sXG4gICAgICAgICAgICByZW1vdmVCcm9hZGNhc3RMaXN0ZW5lcigpIHt9LFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgUHJvZmlsZToge1xuICAgICAgICBnZXRDb25maWc6IGFzeW5jICgpID0+IHVuZGVmaW5lZCxcbiAgICAgICAgc2V0Q29uZmlnOiBhc3luYyAoKSA9PiB1bmRlZmluZWQsXG4gICAgfSxcbiAgICBTZWxlY3Rpb246IHtcbiAgICAgICAgY2xlYXIoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZE5vZGVzID0gW107XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdChfdHlwZTogc3RyaW5nLCB1dWlkOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkTm9kZXMgPSBbLi4uc2VsZWN0ZWROb2RlcywgdXVpZF07XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNlbGVjdGVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5zZWxlY3RlZE5vZGVzXTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcblxuY29uc3Qgd2luZG93TGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+KCk7XG4oZ2xvYmFsVGhpcyBhcyBhbnkpLndpbmRvdyA9IHtcbiAgICBhZGRFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGwgPSB3aW5kb3dMaXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdO1xuICAgICAgICBsLnB1c2goZm4pO1xuICAgICAgICB3aW5kb3dMaXN0ZW5lcnMuc2V0KHR5cGUsIGwpO1xuICAgIH0sXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAgICAgICB3aW5kb3dMaXN0ZW5lcnMuc2V0KHR5cGUsICh3aW5kb3dMaXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdKS5maWx0ZXIoKGYpID0+IGYgIT09IGZuKSk7XG4gICAgfSxcbn07XG5cbi8qKiBEaXNwYXRjaGVzIGEgRE9NLWxpa2Uga2V5IGV2ZW50IHRvIHdpbmRvdyBsaXN0ZW5lcnMuICovXG5leHBvcnQgZnVuY3Rpb24gZG9tS2V5KGtleTogc3RyaW5nLCBtb2RzOiB7IGN0cmxLZXk/OiBib29sZWFuIH0gPSB7fSkge1xuICAgIGNvbnN0IGV2ID0ge1xuICAgICAgICBrZXksIGN0cmxLZXk6ICEhbW9kcy5jdHJsS2V5LCBtZXRhS2V5OiBmYWxzZSwgdGFyZ2V0OiBudWxsLFxuICAgICAgICBkZWZhdWx0UHJldmVudGVkOiBmYWxzZSwgc3RvcHBlZDogZmFsc2UsXG4gICAgICAgIHByZXZlbnREZWZhdWx0KCkgeyB0aGlzLmRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9LFxuICAgICAgICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSB7IHRoaXMuc3RvcHBlZCA9IHRydWU7IH0sXG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IGYgb2Ygd2luZG93TGlzdGVuZXJzLmdldCgna2V5ZG93bicpIHx8IFtdKSBmKGV2KTtcbiAgICByZXR1cm4gZXY7XG59XG5cbmV4cG9ydCB7IGNjIH07XG4iLCAiaW1wb3J0IHsgX2RlY29yYXRvciwgY2NlbnVtLCBRdWF0LCBWZWMzIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgREVGQVVMVF9URU5TSU9OLCBLbm90TGlrZSwgVGFuZ2VudE1vZGUgfSBmcm9tICcuLi9jb3JlL3NwbGluZS1jb3JlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuY2NlbnVtKFRhbmdlbnRNb2RlKTtcblxuLyoqXG4gKiBBIGNvbnRyb2wgcG9pbnQgb2YgYSBzcGxpbmU6IGEgcG9zaXRpb24sIGEgcm90YXRpb24gYW5kIHR3byB0YW5nZW50cy5cbiAqXG4gKiBUYW5nZW50cyBhcmUgaW4gdGhlIGtub3QncyBvd24gc3BhY2U6ICtaIGlzIHRoZSBkaXJlY3Rpb24gdGhlIHNwbGluZVxuICogdHJhdmVscyB0aHJvdWdoIHRoZSBrbm90IGFuZCArWSBpcyB0aGUga25vdCdzIHVwIHZlY3Rvci4gSG93IHRoZSB0YW5nZW50c1xuICogYXJlIGtlcHQgZGVwZW5kcyBvbiBgbW9kZWAgKHNlZSBUYW5nZW50TW9kZSkuXG4gKi9cbkBjY2NsYXNzKCdzcGxpbmVzLkJlemllcktub3QnKVxuZXhwb3J0IGNsYXNzIEJlemllcktub3QgaW1wbGVtZW50cyBLbm90TGlrZSB7XG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1Bvc2l0aW9uIGluIHRoZSBzcGxpbmUgY29udGFpbmVyXHUyMDE5cyBsb2NhbCBzcGFjZS4nIH0pXG4gICAgcG9zaXRpb24gPSBuZXcgVmVjMygpO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ0luIHRhbmdlbnQsIGluIHRoZSBrbm90XHUyMDE5cyBzcGFjZSAocG9pbnRzIGJhY2t3YXJkcyBhbG9uZyAtWikuJyB9KVxuICAgIHRhbmdlbnRJbiA9IG5ldyBWZWMzKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnT3V0IHRhbmdlbnQsIGluIHRoZSBrbm90XHUyMDE5cyBzcGFjZSAocG9pbnRzIGZvcndhcmRzIGFsb25nICtaKS4nIH0pXG4gICAgdGFuZ2VudE91dCA9IG5ldyBWZWMzKCk7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnS25vdCByb3RhdGlvbjogK1ogaXMgdGhlIGRpcmVjdGlvbiBvZiB0cmF2ZWwsICtZIHRoZSB1cCB2ZWN0b3IuJyB9KVxuICAgIHJvdGF0aW9uID0gbmV3IFF1YXQoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFRhbmdlbnRNb2RlLCB0b29sdGlwOiAnSG93IHRoZSB0YW5nZW50cyBhcmUga2VwdC4nIH0pXG4gICAgbW9kZTogVGFuZ2VudE1vZGUgPSBUYW5nZW50TW9kZS5BdXRvU21vb3RoO1xuXG4gICAgQHByb3BlcnR5KHsgcmFuZ2U6IFswLCAxLCAwLjAxXSwgc2xpZGU6IHRydWUsIHRvb2x0aXA6ICdBdXRvIFNtb290aCB0ZW5zaW9uICgwIHVuaWZvcm0sIDAuNSBjZW50cmlwZXRhbCwgMSBjaG9yZGFsKS4nIH0pXG4gICAgdGVuc2lvbiA9IERFRkFVTFRfVEVOU0lPTjtcblxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uPzogUmVhZG9ubHk8VmVjMz4sIHRhbmdlbnRJbj86IFJlYWRvbmx5PFZlYzM+LCB0YW5nZW50T3V0PzogUmVhZG9ubHk8VmVjMz4sIHJvdGF0aW9uPzogUmVhZG9ubHk8UXVhdD4sIG1vZGU/OiBUYW5nZW50TW9kZSkge1xuICAgICAgICBpZiAocG9zaXRpb24pIHRoaXMucG9zaXRpb24uc2V0KHBvc2l0aW9uKTtcbiAgICAgICAgaWYgKHRhbmdlbnRJbikgdGhpcy50YW5nZW50SW4uc2V0KHRhbmdlbnRJbik7XG4gICAgICAgIGlmICh0YW5nZW50T3V0KSB0aGlzLnRhbmdlbnRPdXQuc2V0KHRhbmdlbnRPdXQpO1xuICAgICAgICBpZiAocm90YXRpb24pIHRoaXMucm90YXRpb24uc2V0KHJvdGF0aW9uKTtcbiAgICAgICAgaWYgKG1vZGUgIT09IHVuZGVmaW5lZCkgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB9XG5cbiAgICBjbG9uZSgpOiBCZXppZXJLbm90IHtcbiAgICAgICAgY29uc3QgayA9IG5ldyBCZXppZXJLbm90KHRoaXMucG9zaXRpb24sIHRoaXMudGFuZ2VudEluLCB0aGlzLnRhbmdlbnRPdXQsIHRoaXMucm90YXRpb24sIHRoaXMubW9kZSk7XG4gICAgICAgIGsudGVuc2lvbiA9IHRoaXMudGVuc2lvbjtcbiAgICAgICAgcmV0dXJuIGs7XG4gICAgfVxufVxuXG5leHBvcnQgeyBUYW5nZW50TW9kZSB9O1xuIiwgIi8qKlxuICogU21hbGwgdmVjdG9yIC8gcXVhdGVybmlvbiBoZWxwZXJzIG9uIHBsYWluIHt4LCB5LCB6fSBvYmplY3RzLlxuICpcbiAqIFRoZSBzcGxpbmUgY29yZSB1c2VzIHRoZXNlIGluc3RlYWQgb2YgY2MuVmVjMyBzbyBpdCBoYXMgbm8gZW5naW5lXG4gKiBkZXBlbmRlbmN5OiBjYy5WZWMzIC8gY2MuUXVhdCBzYXRpc2Z5IHRoZSBpbnRlcmZhY2VzLCBhbmQgdGhlIGNvcmUgY2FuIGJlXG4gKiB1bml0LXRlc3RlZCBvdXRzaWRlIHRoZSBlZGl0b3IuXG4gKlxuICogS25vdCBzcGFjZSBmb2xsb3dzIFVuaXR5J3MgY29udmVudGlvbjogYSBrbm90J3MgbG9jYWwgK1ogaXMgdGhlIGRpcmVjdGlvblxuICogb2YgaXRzIG91dCB0YW5nZW50IGFuZCBsb2NhbCArWSBpcyBpdHMgdXAgdmVjdG9yLlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgVjMge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgejogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFE0IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHo6IG51bWJlcjtcbiAgICB3OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBFUFNJTE9OID0gMWUtNjtcblxuZXhwb3J0IGZ1bmN0aW9uIHYzKHggPSAwLCB5ID0gMCwgeiA9IDApOiBWMyB7XG4gICAgcmV0dXJuIHsgeCwgeSwgeiB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcTQoeCA9IDAsIHkgPSAwLCB6ID0gMCwgdyA9IDEpOiBRNCB7XG4gICAgcmV0dXJuIHsgeCwgeSwgeiwgdyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0PFQgZXh0ZW5kcyBWMz4ob3V0OiBULCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogVCB7XG4gICAgb3V0LnggPSB4O1xuICAgIG91dC55ID0geTtcbiAgICBvdXQueiA9IHo7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHk8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzKTogVCB7XG4gICAgb3V0LnggPSBhLng7XG4gICAgb3V0LnkgPSBhLnk7XG4gICAgb3V0LnogPSBhLno7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGE6IFYzKTogVjMge1xuICAgIHJldHVybiB7IHg6IGEueCwgeTogYS55LCB6OiBhLnogfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZDxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMsIGI6IFYzKTogVCB7XG4gICAgb3V0LnggPSBhLnggKyBiLng7XG4gICAgb3V0LnkgPSBhLnkgKyBiLnk7XG4gICAgb3V0LnogPSBhLnogKyBiLno7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YjxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMsIGI6IFYzKTogVCB7XG4gICAgb3V0LnggPSBhLnggLSBiLng7XG4gICAgb3V0LnkgPSBhLnkgLSBiLnk7XG4gICAgb3V0LnogPSBhLnogLSBiLno7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMywgczogbnVtYmVyKTogVCB7XG4gICAgb3V0LnggPSBhLnggKiBzO1xuICAgIG91dC55ID0gYS55ICogcztcbiAgICBvdXQueiA9IGEueiAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqIG91dCA9IGEgKyBiICogcyAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQW5kQWRkPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMywgYjogVjMsIHM6IG51bWJlcik6IFQge1xuICAgIG91dC54ID0gYS54ICsgYi54ICogcztcbiAgICBvdXQueSA9IGEueSArIGIueSAqIHM7XG4gICAgb3V0LnogPSBhLnogKyBiLnogKiBzO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZWdhdGU8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzKTogVCB7XG4gICAgb3V0LnggPSAtYS54O1xuICAgIG91dC55ID0gLWEueTtcbiAgICBvdXQueiA9IC1hLno7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvdChhOiBWMywgYjogVjMpOiBudW1iZXIge1xuICAgIHJldHVybiBhLnggKiBiLnggKyBhLnkgKiBiLnkgKyBhLnogKiBiLno7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcm9zczxUIGV4dGVuZHMgVjM+KG91dDogVCwgYTogVjMsIGI6IFYzKTogVCB7XG4gICAgY29uc3QgeCA9IGEueSAqIGIueiAtIGEueiAqIGIueTtcbiAgICBjb25zdCB5ID0gYS56ICogYi54IC0gYS54ICogYi56O1xuICAgIGNvbnN0IHogPSBhLnggKiBiLnkgLSBhLnkgKiBiLng7XG4gICAgb3V0LnggPSB4O1xuICAgIG91dC55ID0geTtcbiAgICBvdXQueiA9IHo7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlblNxKGE6IFYzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGVuKGE6IFYzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEueik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0U3EoYTogVjMsIGI6IFYzKTogbnVtYmVyIHtcbiAgICBjb25zdCB4ID0gYS54IC0gYi54O1xuICAgIGNvbnN0IHkgPSBhLnkgLSBiLnk7XG4gICAgY29uc3QgeiA9IGEueiAtIGIuejtcbiAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzdChhOiBWMywgYjogVjMpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQoZGlzdFNxKGEsIGIpKTtcbn1cblxuLyoqIE5vcm1hbGl6ZXMgYGFgIGludG8gYG91dGA7IGEgemVybyB2ZWN0b3Igc3RheXMgemVyby4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemU8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGE6IFYzKTogVCB7XG4gICAgY29uc3QgbCA9IGxlbihhKTtcbiAgICBpZiAobCA8IEVQU0lMT04pIHJldHVybiBzZXQob3V0LCAwLCAwLCAwKTtcbiAgICByZXR1cm4gc2NhbGUob3V0LCBhLCAxIC8gbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZXJwPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMywgYjogVjMsIHQ6IG51bWJlcik6IFQge1xuICAgIG91dC54ID0gYS54ICsgKGIueCAtIGEueCkgKiB0O1xuICAgIG91dC55ID0gYS55ICsgKGIueSAtIGEueSkgKiB0O1xuICAgIG91dC56ID0gYS56ICsgKGIueiAtIGEueikgKiB0O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYTogVjMsIGI6IFYzLCBlcHMgPSBFUFNJTE9OKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEueCAtIGIueCkgPD0gZXBzICYmIE1hdGguYWJzKGEueSAtIGIueSkgPD0gZXBzICYmIE1hdGguYWJzKGEueiAtIGIueikgPD0gZXBzO1xufVxuXG4vKiogQW55IHVuaXQgdmVjdG9yIHBlcnBlbmRpY3VsYXIgdG8gYGFgICh3aGljaCBtdXN0IG5vdCBiZSB6ZXJvKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbnlQZXJwZW5kaWN1bGFyPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBhOiBWMyk6IFQge1xuICAgIC8vIENyb3NzIHdpdGggdGhlIGF4aXMgbGVhc3QgYWxpZ25lZCB3aXRoIGBhYC5cbiAgICBjb25zdCBheCA9IE1hdGguYWJzKGEueCk7XG4gICAgY29uc3QgYXkgPSBNYXRoLmFicyhhLnkpO1xuICAgIGNvbnN0IGF6ID0gTWF0aC5hYnMoYS56KTtcbiAgICBpZiAoYXggPD0gYXkgJiYgYXggPD0gYXopIGNyb3NzKG91dCwgYSwgeyB4OiAxLCB5OiAwLCB6OiAwIH0pO1xuICAgIGVsc2UgaWYgKGF5IDw9IGF6KSBjcm9zcyhvdXQsIGEsIHsgeDogMCwgeTogMSwgejogMCB9KTtcbiAgICBlbHNlIGNyb3NzKG91dCwgYSwgeyB4OiAwLCB5OiAwLCB6OiAxIH0pO1xuICAgIHJldHVybiBub3JtYWxpemUob3V0LCBvdXQpO1xufVxuXG4vKiogUmVtb3ZlcyB0aGUgcGFydCBvZiBgdmAgYWxvbmcgdW5pdCB2ZWN0b3IgYG5gLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2plY3RPblBsYW5lPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCB2OiBWMywgbjogVjMpOiBUIHtcbiAgICBjb25zdCBkID0gZG90KHYsIG4pO1xuICAgIHJldHVybiBzY2FsZUFuZEFkZChvdXQsIHYsIG4sIC1kKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHF1YXRlcm5pb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBxU2V0PFQgZXh0ZW5kcyBRND4ob3V0OiBULCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIpOiBUIHtcbiAgICBvdXQueCA9IHg7XG4gICAgb3V0LnkgPSB5O1xuICAgIG91dC56ID0gejtcbiAgICBvdXQudyA9IHc7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHFDb3B5PFQgZXh0ZW5kcyBRND4ob3V0OiBULCBhOiBRNCk6IFQge1xuICAgIHJldHVybiBxU2V0KG91dCwgYS54LCBhLnksIGEueiwgYS53KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHFJZGVudGl0eTxUIGV4dGVuZHMgUTQ+KG91dDogVCk6IFQge1xuICAgIHJldHVybiBxU2V0KG91dCwgMCwgMCwgMCwgMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxTXVsPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBhOiBRNCwgYjogUTQpOiBUIHtcbiAgICBjb25zdCB4ID0gYS53ICogYi54ICsgYS54ICogYi53ICsgYS55ICogYi56IC0gYS56ICogYi55O1xuICAgIGNvbnN0IHkgPSBhLncgKiBiLnkgLSBhLnggKiBiLnogKyBhLnkgKiBiLncgKyBhLnogKiBiLng7XG4gICAgY29uc3QgeiA9IGEudyAqIGIueiArIGEueCAqIGIueSAtIGEueSAqIGIueCArIGEueiAqIGIudztcbiAgICBjb25zdCB3ID0gYS53ICogYi53IC0gYS54ICogYi54IC0gYS55ICogYi55IC0gYS56ICogYi56O1xuICAgIHJldHVybiBxU2V0KG91dCwgeCwgeSwgeiwgdyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxTm9ybWFsaXplPFQgZXh0ZW5kcyBRND4ob3V0OiBULCBhOiBRNCk6IFQge1xuICAgIGNvbnN0IGwgPSBNYXRoLnNxcnQoYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56ICsgYS53ICogYS53KTtcbiAgICBpZiAobCA8IEVQU0lMT04pIHJldHVybiBxSWRlbnRpdHkob3V0KTtcbiAgICByZXR1cm4gcVNldChvdXQsIGEueCAvIGwsIGEueSAvIGwsIGEueiAvIGwsIGEudyAvIGwpO1xufVxuXG4vKiogSW52ZXJzZSBvZiBhIHVuaXQgcXVhdGVybmlvbiAoaXRzIGNvbmp1Z2F0ZSkuICovXG5leHBvcnQgZnVuY3Rpb24gcUludmVydDxUIGV4dGVuZHMgUTQ+KG91dDogVCwgYTogUTQpOiBUIHtcbiAgICBjb25zdCBsID0gYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56ICsgYS53ICogYS53O1xuICAgIGlmIChsIDwgRVBTSUxPTikgcmV0dXJuIHFJZGVudGl0eShvdXQpO1xuICAgIHJldHVybiBxU2V0KG91dCwgLWEueCAvIGwsIC1hLnkgLyBsLCAtYS56IC8gbCwgYS53IC8gbCk7XG59XG5cbi8qKiBSb3RhdGVzIHZlY3RvciBgdmAgYnkgcXVhdGVybmlvbiBgcWAuICovXG5leHBvcnQgZnVuY3Rpb24gcVJvdGF0ZTxUIGV4dGVuZHMgVjM+KG91dDogVCwgcTogUTQsIHY6IFYzKTogVCB7XG4gICAgLy8gdCA9IDIgKiBjcm9zcyhxLnh5eiwgdik7IHYnID0gdiArIHcgKiB0ICsgY3Jvc3MocS54eXosIHQpXG4gICAgY29uc3QgdHggPSAyICogKHEueSAqIHYueiAtIHEueiAqIHYueSk7XG4gICAgY29uc3QgdHkgPSAyICogKHEueiAqIHYueCAtIHEueCAqIHYueik7XG4gICAgY29uc3QgdHogPSAyICogKHEueCAqIHYueSAtIHEueSAqIHYueCk7XG4gICAgY29uc3QgeCA9IHYueCArIHEudyAqIHR4ICsgKHEueSAqIHR6IC0gcS56ICogdHkpO1xuICAgIGNvbnN0IHkgPSB2LnkgKyBxLncgKiB0eSArIChxLnogKiB0eCAtIHEueCAqIHR6KTtcbiAgICBjb25zdCB6ID0gdi56ICsgcS53ICogdHogKyAocS54ICogdHkgLSBxLnkgKiB0eCk7XG4gICAgcmV0dXJuIHNldChvdXQsIHgsIHksIHopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcUZyb21BeGlzQW5nbGU8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGF4aXM6IFYzLCByYWQ6IG51bWJlcik6IFQge1xuICAgIGNvbnN0IG4gPSBub3JtYWxpemUodjMoKSwgYXhpcyk7XG4gICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCAvIDIpO1xuICAgIHJldHVybiBxU2V0KG91dCwgbi54ICogcywgbi55ICogcywgbi56ICogcywgTWF0aC5jb3MocmFkIC8gMikpO1xufVxuXG4vKiogUm90YXRpb24gbWF0cml4IGNvbHVtbnMgKHgsIHksIHogYXhlcykgdG8gcXVhdGVybmlvbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxRnJvbUF4ZXM8VCBleHRlbmRzIFE0PihvdXQ6IFQsIHg6IFYzLCB5OiBWMywgejogVjMpOiBUIHtcbiAgICBjb25zdCBtMDAgPSB4LngsIG0wMSA9IHkueCwgbTAyID0gei54O1xuICAgIGNvbnN0IG0xMCA9IHgueSwgbTExID0geS55LCBtMTIgPSB6Lnk7XG4gICAgY29uc3QgbTIwID0geC56LCBtMjEgPSB5LnosIG0yMiA9IHouejtcbiAgICBjb25zdCB0cmFjZSA9IG0wMCArIG0xMSArIG0yMjtcbiAgICBpZiAodHJhY2UgPiAwKSB7XG4gICAgICAgIGNvbnN0IHMgPSAwLjUgLyBNYXRoLnNxcnQodHJhY2UgKyAxKTtcbiAgICAgICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxU2V0KG91dCwgKG0yMSAtIG0xMikgKiBzLCAobTAyIC0gbTIwKSAqIHMsIChtMTAgLSBtMDEpICogcywgMC4yNSAvIHMpKTtcbiAgICB9XG4gICAgaWYgKG0wMCA+IG0xMSAmJiBtMDAgPiBtMjIpIHtcbiAgICAgICAgY29uc3QgcyA9IDIgKiBNYXRoLnNxcnQoMSArIG0wMCAtIG0xMSAtIG0yMik7XG4gICAgICAgIHJldHVybiBxTm9ybWFsaXplKG91dCwgcVNldChvdXQsIDAuMjUgKiBzLCAobTAxICsgbTEwKSAvIHMsIChtMDIgKyBtMjApIC8gcywgKG0yMSAtIG0xMikgLyBzKSk7XG4gICAgfVxuICAgIGlmIChtMTEgPiBtMjIpIHtcbiAgICAgICAgY29uc3QgcyA9IDIgKiBNYXRoLnNxcnQoMSArIG0xMSAtIG0wMCAtIG0yMik7XG4gICAgICAgIHJldHVybiBxTm9ybWFsaXplKG91dCwgcVNldChvdXQsIChtMDEgKyBtMTApIC8gcywgMC4yNSAqIHMsIChtMTIgKyBtMjEpIC8gcywgKG0wMiAtIG0yMCkgLyBzKSk7XG4gICAgfVxuICAgIGNvbnN0IHMgPSAyICogTWF0aC5zcXJ0KDEgKyBtMjIgLSBtMDAgLSBtMTEpO1xuICAgIHJldHVybiBxTm9ybWFsaXplKG91dCwgcVNldChvdXQsIChtMDIgKyBtMjApIC8gcywgKG0xMiArIG0yMSkgLyBzLCAwLjI1ICogcywgKG0xMCAtIG0wMSkgLyBzKSk7XG59XG5cbi8qKlxuICogUm90YXRpb24gdGhhdCBtYXBzICtaIHRvIGBmb3J3YXJkYCBhbmQgK1kgYXMgY2xvc2UgYXMgcG9zc2libGUgdG8gYHVwYFxuICogKFVuaXR5J3MgTG9va1JvdGF0aW9uKS4gRGVnZW5lcmF0ZSBpbnB1dCBmYWxscyBiYWNrIHRvIGEgcGVycGVuZGljdWxhciB1cC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFMb29rUm90YXRpb248VCBleHRlbmRzIFE0PihvdXQ6IFQsIGZvcndhcmQ6IFYzLCB1cDogVjMpOiBUIHtcbiAgICBjb25zdCB6ID0gbm9ybWFsaXplKHYzKCksIGZvcndhcmQpO1xuICAgIGlmIChsZW5TcSh6KSA8IEVQU0lMT04pIHJldHVybiBxSWRlbnRpdHkob3V0KTtcbiAgICBjb25zdCB4ID0gY3Jvc3ModjMoKSwgdXAsIHopO1xuICAgIGlmIChsZW5TcSh4KSA8IEVQU0lMT04pIHtcbiAgICAgICAgLy8gdXAgaXMgcGFyYWxsZWwgdG8gZm9yd2FyZDoga2VlcCBhIHN0YWJsZSBwZXJwZW5kaWN1bGFyLlxuICAgICAgICBhbnlQZXJwZW5kaWN1bGFyKHgsIHopO1xuICAgIH1cbiAgICBub3JtYWxpemUoeCwgeCk7XG4gICAgY29uc3QgeSA9IGNyb3NzKHYzKCksIHosIHgpO1xuICAgIHJldHVybiBxRnJvbUF4ZXMob3V0LCB4LCB5LCB6KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHFTbGVycDxUIGV4dGVuZHMgUTQ+KG91dDogVCwgYTogUTQsIGI6IFE0LCB0OiBudW1iZXIpOiBUIHtcbiAgICBsZXQgYnggPSBiLngsIGJ5ID0gYi55LCBieiA9IGIueiwgYncgPSBiLnc7XG4gICAgbGV0IGNvcyA9IGEueCAqIGJ4ICsgYS55ICogYnkgKyBhLnogKiBieiArIGEudyAqIGJ3O1xuICAgIGlmIChjb3MgPCAwKSB7XG4gICAgICAgIGNvcyA9IC1jb3M7XG4gICAgICAgIGJ4ID0gLWJ4O1xuICAgICAgICBieSA9IC1ieTtcbiAgICAgICAgYnogPSAtYno7XG4gICAgICAgIGJ3ID0gLWJ3O1xuICAgIH1cbiAgICBsZXQgczA6IG51bWJlcjtcbiAgICBsZXQgczE6IG51bWJlcjtcbiAgICBpZiAoMSAtIGNvcyA+IEVQU0lMT04pIHtcbiAgICAgICAgY29uc3Qgb21lZ2EgPSBNYXRoLmFjb3MoTWF0aC5taW4oMSwgY29zKSk7XG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKG9tZWdhKTtcbiAgICAgICAgczAgPSBNYXRoLnNpbigoMSAtIHQpICogb21lZ2EpIC8gc2luO1xuICAgICAgICBzMSA9IE1hdGguc2luKHQgKiBvbWVnYSkgLyBzaW47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgczAgPSAxIC0gdDtcbiAgICAgICAgczEgPSB0O1xuICAgIH1cbiAgICByZXR1cm4gcU5vcm1hbGl6ZShvdXQsIHFTZXQob3V0LCBzMCAqIGEueCArIHMxICogYngsIHMwICogYS55ICsgczEgKiBieSwgczAgKiBhLnogKyBzMSAqIGJ6LCBzMCAqIGEudyArIHMxICogYncpKTtcbn1cblxuLyoqIFJvdGF0aW9uIHRha2luZyB1bml0IHZlY3RvciBgZnJvbWAgb250byB1bml0IHZlY3RvciBgdG9gIChzaG9ydGVzdCBhcmMpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFGcm9tVG88VCBleHRlbmRzIFE0PihvdXQ6IFQsIGZyb206IFYzLCB0bzogVjMpOiBUIHtcbiAgICBjb25zdCBkID0gZG90KGZyb20sIHRvKTtcbiAgICBpZiAoZCA+PSAxIC0gRVBTSUxPTikgcmV0dXJuIHFJZGVudGl0eShvdXQpO1xuICAgIGlmIChkIDw9IC0xICsgRVBTSUxPTikge1xuICAgICAgICBjb25zdCBheGlzID0gYW55UGVycGVuZGljdWxhcih2MygpLCBmcm9tKTtcbiAgICAgICAgcmV0dXJuIHFTZXQob3V0LCBheGlzLngsIGF4aXMueSwgYXhpcy56LCAwKTtcbiAgICB9XG4gICAgY29uc3QgYyA9IGNyb3NzKHYzKCksIGZyb20sIHRvKTtcbiAgICByZXR1cm4gcU5vcm1hbGl6ZShvdXQsIHFTZXQob3V0LCBjLngsIGMueSwgYy56LCAxICsgZCkpO1xufVxuXG4vKiogRXVsZXIgYW5nbGVzIGluIGRlZ3JlZXMgKENvY29zIG9yZGVyOiByb3RhdGUgYXJvdW5kIFosIHRoZW4gWSwgdGhlbiBYLi4uIG1hdGNoaW5nIGNjLlF1YXQudG9FdWxlcikuICovXG5leHBvcnQgZnVuY3Rpb24gcVRvRXVsZXI8VCBleHRlbmRzIFYzPihvdXQ6IFQsIHE6IFE0KTogVCB7XG4gICAgLy8gU2FtZSBmb3JtdWxhIGFzIGNjLlF1YXQudG9FdWxlciAob3V0ZXJaID0gZmFsc2UpLlxuICAgIGNvbnN0IHsgeCwgeSwgeiwgdyB9ID0gcTtcbiAgICBsZXQgYmFuayA9IDA7XG4gICAgbGV0IGhlYWRpbmcgPSAwO1xuICAgIGxldCBhdHRpdHVkZSA9IDA7XG4gICAgY29uc3QgdGVzdCA9IHggKiB5ICsgeiAqIHc7XG4gICAgaWYgKHRlc3QgPiAwLjQ5OTk5OSkge1xuICAgICAgICBiYW5rID0gMDtcbiAgICAgICAgaGVhZGluZyA9ICgyICogTWF0aC5hdGFuMih4LCB3KSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgICAgICBhdHRpdHVkZSA9IDkwO1xuICAgIH0gZWxzZSBpZiAodGVzdCA8IC0wLjQ5OTk5OSkge1xuICAgICAgICBiYW5rID0gMDtcbiAgICAgICAgaGVhZGluZyA9ICgtMiAqIE1hdGguYXRhbjIoeCwgdykgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgYXR0aXR1ZGUgPSAtOTA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc3F4ID0geCAqIHg7XG4gICAgICAgIGNvbnN0IHNxeSA9IHkgKiB5O1xuICAgICAgICBjb25zdCBzcXogPSB6ICogejtcbiAgICAgICAgYmFuayA9IChNYXRoLmF0YW4yKDIgKiB4ICogdyAtIDIgKiB5ICogeiwgMSAtIDIgKiBzcXggLSAyICogc3F6KSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgICAgICBoZWFkaW5nID0gKE1hdGguYXRhbjIoMiAqIHkgKiB3IC0gMiAqIHggKiB6LCAxIC0gMiAqIHNxeSAtIDIgKiBzcXopICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIGF0dGl0dWRlID0gKE1hdGguYXNpbigyICogdGVzdCkgKiAxODApIC8gTWF0aC5QSTtcbiAgICB9XG4gICAgcmV0dXJuIHNldChvdXQsIGJhbmssIGhlYWRpbmcsIGF0dGl0dWRlKTtcbn1cblxuLyoqIEludmVyc2Ugb2YgcVRvRXVsZXIgKHNhbWUgYXMgY2MuUXVhdC5mcm9tRXVsZXIpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHFGcm9tRXVsZXI8VCBleHRlbmRzIFE0PihvdXQ6IFQsIGV4OiBudW1iZXIsIGV5OiBudW1iZXIsIGV6OiBudW1iZXIpOiBUIHtcbiAgICBjb25zdCBoYWxmVG9SYWQgPSAoMC41ICogTWF0aC5QSSkgLyAxODA7XG4gICAgY29uc3QgeCA9IGV4ICogaGFsZlRvUmFkO1xuICAgIGNvbnN0IHkgPSBleSAqIGhhbGZUb1JhZDtcbiAgICBjb25zdCB6ID0gZXogKiBoYWxmVG9SYWQ7XG4gICAgY29uc3Qgc3ggPSBNYXRoLnNpbih4KTtcbiAgICBjb25zdCBjeCA9IE1hdGguY29zKHgpO1xuICAgIGNvbnN0IHN5ID0gTWF0aC5zaW4oeSk7XG4gICAgY29uc3QgY3kgPSBNYXRoLmNvcyh5KTtcbiAgICBjb25zdCBzeiA9IE1hdGguc2luKHopO1xuICAgIGNvbnN0IGN6ID0gTWF0aC5jb3Moeik7XG4gICAgcmV0dXJuIHFTZXQoXG4gICAgICAgIG91dCxcbiAgICAgICAgc3ggKiBjeSAqIGN6ICsgY3ggKiBzeSAqIHN6LFxuICAgICAgICBjeCAqIHN5ICogY3ogKyBzeCAqIGN5ICogc3osXG4gICAgICAgIGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjeixcbiAgICAgICAgY3ggKiBjeSAqIGN6IC0gc3ggKiBzeSAqIHN6LFxuICAgICk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtYXRyaWNlc1xuXG4vKiogQ29sdW1uLW1ham9yIDR4NCBtYXRyaXgsIGxhaWQgb3V0IGxpa2UgY2MuTWF0NCAobTAwLi5tMTUpLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNNCB7XG4gICAgbTAwOiBudW1iZXI7IG0wMTogbnVtYmVyOyBtMDI6IG51bWJlcjsgbTAzOiBudW1iZXI7XG4gICAgbTA0OiBudW1iZXI7IG0wNTogbnVtYmVyOyBtMDY6IG51bWJlcjsgbTA3OiBudW1iZXI7XG4gICAgbTA4OiBudW1iZXI7IG0wOTogbnVtYmVyOyBtMTA6IG51bWJlcjsgbTExOiBudW1iZXI7XG4gICAgbTEyOiBudW1iZXI7IG0xMzogbnVtYmVyOyBtMTQ6IG51bWJlcjsgbTE1OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtNFRyYW5zZm9ybVBvaW50PFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBtOiBNNCwgcDogVjMpOiBUIHtcbiAgICBjb25zdCB7IHgsIHksIHogfSA9IHA7XG4gICAgbGV0IHcgPSBtLm0wMyAqIHggKyBtLm0wNyAqIHkgKyBtLm0xMSAqIHogKyBtLm0xNTtcbiAgICB3ID0gdyA/IDEgLyB3IDogMTtcbiAgICByZXR1cm4gc2V0KFxuICAgICAgICBvdXQsXG4gICAgICAgIChtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHogKyBtLm0xMikgKiB3LFxuICAgICAgICAobS5tMDEgKiB4ICsgbS5tMDUgKiB5ICsgbS5tMDkgKiB6ICsgbS5tMTMpICogdyxcbiAgICAgICAgKG0ubTAyICogeCArIG0ubTA2ICogeSArIG0ubTEwICogeiArIG0ubTE0KSAqIHcsXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG00VHJhbnNmb3JtRGlyPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBtOiBNNCwgZDogVjMpOiBUIHtcbiAgICBjb25zdCB7IHgsIHksIHogfSA9IGQ7XG4gICAgcmV0dXJuIHNldChvdXQsIG0ubTAwICogeCArIG0ubTA0ICogeSArIG0ubTA4ICogeiwgbS5tMDEgKiB4ICsgbS5tMDUgKiB5ICsgbS5tMDkgKiB6LCBtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAodjogbnVtYmVyLCBsbzogbnVtYmVyLCBoaTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdiA8IGxvID8gbG8gOiB2ID4gaGkgPyBoaSA6IHY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcDAxKHY6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHYgPCAwID8gMCA6IHYgPiAxID8gMSA6IHY7XG59XG5cbi8qKiBQb3NpdGl2ZSBtb2R1bG86IHdyYXBzIGB2YCBpbnRvIFswLCBuKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cmFwKHY6IG51bWJlciwgbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKCh2ICUgbikgKyBuKSAlIG47XG59XG4iLCAiLyoqXG4gKiBDdWJpYyBCZXppZXIgY3VydmUgbWF0aCAocHVyZSwgbm8gZW5naW5lIGRlcGVuZGVuY3kpLlxuICpcbiAqIEEgY3VydmUgaXMgdGhlIHNlZ21lbnQgYmV0d2VlbiB0d28ga25vdHM6IHAwID0ga25vdCBwb3NpdGlvbixcbiAqIHAxID0gcDAgKyBvdXQgdGFuZ2VudCwgcDIgPSBuZXh0IGtub3QgKyBpdHMgaW4gdGFuZ2VudCwgcDMgPSBuZXh0IGtub3QuXG4gKi9cbmltcG9ydCB7IFYzLCB2Mywgc2V0LCBjb3B5LCBzdWIsIHNjYWxlLCBsZW4sIGxlcnAsIG5vcm1hbGl6ZSwgbGVuU3EsIEVQU0lMT04sIGRpc3QgfSBmcm9tICcuL21hdGgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1cnZlIHtcbiAgICBwMDogVjM7XG4gICAgcDE6IFYzO1xuICAgIHAyOiBWMztcbiAgICBwMzogVjM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJ2ZSgpOiBDdXJ2ZSB7XG4gICAgcmV0dXJuIHsgcDA6IHYzKCksIHAxOiB2MygpLCBwMjogdjMoKSwgcDM6IHYzKCkgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlDdXJ2ZShvdXQ6IEN1cnZlLCBjOiBDdXJ2ZSk6IEN1cnZlIHtcbiAgICBjb3B5KG91dC5wMCwgYy5wMCk7XG4gICAgY29weShvdXQucDEsIGMucDEpO1xuICAgIGNvcHkob3V0LnAyLCBjLnAyKTtcbiAgICBjb3B5KG91dC5wMywgYy5wMyk7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWxQb3NpdGlvbjxUIGV4dGVuZHMgVjM+KG91dDogVCwgYzogQ3VydmUsIHQ6IG51bWJlcik6IFQge1xuICAgIGNvbnN0IHUgPSAxIC0gdDtcbiAgICBjb25zdCBhID0gdSAqIHUgKiB1O1xuICAgIGNvbnN0IGIgPSAzICogdSAqIHUgKiB0O1xuICAgIGNvbnN0IGQgPSAzICogdSAqIHQgKiB0O1xuICAgIGNvbnN0IGUgPSB0ICogdCAqIHQ7XG4gICAgcmV0dXJuIHNldChcbiAgICAgICAgb3V0LFxuICAgICAgICBhICogYy5wMC54ICsgYiAqIGMucDEueCArIGQgKiBjLnAyLnggKyBlICogYy5wMy54LFxuICAgICAgICBhICogYy5wMC55ICsgYiAqIGMucDEueSArIGQgKiBjLnAyLnkgKyBlICogYy5wMy55LFxuICAgICAgICBhICogYy5wMC56ICsgYiAqIGMucDEueiArIGQgKiBjLnAyLnogKyBlICogYy5wMy56LFxuICAgICk7XG59XG5cbi8qKiBGaXJzdCBkZXJpdmF0aXZlIGRCL2R0IChub3Qgbm9ybWFsaXplZCkuICovXG5leHBvcnQgZnVuY3Rpb24gZXZhbERlcml2YXRpdmU8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGM6IEN1cnZlLCB0OiBudW1iZXIpOiBUIHtcbiAgICBjb25zdCB1ID0gMSAtIHQ7XG4gICAgY29uc3QgYSA9IDMgKiB1ICogdTtcbiAgICBjb25zdCBiID0gNiAqIHUgKiB0O1xuICAgIGNvbnN0IGQgPSAzICogdCAqIHQ7XG4gICAgcmV0dXJuIHNldChcbiAgICAgICAgb3V0LFxuICAgICAgICBhICogKGMucDEueCAtIGMucDAueCkgKyBiICogKGMucDIueCAtIGMucDEueCkgKyBkICogKGMucDMueCAtIGMucDIueCksXG4gICAgICAgIGEgKiAoYy5wMS55IC0gYy5wMC55KSArIGIgKiAoYy5wMi55IC0gYy5wMS55KSArIGQgKiAoYy5wMy55IC0gYy5wMi55KSxcbiAgICAgICAgYSAqIChjLnAxLnogLSBjLnAwLnopICsgYiAqIChjLnAyLnogLSBjLnAxLnopICsgZCAqIChjLnAzLnogLSBjLnAyLnopLFxuICAgICk7XG59XG5cbi8qKiBTZWNvbmQgZGVyaXZhdGl2ZSBkMkIvZHQyLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2YWxBY2NlbGVyYXRpb248VCBleHRlbmRzIFYzPihvdXQ6IFQsIGM6IEN1cnZlLCB0OiBudW1iZXIpOiBUIHtcbiAgICBjb25zdCB1ID0gMSAtIHQ7XG4gICAgcmV0dXJuIHNldChcbiAgICAgICAgb3V0LFxuICAgICAgICA2ICogdSAqIChjLnAyLnggLSAyICogYy5wMS54ICsgYy5wMC54KSArIDYgKiB0ICogKGMucDMueCAtIDIgKiBjLnAyLnggKyBjLnAxLngpLFxuICAgICAgICA2ICogdSAqIChjLnAyLnkgLSAyICogYy5wMS55ICsgYy5wMC55KSArIDYgKiB0ICogKGMucDMueSAtIDIgKiBjLnAyLnkgKyBjLnAxLnkpLFxuICAgICAgICA2ICogdSAqIChjLnAyLnogLSAyICogYy5wMS56ICsgYy5wMC56KSArIDYgKiB0ICogKGMucDMueiAtIDIgKiBjLnAyLnogKyBjLnAxLnopLFxuICAgICk7XG59XG5cbmNvbnN0IF9kID0gdjMoKTtcblxuLyoqXG4gKiBEaXJlY3Rpb24gb2YgdHJhdmVsIGF0IHQsIHdpdGggYSB1c2FibGUgdmFsdWUgZXZlbiB3aGVyZSB0aGUgZGVyaXZhdGl2ZVxuICogdmFuaXNoZXMgKGxpbmVhciBrbm90cyBoYXZlIHplcm8gdGFuZ2VudHMsIHNvIEInKDApID0gMCk6IGZhbGxzIGJhY2sgdG8gdGhlXG4gKiBzZWNvbmQgZGVyaXZhdGl2ZSwgdGhlbiB0byB0aGUgY2hvcmQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmFsRGlyZWN0aW9uPFQgZXh0ZW5kcyBWMz4ob3V0OiBULCBjOiBDdXJ2ZSwgdDogbnVtYmVyKTogVCB7XG4gICAgZXZhbERlcml2YXRpdmUoX2QsIGMsIHQpO1xuICAgIGlmIChsZW5TcShfZCkgPiBFUFNJTE9OICogRVBTSUxPTikgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIF9kKTtcbiAgICAvLyBBdCBhbiBlbmQgd2l0aCBhIHplcm8gdGFuZ2VudCB0aGUgY3VydmUgbGVhdmVzIGFsb25nIHRoZSBzZWNvbmQgZGVyaXZhdGl2ZVxuICAgIC8vIChzaWduOiB0b3dhcmRzIHRoZSBpbnNpZGUgb2YgdGhlIGN1cnZlIGF0IHQgPSAwLCBiYWNrIGFsb25nIGl0IGF0IHQgPSAxKS5cbiAgICBldmFsQWNjZWxlcmF0aW9uKF9kLCBjLCB0KTtcbiAgICBpZiAobGVuU3EoX2QpID4gRVBTSUxPTiAqIEVQU0lMT04pIHtcbiAgICAgICAgaWYgKHQgPiAwLjUpIHNjYWxlKF9kLCBfZCwgLTEpO1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplKG91dCwgX2QpO1xuICAgIH1cbiAgICBzdWIoX2QsIGMucDMsIGMucDApO1xuICAgIHJldHVybiBub3JtYWxpemUob3V0LCBfZCk7XG59XG5cbi8qKiBTcGxpdHMgYXQgdCB3aXRoIGRlIENhc3RlbGphdTsgdGhlIGhhbHZlcyBzaGFyZSB0aGUgc3BsaXQgcG9pbnQuICovXG5leHBvcnQgZnVuY3Rpb24gc3BsaXQoYzogQ3VydmUsIHQ6IG51bWJlciwgbGVmdDogQ3VydmUsIHJpZ2h0OiBDdXJ2ZSk6IHZvaWQge1xuICAgIGNvbnN0IHAwMSA9IGxlcnAodjMoKSwgYy5wMCwgYy5wMSwgdCk7XG4gICAgY29uc3QgcDEyID0gbGVycCh2MygpLCBjLnAxLCBjLnAyLCB0KTtcbiAgICBjb25zdCBwMjMgPSBsZXJwKHYzKCksIGMucDIsIGMucDMsIHQpO1xuICAgIGNvbnN0IHAwMTIgPSBsZXJwKHYzKCksIHAwMSwgcDEyLCB0KTtcbiAgICBjb25zdCBwMTIzID0gbGVycCh2MygpLCBwMTIsIHAyMywgdCk7XG4gICAgY29uc3QgbWlkID0gbGVycCh2MygpLCBwMDEyLCBwMTIzLCB0KTtcbiAgICBjb25zdCBwMCA9IGNvcHkodjMoKSwgYy5wMCk7XG4gICAgY29uc3QgcDMgPSBjb3B5KHYzKCksIGMucDMpO1xuICAgIGNvcHkobGVmdC5wMCwgcDApO1xuICAgIGNvcHkobGVmdC5wMSwgcDAxKTtcbiAgICBjb3B5KGxlZnQucDIsIHAwMTIpO1xuICAgIGNvcHkobGVmdC5wMywgbWlkKTtcbiAgICBjb3B5KHJpZ2h0LnAwLCBtaWQpO1xuICAgIGNvcHkocmlnaHQucDEsIHAxMjMpO1xuICAgIGNvcHkocmlnaHQucDIsIHAyMyk7XG4gICAgY29weShyaWdodC5wMywgcDMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaW5lYXIoYzogQ3VydmUpOiBib29sZWFuIHtcbiAgICAvLyBCb3RoIGhhbmRsZXMgbGllIG9uIHRoZSBjaG9yZC5cbiAgICBjb25zdCBjaG9yZCA9IHN1Yih2MygpLCBjLnAzLCBjLnAwKTtcbiAgICBjb25zdCBsID0gbGVuKGNob3JkKTtcbiAgICBpZiAobCA8IEVQU0lMT04pIHJldHVybiBkaXN0KGMucDEsIGMucDApIDwgRVBTSUxPTiAmJiBkaXN0KGMucDIsIGMucDMpIDwgRVBTSUxPTjtcbiAgICByZXR1cm4gZGlzdFRvTGluZShjLnAxLCBjLnAwLCBjaG9yZCwgbCkgPCBsICogMWUtNSAmJiBkaXN0VG9MaW5lKGMucDIsIGMucDAsIGNob3JkLCBsKSA8IGwgKiAxZS01O1xufVxuXG5mdW5jdGlvbiBkaXN0VG9MaW5lKHA6IFYzLCBvOiBWMywgZDogVjMsIGRsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHB4ID0gcC54IC0gby54O1xuICAgIGNvbnN0IHB5ID0gcC55IC0gby55O1xuICAgIGNvbnN0IHB6ID0gcC56IC0gby56O1xuICAgIGNvbnN0IGN4ID0gcHkgKiBkLnogLSBweiAqIGQueTtcbiAgICBjb25zdCBjeSA9IHB6ICogZC54IC0gcHggKiBkLno7XG4gICAgY29uc3QgY3ogPSBweCAqIGQueSAtIHB5ICogZC54O1xuICAgIHJldHVybiBNYXRoLnNxcnQoY3ggKiBjeCArIGN5ICogY3kgKyBjeiAqIGN6KSAvIGRsO1xufVxuXG4vLyA4LXBvaW50IEdhdXNzLUxlZ2VuZHJlIG9uIFswLCAxXTogZXhhY3QgZm9yIHBvbHlub21pYWxzIHVwIHRvIGRlZ3JlZSAxNSxcbi8vIHBsZW50eSBmb3IgfEInKHQpfCBvdmVyIGEgc2hvcnQgcGFyYW1ldGVyIHJhbmdlLlxuY29uc3QgR0xfWCA9IFtcbiAgICAwLjAxOTg1NTA3MTc1MTIzMTksIDAuMTAxNjY2NzYxMjkzMTg2NiwgMC4yMzcyMzM3OTUwNDE4MzU1LCAwLjQwODI4MjY3ODc1MjE3NTEsXG4gICAgMC41OTE3MTczMjEyNDc4MjQ5LCAwLjc2Mjc2NjIwNDk1ODE2NDUsIDAuODk4MzMzMjM4NzA2ODEzNCwgMC45ODAxNDQ5MjgyNDg3NjgxLFxuXTtcbmNvbnN0IEdMX1cgPSBbXG4gICAgMC4wNTA2MTQyNjgxNDUxODgxLCAwLjExMTE5MDUxNzIyNjY4NzIsIDAuMTU2ODUzMzIyOTM4OTQzNiwgMC4xODEzNDE4OTE2ODkxODEwLFxuICAgIDAuMTgxMzQxODkxNjg5MTgxMCwgMC4xNTY4NTMzMjI5Mzg5NDM2LCAwLjExMTE5MDUxNzIyNjY4NzIsIDAuMDUwNjE0MjY4MTQ1MTg4MSxcbl07XG5cbi8qKiBBcmMgbGVuZ3RoIGJldHdlZW4gcGFyYW1ldGVycyBhIGFuZCBiLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFyY0xlbmd0aChjOiBDdXJ2ZSwgYSA9IDAsIGIgPSAxKTogbnVtYmVyIHtcbiAgICBpZiAoYiA8PSBhKSByZXR1cm4gMDtcbiAgICBjb25zdCBoID0gYiAtIGE7XG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgZXZhbERlcml2YXRpdmUoX2QsIGMsIGEgKyBoICogR0xfWFtpXSk7XG4gICAgICAgIHN1bSArPSBHTF9XW2ldICogbGVuKF9kKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bSAqIGg7XG59XG5cbi8qKlxuICogQ3VtdWxhdGl2ZSBhcmMgbGVuZ3RoIGF0IGV2ZW5seSBzcGFjZWQgcGFyYW1ldGVyczogbHV0W2ldIGlzIHRoZSBsZW5ndGggZnJvbVxuICogdCA9IDAgdG8gdCA9IGkgLyAobiAtIDEpLiBVc2VkIHRvIG1hcCBkaXN0YW5jZSB0byB0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRMZW5ndGhUYWJsZShjOiBDdXJ2ZSwgbjogbnVtYmVyLCBvdXQ/OiBGbG9hdDY0QXJyYXkpOiBGbG9hdDY0QXJyYXkge1xuICAgIGNvbnN0IGx1dCA9IG91dCAmJiBvdXQubGVuZ3RoID09PSBuID8gb3V0IDogbmV3IEZsb2F0NjRBcnJheShuKTtcbiAgICBsdXRbMF0gPSAwO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGx1dFtpXSA9IGx1dFtpIC0gMV0gKyBhcmNMZW5ndGgoYywgKGkgLSAxKSAvIChuIC0gMSksIGkgLyAobiAtIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGx1dDtcbn1cblxuLyoqIFBhcmFtZXRlciB0IGF0IGFyYyBsZW5ndGggYGRgIGFsb25nIHRoZSBjdXJ2ZSwgdXNpbmcgYSB0YWJsZSBmcm9tIGJ1aWxkTGVuZ3RoVGFibGUuICovXG5leHBvcnQgZnVuY3Rpb24gdEF0TGVuZ3RoKGx1dDogRmxvYXQ2NEFycmF5LCBkOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IG4gPSBsdXQubGVuZ3RoO1xuICAgIGNvbnN0IHRvdGFsID0gbHV0W24gLSAxXTtcbiAgICBpZiAoZCA8PSAwIHx8IHRvdGFsIDw9IDApIHJldHVybiAwO1xuICAgIGlmIChkID49IHRvdGFsKSByZXR1cm4gMTtcbiAgICBsZXQgbG8gPSAwO1xuICAgIGxldCBoaSA9IG4gLSAxO1xuICAgIHdoaWxlIChoaSAtIGxvID4gMSkge1xuICAgICAgICBjb25zdCBtaWQgPSAobG8gKyBoaSkgPj4gMTtcbiAgICAgICAgaWYgKGx1dFttaWRdIDwgZCkgbG8gPSBtaWQ7XG4gICAgICAgIGVsc2UgaGkgPSBtaWQ7XG4gICAgfVxuICAgIGNvbnN0IHNlZyA9IGx1dFtoaV0gLSBsdXRbbG9dO1xuICAgIGNvbnN0IGYgPSBzZWcgPiAwID8gKGQgLSBsdXRbbG9dKSAvIHNlZyA6IDA7XG4gICAgcmV0dXJuIChsbyArIGYpIC8gKG4gLSAxKTtcbn1cblxuLyoqIEFyYyBsZW5ndGggZnJvbSAwIHRvIHQsIHVzaW5nIGEgdGFibGUgZnJvbSBidWlsZExlbmd0aFRhYmxlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aEF0VChsdXQ6IEZsb2F0NjRBcnJheSwgdDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBuID0gbHV0Lmxlbmd0aDtcbiAgICBpZiAodCA8PSAwKSByZXR1cm4gMDtcbiAgICBpZiAodCA+PSAxKSByZXR1cm4gbHV0W24gLSAxXTtcbiAgICBjb25zdCB4ID0gdCAqIChuIC0gMSk7XG4gICAgY29uc3QgaSA9IE1hdGguZmxvb3IoeCk7XG4gICAgY29uc3QgZiA9IHggLSBpO1xuICAgIHJldHVybiBsdXRbaV0gKyAobHV0W01hdGgubWluKGkgKyAxLCBuIC0gMSldIC0gbHV0W2ldKSAqIGY7XG59XG5cbi8qKlxuICogQ2xvc2VzdCBwYXJhbWV0ZXIgb24gdGhlIGN1cnZlIHRvIHBvaW50IHA6IGNvYXJzZSBzYW1wbGluZyBmb2xsb3dlZCBieVxuICogYSBmZXcgcm91bmRzIG9mIGxvY2FsIHJlZmluZW1lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuZWFyZXN0VChjOiBDdXJ2ZSwgcDogVjMsIHNhbXBsZXMgPSAxNiwgaXRlcmF0aW9ucyA9IDQpOiB7IHQ6IG51bWJlcjsgZGlzdFNxOiBudW1iZXIgfSB7XG4gICAgY29uc3QgcSA9IHYzKCk7XG4gICAgbGV0IGJlc3RUID0gMDtcbiAgICBsZXQgYmVzdCA9IEluZmluaXR5O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHNhbXBsZXM7IGkrKykge1xuICAgICAgICBjb25zdCB0ID0gaSAvIHNhbXBsZXM7XG4gICAgICAgIGV2YWxQb3NpdGlvbihxLCBjLCB0KTtcbiAgICAgICAgY29uc3QgZCA9IChxLnggLSBwLngpICoqIDIgKyAocS55IC0gcC55KSAqKiAyICsgKHEueiAtIHAueikgKiogMjtcbiAgICAgICAgaWYgKGQgPCBiZXN0KSB7XG4gICAgICAgICAgICBiZXN0ID0gZDtcbiAgICAgICAgICAgIGJlc3RUID0gdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RlcCA9IDEgLyBzYW1wbGVzO1xuICAgIGZvciAobGV0IGl0ID0gMDsgaXQgPCBpdGVyYXRpb25zOyBpdCsrKSB7XG4gICAgICAgIHN0ZXAgKj0gMC41O1xuICAgICAgICBmb3IgKGNvbnN0IHQgb2YgW2Jlc3RUIC0gc3RlcCwgYmVzdFQgKyBzdGVwXSkge1xuICAgICAgICAgICAgaWYgKHQgPCAwIHx8IHQgPiAxKSBjb250aW51ZTtcbiAgICAgICAgICAgIGV2YWxQb3NpdGlvbihxLCBjLCB0KTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSAocS54IC0gcC54KSAqKiAyICsgKHEueSAtIHAueSkgKiogMiArIChxLnogLSBwLnopICoqIDI7XG4gICAgICAgICAgICBpZiAoZCA8IGJlc3QpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gZDtcbiAgICAgICAgICAgICAgICBiZXN0VCA9IHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdDogYmVzdFQsIGRpc3RTcTogYmVzdCB9O1xufVxuIiwgIi8qKlxuICogU3BsaW5lIGxvZ2ljIG9uIHBsYWluIGRhdGEgKG5vIGVuZ2luZSBkZXBlbmRlbmN5KS5cbiAqXG4gKiBBIHNwbGluZSBpcyBhIGxpc3Qgb2YgQmV6aWVyIGtub3RzLiBFYWNoIGtub3QgaGFzIGEgcG9zaXRpb24sIGEgcm90YXRpb24gYW5kXG4gKiB0d28gdGFuZ2VudHMgZXhwcmVzc2VkIGluIHRoZSBrbm90J3Mgb3duIHNwYWNlICgrWiA9IGRpcmVjdGlvbiBvZiB0cmF2ZWwsXG4gKiArWSA9IHVwKSwgcGx1cyBhIHRhbmdlbnQgbW9kZSB0aGF0IGRlY2lkZXMgaG93IHRoZSB0YW5nZW50cyBhcmUga2VwdDpcbiAqXG4gKiAtIEF1dG9TbW9vdGg6IHRhbmdlbnRzIGNvbXB1dGVkIGZyb20gdGhlIG5laWdoYm9yIHBvc2l0aW9ucyAoQ2F0bXVsbC1Sb20pLlxuICogLSBMaW5lYXI6ICAgICBubyB0YW5nZW50cywgc3RyYWlnaHQgc2VnbWVudHMuXG4gKiAtIE1pcnJvcmVkOiAgIHRhbmdlbnRzIG9wcG9zaXRlIGFuZCBvZiBlcXVhbCBsZW5ndGguXG4gKiAtIENvbnRpbnVvdXM6IHRhbmdlbnRzIG9wcG9zaXRlLCBsZW5ndGhzIGluZGVwZW5kZW50LlxuICogLSBCcm9rZW46ICAgICB0YW5nZW50cyBpbmRlcGVuZGVudC5cbiAqXG4gKiBQb3NpdGlvbnMgYXJlIGluIHRoZSBzcGxpbmUncyBsb2NhbCBzcGFjZSAodGhlIFNwbGluZUNvbnRhaW5lciBub2RlKS5cbiAqL1xuaW1wb3J0IHtcbiAgICBWMywgUTQsIHYzLCBxNCwgc2V0LCBjb3B5LCBhZGQsIHN1Yiwgc2NhbGUsIG5vcm1hbGl6ZSwgbGVuLCBsZW5TcSwgZG90LCBjcm9zcywgZGlzdCwgZGlzdFNxLFxuICAgIHFSb3RhdGUsIHFJbnZlcnQsIHFNdWwsIHFDb3B5LCBxTG9va1JvdGF0aW9uLCBxRnJvbUF4aXNBbmdsZSwgcU5vcm1hbGl6ZSwgcUlkZW50aXR5LFxuICAgIHByb2plY3RPblBsYW5lLCBhbnlQZXJwZW5kaWN1bGFyLCB3cmFwLCBjbGFtcDAxLCBFUFNJTE9OLCBzY2FsZUFuZEFkZCwgbGVycCxcbn0gZnJvbSAnLi9tYXRoJztcbmltcG9ydCB7XG4gICAgQ3VydmUsIGN1cnZlLCBldmFsUG9zaXRpb24sIGV2YWxEaXJlY3Rpb24sIGV2YWxEZXJpdmF0aXZlLCBzcGxpdCwgYnVpbGRMZW5ndGhUYWJsZSwgdEF0TGVuZ3RoLCBhcmNMZW5ndGgsIG5lYXJlc3RULFxufSBmcm9tICcuL2N1cnZlJztcblxuZXhwb3J0IGVudW0gVGFuZ2VudE1vZGUge1xuICAgIEF1dG9TbW9vdGggPSAwLFxuICAgIExpbmVhciA9IDEsXG4gICAgTWlycm9yZWQgPSAyLFxuICAgIENvbnRpbnVvdXMgPSAzLFxuICAgIEJyb2tlbiA9IDQsXG59XG5cbi8qKiBEZWZhdWx0IENhdG11bGwtUm9tIHBhcmFtZXRlcml6YXRpb24gdXNlZCBieSBBdXRvU21vb3RoIGtub3RzICgwIHVuaWZvcm0sIDAuNSBjZW50cmlwZXRhbCwgMSBjaG9yZGFsKS4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RFTlNJT04gPSAwLjU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgS25vdExpa2Uge1xuICAgIHBvc2l0aW9uOiBWMztcbiAgICB0YW5nZW50SW46IFYzO1xuICAgIHRhbmdlbnRPdXQ6IFYzO1xuICAgIHJvdGF0aW9uOiBRNDtcbiAgICBtb2RlOiBudW1iZXI7XG4gICAgdGVuc2lvbjogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNwbGluZUxpa2Uge1xuICAgIGtub3RzOiBLbm90TGlrZVtdO1xuICAgIGNsb3NlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMaW5rTGlrZSB7XG4gICAgLyoqIEZsYXR0ZW5lZCAoc3BsaW5lSW5kZXgsIGtub3RJbmRleCkgcGFpcnMuICovXG4gICAga25vdHM6IG51bWJlcltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRhaW5lckxpa2Uge1xuICAgIHNwbGluZXM6IFNwbGluZUxpa2VbXTtcbiAgICBsaW5rczogTGlua0xpa2VbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWN0b3J5IHtcbiAgICBrbm90KCk6IEtub3RMaWtlO1xuICAgIHNwbGluZSgpOiBTcGxpbmVMaWtlO1xuICAgIGxpbmsoKTogTGlua0xpa2U7XG59XG5cbmNvbnN0IFVQOiBWMyA9IHsgeDogMCwgeTogMSwgejogMCB9O1xuY29uc3QgRk9SV0FSRDogVjMgPSB7IHg6IDAsIHk6IDAsIHo6IDEgfTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGluZGljZXNcblxuZXhwb3J0IGZ1bmN0aW9uIHByZXZJbmRleChpOiBudW1iZXIsIGNvdW50OiBudW1iZXIsIGNsb3NlZDogYm9vbGVhbik6IG51bWJlciB7XG4gICAgcmV0dXJuIGNsb3NlZCA/IHdyYXAoaSAtIDEsIGNvdW50KSA6IE1hdGgubWF4KGkgLSAxLCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRJbmRleChpOiBudW1iZXIsIGNvdW50OiBudW1iZXIsIGNsb3NlZDogYm9vbGVhbik6IG51bWJlciB7XG4gICAgcmV0dXJuIGNsb3NlZCA/IHdyYXAoaSArIDEsIGNvdW50KSA6IE1hdGgubWluKGkgKyAxLCBjb3VudCAtIDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3VydmVDb3VudChzOiBTcGxpbmVMaWtlKTogbnVtYmVyIHtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgaWYgKG4gPCAyKSByZXR1cm4gMDtcbiAgICByZXR1cm4gcy5jbG9zZWQgPyBuIDogbiAtIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0YW5nZW50c0VkaXRhYmxlKG1vZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtb2RlID09PSBUYW5nZW50TW9kZS5NaXJyb3JlZCB8fCBtb2RlID09PSBUYW5nZW50TW9kZS5Db250aW51b3VzIHx8IG1vZGUgPT09IFRhbmdlbnRNb2RlLkJyb2tlbjtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0ga25vdHNcblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlLbm90PEsgZXh0ZW5kcyBLbm90TGlrZT4ob3V0OiBLLCBrOiBLbm90TGlrZSk6IEsge1xuICAgIGNvcHkob3V0LnBvc2l0aW9uLCBrLnBvc2l0aW9uKTtcbiAgICBjb3B5KG91dC50YW5nZW50SW4sIGsudGFuZ2VudEluKTtcbiAgICBjb3B5KG91dC50YW5nZW50T3V0LCBrLnRhbmdlbnRPdXQpO1xuICAgIHFDb3B5KG91dC5yb3RhdGlvbiwgay5yb3RhdGlvbik7XG4gICAgb3V0Lm1vZGUgPSBrLm1vZGU7XG4gICAgb3V0LnRlbnNpb24gPSBrLnRlbnNpb247XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtub3RVcDxUIGV4dGVuZHMgVjM+KG91dDogVCwgazogS25vdExpa2UpOiBUIHtcbiAgICByZXR1cm4gcVJvdGF0ZShvdXQsIGsucm90YXRpb24sIFVQKTtcbn1cblxuLyoqIE91dCB0YW5nZW50IGluIHNwbGluZSBzcGFjZSAob2Zmc2V0IGZyb20gdGhlIGtub3QgcG9zaXRpb24pLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhbmdlbnRPdXRWZWM8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGs6IEtub3RMaWtlKTogVCB7XG4gICAgcmV0dXJuIHFSb3RhdGUob3V0LCBrLnJvdGF0aW9uLCBrLnRhbmdlbnRPdXQpO1xufVxuXG4vKiogSW4gdGFuZ2VudCBpbiBzcGxpbmUgc3BhY2UgKG9mZnNldCBmcm9tIHRoZSBrbm90IHBvc2l0aW9uKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0YW5nZW50SW5WZWM8VCBleHRlbmRzIFYzPihvdXQ6IFQsIGs6IEtub3RMaWtlKTogVCB7XG4gICAgcmV0dXJuIHFSb3RhdGUob3V0LCBrLnJvdGF0aW9uLCBrLnRhbmdlbnRJbik7XG59XG5cbi8qKlxuICogS25vdCByb3RhdGlvbiBmb3IgYSB0YW5nZW50IGRpcmVjdGlvbiBhbmQgYSBub3JtYWwgKHVwKS4gTGlrZSBVbml0eSdzXG4gKiBHZXRLbm90Um90YXRpb246IHVwIGlzIHRoZSBub3JtYWwgcHJvamVjdGVkIG9mZiB0aGUgdGFuZ2VudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGtub3RSb3RhdGlvbjxUIGV4dGVuZHMgUTQ+KG91dDogVCwgdGFuZ2VudDogVjMsIG5vcm1hbDogVjMpOiBUIHtcbiAgICBjb25zdCB0ID0gbm9ybWFsaXplKHYzKCksIHRhbmdlbnQpO1xuICAgIGxldCBuID0gbm9ybWFsaXplKHYzKCksIG5vcm1hbCk7XG4gICAgaWYgKGxlblNxKG4pIDwgRVBTSUxPTikgbiA9IGNvcHkodjMoKSwgVVApO1xuICAgIGlmIChsZW5TcSh0KSA8IEVQU0lMT04pIHtcbiAgICAgICAgLy8gTm8gZGlyZWN0aW9uOiBmb3J3YXJkIGlzIGFueSBkaXJlY3Rpb24gcGVycGVuZGljdWxhciB0byB0aGUgbm9ybWFsLlxuICAgICAgICBjb25zdCBmID0gYW55UGVycGVuZGljdWxhcih2MygpLCBuKTtcbiAgICAgICAgcmV0dXJuIHFMb29rUm90YXRpb24ob3V0LCBmLCBuKTtcbiAgICB9XG4gICAgaWYgKE1hdGguYWJzKGRvdCh0LCBuKSkgPiAxIC0gMWUtNSkge1xuICAgICAgICAvLyBOb3JtYWwgcGFyYWxsZWwgdG8gdGhlIHRhbmdlbnQ6IHBpY2sgYW4gdXAgcGVycGVuZGljdWxhciB0byBpdC5cbiAgICAgICAgY29uc3QgdXAgPSBjcm9zcyh2MygpLCB0LCB7IHg6IDEsIHk6IDAsIHo6IDAgfSk7XG4gICAgICAgIGlmIChsZW5TcSh1cCkgPCBFUFNJTE9OKSBjcm9zcyh1cCwgdCwgeyB4OiAwLCB5OiAwLCB6OiAxIH0pO1xuICAgICAgICByZXR1cm4gcUxvb2tSb3RhdGlvbihvdXQsIHQsIG5vcm1hbGl6ZSh1cCwgdXApKTtcbiAgICB9XG4gICAgY29uc3QgdXAgPSBub3JtYWxpemUodjMoKSwgcHJvamVjdE9uUGxhbmUodjMoKSwgbiwgdCkpO1xuICAgIHJldHVybiBxTG9va1JvdGF0aW9uKG91dCwgdCwgdXApO1xufVxuXG4vKipcbiAqIEF1dG9TbW9vdGggdGFuZ2VudCBhdCBgY3VyYCBnaXZlbiBpdHMgbmVpZ2hib3JzOiBhIENhdG11bGwtUm9tIHRhbmdlbnQgd2l0aFxuICogdGhlIHBhcmFtZXRlcml6YXRpb24gYHRlbnNpb25gIChhbHBoYSksIHNjYWxlZCBmb3IgYSBjdWJpYyBCZXppZXIgaGFuZGxlLlxuICogQmFzZWQgb24gWXVrc2VsIGV0IGFsLiwgXCJQYXJhbWV0ZXJpemF0aW9uIGFuZCBhcHBsaWNhdGlvbnMgb2YgQ2F0bXVsbC1Sb20gY3VydmVzXCIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdXRvU21vb3RoVGFuZ2VudDxUIGV4dGVuZHMgVjM+KG91dDogVCwgcHJldjogVjMsIGN1cjogVjMsIG5leHQ6IFYzLCB0ZW5zaW9uOiBudW1iZXIpOiBUIHtcbiAgICBjb25zdCBkMSA9IGRpc3QoY3VyLCBwcmV2KTtcbiAgICBjb25zdCBkMiA9IGRpc3QobmV4dCwgY3VyKTtcbiAgICBpZiAoZDEgPCBFUFNJTE9OICYmIGQyIDwgRVBTSUxPTikgcmV0dXJuIHNldChvdXQsIDAsIDAsIDApO1xuICAgIC8vIE9ubHkgb25lIG5laWdoYm9yOiBhIHNob3J0IGhhbmRsZSB0b3dhcmRzIGl0LCBlbm91Z2ggdG8gZ2l2ZSB0aGUga25vdCBhIGRpcmVjdGlvbi5cbiAgICBpZiAoZDEgPCBFUFNJTE9OKSByZXR1cm4gc2NhbGUob3V0LCBzdWIob3V0LCBuZXh0LCBjdXIpLCAwLjEpO1xuICAgIGlmIChkMiA8IEVQU0lMT04pIHJldHVybiBzY2FsZShvdXQsIHN1YihvdXQsIGN1ciwgcHJldiksIDAuMSk7XG4gICAgY29uc3QgYSA9IHRlbnNpb247XG4gICAgY29uc3QgZDFhID0gTWF0aC5wb3coZDEsIGEpO1xuICAgIGNvbnN0IGQyYSA9IE1hdGgucG93KGQyLCBhKTtcbiAgICBjb25zdCBkMWEyID0gZDFhICogZDFhO1xuICAgIGNvbnN0IGQyYTIgPSBkMmEgKiBkMmE7XG4gICAgY29uc3QgayA9IDEgLyAoMyAqIGQxYSAqIChkMWEgKyBkMmEpKTtcbiAgICByZXR1cm4gc2V0KFxuICAgICAgICBvdXQsXG4gICAgICAgIChkMWEyICogbmV4dC54IC0gZDJhMiAqIHByZXYueCArIChkMmEyIC0gZDFhMikgKiBjdXIueCkgKiBrLFxuICAgICAgICAoZDFhMiAqIG5leHQueSAtIGQyYTIgKiBwcmV2LnkgKyAoZDJhMiAtIGQxYTIpICogY3VyLnkpICogayxcbiAgICAgICAgKGQxYTIgKiBuZXh0LnogLSBkMmEyICogcHJldi56ICsgKGQyYTIgLSBkMWEyKSAqIGN1ci56KSAqIGssXG4gICAgKTtcbn1cblxuLyoqIFJlY29tcHV0ZXMgdGhlIHRhbmdlbnRzIChhbmQgcm90YXRpb24pIGEga25vdCdzIG1vZGUgaW1wbGllcy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVRhbmdlbnRNb2RlKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBuKSByZXR1cm47XG4gICAgY29uc3QgayA9IHMua25vdHNbaV07XG4gICAgc3dpdGNoIChrLm1vZGUpIHtcbiAgICAgICAgY2FzZSBUYW5nZW50TW9kZS5MaW5lYXI6XG4gICAgICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIDApO1xuICAgICAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBUYW5nZW50TW9kZS5BdXRvU21vb3RoOiB7XG4gICAgICAgICAgICBjb25zdCBwcmV2ID0gcy5rbm90c1twcmV2SW5kZXgoaSwgbiwgcy5jbG9zZWQpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBzLmtub3RzW25leHRJbmRleChpLCBuLCBzLmNsb3NlZCldLnBvc2l0aW9uO1xuICAgICAgICAgICAgY29uc3QgdXAgPSBrbm90VXAodjMoKSwgayk7XG4gICAgICAgICAgICBjb25zdCB0aW4gPSBhdXRvU21vb3RoVGFuZ2VudCh2MygpLCBuZXh0LCBrLnBvc2l0aW9uLCBwcmV2LCBrLnRlbnNpb24pO1xuICAgICAgICAgICAgY29uc3QgdG91dCA9IGF1dG9TbW9vdGhUYW5nZW50KHYzKCksIHByZXYsIGsucG9zaXRpb24sIG5leHQsIGsudGVuc2lvbik7XG4gICAgICAgICAgICBsZXQgbGluID0gbGVuKHRpbik7XG4gICAgICAgICAgICBsZXQgbG91dCA9IGxlbih0b3V0KTtcbiAgICAgICAgICAgIGxldCBkaXIgPSB0b3V0O1xuICAgICAgICAgICAgaWYgKGxpbiA8IEVQU0lMT04pIGxpbiA9IGxvdXQ7XG4gICAgICAgICAgICBpZiAobG91dCA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgICAgICBsb3V0ID0gbGluO1xuICAgICAgICAgICAgICAgIGRpciA9IHNjYWxlKHYzKCksIHRpbiwgLTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxlblNxKGRpcikgPiBFUFNJTE9OKSBrbm90Um90YXRpb24oay5yb3RhdGlvbiwgZGlyLCB1cCk7XG4gICAgICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1saW4pO1xuICAgICAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbG91dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFRhbmdlbnRNb2RlLk1pcnJvcmVkOlxuICAgICAgICBjYXNlIFRhbmdlbnRNb2RlLkNvbnRpbnVvdXM6XG4gICAgICAgICAgICBiYWtlVGFuZ2VudERpcmVjdGlvbihrLCBrLm1vZGUgPT09IFRhbmdlbnRNb2RlLk1pcnJvcmVkLCB0cnVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG4vKipcbiAqIFR1cm5zIHRoZSBrbm90IHNvIGl0cyB0YW5nZW50cyBsaWUgb24gbG9jYWwgWiAodGhlIG1haW4gdGFuZ2VudCBrZWVwcyBpdHNcbiAqIGRpcmVjdGlvbiksIGFzIE1pcnJvcmVkIC8gQ29udGludW91cyBrbm90cyBzdG9yZSB0aGVtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmFrZVRhbmdlbnREaXJlY3Rpb24oazogS25vdExpa2UsIG1pcnJvcmVkOiBib29sZWFuLCBvdXRJc01haW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCB0b3V0ID0gdGFuZ2VudE91dFZlYyh2MygpLCBrKTtcbiAgICBjb25zdCB0aW4gPSB0YW5nZW50SW5WZWModjMoKSwgayk7XG4gICAgY29uc3QgbWFpbiA9IG91dElzTWFpbiA/IHRvdXQgOiBzY2FsZSh2MygpLCB0aW4sIC0xKTtcbiAgICBjb25zdCBvdGhlciA9IG91dElzTWFpbiA/IHNjYWxlKHYzKCksIHRpbiwgLTEpIDogdG91dDtcbiAgICBjb25zdCBkaXIgPSBsZW5TcShtYWluKSA+IEVQU0lMT04gPyBtYWluIDogb3RoZXI7XG4gICAgY29uc3QgdXAgPSBrbm90VXAodjMoKSwgayk7XG4gICAgaWYgKGxlblNxKGRpcikgPiBFUFNJTE9OKSBrbm90Um90YXRpb24oay5yb3RhdGlvbiwgZGlyLCB1cCk7XG4gICAgY29uc3QgbG1haW4gPSBsZW4obWFpbik7XG4gICAgY29uc3QgbG90aGVyID0gbGVuKG90aGVyKTtcbiAgICBpZiAobWlycm9yZWQpIHtcbiAgICAgICAgY29uc3QgbCA9IGxtYWluID4gRVBTSUxPTiA/IGxtYWluIDogbG90aGVyO1xuICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCBsKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbCk7XG4gICAgfSBlbHNlIGlmIChvdXRJc01haW4pIHtcbiAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbG1haW4pO1xuICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIC1sb3RoZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWxtYWluKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudE91dCwgMCwgMCwgbG90aGVyKTtcbiAgICB9XG59XG5cbi8qKiBSZWNvbXB1dGVzIHRoZSBrbm90IGFuZCBpdHMgQXV0b1Ntb290aCBuZWlnaGJvcnMgYWZ0ZXIgaXRzIHBvc2l0aW9uIGNoYW5nZWQuICovXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaEFyb3VuZChzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgaWYgKCFuKSByZXR1cm47XG4gICAgY29uc3QgcCA9IHByZXZJbmRleChpLCBuLCBzLmNsb3NlZCk7XG4gICAgY29uc3QgcSA9IG5leHRJbmRleChpLCBuLCBzLmNsb3NlZCk7XG4gICAgaWYgKHAgIT09IGkgJiYgcy5rbm90c1twXS5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoKSBhcHBseVRhbmdlbnRNb2RlKHMsIHApO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgaSk7XG4gICAgaWYgKHEgIT09IGkgJiYgcSAhPT0gcCAmJiBzLmtub3RzW3FdLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpIGFwcGx5VGFuZ2VudE1vZGUocywgcSk7XG59XG5cbi8qKiBSZS1hcHBsaWVzIGV2ZXJ5IGtub3QncyBtb2RlIChhZnRlciBsb2FkaW5nIG9yIGV4dGVybmFsIGVkaXRzKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoQWxsKHM6IFNwbGluZUxpa2UpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMua25vdHMubGVuZ3RoOyBpKyspIGFwcGx5VGFuZ2VudE1vZGUocywgaSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRLbm90UG9zaXRpb24oczogU3BsaW5lTGlrZSwgaTogbnVtYmVyLCBwOiBWMyk6IHZvaWQge1xuICAgIGNvcHkocy5rbm90c1tpXS5wb3NpdGlvbiwgcCk7XG4gICAgcmVmcmVzaEFyb3VuZChzLCBpKTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBpbiBvciBvdXQgdGFuZ2VudCBmcm9tIGEgc3BsaW5lLXNwYWNlIG9mZnNldCwga2VlcGluZyB0aGUga25vdCdzXG4gKiBtb2RlIGNvbnN0cmFpbnRzLiBUYW5nZW50cyBvZiBBdXRvU21vb3RoIC8gTGluZWFyIGtub3RzIGJlY29tZSBDb250aW51b3VzXG4gKiAodGhleSBoYXZlIG5vdGhpbmcgdG8gZHJhZyBvdGhlcndpc2UpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VGFuZ2VudFZlYyhzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIsIHdoaWNoOiAnaW4nIHwgJ291dCcsIHY6IFYzKTogdm9pZCB7XG4gICAgY29uc3QgayA9IHMua25vdHNbaV07XG4gICAgaWYgKCF0YW5nZW50c0VkaXRhYmxlKGsubW9kZSkpIHtcbiAgICAgICAgaWYgKGsubW9kZSA9PT0gVGFuZ2VudE1vZGUuTGluZWFyKSBtYWtlRXhwbGljaXRMaW5lYXJUYW5nZW50cyhzLCBpKTtcbiAgICAgICAgay5tb2RlID0gVGFuZ2VudE1vZGUuQ29udGludW91cztcbiAgICB9XG4gICAgaWYgKGsubW9kZSA9PT0gVGFuZ2VudE1vZGUuQnJva2VuKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsID0gcVJvdGF0ZSh2MygpLCBxSW52ZXJ0KHE0KCksIGsucm90YXRpb24pLCB2KTtcbiAgICAgICAgY29weSh3aGljaCA9PT0gJ2luJyA/IGsudGFuZ2VudEluIDogay50YW5nZW50T3V0LCBsb2NhbCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbCA9IGxlbih2KTtcbiAgICBjb25zdCBkaXIgPSB3aGljaCA9PT0gJ291dCcgPyBjb3B5KHYzKCksIHYpIDogc2NhbGUodjMoKSwgdiwgLTEpO1xuICAgIGlmIChsID4gRVBTSUxPTikga25vdFJvdGF0aW9uKGsucm90YXRpb24sIGRpciwga25vdFVwKHYzKCksIGspKTtcbiAgICBjb25zdCBtaXJyb3JlZCA9IGsubW9kZSA9PT0gVGFuZ2VudE1vZGUuTWlycm9yZWQ7XG4gICAgaWYgKHdoaWNoID09PSAnb3V0Jykge1xuICAgICAgICBjb25zdCBsaW4gPSBtaXJyb3JlZCA/IGwgOiBsZW4oay50YW5nZW50SW4pO1xuICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCBsKTtcbiAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbGluKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBsb3V0ID0gbWlycm9yZWQgPyBsIDogbGVuKGsudGFuZ2VudE91dCk7XG4gICAgICAgIHNldChrLnRhbmdlbnRJbiwgMCwgMCwgLWwpO1xuICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCBsb3V0KTtcbiAgICB9XG59XG5cbi8qKiBMaW5lYXIga25vdHMgc3RvcmUgemVybyB0YW5nZW50czsgZ2l2ZSB0aGVtIGdyYWJiYWJsZSBvbmVzIHBvaW50aW5nIGF0IHRoZSBuZWlnaGJvcnMuICovXG5mdW5jdGlvbiBtYWtlRXhwbGljaXRMaW5lYXJUYW5nZW50cyhzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgY29uc3QgayA9IHMua25vdHNbaV07XG4gICAgY29uc3QgaW52ID0gcUludmVydChxNCgpLCBrLnJvdGF0aW9uKTtcbiAgICBjb25zdCBwcmV2ID0gcy5rbm90c1twcmV2SW5kZXgoaSwgbiwgcy5jbG9zZWQpXS5wb3NpdGlvbjtcbiAgICBjb25zdCBuZXh0ID0gcy5rbm90c1tuZXh0SW5kZXgoaSwgbiwgcy5jbG9zZWQpXS5wb3NpdGlvbjtcbiAgICBxUm90YXRlKGsudGFuZ2VudEluLCBpbnYsIHNjYWxlKHYzKCksIHN1Yih2MygpLCBwcmV2LCBrLnBvc2l0aW9uKSwgMSAvIDMpKTtcbiAgICBxUm90YXRlKGsudGFuZ2VudE91dCwgaW52LCBzY2FsZSh2MygpLCBzdWIodjMoKSwgbmV4dCwgay5wb3NpdGlvbiksIDEgLyAzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUYW5nZW50TW9kZShzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIsIG1vZGU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGsgPSBzLmtub3RzW2ldO1xuICAgIGlmIChrLm1vZGUgPT09IG1vZGUpIHtcbiAgICAgICAgYXBwbHlUYW5nZW50TW9kZShzLCBpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoay5tb2RlID09PSBUYW5nZW50TW9kZS5MaW5lYXIgJiYgdGFuZ2VudHNFZGl0YWJsZShtb2RlKSkgbWFrZUV4cGxpY2l0TGluZWFyVGFuZ2VudHMocywgaSk7XG4gICAgay5tb2RlID0gbW9kZTtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIGkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VGVuc2lvbihzOiBTcGxpbmVMaWtlLCBpOiBudW1iZXIsIHRlbnNpb246IG51bWJlcik6IHZvaWQge1xuICAgIHMua25vdHNbaV0udGVuc2lvbiA9IHRlbnNpb247XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFJvdGF0aW9uKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlciwgcjogUTQpOiB2b2lkIHtcbiAgICBxTm9ybWFsaXplKHMua25vdHNbaV0ucm90YXRpb24sIHIpO1xuICAgIC8vIEF1dG9TbW9vdGgga25vdHMgb3duIHRoZWlyIHJvdGF0aW9uJ3MgZGlyZWN0aW9uOyBvbmx5IHRoZSByb2xsIHN0aWNrcy5cbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIGkpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGN1cnZlc1xuXG4vKiogQ29udHJvbCBwb2ludHMgb2YgY3VydmUgaSAoYmV0d2VlbiBrbm90IGkgYW5kIHRoZSBuZXh0IGtub3QpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnZlKHM6IFNwbGluZUxpa2UsIGk6IG51bWJlciwgb3V0OiBDdXJ2ZSA9IGN1cnZlKCkpOiBDdXJ2ZSB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGNvbnN0IGEgPSBzLmtub3RzW2ldO1xuICAgIGNvbnN0IGIgPSBzLmtub3RzWyhpICsgMSkgJSBuXTtcbiAgICBjb3B5KG91dC5wMCwgYS5wb3NpdGlvbik7XG4gICAgYWRkKG91dC5wMSwgYS5wb3NpdGlvbiwgdGFuZ2VudE91dFZlYyhvdXQucDEsIGEpKTtcbiAgICBhZGQob3V0LnAyLCBiLnBvc2l0aW9uLCB0YW5nZW50SW5WZWMob3V0LnAyLCBiKSk7XG4gICAgY29weShvdXQucDMsIGIucG9zaXRpb24pO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNhY2hlXG5cbi8qKiBTYW1wbGVzIHBlciBjdXJ2ZSBmb3IgdGhlIGRpc3RhbmNlIHRhYmxlLiAqL1xuZXhwb3J0IGNvbnN0IExFTkdUSF9TQU1QTEVTID0gMzI7XG4vKiogU2FtcGxlcyBwZXIgY3VydmUgZm9yIHRoZSB1cC12ZWN0b3IgdGFibGUuICovXG5leHBvcnQgY29uc3QgVVBfU0FNUExFUyA9IDE2O1xuXG5leHBvcnQgY2xhc3MgU3BsaW5lQ2FjaGUge1xuICAgIC8qKiBGaW5nZXJwcmludCBvZiB0aGUgZGF0YSB0aGUgY2FjaGUgd2FzIGJ1aWx0IGZyb20uICovXG4gICAgc3RhbXAgPSBOYU47XG4gICAgY3VydmVzOiBDdXJ2ZVtdID0gW107XG4gICAgbGVuZ3RoczogbnVtYmVyW10gPSBbXTtcbiAgICAvKiogTGVuZ3RoIG9mIGFsbCBjdXJ2ZXMgYmVmb3JlIGN1cnZlIGkuICovXG4gICAgc3RhcnRzOiBudW1iZXJbXSA9IFtdO1xuICAgIHRvdGFsID0gMDtcbiAgICB0YWJsZXM6IEZsb2F0NjRBcnJheVtdID0gW107XG4gICAgdXBzOiAoRmxvYXQ2NEFycmF5IHwgbnVsbClbXSA9IFtdO1xufVxuXG5jb25zdCBfaGFzaEJ1ZiA9IG5ldyBGbG9hdDY0QXJyYXkoMSk7XG5jb25zdCBfaGFzaEludCA9IG5ldyBJbnQzMkFycmF5KF9oYXNoQnVmLmJ1ZmZlcik7XG5cbmZ1bmN0aW9uIG1peChoOiBudW1iZXIsIHY6IG51bWJlcik6IG51bWJlciB7XG4gICAgX2hhc2hCdWZbMF0gPSB2O1xuICAgIGggPSBNYXRoLmltdWwoaCBeIF9oYXNoSW50WzBdLCAxNjc3NzYxOSk7XG4gICAgaCA9IE1hdGguaW11bChoIF4gX2hhc2hJbnRbMV0sIDE2Nzc3NjE5KTtcbiAgICByZXR1cm4gaDtcbn1cblxuLyoqIENoZWFwIGhhc2ggb2YgZXZlcnl0aGluZyB0aGF0IHNoYXBlcyB0aGUgc3BsaW5lLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmdlcnByaW50KHM6IFNwbGluZUxpa2UpOiBudW1iZXIge1xuICAgIGxldCBoID0gMjE2NjEzNjI2MSB8IDA7XG4gICAgaCA9IG1peChoLCBzLmtub3RzLmxlbmd0aCk7XG4gICAgaCA9IG1peChoLCBzLmNsb3NlZCA/IDEgOiAwKTtcbiAgICBmb3IgKGNvbnN0IGsgb2Ygcy5rbm90cykge1xuICAgICAgICBoID0gbWl4KGgsIGsucG9zaXRpb24ueCk7XG4gICAgICAgIGggPSBtaXgoaCwgay5wb3NpdGlvbi55KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnBvc2l0aW9uLnopO1xuICAgICAgICBoID0gbWl4KGgsIGsudGFuZ2VudEluLngpO1xuICAgICAgICBoID0gbWl4KGgsIGsudGFuZ2VudEluLnkpO1xuICAgICAgICBoID0gbWl4KGgsIGsudGFuZ2VudEluLnopO1xuICAgICAgICBoID0gbWl4KGgsIGsudGFuZ2VudE91dC54KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRhbmdlbnRPdXQueSk7XG4gICAgICAgIGggPSBtaXgoaCwgay50YW5nZW50T3V0LnopO1xuICAgICAgICBoID0gbWl4KGgsIGsucm90YXRpb24ueCk7XG4gICAgICAgIGggPSBtaXgoaCwgay5yb3RhdGlvbi55KTtcbiAgICAgICAgaCA9IG1peChoLCBrLnJvdGF0aW9uLnopO1xuICAgICAgICBoID0gbWl4KGgsIGsucm90YXRpb24udyk7XG4gICAgICAgIGggPSBtaXgoaCwgay5tb2RlKTtcbiAgICAgICAgaCA9IG1peChoLCBrLnRlbnNpb24pO1xuICAgIH1cbiAgICByZXR1cm4gaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQ2FjaGUoczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCBzdGFtcCA9IGZpbmdlcnByaW50KHMpKTogU3BsaW5lQ2FjaGUge1xuICAgIGNvbnN0IGNvdW50ID0gY3VydmVDb3VudChzKTtcbiAgICBjYWNoZS5jdXJ2ZXMubGVuZ3RoID0gY291bnQ7XG4gICAgY2FjaGUubGVuZ3Rocy5sZW5ndGggPSBjb3VudDtcbiAgICBjYWNoZS5zdGFydHMubGVuZ3RoID0gY291bnQ7XG4gICAgY2FjaGUudGFibGVzLmxlbmd0aCA9IGNvdW50O1xuICAgIGNhY2hlLnVwcy5sZW5ndGggPSBjb3VudDtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCBjID0gZ2V0Q3VydmUocywgaSwgY2FjaGUuY3VydmVzW2ldIHx8IGN1cnZlKCkpO1xuICAgICAgICBjYWNoZS5jdXJ2ZXNbaV0gPSBjO1xuICAgICAgICBjb25zdCB0YWJsZSA9IGJ1aWxkTGVuZ3RoVGFibGUoYywgTEVOR1RIX1NBTVBMRVMsIGNhY2hlLnRhYmxlc1tpXSk7XG4gICAgICAgIGNhY2hlLnRhYmxlc1tpXSA9IHRhYmxlO1xuICAgICAgICBjYWNoZS5zdGFydHNbaV0gPSB0b3RhbDtcbiAgICAgICAgY2FjaGUubGVuZ3Roc1tpXSA9IHRhYmxlW0xFTkdUSF9TQU1QTEVTIC0gMV07XG4gICAgICAgIHRvdGFsICs9IGNhY2hlLmxlbmd0aHNbaV07XG4gICAgICAgIGNhY2hlLnVwc1tpXSA9IG51bGw7IC8vIGJ1aWx0IG9uIGRlbWFuZFxuICAgIH1cbiAgICBjYWNoZS50b3RhbCA9IHRvdGFsO1xuICAgIGNhY2hlLnN0YW1wID0gc3RhbXA7XG4gICAgcmV0dXJuIGNhY2hlO1xufVxuXG4vKiogUmVidWlsZHMgdGhlIGNhY2hlIHdoZW4gdGhlIHNwbGluZSBjaGFuZ2VkLiBSZXR1cm5zIHRoZSB1cC10by1kYXRlIGNhY2hlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUNhY2hlKHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSk6IFNwbGluZUNhY2hlIHtcbiAgICBjb25zdCBzdGFtcCA9IGZpbmdlcnByaW50KHMpO1xuICAgIGlmIChzdGFtcCAhPT0gY2FjaGUuc3RhbXApIGJ1aWxkQ2FjaGUocywgY2FjaGUsIHN0YW1wKTtcbiAgICByZXR1cm4gY2FjaGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VydmVQb2ludCB7XG4gICAgLyoqIEN1cnZlIGluZGV4LiAqL1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgLyoqIFBhcmFtZXRlciBvbiB0aGF0IGN1cnZlLCAwLi4xLiAqL1xuICAgIHQ6IG51bWJlcjtcbn1cblxuLyoqIEN1cnZlIGFuZCBjdXJ2ZSBwYXJhbWV0ZXIgYXQgYSBub3JtYWxpemVkIGRpc3RhbmNlIHQgKDAuLjEpIGFsb25nIHRoZSB3aG9sZSBzcGxpbmUuICovXG5leHBvcnQgZnVuY3Rpb24gY3VydmVQb2ludEF0KGNhY2hlOiBTcGxpbmVDYWNoZSwgdDogbnVtYmVyLCBvdXQ6IEN1cnZlUG9pbnQgPSB7IGluZGV4OiAwLCB0OiAwIH0pOiBDdXJ2ZVBvaW50IHtcbiAgICBjb25zdCBjb3VudCA9IGNhY2hlLmN1cnZlcy5sZW5ndGg7XG4gICAgaWYgKCFjb3VudCkge1xuICAgICAgICBvdXQuaW5kZXggPSAwO1xuICAgICAgICBvdXQudCA9IDA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIGlmIChjYWNoZS50b3RhbCA8PSBFUFNJTE9OKSB7XG4gICAgICAgIC8vIERlZ2VuZXJhdGUgKGFsbCBrbm90cyBvbiBvbmUgcG9pbnQpOiBmYWxsIGJhY2sgdG8gdW5pZm9ybSBwYXJhbWV0ZXJpemF0aW9uLlxuICAgICAgICBjb25zdCB4ID0gY2xhbXAwMSh0KSAqIGNvdW50O1xuICAgICAgICBvdXQuaW5kZXggPSBNYXRoLm1pbihNYXRoLmZsb29yKHgpLCBjb3VudCAtIDEpO1xuICAgICAgICBvdXQudCA9IHggLSBvdXQuaW5kZXg7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIGNvbnN0IGQgPSBjbGFtcDAxKHQpICogY2FjaGUudG90YWw7XG4gICAgbGV0IGxvID0gMDtcbiAgICBsZXQgaGkgPSBjb3VudCAtIDE7XG4gICAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICAgICAgY29uc3QgbWlkID0gKGxvICsgaGkgKyAxKSA+PiAxO1xuICAgICAgICBpZiAoY2FjaGUuc3RhcnRzW21pZF0gPD0gZCkgbG8gPSBtaWQ7XG4gICAgICAgIGVsc2UgaGkgPSBtaWQgLSAxO1xuICAgIH1cbiAgICBvdXQuaW5kZXggPSBsbztcbiAgICBvdXQudCA9IHJlZmluZVQoY2FjaGUuY3VydmVzW2xvXSwgY2FjaGUudGFibGVzW2xvXSwgZCAtIGNhY2hlLnN0YXJ0c1tsb10pO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmNvbnN0IF9kdiA9IHYzKCk7XG5cbi8qKiBFeGFjdCBhcmMgbGVuZ3RoIGZyb20gMCB0byB0OiB0aGUgdGFibGUgdXAgdG8gdGhlIHNhbXBsZSBiZWZvcmUgdCwgaW50ZWdyYXRlZCBmcm9tIHRoZXJlLiAqL1xuZnVuY3Rpb24gZXhhY3RMZW5ndGhBdChjOiBDdXJ2ZSwgdGFibGU6IEZsb2F0NjRBcnJheSwgdDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBuID0gdGFibGUubGVuZ3RoO1xuICAgIGlmICh0IDw9IDApIHJldHVybiAwO1xuICAgIGlmICh0ID49IDEpIHJldHVybiB0YWJsZVtuIC0gMV07XG4gICAgY29uc3QgaSA9IE1hdGgubWluKE1hdGguZmxvb3IodCAqIChuIC0gMSkpLCBuIC0gMik7XG4gICAgcmV0dXJuIHRhYmxlW2ldICsgYXJjTGVuZ3RoKGMsIGkgLyAobiAtIDEpLCB0KTtcbn1cblxuLyoqIHQgYXQgYXJjIGxlbmd0aCBkOiB0YWJsZSBsb29rdXAsIHRoZW4gTmV3dG9uIHN0ZXBzIG9uIHRoZSBleGFjdCBsZW5ndGguICovXG5mdW5jdGlvbiByZWZpbmVUKGM6IEN1cnZlLCB0YWJsZTogRmxvYXQ2NEFycmF5LCBkOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB0ID0gdEF0TGVuZ3RoKHRhYmxlLCBkKTtcbiAgICBjb25zdCBuID0gdGFibGUubGVuZ3RoO1xuICAgIGlmICh0IDw9IDAgfHwgdCA+PSAxKSByZXR1cm4gdDtcbiAgICBjb25zdCBpID0gTWF0aC5taW4oTWF0aC5mbG9vcih0ICogKG4gLSAxKSksIG4gLSAyKTtcbiAgICBjb25zdCBsbyA9IGkgLyAobiAtIDEpO1xuICAgIGNvbnN0IGhpID0gKGkgKyAxKSAvIChuIC0gMSk7XG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCAyOyBrKyspIHtcbiAgICAgICAgY29uc3QgZXJyID0gdGFibGVbaV0gKyBhcmNMZW5ndGgoYywgbG8sIHQpIC0gZDtcbiAgICAgICAgY29uc3Qgc3BlZWQgPSBsZW4oZXZhbERlcml2YXRpdmUoX2R2LCBjLCB0KSk7XG4gICAgICAgIGlmIChzcGVlZCA8IEVQU0lMT04pIGJyZWFrO1xuICAgICAgICB0ID0gTWF0aC5taW4oaGksIE1hdGgubWF4KGxvLCB0IC0gZXJyIC8gc3BlZWQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59XG5cbi8qKiBOb3JtYWxpemVkIGRpc3RhbmNlICgwLi4xKSBvZiBhIGN1cnZlIHBvaW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZWRUT2YoY2FjaGU6IFNwbGluZUNhY2hlLCBpbmRleDogbnVtYmVyLCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIDA7XG4gICAgaWYgKGNhY2hlLnRvdGFsIDw9IEVQU0lMT04pIHJldHVybiAoaW5kZXggKyB0KSAvIGNhY2hlLmN1cnZlcy5sZW5ndGg7XG4gICAgcmV0dXJuIChjYWNoZS5zdGFydHNbaW5kZXhdICsgZXhhY3RMZW5ndGhBdChjYWNoZS5jdXJ2ZXNbaW5kZXhdLCBjYWNoZS50YWJsZXNbaW5kZXhdLCB0KSkgLyBjYWNoZS50b3RhbDtcbn1cblxuLyoqIEtub3QtaW5kZXggdW5pdCAoY3VydmUgaW5kZXggKyBjdXJ2ZSB0LCBlLmcuIDIuNSA9IGhhbGZ3YXkgYmV0d2VlbiBrbm90cyAyIGFuZCAzKSB0byBub3JtYWxpemVkIHQuICovXG5leHBvcnQgZnVuY3Rpb24ga25vdFVuaXRUb1QoY2FjaGU6IFNwbGluZUNhY2hlLCBrOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNvdW50ID0gY2FjaGUuY3VydmVzLmxlbmd0aDtcbiAgICBpZiAoIWNvdW50KSByZXR1cm4gMDtcbiAgICBjb25zdCBpID0gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5mbG9vcihrKSwgMCksIGNvdW50IC0gMSk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRUT2YoY2FjaGUsIGksIGNsYW1wMDEoayAtIGkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRUb0tub3RVbml0KGNhY2hlOiBTcGxpbmVDYWNoZSwgdDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBwID0gY3VydmVQb2ludEF0KGNhY2hlLCB0KTtcbiAgICByZXR1cm4gcC5pbmRleCArIHAudDtcbn1cblxuY29uc3QgX2NwOiBDdXJ2ZVBvaW50ID0geyBpbmRleDogMCwgdDogMCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVQb3NpdGlvbjxUIGV4dGVuZHMgVjM+KHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSwgdDogbnVtYmVyLCBvdXQ6IFQpOiBUIHtcbiAgICBpZiAoIXMua25vdHMubGVuZ3RoKSByZXR1cm4gc2V0KG91dCwgMCwgMCwgMCk7XG4gICAgaWYgKHMua25vdHMubGVuZ3RoID09PSAxIHx8ICFjYWNoZS5jdXJ2ZXMubGVuZ3RoKSByZXR1cm4gY29weShvdXQsIHMua25vdHNbMF0ucG9zaXRpb24pO1xuICAgIGN1cnZlUG9pbnRBdChjYWNoZSwgdCwgX2NwKTtcbiAgICByZXR1cm4gZXZhbFBvc2l0aW9uKG91dCwgY2FjaGUuY3VydmVzW19jcC5pbmRleF0sIF9jcC50KTtcbn1cblxuLyoqIFVuaXQgZGlyZWN0aW9uIG9mIHRyYXZlbCBhdCB0LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlRGlyZWN0aW9uPFQgZXh0ZW5kcyBWMz4oczogU3BsaW5lTGlrZSwgY2FjaGU6IFNwbGluZUNhY2hlLCB0OiBudW1iZXIsIG91dDogVCk6IFQge1xuICAgIGlmIChzLmtub3RzLmxlbmd0aCA8IDIgfHwgIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHMua25vdHMubGVuZ3RoID09PSAxKSByZXR1cm4gbm9ybWFsaXplKG91dCwgdGFuZ2VudE91dFZlYyhvdXQsIHMua25vdHNbMF0pKTtcbiAgICAgICAgcmV0dXJuIHNldChvdXQsIDAsIDAsIDEpO1xuICAgIH1cbiAgICBjdXJ2ZVBvaW50QXQoY2FjaGUsIHQsIF9jcCk7XG4gICAgcmV0dXJuIGV2YWxEaXJlY3Rpb24ob3V0LCBjYWNoZS5jdXJ2ZXNbX2NwLmluZGV4XSwgX2NwLnQpO1xufVxuXG4vKiogVW5pdCB1cCB2ZWN0b3IgYXQgdDoga25vdCB1cCB2ZWN0b3JzIGNhcnJpZWQgYWxvbmcgdGhlIGN1cnZlIHdpdGhvdXQgdHdpc3RpbmcuICovXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVVcDxUIGV4dGVuZHMgVjM+KHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSwgdDogbnVtYmVyLCBvdXQ6IFQpOiBUIHtcbiAgICBpZiAoIXMua25vdHMubGVuZ3RoKSByZXR1cm4gc2V0KG91dCwgMCwgMSwgMCk7XG4gICAgaWYgKHMua25vdHMubGVuZ3RoID09PSAxIHx8ICFjYWNoZS5jdXJ2ZXMubGVuZ3RoKSByZXR1cm4ga25vdFVwKG91dCwgcy5rbm90c1swXSk7XG4gICAgY3VydmVQb2ludEF0KGNhY2hlLCB0LCBfY3ApO1xuICAgIHJldHVybiBjdXJ2ZVVwKHMsIGNhY2hlLCBfY3AuaW5kZXgsIF9jcC50LCBvdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3VydmVVcDxUIGV4dGVuZHMgVjM+KHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSwgaW5kZXg6IG51bWJlciwgdDogbnVtYmVyLCBvdXQ6IFQpOiBUIHtcbiAgICBsZXQgdGFibGUgPSBjYWNoZS51cHNbaW5kZXhdO1xuICAgIGlmICghdGFibGUpIHRhYmxlID0gY2FjaGUudXBzW2luZGV4XSA9IGJ1aWxkVXBUYWJsZShzLCBjYWNoZS5jdXJ2ZXNbaW5kZXhdLCBpbmRleCk7XG4gICAgY29uc3QgeCA9IGNsYW1wMDEodCkgKiBVUF9TQU1QTEVTO1xuICAgIGNvbnN0IGkgPSBNYXRoLm1pbihNYXRoLmZsb29yKHgpLCBVUF9TQU1QTEVTIC0gMSk7XG4gICAgY29uc3QgZiA9IHggLSBpO1xuICAgIGNvbnN0IGEgPSB2Myh0YWJsZVtpICogM10sIHRhYmxlW2kgKiAzICsgMV0sIHRhYmxlW2kgKiAzICsgMl0pO1xuICAgIGNvbnN0IGIgPSB2Myh0YWJsZVtpICogMyArIDNdLCB0YWJsZVtpICogMyArIDRdLCB0YWJsZVtpICogMyArIDVdKTtcbiAgICBsZXJwKG91dCwgYSwgYiwgZik7XG4gICAgLy8gS2VlcCBpdCBwZXJwZW5kaWN1bGFyIHRvIHRoZSBkaXJlY3Rpb24gb2YgdHJhdmVsLlxuICAgIGNvbnN0IGRpciA9IGV2YWxEaXJlY3Rpb24odjMoKSwgY2FjaGUuY3VydmVzW2luZGV4XSwgdCk7XG4gICAgcHJvamVjdE9uUGxhbmUob3V0LCBvdXQsIGRpcik7XG4gICAgaWYgKGxlblNxKG91dCkgPCBFUFNJTE9OKSByZXR1cm4gbm9ybWFsaXplKG91dCwgYSk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZShvdXQsIG91dCk7XG59XG5cbi8qKlxuICogVXAgdmVjdG9ycyBhbG9uZyBhIGN1cnZlOiB0aGUgc3RhcnQga25vdCdzIHVwIGNhcnJpZWQgYnkgYSByb3RhdGlvblxuICogbWluaW1pemluZyBmcmFtZSAoZG91YmxlIHJlZmxlY3Rpb24pLCB3aXRoIHRoZSB0d2lzdCBuZWVkZWQgdG8gbWVldCB0aGUgZW5kXG4gKiBrbm90J3MgdXAgc3ByZWFkIGV2ZW5seSBvdmVyIHRoZSBjdXJ2ZS5cbiAqL1xuZnVuY3Rpb24gYnVpbGRVcFRhYmxlKHM6IFNwbGluZUxpa2UsIGM6IEN1cnZlLCBpbmRleDogbnVtYmVyKTogRmxvYXQ2NEFycmF5IHtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgY29uc3QgYSA9IHMua25vdHNbaW5kZXhdO1xuICAgIGNvbnN0IGIgPSBzLmtub3RzWyhpbmRleCArIDEpICUgbl07XG4gICAgY29uc3QgdGFibGUgPSBuZXcgRmxvYXQ2NEFycmF5KChVUF9TQU1QTEVTICsgMSkgKiAzKTtcblxuICAgIGNvbnN0IHBvczogVjNbXSA9IFtdO1xuICAgIGNvbnN0IGRpcnM6IFYzW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBVUF9TQU1QTEVTOyBpKyspIHtcbiAgICAgICAgY29uc3QgdCA9IGkgLyBVUF9TQU1QTEVTO1xuICAgICAgICBwb3MucHVzaChldmFsUG9zaXRpb24odjMoKSwgYywgdCkpO1xuICAgICAgICBkaXJzLnB1c2goZXZhbERpcmVjdGlvbih2MygpLCBjLCB0KSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXBzOiBWM1tdID0gW107XG4gICAgbGV0IHIgPSBub3JtYWxpemUodjMoKSwgcHJvamVjdE9uUGxhbmUodjMoKSwga25vdFVwKHYzKCksIGEpLCBkaXJzWzBdKSk7XG4gICAgaWYgKGxlblNxKHIpIDwgRVBTSUxPTikgciA9IGFueVBlcnBlbmRpY3VsYXIodjMoKSwgZGlyc1swXSk7XG4gICAgdXBzLnB1c2gocik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBVUF9TQU1QTEVTOyBpKyspIHtcbiAgICAgICAgLy8gRG91YmxlIHJlZmxlY3Rpb24gKFdhbmcgZXQgYWwuIDIwMDgpLlxuICAgICAgICBjb25zdCB2MSA9IHN1Yih2MygpLCBwb3NbaSArIDFdLCBwb3NbaV0pO1xuICAgICAgICBjb25zdCBjMSA9IGRvdCh2MSwgdjEpO1xuICAgICAgICBjb25zdCByaSA9IHVwc1tpXTtcbiAgICAgICAgY29uc3QgdGkgPSBkaXJzW2ldO1xuICAgICAgICBsZXQgckwgPSByaTtcbiAgICAgICAgbGV0IHRMID0gdGk7XG4gICAgICAgIGlmIChjMSA+IEVQU0lMT04gKiBFUFNJTE9OKSB7XG4gICAgICAgICAgICByTCA9IHNjYWxlQW5kQWRkKHYzKCksIHJpLCB2MSwgKC0yIC8gYzEpICogZG90KHYxLCByaSkpO1xuICAgICAgICAgICAgdEwgPSBzY2FsZUFuZEFkZCh2MygpLCB0aSwgdjEsICgtMiAvIGMxKSAqIGRvdCh2MSwgdGkpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2MiA9IHN1Yih2MygpLCBkaXJzW2kgKyAxXSwgdEwpO1xuICAgICAgICBjb25zdCBjMiA9IGRvdCh2MiwgdjIpO1xuICAgICAgICBsZXQgbmV4dCA9IHJMO1xuICAgICAgICBpZiAoYzIgPiBFUFNJTE9OICogRVBTSUxPTikgbmV4dCA9IHNjYWxlQW5kQWRkKHYzKCksIHJMLCB2MiwgKC0yIC8gYzIpICogZG90KHYyLCByTCkpO1xuICAgICAgICBuZXh0ID0gbm9ybWFsaXplKHYzKCksIHByb2plY3RPblBsYW5lKHYzKCksIG5leHQsIGRpcnNbaSArIDFdKSk7XG4gICAgICAgIGlmIChsZW5TcShuZXh0KSA8IEVQU0lMT04pIG5leHQgPSBjb3B5KHYzKCksIHVwc1tpXSk7XG4gICAgICAgIHVwcy5wdXNoKG5leHQpO1xuICAgIH1cblxuICAgIC8vIFR3aXN0IHRvIHJlYWNoIHRoZSBlbmQga25vdCdzIHVwLlxuICAgIGNvbnN0IGVuZFVwID0gbm9ybWFsaXplKHYzKCksIHByb2plY3RPblBsYW5lKHYzKCksIGtub3RVcCh2MygpLCBiKSwgZGlyc1tVUF9TQU1QTEVTXSkpO1xuICAgIGxldCB0d2lzdCA9IDA7XG4gICAgaWYgKGxlblNxKGVuZFVwKSA+IEVQU0lMT04pIHtcbiAgICAgICAgY29uc3QgbGFzdCA9IHVwc1tVUF9TQU1QTEVTXTtcbiAgICAgICAgY29uc3QgYyA9IGNyb3NzKHYzKCksIGxhc3QsIGVuZFVwKTtcbiAgICAgICAgdHdpc3QgPSBNYXRoLmF0YW4yKGRvdChjLCBkaXJzW1VQX1NBTVBMRVNdKSwgZG90KGxhc3QsIGVuZFVwKSk7XG4gICAgfVxuICAgIGNvbnN0IHEgPSBxNCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IFVQX1NBTVBMRVM7IGkrKykge1xuICAgICAgICBsZXQgdSA9IHVwc1tpXTtcbiAgICAgICAgaWYgKHR3aXN0ICE9PSAwKSB7XG4gICAgICAgICAgICBxRnJvbUF4aXNBbmdsZShxLCBkaXJzW2ldLCAodHdpc3QgKiBpKSAvIFVQX1NBTVBMRVMpO1xuICAgICAgICAgICAgdSA9IHFSb3RhdGUodjMoKSwgcSwgdSk7XG4gICAgICAgIH1cbiAgICAgICAgdGFibGVbaSAqIDNdID0gdS54O1xuICAgICAgICB0YWJsZVtpICogMyArIDFdID0gdS55O1xuICAgICAgICB0YWJsZVtpICogMyArIDJdID0gdS56O1xuICAgIH1cbiAgICByZXR1cm4gdGFibGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmVhcmVzdFJlc3VsdCB7XG4gICAgLyoqIE5vcm1hbGl6ZWQgZGlzdGFuY2UgYWxvbmcgdGhlIHNwbGluZSAoMC4uMSkuICovXG4gICAgdDogbnVtYmVyO1xuICAgIGN1cnZlOiBudW1iZXI7XG4gICAgY3VydmVUOiBudW1iZXI7XG4gICAgcG9zaXRpb246IFYzO1xuICAgIGRpc3RhbmNlOiBudW1iZXI7XG59XG5cbi8qKiBDbG9zZXN0IHBvaW50IG9uIHRoZSBzcGxpbmUgdG8gYHBgIChzcGxpbmUgc3BhY2UpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5lYXJlc3RQb2ludChzOiBTcGxpbmVMaWtlLCBjYWNoZTogU3BsaW5lQ2FjaGUsIHA6IFYzKTogTmVhcmVzdFJlc3VsdCB7XG4gICAgY29uc3QgcmVzOiBOZWFyZXN0UmVzdWx0ID0geyB0OiAwLCBjdXJ2ZTogMCwgY3VydmVUOiAwLCBwb3NpdGlvbjogdjMoKSwgZGlzdGFuY2U6IEluZmluaXR5IH07XG4gICAgaWYgKCFzLmtub3RzLmxlbmd0aCkgcmV0dXJuIHJlcztcbiAgICBpZiAoIWNhY2hlLmN1cnZlcy5sZW5ndGgpIHtcbiAgICAgICAgY29weShyZXMucG9zaXRpb24sIHMua25vdHNbMF0ucG9zaXRpb24pO1xuICAgICAgICByZXMuZGlzdGFuY2UgPSBkaXN0KHAsIHJlcy5wb3NpdGlvbik7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGxldCBiZXN0ID0gSW5maW5pdHk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWNoZS5jdXJ2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgciA9IG5lYXJlc3RUKGNhY2hlLmN1cnZlc1tpXSwgcCwgMTYsIDEwKTtcbiAgICAgICAgaWYgKHIuZGlzdFNxIDwgYmVzdCkge1xuICAgICAgICAgICAgYmVzdCA9IHIuZGlzdFNxO1xuICAgICAgICAgICAgcmVzLmN1cnZlID0gaTtcbiAgICAgICAgICAgIHJlcy5jdXJ2ZVQgPSByLnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXZhbFBvc2l0aW9uKHJlcy5wb3NpdGlvbiwgY2FjaGUuY3VydmVzW3Jlcy5jdXJ2ZV0sIHJlcy5jdXJ2ZVQpO1xuICAgIHJlcy5kaXN0YW5jZSA9IE1hdGguc3FydChiZXN0KTtcbiAgICByZXMudCA9IG5vcm1hbGl6ZWRUT2YoY2FjaGUsIHJlcy5jdXJ2ZSwgcmVzLmN1cnZlVCk7XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBNb3ZlcyBgZGlzdGFuY2VgIGFsb25nIHRoZSBzcGxpbmUgZnJvbSBub3JtYWxpemVkIGBmcm9tVGAgKG5lZ2F0aXZlIGdvZXNcbiAqIGJhY2spLiBSZXR1cm5zIHRoZSByZXN1bHRpbmcgbm9ybWFsaXplZCB0IChjbGFtcGVkIG9uIG9wZW4gc3BsaW5lcyxcbiAqIHdyYXBwZWQgb24gY2xvc2VkIG9uZXMpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdEF0RGlzdGFuY2VGcm9tKHM6IFNwbGluZUxpa2UsIGNhY2hlOiBTcGxpbmVDYWNoZSwgZnJvbVQ6IG51bWJlciwgZGlzdGFuY2U6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGNhY2hlLnRvdGFsIDw9IEVQU0lMT04pIHJldHVybiBjbGFtcDAxKGZyb21UKTtcbiAgICBjb25zdCB0ID0gZnJvbVQgKyBkaXN0YW5jZSAvIGNhY2hlLnRvdGFsO1xuICAgIHJldHVybiBzLmNsb3NlZCA/IHdyYXAodCwgMSkgOiBjbGFtcDAxKHQpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZWRpdCBvcHNcblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEtub3QoczogU3BsaW5lTGlrZSwgaW5kZXg6IG51bWJlciwgazogS25vdExpa2UpOiB2b2lkIHtcbiAgICBzLmtub3RzLnNwbGljZShpbmRleCwgMCwgayk7XG4gICAgcmVmcmVzaEFyb3VuZChzLCBpbmRleCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVLbm90KHM6IFNwbGluZUxpa2UsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBzLmtub3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGlmICghbikgcmV0dXJuO1xuICAgIGNvbnN0IG5leHQgPSBNYXRoLm1pbihpbmRleCwgbiAtIDEpO1xuICAgIGFwcGx5VGFuZ2VudE1vZGUocywgcHJldkluZGV4KG5leHQsIG4sIHMuY2xvc2VkKSk7XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBuZXh0KTtcbn1cblxuLyoqXG4gKiBJbnNlcnRzIGEga25vdCBvbiBjdXJ2ZSBgY3VydmVJbmRleGAgYXQgcGFyYW1ldGVyIHQgd2l0aG91dCBjaGFuZ2luZyB0aGVcbiAqIHNoYXBlIChkZSBDYXN0ZWxqYXUgc3BsaXQpLiBSZXR1cm5zIHRoZSBuZXcga25vdCdzIGluZGV4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0T25DdXJ2ZShzOiBTcGxpbmVMaWtlLCBjdXJ2ZUluZGV4OiBudW1iZXIsIHQ6IG51bWJlciwgZmFjdG9yeTogRmFjdG9yeSk6IG51bWJlciB7XG4gICAgY29uc3QgbiA9IHMua25vdHMubGVuZ3RoO1xuICAgIGNvbnN0IGlhID0gY3VydmVJbmRleDtcbiAgICBjb25zdCBpYiA9IChjdXJ2ZUluZGV4ICsgMSkgJSBuO1xuICAgIGNvbnN0IGEgPSBzLmtub3RzW2lhXTtcbiAgICBjb25zdCBiID0gcy5rbm90c1tpYl07XG4gICAgY29uc3QgYyA9IGdldEN1cnZlKHMsIGN1cnZlSW5kZXgpO1xuICAgIGNvbnN0IGxlZnQgPSBjdXJ2ZSgpO1xuICAgIGNvbnN0IHJpZ2h0ID0gY3VydmUoKTtcbiAgICBzcGxpdChjLCB0LCBsZWZ0LCByaWdodCk7XG5cbiAgICBjb25zdCBrID0gZmFjdG9yeS5rbm90KCk7XG4gICAgY29weShrLnBvc2l0aW9uLCBsZWZ0LnAzKTtcbiAgICBrLnRlbnNpb24gPSBERUZBVUxUX1RFTlNJT047XG5cbiAgICBjb25zdCBib3RoQXV0byA9IGEubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCAmJiBiLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGg7XG4gICAgY29uc3QgYm90aExpbmVhciA9IGEubW9kZSA9PT0gVGFuZ2VudE1vZGUuTGluZWFyICYmIGIubW9kZSA9PT0gVGFuZ2VudE1vZGUuTGluZWFyO1xuXG4gICAgLy8gVGhlIG5ldyBrbm90J3MgdXAgYmxlbmRzIGJldHdlZW4gaXRzIG5laWdoYm9ycycuXG4gICAgY29uc3QgdXAgPSBrbm90VXAodjMoKSwgYSk7XG4gICAgY29uc3QgdXBCID0ga25vdFVwKHYzKCksIGIpO1xuICAgIGxlcnAodXAsIHVwLCB1cEIsIHQpO1xuICAgIGNvbnN0IG91dERpciA9IHN1Yih2MygpLCByaWdodC5wMSwgcmlnaHQucDApO1xuICAgIGtub3RSb3RhdGlvbihrLnJvdGF0aW9uLCBsZW5TcShvdXREaXIpID4gRVBTSUxPTiA/IG91dERpciA6IHN1Yih2MygpLCByaWdodC5wMCwgbGVmdC5wMiksIHVwKTtcblxuICAgIGlmIChib3RoQXV0bykge1xuICAgICAgICBrLm1vZGUgPSBUYW5nZW50TW9kZS5BdXRvU21vb3RoO1xuICAgIH0gZWxzZSBpZiAoYm90aExpbmVhcikge1xuICAgICAgICBrLm1vZGUgPSBUYW5nZW50TW9kZS5MaW5lYXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gS2VlcCB0aGUgZXhhY3Qgc2hhcGU6IHNob3J0ZW4gdGhlIG5laWdoYm9ycycgaGFuZGxlcywgdGhlIG5ldyBrbm90IGdldHMgdGhlIHNwbGl0IGhhbmRsZXMuXG4gICAgICAgIGlmIChhLm1vZGUgPT09IFRhbmdlbnRNb2RlLk1pcnJvcmVkKSBhLm1vZGUgPSBUYW5nZW50TW9kZS5Db250aW51b3VzO1xuICAgICAgICBpZiAoYi5tb2RlID09PSBUYW5nZW50TW9kZS5NaXJyb3JlZCkgYi5tb2RlID0gVGFuZ2VudE1vZGUuQ29udGludW91cztcbiAgICAgICAgaWYgKHRhbmdlbnRzRWRpdGFibGUoYS5tb2RlKSkge1xuICAgICAgICAgICAgcVJvdGF0ZShhLnRhbmdlbnRPdXQsIHFJbnZlcnQocTQoKSwgYS5yb3RhdGlvbiksIHN1Yih2MygpLCBsZWZ0LnAxLCBsZWZ0LnAwKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhbmdlbnRzRWRpdGFibGUoYi5tb2RlKSkge1xuICAgICAgICAgICAgcVJvdGF0ZShiLnRhbmdlbnRJbiwgcUludmVydChxNCgpLCBiLnJvdGF0aW9uKSwgc3ViKHYzKCksIHJpZ2h0LnAyLCByaWdodC5wMykpO1xuICAgICAgICB9XG4gICAgICAgIGsubW9kZSA9IFRhbmdlbnRNb2RlLkNvbnRpbnVvdXM7XG4gICAgICAgIGNvbnN0IGludiA9IHFJbnZlcnQocTQoKSwgay5yb3RhdGlvbik7XG4gICAgICAgIHFSb3RhdGUoay50YW5nZW50SW4sIGludiwgc3ViKHYzKCksIGxlZnQucDIsIGxlZnQucDMpKTtcbiAgICAgICAgcVJvdGF0ZShrLnRhbmdlbnRPdXQsIGludiwgc3ViKHYzKCksIHJpZ2h0LnAxLCByaWdodC5wMCkpO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IGlhICsgMTtcbiAgICBzLmtub3RzLnNwbGljZShpbmRleCwgMCwgayk7XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCBpbmRleCk7XG4gICAgY29uc3QgbSA9IHMua25vdHMubGVuZ3RoO1xuICAgIGNvbnN0IHAgPSBwcmV2SW5kZXgoaW5kZXgsIG0sIHMuY2xvc2VkKTtcbiAgICBjb25zdCBxID0gbmV4dEluZGV4KGluZGV4LCBtLCBzLmNsb3NlZCk7XG4gICAgaWYgKHMua25vdHNbcF0ubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCkgYXBwbHlUYW5nZW50TW9kZShzLCBwKTtcbiAgICBpZiAocy5rbm90c1txXS5tb2RlID09PSBUYW5nZW50TW9kZS5BdXRvU21vb3RoKSBhcHBseVRhbmdlbnRNb2RlKHMsIHEpO1xuICAgIHJldHVybiBpbmRleDtcbn1cblxuY29uc3QgWTE4MCA9IHE0KDAsIDEsIDAsIDApO1xuXG4vKiogUmV2ZXJzZXMgdGhlIGRpcmVjdGlvbiBvZiB0cmF2ZWw7IHRoZSBzaGFwZSBzdGF5cyB0aGUgc2FtZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlRmxvdyhzOiBTcGxpbmVMaWtlKTogdm9pZCB7XG4gICAgcy5rbm90cy5yZXZlcnNlKCk7XG4gICAgZm9yIChjb25zdCBrIG9mIHMua25vdHMpIHtcbiAgICAgICAgLy8gVHVybiB0aGUga25vdCBhcm91bmQgaXRzIHVwIGF4aXM7IGluIGFuZCBvdXQgc3dhcCBwbGFjZXMuXG4gICAgICAgIGNvbnN0IG9sZEluID0gcVJvdGF0ZSh2MygpLCBZMTgwLCBrLnRhbmdlbnRJbik7XG4gICAgICAgIGNvbnN0IG9sZE91dCA9IHFSb3RhdGUodjMoKSwgWTE4MCwgay50YW5nZW50T3V0KTtcbiAgICAgICAgY29weShrLnRhbmdlbnRJbiwgb2xkT3V0KTtcbiAgICAgICAgY29weShrLnRhbmdlbnRPdXQsIG9sZEluKTtcbiAgICAgICAgcU11bChrLnJvdGF0aW9uLCBrLnJvdGF0aW9uLCBZMTgwKTtcbiAgICB9XG4gICAgcmVmcmVzaEFsbChzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENsb3NlZChzOiBTcGxpbmVMaWtlLCBjbG9zZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBzLmNsb3NlZCA9IGNsb3NlZDtcbiAgICBjb25zdCBuID0gcy5rbm90cy5sZW5ndGg7XG4gICAgaWYgKCFuKSByZXR1cm47XG4gICAgYXBwbHlUYW5nZW50TW9kZShzLCAwKTtcbiAgICBhcHBseVRhbmdlbnRNb2RlKHMsIG4gLSAxKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjb250YWluZXIgb3BzXG5cbmV4cG9ydCBpbnRlcmZhY2UgS25vdFJlZiB7XG4gICAgc3BsaW5lOiBudW1iZXI7XG4gICAga25vdDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FtZVJlZihhOiBLbm90UmVmLCBiOiBLbm90UmVmKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGEuc3BsaW5lID09PSBiLnNwbGluZSAmJiBhLmtub3QgPT09IGIua25vdDtcbn1cblxuZnVuY3Rpb24gZ3JvdXBPZihjOiBDb250YWluZXJMaWtlLCByOiBLbm90UmVmKTogTGlua0xpa2UgfCBudWxsIHtcbiAgICBmb3IgKGNvbnN0IGcgb2YgYy5saW5rcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBnLmtub3RzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICBpZiAoZy5rbm90c1tpXSA9PT0gci5zcGxpbmUgJiYgZy5rbm90c1tpICsgMV0gPT09IHIua25vdCkgcmV0dXJuIGc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiBLbm90cyBsaW5rZWQgdG8gYHJgIChleGNsdWRpbmcgciBpdHNlbGYpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbmtlZEtub3RzKGM6IENvbnRhaW5lckxpa2UsIHI6IEtub3RSZWYpOiBLbm90UmVmW10ge1xuICAgIGNvbnN0IGcgPSBncm91cE9mKGMsIHIpO1xuICAgIGlmICghZykgcmV0dXJuIFtdO1xuICAgIGNvbnN0IHJlczogS25vdFJlZltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgZy5rbm90cy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBjb25zdCBvID0geyBzcGxpbmU6IGcua25vdHNbaV0sIGtub3Q6IGcua25vdHNbaSArIDFdIH07XG4gICAgICAgIGlmICghc2FtZVJlZihvLCByKSkgcmVzLnB1c2gobyk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpbmtlZChjOiBDb250YWluZXJMaWtlLCByOiBLbm90UmVmKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhZ3JvdXBPZihjLCByKTtcbn1cblxuLyoqIExpbmtzIGFsbCBnaXZlbiBrbm90cyB0b2dldGhlciAobWVyZ2luZyB0aGVpciBleGlzdGluZyBncm91cHMpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbmtLbm90cyhjOiBDb250YWluZXJMaWtlLCByZWZzOiBLbm90UmVmW10sIGZhY3Rvcnk6IEZhY3RvcnkpOiB2b2lkIHtcbiAgICBpZiAocmVmcy5sZW5ndGggPCAyKSByZXR1cm47XG4gICAgY29uc3QgbWVtYmVyczogS25vdFJlZltdID0gW107XG4gICAgY29uc3QgYWRkID0gKHI6IEtub3RSZWYpID0+IHtcbiAgICAgICAgaWYgKCFtZW1iZXJzLnNvbWUoKG0pID0+IHNhbWVSZWYobSwgcikpKSBtZW1iZXJzLnB1c2gocik7XG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IHIgb2YgcmVmcykge1xuICAgICAgICBjb25zdCBnID0gZ3JvdXBPZihjLCByKTtcbiAgICAgICAgaWYgKGcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpICsgMSA8IGcua25vdHMubGVuZ3RoOyBpICs9IDIpIGFkZCh7IHNwbGluZTogZy5rbm90c1tpXSwga25vdDogZy5rbm90c1tpICsgMV0gfSk7XG4gICAgICAgICAgICBjLmxpbmtzLnNwbGljZShjLmxpbmtzLmluZGV4T2YoZyksIDEpO1xuICAgICAgICB9XG4gICAgICAgIGFkZChyKTtcbiAgICB9XG4gICAgY29uc3QgZyA9IGZhY3RvcnkubGluaygpO1xuICAgIGcua25vdHMubGVuZ3RoID0gMDtcbiAgICBmb3IgKGNvbnN0IG0gb2YgbWVtYmVycykgZy5rbm90cy5wdXNoKG0uc3BsaW5lLCBtLmtub3QpO1xuICAgIGMubGlua3MucHVzaChnKTtcbiAgICAvLyBMaW5rZWQga25vdHMgc2hhcmUgdGhlIGZpcnN0IGtub3QncyBwb3NpdGlvbi5cbiAgICBjb25zdCBwID0gYy5zcGxpbmVzW3JlZnNbMF0uc3BsaW5lXS5rbm90c1tyZWZzWzBdLmtub3RdLnBvc2l0aW9uO1xuICAgIGZvciAoY29uc3QgbSBvZiBtZW1iZXJzKSB7XG4gICAgICAgIGlmIChzYW1lUmVmKG0sIHJlZnNbMF0pKSBjb250aW51ZTtcbiAgICAgICAgc2V0S25vdFBvc2l0aW9uKGMuc3BsaW5lc1ttLnNwbGluZV0sIG0ua25vdCwgcCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5saW5rS25vdHMoYzogQ29udGFpbmVyTGlrZSwgcmVmczogS25vdFJlZltdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCByIG9mIHJlZnMpIHtcbiAgICAgICAgY29uc3QgZyA9IGdyb3VwT2YoYywgcik7XG4gICAgICAgIGlmICghZykgY29udGludWU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpICsgMSA8IGcua25vdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgIGlmIChnLmtub3RzW2ldID09PSByLnNwbGluZSAmJiBnLmtub3RzW2kgKyAxXSA9PT0gci5rbm90KSB7XG4gICAgICAgICAgICAgICAgZy5rbm90cy5zcGxpY2UoaSwgMik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGcua25vdHMubGVuZ3RoIDwgNCkgYy5saW5rcy5zcGxpY2UoYy5saW5rcy5pbmRleE9mKGcpLCAxKTtcbiAgICB9XG59XG5cbi8qKiBNb3ZlcyBldmVyeSBrbm90IGxpbmtlZCB0byBgcmAgb250byByJ3MgcG9zaXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gc3luY0xpbmtlZChjOiBDb250YWluZXJMaWtlLCByOiBLbm90UmVmKTogdm9pZCB7XG4gICAgY29uc3QgcCA9IGMuc3BsaW5lc1tyLnNwbGluZV0ua25vdHNbci5rbm90XS5wb3NpdGlvbjtcbiAgICBmb3IgKGNvbnN0IG8gb2YgbGlua2VkS25vdHMoYywgcikpIHtcbiAgICAgICAgY29uc3QgcyA9IGMuc3BsaW5lc1tvLnNwbGluZV07XG4gICAgICAgIGlmICghcyB8fCAhcy5rbm90c1tvLmtub3RdKSBjb250aW51ZTtcbiAgICAgICAgc2V0S25vdFBvc2l0aW9uKHMsIG8ua25vdCwgcCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXdyaXRlTGlua3MoYzogQ29udGFpbmVyTGlrZSwgbWFwOiAocjogS25vdFJlZikgPT4gS25vdFJlZiB8IG51bGwpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBnaSA9IGMubGlua3MubGVuZ3RoIC0gMTsgZ2kgPj0gMDsgZ2ktLSkge1xuICAgICAgICBjb25zdCBnID0gYy5saW5rc1tnaV07XG4gICAgICAgIGNvbnN0IG5leHQ6IG51bWJlcltdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpICsgMSA8IGcua25vdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBtYXAoeyBzcGxpbmU6IGcua25vdHNbaV0sIGtub3Q6IGcua25vdHNbaSArIDFdIH0pO1xuICAgICAgICAgICAgaWYgKHIgJiYgIW5leHQuc29tZSgoXywgaikgPT4gaiAlIDIgPT09IDAgJiYgbmV4dFtqXSA9PT0gci5zcGxpbmUgJiYgbmV4dFtqICsgMV0gPT09IHIua25vdCkpIG5leHQucHVzaChyLnNwbGluZSwgci5rbm90KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dC5sZW5ndGggPCA0KSBjLmxpbmtzLnNwbGljZShnaSwgMSk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZy5rbm90cy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgZy5rbm90cy5wdXNoKC4uLm5leHQpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKiogVXBkYXRlcyBsaW5rcyBhZnRlciBhIGtub3Qgd2FzIGluc2VydGVkIGF0IChzcGxpbmUsIGtub3QpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbmtzT25Lbm90SW5zZXJ0ZWQoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIsIGtub3Q6IG51bWJlcik6IHZvaWQge1xuICAgIHJld3JpdGVMaW5rcyhjLCAocikgPT4gKHIuc3BsaW5lID09PSBzcGxpbmUgJiYgci5rbm90ID49IGtub3QgPyB7IHNwbGluZSwga25vdDogci5rbm90ICsgMSB9IDogcikpO1xufVxuXG4vKiogVXBkYXRlcyBsaW5rcyBhZnRlciB0aGUga25vdCBhdCAoc3BsaW5lLCBrbm90KSB3YXMgcmVtb3ZlZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5rc09uS25vdFJlbW92ZWQoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIsIGtub3Q6IG51bWJlcik6IHZvaWQge1xuICAgIHJld3JpdGVMaW5rcyhjLCAocikgPT4ge1xuICAgICAgICBpZiAoci5zcGxpbmUgIT09IHNwbGluZSkgcmV0dXJuIHI7XG4gICAgICAgIGlmIChyLmtub3QgPT09IGtub3QpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gci5rbm90ID4ga25vdCA/IHsgc3BsaW5lLCBrbm90OiByLmtub3QgLSAxIH0gOiByO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlua3NPblNwbGluZVJlbW92ZWQoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXdyaXRlTGlua3MoYywgKHIpID0+IHtcbiAgICAgICAgaWYgKHIuc3BsaW5lID09PSBzcGxpbmUpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gci5zcGxpbmUgPiBzcGxpbmUgPyB7IHNwbGluZTogci5zcGxpbmUgLSAxLCBrbm90OiByLmtub3QgfSA6IHI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5rc09uUmV2ZXJzZWQoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXdyaXRlTGlua3MoYywgKHIpID0+IChyLnNwbGluZSA9PT0gc3BsaW5lID8geyBzcGxpbmUsIGtub3Q6IGNvdW50IC0gMSAtIHIua25vdCB9IDogcikpO1xufVxuXG4vKiogQ29udGFpbmVyLWxldmVsIGluc2VydCB0aGF0IGtlZXBzIGxpbmtzIHZhbGlkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5lckluc2VydEtub3QoYzogQ29udGFpbmVyTGlrZSwgc3BsaW5lOiBudW1iZXIsIGluZGV4OiBudW1iZXIsIGs6IEtub3RMaWtlKTogdm9pZCB7XG4gICAgbGlua3NPbktub3RJbnNlcnRlZChjLCBzcGxpbmUsIGluZGV4KTtcbiAgICBpbnNlcnRLbm90KGMuc3BsaW5lc1tzcGxpbmVdLCBpbmRleCwgayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluZXJJbnNlcnRPbkN1cnZlKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyLCBjdXJ2ZUluZGV4OiBudW1iZXIsIHQ6IG51bWJlciwgZmFjdG9yeTogRmFjdG9yeSk6IG51bWJlciB7XG4gICAgY29uc3QgcyA9IGMuc3BsaW5lc1tzcGxpbmVdO1xuICAgIGNvbnN0IGluZGV4ID0gY3VydmVJbmRleCArIDE7XG4gICAgbGlua3NPbktub3RJbnNlcnRlZChjLCBzcGxpbmUsIGluZGV4KTtcbiAgICByZXR1cm4gaW5zZXJ0T25DdXJ2ZShzLCBjdXJ2ZUluZGV4LCB0LCBmYWN0b3J5KTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGtub3RzIChyZWZzIG1heSBzcGFuIHNwbGluZXMpLiBTcGxpbmVzIGxlZnQgZW1wdHkgYXJlIHJlbW92ZWQsXG4gKiBleGNlcHQgdGhlIGNvbnRhaW5lciBrZWVwcyBhdCBsZWFzdCBvbmUgc3BsaW5lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVyUmVtb3ZlS25vdHMoYzogQ29udGFpbmVyTGlrZSwgcmVmczogS25vdFJlZltdKTogdm9pZCB7XG4gICAgY29uc3Qgc29ydGVkID0gWy4uLnJlZnNdLnNvcnQoKGEsIGIpID0+IChhLnNwbGluZSAtIGIuc3BsaW5lKSB8fCAoYi5rbm90IC0gYS5rbm90KSk7XG4gICAgZm9yIChjb25zdCByIG9mIHNvcnRlZCkge1xuICAgICAgICBjb25zdCBzID0gYy5zcGxpbmVzW3Iuc3BsaW5lXTtcbiAgICAgICAgaWYgKCFzIHx8IHIua25vdCA+PSBzLmtub3RzLmxlbmd0aCkgY29udGludWU7XG4gICAgICAgIHJlbW92ZUtub3Qocywgci5rbm90KTtcbiAgICAgICAgbGlua3NPbktub3RSZW1vdmVkKGMsIHIuc3BsaW5lLCByLmtub3QpO1xuICAgICAgICBpZiAocy5rbm90cy5sZW5ndGggPCAzICYmIHMuY2xvc2VkKSBzLmNsb3NlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gYy5zcGxpbmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChjLnNwbGluZXNbaV0ua25vdHMubGVuZ3RoID09PSAwICYmIGMuc3BsaW5lcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjLnNwbGluZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgbGlua3NPblNwbGluZVJlbW92ZWQoYywgaSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluZXJSZXZlcnNlKGM6IENvbnRhaW5lckxpa2UsIHNwbGluZTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgcyA9IGMuc3BsaW5lc1tzcGxpbmVdO1xuICAgIGxpbmtzT25SZXZlcnNlZChjLCBzcGxpbmUsIHMua25vdHMubGVuZ3RoKTtcbiAgICByZXZlcnNlRmxvdyhzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5lclJlbW92ZVNwbGluZShjOiBDb250YWluZXJMaWtlLCBzcGxpbmU6IG51bWJlcik6IHZvaWQge1xuICAgIGMuc3BsaW5lcy5zcGxpY2Uoc3BsaW5lLCAxKTtcbiAgICBsaW5rc09uU3BsaW5lUmVtb3ZlZChjLCBzcGxpbmUpO1xufVxuXG5mdW5jdGlvbiBjbG9uZUtub3QoazogS25vdExpa2UsIGZhY3Rvcnk6IEZhY3RvcnkpOiBLbm90TGlrZSB7XG4gICAgcmV0dXJuIGNvcHlLbm90KGZhY3Rvcnkua25vdCgpLCBrKTtcbn1cblxuLyoqXG4gKiBTcGxpdHMgYSBzcGxpbmUgYXQgYSBrbm90IChVbml0eSdzIFNwbGl0IEtub3QpOiBhbiBvcGVuIHNwbGluZSBiZWNvbWVzIHR3b1xuICogc3BsaW5lcyBzaGFyaW5nIGEgY29weSBvZiB0aGUga25vdCwgYSBjbG9zZWQgc3BsaW5lIG9wZW5zIGF0IHRoZSBrbm90LlxuICogVGhlIHR3byBjb3BpZXMgYXJlIGxpbmtlZC4gUmV0dXJucyB0aGUgbmV3IGNvcHkncyByZWYsIG9yIG51bGwgaWYgdGhlIGtub3RcbiAqIGlzIGFuIGVuZCBvZiBhbiBvcGVuIHNwbGluZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0S25vdChjOiBDb250YWluZXJMaWtlLCByOiBLbm90UmVmLCBmYWN0b3J5OiBGYWN0b3J5KTogS25vdFJlZiB8IG51bGwge1xuICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbci5zcGxpbmVdO1xuICAgIGNvbnN0IG4gPSBzLmtub3RzLmxlbmd0aDtcbiAgICBpZiAocy5jbG9zZWQpIHtcbiAgICAgICAgLy8gUm90YXRlIHNvIHRoZSBrbm90IGlzIGZpcnN0LCB0aGVuIGR1cGxpY2F0ZSBpdCBhdCB0aGUgZW5kLlxuICAgICAgICBjb25zdCBvcmRlcjogS25vdExpa2VbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgb3JkZXIucHVzaChzLmtub3RzWyhyLmtub3QgKyBpKSAlIG5dKTtcbiAgICAgICAgcmV3cml0ZUxpbmtzKGMsIChvKSA9PiAoby5zcGxpbmUgPT09IHIuc3BsaW5lID8geyBzcGxpbmU6IG8uc3BsaW5lLCBrbm90OiB3cmFwKG8ua25vdCAtIHIua25vdCwgbikgfSA6IG8pKTtcbiAgICAgICAgcy5rbm90cy5sZW5ndGggPSAwO1xuICAgICAgICBzLmtub3RzLnB1c2goLi4ub3JkZXIsIGNsb25lS25vdChvcmRlclswXSwgZmFjdG9yeSkpO1xuICAgICAgICBzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICByZWZyZXNoQWxsKHMpO1xuICAgICAgICBjb25zdCBmaXJzdCA9IHsgc3BsaW5lOiByLnNwbGluZSwga25vdDogMCB9O1xuICAgICAgICBjb25zdCBsYXN0ID0geyBzcGxpbmU6IHIuc3BsaW5lLCBrbm90OiBuIH07XG4gICAgICAgIGxpbmtLbm90cyhjLCBbZmlyc3QsIGxhc3RdLCBmYWN0b3J5KTtcbiAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgfVxuICAgIGlmIChyLmtub3QgPD0gMCB8fCByLmtub3QgPj0gbiAtIDEpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHRhaWwgPSBmYWN0b3J5LnNwbGluZSgpO1xuICAgIHRhaWwuY2xvc2VkID0gZmFsc2U7XG4gICAgdGFpbC5rbm90cy5sZW5ndGggPSAwO1xuICAgIHRhaWwua25vdHMucHVzaChjbG9uZUtub3Qocy5rbm90c1tyLmtub3RdLCBmYWN0b3J5KSwgLi4ucy5rbm90cy5zbGljZShyLmtub3QgKyAxKSk7XG4gICAgY29uc3QgbmV3U3BsaW5lID0gYy5zcGxpbmVzLmxlbmd0aDtcbiAgICAvLyBMaW5rcyBvbiBrbm90cyB0aGF0IG1vdmVkIHRvIHRoZSB0YWlsIGZvbGxvdyB0aGVtLlxuICAgIHJld3JpdGVMaW5rcyhjLCAobykgPT4gKG8uc3BsaW5lID09PSByLnNwbGluZSAmJiBvLmtub3QgPiByLmtub3QgPyB7IHNwbGluZTogbmV3U3BsaW5lLCBrbm90OiBvLmtub3QgLSByLmtub3QgfSA6IG8pKTtcbiAgICBzLmtub3RzLmxlbmd0aCA9IHIua25vdCArIDE7XG4gICAgYy5zcGxpbmVzLnB1c2godGFpbCk7XG4gICAgcmVmcmVzaEFsbChzKTtcbiAgICByZWZyZXNoQWxsKHRhaWwpO1xuICAgIGNvbnN0IGNvcHlSZWYgPSB7IHNwbGluZTogbmV3U3BsaW5lLCBrbm90OiAwIH07XG4gICAgbGlua0tub3RzKGMsIFtyLCBjb3B5UmVmXSwgZmFjdG9yeSk7XG4gICAgcmV0dXJuIGNvcHlSZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VuZEtub3QoczogU3BsaW5lTGlrZSwga25vdDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFzLmNsb3NlZCAmJiBzLmtub3RzLmxlbmd0aCA+IDAgJiYgKGtub3QgPT09IDAgfHwga25vdCA9PT0gcy5rbm90cy5sZW5ndGggLSAxKTtcbn1cblxuLyoqXG4gKiBKb2lucyB0d28gZW5kIGtub3RzIChVbml0eSdzIEpvaW4gS25vdHMpLiBFbmRzIG9mIHRoZSBzYW1lIHNwbGluZSBjbG9zZSBpdDtcbiAqIGVuZHMgb2YgZGlmZmVyZW50IHNwbGluZXMgbWVyZ2UgdGhlIHNlY29uZCBzcGxpbmUgaW50byB0aGUgZmlyc3QsIHRoZVxuICogam9pbmVkIGtub3QgdGFraW5nIGBhYCdzIHBvc2l0aW9uLiBSZXR1cm5zIHRoZSBqb2luZWQga25vdCwgb3IgbnVsbCBpZiB0aGVcbiAqIGtub3RzIGNhbid0IGJlIGpvaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvaW5Lbm90cyhjOiBDb250YWluZXJMaWtlLCBhOiBLbm90UmVmLCBiOiBLbm90UmVmLCBmYWN0b3J5OiBGYWN0b3J5KTogS25vdFJlZiB8IG51bGwge1xuICAgIGNvbnN0IHNhID0gYy5zcGxpbmVzW2Euc3BsaW5lXTtcbiAgICBjb25zdCBzYiA9IGMuc3BsaW5lc1tiLnNwbGluZV07XG4gICAgaWYgKCFzYSB8fCAhc2IgfHwgIWlzRW5kS25vdChzYSwgYS5rbm90KSB8fCAhaXNFbmRLbm90KHNiLCBiLmtub3QpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoYS5zcGxpbmUgPT09IGIuc3BsaW5lKSB7XG4gICAgICAgIGlmIChhLmtub3QgPT09IGIua25vdCB8fCBzYS5rbm90cy5sZW5ndGggPCAzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gRHJvcCB0aGUgZHVwbGljYXRlIGVuZCBpZiBib3RoIGVuZHMgc2l0IG9uIHRoZSBzYW1lIHBvaW50LlxuICAgICAgICBjb25zdCBmaXJzdCA9IHNhLmtub3RzWzBdO1xuICAgICAgICBjb25zdCBsYXN0ID0gc2Eua25vdHNbc2Eua25vdHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChkaXN0U3EoZmlyc3QucG9zaXRpb24sIGxhc3QucG9zaXRpb24pIDwgRVBTSUxPTikge1xuICAgICAgICAgICAgY29weShmaXJzdC50YW5nZW50SW4sIGxhc3QudGFuZ2VudEluKTtcbiAgICAgICAgICAgIGxpbmtzT25Lbm90UmVtb3ZlZChjLCBhLnNwbGluZSwgc2Eua25vdHMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBzYS5rbm90cy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRDbG9zZWQoc2EsIHRydWUpO1xuICAgICAgICByZXR1cm4geyBzcGxpbmU6IGEuc3BsaW5lLCBrbm90OiBhLmtub3QgPT09IDAgPyAwIDogTWF0aC5taW4oYS5rbm90LCBzYS5rbm90cy5sZW5ndGggLSAxKSB9O1xuICAgIH1cbiAgICAvLyBPcmllbnQgYm90aCBzbyB0aGF0IGEgaXMgdGhlIGxhc3Qga25vdCBvZiBBIGFuZCBiIHRoZSBmaXJzdCBrbm90IG9mIEIuXG4gICAgaWYgKGEua25vdCA9PT0gMCkge1xuICAgICAgICBjb250YWluZXJSZXZlcnNlKGMsIGEuc3BsaW5lKTtcbiAgICAgICAgYSA9IHsgc3BsaW5lOiBhLnNwbGluZSwga25vdDogc2Eua25vdHMubGVuZ3RoIC0gMSB9O1xuICAgIH1cbiAgICBpZiAoYi5rbm90ICE9PSAwKSB7XG4gICAgICAgIGNvbnRhaW5lclJldmVyc2UoYywgYi5zcGxpbmUpO1xuICAgICAgICBiID0geyBzcGxpbmU6IGIuc3BsaW5lLCBrbm90OiAwIH07XG4gICAgfVxuICAgIGNvbnN0IGthID0gc2Eua25vdHNbYS5rbm90XTtcbiAgICBjb25zdCBrYiA9IHNiLmtub3RzWzBdO1xuICAgIC8vIFRoZSBqb2luZWQga25vdCBrZWVwcyBBJ3MgcG9zaXRpb24gYW5kIGluIHRhbmdlbnQsIGFuZCBCJ3Mgb3V0IHRhbmdlbnQuXG4gICAgY29uc3Qgb3V0V29ybGQgPSB0YW5nZW50T3V0VmVjKHYzKCksIGtiKTtcbiAgICBpZiAoa2EubW9kZSA9PT0gVGFuZ2VudE1vZGUuTGluZWFyICYmIGtiLm1vZGUgIT09IFRhbmdlbnRNb2RlLkxpbmVhcikga2EubW9kZSA9IFRhbmdlbnRNb2RlLkJyb2tlbjtcbiAgICBpZiAodGFuZ2VudHNFZGl0YWJsZShrYS5tb2RlKSkge1xuICAgICAgICBrYS5tb2RlID0gVGFuZ2VudE1vZGUuQnJva2VuO1xuICAgICAgICBxUm90YXRlKGthLnRhbmdlbnRPdXQsIHFJbnZlcnQocTQoKSwga2Eucm90YXRpb24pLCBvdXRXb3JsZCk7XG4gICAgfVxuICAgIGNvbnN0IG9mZnNldCA9IHNhLmtub3RzLmxlbmd0aCAtIDE7XG4gICAgY29uc3QgYkluZGV4ID0gYi5zcGxpbmU7XG4gICAgLy8gQidzIGtub3RzIChhZnRlciBpdHMgZmlyc3QpIG1vdmUgdG8gQTsgbGlua3MgZm9sbG93LlxuICAgIHJld3JpdGVMaW5rcyhjLCAobykgPT4ge1xuICAgICAgICBpZiAoby5zcGxpbmUgIT09IGJJbmRleCkgcmV0dXJuIG87XG4gICAgICAgIGlmIChvLmtub3QgPT09IDApIHJldHVybiB7IHNwbGluZTogYS5zcGxpbmUsIGtub3Q6IGEua25vdCB9O1xuICAgICAgICByZXR1cm4geyBzcGxpbmU6IGEuc3BsaW5lLCBrbm90OiBvZmZzZXQgKyBvLmtub3QgfTtcbiAgICB9KTtcbiAgICBzYS5rbm90cy5wdXNoKC4uLnNiLmtub3RzLnNsaWNlKDEpKTtcbiAgICBjLnNwbGluZXMuc3BsaWNlKGJJbmRleCwgMSk7XG4gICAgcmV3cml0ZUxpbmtzKGMsIChvKSA9PiAoby5zcGxpbmUgPiBiSW5kZXggPyB7IHNwbGluZTogby5zcGxpbmUgLSAxLCBrbm90OiBvLmtub3QgfSA6IG8pKTtcbiAgICBjb25zdCBhU3BsaW5lID0gYS5zcGxpbmUgPiBiSW5kZXggPyBhLnNwbGluZSAtIDEgOiBhLnNwbGluZTtcbiAgICByZWZyZXNoQWxsKGMuc3BsaW5lc1thU3BsaW5lXSk7XG4gICAgcmV0dXJuIHsgc3BsaW5lOiBhU3BsaW5lLCBrbm90OiBhLmtub3QgfTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBzaGFwZXNcblxuZXhwb3J0IGludGVyZmFjZSBTaGFwZU9wdGlvbnMge1xuICAgIC8qKiBTaXplIChzcXVhcmUgc2lkZSwgY2lyY2xlIHJhZGl1cy4uLikuICovXG4gICAgc2l6ZTogbnVtYmVyO1xuICAgIC8qKiBQb2x5Z29uIC8gc3RhciBwb2ludHMuICovXG4gICAgc2lkZXM/OiBudW1iZXI7XG4gICAgLyoqIEhlbGl4IHR1cm5zLiAqL1xuICAgIHR1cm5zPzogbnVtYmVyO1xuICAgIC8qKiBIZWxpeCBoZWlnaHQuICovXG4gICAgaGVpZ2h0PzogbnVtYmVyO1xuICAgIC8qKiBNYWtlIHRoZSBzaGFwZSBpbiB0aGUgWFkgcGxhbmUgKDJEKSBpbnN0ZWFkIG9mIFhaICgzRCkuICovXG4gICAgcGxhbmUyRD86IGJvb2xlYW47XG59XG5cbi8qKiBLbm90IHBvc2l0aW9ucyArIG1vZGVzIGZvciBhIHRlbXBsYXRlIHNoYXBlIChVbml0eSdzIFNwbGluZSA+IFNxdWFyZSAvIENpcmNsZSAvIC4uLikuICovXG5leHBvcnQgZnVuY3Rpb24gc2hhcGVLbm90cyhraW5kOiBzdHJpbmcsIG86IFNoYXBlT3B0aW9ucyk6IHsgcG9pbnRzOiBWM1tdOyBtb2RlOiBudW1iZXI7IGNsb3NlZDogYm9vbGVhbjsgdGFuZ2VudFNjYWxlPzogbnVtYmVyIH0ge1xuICAgIGNvbnN0IHIgPSBvLnNpemU7XG4gICAgY29uc3QgcHRzOiBWM1tdID0gW107XG4gICAgY29uc3QgZmxhdCA9ICh4OiBudW1iZXIsIHk6IG51bWJlciwgaCA9IDApOiBWMyA9PiAoby5wbGFuZTJEID8gdjMoeCwgeSwgaCkgOiB2Myh4LCBoLCAteSkpO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICBjYXNlICdzcXVhcmUnOlxuICAgICAgICAgICAgcHRzLnB1c2goZmxhdCgtciwgLXIpLCBmbGF0KC1yLCByKSwgZmxhdChyLCByKSwgZmxhdChyLCAtcikpO1xuICAgICAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBwdHMsIG1vZGU6IFRhbmdlbnRNb2RlLkxpbmVhciwgY2xvc2VkOiB0cnVlIH07XG4gICAgICAgIGNhc2UgJ3JvdW5kZWQtc3F1YXJlJzoge1xuICAgICAgICAgICAgY29uc3QgYyA9IHIgKiAwLjc1O1xuICAgICAgICAgICAgY29uc3QgZSA9IHI7XG4gICAgICAgICAgICBwdHMucHVzaChmbGF0KC1jLCAtZSksIGZsYXQoLWUsIC1jKSwgZmxhdCgtZSwgYyksIGZsYXQoLWMsIGUpLCBmbGF0KGMsIGUpLCBmbGF0KGUsIGMpLCBmbGF0KGUsIC1jKSwgZmxhdChjLCAtZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBwdHMsIG1vZGU6IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgsIGNsb3NlZDogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NpcmNsZSc6IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IChpIC8gNCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICBwdHMucHVzaChmbGF0KE1hdGguY29zKGEpICogciwgTWF0aC5zaW4oYSkgKiByKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyA0IE1pcnJvcmVkIGtub3RzIHdpdGggaGFuZGxlIGxlbmd0aCAwLjU1MjMgciBtYWtlIGEgbmVhci1wZXJmZWN0IGNpcmNsZS5cbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5NaXJyb3JlZCwgY2xvc2VkOiB0cnVlLCB0YW5nZW50U2NhbGU6IDAuNTUyMyB9O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3BvbHlnb24nOiB7XG4gICAgICAgICAgICBjb25zdCBuID0gTWF0aC5tYXgoMywgTWF0aC5yb3VuZChvLnNpZGVzID8/IDYpKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IChpIC8gbikgKiBNYXRoLlBJICogMiArIE1hdGguUEkgLyAyO1xuICAgICAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoTWF0aC5jb3MoYSkgKiByLCBNYXRoLnNpbihhKSAqIHIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5MaW5lYXIsIGNsb3NlZDogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3N0YXInOiB7XG4gICAgICAgICAgICBjb25zdCBuID0gTWF0aC5tYXgoMywgTWF0aC5yb3VuZChvLnNpZGVzID8/IDUpKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbiAqIDI7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSAoaSAvIChuICogMikpICogTWF0aC5QSSAqIDIgKyBNYXRoLlBJIC8gMjtcbiAgICAgICAgICAgICAgICBjb25zdCByciA9IGkgJSAyID09PSAwID8gciA6IHIgKiAwLjQ1O1xuICAgICAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoTWF0aC5jb3MoYSkgKiByciwgTWF0aC5zaW4oYSkgKiBycikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBwdHMsIG1vZGU6IFRhbmdlbnRNb2RlLkxpbmVhciwgY2xvc2VkOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnaGVsaXgnOiB7XG4gICAgICAgICAgICBjb25zdCB0dXJucyA9IE1hdGgubWF4KDAuMjUsIG8udHVybnMgPz8gMyk7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBvLmhlaWdodCA/PyByICogMjtcbiAgICAgICAgICAgIGNvbnN0IHBlclR1cm4gPSA4O1xuICAgICAgICAgICAgY29uc3QgbiA9IE1hdGgucm91bmQodHVybnMgKiBwZXJUdXJuKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG47IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSAoaSAvIHBlclR1cm4pICogTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICAgICAgcHRzLnB1c2goZmxhdChNYXRoLmNvcyhhKSAqIHIsIE1hdGguc2luKGEpICogciwgKGkgLyBuKSAqIGhlaWdodCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBwdHMsIG1vZGU6IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgsIGNsb3NlZDogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHB0cy5wdXNoKGZsYXQoLXIsIDApLCBmbGF0KHIsIDApKTtcbiAgICAgICAgICAgIHJldHVybiB7IHBvaW50czogcHRzLCBtb2RlOiBUYW5nZW50TW9kZS5BdXRvU21vb3RoLCBjbG9zZWQ6IGZhbHNlIH07XG4gICAgfVxufVxuXG4vKiogRmlsbHMgYSBzcGxpbmUgd2l0aCBhIHNoYXBlIGZyb20gc2hhcGVLbm90cy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFNoYXBlKHM6IFNwbGluZUxpa2UsIGtpbmQ6IHN0cmluZywgbzogU2hhcGVPcHRpb25zLCBmYWN0b3J5OiBGYWN0b3J5KTogdm9pZCB7XG4gICAgY29uc3Qgc2hhcGUgPSBzaGFwZUtub3RzKGtpbmQsIG8pO1xuICAgIHMua25vdHMubGVuZ3RoID0gMDtcbiAgICBzLmNsb3NlZCA9IHNoYXBlLmNsb3NlZDtcbiAgICBjb25zdCBub3JtYWwgPSBvLnBsYW5lMkQgPyB2MygwLCAwLCAxKSA6IHYzKDAsIDEsIDApO1xuICAgIGNvbnN0IG4gPSBzaGFwZS5wb2ludHMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGsgPSBmYWN0b3J5Lmtub3QoKTtcbiAgICAgICAgY29weShrLnBvc2l0aW9uLCBzaGFwZS5wb2ludHNbaV0pO1xuICAgICAgICBzZXQoay50YW5nZW50SW4sIDAsIDAsIDApO1xuICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCAwKTtcbiAgICAgICAgcUlkZW50aXR5KGsucm90YXRpb24pO1xuICAgICAgICBrLm1vZGUgPSBzaGFwZS5tb2RlO1xuICAgICAgICBrLnRlbnNpb24gPSBERUZBVUxUX1RFTlNJT047XG4gICAgICAgIHMua25vdHMucHVzaChrKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgY29uc3QgayA9IHMua25vdHNbaV07XG4gICAgICAgIGNvbnN0IHByZXYgPSBzLmtub3RzW3ByZXZJbmRleChpLCBuLCBzLmNsb3NlZCldLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCBuZXh0ID0gcy5rbm90c1tuZXh0SW5kZXgoaSwgbiwgcy5jbG9zZWQpXS5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgZGlyID0gc3ViKHYzKCksIG5leHQsIHByZXYpO1xuICAgICAgICBpZiAobGVuU3EoZGlyKSA8IEVQU0lMT04pIHN1YihkaXIsIG5leHQsIGsucG9zaXRpb24pO1xuICAgICAgICBrbm90Um90YXRpb24oay5yb3RhdGlvbiwgZGlyLCBub3JtYWwpO1xuICAgICAgICBpZiAoc2hhcGUudGFuZ2VudFNjYWxlKSB7XG4gICAgICAgICAgICBjb25zdCBsID0gc2hhcGUudGFuZ2VudFNjYWxlICogby5zaXplO1xuICAgICAgICAgICAgc2V0KGsudGFuZ2VudEluLCAwLCAwLCAtbCk7XG4gICAgICAgICAgICBzZXQoay50YW5nZW50T3V0LCAwLCAwLCBsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWZyZXNoQWxsKHMpO1xufVxuXG5leHBvcnQgeyBVUCBhcyBLTk9UX1VQLCBGT1JXQVJEIGFzIEtOT1RfRk9SV0FSRCB9O1xuIiwgImltcG9ydCB7IF9kZWNvcmF0b3IsIGRpcmVjdG9yLCBWZWMzIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgQmV6aWVyS25vdCB9IGZyb20gJy4vQmV6aWVyS25vdCc7XG5pbXBvcnQge1xuICAgIFNwbGluZUNhY2hlLCBTcGxpbmVMaWtlLCBUYW5nZW50TW9kZSwgREVGQVVMVF9URU5TSU9OLCBGYWN0b3J5LFxuICAgIGVuc3VyZUNhY2hlLCBjdXJ2ZUNvdW50LCBnZXRDdXJ2ZSwgZXZhbHVhdGVQb3NpdGlvbiwgZXZhbHVhdGVEaXJlY3Rpb24sIGV2YWx1YXRlVXAsIGN1cnZlUG9pbnRBdCxcbiAgICBuZWFyZXN0UG9pbnQsIHRBdERpc3RhbmNlRnJvbSwga25vdFVuaXRUb1QsIHRUb0tub3RVbml0LCBub3JtYWxpemVkVE9mLFxuICAgIGluc2VydEtub3QsIHJlbW92ZUtub3QsIGluc2VydE9uQ3VydmUsIHJldmVyc2VGbG93LCBzZXRDbG9zZWQsIHNldFRhbmdlbnRNb2RlLCBzZXRUZW5zaW9uLFxuICAgIHNldEtub3RQb3NpdGlvbiwgcmVmcmVzaEFsbCwgcmVmcmVzaEFyb3VuZCwgYXBwbHlUYW5nZW50TW9kZSxcbn0gZnJvbSAnLi4vY29yZS9zcGxpbmUtY29yZSc7XG5pbXBvcnQgeyBDdXJ2ZSwgY3VydmUsIGV2YWxEZXJpdmF0aXZlIH0gZnJvbSAnLi4vY29yZS9jdXJ2ZSc7XG5pbXBvcnQgeyBLbm90TGluayB9IGZyb20gJy4vS25vdExpbmsnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG4vKiogQ3JlYXRlcyBlbmdpbmUgb2JqZWN0cyBmb3IgdGhlIGNvcmUncyBlZGl0IG9wZXJhdGlvbnMuICovXG5leHBvcnQgY29uc3Qgc3BsaW5lRmFjdG9yeTogRmFjdG9yeSA9IHtcbiAgICBrbm90OiAoKSA9PiBuZXcgQmV6aWVyS25vdCgpLFxuICAgIHNwbGluZTogKCkgPT4gbmV3IFNwbGluZSgpLFxuICAgIGxpbms6ICgpID0+IG5ldyBLbm90TGluaygpLFxufTtcblxuLyoqIFdoZXJlIGEgZGlzdGFuY2UgYWxvbmcgdGhlIHNwbGluZSBpcyBtZWFzdXJlZCBmcm9tIChVbml0eSdzIFBhdGhJbmRleFVuaXQpLiAqL1xuZXhwb3J0IGVudW0gUGF0aEluZGV4VW5pdCB7XG4gICAgLyoqIDAuLjEgb3ZlciB0aGUgc3BsaW5lJ3MgbGVuZ3RoLiAqL1xuICAgIE5vcm1hbGl6ZWQgPSAwLFxuICAgIC8qKiBEaXN0YW5jZSBpbiB0aGUgc3BsaW5lJ3MgbG9jYWwgdW5pdHMuICovXG4gICAgRGlzdGFuY2UgPSAxLFxuICAgIC8qKiBLbm90IGluZGV4OiAyLjUgaXMgaGFsZndheSBiZXR3ZWVuIGtub3RzIDIgYW5kIDMuICovXG4gICAgS25vdCA9IDIsXG59XG5cbi8qKlxuICogQSBCZXppZXIgc3BsaW5lOiBhIGxpc3Qgb2Yga25vdHMsIG9wZW4gb3IgY2xvc2VkLlxuICpcbiAqIFBvc2l0aW9ucyBhcmUgaW4gdGhlIGxvY2FsIHNwYWNlIG9mIHRoZSBTcGxpbmVDb250YWluZXIgdGhhdCBvd25zIHRoZVxuICogc3BsaW5lLiBgdGAgYXJndW1lbnRzIGFyZSBub3JtYWxpemVkIGRpc3RhbmNlczogMCBpcyB0aGUgZmlyc3Qga25vdCBhbmQgMVxuICogdGhlIGVuZCwgYW5kIHQgPSAwLjUgaXMgaGFsZndheSBhbG9uZyB0aGUgc3BsaW5lJ3MgbGVuZ3RoLlxuICpcbiAqIFVzZSB0aGUgbWV0aG9kcyB0byBlZGl0IGtub3RzIHNvIHRoZSBzcGxpbmUgdXBkYXRlcyBpdHMgdGFuZ2VudHMgYW5kXG4gKiBjYWNoZWQgbGVuZ3Rocy4gQWZ0ZXIgY2hhbmdpbmcga25vdCBmaWVsZHMgZGlyZWN0bHksIGNhbGwgbWFya0RpcnR5KCkuXG4gKi9cbkBjY2NsYXNzKCdzcGxpbmVzLlNwbGluZScpXG5leHBvcnQgY2xhc3MgU3BsaW5lIGltcGxlbWVudHMgU3BsaW5lTGlrZSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogW0Jlemllcktub3RdLCB0b29sdGlwOiAnVGhlIGtub3RzIG9mIHRoZSBzcGxpbmUuJyB9KVxuICAgIGtub3RzOiBCZXppZXJLbm90W10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdDb25uZWN0cyB0aGUgbGFzdCBrbm90IGJhY2sgdG8gdGhlIGZpcnN0LicgfSlcbiAgICBjbG9zZWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2NhY2hlID0gbmV3IFNwbGluZUNhY2hlKCk7XG4gICAgcHJpdmF0ZSBfY2hlY2tlZEZyYW1lID0gLTE7XG4gICAgcHJpdmF0ZSBfdmVyc2lvbiA9IDA7XG5cbiAgICAvKiogQnVtcGVkIGJ5IGV2ZXJ5IGVkaXQgbWFkZSB0aHJvdWdoIHRoZSBTcGxpbmUgQVBJIChhbmQgbWFya0RpcnR5KS4gKi9cbiAgICBnZXQgdmVyc2lvbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVyc2lvbjtcbiAgICB9XG5cbiAgICBnZXQgY291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua25vdHMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKiBOdW1iZXIgb2YgY3VydmVzIChzZWdtZW50cyBiZXR3ZWVuIGtub3RzKS4gKi9cbiAgICBnZXQgY3VydmVDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gY3VydmVDb3VudCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogTGVuZ3RocyBhbmQgbG9va3VwIHRhYmxlcywgcmVidWlsdCB3aGVuIHRoZSBrbm90cyBjaGFuZ2UgKGNoZWNrZWQgb25jZSBwZXIgZnJhbWUpLiAqL1xuICAgIGdldCBjYWNoZSgpOiBTcGxpbmVDYWNoZSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gZGlyZWN0b3IuZ2V0VG90YWxGcmFtZXMoKTtcbiAgICAgICAgaWYgKGZyYW1lICE9PSB0aGlzLl9jaGVja2VkRnJhbWUgfHwgdGhpcy5fY2hlY2tlZEZyYW1lIDwgMCkge1xuICAgICAgICAgICAgZW5zdXJlQ2FjaGUodGhpcywgdGhpcy5fY2FjaGUpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tlZEZyYW1lID0gZnJhbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlO1xuICAgIH1cblxuICAgIC8qKiBDYWxsIGFmdGVyIGNoYW5naW5nIGtub3RzIGRpcmVjdGx5IChub3QgdGhyb3VnaCB0aGUgU3BsaW5lIG1ldGhvZHMpLiAqL1xuICAgIG1hcmtEaXJ0eSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2hlY2tlZEZyYW1lID0gLTE7XG4gICAgICAgIHRoaXMuX3ZlcnNpb24rKztcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0ga25vdHNcblxuICAgIGdldEtub3QoaW5kZXg6IG51bWJlcik6IEJlemllcktub3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5rbm90c1tpbmRleF07XG4gICAgfVxuXG4gICAgLyoqIFJlcGxhY2VzIGEga25vdCAoY29waWVkKSBhbmQgdXBkYXRlcyB0aGUgdGFuZ2VudHMgdGhhdCBkZXBlbmQgb24gaXQuICovXG4gICAgc2V0S25vdChpbmRleDogbnVtYmVyLCBrbm90OiBCZXppZXJLbm90KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGsgPSB0aGlzLmtub3RzW2luZGV4XTtcbiAgICAgICAgay5wb3NpdGlvbi5zZXQoa25vdC5wb3NpdGlvbik7XG4gICAgICAgIGsudGFuZ2VudEluLnNldChrbm90LnRhbmdlbnRJbik7XG4gICAgICAgIGsudGFuZ2VudE91dC5zZXQoa25vdC50YW5nZW50T3V0KTtcbiAgICAgICAgay5yb3RhdGlvbi5zZXQoa25vdC5yb3RhdGlvbik7XG4gICAgICAgIGsubW9kZSA9IGtub3QubW9kZTtcbiAgICAgICAgay50ZW5zaW9uID0ga25vdC50ZW5zaW9uO1xuICAgICAgICByZWZyZXNoQXJvdW5kKHRoaXMsIGluZGV4KTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICAvKiogQWRkcyBhIGtub3QgYXQgdGhlIGVuZC4gV2l0aCBhIHBvc2l0aW9uLCBjcmVhdGVzIGEga25vdCB3aXRoIHRoZSBnaXZlbiBtb2RlLiAqL1xuICAgIGFkZChrbm90T3JQb3NpdGlvbjogQmV6aWVyS25vdCB8IFJlYWRvbmx5PFZlYzM+LCBtb2RlOiBUYW5nZW50TW9kZSA9IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgpOiBCZXppZXJLbm90IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0KHRoaXMua25vdHMubGVuZ3RoLCBrbm90T3JQb3NpdGlvbiwgbW9kZSk7XG4gICAgfVxuXG4gICAgaW5zZXJ0KGluZGV4OiBudW1iZXIsIGtub3RPclBvc2l0aW9uOiBCZXppZXJLbm90IHwgUmVhZG9ubHk8VmVjMz4sIG1vZGU6IFRhbmdlbnRNb2RlID0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCk6IEJlemllcktub3Qge1xuICAgICAgICBsZXQgazogQmV6aWVyS25vdDtcbiAgICAgICAgaWYgKGtub3RPclBvc2l0aW9uIGluc3RhbmNlb2YgQmV6aWVyS25vdCkge1xuICAgICAgICAgICAgayA9IGtub3RPclBvc2l0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgayA9IG5ldyBCZXppZXJLbm90KGtub3RPclBvc2l0aW9uIGFzIFZlYzMpO1xuICAgICAgICAgICAgay5tb2RlID0gbW9kZTtcbiAgICAgICAgICAgIGsudGVuc2lvbiA9IERFRkFVTFRfVEVOU0lPTjtcbiAgICAgICAgfVxuICAgICAgICBpbnNlcnRLbm90KHRoaXMsIGluZGV4LCBrKTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICAgICAgcmV0dXJuIGs7XG4gICAgfVxuXG4gICAgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICByZW1vdmVLbm90KHRoaXMsIGluZGV4KTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5rbm90cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIHNldEtub3RQb3NpdGlvbihpbmRleDogbnVtYmVyLCBwb3NpdGlvbjogUmVhZG9ubHk8VmVjMz4pOiB2b2lkIHtcbiAgICAgICAgc2V0S25vdFBvc2l0aW9uKHRoaXMsIGluZGV4LCBwb3NpdGlvbik7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgZ2V0VGFuZ2VudE1vZGUoaW5kZXg6IG51bWJlcik6IFRhbmdlbnRNb2RlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua25vdHNbaW5kZXhdLm1vZGU7XG4gICAgfVxuXG4gICAgc2V0VGFuZ2VudE1vZGUoaW5kZXg6IG51bWJlciwgbW9kZTogVGFuZ2VudE1vZGUpOiB2b2lkIHtcbiAgICAgICAgc2V0VGFuZ2VudE1vZGUodGhpcywgaW5kZXgsIG1vZGUpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIC8qKiBTZXRzIHRoZSBtb2RlIG9mIGV2ZXJ5IGtub3QuICovXG4gICAgc2V0VGFuZ2VudE1vZGVBbGwobW9kZTogVGFuZ2VudE1vZGUpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmtub3RzLmxlbmd0aDsgaSsrKSBzZXRUYW5nZW50TW9kZSh0aGlzLCBpLCBtb2RlKTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICBzZXRBdXRvU21vb3RoVGVuc2lvbihpbmRleDogbnVtYmVyLCB0ZW5zaW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc2V0VGVuc2lvbih0aGlzLCBpbmRleCwgdGVuc2lvbik7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgLyoqIEluc2VydHMgYSBrbm90IG9uIGEgY3VydmUgd2l0aG91dCBjaGFuZ2luZyB0aGUgc2hhcGUuIFJldHVybnMgaXRzIGluZGV4LiAqL1xuICAgIGluc2VydE9uQ3VydmUoY3VydmVJbmRleDogbnVtYmVyLCBjdXJ2ZVQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGkgPSBpbnNlcnRPbkN1cnZlKHRoaXMsIGN1cnZlSW5kZXgsIGN1cnZlVCwgc3BsaW5lRmFjdG9yeSk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cblxuICAgIHNldENsb3NlZChjbG9zZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgc2V0Q2xvc2VkKHRoaXMsIGNsb3NlZCk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgLyoqIFJldmVyc2VzIHRoZSBkaXJlY3Rpb24gb2YgdHJhdmVsICh0aGUgc2hhcGUgaXMgdW5jaGFuZ2VkKS4gKi9cbiAgICByZXZlcnNlKCk6IHZvaWQge1xuICAgICAgICByZXZlcnNlRmxvdyh0aGlzKTtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG5cbiAgICAvKiogUmUtYXBwbGllcyBldmVyeSBrbm90J3MgdGFuZ2VudCBtb2RlLiAqL1xuICAgIHJlZnJlc2goKTogdm9pZCB7XG4gICAgICAgIHJlZnJlc2hBbGwodGhpcyk7XG4gICAgICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgfVxuXG4gICAgLyoqIFJlLWFwcGxpZXMgdGhlIHRhbmdlbnQgbW9kZSBvZiBvbmUga25vdC4gKi9cbiAgICByZWZyZXNoS25vdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGFwcGx5VGFuZ2VudE1vZGUodGhpcywgaW5kZXgpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBxdWVyaWVzXG5cbiAgICAvKiogVG90YWwgbGVuZ3RoIGluIGxvY2FsIHVuaXRzLiAqL1xuICAgIGdldExlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS50b3RhbDtcbiAgICB9XG5cbiAgICBnZXRDdXJ2ZUxlbmd0aChjdXJ2ZUluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS5sZW5ndGhzW2N1cnZlSW5kZXhdID8/IDA7XG4gICAgfVxuXG4gICAgLyoqIENvbnRyb2wgcG9pbnRzIG9mIGEgY3VydmUgKGxvY2FsIHNwYWNlKS4gKi9cbiAgICBnZXRDdXJ2ZShjdXJ2ZUluZGV4OiBudW1iZXIsIG91dDogQ3VydmUgPSBjdXJ2ZSgpKTogQ3VydmUge1xuICAgICAgICByZXR1cm4gZ2V0Q3VydmUodGhpcywgY3VydmVJbmRleCwgb3V0KTtcbiAgICB9XG5cbiAgICBldmFsdWF0ZVBvc2l0aW9uKHQ6IG51bWJlciwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICByZXR1cm4gZXZhbHVhdGVQb3NpdGlvbih0aGlzLCB0aGlzLmNhY2hlLCB0LCBvdXQpO1xuICAgIH1cblxuICAgIC8qKiBEZXJpdmF0aXZlIGF0IHQgKGRpcmVjdGlvbiB0aW1lcyBzcGVlZCwgbGlrZSBVbml0eSdzIEV2YWx1YXRlVGFuZ2VudCkuICovXG4gICAgZXZhbHVhdGVUYW5nZW50KHQ6IG51bWJlciwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgICAgIGlmICghY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIGV2YWx1YXRlRGlyZWN0aW9uKHRoaXMsIGNhY2hlLCB0LCBvdXQpO1xuICAgICAgICBjb25zdCBwID0gY3VydmVQb2ludEF0KGNhY2hlLCB0KTtcbiAgICAgICAgZXZhbERlcml2YXRpdmUob3V0LCBjYWNoZS5jdXJ2ZXNbcC5pbmRleF0sIHAudCk7XG4gICAgICAgIGlmIChvdXQubGVuZ3RoU3FyKCkgPCAxZS0xMikgZXZhbHVhdGVEaXJlY3Rpb24odGhpcywgY2FjaGUsIHQsIG91dCk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqIFVuaXQgZGlyZWN0aW9uIG9mIHRyYXZlbCBhdCB0LiAqL1xuICAgIGV2YWx1YXRlRGlyZWN0aW9uKHQ6IG51bWJlciwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICByZXR1cm4gZXZhbHVhdGVEaXJlY3Rpb24odGhpcywgdGhpcy5jYWNoZSwgdCwgb3V0KTtcbiAgICB9XG5cbiAgICAvKiogVW5pdCB1cCB2ZWN0b3IgYXQgdCwgaW50ZXJwb2xhdGVkIGJldHdlZW4gdGhlIGtub3RzJyB1cCB2ZWN0b3JzIHdpdGhvdXQgdHdpc3RpbmcuICovXG4gICAgZXZhbHVhdGVVcFZlY3Rvcih0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRlVXAodGhpcywgdGhpcy5jYWNoZSwgdCwgb3V0KTtcbiAgICB9XG5cbiAgICAvKiogQ2xvc2VzdCBwb2ludCB0byBgcG9pbnRgIChsb2NhbCBzcGFjZSkuIFJldHVybnMgaXRzIHQgYW5kIHBvc2l0aW9uLiAqL1xuICAgIGdldE5lYXJlc3RQb2ludChwb2ludDogUmVhZG9ubHk8VmVjMz4sIG91dFBvc2l0aW9uID0gbmV3IFZlYzMoKSk6IHsgdDogbnVtYmVyOyBwb3NpdGlvbjogVmVjMzsgZGlzdGFuY2U6IG51bWJlciB9IHtcbiAgICAgICAgY29uc3QgciA9IG5lYXJlc3RQb2ludCh0aGlzLCB0aGlzLmNhY2hlLCBwb2ludCk7XG4gICAgICAgIG91dFBvc2l0aW9uLnNldChyLnBvc2l0aW9uLngsIHIucG9zaXRpb24ueSwgci5wb3NpdGlvbi56KTtcbiAgICAgICAgcmV0dXJuIHsgdDogci50LCBwb3NpdGlvbjogb3V0UG9zaXRpb24sIGRpc3RhbmNlOiByLmRpc3RhbmNlIH07XG4gICAgfVxuXG4gICAgLyoqIFRoZSB0IHJlYWNoZWQgYWZ0ZXIgbW92aW5nIGBkaXN0YW5jZWAgKGxvY2FsIHVuaXRzLCBtYXkgYmUgbmVnYXRpdmUpIGZyb20gYGZyb21UYC4gKi9cbiAgICBnZXRUQXREaXN0YW5jZShmcm9tVDogbnVtYmVyLCBkaXN0YW5jZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRBdERpc3RhbmNlRnJvbSh0aGlzLCB0aGlzLmNhY2hlLCBmcm9tVCwgZGlzdGFuY2UpO1xuICAgIH1cblxuICAgIC8qKiBDb252ZXJ0cyBhIHBvc2l0aW9uIGFsb25nIHRoZSBzcGxpbmUgYmV0d2VlbiB1bml0cyAoVW5pdHkncyBDb252ZXJ0SW5kZXhVbml0KS4gKi9cbiAgICBjb252ZXJ0SW5kZXhVbml0KHZhbHVlOiBudW1iZXIsIGZyb206IFBhdGhJbmRleFVuaXQsIHRvOiBQYXRoSW5kZXhVbml0KTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGZyb20gPT09IHRvKSByZXR1cm4gdmFsdWU7XG4gICAgICAgIGNvbnN0IGNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICAgICAgbGV0IHQ6IG51bWJlcjtcbiAgICAgICAgaWYgKGZyb20gPT09IFBhdGhJbmRleFVuaXQuTm9ybWFsaXplZCkgdCA9IHZhbHVlO1xuICAgICAgICBlbHNlIGlmIChmcm9tID09PSBQYXRoSW5kZXhVbml0LkRpc3RhbmNlKSB0ID0gY2FjaGUudG90YWwgPiAwID8gdmFsdWUgLyBjYWNoZS50b3RhbCA6IDA7XG4gICAgICAgIGVsc2UgdCA9IGtub3RVbml0VG9UKGNhY2hlLCB2YWx1ZSk7XG4gICAgICAgIGlmICh0byA9PT0gUGF0aEluZGV4VW5pdC5Ob3JtYWxpemVkKSByZXR1cm4gdDtcbiAgICAgICAgaWYgKHRvID09PSBQYXRoSW5kZXhVbml0LkRpc3RhbmNlKSByZXR1cm4gdCAqIGNhY2hlLnRvdGFsO1xuICAgICAgICByZXR1cm4gdFRvS25vdFVuaXQoY2FjaGUsIHQpO1xuICAgIH1cblxuICAgIC8qKiBOb3JtYWxpemVkIHQgb2YgYSBrbm90LiAqL1xuICAgIGtub3RUKGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgICAgIGlmICghY2FjaGUuY3VydmVzLmxlbmd0aCkgcmV0dXJuIDA7XG4gICAgICAgIGlmIChpbmRleCA+PSBjYWNoZS5jdXJ2ZXMubGVuZ3RoKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRUT2YoY2FjaGUsIGluZGV4LCAwKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgX2RlY29yYXRvciwgQ0NJbnRlZ2VyIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgTGlua0xpa2UgfSBmcm9tICcuLi9jb3JlL3NwbGluZS1jb3JlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuLyoqXG4gKiBBIGdyb3VwIG9mIGxpbmtlZCBrbm90czoga25vdHMgdGhhdCBhbHdheXMgc2hhcmUgb25lIHBvc2l0aW9uLCBwb3NzaWJseVxuICogb24gZGlmZmVyZW50IHNwbGluZXMgb2YgdGhlIHNhbWUgY29udGFpbmVyLiBTdG9yZWQgYXMgZmxhdHRlbmVkXG4gKiAoc3BsaW5lSW5kZXgsIGtub3RJbmRleCkgcGFpcnMuXG4gKi9cbkBjY2NsYXNzKCdzcGxpbmVzLktub3RMaW5rJylcbmV4cG9ydCBjbGFzcyBLbm90TGluayBpbXBsZW1lbnRzIExpbmtMaWtlIHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbQ0NJbnRlZ2VyXSB9KVxuICAgIGtub3RzOiBudW1iZXJbXSA9IFtdO1xufVxuIiwgImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgTWF0NCwgVmVjMywgUXVhdCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUiB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcGxpbmUsIHNwbGluZUZhY3RvcnksIFBhdGhJbmRleFVuaXQgfSBmcm9tICcuL1NwbGluZSc7XG5pbXBvcnQgeyBLbm90TGluayB9IGZyb20gJy4vS25vdExpbmsnO1xuaW1wb3J0IHsgQmV6aWVyS25vdCwgVGFuZ2VudE1vZGUgfSBmcm9tICcuL0Jlemllcktub3QnO1xuaW1wb3J0IHtcbiAgICBDb250YWluZXJMaWtlLCBLbm90UmVmLCBsaW5rS25vdHMsIHVubGlua0tub3RzLCBsaW5rZWRLbm90cywgc3luY0xpbmtlZCwgaXNMaW5rZWQsXG4gICAgY29udGFpbmVyUmVtb3ZlU3BsaW5lLCBjb250YWluZXJJbnNlcnRLbm90LCBjb250YWluZXJSZW1vdmVLbm90cywgY29udGFpbmVyUmV2ZXJzZSxcbiAgICBzcGxpdEtub3QsIGpvaW5Lbm90cywgbmVhcmVzdFBvaW50LCBmaW5nZXJwcmludCwgcmVmcmVzaEFsbCxcbn0gZnJvbSAnLi4vY29yZS9zcGxpbmUtY29yZSc7XG5pbXBvcnQgeyBhcmNMZW5ndGgsIGN1cnZlLCBDdXJ2ZSB9IGZyb20gJy4uL2NvcmUvY3VydmUnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSwgbWVudSwgZGlzYWxsb3dNdWx0aXBsZSB9ID0gX2RlY29yYXRvcjtcblxuY29uc3QgX20gPSBuZXcgTWF0NCgpO1xuY29uc3QgX3YgPSBuZXcgVmVjMygpO1xuY29uc3QgX2M6IEN1cnZlID0gY3VydmUoKTtcblxuZXhwb3J0IGludGVyZmFjZSBTcGxpbmVTYW1wbGUge1xuICAgIHBvc2l0aW9uOiBWZWMzO1xuICAgIC8qKiBVbml0IGRpcmVjdGlvbiBvZiB0cmF2ZWwuICovXG4gICAgdGFuZ2VudDogVmVjMztcbiAgICAvKiogVW5pdCB1cCB2ZWN0b3IuICovXG4gICAgdXA6IFZlYzM7XG59XG5cbi8qKlxuICogSG9sZHMgb25lIG9yIG1vcmUgc3BsaW5lcyBpbiB0aGUgbm9kZSdzIGxvY2FsIHNwYWNlIChVbml0eSdzIFNwbGluZUNvbnRhaW5lcikuXG4gKlxuICogRXZhbHVhdGUgbWV0aG9kcyB3b3JrIGluIHdvcmxkIHNwYWNlOyB0aGUgU3BsaW5lIG9iamVjdHMgdGhlbXNlbHZlcyB3b3JrXG4gKiBpbiBsb2NhbCBzcGFjZS4gYHRgIGlzIGEgbm9ybWFsaXplZCBkaXN0YW5jZTogMCA9IHN0YXJ0LCAxID0gZW5kLlxuICpcbiAqIEVtaXRzIFNwbGluZUNvbnRhaW5lci5FdmVudFR5cGUuQ0hBTkdFRCBvbiBpdHMgbm9kZSB3aGVuIGEgc3BsaW5lIGNoYW5nZXNcbiAqIChpbiB0aGUgZWRpdG9yIGFsd2F5czsgYXQgcnVudGltZSB3aGVuIHNvbWVvbmUgbGlzdGVucykuXG4gKi9cbkBjY2NsYXNzKCdTcGxpbmVDb250YWluZXInKVxuQGV4ZWN1dGVJbkVkaXRNb2RlXG5AZGlzYWxsb3dNdWx0aXBsZVxuQG1lbnUoJ1NwbGluZXMvU3BsaW5lQ29udGFpbmVyJylcbmV4cG9ydCBjbGFzcyBTcGxpbmVDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQgaW1wbGVtZW50cyBDb250YWluZXJMaWtlIHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRXZlbnRUeXBlID0ge1xuICAgICAgICAvKiogKGNvbnRhaW5lcjogU3BsaW5lQ29udGFpbmVyKSAqL1xuICAgICAgICBDSEFOR0VEOiAnc3BsaW5lLWNoYW5nZWQnLFxuICAgIH07XG5cbiAgICAvKiogRW5hYmxlZCBjb250YWluZXJzICh1c2VkIGJ5IHRoZSBlZGl0b3IgdG9vbHMpLiAqL1xuICAgIHN0YXRpYyByZWFkb25seSBhbGwgPSBuZXcgU2V0PFNwbGluZUNvbnRhaW5lcj4oKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtTcGxpbmVdLCB0b29sdGlwOiAnVGhlIHNwbGluZXMgaW4gdGhpcyBjb250YWluZXIuJyB9KVxuICAgIHNwbGluZXM6IFNwbGluZVtdID0gW25ldyBTcGxpbmUoKV07XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbS25vdExpbmtdLCB2aXNpYmxlOiBmYWxzZSB9KVxuICAgIGxpbmtzOiBLbm90TGlua1tdID0gW107XG5cbiAgICBwcml2YXRlIF9zdGFtcCA9IE5hTjtcblxuICAgIC8qKiBUaGUgZmlyc3Qgc3BsaW5lIChjcmVhdGVkIGlmIHRoZXJlIGlzIG5vbmUpLiAqL1xuICAgIGdldCBzcGxpbmUoKTogU3BsaW5lIHtcbiAgICAgICAgaWYgKCF0aGlzLnNwbGluZXMubGVuZ3RoKSB0aGlzLnNwbGluZXMucHVzaChuZXcgU3BsaW5lKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpbmVzWzBdO1xuICAgIH1cblxuICAgIHNldCBzcGxpbmUodmFsdWU6IFNwbGluZSkge1xuICAgICAgICBpZiAodGhpcy5zcGxpbmVzLmxlbmd0aCkgdGhpcy5zcGxpbmVzWzBdID0gdmFsdWU7XG4gICAgICAgIGVsc2UgdGhpcy5zcGxpbmVzLnB1c2godmFsdWUpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgU3BsaW5lQ29udGFpbmVyLmFsbC5hZGQodGhpcyk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBTcGxpbmVDb250YWluZXIuYWxsLmRlbGV0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIFNwbGluZUNvbnRhaW5lci5hbGwuZGVsZXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCFFRElUT1IgJiYgIXRoaXMubm9kZS5oYXNFdmVudExpc3RlbmVyKFNwbGluZUNvbnRhaW5lci5FdmVudFR5cGUuQ0hBTkdFRCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5jaGVja0NoYW5nZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIHZhbHVlIHRoYXQgY2hhbmdlcyB3aGVuZXZlciBhbnkgc3BsaW5lIGluIHRoZSBjb250YWluZXIgY2hhbmdlcy5cbiAgICAgKiBDaGVja2VkIGF0IG1vc3Qgb25jZSBwZXIgZnJhbWUgcGVyIHNwbGluZS5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlU3RhbXAoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGggPSAyMTY2MTM2MjYxIHwgMDtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc3BsaW5lcykgaCA9IE1hdGguaW11bChoIF4gcy5jYWNoZS5zdGFtcCwgMTY3Nzc2MTkpO1xuICAgICAgICByZXR1cm4gTWF0aC5pbXVsKGggXiB0aGlzLnNwbGluZXMubGVuZ3RoLCAxNjc3NzYxOSk7XG4gICAgfVxuXG4gICAgLyoqIEVtaXRzIENIQU5HRUQgaWYgYSBzcGxpbmUgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBjaGVjay4gUmV0dXJucyB3aGV0aGVyIGl0IGRpZC4gKi9cbiAgICBjaGVja0NoYW5nZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChFRElUT1IpIHRoaXMucmVwYWlyQWZ0ZXJFeHRlcm5hbEVkaXQoKTtcbiAgICAgICAgY29uc3Qgc3RhbXAgPSB0aGlzLmNoYW5nZVN0YW1wO1xuICAgICAgICBpZiAoc3RhbXAgPT09IHRoaXMuX3N0YW1wKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N0YW1wID0gc3RhbXA7XG4gICAgICAgIHRoaXMubm9kZS5lbWl0KFNwbGluZUNvbnRhaW5lci5FdmVudFR5cGUuQ0hBTkdFRCwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKiBNYXJrcyBldmVyeSBzcGxpbmUgZGlydHkgYW5kIGVtaXRzIENIQU5HRUQuICovXG4gICAgbm90aWZ5Q2hhbmdlZCgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc3BsaW5lcykgcy5tYXJrRGlydHkoKTtcbiAgICAgICAgdGhpcy5jaGVja0NoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWVuID0gbmV3IFdlYWtNYXA8U3BsaW5lLCBudW1iZXI+KCk7XG5cbiAgICAvKipcbiAgICAgKiBJbnNwZWN0b3IgZWRpdHMgYW5kIHVuZG8gY2hhbmdlIGtub3RzIGJlaGluZCB0aGUgU3BsaW5lIEFQSTsgcmUtYXBwbHkgdGhlXG4gICAgICogdGFuZ2VudCBtb2RlcyBzbyBBdXRvU21vb3RoIHRhbmdlbnRzIGZvbGxvdyBtb3ZlZCBrbm90cy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlcGFpckFmdGVyRXh0ZXJuYWxFZGl0KCk6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgdGhpcy5zcGxpbmVzKSB7XG4gICAgICAgICAgICBjb25zdCBiZWZvcmUgPSBmaW5nZXJwcmludChzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWVuLmdldChzKSA9PT0gYmVmb3JlKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJlZnJlc2hBbGwocyk7XG4gICAgICAgICAgICBjb25zdCBhZnRlciA9IGZpbmdlcnByaW50KHMpO1xuICAgICAgICAgICAgaWYgKGFmdGVyICE9PSBiZWZvcmUpIHMubWFya0RpcnR5KCk7XG4gICAgICAgICAgICB0aGlzLl9zZWVuLnNldChzLCBhZnRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc3BsaW5lc1xuXG4gICAgYWRkU3BsaW5lKHNwbGluZTogU3BsaW5lID0gbmV3IFNwbGluZSgpKTogU3BsaW5lIHtcbiAgICAgICAgdGhpcy5zcGxpbmVzLnB1c2goc3BsaW5lKTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybiBzcGxpbmU7XG4gICAgfVxuXG4gICAgcmVtb3ZlU3BsaW5lQXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb250YWluZXJSZW1vdmVTcGxpbmUodGhpcywgaW5kZXgpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICAvKiogQ29udGFpbmVyLWxldmVsIGVkaXRzIHRoYXQga2VlcCBrbm90IGxpbmtzIHZhbGlkLiAqL1xuICAgIGluc2VydEtub3Qoc3BsaW5lSW5kZXg6IG51bWJlciwga25vdEluZGV4OiBudW1iZXIsIGtub3Q6IEJlemllcktub3QpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVySW5zZXJ0S25vdCh0aGlzLCBzcGxpbmVJbmRleCwga25vdEluZGV4LCBrbm90KTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlS25vdHMocmVmczogS25vdFJlZltdKTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lclJlbW92ZUtub3RzKHRoaXMsIHJlZnMpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICByZXZlcnNlRmxvdyhzcGxpbmVJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lclJldmVyc2UodGhpcywgc3BsaW5lSW5kZXgpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICAvKiogTW92ZXMgYSBrbm90IGFuZCBldmVyeSBrbm90IGxpbmtlZCB0byBpdC4gKi9cbiAgICBzZXRLbm90UG9zaXRpb24ocmVmOiBLbm90UmVmLCBsb2NhbFBvc2l0aW9uOiBSZWFkb25seTxWZWMzPik6IHZvaWQge1xuICAgICAgICB0aGlzLnNwbGluZXNbcmVmLnNwbGluZV0uc2V0S25vdFBvc2l0aW9uKHJlZi5rbm90LCBsb2NhbFBvc2l0aW9uKTtcbiAgICAgICAgc3luY0xpbmtlZCh0aGlzLCByZWYpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBsaW5rS25vdHMocmVmczogS25vdFJlZltdKTogdm9pZCB7XG4gICAgICAgIGxpbmtLbm90cyh0aGlzLCByZWZzLCBzcGxpbmVGYWN0b3J5KTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgdW5saW5rS25vdHMocmVmczogS25vdFJlZltdKTogdm9pZCB7XG4gICAgICAgIHVubGlua0tub3RzKHRoaXMsIHJlZnMpO1xuICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBnZXRMaW5rZWRLbm90cyhyZWY6IEtub3RSZWYpOiBLbm90UmVmW10ge1xuICAgICAgICByZXR1cm4gbGlua2VkS25vdHModGhpcywgcmVmKTtcbiAgICB9XG5cbiAgICBpc0tub3RMaW5rZWQocmVmOiBLbm90UmVmKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc0xpbmtlZCh0aGlzLCByZWYpO1xuICAgIH1cblxuICAgIC8qKiBVbml0eSdzIFNwbGl0IEtub3QuIFJldHVybnMgdGhlIG5ldyBjb3B5IG9mIHRoZSBrbm90LCBvciBudWxsLiAqL1xuICAgIHNwbGl0S25vdChyZWY6IEtub3RSZWYpOiBLbm90UmVmIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHIgPSBzcGxpdEtub3QodGhpcywgcmVmLCBzcGxpbmVGYWN0b3J5KTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIC8qKiBVbml0eSdzIEpvaW4gS25vdHMgKHR3byBlbmQga25vdHMpLiBSZXR1cm5zIHRoZSBqb2luZWQga25vdCwgb3IgbnVsbC4gKi9cbiAgICBqb2luS25vdHMoYTogS25vdFJlZiwgYjogS25vdFJlZik6IEtub3RSZWYgfCBudWxsIHtcbiAgICAgICAgY29uc3QgciA9IGpvaW5Lbm90cyh0aGlzLCBhLCBiLCBzcGxpbmVGYWN0b3J5KTtcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBldmFsdWF0aW9uXG5cbiAgICBwcml2YXRlIGdldFNwbGluZShpbmRleDogbnVtYmVyKTogU3BsaW5lIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwbGluZXNbaW5kZXhdID8/IG51bGw7XG4gICAgfVxuXG4gICAgLyoqIFdvcmxkLXNwYWNlIHBvc2l0aW9uIGF0IHQgb24gYSBzcGxpbmUuICovXG4gICAgZXZhbHVhdGVQb3NpdGlvbih0OiBudW1iZXIsIHNwbGluZUluZGV4ID0gMCwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiBvdXQuc2V0KHRoaXMubm9kZS53b3JsZFBvc2l0aW9uKTtcbiAgICAgICAgcy5ldmFsdWF0ZVBvc2l0aW9uKHQsIG91dCk7XG4gICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LCBvdXQsIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgfVxuXG4gICAgLyoqIFdvcmxkLXNwYWNlIGRlcml2YXRpdmUgYXQgdCAoZGlyZWN0aW9uIHRpbWVzIHNwZWVkLCBsaWtlIFVuaXR5J3MgRXZhbHVhdGVUYW5nZW50KS4gKi9cbiAgICBldmFsdWF0ZVRhbmdlbnQodDogbnVtYmVyLCBzcGxpbmVJbmRleCA9IDAsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgaWYgKCFzKSByZXR1cm4gb3V0LnNldCgwLCAwLCAwKTtcbiAgICAgICAgcy5ldmFsdWF0ZVRhbmdlbnQodCwgb3V0KTtcbiAgICAgICAgcmV0dXJuIFZlYzMudHJhbnNmb3JtTWF0NE5vcm1hbChvdXQsIG91dCwgdGhpcy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICB9XG5cbiAgICAvKiogV29ybGQtc3BhY2UgdW5pdCBkaXJlY3Rpb24gb2YgdHJhdmVsIGF0IHQuICovXG4gICAgZXZhbHVhdGVEaXJlY3Rpb24odDogbnVtYmVyLCBzcGxpbmVJbmRleCA9IDAsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgaWYgKCFzKSByZXR1cm4gb3V0LnNldCgwLCAwLCAxKTtcbiAgICAgICAgcy5ldmFsdWF0ZURpcmVjdGlvbih0LCBvdXQpO1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDROb3JtYWwob3V0LCBvdXQsIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgIHJldHVybiBvdXQubm9ybWFsaXplKCk7XG4gICAgfVxuXG4gICAgLyoqIFdvcmxkLXNwYWNlIHVuaXQgdXAgdmVjdG9yIGF0IHQuICovXG4gICAgZXZhbHVhdGVVcFZlY3Rvcih0OiBudW1iZXIsIHNwbGluZUluZGV4ID0gMCwgb3V0ID0gbmV3IFZlYzMoKSk6IFZlYzMge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiBvdXQuc2V0KDAsIDEsIDApO1xuICAgICAgICBzLmV2YWx1YXRlVXBWZWN0b3IodCwgb3V0KTtcbiAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0Tm9ybWFsKG91dCwgb3V0LCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICByZXR1cm4gb3V0Lm5vcm1hbGl6ZSgpO1xuICAgIH1cblxuICAgIC8qKiBQb3NpdGlvbiwgZGlyZWN0aW9uIGFuZCB1cCBhdCB0ICh3b3JsZCBzcGFjZSkuIFJldHVybnMgZmFsc2UgaWYgdGhlcmUgaXMgbm8gc3VjaCBzcGxpbmUuICovXG4gICAgZXZhbHVhdGUodDogbnVtYmVyLCBzcGxpbmVJbmRleCA9IDAsIG91dD86IFNwbGluZVNhbXBsZSk6IFNwbGluZVNhbXBsZSB8IG51bGwge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCByZXMgPSBvdXQgPz8geyBwb3NpdGlvbjogbmV3IFZlYzMoKSwgdGFuZ2VudDogbmV3IFZlYzMoKSwgdXA6IG5ldyBWZWMzKCkgfTtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZVBvc2l0aW9uKHQsIHNwbGluZUluZGV4LCByZXMucG9zaXRpb24pO1xuICAgICAgICB0aGlzLmV2YWx1YXRlRGlyZWN0aW9uKHQsIHNwbGluZUluZGV4LCByZXMudGFuZ2VudCk7XG4gICAgICAgIHRoaXMuZXZhbHVhdGVVcFZlY3Rvcih0LCBzcGxpbmVJbmRleCwgcmVzLnVwKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvKiogUm90YXRpb24gdGhhdCBmYWNlcyBhbG9uZyB0aGUgc3BsaW5lIGF0IHQgKCtaIGZvcndhcmQsICtZIHVwKSwgd29ybGQgc3BhY2UuICovXG4gICAgZXZhbHVhdGVSb3RhdGlvbih0OiBudW1iZXIsIHNwbGluZUluZGV4ID0gMCwgb3V0ID0gbmV3IFF1YXQoKSk6IFF1YXQge1xuICAgICAgICBjb25zdCBmID0gdGhpcy5ldmFsdWF0ZURpcmVjdGlvbih0LCBzcGxpbmVJbmRleCwgbmV3IFZlYzMoKSk7XG4gICAgICAgIGNvbnN0IHUgPSB0aGlzLmV2YWx1YXRlVXBWZWN0b3IodCwgc3BsaW5lSW5kZXgsIG5ldyBWZWMzKCkpO1xuICAgICAgICAvLyBRdWF0LmZyb21WaWV3VXAgbWFwcyArWiB0byB0aGUgdmlldyBkaXJlY3Rpb24sIGxpa2UgdGhlIGtub3RzLlxuICAgICAgICBRdWF0LmZyb21WaWV3VXAob3V0LCBmLCB1KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKiogV29ybGQtc3BhY2UgbGVuZ3RoIG9mIGEgc3BsaW5lLiAqL1xuICAgIGNhbGN1bGF0ZUxlbmd0aChzcGxpbmVJbmRleCA9IDApOiBudW1iZXIge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRTcGxpbmUoc3BsaW5lSW5kZXgpO1xuICAgICAgICBpZiAoIXMpIHJldHVybiAwO1xuICAgICAgICBjb25zdCBtID0gdGhpcy5ub2RlLndvcmxkTWF0cml4O1xuICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICBjb25zdCBjb3VudCA9IHMuY3VydmVDb3VudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBCZXppZXIgY3VydmVzIGFyZSBhZmZpbmUgaW52YXJpYW50OiB0cmFuc2Zvcm0gdGhlIGNvbnRyb2wgcG9pbnRzLlxuICAgICAgICAgICAgcy5nZXRDdXJ2ZShpLCBfYyk7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX2MucDAgYXMgVmVjMywgX2MucDAsIG0pO1xuICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KF9jLnAxIGFzIFZlYzMsIF9jLnAxLCBtKTtcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChfYy5wMiBhcyBWZWMzLCBfYy5wMiwgbSk7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX2MucDMgYXMgVmVjMywgX2MucDMsIG0pO1xuICAgICAgICAgICAgdG90YWwgKz0gYXJjTGVuZ3RoKF9jKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgfVxuXG4gICAgLyoqIENsb3Nlc3QgcG9pbnQgb24gYSBzcGxpbmUgdG8gYSB3b3JsZCBwb3NpdGlvbi4gKi9cbiAgICBnZXROZWFyZXN0UG9pbnQod29ybGRQb2ludDogUmVhZG9ubHk8VmVjMz4sIHNwbGluZUluZGV4ID0gMCk6IHsgdDogbnVtYmVyOyBwb3NpdGlvbjogVmVjMzsgZGlzdGFuY2U6IG51bWJlciB9IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFNwbGluZShzcGxpbmVJbmRleCk7XG4gICAgICAgIGlmICghcykgcmV0dXJuIG51bGw7XG4gICAgICAgIE1hdDQuaW52ZXJ0KF9tLCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX3YsIHdvcmxkUG9pbnQsIF9tKTtcbiAgICAgICAgY29uc3QgciA9IG5lYXJlc3RQb2ludChzLCBzLmNhY2hlLCBfdik7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gbmV3IFZlYzMoci5wb3NpdGlvbi54LCByLnBvc2l0aW9uLnksIHIucG9zaXRpb24ueik7XG4gICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChwb3NpdGlvbiwgcG9zaXRpb24sIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgIHJldHVybiB7IHQ6IHIudCwgcG9zaXRpb24sIGRpc3RhbmNlOiBWZWMzLmRpc3RhbmNlKHBvc2l0aW9uLCB3b3JsZFBvaW50KSB9O1xuICAgIH1cblxuICAgIC8qKiBDbG9zZXN0IHBvaW50IG92ZXIgYWxsIHNwbGluZXMuICovXG4gICAgZ2V0TmVhcmVzdFBvaW50QWxsKHdvcmxkUG9pbnQ6IFJlYWRvbmx5PFZlYzM+KTogeyBzcGxpbmU6IG51bWJlcjsgdDogbnVtYmVyOyBwb3NpdGlvbjogVmVjMzsgZGlzdGFuY2U6IG51bWJlciB9IHwgbnVsbCB7XG4gICAgICAgIGxldCBiZXN0OiB7IHNwbGluZTogbnVtYmVyOyB0OiBudW1iZXI7IHBvc2l0aW9uOiBWZWMzOyBkaXN0YW5jZTogbnVtYmVyIH0gfCBudWxsID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSB0aGlzLmdldE5lYXJlc3RQb2ludCh3b3JsZFBvaW50LCBpKTtcbiAgICAgICAgICAgIGlmIChyICYmICghYmVzdCB8fCByLmRpc3RhbmNlIDwgYmVzdC5kaXN0YW5jZSkpIGJlc3QgPSB7IHNwbGluZTogaSwgLi4uciB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0O1xuICAgIH1cblxuICAgIC8qKiBDb252ZXJ0cyBiZXR3ZWVuIG5vcm1hbGl6ZWQgdCwgbG9jYWwgZGlzdGFuY2UgYW5kIGtub3QgaW5kZXggdW5pdHMgb24gYSBzcGxpbmUuICovXG4gICAgY29udmVydEluZGV4VW5pdCh2YWx1ZTogbnVtYmVyLCBmcm9tOiBQYXRoSW5kZXhVbml0LCB0bzogUGF0aEluZGV4VW5pdCwgc3BsaW5lSW5kZXggPSAwKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0U3BsaW5lKHNwbGluZUluZGV4KTtcbiAgICAgICAgcmV0dXJuIHMgPyBzLmNvbnZlcnRJbmRleFVuaXQodmFsdWUsIGZyb20sIHRvKSA6IDA7XG4gICAgfVxuXG4gICAgLyoqIEtub3QgcG9zaXRpb24gaW4gd29ybGQgc3BhY2UuICovXG4gICAgZ2V0S25vdFdvcmxkUG9zaXRpb24ocmVmOiBLbm90UmVmLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IGsgPSB0aGlzLnNwbGluZXNbcmVmLnNwbGluZV0/Lmtub3RzW3JlZi5rbm90XTtcbiAgICAgICAgaWYgKCFrKSByZXR1cm4gb3V0LnNldCh0aGlzLm5vZGUud29ybGRQb3NpdGlvbik7XG4gICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LCBrLnBvc2l0aW9uLCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgIH1cblxuICAgIC8qKiBTZXRzIGV2ZXJ5IGtub3Qgb2YgZXZlcnkgc3BsaW5lIHRvIGEgdGFuZ2VudCBtb2RlLiAqL1xuICAgIHNldFRhbmdlbnRNb2RlQWxsKG1vZGU6IFRhbmdlbnRNb2RlKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNwbGluZXMpIHMuc2V0VGFuZ2VudE1vZGVBbGwobW9kZSk7XG4gICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlZCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgUGF0aEluZGV4VW5pdCB9O1xuIiwgImV4cG9ydCBjb25zdCBFRElUT1IgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IEVESVRPUl9OT1RfSU5fUFJFVklFVyA9IHRydWU7XG5leHBvcnQgY29uc3QgUFJFVklFVyA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IEJVSUxEID0gZmFsc2U7XG5leHBvcnQgY29uc3QgREVCVUcgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IERFViA9IHRydWU7XG5leHBvcnQgY29uc3QgSlNCID0gZmFsc2U7XG4iLCAiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBjY2VudW0sIEV2ZW50SGFuZGxlciwgUXVhdCwgVmVjMyB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUiB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcGxpbmVDb250YWluZXIgfSBmcm9tICcuL1NwbGluZUNvbnRhaW5lcic7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IF9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIFNwbGluZUFuaW1hdGVNZXRob2Qge1xuICAgIC8qKiBUcmF2ZWwgdGhlIHNwbGluZSBpbiBgZHVyYXRpb25gIHNlY29uZHMuICovXG4gICAgVGltZSA9IDAsXG4gICAgLyoqIFRyYXZlbCBhdCBgbWF4U3BlZWRgIHVuaXRzIHBlciBzZWNvbmQuICovXG4gICAgU3BlZWQgPSAxLFxufVxuXG5leHBvcnQgZW51bSBTcGxpbmVBbmltYXRlTG9vcE1vZGUge1xuICAgIC8qKiBQbGF5IG9uY2UgYW5kIHN0b3AgYXQgdGhlIGVuZC4gKi9cbiAgICBPbmNlID0gMCxcbiAgICAvKiogUmVzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmcgYXQgdGhlIGVuZC4gKi9cbiAgICBMb29wID0gMSxcbiAgICAvKiogRWFzZSBpbiBvbiB0aGUgZmlyc3QgbG9vcCBvbmx5LCB0aGVuIGxvb3AgYXQgY29uc3RhbnQgc3BlZWQuICovXG4gICAgTG9vcEVhc2VJbk9uY2UgPSAyLFxuICAgIC8qKiBHbyBiYWNrIGFuZCBmb3J0aC4gKi9cbiAgICBQaW5nUG9uZyA9IDMsXG59XG5cbmV4cG9ydCBlbnVtIFNwbGluZUFuaW1hdGVFYXNpbmcge1xuICAgIE5vbmUgPSAwLFxuICAgIEVhc2VJbiA9IDEsXG4gICAgRWFzZU91dCA9IDIsXG4gICAgRWFzZUluT3V0ID0gMyxcbn1cblxuZXhwb3J0IGVudW0gU3BsaW5lQW5pbWF0ZUFsaWdubWVudCB7XG4gICAgLyoqIEtlZXAgdGhlIG9iamVjdCdzIHJvdGF0aW9uLiAqL1xuICAgIE5vbmUgPSAwLFxuICAgIC8qKiBGYWNlIGFsb25nIHRoZSBzcGxpbmUsIHVzaW5nIHRoZSBzcGxpbmUncyB1cCB2ZWN0b3IuICovXG4gICAgU3BsaW5lRWxlbWVudCA9IDEsXG4gICAgLyoqIE1hdGNoIHRoZSBzcGxpbmUgY29udGFpbmVyJ3Mgcm90YXRpb24uICovXG4gICAgU3BsaW5lT2JqZWN0ID0gMixcbiAgICAvKiogTWF0Y2ggdGhlIHdvcmxkIGF4ZXMuICovXG4gICAgV29ybGQgPSAzLFxufVxuXG5leHBvcnQgZW51bSBBbGlnbkF4aXMge1xuICAgIFhBeGlzID0gMCxcbiAgICBZQXhpcyA9IDEsXG4gICAgWkF4aXMgPSAyLFxuICAgIE5lZ2F0aXZlWEF4aXMgPSAzLFxuICAgIE5lZ2F0aXZlWUF4aXMgPSA0LFxuICAgIE5lZ2F0aXZlWkF4aXMgPSA1LFxufVxuXG5jY2VudW0oU3BsaW5lQW5pbWF0ZU1ldGhvZCk7XG5jY2VudW0oU3BsaW5lQW5pbWF0ZUxvb3BNb2RlKTtcbmNjZW51bShTcGxpbmVBbmltYXRlRWFzaW5nKTtcbmNjZW51bShTcGxpbmVBbmltYXRlQWxpZ25tZW50KTtcbmNjZW51bShBbGlnbkF4aXMpO1xuXG5jb25zdCBBWEVTID0gW1xuICAgIG5ldyBWZWMzKDEsIDAsIDApLCBuZXcgVmVjMygwLCAxLCAwKSwgbmV3IFZlYzMoMCwgMCwgMSksXG4gICAgbmV3IFZlYzMoLTEsIDAsIDApLCBuZXcgVmVjMygwLCAtMSwgMCksIG5ldyBWZWMzKDAsIDAsIC0xKSxcbl07XG5cbmNvbnN0IF9wb3MgPSBuZXcgVmVjMygpO1xuY29uc3QgX2Z3ZCA9IG5ldyBWZWMzKCk7XG5jb25zdCBfdXAgPSBuZXcgVmVjMygpO1xuY29uc3QgX3JvdCA9IG5ldyBRdWF0KCk7XG5jb25zdCBfcmVtYXAgPSBuZXcgUXVhdCgpO1xuXG5mdW5jdGlvbiBlYXNlSW4odDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHQgKiB0O1xufVxuZnVuY3Rpb24gZWFzZU91dCh0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdCAqICgyIC0gdCk7XG59XG5mdW5jdGlvbiBlYXNlSW5PdXQodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHQgPCAwLjUgPyAyICogdCAqIHQgOiAtMSArICg0IC0gMiAqIHQpICogdDtcbn1cbmZ1bmN0aW9uIHBpbmdQb25nKHQ6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpIHtcbiAgICBjb25zdCBsMiA9IGxlbmd0aCAqIDI7XG4gICAgY29uc3QgbSA9ICgodCAlIGwyKSArIGwyKSAlIGwyO1xuICAgIHJldHVybiBsZW5ndGggLSBNYXRoLmFicyhtIC0gbGVuZ3RoKTtcbn1cblxuY29uc3QgX2xmID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9sdSA9IG5ldyBWZWMzKCk7XG5cbi8qKiBMb29rIHJvdGF0aW9uIHdpdGggK1ogPSBmb3J3YXJkIGFuZCArWSA9IHVwIChsaWtlIFVuaXR5J3MgUXVhdGVybmlvbi5Mb29rUm90YXRpb24pLiAqL1xuZnVuY3Rpb24gbG9va1JvdGF0aW9uKG91dDogUXVhdCwgZm9yd2FyZDogUmVhZG9ubHk8VmVjMz4sIHVwOiBSZWFkb25seTxWZWMzPik6IFF1YXQge1xuICAgIHJldHVybiBRdWF0LmZyb21WaWV3VXAob3V0LCBWZWMzLm5vcm1hbGl6ZShfbGYsIGZvcndhcmQpLCBWZWMzLm5vcm1hbGl6ZShfbHUsIHVwKSk7XG59XG5cbi8qKlxuICogTW92ZXMgaXRzIG5vZGUgYWxvbmcgYSBzcGxpbmUgKFVuaXR5J3MgU3BsaW5lQW5pbWF0ZSkuXG4gKlxuICogTm9kZSBldmVudHM6ICdzcGxpbmUtYW5pbWF0ZS11cGRhdGVkJyAocG9zaXRpb24sIHJvdGF0aW9uKSBldmVyeSB1cGRhdGVcbiAqIGFuZCAnc3BsaW5lLWFuaW1hdGUtY29tcGxldGVkJyB3aGVuIGEgcnVuIGVuZHMgb3IgYSBsb29wIHdyYXBzLlxuICovXG5AY2NjbGFzcygnU3BsaW5lQW5pbWF0ZScpXG5AbWVudSgnU3BsaW5lcy9TcGxpbmVBbmltYXRlJylcbmV4cG9ydCBjbGFzcyBTcGxpbmVBbmltYXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRXZlbnRUeXBlID0ge1xuICAgICAgICBVUERBVEVEOiAnc3BsaW5lLWFuaW1hdGUtdXBkYXRlZCcsXG4gICAgICAgIENPTVBMRVRFRDogJ3NwbGluZS1hbmltYXRlLWNvbXBsZXRlZCcsXG4gICAgfTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUNvbnRhaW5lciwgdG9vbHRpcDogJ1RoZSBzcGxpbmUgY29udGFpbmVyIHRvIGZvbGxvdy4nIH0pXG4gICAgY29udGFpbmVyOiBTcGxpbmVDb250YWluZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdXaGljaCBzcGxpbmUgb2YgdGhlIGNvbnRhaW5lciB0byBmb2xsb3cuJywgbWluOiAwLCBzdGVwOiAxIH0pXG4gICAgc3BsaW5lSW5kZXggPSAwO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1N0YXJ0IHBsYXlpbmcgd2hlbiB0aGUgY29tcG9uZW50IHN0YXJ0cy4nIH0pXG4gICAgcGxheU9uQXdha2UgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU3BsaW5lQW5pbWF0ZU1ldGhvZCwgdG9vbHRpcDogJ1RpbWU6IHRyYXZlbCB0aGUgc3BsaW5lIGluIGEgc2V0IGR1cmF0aW9uLiBTcGVlZDogdHJhdmVsIGF0IGEgc2V0IHNwZWVkLicgfSlcbiAgICBnZXQgbWV0aG9kKCk6IFNwbGluZUFuaW1hdGVNZXRob2Qge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kO1xuICAgIH1cbiAgICBzZXQgbWV0aG9kKHY6IFNwbGluZUFuaW1hdGVNZXRob2QpIHtcbiAgICAgICAgdGhpcy5fbWV0aG9kID0gdjtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnU2Vjb25kcyB0byB0cmF2ZWwgdGhlIHNwbGluZSBvbmNlLicsIG1pbjogMCwgdmlzaWJsZSh0aGlzOiBTcGxpbmVBbmltYXRlKSB7IHJldHVybiB0aGlzLl9tZXRob2QgPT09IFNwbGluZUFuaW1hdGVNZXRob2QuVGltZTsgfSB9KVxuICAgIGdldCBkdXJhdGlvbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHVyYXRpb247XG4gICAgfVxuICAgIHNldCBkdXJhdGlvbih2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSBNYXRoLm1heCgwLCB2KTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnU3BlZWQgaW4gdW5pdHMgcGVyIHNlY29uZC4nLCBtaW46IDAsIHZpc2libGUodGhpczogU3BsaW5lQW5pbWF0ZSkgeyByZXR1cm4gdGhpcy5fbWV0aG9kID09PSBTcGxpbmVBbmltYXRlTWV0aG9kLlNwZWVkOyB9IH0pXG4gICAgZ2V0IG1heFNwZWVkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhTcGVlZDtcbiAgICB9XG4gICAgc2V0IG1heFNwZWVkKHY6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tYXhTcGVlZCA9IE1hdGgubWF4KDAsIHYpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUFuaW1hdGVFYXNpbmcsIHRvb2x0aXA6ICdTcGVlZCBjdXJ2ZSBvZiBlYWNoIHJ1bi4nIH0pXG4gICAgZWFzaW5nID0gU3BsaW5lQW5pbWF0ZUVhc2luZy5Ob25lO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLCB0b29sdGlwOiAnV2hhdCBoYXBwZW5zIGF0IHRoZSBlbmQgb2YgdGhlIHNwbGluZS4nIH0pXG4gICAgbG9vcE1vZGUgPSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuTG9vcDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUFuaW1hdGVBbGlnbm1lbnQsIHRvb2x0aXA6ICdIb3cgdGhlIG9iamVjdCByb3RhdGVzIHdoaWxlIGl0IG1vdmVzLicgfSlcbiAgICBhbGlnbm1lbnQgPSBTcGxpbmVBbmltYXRlQWxpZ25tZW50LlNwbGluZUVsZW1lbnQ7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBBbGlnbkF4aXMsIHRvb2x0aXA6ICdUaGUgb2JqZWN0IGF4aXMgdGhhdCBwb2ludHMgYWxvbmcgdGhlIHNwbGluZSAoWiBmb3IgM0QgbW9kZWxzLCBYIGZvciAyRCBzcHJpdGVzKS4nIH0pXG4gICAgb2JqZWN0Rm9yd2FyZEF4aXMgPSBBbGlnbkF4aXMuWkF4aXM7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBBbGlnbkF4aXMsIHRvb2x0aXA6ICdUaGUgb2JqZWN0IGF4aXMgdGhhdCBwb2ludHMgYWxvbmcgdGhlIHNwbGluZVx1MjAxOXMgdXAgdmVjdG9yLicgfSlcbiAgICBvYmplY3RVcEF4aXMgPSBBbGlnbkF4aXMuWUF4aXM7XG5cbiAgICBAcHJvcGVydHkoeyByYW5nZTogWzAsIDEsIDAuMDFdLCBzbGlkZTogdHJ1ZSwgdG9vbHRpcDogJ1doZXJlIG9uIHRoZSBzcGxpbmUgdG8gc3RhcnQgKDAuLjEgb2YgaXRzIGxlbmd0aCkuJyB9KVxuICAgIHN0YXJ0T2Zmc2V0ID0gMDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtFdmVudEhhbmRsZXJdLCB0b29sdGlwOiAnQ2FsbGVkIHdoZW4gYSBydW4gZW5kcyBvciBhIGxvb3Agd3JhcHMuJyB9KVxuICAgIGNvbXBsZXRlZEV2ZW50czogRXZlbnRIYW5kbGVyW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX21ldGhvZCA9IFNwbGluZUFuaW1hdGVNZXRob2QuVGltZTtcbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9kdXJhdGlvbiA9IDE7XG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfbWF4U3BlZWQgPSAxMDtcblxuICAgIHByaXZhdGUgX2VsYXBzZWQgPSAwO1xuICAgIHByaXZhdGUgX2xhc3RFbGFwc2VkID0gMDtcbiAgICBwcml2YXRlIF9wbGF5aW5nID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbm9ybWFsaXplZFRpbWUgPSAwO1xuICAgIHByaXZhdGUgX2VuZFJlYWNoZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9wcmV2aWV3T3JpZ2luOiB7IHBvc2l0aW9uOiBWZWMzOyByb3RhdGlvbjogUXVhdCB9IHwgbnVsbCA9IG51bGw7XG5cbiAgICBnZXQgaXNQbGF5aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxheWluZztcbiAgICB9XG5cbiAgICAvKiogU2Vjb25kcyBzaW5jZSB0aGUgc3RhcnQgKGluY2x1ZGluZyBsb29wcykuICovXG4gICAgZ2V0IGVsYXBzZWRUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGFwc2VkO1xuICAgIH1cblxuICAgIHNldCBlbGFwc2VkVGltZSh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZWxhcHNlZCA9IE1hdGgubWF4KDAsIHYpO1xuICAgICAgICB0aGlzLmV2YWx1YXRlVGltZSgpO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgLyoqIFByb2dyZXNzIGFsb25nIHRoZSBzcGxpbmU7IHRoZSBpbnRlZ2VyIHBhcnQgY291bnRzIGNvbXBsZXRlZCBsb29wcy4gKi9cbiAgICBnZXQgbm9ybWFsaXplZFRpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRUaW1lO1xuICAgIH1cblxuICAgIHNldCBub3JtYWxpemVkVGltZSh2OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZCA9IHRoaXMuY3VycmVudER1cmF0aW9uKCk7XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSBNYXRoLm1heCgwLCB2KSAqIGQ7XG4gICAgICAgIHRoaXMuZXZhbHVhdGVUaW1lKCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheU9uQXdha2UpIHRoaXMucGxheSgpO1xuICAgICAgICBlbHNlIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xuICAgICAgICBpZiAoIXRoaXMuX3BsYXlpbmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5fZWxhcHNlZCArPSBkdDtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZVRpbWUoKTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHBsYXkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BsYXlpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHBhdXNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wbGF5aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIEJhY2sgdG8gdGhlIHN0YXJ0OyBrZWVwcyBwbGF5aW5nIGlmIGBhdXRvcGxheWAuICovXG4gICAgcmVzdGFydChhdXRvcGxheSA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuX2xhc3RFbGFwc2VkID0gMDtcbiAgICAgICAgdGhpcy5fbm9ybWFsaXplZFRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9lbmRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BsYXlpbmcgPSBhdXRvcGxheTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8qKiBMZW5ndGggb2YgdGhlIGZvbGxvd2VkIHNwbGluZSBpbiB3b3JsZCB1bml0cy4gKi9cbiAgICBnZXQgc3BsaW5lTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lciA/IHRoaXMuY29udGFpbmVyLmNhbGN1bGF0ZUxlbmd0aCh0aGlzLnNwbGluZUluZGV4KSA6IDA7XG4gICAgfVxuXG4gICAgLyoqIER1cmF0aW9uIG9mIG9uZSBydW4gKFNwZWVkIG1vZGUgY29udmVydHMgdGhlIHNwZWVkIGludG8gYSBkdXJhdGlvbikuICovXG4gICAgY3VycmVudER1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9tZXRob2QgPT09IFNwbGluZUFuaW1hdGVNZXRob2QuVGltZSkgcmV0dXJuIHRoaXMuX2R1cmF0aW9uO1xuICAgICAgICBpZiAodGhpcy5fbWF4U3BlZWQgPD0gMCkgcmV0dXJuIEluZmluaXR5O1xuICAgICAgICBjb25zdCBiYXNlID0gdGhpcy5zcGxpbmVMZW5ndGggLyB0aGlzLl9tYXhTcGVlZDtcbiAgICAgICAgLy8gRWFzZWQgcnVucyByZWFjaCB0d2ljZSB0aGUgYXZlcmFnZSBzcGVlZDsga2VlcCB0aGUgcGVhayBhdCBtYXhTcGVlZC5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWFzaW5nID09PSBTcGxpbmVBbmltYXRlRWFzaW5nLk5vbmUgPyBiYXNlIDogYmFzZSAqIDI7XG4gICAgfVxuXG4gICAgLyoqIFNwbGluZSB0ICgwLi4xKSBmb3IgdGhlIGN1cnJlbnQgdGltZSwgYWZ0ZXIgbG9vcGluZywgZWFzaW5nIGFuZCB0aGUgc3RhcnQgb2Zmc2V0LiAqL1xuICAgIGdldFNwbGluZVQoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHQgPSB0aGlzLl9ub3JtYWxpemVkVGltZSAlIDE7XG4gICAgICAgIGlmICh0aGlzLl9ub3JtYWxpemVkVGltZSA+PSAxICYmIHQgPT09IDAgJiYgdGhpcy5sb29wTW9kZSA9PT0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLk9uY2UpIHQgPSAxO1xuICAgICAgICB0ICs9IHRoaXMuc3RhcnRPZmZzZXQ7XG4gICAgICAgIHJldHVybiB0ID4gMSA/ICh0aGlzLmNvbnRhaW5lcj8uc3BsaW5lc1t0aGlzLnNwbGluZUluZGV4XT8uY2xvc2VkID8gdCAlIDEgOiBNYXRoLm1pbih0LCAxKSkgOiB0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZXZhbHVhdGVUaW1lKCk6IHZvaWQge1xuICAgICAgICBsZXQgZHVyYXRpb24gPSB0aGlzLmN1cnJlbnREdXJhdGlvbigpO1xuICAgICAgICBpZiAoIShkdXJhdGlvbiA+IDApIHx8ICFpc0Zpbml0ZShkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuX25vcm1hbGl6ZWRUaW1lID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBBIGxvb3Agd3JhcHBlZCAob3IgYSBwaW5nLXBvbmcgdHVybmVkKSBzaW5jZSB0aGUgbGFzdCBldmFsdWF0aW9uLlxuICAgICAgICBpZiAodGhpcy5sb29wTW9kZSAhPT0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLk9uY2UgJiYgdGhpcy5fZWxhcHNlZCA+IHRoaXMuX2xhc3RFbGFwc2VkXG4gICAgICAgICAgICAmJiBNYXRoLmZsb29yKHRoaXMuX2VsYXBzZWQgLyBkdXJhdGlvbikgPiBNYXRoLmZsb29yKHRoaXMuX2xhc3RFbGFwc2VkIC8gZHVyYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRSZWFjaGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXN0RWxhcHNlZCA9IHRoaXMuX2VsYXBzZWQ7XG4gICAgICAgIGxldCB0ID0gMDtcbiAgICAgICAgY29uc3QgZWFzZUZpcnN0ID0gdGhpcy5lYXNpbmcgPT09IFNwbGluZUFuaW1hdGVFYXNpbmcuRWFzZUluIHx8IHRoaXMuZWFzaW5nID09PSBTcGxpbmVBbmltYXRlRWFzaW5nLkVhc2VJbk91dDtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvb3BNb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVMb29wTW9kZS5PbmNlOlxuICAgICAgICAgICAgICAgIHQgPSBNYXRoLm1pbih0aGlzLl9lbGFwc2VkLCBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVMb29wTW9kZS5Mb29wOlxuICAgICAgICAgICAgICAgIHQgPSB0aGlzLl9lbGFwc2VkICUgZHVyYXRpb247XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVMb29wTW9kZS5Mb29wRWFzZUluT25jZTpcbiAgICAgICAgICAgICAgICAvLyBBZnRlciBhbiBlYXNlZC1pbiBmaXJzdCBydW4sIGNvbnN0YW50IHNwZWVkIHRha2VzIGhhbGYgYXMgbG9uZy5cbiAgICAgICAgICAgICAgICBpZiAoZWFzZUZpcnN0ICYmIHRoaXMuX2VsYXBzZWQgPj0gZHVyYXRpb24pIGR1cmF0aW9uICo9IDAuNTtcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5fZWxhcHNlZCAlIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuUGluZ1Bvbmc6XG4gICAgICAgICAgICAgICAgdCA9IHBpbmdQb25nKHRoaXMuX2VsYXBzZWQsIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0IC89IGR1cmF0aW9uO1xuICAgICAgICBpZiAodGhpcy5sb29wTW9kZSA9PT0gU3BsaW5lQW5pbWF0ZUxvb3BNb2RlLkxvb3BFYXNlSW5PbmNlKSB7XG4gICAgICAgICAgICBpZiAoZWFzZUZpcnN0ICYmIHRoaXMuX2VsYXBzZWQgPCBkdXJhdGlvbikgdCA9IGVhc2VJbih0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5lYXNpbmcpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVFYXNpbmcuRWFzZUluOiB0ID0gZWFzZUluKHQpOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVFYXNpbmcuRWFzZU91dDogdCA9IGVhc2VPdXQodCk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU3BsaW5lQW5pbWF0ZUVhc2luZy5FYXNlSW5PdXQ6IHQgPSBlYXNlSW5PdXQodCk7IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvb3BzID0gTWF0aC5mbG9vcih0aGlzLl9lbGFwc2VkIC8gZHVyYXRpb24pO1xuICAgICAgICB0aGlzLl9ub3JtYWxpemVkVGltZSA9IHRoaXMubG9vcE1vZGUgPT09IFNwbGluZUFuaW1hdGVMb29wTW9kZS5PbmNlID8gTWF0aC5taW4oMSwgdCkgOiBsb29wcyArIHQ7XG4gICAgICAgIGlmICh0aGlzLmxvb3BNb2RlID09PSBTcGxpbmVBbmltYXRlTG9vcE1vZGUuT25jZSAmJiB0aGlzLl9lbGFwc2VkID49IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxpemVkVGltZSA9IDE7XG4gICAgICAgICAgICBpZiAodGhpcy5fcGxheWluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmRSZWFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXb3JsZCBwb3NpdGlvbiBhbmQgcm90YXRpb24gZm9yIHRoZSBjdXJyZW50IHRpbWUuICovXG4gICAgZXZhbHVhdGVQb3NpdGlvbkFuZFJvdGF0aW9uKG91dFBvc2l0aW9uID0gbmV3IFZlYzMoKSwgb3V0Um90YXRpb24gPSBuZXcgUXVhdCgpKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKCFjIHx8ICFjLnNwbGluZXNbdGhpcy5zcGxpbmVJbmRleF0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgdCA9IHRoaXMuZ2V0U3BsaW5lVCgpO1xuICAgICAgICBjLmV2YWx1YXRlUG9zaXRpb24odCwgdGhpcy5zcGxpbmVJbmRleCwgb3V0UG9zaXRpb24pO1xuICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQgPT09IFNwbGluZUFuaW1hdGVBbGlnbm1lbnQuTm9uZSkge1xuICAgICAgICAgICAgb3V0Um90YXRpb24uc2V0KHRoaXMubm9kZS53b3JsZFJvdGF0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZ3ZEF4aXMgPSBBWEVTW3RoaXMub2JqZWN0Rm9yd2FyZEF4aXNdID8/IEFYRVNbMl07XG4gICAgICAgIGxldCB1cEF4aXMgPSBBWEVTW3RoaXMub2JqZWN0VXBBeGlzXSA/PyBBWEVTWzFdO1xuICAgICAgICBpZiAoTWF0aC5hYnMoVmVjMy5kb3QoZndkQXhpcywgdXBBeGlzKSkgPiAwLjk5KSB1cEF4aXMgPSBNYXRoLmFicyhmd2RBeGlzLnkpID4gMC45OSA/IEFYRVNbMl0gOiBBWEVTWzFdO1xuICAgICAgICBRdWF0LmludmVydChfcmVtYXAsIGxvb2tSb3RhdGlvbihfcmVtYXAsIGZ3ZEF4aXMsIHVwQXhpcykpO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICBjYXNlIFNwbGluZUFuaW1hdGVBbGlnbm1lbnQuU3BsaW5lRWxlbWVudDpcbiAgICAgICAgICAgICAgICBjLmV2YWx1YXRlRGlyZWN0aW9uKHQsIHRoaXMuc3BsaW5lSW5kZXgsIF9md2QpO1xuICAgICAgICAgICAgICAgIGMuZXZhbHVhdGVVcFZlY3Rvcih0LCB0aGlzLnNwbGluZUluZGV4LCBfdXApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTcGxpbmVBbmltYXRlQWxpZ25tZW50LlNwbGluZU9iamVjdDpcbiAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX2Z3ZCwgVmVjMy5VTklUX1osIGMubm9kZS53b3JsZFJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX3VwLCBWZWMzLlVOSVRfWSwgYy5ub2RlLndvcmxkUm90YXRpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBfZndkLnNldCgwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICBfdXAuc2V0KDAsIDEsIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGxvb2tSb3RhdGlvbihvdXRSb3RhdGlvbiwgX2Z3ZCwgX3VwKTtcbiAgICAgICAgUXVhdC5tdWx0aXBseShvdXRSb3RhdGlvbiwgb3V0Um90YXRpb24sIF9yZW1hcCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlUcmFuc2Zvcm0oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5ldmFsdWF0ZVBvc2l0aW9uQW5kUm90YXRpb24oX3BvcywgX3JvdCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5ub2RlLnNldFdvcmxkUG9zaXRpb24oX3Bvcyk7XG4gICAgICAgIGlmICh0aGlzLmFsaWdubWVudCAhPT0gU3BsaW5lQW5pbWF0ZUFsaWdubWVudC5Ob25lKSB0aGlzLm5vZGUuc2V0V29ybGRSb3RhdGlvbihfcm90KTtcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoU3BsaW5lQW5pbWF0ZS5FdmVudFR5cGUuVVBEQVRFRCwgX3BvcywgX3JvdCk7XG4gICAgICAgIGlmICh0aGlzLl9lbmRSZWFjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZW1pdChTcGxpbmVBbmltYXRlLkV2ZW50VHlwZS5DT01QTEVURUQsIHRoaXMpO1xuICAgICAgICAgICAgRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5jb21wbGV0ZWRFdmVudHMsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZWRpdG9yIHByZXZpZXdcblxuICAgIC8qKiBFZGl0b3IgcHJldmlldzogc2hvd3MgdGhlIG9iamVjdCBhdCBgc2Vjb25kc2AgKHRoZSBvcmlnaW5hbCB0cmFuc2Zvcm0gaXMga2VwdCBmb3IgX3ByZXZpZXdTdG9wKS4gKi9cbiAgICBfcHJldmlld1NldFRpbWUoc2Vjb25kczogbnVtYmVyKTogeyBub3JtYWxpemVkVGltZTogbnVtYmVyOyBkdXJhdGlvbjogbnVtYmVyIH0ge1xuICAgICAgICBpZiAoIXRoaXMuX3ByZXZpZXdPcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpZXdPcmlnaW4gPSB7IHBvc2l0aW9uOiB0aGlzLm5vZGUud29ybGRQb3NpdGlvbi5jbG9uZSgpLCByb3RhdGlvbjogdGhpcy5ub2RlLndvcmxkUm90YXRpb24uY2xvbmUoKSB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSBNYXRoLm1heCgwLCBzZWNvbmRzKTtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZVRpbWUoKTtcbiAgICAgICAgdGhpcy5fZW5kUmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNmb3JtKCk7XG4gICAgICAgIHJldHVybiB7IG5vcm1hbGl6ZWRUaW1lOiB0aGlzLl9ub3JtYWxpemVkVGltZSwgZHVyYXRpb246IHRoaXMuY3VycmVudER1cmF0aW9uKCkgfTtcbiAgICB9XG5cbiAgICAvKiogRWRpdG9yIHByZXZpZXc6IHB1dHMgdGhlIG9iamVjdCBiYWNrIHdoZXJlIGl0IHdhcy4gKi9cbiAgICBfcHJldmlld1N0b3AoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9wcmV2aWV3T3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0V29ybGRQb3NpdGlvbih0aGlzLl9wcmV2aWV3T3JpZ2luLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRXb3JsZFJvdGF0aW9uKHRoaXMuX3ByZXZpZXdPcmlnaW4ucm90YXRpb24pO1xuICAgICAgICAgICAgdGhpcy5fcHJldmlld09yaWdpbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuX25vcm1hbGl6ZWRUaW1lID0gMDtcbiAgICB9XG5cbiAgICBfcHJldmlld0luZm8oKTogeyBkdXJhdGlvbjogbnVtYmVyOyBsZW5ndGg6IG51bWJlcjsgcHJldmlld2luZzogYm9vbGVhbiB9IHtcbiAgICAgICAgcmV0dXJuIHsgZHVyYXRpb246IHRoaXMuY3VycmVudER1cmF0aW9uKCksIGxlbmd0aDogdGhpcy5zcGxpbmVMZW5ndGgsIHByZXZpZXdpbmc6ICEhdGhpcy5fcHJldmlld09yaWdpbiB9O1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKEVESVRPUikgdGhpcy5fcHJldmlld1N0b3AoKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgICBfZGVjb3JhdG9yLCBDb21wb25lbnQsIGNjZW51bSwgQ0NPYmplY3QsIGRpcmVjdG9yLCBqcywgTWF0ZXJpYWwsIE1hdDQsIE1lc2gsIE1lc2hSZW5kZXJlciwgTm9kZSwgdXRpbHMsIFZlYzIsIFZlYzMsXG59IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUiB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcGxpbmVDb250YWluZXIgfSBmcm9tICcuL1NwbGluZUNvbnRhaW5lcic7XG5pbXBvcnQgeyBTcGxpbmUgfSBmcm9tICcuL1NwbGluZSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGVJbkVkaXRNb2RlLCBtZW51IH0gPSBfZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBFeHRydWRlU2hhcGUge1xuICAgIC8qKiBBIHR1YmUuICovXG4gICAgQ2lyY2xlID0gMCxcbiAgICAvKiogQSBzcXVhcmUgdHViZS4gKi9cbiAgICBTcXVhcmUgPSAxLFxuICAgIC8qKiBBIGZsYXQgc3RyaXAgZmFjaW5nIHRoZSBzcGxpbmUncyB1cCB2ZWN0b3IuICovXG4gICAgUm9hZCA9IDIsXG4gICAgLyoqIFRoZSBmaXJzdCBzcGxpbmUgb2YgYW5vdGhlciBjb250YWluZXIsIHJlYWQgaW4gaXRzIFhZIHBsYW5lLiAqL1xuICAgIFNwbGluZSA9IDMsXG59XG5jY2VudW0oRXh0cnVkZVNoYXBlKTtcblxuLyoqIEhpZGRlbiBjaGlsZCB0aGF0IGhvbGRzIHRoZSBnZW5lcmF0ZWQgbWVzaDogbm90IHNhdmVkLCBub3QgbGlzdGVkLCBub3QgcGlja2FibGUuICovXG5jb25zdCBHRU5FUkFURURfRkxBR1MgPSBDQ09iamVjdC5GbGFncy5Eb250U2F2ZSB8IENDT2JqZWN0LkZsYWdzLkhpZGVJbkhpZXJhcmNoeSB8IENDT2JqZWN0LkZsYWdzLkxvY2tlZEluRWRpdG9yO1xuXG5pbnRlcmZhY2UgUHJvZmlsZSB7XG4gICAgLyoqIDJEIHBvaW50cyAoeCBhbG9uZyB0aGUgcmlnaHQgdmVjdG9yLCB5IGFsb25nIHVwKS4gKi9cbiAgICBwb2ludHM6IG51bWJlcltdO1xuICAgIG5vcm1hbHM6IG51bWJlcltdO1xuICAgIHU6IG51bWJlcltdO1xuICAgIC8qKiBQYWlycyBvZiBwb2ludCBpbmRpY2VzIHRoYXQgZm9ybSBmYWNlcy4gKi9cbiAgICBlZGdlczogbnVtYmVyW107XG4gICAgLyoqIFByb2ZpbGUgZW5jbG9zZXMgYW4gYXJlYSAoY2FwcyBwb3NzaWJsZSkuICovXG4gICAgY2xvc2VkOiBib29sZWFuO1xuICAgIC8qKiBQZXJpbWV0ZXIgb2YgdGhlIHByb2ZpbGUgYXQgcmFkaXVzIDEsIGZvciB0ZXh0dXJlIHNjYWxlIGFsb25nIHRoZSBzcGxpbmUuICovXG4gICAgcGVyaW1ldGVyOiBudW1iZXI7XG59XG5cbmNvbnN0IF9wID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9mID0gbmV3IFZlYzMoKTtcbmNvbnN0IF91ID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9yID0gbmV3IFZlYzMoKTtcbmNvbnN0IF9tID0gbmV3IE1hdDQoKTtcblxuLyoqXG4gKiBCdWlsZHMgYSBtZXNoIGFsb25nIHRoZSBzcGxpbmVzIG9mIGEgY29udGFpbmVyIChVbml0eSdzIFNwbGluZUV4dHJ1ZGUpLlxuICogVGhlIG1lc2ggaXMgcmVnZW5lcmF0ZWQgd2hlbiB0aGUgc3BsaW5lIG9yIGEgc2V0dGluZyBjaGFuZ2VzOyBpdCBsaXZlcyBvblxuICogYSBoaWRkZW4gY2hpbGQgbm9kZSBhbmQgaXMgbm90IHNhdmVkIHdpdGggdGhlIHNjZW5lLlxuICovXG5AY2NjbGFzcygnU3BsaW5lRXh0cnVkZScpXG5AZXhlY3V0ZUluRWRpdE1vZGVcbkBtZW51KCdTcGxpbmVzL1NwbGluZUV4dHJ1ZGUnKVxuZXhwb3J0IGNsYXNzIFNwbGluZUV4dHJ1ZGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUNvbnRhaW5lciwgdG9vbHRpcDogJ1RoZSBzcGxpbmVzIHRvIGV4dHJ1ZGUgKGFsbCBzcGxpbmVzIG9mIHRoZSBjb250YWluZXIpLicgfSlcbiAgICBjb250YWluZXI6IFNwbGluZUNvbnRhaW5lciB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogTWF0ZXJpYWwsIHRvb2x0aXA6ICdNYXRlcmlhbCBvZiB0aGUgZ2VuZXJhdGVkIG1lc2guJyB9KVxuICAgIG1hdGVyaWFsOiBNYXRlcmlhbCB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1JlYnVpbGQgdGhlIG1lc2ggd2hlbiB0aGUgc3BsaW5lIGNoYW5nZXMgKGF0IHJ1bnRpbWUgdG9vKS4nIH0pXG4gICAgcmVidWlsZE9uU3BsaW5lQ2hhbmdlID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdBdCBtb3N0IHRoaXMgbWFueSByZWJ1aWxkcyBwZXIgc2Vjb25kIGF0IHJ1bnRpbWUuJywgbWluOiAxLCBzdGVwOiAxLCB2aXNpYmxlKHRoaXM6IFNwbGluZUV4dHJ1ZGUpIHsgcmV0dXJuIHRoaXMucmVidWlsZE9uU3BsaW5lQ2hhbmdlOyB9IH0pXG4gICAgcmVidWlsZEZyZXF1ZW5jeSA9IDMwO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogRXh0cnVkZVNoYXBlLCB0b29sdGlwOiAnQ3Jvc3Mtc2VjdGlvbiBvZiB0aGUgbWVzaC4nIH0pXG4gICAgc2hhcGUgPSBFeHRydWRlU2hhcGUuQ2lyY2xlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1NpZGVzIG9mIHRoZSBjaXJjbGUuJywgbWluOiAzLCBzdGVwOiAxLCB2aXNpYmxlKHRoaXM6IFNwbGluZUV4dHJ1ZGUpIHsgcmV0dXJuIHRoaXMuc2hhcGUgPT09IEV4dHJ1ZGVTaGFwZS5DaXJjbGU7IH0gfSlcbiAgICBzaWRlcyA9IDg7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTcGxpbmVDb250YWluZXIsIHRvb2x0aXA6ICdDb250YWluZXIgd2hvc2UgZmlyc3Qgc3BsaW5lIGlzIHRoZSBjcm9zcy1zZWN0aW9uIChpbiBpdHMgWFkgcGxhbmUpLicsIHZpc2libGUodGhpczogU3BsaW5lRXh0cnVkZSkgeyByZXR1cm4gdGhpcy5zaGFwZSA9PT0gRXh0cnVkZVNoYXBlLlNwbGluZTsgfSB9KVxuICAgIHByb2ZpbGU6IFNwbGluZUNvbnRhaW5lciB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1BvaW50cyBzYW1wbGVkIGFsb25nIHRoZSBwcm9maWxlIHNwbGluZS4nLCBtaW46IDIsIHN0ZXA6IDEsIHZpc2libGUodGhpczogU3BsaW5lRXh0cnVkZSkgeyByZXR1cm4gdGhpcy5zaGFwZSA9PT0gRXh0cnVkZVNoYXBlLlNwbGluZTsgfSB9KVxuICAgIHByb2ZpbGVTZWdtZW50cyA9IDE2O1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1JhZGl1cyAoaGFsZiB3aWR0aCkgb2YgdGhlIGNyb3NzLXNlY3Rpb24uJywgbWluOiAwIH0pXG4gICAgcmFkaXVzID0gMC4yNTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdFZGdlIGxvb3BzIHBlciB1bml0IG9mIHNwbGluZSBsZW5ndGguJywgbWluOiAwLjAxIH0pXG4gICAgc2VnbWVudHNQZXJVbml0ID0gNDtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdDbG9zZSB0aGUgZW5kcyBvZiBvcGVuIHNwbGluZXMuJyB9KVxuICAgIGNhcHBlZCA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUGFydCBvZiBlYWNoIHNwbGluZSB0byBleHRydWRlICgwLi4xKS4nIH0pXG4gICAgcmFuZ2UgPSBuZXcgVmVjMigwLCAxKTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdUdXJuIHRoZSBtZXNoIGluc2lkZSBvdXQuJyB9KVxuICAgIGZsaXBOb3JtYWxzID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnQ2FzdCBzaGFkb3dzLicgfSlcbiAgICBjYXN0U2hhZG93cyA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnUmVjZWl2ZSBzaGFkb3dzLicgfSlcbiAgICByZWNlaXZlU2hhZG93cyA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAnQWRkIGEgTWVzaENvbGxpZGVyIHVzaW5nIHRoZSBnZW5lcmF0ZWQgbWVzaCAobmVlZHMgYSBwaHlzaWNzIGJhY2tlbmQgd2l0aCBtZXNoIGNvbGxpZGVycykuJyB9KVxuICAgIGdlbmVyYXRlQ29sbGlkZXIgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2NoaWxkOiBOb2RlIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfbWVzaDogTWVzaCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgX3N0YW1wID0gTmFOO1xuICAgIHByaXZhdGUgX2xhc3RCdWlsZCA9IC1JbmZpbml0eTtcbiAgICBwcml2YXRlIF9mYWxsYmFja01hdGVyaWFsOiBNYXRlcmlhbCB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIFRoZSBnZW5lcmF0ZWQgbWVzaCAobnVsbCBiZWZvcmUgdGhlIGZpcnN0IGJ1aWxkKS4gKi9cbiAgICBnZXQgbWVzaCgpOiBNZXNoIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNoO1xuICAgIH1cblxuICAgIHJlc2V0SW5FZGl0b3IoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5nZXRDb21wb25lbnQoU3BsaW5lQ29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250YWluZXIpIHRoaXMuY29udGFpbmVyID0gdGhpcy5nZXRDb21wb25lbnQoU3BsaW5lQ29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZWJ1aWxkKCk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5fY2hpbGQpIHRoaXMuX2NoaWxkLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkICYmIHRoaXMuX2NoaWxkLmlzVmFsaWQpIHRoaXMuX2NoaWxkLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fY2hpbGQgPSBudWxsO1xuICAgICAgICB0aGlzLl9tZXNoPy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX21lc2ggPSBudWxsO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCFFRElUT1IgJiYgIXRoaXMucmVidWlsZE9uU3BsaW5lQ2hhbmdlKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHN0YW1wID0gdGhpcy5jb21wdXRlU3RhbXAoKTtcbiAgICAgICAgaWYgKHN0YW1wID09PSB0aGlzLl9zdGFtcCkgcmV0dXJuO1xuICAgICAgICBpZiAoIUVESVRPUikge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gZGlyZWN0b3IuZ2V0VG90YWxUaW1lKCkgLyAxMDAwO1xuICAgICAgICAgICAgaWYgKG5vdyAtIHRoaXMuX2xhc3RCdWlsZCA8IDEgLyBNYXRoLm1heCgxLCB0aGlzLnJlYnVpbGRGcmVxdWVuY3kpKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLl9sYXN0QnVpbGQgPSBub3c7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wdXRlU3RhbXAoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBsZXQgaCA9IGMgJiYgYy5pc1ZhbGlkID8gYy5jaGFuZ2VTdGFtcCA6IDA7XG4gICAgICAgIGNvbnN0IG1peCA9ICh2OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGggPSBNYXRoLmltdWwoaCBeIE1hdGgucm91bmQodiAqIDFlNSksIDE2Nzc3NjE5KTtcbiAgICAgICAgfTtcbiAgICAgICAgbWl4KHRoaXMuc2hhcGUpO1xuICAgICAgICBtaXgodGhpcy5zaWRlcyk7XG4gICAgICAgIG1peCh0aGlzLnJhZGl1cyk7XG4gICAgICAgIG1peCh0aGlzLnNlZ21lbnRzUGVyVW5pdCk7XG4gICAgICAgIG1peCh0aGlzLmNhcHBlZCA/IDEgOiAwKTtcbiAgICAgICAgbWl4KHRoaXMucmFuZ2UueCk7XG4gICAgICAgIG1peCh0aGlzLnJhbmdlLnkpO1xuICAgICAgICBtaXgodGhpcy5mbGlwTm9ybWFscyA/IDEgOiAwKTtcbiAgICAgICAgbWl4KHRoaXMuY2FzdFNoYWRvd3MgPyAxIDogMCk7XG4gICAgICAgIG1peCh0aGlzLnJlY2VpdmVTaGFkb3dzID8gMSA6IDApO1xuICAgICAgICBtaXgodGhpcy5nZW5lcmF0ZUNvbGxpZGVyID8gMSA6IDApO1xuICAgICAgICBtaXgodGhpcy5wcm9maWxlU2VnbWVudHMpO1xuICAgICAgICBpZiAodGhpcy5wcm9maWxlICYmIHRoaXMuc2hhcGUgPT09IEV4dHJ1ZGVTaGFwZS5TcGxpbmUpIG1peCh0aGlzLnByb2ZpbGUuY2hhbmdlU3RhbXApO1xuICAgICAgICBpZiAoYyAmJiBjLmlzVmFsaWQgJiYgYy5ub2RlICE9PSB0aGlzLm5vZGUpIHtcbiAgICAgICAgICAgIE1hdDQuaW52ZXJ0KF9tLCB0aGlzLm5vZGUud29ybGRNYXRyaXgpO1xuICAgICAgICAgICAgTWF0NC5tdWx0aXBseShfbSwgX20sIGMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHYgb2YgTWF0NC50b0FycmF5KFtdLCBfbSkpIG1peCh2KTtcbiAgICAgICAgfVxuICAgICAgICBoID0gTWF0aC5pbXVsKGggXiAodGhpcy5tYXRlcmlhbCA/IDEgOiAwKSwgMTY3Nzc2MTkpO1xuICAgICAgICByZXR1cm4gaDtcbiAgICB9XG5cbiAgICAvKiogUmVnZW5lcmF0ZXMgdGhlIG1lc2ggbm93LiAqL1xuICAgIHJlYnVpbGQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N0YW1wID0gdGhpcy5jb21wdXRlU3RhbXAoKTtcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSB0aGlzLmJ1aWxkR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmVuc3VyZUNoaWxkKCk7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gY2hpbGQuZ2V0Q29tcG9uZW50KE1lc2hSZW5kZXJlcikgfHwgY2hpbGQuYWRkQ29tcG9uZW50KE1lc2hSZW5kZXJlcik7XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuX21lc2g7XG4gICAgICAgIGlmICghZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgIHJlbmRlcmVyLm1lc2ggPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fbWVzaCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tZXNoID0gdXRpbHMuTWVzaFV0aWxzLmNyZWF0ZU1lc2goZ2VvbWV0cnksIHVuZGVmaW5lZCwgeyBjYWxjdWxhdGVCb3VuZHM6IHRydWUgfSk7XG4gICAgICAgICAgICByZW5kZXJlci5tZXNoID0gdGhpcy5fbWVzaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkICYmIG9sZCAhPT0gdGhpcy5fbWVzaCkgb2xkLmRlc3Ryb3koKTtcbiAgICAgICAgY29uc3QgbWF0ID0gdGhpcy5tYXRlcmlhbCB8fCB0aGlzLmZhbGxiYWNrTWF0ZXJpYWwoKTtcbiAgICAgICAgaWYgKG1hdCkgcmVuZGVyZXIuc2V0U2hhcmVkTWF0ZXJpYWwobWF0LCAwKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93Q2FzdGluZ01vZGUgPSB0aGlzLmNhc3RTaGFkb3dzID8gMSA6IDA7XG4gICAgICAgIHJlbmRlcmVyLnJlY2VpdmVTaGFkb3cgPSB0aGlzLnJlY2VpdmVTaGFkb3dzID8gMSA6IDA7XG4gICAgICAgIHRoaXMudXBkYXRlQ29sbGlkZXIoY2hpbGQpO1xuICAgICAgICBjaGlsZC5hY3RpdmUgPSB0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZhbGxiYWNrTWF0ZXJpYWwoKTogTWF0ZXJpYWwgfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZhbGxiYWNrTWF0ZXJpYWwpIHJldHVybiB0aGlzLl9mYWxsYmFja01hdGVyaWFsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbSA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICAgICAgbS5pbml0aWFsaXplKHsgZWZmZWN0TmFtZTogJ2J1aWx0aW4tc3RhbmRhcmQnIH0pO1xuICAgICAgICAgICAgdGhpcy5fZmFsbGJhY2tNYXRlcmlhbCA9IG07XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgdGhpcy5fZmFsbGJhY2tNYXRlcmlhbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbGxiYWNrTWF0ZXJpYWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbnN1cmVDaGlsZCgpOiBOb2RlIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkICYmIHRoaXMuX2NoaWxkLmlzVmFsaWQgJiYgdGhpcy5fY2hpbGQucGFyZW50ID09PSB0aGlzLm5vZGUpIHJldHVybiB0aGlzLl9jaGlsZDtcbiAgICAgICAgLy8gUmV1c2UgYSBnZW5lcmF0ZWQgY2hpbGQgbGVmdCBvdmVyIGZyb20gYSBwcmV2aW91cyBpbnN0YW5jZSAoZS5nLiBhZnRlciB1bmRvKS5cbiAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5ub2RlLmNoaWxkcmVuLmZpbmQoKG4pID0+IG4ubmFtZSA9PT0gJ19fU3BsaW5lRXh0cnVkZU1lc2gnICYmIChuIGFzIGFueSkuX29iakZsYWdzICYgQ0NPYmplY3QuRmxhZ3MuRG9udFNhdmUpIHx8IG51bGw7XG4gICAgICAgIGlmICghY2hpbGQpIHtcbiAgICAgICAgICAgIGNoaWxkID0gbmV3IE5vZGUoJ19fU3BsaW5lRXh0cnVkZU1lc2gnKTtcbiAgICAgICAgICAgIChjaGlsZCBhcyBhbnkpLl9vYmpGbGFncyB8PSBHRU5FUkFURURfRkxBR1M7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGQubGF5ZXIgPSB0aGlzLm5vZGUubGF5ZXI7XG4gICAgICAgIHRoaXMuX2NoaWxkID0gY2hpbGQ7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUNvbGxpZGVyKGNoaWxkOiBOb2RlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IENvbGxpZGVyQ2xhc3MgPSBqcy5nZXRDbGFzc0J5TmFtZSgnY2MuTWVzaENvbGxpZGVyJykgYXMgYW55O1xuICAgICAgICBpZiAoIUNvbGxpZGVyQ2xhc3MpIHJldHVybjtcbiAgICAgICAgbGV0IGNvbGxpZGVyID0gY2hpbGQuZ2V0Q29tcG9uZW50KENvbGxpZGVyQ2xhc3MpIGFzIGFueTtcbiAgICAgICAgaWYgKCF0aGlzLmdlbmVyYXRlQ29sbGlkZXIgfHwgIXRoaXMuX21lc2gpIHtcbiAgICAgICAgICAgIGlmIChjb2xsaWRlcikgY29sbGlkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29sbGlkZXIpIGNvbGxpZGVyID0gY2hpbGQuYWRkQ29tcG9uZW50KENvbGxpZGVyQ2xhc3MpO1xuICAgICAgICBjb2xsaWRlci5tZXNoID0gdGhpcy5fbWVzaDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1ha2VQcm9maWxlKCk6IFByb2ZpbGUgfCBudWxsIHtcbiAgICAgICAgY29uc3QgcDogUHJvZmlsZSA9IHsgcG9pbnRzOiBbXSwgbm9ybWFsczogW10sIHU6IFtdLCBlZGdlczogW10sIGNsb3NlZDogdHJ1ZSwgcGVyaW1ldGVyOiAwIH07XG4gICAgICAgIHN3aXRjaCAodGhpcy5zaGFwZSkge1xuICAgICAgICAgICAgY2FzZSBFeHRydWRlU2hhcGUuQ2lyY2xlOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbiA9IE1hdGgubWF4KDMsIE1hdGgucm91bmQodGhpcy5zaWRlcykpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IG47IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gKGogLyBuKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgICAgICAgICBwLnBvaW50cy5wdXNoKE1hdGguY29zKGEpLCBNYXRoLnNpbihhKSk7XG4gICAgICAgICAgICAgICAgICAgIHAubm9ybWFscy5wdXNoKE1hdGguY29zKGEpLCBNYXRoLnNpbihhKSk7XG4gICAgICAgICAgICAgICAgICAgIHAudS5wdXNoKGogLyBuKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBuKSBwLmVkZ2VzLnB1c2goaiwgaiArIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwLnBlcmltZXRlciA9IE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBFeHRydWRlU2hhcGUuU3F1YXJlOiB7XG4gICAgICAgICAgICAgICAgLy8gQ291bnRlci1jbG9ja3dpc2UgY29ybmVycyBpbiB0aGUgKHJpZ2h0LCB1cCkgcGxhbmUsIHR3byB2ZXJ0aWNlcyBwZXIgc2lkZSBmb3IgZmxhdCBub3JtYWxzLlxuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBbWzEsIC0xXSwgWzEsIDFdLCBbLTEsIDFdLCBbLTEsIC0xXV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA0OyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYSA9IGNba107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSBjWyhrICsgMSkgJSA0XTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnggPSAoYVswXSArIGJbMF0pIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnkgPSAoYVsxXSArIGJbMV0pIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaSA9IHAucG9pbnRzLmxlbmd0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIHAucG9pbnRzLnB1c2goYVswXSwgYVsxXSwgYlswXSwgYlsxXSk7XG4gICAgICAgICAgICAgICAgICAgIHAubm9ybWFscy5wdXNoKG54LCBueSwgbngsIG55KTtcbiAgICAgICAgICAgICAgICAgICAgcC51LnB1c2goayAvIDQsIChrICsgMSkgLyA0KTtcbiAgICAgICAgICAgICAgICAgICAgcC5lZGdlcy5wdXNoKGksIGkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcC5wZXJpbWV0ZXIgPSA4O1xuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBFeHRydWRlU2hhcGUuUm9hZDpcbiAgICAgICAgICAgICAgICBwLnBvaW50cy5wdXNoKDEsIDAsIC0xLCAwKTtcbiAgICAgICAgICAgICAgICBwLm5vcm1hbHMucHVzaCgwLCAxLCAwLCAxKTtcbiAgICAgICAgICAgICAgICBwLnUucHVzaCgwLCAxKTtcbiAgICAgICAgICAgICAgICBwLmVkZ2VzLnB1c2goMCwgMSk7XG4gICAgICAgICAgICAgICAgcC5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwLnBlcmltZXRlciA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICBjYXNlIEV4dHJ1ZGVTaGFwZS5TcGxpbmU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3BsaW5lUHJvZmlsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3BsaW5lUHJvZmlsZSgpOiBQcm9maWxlIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHM6IFNwbGluZSB8IHVuZGVmaW5lZCA9IHRoaXMucHJvZmlsZT8uc3BsaW5lc1swXTtcbiAgICAgICAgaWYgKCFzIHx8IHMuY291bnQgPCAyKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgbiA9IE1hdGgubWF4KDIsIE1hdGgucm91bmQodGhpcy5wcm9maWxlU2VnbWVudHMpKTtcbiAgICAgICAgY29uc3QgcDogUHJvZmlsZSA9IHsgcG9pbnRzOiBbXSwgbm9ybWFsczogW10sIHU6IFtdLCBlZGdlczogW10sIGNsb3NlZDogcy5jbG9zZWQsIHBlcmltZXRlcjogMCB9O1xuICAgICAgICBjb25zdCBwdHM6IG51bWJlcltdID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IG47IGorKykge1xuICAgICAgICAgICAgcy5ldmFsdWF0ZVBvc2l0aW9uKGogLyBuLCBfcCk7XG4gICAgICAgICAgICBwdHMucHVzaChfcC54LCBfcC55KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTY2FsZSBzbyB0aGUgcHJvZmlsZSBmaXRzIGEgdW5pdCByYWRpdXMgKHRoZSByYWRpdXMgc2V0dGluZyBzaXplcyBpdCkuXG4gICAgICAgIGxldCBleHQgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IHYgb2YgcHRzKSBleHQgPSBNYXRoLm1heChleHQsIE1hdGguYWJzKHYpKTtcbiAgICAgICAgY29uc3QgayA9IGV4dCA+IDAgPyAxIC8gZXh0IDogMTtcbiAgICAgICAgbGV0IGRpc3QgPSAwO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBwdHNbaiAqIDJdICogaztcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwdHNbaiAqIDIgKyAxXSAqIGs7XG4gICAgICAgICAgICBpZiAoaiA+IDApIGRpc3QgKz0gTWF0aC5oeXBvdCh4IC0gcHRzW2ogKiAyIC0gMl0gKiBrLCB5IC0gcHRzW2ogKiAyIC0gMV0gKiBrKTtcbiAgICAgICAgICAgIHMuZXZhbHVhdGVEaXJlY3Rpb24oaiAvIG4sIF9mKTtcbiAgICAgICAgICAgIC8vIE5vcm1hbDogdGhlIGRpcmVjdGlvbiB0dXJuZWQgLTkwIGRlZ3JlZXMgKG91dHdhcmQgZm9yIGNvdW50ZXItY2xvY2t3aXNlIHByb2ZpbGVzKS5cbiAgICAgICAgICAgIGNvbnN0IGwgPSBNYXRoLmh5cG90KF9mLngsIF9mLnkpIHx8IDE7XG4gICAgICAgICAgICBwLnBvaW50cy5wdXNoKHgsIHkpO1xuICAgICAgICAgICAgcC5ub3JtYWxzLnB1c2goX2YueSAvIGwsIC1fZi54IC8gbCk7XG4gICAgICAgICAgICBwLnUucHVzaCgwKTtcbiAgICAgICAgICAgIGlmIChqIDwgbikgcC5lZGdlcy5wdXNoKGosIGogKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHAudVtqXSA9IChqIC8gbik7XG4gICAgICAgIHAucGVyaW1ldGVyID0gZGlzdDtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEdlb21ldHJ5KCk6IHsgcG9zaXRpb25zOiBudW1iZXJbXTsgbm9ybWFsczogbnVtYmVyW107IHV2czogbnVtYmVyW107IGluZGljZXM6IG51bWJlcltdOyBtaW5Qb3M6IFZlYzM7IG1heFBvczogVmVjMyB9IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKCFjIHx8ICFjLmlzVmFsaWQpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBwcm9maWxlID0gdGhpcy5tYWtlUHJvZmlsZSgpO1xuICAgICAgICBpZiAoIXByb2ZpbGUpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IG5vcm1hbHM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IHV2czogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgY29uc3QgaW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgY29uc3QgbWluID0gbmV3IFZlYzMoSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eSk7XG4gICAgICAgIGNvbnN0IG1heCA9IG5ldyBWZWMzKC1JbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHkpO1xuXG4gICAgICAgIC8vIENvbnRhaW5lciBzcGFjZSB0byB0aGlzIG5vZGUncyBzcGFjZS5cbiAgICAgICAgY29uc3Qgc2FtZU5vZGUgPSBjLm5vZGUgPT09IHRoaXMubm9kZTtcbiAgICAgICAgaWYgKCFzYW1lTm9kZSkge1xuICAgICAgICAgICAgTWF0NC5pbnZlcnQoX20sIHRoaXMubm9kZS53b3JsZE1hdHJpeCk7XG4gICAgICAgICAgICBNYXQ0Lm11bHRpcGx5KF9tLCBfbSwgYy5ub2RlLndvcmxkTWF0cml4KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByMCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIE1hdGgubWluKHRoaXMucmFuZ2UueCwgdGhpcy5yYW5nZS55KSkpO1xuICAgICAgICBjb25zdCByMSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIE1hdGgubWF4KHRoaXMucmFuZ2UueCwgdGhpcy5yYW5nZS55KSkpO1xuICAgICAgICBpZiAocjEgLSByMCA8PSAxZS02KSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gdGhpcy5yYWRpdXM7XG4gICAgICAgIGNvbnN0IHBjID0gcHJvZmlsZS5wb2ludHMubGVuZ3RoIC8gMjtcblxuICAgICAgICBjb25zdCBhZGRWZXJ0ZXggPSAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgbng6IG51bWJlciwgbnk6IG51bWJlciwgbno6IG51bWJlciwgdTogbnVtYmVyLCB2OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHgsIHksIHopO1xuICAgICAgICAgICAgbm9ybWFscy5wdXNoKHRoaXMuZmxpcE5vcm1hbHMgPyAtbnggOiBueCwgdGhpcy5mbGlwTm9ybWFscyA/IC1ueSA6IG55LCB0aGlzLmZsaXBOb3JtYWxzID8gLW56IDogbnopO1xuICAgICAgICAgICAgdXZzLnB1c2godSwgdik7XG4gICAgICAgICAgICBpZiAoeCA8IG1pbi54KSBtaW4ueCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA8IG1pbi55KSBtaW4ueSA9IHk7XG4gICAgICAgICAgICBpZiAoeiA8IG1pbi56KSBtaW4ueiA9IHo7XG4gICAgICAgICAgICBpZiAoeCA+IG1heC54KSBtYXgueCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA+IG1heC55KSBtYXgueSA9IHk7XG4gICAgICAgICAgICBpZiAoeiA+IG1heC56KSBtYXgueiA9IHo7XG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb25zLmxlbmd0aCAvIDMgLSAxO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB0cmkgPSAoYTogbnVtYmVyLCBiOiBudW1iZXIsIGNjOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZsaXBOb3JtYWxzKSBpbmRpY2VzLnB1c2goYSwgY2MsIGIpO1xuICAgICAgICAgICAgZWxzZSBpbmRpY2VzLnB1c2goYSwgYiwgY2MpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcyBvZiBjLnNwbGluZXMpIHtcbiAgICAgICAgICAgIGlmIChzLmNvdW50IDwgMikgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBzLmdldExlbmd0aCgpO1xuICAgICAgICAgICAgaWYgKGxlbmd0aCA8PSAxZS02KSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRzID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxlbmd0aCAqIChyMSAtIHIwKSAqIHRoaXMuc2VnbWVudHNQZXJVbml0KSk7XG4gICAgICAgICAgICBjb25zdCBsb29wID0gcy5jbG9zZWQgJiYgcjAgPD0gMCAmJiByMSA+PSAxO1xuICAgICAgICAgICAgY29uc3QgYmFzZSA9IHBvc2l0aW9ucy5sZW5ndGggLyAzO1xuICAgICAgICAgICAgY29uc3QgcmluZ0ZyYW1lczogeyBwOiBWZWMzOyBmOiBWZWMzOyB1OiBWZWMzOyByOiBWZWMzIH1bXSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgdGV4U2NhbGUgPSAxIC8gTWF0aC5tYXgoMWUtNiwgcmFkaXVzICogcHJvZmlsZS5wZXJpbWV0ZXIpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzZWdtZW50czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdCA9IHIwICsgKChyMSAtIHIwKSAqIGkpIC8gc2VnbWVudHM7XG4gICAgICAgICAgICAgICAgcy5ldmFsdWF0ZVBvc2l0aW9uKHQsIF9wKTtcbiAgICAgICAgICAgICAgICBzLmV2YWx1YXRlRGlyZWN0aW9uKHQsIF9mKTtcbiAgICAgICAgICAgICAgICBzLmV2YWx1YXRlVXBWZWN0b3IodCwgX3UpO1xuICAgICAgICAgICAgICAgIGlmICghc2FtZU5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KF9wLCBfcCwgX20pO1xuICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDROb3JtYWwoX2YsIF9mLCBfbSkubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NE5vcm1hbChfdSwgX3UsIF9tKS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgVmVjMy5jcm9zcyhfciwgX3UsIF9mKS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICBWZWMzLmNyb3NzKF91LCBfZiwgX3IpLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgICAgIHJpbmdGcmFtZXMucHVzaCh7IHA6IF9wLmNsb25lKCksIGY6IF9mLmNsb25lKCksIHU6IF91LmNsb25lKCksIHI6IF9yLmNsb25lKCkgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdiA9IChsZW5ndGggKiAodCAtIHIwKSkgKiB0ZXhTY2FsZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBjOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHggPSBwcm9maWxlLnBvaW50c1tqICogMl0gKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHB5ID0gcHJvZmlsZS5wb2ludHNbaiAqIDIgKyAxXSAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnggPSBwcm9maWxlLm5vcm1hbHNbaiAqIDJdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBueSA9IHByb2ZpbGUubm9ybWFsc1tqICogMiArIDFdO1xuICAgICAgICAgICAgICAgICAgICBhZGRWZXJ0ZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICBfcC54ICsgX3IueCAqIHB4ICsgX3UueCAqIHB5LCBfcC55ICsgX3IueSAqIHB4ICsgX3UueSAqIHB5LCBfcC56ICsgX3IueiAqIHB4ICsgX3UueiAqIHB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3IueCAqIG54ICsgX3UueCAqIG55LCBfci55ICogbnggKyBfdS55ICogbnksIF9yLnogKiBueCArIF91LnogKiBueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGUudVtqXSwgdixcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCByYSA9IGJhc2UgKyBpICogcGM7XG4gICAgICAgICAgICAgICAgY29uc3QgcmIgPSBiYXNlICsgKGkgKyAxKSAqIHBjO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGUgPSAwOyBlIDwgcHJvZmlsZS5lZGdlcy5sZW5ndGg7IGUgKz0gMikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gcHJvZmlsZS5lZGdlc1tlXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IHByb2ZpbGUuZWRnZXNbZSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0cmkocmEgKyBhLCByYSArIGIsIHJiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaShyYSArIGIsIHJiICsgYiwgcmIgKyBhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jYXBwZWQgJiYgcHJvZmlsZS5jbG9zZWQgJiYgIWxvb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcChyaW5nRnJhbWVzWzBdLCBwcm9maWxlLCByYWRpdXMsIHRydWUsIGFkZFZlcnRleCwgdHJpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcChyaW5nRnJhbWVzW3JpbmdGcmFtZXMubGVuZ3RoIC0gMV0sIHByb2ZpbGUsIHJhZGl1cywgZmFsc2UsIGFkZFZlcnRleCwgdHJpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWluZGljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHsgcG9zaXRpb25zLCBub3JtYWxzLCB1dnMsIGluZGljZXMsIG1pblBvczogbWluLCBtYXhQb3M6IG1heCB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2FwKFxuICAgICAgICBmcmFtZTogeyBwOiBWZWMzOyBmOiBWZWMzOyB1OiBWZWMzOyByOiBWZWMzIH0sXG4gICAgICAgIHByb2ZpbGU6IFByb2ZpbGUsXG4gICAgICAgIHJhZGl1czogbnVtYmVyLFxuICAgICAgICBzdGFydDogYm9vbGVhbixcbiAgICAgICAgYWRkVmVydGV4OiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgbng6IG51bWJlciwgbnk6IG51bWJlciwgbno6IG51bWJlciwgdTogbnVtYmVyLCB2OiBudW1iZXIpID0+IG51bWJlcixcbiAgICAgICAgdHJpOiAoYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlcikgPT4gdm9pZCxcbiAgICApOiB2b2lkIHtcbiAgICAgICAgY29uc3QgeyBwLCBmLCB1LCByIH0gPSBmcmFtZTtcbiAgICAgICAgY29uc3QgcyA9IHN0YXJ0ID8gLTEgOiAxO1xuICAgICAgICBjb25zdCBjZW50ZXIgPSBhZGRWZXJ0ZXgocC54LCBwLnksIHAueiwgZi54ICogcywgZi55ICogcywgZi56ICogcywgMC41LCAwLjUpO1xuICAgICAgICBjb25zdCBpZHM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IHBjID0gcHJvZmlsZS5wb2ludHMubGVuZ3RoIC8gMjtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYzsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBweCA9IHByb2ZpbGUucG9pbnRzW2ogKiAyXTtcbiAgICAgICAgICAgIGNvbnN0IHB5ID0gcHJvZmlsZS5wb2ludHNbaiAqIDIgKyAxXTtcbiAgICAgICAgICAgIGlkcy5wdXNoKGFkZFZlcnRleChcbiAgICAgICAgICAgICAgICBwLnggKyByLnggKiBweCAqIHJhZGl1cyArIHUueCAqIHB5ICogcmFkaXVzLFxuICAgICAgICAgICAgICAgIHAueSArIHIueSAqIHB4ICogcmFkaXVzICsgdS55ICogcHkgKiByYWRpdXMsXG4gICAgICAgICAgICAgICAgcC56ICsgci56ICogcHggKiByYWRpdXMgKyB1LnogKiBweSAqIHJhZGl1cyxcbiAgICAgICAgICAgICAgICBmLnggKiBzLCBmLnkgKiBzLCBmLnogKiBzLFxuICAgICAgICAgICAgICAgIHB4ICogMC41ICsgMC41LCBweSAqIDAuNSArIDAuNSxcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGUgPSAwOyBlIDwgcHJvZmlsZS5lZGdlcy5sZW5ndGg7IGUgKz0gMikge1xuICAgICAgICAgICAgY29uc3QgYSA9IGlkc1twcm9maWxlLmVkZ2VzW2VdXTtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBpZHNbcHJvZmlsZS5lZGdlc1tlICsgMV1dO1xuICAgICAgICAgICAgLy8gQ291bnRlci1jbG9ja3dpc2UgcHJvZmlsZSBlZGdlcyBmYWNlICtmb3J3YXJkOyB0aGUgc3RhcnQgY2FwIGZhY2VzIGJhY2suXG4gICAgICAgICAgICBpZiAoc3RhcnQpIHRyaShjZW50ZXIsIGIsIGEpO1xuICAgICAgICAgICAgZWxzZSB0cmkoY2VudGVyLCBhLCBiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb21wb25lbnQsIGNjZW51bSwgQ0NPYmplY3QsIGluc3RhbnRpYXRlLCBOb2RlLCBQcmVmYWIsIFF1YXQsIFZlYzIsIFZlYzMgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFRElUT1IgfSBmcm9tICdjYy9lbnYnO1xuaW1wb3J0IHsgU3BsaW5lQ29udGFpbmVyIH0gZnJvbSAnLi9TcGxpbmVDb250YWluZXInO1xuaW1wb3J0IHsgQWxpZ25BeGlzIH0gZnJvbSAnLi9TcGxpbmVBbmltYXRlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgZXhlY3V0ZUluRWRpdE1vZGUsIG1lbnUgfSA9IF9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIEluc3RhbnRpYXRlTWV0aG9kIHtcbiAgICAvKiogQSBzZXQgbnVtYmVyIG9mIGluc3RhbmNlcywgc3ByZWFkIGV2ZW5seS4gKi9cbiAgICBJbnN0YW5jZUNvdW50ID0gMCxcbiAgICAvKiogQSBkaXN0YW5jZSBhbG9uZyB0aGUgc3BsaW5lIGJldHdlZW4gaW5zdGFuY2VzLiAqL1xuICAgIFNwYWNpbmdEaXN0YW5jZSA9IDEsXG4gICAgLyoqIEEgc3RyYWlnaHQtbGluZSBkaXN0YW5jZSBiZXR3ZWVuIGluc3RhbmNlcy4gKi9cbiAgICBMaW5lYXJEaXN0YW5jZSA9IDIsXG59XG5cbmV4cG9ydCBlbnVtIEluc3RhbnRpYXRlU3BhY2Uge1xuICAgIC8qKiBPcmllbnQgaW5zdGFuY2VzIGFsb25nIHRoZSBzcGxpbmUuICovXG4gICAgU3BsaW5lID0gMCxcbiAgICAvKiogT3JpZW50IGluc3RhbmNlcyBsaWtlIHRoZSBzcGxpbmUgY29udGFpbmVyIG5vZGUuICovXG4gICAgU3BsaW5lT2JqZWN0ID0gMSxcbiAgICAvKiogT3JpZW50IGluc3RhbmNlcyB0byB0aGUgd29ybGQgYXhlcy4gKi9cbiAgICBXb3JsZCA9IDIsXG59XG5cbmV4cG9ydCBlbnVtIE9mZnNldFNwYWNlIHtcbiAgICBTcGxpbmUgPSAwLFxuICAgIFNwbGluZU9iamVjdCA9IDEsXG4gICAgV29ybGQgPSAyLFxuICAgIC8qKiBUaGUgaW5zdGFuY2UncyBvd24gYXhlcy4gKi9cbiAgICBPYmplY3QgPSAzLFxufVxuXG5jY2VudW0oSW5zdGFudGlhdGVNZXRob2QpO1xuY2NlbnVtKEluc3RhbnRpYXRlU3BhY2UpO1xuY2NlbnVtKE9mZnNldFNwYWNlKTtcblxuQGNjY2xhc3MoJ3NwbGluZXMuSW5zdGFudGlhYmxlSXRlbScpXG5leHBvcnQgY2xhc3MgSW5zdGFudGlhYmxlSXRlbSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogUHJlZmFiLCB0b29sdGlwOiAnUHJlZmFiIHRvIHBsYWNlLicgfSlcbiAgICBwcmVmYWI6IFByZWZhYiB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgcmFuZ2U6IFswLCAxMDAsIDFdLCBzbGlkZTogdHJ1ZSwgdG9vbHRpcDogJ1JlbGF0aXZlIGNoYW5jZSBvZiBwaWNraW5nIHRoaXMgcHJlZmFiICglKS4nIH0pXG4gICAgcHJvYmFiaWxpdHkgPSAxMDA7XG59XG5cbi8qKiBBIG1pbi9tYXggcmFuZ2UgcGVyIGF4aXM7IGF4ZXMgd2l0aG91dCBgcmFuZG9tYCB1c2UgbWluLiAqL1xuQGNjY2xhc3MoJ3NwbGluZXMuSW5zdGFudGlhdGVPZmZzZXQnKVxuZXhwb3J0IGNsYXNzIEluc3RhbnRpYXRlT2Zmc2V0IHtcbiAgICBAcHJvcGVydHlcbiAgICBtaW4gPSBuZXcgVmVjMygpO1xuXG4gICAgQHByb3BlcnR5XG4gICAgbWF4ID0gbmV3IFZlYzMoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdQaWNrIFggYXQgcmFuZG9tIGJldHdlZW4gbWluIGFuZCBtYXguJyB9KVxuICAgIHJhbmRvbVggPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdQaWNrIFkgYXQgcmFuZG9tIGJldHdlZW4gbWluIGFuZCBtYXguJyB9KVxuICAgIHJhbmRvbVkgPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdQaWNrIFogYXQgcmFuZG9tIGJldHdlZW4gbWluIGFuZCBtYXguJyB9KVxuICAgIHJhbmRvbVogPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IE9mZnNldFNwYWNlLCB0b29sdGlwOiAnQXhlcyB0aGUgb2Zmc2V0IGlzIGFwcGxpZWQgYWxvbmcuJyB9KVxuICAgIHNwYWNlID0gT2Zmc2V0U3BhY2UuU3BsaW5lO1xuXG4gICAgY29uc3RydWN0b3Ioc3BhY2UgPSBPZmZzZXRTcGFjZS5TcGxpbmUpIHtcbiAgICAgICAgdGhpcy5zcGFjZSA9IHNwYWNlO1xuICAgIH1cblxuICAgIGdldCBpc1plcm8oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbi5lcXVhbHMoVmVjMy5aRVJPKSAmJiB0aGlzLm1heC5lcXVhbHMoVmVjMy5aRVJPKTtcbiAgICB9XG5cbiAgICBuZXh0KHJhbmQ6ICgpID0+IG51bWJlciwgb3V0OiBWZWMzKTogVmVjMyB7XG4gICAgICAgIGNvbnN0IHBpY2sgPSAobG86IG51bWJlciwgaGk6IG51bWJlciwgcmFuZG9tOiBib29sZWFuKSA9PiAocmFuZG9tID8gbG8gKyAoaGkgLSBsbykgKiByYW5kKCkgOiBsbyk7XG4gICAgICAgIHJldHVybiBvdXQuc2V0KFxuICAgICAgICAgICAgcGljayh0aGlzLm1pbi54LCB0aGlzLm1heC54LCB0aGlzLnJhbmRvbVgpLFxuICAgICAgICAgICAgcGljayh0aGlzLm1pbi55LCB0aGlzLm1heC55LCB0aGlzLnJhbmRvbVkpLFxuICAgICAgICAgICAgcGljayh0aGlzLm1pbi56LCB0aGlzLm1heC56LCB0aGlzLnJhbmRvbVopLFxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgQVhFUyA9IFtcbiAgICBuZXcgVmVjMygxLCAwLCAwKSwgbmV3IFZlYzMoMCwgMSwgMCksIG5ldyBWZWMzKDAsIDAsIDEpLFxuICAgIG5ldyBWZWMzKC0xLCAwLCAwKSwgbmV3IFZlYzMoMCwgLTEsIDApLCBuZXcgVmVjMygwLCAwLCAtMSksXG5dO1xuXG5jb25zdCBHRU5FUkFURURfRkxBR1MgPSBDQ09iamVjdC5GbGFncy5Eb250U2F2ZSB8IENDT2JqZWN0LkZsYWdzLkhpZGVJbkhpZXJhcmNoeSB8IENDT2JqZWN0LkZsYWdzLkxvY2tlZEluRWRpdG9yO1xuY29uc3QgUk9PVF9OQU1FID0gJ19fU3BsaW5lSW5zdGFuY2VzJztcblxuLyoqIFNtYWxsIGRldGVybWluaXN0aWMgUFJORyAobXVsYmVycnkzMikuICovXG5mdW5jdGlvbiBybmcoc2VlZDogbnVtYmVyKTogKCkgPT4gbnVtYmVyIHtcbiAgICBsZXQgYSA9IHNlZWQgPj4+IDA7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgYSA9IChhICsgMHg2ZDJiNzlmNSkgPj4+IDA7XG4gICAgICAgIGxldCB0ID0gYTtcbiAgICAgICAgdCA9IE1hdGguaW11bCh0IF4gKHQgPj4+IDE1KSwgdCB8IDEpO1xuICAgICAgICB0IF49IHQgKyBNYXRoLmltdWwodCBeICh0ID4+PiA3KSwgdCB8IDYxKTtcbiAgICAgICAgcmV0dXJuICgodCBeICh0ID4+PiAxNCkpID4+PiAwKSAvIDQyOTQ5NjcyOTY7XG4gICAgfTtcbn1cblxuY29uc3QgX3AgPSBuZXcgVmVjMygpO1xuY29uc3QgX2YgPSBuZXcgVmVjMygpO1xuY29uc3QgX3UgPSBuZXcgVmVjMygpO1xuY29uc3QgX3IgPSBuZXcgVmVjMygpO1xuY29uc3QgX3EgPSBuZXcgUXVhdCgpO1xuY29uc3QgX3EyID0gbmV3IFF1YXQoKTtcbmNvbnN0IF9vZmYgPSBuZXcgVmVjMygpO1xuXG5mdW5jdGlvbiBsb29rUm90YXRpb24ob3V0OiBRdWF0LCBmb3J3YXJkOiBSZWFkb25seTxWZWMzPiwgdXA6IFJlYWRvbmx5PFZlYzM+KTogUXVhdCB7XG4gICAgcmV0dXJuIFF1YXQuZnJvbVZpZXdVcChvdXQsIFZlYzMubm9ybWFsaXplKG5ldyBWZWMzKCksIGZvcndhcmQpLCBWZWMzLm5vcm1hbGl6ZShuZXcgVmVjMygpLCB1cCkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsYWNlbWVudCB7XG4gICAgc3BsaW5lOiBudW1iZXI7XG4gICAgdDogbnVtYmVyO1xuICAgIGl0ZW06IG51bWJlcjtcbiAgICBwb3NpdGlvbjogVmVjMztcbiAgICByb3RhdGlvbjogUXVhdDtcbiAgICBzY2FsZTogVmVjMztcbn1cblxuLyoqXG4gKiBQbGFjZXMgcHJlZmFiIGluc3RhbmNlcyBhbG9uZyB0aGUgc3BsaW5lcyBvZiBhIGNvbnRhaW5lciAoVW5pdHknc1xuICogU3BsaW5lSW5zdGFudGlhdGUpLiBJbnN0YW5jZXMgYXJlIGdlbmVyYXRlZCAobm90IHNhdmVkIHdpdGggdGhlIHNjZW5lKSBhbmRcbiAqIHJlYnVpbHQgd2hlbiB0aGUgc3BsaW5lIG9yIGEgc2V0dGluZyBjaGFuZ2VzLiBVc2UgQmFrZSBpbiB0aGUgSW5zcGVjdG9yIHRvXG4gKiB0dXJuIHRoZW0gaW50byByZWd1bGFyIG5vZGVzLlxuICovXG5AY2NjbGFzcygnU3BsaW5lSW5zdGFudGlhdGUnKVxuQGV4ZWN1dGVJbkVkaXRNb2RlXG5AbWVudSgnU3BsaW5lcy9TcGxpbmVJbnN0YW50aWF0ZScpXG5leHBvcnQgY2xhc3MgU3BsaW5lSW5zdGFudGlhdGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNwbGluZUNvbnRhaW5lciwgdG9vbHRpcDogJ1RoZSBzcGxpbmVzIHRvIHBsYWNlIGluc3RhbmNlcyBhbG9uZyAoYWxsIHNwbGluZXMgb2YgdGhlIGNvbnRhaW5lcikuJyB9KVxuICAgIGNvbnRhaW5lcjogU3BsaW5lQ29udGFpbmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbSW5zdGFudGlhYmxlSXRlbV0sIHRvb2x0aXA6ICdQcmVmYWJzIHRvIHBsYWNlLCBwaWNrZWQgYXQgcmFuZG9tIGJ5IHByb2JhYmlsaXR5LicgfSlcbiAgICBpdGVtczogSW5zdGFudGlhYmxlSXRlbVtdID0gW25ldyBJbnN0YW50aWFibGVJdGVtKCldO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogSW5zdGFudGlhdGVNZXRob2QsIHRvb2x0aXA6ICdIb3cgaW5zdGFuY2VzIGFyZSBzcGFjZWQuJyB9KVxuICAgIG1ldGhvZCA9IEluc3RhbnRpYXRlTWV0aG9kLlNwYWNpbmdEaXN0YW5jZTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdOdW1iZXIgb2YgaW5zdGFuY2VzIHBlciBzcGxpbmUgKHJhbmRvbSBiZXR3ZWVuIHggYW5kIHkpLicsIHZpc2libGUodGhpczogU3BsaW5lSW5zdGFudGlhdGUpIHsgcmV0dXJuIHRoaXMubWV0aG9kID09PSBJbnN0YW50aWF0ZU1ldGhvZC5JbnN0YW5jZUNvdW50OyB9IH0pXG4gICAgY291bnQgPSBuZXcgVmVjMigxMCwgMTApO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ0Rpc3RhbmNlIGJldHdlZW4gaW5zdGFuY2VzIChyYW5kb20gYmV0d2VlbiB4IGFuZCB5KS4nLCB2aXNpYmxlKHRoaXM6IFNwbGluZUluc3RhbnRpYXRlKSB7IHJldHVybiB0aGlzLm1ldGhvZCAhPT0gSW5zdGFudGlhdGVNZXRob2QuSW5zdGFuY2VDb3VudDsgfSB9KVxuICAgIHNwYWNpbmcgPSBuZXcgVmVjMigxLCAxKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEluc3RhbnRpYXRlU3BhY2UsIHRvb2x0aXA6ICdBeGVzIHRoZSBpbnN0YW5jZXMgYXJlIG9yaWVudGVkIHRvLicgfSlcbiAgICBzcGFjZSA9IEluc3RhbnRpYXRlU3BhY2UuU3BsaW5lO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQWxpZ25BeGlzLCB0b29sdGlwOiAnSW5zdGFuY2UgYXhpcyB0aGF0IHBvaW50cyB1cC4nIH0pXG4gICAgdXBBeGlzID0gQWxpZ25BeGlzLllBeGlzO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQWxpZ25BeGlzLCB0b29sdGlwOiAnSW5zdGFuY2UgYXhpcyB0aGF0IHBvaW50cyBmb3J3YXJkIChhbG9uZyB0aGUgc3BsaW5lKS4nIH0pXG4gICAgZm9yd2FyZEF4aXMgPSBBbGlnbkF4aXMuWkF4aXM7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBJbnN0YW50aWF0ZU9mZnNldCwgdG9vbHRpcDogJ1Bvc2l0aW9uIG9mZnNldC4nIH0pXG4gICAgcG9zaXRpb25PZmZzZXQgPSBuZXcgSW5zdGFudGlhdGVPZmZzZXQoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEluc3RhbnRpYXRlT2Zmc2V0LCB0b29sdGlwOiAnUm90YXRpb24gb2Zmc2V0IChFdWxlciBhbmdsZXMsIGRlZ3JlZXMpLicgfSlcbiAgICByb3RhdGlvbk9mZnNldCA9IG5ldyBJbnN0YW50aWF0ZU9mZnNldCgpO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogSW5zdGFudGlhdGVPZmZzZXQsIHRvb2x0aXA6ICdTY2FsZSBvZmZzZXQgKGFkZGVkIHRvIHRoZSBwcmVmYWJcdTIwMTlzIHNjYWxlKS4nIH0pXG4gICAgc2NhbGVPZmZzZXQgPSBuZXcgSW5zdGFudGlhdGVPZmZzZXQoT2Zmc2V0U3BhY2UuT2JqZWN0KTtcblxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICdSZWJ1aWxkIHdoZW4gdGhlIHNwbGluZSBvciBhIHNldHRpbmcgY2hhbmdlcy4nIH0pXG4gICAgYXV0b1JlZnJlc2ggPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ1JhbmRvbSBzZWVkLicsIHN0ZXA6IDEgfSlcbiAgICBzZWVkID0gMDtcblxuICAgIHByaXZhdGUgX3Jvb3Q6IE5vZGUgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIF9zdGFtcCA9IE5hTjtcbiAgICBwcml2YXRlIF9pbnN0YW5jZXM6IE5vZGVbXSA9IFtdO1xuXG4gICAgLyoqIFRoZSBnZW5lcmF0ZWQgaW5zdGFuY2VzLiAqL1xuICAgIGdldCBpbnN0YW5jZXMoKTogcmVhZG9ubHkgTm9kZVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlcztcbiAgICB9XG5cbiAgICByZXNldEluRWRpdG9yKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29tcG9uZW50KFNwbGluZUNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZ2V0Q29tcG9uZW50KFNwbGluZUNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5zdGFuY2VzKCk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIGlmICh0aGlzLl9yb290Py5pc1ZhbGlkKSB0aGlzLl9yb290LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fcm9vdCA9IG51bGw7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuYXV0b1JlZnJlc2gpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuY29tcHV0ZVN0YW1wKCkgIT09IHRoaXMuX3N0YW1wKSB0aGlzLnVwZGF0ZUluc3RhbmNlcygpO1xuICAgIH1cblxuICAgIC8qKiBQaWNrcyBhIG5ldyByYW5kb20gc2VlZCBhbmQgcmVidWlsZHMuICovXG4gICAgcmFuZG9taXplU2VlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWVkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMWU2KTtcbiAgICAgICAgdGhpcy51cGRhdGVJbnN0YW5jZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbXB1dGVTdGFtcCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGxldCBoID0gYyAmJiBjLmlzVmFsaWQgPyBjLmNoYW5nZVN0YW1wIDogMDtcbiAgICAgICAgY29uc3QgbWl4ID0gKHY6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaCA9IE1hdGguaW11bChoIF4gTWF0aC5yb3VuZCh2ICogMWU0KSwgMTY3Nzc2MTkpO1xuICAgICAgICB9O1xuICAgICAgICBtaXgodGhpcy5tZXRob2QpO1xuICAgICAgICBtaXgodGhpcy5jb3VudC54KTtcbiAgICAgICAgbWl4KHRoaXMuY291bnQueSk7XG4gICAgICAgIG1peCh0aGlzLnNwYWNpbmcueCk7XG4gICAgICAgIG1peCh0aGlzLnNwYWNpbmcueSk7XG4gICAgICAgIG1peCh0aGlzLnNwYWNlKTtcbiAgICAgICAgbWl4KHRoaXMudXBBeGlzKTtcbiAgICAgICAgbWl4KHRoaXMuZm9yd2FyZEF4aXMpO1xuICAgICAgICBtaXgodGhpcy5zZWVkKTtcbiAgICAgICAgZm9yIChjb25zdCBvIG9mIFt0aGlzLnBvc2l0aW9uT2Zmc2V0LCB0aGlzLnJvdGF0aW9uT2Zmc2V0LCB0aGlzLnNjYWxlT2Zmc2V0XSkge1xuICAgICAgICAgICAgbWl4KG8ubWluLngpOyBtaXgoby5taW4ueSk7IG1peChvLm1pbi56KTtcbiAgICAgICAgICAgIG1peChvLm1heC54KTsgbWl4KG8ubWF4LnkpOyBtaXgoby5tYXgueik7XG4gICAgICAgICAgICBtaXgoKG8ucmFuZG9tWCA/IDEgOiAwKSB8IChvLnJhbmRvbVkgPyAyIDogMCkgfCAoby5yYW5kb21aID8gNCA6IDApKTtcbiAgICAgICAgICAgIG1peChvLnNwYWNlKTtcbiAgICAgICAgfVxuICAgICAgICBtaXgodGhpcy5pdGVtcy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGNvbnN0IGl0IG9mIHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIG1peChpdC5wcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGl0LnByZWZhYiA/IFN0cmluZygoaXQucHJlZmFiIGFzIGFueSkuX3V1aWQgfHwgaXQucHJlZmFiLm5hbWUgfHwgJ3ByZWZhYicpIDogJyc7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkLmxlbmd0aDsgaSsrKSBtaXgoaWQuY2hhckNvZGVBdChpKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgJiYgYy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICBjb25zdCBtID0gYy5ub2RlLndvcmxkTWF0cml4O1xuICAgICAgICAgICAgbWl4KG0ubTEyKTsgbWl4KG0ubTEzKTsgbWl4KG0ubTE0KTsgbWl4KG0ubTAwKTsgbWl4KG0ubTA1KTsgbWl4KG0ubTEwKTsgbWl4KG0ubTAxKTsgbWl4KG0ubTAyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaDtcbiAgICB9XG5cbiAgICAvKiogUmVtb3ZlcyB0aGUgZ2VuZXJhdGVkIGluc3RhbmNlcy4gKi9cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBuIG9mIHRoaXMuX2luc3RhbmNlcykgaWYgKG4uaXNWYWxpZCkgbi5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlcy5sZW5ndGggPSAwO1xuICAgICAgICBpZiAodGhpcy5fcm9vdD8uaXNWYWxpZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBuIG9mIFsuLi50aGlzLl9yb290LmNoaWxkcmVuXSkgbi5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVuc3VyZVJvb3QoKTogTm9kZSB7XG4gICAgICAgIGlmICh0aGlzLl9yb290ICYmIHRoaXMuX3Jvb3QuaXNWYWxpZCAmJiB0aGlzLl9yb290LnBhcmVudCA9PT0gdGhpcy5ub2RlKSByZXR1cm4gdGhpcy5fcm9vdDtcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLm5vZGUuY2hpbGRyZW4uZmluZCgobikgPT4gbi5uYW1lID09PSBST09UX05BTUUgJiYgKG4gYXMgYW55KS5fb2JqRmxhZ3MgJiBDQ09iamVjdC5GbGFncy5Eb250U2F2ZSkgfHwgbnVsbDtcbiAgICAgICAgaWYgKCFyb290KSB7XG4gICAgICAgICAgICByb290ID0gbmV3IE5vZGUoUk9PVF9OQU1FKTtcbiAgICAgICAgICAgIChyb290IGFzIGFueSkuX29iakZsYWdzIHw9IEdFTkVSQVRFRF9GTEFHUztcbiAgICAgICAgICAgIHJvb3QucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jvb3QgPSByb290O1xuICAgICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG5cbiAgICAvKiogV2hlcmUgaW5zdGFuY2VzIGdvOiBwb3NpdGlvbnMsIHJvdGF0aW9ucyBhbmQgc2NhbGVzICh3b3JsZCBzcGFjZSkgYW5kIHdoaWNoIGl0ZW0uICovXG4gICAgY29tcHV0ZVBsYWNlbWVudHMoKTogUGxhY2VtZW50W10ge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGNvbnN0IHJlczogUGxhY2VtZW50W10gPSBbXTtcbiAgICAgICAgaWYgKCFjIHx8ICFjLmlzVmFsaWQpIHJldHVybiByZXM7XG4gICAgICAgIGNvbnN0IHdlaWdodHMgPSB0aGlzLml0ZW1zLm1hcCgoaXQpID0+IChpdC5wcmVmYWIgPyBNYXRoLm1heCgwLCBpdC5wcm9iYWJpbGl0eSkgOiAwKSk7XG4gICAgICAgIGNvbnN0IHRvdGFsID0gd2VpZ2h0cy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiAgICAgICAgaWYgKHRvdGFsIDw9IDApIHJldHVybiByZXM7XG4gICAgICAgIGNvbnN0IHJhbmQgPSBybmcodGhpcy5zZWVkICogNzkxOSArIDEpO1xuICAgICAgICBjb25zdCBwaWNrSXRlbSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCByID0gcmFuZCgpICogdG90YWw7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlaWdodHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByIC09IHdlaWdodHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHIgPCAwICYmIHdlaWdodHNbaV0gPiAwKSByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB3ZWlnaHRzLmZpbmRJbmRleCgodykgPT4gdyA+IDApO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmd2RBeGlzID0gQVhFU1t0aGlzLmZvcndhcmRBeGlzXSA/PyBBWEVTWzJdO1xuICAgICAgICBsZXQgdXBBeGlzID0gQVhFU1t0aGlzLnVwQXhpc10gPz8gQVhFU1sxXTtcbiAgICAgICAgaWYgKE1hdGguYWJzKFZlYzMuZG90KGZ3ZEF4aXMsIHVwQXhpcykpID4gMC45OSkgdXBBeGlzID0gTWF0aC5hYnMoZndkQXhpcy55KSA+IDAuOTkgPyBBWEVTWzJdIDogQVhFU1sxXTtcbiAgICAgICAgY29uc3QgcmVtYXAgPSBRdWF0LmludmVydChuZXcgUXVhdCgpLCBsb29rUm90YXRpb24obmV3IFF1YXQoKSwgZndkQXhpcywgdXBBeGlzKSk7XG5cbiAgICAgICAgZm9yIChsZXQgc2kgPSAwOyBzaSA8IGMuc3BsaW5lcy5sZW5ndGg7IHNpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBjLnNwbGluZXNbc2ldO1xuICAgICAgICAgICAgaWYgKHMuY291bnQgPCAyKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGMuY2FsY3VsYXRlTGVuZ3RoKHNpKTtcbiAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMWUtNikgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCB0cyA9IHRoaXMuZGlzdHJpYnV0ZVQoYywgc2ksIGxlbmd0aCwgcy5jbG9zZWQsIHJhbmQpO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0IG9mIHRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHBpY2tJdGVtKCk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gPCAwKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjLmV2YWx1YXRlUG9zaXRpb24odCwgc2ksIF9wKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnN0YW50aWF0ZVNwYWNlLlNwbGluZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuZXZhbHVhdGVEaXJlY3Rpb24odCwgc2ksIF9mKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuZXZhbHVhdGVVcFZlY3Rvcih0LCBzaSwgX3UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSW5zdGFudGlhdGVTcGFjZS5TcGxpbmVPYmplY3Q6XG4gICAgICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX2YsIFZlYzMuVU5JVF9aLCBjLm5vZGUud29ybGRSb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX3UsIFZlYzMuVU5JVF9ZLCBjLm5vZGUud29ybGRSb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9mLnNldCgwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF91LnNldCgwLCAxLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZSA9IGxvb2tSb3RhdGlvbihuZXcgUXVhdCgpLCBfZiwgX3UpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdGF0aW9uID0gUXVhdC5tdWx0aXBseShuZXcgUXVhdCgpLCBmcmFtZSwgcmVtYXApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gX3AuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmVmYWJOb2RlID0gdGhpcy5pdGVtc1tpdGVtXS5wcmVmYWIhLmRhdGEgYXMgTm9kZTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IHByZWZhYk5vZGUgPyBwcmVmYWJOb2RlLnNjYWxlLmNsb25lKCkgOiBuZXcgVmVjMygxLCAxLCAxKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wb3NpdGlvbk9mZnNldC5pc1plcm8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbk9mZnNldC5uZXh0KHJhbmQsIF9vZmYpO1xuICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX29mZiwgX29mZiwgdGhpcy5vZmZzZXRSb3RhdGlvbih0aGlzLnBvc2l0aW9uT2Zmc2V0LnNwYWNlLCBmcmFtZSwgYywgcm90YXRpb24pKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24uYWRkKF9vZmYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucm90YXRpb25PZmZzZXQuaXNaZXJvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm90YXRpb25PZmZzZXQubmV4dChyYW5kLCBfb2ZmKTtcbiAgICAgICAgICAgICAgICAgICAgUXVhdC5mcm9tRXVsZXIoX3EyLCBfb2ZmLngsIF9vZmYueSwgX29mZi56KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3AgPSB0aGlzLnJvdGF0aW9uT2Zmc2V0LnNwYWNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3AgPT09IE9mZnNldFNwYWNlLk9iamVjdCkgUXVhdC5tdWx0aXBseShyb3RhdGlvbiwgcm90YXRpb24sIF9xMik7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUm90YXRlIGFib3V0IHRoZSBjaG9zZW4gYXhlczogUicgPSBTICogXHUwMzk0ICogU1x1MjA3Qlx1MDBCOSAqIFJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFMgPSB0aGlzLm9mZnNldFJvdGF0aW9uKHNwLCBmcmFtZSwgYywgcm90YXRpb24pLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBRdWF0Lm11bHRpcGx5KF9xLCBTLCBfcTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgUXVhdC5tdWx0aXBseShfcSwgX3EsIFF1YXQuaW52ZXJ0KG5ldyBRdWF0KCksIFMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFF1YXQubXVsdGlwbHkocm90YXRpb24sIF9xLCByb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNjYWxlT2Zmc2V0LmlzWmVybykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYWxlT2Zmc2V0Lm5leHQocmFuZCwgX29mZik7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlLmFkZChfb2ZmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goeyBzcGxpbmU6IHNpLCB0LCBpdGVtLCBwb3NpdGlvbiwgcm90YXRpb24sIHNjYWxlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvZmZzZXRSb3RhdGlvbihzcGFjZTogT2Zmc2V0U3BhY2UsIHNwbGluZUZyYW1lOiBRdWF0LCBjOiBTcGxpbmVDb250YWluZXIsIGluc3RhbmNlUm90YXRpb246IFF1YXQpOiBRdWF0IHtcbiAgICAgICAgc3dpdGNoIChzcGFjZSkge1xuICAgICAgICAgICAgY2FzZSBPZmZzZXRTcGFjZS5TcGxpbmU6IHJldHVybiBzcGxpbmVGcmFtZTtcbiAgICAgICAgICAgIGNhc2UgT2Zmc2V0U3BhY2UuU3BsaW5lT2JqZWN0OiByZXR1cm4gYy5ub2RlLndvcmxkUm90YXRpb24gYXMgUXVhdDtcbiAgICAgICAgICAgIGNhc2UgT2Zmc2V0U3BhY2UuT2JqZWN0OiByZXR1cm4gaW5zdGFuY2VSb3RhdGlvbjtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBRdWF0LklERU5USVRZIGFzIFF1YXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTm9ybWFsaXplZCB0IHZhbHVlcyBvZiB0aGUgaW5zdGFuY2VzIG9uIG9uZSBzcGxpbmUuICovXG4gICAgcHJpdmF0ZSBkaXN0cmlidXRlVChjOiBTcGxpbmVDb250YWluZXIsIHNpOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBjbG9zZWQ6IGJvb2xlYW4sIHJhbmQ6ICgpID0+IG51bWJlcik6IG51bWJlcltdIHtcbiAgICAgICAgY29uc3QgdHM6IG51bWJlcltdID0gW107XG4gICAgICAgIGNvbnN0IGxvID0gKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBNYXRoLm1pbihhLCBiKTtcbiAgICAgICAgY29uc3QgaGkgPSAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IE1hdGgubWF4KGEsIGIpO1xuICAgICAgICBpZiAodGhpcy5tZXRob2QgPT09IEluc3RhbnRpYXRlTWV0aG9kLkluc3RhbmNlQ291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSBNYXRoLm1heCgwLCBNYXRoLnJvdW5kKGxvKHRoaXMuY291bnQueCwgdGhpcy5jb3VudC55KSkpO1xuICAgICAgICAgICAgY29uc3QgYiA9IE1hdGgubWF4KDAsIE1hdGgucm91bmQoaGkodGhpcy5jb3VudC54LCB0aGlzLmNvdW50LnkpKSk7XG4gICAgICAgICAgICBjb25zdCBuID0gYSArIE1hdGguZmxvb3IocmFuZCgpICogKGIgLSBhICsgMSkpO1xuICAgICAgICAgICAgaWYgKG4gPT09IDEpIHRzLnB1c2goMCk7XG4gICAgICAgICAgICBlbHNlIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB0cy5wdXNoKGNsb3NlZCA/IGkgLyBuIDogaSAvIChuIC0gMSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1pblMgPSBNYXRoLm1heCgxZS0zLCBsbyh0aGlzLnNwYWNpbmcueCwgdGhpcy5zcGFjaW5nLnkpKTtcbiAgICAgICAgY29uc3QgbWF4UyA9IE1hdGgubWF4KG1pblMsIGhpKHRoaXMuc3BhY2luZy54LCB0aGlzLnNwYWNpbmcueSkpO1xuICAgICAgICBjb25zdCBuZXh0ID0gKCkgPT4gbWluUyArIChtYXhTIC0gbWluUykgKiByYW5kKCk7XG4gICAgICAgIGNvbnN0IE1BWCA9IDEwMDAwO1xuICAgICAgICBpZiAodGhpcy5tZXRob2QgPT09IEluc3RhbnRpYXRlTWV0aG9kLlNwYWNpbmdEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IGQgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGQgPD0gbGVuZ3RoICsgMWUtNiAmJiB0cy5sZW5ndGggPCBNQVgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VkICYmIGQgPj0gbGVuZ3RoIC0gMWUtNiAmJiB0cy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgIHRzLnB1c2goTWF0aC5taW4oMSwgZCAvIGxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIGQgKz0gbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRzO1xuICAgICAgICB9XG4gICAgICAgIC8vIExpbmVhciBkaXN0YW5jZTogd2FsayB0aGUgc3BsaW5lIHVudGlsIHRoZSBzdHJhaWdodC1saW5lIGRpc3RhbmNlIHJlYWNoZXMgdGhlIHNwYWNpbmcuXG4gICAgICAgIGNvbnN0IHN0ZXBzID0gTWF0aC5tYXgoNjQsIE1hdGguY2VpbChsZW5ndGggLyBtaW5TKSAqIDgpO1xuICAgICAgICBsZXQgdCA9IDA7XG4gICAgICAgIHRzLnB1c2goMCk7XG4gICAgICAgIGNvbnN0IGZyb20gPSBjLmV2YWx1YXRlUG9zaXRpb24oMCwgc2ksIG5ldyBWZWMzKCkpO1xuICAgICAgICBsZXQgd2FudCA9IG5leHQoKTtcbiAgICAgICAgY29uc3QgcCA9IG5ldyBWZWMzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHN0ZXBzICYmIHRzLmxlbmd0aCA8IE1BWDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0aSA9IGkgLyBzdGVwcztcbiAgICAgICAgICAgIGMuZXZhbHVhdGVQb3NpdGlvbih0aSwgc2ksIHApO1xuICAgICAgICAgICAgaWYgKFZlYzMuZGlzdGFuY2UocCwgZnJvbSkgPj0gd2FudCAtIDFlLTYpIHtcbiAgICAgICAgICAgICAgICAvLyBSZWZpbmUgYmV0d2VlbiB0aGUgcHJldmlvdXMgc3RlcCBhbmQgdGhpcyBvbmUuXG4gICAgICAgICAgICAgICAgbGV0IGEgPSB0O1xuICAgICAgICAgICAgICAgIGxldCBiID0gdGk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMjsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG0gPSAoYSArIGIpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgYy5ldmFsdWF0ZVBvc2l0aW9uKG0sIHNpLCBwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZlYzMuZGlzdGFuY2UocCwgZnJvbSkgPj0gd2FudCAtIDFlLTYpIGIgPSBtO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGEgPSBtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VkICYmIGIgPj0gMSAtIDFlLTYpIGJyZWFrO1xuICAgICAgICAgICAgICAgIHRzLnB1c2goYik7XG4gICAgICAgICAgICAgICAgYy5ldmFsdWF0ZVBvc2l0aW9uKGIsIHNpLCBmcm9tKTtcbiAgICAgICAgICAgICAgICB3YW50ID0gbmV4dCgpO1xuICAgICAgICAgICAgICAgIHQgPSBiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ID0gdGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRzO1xuICAgIH1cblxuICAgIC8qKiBSZWJ1aWxkcyB0aGUgaW5zdGFuY2VzIG5vdy4gKi9cbiAgICB1cGRhdGVJbnN0YW5jZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N0YW1wID0gdGhpcy5jb21wdXRlU3RhbXAoKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG4gICAgICAgIGNvbnN0IHBsYWNlbWVudHMgPSB0aGlzLmNvbXB1dGVQbGFjZW1lbnRzKCk7XG4gICAgICAgIGlmICghcGxhY2VtZW50cy5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuZW5zdXJlUm9vdCgpO1xuICAgICAgICByb290LmxheWVyID0gdGhpcy5ub2RlLmxheWVyO1xuICAgICAgICBmb3IgKGNvbnN0IHBsIG9mIHBsYWNlbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZWZhYiA9IHRoaXMuaXRlbXNbcGwuaXRlbV0ucHJlZmFiO1xuICAgICAgICAgICAgaWYgKCFwcmVmYWIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgbiA9IGluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgICAgICAobiBhcyBhbnkpLl9vYmpGbGFncyB8PSBHRU5FUkFURURfRkxBR1M7XG4gICAgICAgICAgICBuLnBhcmVudCA9IHJvb3Q7XG4gICAgICAgICAgICBuLnNldFdvcmxkUG9zaXRpb24ocGwucG9zaXRpb24pO1xuICAgICAgICAgICAgbi5zZXRXb3JsZFJvdGF0aW9uKHBsLnJvdGF0aW9uKTtcbiAgICAgICAgICAgIG4uc2V0U2NhbGUocGwuc2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VzLnB1c2gobik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRWRpdG9yIGhlbHBlcjogcGxhY2VtZW50cyB3aXRoIHByZWZhYiB1dWlkcywgZm9yIGJha2luZyBpbnRvIHJlZ3VsYXIgbm9kZXMuICovXG4gICAgX2Jha2VJbmZvKCk6IHsgcHJlZmFiOiBzdHJpbmc7IHBvc2l0aW9uOiBudW1iZXJbXTsgcm90YXRpb246IG51bWJlcltdOyBzY2FsZTogbnVtYmVyW10gfVtdIHtcbiAgICAgICAgaWYgKCFFRElUT1IpIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcHV0ZVBsYWNlbWVudHMoKVxuICAgICAgICAgICAgLmZpbHRlcigocCkgPT4gdGhpcy5pdGVtc1twLml0ZW1dLnByZWZhYilcbiAgICAgICAgICAgIC5tYXAoKHApID0+ICh7XG4gICAgICAgICAgICAgICAgcHJlZmFiOiAodGhpcy5pdGVtc1twLml0ZW1dLnByZWZhYiBhcyBhbnkpLl91dWlkIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogW3AucG9zaXRpb24ueCwgcC5wb3NpdGlvbi55LCBwLnBvc2l0aW9uLnpdLFxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBbcC5yb3RhdGlvbi54LCBwLnJvdGF0aW9uLnksIHAucm90YXRpb24ueiwgcC5yb3RhdGlvbi53XSxcbiAgICAgICAgICAgICAgICBzY2FsZTogW3Auc2NhbGUueCwgcC5zY2FsZS55LCBwLnNjYWxlLnpdLFxuICAgICAgICAgICAgfSkpO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBWZWMzIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgU3BsaW5lLCBzcGxpbmVGYWN0b3J5LCBQYXRoSW5kZXhVbml0IH0gZnJvbSAnLi9TcGxpbmUnO1xuaW1wb3J0IHsgYnVpbGRTaGFwZSwgU2hhcGVPcHRpb25zIH0gZnJvbSAnLi4vY29yZS9zcGxpbmUtY29yZSc7XG5cbmV4cG9ydCB0eXBlIFNwbGluZVNoYXBlID0gJ2xpbmUnIHwgJ3NxdWFyZScgfCAncm91bmRlZC1zcXVhcmUnIHwgJ2NpcmNsZScgfCAncG9seWdvbicgfCAnc3RhcicgfCAnaGVsaXgnO1xuXG4vKipcbiAqIFN0YXRpYyBoZWxwZXJzIGluIHRoZSBzdHlsZSBvZiBVbml0eSdzIFNwbGluZVV0aWxpdHkgLyBTcGxpbmVGYWN0b3J5LlxuICogQWxsIHBvc2l0aW9ucyBhcmUgaW4gdGhlIHNwbGluZSdzIGxvY2FsIHNwYWNlOyB0IGlzIGEgbm9ybWFsaXplZCBkaXN0YW5jZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFNwbGluZVV0aWxpdHkge1xuICAgIHN0YXRpYyBldmFsdWF0ZVBvc2l0aW9uKHNwbGluZTogU3BsaW5lLCB0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIHNwbGluZS5ldmFsdWF0ZVBvc2l0aW9uKHQsIG91dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGV2YWx1YXRlVGFuZ2VudChzcGxpbmU6IFNwbGluZSwgdDogbnVtYmVyLCBvdXQgPSBuZXcgVmVjMygpKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBzcGxpbmUuZXZhbHVhdGVUYW5nZW50KHQsIG91dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGV2YWx1YXRlRGlyZWN0aW9uKHNwbGluZTogU3BsaW5lLCB0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIHNwbGluZS5ldmFsdWF0ZURpcmVjdGlvbih0LCBvdXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBldmFsdWF0ZVVwVmVjdG9yKHNwbGluZTogU3BsaW5lLCB0OiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIHNwbGluZS5ldmFsdWF0ZVVwVmVjdG9yKHQsIG91dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNhbGN1bGF0ZUxlbmd0aChzcGxpbmU6IFNwbGluZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzcGxpbmUuZ2V0TGVuZ3RoKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5lYXJlc3RQb2ludChzcGxpbmU6IFNwbGluZSwgcG9pbnQ6IFJlYWRvbmx5PFZlYzM+KTogeyB0OiBudW1iZXI7IHBvc2l0aW9uOiBWZWMzOyBkaXN0YW5jZTogbnVtYmVyIH0ge1xuICAgICAgICByZXR1cm4gc3BsaW5lLmdldE5lYXJlc3RQb2ludChwb2ludCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBwb2ludCBgZGlzdGFuY2VgIGFsb25nIHRoZSBzcGxpbmUgZnJvbSBgZnJvbVRgIChuZWdhdGl2ZSBnb2VzIGJhY2spLiAqL1xuICAgIHN0YXRpYyBnZXRQb2ludEF0RGlzdGFuY2Uoc3BsaW5lOiBTcGxpbmUsIGZyb21UOiBudW1iZXIsIGRpc3RhbmNlOiBudW1iZXIsIG91dCA9IG5ldyBWZWMzKCkpOiB7IHQ6IG51bWJlcjsgcG9zaXRpb246IFZlYzMgfSB7XG4gICAgICAgIGNvbnN0IHQgPSBzcGxpbmUuZ2V0VEF0RGlzdGFuY2UoZnJvbVQsIGRpc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIHsgdCwgcG9zaXRpb246IHNwbGluZS5ldmFsdWF0ZVBvc2l0aW9uKHQsIG91dCkgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udmVydEluZGV4VW5pdChzcGxpbmU6IFNwbGluZSwgdmFsdWU6IG51bWJlciwgZnJvbTogUGF0aEluZGV4VW5pdCwgdG86IFBhdGhJbmRleFVuaXQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc3BsaW5lLmNvbnZlcnRJbmRleFVuaXQodmFsdWUsIGZyb20sIHRvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIG5ldyBzcGxpbmUgaW4gYSB0ZW1wbGF0ZSBzaGFwZSAobGlrZSBVbml0eSdzIFNwbGluZUZhY3RvcnkpLlxuICAgICAqIGBzaXplYCBpcyB0aGUgaGFsZiB3aWR0aCAvIHJhZGl1czsgYHBsYW5lMkRgIGxheXMgaXQgaW4gWFkgaW5zdGVhZCBvZiBYWi5cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlU2hhcGUoc2hhcGU6IFNwbGluZVNoYXBlLCBvcHRpb25zOiBQYXJ0aWFsPFNoYXBlT3B0aW9ucz4gPSB7fSk6IFNwbGluZSB7XG4gICAgICAgIGNvbnN0IHMgPSBuZXcgU3BsaW5lKCk7XG4gICAgICAgIGJ1aWxkU2hhcGUocywgc2hhcGUsIHsgc2l6ZTogMSwgLi4ub3B0aW9ucyB9LCBzcGxpbmVGYWN0b3J5KTtcbiAgICAgICAgcy5tYXJrRGlydHkoKTtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgLyoqIEZpbGxzIGFuIGV4aXN0aW5nIHNwbGluZSB3aXRoIGEgdGVtcGxhdGUgc2hhcGUuICovXG4gICAgc3RhdGljIHNldFNoYXBlKHNwbGluZTogU3BsaW5lLCBzaGFwZTogU3BsaW5lU2hhcGUsIG9wdGlvbnM6IFBhcnRpYWw8U2hhcGVPcHRpb25zPiA9IHt9KTogdm9pZCB7XG4gICAgICAgIGJ1aWxkU2hhcGUoc3BsaW5lLCBzaGFwZSwgeyBzaXplOiAxLCAuLi5vcHRpb25zIH0sIHNwbGluZUZhY3RvcnkpO1xuICAgICAgICBzcGxpbmUubWFya0RpcnR5KCk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBQYXRoSW5kZXhVbml0IH07XG4iLCAiLyoqXG4gKiBBY2Nlc3MgdG8gdGhlIGVuZ2luZSBhbmQgdGhlIGVkaXRvcidzIHNjZW5lLXByb2Nlc3MgZ2xvYmFscy5cbiAqXG4gKiBUaGUgcnVudGltZSBjbGFzc2VzIChTcGxpbmVDb250YWluZXIsIEJlemllcktub3QuLi4pIGFyZSBjb21waWxlZCBieSB0aGVcbiAqIHByb2plY3QsIG5vdCBidW5kbGVkIGhlcmU6IHRoZXkgYXJlIGxvb2tlZCB1cCBieSBjbGFzcyBuYW1lLiBUaGUgc3BsaW5lXG4gKiBjb3JlIChhc3NldHMvY29yZSkgaXMgcGxhaW4gZnVuY3Rpb25zIGFuZCBpcyBidW5kbGVkIGludG8gdGhpcyBzY3JpcHQuXG4gKi9cbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCB0eXBlIHsgRmFjdG9yeSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL3NwbGluZS1jb3JlJztcblxubW9kdWxlLnBhdGhzLnB1c2goam9pbihFZGl0b3IuQXBwLnBhdGgsICdub2RlX21vZHVsZXMnKSk7XG5cbmV4cG9ydCB0eXBlIENDID0gdHlwZW9mIGltcG9ydCgnY2MnKTtcblxubGV0IGNjTW9kdWxlOiBDQyB8IG51bGwgPSBudWxsO1xuZXhwb3J0IGZ1bmN0aW9uIGNjKCk6IENDIHtcbiAgICBpZiAoIWNjTW9kdWxlKSBjY01vZHVsZSA9IHJlcXVpcmUoJ2NjJykgYXMgQ0M7XG4gICAgcmV0dXJuIGNjTW9kdWxlO1xufVxuXG5leHBvcnQgY29uc3QgY2NlID0gKCk6IGFueSA9PiAoZ2xvYmFsVGhpcyBhcyBhbnkpLmNjZSB8fCB7fTtcbmV4cG9ydCBjb25zdCBlZGl0b3JFeHRlbmRzID0gKCk6IGFueSA9PiAoZ2xvYmFsVGhpcyBhcyBhbnkpLkVkaXRvckV4dGVuZHM7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc0J5TmFtZShuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjYygpLmpzLmdldENsYXNzQnlOYW1lKG5hbWUpIHx8IG51bGw7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNvbnRhaW5lckNsYXNzID0gKCkgPT4gY2xhc3NCeU5hbWUoJ1NwbGluZUNvbnRhaW5lcicpO1xuXG5leHBvcnQgY29uc3QgZmFjdG9yeTogRmFjdG9yeSA9IHtcbiAgICBrbm90OiAoKSA9PiBuZXcgKGNsYXNzQnlOYW1lKCdzcGxpbmVzLkJlemllcktub3QnKSkoKSxcbiAgICBzcGxpbmU6ICgpID0+IG5ldyAoY2xhc3NCeU5hbWUoJ3NwbGluZXMuU3BsaW5lJykpKCksXG4gICAgbGluazogKCkgPT4gbmV3IChjbGFzc0J5TmFtZSgnc3BsaW5lcy5Lbm90TGluaycpKSgpLFxufTtcblxuLyoqIFJ1bnRpbWUgY2xhc3NlcyBsb2FkZWQgKHRoZSBwcm9qZWN0IGNvbXBpbGVkIHRoZSBtb3VudGVkIHNjcmlwdHMpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bnRpbWVSZWFkeSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFjb250YWluZXJDbGFzcygpICYmICEhY2xhc3NCeU5hbWUoJ3NwbGluZXMuQmV6aWVyS25vdCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3VycmVudFNjZW5lKCk6IGFueSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNjKCkuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZE5vZGUodXVpZDogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoIXV1aWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGV4dCA9IGVkaXRvckV4dGVuZHMoKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBuID0gZXh0Py5Ob2RlPy5nZXROb2RlPy4odXVpZCk7XG4gICAgICAgIGlmIChuKSByZXR1cm4gbjtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gZmFsbCB0aHJvdWdoIHRvIGEgd2Fsa1xuICAgIH1cbiAgICBjb25zdCBzY2VuZSA9IGN1cnJlbnRTY2VuZSgpO1xuICAgIGlmICghc2NlbmUpIHJldHVybiBudWxsO1xuICAgIGxldCBmb3VuZDogYW55ID0gbnVsbDtcbiAgICBjb25zdCB3YWxrID0gKG46IGFueSkgPT4ge1xuICAgICAgICBpZiAoZm91bmQpIHJldHVybjtcbiAgICAgICAgaWYgKG4udXVpZCA9PT0gdXVpZCkge1xuICAgICAgICAgICAgZm91bmQgPSBuO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBuLmNoaWxkcmVuKSB3YWxrKGMpO1xuICAgIH07XG4gICAgd2FsayhzY2VuZSk7XG4gICAgcmV0dXJuIGZvdW5kO1xufVxuXG4vKiogQ29tcG9uZW50IGJ5IHV1aWQgb24gYW55IG5vZGUgb2YgdGhlIHNjZW5lLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb21wb25lbnQodXVpZDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBleHQgPSBlZGl0b3JFeHRlbmRzKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYyA9IGV4dD8uQ29tcG9uZW50Py5nZXRDb21wb25lbnQ/Lih1dWlkKTtcbiAgICAgICAgaWYgKGMpIHJldHVybiBjO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICB9XG4gICAgZm9yIChjb25zdCBjb21wIG9mIGFsbENvbnRhaW5lcnMoKSkgaWYgKGNvbXAudXVpZCA9PT0gdXVpZCkgcmV0dXJuIGNvbXA7XG4gICAgY29uc3Qgc2NlbmUgPSBjdXJyZW50U2NlbmUoKTtcbiAgICBpZiAoIXNjZW5lKSByZXR1cm4gbnVsbDtcbiAgICBsZXQgZm91bmQ6IGFueSA9IG51bGw7XG4gICAgY29uc3Qgd2FsayA9IChuOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGZvdW5kKSByZXR1cm47XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBuLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIGlmIChjLnV1aWQgPT09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGM7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBuLmNoaWxkcmVuKSB3YWxrKGMpO1xuICAgIH07XG4gICAgd2FsayhzY2VuZSk7XG4gICAgcmV0dXJuIGZvdW5kO1xufVxuXG4vKiogRW5hYmxlZCBTcGxpbmVDb250YWluZXJzIGluIHRoZSBvcGVuIHNjZW5lLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFsbENvbnRhaW5lcnMoKTogYW55W10ge1xuICAgIGNvbnN0IEMgPSBjb250YWluZXJDbGFzcygpO1xuICAgIGlmICghQyB8fCAhQy5hbGwpIHJldHVybiBbXTtcbiAgICBjb25zdCBzY2VuZSA9IGN1cnJlbnRTY2VuZSgpO1xuICAgIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGMgb2YgQy5hbGwpIHtcbiAgICAgICAgaWYgKGMgJiYgYy5pc1ZhbGlkICYmIGMubm9kZSAmJiBjLm5vZGUuaXNWYWxpZCAmJiBjLm5vZGUuc2NlbmUgPT09IHNjZW5lKSByZXMucHVzaChjKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGFpbnQoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgICAgY2NlKCkuRW5naW5lPy5yZXBhaW50SW5FZGl0TW9kZT8uKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIGVkaXRvciBzaHV0dGluZyBkb3duXG4gICAgfVxufVxuXG4vKiogVGVsbHMgdGhlIGVkaXRvciBhIG5vZGUgY2hhbmdlZCAoSW5zcGVjdG9yIHJlZnJlc2gsIHNjZW5lIGRpcnR5KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RpZnlOb2RlQ2hhbmdlZChub2RlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIW5vZGUgfHwgIW5vZGUuaXNWYWxpZCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICAgIGVkaXRvckV4dGVuZHMoKT8uTm9kZT8uZW1pdD8uKCdjaGFuZ2UnLCBub2RlLnV1aWQsIG5vZGUpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBub3QgaW4gdGhlIGVkaXRvclxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdGVkTm9kZVV1aWRzKCk6IHN0cmluZ1tdIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBpZHMgPSBjY2UoKS5TZWxlY3Rpb24/LnF1ZXJ5Py4oKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaWRzKSA/IGlkcyA6IFtdO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXMyRFZpZXcoKTogYm9vbGVhbiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYyA9IGNjZSgpLkNhbWVyYTtcbiAgICAgICAgaWYgKHR5cGVvZiBjPy5pczJEID09PSAnYm9vbGVhbicpIHJldHVybiBjLmlzMkQ7XG4gICAgICAgIHJldHVybiAhIWNjZSgpLkdpem1vPy5pczJEO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKiogVGhlIENvY29zIHRyYW5zZm9ybSB0b29sOiAncG9zaXRpb24nIHwgJ3JvdGF0aW9uJyB8ICdzY2FsZScgfCAncmVjdCcgfCAndmlldycuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtVG9vbE5hbWUoKTogc3RyaW5nIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gY2NlKCkuR2l6bW8/LnRyYW5zZm9ybVRvb2xOYW1lIHx8ICdwb3NpdGlvbic7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiAncG9zaXRpb24nO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBpdm90TW9kZSgpOiAncGl2b3QnIHwgJ2NlbnRlcicge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjY2UoKS5HaXptbz8ucGl2b3QgPT09ICdwaXZvdCcgPyAncGl2b3QnIDogJ2NlbnRlcic7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiAnY2VudGVyJztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb29yZGluYXRlTW9kZSgpOiAnbG9jYWwnIHwgJ2dsb2JhbCcge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjY2UoKS5HaXptbz8uY29vcmRpbmF0ZSA9PT0gJ2xvY2FsJyA/ICdsb2NhbCcgOiAnZ2xvYmFsJztcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuICdnbG9iYWwnO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbmFwQ29uZmlnIHtcbiAgICBwb3NpdGlvbjogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgejogbnVtYmVyIH07XG4gICAgcm90YXRpb246IG51bWJlcjtcbiAgICBzY2FsZTogbnVtYmVyO1xuICAgIGlzUG9zaXRpb25TbmFwRW5hYmxlZDogYm9vbGVhbjtcbiAgICBpc1JvdGF0aW9uU25hcEVuYWJsZWQ6IGJvb2xlYW47XG4gICAgaXNTY2FsZVNuYXBFbmFibGVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc25hcENvbmZpZygpOiBTbmFwQ29uZmlnIHtcbiAgICBjb25zdCBmYWxsYmFjazogU25hcENvbmZpZyA9IHtcbiAgICAgICAgcG9zaXRpb246IHsgeDogMSwgeTogMSwgejogMSB9LCByb3RhdGlvbjogMTUsIHNjYWxlOiAwLjEsXG4gICAgICAgIGlzUG9zaXRpb25TbmFwRW5hYmxlZDogZmFsc2UsIGlzUm90YXRpb25TbmFwRW5hYmxlZDogZmFsc2UsIGlzU2NhbGVTbmFwRW5hYmxlZDogZmFsc2UsXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjID0gY2NlKCkuR2l6bW8/LnF1ZXJ5VHJhbnNmb3JtU25hcENvbmZpZ3M/LigpO1xuICAgICAgICByZXR1cm4gYyA/IHsgLi4uZmFsbGJhY2ssIC4uLmMgfSA6IGZhbGxiYWNrO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gZmFsbGJhY2s7XG4gICAgfVxufVxuIiwgIi8qKlxuICogU3BsaW5lIGVsZW1lbnRzIChrbm90cyBhbmQgdGFuZ2VudCBoYW5kbGVzKSBvZiB0aGUgZWRpdGVkIGNvbnRhaW5lcnMsIHRoZVxuICogZWxlbWVudCBzZWxlY3Rpb24sIGFuZCBsb2NhbC93b3JsZCBjb252ZXJzaW9ucy5cbiAqL1xuaW1wb3J0IHtcbiAgICBWMywgUTQsIHYzLCBxNCwgY29weSwgYWRkLCBzdWIsIG5vcm1hbGl6ZSwgcVJvdGF0ZSwgcU11bCwgcUludmVydCwgcU5vcm1hbGl6ZSwgbTRUcmFuc2Zvcm1Qb2ludCwgbTRUcmFuc2Zvcm1EaXIsIGxlblNxLFxufSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9tYXRoJztcbmltcG9ydCB7XG4gICAgS25vdFJlZiwgc2V0S25vdFBvc2l0aW9uLCBzZXRUYW5nZW50VmVjLCBzeW5jTGlua2VkLCB0YW5nZW50SW5WZWMsIHRhbmdlbnRPdXRWZWMsIGN1cnZlQ291bnQsXG59IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL3NwbGluZS1jb3JlJztcbmltcG9ydCB7IGNjLCBjb250YWluZXJDbGFzcywgZmluZE5vZGUsIHNlbGVjdGVkTm9kZVV1aWRzIH0gZnJvbSAnLi9lbnYnO1xuXG5leHBvcnQgdHlwZSBQYXJ0ID0gJ2tub3QnIHwgJ2luJyB8ICdvdXQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVsZW1lbnRSZWYge1xuICAgIGNvbXA6IGFueTtcbiAgICBzcGxpbmU6IG51bWJlcjtcbiAgICBrbm90OiBudW1iZXI7XG4gICAgcGFydDogUGFydDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRLZXkoZTogRWxlbWVudFJlZik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2UuY29tcC51dWlkfToke2Uuc3BsaW5lfToke2Uua25vdH06JHtlLnBhcnR9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhbWVFbGVtZW50KGE6IEVsZW1lbnRSZWYgfCBudWxsIHwgdW5kZWZpbmVkLCBiOiBFbGVtZW50UmVmIHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWEgJiYgISFiICYmIGEuY29tcCA9PT0gYi5jb21wICYmIGEuc3BsaW5lID09PSBiLnNwbGluZSAmJiBhLmtub3QgPT09IGIua25vdCAmJiBhLnBhcnQgPT09IGIucGFydDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtub3RSZWYoZTogRWxlbWVudFJlZik6IEtub3RSZWYge1xuICAgIHJldHVybiB7IHNwbGluZTogZS5zcGxpbmUsIGtub3Q6IGUua25vdCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0S25vdChlOiB7IGNvbXA6IGFueTsgc3BsaW5lOiBudW1iZXI7IGtub3Q6IG51bWJlciB9KTogYW55IHtcbiAgICByZXR1cm4gZS5jb21wPy5zcGxpbmVzPy5bZS5zcGxpbmVdPy5rbm90cz8uW2Uua25vdF0gPz8gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50KGU6IEVsZW1lbnRSZWYpOiBib29sZWFuIHtcbiAgICBpZiAoIWUuY29tcCB8fCAhZS5jb21wLmlzVmFsaWQgfHwgIWUuY29tcC5ub2RlIHx8ICFlLmNvbXAubm9kZS5pc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICEhZ2V0S25vdChlKTtcbn1cblxuLyoqIFRhbmdlbnRzIHRoYXQgc2hhcGUgYSBjdXJ2ZTogdGhlIGluIHRhbmdlbnQgb2YgYW4gb3BlbiBzcGxpbmUncyBmaXJzdCBrbm90IGRvZXMgbm90LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhbmdlbnRVc2VkKHNwbGluZTogYW55LCBrbm90OiBudW1iZXIsIHBhcnQ6IFBhcnQpOiBib29sZWFuIHtcbiAgICBpZiAocGFydCA9PT0gJ2tub3QnKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoc3BsaW5lLmNsb3NlZCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGN1cnZlQ291bnQoc3BsaW5lKSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChwYXJ0ID09PSAnaW4nICYmIGtub3QgPT09IDApIHJldHVybiBmYWxzZTtcbiAgICBpZiAocGFydCA9PT0gJ291dCcgJiYga25vdCA9PT0gc3BsaW5lLmtub3RzLmxlbmd0aCAtIDEpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHRyYW5zZm9ybXNcblxuZXhwb3J0IGZ1bmN0aW9uIHdvcmxkTWF0cml4KGNvbXA6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGNvbXAubm9kZS53b3JsZE1hdHJpeDtcbn1cblxuY29uc3QgX2ludiA9IG5ldyBNYXA8YW55LCB7IHN0YW1wOiBzdHJpbmc7IG06IGFueSB9PigpO1xuXG4vKiogSW52ZXJzZSBvZiB0aGUgY29udGFpbmVyJ3Mgd29ybGQgbWF0cml4IChjYWNoZWQgcGVyIG1hdHJpeCB2YWx1ZSkuICovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZU1hdHJpeChjb21wOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IG0gPSBjb21wLm5vZGUud29ybGRNYXRyaXg7XG4gICAgY29uc3Qgc3RhbXAgPSBgJHttLm0wMH0sJHttLm0wMX0sJHttLm0wMn0sJHttLm0wNH0sJHttLm0wNX0sJHttLm0wNn0sJHttLm0wOH0sJHttLm0wOX0sJHttLm0xMH0sJHttLm0xMn0sJHttLm0xM30sJHttLm0xNH1gO1xuICAgIGxldCBlID0gX2ludi5nZXQoY29tcCk7XG4gICAgaWYgKCFlIHx8IGUuc3RhbXAgIT09IHN0YW1wKSB7XG4gICAgICAgIGNvbnN0IHsgTWF0NCB9ID0gY2MoKTtcbiAgICAgICAgY29uc3QgaW52ID0gbmV3IE1hdDQoKTtcbiAgICAgICAgTWF0NC5pbnZlcnQoaW52LCBtKTtcbiAgICAgICAgZSA9IHsgc3RhbXAsIG06IGludiB9O1xuICAgICAgICBfaW52LnNldChjb21wLCBlKTtcbiAgICB9XG4gICAgcmV0dXJuIGUubTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvV29ybGQoY29tcDogYW55LCBsb2NhbDogVjMsIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIHJldHVybiBtNFRyYW5zZm9ybVBvaW50KG91dCwgd29ybGRNYXRyaXgoY29tcCksIGxvY2FsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTG9jYWwoY29tcDogYW55LCB3b3JsZDogVjMsIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIHJldHVybiBtNFRyYW5zZm9ybVBvaW50KG91dCwgaW52ZXJzZU1hdHJpeChjb21wKSwgd29ybGQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlyVG9Xb3JsZChjb21wOiBhbnksIGxvY2FsOiBWMywgb3V0OiBWMyA9IHYzKCkpOiBWMyB7XG4gICAgcmV0dXJuIG00VHJhbnNmb3JtRGlyKG91dCwgd29ybGRNYXRyaXgoY29tcCksIGxvY2FsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpclRvTG9jYWwoY29tcDogYW55LCB3b3JsZDogVjMsIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIHJldHVybiBtNFRyYW5zZm9ybURpcihvdXQsIGludmVyc2VNYXRyaXgoY29tcCksIHdvcmxkKTtcbn1cblxuLyoqIFdvcmxkIHJvdGF0aW9uIG9mIHRoZSBjb250YWluZXIgbm9kZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluZXJSb3RhdGlvbihjb21wOiBhbnkpOiBRNCB7XG4gICAgY29uc3QgciA9IGNvbXAubm9kZS53b3JsZFJvdGF0aW9uO1xuICAgIHJldHVybiBxNChyLngsIHIueSwgci56LCByLncpO1xufVxuXG4vKiogS25vdCByb3RhdGlvbiBpbiB3b3JsZCBzcGFjZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrbm90V29ybGRSb3RhdGlvbihjb21wOiBhbnksIGs6IGFueSwgb3V0OiBRNCA9IHE0KCkpOiBRNCB7XG4gICAgcmV0dXJuIHFOb3JtYWxpemUob3V0LCBxTXVsKG91dCwgY29udGFpbmVyUm90YXRpb24oY29tcCksIGsucm90YXRpb24pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtub3RXb3JsZFBvc2l0aW9uKGNvbXA6IGFueSwgczogbnVtYmVyLCBrOiBudW1iZXIsIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIGNvbnN0IGtub3QgPSBjb21wLnNwbGluZXNbc10ua25vdHNba107XG4gICAgcmV0dXJuIHRvV29ybGQoY29tcCwga25vdC5wb3NpdGlvbiwgb3V0KTtcbn1cblxuLyoqIFdvcmxkIHBvc2l0aW9uIG9mIGEgdGFuZ2VudCBoYW5kbGUncyBlbmQgcG9pbnQuICovXG5leHBvcnQgZnVuY3Rpb24gdGFuZ2VudFdvcmxkUG9zaXRpb24oY29tcDogYW55LCBzOiBudW1iZXIsIGs6IG51bWJlciwgcGFydDogJ2luJyB8ICdvdXQnLCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICBjb25zdCBrbm90ID0gY29tcC5zcGxpbmVzW3NdLmtub3RzW2tdO1xuICAgIGNvbnN0IHZlYyA9IHBhcnQgPT09ICdpbicgPyB0YW5nZW50SW5WZWModjMoKSwga25vdCkgOiB0YW5nZW50T3V0VmVjKHYzKCksIGtub3QpO1xuICAgIHJldHVybiB0b1dvcmxkKGNvbXAsIGFkZCh2MygpLCBrbm90LnBvc2l0aW9uLCB2ZWMpLCBvdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudFdvcmxkUG9zaXRpb24oZTogRWxlbWVudFJlZiwgb3V0OiBWMyA9IHYzKCkpOiBWMyB7XG4gICAgaWYgKGUucGFydCA9PT0gJ2tub3QnKSByZXR1cm4ga25vdFdvcmxkUG9zaXRpb24oZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCBvdXQpO1xuICAgIHJldHVybiB0YW5nZW50V29ybGRQb3NpdGlvbihlLmNvbXAsIGUuc3BsaW5lLCBlLmtub3QsIGUucGFydCwgb3V0KTtcbn1cblxuLyoqIE1vdmVzIGEga25vdCB0byBhIHdvcmxkIHBvc2l0aW9uIChsaW5rZWQga25vdHMgZm9sbG93KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRLbm90V29ybGQoY29tcDogYW55LCBzOiBudW1iZXIsIGs6IG51bWJlciwgd29ybGQ6IFYzKTogdm9pZCB7XG4gICAgY29uc3QgbG9jYWwgPSB0b0xvY2FsKGNvbXAsIHdvcmxkKTtcbiAgICBzZXRLbm90UG9zaXRpb24oY29tcC5zcGxpbmVzW3NdLCBrLCBsb2NhbCk7XG4gICAgc3luY0xpbmtlZChjb21wLCB7IHNwbGluZTogcywga25vdDogayB9KTtcbn1cblxuLyoqIFB1dHMgYSB0YW5nZW50IGhhbmRsZSdzIGVuZCBwb2ludCBhdCBhIHdvcmxkIHBvc2l0aW9uICh0aGUga25vdCdzIG1vZGUgaXMga2VwdCkuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VGFuZ2VudFdvcmxkKGNvbXA6IGFueSwgczogbnVtYmVyLCBrOiBudW1iZXIsIHBhcnQ6ICdpbicgfCAnb3V0Jywgd29ybGQ6IFYzKTogdm9pZCB7XG4gICAgY29uc3Qgc3BsaW5lID0gY29tcC5zcGxpbmVzW3NdO1xuICAgIGNvbnN0IGtub3QgPSBzcGxpbmUua25vdHNba107XG4gICAgY29uc3QgbG9jYWwgPSB0b0xvY2FsKGNvbXAsIHdvcmxkKTtcbiAgICBzZXRUYW5nZW50VmVjKHNwbGluZSwgaywgcGFydCwgc3ViKHYzKCksIGxvY2FsLCBrbm90LnBvc2l0aW9uKSk7XG59XG5cbi8qKiBTZXRzIGEgdGFuZ2VudCBmcm9tIGEgd29ybGQtc3BhY2Ugb2Zmc2V0IHZlY3Rvci4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRUYW5nZW50V29ybGRWZWMoY29tcDogYW55LCBzOiBudW1iZXIsIGs6IG51bWJlciwgcGFydDogJ2luJyB8ICdvdXQnLCB3b3JsZFZlYzogVjMpOiB2b2lkIHtcbiAgICBzZXRUYW5nZW50VmVjKGNvbXAuc3BsaW5lc1tzXSwgaywgcGFydCwgZGlyVG9Mb2NhbChjb21wLCB3b3JsZFZlYykpO1xufVxuXG4vKiogV29ybGQtc3BhY2UgdGFuZ2VudCBvZmZzZXQgdmVjdG9yLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhbmdlbnRXb3JsZFZlYyhjb21wOiBhbnksIHM6IG51bWJlciwgazogbnVtYmVyLCBwYXJ0OiAnaW4nIHwgJ291dCcsIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIGNvbnN0IGtub3QgPSBjb21wLnNwbGluZXNbc10ua25vdHNba107XG4gICAgY29uc3QgdmVjID0gcGFydCA9PT0gJ2luJyA/IHRhbmdlbnRJblZlYyh2MygpLCBrbm90KSA6IHRhbmdlbnRPdXRWZWModjMoKSwga25vdCk7XG4gICAgcmV0dXJuIGRpclRvV29ybGQoY29tcCwgdmVjLCBvdXQpO1xufVxuXG4vKiogU2V0cyBhIGtub3QncyByb3RhdGlvbiBmcm9tIGEgd29ybGQgcm90YXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gc2V0S25vdFdvcmxkUm90YXRpb24oY29tcDogYW55LCBrOiBhbnksIHdvcmxkOiBRNCk6IHZvaWQge1xuICAgIGNvbnN0IGxvY2FsID0gcU11bChxNCgpLCBxSW52ZXJ0KHE0KCksIGNvbnRhaW5lclJvdGF0aW9uKGNvbXApKSwgd29ybGQpO1xuICAgIHFOb3JtYWxpemUoay5yb3RhdGlvbiwgbG9jYWwpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gdGFyZ2V0c1xuXG4vKiogU3BsaW5lQ29udGFpbmVycyBvbiB0aGUgc2VsZWN0ZWQgbm9kZXMuICovXG5leHBvcnQgZnVuY3Rpb24gY3VycmVudFRhcmdldHMoKTogYW55W10ge1xuICAgIGNvbnN0IEMgPSBjb250YWluZXJDbGFzcygpO1xuICAgIGlmICghQykgcmV0dXJuIFtdO1xuICAgIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHV1aWQgb2Ygc2VsZWN0ZWROb2RlVXVpZHMoKSkge1xuICAgICAgICBjb25zdCBub2RlID0gZmluZE5vZGUodXVpZCk7XG4gICAgICAgIGlmICghbm9kZSB8fCAhbm9kZS5pc1ZhbGlkIHx8ICFub2RlLmFjdGl2ZUluSGllcmFyY2h5KSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgY29tcCA9IG5vZGUuZ2V0Q29tcG9uZW50KEMpO1xuICAgICAgICBpZiAoY29tcCAmJiBjb21wLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmVzLnB1c2goY29tcCk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2VsZWN0aW9uXG5cbmV4cG9ydCBjbGFzcyBFbGVtZW50U2VsZWN0aW9uIHtcbiAgICBwcml2YXRlIG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBFbGVtZW50UmVmPigpO1xuICAgIHByaXZhdGUgb3JkZXI6IHN0cmluZ1tdID0gW107XG4gICAgLyoqIEJ1bXBlZCBvbiBldmVyeSBjaGFuZ2UuICovXG4gICAgdmVyc2lvbiA9IDA7XG5cbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuc2l6ZTtcbiAgICB9XG5cbiAgICBoYXMoZTogRWxlbWVudFJlZik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuaGFzKGVsZW1lbnRLZXkoZSkpO1xuICAgIH1cblxuICAgIGFkZChlOiBFbGVtZW50UmVmKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGsgPSBlbGVtZW50S2V5KGUpO1xuICAgICAgICBpZiAodGhpcy5tYXAuaGFzKGspKSB7XG4gICAgICAgICAgICAvLyBSZS1hZGRpbmcgbWFrZXMgaXQgdGhlIGFjdGl2ZSBlbGVtZW50LlxuICAgICAgICAgICAgdGhpcy5vcmRlci5zcGxpY2UodGhpcy5vcmRlci5pbmRleE9mKGspLCAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcC5zZXQoaywgeyAuLi5lIH0pO1xuICAgICAgICB0aGlzLm9yZGVyLnB1c2goayk7XG4gICAgICAgIHRoaXMudmVyc2lvbisrO1xuICAgIH1cblxuICAgIHJlbW92ZShlOiBFbGVtZW50UmVmKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGsgPSBlbGVtZW50S2V5KGUpO1xuICAgICAgICBpZiAoIXRoaXMubWFwLmRlbGV0ZShrKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm9yZGVyLnNwbGljZSh0aGlzLm9yZGVyLmluZGV4T2YoayksIDEpO1xuICAgICAgICB0aGlzLnZlcnNpb24rKztcbiAgICB9XG5cbiAgICB0b2dnbGUoZTogRWxlbWVudFJlZik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5oYXMoZSkpIHRoaXMucmVtb3ZlKGUpO1xuICAgICAgICBlbHNlIHRoaXMuYWRkKGUpO1xuICAgIH1cblxuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMubWFwLnNpemUpIHJldHVybjtcbiAgICAgICAgdGhpcy5tYXAuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5vcmRlci5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnZlcnNpb24rKztcbiAgICB9XG5cbiAgICBzZXQobGlzdDogRWxlbWVudFJlZltdKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgICAgIHRoaXMub3JkZXIubGVuZ3RoID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBlIG9mIGxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGsgPSBlbGVtZW50S2V5KGUpO1xuICAgICAgICAgICAgaWYgKHRoaXMubWFwLmhhcyhrKSkgY29udGludWU7XG4gICAgICAgICAgICB0aGlzLm1hcC5zZXQoaywgeyAuLi5lIH0pO1xuICAgICAgICAgICAgdGhpcy5vcmRlci5wdXNoKGspO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmVyc2lvbisrO1xuICAgIH1cblxuICAgIGFsbCgpOiBFbGVtZW50UmVmW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmRlci5tYXAoKGspID0+IHRoaXMubWFwLmdldChrKSEpO1xuICAgIH1cblxuICAgIGtub3RzKCk6IEVsZW1lbnRSZWZbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbCgpLmZpbHRlcigoZSkgPT4gZS5wYXJ0ID09PSAna25vdCcpO1xuICAgIH1cblxuICAgIHRhbmdlbnRzKCk6IEVsZW1lbnRSZWZbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbCgpLmZpbHRlcigoZSkgPT4gZS5wYXJ0ICE9PSAna25vdCcpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbGFzdCBzZWxlY3RlZCBlbGVtZW50LiAqL1xuICAgIGFjdGl2ZSgpOiBFbGVtZW50UmVmIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGsgPSB0aGlzLm9yZGVyW3RoaXMub3JkZXIubGVuZ3RoIC0gMV07XG4gICAgICAgIHJldHVybiBrID8gdGhpcy5tYXAuZ2V0KGspISA6IG51bGw7XG4gICAgfVxuXG4gICAgaGFzS25vdChjb21wOiBhbnksIHNwbGluZTogbnVtYmVyLCBrbm90OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmhhcyhgJHtjb21wLnV1aWR9OiR7c3BsaW5lfToke2tub3R9Omtub3RgKTtcbiAgICB9XG5cbiAgICBoYXNBbnlPZihjb21wOiBhbnksIHNwbGluZTogbnVtYmVyLCBrbm90OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgcCA9IGAke2NvbXAudXVpZH06JHtzcGxpbmV9OiR7a25vdH06YDtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmhhcyhgJHtwfWtub3RgKSB8fCB0aGlzLm1hcC5oYXMoYCR7cH1pbmApIHx8IHRoaXMubWFwLmhhcyhgJHtwfW91dGApO1xuICAgIH1cblxuICAgIC8qKiBEcm9wcyBlbGVtZW50cyB0aGF0IG5vIGxvbmdlciBleGlzdCBvciBiZWxvbmcgdG8gY29udGFpbmVycyBub3QgZWRpdGVkLiAqL1xuICAgIHZhbGlkYXRlKHRhcmdldHM6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgayBvZiBbLi4udGhpcy5vcmRlcl0pIHtcbiAgICAgICAgICAgIGNvbnN0IGUgPSB0aGlzLm1hcC5nZXQoaykhO1xuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChlKSB8fCAhdGFyZ2V0cy5pbmNsdWRlcyhlLmNvbXApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuZGVsZXRlKGspO1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXIuc3BsaWNlKHRoaXMub3JkZXIuaW5kZXhPZihrKSwgMSk7XG4gICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZWQpIHRoaXMudmVyc2lvbisrO1xuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG5cbiAgICAvKiogQ29tcHMgdGhhdCBoYXZlIHNlbGVjdGVkIGVsZW1lbnRzLiAqL1xuICAgIGNvbXBzKCk6IGFueVtdIHtcbiAgICAgICAgY29uc3Qgc2V0ID0gbmV3IFNldDxhbnk+KCk7XG4gICAgICAgIGZvciAoY29uc3QgZSBvZiB0aGlzLm1hcC52YWx1ZXMoKSkgc2V0LmFkZChlLmNvbXApO1xuICAgICAgICByZXR1cm4gWy4uLnNldF07XG4gICAgfVxufVxuXG4vKiogV29ybGQtc3BhY2UgY2VudHJvaWQgb2YgZWxlbWVudHMuICovXG5leHBvcnQgZnVuY3Rpb24gY2VudHJvaWQobGlzdDogRWxlbWVudFJlZltdLCBvdXQ6IFYzID0gdjMoKSk6IFYzIHtcbiAgICBjb3B5KG91dCwgdjMoKSk7XG4gICAgaWYgKCFsaXN0Lmxlbmd0aCkgcmV0dXJuIG91dDtcbiAgICBjb25zdCBwID0gdjMoKTtcbiAgICBmb3IgKGNvbnN0IGUgb2YgbGlzdCkgYWRkKG91dCwgb3V0LCBlbGVtZW50V29ybGRQb3NpdGlvbihlLCBwKSk7XG4gICAgb3V0LnggLz0gbGlzdC5sZW5ndGg7XG4gICAgb3V0LnkgLz0gbGlzdC5sZW5ndGg7XG4gICAgb3V0LnogLz0gbGlzdC5sZW5ndGg7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqIERpcmVjdGlvbiBvZiBhIHRhbmdlbnQgZWxlbWVudCBpbiB3b3JsZCBzcGFjZSAodW5pdCkuICovXG5leHBvcnQgZnVuY3Rpb24gdGFuZ2VudERpcmVjdGlvbldvcmxkKGU6IEVsZW1lbnRSZWYsIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIGlmIChlLnBhcnQgPT09ICdrbm90JykgcmV0dXJuIG91dDtcbiAgICB0YW5nZW50V29ybGRWZWMoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCBlLnBhcnQsIG91dCk7XG4gICAgaWYgKGxlblNxKG91dCkgPiAxZS0xMikgbm9ybWFsaXplKG91dCwgb3V0KTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgeyBxUm90YXRlIH07XG4iLCAiLyoqXG4gKiBFZGl0aW5nIHN0YXRlIHNoYXJlZCBieSB0aGUgc2NlbmUgc2NyaXB0J3MgbW9kdWxlcy5cbiAqL1xuaW1wb3J0IHsgRWxlbWVudFJlZiwgRWxlbWVudFNlbGVjdGlvbiB9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHsgVjMgfSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9tYXRoJztcbmltcG9ydCB7IFRhbmdlbnRNb2RlIH0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvc3BsaW5lLWNvcmUnO1xuXG5leHBvcnQgdHlwZSBUb29sID0gJ3NlbGVjdCcgfCAnZHJhdyc7XG5leHBvcnQgdHlwZSBPcmllbnRhdGlvbiA9ICdnbG9iYWwnIHwgJ2xvY2FsJyB8ICdlbGVtZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBTZXR0aW5ncyB7XG4gICAgLyoqIERyYXcgc3BsaW5lcyBvZiB1bnNlbGVjdGVkIG5vZGVzIHRvby4gKi9cbiAgICBzaG93QWxsOiBib29sZWFuO1xuICAgIC8qKiBBcnJvd3Mgc2hvd2luZyB0aGUgZGlyZWN0aW9uIG9mIHRyYXZlbC4gKi9cbiAgICBzaG93RmxvdzogYm9vbGVhbjtcbiAgICAvKiogVGFuZ2VudCBoYW5kbGVzIG9mIGV2ZXJ5IGtub3QsIG5vdCBvbmx5IHRoZSBzZWxlY3RlZCBvbmVzLiAqL1xuICAgIHNob3dBbGxUYW5nZW50czogYm9vbGVhbjtcbiAgICAvKiogS25vdCBpbmRleCBsYWJlbHMuICovXG4gICAgc2hvd0tub3RJbmRpY2VzOiBib29sZWFuO1xuICAgIC8qKiBVcCB2ZWN0b3JzIGFsb25nIHRoZSBzcGxpbmUuICovXG4gICAgc2hvd05vcm1hbHM6IGJvb2xlYW47XG4gICAgLyoqIE1vZGUgb2Yga25vdHMgcGxhY2VkIHdpdGggdGhlIERyYXcgdG9vbCAoQXV0b1Ntb290aCBvciBMaW5lYXIpLiAqL1xuICAgIGRlZmF1bHRNb2RlOiBudW1iZXI7XG4gICAgLyoqIFBsYWNlIGRyYXduIGtub3RzIG9uIHNjZW5lIGdlb21ldHJ5IHVuZGVyIHRoZSBtb3VzZS4gKi9cbiAgICBkcmF3T25TdXJmYWNlczogYm9vbGVhbjtcbiAgICAvKiogSGFuZGxlIG9yaWVudGF0aW9uIGZvciBrbm90IGVkaXRpbmcuICovXG4gICAgb3JpZW50YXRpb246IE9yaWVudGF0aW9uO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogU2V0dGluZ3MgPSB7XG4gICAgc2hvd0FsbDogdHJ1ZSxcbiAgICBzaG93RmxvdzogdHJ1ZSxcbiAgICBzaG93QWxsVGFuZ2VudHM6IGZhbHNlLFxuICAgIHNob3dLbm90SW5kaWNlczogZmFsc2UsXG4gICAgc2hvd05vcm1hbHM6IGZhbHNlLFxuICAgIGRlZmF1bHRNb2RlOiBUYW5nZW50TW9kZS5BdXRvU21vb3RoLFxuICAgIGRyYXdPblN1cmZhY2VzOiB0cnVlLFxuICAgIG9yaWVudGF0aW9uOiAnZ2xvYmFsJyxcbn07XG5cbmV4cG9ydCB0eXBlIEhhbmRsZUF4aXMgPSAneCcgfCAneScgfCAneicgfCAneHknIHwgJ3l6JyB8ICd4eicgfCAndmlldycgfCAnZnJlZSc7XG5cbmV4cG9ydCB0eXBlIEhpdCA9XG4gICAgfCB7IGtpbmQ6ICdoYW5kbGUnOyBheGlzOiBIYW5kbGVBeGlzIH1cbiAgICB8IHsga2luZDogJ2tub3QnOyByZWY6IEVsZW1lbnRSZWYgfVxuICAgIHwgeyBraW5kOiAndGFuZ2VudCc7IHJlZjogRWxlbWVudFJlZiB9XG4gICAgfCB7IGtpbmQ6ICdjdXJ2ZSc7IGNvbXA6IGFueTsgc3BsaW5lOiBudW1iZXI7IGN1cnZlOiBudW1iZXI7IHQ6IG51bWJlcjsgd29ybGQ6IFYzIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJhd1N0YXRlIHtcbiAgICBjb21wOiBhbnk7XG4gICAgc3BsaW5lOiBudW1iZXI7XG4gICAgLyoqIEtub3RzIGFyZSBhZGRlZCBhZnRlciB0aGUgbGFzdCBrbm90ICgnZW5kJykgb3IgYmVmb3JlIHRoZSBmaXJzdCAoJ3N0YXJ0JykuICovXG4gICAgZW5kOiAnc3RhcnQnIHwgJ2VuZCc7XG59XG5cbmV4cG9ydCBjb25zdCBTID0ge1xuICAgIC8qKiBUaGlzIHByb2Nlc3MgaXMgdGhlIGVkaXQgc2NlbmUgKFBsYXktaW4tRWRpdG9yJ3MgcHJvY2VzcyBvbmx5IGRyYXdzKS4gKi9cbiAgICBwcmltYXJ5OiBmYWxzZSxcbiAgICBob29rZWQ6IGZhbHNlLFxuICAgIC8qKiBTcGxpbmUgZWRpdGluZyBjb250ZXh0IGlzIG9uIChVbml0eSdzIHNwbGluZSB0b29sIGNvbnRleHQpLiAqL1xuICAgIGNvbnRleHQ6IGZhbHNlLFxuICAgIHRvb2w6ICdzZWxlY3QnIGFzIFRvb2wsXG4gICAgc2VsZWN0aW9uOiBuZXcgRWxlbWVudFNlbGVjdGlvbigpLFxuICAgIGhvdmVyOiBudWxsIGFzIEhpdCB8IG51bGwsXG4gICAgLyoqIFNwbGluZSBiZWluZyBkcmF3biBieSB0aGUgRHJhdyB0b29sLiAqL1xuICAgIGRyYXdpbmc6IG51bGwgYXMgRHJhd1N0YXRlIHwgbnVsbCxcbiAgICAvKiogSW5kZXggKGluIHRoZSBlZGl0ZWQgY29udGFpbmVycykgb2YgdGhlIGNvbnRhaW5lciB0aGUgRHJhdyB0b29sIGFkZHMgdG8uICovXG4gICAgZHJhd1RhcmdldDogMCxcbiAgICAvKiogRHJhdyB0b29sIHByZXZpZXcgcG9zaXRpb24gKHdvcmxkKS4gKi9cbiAgICBwcmV2aWV3OiBudWxsIGFzIFYzIHwgbnVsbCxcbiAgICBzZXR0aW5nczogeyAuLi5ERUZBVUxUX1NFVFRJTkdTIH0sXG4gICAgLyoqIExhc3QgdGltZSBhIGRlbGV0ZSBrZXkgd2VudCB0aHJvdWdoIHRoZSBzY2VuZSB2aWV3LiAqL1xuICAgIGRlbGV0ZUtleUF0OiAwLFxuICAgIHNlbGVjdEFsbEtleUF0OiAwLFxuICAgIC8qKiBSZXBsYXlpbmcgYSBjbGljayBpbnRvIHRoZSBlZGl0b3IncyBvd24gaGFuZGxlcnMuICovXG4gICAgcmVwbGF5aW5nOiBmYWxzZSxcbiAgICBsYXN0VGFyZ2V0czogW10gYXMgYW55W10sXG4gICAgLyoqIEVudGVyIHRoZSBjb250ZXh0ICh3aXRoIGEgdG9vbCkgd2hlbiB0aGlzIGNvbnRhaW5lciBiZWNvbWVzIHNlbGVjdGVkLiAqL1xuICAgIHBlbmRpbmdDb250ZXh0OiBudWxsIGFzIHsgY29tcDogYW55OyB0b29sOiBUb29sOyB1bnRpbDogbnVtYmVyIH0gfCBudWxsLFxuICAgIHRhcmdldHNLZXk6ICcnLFxuICAgIHN0YXRlVmVyc2lvbjogMCxcbiAgICBkaWFnOiB7XG4gICAgICAgIGRyYXdzOiAwLFxuICAgICAgICBtb3VzZURvd25zOiAwLFxuICAgICAgICBibG9ja2VkOiAwLFxuICAgICAgICBlcnJvcnM6IFtdIGFzIHN0cmluZ1tdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbm90ZShtc2c6IHN0cmluZyk6IHZvaWQge1xuICAgIFMuZGlhZy5lcnJvcnMucHVzaChgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9ICR7bXNnfWApO1xuICAgIGlmIChTLmRpYWcuZXJyb3JzLmxlbmd0aCA+IDMwKSBTLmRpYWcuZXJyb3JzLnNoaWZ0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidW1wU3RhdGUoKTogdm9pZCB7XG4gICAgUy5zdGF0ZVZlcnNpb24rKztcbn1cbiIsICIvKipcbiAqIFRoZSBTY2VuZSB2aWV3IGNhbWVyYSBhbmQgc2NyZWVuLXNwYWNlIGhlbHBlcnMuXG4gKlxuICogU2NyZWVuIGNvb3JkaW5hdGVzIGZvbGxvdyB0aGUgZW5naW5lJ3MgY2FtZXJhIGNvbnZlbnRpb246IHBpeGVscyBvZiB0aGVcbiAqIHJlbmRlciB3aW5kb3cgd2l0aCB0aGUgb3JpZ2luIGF0IHRoZSBib3R0b20tbGVmdCAod2hhdCBzY3JlZW5Qb2ludFRvUmF5XG4gKiBhbmQgd29ybGRUb1NjcmVlbiB1c2UpLlxuICovXG5pbXBvcnQgeyBWMywgdjMsIHNldCwgc3ViLCBkb3QsIG5vcm1hbGl6ZSwgbGVuLCBjcm9zcywgc2NhbGVBbmRBZGQsIEVQU0lMT04gfSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9tYXRoJztcbmltcG9ydCB7IGNjIH0gZnJvbSAnLi9lbnYnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNjcmVlblBvaW50IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIC8qKiBJbiBmcm9udCBvZiB0aGUgY2FtZXJhLiAqL1xuICAgIHZpc2libGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF5IHtcbiAgICBvOiBWMztcbiAgICBkOiBWMztcbn1cblxubGV0IGxhc3RDYW1lcmE6IGFueSA9IG51bGw7XG5cbi8qKiBUaGUgU2NlbmUgdmlldyBjYW1lcmEgKG5vdCBnYW1lIGNhbWVyYXMsIG5vdCB0aGUgZ2l6bW8gY2FtZXJhKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2VuZUNhbWVyYSgpOiBhbnkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZGlyZWN0b3IsIHJlbmRlcmVyIH0gPSBjYygpO1xuICAgICAgICBjb25zdCByb290OiBhbnkgPSBkaXJlY3Rvci5yb290O1xuICAgICAgICBpZiAoIXJvb3QpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAobGFzdENhbWVyYSAmJiBsYXN0Q2FtZXJhLmVuYWJsZWQgJiYgbGFzdENhbWVyYS53aW5kb3cgPT09IHJvb3QubWFpbldpbmRvdyAmJiByb290LmNhbWVyYUxpc3QuaW5jbHVkZXMobGFzdENhbWVyYSkpIHJldHVybiBsYXN0Q2FtZXJhO1xuICAgICAgICBmb3IgKGNvbnN0IGNhbSBvZiByb290LmNhbWVyYUxpc3QpIHtcbiAgICAgICAgICAgIGlmIChjYW0uY2FtZXJhVXNhZ2UgPT09IHJlbmRlcmVyLnNjZW5lLkNhbWVyYVVzYWdlLlNDRU5FX1ZJRVcgJiYgY2FtLmVuYWJsZWQgJiYgY2FtLndpbmRvdyA9PT0gcm9vdC5tYWluV2luZG93KSB7XG4gICAgICAgICAgICAgICAgbGFzdENhbWVyYSA9IGNhbTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIGVuZ2luZSBub3QgcmVhZHlcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IF90bXAgPSB2MygpO1xuXG5leHBvcnQgZnVuY3Rpb24gY2FtZXJhUG9zaXRpb24oY2FtOiBhbnksIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIGNvbnN0IHAgPSBjYW0ubm9kZS53b3JsZFBvc2l0aW9uO1xuICAgIHJldHVybiBzZXQob3V0LCBwLngsIHAueSwgcC56KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVyYUZvcndhcmQoY2FtOiBhbnksIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIGNvbnN0IGYgPSBjYW0uZm9yd2FyZCA/PyBjYW0ubm9kZS5mb3J3YXJkO1xuICAgIHJldHVybiBub3JtYWxpemUob3V0LCBzZXQob3V0LCBmLngsIGYueSwgZi56KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lcmFSaWdodChjYW06IGFueSwgb3V0OiBWMyA9IHYzKCkpOiBWMyB7XG4gICAgY29uc3QgciA9IGNhbS5ub2RlLnJpZ2h0O1xuICAgIHJldHVybiBub3JtYWxpemUob3V0LCBzZXQob3V0LCByLngsIHIueSwgci56KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lcmFVcChjYW06IGFueSwgb3V0OiBWMyA9IHYzKCkpOiBWMyB7XG4gICAgY29uc3QgdSA9IGNhbS5ub2RlLnVwO1xuICAgIHJldHVybiBub3JtYWxpemUob3V0LCBzZXQob3V0LCB1LngsIHUueSwgdS56KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09ydGhvKGNhbTogYW55KTogYm9vbGVhbiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNhbS5wcm9qZWN0aW9uVHlwZSA9PT0gY2MoKS5yZW5kZXJlci5zY2VuZS5DYW1lcmFQcm9qZWN0aW9uLk9SVEhPO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5jb25zdCBfd3MgPSB2MygpO1xuY29uc3QgX2Z3ID0gdjMoKTtcblxuLyoqIFdvcmxkIHBvc2l0aW9uIHRvIHNjcmVlbiBwaXhlbHMuICovXG5leHBvcnQgZnVuY3Rpb24gdG9TY3JlZW4oY2FtOiBhbnksIHA6IFYzLCBvdXQ6IFNjcmVlblBvaW50ID0geyB4OiAwLCB5OiAwLCB2aXNpYmxlOiB0cnVlIH0pOiBTY3JlZW5Qb2ludCB7XG4gICAgLy8gd29ybGRUb1NjcmVlbiBvbmx5IHJlYWRzL3dyaXRlcyB4LCB5LCB6LCBzbyBwbGFpbiBvYmplY3RzIGRvLlxuICAgIGNhbS53b3JsZFRvU2NyZWVuKF93cywgcCk7XG4gICAgb3V0LnggPSBfd3MueDtcbiAgICBvdXQueSA9IF93cy55O1xuICAgIGlmIChpc09ydGhvKGNhbSkpIG91dC52aXNpYmxlID0gdHJ1ZTtcbiAgICBlbHNlIHtcbiAgICAgICAgY2FtZXJhUG9zaXRpb24oY2FtLCBfdG1wKTtcbiAgICAgICAgY2FtZXJhRm9yd2FyZChjYW0sIF9mdyk7XG4gICAgICAgIG91dC52aXNpYmxlID0gZG90KHN1YihfdG1wLCBwLCBfdG1wKSwgX2Z3KSA+IChjYW0ubmVhckNsaXAgPz8gMC4wMSk7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKiBSYXkgZnJvbSB0aGUgY2FtZXJhIHRocm91Z2ggYSBzY3JlZW4gcGl4ZWwuICovXG5leHBvcnQgZnVuY3Rpb24gc2NyZWVuUmF5KGNhbTogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlcik6IFJheSB7XG4gICAgY29uc3QgeyBnZW9tZXRyeSB9ID0gY2MoKTtcbiAgICBjb25zdCByID0gbmV3IGdlb21ldHJ5LlJheSgpO1xuICAgIGNhbS5zY3JlZW5Qb2ludFRvUmF5KHIsIHgsIHkpO1xuICAgIHJldHVybiB7IG86IHYzKHIuby54LCByLm8ueSwgci5vLnopLCBkOiBub3JtYWxpemUodjMoKSwgdjMoci5kLngsIHIuZC55LCByLmQueikpIH07XG59XG5cbi8qKiBXb3JsZCB1bml0cyBwZXIgc2NyZWVuIHBpeGVsIGF0IGEgd29ybGQgcG9zaXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gd29ybGRQZXJQaXhlbChjYW06IGFueSwgcDogVjMpOiBudW1iZXIge1xuICAgIGNvbnN0IHJpZ2h0ID0gY2FtZXJhUmlnaHQoY2FtKTtcbiAgICBjb25zdCBhID0gdG9TY3JlZW4oY2FtLCBwKTtcbiAgICBjb25zdCBiID0gdG9TY3JlZW4oY2FtLCBzY2FsZUFuZEFkZCh2MygpLCBwLCByaWdodCwgMSkpO1xuICAgIGNvbnN0IGQgPSBNYXRoLmh5cG90KGIueCAtIGEueCwgYi55IC0gYS55KTtcbiAgICBpZiAoIShkID4gRVBTSUxPTikgfHwgIWEudmlzaWJsZSkge1xuICAgICAgICAvLyBCZWhpbmQgdGhlIGNhbWVyYSBvciBkZWdlbmVyYXRlOiB1c2UgdGhlIGRpc3RhbmNlIHRvIHRoZSBjYW1lcmEuXG4gICAgICAgIGNvbnN0IGRpc3QgPSBsZW4oc3ViKHYzKCksIHAsIGNhbWVyYVBvc2l0aW9uKGNhbSkpKTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KGRpc3QsIDEpICogMC4wMDI7XG4gICAgfVxuICAgIHJldHVybiAxIC8gZDtcbn1cblxuLyoqIEludGVyc2VjdGlvbiBvZiBhIHJheSB3aXRoIGEgcGxhbmUgKHBvaW50ICsgbm9ybWFsKTsgbnVsbCBpZiBwYXJhbGxlbCBvciBiZWhpbmQuICovXG5leHBvcnQgZnVuY3Rpb24gcmF5UGxhbmUocmF5OiBSYXksIHBvaW50OiBWMywgbm9ybWFsOiBWMywgYWxsb3dCZWhpbmQgPSBmYWxzZSk6IFYzIHwgbnVsbCB7XG4gICAgY29uc3QgZGVub20gPSBkb3QocmF5LmQsIG5vcm1hbCk7XG4gICAgaWYgKE1hdGguYWJzKGRlbm9tKSA8IDFlLTYpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHQgPSBkb3Qoc3ViKHYzKCksIHBvaW50LCByYXkubyksIG5vcm1hbCkgLyBkZW5vbTtcbiAgICBpZiAodCA8IDAgJiYgIWFsbG93QmVoaW5kKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gc2NhbGVBbmRBZGQodjMoKSwgcmF5Lm8sIHJheS5kLCB0KTtcbn1cblxuLyoqIFBvaW50IG9uIHRoZSBsaW5lIChvcmlnaW4gKyBzICogZGlyKSBjbG9zZXN0IHRvIHRoZSByYXkuICovXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VzdE9uTGluZShyYXk6IFJheSwgb3JpZ2luOiBWMywgZGlyOiBWMyk6IFYzIHwgbnVsbCB7XG4gICAgLy8gTWluaW1pemUgfChvMSArIHMgZDEpIC0gKG8yICsgdCBkMil8LlxuICAgIGNvbnN0IGQxID0gbm9ybWFsaXplKHYzKCksIGRpcik7XG4gICAgY29uc3QgZDIgPSByYXkuZDtcbiAgICBjb25zdCByID0gc3ViKHYzKCksIG9yaWdpbiwgcmF5Lm8pO1xuICAgIGNvbnN0IGEgPSBkb3QoZDEsIGQxKTtcbiAgICBjb25zdCBiID0gZG90KGQxLCBkMik7XG4gICAgY29uc3QgYyA9IGRvdChkMiwgZDIpO1xuICAgIGNvbnN0IGQgPSBkb3QoZDEsIHIpO1xuICAgIGNvbnN0IGUgPSBkb3QoZDIsIHIpO1xuICAgIGNvbnN0IGRlbm9tID0gYSAqIGMgLSBiICogYjtcbiAgICBpZiAoTWF0aC5hYnMoZGVub20pIDwgMWUtOCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcyA9IChiICogZSAtIGMgKiBkKSAvIGRlbm9tO1xuICAgIHJldHVybiBzY2FsZUFuZEFkZCh2MygpLCBvcmlnaW4sIGQxLCBzKTtcbn1cblxuLyoqIERpc3RhbmNlIGZyb20gcG9pbnQgKHB4LCBweSkgdG8gdGhlIHNlZ21lbnQgYS1iIGluIHNjcmVlbiBzcGFjZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXN0VG9TZWdtZW50KHB4OiBudW1iZXIsIHB5OiBudW1iZXIsIGF4OiBudW1iZXIsIGF5OiBudW1iZXIsIGJ4OiBudW1iZXIsIGJ5OiBudW1iZXIpOiB7IGRpc3Q6IG51bWJlcjsgZjogbnVtYmVyIH0ge1xuICAgIGNvbnN0IGR4ID0gYnggLSBheDtcbiAgICBjb25zdCBkeSA9IGJ5IC0gYXk7XG4gICAgY29uc3QgbDIgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICBsZXQgZiA9IGwyID4gMCA/ICgocHggLSBheCkgKiBkeCArIChweSAtIGF5KSAqIGR5KSAvIGwyIDogMDtcbiAgICBmID0gZiA8IDAgPyAwIDogZiA+IDEgPyAxIDogZjtcbiAgICBjb25zdCB4ID0gYXggKyBkeCAqIGYgLSBweDtcbiAgICBjb25zdCB5ID0gYXkgKyBkeSAqIGYgLSBweTtcbiAgICByZXR1cm4geyBkaXN0OiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSksIGYgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvaW50SW5Qb2x5Z29uKHB4OiBudW1iZXIsIHB5OiBudW1iZXIsIHB0czogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9W10pOiBib29sZWFuIHtcbiAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSBwdHMubGVuZ3RoIC0gMTsgaSA8IHB0cy5sZW5ndGg7IGogPSBpKyspIHtcbiAgICAgICAgY29uc3QgYSA9IHB0c1tpXTtcbiAgICAgICAgY29uc3QgYiA9IHB0c1tqXTtcbiAgICAgICAgaWYgKChhLnkgPiBweSkgIT09IChiLnkgPiBweSkgJiYgcHggPCAoKGIueCAtIGEueCkgKiAocHkgLSBhLnkpKSAvIChiLnkgLSBhLnkpICsgYS54KSBpbnNpZGUgPSAhaW5zaWRlO1xuICAgIH1cbiAgICByZXR1cm4gaW5zaWRlO1xufVxuXG4vKiogQSBwbGFuZSBmYWNpbmcgdGhlIGNhbWVyYSB0aHJvdWdoIGEgcG9pbnQgKGZvciBmcmVlIGRyYWdnaW5nKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2aWV3UGxhbmVOb3JtYWwoY2FtOiBhbnksIG91dDogVjMgPSB2MygpKTogVjMge1xuICAgIHJldHVybiBjYW1lcmFGb3J3YXJkKGNhbSwgb3V0KTtcbn1cblxuLyoqIFJpZ2h0IC8gdXAgYXhlcyBwZXJwZW5kaWN1bGFyIHRvIGBuYC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwbGFuZUJhc2lzKG46IFYzKTogeyB1OiBWMzsgdzogVjMgfSB7XG4gICAgY29uc3QgdXAgPSBNYXRoLmFicyhuLnkpIDwgMC45OSA/IHYzKDAsIDEsIDApIDogdjMoMSwgMCwgMCk7XG4gICAgY29uc3QgdSA9IG5vcm1hbGl6ZSh2MygpLCBjcm9zcyh2MygpLCB1cCwgbikpO1xuICAgIGNvbnN0IHcgPSBub3JtYWxpemUodjMoKSwgY3Jvc3ModjMoKSwgbiwgdSkpO1xuICAgIHJldHVybiB7IHUsIHcgfTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1vdXNlIGV2ZW50c1xuXG5leHBvcnQgdHlwZSBFdmVudENvb3JkcyA9ICdldmVudCcgfCAnZXZlbnQtZmxpcHBlZCcgfCAnZXZlbnQtY3NzJyB8ICdldmVudC1jc3MtZmxpcHBlZCcgfCAnY2xpZW50JyB8ICd1bmtub3duJztcblxubGV0IGNvb3JkTW9kZTogRXZlbnRDb29yZHMgPSAndW5rbm93bic7XG5sZXQgY29vcmRTYW1wbGVzID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZW50Q29vcmRNb2RlKCk6IEV2ZW50Q29vcmRzIHtcbiAgICByZXR1cm4gY29vcmRNb2RlO1xufVxuXG5mdW5jdGlvbiBjYW52YXNFbGVtZW50KCk6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYyA9IChjYygpLmdhbWUgYXMgYW55KS5jYW52YXMgYXMgSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsO1xuICAgICAgICBpZiAoYyAmJiB0eXBlb2YgKGMgYXMgYW55KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpIHJldHVybiBjO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKSA6IG51bGw7XG59XG5cbi8qKlxuICogU2NyZWVuIHBpeGVscyAoYm90dG9tLWxlZnQgb3JpZ2luKSBvZiBhIHNjZW5lIG1vdXNlIGV2ZW50LiBUaGUgZWRpdG9yJ3NcbiAqIGV2ZW50IHgveSBjb252ZW50aW9uIGlzIGRldGVjdGVkIGZyb20gdGhlIERPTSBjb29yZGluYXRlcyBvbiBmaXJzdCB1c2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmVudFRvU2NyZWVuKGNhbTogYW55LCBldjogYW55KTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNFbGVtZW50KCk7XG4gICAgY29uc3QgaGFzQ2xpZW50ID0gdHlwZW9mIGV2LmNsaWVudFggPT09ICdudW1iZXInICYmIHR5cGVvZiBldi5jbGllbnRZID09PSAnbnVtYmVyJztcbiAgICBsZXQgZnJvbUNsaWVudDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGNzczogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgc3g6IG51bWJlcjsgc3k6IG51bWJlcjsgaDogbnVtYmVyIH0gfCBudWxsID0gbnVsbDtcbiAgICBpZiAoY2FudmFzICYmIGhhc0NsaWVudCkge1xuICAgICAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAocmVjdC53aWR0aCA+IDAgJiYgcmVjdC5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzeCA9IGNhbS53aWR0aCAvIHJlY3Qud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBzeSA9IGNhbS5oZWlnaHQgLyByZWN0LmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGN4ID0gZXYuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgIGNvbnN0IGN5ID0gZXYuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICAgICAgY3NzID0geyB4OiBjeCwgeTogY3ksIHN4LCBzeSwgaDogcmVjdC5oZWlnaHQgfTtcbiAgICAgICAgICAgIGZyb21DbGllbnQgPSB7IHg6IGN4ICogc3gsIHk6IChyZWN0LmhlaWdodCAtIGN5KSAqIHN5IH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgaGFzWFkgPSB0eXBlb2YgZXYueCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGV2LnkgPT09ICdudW1iZXInO1xuICAgIGlmIChjb29yZE1vZGUgPT09ICd1bmtub3duJyB8fCAoY29vcmRNb2RlID09PSAnY2xpZW50JyAmJiBjb29yZFNhbXBsZXMgPCA1KSkge1xuICAgICAgICBjb29yZFNhbXBsZXMrKztcbiAgICAgICAgaWYgKGhhc1hZICYmIGNzcykge1xuICAgICAgICAgICAgY29uc3QgbmVhciA9IChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4gTWF0aC5hYnMoYSAtIGIpIDwgMi41O1xuICAgICAgICAgICAgaWYgKG5lYXIoZXYueCwgY3NzLnggKiBjc3Muc3gpICYmIG5lYXIoZXYueSwgKGNzcy5oIC0gY3NzLnkpICogY3NzLnN5KSkgY29vcmRNb2RlID0gJ2V2ZW50JztcbiAgICAgICAgICAgIGVsc2UgaWYgKG5lYXIoZXYueCwgY3NzLnggKiBjc3Muc3gpICYmIG5lYXIoZXYueSwgY3NzLnkgKiBjc3Muc3kpKSBjb29yZE1vZGUgPSAnZXZlbnQtZmxpcHBlZCc7XG4gICAgICAgICAgICBlbHNlIGlmIChuZWFyKGV2LngsIGNzcy54KSAmJiBuZWFyKGV2LnksIGNzcy5oIC0gY3NzLnkpKSBjb29yZE1vZGUgPSAnZXZlbnQtY3NzJztcbiAgICAgICAgICAgIGVsc2UgaWYgKG5lYXIoZXYueCwgY3NzLngpICYmIG5lYXIoZXYueSwgY3NzLnkpKSBjb29yZE1vZGUgPSAnZXZlbnQtY3NzLWZsaXBwZWQnO1xuICAgICAgICAgICAgZWxzZSBjb29yZE1vZGUgPSAnY2xpZW50JztcbiAgICAgICAgfSBlbHNlIGlmIChoYXNYWSkge1xuICAgICAgICAgICAgY29vcmRNb2RlID0gJ2V2ZW50JztcbiAgICAgICAgfSBlbHNlIGlmIChjc3MpIHtcbiAgICAgICAgICAgIGNvb3JkTW9kZSA9ICdjbGllbnQnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN3aXRjaCAoY29vcmRNb2RlKSB7XG4gICAgICAgIGNhc2UgJ2V2ZW50JzpcbiAgICAgICAgICAgIHJldHVybiB7IHg6IGV2LngsIHk6IGV2LnkgfTtcbiAgICAgICAgY2FzZSAnZXZlbnQtZmxpcHBlZCc6XG4gICAgICAgICAgICByZXR1cm4geyB4OiBldi54LCB5OiBjYW0uaGVpZ2h0IC0gZXYueSB9O1xuICAgICAgICBjYXNlICdldmVudC1jc3MnOlxuICAgICAgICAgICAgcmV0dXJuIGNzcyA/IHsgeDogZXYueCAqIGNzcy5zeCwgeTogZXYueSAqIGNzcy5zeSB9IDogeyB4OiBldi54LCB5OiBldi55IH07XG4gICAgICAgIGNhc2UgJ2V2ZW50LWNzcy1mbGlwcGVkJzpcbiAgICAgICAgICAgIHJldHVybiBjc3MgPyB7IHg6IGV2LnggKiBjc3Muc3gsIHk6IChjc3MuaCAtIGV2LnkpICogY3NzLnN5IH0gOiB7IHg6IGV2LngsIHk6IGNhbS5oZWlnaHQgLSBldi55IH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZnJvbUNsaWVudCA/PyB7IHg6IGV2LnggPz8gMCwgeTogZXYueSA/PyAwIH07XG4gICAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRE9NIG92ZXJsYXlcblxuaW50ZXJmYWNlIE92ZXJsYXkge1xuICAgIHJvb3Q6IEhUTUxEaXZFbGVtZW50O1xuICAgIGxhYmVsczogSFRNTERpdkVsZW1lbnRbXTtcbiAgICB1c2VkOiBudW1iZXI7XG4gICAgcmVjdDogSFRNTERpdkVsZW1lbnQ7XG4gICAgdGlwOiBIVE1MRGl2RWxlbWVudDtcbn1cblxubGV0IG92ZXJsYXk6IE92ZXJsYXkgfCBudWxsID0gbnVsbDtcblxuZnVuY3Rpb24gZW5zdXJlT3ZlcmxheSgpOiBPdmVybGF5IHwgbnVsbCB7XG4gICAgaWYgKG92ZXJsYXkgJiYgb3ZlcmxheS5yb290LmlzQ29ubmVjdGVkKSByZXR1cm4gb3ZlcmxheTtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhZG9jdW1lbnQuYm9keSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvb3QuaWQgPSAnc3BsaW5lcy1vdmVybGF5JztcbiAgICByb290LnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7bGVmdDowO3RvcDowO3dpZHRoOjA7aGVpZ2h0OjA7cG9pbnRlci1ldmVudHM6bm9uZTt6LWluZGV4OjIxNDc0ODMwMDA7Zm9udDoxMXB4LzEuMiBzYW5zLXNlcmlmOyc7XG4gICAgY29uc3QgcmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJlY3Quc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDtkaXNwbGF5Om5vbmU7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDgwLDE3MCwyNTUsMC45KTtiYWNrZ3JvdW5kOnJnYmEoODAsMTcwLDI1NSwwLjE1KTtwb2ludGVyLWV2ZW50czpub25lOyc7XG4gICAgcm9vdC5hcHBlbmRDaGlsZChyZWN0KTtcbiAgICBjb25zdCB0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aXAuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDtkaXNwbGF5Om5vbmU7cGFkZGluZzoycHggNnB4O2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQ6cmdiYSgyMCwyMCwyMCwwLjg1KTtjb2xvcjojZGRkO3doaXRlLXNwYWNlOm5vd3JhcDtwb2ludGVyLWV2ZW50czpub25lOyc7XG4gICAgcm9vdC5hcHBlbmRDaGlsZCh0aXApO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocm9vdCk7XG4gICAgb3ZlcmxheSA9IHsgcm9vdCwgbGFiZWxzOiBbXSwgdXNlZDogMCwgcmVjdCwgdGlwIH07XG4gICAgcmV0dXJuIG92ZXJsYXk7XG59XG5cbmZ1bmN0aW9uIGNzc09mKGNhbTogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlcik6IHsgbGVmdDogbnVtYmVyOyB0b3A6IG51bWJlciB9IHwgbnVsbCB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzRWxlbWVudCgpO1xuICAgIGlmICghY2FudmFzKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCByID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmICghKHIud2lkdGggPiAwKSB8fCAhKHIuaGVpZ2h0ID4gMCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7IGxlZnQ6IHIubGVmdCArICh4ICogci53aWR0aCkgLyBjYW0ud2lkdGgsIHRvcDogci50b3AgKyByLmhlaWdodCAtICh5ICogci5oZWlnaHQpIC8gY2FtLmhlaWdodCB9O1xufVxuXG4vKiogU3RhcnRzIGEgZnJhbWUgb2Ygb3ZlcmxheSBsYWJlbHMuICovXG5leHBvcnQgZnVuY3Rpb24gYmVnaW5MYWJlbHMoKTogdm9pZCB7XG4gICAgY29uc3QgbyA9IGVuc3VyZU92ZXJsYXkoKTtcbiAgICBpZiAobykgby51c2VkID0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZExhYmVsKGNhbTogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlciwgdGV4dDogc3RyaW5nLCBjb2xvciA9ICcjZmZmJyk6IHZvaWQge1xuICAgIGNvbnN0IG8gPSBlbnN1cmVPdmVybGF5KCk7XG4gICAgaWYgKCFvKSByZXR1cm47XG4gICAgY29uc3QgY3NzID0gY3NzT2YoY2FtLCB4LCB5KTtcbiAgICBpZiAoIWNzcykgcmV0dXJuO1xuICAgIGxldCBlbCA9IG8ubGFiZWxzW28udXNlZF07XG4gICAgaWYgKCFlbCkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlbC5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmZpeGVkO3RyYW5zZm9ybTp0cmFuc2xhdGUoNnB4LC0xMDAlKTt0ZXh0LXNoYWRvdzowIDAgMnB4ICMwMDAsMCAwIDJweCAjMDAwO3BvaW50ZXItZXZlbnRzOm5vbmU7d2hpdGUtc3BhY2U6bm93cmFwOyc7XG4gICAgICAgIG8ucm9vdC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIG8ubGFiZWxzLnB1c2goZWwpO1xuICAgIH1cbiAgICBvLnVzZWQrKztcbiAgICBpZiAoZWwudGV4dENvbnRlbnQgIT09IHRleHQpIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBlbC5zdHlsZS5jb2xvciA9IGNvbG9yO1xuICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtjc3MubGVmdH1weGA7XG4gICAgZWwuc3R5bGUudG9wID0gYCR7Y3NzLnRvcH1weGA7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59XG5cbi8qKiBIaWRlcyBsYWJlbHMgbm90IHVzZWQgdGhpcyBmcmFtZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmRMYWJlbHMoKTogdm9pZCB7XG4gICAgY29uc3QgbyA9IG92ZXJsYXk7XG4gICAgaWYgKCFvKSByZXR1cm47XG4gICAgZm9yIChsZXQgaSA9IG8udXNlZDsgaSA8IG8ubGFiZWxzLmxlbmd0aDsgaSsrKSBvLmxhYmVsc1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1JlY3QoY2FtOiBhbnksIHgwOiBudW1iZXIsIHkwOiBudW1iZXIsIHgxOiBudW1iZXIsIHkxOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBvID0gZW5zdXJlT3ZlcmxheSgpO1xuICAgIGlmICghbykgcmV0dXJuO1xuICAgIGNvbnN0IGEgPSBjc3NPZihjYW0sIE1hdGgubWluKHgwLCB4MSksIE1hdGgubWF4KHkwLCB5MSkpO1xuICAgIGNvbnN0IGIgPSBjc3NPZihjYW0sIE1hdGgubWF4KHgwLCB4MSksIE1hdGgubWluKHkwLCB5MSkpO1xuICAgIGlmICghYSB8fCAhYikgcmV0dXJuO1xuICAgIG8ucmVjdC5zdHlsZS5sZWZ0ID0gYCR7YS5sZWZ0fXB4YDtcbiAgICBvLnJlY3Quc3R5bGUudG9wID0gYCR7YS50b3B9cHhgO1xuICAgIG8ucmVjdC5zdHlsZS53aWR0aCA9IGAke01hdGgubWF4KDAsIGIubGVmdCAtIGEubGVmdCl9cHhgO1xuICAgIG8ucmVjdC5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLm1heCgwLCBiLnRvcCAtIGEudG9wKX1weGA7XG4gICAgby5yZWN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZVJlY3QoKTogdm9pZCB7XG4gICAgaWYgKG92ZXJsYXkpIG92ZXJsYXkucmVjdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1RpcChjYW06IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG8gPSBlbnN1cmVPdmVybGF5KCk7XG4gICAgaWYgKCFvKSByZXR1cm47XG4gICAgY29uc3QgY3NzID0gY3NzT2YoY2FtLCB4LCB5KTtcbiAgICBpZiAoIWNzcykgcmV0dXJuO1xuICAgIG8udGlwLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBvLnRpcC5zdHlsZS5sZWZ0ID0gYCR7Y3NzLmxlZnQgKyAxNH1weGA7XG4gICAgby50aXAuc3R5bGUudG9wID0gYCR7Y3NzLnRvcCArIDE0fXB4YDtcbiAgICBvLnRpcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVUaXAoKTogdm9pZCB7XG4gICAgaWYgKG92ZXJsYXkpIG92ZXJsYXkudGlwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmIChvdmVybGF5Py5yb290LmlzQ29ubmVjdGVkKSBvdmVybGF5LnJvb3QucmVtb3ZlKCk7XG4gICAgb3ZlcmxheSA9IG51bGw7XG59XG4iLCAiLyoqXG4gKiBEcmF3aW5nIGludG8gdGhlIFNjZW5lIHZpZXcgY2FtZXJhJ3MgR2VvbWV0cnlSZW5kZXJlci4gU2hhcGVzIGFkZGVkIG9uXG4gKiBEaXJlY3Rvci5FVkVOVF9CRUZPUkVfQ09NTUlUIHJlbmRlciBpbiB0aGUgc2FtZSBmcmFtZS5cbiAqXG4gKiBTaXplcyBnaXZlbiBpbiBwaXhlbHMgYXJlIGNvbnZlcnRlZCB0byB3b3JsZCB1bml0cyBhdCB0aGUgc2hhcGUncyBwb3NpdGlvblxuICogc28gaGFuZGxlcyBrZWVwIGEgY29uc3RhbnQgc2l6ZSBvbiBzY3JlZW4uXG4gKi9cbmltcG9ydCB7IFYzLCB2Mywgc2V0LCBhZGQsIHN1Yiwgc2NhbGUsIHNjYWxlQW5kQWRkLCBub3JtYWxpemUsIGNyb3NzLCBsZW5TcSwgY29weSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL21hdGgnO1xuaW1wb3J0IHsgY2MgfSBmcm9tICcuL2Vudic7XG5pbXBvcnQgeyBjYW1lcmFGb3J3YXJkLCBjYW1lcmFSaWdodCwgY2FtZXJhVXAsIHdvcmxkUGVyUGl4ZWwsIHRvU2NyZWVuIH0gZnJvbSAnLi92aWV3JztcblxuZXhwb3J0IHR5cGUgQ29sb3IgPSBpbXBvcnQoJ2NjJykuQ29sb3I7XG5cbmxldCBncjogYW55ID0gbnVsbDtcbmxldCBjYW06IGFueSA9IG51bGw7XG5jb25zdCBjYW1SaWdodCA9IHYzKCk7XG5jb25zdCBjYW1VcCA9IHYzKCk7XG5jb25zdCBjYW1Gd2QgPSB2MygpO1xuXG4vKiogU3RhcnRzIGRyYXdpbmcgZm9yIHRoaXMgZnJhbWUuIEZhbHNlIGlmIHRoZSBjYW1lcmEgaGFzIG5vIGdlb21ldHJ5IHJlbmRlcmVyLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlZ2luRHJhdyhjYW1lcmE6IGFueSk6IGJvb2xlYW4ge1xuICAgIGNhbSA9IGNhbWVyYTtcbiAgICBpZiAoIWNhbWVyYS5nZW9tZXRyeVJlbmRlcmVyICYmIGNhbWVyYS5pbml0R2VvbWV0cnlSZW5kZXJlcikgY2FtZXJhLmluaXRHZW9tZXRyeVJlbmRlcmVyKCk7XG4gICAgZ3IgPSBjYW1lcmEuZ2VvbWV0cnlSZW5kZXJlciB8fCBudWxsO1xuICAgIGlmICghZ3IpIHJldHVybiBmYWxzZTtcbiAgICBjYW1lcmFSaWdodChjYW1lcmEsIGNhbVJpZ2h0KTtcbiAgICBjYW1lcmFVcChjYW1lcmEsIGNhbVVwKTtcbiAgICBjYW1lcmFGb3J3YXJkKGNhbWVyYSwgY2FtRndkKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGEgPSAyNTUpOiBDb2xvciB7XG4gICAgcmV0dXJuIG5ldyAoY2MoKS5Db2xvcikociwgZywgYiwgYSk7XG59XG5cbi8qKiBVbml0eS1saWtlIHBhbGV0dGUuICovXG5leHBvcnQgY29uc3QgQ29sb3JzID0ge1xuICAgIGdldCBjdXJ2ZSgpIHsgcmV0dXJuIGMoJ2N1cnZlJywgMjAwLCAyMDAsIDIwMCk7IH0sXG4gICAgZ2V0IGN1cnZlRGltKCkgeyByZXR1cm4gYygnY3VydmVEaW0nLCAxNDAsIDE0MCwgMTQwLCAyMDApOyB9LFxuICAgIGdldCBjdXJ2ZVNlbGVjdGVkKCkgeyByZXR1cm4gYygnY3VydmVTZWxlY3RlZCcsIDI0MCwgMjQwLCAyNDApOyB9LFxuICAgIGdldCBjdXJ2ZUhvdmVyKCkgeyByZXR1cm4gYygnY3VydmVIb3ZlcicsIDI1NSwgMjU1LCAyNTUpOyB9LFxuICAgIGdldCBrbm90KCkgeyByZXR1cm4gYygna25vdCcsIDUyLCA1MiwgNTIpOyB9LFxuICAgIGdldCBrbm90T3V0bGluZSgpIHsgcmV0dXJuIGMoJ2tub3RPdXRsaW5lJywgMjMwLCAyMzAsIDIzMCk7IH0sXG4gICAgZ2V0IHNlbGVjdGVkKCkgeyByZXR1cm4gYygnc2VsZWN0ZWQnLCA1NCwgMTc5LCAyNTUpOyB9LFxuICAgIGdldCBob3ZlcigpIHsgcmV0dXJuIGMoJ2hvdmVyJywgMjU1LCAyNTUsIDI1NSk7IH0sXG4gICAgZ2V0IGxpbmtlZCgpIHsgcmV0dXJuIGMoJ2xpbmtlZCcsIDI1NSwgMTk2LCA2NCk7IH0sXG4gICAgZ2V0IHRhbmdlbnRMaW5lKCkgeyByZXR1cm4gYygndGFuZ2VudExpbmUnLCAxNjAsIDE2MCwgMTYwKTsgfSxcbiAgICBnZXQgdGFuZ2VudCgpIHsgcmV0dXJuIGMoJ3RhbmdlbnQnLCAyMTAsIDIxMCwgMjEwKTsgfSxcbiAgICBnZXQgZmxvdygpIHsgcmV0dXJuIGMoJ2Zsb3cnLCAyNTUsIDI1NSwgMjU1LCAxNDApOyB9LFxuICAgIGdldCBub3JtYWwoKSB7IHJldHVybiBjKCdub3JtYWwnLCAxMjAsIDIzMCwgMTIwLCAyMDApOyB9LFxuICAgIGdldCBwcmV2aWV3KCkgeyByZXR1cm4gYygncHJldmlldycsIDI1NSwgMjU1LCAyNTUsIDE3MCk7IH0sXG4gICAgZ2V0IGluc2VydCgpIHsgcmV0dXJuIGMoJ2luc2VydCcsIDEyMCwgMjIwLCAxMjApOyB9LFxuICAgIGdldCBheGlzWCgpIHsgcmV0dXJuIGMoJ2F4aXNYJywgMjE5LCA2MiwgMjkpOyB9LFxuICAgIGdldCBheGlzWSgpIHsgcmV0dXJuIGMoJ2F4aXNZJywgMTU0LCAyNDMsIDcyKTsgfSxcbiAgICBnZXQgYXhpc1ooKSB7IHJldHVybiBjKCdheGlzWicsIDU4LCAxMjIsIDI0OCk7IH0sXG4gICAgZ2V0IGF4aXNIb3QoKSB7IHJldHVybiBjKCdheGlzSG90JywgMjQ2LCAyNDIsIDUwKTsgfSxcbiAgICBnZXQgYXhpc1ZpZXcoKSB7IHJldHVybiBjKCdheGlzVmlldycsIDIyMCwgMjIwLCAyMjApOyB9LFxuICAgIGdldCBwbGFuZUZpbGwoKSB7IHJldHVybiBjKCdwbGFuZUZpbGwnLCAyNTUsIDI1NSwgMjU1LCA0MCk7IH0sXG59O1xuXG5jb25zdCBjYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBDb2xvcj4oKTtcbmZ1bmN0aW9uIGMobmFtZTogc3RyaW5nLCByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhID0gMjU1KTogQ29sb3Ige1xuICAgIGxldCBjb2wgPSBjYWNoZS5nZXQobmFtZSk7XG4gICAgaWYgKCFjb2wpIHtcbiAgICAgICAgY29sID0gY29sb3IociwgZywgYiwgYSk7XG4gICAgICAgIGNhY2hlLnNldChuYW1lLCBjb2wpO1xuICAgIH1cbiAgICByZXR1cm4gY29sO1xufVxuXG4vKiogQSBjb3B5IG9mIGEgY29sb3Igd2l0aCBhbm90aGVyIGFscGhhLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhBbHBoYShjb2w6IENvbG9yLCBhOiBudW1iZXIpOiBDb2xvciB7XG4gICAgY29uc3Qga2V5ID0gYCR7Y29sLnJ9LCR7Y29sLmd9LCR7Y29sLmJ9LCR7YX1gO1xuICAgIGxldCByZXMgPSBjYWNoZS5nZXQoa2V5KTtcbiAgICBpZiAoIXJlcykge1xuICAgICAgICByZXMgPSBjb2xvcihjb2wuciwgY29sLmcsIGNvbC5iLCBhKTtcbiAgICAgICAgY2FjaGUuc2V0KGtleSwgcmVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmUoYTogVjMsIGI6IFYzLCBjb2w6IENvbG9yLCBkZXB0aFRlc3QgPSBmYWxzZSk6IHZvaWQge1xuICAgIGdyLmFkZExpbmUoYSwgYiwgY29sLCBkZXB0aFRlc3QpO1xufVxuXG5jb25zdCBfbyA9IHYzKCk7XG5jb25zdCBfYSA9IHYzKCk7XG5jb25zdCBfYiA9IHYzKCk7XG5cbi8qKiBBIGxpbmUgYHdpZHRoUHhgIHdpZGUsIGRyYXduIGFzIHBhcmFsbGVsIGxpbmVzIG9mZnNldCBvbiBzY3JlZW4uICovXG5leHBvcnQgZnVuY3Rpb24gdGhpY2tMaW5lKGE6IFYzLCBiOiBWMywgY29sOiBDb2xvciwgd2lkdGhQeDogbnVtYmVyLCBkZXB0aFRlc3QgPSBmYWxzZSk6IHZvaWQge1xuICAgIGdyLmFkZExpbmUoYSwgYiwgY29sLCBkZXB0aFRlc3QpO1xuICAgIGlmICh3aWR0aFB4IDw9IDEuMikgcmV0dXJuO1xuICAgIC8vIE9mZnNldCBwZXJwZW5kaWN1bGFyIHRvIHRoZSBsaW5lLCBpbiB0aGUgdmlldyBwbGFuZS5cbiAgICBzdWIoX28sIGIsIGEpO1xuICAgIGNyb3NzKF9vLCBfbywgY2FtRndkKTtcbiAgICBpZiAobGVuU3EoX28pIDwgMWUtMTIpIHJldHVybjtcbiAgICBub3JtYWxpemUoX28sIF9vKTtcbiAgICBjb25zdCB3cHAgPSB3b3JsZFBlclBpeGVsKGNhbSwgYSk7XG4gICAgY29uc3QgaGFsZiA9IE1hdGguZmxvb3Iod2lkdGhQeCAvIDIpO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGhhbGY7IGkrKykge1xuICAgICAgICBjb25zdCBzID0gd3BwICogaSAqIDAuNztcbiAgICAgICAgZ3IuYWRkTGluZShzY2FsZUFuZEFkZChfYSwgYSwgX28sIHMpLCBzY2FsZUFuZEFkZChfYiwgYiwgX28sIHMpLCBjb2wsIGRlcHRoVGVzdCk7XG4gICAgICAgIGdyLmFkZExpbmUoc2NhbGVBbmRBZGQoX2EsIGEsIF9vLCAtcyksIHNjYWxlQW5kQWRkKF9iLCBiLCBfbywgLXMpLCBjb2wsIGRlcHRoVGVzdCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9seWxpbmUocG9pbnRzOiBWM1tdLCBjb2w6IENvbG9yLCB3aWR0aFB4ID0gMSwgZGVwdGhUZXN0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHdpZHRoUHggPiAxLjIpIHRoaWNrTGluZShwb2ludHNbaV0sIHBvaW50c1tpICsgMV0sIGNvbCwgd2lkdGhQeCwgZGVwdGhUZXN0KTtcbiAgICAgICAgZWxzZSBnci5hZGRMaW5lKHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSwgY29sLCBkZXB0aFRlc3QpO1xuICAgIH1cbn1cblxuY29uc3QgY2lyY2xlUHRzOiBWM1tdID0gW107XG5mdW5jdGlvbiBzY3JlZW5DaXJjbGVQb2ludHMoY2VudGVyOiBWMywgcmFkaXVzUHg6IG51bWJlciwgc2VnbWVudHM6IG51bWJlcik6IFYzW10ge1xuICAgIGNvbnN0IHIgPSB3b3JsZFBlclBpeGVsKGNhbSwgY2VudGVyKSAqIHJhZGl1c1B4O1xuICAgIHdoaWxlIChjaXJjbGVQdHMubGVuZ3RoIDw9IHNlZ21lbnRzKSBjaXJjbGVQdHMucHVzaCh2MygpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzZWdtZW50czsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGEgPSAoaSAvIHNlZ21lbnRzKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICBjb25zdCBwID0gY2lyY2xlUHRzW2ldO1xuICAgICAgICBjb3B5KHAsIGNlbnRlcik7XG4gICAgICAgIHNjYWxlQW5kQWRkKHAsIHAsIGNhbVJpZ2h0LCBNYXRoLmNvcyhhKSAqIHIpO1xuICAgICAgICBzY2FsZUFuZEFkZChwLCBwLCBjYW1VcCwgTWF0aC5zaW4oYSkgKiByKTtcbiAgICB9XG4gICAgcmV0dXJuIGNpcmNsZVB0cztcbn1cblxuLyoqIENpcmNsZSBmYWNpbmcgdGhlIGNhbWVyYS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaXJjbGUoY2VudGVyOiBWMywgcmFkaXVzUHg6IG51bWJlciwgY29sOiBDb2xvciwgc2VnbWVudHMgPSAxNiwgZGVwdGhUZXN0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjb25zdCBwdHMgPSBzY3JlZW5DaXJjbGVQb2ludHMoY2VudGVyLCByYWRpdXNQeCwgc2VnbWVudHMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudHM7IGkrKykgZ3IuYWRkTGluZShwdHNbaV0sIHB0c1tpICsgMV0sIGNvbCwgZGVwdGhUZXN0KTtcbn1cblxuLyoqIEZpbGxlZCBkaXNjIGZhY2luZyB0aGUgY2FtZXJhLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2MoY2VudGVyOiBWMywgcmFkaXVzUHg6IG51bWJlciwgY29sOiBDb2xvciwgc2VnbWVudHMgPSAxMiwgZGVwdGhUZXN0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjb25zdCBwdHMgPSBzY3JlZW5DaXJjbGVQb2ludHMoY2VudGVyLCByYWRpdXNQeCwgc2VnbWVudHMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudHM7IGkrKykgZ3IuYWRkVHJpYW5nbGUoY2VudGVyLCBwdHNbaV0sIHB0c1tpICsgMV0sIGNvbCwgZmFsc2UsIGRlcHRoVGVzdCwgdHJ1ZSk7XG59XG5cbi8qKiBTcXVhcmUgZmFjaW5nIHRoZSBjYW1lcmEgKGZpbGxlZCBvciBvdXRsaW5lKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmUoY2VudGVyOiBWMywgaGFsZlB4OiBudW1iZXIsIGNvbDogQ29sb3IsIGZpbGxlZDogYm9vbGVhbiwgZGVwdGhUZXN0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjb25zdCBoID0gd29ybGRQZXJQaXhlbChjYW0sIGNlbnRlcikgKiBoYWxmUHg7XG4gICAgY29uc3QgcDAgPSBhZGQodjMoKSwgc2NhbGVBbmRBZGQodjMoKSwgY2VudGVyLCBjYW1SaWdodCwgLWgpLCBzY2FsZSh2MygpLCBjYW1VcCwgLWgpKTtcbiAgICBjb25zdCBwMSA9IGFkZCh2MygpLCBzY2FsZUFuZEFkZCh2MygpLCBjZW50ZXIsIGNhbVJpZ2h0LCBoKSwgc2NhbGUodjMoKSwgY2FtVXAsIC1oKSk7XG4gICAgY29uc3QgcDIgPSBhZGQodjMoKSwgc2NhbGVBbmRBZGQodjMoKSwgY2VudGVyLCBjYW1SaWdodCwgaCksIHNjYWxlKHYzKCksIGNhbVVwLCBoKSk7XG4gICAgY29uc3QgcDMgPSBhZGQodjMoKSwgc2NhbGVBbmRBZGQodjMoKSwgY2VudGVyLCBjYW1SaWdodCwgLWgpLCBzY2FsZSh2MygpLCBjYW1VcCwgaCkpO1xuICAgIGdyLmFkZFF1YWQocDAsIHAxLCBwMiwgcDMsIGNvbCwgIWZpbGxlZCwgZGVwdGhUZXN0LCB0cnVlKTtcbn1cblxuLyoqIERpYW1vbmQgZmFjaW5nIHRoZSBjYW1lcmEgKGZpbGxlZCBvciBvdXRsaW5lKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWFtb25kKGNlbnRlcjogVjMsIGhhbGZQeDogbnVtYmVyLCBjb2w6IENvbG9yLCBmaWxsZWQ6IGJvb2xlYW4sIGRlcHRoVGVzdCA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgaCA9IHdvcmxkUGVyUGl4ZWwoY2FtLCBjZW50ZXIpICogaGFsZlB4O1xuICAgIGNvbnN0IHAwID0gc2NhbGVBbmRBZGQodjMoKSwgY2VudGVyLCBjYW1VcCwgLWgpO1xuICAgIGNvbnN0IHAxID0gc2NhbGVBbmRBZGQodjMoKSwgY2VudGVyLCBjYW1SaWdodCwgaCk7XG4gICAgY29uc3QgcDIgPSBzY2FsZUFuZEFkZCh2MygpLCBjZW50ZXIsIGNhbVVwLCBoKTtcbiAgICBjb25zdCBwMyA9IHNjYWxlQW5kQWRkKHYzKCksIGNlbnRlciwgY2FtUmlnaHQsIC1oKTtcbiAgICBnci5hZGRRdWFkKHAwLCBwMSwgcDIsIHAzLCBjb2wsICFmaWxsZWQsIGRlcHRoVGVzdCwgdHJ1ZSk7XG59XG5cbi8qKiBDaXJjbGUgaW4gdGhlIHBsYW5lIHBlcnBlbmRpY3VsYXIgdG8gYG5vcm1hbGAgKHdvcmxkIHJhZGl1cykuICovXG5leHBvcnQgZnVuY3Rpb24gcmluZyhjZW50ZXI6IFYzLCBub3JtYWw6IFYzLCByYWRpdXM6IG51bWJlciwgY29sOiBDb2xvciwgc2VnbWVudHMgPSA0OCwgZGVwdGhUZXN0ID0gZmFsc2UsIGZyb250T25seSA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgbiA9IG5vcm1hbGl6ZSh2MygpLCBub3JtYWwpO1xuICAgIGNvbnN0IHUgPSBub3JtYWxpemUodjMoKSwgY3Jvc3ModjMoKSwgTWF0aC5hYnMobi55KSA8IDAuOTkgPyB2MygwLCAxLCAwKSA6IHYzKDEsIDAsIDApLCBuKSk7XG4gICAgY29uc3QgdyA9IGNyb3NzKHYzKCksIG4sIHUpO1xuICAgIGxldCBwcmV2OiBWMyB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IHRvQ2FtID0gdjMoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzZWdtZW50czsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGEgPSAoaSAvIHNlZ21lbnRzKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICBjb25zdCBwID0gYWRkKHYzKCksIGNlbnRlciwgYWRkKHYzKCksIHNjYWxlKHYzKCksIHUsIE1hdGguY29zKGEpICogcmFkaXVzKSwgc2NhbGUodjMoKSwgdywgTWF0aC5zaW4oYSkgKiByYWRpdXMpKSk7XG4gICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICBsZXQgZHJhdyA9IHRydWU7XG4gICAgICAgICAgICBpZiAoZnJvbnRPbmx5KSB7XG4gICAgICAgICAgICAgICAgLy8gU2tpcCB0aGUgaGFsZiBmYWNpbmcgYXdheSBmcm9tIHRoZSBjYW1lcmEuXG4gICAgICAgICAgICAgICAgY29uc3QgbWlkID0gc2NhbGUodjMoKSwgYWRkKHYzKCksIHByZXYsIHApLCAwLjUpO1xuICAgICAgICAgICAgICAgIHN1Yih0b0NhbSwgbWlkLCBjZW50ZXIpO1xuICAgICAgICAgICAgICAgIGRyYXcgPSB0b0NhbS54ICogY2FtRndkLnggKyB0b0NhbS55ICogY2FtRndkLnkgKyB0b0NhbS56ICogY2FtRndkLnogPD0gcmFkaXVzICogMC4wNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkcmF3KSBnci5hZGRMaW5lKHByZXYsIHAsIGNvbCwgZGVwdGhUZXN0KTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2ID0gcDtcbiAgICB9XG59XG5cbi8qKiBGaWxsZWQgY29uZSBmcm9tIGBiYXNlYCBwb2ludGluZyBhbG9uZyBgZGlyYCAod29ybGQgc2l6ZXMpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmUoYmFzZTogVjMsIGRpcjogVjMsIGhlaWdodDogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgY29sOiBDb2xvciwgZGVwdGhUZXN0ID0gZmFsc2UsIHNlZ21lbnRzID0gMTApOiB2b2lkIHtcbiAgICBjb25zdCBkID0gbm9ybWFsaXplKHYzKCksIGRpcik7XG4gICAgY29uc3QgYXBleCA9IHNjYWxlQW5kQWRkKHYzKCksIGJhc2UsIGQsIGhlaWdodCk7XG4gICAgY29uc3QgdSA9IG5vcm1hbGl6ZSh2MygpLCBjcm9zcyh2MygpLCBNYXRoLmFicyhkLnkpIDwgMC45OSA/IHYzKDAsIDEsIDApIDogdjMoMSwgMCwgMCksIGQpKTtcbiAgICBjb25zdCB3ID0gY3Jvc3ModjMoKSwgZCwgdSk7XG4gICAgY29uc3QgcHRzOiBWM1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2VnbWVudHM7IGkrKykge1xuICAgICAgICBjb25zdCBhID0gKGkgLyBzZWdtZW50cykgKiBNYXRoLlBJICogMjtcbiAgICAgICAgcHRzLnB1c2goYWRkKHYzKCksIGJhc2UsIGFkZCh2MygpLCBzY2FsZSh2MygpLCB1LCBNYXRoLmNvcyhhKSAqIHJhZGl1cyksIHNjYWxlKHYzKCksIHcsIE1hdGguc2luKGEpICogcmFkaXVzKSkpKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50czsgaSsrKSB7XG4gICAgICAgIGdyLmFkZFRyaWFuZ2xlKGFwZXgsIHB0c1tpXSwgcHRzW2kgKyAxXSwgY29sLCBmYWxzZSwgZGVwdGhUZXN0LCB0cnVlKTtcbiAgICAgICAgZ3IuYWRkVHJpYW5nbGUoYmFzZSwgcHRzW2kgKyAxXSwgcHRzW2ldLCBjb2wsIGZhbHNlLCBkZXB0aFRlc3QsIHRydWUpO1xuICAgIH1cbn1cblxuLyoqIEZpbGxlZCBjdWJlIHdpdGggdGhlIGdpdmVuIGF4ZXMgKGhhbGYgc2l6ZSBpbiB3b3JsZCB1bml0cykuICovXG5leHBvcnQgZnVuY3Rpb24gY3ViZShjZW50ZXI6IFYzLCBoYWxmOiBudW1iZXIsIGF4OiBWMywgYXk6IFYzLCBhejogVjMsIGNvbDogQ29sb3IsIGRlcHRoVGVzdCA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgY29ybmVyID0gKHN4OiBudW1iZXIsIHN5OiBudW1iZXIsIHN6OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgcCA9IGNvcHkodjMoKSwgY2VudGVyKTtcbiAgICAgICAgc2NhbGVBbmRBZGQocCwgcCwgYXgsIHN4ICogaGFsZik7XG4gICAgICAgIHNjYWxlQW5kQWRkKHAsIHAsIGF5LCBzeSAqIGhhbGYpO1xuICAgICAgICBzY2FsZUFuZEFkZChwLCBwLCBheiwgc3ogKiBoYWxmKTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfTtcbiAgICBjb25zdCBjMDAwID0gY29ybmVyKC0xLCAtMSwgLTEpO1xuICAgIGNvbnN0IGMxMDAgPSBjb3JuZXIoMSwgLTEsIC0xKTtcbiAgICBjb25zdCBjMTEwID0gY29ybmVyKDEsIDEsIC0xKTtcbiAgICBjb25zdCBjMDEwID0gY29ybmVyKC0xLCAxLCAtMSk7XG4gICAgY29uc3QgYzAwMSA9IGNvcm5lcigtMSwgLTEsIDEpO1xuICAgIGNvbnN0IGMxMDEgPSBjb3JuZXIoMSwgLTEsIDEpO1xuICAgIGNvbnN0IGMxMTEgPSBjb3JuZXIoMSwgMSwgMSk7XG4gICAgY29uc3QgYzAxMSA9IGNvcm5lcigtMSwgMSwgMSk7XG4gICAgY29uc3QgcSA9IChhOiBWMywgYjogVjMsIGNjMjogVjMsIGQ6IFYzKSA9PiBnci5hZGRRdWFkKGEsIGIsIGNjMiwgZCwgY29sLCBmYWxzZSwgZGVwdGhUZXN0LCB0cnVlKTtcbiAgICBxKGMwMDAsIGMxMDAsIGMxMTAsIGMwMTApO1xuICAgIHEoYzAwMSwgYzAxMSwgYzExMSwgYzEwMSk7XG4gICAgcShjMDAwLCBjMDEwLCBjMDExLCBjMDAxKTtcbiAgICBxKGMxMDAsIGMxMDEsIGMxMTEsIGMxMTApO1xuICAgIHEoYzAwMCwgYzAwMSwgYzEwMSwgYzEwMCk7XG4gICAgcShjMDEwLCBjMTEwLCBjMTExLCBjMDExKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YWQoYTogVjMsIGI6IFYzLCBjMjogVjMsIGQ6IFYzLCBjb2w6IENvbG9yLCBmaWxsZWQ6IGJvb2xlYW4sIGRlcHRoVGVzdCA9IGZhbHNlKTogdm9pZCB7XG4gICAgZ3IuYWRkUXVhZChhLCBiLCBjMiwgZCwgY29sLCAhZmlsbGVkLCBkZXB0aFRlc3QsIHRydWUpO1xufVxuXG4vKiogU21hbGwgYXJyb3cgaGVhZCAoY2hldnJvbikgYXQgYHBgIHBvaW50aW5nIGFsb25nIGBkaXJgLCBzaXplZCBpbiBwaXhlbHMuICovXG5leHBvcnQgZnVuY3Rpb24gY2hldnJvbihwOiBWMywgZGlyOiBWMywgc2l6ZVB4OiBudW1iZXIsIGNvbDogQ29sb3IsIGRlcHRoVGVzdCA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgZCA9IG5vcm1hbGl6ZSh2MygpLCBkaXIpO1xuICAgIGlmIChsZW5TcShkKSA8IDFlLTEyKSByZXR1cm47XG4gICAgY29uc3Qgc2lkZSA9IG5vcm1hbGl6ZSh2MygpLCBjcm9zcyh2MygpLCBkLCBjYW1Gd2QpKTtcbiAgICBpZiAobGVuU3Eoc2lkZSkgPCAxZS0xMikgcmV0dXJuO1xuICAgIGNvbnN0IHMgPSB3b3JsZFBlclBpeGVsKGNhbSwgcCkgKiBzaXplUHg7XG4gICAgY29uc3QgYmFjayA9IHNjYWxlQW5kQWRkKHYzKCksIHAsIGQsIC1zKTtcbiAgICBnci5hZGRMaW5lKHNjYWxlQW5kQWRkKHYzKCksIGJhY2ssIHNpZGUsIHMgKiAwLjcpLCBwLCBjb2wsIGRlcHRoVGVzdCk7XG4gICAgZ3IuYWRkTGluZShzY2FsZUFuZEFkZCh2MygpLCBiYWNrLCBzaWRlLCAtcyAqIDAuNyksIHAsIGNvbCwgZGVwdGhUZXN0KTtcbn1cblxuLyoqIFNjcmVlbi1zcGFjZSBsZW5ndGggb2YgYSB3b3JsZCBzZWdtZW50IChwaXhlbHMpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjcmVlbkxlbmd0aChhOiBWMywgYjogVjMpOiBudW1iZXIge1xuICAgIGNvbnN0IHNhID0gdG9TY3JlZW4oY2FtLCBhKTtcbiAgICBjb25zdCBzYiA9IHRvU2NyZWVuKGNhbSwgYik7XG4gICAgcmV0dXJuIE1hdGguaHlwb3Qoc2IueCAtIHNhLngsIHNiLnkgLSBzYS55KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRDYW1lcmEoKTogYW55IHtcbiAgICByZXR1cm4gY2FtO1xufVxuXG5leHBvcnQgeyBzZXQgYXMgc2V0VjMgfTtcbiIsICIvKipcbiAqIE1vdmUgLyByb3RhdGUgLyBzY2FsZSBoYW5kbGVzIGZvciB0aGUgc2VsZWN0ZWQga25vdHMgYW5kIHRhbmdlbnRzIChVbml0eSdzXG4gKiBTcGxpbmVNb3ZlVG9vbCwgU3BsaW5lUm90YXRlVG9vbCwgU3BsaW5lU2NhbGVUb29sKS4gVGhlIGhhbmRsZSBmb2xsb3dzIHRoZVxuICogQ29jb3MgdHJhbnNmb3JtIHRvb2wgKFcgLyBFIC8gUikgYW5kIHBpdm90IHNldHRpbmcuXG4gKi9cbmltcG9ydCB7XG4gICAgVjMsIFE0LCB2MywgcTQsIGNvcHksIGFkZCwgc3ViLCBzY2FsZSwgc2NhbGVBbmRBZGQsIGRvdCwgY3Jvc3MsIG5vcm1hbGl6ZSwgbGVuLCBsZW5TcSxcbiAgICBxUm90YXRlLCBxTXVsLCBxRnJvbUF4aXNBbmdsZSwgcUxvb2tSb3RhdGlvbiwgRVBTSUxPTixcbn0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvbWF0aCc7XG5pbXBvcnQgeyB0YW5nZW50c0VkaXRhYmxlLCBhcHBseVRhbmdlbnRNb2RlLCBrbm90VXAsIFRhbmdlbnRNb2RlIH0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvc3BsaW5lLWNvcmUnO1xuaW1wb3J0IHtcbiAgICBjYW1lcmFGb3J3YXJkLCBjYW1lcmFQb3NpdGlvbiwgY2xvc2VzdE9uTGluZSwgZGlzdFRvU2VnbWVudCwgcG9pbnRJblBvbHlnb24sIHJheVBsYW5lLCBzY3JlZW5SYXksIHRvU2NyZWVuLCB3b3JsZFBlclBpeGVsLFxufSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0ICogYXMgRCBmcm9tICcuL2RyYXcnO1xuaW1wb3J0IHtcbiAgICBFbGVtZW50UmVmLCBjZW50cm9pZCwgY29udGFpbmVyUm90YXRpb24sIGVsZW1lbnRXb3JsZFBvc2l0aW9uLCBnZXRLbm90LCBrbm90V29ybGRSb3RhdGlvbiwgc2V0S25vdFdvcmxkLFxuICAgIHNldEtub3RXb3JsZFJvdGF0aW9uLCBzZXRUYW5nZW50V29ybGQsIHNldFRhbmdlbnRXb3JsZFZlYywgdGFuZ2VudFdvcmxkVmVjLCBrbm90V29ybGRQb3NpdGlvbixcbn0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyBIYW5kbGVBeGlzLCBTIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBpczJEVmlldywgcGl2b3RNb2RlLCBzbmFwQ29uZmlnLCB0cmFuc2Zvcm1Ub29sTmFtZSB9IGZyb20gJy4vZW52JztcblxuZXhwb3J0IHR5cGUgSGFuZGxlS2luZCA9ICdtb3ZlJyB8ICdyb3RhdGUnIHwgJ3NjYWxlJztcblxuZXhwb3J0IGludGVyZmFjZSBIYW5kbGVGcmFtZSB7XG4gICAga2luZDogSGFuZGxlS2luZDtcbiAgICBwaXZvdDogVjM7XG4gICAgYXhlczogW1YzLCBWMywgVjNdO1xuICAgIC8qKiBBeGlzIGxlbmd0aCBpbiB3b3JsZCB1bml0cy4gKi9cbiAgICBzaXplOiBudW1iZXI7XG4gICAgaXMyRDogYm9vbGVhbjtcbn1cblxuY29uc3QgQVhJU19QWCA9IDkwO1xuY29uc3QgSElUX1BYID0gNztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUtpbmQoKTogSGFuZGxlS2luZCB8IG51bGwge1xuICAgIHN3aXRjaCAodHJhbnNmb3JtVG9vbE5hbWUoKSkge1xuICAgICAgICBjYXNlICdwb3NpdGlvbic6XG4gICAgICAgIGNhc2UgJ3JlY3QnOlxuICAgICAgICAgICAgcmV0dXJuICdtb3ZlJztcbiAgICAgICAgY2FzZSAncm90YXRpb24nOlxuICAgICAgICAgICAgcmV0dXJuICdyb3RhdGUnO1xuICAgICAgICBjYXNlICdzY2FsZSc6XG4gICAgICAgICAgICByZXR1cm4gJ3NjYWxlJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuLyoqIEhhbmRsZSBvcmllbnRhdGlvbiBheGVzICh1bml0LCB3b3JsZCBzcGFjZSkuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQXhlcyhlbGVtZW50czogRWxlbWVudFJlZltdKTogW1YzLCBWMywgVjNdIHtcbiAgICBjb25zdCBhY3RpdmUgPSBlbGVtZW50c1tlbGVtZW50cy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBtb2RlID0gUy5zZXR0aW5ncy5vcmllbnRhdGlvbjtcbiAgICBsZXQgcTogUTQgfCBudWxsID0gbnVsbDtcbiAgICBpZiAoYWN0aXZlICYmIG1vZGUgPT09ICdsb2NhbCcpIHEgPSBjb250YWluZXJSb3RhdGlvbihhY3RpdmUuY29tcCk7XG4gICAgZWxzZSBpZiAoYWN0aXZlICYmIG1vZGUgPT09ICdlbGVtZW50Jykge1xuICAgICAgICBjb25zdCBrID0gZ2V0S25vdChhY3RpdmUpO1xuICAgICAgICBpZiAoaykge1xuICAgICAgICAgICAgaWYgKGFjdGl2ZS5wYXJ0ID09PSAna25vdCcpIHEgPSBrbm90V29ybGRSb3RhdGlvbihhY3RpdmUuY29tcCwgayk7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXIgPSB0YW5nZW50V29ybGRWZWMoYWN0aXZlLmNvbXAsIGFjdGl2ZS5zcGxpbmUsIGFjdGl2ZS5rbm90LCBhY3RpdmUucGFydCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdXAgPSBxUm90YXRlKHYzKCksIGtub3RXb3JsZFJvdGF0aW9uKGFjdGl2ZS5jb21wLCBrKSwgdjMoMCwgMSwgMCkpO1xuICAgICAgICAgICAgICAgIHEgPSBsZW5TcShkaXIpID4gRVBTSUxPTiA/IHFMb29rUm90YXRpb24ocTQoKSwgZGlyLCB1cCkgOiBrbm90V29ybGRSb3RhdGlvbihhY3RpdmUuY29tcCwgayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFxKSByZXR1cm4gW3YzKDEsIDAsIDApLCB2MygwLCAxLCAwKSwgdjMoMCwgMCwgMSldO1xuICAgIHJldHVybiBbcVJvdGF0ZSh2MygpLCBxLCB2MygxLCAwLCAwKSksIHFSb3RhdGUodjMoKSwgcSwgdjMoMCwgMSwgMCkpLCBxUm90YXRlKHYzKCksIHEsIHYzKDAsIDAsIDEpKV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVQaXZvdChlbGVtZW50czogRWxlbWVudFJlZltdKTogVjMge1xuICAgIGlmIChwaXZvdE1vZGUoKSA9PT0gJ3Bpdm90JyAmJiBlbGVtZW50cy5sZW5ndGgpIHJldHVybiBlbGVtZW50V29ybGRQb3NpdGlvbihlbGVtZW50c1tlbGVtZW50cy5sZW5ndGggLSAxXSk7XG4gICAgcmV0dXJuIGNlbnRyb2lkKGVsZW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVGcmFtZShjYW06IGFueSwgZWxlbWVudHM6IEVsZW1lbnRSZWZbXSwgYXhlc092ZXJyaWRlPzogW1YzLCBWMywgVjNdIHwgbnVsbCk6IEhhbmRsZUZyYW1lIHwgbnVsbCB7XG4gICAgY29uc3Qga2luZCA9IGhhbmRsZUtpbmQoKTtcbiAgICBpZiAoIWtpbmQgfHwgIWVsZW1lbnRzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcGl2b3QgPSBoYW5kbGVQaXZvdChlbGVtZW50cyk7XG4gICAgY29uc3QgYXhlcyA9IGF4ZXNPdmVycmlkZSA/PyBoYW5kbGVBeGVzKGVsZW1lbnRzKTtcbiAgICByZXR1cm4geyBraW5kLCBwaXZvdCwgYXhlcywgc2l6ZTogd29ybGRQZXJQaXhlbChjYW0sIHBpdm90KSAqIEFYSVNfUFgsIGlzMkQ6IGlzMkRWaWV3KCkgfTtcbn1cblxuY29uc3QgQVhJU19JTkRFWDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHsgeDogMCwgeTogMSwgejogMiB9O1xuY29uc3QgUExBTkVTOiB7IGF4aXM6IEhhbmRsZUF4aXM7IGE6IG51bWJlcjsgYjogbnVtYmVyOyBuOiBudW1iZXIgfVtdID0gW1xuICAgIHsgYXhpczogJ3h5JywgYTogMCwgYjogMSwgbjogMiB9LFxuICAgIHsgYXhpczogJ3l6JywgYTogMSwgYjogMiwgbjogMCB9LFxuICAgIHsgYXhpczogJ3h6JywgYTogMCwgYjogMiwgbjogMSB9LFxuXTtcblxuZnVuY3Rpb24gYXhpc0NvbG9yKGk6IG51bWJlcikge1xuICAgIHJldHVybiBpID09PSAwID8gRC5Db2xvcnMuYXhpc1ggOiBpID09PSAxID8gRC5Db2xvcnMuYXhpc1kgOiBELkNvbG9ycy5heGlzWjtcbn1cblxuZnVuY3Rpb24gdmlzaWJsZUF4ZXMoZjogSGFuZGxlRnJhbWUpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGYuaXMyRCA/IFswLCAxXSA6IFswLCAxLCAyXTtcbn1cblxuZnVuY3Rpb24gdmlzaWJsZVBsYW5lcyhmOiBIYW5kbGVGcmFtZSkge1xuICAgIHJldHVybiBmLmlzMkQgPyBQTEFORVMuZmlsdGVyKChwKSA9PiBwLmF4aXMgPT09ICd4eScpIDogUExBTkVTO1xufVxuXG4vKiogUGxhbmUgaGFuZGxlcyBzaXQgb24gdGhlIHNpZGUgb2YgZWFjaCBheGlzIHRoYXQgZmFjZXMgdGhlIGNhbWVyYSAobGlrZSBVbml0eSkuICovXG5mdW5jdGlvbiBwbGFuZVNpZ25zKGNhbTogYW55LCBmOiBIYW5kbGVGcmFtZSk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gICAgY29uc3QgdG9DYW0gPSBzdWIodjMoKSwgY2FtZXJhUG9zaXRpb24oY2FtKSwgZi5waXZvdCk7XG4gICAgaWYgKGxlblNxKHRvQ2FtKSA8IEVQU0lMT04pIHJldHVybiBbMSwgMSwgMV07XG4gICAgcmV0dXJuIGYuYXhlcy5tYXAoKGEpID0+IChkb3QoYSwgdG9DYW0pID49IDAgPyAxIDogLTEpKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG59XG5cbmZ1bmN0aW9uIHBsYW5lUXVhZChjYW06IGFueSwgZjogSGFuZGxlRnJhbWUsIHA6IHsgYTogbnVtYmVyOyBiOiBudW1iZXIgfSk6IFYzW10ge1xuICAgIGNvbnN0IHMgPSBwbGFuZVNpZ25zKGNhbSwgZik7XG4gICAgY29uc3QgbG8gPSBmLnNpemUgKiAwLjE2O1xuICAgIGNvbnN0IGhpID0gZi5zaXplICogMC40O1xuICAgIGNvbnN0IEEgPSBzY2FsZSh2MygpLCBmLmF4ZXNbcC5hXSwgc1twLmFdKTtcbiAgICBjb25zdCBCID0gc2NhbGUodjMoKSwgZi5heGVzW3AuYl0sIHNbcC5iXSk7XG4gICAgY29uc3QgcHQgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IGFkZCh2MygpLCBhZGQodjMoKSwgZi5waXZvdCwgc2NhbGUodjMoKSwgQSwgeCkpLCBzY2FsZSh2MygpLCBCLCB5KSk7XG4gICAgcmV0dXJuIFtwdChsbywgbG8pLCBwdChoaSwgbG8pLCBwdChoaSwgaGkpLCBwdChsbywgaGkpXTtcbn1cblxuZnVuY3Rpb24gcmluZ1BvaW50cyhmOiBIYW5kbGVGcmFtZSwgbm9ybWFsOiBWMywgcmFkaXVzOiBudW1iZXIsIHNlZ21lbnRzID0gNDgpOiBWM1tdIHtcbiAgICBjb25zdCBuID0gbm9ybWFsaXplKHYzKCksIG5vcm1hbCk7XG4gICAgY29uc3QgdSA9IG5vcm1hbGl6ZSh2MygpLCBjcm9zcyh2MygpLCBNYXRoLmFicyhuLnkpIDwgMC45OSA/IHYzKDAsIDEsIDApIDogdjMoMSwgMCwgMCksIG4pKTtcbiAgICBjb25zdCB3ID0gY3Jvc3ModjMoKSwgbiwgdSk7XG4gICAgY29uc3QgcHRzOiBWM1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2VnbWVudHM7IGkrKykge1xuICAgICAgICBjb25zdCBhID0gKGkgLyBzZWdtZW50cykgKiBNYXRoLlBJICogMjtcbiAgICAgICAgcHRzLnB1c2goYWRkKHYzKCksIGYucGl2b3QsIGFkZCh2MygpLCBzY2FsZSh2MygpLCB1LCBNYXRoLmNvcyhhKSAqIHJhZGl1cyksIHNjYWxlKHYzKCksIHcsIE1hdGguc2luKGEpICogcmFkaXVzKSkpKTtcbiAgICB9XG4gICAgcmV0dXJuIHB0cztcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkcmF3XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3SGFuZGxlKGNhbTogYW55LCBmOiBIYW5kbGVGcmFtZSwgaG90OiBIYW5kbGVBeGlzIHwgbnVsbCk6IHZvaWQge1xuICAgIGNvbnN0IGhvdENvbG9yID0gRC5Db2xvcnMuYXhpc0hvdDtcbiAgICBpZiAoZi5raW5kID09PSAncm90YXRlJykge1xuICAgICAgICBmb3IgKGNvbnN0IGkgb2YgdmlzaWJsZUF4ZXMoZikpIHtcbiAgICAgICAgICAgIGlmIChmLmlzMkQgJiYgaSAhPT0gMikgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBheGlzOiBIYW5kbGVBeGlzID0gKFsneCcsICd5JywgJ3onXSBhcyBIYW5kbGVBeGlzW10pW2ldO1xuICAgICAgICAgICAgRC5yaW5nKGYucGl2b3QsIGYuYXhlc1tpXSwgZi5zaXplLCBob3QgPT09IGF4aXMgPyBob3RDb2xvciA6IGF4aXNDb2xvcihpKSwgNjQsIGZhbHNlLCAhZi5pczJEKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5pczJEKSB7XG4gICAgICAgICAgICAvLyBJbiAyRCBvbmx5IHJvdGF0aW9uIGFyb3VuZCBaIG1ha2VzIHNlbnNlLlxuICAgICAgICB9XG4gICAgICAgIEQucmluZyhmLnBpdm90LCBjYW1lcmFGb3J3YXJkKGNhbSksIGYuc2l6ZSAqIDEuMTUsIGhvdCA9PT0gJ3ZpZXcnID8gaG90Q29sb3IgOiBELkNvbG9ycy5heGlzVmlldywgNjQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3QgaSBvZiB2aXNpYmxlQXhlcyhmKSkge1xuICAgICAgICBjb25zdCBheGlzOiBIYW5kbGVBeGlzID0gKFsneCcsICd5JywgJ3onXSBhcyBIYW5kbGVBeGlzW10pW2ldO1xuICAgICAgICBjb25zdCBjb2wgPSBob3QgPT09IGF4aXMgPyBob3RDb2xvciA6IGF4aXNDb2xvcihpKTtcbiAgICAgICAgY29uc3QgdGlwID0gc2NhbGVBbmRBZGQodjMoKSwgZi5waXZvdCwgZi5heGVzW2ldLCBmLnNpemUpO1xuICAgICAgICBELnRoaWNrTGluZShmLnBpdm90LCB0aXAsIGNvbCwgMik7XG4gICAgICAgIGlmIChmLmtpbmQgPT09ICdtb3ZlJykgRC5jb25lKHNjYWxlQW5kQWRkKHYzKCksIGYucGl2b3QsIGYuYXhlc1tpXSwgZi5zaXplICogMC44MiksIGYuYXhlc1tpXSwgZi5zaXplICogMC4yMiwgZi5zaXplICogMC4wNywgY29sKTtcbiAgICAgICAgZWxzZSBELmN1YmUodGlwLCBmLnNpemUgKiAwLjA2LCBmLmF4ZXNbMF0sIGYuYXhlc1sxXSwgZi5heGVzWzJdLCBjb2wpO1xuICAgIH1cbiAgICBpZiAoZi5raW5kID09PSAnbW92ZScpIHtcbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHZpc2libGVQbGFuZXMoZikpIHtcbiAgICAgICAgICAgIGNvbnN0IHEgPSBwbGFuZVF1YWQoY2FtLCBmLCBwKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IGhvdCA9PT0gcC5heGlzID8gaG90Q29sb3IgOiBheGlzQ29sb3IocC5uKTtcbiAgICAgICAgICAgIEQucXVhZChxWzBdLCBxWzFdLCBxWzJdLCBxWzNdLCBELndpdGhBbHBoYShjb2wsIGhvdCA9PT0gcC5heGlzID8gMTEwIDogNjApLCB0cnVlKTtcbiAgICAgICAgICAgIEQucXVhZChxWzBdLCBxWzFdLCBxWzJdLCBxWzNdLCBjb2wsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBELnNxdWFyZShmLnBpdm90LCA1LCBob3QgPT09ICdmcmVlJyA/IGhvdENvbG9yIDogRC5Db2xvcnMuYXhpc1ZpZXcsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBELmN1YmUoZi5waXZvdCwgZi5zaXplICogMC4wOCwgZi5heGVzWzBdLCBmLmF4ZXNbMV0sIGYuYXhlc1syXSwgaG90ID09PSAnZnJlZScgPyBob3RDb2xvciA6IEQuQ29sb3JzLmF4aXNWaWV3KTtcbiAgICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBoaXQgdGVzdFxuXG5leHBvcnQgZnVuY3Rpb24gaGl0SGFuZGxlKGNhbTogYW55LCBmOiBIYW5kbGVGcmFtZSwgbXg6IG51bWJlciwgbXk6IG51bWJlcik6IEhhbmRsZUF4aXMgfCBudWxsIHtcbiAgICBjb25zdCBzcCA9IHRvU2NyZWVuKGNhbSwgZi5waXZvdCk7XG4gICAgaWYgKCFzcC52aXNpYmxlKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoZi5raW5kID09PSAncm90YXRlJykge1xuICAgICAgICBsZXQgYmVzdDogSGFuZGxlQXhpcyB8IG51bGwgPSBudWxsO1xuICAgICAgICBsZXQgYmVzdEQgPSBISVRfUFg7XG4gICAgICAgIGNvbnN0IHRlc3QgPSAoYXhpczogSGFuZGxlQXhpcywgcHRzOiBWM1tdKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJldiA9IHRvU2NyZWVuKGNhbSwgcHRzWzBdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VyID0gdG9TY3JlZW4oY2FtLCBwdHNbaV0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBkaXN0VG9TZWdtZW50KG14LCBteSwgcHJldi54LCBwcmV2LnksIGN1ci54LCBjdXIueSkuZGlzdDtcbiAgICAgICAgICAgICAgICBpZiAoZCA8IGJlc3REKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlc3REID0gZDtcbiAgICAgICAgICAgICAgICAgICAgYmVzdCA9IGF4aXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXYgPSBjdXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgaSBvZiB2aXNpYmxlQXhlcyhmKSkge1xuICAgICAgICAgICAgaWYgKGYuaXMyRCAmJiBpICE9PSAyKSBjb250aW51ZTtcbiAgICAgICAgICAgIHRlc3QoKFsneCcsICd5JywgJ3onXSBhcyBIYW5kbGVBeGlzW10pW2ldLCByaW5nUG9pbnRzKGYsIGYuYXhlc1tpXSwgZi5zaXplKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGYuaXMyRCkgdGVzdCgneicsIHJpbmdQb2ludHMoZiwgZi5heGVzWzJdLCBmLnNpemUpKTtcbiAgICAgICAgdGVzdCgndmlldycsIHJpbmdQb2ludHMoZiwgY2FtZXJhRm9yd2FyZChjYW0pLCBmLnNpemUgKiAxLjE1KSk7XG4gICAgICAgIHJldHVybiBiZXN0O1xuICAgIH1cbiAgICBpZiAoTWF0aC5oeXBvdChteCAtIHNwLngsIG15IC0gc3AueSkgPD0gKGYua2luZCA9PT0gJ3NjYWxlJyA/IDkgOiA3KSkgcmV0dXJuICdmcmVlJztcbiAgICBsZXQgYmVzdDogSGFuZGxlQXhpcyB8IG51bGwgPSBudWxsO1xuICAgIGxldCBiZXN0RCA9IEhJVF9QWDtcbiAgICBmb3IgKGNvbnN0IGkgb2YgdmlzaWJsZUF4ZXMoZikpIHtcbiAgICAgICAgY29uc3QgdGlwID0gdG9TY3JlZW4oY2FtLCBzY2FsZUFuZEFkZCh2MygpLCBmLnBpdm90LCBmLmF4ZXNbaV0sIGYuc2l6ZSAqIDEuMDUpKTtcbiAgICAgICAgY29uc3QgZCA9IGRpc3RUb1NlZ21lbnQobXgsIG15LCBzcC54LCBzcC55LCB0aXAueCwgdGlwLnkpLmRpc3Q7XG4gICAgICAgIGlmIChkIDwgYmVzdEQpIHtcbiAgICAgICAgICAgIGJlc3REID0gZDtcbiAgICAgICAgICAgIGJlc3QgPSAoWyd4JywgJ3knLCAneiddIGFzIEhhbmRsZUF4aXNbXSlbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJlc3QpIHJldHVybiBiZXN0O1xuICAgIGlmIChmLmtpbmQgPT09ICdtb3ZlJykge1xuICAgICAgICBmb3IgKGNvbnN0IHAgb2YgdmlzaWJsZVBsYW5lcyhmKSkge1xuICAgICAgICAgICAgY29uc3QgcSA9IHBsYW5lUXVhZChjYW0sIGYsIHApLm1hcCgodykgPT4gdG9TY3JlZW4oY2FtLCB3KSk7XG4gICAgICAgICAgICBpZiAocG9pbnRJblBvbHlnb24obXgsIG15LCBxKSkgcmV0dXJuIHAuYXhpcztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkcmFnXG5cbmludGVyZmFjZSBFbGVtZW50U3RhcnQge1xuICAgIGU6IEVsZW1lbnRSZWY7XG4gICAgcG9zOiBWMztcbiAgICByb3Q6IFE0IHwgbnVsbDtcbiAgICB0aW46IFYzIHwgbnVsbDtcbiAgICB0b3V0OiBWMyB8IG51bGw7XG4gICAgdHZlYzogVjMgfCBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhhbmRsZURyYWcge1xuICAgIGZyYW1lOiBIYW5kbGVGcmFtZTtcbiAgICBheGlzOiBIYW5kbGVBeGlzO1xuICAgIC8qKiBBcHBsaWVzIHRoZSBkcmFnIGZvciB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvbi4gUmV0dXJucyBhIHN0YXR1cyB0ZXh0LiAqL1xuICAgIHVwZGF0ZShteDogbnVtYmVyLCBteTogbnVtYmVyLCBldjogYW55KTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBzbmFwU3RlcCh2OiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHN0ZXAgPiAwID8gTWF0aC5yb3VuZCh2IC8gc3RlcCkgKiBzdGVwIDogdjtcbn1cblxuLyoqIFNlbGVjdGVkIGVsZW1lbnRzIHdob3NlIG93bmVyIGtub3QgaXMgbm90IGFsc28gc2VsZWN0ZWQgKHRob3NlIG1vdmUgd2l0aCB0aGUga25vdCkuICovXG5mdW5jdGlvbiBlZmZlY3RpdmVFbGVtZW50cyhlbGVtZW50czogRWxlbWVudFJlZltdKTogRWxlbWVudFJlZltdIHtcbiAgICByZXR1cm4gZWxlbWVudHMuZmlsdGVyKChlKSA9PiBlLnBhcnQgPT09ICdrbm90JyB8fCAhZWxlbWVudHMuc29tZSgobykgPT4gby5wYXJ0ID09PSAna25vdCcgJiYgby5jb21wID09PSBlLmNvbXAgJiYgby5zcGxpbmUgPT09IGUuc3BsaW5lICYmIG8ua25vdCA9PT0gZS5rbm90KSk7XG59XG5cbmZ1bmN0aW9uIGNhcHR1cmVTdGFydHMoZWxlbWVudHM6IEVsZW1lbnRSZWZbXSk6IEVsZW1lbnRTdGFydFtdIHtcbiAgICByZXR1cm4gZWZmZWN0aXZlRWxlbWVudHMoZWxlbWVudHMpLm1hcCgoZSkgPT4ge1xuICAgICAgICBjb25zdCBrID0gZ2V0S25vdChlKTtcbiAgICAgICAgY29uc3QgaXNLbm90ID0gZS5wYXJ0ID09PSAna25vdCc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlLFxuICAgICAgICAgICAgcG9zOiBlbGVtZW50V29ybGRQb3NpdGlvbihlKSxcbiAgICAgICAgICAgIHJvdDogaXNLbm90ID8ga25vdFdvcmxkUm90YXRpb24oZS5jb21wLCBrKSA6IG51bGwsXG4gICAgICAgICAgICB0aW46IGlzS25vdCA/IHRhbmdlbnRXb3JsZFZlYyhlLmNvbXAsIGUuc3BsaW5lLCBlLmtub3QsICdpbicpIDogbnVsbCxcbiAgICAgICAgICAgIHRvdXQ6IGlzS25vdCA/IHRhbmdlbnRXb3JsZFZlYyhlLmNvbXAsIGUuc3BsaW5lLCBlLmtub3QsICdvdXQnKSA6IG51bGwsXG4gICAgICAgICAgICB0dmVjOiAhaXNLbm90ID8gdGFuZ2VudFdvcmxkVmVjKGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgZS5wYXJ0IGFzICdpbicgfCAnb3V0JykgOiBudWxsLFxuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRIYW5kbGVEcmFnKGNhbTogYW55LCBmOiBIYW5kbGVGcmFtZSwgYXhpczogSGFuZGxlQXhpcywgbXg6IG51bWJlciwgbXk6IG51bWJlciwgZWxlbWVudHM6IEVsZW1lbnRSZWZbXSk6IEhhbmRsZURyYWcgfCBudWxsIHtcbiAgICBjb25zdCBzdGFydHMgPSBjYXB0dXJlU3RhcnRzKGVsZW1lbnRzKTtcbiAgICBpZiAoIXN0YXJ0cy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIGlmIChmLmtpbmQgPT09ICdtb3ZlJykgcmV0dXJuIG1vdmVEcmFnKGNhbSwgZiwgYXhpcywgbXgsIG15LCBzdGFydHMpO1xuICAgIGlmIChmLmtpbmQgPT09ICdyb3RhdGUnKSByZXR1cm4gcm90YXRlRHJhZyhjYW0sIGYsIGF4aXMsIG14LCBteSwgc3RhcnRzKTtcbiAgICByZXR1cm4gc2NhbGVEcmFnKGNhbSwgZiwgYXhpcywgbXgsIG15LCBzdGFydHMpO1xufVxuXG4vKiogUG9pbnQgdW5kZXIgdGhlIG1vdXNlIG9uIHRoZSBkcmFnIGNvbnN0cmFpbnQgKGF4aXMgbGluZSBvciBwbGFuZSkuICovXG5mdW5jdGlvbiBjb25zdHJhaW50UG9pbnQoY2FtOiBhbnksIGY6IEhhbmRsZUZyYW1lLCBheGlzOiBIYW5kbGVBeGlzLCBteDogbnVtYmVyLCBteTogbnVtYmVyKTogVjMgfCBudWxsIHtcbiAgICBjb25zdCByYXkgPSBzY3JlZW5SYXkoY2FtLCBteCwgbXkpO1xuICAgIGlmIChheGlzIGluIEFYSVNfSU5ERVgpIHJldHVybiBjbG9zZXN0T25MaW5lKHJheSwgZi5waXZvdCwgZi5heGVzW0FYSVNfSU5ERVhbYXhpc11dKTtcbiAgICBpZiAoYXhpcyA9PT0gJ2ZyZWUnKSByZXR1cm4gcmF5UGxhbmUocmF5LCBmLnBpdm90LCBjYW1lcmFGb3J3YXJkKGNhbSksIHRydWUpO1xuICAgIGNvbnN0IHAgPSBQTEFORVMuZmluZCgocGwpID0+IHBsLmF4aXMgPT09IGF4aXMpO1xuICAgIGlmICghcCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHJheVBsYW5lKHJheSwgZi5waXZvdCwgZi5heGVzW3Aubl0sIHRydWUpO1xufVxuXG5mdW5jdGlvbiBtb3ZlRHJhZyhjYW06IGFueSwgZjogSGFuZGxlRnJhbWUsIGF4aXM6IEhhbmRsZUF4aXMsIG14OiBudW1iZXIsIG15OiBudW1iZXIsIHN0YXJ0czogRWxlbWVudFN0YXJ0W10pOiBIYW5kbGVEcmFnIHwgbnVsbCB7XG4gICAgY29uc3Qgc3RhcnQgPSBjb25zdHJhaW50UG9pbnQoY2FtLCBmLCBheGlzLCBteCwgbXkpO1xuICAgIGlmICghc3RhcnQpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICAgIGZyYW1lOiBmLFxuICAgICAgICBheGlzLFxuICAgICAgICB1cGRhdGUoeCwgeSwgZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1ciA9IGNvbnN0cmFpbnRQb2ludChjYW0sIGYsIGF4aXMsIHgsIHkpO1xuICAgICAgICAgICAgaWYgKCFjdXIpIHJldHVybiAnJztcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gc3ViKHYzKCksIGN1ciwgc3RhcnQpO1xuICAgICAgICAgICAgY29uc3Qgc25hcCA9IHNuYXBDb25maWcoKTtcbiAgICAgICAgICAgIGlmIChzbmFwLmlzUG9zaXRpb25TbmFwRW5hYmxlZCAhPT0gISFldj8uY3RybEtleSkge1xuICAgICAgICAgICAgICAgIC8vIFNuYXAgdGhlIG1vdmVtZW50IGFsb25nIGVhY2ggaGFuZGxlIGF4aXMuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcHMgPSBbc25hcC5wb3NpdGlvbi54LCBzbmFwLnBvc2l0aW9uLnksIHNuYXAucG9zaXRpb24uel07XG4gICAgICAgICAgICAgICAgY29uc3Qgb3V0ID0gdjMoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykgc2NhbGVBbmRBZGQob3V0LCBvdXQsIGYuYXhlc1tpXSwgc25hcFN0ZXAoZG90KGRlbHRhLCBmLmF4ZXNbaV0pLCBzdGVwc1tpXSkpO1xuICAgICAgICAgICAgICAgIGNvcHkoZGVsdGEsIG91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3RhcnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gYWRkKHYzKCksIHMucG9zLCBkZWx0YSk7XG4gICAgICAgICAgICAgICAgaWYgKHMuZS5wYXJ0ID09PSAna25vdCcpIHNldEtub3RXb3JsZChzLmUuY29tcCwgcy5lLnNwbGluZSwgcy5lLmtub3QsIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgZWxzZSBzZXRUYW5nZW50V29ybGQocy5lLmNvbXAsIHMuZS5zcGxpbmUsIHMuZS5rbm90LCBzLmUucGFydCwgdGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGQgPSBbZG90KGRlbHRhLCBmLmF4ZXNbMF0pLCBkb3QoZGVsdGEsIGYuYXhlc1sxXSksIGRvdChkZWx0YSwgZi5heGVzWzJdKV0ubWFwKChuKSA9PiBuLnRvRml4ZWQoMykpO1xuICAgICAgICAgICAgcmV0dXJuIGBcdTAzOTQgJHtkLmpvaW4oJywgJyl9YDtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzaWduZWRBbmdsZShhOiBWMywgYjogVjMsIG46IFYzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMihkb3QoY3Jvc3ModjMoKSwgYSwgYiksIG4pLCBkb3QoYSwgYikpO1xufVxuXG5mdW5jdGlvbiByb3RhdGVEcmFnKGNhbTogYW55LCBmOiBIYW5kbGVGcmFtZSwgYXhpczogSGFuZGxlQXhpcywgbXg6IG51bWJlciwgbXk6IG51bWJlciwgc3RhcnRzOiBFbGVtZW50U3RhcnRbXSk6IEhhbmRsZURyYWcgfCBudWxsIHtcbiAgICBjb25zdCBuID0gYXhpcyA9PT0gJ3ZpZXcnID8gc2NhbGUodjMoKSwgY2FtZXJhRm9yd2FyZChjYW0pLCAtMSkgOiBjb3B5KHYzKCksIGYuYXhlc1tBWElTX0lOREVYW2F4aXNdID8/IDJdKTtcbiAgICBjb25zdCBwaXZvdCA9IGNvcHkodjMoKSwgZi5waXZvdCk7XG4gICAgY29uc3Qgc3AgPSB0b1NjcmVlbihjYW0sIHBpdm90KTtcbiAgICBjb25zdCBvblBsYW5lID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGhpdCA9IHJheVBsYW5lKHNjcmVlblJheShjYW0sIHgsIHkpLCBwaXZvdCwgbiwgdHJ1ZSk7XG4gICAgICAgIGlmICghaGl0KSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgdiA9IHN1Yih2MygpLCBoaXQsIHBpdm90KTtcbiAgICAgICAgcmV0dXJuIGxlblNxKHYpID4gRVBTSUxPTiA/IHYgOiBudWxsO1xuICAgIH07XG4gICAgY29uc3QgZmFjaW5nID0gTWF0aC5hYnMoZG90KG4sIGNhbWVyYUZvcndhcmQoY2FtKSkpO1xuICAgIGNvbnN0IHVzZVNjcmVlbiA9IGZhY2luZyA8IDAuMTU7IC8vIHJpbmcgc2VlbiBlZGdlLW9uOiB1c2Ugc2NyZWVuIGFuZ2xlXG4gICAgY29uc3QgdjAgPSB1c2VTY3JlZW4gPyBudWxsIDogb25QbGFuZShteCwgbXkpO1xuICAgIGNvbnN0IGEwID0gTWF0aC5hdGFuMihteSAtIHNwLnksIG14IC0gc3AueCk7XG4gICAgY29uc3Qgc2NyZWVuU2lnbiA9IGRvdChuLCBjYW1lcmFGb3J3YXJkKGNhbSkpID4gMCA/IDEgOiAtMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBmcmFtZTogZixcbiAgICAgICAgYXhpcyxcbiAgICAgICAgdXBkYXRlKHgsIHksIGV2KSB7XG4gICAgICAgICAgICBsZXQgYW5nbGU6IG51bWJlcjtcbiAgICAgICAgICAgIGNvbnN0IHYxID0gdjAgPyBvblBsYW5lKHgsIHkpIDogbnVsbDtcbiAgICAgICAgICAgIGlmICh2MCAmJiB2MSkgYW5nbGUgPSBzaWduZWRBbmdsZSh2MCwgdjEsIG4pO1xuICAgICAgICAgICAgZWxzZSBhbmdsZSA9IChNYXRoLmF0YW4yKHkgLSBzcC55LCB4IC0gc3AueCkgLSBhMCkgKiAtc2NyZWVuU2lnbjtcbiAgICAgICAgICAgIGNvbnN0IHNuYXAgPSBzbmFwQ29uZmlnKCk7XG4gICAgICAgICAgICBsZXQgZGVnID0gKGFuZ2xlICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgICAgICBpZiAoc25hcC5pc1JvdGF0aW9uU25hcEVuYWJsZWQgIT09ICEhZXY/LmN0cmxLZXkpIGRlZyA9IHNuYXBTdGVwKGRlZywgc25hcC5yb3RhdGlvbiB8fCAxNSk7XG4gICAgICAgICAgICBjb25zdCBxID0gcUZyb21BeGlzQW5nbGUocTQoKSwgbiwgKGRlZyAqIE1hdGguUEkpIC8gMTgwKTtcbiAgICAgICAgICAgIGNvbnN0IG1hbnkgPSBzdGFydHMubGVuZ3RoID4gMTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcyBvZiBzdGFydHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlID0gcy5lO1xuICAgICAgICAgICAgICAgIGNvbnN0IGsgPSBnZXRLbm90KGUpO1xuICAgICAgICAgICAgICAgIGlmICghaykgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKGUucGFydCA9PT0gJ2tub3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYW55IHx8IGxlbihzdWIodjMoKSwgcy5wb3MsIHBpdm90KSkgPiBFUFNJTE9OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gYWRkKHYzKCksIHBpdm90LCBxUm90YXRlKHYzKCksIHEsIHN1Yih2MygpLCBzLnBvcywgcGl2b3QpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRLbm90V29ybGQoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCBwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZXRLbm90V29ybGRSb3RhdGlvbihlLmNvbXAsIGssIHFNdWwocTQoKSwgcSwgcy5yb3QhKSk7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5VGFuZ2VudE1vZGUoZS5jb21wLnNwbGluZXNbZS5zcGxpbmVdLCBlLmtub3QpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRhbmdlbnRXb3JsZFZlYyhlLmNvbXAsIGUuc3BsaW5lLCBlLmtub3QsIGUucGFydCBhcyAnaW4nIHwgJ291dCcsIHFSb3RhdGUodjMoKSwgcSwgcy50dmVjISkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBgJHtkZWcudG9GaXhlZCgxKX1cdTAwQjBgO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHNjYWxlRHJhZyhjYW06IGFueSwgZjogSGFuZGxlRnJhbWUsIGF4aXM6IEhhbmRsZUF4aXMsIG14OiBudW1iZXIsIG15OiBudW1iZXIsIHN0YXJ0czogRWxlbWVudFN0YXJ0W10pOiBIYW5kbGVEcmFnIHwgbnVsbCB7XG4gICAgY29uc3QgcGl2b3QgPSBjb3B5KHYzKCksIGYucGl2b3QpO1xuICAgIGNvbnN0IHNwID0gdG9TY3JlZW4oY2FtLCBwaXZvdCk7XG4gICAgbGV0IGRpclggPSAxO1xuICAgIGxldCBkaXJZID0gMDtcbiAgICBsZXQgc2NyZWVuTGVuID0gODA7XG4gICAgaWYgKGF4aXMgaW4gQVhJU19JTkRFWCkge1xuICAgICAgICBjb25zdCB0aXAgPSB0b1NjcmVlbihjYW0sIHNjYWxlQW5kQWRkKHYzKCksIHBpdm90LCBmLmF4ZXNbQVhJU19JTkRFWFtheGlzXV0sIGYuc2l6ZSkpO1xuICAgICAgICBjb25zdCBkeCA9IHRpcC54IC0gc3AueDtcbiAgICAgICAgY29uc3QgZHkgPSB0aXAueSAtIHNwLnk7XG4gICAgICAgIGNvbnN0IGwgPSBNYXRoLmh5cG90KGR4LCBkeSk7XG4gICAgICAgIGlmIChsID4gMSkge1xuICAgICAgICAgICAgZGlyWCA9IGR4IC8gbDtcbiAgICAgICAgICAgIGRpclkgPSBkeSAvIGw7XG4gICAgICAgICAgICBzY3JlZW5MZW4gPSBsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGF4ID0gZi5heGVzO1xuICAgIC8vIEFwcGxpZXMgYSBwZXItYXhpcyBzY2FsZSAoaW4gaGFuZGxlIGF4ZXMpIHRvIGEgd29ybGQgdmVjdG9yLlxuICAgIGNvbnN0IHNjYWxlVmVjID0gKHY6IFYzLCBzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pID0+IHtcbiAgICAgICAgY29uc3Qgb3V0ID0gdjMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHNjYWxlQW5kQWRkKG91dCwgb3V0LCBheFtpXSwgZG90KHYsIGF4W2ldKSAqIHNbaV0pO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZnJhbWU6IGYsXG4gICAgICAgIGF4aXMsXG4gICAgICAgIHVwZGF0ZSh4LCB5LCBldikge1xuICAgICAgICAgICAgbGV0IGZhY3RvcjogbnVtYmVyO1xuICAgICAgICAgICAgaWYgKGF4aXMgPT09ICdmcmVlJykgZmFjdG9yID0gMSArICgoeCAtIG14KSArICh5IC0gbXkpKSAvIDEyMDtcbiAgICAgICAgICAgIGVsc2UgZmFjdG9yID0gMSArICgoeCAtIG14KSAqIGRpclggKyAoeSAtIG15KSAqIGRpclkpIC8gc2NyZWVuTGVuO1xuICAgICAgICAgICAgY29uc3Qgc25hcCA9IHNuYXBDb25maWcoKTtcbiAgICAgICAgICAgIGlmIChzbmFwLmlzU2NhbGVTbmFwRW5hYmxlZCAhPT0gISFldj8uY3RybEtleSkgZmFjdG9yID0gMSArIHNuYXBTdGVwKGZhY3RvciAtIDEsIHNuYXAuc2NhbGUgfHwgMC4xKTtcbiAgICAgICAgICAgIGNvbnN0IHM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSA9IGF4aXMgPT09ICdmcmVlJyA/IFtmYWN0b3IsIGZhY3RvciwgZmFjdG9yXSA6IFsxLCAxLCAxXTtcbiAgICAgICAgICAgIGlmIChheGlzIGluIEFYSVNfSU5ERVgpIHNbQVhJU19JTkRFWFtheGlzXV0gPSBmYWN0b3I7XG4gICAgICAgICAgICBjb25zdCBtYW55ID0gc3RhcnRzLmxlbmd0aCA+IDE7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHN0IG9mIHN0YXJ0cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGUgPSBzdC5lO1xuICAgICAgICAgICAgICAgIGNvbnN0IGsgPSBnZXRLbm90KGUpO1xuICAgICAgICAgICAgICAgIGlmICghaykgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKGUucGFydCA9PT0gJ2tub3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYW55KSBzZXRLbm90V29ybGQoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCBhZGQodjMoKSwgcGl2b3QsIHNjYWxlVmVjKHN1Yih2MygpLCBzdC5wb3MsIHBpdm90KSwgcykpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BsaW5lID0gZS5jb21wLnNwbGluZXNbZS5zcGxpbmVdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFuZ2VudHNFZGl0YWJsZShrLm1vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTY2FsZSBib3RoIHRhbmdlbnRzOyBCcm9rZW4ga2VlcHMgdGhlbSBpbmRlcGVuZGVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbiA9IHNjYWxlVmVjKHN0LnRpbiEsIHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG91dCA9IHNjYWxlVmVjKHN0LnRvdXQhLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRhbmdlbnRXb3JsZFZlYyhlLmNvbXAsIGUuc3BsaW5lLCBlLmtub3QsICdvdXQnLCB0b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrLm1vZGUgPT09IFRhbmdlbnRNb2RlLkJyb2tlbikgc2V0VGFuZ2VudFdvcmxkVmVjKGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgJ2luJywgdGluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsubW9kZSA9PT0gVGFuZ2VudE1vZGUuQ29udGludW91cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbnRpbnVvdXMga2VlcHMgaXRzIG93biBpbiBsZW5ndGg6IHNjYWxlIGl0IHRvbyAoTWlycm9yZWQgZm9sbG93cyB0aGUgb3V0IHRhbmdlbnQpLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpciA9IG5vcm1hbGl6ZSh2MygpLCB0YW5nZW50V29ybGRWZWMoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCAnaW4nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlblNxKGRpcikgPiBFUFNJTE9OKSBzZXRUYW5nZW50V29ybGRWZWMoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCAnaW4nLCBzY2FsZSh2MygpLCBkaXIsIGxlbih0aW4pKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXBwbHlUYW5nZW50TW9kZShzcGxpbmUsIGUua25vdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGFuZ2VudFdvcmxkVmVjKGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgZS5wYXJ0IGFzICdpbicgfCAnb3V0Jywgc2NhbGVWZWMoc3QudHZlYyEsIHMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYFx1MDBENyAke2ZhY3Rvci50b0ZpeGVkKDMpfWA7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZXhwb3J0IHsga25vdFVwLCBrbm90V29ybGRQb3NpdGlvbiB9O1xuIiwgIi8qKlxuICogRWRpdCBjb250ZXh0IChVbml0eSdzIHNwbGluZSB0b29sIGNvbnRleHQpLCB0aGUgY29udGFpbmVycyBiZWluZyBlZGl0ZWQsXG4gKiBhbmQgdGhlIHN0YXRlIHNob3duIGJ5IHRoZSBTcGxpbmVzIHBhbmVsIGFuZCBJbnNwZWN0b3IuXG4gKi9cbmltcG9ydCB7IHYzLCBxVG9FdWxlciwgbGVuIH0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvbWF0aCc7XG5pbXBvcnQgeyBpc0xpbmtlZCwgaXNFbmRLbm90LCB0YW5nZW50SW5WZWMsIHRhbmdlbnRPdXRWZWMsIFRhbmdlbnRNb2RlIH0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvc3BsaW5lLWNvcmUnO1xuaW1wb3J0IHsgY3VycmVudFRhcmdldHMsIEVsZW1lbnRSZWYsIGdldEtub3QgfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7IFMsIFRvb2wsIGJ1bXBTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgaXMyRFZpZXcsIHJlcGFpbnQsIHRyYW5zZm9ybVRvb2xOYW1lIH0gZnJvbSAnLi9lbnYnO1xuXG5jb25zdCBCUk9BRENBU1RfTVMgPSA2MDtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVRhcmdldHMoKTogYW55W10ge1xuICAgIGNvbnN0IHRhcmdldHMgPSBjdXJyZW50VGFyZ2V0cygpO1xuICAgIGNvbnN0IGtleSA9IHRhcmdldHMubWFwKChjKSA9PiBjLnV1aWQpLmpvaW4oJywnKTtcbiAgICBpZiAoa2V5ICE9PSBTLnRhcmdldHNLZXkpIHtcbiAgICAgICAgUy50YXJnZXRzS2V5ID0ga2V5O1xuICAgICAgICBidW1wU3RhdGUoKTtcbiAgICB9XG4gICAgUy5sYXN0VGFyZ2V0cyA9IHRhcmdldHM7XG4gICAgaWYgKFMuc2VsZWN0aW9uLnZhbGlkYXRlKHRhcmdldHMpKSBidW1wU3RhdGUoKTtcbiAgICBjb25zdCBwZW5kaW5nID0gUy5wZW5kaW5nQ29udGV4dDtcbiAgICBpZiAocGVuZGluZykge1xuICAgICAgICBpZiAodGFyZ2V0cy5pbmNsdWRlcyhwZW5kaW5nLmNvbXApKSB7XG4gICAgICAgICAgICBTLnBlbmRpbmdDb250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIHNldENvbnRleHQodHJ1ZSk7XG4gICAgICAgICAgICBzZXRUb29sKHBlbmRpbmcudG9vbCk7XG4gICAgICAgIH0gZWxzZSBpZiAoRGF0ZS5ub3coKSA+IHBlbmRpbmcudW50aWwpIHtcbiAgICAgICAgICAgIFMucGVuZGluZ0NvbnRleHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghdGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKFMuY29udGV4dCkgc2V0Q29udGV4dChmYWxzZSk7XG4gICAgICAgIGlmIChTLmRyYXdpbmcpIFMuZHJhd2luZyA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChTLmRyYXdpbmcgJiYgIXRhcmdldHMuaW5jbHVkZXMoUy5kcmF3aW5nLmNvbXApKSB7XG4gICAgICAgIFMuZHJhd2luZyA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29udGV4dChvbjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChTLmNvbnRleHQgPT09IG9uKSByZXR1cm47XG4gICAgUy5jb250ZXh0ID0gb247XG4gICAgaWYgKCFvbikge1xuICAgICAgICBTLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgICBTLnRvb2wgPSAnc2VsZWN0JztcbiAgICAgICAgUy5kcmF3aW5nID0gbnVsbDtcbiAgICAgICAgUy5wcmV2aWV3ID0gbnVsbDtcbiAgICAgICAgUy5ob3ZlciA9IG51bGw7XG4gICAgfVxuICAgIGJ1bXBTdGF0ZSgpO1xuICAgIHJlcGFpbnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRvb2wodG9vbDogVG9vbCk6IHZvaWQge1xuICAgIGlmICh0b29sID09PSAnZHJhdycpIHNldENvbnRleHQodHJ1ZSk7XG4gICAgaWYgKFMudG9vbCA9PT0gdG9vbCkgcmV0dXJuO1xuICAgIFMudG9vbCA9IHRvb2w7XG4gICAgUy5kcmF3aW5nID0gbnVsbDtcbiAgICBTLnByZXZpZXcgPSBudWxsO1xuICAgIFMuaG92ZXIgPSBudWxsO1xuICAgIGJ1bXBTdGF0ZSgpO1xuICAgIHJlcGFpbnQoKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBhbmVsIHN0YXRlXG5cbmV4cG9ydCBpbnRlcmZhY2UgRWxlbWVudEluZm8ge1xuICAgIGtpbmQ6ICdrbm90JyB8ICd0YW5nZW50JztcbiAgICBjb3VudDogbnVtYmVyO1xuICAgIGtub3RzOiBudW1iZXI7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBwb3NpdGlvbjogKG51bWJlciB8IG51bGwpW107XG4gICAgcm90YXRpb246IChudW1iZXIgfCBudWxsKVtdO1xuICAgIG1vZGU6IG51bWJlciB8IG51bGw7XG4gICAgdGVuc2lvbjogbnVtYmVyIHwgbnVsbDtcbiAgICB0YW5nZW50SW46IG51bWJlciB8IG51bGw7XG4gICAgdGFuZ2VudE91dDogbnVtYmVyIHwgbnVsbDtcbiAgICBsaW5rZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFuZWxTdGF0ZSB7XG4gICAgcHJpbWFyeTogYm9vbGVhbjtcbiAgICByZWFkeTogYm9vbGVhbjtcbiAgICBjb250ZXh0OiBib29sZWFuO1xuICAgIHRvb2w6IFRvb2w7XG4gICAgZHJhd2luZzogYm9vbGVhbjtcbiAgICBpczJEOiBib29sZWFuO1xuICAgIHRyYW5zZm9ybVRvb2w6IHN0cmluZztcbiAgICBzZXR0aW5nczogdHlwZW9mIFMuc2V0dGluZ3M7XG4gICAgdGFyZ2V0czogeyB1dWlkOiBzdHJpbmc7IG5vZGU6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBzcGxpbmVzOiBudW1iZXI7IGtub3RzOiBudW1iZXIgfVtdO1xuICAgIHNlbGVjdGlvbjogeyBjb3VudDogbnVtYmVyOyBrbm90czogbnVtYmVyOyB0YW5nZW50czogbnVtYmVyIH07XG4gICAgZWxlbWVudDogRWxlbWVudEluZm8gfCBudWxsO1xuICAgIGFjdGlvbnM6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xuICAgIGNsb3NlZDogYm9vbGVhbiB8IG51bGw7XG59XG5cbmZ1bmN0aW9uIHNoYXJlZDxUPih2YWx1ZXM6IFRbXSwgZXE6IChhOiBULCBiOiBUKSA9PiBib29sZWFuID0gKGEsIGIpID0+IGEgPT09IGIpOiBUIHwgbnVsbCB7XG4gICAgaWYgKCF2YWx1ZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdmFsdWVzLmV2ZXJ5KCh2KSA9PiBlcSh2LCB2YWx1ZXNbMF0pKSA/IHZhbHVlc1swXSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJvdW5kKHY6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodiAqIDEwMDAwKSAvIDEwMDAwO1xufVxuXG5mdW5jdGlvbiBlbGVtZW50SW5mbyhsaXN0OiBFbGVtZW50UmVmW10pOiBFbGVtZW50SW5mbyB8IG51bGwge1xuICAgIGlmICghbGlzdC5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGtub3RzID0gbGlzdC5maWx0ZXIoKGUpID0+IGUucGFydCA9PT0gJ2tub3QnKTtcbiAgICBjb25zdCBpdGVtcyA9IGtub3RzLmxlbmd0aCA/IGtub3RzIDogbGlzdDtcbiAgICBjb25zdCBrcyA9IGl0ZW1zLm1hcCgoZSkgPT4gZ2V0S25vdChlKSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmICgha3MubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBwb3MgPSAoYXhpczogJ3gnIHwgJ3knIHwgJ3onKSA9PiBzaGFyZWQoa3MubWFwKChrOiBhbnkpID0+IHJvdW5kKGsucG9zaXRpb25bYXhpc10pKSk7XG4gICAgY29uc3QgZXVsZXJzID0ga3MubWFwKChrOiBhbnkpID0+IHFUb0V1bGVyKHYzKCksIGsucm90YXRpb24pKTtcbiAgICBjb25zdCByb3QgPSAoYXhpczogJ3gnIHwgJ3knIHwgJ3onKSA9PiBzaGFyZWQoZXVsZXJzLm1hcCgoZSkgPT4gcm91bmQoZVtheGlzXSkpKTtcbiAgICBjb25zdCB0aW4gPSBzaGFyZWQoa3MubWFwKChrOiBhbnkpID0+IHJvdW5kKGxlbih0YW5nZW50SW5WZWModjMoKSwgaykpKSkpO1xuICAgIGNvbnN0IHRvdXQgPSBzaGFyZWQoa3MubWFwKChrOiBhbnkpID0+IHJvdW5kKGxlbih0YW5nZW50T3V0VmVjKHYzKCksIGspKSkpKTtcbiAgICBjb25zdCBmaXJzdCA9IGl0ZW1zWzBdO1xuICAgIGNvbnN0IGtpbmQgPSBrbm90cy5sZW5ndGggPyAna25vdCcgOiAndGFuZ2VudCc7XG4gICAgbGV0IGxhYmVsOiBzdHJpbmc7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBsYWJlbCA9IGtpbmQgPT09ICdrbm90J1xuICAgICAgICAgICAgPyBgS25vdCAke2ZpcnN0Lmtub3R9YCArIChmaXJzdC5jb21wLnNwbGluZXMubGVuZ3RoID4gMSA/IGAgKFNwbGluZSAke2ZpcnN0LnNwbGluZX0pYCA6ICcnKVxuICAgICAgICAgICAgOiBgJHtmaXJzdC5wYXJ0ID09PSAnaW4nID8gJ0luJyA6ICdPdXQnfSBUYW5nZW50IG9mIEtub3QgJHtmaXJzdC5rbm90fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGFiZWwgPSBgJHtpdGVtcy5sZW5ndGh9ICR7a2luZCA9PT0gJ2tub3QnID8gJ0tub3RzJyA6ICdUYW5nZW50cyd9YDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAga2luZCxcbiAgICAgICAgY291bnQ6IGxpc3QubGVuZ3RoLFxuICAgICAgICBrbm90czoga25vdHMubGVuZ3RoLFxuICAgICAgICBsYWJlbCxcbiAgICAgICAgcG9zaXRpb246IFtwb3MoJ3gnKSwgcG9zKCd5JyksIHBvcygneicpXSxcbiAgICAgICAgcm90YXRpb246IFtyb3QoJ3gnKSwgcm90KCd5JyksIHJvdCgneicpXSxcbiAgICAgICAgbW9kZTogc2hhcmVkKGtzLm1hcCgoazogYW55KSA9PiBrLm1vZGUpKSxcbiAgICAgICAgdGVuc2lvbjogc2hhcmVkKGtzLm1hcCgoazogYW55KSA9PiByb3VuZChrLnRlbnNpb24pKSksXG4gICAgICAgIHRhbmdlbnRJbjogdGluLFxuICAgICAgICB0YW5nZW50T3V0OiB0b3V0LFxuICAgICAgICBsaW5rZWQ6IGtub3RzLnNvbWUoKGUpID0+IGlzTGlua2VkKGUuY29tcCwgeyBzcGxpbmU6IGUuc3BsaW5lLCBrbm90OiBlLmtub3QgfSkpLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdmFpbGFibGVBY3Rpb25zKCk6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+IHtcbiAgICBjb25zdCBrbm90cyA9IFMuc2VsZWN0aW9uLmtub3RzKCk7XG4gICAgY29uc3Qgc2FtZUNvbXAgPSBrbm90cy5sZW5ndGggPiAwICYmIGtub3RzLmV2ZXJ5KChlKSA9PiBlLmNvbXAgPT09IGtub3RzWzBdLmNvbXApO1xuICAgIGNvbnN0IGVuZHMgPSBrbm90cy5maWx0ZXIoKGUpID0+IGlzRW5kS25vdChlLmNvbXAuc3BsaW5lc1tlLnNwbGluZV0sIGUua25vdCkpO1xuICAgIGNvbnN0IG9uZSA9IGtub3RzLmxlbmd0aCA9PT0gMSA/IGtub3RzWzBdIDogbnVsbDtcbiAgICBjb25zdCBvbmVTcGxpbmUgPSBvbmUgPyBvbmUuY29tcC5zcGxpbmVzW29uZS5zcGxpbmVdIDogbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWxldGU6IFMuc2VsZWN0aW9uLnNpemUgPiAwLFxuICAgICAgICBsaW5rOiBrbm90cy5sZW5ndGggPj0gMiAmJiBzYW1lQ29tcCxcbiAgICAgICAgdW5saW5rOiBrbm90cy5zb21lKChlKSA9PiBpc0xpbmtlZChlLmNvbXAsIHsgc3BsaW5lOiBlLnNwbGluZSwga25vdDogZS5rbm90IH0pKSxcbiAgICAgICAgc3BsaXQ6ICEhb25lICYmICEhb25lU3BsaW5lICYmIChvbmVTcGxpbmUuY2xvc2VkIHx8IChvbmUua25vdCA+IDAgJiYgb25lLmtub3QgPCBvbmVTcGxpbmUua25vdHMubGVuZ3RoIC0gMSkpLFxuICAgICAgICBqb2luOiBrbm90cy5sZW5ndGggPT09IDIgJiYgc2FtZUNvbXAgJiYgZW5kcy5sZW5ndGggPT09IDIsXG4gICAgICAgIHJldmVyc2U6IGtub3RzLmxlbmd0aCA+IDAgfHwgUy5sYXN0VGFyZ2V0cy5sZW5ndGggPiAwLFxuICAgICAgICBjbG9zZTogUy5sYXN0VGFyZ2V0cy5sZW5ndGggPiAwLFxuICAgICAgICBzZWxlY3RBbGw6IFMubGFzdFRhcmdldHMubGVuZ3RoID4gMCxcbiAgICB9O1xufVxuXG4vKiogU3BsaW5lIG9mIHRoZSBzZWxlY3Rpb24gKG9yIHRoZSBmaXJzdCBzcGxpbmUgb2YgdGhlIGVkaXRlZCBjb250YWluZXJzKSBhbmQgd2hldGhlciBpdCBpcyBjbG9zZWQuICovXG5mdW5jdGlvbiBjbG9zZWRTdGF0ZSgpOiBib29sZWFuIHwgbnVsbCB7XG4gICAgY29uc3Qga25vdHMgPSBTLnNlbGVjdGlvbi5hbGwoKTtcbiAgICBjb25zdCBzcGxpbmVzID0gbmV3IFNldDxhbnk+KCk7XG4gICAgZm9yIChjb25zdCBlIG9mIGtub3RzKSB7XG4gICAgICAgIGNvbnN0IHMgPSBlLmNvbXAuc3BsaW5lc1tlLnNwbGluZV07XG4gICAgICAgIGlmIChzKSBzcGxpbmVzLmFkZChzKTtcbiAgICB9XG4gICAgaWYgKCFzcGxpbmVzLnNpemUpIGZvciAoY29uc3QgYyBvZiBTLmxhc3RUYXJnZXRzKSBmb3IgKGNvbnN0IHMgb2YgYy5zcGxpbmVzKSBzcGxpbmVzLmFkZChzKTtcbiAgICBpZiAoIXNwbGluZXMuc2l6ZSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHNoYXJlZChbLi4uc3BsaW5lc10ubWFwKChzKSA9PiAhIXMuY2xvc2VkKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYW5lbFN0YXRlKCk6IFBhbmVsU3RhdGUge1xuICAgIC8vIFVuZG8gb3IgYSBkZWxldGUgbWF5IGhhdmUgcmVtb3ZlZCBzZWxlY3RlZCBrbm90cyBzaW5jZSB0aGUgbGFzdCBmcmFtZS5cbiAgICBpZiAoUy5zZWxlY3Rpb24udmFsaWRhdGUoUy5sYXN0VGFyZ2V0cykpIGJ1bXBTdGF0ZSgpO1xuICAgIGNvbnN0IGxpc3QgPSBTLnNlbGVjdGlvbi5hbGwoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcmltYXJ5OiBTLnByaW1hcnksXG4gICAgICAgIHJlYWR5OiB0cnVlLFxuICAgICAgICBjb250ZXh0OiBTLmNvbnRleHQsXG4gICAgICAgIHRvb2w6IFMudG9vbCxcbiAgICAgICAgZHJhd2luZzogISFTLmRyYXdpbmcsXG4gICAgICAgIGlzMkQ6IGlzMkRWaWV3KCksXG4gICAgICAgIHRyYW5zZm9ybVRvb2w6IHRyYW5zZm9ybVRvb2xOYW1lKCksXG4gICAgICAgIHNldHRpbmdzOiB7IC4uLlMuc2V0dGluZ3MgfSxcbiAgICAgICAgdGFyZ2V0czogUy5sYXN0VGFyZ2V0cy5tYXAoKGMpID0+ICh7XG4gICAgICAgICAgICB1dWlkOiBjLnV1aWQsXG4gICAgICAgICAgICBub2RlOiBjLm5vZGUudXVpZCxcbiAgICAgICAgICAgIG5hbWU6IGMubm9kZS5uYW1lLFxuICAgICAgICAgICAgc3BsaW5lczogYy5zcGxpbmVzLmxlbmd0aCxcbiAgICAgICAgICAgIGtub3RzOiBjLnNwbGluZXMucmVkdWNlKChhOiBudW1iZXIsIHM6IGFueSkgPT4gYSArIHMua25vdHMubGVuZ3RoLCAwKSxcbiAgICAgICAgfSkpLFxuICAgICAgICBzZWxlY3Rpb246IHsgY291bnQ6IGxpc3QubGVuZ3RoLCBrbm90czogUy5zZWxlY3Rpb24ua25vdHMoKS5sZW5ndGgsIHRhbmdlbnRzOiBTLnNlbGVjdGlvbi50YW5nZW50cygpLmxlbmd0aCB9LFxuICAgICAgICBlbGVtZW50OiBlbGVtZW50SW5mbyhsaXN0KSxcbiAgICAgICAgYWN0aW9uczogYXZhaWxhYmxlQWN0aW9ucygpLFxuICAgICAgICBjbG9zZWQ6IGNsb3NlZFN0YXRlKCksXG4gICAgfTtcbn1cblxubGV0IGxhc3RTZW50ID0gJyc7XG5sZXQgbGFzdFNlbnRBdCA9IDA7XG5sZXQgdGltZXI6IGFueSA9IG51bGw7XG5cbi8qKiBTZW5kcyB0aGUgcGFuZWwgc3RhdGUgaWYgaXQgY2hhbmdlZCAodGhyb3R0bGVkKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXliZUJyb2FkY2FzdChmb3JjZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCFTLnByaW1hcnkpIHJldHVybjtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHdhaXQgPSBCUk9BRENBU1RfTVMgLSAobm93IC0gbGFzdFNlbnRBdCk7XG4gICAgaWYgKCFmb3JjZSAmJiB3YWl0ID4gMCkge1xuICAgICAgICBpZiAoIXRpbWVyKSB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgICAgbWF5YmVCcm9hZGNhc3QoKTtcbiAgICAgICAgfSwgd2FpdCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGpzb246IHN0cmluZztcbiAgICBjb25zdCBzdGF0ZSA9IHBhbmVsU3RhdGUoKTtcbiAgICB0cnkge1xuICAgICAgICBqc29uID0gSlNPTi5zdHJpbmdpZnkoc3RhdGUpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZm9yY2UgJiYganNvbiA9PT0gbGFzdFNlbnQpIHJldHVybjtcbiAgICBsYXN0U2VudCA9IGpzb247XG4gICAgbGFzdFNlbnRBdCA9IG5vdztcbiAgICB0cnkge1xuICAgICAgICBFZGl0b3IuTWVzc2FnZS5icm9hZGNhc3QoJ3NwbGluZXM6c3RhdGUnLCBzdGF0ZSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIGVkaXRvciBzaHV0dGluZyBkb3duXG4gICAgfVxufVxuXG5leHBvcnQgeyBUYW5nZW50TW9kZSB9O1xuIiwgIi8qKlxuICogRHJhd3Mgc3BsaW5lcywga25vdHMsIHRhbmdlbnRzIGFuZCBoYW5kbGVzIGludG8gdGhlIFNjZW5lIHZpZXcgZWFjaCBmcmFtZSxcbiAqIGFuZCBmaW5kcyB3aGF0IGlzIHVuZGVyIHRoZSBtb3VzZS5cbiAqL1xuaW1wb3J0IHsgVjMsIHYzLCBzY2FsZUFuZEFkZCwgbm9ybWFsaXplLCBsZW5TcSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL21hdGgnO1xuaW1wb3J0IHsgQ3VydmUsIGN1cnZlLCBldmFsUG9zaXRpb24sIGV2YWxEaXJlY3Rpb24gfSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9jdXJ2ZSc7XG5pbXBvcnQge1xuICAgIFRhbmdlbnRNb2RlLCBnZXRDdXJ2ZSwgY3VydmVDb3VudCwgcHJldkluZGV4LCBuZXh0SW5kZXgsIHRhbmdlbnRzRWRpdGFibGUsIGlzTGlua2VkLCBjdXJ2ZVVwLFxufSBmcm9tICcuLi8uLi9hc3NldHMvY29yZS9zcGxpbmUtY29yZSc7XG5pbXBvcnQgeyBhbGxDb250YWluZXJzLCBydW50aW1lUmVhZHkgfSBmcm9tICcuL2Vudic7XG5pbXBvcnQge1xuICAgIHNjZW5lQ2FtZXJhLCB0b1NjcmVlbiwgd29ybGRQZXJQaXhlbCwgZGlzdFRvU2VnbWVudCwgYmVnaW5MYWJlbHMsIGFkZExhYmVsLCBlbmRMYWJlbHMsIFNjcmVlblBvaW50LFxufSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0ICogYXMgRCBmcm9tICcuL2RyYXcnO1xuaW1wb3J0IHtcbiAgICBFbGVtZW50UmVmLCBQYXJ0LCB0b1dvcmxkLCBkaXJUb1dvcmxkLCBrbm90V29ybGRQb3NpdGlvbiwgdGFuZ2VudFdvcmxkUG9zaXRpb24sIHRhbmdlbnRVc2VkLCBnZXRLbm90LCBlbGVtZW50V29ybGRQb3NpdGlvbixcbn0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyBIaXQsIFMgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IGNvbXB1dGVGcmFtZSwgZHJhd0hhbmRsZSwgaGl0SGFuZGxlLCBIYW5kbGVGcmFtZSB9IGZyb20gJy4vaGFuZGxlcyc7XG5pbXBvcnQgeyB1cGRhdGVUYXJnZXRzIH0gZnJvbSAnLi9jb250ZXh0JztcblxuY29uc3QgS05PVF9QWCA9IDU7XG5jb25zdCBUQU5HRU5UX1BYID0gMy41O1xuY29uc3QgSElUX0tOT1QgPSA4O1xuY29uc3QgSElUX1RBTkdFTlQgPSA3O1xuY29uc3QgSElUX0NVUlZFID0gNjtcblxuY29uc3QgX3djOiBDdXJ2ZSA9IGN1cnZlKCk7XG5cbi8qKiBBIGN1cnZlJ3MgY29udHJvbCBwb2ludHMgaW4gd29ybGQgc3BhY2UgKEJlemllciBjdXJ2ZXMgYXJlIGFmZmluZSBpbnZhcmlhbnQpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdvcmxkQ3VydmUoY29tcDogYW55LCBzcGxpbmU6IGFueSwgaTogbnVtYmVyLCBvdXQ6IEN1cnZlID0gX3djKTogQ3VydmUge1xuICAgIGdldEN1cnZlKHNwbGluZSwgaSwgb3V0KTtcbiAgICB0b1dvcmxkKGNvbXAsIG91dC5wMCwgb3V0LnAwKTtcbiAgICB0b1dvcmxkKGNvbXAsIG91dC5wMSwgb3V0LnAxKTtcbiAgICB0b1dvcmxkKGNvbXAsIG91dC5wMiwgb3V0LnAyKTtcbiAgICB0b1dvcmxkKGNvbXAsIG91dC5wMywgb3V0LnAzKTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBjdXJ2ZVNhbXBsZXMoY2FtOiBhbnksIGM6IEN1cnZlKTogbnVtYmVyIHtcbiAgICBjb25zdCBhID0gdG9TY3JlZW4oY2FtLCBjLnAwKTtcbiAgICBjb25zdCBiID0gdG9TY3JlZW4oY2FtLCBjLnAxKTtcbiAgICBjb25zdCBkID0gdG9TY3JlZW4oY2FtLCBjLnAyKTtcbiAgICBjb25zdCBlID0gdG9TY3JlZW4oY2FtLCBjLnAzKTtcbiAgICBpZiAoIWEudmlzaWJsZSAmJiAhZS52aXNpYmxlKSByZXR1cm4gODtcbiAgICBjb25zdCBsID0gTWF0aC5oeXBvdChiLnggLSBhLngsIGIueSAtIGEueSkgKyBNYXRoLmh5cG90KGQueCAtIGIueCwgZC55IC0gYi55KSArIE1hdGguaHlwb3QoZS54IC0gZC54LCBlLnkgLSBkLnkpO1xuICAgIHJldHVybiBNYXRoLm1heCg0LCBNYXRoLm1pbig2NCwgTWF0aC5jZWlsKGwgLyAxMCkpKTtcbn1cblxuY29uc3QgcHRzOiBWM1tdID0gW107XG5mdW5jdGlvbiBzYW1wbGVQb2ludHMoY2FtOiBhbnksIGM6IEN1cnZlKTogVjNbXSB7XG4gICAgY29uc3QgbiA9IGN1cnZlU2FtcGxlcyhjYW0sIGMpO1xuICAgIHdoaWxlIChwdHMubGVuZ3RoIDw9IG4pIHB0cy5wdXNoKHYzKCkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG47IGkrKykgZXZhbFBvc2l0aW9uKHB0c1tpXSwgYywgaSAvIG4pO1xuICAgIHJldHVybiBwdHMuc2xpY2UoMCwgbiArIDEpO1xufVxuXG4vKiogVGFuZ2VudCBoYW5kbGVzIHNob3duIGZvciB0aGUgc2VsZWN0aW9uIChVbml0eTogdGhlIHRhbmdlbnRzIG9mIHRoZSBjdXJ2ZXMgbmV4dCB0byBzZWxlY3RlZCBlbGVtZW50cykuICovXG5leHBvcnQgZnVuY3Rpb24gdmlzaWJsZVRhbmdlbnRzKHRhcmdldHM6IGFueVtdKTogU2V0PHN0cmluZz4ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGlmICghUy5jb250ZXh0KSByZXR1cm4gc2V0O1xuICAgIGNvbnN0IGFkZFRhbmdlbnQgPSAoY29tcDogYW55LCBzOiBudW1iZXIsIGs6IG51bWJlciwgcGFydDogJ2luJyB8ICdvdXQnLCBhbGxvd0F1dG86IGJvb2xlYW4pID0+IHtcbiAgICAgICAgY29uc3Qgc3BsaW5lID0gY29tcC5zcGxpbmVzW3NdO1xuICAgICAgICBjb25zdCBrbm90ID0gc3BsaW5lPy5rbm90c1trXTtcbiAgICAgICAgaWYgKCFrbm90IHx8ICF0YW5nZW50VXNlZChzcGxpbmUsIGssIHBhcnQpKSByZXR1cm47XG4gICAgICAgIGlmICghdGFuZ2VudHNFZGl0YWJsZShrbm90Lm1vZGUpICYmICEoYWxsb3dBdXRvICYmIGtub3QubW9kZSA9PT0gVGFuZ2VudE1vZGUuQXV0b1Ntb290aCkpIHJldHVybjtcbiAgICAgICAgc2V0LmFkZChgJHtjb21wLnV1aWR9OiR7c306JHtrfToke3BhcnR9YCk7XG4gICAgfTtcbiAgICBpZiAoUy5zZXR0aW5ncy5zaG93QWxsVGFuZ2VudHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBjb21wIG9mIHRhcmdldHMpIHtcbiAgICAgICAgICAgIGNvbXAuc3BsaW5lcy5mb3JFYWNoKChzcGxpbmU6IGFueSwgczogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzcGxpbmUua25vdHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkVGFuZ2VudChjb21wLCBzLCBrLCAnaW4nLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGFkZFRhbmdlbnQoY29tcCwgcywgaywgJ291dCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGUgb2YgUy5zZWxlY3Rpb24uYWxsKCkpIHtcbiAgICAgICAgY29uc3Qgc3BsaW5lID0gZS5jb21wLnNwbGluZXNbZS5zcGxpbmVdO1xuICAgICAgICBpZiAoIXNwbGluZSkgY29udGludWU7XG4gICAgICAgIGNvbnN0IG4gPSBzcGxpbmUua25vdHMubGVuZ3RoO1xuICAgICAgICBhZGRUYW5nZW50KGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgJ2luJywgZS5wYXJ0ID09PSAna25vdCcpO1xuICAgICAgICBhZGRUYW5nZW50KGUuY29tcCwgZS5zcGxpbmUsIGUua25vdCwgJ291dCcsIGUucGFydCA9PT0gJ2tub3QnKTtcbiAgICAgICAgY29uc3QgcCA9IHByZXZJbmRleChlLmtub3QsIG4sIHNwbGluZS5jbG9zZWQpO1xuICAgICAgICBjb25zdCBxID0gbmV4dEluZGV4KGUua25vdCwgbiwgc3BsaW5lLmNsb3NlZCk7XG4gICAgICAgIGlmIChwICE9PSBlLmtub3QpIGFkZFRhbmdlbnQoZS5jb21wLCBlLnNwbGluZSwgcCwgJ291dCcsIGZhbHNlKTtcbiAgICAgICAgaWYgKHEgIT09IGUua25vdCkgYWRkVGFuZ2VudChlLmNvbXAsIGUuc3BsaW5lLCBxLCAnaW4nLCBmYWxzZSk7XG4gICAgfVxuICAgIHJldHVybiBzZXQ7XG59XG5cbmZ1bmN0aW9uIGhvdmVySXMoa2luZDogJ2tub3QnIHwgJ3RhbmdlbnQnLCBjb21wOiBhbnksIHM6IG51bWJlciwgazogbnVtYmVyLCBwYXJ0OiBQYXJ0KTogYm9vbGVhbiB7XG4gICAgY29uc3QgaCA9IFMuaG92ZXI7XG4gICAgaWYgKCFoIHx8IChoLmtpbmQgIT09IGtpbmQpKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgciA9IChoIGFzIGFueSkucmVmIGFzIEVsZW1lbnRSZWY7XG4gICAgcmV0dXJuIHIuY29tcCA9PT0gY29tcCAmJiByLnNwbGluZSA9PT0gcyAmJiByLmtub3QgPT09IGsgJiYgci5wYXJ0ID09PSBwYXJ0O1xufVxuXG5mdW5jdGlvbiBob3ZlckN1cnZlKGNvbXA6IGFueSwgczogbnVtYmVyLCBpOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBoID0gUy5ob3ZlcjtcbiAgICByZXR1cm4gISFoICYmIGgua2luZCA9PT0gJ2N1cnZlJyAmJiBoLmNvbXAgPT09IGNvbXAgJiYgaC5zcGxpbmUgPT09IHMgJiYgaC5jdXJ2ZSA9PT0gaTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkcmF3XG5cbmxldCBoYW5kbGVBeGVzT3ZlcnJpZGU6IFtWMywgVjMsIFYzXSB8IG51bGwgPSBudWxsO1xuXG4vKiogS2VlcHMgdGhlIGhhbmRsZSBvcmllbnRhdGlvbiBmaXhlZCBkdXJpbmcgYSBkcmFnLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEhhbmRsZUF4ZXNPdmVycmlkZShheGVzOiBbVjMsIFYzLCBWM10gfCBudWxsKTogdm9pZCB7XG4gICAgaGFuZGxlQXhlc092ZXJyaWRlID0gYXhlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRIYW5kbGVGcmFtZShjYW06IGFueSk6IEhhbmRsZUZyYW1lIHwgbnVsbCB7XG4gICAgaWYgKCFTLmNvbnRleHQgfHwgUy50b29sICE9PSAnc2VsZWN0JykgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgbGlzdCA9IFMuc2VsZWN0aW9uLmFsbCgpO1xuICAgIGlmICghbGlzdC5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb21wdXRlRnJhbWUoY2FtLCBsaXN0LCBoYW5kbGVBeGVzT3ZlcnJpZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd0ZyYW1lKCk6IHZvaWQge1xuICAgIGlmICghcnVudGltZVJlYWR5KCkpIHJldHVybjtcbiAgICBjb25zdCBjYW0gPSBzY2VuZUNhbWVyYSgpO1xuICAgIGlmICghY2FtKSByZXR1cm47XG4gICAgY29uc3QgdGFyZ2V0cyA9IHVwZGF0ZVRhcmdldHMoKTtcbiAgICBjb25zdCBjb250YWluZXJzID0gUy5zZXR0aW5ncy5zaG93QWxsID8gYWxsQ29udGFpbmVycygpIDogdGFyZ2V0cztcbiAgICBpZiAoIWNvbnRhaW5lcnMubGVuZ3RoICYmICFTLnByZXZpZXcpIHtcbiAgICAgICAgZW5kTGFiZWxzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFELmJlZ2luRHJhdyhjYW0pKSByZXR1cm47XG4gICAgUy5kaWFnLmRyYXdzKys7XG4gICAgYmVnaW5MYWJlbHMoKTtcbiAgICBjb25zdCB0YW5nZW50cyA9IHZpc2libGVUYW5nZW50cyh0YXJnZXRzKTtcbiAgICBmb3IgKGNvbnN0IGNvbXAgb2YgY29udGFpbmVycykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZHJhd0NvbnRhaW5lcihjYW0sIGNvbXAsIHRhcmdldHMuaW5jbHVkZXMoY29tcCksIHRhbmdlbnRzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgUy5kaWFnLmVycm9ycy5sZW5ndGggPCAzMCAmJiBTLmRpYWcuZXJyb3JzLnB1c2goU3RyaW5nKChlIGFzIEVycm9yKT8uc3RhY2sgfHwgZSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChTLmNvbnRleHQgJiYgUy50b29sID09PSAnc2VsZWN0Jykge1xuICAgICAgICBjb25zdCBmID0gY3VycmVudEhhbmRsZUZyYW1lKGNhbSk7XG4gICAgICAgIGlmIChmKSBkcmF3SGFuZGxlKGNhbSwgZiwgUy5ob3Zlcj8ua2luZCA9PT0gJ2hhbmRsZScgPyBTLmhvdmVyLmF4aXMgOiBkcmFnQXhpcyk7XG4gICAgfVxuICAgIGRyYXdUb29sUHJldmlldyhjYW0pO1xuICAgIGVuZExhYmVscygpO1xufVxuXG4vKiogQXhpcyBiZWluZyBkcmFnZ2VkIChoaWdobGlnaHRlZCkuICovXG5leHBvcnQgbGV0IGRyYWdBeGlzOiBhbnkgPSBudWxsO1xuZXhwb3J0IGZ1bmN0aW9uIHNldERyYWdBeGlzKGE6IGFueSk6IHZvaWQge1xuICAgIGRyYWdBeGlzID0gYTtcbn1cblxuLyoqIEV4dHJhIGRyYXdpbmcgaG9vayBmb3IgdGhlIERyYXcgdG9vbC4gKi9cbmxldCBwcmV2aWV3RHJhd2VyOiAoKGNhbTogYW55KSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFByZXZpZXdEcmF3ZXIoZm46ICgoY2FtOiBhbnkpID0+IHZvaWQpIHwgbnVsbCk6IHZvaWQge1xuICAgIHByZXZpZXdEcmF3ZXIgPSBmbjtcbn1cblxuZnVuY3Rpb24gZHJhd1Rvb2xQcmV2aWV3KGNhbTogYW55KTogdm9pZCB7XG4gICAgaWYgKHByZXZpZXdEcmF3ZXIpIHByZXZpZXdEcmF3ZXIoY2FtKTtcbn1cblxuY29uc3QgX3AgPSB2MygpO1xuY29uc3QgX3EgPSB2MygpO1xuXG5mdW5jdGlvbiBkcmF3Q29udGFpbmVyKGNhbTogYW55LCBjb21wOiBhbnksIGlzVGFyZ2V0OiBib29sZWFuLCB0YW5nZW50czogU2V0PHN0cmluZz4pOiB2b2lkIHtcbiAgICBjb25zdCBlZGl0ID0gaXNUYXJnZXQgJiYgUy5jb250ZXh0O1xuICAgIGNvbXAuc3BsaW5lcy5mb3JFYWNoKChzcGxpbmU6IGFueSwgczogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gY3VydmVDb3VudChzcGxpbmUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB3b3JsZEN1cnZlKGNvbXAsIHNwbGluZSwgaSk7XG4gICAgICAgICAgICBjb25zdCBwb2ludHMgPSBzYW1wbGVQb2ludHMoY2FtLCBjKTtcbiAgICAgICAgICAgIGxldCBjb2wgPSBpc1RhcmdldCA/IEQuQ29sb3JzLmN1cnZlU2VsZWN0ZWQgOiBELkNvbG9ycy5jdXJ2ZURpbTtcbiAgICAgICAgICAgIGlmIChlZGl0ICYmIGhvdmVyQ3VydmUoY29tcCwgcywgaSkpIGNvbCA9IEQuQ29sb3JzLmN1cnZlSG92ZXI7XG4gICAgICAgICAgICBELnBvbHlsaW5lKHBvaW50cywgY29sLCBpc1RhcmdldCA/IDIgOiAxKTtcbiAgICAgICAgICAgIGlmIChpc1RhcmdldCAmJiBTLnNldHRpbmdzLnNob3dGbG93ICYmIHBvaW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgLy8gRGlyZWN0aW9uIGFycm93IGluIHRoZSBtaWRkbGUgb2YgZWFjaCBjdXJ2ZS5cbiAgICAgICAgICAgICAgICBldmFsUG9zaXRpb24oX3AsIGMsIDAuNSk7XG4gICAgICAgICAgICAgICAgZXZhbERpcmVjdGlvbihfcSwgYywgMC41KTtcbiAgICAgICAgICAgICAgICBELmNoZXZyb24oX3AsIF9xLCA3LCBELkNvbG9ycy5mbG93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1RhcmdldCAmJiBTLnNldHRpbmdzLnNob3dOb3JtYWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbiA9IDQ7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBqIC8gbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IG4gJiYgaSA8IGNvdW50IC0gMSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGV2YWxQb3NpdGlvbihfcCwgYywgdCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwID0gdXBBdChjb21wLCBzcGxpbmUsIGksIHQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsID0gd29ybGRQZXJQaXhlbChjYW0sIF9wKSAqIDIyO1xuICAgICAgICAgICAgICAgICAgICBELmxpbmUoX3AsIHNjYWxlQW5kQWRkKHYzKCksIF9wLCB1cCwgbCksIEQuQ29sb3JzLm5vcm1hbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaXNUYXJnZXQpIHJldHVybjtcbiAgICAgICAgY29uc3QgbiA9IHNwbGluZS5rbm90cy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbjsgaysrKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBrbm90V29ybGRQb3NpdGlvbihjb21wLCBzLCBrLCB2MygpKTtcbiAgICAgICAgICAgIGNvbnN0IHNwID0gdG9TY3JlZW4oY2FtLCBwb3MpO1xuICAgICAgICAgICAgaWYgKCFzcC52aXNpYmxlKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChlZGl0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIFsnaW4nLCAnb3V0J10gYXMgY29uc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YW5nZW50cy5oYXMoYCR7Y29tcC51dWlkfToke3N9OiR7a306JHtwYXJ0fWApKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd1RhbmdlbnQoY2FtLCBjb21wLCBzLCBrLCBwYXJ0LCBwb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRyYXdLbm90KGNhbSwgY29tcCwgcywgaywgcG9zLCBlZGl0KTtcbiAgICAgICAgICAgIGlmIChTLnNldHRpbmdzLnNob3dLbm90SW5kaWNlcyAmJiBlZGl0KSB7XG4gICAgICAgICAgICAgICAgYWRkTGFiZWwoY2FtLCBzcC54LCBzcC55LCBuID4gMCAmJiBzcGxpbmUuY2xvc2VkID09PSBmYWxzZSAmJiBrID09PSAwID8gYCR7a30gKHN0YXJ0KWAgOiBTdHJpbmcoayksICcjZGRkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPT09IDEgJiYgZWRpdCkge1xuICAgICAgICAgICAgLy8gQSBsb25lIGtub3Qgc3RpbGwgc2hvd3MgaXRzIGRpcmVjdGlvbi5cbiAgICAgICAgICAgIGNvbnN0IGsgPSBzcGxpbmUua25vdHNbMF07XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBrbm90V29ybGRQb3NpdGlvbihjb21wLCBzLCAwLCB2MygpKTtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IGRpclRvV29ybGQoY29tcCwgcm90YXRlWihrKSwgdjMoKSk7XG4gICAgICAgICAgICBELmNoZXZyb24oc2NhbGVBbmRBZGQodjMoKSwgcG9zLCBub3JtYWxpemUodjMoKSwgZGlyKSwgd29ybGRQZXJQaXhlbChjYW0sIHBvcykgKiAyMiksIGRpciwgNywgRC5Db2xvcnMuZmxvdyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcm90YXRlWihrOiBhbnkpOiBWMyB7XG4gICAgLy8gS25vdCBmb3J3YXJkICgrWikgaW4gc3BsaW5lIHNwYWNlLlxuICAgIGNvbnN0IHEgPSBrLnJvdGF0aW9uO1xuICAgIGNvbnN0IHggPSAyICogKHEueCAqIHEueiArIHEudyAqIHEueSk7XG4gICAgY29uc3QgeSA9IDIgKiAocS55ICogcS56IC0gcS53ICogcS54KTtcbiAgICBjb25zdCB6ID0gMSAtIDIgKiAocS54ICogcS54ICsgcS55ICogcS55KTtcbiAgICByZXR1cm4gdjMoeCwgeSwgeik7XG59XG5cbi8qKiBXb3JsZCB1cCB2ZWN0b3Igb24gY3VydmUgYGN1cnZlSW5kZXhgIGF0IGN1cnZlIHBhcmFtZXRlciB0LiAqL1xuZnVuY3Rpb24gdXBBdChjb21wOiBhbnksIHNwbGluZTogYW55LCBjdXJ2ZUluZGV4OiBudW1iZXIsIHQ6IG51bWJlcik6IFYzIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBsb2NhbCA9IGN1cnZlVXAoc3BsaW5lLCBzcGxpbmUuY2FjaGUsIGN1cnZlSW5kZXgsIHQsIHYzKCkpO1xuICAgICAgICBjb25zdCB3ID0gZGlyVG9Xb3JsZChjb21wLCBsb2NhbCwgdjMoKSk7XG4gICAgICAgIHJldHVybiBsZW5TcSh3KSA+IDAgPyBub3JtYWxpemUodywgdykgOiB2MygwLCAxLCAwKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIHYzKDAsIDEsIDApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhd0tub3QoY2FtOiBhbnksIGNvbXA6IGFueSwgczogbnVtYmVyLCBrOiBudW1iZXIsIHBvczogVjMsIGVkaXQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IGVkaXQgJiYgUy5zZWxlY3Rpb24uaGFzS25vdChjb21wLCBzLCBrKTtcbiAgICBjb25zdCBob3ZlcmVkID0gZWRpdCAmJiBob3ZlcklzKCdrbm90JywgY29tcCwgcywgaywgJ2tub3QnKTtcbiAgICBjb25zdCBsaW5rZWQgPSBpc0xpbmtlZChjb21wLCB7IHNwbGluZTogcywga25vdDogayB9KTtcbiAgICBpZiAoIWVkaXQpIHtcbiAgICAgICAgRC5kaXNjKHBvcywgMywgRC5Db2xvcnMuY3VydmVTZWxlY3RlZCwgMTApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHIgPSBzZWxlY3RlZCB8fCBob3ZlcmVkID8gS05PVF9QWCArIDEgOiBLTk9UX1BYO1xuICAgIEQuZGlzYyhwb3MsIHIsIHNlbGVjdGVkID8gRC5Db2xvcnMuc2VsZWN0ZWQgOiBELkNvbG9ycy5rbm90LCAxNCk7XG4gICAgRC5jaXJjbGUocG9zLCByLCBob3ZlcmVkID8gRC5Db2xvcnMuaG92ZXIgOiBsaW5rZWQgPyBELkNvbG9ycy5saW5rZWQgOiBELkNvbG9ycy5rbm90T3V0bGluZSwgMTQpO1xuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAvLyBLbm90IG9yaWVudGF0aW9uOiBmb3J3YXJkIGFsb25nIHRoZSBzcGxpbmUsIHVwIGluIGdyZWVuLlxuICAgICAgICBjb25zdCBrbm90ID0gY29tcC5zcGxpbmVzW3NdLmtub3RzW2tdO1xuICAgICAgICBjb25zdCB3cHAgPSB3b3JsZFBlclBpeGVsKGNhbSwgcG9zKTtcbiAgICAgICAgY29uc3QgZndkID0gbm9ybWFsaXplKHYzKCksIGRpclRvV29ybGQoY29tcCwgcm90YXRlWihrbm90KSwgdjMoKSkpO1xuICAgICAgICBjb25zdCB1cExvY2FsID0gdXBPZihrbm90KTtcbiAgICAgICAgY29uc3QgdXAgPSBub3JtYWxpemUodjMoKSwgZGlyVG9Xb3JsZChjb21wLCB1cExvY2FsLCB2MygpKSk7XG4gICAgICAgIGlmIChsZW5TcSh1cCkgPiAwKSBELmxpbmUocG9zLCBzY2FsZUFuZEFkZCh2MygpLCBwb3MsIHVwLCB3cHAgKiAyMCksIEQuQ29sb3JzLm5vcm1hbCk7XG4gICAgICAgIGlmIChsZW5TcShmd2QpID4gMCAmJiBrbm90Lm1vZGUgPT09IFRhbmdlbnRNb2RlLkxpbmVhcikgRC5saW5lKHBvcywgc2NhbGVBbmRBZGQodjMoKSwgcG9zLCBmd2QsIHdwcCAqIDE0KSwgRC5Db2xvcnMuc2VsZWN0ZWQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBPZihrOiBhbnkpOiBWMyB7XG4gICAgY29uc3QgcSA9IGsucm90YXRpb247XG4gICAgY29uc3QgeCA9IDIgKiAocS54ICogcS55IC0gcS53ICogcS56KTtcbiAgICBjb25zdCB5ID0gMSAtIDIgKiAocS54ICogcS54ICsgcS56ICogcS56KTtcbiAgICBjb25zdCB6ID0gMiAqIChxLnkgKiBxLnogKyBxLncgKiBxLngpO1xuICAgIHJldHVybiB2Myh4LCB5LCB6KTtcbn1cblxuZnVuY3Rpb24gZHJhd1RhbmdlbnQoY2FtOiBhbnksIGNvbXA6IGFueSwgczogbnVtYmVyLCBrOiBudW1iZXIsIHBhcnQ6ICdpbicgfCAnb3V0Jywga25vdFBvczogVjMpOiB2b2lkIHtcbiAgICBjb25zdCBlbmQgPSB0YW5nZW50V29ybGRQb3NpdGlvbihjb21wLCBzLCBrLCBwYXJ0LCB2MygpKTtcbiAgICBjb25zdCByZWY6IEVsZW1lbnRSZWYgPSB7IGNvbXAsIHNwbGluZTogcywga25vdDogaywgcGFydCB9O1xuICAgIGNvbnN0IHNlbGVjdGVkID0gUy5zZWxlY3Rpb24uaGFzKHJlZik7XG4gICAgY29uc3QgaG92ZXJlZCA9IGhvdmVySXMoJ3RhbmdlbnQnLCBjb21wLCBzLCBrLCBwYXJ0KTtcbiAgICBjb25zdCBhdXRvID0gY29tcC5zcGxpbmVzW3NdLmtub3RzW2tdLm1vZGUgPT09IFRhbmdlbnRNb2RlLkF1dG9TbW9vdGg7XG4gICAgY29uc3QgbGluZUNvbCA9IHNlbGVjdGVkID8gRC5Db2xvcnMuc2VsZWN0ZWQgOiBhdXRvID8gRC53aXRoQWxwaGEoRC5Db2xvcnMudGFuZ2VudExpbmUsIDEyMCkgOiBELkNvbG9ycy50YW5nZW50TGluZTtcbiAgICBELmxpbmUoa25vdFBvcywgZW5kLCBsaW5lQ29sKTtcbiAgICBjb25zdCBjb2wgPSBzZWxlY3RlZCA/IEQuQ29sb3JzLnNlbGVjdGVkIDogaG92ZXJlZCA/IEQuQ29sb3JzLmhvdmVyIDogYXV0byA/IEQud2l0aEFscGhhKEQuQ29sb3JzLnRhbmdlbnQsIDE0MCkgOiBELkNvbG9ycy50YW5nZW50O1xuICAgIEQuZGlhbW9uZChlbmQsIGhvdmVyZWQgfHwgc2VsZWN0ZWQgPyBUQU5HRU5UX1BYICsgMSA6IFRBTkdFTlRfUFgsIGNvbCwgdHJ1ZSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBoaXQgdGVzdFxuXG4vKiogRWxlbWVudCAvIGhhbmRsZSAvIGN1cnZlIHVuZGVyIGEgc2NyZWVuIHBvaW50ICh0b3Btb3N0IGZpcnN0KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaXRUZXN0KGNhbTogYW55LCBteDogbnVtYmVyLCBteTogbnVtYmVyLCBvcHRzOiB7IGhhbmRsZXM/OiBib29sZWFuOyBjdXJ2ZXM/OiBib29sZWFuOyBvdXRzaWRlQ29udGV4dD86IGJvb2xlYW4gfSA9IHt9KTogSGl0IHwgbnVsbCB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IFMubGFzdFRhcmdldHM7XG4gICAgaWYgKCF0YXJnZXRzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKFMuY29udGV4dCAmJiBvcHRzLmhhbmRsZXMgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGYgPSBjdXJyZW50SGFuZGxlRnJhbWUoY2FtKTtcbiAgICAgICAgaWYgKGYpIHtcbiAgICAgICAgICAgIGNvbnN0IGF4aXMgPSBoaXRIYW5kbGUoY2FtLCBmLCBteCwgbXkpO1xuICAgICAgICAgICAgaWYgKGF4aXMpIHJldHVybiB7IGtpbmQ6ICdoYW5kbGUnLCBheGlzIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3A6IFNjcmVlblBvaW50ID0geyB4OiAwLCB5OiAwLCB2aXNpYmxlOiB0cnVlIH07XG4gICAgLy8gVGFuZ2VudHMgZmlyc3QgKHRoZXkgc2l0IG9uIHRvcCBvZiBrbm90cyB3aGVuIHNob3J0KS5cbiAgICBpZiAoUy5jb250ZXh0KSB7XG4gICAgICAgIGxldCBiZXN0OiBIaXQgfCBudWxsID0gbnVsbDtcbiAgICAgICAgbGV0IGJlc3REID0gSElUX1RBTkdFTlQ7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHZpc2libGVUYW5nZW50cyh0YXJnZXRzKSkge1xuICAgICAgICAgICAgY29uc3QgW3V1aWQsIHNzLCBraywgcGFydF0gPSBrZXkuc3BsaXQoJzonKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbXAgPSB0YXJnZXRzLmZpbmQoKGMpID0+IGMudXVpZCA9PT0gdXVpZCk7XG4gICAgICAgICAgICBpZiAoIWNvbXApIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgcyA9IE51bWJlcihzcyk7XG4gICAgICAgICAgICBjb25zdCBrID0gTnVtYmVyKGtrKTtcbiAgICAgICAgICAgIHRvU2NyZWVuKGNhbSwgdGFuZ2VudFdvcmxkUG9zaXRpb24oY29tcCwgcywgaywgcGFydCBhcyAnaW4nIHwgJ291dCcpLCBzcCk7XG4gICAgICAgICAgICBpZiAoIXNwLnZpc2libGUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgZCA9IE1hdGguaHlwb3Qoc3AueCAtIG14LCBzcC55IC0gbXkpO1xuICAgICAgICAgICAgaWYgKGQgPCBiZXN0RCkge1xuICAgICAgICAgICAgICAgIGJlc3REID0gZDtcbiAgICAgICAgICAgICAgICBiZXN0ID0geyBraW5kOiAndGFuZ2VudCcsIHJlZjogeyBjb21wLCBzcGxpbmU6IHMsIGtub3Q6IGssIHBhcnQ6IHBhcnQgYXMgUGFydCB9IH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJlc3QpIHJldHVybiBiZXN0O1xuICAgIH1cbiAgICBpZiAoUy5jb250ZXh0IHx8IG9wdHMub3V0c2lkZUNvbnRleHQpIHtcbiAgICAgICAgbGV0IGJlc3Q6IEhpdCB8IG51bGwgPSBudWxsO1xuICAgICAgICBsZXQgYmVzdEQgPSBISVRfS05PVDtcbiAgICAgICAgZm9yIChjb25zdCBjb21wIG9mIHRhcmdldHMpIHtcbiAgICAgICAgICAgIGNvbXAuc3BsaW5lcy5mb3JFYWNoKChzcGxpbmU6IGFueSwgczogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzcGxpbmUua25vdHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdG9TY3JlZW4oY2FtLCBrbm90V29ybGRQb3NpdGlvbihjb21wLCBzLCBrKSwgc3ApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNwLnZpc2libGUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gTWF0aC5oeXBvdChzcC54IC0gbXgsIHNwLnkgLSBteSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkIDwgYmVzdEQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3REID0gZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3QgPSB7IGtpbmQ6ICdrbm90JywgcmVmOiB7IGNvbXAsIHNwbGluZTogcywga25vdDogaywgcGFydDogJ2tub3QnIH0gfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiZXN0KSByZXR1cm4gYmVzdDtcbiAgICB9XG4gICAgaWYgKG9wdHMuY3VydmVzICE9PSBmYWxzZSAmJiAoUy5jb250ZXh0IHx8IG9wdHMub3V0c2lkZUNvbnRleHQpKSByZXR1cm4gaGl0Q3VydmUoY2FtLCBteCwgbXksIHRhcmdldHMpO1xuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGl0Q3VydmUoY2FtOiBhbnksIG14OiBudW1iZXIsIG15OiBudW1iZXIsIHRhcmdldHM6IGFueVtdLCBtYXhQeCA9IEhJVF9DVVJWRSk6IEhpdCB8IG51bGwge1xuICAgIGxldCBiZXN0OiBIaXQgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgYmVzdEQgPSBtYXhQeDtcbiAgICBjb25zdCBhOiBTY3JlZW5Qb2ludCA9IHsgeDogMCwgeTogMCwgdmlzaWJsZTogdHJ1ZSB9O1xuICAgIGNvbnN0IGI6IFNjcmVlblBvaW50ID0geyB4OiAwLCB5OiAwLCB2aXNpYmxlOiB0cnVlIH07XG4gICAgZm9yIChjb25zdCBjb21wIG9mIHRhcmdldHMpIHtcbiAgICAgICAgY29tcC5zcGxpbmVzLmZvckVhY2goKHNwbGluZTogYW55LCBzOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gY3VydmVDb3VudChzcGxpbmUpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHdvcmxkQ3VydmUoY29tcCwgc3BsaW5lLCBpLCBjdXJ2ZSgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuID0gY3VydmVTYW1wbGVzKGNhbSwgYykgKiAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IHAgPSB2MygpO1xuICAgICAgICAgICAgICAgIGV2YWxQb3NpdGlvbihwLCBjLCAwKTtcbiAgICAgICAgICAgICAgICB0b1NjcmVlbihjYW0sIHAsIGEpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IG47IGorKykge1xuICAgICAgICAgICAgICAgICAgICBldmFsUG9zaXRpb24ocCwgYywgaiAvIG4pO1xuICAgICAgICAgICAgICAgICAgICB0b1NjcmVlbihjYW0sIHAsIGIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYS52aXNpYmxlICYmIGIudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgciA9IGRpc3RUb1NlZ21lbnQobXgsIG15LCBhLngsIGEueSwgYi54LCBiLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIuZGlzdCA8IGJlc3REKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdEQgPSByLmRpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IChqIC0gMSArIHIuZikgLyBuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3QgPSB7IGtpbmQ6ICdjdXJ2ZScsIGNvbXAsIHNwbGluZTogcywgY3VydmU6IGksIHQsIHdvcmxkOiBldmFsUG9zaXRpb24odjMoKSwgYywgdCkgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhLnggPSBiLng7XG4gICAgICAgICAgICAgICAgICAgIGEueSA9IGIueTtcbiAgICAgICAgICAgICAgICAgICAgYS52aXNpYmxlID0gYi52aXNpYmxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBiZXN0O1xufVxuXG4vKiogS25vdHMgaW5zaWRlIGEgc2NyZWVuIHJlY3RhbmdsZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrbm90c0luUmVjdChjYW06IGFueSwgeDA6IG51bWJlciwgeTA6IG51bWJlciwgeDE6IG51bWJlciwgeTE6IG51bWJlcik6IEVsZW1lbnRSZWZbXSB7XG4gICAgY29uc3QgbWluWCA9IE1hdGgubWluKHgwLCB4MSk7XG4gICAgY29uc3QgbWF4WCA9IE1hdGgubWF4KHgwLCB4MSk7XG4gICAgY29uc3QgbWluWSA9IE1hdGgubWluKHkwLCB5MSk7XG4gICAgY29uc3QgbWF4WSA9IE1hdGgubWF4KHkwLCB5MSk7XG4gICAgY29uc3QgcmVzOiBFbGVtZW50UmVmW10gPSBbXTtcbiAgICBjb25zdCBzcDogU2NyZWVuUG9pbnQgPSB7IHg6IDAsIHk6IDAsIHZpc2libGU6IHRydWUgfTtcbiAgICBmb3IgKGNvbnN0IGNvbXAgb2YgUy5sYXN0VGFyZ2V0cykge1xuICAgICAgICBjb21wLnNwbGluZXMuZm9yRWFjaCgoc3BsaW5lOiBhbnksIHM6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzcGxpbmUua25vdHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICB0b1NjcmVlbihjYW0sIGtub3RXb3JsZFBvc2l0aW9uKGNvbXAsIHMsIGspLCBzcCk7XG4gICAgICAgICAgICAgICAgaWYgKHNwLnZpc2libGUgJiYgc3AueCA+PSBtaW5YICYmIHNwLnggPD0gbWF4WCAmJiBzcC55ID49IG1pblkgJiYgc3AueSA8PSBtYXhZKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKHsgY29tcCwgc3BsaW5lOiBzLCBrbm90OiBrLCBwYXJ0OiAna25vdCcgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cbiIsICIvKipcbiAqIFVuZG8gdGhyb3VnaCB0aGUgZWRpdG9yJ3MgcmVjb3JkaW5nIEFQSTogYmVnaW4tcmVjb3JkaW5nIHNuYXBzaG90cyB0aGVcbiAqIG5vZGVzLCBlbmQtcmVjb3JkaW5nIHR1cm5zIHRoZSBkaWZmZXJlbmNlIGludG8gb25lIHVuZG8gc3RlcC5cbiAqXG4gKiBFZGl0cyBtYWRlIHdoaWxlIGEgcmVjb3JkaW5nIGlzIGJlaW5nIG9wZW5lZCBhcmUgaGVsZCBiYWNrIHVudGlsIGl0IGlzXG4gKiBvcGVuLCBzbyB0aGUgc25hcHNob3QgYWx3YXlzIGhhcyB0aGUgc3RhdGUgZnJvbSBiZWZvcmUgdGhlIGVkaXQuXG4gKi9cbmltcG9ydCB7IG5vdGlmeU5vZGVDaGFuZ2VkLCByZXBhaW50IH0gZnJvbSAnLi9lbnYnO1xuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0KG5hbWU6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdzY2VuZScsIG5hbWUgYXMgYW55LCAuLi5hcmdzKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJlZ2luUmVjb3JkaW5nKHV1aWRzOiBzdHJpbmdbXSk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIGlmICghdXVpZHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBpZCA9IGF3YWl0IHJlcXVlc3QoJ2JlZ2luLXJlY29yZGluZycsIHV1aWRzKTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgJiYgaWQgPyBpZCA6IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1tTcGxpbmVzXSBiZWdpbi1yZWNvcmRpbmcgZmFpbGVkOicsIGUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbmRSZWNvcmRpbmcoaWQ6IHN0cmluZyB8IG51bGwsIGNhbmNlbCA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHJlcXVlc3QoY2FuY2VsID8gJ2NhbmNlbC1yZWNvcmRpbmcnIDogJ2VuZC1yZWNvcmRpbmcnLCBpZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1tTcGxpbmVzXSBlbmQtcmVjb3JkaW5nIGZhaWxlZDonLCBlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vZGVzT2YoY29tcHM6IGFueVtdKTogYW55W10ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8YW55PigpO1xuICAgIGZvciAoY29uc3QgYyBvZiBjb21wcykgaWYgKGMgJiYgYy5pc1ZhbGlkICYmIGMubm9kZSAmJiBjLm5vZGUuaXNWYWxpZCkgc2V0LmFkZChjLm5vZGUpO1xuICAgIHJldHVybiBbLi4uc2V0XTtcbn1cblxuLyoqIE1hcmtzIHNwbGluZXMgZGlydHkgYW5kIHRlbGxzIHRoZSBlZGl0b3IgdGhlIG5vZGVzIGNoYW5nZWQuICovXG5leHBvcnQgZnVuY3Rpb24gYWZ0ZXJFZGl0KGNvbXBzOiBhbnlbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgYyBvZiBjb21wcykge1xuICAgICAgICBpZiAoIWMgfHwgIWMuaXNWYWxpZCkgY29udGludWU7XG4gICAgICAgIGZvciAoY29uc3QgcyBvZiBjLnNwbGluZXMpIHMubWFya0RpcnR5Py4oKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGMuY2hlY2tDaGFuZ2VkPy4oKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvLyBsaXN0ZW5lcnMgZmFpbGluZyBtdXN0IG5vdCBicmVhayBlZGl0aW5nXG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBuIG9mIG5vZGVzT2YoY29tcHMpKSBub3RpZnlOb2RlQ2hhbmdlZChuKTtcbiAgICByZXBhaW50KCk7XG59XG5cbi8qKiBPbmUgdW5kb2FibGUgZWRpdCBhcHBsaWVkIGF0IG9uY2UuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVjb3JkRWRpdChjb21wczogYW55W10sIGZuOiAoKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaWQgPSBhd2FpdCBiZWdpblJlY29yZGluZyhub2Rlc09mKGNvbXBzKS5tYXAoKG4pID0+IG4udXVpZCkpO1xuICAgIGxldCBvayA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICAgIG9rID0gdHJ1ZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICBhZnRlckVkaXQoY29tcHMpO1xuICAgICAgICBhd2FpdCBlbmRSZWNvcmRpbmcoaWQsICFvayk7XG4gICAgfVxufVxuXG5jb25zdCBOT1RJRllfTVMgPSAxMjA7XG5cbi8qKlxuICogQW4gdW5kb2FibGUgZWRpdCBzcHJlYWQgb3ZlciBtYW55IHVwZGF0ZXMgKGEgZHJhZykuIGBhcHBseWAgY2FsbHMgYmVmb3JlXG4gKiB0aGUgcmVjb3JkaW5nIGlzIG9wZW4gYXJlIGRlZmVycmVkOyBvbmx5IHRoZSBsYXRlc3Qgb25lIHJ1bnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBFZGl0U2Vzc2lvbiB7XG4gICAgcHJpdmF0ZSBpZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBvcGVuZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIGVuZGVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBwZW5kaW5nOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGNoYW5nZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIG5vdGlmaWVkQXQgPSAwO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVhZHk6IFByb21pc2U8dm9pZD47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBzOiBhbnlbXSkge1xuICAgICAgICB0aGlzLnJlYWR5ID0gYmVnaW5SZWNvcmRpbmcobm9kZXNPZihjb21wcykubWFwKChuKSA9PiBuLnV1aWQpKS50aGVuKChpZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMucGVuZGluZyAmJiAhdGhpcy5lbmRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZuID0gdGhpcy5wZW5kaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW4oZm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQXBwbGllcyBhbiBlZGl0IChub3csIG9yIGFzIHNvb24gYXMgdGhlIHJlY29yZGluZyBpcyBvcGVuKS4gKi9cbiAgICBhcHBseShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5lbmRlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMub3BlbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmcgPSBmbjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJ1bihmbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBydW4oZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgZm4oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHRoaXMuY29tcHMpIGZvciAoY29uc3QgcyBvZiBjLnNwbGluZXMpIHMubWFya0RpcnR5Py4oKTtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKG5vdyAtIHRoaXMubm90aWZpZWRBdCA+IE5PVElGWV9NUykge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmllZEF0ID0gbm93O1xuICAgICAgICAgICAgZm9yIChjb25zdCBuIG9mIG5vZGVzT2YodGhpcy5jb21wcykpIG5vdGlmeU5vZGVDaGFuZ2VkKG4pO1xuICAgICAgICB9XG4gICAgICAgIHJlcGFpbnQoKTtcbiAgICB9XG5cbiAgICBhc3luYyBlbmQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLmVuZGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgICBhd2FpdCB0aGlzLnJlYWR5O1xuICAgICAgICBpZiAodGhpcy5wZW5kaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBmbiA9IHRoaXMucGVuZGluZztcbiAgICAgICAgICAgIHRoaXMucGVuZGluZyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnJ1bihmbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hhbmdlZCkgYWZ0ZXJFZGl0KHRoaXMuY29tcHMpO1xuICAgICAgICBhd2FpdCBlbmRSZWNvcmRpbmcodGhpcy5pZCwgIXRoaXMuY2hhbmdlZCk7XG4gICAgfVxufVxuIiwgIi8qKlxuICogVW5kb2FibGUgc3BsaW5lIGVkaXRzIHVzZWQgYnkgdGhlIGtleWJvYXJkLCB0aGUgU3BsaW5lcyBwYW5lbCBhbmQgdGhlXG4gKiBJbnNwZWN0b3IuXG4gKi9cbmltcG9ydCB7IFYzLCB2MywgcTQsIHFUb0V1bGVyLCBxRnJvbUV1bGVyLCBxQ29weSwgbm9ybWFsaXplLCBzY2FsZSwgbGVuU3EsIGxlbiwgc2V0IH0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvbWF0aCc7XG5pbXBvcnQge1xuICAgIFRhbmdlbnRNb2RlLCBLbm90UmVmLCBzZXRUYW5nZW50TW9kZSwgc2V0VGVuc2lvbiwgc2V0Um90YXRpb24sIHNldEtub3RQb3NpdGlvbiwgc2V0VGFuZ2VudFZlYywgc3luY0xpbmtlZCxcbiAgICB0YW5nZW50SW5WZWMsIHRhbmdlbnRPdXRWZWMsIGxpbmtLbm90cywgdW5saW5rS25vdHMsIHNwbGl0S25vdCwgam9pbktub3RzLCBjb250YWluZXJSZW1vdmVLbm90cywgY29udGFpbmVyUmV2ZXJzZSxcbiAgICBjb250YWluZXJJbnNlcnRPbkN1cnZlLCBjb250YWluZXJSZW1vdmVTcGxpbmUsIHNldENsb3NlZCwgaXNFbmRLbm90LCBidWlsZFNoYXBlLCBERUZBVUxUX1RFTlNJT04sIGFwcGx5VGFuZ2VudE1vZGUsXG4gICAgdGFuZ2VudHNFZGl0YWJsZSwgcmVmcmVzaEFsbCwgaXNMaW5rZWQsXG59IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL3NwbGluZS1jb3JlJztcbmltcG9ydCB7IGZhY3RvcnksIGZpbmRDb21wb25lbnQsIGZpbmROb2RlLCBjb250YWluZXJDbGFzcywgY3VycmVudFNjZW5lLCBpczJEVmlldywgc2VsZWN0ZWROb2RlVXVpZHMsIHJlcGFpbnQgfSBmcm9tICcuL2Vudic7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBnZXRLbm90LCB0b0xvY2FsIH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyBTLCBidW1wU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IHJlY29yZEVkaXQsIGFmdGVyRWRpdCB9IGZyb20gJy4vdW5kbyc7XG5pbXBvcnQgeyBzZXRDb250ZXh0LCBzZXRUb29sLCBtYXliZUJyb2FkY2FzdCwgYXZhaWxhYmxlQWN0aW9ucyB9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQgeyBzY2VuZUNhbWVyYSwgc2NyZWVuUmF5LCByYXlQbGFuZSwgd29ybGRQZXJQaXhlbCwgY2FtZXJhRm9yd2FyZCwgY2FtZXJhUG9zaXRpb24gfSBmcm9tICcuL3ZpZXcnO1xuXG5mdW5jdGlvbiBjb21wc09mKGxpc3Q6IEVsZW1lbnRSZWZbXSk6IGFueVtdIHtcbiAgICByZXR1cm4gWy4uLm5ldyBTZXQobGlzdC5tYXAoKGUpID0+IGUuY29tcCkpXTtcbn1cblxuZnVuY3Rpb24gdG91Y2hlZCgpOiB2b2lkIHtcbiAgICBidW1wU3RhdGUoKTtcbiAgICBtYXliZUJyb2FkY2FzdCgpO1xuICAgIHJlcGFpbnQoKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBzZWxlY3Rpb24gb3BzXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVTZWxlY3Rpb24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbGlzdCA9IFMuc2VsZWN0aW9uLmFsbCgpO1xuICAgIGlmICghbGlzdC5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBjb21wcyA9IGNvbXBzT2YobGlzdCk7XG4gICAgYXdhaXQgcmVjb3JkRWRpdChjb21wcywgKCkgPT4ge1xuICAgICAgICAvLyBTZWxlY3RlZCB0YW5nZW50cyBvZiBrbm90cyB0aGF0IHN0YXk6IHplcm8gdGhlbSAoVW5pdHkncyBiZWhhdmlvcikuXG4gICAgICAgIGZvciAoY29uc3QgZSBvZiBsaXN0KSB7XG4gICAgICAgICAgICBpZiAoZS5wYXJ0ID09PSAna25vdCcpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKFMuc2VsZWN0aW9uLmhhc0tub3QoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90KSkgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBzcGxpbmUgPSBlLmNvbXAuc3BsaW5lc1tlLnNwbGluZV07XG4gICAgICAgICAgICBjb25zdCBrID0gc3BsaW5lPy5rbm90c1tlLmtub3RdO1xuICAgICAgICAgICAgaWYgKCFrKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChrLm1vZGUgIT09IFRhbmdlbnRNb2RlLkJyb2tlbikgc2V0VGFuZ2VudE1vZGUoc3BsaW5lLCBlLmtub3QsIFRhbmdlbnRNb2RlLkJyb2tlbik7XG4gICAgICAgICAgICBzZXQoZS5wYXJ0ID09PSAnaW4nID8gay50YW5nZW50SW4gOiBrLnRhbmdlbnRPdXQsIDAsIDAsIDApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY29tcCBvZiBjb21wcykge1xuICAgICAgICAgICAgY29uc3QgcmVmcyA9IGxpc3QuZmlsdGVyKChlKSA9PiBlLmNvbXAgPT09IGNvbXAgJiYgZS5wYXJ0ID09PSAna25vdCcpLm1hcCgoZSkgPT4gKHsgc3BsaW5lOiBlLnNwbGluZSwga25vdDogZS5rbm90IH0pKTtcbiAgICAgICAgICAgIGlmIChyZWZzLmxlbmd0aCkgY29udGFpbmVyUmVtb3ZlS25vdHMoY29tcCwgcmVmcyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBTLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgIHRvdWNoZWQoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldE1vZGVTZWxlY3RlZChtb2RlOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBrbm90cyA9IHNlbGVjdGVkT3duZXJLbm90cygpO1xuICAgIGlmICgha25vdHMubGVuZ3RoKSByZXR1cm47XG4gICAgYXdhaXQgcmVjb3JkRWRpdChjb21wc09mKGtub3RzKSwgKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGUgb2Yga25vdHMpIHNldFRhbmdlbnRNb2RlKGUuY29tcC5zcGxpbmVzW2Uuc3BsaW5lXSwgZS5rbm90LCBtb2RlKTtcbiAgICB9KTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbi8qKiBLbm90cyBvZiB0aGUgc2VsZWN0aW9uLCBpbmNsdWRpbmcgb3duZXJzIG9mIHNlbGVjdGVkIHRhbmdlbnRzLiAqL1xuZnVuY3Rpb24gc2VsZWN0ZWRPd25lcktub3RzKCk6IEVsZW1lbnRSZWZbXSB7XG4gICAgY29uc3Qgc2VlbiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGNvbnN0IHJlczogRWxlbWVudFJlZltdID0gW107XG4gICAgZm9yIChjb25zdCBlIG9mIFMuc2VsZWN0aW9uLmFsbCgpKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGAke2UuY29tcC51dWlkfToke2Uuc3BsaW5lfToke2Uua25vdH1gO1xuICAgICAgICBpZiAoc2Vlbi5oYXMoa2V5KSB8fCAhZ2V0S25vdChlKSkgY29udGludWU7XG4gICAgICAgIHNlZW4uYWRkKGtleSk7XG4gICAgICAgIHJlcy5wdXNoKHsgLi4uZSwgcGFydDogJ2tub3QnIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG5jb25zdCBDWUNMRSA9IFtUYW5nZW50TW9kZS5MaW5lYXIsIFRhbmdlbnRNb2RlLkF1dG9TbW9vdGgsIFRhbmdlbnRNb2RlLk1pcnJvcmVkLCBUYW5nZW50TW9kZS5Db250aW51b3VzLCBUYW5nZW50TW9kZS5Ccm9rZW5dO1xuXG4vKiogVW5pdHkncyBDeWNsZSBUYW5nZW50IE1vZGUgKEMpLiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGN5Y2xlTW9kZVNlbGVjdGVkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGtub3RzID0gc2VsZWN0ZWRPd25lcktub3RzKCk7XG4gICAgaWYgKCFrbm90cy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBrID0gZ2V0S25vdChrbm90c1swXSk7XG4gICAgY29uc3QgbmV4dCA9IENZQ0xFWyhDWUNMRS5pbmRleE9mKGsubW9kZSkgKyAxKSAlIENZQ0xFLmxlbmd0aF07XG4gICAgYXdhaXQgc2V0TW9kZVNlbGVjdGVkKG5leHQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGlua1NlbGVjdGVkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGtub3RzID0gUy5zZWxlY3Rpb24ua25vdHMoKTtcbiAgICBpZiAoa25vdHMubGVuZ3RoIDwgMiB8fCAha25vdHMuZXZlcnkoKGUpID0+IGUuY29tcCA9PT0ga25vdHNbMF0uY29tcCkpIHJldHVybjtcbiAgICBjb25zdCBjb21wID0ga25vdHNbMF0uY29tcDtcbiAgICAvLyBUaGUgYWN0aXZlIChsYXN0IHNlbGVjdGVkKSBrbm90IGtlZXBzIGl0cyBwb3NpdGlvbi5cbiAgICBjb25zdCBvcmRlcmVkID0gW2tub3RzW2tub3RzLmxlbmd0aCAtIDFdLCAuLi5rbm90cy5zbGljZSgwLCAtMSldO1xuICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiBsaW5rS25vdHMoY29tcCwgb3JkZXJlZC5tYXAoKGUpID0+ICh7IHNwbGluZTogZS5zcGxpbmUsIGtub3Q6IGUua25vdCB9KSksIGZhY3RvcnkpKTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1bmxpbmtTZWxlY3RlZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBrbm90cyA9IFMuc2VsZWN0aW9uLmtub3RzKCk7XG4gICAgaWYgKCFrbm90cy5sZW5ndGgpIHJldHVybjtcbiAgICBhd2FpdCByZWNvcmRFZGl0KGNvbXBzT2Yoa25vdHMpLCAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgY29tcCBvZiBjb21wc09mKGtub3RzKSkge1xuICAgICAgICAgICAgdW5saW5rS25vdHMoY29tcCwga25vdHMuZmlsdGVyKChlKSA9PiBlLmNvbXAgPT09IGNvbXApLm1hcCgoZSkgPT4gKHsgc3BsaW5lOiBlLnNwbGluZSwga25vdDogZS5rbm90IH0pKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzcGxpdFNlbGVjdGVkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGtub3RzID0gUy5zZWxlY3Rpb24ua25vdHMoKTtcbiAgICBpZiAoa25vdHMubGVuZ3RoICE9PSAxKSByZXR1cm47XG4gICAgY29uc3QgZSA9IGtub3RzWzBdO1xuICAgIGxldCByZXM6IEtub3RSZWYgfCBudWxsID0gbnVsbDtcbiAgICBhd2FpdCByZWNvcmRFZGl0KFtlLmNvbXBdLCAoKSA9PiB7XG4gICAgICAgIHJlcyA9IHNwbGl0S25vdChlLmNvbXAsIHsgc3BsaW5lOiBlLnNwbGluZSwga25vdDogZS5rbm90IH0sIGZhY3RvcnkpO1xuICAgIH0pO1xuICAgIGNvbnN0IHIgPSByZXMgYXMgS25vdFJlZiB8IG51bGw7XG4gICAgaWYgKHIpIFMuc2VsZWN0aW9uLnNldChbeyBjb21wOiBlLmNvbXAsIHNwbGluZTogci5zcGxpbmUsIGtub3Q6IHIua25vdCwgcGFydDogJ2tub3QnIH1dKTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBqb2luU2VsZWN0ZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qga25vdHMgPSBTLnNlbGVjdGlvbi5rbm90cygpO1xuICAgIGlmIChrbm90cy5sZW5ndGggIT09IDIgfHwga25vdHNbMF0uY29tcCAhPT0ga25vdHNbMV0uY29tcCkgcmV0dXJuO1xuICAgIGNvbnN0IGNvbXAgPSBrbm90c1swXS5jb21wO1xuICAgIC8vIFVuaXR5IGtlZXBzIHRoZSBhY3RpdmUga25vdCdzIHBvc2l0aW9uLlxuICAgIGNvbnN0IGEgPSBrbm90c1sxXTtcbiAgICBjb25zdCBiID0ga25vdHNbMF07XG4gICAgbGV0IHJlczogS25vdFJlZiB8IG51bGwgPSBudWxsO1xuICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiB7XG4gICAgICAgIHJlcyA9IGpvaW5Lbm90cyhjb21wLCB7IHNwbGluZTogYS5zcGxpbmUsIGtub3Q6IGEua25vdCB9LCB7IHNwbGluZTogYi5zcGxpbmUsIGtub3Q6IGIua25vdCB9LCBmYWN0b3J5KTtcbiAgICB9KTtcbiAgICBjb25zdCByID0gcmVzIGFzIEtub3RSZWYgfCBudWxsO1xuICAgIFMuc2VsZWN0aW9uLnNldChyID8gW3sgY29tcCwgc3BsaW5lOiByLnNwbGluZSwga25vdDogci5rbm90LCBwYXJ0OiAna25vdCcgfV0gOiBbXSk7XG4gICAgdG91Y2hlZCgpO1xufVxuXG4vKiogU3BsaW5lcyB0b3VjaGVkIGJ5IHRoZSBzZWxlY3Rpb24sIG9yIGFsbCBzcGxpbmVzIG9mIHRoZSBlZGl0ZWQgY29udGFpbmVycy4gKi9cbmZ1bmN0aW9uIHNlbGVjdGVkU3BsaW5lcygpOiB7IGNvbXA6IGFueTsgc3BsaW5lOiBudW1iZXIgfVtdIHtcbiAgICBjb25zdCBsaXN0ID0gUy5zZWxlY3Rpb24uYWxsKCk7XG4gICAgY29uc3QgcmVzOiB7IGNvbXA6IGFueTsgc3BsaW5lOiBudW1iZXIgfVtdID0gW107XG4gICAgY29uc3QgYWRkID0gKGNvbXA6IGFueSwgc3BsaW5lOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKCFyZXMuc29tZSgocikgPT4gci5jb21wID09PSBjb21wICYmIHIuc3BsaW5lID09PSBzcGxpbmUpKSByZXMucHVzaCh7IGNvbXAsIHNwbGluZSB9KTtcbiAgICB9O1xuICAgIGlmIChsaXN0Lmxlbmd0aCkgZm9yIChjb25zdCBlIG9mIGxpc3QpIGFkZChlLmNvbXAsIGUuc3BsaW5lKTtcbiAgICBlbHNlIGZvciAoY29uc3QgY29tcCBvZiBTLmxhc3RUYXJnZXRzKSBjb21wLnNwbGluZXMuZm9yRWFjaCgoXzogYW55LCBpOiBudW1iZXIpID0+IGFkZChjb21wLCBpKSk7XG4gICAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJldmVyc2VTZWxlY3RlZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGxpbmVzID0gc2VsZWN0ZWRTcGxpbmVzKCk7XG4gICAgaWYgKCFzcGxpbmVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIC8vIEtlZXAgdGhlIHNhbWUga25vdHMgc2VsZWN0ZWQgYWZ0ZXIgcmV2ZXJzaW5nLlxuICAgIGNvbnN0IGJlZm9yZSA9IFMuc2VsZWN0aW9uLmFsbCgpLm1hcCgoZSkgPT4gKHsgLi4uZSwgY291bnQ6IGUuY29tcC5zcGxpbmVzW2Uuc3BsaW5lXT8ua25vdHMubGVuZ3RoID8/IDAgfSkpO1xuICAgIGF3YWl0IHJlY29yZEVkaXQoWy4uLm5ldyBTZXQoc3BsaW5lcy5tYXAoKHMpID0+IHMuY29tcCkpXSwgKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3BsaW5lcykgY29udGFpbmVyUmV2ZXJzZShzLmNvbXAsIHMuc3BsaW5lKTtcbiAgICB9KTtcbiAgICBTLnNlbGVjdGlvbi5zZXQoYmVmb3JlLm1hcCgoZSkgPT4gKHtcbiAgICAgICAgY29tcDogZS5jb21wLFxuICAgICAgICBzcGxpbmU6IGUuc3BsaW5lLFxuICAgICAgICBrbm90OiBlLmNvdW50IC0gMSAtIGUua25vdCxcbiAgICAgICAgcGFydDogZS5wYXJ0ID09PSAnaW4nID8gJ291dCcgOiBlLnBhcnQgPT09ICdvdXQnID8gJ2luJyA6ICdrbm90JyxcbiAgICB9KSkpO1xuICAgIHRvdWNoZWQoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldENsb3NlZFNlbGVjdGVkKGNsb3NlZD86IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcGxpbmVzID0gc2VsZWN0ZWRTcGxpbmVzKCk7XG4gICAgaWYgKCFzcGxpbmVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHRhcmdldCA9IGNsb3NlZCA/PyAhc3BsaW5lcy5ldmVyeSgocykgPT4gcy5jb21wLnNwbGluZXNbcy5zcGxpbmVdLmNsb3NlZCk7XG4gICAgYXdhaXQgcmVjb3JkRWRpdChbLi4ubmV3IFNldChzcGxpbmVzLm1hcCgocykgPT4gcy5jb21wKSldLCAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgcyBvZiBzcGxpbmVzKSB7XG4gICAgICAgICAgICBjb25zdCBzcGxpbmUgPSBzLmNvbXAuc3BsaW5lc1tzLnNwbGluZV07XG4gICAgICAgICAgICBpZiAoc3BsaW5lLmtub3RzLmxlbmd0aCA+PSAyIHx8ICF0YXJnZXQpIHNldENsb3NlZChzcGxpbmUsIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgY29uc3QgbGlzdDogRWxlbWVudFJlZltdID0gW107XG4gICAgZm9yIChjb25zdCBjb21wIG9mIFMubGFzdFRhcmdldHMpIHtcbiAgICAgICAgY29tcC5zcGxpbmVzLmZvckVhY2goKHNwbGluZTogYW55LCBzOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc3BsaW5lLmtub3RzLmxlbmd0aDsgaysrKSBsaXN0LnB1c2goeyBjb21wLCBzcGxpbmU6IHMsIGtub3Q6IGssIHBhcnQ6ICdrbm90JyB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghbGlzdC5sZW5ndGgpIHJldHVybjtcbiAgICBzZXRDb250ZXh0KHRydWUpO1xuICAgIFMuc2VsZWN0aW9uLnNldChsaXN0KTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICBTLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgIHRvdWNoZWQoKTtcbn1cblxuLyoqIEluc2VydHMgYSBrbm90IG9uIGEgY3VydmUgd2l0aG91dCBjaGFuZ2luZyBpdHMgc2hhcGU7IHNlbGVjdHMgaXQuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5zZXJ0T25DdXJ2ZShjb21wOiBhbnksIHNwbGluZTogbnVtYmVyLCBjdXJ2ZUluZGV4OiBudW1iZXIsIHQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBpbmRleCA9IC0xO1xuICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiB7XG4gICAgICAgIGluZGV4ID0gY29udGFpbmVySW5zZXJ0T25DdXJ2ZShjb21wLCBzcGxpbmUsIGN1cnZlSW5kZXgsIHQsIGZhY3RvcnkpO1xuICAgIH0pO1xuICAgIGlmIChpbmRleCA+PSAwKSBTLnNlbGVjdGlvbi5zZXQoW3sgY29tcCwgc3BsaW5lLCBrbm90OiBpbmRleCwgcGFydDogJ2tub3QnIH1dKTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZWxlbWVudCBpbnNwZWN0b3JcblxuZXhwb3J0IGludGVyZmFjZSBFbGVtZW50UHJvcHMge1xuICAgIHBvc2l0aW9uPzogKG51bWJlciB8IG51bGwpW107XG4gICAgcm90YXRpb24/OiAobnVtYmVyIHwgbnVsbClbXTtcbiAgICBtb2RlPzogbnVtYmVyO1xuICAgIHRlbnNpb24/OiBudW1iZXI7XG4gICAgdGFuZ2VudEluPzogbnVtYmVyO1xuICAgIHRhbmdlbnRPdXQ/OiBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIGFwcGx5UHJvcHMoY29tcDogYW55LCBzOiBudW1iZXIsIGs6IG51bWJlciwgcDogRWxlbWVudFByb3BzKTogdm9pZCB7XG4gICAgY29uc3Qgc3BsaW5lID0gY29tcC5zcGxpbmVzW3NdO1xuICAgIGNvbnN0IGtub3QgPSBzcGxpbmU/Lmtub3RzW2tdO1xuICAgIGlmICgha25vdCkgcmV0dXJuO1xuICAgIGlmIChwLnBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHYzKGtub3QucG9zaXRpb24ueCwga25vdC5wb3NpdGlvbi55LCBrbm90LnBvc2l0aW9uLnopO1xuICAgICAgICBpZiAocC5wb3NpdGlvblswXSAhPSBudWxsKSBwb3MueCA9IHAucG9zaXRpb25bMF0hO1xuICAgICAgICBpZiAocC5wb3NpdGlvblsxXSAhPSBudWxsKSBwb3MueSA9IHAucG9zaXRpb25bMV0hO1xuICAgICAgICBpZiAocC5wb3NpdGlvblsyXSAhPSBudWxsKSBwb3MueiA9IHAucG9zaXRpb25bMl0hO1xuICAgICAgICBzZXRLbm90UG9zaXRpb24oc3BsaW5lLCBrLCBwb3MpO1xuICAgICAgICBzeW5jTGlua2VkKGNvbXAsIHsgc3BsaW5lOiBzLCBrbm90OiBrIH0pO1xuICAgIH1cbiAgICBpZiAocC5yb3RhdGlvbikge1xuICAgICAgICBjb25zdCBlID0gcVRvRXVsZXIodjMoKSwga25vdC5yb3RhdGlvbik7XG4gICAgICAgIGlmIChwLnJvdGF0aW9uWzBdICE9IG51bGwpIGUueCA9IHAucm90YXRpb25bMF0hO1xuICAgICAgICBpZiAocC5yb3RhdGlvblsxXSAhPSBudWxsKSBlLnkgPSBwLnJvdGF0aW9uWzFdITtcbiAgICAgICAgaWYgKHAucm90YXRpb25bMl0gIT0gbnVsbCkgZS56ID0gcC5yb3RhdGlvblsyXSE7XG4gICAgICAgIHNldFJvdGF0aW9uKHNwbGluZSwgaywgcUZyb21FdWxlcihxNCgpLCBlLngsIGUueSwgZS56KSk7XG4gICAgfVxuICAgIGlmIChwLm1vZGUgIT09IHVuZGVmaW5lZCAmJiBwLm1vZGUgIT09IG51bGwpIHNldFRhbmdlbnRNb2RlKHNwbGluZSwgaywgcC5tb2RlKTtcbiAgICBpZiAocC50ZW5zaW9uICE9PSB1bmRlZmluZWQgJiYgcC50ZW5zaW9uICE9PSBudWxsKSBzZXRUZW5zaW9uKHNwbGluZSwgaywgTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgcC50ZW5zaW9uKSkpO1xuICAgIGZvciAoY29uc3QgcGFydCBvZiBbJ2luJywgJ291dCddIGFzIGNvbnN0KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcGFydCA9PT0gJ2luJyA/IHAudGFuZ2VudEluIDogcC50YW5nZW50T3V0O1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICAgIGNvbnN0IGN1ciA9IHBhcnQgPT09ICdpbicgPyB0YW5nZW50SW5WZWModjMoKSwga25vdCkgOiB0YW5nZW50T3V0VmVjKHYzKCksIGtub3QpO1xuICAgICAgICBsZXQgZGlyID0gbm9ybWFsaXplKHYzKCksIGN1cik7XG4gICAgICAgIGlmIChsZW5TcShkaXIpIDwgMWUtMTIpIHtcbiAgICAgICAgICAgIC8vIFplcm8gdGFuZ2VudDogcG9pbnQgaXQgYWxvbmcgdGhlIGtub3QncyBmb3J3YXJkIGF4aXMuXG4gICAgICAgICAgICBjb25zdCBmd2QgPSB0YW5nZW50T3V0VmVjKHYzKCksIHsgLi4ua25vdCwgdGFuZ2VudE91dDogeyB4OiAwLCB5OiAwLCB6OiAxIH0gfSk7XG4gICAgICAgICAgICBkaXIgPSBwYXJ0ID09PSAnaW4nID8gc2NhbGUodjMoKSwgZndkLCAtMSkgOiBmd2Q7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGFuZ2VudFZlYyhzcGxpbmUsIGssIHBhcnQsIHNjYWxlKHYzKCksIGRpciwgTWF0aC5tYXgoMCwgdmFsdWUpKSk7XG4gICAgfVxufVxuXG4vKiogU2V0cyBmaWVsZHMgb2YgdGhlIHNlbGVjdGVkIGtub3RzIChudWxsIC8gbWlzc2luZyBmaWVsZHMgc3RheSBhcyB0aGV5IGFyZSkuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0RWxlbWVudFByb3BzKHByb3BzOiBFbGVtZW50UHJvcHMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBrbm90cyA9IHNlbGVjdGVkT3duZXJLbm90cygpO1xuICAgIGlmICgha25vdHMubGVuZ3RoKSByZXR1cm47XG4gICAgYXdhaXQgcmVjb3JkRWRpdChjb21wc09mKGtub3RzKSwgKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGUgb2Yga25vdHMpIGFwcGx5UHJvcHMoZS5jb21wLCBlLnNwbGluZSwgZS5rbm90LCBwcm9wcyk7XG4gICAgfSk7XG4gICAgdG91Y2hlZCgpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaW5zcGVjdG9yXG5cbmZ1bmN0aW9uIGtub3RJbmZvKGNvbXA6IGFueSwgczogbnVtYmVyLCBrOiBudW1iZXIsIGtub3Q6IGFueSkge1xuICAgIGNvbnN0IGUgPSBxVG9FdWxlcih2MygpLCBrbm90LnJvdGF0aW9uKTtcbiAgICBjb25zdCByID0gKG46IG51bWJlcikgPT4gTWF0aC5yb3VuZChuICogMTAwMDApIC8gMTAwMDA7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcG9zaXRpb246IFtyKGtub3QucG9zaXRpb24ueCksIHIoa25vdC5wb3NpdGlvbi55KSwgcihrbm90LnBvc2l0aW9uLnopXSxcbiAgICAgICAgcm90YXRpb246IFtyKGUueCksIHIoZS55KSwgcihlLnopXSxcbiAgICAgICAgbW9kZToga25vdC5tb2RlLFxuICAgICAgICB0ZW5zaW9uOiByKGtub3QudGVuc2lvbiksXG4gICAgICAgIHRhbmdlbnRJbjogcihsZW4odGFuZ2VudEluVmVjKHYzKCksIGtub3QpKSksXG4gICAgICAgIHRhbmdlbnRPdXQ6IHIobGVuKHRhbmdlbnRPdXRWZWModjMoKSwga25vdCkpKSxcbiAgICAgICAgbGlua2VkOiBpc0xpbmtlZChjb21wLCB7IHNwbGluZTogcywga25vdDogayB9KSxcbiAgICAgICAgc2VsZWN0ZWQ6IFMuY29udGV4dCAmJiBTLnNlbGVjdGlvbi5oYXNLbm90KGNvbXAsIHMsIGspLFxuICAgIH07XG59XG5cbi8qKiBEYXRhIGZvciB0aGUgU3BsaW5lQ29udGFpbmVyIEluc3BlY3Rvci4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluZXJJbmZvKGNvbXBVdWlkOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IGNvbXAgPSBmaW5kQ29tcG9uZW50KGNvbXBVdWlkKTtcbiAgICBpZiAoIWNvbXAgfHwgIWNvbXAuc3BsaW5lcykgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXVpZDogY29tcC51dWlkLFxuICAgICAgICBub2RlOiBjb21wLm5vZGUudXVpZCxcbiAgICAgICAgY29udGV4dDogUy5jb250ZXh0ICYmIFMubGFzdFRhcmdldHMuaW5jbHVkZXMoY29tcCksXG4gICAgICAgIHRvb2w6IFMudG9vbCxcbiAgICAgICAgZHJhd2luZzogISFTLmRyYXdpbmcgJiYgUy5kcmF3aW5nLmNvbXAgPT09IGNvbXAsXG4gICAgICAgIHNwbGluZXM6IGNvbXAuc3BsaW5lcy5tYXAoKHNwbGluZTogYW55LCBzOiBudW1iZXIpID0+ICh7XG4gICAgICAgICAgICBjbG9zZWQ6ICEhc3BsaW5lLmNsb3NlZCxcbiAgICAgICAgICAgIGxlbmd0aDogTWF0aC5yb3VuZCgoY29tcC5jYWxjdWxhdGVMZW5ndGg/LihzKSA/PyAwKSAqIDEwMDApIC8gMTAwMCxcbiAgICAgICAgICAgIGtub3RzOiBzcGxpbmUua25vdHMubWFwKChrbm90OiBhbnksIGs6IG51bWJlcikgPT4ga25vdEluZm8oY29tcCwgcywgaywga25vdCkpLFxuICAgICAgICB9KSksXG4gICAgICAgIGFjdGlvbnM6IGF2YWlsYWJsZUFjdGlvbnMoKSxcbiAgICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZWRpdEtub3QoY29tcFV1aWQ6IHN0cmluZywgczogbnVtYmVyLCBrOiBudW1iZXIsIHByb3BzOiBFbGVtZW50UHJvcHMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjb21wID0gZmluZENvbXBvbmVudChjb21wVXVpZCk7XG4gICAgaWYgKCFjb21wKSByZXR1cm47XG4gICAgYXdhaXQgcmVjb3JkRWRpdChbY29tcF0sICgpID0+IGFwcGx5UHJvcHMoY29tcCwgcywgaywgcHJvcHMpKTtcbiAgICB0b3VjaGVkKCk7XG59XG5cbi8qKiBJbnNwZWN0b3IgYWN0aW9ucyBvbiBhIHNwbGluZSBvZiBhIGNvbnRhaW5lci4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzcGxpbmVBY3Rpb24oY29tcFV1aWQ6IHN0cmluZywgczogbnVtYmVyLCBhY3Rpb246IHN0cmluZywgYXJnPzogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBjb21wID0gZmluZENvbXBvbmVudChjb21wVXVpZCk7XG4gICAgaWYgKCFjb21wKSByZXR1cm4gbnVsbDtcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICBjYXNlICdhZGRTcGxpbmUnOiB7XG4gICAgICAgICAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwbGluZSA9IGZhY3Rvcnkuc3BsaW5lKCk7XG4gICAgICAgICAgICAgICAgY29tcC5zcGxpbmVzLnB1c2goc3BsaW5lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncmVtb3ZlU3BsaW5lJzpcbiAgICAgICAgICAgIGlmIChjb21wLnNwbGluZXMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb21wLnNwbGluZXNbMF0ua25vdHMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY29tcC5zcGxpbmVzWzBdLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb21wLmxpbmtzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiBjb250YWluZXJSZW1vdmVTcGxpbmUoY29tcCwgcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgUy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZXZlcnNlJzpcbiAgICAgICAgICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiBjb250YWluZXJSZXZlcnNlKGNvbXAsIHMpKTtcbiAgICAgICAgICAgIFMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2xvc2VkJzpcbiAgICAgICAgICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiBzZXRDbG9zZWQoY29tcC5zcGxpbmVzW3NdLCAhIWFyZykpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FkZEtub3QnOiB7XG4gICAgICAgICAgICBjb25zdCBzcGxpbmUgPSBjb21wLnNwbGluZXNbc107XG4gICAgICAgICAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGsgPSBmYWN0b3J5Lmtub3QoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuID0gc3BsaW5lLmtub3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0ID0gc3BsaW5lLmtub3RzW24gLSAxXTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2ID0gc3BsaW5lLmtub3RzW24gLSAyXTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdCAmJiBwcmV2KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvbnRpbnVlIGluIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGxhc3QgY3VydmUuXG4gICAgICAgICAgICAgICAgICAgIHNldChrLnBvc2l0aW9uLCBsYXN0LnBvc2l0aW9uLnggKiAyIC0gcHJldi5wb3NpdGlvbi54LCBsYXN0LnBvc2l0aW9uLnkgKiAyIC0gcHJldi5wb3NpdGlvbi55LCBsYXN0LnBvc2l0aW9uLnogKiAyIC0gcHJldi5wb3NpdGlvbi56KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0KGsucG9zaXRpb24sIGxhc3QucG9zaXRpb24ueCArIDEsIGxhc3QucG9zaXRpb24ueSwgbGFzdC5wb3NpdGlvbi56KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgay5tb2RlID0gUy5zZXR0aW5ncy5kZWZhdWx0TW9kZTtcbiAgICAgICAgICAgICAgICBrLnRlbnNpb24gPSBERUZBVUxUX1RFTlNJT047XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QpIHFDb3B5KGsucm90YXRpb24sIGxhc3Qucm90YXRpb24pO1xuICAgICAgICAgICAgICAgIHNwbGluZS5rbm90cy5wdXNoKGspO1xuICAgICAgICAgICAgICAgIGFwcGx5VGFuZ2VudE1vZGUoc3BsaW5lLCBzcGxpbmUua25vdHMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKG4gPiAwKSBhcHBseVRhbmdlbnRNb2RlKHNwbGluZSwgbiAtIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdyZW1vdmVLbm90JzpcbiAgICAgICAgICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiBjb250YWluZXJSZW1vdmVLbm90cyhjb21wLCBbeyBzcGxpbmU6IHMsIGtub3Q6IE51bWJlcihhcmcpIH1dKSk7XG4gICAgICAgICAgICBTLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NlbGVjdEtub3QnOiB7XG4gICAgICAgICAgICBzZXRDb250ZXh0KHRydWUpO1xuICAgICAgICAgICAgY29uc3QgZTogRWxlbWVudFJlZiA9IHsgY29tcCwgc3BsaW5lOiBzLCBrbm90OiBOdW1iZXIoYXJnPy5rbm90ID8/IGFyZyksIHBhcnQ6ICdrbm90JyB9O1xuICAgICAgICAgICAgaWYgKGFyZz8uYWRkaXRpdmUpIFMuc2VsZWN0aW9uLnRvZ2dsZShlKTtcbiAgICAgICAgICAgIGVsc2UgUy5zZWxlY3Rpb24uc2V0KFtlXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdzZXRNb2RlQWxsJzpcbiAgICAgICAgICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BsaW5lID0gY29tcC5zcGxpbmVzW3NdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaW5lLmtub3RzLmxlbmd0aDsgaSsrKSBzZXRUYW5nZW50TW9kZShzcGxpbmUsIGksIE51bWJlcihhcmcpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JlZnJlc2gnOlxuICAgICAgICAgICAgYXdhaXQgcmVjb3JkRWRpdChbY29tcF0sICgpID0+IGNvbXAuc3BsaW5lcy5mb3JFYWNoKChzcDogYW55KSA9PiByZWZyZXNoQWxsKHNwKSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRvdWNoZWQoKTtcbiAgICByZXR1cm4gY29udGFpbmVySW5mbyhjb21wVXVpZCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY3JlYXRpb25cblxuZnVuY3Rpb24gbmljZVNpemUodjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoISh2ID4gMCkpIHJldHVybiAxO1xuICAgIGNvbnN0IHAgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZzEwKHYpKSk7XG4gICAgY29uc3QgbSA9IHYgLyBwO1xuICAgIHJldHVybiAobSA8IDEuNSA/IDEgOiBtIDwgMy41ID8gMiA6IG0gPCA3LjUgPyA1IDogMTApICogcDtcbn1cblxuLyoqIFdoZXJlIGEgbmV3IHNwbGluZSBnb2VzOiB0aGUgY2VudGVyIG9mIHRoZSBTY2VuZSB2aWV3IG9uIHRoZSBncm91bmQgKDNEKSBvciB0aGUgeiA9IDAgcGxhbmUgKDJEKS4gKi9cbmZ1bmN0aW9uIHZpZXdDZW50ZXIoaXMyRDogYm9vbGVhbik6IHsgcG9zOiBWMzsgc2l6ZTogbnVtYmVyIH0ge1xuICAgIGNvbnN0IGNhbSA9IHNjZW5lQ2FtZXJhKCk7XG4gICAgaWYgKCFjYW0pIHJldHVybiB7IHBvczogdjMoKSwgc2l6ZTogaXMyRCA/IDEwMCA6IDEgfTtcbiAgICBjb25zdCByYXkgPSBzY3JlZW5SYXkoY2FtLCBjYW0ud2lkdGggLyAyLCBjYW0uaGVpZ2h0IC8gMik7XG4gICAgbGV0IHBvczogVjMgfCBudWxsID0gcmF5UGxhbmUocmF5LCB2MygpLCBpczJEID8gdjMoMCwgMCwgMSkgOiB2MygwLCAxLCAwKSk7XG4gICAgaWYgKCFwb3MpIHtcbiAgICAgICAgLy8gTG9va2luZyBhd2F5IGZyb20gdGhlIGdyb3VuZDogYSBwb2ludCBpbiBmcm9udCBvZiB0aGUgY2FtZXJhLlxuICAgICAgICBjb25zdCBmID0gY2FtZXJhRm9yd2FyZChjYW0pO1xuICAgICAgICBjb25zdCBjID0gY2FtZXJhUG9zaXRpb24oY2FtKTtcbiAgICAgICAgcG9zID0gdjMoYy54ICsgZi54ICogMTAsIGMueSArIGYueSAqIDEwLCBjLnogKyBmLnogKiAxMCk7XG4gICAgfVxuICAgIGNvbnN0IHNpemUgPSBuaWNlU2l6ZSh3b3JsZFBlclBpeGVsKGNhbSwgcG9zKSAqIE1hdGgubWluKGNhbS53aWR0aCwgY2FtLmhlaWdodCkgKiAwLjE4KTtcbiAgICByZXR1cm4geyBwb3MsIHNpemUgfTtcbn1cblxuZXhwb3J0IGNvbnN0IFNIQVBFUyA9IFsnbGluZScsICdzcXVhcmUnLCAncm91bmRlZC1zcXVhcmUnLCAnY2lyY2xlJywgJ3BvbHlnb24nLCAnc3RhcicsICdoZWxpeCddO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBub2RlIHdpdGggYSBTcGxpbmVDb250YWluZXIgKE5vZGUgPiBTcGxpbmUgbWVudSkuICdkcmF3JyBtYWtlc1xuICogYW4gZW1wdHkgc3BsaW5lIGFuZCBzdGFydHMgdGhlIERyYXcgdG9vbC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVNwbGluZU5vZGUoa2luZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgY29uc3QgaXMyRCA9IGlzMkRWaWV3KCk7XG4gICAgY29uc3Qgc2VsID0gc2VsZWN0ZWROb2RlVXVpZHMoKTtcbiAgICBjb25zdCBvcHRpb25zOiBhbnkgPSB7IG5hbWU6IGtpbmQgPT09ICdkcmF3JyA/ICdTcGxpbmUnIDogYFNwbGluZSAke2tpbmQucmVwbGFjZSgnLScsICcgJykucmVwbGFjZSgvXFxiXFx3L2csIChjKSA9PiBjLnRvVXBwZXJDYXNlKCkpfWAgfTtcbiAgICBpZiAoc2VsLmxlbmd0aCkgb3B0aW9ucy5wYXJlbnQgPSBzZWxbMF07XG4gICAgaWYgKGlzMkQpIG9wdGlvbnMuY2FudmFzUmVxdWlyZWQgPSB0cnVlO1xuICAgIGNvbnN0IHV1aWQgPSAoYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnY3JlYXRlLW5vZGUnLCBvcHRpb25zKSkgYXMgdW5rbm93biBhcyBzdHJpbmc7XG4gICAgaWYgKCF1dWlkIHx8IHR5cGVvZiB1dWlkICE9PSAnc3RyaW5nJykgcmV0dXJuIG51bGw7XG4gICAgYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnY3JlYXRlLWNvbXBvbmVudCcsIHsgdXVpZCwgY29tcG9uZW50OiAnU3BsaW5lQ29udGFpbmVyJyB9IGFzIGFueSk7XG4gICAgY29uc3Qgbm9kZSA9IGZpbmROb2RlKHV1aWQpO1xuICAgIGNvbnN0IEMgPSBjb250YWluZXJDbGFzcygpO1xuICAgIGNvbnN0IGNvbXAgPSBub2RlICYmIEMgPyBub2RlLmdldENvbXBvbmVudChDKSA6IG51bGw7XG4gICAgaWYgKCFjb21wKSByZXR1cm4gdXVpZDtcbiAgICBjb25zdCB7IHBvcywgc2l6ZSB9ID0gdmlld0NlbnRlcihpczJEKTtcbiAgICBhd2FpdCByZWNvcmRFZGl0KFtjb21wXSwgKCkgPT4ge1xuICAgICAgICBub2RlLnNldFdvcmxkUG9zaXRpb24ocG9zLngsIHBvcy55LCBwb3Mueik7XG4gICAgICAgIGlmICghY29tcC5zcGxpbmVzLmxlbmd0aCkgY29tcC5zcGxpbmVzLnB1c2goZmFjdG9yeS5zcGxpbmUoKSk7XG4gICAgICAgIGNvbnN0IHNwbGluZSA9IGNvbXAuc3BsaW5lc1swXTtcbiAgICAgICAgaWYgKGtpbmQgIT09ICdkcmF3JyAmJiBTSEFQRVMuaW5jbHVkZXMoa2luZCkpIHtcbiAgICAgICAgICAgIGJ1aWxkU2hhcGUoc3BsaW5lLCBraW5kLCB7IHNpemUsIHBsYW5lMkQ6IGlzMkQsIHNpZGVzOiBraW5kID09PSAnc3RhcicgPyA1IDogNiwgdHVybnM6IDMsIGhlaWdodDogc2l6ZSAqIDIgfSwgZmFjdG9yeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcGxpbmUua25vdHMubGVuZ3RoID0gMDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGFmdGVyRWRpdChbY29tcF0pO1xuICAgIHRyeSB7XG4gICAgICAgIEVkaXRvci5TZWxlY3Rpb24uY2xlYXIoJ25vZGUnKTtcbiAgICAgICAgRWRpdG9yLlNlbGVjdGlvbi5zZWxlY3QoJ25vZGUnLCB1dWlkKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gc2VsZWN0aW9uIEFQSSBtaXNzaW5nXG4gICAgfVxuICAgIC8vIFRoZSBzZWxlY3Rpb24gcmVhY2hlcyB0aGUgc2NlbmUgYXN5bmNocm9ub3VzbHk7IHRoZSBjb250ZXh0IHN0YXJ0cyBvbmNlIHRoZSBub2RlIGlzIHNlbGVjdGVkLlxuICAgIFMucGVuZGluZ0NvbnRleHQgPSB7IGNvbXAsIHRvb2w6IGtpbmQgPT09ICdkcmF3JyA/ICdkcmF3JyA6ICdzZWxlY3QnLCB1bnRpbDogRGF0ZS5ub3coKSArIDMwMDAgfTtcbiAgICByZXBhaW50KCk7XG4gICAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCB7IHRvTG9jYWwsIGN1cnJlbnRTY2VuZSwgdGFuZ2VudHNFZGl0YWJsZSwgaXNFbmRLbm90IH07XG4iLCAiLyoqXG4gKiBNb3VzZSBhbmQga2V5Ym9hcmQgaW4gdGhlIFNjZW5lIHZpZXcuXG4gKlxuICogTGlzdGVuZXJzIGFyZSByZWdpc3RlcmVkIG9uIGNjZS5PcGVyYXRpb24gYWJvdmUgdGhlIGVkaXRvcidzIGdpem1vcyBhbmRcbiAqIGNhbWVyYSwgc28gYSBwcmVzcyBvbiBhIGtub3QsIHRhbmdlbnQgb3IgaGFuZGxlIG5ldmVyIHJlYWNoZXMgdGhlbS5cbiAqIEV2ZXJ5dGhpbmcgZWxzZSBwYXNzZXMgdGhyb3VnaCwgZXhjZXB0IGluc2lkZSB0aGUgZWRpdCBjb250ZXh0IHdoZXJlIGFuXG4gKiBlbXB0eS1zcGFjZSBkcmFnIHNlbGVjdHMga25vdHMgaW4gYSByZWN0YW5nbGUgKGxpa2UgVW5pdHkpLlxuICovXG5pbXBvcnQgeyBWMywgdjMsIHN1YiwgYWRkLCBkb3QsIG5vcm1hbGl6ZSwgbGVuU3EsIHNjYWxlQW5kQWRkLCBjb3B5IH0gZnJvbSAnLi4vLi4vYXNzZXRzL2NvcmUvbWF0aCc7XG5pbXBvcnQgeyBDdXJ2ZSwgY3VydmUsIGV2YWxQb3NpdGlvbiB9IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL2N1cnZlJztcbmltcG9ydCB7XG4gICAgVGFuZ2VudE1vZGUsIGNvbnRhaW5lckluc2VydEtub3QsIHNldENsb3NlZCwgaXNFbmRLbm90LCBzZXRUYW5nZW50TW9kZSwgdGFuZ2VudEluVmVjLCB0YW5nZW50T3V0VmVjLCBrbm90Um90YXRpb24sXG59IGZyb20gJy4uLy4uL2Fzc2V0cy9jb3JlL3NwbGluZS1jb3JlJztcbmltcG9ydCB7IGNjLCBjY2UsIGZhY3RvcnksIGlzMkRWaWV3LCBydW50aW1lUmVhZHksIHNuYXBDb25maWcsIHJlcGFpbnQgfSBmcm9tICcuL2Vudic7XG5pbXBvcnQge1xuICAgIHNjZW5lQ2FtZXJhLCBldmVudFRvU2NyZWVuLCBzY3JlZW5SYXksIHJheVBsYW5lLCBjYW1lcmFGb3J3YXJkLCBzaG93UmVjdCwgaGlkZVJlY3QsIHNob3dUaXAsIGhpZGVUaXAsIFJheSxcbn0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7XG4gICAgRWxlbWVudFJlZiwgZWxlbWVudFdvcmxkUG9zaXRpb24sIHNldEtub3RXb3JsZCwgc2V0VGFuZ2VudFdvcmxkLCB0b0xvY2FsLCB0b1dvcmxkLCBkaXJUb1dvcmxkLCBrbm90V29ybGRQb3NpdGlvbixcbn0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyBTLCBIaXQsIG5vdGUsIGJ1bXBTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgaGl0VGVzdCwga25vdHNJblJlY3QsIGN1cnJlbnRIYW5kbGVGcmFtZSwgc2V0SGFuZGxlQXhlc092ZXJyaWRlLCBzZXREcmFnQXhpcywgc2V0UHJldmlld0RyYXdlciB9IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCB7IHN0YXJ0SGFuZGxlRHJhZywgSGFuZGxlRHJhZyB9IGZyb20gJy4vaGFuZGxlcyc7XG5pbXBvcnQgeyBFZGl0U2Vzc2lvbiwgcmVjb3JkRWRpdCB9IGZyb20gJy4vdW5kbyc7XG5pbXBvcnQgeyB1cGRhdGVUYXJnZXRzLCBzZXRDb250ZXh0LCBzZXRUb29sLCBtYXliZUJyb2FkY2FzdCB9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQge1xuICAgIGRlbGV0ZVNlbGVjdGlvbiwgY3ljbGVNb2RlU2VsZWN0ZWQsIHNlbGVjdEFsbCwgaW5zZXJ0T25DdXJ2ZSwgY2xlYXJTZWxlY3Rpb24sXG59IGZyb20gJy4vb3BzJztcbmltcG9ydCAqIGFzIEQgZnJvbSAnLi9kcmF3JztcblxuZXhwb3J0IGNvbnN0IFBSSU9SSVRZID0gMTAwOyAvLyBDb2NvczogZ2l6bW9zIDk5LCBjYW1lcmEgOThcbmNvbnN0IERSQUdfUFggPSA0O1xuXG50eXBlIEFjdGl2ZSA9XG4gICAgfCB7IGtpbmQ6ICdoYW5kbGUnOyBkcmFnOiBIYW5kbGVEcmFnOyBzZXNzaW9uOiBFZGl0U2Vzc2lvbiB9XG4gICAgfCB7XG4gICAgICAgIGtpbmQ6ICdlbGVtZW50JztcbiAgICAgICAgcmVmOiBFbGVtZW50UmVmO1xuICAgICAgICB4MDogbnVtYmVyO1xuICAgICAgICB5MDogbnVtYmVyO1xuICAgICAgICBkcmFnZ2luZzogYm9vbGVhbjtcbiAgICAgICAgdG9nZ2xlZDogYm9vbGVhbjtcbiAgICAgICAgc2Vzc2lvbjogRWRpdFNlc3Npb24gfCBudWxsO1xuICAgICAgICBncmFiOiBWMyB8IG51bGw7XG4gICAgICAgIHN0YXJ0czogeyBlOiBFbGVtZW50UmVmOyBwb3M6IFYzIH1bXTtcbiAgICB9XG4gICAgfCB7XG4gICAgICAgIGtpbmQ6ICdyZWN0JztcbiAgICAgICAgeDA6IG51bWJlcjtcbiAgICAgICAgeTA6IG51bWJlcjtcbiAgICAgICAgbW92ZWQ6IGJvb2xlYW47XG4gICAgICAgIGFkZGl0aXZlOiBib29sZWFuO1xuICAgICAgICBiYXNlOiBFbGVtZW50UmVmW107XG4gICAgICAgIGRvd246IGFueTtcbiAgICAgICAgb25DdXJ2ZTogYm9vbGVhbjtcbiAgICB9XG4gICAgfCB7XG4gICAgICAgIGtpbmQ6ICdkcmF3JztcbiAgICAgICAgY29tcDogYW55O1xuICAgICAgICBzcGxpbmU6IG51bWJlcjtcbiAgICAgICAga25vdDogbnVtYmVyO1xuICAgICAgICBwYXJ0OiAnaW4nIHwgJ291dCc7XG4gICAgICAgIHgwOiBudW1iZXI7XG4gICAgICAgIHkwOiBudW1iZXI7XG4gICAgICAgIGRyYWdnaW5nOiBib29sZWFuO1xuICAgICAgICBzZXNzaW9uOiBFZGl0U2Vzc2lvbjtcbiAgICAgICAgbm9ybWFsOiBWMztcbiAgICB9O1xuXG5sZXQgYWN0aXZlOiBBY3RpdmUgfCBudWxsID0gbnVsbDtcbmxldCBsYXN0SG92ZXJLZXkgPSAnJztcblxuZnVuY3Rpb24gY29tcHNPZihsaXN0OiBFbGVtZW50UmVmW10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIFsuLi5uZXcgU2V0KGxpc3QubWFwKChlKSA9PiBlLmNvbXApKV07XG59XG5cbmZ1bmN0aW9uIGhpdEtleShoOiBIaXQgfCBudWxsKTogc3RyaW5nIHtcbiAgICBpZiAoIWgpIHJldHVybiAnJztcbiAgICBzd2l0Y2ggKGgua2luZCkge1xuICAgICAgICBjYXNlICdoYW5kbGUnOiByZXR1cm4gYGg6JHtoLmF4aXN9YDtcbiAgICAgICAgY2FzZSAna25vdCc6XG4gICAgICAgIGNhc2UgJ3RhbmdlbnQnOiByZXR1cm4gYCR7aC5raW5kfToke2gucmVmLmNvbXAudXVpZH06JHtoLnJlZi5zcGxpbmV9OiR7aC5yZWYua25vdH06JHtoLnJlZi5wYXJ0fWA7XG4gICAgICAgIGNhc2UgJ2N1cnZlJzogcmV0dXJuIGBjOiR7aC5jb21wLnV1aWR9OiR7aC5zcGxpbmV9OiR7aC5jdXJ2ZX1gO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0SG92ZXIoaDogSGl0IHwgbnVsbCk6IHZvaWQge1xuICAgIGNvbnN0IGtleSA9IGhpdEtleShoKTtcbiAgICBTLmhvdmVyID0gaDtcbiAgICBpZiAoa2V5ICE9PSBsYXN0SG92ZXJLZXkpIHtcbiAgICAgICAgbGFzdEhvdmVyS2V5ID0ga2V5O1xuICAgICAgICByZXBhaW50KCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25DaGFuZ2VkKCk6IHZvaWQge1xuICAgIGJ1bXBTdGF0ZSgpO1xuICAgIG1heWJlQnJvYWRjYXN0KCk7XG4gICAgcmVwYWludCgpO1xufVxuXG5mdW5jdGlvbiBjYW5FZGl0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBTLnByaW1hcnkgJiYgIVMucmVwbGF5aW5nICYmIHJ1bnRpbWVSZWFkeSgpO1xufVxuXG4vKiogUG9pbnRlciBwb3NpdGlvbiBmb3IgYW4gZXZlbnQsIG9yIG51bGwgaWYgdGhlcmUgaXMgbm8gU2NlbmUgdmlldyBjYW1lcmEuICovXG5mdW5jdGlvbiBwb2ludGVyKGV2OiBhbnkpOiB7IGNhbTogYW55OyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbCB7XG4gICAgY29uc3QgY2FtID0gc2NlbmVDYW1lcmEoKTtcbiAgICBpZiAoIWNhbSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcCA9IGV2ZW50VG9TY3JlZW4oY2FtLCBldik7XG4gICAgcmV0dXJuIHsgY2FtLCB4OiBwLngsIHk6IHAueSB9O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1vdXNlXG5cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdXNlRG93bihldjogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCFjYW5FZGl0KCkpIHJldHVybiB0cnVlO1xuICAgIC8vIEEgZHJhZyB3aG9zZSBtb3VzZS11cCBuZXZlciBhcnJpdmVkIChyZWxlYXNlZCBvdXRzaWRlIHRoZSB2aWV3KSBlbmRzIGhlcmUuXG4gICAgaWYgKGFjdGl2ZSkgY2FuY2VsQWN0aXZlKCk7XG4gICAgUy5kaWFnLm1vdXNlRG93bnMrKztcbiAgICBjb25zdCBsZWZ0ID0gZXYuYnV0dG9uID09PSAwIHx8IChldi5idXR0b24gPT09IHVuZGVmaW5lZCAmJiBldi5sZWZ0QnV0dG9uKTtcbiAgICBpZiAoIWxlZnQgfHwgZXYuYWx0S2V5KSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBwID0gcG9pbnRlcihldik7XG4gICAgaWYgKCFwKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCB0YXJnZXRzID0gdXBkYXRlVGFyZ2V0cygpO1xuICAgIGlmICghdGFyZ2V0cy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChTLnRvb2wgPT09ICdkcmF3JykgcmV0dXJuIGRyYXdEb3duKHAuY2FtLCBwLngsIHAueSwgZXYpO1xuICAgICAgICByZXR1cm4gc2VsZWN0RG93bihwLmNhbSwgcC54LCBwLnksIGV2KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIG5vdGUoYG1vdXNlZG93bjogJHsoZSBhcyBFcnJvcik/LnN0YWNrIHx8IGV9YCk7XG4gICAgICAgIGFjdGl2ZSA9IG51bGw7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2VsZWN0RG93bihjYW06IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIsIGV2OiBhbnkpOiBib29sZWFuIHtcbiAgICBjb25zdCBoaXQgPSBoaXRUZXN0KGNhbSwgeCwgeSwgeyBvdXRzaWRlQ29udGV4dDogIVMuY29udGV4dCB9KTtcbiAgICBpZiAoIVMuY29udGV4dCkge1xuICAgICAgICAvLyBDbGlja2luZyBhIGtub3Qgb2YgYSBzZWxlY3RlZCBzcGxpbmUgc3RhcnRzIGVkaXRpbmcgaXQuXG4gICAgICAgIGlmIChoaXQ/LmtpbmQgIT09ICdrbm90JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHNldENvbnRleHQodHJ1ZSk7XG4gICAgfVxuICAgIFMuZGlhZy5ibG9ja2VkKys7XG4gICAgaWYgKGhpdD8ua2luZCA9PT0gJ2hhbmRsZScpIHtcbiAgICAgICAgY29uc3QgZnJhbWUgPSBjdXJyZW50SGFuZGxlRnJhbWUoY2FtKTtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBTLnNlbGVjdGlvbi5hbGwoKTtcbiAgICAgICAgaWYgKCFmcmFtZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBkcmFnID0gc3RhcnRIYW5kbGVEcmFnKGNhbSwgZnJhbWUsIGhpdC5heGlzLCB4LCB5LCBlbGVtZW50cyk7XG4gICAgICAgIGlmICghZHJhZykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBzZXRIYW5kbGVBeGVzT3ZlcnJpZGUoZnJhbWUuYXhlcyk7XG4gICAgICAgIHNldERyYWdBeGlzKGhpdC5heGlzKTtcbiAgICAgICAgYWN0aXZlID0geyBraW5kOiAnaGFuZGxlJywgZHJhZywgc2Vzc2lvbjogbmV3IEVkaXRTZXNzaW9uKGNvbXBzT2YoZWxlbWVudHMpKSB9O1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChoaXQ/LmtpbmQgPT09ICdrbm90JyB8fCBoaXQ/LmtpbmQgPT09ICd0YW5nZW50Jykge1xuICAgICAgICBjb25zdCByZWYgPSBoaXQucmVmO1xuICAgICAgICBjb25zdCBhZGRpdGl2ZSA9ICEhKGV2LnNoaWZ0S2V5IHx8IGV2LmN0cmxLZXkgfHwgZXYubWV0YUtleSk7XG4gICAgICAgIGxldCB0b2dnbGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgICAgUy5zZWxlY3Rpb24udG9nZ2xlKHJlZik7XG4gICAgICAgICAgICB0b2dnbGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghUy5zZWxlY3Rpb24uaGFzKHJlZikpIHtcbiAgICAgICAgICAgIFMuc2VsZWN0aW9uLnNldChbcmVmXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBTLnNlbGVjdGlvbi5hZGQocmVmKTsgLy8gbWFrZSBpdCB0aGUgYWN0aXZlIGVsZW1lbnRcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgIGFjdGl2ZSA9IHsga2luZDogJ2VsZW1lbnQnLCByZWYsIHgwOiB4LCB5MDogeSwgZHJhZ2dpbmc6IGZhbHNlLCB0b2dnbGVkLCBzZXNzaW9uOiBudWxsLCBncmFiOiBudWxsLCBzdGFydHM6IFtdIH07XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYWN0aXZlID0ge1xuICAgICAgICBraW5kOiAncmVjdCcsXG4gICAgICAgIHgwOiB4LFxuICAgICAgICB5MDogeSxcbiAgICAgICAgbW92ZWQ6IGZhbHNlLFxuICAgICAgICBhZGRpdGl2ZTogISEoZXYuc2hpZnRLZXkgfHwgZXYuY3RybEtleSB8fCBldi5tZXRhS2V5KSxcbiAgICAgICAgYmFzZTogUy5zZWxlY3Rpb24uYWxsKCksXG4gICAgICAgIGRvd246IGNsb25lRXZlbnQoZXYpLFxuICAgICAgICBvbkN1cnZlOiBoaXQ/LmtpbmQgPT09ICdjdXJ2ZScsXG4gICAgfTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNsb25lRXZlbnQoZXY6IGFueSk6IGFueSB7XG4gICAgY29uc3QgbzogYW55ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIGV2KSB7XG4gICAgICAgIGNvbnN0IHYgPSBldltrXTtcbiAgICAgICAgaWYgKHR5cGVvZiB2ICE9PSAnZnVuY3Rpb24nKSBvW2tdID0gdjtcbiAgICB9XG4gICAgcmV0dXJuIG87XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdXNlTW92ZShldjogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCFjYW5FZGl0KCkpIHJldHVybiB0cnVlO1xuICAgIGNvbnN0IHAgPSBwb2ludGVyKGV2KTtcbiAgICBpZiAoIXApIHJldHVybiB0cnVlO1xuICAgIHRyeSB7XG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgICBob3ZlcihwLmNhbSwgcC54LCBwLnksIGV2KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkcmFnTW92ZShwLmNhbSwgcC54LCBwLnksIGV2KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIG5vdGUoYG1vdXNlbW92ZTogJHsoZSBhcyBFcnJvcik/LnN0YWNrIHx8IGV9YCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaG92ZXIoY2FtOiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyLCBldjogYW55KTogdm9pZCB7XG4gICAgaWYgKCFTLmxhc3RUYXJnZXRzLmxlbmd0aCkge1xuICAgICAgICBpZiAoUy5ob3Zlcikgc2V0SG92ZXIobnVsbCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFMudG9vbCA9PT0gJ2RyYXcnKSB7XG4gICAgICAgIGNvbnN0IGhpdCA9IGhpdFRlc3QoY2FtLCB4LCB5LCB7IGhhbmRsZXM6IGZhbHNlLCBvdXRzaWRlQ29udGV4dDogdHJ1ZSB9KTtcbiAgICAgICAgc2V0SG92ZXIoaGl0ICYmIChoaXQua2luZCA9PT0gJ2tub3QnIHx8IGhpdC5raW5kID09PSAnY3VydmUnKSA/IGhpdCA6IG51bGwpO1xuICAgICAgICBjb25zdCBjb21wID0gZHJhd0NvbXAoKTtcbiAgICAgICAgY29uc3QgcGxhY2UgPSBjb21wID8gcGxhY2VtZW50KGNhbSwgeCwgeSwgY29tcCkgOiBudWxsO1xuICAgICAgICBTLnByZXZpZXcgPSBwbGFjZSA/IHBsYWNlLndvcmxkIDogbnVsbDtcbiAgICAgICAgcmVwYWludCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGhpdCA9IGhpdFRlc3QoY2FtLCB4LCB5LCB7IG91dHNpZGVDb250ZXh0OiAhUy5jb250ZXh0LCBjdXJ2ZXM6IFMuY29udGV4dCB9KTtcbiAgICBzZXRIb3ZlcihTLmNvbnRleHQgfHwgaGl0Py5raW5kID09PSAna25vdCcgPyBoaXQgOiBudWxsKTtcbiAgICB2b2lkIGV2O1xufVxuXG5mdW5jdGlvbiBkcmFnTW92ZShjYW06IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIsIGV2OiBhbnkpOiBib29sZWFuIHtcbiAgICBjb25zdCBhID0gYWN0aXZlITtcbiAgICBzd2l0Y2ggKGEua2luZCkge1xuICAgICAgICBjYXNlICdoYW5kbGUnOiB7XG4gICAgICAgICAgICBsZXQgdGV4dCA9ICcnO1xuICAgICAgICAgICAgYS5zZXNzaW9uLmFwcGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gYS5kcmFnLnVwZGF0ZSh4LCB5LCBldik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0ZXh0KSBzaG93VGlwKGNhbSwgeCwgeSwgdGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnZWxlbWVudCc6IHtcbiAgICAgICAgICAgIGlmICghYS5kcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmh5cG90KHggLSBhLngwLCB5IC0gYS55MCkgPCBEUkFHX1BYIHx8IGEudG9nZ2xlZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IG1vdmluZyB0aGUgc2VsZWN0aW9uIHdpdGggdGhlIGVsZW1lbnQgdW5kZXIgdGhlIG1vdXNlLlxuICAgICAgICAgICAgICAgIGEuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gbW92YWJsZUVsZW1lbnRzKFMuc2VsZWN0aW9uLmFsbCgpKTtcbiAgICAgICAgICAgICAgICBhLnN0YXJ0cyA9IGVsZW1lbnRzLm1hcCgoZSkgPT4gKHsgZSwgcG9zOiBlbGVtZW50V29ybGRQb3NpdGlvbihlKSB9KSk7XG4gICAgICAgICAgICAgICAgYS5ncmFiID0gZWxlbWVudFdvcmxkUG9zaXRpb24oYS5yZWYpO1xuICAgICAgICAgICAgICAgIGEuc2Vzc2lvbiA9IG5ldyBFZGl0U2Vzc2lvbihjb21wc09mKGVsZW1lbnRzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBncmFiID0gYS5ncmFiITtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBjYW1lcmFGb3J3YXJkKGNhbSk7XG4gICAgICAgICAgICBjb25zdCBoaXQgPSByYXlQbGFuZShzY3JlZW5SYXkoY2FtLCB4LCB5KSwgZ3JhYiwgbiwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoIWhpdCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgZGVsdGEgPSBzdWIodjMoKSwgaGl0LCBncmFiKTtcbiAgICAgICAgICAgIGNvbnN0IHNuYXAgPSBzbmFwQ29uZmlnKCk7XG4gICAgICAgICAgICBpZiAoc25hcC5pc1Bvc2l0aW9uU25hcEVuYWJsZWQgIT09ICEhZXYuY3RybEtleSAmJiBhLnJlZi5wYXJ0ID09PSAna25vdCcpIHtcbiAgICAgICAgICAgICAgICAvLyBTbmFwIHRoZSBkcmFnZ2VkIGtub3QncyB3b3JsZCBwb3NpdGlvbiB0byB0aGUgZ3JpZC5cbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBhZGQodjMoKSwgZ3JhYiwgZGVsdGEpO1xuICAgICAgICAgICAgICAgIHRhcmdldC54ID0gTWF0aC5yb3VuZCh0YXJnZXQueCAvIChzbmFwLnBvc2l0aW9uLnggfHwgMSkpICogKHNuYXAucG9zaXRpb24ueCB8fCAxKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQueSA9IE1hdGgucm91bmQodGFyZ2V0LnkgLyAoc25hcC5wb3NpdGlvbi55IHx8IDEpKSAqIChzbmFwLnBvc2l0aW9uLnkgfHwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpczJEVmlldygpKSB0YXJnZXQueiA9IE1hdGgucm91bmQodGFyZ2V0LnogLyAoc25hcC5wb3NpdGlvbi56IHx8IDEpKSAqIChzbmFwLnBvc2l0aW9uLnogfHwgMSk7XG4gICAgICAgICAgICAgICAgc3ViKGRlbHRhLCB0YXJnZXQsIGdyYWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYS5zZXNzaW9uIS5hcHBseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzIG9mIGEuc3RhcnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGFkZCh2MygpLCBzLnBvcywgZGVsdGEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5lLnBhcnQgPT09ICdrbm90Jykgc2V0S25vdFdvcmxkKHMuZS5jb21wLCBzLmUuc3BsaW5lLCBzLmUua25vdCwgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBzZXRUYW5nZW50V29ybGQocy5lLmNvbXAsIHMuZS5zcGxpbmUsIHMuZS5rbm90LCBzLmUucGFydCwgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdyZWN0Jzoge1xuICAgICAgICAgICAgaWYgKCFhLm1vdmVkICYmIE1hdGguaHlwb3QoeCAtIGEueDAsIHkgLSBhLnkwKSA8IERSQUdfUFgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGEubW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2hvd1JlY3QoY2FtLCBhLngwLCBhLnkwLCB4LCB5KTtcbiAgICAgICAgICAgIGNvbnN0IGluc2lkZSA9IGtub3RzSW5SZWN0KGNhbSwgYS54MCwgYS55MCwgeCwgeSk7XG4gICAgICAgICAgICBTLnNlbGVjdGlvbi5zZXQoYS5hZGRpdGl2ZSA/IFsuLi5hLmJhc2UsIC4uLmluc2lkZV0gOiBpbnNpZGUpO1xuICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2RyYXcnOlxuICAgICAgICAgICAgZHJhd0RyYWcoY2FtLCB4LCB5LCBhKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKiogRWxlbWVudHMgdGhhdCBtb3ZlIHdpdGggYSBkcmFnOiB0YW5nZW50cyB3aG9zZSBrbm90IGlzIGFsc28gc2VsZWN0ZWQgbW92ZSB3aXRoIGl0LiAqL1xuZnVuY3Rpb24gbW92YWJsZUVsZW1lbnRzKGxpc3Q6IEVsZW1lbnRSZWZbXSk6IEVsZW1lbnRSZWZbXSB7XG4gICAgcmV0dXJuIGxpc3QuZmlsdGVyKChlKSA9PiBlLnBhcnQgPT09ICdrbm90JyB8fCAhbGlzdC5zb21lKChvKSA9PiBvLnBhcnQgPT09ICdrbm90JyAmJiBvLmNvbXAgPT09IGUuY29tcCAmJiBvLnNwbGluZSA9PT0gZS5zcGxpbmUgJiYgby5rbm90ID09PSBlLmtub3QpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTW91c2VVcChldjogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKFMucmVwbGF5aW5nKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgYSA9IGFjdGl2ZTtcbiAgICBhY3RpdmUgPSBudWxsO1xuICAgIGNvbnN0IHAgPSBwb2ludGVyKGV2KTtcbiAgICB0cnkge1xuICAgICAgICBzd2l0Y2ggKGEua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnaGFuZGxlJzpcbiAgICAgICAgICAgICAgICBhLnNlc3Npb24uZW5kKCk7XG4gICAgICAgICAgICAgICAgc2V0SGFuZGxlQXhlc092ZXJyaWRlKG51bGwpO1xuICAgICAgICAgICAgICAgIHNldERyYWdBeGlzKG51bGwpO1xuICAgICAgICAgICAgICAgIGhpZGVUaXAoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnQnOlxuICAgICAgICAgICAgICAgIGlmIChhLnNlc3Npb24pIGEuc2Vzc2lvbi5lbmQoKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghYS50b2dnbGVkICYmIFMuc2VsZWN0aW9uLnNpemUgPiAxICYmICFhLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgY2xpY2sgb24gb25lIG9mIHNldmVyYWwgc2VsZWN0ZWQgZWxlbWVudHMgc2VsZWN0cyBqdXN0IGl0LlxuICAgICAgICAgICAgICAgICAgICBTLnNlbGVjdGlvbi5zZXQoW2EucmVmXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVjdCc6XG4gICAgICAgICAgICAgICAgaGlkZVJlY3QoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWEubW92ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEub25DdXJ2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xpY2tzIG9uIGEgY3VydmUgc3RheSBpbiB0aGUgZWRpdG9yIChkb3VibGUtY2xpY2sgaW5zZXJ0cyBhIGtub3QpLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhLmFkZGl0aXZlKSBjbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFMuc2VsZWN0aW9uLnNpemUgJiYgIWEuYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWEuYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxheUNsaWNrKGEuZG93biwgZXYpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZHJhdyc6XG4gICAgICAgICAgICAgICAgYS5zZXNzaW9uLmVuZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBub3RlKGBtb3VzZXVwOiAkeyhlIGFzIEVycm9yKT8uc3RhY2sgfHwgZX1gKTtcbiAgICB9XG4gICAgdm9pZCBwO1xuICAgIHNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKiBMZXRzIHRoZSBlZGl0b3IgaGFuZGxlIGEgY2xpY2sgd2UgaGVsZCBiYWNrIChvYmplY3QgcGlja2luZykuICovXG5mdW5jdGlvbiByZXBsYXlDbGljayhkb3duOiBhbnksIHVwOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBvcCA9IGNjZSgpLk9wZXJhdGlvbjtcbiAgICBpZiAoIW9wPy5lbWl0KSByZXR1cm47XG4gICAgUy5yZXBsYXlpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICAgIG9wLmVtaXQoJ21vdXNlZG93bicsIGRvd24pO1xuICAgICAgICBvcC5lbWl0KCdtb3VzZXVwJywgdXApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbm90ZShgcmVwbGF5OiAke2V9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgUy5yZXBsYXlpbmcgPSBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkRibENsaWNrKGV2OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoIWNhbkVkaXQoKSB8fCAhUy5jb250ZXh0IHx8IFMudG9vbCAhPT0gJ3NlbGVjdCcpIHJldHVybiB0cnVlO1xuICAgIGNvbnN0IHAgPSBwb2ludGVyKGV2KTtcbiAgICBpZiAoIXApIHJldHVybiB0cnVlO1xuICAgIGNvbnN0IGhpdCA9IGhpdFRlc3QocC5jYW0sIHAueCwgcC55LCB7IGhhbmRsZXM6IGZhbHNlIH0pO1xuICAgIGlmIChoaXQ/LmtpbmQgIT09ICdjdXJ2ZScpIHJldHVybiB0cnVlO1xuICAgIGluc2VydE9uQ3VydmUoaGl0LmNvbXAsIGhpdC5zcGxpbmUsIGhpdC5jdXJ2ZSwgaGl0LnQpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqIEVuZHMgYW55IGRyYWcgKGUuZy4gdGhlIG1vdXNlIHdhcyByZWxlYXNlZCBvdXRzaWRlIHRoZSBTY2VuZSB2aWV3KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxBY3RpdmUoKTogdm9pZCB7XG4gICAgaWYgKCFhY3RpdmUpIHJldHVybjtcbiAgICBjb25zdCBhID0gYWN0aXZlO1xuICAgIGFjdGl2ZSA9IG51bGw7XG4gICAgaWYgKGEua2luZCA9PT0gJ2hhbmRsZScgfHwgYS5raW5kID09PSAnZHJhdycpIGEuc2Vzc2lvbi5lbmQoKTtcbiAgICBpZiAoYS5raW5kID09PSAnZWxlbWVudCcgJiYgYS5zZXNzaW9uKSBhLnNlc3Npb24uZW5kKCk7XG4gICAgc2V0SGFuZGxlQXhlc092ZXJyaWRlKG51bGwpO1xuICAgIHNldERyYWdBeGlzKG51bGwpO1xuICAgIGhpZGVSZWN0KCk7XG4gICAgaGlkZVRpcCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEcmFnZ2luZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFhY3RpdmU7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhdyB0b29sXG5cbmZ1bmN0aW9uIGRyYXdDb21wKCk6IGFueSB7XG4gICAgaWYgKFMuZHJhd2luZyAmJiBTLmxhc3RUYXJnZXRzLmluY2x1ZGVzKFMuZHJhd2luZy5jb21wKSkgcmV0dXJuIFMuZHJhd2luZy5jb21wO1xuICAgIHJldHVybiBTLmxhc3RUYXJnZXRzW1MuZHJhd1RhcmdldCAlIE1hdGgubWF4KDEsIFMubGFzdFRhcmdldHMubGVuZ3RoKV0gPz8gbnVsbDtcbn1cblxuLyoqIE5vcm1hbCBvZiB0aGUgZHJhd2luZyBwbGFuZTogdGhlIGNvbnRhaW5lcidzIHVwIChZIGluIDNELCBaIGluIDJEKS4gKi9cbmZ1bmN0aW9uIGRyYXdOb3JtYWwoY29tcDogYW55KTogVjMge1xuICAgIGNvbnN0IG4gPSBkaXJUb1dvcmxkKGNvbXAsIGlzMkRWaWV3KCkgPyB2MygwLCAwLCAxKSA6IHYzKDAsIDEsIDApKTtcbiAgICByZXR1cm4gbGVuU3EobikgPiAxZS0xMiA/IG5vcm1hbGl6ZShuLCBuKSA6IHYzKDAsIDEsIDApO1xufVxuXG4vKiogV2hlcmUgYSBrbm90IHBsYWNlZCBhdCBzY3JlZW4gcG9pbnQgKHgsIHkpIGdvZXMuICovXG5mdW5jdGlvbiBwbGFjZW1lbnQoY2FtOiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyLCBjb21wOiBhbnkpOiB7IHdvcmxkOiBWMzsgbm9ybWFsOiBWMyB9IHwgbnVsbCB7XG4gICAgY29uc3QgcmF5ID0gc2NyZWVuUmF5KGNhbSwgeCwgeSk7XG4gICAgY29uc3Qgbm9ybWFsID0gZHJhd05vcm1hbChjb21wKTtcbiAgICBpZiAoUy5zZXR0aW5ncy5kcmF3T25TdXJmYWNlcyAmJiAhaXMyRFZpZXcoKSkge1xuICAgICAgICBjb25zdCBoaXQgPSByYXljYXN0U2NlbmUocmF5KTtcbiAgICAgICAgaWYgKGhpdCkgcmV0dXJuIHsgd29ybGQ6IGhpdCwgbm9ybWFsIH07XG4gICAgfVxuICAgIC8vIFRoZSBwbGFuZSB0aHJvdWdoIHRoZSBrbm90IGRyYXduIGxhc3QgKG9yIHRoZSBjb250YWluZXIpLCBmYWNpbmcgdGhlIGNvbnRhaW5lcidzIHVwLlxuICAgIGxldCByZWY6IFYzID0gdG9Xb3JsZChjb21wLCB2MygpKTtcbiAgICBpZiAoUy5kcmF3aW5nICYmIFMuZHJhd2luZy5jb21wID09PSBjb21wKSB7XG4gICAgICAgIGNvbnN0IHMgPSBjb21wLnNwbGluZXNbUy5kcmF3aW5nLnNwbGluZV07XG4gICAgICAgIGlmIChzICYmIHMua25vdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBrID0gUy5kcmF3aW5nLmVuZCA9PT0gJ2VuZCcgPyBzLmtub3RzLmxlbmd0aCAtIDEgOiAwO1xuICAgICAgICAgICAgcmVmID0ga25vdFdvcmxkUG9zaXRpb24oY29tcCwgUy5kcmF3aW5nLnNwbGluZSwgayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHA6IFYzIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKE1hdGguYWJzKGRvdChyYXkuZCwgbm9ybWFsKSkgPiAwLjAyKSBwID0gcmF5UGxhbmUocmF5LCByZWYsIG5vcm1hbCk7XG4gICAgaWYgKCFwKSBwID0gcmF5UGxhbmUocmF5LCByZWYsIGNhbWVyYUZvcndhcmQoY2FtKSwgdHJ1ZSk7XG4gICAgaWYgKCFwKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIWlzMkRWaWV3KCkpIHtcbiAgICAgICAgY29uc3Qgc25hcCA9IHNuYXBDb25maWcoKTtcbiAgICAgICAgaWYgKHNuYXAuaXNQb3NpdGlvblNuYXBFbmFibGVkKSB7XG4gICAgICAgICAgICBwLnggPSBNYXRoLnJvdW5kKHAueCAvIChzbmFwLnBvc2l0aW9uLnggfHwgMSkpICogKHNuYXAucG9zaXRpb24ueCB8fCAxKTtcbiAgICAgICAgICAgIHAueiA9IE1hdGgucm91bmQocC56IC8gKHNuYXAucG9zaXRpb24ueiB8fCAxKSkgKiAoc25hcC5wb3NpdGlvbi56IHx8IDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHdvcmxkOiBwLCBub3JtYWwgfTtcbn1cblxuLyoqIENsb3Nlc3Qgc2NlbmUgZ2VvbWV0cnkgdW5kZXIgdGhlIHJheSAobW9kZWxzIG9mIHVzZXIgbm9kZXMgb25seSkuICovXG5mdW5jdGlvbiByYXljYXN0U2NlbmUocmF5OiBSYXkpOiBWMyB8IG51bGwge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZGlyZWN0b3IsIGdlb21ldHJ5LCBDQ09iamVjdCB9ID0gY2MoKTtcbiAgICAgICAgY29uc3Qgc2NlbmU6IGFueSA9IGRpcmVjdG9yLmdldFNjZW5lKCk7XG4gICAgICAgIGNvbnN0IHJzID0gc2NlbmU/LnJlbmRlclNjZW5lO1xuICAgICAgICBpZiAoIXJzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgciA9IG5ldyBnZW9tZXRyeS5SYXkocmF5Lm8ueCwgcmF5Lm8ueSwgcmF5Lm8ueiwgcmF5LmQueCwgcmF5LmQueSwgcmF5LmQueik7XG4gICAgICAgIGNvbnN0IGhpZGRlbiA9IENDT2JqZWN0LkZsYWdzLkRvbnRTYXZlIHwgQ0NPYmplY3QuRmxhZ3MuSGlkZUluSGllcmFyY2h5O1xuICAgICAgICBsZXQgYmVzdCA9IEluZmluaXR5O1xuICAgICAgICBjb25zdCBvcHRzOiBhbnkgPSB7IG1vZGU6IGdlb21ldHJ5LkVSYXljYXN0TW9kZS5DTE9TRVNULCBkaXN0YW5jZTogSW5maW5pdHksIGRvdWJsZVNpZGVkOiBmYWxzZSB9O1xuICAgICAgICBmb3IgKGNvbnN0IG1vZGVsIG9mIHJzLm1vZGVscykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG1vZGVsLm5vZGU7XG4gICAgICAgICAgICBpZiAoIW1vZGVsLmVuYWJsZWQgfHwgIW5vZGUgfHwgIW5vZGUuYWN0aXZlSW5IaWVyYXJjaHkgfHwgbm9kZS5zY2VuZSAhPT0gc2NlbmUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKGhhc0ZsYWdzKG5vZGUsIGhpZGRlbikpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1vZGVsLndvcmxkQm91bmRzICYmICFnZW9tZXRyeS5pbnRlcnNlY3QucmF5QUFCQihyLCBtb2RlbC53b3JsZEJvdW5kcykpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgZCA9IGdlb21ldHJ5LmludGVyc2VjdC5yYXlNb2RlbChyLCBtb2RlbCwgb3B0cyk7XG4gICAgICAgICAgICBpZiAoZCA+IDAgJiYgZCA8IGJlc3QpIGJlc3QgPSBkO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNGaW5pdGUoYmVzdCkpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gc2NhbGVBbmRBZGQodjMoKSwgcmF5Lm8sIHJheS5kLCBiZXN0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIG5vdGUoYHJheWNhc3Q6ICR7ZX1gKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYXNGbGFncyhub2RlOiBhbnksIGZsYWdzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBuID0gbm9kZTsgbjsgbiA9IG4ucGFyZW50KSBpZiAoKG4uX29iakZsYWdzICYgZmxhZ3MpICE9PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGRyYXdEb3duKGNhbTogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlciwgZXY6IGFueSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNvbXAgPSBkcmF3Q29tcCgpO1xuICAgIGlmICghY29tcCkgcmV0dXJuIHRydWU7XG4gICAgUy5kaWFnLmJsb2NrZWQrKztcbiAgICBjb25zdCBoaXQgPSBoaXRUZXN0KGNhbSwgeCwgeSwgeyBoYW5kbGVzOiBmYWxzZSwgb3V0c2lkZUNvbnRleHQ6IHRydWUgfSk7XG4gICAgaWYgKFMuZHJhd2luZykge1xuICAgICAgICAvLyBDbGlja2luZyB0aGUgb3RoZXIgZW5kIG9mIHRoZSBzcGxpbmUgYmVpbmcgZHJhd24gY2xvc2VzIGl0LlxuICAgICAgICBjb25zdCBkID0gUy5kcmF3aW5nO1xuICAgICAgICBjb25zdCBzID0gZC5jb21wLnNwbGluZXNbZC5zcGxpbmVdO1xuICAgICAgICBpZiAoaGl0Py5raW5kID09PSAna25vdCcgJiYgaGl0LnJlZi5jb21wID09PSBkLmNvbXAgJiYgaGl0LnJlZi5zcGxpbmUgPT09IGQuc3BsaW5lICYmIHMgJiYgcy5rbm90cy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBkLmVuZCA9PT0gJ2VuZCcgPyAwIDogcy5rbm90cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaWYgKGhpdC5yZWYua25vdCA9PT0gb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZWNvcmRFZGl0KFtkLmNvbXBdLCAoKSA9PiBzZXRDbG9zZWQocywgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgIFMuZHJhd2luZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgUy5zZWxlY3Rpb24uc2V0KFt7IGNvbXA6IGQuY29tcCwgc3BsaW5lOiBkLnNwbGluZSwga25vdDogb3RoZXIsIHBhcnQ6ICdrbm90JyB9XSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaGl0Py5raW5kID09PSAna25vdCcpIHtcbiAgICAgICAgLy8gQ2xpY2tpbmcgdGhlIGVuZCBvZiBhbiBvcGVuIHNwbGluZSBjb250aW51ZXMgaXQuXG4gICAgICAgIGNvbnN0IHMgPSBoaXQucmVmLmNvbXAuc3BsaW5lc1toaXQucmVmLnNwbGluZV07XG4gICAgICAgIGlmIChzICYmIGlzRW5kS25vdChzLCBoaXQucmVmLmtub3QpKSB7XG4gICAgICAgICAgICBTLmRyYXdpbmcgPSB7IGNvbXA6IGhpdC5yZWYuY29tcCwgc3BsaW5lOiBoaXQucmVmLnNwbGluZSwgZW5kOiBoaXQucmVmLmtub3QgPT09IDAgJiYgcy5rbm90cy5sZW5ndGggPiAxID8gJ3N0YXJ0JyA6ICdlbmQnIH07XG4gICAgICAgICAgICBTLnNlbGVjdGlvbi5zZXQoW2hpdC5yZWZdKTtcbiAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaGl0Py5raW5kID09PSAnY3VydmUnKSB7XG4gICAgICAgIGluc2VydE9uQ3VydmUoaGl0LmNvbXAsIGhpdC5zcGxpbmUsIGhpdC5jdXJ2ZSwgaGl0LnQpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHBsYWNlID0gcGxhY2VtZW50KGNhbSwgeCwgeSwgY29tcCk7XG4gICAgaWYgKCFwbGFjZSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHRhcmdldCA9IFMuZHJhd2luZyA/IFMuZHJhd2luZy5jb21wIDogY29tcDtcbiAgICBjb25zdCBzZXNzaW9uID0gbmV3IEVkaXRTZXNzaW9uKFt0YXJnZXRdKTtcbiAgICAvLyBUaGUga25vdCBleGlzdHMgb25jZSB0aGUgcmVjb3JkaW5nIGlzIG9wZW47IHRoZSBkcmFnIGFuZCBzZWxlY3Rpb24gZm9sbG93IGl0IHRoZW4uXG4gICAgY29uc3QgYTogRXh0cmFjdDxBY3RpdmUsIHsga2luZDogJ2RyYXcnIH0+ID0ge1xuICAgICAgICBraW5kOiAnZHJhdycsXG4gICAgICAgIGNvbXA6IHRhcmdldCxcbiAgICAgICAgc3BsaW5lOiAtMSxcbiAgICAgICAga25vdDogLTEsXG4gICAgICAgIHBhcnQ6ICdvdXQnLFxuICAgICAgICB4MDogeCxcbiAgICAgICAgeTA6IHksXG4gICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgc2Vzc2lvbixcbiAgICAgICAgbm9ybWFsOiBwbGFjZS5ub3JtYWwsXG4gICAgfTtcbiAgICBhY3RpdmUgPSBhO1xuICAgIHNlc3Npb24uYXBwbHkoKCkgPT4ge1xuICAgICAgICBpZiAoIVMuZHJhd2luZykge1xuICAgICAgICAgICAgLy8gQSBuZXcgc3BsaW5lOiByZXVzZSBhbiBlbXB0eSBvbmUgaWYgdGhlcmUgaXMgb25lLlxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGFyZ2V0LnNwbGluZXMuZmluZEluZGV4KChzOiBhbnkpID0+IHMua25vdHMubGVuZ3RoID09PSAwKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc3BsaW5lcy5wdXNoKGZhY3Rvcnkuc3BsaW5lKCkpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gdGFyZ2V0LnNwbGluZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFMuZHJhd2luZyA9IHsgY29tcDogdGFyZ2V0LCBzcGxpbmU6IGluZGV4LCBlbmQ6ICdlbmQnIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZCA9IFMuZHJhd2luZyE7XG4gICAgICAgIGNvbnN0IHMgPSB0YXJnZXQuc3BsaW5lc1tkLnNwbGluZV07XG4gICAgICAgIGNvbnN0IGs6IGFueSA9IGZhY3Rvcnkua25vdCgpO1xuICAgICAgICBjb3B5KGsucG9zaXRpb24sIHRvTG9jYWwodGFyZ2V0LCBwbGFjZS53b3JsZCkpO1xuICAgICAgICBrLm1vZGUgPSBTLnNldHRpbmdzLmRlZmF1bHRNb2RlO1xuICAgICAgICAvLyBPcmllbnQgdG93YXJkcyB0aGUgdHJhdmVsIGRpcmVjdGlvbiwgdXAgYWxvbmcgdGhlIGRyYXdpbmcgcGxhbmUgbm9ybWFsLlxuICAgICAgICBjb25zdCBwcmV2SW5kZXggPSBkLmVuZCA9PT0gJ2VuZCcgPyBzLmtub3RzLmxlbmd0aCAtIDEgOiAwO1xuICAgICAgICBjb25zdCBsb2NhbE5vcm1hbCA9IG5vcm1hbGl6ZSh2MygpLCBkaXJUb0xvY2FsU2FmZSh0YXJnZXQsIHBsYWNlLm5vcm1hbCkpO1xuICAgICAgICBpZiAocy5rbm90cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXYgPSBzLmtub3RzW3ByZXZJbmRleF0ucG9zaXRpb247XG4gICAgICAgICAgICBjb25zdCBkaXIgPSBkLmVuZCA9PT0gJ2VuZCcgPyBzdWIodjMoKSwgay5wb3NpdGlvbiwgcHJldikgOiBzdWIodjMoKSwgcHJldiwgay5wb3NpdGlvbik7XG4gICAgICAgICAgICBrbm90Um90YXRpb24oay5yb3RhdGlvbiwgZGlyLCBsb2NhbE5vcm1hbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrbm90Um90YXRpb24oay5yb3RhdGlvbiwgdjMoKSwgbG9jYWxOb3JtYWwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZC5lbmQgPT09ICdlbmQnID8gcy5rbm90cy5sZW5ndGggOiAwO1xuICAgICAgICBjb250YWluZXJJbnNlcnRLbm90KHRhcmdldCwgZC5zcGxpbmUsIGluZGV4LCBrKTtcbiAgICAgICAgYS5zcGxpbmUgPSBkLnNwbGluZTtcbiAgICAgICAgYS5rbm90ID0gaW5kZXg7XG4gICAgICAgIGEucGFydCA9IGQuZW5kID09PSAnZW5kJyA/ICdvdXQnIDogJ2luJztcbiAgICAgICAgUy5zZWxlY3Rpb24uc2V0KFt7IGNvbXA6IHRhcmdldCwgc3BsaW5lOiBkLnNwbGluZSwga25vdDogaW5kZXgsIHBhcnQ6ICdrbm90JyB9XSk7XG4gICAgICAgIHNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICB9KTtcbiAgICB2b2lkIGV2O1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZGlyVG9Mb2NhbFNhZmUoY29tcDogYW55LCB3b3JsZDogVjMpOiBWMyB7XG4gICAgY29uc3QgbyA9IHRvTG9jYWwoY29tcCwgdjMoKSk7XG4gICAgY29uc3QgcCA9IHRvTG9jYWwoY29tcCwgd29ybGQpO1xuICAgIHJldHVybiBzdWIodjMoKSwgcCwgbyk7XG59XG5cbmZ1bmN0aW9uIGRyYXdEcmFnKGNhbTogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlciwgYTogRXh0cmFjdDxBY3RpdmUsIHsga2luZDogJ2RyYXcnIH0+KTogdm9pZCB7XG4gICAgaWYgKGEua25vdCA8IDApIHJldHVybjtcbiAgICBpZiAoIWEuZHJhZ2dpbmcgJiYgTWF0aC5oeXBvdCh4IC0gYS54MCwgeSAtIGEueTApIDwgRFJBR19QWCkgcmV0dXJuO1xuICAgIGEuZHJhZ2dpbmcgPSB0cnVlO1xuICAgIGNvbnN0IHBvcyA9IGtub3RXb3JsZFBvc2l0aW9uKGEuY29tcCwgYS5zcGxpbmUsIGEua25vdCk7XG4gICAgbGV0IGhpdCA9IHJheVBsYW5lKHNjcmVlblJheShjYW0sIHgsIHkpLCBwb3MsIGEubm9ybWFsKTtcbiAgICBpZiAoIWhpdCkgaGl0ID0gcmF5UGxhbmUoc2NyZWVuUmF5KGNhbSwgeCwgeSksIHBvcywgY2FtZXJhRm9yd2FyZChjYW0pLCB0cnVlKTtcbiAgICBpZiAoIWhpdCkgcmV0dXJuO1xuICAgIGNvbnN0IGVuZCA9IGhpdDtcbiAgICBhLnNlc3Npb24uYXBwbHkoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gYS5jb21wLnNwbGluZXNbYS5zcGxpbmVdO1xuICAgICAgICBpZiAoIXMgfHwgIXMua25vdHNbYS5rbm90XSkgcmV0dXJuO1xuICAgICAgICAvLyBEcmFnZ2luZyB3aGlsZSBwbGFjaW5nIG1ha2VzIGEgQmV6aWVyIGtub3Qgd2l0aCBtaXJyb3JlZCB0YW5nZW50cyAoVW5pdHkpLlxuICAgICAgICBpZiAocy5rbm90c1thLmtub3RdLm1vZGUgIT09IFRhbmdlbnRNb2RlLk1pcnJvcmVkKSBzZXRUYW5nZW50TW9kZShzLCBhLmtub3QsIFRhbmdlbnRNb2RlLk1pcnJvcmVkKTtcbiAgICAgICAgc2V0VGFuZ2VudFdvcmxkKGEuY29tcCwgYS5zcGxpbmUsIGEua25vdCwgYS5wYXJ0LCBlbmQpO1xuICAgIH0pO1xufVxuXG4vKiogUHJldmlldyBvZiB0aGUgRHJhdyB0b29sOiB0aGUgbmV4dCBjdXJ2ZSBhbmQgd2hlcmUgdGhlIGtub3Qgd291bGQgZ28uICovXG5mdW5jdGlvbiBkcmF3UHJldmlldyhfY2FtOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIVMuY29udGV4dCB8fCBTLnRvb2wgIT09ICdkcmF3JykgcmV0dXJuO1xuICAgIGNvbnN0IGggPSBTLmhvdmVyO1xuICAgIGlmIChoPy5raW5kID09PSAnY3VydmUnKSB7XG4gICAgICAgIEQuZGlzYyhoLndvcmxkLCA1LCBELkNvbG9ycy5pbnNlcnQpO1xuICAgICAgICBELmNpcmNsZShoLndvcmxkLCA3LCBELkNvbG9ycy5pbnNlcnQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChoPy5raW5kID09PSAna25vdCcgJiYgUy5kcmF3aW5nKSB7XG4gICAgICAgIGNvbnN0IGQgPSBTLmRyYXdpbmc7XG4gICAgICAgIGNvbnN0IHMgPSBkLmNvbXAuc3BsaW5lc1tkLnNwbGluZV07XG4gICAgICAgIGNvbnN0IG90aGVyID0gZC5lbmQgPT09ICdlbmQnID8gMCA6IChzPy5rbm90cy5sZW5ndGggPz8gMSkgLSAxO1xuICAgICAgICBpZiAocyAmJiBoLnJlZi5jb21wID09PSBkLmNvbXAgJiYgaC5yZWYuc3BsaW5lID09PSBkLnNwbGluZSAmJiBoLnJlZi5rbm90ID09PSBvdGhlciAmJiBzLmtub3RzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBELmNpcmNsZShrbm90V29ybGRQb3NpdGlvbihkLmNvbXAsIGQuc3BsaW5lLCBvdGhlciksIDEwLCBELkNvbG9ycy5pbnNlcnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghUy5wcmV2aWV3IHx8IGFjdGl2ZSkgcmV0dXJuO1xuICAgIGNvbnN0IHAgPSBTLnByZXZpZXc7XG4gICAgRC5kaXNjKHAsIDQsIEQuQ29sb3JzLnByZXZpZXcpO1xuICAgIGNvbnN0IGQgPSBTLmRyYXdpbmc7XG4gICAgaWYgKCFkKSByZXR1cm47XG4gICAgY29uc3QgcyA9IGQuY29tcC5zcGxpbmVzW2Quc3BsaW5lXTtcbiAgICBpZiAoIXMgfHwgIXMua25vdHMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgayA9IGQuZW5kID09PSAnZW5kJyA/IHMua25vdHMubGVuZ3RoIC0gMSA6IDA7XG4gICAgY29uc3Qga25vdCA9IHMua25vdHNba107XG4gICAgY29uc3QgZnJvbSA9IGtub3RXb3JsZFBvc2l0aW9uKGQuY29tcCwgZC5zcGxpbmUsIGspO1xuICAgIGNvbnN0IGhhbmRsZVZlYyA9IGQuZW5kID09PSAnZW5kJyA/IHRhbmdlbnRPdXRWZWModjMoKSwga25vdCkgOiB0YW5nZW50SW5WZWModjMoKSwga25vdCk7XG4gICAgY29uc3QgYzogQ3VydmUgPSBjdXJ2ZSgpO1xuICAgIGNvcHkoYy5wMCwgZnJvbSk7XG4gICAgYWRkKGMucDEsIGZyb20sIGRpclRvV29ybGQoZC5jb21wLCBoYW5kbGVWZWMpKTtcbiAgICBpZiAobGVuU3Eoc3ViKHYzKCksIGMucDEsIGMucDApKSA8IDFlLTEyKSB7XG4gICAgICAgIC8vIExpbmVhciAvIEF1dG9TbW9vdGggZW5kOiBhIHRoaXJkIG9mIHRoZSB3YXkuXG4gICAgICAgIHNjYWxlQW5kQWRkKGMucDEsIGZyb20sIHN1Yih2MygpLCBwLCBmcm9tKSwgMSAvIDMpO1xuICAgIH1cbiAgICBzY2FsZUFuZEFkZChjLnAyLCBwLCBzdWIodjMoKSwgZnJvbSwgcCksIDEgLyAzKTtcbiAgICBjb3B5KGMucDMsIHApO1xuICAgIGNvbnN0IG4gPSAyNDtcbiAgICBsZXQgcHJldiA9IGNvcHkodjMoKSwgZnJvbSk7XG4gICAgY29uc3QgY3VyID0gdjMoKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBuOyBpKyspIHtcbiAgICAgICAgZXZhbFBvc2l0aW9uKGN1ciwgYywgaSAvIG4pO1xuICAgICAgICBELmxpbmUocHJldiwgY3VyLCBELkNvbG9ycy5wcmV2aWV3KTtcbiAgICAgICAgY29weShwcmV2LCBjdXIpO1xuICAgIH1cbn1cblxuc2V0UHJldmlld0RyYXdlcihkcmF3UHJldmlldyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBrZXlib2FyZFxuXG5mdW5jdGlvbiBwbGFpbktleShldjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFldi5jdHJsS2V5ICYmICFldi5tZXRhS2V5ICYmICFldi5hbHRLZXkgJiYgIWV2LnNoaWZ0S2V5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25LZXlEb3duKGV2OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoIWNhbkVkaXQoKSB8fCAhUy5jb250ZXh0KSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBrZXkgPSBTdHJpbmcoZXYua2V5IHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgIHRyeSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdlc2NhcGUnOlxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKFMudG9vbCA9PT0gJ2RyYXcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChTLmRyYXdpbmcpIFMuZHJhd2luZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugc2V0VG9vbCgnc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChTLnNlbGVjdGlvbi5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29udGV4dChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjYXNlICdlbnRlcic6XG4gICAgICAgICAgICAgICAgaWYgKFMudG9vbCA9PT0gJ2RyYXcnICYmIFMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICBTLmRyYXdpbmcgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgICAgY2FzZSAnYmFja3NwYWNlJzpcbiAgICAgICAgICAgICAgICBpZiAoIVMuc2VsZWN0aW9uLnNpemUpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIGRlbGV0ZUtleSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgIGlmICghcGxhaW5LZXkoZXYpIHx8ICFTLnNlbGVjdGlvbi5zaXplKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjeWNsZU1vZGVTZWxlY3RlZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgICAgICAgIGlmICghcGxhaW5LZXkoZXYpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBTLnNldHRpbmdzLm9yaWVudGF0aW9uID0gUy5zZXR0aW5ncy5vcmllbnRhdGlvbiA9PT0gJ2dsb2JhbCcgPyAnbG9jYWwnIDogUy5zZXR0aW5ncy5vcmllbnRhdGlvbiA9PT0gJ2xvY2FsJyA/ICdlbGVtZW50JyA6ICdnbG9iYWwnO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICBpZiAoIShldi5jdHJsS2V5IHx8IGV2Lm1ldGFLZXkpIHx8IGV2LmFsdEtleSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgUy5zZWxlY3RBbGxLZXlBdCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgaWYgKFMudG9vbCA9PT0gJ2RyYXcnICYmIGV2LnNoaWZ0S2V5ICYmICFldi5jdHJsS2V5ICYmIFMubGFzdFRhcmdldHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBVbml0eTogU2hpZnQrUyBjeWNsZXMgdGhlIGNvbnRhaW5lciB0aGUgRHJhdyB0b29sIGFkZHMgdG8uXG4gICAgICAgICAgICAgICAgICAgIFMuZHJhd1RhcmdldCA9IChTLmRyYXdUYXJnZXQgKyAxKSAlIFMubGFzdFRhcmdldHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBTLmRyYXdpbmcgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIG5vdGUoYGtleWRvd246ICR7KGUgYXMgRXJyb3IpPy5zdGFjayB8fCBlfWApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uS2V5VXAoX2V2OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqIERlbGV0ZXMgdGhlIHNlbGVjdGlvbiBvbmNlIHBlciBrZXkgcHJlc3MgKHRoZSBrZXkgbWF5IGFycml2ZSB0d2ljZSkuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlS2V5KCk6IHZvaWQge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgaWYgKG5vdyAtIFMuZGVsZXRlS2V5QXQgPCAxNTApIHJldHVybjtcbiAgICBTLmRlbGV0ZUtleUF0ID0gbm93O1xuICAgIGRlbGV0ZVNlbGVjdGlvbigpO1xufVxuIiwgIi8qKlxuICogS2VlcHMgZWRpdG9yIHNob3J0Y3V0cyBmcm9tIGFjdGluZyBvbiB0aGUgbm9kZSB3aGlsZSBrbm90cyBhcmUgYmVpbmdcbiAqIGVkaXRlZDogRGVsZXRlIHJlbW92ZXMgdGhlIHNlbGVjdGVkIGtub3RzIChub3QgdGhlIG5vZGUpLCBDdHJsK0Egc2VsZWN0c1xuICogYWxsIGtub3RzIChub3QgYWxsIG5vZGVzKS5cbiAqXG4gKiBUaGUga2V5cyByZWFjaCB0aGUgZWRpdG9yJ3Mgc2hvcnRjdXQgc3lzdGVtIGFzIHdlbGwgYXMgdGhlIHNjZW5lLCBzbyB0aGVcbiAqIHNjZW5lIGZhY2FkZSdzIHJlbW92ZU5vZGUgLyBzZWxlY3RBbGxOb2RlcyBhcmUgd3JhcHBlZDogcmlnaHQgYWZ0ZXIgc3VjaCBhXG4gKiBrZXkgd2VudCB0aHJvdWdoIHRoZSBTY2VuZSB2aWV3IGluIHRoZSBlZGl0IGNvbnRleHQsIHRoZXkgZG8gbm90aGluZyBmb3JcbiAqIHRoZSBlZGl0ZWQgbm9kZXMuXG4gKi9cbmltcG9ydCB7IGNjZSB9IGZyb20gJy4vZW52JztcbmltcG9ydCB7IFMsIG5vdGUgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IGRlbGV0ZUtleSwgY2FuY2VsQWN0aXZlLCBpc0RyYWdnaW5nIH0gZnJvbSAnLi9pbnB1dCc7XG5cbmNvbnN0IEtFWV9XSU5ET1dfTVMgPSA4MDA7XG5jb25zdCB1bmRvOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xubGV0IGluc3RhbGxlZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBpc1R5cGluZyhlOiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3QgdCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBjb25zdCB0YWcgPSB0Py50YWdOYW1lO1xuICAgIHJldHVybiB0YWcgPT09ICdJTlBVVCcgfHwgdGFnID09PSAnVEVYVEFSRUEnIHx8ICEhdD8uaXNDb250ZW50RWRpdGFibGU7XG59XG5cbmZ1bmN0aW9uIG9uS2V5RG93bkNhcHR1cmUoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghUy5wcmltYXJ5IHx8ICFTLmNvbnRleHQgfHwgaXNUeXBpbmcoZSkpIHJldHVybjtcbiAgICBjb25zdCBrID0gZS5rZXk7XG4gICAgaWYgKChrID09PSAnRGVsZXRlJyB8fCBrID09PSAnQmFja3NwYWNlJykgJiYgUy5zZWxlY3Rpb24uc2l6ZSAmJiAhZS5jdHJsS2V5ICYmICFlLm1ldGFLZXkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICBkZWxldGVLZXkoKTtcbiAgICB9IGVsc2UgaWYgKChrID09PSAnYScgfHwgayA9PT0gJ0EnKSAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkgJiYgUy5sYXN0VGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgUy5zZWxlY3RBbGxLZXlBdCA9IERhdGUubm93KCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbkJsdXIoKTogdm9pZCB7XG4gICAgaWYgKGlzRHJhZ2dpbmcoKSkgY2FuY2VsQWN0aXZlKCk7XG59XG5cbmZ1bmN0aW9uIGludm9sdmVzRWRpdGVkKG9wdGlvbnM6IGFueSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlkcyA9IG9wdGlvbnM/LnV1aWQ7XG4gICAgY29uc3QgbGlzdDogc3RyaW5nW10gPSBBcnJheS5pc0FycmF5KGlkcykgPyBpZHMgOiB0eXBlb2YgaWRzID09PSAnc3RyaW5nJyA/IFtpZHNdIDogW107XG4gICAgY29uc3QgZWRpdGVkID0gbmV3IFNldChTLmxhc3RUYXJnZXRzLm1hcCgoYykgPT4gYy5ub2RlLnV1aWQpKTtcbiAgICByZXR1cm4gbGlzdC5zb21lKChpZCkgPT4gZWRpdGVkLmhhcyhpZCkpIHx8IGxpc3QubGVuZ3RoID09PSAwO1xufVxuXG5mdW5jdGlvbiB3cmFwKHRhcmdldDogYW55LCBuYW1lOiBzdHJpbmcsIGd1YXJkOiAoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkgPT4gYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IG9yaWcgPSB0YXJnZXQ/LltuYW1lXTtcbiAgICBpZiAodHlwZW9mIG9yaWcgIT09ICdmdW5jdGlvbicgfHwgb3JpZy5fX3NwbGluZXNHdWFyZCkgcmV0dXJuO1xuICAgIGNvbnN0IHdyYXBwZWQgPSBmdW5jdGlvbiAodGhpczogYW55LCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGd1YXJkKHRoaXMsIGFyZ3MpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBub3RlKGBndWFyZCAke25hbWV9OiAke2V9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWcuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfTtcbiAgICAod3JhcHBlZCBhcyBhbnkpLl9fc3BsaW5lc0d1YXJkID0gdHJ1ZTtcbiAgICB0YXJnZXRbbmFtZV0gPSB3cmFwcGVkO1xuICAgIHVuZG8ucHVzaCgoKSA9PiB7XG4gICAgICAgIGlmICh0YXJnZXRbbmFtZV0gPT09IHdyYXBwZWQpIHRhcmdldFtuYW1lXSA9IG9yaWc7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsR3VhcmRzKCk6IHZvaWQge1xuICAgIGlmIChpbnN0YWxsZWQpIHJldHVybjtcbiAgICBpbnN0YWxsZWQgPSB0cnVlO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duQ2FwdHVyZSwgdHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbkJsdXIpO1xuICAgIHVuZG8ucHVzaCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duQ2FwdHVyZSwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgb25CbHVyKTtcbiAgICB9KTtcbiAgICBjb25zdCBmYWNhZGUgPSBjY2UoKS5TY2VuZUZhY2FkZU1hbmFnZXI7XG4gICAgY29uc3QgdGFyZ2V0ID0gdHlwZW9mIGZhY2FkZSA9PT0gJ2Z1bmN0aW9uJyA/IGZhY2FkZS5wcm90b3R5cGUgOiBmYWNhZGU7XG4gICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICB3cmFwKHRhcmdldCwgJ3JlbW92ZU5vZGUnLCAoX3NlbGYsIGFyZ3MpID0+IHtcbiAgICAgICAgaWYgKFMuY29udGV4dCAmJiBEYXRlLm5vdygpIC0gUy5kZWxldGVLZXlBdCA8IEtFWV9XSU5ET1dfTVMgJiYgaW52b2x2ZXNFZGl0ZWQoYXJnc1swXSkpIHtcbiAgICAgICAgICAgIG5vdGUoJ0RlbGV0ZSB3ZW50IHRvIHRoZSBzZWxlY3RlZCBrbm90cywgbm90IHRoZSBub2RlJyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgd3JhcCh0YXJnZXQsICdzZWxlY3RBbGxOb2RlcycsICgpID0+IFMuY29udGV4dCAmJiBEYXRlLm5vdygpIC0gUy5zZWxlY3RBbGxLZXlBdCA8IEtFWV9XSU5ET1dfTVMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pbnN0YWxsR3VhcmRzKCk6IHZvaWQge1xuICAgIHdoaWxlICh1bmRvLmxlbmd0aCkgdW5kby5wb3AoKSEoKTtcbiAgICBpbnN0YWxsZWQgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1YXJkc0luZm8oKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4ge1xuICAgIGNvbnN0IGZhY2FkZSA9IGNjZSgpLlNjZW5lRmFjYWRlTWFuYWdlcjtcbiAgICBjb25zdCB0YXJnZXQgPSB0eXBlb2YgZmFjYWRlID09PSAnZnVuY3Rpb24nID8gZmFjYWRlLnByb3RvdHlwZSA6IGZhY2FkZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBpbnN0YWxsZWQsXG4gICAgICAgIGZhY2FkZVR5cGU6IHR5cGVvZiBmYWNhZGUsXG4gICAgICAgIHJlbW92ZU5vZGVHdWFyZGVkOiAhIXRhcmdldD8ucmVtb3ZlTm9kZT8uX19zcGxpbmVzR3VhcmQsXG4gICAgICAgIHNlbGVjdEFsbEd1YXJkZWQ6ICEhdGFyZ2V0Py5zZWxlY3RBbGxOb2Rlcz8uX19zcGxpbmVzR3VhcmQsXG4gICAgfTtcbn1cbiIsICIvKipcbiAqIFNjZW5lLXByb2Nlc3MgaGFsZiBvZiB0aGUgU3BsaW5lcyBleHRlbnNpb246IGRyYXdzIHNwbGluZXMgaW4gdGhlIFNjZW5lXG4gKiB2aWV3LCBlZGl0cyB0aGVtIHdpdGggdGhlIG1vdXNlLCBhbmQgc2VydmVzIHRoZSBwYW5lbCBhbmQgSW5zcGVjdG9yLlxuICpcbiAqIE1ldGhvZHMgYXJlIGNhbGxlZCB3aXRoIGV4ZWN1dGUtc2NlbmUtc2NyaXB0LCB3aGljaCBvbmx5IHJlYWNoZXMgdGhlIGVkaXRcbiAqIHNjZW5lJ3MgcHJvY2VzczsgdGhhdCBwcm9jZXNzIG1hcmtzIGl0c2VsZiBwcmltYXJ5LiBQbGF5LWluLUVkaXRvcidzXG4gKiBwcm9jZXNzIGxvYWRzIHRoaXMgc2NyaXB0IHRvbyBidXQgb25seSBkcmF3cy5cbiAqL1xuaW1wb3J0IHsgY2MsIGNjZSwgZmluZENvbXBvbmVudCwgZmluZE5vZGUsIHJ1bnRpbWVSZWFkeSwgcmVwYWludCwgYWxsQ29udGFpbmVycyB9IGZyb20gJy4vZW52JztcbmltcG9ydCB7IFMsIERFRkFVTFRfU0VUVElOR1MsIG5vdGUsIGJ1bXBTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgZHJhd0ZyYW1lIH0gZnJvbSAnLi9yZW5kZXInO1xuaW1wb3J0IHsgb25Nb3VzZURvd24sIG9uTW91c2VNb3ZlLCBvbk1vdXNlVXAsIG9uRGJsQ2xpY2ssIG9uS2V5RG93biwgb25LZXlVcCwgUFJJT1JJVFksIGNhbmNlbEFjdGl2ZSB9IGZyb20gJy4vaW5wdXQnO1xuaW1wb3J0IHsgaW5zdGFsbEd1YXJkcywgdW5pbnN0YWxsR3VhcmRzLCBndWFyZHNJbmZvIH0gZnJvbSAnLi9ndWFyZHMnO1xuaW1wb3J0IHsgcGFuZWxTdGF0ZSwgbWF5YmVCcm9hZGNhc3QsIHNldENvbnRleHQsIHNldFRvb2wsIHVwZGF0ZVRhcmdldHMgfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHsgZXZlbnRDb29yZE1vZGUsIHJlbW92ZU92ZXJsYXksIHNjZW5lQ2FtZXJhIH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7XG4gICAgZGVsZXRlU2VsZWN0aW9uLCBzZXRNb2RlU2VsZWN0ZWQsIGN5Y2xlTW9kZVNlbGVjdGVkLCBsaW5rU2VsZWN0ZWQsIHVubGlua1NlbGVjdGVkLCBzcGxpdFNlbGVjdGVkLCBqb2luU2VsZWN0ZWQsXG4gICAgcmV2ZXJzZVNlbGVjdGVkLCBzZXRDbG9zZWRTZWxlY3RlZCwgc2VsZWN0QWxsLCBjbGVhclNlbGVjdGlvbiwgc2V0RWxlbWVudFByb3BzLCBjb250YWluZXJJbmZvLCBlZGl0S25vdCwgc3BsaW5lQWN0aW9uLFxuICAgIGNyZWF0ZVNwbGluZU5vZGUsIEVsZW1lbnRQcm9wcyxcbn0gZnJvbSAnLi9vcHMnO1xuaW1wb3J0IHsgcmVjb3JkRWRpdCwgYWZ0ZXJFZGl0IH0gZnJvbSAnLi91bmRvJztcblxuY29uc3QgUEtHID0gJ3NwbGluZXMnO1xuXG5sZXQgaG9va2VkID0gZmFsc2U7XG5sZXQgb3BIb29rZWQgPSBmYWxzZTtcblxuZnVuY3Rpb24gb25CZWZvcmVDb21taXQoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgICAgZHJhd0ZyYW1lKCk7XG4gICAgICAgIG1heWJlQnJvYWRjYXN0KCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBub3RlKGBkcmF3OiAkeyhlIGFzIEVycm9yKT8uc3RhY2sgfHwgZX1gKTtcbiAgICB9XG59XG5cbmNvbnN0IGxpc3RlbmVyczogW3N0cmluZywgKGV2OiBhbnkpID0+IGJvb2xlYW5dW10gPSBbXG4gICAgWydtb3VzZWRvd24nLCBvbk1vdXNlRG93bl0sXG4gICAgWydtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZV0sXG4gICAgWydtb3VzZXVwJywgb25Nb3VzZVVwXSxcbiAgICBbJ2RibGNsaWNrJywgb25EYmxDbGlja10sXG4gICAgWydrZXlkb3duJywgb25LZXlEb3duXSxcbiAgICBbJ2tleXVwJywgb25LZXlVcF0sXG5dO1xuXG5mdW5jdGlvbiBob29rKCk6IHZvaWQge1xuICAgIGlmICghaG9va2VkKSB7XG4gICAgICAgIGNvbnN0IHsgZGlyZWN0b3IsIERpcmVjdG9yIH0gPSBjYygpO1xuICAgICAgICBkaXJlY3Rvci5vbihEaXJlY3Rvci5FVkVOVF9CRUZPUkVfQ09NTUlULCBvbkJlZm9yZUNvbW1pdCk7XG4gICAgICAgIGhvb2tlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmICghb3BIb29rZWQpIHtcbiAgICAgICAgY29uc3Qgb3AgPSBjY2UoKS5PcGVyYXRpb247XG4gICAgICAgIGlmIChvcD8uYWRkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW3R5cGUsIGZuXSBvZiBsaXN0ZW5lcnMpIG9wLmFkZExpc3RlbmVyKHR5cGUsIGZuLCBQUklPUklUWSk7XG4gICAgICAgICAgICBvcEhvb2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5zdGFsbEd1YXJkcygpO1xuICAgIFMuaG9va2VkID0gaG9va2VkICYmIG9wSG9va2VkO1xufVxuXG5mdW5jdGlvbiB1bmhvb2soKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGhvb2tlZCkge1xuICAgICAgICAgICAgY29uc3QgeyBkaXJlY3RvciwgRGlyZWN0b3IgfSA9IGNjKCk7XG4gICAgICAgICAgICBkaXJlY3Rvci5vZmYoRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0NPTU1JVCwgb25CZWZvcmVDb21taXQpO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIGVkaXRvciBzaHV0dGluZyBkb3duXG4gICAgfVxuICAgIGhvb2tlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG9wID0gY2NlKCkuT3BlcmF0aW9uO1xuICAgICAgICBpZiAob3BIb29rZWQgJiYgb3A/LnJlbW92ZUxpc3RlbmVyKSBmb3IgKGNvbnN0IFt0eXBlLCBmbl0gb2YgbGlzdGVuZXJzKSBvcC5yZW1vdmVMaXN0ZW5lcih0eXBlLCBmbik7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIGVkaXRvciBzaHV0dGluZyBkb3duXG4gICAgfVxuICAgIG9wSG9va2VkID0gZmFsc2U7XG4gICAgdW5pbnN0YWxsR3VhcmRzKCk7XG59XG5cbmZ1bmN0aW9uIG1hcmtQcmltYXJ5KCk6IHZvaWQge1xuICAgIGlmICghUy5wcmltYXJ5KSB7XG4gICAgICAgIFMucHJpbWFyeSA9IHRydWU7XG4gICAgICAgIGJ1bXBTdGF0ZSgpO1xuICAgIH1cbiAgICBob29rKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzYXZlZCA9IGF3YWl0IEVkaXRvci5Qcm9maWxlLmdldENvbmZpZyhQS0csICdzZXR0aW5ncycpO1xuICAgICAgICBpZiAoc2F2ZWQgJiYgdHlwZW9mIHNhdmVkID09PSAnb2JqZWN0JykgUy5zZXR0aW5ncyA9IHsgLi4uREVGQVVMVF9TRVRUSU5HUywgLi4uc2F2ZWQgfTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gZGVmYXVsdHNcbiAgICB9XG4gICAgcmVwYWludCgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzYXZlU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgRWRpdG9yLlByb2ZpbGUuc2V0Q29uZmlnKFBLRywgJ3NldHRpbmdzJywgeyAuLi5TLnNldHRpbmdzIH0sICdnbG9iYWwnKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gbm90IHBlcnNpc3RlZFxuICAgIH1cbn1cblxuZnVuY3Rpb24gYnJvYWRjYXN0Tm93KCk6IGFueSB7XG4gICAgdXBkYXRlVGFyZ2V0cygpO1xuICAgIG1heWJlQnJvYWRjYXN0KHRydWUpO1xuICAgIHJlcGFpbnQoKTtcbiAgICByZXR1cm4gcGFuZWxTdGF0ZSgpO1xufVxuXG5leHBvcnQgY29uc3QgbWV0aG9kczogUmVjb3JkPHN0cmluZywgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk+ID0ge1xuICAgIC8qKiBQYW5lbCAvIEluc3BlY3RvciBoYW5kc2hha2U6IG1hcmtzIHRoaXMgcHJvY2VzcyBhcyB0aGUgZWRpdCBzY2VuZS4gKi9cbiAgICBzcEhlbGxvKCkge1xuICAgICAgICBtYXJrUHJpbWFyeSgpO1xuICAgICAgICByZXR1cm4gYnJvYWRjYXN0Tm93KCk7XG4gICAgfSxcblxuICAgIHNwUHJpbWFyeSgpIHtcbiAgICAgICAgbWFya1ByaW1hcnkoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHNwU3RhdGUoKSB7XG4gICAgICAgIHVwZGF0ZVRhcmdldHMoKTtcbiAgICAgICAgcmV0dXJuIHBhbmVsU3RhdGUoKTtcbiAgICB9LFxuXG4gICAgc3BTZXRDb250ZXh0KG9uOiBib29sZWFuKSB7XG4gICAgICAgIG1hcmtQcmltYXJ5KCk7XG4gICAgICAgIHVwZGF0ZVRhcmdldHMoKTtcbiAgICAgICAgaWYgKG9uICYmICFTLmxhc3RUYXJnZXRzLmxlbmd0aCkgcmV0dXJuIHBhbmVsU3RhdGUoKTtcbiAgICAgICAgc2V0Q29udGV4dCghIW9uKTtcbiAgICAgICAgcmV0dXJuIGJyb2FkY2FzdE5vdygpO1xuICAgIH0sXG5cbiAgICBzcFNldFRvb2wodG9vbDogJ3NlbGVjdCcgfCAnZHJhdycpIHtcbiAgICAgICAgbWFya1ByaW1hcnkoKTtcbiAgICAgICAgdXBkYXRlVGFyZ2V0cygpO1xuICAgICAgICBpZiAoIVMubGFzdFRhcmdldHMubGVuZ3RoKSByZXR1cm4gcGFuZWxTdGF0ZSgpO1xuICAgICAgICBzZXRUb29sKHRvb2wgPT09ICdkcmF3JyA/ICdkcmF3JyA6ICdzZWxlY3QnKTtcbiAgICAgICAgaWYgKHRvb2wgPT09ICdkcmF3JykgUy5kcmF3aW5nID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGJyb2FkY2FzdE5vdygpO1xuICAgIH0sXG5cbiAgICBzcFNldFNldHRpbmcoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIFMuc2V0dGluZ3MpKSByZXR1cm4gcGFuZWxTdGF0ZSgpO1xuICAgICAgICAoUy5zZXR0aW5ncyBhcyBhbnkpW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIHJldHVybiBicm9hZGNhc3ROb3coKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgc3BTZXRFbGVtZW50KHByb3BzOiBFbGVtZW50UHJvcHMpIHtcbiAgICAgICAgbWFya1ByaW1hcnkoKTtcbiAgICAgICAgYXdhaXQgc2V0RWxlbWVudFByb3BzKHByb3BzIHx8IHt9KTtcbiAgICAgICAgcmV0dXJuIGJyb2FkY2FzdE5vdygpO1xuICAgIH0sXG5cbiAgICBhc3luYyBzcEFjdGlvbihuYW1lOiBzdHJpbmcsIGFyZz86IGFueSkge1xuICAgICAgICBtYXJrUHJpbWFyeSgpO1xuICAgICAgICB1cGRhdGVUYXJnZXRzKCk7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzogYXdhaXQgZGVsZXRlU2VsZWN0aW9uKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9kZSc6IGF3YWl0IHNldE1vZGVTZWxlY3RlZChOdW1iZXIoYXJnKSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY3ljbGVNb2RlJzogYXdhaXQgY3ljbGVNb2RlU2VsZWN0ZWQoKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsaW5rJzogYXdhaXQgbGlua1NlbGVjdGVkKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndW5saW5rJzogYXdhaXQgdW5saW5rU2VsZWN0ZWQoKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzcGxpdCc6IGF3YWl0IHNwbGl0U2VsZWN0ZWQoKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdqb2luJzogYXdhaXQgam9pblNlbGVjdGVkKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmV2ZXJzZSc6IGF3YWl0IHJldmVyc2VTZWxlY3RlZCgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Nsb3NlJzogYXdhaXQgc2V0Q2xvc2VkU2VsZWN0ZWQoYXJnID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiAhIWFyZyk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2VsZWN0QWxsJzogc2VsZWN0QWxsKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2xlYXJTZWxlY3Rpb24nOiBjbGVhclNlbGVjdGlvbigpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZpbmlzaERyYXdpbmcnOiBTLmRyYXdpbmcgPSBudWxsOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnJvYWRjYXN0Tm93KCk7XG4gICAgfSxcblxuICAgIGFzeW5jIHNwQ3JlYXRlKGtpbmQ6IHN0cmluZykge1xuICAgICAgICBtYXJrUHJpbWFyeSgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGNyZWF0ZVNwbGluZU5vZGUoa2luZCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIG5vdGUoYGNyZWF0ZTogJHsoZSBhcyBFcnJvcik/LnN0YWNrIHx8IGV9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbU3BsaW5lc10gQ291bGQgbm90IGNyZWF0ZSB0aGUgc3BsaW5lOicsIGUpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqIEluc3BlY3RvcjogZGF0YSBvZiBvbmUgU3BsaW5lQ29udGFpbmVyLiAqL1xuICAgIHNwQ29udGFpbmVySW5mbyhjb21wVXVpZDogc3RyaW5nKSB7XG4gICAgICAgIG1hcmtQcmltYXJ5KCk7XG4gICAgICAgIHVwZGF0ZVRhcmdldHMoKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckluZm8oY29tcFV1aWQpO1xuICAgIH0sXG5cbiAgICBhc3luYyBzcEVkaXRLbm90KGNvbXBVdWlkOiBzdHJpbmcsIHNwbGluZTogbnVtYmVyLCBrbm90OiBudW1iZXIsIHByb3BzOiBFbGVtZW50UHJvcHMpIHtcbiAgICAgICAgbWFya1ByaW1hcnkoKTtcbiAgICAgICAgYXdhaXQgZWRpdEtub3QoY29tcFV1aWQsIHNwbGluZSwga25vdCwgcHJvcHMgfHwge30pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVySW5mbyhjb21wVXVpZCk7XG4gICAgfSxcblxuICAgIGFzeW5jIHNwU3BsaW5lQWN0aW9uKGNvbXBVdWlkOiBzdHJpbmcsIHNwbGluZTogbnVtYmVyLCBhY3Rpb246IHN0cmluZywgYXJnPzogYW55KSB7XG4gICAgICAgIG1hcmtQcmltYXJ5KCk7XG4gICAgICAgIHVwZGF0ZVRhcmdldHMoKTtcbiAgICAgICAgcmV0dXJuIHNwbGluZUFjdGlvbihjb21wVXVpZCwgc3BsaW5lLCBhY3Rpb24sIGFyZyk7XG4gICAgfSxcblxuICAgIC8qKiBJbnNwZWN0b3I6IHR1cm5zIFNwbGluZUluc3RhbnRpYXRlJ3MgZ2VuZXJhdGVkIGluc3RhbmNlcyBpbnRvIHJlZ3VsYXIgbm9kZXMuICovXG4gICAgYXN5bmMgc3BCYWtlSW5zdGFuY2VzKGNvbXBVdWlkOiBzdHJpbmcpIHtcbiAgICAgICAgbWFya1ByaW1hcnkoKTtcbiAgICAgICAgY29uc3QgY29tcCA9IGZpbmRDb21wb25lbnQoY29tcFV1aWQpO1xuICAgICAgICBpZiAoIWNvbXAgfHwgdHlwZW9mIGNvbXAuX2Jha2VJbmZvICE9PSAnZnVuY3Rpb24nKSByZXR1cm4geyBjb3VudDogMCB9O1xuICAgICAgICBjb25zdCBpbmZvOiB7IHByZWZhYjogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyW107IHJvdGF0aW9uOiBudW1iZXJbXTsgc2NhbGU6IG51bWJlcltdIH1bXSA9IGNvbXAuX2Jha2VJbmZvKCk7XG4gICAgICAgIGlmICghaW5mby5sZW5ndGgpIHJldHVybiB7IGNvdW50OiAwIH07XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IChhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdzY2VuZScsICdjcmVhdGUtbm9kZScsIHtcbiAgICAgICAgICAgIHBhcmVudDogY29tcC5ub2RlLnV1aWQsXG4gICAgICAgICAgICBuYW1lOiBgJHtjb21wLm5vZGUubmFtZX0gSW5zdGFuY2VzYCxcbiAgICAgICAgfSBhcyBhbnkpKSBhcyB1bmtub3duIGFzIHN0cmluZztcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBwIG9mIGluZm8pIHtcbiAgICAgICAgICAgIGNvbnN0IHV1aWQgPSAoYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnY3JlYXRlLW5vZGUnLCB7IHBhcmVudCwgYXNzZXRVdWlkOiBwLnByZWZhYiB9IGFzIGFueSkpIGFzIHVua25vd24gYXMgc3RyaW5nO1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyA/IGZpbmROb2RlKHV1aWQpIDogbnVsbDtcbiAgICAgICAgICAgIGlmICghbm9kZSkgY29udGludWU7XG4gICAgICAgICAgICBub2RlLnNldFdvcmxkUG9zaXRpb24ocC5wb3NpdGlvblswXSwgcC5wb3NpdGlvblsxXSwgcC5wb3NpdGlvblsyXSk7XG4gICAgICAgICAgICBub2RlLnNldFdvcmxkUm90YXRpb24ocC5yb3RhdGlvblswXSwgcC5yb3RhdGlvblsxXSwgcC5yb3RhdGlvblsyXSwgcC5yb3RhdGlvblszXSk7XG4gICAgICAgICAgICBub2RlLnNldFNjYWxlKHAuc2NhbGVbMF0sIHAuc2NhbGVbMV0sIHAuc2NhbGVbMl0pO1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgICAvLyBTdG9wIGdlbmVyYXRpbmc6IHRoZSBiYWtlZCBub2RlcyByZXBsYWNlIHRoZSBpbnN0YW5jZXMuXG4gICAgICAgIGF3YWl0IHJlY29yZEVkaXQoW2NvbXBdLCAoKSA9PiB7XG4gICAgICAgICAgICBjb21wLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFmdGVyRWRpdChbY29tcF0pO1xuICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gZmluZE5vZGUocGFyZW50KTtcbiAgICAgICAgaWYgKHBhcmVudE5vZGUpIGNjZSgpLkVuZ2luZT8ucmVwYWludEluRWRpdE1vZGU/LigpO1xuICAgICAgICByZXR1cm4geyBjb3VudCB9O1xuICAgIH0sXG5cbiAgICBzcERpYWdub3N0aWNzKCkge1xuICAgICAgICBjb25zdCBjYW0gPSBzY2VuZUNhbWVyYSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJpbWFyeTogUy5wcmltYXJ5LFxuICAgICAgICAgICAgaG9va2VkOiBTLmhvb2tlZCxcbiAgICAgICAgICAgIHJ1bnRpbWVSZWFkeTogcnVudGltZVJlYWR5KCksXG4gICAgICAgICAgICBjb250ZXh0OiBTLmNvbnRleHQsXG4gICAgICAgICAgICB0b29sOiBTLnRvb2wsXG4gICAgICAgICAgICBzZXR0aW5nczogUy5zZXR0aW5ncyxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogUy5zZWxlY3Rpb24uYWxsKCkubWFwKChlKSA9PiBgJHtlLmNvbXAubm9kZT8ubmFtZX06JHtlLnNwbGluZX06JHtlLmtub3R9OiR7ZS5wYXJ0fWApLFxuICAgICAgICAgICAgdGFyZ2V0czogUy5sYXN0VGFyZ2V0cy5tYXAoKGMpID0+IGMubm9kZT8ubmFtZSksXG4gICAgICAgICAgICBjb250YWluZXJzOiBhbGxDb250YWluZXJzKCkubWFwKChjKSA9PiBgJHtjLm5vZGU/Lm5hbWV9ICgke2Muc3BsaW5lcy5sZW5ndGh9IHNwbGluZXMpYCksXG4gICAgICAgICAgICBjYW1lcmE6IGNhbSA/IHsgbmFtZTogY2FtLm5hbWUsIHdpZHRoOiBjYW0ud2lkdGgsIGhlaWdodDogY2FtLmhlaWdodCwgcHJvamVjdGlvbjogY2FtLnByb2plY3Rpb25UeXBlIH0gOiBudWxsLFxuICAgICAgICAgICAgZXZlbnRDb29yZHM6IGV2ZW50Q29vcmRNb2RlKCksXG4gICAgICAgICAgICBvcGVyYXRpb246ICEhY2NlKCkuT3BlcmF0aW9uPy5hZGRMaXN0ZW5lcixcbiAgICAgICAgICAgIGd1YXJkczogZ3VhcmRzSW5mbygpLFxuICAgICAgICAgICAgZ2l6bW86IHtcbiAgICAgICAgICAgICAgICB0b29sOiBjY2UoKS5HaXptbz8udHJhbnNmb3JtVG9vbE5hbWUsXG4gICAgICAgICAgICAgICAgcGl2b3Q6IGNjZSgpLkdpem1vPy5waXZvdCxcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlOiBjY2UoKS5HaXptbz8uY29vcmRpbmF0ZSxcbiAgICAgICAgICAgICAgICBpczJEOiBjY2UoKS5HaXptbz8uaXMyRCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaWFnOiBTLmRpYWcsXG4gICAgICAgICAgICB1cmw6IHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgPyBsb2NhdGlvbi5ocmVmIDogJycsXG4gICAgICAgIH07XG4gICAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkKCk6IHZvaWQge1xuICAgIGxvYWRTZXR0aW5ncygpO1xuICAgIC8vIFRoZSBlbmdpbmUgYW5kIHRoZSBlZGl0b3IgbWFuYWdlcnMgbWF5IG5vdCBiZSByZWFkeSB5ZXQ7IHJldHJ5LlxuICAgIGNvbnN0IHRyeUhvb2sgPSAobjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBob29rKCk7XG4gICAgICAgICAgICBpZiAoUy5ob29rZWQpIHJldHVybjtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvLyByZXRyeVxuICAgICAgICB9XG4gICAgICAgIGlmIChuID4gMCkgc2V0VGltZW91dCgoKSA9PiB0cnlIb29rKG4gLSAxKSwgMTAwMCk7XG4gICAgfTtcbiAgICB0cnlIb29rKDMwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVubG9hZCgpOiB2b2lkIHtcbiAgICBjYW5jZWxBY3RpdmUoKTtcbiAgICB1bmhvb2soKTtcbiAgICByZW1vdmVPdmVybGF5KCk7XG4gICAgc2V0Q29udGV4dChmYWxzZSk7XG59XG4iLCAiLyoqXG4gKiBUaGUgc2NlbmUgc2NyaXB0IGFnYWluc3QgYSBmYWtlIGVkaXRvcjogZHJhd2luZywgcGlja2luZywgZHJhZ2dpbmcsIHRoZVxuICogRHJhdyB0b29sLCBrZXlib2FyZCwgdW5kbyByZWNvcmRpbmdzIGFuZCB0aGUgcGFuZWwgLyBJbnNwZWN0b3IgbWV0aG9kcy5cbiAqL1xuaW1wb3J0IHsgbG9nLCBzY2VuZSwgY2NlLCBjYywgc2NyZWVuLCBzZWxlY3ROb2RlcywgZ2VvbWV0cnksIHNldFNjZW5lTWV0aG9kcywgZG9tS2V5LCBmaW5kTm9kZSB9IGZyb20gJy4vc3R1YnMvZWRpdG9yJztcbmltcG9ydCAnLi4vYXNzZXRzL2luZGV4JztcbmltcG9ydCB7IFNwbGluZUNvbnRhaW5lciB9IGZyb20gJy4uL2Fzc2V0cy9ydW50aW1lL1NwbGluZUNvbnRhaW5lcic7XG5pbXBvcnQgeyBUYW5nZW50TW9kZSB9IGZyb20gJy4uL2Fzc2V0cy9ydW50aW1lL0Jlemllcktub3QnO1xuaW1wb3J0IHsgbWV0aG9kcywgbG9hZCB9IGZyb20gJy4uL3NvdXJjZS9zY2VuZS9pbmRleCc7XG5pbXBvcnQgeyBTIH0gZnJvbSAnLi4vc291cmNlL3NjZW5lL3N0YXRlJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7IHJlc3VsdHMgfSBmcm9tICcuL2hhcm5lc3MnO1xuXG5zZXRTY2VuZU1ldGhvZHMobWV0aG9kcyk7XG5cbmNvbnN0IHRlc3RzOiB7IG5hbWU6IHN0cmluZzsgZm46ICgpID0+IFByb21pc2U8dm9pZD4gfCB2b2lkIH1bXSA9IFtdO1xuZnVuY3Rpb24gdGVzdChuYW1lOiBzdHJpbmcsIGZuOiAoKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZCkge1xuICAgIHRlc3RzLnB1c2goeyBuYW1lLCBmbiB9KTtcbn1cblxuY29uc3QgZmx1c2ggPSAoKSA9PiBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCAwKSk7XG5jb25zdCB0aWNrID0gKCkgPT4gKGNjLmRpcmVjdG9yIGFzIGFueSkudGljaygpO1xuXG5mdW5jdGlvbiBuZWFyKGE6IG51bWJlciwgYjogbnVtYmVyLCBlcHM6IG51bWJlciwgbXNnID0gJycpIHtcbiAgICBhc3NlcnQub2soTWF0aC5hYnMoYSAtIGIpIDw9IGVwcywgYCR7bXNnfSAke2F9ICE9ICR7Yn0gKFx1MDBCMSR7ZXBzfSlgKTtcbn1cblxuZnVuY3Rpb24gbW91c2UodHlwZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgbW9kczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9KSB7XG4gICAgcmV0dXJuIGNjZS5PcGVyYXRpb24uZW1pdCh0eXBlLCB7IHgsIHksIGJ1dHRvbjogMCwgbGVmdEJ1dHRvbjogdHJ1ZSwgLi4ubW9kcyB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xpY2soeDogbnVtYmVyLCB5OiBudW1iZXIsIG1vZHM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fSkge1xuICAgIG1vdXNlKCdtb3VzZWRvd24nLCB4LCB5LCBtb2RzKTtcbiAgICBhd2FpdCBmbHVzaCgpO1xuICAgIG1vdXNlKCdtb3VzZXVwJywgeCwgeSwgbW9kcyk7XG4gICAgYXdhaXQgZmx1c2goKTtcbiAgICB0aWNrKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRyYWcoZnJvbTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9LCB0bzogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9LCBtb2RzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge30pIHtcbiAgICBtb3VzZSgnbW91c2Vkb3duJywgZnJvbS54LCBmcm9tLnksIG1vZHMpO1xuICAgIGF3YWl0IGZsdXNoKCk7XG4gICAgY29uc3Qgc3RlcHMgPSA1O1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHN0ZXBzOyBpKyspIHtcbiAgICAgICAgbW91c2UoJ21vdXNlbW92ZScsIGZyb20ueCArICgodG8ueCAtIGZyb20ueCkgKiBpKSAvIHN0ZXBzLCBmcm9tLnkgKyAoKHRvLnkgLSBmcm9tLnkpICogaSkgLyBzdGVwcywgbW9kcyk7XG4gICAgICAgIGF3YWl0IGZsdXNoKCk7XG4gICAgfVxuICAgIG1vdXNlKCdtb3VzZXVwJywgdG8ueCwgdG8ueSwgbW9kcyk7XG4gICAgYXdhaXQgZmx1c2goKTtcbiAgICBhd2FpdCBmbHVzaCgpO1xuICAgIHRpY2soKTtcbn1cblxuZnVuY3Rpb24ga2V5KGs6IHN0cmluZywgbW9kczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9KSB7XG4gICAgcmV0dXJuIGNjZS5PcGVyYXRpb24uZW1pdCgna2V5ZG93bicsIHsga2V5OiBrLCAuLi5tb2RzIH0pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2V0dXBcblxuY29uc3Qgbm9kZSA9IG5ldyBjYy5Ob2RlKCdQYXRoJyk7XG5ub2RlLnNldFBhcmVudChzY2VuZSk7XG5jb25zdCBjb21wID0gbm9kZS5hZGRDb21wb25lbnQoU3BsaW5lQ29udGFpbmVyKSBhcyBTcGxpbmVDb250YWluZXI7XG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBjb25zdCBzID0gY29tcC5zcGxpbmVzWzBdO1xuICAgIHMua25vdHMubGVuZ3RoID0gMDtcbiAgICBjb21wLnNwbGluZXMubGVuZ3RoID0gMTtcbiAgICBjb21wLmxpbmtzLmxlbmd0aCA9IDA7XG4gICAgcy5jbG9zZWQgPSBmYWxzZTtcbiAgICBzLmFkZChuZXcgY2MuVmVjMygwLCAwLCAwKSBhcyBhbnkpO1xuICAgIHMuYWRkKG5ldyBjYy5WZWMzKDUsIDAsIDApIGFzIGFueSk7XG4gICAgcy5hZGQobmV3IGNjLlZlYzMoMTAsIDAsIDUpIGFzIGFueSk7XG4gICAgUy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICBTLmNvbnRleHQgPSBmYWxzZTtcbiAgICBTLnRvb2wgPSAnc2VsZWN0JztcbiAgICBTLmRyYXdpbmcgPSBudWxsO1xuICAgIHNlbGVjdE5vZGVzKFtub2RlLnV1aWRdKTtcbiAgICBsb2cuZWRpdG9yRXZlbnRzLmxlbmd0aCA9IDA7XG4gICAgbG9nLnJlbW92ZWQubGVuZ3RoID0gMDtcbiAgICB0aWNrKCk7XG59XG5cbmxvYWQoKTtcbm1ldGhvZHMuc3BQcmltYXJ5KCk7XG5cbmNvbnN0IGtub3RTY3JlZW4gPSAoczogbnVtYmVyLCBrOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBwID0gY29tcC5nZXRLbm90V29ybGRQb3NpdGlvbih7IHNwbGluZTogcywga25vdDogayB9KTtcbiAgICByZXR1cm4gc2NyZWVuKHAueCwgcC55LCBwLnopO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHRlc3RzXG5cbnRlc3QoJ2hvb2tzIGludG8gdGhlIGVkaXRvciBhbmQgZHJhd3MgdGhlIHNlbGVjdGVkIHNwbGluZScsICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGFzc2VydC5vayhTLmhvb2tlZCwgJ2hvb2tlZCcpO1xuICAgIGdlb21ldHJ5LnJlc2V0KCk7XG4gICAgdGljaygpO1xuICAgIGFzc2VydC5vayhnZW9tZXRyeS5saW5lcyA+IDIwLCBgbGluZXMgZHJhd246ICR7Z2VvbWV0cnkubGluZXN9YCk7XG4gICAgYXNzZXJ0Lm9rKGdlb21ldHJ5LnRyaWFuZ2xlcyA+IDAsICdrbm90cyBkcmF3bicpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoUy5sYXN0VGFyZ2V0cywgW2NvbXBdKTtcbn0pO1xuXG50ZXN0KCdjbGlja2luZyBhIGtub3QgZW50ZXJzIHRoZSBlZGl0IGNvbnRleHQgYW5kIHNlbGVjdHMgaXQ7IHRoZSBlZGl0b3IgbmV2ZXIgc2VlcyB0aGUgY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBjb25zdCBwID0ga25vdFNjcmVlbigwLCAxKTtcbiAgICBhd2FpdCBjbGljayhwLngsIHAueSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuY29udGV4dCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChTLnNlbGVjdGlvbi5hbGwoKS5tYXAoKGUpID0+IFtlLmtub3QsIGUucGFydF0pLCBbWzEsICdrbm90J11dKTtcbiAgICBhc3NlcnQub2soIWxvZy5lZGl0b3JFdmVudHMuaW5jbHVkZXMoJ21vdXNlZG93bicpLCAnYmxvY2tlZCcpO1xufSk7XG5cbnRlc3QoJ291dHNpZGUgdGhlIGNvbnRleHQsIGNsaWNrcyBvbiBlbXB0eSBzcGFjZSBnbyB0byB0aGUgZWRpdG9yJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgYXdhaXQgY2xpY2soc2NyZWVuKDIwLCAwLCAyMCkueCwgc2NyZWVuKDIwLCAwLCAyMCkueSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuY29udGV4dCwgZmFsc2UpO1xuICAgIGFzc2VydC5vayhsb2cuZWRpdG9yRXZlbnRzLmluY2x1ZGVzKCdtb3VzZWRvd24nKSAmJiBsb2cuZWRpdG9yRXZlbnRzLmluY2x1ZGVzKCdtb3VzZXVwJykpO1xufSk7XG5cbnRlc3QoJ2RyYWdnaW5nIGEga25vdCBtb3ZlcyBpdCAob25lIHVuZG8gc3RlcCknLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBjb25zdCBiZWZvcmUgPSBsb2cucmVxdWVzdHMuZmlsdGVyKChyKSA9PiByLm1zZyA9PT0gJ2JlZ2luLXJlY29yZGluZycpLmxlbmd0aDtcbiAgICBhd2FpdCBkcmFnKGtub3RTY3JlZW4oMCwgMSksIHNjcmVlbig1LCAwLCAzKSk7XG4gICAgY29uc3QgayA9IGNvbXAuc3BsaW5lc1swXS5rbm90c1sxXTtcbiAgICBuZWFyKGsucG9zaXRpb24ueCwgNSwgMC4wNSk7XG4gICAgbmVhcihrLnBvc2l0aW9uLnosIDMsIDAuMDUpO1xuICAgIGNvbnN0IGJlZ2lucyA9IGxvZy5yZXF1ZXN0cy5maWx0ZXIoKHIpID0+IHIubXNnID09PSAnYmVnaW4tcmVjb3JkaW5nJykubGVuZ3RoIC0gYmVmb3JlO1xuICAgIGNvbnN0IGVuZHMgPSBsb2cucmVxdWVzdHMuZmlsdGVyKChyKSA9PiByLm1zZyA9PT0gJ2VuZC1yZWNvcmRpbmcnKS5sZW5ndGg7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGJlZ2lucywgMSk7XG4gICAgYXNzZXJ0Lm9rKGVuZHMgPj0gMSk7XG4gICAgYXNzZXJ0Lm9rKGxvZy5jaGFuZ2VzLnNvbWUoKGMpID0+IGMuZW5kc1dpdGgobm9kZS51dWlkKSksICdlZGl0b3Igbm90aWZpZWQnKTtcbn0pO1xuXG50ZXN0KCdlbXB0eSBjbGljayBjbGVhcnMgdGhlIGtub3Qgc2VsZWN0aW9uIGZpcnN0LCB0aGVuIHJlYWNoZXMgdGhlIGVkaXRvcicsIGFzeW5jICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGF3YWl0IGNsaWNrKGtub3RTY3JlZW4oMCwgMCkueCwga25vdFNjcmVlbigwLCAwKS55KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoUy5zZWxlY3Rpb24uc2l6ZSwgMSk7XG4gICAgbG9nLmVkaXRvckV2ZW50cy5sZW5ndGggPSAwO1xuICAgIGNvbnN0IGVtcHR5ID0gc2NyZWVuKC0xMCwgMCwgLTEwKTtcbiAgICBhd2FpdCBjbGljayhlbXB0eS54LCBlbXB0eS55KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoUy5zZWxlY3Rpb24uc2l6ZSwgMCk7XG4gICAgYXNzZXJ0Lm9rKCFsb2cuZWRpdG9yRXZlbnRzLmluY2x1ZGVzKCdtb3VzZWRvd24nKSwgJ2ZpcnN0IGNsaWNrIG9ubHkgY2xlYXJzJyk7XG4gICAgYXdhaXQgY2xpY2soZW1wdHkueCwgZW1wdHkueSk7XG4gICAgYXNzZXJ0Lm9rKGxvZy5lZGl0b3JFdmVudHMuaW5jbHVkZXMoJ21vdXNlZG93bicpICYmIGxvZy5lZGl0b3JFdmVudHMuaW5jbHVkZXMoJ21vdXNldXAnKSwgJ3NlY29uZCBjbGljayByZXBsYXllZCcpO1xufSk7XG5cbnRlc3QoJ3JlY3RhbmdsZSBzZWxlY3Rpb24gaW4gdGhlIGNvbnRleHQnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBTLmNvbnRleHQgPSB0cnVlO1xuICAgIGF3YWl0IGRyYWcoc2NyZWVuKC0xLCAwLCAtMSksIHNjcmVlbig2LCAwLCAxKSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChTLnNlbGVjdGlvbi5rbm90cygpLm1hcCgoZSkgPT4gZS5rbm90KS5zb3J0KCksIFswLCAxXSk7XG59KTtcblxudGVzdCgnc2hpZnQrY2xpY2sgYWRkcyB0byB0aGUgc2VsZWN0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgYXdhaXQgY2xpY2soa25vdFNjcmVlbigwLCAwKS54LCBrbm90U2NyZWVuKDAsIDApLnkpO1xuICAgIGF3YWl0IGNsaWNrKGtub3RTY3JlZW4oMCwgMikueCwga25vdFNjcmVlbigwLCAyKS55LCB7IHNoaWZ0S2V5OiB0cnVlIH0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoUy5zZWxlY3Rpb24ua25vdHMoKS5tYXAoKGUpID0+IGUua25vdCkuc29ydCgpLCBbMCwgMl0pO1xufSk7XG5cbnRlc3QoJ21vdmUgaGFuZGxlOiBkcmFnZ2luZyB0aGUgWCBheGlzIG1vdmVzIHRoZSBzZWxlY3RlZCBrbm90IGFsb25nIFggb25seScsIGFzeW5jICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGF3YWl0IGNsaWNrKGtub3RTY3JlZW4oMCwgMikueCwga25vdFNjcmVlbigwLCAyKS55KTtcbiAgICBjb25zdCBwaXZvdCA9IGtub3RTY3JlZW4oMCwgMik7XG4gICAgLy8gR3JhYiB0aGUgWCBhcnJvdyBoYWxmd2F5IGFsb25nICg5MCBweCBsb25nKSwgbW92ZSA0MCBweCByaWdodCBhbmQgc29tZSBweCB1cC5cbiAgICBjb25zdCBmcm9tID0geyB4OiBwaXZvdC54ICsgNDUsIHk6IHBpdm90LnkgfTtcbiAgICBhd2FpdCBkcmFnKGZyb20sIHsgeDogZnJvbS54ICsgNDAsIHk6IGZyb20ueSArIDMwIH0pO1xuICAgIGNvbnN0IGsgPSBjb21wLnNwbGluZXNbMF0ua25vdHNbMl07XG4gICAgbmVhcihrLnBvc2l0aW9uLngsIDEyLCAwLjA1KTtcbiAgICBuZWFyKGsucG9zaXRpb24ueiwgNSwgMWUtNik7XG59KTtcblxudGVzdCgncm90YXRlIHRvb2wgdHVybnMgYSBCZXppZXIga25vdCcsIGFzeW5jICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGNvbXAuc3BsaW5lc1swXS5zZXRUYW5nZW50TW9kZSgxLCBUYW5nZW50TW9kZS5NaXJyb3JlZCk7XG4gICAgYXdhaXQgY2xpY2soa25vdFNjcmVlbigwLCAxKS54LCBrbm90U2NyZWVuKDAsIDEpLnkpO1xuICAgIGNjZS5HaXptby50cmFuc2Zvcm1Ub29sTmFtZSA9ICdyb3RhdGlvbic7XG4gICAgdGljaygpO1xuICAgIGNvbnN0IGJlZm9yZSA9IGNvbXAuc3BsaW5lc1swXS5rbm90c1sxXS5yb3RhdGlvbi5jbG9uZSgpO1xuICAgIGNvbnN0IHBpdm90ID0ga25vdFNjcmVlbigwLCAxKTtcbiAgICAvLyBUaGUgdmlldyByaW5nICgxLjE1IHggOTAgcHgpIGlzIGVhc3kgdG8gZ3JhYiBmcm9tIHN0cmFpZ2h0IGFib3ZlLlxuICAgIGF3YWl0IGRyYWcoeyB4OiBwaXZvdC54ICsgMTAzLCB5OiBwaXZvdC55IH0sIHsgeDogcGl2b3QueCwgeTogcGl2b3QueSArIDEwMyB9KTtcbiAgICBjY2UuR2l6bW8udHJhbnNmb3JtVG9vbE5hbWUgPSAncG9zaXRpb24nO1xuICAgIGNvbnN0IGFmdGVyID0gY29tcC5zcGxpbmVzWzBdLmtub3RzWzFdLnJvdGF0aW9uO1xuICAgIGNvbnN0IGQgPSBNYXRoLmFicyhiZWZvcmUueCAqIGFmdGVyLnggKyBiZWZvcmUueSAqIGFmdGVyLnkgKyBiZWZvcmUueiAqIGFmdGVyLnogKyBiZWZvcmUudyAqIGFmdGVyLncpO1xuICAgIGFzc2VydC5vayhkIDwgMC45LCBgcm90YXRlZCAoZG90ICR7ZH0pYCk7XG59KTtcblxudGVzdCgnZG91YmxlLWNsaWNrIG9uIGEgY3VydmUgaW5zZXJ0cyBhIGtub3Qgd2l0aG91dCBjaGFuZ2luZyB0aGUgc2hhcGUnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBTLmNvbnRleHQgPSB0cnVlO1xuICAgIGNvbnN0IHNwbGluZSA9IGNvbXAuc3BsaW5lc1swXTtcbiAgICBjb25zdCBtaWQgPSBzcGxpbmUuZXZhbHVhdGVQb3NpdGlvbigwLjI1KTtcbiAgICBjb25zdCBwID0gc2NyZWVuKG1pZC54LCBtaWQueSwgbWlkLnopO1xuICAgIGNvbnN0IHIgPSBjY2UuT3BlcmF0aW9uLmVtaXQoJ2RibGNsaWNrJywgeyB4OiBwLngsIHk6IHAueSwgYnV0dG9uOiAwIH0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyLCBmYWxzZSwgJ2NvbnN1bWVkJyk7XG4gICAgYXdhaXQgZmx1c2goKTtcbiAgICBhd2FpdCBmbHVzaCgpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzcGxpbmUua25vdHMubGVuZ3RoLCA0KTtcbiAgICBuZWFyKHNwbGluZS5rbm90c1sxXS5wb3NpdGlvbi54LCBtaWQueCwgMC4xKTtcbn0pO1xuXG50ZXN0KCdEZWxldGUgcmVtb3ZlcyB0aGUgc2VsZWN0ZWQga25vdHMsIGFuZCB0aGUgbm9kZSBkZWxldGUgdGhhdCBmb2xsb3dzIGlzIGJsb2NrZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBhd2FpdCBjbGljayhrbm90U2NyZWVuKDAsIDEpLngsIGtub3RTY3JlZW4oMCwgMSkueSk7XG4gICAgY29uc3QgZXYgPSBkb21LZXkoJ0RlbGV0ZScpO1xuICAgIGFzc2VydC5vayhldi5kZWZhdWx0UHJldmVudGVkICYmIGV2LnN0b3BwZWQpO1xuICAgIC8vIFRoZSBzYW1lIGtleSBhbHNvIHJlYWNoZXMgdGhlIHNjZW5lIGxpc3RlbmVycyAob25jZSBvbmx5KS5cbiAgICBrZXkoJ0RlbGV0ZScpO1xuICAgIGF3YWl0IGZsdXNoKCk7XG4gICAgYXdhaXQgZmx1c2goKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29tcC5zcGxpbmVzWzBdLmtub3RzLmxlbmd0aCwgMik7XG4gICAgY2NlLlNjZW5lRmFjYWRlTWFuYWdlci5yZW1vdmVOb2RlKHsgdXVpZDogbm9kZS51dWlkIH0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChsb2cucmVtb3ZlZC5sZW5ndGgsIDAsICdub2RlIG5vdCByZW1vdmVkJyk7XG4gICAgUy5kZWxldGVLZXlBdCA9IDA7XG4gICAgY2NlLlNjZW5lRmFjYWRlTWFuYWdlci5yZW1vdmVOb2RlKHsgdXVpZDogbm9kZS51dWlkIH0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChsb2cucmVtb3ZlZC5sZW5ndGgsIDEsICdsYXRlciBkZWxldGVzIGdvIHRocm91Z2gnKTtcbn0pO1xuXG50ZXN0KCdDIGN5Y2xlcyB0aGUgdGFuZ2VudCBtb2RlLCBFc2NhcGUgY2xlYXJzIHRoZW4gbGVhdmVzJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgYXdhaXQgY2xpY2soa25vdFNjcmVlbigwLCAxKS54LCBrbm90U2NyZWVuKDAsIDEpLnkpO1xuICAgIGNvbnN0IGJlZm9yZSA9IGNvbXAuc3BsaW5lc1swXS5rbm90c1sxXS5tb2RlO1xuICAgIGtleSgnYycpO1xuICAgIGF3YWl0IGZsdXNoKCk7XG4gICAgYXdhaXQgZmx1c2goKTtcbiAgICBhc3NlcnQubm90U3RyaWN0RXF1YWwoY29tcC5zcGxpbmVzWzBdLmtub3RzWzFdLm1vZGUsIGJlZm9yZSk7XG4gICAga2V5KCdFc2NhcGUnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoUy5zZWxlY3Rpb24uc2l6ZSwgMCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuY29udGV4dCwgdHJ1ZSk7XG4gICAga2V5KCdFc2NhcGUnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoUy5jb250ZXh0LCBmYWxzZSk7XG59KTtcblxudGVzdCgnQ3RybCtBIHNlbGVjdHMgYWxsIGtub3RzIGFuZCBrZWVwcyB0aGUgZWRpdG9yIGZyb20gc2VsZWN0aW5nIGFsbCBub2RlcycsIGFzeW5jICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIFMuY29udGV4dCA9IHRydWU7XG4gICAgZG9tS2V5KCdhJywgeyBjdHJsS2V5OiB0cnVlIH0pO1xuICAgIGtleSgnYScsIHsgY3RybEtleTogdHJ1ZSB9KTtcbiAgICBjY2UuU2NlbmVGYWNhZGVNYW5hZ2VyLnNlbGVjdEFsbE5vZGVzKCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuc2VsZWN0aW9uLmtub3RzKCkubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwobG9nLnNlbGVjdEFsbE5vZGVzLCAwKTtcbn0pO1xuXG50ZXN0KCdEcmF3IHRvb2w6IGNsaWNrcyBhZGQga25vdHMgb24gdGhlIGdyb3VuZCwgYSBkcmFnIHB1bGxzIG1pcnJvcmVkIHRhbmdlbnRzLCBjbGlja2luZyB0aGUgZmlyc3Qga25vdCBjbG9zZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBjb21wLnNwbGluZXNbMF0ua25vdHMubGVuZ3RoID0gMDtcbiAgICBjb21wLnNwbGluZXNbMF0ubWFya0RpcnR5KCk7XG4gICAgbWV0aG9kcy5zcFNldFRvb2woJ2RyYXcnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoUy50b29sLCAnZHJhdycpO1xuICAgIGF3YWl0IGNsaWNrKHNjcmVlbigwLCAwLCAwKS54LCBzY3JlZW4oMCwgMCwgMCkueSk7XG4gICAgYXdhaXQgZHJhZyhzY3JlZW4oNCwgMCwgMCksIHNjcmVlbig2LCAwLCAxKSk7XG4gICAgYXdhaXQgY2xpY2soc2NyZWVuKDQsIDAsIDQpLngsIHNjcmVlbig0LCAwLCA0KS55KTtcbiAgICBjb25zdCBzID0gY29tcC5zcGxpbmVzWzBdO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzLmtub3RzLmxlbmd0aCwgMyk7XG4gICAgbmVhcihzLmtub3RzWzJdLnBvc2l0aW9uLngsIDQsIDAuMDUpO1xuICAgIG5lYXIocy5rbm90c1syXS5wb3NpdGlvbi56LCA0LCAwLjA1KTtcbiAgICBuZWFyKHMua25vdHNbMl0ucG9zaXRpb24ueSwgMCwgMWUtNik7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHMua25vdHNbMV0ubW9kZSwgVGFuZ2VudE1vZGUuTWlycm9yZWQpO1xuICAgIGNvbnN0IG91dCA9IHMua25vdHNbMV0udGFuZ2VudE91dDtcbiAgICBuZWFyKE1hdGguaHlwb3Qob3V0LngsIG91dC55LCBvdXQueiksIE1hdGguaHlwb3QoMiwgMSksIDAuMSk7XG4gICAgLy8gQ2xvc2UgYnkgY2xpY2tpbmcgdGhlIGZpcnN0IGtub3QuXG4gICAgYXdhaXQgY2xpY2soc2NyZWVuKDAsIDAsIDApLngsIHNjcmVlbigwLCAwLCAwKS55KTtcbiAgICBhd2FpdCBmbHVzaCgpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzLmNsb3NlZCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuZHJhd2luZywgbnVsbCk7XG4gICAgbWV0aG9kcy5zcFNldFRvb2woJ3NlbGVjdCcpO1xufSk7XG5cbnRlc3QoJ0RyYXcgdG9vbDogY2xpY2tpbmcgYSBjdXJ2ZSBpbnNlcnRzLCBFbnRlciBmaW5pc2hlcycsIGFzeW5jICgpID0+IHtcbiAgICByZXNldCgpO1xuICAgIG1ldGhvZHMuc3BTZXRUb29sKCdkcmF3Jyk7XG4gICAgY29uc3QgbWlkID0gY29tcC5zcGxpbmVzWzBdLmV2YWx1YXRlUG9zaXRpb24oMC4yKTtcbiAgICBhd2FpdCBjbGljayhzY3JlZW4obWlkLngsIG1pZC55LCBtaWQueikueCwgc2NyZWVuKG1pZC54LCBtaWQueSwgbWlkLnopLnkpO1xuICAgIGF3YWl0IGZsdXNoKCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbXAuc3BsaW5lc1swXS5rbm90cy5sZW5ndGgsIDQpO1xuICAgIC8vIEEgY2xpY2sgb24gZW1wdHkgZ3JvdW5kIHN0YXJ0cyBhIG5ldyBzcGxpbmUgKHRoZSBvbGQgb25lIGlzIG5vdCBlbXB0eSkuXG4gICAgYXdhaXQgY2xpY2soc2NyZWVuKC01LCAwLCA4KS54LCBzY3JlZW4oLTUsIDAsIDgpLnkpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb21wLnNwbGluZXMubGVuZ3RoLCAyKTtcbiAgICBrZXkoJ0VudGVyJyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFMuZHJhd2luZywgbnVsbCk7XG4gICAga2V5KCdFc2NhcGUnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoUy50b29sLCAnc2VsZWN0Jyk7XG59KTtcblxudGVzdCgncGFuZWwgc3RhdGUgZGVzY3JpYmVzIHRoZSBzZWxlY3Rpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBhd2FpdCBjbGljayhrbm90U2NyZWVuKDAsIDIpLngsIGtub3RTY3JlZW4oMCwgMikueSk7XG4gICAgY29uc3Qgc3QgPSBtZXRob2RzLnNwU3RhdGUoKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc3QuY29udGV4dCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHN0LmVsZW1lbnQubGFiZWwsICdLbm90IDInKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHN0LmVsZW1lbnQucG9zaXRpb24sIFsxMCwgMCwgNV0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzdC50YXJnZXRzWzBdLm5hbWUsICdQYXRoJyk7XG4gICAgYXNzZXJ0Lm9rKGxvZy5icm9hZGNhc3RzLnNvbWUoKGIpID0+IGIubXNnID09PSAnc3BsaW5lczpzdGF0ZScpKTtcbiAgICBKU09OLnN0cmluZ2lmeShzdCk7XG59KTtcblxudGVzdCgncGFuZWw6IHNldCBlbGVtZW50IGZpZWxkcywgbW9kZXMgYW5kIGFjdGlvbnMgd2l0aCB1bmRvJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgYXdhaXQgY2xpY2soa25vdFNjcmVlbigwLCAxKS54LCBrbm90U2NyZWVuKDAsIDEpLnkpO1xuICAgIGF3YWl0IG1ldGhvZHMuc3BTZXRFbGVtZW50KHsgcG9zaXRpb246IFtudWxsLCAyLCBudWxsXSB9KTtcbiAgICBuZWFyKGNvbXAuc3BsaW5lc1swXS5rbm90c1sxXS5wb3NpdGlvbi55LCAyLCAxZS05KTtcbiAgICBhd2FpdCBtZXRob2RzLnNwU2V0RWxlbWVudCh7IG1vZGU6IFRhbmdlbnRNb2RlLkJyb2tlbiB9KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29tcC5zcGxpbmVzWzBdLmtub3RzWzFdLm1vZGUsIFRhbmdlbnRNb2RlLkJyb2tlbik7XG4gICAgYXdhaXQgbWV0aG9kcy5zcFNldEVsZW1lbnQoeyB0YW5nZW50T3V0OiAzIH0pO1xuICAgIGNvbnN0IHQgPSBjb21wLnNwbGluZXNbMF0ua25vdHNbMV0udGFuZ2VudE91dDtcbiAgICBuZWFyKE1hdGguaHlwb3QodC54LCB0LnksIHQueiksIDMsIDFlLTYpO1xuICAgIGF3YWl0IG1ldGhvZHMuc3BBY3Rpb24oJ3NwbGl0Jyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbXAuc3BsaW5lcy5sZW5ndGgsIDIpO1xuICAgIGF3YWl0IG1ldGhvZHMuc3BBY3Rpb24oJ3NlbGVjdEFsbCcpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChTLnNlbGVjdGlvbi5rbm90cygpLmxlbmd0aCwgNCk7XG4gICAgYXdhaXQgbWV0aG9kcy5zcEFjdGlvbignY2xvc2UnLCB0cnVlKTtcbiAgICBhc3NlcnQub2soY29tcC5zcGxpbmVzLmV2ZXJ5KChzKSA9PiBzLmNsb3NlZCkpO1xufSk7XG5cbnRlc3QoJ0luc3BlY3RvcjogY29udGFpbmVyIGluZm8sIGtub3QgZWRpdHMgYW5kIHNwbGluZSBhY3Rpb25zJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgY29uc3QgaW5mbyA9IG1ldGhvZHMuc3BDb250YWluZXJJbmZvKGNvbXAudXVpZCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGluZm8uc3BsaW5lcy5sZW5ndGgsIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChpbmZvLnNwbGluZXNbMF0ua25vdHMubGVuZ3RoLCAzKTtcbiAgICBhc3NlcnQub2soaW5mby5zcGxpbmVzWzBdLmxlbmd0aCA+IDEwKTtcbiAgICBsZXQgcmVzID0gYXdhaXQgbWV0aG9kcy5zcEVkaXRLbm90KGNvbXAudXVpZCwgMCwgMCwgeyBwb3NpdGlvbjogWzEsIG51bGwsIG51bGxdIH0pO1xuICAgIG5lYXIoY29tcC5zcGxpbmVzWzBdLmtub3RzWzBdLnBvc2l0aW9uLngsIDEsIDFlLTkpO1xuICAgIHJlcyA9IGF3YWl0IG1ldGhvZHMuc3BTcGxpbmVBY3Rpb24oY29tcC51dWlkLCAwLCAnYWRkS25vdCcpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuc3BsaW5lc1swXS5rbm90cy5sZW5ndGgsIDQpO1xuICAgIHJlcyA9IGF3YWl0IG1ldGhvZHMuc3BTcGxpbmVBY3Rpb24oY29tcC51dWlkLCAwLCAnY2xvc2VkJywgdHJ1ZSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5zcGxpbmVzWzBdLmNsb3NlZCwgdHJ1ZSk7XG4gICAgcmVzID0gYXdhaXQgbWV0aG9kcy5zcFNwbGluZUFjdGlvbihjb21wLnV1aWQsIDAsICdhZGRTcGxpbmUnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzLnNwbGluZXMubGVuZ3RoLCAyKTtcbiAgICByZXMgPSBhd2FpdCBtZXRob2RzLnNwU3BsaW5lQWN0aW9uKGNvbXAudXVpZCwgMSwgJ3JlbW92ZVNwbGluZScpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuc3BsaW5lcy5sZW5ndGgsIDEpO1xuICAgIHJlcyA9IGF3YWl0IG1ldGhvZHMuc3BTcGxpbmVBY3Rpb24oY29tcC51dWlkLCAwLCAnc2VsZWN0S25vdCcsIHsga25vdDogMiB9KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoUy5jb250ZXh0LCB0cnVlKTtcbiAgICBhc3NlcnQub2socmVzLnNwbGluZXNbMF0ua25vdHNbMl0uc2VsZWN0ZWQpO1xufSk7XG5cbnRlc3QoJ05vZGUgPiBTcGxpbmUgPiBDaXJjbGUgY3JlYXRlcyBhIHNlbGVjdGVkIHNwbGluZSBub2RlIGFuZCBlbnRlcnMgdGhlIGNvbnRleHQnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBzZWxlY3ROb2RlcyhbXSk7XG4gICAgdGljaygpO1xuICAgIGNvbnN0IHV1aWQgPSBhd2FpdCBtZXRob2RzLnNwQ3JlYXRlKCdjaXJjbGUnKTtcbiAgICBjb25zdCBuID0gZmluZE5vZGUodXVpZCkhO1xuICAgIGFzc2VydC5vayhuLCAnbm9kZSBjcmVhdGVkJyk7XG4gICAgY29uc3QgYyA9IG4uZ2V0Q29tcG9uZW50KFNwbGluZUNvbnRhaW5lcikhO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjLnNwbGluZXNbMF0ua25vdHMubGVuZ3RoLCA0KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYy5zcGxpbmVzWzBdLmNsb3NlZCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjY2UuU2VsZWN0aW9uLnF1ZXJ5KCksIFt1dWlkXSk7XG4gICAgdGljaygpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChTLmNvbnRleHQsIHRydWUsICdjb250ZXh0IGVudGVyZWQgb25jZSBzZWxlY3RlZCcpO1xuICAgIG4uZGVzdHJveSgpO1xuICAgIChTcGxpbmVDb250YWluZXIgYXMgYW55KS5hbGwuZGVsZXRlKGMpO1xufSk7XG5cbnRlc3QoJ2RpYWdub3N0aWNzIGFyZSBKU09OJywgKCkgPT4ge1xuICAgIGNvbnN0IGQgPSBtZXRob2RzLnNwRGlhZ25vc3RpY3MoKTtcbiAgICBKU09OLnN0cmluZ2lmeShkKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZC5wcmltYXJ5LCB0cnVlKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZC5ldmVudENvb3JkcywgJ2V2ZW50Jyk7XG59KTtcblxuKGFzeW5jICgpID0+IHtcbiAgICBmb3IgKGNvbnN0IHQgb2YgdGVzdHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHQuZm4oKTtcbiAgICAgICAgICAgIHJlc3VsdHMucGFzc2VkKys7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgICBvayAgICR7dC5uYW1lfWApO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXN1bHRzLmZhaWxlZCsrO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCAgRkFJTCAke3QubmFtZX1cXG4gICAgICAgJHtTdHJpbmcoKGUgYXMgRXJyb3IpPy5zdGFjayB8fCBlKS5zcGxpdCgnXFxuJykuc2xpY2UoMCwgNikuam9pbignXFxuICAgICAgICcpfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBcXG4ke3Jlc3VsdHMucGFzc2VkfSBwYXNzZWQsICR7cmVzdWx0cy5mYWlsZWR9IGZhaWxlZGApO1xuICAgIHByb2Nlc3MuZXhpdENvZGUgPSByZXN1bHRzLmZhaWxlZCA/IDEgOiAwO1xufSkoKTtcbiIsICJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5cbmV4cG9ydCBjb25zdCByZXN1bHRzID0geyBwYXNzZWQ6IDAsIGZhaWxlZDogMCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gdGVzdChuYW1lOiBzdHJpbmcsIGZuOiAoKSA9PiB2b2lkKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgICAgcmVzdWx0cy5wYXNzZWQrKztcbiAgICAgICAgY29uc29sZS5sb2coYCAgb2sgICAke25hbWV9YCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXN1bHRzLmZhaWxlZCsrO1xuICAgICAgICBjb25zdCBlcnIgPSBlIGFzIEVycm9yO1xuICAgICAgICBjb25zdCBkZXRhaWwgPSBlcnIgaW5zdGFuY2VvZiBhc3NlcnQuQXNzZXJ0aW9uRXJyb3IgPyBlcnIubWVzc2FnZSA6IFN0cmluZyhlcnI/LnN0YWNrIHx8IGVycikuc3BsaXQoJ1xcbicpLnNsaWNlKDAsIDUpLmpvaW4oJ1xcbicpO1xuICAgICAgICBjb25zb2xlLmxvZyhgICBGQUlMICR7bmFtZX1cXG4gICAgICAgJHtkZXRhaWwuc3BsaXQoJ1xcbicpLmpvaW4oJ1xcbiAgICAgICAnKX1gKTtcbiAgICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa1VPLFNBQVMsU0FBUyxTQUFTLE1BQU07QUFDcEMsU0FBTyxHQUFHLE1BQU0sSUFBSSxFQUFFLE9BQU87QUFDakM7QUF1S0EsU0FBUyxRQUFRLE1BQWM7QUFDM0IsU0FBTyxDQUFDLFNBQWM7QUFDbEIsU0FBSyxRQUFRO0FBQ2IsWUFBUSxJQUFJLE1BQU0sSUFBSTtBQUN0QixXQUFPO0FBQUEsRUFDWDtBQUNKO0FBSUEsU0FBUyxZQUFZLE1BQWtCO0FBRW5DLE1BQUksS0FBSyxVQUFVLEtBQUssT0FBTyxLQUFLLENBQUMs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QUFRLEdBQVU7QUFDcEQsUUFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3RELE1BQUksSUFBSSxRQUFTLFFBQU8sVUFBVSxHQUFHO0FBQ3JDLFNBQU8sS0FBSyxLQUFLLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQzFEO0FBR08sU0FBUyxRQUFzQixLQUFRLEdBQU8sR0FBVTtBQUUzRCxRQUFNLEtBQUssS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3BDLFFBQU0sS0FBSyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDcEMsUUFBTSxLQUFLLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNwQyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUM3QyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUM3QyxRQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUM3QyxTQUFPLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUMzQjtBQUVPLFNBQVMsZUFBNkIsS0FBUSxNQUFVLEtBQWdCO0FBQzNFLFFBQU0sSUFBSSxVQUFVLEdBQUcsR0FBRyxJQUFJO0FBQzlCLFFBQU0sSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDO0FBQzFCLFNBQU8sS0FBSyxLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQztBQUNqRTtBQUdPLFNBQVMsVUFBd0IsS0FBUSxH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O0FBQ2hDLE9BQUssVUFBVSxDQUFDO0FBQ2hCLGdCQUFBRixRQUFPLFlBQVksRUFBRSxTQUFTLElBQUk7QUFDbEMsZ0JBQUFBLFFBQU8sWUFBWSxFQUFFLGFBQWEsT0FBTztBQUM3QyxDQUFDO0FBQUEsQ0FFQSxZQUFZO0FBQ1QsYUFBVyxLQUFLLE9BQU87QUFDbkIsUUFBSTtBQUNBLFlBQU0sRUFBRSxHQUFHO0FBQ1gsY0FBUTtBQUNSLGNBQVEsSUFBSSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQUEsSUFDbEMsU0FBUyxHQUFHO0FBQ1IsY0FBUTtBQUNSLGNBQVEsSUFBSSxVQUFVLEVBQUUsSUFBSTtBQUFBLFNBQVksUUFBUSx1QkFBYSxVQUFTLENBQUMsRUFBRSxNQUFNLElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDLEVBQUU7QUFBQSxJQUN4SDtBQUFBLEVBQ0o7QUFDQSxVQUFRLElBQUk7QUFBQSxFQUFLLFFBQVEsTUFBTSxZQUFZLFFBQVEsTUFBTSxTQUFTO0FBQ2xFLFVBQVEsV0FBVyxRQUFRLFNBQVMsSUFBSTtBQUM1QyxHQUFHOyIsCiAgIm5hbWVzIjogWyJjIiwgIl9hIiwgIl9iIiwgImdlb21ldHJ5IiwgImMiLCAiZ2VvbWV0cnkiLCAiX2EiLCAia2V5IiwgInMiLCAidGVzdCIsICJjIiwgImMiLCAiYyIsICJUYW5nZW50TW9kZSIsICJ1cCIsICJjYWNoZSIsICJjIiwgImMyIiwgImZhY3RvcnkiLCAiYWRkIiwgImciLCAicHRzIiwgImNjY2xhc3MiLCAicHJvcGVydHkiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJjY2NsYXNzIiwgInByb3BlcnR5IiwgImNhY2hlIiwgInByb3BlcnR5IiwgImNjY2xhc3MiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJfYSIsICJjY2NsYXNzIiwgInByb3BlcnR5IiwgIm1lbnUiLCAiU3BsaW5lQW5pbWF0ZU1ldGhvZCIsICJTcGxpbmVBbmltYXRlTG9vcE1vZGUiLCAiU3BsaW5lQW5pbWF0ZUVhc2luZyIsICJTcGxpbmVBbmltYXRlQWxpZ25tZW50IiwgIkFsaWduQXhpcyIsICJfYSIsICJfYiIsICJjIiwgImNjY2xhc3MiLCAicHJvcGVydHkiLCAiZXhlY3V0ZUluRWRpdE1vZGUiLCAibWVudSIsICJFeHRydWRlU2hhcGUiLCAiX20iLCAiX2EiLCAiYyIsICJtaXgiLCAiZ2VvbWV0cnkiLCAicmVuZGVyZXIiLCAicHRzIiwgImRpc3QiLCAiY2MiLCAiY2NjbGFzcyIsICJwcm9wZXJ0eSIsICJleGVjdXRlSW5FZGl0TW9kZSIsICJtZW51IiwgIkluc3RhbnRpYXRlTWV0aG9kIiwgIkluc3RhbnRpYXRlU3BhY2UiLCAiT2Zmc2V0U3BhY2UiLCAiQVhFUyIsICJHRU5FUkFURURfRkxBR1MiLCAiX3AiLCAiX2YiLCAiX3UiLCAiX3IiLCAibG9va1JvdGF0aW9uIiwgIl9hIiwgImMiLCAibWl4IiwgInNjYWxlIiwgIlMiLCAiY2NlIiwgImZpbmROb2RlIiwgIl9hIiwgIl9iIiwgInNjZW5lIiwgIndhbGsiLCAiYyIsICJmaW5kQ29tcG9uZW50IiwgImNvbXAiLCAibm9kZSIsICJfYyIsICJfYSIsICJfYiIsICJjIiwgImNjZSIsICJfYSIsICJfYiIsICJfYyIsICJfZCIsICJjb21wIiwgIk1hdDQiLCAibm9kZSIsICJmaW5kTm9kZSIsICJzZXQiLCAiZGlyZWN0b3IiLCAicmVuZGVyZXIiLCAiY2FtIiwgImdlb21ldHJ5IiwgImRpc3QiLCAiYyIsICJwdHMiLCAiYyIsICJjYW0iLCAibmVhciIsICJjb2xvciIsICJjYW1lcmEiLCAia2V5IiwgInB0cyIsICJhY3RpdmUiLCAiY2FtIiwgInB0cyIsICJiZXN0IiwgImJlc3REIiwgInRlc3QiLCAia2V5IiwgImMiLCAiY29tcCIsICJjYW0iLCAiYyIsICJzZXQiLCAiX2EiLCAiX3AiLCAiX3EiLCAibiIsICJrZXkiLCAicmVxdWVzdCIsICJzZXQiLCAiYyIsICJfYSIsICJfYiIsICJjb21wIiwgImtleSIsICJhZGQiLCAiX2EiLCAiaW5zZXJ0T25DdXJ2ZSIsICJmaW5kQ29tcG9uZW50IiwgImNhbSIsICJjIiwgIm5vZGUiLCAiZmluZE5vZGUiLCAiY29tcHNPZiIsICJrZXkiLCAiY2FtIiwgImRyYWciLCAiaGl0IiwgImNvbXAiLCAiY2NlIiwgImluc2VydE9uQ3VydmUiLCAiZGlyZWN0b3IiLCAiZ2VvbWV0cnkiLCAiQ0NPYmplY3QiLCAic2NlbmUiLCAibm9kZSIsICJpbmRleCIsICJzIiwgInByZXZJbmRleCIsICJkIiwgImMiLCAiYyIsICJ3cmFwIiwgImNjZSIsICJfYSIsICJfYiIsICJjY2UiLCAiZGlyZWN0b3IiLCAiRGlyZWN0b3IiLCAiY2NlIiwgImtleSIsICJfYSIsICJfYiIsICJjb21wIiwgImZpbmRDb21wb25lbnQiLCAibm9kZSIsICJmaW5kTm9kZSIsICJjY2UiLCAiX2MiLCAiX2QiLCAiY2FtIiwgImMiLCAiYXNzZXJ0IiwgImdlb21ldHJ5IiwgImMiXQp9Cg==
