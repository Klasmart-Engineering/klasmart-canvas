/// <reference types="node" />
import { EventEmitter } from 'events';
import { IPainterController } from './IPainterController';
import { PainterEvent } from './PainterEvent';
/**
 * This class is responsible for receiving remote events and translating that into
 * commands we can use to update the canvas. It needs to understand any optimizations
 * the PaintEventSerializer might do and decode those into usable data again. In the
 * PoC code the only optimization used was multiplying/dividing the coordinates to
 * reduce number of bytes in the data stream.
 */
export declare class EventPainterController extends EventEmitter implements IPainterController {
    readonly events: PainterEvent[];
    replayEvents(): Promise<void>;
    handlePainterEvent(events: PainterEvent[]): void;
    private parseAndEmitEvent;
    private added;
    private moved;
    private rotated;
    private scaled;
    private skewed;
    private colorChanged;
    private modified;
    private fontFamilyChanged;
    private reconstruct;
    private removed;
}
