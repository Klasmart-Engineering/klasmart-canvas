import { fabric } from 'fabric';
/**
 * Handles Cursor Pointer Events
 * @param {fabric.Canvas | undefined} canvas - Current Canvas
 * @param {string} userId - User that send the event
 * @param {(id: string) => boolean} shouldHandleRemoteEvent - Checks if
 * an event should be handled
 */
declare const useSynchronizedCursorPointer: (canvas: fabric.Canvas | undefined, userId: string, shouldHandleRemoteEvent: (id: string) => boolean) => void;
export default useSynchronizedCursorPointer;
