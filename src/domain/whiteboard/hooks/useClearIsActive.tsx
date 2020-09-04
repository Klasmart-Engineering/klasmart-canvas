import { useState } from 'react';

export const useClearIsActive = () => {
  const [clearIsActive, updateClearIsActive] = useState(false);
  return { clearIsActive, updateClearIsActive };
};
