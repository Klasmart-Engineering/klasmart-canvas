import { Point2D } from './Point2D';
import { BrushParameters } from './BrushParameters';
export declare type PainterEventType = 'shapeBegin' | 'shapeEnd' | 'painterClear' | 'painterLine';
export interface OperationData {
    brush?: BrushParameters | undefined;
}
export interface LineData {
    points: Point2D[];
}
export interface PainterEvent {
    type: PainterEventType;
    id: string;
    param?: LineData | OperationData | string | undefined;
}
