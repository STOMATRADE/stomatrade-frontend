'use client';

import { ReactNode, useEffect } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';

type ChainGuardProps = {
  targetChainId: number;
  children: ReactNode;
};

export function ChainGuard({ targetChainId, children }: ChainGuardProps) {
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  useEffect(() => {
    if (!chainId || chainId === targetChainId) return;
    const supported = chains.some((c) => c.id === targetChainId);
    if (!supported || !switchChain) return;
    try {
      switchChain({ chainId: targetChainId });
    } catch (err) {
      console.warn('Chain switch failed', err);
    }
  }, [chainId, chains, switchChain, targetChainId]);

  return <>{children}</>;
}
