import React, { useContext, useEffect, useState } from 'react';
import { IWhiteboardContext } from '../../../interfaces/whiteboard-context/whiteboard-context';
import { WhiteboardContext } from '../WhiteboardContext';
import Canvas3d from './Canvas3d';
import { I3dObject } from './I3dObject';

export interface Canvas3dSyncProps {
  userId: string;
  width: number;
  height: number;
}

/**
 * Function component that renders multiple 3d canvas owned by other users on real time request.
 * @param props Canvas3dSyncProps
 */
const Canvas3dSync = (props: Canvas3dSyncProps) => {
  /**
   * Get needed state context
   */
  const {
    rtAdding3dObject,
    setRtAdding3dObject,
    rtRemoving3dObject,
    setRtRemoving3dObject,
    rtMoving3dObject,
    setRtMoving3dObject /*, setShould3dUpdate*/,
  } = useContext(WhiteboardContext) as IWhiteboardContext;
  const [canvas3ds, setCanvas3d] = useState<I3dObject[] | null>(null);

  /**
   * Handle Add Canvas event.
   * Update the state and updates the context state in order to its related Canvas 3d reacts.
   * @param {I3dObject} obj 3d json
   */
  const addCanvas3d = (obj: I3dObject) => {
    if (!canvas3ds) {
      setCanvas3d([obj]);
    } else {
      const newState = canvas3ds;
      newState.push(obj);
      setRtAdding3dObject(null);
    }
  };

  /**
   * Handle Remove canvas event
   * Update the state and updates the context state in order to its related Canvas 3d reacts.
   * @param {I3dObject} obj 3d json
   */
  const removeCanvas3d = (obj: I3dObject) => {
    if (!canvas3ds) return;

    /**
     * Not in use but kept for possible implementation
     */
    // let newCanvas3ds = null
    // if(obj.canvasId === 'all'){
    //   setShould3dUpdate(true)
    // }else{
    //   newCanvas3ds = canvas3ds.filter(c => c.canvasId !== obj.canvasId)
    // }

    const newCanvas3ds = canvas3ds.filter((c) => c.canvasId !== obj.canvasId);
    setCanvas3d(newCanvas3ds);
    setRtRemoving3dObject(null);
  };

  /**
   * Handle Update canvas event
   * Update the state and updates the context state in order to its related Canvas 3d reacts.
   * @param {I3dObject} obj 3d json
   */
  const updateCanvas3d = (obj: I3dObject) => {
    if (!canvas3ds) return;
    const newCanvas3ds = canvas3ds;
    const index = newCanvas3ds.findIndex((c) => c.canvasId === obj.canvasId);
    if (index === -1) {
      return addCanvas3d(obj);
    }
    newCanvas3ds[index] = obj;
    setCanvas3d(newCanvas3ds);
    setRtMoving3dObject(null);
  };

  /**
   * Hook to listen for adding and removing requests
   */
  useEffect(() => {
    if (rtAdding3dObject) {
      addCanvas3d(rtAdding3dObject);
    }
    if (rtRemoving3dObject) {
      removeCanvas3d(rtRemoving3dObject);
    }
  }, [rtAdding3dObject, rtRemoving3dObject]);

  /**
   * Hook to listen for update/moving requests
   */
  useEffect(() => {
    if (rtMoving3dObject) {
      updateCanvas3d(rtMoving3dObject);
    }
  }, [rtMoving3dObject]);

  return (
    <React.Fragment>
      {canvas3ds
        ? canvas3ds.map((canvas3d) => (
            <Canvas3d
              key={canvas3d.canvasId}
              canvasId={canvas3d.canvasId}
              userId={props.userId}
              ownerId={canvas3d.ownerId}
              width={props.width}
              height={props.height}
              json={canvas3d}
              isOwn={false}
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default Canvas3dSync;
