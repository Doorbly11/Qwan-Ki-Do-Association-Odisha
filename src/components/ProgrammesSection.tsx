import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Programme } from '../types';
import { Clock, Shield, Target, ArrowRight, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProgrammesSectionProps {
  onSelectProgrammeForEnquiry: (programmeTitle: string) => void;
}

export const ProgrammesSection: React.FC<ProgrammesSectionProps> = ({
  onSelectProgrammeForEnquiry,
}) => {
  const { programmes } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProgrammeModal, setSelectedProgrammeModal] = useState<Programme | null>(null);

  const filteredProgrammes = programmes.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });


  return (
    <section id="programmes" className="py-20 bg-[#FAF9F6] border-b border-stone-200">
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
            <span>Classes For Every Age</span>
            <span aria-hidden="true">·</span>
            <span>Beginner to Advanced</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Training Programmes for Everyone
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our training programmes are designed for all ages—from young children building focus and fitness,
            to teenagers learning practical self-defense, and adults enjoying traditional forms (Quyền) and healthy breathing.
          </p>
        </motion.div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#008A68] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            All Programmes
          </button>
          <button
            onClick={() => setActiveCategory('children')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'children'
                ? 'bg-[#008A68] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Children (Ages 5-12)
          </button>
          <button
            onClick={() => setActiveCategory('youth')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'youth'
                ? 'bg-[#008A68] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Youth & Teens (13-17)
          </button>
          <button
            onClick={() => setActiveCategory('adults')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'adults'
                ? 'bg-[#008A68] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Adult Beginners & Fitness
          </button>
          <button
            onClick={() => setActiveCategory('advanced')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'advanced'
                ? 'bg-[#008A68] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Quyền & Sparring Squad
          </button>
          <button
            onClick={() => setActiveCategory('weapons')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'weapons'
                ? 'bg-[#008A68] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Cổ Võ Đạo (Weapons)
          </button>
        </div>

        {/* Programme Cards Grid with Layout Animations */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProgrammes.map((prog) => (
              <motion.div
                key={prog.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -3 }}
                className="bg-white border border-stone-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-stone-300 transition-shadow hover:shadow-md shadow-xs"
              >
                <div>
                  {/* Optional Image */}
                  {prog.image && (
                    <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
                        {prog.badgeText}
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {!prog.image && (
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-[#008A68] uppercase tracking-wider">
                          {prog.category}
                        </span>
                        <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                          {prog.badgeText}
                        </span>
                      </div>
                    )}

                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
                      {prog.title}
                    </h3>
                    {prog.vietnameseName && (
                      <p className="text-xs text-[#008A68] font-medium mb-3">
                        {prog.vietnameseName}
                      </p>
                    )}

                    <p className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prog.targetAudience}</span>
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {prog.description}
                    </p>

                    {/* Objectives summary */}
                    <div className="space-y-1.5 border-t border-stone-100 pt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Core Learning Outcomes
                      </p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {prog.learningObjectives.slice(0, 2).map((obj, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#008A68] mt-1.5 shrink-0" />
                            <span className="line-clamp-1">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProgrammeModal(prog)}
                    className="text-xs font-semibold text-slate-700 hover:text-[#008A68] underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    View Syllabus & Schedule
                  </button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectProgrammeForEnquiry(prog.title)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for In-Depth Programme Details with Motion Backdrop and Content */}
        <AnimatePresence>
          {selectedProgrammeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedProgrammeModal(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 rounded-md cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>

                <div className="mb-4">
                  <span className="text-xs font-semibold text-[#008A68] uppercase tracking-wider">
                    {selectedProgrammeModal.badgeText}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                    {selectedProgrammeModal.title}
                  </h3>
                  {selectedProgrammeModal.vietnameseName && (
                    <p className="text-xs text-slate-500">{selectedProgrammeModal.vietnameseName}</p>
                  )}
                </div>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {selectedProgrammeModal.description}
                </p>

                {/* 4-Stage Session Structure */}
                <div className="mb-6 p-4 bg-stone-50 border border-stone-200 rounded-lg">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#008A68]" />
                    Typical Class Session Breakdown ({selectedProgrammeModal.sessionStructure.duration})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                    <div className="p-2.5 bg-white rounded border border-stone-200">
                      <span className="font-semibold text-slate-800 block">1. Warm-Up & Mobility:</span>
                      {selectedProgrammeModal.sessionStructure.warmup}
                    </div>
                    <div className="p-2.5 bg-white rounded border border-stone-200">
                      <span className="font-semibold text-slate-800 block">2. Technical Focus:</span>
                      {selectedProgrammeModal.sessionStructure.technicalFocus}
                    </div>
                    <div className="p-2.5 bg-white rounded border border-stone-200">
                      <span className="font-semibold text-slate-800 block">3. Conditioning:</span>
                      {selectedProgrammeModal.sessionStructure.conditioning}
                    </div>
                    <div className="p-2.5 bg-white rounded border border-stone-200">
                      <span className="font-semibold text-slate-800 block">4. Cool-Down & Code:</span>
                      {selectedProgrammeModal.sessionStructure.cooldown}
                    </div>
                  </div>
                </div>

                {/* Learning Objectives */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#008A68]" />
                    Key Educational Goals
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 pl-4 list-disc marker:text-[#008A68]">
                    {selectedProgrammeModal.learningObjectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                {/* Safety Requirements */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-700" />
                    Safety Protocols & Equipment
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc marker:text-emerald-600">
                    {selectedProgrammeModal.safetyRequirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Actions in modal */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedProgrammeModal(null)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Close
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const title = selectedProgrammeModal.title;
                      setSelectedProgrammeModal(null);
                      onSelectProgrammeForEnquiry(title);
                    }}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded-md transition-colors cursor-pointer"
                  >
                    Book Free Trial for this Class
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
