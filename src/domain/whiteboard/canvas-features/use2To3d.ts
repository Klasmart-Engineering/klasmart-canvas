import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { WhiteboardContext } from '../WhiteboardContext';
import { is3DShape } from '../utils/shapes';

/**
 * Handles logic for exporting a the 2d image representation of the 3d shape
 * to a json object in context that will be used to import it in a 3d canvas.
 * @param {fabric.Canvas} canvas - Canvas to draw
 */
export const use2To3d = (canvas: fabric.Canvas) => {
  /**
   * Getting necessary context variables
   */
  const {
    is3dActive,
    set3dActive,
    set3dJson,
    new3dImage,
    setRedrawing3d,
    setEditing3d,
    set3dCanvasPosition,
    set3dSelected,
    is3dSelected,
  } = useContext(WhiteboardContext);

  /**
   * Get the threeObject attribute from the Canvas Object and save it in context state.
   * @param canvasObject
   */
  const to3D = (canvasObject: ICanvasObject) => {
    try {
      const three = JSON.parse(
        (canvasObject as ICanvasObject).threeObject as string
      );
      three.canvasPosition = { left: canvasObject.left, top: canvasObject.top };
      set3dCanvasPosition(three.canvasPosition);
      const width = (canvasObject.width ?? 1) * (canvasObject.scaleX ?? 1);
      const height = (canvasObject.height ?? 1) * (canvasObject.scaleY ?? 1);
      three.canvasSize = { width, height };
      const threeObjectString = JSON.stringify(three);

      canvas.remove(canvasObject);
      set3dJson(threeObjectString);
    } catch (error) {
      console.log(canvasObject);
      console.warn(error);
    }
  };

  /**
   * Check if has clicked some fabric canvas object related to a 3d shape
   * @param {fabric.Ievent} e - fabric event
   */
  const checkIfHasClickedSome3dObject = (e: fabric.IEvent) => {
    if (!e.pointer) return;
    const { pointer } = e;

    const canvasObjects = canvas.getObjects();
    const canvasObject = canvasObjects.find((obj) =>
      obj.containsPoint(pointer)
    );
    if (
      canvasObject &&
      typeof canvasObject !== 'undefined' &&
      is3DShape(canvasObject)
    ) {
      return canvasObject;
    }
    return false;
  };

  /**
   * Handle mouse down event. If Canvas Object with 3d representation,
   * 3d translation will be executed and context state, updated.
   * @param e
   */
  const onMouseDown = function (e: fabric.IEvent) {
    const canvasObject = checkIfHasClickedSome3dObject(e);
    if (canvasObject) {
      to3D(canvasObject);
      setEditing3d(true);
      set3dActive(true);
    }
  };

  /**
   * Handle mouse down for clearing 3d selection and active context state
   * @param e fabric.IEvent
   */
  const selectionClear = (e: fabric.IEvent) => {
    if (!e.target) {
      if (is3dSelected) set3dSelected(false);
      if (is3dActive) set3dActive(false);
    }
  };

  /**
   * Handle Selection Creation to update the context state
   * for multiple 3d objects redraw after group behavior.
   * @param {fabric.IEvent} e
   */
  const onSelectionCreate = (e: fabric.IEvent) => {
    const selection = e.target as ICanvasObject;
    let isAll3d = true;
    if (selection._objects) {
      for (let obj of selection._objects) {
        if (!is3DShape(obj)) isAll3d = false;
      }
    } else {
      if (!is3DShape(selection)) isAll3d = false;
    }
    if (isAll3d) set3dSelected(true);
    else set3dSelected(false);
  };

  /**
   * Handle Move and Scale object event, updates context state to redraw 3d object.
   * @param  {fabric.IEvent} e
   */
  const redraw = (e: fabric.IEvent) => {
    const canvasObject = e.target as ICanvasObject;
    if (is3DShape(canvasObject)) {
      to3D(canvasObject);
      setRedrawing3d(true);
      set3dActive(true);
    }
  };

  /**
   * Hook to react on canvas mouse down when 3dActive context state is updated.
   */
  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:down', onMouseDown);
    }

    return () => {
      canvas?.off('mouse:down', onMouseDown);
    };
  }, [is3dActive, canvas]);

  /**
   * Hook to react on object scaled, moved or creation created.
   */
  useEffect(() => {
    if (!canvas) return;

    canvas.on('object:scaled', redraw);
    canvas.on('object:moved', redraw);
    canvas.on('selection:created', onSelectionCreate);

    return () => {
      canvas?.off('object:scaled', redraw);
      canvas?.off('object:moved', redraw);
      canvas?.off('selection:created', onSelectionCreate);
    };
  }, [new3dImage, canvas]);

  /**
   * Hook to react on canvas mouse down in order to update the 3d active context state.
   */
  useEffect(() => {
    if (!canvas) return;

    canvas.on('mouse:down', selectionClear);

    return () => {
      canvas?.off('mouse:down', selectionClear);
    };
  });
};
