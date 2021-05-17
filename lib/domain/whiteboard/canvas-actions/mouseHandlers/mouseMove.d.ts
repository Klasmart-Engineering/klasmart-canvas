import { IShapeInProgress } from '../../../../interfaces/canvas-events/shape-in-progress';
import { PaintEventSerializer } from '../../event-serializer/PaintEventSerializer';
/**
 * Mouse move handler
 * @param canvas Fabric canvas
 * @param userId User ID
 * @param perfectShapeIsActive Indicates if perfect shape is active
 * @param shapeToAdd Indicates shape to add
 * @param brushType Brush type
 * @param setShapeInProgress Method to set shape in progress
 * @param eventSerializer Paint event serializer
 */
export declare const mouseMoveAction: (canvas: fabric.Canvas, userId: string, perfectShapeIsActive: boolean, shapeToAdd: string, brushType: string, setShapeInProgress: React.Dispatch<React.SetStateAction<IShapeInProgress | null | undefined>>, eventSerializer: PaintEventSerializer) => (e: fabric.IEvent) => void;
