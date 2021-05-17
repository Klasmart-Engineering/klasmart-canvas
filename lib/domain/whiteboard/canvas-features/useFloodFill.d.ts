import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import { CanvasAction } from '../reducers/undo-redo';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import { IPermissions } from '../../../interfaces/permissions/permissions';
/**
 * Handles the logic for Flood-fill Feature
 * @param {fabric.Canvas} canvas - Canvas in which objects to flood-fill are
 * @param {string} userId - User that will flood-fill objects
 * @param {ICanvasActions} actions - Shared functions
 * that are necessaries here to flood-fill objects
 * @param {PaintEventSerializer} eventSerializer - Serializer for synchronize
 * flood-fill in the other whiteboards
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher to
 * save the ocurred events and could make undo/redo over them
 */
export declare const useFloodFill: (canvas: fabric.Canvas, serializerToolbarState: IPermissions, userId: string, actions: ICanvasActions, eventSerializer: PaintEventSerializer, undoRedoDispatch: (action: CanvasAction) => void) => void;
