import { useState } from 'react';

export const useToolbarPermissions = () => {
  const [toolbarIsEnabled, setToolbarIsEnabled] = useState(true);
  const [serializerToolbarState, setSerializerToolbarState] = useState({
    pointer: false,
    move: false,
    erase: false,
    pen: false,
  });

  return {
    toolbarIsEnabled,
    setToolbarIsEnabled,
    serializerToolbarState,
    setSerializerToolbarState,
  };
};
