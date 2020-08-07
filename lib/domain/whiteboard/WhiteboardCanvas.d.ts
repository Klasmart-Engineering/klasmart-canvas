import { CSSProperties, FunctionComponent, ReactChild, ReactChildren } from 'react';
/**
 * @field instanceId: Unique ID for this canvas. This enables fabricjs canvas to know which target to use.
 * @field userId: The user's ID, events originating from this canvas will contain this ID.
 * @field wrapperStyle: How the canvas wrapper should be styled.
 * @field lowerCanvasStyle: How the lower canvas should be styled.
 * @field upperCanvasStyle: How the upper canvas should be styled.
 * @field pointerEvents: Enable or disable pointer interaction.
 * @field width: The width of this canvas.
 * @field height: The height of this canvas.
 * @field filterUsers: Only render remote events originating from userId's in this list.
 */
export declare type Props = {
    children?: ReactChild | ReactChildren | null | any;
    instanceId: string;
    userId: string;
    initialStyle?: CSSProperties;
    pointerEvents: boolean;
    width?: string | number;
    height: string | number;
    cssWidth?: string | number;
    cssHeight?: string | number;
    filterUsers?: string[];
};
export declare const WhiteboardCanvas: FunctionComponent<Props>;
