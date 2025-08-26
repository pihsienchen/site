import { getAllSectionData, isValidLocale } from '@/lib/markdown';
import SplitLayout from '@/components/SplitLayout';
import SectionCard from '@/components/SectionCard';
import { notFound } from 'next/navigation';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    notFound();
  }

  const sections = await getAllSectionData(locale);

  return (
    <SplitLayout locale={locale}>
      <div className="py-8">
        {sections.map((section) => (
          <SectionCard
            key={section.slug}
            metadata={section.metadata}
            slug={section.slug}
            locale={locale}
          />
        ))}
      </div>
    </SplitLayout>
  );
}