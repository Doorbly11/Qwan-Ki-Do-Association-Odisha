import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { RuleItem } from '../types';
import { Search, ShieldAlert, FileText, Download, ChevronDown, AlertOctagon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const RulesSection: React.FC = () => {
  const { rulesAndEtiquette } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>('rule-bowing');

  const filteredRules = rulesAndEtiquette.filter((rule) => {
    const matchesSearch =
      rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rule.summary || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rule.fullRegulation || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === 'all' || rule.category === activeCategory;

    return matchesSearch && matchesCategory;
  });


  const toggleRule = (id: string) => {
    setExpandedRuleId(expandedRuleId === id ? null : id);
  };

  const handleDownloadHandbook = () => {
    const blob = new Blob(
      [
        `QWAN KI DO ASSOCIATION ODISHA\nOFFICIAL DOJO CODE OF CONDUCT & BINDING REGULATIONS\n\n` +
          `Applicable across all affiliated centres in the State of Odisha.\n\n` +
          rulesAndEtiquette.map(
            (r, i: number) =>
              `${i + 1}. ${r.title.toUpperCase()} [${r.isBindingRegulation || (r as any).isBinding ? 'BINDING REGULATION' : 'GUIDELINE'}]\n` +
              `Ref: ${r.officialDocumentRef || (r as any).documentRef || 'General'}\n` +
              `Summary: ${r.summary || (r as any).description}\n` +
              `Full Text: ${r.fullRegulation || (r as any).description}\n\n`
          ).join('') +
          `\n© Qwan Ki Do Association Odisha. All rights reserved. https://qwankidoodisha.com/`
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Qwan_Ki_Do_Odisha_Rules_and_Regulations.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="rules" className="py-20 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-2">
              <span>Discipline & Governance</span>
              <span aria-hidden="true">·</span>
              <span>Dojo Etiquette</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Rules, Regulations & Dojo Code
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Tradition, safety, and mutual respect form the bedrock of Qwan Ki Do. These binding rules protect our practitioners,
              uphold sportsmanship, and ensure every training centre remains a sanctuary of personal growth.
            </p>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadHandbook}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-stone-300 rounded-md hover:bg-stone-50 transition-colors shadow-2xs whitespace-nowrap cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-[#008A68]" />
            <span>Download Official Code (TXT)</span>
          </motion.button>
        </motion.div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 mb-8 space-y-4 shadow-2xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search regulations (e.g. bowing, uniform, bullying, sparring gear, medical...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#008A68] focus:bg-white"
            />
          </div>

          {/* Role Segmented Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100 text-xs">
            <span className="text-slate-400 font-medium mr-1">Filter by Stakeholder:</span>
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#008A68] text-white font-medium'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
            >
              All Code
            </button>
            <button
              onClick={() => setActiveCategory('students')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'students'
                  ? 'bg-[#008A68] text-white font-medium'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
            >
              Students & Youth
            </button>
            <button
              onClick={() => setActiveCategory('parents')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'parents'
                  ? 'bg-[#008A68] text-white font-medium'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
            >
              Parents & Guardians
            </button>
            <button
              onClick={() => setActiveCategory('instructors')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'instructors'
                  ? 'bg-[#008A68] text-white font-medium'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
            >
              Instructors & Masters
            </button>
            <button
              onClick={() => setActiveCategory('competitors')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'competitors'
                  ? 'bg-[#008A68] text-white font-medium'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
            >
              Tournament Athletes
            </button>
            <button
              onClick={() => setActiveCategory('centres')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'centres'
                  ? 'bg-[#008A68] text-white font-medium'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
            >
              Affiliated Centres
            </button>
          </div>
        </div>

        {/* Regulations Accordion List */}
        <div className="space-y-3">
          {filteredRules.map((rule) => {
            const isExpanded = expandedRuleId === rule.id;
            return (
              <div
                key={rule.id}
                className="bg-white border border-stone-200 rounded-lg overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleRule(rule.id)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-stone-50/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="mt-0.5 sm:mt-0">
                      {rule.isBindingRegulation || (rule as any).isBinding ? (
                        <AlertOctagon className="w-4 h-4 text-emerald-800 shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-sm sm:text-base font-bold text-slate-900">
                          {rule.title}
                        </h3>
                        <span className="text-[11px] text-slate-400 capitalize">
                          · {rule.category}
                        </span>
                        {(rule.isBindingRegulation || (rule as any).isBinding) && (
                          <span className="text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded">
                            Binding Regulation
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {rule.summary || (rule as any).description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 ml-3">
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50/40 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <p className="mb-3">{rule.fullRegulation || (rule as any).description}</p>

                        <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-slate-500">
                          <span>Official Reference Code: <strong>{rule.officialDocumentRef || (rule as any).documentRef || 'General Association Directive'}</strong></span>
                          <span className="text-emerald-800 font-medium">Enforced by State Disciplinary Committee</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Complaints and Reporting Information */}
        <div className="mt-10 p-5 bg-white border border-stone-200 rounded-lg text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Disciplinary Concerns & Safety Inquiries:</p>
              <p className="text-slate-500 mt-0.5">
                Any breach of the anti-bullying code, unauthorized teaching claims, or safety issues can be directly reported to the Ethics Commissioner at <a href="mailto:ethics@qwankidoodisha.com" className="text-[#008A68] underline">ethics@qwankidoodisha.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
