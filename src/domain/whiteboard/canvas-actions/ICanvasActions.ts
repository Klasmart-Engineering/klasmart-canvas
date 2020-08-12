/** This interface describes actions unrelated components
 * can do on the canvas.
 */
export interface ICanvasActions {
  fillColor: (color: string) => void;
  changeStrokeColor: (color: string) => void;
  textColor: (color: string) => void;
  clearWhiteboard: () => void;
  discardActiveObject: () => void;
  addShape: (shapeToAdd: string) => void;
  eraseObject: () => void;
  setHoverCursorObjects: (cursor: string) => void;
}

export default ICanvasActions;
