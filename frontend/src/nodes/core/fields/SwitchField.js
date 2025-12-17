import React from 'react';

export const SwitchField = ({ label, value, onChange, className = '' }) => {
  const handleToggle = (e) => onChange(!!e.target.checked);
  const isOn = !!value;
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-semibold text-neutral-800 dark:text-slate-200">{label}</label>
          <span className="text-sm text-neutral-500 dark:text-slate-400">{isOn ? 'Yes' : 'No'}</span>
        </div>
      )}
      <label className="relative inline-flex items-center cursor-pointer select-none">
        <input type="checkbox" className="sr-only" checked={isOn} onChange={handleToggle} />
        <div className={`w-10 h-5 rounded-full transition-colors ${isOn ? 'bg-indigo-600' : 'bg-slate-400 dark:bg-slate-600'}`}></div>
        <div className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white dark:bg-slate-100 rounded-full shadow-md transition-transform ${isOn ? 'translate-x-5' : ''}`}></div>
      </label>
    </div>
  );
};
