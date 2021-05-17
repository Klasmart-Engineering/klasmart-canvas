import { ICoordinate } from './coordinate';
import { IBrushType } from './brush-type';
import { ICanvasObject } from '../objects/canvas-object';
export interface ICanvasPathBrush extends ICanvasObject {
    basePath: {
        type: IBrushType;
        points: ICoordinate[];
        stroke: string;
        strokeWidth: number;
        imageData?: string;
    };
}
