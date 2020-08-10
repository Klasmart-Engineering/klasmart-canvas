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

      canvas?.forEachObject(function (obj: any) {
        if (obj.id !== id) return;
        
          canvas?.remove(obj);
          canvas.renderAll();
          const oObject = obj.toJSON(['strokeUniform', 'id']);
          let nObject = { ...oObject, ...JSON.parse(target.param) };

          switch (target.objectType) {
            case 'path': {
              fabric.Path.fromObject(nObject, (path: any) => {
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
