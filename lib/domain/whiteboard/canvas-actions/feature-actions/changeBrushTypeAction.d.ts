import { fabric } from 'fabric';
import { IBrushType } from '../../../../interfaces/brushes/brush-type';
import { PaintEventSerializer } from '../../event-serializer/PaintEventSerializer';
import { CanvasAction } from '../../reducers/undo-redo';
/**
 * Changes brushType value and if one or more objects are selected
 * also changes their brush style
 * @param {fabric.Canvas} canvas - Canvas in which the objects to change are
 * @param {string} userId - User that will do changes in objects
 * @param {PaintEventSerializer} eventSerializer - Serializer to synchronize
 * changes in the other canvases
 * @param {IBrushType} type - Brush type to change
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher
 * to save brush type changes and could make undo/redo over them
 */
export declare const changeBrushTypeAction: (canvas: fabric.Canvas, userId: string, eventSerializer: PaintEventSerializer, updateBrushType: (type: IBrushType) => void, type: IBrushType, undoRedoDispatch: (action: CanvasAction) => void) => Promise<void>;
