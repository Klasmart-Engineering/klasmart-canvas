/// <reference types="react" />
import { fabric } from 'fabric';
import { CanvasAction } from '../reducers/undo-redo';
declare const useSynchronizedScaled: (canvas: fabric.Canvas | undefined, userId: string, shouldSerializeEvent: (id: string) => boolean, shouldHandleRemoteEvent: (id: string) => boolean, undoRedoDispatch: import("react").Dispatch<CanvasAction>) => void;
export default useSynchronizedScaled;
