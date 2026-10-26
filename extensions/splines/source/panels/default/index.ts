/**
 * Splines panel (Panel > Splines).
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { createSplinesApp, SplinesApp } from './app';
import { editorBridge } from './bridge';

const CSS = readFileSync(join(__dirname, '../../static/style/panel.css'), 'utf8');

const apps = new WeakMap<object, SplinesApp>();

module.exports = Editor.Panel.define({
    template: '<div id="app"></div>',
    style: CSS,
    $: { app: '#app' },
    methods: {},
    ready() {
        apps.set(this, createSplinesApp((this as any).$.app as HTMLElement, editorBridge()));
    },
    close() {
        apps.get(this)?.dispose();
    },
});
