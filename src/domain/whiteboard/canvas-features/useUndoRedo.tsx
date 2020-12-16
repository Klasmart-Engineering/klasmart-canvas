import { fabric } from 'fabric';
import { useContext, useEffect } from 'react';
import { CANVAS_OBJECT_PROPS } from '../../../config/undo-redo-values';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { CanvasAction, SET, SET_GROUP } from '../reducers/undo-redo';
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import { IObjectOptions } from 'fabric/fabric-impl';

/**
 * Handles the logic for lineWidth, fontFamily and fontColor undo/redo actions
 * @param {fabric.Canvas} canvas - Canvas in which the action is made
 * @param {string} userId - User that will do the action
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher to save
 * the events to could make undo/redo over them.
 */
export const useUndoRedo = (
  canvas: fabric.Canvas,
  userId: string,
  undoRedoDispatch: (action: CanvasAction) => void
) => {
  const { lineWidth, fontFamily, fontColor } = useContext(WhiteboardContext);

  // LineWidth Property undo/redo in group of objects
  useEffect(() => {
    if (lineWidth && canvas) {
      const obj = canvas.getActiveObject() as ICanvasObject;
      const type = obj?.get('type');

      if (!obj || type !== 'activeSelection') return;

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

      let filtered = canvas?.getObjects().filter((o: IObjectOptions) => {
        return !o.group;
      });

      let active: TypedGroup = canvas?.getActiveObject() as TypedGroup;
      active?.set({ id: `${userId}:group` });

      undoRedoDispatch({
        type: SET_GROUP,
        payload: [...(filtered as any[]), active],
        canvasId: userId,
        event: (event as unknown) as IUndoRedoEvent,
      });
    }
  }, [lineWidth, canvas, undoRedoDispatch, userId]);

  // FontFamily Property undo/redo
  useEffect(() => {
    if (canvas && fontFamily) {
      const obj = canvas?.getActiveObject() as ICanvasObject;
      const type = obj?.get('type');

      if (type === 'textbox' && obj) {
        const target = {
          fontFamily,
        };

        const payload = {
          type,
          target,
          id: obj?.id,
        };

        const event = { event: payload, type: 'fontFamilyChanged' };

        obj.set({ fontFamily });

        undoRedoDispatch({
          type: SET,
          payload: canvas?.getObjects() as TypedShape[],
          canvasId: userId,
          event: (event as unknown) as IUndoRedoEvent,
        });
      } else if (obj?.type === 'activeSelection') {
        let events: any[] = [];
        const eventId: string = uuidv4();

        obj._objects?.forEach((object: any) => {
          const payload = {
            type,
            target: { fontFamily },
            id: object.id,
          };

          const event = { event: payload, type: 'activeSelection', eventId };
          events.push(event);
          object.set({ fontFamily });
        });

        let mappedObjects = canvas?.getObjects().map((object: any) => {
          if (!object.group) {
            return object.toJSON(CANVAS_OBJECT_PROPS);
          }
          const matrix = object.calcTransformMatrix();
          const options = fabric.util.qrDecompose(matrix);
          const transformed = object.toJSON(CANVAS_OBJECT_PROPS);
          let top = object.group.height / 2 + object.top + object.group.top;
          let left = object.group.width / 2 + object.left + object.group.left;

          events.forEach((event: any) => {
            if (event.event.id === object.id) {
              event.event.target.top = top;
              event.event.target.left = left;
            }
          });

          return {
            ...transformed,
            top,
            left,
            scaleX: options.scaleX,
            scaleY: options.scaleY,
          };
        });

        undoRedoDispatch({
          type: SET_GROUP,
          payload: mappedObjects as TypedShape[],
          canvasId: userId,
          event: (events as unknown) as IUndoRedoEvent,
        });
      }
    }
  }, [canvas, fontFamily, undoRedoDispatch, userId]);

  // FontColor Property undo/redo
  useEffect(() => {
    if (fontColor) {
      const objects = canvas?.getActiveObjects() as ICanvasObject[];

      if (objects && objects.length) {
        objects.forEach((obj) => {
          const type = obj?.get('type');

          if (type !== 'textbox') return;

          const payload = {
            type,
            target: { fill: obj?.fill },
            id: obj?.id,
          };

          const event = { event: payload, type: 'colorChanged' };

          undoRedoDispatch({
            type: SET,
            payload: canvas?.getObjects() as TypedShape[],
            canvasId: userId,
            event: (event as unknown) as IUndoRedoEvent,
          });
        });
      }
    }
  }, [fontColor, canvas, undoRedoDispatch, userId]);
};
