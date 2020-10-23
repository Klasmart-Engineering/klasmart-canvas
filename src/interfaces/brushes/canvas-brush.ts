import { IPenPoint } from './pen-point';

export interface ICanvasBrush extends fabric.Group {
  id?: string;
  basePath?: {
    points: IPenPoint[];
    stroke: string;
    strokeWidth: number;
  };
}
