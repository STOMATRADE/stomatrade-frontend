'use client';

import { useInvestmentsQuery } from '@/modules/investment/data/investment.query';

interface ProjectInvestmentsProps {
    projectId: string;
}

export default function ProjectInvestments({ projectId }: ProjectInvestmentsProps) {
    const { data, isLoading, isError, error } = useInvestmentsQuery({ projectId });

    const investments = data?.data || [];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-green"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                <p className="text-red-400">Failed to load investments: {error?.message}</p>
            </div>
        );
    }

    return (
        <div className="bg-primary-container/30 backdrop-blur-md border border-white/5 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-xl">
            <div className="p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-6 sm:mb-8 flex items-center gap-3">
                    <div className="w-1.5 h-5 sm:h-6 bg-accent-green rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                    Investment List
                </h2>

                <div className="w-full overflow-x-auto rounded-[20px] sm:rounded-[24px] border border-white/5 bg-white/[0.02] pb-4 custom-scrollbar touch-scroll">
                    <table className="w-full min-w-[900px] text-left text-sm border-collapse">
                        <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] font-black text-text-placeholder/60">
                            <tr className="border-b border-white/5">
                                <th className="px-8 py-5">Investor (User ID)</th>
                                <th className="px-8 py-5 text-right">Amount</th>
                                <th className="px-8 py-5 text-center">Status</th>
                                <th className="px-8 py-5 text-right">Date</th>
                                <th className="px-8 py-5 text-right">Transaction</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {investments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-16 text-center text-text-placeholder italic opacity-50">
                                        No investments found for this project.
                                    </td>
                                </tr>
                            ) : (
                                investments.map((inv) => (
                                    <tr key={inv.id} className="text-text-primary hover:bg-white/5 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-sm whitespace-nowrap">{(inv as any).user?.name || 'Investor'}</span>
                                                <span className="font-mono text-[10px] text-text-placeholder/60 break-all leading-tight">
                                                    {(inv as any).user?.walletAddress || inv.userId}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right whitespace-nowrap">
                                            <span className="text-base font-bold text-accent-green antialiased">
                                                Rp {Number(inv.amount).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${inv.status === 'ACTIVE'
                                                ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                                                : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right font-medium text-text-secondary whitespace-nowrap">
                                            {new Date(inv.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-5 text-right font-mono text-[10px] text-text-placeholder/40 group-hover:text-text-placeholder/80 transition-colors whitespace-nowrap">
                                            {inv.id.substring(0, 12)}...
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {investments.length > 0 && (
                    <div className="mt-8 sm:mt-10 p-6 sm:p-8 bg-accent-green/5 rounded-[20px] sm:rounded-[24px] border border-accent-green/10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                        <div className="flex flex-col gap-1 text-center sm:text-left">
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent-green/60">Accumulated Funding</span>
                            <span className="text-text-placeholder text-xs sm:text-sm font-medium">{investments.length} Active Investors</span>
                        </div>
                        <span className="text-xl sm:text-2xl md:text-4xl font-black text-accent-green tracking-tight leading-none break-all text-center">
                            Rp {investments.reduce((sum, inv) => sum + Number(inv.amount), 0).toLocaleString()}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
