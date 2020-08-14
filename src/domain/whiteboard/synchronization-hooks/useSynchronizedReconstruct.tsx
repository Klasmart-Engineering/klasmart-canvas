import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
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
      const targetParam = JSON.parse(target.param);

      if (targetParam.svg) {
        fabric.loadSVGFromString(targetParam.svg, (objects: any) => {
          objects.forEach((object: any) => {
            canvas?.forEachObject(function (obj: any) {
              if (object.id !== obj.id) return;
                obj.originX = 'left';
                obj.originY = 'top';
                canvas?.remove(obj);
                canvas?.add(object);
            });
          });
        });
        return;
      }

      canvas?.forEachObject(function (obj: any) {
        if (obj.id !== id) return;
          canvas?.remove(obj);
          canvas.renderAll();
          const oObject = obj.toJSON(['strokeUniform', 'id']);
          let nObject = { ...oObject, ...targetParam };

          switch (target.objectType) {
            case 'path': {

              if (!targetParam.angle) {
                console.log(targetParam, nObject);
                nObject = { ...nObject, angle: 0 };
              }
              
              fabric.Path.fromObject(nObject, (path: any) => {
                path.originX = 'left';
                path.originY = 'top';
                canvas.add(path);
              });
              break;
            }
            case 'textbox': {
              if (JSON.parse(target.param).fill) {
                delete nObject.stroke;
              } else {
                nObject = { ...nObject, fill: nObject.stroke };
                delete nObject.stroke;
              }

              fabric.Textbox.fromObject(nObject, (path: any) => {
                path.originX = 'left';
                path.originY = 'top';
                canvas.add(path);
              });
              break;
            }
        }
      });

      canvas?.renderAll();
    }

    eventController?.on('reconstruct', reconstruct);

    return () => {
        eventController?.removeListener('reconstruct', reconstruct);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent]);
};

export default useSynchronizedReconstruct;
