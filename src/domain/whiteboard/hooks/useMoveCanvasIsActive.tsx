import { useState } from 'react';

/**
 * Hooks to set if moveCanvas is active
 * @returns useState hooks for move canvas
 */
export const useMoveCanvasIsActive = () => {
  const [moveCanvasIsActive, updateMoveCanvasIsActive] = useState(false);

  return { moveCanvasIsActive, updateMoveCanvasIsActive };
};
