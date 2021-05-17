import { IUndoRedoSingleEvent } from '../../../interfaces/canvas-events/undo-redo-single-event';
import { CanvasHistoryState } from '../reducers/undo-redo';
/**
 * Extract from the given state the necessary variables
 * to be used in undo/redo actions
 * @param {CanvasHistoryState} state - Current state to extract variables
 */
export declare const getStateVariables: (state: CanvasHistoryState) => {
    currentEvent: import("../../../interfaces/canvas-events/undo-redo-event").IUndoRedoEvent;
    currentObject: IUndoRedoSingleEvent;
    currentState: string;
    nextEvent: import("../../../interfaces/canvas-events/undo-redo-event").IUndoRedoEvent;
    nextObject: IUndoRedoSingleEvent;
    background: string | import("fabric/fabric-impl").Image | null;
};
