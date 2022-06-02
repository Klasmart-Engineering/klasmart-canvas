import { IEvent } from 'fabric/fabric-impl';
import { ICanvasObject } from '../objects/canvas-object';

export interface ICanvasMouseEvent extends IEvent {
  target?: ICanvasObject;
}

export interface ICanvasMouseCordsEvent {
  x:number;
  y:number;
}
