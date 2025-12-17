import React from 'react';
import { X } from 'lucide-react';
import { Portal } from './Portal';

export const Modal = ({ isOpen, onClose, title, children, size = 'md', icon: IconComponent }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className={`relative bg-white dark:bg-neutral-800 rounded-xl shadow-2xl ${sizeClasses[size]} w-full overflow-hidden transform transition-all`}>
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {IconComponent && (
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <IconComponent size={24} className="text-white" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {title}
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
