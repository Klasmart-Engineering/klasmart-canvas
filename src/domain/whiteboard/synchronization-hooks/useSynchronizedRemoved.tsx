import { useEffect, useContext } from 'react';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ITextOptions } from 'fabric/fabric-impl';
import { WhiteboardContext } from '../WhiteboardContext';

const useSynchronizedRemoved = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldSerializeEvent: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  const { clearIsActive } = useContext(WhiteboardContext);

  /** Register and handle remote event. */
  useEffect(() => {
    const removed = (objectId: string) => {
      if (!canvas) return;

      if (!shouldHandleRemoteEvent(objectId)) return;

      const removeObject = canvas.getObjects().find((obj: ICanvasObject) => obj.id === objectId);
      if (!removeObject) {
        console.error(`Couldn't find object with ID: ${objectId}`);
        return;
      }

      canvas.remove(removeObject);
      canvas.renderAll();

      undoRedoDispatch({
        type: SET_OTHER,
        payload: canvas?.getObjects(),
        canvasId: userId,
      });
    };

    eventController?.on('removed', removed);

    return () => {
      eventController?.removeListener('removed', removed);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);

  /** Register and handle local event. */
  useEffect(() => {
    const objectRemoved = (e: fabric.IEvent | CanvasEvent) => {
      if (!e.target) throw new Error('object:removed event without target.');

      const target = e.target as ICanvasObject;
      if (!target.id) throw new Error('object:removed event without target id');

      if (!shouldSerializeEvent(target.id)) return;

      const payload = { id: target.id };

      eventSerializer?.push('removed', payload as ObjectEvent);

      // TODO: It seems canvas is required here because of the
      // payload for undo/redo stack. Should investigate if we
      // can get rid of the canvas instance dependency within
      // the callback. Just storing the properties necessary
      // to restore the removed object instead.
      if (!canvas) return;

      const groupObjects = target._objects || [];

      // TODO: Verify this is the correct condition for undo dispatch when removing objects.
      if (groupObjects.length > 0 && !target.groupClear && !clearIsActive) {
        if (
          (e.target as ITextOptions).text &&
          !(e.target as ITextOptions).text?.trim()
        )
          return;

        const event = { event: payload, type: 'removed' } as IUndoRedoEvent;

        undoRedoDispatch({
          type: SET,
          payload: canvas.getObjects(),
          canvasId: userId,
          event,
        });
      }
    };

    if (canvas) {
      canvas.on('object:removed', objectRemoved);

      return () => {
        canvas.off('object:removed', objectRemoved);
      };
    }
  }, [
    canvas,
    clearIsActive,
    eventSerializer,
    shouldSerializeEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedRemoved;
