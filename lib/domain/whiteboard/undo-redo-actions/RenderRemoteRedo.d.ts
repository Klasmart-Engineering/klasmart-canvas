import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import { CanvasHistoryState } from '../reducers/undo-redo';
/**
 * Renders Redo action in Remote Whiteboards according with the given state
 * @param {fabric.Canvas} canvas - Current canvas
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state to get data for render
 * @param {PaintEventSerializer} eventSerializer - Event serializer to send
 * changes to remote whiteboards
 */
export declare const RenderRemoteRedo: (canvas: fabric.Canvas, instanceId: string, state: CanvasHistoryState, eventSerializer: PaintEventSerializer) => void;
