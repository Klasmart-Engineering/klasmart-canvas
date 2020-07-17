import { useState } from 'react';

export const useTextIsActive = () => {
  const [textIsActive, updateTextIsActive] = useState(false);

  return { textIsActive, updateTextIsActive };
};
