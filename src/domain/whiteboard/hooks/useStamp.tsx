import { useState } from 'react';
export const useStamp = (newStamp: string = 'good') => {
  const [stamp, updateStamp] = useState(newStamp);
  return { stamp, updateStamp };
};
