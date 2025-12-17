import React from 'react';
import { PipelineUI } from '../canvas/PipelineUI';

export const CanvasArea = () => {
  return (
    <div className="flex-1 overflow-hidden bg-white dark:bg-neutral-950" style={{ height: '100%', width: '100%' }}>
      <PipelineUI />
    </div>
  );
};
