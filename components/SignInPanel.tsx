'use client';

import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const privyEnabled =
  Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID) &&
  !String(process.env.NEXT_PUBLIC_PRIVY_APP_ID).startsWith('YOUR_');

export function SignInPanel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!privyEnabled) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-8 text-gray-300 shadow-glow">
        <p className="badge">Sign in</p>
        <h1 className="mt-3 font-abhaya-libre text-3xl text-white">Privy not configured</h1>
        <p className="mt-2">Set NEXT_PUBLIC_PRIVY_APP_ID in .env to enable AA login.</p>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-8 shadow-glow">
        <div className="h-6 w-24 rounded bg-tertiaryBg" />
        <div className="mt-4 h-8 w-64 rounded bg-tertiaryBg" />
      </div>
    );
  }

  const { login, logout, ready, authenticated, user } = usePrivy();

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-8 shadow-glow backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="badge">Privy AA</span>
        <span className="text-sm text-gray-400">Embedded wallet &amp; social login ready</span>
      </div>
      <h1 className="mt-4 font-abhaya-libre text-4xl text-white">Sign in to Stomatrade</h1>
      <p className="mt-2 max-w-2xl text-gray-300">
        Continue with Privy to spin up an embedded AA wallet, then connect with RainbowKit for seamless dapp actions.
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={authenticated ? logout : login}
          disabled={!ready}
          className="btn-primary w-full sm:w-auto"
        >
          {authenticated ? 'Sign out' : 'Sign in with Privy'}
        </button>
        <div className="flex w-full justify-start sm:w-auto">
          <ConnectButton chainStatus="icon" accountStatus="address" showBalance={false} />
        </div>
      </div>

      {user ? (
        <div className="mt-6 grid gap-4 rounded-2xl border border-[#1f1f1f] bg-bg/60 p-4 text-sm text-gray-200">
          <div className="flex flex-wrap gap-2 text-gray-300">
            <span className="font-semibold text-white">User:</span>
            <span>{user.id}</span>
          </div>
          {user.wallet?.address ? (
            <div className="flex flex-wrap gap-2 text-gray-300">
              <span className="font-semibold text-white">Embedded wallet:</span>
              <span className="text-primary">{user.wallet.address}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
