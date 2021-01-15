import { IUndoRedoSingleEvent } from '../../../interfaces/canvas-events/undo-redo-single-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import {
  ObjectEvent,
  PaintEventSerializer,
} from '../event-serializer/PaintEventSerializer';
import { CanvasHistoryState } from '../reducers/undo-redo';
import { getPreviousBackground } from './getPreviousBackground';
import { getStateVariables } from './getStateVariables';

/**
 * Renders Undo action in Remote Whiteboards
 * @param {fabric.Canvas} canvas - Current canvas
 * @param {CanvasHistoryState} state - Current state to get data to render
 * @param {PaintEventSerializer} eventSerializer - Event serializer to send
 * changes to Remote Whiteboards
 */
export const RenderRemoteUndo = (
  canvas: fabric.Canvas,
  state: CanvasHistoryState,
  eventSerializer: PaintEventSerializer
) => {
  const {
    currentEvent,
    currentObject,
    currentState,
    nextEvent,
    nextObject,
  } = getStateVariables(state);

  /**
   * Gets the joinedIds property from the given object and finds the objects
   * with those ids to reconstruct them in the whiteboard
   */
  const reconstructJoinedObjects = () => {
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
  };

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
        reconstructJoinedObjects();
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

        if (currentEvent.type === 'added' && currentObject.type !== 'textbox') {
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
};
