/// <reference types="node" />
import { PainterEvent, PainterEventType } from './PainterEvent';
import { EventEmitter } from 'events';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IToolbarUI } from '../../../interfaces/toolbar/toolbar-ui';
import { IBrushSyncTarget } from '../../../interfaces/brushes/brush-sync-target';
import { Image } from 'fabric/fabric-impl';
import { IStampSyncTarget } from '../../../interfaces/stamps/stamp-sync-target';
import { IShapeCreationTarget } from '../../../interfaces/brushes/shape-creation-target';
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
    target?: Image | string | File | {
        backgroundImage: string | File;
        id: string;
    };
}
export declare type ObjectType = 'path' | 'textbox' | 'activeSelection' | 'reconstruct' | 'shape' | 'background' | 'image' | 'pointer' | 'group' | 'gif' | 'backgroundImage' | 'backgroundAdded' | 'localImage' | 'svg' | 'userInfoToDisplay' | 'cursorPointer';
export declare type PayloadTarget = ICanvasObject | {
    objects: ICanvasObject[];
} | {
    background: string;
} | {
    backgroundImage: fabric.Image;
} | {
    pointer: boolean;
} | boolean | {
    activeIds?: string[];
    eTarget?: ICanvasObject;
    isGroup?: boolean;
} | IToolbarUI | string | {
    coordinates: {
        x: number;
        y: number;
    }[];
    lineWidth: number;
    color: string;
} | {
    type: string;
    svg: string;
} | IBrushSyncTarget | IStampSyncTarget | IShapeCreationTarget | {
    src: string;
} | string;
export declare class PaintEventSerializer extends EventEmitter implements PaintEventSerializer {
    readonly multiplier: number;
    readonly serializedEventIDs: string[];
    constructor(multiplier: number);
    /**
     * Push a new event to be serialized for synchronization.
     */
    push(type: PainterEventType, object: ObjectEvent): void;
    didSerializeEvent(id: string): boolean;
}
