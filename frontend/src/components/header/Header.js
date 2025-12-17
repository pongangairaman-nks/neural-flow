import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { Popover } from '../common/Popover';
import { Modal } from '../common/Modal';
import {
  Menu,
  Moon,
  Sun,
  Settings,
  HelpCircle,
  Check,
  BookOpen,
  Headphones,
  AlertCircle,
} from 'lucide-react';

export const Header = ({ title, breadcrumbs, actions, onBreadcrumbChange }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedHelpModal, setSelectedHelpModal] = useState(null);
  const [editingBreadcrumb, setEditingBreadcrumb] = useState(false);
  const [editValue, setEditValue] = useState('');
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  const handleBreadcrumbEdit = () => {
    if (breadcrumbs && breadcrumbs.length > 0) {
      setEditValue(breadcrumbs[breadcrumbs.length - 1].label);
      setEditingBreadcrumb(true);
    }
  };

  const handleBreadcrumbSave = () => {
    if (editValue.trim() && onBreadcrumbChange) {
      onBreadcrumbChange(editValue.trim());
    }
    setEditingBreadcrumb(false);
    setEditValue('');
  };

  const handleBreadcrumbBlur = () => {
    handleBreadcrumbSave();
  };

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <header
      className="h-header-height bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center px-2 gap-4 flex-shrink-0"
    >
      {/* Left Section: Sidebar Toggle + Breadcrumbs */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-neutral-700 dark:text-neutral-300" />
        </button>

        {/* Breadcrumbs / Title */}
        <div className="flex items-center gap-2 min-w-0">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-neutral-400">/</span>}
                    {isLast && editingBreadcrumb ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleBreadcrumbBlur}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleBreadcrumbSave();
                          if (e.key === 'Escape') {
                            setEditingBreadcrumb(false);
                            setEditValue('');
                          }
                        }}
                        autoFocus
                        className="rounded-md bg-indigo-100 text-indigo-900 text-sm font-medium px-2 py-1 outline-none border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:bg-indigo-900/60 dark:text-indigo-200 dark:border-indigo-700 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 transition-all"
                      />
                    ) : (
                      <a
                        href={crumb.href}
                        onClick={isLast ? (e) => {
                          e.preventDefault();
                          handleBreadcrumbEdit();
                        } : undefined}
                        className={`truncate transition-colors ${
                          isLast
                            ? 'text-neutral-900 dark:text-white font-medium cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                        }`}
                      >
                        {crumb.label}
                      </a>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          ) : (
            <h1 className="text-lg font-semibold text-neutral-900 dark:text-white truncate">
              {title || 'Pipeline'}
            </h1>
          )}
        </div>
      </div>

      {/* Right Section: Actions + Theme Toggle */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Check size={14} className="text-green-600 dark:text-green-400" />
          <span className="text-xs font-medium text-green-700 dark:text-green-300 whitespace-nowrap">
            Draft saved
          </span>
        </div>

        {/* Action Buttons */}
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-neutral-200 dark:border-neutral-700">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={action.onClick}
                disabled={action.disabled}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                  action.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                } ${
                  action.variant === 'primary'
                    ? `bg-primary-600 ${!action.disabled ? 'hover:bg-primary-700' : ''} text-white`
                    : action.variant === 'secondary'
                    ? action.id === 'clear'
                      ? `bg-red-100 dark:bg-red-950/40 ${!action.disabled ? 'hover:bg-red-200 dark:hover:bg-red-900/60' : ''} text-red-700 dark:text-red-400`
                      : `bg-neutral-100 dark:bg-neutral-800 ${!action.disabled ? 'hover:bg-neutral-200 dark:hover:bg-neutral-700' : ''} text-neutral-900 dark:text-white`
                    : `text-neutral-600 dark:text-neutral-400 ${!action.disabled ? 'hover:text-neutral-900 dark:hover:text-white' : ''}`
                }`}
              >
                {action.isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {action.icon && <action.icon size={16} />}
                    {action.label}
                  </>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-neutral-700 dark:text-neutral-300" />
          ) : (
            <Sun size={20} className="text-neutral-700 dark:text-neutral-300" />
          )}
        </button>

        {/* Settings Popover */}
        <Popover
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          trigger={
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <Settings size={20} className="text-neutral-700 dark:text-neutral-300" />
            </button>
          }
          align="right"
        >
          <div className="py-2">
            <div className="px-4 py-2">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                Settings
              </p>
            </div>
            <div className="border-t border-neutral-200 dark:border-neutral-700 py-2">
              <p className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400">
                Settings panel coming soon...
              </p>
            </div>
          </div>
        </Popover>

        {/* Help Popover */}
        <Popover
          isOpen={helpOpen}
          onClose={() => setHelpOpen(false)}
          trigger={
            <button
              onClick={() => setHelpOpen(!helpOpen)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <HelpCircle size={20} className="text-neutral-700 dark:text-neutral-300" />
            </button>
          }
          align="right"
        >
          <div className="py-2 w-64">
            <div className="px-4 py-2">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                Help & Support
              </p>
            </div>
            <div className="border-t border-neutral-200 dark:border-neutral-700 py-2 space-y-2">
              <button
                onClick={() => {
                  setHelpOpen(false);
                  setSelectedHelpModal('documentation');
                }}
                className="w-full px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded cursor-pointer transition-colors flex items-center gap-3 text-left"
              >
                <BookOpen size={16} className="text-neutral-600 dark:text-neutral-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Documentation
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Learn how to use
                  </p>
                </div>
              </button>
              <button
                onClick={() => {
                  setHelpOpen(false);
                  setSelectedHelpModal('support');
                }}
                className="w-full px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded cursor-pointer transition-colors flex items-center gap-3 text-left"
              >
                <Headphones size={16} className="text-neutral-600 dark:text-neutral-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Contact Support
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Get help from team
                  </p>
                </div>
              </button>
              <button
                onClick={() => {
                  setHelpOpen(false);
                  setSelectedHelpModal('issue');
                }}
                className="w-full px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded cursor-pointer transition-colors flex items-center gap-3 text-left"
              >
                <AlertCircle size={16} className="text-neutral-600 dark:text-neutral-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Report Issue
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Help us improve
                  </p>
                </div>
              </button>
            </div>
          </div>
        </Popover>
      </div>

      {/* Documentation Modal */}
      <Modal
        isOpen={selectedHelpModal === 'documentation'}
        onClose={() => setSelectedHelpModal(null)}
        title="Documentation"
        icon={BookOpen}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-neutral-600 dark:text-neutral-400">
            Our comprehensive documentation is coming soon. We're preparing detailed guides and tutorials to help you get the most out of NeuralFlow.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700 flex items-start gap-3">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              Stay tuned for in-depth documentation and API references!
            </p>
          </div>
        </div>
      </Modal>

      {/* Support Modal */}
      <Modal
        isOpen={selectedHelpModal === 'support'}
        onClose={() => setSelectedHelpModal(null)}
        title="Contact Support"
        icon={Headphones}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-neutral-600 dark:text-neutral-400">
            Our support team will be available soon to help you with any questions or issues you may encounter.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700 flex items-start gap-3">
            <p className="text-sm text-green-900 dark:text-green-100">
              Support channels will be updated soon!
            </p>
          </div>
        </div>
      </Modal>

      {/* Report Issue Modal */}
      <Modal
        isOpen={selectedHelpModal === 'issue'}
        onClose={() => setSelectedHelpModal(null)}
        title="Report Issue"
        icon={AlertCircle}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-neutral-600 dark:text-neutral-400">
            We appreciate your feedback! The issue reporting system will be available soon to help us improve NeuralFlow.
          </p>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700 flex items-start gap-3">
            <p className="text-sm text-orange-900 dark:text-orange-100">
              Issue tracking will be updated soon!
            </p>
          </div>
        </div>
      </Modal>
    </header>
  );
};
