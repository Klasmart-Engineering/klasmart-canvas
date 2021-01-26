import { useEffect } from 'react';
import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { fabric } from 'fabric';
import { colorChangeSynchronizationInSpecialBrushes } from '../brushes/actions/colorChangeSynchronizationInSpecialBrushes';
import { ChalkBrush } from '../brushes/classes/chalkBrush';

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
                fill: target.fill || obj.fill,
                stroke: target.stroke || obj.stroke,
              });
              break;

            case 'path':
              obj.set({
                stroke: target.stroke,
              });
              break;

            // Color change in special brushes
            case 'group':
              colorChangeSynchronizationInSpecialBrushes(
                obj as ICanvasBrush,
                target
              );
              break;

            // Chalk/Crayon path case, original is removed and recreated with a new color
            case 'image':
              const basePath = (obj as ICanvasBrush).basePath;
              const brush = new ChalkBrush(
                canvas,
                userId,
                basePath?.type as 'chalk' | 'crayon'
              );

              const clearRects = brush.createChalkEffect(
                basePath?.points || [],
                Number(basePath?.strokeWidth)
              );

              brush
                .createChalkPath(
                  String(target.id),
                  basePath?.points || [],
                  Number(basePath?.strokeWidth),
                  String(target.stroke),
                  clearRects
                )
                .then((newPath) => {
                  const id = obj.id;

                  newPath.set({
                    angle: obj.angle,
                    top: obj.top,
                    left: obj.left,
                    flipX: obj.flipX,
                    flipY: obj.flipY,
                  });

                  delete obj.id;
                  delete newPath.id;

                  canvas.remove(obj);
                  canvas.add(newPath);
                  canvas.renderAll();

                  newPath.set({
                    id: id,
                  });
                })
                .catch((error: Error) => {
                  console.warn(error);
                });
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
