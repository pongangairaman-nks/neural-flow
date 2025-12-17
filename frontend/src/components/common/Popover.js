import React, { useRef, useEffect } from 'react';

export const Popover = ({ isOpen, onClose, trigger, children, align = 'right', fullWidth = false, contentClassName = '' }) => {
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside, true);
      document.addEventListener('touchstart', handleClickOutside, true);
      document.addEventListener('keydown', handleKeyDown, true);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside, true);
        document.removeEventListener('touchstart', handleClickOutside, true);
        document.removeEventListener('keydown', handleKeyDown, true);
      };
    }
  }, [isOpen, onClose]);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2',
  };

  return (
    <div className="relative inline-block w-full">
      {/* Trigger */}
      <div ref={triggerRef}>
        {trigger}
      </div>

      {/* Popover Content */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute top-full mt-2 ${alignClasses[align]} bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-40 ${fullWidth ? 'min-w-full w-full' : 'min-w-max'} ${contentClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
