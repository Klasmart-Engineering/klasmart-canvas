/// <reference types="react" />
/**
 * Hook that updates and indicates if laser pointer is active.
 */
export declare const useLaserIsActive: () => {
    laserIsActive: boolean;
    updateLaserIsActive: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
/**
 * Hook that updates and indicates if laser pointer is available.
 */
export declare const useLaserIsAvailable: () => {
    laserIsAvailable: boolean;
    updateLaserIsAvailable: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
