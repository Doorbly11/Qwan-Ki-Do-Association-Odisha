/**
 * TypeScript definitions for Qwan Ki Do Association Odisha
 */

export type PageView =
  | 'home'
  | 'about'
  | 'programmes'
  | 'journey'
  | 'belts'
  | 'centres'
  | 'rules'
  | 'instructors'
  | 'benefits'
  | 'events'
  | 'news'
  | 'gallery'
  | 'governing'
  | 'enquiry';

export interface BeltRank {
  id: string;
  category: 'junior' | 'senior' | 'master';
  rankName: string;
  vietnameseTitle: string;
  sashColor: string;
  accentStripes?: {
    count: number;
    color: string;
  };
  durationMinMonths: number;
  minAgeYears: number;
  syllabusHighlights: string[];
  examinationCriteria: string[];
  responsibilities: string;
  officialNote?: string;
}

export interface TrainingStage {
  step: number;
  title: string;
  vietnameseTerm: string;
  objective: string;
  focusAreas: string[];
  durationEstimate: string;
  assessmentRequirement: string;
  safetyGuidelines: string;
}

export interface Programme {
  id: string;
  title: string;
  vietnameseName?: string;
  category: 'children' | 'youth' | 'adults' | 'advanced' | 'weapons';
  targetAudience: string;
  description: string;
  learningObjectives: string[];
  sessionStructure: {
    duration: string;
    warmup: string;
    technicalFocus: string;
    conditioning: string;
    cooldown: string;
  };
  safetyRequirements: string[];
  badgeText: string;
  image?: string;
}

export interface TrainingCentre {
  id: string;
  name: string;
  district: string;
  city: string;
  locality: string;
  address: string;
  chiefInstructor: string;
  instructorRank: string;
  contactPhone: string;
  contactEmail: string;
  schedule: {
    days: string;
    timings: string;
    group: string;
  }[];
  ageGroups: ('Children (5-12)' | 'Youth (13-17)' | 'Adults (18+)' | 'Women Self-Defense')[];
  beginnerFriendly: boolean;
  isVerifiedAffiliated: boolean;
  affiliationNumber: string;
  facilityNotes: string;
}

export interface RuleItem {
  id: string;
  category: 'students' | 'parents' | 'instructors' | 'competitors' | 'centres';
  title: string;
  summary: string;
  fullRegulation: string;
  officialDocumentRef?: string;
  isBindingRegulation: boolean;
}

export interface AssociationEvent {
  id: string;
  title: string;
  type: 'championship' | 'grading' | 'seminar' | 'workshop' | 'training_camp';
  date: string;
  venue: string;
  district: string;
  registrationDeadline: string;
  status: 'upcoming' | 'completed' | 'announcement_pending';
  eligibility: string;
  rulesSummary: string;
  contactPerson: string;
  contactPhone: string;
  downloadUrl?: string;
  resultsSummary?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: 'championship' | 'association' | 'grading' | 'seminar' | 'national';
  readTime: string;
  excerpt: string;
  content: string[];
  author: string;
}

export interface GalleryMedia {
  id: string;
  headline: string;
  title: string;
  category: 'training' | 'championship' | 'gradings' | 'seminars';
  caption: string;
  imageUrl: string;
  altText: string;
  date?: string;
  district?: string;
}

export interface GoverningMember {
  id: string;
  name: string;
  role: string;
  designationCategory: 'executive' | 'technical' | 'district' | 'advisory';
  rankOrTitle: string;
  district?: string;
  bio: string;
  phone?: string;
  email?: string;
  tenure?: string;
  image?: string;
}
