/**
 * Inspector for SplineExtrude: the component's properties and a Rebuild button.
 */
import { BASE_STYLE, RendererContext, callComponent, renderProps } from './shared';

export const template = /* html */ `
<div class="sp-extrude-inspector">
    <div class="props"></div>
    <div class="sp-warn nomat" hidden>No material: a default material is used in the editor only. Assign one for builds.</div>
    <div class="sp-section">
        <div class="sp-bar">
            <ui-button class="rebuild" title="Generate the mesh again">Rebuild Mesh</ui-button>
        </div>
        <div class="sp-note">The mesh is generated from the spline (not saved with the scene) and rebuilt when the spline changes.</div>
    </div>
</div>
`;

export const style = BASE_STYLE;

export const $ = {
    props: '.props',
    rebuild: '.rebuild',
    nomat: '.nomat',
};

export function ready(this: RendererContext) {
    this.$.rebuild.addEventListener('click', () => callComponent(this, 'rebuild', [], false));
}

export function update(this: RendererContext, dump: any) {
    this.dump = dump;
    renderProps(this, this.$.props, dump);
    const mat = dump?.value?.material?.value;
    (this.$.nomat as HTMLElement).hidden = !!(mat && mat.uuid);
}

export function close(this: RendererContext) {}
