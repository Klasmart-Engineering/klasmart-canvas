import { EventEmitter } from 'events';
import { IPainterController } from './IPainterController';
import { PainterEvent } from './PainterEvent';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IStampSyncTarget } from '../../../interfaces/stamps/stamp-sync-target';

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

  private isEventRunning: boolean = false;

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
        case 'sendStamp': {
          this.emit('sendStamp', data.id, data.target);
          break;
        }
        case 'brushTypeChanged': {
          this.emit('brushTypeChanged', data.id, data.target);
          break;
        }
        case 'setUserInfoToDisplay': {
          this.emit('setUserInfoToDisplay', data.id, data.target);
          break;
        }
        case 'three': {
          this.emit('three', data.id, data.objectType, data.target);
          break;
        }
        /**
         * Reconstruct event for real time undo/redo
         */
        case 'reconstruct': {
          this.emit('reconstruct', data.id, data.target);
          break;
        }
        default:
          break;
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

  handlePainterEvent(events: PainterEvent[]) {
    for (const event of events) {
      if (event.isPersistent) {
        this.waitForEventRunningChanges().then(() => {
          this.events.push(event);
          this.parseAndEmitEvent(event);
        });
      } else {
        this.events.push(event);
        this.parseAndEmitEvent(event);
      }

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

  public setEventRunning(value: boolean) {
    this.isEventRunning = value;
  }

  public getEventRunning() {
    return this.isEventRunning;
  }

  private waitForEventRunningChanges() {
    return new Promise<void>(async (resolve, reject) => {
      let totalTime = 0;
      const limitTime = 1000;
      const timePerIteration = 10;

      const timeout = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };

      const isFinished = (): Promise<boolean> => {
        return new Promise(async (resolve) => {
          if (totalTime >= limitTime) resolve(false);

          if (!this.getEventRunning()) {
            resolve(true);
          } else {
            await timeout(timePerIteration);
            totalTime += timePerIteration;
            resolve(isFinished());
          }
        });
      };

      const result = await isFinished();

      if (result) {
        resolve();
      } else if (result === false) {
        reject();
      }
    });
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
        this.moved(event.id, event.objectType, target, !!event.isPersistent);
        break;
      case 'rotated':
        this.rotated(event.id, event.objectType, target, !!event.isPersistent);
        break;
      case 'scaled':
        this.scaled(event.id, event.objectType, target, !!event.isPersistent);
        break;
      case 'skewed':
        this.skewed(event.id, target);
        break;
      case 'colorChanged':
        this.colorChanged(
          event.id,
          event.objectType,
          target,
          !!event.isPersistent
        );
        break;
      case 'modified':
        this.modified(event.id, event.objectType, target, !!event.isPersistent);
        break;
      case 'fontFamilyChanged':
        this.fontFamilyChanged(event.id, target, !!event.isPersistent);
        break;
      case 'removed':
        this.removed(event.id, target, !!event.isPersistent);
        break;
      case 'moving':
        this.moving(event.id, target);
        break;
      case 'setToolbarPermissions':
        this.setToolbarPermissions(event.id, target, !!event.isPersistent);
        break;
      case 'lineWidthChanged':
        this.lineWidthChanged(
          event.id,
          event.objectType,
          target,
          !!event.isPersistent
        );
        break;
      case 'pointer':
        this.pointer(event.id, target);
        break;
      case 'textEdit':
        this.textEdit(event.id, target);
        break;
      case 'brushTypeChanged':
        this.brushTypeChanged(event.id, target, !!event.isPersistent);
        break;
      case 'backgroundColorChanged':
        this.backgroundColorChanged(event.id, target);
        break;
      case 'sendStamp':
        this.sendStamp(event.id, target, !!event.isPersistent);
        break;
      case 'fontColorChanged':
        this.fontColorChanged(
          event.id,
          event.objectType,
          target,
          !!event.isPersistent
        );
        break;
      case 'reconstruct':
        this.reconstruct(event.id, target, !!event.isPersistent);
        break;
      case 'cursorPointer':
        this.cursorPointer(event.id, target);
        break;
      case 'setUserInfoToDisplay':
        this.setUserInfoToDisplay('setUserInfoToDisplay', target);
        break;
      case 'three':
        this.three(event.id, event.objectType, target)
        break;
      default:
        break;
    }
  }

  private setUserInfoToDisplay(id: string, target: ICanvasObject) {
    this.emit('setUserInfoToDisplay', id, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, eventType: 'setUserInfoToDisplay', target })
    );
  }
  


  private three(id: string, objectType: string, target: string) {

    this.emit('three', id, objectType, target);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ 
        id,
        objectType,
        eventType: 'three',
        target,
       })
    );

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

  private moved(
    id: string,
    objectType: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('moved', id, objectType, target, isPersistent);

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

  private rotated(
    id: string,
    objectType: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('rotated', id, objectType, target, isPersistent);

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

  private scaled(
    id: string,
    objectType: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('scaled', id, objectType, target, isPersistent);

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

  private colorChanged(
    id: string,
    objectType: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('colorChanged', id, objectType, target, isPersistent);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, objectType, eventType: 'colorChanged', target })
    );
  }

  private modified(
    id: string,
    objectType: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('modified', id, objectType, target, isPersistent);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, objectType, target, eventType: 'modified' })
    );
  }

  private fontFamilyChanged(
    id: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('fontFamilyChanged', id, target, isPersistent);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, target, eventType: 'fontFamilyChanged' })
    );
  }

  private reconstruct(id: string, target: PainterEvent, isPersistent: boolean) {
    this.emit('reconstruct', id, target, isPersistent);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(JSON.stringify({ id, target, eventType: 'reconstruct' }));
  }

  private removed(id: string, target: boolean, isPersistent: boolean) {
    this.emit('removed', id, target, isPersistent);

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

  private setToolbarPermissions(
    id: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('setToolbarPermissions', id, target, isPersistent);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, target, eventType: 'setToolbarPermissions' })
    );
  }

  private fontColorChanged(
    id: string,
    objectType: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('fontColorChanged', id, objectType, target, isPersistent);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(
      JSON.stringify({ id, objectType, eventType: 'fontColorChanged', target })
    );
  }

  private lineWidthChanged(
    id: string,
    objectType: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('lineWidthChanged', id, objectType, target, isPersistent);

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

  private brushTypeChanged(
    id: string,
    target: ICanvasObject,
    isPersistent: boolean
  ) {
    this.emit('brushTypeChanged', id, target, isPersistent);

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

  private sendStamp(
    id: string,
    target: IStampSyncTarget,
    isPersistent: boolean
  ) {
    this.emit('sendStamp', id, target, isPersistent);

    // TEMPORARY for realtime testing purposes.
    if (!this.ws?.readyState) return;
    this.ws?.send(JSON.stringify({ id, eventType: 'sendStamp', target }));
  }
}
