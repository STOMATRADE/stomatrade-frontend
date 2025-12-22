'use client';

import { useState } from 'react';
import { useProjectsQuery } from '@/modules/project/data/project.query';
import { useUsersQuery } from '@/modules/users/data/users.query';
import { useInvestmentsQuery } from '@/modules/investment/data/investment.query';
import { useFarmersQuery } from '@/modules/farmers/data/farmers.query';

type TabKey = 'project' | 'investor' | 'investment' | 'farmet';

type TableRow = {
    id: string;
    name: string;
    status: string;
    amount: string;
    updated: string;
};

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<TabKey>('project');
    const [pageByTab, setPageByTab] = useState<Record<TabKey, number>>({
        project: 1,
        investor: 1,
        investment: 1,
        farmet: 1,
    });
    const pageSize = 8;

    // Fetch data from APIs
    const { data: projectsData, isLoading: projectsLoading } = useProjectsQuery({ page: 1, limit: 100 });
    const { data: usersData, isLoading: usersLoading } = useUsersQuery({ page: 1, limit: 100 });
    const { data: investmentsData, isLoading: investmentsLoading } = useInvestmentsQuery({});
    const { data: farmersData, isLoading: farmersLoading } = useFarmersQuery({ page: 1, limit: 100 });

    // Calculate statistics
    const totalProjects = (projectsData?.meta?.total ?? 0) as number;
    const totalUsers = (usersData?.meta?.total ?? 0) as number;
    const totalInvestments = (investmentsData?.data?.length ?? 0) as number;
    const totalFarmers = (farmersData?.meta?.total ?? 0) as number;

    // Format table data based on active tab
    const getTableData = () => {
        switch (activeTab) {
            case 'project':
                if (!projectsData?.items) return [];
                return projectsData.items.map((project, index) => ({
                    id: project.id,
                    name: project.name,
                    status: project.status,
                    amount: `Rp ${(project.totalInvestment / 1000000).toFixed(0)}M`,
                    updated: new Date(project.createdAt).toLocaleDateString(),
                }));
            case 'investor':
                if (!usersData?.data) return [];
                return usersData.data
                    .filter(user => user.role === 'INVESTOR')
                    .map((user, index) => ({
                        id: user.id,
                        name: user.walletAddress.substring(0, 10) + '...',
                        status: user.deleted ? 'Inactive' : 'Active',
                        amount: 'Rp 0M',
                        updated: new Date(user.createdAt).toLocaleDateString(),
                    }));
            case 'investment':
                if (!investmentsData?.data) return [];
                return investmentsData.data.map((investment, index) => ({
                    id: investment.id,
                    name: investment.projectId,
                    status: investment.status,
                    amount: `Rp ${(investment.amount / 1000000).toFixed(0)}M`,
                    updated: new Date(investment.createdAt).toLocaleDateString(),
                }));
            case 'farmet':
                if (!farmersData?.data) return [];
                return farmersData.data.map((farmer, index) => ({
                    id: farmer.id,
                    name: farmer.name,
                    status: farmer.deleted ? 'Inactive' : 'Active',
                    amount: 'Rp 0M',
                    updated: new Date(farmer.createdAt).toLocaleDateString(),
                }));
            default:
                return [];
        }
    };

    const tableData = getTableData();
    const totalRows = tableData.length;
    const totalPages = Math.ceil(totalRows / pageSize);
    const currentPage = pageByTab[activeTab];
    const pagedRows = tableData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const goToPage = (tab: TabKey, page: number) => {
        setPageByTab((prev) => ({
            ...prev,
            [tab]: Math.min(Math.max(1, page), totalPages || 1),
        }));
    };

    // Calculate active projects
    const activeProjects = projectsData?.items?.filter(p => p.status === 'ACTIVE').length || 0;

    // Calculate total investment amount
    const totalInvestmentAmount = investmentsData?.data?.reduce((sum, inv) => sum + inv.amount, 0) || 0;

    return (
        <main className="w-full max-w-[1440px] mx-auto">
            <section className="flex flex-col items-start pt-10 sm:pt-12 md:pt-14 pb-8 sm:pb-10 md:pb-12">
                <div className="bg-[#4ade8026] border border-[#4ade80] rounded-2xl px-4 py-2 mb-4 sm:mb-6 md:mb-[16px]">
                    <span className="text-xs sm:text-sm md:text-xs font-semibold leading-lg text-[#b4b4b4]">
                        Admin
                    </span>
                </div>
                <h1 className="text-[28px] sm:text-[35px] md:text-[50px] font-medium leading-[28px] sm:leading-[35px] md:leading-[50px] text-text-primary mb-3 sm:mb-4 md:mb-[12px]">
                    Dashboard Overview
                </h1>
                <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder max-w-2xl">
                    Ringkasan singkat aktivitas platform untuk admin.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-4 pb-10 sm:pb-12 md:pb-16">
                <div className="bg-primary-elevated rounded-xl p-6 sm:p-8 border border-[#4ade8010]">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Total Data
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">{totalProjects + totalUsers + totalInvestments + totalFarmers}</p>
                    <p className="text-xs text-accent-green mt-2">+3.2% minggu ini</p>
                </div>
                <div className="bg-primary-elevated rounded-xl p-6 sm:p-8 border border-[#4ade8010]">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Active Projects
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">{activeProjects}</p>
                    <p className="text-xs text-accent-green mt-2">+6 proyek baru</p>
                </div>
                <div className="bg-primary-elevated rounded-xl p-6 sm:p-8 border border-[#4ade8010]">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Total Investment
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">Rp {(totalInvestmentAmount / 1000000000).toFixed(1)}B</p>
                    <p className="text-xs text-accent-green mt-2">+12% QoQ</p>
                </div>
            </section>

            <section className="bg-primary-elevated rounded-2xl p-6 sm:p-8 border border-[#4ade8010] mb-16 sm:mb-20 md:mb-24">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-text-primary">General Table</h2>
                        <p className="text-sm text-text-placeholder">Ringkasan data per tab.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {([
                            { key: 'project', label: 'Project' },
                            { key: 'investor', label: 'Investor' },
                            { key: 'investment', label: 'Investment' },
                            { key: 'farmet', label: 'Farmet' },
                        ] as const).map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => {
                                    setActiveTab(tab.key);
                                    setPageByTab((prev) => ({ ...prev, [tab.key]: 1 }));
                                }}
                                className={
                                    activeTab === tab.key
                                        ? 'px-4 py-2 rounded-xl bg-primary-container text-text-primary text-sm font-semibold'
                                        : 'px-4 py-2 rounded-xl text-text-secondary text-sm font-semibold hover:bg-primary-container'
                                }
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs uppercase text-text-placeholder border-b border-[#dedede10]">
                                <th className="py-3 pr-4">ID</th>
                                <th className="py-3 pr-4">Name</th>
                                <th className="py-3 pr-4">Status</th>
                                <th className="py-3 pr-4">Amount</th>
                                <th className="py-3">Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectsLoading || usersLoading || investmentsLoading || farmersLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-6 text-center text-text-placeholder">
                                        Loading data...
                                    </td>
                                </tr>
                            ) : tableData.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-6 text-center text-text-placeholder">
                                        No data found.
                                    </td>
                                </tr>
                            ) : (
                                pagedRows.map((row) => (
                                    <tr key={row.id} className="border-b border-[#dedede10] text-sm text-text-secondary">
                                        <td className="py-3 pr-4 text-text-primary font-semibold">{row.id.substring(0, 8)}...</td>
                                        <td className="py-3 pr-4">{row.name}</td>
                                        <td className="py-3 pr-4">
                                            <span className="px-2 py-1 rounded-full bg-primary-container text-text-primary text-xs">
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">{row.amount}</td>
                                        <td className="py-3">{row.updated}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
                    <p className="text-xs text-text-placeholder">
                        Showing {(currentPage - 1) * pageSize + 1}-
                        {Math.min(currentPage * pageSize, totalRows)} of {totalRows}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => goToPage(activeTab, currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="px-3 py-2 rounded-lg text-xs font-semibold text-text-secondary bg-primary-container disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => goToPage(activeTab, page)}
                                className={
                                    page === currentPage
                                        ? 'px-3 py-2 rounded-lg text-xs font-semibold text-text-primary bg-primary-accent'
                                        : 'px-3 py-2 rounded-lg text-xs font-semibold text-text-secondary bg-primary-container'
                                }
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => goToPage(activeTab, currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="px-3 py-2 rounded-lg text-xs font-semibold text-text-secondary bg-primary-container disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
