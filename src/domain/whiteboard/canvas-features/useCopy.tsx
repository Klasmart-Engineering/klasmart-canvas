import { useEffect } from "react";
import { ICanvasKeyboardEvent } from "../../../interfaces/canvas-events/canvas-keyboard-event";
import { ICanvasObject } from "../../../interfaces/objects/canvas-object";
import { IPermissions } from "../../../interfaces/permissions/permissions";
import { v4 as uuidv4 } from 'uuid';
import store from '../redux/store';
import { IUndoRedoEvent } from "../../../interfaces/canvas-events/undo-redo-event";
import { TypedShape } from "../../../interfaces/shapes/shapes";
import { SET } from "../reducers/undo-redo";
import { CANVAS_OBJECT_PROPS } from "../../../config/undo-redo-values";
import { objectSerializerFormatter } from "../utils/objectSerializerFormatter";
import { ELEMENTS } from "../../../config/toolbar-element-names";
import { ICanvasBrush } from "../../../interfaces/brushes/canvas-brush";

/**
 * Handles copy past functionality
 * @param canvas 
 * @param userId 
 * @param permissions 
 * @param allToolbarIsEnabled 
 * @param undoRedoDispatch 
 * @param eventSerializer 
 * @param activeTool 
 */
export const useCopy = (
  canvas: fabric.Canvas,
  userId: string,
  allToolbarIsEnabled: boolean,
  undoRedoDispatch: any,
  eventSerializer: any,
  activeTool: string | null
) => {

  /**
   * 
   * @param permissions 
   * @param shape 
   */
  const checkPermission = (permissions: IPermissions, shape: ICanvasObject) => {
    if (shape.shapeType === 'shape') {
      return permissions.shape;
    }

    if (shape.type === 'path') {
      return permissions.pen;
    }

    if (shape.type === 'image') {
      return permissions.uploadImage;
    }

    if (shape.type === 'textbox') {
      return permissions.text;
    }
  }

  let copied: ICanvasObject | null = null;
  let target: ICanvasObject | null = null;
  let unevented: ICanvasObject[] = [];

  const keyDownHandler = (e: KeyboardEvent) => {
    const event = e as ICanvasKeyboardEvent;
    if (event.ctrlKey && event.key === 'c') {
      canvas?.getActiveObject()?.clone((cloned: ICanvasObject) => {
        cloned.set({
          id: `${userId}:${uuidv4()}`,
          top: 0,
          left: 0,
        });

        copied = cloned;
      }, CANVAS_OBJECT_PROPS);
    }

    if (event.ctrlKey && event.key === 'v' && copied) {
      let permissions = store.getState().permissionsState;
      let allowed = checkPermission(permissions, copied);

      if (allToolbarIsEnabled || allowed) {
        canvas?.add(copied);
        canvas?.renderAll();

        const payload = objectSerializerFormatter(copied, (copied as ICanvasBrush).basePath?.type as string, copied.id);
        const event = { event: payload, type: 'added' } as IUndoRedoEvent;

        undoRedoDispatch({
          type: SET,
          payload: (canvas?.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
          event,
        });

        eventSerializer?.push('added', payload);

        return;
      }
    }
  };

  const mouseDown = (e: fabric.IEvent) => {
    canvas.getObjects().forEach((o: ICanvasObject) => {
      if (!o.evented) {
        o.set({
          evented: true,
          lockMovementX: true,
          lockMovementY: true,
          lockScalingX: true,
          lockScalingY: true,
          lockRotation: true,
        });
        unevented.push(o);
      }
    });

    // @ts-ignore findTarget expects a point, not Event.
    target = canvas.findTarget(e.pointer, false);

    if (target) {
      canvas.setActiveObject(target);
      canvas.renderAll();
    }
  };

  const deactivateOther = () => {
    unevented.forEach((o: ICanvasObject) => {
      o.set({
        evented: false,
        lockMovementX: false,
        lockMovementY: false,
        lockScalingX: false,
        lockScalingY: false,
        lockRotation: false,
      });
    });

    unevented = [];
  };

  useEffect(() => {
    if (!canvas) return;

    if (activeTool === ELEMENTS.MOVE_OBJECTS_TOOL) {
      document.addEventListener('keydown', keyDownHandler, false);

      if (allToolbarIsEnabled) {
        canvas?.on('mouse:down:before', mouseDown);
      }
    }

    return () => {
      document.removeEventListener('keydown', keyDownHandler);

      if (allToolbarIsEnabled) {
        canvas?.off('mouse:down:before', mouseDown);
      }

      if (activeTool !== ELEMENTS.MOVE_OBJECTS_TOOL && unevented.length) {
        deactivateOther();
        canvas.discardActiveObject();
      }
    };
  }, [canvas, activeTool]);
};
