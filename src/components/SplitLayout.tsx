'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

interface SplitLayoutProps {
  children: ReactNode;
  locale: string;
}

export default function SplitLayout({ children, locale }: SplitLayoutProps) {
  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Panel - Portrait */}
      <motion.div
        className="lg:flex-shrink-0 lg:h-screen bg-white relative overflow-hidden"
        style={{ aspectRatio: 'auto' }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Portrait Image */}
        <div className="relative w-full h-64 lg:h-full lg:py-4 p-4">
          <div className="relative w-full h-full border-4 border-white rounded-lg overflow-hidden">
            <Image
              src="/images/pi-hsien.jpg"
              alt="Pi-hsien Chen"
              width={400}
              height={600}
              className="w-full h-full object-cover object-center"
              priority
              style={{ aspectRatio: '2/3' }}
            />
          </div>
        </div>

        {/* Overlay with name */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 lg:p-8">
          <motion.h1
            className="font-serif text-3xl lg:text-5xl text-white font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Pi-hsien Chen
          </motion.h1>
          <motion.p
            className="font-sans text-lg lg:text-xl text-gray-200 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Virtuoso Musician & Educator
          </motion.p>
        </div>

      </motion.div>

      {/* Right Panel - Content */}
      <motion.div
        className="flex-1 lg:h-screen bg-white relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        {/* Language Switcher - positioned on top right of entire screen */}
        <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10">
          <LanguageSwitcher currentLocale={locale} />
        </div>
        
        <div className="h-full flex flex-col">
          {/* Content Area */}
          <div className="flex-1 p-6 lg:p-12 overflow-hidden">
            <div className="max-w-2xl mx-auto h-full overflow-hidden">
              {children}
            </div>
          </div>

          {/* Footer */}
          <footer className="p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <p className="font-sans text-sm text-gray-500 text-center">
                © 2025 Pi-hsien Chen. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}