import { writeFileSync } from 'fs';
import { join } from 'path';

const NAME = 'splines';

function scene(method: string, ...args: any[]): Promise<any> {
    return Editor.Message.request('scene', 'execute-scene-script', { name: NAME, method, args });
}

export const methods: Record<string, (...args: any[]) => any> = {
    openPanel() {
        Editor.Panel.open(NAME);
    },

    /** Node > Spline > ... */
    async createSpline(kind?: string) {
        try {
            await scene('spCreate', kind || 'draw');
        } catch (e) {
            console.error('[Splines] Could not create the spline (is a scene open?):', e);
        }
    },

    /** Writes what the scene script sees to diagnostics.json in the extension folder. */
    async saveDiagnostics() {
        const file = join(__dirname, '..', 'diagnostics.json');
        let data: any;
        try {
            data = await scene('spDiagnostics');
        } catch (e) {
            data = { error: String(e) };
        }
        writeFileSync(file, JSON.stringify({ time: new Date().toISOString(), editor: Editor.App.version, ...data }, null, 2));
        console.log(`[Splines] Diagnostics saved to ${file}`);
    },

    /** The edit scene process marks itself primary (Play-in-Editor's process only draws). */
    async onSceneReady() {
        try {
            await scene('spPrimary');
        } catch {
            // scene not ready yet
        }
    },
};

export function load() {
    // The scene may already be open when the extension loads.
    setTimeout(() => methods.onSceneReady(), 1500);
}

export function unload() {}
