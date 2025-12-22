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
        root: v('/portfolio'),
        byId: (id: string) => v(`/portfolio/${id}`),
        summary: v('/portfolio/summary'),
    },

    /** ================= PROFITS ================= */
    profits: {
        pools: v('/profits/pools'),
        byProject: (projectId: string) => v(`/profits/project/${projectId}`),
        byUser: (userId: string) => v(`/profits/user/${userId}`),
        deposit: v('/profits/deposit'),
        claim: v('/profits/claim'),
    },

    /** ================= PROJECT SUBMISSIONS ================= */
    projectSubmissions: {
        root: v('/project-submissions'),
        byId: (id: string) => v(`/project-submissions/${id}`),
        approve: (id: string) => v(`/project-submissions/${id}/approve`),
        reject: (id: string) => v(`/project-submissions/${id}/reject`),
    },

    /** ================= REFUNDS ================= */
    refunds: {
        markRefundable: v('/refunds/mark-refundable'),
        claim: v('/refunds/claim'),
        byProject: (projectId: string) => v(`/refunds/project/${projectId}`),
        byUser: (userId: string) => v(`/refunds/user/${userId}`),
    },

    /** ================= USER DASHBOARD ================= */
    userDashboard: {
        cash: (userId: string) => v(`/user-dashboard/${userId}/cash`),
        assets: (userId: string) => v(`/user-dashboard/${userId}/assets`),
        total: (userId: string) => v(`/user-dashboard/${userId}/total`),
    },

    /** ================= BUYERS ================= */
    buyers: {
        root: v('/buyers'),
        byId: (id: string) => v(`/buyers/${id}`),
        history: {
            root: v('/buyers/history'),
            byBuyer: (buyerId: string) => v(`/buyers/${buyerId}/history`),
        },
    },

    /** ================= FARMER SUBMISSIONS ================= */
    farmerSubmissions: {
        root: v('/farmer-submissions'),
        byId: (id: string) => v(`/farmer-submissions/${id}`),
        approve: (id: string) => v(`/farmer-submissions/${id}/approve`),
        reject: (id: string) => v(`/farmer-submissions/${id}/reject`),
    },

    /** ================= FILES ================= */
    files: {
        root: v('/files'),
        byId: (id: string) => v(`/files/${id}`),
    },

    /** ================= LANDS ================= */
    lands: {
        root: v('/lands'),
        byId: (id: string) => v(`/lands/${id}`),
        byFarmer: (farmerId: string) => v(`/lands/farmer/${farmerId}`),
    },

    /** ================= NOTIFICATIONS ================= */
    notifications: {
        root: v('/notifications'),
        byId: (id: string) => v(`/notifications/${id}`),
        channels: {
            root: v('/notifications/channels'),
            byId: (id: string) => v(`/notifications/channels/${id}`),
        },
        tokens: {
            root: v('/notifications/tokens'),
            byId: (id: string) => v(`/notifications/tokens/${id}`),
            byUser: (userId: string) => v(`/notifications/users/${userId}/tokens`),
        },
    },
} as const;
