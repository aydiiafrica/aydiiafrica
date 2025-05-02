# Product Requirements – NGO Website

## 🎯 Project Goal
Build a clean, accessible, and responsive website for a non-profit organization to increase visibility, share updates, allow membership applications, and encourage donations.

## 🧱 Core Pages & Purpose
### 1. Home
- Hero section with mission/CTA
- About teaser
- Latest News
- Upcoming Events
- Join Us CTA
- Donate CTA

### 2. About Us
- Full mission statement
- Vision & Values
- Team/Leadership Section

### 3. Join Us
- Informational content
- Form to apply (powered by RHF + Zod)
- Submit to Sanity/Backend API or email

### 4. News
- CMS-driven blog style listing
- Each news article on a dynamic route (`/news/[slug]`)

### 5. Events
- List of upcoming/past events
- Filter or tabbed navigation 
- Event details page (`/events/[slug]`)

### 6. Contact Us
- Contact form Submit to Sanity/Backend API or email
- Contact details, map, and social media links

### 7. Donate (Button)
- Prominent in header/footer
- Links to external donation provider (e.g., PayPal, Donorbox)

## 📐 Design Guidelines
- Mobile-first and responsive
- Clear CTA buttons
- Minimal, modern, accessible design
- Color palette to reflect trust and compassion (NGO-style)

## 🗂 CMS Content Types
- Page content (home, about, etc.)
- News posts
- Event entries
- Team members
- Application submissions (if stored)

## 📝 Form Behavior
- All forms use React Hook Form + Zod
- Client-side validation
- Optional backend/API support or Sanity form storage

## 🌐 SEO & Accessibility
- Semantic HTML
- Meta tags via `next/head` or `metadata.ts`
- OpenGraph + Twitter meta
- Sitemap and robots.txt

## 📆 Development Plan
Work will proceed in the following modular stages:
1. Layout & Navigation
2. Home Page Sections
3. Reusable components (e.g., `Card`, `FormField`)
4. CMS integration for dynamic sections
5. Remaining pages, one by one

---

✅ This file will evolve alongside development.
