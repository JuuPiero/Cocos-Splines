/**
 * Inspector for SplineAnimate: the component's properties and a preview
 * (play / pause / scrub in the editor). The preview moves the object and puts
 * it back when it stops, like Unity's SplineAnimate preview.
 */
import { BASE_STYLE, RendererContext, componentUuids, h, renderProps, sceneTarget } from './shared';

export const template = /* html */ `
<div class="sp-animate-inspector">
    <div class="props"></div>
    <div class="sp-section">
        <div class="sp-bar">
            <ui-button class="play" title="Preview in the editor">▶ Play</ui-button>
            <ui-button class="reset" title="Stop the preview and put the object back">■ Reset</ui-button>
        </div>
        <div class="sp-bar" style="margin-top:4px">
            <ui-slider class="time" min="0" max="1" step="0.001" value="0" style="flex:1"></ui-slider>
        </div>
        <div class="sp-note info"></div>
    </div>
</div>
`;

export const style = BASE_STYLE;

export const $ = {
    props: '.props',
    play: '.play',
    reset: '.reset',
    time: '.time',
    info: '.info',
};

type Ctx = RendererContext & {
    playing: boolean;
    elapsed: number;
    duration: number;
    raf: number;
    last: number;
    busy: boolean;
    previewing: boolean;
};

function uuid(ctx: Ctx): string | null {
    const ids = componentUuids(ctx.dump);
    return ids.length === 1 ? ids[0] : null;
}

async function call(ctx: Ctx, name: string, args: any[] = []): Promise<any> {
    const id = uuid(ctx);
    if (!id) return null;
    return Editor.Message.request(sceneTarget(ctx) as any, 'execute-component-method', { uuid: id, name, args });
}

function showInfo(ctx: Ctx, normalized?: number): void {
    const d = ctx.duration;
    const t = normalized === undefined ? '' : ` · t = ${(normalized % 1 || (normalized >= 1 ? 1 : 0)).toFixed(3)}`;
    ctx.$.info.textContent = !isFinite(d) || d <= 0
        ? 'Set a container (and a duration or speed) to preview.'
        : `${ctx.elapsed.toFixed(2)}s / ${d.toFixed(2)}s${t}${ctx.previewing ? ' · previewing' : ''}`;
}

async function setTime(ctx: Ctx, seconds: number): Promise<void> {
    if (ctx.busy) return;
    ctx.busy = true;
    try {
        const r = await call(ctx, '_previewSetTime', [seconds]);
        ctx.previewing = true;
        if (r) {
            ctx.duration = r.duration;
            const slider = ctx.$.time as any;
            if (isFinite(r.duration) && r.duration > 0) slider.value = (seconds % r.duration) / r.duration;
            showInfo(ctx, r.normalizedTime);
        }
    } catch {
        // component gone
    } finally {
        ctx.busy = false;
    }
}

function tick(ctx: Ctx, now: number): void {
    if (!ctx.playing) return;
    const dt = Math.min(0.1, (now - ctx.last) / 1000);
    ctx.last = now;
    ctx.elapsed += dt;
    setTime(ctx, ctx.elapsed);
    ctx.raf = requestAnimationFrame((n) => tick(ctx, n));
}

function setPlaying(ctx: Ctx, on: boolean): void {
    ctx.playing = on;
    (ctx.$.play as any).textContent = on ? '❚❚ Pause' : '▶ Play';
    ctx.$.play.classList.toggle('blue', on);
    cancelAnimationFrame(ctx.raf);
    if (on) {
        ctx.last = performance.now();
        ctx.raf = requestAnimationFrame((n) => tick(ctx, n));
    }
}

async function stop(ctx: Ctx): Promise<void> {
    setPlaying(ctx, false);
    ctx.elapsed = 0;
    (ctx.$.time as any).value = 0;
    if (ctx.previewing) {
        ctx.previewing = false;
        await call(ctx, '_previewStop').catch(() => undefined);
    }
    showInfo(ctx);
}

export function ready(this: Ctx) {
    this.playing = false;
    this.elapsed = 0;
    this.duration = 0;
    this.busy = false;
    this.previewing = false;
    this.$.play.addEventListener('click', () => setPlaying(this, !this.playing));
    this.$.reset.addEventListener('click', () => stop(this));
    this.$.time.addEventListener('change', (e: any) => {
        setPlaying(this, false);
        const d = this.duration > 0 && isFinite(this.duration) ? this.duration : 1;
        this.elapsed = Number(e.target.value) * d;
        setTime(this, this.elapsed);
    });
}

export async function update(this: Ctx, dump: any) {
    const changedComponent = this.dump && componentUuids(this.dump)[0] !== componentUuids(dump)[0];
    if (changedComponent) await stop(this);
    this.dump = dump;
    renderProps(this, this.$.props, dump);
    const multi = componentUuids(dump).length !== 1;
    (this.$.play as any).disabled = multi;
    (this.$.reset as any).disabled = multi;
    (this.$.time as any).disabled = multi;
    if (multi) {
        this.$.info.textContent = 'Select a single node to preview.';
        return;
    }
    try {
        const info = await call(this, '_previewInfo');
        if (info) {
            this.duration = info.duration;
            this.previewing = info.previewing;
        }
    } catch {
        // scene busy
    }
    showInfo(this);
}

export function close(this: Ctx) {
    stop(this);
}

export { h };
