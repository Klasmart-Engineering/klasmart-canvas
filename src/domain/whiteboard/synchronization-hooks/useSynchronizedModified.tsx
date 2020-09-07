import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET } from '../reducers/undo-redo';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';

const useSynchronizedModified = (
  canvas: fabric.Canvas | undefined,
  shouldSerializeEvent: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean,
  userId: string,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /** Register and handle remote event. */
  useEffect(() => {
    const modified = (
      id: string,
      objectType: string,
      target: ICanvasObject
    ) => {
      if (!shouldHandleRemoteEvent(id)) return;

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          if (objectType === 'i-text' && target.left && obj.left) {
            obj.set({
              text: target.text,
              fontFamily: target.fontFamily,
              stroke: target.fill?.toString(),
              top: target.top,
              left: target.left + 1,
              width: target.width,
            });
            obj.set({ left: obj.left - 1 });
            obj.setCoords();
          }
        }
      });
      canvas?.renderAll();
    };

    const payload = {
      id: ((modified as unknown) as ICanvasObject).id as string,
    };

    if (canvas && payload.id) {
      const event = { event: payload, type: 'modified' } as IUndoRedoEvent;

      undoRedoDispatch({
        type: SET,
        payload: canvas.getObjects(),
        canvasId: userId,
        event,
      });
    }

    eventController?.on('modified', modified);

    return () => {
      eventController?.removeListener('modified', modified);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);

  /** Register and handle local events. */
  useEffect(() => {
    const objectModified = (e: fabric.IEvent | CanvasEvent) => {
      if (!e.target) return;
      if (
        (e.target as ICanvasObject).id &&
        !shouldSerializeEvent((e.target as ICanvasObject).id as string)
      )
        return;

      const type = (e.target as ICanvasObject).get('type') as ObjectType;

      // If text has been modified
      if (type === 'i-text' && (e.target as ICanvasObject).id) {
        const target = {
          ...(type === 'i-text' && {
            text: (e.target as ICanvasObject).text,
            fontFamily: (e.target as ICanvasObject).fontFamily,
            stroke: e.target.fill,
            top: e.target.top,
            left: e.target.left,
            width: e.target.width,
          }),
        } as ICanvasObject;

        const payload: ObjectEvent = {
          type,
          target,
          id: (e.target as ICanvasObject).id as string,
        };

        const event = { event: payload, type: 'modified' };

        undoRedoDispatch({
          type: SET,
          payload: canvas?.getObjects(),
          canvasId: userId,
          event: event as IUndoRedoEvent,
        });

        eventSerializer?.push('modified', payload);
      }
    };

    canvas?.on('object:modified', objectModified);

    return () => {
      canvas?.off('object:modified', objectModified);
    };
  }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};

export default useSynchronizedModified;
