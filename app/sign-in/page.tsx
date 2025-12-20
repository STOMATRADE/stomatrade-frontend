import { SignInPanel } from '@/components/SignInPanel';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/80 p-8 shadow-glow">
          <p className="badge">Sign in</p>
          <h1 className="mt-3 font-abhaya-libre text-4xl text-white">Authenticate and mint your AA wallet</h1>
          <p className="mt-3 text-gray-300">
            Join Stomatrade with Privy—social or email login spins up an embedded AA wallet, and RainbowKit keeps you
            connected to Lisk Sepolia instantly.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-gray-300">
            <div className="flex items-center gap-2 rounded-2xl border border-[#1f1f1f] bg-bg/70 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Wallet-first onboarding for collectors, farmers, investors.
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-[#1f1f1f] bg-bg/70 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-secondaryGreen" />
              Auto-connect to Lisk Sepolia; chain guard enforces the correct network.
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-[#1f1f1f] bg-bg/70 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Single experience for landing, dashboard, and admin flows.
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/60 p-6 shadow-glow">
          <div className="relative overflow-hidden rounded-2xl border border-[#1f1f1f] bg-bg/70">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondaryGreen/5 to-transparent" />
            <Image
              src="/nature-hero.svg"
              alt="Nature inspired illustration"
              width={800}
              height={600}
              className="h-full w-full object-cover opacity-90"
              priority
            />
          </div>
        </div>
      </div>
      <SignInPanel />
    </div>
  );
}
