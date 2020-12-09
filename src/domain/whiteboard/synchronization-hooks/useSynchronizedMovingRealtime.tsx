import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { Realtime } from '../realtime/realtime';

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
const useSynchronizedRealtime = (
  canvas: fabric.Canvas | undefined,
  shouldHandleRemoteEvent: (id: string) => boolean,
  userId: string,
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  let rt: Realtime | null;
  rt = new Realtime(canvas?.getWidth() as number, canvas?.getHeight() as number, 'PencilBrush', 'teacher');

  /** Register and handle remote moved event. */
  useEffect(() => {

    /**
     * Handles moving event for laser pointer. Receives event.
     * @param id User ID. Used for determining if event should be handled.
     * @param target Properites for laser pointer.
     */
    const moved = (
      id: string,
      target: { 
        coordinates: { x: number, y: number}[], 
        lineWidth: number, 
        color: string, 
        id: string, 
        type: string,
        shape?: any,
        eventType?: string,
      },
    ) => {
      if (!shouldHandleRemoteEvent(id)) {
        return;
      }

      if (target.eventType !== 'added') {
        if (
          rt && !rt.isInitiated() && target.type !== 'rectangle' && target.type !== 'text'
        ) { 
          rt.init(canvas as fabric.Canvas, 'PencilBrush', target.color, target.lineWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'rectangle') {
          rt.init(canvas as fabric.Canvas, 'rectangle', target.shape.stroke, target.lineWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'text') {
          rt.init(canvas as fabric.Canvas, 'text', '#555555', 3);
        } else if (rt && target.type === 'location') {
          rt.init(canvas as fabric.Canvas, 'location', '#555555', 3);
        }
      } else if (target.eventType === 'added') {
        
      }

      if (target.type !== 'rectangle') {
        rt?.draw(target.coordinates);
      } else {
        rt?.shapeDraw(target);
      }
    };

    eventController?.on('moving', moved);

    return () => {
      eventController?.removeListener('moving', moved);
      
      if (rt && rt.isInitiated()) {
        rt.remove();
        rt = null;
      }
    };
  }, [canvas, eventController, shouldHandleRemoteEvent, rt]);
};

export default useSynchronizedRealtime;
