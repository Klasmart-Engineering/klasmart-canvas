import { CanvasAction } from '../reducers/undo-redo';
declare const useSynchronizedFontColorChanged: (canvas: fabric.Canvas | undefined, userId: string, shouldHandleRemoteEvent: (id: string) => boolean, undoRedoDispatch: React.Dispatch<CanvasAction>) => void;
export default useSynchronizedFontColorChanged;
