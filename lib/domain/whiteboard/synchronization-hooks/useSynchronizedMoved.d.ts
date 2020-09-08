import { fabric } from 'fabric';
import { CanvasAction } from '../reducers/undo-redo';
import { EventFilterFunction } from '../WhiteboardCanvas';
declare const useSynchronizedMoved: (canvas: fabric.Canvas | undefined, userId: string, generatedBy: string, shouldSerializeEvent: EventFilterFunction, shouldHandleRemoteEvent: EventFilterFunction, undoRedoDispatch: React.Dispatch<CanvasAction>) => void;
export default useSynchronizedMoved;
