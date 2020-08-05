import { ReactChildren, ReactChild, ReactElement } from "react";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
declare type Props = {
    children?: ReactChild | ReactChildren | null;
    style: CSSProperties;
    width: string;
    height: string;
    enablePointer?: boolean;
    filterUsers?: string[];
};
export declare function ShapeDrivenCanvas({ children, style, width, height, enablePointer, filterUsers }: Props): ReactElement;
export {};
