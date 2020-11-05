import { useEffect } from 'react';
import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { Group } from 'fabric/fabric-impl';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { fabric } from 'fabric';

const useSynchronizedColorChanged = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const colorChanged = (
      id: string,
      objectType: string,
      target: ICanvasObject
    ) => {
      if (id && !shouldHandleRemoteEvent(id)) return;

      if (objectType === 'background' && canvas) {
        canvas.backgroundColor = target.fill?.toString();
      }

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          switch (objectType) {
            case 'textbox':
              return;

            case 'shape':
              obj.set({
                fill: target.fill,
              });
              break;

            case 'path':
              obj.set({
                stroke: target.stroke,
              });
              break;

            case 'group':
              if ((obj as ICanvasBrush).basePath?.type === 'paintbrush') {
                const bristles = target.bristles || [];

                if (!bristles.length) return;
                (obj as Group).forEachObject((line, index) => {
                  (line as ICanvasBrush).set({
                    stroke: bristles[index].color,
                    shadow: new fabric.Shadow({
                      affectStroke: true,
                      nonScaling: true,
                      color: bristles[index].color,
                      blur: Number(line.strokeWidth) / 2,
                    }),
                  });

                  (obj as ICanvasBrush).set({
                    basePath: {
                      type: (obj as ICanvasBrush).basePath?.type || 'pen',
                      points: (obj as ICanvasBrush).basePath?.points || [],
                      stroke: target.stroke || '',
                      strokeWidth:
                        (obj as ICanvasBrush).basePath?.strokeWidth || 0,
                      bristles: bristles,
                    },
                  });
                });
              } else if ((obj as ICanvasBrush).basePath?.type !== 'chalk') {
                (obj as Group).forEachObject((line) => {
                  (line as ICanvasBrush).set({
                    stroke: target.stroke,
                  });
                });

                (obj as ICanvasBrush).set({
                  basePath: {
                    type: (obj as ICanvasBrush).basePath?.type || 'pen',
                    points: (obj as ICanvasBrush).basePath?.points || [],
                    stroke: target.stroke || '',
                    strokeWidth:
                      (obj as ICanvasBrush).basePath?.strokeWidth || 0,
                  },
                });
              }
              break;
          }
        }

        if (objectType === 'shape') {
          const index = target.objectsOrdering?.find(
            (find) => obj.id === find.id
          )?.index;

          if (index !== undefined) {
            obj.moveTo(index);
          }
        }
      });

      undoRedoDispatch({
        type: SET_OTHER,
        payload: canvas?.getObjects(),
        canvasId: userId,
      });

      canvas?.renderAll();
    };

    eventController?.on('colorChanged', colorChanged);

    return () => {
      eventController?.removeListener('colorChanged', colorChanged);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedColorChanged;
