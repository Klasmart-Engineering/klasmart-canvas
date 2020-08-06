import { useEffect } from 'react';
import { useUndoRedo, UNDO, REDO } from '../reducers/undo-redo';



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

  let reconstructed = {};

  mapped.forEach((object: any) => {
    reconstructed = { ...reconstructed, ...object };
  });

  let initial = { ...filtered[filtered.length - 1], event: { ...filtered[0].event, ...mapped[mapped.length - 1] }};
  return initial;
};


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

    // Dispatches an update to the state when an object has been removed.
    canvas?.on('object:removed', (e: any) => {
      if (e.target?.type === 'i-text') {
        return;
      }
    });
    
    // Rerenders canvas when an undo or redo event has been executed.
    if (state.actionType === UNDO || state.actionType === REDO) {
      canvas.clear();
      canvas.loadFromJSON(state.activeState, () => {});
    }

    if (state.actionType === UNDO) {
      let event = state.events[state.eventIndex + 1];

      const payload = {
        id: event.event.id,
      };

      // Serialize the event for synchronization
      if (event.type === 'added') {
        eventSerializer?.push('removed', payload);
      } else {
        let id = event.event.id;
        let allEvents = [ ...state.events ];
        let futureEvents = allEvents.splice(state.eventIndex + 1);
        futureEvents = futureEvents.filter((e: any) => (e.event.id === id));
        const reconstructed = objectReconstructor(id, state.events, futureEvents.length);

        if (reconstructed.type === 'added') {
          eventSerializer?.push('removed', { id: reconstructed.event.id });
        }
        
        eventSerializer?.push(reconstructed.type, reconstructed.event);
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
