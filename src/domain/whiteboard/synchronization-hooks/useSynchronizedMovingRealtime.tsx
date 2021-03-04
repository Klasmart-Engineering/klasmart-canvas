import { useContext, useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { IRealtimeData, Realtime } from '../realtime/realtime';
import { WhiteboardContext } from '../WhiteboardContext';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';

/**
 * Handles laser pointer events.
 * @param canvas Canvas
 * @param shouldHandleRemoteEvent Method that checks if an event should be handled.
 * @param userId User ID.
 */
const useSynchronizedRealtime = (
  canvas: fabric.Canvas | undefined,
  shouldHandleRemoteEvent: (id: string) => boolean,
  userId: string
) => {
  const {
    state: { eventController, eventSerializer },
  } = useSharedEventSerializer();

  const { perfectShapeIsActive } = useContext(WhiteboardContext);
  let rt: Realtime | null;
  rt = new Realtime(
    canvas?.getWidth() as number,
    canvas?.getHeight() as number,
    userId
  );

  /** Register and handle remote moved event. */
  useEffect(() => {
    /**
     * Handles moving event for objects. Receives event.
     * @param id User ID. Used for determining if event should be handled.
     * @param target Properites for object.
     */
    const moved = (
      // Event emitter automatically sends ID, required but not needed in this case.
      // @ts-ignore
      id: string,
      target: {
        coordinates: { x: number; y: number }[];
        lineWidth: number;
        color: string;
        id: string;
        type: string;
        shape?: any;
        eventType?: string;
      }
    ) => {
      if (target.eventType !== 'added' && userId !== id) {
        if (rt && !rt.isInitiated() && target.type === 'PencilBrush') {
          rt.init(
            canvas as fabric.Canvas,
            'PencilBrush',
            target.color,
            target.lineWidth
          );
        } else if (rt && !rt.isInitiated() && target.type === 'rectangle') {
          rt.init(
            canvas as fabric.Canvas,
            'rectangle',
            target.shape.stroke,
            target.shape.strokeWidth
          );
        } else if (rt && !rt.isInitiated() && target.type === 'circle') {
          console.log(userId, id);
          rt.init(
            canvas as fabric.Canvas,
            'circle',
            target.shape.stroke,
            target.shape.strokeWidth
          );
        } else if (rt && !rt.isInitiated() && target.type === 'text') {
          rt.init(
            canvas as fabric.Canvas,
            'text',
            target.shape.stroke,
            target.shape.strokeWidth
          );
        } else if (rt && !rt.isInitiated() && target.type === 'triangle') {
          rt.init(
            canvas as fabric.Canvas,
            'triangle',
            target.shape.stroke,
            target.shape.strokeWidth
          );
        } else if (rt && !rt.isInitiated() && target.type === 'pentagon') {
          rt.init(
            canvas as fabric.Canvas,
            'pentagon',
            target.shape.stroke,
            target.shape.strokeWidth
          );
        } else if (rt && !rt.isInitiated() && target.type === 'hexagon') {
          rt.init(
            canvas as fabric.Canvas,
            'hexagon',
            target.shape.stroke,
            target.shape.strokeWidth
          );
        } else if (rt && !rt.isInitiated() && target.type === 'arrow') {
          rt.init(
            canvas as fabric.Canvas,
            'arrow',
            target.shape.stroke,
            target.shape.strokeWidth
          );
        } else if (rt && !rt.isInitiated() && target.type === 'star') {
          rt.init(
            canvas as fabric.Canvas,
            'star',
            target.shape.stroke,
            target.shape.strokeWidth
          );
        } else if (rt && !rt.isInitiated() && target.type === 'chatBubble') {
          rt.init(
            canvas as fabric.Canvas,
            'chatBubble',
            '#555555',
            target.shape.strokeWidth
          );
        }
      }

      rt?.draw((target as unknown) as IRealtimeData);
    };

    /**
     * Real time functionality for text.
     * @param id ID of objects.
     * @param target Text properties.
     */
    const textEdit = (
      // Event emitter automatically sends ID, required but not needed in this case.
      // @ts-ignore
      id: string,
      target: {
        coordinates: { x: number; y: number }[];
        lineWidth: number;
        color: string;
        id: string;
        type: string;
        shape?: any;
        eventType?: string;
        fill?: string;
        fontweight?: number;
      }
    ) => {
      if (rt && !rt.isInitiated() && target.type === 'i-text') {
        rt.init(
          canvas as fabric.Canvas,
          'text',
          target.fill as string,
          target.fontweight as number
        );
      }

      if (rt) {
        rt.textDraw(target);
      }
    };

    eventController?.on('moving', moved);
    eventController?.on('textEdit', textEdit);

    return () => {
      eventController?.removeListener('moving', moved);
      eventController?.removeListener('textEdit', textEdit);

      if (rt && rt.isInitiated()) {
        rt.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        rt = null;
      }
    };
  }, [canvas, eventController, shouldHandleRemoteEvent, rt]);

  useEffect(() => {
    if (perfectShapeIsActive) {
      const currentShape = canvas
        ?.getObjects()
        .reverse()
        .find((obj: TypedShape) => {
          return obj.shapeType === 'shape';
        });
      if (currentShape) {
        const { width, height } = currentShape;
        console.log(currentShape);

        if (Number(width) > Number(height)) {
          currentShape.set({
            height: width,
          });
        } else {
          currentShape.set({
            width: height,
          });
        }
        canvas?.renderAll();

        const objectEvent = {
          id: userId,
          target: {
            coordinates: [{ x: 0, y: 0 }],
            lineWidth: currentShape.strokeWidth,
            color: currentShape.stroke,
            id: (currentShape as ICanvasObject).id,
            type: currentShape.name,
            shape: currentShape,
            eventType: 'scaled',
          },
        };
        eventSerializer.push('moving', objectEvent as ObjectEvent);
      }
    }
  }, [canvas, eventSerializer, perfectShapeIsActive, userId]);
};

export default useSynchronizedRealtime;
