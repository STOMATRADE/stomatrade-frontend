import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#1f1f1f] bg-gradient-to-br from-secondaryBg via-bg to-bg p-10 shadow-glow">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,_rgba(0,196,39,0.2),transparent_60%)]" />
        <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="badge">Stomatrade • 2025</div>
          <h1 className="text-balance font-abhaya-libre text-5xl leading-tight text-white sm:text-6xl">
            Traceable agriculture supply through real-world asset tokenization
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">
            Empowering farmer groups, collectors, and buyers with faster access to capital, transparent yield flows, and
            on-chain traceability for sustainable agriculture.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/dashboard" className="btn-primary">
              Explore dashboard
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-full border border-[#1f1f1f] px-6 py-3 text-base font-semibold text-gray-100 transition hover:border-primary hover:text-primary"
            >
              Sign in to Stomatrade
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-2 rounded-full border border-[#1f1f1f] bg-secondaryBg px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              RWA-Fi rails with WalletConnect
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#1f1f1f] bg-secondaryBg px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-secondaryGreen" />
              Privy AA + RainbowKit UX
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full border border-primary/40" />
          <div className="absolute -bottom-10 -right-12 h-32 w-32 rounded-full border border-secondaryGreen/30" />
          <div className="relative overflow-hidden rounded-3xl border border-[#1f1f1f] bg-secondaryBg/80 p-4 shadow-lg backdrop-blur">
            <Image
              src="/nature-hero.svg"
              alt="Nature inspired illustration"
              width={780}
              height={620}
              className="h-full w-full rounded-2xl object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
