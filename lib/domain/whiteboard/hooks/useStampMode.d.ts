/// <reference types="react" />
import { IStampMode } from '../../../interfaces/stamps/stamp-mode';
export declare const useStampMode: (mode?: IStampMode) => {
    stampMode: IStampMode;
    updateStampMode: import("react").Dispatch<import("react").SetStateAction<IStampMode>>;
};
