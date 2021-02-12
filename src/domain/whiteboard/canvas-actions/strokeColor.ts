import { useCallback } from 'react';
import { fabric } from 'fabric';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { ICanvasPathBrush } from '../../../interfaces/brushes/canvas-path-brush';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { changeLineColorInSpecialBrushes } from '../brushes/actions/changeLineColorInSpecialBrushes';
import {
  ObjectEvent,
  ObjectType,
  PaintEventSerializer,
} from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET, SET_GROUP } from '../reducers/undo-redo';
import { isShape, isFreeDrawing } from '../utils/shapes';

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
  changePenColorSync: (arg1: ICanvasObject) => void
) =>
  useCallback(
    (color: string): void => {
      /**
       * Changes stroke color in current active objects
       */
      const changeColor = async () => {
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

        for (const object of activeObjects) {
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
            await changeLineColorInSpecialBrushes(
              canvas,
              userId,
              object as ICanvasBrush,
              color
            )
              .then((newObject) => {
                const basePath = (newObject as ICanvasBrush).basePath;

                const payload: ObjectEvent = {
                  type:
                    basePath?.type === 'chalk' || basePath?.type === 'crayon'
                      ? 'image'
                      : 'group',
                  target: {
                    stroke: basePath?.stroke,
                    bristles: basePath?.bristles,
                  } as ICanvasObject,
                  id: String(newObject.id),
                };

                eventSerializer?.push('colorChanged', payload);
                newActives.push(newObject as TypedShape);
              })
              .catch((e) => {
                console.warn(e);
              });
          }
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
      };

      changeColor();
    },
    // If changePenColorSync is added performance is affected
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canvas, updatePenColor, userId, eventSerializer, dispatch]
  );

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
