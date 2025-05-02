import type { Metadata } from 'next';
import { Inter, Lora, Sour_Gummy } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/app/components/common/Navbar';
import { Footer } from '@/app/components/common/Footer';

const sourGummy = Sour_Gummy({
  subsets: ['latin'],
  variable: '--font-sour-gummy',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  title:
    'Aydiiafrica - Advocacy for youth women and girls development impact initiative for Africa (AYDii Africa)',
  description:
    'A non-governmental organization dedication to the synergy of organizations, communities, and relevant stakeholders to create innovative, impactful, and sustainable solutions in promoting climate action, addressing critical socio-economic challenges and ensuring peace justice and strong institution.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourGummy.variable} ${lora.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
