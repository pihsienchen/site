import { getContentData, isValidLocale } from '@/lib/markdown';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimatedPage from '@/components/AnimatedPage';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft } from 'lucide-react';

interface SectionPageProps {
  locale: string;
  slug: string;
}

export default async function SectionPage({ locale, slug }: SectionPageProps) {
  if (!isValidLocale(locale)) {
    notFound();
  }

  const contentData = await getContentData(locale, slug);
  
  if (!contentData) {
    notFound();
  }

  const { metadata, content } = contentData;

  return (
    <AnimatedPage direction="right">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="relative">
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

            {/* Title */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light mb-2">
                {metadata.title}
              </h1>
              <p className="font-sans text-lg md:text-xl text-gray-200">
                {metadata.subtitle}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-12 lg:px-8">
          <article 
            className="prose prose-lg lg:prose-xl prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50">
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
                © 2024 Pi-hsien Chen. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedPage>
  );
}