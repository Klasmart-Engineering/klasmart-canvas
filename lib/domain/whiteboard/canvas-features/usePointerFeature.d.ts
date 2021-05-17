import { IPermissions } from '../../../interfaces/permissions/permissions';
/**
 * Handles the logic for pointer feature
 * @param {fabric.Canvas} canvas - Canvas in which pointer will change
 * @param {string} userId - Current user
 */
export declare const usePointerFeature: (canvas: fabric.Canvas, userId: string, permissions: IPermissions) => void;
