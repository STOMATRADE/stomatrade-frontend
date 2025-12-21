"use client"

import { AuthProvider } from "@/core/providers/auth.provider";
import { LoadingProvider } from "@/core/providers/loading.provider";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const WalletProvider = dynamic(
    () => import("@/core/providers/wallet.provider").then((mod) => mod.WalletProvider),
    { ssr: false }
);

type Props = {
    children: ReactNode;
    initialJwt?: string
}

const Providers = ({
    children,
    initialJwt,
}: Props) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <LoadingProvider>
                <WalletProvider>
                    <AuthProvider initialJwt={initialJwt}>
                        {children}
                    </AuthProvider>
                </WalletProvider>
            </LoadingProvider>
        </QueryClientProvider>
    )
}

export default Providers