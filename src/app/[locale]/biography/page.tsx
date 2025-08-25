import SectionPage from '@/components/SectionPage';

interface BiographyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BiographyPage({ params }: BiographyPageProps) {
  const { locale } = await params;
  
  return <SectionPage locale={locale} slug="biography" />;
}