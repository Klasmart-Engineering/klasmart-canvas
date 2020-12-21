import { useCallback, useContext, useEffect } from 'react';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { changeLineWidthInSpecialBrushes } from '../brushes/actions/changeLineWidthInSpecialBrushes';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { isEmptyShape, isFreeDrawing } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';
import { useSynchronization } from './useSynchronization';

/**
 * Handles the logic for change lineWidth in path and shape objects
 * @param {fabric.Canvas} canvas - Canvas in which the objects to modify are.
 * @param {string} userId - User that will modify lineWidth in objects.
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher to
 * save lineWidth changes and could make undo/redo over them
 */
export const useChangeLineWidth = (
  canvas: fabric.Canvas,
  userId: string,
  undoRedoDispatch: (action: CanvasAction) => void
) => {
  // Getting lineWidth context variable
  const { lineWidth } = useContext(WhiteboardContext);

  // Getting lineWidth change synchronization effect
  const { changeLineWidthSync } = useSynchronization(userId);

  // Getting event serializer to synchronize lineWidth changes
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  /**
   * Checks if the given object is a common path object
   * @param {ICanvasObject} object - Object to check
   */
  const isCommonBrush = useCallback(
    (object: ICanvasObject) => {
      return (
        lineWidth !== object.strokeWidth &&
        (isEmptyShape(object as TypedShape) || isFreeDrawing(object))
      );
    },
    [lineWidth]
  );

  /**
   * Checks if the given object is a custom path object
   * @param {ICanvasBrush} object - Object to check
   */
  const isCustomBrush = useCallback(
    (object: ICanvasBrush) => {
      return (
        lineWidth !== (object as ICanvasBrush).basePath?.strokeWidth &&
        ((object.type === 'group' && (object as ICanvasBrush).basePath) ||
          (object.type === 'image' && (object as ICanvasBrush).basePath))
      );
    },
    [lineWidth]
  );

  /**
   * Handles the logic for change strokeWidth property
   * in a custom path object
   * @param {ICanvasBrush} object - Custom Path Object to change its width
   */
  const customBrushChange = useCallback(
    (object: ICanvasBrush) => {
      let payload: ObjectEvent;

      changeLineWidthInSpecialBrushes(canvas, userId, object, lineWidth)
        .then((newObject) => {
          const basePath = newObject.basePath;

          payload = {
            type: 'group',
            target: {
              basePath: {
                points: basePath?.points || [],
                strokeWidth: Number(basePath?.strokeWidth),
                stroke: String(basePath?.stroke),
                bristles: basePath?.bristles,
                imageData: basePath?.imageData,
              },
            },
            id: String(newObject.id),
          };

          eventSerializer?.push('lineWidthChanged', payload);
        })
        .catch((e: Error) => {
          if (e.message !== 'lineWidth is the same') {
            console.warn(e);
          }
        });
    },
    [canvas, eventSerializer, lineWidth, userId]
  );

  /**
   * Handles the logic for change strokeWidth property
   * in a common path object
   * @param {ICanvasObject} object - Path Object to change its width
   * @param {boolean} isUnique - Flag to know if is a single active object
   * or has sibling active objects
   */
  const commonBrushChange = useCallback(
    (object: ICanvasObject, isUnique: boolean) => {
      const target = { strokeWidth: lineWidth };

      object.set(target);
      changeLineWidthSync(object);

      if (isUnique) {
        const type = object.get('type');
        const payload = {
          type,
          target,
          id: object.id,
        };

        const event = { event: payload, type: 'lineWidthChanged' };

        undoRedoDispatch({
          type: SET,
          payload: canvas?.getObjects() as TypedShape[],
          canvasId: userId,
          event: event as IUndoRedoEvent,
        });
      }
    },
    [canvas, changeLineWidthSync, lineWidth, undoRedoDispatch, userId]
  );

  /**
   * If lineWidth variable changes and a free line drawing is selected
   * that drawing line width will change to the selected width on Toolbar
   */
  useEffect(() => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    const isUniqueObject = activeObjects.length === 1;

    activeObjects.forEach((object: ICanvasObject) => {
      if (isCommonBrush(object)) {
        commonBrushChange(object, isUniqueObject);
      } else if (isCustomBrush(object as ICanvasBrush)) {
        customBrushChange(object as ICanvasBrush);
      }
    });

    canvas.renderAll();

    /* If commonBrushChange is added on dependencies
    useEffect is loading more than the necesary times
    and some issues are happening */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lineWidth,
    canvas,
    undoRedoDispatch,
    userId,
    isCommonBrush,
    isCustomBrush,
    customBrushChange,
  ]);
};
