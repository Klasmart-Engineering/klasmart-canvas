import { ObjectEvent } from './PaintEventSerializer';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
export declare class PainterEvents {
    static createId(canvasId: string): string;
    static isCreatedWithId(id: string, canvasId: string): boolean;
    static getEventGroup(id: string): string | undefined;
    static isCreatedWithGroup(id: string, group: string): boolean;
    static pathCreated(target: ICanvasObject, id: string, canvasId: string): ObjectEvent | undefined;
    static objectAdded(target: ICanvasObject, id: string, canvasId: string): ObjectEvent | undefined;
    static generateAndSetIdForTarget(userId: string, generatedBy: string, target: any): void;
}
