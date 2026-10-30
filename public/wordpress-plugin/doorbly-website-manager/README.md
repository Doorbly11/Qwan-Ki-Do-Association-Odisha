# Doorbly Website Manager — WordPress Plugin Documentation

## Overview
**Doorbly Website Manager** is an installable, customer-facing website management dashboard and visual editor designed specifically for WordPress websites using the **Astra theme** (and standard WordPress themes).

It enables website owners and authorized clients to visually customize pages, hero banners, sections, colors, typography, services, media, and navigation **without writing or editing HTML, CSS, JavaScript, PHP, or database records**.

---

## 1. Key Features
- **Visual Website Editor**: Real-time split-screen live preview with Desktop, Tablet, and Mobile device toggles.
- **Section-by-Section Customizer**: Custom headings, subtitles, descriptions, button labels, button URLs, background colors, and visibility toggles.
- **Hero Banner Management**: Multi-banner slider controls, image upload, CTA destinations, and responsive alignment.
- **Complete Page Management**: Add, rename, edit slugs, duplicate, publish, unpublish, and reorder pages. Protected system pages are safeguards from accidental deletion.
- **Services & Content Manager**: Edit service categories, descriptions, pricing units, and publication status.
- **Global Theme & Design Customizer**: Primary brand colors, font pairings, border radius, spacing, and instant presets (Odisha Sandstone, Temple Gold, Modern Emerald, Royal Navy).
- **WordPress Media Library Integration**: Direct access to media uploads, metadata, alt text, and replacement.
- **Role-Based Permissions**: Website Owner, Content Manager, Editor, and Viewer permission levels.
- **Drafts, Publishing & Revision History**: Save drafts, publish live with cache invalidation, and 1-click restore previous revisions.

---

## 2. Installation Instructions

### Step 1: Upload via WordPress Admin
1. Download the `doorbly-website-manager` folder as a `.zip` archive.
2. Log in to your WordPress dashboard (`/wp-admin/`).
3. Navigate to **Plugins → Add New → Upload Plugin**.
4. Choose the zip file and click **Install Now**.
5. Click **Activate Plugin**.

### Step 2: Configure the Dedicated Management Page
1. Go to **Pages → Add New**.
2. Title the page: `Website Manager`.
3. Set the page slug to `website-manager`.
4. In the page content, add the shortcode:
   ```text
   [doorbly_website_manager]
   ```
5. Set Page Template to **Astra Full Width / Stretched** (or No Sidebar).
6. Click **Publish**.
7. Authorized users can now access the visual editor at `https://yourdomain.com/website-manager/`.

---

## 3. Integration with Astra Theme
This plugin is built to respect and enhance the Astra theme without modifying any core files:
- Injects scoped CSS variables (`--doorbly-primary`, `--doorbly-accent`, `--doorbly-bg`) into `wp_head`.
- Automatically maps Astra global color palettes (`--ast-global-color-0`, `--ast-global-color-1`) to match your custom brand palette.
- Preserves Astra Header & Footer builders and mobile off-canvas navigation.

---

## 4. REST API Endpoints
All endpoints are scoped under `/wp-json/doorbly/v1/` and protected with capability checks:

| Endpoint | Method | Required Capability | Description |
|---|---|---|---|
| `/wp-json/doorbly/v1/settings` | GET | Public | Fetch published global theme settings |
| `/wp-json/doorbly/v1/settings` | POST | `manage_options` | Update global theme colors & typography |
| `/wp-json/doorbly/v1/sections` | GET | Public | Fetch published sections data |
| `/wp-json/doorbly/v1/sections` | POST | `edit_pages` | Save section content & styling |
| `/wp-json/doorbly/v1/banners` | GET | Public | Fetch hero banners |
| `/wp-json/doorbly/v1/banners` | POST | `edit_pages` | Save hero banners |
| `/wp-json/doorbly/v1/services` | GET | Public | Fetch services/programmes list |
| `/wp-json/doorbly/v1/services` | POST | `edit_pages` | Save service items and pricing |
| `/wp-json/doorbly/v1/publish` | POST | `publish_pages` | Publish draft changes & invalidate cache |
| `/wp-json/doorbly/v1/media` | GET | `edit_posts` | Fetch WordPress Media Library attachments |

---

## 5. Backup & Recovery Procedure
Before publishing significant structural changes:
1. **Automatic Snapshots**: Every time you click "Publish", the plugin automatically stores a revision snapshot under `doorbly_revisions_history` in your WordPress `wp_options` table.
2. **1-Click Rollback**: In the Website Manager, click the **Revisions** tab to view all timestamped revisions and click **Restore This Version**.
3. **Database Backup**: Standard WordPress backups via UpdraftPlus, WP-CLI (`wp db export`), or cPanel phpMyAdmin will capture all `doorbly_*` options safely.

---

## 6. Testing Checklist
- [x] Login authentication & role-based permissions verify correctly.
- [x] Page creation, renaming, and slug changes take effect.
- [x] Protected system pages cannot be accidentally deleted.
- [x] Section headings, descriptions, and CTA button URLs update in real-time.
- [x] Hero banner images replace cleanly and responsive preview toggles between Desktop, Tablet, and Mobile.
- [x] Undo and Redo actions accurately step through editor changes.
- [x] Save Draft keeps changes in draft mode without exposing them to public visitors.
- [x] Publish Live updates the live website and invalidates cache.
- [x] WordPress Media Library inserts selected images into the editor.
- [x] Global theme presets apply instant harmonious palettes without deleting content.
