'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Footer from '../../components/common/Footer';
import { ROUTES } from '@/core/constant/route';

type AdminLayoutProps = {
    children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const navItems = useMemo(
        () => [
            { href: ROUTES.admin.dashboard, label: 'Dashboard' },
            { href: ROUTES.admin.project, label: 'Project' },
            { href: ROUTES.admin.farmer, label: 'Farmer' },
            { href: ROUTES.admin.user, label: 'User' },
        ],
        []
    );

    const getNavClassName = (href: string) =>
        pathname === href
            ? 'rounded-xl px-4 py-3 text-sm font-semibold text-text-primary bg-primary-container hover:bg-primary-accent transition-colors'
            : 'rounded-xl px-4 py-3 text-sm font-semibold text-text-secondary hover:bg-primary-container transition-colors';

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <div className="w-full min-h-screen bg-[#0e0e0e] relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/img_unchained_5_1080x1080.png"
                    alt=""
                    className="absolute top-[60px] sm:top-[80px] md:top-[121px] right-0 w-[240px] sm:w-[320px] md:w-[478px] h-[360px] sm:h-[480px] md:h-[720px] opacity-30"
                />
                <img
                    src="/images/img_unchained_5_1080x1080_778x364.png"
                    alt=""
                    className="absolute top-[60px] sm:top-[80px] md:top-[121px] left-0 w-[182px] sm:w-[273px] md:w-[364px] h-[389px] sm:h-[584px] md:h-[778px] opacity-20"
                />
            </div>

            <div className="relative z-10 flex min-h-screen">
                <div
                    className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setMobileMenuOpen(false)}
                />
                <aside
                    className={`fixed top-4 left-4 bottom-4 w-[260px] rounded-3xl border border-[#dedede10] bg-primary-elevated/90 backdrop-blur-md p-6 shadow-2xl flex flex-col gap-6 z-40 lg:hidden transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-[120%]'}`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/favicon.svg"
                                alt="Stomatrade Logo"
                                className="w-7 h-7"
                            />
                            <div>
                                <p className="text-lg font-semibold text-accent-green">Stomatrade</p>
                                <p className="text-xs text-text-placeholder">Admin Console</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                            aria-label="Close admin menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <a key={item.href} href={item.href} className={getNavClassName(item.href)}>
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="mt-auto bg-primary-container rounded-2xl p-4">
                        <p className="text-xs text-text-placeholder mb-2">Status</p>
                        <p className="text-sm text-text-primary">All systems operational</p>
                    </div>
                </aside>

                <aside className="hidden lg:block w-[320px] shrink-0">
                    <div className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-[280px] rounded-3xl border border-[#dedede10] bg-primary-elevated/80 backdrop-blur-md p-6 shadow-2xl flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/favicon.svg"
                                alt="Stomatrade Logo"
                                className="w-7 h-7"
                            />
                        <div>
                            <p className="text-lg font-semibold text-accent-green">Stomatrade</p>
                            <p className="text-xs text-text-placeholder">Admin Console</p>
                        </div>
                        </div>

                        <nav className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <a key={item.href} href={item.href} className={getNavClassName(item.href)}>
                                {item.label}
                            </a>
                        ))}
                    </nav>

                        <div className="mt-auto bg-primary-container rounded-2xl p-4">
                            <p className="text-xs text-text-placeholder mb-2">Status</p>
                            <p className="text-sm text-text-primary">All systems operational</p>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 flex flex-col">
                    <div className="fixed top-4 left-0 right-0 z-20 lg:left-[320px]">
                        <header className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl border border-[#dedede10] bg-primary-elevated/60 backdrop-blur-md py-4 shadow-2xl">
                            <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center gap-3">
                                    <button
                                        className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
                                        aria-label="Open admin menu"
                                        onClick={() => setMobileMenuOpen(true)}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                    <p className="text-sm text-text-placeholder">Admin</p>
                                    <p className="text-lg font-semibold text-text-primary">Control Center</p>
                                </div>
                                <div className="flex items-center gap-3 bg-primary-container px-4 py-2 rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center text-accent-green text-sm font-semibold">
                                        SA
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-text-primary font-semibold">Super Admin</p>
                                        <p className="text-text-placeholder text-xs">admin@stomatrade</p>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>

                    <div className="flex-1 px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28">
                        {children}
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    );
}
