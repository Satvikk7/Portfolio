# Satvik's Portfolio — Setup & Deployment Guide

## Project Structure
```
satvik-portfolio/
├── src/
│   ├── sections/         # Page sections (Hero, About, Skills, etc.)
│   ├── components/       # Shared components (Navbar, Cursor, etc.)
│   └── index.css         # Global styles
├── public/               # Static files (resume.pdf goes here)
├── vercel.json           # Vercel deploy config
└── package.json
```

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# Opens at http://localhost:3000
```

## Personalization Checklist

### Required
- [ ] Replace `resume.pdf` in `/public/` with your actual resume
- [ ] Update email/GitHub/LinkedIn links in `Contact.jsx` and `Navbar.jsx`
- [ ] Add your photo to `/public/` and update `Hero.jsx` (the photo circle section)
- [ ] Add design work images to `/public/gallery/` and update `Gallery.jsx`

### EmailJS Setup (Contact Form)
1. Go to https://www.emailjs.com — create free account
2. Create a new Service (Gmail recommended)
3. Create an Email Template with variables: `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`
4. Get your **Service ID**, **Template ID**, and **Public Key**
5. In `Contact.jsx`, uncomment and configure:
```js
import emailjs from 'emailjs-com'
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY')
```

## Deploy to Vercel (Free)

```bash
# Option A: Via Vercel CLI
npm install -g vercel
vercel login
vercel --prod

# Option B: Via GitHub (recommended)
# 1. Push this repo to GitHub
# 2. Go to https://vercel.com/new
# 3. Import your GitHub repo
# 4. Vercel auto-detects Vite — click Deploy
# 5. Your site is live at https://satvik-portfolio.vercel.app
```

## Customizing Projects
Edit the `projects` array in `src/sections/Projects.jsx`:
- Add GitHub links when repos are ready
- Add live demo links after deployment
- Update status badges (In Progress / Completed / Ongoing)

## Customizing Gallery
Replace placeholder tiles in `src/sections/Gallery.jsx`:
```jsx
// Replace the placeholder div content with:
<img 
  src="/gallery/your-image.jpg" 
  alt="Design work description"
  className="w-full h-full object-cover"
/>
```

## Adding Resume
Drop your `resume.pdf` in the `/public/` directory.
The Resume button in Hero will automatically link to it.

## Tech Stack
- **Framework**: React 18 + Vite
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Fonts**: Syne + DM Sans + Space Mono
- **Contact**: EmailJS (no backend needed)
- **Hosting**: Vercel (free tier)
