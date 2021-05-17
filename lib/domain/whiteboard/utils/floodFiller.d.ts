declare type ColorRGBA = {
    r: number;
    g: number;
    b: number;
    a: number;
};
declare type LineQueued = [number, number, number, number];
export interface IFloodFillData {
    coords: number[];
    x: number;
    y: number;
    width: number;
    height: number;
    edgeCoordinates: {
        x: number;
        y: number;
    }[][];
}
export default class FloodFiller {
    imageData: ImageData;
    color: ColorRGBA | undefined;
    replacedColor: ColorRGBA | undefined;
    tolerance: number;
    queue: LineQueued[];
    coords: number[];
    maxX: number;
    minX: number;
    maxY: number;
    minY: number;
    autoTolerance: number;
    coordsFilled: [number, number, number, number][];
    /**
     * Class constructor
     * @param imageData Canvas ImageData
     */
    constructor(imageData: ImageData);
    private RGBA2Hex;
    getReplacedColor: () => string;
    /**
     * Gets color of specific pixel.
     * @param imageData Canvas ImageData
     * @param x X coordinate
     * @param y Y coordinate
     */
    getColorAtPixel: (x: number, y: number) => ColorRGBA;
    /**
     * Changes hex color to rgba
     * @param hex color hex string
     * @param alpha Opacity
     */
    hex2RGBA(hex: string, alpha?: number): ColorRGBA;
    /**
     * Checks if colors are the same.
     * @param a Color to compare
     * @param b Color to compare
     * @param tolerance Color tolerance. If not 0, will return true to slight variations.
     */
    isSameColor: (a: ColorRGBA, b: ColorRGBA, tolerance?: number) => boolean;
    /**
     * Adds line to color fill to queue
     * @param line Line to color fill
     */
    private addToQueue;
    /**
     * Removes line to color fill from queue
     */
    private popFromQueue;
    /**
     * Checks if coordinates and pixel are valid.
     * @param pixel Coordinates of pixel.
     */
    private isValidTarget;
    /**
     * Changes color of pixel at specific coordinates.
     * @param imageData Canvas ImageData
     * @param color New color of pixel.
     * @param x X coordinate
     * @param y Y coordinate
     */
    setColorAtPixel(imageData: ImageData, color: ColorRGBA, x: number, y: number): void;
    /**
     * Begins process to change color of pixel
     * @param color Color to change to
     * @param pixel Pixel at specific coordinate
     */
    private setPixelColor;
    /**
     * Checks neighboring pixels.
     * @param direction Direction to check to
     * @param x X coordinate
     * @param y Y coordinate
     */
    private getPixelNeighbour;
    /**
     * Start filling line at specific coordinate.
     * @param x X coordinate
     * @param y Y coordinate
     */
    private fillLineAt;
    /**
     * While lines in queue, keeps checking if pixels need to color modified.
     */
    private fillQueue;
    /**
     * When conversion to image is done, similar colors may blend in.
     * This is to allow some level of tolerance when detecting pixel
     * colors and changing them from one color to another. This tends to
     * occur in the edge of a shape.
     * @param a Color to compare
     * @param b Color to compare.
     */
    private setAutoTolerance;
    /**
     * Executes flood fill.
     * @param point Mouse click location coordinates
     * @param colorHex Color to change to.
     * @param tolerance Color tolerance.
     */
    fill: (point: {
        x: number;
        y: number;
    }, colorHex: string, tolerance: number) => Promise<IFloodFillData | null>;
}
export {};
