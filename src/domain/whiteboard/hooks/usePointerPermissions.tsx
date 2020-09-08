import { useState } from 'react';

export const usePointerPermissions = () => {
  const [pointerIsEnabled, setPointerIsEnabled] = useState(true);
  return { pointerIsEnabled, setPointerIsEnabled };
};
