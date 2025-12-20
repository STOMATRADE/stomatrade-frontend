export type AppErrorOptions = {
    message: string;
    status?: number;
    code?: string;
    details?: unknown;
};

/**
 * Standardized application error.
 */
export class AppError extends Error {
    status?: number;
    code?: string;
    details?: unknown;

    constructor({ message, status, code, details }: AppErrorOptions) {
        super(message);
        this.name = 'AppError';
        this.status = status;
        this.code = code;
        this.details = details;
    }
}
