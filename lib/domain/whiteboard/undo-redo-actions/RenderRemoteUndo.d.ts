import { fabric } from 'fabric';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import { CanvasHistoryState } from '../reducers/undo-redo';
/**
 * Renders Undo action in Remote Whiteboards
 * @param {fabric.Canvas} canvas - Current canvas
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state to get data to render
 * @param {PaintEventSerializer} eventSerializer - Event serializer to send
 * changes to Remote Whiteboards
 */
export declare const RenderRemoteUndo: (canvas: fabric.Canvas, instanceId: string, state: CanvasHistoryState, eventSerializer: PaintEventSerializer, setLocalImage: (img: string | File) => void, setBackgroundImageIsPartialErasable: (state: boolean) => void) => void;
