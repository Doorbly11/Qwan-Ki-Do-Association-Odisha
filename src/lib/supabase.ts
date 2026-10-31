import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve credentials from environment variables
const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && (process.env?.VITE_SUPABASE_URL || process.env?.SUPABASE_URL)) ||
  '';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && (process.env?.VITE_SUPABASE_ANON_KEY || process.env?.SUPABASE_ANON_KEY)) ||
  '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseUrl !== 'https://your-project-id.supabase.co' &&
    supabaseAnonKey &&
    supabaseAnonKey !== 'your-anon-key'
  );
};

// Create Supabase client singleton
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Storage Helpers for Supabase Buckets
 */
export async function uploadFileToSupabase(
  bucket: string,
  filePath: string,
  file: File | Blob
): Promise<{ url: string | null; error: Error | null }> {
  if (!supabase) {
    return { url: null, error: new Error('Supabase client is not configured.') };
  }

  try {
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      upsert: true,
    });

    if (error) {
      return { url: null, error };
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err };
  }
}

/**
 * Supabase Database Helpers
 */
export async function insertEnquirySupabase(enquiry: {
  id: string;
  type: string;
  name: string;
  contactNumber: string;
  email?: string;
  district: string;
  details: string;
  isContacted?: boolean;
}) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('enquiries').insert([
    {
      id: enquiry.id,
      type: enquiry.type,
      name: enquiry.name,
      contact_number: enquiry.contactNumber,
      email: enquiry.email || null,
      district: enquiry.district,
      details: enquiry.details,
      is_contacted: enquiry.isContacted || false,
    },
  ]).select();

  if (error) {
    console.error('Supabase enquiry insert error:', error);
    throw error;
  }
  return data?.[0];
}

export async function fetchEnquiriesSupabase() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch enquiries error:', error);
    return null;
  }
  return data;
}

export async function updateEnquiryStatusSupabase(id: string, isContacted: boolean) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('enquiries')
    .update({ is_contacted: isContacted })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Supabase update enquiry status error:', error);
    throw error;
  }
  return data?.[0];
}
