import { IUndoRedoSingleEvent } from './undo-redo-single-event';

export interface IUndoRedoEvent {
  event: IUndoRedoSingleEvent;
  type: string;
  eventId?: string;
}
