import { useContext, useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';
import { IWhiteboardContext } from '../../../interfaces/whiteboard-context/whiteboard-context';

/**
 * Synchronize to remote canvases background color changes
 * @param canvas - Canvas in which the change happened
 * @param userId - User that made the change
 * @param shouldHandleRemoteEvent - Validator to know
 * if synchronization is needed
 */
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

      if (canvas) {
        canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
        // @ts-ignore
        canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
      }
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
