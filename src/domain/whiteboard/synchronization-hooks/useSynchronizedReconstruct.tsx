import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

const useSynchronizedReconstruct = (
  canvas: fabric.Canvas | undefined,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const reconstruct = (id: string, target: ICanvasObject) => {
      if (!shouldHandleRemoteEvent(id)) return;

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id !== id || !target.param) return;

        canvas?.remove(obj);
        canvas.renderAll();
        const oObject = obj.toJSON(['strokeUniform', 'id']);
        let nObject = { ...oObject, ...JSON.parse(target.param) };

        switch (target.objectType) {
          case 'path': {
            fabric.Path.fromObject(nObject, (path: fabric.Object) => {
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

            fabric.Textbox.fromObject(nObject, (path: fabric.Object) => {
              canvas.add(path);
            });
            break;
          }
        }
      });

      canvas?.renderAll();
    };

    eventController?.on('reconstruct', reconstruct);

    return () => {
      eventController?.removeListener('reconstruct', reconstruct);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent]);
};

export default useSynchronizedReconstruct;
