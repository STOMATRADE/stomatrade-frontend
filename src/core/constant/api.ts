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
        byId: (id: string) => v(`/projects/${id}`),
    },

    /** ================= INVESTMENTS ================= */
    investments: {
        root: v('/investments'),
        byId: (id: string) => v(`/investments/${id}`),
        byProject: (projectId: string) => v(`/investments/project/${projectId}`),
        my: v('/investments/my'),
        profit: (investmentId: string) => v(`/investments/${investmentId}/profit`),
    },

    /** ================= PORTFOLIO ================= */
    portfolio: {
        root: v('/portfolio'),
        byId: (id: string) => v(`/portfolio/${id}`),
        summary: v('/portfolio/summary'),
        performance: v('/portfolio/performance'),
    },
} as const;
