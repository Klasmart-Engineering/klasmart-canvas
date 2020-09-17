import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';
import { EventFilterFunction } from '../WhiteboardCanvas';

const useSynchronizedSkewed = (
  canvas: fabric.Canvas | undefined,
  generatedBy: string,
  shouldSerializeEvent: EventFilterFunction,
  shouldHandleRemoteEvent: EventFilterFunction
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /** Register and handle remote events. */
  useEffect(() => {
    const skewed = (id: string, generatedBy: string, target: ICanvasObject) => {
      if (!shouldHandleRemoteEvent(id, generatedBy)) return;

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
            generatedBy,
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
      if (!e.target) return;

      const canvasObject = e.target as ICanvasObject;
      if (!canvasObject.id) throw new Error('Skewed object without id');
      if (!canvasObject.generatedBy) throw new Error('Skewed object without generatedBy');

      if (!shouldSerializeEvent(canvasObject.id, canvasObject.generatedBy)) return;

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
        id: canvasObject.id,
      };

      eventSerializer?.push('skewed', generatedBy, payload);
    };

    canvas?.on('object:skewed', objectSkewed);

    return () => {
      canvas?.off('object:skewed', objectSkewed);
    };
  }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent]);
};

export default useSynchronizedSkewed;
