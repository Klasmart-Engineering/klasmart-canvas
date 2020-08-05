import { useState } from 'react';
export const useShapeColor = (color: string = '#000000') => {
  const [shapeColor, updateShapeColor] = useState(color);
  return { shapeColor, updateShapeColor };
};
