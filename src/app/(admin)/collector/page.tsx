'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useCollectorsQuery } from '@/modules/collectors/data/collectors.query';

import CreateCollectorFlow from './CreateCollectorFlow';
import EditCollectorFlow from './EditCollectorFlow';
import DeleteCollectorDialog from './DeleteCollectorDialog';
import SearchInput from '@/components/atoms/SearchInput';
import { useDebounce } from '@/core/hooks/useDebounce';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const parsePositiveInt = (value: string | null, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export default function CollectorPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCollector, setSelectedCollector] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 2000);

    const page = parsePositiveInt(searchParams.get('page'), DEFAULT_PAGE);
    const limit = parsePositiveInt(searchParams.get('limit'), DEFAULT_LIMIT);

    const { data, isLoading, isError, error, refetch } = useCollectorsQuery({
        page,
        limit,
        search: debouncedSearch || undefined
    });

    const handleCreateSuccess = () => {
        setIsCreateOpen(false);
        toast.success('Collector created!');
        refetch();
    };

    const handleEditSuccess = () => {
        setIsEditOpen(false);
        setSelectedCollector(null);
        toast.success('Collector updated!');
        refetch();
    };

    const handleDeleteSuccess = () => {
        setIsDeleteOpen(false);
        setSelectedCollector(null);
        toast.success('Collector deleted!');
        refetch();
    };

    const openEdit = (collector: any) => {
        setSelectedCollector(collector);
        setIsEditOpen(true);
    };

    const openDelete = (collector: any) => {
        setSelectedCollector(collector);
        setIsDeleteOpen(true);
    };

    const meta = data?.meta;
    const total = typeof meta?.total === 'number' ? meta.total : undefined;
    const totalPages = typeof meta?.totalPages === 'number' ? meta.totalPages : undefined;
    const resolvedTotalPages = useMemo(() => {
        if (typeof totalPages === 'number' && totalPages > 0) return totalPages;
        if (typeof total === 'number' && total > 0) return Math.max(1, Math.ceil(total / limit));
        return 1;
    }, [limit, total, totalPages]);

    const createQueryString = (nextPage: number, nextLimit: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(nextPage));
        params.set('limit', String(nextLimit));
        return params.toString();
    };

    const goToPage = (nextPage: number) => {
        const query = createQueryString(nextPage, limit);
        router.push(`${pathname}?${query}`);
    };

    const changeLimit = (nextLimit: number) => {
        const query = createQueryString(1, nextLimit);
        router.push(`${pathname}?${query}`);
    };

    const pageNumbers = useMemo(() => {
        const windowSize = 5;
        const totalPagesSafe = resolvedTotalPages;
        const start = Math.max(1, page - Math.floor(windowSize / 2));
        const end = Math.min(totalPagesSafe, start + windowSize - 1);
        const adjustedStart = Math.max(1, end - windowSize + 1);
        const pages = [];
        for (let i = adjustedStart; i <= end; i += 1) {
            pages.push(i);
        }
        return pages;
    }, [page, resolvedTotalPages]);

    const collectors = data?.data ?? [];

    return (
        <main className="w-full max-w-[1440px] mx-auto">
            <section className="flex flex-col items-start pt-10 sm:pt-12 md:pt-14 pb-10 sm:pb-12 md:pb-16">
                <div className="bg-[#4ade8026] border border-[#4ade80] rounded-2xl px-4 py-2 mb-4 sm:mb-6 md:mb-[16px]">
                    <span className="text-xs sm:text-sm md:text-xs font-semibold leading-lg text-[#b4b4b4]">
                        Admin
                    </span>
                </div>
                <h1 className="text-[28px] sm:text-[35px] md:text-[50px] font-medium leading-[28px] sm:leading-[35px] md:leading-[50px] text-text-primary mb-3 sm:mb-4 md:mb-[12px]">
                    Collector Directory
                </h1>
                <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder max-w-2xl">
                    Pantau daftar collector, wilayah kerja, dan status verifikasi.
                </p>
            </section>

            <section className="bg-primary-elevated/70 border border-[#dedede10] rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-text-primary">Collector List</h2>
                        <p className="text-sm text-text-placeholder">
                            Page {page} of {resolvedTotalPages}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <SearchInput
                            placeholder="Search by name, NIK..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64"
                        />
                        <button
                            onClick={() => setIsCreateOpen(true)}
                            className="bg-accent-green hover:bg-accent-green/80 text-black font-semibold py-2 px-6 rounded-xl transition-all whitespace-nowrap"
                        >
                            Add Collector
                        </button>
                        <div className="flex items-center gap-2 text-sm text-text-placeholder">
                            <span>Rows:</span>
                            <select
                                value={limit}
                                onChange={(event) => changeLimit(Number(event.target.value))}
                                className="bg-primary-container border border-[#dedede1f] rounded-lg px-3 py-2 text-text-primary"
                            >
                                {[10, 20, 30, 50].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#dedede10]">
                    <table className="min-w-full text-left text-sm text-text-placeholder">
                        <thead className="bg-primary-container/70 text-xs uppercase tracking-wide text-text-secondary">
                            <tr>
                                <th className="px-4 py-3">NIK</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">User ID</th>
                                <th className="px-4 py-3">Address</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dedede10]">
                            {isLoading && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-text-placeholder">
                                        Loading collectors...
                                    </td>
                                </tr>
                            )}
                            {isError && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-red-300">
                                        {error?.message ?? 'Failed to load collectors.'}
                                    </td>
                                </tr>
                            )}
                            {!isLoading && !isError && collectors.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-text-placeholder">
                                        No collectors found.
                                    </td>
                                </tr>
                            )}
                            {collectors.map((collector) => (
                                <tr key={collector.id} className="text-text-primary">
                                    <td className="px-4 py-3 font-medium">{collector.nik}</td>
                                    <td className="px-4 py-3">{collector.name}</td>
                                    <td className="px-4 py-3">{collector.userId}</td>
                                    <td className="px-4 py-3">{collector.address}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${collector.deleted
                                                ? 'bg-red-500/20 text-red-300'
                                                : 'bg-[#4ade8026] text-accent-green'
                                                }`}
                                        >
                                            {collector.deleted ? 'Inactive' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEdit(collector)}
                                                className="p-2 rounded-lg hover:bg-primary-container text-text-secondary hover:text-text-primary transition-colors"
                                                title="Edit"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => openDelete(collector)}
                                                className="p-2 rounded-lg hover:bg-red-500/20 text-text-secondary hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
                    <button
                        type="button"
                        onClick={() => goToPage(Math.max(1, page - 1))}
                        disabled={page <= 1}
                        className="rounded-xl border border-[#dedede10] px-4 py-2 text-sm font-semibold text-text-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-2">
                        {pageNumbers.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                type="button"
                                onClick={() => goToPage(pageNumber)}
                                className={`h-9 w-9 rounded-xl text-sm font-semibold transition-colors ${pageNumber === page
                                    ? 'bg-accent-green text-black'
                                    : 'bg-primary-container text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => goToPage(Math.min(resolvedTotalPages, page + 1))}
                        disabled={page >= resolvedTotalPages}
                        className="rounded-xl border border-[#dedede10] px-4 py-2 text-sm font-semibold text-text-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </section>

            <CreateCollectorFlow
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={handleCreateSuccess}
            />

            <EditCollectorFlow
                isOpen={isEditOpen}
                onClose={() => { setIsEditOpen(false); setSelectedCollector(null); }}
                onSuccess={handleEditSuccess}
                collector={selectedCollector}
            />

            <DeleteCollectorDialog
                isOpen={isDeleteOpen}
                onClose={() => { setIsDeleteOpen(false); setSelectedCollector(null); }}
                onSuccess={handleDeleteSuccess}
                collector={selectedCollector}
            />
        </main>
    );
}
