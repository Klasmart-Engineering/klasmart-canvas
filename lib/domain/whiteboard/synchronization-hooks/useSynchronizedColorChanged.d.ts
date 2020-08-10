/// <reference types="react" />
import { CanvasAction } from '../reducers/undo-redo';
declare const useSynchronizedColorChanged: (canvas: import("fabric/fabric-impl").Canvas | undefined, userId: string, shouldHandleRemoteEvent: (id: string) => boolean, undoRedoDispatch: import("react").Dispatch<CanvasAction>) => void;
export default useSynchronizedColorChanged;
