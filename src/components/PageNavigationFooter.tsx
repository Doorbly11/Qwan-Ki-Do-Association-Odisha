import React from 'react';
import { ArrowRight, Compass, MapPin, Shield, BookOpen, MessageSquare, Award } from 'lucide-react';

interface PageNavigationFooterProps {
  currentPageId: string;
  onNavigate: (pageId: string) => void;
  nextPage?: {
    id: string;
    label: string;
    desc: string;
  };
}

export const PageNavigationFooter: React.FC<PageNavigationFooterProps> = ({
  currentPageId,
  onNavigate,
  nextPage,
}) => {
  return (
    <section className="bg-stone-50 border-t border-stone-200 py-10 sm:py-14 font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Next Recommended Page Callout if provided */}
        {nextPage && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-amber-50/90 via-white to-emerald-50/90 border border-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Next Section to Explore
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                {nextPage.label}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                {nextPage.desc}
              </p>
            </div>
            <button
              onClick={() => onNavigate(nextPage.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#008A68] hover:bg-[#007256] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all self-start sm:self-auto cursor-pointer"
            >
              <span>Explore {nextPage.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Link Grid across all major sections */}
        <div className="pt-4 border-t border-stone-200/80">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
            Browse All Separate Pages
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {[
              { id: 'about', label: 'About & Lineage', icon: BookOpen },
              { id: 'governing', label: 'Governing Body', icon: Shield },
              { id: 'programmes', label: 'Training Programmes', icon: Award },
              { id: 'centres', label: 'Odisha Dojos', icon: MapPin },
              { id: 'expansion', label: '30 Districts Mission', icon: Compass },
              { id: 'enquiry', label: 'Join / Contact', icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              const isCurrent = currentPageId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  disabled={isCurrent}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold opacity-80 cursor-default'
                      : 'bg-white border-stone-200 text-slate-700 hover:border-[#008A68] hover:text-[#008A68] hover:shadow-2xs'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-2 ${isCurrent ? 'text-[#008A68]' : 'text-stone-400'}`} />
                  <span className="text-xs font-medium leading-snug">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
