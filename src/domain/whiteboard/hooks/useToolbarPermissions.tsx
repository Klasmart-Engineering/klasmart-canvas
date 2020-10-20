import { useState } from 'react';

export const useToolbarPermissions = () => {
  const [toolbarIsEnabled, setToolbarIsEnabled] = useState(true);
  const [serializerToolbarState, setSerializerToolbarState] = useState({
    pointer: false,
    move: false,
    erase: false,
    partialErase: false,
    pen: false,
    floodFill: false,
    text: false,
    shape: false,
    undoRedo: false,
    clearWhiteboard: false,
    uploadImage: false,
  });

  return {
    toolbarIsEnabled,
    setToolbarIsEnabled,
    serializerToolbarState,
    setSerializerToolbarState,
  };
};
