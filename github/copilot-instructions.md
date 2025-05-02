# Copilot Instructions for NGO Website Project

## 📁 Folder Structure
- `website/`: Next.js project with TypeScript and TailwindCSS
- `sanity/`: Sanity.io Studio for headless CMS

## 💻 Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: TailwindCSS
- Forms: React Hook Form + Zod
- CMS: Sanity.io
- Icons: Lucide or Heroicons
- State Management: Context API or Zustand (if needed)
- Animations (optional): Framer Motion

## 🔁 Workflow Approach
- Modular, section-by-section development
- Reusable components (e.g., `SectionWrapper`, `CTA`, `Card`, `RichText(react-portabletext)`)
- Focused iterative work: One section/page at a time
- Pages will be built incrementally, using CMS content and dynamic routing

## 📄 Pages
- `/` Home
- `/about-us`
- `/join-us`
- `/news`
- `/events`
- `/contact-us`
- `Donate` button → External link

## ✅ Component Guidelines
- Use Tailwind utility classes
- Ensure accessibility (`aria-*`, semantic HTML)
- Make components responsive (mobile-first)
- Extract components into `/components/` directory
- Each component should be typed and reusable

## 🧪 Dev Practices
- Write type-safe logic (strict TS mode)
- Validate forms using Zod + RHF
- Use CMS-driven content for all dynamic sections
- Commit early and often with descriptive messages

## 🚀 Deployment Targets
- Vercel (default)
