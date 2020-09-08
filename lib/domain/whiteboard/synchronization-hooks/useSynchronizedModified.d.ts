import { CanvasAction } from '../reducers/undo-redo';
import { EventFilterFunction } from '../WhiteboardCanvas';
declare const useSynchronizedModified: (canvas: fabric.Canvas | undefined, generatedBy: string, shouldSerializeEvent: EventFilterFunction, shouldHandleRemoteEvent: EventFilterFunction, userId: string, undoRedoDispatch: React.Dispatch<CanvasAction>) => void;
export default useSynchronizedModified;
