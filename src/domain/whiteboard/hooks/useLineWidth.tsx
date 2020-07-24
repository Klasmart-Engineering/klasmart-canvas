import { useState } from 'react';

export const useLineWidth = (width: number = 2) => {
  const [lineWidth, updateLineWidth] = useState(width);

  return { lineWidth, updateLineWidth };
};
