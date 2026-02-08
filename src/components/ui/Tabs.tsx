import React from 'react';
import { TabType } from '../../types';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { value: TabType; label: string }[] = [
    { value: 'entreprises', label: 'Entreprises' },
    { value: 'freelances', label: 'Experts' }
  ];

  return (
    <div className="flex gap-8 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`pb-3 text-2xl font-bold transition-all duration-200 relative ${activeTab === tab.value
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          {tab.label}
          {activeTab === tab.value && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600"></div>
          )}
        </button>
      ))}
    </div>
  );
};