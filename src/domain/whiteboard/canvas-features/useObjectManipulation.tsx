import { Textbox } from 'fabric/fabric-impl';
import { useContext, useEffect } from 'react';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import { isText } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';

export const useObjectManipulation = (
  canvas: fabric.Canvas,
  userId: string,
  actions: ICanvasActions,
  pointerEvents: boolean
) => {
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

  /** Update objects selectable/evented state. */
  useEffect(() => {
    if (!canvas) return;

    const teacherHasPermission = allToolbarIsEnabled && shapesAreSelectable;
    const studentHasPermission =
      serializerToolbarState.move && shapesAreSelectable;
    const isEvented =
      (shapesAreSelectable || shapesAreEvented) &&
      (allToolbarIsEnabled || serializerToolbarState.move);

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
  ]);

  /**
   * Set the objects like evented if you select pointer or move tool
   */
  useEffect(() => {
    const teacherHasPermission = allToolbarIsEnabled && eventedObjects;
    const studentHasPermission = serializerToolbarState.move && eventedObjects;
    if (teacherHasPermission || studentHasPermission) {
      canvas?.forEachObject((object: ICanvasObject) => {
        if (object.id && isLocalObject(object.id, userId)) {
          object.set({
            evented: allToolbarIsEnabled || serializerToolbarState.move,
            selectable: allToolbarIsEnabled || serializerToolbarState.move,
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
  ]);

  /**
   * Manage the states for settting local objects like selectable/modifiable
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

        if (object.id && isLocalObject(object.id, userId)) {
          actions.setObjectControlsVisibility(
            object,
            eventedObjects || (isTextObject && textIsActive)
          );
          (object as Textbox).set({
            evented: eventedObjects || (isTextObject && textIsActive),
            selectable: eventedObjects || (isTextObject && textIsActive),
            hasBorders: eventedObjects || (isTextObject && textIsActive),
            editable: isTextObject && textIsActive,
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
   * Makes local objects unselectable when toolbar is disabled by the teacher.
   * */
  useEffect(() => {
    const studentHasPermission =
      toolbarIsEnabled &&
      (serializerToolbarState.move || serializerToolbarState.erase);
    canvas?.forEachObject((object: ICanvasObject) => {
      if (
        object.id &&
        isLocalObject(object.id, userId) &&
        shapesAreSelectable
      ) {
        object.set({
          evented: allToolbarIsEnabled || studentHasPermission,
          selectable: allToolbarIsEnabled || studentHasPermission,
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
  ]);
};
