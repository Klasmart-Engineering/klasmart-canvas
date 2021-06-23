import { useCallback, useContext, useEffect } from 'react';
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
  cursorPointer: IPointerType;
}

/**
 * Handles Cursor Pointer Events
 * @param {fabric.Canvas | undefined} canvas - Current Canvas
 * @param {string} userId - User that send the event
 * @param {(id: string) => boolean} shouldHandleRemoteEvent - Checks if
 * an event should be handled
 */
const useSynchronizedCursorPointer = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const { pointerEvents, pointer, findObjectById } = useContext(
    WhiteboardContext
  );

  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /**
   * Creates an image of the current cursor to be rendered in remote canvases
   * @param {string} id - Id to set in the image
   * @param {number} top - Vertical position for the image
   * @param {number} left - Horizontal position for the image
   * @param {IPointerType} cursorPointer - Cursor pointer to render
   */
  const createCursor = useCallback(
    async (
      id: string,
      top: number,
      left: number,
      cursorPointer: IPointerType
    ) => {
      let imagePath = getImagePath(cursorPointer);

      return new Promise<void>((resolve) => {
        fabric.Image.fromURL(imagePath as string, function (img) {
          // Setting image's position
          const objectImage: ICanvasObject = img.set({
            left,
            top,
            evented: false,
            selectable: false,
          });

          // Finding for an existing object with the same id
          const existentPointer = findObjectById(id);

          // If another object exists it will be removed
          if (existentPointer) {
            canvas?.remove(existentPointer);
            canvas?.renderAll();
          }

          // Adding cursor on remote canvases
          objectImage.set({ id, cursorPointer });
          canvas?.add(objectImage);

          resolve();
        });
      });
    },
    [canvas, findObjectById]
  );

  /**
   * Returns the image path according with the given cursorPointer
   * @param {IPointerType} cursorPointer - Cursor Pointer Type
   * to get its image path
   */
  const getImagePath = (cursorPointer: IPointerType) => {
    switch (cursorPointer) {
      case 'arrow':
        return arrowPointer;

      case 'hand':
        return handPointer;

      case 'crosshair':
        return crosshairPointer;
    }
  };

  /**
   * Renders the given cursor in the given point in the current canvas
   * @param {number} top - Vertical position to render the pointer
   * @param {number} left - Horizontal position to render the pointer
   * @param {IPointerType} cursorPointer - Pointer type to render
   * @param {string} cursorId - Id for the pointer object
   */
  const renderPointer = useCallback(
    async (
      top: number,
      left: number,
      cursorPointer: IPointerType,
      cursorId: string
    ) => {
      const pointerImage = findObjectById(cursorId);

      /*
        If cursor pointer type is 'none', current pointer will be removed.
        If a cursor pointer type occurs, current pointer will be removed.
      */
      if (
        pointerImage &&
        (cursorPointer === 'none' ||
          pointerImage.cursorPointer !== cursorPointer)
      ) {
        canvas?.remove(pointerImage);
        canvas?.renderAll();
      }

      /*
        If the cursor already exists, just will be moved;
        if not, will be created
      */
      if (pointerImage) {
        /**
         * Fix to avoid double cursor
         */
        (document.getElementsByClassName('upper-canvas')[0] as HTMLElement).style.cursor = "none";
        
        pointerImage.set({ top, left });
        canvas?.renderAll();
      } else {
        try {
          await createCursor(cursorId, top, left, cursorPointer);
        } catch (error) {
          console.warn(error);
        }
      }
    },
    [canvas, createCursor, findObjectById]
  );

  /** Emits local event. */
  useEffect(() => {
    const id = `${userId}:cursor`;

    /**
     * Handles moving event for cursor pointer. Emits event to other users.
     * @param {CanvasEvent} event - Canvas event.
     */
    const move = (event: CanvasEvent) => {
      const top = (event.pointer as fabric.Point).y;
      const left = (event.pointer as fabric.Point).x;

      renderPointer(top, left, pointer, id);

      const payload: ObjectEvent = {
        type: 'cursorPointer',
        target: { top, left, cursorPointer: pointer } as ICanvasObject,
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
  }, [canvas, eventSerializer, pointer, pointerEvents, renderPointer, userId]);

  /** Register and handle remote moved event. */
  useEffect(() => {
    /**
     * Handles moving event for cursor pointer. Receives event.
     * @param {string} id - User ID.
     * Used for know who's send the event.
     * @param {IPointerTarget} target - Properites for laser pointer.
     */
    const moved = async (id: string, target: IPointerTarget) => {
      if (!shouldHandleRemoteEvent(id)) return;

      const { top, left, cursorPointer } = target;

      renderPointer(top, left, cursorPointer, id);
    };

    eventController?.on('cursorPointer', moved);

    return () => {
      eventController?.removeListener('cursorPointer', moved);
    };
  }, [eventController, renderPointer, shouldHandleRemoteEvent]);
};

export default useSynchronizedCursorPointer;
