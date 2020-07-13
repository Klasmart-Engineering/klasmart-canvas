import { useState } from 'react';

export const usePointerEvents = () => {
  const [pointerEvents, setPointerEvents] = useState(false);

  return { pointerEvents, setPointerEvents };
};
