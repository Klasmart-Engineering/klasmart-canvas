import { fabric } from 'fabric';

/**
 * Extends fabric's Object to include shapeType, which can be modified.
 */
export interface TypedGroup extends fabric.Group {
  id?: string;
}
