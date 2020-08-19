import { fabric } from 'fabric';
import { TypedShape, TypedPolygon } from './shapes';

/**
 * Extends fabric's Object to include shapeType, which can be modified.
 */
export interface TypedGroup extends fabric.Group {
  id?: string;
  objects: TypedShape[] | TypedPolygon[];
}
