'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useProjectsQuery } from '@/modules/project/data/project.query';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const parsePositiveInt = (value: string | null, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export default function ProjectPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = parsePositiveInt(searchParams.get('page'), DEFAULT_PAGE);
    const limit = parsePositiveInt(searchParams.get('limit'), DEFAULT_LIMIT);

    const { data, isLoading, isError, error } = useProjectsQuery({ page, limit });

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

    const projects = Array.isArray(data?.items) ? data.items : [];

    return (
        <main className="w-full max-w-[1440px] mx-auto">
            <section className="flex flex-col items-start pt-10 sm:pt-12 md:pt-14 pb-10 sm:pb-12 md:pb-16">
                <div className="bg-[#4ade8026] border border-[#4ade80] rounded-2xl px-4 py-2 mb-4 sm:mb-6 md:mb-[16px]">
                    <span className="text-xs sm:text-sm md:text-xs font-semibold leading-lg text-[#b4b4b4]">
                        Admin
                    </span>
                </div>
                <h1 className="text-[28px] sm:text-[35px] md:text-[50px] font-medium leading-[28px] sm:leading-[35px] md:leading-[50px] text-text-primary mb-3 sm:mb-4 md:mb-[12px]">
                    Project Management
                </h1>
                <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder max-w-2xl">
                    Kelola proyek pertanian dan status pendanaan.
                </p>
            </section>

            <section className="bg-primary-elevated/70 border border-[#dedede10] rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-text-primary">Project List</h2>
                        <p className="text-sm text-text-placeholder">
                            Page {page} of {resolvedTotalPages}
                        </p>
                    </div>
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

                <div className="overflow-x-auto rounded-2xl border border-[#dedede10]">
                    <table className="min-w-full text-left text-sm text-text-placeholder">
                        <thead className="bg-primary-container/70 text-xs uppercase tracking-wide text-text-secondary">
                            <tr>
                                <th className="px-4 py-3">Project Name</th>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Investment</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dedede10]">
                            {isLoading && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-text-placeholder">
                                        Loading projects...
                                    </td>
                                </tr>
                            )}
                            {isError && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-red-300">
                                        {error?.message ?? 'Failed to load projects.'}
                                    </td>
                                </tr>
                            )}
                            {!isLoading && !isError && projects.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-text-placeholder">
                                        No projects found.
                                    </td>
                                </tr>
                            )}
                            {projects.map((project) => (
                                <tr key={project.id} className="text-text-primary">
                                    <td className="px-4 py-3 font-medium">{project.name}</td>
                                    <td className="px-4 py-3">{project.id.substring(0, 8)}...</td>
                                    <td className="px-4 py-3">Rp {project.totalInvestment.toLocaleString()}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                                project.status === 'ACTIVE'
                                                    ? 'bg-[#4ade8026] text-accent-green'
                                                    : project.status === 'COMPLETED'
                                                    ? 'bg-blue-500/20 text-blue-300'
                                                    : 'bg-yellow-500/20 text-yellow-300'
                                            }`}
                                        >
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{new Date(project.createdAt).toLocaleDateString()}</td>
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
                                className={`h-9 w-9 rounded-xl text-sm font-semibold transition-colors ${
                                    pageNumber === page
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
        </main>
    );
}
