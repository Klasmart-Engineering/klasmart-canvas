import React, { createContext, useCallback, useContext, useEffect, useState, } from 'react';
import { BrushParameters } from '../types/BrushParameters';
import { PointerPainterController } from '../controller/PointerPainterController';
import { EventPainterController } from '../controller/EventPainterController';
import { createPermissions, createEmptyPermissions, } from '../types/Permissions';
import { ShapesRepository } from '../composition/ShapesRepository';
import { NormalizeCoordinates, useSharedEventSerializer, } from './SharedEventSerializerProvider';
import { ShapeID } from '../composition/ShapeID';
var Context = createContext({
    state: {
        display: true,
        permissions: createEmptyPermissions(),
        brushParameters: BrushParameters.default(),
    },
    actions: {},
});
function attachEventSerializer(controller, serializer) {
    controller.on('shapeBegin', function (id, params) {
        serializer.shapeBegin(id, params);
    });
    controller.on('shapeEnd', function (id) {
        serializer.shapeEnd(id);
    });
    controller.on('painterLine', function (id, p1, p2) {
        serializer.painterLine(id, p1, p2);
    });
    controller.on('painterClear', function (id) {
        serializer.painterClear(id);
    });
}
export var WhiteboardContextProvider = function (_a) {
    var children = _a.children, userId = _a.userId, whiteboardId = _a.whiteboardId;
    var _b = useState(BrushParameters.default()), brushParameters = _b[0], setBrushParameters = _b[1];
    var _c = useState(undefined), pointerPainter = _c[0], setPointerPainter = _c[1];
    var _d = useState(undefined), remotePainter = _d[0], setRemotePainter = _d[1];
    var _e = useState(true), display = _e[0], setDisplay = _e[1];
    var shapesRepository = useState(new ShapesRepository())[0];
    // NOTE: Usually there would be graphql mutations listed here.
    // const [sendEventMutation] = useMutation(WHITEBOARD_SEND_EVENT);
    // const [sendDisplayMutation] = useMutation(WHITEBOARD_SEND_DISPLAY);
    // NOTE: Usually we'd get user parameters from another part of the code. In this
    // example I'll add those parameters as props instead.
    // const { name, roomId, teacher } = useContext(UserContext);
    // NOTE: Permissions is based on the type of user usually. In this example I'll change it
    // to always allow painting shapes by default.
    //const [permissions, setPermissions] = useState<Permissions>(createPermissions(teacher));
    var permissions = useState(createPermissions(true))[0];
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    // NOTE: Usually subscriptions would receive events from the server and handle them using the 'remotePainter'.
    // Subscriptions omitted for readability.
    useEffect(function () {
        if (!userId || !eventSerializer)
            return;
        var remotePainter = new EventPainterController(userId, NormalizeCoordinates);
        var handleRemoteEvent = function (payload) {
            // console.log('handleRemoteEvent');
            remotePainter.handlePainterEvent([payload]);
        };
        // NOTE: This handler simulates receiving events from the server
        // usually we wouldn't feed remote events directly in to the event
        // serializer.
        eventSerializer.on('event', handleRemoteEvent);
        setRemotePainter(remotePainter);
        return function () {
            eventSerializer.removeListener('event', handleRemoteEvent);
        };
    }, [userId, eventSerializer]);
    useEffect(function () {
        if (remotePainter === undefined || eventSerializer === undefined) {
            return;
        }
        var handleShapeBegin = function (id, params) {
            var user = new ShapeID(id).user;
            if (user === userId)
                return;
            // console.log('handleShapeBegin');
            shapesRepository.createShape(id, params);
        };
        var handlePainterClear = function (id) {
            var user = new ShapeID(id).user;
            if (user === userId)
                return;
            // console.log('handlePainterClear');
            shapesRepository.clear(id);
        };
        var handlePainterLine = function (id, p1, p2) {
            var user = new ShapeID(id).user;
            if (user === userId)
                return;
            // console.log('handlePainterLine')
            shapesRepository.appendLine(id, [p1, p2]);
        };
        // NOTE: These events handle drawing shapes coming from the server.
        remotePainter.on('shapeBegin', handleShapeBegin);
        remotePainter.on('painterClear', handlePainterClear);
        remotePainter.on('painterLine', handlePainterLine);
        shapesRepository.clearAll();
        remotePainter.replayEvents();
        return function () {
            remotePainter.removeListener('shapeBegin', handleShapeBegin);
            remotePainter.removeListener('painterClear', handlePainterClear);
            remotePainter.removeListener('painterLine', handlePainterLine);
        };
    }, [remotePainter, shapesRepository, eventSerializer, userId]);
    useEffect(function () {
        if (!userId || !whiteboardId || !eventSerializer)
            return;
        var pointerPainter = new PointerPainterController(userId, true);
        // NOTE: These events handle drawing local shapes immediately. So that the user
        // don't have to wait for server round trip before they see the shapes or changes
        // appear on their own canvas.
        pointerPainter.on('shapeBegin', function (id, params) {
            return shapesRepository.createShape(id, params);
        });
        pointerPainter.on('painterClear', function (id) { return shapesRepository.clear(id); });
        pointerPainter.on('painterLine', function (id, p1, p2) {
            return shapesRepository.appendLine(id, [p1, p2]);
        });
        attachEventSerializer(pointerPainter, eventSerializer);
        eventSerializer.on('event', function (payload) {
            console.log(payload);
            // NOTE: Events would usually be sent to the server inside this block, using GraphQL mutations.
            // sendEventMutation({ variables: { roomId, event: JSON.stringify(payload) } } );
        });
        setPointerPainter(pointerPainter);
    }, [whiteboardId, userId, shapesRepository, eventSerializer]);
    useEffect(function () {
        if (pointerPainter) {
            pointerPainter.setBrush(brushParameters);
        }
    }, [pointerPainter, brushParameters]);
    var setBrushAction = useCallback(function (brush) {
        setBrushParameters(brush);
    }, [setBrushParameters]);
    var clearAction = useCallback(function () {
        if (pointerPainter !== undefined) {
            pointerPainter.clear();
        }
    }, [pointerPainter]);
    var setDisplayAction = useCallback(function (display) {
        // NOTE: This would usually send the display event to server, so the whiteboard
        // show/hide can be synchronized.
        // sendDisplayMutation({ variables: { roomId: roomId, display: display }});
        setDisplay(display);
    }, [setDisplay]);
    var WhiteboardProviderActions = {
        clear: clearAction,
        setBrush: setBrushAction,
        display: setDisplayAction,
    };
    return (React.createElement(Context.Provider, { value: {
            state: {
                display: display,
                permissions: permissions,
                pointerPainter: pointerPainter,
                remotePainter: remotePainter,
                brushParameters: brushParameters,
                shapesRepository: shapesRepository,
            },
            actions: WhiteboardProviderActions,
        } }, children));
};
export function useWhiteboard() {
    return useContext(Context);
}
export default WhiteboardContextProvider;
//# sourceMappingURL=WhiteboardContextProvider.js.map