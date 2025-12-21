export const ROUTES = {
    home: '/',
    about: '/about',
    staking: '/staking',
    auth: {
        signIn: '/sign-in',
        signUp: '/sign-up',
        register: '/sign-up',
        forgotPassword: '/forgot-password',
        resetPassword: '/reset-password',
    },
    admin: {
        dashboard: '/dashboard',
        project: '/project',
        farmer: '/farmer',
        user: '/user',
    },
} as const;
