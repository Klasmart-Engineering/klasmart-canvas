import { v4 as uuidv4 } from 'uuid';
import { ObjectEvent } from './PaintEventSerializer';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

export class PainterEvents {
  public static createId(canvasId: string): string {
    return `${canvasId}:${uuidv4()}`;
  }

  private static isLocalObject(id: string, canvasId: string) {
    const object = id.split(':');

    if (!object.length) {
      throw new Error('Invalid ID');
    }

    return object[0] === canvasId;
  }

  public static pathCreated(
    target: ICanvasObject,
    id: string,
    canvasId: string
  ): ObjectEvent | undefined {
    if (this.isLocalObject(id, canvasId)) {
      return {
        type: 'path',
        target,
        id,
      };
    }
  }

  public static objectAdded(
    target: ICanvasObject,
    id: string,
    canvasId: string
  ): ObjectEvent | undefined {
    if (this.isLocalObject(id, canvasId)) {
      return {
        type: 'path',
        target,
        id,
      };
    }
  }
}
