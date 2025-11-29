import { Hero } from '@/components/Hero';

const pillars = [
  {
    title: 'What we do',
    bullets: [
      'Financial access for farmer groups and collectors with traceability and transparency.',
      'Stablecoin rails (IDRX) to bridge investors to real-world agricultural yields.',
      'On-chain operations so buyers get reliable supply and verified legality.',
    ],
  },
  {
    title: 'Why it matters',
    bullets: [
      'Farmers and collectors need fast cash; banks are slow and restrictive.',
      'Buyers need compliant, traceable supply with clear payment terms.',
      'Sustainability data unlocks certification and global market entry.',
    ],
  },
];

const problems = [
  'Not enough liquidity for farmers and collectors.',
  'Limited traceability and farmer databases.',
  'Payment terms and legality hurdles slow down deals.',
  'Buyers wait for supply; collectors lack capital; farmers need cash now.',
];

const solutions = [
  'Tokenize real-world agricultural yields as collateral.',
  'Privy + RainbowKit onboarding for investors; IDRX payments and returns.',
  'Traceable supply chain with contracts, verification, and MRV data.',
  'Stomatrade advances up to 75% of yield value; buyers pay out 100% to settle.',
];

const flow = [
  { title: 'Apply & verify', body: 'Collectors apply; Stomatrade verifies collateral, legality, and farmer yields.' },
  { title: 'Invest', body: 'Investors fund with IDRX; Stomatrade disburses up to 75% to collectors.' },
  { title: 'Deliver & track', body: 'Collectors deliver to buyers; traceability + contracts recorded for compliance.' },
  { title: 'Settle & share', body: 'Buyer pays 100% to Stomatrade; returns + profit share are distributed.' },
];

const opportunities = [
  { label: 'TAM', value: '$8B+ worldwide agriculture RWA ecosystem' },
  { label: 'SAM', value: '$1.23B early-stage Asia agriculture' },
  { label: 'SOM', value: '$410M beachhead in Indonesia' },
];

const revenues = [
  'Transaction fees on platform services.',
  'Profit sharing between users, platform, and investors.',
  'Future token-based access and community incentives.',
];

const roadmap = [
  { phase: 'Foundation', timeframe: 'Q4 2025', focus: 'Data onboarding, identity, platform dev' },
  { phase: 'MRV', timeframe: 'Q1–Q2 2026', focus: 'Farmer/collector verification, first public MRV dataset' },
  { phase: 'Tokenization', timeframe: 'Q3–Q4 2026', focus: 'Mint farmer NFTs, DeFi user sales strategy' },
  { phase: 'Scaling', timeframe: '2027', focus: '7,000 farmers, DAO, expansion' },
  { phase: 'Global infra', timeframe: '2028+', focus: 'Multichain, regional leadership' },
];

const goToMarket = [
  'Phase 1: Launch pilot with 1,000 farmers.',
  'Phase 2: Token utility – tokenize supply + offset contracts.',
  'Phase 3: Scale to 7,000 farmers across Indonesia.',
  'Phase 4: Expand to 21k farmers; DAO governance and liquidity pools.',
];

const edges = [
  'Deep Web3 understanding and RWA-focused investor alignment.',
  'Practical downstream business network with collectors and buyers.',
  'Real transaction data + verified on-ground operators for transparency.',
];

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12">
      <Hero />

      <section className="grid gap-6 md:grid-cols-2">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="glass-panel rounded-3xl border border-[#1f1f1f] p-6 shadow-glow">
            <p className="badge">{pillar.title}</p>
            <ul className="mt-4 space-y-2 text-gray-200">
              {pillar.bullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-8 shadow-glow">
        <p className="badge">Problem → Solution</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-white">Pain points</h3>
            <ul className="mt-3 space-y-2 text-gray-300">
              {problems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-secondaryGreen" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">How we solve</h3>
            <ul className="mt-3 space-y-2 text-gray-300">
              {solutions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[#1f1f1f] bg-bg/80 p-8 shadow-glow">
        <p className="badge">How it works</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {flow.map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#1f1f1f] bg-secondaryBg/70 p-4">
              <p className="text-sm uppercase tracking-[0.15em] text-primary">{item.title}</p>
              <p className="mt-2 text-gray-200">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-6 shadow-glow">
          <p className="badge">Opportunity</p>
          <ul className="mt-4 space-y-2 text-gray-200">
            {opportunities.map((item) => (
              <li key={item.label} className="flex justify-between border-b border-[#1f1f1f] pb-2 last:border-none last:pb-0">
                <span className="font-semibold text-white">{item.label}</span>
                <span className="text-gray-300">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-6 shadow-glow">
          <p className="badge">Business model</p>
          <ul className="mt-4 space-y-2 text-gray-200">
            {revenues.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-6 shadow-glow">
          <p className="badge">Edges</p>
          <ul className="mt-4 space-y-2 text-gray-200">
            {edges.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-secondaryGreen" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-6 shadow-glow">
          <p className="badge">Roadmap</p>
          <div className="mt-4 space-y-3">
            {roadmap.map((item) => (
              <div key={item.phase} className="rounded-2xl border border-[#1f1f1f] bg-bg/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-primary">{item.phase}</p>
                <p className="text-gray-400">{item.timeframe}</p>
                <p className="mt-1 text-gray-200">{item.focus}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-6 shadow-glow">
          <p className="badge">Go-to-market</p>
          <ul className="mt-4 space-y-2 text-gray-200">
            {goToMarket.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
