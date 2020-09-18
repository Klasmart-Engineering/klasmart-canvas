import { ObjectEvent } from "../event-serializer/PaintEventSerializer";import { ICanvasObject } from "../../../interfaces/objects/canvas-object";import { IUndoRedoEvent } from "../../../interfaces/canvas-events/undo-redo-event";import { SET } from "../reducers/undo-redo";

export const changeBackgroundColor = (
  canvas: any,
  eventSerializer: any,
  undoRedoDispatch: any,
  color: string,
  userId: string
) => {
  canvas.backgroundColor = color;

  const payload: ObjectEvent = {
    type: 'background',
    target: {
      fill: color,
    } as ICanvasObject,
    id: '',
  };

  const eventState = {
    event: { ...payload, id: `${userId}:background` },
    type: 'colorChanged',
  } as IUndoRedoEvent;

  undoRedoDispatch({
    type: SET,
    payload: canvas.getObjects(),
    canvasId: userId,
    event: eventState,
  });

  eventSerializer?.push('colorChanged', payload);
}
