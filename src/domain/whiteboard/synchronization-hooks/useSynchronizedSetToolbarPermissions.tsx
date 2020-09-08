import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';

const useSynchronizedSetToolbarPermissions = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean,
  setToolbarIsEnabled: (enabled: boolean) => void,
  setPointerIsEnabled: (enabled: boolean) => void
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const setToolbarPermissions = (
      id: string,
      target: boolean | { pointer: boolean }
    ) => {
      //if (!shouldHandleRemoteEvent(id)) return;
      if (userId === id) return;

      if (typeof target === 'object' && target !== null) {
        setPointerIsEnabled(target.pointer);
      } else if (target === true || target === false) {
        console.log(setPointerIsEnabled);
        canvas?.discardActiveObject();
        canvas?.renderAll();
        setToolbarIsEnabled(target);
      }
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
    setPointerIsEnabled,
    shouldHandleRemoteEvent,
    userId,
  ]);
};

export default useSynchronizedSetToolbarPermissions;
