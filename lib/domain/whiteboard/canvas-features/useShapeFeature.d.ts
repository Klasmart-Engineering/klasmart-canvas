import { IPermissions } from '../../../interfaces/permissions/permissions';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import { CanvasAction } from '../reducers/undo-redo';
/**
 * Handles the logic for shape creation
 * @param {fabric.Canvas} canvas - Canvas to add the shape
 * @param {string} userId - User that will create the shape
 * @param {ICanvasActions} actions - Shared functions necessaries
 * to work shape creation logic
 * @param {(specific: string, color?: string) => void} mouseDown - Mouse Event
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher
 * to save shapes states and could make und/redo over them
 */
export declare const useShapeFeature: (canvas: fabric.Canvas, userId: string, actions: ICanvasActions, mouseDown: (specific: string, color?: string | undefined) => void, undoRedoDispatch: (action: CanvasAction) => void, serializerToolbarState: IPermissions) => void;
