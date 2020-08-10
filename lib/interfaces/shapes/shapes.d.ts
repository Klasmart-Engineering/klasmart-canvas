import { fabric } from 'fabric';
/**
 * Extends fabric's Object to include shapeType, which can be modified.
 */
export interface TypedShape extends fabric.Object {
    shapeType?: string;
    mimicBackground?: boolean;
}
