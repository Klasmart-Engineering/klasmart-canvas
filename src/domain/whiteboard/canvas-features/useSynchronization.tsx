import { useContext } from 'react';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import {
  ObjectType,
  ObjectEvent,
} from '../event-serializer/PaintEventSerializer';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Hnadles the logic for penColor and lineWidth synchronization actions
 * @param {fabric.Canvas} canvas - Canvas in which synchronization is send.
 * @param {string} userId - User that is generating that action.
 * @param {PaintEventSerializer} eventSerializer - Serializer to synchronize
 * events in the other whiteboards
 */
export const useSynchronization = (userId: string) => {
  const { isLocalObject, lineWidth } = useContext(WhiteboardContext);

  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

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

  // /**
  //  * Send synchronization event for penColor changes.
  //  * */
  // useEffect(() => {
  //   const objects = canvas?.getActiveObjects();

  //   if (objects && objects.length) {
  //     objects.forEach((obj: ICanvasObject) => {
  //       const type = obj.get('type') as ObjectType;

  //       if (obj.id && isLocalObject(obj.id, userId) && type !== 'textbox') {
  //         const target = { stroke: obj.stroke };
  //         const payload: ObjectEvent = {
  //           type,
  //           target: target as ICanvasObject,
  //           id: obj.id,
  //         };

  //         eventSerializer?.push('colorChanged', payload);
  //       }
  //     });
  //   }
  //   /* If isLocalObject is added on dependencies,
  //   an unecessary colorChange event is triggered */
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [canvas, eventSerializer, userId, penColor]);

  // /**
  //  * Send synchronization event for lineWidth changes
  //  */
  // useEffect(() => {
  //   const objects = canvas?.getActiveObjects();
  //   const validTypes: string[] = [
  //     'rect',
  //     'ellipse',
  //     'triangle',
  //     'polygon',
  //     'path',
  //   ];

  //   if (objects && objects.length) {
  //     objects.forEach((obj: ICanvasObject) => {
  //       const type: ObjectType = obj.get('type') as ObjectType;

  //       if (
  //         obj.id &&
  //         isLocalObject(obj.id, userId) &&
  //         validTypes.includes(type)
  //       ) {
  //         const target = { strokeWidth: lineWidth };
  //         const payload: ObjectEvent = {
  //           type,
  //           target: target as ICanvasObject,
  //           id: obj.id,
  //         };

  //         eventSerializer?.push('lineWidthChanged', payload);
  //       }
  //     });
  //   }
  //   // If isLocalObject is added on dependencies, a unecessary event is emmited
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [canvas, eventSerializer, lineWidth, userId]);
};
