import { useEffect } from 'react';
import { useUndoRedo, UNDO, REDO } from '../reducers/undo-redo';

// This file needs to be refactored. Performance can be improved and size reduced.
// Lines of code are repeated and can be merged into a single common method.

const objectReconstructor = (id: string, events: any, numToRemove: number) => {
  let filtered = events.filter((event: any) => {
    return event.event.id === id;
  });

  if (numToRemove) {
    filtered.splice(-numToRemove);
  }

  let mapped = filtered.map((event: any) => {
    return event.event;
  });

  let reconstructed = { ...mapped[mapped.length - 1] };

  let initial = { ...filtered[filtered.length - 1], event: { ...filtered[0].event, ...reconstructed } };
  return initial;
};


// Reconstructs an object by events.
const objectColorReconstructor = (id: string, events: any, numToRemove: number) => {
  let filtered = events.filter((event: any) => {
    return event.event.id === id;
  });

  if (numToRemove) {
    filtered.splice(-numToRemove);
  }

  let mapped = filtered.map((event: any) => {
    return event.event;
  });

  let reconstructedTarget = {};

  mapped.forEach((object: any) => {
    reconstructedTarget = { ...reconstructedTarget, ...object.target };
  });

  let initial = { ...filtered[filtered.length - 1], event: { ...filtered[0].event, target: reconstructedTarget } };
  return initial;
}

const getPreviousColor = (id: string, events: any, numToRemove: number) => {
  let filtered = events.filter((event: any) => {
    return event.event.id === id;
  });

  if (numToRemove) {
    filtered.splice(-numToRemove);
  }

  let i = filtered.length - 1;

  for (i; i >= 0; i--) {
    if (filtered[i].event.target.stroke) {
      return filtered[i].event.target.stroke;
    }
  }

  return '#000';
}

const getPreviousScale = (id: string, events: any, numToRemove: number) => {
  let filtered = events.filter((event: any) => {
    return event.event.id === id;
  });

  if (numToRemove) {
    filtered.splice(-numToRemove);
  }

  let i = filtered.length - 1;

  for (i; i >= 0; i--) {
    if (
        filtered[i].event.target.scaleX ||
        filtered[i].event.target.scaleY
      ) {

      return filtered[i].event.target;
    }
  }

  return { scaleX: 1, scaleY: 1 };
}


/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated.
 */
export const UndoRedo = (canvas: any, eventSerializer: any, canvasId: string) => {
  const { state, dispatch } = useUndoRedo();
  console.log(canvasId);

  useEffect(() => {
    if (!state || !canvas) {
      return;
    }
    
    // Rerenders canvas when an undo or redo event has been executed.
    if (state.actionType === UNDO || state.actionType === REDO) {
      canvas.clear();
      canvas.loadFromJSON(state.activeState, () => {});
    }

    if (state.actionType === UNDO) {
      let nextEvent = state.events[state.eventIndex + 1];
      let event = state.events[state.eventIndex];

      const payload = {
        id: nextEvent.event.id,
      };

      // Serialize the event for synchronization
      if (nextEvent.type === 'added') {
        eventSerializer?.push('removed', payload);
      } else if (event.type === 'colorChanged') {
        let id = event.event.id;
        let allEvents = [ ...state.events ];
        let futureEvents = allEvents.splice(state.eventIndex + 1);
        futureEvents = futureEvents.filter((e: any) => (e.event.id === id));
        const reconstructedEvent = objectColorReconstructor(id, state.events, futureEvents.length);
        eventSerializer?.push('reconstruct', reconstructedEvent.event);
      } else {
        let id = event.event.id;
        let allEvents = [ ...state.events ];
        let futureEvents = allEvents.splice(state.eventIndex + 1);
        futureEvents = futureEvents.filter((e: any) => (e.event.id === id));
        let reconstructed = objectReconstructor(id, state.events, futureEvents.length);

        if (reconstructed.type === 'added') {
          eventSerializer?.push('removed', { id: reconstructed.event.id });
        }

        if (futureEvents[0].type === 'scaled') {
          let scaledEvent = { ...reconstructed };
          let previousScale = getPreviousScale(id, state.events, futureEvents.length);
          reconstructed.event.target = { ...reconstructed.event.target, ...previousScale };
          eventSerializer?.push('scaled', scaledEvent.event);
        }
        
        eventSerializer?.push(reconstructed.type, reconstructed.event);

        if (futureEvents[0].type === 'colorChanged') {
          reconstructed.event.target.stroke = getPreviousColor(id, state.events, futureEvents.length);
          eventSerializer?.push('colorChanged', reconstructed.event);
        }
      }
    } else if (state.actionType === REDO) {
      let event = state.events[state.eventIndex];

      if (event.type === 'added') {
        eventSerializer?.push('added', event.event);
      } else {
        let id = event.event.id;
        let allEvents = [ ...state.events ];
        let futureEvents = allEvents.splice(state.eventIndex + 1);
        futureEvents = futureEvents.filter((e: any) => (e.event.id === id));
        const reconstructed = objectReconstructor(id, state.events, futureEvents.length);
        
        eventSerializer?.push(reconstructed.type, reconstructed.event);
      }
    }

    return(() => {
      canvas?.off('object:added');
      canvas?.off('object:modified');
      canvas?.off('object:removed');
    });

  }, [state, canvas, dispatch, eventSerializer]);

  return { state, dispatch };
}
