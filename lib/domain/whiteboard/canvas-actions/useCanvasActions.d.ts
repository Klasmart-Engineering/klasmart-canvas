import { fabric } from 'fabric';
export declare const useCanvasActions: (userId: string, canvasId: string, generatedBy: string, canvas?: fabric.Canvas | undefined, dispatch?: any, eventSerializer?: any) => {
    actions: {
        fillColor: (color: string) => void;
        changeStrokeColor: (color: string) => void;
        textColor: (color: string) => void;
        discardActiveObject: () => void;
        addShape: (shapeToAdd: string) => void;
        eraseObject: () => void;
        setCanvasSelection: (selection: boolean) => void;
        setHoverCursorObjects: (cursor: string) => void;
        undo: () => void;
        redo: () => void;
        clear: (filterUsers?: string[] | undefined) => void;
        clearSelf: () => void;
    };
    mouseDown: (specific: string, color?: string | undefined) => void;
};
