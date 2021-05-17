/// <reference types="react" />
import { IPointerType } from '../../../interfaces/pointers/pointer-type';
export declare const usePointer: (pointerType?: IPointerType) => {
    pointer: IPointerType;
    updatePointer: import("react").Dispatch<import("react").SetStateAction<IPointerType>>;
};
