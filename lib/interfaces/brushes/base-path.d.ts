import { IPenPoint } from './pen-point';
import { ICoordinate } from './coordinate';
import { IBristle } from './bristle';
import { IBrushType } from './brush-type';
export interface IBasePath {
    type: IBrushType;
    points: IPenPoint[] | ICoordinate[];
    stroke: string;
    strokeWidth: number;
    bristles?: IBristle[];
    imageData?: string;
}
