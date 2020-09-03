import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { laserPointer } from '../shapes/shapes';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';

/**
 * Handles laser pointer events.
 * @param canvas Canvas
 * @param showPointer Indicates if pointer should be shown.
 * @param universalPermits Indicates if user has universal permits, such as a teacher.
 * @param shouldHandleRemoteEvent Method that checks if an event should be handled.
 * @param userId User ID.
 * @param laserColor Color of laser.
 * @param laserIsActive Indicates if laser tool is sselected.
 * @param allowPointer Indicates if user has permission to use laser pointer.
 */
const useSynchronizedPointer = (
  canvas: fabric.Canvas | undefined,
  showPointer: boolean,
  universalPermits: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean,
  userId: string,
  laserColor: string,
  laserIsActive: boolean,
  allowPointer: boolean | undefined
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /** Emits local event. */
  useEffect(() => {
    /**
     * Handles moving event for laser pointer. Emits event to other users.
     * @param e Canvas event.
     */
    const move = (e: CanvasEvent) => {
      const id: string = `${userId}:laser`;
      let laser: ICanvasObject | undefined = canvas
        ?.getObjects()
        .filter((o: ICanvasObject) => o.id === id)[0];

      if ((e.e as MouseEvent).which && (e.e as MouseEvent).buttons && canvas) {
        canvas.defaultCursor = 'none';

        if (!laser) {
          laser = laserPointer();
          laser.set({
            id,
            fill: laserColor,
          });

          canvas?.add(laser);
          canvas?.renderAll();
        }

        const top = (e.pointer as fabric.Point).y + 3;
        const left = (e.pointer as fabric.Point).x - 18;

        laser.set({ top, left });
        canvas?.renderAll();

        const payload: ObjectEvent = {
          type: 'pointer',
          target: { top, left, fill: laserColor } as ICanvasObject,
          id,
        };

        eventSerializer.push('moving', payload);
      } else if (laser && canvas) {
        canvas.defaultCursor = 'default';
        canvas?.remove(laser);
        canvas?.renderAll();
      }
    };

    if (laserIsActive && (universalPermits(userId) || allowPointer)) {
      canvas?.renderAll();
      canvas?.on('mouse:move', move);
    }

    return () => {
      canvas?.off('mouse:move', move);
    };
  }, [
    laserIsActive,
    canvas,
    allowPointer,
    eventSerializer,
    laserColor,
    universalPermits,
    userId,
  ]);

  /** Register and handle remote moved event. */
  useEffect(() => {
    /**
     * Handles moving event for laser pointer. Receives event.
     * @param id User ID. Used for determining if event should be handled.
     * @param target Properites for laser pointer.
     */
    const moved = (
      id: string,
      target: { top: number; left: number; fill?: string }
    ) => {
      if (!shouldHandleRemoteEvent(id)) {
        return;
      }

      const pointer = canvas
        ?.getObjects()
        .filter((o: ICanvasObject) => o.id === id)[0];
      const laser: TypedShape = pointer ? pointer : laserPointer();

      if (!pointer) {
        laser.set({
          selectable: false,
          evented: false,
          id,
          fill: target.fill || '#000',
        });
        canvas?.add(laser);
        canvas?.renderAll();
      }

      laser.set({ top: target.top, left: target.left });
      canvas?.renderAll();
    };

    eventController?.on('moving', moved);

    return () => {
      eventController?.removeListener('moving', moved);
    };
  }, [
    canvas,
    eventController,
    showPointer,
    universalPermits,
    shouldHandleRemoteEvent,
  ]);
};

export default useSynchronizedPointer;
