import { useState } from 'react';
import { IPointerType } from '../../../interfaces/pointers/pointer-type';
export const usePointer = (pointerType: IPointerType = 'arrow') => {
  const [pointer, updatePointer] = useState(pointerType);
  return { pointer, updatePointer };
};
