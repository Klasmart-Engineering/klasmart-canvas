import { useState } from 'react';

export const usePointerEvents = (newState: boolean = true) => {
  const [pointerEvents, setPointerEvents] = useState<boolean>(newState);

  return { pointerEvents, setPointerEvents };
};
