import React, {
  createContext,
  FunctionComponent,
  ReactChild,
  ReactChildren,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { EventPainterController } from './event-serializer/EventPainterController';
import { PainterEvent } from './event-serializer/PainterEvent';
import { PaintEventSerializer } from './event-serializer/PaintEventSerializer';
import ICanvasActions from './canvas-actions/ICanvasActions';

// NOTE: This is used to scale up the coordinates sent in events
// to save bytes in the text representation of numbers. E.g. 33
// instead of 0.0333333333. Sacrificing some sub-pixel accuracy.
export const NormalizeCoordinates = 1000;

type Props = {
  children?: ReactChild | ReactChildren | null | Element[];
  simulateNetworkSynchronization?: boolean;
  simulatePersistence?: boolean;
  canvasAreCreated?: boolean;
};

interface IEventSerializerState {
  eventSerializer: PaintEventSerializer;
  eventController: EventPainterController;
}

interface IEventSerializerContext {
  state: IEventSerializerState;
  actions: ICanvasActions;
  requestAllEvents: () => void;
}

const Context = createContext<IEventSerializerContext>({
  state: {} as IEventSerializerState,
  actions: {} as ICanvasActions,
  requestAllEvents: () => {},
});

// NOTE: This class was added to allow demonstrating synchronizing whiteboard events without any network or server.
export const SharedEventSerializerContextProvider: FunctionComponent<Props> = ({
  children,
  simulateNetworkSynchronization,
  simulatePersistence,
  canvasAreCreated,
}: Props): JSX.Element => {
  const [eventSerializer] = useState<PaintEventSerializer>(
    new PaintEventSerializer(NormalizeCoordinates)
  );
  const [eventController] = useState<EventPainterController>(
    new EventPainterController()
  );

  // NOTE: This effect is used to set up network sync simulation. Just handling the locally
  // serialized events directly using the event controller.
  useEffect(() => {
    if (!eventSerializer || !eventController) return;
    if (!simulateNetworkSynchronization) return;

    // NOTE: We will receive events from the server as arrays of serialized
    // events. When joining a room the user will receive a big list of events
    // of all that's been painted so far. After they received the initial big
    // list the will receive individual events or smaller chunks of events as
    // others users (and themselves) interact more with the whiteboard.

    // The function receiving events might look like this:
    const handleRemoteEvent = (payload: PainterEvent) => {
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

    return () => {
      eventSerializer.removeListener('event', handleRemoteEvent);
    };
  }, [eventSerializer, eventController, simulateNetworkSynchronization]);

  // NOTE: Resubmit all events serialized so far.
  const sendAllPersistentEvents = useCallback(() => {
    if (!eventSerializer || !eventController) return;
    if (!simulateNetworkSynchronization) return;

    const stored = window.localStorage.getItem('canvas:simulated:events');
    if (stored !== null) {
      const persistentEvents = JSON.parse(stored);
      console.log(`resubmitting persistent events: ${persistentEvents.length}`);
      eventController.handlePainterEvent(persistentEvents);
    }
  }, [eventController, eventSerializer, simulateNetworkSynchronization]);

  // NOTE: Request fetching all events.
  const refetchEvents = useCallback(() => {
    if (!eventSerializer || !eventController || !canvasAreCreated) return;

    eventController.requestRefetch();
  }, [canvasAreCreated, eventController, eventSerializer]);

  // NOTE: This effect listens for refetch request
  // and resubmits all events when it's invoked.
  useEffect(() => {
    if (!simulatePersistence) return;
    if (!eventController) return;

    const refetchRequestHandler = () => {
      sendAllPersistentEvents();
    };

    eventController.on('refetch', refetchRequestHandler);

    return () => {
      eventController.removeListener('refetch', refetchRequestHandler);
    };
  }, [
    canvasAreCreated,
    eventController,
    sendAllPersistentEvents,
    simulatePersistence,
  ]);

  // NOTE: This effect sets up simulated persistance. This would simulate
  // events being sent from the server when the user reloads the page.
  useEffect(() => {
    if (!eventSerializer || !eventController) return;
    // changed from simulateNetworkSynchronization, needed network synch, but not persistence, which localStorage is for.
    if (!simulatePersistence) return;

    const stored = window.localStorage.getItem('canvas:simulated:events');
    if (stored !== null) {
      const persistentEvents = JSON.parse(stored);
      console.log(
        `applying simulated persistent events: ${persistentEvents.length}`
      );
      eventController.handlePainterEvent(persistentEvents);
    }

    let remoteEvents: PainterEvent[] = [];
    const nonpersistentEventTypes = ['cursorPointer', 'moving'];
    const storeRemoteEvent = (payload: PainterEvent) => {
      if (
        nonpersistentEventTypes.includes(payload.type) ||
        payload.id.split(':')[1] === 'cursor'
      )
        return;

      const length = remoteEvents.push(payload);
      console.log(`storing simulated persistance events: ${length}`);

      window.localStorage.setItem(
        'canvas:simulated:events',
        JSON.stringify(remoteEvents)
      );
    };

    eventSerializer.on('event', storeRemoteEvent);

    return () => {
      eventSerializer.removeListener('event', storeRemoteEvent);
    };
  }, [
    eventSerializer,
    eventController,
    simulatePersistence,
    simulateNetworkSynchronization,
  ]);

  return (
    <Context.Provider
      value={{
        state: {
          eventSerializer: eventSerializer,
          eventController: eventController,
        },
        actions: {} as ICanvasActions,
        requestAllEvents: refetchEvents,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useSharedEventSerializer(): IEventSerializerContext {
  return useContext(Context);
}

export default SharedEventSerializerContextProvider;
