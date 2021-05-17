export declare type ScaleMode = "ScaleToFit" | "ScaleToFill" | "ScaleFitHorizontally" | "ScaleFitVertically";
export default function useFixedAspectScaling(parent: Element | undefined | null, aspectRatio: number, scaleMode: ScaleMode): {
    top: number;
    left: number;
    width: number;
    height: number;
};
