import { useEffect } from "react";
import { fabric } from 'fabric';
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
import shape from "@material-ui/core/styles/shape";
import { ObjectEvent } from "../event-serializer/PaintEventSerializer";

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

  const copyGroup = (clipboard: fabric.Group, permissions: IPermissions): Promise<string[]> => (new Promise((resolve) => {
    let ids: string[] = [];
    clipboard.forEachObject((obj: ICanvasObject) => {
      const allowed = checkPermission(permissions, obj);

      if (allowed || allToolbarIsEnabled) {
        const id = `${userId}:${uuidv4()}`;
        obj.set({
          active: true,
          id,
        });
        ids.push(id);
        canvas.add(obj)
      };
    });

    resolve(ids);
  }));

  let copied: ICanvasObject | null = null;
  let target: ICanvasObject | null = null;
  let unevented: ICanvasObject[] = [];
  let clipboard: fabric.Group;

  const keyDownHandler = async (e: KeyboardEvent) => {
    const event = e as ICanvasKeyboardEvent;
    if (event.ctrlKey && event.key === 'c') {
      if((canvas.getActiveObject() as fabric.Group)?._objects?.length) {
        canvas.getActiveObject().clone((cloneGroup: fabric.Group) => {
        	clipboard = cloneGroup;
        }, CANVAS_OBJECT_PROPS);
      } else {
        canvas?.getActiveObject()?.clone((cloned: ICanvasObject) => {
          cloned.set({
            top: 0,
            left: 0,
            id: `${userId}:${uuidv4()}`
          });

          copied = cloned;
        }, CANVAS_OBJECT_PROPS);
      }
    }

    let permissions = store.getState().permissionsState;

    if (event.ctrlKey && event.key === 'v' && copied) {
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
    } else if (event.ctrlKey && event.key === 'v' && clipboard) {
      clipboard.set({
        left: 0,
        top: 0,
        evented: true
      });

      let ids = await copyGroup(clipboard, permissions);
      clipboard.destroy();
      canvas.discardActiveObject();

      let objects = canvas.getObjects().filter((o: ICanvasObject) => (
        ids.indexOf(o.id as string) !== -1
      ));

      let payloads: ObjectEvent [] = [];

      objects.forEach((copied: ICanvasObject) => {
        const payload = objectSerializerFormatter(copied, (copied as ICanvasBrush).basePath?.type as string, copied.id, true);
        payloads.push(payload as ObjectEvent);
        eventSerializer?.push('added', payload);
      });

      const event = { event: payloads, type: 'added' };

      undoRedoDispatch({
        type: SET,
        payload: (canvas?.getObjects() as unknown) as TypedShape[],
        canvasId: userId,
        event,
      });

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
