import { useEffect, useState } from "react";
import { ICanvasKeyboardEvent } from "../../../interfaces/canvas-events/canvas-keyboard-event";
import { ICanvasObject } from "../../../interfaces/objects/canvas-object";
import { IPermissions } from "../../../interfaces/permissions/permissions";
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import store from '../redux/store';
import { ICanvasBrush } from "../../../interfaces/brushes/canvas-brush";
import { ICanvasPathBrush } from "../../../interfaces/brushes/canvas-path-brush";
import { IUndoRedoEvent } from "../../../interfaces/canvas-events/undo-redo-event";
import { TypedShape } from "../../../interfaces/shapes/shapes";
import { ObjectEvent } from "../event-serializer/PaintEventSerializer";
import { SET } from "../reducers/undo-redo";
import { CANVAS_OBJECT_PROPS } from "../../../config/undo-redo-values";
import { requiredEllipseProps, requiredPencilDashedProps, requiredProps } from '../canvas-actions/shapeProps';
import { objectSerializerFormatter } from "../utils/objectSerializerFormatter";


export const useCopy = (
  canvas: fabric.Canvas,
  userId: string,
  permissions: IPermissions,
  allToolbarIsEnabled: boolean,
  undoRedoDispatch: any,
  eventSerializer: any,
) => {

  const isShape = (type: string) => (
    type === 'shape'
  )

  let copied: any = null;

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

      if (allToolbarIsEnabled) {
        canvas?.add(copied);
        canvas?.renderAll();

        const payload = objectSerializerFormatter(copied, copied.basePath?.type, copied.id);
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

  useEffect(() => {
    if (!canvas) return;
    document.addEventListener('keydown', keyDownHandler, false);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [canvas]);
};