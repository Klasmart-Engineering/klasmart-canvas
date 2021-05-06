import { BrushParameters } from '../types/BrushParameters';
import { Point2D } from '../types/Point2D';
export interface IPainterController {
    on(event: 'shapeBegin', listener: (id: string, params: BrushParameters) => void): this;
    on(event: 'shapeEnd', listener: (id: string) => void): this;
    on(event: 'painterClear', listener: (id: string) => void): this;
    on(event: 'painterLine', listener: (id: string, p1: Point2D, p2: Point2D) => void): this;
    removeListener(event: 'shapeBegin', listener: (id: string, params: BrushParameters) => void): this;
    removeListener(event: 'shapeEnd', listener: (id: string) => void): this;
    removeListener(event: 'painterClear', listener: (id: string) => void): this;
    removeListener(event: 'painterLine', listener: (id: string, p1: Point2D, p2: Point2D) => void): this;
    replayEvents(): Promise<void>;
}
