/** This interface describes actions unrelated components
 * can do on the canvas.
 */
export interface ICanvasActions {
    fillColor: (color: string) => void;
    changeStrokeColor: (color: string) => void;
    textColor: (color: string) => void;
    discardActiveObject: () => void;
    addShape: (specific?: string) => void;
    eraseObject: () => void;
    setCanvasSelection: (selection: boolean) => void;
    setHoverCursorObjects: (cursor: string) => void;
}
export default ICanvasActions;
