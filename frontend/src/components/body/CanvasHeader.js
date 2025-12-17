import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { X, Plus } from 'lucide-react';
import { BodyTopPanel } from './BodyTopPanel';

export const CanvasHeader = () => {
  const bodyTopPanelOpen = useUIStore((state) => state.bodyTopPanelOpen);
  const toggleBodyTopPanel = useUIStore((state) => state.toggleBodyTopPanel);

  return (
    <>
      {/* Body Top Panel - Positioned Over Canvas */}
      {bodyTopPanelOpen && (
        <div className="absolute top-0 left-0 right-0 z-40 shadow-sm border-b border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <BodyTopPanel />
        </div>
      )}

      {/* Toggle Button - Close Icon */}
      {bodyTopPanelOpen && (
        <div className="absolute left-6 z-50 transition-all duration-300" style={{ top: '182px' }}>
          <button
            onClick={toggleBodyTopPanel}
            className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
            aria-label="Close panel"
            title="Close nodes panel"
          >
            <X size={20} className="text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>
      )}

      {/* Toggle Button - Open Icon */}
      {!bodyTopPanelOpen && (
        <div className="absolute left-6 top-6 z-50">
          <button
            onClick={toggleBodyTopPanel}
            className="p-2 bg-neutral-700 dark:bg-neutral-600 hover:bg-neutral-600 dark:hover:bg-neutral-500 rounded-full transition-colors"
            aria-label="Open panel"
            title="Open nodes panel"
          >
            <Plus size={20} className="text-white" />
          </button>
        </div>
      )}
    </>
  );
};
