import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { TypedShape } from '../../../interfaces/shapes/shapes'
import { fabric } from 'fabric';

const useSynchronizedReconstruct = (
  canvas: fabric.Canvas | undefined,
  shouldHandleRemoteEvent: (id: string) => boolean
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
        if (object.type === 'path') {
          const group = canvas?.getObjects().filter((o: any) => o._objects)[0];
          if (group) {
            canvas?.remove(group);
          }

          fabric.Path.fromObject(object, (path: TypedShape) => {
            const old = canvas?.getObjects().filter((o: TypedShape) => o.id === object.id)[0];
            canvas?.remove(old as fabric.Object);
            canvas?.add(path);
          });

          canvas?.renderAll();
        } else if (object.type === 'textbox') {
          fabric.Textbox.fromObject(object, (path: TypedShape) => {
            const old = canvas?.getObjects().filter((o: TypedShape) => o.id === object.id)[0];
            canvas?.remove(old as fabric.Object);
            canvas?.add(path);
          });
        } else {
          fabric.Group.fromObject(object, (group: fabric.Group) => {
            const old = canvas?.getObjects().filter((o: TypedShape) => o.id === object.id)[0];
            if (group._objects) {
              group._objects.forEach((o: TypedShape) => {
                const oldO = canvas?.getObjects().filter((oldObject: TypedShape) => oldObject.id === o.id)[0];
                canvas?.remove(oldO as fabric.Object);
              });
            }
            canvas?.remove(old as fabric.Object);
            canvas?.add(group);
          });
        }
      });
    }

    eventController?.on('reconstruct', reconstruct);

    return () => {
        eventController?.removeListener('reconstruct', reconstruct);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent]);
};

export default useSynchronizedReconstruct;
