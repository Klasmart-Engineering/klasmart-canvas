import { IBrushType } from './brush-type';
import { ICoordinate } from './coordinate';
import { ICanvasObject } from '../objects/canvas-object';
import { IBristle } from './bristle';

export interface ICanvasShapeBrush extends ICanvasObject {
  name: string;
  basePath: {
    type: IBrushType;
    points: ICoordinate[];
    stroke: string;
    strokeWidth: number;
    bristles?: IBristle[];
  };
}
