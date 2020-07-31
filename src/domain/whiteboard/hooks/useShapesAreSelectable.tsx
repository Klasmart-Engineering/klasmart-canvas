import { useState } from 'react';

/**
 * Indicates of shapes are selectable and eventful.
 */
export const useShapesAreSelectable = () => {
  const [shapesAreSelectable, updateShapesAreSelectable] = useState(false);
  return { shapesAreSelectable, updateShapesAreSelectable };
};
