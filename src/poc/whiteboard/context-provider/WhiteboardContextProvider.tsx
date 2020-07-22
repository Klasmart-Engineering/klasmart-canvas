import React, { createContext, FunctionComponent, useCallback, useContext, useEffect, useState, ReactChild, ReactChildren } from "react";
import { BrushParameters } from "../types/BrushParameters";
import { PointerPainterController } from "../controller/PointerPainterController";
import { PaintEventSerializer } from "../event-serializer/PaintEventSerializer";
import { EventPainterController } from "../controller/EventPainterController";
import { IPainterController } from "../controller/IPainterController";
import { Permissions, createPermissions, createEmptyPermissions } from "../types/Permissions";
import { ShapesRepository } from "../composition/ShapesRepository";
import { Point2D } from "../types/Point2D";
import { NormalizeCoordinates, useSharedEventSerializer } from "./SharedEventSerializerProvider";
import { PainterEvent } from "../types/PainterEvent";
import { ShapeID } from "../composition/ShapeID";

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

const Context = createContext<IWhiteboardContext>({
    state: {display: true, permissions: createEmptyPermissions(), brushParameters: BrushParameters.default()},
    actions: {},
});

type Props = {
  children?: ReactChild | ReactChildren | null | any;
  userId: string;
  whiteboardId: string;
}

function attachEventSerializer(controller: IPainterController, serializer: PaintEventSerializer) {
    controller.on("shapeBegin", (id, params) => {
        serializer.shapeBegin(id, params);
    });
    controller.on("shapeEnd", id => {
        serializer.shapeEnd(id);
    });
    controller.on("painterLine", (id, p1, p2) => {
        serializer.painterLine(id, p1, p2);
    });
    controller.on("painterClear", id => {
        serializer.painterClear(id);
    })
}

export const WhiteboardContextProvider: FunctionComponent<Props> = ({ children, userId, whiteboardId }: Props): JSX.Element => {
    const [brushParameters, setBrushParameters] = useState<BrushParameters>(BrushParameters.default());
    const [pointerPainter, setPointerPainter] = useState<PointerPainterController | undefined>(undefined);
    const [remotePainter, setRemotePainter] = useState<EventPainterController | undefined>(undefined);
    const [display, setDisplay] = useState<boolean>(true);
    const [shapesRepository] = useState<ShapesRepository>(new ShapesRepository());
  
    // NOTE: Usually there would be graphql mutations listed here.
    // const [sendEventMutation] = useMutation(WHITEBOARD_SEND_EVENT);
    // const [sendDisplayMutation] = useMutation(WHITEBOARD_SEND_DISPLAY);

    // NOTE: Usually we'd get user parameters from another part of the code. In this
    // example I'll add those parameters as props instead.
    // const { name, roomId, teacher } = useContext(UserContext);

    // NOTE: Permissions is based on the type of user usually. In this example I'll change it
    // to always allow painting shapes by default.
    //const [permissions, setPermissions] = useState<Permissions>(createPermissions(teacher));
    const [permissions] = useState<Permissions>(createPermissions(true));

    const { state: { eventSerializer } } = useSharedEventSerializer();

    // NOTE: Usually subscriptions would receive events from the server and handle them using the 'remotePainter'.
    // Subscriptions omitted for readability.

    useEffect(() => {
        if (!userId || !eventSerializer) return;

        const remotePainter = new EventPainterController(userId, NormalizeCoordinates);
        
        const handleRemoteEvent = (payload: PainterEvent) => {
            remotePainter.handlePainterEvent([payload]);
        };

        // NOTE: This handler simulates receiving events from the server
        // usually we wouldn't feed remote events directly in to the event
        // serializer.
        eventSerializer.on("event", handleRemoteEvent);

        setRemotePainter(remotePainter);

        return () => {
            eventSerializer.removeListener("event", handleRemoteEvent);
        }
    }, [userId, eventSerializer]);

    useEffect(() => {
        if (remotePainter === undefined || eventSerializer === undefined) {
            return;
        }

        const handleShapeBegin = (id: string, params: BrushParameters) => {
            let { user } = new ShapeID(id);
            if (user === userId) return;

            shapesRepository.createShape(id, params);
        };

        const handlePainterClear = (id: string) => {
            let { user } = new ShapeID(id);
            if (user === userId) return;
            
            shapesRepository.clear(id);
        };

        const handlePainterLine = (id: string, p1: Point2D, p2: Point2D) => {
            let { user } = new ShapeID(id);
            if (user === userId) return;

            shapesRepository.appendLine(id, [p1, p2]);
        };

        // NOTE: These events handle drawing shapes coming from the server.
        remotePainter.on("shapeBegin", handleShapeBegin);
        remotePainter.on("painterClear", handlePainterClear);
        remotePainter.on("painterLine", handlePainterLine);

        shapesRepository.clearAll();
        remotePainter.replayEvents();

        return () => {
            remotePainter.removeListener("shapeBegin", handleShapeBegin);
            remotePainter.removeListener("painterClear", handlePainterClear);
            remotePainter.removeListener("painterLine", handlePainterLine);
        };

    }, [remotePainter, shapesRepository, eventSerializer, userId]);

    useEffect(() => {
        if (!userId || !whiteboardId || !eventSerializer)
            return;

        const pointerPainter = new PointerPainterController(userId, true);

        // NOTE: These events handle drawing local shapes immediately. So that the user 
        // don't have to wait for server round trip before they see the shapes or changes
        // appear on their own canvas.
        pointerPainter.on("shapeBegin", (id: string, params: BrushParameters) => shapesRepository.createShape(id, params));
        pointerPainter.on("painterClear", id => shapesRepository.clear(id));
        pointerPainter.on("painterLine", (id, p1, p2) => shapesRepository.appendLine(id, [p1, p2]));

        attachEventSerializer(pointerPainter, eventSerializer);

        eventSerializer.on("event", payload => {
            // NOTE: Events would usually be sent to the server inside this block, using GraphQL mutations.
            // sendEventMutation({ variables: { roomId, event: JSON.stringify(payload) } } );
        });

        setPointerPainter(pointerPainter);
    }, [whiteboardId, userId, shapesRepository, eventSerializer]);

    useEffect(() => {
        if (pointerPainter) {
            pointerPainter.setBrush(brushParameters);
        }
    }, [pointerPainter, brushParameters]);

    const setBrushAction = useCallback(
        (brush: BrushParameters) => {
            setBrushParameters(brush);
        },
        [setBrushParameters]
    );

    const clearAction = useCallback(() => {
        if (pointerPainter !== undefined) {
            pointerPainter.clear();
        }
    }, [pointerPainter]);

    const setDisplayAction = useCallback(
        (display: boolean) => {
            // NOTE: This would usually send the display event to server, so the whiteboard
            // show/hide can be synchronized.
            // sendDisplayMutation({ variables: { roomId: roomId, display: display }});
            setDisplay(display);
        },
        [setDisplay]
    );

    const WhiteboardProviderActions = {
        clear: clearAction,
        setBrush: setBrushAction,
        display: setDisplayAction,
    };

    return (
        <Context.Provider value={{
            state: {
                display,
                permissions,
                pointerPainter,
                remotePainter,
                brushParameters,
                shapesRepository
            }, actions: WhiteboardProviderActions }}>
            {children}
        </Context.Provider>
    );
};

export function useWhiteboard(): IWhiteboardContext {
    return useContext(Context);
}

export default WhiteboardContextProvider;
