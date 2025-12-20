import type { ReactNode } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

type LandingLayoutProps = {
    children: ReactNode;
};

export default function LandingLayout({ children }: LandingLayoutProps) {
    return (
        <div className="w-full min-h-screen bg-[#0e0e0e] relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/img_unchained_5_1080x1080.png"
                    alt=""
                    className="absolute top-[60px] sm:top-[80px] md:top-[121px] right-0 w-[240px] sm:w-[320px] md:w-[478px] h-[360px] sm:h-[480px] md:h-[720px] opacity-50"
                />
                <img
                    src="/images/img_unchained_5_1080x1080_778x364.png"
                    alt=""
                    className="absolute top-[60px] sm:top-[80px] md:top-[121px] left-0 w-[182px] sm:w-[273px] md:w-[364px] h-[389px] sm:h-[584px] md:h-[778px] opacity-30"
                />
            </div>

            <div className="relative z-10">
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-[24px] sm:pt-[32px] md:pt-[57px]">
                    <Header />
                </div>
                {children}
                <Footer />
            </div>
        </div>
    );
}
