import { IPenPoint } from './pen-point';
import { ICoordinate } from './coordinate';

export interface ICanvasBrush extends fabric.Group {
  id?: string;
  basePath?: {
    type: 'pen' | 'marker';
    points: IPenPoint[] | ICoordinate[];
    stroke: string;
    strokeWidth: number;
  };
}
