import { useState } from 'react';

export const usePartialEraseIsActive = () => {
  const [partialEraseIsActive, updatePartialEraseIsActive] = useState(false);
  return { partialEraseIsActive, updatePartialEraseIsActive };
};
