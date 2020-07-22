import { Grid } from '@material-ui/core';
import React from 'react';
import Toolbar from './poc/whiteboard/components/Toolbar';
import { Whiteboard } from './poc/whiteboard/components/Whiteboard';
import SharedEventSerializerContextProvider from './poc/whiteboard/context-provider/SharedEventSerializerProvider';
import WhiteboardContextProvider from './poc/whiteboard/context-provider/WhiteboardContextProvider';

function App() {
  return (
    <div className="App">
      <Grid container direction="row" justify="center" spacing={1}>
        <SharedEventSerializerContextProvider>
          <WhiteboardContextProvider whiteboardId="demo" userId="test1">
            <div style={{width: 400, height: 400}}>
              <Whiteboard containerHeight={300} height={"100%"}/>
              <Toolbar />
            </div>
          </WhiteboardContextProvider>
          <WhiteboardContextProvider whiteboardId="demo" userId="test2">
            <div style={{width: 400, height: 400}}>
              <Whiteboard containerHeight={300} height={"100%"}/>
              <Toolbar />
            </div>
          </WhiteboardContextProvider>
          <WhiteboardContextProvider whiteboardId="demo" userId="test3">
            <div style={{width: 400, height: 400}}>
              <Whiteboard containerHeight={300} height={"100%"}/>
              <Toolbar />
            </div>
          </WhiteboardContextProvider>
        </SharedEventSerializerContextProvider>
      </Grid>
    </div>
  );
}

export default App;
