import type { AuthVerifyRequest } from '../../domain/req/AuthVerifyRequest';
import type { AuthVerifyResponse } from '../../domain/res/AuthVerifyResponse';

export interface IVerifyAuthSignature {
    execute(req: AuthVerifyRequest): Promise<AuthVerifyResponse>;
}
