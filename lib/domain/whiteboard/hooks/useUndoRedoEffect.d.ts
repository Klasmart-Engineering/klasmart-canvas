/// <reference types="react" />
import { Canvas } from 'fabric/fabric-impl';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated
 * @param eventSerializer Event serializer
 * @param canvasId Canvas ID
 */
export declare const UndoRedo: (canvas: Canvas, eventSerializer: PaintEventSerializer, instanceId: string) => {
    state: import("../reducers/undo-redo").CanvasHistoryState;
    dispatch: import("react").Dispatch<import("../reducers/undo-redo").CanvasAction>;
};
