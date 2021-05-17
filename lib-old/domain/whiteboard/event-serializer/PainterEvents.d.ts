import { ObjectEvent } from './PaintEventSerializer';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
export declare class PainterEvents {
    static createId(canvasId: string): string;
    private static isLocalObject;
    static pathCreated(target: ICanvasObject, id: string, canvasId: string): ObjectEvent | undefined;
    static objectAdded(target: ICanvasObject, id: string, canvasId: string): ObjectEvent | undefined;
}
