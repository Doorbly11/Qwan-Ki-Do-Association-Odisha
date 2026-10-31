import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Shield,
  PhoneCall,
  Home,
  BookOpen,
  Layers,
  Award,
  MapPin,
  FileText,
  UserCheck,
  Heart,
  Calendar,
  Newspaper,
  Image,
  MessageSquare,
  ChevronRight,
  Compass,
  Lock,
  Sliders,
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
  onOpenBooking: () => void;
  onOpenAdminGuide?: () => void;
}

interface NavPageItem {
  id: string;
  label: string;
  subtitle?: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  group: 'about' | 'syllabus' | 'centres' | 'media' | 'other';
}

const ALL_PAGES: NavPageItem[] = [
  // About Group
  { id: 'about', label: 'About Qwan Ki Do', subtitle: 'Our history and founder', icon: BookOpen, group: 'about' },
  { id: 'governing', label: 'Governing Body & Leadership', subtitle: 'Our state team and leaders', badge: 'Official', icon: Shield, group: 'about' },
  { id: 'benefits', label: 'Benefits of Training', subtitle: 'Fitness, focus & confidence', icon: Heart, group: 'about' },

  // Syllabus Group
  { id: 'programmes', label: 'Training Programmes', subtitle: 'Classes for all ages', icon: Layers, group: 'syllabus' },
  { id: 'journey', label: '6-Stage Training Journey', subtitle: 'White belt to black belt', icon: UserCheck, group: 'syllabus' },
  { id: 'belts', label: 'Belt & Rank Explorer', subtitle: 'Belt colors and test rules', icon: Award, group: 'syllabus' },
  { id: 'rules', label: 'Rules & Dojo Etiquette', subtitle: 'Safety, respect & clean uniform', icon: FileText, group: 'syllabus' },
  { id: 'instructors', label: 'Instructor Certification', subtitle: 'How our coaches are licensed', icon: UserCheck, group: 'syllabus' },

  // Centres & Expansion Group
  { id: 'centres', label: 'Odisha Centres & Dojos', subtitle: 'Find a centre near you', icon: MapPin, group: 'centres' },
  { id: 'expansion', label: 'Mission All-Odisha (30 Districts)', subtitle: 'Reaching all 30 districts', badge: 'Active', icon: Compass, group: 'centres' },

  // Media & Events Group
  { id: 'events', label: 'Events & State Championships', subtitle: 'Tournaments and competitions', icon: Calendar, group: 'media' },
  { id: 'news', label: 'News & Achievements', subtitle: 'Medals and student stories', icon: Newspaper, group: 'media' },
  { id: 'gallery', label: 'Photo & Event Gallery', subtitle: 'Photos from classes and events', badge: 'Photos', icon: Image, group: 'media' },

  // Contact & Admin
  { id: 'enquiry', label: 'Admissions & Contact Desk', subtitle: 'Join a class or ask a question', icon: MessageSquare, group: 'other' },
  { id: 'admin', label: 'Admin Panel', subtitle: 'CMS, database, enquiries & settings', badge: 'Protected', icon: Lock, group: 'other' },
  { id: 'manager', label: 'Website Manager', subtitle: 'WordPress-style site dashboard', badge: 'CMS', icon: Sliders, group: 'other' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAdminGuide,
}) => {
  const [trayOpen, setTrayOpen] = useState(false);

  // Close tray with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTrayOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when tray is open
  useEffect(() => {
    if (trayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [trayOpen]);

  const handleNavClick = (pageId: string) => {
    if (pageId === 'admin') {
      if (onOpenAdminGuide) {
        onOpenAdminGuide();
      }
      setTrayOpen(false);
      return;
    }
    onNavigate(pageId);
    setTrayOpen(false);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* Top Header Bar: Only Logo and Association Name           */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#0B0C0E]/95 backdrop-blur-md border-b border-white/10 transition-all shadow-md font-['Poppins',sans-serif] text-white">
        <div className="max-w-7xl mx-auto flex items-center px-4 sm:px-6 lg:px-8 h-20">
          {/* Organization Brand with Official Crest */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="shrink-0 [perspective:800px]">
              <img
                src="/assets/aistudio/QAO_Odisha_Martial_Arts_Crest_1396fddd.png"
                alt="Qwan Ki Do Association Odisha Official Logo"
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow-md shrink-0 group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#E5A93C] uppercase leading-none group-hover:text-amber-300 transition-colors whitespace-nowrap">
                QWANKIDIO
              </span>
              <span className="text-[10px] sm:text-[11px] text-white/90 font-bold tracking-widest uppercase mt-0.5 whitespace-nowrap">
                ASSOCIATION ODISHA
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* Floating Left Side Tray Pull-Tab (Accessible Anywhere)   */}
      {/* ======================================================== */}
      <button
        onClick={() => setTrayOpen(true)}
        aria-label="Open Left Navigation Tray"
        title="Open All Pages Menu"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1.5 py-3 px-2 sm:px-2.5 bg-[#0B0C0E]/95 hover:bg-[#E5252A] text-white text-[11px] font-semibold rounded-none shadow-2xl backdrop-blur-md transition-all border-y border-r border-white/20 hover:border-[#E5252A] cursor-pointer group focus:outline-none"
      >
        <Menu className="w-4 h-4 text-[#E5A93C] group-hover:text-white transition-colors" />
        <span className="[writing-mode:vertical-rl] tracking-widest uppercase text-[10px] text-stone-300 group-hover:text-white transition-colors font-bold">
          ALL PAGES
        </span>
      </button>

      {/* ======================================================== */}
      {/* Comprehensive Slide-Out Drawer of All Separate Pages     */}
      {/* ======================================================== */}
      {/* 1. Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ${
          trayOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setTrayOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Side Tray Drawer Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md bg-[#0E1013] text-white shadow-2xl flex flex-col border-r border-white/15 transform transition-transform duration-300 ease-in-out font-['Poppins',sans-serif] ${
          trayOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="All Website Pages Menu"
      >
        {/* Tray Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#14161A] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-[#E5252A] flex items-center justify-center shrink-0 shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-base uppercase tracking-tight text-[#E5A93C] leading-tight">
                QWANKIDIO
              </h2>
              <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">
                ASSOCIATION ODISHA
              </p>
            </div>
          </div>

          <button
            onClick={() => setTrayOpen(false)}
            aria-label="Close Menu Drawer"
            className="p-2 text-stone-400 hover:text-white hover:bg-white/10 rounded-none transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Top Actions: Home & Mission 30 Districts in Two Lines (Square Buttons) */}
        <div className="p-3 bg-[#17191E] border-b border-white/10 flex items-center gap-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold uppercase rounded-none transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'bg-white/20 text-white border border-white/40'
                : 'bg-white/5 hover:bg-white/10 text-stone-300 border border-white/15'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavClick('expansion')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 px-3 text-xs rounded-none transition-colors cursor-pointer border ${
              currentPage === 'expansion'
                ? 'bg-amber-500/25 text-amber-300 border-amber-400 ring-1 ring-amber-400'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/20'
            }`}
          >
            <span className="text-[10px] font-bold tracking-tight text-white uppercase leading-tight">
              Mission 30 Districts
            </span>
            <span className="text-[9px] font-bold tracking-widest text-[#E5A93C] uppercase leading-tight">
              Expansion
            </span>
          </button>
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 text-sm bg-[#0E1013]">
          {/* Group 1: About & Governance */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#E5A93C]">
              About & Governance
            </div>
            <div className="space-y-1">
              {ALL_PAGES.filter((p) => p.group === 'about').map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-none text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold border-l-4 border-[#E5252A]'
                        : 'text-stone-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#E5252A] text-white'
                            : 'bg-white/10 text-stone-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded-none bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[10px] text-stone-400 font-normal leading-tight">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-[#E5252A]' : 'text-stone-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Syllabus & Training */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#E5A93C]">
              Training & Syllabus
            </div>
            <div className="space-y-1">
              {ALL_PAGES.filter((p) => p.group === 'syllabus').map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-none text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold border-l-4 border-[#E5252A]'
                        : 'text-stone-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#E5252A] text-white'
                            : 'bg-white/10 text-stone-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded-none bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[10px] text-stone-400 font-normal leading-tight">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#E5252A]' : 'text-stone-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Centres & Districts */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#E5A93C]">
              Centres & Districts
            </div>
            <div className="space-y-1">
              {ALL_PAGES.filter((p) => p.group === 'centres').map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-none text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold border-l-4 border-[#E5252A]'
                        : 'text-stone-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#E5252A] text-white'
                            : 'bg-white/10 text-stone-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded-none bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[10px] text-stone-400 font-normal leading-tight">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#E5252A]' : 'text-stone-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 4: Media, Events & Gallery */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#E5A93C]">
              Media & Gallery
            </div>
            <div className="space-y-1">
              {ALL_PAGES.filter((p) => p.group === 'media').map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-none text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold border-l-4 border-[#E5252A]'
                        : 'text-stone-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#E5252A] text-white'
                            : 'bg-white/10 text-stone-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded-none bg-blue-500/20 text-blue-300 text-[9px] font-bold border border-blue-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[10px] text-stone-400 font-normal leading-tight">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#E5252A]' : 'text-stone-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 5: Admissions & Contact */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#E5A93C]">
              Admissions & Contact
            </div>
            <button
              onClick={() => handleNavClick('enquiry')}
              className={`w-full flex items-center justify-between p-2.5 rounded-none text-left transition-all cursor-pointer ${
                currentPage === 'enquiry'
                  ? 'bg-white/15 text-white font-semibold border-l-4 border-[#E5252A]'
                  : 'text-stone-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 ${
                    currentPage === 'enquiry'
                      ? 'bg-[#E5252A] text-white'
                      : 'bg-white/10 text-stone-300'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium text-white">Admissions & Contact Desk</div>
                  <div className="text-[10px] text-stone-400 font-normal leading-tight">
                    Join a dojo or request school affiliation
                  </div>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 shrink-0 ${
                  currentPage === 'enquiry' ? 'text-[#E5252A]' : 'text-stone-500'
                }`}
              />
            </button>
          </div>

          {/* Group 6: Administration & Management */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#E5A93C]">
              Administration & Management
            </div>
            <div className="space-y-1">
              {/* Admin Panel (CMS & Database) */}
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-between p-2.5 rounded-none text-left transition-all cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 text-stone-200 hover:text-white border border-amber-500/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none flex items-center justify-center shrink-0 bg-amber-500 text-stone-950 font-bold shadow-xs">
                    <Lock className="w-4 h-4 text-stone-950" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5 text-white">
                      <span>Admin Panel</span>
                      <span className="px-1.5 py-0.2 rounded-none bg-amber-400 text-stone-950 text-[9px] font-extrabold uppercase">
                        Staff
                      </span>
                    </div>
                    <div className="text-[10px] text-amber-300/80 font-normal leading-tight">
                      Manage dojos, events, belts, news & database
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 text-amber-400" />
              </button>

              {/* Website Manager Dashboard */}
              <button
                onClick={() => handleNavClick('manager')}
                className={`w-full flex items-center justify-between p-2.5 rounded-none text-left transition-all cursor-pointer ${
                  currentPage === 'manager'
                    ? 'bg-white/15 text-white font-semibold border-l-4 border-[#E5252A]'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 ${
                      currentPage === 'manager'
                        ? 'bg-[#E5252A] text-white'
                        : 'bg-white/10 text-stone-300'
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-white flex items-center gap-1.5">
                      <span>Website Manager</span>
                      <span className="px-1.5 py-0.2 rounded-none bg-white/10 text-stone-300 text-[9px] font-bold">
                        CMS
                      </span>
                    </div>
                    <div className="text-[10px] text-stone-400 font-normal leading-tight">
                      Full WordPress-style site manager dashboard
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 text-stone-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Tray Footer: Fast Actions & Contact (Square Red CTA) */}
        <div className="p-4 border-t border-white/10 bg-[#14161A] space-y-3">
          {/* Find a Dojo button */}
          <button
            onClick={() => handleNavClick('centres')}
            className="w-full py-3 px-3 text-xs font-bold uppercase tracking-wider text-white bg-[#E5252A] hover:bg-[#D01F24] rounded-none shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>JOIN OUR ASSOCIATION / FIND A DOJO</span>
          </button>

          {/* Quick Admin Access & Helpline */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <button
              onClick={() => handleNavClick('admin')}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Panel</span>
            </button>
            <a
              href="tel:+919437021548"
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>+91 94370 21548</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
