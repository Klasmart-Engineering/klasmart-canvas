/// <reference types="node" />
import { PainterEvent } from '../types/PainterEvent';
import { EventEmitter } from 'events';
import { IPainterController } from './IPainterController';
export declare class EventPainterController extends EventEmitter implements IPainterController {
    readonly normalize: number;
    readonly events: PainterEvent[];
    readonly userId: string;
    constructor(userId: string, normalize: number);
    replayEvents(): Promise<void>;
    handlePainterEvent(events: PainterEvent[]): void;
    private parseAndEmitEvent;
    private beginShape;
    private endShape;
    private clear;
    private line;
}
