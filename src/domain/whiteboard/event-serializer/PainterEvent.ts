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
  | 'sendStamp'
  | 'setUserInfoToDisplay'
  | 'cursorPointer'
  | 'backgroundColorChanged';

export interface PainterEvent {
  // The event type.
  type: PainterEventType;

  // Unique ID for this event.
  id: string;

  objectType: string;

  // Optional parameters for this event.
  param?: string | undefined;

  // Flag to know if this event comes from persistentEvents
  isPersistent?: boolean;

  // Flag to know if this event should saved in the persistentEvents or not
  avoidPersistentStoring?: boolean;
}
