import { useContext, useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';
import { IWhiteboardContext } from '../../../interfaces/whiteboard-context/whiteboard-context';

/**
 * Synchronize to remote canvases background color changes
 * @param shouldHandleRemoteEvent - Validator to know
 * if synchronization is needed
 */
const useSynchronizedBackgroundColorChanged = (
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  const { backgroundColor, setBackgroundColorInCanvas } = useContext(
    WhiteboardContext
  ) as IWhiteboardContext;

  useEffect(() => {
    const backgroundColorChanged = (id: string, target: string) => {
      if (id && !shouldHandleRemoteEvent(id) && backgroundColor === target)
        return;

      setBackgroundColorInCanvas(target);
    };

    eventController?.on('backgroundColorChanged', backgroundColorChanged);

    return () => {
      eventController?.removeListener(
        'backgroundColorChanged',
        backgroundColorChanged
      );
    };
  }, [
    backgroundColor,
    eventController,
    setBackgroundColorInCanvas,
    shouldHandleRemoteEvent,
  ]);
};

export default useSynchronizedBackgroundColorChanged;
