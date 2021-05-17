import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { fabric } from 'fabric';
/**
 * Logic for change line color in special brushes
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that is drawing
 * @param {ICanvasBrush} object - Path to change color
 * @param {string} color - New color to set in path
 */
export declare const changeLineColorInSpecialBrushes: (canvas: fabric.Canvas, userId: string, object: ICanvasBrush, color: string) => Promise<ICanvasBrush>;
