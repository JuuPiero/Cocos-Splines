import { _decorator, Component, ccenum, EventHandler, Quat, Vec3 } from 'cc';
import { EDITOR } from 'cc/env';
import { SplineContainer } from './SplineContainer';

const { ccclass, property, menu } = _decorator;

export enum SplineAnimateMethod {
    /** Travel the spline in `duration` seconds. */
    Time = 0,
    /** Travel at `maxSpeed` units per second. */
    Speed = 1,
}

export enum SplineAnimateLoopMode {
    /** Play once and stop at the end. */
    Once = 0,
    /** Restart from the beginning at the end. */
    Loop = 1,
    /** Ease in on the first loop only, then loop at constant speed. */
    LoopEaseInOnce = 2,
    /** Go back and forth. */
    PingPong = 3,
}

export enum SplineAnimateEasing {
    None = 0,
    EaseIn = 1,
    EaseOut = 2,
    EaseInOut = 3,
}

export enum SplineAnimateAlignment {
    /** Keep the object's rotation. */
    None = 0,
    /** Face along the spline, using the spline's up vector. */
    SplineElement = 1,
    /** Match the spline container's rotation. */
    SplineObject = 2,
    /** Match the world axes. */
    World = 3,
}

export enum AlignAxis {
    XAxis = 0,
    YAxis = 1,
    ZAxis = 2,
    NegativeXAxis = 3,
    NegativeYAxis = 4,
    NegativeZAxis = 5,
}

ccenum(SplineAnimateMethod);
ccenum(SplineAnimateLoopMode);
ccenum(SplineAnimateEasing);
ccenum(SplineAnimateAlignment);
ccenum(AlignAxis);

const AXES = [
    new Vec3(1, 0, 0), new Vec3(0, 1, 0), new Vec3(0, 0, 1),
    new Vec3(-1, 0, 0), new Vec3(0, -1, 0), new Vec3(0, 0, -1),
];

const _pos = new Vec3();
const _fwd = new Vec3();
const _up = new Vec3();
const _rot = new Quat();
const _remap = new Quat();

function easeIn(t: number) {
    return t * t;
}
function easeOut(t: number) {
    return t * (2 - t);
}
function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function pingPong(t: number, length: number) {
    const l2 = length * 2;
    const m = ((t % l2) + l2) % l2;
    return length - Math.abs(m - length);
}

const _lf = new Vec3();
const _lu = new Vec3();

/** Look rotation with +Z = forward and +Y = up (like Unity's Quaternion.LookRotation). */
function lookRotation(out: Quat, forward: Readonly<Vec3>, up: Readonly<Vec3>): Quat {
    return Quat.fromViewUp(out, Vec3.normalize(_lf, forward), Vec3.normalize(_lu, up));
}

/**
 * Moves its node along a spline (Unity's SplineAnimate).
 *
 * Node events: 'spline-animate-updated' (position, rotation) every update
 * and 'spline-animate-completed' when a run ends or a loop wraps.
 */
@ccclass('SplineAnimate')
@menu('Splines/SplineAnimate')
export class SplineAnimate extends Component {
    static readonly EventType = {
        UPDATED: 'spline-animate-updated',
        COMPLETED: 'spline-animate-completed',
    };

    @property({ type: SplineContainer, tooltip: 'The spline container to follow.' })
    container: SplineContainer | null = null;

    @property({ tooltip: 'Which spline of the container to follow.', min: 0, step: 1 })
    splineIndex = 0;

    @property({ tooltip: 'Start playing when the component starts.' })
    playOnAwake = true;

    @property({ type: SplineAnimateMethod, tooltip: 'Time: travel the spline in a set duration. Speed: travel at a set speed.' })
    get method(): SplineAnimateMethod {
        return this._method;
    }
    set method(v: SplineAnimateMethod) {
        this._method = v;
    }

    @property({ tooltip: 'Seconds to travel the spline once.', min: 0, visible(this: SplineAnimate) { return this._method === SplineAnimateMethod.Time; } })
    get duration(): number {
        return this._duration;
    }
    set duration(v: number) {
        this._duration = Math.max(0, v);
    }

    @property({ tooltip: 'Speed in units per second.', min: 0, visible(this: SplineAnimate) { return this._method === SplineAnimateMethod.Speed; } })
    get maxSpeed(): number {
        return this._maxSpeed;
    }
    set maxSpeed(v: number) {
        this._maxSpeed = Math.max(0, v);
    }

    @property({ type: SplineAnimateEasing, tooltip: 'Speed curve of each run.' })
    easing = SplineAnimateEasing.None;

    @property({ type: SplineAnimateLoopMode, tooltip: 'What happens at the end of the spline.' })
    loopMode = SplineAnimateLoopMode.Loop;

    @property({ type: SplineAnimateAlignment, tooltip: 'How the object rotates while it moves.' })
    alignment = SplineAnimateAlignment.SplineElement;

    @property({ type: AlignAxis, tooltip: 'The object axis that points along the spline (Z for 3D models, X for 2D sprites).' })
    objectForwardAxis = AlignAxis.ZAxis;

    @property({ type: AlignAxis, tooltip: 'The object axis that points along the spline’s up vector.' })
    objectUpAxis = AlignAxis.YAxis;

    @property({ range: [0, 1, 0.01], slide: true, tooltip: 'Where on the spline to start (0..1 of its length).' })
    startOffset = 0;

    @property({ type: [EventHandler], tooltip: 'Called when a run ends or a loop wraps.' })
    completedEvents: EventHandler[] = [];

    @property
    private _method = SplineAnimateMethod.Time;
    @property
    private _duration = 1;
    @property
    private _maxSpeed = 10;

    private _elapsed = 0;
    private _lastElapsed = 0;
    private _playing = false;
    private _normalizedTime = 0;
    private _endReached = false;
    private _previewOrigin: { position: Vec3; rotation: Quat } | null = null;

    get isPlaying(): boolean {
        return this._playing;
    }

    /** Seconds since the start (including loops). */
    get elapsedTime(): number {
        return this._elapsed;
    }

    set elapsedTime(v: number) {
        this._elapsed = Math.max(0, v);
        this.evaluateTime();
        this.applyTransform();
    }

    /** Progress along the spline; the integer part counts completed loops. */
    get normalizedTime(): number {
        return this._normalizedTime;
    }

    set normalizedTime(v: number) {
        const d = this.currentDuration();
        this._elapsed = Math.max(0, v) * d;
        this.evaluateTime();
        this.applyTransform();
    }

    start() {
        if (this.playOnAwake) this.play();
        else this.applyTransform();
    }

    update(dt: number) {
        if (!this._playing) return;
        this._elapsed += dt;
        this.evaluateTime();
        this.applyTransform();
    }

    play(): void {
        this._playing = true;
    }

    pause(): void {
        this._playing = false;
    }

    /** Back to the start; keeps playing if `autoplay`. */
    restart(autoplay = true): void {
        this._elapsed = 0;
        this._lastElapsed = 0;
        this._normalizedTime = 0;
        this._endReached = false;
        this._playing = autoplay;
        this.applyTransform();
    }

    /** Length of the followed spline in world units. */
    get splineLength(): number {
        return this.container ? this.container.calculateLength(this.splineIndex) : 0;
    }

    /** Duration of one run (Speed mode converts the speed into a duration). */
    currentDuration(): number {
        if (this._method === SplineAnimateMethod.Time) return this._duration;
        if (this._maxSpeed <= 0) return Infinity;
        const base = this.splineLength / this._maxSpeed;
        // Eased runs reach twice the average speed; keep the peak at maxSpeed.
        return this.easing === SplineAnimateEasing.None ? base : base * 2;
    }

    /** Spline t (0..1) for the current time, after looping, easing and the start offset. */
    getSplineT(): number {
        let t = this._normalizedTime % 1;
        if (this._normalizedTime >= 1 && t === 0 && this.loopMode === SplineAnimateLoopMode.Once) t = 1;
        t += this.startOffset;
        return t > 1 ? (this.container?.splines[this.splineIndex]?.closed ? t % 1 : Math.min(t, 1)) : t;
    }

    private evaluateTime(): void {
        let duration = this.currentDuration();
        if (!(duration > 0) || !isFinite(duration)) {
            this._normalizedTime = 0;
            return;
        }
        // A loop wrapped (or a ping-pong turned) since the last evaluation.
        if (this.loopMode !== SplineAnimateLoopMode.Once && this._elapsed > this._lastElapsed
            && Math.floor(this._elapsed / duration) > Math.floor(this._lastElapsed / duration)) {
            this._endReached = true;
        }
        this._lastElapsed = this._elapsed;
        let t = 0;
        const easeFirst = this.easing === SplineAnimateEasing.EaseIn || this.easing === SplineAnimateEasing.EaseInOut;
        switch (this.loopMode) {
            case SplineAnimateLoopMode.Once:
                t = Math.min(this._elapsed, duration);
                break;
            case SplineAnimateLoopMode.Loop:
                t = this._elapsed % duration;
                break;
            case SplineAnimateLoopMode.LoopEaseInOnce:
                // After an eased-in first run, constant speed takes half as long.
                if (easeFirst && this._elapsed >= duration) duration *= 0.5;
                t = this._elapsed % duration;
                break;
            case SplineAnimateLoopMode.PingPong:
                t = pingPong(this._elapsed, duration);
                break;
        }
        t /= duration;
        if (this.loopMode === SplineAnimateLoopMode.LoopEaseInOnce) {
            if (easeFirst && this._elapsed < duration) t = easeIn(t);
        } else {
            switch (this.easing) {
                case SplineAnimateEasing.EaseIn: t = easeIn(t); break;
                case SplineAnimateEasing.EaseOut: t = easeOut(t); break;
                case SplineAnimateEasing.EaseInOut: t = easeInOut(t); break;
            }
        }
        const loops = Math.floor(this._elapsed / duration);
        this._normalizedTime = this.loopMode === SplineAnimateLoopMode.Once ? Math.min(1, t) : loops + t;
        if (this.loopMode === SplineAnimateLoopMode.Once && this._elapsed >= duration) {
            this._normalizedTime = 1;
            if (this._playing) {
                this._playing = false;
                this._endReached = true;
            }
        }
    }

    /** World position and rotation for the current time. */
    evaluatePositionAndRotation(outPosition = new Vec3(), outRotation = new Quat()): boolean {
        const c = this.container;
        if (!c || !c.splines[this.splineIndex]) return false;
        const t = this.getSplineT();
        c.evaluatePosition(t, this.splineIndex, outPosition);
        if (this.alignment === SplineAnimateAlignment.None) {
            outRotation.set(this.node.worldRotation);
            return true;
        }
        const fwdAxis = AXES[this.objectForwardAxis] ?? AXES[2];
        let upAxis = AXES[this.objectUpAxis] ?? AXES[1];
        if (Math.abs(Vec3.dot(fwdAxis, upAxis)) > 0.99) upAxis = Math.abs(fwdAxis.y) > 0.99 ? AXES[2] : AXES[1];
        Quat.invert(_remap, lookRotation(_remap, fwdAxis, upAxis));
        switch (this.alignment) {
            case SplineAnimateAlignment.SplineElement:
                c.evaluateDirection(t, this.splineIndex, _fwd);
                c.evaluateUpVector(t, this.splineIndex, _up);
                break;
            case SplineAnimateAlignment.SplineObject:
                Vec3.transformQuat(_fwd, Vec3.UNIT_Z, c.node.worldRotation);
                Vec3.transformQuat(_up, Vec3.UNIT_Y, c.node.worldRotation);
                break;
            default:
                _fwd.set(0, 0, 1);
                _up.set(0, 1, 0);
                break;
        }
        lookRotation(outRotation, _fwd, _up);
        Quat.multiply(outRotation, outRotation, _remap);
        return true;
    }

    private applyTransform(): void {
        if (!this.evaluatePositionAndRotation(_pos, _rot)) return;
        this.node.setWorldPosition(_pos);
        if (this.alignment !== SplineAnimateAlignment.None) this.node.setWorldRotation(_rot);
        this.node.emit(SplineAnimate.EventType.UPDATED, _pos, _rot);
        if (this._endReached) {
            this._endReached = false;
            this.node.emit(SplineAnimate.EventType.COMPLETED, this);
            EventHandler.emitEvents(this.completedEvents, this);
        }
    }

    // ----------------------------------------------------- editor preview

    /** Editor preview: shows the object at `seconds` (the original transform is kept for _previewStop). */
    _previewSetTime(seconds: number): { normalizedTime: number; duration: number } {
        if (!this._previewOrigin) {
            this._previewOrigin = { position: this.node.worldPosition.clone(), rotation: this.node.worldRotation.clone() };
        }
        this._elapsed = Math.max(0, seconds);
        this.evaluateTime();
        this._endReached = false;
        this.applyTransform();
        return { normalizedTime: this._normalizedTime, duration: this.currentDuration() };
    }

    /** Editor preview: puts the object back where it was. */
    _previewStop(): void {
        if (this._previewOrigin) {
            this.node.setWorldPosition(this._previewOrigin.position);
            this.node.setWorldRotation(this._previewOrigin.rotation);
            this._previewOrigin = null;
        }
        this._elapsed = 0;
        this._normalizedTime = 0;
    }

    _previewInfo(): { duration: number; length: number; previewing: boolean } {
        return { duration: this.currentDuration(), length: this.splineLength, previewing: !!this._previewOrigin };
    }

    onDisable() {
        if (EDITOR) this._previewStop();
    }
}
