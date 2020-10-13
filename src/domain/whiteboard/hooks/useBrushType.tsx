import { useState } from 'react';
export const useBrushType = (type: string = 'pen') => {
  const [brushType, updateBrushType] = useState<string>(type);
  return { brushType, updateBrushType };
};
