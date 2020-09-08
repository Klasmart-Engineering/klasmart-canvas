import React from 'react';
import { IWhiteboardContext } from '../../interfaces/whiteboard-context/whiteboard-context';
import { IWhiteboardPermissions } from '../../interfaces/canvas-events/whiteboard-permissions';
export declare const WhiteboardContext: React.Context<IWhiteboardContext>;
export declare const WhiteboardProvider: ({ children, permissions, }: {
    children: React.ReactNode;
    permissions: IWhiteboardPermissions;
}) => JSX.Element;
