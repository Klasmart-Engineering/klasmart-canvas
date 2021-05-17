import ICanvasActions from '../canvas-actions/ICanvasActions';
/**
 * Handles the logic for change Whiteboard states when an object is selected
 * @param {fabric.Canvas} canvas - Canvas in which the objects are selected
 * @param {ICanvasActions} actions - Shared functions that are necessaries
 * to work this logic
 */
export declare const useObjectSelection: (canvas: fabric.Canvas, actions: ICanvasActions) => void;
