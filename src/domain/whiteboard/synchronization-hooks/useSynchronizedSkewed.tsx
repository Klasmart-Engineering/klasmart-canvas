import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';

const useSynchronizedSkewed = (
  canvas: fabric.Canvas | undefined,
  shouldSerializeEvent: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /** Register and handle remote events. */
  useEffect(() => {
    const skewed = (id: string, target: ICanvasObject) => {
      if (!shouldHandleRemoteEvent(id)) return;

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          obj.set({
            angle: target.angle,
            top: target.top,
            left: target.left,
            scaleX: target.scaleX,
            scaleY: target.scaleY,
            flipX: target.flipX,
            flipY: target.flipY,
            skewX: target.skewX,
            skewY: target.skewY,
          });
        }
      });
      canvas?.renderAll();
    };

    eventController?.on('skewed', skewed);

    return () => {
      eventController?.removeListener('skewed', skewed);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent]);

  /** Register and handle local events. */
  useEffect(() => {
    const objectSkewed = (e: CanvasEvent) => {
      if (!e.target?.id) {
        return;
      }

      if (!shouldSerializeEvent(e.target.id)) return;

      const type: ObjectType = e.target.get('type') as ObjectType;
      const target = {
        top: e.target.top,
        left: e.target.left,
        angle: e.target.angle,
        scaleX: e.target.scaleX,
        scaleY: e.target.scaleY,
        skewX: e.target.skewX,
        skewY: e.target.skewY,
      } as ICanvasObject;

      const payload: ObjectEvent = {
        type,
        target,
        id: e.target.id,
      };

      eventSerializer?.push('skewed', payload);
    };

    canvas?.on('object:skewed', objectSkewed);

    return () => {
      canvas?.off('object:skewed', objectSkewed);
    };
  }, [canvas, eventSerializer, shouldSerializeEvent]);
};

export default useSynchronizedSkewed;
