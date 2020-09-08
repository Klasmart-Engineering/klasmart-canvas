import React, { createContext, useContext, useEffect, useState, useCallback, } from 'react';
import { EventPainterController } from './event-serializer/EventPainterController';
import { PaintEventSerializer } from './event-serializer/PaintEventSerializer';
var Context = createContext({
    state: {},
    actions: {},
    requestAllEvents: function () { },
});
// NOTE: This class was added to allow demonstrating synchronizing whiteboard events without any network or server.
export var SharedEventSerializerContextProvider = function (_a) {
    var children = _a.children, simulateNetworkSynchronization = _a.simulateNetworkSynchronization, simulatePersistence = _a.simulatePersistence;
    var eventSerializer = useState(new PaintEventSerializer())[0];
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
    // NOTE: Resubmit all events serialized so far.
    var sendAllPersistentEvents = useCallback(function () {
        if (!eventSerializer || !eventController)
            return;
        if (!simulateNetworkSynchronization)
            return;
        var stored = window.localStorage.getItem('canvas:simulated:events');
        if (stored !== null) {
            var persistentEvents = JSON.parse(stored);
            console.log("resubmitting persistent events: " + persistentEvents.length);
            eventController.handlePainterEvent(persistentEvents, true);
        }
    }, [eventController, eventSerializer, simulateNetworkSynchronization]);
    // NOTE: Request fetching all events.
    var refetchEvents = useCallback(function () {
        if (!eventSerializer || !eventController)
            return;
        eventController.requestRefetch();
    }, [eventController, eventSerializer]);
    // NOTE: This effect listens for refetch request
    // and resubmits all events when it's invoked.
    useEffect(function () {
        if (!simulatePersistence)
            return;
        if (!eventController)
            return;
        var refetchRequestHandler = function () {
            sendAllPersistentEvents();
        };
        eventController.on('refetch', refetchRequestHandler);
        return function () {
            eventController.removeListener('refetch', refetchRequestHandler);
        };
    }, [eventController, sendAllPersistentEvents, simulatePersistence]);
    // NOTE: This effect sets up simulated persistance. This would simulate
    // events being sent from the server when the user reloads the page.
    useEffect(function () {
        if (!eventSerializer || !eventController)
            return;
        if (!simulateNetworkSynchronization)
            return;
        var remoteEvents = [];
        var stored = window.localStorage.getItem('canvas:simulated:events');
        if (stored !== null) {
            var existingEvents = JSON.parse(stored);
            remoteEvents.push.apply(remoteEvents, existingEvents);
        }
        var storeRemoteEvent = function (payload) {
            var length = remoteEvents.push(payload);
            console.log("storing simulated persistance events: " + length);
            window.localStorage.setItem('canvas:simulated:events', JSON.stringify(remoteEvents));
        };
        eventSerializer.on('event', storeRemoteEvent);
        return function () {
            eventSerializer.removeListener('event', storeRemoteEvent);
        };
    }, [eventSerializer, eventController, simulatePersistence, simulateNetworkSynchronization, sendAllPersistentEvents]);
    return (React.createElement(Context.Provider, { value: {
            state: {
                eventSerializer: eventSerializer,
                eventController: eventController,
            },
            actions: {},
            requestAllEvents: refetchEvents
        } }, children));
};
export function useSharedEventSerializer() {
    return useContext(Context);
}
export default SharedEventSerializerContextProvider;
//# sourceMappingURL=SharedEventSerializerProvider.js.map