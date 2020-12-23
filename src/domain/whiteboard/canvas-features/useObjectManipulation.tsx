import { Textbox } from 'fabric/fabric-impl';
import { useCallback, useContext, useEffect } from 'react';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import { isText } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles the logic for set/unset objects selectable/eventable
 * depending of the circunstances
 * @param {fabric.Canvas} canvas - Canvas in which the objects are.
 * @param {string} userId - User that is making changes in whiteboard.
 * @param {ICanvasActions} actions - Shared functions that this file needs.
 * @param {boolean} pointerEvents - Flag to know if
 * pointerEvents are active or not
 */
export const useObjectManipulation = (
  canvas: fabric.Canvas,
  userId: string,
  actions: ICanvasActions,
  pointerEvents: boolean
) => {
  // Getting context variables
  const {
    allToolbarIsEnabled,
    shapesAreSelectable,
    shapesAreEvented,
    serializerToolbarState,
    eraseType,
    isLocalObject,
    eventedObjects,
    brushIsActive,
    lineWidthIsActive,
    shapeIsActive,
    textIsActive,
    toolbarIsEnabled,
  } = useContext(WhiteboardContext);

  /**
   * Gets permissions for objects in Objects UseEffect
   */
  const getObjectPermissions = useCallback(() => {
    return {
      teacherHasPermission: allToolbarIsEnabled && shapesAreSelectable,
      studentHasPermission: serializerToolbarState.move && shapesAreSelectable,
      isEvented:
        (shapesAreSelectable || shapesAreEvented) &&
        (allToolbarIsEnabled || serializerToolbarState.move),
    };
  }, [
    allToolbarIsEnabled,
    serializerToolbarState.move,
    shapesAreEvented,
    shapesAreSelectable,
  ]);

  /**
   * Gets permissions for objects in PointerMove UseEffect
   */
  const getPointerMoveToolPermissions = useCallback(() => {
    return {
      teacherHasPermission: allToolbarIsEnabled && eventedObjects,
      studentHasPermission: serializerToolbarState.move && eventedObjects,
      isEvented: allToolbarIsEnabled || serializerToolbarState.move,
    };
  }, [allToolbarIsEnabled, eventedObjects, serializerToolbarState.move]);

  /**
   * Gets permissions for local objects in LocalObjects UseEffect
   */
  const getLocalObjectPermissions = useCallback(() => {
    const studentHasPermission =
      toolbarIsEnabled &&
      (serializerToolbarState.move || serializerToolbarState.erase);

    return {
      isEvented: allToolbarIsEnabled || studentHasPermission,
    };
  }, [
    allToolbarIsEnabled,
    serializerToolbarState.erase,
    serializerToolbarState.move,
    toolbarIsEnabled,
  ]);

  /**
   * Objects UseEffect.
   * Update objects selectable/evented state.
   */
  useEffect(() => {
    if (!canvas) return;

    const {
      teacherHasPermission,
      studentHasPermission,
      isEvented,
    } = getObjectPermissions();

    canvas.forEachObject((object: ICanvasObject) => {
      if (object.id && isLocalObject(object.id, userId) && !eraseType) {
        object.set({
          selectable: teacherHasPermission || studentHasPermission,
          evented: isEvented,
          lockMovementX: !shapesAreSelectable,
          lockMovementY: !shapesAreSelectable,
          hoverCursor: shapesAreSelectable ? 'move' : 'default',
        });
      }
    });

    canvas.selection = shapesAreSelectable;
    canvas.renderAll();
  }, [
    canvas,
    eraseType,
    isLocalObject,
    shapesAreEvented,
    shapesAreSelectable,
    userId,
    allToolbarIsEnabled,
    serializerToolbarState.move,
    getObjectPermissions,
  ]);

  /**
   * PointerMove UseEffect.
   * Set the objects like evented if you select pointer or move tool.
   */
  useEffect(() => {
    const {
      teacherHasPermission,
      studentHasPermission,
      isEvented,
    } = getPointerMoveToolPermissions();

    if (teacherHasPermission || studentHasPermission) {
      canvas?.forEachObject((object: ICanvasObject) => {
        if (object.id && isLocalObject(object.id, userId)) {
          object.set({
            evented: isEvented,
            selectable: isEvented,
            lockMovementX: false,
            lockMovementY: false,
          });
        }
      });

      actions.setHoverCursorObjects('move');
    }
  }, [
    actions,
    canvas,
    eventedObjects,
    isLocalObject,
    userId,
    allToolbarIsEnabled,
    serializerToolbarState.move,
    getPointerMoveToolPermissions,
  ]);

  /**
   * Manage the states for setting local objects like selectable/modifiable.
   */
  useEffect(() => {
    if (
      canvas &&
      !eraseType &&
      !brushIsActive &&
      !lineWidthIsActive &&
      !shapeIsActive
    ) {
      canvas.forEachObject((object: ICanvasObject) => {
        const isTextObject = Boolean(isText(object));
        const isEvented = eventedObjects || (isTextObject && textIsActive);
        const isEditable = isTextObject && textIsActive;

        if (object.id && isLocalObject(object.id, userId)) {
          actions.setObjectControlsVisibility(object, isEvented);
          (object as Textbox).set({
            evented: isEvented,
            selectable: isEvented,
            hasBorders: isEvented,
            editable: isEditable,
            lockMovementX: !eventedObjects,
            lockMovementY: !eventedObjects,
            hasRotatingPoint: eventedObjects,
          });
        }
      });
    }
  }, [
    actions,
    brushIsActive,
    canvas,
    eraseType,
    eventedObjects,
    isLocalObject,
    lineWidthIsActive,
    shapeIsActive,
    textIsActive,
    userId,
  ]);

  /**
   * If pointerEvents changes to false, all the selected objects
   * will be unselected
   */
  useEffect(() => {
    if (!pointerEvents && canvas) {
      canvas.discardActiveObject().renderAll();
    }
  }, [pointerEvents, canvas]);

  /**
   * LocalObjects UseEffect.
   * Makes local objects unselectable when toolbar is disabled by the teacher.
   * */
  useEffect(() => {
    const { isEvented } = getLocalObjectPermissions();

    canvas?.forEachObject((object: ICanvasObject) => {
      if (
        object.id &&
        isLocalObject(object.id, userId) &&
        shapesAreSelectable
      ) {
        object.set({
          evented: isEvented,
          selectable: isEvented,
        });
      }
    });
  }, [
    canvas,
    toolbarIsEnabled,
    isLocalObject,
    userId,
    allToolbarIsEnabled,
    serializerToolbarState.move,
    serializerToolbarState.erase,
    shapesAreSelectable,
    getLocalObjectPermissions,
  ]);
};
