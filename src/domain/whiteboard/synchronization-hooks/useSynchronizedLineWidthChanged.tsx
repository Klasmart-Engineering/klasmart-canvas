import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { useEffect } from 'react';
import { EventFilterFunction } from '../WhiteboardCanvas';

const useSynchronizedLineWidthChanged = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: EventFilterFunction,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();
  useEffect(() => {
    const widthChanged = (
      id: string,
      generatedBy: string,
      objectType: string,
      target: ICanvasObject
    ) => {
      const validTypes: string[] = [
        'rect',
        'ellipse',
        'triangle',
        'polygon',
        'path',
      ];

      if (!shouldHandleRemoteEvent(id, generatedBy)) return;
      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          if (validTypes.includes(objectType)) {
            obj.set({
              generatedBy,
              strokeWidth: target.strokeWidth,
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

    eventController?.on('lineWidthChanged', widthChanged);

    return () => {
      eventController?.removeListener('lineWidthChanged', widthChanged);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedLineWidthChanged;
