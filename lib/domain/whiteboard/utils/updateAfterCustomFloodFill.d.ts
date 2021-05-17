import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import { IFloodFillData } from './floodFiller';
export interface ITargetObject extends ICanvasObject {
    color: string;
}
export declare const updateAfterCustomFloodFill: (itemId: string, image: fabric.Image, target: ITargetObject, clickedColor: string, canvas: fabric.Canvas, userId: string, data: IFloodFillData, eventSerializer: PaintEventSerializer) => Promise<ICanvasObject>;
