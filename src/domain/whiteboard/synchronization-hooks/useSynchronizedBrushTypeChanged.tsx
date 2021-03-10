import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { fabric } from 'fabric';
import { PenBrush } from '../brushes/classes/penBrush';
import { MarkerBrush } from '../brushes/classes/markerBrush';
import { PaintBrush } from '../brushes/classes/paintBrush';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { ICanvasPathBrush } from '../../../interfaces/brushes/canvas-path-brush';
import { IPenPoint } from '../../../interfaces/brushes/pen-point';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { isEmptyShape } from '../utils/shapes';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { shapePoints } from '../../../assets/shapes-points';
import { IShapePointsIndex } from '../../../interfaces/brushes/shape-points-index';
import { ICanvasShapeBrush } from '../../../interfaces/brushes/canvas-shape-brush';

const useSynchronizedBrushTypeChanged = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  // Handling remote events
  useEffect(() => {
    /**
     * Add the given path in current canvas
     * @param {ICanvasBrush} path - Path to add
     * @param {ICanvasObject} oldPath - Previous path
     * with properties to set in the new one
     * @param {ICanvasBrush} target - received target from event
     */
    const addPathInCanvas = (
      path: ICanvasObject,
      oldPath: ICanvasObject,
      target: ICanvasBrush
    ) => {
      (path as ICanvasObject).set({
        id: (oldPath as ICanvasObject).id,
        top: target.top,
        left: target.left,
        angle: oldPath.angle,
        scaleX: oldPath.scaleX,
        scaleY: oldPath.scaleY,
        flipX: oldPath.flipX,
        flipY: oldPath.flipY,
        selectable: false,
        evented: false,
      });

      delete (oldPath as ICanvasObject).id;
      canvas?.remove(oldPath);
      canvas?.add(path as ICanvasObject);
    };

    const brushTypeChanged = (
      id: string,
      target: ICanvasBrush,
      isPersistent?: boolean
    ) => {
      if (!shouldHandleRemoteEvent(id) && !isPersistent) return;

      canvas?.forEachObject(async (object: ICanvasObject) => {
        if (object.id && object.id === id) {
          let brush;
          let newPath;
          const basePath = target.basePath;
          const type = basePath?.type;
          let points = (basePath?.points as ICoordinate[]).map(
            (point: ICoordinate) => {
              return new fabric.Point(point.x, point.y);
            }
          );

          if (
            isEmptyShape(object as TypedShape) &&
            !(object as ICanvasShapeBrush).basePath
          ) {
            const original =
              shapePoints[object.name as keyof IShapePointsIndex];
            points = original.points.map((point: ICoordinate) => {
              let scaleX = (point.x / original.width) * Number(object.width);
              let scaleY = (point.y / original.height) * Number(object.height);
              return new fabric.Point(scaleX, scaleY);
            });
          }

          switch (type) {
            case 'dashed':
            case 'pencil':
              brush = new fabric.PencilBrush();
              newPath = brush.createPath(
                brush.convertPointsToSVGPath(points).join('')
              );

              ((newPath as ICanvasObject) as ICanvasPathBrush).set({
                stroke: basePath?.stroke,
                strokeWidth: basePath?.strokeWidth,
                strokeUniform: true,
                strokeDashArray:
                  type === 'dashed' ? [Number(basePath?.strokeWidth) * 2] : [],
                basePath: {
                  type: type,
                  points: basePath?.points || [],
                  stroke: String(basePath?.stroke),
                  strokeWidth: Number(basePath?.strokeWidth),
                },
              });
              break;

            case 'pen':
              brush = new PenBrush(canvas, userId);

              newPath = (brush as PenBrush).createPenPath(
                String((object as ICanvasObject).id),
                basePath?.points as IPenPoint[],
                Number(basePath?.strokeWidth),
                String(basePath?.stroke)
              );
              break;

            case 'marker':
            case 'felt':
              brush = new MarkerBrush(canvas, userId, type);

              newPath = (brush as MarkerBrush).createMarkerPath(
                String((object as ICanvasObject).id),
                points,
                Number(basePath?.strokeWidth),
                String(basePath?.stroke)
              );
              break;

            case 'paintbrush':
              brush = new PaintBrush(canvas, userId);

              newPath = (brush as PaintBrush).modifyPaintBrushPath(
                String((object as ICanvasObject).id),
                points,
                Number(basePath?.strokeWidth),
                String(basePath?.stroke),
                basePath?.bristles || []
              );
              break;

            case 'chalk':
            case 'crayon':
              const imageSrc = String(target.basePath?.imageData);
              await fabric.Image.fromURL(imageSrc, (data: fabric.Image) => {
                newPath = data;

                ((newPath as ICanvasObject) as ICanvasBrush).set({
                  basePath: basePath,
                });

                addPathInCanvas(newPath as ICanvasObject, object, target);
              });
              break;
          }

          if (!newPath) return;

          addPathInCanvas(newPath as ICanvasObject, object, target);
        }
      });

      canvas?.renderAll();
    };

    eventController?.on('brushTypeChanged', brushTypeChanged);

    return () => {
      eventController?.removeListener('brushTypeChanged', brushTypeChanged);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent, userId]);
};

export default useSynchronizedBrushTypeChanged;
