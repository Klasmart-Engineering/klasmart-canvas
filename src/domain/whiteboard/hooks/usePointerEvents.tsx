import { useState } from 'react';

export const usePointerEvents = () => {
  const [pointerEvents, setPointerEvents] = useState(true);

  return { pointerEvents, setPointerEvents };
};
