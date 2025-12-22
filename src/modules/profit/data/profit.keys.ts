export const profitKeys = {
    all: ['profits'] as const,
    pools: ['profits', 'pools'] as const,
    byProject: (projectId: string) => ['profits', 'project', projectId] as const,
    byUser: (userId: string) => ['profits', 'user', userId] as const,
    deposit: ['profits', 'deposit'] as const,
    claim: ['profits', 'claim'] as const,
};
