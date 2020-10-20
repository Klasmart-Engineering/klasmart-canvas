import { useContext, useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';
import { IWhiteboardContext } from '../../../interfaces/whiteboard-context/whiteboard-context';

const useSynchronizedBackgroundColorChanged = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  const {
    updateBackgroundColor,
    setLocalBackground,
    setIsBackgroundImage,
    setBackgroundImageIsPartialErasable,
    setLocalImage,
  } = useContext(WhiteboardContext) as IWhiteboardContext;

  useEffect(() => {
    const backgroundColorChanged = (id: string, target: string) => {
      if (id && !shouldHandleRemoteEvent(id)) return;

      updateBackgroundColor(target);
      setLocalBackground(true);
      setIsBackgroundImage(false);
      setBackgroundImageIsPartialErasable(false);
      setLocalImage('');
      // @ts-ignore
      canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
    };

    eventController?.on('backgroundColorChanged', backgroundColorChanged);

    return () => {
      eventController?.removeListener(
        'backgroundColorChanged',
        backgroundColorChanged
      );
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    userId,
    updateBackgroundColor,
    setLocalBackground,
    setIsBackgroundImage,
    setBackgroundImageIsPartialErasable,
    setLocalImage,
  ]);
};

export default useSynchronizedBackgroundColorChanged;
