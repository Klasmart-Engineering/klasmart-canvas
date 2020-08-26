import React, { createContext, useContext, useState, } from 'react';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
// NOTE: This is used to scale up the coordinates sent in events
// to save bytes in the text representation of numbers. E.g. 33
// instead of 0.0333333333. Sacrificing some sub-pixel accuracy.
export var NormalizeCoordinates = 1000;
var Context = createContext({
    state: {},
    actions: {},
});
// NOTE: This class was added to allow demonstrating synchronizing whiteboard events without any network or server.
export var SharedEventSerializerContextProvider = function (_a) {
    var children = _a.children;
    var eventSerializer = useState(new PaintEventSerializer(NormalizeCoordinates))[0];
    return (React.createElement(Context.Provider, { value: {
            state: {
                eventSerializer: eventSerializer,
            },
            actions: {},
        } }, children));
};
export function useSharedEventSerializer() {
    return useContext(Context);
}
export default SharedEventSerializerContextProvider;
//# sourceMappingURL=SharedEventSerializerProvider.js.map