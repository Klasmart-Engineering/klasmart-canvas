/// <reference types="react" />
/**
 * Modal props.
 */
declare type Props = {
    open: boolean;
    onClose: (open: boolean) => void;
    canvas: fabric.Canvas;
    backgroundColor?: string | undefined;
    backgroundImage?: string | File | undefined;
    localImage?: string | File | undefined;
    width: number;
    height: number;
};
/**
 * Modal component to confirm download.
 * @param props Component props.
 */
export declare const CanvasDownloadConfirm: (props: Props) => JSX.Element;
export {};
