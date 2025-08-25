import SectionPage from '@/components/SectionPage';

interface PhilanthropyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PhilanthropyPage({ params }: PhilanthropyPageProps) {
  const { locale } = await params;
  
  return <SectionPage locale={locale} slug="philanthropy" />;
}