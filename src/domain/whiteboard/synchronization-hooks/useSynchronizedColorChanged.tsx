import { useEffect } from 'react';
import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { Group } from 'fabric/fabric-impl';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';

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
              (obj as Group).forEachObject((line) => {
                (line as ICanvasBrush).set({
                  stroke: target.stroke,
                  basePath: {
                    type: (obj as ICanvasBrush).basePath?.type || 'pen',
                    points: (obj as ICanvasBrush).basePath?.points || [],
                    stroke: target.stroke || '',
                    strokeWidth:
                      (obj as ICanvasBrush).basePath?.strokeWidth || 0,
                  },
                });
              });
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
