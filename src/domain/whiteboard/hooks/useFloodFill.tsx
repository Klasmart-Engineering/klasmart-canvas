import { useState } from 'react';

export const useFloodFill = (color: string = '#000000') => {
  const [floodFill, updateFloodFill] = useState(color);
  return { floodFill, updateFloodFill };
};
