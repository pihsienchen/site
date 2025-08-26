'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ContentMetadata } from '@/lib/types';

interface SectionCardProps {
  metadata: ContentMetadata;
  slug: string;
  locale: string;
}

export default function SectionCard({ metadata, slug, locale }: SectionCardProps) {
  return (
    <motion.div
      className="group pb-8 mb-8 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <Link href={`/${locale}/${slug}`}>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300 cursor-pointer hover:underline">
          {metadata.title}
        </h2>
      </Link>

      {/* Merged description */}
      <p className="font-sans text-gray-700 mb-4 leading-relaxed">
        {metadata.excerpt} This section contains comprehensive information about {metadata.title.toLowerCase()}, 
        showcasing the depth and breadth of Pi-hsien Chen&apos;s artistic journey. 
        Explore detailed insights, stories, and perspectives that define this important aspect 
        of the musical career.
      </p>

      {/* Enter Section button */}
      <Link
        href={`/${locale}/${slug}`}
        className="font-sans text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        Enter Section →
      </Link>
    </motion.div>
  );
}