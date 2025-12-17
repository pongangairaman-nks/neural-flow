import React from 'react';
import { Maximize2, Minimize2, XCircle, FileText, Cpu, LogIn, LogOut, MessageSquare } from 'lucide-react';

const iconByKind = {
  customInput: LogIn,
  customOutput: LogOut,
  text: FileText,
  llm: Cpu,
  chat: MessageSquare,
};

export const NodeHeader = ({ kind, title, collapsed = false, onExpand, onClose }) => {
  const Icon = iconByKind[kind] || FileText;
  return (
    <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 flex items-center justify-between text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-200">
      <div className="flex items-center gap-2">
        <Icon size={18} className="text-indigo-700 dark:text-indigo-400" />
        <span className="font-semibold text-sm">{title}</span>
      </div>
      <div className="flex items-center gap-2 text-neutral-600 dark:text-slate-400">
        <button aria-label={collapsed ? 'Expand' : 'Collapse'} onClick={onExpand} className="hover:text-neutral-800 dark:hover:text-slate-200 transition-colors">
          {collapsed ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
        </button>
        <button aria-label="Close" onClick={onClose} className="hover:text-neutral-800 dark:hover:text-slate-200 transition-colors"><XCircle size={16} /></button>
      </div>
    </div>
  );
};
