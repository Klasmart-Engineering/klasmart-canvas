import { IBrushType } from '../../../../interfaces/brushes/brush-type';
import { ISpecialShapeSelectorPropsType } from '../../../../interfaces/canvas-events/special-shape-selector';
/**
 * Mouse down event handler
 * @param canvas Fabric canvas
 * @param brushType Brush type
 * @param shapeSelector Shape selector method
 * @param shapeToAdd Indicates shape to add
 * @param specialShapeSelector Method to select special shape
 * @param lineWidth Line width
 * @param penColor Pen / brush color
 */
export declare const mouseDownAction: (canvas: fabric.Canvas, brushType: IBrushType, shapeSelector: (arg1: string) => any, shapeToAdd: string, specialShapeSelector: (arg1: ISpecialShapeSelectorPropsType) => any, lineWidth: number, penColor: string) => (e: fabric.IEvent) => Promise<void>;
