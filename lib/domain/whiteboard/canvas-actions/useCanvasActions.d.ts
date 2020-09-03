import { fabric } from 'fabric';
export declare const useCanvasActions: (canvas?: fabric.Canvas | undefined, dispatch?: any, canvasId?: string | undefined, eventSerializer?: any, userId?: string | undefined) => {
    actions: {
        fillColor: (color: string) => void;
        changeStrokeColor: (color: string) => void;
        textColor: (color: string) => void;
        clearWhiteboardClearAll: () => void;
        discardActiveObject: () => void;
        addShape: (shapeToAdd: string) => void;
        eraseObject: () => void;
        setCanvasSelection: (selection: boolean) => void;
        setHoverCursorObjects: (cursor: string) => void;
        undo: () => void;
        redo: () => void;
        clearWhiteboardAllowClearOthers: (userId: string) => void;
        clearWhiteboardClearMySelf: () => void;
    };
    mouseDown: (specific: string, color?: string | undefined) => void;
};
