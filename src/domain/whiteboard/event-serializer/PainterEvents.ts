import { v4 as uuidv4 } from 'uuid';
import { ObjectEvent } from './PaintEventSerializer';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

interface IPathTarget {
  stroke: string;
  strokeWidth: number;
  path: ICanvasObject;
}

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
    target: IPathTarget,
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
    target: IPathTarget,
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
