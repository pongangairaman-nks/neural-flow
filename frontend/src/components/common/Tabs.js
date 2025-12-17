import React from 'react';

export const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-neutral-200 dark:border-neutral-800">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === tab.id
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
