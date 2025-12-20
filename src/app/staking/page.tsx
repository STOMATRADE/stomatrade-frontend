import { Metadata } from 'next';
import StakingPage from './StakingPage';

export const metadata: Metadata = {
    title: 'Staking Platform - Secure the Future, Earn Rewards',
    description: 'Delegate Stomatrade Token (STOM) to validators or run your own node to provide economic support to the Stomatrade network, participate in governance votes, and earn rewards.',
    keywords: 'stomatrade staking, STOM token, cryptocurrency staking, blockchain validators, defi rewards, governance voting, validator nodes, crypto earnings',

    openGraph: {
        title: 'Staking Platform - Secure the Future, Earn Rewards',
        description: 'Delegate Stomatrade Token (STOM) to validators or run your own node to provide economic support to the Stomatrade network, participate in governance votes, and earn rewards.',
    }
}

export default function Page() {
    return <StakingPage />
}