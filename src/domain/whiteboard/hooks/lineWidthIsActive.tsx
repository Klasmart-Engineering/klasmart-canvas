import { useState } from 'react';

export const useLineWidthIsActive = () => {
  const [lineWidthIsActive, updateLineWidthIsActive] = useState(false);
  return { lineWidthIsActive, updateLineWidthIsActive };
};
