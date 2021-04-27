import React, { useState } from 'react';
import SharedEventSerializerContextProvider from './domain/whiteboard/SharedEventSerializerProvider';
import Whiteboard from './domain/whiteboard/Whiteboard';

function App() {
  const [canvasAreCreated, setCanvasAreCreated] = useState(false);

  return (
    <div className="App">
      <div>
        <SharedEventSerializerContextProvider
          simulateNetworkSynchronization={true}
          simulatePersistence={true}
          canvasAreCreated={canvasAreCreated}
        >
          <Whiteboard
            updateCanvasAreCreated={(value) => {
              setCanvasAreCreated(value);
            }}
          />
        </SharedEventSerializerContextProvider>
      </div>
    </div>
  );
}

export default App;
