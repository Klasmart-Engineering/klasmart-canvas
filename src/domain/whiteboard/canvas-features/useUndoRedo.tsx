import { fabric } from 'fabric';
import { useCallback, useContext, useEffect } from 'react';
import { CANVAS_OBJECT_PROPS } from '../../../config/undo-redo-values';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { CanvasAction, SET_GROUP } from '../reducers/undo-redo';
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import { IObjectOptions } from 'fabric/fabric-impl';
import { IUndoRedoSingleEvent } from '../../../interfaces/canvas-events/undo-redo-single-event';

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
  // Getting context variables
  const { lineWidth, fontFamily, fontColor } = useContext(WhiteboardContext);

  /**
   * Maps the current objects in canvas to set the correct
   * properties in activeSelection objects
   */
  const setMappedObjects = useCallback(
    (events: IUndoRedoEvent[]) => {
      return canvas?.getObjects().map((object: ICanvasObject) => {
        /* If object doesn't belongs to an activeSelection
        it's just passed directly for the filter */
        if (!object.group) {
          return object.toJSON(CANVAS_OBJECT_PROPS);
        }

        const matrix = object.calcTransformMatrix();
        const options = fabric.util.qrDecompose(matrix);
        const transformed = object.toJSON(CANVAS_OBJECT_PROPS);

        // Getting correct top and left properties
        let top =
          Number(object.group.height) / 2 +
          Number(object.top) +
          Number(object.group.top);

        let left =
          Number(object.group.width) / 2 +
          Number(object.left) +
          Number(object.group.left);

        // Setting correct top and left properties
        events.forEach((event: IUndoRedoEvent) => {
          const singleEvent = event.event as IUndoRedoSingleEvent;

          if (singleEvent.id === object.id) {
            singleEvent.target.top = top;
            singleEvent.target.left = left;
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
    },
    [canvas]
  );

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

  // FontFamily Property undo/redo in group of objects
  useEffect(() => {
    if (fontFamily && canvas) {
      const obj = canvas.getActiveObject() as ICanvasObject;
      const type = obj?.get('type');
      const target = { fontFamily };

      if (type === 'activeSelection') {
        let events: IUndoRedoEvent[] = [];
        const eventId = uuidv4();

        obj._objects?.forEach((object: ICanvasObject) => {
          const payload = {
            type,
            target,
            id: object.id,
          };

          const event = { event: payload, type: 'activeSelection', eventId };
          events.push(event as IUndoRedoEvent);
          object.set(target);
        });

        let mappedObjects = setMappedObjects(events);

        undoRedoDispatch({
          type: SET_GROUP,
          payload: mappedObjects as TypedShape[],
          canvasId: userId,
          event: (events as unknown) as IUndoRedoEvent,
        });
      }
    }
  }, [canvas, fontFamily, setMappedObjects, undoRedoDispatch, userId]);

  // FontColor Property undo/redo in group of objects
  useEffect(() => {
    if (fontColor && canvas) {
      const object = canvas.getActiveObject() as ICanvasObject;
      const type = object?.get('type');

      canvas.discardActiveObject();
      if (type === 'activeSelection') {
        const events: IUndoRedoEvent[] = [];
        const eventId = uuidv4();

        (object as fabric.ActiveSelection).forEachObject(
          (obj: ICanvasObject) => {
            const type = obj?.get('type');

            if (type !== 'textbox') return;

            const payload = {
              type,
              target: { fill: obj?.fill },
              id: obj?.id,
            };

            const event = { event: payload, type: 'activeSelection', eventId };
            events.push(event as IUndoRedoEvent);
          }
        );

        let mappedObjects = setMappedObjects(events);

        undoRedoDispatch({
          type: SET_GROUP,
          payload: mappedObjects as TypedShape[],
          canvasId: userId,
          event: (events as unknown) as IUndoRedoEvent,
        });
      }
    }
  }, [fontColor, canvas, undoRedoDispatch, userId, setMappedObjects]);
};
