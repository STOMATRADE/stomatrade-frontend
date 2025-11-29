import { SignInPanel } from '@/components/SignInPanel';

export default function SignInPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <div className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-8 shadow-glow">
        <p className="badge">Sign in</p>
        <h1 className="mt-3 font-abhaya-libre text-4xl text-white">Authenticate and mint your AA wallet</h1>
        <p className="mt-2 max-w-3xl text-gray-300">
          Use Privy to onboard with socials or email. Embedded wallets are spun up automatically, then RainbowKit keeps
          you connected across Stomatrade surfaces.
        </p>
      </div>
      <SignInPanel />
    </div>
  );
}
