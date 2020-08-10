import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';

const useSynchronizedFontFamilyChanged = (
  canvas: fabric.Canvas | undefined,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const fontFamilyChanged = (id: string, target: any) => {
      if (!shouldHandleRemoteEvent(id)) return;

      canvas?.forEachObject(function (obj: any) {
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
