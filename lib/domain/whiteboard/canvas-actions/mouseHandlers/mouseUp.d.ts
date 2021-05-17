import { IShapeInProgress } from '../../../../interfaces/canvas-events/shape-in-progress';
import { PaintEventSerializer } from '../../../../poc/whiteboard/event-serializer/PaintEventSerializer';
import { CanvasAction } from '../../reducers/undo-redo';
/**
 * Mouse up event handler
 * @param canvas Fabric canvas
 * @param userId User ID
 * @param perfectShapeIsActive Indicates if perfect shape is active
 * @param shapeToAdd Shape to add
 * @param brushType Brush type
 * @param lineWidth Line width
 * @param penColor Pen, brush, or stroke color
 * @param setShapeInProgress Method to set shape in progress
 * @param eventSerializer Paint event serializer
 * @param dispatch Dispatch method for undo redo state.
 */
export declare const mouseUpAction: (canvas: fabric.Canvas, userId: string, perfectShapeIsActive: boolean, shapeToAdd: string, brushType: string, lineWidth: number, penColor: string, setShapeInProgress: React.Dispatch<React.SetStateAction<IShapeInProgress | null | undefined>>, eventSerializer: PaintEventSerializer, dispatch: (action: CanvasAction) => void) => (e: fabric.IEvent) => Promise<void>;
