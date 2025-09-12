import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  elevation?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md',
  elevation = 'md',
  hover = false,
  onClick,
  style
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  const elevationClasses = {
    sm: 'shadow-sm dark:shadow-dark-sm',
    md: 'shadow-md dark:shadow-dark-md',
    lg: 'shadow-lg dark:shadow-dark-lg',
    xl: 'shadow-xl dark:shadow-dark-xl'
  };

  const hoverClasses = hover ? 'hover:shadow-lg dark:hover:shadow-dark-lg transform hover:-translate-y-1 transition-all duration-300' : 'transition-shadow duration-200';
  
  return (
    <div 
      className={`
        bg-surface-light dark:bg-surface-dark 
        rounded-xl 
        border border-border-light dark:border-border-dark 
        ${elevationClasses[elevation]} 
        ${paddingClasses[padding]} 
        ${hoverClasses}
        backdrop-blur-sm
        animate-fade-in
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`pb-4 border-b border-border-light dark:border-border-dark mb-4 ${className}`}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-semibold text-secondary-900 dark:text-secondary-100 ${className}`}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};
