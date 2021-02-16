import { useEffect, useState } from "react";
import { ICanvasKeyboardEvent } from "../../../interfaces/canvas-events/canvas-keyboard-event";
import { ICanvasObject } from "../../../interfaces/objects/canvas-object";
import { IPermissions } from "../../../interfaces/permissions/permissions";
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';


export const useCopy = (
  canvas: fabric.Canvas,
  userId: string,
  permissions: IPermissions,
  // copied: any,
  // setCopied: (item: any) => void,
) => {
  const [copied, setCopied] = useState<any>(null);
  debugger;
  const keyDownHandler = (e: KeyboardEvent) => {
    const event = e as ICanvasKeyboardEvent;
    if (event.ctrlKey && event.key === 'c' && setCopied) {
      canvas?.getActiveObject()?.clone((cloned: ICanvasObject) => {
        cloned.set({
          id: `${userId}:${uuidv4()}`,
          top: 0,
          left: 0,
        });

        // canvas.add(cloned);
        // canvas.renderAll();
        setCopied(cloned);
        console.log(copied, cloned);
      });
    }

    if (event.ctrlKey && event.key === 'v') {
      // canvas?.add(copied);
      // canvas?.renderAll();
      console.log(copied);
      debugger;
    }
  }

  useEffect(() => {
    if (!canvas) return;
    document.addEventListener('keydown', keyDownHandler, false);
    console.log('COPIED: ', copied);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [copied]);
};