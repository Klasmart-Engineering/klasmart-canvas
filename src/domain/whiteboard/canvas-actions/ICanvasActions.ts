import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IBrushType } from '../../../interfaces/brushes/brush-type';

/** This interface describes actions unrelated components
 * can do on the canvas.
 */
export interface ICanvasActions {
  fillColor: (color: string) => void;
  changeStrokeColor: (color: string) =>void;
  changeBrushType: (type: IBrushType) => void;
  textColor: (color: string) => void;
  discardActiveObject: () => void;
  addShape: (shapeToAdd: string) => void;
  eraseObject: () => void;
  reorderShapes: () => void;
  setCanvasSelection: (selection: boolean) => void;
  setHoverCursorObjects: (cursor: string) => void;
  setObjectControlsVisibility: (
    object: ICanvasObject,
    visibility: boolean
  ) => void;
  undo: () => void;
  redo: () => void;
  clearWhiteboardClearMySelf: () => void;
  clearWhiteboardAllowClearOthers: (userId: string) => void;
  clearWhiteboardClearAll: () => void;
  fillBackgroundColor: (color: string) => void;
  setBackgroundColorInCanvas: (color: string) => void;
  isCursorObject: (object: ICanvasObject) => boolean;
}

export default ICanvasActions;
