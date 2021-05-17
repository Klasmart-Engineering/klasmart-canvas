import { fabric } from 'fabric';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import ICanvasActions from '../canvas-actions/ICanvasActions';
/**
 * Manages the logic for text object creation and edition
 * @param {fabric.Canvas} canvas - Canvas in which text object will be created
 * @param {string} instanceId - Canvas instance identifier
 * @param {string} userId - User that will create/edit the text objects
 * @param {ICanvasActions} actions - Shared functions for canvas
 * @param {IPermissions} permissions - User permissions in whiteboard tools
 */
export declare const useTextObject: (canvas: fabric.Canvas, instanceId: string, userId: string, actions: ICanvasActions, permissions: IPermissions) => void;
