import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
/**
 * Logic for change lineWidth in special brushes local and remote
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that is drawing
 * @param {ICanvasBrush} object - Path to change its line width
 * @param {number} lineWidth - New line width to set in path
 * @param {ICanvasBrush} target - Target to copy properties and set itin a remote path
 */
export declare const changeLineWidthInSpecialBrushes: (canvas: fabric.Canvas, userId: string, object: ICanvasBrush, lineWidth: number, target?: ICanvasBrush | undefined) => Promise<ICanvasBrush>;
