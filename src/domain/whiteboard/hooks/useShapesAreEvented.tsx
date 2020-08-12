import { useState } from 'react';

/**
 * Indicates of shapes are eventful.
 */
export const useShapesAreEvented = () => {
  const [shapesAreEvented, updateShapesAreEvented] = useState(false);
  return { shapesAreEvented, updateShapesAreEvented };
};
