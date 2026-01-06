"use client"

import { AuthProvider } from "@/core/providers/auth.provider";
import { LoadingProvider } from "@/core/providers/loading.provider";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider, MutationCache } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { Toaster, toast } from "sonner";

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
    const [queryClient] = useState(() => new QueryClient({
        mutationCache: new MutationCache({
            onSuccess: (data: any) => {
                const message = data?.header?.message;
                if (message) {
                    toast.success(message);
                }
            },
            onError: (error: any) => {
                toast.error(error?.message || "Action failed");
            },
        }),
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <LoadingProvider>
                <WalletProvider>
                    <AuthProvider initialJwt={initialJwt}>
                        {children}
                        <Toaster position="top-right" richColors closeButton />
                    </AuthProvider>
                </WalletProvider>
            </LoadingProvider>
        </QueryClientProvider>
    )
}

export default Providers