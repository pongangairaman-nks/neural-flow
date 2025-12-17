import React from 'react';
import { CanvasArea } from './CanvasArea';

export const MainBody = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ height: '100%', width: '100%' }}>
      <CanvasArea />
    </div>
  );
};
