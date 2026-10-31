import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
} from 'drizzle-orm/pg-core';

// 1. Users table (linking Firebase Auth UID)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').default('user'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Training Centres Table
export const centres = pgTable('centres', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  district: text('district').notNull(),
  city: text('city').notNull(),
  locality: text('locality').notNull(),
  address: text('address').notNull(),
  chiefInstructor: text('chief_instructor').notNull(),
  instructorRank: text('instructor_rank').notNull(),
  contactPhone: text('contact_phone').notNull(),
  contactEmail: text('contact_email').notNull(),
  schedule: jsonb('schedule').notNull().default([]),
  ageGroups: jsonb('age_groups').notNull().default([]),
  beginnerFriendly: boolean('beginner_friendly').notNull().default(true),
  isVerifiedAffiliated: boolean('is_verified_affiliated').notNull().default(true),
  affiliationNumber: text('affiliation_number').notNull(),
  facilityNotes: text('facility_notes').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 3. Association Events Table
export const events = pgTable('events', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  date: text('date').notNull(),
  venue: text('venue').notNull(),
  district: text('district').notNull(),
  registrationDeadline: text('registration_deadline').notNull(),
  status: text('status').notNull(),
  eligibility: text('eligibility').notNull(),
  rulesSummary: text('rules_summary').notNull(),
  contactPerson: text('contact_person').notNull(),
  contactPhone: text('contact_phone').notNull(),
  downloadUrl: text('download_url'),
  resultsSummary: text('results_summary'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 4. News Articles Table
export const news = pgTable('news', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  date: text('date').notNull(),
  category: text('category').notNull(),
  readTime: text('read_time').notNull(),
  excerpt: text('excerpt').notNull(),
  content: jsonb('content').notNull().default([]),
  author: text('author').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 5. Gallery Items Table
export const gallery = pgTable('gallery', {
  id: text('id').primaryKey(),
  headline: text('headline').notNull(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  caption: text('caption').notNull(),
  imageUrl: text('image_url').notNull(),
  altText: text('alt_text').notNull(),
  date: text('date'),
  district: text('district'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 6. Enquiries Table (Admissions, Workshops & Affiliation Requests)
export const enquiries = pgTable('enquiries', {
  id: text('id').primaryKey(),
  type: text('type').notNull(), // 'student' | 'affiliation'
  name: text('name').notNull(),
  contactNumber: text('contact_number').notNull(),
  email: text('email'),
  district: text('district').notNull(),
  details: text('details').notNull(),
  isContacted: boolean('is_contacted').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// 7. Announcements Table
export const announcements = pgTable('announcements', {
  id: text('id').primaryKey(),
  text: text('text').notNull(),
  visible: boolean('visible').notNull().default(true),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 8. Programmes Table
export const programmes = pgTable('programmes', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  vietnameseName: text('vietnamese_name'),
  category: text('category').notNull(),
  targetAudience: text('target_audience').notNull(),
  description: text('description').notNull(),
  learningObjectives: jsonb('learning_objectives').notNull().default([]),
  sessionStructure: jsonb('session_structure').notNull().default({}),
  safetyRequirements: jsonb('safety_requirements').notNull().default([]),
  badgeText: text('badge_text').notNull(),
  image: text('image'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 9. Belt Ranks Table
export const beltRanks = pgTable('belt_ranks', {
  id: text('id').primaryKey(),
  category: text('category').notNull(),
  rankName: text('rank_name').notNull(),
  vietnameseTitle: text('vietnamese_title').notNull(),
  sashColor: text('sash_color').notNull(),
  accentStripes: jsonb('accent_stripes'),
  durationMinMonths: integer('duration_min_months').notNull(),
  minAgeYears: integer('min_age_years').notNull(),
  syllabusHighlights: jsonb('syllabus_highlights').notNull().default([]),
  examinationCriteria: jsonb('examination_criteria').notNull().default([]),
  responsibilities: text('responsibilities').notNull(),
  officialNote: text('official_note'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 10. Governing Members Table
export const governingMembers = pgTable('governing_members', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  designationCategory: text('designation_category').notNull(),
  rankOrTitle: text('rank_or_title').notNull(),
  district: text('district'),
  bio: text('bio').notNull(),
  phone: text('phone'),
  email: text('email'),
  tenure: text('tenure'),
  image: text('image'),
  updatedAt: timestamp('updated_at').defaultNow(),
});
