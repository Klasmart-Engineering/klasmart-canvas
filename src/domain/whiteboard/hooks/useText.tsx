import { useState } from 'react';
export const useText = (newText: string = '') => {
  const [text, updateText] = useState(newText);
  return { text, updateText };
};
