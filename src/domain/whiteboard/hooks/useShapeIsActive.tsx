import { useState } from 'react';

export const useShapeIsActive = () => {
  const [shapeIsActive, updateShapeIsActive] = useState(false);

  return { shapeIsActive, updateShapeIsActive };
};
