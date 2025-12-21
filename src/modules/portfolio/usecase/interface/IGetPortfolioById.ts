import type { GetPortfolioByIdRequest } from '../../domain/req/GetPortfolioByIdRequest';
import type { PortfolioDetailResponse } from '../../domain/res/PortfolioDetailResponse';

export interface IGetPortfolioById {
    execute(request: GetPortfolioByIdRequest): Promise<PortfolioDetailResponse>;
}
