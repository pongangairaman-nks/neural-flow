import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { Search } from 'lucide-react';
import { NodeTile } from '../common/NodeTile';
import { NODE_TABS, NODES_BY_CATEGORY } from '../../constants';

export const BodyTopPanel = () => {
  const bodyTopPanelOpen = useUIStore((state) => state.bodyTopPanelOpen);
  const [activeTab, setActiveTab] = useState('nodes');
  const [searchQuery, setSearchQuery] = useState('');

  const currentNodes = NODES_BY_CATEGORY[activeTab] || [];
  
  const filteredNodes = currentNodes.filter((node) =>
    node.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-neutral-900">
      {/* Expanded State - Full Panel */}
      {bodyTopPanelOpen && (
        <>
          {/* Search and Tabs in Single Line */}
          <div className="flex items-center gap-6 px-4 py-0 bg-white dark:bg-neutral-900">
            {/* Search Input */}
            <div className="relative w-48 flex-shrink-0 py-3">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
              />
              <input
                type="text"
                placeholder="Search Nodes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 transition-colors"
              />
            </div>

            {/* Tabs */}
            <div className="flex-1 pb-1 flex items-center h-full">
              {NODE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap h-full flex items-center ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Panel Content - Horizontal Scrollable List */}
          <div className="px-4 py-3 overflow-x-auto overflow-y-hidden">
            {filteredNodes.length > 0 ? (
              <div className="flex gap-4">
                {filteredNodes.map((node) => (
                  <NodeTile
                    key={node.type}
                    type={node.type}
                    label={node.label}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  No nodes found
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
