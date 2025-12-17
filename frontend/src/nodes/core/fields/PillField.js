import React from 'react';

export const PillField = ({ value, onChange, className = '', inputProps = {} }) => {
  const handleChange = (e) => onChange(e.target.value);
  return (
    <div className={`w-full ${className}`}>
      <input
        type="text"
        value={value ?? ''}
        onChange={handleChange}
        className="w-full rounded-lg bg-indigo-100 text-indigo-900 text-sm font-medium px-3 py-1 text-center outline-none border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 dark:bg-indigo-900/60 dark:text-indigo-200 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 transition-all"
        {...inputProps}
      />
    </div>
  );
};
