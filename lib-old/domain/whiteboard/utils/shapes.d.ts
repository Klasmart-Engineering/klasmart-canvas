import { TypedShape } from '../../../interfaces/shapes/shapes';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
/**
 * Check if the given object is a free drawing object
 * @param {fabric.Object} object - object to check
 */
export declare const isFreeDrawing: (object: fabric.Object) => boolean;
export declare const isSpecialFreeDrawing: (object: fabric.Object) => false | {
    type: import("../../../interfaces/brushes/brush-type").IBrushType;
    points: import("../../../interfaces/brushes/pen-point").IPenPoint[] | ICoordinate[];
    stroke: string;
    strokeWidth: number;
    bristles?: import("../../../interfaces/brushes/bristle").IBristle[] | undefined;
    imageData?: string | undefined;
} | undefined;
/**
 * Check if the given object is a shape
 * @param {fabric.Object} object - object to check
 */
export declare const isShape: (object: fabric.Object) => boolean | "" | undefined;
/**
 * Check if the given object is a text object
 * @param {fabric.Object} object - object to check
 */
export declare const isText: (object: fabric.Object) => string | undefined;
/**
 * Check if the given object is an empty shape
 * @param {fabric.Object} object - object to check
 */
export declare const isEmptyShape: (object: TypedShape) => boolean | "" | undefined;
/**
 * Get the bigger difference
 * between startPoint.x - point.x and startPoint.y - point.y
 * @param {Point} point - Point to find the difference with startPoint
 */
export declare const getBiggerDifference: (point: fabric.Point, startPoint: fabric.Point) => number;
export declare const setScaledPoint: (shape: any, original: any, point: ICoordinate) => {
    x: number;
    y: number;
};
export declare const penPointsMapping: (points: any[], brush: any, min: number, max: number) => {
    x: any;
    y: any;
    width: number;
}[];
