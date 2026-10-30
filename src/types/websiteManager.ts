/**
 * Doorbly Website Manager - TypeScript Definitions
 * Customer-Controlled Visual Website Editor and Management Dashboard
 */

export type UserRole = 'owner' | 'manager' | 'editor' | 'viewer';

export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export interface WebsitePage {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  isHomepage: boolean;
  isSystemPage: boolean;
  navOrder: number;
  showInNav: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  socialImage: string;
  updatedAt: string;
  sectionsCount?: number;
}

export interface WebsiteSection {
  id: string;
  pageId: string;
  sectionKey: string;
  name: string;
  badge: string;
  heading: string;
  subtitle: string;
  description: string;
  isVisible: boolean;
  order: number;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  primaryBtnVisible: boolean;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  secondaryBtnVisible: boolean;
  textAlign: 'left' | 'center' | 'right';
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  imageUrl?: string;
  bgType?: 'color' | 'gradient' | 'image';
}

export interface HeroBanner {
  id: string;
  headline: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  isActive: boolean;
  order: number;
  bgPosition: 'center' | 'top' | 'bottom';
  scheduleStart?: string;
  scheduleEnd?: string;
}

export interface GlobalThemeSettings {
  preset: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontHeading: 'serif' | 'sans' | 'poppins' | 'georgia';
  fontBody: 'sans' | 'poppins' | 'system';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  sectionSpacing: 'compact' | 'normal' | 'spacious';
  contentWidth: 'standard' | 'wide' | 'full';
  headerSticky: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  altText: string;
  caption: string;
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  dimensions: string;
  category: 'banner' | 'avatar' | 'photo' | 'icon' | 'document';
}

export interface WebsiteRevision {
  id: string;
  title: string;
  timestamp: string;
  author: string;
  role: UserRole;
  sectionsCount: number;
  snapshot: {
    sections: WebsiteSection[];
    banners: HeroBanner[];
    theme: GlobalThemeSettings;
    pages: WebsitePage[];
  };
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  pricingUnit: string;
  availability: 'Open' | 'Waitlist' | 'Closed' | 'Coming Soon';
  isPublished: boolean;
  imageUrl?: string;
}
