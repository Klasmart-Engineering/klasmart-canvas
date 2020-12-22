import { useState } from 'react';
import { IBrushType } from '../../../interfaces/brushes/brush-type';
export const useBrushType = (type: IBrushType = 'pencil') => {
  const [brushType, updateBrushType] = useState<IBrushType>(type);
  return { brushType, updateBrushType };
};
