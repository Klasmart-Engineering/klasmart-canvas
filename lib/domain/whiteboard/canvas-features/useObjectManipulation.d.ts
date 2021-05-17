import { IPermissions } from '../../../interfaces/permissions/permissions';
import ICanvasActions from '../canvas-actions/ICanvasActions';
/**
 * Handles the logic for set/unset objects selectable/eventable
 * depending of the circunstances
 * @param {fabric.Canvas} canvas - Canvas in which the objects are.
 * @param {string} userId - User that is making changes in whiteboard.
 * @param {ICanvasActions} actions - Shared functions that this file needs.
 * @param {boolean} pointerEvents - Flag to know if
 * pointerEvents are active or not
 */
export declare const useObjectManipulation: (canvas: fabric.Canvas, userId: string, actions: ICanvasActions, pointerEvents: boolean, permissions: IPermissions) => void;
