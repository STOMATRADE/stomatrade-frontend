"use client"

import { LoadDialog } from "@/components/common/Load"
import { createContext, useContext, useMemo, useState, PropsWithChildren, useCallback, useEffect } from "react"

export const globalLoading = {
    show: () => { },
    hide: () => { },
}

type LoadingContextValue = {
    isOpen: boolean
    show: () => void
    hide: () => void
}

const LoadingContext = createContext<LoadingContextValue | null>(null)

export function LoadingProvider({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false)

    const show = useCallback(() => setIsOpen(true), [])
    const hide = useCallback(() => setIsOpen(false), [])

    useEffect(() => {
        globalLoading.show = show
        globalLoading.hide = hide
    }, [show, hide])

    const value = useMemo(
        () => ({
            isOpen,
            show,
            hide,
        }),
        [isOpen, show, hide],
    )

    return (
        <LoadingContext.Provider value={value}>
            {children}
            <LoadDialog isOpen={isOpen} />
        </LoadingContext.Provider>
    )
}

export function useLoading() {
    const ctx = useContext(LoadingContext)
    if (!ctx) {
        throw new Error("useLoading must be used within LoadingProvider")
    }
    return ctx
}
