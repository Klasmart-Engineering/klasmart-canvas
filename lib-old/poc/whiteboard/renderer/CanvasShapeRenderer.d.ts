import { Line } from '../composition/ShapesRepository';
export declare class CanvasShapeRenderer {
    private canvas;
    private context;
    constructor(canvas: HTMLCanvasElement);
    clear(): void;
    drawLine(line: Line): void;
    private transformPoint;
    private applyBrushParameters;
}
