# Pi-hsien Chen Website

A multilingual website showcasing the artistic journey of virtuoso musician and educator Pi-hsien Chen. Built with Next.js 15, featuring a timeless split-layout design with smooth animations and comprehensive internationalization support.

## Features

- **🎨 Elegant Split Layout**: Magazine-style landing page with portrait and section previews
- **🌍 Multilingual Support**: Available in English, French, and Chinese
- **✨ Smooth Animations**: Framer Motion powered page transitions
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile
- **⚡ Fast Performance**: Static site generation with Next.js
- **🔍 SEO Optimized**: Comprehensive metadata and semantic HTML
- **📝 Markdown Content**: Easy content management with Markdown files

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom typography
- **Animations**: Framer Motion
- **Content**: Markdown with gray-matter frontmatter
- **Fonts**: Inter (sans-serif) + Playfair Display (serif)
- **Icons**: Lucide React
- **Deployment**: Static export ready

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── [locale]/               # Internationalized routes
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── biography/         # Section pages
│   │   │   ├── recordings/
│   │   │   ├── masterclasses/
│   │   │   └── philanthropy/
│   │   └── layout.tsx             # Root layout
│   ├── components/
│   │   ├── AnimatedPage.tsx       # Page transition wrapper
│   │   ├── LanguageSwitcher.tsx   # Locale switching
│   │   ├── SectionCard.tsx        # Landing page section previews
│   │   ├── SectionPage.tsx        # Generic section page template
│   │   └── SplitLayout.tsx        # Main layout component
│   └── lib/
│       ├── markdown.ts            # Content loading utilities
│       └── types.ts               # TypeScript definitions
├── content/
│   ├── en/                        # English content
│   ├── fr/                        # French content
│   └── zh/                        # Chinese content
└── public/
    └── images/                    # Images and SVG placeholders
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

### Production Server

```bash
npm run start
```

## Content Management

### Adding New Content

1. Create or edit Markdown files in the appropriate language directory under `content/`
2. Include frontmatter metadata:

```markdown
---
title: "Section Title"
subtitle: "Section Subtitle"
image: "/images/section-hero.svg"
excerpt: "Brief description for the landing page preview"
---

# Your content here

Your markdown content goes here and will be rendered with full typography support.
```

### Adding New Languages

1. Add the locale to `src/lib/types.ts` in the `supportedLocales` array
2. Create a new content directory under `content/[locale]/`
3. Add translations for all four sections: biography, recordings, masterclasses, philanthropy

### Updating Images

Replace the SVG placeholders in `public/images/` with actual images:
- `portrait.svg` - Main portrait for the landing page
- `biography-hero.svg` - Biography section hero image
- `recordings-hero.svg` - Recordings section hero image
- `masterclasses-hero.svg` - Masterclasses section hero image
- `philanthropy-hero.svg` - Philanthropy section hero image

## Customization

### Typography

The website uses two fonts:
- **Playfair Display** (serif) for headings
- **Inter** (sans-serif) for body text

Font customization can be done in `src/app/layout.tsx` and `src/app/globals.css`.

### Colors and Theming

Update the color scheme in `tailwind.config.ts` and `src/app/globals.css`. The current palette uses elegant grays with custom CSS variables.

### Animations

Modify animations in:
- `src/components/AnimatedPage.tsx` - Page transitions
- `src/components/SectionCard.tsx` - Card interactions
- `src/app/globals.css` - Custom animations

## Deployment

This project is optimized for static deployment. It can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

### Static Export

```bash
npm run build
```

The built files will be in the `.next` directory, ready for deployment.

## License

© 2024 Pi-hsien Chen. All rights reserved.