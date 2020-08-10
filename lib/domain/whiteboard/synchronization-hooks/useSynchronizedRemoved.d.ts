/// <reference types="react" />
import { CanvasAction } from '../reducers/undo-redo';
declare const useSynchronizedRemoved: (canvas: import("fabric/fabric-impl").Canvas | undefined, userId: string, shouldSerializeEvent: (id: string) => boolean, shouldHandleRemoteEvent: (id: string) => boolean, undoRedoDispatch: import("react").Dispatch<CanvasAction>) => void;
export default useSynchronizedRemoved;
