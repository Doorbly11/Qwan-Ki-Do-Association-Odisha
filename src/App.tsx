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
              badge="AUTHENTIC SINO-VIETNAMESE MARTIAL TRADITION"
              title="About Qwan Ki Do (Quán Khí Đạo)"
              subtitle="Explore the historical heritage, Founder Master Pham Xuan Tong, Sino-Vietnamese lineage, and the founding philosophy of Tâm – Thể – Trí (Mind, Body, and Spirit)."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'View Governing Body',
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
                desc: 'Meet the official Executive Committee, Technical Council, and registered credentials of Odisha.',
              }}
            />
          </div>
        )}

        {currentPage === 'governing' && (
          <div>
            <PageHeader
              badge="OFFICIAL STATE GOVERNING BODY OF ODISHA"
              title="Governing Body & Leadership"
              subtitle="Meet the State Executive Committee, Technical Directorate, District Conveners, and verified accreditation under Societies Registration Act XXI of 1860."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Contact Secretariat',
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
                desc: 'Discover certified courses for children, youth combat, adult self-defense, and weapons.',
              }}
            />
          </div>
        )}

        {currentPage === 'programmes' && (
          <div>
            <PageHeader
              badge="STATE-CERTIFIED MARTIAL CURRICULUM"
              title="Training Programmes & Courses"
              subtitle="Age-appropriate training paths: Children Vo-Sinh, Youth competitive sparring, Adult self-defense, Co Vo Dao traditional weapons, and Khí Công wellness."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Enroll for Training',
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
                desc: 'See the step-by-step progression pathway from initiation to technical master degrees.',
              }}
            />
          </div>
        )}

        {currentPage === 'journey' && (
          <div>
            <PageHeader
              badge="STRUCTURED TECHNICAL PROGRESSION"
              title="6-Stage Training Journey"
              subtitle="A systematic pathway guiding martial artists from white sash initiation through yellow stripes, intermediate degrees, and advanced master ranking."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Belt & Rank Explorer',
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
                desc: 'Learn about traditional sash colors, yellow stripes, examination rules, and insignias.',
              }}
            />
          </div>
        )}

        {currentPage === 'belts' && (
          <div>
            <PageHeader
              badge="OFFICIAL GRADING & EXAMINATION RULES"
              title="Belt & Rank Explorer"
              subtitle="Traditional Sino-Vietnamese sash progression, examination requirements, time-in-grade, international accreditation, and official state insignias."
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
                desc: 'Find authorized training centres and verified instructors across all districts of Odisha.',
              }}
            />
          </div>
        )}

        {currentPage === 'centres' && (
          <div>
            <PageHeader
              badge="AUTHORIZED ODISHA TRAINING ACADEMIES"
              title="Odisha Training Centres & Dojos"
              subtitle="Verified directory of official academies in Bhubaneswar, Cuttack, Puri, Rourkela, Berhampur, Sambalpur, and Balasore with certified instructors and timings."
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
                desc: 'Explore how we are bringing certified martial education to every district of Odisha.',
              }}
            />
          </div>
        )}

        {currentPage === 'expansion' && (
          <div>
            <PageHeader
              badge="ରାଜ୍ୟସ୍ତରୀୟ ପ୍ରସାର ଅଭିଯାନ · STATEWIDE INITIATIVE"
              title="Mission All-Odisha: 30-District Expansion"
              subtitle="Our dedicated initiative to establish training centres, school self-defence curricula, and grassroots youth academies in every single district of Odisha."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Apply for District Centre',
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
                desc: 'Read the official code of conduct, dojo ethics, and safety rules.',
              }}
            />
          </div>
        )}

        {currentPage === 'rules' && (
          <div>
            <PageHeader
              badge="OFFICIAL CODE OF CONDUCT & SAFETY"
              title="Rules & Dojo Etiquette"
              subtitle="Searchable guidelines on martial discipline, the traditional salutation (Bái), uniform care (Vo Phuc), safety equipment, and respectful dojo conduct."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Instructor Certification',
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
                desc: 'Check state coaching eligibility, instructor standards, and examiner prerequisites.',
              }}
            />
          </div>
        )}

        {currentPage === 'instructors' && (
          <div>
            <PageHeader
              badge="STATE COACHING ACCREDITATION"
              title="Instructor Certification & Licensing"
              subtitle="Official criteria, black belt requirements, safety standards, and referee licenses required to coach Qwan Ki Do students in Odisha."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Request Coach Affiliation',
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
                desc: 'Explore the 5 developmental pillars for children, youth, and adults.',
              }}
            />
          </div>
        )}

        {currentPage === 'benefits' && (
          <div>
            <PageHeader
              badge="HOLISTIC PHYSICAL & MENTAL DEVELOPMENT"
              title="Benefits of Qwan Ki Do Training"
              subtitle="Discover how traditional Sino-Vietnamese martial practice develops physical stamina, focus for studies, self-defense, women’s confidence, and lifelong health."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Join a Dojo',
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
                desc: 'View our annual competition schedule, championship venues, and referee clinics.',
              }}
            />
          </div>
        )}

        {currentPage === 'events' && (
          <div>
            <PageHeader
              badge="ANNUAL TOURNAMENTS & CHAMPIONSHIPS"
              title="Events, Tournaments & Seminars"
              subtitle="State Championship calendar, regional qualifying trials, national games preparation, belt examination dates, and master clinics across Odisha."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'News & Achievements',
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
                desc: 'Read state medal records, tournament results, and district association news.',
              }}
            />
          </div>
        )}

        {currentPage === 'news' && (
          <div>
            <PageHeader
              badge="OFFICIAL ANNOUNCEMENTS & PRESS RELEASES"
              title="News & Student Achievements"
              subtitle="Stay informed with verified notifications, medal tallies from national games, district association updates, and athlete spotlights."
              onBackToHome={() => handleNavigate('home')}
              actionButton={{
                label: 'Photo Gallery',
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
                desc: 'Browse the documentary photo archive with headlines across state championships and dojos.',
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
              badge="OFFICIAL ADMISSIONS & SECRETARIAT DESK"
              title="Admissions, Affiliations & Contact"
              subtitle="Apply to enroll in an authorized dojo, request a school or college self-defense workshop, or contact the State General Secretary directly."
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
