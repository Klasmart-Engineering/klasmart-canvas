/// <reference types="node" />
import { Point2D } from '../types/Point2D';
import { BrushParameters } from '../types/BrushParameters';
import { EventEmitter } from 'events';
import { IPainterController } from './IPainterController';
interface PointerState {
    id: number;
    point: Point2D;
}
export declare class PointerPainterController extends EventEmitter implements IPainterController {
    readonly mapToTarget: boolean;
    readonly userId: string;
    readonly currentActivePointers: Map<number, PointerState>;
    private brushParameters;
    private shapeId;
    private shapeSequence;
    constructor(userId: string, mapToTarget: boolean);
    replayEvents(): Promise<void>;
    setBrush(brush: BrushParameters): void;
    clear(): void;
    handlePointerDown(event: PointerEvent): void;
    handlePointerMove(event: PointerEvent): void;
    handlePointerUp(event: PointerEvent): void;
    handlePointerCancel(event: PointerEvent): void;
    handlePointerLeave(event: PointerEvent): void;
    private pointerEventState;
    private generateOperationId;
}
export {};
