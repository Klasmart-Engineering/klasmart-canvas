import SharedEventSerializerContextProvider from './domain/whiteboard/SharedEventSerializerProvider';
import { WhiteboardProvider } from './domain/whiteboard/WhiteboardContext';
import { useToolbarContext, Context } from './components/toolbar/toolbar-context-provider';
import ToolbarExample from './components/toolbar/toolbar-example';
export default {
    EventSerializerProvider: SharedEventSerializerContextProvider,
    WhiteboardProvider: WhiteboardProvider,
    Toolbar: {
        useToolbarContext: useToolbarContext,
        ToolbarExample: ToolbarExample,
        Context: Context
    }
};
//# sourceMappingURL=exports.js.map