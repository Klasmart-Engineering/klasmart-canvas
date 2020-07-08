import { useState } from 'react';
export const useFontColor = (color: string) => {
  const [fontColor, updateFontColor] = useState(color);
  return { fontColor, updateFontColor };
};
