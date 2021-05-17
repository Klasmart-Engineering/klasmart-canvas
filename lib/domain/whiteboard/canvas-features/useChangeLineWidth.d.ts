import { fabric } from 'fabric';
import { CanvasAction } from '../reducers/undo-redo';
/**
 * Handles the logic for change lineWidth in path and shape objects
 * @param {fabric.Canvas} canvas - Canvas in which the objects to modify are.
 * @param {string} userId - User that will modify lineWidth in objects.
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher to
 * save lineWidth changes and could make undo/redo over them
 */
export declare const useChangeLineWidth: (canvas: fabric.Canvas, userId: string, undoRedoDispatch: (action: CanvasAction) => void) => void;
