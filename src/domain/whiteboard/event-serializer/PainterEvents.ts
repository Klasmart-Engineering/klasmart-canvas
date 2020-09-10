import { v4 as uuidv4 } from 'uuid';
import { ObjectEvent } from './PaintEventSerializer';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

export class PainterEvents {
  public static createId(canvasId: string): string {
    return `${canvasId}:${uuidv4()}`;
  }

  public static isCreatedWithId(id: string, canvasId: string) {
    if (canvasId === undefined) return false;

    const canvasIdParts = id.split(':');
    if (canvasIdParts.length < 1)
      throw new Error('Invalid canvas ID');

    const parts = id.split(':');

    if (parts.length < 2) {
      throw new Error('Invalid ID');
    }

    return parts[0] === canvasIdParts[0];
  }

  public static getEventGroup(id: string): string | undefined {
    const parts = id.split(':');
    if (parts.length >= 3) {
      return parts[1];
    } else {
      return undefined;
    }
  }

  public static isCreatedWithGroup(id: string, group: string) {
    const parts = id.split(':');
    if (parts.length < 3) return false;

    return parts[1] === group;
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

  public static generateAndSetIdForTarget(userId: string, generatedBy: string, target: any): void {
    const id = PainterEvents.createId(userId);
    target.set({ id, generatedBy });
  }
}
