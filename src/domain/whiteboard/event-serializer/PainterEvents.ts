import { v4 as uuidv4 } from 'uuid';
import { ObjectEvent } from './PaintEventSerializer';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

export class PainterEvents {
  public static createId(canvasId: string): string {
    return `${canvasId}:${uuidv4()}`;
  }

  public static isCreatedWithId(id: string, canvasId: string) {
    if (canvasId === undefined) return false;

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
    if (this.isCreatedWithId(id, canvasId)) {
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
    if (this.isCreatedWithId(id, canvasId)) {
      return {
        type: 'path',
        target,
        id,
      };
    }
  }

  public static generateAndSetIdForTarget(userId: string, target: any): void {
    const id = PainterEvents.createId(userId);
    target.set({ id });
  }
}
