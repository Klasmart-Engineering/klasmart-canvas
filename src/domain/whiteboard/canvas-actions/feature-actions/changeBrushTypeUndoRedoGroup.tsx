import { IObjectOptions } from 'fabric/fabric-impl';
import { IUndoRedoEvent } from '../../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';
import { TypedGroup } from '../../../../interfaces/shapes/group';
import { TypedShape } from '../../../../interfaces/shapes/shapes';
import { CanvasAction, SET_GROUP } from '../../reducers/undo-redo';

export const changeBrushTypeUndoRedoGroup = (
  canvas: fabric.Canvas,
  userId: string,
  undoRedoDispatch: (action: CanvasAction) => void
) => {
  const obj = canvas.getActiveObject() as ICanvasObject;
  const type = obj?.get('type');

  if (!obj || type !== 'activeSelection') return;

  const activeIds: string[] = canvas
    ?.getActiveObject()
    // @ts-ignore - Typings are out of date, getObjects is the correct method to get objects in group.
    .getObjects()
    .map((o: TypedShape) => o.id);

  const payload = {
    type,
    svg: true,
    target: null,
    id: `${userId}:group`,
  };

  const event = { event: payload, type: 'activeSelection', activeIds };

  let filtered = canvas?.getObjects().filter((o: IObjectOptions) => {
    return !o.group;
  });

  let active: TypedGroup = canvas?.getActiveObject() as TypedGroup;
  active?.set({ id: `${userId}:group` });

  undoRedoDispatch({
    type: SET_GROUP,
    payload: [...(filtered as any[]), active],
    canvasId: userId,
    event: (event as unknown) as IUndoRedoEvent,
  });
};
