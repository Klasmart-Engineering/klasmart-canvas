import { useState } from 'react';

export const useFloodFillIsActive = () => {
  const [floodFillIsActive, updateFloodFillIsActive] = useState(false);
  return { floodFillIsActive, updateFloodFillIsActive };
};
