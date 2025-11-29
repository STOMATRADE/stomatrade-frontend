'use client';

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useId, useMemo, useState } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';

import { chains, createWagmiConfig } from '@/lib/wagmi';
import { privyConfig } from '@/lib/privy';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const [wagmiConfig, setWagmiConfig] = useState<ReturnType<typeof createWagmiConfig> | null>(null);

  const wagmiKey = useId()
  const rkKey = useId()

  useEffect(() => {
    setMounted(true);
    setWagmiConfig(createWagmiConfig());
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'YOUR_PRIVY_APP_ID';

  const theme = useMemo(
    () =>
      darkTheme({
        accentColor: '#00C427',
        accentColorForeground: '#0E0E0E',
        borderRadius: 'large',
      }),
    [],
  );

  if (!mounted || !wagmiConfig) {
    return <div className="min-h-screen bg-bg text-gray-50" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={privyAppId}
        config={privyConfig}
      >
        <WagmiProvider key={wagmiKey} config={wagmiConfig}>
          <RainbowKitProvider
            key={rkKey}
            initialChain={chains[0]}
            theme={theme}
            modalSize="compact"
          >
            {children}
          </RainbowKitProvider>
        </WagmiProvider>
      </PrivyProvider>
    </QueryClientProvider >
  );
}
