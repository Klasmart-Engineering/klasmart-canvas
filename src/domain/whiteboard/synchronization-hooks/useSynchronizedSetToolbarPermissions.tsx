import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { EventFilterFunction } from '../WhiteboardCanvas';

const useSynchronizedSetToolbarPermissions = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: EventFilterFunction,
  setToolbarIsEnabled: (enabled: boolean) => void
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const setToolbarPermissions = (id: string, target: boolean) => {
      //if (!shouldHandleRemoteEvent(id)) return;
      if (userId === id) return;

      canvas?.discardActiveObject();
      canvas?.renderAll();
      setToolbarIsEnabled(target);
    };

    eventController?.on('setToolbarPermissions', setToolbarPermissions);

    return () => {
      eventController?.removeListener(
        'setToolbarPermissions',
        setToolbarPermissions
      );
    };
  }, [
    canvas,
    eventController,
    setToolbarIsEnabled,
    shouldHandleRemoteEvent,
    userId,
  ]);
};

export default useSynchronizedSetToolbarPermissions;
