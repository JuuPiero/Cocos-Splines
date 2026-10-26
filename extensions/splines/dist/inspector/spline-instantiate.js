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

// source/inspector/spline-instantiate.ts
var spline_instantiate_exports = {};
__export(spline_instantiate_exports, {
  $: () => $,
  close: () => close,
  ready: () => ready,
  style: () => style,
  template: () => template,
  update: () => update
});
module.exports = __toCommonJS(spline_instantiate_exports);

// source/inspector/shared.ts
function sceneTarget(ctx) {
  var _a, _b;
  let el = ctx.$this;
  for (; el; ) {
    if ((_a = el.messageProtocol) != null && _a.scene) return el.messageProtocol.scene;
    el = el.parentElement || ((_b = el.getRootNode) == null ? void 0 : _b.call(el).host);
  }
  return "scene";
}
function callScene(method, ...args) {
  return Editor.Message.request("scene", "execute-scene-script", { name: "splines", method, args });
}
function componentUuids(dump) {
  var _a;
  let u = (_a = dump == null ? void 0 : dump.value) == null ? void 0 : _a.uuid;
  return u ? Array.isArray(u.values) && u.values.length ? u.values : [u.value] : [];
}
async function callComponent(ctx, name, args = [], undoable = !0) {
  let target = sceneTarget(ctx), uuids = componentUuids(ctx.dump), undoId = null;
  if (undoable)
    try {
      undoId = await Editor.Message.request(target, "begin-recording", uuids);
    } catch {
      undoId = null;
    }
  let results = [];
  try {
    for (let uuid of uuids)
      results.push(await Editor.Message.request(target, "execute-component-method", { uuid, name, args }));
  } finally {
    undoId && await Editor.Message.request(target, "end-recording", undoId).catch(() => {
    });
  }
  return results;
}
function renderProps(ctx, container, dump, skip = []) {
  let props = ctx.__props ||= {}, keys = Object.keys((dump == null ? void 0 : dump.value) || {}).filter((k) => dump.value[k] && dump.value[k].visible && !skip.includes(k)).map((k, i) => {
    var _a;
    let info = dump.value[k], order = ((_a = info.group) == null ? void 0 : _a.displayOrder) ?? info.displayOrder;
    return { k, order: order === void 0 ? i : Number(order), i };
  }).sort((a, b) => a.order - b.order || a.i - b.i).map((x) => x.k);
  for (let k of Object.keys(props))
    keys.includes(k) || (props[k].remove(), delete props[k]);
  let prev = null;
  for (let k of keys) {
    let el = props[k];
    el || (el = props[k] = document.createElement("ui-prop"), el.setAttribute("type", "dump"));
    let want = prev ? prev.nextElementSibling : container.firstElementChild;
    want !== el && container.insertBefore(el, want), el.render(dump.value[k]), prev = el;
  }
}
var BASE_STYLE = `
.sp-section { margin: 6px 0 4px; padding: 6px; border: 1px solid var(--color-normal-border, rgba(255,255,255,0.08)); border-radius: 3px; }
.sp-bar { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
.sp-bar > ui-button { flex: 1; min-width: 70px; }
.sp-note { color: var(--color-normal-contrast-weaker, #aaa); font-size: 11px; margin: 4px 0; line-height: 1.4; }
.sp-warn { color: var(--color-warn-fill, #d9a33a); font-size: 11px; margin: 4px 0; }
.sp-flex { flex: 1; }
`;

// source/inspector/spline-instantiate.ts
var template = (
  /* html */
  `
<div class="sp-instantiate-inspector">
    <div class="props"></div>
    <div class="sp-section">
        <div class="sp-bar">
            <ui-button class="regen" title="Place the instances again">Regenerate</ui-button>
            <ui-button class="seed" title="New random seed">Randomize</ui-button>
            <ui-button class="clear" title="Remove the generated instances">Clear</ui-button>
        </div>
        <div class="sp-bar" style="margin-top:4px">
            <ui-button class="bake" title="Create regular nodes from the instances and disable this component">Bake Instances</ui-button>
        </div>
        <div class="sp-note status">Instances are generated (not saved with the scene). Bake them to edit them as nodes.</div>
    </div>
</div>
`
), style = BASE_STYLE, $ = {
  props: ".props",
  regen: ".regen",
  seed: ".seed",
  clear: ".clear",
  bake: ".bake",
  status: ".status"
};
function ready() {
  this.$.regen.addEventListener("click", () => callComponent(this, "updateInstances", [], !1)), this.$.seed.addEventListener("click", () => callComponent(this, "randomizeSeed", [], !0)), this.$.clear.addEventListener("click", () => callComponent(this, "clear", [], !1)), this.$.bake.addEventListener("click", async () => {
    let ids = componentUuids(this.dump);
    if (ids.length === 1) {
      this.$.bake.disabled = !0, this.$.status.textContent = "Baking\u2026";
      try {
        let r = await callScene("spBakeInstances", ids[0]);
        this.$.status.textContent = r != null && r.count ? `Baked ${r.count} instance${r.count === 1 ? "" : "s"}. The component was disabled.` : "Nothing to bake: add prefabs and a container.";
      } catch (e) {
        this.$.status.textContent = `Bake failed: ${e}`;
      } finally {
        this.$.bake.disabled = !1;
      }
    }
  });
}
function update(dump) {
  this.dump = dump, renderProps(this, this.$.props, dump), this.$.bake.disabled = componentUuids(dump).length !== 1;
}
function close() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $,
  close,
  ready,
  style,
  template,
  update
});
//# sourceMappingURL=spline-instantiate.js.map
