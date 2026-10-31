import React, { useState, useEffect } from 'react';
import {
  MapPin,
  BookOpen,
  Shield,
  Award,
  Users,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Heart,
  Target,
  Trophy,
  Flame,
  Compass,
  School,
  Building2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onExploreClick: () => void;
  onFindCentreClick: () => void;
  onExpansionClick?: () => void;
}

// 5 Light-Themed Banner Slides suited for Odisha students, families, schools & 30-district expansion
interface BannerSlide {
  id: string;
  slideNumber: string;
  tabLabel: string;
  tabIcon: React.ElementType;
  badge: string;
  badgeSubtext: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  colorLine2: string;
  colorLine3: string;
  description: string;
  culturalNoteTitle: string;
  culturalNoteText: string;
  primaryCtaText: string;
  primaryCtaAction: 'findCentre' | 'exploreSyllabus' | 'expandStatewide' | 'viewDistricts';
  secondaryCtaText: string;
  secondaryCtaAction: 'findCentre' | 'exploreSyllabus' | 'expandStatewide' | 'viewDistricts';
  districtPill: string;
  sideCardTitle: string;
  sideCardSubtitle: string;
  sideCardTag: string;
  features: {
    icon: React.ElementType;
    title: string;
    desc: string;
    tagColor: string;
  }[];
  specBadge: {
    title: string;
    sub: string;
  };
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 'youth-discipline',
    slideNumber: '01',
    tabLabel: 'Discipline & Youth',
    tabIcon: Target,
    badge: 'QWANKIDIO ASSOCIATION ODISHA',
    badgeSubtext: 'MARTIAL ARTS. REAL PURPOSE.',
    titleLine1: 'BUILD STRENGTH. DEVELOP',
    titleLine2: 'DISCIPLINE. MASTER SELF-',
    titleLine3: 'DEFENCE.',
    colorLine2: 'text-white',
    colorLine3: 'text-[#E5A93C]',
    description:
      'Welcome to Qwankidio Association Odisha – Empowering individuals through martial arts training, physical fitness, confidence and self-defence education.',
    culturalNoteTitle: 'Odisha’s Warrior Heritage',
    culturalNoteText:
      'Carrying forward the ancient athletic Paika warrior discipline of Odisha with modern Sino-Vietnamese Qwan Ki Do training for health, respect, and character.',
    primaryCtaText: 'JOIN OUR ASSOCIATION',
    primaryCtaAction: 'findCentre',
    secondaryCtaText: 'EXPLORE SYLLABUS',
    secondaryCtaAction: 'exploreSyllabus',
    districtPill: 'Active in Bhubaneswar, Cuttack, Puri, Rourkela & 10+ districts',
    sideCardTitle: 'Core Student Disciplines',
    sideCardSubtitle: 'Character-first syllabus for kids & youth',
    sideCardTag: 'Ages 5 to 60+',
    features: [
      {
        icon: Shield,
        title: 'Practical Self-Defense',
        desc: 'Street awareness, escape grips, and quick reflex techniques.',
        tagColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
      },
      {
        icon: Target,
        title: 'Calm Mental Focus',
        desc: 'Improves school study attention, respect for elders, and daily discipline.',
        tagColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
      },
      {
        icon: Heart,
        title: 'Total Body Fitness & Stamina',
        desc: 'Healthy stamina, flexible joints, and natural athletic energy.',
        tagColor: 'text-red-400 bg-red-950/40 border-red-500/30',
      },
    ],
    specBadge: {
      title: 'State Registered & Certified',
      sub: 'Safe environment · Police vetted instructors · Recognized belt exams',
    },
  },
  {
    id: 'women-self-defense',
    slideNumber: '02',
    tabLabel: "Women's Safety",
    tabIcon: Shield,
    badge: 'Mission Sahasika · Odisha Women Safety Initiative',
    badgeSubtext: 'College & School Outreach',
    titleLine1: 'FEARLESS GIRLS.',
    titleLine2: 'EMPOWERED WOMEN.',
    titleLine3: 'EVERYDAY SAFETY.',
    colorLine2: 'text-rose-700',
    colorLine3: 'text-[#008A68]',
    description:
      'Dedicated practical self-defense workshops for female students, working women, and mothers across Odisha. Learn instinctive escapes, pressure-point strikes, and calm courage in any uncomfortable situation.',
    culturalNoteTitle: 'Safe & Respectful Environment',
    culturalNoteText:
      'All women’s batches are guided with utmost safety and dignity. Dojos feature women safety mentors and specialized situational awareness drills.',
    primaryCtaText: 'Join Women’s Safety Batch',
    primaryCtaAction: 'findCentre',
    secondaryCtaText: 'View Self-Defense Curriculum',
    secondaryCtaAction: 'exploreSyllabus',
    districtPill: 'Special weekend batches in Bhubaneswar, Berhampur & Cuttack',
    sideCardTitle: 'Mission Sahasika Highlights',
    sideCardSubtitle: 'Street-tested practical safety modules',
    sideCardTag: 'Women & Girls Batch',
    features: [
      {
        icon: Shield,
        title: 'Instinctive Grab Releases',
        desc: 'Techniques that use opponent’s force, requiring zero brute physical strength.',
        tagColor: 'text-rose-700 bg-rose-50 border-rose-200',
      },
      {
        icon: Sparkles,
        title: 'Vocal Assertiveness & Posture',
        desc: 'Boundary setting, anti-bullying response, and situational confidence.',
        tagColor: 'text-purple-700 bg-purple-50 border-purple-200',
      },
      {
        icon: Users,
        title: 'School & College Workshops',
        desc: 'Official workshops conducted across colleges and universities in Odisha.',
        tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      },
    ],
    specBadge: {
      title: 'Women Safety Certified Trainers',
      sub: 'Female instructor assistance · Respectful training · Zero compromise on safety',
    },
  },
  {
    id: 'state-championships',
    slideNumber: '03',
    tabLabel: 'State Tournaments',
    tabIcon: Trophy,
    badge: 'Official Odisha State Championships & National Trials',
    badgeSubtext: 'WUKF / WUKQKD Pathway',
    titleLine1: 'COMPETE WITH HONOR.',
    titleLine2: 'EARN STATE MEDALS.',
    titleLine3: 'REPRESENT ODISHA.',
    colorLine2: 'text-amber-700',
    colorLine3: 'text-[#008A68]',
    description:
      'Step onto the tournament tatami with pride. Our official district and state championships provide talented Odisha martial artists a transparent pathway to National Games and international podiums.',
    culturalNoteTitle: 'Recognized Sporting Merit',
    culturalNoteText:
      'Official merit certificates issued by Qwan Ki Do Association Odisha assist students in academic sports quotas and state athletic recognition.',
    primaryCtaText: 'Find Competition Dojos',
    primaryCtaAction: 'findCentre',
    secondaryCtaText: 'Explore Belt Criteria',
    secondaryCtaAction: 'exploreSyllabus',
    districtPill: 'Annual State Championship held at Kalinga Stadium / Cuttack Indoor',
    sideCardTitle: 'Official Championship Divisions',
    sideCardSubtitle: 'Strict safety gear & certified international referees',
    sideCardTag: 'Sub-Junior to Senior',
    features: [
      {
        icon: Trophy,
        title: 'Giao Dau (Combat Sparring)',
        desc: 'Point-based controlled sparring with full protective headgear and chest guards.',
        tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
      },
      {
        icon: Award,
        title: 'Quyen (Form Demonstrations)',
        desc: 'Individual and synchronized team forms showcasing technical perfection.',
        tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
      },
      {
        icon: Flame,
        title: 'Co Vo Dao (Traditional Weapons)',
        desc: 'Mastery of long staff (Bong), double short sticks, and wooden sword forms.',
        tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      },
    ],
    specBadge: {
      title: 'State Association Merit Seal',
      sub: 'Transparent scoring · Electronic scoreboard · Medical team on-site',
    },
  },
  {
    id: 'khi-cong-wellness',
    slideNumber: '04',
    tabLabel: 'Health & Khí Công',
    tabIcon: Heart,
    badge: 'Traditional Sino-Vietnamese Heritage · Tâm – Thể – Trí',
    badgeSubtext: 'Harmony of Mind & Body',
    titleLine1: 'ANCIENT TRADITIONS.',
    titleLine2: 'BREATHING HARMONY.',
    titleLine3: 'LIFELONG WELLNESS.',
    colorLine2: 'text-teal-700',
    colorLine3: 'text-amber-700',
    description:
      'Qwan Ki Do is more than just fighting—it is a lifelong practice of vitality. Learn traditional Khí Công (energy breathing), joint flexibility, and meditative calm for active adults and seniors.',
    culturalNoteTitle: 'Mind, Body & Spirit (Tâm – Thể – Trí)',
    culturalNoteText:
      'Rooted in traditional Asian natural medicine, gentle breathing techniques relieve stress, reduce joint pain, and boost immune resilience for daily work-life balance.',
    primaryCtaText: 'Explore Healthy Living Dojo',
    primaryCtaAction: 'findCentre',
    secondaryCtaText: 'Read Syllabus Details',
    secondaryCtaAction: 'exploreSyllabus',
    districtPill: 'Morning wellness batches open for working professionals & elders',
    sideCardTitle: 'Lifelong Health Benefits',
    sideCardSubtitle: 'Gentle training for flexibility & longevity',
    sideCardTag: 'All Generations',
    features: [
      {
        icon: Heart,
        title: 'Khí Công Breathing Exercises',
        desc: 'Expands lung volume, oxygenates blood, and reduces mental fatigue and stress.',
        tagColor: 'text-teal-700 bg-teal-50 border-teal-200',
      },
      {
        icon: Sparkles,
        title: 'Joint Mobility & Posture Correction',
        desc: 'Counters desk stiffness and bad posture with gentle martial stretches.',
        tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
      },
      {
        icon: Users,
        title: 'Active Senior Practice',
        desc: 'Low-impact movement drills designed for adults up to 60+ years old.',
        tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      },
    ],
    specBadge: {
      title: 'Holistic Martial Lifestyle',
      sub: 'Certified breathing masters · Gentle pacing · Zero prior experience required',
    },
  },
  {
    id: 'odisha-30-districts-expansion',
    slideNumber: '05',
    tabLabel: 'Statewide Expansion',
    tabIcon: Compass,
    badge: 'Mission All-Odisha · ରାଜ୍ୟସ୍ତରୀୟ ପ୍ରସାର ଅଭିଯାନ',
    badgeSubtext: '30 Districts Outreach',
    titleLine1: 'EXPANDING TRAINING.',
    titleLine2: 'ACROSS ALL 30 DISTRICTS.',
    titleLine3: 'EVERY CORNER OF ODISHA.',
    colorLine2: 'text-amber-700',
    colorLine3: 'text-[#008A68]',
    description:
      'Qwan Ki Do Association Odisha is actively establishing training centres, school self-defence curricula, and grassroots youth academies in every district of Odisha. We invite school principals, coaches, and sports clubs to partner with us.',
    culturalNoteTitle: 'Grassroots Odisha Empowerment',
    culturalNoteText:
      'Reaching Western, Southern, Coastal, and Northern Odisha with standardized martial education, certified teachers, and state championship pathways.',
    primaryCtaText: 'Bring Training to Your Town',
    primaryCtaAction: 'expandStatewide',
    secondaryCtaText: 'View 30 Districts Map',
    secondaryCtaAction: 'viewDistricts',
    districtPill: 'Active hubs in 14 districts · Open for school & club tie-ups in all 30 districts',
    sideCardTitle: 'Statewide Expansion Tracks',
    sideCardSubtitle: 'Dedicated support for institutions & instructors',
    sideCardTag: 'All 30 Districts',
    features: [
      {
        icon: School,
        title: 'School & College Curriculum',
        desc: 'P.E. period martial classes, girls safety drills, and zero equipment burden on schools.',
        tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      },
      {
        icon: Building2,
        title: 'Start an Affiliated Dojo',
        desc: 'Bridge certification for martial coaches with exclusive district territorial accreditation.',
        tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
      },
      {
        icon: Users,
        title: 'Rural & Panchayat Camps',
        desc: 'Weekend workshops in block sports complexes and rural youth development grounds.',
        tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
      },
    ],
    specBadge: {
      title: 'Recognized by State Technical Council',
      sub: 'Standardized syllabus · Examiner visits · Official affiliation credentials',
    },
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onFindCentreClick,
  onExpansionClick,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentSlide = BANNER_SLIDES[currentSlideIndex];

  // Auto-play timer (6.5 seconds per slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? BANNER_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const handleActionClick = (action: string) => {
    if (action === 'expandStatewide' || action === 'viewDistricts') {
      if (onExpansionClick) {
        onExpansionClick();
      } else {
        const el = document.getElementById('expansion');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action === 'findCentre') {
      onFindCentreClick();
    } else {
      onExploreClick();
    }
  };

  return (
    <section
      id="hero"
      aria-label="Qwan Ki Do Odisha Hero Banner"
      className="relative bg-[#0B0C0E] text-white overflow-hidden border-b border-white/10 font-['Poppins',sans-serif]"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC MARTIAL ARTIST BACKGROUND IMAGE WITH DRAMATIC DARK GRADIENT  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_martial_artist_1793481886692.jpg"
          alt="Martial arts practitioner in black belt"
          className="w-full h-full object-cover object-right md:object-center opacity-35 filter contrast-125"
        />
        {/* Multi-stage dark vignette & gradient so text is razor sharp */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/90 to-[#0B0C0E]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-[#0B0C0E]/70" />
      </div>

      {/* Traditional Odisha Temple Border Strip (Top Accent) */}
      <div className="relative z-10 w-full h-1 bg-gradient-to-r from-amber-500 via-[#E5252A] to-amber-500 opacity-80" />

      {/* ========================================================================= */}
      {/* 2. MAIN ANIMATED SLIDE VIEWPORT (FRAMER LAYOUT & TYPOGRAPHY)              */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-14 sm:pb-20 min-h-[560px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* ========================================================================= */}
            {/* LEFT: Framer Kicker, Massive Impact Headline & Square Action Buttons      */}
            {/* ========================================================================= */}
            <div className="lg:col-span-7">
              {/* Kicker Headline (Matching Framer screenshot) */}
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#E5A93C] mb-4">
                <span>{currentSlide.badge}</span>
                <span className="text-white/40">/</span>
                <span className="text-stone-300">{currentSlide.badgeSubtext}</span>
              </div>

              {/* Master Headline (Massive, Bold, Condensed, Uppercase) */}
              <h1
                className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-black text-white tracking-tight leading-[0.98] sm:leading-[0.95] mb-5 uppercase"
                style={{ textWrap: 'balance' }}
              >
                <span className="block text-white">{currentSlide.titleLine1}</span>
                <span className={`block ${currentSlide.colorLine2}`}>{currentSlide.titleLine2}</span>
                <span className={`block ${currentSlide.colorLine3}`}>{currentSlide.titleLine3}</span>
              </h1>

              {/* Clean Subtitle */}
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal mb-6 max-w-2xl">
                {currentSlide.description}
              </p>

              {/* Odisha Cultural Connection Box */}
              <div className="bg-[#14161A]/85 border border-white/15 p-3.5 sm:p-4 mb-7 backdrop-blur-md rounded-none shadow-lg">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    <strong className="text-white font-semibold">{currentSlide.culturalNoteTitle}: </strong>
                    {currentSlide.culturalNoteText}
                  </p>
                </div>
              </div>

              {/* Action Buttons - SQUARE CORNERS AS REQUESTED BY USER */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-7">
                {/* Square Red CTA Button */}
                <button
                  onClick={() => handleActionClick(currentSlide.primaryCtaAction)}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#E5252A] hover:bg-[#D01F24] active:bg-[#B8191E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-none shadow-xl hover:shadow-2xl transition-all cursor-pointer whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4 text-white/80" />
                  <span>{currentSlide.primaryCtaText}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Square Secondary Button */}
                <button
                  onClick={() => handleActionClick(currentSlide.secondaryCtaAction)}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-none border border-white/30 hover:border-white shadow-sm transition-all cursor-pointer backdrop-blur-xs whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>{currentSlide.secondaryCtaText}</span>
                </button>
              </div>

              {/* District Availability Pill & Statewide Expansion Link */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="font-semibold text-white">Coverage:</span>
                  <span>{currentSlide.districtPill}</span>
                </div>
                <span className="hidden sm:inline text-stone-600">·</span>
                <button
                  onClick={() => {
                    if (onExpansionClick) {
                      onExpansionClick();
                    } else {
                      const el = document.getElementById('expansion');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 decoration-amber-400 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Expanding Across All 30 Districts &rarr;</span>
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT: Slide Feature Spotlight Card (Dark Glassmorphic Aesthetic)         */}
            {/* ========================================================================= */}
            <div className="lg:col-span-5">
              <div className="bg-[#121316]/90 rounded-none border border-white/15 shadow-2xl p-5 sm:p-6 backdrop-blur-md transition-all">
                {/* Header of Feature Card */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                  <div>
                    <h2 className="text-lg font-bold text-white leading-snug">
                      {currentSlide.sideCardTitle}
                    </h2>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {currentSlide.sideCardSubtitle}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-none bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30 uppercase tracking-wider">
                    {currentSlide.sideCardTag}
                  </span>
                </div>

                {/* 3 Pillar Features for this Slide */}
                <div className="space-y-3">
                  {currentSlide.features.map((feat, fIdx) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div
                        key={fIdx}
                        className="p-3.5 rounded-none bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 border ${feat.tagColor}`}>
                            <FeatIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                              {feat.title}
                            </h3>
                            <p className="text-xs text-stone-400 leading-relaxed mt-0.5">
                              {feat.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Specimen Trust Seal */}
                <div className="mt-4 p-3 bg-white/5 rounded-none border border-white/10 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-none bg-[#E5252A] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-xs font-bold text-white leading-tight">
                      {currentSlide.specBadge.title}
                    </p>
                    <p className="text-[11px] text-stone-400 leading-tight mt-0.5 truncate">
                      {currentSlide.specBadge.sub}
                    </p>
                  </div>
                </div>

                {/* Quick Slide Navigation Dots inside Card footer */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="w-6 h-6 rounded-none flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Previous slide"
                      title="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {BANNER_SLIDES.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentSlideIndex(dotIdx)}
                          className={`h-2 transition-all cursor-pointer rounded-none ${
                            dotIdx === currentSlideIndex
                              ? 'w-6 bg-[#E5252A]'
                              : 'w-2 bg-stone-700 hover:bg-stone-500'
                          }`}
                          aria-label={`Jump to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-6 h-6 rounded-none flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Next slide"
                      title="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={onFindCentreClick}
                    className="font-bold text-[#E5A93C] hover:text-amber-300 underline cursor-pointer text-xs"
                  >
                    Join a Dojo in Odisha →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 4. SLEEK FOUR-PILLAR STATE STATS RIBBON (LOWER FOLD)                      */}
      {/* ========================================================================= */}
      <div className="relative z-10 bg-[#0E0F12] border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center sm:text-left">
            <div className="p-2 border-r border-white/10 last:border-none">
              <p className="text-xl sm:text-2xl font-black text-white">14+ Districts</p>
              <p className="text-xs sm:text-sm font-semibold text-stone-300 mt-0.5">Verified Odisha Dojos</p>
              <p className="text-[11px] text-stone-500">Bhubaneswar, Cuttack & all regions</p>
            </div>

            <div className="p-2 border-r border-white/10 last:border-none">
              <p className="text-xl sm:text-2xl font-black text-[#E5252A]">2,500+</p>
              <p className="text-xs sm:text-sm font-semibold text-stone-300 mt-0.5">Active Practitioners</p>
              <p className="text-[11px] text-stone-500">Kids, youths, girls & adults</p>
            </div>

            <div className="p-2 border-r border-white/10 last:border-none">
              <p className="text-xl sm:text-2xl font-black text-[#E5A93C]">40+ Years</p>
              <p className="text-xs sm:text-sm font-semibold text-stone-300 mt-0.5">Martial Lineage</p>
              <p className="text-[11px] text-stone-500">Established worldwide in 1981</p>
            </div>

            <div className="p-2">
              <p className="text-xl sm:text-2xl font-black text-emerald-400">100% Certified</p>
              <p className="text-xs sm:text-sm font-semibold text-stone-300 mt-0.5">Official State Syllabus</p>
              <p className="text-[11px] text-stone-500">Authorized belt examiners only</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

