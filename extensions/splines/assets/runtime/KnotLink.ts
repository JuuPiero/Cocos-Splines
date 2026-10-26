import { _decorator, CCInteger } from 'cc';
import { LinkLike } from '../core/spline-core';

const { ccclass, property } = _decorator;

/**
 * A group of linked knots: knots that always share one position, possibly
 * on different splines of the same container. Stored as flattened
 * (splineIndex, knotIndex) pairs.
 */
@ccclass('splines.KnotLink')
export class KnotLink implements LinkLike {
    @property({ type: [CCInteger] })
    knots: number[] = [];
}
