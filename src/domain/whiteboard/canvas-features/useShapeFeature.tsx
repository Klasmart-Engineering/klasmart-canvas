import { useCallback, useContext, useEffect } from 'react';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import { isEmptyShape } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles the logic for shape creation
 * @param {fabric.Canvas} canvas - Canvas to add the shape
 * @param {string} userId - User that will create the shape
 * @param {ICanvasActions} actions - Shared functions necessaries
 * to work shape creation logic
 * @param {(specific: string, color?: string) => void} mouseDown - Mouse Event
 */
export const useShapeFeature = (
  canvas: fabric.Canvas,
  userId: string,
  actions: ICanvasActions,
  mouseDown: (specific: string, color?: string) => void
) => {
  const {
    shapeIsActive,
    allToolbarIsEnabled,
    toolbarIsEnabled,
    serializerToolbarState,
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

  const isLocalShape = (shape: TypedShape) => {
    return shape.id && isEmptyShape(shape) && isLocalObject(shape.id, userId);
  };

  const activeShapeCanBePerfectSized = () => {
    return (
      perfectShapeIsActive &&
      canvas.getActiveObject() &&
      isEmptyShape(canvas.getActiveObject())
    );
  };

  const getPermissions = useCallback(() => {
    return {
      teacherHasPermission:
        allToolbarIsEnabled && shape && shapeIsActive && toolbarIsEnabled,
      studentHasPermission:
        shape &&
        shapeIsActive &&
        toolbarIsEnabled &&
        serializerToolbarState.shape,
    };
  }, [
    allToolbarIsEnabled,
    serializerToolbarState.shape,
    shape,
    shapeIsActive,
    toolbarIsEnabled,
  ]);

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

      if (!laserIsActive) {
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
    toolbarIsEnabled,
    allToolbarIsEnabled,
    serializerToolbarState.shape,
    getPermissions,
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

        canvas.trigger('object:scaled', {
          target: shapeToFix,
        });
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
