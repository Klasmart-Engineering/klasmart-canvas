/// <reference types="react" />
import { fabric } from 'fabric';
import { CanvasAction } from '../reducers/undo-redo';
import { PaintEventSerializer } from '../../../poc/whiteboard/event-serializer/PaintEventSerializer';
/**
 * Class that handles all partial erasure methods.
 */
export declare class PartialErase {
    /**
     * User ID
     */
    private id;
    /**
     * Permanent canvas.
     */
    private canvas;
    /**
     * Temporary canvas will erasing will take place.
     */
    private tempCanvas;
    /**
     * Raw canvas will erasing will take place.
     */
    private rawCanvas;
    /**
     * Eraser width.
     */
    private lineWidth;
    /**
     * Eraser cursor.
     */
    private eraseObjectCursor;
    /**
     * Indicates if all tools in toolbar are enabled. Typically
     * true for teachers.
     */
    private allToolbarIsEnabled;
    /**
     * Indicates if partial eraser is active.
     */
    private partialEraseIsActive;
    /**
     * Dispatcher for undo / redo functionality
     */
    private undoRedoDispatch;
    /**
     * Indicates if eraser is active.
     */
    private active;
    /**
     * Event synchronizer methods.
     */
    eventSerializer: PaintEventSerializer;
    /**
     * Mouse coordinates.
     */
    coordinates: {
        x: number;
        y: number;
    }[];
    /**
     * Indicates if user has permission to do a partial erase action.
     */
    hasPermission: boolean;
    /**
     * Indicates if canvas has an erasable background owned to user.
     */
    hasBackground: boolean;
    /**
     * background Id
     */
    backgroundId: string | null;
    /**
     * Temporary background canvas
     */
    private bgRawCanvas;
    /**
     * Indicates if user has owned objects in board
     */
    private hasSelfObjects;
    /**
     * Indicates if user has permissison for images and owns background
     */
    private hasBgPermission;
    /**
     * Canvas background image fabric.js object.
     */
    private backgroundImage;
    /** @ignore */
    constructor(id: string, canvas: fabric.Canvas, lineWidth: number, eraseObjectCursor: string, allToolbarIsEnabled: boolean, partialEraseIsActive: boolean, hasPermission: boolean, eventSerializer: PaintEventSerializer, undoRedoDispatch: React.Dispatch<CanvasAction>);
    private generateBackground;
    /**
     * Initiates erasing availability.
     */
    init: () => void;
    /**
     * Erases pixes along specified path
     */
    buildTempEraseLine: () => void;
    /**
     * Moves owned objects to temporary canvas for partial erasing.
     */
    private moveSelfToTemp;
    private loadFromJSON;
    /**
     * Group self owned objects
     */
    private groupObjects;
    private backgroundToPermanent;
    /**
     * Moves objects from temporary canvas to permanent canvas.
     */
    private moveSelfToPermanent;
    /**
     * Destroys temporary canvas.
     */
    destroy: () => void;
    /**
     *
     * @param selfId Onwer ID
     * @param objectId Object ID
     */
    private isOwned;
    /**
     * Generate ID for joined objects.
     */
    private generateId;
    /**
     * Checks when path is created and merges erase path with existing objects if erased.
     * @param e Canvas event.
     */
    private pathCreated;
    /**
     * Updates undo / redo state.
     * @param eventPayload Event to store in state
     */
    private updateState;
}
