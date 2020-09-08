import { CanvasAction } from '../reducers/undo-redo';
import { EventFilterFunction } from '../WhiteboardCanvas';
declare const useSynchronizedFontColorChanged: (canvas: fabric.Canvas | undefined, userId: string, shouldHandleRemoteEvent: EventFilterFunction, undoRedoDispatch: React.Dispatch<CanvasAction>) => void;
export default useSynchronizedFontColorChanged;
