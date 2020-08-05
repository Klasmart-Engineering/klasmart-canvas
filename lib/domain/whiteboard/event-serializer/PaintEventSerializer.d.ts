/// <reference types="node" />
import { PainterEvent, PainterEventType } from './PainterEvent';
import { EventEmitter } from 'events';
export declare interface PaintEventSerializer {
    on(event: 'event', listener: (payload: PainterEvent) => void): this;
}
export interface ObjectEvent {
    id: string;
    type: ObjectType;
    target: any;
}
export declare type ObjectType = 'path' | 'textbox';
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
