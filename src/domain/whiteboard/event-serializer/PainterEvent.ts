import { Point2D } from '../../../poc/whiteboard/types/Point2D';
import { BrushParameters } from '../../../poc/whiteboard/types/BrushParameters';

export type PainterEventType = "add" | "move" | "moved" | "delete"

export interface OperationData {
    brush?: BrushParameters | undefined;
}

export interface LineData {
    points: Point2D[];
}

export interface PainterEvent {
    // The event type.
    type: PainterEventType;

    // Unique ID for this event.
    id: string;

    objectType: string;

    // Optional parameters for this event.
    param?: string | undefined;
}
