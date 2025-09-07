import { isValidLocale, supportedLocales } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import TransitionManager from '@/components/TransitionManager';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({
    locale: locale,
  }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <TransitionManager>
          {children}
        </TransitionManager>
      </body>
    </html>
  );
}