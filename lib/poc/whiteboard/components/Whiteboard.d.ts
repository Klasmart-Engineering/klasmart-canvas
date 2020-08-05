import { ReactChild, ReactNode } from "react";
declare type Props = {
    children?: ReactChild | ReactNode | null;
    containerWidth?: string | number;
    containerHeight?: string | number;
    height: string | number;
    filterUsers?: string[];
};
export declare function Whiteboard({ children, containerWidth, containerHeight, height, filterUsers }: Props): JSX.Element;
export {};
