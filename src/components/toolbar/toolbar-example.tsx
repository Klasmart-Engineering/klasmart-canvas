import React, { ReactChild, ReactChildren, useCallback } from 'react';
import { useToolbarContext } from './toolbar-context-provider';

export type Props = {
    children?: ReactChild | ReactChildren | undefined;
};

export default function ToolbarExample({
    children,
}: Props): JSX.Element {

    const { state: { tools }, actions: { selectTool } } = useToolbarContext();

    const selectObjectEraser = useCallback(() => {
        const eraserOptions = tools.eraser.options;
        if (eraserOptions) {
            selectTool("eraser", eraserOptions[0]);
        }
    }, [selectTool, tools.eraser.options]);

    return (
        <div id="toolbar-example">
            <button onClick={() => selectTool("line")}>Pen</button>
            <button onClick={() => selectTool("text")}>Text</button>
            <button onClick={() => selectTool("shape")}>Shape</button>
            <button onClick={() => selectTool("fill")}>Fill</button>
            <button onClick={() => selectObjectEraser()}>Eraser (Object)</button>
            <button onClick={() => selectTool("move")}>Move</button>
            <button onClick={() => selectTool("pointer")}>Pointer</button>
            <button onClick={() => selectTool("select")}>Select</button>
            {children}
        </div>
    )
}