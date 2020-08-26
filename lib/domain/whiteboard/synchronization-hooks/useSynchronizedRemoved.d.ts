import { CanvasAction } from '../reducers/undo-redo';
declare const useSynchronizedRemoved: (canvas: fabric.Canvas | undefined, userId: string, shouldSerializeEvent: (id: string) => boolean, shouldHandleRemoteEvent: (id: string) => boolean, undoRedoDispatch: React.Dispatch<CanvasAction>) => void;
export default useSynchronizedRemoved;
