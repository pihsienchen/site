'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import { ReactNode, useRef, useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

interface CanvasLayoutProps {
  children: ReactNode;
  locale: string;
}

export default function CanvasLayout({ children, locale }: CanvasLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client-side
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run GSAP animations on client-side after hydration
    if (!isClient || typeof window === 'undefined') return;
    
    // Initialize GSAP plugins only on client-side (layout handled by CSS Grid)
    const initGSAP = async () => {
      try {
        // Dynamically import and register GSAP plugins for future use
        const { Flip } = await import('gsap/Flip');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(Flip, ScrollTrigger);

        // Layout is handled by CSS Grid - no GSAP layout manipulation needed
        
      } catch (error) {
        console.error('GSAP initialization failed:', error);
      }
    };
    
    initGSAP();
  }, [isClient]);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-hidden bg-white"
    >
      {/* Main Grid Container */}
      <div className="h-full grid grid-cols-1 lg:grid-cols-5 grid-rows-2 lg:grid-rows-1">
        
        {/* Left Panel - Portrait */}
        <div
          ref={leftPanelRef}
          className="lg:col-span-2 relative overflow-hidden bg-white"
        >
          {/* Portrait Image */}
          <div className="relative w-full h-full p-4 lg:p-6">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src="/images/pi-hsien.jpg"
                alt="Pi-hsien Chen"
                fill
                className="object-contain object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Autogram Overlay */}
          <div className="absolute bottom-0 left-0 right-0 pb-4 lg:pb-8">
            <div className="flex justify-center px-4">
              <Image
                src={locale === 'zh' || locale === 'zh-TW' ? 
                  "/images/pi-hsien-autogram-zh-placeholder.png" : 
                  "/images/pi-hsien-autogram-en-placeholder.png"
                }
                alt="Pi-hsien Chen autogram"
                width={300}
                height={150}
                className="max-w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Interactive Text Boxes */}
        <div
          ref={rightPanelRef}
          className="lg:col-span-3 relative bg-white overflow-hidden"
        >
          {/* Language Switcher */}
          <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20">
            <LanguageSwitcher currentLocale={locale} />
          </div>
          
          {/* Text Boxes Container */}
          <div className="h-full p-4 lg:p-8">
            {children}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
            <p className="font-sans text-xs lg:text-sm text-gray-500 text-center">
              © 2025 Pi-hsien Chen. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}