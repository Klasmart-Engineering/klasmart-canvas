import { useCallback, useContext, useEffect, useMemo } from 'react';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import {
  ObjectEvent,
  PaintEventSerializer,
} from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET } from '../reducers/undo-redo';
import { floodFillMouseEvent } from '../utils/floodFillMouseEvent';
import { isEmptyShape, isShape } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';
import floodFillCursor from '../../../assets/cursors/flood-fill.png';
import ICanvasActions from '../canvas-actions/ICanvasActions';

export const useFloodFill = (
  canvas: fabric.Canvas,
  userId: string,
  actions: ICanvasActions,
  eventSerializer: PaintEventSerializer,
  undoRedoDispatch: (action: CanvasAction) => void
) => {
  const {
    isLocalObject,
    allToolbarIsEnabled,
    floodFillIsActive,
    toolbarIsEnabled,
    serializerToolbarState,
    floodFill,
    eraseType,
    laserIsActive,
    textIsActive,
  } = useContext(WhiteboardContext);

  const laserPointerIsActive = useMemo(() => laserIsActive, [laserIsActive]);

  /**
   * Get the color of the clicked area in the Whiteboard
   * and returns it in hexadecimal code
   * @param {IEvent} event - click event
   */
  const getColorInCoord = useCallback(
    (x: number, y: number): string | null => {
      if (canvas) {
        const colorData = canvas
          .getContext()
          .getImageData(
            x * window.devicePixelRatio,
            y * window.devicePixelRatio,
            1,
            1
          )
          .data.slice(0, 3);
        return (
          '#' +
          (
            (1 << 24) +
            (colorData[0] << 16) +
            (colorData[1] << 8) +
            colorData[2]
          )
            .toString(16)
            .slice(1)
        );
      }

      return null;
    },
    [canvas]
  );

  /**
   * Make a mouse down event below of the clicked shape
   * @param {IEvent} event - Contains the x, y coords of the clicked point
   */
  const manageShapeOutsideClick = useCallback(
    (event: fabric.IEvent) => {
      let foundShape: fabric.Object | null = null;

      canvas?.forEachObject((object: fabric.Object) => {
        if (
          event.pointer &&
          isEmptyShape(object) &&
          object.containsPoint(event.pointer) &&
          object !== event.target
        ) {
          foundShape = object;
        }
      });

      if (event.pointer) {
        canvas?.trigger('mouse:down', {
          target: foundShape,
          pointer: {
            x: event.pointer.x,
            y: event.pointer.y,
          },
        });
      }
    },
    [canvas]
  );

  /**
   * Manages the logic for Flood-fill Feature
   */
  useEffect(() => {
    let originalStroke = null;
    let originalFill = null;
    let originalBackground = null;
    let clickedColor: string | null = null;
    const differentFill = '#dcdcdc';
    const differentStroke = '#dbdbdb';
    const differentBackground = '#dadada';

    const isLocalShape = (shape: TypedShape) => {
      return shape.id && isLocalObject(shape.id, userId);
    };

    const teacherHasPermission =
      allToolbarIsEnabled && floodFillIsActive && toolbarIsEnabled;
    const studentHasPermission =
      floodFillIsActive && toolbarIsEnabled && serializerToolbarState.floodFill;

    if ((canvas && teacherHasPermission) || (canvas && studentHasPermission)) {
      canvas.defaultCursor = `url("${floodFillCursor}") 2 15, default`;
      canvas.forEachObject((object: TypedShape) => {
        actions.setObjectControlsVisibility(object as ICanvasObject, false);

        if (!isLocalShape(object)) {
          return;
        }

        object.set({
          evented: true,
          selectable: object.get('type') !== 'image' ? true : false,
          lockMovementX: true,
          lockMovementY: true,
          hasBorders: false,
          hoverCursor: isLocalShape(object)
            ? `url("${floodFillCursor}") 2 15, default`
            : `url("${floodFillCursor}") 2 15, default`,
          perPixelTargetFind: isShape(object) ? false : true,
        });
      });

      actions.reorderShapes();
      canvas.renderAll();

      canvas.on('mouse:down', async (event: fabric.IEvent) => {
        // Click out of any object
        if (
          !event.target ||
          (event.target &&
            ((event.target.get('type') === 'path' &&
              !isEmptyShape(event.target)) ||
              event.target.get('type') === 'image'))
        ) {
          floodFillMouseEvent(
            event,
            canvas,
            userId,
            isLocalObject as (p1: string, p2: string) => boolean,
            floodFill,
            eventSerializer,
            undoRedoDispatch
          );
          return;
        }

        // Click on object shape
        if (
          event.target &&
          event.pointer &&
          isEmptyShape(event.target) &&
          (event.target as ICanvasObject).id
        ) {
          // Store the current stroke and fill colors to reset them
          originalStroke = event.target.stroke;
          originalFill = event.target.fill;
          originalBackground = canvas.backgroundColor;

          // Change stroke to a provisional color to be identified
          event.target.set({
            stroke: differentStroke,
            fill: differentFill,
          });
          canvas.backgroundColor = differentBackground;
          canvas.renderAll();

          clickedColor = getColorInCoord(event.pointer.x, event.pointer.y);

          if (
            clickedColor === differentFill &&
            (event.target as ICanvasObject).id
          ) {
            // If user click inside of the shape
            event.target.set({
              fill: floodFill,
              stroke: originalStroke,
            });

            canvas.discardActiveObject();
            canvas.backgroundColor = originalBackground;

            const payload: ObjectEvent = {
              type: 'shape',
              target: {
                fill: event.target.fill,
                objectsOrdering: canvas
                  .getObjects()
                  .map((obj: ICanvasObject, index) => {
                    return { id: obj.id, index: index };
                  }),
              } as ICanvasObject,
              id: (event.target as ICanvasObject).id || '',
            };

            const eventState = {
              event: payload,
              type: 'colorChanged',
            } as IUndoRedoEvent;

            undoRedoDispatch({
              type: SET,
              payload: canvas.getObjects(),
              canvasId: userId,
              event: eventState,
            });

            eventSerializer?.push('colorChanged', payload);
          } else if (clickedColor === differentStroke) {
            // If user click in the border of the shape
            event.target.set({
              stroke: originalStroke,
              fill: originalFill,
            });
            canvas.backgroundColor = originalBackground;
          } else {
            // If user click outside of the shape
            event.target.set({
              stroke: originalStroke,
              fill: originalFill,
            });
            canvas.backgroundColor = originalBackground;

            if (event.e) {
              manageShapeOutsideClick(event);
            }
          }
        }

        canvas.renderAll();
      });
    }

    return () => {
      if (canvas) {
        canvas.defaultCursor = 'default';
      }

      if (!floodFillIsActive && eraseType !== 'object') {
        canvas?.forEachObject((object: ICanvasObject) => {
          object.set({
            hoverCursor: laserPointerIsActive ? 'none' : 'default',
            evented: false,
            perPixelTargetFind: false,
          });
        });
      }

      if (!textIsActive && eraseType !== 'object') {
        canvas?.off('mouse:down');
      }
    };
  }, [
    actions,
    canvas,
    floodFill,
    floodFillIsActive,
    getColorInCoord,
    isLocalObject,
    manageShapeOutsideClick,
    userId,
    textIsActive,
    eventSerializer,
    eraseType,
    undoRedoDispatch,
    toolbarIsEnabled,
    laserPointerIsActive,
    allToolbarIsEnabled,
    serializerToolbarState.floodFill,
  ]);
};
