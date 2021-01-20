import { TypedGroup } from '../../../interfaces/shapes/group';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import {
  ObjectEvent,
  PaintEventSerializer,
} from '../event-serializer/PaintEventSerializer';
import { CanvasHistoryState } from '../reducers/undo-redo';
import { getStateVariables } from './getStateVariables';
import { sendReconstructEvent } from './sendReconstructEvent';

/**
 * Renders Redo action in Remote Whiteboards according with the given state
 * @param {fabric.Canvas} canvas - Current canvas
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state to get data for render
 * @param {PaintEventSerializer} eventSerializer - Event serializer to send
 * changes to remote whiteboards
 */
export const RenderRemoteRedo = (
  canvas: fabric.Canvas,
  instanceId: string,
  state: CanvasHistoryState,
  eventSerializer: PaintEventSerializer
) => {
  const { currentEvent, currentObject, currentState } = getStateVariables(
    state
  );

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
      eventSerializer?.push('added', currentObject as ObjectEvent);

      if (currentObject.type === 'image') {
        const joinedIds = currentObject.target.joinedIds;

        joinedIds?.forEach((id) => {
          eventSerializer?.push('removed', {
            id: id,
          } as ObjectEvent);
        });
      }
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
      const id = currentObject.id;

      sendReconstructEvent(id, false, eventSerializer);
      break;
    }

    case 'activeSelection': {
      const objects = JSON.parse(currentState).objects;
      const id = currentObject.id;

      sendReconstructEvent(id, { objects }, eventSerializer);
      break;
    }

    case 'backgroundColorChanged': {
      const payload = {
        id: instanceId,
        target: currentObject.color,
      };

      eventSerializer?.push('backgroundColorChanged', payload);
      break;
    }

    default: {
      const objects = JSON.parse(currentState).objects;
      let id = currentObject.id;
      let object = objects.find((o: TypedShape | TypedGroup) => o.id === id);

      sendReconstructEvent(id, { objects: [object] }, eventSerializer);
      break;
    }
  }
};
