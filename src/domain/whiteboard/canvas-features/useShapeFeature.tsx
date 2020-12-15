import { useContext, useEffect } from 'react';
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
   * Disables canvas mouse events when shape is inactive.
   */
  useEffect(() => {
    if (!shapeIsActive && canvas) {
      canvas.off('mouse:move');
      canvas.off('mouse:up');
    }
  }, [shapeIsActive, canvas]);

  /**
   * Activates the mouseDown event if shape exists and shapeIsActive is true
   * Handles logic to add shape to whiteboard
   */
  useEffect(() => {
    const teacherHasPermission =
      allToolbarIsEnabled && shape && shapeIsActive && toolbarIsEnabled;
    const studentHasPermission =
      shape &&
      shapeIsActive &&
      toolbarIsEnabled &&
      serializerToolbarState.shape;
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
  ]);

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

    canvas?.forEachObject((object: ICanvasObject) => {
      if (
        isEmptyShape(object as TypedShape) &&
        object.id &&
        isLocalObject(object.id, userId)
      ) {
        object.set('lockUniScaling', perfectShapeIsActive);
      }
    });

    if (
      canvas?.getActiveObject() &&
      perfectShapeIsActive &&
      isEmptyShape(canvas.getActiveObject())
    ) {
      const shapeToFix = canvas.getActiveObject();
      if (getShapeRealWidth(shapeToFix) > getShapeRealHeight(shapeToFix)) {
        shapeToFix.set(
          'scaleY',
          getShapeRealWidth(shapeToFix) / Number(shapeToFix.height)
        );

        canvas.trigger('object:scaled', {
          target: shapeToFix,
        });
      } else if (
        getShapeRealHeight(shapeToFix) > getShapeRealWidth(shapeToFix)
      ) {
        shapeToFix.set(
          'scaleX',
          getShapeRealHeight(shapeToFix) / Number(shapeToFix.width)
        );

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
