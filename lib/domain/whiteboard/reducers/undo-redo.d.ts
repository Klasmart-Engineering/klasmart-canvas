/// <reference types="react" />
export declare const UNDO = "CANVAS_UNDO";
export declare const REDO = "CANVAS_REDO";
export declare const SET = "CANVAS_SET";
export declare const MODIFY = "CANVAS_MODIFY";
export declare const UPDATE_OTHER = "CANVAS_UPDATE_OTHER";
export declare const SET_OTHER = "CANVAS_SET_OTHER";
/**
 * Model for storing the canvas history for undo/redo functionality.
 * States stored as stringified objects, since fabric requires it when
 * reloading state.
 */
export interface CanvasHistoryState {
    /**
     * Stringified objects of all states.
     */
    states: string[];
    /**
     * Objects created on another canvas.
     */
    otherObjects: any;
    /**
     * Indicates action being taken, such as undo or redo.
     */
    actionType: string | null;
    /**
     * Indicates the index of the active state.
     */
    activeStateIndex: number | null;
    /**
     * Active state.
     */
    activeState: string | null;
    /**
     * List of events
     */
    events: any[];
    /**
     * Current event chosen, used for undo and redo events.
     */
    eventIndex: number;
    /**
     * Used for group manipulation.
     */
    activeObjects: any[];
}
/**
 * Dispatch action used by reducer for canvas history.
 */
export interface CanvasAction {
    /**
     * Type of action, such as undo, redo, set, modify.
     */
    type: string;
    /**
     * Array of fabric objects.
     */
    payload?: fabric.Object[];
    /**
     * ID of canvas.
     */
    canvasId?: string;
    /**
     * Event to be added to list.
     */
    event?: any;
    /**
     * Payload of objects from other canvas.
     */
    otherPayload?: fabric.Object;
    /**
     * Active objects on board.
     */
    activeObjects?: fabric.Object[];
}
/**
 * Reducer hook.
 */
export declare const useUndoRedo: () => {
    state: CanvasHistoryState;
    dispatch: import("react").Dispatch<CanvasAction>;
};
