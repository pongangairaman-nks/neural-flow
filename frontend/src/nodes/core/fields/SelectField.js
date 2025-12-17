import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Popover } from '../../../components/common/Popover';

export const SelectField = ({ label, value, onChange, options = [], badge, error, className = '', inputProps = {}, placeholder, helperText }) => {
  const [open, setOpen] = React.useState(false);
  const disabled = !!inputProps.disabled;

  const normalized = options.map((opt) => (
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  ));
  const selected = normalized.find((o) => o.value === value);
  const display = selected?.label ?? placeholder ?? 'Select';

  const handleSelect = (val) => {
    if (disabled) return;
    onChange(val);
    setOpen(false);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-semibold text-neutral-800 dark:text-slate-200">{label}</label>
          {badge && <span className="ml-2 text-xs px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">{badge}</span>}
        </div>
      )}
      <Popover
        isOpen={open}
        onClose={() => setOpen(false)}
        align="left"
        fullWidth
        trigger={
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setOpen((v) => !v)}
            className={`w-full text-left rounded-lg border px-3 py-2 pr-8 text-sm bg-white dark:bg-slate-700/50 dark:text-slate-50 dark:border-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 transition-all ${disabled ? 'opacity-60 cursor-not-allowed bg-neutral-100 dark:bg-slate-800' : 'hover:border-neutral-400 dark:hover:border-slate-500'} ${error ? 'border-red-300 ring-1 ring-red-200 dark:border-red-600 dark:ring-red-700' : 'border-neutral-300'}`}
          >
            <span className={`${!selected ? 'text-neutral-500 dark:text-slate-400' : ''}`}>{display}</span>
            <ChevronDown size={16} className={`absolute right-2 top-1/2 -translate-y-1/2 ${open ? 'rotate-180' : ''} transition-transform text-neutral-500 dark:text-slate-400`} />
          </button>
        }
      >
        <div className="max-h-56 overflow-auto rounded-lg border border-neutral-200 dark:border-slate-600 bg-white dark:bg-slate-700 shadow-xl w-full">
          {normalized.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors ${isSelected ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-200' : 'hover:bg-neutral-100 dark:hover:bg-slate-600 dark:text-slate-100'}`}
              >
                <span className={`w-4 h-4 inline-flex items-center justify-center ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                  <Check size={14} />
                </span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </Popover>
      {helperText && !error && <div className="mt-1 text-xs text-neutral-500 dark:text-slate-400">{helperText}</div>}
    </div>
  );
};
