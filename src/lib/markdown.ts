import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { ContentMetadata, ContentData } from './types';

// Ensure this module is only used server-side
if (typeof window !== 'undefined') {
  throw new Error('This module can only be used server-side');
}

const contentDirectory = path.join(process.cwd(), 'content');

// Configure marked for better HTML output
marked.setOptions({
  gfm: true,
  breaks: false,
});

export async function getContentData(
  locale: string,
  slug: string
): Promise<ContentData | null> {
  try {
    const filePath = path.join(contentDirectory, locale, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const htmlContent = await marked(content);

    return {
      metadata: data as ContentMetadata,
      content: htmlContent,
      slug,
    };
  } catch (error) {
    console.error(`Error loading content for ${locale}/${slug}:`, error);
    return null;
  }
}

export async function getAllContentSlugs(locale: string): Promise<string[]> {
  try {
    const localeDir = path.join(contentDirectory, locale);
    
    if (!fs.existsSync(localeDir)) {
      return [];
    }

    const files = fs.readdirSync(localeDir);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace('.md', ''));
  } catch (error) {
    console.error(`Error getting content slugs for ${locale}:`, error);
    return [];
  }
}

export async function getAllSectionData(locale: string): Promise<ContentData[]> {
  const sections = ['biography', 'recordings', 'masterclasses', 'philanthropy'];
  const sectionData: ContentData[] = [];

  for (const section of sections) {
    const data = await getContentData(locale, section);
    if (data) {
      sectionData.push(data);
    }
  }

  return sectionData;
}

// Re-export types and utilities for server-side use
export { supportedLocales, isValidLocale } from './types';
export type { SupportedLocale, ContentMetadata, ContentData } from './types';