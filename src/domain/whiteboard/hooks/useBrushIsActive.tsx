import { useState } from 'react';

export const useBrushIsActive = () => {
  const [brushIsActive, updateBrushIsActive] = useState(false);
  return { brushIsActive, updateBrushIsActive };
};
