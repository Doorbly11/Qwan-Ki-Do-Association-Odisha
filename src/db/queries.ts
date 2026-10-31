import { db } from './index.ts';
import {
  centres,
  events,
  news,
  gallery,
  enquiries,
  announcements,
  programmes,
  beltRanks,
  governingMembers,
} from './schema.ts';
import { eq, desc } from 'drizzle-orm';
import {
  TRAINING_CENTRES,
  ASSOCIATION_EVENTS,
  NEWS_ARTICLES,
  GALLERY_ITEMS,
  PROGRAMMES,
  BELT_RANKS,
  GOVERNING_BODY_MEMBERS,
} from '../data/associationData.ts';

/**
 * Seed initial association data into Cloud SQL PostgreSQL database if empty
 */
export async function seedInitialDataIfEmpty() {
  try {
    // 1. Check centres
    const existingCentres = await db.select({ id: centres.id }).from(centres).limit(1);
    if (existingCentres.length === 0) {
      console.log('Seeding initial centres...');
      for (const c of TRAINING_CENTRES) {
        await db.insert(centres).values({
          id: c.id,
          name: c.name,
          district: c.district,
          city: c.city,
          locality: c.locality,
          address: c.address,
          chiefInstructor: c.chiefInstructor,
          instructorRank: c.instructorRank,
          contactPhone: c.contactPhone,
          contactEmail: c.contactEmail,
          schedule: c.schedule as any,
          ageGroups: c.ageGroups as any,
          beginnerFriendly: c.beginnerFriendly,
          isVerifiedAffiliated: c.isVerifiedAffiliated,
          affiliationNumber: c.affiliationNumber,
          facilityNotes: c.facilityNotes,
        }).onConflictDoNothing();
      }
    }

    // 2. Check events
    const existingEvents = await db.select({ id: events.id }).from(events).limit(1);
    if (existingEvents.length === 0) {
      console.log('Seeding initial events...');
      for (const ev of ASSOCIATION_EVENTS) {
        await db.insert(events).values({
          id: ev.id,
          title: ev.title,
          type: ev.type,
          date: ev.date,
          venue: ev.venue,
          district: ev.district,
          registrationDeadline: ev.registrationDeadline,
          status: ev.status,
          eligibility: ev.eligibility,
          rulesSummary: ev.rulesSummary,
          contactPerson: ev.contactPerson,
          contactPhone: ev.contactPhone,
          downloadUrl: ev.downloadUrl || null,
          resultsSummary: ev.resultsSummary || null,
        }).onConflictDoNothing();
      }
    }

    // 3. Check news
    const existingNews = await db.select({ id: news.id }).from(news).limit(1);
    if (existingNews.length === 0) {
      console.log('Seeding initial news...');
      for (const n of NEWS_ARTICLES) {
        await db.insert(news).values({
          id: n.id,
          title: n.title,
          date: n.date,
          category: n.category,
          readTime: n.readTime,
          excerpt: n.excerpt,
          content: n.content as any,
          author: n.author,
        }).onConflictDoNothing();
      }
    }

    // 4. Check gallery
    const existingGallery = await db.select({ id: gallery.id }).from(gallery).limit(1);
    if (existingGallery.length === 0) {
      console.log('Seeding initial gallery...');
      for (const g of GALLERY_ITEMS) {
        await db.insert(gallery).values({
          id: g.id,
          headline: g.headline,
          title: g.title,
          category: g.category,
          caption: g.caption,
          imageUrl: g.imageUrl,
          altText: g.altText,
          date: g.date || null,
          district: g.district || null,
        }).onConflictDoNothing();
      }
    }

    // 5. Check announcements
    const existingAnn = await db.select({ id: announcements.id }).from(announcements).limit(1);
    if (existingAnn.length === 0) {
      await db.insert(announcements).values({
        id: 'main-announcement',
        text: 'State Technical Seminar & Black Belt Examination scheduled in Bhubaneswar next month. Online registrations open for affiliated district dojos.',
        visible: true,
      }).onConflictDoNothing();
    }

    // 6. Check programmes
    const existingProgs = await db.select({ id: programmes.id }).from(programmes).limit(1);
    if (existingProgs.length === 0) {
      for (const p of PROGRAMMES) {
        await db.insert(programmes).values({
          id: p.id,
          title: p.title,
          vietnameseName: p.vietnameseName || null,
          category: p.category,
          targetAudience: p.targetAudience,
          description: p.description,
          learningObjectives: p.learningObjectives as any,
          sessionStructure: p.sessionStructure as any,
          safetyRequirements: p.safetyRequirements as any,
          badgeText: p.badgeText,
          image: p.image || null,
        }).onConflictDoNothing();
      }
    }

    // 7. Check belt ranks
    const existingBelts = await db.select({ id: beltRanks.id }).from(beltRanks).limit(1);
    if (existingBelts.length === 0) {
      for (const b of BELT_RANKS) {
        await db.insert(beltRanks).values({
          id: b.id,
          category: b.category,
          rankName: b.rankName,
          vietnameseTitle: b.vietnameseTitle,
          sashColor: b.sashColor,
          accentStripes: b.accentStripes as any,
          durationMinMonths: b.durationMinMonths,
          minAgeYears: b.minAgeYears,
          syllabusHighlights: b.syllabusHighlights as any,
          examinationCriteria: b.examinationCriteria as any,
          responsibilities: b.responsibilities,
          officialNote: b.officialNote || null,
        }).onConflictDoNothing();
      }
    }

    // 8. Check governing members
    const existingMembers = await db.select({ id: governingMembers.id }).from(governingMembers).limit(1);
    if (existingMembers.length === 0) {
      for (const m of GOVERNING_BODY_MEMBERS) {
        await db.insert(governingMembers).values({
          id: m.id,
          name: m.name,
          role: m.role,
          designationCategory: m.designationCategory,
          rankOrTitle: m.rankOrTitle,
          district: m.district || null,
          bio: m.bio,
          phone: m.phone || null,
          email: m.email || null,
          tenure: m.tenure || null,
          image: m.image || null,
        }).onConflictDoNothing();
      }
    }
  } catch (err) {
    console.error('Error during database seed:', err);
  }
}

/**
 * Fetch all association state from Cloud SQL
 */
export async function getFullState() {
  try {
    const [
      allCentres,
      allEvents,
      allNews,
      allGallery,
      allEnquiries,
      allAnnouncements,
      allProgrammes,
      allBelts,
      allMembers,
    ] = await Promise.all([
      db.select().from(centres),
      db.select().from(events),
      db.select().from(news),
      db.select().from(gallery),
      db.select().from(enquiries).orderBy(desc(enquiries.createdAt)),
      db.select().from(announcements),
      db.select().from(programmes),
      db.select().from(beltRanks),
      db.select().from(governingMembers),
    ]);

    const activeAnnouncement = allAnnouncements[0] || {
      text: 'State Technical Seminar & Black Belt Examination scheduled in Bhubaneswar.',
      visible: true,
    };

    return {
      trainingCentres: allCentres.length > 0 ? allCentres : TRAINING_CENTRES,
      associationEvents: allEvents.length > 0 ? allEvents : ASSOCIATION_EVENTS,
      newsArticles: allNews.length > 0 ? allNews : NEWS_ARTICLES,
      galleryItems: allGallery.length > 0 ? allGallery : GALLERY_ITEMS,
      enquiries: allEnquiries,
      announcementText: activeAnnouncement.text,
      announcementVisible: activeAnnouncement.visible,
      programmes: allProgrammes.length > 0 ? allProgrammes : PROGRAMMES,
      beltRanks: allBelts.length > 0 ? allBelts : BELT_RANKS,
      governingMembers: allMembers.length > 0 ? allMembers : GOVERNING_BODY_MEMBERS,
    };
  } catch (error) {
    console.error('Failed to getFullState from Cloud SQL:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

/**
 * Insert new enquiry
 */
export async function insertEnquiry(data: {
  id: string;
  type: string;
  name: string;
  contactNumber: string;
  email?: string;
  district: string;
  details: string;
}) {
  try {
    const result = await db.insert(enquiries).values({
      id: data.id,
      type: data.type,
      name: data.name,
      contactNumber: data.contactNumber,
      email: data.email || null,
      district: data.district,
      details: data.details,
      isContacted: false,
    }).returning();
    return result[0];
  } catch (error) {
    console.error('Failed to insert enquiry:', error);
    throw new Error('Failed to save enquiry to database.', { cause: error });
  }
}

/**
 * Update enquiry contacted status
 */
export async function updateEnquiryContacted(id: string, isContacted: boolean) {
  try {
    const result = await db.update(enquiries)
      .set({ isContacted })
      .where(eq(enquiries.id, id))
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to update enquiry status:', error);
    throw new Error('Failed to update enquiry status.', { cause: error });
  }
}

/**
 * Upsert centre
 */
export async function upsertCentre(c: any) {
  try {
    const result = await db.insert(centres).values({
      id: c.id,
      name: c.name,
      district: c.district,
      city: c.city,
      locality: c.locality,
      address: c.address,
      chiefInstructor: c.chiefInstructor,
      instructorRank: c.instructorRank,
      contactPhone: c.contactPhone,
      contactEmail: c.contactEmail,
      schedule: c.schedule,
      ageGroups: c.ageGroups,
      beginnerFriendly: c.beginnerFriendly ?? true,
      isVerifiedAffiliated: c.isVerifiedAffiliated ?? true,
      affiliationNumber: c.affiliationNumber,
      facilityNotes: c.facilityNotes || '',
      updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: centres.id,
      set: {
        name: c.name,
        district: c.district,
        city: c.city,
        locality: c.locality,
        address: c.address,
        chiefInstructor: c.chiefInstructor,
        instructorRank: c.instructorRank,
        contactPhone: c.contactPhone,
        contactEmail: c.contactEmail,
        schedule: c.schedule,
        ageGroups: c.ageGroups,
        beginnerFriendly: c.beginnerFriendly ?? true,
        isVerifiedAffiliated: c.isVerifiedAffiliated ?? true,
        affiliationNumber: c.affiliationNumber,
        facilityNotes: c.facilityNotes || '',
        updatedAt: new Date(),
      },
    }).returning();
    return result[0];
  } catch (error) {
    console.error('Failed to upsert centre:', error);
    throw new Error('Failed to save centre to database.', { cause: error });
  }
}

/**
 * Delete centre
 */
export async function removeCentre(id: string) {
  try {
    await db.delete(centres).where(eq(centres.id, id));
    return { success: true };
  } catch (error) {
    console.error('Failed to delete centre:', error);
    throw new Error('Failed to delete centre from database.', { cause: error });
  }
}

/**
 * Upsert event
 */
export async function upsertEvent(ev: any) {
  try {
    const result = await db.insert(events).values({
      id: ev.id,
      title: ev.title,
      type: ev.type,
      date: ev.date,
      venue: ev.venue,
      district: ev.district,
      registrationDeadline: ev.registrationDeadline,
      status: ev.status,
      eligibility: ev.eligibility,
      rulesSummary: ev.rulesSummary,
      contactPerson: ev.contactPerson,
      contactPhone: ev.contactPhone,
      downloadUrl: ev.downloadUrl || null,
      resultsSummary: ev.resultsSummary || null,
      updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: events.id,
      set: {
        title: ev.title,
        type: ev.type,
        date: ev.date,
        venue: ev.venue,
        district: ev.district,
        registrationDeadline: ev.registrationDeadline,
        status: ev.status,
        eligibility: ev.eligibility,
        rulesSummary: ev.rulesSummary,
        contactPerson: ev.contactPerson,
        contactPhone: ev.contactPhone,
        downloadUrl: ev.downloadUrl || null,
        resultsSummary: ev.resultsSummary || null,
        updatedAt: new Date(),
      },
    }).returning();
    return result[0];
  } catch (error) {
    console.error('Failed to upsert event:', error);
    throw new Error('Failed to save event to database.', { cause: error });
  }
}

/**
 * Delete event
 */
export async function removeEvent(id: string) {
  try {
    await db.delete(events).where(eq(events.id, id));
    return { success: true };
  } catch (error) {
    console.error('Failed to delete event:', error);
    throw new Error('Failed to delete event from database.', { cause: error });
  }
}

/**
 * Update announcement
 */
export async function updateAnnouncementText(text: string, visible: boolean) {
  try {
    const result = await db.insert(announcements).values({
      id: 'main-announcement',
      text,
      visible,
      updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: announcements.id,
      set: {
        text,
        visible,
        updatedAt: new Date(),
      },
    }).returning();
    return result[0];
  } catch (error) {
    console.error('Failed to update announcement:', error);
    throw new Error('Failed to update announcement.', { cause: error });
  }
}
