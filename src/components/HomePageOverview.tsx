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
  Lock,
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
      badge: 'Our Heritage',
      title: 'About Qwan Ki Do',
      description: 'Our history, founder Grandmaster Pham Xuan Tong, and 40+ years of martial arts practice worldwide.',
      icon: BookOpen,
      iconColor: 'text-[#008A68]',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'governing',
      badge: 'Our Leaders',
      title: 'Governing Body & Leadership',
      description: 'Meet our state committee members, technical coaches, and district heads across Odisha.',
      icon: Shield,
      iconColor: 'text-amber-700',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-200',
    },
    {
      id: 'programmes',
      badge: 'For All Ages',
      title: 'Training Programmes',
      description: 'Fun classes for kids, active teen sparring, adult self-defense, traditional weapons, and wellness.',
      icon: Layers,
      iconColor: 'text-blue-700',
      bgColor: 'bg-blue-50/60',
      borderColor: 'border-blue-200',
    },
    {
      id: 'journey',
      badge: 'Learning Steps',
      title: '6-Stage Training Journey',
      description: 'A clear step-by-step path from white belt beginner to black belt and master level.',
      icon: UserCheck,
      iconColor: 'text-purple-700',
      bgColor: 'bg-purple-50/60',
      borderColor: 'border-purple-200',
    },
    {
      id: 'belts',
      badge: 'Belts & Stripes',
      title: 'Belt & Rank Explorer',
      description: 'Learn about belt colors, yellow stripes, minimum practice time, and test guidelines.',
      icon: Award,
      iconColor: 'text-amber-800',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-200',
    },
    {
      id: 'centres',
      badge: 'Find a Class',
      title: 'Odisha Centres & Dojos',
      description: 'Certified training centres in Bhubaneswar, Cuttack, Puri, Rourkela, Berhampur, Sambalpur, and Balasore.',
      icon: MapPin,
      iconColor: 'text-[#008A68]',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'expansion',
      badge: 'All 30 Districts',
      title: 'Mission 30 Districts Expansion',
      description: 'Our initiative to bring martial arts training and school self-defense to every district in Odisha.',
      icon: Compass,
      iconColor: 'text-amber-700',
      bgColor: 'bg-amber-100/70',
      borderColor: 'border-amber-300',
    },
    {
      id: 'rules',
      badge: 'Safety & Respect',
      title: 'Rules & Dojo Etiquette',
      description: 'Simple rules for bowing respectfully, clean uniform care, safety gear, and good manners.',
      icon: FileText,
      iconColor: 'text-slate-700',
      bgColor: 'bg-stone-50',
      borderColor: 'border-stone-200',
    },
    {
      id: 'instructors',
      badge: 'Certified Coaches',
      title: 'Instructor Certification',
      description: 'How our coaches are trained, tested, and licensed to teach students safely.',
      icon: UserCheck,
      iconColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'benefits',
      badge: 'Health & Focus',
      title: 'Benefits of Training',
      description: 'Better fitness, study focus, everyday self-defense, women’s confidence, and lifelong health.',
      icon: Heart,
      iconColor: 'text-rose-700',
      bgColor: 'bg-rose-50/60',
      borderColor: 'border-rose-200',
    },
    {
      id: 'gallery',
      badge: 'Photo Gallery',
      title: 'Official Image Gallery',
      description: 'Photos from our classes, tournaments, medal ceremonies, and belt examinations.',
      icon: Image,
      iconColor: 'text-blue-700',
      bgColor: 'bg-blue-50/60',
      borderColor: 'border-blue-200',
    },
    {
      id: 'enquiry',
      badge: 'Join or Contact',
      title: 'Admissions & Contact',
      description: 'Join a class near you, request a school workshop, or speak with our state office.',
      icon: MessageSquare,
      iconColor: 'text-[#008A68]',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'admin',
      badge: 'Staff & CMS',
      title: 'Admin Panel & CMS',
      description: 'Password-protected control panel to manage dojos, syllabus, events, and student enquiries.',
      icon: Lock,
      iconColor: 'text-amber-700',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-300',
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
      <section className="bg-[#0B0C0E] border-b border-white/10 py-8 sm:py-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-none bg-[#14161A] border border-white/15 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-none bg-[#E5252A] flex items-center justify-center shrink-0 shadow-md">
                <Compass className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-none bg-amber-500/20 text-amber-300 text-[11px] font-bold mb-1.5 border border-amber-500/30 uppercase tracking-wider">
                  <span>ରାଜ୍ୟସ୍ତରୀୟ ପ୍ରସାର ଅଭିଯାନ</span>
                  <span>·</span>
                  <span>MISSION ALL-ODISHA</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug uppercase tracking-tight">
                  Bringing Martial Arts & Self-Defense to All 30 Districts of Odisha
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                  We are partnering with schools, colleges, and local clubs to bring safe training to students
                  in Mayurbhanj, Koraput, Balangir, Sambalpur, Ganjam, and across our state.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('expansion')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none bg-[#E5252A] hover:bg-[#D01F24] active:bg-[#B8191E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Mission 30 Districts Expansion</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('centres')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-none bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider border border-white/20 hover:border-white shadow-2xs transition-all cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 text-[#E5A93C]" />
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
