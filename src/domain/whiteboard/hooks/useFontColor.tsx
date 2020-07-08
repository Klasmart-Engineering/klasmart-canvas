import { useState } from 'react';
export const useFontColor = (color: string = 'black') => {
  const [fontColor, updateFontColor] = useState(color);
  return { fontColor, updateFontColor };
};
