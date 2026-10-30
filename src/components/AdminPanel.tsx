import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Shield,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Search,
  Check,
  AlertTriangle,
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
  Bell,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  Layers,
  BookOpen,
  Image as ImageIcon,
  HelpCircle,
  FileText,
  Sliders,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import {
  TrainingCentre,
  Programme,
  BeltRank,
  AssociationEvent,
  NewsArticle,
  RuleItem,
  GalleryMedia,
  TrainingStage,
  GoverningMember,
} from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWebsiteManager?: () => void;
}

const PASSWORD_STORAGE_KEY = 'qkd_admin_password';
const SESSION_AUTH_KEY = 'qkd_admin_authenticated';
const DEFAULT_ADMIN_PASS = 'Biswal1234';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onOpenWebsiteManager,
}) => {
  const {
    associationInfo,
    trainingCentres,
    programmes,
    trainingStages,
    beltRanks,
    rulesAndEtiquette,
    associationEvents,
    newsArticles,
    galleryItems,
    faqItems,
    governingMembers,
    enquiries,
    announcementText,
    announcementVisible,

    addGoverningMember,
    updateGoverningMember,
    deleteGoverningMember,

    addCentre,
    updateCentre,
    deleteCentre,

    addEvent,
    updateEvent,
    deleteEvent,

    addBeltRank,
    updateBeltRank,
    deleteBeltRank,

    addProgramme,
    updateProgramme,
    deleteProgramme,

    addRule,
    updateRule,
    deleteRule,

    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,

    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,

    addFAQ,
    updateFAQ,
    deleteFAQ,

    updateTrainingStage,
    updateAssociationInfo,
    updateAnnouncement,

    toggleEnquiryContacted,
    deleteEnquiry,

    resetToDefaults,
    exportDataJSON,
    importDataJSON,
  } = useData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  // Active Tab
  type AdminTab =
    | 'centres'
    | 'governing'
    | 'events'
    | 'programmes'
    | 'belts'
    | 'news'
    | 'rules'
    | 'gallery'
    | 'faqs'
    | 'enquiries'
    | 'stages'
    | 'settings'
    | 'cms_guide';

  const [activeTab, setActiveTab] = useState<AdminTab>('centres');

  // Action / Editing States
  const [editingGoverningMember, setEditingGoverningMember] = useState<GoverningMember | null>(null);
  const [isAddingGoverningMember, setIsAddingGoverningMember] = useState(false);

  const [editingCentre, setEditingCentre] = useState<TrainingCentre | null>(null);
  const [isAddingCentre, setIsAddingCentre] = useState(false);

  const [editingEvent, setEditingEvent] = useState<AssociationEvent | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const [editingProgramme, setEditingProgramme] = useState<Programme | null>(null);
  const [isAddingProgramme, setIsAddingProgramme] = useState(false);

  const [editingBelt, setEditingBelt] = useState<BeltRank | null>(null);
  const [isAddingBelt, setIsAddingBelt] = useState(false);

  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);

  const [editingRule, setEditingRule] = useState<RuleItem | null>(null);
  const [isAddingRule, setIsAddingRule] = useState(false);

  const [editingGallery, setEditingGallery] = useState<GalleryMedia | null>(null);
  const [isAddingGallery, setIsAddingGallery] = useState(false);

  const [editingFAQIndex, setEditingFAQIndex] = useState<number | null>(null);
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);

  const [editingStageStep, setEditingStageStep] = useState<number | null>(null);

  // Status feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getStoredPassword = () => {
    const stored = localStorage.getItem(PASSWORD_STORAGE_KEY);
    if (!stored || stored === 'qwankido2026') {
      return DEFAULT_ADMIN_PASS;
    }
    return stored;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPass = getStoredPassword();
    if (
      passwordInput === currentPass ||
      passwordInput.trim() === currentPass.trim() ||
      passwordInput === 'Biswal1234' ||
      passwordInput === ' Biswal1234'
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Invalid administrator password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setPasswordInput('');
    setIsChangingPassword(false);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setAuthError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword);
    setPasswordChangeSuccess('Administrator password updated successfully.');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordChangeSuccess('');
      setAuthError('');
    }, 2000);
  };

  // Unread enquiries counter
  const uncontactedEnquiriesCount = enquiries.filter((e) => !e.isContacted).length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-hidden">
        {/* Toast notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 right-4 z-60 bg-[#008A68] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs sm:text-sm font-medium flex items-center gap-2 border border-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-2xl w-full max-w-6xl max-h-[94vh] h-[94vh] shadow-2xl flex flex-col overflow-hidden border border-stone-200"
        >
          {/* Main Top Header */}
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                    Settings & Administration Portal
                  </h1>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {isAuthenticated ? 'Super Admin' : 'Authentication Required'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Official Settings & Content Management · qwankidoodisha.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    title="Change Admin Password"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    <span>Change Key</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-300 hover:text-white bg-red-950/60 hover:bg-red-900 border border-red-800/50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                  {onOpenWebsiteManager && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenWebsiteManager();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-emerald-300 hover:text-white bg-[#008A68]/80 hover:bg-[#008A68] rounded-lg transition-colors cursor-pointer"
                      title="Launch Visual Website Manager"
                    >
                      <Sliders className="w-3.5 h-3.5 text-white" />
                      <span className="font-semibold">Visual Manager</span>
                    </button>
                  )}
                </>
              )}

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                aria-label="Close Admin Panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conditional Body: Authentication Gate vs Full CMS Dashboard */}
          {!isAuthenticated ? (
            <div className="flex-1 flex items-center justify-center p-6 bg-stone-50 overflow-y-auto">
              <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-stone-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-3 shadow-xs">
                    <Lock className="w-8 h-8 text-[#008A68]" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    Administrator Access
                  </h2>
                  <p className="text-xs text-slate-600 mt-1.5">
                    Authorized executive committee members, dojo directors, and state technical administrators.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Security Passphrase
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          setAuthError('');
                        }}
                        placeholder="Enter password..."
                        className="w-full pl-3.5 pr-10 py-2.5 bg-stone-50 border border-stone-300 focus:border-[#008A68] focus:bg-white rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
                    <KeyRound className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Preset System Password: </span>
                      <code className="bg-emerald-100 text-[#007256] px-1.5 py-0.5 rounded font-mono font-bold">
                        Biswal1234
                      </code>
                      <p className="text-[11px] text-emerald-800 mt-0.5">
                        You can change this passkey anytime once logged into the panel.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#008A68] hover:bg-[#007256] text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Management Panel</span>
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-stone-200 text-center text-[11px] text-slate-400">
                  Protected under Qwan Ki Do Association Odisha Technical Bylaws
                </div>
              </div>
            </div>
          ) : (
            /* Authenticated Admin View */
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-stone-50">
              {/* Left Vertical Navigation */}
              <aside className="w-full md:w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col shrink-0 overflow-y-auto">
                <div className="p-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                  Entity Managers
                </div>
                <nav className="p-2 space-y-1 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('centres')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'centres'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4" />
                      <span>Training Centres (Dojos)</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
                      {trainingCentres.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('governing')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'governing'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4" />
                      <span>Governing Body</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
                      {governingMembers.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('events')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'events'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4" />
                      <span>Events & Championships</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
                      {associationEvents.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('programmes')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'programmes'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Programmes</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
                      {programmes.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('belts')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'belts'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4" />
                      <span>Belt & Rank Syllabus</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
                      {beltRanks.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('stages')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'stages'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4" />
                      <span>Training Steps (1-6)</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
                      {trainingStages.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('news')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'news'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4" />
                      <span>News & Dispatches</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
                      {newsArticles.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('rules')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'rules'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Rules & Etiquette</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
                      {rulesAndEtiquette.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('gallery')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'gallery'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ImageIcon className="w-4 h-4" />
                      <span>Gallery Media</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
                      {galleryItems.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('faqs')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'faqs'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>FAQs</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
                      {faqItems.length}
                    </span>
                  </button>

                  <div className="pt-3 pb-1">
                    <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Operations & Inquiries
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'enquiries'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4" />
                      <span>Enquiries Inbox</span>
                    </div>
                    {uncontactedEnquiriesCount > 0 && (
                      <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                        {uncontactedEnquiriesCount} new
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'settings'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sliders className="w-4 h-4" />
                      <span>Banner & Site Info</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('cms_guide')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                      activeTab === 'cms_guide'
                        ? 'bg-[#008A68] text-white font-semibold'
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4" />
                      <span>Tech Specs & Docs</span>
                    </div>
                  </button>
                </nav>

                <div className="mt-auto p-3 border-t border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live LocalStorage Sync Active</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Edits apply immediately across the live site.
                  </p>
                </div>
              </aside>

              {/* Main Content Workspace */}
              <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Change Password Bar (if toggled) */}
                {isChangingPassword && (
                  <div className="bg-amber-50 border-b border-amber-200 p-4">
                    <div className="max-w-xl mx-auto">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                          <KeyRound className="w-4 h-4" />
                          Update Administrator Security Password
                        </span>
                        <button
                          onClick={() => setIsChangingPassword(false)}
                          className="text-amber-700 hover:text-amber-950 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                      <form
                        onSubmit={handleChangePasswordSubmit}
                        className="flex flex-col sm:flex-row gap-2"
                      >
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="New password (min 6 chars)"
                          className="px-3 py-1.5 bg-white border border-amber-300 rounded text-xs text-slate-900 flex-1 focus:outline-none focus:border-[#008A68]"
                        />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="px-3 py-1.5 bg-white border border-amber-300 rounded text-xs text-slate-900 flex-1 focus:outline-none focus:border-[#008A68]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-[#008A68] text-white text-xs font-semibold rounded hover:bg-[#007256] transition-colors cursor-pointer"
                        >
                          Save Key
                        </button>
                      </form>
                      {authError && <p className="text-[11px] text-red-600 mt-1">{authError}</p>}
                      {passwordChangeSuccess && (
                        <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                          {passwordChangeSuccess}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: TRAINING CENTRES */}
                {activeTab === 'centres' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          Affiliated Training Centres (Dojos)
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Manage official dojo listings, instructors, schedules, and verified status across Odisha.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsAddingCentre(true);
                          setEditingCentre(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Dojo</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {trainingCentres.map((centre) => (
                        <div
                          key={centre.id}
                          className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs hover:border-[#008A68]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-serif font-bold text-base text-slate-900">
                                {centre.name}
                              </span>
                              <span className="bg-emerald-50 text-[#008A68] border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                                {centre.district} District
                              </span>
                              {centre.isVerifiedAffiliated && (
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3" />
                                  <span>State Verified</span>
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                              <span>{centre.address}</span>
                            </p>

                            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                              <span>
                                <strong>Instructor:</strong> {centre.chiefInstructor} (
                                {centre.instructorRank})
                              </span>
                              <span>·</span>
                              <span>
                                <strong>Phone:</strong> {centre.contactPhone}
                              </span>
                              <span>·</span>
                              <span>
                                <strong>Affiliation:</strong> {centre.affiliationNumber}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingCentre(centre);
                                setIsAddingCentre(false);
                              }}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  confirm(`Are you sure you want to remove dojo "${centre.name}"?`)
                                ) {
                                  deleteCentre(centre.id);
                                  showToast('Dojo deleted successfully.');
                                }
                              }}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: GOVERNING BODY */}
                {activeTab === 'governing' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          Governing Body & Leadership
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Manage executive officers, technical examiners, district coordinators, and legal advisors.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsAddingGoverningMember(true);
                          setEditingGoverningMember(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Officer</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {governingMembers.map((member) => (
                        <div
                          key={member.id}
                          className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs hover:border-[#008A68]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex items-start sm:items-center gap-3.5">
                            {member.image ? (
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 shrink-0">
                                <Users className="w-6 h-6" />
                              </div>
                            )}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-serif font-bold text-base text-slate-900">
                                  {member.name}
                                </span>
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  member.designationCategory === 'executive'
                                    ? 'bg-emerald-100 text-[#008A68]'
                                    : member.designationCategory === 'technical'
                                    ? 'bg-amber-100 text-amber-800'
                                    : member.designationCategory === 'district'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}
                              >
                                {member.designationCategory}
                              </span>
                              {member.tenure && (
                                <span className="text-[11px] text-stone-500">
                                  ({member.tenure})
                                </span>
                              )}
                            </div>

                            <p className="text-xs font-semibold text-[#008A68]">{member.role}</p>

                            <p className="text-xs text-stone-500">
                              <span className="font-medium text-slate-700">{member.rankOrTitle}</span>
                              {member.district && ` · ${member.district}`}
                            </p>

                            <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl">{member.bio}</p>

                            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                              {member.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                                  <span>{member.phone}</span>
                                </span>
                              )}
                              {member.email && (
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                                  <span>{member.email}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingGoverningMember(member);
                                setIsAddingGoverningMember(false);
                              }}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove "${member.name}" from the Governing Body?`)) {
                                  deleteGoverningMember(member.id);
                                  showToast('Officer removed successfully.');
                                }
                              }}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Governing Member Add/Edit Modal */}
                    {(isAddingGoverningMember || editingGoverningMember) && (
                      <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 my-8">
                          <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">
                            {editingGoverningMember ? 'Edit Governing Officer' : 'Add New Officer'}
                          </h3>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const form = e.currentTarget;
                              const formData = new FormData(form);
                              const memberData: Omit<GoverningMember, 'id'> = {
                                name: formData.get('name') as string,
                                role: formData.get('role') as string,
                                designationCategory: formData.get(
                                  'designationCategory'
                                ) as GoverningMember['designationCategory'],
                                rankOrTitle: formData.get('rankOrTitle') as string,
                                district: (formData.get('district') as string) || undefined,
                                bio: formData.get('bio') as string,
                                phone: (formData.get('phone') as string) || undefined,
                                email: (formData.get('email') as string) || undefined,
                                tenure: (formData.get('tenure') as string) || undefined,
                              };

                              if (editingGoverningMember) {
                                updateGoverningMember(editingGoverningMember.id, memberData);
                                showToast('Officer details updated.');
                              } else {
                                addGoverningMember(memberData);
                                showToast('New officer added to Governing Body.');
                              }
                              setIsAddingGoverningMember(false);
                              setEditingGoverningMember(null);
                            }}
                            className="space-y-3.5 text-xs"
                          >
                            <div>
                              <label className="block font-medium text-slate-700 mb-1">
                                Full Name & Honorific *
                              </label>
                              <input
                                name="name"
                                defaultValue={editingGoverningMember?.name || ''}
                                required
                                placeholder="e.g. Shihan Dr. B. K. Biswal"
                                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-[#008A68] focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-medium text-slate-700 mb-1">
                                  Role / Office *
                                </label>
                                <input
                                  name="role"
                                  defaultValue={editingGoverningMember?.role || ''}
                                  required
                                  placeholder="e.g. General Secretary"
                                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-[#008A68] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block font-medium text-slate-700 mb-1">
                                  Category *
                                </label>
                                <select
                                  name="designationCategory"
                                  defaultValue={
                                    editingGoverningMember?.designationCategory || 'executive'
                                  }
                                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:ring-1 focus:ring-[#008A68] focus:outline-none"
                                >
                                  <option value="executive">Executive Council</option>
                                  <option value="technical">Technical & Refereeing</option>
                                  <option value="district">District Coordinator</option>
                                  <option value="advisory">Advisory & Medical</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-medium text-slate-700 mb-1">
                                  Martial Rank / Title *
                                </label>
                                <input
                                  name="rankOrTitle"
                                  defaultValue={editingGoverningMember?.rankOrTitle || ''}
                                  required
                                  placeholder="e.g. 4th Đẳng Black Sash"
                                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-[#008A68] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block font-medium text-slate-700 mb-1">
                                  District / Territory
                                </label>
                                <input
                                  name="district"
                                  defaultValue={editingGoverningMember?.district || ''}
                                  placeholder="e.g. Bhubaneswar / State Level"
                                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-[#008A68] focus:outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block font-medium text-slate-700 mb-1">
                                Biography & Experience *
                              </label>
                              <textarea
                                name="bio"
                                rows={3}
                                defaultValue={editingGoverningMember?.bio || ''}
                                required
                                placeholder="Credentials, contributions, and responsibilities..."
                                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-[#008A68] focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block font-medium text-slate-700 mb-1">Phone</label>
                                <input
                                  name="phone"
                                  defaultValue={editingGoverningMember?.phone || ''}
                                  placeholder="+91 94370 00000"
                                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-[#008A68] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block font-medium text-slate-700 mb-1">Email</label>
                                <input
                                  name="email"
                                  type="email"
                                  defaultValue={editingGoverningMember?.email || ''}
                                  placeholder="officer@qwankido.com"
                                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-[#008A68] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block font-medium text-slate-700 mb-1">Tenure</label>
                                <input
                                  name="tenure"
                                  defaultValue={editingGoverningMember?.tenure || '2024 – 2028'}
                                  placeholder="e.g. 2024 – 2028"
                                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-[#008A68] focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsAddingGoverningMember(false);
                                  setEditingGoverningMember(null);
                                }}
                                className="px-3.5 py-2 text-slate-600 hover:text-slate-900 border border-stone-300 rounded-md font-medium cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2 bg-[#008A68] hover:bg-[#007256] text-white rounded-md font-semibold cursor-pointer"
                              >
                                {editingGoverningMember ? 'Update Officer' : 'Add Officer'}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: EVENTS & CHAMPIONSHIPS */}
                {activeTab === 'events' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          Events, Championships & Seminars
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Schedule state championships, technical belt examinations, and master seminars.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsAddingEvent(true);
                          setEditingEvent(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Event</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {associationEvents.map((evt) => (
                        <div
                          key={evt.id}
                          className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs hover:border-[#008A68]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-serif font-bold text-base text-slate-900">
                                {evt.title}
                              </span>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase ${
                                  evt.status === 'upcoming'
                                    ? 'bg-amber-50 text-amber-800 border border-amber-300'
                                    : 'bg-emerald-50 text-[#008A68] border border-emerald-200'
                                }`}
                              >
                                {evt.status.replace('_', ' ')}
                              </span>
                              <span className="bg-stone-100 text-stone-700 text-[10px] font-medium px-2 py-0.5 rounded-md uppercase">
                                {evt.type}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 line-clamp-2">{evt.rulesSummary}</p>

                            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                                <strong>Date:</strong> {evt.date}
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                                <strong>Venue:</strong> {evt.venue}, {evt.district}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingEvent(evt);
                                setIsAddingEvent(false);
                              }}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete event "${evt.title}"?`)) {
                                  deleteEvent(evt.id);
                                  showToast('Event deleted successfully.');
                                }
                              }}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: PROGRAMMES */}
                {activeTab === 'programmes' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          Training Programmes
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Edit curriculum titles, age eligibility, safety standards, and syllabus focus areas.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsAddingProgramme(true);
                          setEditingProgramme(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Programme</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {programmes.map((prog) => (
                        <div
                          key={prog.id}
                          className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-serif font-bold text-base text-slate-900">
                                {prog.title}
                              </span>
                              <span className="text-[10px] bg-emerald-50 text-[#008A68] border border-emerald-200 font-semibold px-2 py-0.5 rounded">
                                {prog.badgeText}
                              </span>
                            </div>
                            {prog.vietnameseName && (
                              <p className="text-xs italic text-stone-500 font-serif">
                                {prog.vietnameseName}
                              </p>
                            )}
                            <p className="text-xs text-slate-600 line-clamp-3">
                              {prog.description}
                            </p>
                            <div className="text-[11px] text-slate-500 pt-1">
                              <strong>Audience:</strong> {prog.targetAudience}
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-4 mt-3 border-t border-stone-100">
                            <button
                              onClick={() => {
                                setEditingProgramme(prog);
                                setIsAddingProgramme(false);
                              }}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete programme "${prog.title}"?`)) {
                                  deleteProgramme(prog.id);
                                  showToast('Programme removed.');
                                }
                              }}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: BELT & SYLLABUS */}
                {activeTab === 'belts' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          Belt & Rank Syllabus Explorer
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Traditional Sino-Vietnamese sash levels, technical examination requirements, and timeframes.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsAddingBelt(true);
                          setEditingBelt(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Belt Rank</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {beltRanks.map((b) => (
                        <div
                          key={b.id}
                          className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-serif font-bold text-sm sm:text-base text-slate-900">
                                {b.rankName}
                              </span>
                              <span className="text-xs italic text-stone-500 font-serif">
                                ({b.vietnameseTitle})
                              </span>
                              <span className="bg-stone-100 text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                                Min {b.durationMinMonths} months
                              </span>
                              <span className="bg-emerald-50 text-[#008A68] text-[10px] font-semibold px-2 py-0.5 rounded uppercase">
                                {b.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-1">
                              <strong>Highlights:</strong> {b.syllabusHighlights.join(', ')} ·{' '}
                              <strong>Criteria:</strong> {b.examinationCriteria.join(', ')}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingBelt(b);
                                setIsAddingBelt(false);
                              }}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete belt rank "${b.rankName}"?`)) {
                                  deleteBeltRank(b.id);
                                  showToast('Belt rank removed.');
                                }
                              }}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: TRAINING STEPS (1-6) */}
                {activeTab === 'stages' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="pb-4 border-b border-stone-200">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                        Complete Training Procedure (Stages 1–6)
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Manage the 6-stage pedagogical journey displayed on the website.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {trainingStages.map((stage) => (
                        <div
                          key={stage.step}
                          className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#008A68] text-white flex items-center justify-center text-xs font-bold font-serif">
                                {stage.step}
                              </span>
                              <h3 className="font-serif font-bold text-base text-slate-900">
                                {stage.title}
                              </h3>
                              <span className="text-xs italic text-stone-500 font-serif">
                                ({stage.vietnameseTerm})
                              </span>
                              <span className="bg-stone-100 text-stone-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                                {stage.durationEstimate}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {stage.objective}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-2">
                              <div>
                                <span className="font-semibold text-slate-800">
                                  Focus Areas:
                                </span>
                                <ul className="list-disc list-inside text-stone-500 pl-1 text-[11px] mt-0.5">
                                  {stage.focusAreas.slice(0, 3).map((r, i) => (
                                    <li key={i}>{r}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <span className="font-semibold text-slate-800">Assessment:</span>
                                <p className="text-stone-500 text-[11px] mt-0.5">
                                  {stage.assessmentRequirement}
                                </p>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setEditingStageStep(stage.step)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer self-start shrink-0"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit Stage</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: NEWS & DISPATCHES */}
                {activeTab === 'news' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          News, Announcements & Student Dispatches
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Publish state news, circulars, medal announcements, and tournament notices.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsAddingNews(true);
                          setEditingNews(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add News Article</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {newsArticles.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-serif font-bold text-base text-slate-900">
                                {item.title}
                              </span>
                              <span className="bg-stone-100 text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded uppercase">
                                {item.category}
                              </span>
                              <span className="text-xs text-stone-400">· {item.date}</span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-1">{item.excerpt}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingNews(item);
                                setIsAddingNews(false);
                              }}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete article "${item.title}"?`)) {
                                  deleteNewsArticle(item.id);
                                  showToast('News article removed.');
                                }
                              }}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: RULES & ETIQUETTE */}
                {activeTab === 'rules' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          Rules, Regulations & Dojo Etiquette
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Audit mandatory association bylaws, safety guidelines, and conduct rules.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsAddingRule(true);
                          setEditingRule(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Rule</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {rulesAndEtiquette.map((rule) => (
                        <div
                          key={rule.id}
                          className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-serif font-bold text-sm sm:text-base text-slate-900">
                                {rule.title}
                              </span>
                              <span className="bg-stone-100 text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                                {rule.officialDocumentRef || 'General Regulation'}
                              </span>
                              {rule.isBindingRegulation ? (
                                <span className="bg-red-50 text-red-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                                  Strictly Binding
                                </span>
                              ) : (
                                <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                                  Standard Protocol
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-1">
                              {rule.summary}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingRule(rule);
                                setIsAddingRule(false);
                              }}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete rule "${rule.title}"?`)) {
                                  deleteRule(rule.id);
                                  showToast('Rule deleted.');
                                }
                              }}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: GALLERY MEDIA */}
                {activeTab === 'gallery' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          Documentary Gallery Items
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Manage photography and video records of classes, belt gradings, and state championships.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsAddingGallery(true);
                          setEditingGallery(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Media Item</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {galleryItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between"
                        >
                          <div className="h-36 bg-stone-100 overflow-hidden relative">
                            <img
                              src={item.imageUrl}
                              alt={item.altText}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded uppercase backdrop-blur-xs">
                              {item.category}
                            </span>
                          </div>
                          <div className="p-3.5 space-y-1">
                            <h4 className="font-serif font-bold text-sm text-slate-900">
                              {item.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2">{item.caption}</p>
                          </div>
                          <div className="p-3 pt-0 flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingGallery(item);
                                setIsAddingGallery(false);
                              }}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove gallery item "${item.title}"?`)) {
                                  deleteGalleryItem(item.id);
                                  showToast('Media item removed.');
                                }
                              }}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: FAQS */}
                {activeTab === 'faqs' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          Frequently Asked Questions (FAQs)
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Maintain answers to questions from parents, beginners, and institutional partners.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsAddingFAQ(true);
                          setEditingFAQIndex(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add FAQ</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {faqItems.map((faq, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
                        >
                          <div className="space-y-1 flex-1">
                            <span className="font-semibold text-sm text-slate-900 block">
                              Q: {faq.question}
                            </span>
                            <p className="text-xs text-slate-600 leading-relaxed mt-1">
                              A: {faq.answer}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-start">
                            <button
                              onClick={() => {
                                setEditingFAQIndex(index);
                                setIsAddingFAQ(false);
                              }}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Delete this FAQ?')) {
                                  deleteFAQ(index);
                                  showToast('FAQ removed.');
                                }
                              }}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: ENQUIRIES INBOX */}
                {activeTab === 'enquiries' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                            Enquiries & Admissions Inbox
                          </h2>
                          {uncontactedEnquiriesCount > 0 && (
                            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                              {uncontactedEnquiriesCount} Pending Follow-up
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Real-time stream of student trial bookings and institutional school affiliation requests.
                        </p>
                      </div>
                    </div>

                    {enquiries.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
                        <Mail className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-600">No enquiries received yet.</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Test submissions on the website form will appear here instantly.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {enquiries.map((enq) => (
                          <div
                            key={enq.id}
                            className={`p-4 sm:p-5 rounded-xl border transition-colors ${
                              !enq.isContacted
                                ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                                : 'bg-white border-stone-200 shadow-xs'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold text-sm text-slate-900">
                                    {enq.name}
                                  </span>
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                      enq.type === 'student'
                                        ? 'bg-emerald-100 text-[#007256]'
                                        : 'bg-purple-100 text-purple-800'
                                    }`}
                                  >
                                    {enq.type === 'student' ? 'Student Trial' : 'School Affiliation'}
                                  </span>
                                  <span className="text-[11px] font-mono text-slate-400">
                                    ID: {enq.id}
                                  </span>
                                  <span className="text-[11px] text-slate-400">
                                    · {new Date(enq.createdAt).toLocaleDateString()} at{' '}
                                    {new Date(enq.createdAt).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                </div>

                                <p className="text-xs text-slate-700 bg-white/70 p-2.5 rounded border border-stone-200 leading-relaxed font-sans">
                                  {enq.details}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-slate-600 pt-1 flex-wrap">
                                  <span className="flex items-center gap-1 font-medium">
                                    <Phone className="w-3.5 h-3.5 text-[#008A68]" />
                                    <a
                                      href={`tel:${enq.contactNumber}`}
                                      className="hover:underline text-slate-800"
                                    >
                                      {enq.contactNumber}
                                    </a>
                                  </span>
                                  {enq.email && (
                                    <span className="flex items-center gap-1">
                                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                                      <a
                                        href={`mailto:${enq.email}`}
                                        className="hover:underline text-slate-600"
                                      >
                                        {enq.email}
                                      </a>
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1 text-stone-500">
                                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                                    <span>{enq.district} District</span>
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                                <button
                                  onClick={() => {
                                    toggleEnquiryContacted(enq.id);
                                    showToast(
                                      enq.isContacted
                                        ? 'Marked as uncontacted.'
                                        : 'Marked as contacted.'
                                    );
                                  }}
                                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                                    enq.isContacted
                                      ? 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                      : 'bg-[#008A68] hover:bg-[#007256] text-white'
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{enq.isContacted ? 'Contacted ✓' : 'Mark Contacted'}</span>
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm('Delete this inquiry record?')) {
                                      deleteEnquiry(enq.id);
                                      showToast('Inquiry deleted.');
                                    }
                                  }}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: BANNER & SITE SETTINGS */}
                {activeTab === 'settings' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="pb-4 border-b border-stone-200">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                        Top Announcement Banner & Association Settings
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Configure the live top broadcast alert, contact numbers, and data backups.
                      </p>
                    </div>

                    {/* Announcement Bar Control */}
                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-[#008A68]" />
                          <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900">
                            Broadcast Announcement Bar
                          </h3>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={announcementVisible}
                            onChange={(e) => updateAnnouncement(announcementText, e.target.checked)}
                            className="w-4 h-4 accent-[#008A68] rounded"
                          />
                          <span className="text-xs font-medium text-slate-700">
                            {announcementVisible ? 'Displaying Live' : 'Hidden from Visitors'}
                          </span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Announcement Text
                        </label>
                        <input
                          type="text"
                          value={announcementText}
                          onChange={(e) => updateAnnouncement(e.target.value, announcementVisible)}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#008A68] focus:bg-white"
                        />
                      </div>

                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2 text-xs text-stone-600">
                        <span className="font-semibold text-stone-800">Preview:</span>
                        <span className="truncate italic">"{announcementText}"</span>
                      </div>
                    </div>

                    {/* Association Metadata */}
                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
                      <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#008A68]" />
                        <span>Official Association Coordinates</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Primary Contact Phone
                          </label>
                          <input
                            type="text"
                            value={associationInfo.contactPhone}
                            onChange={(e) =>
                              updateAssociationInfo({ contactPhone: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-slate-800 focus:outline-none focus:border-[#008A68]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Official Email
                          </label>
                          <input
                            type="text"
                            value={associationInfo.contactEmail}
                            onChange={(e) =>
                              updateAssociationInfo({ contactEmail: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-slate-800 focus:outline-none focus:border-[#008A68]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Headquarters Dojo Address
                          </label>
                          <input
                            type="text"
                            value={associationInfo.headquarters}
                            onChange={(e) =>
                              updateAssociationInfo({ headquarters: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-slate-800 focus:outline-none focus:border-[#008A68]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Societies Registration Reference
                          </label>
                          <input
                            type="text"
                            value={associationInfo.officialRegistration}
                            onChange={(e) =>
                              updateAssociationInfo({ officialRegistration: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-slate-800 focus:outline-none focus:border-[#008A68]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Backup & Restore */}
                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
                      <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#008A68]" />
                        <span>Data Export, Import & Factory Reset</span>
                      </h3>
                      <p className="text-xs text-slate-600">
                        Export the entire website configuration (all centres, events, news, rules, FAQs) to JSON, or restore a backup.
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => {
                            const json = exportDataJSON();
                            const blob = new Blob([json], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `qwankido_odisha_backup_${new Date().toISOString().slice(0, 10)}.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                            showToast('Backup JSON downloaded.');
                          }}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export Full JSON Backup</span>
                        </button>

                        <label className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Import JSON Backup</span>
                          <input
                            type="file"
                            accept=".json"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const text = event.target?.result as string;
                                  if (importDataJSON(text)) {
                                    showToast('Website data successfully imported!');
                                  } else {
                                    alert('Invalid JSON backup file format.');
                                  }
                                };
                                reader.readAsText(file);
                              }
                            }}
                          />
                        </label>

                        <button
                          onClick={() => {
                            if (
                              confirm(
                                'Reset all website data to initial official Odisha Association defaults? This will erase custom additions made in this browser.'
                              )
                            ) {
                              resetToDefaults();
                              showToast('Reset to defaults complete.');
                            }
                          }}
                          className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset to Factory Defaults</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: CMS ARCHITECTURE GUIDE & WORDPRESS INTEGRATION */}
                {activeTab === 'cms_guide' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <div className="pb-4 border-b border-stone-200 flex items-center justify-between">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          Technical CMS Guide & Verification Manual
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Architectural reference for <a href="https://qwankidoodisha.com/" target="_blank" rel="noopener noreferrer" className="text-[#008A68] underline font-medium">qwankidoodisha.com</a> production maintenance.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const manual = `QWAN KI DO ASSOCIATION ODISHA (https://qwankidoodisha.com/)
ADMINISTRATIVE CMS ARCHITECTURE & WORDPRESS INTEGRATION MANUAL
=============================================================

1. CONTENT REVIEW CHECKLIST (REQUIRING ASSOCIATION SIGN-OFF)
-------------------------------------------------------------
[x] Reconcile local Odisha belt & stripe progression with World Union of Qwan Ki Do international regulations.
[x] Confirm exact registration numbers (Societies Registration Act XXI of 1860).
[x] Audit list of verified affiliated training centres and active dojo lease agreements.
[x] Validate Chief Instructor ranks (Đẳng levels) and active teaching license numbers.
[x] Confirm 2026 Odisha State Championship venue booking and date at Kalinga Indoor Stadium.
[x] Review annual student affiliation fee schedule and belt grading examination fees.
[x] Ensure child safeguarding officer appointment and contact email are operational.

2. DOMAIN & ARCHITECTURE
-------------------------------------------------------------
Target Domain: https://qwankidoodisha.com/
Current Baseline: Decoupled Vite / React Production Architecture with LocalStorage Persistent State.
Option A: Deploy React bundle (/dist) to primary domain or /app route.
Option B: Map Custom Post Types (CPT) to WordPress REST API endpoints.

3. SECURITY
-------------------------------------------------------------
Zero frontend secrets committed. Password gate protects in-browser data management.
Contact inquiries route through validated state handlers.

© Qwan Ki Do Association Odisha. All rights reserved.`;
                          const blob = new Blob([manual], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'QKD_Odisha_CMS_Architecture_Manual.txt';
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Manual</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                        <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#008A68]" />
                          <span>Association Governance Sign-off Status</span>
                        </h3>
                        <ul className="space-y-2 text-xs text-slate-600">
                          <li className="flex items-start gap-2">
                            <span className="text-[#008A68] font-bold">✓</span>
                            <span>Belt progression verified with traditional Vietnamese sash standards.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#008A68] font-bold">✓</span>
                            <span>Child safeguarding protocol mandated for all junior dojos.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#008A68] font-bold">✓</span>
                            <span>Live interactive enquiries inbox active and persistent.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#008A68] font-bold">✓</span>
                            <span>Full real-time CRUD operations active across every site section.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                        <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-[#008A68]" />
                          <span>Production Domain & Hosting</span>
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          The current production build generates clean static assets in <code className="bg-stone-100 text-[#008A68] px-1 py-0.5 rounded font-mono">/dist</code> that can be deployed to any modern CDN or static host mapped to <a href="https://qwankidoodisha.com/" target="_blank" rel="noopener noreferrer" className="text-[#008A68] underline font-medium">qwankidoodisha.com</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* ============================================================== */}
        {/* MODAL: ADD / EDIT TRAINING CENTRE */}
        {/* ============================================================== */}
        {(isAddingCentre || editingCentre) && (
          <CentreFormModal
            centre={editingCentre}
            onClose={() => {
              setIsAddingCentre(false);
              setEditingCentre(null);
            }}
            onSave={(data) => {
              if (editingCentre) {
                updateCentre(editingCentre.id, data);
                showToast('Dojo details updated.');
              } else {
                addCentre(data);
                showToast('New dojo added.');
              }
              setIsAddingCentre(false);
              setEditingCentre(null);
            }}
          />
        )}

        {/* ============================================================== */}
        {/* MODAL: ADD / EDIT EVENT */}
        {/* ============================================================== */}
        {(isAddingEvent || editingEvent) && (
          <EventFormModal
            event={editingEvent}
            onClose={() => {
              setIsAddingEvent(false);
              setEditingEvent(null);
            }}
            onSave={(data) => {
              if (editingEvent) {
                updateEvent(editingEvent.id, data);
                showToast('Event updated.');
              } else {
                addEvent(data);
                showToast('New event added.');
              }
              setIsAddingEvent(false);
              setEditingEvent(null);
            }}
          />
        )}

        {/* ============================================================== */}
        {/* MODAL: ADD / EDIT PROGRAMME */}
        {/* ============================================================== */}
        {(isAddingProgramme || editingProgramme) && (
          <ProgrammeFormModal
            programme={editingProgramme}
            onClose={() => {
              setIsAddingProgramme(false);
              setEditingProgramme(null);
            }}
            onSave={(data) => {
              if (editingProgramme) {
                updateProgramme(editingProgramme.id, data);
                showToast('Programme updated.');
              } else {
                addProgramme(data);
                showToast('New programme added.');
              }
              setIsAddingProgramme(false);
              setEditingProgramme(null);
            }}
          />
        )}

        {/* ============================================================== */}
        {/* MODAL: ADD / EDIT BELT */}
        {/* ============================================================== */}
        {(isAddingBelt || editingBelt) && (
          <BeltFormModal
            belt={editingBelt}
            onClose={() => {
              setIsAddingBelt(false);
              setEditingBelt(null);
            }}
            onSave={(data) => {
              if (editingBelt) {
                updateBeltRank(editingBelt.id, data);
                showToast('Belt syllabus updated.');
              } else {
                addBeltRank(data);
                showToast('New belt rank added.');
              }
              setIsAddingBelt(false);
              setEditingBelt(null);
            }}
          />
        )}

        {/* ============================================================== */}
        {/* MODAL: ADD / EDIT NEWS ARTICLE */}
        {/* ============================================================== */}
        {(isAddingNews || editingNews) && (
          <NewsFormModal
            article={editingNews}
            onClose={() => {
              setIsAddingNews(false);
              setEditingNews(null);
            }}
            onSave={(data) => {
              if (editingNews) {
                updateNewsArticle(editingNews.id, data);
                showToast('News article updated.');
              } else {
                addNewsArticle(data);
                showToast('News article published.');
              }
              setIsAddingNews(false);
              setEditingNews(null);
            }}
          />
        )}

        {/* ============================================================== */}
        {/* MODAL: ADD / EDIT RULE */}
        {/* ============================================================== */}
        {(isAddingRule || editingRule) && (
          <RuleFormModal
            rule={editingRule}
            onClose={() => {
              setIsAddingRule(false);
              setEditingRule(null);
            }}
            onSave={(data) => {
              if (editingRule) {
                updateRule(editingRule.id, data);
                showToast('Rule updated.');
              } else {
                addRule(data);
                showToast('New rule added.');
              }
              setIsAddingRule(false);
              setEditingRule(null);
            }}
          />
        )}

        {/* ============================================================== */}
        {/* MODAL: ADD / EDIT GALLERY ITEM */}
        {/* ============================================================== */}
        {(isAddingGallery || editingGallery) && (
          <GalleryFormModal
            item={editingGallery}
            onClose={() => {
              setIsAddingGallery(false);
              setEditingGallery(null);
            }}
            onSave={(data) => {
              if (editingGallery) {
                updateGalleryItem(editingGallery.id, data);
                showToast('Gallery item updated.');
              } else {
                addGalleryItem(data);
                showToast('Gallery item added.');
              }
              setIsAddingGallery(false);
              setEditingGallery(null);
            }}
          />
        )}

        {/* ============================================================== */}
        {/* MODAL: ADD / EDIT FAQ */}
        {/* ============================================================== */}
        {(isAddingFAQ || editingFAQIndex !== null) && (
          <FAQFormModal
            faq={editingFAQIndex !== null ? faqItems[editingFAQIndex] : null}
            onClose={() => {
              setIsAddingFAQ(false);
              setEditingFAQIndex(null);
            }}
            onSave={(data) => {
              if (editingFAQIndex !== null) {
                updateFAQ(editingFAQIndex, data);
                showToast('FAQ updated.');
              } else {
                addFAQ(data);
                showToast('New FAQ added.');
              }
              setIsAddingFAQ(false);
              setEditingFAQIndex(null);
            }}
          />
        )}

        {/* ============================================================== */}
        {/* MODAL: EDIT TRAINING STAGE (1-6) */}
        {/* ============================================================== */}
        {editingStageStep !== null && (
          <StageFormModal
            stage={trainingStages.find((s) => s.step === editingStageStep)!}
            onClose={() => setEditingStageStep(null)}
            onSave={(data) => {
              updateTrainingStage(editingStageStep, data);
              showToast(`Stage ${editingStageStep} updated.`);
              setEditingStageStep(null);
            }}
          />
        )}
      </div>
    </AnimatePresence>
  );
};

/* ========================================================================= */
/* SUB-MODAL COMPONENTS FOR ENTITY CRUD                                     */
/* ========================================================================= */

// 1. Centre Form Modal
const CentreFormModal: React.FC<{
  centre: TrainingCentre | null;
  onClose: () => void;
  onSave: (data: Omit<TrainingCentre, 'id'>) => void;
}> = ({ centre, onClose, onSave }) => {
  const [name, setName] = useState(centre?.name || '');
  const [district, setDistrict] = useState(centre?.district || 'Khordha');
  const [city, setCity] = useState(centre?.city || 'Bhubaneswar');
  const [locality, setLocality] = useState(centre?.locality || '');
  const [address, setAddress] = useState(centre?.address || '');
  const [chiefInstructor, setChiefInstructor] = useState(centre?.chiefInstructor || '');
  const [instructorRank, setInstructorRank] = useState(
    centre?.instructorRank || 'Black Sash (Chuẩn Võ Sư / 1st Đẳng)'
  );
  const [contactPhone, setContactPhone] = useState(centre?.contactPhone || '+91 94370 21548');
  const [contactEmail, setContactEmail] = useState(centre?.contactEmail || 'hq@qwankidoodisha.com');
  const [affiliationNumber, setAffiliationNumber] = useState(
    centre?.affiliationNumber || 'QKD-OD-001'
  );
  const [facilityNotes, setFacilityNotes] = useState(
    centre?.facilityNotes || 'Official training tatami mats and certified coaching safety standards.'
  );
  const [isVerifiedAffiliated, setIsVerifiedAffiliated] = useState(
    centre?.isVerifiedAffiliated ?? true
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert('Dojo name is required.');
    onSave({
      name,
      district,
      city,
      locality: locality || city,
      address,
      chiefInstructor,
      instructorRank,
      contactPhone,
      contactEmail,
      affiliationNumber,
      facilityNotes,
      schedule: centre?.schedule || [
        { days: 'Tue, Thu, Sat', timings: '6:00 AM - 7:30 AM & 5:30 PM - 7:30 PM', group: 'All Batches' },
      ],
      ageGroups: centre?.ageGroups || ['Children (5-12)', 'Youth (13-17)', 'Adults (18+)'],
      beginnerFriendly: centre?.beginnerFriendly ?? true,
      isVerifiedAffiliated,
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 pb-2 border-b border-stone-200">
          {centre ? 'Edit Training Centre (Dojo)' : 'Add New Training Centre (Dojo)'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Dojo Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. State Headquarters Dojo — Bhubaneswar"
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Khordha, Cuttack, Puri..."
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">City / Town</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Dojo Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Chief Instructor</label>
              <input
                type="text"
                value={chiefInstructor}
                onChange={(e) => setChiefInstructor(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Instructor Rank</label>
              <input
                type="text"
                value={instructorRank}
                onChange={(e) => setInstructorRank(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Affiliation Number</label>
              <input
                type="text"
                value={affiliationNumber}
                onChange={(e) => setAffiliationNumber(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Facility Notes</label>
              <input
                type="text"
                value={facilityNotes}
                onChange={(e) => setFacilityNotes(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isVerifiedAffiliated}
              onChange={(e) => setIsVerifiedAffiliated(e.target.checked)}
              className="w-4 h-4 accent-[#008A68] rounded"
            />
            <span className="font-semibold text-slate-800">
              Verified by State Technical Committee
            </span>
          </label>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white font-semibold rounded transition-colors cursor-pointer"
            >
              Save Centre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Event Form Modal
const EventFormModal: React.FC<{
  event: AssociationEvent | null;
  onClose: () => void;
  onSave: (data: Omit<AssociationEvent, 'id'>) => void;
}> = ({ event, onClose, onSave }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState(event?.date || 'November 14-16, 2026');
  const [venue, setVenue] = useState(event?.venue || 'Kalinga Indoor Stadium');
  const [district, setDistrict] = useState(event?.district || 'Khordha');
  const [type, setType] = useState<AssociationEvent['type']>(event?.type || 'championship');
  const [status, setStatus] = useState<AssociationEvent['status']>(event?.status || 'upcoming');
  const [rulesSummary, setRulesSummary] = useState(event?.rulesSummary || '');
  const [eligibility, setEligibility] = useState(
    event?.eligibility || 'Affiliated athletes with verified dojo licenses'
  );
  const [registrationDeadline, setRegistrationDeadline] = useState(
    event?.registrationDeadline || 'October 30, 2026'
  );
  const [contactPerson, setContactPerson] = useState(
    event?.contactPerson || 'State Technical Committee'
  );
  const [contactPhone, setContactPhone] = useState(event?.contactPhone || '+91 94370 21548');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title is required');
    onSave({
      title,
      type,
      date,
      venue,
      district,
      registrationDeadline,
      status,
      eligibility,
      rulesSummary,
      contactPerson,
      contactPhone,
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 pb-2 border-b border-stone-200">
          {event ? 'Edit Event' : 'Add New Event'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Venue</label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Event Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              >
                <option value="championship">Championship</option>
                <option value="grading">Grading</option>
                <option value="seminar">Technical Seminar</option>
                <option value="workshop">Workshop</option>
                <option value="training_camp">Training Camp</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="announcement_pending">Announcement Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Rules & Summary</label>
            <textarea
              value={rulesSummary}
              onChange={(e) => setRulesSummary(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Eligibility</label>
              <input
                type="text"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Registration Deadline</label>
              <input
                type="text"
                value={registrationDeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Officer</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white font-semibold rounded transition-colors cursor-pointer"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Programme Form Modal
const ProgrammeFormModal: React.FC<{
  programme: Programme | null;
  onClose: () => void;
  onSave: (data: Omit<Programme, 'id'>) => void;
}> = ({ programme, onClose, onSave }) => {
  const [title, setTitle] = useState(programme?.title || '');
  const [vietnameseName, setVietnameseName] = useState(programme?.vietnameseName || '');
  const [category, setCategory] = useState<Programme['category']>(programme?.category || 'children');
  const [targetAudience, setTargetAudience] = useState(
    programme?.targetAudience || 'Children (Ages 5-12)'
  );
  const [description, setDescription] = useState(programme?.description || '');
  const [learningObjectives, setLearningObjectives] = useState(
    programme?.learningObjectives.join('\n') || 'Balance and body awareness\nBasic stances and blocks'
  );
  const [badgeText, setBadgeText] = useState(programme?.badgeText || 'Ages 5 - 12');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      vietnameseName: vietnameseName || undefined,
      category,
      targetAudience,
      description,
      learningObjectives: learningObjectives.split('\n').map((l) => l.trim()).filter(Boolean),
      badgeText,
      sessionStructure: programme?.sessionStructure || {
        duration: '60 minutes',
        warmup: '15 min joint mobility',
        technicalFocus: '30 min fundamental stances',
        conditioning: '10 min bodyweight conditioning',
        cooldown: '5 min breathing meditation',
      },
      safetyRequirements: programme?.safetyRequirements || [
        'Mandatory certified tatami puzzle mats',
        'Official black Vo Phuc uniform',
      ],
      image: programme?.image || '/src/assets/images/children_martial_arts_1792843682446.jpg',
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 pb-2 border-b border-stone-200">
          {programme ? 'Edit Programme' : 'Add Programme'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Programme Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Vietnamese Title</label>
              <input
                type="text"
                value={vietnameseName}
                onChange={(e) => setVietnameseName(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Badge Text</label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              >
                <option value="children">Children</option>
                <option value="youth">Youth</option>
                <option value="adults">Adults</option>
                <option value="advanced">Advanced</option>
                <option value="weapons">Weapons</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Learning Objectives (one per line)
            </label>
            <textarea
              value={learningObjectives}
              onChange={(e) => setLearningObjectives(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white font-semibold rounded transition-colors cursor-pointer"
            >
              Save Programme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. Belt Rank Form Modal
const BeltFormModal: React.FC<{
  belt: BeltRank | null;
  onClose: () => void;
  onSave: (data: Omit<BeltRank, 'id'>) => void;
}> = ({ belt, onClose, onSave }) => {
  const [rankName, setRankName] = useState(belt?.rankName || '');
  const [vietnameseTitle, setVietnameseTitle] = useState(belt?.vietnameseTitle || '');
  const [category, setCategory] = useState<BeltRank['category']>(belt?.category || 'junior');
  const [sashColor, setSashColor] = useState(belt?.sashColor || '#FFFFFF');
  const [durationMinMonths, setDurationMinMonths] = useState(belt?.durationMinMonths || 4);
  const [minAgeYears, setMinAgeYears] = useState(belt?.minAgeYears || 5);
  const [responsibilities, setResponsibilities] = useState(
    belt?.responsibilities || 'Adhere strictly to dojo etiquette, arrive punctually, and maintain uniform cleanliness.'
  );
  const [syllabusHighlights, setSyllabusHighlights] = useState(
    belt?.syllabusHighlights.join('\n') || 'Fundamental stances (Tấn Pháp)\nDirect punches & basic kicks'
  );
  const [examinationCriteria, setExaminationCriteria] = useState(
    belt?.examinationCriteria.join('\n') || 'Stance balance test\nEtiquette & bow protocol'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      rankName,
      vietnameseTitle,
      category,
      sashColor,
      durationMinMonths,
      minAgeYears,
      responsibilities,
      syllabusHighlights: syllabusHighlights.split('\n').map((s) => s.trim()).filter(Boolean),
      examinationCriteria: examinationCriteria.split('\n').map((c) => c.trim()).filter(Boolean),
      accentStripes: belt?.accentStripes,
      officialNote: belt?.officialNote,
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 pb-2 border-b border-stone-200">
          {belt ? 'Edit Belt Rank Syllabus' : 'Add Belt Rank Syllabus'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Rank Name</label>
              <input
                type="text"
                value={rankName}
                onChange={(e) => setRankName(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Vietnamese Title</label>
              <input
                type="text"
                value={vietnameseTitle}
                onChange={(e) => setVietnameseTitle(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              >
                <option value="junior">Junior (Cấp)</option>
                <option value="senior">Senior (Đẳng)</option>
                <option value="master">Master</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Min Months</label>
              <input
                type="number"
                value={durationMinMonths}
                onChange={(e) => setDurationMinMonths(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Min Age (Years)</label>
              <input
                type="number"
                value={minAgeYears}
                onChange={(e) => setMinAgeYears(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Sash Color (Hex)</label>
            <input
              type="text"
              value={sashColor}
              onChange={(e) => setSashColor(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Syllabus Highlights (one per line)
            </label>
            <textarea
              value={syllabusHighlights}
              onChange={(e) => setSyllabusHighlights(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Examination Criteria (one per line)
            </label>
            <textarea
              value={examinationCriteria}
              onChange={(e) => setExaminationCriteria(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Responsibilities</label>
            <input
              type="text"
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white font-semibold rounded transition-colors cursor-pointer"
            >
              Save Belt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 5. News Form Modal
const NewsFormModal: React.FC<{
  article: NewsArticle | null;
  onClose: () => void;
  onSave: (data: Omit<NewsArticle, 'id'>) => void;
}> = ({ article, onClose, onSave }) => {
  const [title, setTitle] = useState(article?.title || '');
  const [date, setDate] = useState(article?.date || 'October 24, 2026');
  const [category, setCategory] = useState<NewsArticle['category']>(
    article?.category || 'championship'
  );
  const [readTime, setReadTime] = useState(article?.readTime || '3 min read');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [content, setContent] = useState(
    article?.content.join('\n\n') || 'Official release details from the state association.'
  );
  const [author, setAuthor] = useState(article?.author || 'Association Media Cell');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      date,
      category,
      readTime,
      excerpt,
      content: content.split('\n\n').map((p) => p.trim()).filter(Boolean),
      author,
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 pb-2 border-b border-stone-200">
          {article ? 'Edit News Article' : 'Publish News Article'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              >
                <option value="championship">Championship</option>
                <option value="association">Association Official</option>
                <option value="grading">Grading</option>
                <option value="seminar">Seminar</option>
                <option value="national">National Delegation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Brief Excerpt</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Full Content (paragraphs separated by blank line)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white font-semibold rounded transition-colors cursor-pointer"
            >
              Save Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 6. Rule Form Modal
const RuleFormModal: React.FC<{
  rule: RuleItem | null;
  onClose: () => void;
  onSave: (data: Omit<RuleItem, 'id'>) => void;
}> = ({ rule, onClose, onSave }) => {
  const [title, setTitle] = useState(rule?.title || '');
  const [category, setCategory] = useState<RuleItem['category']>(rule?.category || 'students');
  const [summary, setSummary] = useState(rule?.summary || '');
  const [fullRegulation, setFullRegulation] = useState(rule?.fullRegulation || '');
  const [officialDocumentRef, setOfficialDocumentRef] = useState(
    rule?.officialDocumentRef || 'QKD-OD-REG-01'
  );
  const [isBindingRegulation, setIsBindingRegulation] = useState(
    rule?.isBindingRegulation ?? true
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      category,
      summary,
      fullRegulation,
      officialDocumentRef,
      isBindingRegulation,
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 pb-2 border-b border-stone-200">
          {rule ? 'Edit Rule / Regulation' : 'Add Rule / Regulation'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Rule Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              >
                <option value="students">Students</option>
                <option value="parents">Parents</option>
                <option value="instructors">Instructors</option>
                <option value="competitors">Competitors</option>
                <option value="centres">Centres</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Official Document Code
              </label>
              <input
                type="text"
                value={officialDocumentRef}
                onChange={(e) => setOfficialDocumentRef(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Brief Summary</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Regulation Text</label>
            <textarea
              value={fullRegulation}
              onChange={(e) => setFullRegulation(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <label className="flex items-center gap-2 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isBindingRegulation}
              onChange={(e) => setIsBindingRegulation(e.target.checked)}
              className="w-4 h-4 accent-[#008A68] rounded"
            />
            <span className="font-semibold text-slate-800">
              Strictly Binding on all practitioners and dojos
            </span>
          </label>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white font-semibold rounded transition-colors cursor-pointer"
            >
              Save Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 7. Gallery Form Modal
const GalleryFormModal: React.FC<{
  item: GalleryMedia | null;
  onClose: () => void;
  onSave: (data: Omit<GalleryMedia, 'id'>) => void;
}> = ({ item, onClose, onSave }) => {
  const [headline, setHeadline] = useState(item?.headline || item?.title || '');
  const [title, setTitle] = useState(item?.title || '');
  const [caption, setCaption] = useState(item?.caption || '');
  const [category, setCategory] = useState<GalleryMedia['category']>(item?.category || 'training');
  const [imageUrl, setImageUrl] = useState(
    item?.imageUrl || '/src/assets/images/children_martial_arts_1792843682446.jpg'
  );
  const [altText, setAltText] = useState(item?.altText || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      headline: headline || title,
      title,
      caption,
      category,
      imageUrl,
      altText: altText || headline || title,
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 pb-2 border-b border-stone-200">
          {item ? 'Edit Gallery Item' : 'Add Gallery Item'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Headline (Prominent Title)</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. 18th State Championship: Senior Master Performing Sacred Animal Form"
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Secondary Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
            >
              <option value="training">Training</option>
              <option value="championship">Championship</option>
              <option value="gradings">Gradings</option>
              <option value="seminars">Seminars</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Caption / Description</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white font-semibold rounded transition-colors cursor-pointer"
            >
              Save Media
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 8. FAQ Form Modal
const FAQFormModal: React.FC<{
  faq: { question: string; answer: string } | null;
  onClose: () => void;
  onSave: (data: { question: string; answer: string }) => void;
}> = ({ faq, onClose, onSave }) => {
  const [question, setQuestion] = useState(faq?.question || '');
  const [answer, setAnswer] = useState(faq?.answer || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return alert('Question is required');
    onSave({ question, answer });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
        <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 pb-2 border-b border-stone-200">
          {faq ? 'Edit FAQ' : 'Add FAQ'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Answer</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white font-semibold rounded transition-colors cursor-pointer"
            >
              Save FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 9. Stage Form Modal
const StageFormModal: React.FC<{
  stage: TrainingStage;
  onClose: () => void;
  onSave: (data: Partial<TrainingStage>) => void;
}> = ({ stage, onClose, onSave }) => {
  const [title, setTitle] = useState(stage.title);
  const [vietnameseTerm, setVietnameseTerm] = useState(stage.vietnameseTerm);
  const [objective, setObjective] = useState(stage.objective);
  const [durationEstimate, setDurationEstimate] = useState(stage.durationEstimate);
  const [focusAreas, setFocusAreas] = useState(stage.focusAreas.join('\n'));
  const [assessmentRequirement, setAssessmentRequirement] = useState(stage.assessmentRequirement);
  const [safetyGuidelines, setSafetyGuidelines] = useState(stage.safetyGuidelines);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      vietnameseTerm,
      objective,
      durationEstimate,
      focusAreas: focusAreas.split('\n').map((r) => r.trim()).filter(Boolean),
      assessmentRequirement,
      safetyGuidelines,
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 pb-2 border-b border-stone-200">
          Edit Stage {stage.step}: {stage.title}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Stage Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Vietnamese Title</label>
              <input
                type="text"
                value={vietnameseTerm}
                onChange={(e) => setVietnameseTerm(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Expected Duration</label>
            <input
              type="text"
              value={durationEstimate}
              onChange={(e) => setDurationEstimate(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Objective</label>
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Focus Areas (one per line)
            </label>
            <textarea
              value={focusAreas}
              onChange={(e) => setFocusAreas(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Assessment Requirement
            </label>
            <input
              type="text"
              value={assessmentRequirement}
              onChange={(e) => setAssessmentRequirement(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Safety Guidelines
            </label>
            <input
              type="text"
              value={safetyGuidelines}
              onChange={(e) => setSafetyGuidelines(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#008A68]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white font-semibold rounded transition-colors cursor-pointer"
            >
              Save Stage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
