import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AutosaveContextType {
  isAutosaveEnabled: boolean;
  autosaveDelay: number;
  lastSaveTime: Date | null;
  enableAutosave: () => void;
  disableAutosave: () => void;
  setAutosaveDelay: (delay: number) => void;
  updateLastSaveTime: () => void;
}

const AutosaveContext = createContext<AutosaveContextType | undefined>(undefined);

interface AutosaveProviderProps {
  children: ReactNode;
}

export const AutosaveProvider: React.FC<AutosaveProviderProps> = ({ children }) => {
  const [isAutosaveEnabled, setIsAutosaveEnabled] = useState(true);
  const [autosaveDelay, setAutosaveDelayState] = useState(2000); // 2 seconds default
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);

  const enableAutosave = () => setIsAutosaveEnabled(true);
  const disableAutosave = () => setIsAutosaveEnabled(false);
  
  const setAutosaveDelay = (delay: number) => {
    setAutosaveDelayState(delay);
  };

  const updateLastSaveTime = () => {
    setLastSaveTime(new Date());
  };

  const value: AutosaveContextType = {
    isAutosaveEnabled,
    autosaveDelay,
    lastSaveTime,
    enableAutosave,
    disableAutosave,
    setAutosaveDelay,
    updateLastSaveTime,
  };

  return (
    <AutosaveContext.Provider value={value}>
      {children}
    </AutosaveContext.Provider>
  );
};

export const useAutosaveContext = (): AutosaveContextType => {
  const context = useContext(AutosaveContext);
  if (!context) {
    throw new Error('useAutosaveContext must be used within an AutosaveProvider');
  }
  return context;
};
