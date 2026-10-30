import React, { useState } from 'react';
import { Megaphone, ArrowRight, X } from 'lucide-react';
import { useData } from '../context/DataContext';

interface AnnouncementBarProps {
  onNavigateToEvents: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigateToEvents }) => {
  const { announcementText, announcementVisible } = useData();
  const [dismissed, setDismissed] = useState(false);

  if (!announcementVisible || dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Official Association Announcement Banner"
      className="relative bg-amber-50 text-amber-950 text-xs sm:text-sm py-2 px-4 border-b border-amber-200 transition-colors z-50 shadow-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Dispatch badge in light warm style */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 border border-amber-300 shrink-0">
            <Megaphone className="w-3 h-3 text-amber-700 animate-pulse" />
            <span>Notice</span>
          </span>

          <p className="truncate text-slate-800 text-xs sm:text-sm">
            <span className="font-semibold text-slate-900">State Update:</span>{' '}
            {announcementText}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToEvents}
            className="group inline-flex items-center gap-1 text-xs font-semibold text-[#008A68] hover:text-[#007256] underline transition-colors cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </button>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="p-1 rounded text-stone-500 hover:text-slate-900 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
