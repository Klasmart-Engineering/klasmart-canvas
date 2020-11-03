import { IPenPoint } from './pen-point';
import { ICoordinate } from './coordinate';
import { IBristle } from './bristle';
import { IClearRect } from './clear-rects';

export interface ICanvasBrush extends fabric.Group {
  id?: string;
  basePath?: {
    type: 'pen' | 'marker' | 'felt' | 'paintbrush' | 'crayon' | 'chalk';
    points: IPenPoint[] | ICoordinate[];
    stroke: string;
    strokeWidth: number;
    bristles?: IBristle[];
    clearRects?: IClearRect[];
  };
}
