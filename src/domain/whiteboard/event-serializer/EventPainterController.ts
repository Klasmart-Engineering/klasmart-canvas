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
export class EventPainterController extends EventEmitter
  implements IPainterController {
  readonly events: PainterEvent[] = [];

  async replayEvents(): Promise<void> {
    for (const event of this.events) {
      this.parseAndEmitEvent(event);
    }
  }

  handlePainterEvent(events: PainterEvent[]): void {
    for (const event of events) {
      this.events.push(event);

      this.parseAndEmitEvent(event);

      // TODO: We can clear the list of events if we receive a
      // 'clear all' event. We know there wont be any events to
      // replay to get to current state of whiteboard right after
      // a clear (whiteboard will be empty). This assumption might
      // change once we implement Undo/Redo functions though.

      // In the Poc it used to look like this:
      // if (event.type === 'painterClear') {
      //   this.events.splice(0, this.events.length - 1);
      // }
    }
  }

  private parseAndEmitEvent(event: PainterEvent) {
    // NOTE: Empty object if param is undefined.
    let eventParam = event.param ? event.param : "{}";

    // NOTE: In our case (based on the PaintEventSerializer implementation) the param
    // will be a JSON stringified fabric.js target object. We may want to introduce
    // some more type safety for this once we start doing data optimizations in the
    // serializer. Param data will not be modified by the server.
    let target = JSON.parse(eventParam);

    // this.emit(event.type, event.objectType, target);

    // NOTE: Right now it might seem unnecessary to have all these events
    // sharing all the same parameters. But in the future if we apply
    // som optimization the parameters might be different between add
    // delete, moved. etc.

    switch (event.type) {
      case "added": this.added(event.id, event.objectType, target); break;
      case "moved": this.moved(event.id, event.objectType, target); break;
      case "delete": console.error("Not implemented yet!"); break;
      case "move": console.error("Not implemented yet!"); break;
    }
  }

  private added(id: string, objectType: string, target: any) {
    this.emit("added", id, objectType, target);
  }

  private moved(id: string, objectType: string, target: any) {
    this.emit("moved", id, objectType, target);
  }
}
