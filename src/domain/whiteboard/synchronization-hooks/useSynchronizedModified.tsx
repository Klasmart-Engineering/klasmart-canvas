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
import FontFaceObserver from 'fontfaceobserver';

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
      target: ICanvasObject,
      isPersistent: boolean
    ) => {
      if (!shouldHandleRemoteEvent(id) && !isPersistent) return;

      /**
       * Renders text object calling the fontFamily loader
       * to load the current font
       * @param obj - Text object to set the fontFamily
       * @param target - Yarget to get the properties that will change
       */
      const renderTextObject = async (
        obj: ICanvasObject,
        target: ICanvasObject
      ) => {
        obj.set({
          text: target.text,
          stroke: target.fill?.toString(),
          top: target.top,
          left: Number(target.left) + 1,
          width: target.width,
        });

        obj.set({ left: Number(obj.left) - 1 });
        obj.setCoords();

        const fontObserver = new FontFaceObserver(target.fontFamily as string);
        try {
          const font = (await fontObserver.load()) as any;

          obj.set({ fontFamily: font.family });
          canvas?.renderAll();
        } catch (error) {}
      };

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          if (objectType === 'textbox' && target.left && obj.left) {
            renderTextObject(obj, target);
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
      if (type === 'textbox' && (e.target as ICanvasObject).id) {
        const target = {
          ...(type === 'textbox' && {
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
          event: (event as unknown) as IUndoRedoEvent,
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
