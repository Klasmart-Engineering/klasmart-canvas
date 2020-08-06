import { FunctionComponent, ReactChild, ReactChildren } from 'react';
export declare type Props = {
    children?: ReactChild | ReactChildren | null | any;
    instanceId: string;
    userId: string;
    pointerEvents: boolean;
    display: boolean;
    width?: string | number;
    height: string | number;
    filterUsers?: string[];
};
export declare const WhiteboardCanvas: FunctionComponent<Props>;
