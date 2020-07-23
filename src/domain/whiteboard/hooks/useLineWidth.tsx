import { useState } from 'react';
export const useLineWidth = (width: number = 4) => {
  const [lineWidth, updateLineWidth] = useState(width);
  return { lineWidth, updateLineWidth };
};
