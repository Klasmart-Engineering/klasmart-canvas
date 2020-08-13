import { useEffect } from 'react';
import { useUndoRedo, UNDO, REDO } from '../reducers/undo-redo';
import { v4 as uuidv4 } from 'uuid';

// This file is a work in progress. Multiple events need to be considered,
// such as group events, that are currently not function (or break functionality).

/**
 * Reconstructs an object based on past events.
 * @param id Object ID.
 * @param events Array of events
 * @param numToRemove Number of events to ignore.
 */
const objectReconstructor = (id: string, events: any, numToRemove: number) => {
  let filtered = events.filter((event: any) => {
    return event.event.id === id;
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

  console.log(reconstructedTarget);

  return {
    ...filtered[filtered.length - 1],
    event: { ...filtered[0].event, target: reconstructedTarget },
  };
};

const undoHandler = (event: any, state: any, eventSerializer: any) => {
  let id = event.event.id;
  let allEvents = [...state.events];
  let futureEvents = allEvents.splice(state.eventIndex + 1);
  futureEvents = futureEvents.filter((e: any) => e.event.id === id);
  const reconstructedEvent = objectReconstructor(
    id,
    state.events,
    futureEvents.length
  );

  if (reconstructedEvent.type !== 'added') {
    eventSerializer?.push('reconstruct', reconstructedEvent.event);
  } else {
    eventSerializer?.push('removed', { id: reconstructedEvent.event.id });
    eventSerializer?.push('added', reconstructedEvent.event);
  }
}

const redoHandler = (event: any, state: any, eventSerializer: any) => {
  let id = event.event.id;
  let allEvents = [...state.events];
  let futureEvents = allEvents.splice(state.eventIndex + 1);
  futureEvents = futureEvents.filter((e: any) => e.event.id === id);
  const reconstructedEvent = objectReconstructor(
    id,
    state.events,
    futureEvents.length
  );


  eventSerializer?.push('reconstruct', reconstructedEvent.event);
}

/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated
 * @param eventSerializer Event serializer
 * @param canvasId Canvas ID
 */
export const UndoRedo = (
  canvas: any,
  eventSerializer: any,
  canvasId: string
) => {
  const { state, dispatch } = useUndoRedo();

  useEffect(() => {
    if (!state || !canvas) {
      return;
    }

    let nextEvent = state.events[state.eventIndex + 1];

    // Rerenders canvas when an undo or redo event has been executed.
    if (
      (state.actionType === UNDO) ||
      state.actionType === REDO
    ) {
      canvas.clear();
      console.log(JSON.parse(state.activeState as string));
      const mapped = JSON.parse(state.activeState as string).objects.map((object: any) => {
        return { ...object, fromJSON: true };
      });
      canvas.loadFromJSON(JSON.stringify({ objects: mapped }), (o: any, object: any) => {});
    }

    if (state.actionType === UNDO) {
      const payload = {
        id: nextEvent.event.id,
      };

      // Serialize the event for synchronization
      if (nextEvent.type === 'added') {
        // If undoing the creation of an object, remove.
        eventSerializer?.push('removed', payload);
      } else if (nextEvent.type !== 'activeSelection') {
        let id = nextEvent.event.id;
        let allEvents = [...state.events];
        let futureEvents = allEvents.splice(state.eventIndex + 1);
        futureEvents = futureEvents.filter((e: any) => e.event.id === id);
        const reconstructedEvent = objectReconstructor(
          id,
          state.events,
          futureEvents.length
        );

        eventSerializer?.push('reconstruct', reconstructedEvent.event);
      } else {
        let groupedEvents = state.events.filter((event: any) => (event.eventId === nextEvent.eventId));
        groupedEvents.forEach((singleEvent: any) => {
          undoHandler(singleEvent, state, eventSerializer);
        });
      }
    } else if (state.actionType === REDO) {
      let event = state.events[state.eventIndex];

      if (event.type === 'added') {
        eventSerializer?.push('added', event.event);
      } else if (event.type !== 'activeSelection') {
        let id = event.event.id;
        let allEvents = [...state.events];
        let futureEvents = allEvents.splice(state.eventIndex + 1);
        futureEvents = futureEvents.filter((e: any) => e.event.id === id);
        const reconstructed = objectReconstructor(
          id,
          state.events,
          futureEvents.length
        );

        eventSerializer?.push(reconstructed.type, reconstructed.event);
      } else {
        let groupedEvents = state.events.filter((e: any) => (e.eventId === event.eventId));
        groupedEvents.forEach((singleEvent: any, i: number) => {
          if (i === 0) {
            console.log(singleEvent);
          }
          redoHandler(singleEvent, state, eventSerializer);
        });
      }
    }
  }, [state, canvas, dispatch, eventSerializer]);

  return { state, dispatch };
};
