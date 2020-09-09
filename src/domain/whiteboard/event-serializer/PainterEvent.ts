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
  | 'lineWidthChanged';

export interface PainterEvent {
  // The event type.
  type: PainterEventType;

  // TODO: May want to support events modifying multiple objects
  // at once in the future. Perhaps including the object ID in 
  // param field instead.
  // Unique ID for the object this event is modifying.
  id: string;

  // Unique ID describing which canvas generated this ID. This
  // field is used to prevent acting on the events generated
  // locally. The id field can't be used for this because users
  // might modify or remove objects created by another user.
  generatedBy: string;

  objectType: string;

  // Optional parameters for this event.
  param?: string | undefined;
}
