import { ObjectEvent } from './PaintEventSerializer';

interface IPathTarget {
    id?: string;
    stroke: string;
    strokeWidth: number;
    path: any;
    selectable?: boolean;
    evented?: boolean;
    strokeUniform?: boolean;
}
export declare class PainterEvents {
    static createId(canvasId: string): string;
    private static isLocalObject;
    static pathCreated(target: IPathTarget, id: string, canvasId: string): ObjectEvent | undefined;
    static objectAdded(target: IPathTarget, id: string, canvasId: string): ObjectEvent | undefined;
}
export {};
