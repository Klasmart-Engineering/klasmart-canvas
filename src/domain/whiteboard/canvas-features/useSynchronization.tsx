import { useContext } from 'react';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import {
  ObjectType,
  ObjectEvent,
} from '../event-serializer/PaintEventSerializer';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles the logic for penColor and lineWidth synchronization actions
 * @param {string} userId - User that is generating that action.
 */
export const useSynchronization = (userId: string) => {
  // Getting context variables
  const { isLocalObject, lineWidth } = useContext(WhiteboardContext);

  // Getting event serializer for synchronize objects
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  /**
   * Changes stroke property in the given object on remote whiteboards
   * @param {ICanvasObject} obj - Object to change stroke property
   */
  const changePenColorSync = (obj: ICanvasObject) => {
    const type = obj.get('type') as ObjectType;

    if (obj.id && isLocalObject(obj.id, userId) && type !== 'textbox') {
      const target = { stroke: obj.stroke };
      const payload: ObjectEvent = {
        type,
        target: target as ICanvasObject,
        id: obj.id,
      };

      eventSerializer?.push('colorChanged', payload);
    }
  };

  /**
   * Changes strokeWidth property in the given object on remote whiteboards
   * @param {ICanvasObject} obj - Object to change strokeWidth property
   */
  const changeLineWidthSync = (obj: ICanvasObject) => {
    const validTypes: string[] = [
      'rect',
      'ellipse',
      'triangle',
      'polygon',
      'path',
    ];

    const type: ObjectType = obj.get('type') as ObjectType;

    if (obj.id && isLocalObject(obj.id, userId) && validTypes.includes(type)) {
      const target = { strokeWidth: lineWidth };
      const payload: ObjectEvent = {
        type,
        target: target as ICanvasObject,
        id: obj.id,
      };

      eventSerializer?.push('lineWidthChanged', payload);
    }
  };

  return { changePenColorSync, changeLineWidthSync };
};
