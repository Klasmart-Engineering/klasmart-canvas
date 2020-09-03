import React from 'react';
import { IWhiteboardContext } from '../../interfaces/whiteboard-context/whiteboard-context';
import { IClearWhiteboardPermissions } from '../../interfaces/canvas-events/clear-whiteboard-permissions';
export declare const WhiteboardContext: React.Context<IWhiteboardContext>;
export declare const WhiteboardProvider: ({ children, clearWhiteboardPermissions, }: {
    children: React.ReactNode;
    clearWhiteboardPermissions: IClearWhiteboardPermissions;
}) => JSX.Element;
