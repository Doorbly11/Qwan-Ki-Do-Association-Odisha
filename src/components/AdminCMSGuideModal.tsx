import React, { useState } from 'react';
import { X, CheckSquare, Layers, FileCode2, Shield, Download, ExternalLink, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminCMSGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCMSGuideModal: React.FC<AdminCMSGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'wordpress' | 'schema' | 'deployment'>('checklist');

  const downloadDocumentation = () => {
    const content = `QWAN KI DO ASSOCIATION ODISHA (https://qwankidoodisha.com/)
ADMINISTRATIVE CMS ARCHITECTURE & WORDPRESS INTEGRATION GUIDE
=============================================================

1. CONTENT REVIEW CHECKLIST (REQUIRING ASSOCIATION SIGN-OFF)
-------------------------------------------------------------
[ ] Reconcile local Odisha belt & stripe progression with World Union of Qwan Ki Do international regulations.
[ ] Confirm exact registration numbers (Societies Registration Act XXI of 1860).
[ ] Audit list of verified affiliated training centres and active dojo lease agreements.
[ ] Validate Chief Instructor ranks (Đẳng levels) and active teaching license numbers.
[ ] Confirm 2026 Odisha State Championship venue booking and date at Kalinga Indoor Stadium.
[ ] Review annual student affiliation fee schedule and belt grading examination fees.
[ ] Ensure child safeguarding officer appointment and contact email are operational.

2. WORDPRESS & ASTRA THEME INTEGRATION
-------------------------------------------------------------
Target Domain: https://qwankidoodisha.com/
Current CMS Baseline: WordPress with Astra Theme.

Implementation Strategy:
Option A (Decoupled Vite / Headless React - RECOMMENDED FOR SPEED & MOBILE UX):
- Deploy the production React bundle (/dist) to the primary domain or sub-path (/app).
- Use WordPress REST API (/wp-json/wp/v2/) to serve dynamic content for Events, News, and Training Centres.

Option B (Native Astra Custom Post Types & Elementor / Block Patterns):
- Create Custom Post Types (CPT) using ACF (Advanced Custom Fields) or Pods:
  1. 'qkd_dojo' (Training Centres with fields: address, chief_instructor, schedule, district, verified_status)
  2. 'qkd_event' (Events with fields: event_date, venue, registration_deadline, circular_pdf)
  3. 'qkd_belt_rank' (Syllabus with fields: rank_name, vietnamese_title, sash_color, min_months, criteria)
  4. 'qkd_rule' (Rules with fields: category, binding_status, doc_code)

3. ZERO-SECRET FRONTEND SECURITY
-------------------------------------------------------------
- Never commit database passwords, WP-Admin credentials, or secret keys to Git.
- Admissions and Enquiries submissions post to server-side endpoint /api/enquiries or verified WP Contact Form 7 / WPForms webhook.

© Qwan Ki Do Association Odisha. All rights reserved.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'QKD_Odisha_CMS_and_WordPress_Integration_Manual.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative flex flex-col"
          >
        {/* Modal Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>Association Admin Portal & Governance</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              CMS Architecture, WordPress Guide & Verification Checklist
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Official reference for technical administrators of <a href="https://qwankidoodisha.com/" target="_blank" rel="noopener noreferrer" className="text-[#008A68] underline font-medium">qwankidoodisha.com</a>
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close Admin Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-4 pb-2 border-b border-stone-100 text-xs">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'checklist'
                ? 'bg-[#008A68] text-white'
                : 'text-slate-600 hover:bg-stone-100'
            }`}
          >
            Content Review Checklist (Required)
          </button>
          <button
            onClick={() => setActiveTab('wordpress')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'wordpress'
                ? 'bg-[#008A68] text-white'
                : 'text-slate-600 hover:bg-stone-100'
            }`}
          >
            WordPress & Astra Integration
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'schema'
                ? 'bg-[#008A68] text-white'
                : 'text-slate-600 hover:bg-stone-100'
            }`}
          >
            Data Schema & Custom Post Types
          </button>
          <button
            onClick={() => setActiveTab('deployment')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'deployment'
                ? 'bg-[#008A68] text-white'
                : 'text-slate-600 hover:bg-stone-100'
            }`}
          >
            Deployment & Production Hosting
          </button>
        </div>

        {/* Tab 1: Checklist */}
        {activeTab === 'checklist' && (
          <div className="py-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs">
              <strong>Mandatory Protocol:</strong> In accordance with our anti-hallucination discipline, the following facts must be formally verified by the Executive Technical Board of Qwan Ki Do Association Odisha before publishing official print circulars or legal press releases.
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-start gap-3">
                <CheckSquare className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">1. Belt & Rank Reconciliation:</span>
                  <p className="text-slate-600 mt-0.5">
                    Reconcile local Odisha white sash stripe progression (Cấp 1–4) with the international Union Mondiale de Qwan Ki Do technical handbook to ensure seamless recognition of ranks when Odisha students travel to national/world championships.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-start gap-3">
                <CheckSquare className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">2. Dojo Lease & Affiliation Numbers:</span>
                  <p className="text-slate-600 mt-0.5">
                    Verify annual dojo registration certificates for all 7 active district centres (Bhubaneswar HQ, Cuttack Barabati, Puri Coastal, Rourkela Steel City, Berhampur, Sambalpur, Balasore).
                  </p>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-start gap-3">
                <CheckSquare className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">3. Instructor Teaching Credentials:</span>
                  <p className="text-slate-600 mt-0.5">
                    Confirm that each listed Chief Instructor holds a current year teaching license and valid CPR/First Aid certification.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-start gap-3">
                <CheckSquare className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">4. 18th State Championship Schedule:</span>
                  <p className="text-slate-600 mt-0.5">
                    Confirm stadium allocation order from the Department of Sports & Youth Services, Government of Odisha, for Kalinga Indoor Stadium.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-start gap-3">
                <CheckSquare className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">5. Fee Transparency:</span>
                  <p className="text-slate-600 mt-0.5">
                    Ensure no arbitrary fees are published; all examination fees must match the uniform tariff approved in the annual general meeting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: WordPress */}
        {activeTab === 'wordpress' && (
          <div className="py-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              WordPress & Astra Theme Architecture for qwankidoodisha.com
            </h3>
            <p>
              The official domain <code>https://qwankidoodisha.com/</code> currently runs WordPress with the Astra theme.
              To maintain high speed, mobile-first responsiveness, and interactive ranking widgets without code rot, you can deploy this experience using two supported pathways:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block">Path A: Decoupled Vite SPA / Sub-path (Recommended)</span>
                <p className="text-xs text-slate-600">
                  Compile this high-performance React application via <code>npm run build</code> and upload the generated <code>dist/</code> assets to the web root or a clean directory. WordPress serves the REST API endpoints, and this SPA delivers zero-friction mobile interactions.
                </p>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block">Path B: Astra Child Theme & Reusable Blocks</span>
                <p className="text-xs text-slate-600">
                  Incorporate the clean component designs into Astra Gutenberg block patterns. The modular structure of our sections (Hero, Belt Explorer, Centres Directory, Rules Accordion) maps 1:1 to WordPress template parts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Schema */}
        {activeTab === 'schema' && (
          <div className="py-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              WordPress Custom Post Types (CPT) Schema
            </h3>
            <p>
              To let non-technical association secretaries update dojos, events, and news articles from the standard WordPress WP-Admin dashboard, configure these 4 post types:
            </p>

            <div className="space-y-3 font-mono text-[11px] bg-stone-900 text-stone-200 p-4 rounded-lg overflow-x-auto">
              <div>
                <span className="text-emerald-400 font-bold">1. qkd_centre (Training Centres):</span>
                <p className="text-stone-300">Fields: title, district, city, locality, address, chief_instructor, instructor_rank, phone, email, schedule_meta, age_groups, is_verified</p>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <span className="text-emerald-400 font-bold">2. qkd_event (Championships & Gradings):</span>
                <p className="text-stone-300">Fields: title, event_type, start_date, end_date, venue, district, deadline, eligibility, circular_download_url, results_meta</p>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <span className="text-emerald-400 font-bold">3. qkd_belt_rank (Syllabus):</span>
                <p className="text-stone-300">Fields: rank_name, vietnamese_title, category, sash_hex, stripe_count, min_months, min_age, syllabus_bullet_points, exam_criteria</p>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <span className="text-emerald-400 font-bold">4. qkd_enquiry (Submissions):</span>
                <p className="text-stone-300">Stored privately in WP-Admin database, triggers instant SMS/WhatsApp notification to State Secretary.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Deployment */}
        {activeTab === 'deployment' && (
          <div className="py-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Production Deployment Checklist
            </h3>
            <ul className="space-y-2 list-disc pl-5 marker:text-[#008A68]">
              <li><strong>Domain:</strong> <code>https://qwankidoodisha.com/</code> (SSL Certificate active via Let's Encrypt / Cloudflare).</li>
              <li><strong>SEO Readiness:</strong> XML sitemap located at <code>/sitemap.xml</code> and robots.txt configured.</li>
              <li><strong>OpenGraph Cards:</strong> 1200x630px social previews pointing to official assets.</li>
              <li><strong>No Secrets in Client:</strong> All form submissions route through secure proxy or server-side mailer.</li>
              <li><strong>Accessibility:</strong> WCAG 2.2 AA compliant contrast, keyboard navigation, and reduced-motion support.</li>
            </ul>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={downloadDocumentation}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#008A68]" />
            <span>Download Integration Manual (TXT)</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded-md transition-colors cursor-pointer"
          >
            Close Guide
          </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};
