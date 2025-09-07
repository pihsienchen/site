'use client';

import { gsap } from 'gsap';
import { useEffect } from 'react';

export interface TransitionManagerProps {
  children: React.ReactNode;
}

export default function TransitionManager({ children }: TransitionManagerProps) {

  // Initialize GSAP Flip plugin
  useEffect(() => {
    const initFlip = async () => {
      try {
        const { Flip } = await import('gsap/Flip');
        gsap.registerPlugin(Flip);
      } catch (error) {
        console.error('Failed to initialize GSAP Flip:', error);
      }
    };
    
    initFlip();
  }, []);


  // Expose transition functions to child components via context or ref
  return (
    <div data-transition-manager>
      {children}
    </div>
  );
}
