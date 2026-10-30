import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ChevronDown, ChevronUp, Shield, Clock, Award, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TrainingJourney: React.FC = () => {
  const { trainingStages } = useData();
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const toggleStep = (step: number) => {
    setExpandedStep(expandedStep === step ? null : step);
  };


  return (
    <section id="journey" className="py-20 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-2">
            <span>Pedagogical Structure</span>
            <span aria-hidden="true">·</span>
            <span>6 Disciplined Stages</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Complete Training Procedure
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our structured step-by-step methodology ensures students progress systematically—building strong stances,
            flawless technique, and ethical resilience without rushing or skipping essential foundations.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* GRAPHIC DESIGN: Visual Martial Arts Pedagogical Pathway Diagram           */}
        {/* ========================================================================= */}
        <div className="mb-10 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-100">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#008A68] font-bold">
                Sequential Pedagogical Architecture
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                The Six Pillars of Mastery (Lộ Trình Võ Học)
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Click any stage to inspect technical requirements
            </span>
          </div>

          {/* Stepper with Connecting Flow Line & Vector Badges */}
          <div className="relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-stone-200 via-emerald-300 to-stone-200 -z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
              {trainingStages.map((stage) => {
                const isSelected = expandedStep === stage.step;

                // Dedicated SVG martial symbol for each stage
                const renderStageIcon = () => {
                  switch (stage.step) {
                    case 1:
                      // Horse stance / Foundation
                      return (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="5" r="2" />
                          <path d="M9 20l3-7 3 7" />
                          <path d="M6 12h12" />
                          <path d="M8 8l4 3 4-3" />
                        </svg>
                      );
                    case 2:
                      // Punch / Hand Strike (Thủ Pháp)
                      return (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                          <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                          <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                        </svg>
                      );
                    case 3:
                      // Kicking Art (Cước Pháp)
                      return (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="8" cy="4" r="2" />
                          <path d="M8 6v6l4 2" />
                          <path d="M8 12l-2 9" />
                          <path d="M12 14l8-6" />
                          <path d="M18 8h3" />
                        </svg>
                      );
                    case 4:
                      // Classical Forms (Quyền - Harmonious Flow)
                      return (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a10 10 0 0 0 0 20" />
                          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                          <circle cx="12" cy="17" r="1.5" fill="none" stroke="currentColor" />
                        </svg>
                      );
                    case 5:
                      // Dual Sparring / Paired Combat (Song Đấu)
                      return (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <line x1="8" y1="11" x2="16" y2="11" />
                          <line x1="12" y1="7" x2="12" y2="15" />
                        </svg>
                      );
                    case 6:
                    default:
                      // Traditional Weaponry (Võ Khí - Staff & Blades)
                      return (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="14.5" y1="17.5" x2="3" y2="6" />
                          <line x1="9.5" y1="6.5" x2="21" y2="18" />
                          <path d="M6 3l3 3-2 2-3-3z" />
                          <path d="M15 12l3 3-2 2-3-3z" />
                        </svg>
                      );
                  }
                };

                return (
                  <motion.button
                    key={stage.step}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setExpandedStep(stage.step)}
                    className={`p-3.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-between min-h-[148px] ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#008A68] shadow-sm ring-2 ring-[#008A68]/30'
                        : 'bg-stone-50/60 border-stone-200 hover:border-stone-300 hover:bg-white'
                    }`}
                  >
                    {/* Stage Vector Emblem */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-xs ${
                        isSelected
                          ? 'bg-[#008A68] text-white shadow-emerald-200'
                          : 'bg-white text-stone-600 border border-stone-200'
                      }`}
                    >
                      {renderStageIcon()}
                    </div>

                    <div className="mt-2 w-full">
                      <span
                        className={`text-[10px] font-mono font-bold tracking-widest uppercase block ${
                          isSelected ? 'text-[#008A68]' : 'text-slate-400'
                        }`}
                      >
                        STAGE 0{stage.step}
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-1">
                        {stage.title}
                      </p>
                      <p className="text-[10px] text-stone-500 font-mono mt-0.5 truncate">
                        {stage.vietnameseTerm}
                      </p>
                    </div>

                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1 ${
                        isSelected ? 'bg-[#008A68]' : 'bg-stone-300'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-4">
          {trainingStages.map((stage) => {
            const isExpanded = expandedStep === stage.step;
            return (
              <div
                key={stage.step}
                className="bg-white border border-stone-200 rounded-lg overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleStep(stage.step)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-stone-50/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="w-8 h-8 rounded-md bg-[#008A68]/10 text-[#008A68] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                      0{stage.step}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                          {stage.title}
                        </h3>
                        <span className="hidden sm:inline text-xs text-slate-400 font-normal">
                          ({stage.vietnameseTerm})
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5 line-clamp-1">
                        {stage.objective}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-[#008A68]" />
                      <span>{stage.durationEstimate}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-stone-100 bg-stone-50/40">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                              <CheckCircle className="w-4 h-4 text-[#008A68]" />
                              Key Focus Areas & Curriculum
                            </h4>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                              {stage.focusAreas.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#008A68] mt-2 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <div className="p-4 bg-white border border-stone-200 rounded-md">
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mb-1">
                                <Award className="w-4 h-4 text-amber-600" />
                                <span>Evaluation & Milestone Criteria</span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {stage.assessmentRequirement}
                              </p>
                            </div>

                            <div className="p-4 bg-white border border-stone-200 rounded-md">
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mb-1">
                                <Shield className="w-4 h-4 text-[#008A68]" />
                                <span>Safety & Protocol Standard</span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {stage.safetyGuidelines}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-stone-200 text-xs text-slate-500 flex items-center justify-between">
                          <span>Vietnamese Technical Nomenclature: {stage.vietnameseTerm}</span>
                          <span className="font-medium text-slate-700">Estimated Duration: {stage.durationEstimate}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Notice: No automatic promotion */}
        <div className="mt-8 p-4 bg-stone-100 border border-stone-200 rounded-lg text-xs text-slate-600 flex items-start gap-3">
          <Shield className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <p>
            <strong>Official Advancement Notice:</strong> Training progression, stage transition, and belt eligibility are subject to demonstrated technical proficiency, attendance regularity, and the approval of authorized Qwan Ki Do examiners. Promotion is never automatic based on time alone.
          </p>
        </div>
      </div>
    </section>
  );
};
