import { useState } from 'react';

export const useBackgroundColor = (color: string = '#ffffff') => {
  const [backgroundColor, updateBackgroundColor] = useState(color);
  return { backgroundColor, updateBackgroundColor };
};
