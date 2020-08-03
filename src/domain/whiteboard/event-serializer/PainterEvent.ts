export type PainterEventType =
  | 'added'
  | 'moved'
  | 'rotated'
  | 'scaled'
  | 'skewed'
  | 'colorChanged'
  | 'modified'
  | 'moving';

export interface PainterEvent {
  // The event type.
  type: PainterEventType;

  // Unique ID for this event.
  id: string;

  objectType: string;

  // Optional parameters for this event.
  param?: string | undefined;
}
