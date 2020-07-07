import React, { createContext, useCallback, useEffect, useRef } from 'react';

// @ts-ignore
export const WhiteboardContext = createContext();

let canvas: {
  add: (arg0: any) => void;
  remove: (arg0: any) => void;
  getActiveObject: () => any;
  getObjects: () => any;
  backgroundColor: 'red';
  requestRenderAll(): void;
  discardActiveObject(): void;
  clear(): void;
  renderAll(): void;
};

export const WhiteboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = {};

  return (
    <WhiteboardContext.Provider value={value}>
      {children}
    </WhiteboardContext.Provider>
  );
};
