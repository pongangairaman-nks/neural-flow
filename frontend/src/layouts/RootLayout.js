import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { MainShell } from '../components/MainShell';

export const RootLayout = ({ headerProps, children }) => {
  return (
    <div className="flex overflow-hidden bg-neutral-100 dark:bg-neutral-900" style={{ height: '100vh', width: '100vw' }}>
      {/* Sidebar - Always mounted with transparent background */}
      <Sidebar />

      {/* Main Shell - Island Design */}
      <div className="flex-1 p-2 overflow-hidden">
        <MainShell headerProps={headerProps}>
          {children}
        </MainShell>
      </div>
    </div>
  );
};
