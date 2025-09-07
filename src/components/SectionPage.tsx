import { getContentData, isValidLocale } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import FlipAnimatedSectionPage from '@/components/FlipAnimatedSectionPage';

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

  // Check if we should use GSAP Flip animation (coming from homepage transition)
  return (
    <FlipAnimatedSectionPage
      locale={locale}
      slug={slug}
      metadata={metadata}
      content={content}
    />
  );
}