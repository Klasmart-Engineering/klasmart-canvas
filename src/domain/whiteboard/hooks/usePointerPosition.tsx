import { useState } from 'react';

export const usePointerPosition = () => {
  const [pointerPosition, updatePointerPosition] = useState({ x: 0, y: 0 });
  return { pointerPosition, updatePointerPosition };
};
