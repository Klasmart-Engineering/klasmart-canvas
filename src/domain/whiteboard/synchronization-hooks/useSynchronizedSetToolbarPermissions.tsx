import { useEffect, useContext } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { UPDATE_RECEIVED } from '../redux/actions';
import { WhiteboardContext } from '../WhiteboardContext';
import { IWhiteboardContext } from '../../../interfaces/whiteboard-context/whiteboard-context';


const useSynchronizedSetToolbarPermissions = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean,
  updatePermissions: (tool: string, payload: boolean) => any
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  const {updateEraserIsActive} =  useContext(
    WhiteboardContext
  ) as IWhiteboardContext;

  useEffect(() => {
    const setToolbarPermissions = (
      id: string,
      target: any,
      isPersistent: boolean
    ) => {
      if (!shouldHandleRemoteEvent(id) && !isPersistent) return;
      updatePermissions(UPDATE_RECEIVED, target);
      if(target.hasOwnProperty('partialErase') || target.hasOwnProperty('erase'))
        updateEraserIsActive(false)
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
