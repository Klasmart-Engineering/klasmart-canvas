import { CanvasAction } from '../reducers/undo-redo';
import { fabric } from 'fabric';
declare const useSynchronizedReconstruct: (canvas: fabric.Canvas | undefined, shouldHandleRemoteEvent: (id: string) => boolean, userId: string, undoRedoDispatch: React.Dispatch<CanvasAction>, setLocalImage: (img: string | File) => void, setLocalBackground: (condition: boolean) => void) => void;
export default useSynchronizedReconstruct;
