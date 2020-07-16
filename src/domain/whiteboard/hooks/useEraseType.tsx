import { useState } from 'react';
export const useEraseType = (type: string = '') => {
  const [eraseType, updateEraseType] = useState<string>(type);
  return { eraseType, updateEraseType };
};
