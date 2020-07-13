import { useState } from 'react';
export const useShapeColor = (color: string = 'black') => {
  const [shapeColor, updateShapeColor] = useState(color);
  return { shapeColor, updateShapeColor };
};
