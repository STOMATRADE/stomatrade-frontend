export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-primary-background to-[#0a0a0a] px-4 sm:px-6 md:px-16 py-16 sm:py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 mb-12">
                    <div className="flex flex-col gap-6 lg:max-w-md">
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/img_frame_1321318977_30x24.png"
                                alt="Stomatrade Logo"
                                className="w-7 h-9"
                            />
                            <h3 className="text-2xl font-bold text-accent-green">
                                Stomatrade
                            </h3>
                        </div>

                        <p className="text-base text-text-secondary leading-relaxed">
                            Integrating technology, sustainability, and community for a future where agriculture works hand-in-hand with nature.
                        </p>

                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-primary-elevated rounded-full flex items-center justify-center hover:bg-accent-green transition-all duration-300 group">
                                <img src="/images/img_ic_baseline_discord_blue_gray_100.svg" alt="Discord" className="w-5 h-5 group-hover:brightness-0" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-primary-elevated rounded-full flex items-center justify-center hover:bg-accent-green transition-all duration-300 group">
                                <img src="/images/img_frame_blue_gray_100.svg" alt="Twitter" className="w-5 h-5 group-hover:brightness-0" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-primary-elevated rounded-full flex items-center justify-center hover:bg-accent-green transition-all duration-300 group">
                                <img src="/images/img_ic_baseline_telegram_blue_gray_100.svg" alt="Telegram" className="w-5 h-5 group-hover:brightness-0" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-primary-elevated rounded-full flex items-center justify-center hover:bg-accent-green transition-all duration-300 group">
                                <img src="/images/img_frame_blue_gray_100_24x24.svg" alt="Medium" className="w-5 h-5 group-hover:brightness-0" />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-lg font-semibold text-accent-green mb-2">
                                Platform
                            </h4>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors text-sm">About us</a>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors text-sm">Features</a>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors text-sm">Ecosystem</a>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="text-lg font-semibold text-accent-green mb-2">
                                Resources
                            </h4>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors text-sm">Whitepaper</a>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors text-sm">Staking Guide</a>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors text-sm">FAQ</a>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="text-lg font-semibold text-accent-green mb-2">
                                Connect
                            </h4>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors text-sm flex items-center gap-2">
                                <img src="/images/img_at_sign.svg" alt="" className="w-4 h-4" />
                                Contact Us
                            </a>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors text-sm">Community</a>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors text-sm">Validators</a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#dedede10]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-text-secondary">
                            © 2025 Stomatrade. All rights reserved.
                        </p>

                        <div className="flex flex-wrap gap-6 justify-center">
                            <a href="#" className="text-sm text-text-secondary hover:text-accent-green transition-colors">Privacy</a>
                            <a href="#" className="text-sm text-text-secondary hover:text-accent-green transition-colors">Terms</a>
                            <a href="#" className="text-sm text-text-secondary hover:text-accent-green transition-colors">Legal</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
