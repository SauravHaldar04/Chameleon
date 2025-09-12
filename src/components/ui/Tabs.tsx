import React, { useState } from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {}
});

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return (
    <div className={`inline-flex h-11 items-center justify-center rounded-xl bg-secondary-100 dark:bg-secondary-800 p-1 text-secondary-500 dark:text-secondary-400 shadow-inner ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className = '' }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;
  
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium 
        ring-offset-white dark:ring-offset-secondary-900 transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50
        ${isActive 
          ? 'bg-surface-light dark:bg-surface-dark text-secondary-900 dark:text-secondary-100 shadow-md' 
          : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200/50 dark:hover:bg-secondary-700/50 hover:text-secondary-900 dark:hover:text-secondary-200'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
  const { activeTab } = React.useContext(TabsContext);
  
  if (activeTab !== value) {
    return null;
  }
  
  return (
    <div className={`mt-4 ring-offset-white dark:ring-offset-secondary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 animate-fadeIn ${className}`}>
      {children}
    </div>
  );
};
