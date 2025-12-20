import type { Metadata } from 'next';
import HomePage from '../HomePage';

export const metadata: Metadata = {
    title: 'Staking Platform - Secure the Future, Earn Rewards',
    description: 'Delegate Stomatrade Token (IDRC) to validators or run your own node to provide economic support to the Stomatrade network, participate in governance votes, and earn rewards.',
    keywords: 'stomatrade staking, IDRC token, cryptocurrency staking, blockchain validators, defi rewards, governance voting, validator nodes, crypto earnings',

    openGraph: {
        title: 'Staking Platform - Secure the Future, Earn Rewards',
        description: 'Delegate Stomatrade Token (IDRC) to validators or run your own node to provide economic support to the Stomatrade network, participate in governance votes, and earn rewards.',
    }
};

export default function Page() {
    return <HomePage />;
}
