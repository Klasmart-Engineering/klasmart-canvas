import { CSSProperties, FunctionComponent, ReactChild, ReactChildren } from 'react';
import '../../assets/style/whiteboard.css';
import { IClearWhiteboardPermissions } from '../../interfaces/canvas-events/clear-whiteboard-permissions';
/**
 * @field instanceId: Unique ID for this canvas. This enables fabricjs canvas to know which target to use.
 * @field userId: The user's ID, events originating from this canvas will contain this ID.
 * @field style: How the canvas should be styled.
 * @field pointerEvents: Enable or disable pointer interaction.
 * @field width: The width of this canvas.
 * @field height: The height of this canvas.
 * @field filterUsers: Only render remote events originating from userId's in this list.
 */
export declare type Props = {
    children?: ReactChild | ReactChildren | null;
    instanceId: string;
    userId: string;
    initialStyle?: CSSProperties;
    pointerEvents: boolean;
    width?: string | number;
    height: string | number;
    cssWidth?: string | number;
    cssHeight?: string | number;
    filterUsers?: string[];
    clearWhiteboardPermissions: IClearWhiteboardPermissions;
};
export declare const WhiteboardCanvas: FunctionComponent<Props>;
