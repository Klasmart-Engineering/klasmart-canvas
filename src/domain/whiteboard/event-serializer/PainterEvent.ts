export type PainterEventType =
  | 'added'
  | 'moved'
  | 'rotated'
  | 'scaled'
  | 'skewed'
  | 'colorChanged'
  | 'modified'
  | 'fontFamilyChanged'
  | 'removed'
  | 'reconstruct'
  | 'moving'
  | 'setToolbarPermissions'
  | 'fontColorChanged'
  | 'lineWidthChanged'
  | 'pointer'
  | 'textEdit'
  | 'brushTypeChanged'
  | 'backgroundColorChanged'
  | 'sendStamp';

export interface PainterEvent {
  // The event type.
  type: PainterEventType;

  // Unique ID for this event.
  id: string;

  objectType: string;

  // Optional parameters for this event.
  param?: string | undefined;
}
