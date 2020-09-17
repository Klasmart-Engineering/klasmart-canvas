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
import { EventFilterFunction } from '../WhiteboardCanvas';

const useSynchronizedModified = (
  canvas: fabric.Canvas | undefined,
  generatedBy: string,
  shouldSerializeEvent: EventFilterFunction,
  shouldHandleRemoteEvent: EventFilterFunction,
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
      generatedBy: string,
      objectType: string,
      target: ICanvasObject
    ) => {
      if (!shouldHandleRemoteEvent(id, generatedBy)) return;

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          if (objectType === 'textbox' && target.left && obj.left) {
            obj.set({
              text: target.text,
              fontFamily: target.fontFamily,
              stroke: target.fill?.toString(),
              top: target.top,
              left: target.left + 1,
              width: target.width,
              generatedBy,
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

      const canvasObject = e.target as ICanvasObject;
      if (!canvasObject.id) throw new Error('modified target without ID');
      if (!canvasObject.generatedBy) throw new Error('modified target without generatedBy');

      if (!shouldSerializeEvent(canvasObject.id, canvasObject.generatedBy))
        return;

      const type = canvasObject.get('type') as ObjectType;

      // If text has been modified
      if (type === 'textbox' && canvasObject.id) {
        const target = {
          ...(type === 'textbox' && {
            text: canvasObject.text,
            fontFamily: canvasObject.fontFamily,
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
          event: (event as unknown) as IUndoRedoEvent,
        });

        eventSerializer?.push('modified', generatedBy, payload);
      }
    };

    canvas?.on('object:modified', objectModified);

    return () => {
      canvas?.off('object:modified', objectModified);
    };
  }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);
};

export default useSynchronizedModified;
