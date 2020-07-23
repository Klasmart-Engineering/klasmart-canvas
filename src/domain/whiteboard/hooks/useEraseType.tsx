import { useState } from 'react';
export const useEraseType = (type: string | null = null) => {
  const [eraseType, updateEraseType] = useState<string | null>(type);
  return { eraseType, updateEraseType };
};
