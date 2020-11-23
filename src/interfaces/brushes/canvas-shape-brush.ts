import { IBrushType } from './brush-type';
import { ICoordinate } from './coordinate';
import { ICanvasObject } from '../objects/canvas-object';
import { IBristle } from './bristle';
import { IShapeIndex } from '../shapes/shape-index';

export interface ICanvasShapeBrush extends ICanvasObject {
  name: string;
  basePath: {
    type: IBrushType;
    points: ICoordinate[];
    stroke: string;
    strokeWidth: number;
    bristles?: IBristle[];
    imageData?: string;
    fill?: string;
    shape?: keyof IShapeIndex;
  };
}
