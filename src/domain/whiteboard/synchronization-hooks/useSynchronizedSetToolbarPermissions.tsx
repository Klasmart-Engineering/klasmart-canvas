import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';

const useSynchronizedSetToolbarPermissions = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean,
  setToolbarIsEnabled: (enabled: boolean) => void,
  setPointerIsEnabled: (enabled: boolean) => void,
  setSerializerToolbarState: (enabled: {
    [p: string]: boolean;
    pointer: boolean;
    move: boolean;
    erase: boolean;
    pen: boolean;
    floodFill: boolean;
    text: boolean;
    shape: boolean;
    undoRedo: boolean;
    clearWhiteboard: boolean;
  }) => void
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const setToolbarPermissions = (id: string, target: any) => {
      //if (!shouldHandleRemoteEvent(id)) return;
      if (userId === id) return;

      console.log({ id, target });

      // if (typeof target === 'object' && target !== null) {
      //   setPointerIsEnabled(target.pointer);
      // } else if (target === true || target === false) {
      //   canvas?.discardActiveObject();
      //   canvas?.renderAll();
      //   setToolbarIsEnabled(target);
      // }

      console.log('sync', target.toolbarState);

      setSerializerToolbarState({
        ...target.toolbarState,
        [target.toolbarState]: target.toolbarState,
      });
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
    setSerializerToolbarState,
  ]);
};

export default useSynchronizedSetToolbarPermissions;
