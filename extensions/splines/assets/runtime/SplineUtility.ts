import { Vec3 } from 'cc';
import { Spline, splineFactory, PathIndexUnit } from './Spline';
import { buildShape, ShapeOptions } from '../core/spline-core';

export type SplineShape = 'line' | 'square' | 'rounded-square' | 'circle' | 'polygon' | 'star' | 'helix';

/**
 * Static helpers in the style of Unity's SplineUtility / SplineFactory.
 * All positions are in the spline's local space; t is a normalized distance.
 */
export class SplineUtility {
    static evaluatePosition(spline: Spline, t: number, out = new Vec3()): Vec3 {
        return spline.evaluatePosition(t, out);
    }

    static evaluateTangent(spline: Spline, t: number, out = new Vec3()): Vec3 {
        return spline.evaluateTangent(t, out);
    }

    static evaluateDirection(spline: Spline, t: number, out = new Vec3()): Vec3 {
        return spline.evaluateDirection(t, out);
    }

    static evaluateUpVector(spline: Spline, t: number, out = new Vec3()): Vec3 {
        return spline.evaluateUpVector(t, out);
    }

    static calculateLength(spline: Spline): number {
        return spline.getLength();
    }

    static getNearestPoint(spline: Spline, point: Readonly<Vec3>): { t: number; position: Vec3; distance: number } {
        return spline.getNearestPoint(point);
    }

    /** The point `distance` along the spline from `fromT` (negative goes back). */
    static getPointAtDistance(spline: Spline, fromT: number, distance: number, out = new Vec3()): { t: number; position: Vec3 } {
        const t = spline.getTAtDistance(fromT, distance);
        return { t, position: spline.evaluatePosition(t, out) };
    }

    static convertIndexUnit(spline: Spline, value: number, from: PathIndexUnit, to: PathIndexUnit): number {
        return spline.convertIndexUnit(value, from, to);
    }

    /**
     * A new spline in a template shape (like Unity's SplineFactory).
     * `size` is the half width / radius; `plane2D` lays it in XY instead of XZ.
     */
    static createShape(shape: SplineShape, options: Partial<ShapeOptions> = {}): Spline {
        const s = new Spline();
        buildShape(s, shape, { size: 1, ...options }, splineFactory);
        s.markDirty();
        return s;
    }

    /** Fills an existing spline with a template shape. */
    static setShape(spline: Spline, shape: SplineShape, options: Partial<ShapeOptions> = {}): void {
        buildShape(spline, shape, { size: 1, ...options }, splineFactory);
        spline.markDirty();
    }
}

export { PathIndexUnit };
