import { TypedShape } from "../../../interfaces/shapes/shapes";
export declare function canvasBoardReducer(state: {
    resize: boolean;
    shape: TypedShape | null;
    startPoint: {
        x: number;
        y: number;
    };
} | undefined, action: {
    type: string;
    payload?: any;
}): {
    shape: any;
    resize: boolean;
    startPoint: {
        x: number;
        y: number;
    };
} | {
    startPoint: any;
    resize: boolean;
    shape: TypedShape | null;
};
