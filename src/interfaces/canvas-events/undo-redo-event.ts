import { IUndoRedoSingleEvent } from './undo-redo-single-event';

export interface IUndoRedoEvent {
  event: IUndoRedoSingleEvent | IUndoRedoSingleEvent[];
  type: string;
  eventId?: string;
}
