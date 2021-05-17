import React, { CSSProperties, ReactChild, ReactChildren } from 'react';
import '../../assets/style/whiteboard.css';
import { IClearWhiteboardPermissions } from '../../interfaces/canvas-events/clear-whiteboard-permissions';
import { ScaleMode } from './utils/useFixedAspectScaling';
import { IPermissions } from '../../interfaces/permissions/permissions';
/**
 * @field instanceId: Unique ID for this canvas.
 * This enables fabricjs canvas to know which target to use.
 * @field userId: The user's ID,
 * events originating from this canvas will contain this ID.
 * @field style: How the canvas should be styled.
 * @field pointerEvents: Enable or disable pointer interaction.
 * @field pixelWidth: The width of this canvas buffer in pixels.
 * @field pixelHeight: The height of this canvas buffer in pixels.
 * @field filterUsers: Only render remote events
 * originating from userId's in this list.
 * @field scaleMode: Determines how the canvas should scale
 * if parent element doesn't match aspect ratio.
 * @field onCanvasCreated: Is called when canvas changes from undefined
 * to fabric canvas element
 */
export declare type Props = {
    children?: ReactChild | ReactChildren | null;
    instanceId: string;
    userId: string;
    initialStyle?: CSSProperties;
    pointerEvents: boolean;
    pixelWidth: number;
    pixelHeight: number;
    filterUsers?: string[];
    clearWhiteboardPermissions: IClearWhiteboardPermissions;
    scaleMode?: ScaleMode;
    display?: boolean;
    permissions: IPermissions;
    updatePermissions: (tool: string, payload: boolean) => void;
    onCanvasCreated: (status: boolean) => void;
};
declare const _default: import("react-redux").ConnectedComponent<React.FunctionComponent<Props>, any>;
export default _default;
