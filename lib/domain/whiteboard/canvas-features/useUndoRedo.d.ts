import { fabric } from 'fabric';
import { CanvasAction } from '../reducers/undo-redo';
/**
 * Handles the logic for lineWidth, fontFamily and fontColor undo/redo actions
 * @param {fabric.Canvas} canvas - Canvas in which the action is made
 * @param {string} userId - User that will do the action
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher to save
 * the events to could make undo/redo over them.
 */
export declare const useUndoRedo: (canvas: fabric.Canvas, userId: string, undoRedoDispatch: (action: CanvasAction) => void) => void;
