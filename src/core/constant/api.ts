export const PROXY_BASE_URL = '/api/proxy'
export const API_PREFIX = ''
export const API_VERSION = ''

const v = (path: string) => `${API_VERSION}${path}`;

export const API_ROUTES = {
    /** ================= AUTH ================= */
    auth: {
        nonce: v('/auth/nonce'),
        verify: v('/auth/verify'),
        profile: v('/auth/profile'),
        refresh: v('/auth/refresh'),
        register: v('/auth/register'),
    },

    /** ================= USERS ================= */
    users: {
        root: v('/users'),
        byId: (id: string) => v(`/users/${id}`),
    },

    /** ================= COLLECTORS ================= */
    collectors: {
        root: v('/collectors'),
        byId: (id: string) => v(`/collectors/${id}`),
    },

    /** ================= FARMERS ================= */
    farmers: {
        root: v('/farmers'),
        byId: (id: string) => v(`/farmers/${id}`),
        byCollector: (collectorId: string) =>
            v(`/farmers/collector/${collectorId}`),
    },

    /** ================= PROJECTS ================= */
    projects: {
        root: v('/projects'),
        ongoing: v('/projects/ongoing'),
        byFarmer: (farmerId: string) => v(`/projects/farmer/${farmerId}`),
        byLand: (landId: string) => v(`/projects/land/${landId}`),
        byId: (id: string) => v(`/projects/${id}`),
        detail: (id: string) => v(`/projects/${id}/detail`),
    },

    /** ================= INVESTMENTS ================= */
    investments: {
        root: v('/investments'),
        byId: (id: string) => v(`/investments/${id}`),
        projectStats: (projectId: string) => v(`/investments/project/${projectId}/stats`),
    },

    /** ================= PORTFOLIO ================= */
    portfolio: {
        stats: v('/portfolios/stats'),
        topInvestors: v('/portfolios/top-investors'),
        all: v('/portfolios/all'),
        byUser: (userId: string) => v(`/portfolios/user/${userId}`),
    },

    /** ================= PROFITS ================= */
    profits: {
        pools: v('/profits/pools'),
        byProject: (projectId: string) => v(`/profits/project/${projectId}`),
        byUser: (userId: string) => v(`/profits/user/${userId}`),
        deposit: v('/profits/deposit'),
        claim: v('/profits/claim'),
    },
} as const;
