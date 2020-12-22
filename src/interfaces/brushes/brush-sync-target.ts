import { IPenPoint } from './pen-point';
import { ICoordinate } from './coordinate';
import { IBristle } from './bristle';

export interface IBrushSyncTarget {
  basePath: {
    points: IPenPoint[] | ICoordinate[];
    stroke: string;
    strokeWidth: number;
    bristles?: IBristle[];
    imageData?: string;
  };
}
