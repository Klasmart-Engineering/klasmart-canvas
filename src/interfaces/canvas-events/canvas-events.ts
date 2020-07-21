import { Point } from "fabric/fabric-impl"

/**
 * Model for fabricjs mouse events.
 */
export default interface CanvasEvent {
  e: MouseEvent;
  absolutePointer: Point;
  button: number;
  isClick: boolean;
  pointer: { x: number; y: number};
  subTargets: any[]
  target: any;
  transform: any;
}
