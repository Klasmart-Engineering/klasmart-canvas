import { ICanvasObject } from '../objects/canvas-object';
export interface IUndoRedoSingleEvent {
    id: string;
    target: ICanvasObject;
}
