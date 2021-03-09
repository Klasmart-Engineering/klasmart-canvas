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

  public ws: WebSocket | null;

  constructor() {
    super();

    // Websocket is used for test purposes until event emitter is ready. TEMPORARY.
    // @ts-ignore
    this.ws = new WebSocket(`ws://${window.location.hostname}:6969`);

    this.ws.onopen = () => {
      console.log('opened');
    };

    this.ws.onmessage = (event) => {
      let data = JSON.parse(event.data);

      switch (data.eventType) {
        case 'moving': {
          this.emit('moving', data.id, data.target);
          break;
        }
        case 'added': {
          this.emit('added', data.id, data.objectType, data.target);
          break;
        }
        case 'moved': {
          this.emit('moved', data.id, data.objectType, data.target);
          break;
        }
        case 'lineWidthChanged': {
          this.emit('lineWidthChanged', data.id, data.objectType, data.target);
          break;
        }
        case 'textEdit': {
          this.emit('textEdit', data.id, data.target);
          break;
        }
        case 'modified': {
          this.emit('modified', data.id, data.objectType, data.target);
          break;
        }
        case 'rotated': {
          this.emit('rotated', data.id, data.objectType, data.target);
          break;
        }
        case 'scaled': {
          this.emit('scaled', data.id, data.objectType, data.target);
          break;
        }
        case 'removed': {
          this.emit('removed', data.id, data.target);
          break;
        }
        case 'skewed': {
          this.emit('skewed', data.id, data.target);
          break;
        }
        case 'colorChanged': {
          this.emit('colorChanged', data.id, data.objectType, data.target);
          break;
        }
        case 'fontFamilyChanged': {
          this.emit('fontFamilyChanged', data.id, data.target);
          break;
        }
        case 'pointer': {
          this.emit('pointer', data.id, data.target);
          break;
        }
        case 'setToolbarPermissions': {
          this.emit('setToolbarPermissions', data.id, data.target);
          break;
        }
        case 'fontColorChanged': {
          this.emit('fontColorChanged', data.id, data.objectType, data.target);
          break;
        }
        case 'cursorPointer': {
          this.emit('cursorPointer', data.id, data.target);
          break;
        }
        case 'backgroundColorChanged': {
          this.emit('backgroundColorChanged', data.id, data.target);
          break;
        }
        case 'brushTypeChanged': {
          this.emit('brushTypeChanged', data.id, data.target);
          break;
        }
      }
    };

    this.ws.onclose = () => {
      this.ws = null;
    };
  }

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
        this.added(event.id, event.objectType, target, !!event.isPersistent);
        break;
      case 'moved':
        this.moved(event.id, event.objectType, target);
        break;
      case 'rotated':
        this.rotated(event.id, event.objectType, target);
        break;
      case 'scaled':
        this.scaled(event.id, event.objectType, target);
        break;
      case 'skewed':
        this.skewed(event.id, target);
        break;
      case 'colorChanged':
        this.colorChanged(event.id, event.objectType, target);
        break;
      case 'modified':
        this.modified(event.id, event.objectType, target);
        break;
      case 'fontFamilyChanged':
        this.fontFamilyChanged(event.id, target);
        break;
      case 'removed':
        this.removed(event.id, target);
        break;
      case 'moving':
        this.moving(event.id, target);
        break;
      case 'setToolbarPermissions':
        this.setToolbarPermissions(event.id, target);
        break;
      case 'lineWidthChanged':
        this.lineWidthChanged(event.id, event.objectType, target);
        break;
      case 'pointer':
        this.pointer(event.id, target);
        break;
      case 'textEdit':
        this.textEdit(event.id, target);
        break;
      case 'brushTypeChanged':
        this.brushTypeChanged(event.id, target);
        break;
      case 'backgroundColorChanged':
        this.backgroundColorChanged(event.id, target);
        break;
      case 'fontColorChanged':
        this.fontColorChanged(event.id, event.objectType, target);
        break;
      case 'reconstruct':
        this.emit('reconstruct', event.id, target);
        break;
      case 'cursorPointer':
        this.cursorPointer(event.id, target);
        break;
    }
  }

  private textEdit(id: string, target: ICanvasObject) {
    this.emit('textEdit', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, eventType: 'textEdit', target: { ...target, id } })
    );
  }

  private added(
    id: string,
    objectType: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('added', id, objectType, target, isPersistent);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({
        id,
        objectType,
        eventType: 'added',
        target: { ...target, id },
      })
    );
  }

  private moved(id: string, objectType: string, target: ICanvasObject) {
    this.emit('moved', id, objectType, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({
        id,
        objectType,
        eventType: 'moved',
        target: { ...target },
      })
    );
  }

  private rotated(id: string, objectType: string, target: ICanvasObject) {
    this.emit('rotated', id, objectType, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({
        id,
        objectType,
        eventType: 'rotated',
        target: { ...target },
      })
    );
  }

  private scaled(id: string, objectType: string, target: ICanvasObject) {
    this.emit('scaled', id, objectType, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, objectType, eventType: 'scaled', target })
    );
  }

  private skewed(id: string, target: ICanvasObject) {
    this.emit('skewed', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(JSON.stringify({ id, eventType: 'skewed', target }));
  }

  private colorChanged(id: string, objectType: string, target: ICanvasObject) {
    this.emit('colorChanged', id, objectType, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, objectType, eventType: 'colorChanged', target })
    );
  }

  private modified(id: string, objectType: string, target: ICanvasObject) {
    this.emit('modified', id, objectType, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, objectType, target, eventType: 'modified' })
    );
  }

  private fontFamilyChanged(id: string, target: ICanvasObject) {
    this.emit('fontFamilyChanged', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, target, eventType: 'fontFamilyChanged' })
    );
  }

  // private reconstruct(id: string, target: PainterEvent) {
  //   this.emit('reconstruct', id, target);

  //   // TEMPORARY for realtime testing purposes.
  //   this.ws?.send(JSON.stringify({ id, target, eventType: 'reconstruct' }));
  // }

  private removed(id: string, target: boolean) {
    this.emit('removed', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(JSON.stringify({ id, target, eventType: 'removed' }));
  }

  private moving(id: string, target: ICanvasObject) {
    this.emit('moving', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(JSON.stringify({ id, target, eventType: 'moving' }));
  }

  private setToolbarPermissions(id: string, target: ICanvasObject) {
    this.emit('setToolbarPermissions', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, target, eventType: 'setToolbarPermissions' })
    );
  }

  private fontColorChanged(
    id: string,
    objectType: string,
    target: ICanvasObject
  ) {
    this.emit('fontColorChanged', id, objectType, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, objectType, eventType: 'fontColorChanged', target })
    );
  }

  private lineWidthChanged(
    id: string,
    objectType: string,
    target: ICanvasObject
  ) {
    this.emit('lineWidthChanged', id, objectType, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, objectType, eventType: 'lineWidthChanged', target })
    );
  }

  private pointer(id: string, target: ICanvasObject) {
    this.emit('pointer', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(JSON.stringify({ id, eventType: 'pointer', target }));
  }

  private cursorPointer(id: string, target: ICanvasObject) {
    this.emit('cursorPointer', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(JSON.stringify({ id, eventType: 'cursorPointer', target }));
  }

  private brushTypeChanged(id: string, target: ICanvasObject) {
    this.emit('brushTypeChanged', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, eventType: 'brushTypeChanged', target })
    );
  }

  private backgroundColorChanged(id: string, target: ICanvasObject) {
    this.emit('backgroundColorChanged', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, eventType: 'backgroundColorChanged', target })
    );
  }
}
