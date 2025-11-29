'use client';

import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { StatCard } from './StatCard';

const privyEnabled =
  Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID) &&
  !String(process.env.NEXT_PUBLIC_PRIVY_APP_ID).startsWith('YOUR_');

const positions = [
  { name: 'Eco Yield', value: '$12,430', change: '+3.8%' },
  { name: 'Carbon Credits', value: '$4,120', change: '+1.4%' },
  { name: 'Green Options', value: '$2,060', change: '-0.8%' },
];

const activities = [
  { label: 'Bridged to embedded AA wallet', time: '2m ago' },
  { label: 'Swapped 0.42 ETH for NATURE', time: '12m ago' },
  { label: 'Claimed rewards to Privy wallet', time: '1h ago' },
];

export function DashboardContent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const privy = privyEnabled && mounted ? usePrivy() : null;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-[#1f1f1f] bg-secondaryBg/80 p-6 shadow-glow backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="badge">Dashboard</div>
          <h1 className="mt-3 font-abhaya-libre text-4xl text-white">Portfolio overview</h1>
          <p className="text-gray-300">Monitor balances, positions, and recent actions across embedded wallets.</p>
        </div>
        {mounted ? (
          <ConnectButton chainStatus="icon" accountStatus="address" showBalance />
        ) : (
          <div className="h-10 w-40 rounded-full bg-secondaryBg" />
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard title="Total balance" value="$18,610" change="+2.2%" />
        <StatCard title="Staked" value="$6,440" />
        <StatCard title="Rewards (24h)" value="$284" change="+0.9%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 rounded-3xl border border-[#1f1f1f] bg-bg/80 p-5 shadow-glow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Active positions</h2>
            <span className="text-xs text-gray-400">React Query sourced</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {positions.map((position) => (
              <div key={position.name} className="rounded-2xl border border-[#1f1f1f] bg-secondaryBg/70 p-4">
                <p className="text-sm text-gray-400">{position.name}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{position.value}</p>
                <p className="text-sm text-primary">{position.change}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-3xl border border-[#1f1f1f] bg-bg/80 p-5 shadow-glow">
          <h2 className="text-lg font-semibold text-white">Recent activity</h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.label} className="flex items-center justify-between rounded-2xl border border-[#1f1f1f] bg-secondaryBg/70 px-4 py-3">
                <p className="text-sm text-gray-200">{activity.label}</p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-[#1f1f1f] bg-secondaryBg/80 p-4 text-sm text-gray-300">
            {privy?.authenticated ? (
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">Connected</p>
                <p className="font-semibold text-white">Privy ID: {privy.user?.id}</p>
                {privy.user?.wallet?.address ? (
                  <p className="text-gray-300">Embedded wallet: {privy.user.wallet.address}</p>
                ) : null}
              </div>
            ) : (
              <p>{privyEnabled ? 'Connect your wallet to hydrate data with React Query.' : 'Privy not configured; set NEXT_PUBLIC_PRIVY_APP_ID to enable AA wallet syncing.'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
