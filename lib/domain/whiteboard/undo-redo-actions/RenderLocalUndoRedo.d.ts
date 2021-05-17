import { fabric } from 'fabric';
import { CanvasHistoryState } from '../reducers/undo-redo';
/**
 * Render Undo/Redo action in Local Whiteboard according with the given state
 * @param {fabric.Canvas} canvas - Current canvas
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state to get data to render
 * @param {'UNDO' | 'REDO'} action - Action made
 * @param {boolean} shapesAreSelectable - Flag to know if objects are able
 * to be selectable
 * @param {(color: string) => void} setBackgroundColorInCanvas - Function to
 * set background color in current canvas
 */
export declare const RenderLocalUndoRedo: (canvas: fabric.Canvas, instanceId: string, state: CanvasHistoryState, action: 'UNDO' | 'REDO', shapesAreSelectable: boolean, setBackgroundColorInCanvas: (color: string) => void, setLocalImage: (img: string | File) => void, setBackgroundImageIsPartialErasable: (state: boolean) => void) => void;
