import React, { useState } from 'react';
import { Activity, Brain, Users, Compass, Trophy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BenefitsSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'physical' | 'mental' | 'social' | 'safety' | 'pathways'>('physical');

  return (
    <section id="benefits" className="py-20 bg-white border-b border-stone-200">
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
            <span>Holistic Development</span>
            <span aria-hidden="true">·</span>
            <span>Evidence-Based Training</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            The Multi-Dimensional Benefits of Qwan Ki Do
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Martial arts is far more than physical movements. Rooted in disciplined pedagogy, Qwan Ki Do nurtures
            coordination, emotional poise, cooperative respect, and lifelong healthy habits.
          </p>
        </motion.div>

        {/* 5-Pillar Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 rounded-lg max-w-4xl mb-10">
          <button
            onClick={() => setActivePillar('physical')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer ${
              activePillar === 'physical'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 text-[#008A68]" />
            <span>Physical Health</span>
          </button>

          <button
            onClick={() => setActivePillar('mental')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer ${
              activePillar === 'mental'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Brain className="w-4 h-4 text-[#008A68]" />
            <span>Mental Resilience</span>
          </button>

          <button
            onClick={() => setActivePillar('social')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer ${
              activePillar === 'social'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-[#008A68]" />
            <span>Social & Character</span>
          </button>

          <button
            onClick={() => setActivePillar('safety')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer ${
              activePillar === 'safety'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-[#008A68]" />
            <span>Practical Safety</span>
          </button>

          <button
            onClick={() => setActivePillar('pathways')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer ${
              activePillar === 'pathways'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4 text-[#008A68]" />
            <span>Competitive Pathways</span>
          </button>
        </div>

        {/* Pillar Details Container with AnimatePresence */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 sm:p-8 min-h-[300px]">
          <AnimatePresence mode="wait">
            {activePillar === 'physical' && (
              <motion.div
                key="physical"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">
                    Physical Conditioning & Motor Mastery
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    Regular training develops balanced muscular development without excessive wear and tear on young joints.
                    Our warm-ups and stance training integrate isometric stability, cardiovascular fitness, and active flexibility.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Coordination & Bilateral Balance:</strong> Moving simultaneously in multiple planes of motion.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Hip & Joint Mobility:</strong> Safe stretching sequences preventing modern sedentary stiffness.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Aerobic & Anaerobic Endurance:</strong> Gradual stamina building tailored to individual capacity.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-stone-200 space-y-3 shadow-2xs">
                  <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Responsible Scientific Perspective
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Physical adaptations occur through steady, progressive overload over months. We do not claim instant athletic transformations; results stem from personal regularity, adequate hydration, and instructor guidance.
                  </p>
                </div>
              </motion.div>
            )}

            {activePillar === 'mental' && (
              <motion.div
                key="mental"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">
                    Mental Focus & Emotional Regulation
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    In a distraction-heavy world, the dojo provides an environment where single-pointed focus is required.
                    Students practice quiet attention, patient repetition, and emotional composure under challenging physical drills.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Sustained Concentration:</strong> Remembering and executing 30+ step traditional forms (Quyền).
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Emotional Restraint:</strong> Responding with calm control rather than impulsive anger when under pressure.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Earned Self-Efficacy:</strong> Confidence born of actual skill acquisition rather than hollow praise.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-stone-200 space-y-3 shadow-2xs">
                  <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Character Development in Action
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Patience and perseverance (Kiên Nhẫn) are reinforced at every belt evaluation. Students learn that difficulties are temporary hurdles that yield to methodical effort.
                  </p>
                </div>
              </motion.div>
            )}

            {activePillar === 'social' && (
              <motion.div
                key="social"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">
                    Social Responsibility & Sportsmanship
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    The dojo operates as an inclusive, supportive community. Students of different ages, backgrounds, and districts
                    train together with mutual courtesy, learning to communicate and cooperate without friction.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Respect for Elders & Mentors:</strong> Formal salutations (Nghi Thức) honoring teaching wisdom.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Peer Mentorship:</strong> Senior belts actively assisting newer students with equipment and stances.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Sportsmanship Win or Lose:</strong> Congratulating opponents and bowing with grace on tournament mats.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-stone-200 space-y-3 shadow-2xs">
                  <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Anti-Bullying & Inclusivity
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We enforce zero tolerance for cliques or intimidation. Every student is recognized for their unique effort, fostering a safe social haven.
                  </p>
                </div>
              </motion.div>
            )}

            {activePillar === 'safety' && (
              <motion.div
                key="safety"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">
                    Practical Safety & Boundary Education
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    True self-defense is 90% awareness, posture, and de-escalation. We teach students to recognize risk early,
                    assert verbal boundaries, and escape dangerous situations safely.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Situational Awareness:</strong> Recognizing exits, staying alert, and avoiding isolated hazards.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Verbal Boundary Setting:</strong> Strong vocal posture that discourages confrontation.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Release & Safe Evasion:</strong> Breaking grip holds and wrist grabs to immediately seek adult/official assistance.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-stone-200 space-y-3 shadow-2xs">
                  <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Important Ethical Disclaimer
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We strictly avoid sensational promises of "guaranteed invulnerability". Fighting is always the last resort; preservation of life and personal safety is the paramount goal.
                  </p>
                </div>
              </motion.div>
            )}

            {activePillar === 'pathways' && (
              <motion.div
                key="pathways"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">
                    Competitive & Educational Horizons
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    For athletes and instructors wishing to expand their accomplishments, the association provides accredited pathways
                    ranging from district championships to international technical diplomas.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Odisha State Championships:</strong> Official competition in traditional forms and controlled sparring.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>National Squad Selections:</strong> Representation of Odisha at the All India Qwan Ki Do Championships.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong>Referee & Instructor Accreditation:</strong> Valid licenses recognized under the World Union.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-stone-200 space-y-3 shadow-2xs">
                  <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Fair Selection Process
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Selection for state and national teams is conducted through transparent trials open to all registered students meeting the technical rank prerequisites.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
