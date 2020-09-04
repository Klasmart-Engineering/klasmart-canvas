import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { Laser } from '../utils/laser';

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
    let trail: Laser;
    const id: string = `${userId}:laser`;

    /**
     * Handles moving event for laser pointer. Emits event to other users.
     * @param e Canvas event.
     */
    const move = (e: CanvasEvent) => {
      if ((e.e as MouseEvent).which && (e.e as MouseEvent).buttons && canvas) {
        canvas.defaultCursor = 'none';
        trail.update(e.pointer as { x: number; y: number });

        const top = (e.pointer as fabric.Point).y;
        const left = (e.pointer as fabric.Point).x;

        const payload: ObjectEvent = {
          type: 'pointer',
          target: { top, left, fill: laserColor } as ICanvasObject,
          id,
        };

        eventSerializer.push('moving', payload);
      } else if (trail && canvas && !trail.clear) {
        canvas.defaultCursor = 'default';

        const payload: ObjectEvent = {
          type: 'pointer',
          target: { groupClear: true } as ICanvasObject,
          id,
        };

        eventSerializer.push('moving', payload);
        trail.clearPointer();
      }
    };

    if (laserIsActive && (universalPermits(userId) || allowPointer)) {
      trail = new Laser(canvas as fabric.Canvas, laserColor, 20, 25);
      canvas?.renderAll();
      canvas?.on('mouse:move', move);
    }

    return () => {
      if (trail) {
        trail.remove();

        const payload: ObjectEvent = {
          type: 'pointer',
          target: false,
          id,
        };

        eventSerializer.push('moving', payload);
      }

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
    let trail: Laser | null;

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

      if (!trail && canvas && target && !(target as ICanvasObject).groupClear) {
        trail = new Laser(
          canvas as fabric.Canvas,
          target.fill || '#000000',
          20,
          25
        );
      } else if (trail && (target as ICanvasObject).groupClear) {
        trail.clearPointer();
      } else if (trail && !target) {
        trail.remove();
        trail = null;
      } else if (!trail && !canvas) {
        return;
      }

      trail?.update({ x: target.left, y: target.top });
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
