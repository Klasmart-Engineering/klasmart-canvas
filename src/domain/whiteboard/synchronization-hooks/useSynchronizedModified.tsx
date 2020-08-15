import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';

const useSynchronizedModified = (
  canvas: fabric.Canvas | undefined,
  shouldSerializeEvent: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean
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
          if (objectType === 'textbox' && target.left && obj.left) {
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

    eventController?.on('modified', modified);

    return () => {
      eventController?.removeListener('modified', modified);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent]);

  /** Register and handle local events. */
  useEffect(() => {
    const objectModified = (e: CanvasEvent) => {
      if (!e.target || (e.target.id && !shouldSerializeEvent(e.target.id)))
        return;

      const type = e.target.get('type') as ObjectType;

      // If text has been modified
      if (type === 'textbox' && e.target.id) {
        const target = {
          ...(type === 'textbox' && {
            text: e.target.text,
            fontFamily: e.target.fontFamily,
            stroke: e.target.fill,
            top: e.target.top,
            left: e.target.left,
            width: e.target.width,
          }),
        };

        const payload: ObjectEvent = {
          type,
          target,
          id: e.target.id,
        };

        eventSerializer?.push('modified', payload);
      }
    };

    canvas?.on('object:modified', objectModified);

    return () => {
      canvas?.off('object:modified', objectModified);
    };
  }, [canvas, eventSerializer, shouldSerializeEvent]);
};

export default useSynchronizedModified;
