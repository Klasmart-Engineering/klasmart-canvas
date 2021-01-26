import { useCallback, useContext, useEffect } from 'react';
import { WhiteboardContext } from '../WhiteboardContext';
import arrowPointer from '../../../assets/cursors/arrow-pointer.png';
import handPointer from '../../../assets/cursors/hand-pointer.png';
import crosshairPointer from '../../../assets/cursors/crosshair-pointer.png';

/**
 * Handles the logic for pointer feature
 * @param {fabric.Canvas} canvas - Canvas in which pointer will change
 */
export const usePointerFeature = (canvas: fabric.Canvas) => {
  const { pointer, pointerEvents, floodFillIsActive } = useContext(
    WhiteboardContext
  );

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
};
