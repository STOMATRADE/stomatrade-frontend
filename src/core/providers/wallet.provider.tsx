"use client"

import { PropsWithChildren, useEffect, useMemo, useState } from "react"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { getWagmiConfig } from "@/core/config/wagmi"

export function WalletProvider({ children }: PropsWithChildren) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const wagmiConfig = useMemo(() => getWagmiConfig(), [])

    if (!mounted) return null

    return (
        <WagmiProvider config={wagmiConfig}>
            <RainbowKitProvider theme={darkTheme()}>
                {children}
            </RainbowKitProvider>
        </WagmiProvider>
    )
}

