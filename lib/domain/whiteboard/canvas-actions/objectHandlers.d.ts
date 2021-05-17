/**
 * Cancels shape creation
 * @param canvas Fabric canvas
 */
export declare const cancelShapeCreation: (canvas: fabric.Canvas) => () => void;
/**
 * Return the movement hability in the current target shape
 * @param {IEvent} event - current event, necessary to know
 * which is the current target shape
 */
export declare const allowMovementInShape: (event: fabric.IEvent) => void;
