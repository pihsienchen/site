'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useCanvasStore } from '@/store/canvasStore';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft } from 'lucide-react';
import type { ContentMetadata } from '@/lib/types';

interface FlipAnimatedSectionPageProps {
  locale: string;
  slug: string;
  metadata: ContentMetadata;
  content: string;
}

export default function FlipAnimatedSectionPage({ 
  locale, 
  slug, 
  metadata, 
  content 
}: FlipAnimatedSectionPageProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  
  const { 
    flipState, 
    isTransitioning, 
    sectionAnimationConfig, 
    setTransitioning, 
    setMode, 
    clearFlipState 
  } = useCanvasStore();

  // Execute GSAP Flip animation on component mount
  useEffect(() => {
    if (!flipState || !isTransitioning || !titleRef.current) return;

    const executeFlipAnimation = async () => {
      try {
        const { Flip } = await import('gsap/Flip');
        gsap.registerPlugin(Flip);
        
        const config = sectionAnimationConfig[slug];
        if (!config) {
          console.warn(`No animation config found for section: ${slug}`);
          setTransitioning(false);
          clearFlipState();
          return;
        }

        // Create master timeline
        const tl = gsap.timeline({
          onComplete: () => {
            setTransitioning(false);
            setMode('section');
            clearFlipState();
          }
        });

        // Set initial positions for title based on section-specific config
        const titleElement = titleRef.current;
        let finalTitlePosition = {};

        switch (config.titlePosition) {
          case 'top-left':
            finalTitlePosition = {
              x: 0,
              y: 0,
              scale: 1,
              transformOrigin: 'left top'
            };
            break;
          case 'center':
            finalTitlePosition = {
              x: '50%',
              xPercent: -50,
              y: 0,
              scale: 1,
              transformOrigin: 'center top'
            };
            break;
          case 'left':
            finalTitlePosition = {
              x: 0,
              y: 0,
              scale: 1,
              transformOrigin: 'left top'
            };
            break;
          case 'in-place':
          default:
            finalTitlePosition = {
              x: 0,
              y: 0,
              scale: 1,
              transformOrigin: 'center'
            };
            break;
        }

        // Start with the content hidden
        if (contentRef.current) {
          gsap.set(contentRef.current, {
            opacity: 0,
            y: 20
          });
        }

        // Animate from captured flip state to final position
        tl.add(
          Flip.from(flipState, {
            targets: titleElement,
            duration: config.animationDuration,
            ease: 'power2.inOut',
            ...finalTitlePosition,
            onComplete: () => {
              // Reset any inline styles that might interfere
              gsap.set(titleElement, { clearProps: 'all' });
            }
          })
        );

        // Reveal content with stagger after title animation
        const contentElements = [headerRef.current, contentRef.current].filter(Boolean);
        if (contentElements.length > 0) {
          tl.to(contentElements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          }, '-=0.2');
        }

        // Add any section-specific content reveals
        const revealElements = document.querySelectorAll('[data-content-reveal]');
        if (revealElements.length > 0) {
          tl.fromTo(revealElements, 
            { 
              opacity: 0, 
              y: 20 
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: 'power2.out'
            },
            '-=0.1'
          );
        }

      } catch (error) {
        console.error('GSAP Flip animation failed:', error);
        setTransitioning(false);
        clearFlipState();
      }
    };

    executeFlipAnimation();
  }, [flipState, isTransitioning, slug, sectionAnimationConfig, setTransitioning, setMode, clearFlipState]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Initially hidden if transitioning */}
      <header 
        ref={headerRef}
        className="relative"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <Image
            src={metadata.image.replace('.jpg', '.svg')}
            alt={metadata.title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Navigation */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-sans hover:bg-black/30 transition-all duration-200"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Title - This is the target for GSAP Flip animation */}
          <div className="absolute bottom-6 left-6 right-6">
            <h1 
              ref={titleRef}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light mb-2"
              data-flip-target="title"
            >
              {metadata.title}
            </h1>
            <p 
              className="font-sans text-lg md:text-xl text-gray-200"
              data-content-reveal
            >
              {metadata.subtitle}
            </p>
          </div>
        </div>
      </header>

      {/* Content - Initially hidden if transitioning */}
      <main 
        ref={contentRef}
        className="max-w-4xl mx-auto px-6 py-12 lg:px-8"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        <article 
          className="prose prose-lg lg:prose-xl prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
          data-content-reveal
        />
      </main>

      {/* Footer */}
      <footer 
        className="border-t border-gray-200 bg-gray-50"
        data-content-reveal
      >
        <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 font-sans text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              Return to Main Page
            </Link>
            
            <p className="font-sans text-sm text-gray-500">
              © 2025 Pi-hsien Chen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}