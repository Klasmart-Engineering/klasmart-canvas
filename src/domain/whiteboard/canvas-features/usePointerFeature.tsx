import { useCallback, useContext, useEffect } from 'react';
import { WhiteboardContext } from '../WhiteboardContext';

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
        return 'default';

      case 'hand':
        return 'pointer';

      case 'crosshair':
        return 'crosshair';
    }
  }, [pointer]);

  // Changes canvas defaultCursor to selected pointer or default cursor
  useEffect(() => {
    if (!canvas || floodFillIsActive) return;

    canvas.defaultCursor = pointerEvents ? 'default' : setCursor();
  }, [canvas, floodFillIsActive, pointerEvents, setCursor]);
};
