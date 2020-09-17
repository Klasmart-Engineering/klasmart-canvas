import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { EventFilterFunction } from '../WhiteboardCanvas';

const useSynchronizedFontFamilyChanged = (
  canvas: fabric.Canvas | undefined,
  shouldHandleRemoteEvent: EventFilterFunction
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const fontFamilyChanged = (id: string, generatedBy: string, target: ICanvasObject) => {
      if (!shouldHandleRemoteEvent(id, generatedBy)) return;

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          obj.set({
            generatedBy,
            fontFamily: target.fontFamily,
          });
        }
      });
      canvas?.renderAll();
    };

    eventController?.on('fontFamilyChanged', fontFamilyChanged);

    return () => {
      eventController?.removeListener('fontFamilyChanged', fontFamilyChanged);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent]);
};

export default useSynchronizedFontFamilyChanged;
