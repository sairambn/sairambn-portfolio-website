import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, DM_Sans, JetBrains_Mono, Allura } from 'next/font/google';
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

const script = Allura({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
  weight: '400',
});

const siteUrl = 'https://bnsairam.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'Sairam BN — Software Engineer · DSA · Python · Java',
    template: '%s · Sairam BN',
  },
  description:
    "Software engineer, M.E. from CEG Anna University '25. Daily DSA (NeetCode 250). Ships systems people use. Open to SDE roles in Bangalore, Hyderabad, or remote.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sairam BN — Software Engineer',
    description:
      'I write code that works, practice DSA every day, and ship systems people actually use.',
    url: siteUrl,
    siteName: 'Sairam BN',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/content.png',
        width: 1551,
        height: 798,
        alt: 'Sairam Nagarajan at College of Engineering Guindy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sairam BN — Software Engineer',
    description:
      'I write code that works, practice DSA every day, and ship systems people actually use.',
    images: ['/content.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sairam Nagarajan',
  alternateName: 'Sairam BN',
  url: siteUrl,
  email: 'bnsairam14@gmail.com',
  jobTitle: 'Software Engineer',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'College of Engineering Guindy, Anna University',
  },
  sameAs: [
    'https://github.com/sairambn',
    'https://www.linkedin.com/in/sairambn/',
    'https://leetcode.com/u/sairambn/',
  ],
  knowsAbout: [
    'Data Structures',
    'Algorithms',
    'Python',
    'Java',
    'TypeScript',
    'Software Engineering',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${script.variable}`}
    >
      <body className="min-h-screen bg-canvas text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#intro"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-3 focus:py-2 focus:text-canvas"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
