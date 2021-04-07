import { fabric } from 'fabric';
import { PencilBrush } from 'fabric/fabric-impl';
import { shapePoints } from '../../../../assets/shapes-points';
import { IBrushType } from '../../../../interfaces/brushes/brush-type';
import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { ICanvasPathBrush } from '../../../../interfaces/brushes/canvas-path-brush';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
import { IShapePointsIndex } from '../../../../interfaces/brushes/shape-points-index';
import { IUndoRedoEvent } from '../../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../../interfaces/shapes/shapes';
import { ChalkBrush } from '../../brushes/classes/chalkBrush';
import { MarkerBrush } from '../../brushes/classes/markerBrush';
import { PaintBrush } from '../../brushes/classes/paintBrush';
import { PenBrush } from '../../brushes/classes/penBrush';
import {
  ObjectEvent,
  PaintEventSerializer,
} from '../../event-serializer/PaintEventSerializer';
import { CanvasAction, SET } from '../../reducers/undo-redo';
import { isEmptyShape, is3DShape } from '../../utils/shapes';
import { changeBrushTypeUndoRedoGroup } from './changeBrushTypeUndoRedoGroup';
import { I3dObject } from '../../three/I3dObject';
import from2To3d from '../../three/from2to3d';

/**
 * Changes brushType value and if one or more objects are selected
 * also changes their brush style
 * @param {fabric.Canvas} canvas - Canvas in which the objects to change are
 * @param {string} userId - User that will do changes in objects
 * @param {PaintEventSerializer} eventSerializer - Serializer to synchronize
 * changes in the other canvases
 * @param {IBrushType} type - Brush type to change
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher
 * to save brush type changes and could make undo/redo over them
 */
export const changeBrushTypeAction = async (
  canvas: fabric.Canvas,
  userId: string,
  eventSerializer: PaintEventSerializer,
  updateBrushType: (type: IBrushType) => void,
  type: IBrushType,
  undoRedoDispatch: (action: CanvasAction) => void,
  setGroupRedrawing3d: (status: string) => void,
  set3dActive: (active: boolean) => void,
  setRedrawing3dObjects: (objs: I3dObject[]) => void
) => {
  let newActives: ICanvasObject[] = [];
  let activeObjects: ICanvasObject[] = [];

  /**
   * Checks if the given object is really flood-filled
   * @param {ICanvasObject} object - Object to check its fill property
   */
  const isFloodFilled = (object: ICanvasObject) => {
    return (
      object.fill &&
      object.fill !== 'transparent' &&
      object.fill !== 'rgb(0,0,0)'
    );
  };

  // Updating brush type
  updateBrushType(type);

  if (!canvas) return;

  // Getting the current active objects
  const selection = canvas?.getActiveObject();

  // Saving activeObjects
  if (selection?.type === 'activeSelection') {
    activeObjects = (selection as fabric.ActiveSelection)._objects;
  } else {
    activeObjects = canvas.getActiveObjects();
  }

  if (!activeObjects) return;

  canvas.discardActiveObject();

  // Iterating over activeObjects
  const objects3d: I3dObject[] = [];
  for (const object of activeObjects) {
    /**
     * If the object has a 3d relation its relation needs to be updated.
     * The object will be removed from the canvas and the context state updated in order
     * to react an export to the 3d canvas
     */
    if ((type === 'pencil' || type === 'dashed') && is3DShape(object)) {
      /**
       * to 3D
       */
      const three = from2To3d(object)
      three.brushType = type;

      canvas.remove(object);
      objects3d.push(three);
      continue;
    }
    if (
      (object as ICanvasBrush).basePath &&
      canvas &&
      userId &&
      !isFloodFilled(object)
    ) {
      let brush: PencilBrush | PenBrush | MarkerBrush | PaintBrush | ChalkBrush;
      let newPath;
      let id = (object as ICanvasObject).id;
      const basePath = (object as ICanvasBrush).basePath;
      let points = (basePath?.points as ICoordinate[]).map(
        (point: ICoordinate) => {
          return new fabric.Point(point.x, point.y);
        }
      );

      if (isEmptyShape(object as TypedShape)) {
        const original = shapePoints[object.name as keyof IShapePointsIndex];
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
              points: points || [],
              stroke: String(basePath?.stroke),
              strokeWidth: Number(basePath?.strokeWidth),
            },
          });
          break;

        case 'pen':
          brush = new PenBrush(canvas, userId);
          const { min, max } = (brush as PenBrush).setMinMaxWidth(
            Number(basePath?.strokeWidth)
          );

          const penPoints = points.map((point) => {
            return {
              x: point.x,
              y: point.y,
              width: (brush as PenBrush).getRandomInt(min, max),
            };
          });

          newPath = (brush as PenBrush).createPenPath(
            String((object as ICanvasObject).id),
            penPoints,
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

          const bristles = (brush as PaintBrush).makeBrush(
            String(basePath?.stroke),
            Number(basePath?.strokeWidth)
          );

          newPath = (brush as PaintBrush).modifyPaintBrushPath(
            String((object as ICanvasObject).id),
            points,
            Number(basePath?.strokeWidth),
            String(basePath?.stroke),
            bristles
          );
          break;

        case 'chalk':
        case 'crayon':
          brush = new ChalkBrush(canvas, userId, type);

          const clearRects = (brush as ChalkBrush).createChalkEffect(
            points,
            Number(basePath?.strokeWidth)
          );

          await (brush as ChalkBrush)
            .createChalkPath(
              String((object as ICanvasObject).id),
              points,
              Number(basePath?.strokeWidth),
              String(basePath?.stroke),
              clearRects
            )
            .then((image) => {
              newPath = image;
            })
            .catch((error) => {
              console.warn(error);
            });
          break;
      }

      if (!newPath) return;

      (newPath as ICanvasObject).set({
        top: object.top,
        left: object.left,
        angle: object.angle,
        scaleX: object.scaleX,
        scaleY: object.scaleY,
        flipX: object.flipX,
        flipY: object.flipY,
      });

      // Removing id to don't be detected and remove event wouldn't be sent
      delete (object as ICanvasObject).id;
      delete (newPath as ICanvasObject).id;

      canvas.remove(object);
      canvas.add(newPath as ICanvasObject);

      (newPath as ICanvasObject).set({
        id: id,
      });

      // Pushing new object to select it after creation
      newActives.push(newPath as ICanvasObject);

      const payload = {
        id: String((newPath as ICanvasObject).id),
        type: newPath.type,
        target: (newPath as ICanvasBrush).basePath,
      } as ObjectEvent;

      eventSerializer?.push('brushTypeChanged', payload);

      if (activeObjects.length === 1) {
        const event = { event: payload, type: 'brushTypeChanged' };

        // Dispatching Brush Type Change in Custom Paths
        undoRedoDispatch({
          type: SET,
          payload: canvas?.getObjects() as TypedShape[],
          canvasId: userId,
          event: (event as unknown) as IUndoRedoEvent,
        });
      }
    }
  }
  if (objects3d.length > 0) {
    setRedrawing3dObjects(objects3d);
    setGroupRedrawing3d('redrawing');
    set3dActive(true);
  }

  if (newActives.length === 1) {
    canvas?.setActiveObject(newActives[0]);
  } else if (newActives.length >= 2) {
    const activesGroup = new fabric.ActiveSelection(newActives);
    canvas?.setActiveObject(activesGroup);
  }

  canvas?.renderAll();
  changeBrushTypeUndoRedoGroup(canvas, userId, undoRedoDispatch);
};
