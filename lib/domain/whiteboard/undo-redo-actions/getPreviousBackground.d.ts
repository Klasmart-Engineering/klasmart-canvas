import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
/**
 * Get's previous set color for canvas background.
 * @param currentIndex Current event index.
 * @param events List of events.
 */
export declare const getPreviousBackground: (currentIndex: number, events: IUndoRedoEvent[]) => string;
/**
 * Get's previous set color for canvas background.
 * @param currentIndex Current event index.
 * @param events List of events.
 */
export declare const getPreviousBackgroundDivColor: (currentIndex: number, events: IUndoRedoEvent[]) => string | null;
