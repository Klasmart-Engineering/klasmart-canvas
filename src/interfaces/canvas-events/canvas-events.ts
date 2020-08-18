import { Point, IEvent } from 'fabric/fabric-impl';
import { ICanvasObject } from '../objects/canvas-object';

/**
 * Model for fabricjs mouse events.
 */
export default interface CanvasEvent extends IEvent {
  pointer?: Point;
  target?: ICanvasObject;
}
