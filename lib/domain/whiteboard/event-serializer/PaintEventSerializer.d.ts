/// <reference types="node" />
import { PainterEvent, PainterEventType } from './PainterEvent';
import { EventEmitter } from 'events';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
export declare interface PaintEventSerializer {
    on(event: 'event', listener: (payload: PainterEvent) => void): this;
}
export interface ObjectEvent {
    id: string;
    type?: ObjectType;
    target?: ICanvasObject | {
        objects: ICanvasObject[];
    } | {
        background: string;
    } | boolean;
}
export declare type ObjectType = 'path' | 'textbox' | 'activeSelection' | 'reconstruct' | 'shape' | 'background' | 'pointer';
export declare class PaintEventSerializer extends EventEmitter implements PaintEventSerializer {
    readonly multiplier: number;
    readonly serializedEventIDs: string[];
    constructor(multiplier: number);
    /**
     * Push a new event to be serialized for synchronization.
     */
    push(type: PainterEventType, object: ObjectEvent): void;
    didSerializeEvent(id: string): boolean;
}
