import { ICanvasObject } from '../objects/canvas-object';

export interface IPathTarget extends fabric.Object {
  id?: string;
  stroke: string;
  strokeWidth: number;
  path: ICanvasObject;
  selectable?: boolean;
  evented?: boolean;
  strokeUniform?: boolean;
  top?: number;
  left?: number;
  globalCompositeOperation: string;
  isPartialErased: boolean;
}
