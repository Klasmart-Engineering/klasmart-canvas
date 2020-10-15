import { useState } from 'react';
export const useBackgroundColor = (color: string = '#000000') => {
  const [backgroundColor, updateBackgroundColor] = useState(color);
  return { backgroundColor, updateBackgroundColor };
};
