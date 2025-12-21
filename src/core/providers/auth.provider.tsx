"use client"

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import { useRouter } from "next/navigation"
import { Address } from "viem"
import { toast } from "sonner"

import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"

import { ROUTES } from "@/core/constant/route"
import { useAuthVerifyMutation } from "@/modules/auth/data/auth.mutation"
import { authQueryKeys, useAuthProfileQuery } from "@/modules/auth/data/auth.query"
import { AUTH_MESSAGE } from "@/core/constant/message"
import { useQueryClient } from "@tanstack/react-query"

const AuthContext = createContext<AuthContextType | null>(null)

type Props = {
    children: ReactNode;
    initialJwt?: string
}

export function AuthProvider({
    children,
    initialJwt,
}: Props) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { openConnectModal } = useConnectModal()

    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { signMessageAsync } = useSignMessage()

    const [connecting, setConnecting] =
        useState<AuthContextType["connecting"]>(null)

    const verifyMutation = useAuthVerifyMutation()
    const profileQuery = useAuthProfileQuery({
        enabled: !!initialJwt,
        retry: false,
    })

    const isAuthenticated = profileQuery.isSuccess

    /**
     * ======================
     * LOGIN (Rainbow)
     * ======================
     */
    useEffect(() => {
        const loginWithRainbow = async () => {
            if (!address || !isConnected || !verifyMutation.isIdle || isAuthenticated)
                return

            setConnecting("rainbow")

            try {
                const signature = await signMessageAsync({
                    message: AUTH_MESSAGE,
                    account: address as Address,
                })

                await verifyMutation.mutateAsync({
                    walletAddress: address as Address,
                    signature,
                    message: AUTH_MESSAGE,
                })

                await queryClient.invalidateQueries({
                    queryKey: authQueryKeys.profile,
                })

                toast.success("Sign in success")
                router.replace(ROUTES.home)
            } catch (error: any) {
                disconnect()
                toast.error(error?.message ?? "Login failed")
            } finally {
                setConnecting(null)
            }
        }

        loginWithRainbow()
    }, [
        address,
        isConnected,
        verifyMutation.isIdle,
        isAuthenticated,
        signMessageAsync,
        disconnect,
        queryClient,
        router,
    ])

    /**
     * ======================
     * LOGOUT
     * ======================
     */
    const logout = useCallback(async () => {
        disconnect()

        // Clear jwt cookie
        if (typeof document !== "undefined") {
            document.cookie = "jwt=; Max-Age=0; path=/"
        }

        queryClient.clear()
        router.replace(ROUTES.auth.signIn)
    }, [disconnect, router, queryClient])

    const value = useMemo<AuthContextType>(
        () => ({
            isAuthenticated,
            walletAddress: address ?? null,
            connecting,
            connectWithRainbow: () => openConnectModal?.(),
            logout,
        }),
        [isAuthenticated, address, connecting, logout, openConnectModal]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
}

export type AuthContextType = {
    isAuthenticated: boolean
    walletAddress: string | null
    connecting: "rainbow" | null

    connectWithRainbow: (() => void) | undefined
    logout: () => void
}
