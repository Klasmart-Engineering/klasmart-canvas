import { Point2D } from '../types/Point2D';
import { PainterEvent, LineData, OperationData } from '../types/PainterEvent';
import { BrushParameters } from '../types/BrushParameters';
import { EventEmitter } from 'events';

// TODO: This service should probably implement some sort of
// event batching, especially the line drawing can generate
// a lot of events in short time, with very minimal lines.
// Those lines could probably be consolidated and sent as
// a list of events or even resampled if precision isn't
// a big concern.

// TODO: Currently each coordinate will be sent twice
// {p1, p2} -> {p2, p3} -> {p3 p4}, etc. This is wasteful
// and should be improved.

export declare interface PaintEventSerializer {
  on(event: 'event', listener: (payload: PainterEvent) => void): this;
}

export class PaintEventSerializer extends EventEmitter {
  readonly multiplier: number;
  readonly serializedEventIDs: string[] = [];

  constructor(multiplier: number) {
    super();
    this.multiplier = multiplier;
  }

  shapeBegin(id: string, brushParameters: BrushParameters): void {
    const data: OperationData = {
      brush: brushParameters,
    };

    const event: PainterEvent = {
      type: 'shapeBegin',
      id: id,
      param: JSON.stringify(data),
    };

    this.serializedEventIDs.push(id);
    this.emit('event', event);
  }

  shapeEnd(id: string): void {
    const event: PainterEvent = {
      type: 'shapeEnd',
      id: id,
    };

    this.serializedEventIDs.push(id);
    this.emit('event', event);
  }

  painterClear(id: string): void {
    const event: PainterEvent = {
      type: 'painterClear',
      id: id,
    };

    this.serializedEventIDs.push(id);
    this.emit('event', event);
  }

  painterLine(id: string, p1: Point2D, p2: Point2D): void {
    p1 = Point2D.multiplyToInteger(p1, this.multiplier);
    p2 = Point2D.multiplyToInteger(p2, this.multiplier);

    const lineData: LineData = { points: [p1, p2] };

    const event: PainterEvent = {
      type: 'painterLine',
      param: JSON.stringify(lineData),
      id: id,
    };

    this.serializedEventIDs.push(id);
    this.emit('event', event);
  }

  didSerializeEvent(id: string) {
    return this.serializedEventIDs.findIndex((id2) => id2 === id) !== -1;
  }
}
