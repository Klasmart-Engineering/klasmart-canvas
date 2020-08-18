import { useEffect } from 'react';
import { useUndoRedo, UNDO, REDO } from '../reducers/undo-redo';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { TypedShape, TypedPolygon } from '../../../interfaces/shapes/shapes';
import { Canvas } from 'fabric/fabric-impl';
import {
  PaintEventSerializer,
  ObjectEvent,
} from '../event-serializer/PaintEventSerializer';
import { IUndoRedoSingleEvent } from '../../../interfaces/canvas-events/undo-redo-single-event';

// This file is a work in progress. Multiple events need to be considered,
// such as group events, that are currently not function (or break functionality).

/**
 * Determine if an object belongs to local canvas.
 * @param id Object ID
 * @param canvasId Canvas ID
 */
const isLocalObject = (id: string, canvasId: string): boolean => {
  if (!id) {
    return false;
  }

  const object = id.split(':');

  if (!object.length) {
    throw new Error('Invalid ID');
  }

  return object[0] === canvasId;
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
  instanceId: string
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

      canvas.loadFromJSON(JSON.stringify({ objects: mapped }), () => {
        canvas.getObjects().forEach((o: TypedShape | TypedPolygon | TypedGroup) => {
          if (isLocalObject(o.id as string, instanceId)) {
            (o as TypedShape).set({ selectable: true, evented: true})

            if ((o as TypedGroup)._objects) {
              (o as TypedGroup).toActiveSelection();
              canvas.discardActiveObject();
            }
          }
        });
      });
    }

    if (state.actionType === UNDO) {
      const payload = {
        id: (nextEvent.event as IUndoRedoSingleEvent)?.id || '',
      } as ObjectEvent;

      // Serialize the event for synchronization
      if (nextEvent.type === 'added') {
        // If undoing the creation of an object, remove.
        eventSerializer?.push('removed', payload);
      } else if (nextEvent.type !== 'activeSelection') {
        let currentEvent = state.events[state.eventIndex];

        if (currentEvent.type !== 'activeSelection') {
          let id = (nextEvent.event as IUndoRedoSingleEvent).id;
          let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;
          let object = objects.filter((o: ObjectEvent) => (o.id === id))[0];
          let payload: ObjectEvent = {
            id,
            target: { objects: [object]},
            type: 'reconstruct'
          }

          eventSerializer?.push('reconstruct', payload);
        } else {
          let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;
          let payload: ObjectEvent = {
            id: (nextEvent.event as IUndoRedoSingleEvent).id,
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
          let id = (state.events[state.eventIndex].event as IUndoRedoSingleEvent).id;
          let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;
          let payload: ObjectEvent = {
            id,
            target: { objects },
            type: 'reconstruct'
          }

          if (
            state.events[state.eventIndex + 1].type === 'activeSelection' &&
            state.events[state.eventIndex].type === 'added'
          ) {
            eventSerializer.push('removed', { id: (state.events[state.eventIndex + 1].event as IUndoRedoSingleEvent).id });
          } 
          
          eventSerializer?.push('reconstruct', payload);
        } else {
          let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;

          let payload: ObjectEvent = {
            id: (nextEvent.event as IUndoRedoSingleEvent).id,
            target: { objects },
            type: 'reconstruct'
          }
          eventSerializer?.push('reconstruct', payload);
        }
      }
    } else if (state.actionType === REDO) {
      let event = state.events[state.eventIndex];
      if (event.type === 'added') {
        eventSerializer?.push('added', event.event as ObjectEvent);
      } else if (event && event.type !== 'activeSelection') {
        let id = (event.event as IUndoRedoSingleEvent).id;
        let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;
        let object = objects.filter((o: TypedShape | TypedGroup) => (o.id === id))[0];

        let payload: ObjectEvent = {
          id,
          target: { objects: [object]},
          type: 'reconstruct'
        }

        eventSerializer?.push('reconstruct', payload);
      } else {
        let id = (state.events[state.eventIndex].event as IUndoRedoSingleEvent).id;
        let objects = JSON.parse(state.states[state.activeStateIndex as number]).objects;
        let payload: ObjectEvent = {
          id,
          target: { objects },
          type: 'reconstruct'
        }
        
        eventSerializer?.push('reconstruct', payload);
      }
    }
  }, [state, canvas, dispatch, eventSerializer, instanceId]);

  return { state, dispatch };
};
