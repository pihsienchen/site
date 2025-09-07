'use client';

import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { useCanvasStore } from '@/store/canvasStore';
import type { ContentMetadata } from '@/lib/types';

interface MovableTextBoxProps {
  metadata: ContentMetadata;
  slug: string;
  locale: string;
  index: number;
}

export default function MovableTextBox({ 
  metadata, 
  slug, 
  locale, 
  index 
}: MovableTextBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const router = useRouter();
  const { setTransitioning, setActiveSection, setFlipState, setMode } = useCanvasStore();

  useEffect(() => {
    // Ensure we're on the client-side
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run GSAP animations on client-side after hydration
    if (!isClient || typeof window === 'undefined') return;
    
    // Initialize GSAP animations only on client-side
    const initGSAP = async (): Promise<(() => void) | undefined> => {
      try {
        // Dynamically import and register GSAP plugins
        const { Flip } = await import('gsap/Flip');
        gsap.registerPlugin(Flip);

        const box = boxRef.current;
        if (!box) return undefined;

        // Set initial state with hardware acceleration and final position
        gsap.set(box, {
          willChange: 'transform',
          transformOrigin: 'center center',
          opacity: 1,
          y: 0,
          scale: 1,
        });

        // Hover animations removed per user request

        // Enhanced click handler with GSAP Flip state capture
        const handleClick = async (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          
          if (!titleRef.current) return;
          
          try {
            setIsActive(true);
            setTransitioning(true);
            setActiveSection(slug);
            
            // Import and register GSAP Flip
            const { Flip } = await import('gsap/Flip');
            gsap.registerPlugin(Flip);
            
            // Capture the current DOM state of the title element
            const state = Flip.getState(titleRef.current, {
              props: 'transform, opacity, x, y, scale',
              simple: true
            });
            
            // Store the captured state in our store
            setFlipState(state);
            
            // Brief click feedback animation
            gsap.to(box, {
              scale: 0.98,
              duration: 0.1,
              ease: 'power2.inOut',
              yoyo: true,
              repeat: 1,
              onComplete: () => {
                // Navigate to section page after click animation
                setMode('section');
                router.push(`/${locale}/${slug}`);
              }
            });
            
          } catch (error) {
            console.error('Click transition failed:', error);
            setTransitioning(false);
            setIsActive(false);
            // Fallback to normal navigation
            router.push(`/${locale}/${slug}`);
          }
        };

        // Add event listeners
        box.addEventListener('click', handleClick);

        // Cleanup
        return () => {
          box.removeEventListener('click', handleClick);
        };
      } catch (error) {
        console.error('GSAP animation initialization failed:', error);
        return undefined;
      }
    };
    
    initGSAP();
  }, [index, isClient]);


  return (
    <div
      ref={boxRef}
      className={`
        relative p-6 lg:p-8 rounded-lg cursor-pointer
        ${isActive ? 'ring-2 ring-gray-300' : ''}
        // Layout preserved for development - borders and background made transparent
        border-2 border-transparent bg-transparent
        hover:border-transparent
      `}
    >
      {/* Title - Now with ref for GSAP Flip */}
      <h2 
        ref={titleRef}
        className="font-serif text-lg lg:text-xl font-bold text-black mb-3 cursor-pointer hover:text-black"
      >
        {metadata.title}
      </h2>

      {/* Excerpt */}
      <p className="font-sans text-sm lg:text-base text-black mb-6 leading-relaxed line-clamp-4">
        {metadata.excerpt}
      </p>

    </div>
  );
}