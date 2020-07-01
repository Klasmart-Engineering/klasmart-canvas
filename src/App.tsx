import React, { useRef, useEffect } from 'react';
import './canvas.css';
import Toolbar from './components/Toolbar';

function App() {
  const ref: any = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillText('Hello World', 220, 175);
  });
  return (
    <div className="container">
      <canvas ref={ref} width="600px" height="350px" />
      <Toolbar />
    </div>
  );
}

export default App;
