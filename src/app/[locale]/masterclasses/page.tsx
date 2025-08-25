import SectionPage from '@/components/SectionPage';

interface MasterclassesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function MasterclassesPage({ params }: MasterclassesPageProps) {
  const { locale } = await params;
  
  return <SectionPage locale={locale} slug="masterclasses" />;
}