/**
 * Inspector for SplineInstantiate: the component's properties and the
 * Regenerate / Randomize / Clear / Bake buttons (Unity's SplineInstantiate).
 */
import { BASE_STYLE, RendererContext, callComponent, callScene, componentUuids, renderProps } from './shared';

export const template = /* html */ `
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
`;

export const style = BASE_STYLE;

export const $ = {
    props: '.props',
    regen: '.regen',
    seed: '.seed',
    clear: '.clear',
    bake: '.bake',
    status: '.status',
};

export function ready(this: RendererContext) {
    this.$.regen.addEventListener('click', () => callComponent(this, 'updateInstances', [], false));
    this.$.seed.addEventListener('click', () => callComponent(this, 'randomizeSeed', [], true));
    this.$.clear.addEventListener('click', () => callComponent(this, 'clear', [], false));
    this.$.bake.addEventListener('click', async () => {
        const ids = componentUuids(this.dump);
        if (ids.length !== 1) return;
        (this.$.bake as any).disabled = true;
        this.$.status.textContent = 'Baking…';
        try {
            const r = await callScene('spBakeInstances', ids[0]);
            this.$.status.textContent = r?.count
                ? `Baked ${r.count} instance${r.count === 1 ? '' : 's'}. The component was disabled.`
                : 'Nothing to bake: add prefabs and a container.';
        } catch (e) {
            this.$.status.textContent = `Bake failed: ${e}`;
        } finally {
            (this.$.bake as any).disabled = false;
        }
    });
}

export function update(this: RendererContext, dump: any) {
    this.dump = dump;
    renderProps(this, this.$.props, dump);
    (this.$.bake as any).disabled = componentUuids(dump).length !== 1;
}

export function close(this: RendererContext) {}
