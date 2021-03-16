import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { UPDATE_RECEIVED } from '../redux/actions';

const useSynchronizedSetToolbarPermissions = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean,
  updatePermissions: (tool: string, payload: boolean) => any
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const setToolbarPermissions = (
      id: string,
      target: any,
      isPersistent: boolean
    ) => {
      if (!shouldHandleRemoteEvent(id) && !isPersistent) return;
      updatePermissions(UPDATE_RECEIVED, target);
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
    shouldHandleRemoteEvent,
    userId,
    updatePermissions,
  ]);
};

export default useSynchronizedSetToolbarPermissions;
