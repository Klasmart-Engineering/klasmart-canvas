import { useCallback } from 'react';
import { fabric } from 'fabric';
import { ICanvasBrush } from "../../../interfaces/brushes/canvas-brush";
import { ICanvasPathBrush } from "../../../interfaces/brushes/canvas-path-brush";
import { IUndoRedoEvent } from "../../../interfaces/canvas-events/undo-redo-event";
import { ICanvasObject } from "../../../interfaces/objects/canvas-object";
import { TypedGroup } from "../../../interfaces/shapes/group";
import { TypedShape } from "../../../interfaces/shapes/shapes";
import { changeLineColorInSpecialBrushes } from "../brushes/actions/changeLineColorInSpecialBrushes";
import { ObjectEvent, ObjectType, PaintEventSerializer } from "../event-serializer/PaintEventSerializer";
import { CanvasAction, SET, SET_GROUP } from "../reducers/undo-redo";
import { isShape, isFreeDrawing, is3DShape } from "../utils/shapes";
import { I3dObject } from '../three/I3dObject';
import from2To3d from '../three/from2to3d';

/**
 * Changes the penColor value and if one or more objects are selected
 * also changes the stroke color in free drawing and empty shape objects
 * @param canvas Fabric canvas
 * @param userId User ID
 * @param eventSerializer Paint event serializer
 * @param updatePenColor Update pen color method
 * @param dispatch Dispatch
 * @param changePenColorSync Change pen color method.
 */
 export const useChangeStrokeColor = (
  canvas: fabric.Canvas,
  userId: string,
  eventSerializer: PaintEventSerializer,
  updatePenColor: (color: string) => void,
  dispatch: React.Dispatch<CanvasAction>,
  changePenColorSync: (arg1: ICanvasObject) => void,
  setGroupRedrawing3d: (status: string) => void,
  set3dActive: (active: boolean) => void,
  setRedrawing3dObjects: (objs: I3dObject[]) => void
) => (useCallback(
  (color: string): void => {
    let newActives: TypedShape[] = [];
    let activeObjects: TypedShape[] = [];

    if (!canvas) return;

    const selection = canvas.getActiveObject();

    if (selection?.type === 'activeSelection') {
      activeObjects = (selection as fabric.ActiveSelection)._objects;
    } else {
      activeObjects = canvas.getActiveObjects();
    }

    if (!activeObjects) return;

    canvas.discardActiveObject();

    /**
     * If the object has a 3d relation its relation needs to be updated.
     * The object will be removed from the canvas and the context state updated in order
     * to react an export to the 3d canvas
     */
    const objects3d: I3dObject[] = [] 
    for (const object of activeObjects) {
      if(is3DShape(object as ICanvasObject)){
        /**
         * to 3D
         */
        const three = from2To3d(object as ICanvasObject)
        three.penColor = color

        canvas.remove(object);
        objects3d.push(three)
        continue
      }
      if (
        ((isShape(object) && object.shapeType === 'shape') ||
          isFreeDrawing(object)) &&
        color !== object.stroke
      ) {
        (object as ICanvasPathBrush).set('stroke', color);
        newActives.push(object);
        changePenColorSync(object as ICanvasObject);
      }

      // Updating basePath
      if (isFreeDrawing(object)) {
        const basePath = (object as ICanvasPathBrush).basePath;
        (object as ICanvasPathBrush).set({
          basePath: {
            type: basePath?.type,
            points: basePath?.points,
            stroke: color,
            strokeWidth: basePath?.strokeWidth,
          },
        });
      }

      // Color Change in Special Brushes
      if (
        ((object.type === 'group' && (object as ICanvasBrush).basePath) ||
          (object.type === 'image' && (object as ICanvasBrush).basePath)) &&
        canvas &&
        userId
      ) {
        changeLineColorInSpecialBrushes(
          canvas,
          userId,
          object as ICanvasBrush,
          color
        )
          .then((newObject) => {
            const payload: ObjectEvent = {
              type: 'group',
              target: {
                stroke: (object as ICanvasBrush).basePath?.stroke,
                bristles: (object as ICanvasBrush).basePath?.bristles,
              } as ICanvasObject,
              id: String(object.id),
            };

            eventSerializer?.push('colorChanged', payload);
            newActives.push(newObject as TypedShape);
          })
          .catch((e) => {
            console.warn(e);
          });
      }
    }
    if(objects3d.length > 0){
      setRedrawing3dObjects(objects3d)
      setGroupRedrawing3d("redrawing")
      set3dActive(true)
    } 
    if (newActives.length === 1) {
      canvas?.setActiveObject(newActives[0]);
    } else if (newActives.length >= 2) {
      const activesGroup = new fabric.ActiveSelection(newActives);
      canvas?.setActiveObject(activesGroup);
    }

    updatePenColor(color);

    const obj = canvas?.getActiveObject() as any;
    if (!obj) return;

    const type = obj?.get('type');

    if (type === 'textbox') return;

    if (obj?.type !== 'activeSelection') {
      let stroke = type === 'path' ? obj?.stroke : obj?.basePath?.stroke;

      const payload = {
        type,
        target: { stroke: stroke },
        id: obj?.id,
      };

      const event = { event: payload, type: 'colorChanged' };

      dispatch({
        type: SET,
        payload: canvas?.getObjects() as TypedShape[],
        canvasId: userId,
        event: (event as unknown) as IUndoRedoEvent,
      });
    } else {
      const activeIds: string[] = canvas
        ?.getActiveObject()
        // @ts-ignore - Typings are out of date, getObjects is the correct method to get objects in group.
        .getObjects()
        .map((o: TypedShape) => o.id);
      const payload = {
        type,
        svg: true,
        target: null,
        id: `${userId}:group`,
      };

      const event = { event: payload, type: 'activeSelection', activeIds };

      let filtered = canvas?.getObjects().filter((o: any) => {
        return !o.group;
      });

      let active: TypedGroup = canvas?.getActiveObject() as TypedGroup;
      active?.set({ id: `${userId}:group` });

      dispatch({
        type: SET_GROUP,
        payload: [...(filtered as any[]), active],
        canvasId: userId,
        event: (event as unknown) as IUndoRedoEvent,
      });
    }

    canvas?.renderAll();
  },
  // If changePenColorSync is added performance is affected
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [updatePenColor, userId, eventSerializer, dispatch, canvas]
));

/**
 * Updates text color.
 * @param canvas Fabric canvas
 * @param userId User id
 * @param updateFontColor updates font color method
 * @param eventSerializer Paint event serializer
 * @param dispatch Undo redo dispatch method.
 */
export const useTextColor = (
  canvas: fabric.Canvas,
  userId: string,
  updateFontColor: (color: string) => void,
  eventSerializer: PaintEventSerializer,
  dispatch: React.Dispatch<CanvasAction>
) =>
  useCallback(
    (color: string) => {
      updateFontColor(color);
      if (
        canvas?.getActiveObject() &&
        (canvas.getActiveObject() as fabric.IText).text
      ) {
        canvas.getActiveObject().set('fill', color);
        canvas.renderAll();

        const object: ICanvasObject = canvas?.getActiveObject();

        if (!(object as fabric.ITextOptions).isEditing) {
          const payload = {
            type: 'textbox',
            target: { fill: color },
            id: object.id,
          } as ObjectEvent;

          eventSerializer?.push('fontColorChanged', payload);

          const event = { event: payload, type: 'colorChanged' };

          dispatch({
            type: SET,
            payload: canvas?.getObjects() as TypedShape[],
            canvasId: userId,
            event: (event as unknown) as IUndoRedoEvent,
          });
        }
        return;
      }

      canvas?.getActiveObjects().forEach((obj: ICanvasObject) => {
        if (obj.id) {
          const type: ObjectType = obj.get('type') as ObjectType;
          if (type === 'textbox') {
            const target = (type: string) => {
              if (type === 'textbox') {
                return {
                  fill: color,
                };
              }
            };

            obj.set({
              fill: color,
            });

            const payload: ObjectEvent = {
              type,
              target: target(type) as ICanvasObject,
              id: obj.id,
            };

            eventSerializer?.push('fontColorChanged', payload);
          }
        }
      });
    },
    [updateFontColor, canvas, eventSerializer, dispatch, userId]
  );
