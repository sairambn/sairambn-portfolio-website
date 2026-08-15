import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Sairam BN — Software Engineer · DSA · Python · Java',
  description:
    'Software engineer, M.E. from CEG Anna University \'25. Daily DSA (NeetCode 250). Ships systems people use. Open to SDE roles in Bangalore, Hyderabad, or remote.',
  metadataBase: new URL('https://bnsairam.vercel.app'),
  openGraph: {
    title: 'Sairam BN — Software Engineer',
    description:
      'I write code that works, practice DSA every day, and ship systems people actually use.',
    url: 'https://bnsairam.vercel.app',
    siteName: 'Sairam BN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sairam BN — Software Engineer',
    description:
      'I write code that works, practice DSA every day, and ship systems people actually use.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-canvas text-paper">{children}</body>
    </html>
  );
}
