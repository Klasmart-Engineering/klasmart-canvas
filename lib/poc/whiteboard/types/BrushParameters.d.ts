export declare class BrushParameters {
    style?: string;
    width?: number;
    static default(): BrushParameters;
    static withParams(brush: BrushParameters): BrushParameters;
    static withStyle(style: string): BrushParameters;
    static withWidth(width: number): BrushParameters;
}
