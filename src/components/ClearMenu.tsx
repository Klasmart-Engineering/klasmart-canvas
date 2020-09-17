import React, { useContext } from 'react';
import { WhiteboardContext } from '../domain/whiteboard/WhiteboardContext';

export default function ClearMenu() {

    const { clear, clearSelf } = useContext(WhiteboardContext);

    return <>
        {/*: Should work for student and teacher */ }
        <button onClick = {() => clearSelf()}>
            Clear My self
        </button>
        {/*: Should work only for teacher */ }
        <button onClick = {() => clear()}>
            Clear All
        </button>
        {/*: Should work only for teacher */ }
        <button onClick = {() => clear(['student'])}>
            Clear student
        </button>
      </>
}