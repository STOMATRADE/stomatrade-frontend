"use client"

import { PropsWithChildren, useId, useMemo } from "react"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { getWagmiConfig } from "@/core/config/wagmi"

export function WalletProvider({ children }: PropsWithChildren) {
    const wagmiConfig = useMemo(() => getWagmiConfig(), [])
    const wagmiKey = useId()
    const rkKey = useId()

    return (
        <WagmiProvider config={wagmiConfig} key={wagmiKey}>
            <RainbowKitProvider key={rkKey}>
                {children}
            </RainbowKitProvider>
        </WagmiProvider>
    )
}
