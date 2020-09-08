import { CanvasAction } from '../reducers/undo-redo';
import { fabric } from 'fabric';
import { EventFilterFunction } from '../WhiteboardCanvas';
declare const useSynchronizedReconstruct: (canvas: fabric.Canvas | undefined, shouldHandleRemoteEvent: EventFilterFunction, userId: string, undoRedoDispatch: React.Dispatch<CanvasAction>) => void;
export default useSynchronizedReconstruct;
