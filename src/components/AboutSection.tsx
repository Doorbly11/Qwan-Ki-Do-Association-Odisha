import React, { useState } from 'react';
import { Shield, Sparkles, Scale, Heart, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'heritage' | 'founder' | 'philosophy' | 'timeline'>('heritage');

  return (
    <section id="about" className="py-20 bg-white border-b border-stone-200">
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
            <span>Authentic Heritage & Lineage</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1981</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            About Qwan Ki Do (Quán Khí Đạo)
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Qwan Ki Do is a comprehensive Sino-Vietnamese martial art that synthesizes four thousand years
            of Vietnamese martial arts culture (Võ Thuật Cổ Truyền Việt Nam) with Chinese martial traditions.
            It is a discipline of body, mind, and spirit—not a method for uncontrolled combat.
          </p>
        </motion.div>

        {/* Tab Selector (Functional interactive segmented control) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 rounded-lg max-w-2xl mb-10">
          <button
            onClick={() => setActiveTab('heritage')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'heritage'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sino-Vietnamese Heritage
          </button>
          <button
            onClick={() => setActiveTab('founder')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'founder'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Founder & Master
          </button>
          <button
            onClick={() => setActiveTab('philosophy')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'philosophy'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Philosophy & Mindset
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Historical Timeline
          </button>
        </div>

        {/* AnimatePresence for smooth cross-fade between tabs */}
        <AnimatePresence mode="wait">
          {/* Tab Content 1: Sino-Vietnamese Heritage */}
          {activeTab === 'heritage' && (
            <motion.div
              key="heritage"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                  <p>
                    The phrase <strong>Quán Khí Đạo</strong> (Qwan Ki Do) translates to <em>“The Way of Energy and Spirit Cultivation”</em>.
                    It represents an unbroken bridge between ancient martial traditions and contemporary physical education.
                  </p>
                  <p>
                    Rooted in the historical encounters of Chinese and Vietnamese martial masters, Qwan Ki Do encompasses:
                  </p>
                  <ul className="space-y-3 pt-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#008A68] shrink-0 mt-0.5" />
                      <span>
                        <strong>Võ Cổ Truyền (Vietnamese Traditional Roots):</strong> Low rooted stances, sweeping leg techniques (Cước Pháp), evasive circular footwork, and acrobatic scissor kicks (Đòn Chân).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#008A68] shrink-0 mt-0.5" />
                      <span>
                        <strong>Chinese Martial Traditions (Thiếu Lâm & Nga Mi):</strong> Precise hand strikes, palm heel maneuvers, animal mimicry (Tiger, Crane, Monkey, Snake, Dragon), and internal breath cultivation (Khí Công).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#008A68] shrink-0 mt-0.5" />
                      <span>
                        <strong>Cổ Võ Đạo (Classical Weapons):</strong> Systematic study of the traditional long staff (Bổng), short double sticks (Song Côn), and broadsword for senior authorized practitioners.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Crucial distinction box */}
                <div className="p-5 bg-stone-50 border border-stone-200 rounded-lg">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-1">
                    <Scale className="w-4 h-4 text-[#008A68]" />
                    <span>The Fundamental Distinction: Martial Art vs. Uncontrolled Fighting</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Qwan Ki Do teaches that true martial power is manifested through <strong>restraint, emotional mastery, and respect for life</strong>.
                    Unlike unsanctioned brawling or aggressive fighting sports, our training strictly forbids aggression, intimidation, or needless conflict.
                    Physical techniques are practiced within a safe pedagogical framework to nurture health, confidence, and moral integrity.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col">
                <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-sm flex-1 min-h-[320px]">
                  <img
                    src="/src/assets/images/traditional_quyen_form_1792843683402.jpg"
                    alt="Martial arts practitioner executing traditional Sino-Vietnamese Quyen form"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                    <p className="text-xs uppercase tracking-wider text-emerald-300 font-medium">Traditional Quyền Form</p>
                    <p className="font-serif text-lg font-bold">Harmony of Strength and Suppleness</p>
                    <p className="text-xs text-stone-300 mt-1">Preserving ancestral bio-mechanics through mindful solo sequences.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab Content 2: Founder Thày Chưởng Môn */}
          {activeTab === 'founder' && (
            <motion.div
              key="founder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-5">
                <div className="p-6 bg-stone-50 border border-stone-200 rounded-lg text-center">
                  <div className="w-28 h-28 mx-auto rounded-full bg-[#008A68]/10 border-2 border-[#008A68] flex items-center justify-center mb-4">
                    <span className="font-serif text-3xl font-bold text-[#008A68]">PXT</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">Thày Chưởng Môn Phạm Xuân Tòng</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Grandmaster & Founder of Qwan Ki Do</p>
                  <div className="mt-4 pt-4 border-t border-stone-200 text-left text-xs text-slate-600 space-y-2">
                    <p><strong>Born:</strong> 1947 in Ninh Bình, Vietnam</p>
                    <p><strong>Lineage:</strong> Direct disciple of Grandmaster Châu Quan Kỳ</p>
                    <p><strong>Founding Year:</strong> 1981 (Milan, Italy)</p>
                    <p><strong>World Governing Body:</strong> Union Mondiale de Qwan Ki Do</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <h3 className="font-serif text-2xl font-bold text-slate-900">A Life Dedicated to Martial Education</h3>
                <p>
                  Thày Chưởng Môn Phạm Xuân Tòng began his martial journey at a young age in Vietnam. Under the strict tutelage of
                  Grandmaster <strong>Châu Quan Kỳ</strong> (a revered master of Chinese martial traditions who had migrated to Vietnam),
                  young Phạm Xuân Tòng underwent rigorous classical training in traditional animal styles, bone conditioning, and internal energy cultivation.
                </p>
                <p>
                  Upon the passing of his master, and following his relocation to Europe, Master Phạm Xuân Tòng dedicated years to synthesizing
                  his teacher’s teachings with the ancient indigenous Vietnamese martial traditions (Nga Mi, Võ Cổ Truyền, and traditional wrestling).
                </p>
                <p>
                  In <strong>1981</strong>, he formally founded <strong>Qwan Ki Do</strong> to offer a complete, pedagogical, and internationally
                  structured martial art. His life’s work has touched practitioners across Europe, Asia, Africa, and the Americas, emphasizing
                  fraternity, cultural respect, and personal transformation.
                </p>
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-lg text-emerald-900 text-xs sm:text-sm">
                  <em>“A true martial artist does not seek superiority over others; they seek continuous mastery over their own weaknesses and pride.”</em>
                  <p className="mt-1 font-semibold text-right">— Thày Chưởng Môn Phạm Xuân Tòng</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab Content 3: Philosophy & Mindset */}
          {activeTab === 'philosophy' && (
            <motion.div
              key="philosophy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-6 bg-white border border-stone-200 rounded-lg space-y-3 shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-md bg-[#008A68]/10 flex items-center justify-center text-[#008A68]">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">TÂM — Heart & Moral Virtue</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Benevolence, compassion, and humility. The martial artist must cultivate an upright heart that protects the vulnerable,
                  practices forgiveness, and acts with honesty in all worldly relationships.
                </p>
              </div>

              <div className="p-6 bg-white border border-stone-200 rounded-lg space-y-3 shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-md bg-[#008A68]/10 flex items-center justify-center text-[#008A68]">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">THỂ — Physical Mastery</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Stamina, suppleness, agility, and resilient health. Through rigorous physical conditioning, the body becomes a reliable
                  instrument capable of enduring hardship while remaining relaxed and fluid under stress.
                </p>
              </div>

              <div className="p-6 bg-white border border-stone-200 rounded-lg space-y-3 shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-md bg-[#008A68]/10 flex items-center justify-center text-[#008A68]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">TRÍ — Mind & Clarity</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Concentration, critical discernment, and emotional equilibrium. Developing a calm, alert mind that makes wise decisions
                  under pressure without succumbing to anger, rash impulse, or vanity.
                </p>
              </div>
            </motion.div>
          )}

          {/* Tab Content 4: Historical Timeline */}
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="max-w-4xl mx-auto py-4"
            >
              <div className="relative border-l-2 border-[#008A68]/30 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
                <div className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#008A68] border-2 border-white" />
                  <span className="text-xs font-semibold text-[#008A68] uppercase tracking-wider">1957 — Vietnam</span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 mt-0.5">The Meeting of Lineages</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Grandmaster Châu Quan Kỳ encounters young Phạm Xuân Tòng in Tra Vinh, Vietnam, recognizing his potential and initiating him into the classical traditions of the Sino-Vietnamese school.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#008A68] border-2 border-white" />
                  <span className="text-xs font-semibold text-[#008A68] uppercase tracking-wider">1968 — Synthesis Period</span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 mt-0.5">Integration of Vietnamese Ancestral Styles</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Intensive research into ancient Vietnamese martial forms (Võ Thuật Cổ Truyền), weapon sets, and indigenous wrestling, creating a systematic syllabus accessible to modern learners.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#008A68] border-2 border-white" />
                  <span className="text-xs font-semibold text-[#008A68] uppercase tracking-wider">1981 — Europe</span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 mt-0.5">Official Worldwide Founding</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Thày Chưởng Môn Phạm Xuân Tòng officially registers Qwan Ki Do in Milan, establishing international teaching standards and the World Union of Qwan Ki Do.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#008A68] border-2 border-white" />
                  <span className="text-xs font-semibold text-[#008A68] uppercase tracking-wider">2000s — Odisha, India</span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 mt-0.5">Arrival and Foundation in Odisha</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Pioneering senior martial artists establish the Odisha state branch, training teachers, organizing annual district championships, and receiving official recognition under the national federation.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#008A68] border-2 border-white" />
                  <span className="text-xs font-semibold text-[#008A68] uppercase tracking-wider">Today</span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 mt-0.5">Flourishing Statewide Association</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Active affiliated dojos in Bhubaneswar, Cuttack, Puri, Rourkela, Berhampur, Sambalpur, and Balasore producing national champions and empowering youth with authentic martial discipline.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* GRAPHIC DESIGN: Lineage & Heritage Confluence Diagram                     */}
        {/* ========================================================================= */}
        <div className="mt-16 bg-[#FAF9F6] border border-amber-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#008A68] font-bold block mb-1">
              Historical Martial Confluence
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              The Lineage Tree of Qwan Ki Do Odisha
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              How ancient Chinese and Vietnamese disciplines united into our contemporary educational martial art
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {/* Source 1: Vietnamese Roots */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs text-center flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#008A68] border border-emerald-200 mx-auto flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">HERITAGE PILLAR I</span>
                <h4 className="font-serif text-base font-bold text-slate-900 mt-1">Võ Thuật Cổ Truyền</h4>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  4,000 years of indigenous Vietnamese combat science: low evasive stances, acrobatic flying scissors, and traditional unarmed defense.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-[#008A68] font-semibold">
                Ancestral Vietnamese Arts
              </div>
            </div>

            {/* Source 2: Master Châu Quan Kỳ Chinese Traditions */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs text-center flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 mx-auto flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">HERITAGE PILLAR II</span>
                <h4 className="font-serif text-base font-bold text-slate-900 mt-1">Sino-Martial Transmission</h4>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Direct teachings of Grandmaster Châu Quan Kỳ (Thiếu Lâm / Nga Mi): Animal dynamics, nerve conditioning, and internal breath control (Khí Công).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-amber-700 font-semibold">
                Grandmaster Châu Quan Kỳ
              </div>
            </div>

            {/* Synthesized: Qwan Ki Do World & Odisha */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 rounded-xl p-5 border-2 border-[#008A68] shadow-sm text-center flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#008A68] text-white mx-auto flex items-center justify-center mb-3 shadow-xs">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#008A68] uppercase tracking-widest block font-bold">LIVING SYNTHESIS</span>
                <h4 className="font-serif text-base font-bold text-slate-900 mt-1">Qwan Ki Do Odisha</h4>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Synthesized in 1981 by Thày Chưởng Môn Phạm Xuân Tòng. Transmitted to Odisha to instill health, discipline, and non-violent ethics across our districts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200 text-[11px] text-[#008A68] font-bold">
                State Society Registered 1981
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
