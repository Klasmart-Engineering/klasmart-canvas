import { useEffect, useContext } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handle the logic for Real time listening of events associated to the 3d canvas
 * from other users that should impact and the whiteboard of the current user
 * @param userId
 */
const useSynchronized3d = (userId: string) => {
  const {
    setRtAdding3dObject,
    setRtRemoving3dObject,
    setRtMoving3dObject,
  } = useContext(WhiteboardContext);
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  const three = (
    emittingUserId: string,
    objectType: string,
    target: string
  ) => {
    //if(objectType !== "removeAll3d" && userId === emittingUserId) return
    if (userId === emittingUserId) return;
    const jsonObject = JSON.parse(target);
    switch (objectType) {
      case 'add3d':
        setRtAdding3dObject(jsonObject);
        break;
      case 'remove3d':
        setRtRemoving3dObject(jsonObject);
        break;
      case 'move3d':
        setRtMoving3dObject(jsonObject);
        break;
      // case "removeAll3d":
      //   setRtRemoving3dObject(jsonObject)
      //   console.log("remove all!")
      //   break;
      default:
        break;
    }
  };

  /** Register and handle remote events. */
  useEffect(() => {
    eventController?.on('three', three);

    return () => {
      eventController?.removeListener('three', three);
    };
  }, [eventController]);
};

export default useSynchronized3d;
