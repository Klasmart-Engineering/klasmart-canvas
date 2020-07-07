import React, { createContext, useCallback, useEffect, useRef } from 'react';

// @ts-ignore
export const WhiteboardContext = createContext();

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
