import { useEffect, useContext } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';

const useSynchronized3d = (userId: string) => {
  const {
    setNew3dShape,
    set3dActive,
    setCreating3d,
    is3dActive,
    setShoud3dClose,
    setShoud3dUpdate,
    setCamera3d,
    // new3dImage,
    // setRedrawing3d,
    // setEditing3d,
    // set3dCanvasPosition,
  } = useContext(WhiteboardContext);
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  const three = (id: string, objectType: string, target: string | { x: number; y: number; z: number }) => {
    // console.log(id, objectType, target)
    if(userId === id) return
    switch (objectType) {
        case "creating3d":
              setNew3dShape((target as string));
              setCreating3d(true);
              set3dActive(true);
            break;
        case "exporting3d":
            setShoud3dClose(true);
            break;
        case "camera3d":
            // console.log("setShoud3dUpdate", id, objectType, target)
            setShoud3dUpdate(true);
            setCamera3d({x:(target as { x: number; y: number; z: number }).x, y:(target as { x: number; y: number; z: number }).y, z:(target as { x: number; y: number; z: number }).z})
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
