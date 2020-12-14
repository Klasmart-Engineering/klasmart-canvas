import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { IRealtimeData, Realtime } from '../realtime/realtime';

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
    state: { eventController },
  } = useSharedEventSerializer();

  let rt: Realtime | null;
  rt = new Realtime(canvas?.getWidth() as number, canvas?.getHeight() as number, userId);

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

      if (target.eventType !== 'added') {
        if (
          rt && !rt.isInitiated() && target.type === 'PencilBrush') { 
          rt.init(canvas as fabric.Canvas, 'PencilBrush', target.color, target.lineWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'rectangle') {
          rt.init(canvas as fabric.Canvas, 'rectangle', target.shape.stroke, target.shape.strokeWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'circle') {
          rt.init(canvas as fabric.Canvas, 'circle', target.shape.stroke, target.shape.strokeWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'text') {
          rt.init(canvas as fabric.Canvas, 'text', target.shape.stroke, target.shape.strokeWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'triangle') {
          rt.init(canvas as fabric.Canvas, 'triangle', target.shape.stroke, target.shape.strokeWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'pentagon') {
          rt.init(canvas as fabric.Canvas, 'pentagon', target.shape.stroke, target.shape.strokeWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'hexagon') {
          rt.init(canvas as fabric.Canvas, 'hexagon', target.shape.stroke, target.shape.strokeWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'arrow') {
          rt.init(canvas as fabric.Canvas, 'arrow', target.shape.stroke, target.shape.strokeWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'star') {
          rt.init(canvas as fabric.Canvas, 'star', target.shape.stroke, target.shape.strokeWidth);
        } else if (rt && !rt.isInitiated() && target.type === 'chatBubble') {
          rt.init(canvas as fabric.Canvas, 'chatBubble', '#555555', target.shape.strokeWidth);
        }
      }

      rt?.draw(target as unknown as IRealtimeData);
    };

    const textEdit = (
      id: string,
      target: { 
        coordinates: { x: number, y: number}[], 
        lineWidth: number, 
        color: string, 
        id: string, 
        type: string,
        shape?: any,
        eventType?: string,
        fill?: string;
      }
    ) => {
      if (rt && !rt.isInitiated() && target.type === 'i-text') {
        rt.init(canvas as fabric.Canvas, 'text', target.fill as string, target.shape.fontweight);
      }

      if (rt) {
        rt.textDraw(target);
      }
    }

    eventController?.on('moving', moved);
    eventController?.on('textEdit', textEdit);

    return () => {
      eventController?.removeListener('moving', moved);
      eventController?.removeListener('textEdit', textEdit);
      
      if (rt && rt.isInitiated()) {
        rt.remove();
        rt = null;
      }
    };
  }, [canvas, eventController, shouldHandleRemoteEvent, rt]);
};

export default useSynchronizedRealtime;
