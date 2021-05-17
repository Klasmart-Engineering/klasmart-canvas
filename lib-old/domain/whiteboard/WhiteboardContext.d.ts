import React, { MutableRefObject } from 'react';
import { IWhiteboardContext } from '../../interfaces/whiteboard-context/whiteboard-context';
import { IClearWhiteboardPermissions } from '../../interfaces/canvas-events/clear-whiteboard-permissions';
export declare const WhiteboardContext: React.Context<IWhiteboardContext>;
export declare const WhiteboardProvider: ({ children, clearWhiteboardPermissions, allToolbarIsEnabled, activeCanvas, userId, }: {
    children: React.ReactNode;
    clearWhiteboardPermissions: IClearWhiteboardPermissions;
    allToolbarIsEnabled: boolean;
    activeCanvas: MutableRefObject<string | null>;
    userId?: string | undefined;
}) => JSX.Element;
