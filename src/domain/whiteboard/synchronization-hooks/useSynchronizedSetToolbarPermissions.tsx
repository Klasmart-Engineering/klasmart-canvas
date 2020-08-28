import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';

const useSynchronizedSetToolbarPermissions = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean,
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
