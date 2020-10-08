import { ICanvasObject } from '../objects/canvas-object';

export interface IPathTarget {
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
  bringToFront: () => void;
  isPartialErased: boolean;
}
