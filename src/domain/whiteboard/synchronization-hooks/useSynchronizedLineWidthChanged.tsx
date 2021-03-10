import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { useEffect } from 'react';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { changeLineWidthInSpecialBrushes } from '../brushes/actions/changeLineWidthInSpecialBrushes';

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
      target: ICanvasObject,
      isPersistent: boolean
    ) => {
      const validTypes: string[] = [
        'rect',
        'ellipse',
        'triangle',
        'polygon',
        'path',
        'group',
        'image',
      ];

      if (id && !shouldHandleRemoteEvent(id) && !isPersistent) return;
      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          if (validTypes.includes(objectType)) {
            // Line width Synchronization in special brushes
            if (
              objectType === 'group' ||
              objectType === 'image' ||
              (objectType === 'path' &&
                (obj as ICanvasBrush).basePath?.type === 'dashed')
            ) {
              const lineWidth = Number(
                (target as ICanvasBrush).basePath?.strokeWidth
              );

              changeLineWidthInSpecialBrushes(
                canvas,
                userId,
                obj as ICanvasBrush,
                lineWidth,
                target as ICanvasBrush
              )
                .then()
                .catch((e: Error) => {
                  if (e.message !== 'lineWidth is the same') {
                    console.warn(e);
                  }
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
