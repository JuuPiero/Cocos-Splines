import { _decorator, ccenum, Quat, Vec3 } from 'cc';
import { DEFAULT_TENSION, KnotLike, TangentMode } from '../core/spline-core';

const { ccclass, property } = _decorator;

ccenum(TangentMode);

/**
 * A control point of a spline: a position, a rotation and two tangents.
 *
 * Tangents are in the knot's own space: +Z is the direction the spline
 * travels through the knot and +Y is the knot's up vector. How the tangents
 * are kept depends on `mode` (see TangentMode).
 */
@ccclass('splines.BezierKnot')
export class BezierKnot implements KnotLike {
    @property({ tooltip: 'Position in the spline container’s local space.' })
    position = new Vec3();

    @property({ tooltip: 'In tangent, in the knot’s space (points backwards along -Z).' })
    tangentIn = new Vec3();

    @property({ tooltip: 'Out tangent, in the knot’s space (points forwards along +Z).' })
    tangentOut = new Vec3();

    @property({ tooltip: 'Knot rotation: +Z is the direction of travel, +Y the up vector.' })
    rotation = new Quat();

    @property({ type: TangentMode, tooltip: 'How the tangents are kept.' })
    mode: TangentMode = TangentMode.AutoSmooth;

    @property({ range: [0, 1, 0.01], slide: true, tooltip: 'Auto Smooth tension (0 uniform, 0.5 centripetal, 1 chordal).' })
    tension = DEFAULT_TENSION;

    constructor(position?: Readonly<Vec3>, tangentIn?: Readonly<Vec3>, tangentOut?: Readonly<Vec3>, rotation?: Readonly<Quat>, mode?: TangentMode) {
        if (position) this.position.set(position);
        if (tangentIn) this.tangentIn.set(tangentIn);
        if (tangentOut) this.tangentOut.set(tangentOut);
        if (rotation) this.rotation.set(rotation);
        if (mode !== undefined) this.mode = mode;
    }

    clone(): BezierKnot {
        const k = new BezierKnot(this.position, this.tangentIn, this.tangentOut, this.rotation, this.mode);
        k.tension = this.tension;
        return k;
    }
}

export { TangentMode };
