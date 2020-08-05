import SharedEventSerializerContextProvider from './domain/whiteboard/SharedEventSerializerProvider';
import { WhiteboardProvider } from './domain/whiteboard/WhiteboardContext';
import Toolbar from './components/toolbar/Toolbar';

export default {
  EventSerializerProvider: SharedEventSerializerContextProvider,
  WhiteboardProvider,
  Toolbar,
};
