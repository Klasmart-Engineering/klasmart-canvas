import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
/**
 * Logic for synchronize special brushes creation
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that is drawing
 * @param {string} id - path id
 * @param {ICanvasBrush} target - Target with properties to be setted in path
 */
export declare const addSynchronizationInSpecialBrushes: (canvas: fabric.Canvas, userId: string, id: string, target: ICanvasBrush) => Promise<void>;
