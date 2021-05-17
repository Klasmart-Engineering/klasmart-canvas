/**
 * Creates the listeners to erase objects from the whiteboard
 * @param canvas fabric canvas
 * @param userId user id
 * @param canvasId canvas id
 */
export declare const useEraseObject: (canvas: fabric.Canvas, userId: string, canvasId: string) => () => void;
