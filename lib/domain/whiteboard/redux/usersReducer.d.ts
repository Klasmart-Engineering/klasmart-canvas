import { IUser } from '../../../interfaces/user/user';
/**
 * Reducer
 * @param state Redux state
 * @param action Action
 */
export declare function usersReducer(state: IUser[] | undefined, action: {
    type: string;
    payload: IUser | IUser[];
}): IUser | IUser[];
