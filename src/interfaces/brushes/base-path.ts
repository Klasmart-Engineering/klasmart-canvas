import { IPenPoint } from './pen-point';
import { ICoordinate } from './coordinate';
import { IBristle } from './bristle';
import { IBrushType } from './brush-type';
import { IShapeIndex } from '../shapes/shape-index';

export interface IBasePath {
  type: IBrushType;
  points: IPenPoint[] | ICoordinate[];
  stroke: string;
  strokeWidth: number;
  fill?: string;
  bristles?: IBristle[];
  imageData?: string;
  shape?: keyof IShapeIndex;
}
