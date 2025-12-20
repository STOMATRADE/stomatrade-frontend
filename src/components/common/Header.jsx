'use client';

import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Prevent body scroll when drawer is open
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
        <>
            <header className="fixed top-0 left-0 right-0 w-full z-50 px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5">
                <div className="shadow-[0px_4px_32px_#888888ff] bg-bg-header-background/70 backdrop-blur-md rounded-full p-4 md:p-5 lg:p-6 w-full max-w-[1200px] mx-auto">
                    <div className="flex justify-between items-center">

                        {/* Logo Section */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <img
                                src="/images/img_frame_1321318977.png"
                                alt="Stomatrade Logo"
                                className="w-[20px] h-[20px] md:w-[26px] md:h-[26px]"
                            />
                            <div className="flex flex-col items-start">
                                <h1
                                    className="text-[14px] sm:text-[17px] md:text-[21px] font-semibold leading-[12px] sm:leading-[14px] md:leading-[16px] text-green-500 font-['Aloevera-SemiBold']"
                                    style={{ textShadow: '0px 0px 1px #22c55e' }}
                                >
                                    Stomatrade
                                </h1>
                                <p className="text-[4px] sm:text-[5px] md:text-micro font-medium leading-xs text-green-500 font-['Aloevera-Medium']">
                                    ENABLING TRUST - EMPOWERING PEOPLE
                                </p>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="block lg:hidden p-3 text-green-500 relative z-[60]"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <div className="w-6 h-6 flex flex-col justify-center items-center">
                                <span className={`block w-6 h-0.5 bg-green-500 transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'}`}></span>
                                <span className={`block w-6 h-0.5 bg-green-500 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`block w-6 h-0.5 bg-green-500 transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'}`}></span>
                            </div>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex lg:items-center lg:gap-8">

                            {/* Home Link */}
                            <a
                                href="/"
                                className="text-2xl font-medium leading-7xl text-green-500 hover:text-green-400 transition-colors"
                            >
                                Home
                            </a>

                            {/* About Link */}
                            <a
                                href="/about"
                                className="text-2xl font-medium leading-7xl text-green-500 hover:text-green-400 transition-colors"
                            >
                                About
                            </a>
                        </nav>

                        {/* Get STOM Button */}
                        <Button
                            text="Get STOM"
                            className="hidden lg:inline-flex bg-bg-accent-green text-text-dark rounded-lg px-[22px] py-1 text-xl font-semibold leading-5xl"
                        />
                    </div>
                </div>
            </header>

            {/* Mobile Drawer Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Drawer */}
            <aside
                className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between p-6 border-b border-green-500/20">
                        <div className="flex items-center gap-3">
                            <img
                                src="/images/img_frame_1321318977.png"
                                alt="Stomatrade Logo"
                                className="w-[24px] h-[24px]"
                            />
                            <h2 className="text-lg font-semibold text-green-500">Menu</h2>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 text-green-500 hover:text-green-400 transition-colors"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 p-6 space-y-2">
                        <a
                            href="/"
                            className="flex items-center gap-4 p-4 text-lg font-medium text-green-500 hover:text-green-400 hover:bg-green-500/10 rounded-xl transition-all duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </a>

                        <a
                            href="/about"
                            className="flex items-center gap-4 p-4 text-lg font-medium text-green-500 hover:text-green-400 hover:bg-green-500/10 rounded-xl transition-all duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            About
                        </a>
                    </nav>

                    {/* Drawer Footer with CTA */}
                    <div className="p-6 border-t border-green-500/20">
                        <Button
                            text="Get STOM"
                            className="w-full bg-bg-accent-green text-text-dark rounded-xl px-6 py-3 text-lg font-semibold hover:opacity-90 transition-opacity"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Header;