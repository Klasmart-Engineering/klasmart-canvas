import { useState } from 'react';

export const useBackgroundColor = (color: string = 'transparent') => {
  const [backgroundColor, updateBackgroundColor] = useState(color);
  return { backgroundColor, updateBackgroundColor };
};
