import type { PortfolioByProjectRequest } from '../../repository/interface/PortfolioRepository';
import type { PortfolioDetailResponse } from '../../domain/res/PortfolioDetailResponse';

export interface IGetPortfolioByProject {
    execute(request: PortfolioByProjectRequest): Promise<PortfolioDetailResponse>;
}
