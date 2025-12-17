import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { Modal } from '../common/Modal';
import { ChevronDown, Crown } from 'lucide-react';
import { SIDEBAR_SECTIONS } from '../../constants';

const SidebarSection = ({ title, items, icon: Icon }) => {
  const [expanded, setExpanded] = React.useState(true);
  const location = useLocation();

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
      >
        {Icon && <Icon size={14} />}
        <span className="flex-1 text-left">{title}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${expanded ? 'rotate-0' : '-rotate-90'}`}
        />
      </button>

      {expanded && (
        <div className="mt-2 space-y-1">
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                isActive(item.href)
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {item.icon && <item.icon size={16} />}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = () => {
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <div
      className="fixed left-0 top-0 h-screen bg-transparent transition-all duration-300 ease-in-out overflow-y-auto flex flex-col"
      style={{
        width: sidebarOpen ? '220px' : '60px',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      {/* Logo/Brand */}
      <div className="h-[60px] p-4 flex items-center flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            V
          </div>
          {sidebarOpen && <span className="font-bold text-sm whitespace-nowrap">NeuralFlow</span>}
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="p-4 flex-1 overflow-y-auto border-t border-neutral-200 dark:border-neutral-800 ">
        {SIDEBAR_SECTIONS.map((section) => (
          <SidebarSection
            key={section.title}
            title={section.title}
            items={section.items}
            icon={section.icon}
          />
        ))}
      </div>

      {/* Upgrade Banner */}
      {sidebarOpen && (
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex-shrink-0">
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
            <p className="text-xs font-semibold text-orange-900 dark:text-orange-200 mb-2">
              Upgrade to a paid plan to unlock more limits.
            </p>
            <button
              onClick={() => setUpgradeModalOpen(true)}
              className="w-full px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded transition-colors"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      <Modal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        title="Upgrade Plan"
        icon={Crown}
        size="md"
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-lg text-neutral-900 dark:text-neutral-100 font-medium">
              Unlock Premium Features
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We're working on premium plans with advanced features and capabilities to help you build more powerful applications.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-4 border border-primary-200 dark:border-primary-700">
            <p className="text-sm text-primary-900 dark:text-primary-100">
              ✨ Stay tuned for updates on our pricing plans and exclusive features!
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
