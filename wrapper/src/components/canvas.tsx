import React, { createRef, useEffect, useState } from 'react';

export const Canvas = (props: any) => {
    const { user } = props;
    let [ ref, setRef] = useState<any>();

    useEffect(() => {
        if (ref && user) {
            setTimeout(() => {
                ref.contentWindow.postMessage({ message: 'user', value: user }, '*');
            }, 500);
        }
        
    }, [ref, user])

    return (
        <iframe ref={(frame) => { setRef(frame) }} title="canvas" src="http://localhost:3000" width="100%" height="100%"></iframe>
    )
}