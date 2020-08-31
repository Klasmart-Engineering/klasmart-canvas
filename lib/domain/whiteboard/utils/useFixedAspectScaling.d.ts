export declare type ScaleMode = "ScaleToFit" | "ScaleToFill";
export default function useFixedAspectScaling(parent: Element | undefined | null, aspectRatio: number, scaleMode: ScaleMode): {
    top: number;
    left: number;
    width: number;
    height: number;
};
