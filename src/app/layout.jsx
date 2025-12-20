import '../styles/index.css'

export const viewport = {
    width: 'device-width',
    initialScale: 1,
}

export const metadata = {
    title: {
        default: 'Stomatrade Staking Platform',
        template: 'Stomatrade Staking Platform | %s',
    },
    description: 'Comprehensive cryptocurrency staking platform for Stomatrade ecosystem with token staking, validator operations, governance voting, and reward earning mechanisms.',
    keywords: 'stomatrade, cryptocurrency, staking, blockchain, defi, crypto rewards, validator, governance, token staking',

    openGraph: {
        type: 'website',
        title: {
            default: 'Stomatrade Staking Platform',
            template: 'Stomatrade Staking Platform | %s',
        },
        description: 'Earn rewards through cryptocurrency staking on Stomatrade platform. Join validator networks, participate in governance, and maximize your crypto earnings.',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}

                <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fstomatrade6847back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.12" />
                <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
        </html>
    )
}