import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Pi-hsien Chen | Virtuoso Musician & Educator",
  description: "Discover the artistic journey of Pi-hsien Chen, a virtuosic musician whose passion for performance and teaching has touched audiences worldwide.",
  keywords: ["Pi-hsien Chen", "Classical Music", "Virtuoso", "Musician", "Educator", "Masterclasses"],
  authors: [{ name: "Pi-hsien Chen" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}