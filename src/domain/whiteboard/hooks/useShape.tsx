import { useState } from 'react';
export const useShape = (newShape: string = 'rectangle') => {
  const [shape, updateShape] = useState(newShape);
  return { shape, updateShape };
};
