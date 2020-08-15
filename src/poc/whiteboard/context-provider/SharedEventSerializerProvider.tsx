import React, {
  createContext,
  FunctionComponent,
  ReactChild,
  ReactChildren,
  useContext,
  useState,
} from 'react';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import ICanvasActions from '../../../domain/whiteboard/canvas-actions/ICanvasActions';

// NOTE: This is used to scale up the coordinates sent in events
// to save bytes in the text representation of numbers. E.g. 33
// instead of 0.0333333333. Sacrificing some sub-pixel accuracy.
export const NormalizeCoordinates = 1000;

type Props = {
  children?: ReactChild | ReactChildren | null | Element[];
};

interface IEventSerializerState {
  eventSerializer?: PaintEventSerializer;
}

interface IEventSerializerContext {
  state: IEventSerializerState;
  actions: ICanvasActions | {};
}

const Context = createContext<IEventSerializerContext>({
  state: {},
  actions: {},
});

// NOTE: This class was added to allow demonstrating synchronizing whiteboard events without any network or server.
export const SharedEventSerializerContextProvider: FunctionComponent<Props> = ({
  children,
}: Props): JSX.Element => {
  const [eventSerializer] = useState<PaintEventSerializer>(
    new PaintEventSerializer(NormalizeCoordinates)
  );

  return (
    <Context.Provider
      value={{
        state: {
          eventSerializer: eventSerializer,
        },
        actions: {},
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
