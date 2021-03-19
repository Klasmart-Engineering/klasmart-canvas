import { useState } from 'react';

export const useStampIsActive = () => {
  const [stampIsActive, updateStampIsActive] = useState(false);
  return { stampIsActive, updateStampIsActive };
};
