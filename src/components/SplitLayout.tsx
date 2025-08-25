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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Portrait */}
      <motion.div
        className="lg:w-1/2 lg:min-h-screen bg-gray-100 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Portrait Image */}
        <div className="relative w-full h-64 lg:h-full">
          <Image
            src="/images/portrait.svg"
            alt="Pi-hsien Chen"
            fill
            className="object-cover object-center"
            priority
          />
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

        {/* Language Switcher - positioned on portrait */}
        <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </motion.div>

      {/* Right Panel - Content */}
      <motion.div
        className="lg:w-1/2 lg:min-h-screen bg-white"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="h-full flex flex-col">
          {/* Content Area */}
          <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              {children}
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-200 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <p className="font-sans text-sm text-gray-500 text-center">
                © 2024 Pi-hsien Chen. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}