import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { useEffect } from 'react';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
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
              const newObject: ICanvasBrush = brush.createPenPath(
                obj.id,
                (target as ICanvasBrush).basePath?.points || [],
                (target as ICanvasBrush).basePath?.strokeWidth || 0,
                (target as ICanvasBrush).basePath?.stroke || ''
              );

              newObject.set({
                angle: obj.angle,
                top: obj.top,
                left: obj.left,
                scaleX: obj.scaleX,
                scaleY: obj.scaleY,
                flipX: obj.flipX,
                flipY: obj.flipY,
                originX: obj.originX,
                originY: obj.originY,
                evented: false,
                selectable: false,
              });

              delete obj.id;
              canvas.remove(obj);
              canvas.add(newObject);
              canvas.renderAll();
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
