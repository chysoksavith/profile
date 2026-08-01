import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { profile, site, telHref } from '@/lib/data';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: site.title,
  description: site.description,
  authors: [{ name: profile.name }],
  openGraph: {
    type: 'website',
    title: site.title,
    description: site.description,
    // Relative image URLs need `metadataBase`, so only emit them once
    // `site.url` is filled in.
    ...(site.url
      ? {
          url: site.url,
          ...(profile.avatar ? { images: [{ url: profile.avatar }] } : {}),
        }
      : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-canvas text-ink font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
