import { useContext, useEffect } from 'react';
import { WhiteboardContext } from '../WhiteboardContext';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { IPermissions } from '../../../interfaces/permissions/permissions';

/**
 * Handles the logic for pointer feature
 * @param {fabric.Canvas} canvas - Canvas in which pointer will change
 * @param {string} userId - Current user
 */
export const usePointerFeature = (
  canvas: fabric.Canvas,
  userId: string,
  permissions: IPermissions
) => {
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  const {
    pointerEvents,
    floodFillIsActive,
    updatePointer,
    setPointerEvents,
    allToolbarIsEnabled,
    findObjectById,
  } = useContext(WhiteboardContext);

  // Changes canvas defaultCursor to selected pointer or default cursor
  useEffect(() => {
    if (!canvas || floodFillIsActive) return;

    if (pointerEvents) {
      const pointer = findObjectById(`${userId}:cursor`);
      canvas?.remove(pointer as fabric.Object);
    }

    canvas.defaultCursor = pointerEvents ? 'default' : 'none';
  }, [canvas, findObjectById, floodFillIsActive, pointerEvents, userId]);

  // Updates the involucrated states when permission is revoked
  useEffect(() => {
    if (canvas && !(permissions.cursorPointer || allToolbarIsEnabled)) {
      const pointer = findObjectById(`${userId}:cursor`);

      updatePointer('arrow');
      setPointerEvents(true);
      canvas.defaultCursor = 'default';
      canvas.remove(pointer as fabric.Object);
    }
  }, [
    allToolbarIsEnabled,
    canvas,
    findObjectById,
    permissions.cursorPointer,
    setPointerEvents,
    updatePointer,
    userId,
  ]);

  // Send an event to remove the current cursor when permission is revoked
  useEffect(() => {
    if (pointerEvents) {
      const cursorId = `${userId}:cursor`;
      const payload: ObjectEvent = {
        type: 'cursorPointer',
        target: { top: 0, left: 0, cursorPointer: 'none' } as ICanvasObject,
        id: cursorId,
      };

      eventSerializer?.push('cursorPointer', payload);
    }
  }, [eventSerializer, pointerEvents, userId]);
};
