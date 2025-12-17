import React from 'react';

export const TextField = ({ label, value, onChange, placeholder, badge, error, inputProps = {}, className = '' }) => {
  const handleChange = (e) => onChange(e.target.value);
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-semibold text-neutral-800 dark:text-slate-200">{label}</label>
          {badge && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">{badge}</span>
          )}
        </div>
      )}
      <input
        type="text"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={handleChange}
        className={`w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-slate-700/50 dark:text-slate-50 dark:border-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 transition-all ${error ? 'border-red-300 ring-1 ring-red-200 dark:border-red-600 dark:ring-red-700' : 'border-neutral-300'}`}
        {...inputProps}
      />
    </div>
  );
};
