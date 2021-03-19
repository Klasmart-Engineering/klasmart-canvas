import { useState } from 'react';
import { IStampMode } from '../../../interfaces/stamps/stamp-mode';
export const useStampMode = (mode: IStampMode = 'student') => {
  const [stampMode, updateStampMode] = useState(mode);
  return { stampMode, updateStampMode };
};
