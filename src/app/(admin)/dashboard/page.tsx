'use client';

import { useMemo, useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

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
    const chartProjects = useMemo(
        () => [
            { name: 'Jan', value: 8 },
            { name: 'Feb', value: 12 },
            { name: 'Mar', value: 10 },
            { name: 'Apr', value: 15 },
            { name: 'May', value: 18 },
            { name: 'Jun', value: 22 },
        ],
        []
    );
    const chartInvestments = useMemo(
        () => [
            { name: 'Jan', value: 320 },
            { name: 'Feb', value: 410 },
            { name: 'Mar', value: 380 },
            { name: 'Apr', value: 520 },
            { name: 'May', value: 610 },
            { name: 'Jun', value: 720 },
        ],
        []
    );
    const chartUsers = useMemo(
        () => [
            { name: 'Mon', value: 1240 },
            { name: 'Tue', value: 1320 },
            { name: 'Wed', value: 1410 },
            { name: 'Thu', value: 1580 },
            { name: 'Fri', value: 1690 },
            { name: 'Sat', value: 1760 },
            { name: 'Sun', value: 1840 },
        ],
        []
    );
    const tableData = useMemo<Record<TabKey, TableRow[]>>(() => {
        const statuses = ['Active', 'Review', 'Pending', 'Onboard', 'Completed', 'Processing'];
        const projects = [
            'Green Valley',
            'Sustainable Rice',
            'Cocoa Revival',
            'Palm Renewal',
            'Agro Hills',
            'Rainforest Cacao',
            'Organic Spice',
            'Riverland Seeds',
            'Highland Coffee',
            'Coastal Coconut',
        ];
        const investors = [
            'Sentosa Capital',
            'Awan Invest',
            'Tumbuh Bersama',
            'Nusantara Fund',
            'Lestari Partners',
            'Raya Growth',
            'Kencana Equity',
            'Bumi Capital',
            'Sagara Ventures',
            'Merah Putih Holdings',
        ];
        const farmets = [
            'Koperasi Mekar',
            'Tani Lestari',
            'Agro Mandiri',
            'Sawah Sejahtera',
            'Petani Jaya',
            'Mitra Kebun',
            'Sumber Pangan',
            'Kampung Tani',
            'Bersama Makmur',
            'Hijau Lestari',
        ];
        const investments = [
            'Seed Funding',
            'Farming Tools',
            'Irigasi Pintar',
            'Greenhouse Expansion',
            'Storage Upgrade',
            'Processing Line',
            'Organic Fertilizer',
            'Supply Chain',
            'Renewable Energy',
            'Training Program',
        ];

        const buildRows = (prefix: string, names: string[]): TableRow[] =>
            Array.from({ length: 24 }, (_, index) => {
                const value = 120 + (index + 1) * 18;
                return {
                    id: `${prefix}-${(1200 + index).toString().padStart(4, '0')}`,
                    name: `${names[index % names.length]} ${index + 1}`,
                    status: statuses[index % statuses.length],
                    amount: `Rp ${value}M`,
                    updated: `${(index % 7) + 1}d ago`,
                };
            });

        return {
            project: buildRows('PRJ', projects),
            investor: buildRows('INV', investors),
            investment: buildRows('TX', investments),
            farmet: buildRows('FRM', farmets),
        };
    }, []);

    const totalRows = tableData[activeTab].length;
    const totalPages = Math.ceil(totalRows / pageSize);
    const currentPage = pageByTab[activeTab];
    const pagedRows = tableData[activeTab].slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const goToPage = (tab: TabKey, page: number) => {
        setPageByTab((prev) => ({
            ...prev,
            [tab]: Math.min(Math.max(1, page), totalPages || 1),
        }));
    };

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

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-4 pb-8 sm:pb-10 md:pb-12">
                <div className="bg-primary-container rounded-xl p-6 sm:p-8 border border-[#4ade8010]">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Penambahan Project
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">+12</p>
                    <p className="text-xs text-text-placeholder mt-2">30 hari terakhir</p>
                    <div className="mt-4 h-36">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartProjects}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                                <XAxis dataKey="name" stroke="#707070" tickLine={false} axisLine={false} />
                                <YAxis stroke="#707070" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #2b2b2b' }}
                                    labelStyle={{ color: '#eaeaea' }}
                                    itemStyle={{ color: '#43ff87' }}
                                />
                                <Bar dataKey="value" fill="#43ff87" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-primary-container rounded-xl p-6 sm:p-8 border border-[#4ade8010]">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Penambahan Investasi
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">+Rp 820M</p>
                    <p className="text-xs text-text-placeholder mt-2">30 hari terakhir</p>
                    <div className="mt-4 h-36">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartInvestments}>
                                <defs>
                                    <linearGradient id="investmentsFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#43ff87" stopOpacity={0.35} />
                                        <stop offset="100%" stopColor="#43ff87" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                                <XAxis dataKey="name" stroke="#707070" tickLine={false} axisLine={false} />
                                <YAxis stroke="#707070" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #2b2b2b' }}
                                    labelStyle={{ color: '#eaeaea' }}
                                    itemStyle={{ color: '#43ff87' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#43ff87"
                                    fill="url(#investmentsFill)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-primary-container rounded-xl p-6 sm:p-8 border border-[#4ade8010]">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Growth User
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">+8.4%</p>
                    <p className="text-xs text-text-placeholder mt-2">bulan berjalan</p>
                    <div className="mt-4 h-36">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartUsers}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                                <XAxis dataKey="name" stroke="#707070" tickLine={false} axisLine={false} />
                                <YAxis stroke="#707070" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #2b2b2b' }}
                                    labelStyle={{ color: '#eaeaea' }}
                                    itemStyle={{ color: '#43ff87' }}
                                />
                                <Line type="monotone" dataKey="value" stroke="#43ff87" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-4 pb-10 sm:pb-12 md:pb-16">
                <div className="bg-primary-elevated rounded-xl p-6 sm:p-8 border border-[#4ade8010]">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Total Data
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">24,830</p>
                    <p className="text-xs text-accent-green mt-2">+3.2% minggu ini</p>
                </div>
                <div className="bg-primary-elevated rounded-xl p-6 sm:p-8 border border-[#4ade8010]">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Active Projects
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">48</p>
                    <p className="text-xs text-accent-green mt-2">+6 proyek baru</p>
                </div>
                <div className="bg-primary-elevated rounded-xl p-6 sm:p-8 border border-[#4ade8010]">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Total Investment
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">Rp 6.8B</p>
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
                            {pagedRows.map((row) => (
                                <tr key={row.id} className="border-b border-[#dedede10] text-sm text-text-secondary">
                                    <td className="py-3 pr-4 text-text-primary font-semibold">{row.id}</td>
                                    <td className="py-3 pr-4">{row.name}</td>
                                    <td className="py-3 pr-4">
                                        <span className="px-2 py-1 rounded-full bg-primary-container text-text-primary text-xs">
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="py-3 pr-4">{row.amount}</td>
                                    <td className="py-3">{row.updated}</td>
                                </tr>
                            ))}
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
