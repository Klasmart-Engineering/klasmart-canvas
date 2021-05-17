/// <reference types="react" />
import { IBrushType } from '../../../interfaces/brushes/brush-type';
export declare const useBrushType: (type?: IBrushType) => {
    brushType: IBrushType;
    updateBrushType: import("react").Dispatch<import("react").SetStateAction<IBrushType>>;
};
