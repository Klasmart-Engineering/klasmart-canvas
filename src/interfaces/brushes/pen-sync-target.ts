import { IPenPoint } from './pen-point';

export interface IPenSyncTarget {
  basePath: {
    points: IPenPoint[];
    stroke: string;
    strokeWidth: number;
  };
}
