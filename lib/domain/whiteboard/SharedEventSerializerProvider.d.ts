import { FunctionComponent, ReactChild, ReactChildren } from 'react';
import { EventPainterController } from './event-serializer/EventPainterController';
import { PaintEventSerializer } from './event-serializer/PaintEventSerializer';
export declare const NormalizeCoordinates = 1000;
declare type Props = {
    children?: ReactChild | ReactChildren | null | Element[] | any;
    simulateNetworkSynchronization?: boolean;
};
interface IEventSerializerState {
    eventSerializer?: PaintEventSerializer;
    eventController?: EventPainterController;
}
interface IEventSerializerContext {
    state: IEventSerializerState;
    actions: any;
}
export declare const SharedEventSerializerContextProvider: FunctionComponent<Props>;
export declare function useSharedEventSerializer(): IEventSerializerContext;
export default SharedEventSerializerContextProvider;
