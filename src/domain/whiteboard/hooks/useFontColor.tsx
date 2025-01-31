import { useState } from 'react';
export const useFontColor = (color: string = '#000000') => {
  const [fontColor, updateFontColor] = useState(color);
  return { fontColor, updateFontColor };
};
