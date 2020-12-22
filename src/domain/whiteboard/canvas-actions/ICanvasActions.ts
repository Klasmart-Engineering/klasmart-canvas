import { IBrushType } from '../../../interfaces/brushes/brush-type';

/** This interface describes actions unrelated components
 * can do on the canvas.
 */
export interface ICanvasActions {
  fillColor: (color: string) => void;
  changeStrokeColor: (color: string) => void;
  changeBrushType: (type: IBrushType) => void;
  textColor: (color: string) => void;
  discardActiveObject: () => void;
  addShape: (shapeToAdd: string) => void;
  eraseObject: () => void;
  setCanvasSelection: (selection: boolean) => void;
  setHoverCursorObjects: (cursor: string) => void;
  undo: () => void;
  redo: () => void;
  clearWhiteboardClearMySelf: () => void;
  clearWhiteboardAllowClearOthers: (userId: string) => void;
  clearWhiteboardClearAll: () => void;
}

export default ICanvasActions;
