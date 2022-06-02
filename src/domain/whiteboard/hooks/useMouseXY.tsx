import { useState } from 'react';

/**
 * Provides the hooks for the mouse cords used by move and scroll canvas
 * @returns useState hooks
 */
export const useMouseXY = () => {
  const [mouseXY, updateMouseXY] = useState({ x: 0, y: 0 });
  return { mouseXY, updateMouseXY };
};
