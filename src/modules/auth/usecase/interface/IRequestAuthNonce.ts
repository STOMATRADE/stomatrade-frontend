import type { AuthNonceRequest } from '../../domain/req/AuthNonceRequest';
import type { AuthNonceResponse } from '../../domain/res/AuthNonceResponse';

export interface IRequestAuthNonce {
    execute(req: AuthNonceRequest): Promise<AuthNonceResponse>;
}
