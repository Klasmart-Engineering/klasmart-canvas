import React, { createContext, useCallback, useContext, useState } from 'react';
import { BrushParameters } from '../services/brush/BrushParameters';
import { v4 as uuid } from 'uuid';
import { PointerPainterController } from '../controller/PointerPainterController';
import { MultiplexPainterService } from '../services/MultiplexPainterService';
import { CanvasPainterService } from '../services/CanvasPainterService';
import { EventPainterController } from '../controller/EventPainterController';
import { EventPainterService } from '../services/EventPainterService';

// NOTE: This is used to scale up the coordinates sent in events
// to save bytes in the text representation of numbers. E.g. 33
// instead of 0.0333333333. Sacrificing some sub-pixel accuracy.
const NormalizeCoordinatesMultiplier = 1000;

interface IWhiteboardState {
  brushParameters: BrushParameters;
  service: MultiplexPainterService;
  pointerController: PointerPainterController;
  eventController: EventPainterController;
}

interface IWhiteboardContext {
  state: IWhiteboardState;
  actions: any;
}

function createDefaultState(): IWhiteboardState {
  // NOTE: PointerPainterController is repsponsible to draw using IPainterService based on pointer events
  const pointerController = new PointerPainterController(uuid(), true);

  // NOTE: MultiplexPainterService is responsible to fan out events to multiple services. In our demo this
  // is used to both draw to the local canvas and send events to the server.
  const service = new MultiplexPainterService([]);
  pointerController.setPainter(service);

  // NOTE: The EventPainterController will handle incoming paint events and draw using IPainterService.
  const eventController = new EventPainterController(
    NormalizeCoordinatesMultiplier
  );

  // NOTE: The EventPainterService will convert draw command to paint events. And invoke the supplied
  // callback function when each paint event is prepared. In this project the callback function just
  // pass the event to the eventController, but in our demo it posted the event to server using graphql
  // mutation.
  const eventPainter = new EventPainterService((e) => {
    eventController.handleWhiteboardEvent(e);
  }, NormalizeCoordinatesMultiplier);
  service.addTarget(eventPainter);

  // NOTE: BrushParameters control how the lines will look like.
  const brushParameters = new BrushParameters();
  brushParameters.width = 4.0;
  brushParameters.style = '#ff0000';

  pointerController.setBrush(brushParameters);

  return {
    brushParameters: brushParameters,
    service: service,
    pointerController: pointerController,
    eventController: eventController,
  };
}

const defaultState = createDefaultState();

const Context = createContext<IWhiteboardContext>({
  state: defaultState,
  actions: undefined,
});

export default function WhiteboardProvider({ children }: any) {
  const [state, setState] = useState<IWhiteboardState>(defaultState);

  const setSourceCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      try {
        const sourcePainter = new CanvasPainterService(canvas);
        state.service.addTarget(sourcePainter);
      } catch (err) {
        console.error(`Couldn't add source canvas: ${err}.`)
      }
    },
    [state]
  );

  const setTargetCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      try {
        const targetPainter = new CanvasPainterService(canvas);
        state.eventController.setPainter(targetPainter);
      } catch (err) {
        console.error(`Couldn't add target canvas: ${err}.`)
      }
    },
    [state]
  );

  const setBrushAction = useCallback(
    (brush: BrushParameters) => {
      const newState = { ...state };
      newState.brushParameters = brush;
      state.pointerController.setBrush(brush);
      setState(newState);
    },
    [state]
  );

  const clearAction = useCallback(() => {
    state.pointerController.clear();
  }, [state]);

  const WhiteboardProviderActions = {
    clear: clearAction,
    setBrush: setBrushAction,
    setSourceCanvas: setSourceCanvas,
    setTargetCanvas: setTargetCanvas,
  };

  return (
    <Context.Provider value={{ state, actions: WhiteboardProviderActions }}>
      {children}
    </Context.Provider>
  );
}

export function useWhiteboard() {
  return useContext(Context);
}
