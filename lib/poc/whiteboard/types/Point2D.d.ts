export declare class Point2D {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    static multiplyToInteger(p: Point2D, multiplier: number): Point2D;
    static normalize(p: Point2D, t: number): Point2D;
    static create(x: number, y: number): Point2D;
}
