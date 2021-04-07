import { useContext, useEffect, useMemo } from 'react';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import {
  ObjectEvent,
  PaintEventSerializer,
} from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET } from '../reducers/undo-redo';
import { floodFillMouseEvent } from '../utils/floodFillMouseEvent';
import { isEmptyShape, isFreeDrawing, isShape, is3DShape } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';
import floodFillCursor from '../../../assets/cursors/flood-fill.png';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import { getToolbarIsEnabled } from '../redux/utils';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { Gradient, IEvent, Pattern } from 'fabric/fabric-impl';
import from2To3d from '../three/from2to3d';

/**
 * Handles the logic for Flood-fill Feature
 * @param {fabric.Canvas} canvas - Canvas in which objects to flood-fill are
 * @param {string} userId - User that will flood-fill objects
 * @param {ICanvasActions} actions - Shared functions
 * that are necessaries here to flood-fill objects
 * @param {PaintEventSerializer} eventSerializer - Serializer for synchronize
 * flood-fill in the other whiteboards
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher to
 * save the ocurred events and could make undo/redo over them
 */
export const useFloodFill = (
  canvas: fabric.Canvas,
  serializerToolbarState: IPermissions,
  userId: string,
  actions: ICanvasActions,
  eventSerializer: PaintEventSerializer,
  undoRedoDispatch: (action: CanvasAction) => void
) => {
  // Getting context variables
  const {
    isLocalObject,
    allToolbarIsEnabled,
    floodFillIsActive,
    floodFill,
    eraseType,
    laserIsActive,
    textIsActive,
    set3dJson,
    set3dActive,
    setRedrawing3d
  } = useContext(WhiteboardContext);

  const paintBucket = `url("${floodFillCursor}") 2 15, default`;
  const laserPointerIsActive = useMemo(() => laserIsActive, [laserIsActive]);

  /**
   * Checks if the given object exists in the given point
   * and if is a flood-fillable object.
   * @param {fabric.Object} object - Object to check
   * @param {fabric.Point} pointer - Point to find the given object
   */
  const objectExistsAtPoint = (
    object: fabric.Object,
    pointer: fabric.Point
  ) => {
    return (
      (isEmptyShape(object) || isFreeDrawing(object)) &&
      object.containsPoint(pointer)
    );
  };

  /**
   * Checks if target in given event is different than a shape
   * to apply on it the flood-fill algorithm for paths and images
   * @param {fabric.IEvent} event - Event in which mouse down is happening
   */
  const needsFloodFillAlgorithm = (event: fabric.IEvent) => {
    if(event.target && is3DShape(event.target as ICanvasObject))
      return false
    return (
      !event.target || 
      (event.target.get('type') === 'path' && !isEmptyShape(event.target)) ||
      (event.target.get('type') === 'group' &&
        (event.target as ICanvasBrush).basePath) ||
      event.target.get('type') === 'image'
      )
  };

  const changeStrokeAndFill = (target: fabric.Object | fabric.Group, stroke: string | undefined, fill: string | Pattern | Gradient | undefined) => {
    
    if(target && is3DShape(target as ICanvasObject)){
      const three = from2To3d(target as ICanvasObject)
      three.shapeColor = floodFill
      const threeObjectString = JSON.stringify(three);
      canvas.remove(target);
      set3dJson(threeObjectString);
      setRedrawing3d(true)
      set3dActive(true);
    }else{
      target.set({
        stroke,
        fill,
      });
    }
  }

  /**
   * Manages the logic for Flood-fill Feature
   */
  useEffect(() => {
    if (!canvas) return;

    const toolbarIsEnabled = getToolbarIsEnabled();

    /**
     * Logic for flood-fill a shape
     * @param {fabric.IEvent} event - Event in which mouse down is happening
     */
    const floodFillInShape = (event: fabric.IEvent) => {
      if (!event.target || !event.pointer) return;

      const differentFill = '#dcdcdc';
      const differentStroke = '#dbdbdb';
      const differentBackground = '#dadada';

      /* Storing the current stroke, fill
      and canvas background colors to reset them */
      const originalStroke = event.target.stroke;
      const originalFill = event.target.fill;
      const originalBackground = canvas.backgroundColor;

      // Change stroke and fill to provisional colors to be identified
      changeStrokeAndFill(event.target, differentStroke, differentFill)
      // event.target.set({
      //   stroke: differentStroke,
      //   fill: differentFill,
      // });

      // Change canvas background to a provional color to be identified
      canvas.backgroundColor = differentBackground;
      canvas.renderAll();

      const clickedColor = getColorInCoord(event.pointer.x, event.pointer.y);

      if (clickedColor === differentFill) {
        // If user click inside of the shape
        changeStrokeAndFill(event.target, originalStroke, floodFill)
        // event.target.set({
        //   fill: floodFill,
        //   stroke: originalStroke,
        // });

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
        changeStrokeAndFill(event.target, originalStroke, originalFill)
        // event.target.set({
        //   stroke: originalStroke,
        //   fill: originalFill,
        // });

        canvas.backgroundColor = originalBackground;
      } else {
        // If user click outside of the shape
        changeStrokeAndFill(event.target, originalStroke, originalFill)
        // event.target.set({
        //   stroke: originalStroke,
        //   fill: originalFill,
        // });

        canvas.backgroundColor = originalBackground;

        if (event.e) {
          manageShapeOutsideClick(event);
        }
      }
    };

    /**
     * Prepares objects to be evented and could flood-fill them
     */
    const prepareObjects = () => {
      canvas.defaultCursor = paintBucket;

      canvas.forEachObject((object: TypedShape) => {
        actions.setObjectControlsVisibility(object as ICanvasObject, false);

        if (!isLocalShape(object)) return;

        object.set({
          evented: true,
          selectable: object.get('type') !== 'image',
          lockMovementX: true,
          lockMovementY: true,
          hasBorders: false,
          hoverCursor: paintBucket,
          perPixelTargetFind: !isShape(object),
        });
      });

      actions.reorderShapes();
      canvas.renderAll();
    };

    /**
     * Make a mouse down event below of the clicked shape
     * @param {IEvent} event - Contains the x, y coords of the clicked point
     */
    const manageShapeOutsideClick = (event: fabric.IEvent) => {
      if (!event.pointer || !event.target) return;

      const { pointer } = event;

      canvas?.forEachObject((object: fabric.Object) => {
        if (object !== event.target && objectExistsAtPoint(object, pointer)) {
          canvas?.trigger('mouse:down', {
            target: object,
            pointer: {
              x: pointer.x,
              y: pointer.y,
            },
          });
        }
      });
    };

    /**
     * Checks if the given shape object is local for current user
     * @param {TypedShape} shape - Shape Object to check
     */
    const isLocalShape = (shape: TypedShape) => {
      return shape.id && isLocalObject(shape.id, userId);
    };

    /**
     * Get the color of the clicked area in the Whiteboard
     * and returns it in hexadecimal code
     * @param {IEvent} event - click event
     */
    const getColorInCoord = (x: number, y: number): string | undefined => {
      if (!canvas) return;

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
        ((1 << 24) + (colorData[0] << 16) + (colorData[1] << 8) + colorData[2])
          .toString(16)
          .slice(1)
      );
    };

    const teacherHasPermission = allToolbarIsEnabled && floodFillIsActive;

    const studentHasPermission =
      floodFillIsActive && toolbarIsEnabled && serializerToolbarState.floodFill;

    const mouseDownFill = async (event: fabric.IEvent) => {
      if (!event.pointer) return;

      // Flood-fill for no shape objects
      if (needsFloodFillAlgorithm(event)) {
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

      // Click on shape object
<<<<<<< HEAD
      if (event.target && (isEmptyShape(event.target) || is3DShape(event.target) ) ) {
=======
      if (event.target && (isEmptyShape(event.target) || is3DShape(event.target))) {
>>>>>>> 7461ad2 (Canvas - 3D Shapes - bucket tool can rotate 3d objects issue fixed)
        floodFillInShape(event);
      }

      canvas.renderAll();
    };

    if (teacherHasPermission || studentHasPermission) {
      prepareObjects();

      canvas.on('mouse:down', mouseDownFill);
    }

    return () => {
      canvas.defaultCursor = 'default';

      // Returning objects to their normal state
      if (!floodFillIsActive && eraseType !== 'object') {
        canvas?.forEachObject((object: ICanvasObject) => {
          object.set({
            hoverCursor: laserPointerIsActive ? 'none' : 'default',
            evented: false,
            perPixelTargetFind: false,
          });
        });
      }

      // Removing mouse:down event when it is not necessary
      if (!textIsActive && eraseType !== 'object') {
        canvas?.off('mouse:down', mouseDownFill);
      }
    };
  }, [
    actions,
    allToolbarIsEnabled,
    canvas,
    eraseType,
    eventSerializer,
    floodFill,
    floodFillIsActive,
    isLocalObject,
    laserPointerIsActive,
    paintBucket,
    serializerToolbarState.floodFill,
    textIsActive,
    undoRedoDispatch,
    userId
  ]);
};
