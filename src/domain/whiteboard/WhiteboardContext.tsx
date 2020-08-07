import { v4 as uuidv4 } from 'uuid';
import React, {
  createContext,
  ReactComponentElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import { fabric } from 'fabric';
import * as shapes from './shapes/shapes';
import { useText } from './hooks/useText';
import { useFontFamily } from './hooks/useFontFamily';
import { useShapeColor } from './hooks/useShapeColor';
import { useShape } from './hooks/useShape';
import { useWhiteboardClearModal } from './hooks/useWhiteboardClearModal';
import { setSize, setCircleSize, setPathSize } from './utils/scaling';
import { usePointerEvents } from './hooks/usePointerEvents';
import { useFontColor } from './hooks/useFontColor';
import { useTextIsActive } from './hooks/useTextIsActive';
import { useShapeIsActive } from './hooks/useShapeIsActive';
import { useBrushIsActive } from './hooks/useBrushIsActive';
import './whiteboard.css';
import { useEraseType } from './hooks/useEraseType';
import { useShapesAreSelectable } from './hooks/useShapesAreSelectable';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import { useLineWidth } from './hooks/useLineWidth';
import { Canvas, IEvent, TextOptions, IText } from 'fabric/fabric-impl';
import { useFloodFill } from './hooks/useFloodFill';
import { useFloodFillIsActive } from './hooks/useFloodFillIsActive';
import { TypedShape } from '../../interfaces/shapes/shapes';
import { UndoRedo } from './hooks/useUndoRedoEffect';
import { SET, SET_OTHER, UNDO, REDO } from './reducers/undo-redo';
import { useSharedEventSerializer } from './SharedEventSerializerProvider';
import { PainterEvent } from './event-serializer/PainterEvent';
import { EventPainterController } from './event-serializer/EventPainterController';
import { ObjectEvent } from './event-serializer/PaintEventSerializer';
import { PainterEvents } from './event-serializer/PainterEvents';

// @ts-ignore
export const WhiteboardContext = createContext();

export const WhiteboardProvider = ({
  children,
  canvasId,
  canvasWidth,
  canvasHeight,
  toolbar,
}: {
  children: React.ReactNode;
  canvasId: string;
  toolbar: ReactComponentElement<any>;
  canvasWidth: string;
  canvasHeight: string;
}) => {
  const { text, updateText } = useText();
  const { fontColor, updateFontColor } = useFontColor();
  const { fontFamily, updateFontFamily } = useFontFamily();
  const { shapeColor, updateShapeColor } = useShapeColor();
  const { shape, updateShape } = useShape();
  const { eraseType, updateEraseType } = useEraseType();
  const { lineWidth, updateLineWidth } = useLineWidth();
  const { floodFill, updateFloodFill } = useFloodFill();
  const { pointerEvents, setPointerEvents } = usePointerEvents();
  const [canvas, setCanvas] = useState<Canvas>();

  const {
    ClearWhiteboardModal,
    openModal,
    closeModal,
  } = useWhiteboardClearModal();

  const { textIsActive, updateTextIsActive } = useTextIsActive();
  const { shapeIsActive, updateShapeIsActive } = useShapeIsActive();
  const { brushIsActive, updateBrushIsActive } = useBrushIsActive();
  const {
    shapesAreSelectable,
    updateShapesAreSelectable,
  } = useShapesAreSelectable();
  const { floodFillIsActive, updateFloodFillIsActive } = useFloodFillIsActive();

  // Provisional (just for change value in Toolbar selectors) they can be modified in the future
  const [pointer, updatePointer] = useState(DEFAULT_VALUES.POINTER);
  const [penLine, updatePenLine] = useState(DEFAULT_VALUES.PEN_LINE);
  const [penColor, updatePenColor] = useState(DEFAULT_VALUES.PEN_COLOR);
  // const [floodFill, updateFloodFill] = useState(DEFAULT_VALUES.FLOOD_FILL);
  const [stamp, updateStamp] = useState(DEFAULT_VALUES.STAMP);

  // Event serialization for synchronizing whiteboard state.
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();
  const [remotePainter, setRemotePainter] = useState<
    EventPainterController | undefined
  >();

  const { dispatch } = UndoRedo(canvas as fabric.Canvas, eventSerializer, canvasId);

  const isLocalObject = (id: string, canvasId: string) => {
    const object = id.split(':');

    if (!object.length) {
      throw new Error('Invalid ID');
    }

    return object[0] === canvasId;
  };

  /**
   * Creates Canvas/Whiteboard instance
   */
  useEffect(() => {
    // @ts-ignore
    const canvasInstance = new fabric.Canvas(canvasId, {
      backgroundColor: undefined,
      width: Number(canvasWidth),
      height: Number(canvasHeight),
      isDrawingMode: false,
      selectionBorderColor: 'rgba(100, 100, 255, 1)',
      selectionLineWidth: 2,
      selectionColor: 'rgba(100, 100, 255, 0.1)',
      selectionDashArray: [10],
    });

    setCanvas(canvasInstance);
  }, [canvasHeight, canvasWidth, canvasId]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    canvas.getObjects().forEach((object: any) => {
      object.set({
        selectable: shapesAreSelectable,
        evented: shapesAreSelectable,
      });
    });

    canvas.selection = shapesAreSelectable;
    canvas.renderAll();
  }, [canvas, shapesAreSelectable]);

  /**
   * Set up the EventPainterController (remotePainter) it will handle incoming
   * events (from the server) and convert those into commands we can use for
   * updating our local whiteboard.
   */
  useEffect(() => {
    if (!eventSerializer) return;

    const remotePainter = new EventPainterController();

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

      remotePainter.handlePainterEvent([payload]);
    };

    // NOTE: This handler simulates receiving events from the server
    // usually we wouldn't feed remote events directly in to the event
    // serializer.
    eventSerializer.on('event', handleRemoteEvent);

    setRemotePainter(remotePainter);

    return () => {
      eventSerializer.removeListener('event', handleRemoteEvent);
    };
  }, [eventSerializer]);

  /**
   * Handles the logic to write text on the whiteboard
   * */
  useEffect(() => {
    if (textIsActive) {
      canvas?.on('mouse:down', (e: IEvent) => {
        if (e.target === null && e) {
          let text = new fabric.IText(' ', {
            fontFamily: fontFamily,
            fontSize: 30,
            fontWeight: 400,
            fill: fontColor,
            fontStyle: 'normal',
            top: e.pointer?.y,
            left: e.pointer?.x,
            cursorDuration: 500,
          });

          canvas.add(text);
          canvas.setActiveObject(text);
          text.enterEditing();
          text?.hiddenTextarea?.focus();

          text.on('editing:exited', () => {
            const textCopy = text.text;
            const toObject = text.toObject();
            delete toObject.text;
            delete toObject.type;
            const clonedTextObj = JSON.parse(JSON.stringify(toObject));
            clonedTextObj.id = `${canvasId}:${uuidv4()}`;

            if (typeof textCopy === 'string') {
              text = new fabric.Textbox(textCopy, clonedTextObj);
            }

            canvas.remove(canvas.getActiveObject());
            canvas.add(text);
            canvas.setActiveObject(text);

            if (text?.text?.replace(/\s/g, '').length === 0) {
              canvas.remove(canvas.getActiveObject());
              return;
            }

            text.on('selected', () => {
              if (text.fontFamily) {
                //@ts-ignore
                updateFontColor(text.fill);
                updateFontFamily(text.fontFamily);
              }
            });

            text.on('modified', () => {
              if (text?.text?.replace(/\s/g, '').length === 0) {
                canvas.remove(canvas.getActiveObject());
              }
            });
          });
        }

        canvas.on('text:changed', () => {
          // dispatch({ type: SET, payload: canvas.getObjects() });
        });
      });
    }

    return () => {
      canvas?.off('mouse:down');
    };
  }, [
    canvas,
    textIsActive,
    fontColor,
    fontFamily,
    updateFontFamily,
    updateFontColor,
    dispatch,
    canvasId,
  ]);

  /**
   * Is executed when textIsActive changes its value,
   * basically to deselect any selected object
   */
  useEffect(() => {
    if (!textIsActive) {
      canvas?.discardActiveObject();
      canvas?.renderAll();
    }
  }, [canvas, pointerEvents, textIsActive]);

  /**
   * Activates or deactivates drawing mode.
   */
  useEffect(() => {
    if (brushIsActive && canvas) {
      canvas.freeDrawingBrush = new fabric.PencilBrush();
      //@ts-ignore
      canvas.freeDrawingBrush.canvas = canvas;
      canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
      canvas.freeDrawingBrush.width = lineWidth;
      canvas.isDrawingMode = true;

      canvas.on('path:created', (e: any) => {
        e.path.selectable = false;
        e.path.evented = false;
        canvas.renderAll();
      });
    } else if (canvas && !brushIsActive) {
      canvas.isDrawingMode = false;
    }

    return () => {
      canvas?.off('path:created');
    };
  }, [brushIsActive, canvas, lineWidth, penColor, dispatch]);

  /**
   * Disables shape canvas mouse events.
   */
  useEffect(() => {
    if (!shapeIsActive && canvas) {
      canvas.off('mouse:move');
      canvas.off('mouse:up');
    }
  }, [shapeIsActive, canvas]);

  /**
   * General handler for keyboard events
   * 'Backspace' event for removing selected element from whiteboard
   * 'Escape' event for deselect active objects
   * */
  const keyDownHandler = useCallback(
    (e: { key: any, which?: number, ctrlKey?: boolean, shiftKey?: boolean }) => {

      // The following two blocks, used for undo and redo, can not
      // be integrated while there are two boards in the canvas.
      // if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
      //   dispatch({ type: UNDO, canvasId });
      //   return;
      // }

      // if (e.which === 90 && e.ctrlKey && e.shiftKey) {
      //   dispatch({ type: REDO, canvasId });
      //   return;
      // }

      if (e.key === 'Backspace' && canvas) {
        const objects = canvas.getActiveObjects();

        objects.forEach((object: any) => {
          if (!object?.isEditing) {
            canvas.remove(object);
            canvas.discardActiveObject().renderAll();
          }
        });
        return;
      }

      if (e.key === 'Escape' && canvas) {
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    },
    [canvas]
  );

  // Temporary code to get undo / redo working while there are two boards
  // on the view.
  const tempKeyDown = (e: any) => {
      if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
        dispatch({ type: UNDO, canvasId });
        return;
      }

      if (e.which === 90 && e.ctrlKey && e.shiftKey) {
        dispatch({ type: REDO, canvasId });
        return;
      }
  }

  /**
   * Loads selected font. Default is Arial
   * */
  const fontFamilyLoader = useCallback(
    (font: string) => {
      const myFont = new FontFaceObserver(font);
      myFont
        .load()
        .then(() => {
          if (canvas?.getActiveObject()) {
            (canvas.getActiveObject() as IText).set('fontFamily', font);
            canvas.requestRenderAll();
          }
        })
        .catch((e: any) => {
          console.log(e);
        });
    },
    [canvas]
  );

  /**
   * Add keyboard keydown event listener. It listen keyDownHandler function
   * Invokes fontFamilyLoader to set default and selected font family
   * */
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler, false);
    fontFamilyLoader(fontFamily);
    
    return(() => {
      document.removeEventListener('keydown', keyDownHandler);
    });
  }, [fontFamily, keyDownHandler, fontFamilyLoader]);

  /**
   * Deselect the actual selected object
   */
  const discardActiveObject = () => {
    canvas?.discardActiveObject().renderAll();
  };

  /**
   * If the input field (text) has length
   * will unselect whiteboard active objects
   * */
  useEffect(() => {
    if (text.length) {
      canvas?.discardActiveObject().renderAll();
    }
  }, [canvas, text]);

  /**
   * Handles PainterEvents
   * */
  useEffect(() => {
    canvas?.on('path:created', (e: any) => {
      e.path.id = PainterEvents.createId(canvasId); // fabric.Object.__uid++;

      const target = {
        stroke: e.path.stroke,
        strokeWidth: e.path.strokeWidth,
        path: e.path.path,
      };

      eventSerializer?.push(
        'added',
        PainterEvents.pathCreated(target, e.path.id, canvasId) as ObjectEvent
      );

      const event = { event: PainterEvents.pathCreated(target, e.path.id, canvasId), type: 'added' };

      dispatch({
        type: SET,
        payload: canvas.getObjects() as unknown as TypedShape[],
        canvasId,
        event,
      });
    });

    canvas?.on('object:added', function (e: any) {
      if (!e.target.id) {
        return;
      }

      if (isLocalObject(e.target.id, canvasId)) {
        const type = e.target.get('type');

        if (type === 'path') {
          return;
        }

        const target = {
          ...(type === 'textbox' && {
            text: e.target.text,
            fontFamily: e.target.fontFamily,
            stroke: e.target.fill,
            top: e.target.top,
            left: e.target.left,
            width: e.target.width,
          }),
        };

        const payload = {
          type,
          target,
          id: e.target.id,
        };

        const event = { event: payload, type: 'added' };
        dispatch({
          type: SET,
          payload: canvas.getObjects() as unknown as TypedShape[],
          canvasId,
          event,
        });

        // Serialize the event for synchronization
        eventSerializer?.push('added', payload);
      }
    });

    canvas?.on('object:moved', function (e: any) {
      const type = e.target.get('type');
      if (type === 'activeSelection') {
        e.target._objects.forEach((activeObject: any) => {
          if (isLocalObject(activeObject.id, canvasId)) {
            const matrix = activeObject.calcTransformMatrix();
            const options = fabric.util.qrDecompose(matrix);

            const target = {
              angle: options.angle,
              top: options.translateY,
              left: options.translateX,
              scaleX: options.scaleX,
              scaleY: options.scaleY,
              flipX: activeObject.flipX,
              flipY: activeObject.flipY,
            };

            const payload = {
              type,
              target,
              id: activeObject.id,
            };

            const event = { event: payload, type: 'activeSelection' };

            dispatch({
              type: SET,
              payload: canvas.getObjects() as unknown as TypedShape[],
              canvasId,
              event,
              otherPayload: undefined,
              activeObjects: e.target._objects
            });
    
            eventSerializer?.push('moved', payload);
          }
        });
        return;
      }

      if (!e.target.id) {
        return;
      }

      if (isLocalObject(e.target.id, canvasId)) {
        const target = {
          angle: e.target.angle,
          top: e.target.top,
          left: e.target.left,
          scaleX: e.target.scaleX,
          scaleY: e.target.scaleY,
          flipX: e.target.flipX,
          flipY: e.target.flipY,
        };

        const payload = {
          type,
          target,
          id: e.target.id,
        };

        const event = { event: payload, type: 'moved' };

        dispatch({
          type: SET,
          payload: canvas.getObjects() as unknown as TypedShape[],
          canvasId,
          event,
        });

        eventSerializer?.push('moved', payload);
      }
    });

    canvas?.on('object:rotated', (e: any) => {
      const type = e.target.get('type');
      if (type === 'activeSelection') {
        e.target._objects.forEach((activeObject: any) => {
          if (isLocalObject(activeObject.id, canvasId)) {
            const matrix = activeObject.calcTransformMatrix();
            const options = fabric.util.qrDecompose(matrix);
            const target = {
              angle: options.angle,
              top: options.translateY,
              left: options.translateX,
              scaleX: options.scaleX,
              scaleY: options.scaleY,
              flipX: activeObject.flipX,
              flipY: activeObject.flipY,
            };

            const payload = {
              type,
              target,
              id: activeObject.id,
            };

            eventSerializer?.push('rotated', payload);
          }
        });
        return;
      }

      if (!e.target.id) {
        return;
      }

      const id = e.target.id;
      const target = {
        top: e.target.top,
        left: e.target.left,
        angle: e.target.angle,
        scaleX: e.target.scaleX,
        scaleY: e.target.scaleY,
        flipX: e.target.flipX,
        flipY: e.target.flipY,
      };
      const payload = {
        type,
        target,
        id,
      };

      eventSerializer?.push('rotated', payload);
    });

    canvas?.on('object:scaled', (e: any) => {
      const type = e.target.get('type');
      if (type === 'activeSelection') {
        e.target._objects.forEach((activeObject: any) => {
          if (isLocalObject(activeObject.id, canvasId)) {
            const matrix = activeObject.calcTransformMatrix();
            const options = fabric.util.qrDecompose(matrix);
            const target = {
              angle: options.angle,
              top: options.translateY,
              left: options.translateX,
              scaleX: options.scaleX,
              scaleY: options.scaleY,
              flipX: activeObject.flipX,
              flipY: activeObject.flipY,
            };

            const payload = {
              type,
              target,
              id: activeObject.id,
            };

            eventSerializer?.push('scaled', payload);
          }
        });
        return;
      }

      if (!e.target.id) {
        return;
      }

      if (isLocalObject(e.target.id, canvasId)) {
        const target = {
          angle: e.target.angle,
          top: e.target.top,
          left: e.target.left,
          scaleX: e.target.scaleX,
          scaleY: e.target.scaleY,
          flipX: e.target.flipX,
          flipY: e.target.flipY,
        };

        const payload = {
          type,
          target,
          id: e.target.id,
        };

        const event = { event: payload, type: 'scaled' };

        // Serialize the event for synchronization
        dispatch({
          type: SET,
          payload: canvas.getObjects() as unknown as TypedShape[],
          canvasId,
          event,
        });
  
        eventSerializer?.push('scaled', payload);
      }
    });

    canvas?.on('object:skewed', (e: any) => {
      if (!e.target.id) {
        return;
      }

      if (isLocalObject(e.target.id, canvasId)) {
        const type = e.target.get('type');
        const target = {
          top: e.target.top,
          left: e.target.left,
          angle: e.target.angle,
          scaleX: e.target.scaleX,
          scaleY: e.target.scaleY,
          skewX: e.target.skewX,
          skewY: e.target.skewY,
        };

        const payload = {
          type,
          target,
          id: e.target.id,
        };

        eventSerializer?.push('skewed', payload);
      }
    });

    canvas?.on('object:modified', (e: any) => {
      if (!e.target.id) {
        return;
      }

      if (isLocalObject(e.target.id, canvasId)) {
        const type = e.target.get('type');

        // If text has been modified
        if (type === 'textbox') {
          const target = {
            ...(type === 'textbox' && {
              text: e.target.text,
              fontFamily: e.target.fontFamily,
              stroke: e.target.fill,
              top: e.target.top,
              left: e.target.left,
              width: e.target.width,
            }),
          };

          const payload = {
            type,
            target,
            id: e.target.id,
          };

          eventSerializer?.push('modified', payload);
        }
      }
    });

    canvas?.on('object:removed', (e: any) => {
      if (!e.target.id) {
        return;
      }

      if (isLocalObject(e.target.id, canvasId)) {
        const payload = {
          id: e.target.id,
        };

        // Dispatch to state.

        const event = { event: payload, type: 'removed' };
        dispatch({
          type: SET,
          payload: canvas.getObjects() as unknown as TypedShape[],
          canvasId,
          event,
        });

        // Serialize the event for synchronization
        eventSerializer?.push('removed', payload as ObjectEvent);
      }
    });

    remotePainter?.on(
      'added',
      (id: string, objectType: string, target: any) => {
        // TODO: We'll want to filter events based on the user ID. This can
        // be done like this. Example of extracting user id from object ID:
        // let { user } = new ShapeID(id);
        // Help!
        // if (eventSerializer?.didSerializeEvent(id)) return;

        // TODO: We'll have to replace this with the user based filtering. Because
        // we want to allow bi-directional events (Teacher <-> Student) as opposed
        // to (Teacher --> Student).

        // Events come from another user
        // Pass as props to user context
        // Ids of shapes + userId  uuid()

        if (!id) {
          return;
        }

        if (isLocalObject(id, canvasId)) return;

        if (objectType === 'textbox') {
          let text = new fabric.Textbox(target.text, {
            fontSize: 30,
            fontWeight: 400,
            fontStyle: 'normal',
            fontFamily: target.fontFamily,
            fill: target.stroke,
            top: target.top,
            left: target.left,
            width: target.width,
            selectable: false,
          });

          // @ts-ignore
          text.id = id;

          canvas?.add(text);
          return;
        }

        if (objectType === 'path') {
          const pencil = new fabric.PencilBrush();
          pencil.color = target.stroke || '#000';
          pencil.width = target.strokeWidth;

          // Convert Points to SVG Path
          const res = pencil.createPath(target.path);
          // @ts-ignore
          res.id = id;
          res.selectable = false;
          res.evented = false;

          canvas?.add(res);
          dispatch({
            type: SET_OTHER,
            payload: canvas?.getObjects() as unknown as TypedShape[],
            canvasId,
          });
        }
      }
    );

    remotePainter?.on(
      'moved',
      (id: string, objectType: string, target: any) => {
        if (!id) {
          return;
        }

        if (isLocalObject(id, canvasId)) return;

        canvas?.forEachObject(function (obj: any) {
          if (obj.id && obj.id === id) {
            if (objectType === 'activeSelection') {
              obj.set({
                angle: target.angle,
                top: target.top,
                left: target.left,
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                flipX: target.flipX,
                flipY: target.flipY,
                originX: 'center',
                originY: 'center',
              });
            } else {
              obj.set({
                angle: target.angle,
                top: target.top,
                left: target.left,
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                flipX: target.flipX,
                flipY: target.flipY,
                originX: 'left',
                originY: 'top',
              });
            }
          }
        });
        canvas?.renderAll();
      }
    );

    remotePainter?.on(
      'rotated',
      (id: string, objectType: string, target: any) => {
        if (isLocalObject(id, canvasId)) return;

        canvas?.forEachObject(function (obj: any) {
          if (obj.id && obj.id === id) {
            if (objectType === 'activeSelection') {
              obj.set({
                angle: target.angle,
                top: target.top,
                left: target.left,
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                flipX: target.flipX,
                flipY: target.flipY,
                originX: 'center',
                originY: 'center',
              });
            } else {
              obj.set({
                angle: target.angle,
                top: target.top,
                left: target.left,
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                flipX: target.flipX,
                flipY: target.flipY,
                originX: 'left',
                originY: 'top',
              });
            }
          }
        });
        canvas?.renderAll();
      }
    );

    remotePainter?.on(
      'scaled',
      (id: string, objectType: string, target: any) => {
        //if (eventSerializer?.didSerializeEvent(id)) return;
        if (isLocalObject(id, canvasId)) return;

        canvas?.forEachObject(function (obj: any) {
          if (obj.id && obj.id === id) {
            if (objectType === 'activeSelection') {
              obj.set({
                angle: target.angle,
                top: target.top,
                left: target.left,
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                flipX: target.flipX,
                flipY: target.flipY,
                originX: 'center',
                originY: 'center',
              });
            } else {
              obj.set({
                angle: target.angle,
                top: target.top,
                left: target.left,
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                flipX: target.flipX,
                flipY: target.flipY,
                originX: 'left',
                originY: 'top',
              });
            }
          }
        });

        canvas?.renderAll();
      }
    );

    remotePainter?.on('skewed', (id: string, target: any) => {
      //if (eventSerializer?.didSerializeEvent(id)) return;
      if (isLocalObject(id, canvasId)) return;

      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          obj.set({
            angle: target.angle,
            top: target.top,
            left: target.left,
            scaleX: target.scaleX,
            scaleY: target.scaleY,
            flipX: target.flipX,
            flipY: target.flipY,
            skewX: target.skewX,
            skewY: target.skewY,
          });
        }
      });
      canvas?.renderAll();
    });

    remotePainter?.on(
      'colorChanged',
      (id: string, objectType: string, target: any) => {
        //if (eventSerializer?.didSerializeEvent(id)) return;
        if (isLocalObject(id, canvasId)) return;

        canvas?.forEachObject(function (obj: any) {
          if (obj.id && obj.id === id) {
            if (objectType === 'textbox') {
              obj.set({
                fill: target.fill,
              });
            } else {
              obj.set({
                stroke: target.stroke,
              });
            }
          }
        });

        dispatch({
          type: SET_OTHER,
          payload: canvas?.getObjects() as unknown as TypedShape[],
          canvasId,
        });

        canvas?.renderAll();
      }
    );

    remotePainter?.on(
      'modified',
      (id: string, objectType: string, target: any) => {
        // if (eventSerializer?.didSerializeEvent(id)) return;

        if (isLocalObject(id, canvasId)) return;

        canvas?.forEachObject(function (obj: any) {
          if (obj.id && obj.id === id) {
            if (objectType === 'textbox') {
              obj.set({
                text: target.text,
                fontFamily: target.fontFamily,
                stroke: target.fill,
                top: target.top,
                left: target.left,
                width: target.width,
              });
            }
          }
        });
        canvas?.renderAll();
      }
    );

    remotePainter?.on('fontFamilyChanged', (id: string, target: any) => {
      // if (eventSerializer?.didSerializeEvent(id)) return;

      if (isLocalObject(id, canvasId)) return;

      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          obj.set({
            fontFamily: target.fontFamily,
          });
        }
      });
      canvas?.renderAll();
    });

    remotePainter?.on('removed', (id: string) => {
      // if (eventSerializer?.didSerializeEvent(id)) return;

      if (isLocalObject(id, canvasId)) return;

      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          canvas?.remove(obj);
        }
      });
      canvas?.renderAll();

      dispatch({
        type: SET_OTHER,
        payload: canvas?.getObjects() as unknown as TypedShape[],
        canvasId,
      });
    });

    remotePainter?.on('reconstruct', (id: string, target: any) => {

      if (isLocalObject(id, canvasId)) return;
      
      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          canvas?.remove(obj);
          canvas.renderAll();
          const oObject = obj.toJSON(['strokeUniform', 'id']);
          let nObject = { ...oObject, ...JSON.parse(target.param) };

          switch(target.objectType) {

            case 'path': {
              // let nObject = { ...oObject, ...JSON.parse(target.param) };
              fabric.Path.fromObject(nObject, (path: any) => {
                canvas.add(path);
              });
              break;
            }
            case 'textbox': {
              // let nObject = { ...JSON.parse(target.param), id: oObject.id, strokeUniform: oObject.strokeUniform };
              if (!JSON.parse(target.param).fill) {
                // nObject = { ...nObject, fill: nObject.stroke };
                console.log(nObject);
                debugger;
                delete nObject.stroke;
              }

              if (!JSON.parse(target.param).stroke) {
                // nObject = { ...nObject, fill: nObject.stroke };
                
                debugger;
              }
              
              fabric.Textbox.fromObject(nObject, (path: any) => {
                canvas.add(path);
              });
              break;
            }
          }

          canvas.renderAll();
        }
      });
    });

  }, [text, canvas, eventSerializer, remotePainter, canvasId, brushIsActive, dispatch]);

  /**
   * Send synchronization event for penColor and fontColor changes.
   * */
  useEffect(() => {
    const objects = canvas?.getActiveObjects();

    if (objects && objects.length) {
      objects.forEach((obj: any) => {
        if (isLocalObject(obj.id, canvasId)) {
          const type = obj.get('type');
          const target = (type: string) => {
            return type === 'textbox'
              ? { fill: obj.fill }
              : { stroke: obj.stroke };
          };
          const payload = {
            type,
            target: target(type),
            id: obj.id,
          };

          const event = { event: payload, type: 'colorChanged' };

          dispatch({
            type: SET,
            payload: canvas?.getObjects() as unknown as TypedShape[],
            canvasId,
            event,
          });

          eventSerializer?.push('colorChanged', payload);
        }
      });
    }
  }, [canvas, eventSerializer, canvasId, penColor, fontColor, dispatch]);

  /**
   * Send synchronization event for fontFamily changes.
   * */
  useEffect(() => {
    const objects = canvas?.getActiveObjects();

    if (objects && objects.length) {
      objects.forEach((obj: any) => {
        if (isLocalObject(obj.id, canvasId)) {
          const type = obj.get('type');

          if (type === 'textbox') {
            const target = {
              fontFamily,
            };
            const payload = {
              type,
              target,
              id: obj.id,
            };

            eventSerializer?.push('fontFamilyChanged', payload);
          }
        }
      });
    }
  }, [canvas, eventSerializer, canvasId, fontFamily]);

  /**
   * If pointerEvents changes to false, all the selected objects
   * will be unselected
   */
  useEffect(() => {
    if (!pointerEvents && canvas) {
      canvas.discardActiveObject().renderAll();
    }
  }, [pointerEvents, canvas]);

  /**
   * Creates the listeners to erase objects from the whiteboard
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const eraseObject = (): void => {
    let eraser: boolean = false;
    let activeObjects: any = null;

    // Deactivate selection
    setCanvasSelection(false);
    setHoverCursorObjects('pointer');

    // When mouse down eraser is able to remove objects
    canvas?.on('mouse:down', (e: any) => {
      if (eraser) {
        return false;
      }

      // if the click is made over an object
      if (e.target) {
        activeObjects = canvas.getActiveObjects();
        canvas.remove(e.target);
        canvas.renderAll();
      }

      // if the click is made over an object group
      if (e.target && activeObjects.length) {
        activeObjects.forEach(function (object: any) {
          canvas.remove(object);
        });

        canvas.discardActiveObject().renderAll();
      }

      eraser = true;
    });

    // When mouse is over an object
    canvas?.on('mouse:over', (e: any) => {
      if (!eraser) {
        return false;
      }

      canvas.remove(e.target);
      canvas.renderAll();
    });

    // When mouse up eraser is unable to remove objects
    canvas?.on('mouse:up', () => {
      if (!eraser) {
        return false;
      }

      eraser = false;
    });
  };

  /**
   * Set Canvas Whiteboard selection hability
   * @param {boolean} selection - value to set in canvas and objects selection
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCanvasSelection = (selection: boolean): void => {
    if (canvas) {
      canvas.selection = selection;
      canvas.forEachObject((object: fabric.Object) => {
        object.selectable = selection;
      });

      canvas.renderAll();
    }
  };

  /**
   * Set the cursor to be showed when a object hover happens
   * @param {string} cursor - Cursor name to show
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setHoverCursorObjects = (cursor: string): void => {
    if (canvas) {
      canvas.forEachObject((object: fabric.Object) => {
        object.hoverCursor = cursor;
      });

      canvas.renderAll();
    }
  };

  /**
   * When eraseType value changes, listeners and states
   * necessaries to erase objects are setted or removed
   */
  useEffect(() => {
    if (eraseType === 'object' && canvas) {
      eraseObject();

      if (canvas.getActiveObjects().length === 1) {
        canvas.discardActiveObject().renderAll();
      }
    } else if (canvas) {
      setCanvasSelection(true);
    }

    return () => {
      canvas?.off('mouse:down');
      canvas?.off('mouse:up');
      canvas?.off('mouse:over');
    };
  }, [eraseType, canvas, eraseObject, setCanvasSelection]);

  /**
   * Adds shape to whiteboard.
   * @param specific Indicates shape type that should be added in whiteboard.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shapeSelector = (specific: string): TypedShape => {
    switch (specific || shape) {
      case 'rectangle':
        return shapes.rectangle(2, 2, penColor, false, lineWidth);
      case 'circle':
        return shapes.circle(2, 2, penColor, false, lineWidth);
      case 'triangle':
        return shapes.triangle(2, 4, penColor, false, lineWidth);
      case 'star':
        return shapes.star(2, 2, penColor, false, lineWidth);
      case 'arrow':
        return shapes.arrow(2, 2, penColor, false, lineWidth);
      case 'chatBubble':
        return shapes.chat(2, 2, penColor, false, lineWidth);
      case 'pentagon':
        return shapes.pentagon(penColor, false, lineWidth);
      case 'hexagon':
        return shapes.hexagon(penColor, false, lineWidth);
      case 'filledRectangle':
        return shapes.rectangle(2, 2, shapeColor, true, 0);
      case 'filledCircle':
        return shapes.circle(2, 2, shapeColor, true, 0);
      case 'filledTriangle':
        return shapes.triangle(2, 4, shapeColor, true, 0);
      case 'filledStar':
        return shapes.star(2, 2, shapeColor, true, 0);
      case 'filledArrow':
        return shapes.arrow(2, 2, shapeColor, true, 0);
      case 'filledChatBubble':
        return shapes.chat(2, 2, shapeColor, true, 0);
      case 'filledPentagon':
        return shapes.pentagon(shapeColor, true, 0);
      case 'filledHexagon':
        return shapes.hexagon(shapeColor, true, 0);
      default:
        return shapes.circle(2, 2, penColor, false, lineWidth);
    }
  };

  /**
   * Removes mouse:down event from canvas
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clearOnMouseEvent = (): void => {
    canvas?.off('mouse:down');
  };

  /**
   * Set the size of the shape when the mouse drawing action is made
   * @param shape Shape that was added to canvas.
   * @param coordsStart Coordinates of initial click on canvas.
   * @param isCircle Indicates if shape added is a circle.
   */
  const mouseMove = useCallback(
    (
      shape: fabric.Object | fabric.Rect | fabric.Ellipse,
      coordsStart: any,
      specific?: string
    ): void => {
      //@ts-ignore
      canvas?.on('mouse:move', (e: IEvent): void => {
        canvas.selection = false;

        if (specific === 'filledCircle' || specific === 'circle') {
          setCircleSize(shape as fabric.Ellipse, coordsStart, e.pointer);
        } else if (
          specific === 'filledRectangle' ||
          specific === 'filledTriangle' ||
          specific === 'rectangle' ||
          specific === 'triangle'
        ) {
          setSize(shape, coordsStart, e.pointer);
        } else {
          setPathSize(shape, coordsStart, e.pointer);
        }

        let anchor = { ...coordsStart, originX: 'left', originY: 'top' };

        if (e.pointer && coordsStart.x > e.pointer.x) {
          anchor = { ...anchor, originX: 'right' };
        }

        if (e.pointer && coordsStart.y > e.pointer.y) {
          anchor = { ...anchor, originY: 'bottom' };
        }

        shape.set(anchor);
        canvas.renderAll();
      });
    },
    [canvas]
  );

  /**
   * Mouse up event listener for canvas.
   */
  const mouseUp = useCallback(
    (
      shape: fabric.Object | fabric.Rect | fabric.Ellipse | TypedShape,
      coordsStart: any,
      specific: string
    ): void => {
      canvas?.on('mouse:up', (e: IEvent): void => {
        let size;

        if (specific === 'filledCircle' || specific === 'circle') {
          size = setCircleSize(shape as fabric.Ellipse, coordsStart, e.pointer);
        } else if (
          specific === 'filledRectangle' ||
          specific === 'filledTriangle' ||
          specific === 'rectangle' ||
          specific === 'triangle'
        ) {
          size = setSize(shape, coordsStart, e.pointer);
        } else {
          size = setPathSize(shape, coordsStart, e.pointer);
        }

        if (size.width <= 2 && size.height <= 2) {
          canvas.remove(shape);
        } else {
          shape.setCoords();
          canvas.renderAll();
          dispatch({ type: SET, payload: canvas.getObjects() });
        }
      });
    },
    [canvas, dispatch]
  );

  /**
   * Mouse down event listener for canvas.
   * @param shape Shape being added on canvas.
   * @param isCircle Indicates if shape is a circle.
   */
  const mouseDown = useCallback(
    (specific: string, color?: string): void => {
      canvas?.on('mouse:down', (e: IEvent): void => {
        if (e.target) {
          return;
        }

        const shape = shapeSelector(specific);
        if (e.pointer) {
          shape.set({
            top: e.pointer.y,
            left: e.pointer.x,
            shapeType: 'shape',
            name: specific,
            strokeUniform: true,
          });
        }

        // fill and type properties just can be resetted if is an filled shape
        if (shape.fill !== 'transparent') {
          shape.set({
            type: 'filledShape',
            fill: color || shapeColor,
          });
        }

        clearOnMouseEvent();
        mouseMove(shape, e.pointer, specific);
        mouseUp(shape, e.pointer, specific);
        canvas.add(shape);
      });
    },
    [canvas, clearOnMouseEvent, mouseMove, mouseUp, shapeColor, shapeSelector]
  );

  /**
   * Clears all mouse event listeners from canvas.
   */
  const clearMouseEvents = (): void => {
    canvas?.off('mouse:move');
    canvas?.off('mouse:up');
  };

  /**
   * Add specific shape to whiteboard
   * */
  const addShape = (specific?: string): void => {
    const shapeToAdd = specific || shape;
    /*
      Required to prevent multiple shapes add at once
      if user clicked more than one shape during selection.
    */
    if (!shapeIsActive) {
      return;
    }

    clearOnMouseEvent();
    clearMouseEvents();
    mouseDown(
      shapeToAdd,
      shapeToAdd.startsWith('filled') ? shapeColor : penColor
    );
  };

  /**
   * Changes the penColor value and if one or more objects are selected
   * also changes the stroke color in free drawing and empty shape objects
   * @param {string} color - new color to change
   */
  const changeStrokeColor = (color: string) => {
    updatePenColor(color);

    if (canvas?.getActiveObjects()) {
      canvas.getActiveObjects().forEach((object: TypedShape) => {
        if (
          (isShape(object) && object.shapeType === 'shape') ||
          isFreeDrawing(object)
        ) {
          object.set('stroke', color);
        }
      });

      canvas.renderAll();
    }
  };

  /**
   * Add specific color to selected shape
   * */
  const fillColor = (color: string) => {
    updateShapeColor(color);
    clearOnMouseEvent();
    clearMouseEvents();
    mouseDown(shape, color);

    // Just the filled shapes can be recolored
    if (
      canvas?.getActiveObject() &&
      canvas.getActiveObject().fill !== 'transparent'
    ) {
      canvas.getActiveObject().set('fill', color);
      canvas.renderAll();
      dispatch({ type: SET, payload: canvas.getObjects() });
    }
  };

  /**
   * Activates the mouseDown event if shape exists and shapeIsActive is true
   */
  useEffect(() => {
    if (shape && shapeIsActive) {
      mouseDown(shape, shape.startsWith('filled') ? shapeColor : penColor);
    }

    return () => {
      canvas?.off('mouse:down');
      canvas?.off('mouse:move');
      canvas?.off('mouse:up');
    };
  }, [canvas, shape, shapeIsActive, mouseDown, penColor, shapeColor]);

  /**
   * Add specific color to selected text
   * @param {string} color - color to set
   */
  const textColor = (color: string) => {
    updateFontColor(color);
    if (
      canvas?.getActiveObject() &&
      (canvas.getActiveObject() as IText).text
    ) {
      canvas.getActiveObject().set('fill', color);
      canvas.renderAll();
    }
  };

  /**
   * Clears all whiteboard elements
   * */
  const clearWhiteboard = (): void => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = 'white';
      canvas.renderAll();
    }
    closeModal();
  };

  /**
   * Opens ClearWhiteboardModal
   */
  const openClearWhiteboardModal = () => {
    openModal();
  };

  /**
   * Check if the given object is a free drawing object
   * @param {fabric.Object} object - object to check
   */
  const isFreeDrawing = (object: fabric.Object) => {
    return object.strokeLineCap === 'round';
  };

  /**
   * Check if the given object is a shape
   * @param {fabric.Object} object - object to check
   */
  const isShape = (object: fabric.Object) => {
    return object.fill && !(object as TextOptions).text;
  };

  /**
   * Check if the given object is an empty shape
   * @param {fabric.Object} object - object to check
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isEmptyShape = (object: TypedShape) => {
    return isShape(object) && object.shapeType === 'shape';
  };

  /**
   * Check if the given object is a text object
   * @param {fabric.Object} object - object to check
   */
  const isText = (object: fabric.Object) => {
    return object.fill && !object.stroke && (object as TextOptions).text;
  };

  /**
   * Trigger the changes in the required variables
   * when a certain object is selected
   * @param {IEvent} event - event that contains the selected object
   */
  const manageChanges = (event: IEvent) => {
    // Free Drawing Line Selected
    if (
      (event.target && isFreeDrawing(event.target)) ||
      (event.target && isEmptyShape(event.target))
    ) {
      updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
      updateLineWidth(event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH);
    }

    // Shape Selected
    if (event.target && isShape(event.target)) {
      updateShape(event.target.name || DEFAULT_VALUES.SHAPE);

      if ((event.target as TypedShape).shapeType === 'shape') {
        updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
        updateLineWidth(event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH);
      } else if (event.target.fill) {
        updateShapeColor(
          event.target.fill.toString() || DEFAULT_VALUES.SHAPE_COLOR
        );
      }
    }
  };

  /**
   * If lineWidth variable changes and a free line drawing is selected
   * that drawing line width will changes to the selected width on Toolbar
   */
  useEffect(() => {
    if (canvas?.getActiveObjects()) {
      canvas.getActiveObjects().forEach((object) => {
        if (isEmptyShape(object) || isFreeDrawing(object)) {
          object.set('strokeWidth', lineWidth);
        }
      });

      canvas.renderAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineWidth, canvas]);

  /**
   * Manages the logic for Flood-fill Feature
   */
  useEffect(() => {
    let originalFill = null;
    let originalStroke = null;
    let mousePointer = null;
    let clickedColorValues = null;
    const fillValue = 220;
    const strokeValue = 200;
    const differentFill = `rgba(${fillValue}, ${fillValue}, ${fillValue})`;
    const differentStroke = `rgba(${strokeValue}, ${strokeValue}, ${strokeValue})`;

    if (floodFillIsActive) {
      setCanvasSelection(false);
      setHoverCursorObjects('default');

      canvas?.on('mouse:down', (event: IEvent) => {
        // Click out of any shape
        if (!event.target) {
          canvas.backgroundColor = floodFill;
        }

        // Click on object shape
        if (event.target && isEmptyShape(event.target)) {
          // Store the current colors to reset it (if is necesary)
          originalFill = event.target.fill;
          originalStroke = event.target.stroke;

          /*
            Change fill and stroke to a provisional colors
            to difference shape fill, shape stroke and whiteboard
          */
          event.target.set('fill', differentFill);
          event.target.set('stroke', differentStroke);
          canvas.renderAll();

          // Getting the color in which user makes click
          mousePointer = canvas.getPointer(event.e);
          clickedColorValues = canvas
            .getContext()
            .getImageData(mousePointer.x, mousePointer.y, 1, 1)
            .data.slice(0, 3);

          // If user click inside of a shape
          if (!clickedColorValues.find((value) => value !== fillValue)) {
            event.target.set('fill', floodFill);
            event.target.set('stroke', originalStroke);

            // If user clicks in the border of the shape
          } else if (
            !clickedColorValues.find((value) => value !== strokeValue)
          ) {
            event.target.set('fill', originalFill);
            event.target.set('stroke', originalStroke);
          } else {
            // return to previous color
            event.target.set('fill', originalFill);
            event.target.set('stroke', originalStroke);
            canvas.backgroundColor = floodFill;
          }
        }

        // Click on free line drawing
        if (event.target && isFreeDrawing(event.target)) {
          // Store the current stroke color to reset it (if is necesary)
          originalStroke = event.target.stroke;

          /*
            Change stroke to a provisional color
            to difference line and whiteboard
          */
          event.target.set('stroke', differentStroke);
          canvas.renderAll();

          // Getting the color in which user makes click
          mousePointer = canvas.getPointer(event.e);
          clickedColorValues = canvas
            .getContext()
            .getImageData(mousePointer.x, mousePointer.y, 1, 1)
            .data.slice(0, 3);

          // If the user clicks over the line
          if (!clickedColorValues.find((value) => value !== strokeValue)) {
            event.target.set('stroke', originalStroke);
          } else {
            // return to previous color
            event.target.set('stroke', originalStroke);
            canvas.backgroundColor = floodFill;
          }
        }

        // Click over text object
        if (event.target && isText(event.target)) {
          // Store the current fill color to reset it (if is necesary)
          originalFill = event.target.fill;

          /*
            Change fill to a provisional color
            to difference shape and whiteboard
          */
          event.target.set('fill', differentFill);
          canvas.renderAll();

          // Getting the color in which user makes click
          mousePointer = canvas.getPointer(event.e);
          clickedColorValues = canvas
            .getContext()
            .getImageData(mousePointer.x, mousePointer.y, 1, 1)
            .data.slice(0, 3);

          // If the user clicks the text
          if (!clickedColorValues.find((value) => value !== fillValue)) {
            event.target.set('fill', originalFill);
          } else {
            // return to previous color
            event.target.set('fill', originalFill);
            canvas.backgroundColor = floodFill;
          }
        }

        canvas.renderAll();
      });
    }
  }, [
    canvas,
    floodFill,
    floodFillIsActive,
    isEmptyShape,
    setCanvasSelection,
    setHoverCursorObjects,
  ]);

  /**
   * Set Canvas Whiteboard selection ability
   * @param {boolean} selection - value to set in canvas and objects selection
   */
  canvas?.on({
    'selection:created': manageChanges,
    'selection:updated': manageChanges,
  });

  /**
   * List of available colors in toolbar
   * */
  const colorsList = [
    'black',
    'red',
    'yellow',
    'green',
    'blue',
    'purple',
    'brown',
  ];

  const value = {
    fontFamily,
    fontColor,
    updateFontFamily,
    colorsList,
    fillColor,
    textColor,
    shape,
    shapeColor,
    updateShape,
    addShape,
    text,
    updateText,
    discardActiveObject,
    openClearWhiteboardModal,
    clearWhiteboard,
    pointerEvents,
    eraseObject,
    eraseType,
    updateEraseType,
    textIsActive,
    updateTextIsActive,
    shapeIsActive,
    updateShapeIsActive,
    brushIsActive,
    updateBrushIsActive,
    updateFontColor,
    lineWidth,
    updateLineWidth,
    floodFill,
    updateFloodFill,
    floodFillIsActive,
    updateFloodFillIsActive,
    // Just for control selectors' value they can be modified in the future
    pointer,
    updatePointer,
    penLine,
    updatePenLine,
    penColor,
    updatePenColor,
    stamp,
    updateStamp,
    setPointerEvents,
    changeStrokeColor,
    dispatch,
    updateShapesAreSelectable,
    canvasId,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      <ClearWhiteboardModal clearWhiteboard={clearWhiteboard} />
      <div className="whiteboard">
        {toolbar}
        <div
          onKeyDown={tempKeyDown}
          tabIndex={0}
          style={{
            border: '1px solid black',
            width: canvasWidth + 'px',
            height: canvasHeight + 'px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: 'white',
          }}
        >
          {children}
          <div
            className="canvas-wrapper"
            style={{
              width: canvasWidth + 'px',
              height: canvasHeight + 'px',
              position: 'absolute',
              pointerEvents: pointerEvents ? 'auto' : 'none',
            }}
            onClick={() => {
              addShape();
            }}
          >
            <canvas id={canvasId} />
          </div>
        </div>
      </div>
    </WhiteboardContext.Provider>
  );
};
