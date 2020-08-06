import { fabric } from 'fabric';
import ICanvasActions from './ICanvasActions';
export interface ICanvasActionsState {
    actions: ICanvasActions;
    mouseDown: (specific: string, color?: string) => void;
}
export declare const useCanvasActions: (canvas?: fabric.Canvas | undefined) => {
    actions: ICanvasActions;
    mouseDown: (specific: string, color?: string | undefined) => void;
};
