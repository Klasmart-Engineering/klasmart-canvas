import { useCallback, useContext, useEffect } from 'react';
import { WhiteboardContext } from '../WhiteboardContext';
import arrowPointer from '../../../assets/cursors/arrow-pointer.png';
import handPointer from '../../../assets/cursors/hand-pointer.png';
import crosshairPointer from '../../../assets/cursors/crosshair-pointer.png';
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
    pointer,
    pointerEvents,
    floodFillIsActive,
    updatePointer,
    setPointerEvents,
    allToolbarIsEnabled,
  } = useContext(WhiteboardContext);

  // Set canvas defaultCursor according with the current pointer value
  const setCursor = useCallback(() => {
    switch (pointer) {
      case 'arrow':
        return `url("${arrowPointer}"), auto`;

      case 'hand':
        return `url("${handPointer}"), auto`;

      case 'crosshair':
        return `url("${crosshairPointer}"), auto`;
    }
  }, [pointer]);

  // Changes canvas defaultCursor to selected pointer or default cursor
  useEffect(() => {
    if (!canvas || floodFillIsActive) return;

    canvas.defaultCursor = pointerEvents ? 'default' : setCursor();
  }, [canvas, floodFillIsActive, pointerEvents, setCursor]);

  // Updates the involucrated states when permission is revoked
  useEffect(() => {
    if (!permissions.cursorPointer && canvas && !allToolbarIsEnabled) {
      updatePointer('arrow');
      setPointerEvents(true);
      canvas.defaultCursor = 'default';
    } else if (canvas && (permissions.cursorPointer || allToolbarIsEnabled)) {
      setPointerEvents(false);
    }
  }, [
    allToolbarIsEnabled,
    canvas,
    permissions.cursorPointer,
    setPointerEvents,
    updatePointer,
  ]);

  // Send an event to remove the current cursor when permission is revoked
  useEffect(() => {
    if (pointerEvents) {
      const payload: ObjectEvent = {
        type: 'cursorPointer',
        target: { top: 0, left: 0, pointer: 'none' } as ICanvasObject,
        id: `${userId}:cursor`,
      };
      eventSerializer?.push('cursorPointer', payload);
    }
  }, [eventSerializer, permissions.cursorPointer, pointerEvents, userId]);
};
