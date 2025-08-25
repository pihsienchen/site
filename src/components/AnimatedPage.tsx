'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedPageProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  className?: string;
}

const pageVariants = {
  initial: (direction: string) => ({
    x: direction === 'left' ? '-100vw' : '100vw',
    opacity: 0,
  }),
  in: {
    x: 0,
    opacity: 1,
  },
  out: (direction: string) => ({
    x: direction === 'left' ? '100vw' : '-100vw',
    opacity: 0,
  }),
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.8,
};

export default function AnimatedPage({ 
  children, 
  direction = 'right', 
  className = '' 
}: AnimatedPageProps) {
  return (
    <motion.div
      className={`min-h-screen ${className}`}
      custom={direction}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}