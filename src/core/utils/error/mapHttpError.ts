import { AppError } from './AppError';

/**
 * Normalize unknown errors into AppError.
 */
export const mapHttpError = (error: unknown): AppError => {
    if (error instanceof AppError) {
        return error;
    }
    if (error instanceof Response) {
        return new AppError({
            message: error.statusText || 'Request failed',
            status: error.status,
        });
    }
    if (error instanceof Error) {
        return new AppError({ message: error.message });
    }
    if (typeof error === 'string') {
        return new AppError({ message: error });
    }
    return new AppError({ message: 'Unknown error' });
};
