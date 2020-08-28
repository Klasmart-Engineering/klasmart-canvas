import { useState } from 'react';

export const useToolbarPermissions = () => {
  const [toolbarIsEnabled, setToolbarIsEnabled] = useState(true);
  return { toolbarIsEnabled, setToolbarIsEnabled };
};
