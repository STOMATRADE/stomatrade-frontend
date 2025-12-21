import { cookies } from "next/headers"
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import "@rainbow-me/rainbowkit/styles.css"
import '../styles/index.css';
import Providers from './providers';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: 'Stomatrade Staking Platform',
        template: 'Stomatrade Staking Platform | %s',
    },
    description: 'Comprehensive cryptocurrency staking platform for Stomatrade ecosystem with token staking, validator operations, governance voting, and reward earning mechanisms.',
    keywords: 'stomatrade, cryptocurrency, staking, blockchain, defi, crypto rewards, validator, governance, token staking',
    icons: {
        icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    },
    openGraph: {
        type: 'website',
        title: {
            default: 'Stomatrade Staking Platform',
            template: 'Stomatrade Staking Platform | %s',
        },
        description: 'Earn rewards through cryptocurrency staking on Stomatrade platform. Join validator networks, participate in governance, and maximize your crypto earnings.',
    },
};

type RootLayoutProps = {
    children: ReactNode;
};

export default async function RootLayout({
    children
}: RootLayoutProps) {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt')?.value;

    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <Providers initialJwt={jwt}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
