import { useEffect } from 'react';
import { useUndoRedo, SET, MODIFY, UNDO } from '../reducers/undo-redo';
import { fabric } from 'fabric';


export const UndoRedo = (canvas: any) => {
  const { state, dispatch } = useUndoRedo();

  useEffect(() => {
    if (!state || !canvas) {
      return;
    }

    console.log('STATE: ', state);


    if (state.actionType === SET || state.actionType === null) {
      canvas?.on('object:added', (e: any) => {
        console.log('added: ', e);
        // dispatch({ type: SET, payload: e });
        console.log(canvas.getObjects());
        dispatch({ type: SET, payload: canvas.getObjects() });
      });
    

      canvas?.on('object:modified', (e: any) => {
        console.log('modified: ', e);
        dispatch({ type: MODIFY, payload: e });
      });

      canvas?.on('object:removed', (e: any) => {
        console.log('removed: ', e);
        // dispatch({ type: REMOVE, payload: e });
      });
    } else if (state.actionType === UNDO) {
      canvas.clear();
      console.log(fabric, canvas);

      canvas.loadFromJSON(JSON.stringify({ objects: state.activeState }));
      
      // fabric.util.enlivenObjects(state.activeState, (objects: any) => {
      //   debugger;
      //   objects.forEach((object: any) => {
      //     canvas.add(object);
      //   });
      // });
      // canvas.loadFromJSON(JSON.parse(state.activeState), canvas.renderAll.bind(canvas));
    }
    // } else if (state.actionType === UNDO && state.event && state.event === 'remove') {
    //   console.log(state);
    //   console.log(canvas.getObjects());
    //   let canvasObject = canvas.getObjects().find((object: any) => (object.uuid === state.event.uuid));
    //   console.log(canvasObject);
    //   canvas.setActiveObject(canvasObject);
    //   canvas.remove(canvas.getActiveObject());
    //   canvas.renderAll();
    // } else if (state.actionType === UNDO && state.event && state.event === 'modify') {
    //   console.log(state);
    //   // let canvasObject = canvas.getObjects().find((object: any) => (object.uuid === state.event.uuid));
    // }

    return(() => {
      canvas?.off('object:added');
      canvas?.off('object:modified');
      canvas?.off('object:removed');
    });

  }, [state, canvas, dispatch]);

  return { state, dispatch };
}
