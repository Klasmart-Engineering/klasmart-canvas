import { CanvasAction } from '../../reducers/undo-redo';
/**
 * Applies Undo/Redo for brush type changes in groups of objects
 * @param {fabric.Canvas} canvas - Canvas in which the objects are
 * @param {string} userId - User that does the action
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher
 * to save the events and could make undo/redo over them
 */
export declare const changeBrushTypeUndoRedoGroup: (canvas: fabric.Canvas, userId: string, undoRedoDispatch: (action: CanvasAction) => void) => void;
