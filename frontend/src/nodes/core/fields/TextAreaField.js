import React, { useRef, useEffect } from 'react';

export const TextAreaField = ({ label, value, onChange, placeholder, badge, error, className = '', inputProps = {} }) => {
  const taRef = useRef(null);
  const { autoGrow, ...restInputProps } = inputProps || {};

  const adjustHeight = () => {
    if (!autoGrow || !taRef.current) return;
    const el = taRef.current;
    el.style.height = 'auto';
    el.style.height = `${Math.min(600, Math.max(72, el.scrollHeight))}px`;
  };

  useEffect(() => {
    adjustHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, autoGrow]);

  const handleChange = (e) => {
    onChange(e.target.value);
    if (autoGrow) requestAnimationFrame(adjustHeight);
  };

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
      <textarea
        ref={taRef}
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full min-h-[72px] rounded-lg border px-3 py-2 text-sm bg-white dark:bg-slate-700/50 dark:text-slate-50 dark:border-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 transition-all ${error ? 'border-red-300 ring-1 ring-red-200 dark:border-red-600 dark:ring-red-700' : 'border-neutral-300'}`}
        {...restInputProps}
      />
    </div>
  );
};
