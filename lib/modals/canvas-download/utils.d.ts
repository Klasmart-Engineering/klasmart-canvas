interface IProps {
    backgroundImage?: string | File;
    backgroundColor?: string;
    localImage?: string | File;
    width: number;
    height: number;
    canvas: fabric.Canvas;
    onClose: (close: boolean) => void;
}
/**
 * Download method for canvas.
 * @param type Type of image, either png or jpg.
 */
export declare const downloadCanvas: (props: IProps, type: string) => void;
export {};
