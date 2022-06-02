import { ICanvasMouseCordsEvent } from "../canvas-events/canvas-mouse-event";

export interface ICanvasPanEventObject {
    pan:ICanvasMouseCordsEvent;
    userId:string;
}