import { useCallback, useContext, useEffect } from 'react';
import {
  useUndoRedo,
  UNDO,
  REDO,
  CanvasHistoryState,
} from '../reducers/undo-redo';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { TypedShape, TypedPolygon } from '../../../interfaces/shapes/shapes';
import { Canvas } from 'fabric/fabric-impl';
import {
  PaintEventSerializer,
  ObjectEvent,
} from '../event-serializer/PaintEventSerializer';
import { IUndoRedoSingleEvent } from '../../../interfaces/canvas-events/undo-redo-single-event';
import { IPathTarget } from '../../../interfaces/canvas-events/path-target';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { WhiteboardContext } from '../WhiteboardContext';

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
 * Get's previous set color for canvas background.
 * @param currentIndex Current event index.
 * @param events List of events.
 */
const getPreviousBackground = (
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

/**
 * Parses to an object the given state
 * @param {string} activeState - Stringified state to parse
 */
const mapActiveState = (activeState: string) =>
  JSON.parse(activeState).objects.map((object: TypedShape | TypedGroup) => {
    if ((object as TypedGroup).objects) {
      let _objects = (object as TypedGroup).objects;
      let mappedObjects = (_objects as TypedShape[]).map((o: TypedShape) => {
        return { ...o, fromJSON: true };
      });

      return { ...object, fromJSON: true, objects: mappedObjects };
    }
    return { ...object, fromJSON: true };
  });

/**
 * Loads the given objects in the whiteboard with the given instanceId
 * @param {fabric.Canvas} canvas - Canvas to set the objects.
 * @param {{ [key: string]: any }} mapped - Objects to set in canvas.
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state in canvas actions history
 */
const loadFromJSON = (
  canvas: fabric.Canvas,
  mapped: { [key: string]: any },
  instanceId: string,
  state: CanvasHistoryState
) => {
  canvas.loadFromJSON(JSON.stringify({ objects: mapped }), () => {
    canvas
      .getObjects()
      .forEach((o: TypedShape | TypedPolygon | TypedGroup | IPathTarget) => {
        if (isLocalObject(o.id as string, instanceId)) {
          (o as TypedShape).set({ selectable: true, evented: true });

          if ((o as TypedGroup)._objects && !(o as ICanvasBrush).basePath) {
            (o as TypedGroup).toActiveSelection();
            canvas.discardActiveObject();
          }
        }
      });

    const fill = getPreviousBackground(state.eventIndex, state.events);
    canvas.backgroundColor = fill;
    canvas.renderAll();
  });
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
  const { shapesAreSelectable } = useContext(WhiteboardContext);

  /**
   * Reset selectable, evented and strokeUniform properties
   * when a group of objects had an undo/redo action
   */
  const resetObjectsSelectability = useCallback(() => {
    canvas?.forEachObject((object: ICanvasObject) => {
      const id = object.id as string;
      const isLocal = isLocalObject(id, instanceId);

      object.set({
        selectable: isLocal && shapesAreSelectable,
        evented: isLocal && shapesAreSelectable,
        strokeUniform: true,
      });
    });

    canvas.renderAll();
  }, [canvas, instanceId, shapesAreSelectable]);

  /**
   * Gets the joinedIds property from the given object and finds the objects
   * with those ids to reconstruct them in the whiteboard
   * @param {IUndoRedoSingleEvent} nextObject - Next object in the current
   * state of canvas history and was modified/removed before to undo
   * @param {IUndoRedoEvent} currentEvent - Event in which you are stayed
   * after to undo
   * @param {string} currentState - Stringified current whiteboard state
   */
  const reconstructJoinedObjects = useCallback(
    (
      nextObject: IUndoRedoSingleEvent,
      currentEvent: IUndoRedoEvent,
      currentState: string
    ) => {
      let joinedIds = nextObject.target?.joinedIds as string[];
      const id = nextObject.id;
      const currentIds = ((currentEvent as unknown) as IUndoRedoSingleEvent)
        .target?.joinedIds as string[];
      const objects = JSON.parse(currentState).objects;

      if (currentIds) {
        joinedIds = [...joinedIds, ...currentIds];
      }

      // If state has states reconstruct event is able to be sent
      if (currentState) {
        const filteredObjects = objects.filter(
          (o: ObjectEvent) => joinedIds?.indexOf(o.id) !== -1
        ) as ICanvasObject[];

        let payload: ObjectEvent = {
          id,
          target: { objects: filteredObjects },
          type: 'reconstruct',
        };

        eventSerializer?.push('reconstruct', payload);
      }
    },
    [eventSerializer]
  );

  useEffect(() => {
    if (!state || !canvas) {
      return;
    }

    const currentEvent = state.events[state.eventIndex];
    const currentObject = currentEvent?.event as IUndoRedoSingleEvent;
    const currentState = state.states[state.activeStateIndex as number];

    const nextEvent = state.events[state.eventIndex + 1];
    const nextObject = nextEvent?.event as IUndoRedoSingleEvent;

    // Rerenders local canvas when an undo or redo event has been executed.
    if (state.actionType === UNDO || state.actionType === REDO) {
      // To prevent fabricjs observers from updating state on rerender.
      canvas.forEachObject((object: TypedShape) => {
        if (isLocalObject(object.id as string, instanceId)) {
          object.set({ fromJSON: true });
        }
      });

      // Getting the object of the current state
      const mapped: { [key: string]: any } = mapActiveState(
        state.activeState as string
      );

      // Loading objects in canvas
      loadFromJSON(canvas, mapped, instanceId, state);

      // If undo/redo was applied in a group of objects
      if (mapped.length === 1 && mapped[0].type === 'activeSelection') {
        resetObjectsSelectability();
      }
    }

    if (state.actionType === UNDO) {
      switch (nextEvent.type) {
        case 'added': {
          const payload: ObjectEvent = {
            id: nextObject.id,
          };

          // If undoing the creation of an object, remove.
          eventSerializer?.push('removed', payload);

          /* If the object is an image, is necessary find if this image
          is product of flood-filled object composed for other objects */
          if (nextObject.type === 'image') {
            reconstructJoinedObjects(nextObject, currentEvent, currentState);
          }

          break;
        }

        case 'activeSelection': {
          const objects = JSON.parse(currentState).objects;

          if (
            currentEvent.type === 'activeSelection' ||
            currentEvent.type === 'added'
          ) {
            const id = currentObject.id;
            const payload = {
              id,
              target: { objects },
              type: 'reconstruct',
            } as ObjectEvent;

            if (
              currentEvent.type === 'added' &&
              currentObject.type !== 'textbox'
            ) {
              eventSerializer.push('removed', {
                id: nextObject.id,
              });
            }

            eventSerializer?.push('reconstruct', payload);
          } else {
            const payload = {
              id: nextObject.id,
              target: { objects },
              type: 'reconstruct',
            } as ObjectEvent;

            eventSerializer?.push('reconstruct', payload);
          }

          break;
        }

        case 'clearedWhiteboard': {
          const objects = JSON.parse(currentState).objects;
          let id = nextObject.id;

          const payload = {
            id,
            target: { objects },
            type: 'reconstruct',
          } as ObjectEvent;

          eventSerializer?.push('reconstruct', payload);
          break;
        }

        default: {
          if (nextObject.type === 'background') {
            const fill = getPreviousBackground(state.eventIndex, state.events);
            canvas.backgroundColor = fill;
            canvas.renderAll();

            let payload: ObjectEvent = {
              id: nextObject.id,
              target: { background: fill },
              type: 'reconstruct',
            };

            eventSerializer?.push('reconstruct', payload);
            return;
          }

          if (
            currentEvent?.type !== 'remove' &&
            nextEvent.type !== 'clearedWhiteboard'
          ) {
            let id = nextObject.id;

            if (id.split(':')[1] !== 'group') {
              const objects = JSON.parse(currentState).objects;
              let object = objects.find((o: ObjectEvent) => o.id === id);

              let payload: ObjectEvent = {
                id,
                target: { objects: [object] },
                type: 'reconstruct',
              };

              eventSerializer?.push('reconstruct', payload);
            } else {
              const objectsToReconstruct = [];
              const objects = JSON.parse(currentState).objects;

              nextEvent.activeIds?.forEach((id) => {
                const object = objects.find(
                  (object: ICanvasObject) => object.id === id
                );

                objectsToReconstruct.push(object);
              });

              let payload: ObjectEvent = {
                id,
                target: { objects },
                type: 'reconstruct',
              };

              eventSerializer?.push('reconstruct', payload);
            }
          } else if (state.activeStateIndex !== null) {
            const objects = JSON.parse(currentState).objects;
            let payload: ObjectEvent = {
              id: nextObject.id,
              target: { objects },
              type: 'reconstruct',
            };
            eventSerializer?.push('reconstruct', payload);
          }

          break;
        }
      }
    } else if (state.actionType === REDO) {
      const objects = JSON.parse(currentState).objects;

      if (currentObject.type === 'background') {
        canvas.backgroundColor = currentObject.target.fill as string;
        canvas.renderAll();

        const payload: ObjectEvent = {
          id: currentObject.id,
          target: {
            background: currentObject.target.fill as string,
          },
          type: 'reconstruct',
        };
        eventSerializer?.push('reconstruct', payload);
        return;
      }

      switch (currentEvent.type) {
        case 'added': {
          if (currentObject.type === 'image') return;

          eventSerializer?.push('added', currentObject as ObjectEvent);
          break;
        }

        case 'removed': {
          if (currentEvent.activeIds) {
            // Redo in a group of objects removed
            currentEvent.activeIds?.forEach((id) => {
              eventSerializer?.push('removed', {
                id: id,
              } as ObjectEvent);
            });
          } else {
            // Redo in single object removed
            eventSerializer?.push('removed', {
              id: currentObject.id,
            } as ObjectEvent);
          }
          break;
        }

        case 'clearedWhiteboard': {
          let payload: ObjectEvent = {
            id: currentObject.id,
            target: false,
            type: 'reconstruct',
          };

          eventSerializer?.push('reconstruct', payload);
          break;
        }

        case 'activeSelection': {
          let id = currentObject.id;
          let payload: ObjectEvent = {
            id,
            target: { objects },
            type: 'reconstruct',
          };

          eventSerializer?.push('reconstruct', payload);
          break;
        }

        default: {
          let id = currentObject.id;
          let object = objects.find(
            (o: TypedShape | TypedGroup) => o.id === id
          );

          let payload: ObjectEvent = {
            id,
            target: { objects: [object] },
            type: 'reconstruct',
          };

          eventSerializer?.push('reconstruct', payload);
          break;
        }
      }
    }
  }, [
    state,
    canvas,
    dispatch,
    eventSerializer,
    instanceId,
    shapesAreSelectable,
    resetObjectsSelectability,
    reconstructJoinedObjects,
  ]);

  return { state, dispatch };
};
