import { useEffect } from 'react';
import { useUndoRedo, UNDO, REDO } from '../reducers/undo-redo';
import { Canvas } from 'fabric/fabric-impl';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { IUndoRedoSingleEvent } from '../../../interfaces/canvas-events/undo-redo-single-event';
import {
  PaintEventSerializer,
  ObjectEvent,
} from '../event-serializer/PaintEventSerializer';
import { PainterEventType } from '../event-serializer/PainterEvent';

// This file is a work in progress. Multiple events need to be considered,
// such as group events, that are currently not function (or break functionality).

/**
 * Reconstructs an object based on past events.
 * @param id Object ID.
 * @param events Array of events
 * @param numToRemove Number of events to ignore.
 */
const objectReconstructor = (
  id: string,
  events: IUndoRedoEvent[],
  numToRemove: number
) => {
  let filtered = events.filter((event: IUndoRedoEvent) => {
    return event.event?.id === id;
  });

  if (numToRemove) {
    filtered.splice(-numToRemove);
  }

  const mapped = filtered.map((event: IUndoRedoEvent) => {
    return event.event;
  });

  let reconstructedTarget = {};

  mapped.forEach((object: IUndoRedoSingleEvent) => {
    reconstructedTarget = { ...reconstructedTarget, ...object.target };
  });

  return {
    ...filtered[filtered.length - 1],
    event: { ...filtered[0].event, target: reconstructedTarget },
  };
};

/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated
 * @param eventSerializer Event serializer
 * @param canvasId Canvas ID
 */
export const UndoRedo = (
  canvas: Canvas,
  eventSerializer: PaintEventSerializer,
  _canvasId: string
) => {
  const { state, dispatch } = useUndoRedo();

  useEffect(() => {
    if (!state || !canvas) {
      return;
    }

    let nextEvent = state.events[state.eventIndex + 1];

    // Rerenders canvas when an undo or redo event has been executed.
    if (
      (state.actionType === UNDO && nextEvent.type !== 'activeSelection') ||
      state.actionType === REDO
    ) {
      canvas.clear();
      canvas.loadFromJSON(state.activeState, () => {});
    }

    if (state.actionType === UNDO) {
      let event = state.events[state.eventIndex];

      const payload = {
        id: nextEvent.event?.id || '',
      } as ObjectEvent;

      // Serialize the event for synchronization
      if (nextEvent.type === 'added') {
        eventSerializer?.push('removed', payload);
      } else if (nextEvent.type !== 'activeSelection' && event.event?.id) {
        let id = event.event.id;
        let allEvents = [...state.events];
        let futureEvents = allEvents.splice(state.eventIndex + 1);
        futureEvents = futureEvents.filter(
          (e: IUndoRedoEvent) => e.event?.id === id
        );
        const reconstructedEvent = objectReconstructor(
          id,
          state.events,
          futureEvents.length
        );

        if (
          reconstructedEvent.type !== 'added' &&
          reconstructedEvent.event.id
        ) {
          eventSerializer?.push('reconstruct', {
            id: reconstructedEvent.event.id,
          } as ObjectEvent);
        } else if (reconstructedEvent.event.id) {
          eventSerializer?.push('removed', payload);
          eventSerializer?.push('added', {
            id: reconstructedEvent.event.id,
          } as ObjectEvent);
        }
      }
    } else if (state.actionType === REDO) {
      let event = state.events[state.eventIndex];

      if (event.type === 'added' && event.event.id) {
        eventSerializer?.push('added', { id: event.event.id } as ObjectEvent);
      } else {
        let id = event.event?.id;
        let allEvents = [...state.events];
        let futureEvents = allEvents.splice(state.eventIndex + 1);
        futureEvents = futureEvents.filter(
          (e: IUndoRedoEvent) => e.event?.id === id
        );
        const reconstructed = objectReconstructor(
          id || '',
          state.events,
          futureEvents.length
        );

        eventSerializer?.push(
          reconstructed.type as PainterEventType,
          {
            id: reconstructed.event.id || '',
          } as ObjectEvent
        );
      }
    }

    return () => {
      // canvas?.off('object:modified');
      // canvas?.off('object:removed');
    };
  }, [state, canvas, dispatch, eventSerializer]);

  return { state, dispatch };
};
