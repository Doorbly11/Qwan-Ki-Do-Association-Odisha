# Qwan Ki Do Association Odisha — Official Web Portal

The official web application and management platform for **Qwan Ki Do Association Odisha** — traditional Sino-Vietnamese martial arts (*Quán Khí Đạo*), state championship management, affiliated dojos directory, 30-district expansion, syllabus explorer, and student admissions.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Run

1. **Clone or extract** the project files to your local machine:
   ```bash
   cd qwankido-association-odisha
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database & Storage Setup

This application supports two flexible backend persistence layers:

### Option A: Supabase (Recommended for Cloud Hosting)

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase Dashboard and paste the contents of **`supabase_schema.sql`** (located in the project root). Run the script. This creates:
   - Tables: `enquiries`, `centres`, `events`, `news`, `gallery`, `announcements`.
   - Storage Buckets: `gallery-media`, `documents` with public read policies.
3. In **Project Settings &rarr; API**, copy your **Project URL** and **anon public key**.
4. Add them to your `.env` file:
   ```env
   VITE_SUPABASE_URL="https://your-project-id.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key"
   ```

### Option B: PostgreSQL / Cloud SQL (Full-Stack Express Mode)

The built-in Express server (`server.ts`) connects directly to any PostgreSQL instance using Drizzle ORM:
```env
SQL_HOST="127.0.0.1"
SQL_DB_NAME="qwankido_db"
SQL_USER="postgres"
SQL_PASSWORD="your-db-password"
SQL_ADMIN_USER="postgres"
SQL_ADMIN_PASSWORD="your-db-password"
```

To migrate tables to PostgreSQL:
```bash
npx drizzle-kit push
```

---

## 📦 Export & Deployment Options

### 1. Vercel or Netlify (Static + Supabase Serverless)
For low-maintenance static hosting with Supabase as the backend:

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. Add environment variables in the Vercel/Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### 2. Render, Railway, or VPS (Full-Stack Node/Express)
To run the included Express API backend (`server.ts`) alongside the frontend:

1. **Build command**: `npm run build`
2. **Start command**: `npm start` (runs `tsx server.ts`)
3. Set `PORT=3000` (or leave default assigned by host).

### 3. Docker Deployment
A standard Node.js Docker container can be built with:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🛠️ Project Structure

```text
├── public/                 # Static assets, logos, and images
├── src/
│   ├── assets/             # Images and design media
│   ├── components/         # Modular React components
│   │   ├── Navbar.tsx      # Clean header with crest and slide-out menu drawer
│   │   ├── Hero.tsx        # High-contrast martial artist hero banner
│   │   ├── AdminPanel.tsx  # Secure administrative CMS modal
│   │   ├── WebsiteManager/ # Full-page WordPress-style site manager
│   │   └── ...
│   ├── context/            # React state & sync context (DataContext.tsx)
│   ├── data/               # Association data, dojos, events, and syllabus
│   ├── db/                 # Drizzle ORM schema and PostgreSQL query helpers
│   ├── lib/                # Firebase & Supabase client integration
│   ├── types/              # TypeScript definitions
│   ├── App.tsx             # Main application layout and view router
│   └── main.tsx            # React application entry point
├── server.ts               # Express backend API & Vite middleware server
├── supabase_schema.sql     # Supabase SQL migration script
├── index.html              # HTML entry point with Schema.org & SEO metadata
├── metadata.json           # Application metadata & platform capabilities
└── package.json            # Dependencies and scripts
```

---

## 🔑 Administrative Access

- **Admin Portal**: Accessible via the slide-out menu drawer (**ALL PAGES** pull-tab on the left) under **Administration & Management &rarr; Admin Panel**.
- **Keyboard Shortcut**: Press `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac) anywhere on the site to toggle the Admin Panel.
- **Default Master Key**: `Biswal1234` (can be updated in the Admin Security Settings).

---

## 📜 License
Apache-2.0 License. Property of Qwan Ki Do Association Odisha.
