import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

const useSynchronizedFontFamilyChanged = (
  canvas: fabric.Canvas | undefined,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const fontFamilyChanged = (id: string, target: ICanvasObject) => {
      if (!shouldHandleRemoteEvent(id)) return;

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          obj.set({
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
