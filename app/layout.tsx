import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { profile, site, telHref } from '@/lib/data';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url || 'http://localhost:3000'),
  title: site.title,
  description: site.description,
  authors: [{ name: profile.name }],
  icons: {
    icon: '/favicon-light.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    title: site.title,
    description: site.description,
    images: [{ url: '/logolight.jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/logolight.jpeg'],
  },
};

/** Matches --canvas so mobile browser chrome blends with the page. */
export const viewport: Viewport = {
  themeColor: '#0b0b0c',
};

/** Structured data so search engines can read the profile. */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  telephone: telHref.replace('tel:', ''),
  address: { '@type': 'PostalAddress', addressLocality: profile.location },
  sameAs: [profile.github].filter(Boolean),
  ...(site.url ? { url: site.url } : {}),
  ...(profile.avatar
    ? {
        image: site.url
          ? new URL(profile.avatar, site.url).toString()
          : profile.avatar,
      }
    : {}),
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-canvas text-ink font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
