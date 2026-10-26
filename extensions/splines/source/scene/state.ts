/**
 * Editing state shared by the scene script's modules.
 */
import { ElementRef, ElementSelection } from './model';
import { V3 } from '../../assets/core/math';
import { TangentMode } from '../../assets/core/spline-core';

export type Tool = 'select' | 'draw';
export type Orientation = 'global' | 'local' | 'element';

export interface Settings {
    /** Draw splines of unselected nodes too. */
    showAll: boolean;
    /** Arrows showing the direction of travel. */
    showFlow: boolean;
    /** Tangent handles of every knot, not only the selected ones. */
    showAllTangents: boolean;
    /** Knot index labels. */
    showKnotIndices: boolean;
    /** Up vectors along the spline. */
    showNormals: boolean;
    /** Mode of knots placed with the Draw tool (AutoSmooth or Linear). */
    defaultMode: number;
    /** Place drawn knots on scene geometry under the mouse. */
    drawOnSurfaces: boolean;
    /** Handle orientation for knot editing. */
    orientation: Orientation;
}

export const DEFAULT_SETTINGS: Settings = {
    showAll: true,
    showFlow: true,
    showAllTangents: false,
    showKnotIndices: false,
    showNormals: false,
    defaultMode: TangentMode.AutoSmooth,
    drawOnSurfaces: true,
    orientation: 'global',
};

export type HandleAxis = 'x' | 'y' | 'z' | 'xy' | 'yz' | 'xz' | 'view' | 'free';

export type Hit =
    | { kind: 'handle'; axis: HandleAxis }
    | { kind: 'knot'; ref: ElementRef }
    | { kind: 'tangent'; ref: ElementRef }
    | { kind: 'curve'; comp: any; spline: number; curve: number; t: number; world: V3 };

export interface DrawState {
    comp: any;
    spline: number;
    /** Knots are added after the last knot ('end') or before the first ('start'). */
    end: 'start' | 'end';
}

export const S = {
    /** This process is the edit scene (Play-in-Editor's process only draws). */
    primary: false,
    hooked: false,
    /** Spline editing context is on (Unity's spline tool context). */
    context: false,
    tool: 'select' as Tool,
    selection: new ElementSelection(),
    hover: null as Hit | null,
    /** Spline being drawn by the Draw tool. */
    drawing: null as DrawState | null,
    /** Index (in the edited containers) of the container the Draw tool adds to. */
    drawTarget: 0,
    /** Draw tool preview position (world). */
    preview: null as V3 | null,
    settings: { ...DEFAULT_SETTINGS },
    /** Last time a delete key went through the scene view. */
    deleteKeyAt: 0,
    selectAllKeyAt: 0,
    /** Replaying a click into the editor's own handlers. */
    replaying: false,
    lastTargets: [] as any[],
    /** Enter the context (with a tool) when this container becomes selected. */
    pendingContext: null as { comp: any; tool: Tool; until: number } | null,
    targetsKey: '',
    stateVersion: 0,
    diag: {
        draws: 0,
        mouseDowns: 0,
        blocked: 0,
        errors: [] as string[],
    },
};

export function note(msg: string): void {
    S.diag.errors.push(`${new Date().toISOString()} ${msg}`);
    if (S.diag.errors.length > 30) S.diag.errors.shift();
}

export function bumpState(): void {
    S.stateVersion++;
}
