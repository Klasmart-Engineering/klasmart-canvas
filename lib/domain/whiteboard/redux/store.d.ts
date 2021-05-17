/**
 * Redux store
 */
declare const store: import("redux").Store<import("redux").CombinedState<{
    permissionsState: never;
    usersState: never;
    canvasBoardState: {
        shape: any;
        resize: boolean;
        startPoint: {
            x: number;
            y: number;
        };
    } | {
        startPoint: any;
        resize: boolean;
        shape: import("../../../interfaces/shapes/shapes").TypedShape | null;
    };
    potfolioReducer: import("../../../interfaces/portfolio/portfolio").IPortfolio[];
}>, {
    type: string;
    payload: boolean | import("../../../interfaces/permissions/permissions").IPermissions;
} | {
    type: string;
    payload: import("../../../interfaces/user/user").IUser | import("../../../interfaces/user/user").IUser[];
} | {
    type: string;
    payload?: any;
} | {
    type: string;
    payload: import("../../../interfaces/portfolio/portfolio").INewStamp;
}>;
export default store;
