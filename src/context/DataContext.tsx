import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ASSOCIATION_INFO as defaultInfo,
  TRAINING_STAGES as defaultStages,
  BELT_RANKS as defaultBelts,
  PROGRAMMES as defaultProgrammes,
  TRAINING_CENTRES as defaultCentres,
  RULES_AND_ETIQUETTE as defaultRules,
  ASSOCIATION_EVENTS as defaultEvents,
  NEWS_ARTICLES as defaultNews,
  GALLERY_ITEMS as defaultGallery,
  FAQ_ITEMS as defaultFAQs,
  GOVERNING_BODY_MEMBERS as defaultGoverningMembers,
} from '../data/associationData';
import {
  BeltRank,
  TrainingStage,
  Programme,
  TrainingCentre,
  RuleItem,
  AssociationEvent,
  NewsArticle,
  GalleryMedia,
  GoverningMember,
} from '../types';
import {
  isSupabaseConfigured,
  insertEnquirySupabase,
  updateEnquiryStatusSupabase,
} from '../lib/supabase';

export interface StoredEnquiry {
  id: string;
  type: 'student' | 'affiliation';
  createdAt: string;
  name: string;
  contactNumber: string;
  email?: string;
  district: string;
  details: string;
  isContacted: boolean;
}

interface DataContextType {
  // State items
  associationInfo: typeof defaultInfo;
  trainingCentres: TrainingCentre[];
  programmes: Programme[];
  trainingStages: TrainingStage[];
  beltRanks: BeltRank[];
  rulesAndEtiquette: RuleItem[];
  associationEvents: AssociationEvent[];
  newsArticles: NewsArticle[];
  galleryItems: GalleryMedia[];
  faqItems: typeof defaultFAQs;
  governingMembers: GoverningMember[];
  enquiries: StoredEnquiry[];
  announcementText: string;
  announcementVisible: boolean;

  // Governing Body CRUD
  addGoverningMember: (member: Omit<GoverningMember, 'id'>) => void;
  updateGoverningMember: (id: string, member: Partial<GoverningMember>) => void;
  deleteGoverningMember: (id: string) => void;

  // Centres CRUD
  addCentre: (centre: Omit<TrainingCentre, 'id'>) => void;
  updateCentre: (id: string, centre: Partial<TrainingCentre>) => void;
  deleteCentre: (id: string) => void;

  // Events CRUD
  addEvent: (event: Omit<AssociationEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<AssociationEvent>) => void;
  deleteEvent: (id: string) => void;

  // Belts CRUD
  addBeltRank: (belt: Omit<BeltRank, 'id'>) => void;
  updateBeltRank: (id: string, belt: Partial<BeltRank>) => void;
  deleteBeltRank: (id: string) => void;

  // Programmes CRUD
  addProgramme: (prog: Omit<Programme, 'id'>) => void;
  updateProgramme: (id: string, prog: Partial<Programme>) => void;
  deleteProgramme: (id: string) => void;

  // Rules CRUD
  addRule: (rule: Omit<RuleItem, 'id'>) => void;
  updateRule: (id: string, rule: Partial<RuleItem>) => void;
  deleteRule: (id: string) => void;

  // News CRUD
  addNewsArticle: (article: Omit<NewsArticle, 'id'>) => void;
  updateNewsArticle: (id: string, article: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;

  // Gallery CRUD
  addGalleryItem: (item: Omit<GalleryMedia, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryMedia>) => void;
  deleteGalleryItem: (id: string) => void;

  // FAQ CRUD
  addFAQ: (faq: { question: string; answer: string }) => void;
  updateFAQ: (index: number, faq: { question: string; answer: string }) => void;
  deleteFAQ: (index: number) => void;

  // Stages & Info
  updateTrainingStage: (step: number, stage: Partial<TrainingStage>) => void;
  updateAssociationInfo: (info: Partial<typeof defaultInfo>) => void;
  updateAnnouncement: (text: string, visible: boolean) => void;

  // Enquiries
  addEnquiry: (enquiry: Omit<StoredEnquiry, 'id' | 'createdAt' | 'isContacted'>) => string;
  toggleEnquiryContacted: (id: string) => void;
  deleteEnquiry: (id: string) => void;

  // Bulk actions
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
}

const STORAGE_PREFIX = 'qkd_odisha_';

const initialEnquiries: StoredEnquiry[] = [
  {
    id: 'QKD-ADM-102948',
    type: 'student',
    createdAt: '2026-10-23T11:20:00Z',
    name: 'Siddharth Patnaik (Parent: Bijay Patnaik)',
    contactNumber: '+91 94371 00293',
    email: 'bijay.patnaik@example.com',
    district: 'Khordha',
    details: 'Age: Children (5-12) · Preferred Dojo: State Headquarters Dojo — Bhubaneswar · Zero prior martial arts experience.',
    isContacted: false,
  },
  {
    id: 'QKD-AFF-409182',
    type: 'affiliation',
    createdAt: '2026-10-21T09:15:00Z',
    name: 'Saraswati Vidya Mandir, Cuttack (Sports Officer: S. Dash)',
    contactNumber: '+91 98610 88219',
    email: 'sports@svmcuttack.edu.in',
    district: 'Cuttack',
    details: 'Type: School / College · Estimated students: 100-250 · Requests weekend martial arts syllabus curriculum.',
    isContacted: true,
  },
];

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [associationInfo, setAssociationInfo] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}info`);
    return saved ? JSON.parse(saved) : defaultInfo;
  });

  const [trainingCentres, setTrainingCentres] = useState<TrainingCentre[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}centres`);
    return saved ? JSON.parse(saved) : defaultCentres;
  });

  const [programmes, setProgrammes] = useState<Programme[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}programmes`);
    return saved ? JSON.parse(saved) : defaultProgrammes;
  });

  const [trainingStages, setTrainingStages] = useState<TrainingStage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}stages`);
    return saved ? JSON.parse(saved) : defaultStages;
  });

  const [beltRanks, setBeltRanks] = useState<BeltRank[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}belts`);
    return saved ? JSON.parse(saved) : defaultBelts;
  });

  const [rulesAndEtiquette, setRulesAndEtiquette] = useState<RuleItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}rules`);
    return saved ? JSON.parse(saved) : defaultRules;
  });

  const [associationEvents, setAssociationEvents] = useState<AssociationEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}events`);
    return saved ? JSON.parse(saved) : defaultEvents;
  });

  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}news`);
    return saved ? JSON.parse(saved) : defaultNews;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryMedia[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}gallery`);
    if (!saved) return defaultGallery;
    try {
      const parsed: GalleryMedia[] = JSON.parse(saved);
      // Merge headlines from defaultGallery if missing
      return parsed.map((item) => {
        const fallback = defaultGallery.find((g) => g.id === item.id);
        return {
          ...item,
          headline: item.headline || fallback?.headline || item.title,
          date: item.date || fallback?.date,
          district: item.district || fallback?.district,
        };
      });
    } catch {
      return defaultGallery;
    }
  });

  const [faqItems, setFaqItems] = useState<typeof defaultFAQs>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}faqs`);
    return saved ? JSON.parse(saved) : defaultFAQs;
  });

  const [governingMembers, setGoverningMembers] = useState<GoverningMember[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}governing`);
    if (!saved) return defaultGoverningMembers;
    try {
      const parsed: GoverningMember[] = JSON.parse(saved);
      // Merge images from defaultGoverningMembers if missing
      return parsed.map((m) => {
        const fallback = defaultGoverningMembers.find((def) => def.id === m.id);
        return {
          ...m,
          image: m.image || fallback?.image,
        };
      });
    } catch {
      return defaultGoverningMembers;
    }
  });

  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}enquiries`);
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [announcementText, setAnnouncementText] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}announcementText`);
    return saved || '18th Odisha State Qwan Ki Do Championship 2026 at Kalinga Indoor Stadium. Athlete registrations are now open.';
  });

  const [announcementVisible, setAnnouncementVisible] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}announcementVisible`);
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Load initial state from Cloud SQL Backend API
  useEffect(() => {
    let isMounted = true;
    fetch('/api/state')
      .then((res) => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (data.trainingCentres && data.trainingCentres.length > 0) setTrainingCentres(data.trainingCentres);
        if (data.associationEvents && data.associationEvents.length > 0) setAssociationEvents(data.associationEvents);
        if (data.newsArticles && data.newsArticles.length > 0) setNewsArticles(data.newsArticles);
        if (data.galleryItems && data.galleryItems.length > 0) setGalleryItems(data.galleryItems);
        if (data.enquiries && data.enquiries.length > 0) setEnquiries(data.enquiries);
        if (data.announcementText) setAnnouncementText(data.announcementText);
        if (data.announcementVisible !== undefined) setAnnouncementVisible(data.announcementVisible);
        if (data.programmes && data.programmes.length > 0) setProgrammes(data.programmes);
        if (data.beltRanks && data.beltRanks.length > 0) setBeltRanks(data.beltRanks);
        if (data.governingMembers && data.governingMembers.length > 0) setGoverningMembers(data.governingMembers);
      })
      .catch((err) => {
        console.warn('Backend Cloud SQL offline or seeding in progress, using cached state:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Persist to localStorage as local mirror
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}info`, JSON.stringify(associationInfo));
  }, [associationInfo]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}centres`, JSON.stringify(trainingCentres));
  }, [trainingCentres]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}programmes`, JSON.stringify(programmes));
  }, [programmes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}stages`, JSON.stringify(trainingStages));
  }, [trainingStages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}belts`, JSON.stringify(beltRanks));
  }, [beltRanks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}rules`, JSON.stringify(rulesAndEtiquette));
  }, [rulesAndEtiquette]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}events`, JSON.stringify(associationEvents));
  }, [associationEvents]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}news`, JSON.stringify(newsArticles));
  }, [newsArticles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}gallery`, JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}faqs`, JSON.stringify(faqItems));
  }, [faqItems]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}governing`, JSON.stringify(governingMembers));
  }, [governingMembers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}enquiries`, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}announcementText`, announcementText);
    localStorage.setItem(`${STORAGE_PREFIX}announcementVisible`, JSON.stringify(announcementVisible));
  }, [announcementText, announcementVisible]);

  // Governing Body CRUD
  const addGoverningMember = (memberData: Omit<GoverningMember, 'id'>) => {
    const newId = `gov-${Date.now()}`;
    setGoverningMembers((prev) => [...prev, { ...memberData, id: newId }]);
  };

  const updateGoverningMember = (id: string, updated: Partial<GoverningMember>) => {
    setGoverningMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const deleteGoverningMember = (id: string) => {
    setGoverningMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Centre CRUD with Cloud SQL Persistence
  const addCentre = (centreData: Omit<TrainingCentre, 'id'>) => {
    const newId = `dojo-${Date.now()}`;
    const newCentre = { ...centreData, id: newId };
    setTrainingCentres((prev) => [newCentre, ...prev]);

    fetch('/api/centres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCentre),
    }).catch((err) => console.error('Cloud SQL centre save error:', err));
  };

  const updateCentre = (id: string, updated: Partial<TrainingCentre>) => {
    setTrainingCentres((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updated } : c));
      const target = next.find((c) => c.id === id);
      if (target) {
        fetch('/api/centres', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(target),
        }).catch((err) => console.error('Cloud SQL centre update error:', err));
      }
      return next;
    });
  };

  const deleteCentre = (id: string) => {
    setTrainingCentres((prev) => prev.filter((c) => c.id !== id));
    fetch(`/api/centres/${id}`, { method: 'DELETE' })
      .catch((err) => console.error('Cloud SQL centre delete error:', err));
  };

  // Event CRUD with Cloud SQL Persistence
  const addEvent = (eventData: Omit<AssociationEvent, 'id'>) => {
    const newId = `event-${Date.now()}`;
    const newEvent = { ...eventData, id: newId };
    setAssociationEvents((prev) => [newEvent, ...prev]);

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    }).catch((err) => console.error('Cloud SQL event save error:', err));
  };

  const updateEvent = (id: string, updated: Partial<AssociationEvent>) => {
    setAssociationEvents((prev) => {
      const next = prev.map((e) => (e.id === id ? { ...e, ...updated } : e));
      const target = next.find((e) => e.id === id);
      if (target) {
        fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(target),
        }).catch((err) => console.error('Cloud SQL event update error:', err));
      }
      return next;
    });
  };

  const deleteEvent = (id: string) => {
    setAssociationEvents((prev) => prev.filter((e) => e.id !== id));
    fetch(`/api/events/${id}`, { method: 'DELETE' })
      .catch((err) => console.error('Cloud SQL event delete error:', err));
  };

  // Belt CRUD
  const addBeltRank = (beltData: Omit<BeltRank, 'id'>) => {
    const newId = `belt-${Date.now()}`;
    setBeltRanks((prev) => [...prev, { ...beltData, id: newId }]);
  };

  const updateBeltRank = (id: string, updated: Partial<BeltRank>) => {
    setBeltRanks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
  };

  const deleteBeltRank = (id: string) => {
    setBeltRanks((prev) => prev.filter((b) => b.id !== id));
  };

  // Programme CRUD
  const addProgramme = (progData: Omit<Programme, 'id'>) => {
    const newId = `prog-${Date.now()}`;
    setProgrammes((prev) => [...prev, { ...progData, id: newId }]);
  };

  const updateProgramme = (id: string, updated: Partial<Programme>) => {
    setProgrammes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProgramme = (id: string) => {
    setProgrammes((prev) => prev.filter((p) => p.id !== id));
  };

  // Rule CRUD
  const addRule = (ruleData: Omit<RuleItem, 'id'>) => {
    const newId = `rule-${Date.now()}`;
    setRulesAndEtiquette((prev) => [...prev, { ...ruleData, id: newId }]);
  };

  const updateRule = (id: string, updated: Partial<RuleItem>) => {
    setRulesAndEtiquette((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );
  };

  const deleteRule = (id: string) => {
    setRulesAndEtiquette((prev) => prev.filter((r) => r.id !== id));
  };

  // News CRUD
  const addNewsArticle = (articleData: Omit<NewsArticle, 'id'>) => {
    const newId = `news-${Date.now()}`;
    setNewsArticles((prev) => [{ ...articleData, id: newId }, ...prev]);
  };

  const updateNewsArticle = (id: string, updated: Partial<NewsArticle>) => {
    setNewsArticles((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
  };

  const deleteNewsArticle = (id: string) => {
    setNewsArticles((prev) => prev.filter((n) => n.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = (itemData: Omit<GalleryMedia, 'id'>) => {
    const newId = `gal-${Date.now()}`;
    setGalleryItems((prev) => [...prev, { ...itemData, id: newId }]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryMedia>) => {
    setGalleryItems((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updated } : g))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
  };

  // FAQ CRUD
  const addFAQ = (faq: { question: string; answer: string }) => {
    setFaqItems((prev) => [...prev, faq]);
  };

  const updateFAQ = (index: number, faq: { question: string; answer: string }) => {
    setFaqItems((prev) => prev.map((f, i) => (i === index ? faq : f)));
  };

  const deleteFAQ = (index: number) => {
    setFaqItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Stages & Info
  const updateTrainingStage = (step: number, updated: Partial<TrainingStage>) => {
    setTrainingStages((prev) =>
      prev.map((s) => (s.step === step ? { ...s, ...updated } : s))
    );
  };

  const updateAssociationInfo = (info: Partial<typeof defaultInfo>) => {
    setAssociationInfo((prev: typeof defaultInfo) => ({ ...prev, ...info }));
  };

  const updateAnnouncement = (text: string, visible: boolean) => {
    setAnnouncementText(text);
    setAnnouncementVisible(visible);

    fetch('/api/announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, visible }),
    }).catch((err) => console.error('Cloud SQL announcement update error:', err));
  };

  // Enquiries with Cloud SQL Persistence
  const addEnquiry = (enquiryData: Omit<StoredEnquiry, 'id' | 'createdAt' | 'isContacted'>) => {
    const prefix = enquiryData.type === 'student' ? 'QKD-ADM' : 'QKD-AFF';
    const id = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newEnquiry: StoredEnquiry = {
      ...enquiryData,
      id,
      createdAt: new Date().toISOString(),
      isContacted: false,
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);

    // Persist to Supabase if configured
    if (isSupabaseConfigured()) {
      insertEnquirySupabase(newEnquiry).catch((err) =>
        console.error('Supabase enquiry sync error:', err)
      );
    }

    // Persist to Cloud SQL backend
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEnquiry),
    }).catch((err) => console.error('Cloud SQL enquiry save error:', err));

    return id;
  };

  const toggleEnquiryContacted = (id: string) => {
    let nextStatus = false;
    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          nextStatus = !e.isContacted;
          return { ...e, isContacted: nextStatus };
        }
        return e;
      })
    );

    // Sync with Supabase if configured
    if (isSupabaseConfigured()) {
      updateEnquiryStatusSupabase(id, nextStatus).catch((err) =>
        console.error('Supabase status update error:', err)
      );
    }

    fetch(`/api/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isContacted: nextStatus }),
    }).catch((err) => console.error('Cloud SQL enquiry status update error:', err));
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  // Bulk actions
  const resetToDefaults = () => {
    localStorage.clear();
    setAssociationInfo(defaultInfo);
    setTrainingCentres(defaultCentres);
    setProgrammes(defaultProgrammes);
    setTrainingStages(defaultStages);
    setBeltRanks(defaultBelts);
    setRulesAndEtiquette(defaultRules);
    setAssociationEvents(defaultEvents);
    setNewsArticles(defaultNews);
    setGalleryItems(defaultGallery);
    setFaqItems(defaultFAQs);
    setGoverningMembers(defaultGoverningMembers);
    setEnquiries(initialEnquiries);
    setAnnouncementText('18th Odisha State Qwan Ki Do Championship 2026 at Kalinga Indoor Stadium. Athlete registrations are now open.');
    setAnnouncementVisible(true);
  };

  const exportDataJSON = () => {
    const data = {
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
      announcementText,
      announcementVisible,
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.trainingCentres) setTrainingCentres(parsed.trainingCentres);
      if (parsed.programmes) setProgrammes(parsed.programmes);
      if (parsed.associationEvents) setAssociationEvents(parsed.associationEvents);
      if (parsed.beltRanks) setBeltRanks(parsed.beltRanks);
      if (parsed.rulesAndEtiquette) setRulesAndEtiquette(parsed.rulesAndEtiquette);
      if (parsed.newsArticles) setNewsArticles(parsed.newsArticles);
      if (parsed.galleryItems) setGalleryItems(parsed.galleryItems);
      if (parsed.faqItems) setFaqItems(parsed.faqItems);
      if (parsed.governingMembers) setGoverningMembers(parsed.governingMembers);
      if (parsed.associationInfo) setAssociationInfo(parsed.associationInfo);
      if (parsed.announcementText) setAnnouncementText(parsed.announcementText);
      return true;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
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

        addEnquiry,
        toggleEnquiryContacted,
        deleteEnquiry,

        resetToDefaults,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
