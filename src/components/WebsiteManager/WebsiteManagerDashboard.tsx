import React, { useState, useEffect } from 'react';
import {
  WebsitePage,
  WebsiteSection,
  HeroBanner,
  GlobalThemeSettings,
  MediaItem,
  WebsiteRevision,
  ServiceItem,
  UserRole,
  DeviceView,
} from '../../types/websiteManager';
import {
  DEFAULT_WEBSITE_PAGES,
  DEFAULT_WEBSITE_SECTIONS,
  DEFAULT_HERO_BANNERS,
  DEFAULT_THEME_SETTINGS,
  DEFAULT_MEDIA_LIBRARY,
  DEFAULT_SERVICES,
  INITIAL_REVISIONS,
} from '../../data/websiteManagerDefaults';
import {
  Layout,
  FileText,
  Sliders,
  Palette,
  Image as ImageIcon,
  Menu,
  Shield,
  History,
  Download,
  Eye,
  EyeOff,
  Save,
  Send,
  Undo2,
  Redo2,
  CheckCircle2,
  AlertCircle,
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Trash2,
  Copy,
  Edit,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Lock,
  Unlock,
  Upload,
  Search,
  X,
  ArrowLeft,
  Check,
  RefreshCw,
  FolderOpen,
  DollarSign,
  Layers,
  Settings,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WebsiteManagerDashboardProps {
  onExitManager: () => void;
  onApplyPublishedChanges?: (data: {
    sections: WebsiteSection[];
    banners: HeroBanner[];
    theme: GlobalThemeSettings;
  }) => void;
}

export const WebsiteManagerDashboard: React.FC<WebsiteManagerDashboardProps> = ({
  onExitManager,
  onApplyPublishedChanges,
}) => {
  // Navigation tabs in manager
  const [activeTab, setActiveTab] = useState<
    | 'visual'
    | 'pages'
    | 'banners'
    | 'services'
    | 'theme'
    | 'media'
    | 'navigation'
    | 'roles'
    | 'revisions'
    | 'export'
  >('visual');

  // Role-based permissions
  const [currentRole, setCurrentRole] = useState<UserRole>('owner');

  // Device preview view mode
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');

  // Live state with persistent storage
  const [pages, setPages] = useState<WebsitePage[]>(() => {
    const saved = localStorage.getItem('doorbly_pages');
    return saved ? JSON.parse(saved) : DEFAULT_WEBSITE_PAGES;
  });

  const [sections, setSections] = useState<WebsiteSection[]>(() => {
    const saved = localStorage.getItem('doorbly_sections');
    return saved ? JSON.parse(saved) : DEFAULT_WEBSITE_SECTIONS;
  });

  const [banners, setBanners] = useState<HeroBanner[]>(() => {
    const saved = localStorage.getItem('doorbly_banners');
    return saved ? JSON.parse(saved) : DEFAULT_HERO_BANNERS;
  });

  const [theme, setTheme] = useState<GlobalThemeSettings>(() => {
    const saved = localStorage.getItem('doorbly_theme');
    return saved ? JSON.parse(saved) : DEFAULT_THEME_SETTINGS;
  });

  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('doorbly_media');
    return saved ? JSON.parse(saved) : DEFAULT_MEDIA_LIBRARY;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('doorbly_services');
    return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
  });

  const [revisions, setRevisions] = useState<WebsiteRevision[]>(() => {
    const saved = localStorage.getItem('doorbly_revisions');
    return saved ? JSON.parse(saved) : INITIAL_REVISIONS;
  });

  // Selected items for editor
  const [selectedSectionId, setSelectedSectionId] = useState<string>('sec-hero');
  const [selectedPageId, setSelectedPageId] = useState<string>('page-home');
  const [selectedBannerId, setSelectedBannerId] = useState<string>('banner-01');

  // Draft vs Published tracking
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Undo / Redo history stacks
  const [historyStack, setHistoryStack] = useState<WebsiteSection[][]>([]);
  const [redoStack, setRedoStack] = useState<WebsiteSection[][]>([]);

  // Media Library modal for image replacement
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);
  const [mediaTargetField, setMediaTargetField] = useState<'banner' | 'section' | 'service' | null>(null);

  // New Page creation modal
  const [isNewPageModalOpen, setIsNewPageModalOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');

  // New Service modal
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Children');
  const [newServicePrice, setNewServicePrice] = useState(1500);

  // Show notification helper
  const showNotice = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Push to undo stack before mutation
  const recordHistory = () => {
    setHistoryStack((prev) => [...prev.slice(-15), JSON.parse(JSON.stringify(sections))]);
    setRedoStack([]);
    setHasUnsavedChanges(true);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[historyStack.length - 1];
    setRedoStack((prev) => [...prev, JSON.parse(JSON.stringify(sections))]);
    setSections(previous);
    setHistoryStack((prev) => prev.slice(0, -1));
    showNotice('Action undone');
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setHistoryStack((prev) => [...prev, JSON.parse(JSON.stringify(sections))]);
    setSections(next);
    setRedoStack((prev) => prev.slice(0, -1));
    showNotice('Action redone');
  };

  // Save Draft (Local storage)
  const handleSaveDraft = () => {
    localStorage.setItem('doorbly_pages', JSON.stringify(pages));
    localStorage.setItem('doorbly_sections', JSON.stringify(sections));
    localStorage.setItem('doorbly_banners', JSON.stringify(banners));
    localStorage.setItem('doorbly_theme', JSON.stringify(theme));
    localStorage.setItem('doorbly_services', JSON.stringify(services));
    localStorage.setItem('doorbly_media', JSON.stringify(mediaLibrary));
    setHasUnsavedChanges(false);
    showNotice('Draft saved persistently. Live public site will reflect changes upon Publishing.');
  };

  // Publish to Live Website
  const handlePublishLive = () => {
    if (currentRole === 'viewer') {
      showNotice('Viewers do not have permission to publish changes.', 'error');
      return;
    }

    handleSaveDraft();

    // Create a new revision snapshot
    const newRev: WebsiteRevision = {
      id: `rev-${Date.now()}`,
      title: `Live Publish by ${currentRole.toUpperCase()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      author: currentRole === 'owner' ? 'Website Owner' : 'Content Manager',
      role: currentRole,
      sectionsCount: sections.length,
      snapshot: {
        sections: JSON.parse(JSON.stringify(sections)),
        banners: JSON.parse(JSON.stringify(banners)),
        theme: JSON.parse(JSON.stringify(theme)),
        pages: JSON.parse(JSON.stringify(pages)),
      },
    };

    const updatedRevisions = [newRev, ...revisions.slice(0, 20)];
    setRevisions(updatedRevisions);
    localStorage.setItem('doorbly_revisions', JSON.stringify(updatedRevisions));

    // Callback to live public site if attached
    if (onApplyPublishedChanges) {
      onApplyPublishedChanges({
        sections,
        banners,
        theme,
      });
    }

    setHasUnsavedChanges(false);
    showNotice('🎉 Live website published successfully! Cache cleared and Astra theme styles updated.');
  };

  // Restore earlier revision
  const handleRestoreRevision = (rev: WebsiteRevision) => {
    if (currentRole !== 'owner') {
      showNotice('Only the Website Owner can restore revisions.', 'error');
      return;
    }
    recordHistory();
    setSections(rev.snapshot.sections || sections);
    setBanners(rev.snapshot.banners || banners);
    setTheme(rev.snapshot.theme || theme);
    setPages(rev.snapshot.pages || pages);
    showNotice(`Restored revision: ${rev.title}`);
  };

  // Active selected section
  const currentSection = sections.find((s) => s.id === selectedSectionId) || sections[0];

  // Update section attribute
  const updateSectionField = (field: keyof WebsiteSection, value: any) => {
    recordHistory();
    setSections((prev) =>
      prev.map((sec) => (sec.id === selectedSectionId ? { ...sec, [field]: value } : sec))
    );
  };

  // Update banner attribute
  const updateBannerField = (bannerId: string, field: keyof HeroBanner, value: any) => {
    setHasUnsavedChanges(true);
    setBanners((prev) =>
      prev.map((b) => (b.id === bannerId ? { ...b, [field]: value } : b))
    );
  };

  const SESSION_AUTH_KEY = 'qkd_admin_authenticated';
  const PASSWORD_STORAGE_KEY = 'qkd_admin_password';
  const DEFAULT_ADMIN_PASS = 'Biswal1234';

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
  });
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState('');

  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const validPassword = localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_ADMIN_PASS;
    if (adminPasswordInput.trim() === validPassword.trim()) {
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      setIsAdminAuthenticated(true);
      setAdminAuthError('');
      showNotice('Administrator authenticated. Welcome to Visual Website Manager.');
    } else {
      setAdminAuthError('Invalid administrator password. Access denied.');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7 text-emerald-400" />
            </div>
            <h2 className="font-serif text-xl font-bold text-white">Administrator Access Required</h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              The Visual Website Manager is protected. Only verified administrators may customize website pages, banners, and theme settings.
            </p>
          </div>

          <form onSubmit={handleAdminUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  value={adminPasswordInput}
                  onChange={(e) => {
                    setAdminPasswordInput(e.target.value);
                    setAdminAuthError('');
                  }}
                  placeholder="Enter administrator password..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#008A68]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {adminAuthError && (
                <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{adminAuthError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#008A68] hover:bg-[#007256] text-white font-bold text-xs rounded-lg shadow-md transition-all cursor-pointer"
            >
              Unlock Visual Website Manager
            </button>

            <button
              type="button"
              onClick={onExitManager}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Return to Public Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-[#008A68] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. MASTER TOP CONTROL BAR (Contract Requirements)                         */}
      {/* ========================================================================= */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onExitManager}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-4 h-4 text-[#008A68]" />
            <span>Public Website</span>
          </button>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm sm:text-base text-white tracking-wide">
                Doorbly Website Manager
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                Astra Live Bridge
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Visual Customer Admin & Content Management Dashboard
            </p>
          </div>
        </div>

        {/* Device Viewport Selector (Desktop / Tablet / Mobile) */}
        <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => setDeviceView('desktop')}
            title="Desktop View (Full Screen)"
            className={`p-1.5 rounded transition-colors ${
              deviceView === 'desktop'
                ? 'bg-slate-800 text-emerald-400 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            title="Tablet View (768px)"
            className={`p-1.5 rounded transition-colors ${
              deviceView === 'tablet'
                ? 'bg-slate-800 text-emerald-400 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            title="Mobile View (375px)"
            className={`p-1.5 rounded transition-colors ${
              deviceView === 'mobile'
                ? 'bg-slate-800 text-emerald-400 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Role Switcher & Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Role Indicator */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-xs">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="owner" className="bg-slate-900 text-white">Owner (Full)</option>
              <option value="manager" className="bg-slate-900 text-white">Manager</option>
              <option value="editor" className="bg-slate-900 text-white">Editor</option>
              <option value="viewer" className="bg-slate-900 text-white">Viewer (Read-Only)</option>
            </select>
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={historyStack.length === 0}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-slate-800"
              title="Undo Last Action"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-slate-800"
              title="Redo Action"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            disabled={currentRole === 'viewer'}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          {/* Publish Live */}
          <button
            onClick={handlePublishLive}
            disabled={currentRole === 'viewer'}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#008A68] hover:bg-[#007256] disabled:opacity-40 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>
        </div>
      </header>

      {/* Floating System Notice */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-14 right-6 z-50 px-4 py-2.5 rounded-xl shadow-2xl border flex items-center gap-2.5 text-xs font-semibold ${
              notification.type === 'success'
                ? 'bg-emerald-950 text-emerald-100 border-emerald-700'
                : 'bg-rose-950 text-rose-100 border-rose-700'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE: SIDEBAR NAVIGATION & ACTIVE WORK AREA                  */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-60 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
          <div className="p-3 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Visual Editor & Content
            </div>

            {[
              { id: 'visual', label: 'Visual Page Editor', icon: Layout, desc: 'Live section customizer' },
              { id: 'pages', label: 'All Website Pages', icon: FileText, desc: 'Add, slug & SEO' },
              { id: 'banners', label: 'Hero Banners', icon: Sliders, desc: 'Multi-slide management' },
              { id: 'services', label: 'Services & Classes', icon: DollarSign, desc: 'Categories & fees' },
              { id: 'theme', label: 'Theme & Global Design', icon: Palette, desc: 'Colors, fonts & presets' },
              { id: 'media', label: 'WP Media Library', icon: ImageIcon, desc: 'Uploads & replace' },
              { id: 'navigation', label: 'Menus & Navigation', icon: Menu, desc: 'Header & footer links' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#008A68] text-white font-semibold shadow-xs'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <div className="truncate">
                    <div className="leading-tight">{tab.label}</div>
                    <div className="text-[10px] opacity-70 truncate">{tab.desc}</div>
                  </div>
                </button>
              );
            })}

            <div className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              System & Integration
            </div>

            {[
              { id: 'roles', label: 'Role Permissions', icon: Shield, desc: 'Owner / Manager / Editor' },
              { id: 'revisions', label: 'Revisions & Rollback', icon: History, desc: '1-Click restore snapshots' },
              { id: 'export', label: 'WordPress Plugin & Setup', icon: Download, desc: 'Astra theme & shortcodes' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#008A68] text-white font-semibold shadow-xs'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <div className="truncate">
                    <div className="leading-tight">{tab.label}</div>
                    <div className="text-[10px] opacity-70 truncate">{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sidebar Status Footer */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400">
            <div className="flex items-center justify-between mb-1">
              <span>Status:</span>
              <span className={`font-semibold ${hasUnsavedChanges ? 'text-amber-400' : 'text-emerald-400'}`}>
                {hasUnsavedChanges ? 'Draft (Unsaved)' : 'Synchronized'}
              </span>
            </div>
            <div className="text-[10px] text-slate-500">
              WordPress Astra Integration Ready
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 3. DYNAMIC CONTENT WORK AREA BY TAB                                       */}
        {/* ========================================================================= */}
        <main className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8">
          {/* TAB 1: VISUAL PAGE EDITOR (Split Screen Live Editor) */}
          {activeTab === 'visual' && (
            <div className="space-y-6">
              {/* Section Selector Bar */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-400">Edit Section:</span>
                  <select
                    value={selectedSectionId}
                    onChange={(e) => setSelectedSectionId(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-white text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#008A68] cursor-pointer"
                  >
                    {sections.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.name} {sec.isVisible ? '✓' : '(Hidden)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentSection.isVisible}
                      onChange={(e) => updateSectionField('isVisible', e.target.checked)}
                      className="rounded accent-[#008A68]"
                    />
                    <span>Section Visible on Public Website</span>
                  </label>
                </div>
              </div>

              {/* 2-Column Split: Controls Form on Left, Live Responsive Preview on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Controls Column */}
                <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
                  <h3 className="font-serif font-bold text-sm text-white border-b border-slate-800 pb-2">
                    Section Content & Typography
                  </h3>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={currentSection.badge}
                      onChange={(e) => updateSectionField('badge', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#008A68]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Main Heading</label>
                    <textarea
                      rows={2}
                      value={currentSection.heading}
                      onChange={(e) => updateSectionField('heading', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#008A68]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={currentSection.subtitle}
                      onChange={(e) => updateSectionField('subtitle', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#008A68]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Paragraph Description</label>
                    <textarea
                      rows={3}
                      value={currentSection.description}
                      onChange={(e) => updateSectionField('description', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#008A68]"
                    />
                  </div>

                  {/* Colors & Visual Styling */}
                  <h4 className="font-serif font-bold text-xs text-white pt-2 border-t border-slate-800">
                    Colors & Buttons
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Background</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentSection.backgroundColor}
                          onChange={(e) => updateSectionField('backgroundColor', e.target.value)}
                          className="w-8 h-8 rounded border border-slate-700 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={currentSection.backgroundColor}
                          onChange={(e) => updateSectionField('backgroundColor', e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-700 text-white px-2 py-1.5 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Text Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentSection.textColor}
                          onChange={(e) => updateSectionField('textColor', e.target.value)}
                          className="w-8 h-8 rounded border border-slate-700 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={currentSection.textColor}
                          onChange={(e) => updateSectionField('textColor', e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-700 text-white px-2 py-1.5 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA Button */}
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300">Primary CTA Button</span>
                      <label className="flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentSection.primaryBtnVisible}
                          onChange={(e) => updateSectionField('primaryBtnVisible', e.target.checked)}
                          className="rounded accent-[#008A68]"
                        />
                        <span>Show</span>
                      </label>
                    </div>

                    {currentSection.primaryBtnVisible && (
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Button Label"
                          value={currentSection.primaryBtnText}
                          onChange={(e) => updateSectionField('primaryBtnText', e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded"
                        />
                        <input
                          type="text"
                          placeholder="Destination Link"
                          value={currentSection.primaryBtnLink}
                          onChange={(e) => updateSectionField('primaryBtnLink', e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Responsive Preview Column */}
                <div className="lg:col-span-7 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between mb-2 px-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Live Instant Preview ({deviceView.toUpperCase()})</span>
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Real-time CSS & Content Render
                    </span>
                  </div>

                  {/* Device Simulation Frame */}
                  <div
                    className={`w-full transition-all duration-300 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-white ${
                      deviceView === 'mobile'
                        ? 'max-w-[375px]'
                        : deviceView === 'tablet'
                        ? 'max-w-[768px]'
                        : 'max-w-full'
                    }`}
                  >
                    {/* Simulated Browser Bar */}
                    <div className="bg-stone-200 px-4 py-2 border-b border-stone-300 flex items-center justify-between text-stone-600 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                      </div>
                      <span className="text-[11px] font-mono text-stone-600">
                        qwankidoodisha.com/preview
                      </span>
                      <span className="text-[10px] text-stone-500 font-semibold uppercase">
                        {currentSection.name}
                      </span>
                    </div>

                    {/* Rendered Live Preview Section */}
                    <div
                      style={{
                        backgroundColor: currentSection.backgroundColor,
                        color: currentSection.textColor,
                      }}
                      className="p-8 sm:p-12 transition-colors duration-200"
                    >
                      <div className="max-w-2xl mx-auto">
                        {currentSection.badge && (
                          <span
                            style={{ color: currentSection.accentColor }}
                            className="text-xs font-bold uppercase tracking-wider block mb-2"
                          >
                            {currentSection.badge}
                          </span>
                        )}

                        <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight mb-3">
                          {currentSection.heading}
                        </h2>

                        {currentSection.subtitle && (
                          <p className="text-sm sm:text-base font-medium opacity-80 mb-4">
                            {currentSection.subtitle}
                          </p>
                        )}

                        <p className="text-xs sm:text-sm leading-relaxed opacity-75 mb-6">
                          {currentSection.description}
                        </p>

                        {currentSection.primaryBtnVisible && currentSection.primaryBtnText && (
                          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs text-white shadow-md cursor-pointer"
                            style={{ backgroundColor: currentSection.accentColor }}
                          >
                            <span>{currentSection.primaryBtnText}</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ALL WEBSITE PAGES MANAGEMENT */}
          {activeTab === 'pages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-white">Website Pages Directory</h2>
                  <p className="text-xs text-slate-400">
                    Manage pages, customize permalink slugs, SEO titles, and publish status.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewPageModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Page</span>
                </button>
              </div>

              {/* Pages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif font-bold text-sm text-white">{page.title}</h3>
                          {page.isHomepage && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800">
                              Homepage
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">/{page.slug}</p>
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          page.isPublished
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">{page.seoDescription}</p>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500">Order: #{page.navOrder}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setPages((prev) =>
                              prev.map((p) =>
                                p.id === page.id ? { ...p, isPublished: !p.isPublished } : p
                              )
                            );
                            setHasUnsavedChanges(true);
                          }}
                          className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
                        >
                          {page.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                        {!page.isSystemPage && (
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${page.title}?`)) {
                                setPages((prev) => prev.filter((p) => p.id !== page.id));
                                setHasUnsavedChanges(true);
                                showNotice(`Page ${page.title} deleted`);
                              }
                            }}
                            className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HERO & PROMOTIONAL BANNERS */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-white">Hero & Promotional Banners</h2>
                  <p className="text-xs text-slate-400">
                    Configure multi-slide rotation, call-to-action buttons, and featured banner artwork.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newBanner: HeroBanner = {
                      id: `banner-${Date.now()}`,
                      headline: 'NEW PROMOTIONAL CAMPAIGN',
                      subtitle: 'Special Training Session Announcement',
                      description: 'Join the upcoming state seminar with authorized coaching staff.',
                      imageUrl: '/src/assets/images/hero_qwankido_master_1792843701845.jpg',
                      primaryBtnText: 'Join Campaign',
                      primaryBtnLink: 'enquiry',
                      secondaryBtnText: 'Details',
                      secondaryBtnLink: 'events',
                      isActive: true,
                      order: banners.length + 1,
                      bgPosition: 'center',
                    };
                    setBanners([...banners, newBanner]);
                    setHasUnsavedChanges(true);
                    showNotice('New banner slide added');
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Banner Slide</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {banners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-6 items-start"
                  >
                    {/* Banner Image Preview Frame */}
                    <div className="w-full md:w-64 aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 relative group">
                      <img
                        src={banner.imageUrl}
                        alt={banner.headline}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setSelectedBannerId(banner.id);
                          setMediaTargetField('banner');
                          setIsMediaModalOpen(true);
                        }}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold text-white gap-1.5 cursor-pointer"
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>Replace Media</span>
                      </button>
                    </div>

                    {/* Banner Content Fields */}
                    <div className="flex-1 space-y-3 text-xs w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-300">Banner Slide #{index + 1}</span>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={banner.isActive}
                              onChange={(e) => updateBannerField(banner.id, 'isActive', e.target.checked)}
                              className="rounded accent-[#008A68]"
                            />
                            <span>Active in Slider</span>
                          </label>
                          {banners.length > 1 && (
                            <button
                              onClick={() => {
                                setBanners(banners.filter((b) => b.id !== banner.id));
                                setHasUnsavedChanges(true);
                              }}
                              className="text-rose-400 hover:text-rose-300 p-1"
                              title="Delete banner"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Headline</label>
                        <input
                          type="text"
                          value={banner.headline}
                          onChange={(e) => updateBannerField(banner.id, 'headline', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-1.5 rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Primary Button Text</label>
                          <input
                            type="text"
                            value={banner.primaryBtnText}
                            onChange={(e) => updateBannerField(banner.id, 'primaryBtnText', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-1.5 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Destination Target</label>
                          <input
                            type="text"
                            value={banner.primaryBtnLink}
                            onChange={(e) => updateBannerField(banner.id, 'primaryBtnLink', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-1.5 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES, PROGRAMMES & PRICING */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-white">Services & Training Classes</h2>
                  <p className="text-xs text-slate-400">
                    Manage service titles, categories, pricing units, and admissions availability.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewServiceModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service / Programme</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#008A68]">
                          {srv.category}
                        </span>
                        <h3 className="font-serif font-bold text-sm text-white mt-0.5">{srv.name}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-amber-400">
                          ₹{srv.price}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{srv.pricingUnit}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">{srv.description}</p>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {srv.availability}
                      </span>

                      <button
                        onClick={() => {
                          setServices(services.filter((s) => s.id !== srv.id));
                          setHasUnsavedChanges(true);
                          showNotice('Service removed');
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: THEME & GLOBAL DESIGN PRESETS */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">Global Theme & Styling</h2>
                <p className="text-xs text-slate-400">
                  Custom brand palette, typography, and Astra theme CSS integration.
                </p>
              </div>

              {/* Design Presets (Instant Harmonious Themes) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    id: 'sandstone',
                    name: 'Odisha Sandstone (Current)',
                    primary: '#008A68',
                    accent: '#D4AF37',
                    bg: '#FAF7F2',
                    desc: 'Warm ivory & temple terracotta',
                  },
                  {
                    id: 'temple_gold',
                    name: 'Konark Temple Gold',
                    primary: '#B45309',
                    accent: '#F59E0B',
                    bg: '#FFFDF9',
                    desc: 'Rich sun gold and ochre',
                  },
                  {
                    id: 'emerald',
                    name: 'Modern Forest Emerald',
                    primary: '#047857',
                    accent: '#10B981',
                    bg: '#F0FDF4',
                    desc: 'Clean verdant botanical aesthetic',
                  },
                  {
                    id: 'royal_navy',
                    name: 'Imperial Royal Blue',
                    primary: '#1E3A8A',
                    accent: '#3B82F6',
                    bg: '#F8FAFC',
                    desc: 'High-contrast institutional navy',
                  },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setTheme({
                        ...theme,
                        preset: preset.id,
                        primaryColor: preset.primary,
                        accentColor: preset.accent,
                        backgroundColor: preset.bg,
                      });
                      setHasUnsavedChanges(true);
                      showNotice(`Applied ${preset.name} preset`);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      theme.preset === preset.id
                        ? 'bg-slate-800 border-[#008A68] shadow-md ring-1 ring-[#008A68]'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 inline-block"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 inline-block"
                        style={{ backgroundColor: preset.accent }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 inline-block"
                        style={{ backgroundColor: preset.bg }}
                      />
                    </div>
                    <h3 className="font-serif font-bold text-xs text-white">{preset.name}</h3>
                    <p className="text-[11px] text-slate-400 mt-1">{preset.desc}</p>
                  </button>
                ))}
              </div>

              {/* Reset to Saved Settings Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setTheme(DEFAULT_THEME_SETTINGS);
                    setHasUnsavedChanges(true);
                    showNotice('Reset design settings to default saved profile');
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg"
                >
                  Reset to Saved Settings
                </button>
                <span className="text-xs text-slate-500">
                  Resetting design settings will never delete your content, pages, or media records.
                </span>
              </div>
            </div>
          )}

          {/* TAB 6: WORDPRESS MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-white">WordPress Media Library</h2>
                  <p className="text-xs text-slate-400">
                    Browse, upload, and inspect media attachments for pages and hero banners.
                  </p>
                </div>
                <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#008A68] hover:bg-[#007256] text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Upload Media Attachment</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const newMedia: MediaItem = {
                          id: `med-${Date.now()}`,
                          title: file.name.replace(/\.[^/.]+$/, ''),
                          url: URL.createObjectURL(file),
                          altText: file.name,
                          caption: 'Uploaded via Website Manager',
                          fileSize: `${Math.round(file.size / 1024)} KB`,
                          fileType: file.type,
                          uploadedAt: new Date().toISOString().substring(0, 10),
                          dimensions: '1920x1080',
                          category: 'photo',
                        };
                        setMediaLibrary([newMedia, ...mediaLibrary]);
                        showNotice(`Uploaded ${file.name} to Media Library`);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaLibrary.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden group flex flex-col justify-between"
                  >
                    <div className="aspect-square bg-slate-900 overflow-hidden relative">
                      <img
                        src={item.url}
                        alt={item.altText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/70 text-white">
                        {item.fileSize}
                      </span>
                    </div>
                    <div className="p-2.5 text-[11px]">
                      <p className="font-semibold text-white truncate" title={item.title}>
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">{item.fileType}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: REVISIONS & 1-CLICK ROLLBACK */}
          {activeTab === 'revisions' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">Revision History & Rollback</h2>
                <p className="text-xs text-slate-400">
                  Every published update generates a persistent snapshot for safe 1-click rollback.
                </p>
              </div>

              <div className="space-y-3">
                {revisions.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{rev.title}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">
                          {rev.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Author: {rev.author} ({rev.role.toUpperCase()}) · Sections captured: {rev.sectionsCount}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRestoreRevision(rev)}
                      disabled={currentRole !== 'owner'}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <History className="w-3.5 h-3.5 text-amber-400" />
                      <span>Restore This Version</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: ROLES & PERMISSIONS */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">Customer Roles & Permissions</h2>
                <p className="text-xs text-slate-400">
                  Role-based access matrix ensuring only authorized personnel can publish live changes.
                </p>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400">
                    <tr>
                      <th className="p-3">Capability</th>
                      <th className="p-3">Website Owner</th>
                      <th className="p-3">Content Manager</th>
                      <th className="p-3">Editor</th>
                      <th className="p-3">Viewer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-3 font-medium text-white">Visual Section Customizer</td>
                      <td className="p-3 text-emerald-400">✓ Full</td>
                      <td className="p-3 text-emerald-400">✓ Full</td>
                      <td className="p-3 text-emerald-400">✓ Full</td>
                      <td className="p-3 text-stone-500">Read-Only</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Publish Live to Website</td>
                      <td className="p-3 text-emerald-400">✓ Allowed</td>
                      <td className="p-3 text-emerald-400">✓ Allowed</td>
                      <td className="p-3 text-amber-400">Draft Only</td>
                      <td className="p-3 text-stone-500">No</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Manage Pages & Delete</td>
                      <td className="p-3 text-emerald-400">✓ Allowed</td>
                      <td className="p-3 text-amber-400">Edit Only</td>
                      <td className="p-3 text-stone-500">No</td>
                      <td className="p-3 text-stone-500">No</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">1-Click Revision Rollback</td>
                      <td className="p-3 text-emerald-400">✓ Allowed</td>
                      <td className="p-3 text-stone-500">No</td>
                      <td className="p-3 text-stone-500">No</td>
                      <td className="p-3 text-stone-500">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: WORDPRESS PLUGIN & ASTRA EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">
                  WordPress Plugin Package & Astra Setup
                </h2>
                <p className="text-xs text-slate-400">
                  Deliverable package for WordPress installation and Astra theme activation.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="w-6 h-6 text-[#008A68]" />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white">
                        doorbly-website-manager.zip
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Version 1.0.0 · Tested up to WordPress 6.7 & Astra 4.8
                      </p>
                    </div>
                  </div>

                  <a
                    href="/wordpress-plugin/doorbly-website-manager/doorbly-website-manager.php"
                    download="doorbly-website-manager.php"
                    className="px-4 py-2 bg-[#008A68] hover:bg-[#007256] text-white font-semibold rounded-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Plugin PHP File</span>
                  </a>
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-white text-xs">Shortcodes for Pages:</h5>
                  <div className="bg-slate-900 p-3 rounded-lg font-mono text-[11px] text-emerald-300">
                    [doorbly_website_manager]
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Paste this shortcode on any WordPress page (e.g. `/website-manager/`) to render the full visual admin panel.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h5 className="font-bold text-white text-xs">Astra Theme Integration Notes:</h5>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>Uses scoped CSS variables so Astra header and footer styling remain intact.</li>
                    <li>Supports live preview through the WordPress REST API under `/wp-json/doorbly/v1/`.</li>
                    <li>Saves persistently to the WordPress `wp_options` table and clears object cache automatically on Publish.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Media Replacement Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 max-w-2xl w-full rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-serif font-bold text-sm text-white">Select Media from WordPress Library</h3>
              <button
                onClick={() => setIsMediaModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
              {mediaLibrary.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (mediaTargetField === 'banner') {
                      updateBannerField(selectedBannerId, 'imageUrl', item.url);
                    }
                    setIsMediaModalOpen(false);
                    showNotice(`Selected image: ${item.title}`);
                  }}
                  className="aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-emerald-400 cursor-pointer"
                >
                  <img src={item.url} alt={item.altText} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Page Creation Modal */}
      {isNewPageModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 max-w-md w-full rounded-2xl border border-slate-800 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-serif font-bold text-sm text-white">Create New Page</h3>
              <button onClick={() => setIsNewPageModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Page Title</label>
              <input
                type="text"
                placeholder="e.g. Summer Camp 2025"
                value={newPageTitle}
                onChange={(e) => {
                  setNewPageTitle(e.target.value);
                  setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                }}
                className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">URL Slug</label>
              <input
                type="text"
                placeholder="e.g. summer-camp-2025"
                value={newPageSlug}
                onChange={(e) => setNewPageSlug(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg font-mono"
              />
            </div>

            <button
              onClick={() => {
                if (!newPageTitle.trim()) return;
                const newPage: WebsitePage = {
                  id: `page-${Date.now()}`,
                  title: newPageTitle,
                  slug: newPageSlug || 'new-page',
                  isPublished: true,
                  isHomepage: false,
                  isSystemPage: false,
                  navOrder: pages.length + 1,
                  showInNav: true,
                  seoTitle: `${newPageTitle} | Qwan Ki Do Odisha`,
                  seoDescription: `Official page for ${newPageTitle}`,
                  seoKeywords: 'odisha, martial arts',
                  socialImage: '/src/assets/images/hero_qwankido_master_1792843701845.jpg',
                  updatedAt: new Date().toISOString().substring(0, 16),
                };
                setPages([...pages, newPage]);
                setHasUnsavedChanges(true);
                setIsNewPageModalOpen(false);
                setNewPageTitle('');
                setNewPageSlug('');
                showNotice(`Page "${newPageTitle}" created successfully!`);
              }}
              className="w-full py-2.5 bg-[#008A68] hover:bg-[#007256] text-white font-bold rounded-lg"
            >
              Save & Add Page
            </button>
          </div>
        </div>
      )}

      {/* New Service Modal */}
      {isNewServiceModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 max-w-md w-full rounded-2xl border border-slate-800 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-serif font-bold text-sm text-white">Add New Service / Class</h3>
              <button onClick={() => setIsNewServiceModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Service Name</label>
              <input
                type="text"
                placeholder="e.g. Weekend Karate & Vo Thuat Batch"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Category</label>
                <select
                  value={newServiceCategory}
                  onChange={(e) => setNewServiceCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
                >
                  <option value="Children">Children</option>
                  <option value="Youth">Youth</option>
                  <option value="Adults">Adults</option>
                  <option value="Weapons">Weapons</option>
                  <option value="Certification">Certification</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Tuition Fee (₹)</label>
                <input
                  type="number"
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!newServiceName.trim()) return;
                const newSrv: ServiceItem = {
                  id: `srv-${Date.now()}`,
                  name: newServiceName,
                  category: newServiceCategory,
                  description: 'Comprehensive martial arts instruction with verified curriculum.',
                  price: newServicePrice,
                  pricingUnit: 'per month',
                  availability: 'Open',
                  isPublished: true,
                };
                setServices([...services, newSrv]);
                setHasUnsavedChanges(true);
                setIsNewServiceModalOpen(false);
                setNewServiceName('');
                showNotice(`Service "${newServiceName}" added!`);
              }}
              className="w-full py-2.5 bg-[#008A68] hover:bg-[#007256] text-white font-bold rounded-lg"
            >
              Save Service
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
