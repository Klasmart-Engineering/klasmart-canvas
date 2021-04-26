import { fabric } from 'fabric';
import { CanvasAction } from '../reducers/undo-redo';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IBrushType } from '../../../interfaces/brushes/brush-type';
export declare const useCanvasActions: (canvas: fabric.Canvas, dispatch: (action: CanvasAction) => void, canvasId: string, eventSerializer: any, userId: string, ignoreDirectActions?: boolean | undefined) => {
    actions: {
        fillColor: (color: string) => void;
        changeStrokeColor: (color: string) => void;
        changeBrushType: (type: IBrushType) => void;
        textColor: (color: string) => void;
        clearWhiteboardClearAll: () => Promise<void>;
        discardActiveObject: () => void;
        addShape: (shapeToAdd: string) => void;
        eraseObject: () => void;
        reorderShapes: () => void;
        setCanvasSelection: (selection: boolean) => void;
        setHoverCursorObjects: (cursor: string) => void;
        setObjectControlsVisibility: (object: ICanvasObject, visibility: boolean) => void;
        undo: () => void;
        redo: () => void;
        clearWhiteboardAllowClearOthers: (userId: string) => Promise<void>;
        clearWhiteboardClearMySelf: () => Promise<void>;
        fillBackgroundColor: (color: string) => Promise<void>;
        setBackgroundColorInCanvas: (color: string) => void;
        isCursorObject: (object: ICanvasObject) => boolean;
        findObjectById: (id: string) => ICanvasObject;
    };
    mouseDown: (specific: string, color?: string | undefined) => void;
};
