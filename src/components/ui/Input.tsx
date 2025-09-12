import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          block w-full rounded-lg border border-border-light dark:border-border-dark px-4 py-3 text-sm
          placeholder-secondary-400 dark:placeholder-secondary-500 shadow-sm transition-all duration-200
          bg-surface-light dark:bg-surface-dark text-secondary-900 dark:text-secondary-100
          focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-fade-in">{error}</p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`
          block w-full rounded-lg border border-border-light dark:border-border-dark px-4 py-3 text-sm
          shadow-sm transition-all duration-200 bg-surface-light dark:bg-surface-dark
          text-secondary-900 dark:text-secondary-100
          focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-fade-in">{error}</p>
      )}
    </div>
  );
};
