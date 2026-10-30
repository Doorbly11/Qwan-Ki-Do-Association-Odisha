import React from 'react';
import { ChevronRight, Home, ArrowLeft, Shield } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  onBackToHome: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  subtitle,
  onBackToHome,
  actionButton,
}) => {
  const ActionIcon = actionButton?.icon;

  return (
    <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FAF8F5] border-b border-amber-200/80 pt-8 pb-10 sm:py-12 relative overflow-hidden font-['Poppins',sans-serif]">
      {/* Subtle Odia Geometric Motif Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(180, 83, 9, 0.08) 1.5px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Traditional Odisha Temple Border Strip at Top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-[#008A68] to-amber-600 opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500 mb-4 sm:mb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 font-medium text-stone-600 hover:text-[#008A68] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-semibold text-slate-900 truncate">{title}</span>
        </nav>

        {/* Header Content Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-semibold mb-3.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#008A68] animate-pulse" />
              <span>{badge}</span>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {title}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {subtitle}
            </p>
          </div>

          {/* Quick Actions (Back to Home + Optional Action) */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-stone-50 text-slate-700 text-xs font-medium border border-stone-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-stone-500" />
              <span>Back to Home</span>
            </button>

            {actionButton && (
              <button
                onClick={actionButton.onClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                {ActionIcon && <ActionIcon className="w-3.5 h-3.5" />}
                <span>{actionButton.label}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
