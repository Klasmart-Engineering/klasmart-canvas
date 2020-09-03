import SharedEventSerializerContextProvider from './domain/whiteboard/SharedEventSerializerProvider';
import { WhiteboardProvider } from './domain/whiteboard/WhiteboardContext';
import { useToolbarContext, Context } from './components/toolbar/toolbar-context-provider';
import ToolbarExample from './components/toolbar/toolbar-example';

export default {
  EventSerializerProvider: SharedEventSerializerContextProvider,
  WhiteboardProvider,
  Toolbar: {
    useToolbarContext,
    ToolbarExample,
    Context
  }
};
