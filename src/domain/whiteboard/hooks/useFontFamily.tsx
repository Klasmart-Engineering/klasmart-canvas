import { useState } from 'react';
export const useFontFamily = (font: string = 'Arial') => {
  const [fontFamily, updateFontFamily] = useState<string>(font);
  return { fontFamily, updateFontFamily };
};
