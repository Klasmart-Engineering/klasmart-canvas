import { IPenPoint } from './pen-point';
import { ICoordinate } from './coordinate';

export interface IBrushSyncTarget {
  basePath: {
    points: IPenPoint[] | ICoordinate[];
    stroke: string;
    strokeWidth: number;
  };
}
