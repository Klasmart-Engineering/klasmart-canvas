import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';
/**
 * Logic for synchronize line color in special brushes
 * @param {ICanvasBrush} object - Path to change color
 * @param {ICanvasObject} target - Target to copy properties on path
 */
export declare const colorChangeSynchronizationInSpecialBrushes: (object: ICanvasBrush, target: ICanvasObject) => void;
