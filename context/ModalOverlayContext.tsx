import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface ModalOverlayContextType {
  isOverlayVisible: boolean;
  requestShowOverlay: () => void;
  requestHideOverlay: () => void;
}

const ModalOverlayContext = createContext<ModalOverlayContextType | undefined>(undefined);

export const ModalOverlayProvider = ({ children }: { children: ReactNode }) => {
  const [activeModalCount, setActiveModalCount] = useState(0);

  const requestShowOverlay = useCallback(() => {
    setActiveModalCount(prevCount => prevCount + 1);
  }, []);

  const requestHideOverlay = useCallback(() => {
    setActiveModalCount(prevCount => Math.max(0, prevCount - 1));
  }, []);

  return (
    <ModalOverlayContext.Provider value={{ isOverlayVisible: activeModalCount > 0, requestShowOverlay, requestHideOverlay }}>
      {children}
    </ModalOverlayContext.Provider>
  )
}

export const useModalOverlay = () => {
  const context = useContext(ModalOverlayContext);
  if (context === undefined) {
    throw new Error('useModalOverlay must be used within a ModalOverlayProvider');
  }
  return context;
}