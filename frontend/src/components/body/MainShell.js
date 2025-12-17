import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { Header } from '../header/Header';
import { MainBody } from './MainBody';

export const MainShell = ({ headerProps, children }) => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <div
      className="flex flex-col flex-1 transition-all duration-300 ease-in-out bg-white dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden"
      style={{
        marginLeft: sidebarOpen ? '220px' : '0',
        height: '100%',
        width: sidebarOpen ? 'calc(100% - 220px)' : '100%',
      }}
    >
      {/* Header */}
      <Header {...headerProps} />

      {/* Main Body */}
      <div className="flex-1 overflow-hidden" style={{ height: '100%', width: '100%' }}>
        {children || <MainBody />}
      </div>
    </div>
  );
};
