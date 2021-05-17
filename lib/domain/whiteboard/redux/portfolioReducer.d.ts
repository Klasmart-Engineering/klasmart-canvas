import { INewStamp, IPortfolio } from '../../../interfaces/portfolio/portfolio';
/**
 * Reducer
 * @param state Redux state
 * @param action Action
 */
export declare function portfolioReducer(state: IPortfolio[] | undefined, action: {
    type: string;
    payload: INewStamp;
}): IPortfolio[];
