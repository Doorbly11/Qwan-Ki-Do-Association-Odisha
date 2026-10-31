/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { PageHeader } from './components/PageHeader';
import { PageNavigationFooter } from './components/PageNavigationFooter';
import { HomePageOverview } from './components/HomePageOverview';
import { AboutSection } from './components/AboutSection';
import { GoverningBodySection } from './components/GoverningBodySection';
import { ProgrammesSection } from './components/ProgrammesSection';
import { TrainingJourney } from './components/TrainingJourney';
import { BeltRankExplorer } from './components/BeltRankExplorer';
import { CentresDirectory } from './components/CentresDirectory';
import { OdishaExpansionSection } from './components/OdishaExpansionSection';
import { RulesSection } from './components/RulesSection';
import { InstructorCertification } from './components/InstructorCertification';
import { BenefitsSection } from './components/BenefitsSection';
import { EventsSection } from './components/EventsSection';
import { NewsSection } from './components/NewsSection';
import { ImageGalleryPage } from './components/ImageGalleryPage';
import { WebsiteManagerDashboard } from './components/WebsiteManager/WebsiteManagerDashboard';
import { FAQSection } from './components/FAQSection';
import { EnquirySection } from './components/EnquirySection';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import {
  MapPin,
  ChevronUp,
  Shield,
  MessageSquare,
  Compass,
  Award,
  Layers,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type PageId =
  | 'home'
  | 'about'
  | 'governing'
  | 'programmes'
  | 'journey'
  | 'belts'
  | 'centres'
  | 'expansion'
  | 'rules'
  | 'instructors'
  | 'benefits'
  | 'events'
  | 'news'
  | 'gallery'
  | 'enquiry'
  | 'manager';

const VALID_PAGES: PageId[] = [
  'home',
  'about',
  'governing',
  'programmes',
  'journey',
  'belts',
  'centres',
  'expansion',
  'rules',
  'instructors',
  'benefits',
  'events',
  'news',
  'gallery',
  'enquiry',
  'manager',
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.includes('website-manager')) {
        return 'manager';
      }
      const hash = window.location.hash.replace('#', '').trim() as PageId;
      if (VALID_PAGES.includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  const [isAdminGuideOpen, setIsAdminGuideOpen] = useState(false);
  const [selectedCentreForEnquiry, setSelectedCentreForEnquiry] = useState<string | undefined>(
    undefined
  );
  const [selectedProgrammeForEnquiry, setSelectedProgrammeForEnquiry] = useState<
    string | undefined
  >(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync hash changes (browser back/forward button support)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim() as PageId | 'admin' | 'settings';
      if (hash === 'admin' || hash === 'settings') {
        setIsAdminGuideOpen(true);
      } else if (VALID_PAGES.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash) {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Admin secret keyboard shortcut (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminGuideOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Unified Page Navigation handler
  const handleNavigate = (pageId: string) => {
    if (pageId === 'admin' || pageId === 'settings') {
      setIsAdminGuideOpen(true);
      return;
    }

    let target = pageId as PageId;

    // Normalizations for aliases
    if (pageId === 'hero') target = 'home';
    if (pageId === 'website-manager') target = 'manager';
    if (pageId === 'gallery-page') target = 'gallery';

    if (!VALID_PAGES.includes(target)) {
      target = 'home';
    }

    setCurrentPage(target);

    // Update URL Hash without full-page reload
    if (target === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = target;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCentreForEnquiry = (centreName: string) => {
    setSelectedCentreForEnquiry(centreName);
    handleNavigate('enquiry');
  };

  const handleSelectProgrammeForEnquiry = (programmeTitle: string) => {
    setSelectedProgrammeForEnquiry(programmeTitle);
    handleNavigate('enquiry');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800 font-['Poppins',sans-serif] selection:bg-[#008A68] selection:text-white">
      {/* Top Announcement Bar for Upcoming State Championship */}
      <AnnouncementBar onNavigateToEvents={() => handleNavigate('events')} />

      {/* Main Top Header Bar with Menu Dropdowns and Mobile Drawer */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleNavigate('centres')}
        onOpenAdminGuide={() => setIsAdminGuideOpen(true)}
      />

      {/* Main View Router - Each Page Rendered As A Dedicated Standalone View */}
      <main className="flex-1">
        {currentPage === 'manager' && (
          <WebsiteManagerDashboard onExitManager={() => handleNavigate('home')} />
        )}

        {currentPage === 'home' && (
          <HomePageOverview
            onNavigate={handleNavigate}
            onOpenBooking={() => handleNavigate('centres')}
          />
        )}

        {currentPage === 'about' && (
          <div>
            <PageHeader
              badge="TRADITIONAL MARTIAL ART"
              title="About Qwan Ki Do"
              subtitle="Learn about our history, our founder Grandmaster Pham Xuan Tong, and the values of a healthy body, calm mind, and kind heart."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Meet Our Leadership',
                onClick: () => handleNavigate('governing'),
                icon: Shield,
              }}
            />
            <AboutSection />
            <PageNavigationFooter
              currentPageId="about"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'governing',
                label: 'Governing Body & Leadership',
                desc: 'Meet our state committee, certified coaches, and district leaders across Odisha.',
              }}
            />
          </div>
        )}

        {currentPage === 'governing' && (
          <div>
            <PageHeader
              badge="STATE LEADERSHIP"
              title="Governing Body & Leadership"
              subtitle="Meet the team leading Qwan Ki Do in Odisha, our technical directors, and certified district officials."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Contact Our Office',
                onClick: () => handleNavigate('enquiry'),
                icon: MessageSquare,
              }}
            />
            <GoverningBodySection onContactSecretariat={() => handleNavigate('enquiry')} />
            <PageNavigationFooter
              currentPageId="governing"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'programmes',
                label: 'Training Programmes',
                desc: 'Explore classes for kids, teenagers, adults, and self-defense.',
              }}
            />
          </div>
        )}

        {currentPage === 'programmes' && (
          <div>
            <PageHeader
              badge="CLASSES FOR ALL AGES"
              title="Training Programmes & Courses"
              subtitle="Classes designed for everyone: children, teenagers, adults, women's self-defense, and traditional weapons."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Join a Class',
                onClick: () => handleNavigate('enquiry'),
                icon: MessageSquare,
              }}
            />
            <ProgrammesSection
              onSelectProgrammeForEnquiry={handleSelectProgrammeForEnquiry}
            />
            <PageNavigationFooter
              currentPageId="programmes"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'journey',
                label: '6-Stage Training Journey',
                desc: 'See how a student grows step-by-step from beginner to black belt.',
              }}
            />
          </div>
        )}

        {currentPage === 'journey' && (
          <div>
            <PageHeader
              badge="STEP-BY-STEP LEARNING"
              title="6-Stage Training Journey"
              subtitle="A clear 6-step path that guides every student from white belt beginner all the way to master level."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Explore Belt Ranks',
                onClick: () => handleNavigate('belts'),
                icon: Award,
              }}
            />
            <TrainingJourney />
            <PageNavigationFooter
              currentPageId="journey"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'belts',
                label: 'Belt & Rank Explorer',
                desc: 'Learn about belt colors, yellow stripes, and test rules.',
              }}
            />
          </div>
        )}

        {currentPage === 'belts' && (
          <div>
            <PageHeader
              badge="BELTS & EXAMINATIONS"
              title="Belt & Rank Explorer"
              subtitle="Understand the belt system, test requirements, training time, and official ranks."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Find a Training Centre',
                onClick: () => handleNavigate('centres'),
                icon: MapPin,
              }}
            />
            <BeltRankExplorer />
            <PageNavigationFooter
              currentPageId="belts"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'centres',
                label: 'Odisha Centres & Dojos',
                desc: 'Find certified training centres and instructors near you in Odisha.',
              }}
            />
          </div>
        )}

        {currentPage === 'centres' && (
          <div>
            <PageHeader
              badge="TRAINING CENTRES IN ODISHA"
              title="Odisha Training Centres & Dojos"
              subtitle="Find certified training halls in Bhubaneswar, Cuttack, Puri, Rourkela, Berhampur, Sambalpur, and Balasore with class timings."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Mission 30 Districts',
                onClick: () => handleNavigate('expansion'),
                icon: Compass,
              }}
            />
            <CentresDirectory
              onSelectCentreForEnquiry={handleSelectCentreForEnquiry}
              onRequestDistrictExpansion={() => handleNavigate('expansion')}
            />
            <PageNavigationFooter
              currentPageId="centres"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'expansion',
                label: 'Mission All-Odisha (30 Districts)',
                desc: 'Learn how we are bringing martial arts training to all 30 districts of Odisha.',
              }}
            />
          </div>
        )}

        {currentPage === 'expansion' && (
          <div>
            <PageHeader
              badge="MISSION ALL-ODISHA · 30 DISTRICTS"
              title="Mission All-Odisha: 30-District Expansion"
              subtitle="Our plan to bring martial arts training, self-defense classes, and school workshops to all 30 districts of Odisha."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Request a Centre in Your Area',
                onClick: () => handleNavigate('enquiry'),
                icon: MessageSquare,
              }}
            />
            <OdishaExpansionSection
              onRequestExpansion={(districtName) => {
                if (districtName) {
                  setSelectedCentreForEnquiry(`Expansion District: ${districtName}`);
                }
                handleNavigate('enquiry');
              }}
            />
            <PageNavigationFooter
              currentPageId="expansion"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'rules',
                label: 'Rules & Dojo Etiquette',
                desc: 'Read our simple rules for safety, respect, and uniform care.',
              }}
            />
          </div>
        )}

        {currentPage === 'rules' && (
          <div>
            <PageHeader
              badge="SAFETY & RESPECT"
              title="Rules & Dojo Etiquette"
              subtitle="Simple guidelines for respectful bowing, clean uniforms, safe practice, and good behavior in class."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Coach Certification',
                onClick: () => handleNavigate('instructors'),
                icon: Award,
              }}
            />
            <RulesSection />
            <PageNavigationFooter
              currentPageId="rules"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'instructors',
                label: 'Instructor Certification',
                desc: 'See how our coaches are trained and licensed to teach safely.',
              }}
            />
          </div>
        )}

        {currentPage === 'instructors' && (
          <div>
            <PageHeader
              badge="CERTIFIED COACHES"
              title="Instructor Certification & Licensing"
              subtitle="How we train, test, and license qualified coaches to teach Qwan Ki Do safely in Odisha."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Join as a Coach',
                onClick: () => handleNavigate('enquiry'),
                icon: MessageSquare,
              }}
            />
            <InstructorCertification />
            <PageNavigationFooter
              currentPageId="instructors"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'benefits',
                label: 'Benefits of Training',
                desc: 'Learn how training helps your body, mind, and confidence.',
              }}
            />
          </div>
        )}

        {currentPage === 'benefits' && (
          <div>
            <PageHeader
              badge="HEALTH & CONFIDENCE"
              title="Benefits of Qwan Ki Do Training"
              subtitle="See how training improves fitness, study focus, everyday safety, and lifelong health for children, youth, and adults."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Find a Class Near You',
                onClick: () => handleNavigate('centres'),
                icon: MapPin,
              }}
            />
            <BenefitsSection />
            <PageNavigationFooter
              currentPageId="benefits"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'events',
                label: 'State Championships & Events',
                desc: 'View tournament dates, state championships, and belt exams.',
              }}
            />
          </div>
        )}

        {currentPage === 'events' && (
          <div>
            <PageHeader
              badge="TOURNAMENTS & EVENTS"
              title="Events, Tournaments & Seminars"
              subtitle="State championship dates, district competitions, belt test days, and training workshops across Odisha."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Latest News & Medals',
                onClick: () => handleNavigate('news'),
                icon: Calendar,
              }}
            />
            <EventsSection />
            <PageNavigationFooter
              currentPageId="events"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'news',
                label: 'News & Achievements',
                desc: 'Read latest tournament results and student achievements.',
              }}
            />
          </div>
        )}

        {currentPage === 'news' && (
          <div>
            <PageHeader
              badge="LATEST UPDATES"
              title="News & Student Achievements"
              subtitle="Read about state medals, competition results, and achievements of students across Odisha."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'View Photo Gallery',
                onClick: () => handleNavigate('gallery'),
                icon: Award,
              }}
            />
            <NewsSection />
            <PageNavigationFooter
              currentPageId="news"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'gallery',
                label: 'Official Photo Gallery',
                desc: 'Browse photos from our classes, tournaments, and events.',
              }}
            />
          </div>
        )}

        {currentPage === 'gallery' && (
          <ImageGalleryPage onBackToHome={() => handleNavigate('home')} />
        )}

        {currentPage === 'enquiry' && (
          <div>
            <PageHeader
              badge="JOIN OR CONTACT US"
              title="Admissions & Contact Desk"
              subtitle="Join a local training centre, request a school self-defense workshop, or get in touch with our state office."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Find Nearest Centre',
                onClick: () => handleNavigate('centres'),
                icon: MapPin,
              }}
            />
            <EnquirySection
              initialCentre={selectedCentreForEnquiry}
              initialProgramme={selectedProgrammeForEnquiry}
            />
            <FAQSection />
            <PageNavigationFooter
              currentPageId="enquiry"
              onNavigate={handleNavigate}
              nextPage={{
                id: 'home',
                label: 'Return to Home Portal',
                desc: 'Explore the full overview, banner slides, and latest state initiatives.',
              }}
            />
          </div>
        )}
      </main>

      {/* Official Association Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdminGuide={() => setIsAdminGuideOpen(true)}
      />

      {/* Password-Protected Administrative CMS & Database Management Panel */}
      <AdminPanel
        isOpen={isAdminGuideOpen}
        onClose={() => setIsAdminGuideOpen(false)}
        onOpenWebsiteManager={() => handleNavigate('manager')}
      />

      {/* Floating Action Controls for Mobile / Quick Access */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5 font-['Poppins',sans-serif]">
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll back to top"
              className="w-10 h-10 rounded-full bg-white text-slate-700 hover:text-slate-950 border border-stone-200 shadow-md flex items-center justify-center hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => handleNavigate('centres')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-emerald-200" />
          <span>Odisha Dojos</span>
        </motion.button>
      </div>
    </div>
  );
}
