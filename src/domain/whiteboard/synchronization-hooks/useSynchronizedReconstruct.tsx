import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { fabric } from 'fabric';
import { TypedGroup } from '../../../interfaces/shapes/group';

const useSynchronizedReconstruct = (
  canvas: fabric.Canvas | undefined,
  shouldHandleRemoteEvent: (id: string) => boolean,
  userId: string,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {

    const reconstruct = (id: string, target: any) => {
      if (!shouldHandleRemoteEvent(id)) return;
      const objects = JSON.parse(target.param).objects;
      // const objects = JSON.parse(targetParam).objects;
      objects.forEach((object: TypedShape) => {
        if (object && object.type === 'path') {
          const group: TypedGroup | undefined = canvas?.getObjects().filter((o: any) => o._objects)[0] as TypedGroup;
          if (group && group.id) {
            canvas?.remove(group);
          }

          fabric.Path.fromObject(object, (path: TypedShape) => {
            const old = canvas?.getObjects().filter((o: TypedShape) => o.id === object.id)[0];
            path.set({ selectable: false, evented: false });
            canvas?.remove(old as fabric.Object);
            canvas?.add(path);
          });

          canvas?.renderAll();
        } else if (object && object.type === 'textbox') {
          fabric.Textbox.fromObject(object, (path: TypedShape) => {
            const old = canvas?.getObjects().filter((o: TypedShape) => o.id === object.id)[0];
            path.set({ selectable: false, evented: false });
            canvas?.remove(old as fabric.Object);
            canvas?.add(path);
          });
        } else if (object) {
          fabric.Group.fromObject(object, (group: fabric.Group) => {
            const old = canvas?.getObjects().filter((o: TypedShape) => o.id === object.id)[0];
            if (group._objects) {
              group._objects.forEach((o: TypedShape) => {
                const oldO = canvas?.getObjects().filter((oldObject: TypedShape) => oldObject.id === o.id)[0];
                canvas?.remove(oldO as fabric.Object);
              });
            }
            group.set({ selectable: false, evented: false });
            canvas?.remove(old as fabric.Object);
            canvas?.add(group);
          });
        }

        undoRedoDispatch({
          type: SET_OTHER,
          payload: (canvas?.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
        });
      });
    }

    eventController?.on('reconstruct', reconstruct);

    return () => {
        eventController?.removeListener('reconstruct', reconstruct);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent, undoRedoDispatch, userId]);
};

export default useSynchronizedReconstruct;
