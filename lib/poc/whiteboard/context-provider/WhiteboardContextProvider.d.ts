import { FunctionComponent, ReactChild, ReactChildren } from 'react';
import { BrushParameters } from '../types/BrushParameters';
import { PointerPainterController } from '../controller/PointerPainterController';
import { EventPainterController } from '../controller/EventPainterController';
import { Permissions } from '../types/Permissions';
import { ShapesRepository } from '../composition/ShapesRepository';
interface IWhiteboardState {
    display: boolean;
    permissions: Permissions;
    brushParameters: BrushParameters;
    pointerPainter?: PointerPainterController;
    remotePainter?: EventPainterController;
    shapesRepository?: ShapesRepository;
}
interface IWhiteboardContext {
    state: IWhiteboardState;
    actions: any;
}
declare type Props = {
    children?: ReactChild | ReactChildren | null | any;
    userId: string;
    whiteboardId: string;
};
export declare const WhiteboardContextProvider: FunctionComponent<Props>;
export declare function useWhiteboard(): IWhiteboardContext;
export default WhiteboardContextProvider;
