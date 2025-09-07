import { getAllSectionData, isValidLocale } from '@/lib/markdown';
import CanvasLayout from '@/components/CanvasLayout';
import MovableTextBox from '@/components/MovableTextBox';
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
    <CanvasLayout locale={locale}>
      {/* Single Column Text Boxes Grid */}
      <div className="h-full w-full grid grid-cols-1 gap-4 lg:gap-6 content-center pb-16 lg:pb-20">
        {sections.map((section, index) => (
          <MovableTextBox
            key={section.slug}
            metadata={section.metadata}
            slug={section.slug}
            locale={locale}
            index={index}
          />
        ))}
      </div>
    </CanvasLayout>
  );
}