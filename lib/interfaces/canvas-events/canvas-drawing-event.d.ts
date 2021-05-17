import { IEvent } from 'fabric/fabric-impl';
import { IPathTarget } from './path-target';
export interface ICanvasDrawingEvent extends IEvent {
    path?: IPathTarget;
}
