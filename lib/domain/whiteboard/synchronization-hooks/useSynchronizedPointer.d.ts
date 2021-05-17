import { fabric } from 'fabric';
/**
 * Handles laser pointer events.
 * @param canvas Canvas
 * @param showPointer Indicates if pointer should be shown.
 * @param universalPermits Indicates if user has universal permits, such as a teacher.
 * @param shouldHandleRemoteEvent Method that checks if an event should be handled.
 * @param userId User ID.
 * @param laserColor Color of laser.
 * @param laserIsActive Indicates if laser tool is sselected.
 * @param allowPointer Indicates if user has permission to use laser pointer.
 */
declare const useSynchronizedPointer: (canvas: fabric.Canvas | undefined, allowPointer: boolean, shouldHandleRemoteEvent: (id: string) => boolean, userId: string, laserColor: string, laserIsActive: boolean) => void;
export default useSynchronizedPointer;
