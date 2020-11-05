import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { useEffect } from 'react';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { PenBrush } from '../brushes/penBrush';
import { IPenPoint } from '../../../interfaces/brushes/pen-point';
import { MarkerBrush } from '../brushes/markerBrush';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { PaintBrush } from '../brushes/paintBrush';

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
              let brush: PenBrush | MarkerBrush | PaintBrush;
              let newObject: ICanvasBrush | null = null;

              switch ((obj as ICanvasBrush).basePath?.type) {
                case 'pen':
                  brush = new PenBrush(canvas, userId);
                  newObject = brush.createPenPath(
                    obj.id,
                    ((target as ICanvasBrush).basePath
                      ?.points as IPenPoint[]) || [],
                    Number((target as ICanvasBrush).basePath?.strokeWidth),
                    String((target as ICanvasBrush).basePath?.stroke)
                  );
                  break;

                case 'marker':
                  brush = new MarkerBrush(canvas, userId, 'marker');
                  newObject = brush.createMarkerPath(
                    obj.id,
                    ((target as ICanvasBrush).basePath
                      ?.points as ICoordinate[]) || [],
                    Number((target as ICanvasBrush).basePath?.strokeWidth),
                    String((target as ICanvasBrush).basePath?.stroke)
                  );
                  break;

                case 'felt':
                  brush = new MarkerBrush(canvas, userId, 'felt');
                  newObject = brush.createFeltPath(
                    obj.id,
                    ((target as ICanvasBrush).basePath
                      ?.points as ICoordinate[]) || [],
                    Number((target as ICanvasBrush).basePath?.strokeWidth),
                    String((target as ICanvasBrush).basePath?.stroke)
                  );
                  break;

                case 'paintbrush':
                  brush = new PaintBrush(canvas, userId);
                  newObject = brush.modifyPaintBrushPath(
                    obj.id,
                    ((target as ICanvasBrush).basePath
                      ?.points as ICoordinate[]) || [],
                    Number((target as ICanvasBrush).basePath?.strokeWidth),
                    String((target as ICanvasBrush).basePath?.stroke),
                    (target as ICanvasBrush).basePath?.bristles || []
                  );
                  break;

                case 'chalk':
                  canvas.remove(obj);
                  canvas.renderAll();
                  break;
              }

              if (!newObject) return;

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
