'use client';

import Link from 'next/link';
import type { ContentMetadata } from '@/lib/types';

interface SectionCardProps {
  metadata: ContentMetadata;
  slug: string;
  locale: string;
}

export default function SectionCard({ metadata, slug, locale }: SectionCardProps) {
  return (
    <div
      className="group pb-12 mb-12 last:mb-0 max-w-2xl"
    >
      {/* Title */}
      <Link href={`/${locale}/${slug}`}>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300 cursor-pointer hover:underline">
          {metadata.title}
        </h2>
      </Link>

      {/* Merged description */}
      <p className="font-sans text-gray-700 mb-6 leading-relaxed">
        {metadata.excerpt}
      </p>

      {/* Enter Section button */}
      <Link
        href={`/${locale}/${slug}`}
        className="font-sans text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        Enter Section →
      </Link>
    </div>
  );
}