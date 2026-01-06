'use client';

import { useState, useMemo } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { decodeEventLog } from 'viem';
import { toast } from 'sonner';

import { useCollectorsQuery } from '@/modules/collectors/data/collectors.query';
import { useFarmersQuery } from '@/modules/farmers/data/farmers.query';
import { useLandsQuery } from '@/modules/lands/data/lands.query';
import { useCreateProjectMutation, useUpdateProjectMutation } from '@/modules/project/data/project.mutation';
import { useCreateProjectSubmissionMutation } from '@/modules/project-submissions/data/project-submissions.mutation';
import { STOMATRADE_ADDRESS, STOMATRADE_ABI } from '@/core/constant/blockchain';

import CrudModal from '@/components/organisms/CrudModal';
import FormField from '@/components/molecules/FormField';
import FormSelectField from '@/components/molecules/FormSelectField';
import Button from '@/components/atoms/Button';

interface CreateProjectFlowProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CreateProjectFlow({ isOpen, onClose, onSuccess }: CreateProjectFlowProps) {
    const { address } = useAccount();
    const [step, setStep] = useState(1);
    const [projectId, setProjectId] = useState<string | null>(null);
    const [txHash, setTxHash] = useState<`0x${string}` | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        commodity: '',
        volume: 0,
        sendDate: '',
        collectorId: '',
        farmerId: '',
        landId: '',
        valueProject: '',
        maxCrowdFunding: '',
        profitShare: 0,
    });

    const { data: collectors } = useCollectorsQuery({ page: 1, limit: 100 });
    const { data: farmers } = useFarmersQuery({ page: 1, limit: 100 });
    const { data: lands } = useLandsQuery({ page: 1, limit: 100 });

    const createProject = useCreateProjectMutation();
    const createSubmission = useCreateProjectSubmissionMutation();
    const updateProject = useUpdateProjectMutation();
    const { sendTransactionAsync } = useSendTransaction();

    const { data: receipt, isLoading: isWaitingForTx } = useWaitForTransactionReceipt({
        hash: txHash ?? undefined,
        query: { enabled: !!txHash }
    });

    // Convert data to select options with defensive checks
    const collectorData = Array.isArray(collectors?.data) ? collectors?.data ?? [] : [];
    const farmerData = Array.isArray(farmers?.data) ? farmers?.data ?? [] : [];
    const landData = Array.isArray(lands?.data) ? lands?.data ?? [] : [];

    const collectorOptions = collectorData.map((c: any) => ({ value: c.id, label: c.name }));
    const farmerOptions = farmerData.map((f: any) => ({ value: f.id, label: f.name }));
    const landOptions = landData.map((l: any) => ({ value: l.id, label: l.address }));

    useMemo(async () => {
        if (receipt && projectId) {
            try {
                const logs = decodeEventLog({
                    abi: STOMATRADE_ABI,
                    data: receipt.logs[0].data,
                    topics: receipt.logs[0].topics,
                });

                if (logs.eventName === 'ProjectCreated') {
                    const tokenId = Number(logs.args.idProject);
                    await updateProject.mutateAsync({ id: projectId, tokenId });
                    toast.success('Project created and synced on-chain!');
                    onSuccess?.();
                    onClose();
                }
            } catch (error) {
                console.error('Failed to sync project:', error);
                toast.error('Transaction succeeded but failed to sync with backend');
            }
        }
    }, [receipt, projectId]);

    const isPending = createProject.isPending || createSubmission.isPending || updateProject.isPending || isWaitingForTx;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) {
            toast.error('Please connect your wallet first');
            return;
        }

        try {
            // Step 1: Create Project Record
            const projectResponse = await createProject.mutateAsync({
                name: formData.name,
                commodity: formData.commodity,
                volume: formData.volume,
                sendDate: formData.sendDate,
                collectorId: formData.collectorId,
                farmerId: formData.farmerId,
                landId: formData.landId,
            });

            const newProjectId = projectResponse.project.id;
            setProjectId(newProjectId);
            setStep(2);

            // Step 2: Create Submission to get calldata
            const submissionResponse = await createSubmission.mutateAsync({
                projectId: newProjectId,
                valueProject: formData.valueProject,
                maxCrowdFunding: formData.maxCrowdFunding,
                sharedProfit: formData.profitShare,
                submittedBy: address,
            } as any);

            if (!(submissionResponse as any).encodedCalldata) {
                throw new Error('Failed to get transaction data from backend');
            }

            setStep(3);

            // Step 3: Sign Transaction
            const hash = await sendTransactionAsync({
                to: STOMATRADE_ADDRESS,
                data: (submissionResponse as any).encodedCalldata as `0x${string}`,
            });

            setTxHash(hash);
            setStep(4);
            toast.success('Transaction sent! Waiting for confirmation...');

        } catch (error: any) {
            console.error('Project creation failed:', error);
            toast.error(error.message || 'Failed to create project');
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <CrudModal isOpen={isOpen} onClose={onClose} title="Create New Project">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="Project Name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange('name')}
                    />
                    <FormField
                        label="Commodity"
                        type="text"
                        required
                        value={formData.commodity}
                        onChange={handleChange('commodity')}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="Volume (kg)"
                        type="number"
                        required
                        value={formData.volume}
                        onChange={handleChange('volume')}
                    />
                    <FormField
                        label="Send Date"
                        type="date"
                        required
                        value={formData.sendDate}
                        onChange={handleChange('sendDate')}
                    />
                </div>

                <div className="space-y-4 pt-4 border-t border-[#dedede10]">
                    <h3 className="text-lg font-medium text-text-primary">Submission & On-Chain Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormSelectField
                            label="Collector"
                            required
                            options={collectorOptions}
                            placeholder="Select Collector"
                            value={formData.collectorId}
                            onChange={handleChange('collectorId')}
                        />
                        <FormSelectField
                            label="Farmer"
                            required
                            options={farmerOptions}
                            placeholder="Select Farmer"
                            value={formData.farmerId}
                            onChange={handleChange('farmerId')}
                        />
                    </div>

                    <FormSelectField
                        label="Land"
                        required
                        options={landOptions}
                        placeholder="Select Land"
                        value={formData.landId}
                        onChange={handleChange('landId')}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Project Value (Wei)"
                            type="text"
                            required
                            placeholder="e.g. 1000000000000000000"
                            value={formData.valueProject}
                            onChange={handleChange('valueProject')}
                        />
                        <FormField
                            label="Max Funding (Wei)"
                            type="text"
                            required
                            placeholder="e.g. 1000000000000000000"
                            value={formData.maxCrowdFunding}
                            onChange={handleChange('maxCrowdFunding')}
                        />
                    </div>

                    <FormField
                        label="Profit Share (%)"
                        type="number"
                        required
                        value={formData.profitShare}
                        onChange={handleChange('profitShare')}
                    />
                </div>

                <div className="flex gap-4 mt-8">
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isPending} className="flex-1">
                        {isPending ? 'Processing...' : 'Create & Sign'}
                    </Button>
                </div>

                {step > 1 && (
                    <div className="mt-4 p-4 bg-accent-green/10 border border-accent-green/20 rounded-xl">
                        <p className="text-sm text-accent-green font-medium">
                            {step === 2 && 'Step 2/4: Submitting details to backend...'}
                            {step === 3 && 'Step 3/4: Please confirm transaction in your wallet...'}
                            {step === 4 && 'Step 4/4: Transaction sent! Waiting for block confirmation...'}
                        </p>
                    </div>
                )}
            </form>
        </CrudModal>
    );
}
