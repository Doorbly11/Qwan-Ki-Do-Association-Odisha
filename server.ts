import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import {
  seedInitialDataIfEmpty,
  getFullState,
  insertEnquiry,
  updateEnquiryContacted,
  upsertCentre,
  removeCentre,
  upsertEvent,
  removeEvent,
  updateAnnouncementText,
} from './src/db/queries.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Run seed check once on server initialization
  try {
    await seedInitialDataIfEmpty();
  } catch (err) {
    console.error('Initial DB seeding error:', err);
  }

  // ==========================================
  // Cloud SQL Backend API Routes
  // ==========================================

  // 1. Get full state
  app.get('/api/state', async (_req, res) => {
    try {
      const state = await getFullState();
      res.json(state);
    } catch (error: any) {
      console.error('Error in /api/state:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch data' });
    }
  });

  // 2. Submit new enquiry (student admission or 30-district school expansion)
  app.post('/api/enquiries', async (req, res) => {
    try {
      const { id, type, name, contactNumber, email, district, details } = req.body;
      if (!name || !contactNumber || !district) {
        return res.status(400).json({ error: 'Name, contact number, and district are required.' });
      }

      const generatedId = id || `enq_${Date.now()}`;
      const saved = await insertEnquiry({
        id: generatedId,
        type: type || 'student',
        name,
        contactNumber,
        email,
        district,
        details: details || '',
      });

      res.status(201).json(saved);
    } catch (error: any) {
      console.error('Error in /api/enquiries:', error);
      res.status(500).json({ error: error.message || 'Failed to record enquiry' });
    }
  });

  // 3. Update enquiry contacted status
  app.patch('/api/enquiries/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { isContacted } = req.body;
      const updated = await updateEnquiryContacted(id, Boolean(isContacted));
      res.json(updated);
    } catch (error: any) {
      console.error('Error in /api/enquiries/:id/status:', error);
      res.status(500).json({ error: error.message || 'Failed to update status' });
    }
  });

  // 4. Save/Update centre
  app.post('/api/centres', async (req, res) => {
    try {
      const centre = req.body;
      if (!centre.id || !centre.name) {
        return res.status(400).json({ error: 'Centre ID and name are required.' });
      }
      const saved = await upsertCentre(centre);
      res.json(saved);
    } catch (error: any) {
      console.error('Error in /api/centres:', error);
      res.status(500).json({ error: error.message || 'Failed to save centre' });
    }
  });

  // 5. Delete centre
  app.delete('/api/centres/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await removeCentre(id);
      res.json(result);
    } catch (error: any) {
      console.error('Error in DELETE /api/centres/:id:', error);
      res.status(500).json({ error: error.message || 'Failed to delete centre' });
    }
  });

  // 6. Save/Update event
  app.post('/api/events', async (req, res) => {
    try {
      const event = req.body;
      if (!event.id || !event.title) {
        return res.status(400).json({ error: 'Event ID and title are required.' });
      }
      const saved = await upsertEvent(event);
      res.json(saved);
    } catch (error: any) {
      console.error('Error in /api/events:', error);
      res.status(500).json({ error: error.message || 'Failed to save event' });
    }
  });

  // 7. Delete event
  app.delete('/api/events/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await removeEvent(id);
      res.json(result);
    } catch (error: any) {
      console.error('Error in DELETE /api/events/:id:', error);
      res.status(500).json({ error: error.message || 'Failed to delete event' });
    }
  });

  // 8. Update announcement
  app.post('/api/announcement', async (req, res) => {
    try {
      const { text, visible } = req.body;
      const updated = await updateAnnouncementText(text, Boolean(visible));
      res.json(updated);
    } catch (error: any) {
      console.error('Error in /api/announcement:', error);
      res.status(500).json({ error: error.message || 'Failed to update announcement' });
    }
  });

  // ==========================================
  // Vite Integration
  // ==========================================
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
