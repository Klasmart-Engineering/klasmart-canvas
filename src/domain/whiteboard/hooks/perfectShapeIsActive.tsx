import { useState } from 'react';

export const usePerfectShapeIsActive = () => {
  const [perfectShapeIsActive, updatePerfectShapeIsActive] = useState(false);
  return { perfectShapeIsActive, updatePerfectShapeIsActive };
};
