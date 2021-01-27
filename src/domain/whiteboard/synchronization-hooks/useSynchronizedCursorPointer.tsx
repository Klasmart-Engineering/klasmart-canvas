import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';
import arrowPointer from '../../../assets/cursors/arrow-pointer.png';
import handPointer from '../../../assets/cursors/hand-pointer.png';
import crosshairPointer from '../../../assets/cursors/crosshair-pointer.png';
import { IPointerType } from '../../../interfaces/pointers/pointer-type';

interface IPointerTarget {
  top: number;
  left: number;
  pointer: IPointerType;
}

/**
 * Handles Cursor Pointer Events
 * @param {fabric.Canvas | undefined} canvas - Current Canvas
 * @param {string} userId - Usewr that send the event
 * @param {(id: string) => boolean} shouldHandleRemoteEvent - Checks if
 * an event should be handled
 */
const useSynchronizedCursorPointer = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const { pointerEvents, pointer } = useContext(WhiteboardContext);

  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const id = `${userId}:cursor`;

    /**
     * Handles moving event for cursor pointer. Emits event to other users.
     * @param {CanvasEvent} event - Canvas event.
     */
    const move = (event: CanvasEvent) => {
      const top = (event.pointer as fabric.Point).y;
      const left = (event.pointer as fabric.Point).x;

      const payload: ObjectEvent = {
        type: 'cursorPointer',
        target: { top, left, pointer } as ICanvasObject,
        id,
      };

      eventSerializer.push('cursorPointer', payload);
    };

    if (!pointerEvents) {
      canvas?.on('mouse:move', move);
    }

    return () => {
      canvas?.off('mouse:move', move);
    };
  }, [canvas, eventSerializer, pointer, pointerEvents, userId]);

  useEffect(() => {
    /**
     * Handles moving event for cursor pointer. Receives event.
     * @param {string} id - User ID.
     * Used for know who's send the event.
     * @param {IPointerTarget} target - Properites for laser pointer.
     */
    const moved = async (id: string, target: IPointerTarget) => {
      if (!shouldHandleRemoteEvent(id)) return;

      const { top, left, pointer } = target;
      const pointerImage = canvas
        ?.getObjects()
        .find((object: ICanvasObject) => {
          return object.id === id;
        }) as ICanvasObject;

      // Removing current cursor
      if (pointer === 'none' && pointerImage) {
        canvas?.remove(pointerImage);
        canvas?.renderAll();
      }

      /*
        If a pointer change occurs,
        current pointer will be removed to create the new one
      */
      if (pointerImage?.pointer !== pointer) {
        canvas?.remove(pointerImage);
        canvas?.renderAll();
      }

      /*
        If the cursor already exists, just will be moved;
        if not, will be created
      */
      if (pointerImage) {
        pointerImage.set({ top, left });
        canvas?.renderAll();
      } else {
        await createCursor(id, top, left, pointer);
      }
    };

    /**
     * Creates an image of the current cursor to be rendered in remote canvases
     * @param {string} id - Id to set in the image
     * @param {number} top - Vertical position for the image
     * @param {number} left - Horizontal position for the image
     * @param {IPointerType} pointer - Cursor pointer to render
     */
    const createCursor = async (
      id: string,
      top: number,
      left: number,
      pointer: IPointerType
    ) => {
      let imagePath = '';

      switch (pointer) {
        case 'arrow':
          imagePath = arrowPointer;
          break;

        case 'hand':
          imagePath = handPointer;
          break;

        case 'crosshair':
          imagePath = crosshairPointer;
          break;
      }

      return new Promise<void>((resolve) => {
        fabric.Image.fromURL(imagePath, function (img) {
          // Setting image's position
          const objectImage: ICanvasObject = img.set({
            left,
            top,
          });

          // Finding for an existing object with the same id
          const existentPointer = canvas
            ?.getObjects()
            .find((object: ICanvasObject) => {
              return object.id === id;
            });

          // If another object exists it will be removed
          if (existentPointer) {
            canvas?.remove(existentPointer);
            canvas?.renderAll();
          }

          // Adding cursor on remote canvases
          objectImage.set({ id, pointer });
          canvas?.add(objectImage);

          resolve();
        });
      });
    };

    eventController?.on('cursorPointer', moved);

    return () => {
      eventController?.removeListener('cursorPointer', moved);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent, userId]);
};

export default useSynchronizedCursorPointer;
