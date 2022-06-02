import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { useEffect } from 'react';
import { EventFilterFunction } from '../WhiteboardCanvas';
import { ICanvasPanEventObject } from '../../../interfaces/objects/canvas-pan-event-object';

/**
 * Hook to synchronize canvas pan events.
 * @param canvas {fabric.Canvas | undefined}
 * @param userId {string}
 * @param shouldHandleRemoteEvent {EventFilterFunction}
 * @param undoRedoDispatch {React.Dispatch<CanvasAction>}
 */
const useSynchronizedCanvasPan = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: EventFilterFunction,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();
  useEffect(() => {
    const canvasPanned = (
      id: string,
      generatedBy: string,
      target: ICanvasPanEventObject|any
    ) => {
      if (!shouldHandleRemoteEvent(id, generatedBy)) return;
      canvas?.relativePan(target.pan);

      undoRedoDispatch({
        type: SET_OTHER,
        payload: canvas?.getObjects(),
        canvasId: userId,
      });

      canvas?.renderAll();
    };

    eventController?.on('canvasPanned', canvasPanned);

    return () => {
      eventController?.removeListener('canvasPanned', canvasPanned);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedCanvasPan;
