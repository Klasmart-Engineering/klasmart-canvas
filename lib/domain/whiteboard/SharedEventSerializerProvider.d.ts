import { FunctionComponent, ReactChild, ReactChildren } from 'react';
import { EventPainterController } from './event-serializer/EventPainterController';
import { PaintEventSerializer } from './event-serializer/PaintEventSerializer';
import ICanvasActions from './canvas-actions/ICanvasActions';
declare type Props = {
    children?: ReactChild | ReactChildren | null | Element[];
    simulateNetworkSynchronization?: boolean;
    simulatePersistence?: boolean;
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
export declare const SharedEventSerializerContextProvider: FunctionComponent<Props>;
export declare function useSharedEventSerializer(): IEventSerializerContext;
export default SharedEventSerializerContextProvider;
