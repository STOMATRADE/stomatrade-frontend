'use client';

import CrudModal from '@/components/organisms/CrudModal';
import type { InvestmentEntity } from '@/modules/investment/domain/entity/InvestmentEntity';
import CopyButton from '@/components/atoms/CopyButton';
import { toast } from 'sonner';

interface InvestmentDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    investment: InvestmentEntity | null;
    chainId?: number;
}

export default function InvestmentDetailDialog({
    isOpen,
    onClose,
    investment,
    chainId = 0
}: InvestmentDetailDialogProps) {
    if (!investment) return null;

    const details = [
        {
            label: 'Investor Name',
            value: (investment as any).user?.name || 'Investor',
            copyable: false
        },
        {
            label: 'Wallet Address',
            value: (investment as any).user?.walletAddress || investment.userId,
            copyable: true
        },
        {
            label: 'Amount Invested',
            value: `Rp ${Number(investment.amount).toLocaleString()}`,
            copyable: false
        },
        {
            label: 'Investment Status',
            value: investment.status,
            copyable: false
        },
        {
            label: 'Transaction Hash (TX ID)',
            value: investment.id,
            copyable: true
        },
        {
            label: 'Contract Address',
            value: '0x3785265Ab13B765B62017367Bcb1Ebc387920803', // Placeholder or from constant
            copyable: true
        },
        {
            label: 'Chain ID',
            value: chainId.toString(),
            copyable: false
        },
        {
            label: 'Created At',
            value: new Date(investment.createdAt).toLocaleString(),
            copyable: false
        },
    ];

    const handleExplorerRedirect = () => {
        toast.info(`TODO: Redirect to Explorer for Chain ID ${chainId}. TX: ${investment.id}`);
    };

    return (
        <CrudModal
            isOpen={isOpen}
            onClose={onClose}
            title="Investment Details"
        >
            <div className="space-y-8">
                <div className="grid grid-cols-1 gap-y-5">
                    {details.map((detail, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 last:border-0 hover:bg-white/[0.01] transition-colors px-2 rounded-lg">
                            <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-placeholder/60">
                                    {detail.label}
                                </span>
                                <span className={`text-sm font-semibold text-text-primary break-all leading-relaxed ${detail.copyable ? 'font-mono text-xs opacity-90' : ''}`}>
                                    {detail.value}
                                </span>
                            </div>
                            {detail.copyable && (
                                <CopyButton text={detail.value} />
                            )}
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleExplorerRedirect}
                        className="w-full bg-accent-green hover:bg-accent-green/80 text-black font-bold py-4 px-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-green/20 flex items-center justify-center gap-3 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
                            <path d="M15 3h6v6" />
                            <path d="M10 14 21 3" />
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                        View on Block Explorer
                    </button>
                    <p className="text-[10px] text-center text-text-placeholder mt-3 uppercase tracking-widest font-black opacity-40">
                        Redirect logic based on Chain ID {chainId}
                    </p>
                </div>
            </div>
        </CrudModal>
    );
}
