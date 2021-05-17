import { fabric } from 'fabric';
/**
 * Handles laser pointer events.
 * @param canvas Canvas
 * @param shouldHandleRemoteEvent Method that checks if an event should be handled.
 * @param userId User ID.
 */
declare const useSynchronizedRealtime: (canvas: fabric.Canvas | undefined, shouldHandleRemoteEvent: (id: string) => boolean, userId: string) => void;
export default useSynchronizedRealtime;
