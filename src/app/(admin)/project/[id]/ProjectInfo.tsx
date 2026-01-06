'use client';

import type { ProjectDetailInfoResponse } from '@/modules/project/domain/res/ProjectDetailInfoResponse';

interface ProjectInfoProps {
    data: ProjectDetailInfoResponse | undefined;
}

export default function ProjectInfo({ data }: ProjectInfoProps) {
    if (!data) return null;

    const { project } = data;

    // Helper to render a section of details
    const InfoSection = ({ title, info }: { title: string; info: { label: string; value: any }[] }) => (
        <div className="bg-primary-container/30 backdrop-blur-md border border-white/5 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 mb-6 sm:mb-8 transition-all hover:border-white/10 group shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-6 sm:mb-8 flex items-center gap-3">
                <div className="w-1.5 h-5 sm:h-6 bg-accent-green rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                {info.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-placeholder opacity-60">
                            {item.label}
                        </span>
                        <div className="text-base font-semibold text-text-primary leading-relaxed break-words">
                            {item.value || <span className="text-text-placeholder/30 italic font-normal">Not specified</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const projectDetails = [
        { label: 'Funding Goal', value: `Rp ${project.totalInvestment?.toLocaleString() || '0'}` },
        { label: 'Expected Return', value: `${project.expectedReturn || '0'}%` },
        { label: 'Status', value: project.status },
        { label: 'Created Date', value: new Date(project.createdAt).toLocaleDateString() },
        { label: 'Description', value: project.description },
    ];

    // Attempt to extract related entities if they exist in the response
    const farmer = (data as any).farmer;
    const collector = (data as any).collector;
    const land = (data as any).land;
    const product = (data as any).product;

    return (
        <div className="space-y-6">
            <InfoSection title="General Information" info={projectDetails} />

            {farmer && (
                <InfoSection
                    title="Farmer Details"
                    info={[
                        { label: 'Name', value: farmer.name },
                        { label: 'NIK', value: farmer.nik },
                        { label: 'Address', value: farmer.address },
                    ]}
                />
            )}

            {collector && (
                <InfoSection
                    title="Collector Details"
                    info={[
                        { label: 'Name', value: collector.name },
                        { label: 'NIK', value: collector.nik },
                        { label: 'Address', value: collector.address },
                    ]}
                />
            )}

            {land && (
                <InfoSection
                    title="Land Information"
                    info={[
                        { label: 'Location', value: land.address || land.location },
                        { label: 'Area', value: `${land.area || '-'} m²` },
                        { label: 'Owner', value: land.ownerName || '-' },
                    ]}
                />
            )}

            {product && (
                <InfoSection
                    title="Product Details"
                    info={[
                        { label: 'Name', value: product.name },
                        { label: 'Type', value: product.type },
                        { label: 'Estimated Yield', value: product.estimatedYield || '-' },
                    ]}
                />
            )}
        </div>
    );
}
