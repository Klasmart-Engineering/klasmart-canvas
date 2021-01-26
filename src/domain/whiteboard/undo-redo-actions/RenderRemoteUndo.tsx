import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import {
  ObjectEvent,
  PaintEventSerializer,
} from '../event-serializer/PaintEventSerializer';
import { CanvasHistoryState } from '../reducers/undo-redo';
import { getPreviousBackground } from './getPreviousBackground';
import { getStateVariables } from './getStateVariables';
import { sendReconstructEvent } from './sendReconstructEvent';

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
    let joinedIds = nextObject.target.joinedIds as string[];
    const id = nextObject.id;
    const currentIds = currentObject.target.joinedIds as string[];
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
      /**
       * Validates if the id to send to payload must be from
       * currentObject or nextObject
       */
      const idIsInCurrentObject = () => {
        return (
          currentEvent.type === 'activeSelection' ||
          currentEvent.type === 'added'
        );
      };

      const objects = JSON.parse(currentState).objects;
      const { id } = idIsInCurrentObject() ? currentObject : nextObject;

      if (currentEvent.type === 'added' && currentObject.type !== 'textbox') {
        eventSerializer.push('removed', {
          id: nextObject.id,
        });
      }

      sendReconstructEvent(id, { objects }, eventSerializer);

      break;
    }

    case 'clearedWhiteboard': {
      const objects = JSON.parse(currentState).objects;
      const id = nextObject.id;

      sendReconstructEvent(id, { objects }, eventSerializer);
      break;
    }

    default: {
      if (nextObject.type === 'background') {
        const fill = getPreviousBackground(state.eventIndex, state.events);
        const id = nextObject.id;

        canvas.backgroundColor = fill;
        canvas.renderAll();

        sendReconstructEvent(id, { background: fill }, eventSerializer);
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

          sendReconstructEvent(id, { objects: [object] }, eventSerializer);
        } else {
          const objectsToReconstruct: fabric.Object[] = [];
          const objects = JSON.parse(currentState).objects;

          nextEvent.activeIds?.forEach((id) => {
            const object = objects.find(
              (object: ICanvasObject) => object.id === id
            );

            objectsToReconstruct.push(object);
          });

          sendReconstructEvent(
            id,
            { objects: objectsToReconstruct },
            eventSerializer
          );
        }
      } else if (state.activeStateIndex !== null) {
        const objects = JSON.parse(currentState).objects;
        const id = nextObject.id;

        sendReconstructEvent(id, { objects }, eventSerializer);
      }

      break;
    }
  }
};
