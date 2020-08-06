import React, { createContext, useContext, useEffect, useState, } from 'react';
import { EventPainterController } from './event-serializer/EventPainterController';
import { PaintEventSerializer } from './event-serializer/PaintEventSerializer';
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
    var children = _a.children, simulateNetworkSynchronization = _a.simulateNetworkSynchronization;
    var eventSerializer = useState(new PaintEventSerializer(NormalizeCoordinates))[0];
    var eventController = useState(new EventPainterController())[0];
    // NOTE: This effect is used to set up network sync simulation. Just handling the locally
    // serialized events directly using the event controller.
    useEffect(function () {
        if (!eventSerializer || !eventController)
            return;
        if (!simulateNetworkSynchronization)
            return;
        // NOTE: We will receive events from the server as arrays of serialized
        // events. When joining a room the user will receive a big list of events
        // of all that's been painted so far. After they received the initial big
        // list the will receive individual events or smaller chunks of events as
        // others users (and themselves) interact more with the whiteboard.
        // The function receiving events might look like this:
        var handleRemoteEvent = function (payload) {
            // IMPORTANT: We should keep in mind the user's own events
            // will appear in this list as well. The server doesn't do
            // any filtering based on the user at this point.
            // Once the events have been received, there needs to be some code
            // transforming the event data into commands for drawing or updating
            // objects on the canvas.
            eventController.handlePainterEvent([payload]);
        };
        // NOTE: This handler simulates receiving events from the server
        // usually we wouldn't feed remote events directly in to the event
        // serializer.
        eventSerializer.on('event', handleRemoteEvent);
        return function () {
            eventSerializer.removeListener('event', handleRemoteEvent);
        };
    }, [eventSerializer, eventController, simulateNetworkSynchronization]);
    return (React.createElement(Context.Provider, { value: {
            state: {
                eventSerializer: eventSerializer,
                eventController: eventController,
            },
            actions: {},
        } }, children));
};
export function useSharedEventSerializer() {
    return useContext(Context);
}
export default SharedEventSerializerContextProvider;
//# sourceMappingURL=SharedEventSerializerProvider.js.map