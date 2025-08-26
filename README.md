# Pi-hsien Chen Interactive Archive

A multilingual interactive website for musician Pi-hsien Chen built with Next.js 15 App Router. The site acts as a visual archive and library, featuring canvas-like interactions where sections transform dynamically when clicked.

## Features

- **Interactive Canvas**: Full-screen canvas with dynamic section transitions
- **Multilingual Support**: Available in English, French, and Chinese
- **Advanced Animations**: Framer Motion powered section transitions and micro-interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Fast Performance**: Static site generation with Next.js
- **SEO Optimized**: Comprehensive metadata and semantic HTML
- **Enhanced Content**: Markdown with extended frontmatter for interactive features
- **State Management**: Zustand for canvas transition orchestration
- **Rich Media**: Swiper.js powered slideshows and interactive timelines

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom typography
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Content**: Markdown with gray-matter frontmatter
- **Media**: Swiper.js for slideshows
- **Fonts**: Inter (sans-serif) + Playfair Display (serif)
- **Icons**: Lucide React
- **Deployment**: Static export ready

## Interactive Canvas Architecture

### Vision & Interaction Design
- **Canvas-like behavior**: Landing page acts as a single interactive canvas
- **Section transitions**: Clicking a section fades other content while moving the selected section to specific positions
- **Smooth animations**: Each section has unique transition patterns (horizontal movement, fade effects)
- **Deep-dive capability**: From interactive views, users can access traditional markdown-style detailed pages

### Section-Specific Behaviors
- **Biography**: Title moves to top-left horizontally, reveals interactive timeline
- **Recordings**: Title moves to center horizontally, reveals clickable tile grid
- **Masterclasses**: Title moves left horizontally, reveals composer tile grid on right
- **Philanthropy**: Stays in position, reveals slideshow in freed top area

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── [locale]/              # Internationalized routes
│   │   │   ├── page.tsx           # Interactive canvas landing page
│   │   │   ├── biography/         # Section pages
│   │   │   ├── recordings/
│   │   │   ├── masterclasses/
│   │   │   └── philanthropy/
│   │   └── layout.tsx             # Root layout
│   ├── components/
│   │   ├── CanvasLayout.tsx       # Full-screen interactive canvas container
│   │   ├── TransitionManager.tsx  # Animation orchestration for section transitions
│   │   ├── InteractiveTimeline.tsx # Biography section timeline with date-event mapping
│   │   ├── TileGrid.tsx           # Square tile system for recordings and masterclasses
│   │   ├── RecordingTile.tsx      # Specialized tile for recording entries
│   │   ├── ComposerTile.tsx       # Specialized tile for composer entries
│   │   ├── SlideshowComponent.tsx # Philanthropy slideshow using Swiper
│   │   ├── AnimatedPage.tsx       # Page transition wrapper
│   │   ├── LanguageSwitcher.tsx   # Locale switching
│   │   ├── SectionCard.tsx        # Landing page section previews (legacy)
│   │   ├── SectionPage.tsx        # Generic section page template
│   │   └── SplitLayout.tsx        # Legacy layout for traditional page views
│   ├── stores/
│   │   └── canvasStore.ts         # Zustand state store for canvas transitions
│   └── lib/
│       ├── markdown.ts            # Content loading utilities with enhanced frontmatter
│       └── types.ts               # TypeScript definitions including interactive content types
├── content/
│   ├── en/                        # English content with enhanced frontmatter
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

## Enhanced Content Structure

### Basic Section Content
Each section requires markdown files in all supported locales with this frontmatter:
```yaml
title: "Section Title"
subtitle: "Section Subtitle" 
image: "/images/section-hero.svg"
excerpt: "Preview text for landing page"
```

### Extended Content Types for Interactive Features

#### Biography Timeline Data
```yaml
timeline:
  - date: "1990"
    title: "Early Studies"
    description: "Began piano studies in Taiwan"
  - date: "1999" 
    title: "European Journey"
    description: "Moved to Germany for advanced studies"
```

#### Recording Tiles Data  
```yaml
recordings:
  - id: "recording-1"
    title: "Chopin Nocturnes"
    image: "/images/recordings/chopin.png"
    year: "2020"
    description: "Complete Chopin Nocturnes recording"
```

#### Masterclass Composer Data
```yaml
composers:
  - id: "chopin"
    name: "Frédéric Chopin" 
    image: "/images/composers/chopin.png"
    specialty: "Romantic Piano Works"
    description: "Master of poetic piano expression"
```

#### Philanthropy Slideshow Data
```yaml
slideshow:
  - image: "/images/philanthropy/slide1.jpg"
    caption: "Music education program in rural Taiwan"
  - image: "/images/philanthropy/slide2.jpg" 
    caption: "Scholarship fund establishment ceremony"
```

### Content Management

1. Create or edit Markdown files in the appropriate language directory under `content/`
2. Include both basic frontmatter and section-specific enhanced data
3. Content will automatically appear in the interactive canvas when added to frontmatter

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

© 2025 Pi-hsien Chen. All rights reserved.