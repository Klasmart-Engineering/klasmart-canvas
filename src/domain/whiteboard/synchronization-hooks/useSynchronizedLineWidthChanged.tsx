import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { useEffect } from 'react';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { Group } from 'fabric/fabric-impl';
import { PenBrush } from '../brushes/penBrush';

const useSynchronizedLineWidthChanged = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();
  useEffect(() => {
    const widthChanged = (
      id: string,
      objectType: string,
      target: ICanvasObject
    ) => {
      const validTypes: string[] = [
        'rect',
        'ellipse',
        'triangle',
        'polygon',
        'path',
        'group',
      ];

      if (id && !shouldHandleRemoteEvent(id)) return;
      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          if (validTypes.includes(objectType)) {
            if (objectType === 'group') {
              const brush = new PenBrush(canvas, userId);
              const strokeWidth = Number(target.strokeWidth);

              (obj as Group).forEachObject((line) => {
                line.set({
                  strokeWidth: brush.getRandomInt(strokeWidth / 2, strokeWidth),
                });
              });

              (obj as ICanvasBrush).set({
                basePath: {
                  points: (obj as ICanvasBrush).basePath?.points || [],
                  stroke: (obj as ICanvasBrush).basePath?.stroke || '',
                  strokeWidth: strokeWidth,
                },
              });
            } else {
              obj.set({
                strokeWidth: target.strokeWidth,
              });
            }
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

    eventController?.on('lineWidthChanged', widthChanged);

    return () => {
      eventController?.removeListener('lineWidthChanged', widthChanged);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedLineWidthChanged;
