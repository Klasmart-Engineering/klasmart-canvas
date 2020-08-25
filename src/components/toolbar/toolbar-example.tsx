import React, { ReactChild, ReactChildren } from 'react';
import { useToolbarContext } from './toolbar-context-provider';

export type Props = {
    children?: ReactChild | ReactChildren | undefined;
};

export default function ToolbarExample({
    children,
}: Props): JSX.Element {

    const { actions: { selectTool } } = useToolbarContext();

    return (
        <div id="toolbar-example">
            <button onClick={() => selectTool("line")}>Pen</button>
            <button onClick={() => selectTool("text")}>Text</button>
            <button onClick={() => selectTool("shape")}>Shape</button>
            <button onClick={() => selectTool("fill")}>Fill</button>
            {children}
        </div>
    )
}