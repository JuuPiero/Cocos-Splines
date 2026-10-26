/* Bundles tests/preview/harness.ts into a standalone page (no Cocos needed). */
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const out = path.join(__dirname, 'out');
fs.mkdirSync(out, { recursive: true });

esbuild.build({
    entryPoints: [path.join(__dirname, 'harness.ts')],
    bundle: true,
    format: 'iife',
    target: 'es2019',
    outfile: path.join(out, 'harness.js'),
    alias: { vue: 'vue/dist/vue.esm-bundler.js' },
    define: { __VUE_OPTIONS_API__: 'true', __VUE_PROD_DEVTOOLS__: 'false', __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false', 'process.env.NODE_ENV': '"development"' },
    logLevel: 'warning',
}).then(() => {
    const css = fs.readFileSync(path.join(root, 'static/style/panel.css'), 'utf8').replace(/:host/g, '#panel');
    fs.writeFileSync(path.join(out, 'preview.html'), `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Splines preview</title>
<style>
:root {
    --color-normal-fill: #232323; --color-normal-fill-emphasis: #2c2c2c; --color-normal-border: #171717;
    --color-normal-contrast: #ccc; --color-normal-contrast-weaker: #999; --color-warn-fill: #d9a33a;
}
html, body { margin: 0; background: #232323; font-family: sans-serif; color: #ccc; font-size: 12px; }
.cols { display: flex; gap: 12px; padding: 8px; align-items: flex-start; }
#panel { width: 320px; border: 1px solid #111; }
#inspector { width: 380px; border: 1px solid #111; padding: 6px; }
#result { white-space: pre; font: 12px monospace; padding: 8px; color: #ccc; }
${css}
</style>
</head>
<body>
<div class="cols"><div id="panel"></div><div id="inspector"></div></div>
<script src="harness.js"></script>
</body>
</html>
`);
    console.log('wrote', path.join(out, 'preview.html'));
}).catch(() => process.exit(1));
