import { useCallback } from "react";
import { ICanvasBrush } from "../../../interfaces/brushes/canvas-brush";
import { ICanvasMouseEvent } from "../../../interfaces/canvas-events/canvas-mouse-event";
import { ICanvasObject } from "../../../interfaces/objects/canvas-object";
import { isLocalObject } from "../utils/findLocalObjects";
import eraseObjectCursor from '../../../assets/cursors/erase-object.png';

/**
 * Creates the listeners to erase objects from the whiteboard
 * @param canvas fabric canvas
 * @param userId user id
 * @param canvasId canvas id
 */
export const useEraseObject = (
  canvas: fabric.Canvas,
  userId: string,
  canvasId: string,
  eraserIsActive: boolean
) => (
  useCallback(() => {
    let eraser: boolean = false;
    let activeObjects = canvas?.getActiveObjects();

    canvas?.getObjects().forEach((object: ICanvasObject) => {
      if (
        (object.id && isLocalObject(object.id, userId as string)) ||
        !object.id
      ) {
        object.set({
          evented: true,
          hoverCursor: `url("${eraseObjectCursor}"), auto`,
          lockMovementX: true,
          lockMovementY: true,
        });
      } else if (object.id) {
        object.set({
          hoverCursor: 'default',
        });
      }
    });

    if (activeObjects?.length && activeObjects.length > 1) {
      canvas?.getActiveObject().set({
        hoverCursor: `url("${eraseObjectCursor}"), auto`,
      });
    }

    const mouseDown = (e: ICanvasMouseEvent) => {
      if (eraser) {
        return;
      }

      if(!eraserIsActive){
        canvas.defaultCursor = 'default';
        return
      } 

      canvas.defaultCursor = `url("${eraseObjectCursor}"), auto`;
      eraser = true;

      // if the click is made over an object
      if (
      e.target &&
      (!e.target._objects ||
        (e.target._objects && (e.target as ICanvasBrush).basePath)) &&
      ((e.target.id && isLocalObject(e.target.id, userId as string)) ||
        !e.target.id)
      ) {
        canvas.remove(e.target);
        canvas.renderAll();
      }

      // if the click is made over an object group
      if (e.target?._objects) {
        e.target._objects.forEach(function (object: fabric.Object) {
          canvas.remove(object);
        });

        canvas.discardActiveObject();
        canvas.renderAll();
      }
    };

    const mouseOver = (e: ICanvasMouseEvent) => {
      if (!eraser) {
        return false;
      }

      if (
        (e.target &&
          e.target.id &&
          isLocalObject(e.target.id, userId as string)) ||
        (e.target && !e.target.id)
      ) {
        canvas.remove(e.target);
        canvas.renderAll();
      }
    }

    const mouseUp = () => {
      if (!eraser) {
        return false;
      }

      canvas.defaultCursor = 'default';
      eraser = false;
    };

    // When mouse down eraser is able to remove objects
    canvas?.on('mouse:down', mouseDown);

    // When mouse is over an object
    canvas?.on('mouse:over', mouseOver);

    // When mouse up eraser is unable to remove objects
    canvas?.on('mouse:up', mouseUp);
    // If isLocalObject is added in dependencies an infinity loop happens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, canvasId, userId, eraserIsActive])
);
