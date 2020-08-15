import { useEffect } from 'react';
import { useUndoRedo, UNDO, REDO } from '../reducers/undo-redo';
import { Canvas } from 'fabric/fabric-impl';
// This file is a work in progress. Multiple events need to be considered,
// such as group events, that are currently not function (or break functionality).
// type IEventSerializer = { id: string } | string;

/**
 * Reconstructs an object based on past events.
 * @param id Object ID.
 * @param events Array of events
 * @param numToRemove Number of events to ignore.
 */
const objectReconstructor = (
  id: string,
  events: any[],
  numToRemove: number
) => {
  let filtered = events.filter((event: any) => {
    return event.event?.id === id;
  });

  if (numToRemove) {
    filtered.splice(-numToRemove);
  }

  const mapped = filtered.map((event: any) => {
    return event.event;
  });

  let reconstructedTarget = {};

  mapped.forEach((object: any) => {
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
  eventSerializer: any,
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
      };

      // Serialize the event for synchronization
      if (nextEvent.type === 'added') {
        eventSerializer?.push('removed', payload);
      } else if (nextEvent.type !== 'activeSelection' && event.event?.id) {
        let id = event.event.id;
        let allEvents = [...state.events];
        let futureEvents = allEvents.splice(state.eventIndex + 1);
        futureEvents = futureEvents.filter((e: any) => e.event?.id === id);
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
          });
        } else if (reconstructedEvent.event.id) {
          eventSerializer?.push('removed', payload);
          eventSerializer?.push('added', { id: reconstructedEvent.event.id });
        }
      }
    } else if (state.actionType === REDO) {
      let event = state.events[state.eventIndex];

      if (event.type === 'added' && event.event.id) {
        eventSerializer?.push('added', { id: event.event.id });
      } else {
        let id = event.event?.id;
        let allEvents = [...state.events];
        let futureEvents = allEvents.splice(state.eventIndex + 1);
        futureEvents = futureEvents.filter((e: any) => e.event?.id === id);
        const reconstructed = objectReconstructor(
          id || '',
          state.events,
          futureEvents.length
        );

        eventSerializer?.push(reconstructed.type, {
          id: reconstructed.event.id || '',
        });
      }
    }

    return () => {
      // canvas?.off('object:modified');
      // canvas?.off('object:removed');
    };
  }, [state, canvas, dispatch, eventSerializer]);

  return { state, dispatch };
};
