import { ICoordinate } from './coordinate';
import { IBrushType } from './brush-type';
import { ICanvasObject } from '../objects/canvas-object';
import { IShapeIndex } from '../shapes/shape-index';

export interface ICanvasPathBrush extends ICanvasObject {
  basePath: {
    type: IBrushType;
    points: ICoordinate[];
    stroke: string;
    strokeWidth: number;
    fill?: string;
    shape?: keyof IShapeIndex;
  };
}
