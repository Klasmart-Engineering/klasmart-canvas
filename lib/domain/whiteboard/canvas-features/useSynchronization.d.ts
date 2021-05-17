import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
/**
 * Handles the logic for penColor and lineWidth synchronization actions
 * @param {string} userId - User that is generating that action.
 */
export declare const useSynchronization: (userId: string) => {
    changePenColorSync: (obj: ICanvasObject) => void;
    changeLineWidthSync: (obj: ICanvasObject) => void;
};
