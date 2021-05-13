import React, { useState } from 'react';
import SharedEventSerializerContextProvider from './domain/whiteboard/SharedEventSerializerProvider';
import Whiteboard from './domain/whiteboard/Whiteboard';
import { IUser } from './interfaces/user/user'

interface IAppProps{
  user?: IUser
  users?: IUser[]
}

/**
 * 
 * @param props Optional User and users to be pass in case the App is implemented as a 
 * library or package from another app.
 */
function App(props: IAppProps) {

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
            {...props}
            /**
             * This is commented and not deleted because it seems useful.
             */
            // updateCanvasAreCreated={(value) => {
            //   setCanvasAreCreated(value);
            // }}
          />
        </SharedEventSerializerContextProvider>
      </div>
    </div>
  );
}

export default App;
