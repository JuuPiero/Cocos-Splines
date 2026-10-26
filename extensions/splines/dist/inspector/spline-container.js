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

// source/inspector/spline-container.ts
var spline_container_exports = {};
__export(spline_container_exports, {
  $: () => $,
  close: () => close,
  ready: () => ready,
  style: () => style,
  template: () => template,
  update: () => update
});
module.exports = __toCommonJS(spline_container_exports);

// source/inspector/shared.ts
function callScene(method, ...args) {
  return Editor.Message.request("scene", "execute-scene-script", { name: "splines", method, args });
}
function componentUuids(dump) {
  var _a;
  let u = (_a = dump == null ? void 0 : dump.value) == null ? void 0 : _a.uuid;
  return u ? Array.isArray(u.values) && u.values.length ? u.values : [u.value] : [];
}
function h(tag, attrs = {}, children = []) {
  let el = document.createElement(tag);
  for (let [k, v] of Object.entries(attrs))
    v == null || v === !1 || (k.startsWith("on") && typeof v == "function" ? el.addEventListener(k.slice(2).toLowerCase(), v) : k === "class" ? el.className = v : k === "style" && typeof v == "object" ? Object.assign(el.style, v) : k === "value" || k === "checked" || k === "disabled" ? el[k] = v : el.setAttribute(k, v === !0 ? "" : String(v)));
  for (let c of children)
    c == null || c === !1 || el.appendChild(typeof c == "string" ? document.createTextNode(c) : c);
  return el;
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
function isEditing(el) {
  let active = el.getRootNode().activeElement;
  return !!active && el.contains(active);
}
var BASE_STYLE = `
.sp-section { margin: 6px 0 4px; padding: 6px; border: 1px solid var(--color-normal-border, rgba(255,255,255,0.08)); border-radius: 3px; }
.sp-bar { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
.sp-bar > ui-button { flex: 1; min-width: 70px; }
.sp-note { color: var(--color-normal-contrast-weaker, #aaa); font-size: 11px; margin: 4px 0; line-height: 1.4; }
.sp-warn { color: var(--color-warn-fill, #d9a33a); font-size: 11px; margin: 4px 0; }
.sp-flex { flex: 1; }
`;

// source/shared/broadcast.ts
function api() {
  let msg = Editor.Message, target = typeof msg.addBroadcastListener == "function" ? msg : msg.__protected__;
  return !target || typeof target.addBroadcastListener != "function" ? null : {
    add: (m, f) => target.addBroadcastListener(m, f),
    remove: (m, f) => target.removeBroadcastListener(m, f)
  };
}
function onBroadcast(messages, fn) {
  let a = api();
  if (!a) return () => {
  };
  let list = Array.isArray(messages) ? messages : [messages];
  for (let m of list) a.add(m, fn);
  return () => {
    for (let m of list) a.remove(m, fn);
  };
}

// source/inspector/spline-container.ts
var MODE_NAMES = ["Auto Smooth", "Linear", "Mirrored", "Continuous", "Broken"], template = (
  /* html */
  `
<div class="sp-container-inspector">
    <div class="props"></div>
    <div class="sp-section">
        <div class="sp-bar">
            <ui-button class="edit" title="Edit knots in the Scene view (Esc leaves)">Edit Spline</ui-button>
            <ui-button class="draw" title="Draw tool: click to add knots, drag for tangents">Draw Spline</ui-button>
        </div>
        <div class="splines"></div>
    </div>
</div>
`
), style = BASE_STYLE + /* css */
`
.sp-spline { margin-top: 6px; }
.sp-spline-head { display: flex; align-items: center; gap: 6px; padding: 2px 0; }
.sp-spline-head .fold { cursor: pointer; width: 14px; text-align: center; user-select: none; color: var(--color-normal-contrast-weaker, #aaa); }
.sp-spline-head .title { font-weight: bold; cursor: pointer; }
.sp-spline-head .meta { color: var(--color-normal-contrast-weaker, #999); font-size: 11px; }
.sp-spline-head ui-button { min-width: 0; }
.sp-knots { width: 100%; border-collapse: collapse; margin-top: 2px; }
.sp-knots td { padding: 1px 2px; vertical-align: middle; }
.sp-knots tr.knot:hover { background: rgba(255,255,255,0.04); }
.sp-knots tr.selected { background: rgba(54,179,255,0.18); }
.sp-knots td.idx { width: 22px; text-align: right; color: var(--color-normal-contrast-weaker, #aaa); cursor: pointer; }
.sp-knots td.pos { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; }
.sp-knots td.pos ui-num-input, .sp-knots td.more ui-num-input { width: 100%; min-width: 0; }
.sp-knots td.mode { width: 96px; }
.sp-knots td.mode ui-select { width: 100%; }
.sp-knots td.tools { width: 44px; white-space: nowrap; }
.sp-knots td.tools span { cursor: pointer; padding: 0 3px; color: var(--color-normal-contrast-weaker, #aaa); }
.sp-knots td.tools span:hover { color: var(--color-normal-contrast, #fff); }
.sp-knots tr.details td { padding: 2px 2px 6px 24px; }
.sp-detail { display: grid; grid-template-columns: 70px 1fr; gap: 3px 6px; align-items: center; }
.sp-detail .vec { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; }
.sp-detail span { color: var(--color-normal-contrast-weaker, #aaa); font-size: 11px; }
.sp-link { color: #ffc440; font-size: 10px; margin-left: 2px; }
.sp-add { display: flex; gap: 4px; margin-top: 4px; }
.sp-add ui-button { flex: 1; }
`, $ = {
  props: ".props",
  edit: ".edit",
  draw: ".draw",
  splines: ".splines"
};
function compUuid(ctx) {
  let ids = componentUuids(ctx.dump);
  return ids.length === 1 ? ids[0] : null;
}
async function refresh(ctx) {
  let uuid = compUuid(ctx);
  if (!uuid) {
    ctx.info = null, draw(ctx);
    return;
  }
  try {
    ctx.info = await callScene("spContainerInfo", uuid);
  } catch {
    ctx.info = null;
  }
  draw(ctx);
}
function scheduleRefresh(ctx, delay = 30) {
  clearTimeout(ctx.refreshTimer), ctx.refreshTimer = setTimeout(() => refresh(ctx), delay);
}
async function act(ctx, s, action, arg) {
  let uuid = compUuid(ctx);
  if (uuid) {
    try {
      let info = await callScene("spSplineAction", uuid, s, action, arg);
      info && (ctx.info = info);
    } catch (e) {
      console.warn("[Splines]", e);
    }
    draw(ctx);
  }
}
async function editKnot(ctx, s, k, props) {
  let uuid = compUuid(ctx);
  if (uuid) {
    try {
      let info = await callScene("spEditKnot", uuid, s, k, props);
      info && (ctx.info = info);
    } catch (e) {
      console.warn("[Splines]", e);
    }
    draw(ctx);
  }
}
function num(value, onConfirm, step = 0.1) {
  let el = h("ui-num-input", { step: String(step) });
  return el.value = value, el.addEventListener("confirm", (e) => {
    let v = Number(e.target.value);
    isFinite(v) && onConfirm(v);
  }), el;
}
function modeSelect(mode, onChange) {
  let sel = h("ui-select", {}, MODE_NAMES.map((n, i) => h("option", { value: String(i) }, [n])));
  return sel.value = String(mode), sel.addEventListener("change", (e) => onChange(Number(e.target.value))), sel;
}
function vec(values, onAxis, step = 0.1) {
  return h("div", { class: "vec" }, values.map((v, i) => num(v, (x) => onAxis(i, x), step)));
}
function draw(ctx) {
  let info = ctx.info, edit = ctx.$.edit, drawBtn = ctx.$.draw;
  edit.classList.toggle("blue", !!(info != null && info.context) && info.tool === "select"), drawBtn.classList.toggle("blue", !!(info != null && info.context) && info.tool === "draw"), edit.disabled = !info, drawBtn.disabled = !info;
  let root = ctx.$.splines;
  if (isEditing(root)) {
    ctx.pending = !0;
    return;
  }
  if (ctx.pending = !1, root.textContent = "", !info) {
    root.appendChild(h("div", { class: "sp-note" }, [componentUuids(ctx.dump).length > 1 ? "Select a single node to edit its splines." : "Waiting for the scene\u2026"]));
    return;
  }
  info.splines.forEach((spline, s) => {
    let open = ctx.open.has(s) || info.splines.length === 1, head = h("div", { class: "sp-spline-head" }, [
      h("span", { class: "fold", onclick: () => toggle(ctx, s) }, [open ? "\u25BE" : "\u25B8"]),
      h("span", { class: "title", onclick: () => toggle(ctx, s) }, [`Spline ${s}`]),
      h("span", { class: "meta" }, [`${spline.knots.length} knots \xB7 ${spline.length}`]),
      h("span", { class: "sp-flex" }),
      (() => {
        let cb = h("ui-checkbox", { title: "Connect the last knot to the first" }, ["Closed"]);
        return cb.value = spline.closed, cb.addEventListener("change", (e) => act(ctx, s, "closed", !!e.target.value)), cb;
      })(),
      h("ui-button", { class: "tiny", title: "Reverse the direction of travel", onclick: () => act(ctx, s, "reverse") }, ["\u21C4"]),
      h("ui-button", { class: "tiny red", title: "Remove this spline", onclick: () => act(ctx, s, "removeSpline") }, ["\u2715"])
    ]), box = h("div", { class: "sp-spline" }, [head]);
    if (open) {
      let table = h("table", { class: "sp-knots" });
      spline.knots.forEach((knot, k) => {
        let key = `${s}:${k}`, expanded = ctx.expanded.has(key), row = h("tr", { class: `knot${knot.selected ? " selected" : ""}` }, [
          h("td", { class: "idx", title: "Select this knot in the Scene view (Shift: add)", onclick: (e) => act(ctx, s, "selectKnot", { knot: k, additive: e.shiftKey || e.ctrlKey }) }, [
            String(k),
            knot.linked ? h("span", { class: "sp-link", title: "Linked" }, ["\u25CF"]) : null
          ]),
          h("td", { class: "pos" }, knot.position.map((v, i) => num(v, (x) => {
            let p = [null, null, null];
            p[i] = x, editKnot(ctx, s, k, { position: p });
          }))),
          h("td", { class: "mode" }, [modeSelect(knot.mode, (m) => editKnot(ctx, s, k, { mode: m }))]),
          h("td", { class: "tools" }, [
            h("span", { title: "More", onclick: () => {
              expanded ? ctx.expanded.delete(key) : ctx.expanded.add(key), draw(ctx);
            } }, [expanded ? "\u25B4" : "\u25BE"]),
            h("span", { title: "Delete knot", onclick: () => act(ctx, s, "removeKnot", k) }, ["\u2715"])
          ])
        ]);
        if (table.appendChild(row), expanded) {
          let detail = h("div", { class: "sp-detail" }, [
            h("span", {}, ["Rotation"]),
            vec(knot.rotation, (i, x) => {
              let r = [null, null, null];
              r[i] = x, editKnot(ctx, s, k, { rotation: r });
            }, 1),
            knot.mode === 0 ? h("span", {}, ["Tension"]) : null,
            knot.mode === 0 ? num(knot.tension, (x) => editKnot(ctx, s, k, { tension: x }), 0.05) : null,
            knot.mode !== 1 ? h("span", {}, ["Tangent In"]) : null,
            knot.mode !== 1 ? num(knot.tangentIn, (x) => editKnot(ctx, s, k, { tangentIn: x })) : null,
            knot.mode !== 1 ? h("span", {}, ["Tangent Out"]) : null,
            knot.mode !== 1 ? num(knot.tangentOut, (x) => editKnot(ctx, s, k, { tangentOut: x })) : null
          ]);
          table.appendChild(h("tr", { class: "details" }, [h("td", { colspan: "4" }, [detail])]));
        }
      }), box.appendChild(table), box.appendChild(h("div", { class: "sp-add" }, [
        h("ui-button", { class: "tiny", onclick: () => act(ctx, s, "addKnot") }, ["+ Knot"])
      ]));
    }
    root.appendChild(box);
  }), root.appendChild(h("div", { class: "sp-add" }, [
    h("ui-button", { onclick: () => act(ctx, 0, "addSpline") }, ["+ Add Spline"])
  ]));
}
function toggle(ctx, s) {
  ctx.open.has(s) ? ctx.open.delete(s) : ctx.open.add(s), draw(ctx);
}
function ready() {
  this.info = null, this.open = /* @__PURE__ */ new Set([0]), this.expanded = /* @__PURE__ */ new Set(), this.pending = !1, this.$.edit.addEventListener("click", async () => {
    var _a;
    let on = !((_a = this.info) != null && _a.context && this.info.tool === "select");
    on && await selectThisNode(this), await callScene("spSetContext", on).catch(() => {
    }), scheduleRefresh(this, 0);
  }), this.$.draw.addEventListener("click", async () => {
    var _a;
    let on = !((_a = this.info) != null && _a.context && this.info.tool === "draw");
    on && await selectThisNode(this), await callScene("spSetTool", on ? "draw" : "select").catch(() => {
    }), scheduleRefresh(this, 0);
  }), this.offState = onBroadcast("splines:state", () => scheduleRefresh(this, 50)), this.$.splines.addEventListener("focusout", () => {
    this.pending && setTimeout(() => draw(this), 0);
  });
}
async function selectThisNode(ctx) {
  var _a;
  let node = (_a = ctx.info) == null ? void 0 : _a.node;
  if (node)
    try {
      Editor.Selection.getSelected("node").includes(node) || (Editor.Selection.clear("node"), Editor.Selection.select("node", node), await new Promise((r) => setTimeout(r, 80)));
    } catch {
    }
}
function update(dump) {
  this.dump = dump, renderProps(this, this.$.props, dump, ["splines", "links"]), scheduleRefresh(this);
}
function close() {
  var _a;
  clearTimeout(this.refreshTimer), (_a = this.offState) == null || _a.call(this);
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
//# sourceMappingURL=spline-container.js.map
