import React from 'react';
import { Lightbulb } from 'lucide-react';
import { CALLOUT_TONES } from '../../../constants';

export const Callout = ({ title, children, tone = 'info' }) => {
  const tones = CALLOUT_TONES[tone];

  return (
    <div className={`rounded-lg border ${tones.border} ${tones.bg} p-3`}> 
      <div className={`flex items-start gap-2 ${tones.text}`}>
        <Lightbulb size={18} className={tones.icon} />
        <div className="space-y-1">
          {title && <div className="font-semibold">{title}</div>}
          {children && <div className="text-sm">{children}</div>}
        </div>
      </div>
    </div>
  );
};
