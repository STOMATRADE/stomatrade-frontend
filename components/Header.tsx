'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/sign-in', label: 'Sign in' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const visibleLinks = pathname === '/' ? links.filter((l) => l.href !== '/dashboard') : links;

  return (
    <header className="sticky top-0 z-30 border-b border-[#1f1f1f] bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondaryBg shadow-glow ring-1 ring-[#1f1f1f]">
            <span className="text-xl font-black text-primary">S</span>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Stomatrade</p>
            <p className="text-lg font-bold text-white">Web3 Nature</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'rounded-full px-4 py-2 text-sm font-semibold transition hover:text-primary',
                pathname === link.href ? 'bg-secondaryBg text-primary ring-1 ring-[#1f1f1f]' : 'text-gray-300',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {mounted ? (
            <ConnectButton chainStatus="icon" accountStatus="address" showBalance={false} />
          ) : (
            <div className="h-10 w-32 rounded-full bg-secondaryBg" />
          )}
        </div>
      </div>
    </header>
  );
}
