import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';

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
    const modified = (id: string, objectType: string, target: any) => {
      if (!shouldHandleRemoteEvent(id)) return;

      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          if (objectType === 'textbox') {
            obj.set({
              text: target.text,
              fontFamily: target.fontFamily,
              stroke: target.fill,
              top: target.top,
              left: target.left,
              width: target.width,
            });
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
    const objectModified = (e: any) => {
      if (!shouldSerializeEvent(e.target.id)) return;

      const type = e.target.get('type');

      // If text has been modified
      if (type === 'textbox') {
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

        const payload = {
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
