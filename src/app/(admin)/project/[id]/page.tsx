'use client';

import { useMemo, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { encodeFunctionData } from 'viem';
import { toast } from 'sonner';
import { useProjectFullDetailQuery } from '@/modules/project/data/project.query';
import { useUpdateProjectMutation } from '@/modules/project/data/project.mutation';
import { useMarkRefundableMutation } from '@/modules/refunds/data/refunds.mutation';
import { useDepositProfitMutation } from '@/modules/profit/data/profit.mutation';
import { STOMATRADE_ADDRESS, STOMATRADE_ABI } from '@/core/constant/blockchain';
import ProjectInfo from './ProjectInfo';
import ProjectInvestments from './ProjectInvestments';

type TabType = 'info' | 'investment';

export default function ProjectDetailPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { address } = useAccount();
    const [activeTab, setActiveTab] = useState<TabType>('info');
    const [actionTxHash, setActionTxHash] = useState<`0x${string}` | null>(null);

    const { data: fullData, isLoading, isError, error, refetch } = useProjectFullDetailQuery(id);
    const updateProject = useUpdateProjectMutation();
    const { sendTransactionAsync } = useSendTransaction();

    const markRefundable = useMarkRefundableMutation({
        onSuccess: () => {
            toast.success('Project marked as refundable!');
            refetch();
        },
        onError: (err) => {
            console.error('Refund failed:', err);
            toast.error(err.message || 'Failed to refund project');
        }
    });

    const depositProfit = useDepositProfitMutation({
        onSuccess: () => {
            toast.success('Withdrawal (WD) processed successfully!');
            refetch();
        },
        onError: (err) => {
            console.error('Withdrawal failed:', err);
            toast.error(err.message || 'Failed to process withdrawal');
        }
    });

    const { data: receipt, isLoading: isWaitingForTx } = useWaitForTransactionReceipt({
        hash: actionTxHash ?? undefined,
        query: {
            enabled: !!actionTxHash,
        }
    });

    useEffect(() => {
        if (receipt && actionTxHash) {
            setActionTxHash(null);
            toast.success('Transaction confirmed! Syncing with backend...');
            refetch();
        }
    }, [receipt, actionTxHash, refetch]);

    const tabs = [
        { id: 'info', label: 'Project Info' },
        { id: 'investment', label: 'Investment List' },
    ];

    const project = fullData?.project;

    const handleProjectAction = async (action: 'closeProject' | 'refundProject' | 'withdrawProject' | 'finishProject') => {
        // Handle Refund via Backend API
        if (action === 'refundProject') {
            await markRefundable.mutateAsync({ projectId: id });
            return;
        }

        // Handle WD (Withdrawal) via Backend API
        if (action === 'withdrawProject') {
            await depositProfit.mutateAsync({
                projectId: id,
                amount: project?.totalInvestment?.toString() || '0'
            });
            return;
        }

        // For Close and Finish, use direct blockchain calls
        if (!address) {
            toast.error('Please connect your wallet first');
            return;
        }

        const tokenId = project?.tokenId;
        if (tokenId === undefined) {
            toast.error('On-chain Project ID (token ID) not found');
            return;
        }

        try {
            const data = encodeFunctionData({
                abi: STOMATRADE_ABI,
                functionName: action,
                args: [BigInt(tokenId)],
            });

            const hash = await sendTransactionAsync({
                to: STOMATRADE_ADDRESS,
                data,
            });

            setActionTxHash(hash);
            toast.success(`Transaction sent for ${action}! Waiting for confirmation...`);
        } catch (err: any) {
            console.error(`${action} failed:`, err);
            toast.error(err.message || `Failed to execute ${action}`);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-green"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Project</h2>
                    <p className="text-text-secondary mb-6">{error?.message ?? 'Something went wrong.'}</p>
                    <button
                        onClick={() => router.back()}
                        className="bg-primary-container hover:bg-white/10 text-white font-semibold py-2 px-6 rounded-xl transition-all"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const isPending = isWaitingForTx || markRefundable.isPending || depositProfit.isPending;

    return (
        <main className="w-full max-w-[1440px] mx-auto pb-20 px-4 sm:px-6 lg:px-8">
            {/* Header / Breadcrumb */}
            <section className="flex flex-col items-start pt-10 sm:pt-12 md:pt-14 pb-8 sm:pb-10">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-text-placeholder hover:text-text-primary transition-colors mb-6 group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span>Back to Projects</span>
                </button>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="bg-accent-green/20 text-accent-green px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-accent-green/30">
                                {project?.status ?? 'ACTIVE'}
                            </span>
                            <span className="text-text-placeholder text-[10px] sm:text-sm font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">ID: {id.substring(0, 8)}...</span>
                            {project?.tokenId !== undefined && (
                                <span className="text-accent-green/70 text-[10px] sm:text-sm font-mono">Chain ID: {project.tokenId}</span>
                            )}
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mt-2">
                            {project?.name ?? 'Project Detail'}
                        </h1>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <button
                            onClick={() => handleProjectAction('closeProject')}
                            disabled={isPending || project?.status === 'COMPLETED'}
                            className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 sm:px-6 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => handleProjectAction('refundProject')}
                            disabled={isPending}
                            className="flex-1 sm:flex-none bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 sm:px-6 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {markRefundable.isPending ? '...' : 'Refund'}
                        </button>
                        <button
                            onClick={() => handleProjectAction('withdrawProject')}
                            disabled={isPending}
                            className="flex-1 sm:flex-none bg-accent-green/10 hover:bg-accent-green/20 text-accent-green border border-accent-green/20 px-4 sm:px-6 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {depositProfit.isPending ? '...' : 'WD'}
                        </button>
                        <button
                            onClick={() => handleProjectAction('finishProject')}
                            disabled={isPending || project?.status === 'COMPLETED'}
                            className="w-full sm:w-auto bg-accent-green hover:bg-accent-green/80 text-black px-4 sm:px-6 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent-green/20 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Finish Project
                        </button>
                    </div>
                </div>
            </section>

            {/* Redesigned Tabs Navigation - Glassmorphism Pill Style */}
            <div className="flex justify-start mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-hide">
                <div className="inline-flex p-1.5 bg-primary-container/40 backdrop-blur-xl border border-[#dedede10] rounded-[22px] shadow-2xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`relative px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-[18px] transition-all duration-300 z-10 whitespace-nowrap ${activeTab === tab.id
                                ? 'text-black'
                                : 'text-text-placeholder hover:text-text-secondary'
                                }`}
                        >
                            <span className="relative z-10">{tab.label}</span>
                            {activeTab === tab.id && (
                                <div className="absolute inset-0 bg-accent-green rounded-[18px] shadow-[0_0_20px_rgba(74,222,128,0.3)] animate-in fade-in zoom-in-95 duration-300"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                {activeTab === 'info' ? (
                    <ProjectInfo data={fullData} />
                ) : (
                    <ProjectInvestments projectId={id} />
                )}
            </div>

            {isWaitingForTx && (
                <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-right-full">
                    <div className="bg-primary-container border border-accent-green/30 p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-accent-green"></div>
                        <p className="text-sm font-medium text-text-primary">Processing blockchain transaction...</p>
                    </div>
                </div>
            )}
        </main>
    );
}

