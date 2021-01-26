import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { IUndoRedoSingleEvent } from '../../../interfaces/canvas-events/undo-redo-single-event';

/**
 * Get's previous set color for canvas background.
 * @param currentIndex Current event index.
 * @param events List of events.
 */
export const getPreviousBackground = (
  currentIndex: number,
  events: IUndoRedoEvent[]
): string => {
  let i = currentIndex;

  if (i < 0) {
    return '#fff';
  }

  for (i; i >= 0; i--) {
    if ((events[i].event as IUndoRedoSingleEvent).type === 'background') {
      return (events[i].event as IUndoRedoSingleEvent).target.fill as string;
    }
  }

  return '#fff';
};
