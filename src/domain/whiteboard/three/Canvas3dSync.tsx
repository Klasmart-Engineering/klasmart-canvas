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

const Canvas3dSync: React.SFC<Canvas3dSyncProps> = (props) => {

  const { rtAdding3dObject, setRtAdding3dObject, rtRemoving3dObject, setRtRemoving3dObject, rtMoving3dObject, setRtMoving3dObject } = useContext(
    WhiteboardContext
  ) as IWhiteboardContext;
  const [canvas3ds, setCanvas3d] = useState<I3dObject[] | null>(null);

  const addCanvas3d = (obj: I3dObject) => {
    
    if(!canvas3ds){
        setCanvas3d([obj]);
    }else{
        const newState = canvas3ds;
        newState.push(obj);
        console.log('adding canvas...', obj, newState);
        setRtAdding3dObject(null)
    }
  };
  const removeCanvas3d = (obj: I3dObject) => {
      if(!canvas3ds) return
      const newCanvas3ds = canvas3ds.filter(c => c.canvasId !== obj.canvasId)
      setCanvas3d(newCanvas3ds)
      setRtRemoving3dObject(null)
  }
  const updateCanvas3d = (obj: I3dObject) => {
        if(!canvas3ds) return
        const newCanvas3ds = canvas3ds
        const index = newCanvas3ds.findIndex(c => c.canvasId === obj.canvasId)
        if(index === -1){
            return addCanvas3d(obj)
        } 
        //newCanvas3ds[index].isMoving = true
        newCanvas3ds[index] = obj
        console.log(newCanvas3ds)
        setCanvas3d(newCanvas3ds)
        setRtMoving3dObject(null)
    }

  useEffect(() => {
    if(rtAdding3dObject){
        addCanvas3d(rtAdding3dObject);
    }
    if(rtRemoving3dObject){
        removeCanvas3d(rtRemoving3dObject);
    }
  }, [rtAdding3dObject, rtRemoving3dObject]);

  useEffect(() => {
    if(rtMoving3dObject){
        updateCanvas3d(rtMoving3dObject);
    }
  }, [rtMoving3dObject]);


  return (
    <React.Fragment>
      {canvas3ds ? canvas3ds.map((canvas3d) => (
        // <div>{canvas3d.canvasId}</div>
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
      )) : null}
    </React.Fragment>
  );
};

export default Canvas3dSync;
