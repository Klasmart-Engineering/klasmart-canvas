import { BrushParameters } from '../types/BrushParameters';
import { Point2D } from '../types/Point2D';
import { ShapeID } from './ShapeID';
export interface Shape {
    id: ShapeID;
    order: number;
}
export interface Styled {
    brushParameters: BrushParameters;
}
export declare class Line implements Shape, Styled {
    id: ShapeID;
    order: number;
    brushParameters: BrushParameters;
    points: Point2D[];
    constructor(id: ShapeID, order: number);
}
export declare class ShapesRepository {
    private shapes;
    private shapeOrder;
    getOrderedShapes(): Shape[];
    createShape(id: string, brushParameters: BrushParameters): void;
    appendLine(id: string, points: Point2D[]): void;
    clearAll(): void;
    clear(id: string): void;
}
