import { PainterEvent, PainterEventType } from './PainterEvent';
import { EventEmitter } from 'events';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IToolbarUI } from '../../../interfaces/toolbar/toolbar-ui';
import { IBrushSyncTarget } from '../../../interfaces/brushes/brush-sync-target';
import { Image } from 'fabric/fabric-impl';
import { IStampSyncTarget } from '../../../interfaces/stamps/stamp-sync-target';
import { IShapeCreationTarget } from '../../../interfaces/brushes/shape-creation-target';

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

export interface ObjectEvent {
  id: string;
  type?: ObjectType;
  target?: PayloadTarget;
  avoidPersistentStoring?: boolean;
}

export interface IBackgroundImageEvent {
  id: string | undefined;
  type?: ObjectType;
  target?:
    | Image
    | string
    | File
    | { backgroundImage: string | File; id: string };
}

export type ObjectType =
  | 'path'
  | 'textbox'
  | 'activeSelection'
  | 'reconstruct'
  | 'shape'
  | 'background'
  | 'image'
  | 'pointer'
  | 'group'
  | 'gif'
  | 'backgroundImage'
  | 'backgroundAdded'
  | 'localImage'
  | 'svg'
  | 'userInfoToDisplay'
  | 'cursorPointer'
  | 'creating3d'
  | 'exporting3d'
  | 'camera3d';

export type PayloadTarget =
  | ICanvasObject
  | { objects: ICanvasObject[] }
  | { background: string }
  | { backgroundImage: fabric.Image }
  | { pointer: boolean }
  | boolean
  | { activeIds?: string[]; eTarget?: ICanvasObject; isGroup?: boolean }
  | IToolbarUI
  | string
  | {
      coordinates: { x: number; y: number }[];
      lineWidth: number;
      color: string;
    }
  | { type: string; svg: string }
  | IBrushSyncTarget
  | IStampSyncTarget
  | IShapeCreationTarget
  | { src: string }
  | string
  | { x: number; y: number; z: number };
export class PaintEventSerializer extends EventEmitter
  implements PaintEventSerializer {
  readonly multiplier: number;
  readonly serializedEventIDs: string[] = [];

  constructor(multiplier: number) {
    super();
    this.multiplier = multiplier;
  }

  /**
   * Push a new event to be serialized for synchronization.
   */
  push(type: PainterEventType, object: ObjectEvent): void {
    // TODO: Optmization of which data get serialized, for example:
    // we wouldn't need to send anything other than id and position
    // for move events, or the updated color if object color was
    // modified.

    // TODO: In the case of line shapes, we will want the users to see
    // the line appear directly, not just when it's finished. In this
    // case we want to just send the object ID and the additional points
    // being added. In the PoC I solved this by having begin/end events
    // which just set up the properties of the line (color/thickness).
    // We may want to think of similar optimizations later as well.
    // Example of this was the 'shapeBegin' event, where brushParameters
    // set up the style for the line.
    //
    // shapeBegin(id: string, brushParameters: BrushParameters): void {
    // const data: OperationData = {
    //  brush: brushParameters,
    // };
    //
    // const event: PainterEvent = {
    //   type: 'shapeBegin',
    //   id: id,
    //   param: JSON.stringify(data),
    // };
    //

    // console.log(`Serializing event for object: ${object.id}`);

    const shape = (object.target as IShapeCreationTarget)?.shape;

    if (type === 'moving' && shape?.basePath) {
      (object.target as IShapeCreationTarget).shape = shape.toJSON([
        'basePath',
      ]);
    }

    const uniqueObjectId = object.id;
    const serialized: PainterEvent = {
      id: uniqueObjectId,
      type,
      objectType: object.type as string,
      param: JSON.stringify(object.target),
      avoidPersistentStoring: object.avoidPersistentStoring,
    };

    // NOTE: The list of ID's this serialized generated is for filtering
    // purposes. Preventing the local user from handling the same event
    // twice. This state can be checked by using the 'didSerializeEvent'
    // function.
    this.serializedEventIDs.push(uniqueObjectId);
    this.emit('event', serialized);
  }

  didSerializeEvent(id: string) {
    return this.serializedEventIDs.findIndex((id2) => id2 === id) !== -1;
  }
}
