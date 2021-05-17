import { fabric } from 'fabric';
/**
 * Handles copy past functionality
 * @param canvas
 * @param userId
 * @param permissions
 * @param allToolbarIsEnabled
 * @param undoRedoDispatch
 * @param eventSerializer
 * @param activeTool
 */
export declare const useCopy: (canvas: fabric.Canvas, userId: string, allToolbarIsEnabled: boolean, undoRedoDispatch: any, eventSerializer: any, activeTool: string | null) => void;
