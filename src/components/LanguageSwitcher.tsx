'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { supportedLocales, type SupportedLocale } from '@/lib/types';

interface LanguageSwitcherProps {
  currentLocale: string;
}

const localeLabels: Record<SupportedLocale, string> = {
  en: 'English',
  fr: 'Français',
  zh: '中文',
};

const localeShort: Record<SupportedLocale, string> = {
  en: 'EN',
  fr: 'FR',
  zh: '中文',
};

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: SupportedLocale) => {
    // Extract the path without the locale
    const pathWithoutLocale = pathname.split('/').slice(2).join('/');
    const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-sans hover:bg-black/30 transition-all duration-200 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>{localeShort[currentLocale as SupportedLocale] || 'EN'}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ↓
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[140px] z-50"
          >
            {supportedLocales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={`w-full text-left px-4 py-3 text-sm font-sans transition-colors duration-200 ${
                  locale === currentLocale
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{localeLabels[locale]}</span>
                  <span className="text-xs text-gray-400">
                    {localeShort[locale]}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}