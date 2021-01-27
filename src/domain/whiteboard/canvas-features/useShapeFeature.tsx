import { useCallback, useContext, useEffect } from 'react';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET } from '../reducers/undo-redo';
import { getToolbarIsEnabled } from '../redux/utils';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { isEmptyShape } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles the logic for shape creation
 * @param {fabric.Canvas} canvas - Canvas to add the shape
 * @param {string} userId - User that will create the shape
 * @param {ICanvasActions} actions - Shared functions necessaries
 * to work shape creation logic
 * @param {(specific: string, color?: string) => void} mouseDown - Mouse Event
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher
 * to save shapes states and could make und/redo over them
 */
export const useShapeFeature = (
  canvas: fabric.Canvas,
  userId: string,
  actions: ICanvasActions,
  mouseDown: (specific: string, color?: string) => void,
  undoRedoDispatch: (action: CanvasAction) => void,
  serializerToolbarState: IPermissions
) => {
  // Getting context variables
  const {
    shapeIsActive,
    brushIsActive,
    allToolbarIsEnabled,
    isLocalObject,
    textIsActive,
    floodFillIsActive,
    shapesAreEvented,
    eraseType,
    laserIsActive,
    shape,
    shapeColor,
    perfectShapeIsActive,
    perfectShapeIsAvailable,
    updatePerfectShapeIsActive,
  } = useContext(WhiteboardContext);

  // Getting event serializer to synchronize objects
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  /**
   * Multiplies the width by scaleX of the given shape
   * to obtain the real current width
   * @param {TypedShape} shape - Shape to calculate its real width
   */
  const getShapeRealWidth = (shape: TypedShape) => {
    return Number(shape.width) * Number(shape.scaleX);
  };

  /**
   * Multiplies the height by scaleY of the given shape
   * to obtain the real current height
   * @param {TypedShape} shape - Shape to calculate its real height
   */
  const getShapeRealHeight = (shape: TypedShape) => {
    return Number(shape.height) * Number(shape.scaleY);
  };

  /**
   * Checks if the given object is a local shape
   * @param {TypedShape} shape - Object to check
   */
  const isLocalShape = useCallback(
    (shape: TypedShape) => {
      return shape.id && isEmptyShape(shape) && isLocalObject(shape.id, userId);
    },
    [isLocalObject, userId]
  );

  /**
   * Checks if is possible resize the active object perfectly
   */
  const activeShapeCanBePerfectSized = useCallback(() => {
    return (
      perfectShapeIsActive &&
      canvas.getActiveObject() &&
      isEmptyShape(canvas.getActiveObject())
    );
  }, [canvas, perfectShapeIsActive]);

  /**
   * Get the permissions for students and teacher to use shape feature.
   */
  const getPermissions = useCallback(() => {
    const toolbarIsEnabled = getToolbarIsEnabled();
    return {
      teacherHasPermission:
        allToolbarIsEnabled && shape && shapeIsActive,
      studentHasPermission:
        shape &&
        shapeIsActive &&
        toolbarIsEnabled &&
        serializerToolbarState.shape,
    };
  }, [
    allToolbarIsEnabled,
    shape,
    shapeIsActive,
    serializerToolbarState,
  ]);

  /**
   * Synchronizes and dispatches undo/redo for pperfect shape scaling
   */
  const syncAndDispatchPerfectShapeScaling = useCallback(
    (shape: TypedShape) => {
      const id = String(shape.id);
      const type = shape.get('type') as ObjectType;
      const target = {
        top: shape.top,
        left: shape.left,
        angle: shape.angle,
        scaleX: shape.scaleX,
        scaleY: shape.scaleY,
        flipX: shape.flipX,
        flipY: shape.flipY,
        originX: shape.originX,
        originY: shape.originY,
      } as ICanvasObject;

      const payload: ObjectEvent = {
        id,
        type,
        target: { eTarget: target, isGroup: false },
      };

      eventSerializer.push('scaled', payload);

      if (canvas) {
        const event = { event: payload, type: 'scaled' };

        undoRedoDispatch({
          type: SET,
          payload: canvas.getObjects(),
          canvasId: userId,
          event: (event as unknown) as IUndoRedoEvent,
        });
      }
    },
    [canvas, eventSerializer, undoRedoDispatch, userId]
  );

  /**
   * Disables canvas mouse events when shape is inactive.
   */
  useEffect(() => {
    if (!shapeIsActive && canvas) {
      canvas.off('mouse:move');
      canvas.off('mouse:up');
    }
  }, [shapeIsActive, canvas]);

  /**
   * Sets local objects like no evented and no selectable
   * to could draw shapes over whiteboard
   */
  useEffect(() => {
    const { teacherHasPermission, studentHasPermission } = getPermissions();

    if (teacherHasPermission || studentHasPermission) {
      canvas?.forEachObject((object: ICanvasObject) => {
        if (object.id && isLocalObject(object.id, userId)) {
          object.set({
            evented: false,
            selectable: false,
          });
        }
      });

      actions.addShape(shape);
    }

    return () => {
      if (!textIsActive && !floodFillIsActive && !shapesAreEvented) {
        canvas?.off('mouse:down');
      }

      if (eraseType !== 'object') {
        canvas?.off('mouse:up');
      }

      if (!laserIsActive && !brushIsActive) {
        canvas?.off('mouse:move');
      }
    };
  }, [
    canvas,
    shape,
    shapeIsActive,
    actions,
    textIsActive,
    userId,
    floodFillIsActive,
    eraseType,
    shapesAreEvented,
    isLocalObject,
    laserIsActive,
    allToolbarIsEnabled,
    serializerToolbarState.shape,
    getPermissions,
    brushIsActive,
  ]);

  /**
   * Starts shape creation when a shape is selected in Toolbar
   */
  useEffect(() => {
    if (shape && shapeIsActive) {
      mouseDown(shape, shapeColor);
    }

    return () => {
      if (!textIsActive) {
        canvas?.off('mouse:down');
      }

      canvas?.off('mouse:move');
      canvas?.off('mouse:up');
    };
  }, [canvas, shape, shapeIsActive, mouseDown, shapeColor, textIsActive]);

  /**
   * Set a selected shape like perfect if perfectShapeIsActive
   */
  useEffect(() => {
    if (!canvas) return;

    /*
      Hide/Show resize middle controls in local shapes.
      When perfectShapeIsActive controls will be hidden
      and when not will be showed
    */
    canvas.forEachObject((object: ICanvasObject) => {
      if (isLocalShape(object as TypedShape)) {
        object.set('lockUniScaling', perfectShapeIsActive);
      }
    });

    // Resets active shape like perfect
    if (activeShapeCanBePerfectSized()) {
      let scaling;
      const shapeToFix = canvas.getActiveObject();
      const width = getShapeRealWidth(shapeToFix);
      const heigth = getShapeRealHeight(shapeToFix);

      if (width > heigth) {
        scaling = { scaleY: width / Number(shapeToFix.height) };
      } else if (heigth > width) {
        scaling = { scaleX: heigth / Number(shapeToFix.width) };
      }

      if (scaling) {
        shapeToFix.set(scaling);
        syncAndDispatchPerfectShapeScaling(shapeToFix);
      }

      shapeToFix.setCoords();
    }

    /* If isLocalObject is added on dependencies
    an unexpected event is triggered */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, perfectShapeIsActive, userId]);

  /**
   * Reset perfectShapeIsActive to false when the shape
   * or move tool permissions are revoked
   */
  useEffect(() => {
    if (!perfectShapeIsAvailable()) {
      updatePerfectShapeIsActive(false);
    }
  }, [perfectShapeIsAvailable, updatePerfectShapeIsActive]);
};
