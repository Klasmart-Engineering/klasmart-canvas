import { EventEmitter } from 'events';
import { IPainterController } from './IPainterController';
import { PainterEvent } from './PainterEvent';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

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
    this.emit('aboutToReplayAll');
    // If we call the parseAndEmitEvent too soon, 
    // the shouldHandleRemoteEvent in useSynchronizedAdded.tsx still is previous state.
    await new Promise(resolve => setTimeout(resolve, 100));
    for (const event of this.events) {
      this.parseAndEmitEvent(event);
    }
  }

  cleanEvents(): void {
    while(this.events.length > 0) {
      this.events.pop();
    }
  }

  fillEvents(events: PainterEvent[]): void {
    for (const event of events) {
      this.events.push(event);
    }
  }

  handlePainterEvent(events: PainterEvent[], replaying?: boolean): void {
    if (replaying) {
      this.cleanEvents();
      this.fillEvents(events);
      this.replayEvents();
    }else {
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
  }

  requestRefetch(): void {
    this.emit('refetch');
  }

  private parseAndEmitEvent(event: PainterEvent) {
    // NOTE: Empty object if param is undefined.
    const eventParam = event.param ? event.param : '{}';

    // NOTE: In our case (based on the PaintEventSerializer implementation) the param
    // will be a JSON stringified fabric.js target object. We may want to introduce
    // some more type safety for this once we start doing data optimizations in the
    // serializer. Param data will not be modified by the server.
    const target = JSON.parse(eventParam);

    // this.emit(event.type, event.objectType, target);

    // NOTE: Right now it might seem unnecessary to have all these events
    // sharing all the same parameters. But in the future if we apply
    // som optimization the parameters might be different between add
    // delete, moved. etc.

    switch (event.type) {
      case 'added':
        this.added(event.id, event.generatedBy, event.objectType, target);
        break;
      case 'moved':
        this.moved(event.id, event.generatedBy, event.objectType, target);
        break;
      case 'rotated':
        this.rotated(event.id, event.generatedBy, event.objectType, target);
        break;
      case 'scaled':
        this.scaled(event.id, event.generatedBy, event.objectType, target);
        break;
      case 'skewed':
        this.skewed(event.id, event.generatedBy, target);
        break;
      case 'colorChanged':
        this.colorChanged(event.id, event.generatedBy, event.objectType, target);
        break;
      case 'modified':
        this.modified(event.id, event.generatedBy, event.objectType, target);
        break;
      case 'fontFamilyChanged':
        this.fontFamilyChanged(event.id, event.generatedBy, target);
        break;
      case 'removed':
        this.removed(event.id, event.generatedBy, target);
        break;
      case 'reconstruct':
        this.reconstruct(event.id, event.generatedBy, event);
        break;
      case 'moving':
        this.moving(event.id, event.generatedBy, target);
        break;
      case 'setToolbarPermissions':
        this.setToolbarPermissions(event.id, event.generatedBy, target);
        break;
      case 'fontColorChanged':
        this.fontColorChanged(event.id, event.generatedBy, event.objectType, target);
        break;
      case 'lineWidthChanged':
        this.lineWidthChanged(event.id, event.generatedBy, event.objectType, target);
        break;
      case 'canvasPanned':
        this.canvasPanned(event.id, event.generatedBy, target);
        break;
    }
  }

  private added(id: string, generatedBy: string, objectType: string, target: ICanvasObject) {
    this.emit('added', id, generatedBy, objectType, target);
  }

  private moved(id: string, generatedBy: string, objectType: string, target: ICanvasObject) {
    this.emit('moved', id, generatedBy, objectType, target);
  }

  private rotated(id: string, generatedBy: string, objectType: string, target: ICanvasObject) {
    this.emit('rotated', id, generatedBy, objectType, target);
  }

  private scaled(id: string, generatedBy: string, objectType: string, target: ICanvasObject) {
    this.emit('scaled', id, generatedBy, objectType, target);
  }

  private skewed(id: string, generatedBy: string, target: ICanvasObject) {
    this.emit('skewed', generatedBy, id, target);
  }

  private colorChanged(id: string, generatedBy: string, objectType: string, target: ICanvasObject) {
    this.emit('colorChanged', id, generatedBy, objectType, target);
  }

  private modified(id: string, generatedBy: string, objectType: string, target: ICanvasObject) {
    this.emit('modified', id, generatedBy, objectType, target);
  }

  private fontFamilyChanged(id: string, generatedBy: string, target: ICanvasObject) {
    this.emit('fontFamilyChanged', id, generatedBy, target);
  }

  private reconstruct(id: string, generatedBy: string, target: PainterEvent) {
    this.emit('reconstruct', id, generatedBy, target);
  }

  private removed(id: string, generatedBy: string, target: boolean) {
    this.emit('removed', id, generatedBy, target);
  }

  private moving(id: string, generatedBy: string, target: ICanvasObject) {
    this.emit('moving', id, generatedBy, target);
  }

  private setToolbarPermissions(id: string, generatedBy: string, target: ICanvasObject) {
    this.emit('setToolbarPermissions', id, generatedBy, target);
  }

  private fontColorChanged(
    id: string,
    generatedBy: string,
    objectType: string,
    target: ICanvasObject
  ) {
    this.emit('fontColorChanged', id, generatedBy, objectType, target);
  }

  private lineWidthChanged(
    id: string,
    generatedBy: string,
    objectType: string,
    target: ICanvasObject
  ) {
    this.emit('lineWidthChanged', id, generatedBy, objectType, target);
  }

  private canvasPanned(
    id: string,
    generatedBy: string,
    target: ICanvasObject
  ) {
    this.emit('canvasPanned', id, generatedBy, target);
  }
}
