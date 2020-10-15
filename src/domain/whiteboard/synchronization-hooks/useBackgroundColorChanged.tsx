import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';

const useSynchronizedBackgroundColorChanged = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const backgroundColorChanged = (id: string, target: string) => {
      if (id && !shouldHandleRemoteEvent(id)) return;

      canvas?.setBackgroundColor(target, canvas.renderAll.bind(canvas));
    };

    eventController?.on('backgroundColorChanged', backgroundColorChanged);

    return () => {
      eventController?.removeListener(
        'backgroundColorChanged',
        backgroundColorChanged
      );
    };
  }, [canvas, eventController, shouldHandleRemoteEvent, userId]);
};

export default useSynchronizedBackgroundColorChanged;
