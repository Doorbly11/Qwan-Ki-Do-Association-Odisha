import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  ExternalLink,
  Lock,
  Settings,
  Compass,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
  onOpenBooking: () => void;
  onOpenAdminGuide: () => void;
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
  { id: 'about', label: 'About Qwan Ki Do', subtitle: 'Sino-Vietnamese lineage & founder', icon: BookOpen, group: 'about' },
  { id: 'governing', label: 'Governing Body & Leadership', subtitle: 'State executive & technical council', badge: 'Official', icon: Shield, group: 'about' },
  { id: 'benefits', label: 'Benefits of Training', subtitle: 'Physical health & mental discipline', icon: Heart, group: 'about' },

  // Syllabus Group
  { id: 'programmes', label: 'Training Programmes', subtitle: 'Kids, youth, weapons & adults', icon: Layers, group: 'syllabus' },
  { id: 'journey', label: '6-Stage Training Journey', subtitle: 'Novice to master progression', icon: UserCheck, group: 'syllabus' },
  { id: 'belts', label: 'Belt & Rank Explorer', subtitle: 'Sash & stripe examination criteria', icon: Award, group: 'syllabus' },
  { id: 'rules', label: 'Rules & Dojo Etiquette', subtitle: 'Code of conduct, safety & ethics', icon: FileText, group: 'syllabus' },
  { id: 'instructors', label: 'Instructor Certification', subtitle: 'State coaching standards & license', icon: UserCheck, group: 'syllabus' },

  // Centres & Expansion Group
  { id: 'centres', label: 'Odisha Centres & Dojos', subtitle: 'Bhubaneswar, Cuttack & districts', icon: MapPin, group: 'centres' },
  { id: 'expansion', label: 'Mission All-Odisha (30 Districts)', subtitle: 'Statewide expansion & school tie-ups', badge: 'Active', icon: Compass, group: 'centres' },

  // Media & Events Group
  { id: 'events', label: 'Events & State Championships', subtitle: 'Annual tournament calendar', icon: Calendar, group: 'media' },
  { id: 'news', label: 'News & Achievements', subtitle: 'State & national recognition', icon: Newspaper, group: 'media' },
  { id: 'gallery', label: 'Photo & Event Gallery', subtitle: 'Documentary chronicle with headlines', badge: 'Photos', icon: Image, group: 'media' },

  // Contact
  { id: 'enquiry', label: 'Admissions & Contact Desk', subtitle: 'Join a dojo or request affiliation', icon: MessageSquare, group: 'other' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenAdminGuide,
}) => {
  const [trayOpen, setTrayOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Close tray with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTrayOpen(false);
        setOpenDropdown(null);
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
    onNavigate(pageId);
    setTrayOpen(false);
    setOpenDropdown(null);
  };

  const isGroupActive = (group: 'about' | 'syllabus' | 'centres' | 'media') => {
    const items = ALL_PAGES.filter((p) => p.group === group);
    return items.some((item) => item.id === currentPage);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* Top Header Bar with Menu Dropdowns                      */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all shadow-xs font-['Poppins',sans-serif]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-18">
          {/* Organization Brand with Official Crest (Crest ONLY in Header) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            >
              <div className="shrink-0 [perspective:800px]">
                <img
                  src="/assets/aistudio/QAO_Odisha_Martial_Arts_Crest_1396fddd.png"
                  alt="Qwan Ki Do Association Odisha Official Logo"
                  className="w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow-sm shrink-0 animate-logo-flip-5s group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 leading-tight group-hover:text-[#008A68] transition-colors whitespace-nowrap">
                  Qwan Ki Do Odisha
                </span>
                <span className="hidden sm:inline-block text-[10px] text-stone-500 font-medium tracking-wide">
                  Sino-Vietnamese Martial Arts Association
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Menu Links & Dropdowns */}
          <nav
            ref={dropdownRef}
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium text-slate-700"
          >
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-emerald-50 text-[#008A68] font-bold'
                  : 'hover:bg-stone-100 hover:text-slate-950'
              }`}
            >
              Home
            </button>

            {/* 2. About Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  isGroupActive('about')
                    ? 'bg-emerald-50 text-[#008A68] font-bold'
                    : 'hover:bg-stone-100 hover:text-slate-950'
                }`}
              >
                <span>About</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {openDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {ALL_PAGES.filter((p) => p.group === 'about').map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-stone-50 transition-colors cursor-pointer ${
                          isActive ? 'bg-emerald-50/70 text-[#008A68] font-semibold' : 'text-slate-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-[#008A68]' : 'text-stone-400'}`} />
                        <div>
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[9px] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-stone-500 font-normal leading-tight mt-0.5">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Training & Syllabus Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'syllabus' ? null : 'syllabus')}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  isGroupActive('syllabus')
                    ? 'bg-emerald-50 text-[#008A68] font-bold'
                    : 'hover:bg-stone-100 hover:text-slate-950'
                }`}
              >
                <span>Training & Syllabus</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {openDropdown === 'syllabus' && (
                <div className="absolute top-full left-0 mt-1.5 w-80 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {ALL_PAGES.filter((p) => p.group === 'syllabus').map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-stone-50 transition-colors cursor-pointer ${
                          isActive ? 'bg-emerald-50/70 text-[#008A68] font-semibold' : 'text-slate-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-[#008A68]' : 'text-stone-400'}`} />
                        <div>
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-stone-500 font-normal leading-tight mt-0.5">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Centres & 30 Districts Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'centres' ? null : 'centres')}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  isGroupActive('centres')
                    ? 'bg-emerald-50 text-[#008A68] font-bold'
                    : 'hover:bg-stone-100 hover:text-slate-950'
                }`}
              >
                <span>Centres & Districts</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {openDropdown === 'centres' && (
                <div className="absolute top-full left-0 mt-1.5 w-80 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {ALL_PAGES.filter((p) => p.group === 'centres').map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-stone-50 transition-colors cursor-pointer ${
                          isActive ? 'bg-emerald-50/70 text-[#008A68] font-semibold' : 'text-slate-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-[#008A68]' : 'text-stone-400'}`} />
                        <div>
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 text-[9px] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-stone-500 font-normal leading-tight mt-0.5">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 5. Gallery (Direct link to separate Gallery page) */}
            <button
              onClick={() => handleNavClick('gallery')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'gallery'
                  ? 'bg-emerald-50 text-[#008A68] font-bold'
                  : 'hover:bg-stone-100 hover:text-slate-950'
              }`}
            >
              Gallery
            </button>

            {/* 6. Events & News Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'media' ? null : 'media')}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  isGroupActive('media') && currentPage !== 'gallery'
                    ? 'bg-emerald-50 text-[#008A68] font-bold'
                    : 'hover:bg-stone-100 hover:text-slate-950'
                }`}
              >
                <span>Events & News</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {openDropdown === 'media' && (
                <div className="absolute top-full right-0 mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {ALL_PAGES.filter((p) => p.group === 'media').map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-stone-50 transition-colors cursor-pointer ${
                          isActive ? 'bg-emerald-50/70 text-[#008A68] font-semibold' : 'text-slate-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-[#008A68]' : 'text-stone-400'}`} />
                        <div>
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-900 text-[9px] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-stone-500 font-normal leading-tight mt-0.5">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Header Action Buttons (Quick Expansion, Contact & Mobile Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Mission 30 Districts Highlight Button */}
            <button
              onClick={() => handleNavClick('expansion')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-2xs transition-all cursor-pointer ${
                currentPage === 'expansion'
                  ? 'bg-amber-100 text-amber-950 border-amber-400 ring-2 ring-amber-300'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
              }`}
              title="Statewide Expansion Initiative across all 30 districts of Odisha"
            >
              <Compass className="w-3.5 h-3.5 text-amber-700 animate-spin-slow" />
              <span className="hidden sm:inline">Mission 30 Districts</span>
              <span className="sm:hidden">30 Districts</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 text-[9px] font-bold">
                EXPANSION
              </span>
            </button>

            {/* Direct Admissions / Contact Button */}
            <button
              onClick={() => handleNavClick('enquiry')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer ${
                currentPage === 'enquiry'
                  ? 'bg-[#007256] text-white ring-2 ring-emerald-300'
                  : 'bg-[#008A68] hover:bg-[#007256] text-white'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Admissions</span>
            </button>

            {/* Full Menu Hamburger Button (Accessible on Mobile & Desktop) */}
            <button
              onClick={() => setTrayOpen(true)}
              aria-label="Open All Pages Menu Drawer"
              className="inline-flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-medium border border-stone-200 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4 text-slate-700" />
              <span className="hidden sm:inline font-semibold">All Pages</span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* Floating Left Side Tray Pull-Tab (Accessible Anywhere)   */}
      {/* ======================================================== */}
      <button
        onClick={() => setTrayOpen(true)}
        aria-label="Open Left Navigation Tray"
        title="Open All Pages Menu"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1.5 py-3 px-2 sm:px-2.5 bg-slate-950/90 hover:bg-[#008A68] text-white text-[11px] font-semibold rounded-r-xl shadow-2xl backdrop-blur-md transition-all border-y border-r border-stone-700 hover:border-emerald-400 cursor-pointer group focus:outline-none"
      >
        <Menu className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
        <span className="[writing-mode:vertical-rl] tracking-widest uppercase font-serif text-[10px] text-stone-300 group-hover:text-white transition-colors">
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
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-2xl flex flex-col border-r border-stone-200 transform transition-transform duration-300 ease-in-out font-['Poppins',sans-serif] ${
          trayOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="All Website Pages Menu"
      >
        {/* Tray Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-[#008A68]" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-slate-900 leading-tight">
                Qwan Ki Do Odisha
              </h2>
              <p className="text-[11px] text-stone-500 font-medium">
                Complete Website Pages Menu
              </p>
            </div>
          </div>

          <button
            onClick={() => setTrayOpen(false)}
            aria-label="Close Menu Drawer"
            className="p-2 text-stone-500 hover:text-slate-900 hover:bg-stone-200/70 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Top Actions: Home & Mission 30 Districts */}
        <div className="p-3 bg-amber-50/60 border-b border-amber-200 flex items-center gap-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'bg-[#008A68] text-white shadow-2xs'
                : 'bg-white hover:bg-stone-50 text-slate-800 border border-stone-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home Portal</span>
          </button>

          <button
            onClick={() => handleNavClick('expansion')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              currentPage === 'expansion'
                ? 'bg-amber-700 text-white shadow-2xs'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Mission 30</span>
          </button>
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 text-sm">
          {/* Group 1: About & Governance */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
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
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-950 font-semibold border-l-4 border-[#008A68]'
                        : 'text-slate-700 hover:bg-stone-50 hover:text-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#008A68] text-white'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 text-[9px] font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[10px] text-stone-500 font-normal leading-tight">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-[#008A68]' : 'text-stone-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Syllabus & Training */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
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
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-950 font-semibold border-l-4 border-[#008A68]'
                        : 'text-slate-700 hover:bg-stone-50 hover:text-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#008A68] text-white'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-900 text-[9px] font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[10px] text-stone-500 font-normal leading-tight">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#008A68]' : 'text-stone-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Centres & Districts */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
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
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-950 font-semibold border-l-4 border-[#008A68]'
                        : 'text-slate-700 hover:bg-stone-50 hover:text-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#008A68] text-white'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 text-[9px] font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[10px] text-stone-500 font-normal leading-tight">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#008A68]' : 'text-stone-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 4: Media, Events & Gallery */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
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
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-950 font-semibold border-l-4 border-[#008A68]'
                        : 'text-slate-700 hover:bg-stone-50 hover:text-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#008A68] text-white'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-900 text-[9px] font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[10px] text-stone-500 font-normal leading-tight">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#008A68]' : 'text-stone-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 5: Admissions & Contact */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Admissions & Contact
            </div>
            <button
              onClick={() => handleNavClick('enquiry')}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                currentPage === 'enquiry'
                  ? 'bg-emerald-50 text-emerald-950 font-semibold border-l-4 border-[#008A68]'
                  : 'text-slate-700 hover:bg-stone-50 hover:text-slate-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                    currentPage === 'enquiry'
                      ? 'bg-[#008A68] text-white'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium">Admissions & Contact Desk</div>
                  <div className="text-[10px] text-stone-500 font-normal leading-tight">
                    Join a dojo or request school affiliation
                  </div>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 shrink-0 ${
                  currentPage === 'enquiry' ? 'text-[#008A68]' : 'text-stone-300'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Tray Footer: Fast Actions & Contact */}
        <div className="p-4 border-t border-stone-200 bg-stone-50/80 space-y-2.5">
          {/* Find a Dojo button */}
          <button
            onClick={() => handleNavClick('centres')}
            className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>Find a Dojo in Odisha</span>
          </button>

          {/* Settings button (Admin Protected) */}
          <button
            onClick={() => {
              setTrayOpen(false);
              onOpenAdminGuide();
            }}
            className="w-full py-2 px-3 text-xs font-medium text-slate-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-colors flex items-center justify-between cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5 text-[#008A68]" />
              <span className="font-semibold">Settings</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-stone-400">
              <Lock className="w-3 h-3 text-stone-400" />
              <span>Admin Protected</span>
            </div>
          </button>

          {/* Association Helpline */}
          <a
            href="tel:+919437021548"
            className="flex items-center justify-center gap-2 pt-1 text-[11px] text-stone-600 hover:text-[#008A68] transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#008A68]" />
            <span>Secretary Desk: +91 94370 21548</span>
          </a>
        </div>
      </aside>
    </>
  );
};
