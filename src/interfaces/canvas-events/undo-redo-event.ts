import { IUndoRedoSingleEvent } from './undo-redo-single-event';

export interface IUndoRedoEvent {
  activeIds?: string[];
  event: IUndoRedoSingleEvent | IUndoRedoSingleEvent[];
  type: string;
  eventId?: string;
}
