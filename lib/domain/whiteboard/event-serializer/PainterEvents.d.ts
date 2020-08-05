import { ObjectEvent } from './PaintEventSerializer';
interface IPathTarget {
    stroke: string;
    strokeWidth: number;
    path: any[];
}
export declare class PainterEvents {
    static createId(canvasId: string): string;
    private static isLocalObject;
    static pathCreated(target: IPathTarget, id: string, canvasId: string): ObjectEvent | undefined;
    static objectAdded(target: IPathTarget, id: string, canvasId: string): ObjectEvent | undefined;
}
export {};
