import SectionPage from '@/components/SectionPage';

interface RecordingsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function RecordingsPage({ params }: RecordingsPageProps) {
  const { locale } = await params;
  
  return <SectionPage locale={locale} slug="recordings" />;
}