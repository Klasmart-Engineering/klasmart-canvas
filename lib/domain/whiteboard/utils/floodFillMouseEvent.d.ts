import { fabric } from 'fabric';
import { CanvasAction } from '../reducers/undo-redo';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
/**
 * Handles flood fill on mouse click for background color or custom paths.
 * @param event
 * @param canvas
 * @param userId
 * @param isLocalObject
 * @param color
 * @param eventSerializer
 * @param undoRedoDispatch
 */
export declare const floodFillMouseEvent: (event: fabric.IEvent, canvas: fabric.Canvas, userId: string, isLocalObject: (p1: string, p2: string) => boolean, color: string, eventSerializer: PaintEventSerializer, undoRedoDispatch: React.Dispatch<CanvasAction>) => Promise<void>;
