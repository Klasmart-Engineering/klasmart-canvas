/// <reference types="react" />
/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated
 * @param eventSerializer Event serializer
 * @param canvasId Canvas ID
 */
export declare const UndoRedo: (canvas: any, eventSerializer: any, _canvasId: string) => {
    state: import("../reducers/undo-redo").CanvasHistoryState;
    dispatch: import("react").Dispatch<import("../reducers/undo-redo").CanvasAction>;
};
