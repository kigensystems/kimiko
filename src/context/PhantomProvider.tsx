'use client';

import { createContext, useContext, ReactNode } from 'react';
import { usePhantom } from '@/hooks/usePhantom';

type PhantomContextType = ReturnType<typeof usePhantom>;

const PhantomContext = createContext<PhantomContextType | null>(null);

export function PhantomProvider({ children }: { children: ReactNode }) {
  const phantomState = usePhantom();

  return (
    <PhantomContext.Provider value={phantomState}>
      {children}
    </PhantomContext.Provider>
  );
}

export function usePhantomContext() {
  const context = useContext(PhantomContext);
  if (!context) {
    throw new Error('usePhantomContext must be used within a PhantomProvider');
  }
  return context;
}