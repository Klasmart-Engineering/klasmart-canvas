import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';

const useSynchronizedSetToolbarPermissions = (
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

      setToolbarIsEnabled(target);
    };

    eventController?.on('setToolbarPermissions', setToolbarPermissions);

    return () => {
      eventController?.removeListener(
        'setToolbarPermissions',
        setToolbarPermissions
      );
    };
  }, [eventController, setToolbarIsEnabled, shouldHandleRemoteEvent, userId]);
};

export default useSynchronizedSetToolbarPermissions;
