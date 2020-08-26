import { CanvasAction } from '../reducers/undo-redo';
declare const useSynchronizedModified: (canvas: fabric.Canvas | undefined, shouldSerializeEvent: (id: string) => boolean, shouldHandleRemoteEvent: (id: string) => boolean, userId: string, undoRedoDispatch: React.Dispatch<CanvasAction>) => void;
export default useSynchronizedModified;
