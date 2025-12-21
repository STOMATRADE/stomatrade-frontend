'use client';

import { useAuth } from '@/core/providers/auth.provider';
import Button from '@/components/ui/Button';

export default function SignInPage() {
    const { connectWithRainbow } = useAuth();

    return (
        <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-[80px] sm:pt-[120px] md:pt-[161px] pb-16 sm:pb-20">
                <div className="bg-primary-elevated/80 border border-[#4ade8010] rounded-[28px] p-8 sm:p-10 md:p-12 relative overflow-hidden">
                    <div className="absolute -top-12 -left-10 w-40 h-40 bg-accent-green/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-6 right-6 w-24 h-24 bg-[#1f6b3b] rounded-full opacity-30" />

                    <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center mb-6">
                        <img src="/favicon.svg" alt="Stomatrade" className="w-8 h-8" />
                    </div>

                    <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold text-text-primary mb-3">
                        Masuk ke Stomatrade
                    </h1>
                    <p className="text-sm sm:text-base text-text-secondary max-w-md mb-8">
                        Akses staking, portfolio, dan governance hanya dengan wallet. Tidak ada Google sign‑in.
                    </p>

                    <div className="bg-primary-container/80 border border-[#4ade8010] rounded-2xl p-4 sm:p-5 mb-6">
                        <p className="text-sm text-text-placeholder">
                            Pastikan wallet Anda siap untuk menandatangani pesan verifikasi.
                        </p>
                    </div>

                    <Button
                        onClick={() => connectWithRainbow?.()}
                        className="w-full bg-accent-green text-text-dark rounded-xl px-6 py-3 text-base sm:text-lg font-semibold leading-3xl"
                    >
                        Connect Wallet
                    </Button>

                    <p className="text-xs text-text-placeholder mt-4">
                        Dengan masuk, Anda setuju dengan syarat dan ketentuan Stomatrade.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-br from-[#0f3320] via-[#0b1d14] to-transparent rounded-[28px]" />
                    <div className="relative bg-primary-container/70 border border-[#4ade8010] rounded-[28px] p-6 sm:p-8 overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-44 h-44 bg-accent-green/20 rounded-full blur-3xl" />
                        <img
                            src="/images/img_full_shot_smile.png"
                            alt="Stomatrade sign in"
                            className="w-full h-[360px] sm:h-[420px] md:h-[480px] object-cover rounded-2xl"
                        />
                        <div className="mt-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">
                                Wallet‑first Security
                            </h2>
                            <p className="text-sm text-text-secondary">
                                Login tanpa password. Semua akses diverifikasi langsung dari wallet Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
