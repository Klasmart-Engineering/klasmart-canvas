import { fabric } from 'fabric';
import { IEvent } from 'fabric/fabric-impl';
import { useCallback, useContext, useEffect } from 'react';
import { DEFAULT_VALUES } from '../../../config/toolbar-default-values';
import { ICanvasPathBrush } from '../../../interfaces/brushes/canvas-path-brush';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { ICanvasDrawingEvent } from '../../../interfaces/canvas-events/canvas-drawing-event';
import { ICanvasFreeDrawingBrush } from '../../../interfaces/free-drawing/canvas-free-drawing-brush';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import { ChalkBrush } from '../brushes/classes/chalkBrush';
import { DashedBrush } from '../brushes/classes/dashedBrush';
import { MarkerBrush } from '../brushes/classes/markerBrush';
import { PaintBrush } from '../brushes/classes/paintBrush';
import { PenBrush } from '../brushes/classes/penBrush';
import { setBasePathInNormalBrushes } from '../brushes/utils/setBasePathInNormalBrushes';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { getToolbarIsEnabled } from '../redux/utils';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
// import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles logic for Free Hand Drawing Feature
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that will draw in Whiteboard
 */
export const useFreeHandDrawing = (
  canvas: fabric.Canvas,
  userId: string,
  serializerToolbarState: IPermissions
) => {
  // Getting necessary context variables
  const {
    brushIsActive,
    penColor,
    lineWidth,
    brushType,
    allToolbarIsEnabled,
    partialEraseIsActive,
  } = useContext(WhiteboardContext);

  // Getting event serializer for synchronize objects in remote whiteboards
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  /**
   * Checks current brushType selected
   * to set it like current path style
   */
  const setBrushType = useCallback(() => {
    switch (brushType) {
      case 'pen':
        canvas.freeDrawingBrush = new PenBrush(canvas, userId);
        break;
      case 'marker':
      case 'felt':
        canvas.freeDrawingBrush = new MarkerBrush(canvas, userId, brushType);
        break;
      case 'paintbrush':
        canvas.freeDrawingBrush = new PaintBrush(canvas, userId);
        break;
      case 'chalk':
      case 'crayon':
        canvas.freeDrawingBrush = new ChalkBrush(canvas, userId, brushType);
        break;
      case 'dashed':
        canvas.freeDrawingBrush = new DashedBrush(canvas, userId);
        break;
      default:
        canvas.freeDrawingBrush = new fabric.PencilBrush();
        break;
    }
  }, [brushType, canvas, userId]);

  /**
   * Activates or deactivates drawing mode.
   */
  useEffect(() => {
    let coordinates: ICoordinate[] = [];
    const toolbarIsEnabled = getToolbarIsEnabled();

    /**
     * When a path object is recently created set its stroke like uniform
     * @param {ICanvasDrawingEvent} e - Event that contains
     * the recent created path
     */
    const pathCreated = (e: ICanvasDrawingEvent) => {
      if (e.path) {
        setBasePathInNormalBrushes(e.path as ICanvasPathBrush);
        e.path.strokeUniform = true;
        canvas.renderAll();
      }
    };

    const realTimePath = (e: IEvent) => {
      if ((e.e as MouseEvent).which && (e.e as MouseEvent).buttons && canvas) {
        coordinates.push(e.pointer as ICoordinate);

        if (coordinates.length && coordinates.length % 10 === 0) {
          const payload: ObjectEvent = {
            type: 'path',
            target: {
              coordinates,
              color: penColor || DEFAULT_VALUES.PEN_COLOR,
              lineWidth,
              id: userId,
              type: brushType,
            },
            id: userId,
          };

          eventSerializer.push('moving', payload);
        }
      } else {
        coordinates = [];
      }
    };

    /* When free hand drawing option is selected on toolbar,
    freeDrawingBrush is created */
    if (brushIsActive && canvas) {
      const canDraw =
        allToolbarIsEnabled || (toolbarIsEnabled && serializerToolbarState.pen);
      coordinates = [];

      setBrushType();

      (canvas.freeDrawingBrush as ICanvasFreeDrawingBrush).canvas = canvas;
      canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
      canvas.freeDrawingBrush.width = lineWidth;
      canvas.freeDrawingCursor = 'crosshair';
      canvas.isDrawingMode = canDraw;

      canvas.on('mouse:move', realTimePath);

      canvas.on('path:created', pathCreated);
    } else if (canvas && !brushIsActive && !partialEraseIsActive) {
      canvas.isDrawingMode = false;
    }

    return () => {
      canvas?.off('path:created');
      canvas?.off('mouse:move');
    };
  }, [
    allToolbarIsEnabled,
    brushIsActive,
    brushType,
    canvas,
    eventSerializer,
    lineWidth,
    partialEraseIsActive,
    penColor,
    serializerToolbarState.pen,
    setBrushType,
    userId,
  ]);
};
