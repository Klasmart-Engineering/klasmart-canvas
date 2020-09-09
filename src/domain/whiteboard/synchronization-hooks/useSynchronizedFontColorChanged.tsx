import { useEffect } from 'react';
import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { EventFilterFunction } from '../WhiteboardCanvas';

const useSynchronizedFontColorChanged = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: EventFilterFunction,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  useEffect(() => {
    const colorChanged = (
      id: string,
      generatedBy: string,
      objectType: string,
      target: ICanvasObject
    ) => {
      if (!shouldHandleRemoteEvent(id, generatedBy)) return;

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          if (objectType === 'textbox') {
            obj.set({
              generatedBy,
              fill: target.fill,
            });
          }
        }
      });

      undoRedoDispatch({
        type: SET_OTHER,
        payload: canvas?.getObjects(),
        canvasId: userId,
      });

      canvas?.renderAll();
    };

    eventController?.on('fontColorChanged', colorChanged);

    return () => {
      eventController?.removeListener('fontColorChanged', colorChanged);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedFontColorChanged;
