import type { Metadata } from 'next';
import Button from '../../../components/ui/Button';

export const metadata: Metadata = {
    title: 'About - Stomatrade',
    description: 'Learn about Stomatrade and how we empower communities through sustainable, blockchain-enabled agriculture.',
};

export default function AboutPage() {
    return (
        <>
            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <section className="flex flex-col items-center text-center pt-[80px] sm:pt-[120px] md:pt-[161px] pb-[40px] sm:pb-[60px] md:pb-[96px]">
                        <div className="bg-[#4ade8026] border border-[#4ade80] rounded-2xl px-4 py-2 mb-4 sm:mb-6 md:mb-[16px]">
                            <span className="text-xs sm:text-sm md:text-xs font-semibold leading-lg text-[#b4b4b4]">
                                About
                            </span>
                        </div>
                        <h1 className="text-[28px] sm:text-[35px] md:text-[50px] font-medium leading-[28px] sm:leading-[35px] md:leading-[50px] text-text-primary mb-3 sm:mb-4 md:mb-[12px] max-w-4xl">
                            Building Trust for Sustainable Agriculture
                        </h1>
                        <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder max-w-2xl">
                            Stomatrade connects farmers, investors, and communities through transparent, tokenized supply chains that create
                            measurable impact.
                        </p>
                </section>

                {/* Mission */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 pb-16 sm:pb-20 md:pb-24">
                        <div className="bg-primary-elevated rounded-xl p-6 sm:p-8 md:p-10">
                            <h2 className="text-[24px] sm:text-[32px] md:text-6xl font-medium leading-[28px] sm:leading-[36px] md:leading-8xl text-text-primary mb-4 sm:mb-6">
                                Our Mission
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg font-normal leading-[18px] sm:leading-[20px] md:leading-4xl text-text-secondary">
                                We make agriculture more accessible and resilient by giving communities tools to fund, verify, and grow
                                sustainable farms with real-world impact.
                            </p>
                        </div>
                        <div className="bg-primary-container rounded-xl p-6 sm:p-8 md:p-10">
                            <h2 className="text-[24px] sm:text-[32px] md:text-6xl font-medium leading-[28px] sm:leading-[36px] md:leading-8xl text-text-primary mb-4 sm:mb-6">
                                How We Work
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg font-normal leading-[18px] sm:leading-[20px] md:leading-4xl text-text-secondary">
                                Stomatrade combines on-chain transparency with field-level verification, so every contribution is traceable
                                from seed to harvest.
                            </p>
                        </div>
                </section>

                {/* Values */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-4 pb-16 sm:pb-20 md:pb-24">
                        <div className="bg-primary-elevated rounded-lg p-6 sm:p-8 text-center">
                            <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                                Transparency
                            </p>
                            <p className="text-text-primary text-base sm:text-lg">
                                Clear reporting on impact, rewards, and outcomes.
                            </p>
                        </div>
                        <div className="bg-primary-elevated rounded-lg p-6 sm:p-8 text-center">
                            <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                                Sustainability
                            </p>
                            <p className="text-text-primary text-base sm:text-lg">
                                Supporting regenerative practices for long-term growth.
                            </p>
                        </div>
                        <div className="bg-primary-elevated rounded-lg p-6 sm:p-8 text-center">
                            <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                                Community
                            </p>
                            <p className="text-text-primary text-base sm:text-lg">
                                Empowering farmers and local partners with shared value.
                            </p>
                        </div>
                </section>

                {/* CTA */}
                <section className="bg-primary-background rounded-5xl p-8 sm:p-12 md:p-11 my-8 sm:my-12 md:my-16 relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/img_colorful_abstract_3d_elements21080x1080_2.png')" }}
                        />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-4 max-w-6xl mx-auto">
                            <div className="flex-1 text-center lg:text-left">
                                <h2 className="text-[24px] sm:text-[32px] md:text-7xl font-medium leading-[28px] sm:leading-[36px] md:leading-10xl text-text-primary mb-3 sm:mb-4 md:mb-2">
                                    Grow with Stomatrade
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg font-normal leading-[18px] sm:leading-[20px] md:leading-4xl text-text-primary">
                                    Join the ecosystem and support sustainable agriculture.
                                </p>
                            </div>
                            <Button
                                className="bg-accent-green text-text-dark rounded-lg px-6 py-2 text-base sm:text-lg md:text-xl font-semibold leading-5xl"
                            >
                                Get IDRC
                            </Button>
                        </div>
                </section>
            </main>
        </>
    );
}
