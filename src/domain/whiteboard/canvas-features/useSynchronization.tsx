import { useContext, useEffect } from 'react';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import {
  ObjectType,
  ObjectEvent,
  PaintEventSerializer,
} from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET } from '../reducers/undo-redo';
import { WhiteboardContext } from '../WhiteboardContext';

export const useSynchronization = (
  canvas: fabric.Canvas,
  userId: string,
  eventSerializer: PaintEventSerializer,
  undoRedoDispatch: (action: CanvasAction) => void
) => {
  const { isLocalObject, lineWidth, fontColor, penColor } = useContext(
    WhiteboardContext
  );

  /**
   * Send synchronization event for penColor changes.
   * */
  useEffect(() => {
    const objects = canvas?.getActiveObjects();
    if (objects && objects.length) {
      objects.forEach((obj: ICanvasObject) => {
        const type: ObjectType = obj.get('type') as ObjectType;

        if (obj.id && isLocalObject(obj.id, userId) && type !== 'textbox') {
          const target = () => {
            return { stroke: obj.stroke };
          };

          const payload: ObjectEvent = {
            type,
            target: target() as ICanvasObject,
            id: obj.id,
          };

          eventSerializer?.push('colorChanged', payload);
        }
      });
    }
    /* If isLocalObject is added on dependencies,
    an unecessary colorChange event is triggered */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, eventSerializer, userId, penColor, fontColor, undoRedoDispatch]);

  /**
   * Send synchronization event for lineWidth changes
   */
  useEffect(() => {
    const objects = canvas?.getActiveObjects();
    const validTypes: string[] = [
      'rect',
      'ellipse',
      'triangle',
      'polygon',
      'path',
    ];

    if (objects && objects.length) {
      objects.forEach((obj: ICanvasObject) => {
        const type: ObjectType = obj.get('type') as ObjectType;

        if (
          obj.id &&
          isLocalObject(obj.id, userId) &&
          validTypes.includes(type)
        ) {
          const target = () => {
            return { strokeWidth: lineWidth };
          };

          const payload: ObjectEvent = {
            type,
            target: target() as ICanvasObject,
            id: obj.id,
          };

          eventSerializer?.push('lineWidthChanged', payload);
        }
      });
    }
    // If isLocalObject is added on dependencies, a unecessary event is emmited
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, eventSerializer, lineWidth, userId]);

  // FontColor Property sync
  useEffect(() => {
    if (fontColor && canvas) {
      const obj = canvas.getActiveObject() as ICanvasObject;

      if (!obj) return;

      const type = obj?.get('type');

      if (type !== 'textbox') return;

      const payload = {
        type,
        target: { fill: obj?.fill },
        id: obj?.id,
      };

      const event = { event: payload, type: 'colorChanged' };

      undoRedoDispatch({
        type: SET,
        payload: canvas?.getObjects() as TypedShape[],
        canvasId: userId,
        event: (event as unknown) as IUndoRedoEvent,
      });
    }
  }, [fontColor, canvas, undoRedoDispatch, userId]);
};
