/**
 * Splines for Cocos Creator: import everything from 'db://splines/index'.
 */
export { BezierKnot, TangentMode } from './runtime/BezierKnot';
export { Spline, PathIndexUnit } from './runtime/Spline';
export { KnotLink } from './runtime/KnotLink';
export { SplineContainer } from './runtime/SplineContainer';
export type { SplineSample } from './runtime/SplineContainer';
export {
    SplineAnimate, SplineAnimateMethod, SplineAnimateLoopMode, SplineAnimateEasing, SplineAnimateAlignment, AlignAxis,
} from './runtime/SplineAnimate';
export { SplineExtrude, ExtrudeShape } from './runtime/SplineExtrude';
export {
    SplineInstantiate, InstantiableItem, InstantiateOffset, InstantiateMethod, InstantiateSpace, OffsetSpace,
} from './runtime/SplineInstantiate';
export type { Placement } from './runtime/SplineInstantiate';
export { SplineUtility } from './runtime/SplineUtility';
export type { SplineShape } from './runtime/SplineUtility';
export type { KnotRef } from './core/spline-core';
