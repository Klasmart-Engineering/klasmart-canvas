import { fabric } from 'fabric';
import { IPermissions } from '../../../interfaces/permissions/permissions';
/**
 * Handles the logic for keyboard events
 * @param {fabric.Canvas} canvas - Canvas to interact
 * @param {string} instanceId - Id of the current canvas
 */
export declare const useKeyHandlers: (canvas: fabric.Canvas, instanceId: string, permissions: IPermissions, allToolbarIsEnabled: boolean) => {
    keyDownHandler: (e: Event) => void;
    keyUpHandler: (e: Event) => void;
};
