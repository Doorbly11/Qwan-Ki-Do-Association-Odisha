import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BeltRank } from '../types';
import { ShieldAlert, Award, Clock, UserCheck, BookOpen, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BeltRankExplorer: React.FC = () => {
  const { beltRanks } = useData();
  const [selectedRankId, setSelectedRankId] = useState<string>('white-sash');
  const [filterCategory, setFilterCategory] = useState<'all' | 'junior' | 'senior' | 'master'>('all');

  const selectedRank = beltRanks.find((r) => r.id === selectedRankId) || beltRanks[0] || {
    id: 'default',
    name: 'Belt Rank',
    vietnameseName: '',
    category: 'junior',
    sashColor: '#008A68',
    stripeColor: 'transparent',
    stripesCount: 0,
    minTrainingMonths: 3,
    audience: 'All Students',
    requirements: { techniques: [], quyen: [], conditioning: '', philosophy: '' },
  };

  const filteredRanks = beltRanks.filter((r) => {
    if (filterCategory === 'all') return true;
    return r.category === filterCategory;
  });


  return (
    <section id="belts" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-2">
            <span>Syllabus & Insignia</span>
            <span aria-hidden="true">·</span>
            <span>Traditional Sash System</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Belt & Rank Explorer
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            In Qwan Ki Do, rank insignia reflects personal transformation, perseverance, and adherence to martial virtue.
            Our traditional grading system preserves the Sino-Vietnamese sash heritage—advancing from the pure White Sash (Bạch Đai) through progressive Cấp grades to Black Belt (Đẳng).
          </p>
        </motion.div>

        {/* Mandatory Statutory Notice */}
        <div className="mb-8 p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#008A68] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            <span className="font-semibold">Official Grading Notice:</span> Rank progression, eligibility, and certification are subject to the official grading syllabus and approval of authorized Qwan Ki Do examiners.
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-[#008A68] text-white'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
            }`}
          >
            All Ranks ({beltRanks.length})
          </button>
          <button
            onClick={() => setFilterCategory('junior')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterCategory === 'junior'
                ? 'bg-[#008A68] text-white'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
            }`}
          >
            Initiation & Cấp Grades (White Sash + Stripes)
          </button>
          <button
            onClick={() => setFilterCategory('senior')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterCategory === 'senior'
                ? 'bg-[#008A68] text-white'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
            }`}
          >
            Senior & Black Sash Ranks (Lam Đai & Huyền Đai)
          </button>
          <button
            onClick={() => setFilterCategory('master')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterCategory === 'master'
                ? 'bg-[#008A68] text-white'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
            }`}
          >
            Master Rank (Hồng Đai)
          </button>
        </div>

        {/* Interactive Explorer Layout: Left Sash Selection Rail, Right Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Sash List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredRanks.map((rank) => {
              const isSelected = selectedRankId === rank.id;
              return (
                <motion.button
                  key={rank.id}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedRankId(rank.id)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-stone-50 border-[#008A68] ring-1 ring-[#008A68] shadow-xs'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {/* Sash Visual Representation */}
                  <div
                    className="w-10 h-10 rounded-md border border-stone-300 flex items-center justify-center relative overflow-hidden shrink-0 shadow-xs"
                    style={{ backgroundColor: rank.sashColor }}
                  >
                    {/* Render yellow/red accent stripes */}
                    {rank.accentStripes && rank.accentStripes.count > 0 && (
                      <div className="flex gap-1 items-center justify-center w-full h-full">
                        {Array.from({ length: rank.accentStripes.count }).map((_, idx) => (
                          <div
                            key={idx}
                            className="w-1.5 h-full"
                            style={{ backgroundColor: rank.accentStripes?.color }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm font-semibold truncate ${isSelected ? 'text-[#008A68]' : 'text-slate-900'}`}>
                      {rank.rankName}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {rank.vietnameseTitle}
                    </p>
                  </div>

                  <span className="text-[11px] font-mono tabular-nums text-slate-400 shrink-0">
                    {rank.durationMinMonths}m+
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Selected Rank In-Depth Panel with AnimatePresence */}
          <div className="lg:col-span-7 bg-stone-50/70 border border-stone-200 rounded-xl p-6 sm:p-8 min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRank.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="capitalize">{selectedRank.category} Division</span>
                      <span aria-hidden="true">·</span>
                      <span>Minimum Age: {selectedRank.minAgeYears} Years</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                      {selectedRank.rankName}
                    </h3>
                    <p className="text-sm font-medium text-[#008A68] mt-1">
                      Vietnamese Rank: {selectedRank.vietnameseTitle}
                    </p>
                  </div>

                  {/* Detailed SVG Traditional Sash Graphic */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-xs">
                      <svg
                        width="180"
                        height="56"
                        viewBox="0 0 180 56"
                        className="overflow-visible"
                        aria-label={`Official ${selectedRank.rankName} sash graphic`}
                      >
                        <defs>
                          <linearGradient id={`sashGrad-${selectedRank.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={selectedRank.sashColor} stopOpacity="0.85" />
                            <stop offset="50%" stopColor={selectedRank.sashColor} stopOpacity="1" />
                            <stop offset="100%" stopColor={selectedRank.sashColor} stopOpacity="0.9" />
                          </linearGradient>
                          <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#D97706" />
                            <stop offset="50%" stopColor="#F59E0B" />
                            <stop offset="100%" stopColor="#B45309" />
                          </linearGradient>
                          <pattern id="sashWeave" width="4" height="4" patternUnits="userSpaceOnUse">
                            <path d="M 0 4 L 4 0 M 0 0 L 4 4" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                          </pattern>
                        </defs>

                        {/* Outer Sash Border / Drop shadow */}
                        <rect x="2" y="8" width="176" height="40" rx="6" fill="#1E293B" opacity="0.12" transform="translate(0, 2)" />

                        {/* Main Sash Body */}
                        <rect
                          x="2"
                          y="8"
                          width="176"
                          height="40"
                          rx="6"
                          fill={`url(#sashGrad-${selectedRank.id})`}
                          stroke={selectedRank.sashColor === '#FFFFFF' ? '#CBD5E1' : '#0F172A'}
                          strokeWidth="1.2"
                        />
                        <rect x="2" y="8" width="176" height="40" rx="6" fill="url(#sashWeave)" />

                        {/* Gold Border Trims on Top & Bottom for Senior & Master */}
                        {(selectedRank.category === 'senior' || selectedRank.category === 'master') && (
                          <>
                            <line x1="2" y1="11" x2="178" y2="11" stroke="url(#goldTrim)" strokeWidth="1.8" />
                            <line x1="2" y1="45" x2="178" y2="45" stroke="url(#goldTrim)" strokeWidth="1.8" />
                          </>
                        )}

                        {/* Silk Central Stitching Line */}
                        <line x1="4" y1="28" x2="176" y2="28" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 3" />

                        {/* Rank Degree Accent Stripes (Cấp / Đẳng bars) */}
                        {selectedRank.accentStripes && selectedRank.accentStripes.count > 0 && (
                          <g transform="translate(20, 8)">
                            {Array.from({ length: selectedRank.accentStripes.count }).map((_, idx) => (
                              <g key={idx} transform={`translate(${idx * 14}, 0)`}>
                                <rect
                                  x="0"
                                  y="0"
                                  width="7"
                                  height="40"
                                  fill={selectedRank.accentStripes?.color || '#F59E0B'}
                                  stroke="#000000"
                                  strokeOpacity="0.2"
                                  strokeWidth="0.5"
                                />
                                <line x1="1" y1="0" x2="1" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                              </g>
                            ))}
                          </g>
                        )}

                        {/* Traditional Vietnamese Martial Arts Seal Emblem on Right */}
                        <g transform="translate(142, 14)">
                          <circle cx="14" cy="14" r="13" fill="#FFFDF9" stroke="#D97706" strokeWidth="1.2" />
                          <circle cx="14" cy="14" r="10.5" fill="none" stroke="#D97706" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
                          {/* Sino-Vietnamese Ki / Chi (氣) Stylized Character */}
                          <text
                            x="14"
                            y="18"
                            fontSize="9"
                            fontFamily="serif"
                            fontWeight="bold"
                            textAnchor="middle"
                            fill="#B45309"
                          >
                            氣
                          </text>
                        </g>

                        {/* Traditional Silk Sash Fringed Ends Graphic on Left */}
                        <g transform="translate(4, 12)">
                          <line x1="0" y1="0" x2="0" y2="32" stroke="#D97706" strokeWidth="1.5" />
                          <line x1="2" y1="0" x2="2" y2="32" stroke="#F59E0B" strokeWidth="1" strokeDasharray="1 1" />
                        </g>
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-stone-500">
                      Authentic Insignia Spec · {selectedRank.vietnameseTitle}
                    </span>
                  </div>
                </div>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-b border-stone-200">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#008A68] shrink-0" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400">Min. Practice</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">{selectedRank.durationMinMonths} Months</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4 text-[#008A68] shrink-0" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400">Min. Age</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">{selectedRank.minAgeYears} Years</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400">Authority</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">Technical Board</p>
                    </div>
                  </div>
                </div>

                {/* Syllabus & Exam Points */}
                <div className="py-6 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#008A68]" />
                      Technical Syllabus Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                      {selectedRank.syllabusHighlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded border border-stone-200/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#008A68] mt-2 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#008A68]" />
                      Examination & Promotion Criteria
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 pl-4 list-disc marker:text-[#008A68]">
                      {selectedRank.examinationCriteria.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Seniority & Conduct Responsibility
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {selectedRank.responsibilities}
                    </p>
                  </div>

                  {selectedRank.officialNote && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900">
                      {selectedRank.officialNote}
                    </div>
                  )}
                </div>

                {/* Reconciliation Note between Odisha & World Union */}
                <div className="pt-4 border-t border-stone-200 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Technical Alignment:</span> Syllabus and rank nomenclature comply with the regulations of the World Union of Qwan Ki Do. Any local variances are reviewed annually by the State Technical Director.
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GRAPHIC DESIGN: Traditional Sash Hierarchy & Progression Matrix           */}
        {/* ========================================================================= */}
        <div className="mt-16 bg-[#FAF9F6] border border-amber-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-amber-200/60">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Visual Syllabus Architecture</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                Sino-Vietnamese Sash Progression Hierarchy
              </h3>
            </div>
            <div className="text-xs text-stone-500 font-mono">
              Qwan Ki Do Association Odisha · Official Matrix
            </div>
          </div>

          {/* 4 Graphic Sash Stage Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stage 1: White Sash */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                {/* SVG Mini Sash Graphic */}
                <div className="h-10 w-full rounded-md border border-stone-300 bg-white flex items-center justify-center relative overflow-hidden mb-3 shadow-inner">
                  <div className="flex gap-2 items-center">
                    <span className="w-1.5 h-full bg-amber-400 opacity-80" />
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">BẠCH ĐAI</span>
                    <span className="w-1.5 h-full bg-amber-400 opacity-80" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>STAGE 01</span>
                  <span>0–24 MOS</span>
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900">
                  White Sash & Cấp Grades
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  The clean seed. Beginners learn solid stances (Tấn), basic punches, foundational kicks, and first traditional solo forms (Quyền).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#008A68] font-medium">
                <span>1st to 4th Cấp</span>
                <span>Foundational</span>
              </div>
            </div>

            {/* Stage 2: Blue Sash */}
            <div className="bg-white rounded-xl p-5 border border-sky-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-10 w-full rounded-md border border-sky-400 bg-[#0284C7] flex items-center justify-center relative overflow-hidden mb-3 shadow-inner">
                  <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold">LAM ĐAI</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-sky-600 mb-1">
                  <span>STAGE 02</span>
                  <span>2–4 YEARS</span>
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900">
                  Blue Sash (Lam Đai)
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Represents the vastness of the sky and ocean depth. Emphasizes agility, continuous dynamic combinations, and intermediate weaponry (Bong).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-[11px] text-sky-700 font-medium">
                <span>Intermediate Rank</span>
                <span>Assistant Level</span>
              </div>
            </div>

            {/* Stage 3: Black Sash */}
            <div className="bg-white rounded-xl p-5 border border-stone-300 shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-10 w-full rounded-md border border-stone-800 bg-[#0F172A] flex items-center justify-center relative overflow-hidden mb-3 shadow-inner">
                  <div className="w-full flex items-center justify-between px-3">
                    <span className="w-1 h-6 bg-amber-400" />
                    <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold">HUYỀN ĐAI</span>
                    <span className="w-1 h-6 bg-amber-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1">
                  <span>STAGE 03</span>
                  <span>4–10+ YEARS</span>
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900">
                  Black Belt (Đẳng Degrees)
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Deep maturity and humility. Practitioners master complex animal styles, paired combat (Song Đấu), internal energy (Khí), and pedagogical coaching.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-800 font-medium">
                <span>1st to 4th Đẳng</span>
                <span>Licensed Instructor</span>
              </div>
            </div>

            {/* Stage 4: Master Rank */}
            <div className="bg-white rounded-xl p-5 border border-rose-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-10 w-full rounded-md border border-rose-400 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 flex items-center justify-center relative overflow-hidden mb-3 shadow-inner">
                  <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold">HỒNG ĐAI</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-rose-600 mb-1">
                  <span>STAGE 04</span>
                  <span>15+ YEARS</span>
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900">
                  Master Rank (Hồng Đai)
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  The red and gold insignia reserved for senior masters (Võ Sư). Reflects lifelong commitment to lineage transmission and state association leadership.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-[11px] text-rose-700 font-medium">
                <span>5th Đẳng & Above</span>
                <span>State Technical Board</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
