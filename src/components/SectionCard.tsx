'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { ContentMetadata } from '@/lib/types';

interface SectionCardProps {
  metadata: ContentMetadata;
  slug: string;
  locale: string;
}

export default function SectionCard({ metadata, slug, locale }: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="group border-b border-gray-200 pb-8 mb-8 last:border-b-0 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
        {metadata.title}
      </h2>

      {/* Subtitle */}
      <p className="font-sans text-lg text-gray-600 mb-4 italic">
        {metadata.subtitle}
      </p>

      {/* Short excerpt - always visible */}
      <p className="font-sans text-gray-700 mb-4 leading-relaxed">
        {metadata.excerpt}
      </p>

      {/* Expandable content preview */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="font-sans text-gray-600 leading-relaxed">
                This section contains comprehensive information about {metadata.title.toLowerCase()}, 
                showcasing the depth and breadth of Pi-hsien Chen&apos;s artistic journey. 
                Explore detailed insights, stories, and perspectives that define this important aspect 
                of the musical career.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="font-sans text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 self-start"
        >
          {isExpanded ? '← Less' : 'Read More →'}
        </button>

        <Link
          href={`/${locale}/${slug}`}
          className="group/link inline-flex items-center font-sans text-sm bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 self-start"
        >
          <span>Enter Section</span>
          <motion.span
            className="ml-2"
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}