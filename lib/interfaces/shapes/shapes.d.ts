import { fabric } from 'fabric';
/**
 * Extends fabric's Object to include shapeType, which can be modified.
 */
export interface TypedShape extends fabric.Object {
    shapeType?: string;
    mimicBackground?: boolean;
    id?: string;
    fromJSON?: boolean;
}
/**
 * Extends fabric's Polygon to include shapeType, which can be modified.
 */
export interface TypedPolygon extends fabric.Polygon {
    shapeType?: string;
    mimicBackground?: boolean;
    id?: string;
    fromJSON?: boolean;
}
