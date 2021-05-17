import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import { CanvasAction } from '../reducers/undo-redo';
/**
 *
 * @param canvas Canvas
 * @param userId user Id
 * @param isCursorObject Function to know which is a cursor and which isn't
 * @param closeModal Close modal method
 * @param dispatch Dispatch method
 * @param isLocalObject Method to check if object is local
 * @param allToolbarIsEnabled Indicates if all toolbar tools are enabled
 * @param localImage Image to display as background or cavnas
 * @param eventSerializer Paint event serializer
 * @param updateClearIsActive Method to activate clear canvas functionality
 * @param canvasId Canvas ID
 * @param backgroundImage background image
 */
export declare const useClearWhiteboardSelf: (canvas: fabric.Canvas, userId: string, isCursorObject: (object: ICanvasObject) => boolean, closeModal: () => void, dispatch: (action: CanvasAction) => void, isLocalObject: (id: string, canvasId: string | undefined) => boolean | undefined, allToolbarIsEnabled: boolean, localImage: string | File, eventSerializer: PaintEventSerializer, updateClearIsActive: (arg: boolean) => void, canvasId: string, backgroundImage: any) => () => Promise<void>;
/**
 * Method to clear other clearboards besides teacher
 * @param canvas Fabric canvas
 * @param isCursorObject Function to know which is a cursor and which isn't
 * @param updateClearIsActive Updates clear is active
 * @param eventSerializer Pain event serializer
 */
export declare const useClearWhiteboardOthers: (canvas: fabric.Canvas, isCursorObject: (object: ICanvasObject) => boolean, updateClearIsActive: (arg: boolean) => void, eventSerializer: PaintEventSerializer) => (userId: string) => Promise<void>;
export declare const useClearWhiteboardClearAll: (canvas: fabric.Canvas, userId: string, isCursorObject: (object: ICanvasObject) => boolean, updateClearIsActive: any, eventSerializer: PaintEventSerializer, dispatch: any) => () => Promise<void>;
