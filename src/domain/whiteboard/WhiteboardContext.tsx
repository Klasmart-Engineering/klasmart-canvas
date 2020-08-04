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
import CanvasEvent from '../../interfaces/canvas-events/canvas-events';
import './whiteboard.css';
import { useEraseType } from './hooks/useEraseType';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
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
  const { pointerEvents, setPointerEvents } = usePointerEvents(false);
  const [canvas, setCanvas] = useState();

  const {
    ClearWhiteboardModal,
    openModal,
    closeModal,
  } = useWhiteboardClearModal();

  const { textIsActive, updateTextIsActive } = useTextIsActive();
  const { shapeIsActive, updateShapeIsActive } = useShapeIsActive();
  const { brushIsActive, updateBrushIsActive } = useBrushIsActive();

  // Provisional (just for change value in Toolbar selectors) they can be modified in the future
  const [pointer, updatePointer] = useState(DEFAULT_VALUES.POINTER);
  const [penLine, updatePenLine] = useState(DEFAULT_VALUES.PEN_LINE);
  const [penColor, updatePenColor] = useState(DEFAULT_VALUES.PEN_COLOR);
  const [thickness, updateThickness] = useState(DEFAULT_VALUES.THICKNESS);
  const [floodFill, updateFloodFill] = useState(DEFAULT_VALUES.FLOOD_FILL);
  const [stamp, updateStamp] = useState(DEFAULT_VALUES.STAMP);

  // Event serialization for synchronizing whiteboard state.
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();
  const [remotePainter, setRemotePainter] = useState<
    EventPainterController | undefined
  >();

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
      backgroundColor: null,
      width: canvasWidth,
      height: canvasHeight,
      isDrawingMode: false,
    });

    setCanvas(canvasInstance);
  }, [canvasHeight, canvasWidth, canvasId]);

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
      canvas?.on('mouse:down', (options: { target: null; e: any }) => {
        if (options.target === null) {
          let text = new fabric.IText(' ', {
            fontFamily: fontFamily,
            fontSize: 30,
            fontWeight: 400,
            fill: fontColor,
            fontStyle: 'normal',
            top: options.e.offsetY,
            left: options.e.offsetX,
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
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = penColor || '#000';
      canvas.freeDrawingBrush.width = 10;
    } else if (canvas && !brushIsActive) {
      canvas.isDrawingMode = false;
    }
  }, [brushIsActive, canvas, penColor]);

  /**
   * Disables shape canvas mouse events.
   */
  useEffect(() => {
    if (!shapeIsActive && canvas) {
      canvas.off('mouse:move');
      canvas.off('mouse:up');
      canvas.off('mouse:down');
    }
  }, [shapeIsActive, canvas]);

  /**
   * General handler for keyboard events
   * 'Backspace' event for removing selected element from whiteboard
   * 'Escape' event for deselect active objects
   * */
  const keyDownHandler = useCallback(
    (e: { key: any }) => {
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
            canvas.getActiveObject().set('fontFamily', font);
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
  }, [fontFamily, keyDownHandler, fontFamilyLoader]);

  /**
   * Deselect the actual selected object
   */
  const discardActiveObject = () => {
    canvas.discardActiveObject().renderAll();
  };

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

        // Serialize the event for synchronization
        eventSerializer?.push('added', payload);
      }
    });

    canvas?.on('object:moved', function (e: any) {
      const type = e.target.get('type');
      if (type === 'activeSelection') {
        e.target._objects.forEach((activeObject: any) => {
          if (isLocalObject(activeObject.id, canvasId)) {
            const target = {
              top: e.target.top + activeObject.top + e.target.height / 2,
              left: e.target.left + activeObject.left + e.target.width / 2,
              angle: activeObject.angle,
            };

            const payload = {
              type,
              target,
              id: activeObject.id,
            };

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
          top: e.target.top,
          left: e.target.left,
          angle: e.target.angle,
        };

        const payload = {
          type,
          target,
          id: e.target.id,
        };

        eventSerializer?.push('moved', payload);
      }
    });

    canvas?.on('object:rotated', (e: any) => {
      if (!e.target.id) {
        return;
      }

      const id = e.target.id;
      const type = e.target.get('type');
      const target = {
        angle: e.target.angle,
        top: e.target.top,
        left: e.target.left,
      };
      const payload = {
        type,
        target,
        id,
      };

      eventSerializer?.push('rotated', payload);
    });

    canvas?.on('object:scaled', (e: any) => {
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
          flipX: e.target.flipX,
          flipY: e.target.flipY,
        };

        const payload = {
          type,
          target,
          id: e.target.id,
        };

        // Serialize the event for synchronization
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

        // Serialize the event for synchronization
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

          // Serialize the event for synchronization
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

        // No queremos agregar nuestros propios eventos
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
        }
      }
    );

    remotePainter?.on('moved', (id: string, target: any) => {
      // if (eventSerializer?.didSerializeEvent(id)) return;

      if (!id) {
        return;
      }

      // No queremos agregar nuestros propios eventos
      if (isLocalObject(id, canvasId)) return;

      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          obj.set({
            angle: target.angle,
            top: target.top,
            left: target.left,
          });
        }
      });
      canvas?.renderAll();
    });

    remotePainter?.on('rotated', (id: string, target: any) => {
      //if (eventSerializer?.didSerializeEvent(id)) return;
      if (isLocalObject(id, canvasId)) return;

      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          obj.set({
            angle: target.angle,
            top: target.top,
            left: target.left,
          });
        }
      });
      canvas?.renderAll();
    });

    remotePainter?.on('scaled', (id: string, target: any) => {
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
          });
        }
      });
      canvas?.renderAll();
    });

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
    });
  }, [text, canvas, eventSerializer, remotePainter, canvasId]);

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

          eventSerializer?.push('colorChanged', payload);
        }
      });
    }
  }, [canvas, eventSerializer, canvasId, penColor, fontColor]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eraseType, canvas]);

  /**
   * Adds shape to whiteboard.
   * @param specific Indicates shape type that should be added in whiteboard.
   */
  const shapeSelector = useCallback(
    (specific: string): fabric.Rect | fabric.Triangle | fabric.Ellipse => {
      switch (specific || shape) {
        case 'rectangle':
          return shapes.rectangle(2, 2, shapeColor);
        case 'triangle':
          return shapes.triangle(2, 4, shapeColor);
        case 'star':
          return shapes.star(2, 2, shapeColor);
        case 'rightArrow':
          return shapes.arrow(2, 2, shapeColor);
        case 'chatBubble':
          return shapes.chat(2, 2, shapeColor);
        case 'pentagon':
          return shapes.pentagon(shapeColor);
        case 'hexagon':
          return shapes.hexagon(shapeColor);
        default:
          return shapes.circle(2, 2, shapeColor);
      }
    },
    [shape, shapeColor]
  );

  /**
   *
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
      canvas.on('mouse:move', (e: CanvasEvent): void => {
        if (specific === 'circle') {
          setCircleSize(shape as fabric.Ellipse, coordsStart, e.pointer);
        } else if (specific === 'rectangle' || specific === 'triangle') {
          setSize(shape, coordsStart, e.pointer);
        } else {
          setPathSize(shape, coordsStart, e.pointer);
        }

        let anchor = { ...coordsStart, originX: 'left', originY: 'top' };

        if (coordsStart.x > e.pointer.x) {
          anchor = { ...anchor, originX: 'right' };
        }

        if (coordsStart.y > e.pointer.y) {
          anchor = { ...anchor, originY: 'bottom' };
        }

        shape.set(anchor);
        canvas.renderAll();
      });
    },
    [canvas]
  );

  /**
   * Clears all mouse event listeners from canvas.
   */
  const clearMouseEvents = useCallback((): void => {
    canvas.off('mouse:move');
    canvas.off('mouse:up');
  }, [canvas]);

  const clearOnMouseEvent = useCallback((): void => {
    canvas.off('mouse:down');
  }, [canvas]);

  /**
   * Mouse up event listener for canvas.
   */
  const mouseUp = useCallback(
    (
      shape: fabric.Object | fabric.Rect | fabric.Ellipse,
      coordsStart: any,
      specific: string
    ): void => {
      canvas.on('mouse:up', (e: CanvasEvent): void => {
        let size;

        if (specific === 'circle') {
          size = setCircleSize(shape as fabric.Ellipse, coordsStart, e.pointer);
        } else if (specific === 'rectangle' || specific === 'triangle') {
          size = setSize(shape, coordsStart, e.pointer);
        } else {
          size = setPathSize(shape, coordsStart, e.pointer);
        }

        if (size.width <= 2 && size.height <= 2) {
          canvas.remove(shape);
        } else {
          shape.setCoords();
          canvas.renderAll();
        }
      });
    },
    [canvas]
  );

  /**
   * Mouse down event listener for canvas.
   * @param shape Shape being added on canvas.
   * @param isCircle Indicates if shape is a circle.
   */
  const mouseDown = useCallback(
    (specific: string, color?: string): void => {
      canvas.on('mouse:down', (e: CanvasEvent): void => {
        if (e.target) {
          return;
        }

        const shape = shapeSelector(specific);
        shape.set({
          top: e.pointer.y,
          left: e.pointer.x,
          fill: color || shapeColor,
        });

        clearOnMouseEvent();
        mouseMove(shape, e.pointer, specific);
        mouseUp(shape, e.pointer, specific);
        canvas.add(shape);
      });
    },
    [canvas, clearOnMouseEvent, mouseMove, mouseUp, shapeColor, shapeSelector]
  );

  /**
   * Add specific shape to whiteboard
   * */
  const addShape = (specific?: string): void => {
    // Required to prevent multiple shapes add at once
    // if user clicked more than one shape during selection.
    if (!shapeIsActive) {
      return;
    }

    clearOnMouseEvent();
    clearMouseEvents();
    mouseDown(specific || shape, shapeColor);
  };

  const changeStrokeColor = (color: string) => {
    updatePenColor(color);

    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set('stroke', color);
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

    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set('fill', color);
      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (shape && shapeIsActive) {
      mouseDown(shape, shapeColor);
    }

    return () => {
      canvas?.off('mouse:down');
      canvas?.off('mouse:move');
      canvas?.off('mouse:up');
    };
  }, [canvas, shape, shapeIsActive, mouseDown, shapeColor]);

  /**
   * Add specific color to selected text
   * @param {string} color - color to set
   */
  const textColor = (color: string) => {
    updateFontColor(color);
    if (canvas.getActiveObject() && canvas.getActiveObject().text) {
      canvas.getActiveObject().set('fill', color);
      // @ts-ignore
      canvas.renderAll();
    }
  };

  /**
   * Clears all whiteboard elements
   * */
  const clearWhiteboard = (): void => {
    canvas.clear();
    canvas.backgroundColor = 'white';
    canvas.renderAll();
    closeModal();
  };

  /**
   * Opens ClearWhiteboardModal
   */
  const openClearWhiteboardModal = () => {
    openModal();
  };

  /**
   * Creates the listeners to erase objects from the whiteboard
   */
  const eraseObject = (): void => {
    let eraser: boolean = false;
    let activeObjects: any = null;

    // Deactivate selection
    setCanvasSelection(false);

    // When mouse down eraser is able to remove objects
    canvas.on('mouse:down', (e: any) => {
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
    canvas.on('mouse:over', (e: any) => {
      if (!eraser) {
        return false;
      }

      canvas.remove(e.target);
      canvas.renderAll();
    });

    // When mouse up eraser is unable to remove objects
    canvas.on('mouse:up', () => {
      if (!eraser) {
        return false;
      }

      eraser = false;
    });
  };

  /**
   * Set Canvas Whiteboard selection ability
   * @param {boolean} selection - value to set in canvas and objects selection
   */
  const setCanvasSelection = (selection: boolean): void => {
    canvas.selection = selection;
    canvas.forEachObject((object: fabric.Object) => {
      object.selectable = selection;
    });

    canvas.renderAll();
  };

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
    // Just for control selectors' value they can be modified in the future
    pointer,
    updatePointer,
    penLine,
    updatePenLine,
    penColor,
    updatePenColor,
    thickness,
    updateThickness,
    floodFill,
    updateFloodFill,
    stamp,
    updateStamp,
    setPointerEvents,
    changeStrokeColor,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      <ClearWhiteboardModal clearWhiteboard={clearWhiteboard} />
      <div className="whiteboard">
        {toolbar}
        <div
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
