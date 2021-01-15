import React from 'react';
import SharedEventSerializerContextProvider from './domain/whiteboard/SharedEventSerializerProvider';
import Whiteboard from './domain/whiteboard/Whiteboard';

function App() {
  return (
    <div className="App">
      <div>
        <SharedEventSerializerContextProvider simulateNetworkSynchronization={true} simulatePersistence={false}>
          <Whiteboard />
        </SharedEventSerializerContextProvider>
      </div>
    </div>
  );
}

export default App;
