const features = [
  {
    title: 'Adaptive UI',
    description: 'Shared typography and spacing across landing, sign-in, and dashboard for a unified feel.',
  },
  {
    title: 'Wallet-first',
    description: 'RainbowKit + Privy AA wallet support with WalletConnect project ID hooks baked in.',
  },
  {
    title: 'Reactive data',
    description: 'React Query as the data layer for balances, portfolio, and activity streams.',
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="glass-panel h-full rounded-2xl border border-[#1f1f1f] p-6 shadow-glow transition hover:-translate-y-1"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{feature.title}</p>
          <p className="mt-3 text-base text-gray-300">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
