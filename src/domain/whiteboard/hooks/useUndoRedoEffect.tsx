import { useEffect } from 'react';
import { useUndoRedo, UNDO, REDO } from '../reducers/undo-redo';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { TypedShape } from '../../../interfaces/shapes/shapes';

// This file is a work in progress. Multiple events need to be considered,
// such as group events, that are currently not function (or break functionality).

/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated
 * @param eventSerializer Event serializer
 * @param canvasId Canvas ID
 */
export const UndoRedo = (
  canvas: fabric.Canvas,
  eventSerializer: any,
) => {
  const { state, dispatch } = useUndoRedo();

  useEffect(() => {
    if (!state || !canvas) {
      return;
    }

    let nextEvent = state.events[state.eventIndex + 1];

    // Rerenders local canvas when an undo or redo event has been executed.
    if (
      (state.actionType === UNDO) ||
      state.actionType === REDO
    ) {
      canvas.clear();
      const mapped = JSON.parse(state.activeState as string).objects.map((object: TypedShape | TypedGroup) => {
        return { ...object, fromJSON: true };
      });
      canvas.loadFromJSON(JSON.stringify({ objects: mapped }), () => {});
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
        let currentEvent = state.events[state.eventIndex];

        if (currentEvent.type !== 'activeSelection') {
          let id = nextEvent.event.id;
          let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;
          let object = objects.filter((o: any) => (o.id === id))[0];
          let payload = {
            id,
            svg: true,
            target: { objects: [object]},
            type: 'reconstruct'
          }

          eventSerializer?.push('reconstruct', payload);
        } else {
          let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;
          let payload = {
            id: nextEvent.event.id,
            svg: true,
            target: { objects },
            type: 'reconstruct'
          }
          eventSerializer?.push('reconstruct', payload);
        }
      } else {
        if (
          (state.events[state.eventIndex].type === 'activeSelection' &&
          state.events[state.eventIndex + 1] &&
          state.events[state.eventIndex + 1].type === 'activeSelection') ||
          state.events[state.eventIndex].type === 'added'
        ) {
          let id = state.events[state.eventIndex].event.id;
          let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;
          let payload = {
            id,
            svg: true,
            target: { objects },
            type: 'reconstruct'
          }
          
          eventSerializer?.push('reconstruct', payload);
        } else {

          let payload = {
            id: nextEvent.event.id,
            svg: true,
            target: state.states[state.activeStateIndex as number],
            type: 'reconstruct'
          }
          eventSerializer?.push('reconstruct', payload);
        }
      }
    } else if (state.actionType === REDO) {
      let event = state.events[state.eventIndex];
      if (event.type === 'added') {
        eventSerializer?.push('added', event.event);
      } else if (event && event.type !== 'activeSelection') {
        let id = event.event.id;
        let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;
        let object = objects.filter((o: TypedShape | TypedGroup) => (o.id === id))[0];

        let payload = {
          id,
          svg: true,
          target: { objects: [object]},
          type: 'reconstruct'
        }

        eventSerializer?.push('reconstruct', payload);
      } else {
        let id = state.events[state.eventIndex].event.id;
        let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;
        let payload = {
          id,
          svg: true,
          target: { objects },
          type: 'reconstruct'
        }
        
        eventSerializer?.push('reconstruct', payload);
      }
    }
  }, [state, canvas, dispatch, eventSerializer]);

  return { state, dispatch };
};
