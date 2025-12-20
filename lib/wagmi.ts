import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { liskSepolia } from 'wagmi/chains';

export const chains = [liskSepolia] as const;

const transports = {
  [liskSepolia.id]: http(),
} as const;

export function createWagmiConfig() {
  if (typeof window === 'undefined') return null;
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID';
  const appName = 'Stomatrade';
  return getDefaultConfig({
    appName,
    projectId,
    chains,
    transports,
    ssr: true,
  });
}
