/// <reference types="react" />
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
export declare const UNDO = "CANVAS_UNDO";
export declare const REDO = "CANVAS_REDO";
export declare const SET = "CANVAS_SET";
export declare const SET_GROUP = "CANVAS_SET_GROUP";
export declare const UPDATE_OTHER = "CANVAS_UPDATE_OTHER";
export declare const SET_OTHER = "CANVAS_SET_OTHER";
export declare const SET_BACKGROUND = "CANVAS_SET_BACKGROUND";
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
    otherObjects: string;
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
    events: IUndoRedoEvent[];
    /**
     * Current event chosen, used for undo and redo events.
     */
    eventIndex: number;
    /**
     * Used for group manipulation.
     */
    activeObjects: ICanvasObject[];
    /**
     * Stores background state in order to rerender if needed.
     */
    backgrounds: (string | fabric.Image | null)[];
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
    event?: IUndoRedoEvent;
    /**
     * Payload of objects from other canvas.
     */
    otherPayload?: fabric.Object;
    /**
     * Event ID. Used to determine if an event is grouped.
     */
    eventId?: string | undefined;
    /**
     * Canvas background payload
     */
    background?: fabric.Image;
}
/**
 * Reducer hook.
 */
export declare const useUndoRedo: () => {
    state: CanvasHistoryState;
    dispatch: import("react").Dispatch<CanvasAction>;
};
