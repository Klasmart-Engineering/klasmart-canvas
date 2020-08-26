import { fabric } from 'fabric';
import { CanvasAction } from '../reducers/undo-redo';
declare const useSynchronizedAdded: (canvas: fabric.Canvas | undefined, userId: string, shouldSerializeEvent: (id: string) => boolean, shouldHandleRemoteEvent: (id: string) => boolean, undoRedoDispatch: React.Dispatch<CanvasAction>) => void;
export default useSynchronizedAdded;
