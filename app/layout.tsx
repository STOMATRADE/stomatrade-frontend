import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Stomatrade',
  description: 'Web3 landing and dashboard experience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-gray-50 antialiased">
        <Providers>
          <Header />
          <main className="px-6 pb-16 pt-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
