# TechMan Assist Landing Page & Cloud Admin Portal

TechMan Assist is a premium static web application featuring secure remote interview proxies, mock interview benchmarking, certification assistance, and daily job support systems.

The platform is built as a Jamstack application featuring a dynamic frontend client with a secure, multi-tab admin panel that syncs databases and object files using **GitHub repository commits** or **Supabase Database & Storage buckets**.

---

## Key Features

1. **Vibrant & Dynamic Interface:** High-end glassmorphic UI, curated HSL color schemes, dark mode aesthetics, and smooth typography.
2. **Auto-Play Screenshot Gallery:** Horizontal scrolling screenshot gallery (Offer Letters, Assignments, Certifications) that hides scrollbars and loops automatically.pauses on hover.
3. **Interactive Setup Stepper:** Dynamic step-by-step proxy configuration manual for hardware, software (Chrome Remote Desktop, Otter.ai, Zoom), and sound settings.
4. **Cloud-Based Admin Panel:** Multi-tab console protected by passcode (`admin`):
   * **Screenshots Tab:** Upload and compress screenshots to `.webp` (~30KB), write titles/categories, and manage items.
   * **Support Experts Tab:** Update the technical roster dynamically.
   * **Pricing Plans Tab:** Add/delete billing tiers with custom pre-filled WhatsApp click links.
   * **Setup Guide Tab:** Edit stepper instructions dynamically (updates in-place or creates new steps).
   * **Cloud Settings Tab:** Input GitHub Sync repo credentials or Supabase URL & Public Anon Keys.

---

## Technical Stack
* **Frontend:** Vanilla HTML5, CSS3 Custom Properties, and ES6+ JavaScript.
* **Database & Storage Engines:** 
  * **Option A (Default):** Static local JSON fallbacks (`gallery.json`, `experts.json`, `pricing.json`, `setup.json`) with client-side preview in LocalStorage.
  * **Option B (GitHub Sync):** Direct GitHub REST API commits for automated Jamstack rebuilding.
  * **Option C (Supabase Cloud):** Supabase REST PostgreSQL queries and S3-compatible storage file uploads for scaling up to 100,000+ screenshots.

---

## SQL Database Setup (Supabase)
To offload database tables and images to Supabase:
1. Create a free project on [Supabase](https://supabase.com/).
2. Navigate to the **SQL Editor** tab and execute the following database structure script:

```sql
-- Create screenshots table
CREATE TABLE public.gallery (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    "desc" TEXT,
    img TEXT NOT NULL
);

-- Create experts table
CREATE TABLE public.experts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    domain TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT,
    tech TEXT[]
);

-- Create pricing table
CREATE TABLE public.pricing (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    period TEXT NOT NULL,
    "desc" TEXT,
    benefits TEXT[] NOT NULL,
    popular BOOLEAN DEFAULT false,
    whatsapp_text TEXT
);

-- Create setup steps table
CREATE TABLE public.setup_steps (
    step INT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    text TEXT NOT NULL,
    items JSONB NOT NULL
);

-- Enable row level security (RLS) policies for select, insert, and delete
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.setup_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete access" ON public.gallery FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON public.experts FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.experts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete access" ON public.experts FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON public.pricing FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.pricing FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete access" ON public.pricing FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON public.setup_steps FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.setup_steps FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete access" ON public.setup_steps FOR DELETE USING (true);
```

3. Navigate to **Storage** on Supabase, click **New Bucket**, name it **`gallery`**, and toggle it to **Public**.

---

## Local Development
1. Open PowerShell and execute the local testing server script:
   ```powershell
   .\run_server.ps1
   ```
2. Navigate to `http://localhost:8000/` in your browser.
3. Access the Admin Panel at the footer link (passcode: `admin`).
