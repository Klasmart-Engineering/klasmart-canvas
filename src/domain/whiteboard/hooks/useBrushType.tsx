import { useState } from 'react';
export const useBrushType = (type: string = 'pencil') => {
  const [brushType, updateBrushType] = useState<string>(type);
  return { brushType, updateBrushType };
};
