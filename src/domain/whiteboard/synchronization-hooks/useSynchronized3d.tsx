import { useEffect, useContext } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';
import { I3dObject } from '../three/I3dObject';

const useSynchronized3d = (userId: string) => {
  const {
    // setNew3dShape,
    // set3dActive,
    // setCreating3d,
    // is3dActive,
    // setShoud3dClose,
    // setShoud3dUpdate,
    // setCamera3d,
    // setRtAdding3d,
    setRtAdding3dObject,
    setRtRemoving3dObject,
    setRtMoving3dObject,
    // addCanvas3dId,
    // addCanvas3d,
    // canvas3ds
  } = useContext(WhiteboardContext);
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  const three = (id: string, objectType: string, target: string ) => {
    // console.log(id, objectType, target)
    if(userId === id) return
    console.log("listening")
    const jsonObject = JSON.parse(target)
    // const canvasId = jsonObject.canvasId
    switch (objectType) {
        case "add3d":
            setRtAdding3dObject(jsonObject)
            break;
        case "remove3d":
            setRtRemoving3dObject(jsonObject)
            break;
        case "move3d":
            setRtMoving3dObject(jsonObject)
            break;
        default:
            break;
    }
};

  /** Register and handle remote events. */
  useEffect(() => {
    

    eventController?.on('three',  three);

    return () => {
      eventController?.removeListener('three', three);
    };
  }, [eventController]);
};

export default useSynchronized3d;
