/// <reference types="node" />
import { Point2D } from '../types/Point2D';
import { PainterEvent } from '../types/PainterEvent';
import { BrushParameters } from '../types/BrushParameters';
import { EventEmitter } from 'events';
import { ObjectEvent } from '../../../domain/whiteboard/event-serializer/PaintEventSerializer';
export declare interface PaintEventSerializer {
    on(event: 'event', listener: (payload: PainterEvent) => void): this;
    push(type: string, object: ObjectEvent): void;
}
export declare class PaintEventSerializer extends EventEmitter {
    readonly multiplier: number;
    readonly serializedEventIDs: string[];
    constructor(multiplier: number);
    shapeBegin(id: string, brushParameters: BrushParameters): void;
    shapeEnd(id: string): void;
    painterClear(id: string): void;
    painterLine(id: string, p1: Point2D, p2: Point2D): void;
    didSerializeEvent(id: string): boolean;
}
