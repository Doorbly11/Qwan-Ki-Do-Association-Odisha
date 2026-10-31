-- =========================================================================
-- Qwan Ki Do Association Odisha - Supabase Database & Storage Setup Script
-- Paste this script into your Supabase Dashboard -> SQL Editor and run it.
-- =========================================================================

-- 1. Create Enquiries Table (Admissions, Workshops & Affiliation Requests)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL DEFAULT 'student', -- 'student' or 'affiliation'
    name TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    email TEXT,
    district TEXT NOT NULL,
    details TEXT NOT NULL,
    is_contacted BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Training Centres Table
CREATE TABLE IF NOT EXISTS public.centres (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    district TEXT NOT NULL,
    city TEXT NOT NULL,
    locality TEXT NOT NULL,
    address TEXT NOT NULL,
    chief_instructor TEXT NOT NULL,
    instructor_rank TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    schedule JSONB NOT NULL DEFAULT '[]'::jsonb,
    age_groups JSONB NOT NULL DEFAULT '[]'::jsonb,
    beginner_friendly BOOLEAN NOT NULL DEFAULT true,
    is_verified_affiliated BOOLEAN NOT NULL DEFAULT true,
    affiliation_number TEXT NOT NULL,
    facility_notes TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Association Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    venue TEXT NOT NULL,
    district TEXT NOT NULL,
    registration_deadline TEXT NOT NULL,
    status TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    rules_summary TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    download_url TEXT,
    results_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create News Articles Table
CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    read_time TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '[]'::jsonb,
    author TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Gallery Media Table
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY,
    headline TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    caption TEXT NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    date TEXT,
    district TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    visible BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- Supabase Storage Buckets
-- =========================================================================

-- Insert public storage buckets for media assets and documents
INSERT INTO storage.buckets (id, name, public) 
VALUES 
    ('gallery-media', 'gallery-media', true),
    ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.centres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Create Policies for Public Access
CREATE POLICY "Public Read Access on Centres" ON public.centres FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public Read Access on News" ON public.news FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Announcements" ON public.announcements FOR SELECT USING (true);

-- Allow anyone to submit an enquiry
CREATE POLICY "Allow public insert on enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select on enquiries" ON public.enquiries FOR SELECT USING (true);
CREATE POLICY "Allow update on enquiries" ON public.enquiries FOR UPDATE USING (true);

-- Storage bucket access policies
CREATE POLICY "Public Access for Gallery Media" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-media');
CREATE POLICY "Public Upload for Gallery Media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-media');
