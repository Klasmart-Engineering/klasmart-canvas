import { FunctionComponent, ReactChild, ReactChildren } from 'react';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import ICanvasActions from '../../../domain/whiteboard/canvas-actions/ICanvasActions';
export declare const NormalizeCoordinates = 1000;
declare type Props = {
    children?: ReactChild | ReactChildren | null | Element[];
};
interface IEventSerializerState {
    eventSerializer?: PaintEventSerializer;
}
interface IEventSerializerContext {
    state: IEventSerializerState;
    actions: ICanvasActions | {};
}
export declare const SharedEventSerializerContextProvider: FunctionComponent<Props>;
export declare function useSharedEventSerializer(): IEventSerializerContext;
export default SharedEventSerializerContextProvider;
