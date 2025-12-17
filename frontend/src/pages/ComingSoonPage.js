import React from 'react';
import { Zap } from 'lucide-react';
import { ICON_MAP } from '../constants';

export const ComingSoonPage = ({ title }) => {
  const iconData = ICON_MAP[title] || { icon: Zap, color: 'from-primary-500 to-primary-600' };
  const IconComponent = iconData.icon;
  const colorClass = iconData.color;

  return (
    <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-10 rounded-full blur-2xl`}></div>
            <div className={`relative bg-gradient-to-br ${colorClass} rounded-full p-5 border border-opacity-20 border-white`}>
              <IconComponent size={40} className="text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
          We're working on something amazing
        </p>

        {/* Description */}
        <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
          This feature will be available soon. Stay tuned for updates!
        </p>

        {/* Decorative line */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary-500"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary-500"></div>
        </div>
      </div>
    </div>
  );
};
