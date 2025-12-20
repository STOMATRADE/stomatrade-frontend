'use client';
import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import EditText from '../components/ui/EditText';

interface StakingStats {
    totalStaked: number;
    totalStakedPercent: number;
    usersStaking: number;
    averageAPR: number;
}

interface NewsItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface PortfolioPosition {
    id: number;
    validator: string;
    stakedAmount: number;
    rewards: number;
    apr: number;
    status: 'active' | 'pending' | 'unstaking';
}

interface EarningProgress {
    period: string;
    earned: number;
    target: number;
    percentage: number;
}

export default function HomePage() {
    const [stakingStats, setStakingStats] = useState<StakingStats>({
        totalStaked: 14400000,
        totalStakedPercent: 50,
        usersStaking: 105000,
        averageAPR: 7.5
    })
    const [newsItems, setNewsItems] = useState<NewsItem[]>([])
    const [emailInput, setEmailInput] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [portfolioPositions, setPortfolioPositions] = useState<PortfolioPosition[]>([])
    const [earningProgress, setEarningProgress] = useState<EarningProgress[]>([])
    const [liveStats, setLiveStats] = useState({
        totalValue: 12450750,
        totalRewards: 156320,
        activeStakes: 3,
        pendingRewards: 12450
    })

    const formatIdr = (value: number): string =>
        new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(value);

    useEffect(() => {
        loadStakingData()

        // Simulate live data updates every 3 seconds
        const interval = setInterval(() => {
            updateLiveData()
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    const loadStakingData = async (): Promise<void> => {
        try {
            setTimeout(() => {
                setNewsItems([
                    {
                        id: 1,
                        title: 'Collaborative Ecosystem',
                        description: 'We believe that change happens when communities work together.',
                        image: '/images/img_full_shot_smile.png'
                    },
                    {
                        id: 2,
                        title: 'Financial Empowerment',
                        description: 'Stomata ensures that farmers are empowered with the resources they need.',
                        image: '/images/img_screenshot_8_9.png'
                    },
                    {
                        id: 3,
                        title: 'Community Of Impact Makers',
                        description: 'Committed to making a positive difference.',
                        image: '/images/img_adventure_throu.png'
                    },
                    {
                        id: 4,
                        title: 'Sustainable Relationships',
                        description: 'Create lasting value for farmers and the environment.',
                        image: '/images/img_screenshot_8_9_126x260.png'
                    }
                ])

                // Portfolio positions
                setPortfolioPositions([
                    {
                        id: 1,
                        validator: 'StomataNode Alpha',
                        stakedAmount: 5000000,
                        rewards: 87500,
                        apr: 7.8,
                        status: 'active'
                    },
                    {
                        id: 2,
                        validator: 'GreenValidator Pro',
                        stakedAmount: 3500000,
                        rewards: 45200,
                        apr: 7.2,
                        status: 'active'
                    },
                    {
                        id: 3,
                        validator: 'EcoStake Master',
                        stakedAmount: 2000000,
                        rewards: 23620,
                        apr: 6.9,
                        status: 'active'
                    }
                ])

                // Earning progress
                setEarningProgress([
                    { period: 'Daily', earned: 34200, target: 50000, percentage: 68.4 },
                    { period: 'Weekly', earned: 187500, target: 350000, percentage: 53.6 },
                    { period: 'Monthly', earned: 893200, target: 1500000, percentage: 59.5 }
                ])

                setLoading(false)
            }, 1000)
        } catch (error) {
            setLoading(false)
        }
    }

    const updateLiveData = (): void => {
        setLiveStats(prev => ({
            totalValue: Math.max(0, prev.totalValue + Math.floor((Math.random() - 0.5) * 10000)),
            totalRewards: Math.max(0, prev.totalRewards + Math.floor(Math.random() * 500)),
            activeStakes: prev.activeStakes,
            pendingRewards: Math.max(0, prev.pendingRewards + Math.floor(Math.random() * 200))
        }))

        setPortfolioPositions(prev => prev.map(pos => ({
            ...pos,
            rewards: Math.max(0, pos.rewards + Math.floor(Math.random() * 50))
        })))
    }

    const handleStakeClick = (): void => {
        // Stake functionality
    }

    const handleValidatorClick = (): void => {
        // Validator node functionality
    }

    const handleEmailSubmit = (): void => {
        if (emailInput) {
            // Email subscription functionality
            setEmailInput('')
        }
    }

    return (
        <>
            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="flex flex-col items-center text-center pt-[80px] sm:pt-[120px] md:pt-[161px] pb-[40px] sm:pb-[60px] md:pb-[96px]">

                        {/* Staking Badge */}
                        <div className="bg-[#4ade8026] border border-[#4ade80] rounded-2xl px-4 py-2 mb-4 sm:mb-6 md:mb-[16px]">
                            <span className="text-xs sm:text-sm md:text-xs font-semibold leading-lg text-[#b4b4b4]">
                                Staking
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-[28px] sm:text-[35px] md:text-[50px] font-medium leading-[28px] sm:leading-[35px] md:leading-[50px] text-text-primary mb-3 sm:mb-4 md:mb-[12px] max-w-4xl">
                            Secure the Future, <br />Earn Rewards
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder mb-8 sm:mb-10 md:mb-[36px] max-w-2xl">
                            Delegate Stomatrade Token (IDRC) to validators or run your own node to provide economic support to the Stomatrade network,
                            and participate in governance votes.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-3 mb-16 sm:mb-20 md:mb-[72px]">
                            <Button
                                onClick={handleStakeClick}
                                className="bg-accent-green text-text-dark rounded-lg px-[16px] sm:px-[24px] md:px-[36px] py-1 text-base sm:text-lg md:text-xl font-semibold leading-5xl flex items-center gap-1 sm:gap-2 md:gap-1"
                            >
                                Stake IDRC
                                <img src="/images/img_mynauileaves_black_900_01.svg" alt="Leaf" className="w-4 h-4 sm:w-5 h-5 md:w-5 h-5" />
                            </Button>
                            <Button
                                onClick={handleValidatorClick}
                                className="bg-primary-accent text-text-primary rounded-lg px-[20px] sm:px-[24px] md:px-[28px] py-1 text-base sm:text-lg md:text-xl font-semibold leading-5xl"
                            >
                                Run validator node
                            </Button>
                        </div>

                        {/* Staking Statistics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-4 w-full max-w-5xl">
                            <div className="bg-primary-elevated rounded-lg p-6 sm:p-8 md:p-4 text-center">
                                <p className="text-sm sm:text-base md:text-base font-medium leading-2xl text-text-placeholder mb-4 sm:mb-6 md:mb-[22px]">
                                    Total IDRC Staked
                                </p>
                                <p className="text-[28px] sm:text-[32px] md:text-7xl font-normal leading-[42px] sm:leading-[48px] md:leading-12xl text-[#43ff87]">
                                    {formatIdr(stakingStats.totalStaked)}{' '}
                                    <span className="text-[#00531e]">({stakingStats.totalStakedPercent}%)</span>
                                </p>
                            </div>

                            <div className="bg-primary-elevated rounded-lg p-6 sm:p-8 md:p-6 text-center">
                                <p className="text-sm sm:text-base md:text-base font-medium leading-2xl text-text-placeholder mb-4 sm:mb-6 md:mb-[22px]">
                                    Users Staking
                                </p>
                                <p className="text-[28px] sm:text-[32px] md:text-7xl font-normal leading-[42px] sm:leading-[48px] md:leading-12xl text-[#43ff87]">
                                    {formatIdr(stakingStats.usersStaking)}
                                </p>
                            </div>

                            <div className="bg-primary-elevated rounded-lg p-6 sm:p-8 md:p-4 text-center sm:col-span-2 lg:col-span-1">
                                <p className="text-sm sm:text-base md:text-base font-medium leading-2xl text-text-placeholder mb-4 sm:mb-6 md:mb-[22px]">
                                    Average APR
                                </p>
                                <p className="text-[28px] sm:text-[32px] md:text-7xl font-normal leading-[42px] sm:leading-[48px] md:leading-12xl text-[#43ff87]">
                                    ~{stakingStats.averageAPR}%
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* NEW: Live Portfolio Overview Section */}
                    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-14">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-[28px] sm:text-[36px] md:text-8xl font-medium leading-[36px] sm:leading-[44px] md:leading-13xl text-text-primary">
                                Your Portfolio
                            </h2>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
                                <span className="text-sm text-accent-green">Live</span>
                            </div>
                        </div>

                        {/* Live Statistics Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-gradient-to-br from-primary-elevated to-primary-container rounded-xl p-6 border border-[#4ade8020] hover:border-accent-green transition-all duration-300 transform hover:scale-105">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-text-placeholder">Total Value</p>
                                    <div className="w-8 h-8 bg-[#4ade8020] rounded-lg flex items-center justify-center">
                                        <img src="/images/img_mdi_wallet_outline.svg" alt="Wallet" className="w-5 h-5" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-text-primary mb-1">
                                    Rp {formatIdr(liveStats.totalValue)}
                                </p>
                                <p className="text-xs text-accent-green">+2.4% today</p>
                            </div>

                            <div className="bg-gradient-to-br from-primary-elevated to-primary-container rounded-xl p-6 border border-[#4ade8020] hover:border-accent-green transition-all duration-300 transform hover:scale-105">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-text-placeholder">Total Rewards</p>
                                    <div className="w-8 h-8 bg-[#4ade8020] rounded-lg flex items-center justify-center">
                                        <img src="/images/img_mynauileaves_black_900_01.svg" alt="Rewards" className="w-5 h-5" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-text-primary mb-1">
                                    {formatIdr(liveStats.totalRewards)} IDRC
                                </p>
                                <p className="text-xs text-accent-green">+{formatIdr(800)} IDRC today</p>
                            </div>

                            <div className="bg-gradient-to-br from-primary-elevated to-primary-container rounded-xl p-6 border border-[#4ade8020] hover:border-accent-green transition-all duration-300 transform hover:scale-105">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-text-placeholder">Active Stakes</p>
                                    <div className="w-8 h-8 bg-[#4ade8020] rounded-lg flex items-center justify-center">
                                        <img src="/images/img_ic_outline_token.svg" alt="Stakes" className="w-5 h-5" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-text-primary mb-1">
                                    {liveStats.activeStakes}
                                </p>
                                <p className="text-xs text-text-placeholder">Across validators</p>
                            </div>

                            <div className="bg-gradient-to-br from-primary-elevated to-primary-container rounded-xl p-6 border border-[#4ade8020] hover:border-accent-green transition-all duration-300 transform hover:scale-105">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-text-placeholder">Pending Rewards</p>
                                    <div className="w-8 h-8 bg-[#4ade8020] rounded-lg flex items-center justify-center">
                                        <img src="/images/img_gg_data.svg" alt="Pending" className="w-5 h-5" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-text-primary mb-1">
                                    {formatIdr(liveStats.pendingRewards)} IDRC
                                </p>
                                <p className="text-xs text-text-placeholder">Ready to claim</p>
                            </div>
                        </div>

                        {/* Staking Positions */}
                        <div className="bg-primary-elevated rounded-xl p-6 mb-8">
                            <h3 className="text-xl font-semibold text-text-primary mb-6">Your Staking Positions</h3>
                            <div className="space-y-4">
                                {portfolioPositions.map((position) => (
                                    <div
                                        key={position.id}
                                        className="bg-primary-container rounded-lg p-4 border border-[#4ade8010] hover:border-accent-green transition-all duration-300"
                                    >
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="text-lg font-semibold text-text-primary">{position.validator}</h4>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${position.status === 'active' ? 'bg-[#4ade8020] text-accent-green' :
                                                            position.status === 'pending' ? 'bg-[#fbbf2420] text-[#fbbf24]' :
                                                                'bg-[#ef444420] text-[#ef4444]'
                                                        }`}>
                                                        {position.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-text-placeholder mb-1">Staked</p>
                                                        <p className="text-text-primary font-semibold">{formatIdr(position.stakedAmount)} IDRC</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-text-placeholder mb-1">Rewards</p>
                                                        <p className="text-accent-green font-semibold">{formatIdr(position.rewards)} IDRC</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-text-placeholder mb-1">APR</p>
                                                        <p className="text-text-primary font-semibold">{position.apr}%</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button className="bg-accent-green text-text-dark rounded-lg px-6 py-2 text-sm font-semibold hover:bg-[#3bc76a] transition-colors">
                                                Claim Rewards
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Earning Progress Bars */}
                        <div className="bg-primary-elevated rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-text-primary mb-6">Earning Progress</h3>
                            <div className="space-y-6">
                                {earningProgress.map((progress, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-base font-semibold text-text-primary">{progress.period}</span>
                                                <span className="text-sm text-text-placeholder">
                                                    {formatIdr(progress.earned)} / {formatIdr(progress.target)} IDRC
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-accent-green">
                                                {progress.percentage.toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="relative w-full h-3 bg-primary-container rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-green to-[#0fb24a] rounded-full transition-all duration-500 ease-out"
                                                style={{ width: `${progress.percentage}%` }}
                                            >
                                                <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Earn Rewards Section */}
                    <section className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 md:gap-[60px] py-16 sm:py-20 md:py-16 px-4 sm:px-6 md:px-14">
                        <div className="flex-1 text-left">
                            <h2 className="text-[36px] sm:text-[48px] md:text-11xl font-medium leading-[36px] sm:leading-[48px] md:leading-12xl text-text-primary mb-6 sm:mb-8 md:mb-[127px]">
                                Earn<br />rewards
                            </h2>
                            <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder max-w-2xl">
                                Stomatrade&apos;s innovative financial ecosystem generates rewards by enabling transactions through tokenized
                                real-world assets, benefiting both farmers, investors, and platform participants.
                                <br /><br />
                                The issuance of new tokens further strengthens the platform, enhancing financial opportunities and ensuring long-term sustainability.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/images/img_image_fx_75_1.png"
                                alt="Rewards visualization"
                                className="w-[240px] sm:w-[280px] md:w-[334px] h-[250px] sm:h-[290px] md:h-[348px] object-cover"
                            />
                        </div>
                    </section>

                    {/* Staking Details */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-2 py-16 sm:py-20 md:py-0 px-4 sm:px-6 md:px-14">
                        <div className="bg-primary-container rounded-lg p-6 sm:p-8 md:p-9 text-center">
                            <p className="text-sm sm:text-base md:text-base font-medium leading-2xl text-text-placeholder mb-4 sm:mb-6 md:mb-[20px]">
                                Minimum Required
                            </p>
                            <div className="text-[28px] sm:text-[32px] md:text-7xl font-normal leading-[42px] sm:leading-[48px] md:leading-12xl mb-4 sm:mb-6 md:mb-[20px]">
                                <span className="text-[#43ff87]">1 </span>
                                <span className="text-[#0fb34a]">IDRC</span>
                            </div>
                            <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder">
                                You can delegate as little as 1 IDRC to any of the trusted validators in the network.
                            </p>
                        </div>

                        <div className="bg-primary-container rounded-lg p-6 sm:p-8 md:p-[26px] text-center">
                            <p className="text-sm sm:text-base md:text-base font-medium leading-2xl text-text-placeholder mb-4 sm:mb-6 md:mb-[20px]">
                                Average APR
                            </p>
                            <p className="text-[28px] sm:text-[32px] md:text-7xl font-normal leading-[42px] sm:leading-[48px] md:leading-12xl text-[#43ff87] mb-4 sm:mb-6 md:mb-[20px]">
                                ~7.5%
                            </p>
                            <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder">
                                The reward rate fluctuates based on the total rewards per epoch and the number of tokens staked in the network. Rewards are dynamically calculated to ensure growth and stability.
                            </p>
                        </div>

                        <div className="bg-primary-container rounded-lg p-6 sm:p-8 md:p-[34px] text-center">
                            <p className="text-sm sm:text-base md:text-base font-medium leading-2xl text-text-placeholder mb-4 sm:mb-6 md:mb-[20px]">
                                Unstake Period
                            </p>
                            <p className="text-[28px] sm:text-[32px] md:text-7xl font-normal leading-[42px] sm:leading-[48px] md:leading-12xl text-[#43ff87] mb-4 sm:mb-6 md:mb-[20px]">
                                15 days
                            </p>
                            <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder">
                                During this period, the unstaked IDRC tokens cannot be withdrawn or used in any other way, ensuring network security and consistency.
                            </p>
                        </div>
                    </section>

                    {/* Governance Section */}
                    <section className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12 md:gap-20 py-16 sm:py-20 md:py-44 px-4 sm:px-6 md:px-14">
                        <h2 className="text-[32px] sm:text-[42px] md:text-10xl font-medium leading-[32px] sm:leading-[42px] md:leading-12xl text-text-primary flex-1">
                            Vote for the Future of Stomata
                        </h2>
                        <div className="flex-1 lg:max-w-md">
                            <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder">
                                Staking IDRC grants you the right to vote on key proposals and contribute to the future of the Stomatrade ecosystem.
                                <br /><br />
                                Join other stakeholders in shaping Stomatrade&apos;s growth, governance, and sustainability, ensuring a more accessible, traceable agricultural supply chain for all participants.
                            </p>
                        </div>
                    </section>

                    {/* Call to Action Section */}
                    <section className="bg-primary-background rounded-5xl p-8 sm:p-12 md:p-11 my-16 sm:my-20 md:my-20 relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/img_colorful_abstract_3d_elements21080x1080_2.png')" }}
                        />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-4 max-w-6xl mx-auto">
                            <div className="flex-1 text-center lg:text-left">
                                <h2 className="text-[24px] sm:text-[32px] md:text-7xl font-medium leading-[28px] sm:leading-[36px] md:leading-10xl text-text-primary mb-3 sm:mb-4 md:mb-2">
                                    Secure the Chain, Earn Rewards
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg font-normal leading-[18px] sm:leading-[20px] md:leading-4xl text-text-primary">
                                    Contribute to network security & earn staking rewards.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-4">
                                <Button
                                    onClick={handleStakeClick}
                                    className="bg-accent-green text-text-dark rounded-lg px-4 py-1 text-base sm:text-lg md:text-xl font-semibold leading-5xl flex items-center gap-1 sm:gap-2 md:gap-1"
                                >
                                    Stake IDRC
                                    <img src="/images/img_mynauileaves_black_900_01.svg" alt="Leaf" className="w-4 h-4 sm:w-5 h-5 md:w-5 h-5" />
                                </Button>
                                <Button
                                    onClick={handleValidatorClick}
                                    className="bg-primary-accent text-text-primary rounded-lg px-4 py-1 text-base sm:text-lg md:text-xl font-semibold leading-5xl"
                                >
                                    Run validator node
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Latest News Section */}
                    <section className="py-16 sm:py-20 md:py-31 px-4 sm:px-6 md:px-33.5">
                        <h2 className="text-[32px] sm:text-[40px] md:text-8xl font-medium leading-[40px] sm:leading-[50px] md:leading-13xl text-text-primary mb-8 sm:mb-12 md:mb-[102px]">
                            Latest News
                        </h2>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-[18px]">
                                {[...Array(4)].map((_, i: number) => (
                                    <div key={i} className="bg-primary-elevated rounded-lg p-2 animate-pulse">
                                        <div className="h-32 bg-primary-accent rounded mb-4" />
                                        <div className="h-4 bg-primary-accent rounded mb-2" />
                                        <div className="h-3 bg-primary-accent rounded" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-[18px]">
                                {newsItems.map((item: NewsItem) => (
                                    <div key={item.id} className="bg-primary-elevated rounded-lg p-2">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-32 object-cover rounded-sm mb-4 sm:mb-6 md:mb-[23px]"
                                        />
                                        <div className="px-2">
                                            <h3 className="text-lg sm:text-xl md:text-3xl font-semibold leading-6xl text-text-primary mb-2 sm:mb-3 md:mb-[6px]">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm sm:text-base md:text-base font-normal leading-2xl text-text-primary">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
            </main>

            {/* Newsletter Section */}
            <section className="relative bg-primary-background rounded-5xl mx-4 sm:mx-6 lg:mx-8 mt-10 sm:mt-12 md:mt-10 mb-16 sm:mb-20 md:mb-25 overflow-hidden">
                    {/* Background Images */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/img_colorful_abstract_962x902.png"
                            alt=""
                            className="absolute left-0 top-0 w-[60%] h-full object-cover opacity-30"
                        />
                        <img
                            src="/images/img_colorful_abstract_666x550.png"
                            alt=""
                            className="absolute right-0 top-0 w-[40%] h-full object-cover opacity-30"
                        />
                    </div>

                    <div className="relative z-10 text-center py-16 sm:py-20 md:py-27.5 px-4 sm:px-6 md:px-14">
                        <h2 className="text-lg sm:text-xl md:text-5xl font-normal leading-[24px] sm:leading-[28px] md:leading-9xl text-text-primary mb-8 sm:mb-12 md:mb-[57px]">
                            Let&apos;s connect and create a positive impact together.
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-[14px] justify-center items-center mb-8 sm:mb-12 md:mb-[74px] max-w-2xl mx-auto">
                            <EditText
                                placeholder="Enter a valid email address"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="flex-1 min-w-0"
                            />
                            <Button
                                onClick={handleEmailSubmit}
                                className="bg-accent-green text-text-dark rounded-xl px-[26px] py-3 text-base font-semibold leading-3xl shrink-0"
                            >
                                Sign up
                            </Button>
                        </div>

                        <p className="text-sm sm:text-base md:text-base font-normal leading-base text-[#c1c1c1] max-w-2xl mx-auto">
                            At Stomatrade, we are deeply committed to protecting your privacy. Your personal information will never be shared without your consent. For more information, check out our Privacy Policy.
                        </p>
                    </div>
            </section>
        </>
    )
}
