import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const dmSans = localFont({ src: './fonts/dm-sans.woff2', variable: '--font-dm-sans', display: 'swap', weight: '100 1000' });
export const metadata: Metadata = {
  title: 'Ayzan Group — Connecting Businesses, Empowering Communities',
  description: 'A Nigeria-headquartered group connecting trade, travel, community impact, Islamic heritage media and education. Discover the five businesses of Ayzan Group.',
  icons: { icon: '/favicon.svg' },
  openGraph: { title: 'Ayzan Group — Opportunity, connected.', description: 'Connecting businesses. Empowering communities. Discover the five businesses of Ayzan Group.', type: 'website', locale: 'en_NG' },
  twitter: { card: 'summary', title: 'Ayzan Group', description: 'Connecting businesses. Empowering communities.' },
};
export const viewport: Viewport = { themeColor: '#101012', colorScheme: 'dark light' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={dmSans.variable}><body>{children}</body></html>;
}
