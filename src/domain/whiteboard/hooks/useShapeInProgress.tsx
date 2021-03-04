import { useState } from 'react';

export const useShapeInProgress = () => {
  const [shapeInProgress, updateShapeInProgress] = useState(false);
  return { shapeInProgress, updateShapeInProgress };
};
