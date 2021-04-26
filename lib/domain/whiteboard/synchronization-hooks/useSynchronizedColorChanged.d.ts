import { CanvasAction } from '../reducers/undo-redo';
import { fabric } from 'fabric';
declare const useSynchronizedColorChanged: (canvas: fabric.Canvas | undefined, userId: string, shouldHandleRemoteEvent: (id: string) => boolean, undoRedoDispatch: React.Dispatch<CanvasAction>) => void;
export default useSynchronizedColorChanged;
