"use client"

import { PropsWithChildren, useMemo } from "react"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { getWagmiConfig } from "@/core/config/wagmi"

export function WalletProvider({ children }: PropsWithChildren) {
    const wagmiConfig = useMemo(() => getWagmiConfig(), [])

    return (
        <WagmiProvider config={wagmiConfig}>
            <RainbowKitProvider>
                {children}
            </RainbowKitProvider>
        </WagmiProvider>
    )
}
