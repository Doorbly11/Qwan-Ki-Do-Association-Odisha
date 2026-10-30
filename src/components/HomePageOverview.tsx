import React from 'react';
import { Hero } from './Hero';
import {
  BookOpen,
  Shield,
  Layers,
  Award,
  MapPin,
  Compass,
  FileText,
  UserCheck,
  Heart,
  Calendar,
  Image,
  MessageSquare,
  ArrowRight,
  School,
  Building2,
  ChevronRight,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageOverviewProps {
  onNavigate: (pageId: string) => void;
  onOpenBooking: () => void;
}

export const HomePageOverview: React.FC<HomePageOverviewProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const PAGE_CARDS = [
    {
      id: 'about',
      badge: 'Heritage & Lineage',
      title: 'About Qwan Ki Do',
      description: 'Sino-Vietnamese martial traditions, Master Pham Xuan Tong, and 40+ years of martial history.',
      icon: BookOpen,
      iconColor: 'text-[#008A68]',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'governing',
      badge: 'Official Credentials',
      title: 'Governing Body & Leadership',
      description: 'Executive committee, technical directorate, district officers, and registered state recognition.',
      icon: Shield,
      iconColor: 'text-amber-700',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-200',
    },
    {
      id: 'programmes',
      badge: 'All Age Groups',
      title: 'Training Programmes',
      description: 'Children vo-sinh, youth sport combat, adult self-defense, Co Vo Dao weapons, and Khí Công wellness.',
      icon: Layers,
      iconColor: 'text-blue-700',
      bgColor: 'bg-blue-50/60',
      borderColor: 'border-blue-200',
    },
    {
      id: 'journey',
      badge: 'Syllabus Path',
      title: '6-Stage Training Journey',
      description: 'Structured path from white sash novice through black belt and master technical degree levels.',
      icon: UserCheck,
      iconColor: 'text-purple-700',
      bgColor: 'bg-purple-50/60',
      borderColor: 'border-purple-200',
    },
    {
      id: 'belts',
      badge: 'Grading & Stripes',
      title: 'Belt & Rank Explorer',
      description: 'Traditional sash system, yellow stripes, examination rules, time-in-grade, and insignias.',
      icon: Award,
      iconColor: 'text-amber-800',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-200',
    },
    {
      id: 'centres',
      badge: 'District Dojos',
      title: 'Odisha Centres & Dojos',
      description: 'Authorized centres in Bhubaneswar, Cuttack, Puri, Rourkela, Berhampur, Sambalpur, and Balasore.',
      icon: MapPin,
      iconColor: 'text-[#008A68]',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'expansion',
      badge: 'Statewide Mission',
      title: 'Mission 30 Districts Expansion',
      description: 'Active expansion initiative to establish training centres and school curricula across all 30 districts.',
      icon: Compass,
      iconColor: 'text-amber-700',
      bgColor: 'bg-amber-100/70',
      borderColor: 'border-amber-300',
    },
    {
      id: 'rules',
      badge: 'Code of Conduct',
      title: 'Rules & Dojo Etiquette',
      description: 'Official dojo discipline, salutation (Bái), safety standards, training uniform guidelines, and ethics.',
      icon: FileText,
      iconColor: 'text-slate-700',
      bgColor: 'bg-stone-50',
      borderColor: 'border-stone-200',
    },
    {
      id: 'instructors',
      badge: 'Black Belt Standards',
      title: 'Instructor Certification',
      description: 'Official coaching eligibility, state examiner accreditations, and national federation licensing.',
      icon: UserCheck,
      iconColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'benefits',
      badge: 'Health & Mind',
      title: 'Benefits of Training',
      description: 'Physical agility, mental clarity, anti-bullying defense, women empowerment, and vitality.',
      icon: Heart,
      iconColor: 'text-rose-700',
      bgColor: 'bg-rose-50/60',
      borderColor: 'border-rose-200',
    },
    {
      id: 'gallery',
      badge: 'Photo Archive',
      title: 'Official Image Gallery',
      description: 'Documentary photo archive with headlines across state championships, belt ceremonies, and dojo training.',
      icon: Image,
      iconColor: 'text-blue-700',
      bgColor: 'bg-blue-50/60',
      borderColor: 'border-blue-200',
    },
    {
      id: 'enquiry',
      badge: 'Admissions & Help',
      title: 'Admissions & Contact',
      description: 'Direct student enrollment, school affiliation request, state secretary desk, and FAQ guidance.',
      icon: MessageSquare,
      iconColor: 'text-[#008A68]',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
    },
  ];

  return (
    <div className="font-['Poppins',sans-serif]">
      {/* 1. Hero Banner with 5 Auto-Playing Light Themed Slides */}
      <Hero
        onExploreClick={() => onNavigate('about')}
        onFindCentreClick={() => onNavigate('centres')}
        onExpansionClick={() => onNavigate('expansion')}
      />

      {/* 2. Statewide Expansion Banner Spotlight (Connecting to All 30 Districts) */}
      <section className="bg-gradient-to-r from-amber-50 via-white to-amber-50/80 border-b border-amber-200/90 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-amber-300 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6 text-amber-700 animate-spin-slow" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold mb-1.5 border border-amber-300">
                  <span>ରାଜ୍ୟସ୍ତରୀୟ ପ୍ରସାର ଅଭିଯାନ</span>
                  <span>·</span>
                  <span>MISSION ALL-ODISHA</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  Expanding Standardized Training Across All 30 Districts of Odisha
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                  We are actively establishing school tie-ups, club affiliations, and district coordinator centres
                  in Mayurbhanj, Koraput, Balangir, Sambalpur, Ganjam, and beyond.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('expansion')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <span>Explore 30-District Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('centres')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-stone-50 text-slate-700 text-xs sm:text-sm font-medium border border-stone-300 shadow-2xs transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#008A68]" />
                <span>View Existing Dojos</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Pages Directory Grid */}
      <section className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Qwan Ki Do Odisha
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PAGE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => onNavigate(card.id)}
                  className="group bg-white rounded-2xl border border-stone-200 hover:border-[#008A68] p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${card.bgColor} border ${card.borderColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        <Icon className={`w-5 h-5 ${card.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#008A68] transition-colors leading-snug mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#008A68] group-hover:text-[#007256]">
                    <span>Open Dedicated Page</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Leadership & Official Recognition Highlight Strip */}
      <section className="py-12 sm:py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-3">
                <Shield className="w-3.5 h-3.5 text-amber-700" />
                <span>State Governing Authority</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Recognized Leadership & Transparent Administration
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Registered under Societies Registration Act XXI of 1860, Qwan Ki Do Association Odisha governs
                all district competitions, official syllabus certifications, and technical examinations across the state.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#008A68] shrink-0" />
                  <span>State Government Sports Registration</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#008A68] shrink-0" />
                  <span>Affiliated with Qwan Ki Do Federation of India</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#008A68] shrink-0" />
                  <span>World Union of Qwan Ki Do (WUKQKD) Syllabus</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#008A68] shrink-0" />
                  <span>Transparent Merit Sports Certificates for Students</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onNavigate('governing')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#008A68] hover:bg-[#007256] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>View Governing Body & Committee</span>
              </button>
              <button
                onClick={() => onNavigate('enquiry')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-slate-800 text-xs sm:text-sm font-semibold border border-stone-300 shadow-2xs transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#008A68]" />
                <span>Contact General Secretary Desk</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quick Admission CTA Strip */}
      <section className="bg-gradient-to-r from-[#008A68] via-[#007256] to-[#005B44] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Start Your Martial Journey With Qwan Ki Do Odisha
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Classes are available for children, teenagers, working adults, and women across multiple verified centres in Odisha.
            Join an authorized dojo today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate('centres')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-[#008A68] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Find a Centre in Your City
            </button>
            <button
              onClick={() => onNavigate('enquiry')}
              className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm border border-emerald-600 transition-all cursor-pointer"
            >
              Online Admission Enquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
