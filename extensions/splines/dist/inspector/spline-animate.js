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

// source/inspector/spline-animate.ts
var spline_animate_exports = {};
__export(spline_animate_exports, {
  $: () => $,
  close: () => close,
  h: () => h,
  ready: () => ready,
  style: () => style,
  template: () => template,
  update: () => update
});
module.exports = __toCommonJS(spline_animate_exports);

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
var BASE_STYLE = `
.sp-section { margin: 6px 0 4px; padding: 6px; border: 1px solid var(--color-normal-border, rgba(255,255,255,0.08)); border-radius: 3px; }
.sp-bar { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
.sp-bar > ui-button { flex: 1; min-width: 70px; }
.sp-note { color: var(--color-normal-contrast-weaker, #aaa); font-size: 11px; margin: 4px 0; line-height: 1.4; }
.sp-warn { color: var(--color-warn-fill, #d9a33a); font-size: 11px; margin: 4px 0; }
.sp-flex { flex: 1; }
`;

// source/inspector/spline-animate.ts
var template = (
  /* html */
  `
<div class="sp-animate-inspector">
    <div class="props"></div>
    <div class="sp-section">
        <div class="sp-bar">
            <ui-button class="play" title="Preview in the editor">\u25B6 Play</ui-button>
            <ui-button class="reset" title="Stop the preview and put the object back">\u25A0 Reset</ui-button>
        </div>
        <div class="sp-bar" style="margin-top:4px">
            <ui-slider class="time" min="0" max="1" step="0.001" value="0" style="flex:1"></ui-slider>
        </div>
        <div class="sp-note info"></div>
    </div>
</div>
`
), style = BASE_STYLE, $ = {
  props: ".props",
  play: ".play",
  reset: ".reset",
  time: ".time",
  info: ".info"
};
function uuid(ctx) {
  let ids = componentUuids(ctx.dump);
  return ids.length === 1 ? ids[0] : null;
}
async function call(ctx, name, args = []) {
  let id = uuid(ctx);
  return id ? Editor.Message.request(sceneTarget(ctx), "execute-component-method", { uuid: id, name, args }) : null;
}
function showInfo(ctx, normalized) {
  let d = ctx.duration, t = normalized === void 0 ? "" : ` \xB7 t = ${(normalized % 1 || (normalized >= 1 ? 1 : 0)).toFixed(3)}`;
  ctx.$.info.textContent = !isFinite(d) || d <= 0 ? "Set a container (and a duration or speed) to preview." : `${ctx.elapsed.toFixed(2)}s / ${d.toFixed(2)}s${t}${ctx.previewing ? " \xB7 previewing" : ""}`;
}
async function setTime(ctx, seconds) {
  if (!ctx.busy) {
    ctx.busy = !0;
    try {
      let r = await call(ctx, "_previewSetTime", [seconds]);
      if (ctx.previewing = !0, r) {
        ctx.duration = r.duration;
        let slider = ctx.$.time;
        isFinite(r.duration) && r.duration > 0 && (slider.value = seconds % r.duration / r.duration), showInfo(ctx, r.normalizedTime);
      }
    } catch {
    } finally {
      ctx.busy = !1;
    }
  }
}
function tick(ctx, now) {
  if (!ctx.playing) return;
  let dt = Math.min(0.1, (now - ctx.last) / 1e3);
  ctx.last = now, ctx.elapsed += dt, setTime(ctx, ctx.elapsed), ctx.raf = requestAnimationFrame((n) => tick(ctx, n));
}
function setPlaying(ctx, on) {
  ctx.playing = on, ctx.$.play.textContent = on ? "\u275A\u275A Pause" : "\u25B6 Play", ctx.$.play.classList.toggle("blue", on), cancelAnimationFrame(ctx.raf), on && (ctx.last = performance.now(), ctx.raf = requestAnimationFrame((n) => tick(ctx, n)));
}
async function stop(ctx) {
  setPlaying(ctx, !1), ctx.elapsed = 0, ctx.$.time.value = 0, ctx.previewing && (ctx.previewing = !1, await call(ctx, "_previewStop").catch(() => {
  })), showInfo(ctx);
}
function ready() {
  this.playing = !1, this.elapsed = 0, this.duration = 0, this.busy = !1, this.previewing = !1, this.$.play.addEventListener("click", () => setPlaying(this, !this.playing)), this.$.reset.addEventListener("click", () => stop(this)), this.$.time.addEventListener("change", (e) => {
    setPlaying(this, !1);
    let d = this.duration > 0 && isFinite(this.duration) ? this.duration : 1;
    this.elapsed = Number(e.target.value) * d, setTime(this, this.elapsed);
  });
}
async function update(dump) {
  this.dump && componentUuids(this.dump)[0] !== componentUuids(dump)[0] && await stop(this), this.dump = dump, renderProps(this, this.$.props, dump);
  let multi = componentUuids(dump).length !== 1;
  if (this.$.play.disabled = multi, this.$.reset.disabled = multi, this.$.time.disabled = multi, multi) {
    this.$.info.textContent = "Select a single node to preview.";
    return;
  }
  try {
    let info = await call(this, "_previewInfo");
    info && (this.duration = info.duration, this.previewing = info.previewing);
  } catch {
  }
  showInfo(this);
}
function close() {
  stop(this);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $,
  close,
  h,
  ready,
  style,
  template,
  update
});
//# sourceMappingURL=spline-animate.js.map
