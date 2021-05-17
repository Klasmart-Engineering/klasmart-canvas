import { fabric } from 'fabric';
import { IPermissions } from '../../../interfaces/permissions/permissions';
/**
 * Handles logic for Free Hand Drawing Feature
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that will draw in Whiteboard
 */
export declare const useFreeHandDrawing: (canvas: fabric.Canvas, userId: string, serializerToolbarState: IPermissions) => void;
