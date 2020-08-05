import React from 'react';
import './whiteboard.css';
export declare const WhiteboardContext: any;
export declare const WhiteboardProvider: ({ children, canvasId, canvasWidth, canvasHeight, toolbar, }: {
    children: React.ReactNode;
    canvasId: string;
    toolbar: React.ReactComponentElement<any, Pick<any, string | number | symbol>>;
    canvasWidth: string;
    canvasHeight: string;
}) => JSX.Element;
