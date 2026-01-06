'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useFarmersQuery } from '@/modules/farmers/data/farmers.query';

import CreateFarmerFlow from './CreateFarmerFlow';
import EditFarmerFlow from './EditFarmerFlow';
import DeleteFarmerDialog from './DeleteFarmerDialog';
import FarmerDetailDialog from './FarmerDetailDialog';
import SearchInput from '@/components/atoms/SearchInput';
import { useDebounce } from '@/core/hooks/useDebounce';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const parsePositiveInt = (value: string | null, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export default function FarmerPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedFarmer, setSelectedFarmer] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 2000);

    const page = parsePositiveInt(searchParams.get('page'), DEFAULT_PAGE);
    const limit = parsePositiveInt(searchParams.get('limit'), DEFAULT_LIMIT);

    const { data, isLoading, isError, error, refetch } = useFarmersQuery({
        page,
        limit,
        search: debouncedSearch || undefined
    });

    const handleCreateSuccess = () => {
        setIsCreateOpen(false);
        toast.success('Farmer created!');
        refetch();
    };

    const handleEditSuccess = () => {
        setIsEditOpen(false);
        setSelectedFarmer(null);
        toast.success('Farmer updated!');
        refetch();
    };

    const handleDeleteSuccess = () => {
        setIsDeleteOpen(false);
        setSelectedFarmer(null);
        toast.success('Farmer deleted!');
        refetch();
    };

    const openDetail = (farmer: any) => {
        setSelectedFarmer(farmer);
        setIsDetailOpen(true);
    };

    const openEdit = (farmer: any) => {
        setSelectedFarmer(farmer);
        setIsEditOpen(true);
    };

    const openDelete = (farmer: any) => {
        setSelectedFarmer(farmer);
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

    const farmers = data?.data ?? [];

    return (
        <main className="w-full max-w-[1440px] mx-auto">
            <section className="flex flex-col items-start pt-10 sm:pt-12 md:pt-14 pb-10 sm:pb-12 md:pb-16">
                <div className="bg-[#4ade8026] border border-[#4ade80] rounded-2xl px-4 py-2 mb-4 sm:mb-6 md:mb-[16px]">
                    <span className="text-xs sm:text-sm md:text-xs font-semibold leading-lg text-[#b4b4b4]">
                        Admin
                    </span>
                </div>
                <h1 className="text-[28px] sm:text-[35px] md:text-[50px] font-medium leading-[28px] sm:leading-[35px] md:leading-[50px] text-text-primary mb-3 sm:mb-4 md:mb-[12px]">
                    Farmer Directory
                </h1>
                <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder max-w-2xl">
                    Data mitra petani, lokasi, dan status program.
                </p>
            </section>

            <section className="bg-primary-elevated/70 border border-[#dedede10] rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Farmer List</h2>
                        <p className="text-sm text-text-placeholder mt-1">
                            Page {page} of {resolvedTotalPages} • Total {total || 0} farmers
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                        <div className="relative flex-1 md:w-80">
                            <SearchInput
                                placeholder="Search by name, NIK..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsCreateOpen(true)}
                                className="flex-1 md:flex-none bg-accent-green hover:bg-accent-green/80 text-black font-bold py-3 px-6 rounded-xl transition-all whitespace-nowrap shadow-lg shadow-accent-green/20 text-sm"
                            >
                                + Add Farmer
                            </button>
                            <div className="flex items-center gap-2 bg-primary-container/50 border border-white/5 rounded-xl px-3 py-1.5">
                                <span className="text-xs font-bold text-text-placeholder uppercase tracking-wider">Rows:</span>
                                <select
                                    value={limit}
                                    onChange={(event) => changeLimit(Number(event.target.value))}
                                    className="bg-transparent text-sm font-bold text-text-primary outline-none cursor-pointer"
                                >
                                    {[10, 20, 30, 50].map((size) => (
                                        <option key={size} value={size} className="bg-primary-elevated">
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.02] pb-4 custom-scrollbar">
                    <table className="w-full min-w-[1000px] text-left text-sm text-text-placeholder border-collapse">
                        <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] font-black text-text-placeholder/60">
                            <tr className="border-b border-white/5">
                                <th className="px-6 py-5">NIK</th>
                                <th className="px-6 py-5">Name</th>
                                <th className="px-6 py-5">Collector ID</th>
                                <th className="px-6 py-5">Address</th>
                                <th className="px-6 py-5 text-center">Status</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dedede10]">
                            {isLoading && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-text-placeholder">
                                        Loading farmers...
                                    </td>
                                </tr>
                            )}
                            {isError && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-red-300">
                                        {error?.message ?? 'Failed to load farmers.'}
                                    </td>
                                </tr>
                            )}
                            {!isLoading && !isError && farmers.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-text-placeholder">
                                        No farmers found.
                                    </td>
                                </tr>
                            )}
                            {farmers.map((farmer) => (
                                <tr key={farmer.id} className="text-text-primary hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs whitespace-nowrap">{farmer.nik}</td>
                                    <td className="px-6 py-4 font-bold whitespace-nowrap">{farmer.name}</td>
                                    <td className="px-4 py-4 font-mono text-[10px] text-text-placeholder whitespace-nowrap">
                                        {farmer.collectorId?.substring(0, 12)}...
                                    </td>
                                    <td className="px-6 py-4 max-w-[200px] truncate" title={farmer.address}>{farmer.address}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-[#4ade8026] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent-green border border-accent-green/20 whitespace-nowrap">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openDetail(farmer)}
                                                className="p-2 rounded-lg hover:bg-primary-container text-text-secondary hover:text-text-primary transition-colors"
                                                title="View Detail"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => openEdit(farmer)}
                                                className="p-2 rounded-lg hover:bg-primary-container text-text-secondary hover:text-text-primary transition-colors"
                                                title="Edit"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => openDelete(farmer)}
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

            <CreateFarmerFlow
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={handleCreateSuccess}
            />

            <EditFarmerFlow
                isOpen={isEditOpen}
                onClose={() => { setIsEditOpen(false); setSelectedFarmer(null); }}
                onSuccess={handleEditSuccess}
                farmer={selectedFarmer}
            />

            <DeleteFarmerDialog
                isOpen={isDeleteOpen}
                onClose={() => { setIsDeleteOpen(false); setSelectedFarmer(null); }}
                onSuccess={handleDeleteSuccess}
                farmer={selectedFarmer}
            />

            <FarmerDetailDialog
                isOpen={isDetailOpen}
                onClose={() => { setIsDetailOpen(false); setSelectedFarmer(null); }}
                farmer={selectedFarmer}
            />
        </main >
    );
}
