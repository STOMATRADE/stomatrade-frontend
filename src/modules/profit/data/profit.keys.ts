export const profitKeys = {
    all: ['profits'] as const,
    list: ['profits', 'list'] as const,
    detail: (id: string) => ['profits', 'detail', id] as const,
    byInvestment: (investmentId: string) => ['profits', 'investment', investmentId] as const,
    summary: ['profits', 'summary'] as const,
};
