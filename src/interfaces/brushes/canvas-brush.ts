import { IPenPoint } from './pen-point';
import { ICoordinate } from './coordinate';
import { IBristle } from './bristle';
import { IBrushType } from './brush-type';

export interface ICanvasBrush extends fabric.Group {
  id?: string;
  basePath?: {
    type: IBrushType;
    points: IPenPoint[] | ICoordinate[];
    stroke: string;
    strokeWidth: number;
    bristles?: IBristle[];
    imageData?: string;
    fill?: string;
  };
}
