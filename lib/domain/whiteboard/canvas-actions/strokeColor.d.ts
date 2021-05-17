import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import { CanvasAction } from '../reducers/undo-redo';
/**
 * Changes the penColor value and if one or more objects are selected
 * also changes the stroke color in free drawing and empty shape objects
 * @param canvas Fabric canvas
 * @param userId User ID
 * @param eventSerializer Paint event serializer
 * @param updatePenColor Update pen color method
 * @param dispatch Dispatch
 * @param changePenColorSync Change pen color method.
 */
export declare const useChangeStrokeColor: (canvas: fabric.Canvas, userId: string, eventSerializer: PaintEventSerializer, updatePenColor: (color: string) => void, dispatch: React.Dispatch<CanvasAction>, changePenColorSync: (arg1: ICanvasObject) => void) => (color: string) => void;
/**
 * Updates text color.
 * @param canvas Fabric canvas
 * @param userId User id
 * @param updateFontColor updates font color method
 * @param eventSerializer Paint event serializer
 * @param dispatch Undo redo dispatch method.
 */
export declare const useTextColor: (canvas: fabric.Canvas, userId: string, updateFontColor: (color: string) => void, eventSerializer: PaintEventSerializer, dispatch: React.Dispatch<CanvasAction>) => (color: string) => void;
