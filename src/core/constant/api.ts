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
} as const;