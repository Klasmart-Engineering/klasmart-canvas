import { fabric } from 'fabric';

import { v4 as uuidv4 } from 'uuid';
import React, {
  CSSProperties,
  FunctionComponent,
  ReactChild,
  ReactChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSharedEventSerializer } from './SharedEventSerializerProvider';
import { WhiteboardContext } from './WhiteboardContext';

// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import { PainterEvents } from './event-serializer/PainterEvents';
import { ObjectEvent } from './event-serializer/PaintEventSerializer';

import { useCanvasActions } from './canvas-actions/useCanvasActions';

export type Props = {
  children?: ReactChild | ReactChildren | null | any;
  instanceId: string;
  userId: string;
  pointerEvents: boolean;
  display: boolean;
  width?: string | number;
  height: string | number;
  filterUsers?: string[];
};

export const WhiteboardCanvas: FunctionComponent<Props> = ({
  children,
  instanceId,
  userId,
  pointerEvents,
  display,
  width,
  height,
  filterUsers,
}: Props): JSX.Element => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  // Event serialization for synchronizing whiteboard state.
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  const {
    brushIsActive,
    textIsActive,
    shapeIsActive,
    fontFamily,
    updateFontFamily,
    fontColor,
    updateFontColor,
    penColor,
    isLocalObject,
    eraseType,
    shape,
    shapeColor,
    updateCanvasActions,
  } = useContext(WhiteboardContext);

  const {
    actions,
    mouseDown,
  } = useCanvasActions(canvas);

  /**
   * Creates Canvas/Whiteboard instance
   */
  useEffect(() => {
    // @ts-ignore
    const canvasInstance = new fabric.Canvas(instanceId, {
      backgroundColor: undefined,
      width: 1024,
      height: 1024,
      isDrawingMode: false,
    });

    setCanvas(canvasInstance);
  }, [instanceId]);

  /**
   * Handles the logic to write text on the whiteboard
   * */
  useEffect(() => {
    if (textIsActive) {
      canvas?.on('mouse:down', (e: fabric.IEvent) => {
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
            clonedTextObj.id = `${userId}:${uuidv4()}`;

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
    userId,
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
            (canvas.getActiveObject() as fabric.IText).set('fontFamily', font);
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
   * Handles PainterEvents
   * */
  useEffect(() => {
    canvas?.on('path:created', (e: any) => {
      e.path.id = PainterEvents.createId(userId); // fabric.Object.__uid++;

      const target = {
        stroke: e.path.stroke,
        strokeWidth: e.path.strokeWidth,
        path: e.path.path,
      };

      eventSerializer?.push(
        'added',
        PainterEvents.pathCreated(target, e.path.id, userId) as ObjectEvent
      );
    });

    canvas?.on('object:added', function (e: any) {
      if (!e.target.id) {
        return;
      }

      if (isLocalObject(e.target.id, userId)) {
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

        eventSerializer?.push('added', payload);
      }
    });

    canvas?.on('object:moved', function (e: any) {
      const type = e.target.get('type');
      if (type === 'activeSelection') {
        e.target._objects.forEach((activeObject: any) => {
          if (isLocalObject(activeObject.id, userId)) {
            const matrix = activeObject.calcTransformMatrix();
            const options = fabric.util.qrDecompose(matrix);
            const target = {
              top: options.translateY,
              left: options.translateX,
              angle: options.angle,
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

      if (isLocalObject(e.target.id, userId)) {
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
      const type = e.target.get('type');
      if (type === 'activeSelection') {
        //object is your desired object inside the group.
        e.target._objects.forEach((activeObject: any) => {
          if (isLocalObject(activeObject.id, userId)) {
            const matrix = activeObject.calcTransformMatrix();
            const options = fabric.util.qrDecompose(matrix);
            const target = {
              top: options.translateY,
              left: options.translateX,
              angle: options.angle,
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

      if (isLocalObject(e.target.id, userId)) {
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

        eventSerializer?.push('scaled', payload);
      }
    });

    canvas?.on('object:skewed', (e: any) => {
      if (!e.target.id) {
        return;
      }

      if (isLocalObject(e.target.id, userId)) {
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

      if (isLocalObject(e.target.id, userId)) {
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

      if (isLocalObject(e.target.id, userId)) {
        const payload = {
          id: e.target.id,
        };

        eventSerializer?.push('removed', payload as ObjectEvent);
      }
    });

    eventController?.on(
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
        if (isLocalObject(id, userId)) return;

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

    eventController?.on(
      'moved',
      (id: string, objectType: string, target: any) => {
        if (!id) {
          return;
        }

        if (isLocalObject(id, userId)) return;

        canvas?.forEachObject(function (obj: any) {
          if (obj.id && obj.id === id) {
            if (objectType === 'activeSelection') {
              obj.set({
                angle: target.angle,
                top: target.top,
                left: target.left,
                originX: 'center',
                originY: 'center',
              });
            } else {
              obj.set({
                angle: target.angle,
                top: target.top,
                left: target.left,
                originX: 'left',
                originY: 'top',
              });
            }
          }
        });
        canvas?.renderAll();
      }
    );

    eventController?.on(
      'rotated',
      (id: string, objectType: string, target: any) => {
        if (isLocalObject(id, userId)) return;

        canvas?.forEachObject(function (obj: any) {
          if (obj.id && obj.id === id) {
            if (objectType === 'activeSelection') {
              obj.set({
                angle: target.angle,
                top: target.top,
                left: target.left,
                originX: 'center',
                originY: 'center',
              });
            } else {
              obj.set({
                angle: target.angle,
                top: target.top,
                left: target.left,
                originX: 'left',
                originY: 'top',
              });
            }
          }
        });
        canvas?.renderAll();
      }
    );

    eventController?.on('scaled', (id: string, target: any) => {
      //if (eventSerializer?.didSerializeEvent(id)) return;
      if (isLocalObject(id, userId)) return;

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

    eventController?.on('skewed', (id: string, target: any) => {
      //if (eventSerializer?.didSerializeEvent(id)) return;
      if (isLocalObject(id, userId)) return;

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

    eventController?.on(
      'colorChanged',
      (id: string, objectType: string, target: any) => {
        //if (eventSerializer?.didSerializeEvent(id)) return;
        if (isLocalObject(id, userId)) return;

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

    eventController?.on(
      'modified',
      (id: string, objectType: string, target: any) => {
        // if (eventSerializer?.didSerializeEvent(id)) return;

        if (isLocalObject(id, userId)) return;

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

    eventController?.on('fontFamilyChanged', (id: string, target: any) => {
      // if (eventSerializer?.didSerializeEvent(id)) return;

      if (isLocalObject(id, userId)) return;

      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          obj.set({
            fontFamily: target.fontFamily,
          });
        }
      });
      canvas?.renderAll();
    });

    eventController?.on('removed', (id: string) => {
      // if (eventSerializer?.didSerializeEvent(id)) return;

      if (isLocalObject(id, userId)) return;

      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          canvas?.remove(obj);
        }
      });
      canvas?.renderAll();
    });
  }, [isLocalObject, canvas, eventSerializer, eventController, userId]);

  /**
   * Send synchronization event for penColor and fontColor changes.
   * */
  useEffect(() => {
    const objects = canvas?.getActiveObjects();

    if (objects && objects.length) {
      objects.forEach((obj: any) => {
        if (isLocalObject(obj.id, userId)) {
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
  }, [isLocalObject, canvas, eventSerializer, userId, penColor, fontColor]);

  /**
   * Send synchronization event for fontFamily changes.
   * */
  useEffect(() => {
    const objects = canvas?.getActiveObjects();

    if (objects && objects.length) {
      objects.forEach((obj: any) => {
        if (isLocalObject(obj.id, userId)) {
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
  }, [isLocalObject, canvas, eventSerializer, userId, fontFamily]);

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
      actions.eraseObject();

      if (canvas.getActiveObjects().length === 1) {
        canvas.discardActiveObject().renderAll();
      }
    } else if (canvas) {
      actions.setCanvasSelection(true);
    }

    return () => {
      canvas?.off('mouse:down');
      canvas?.off('mouse:up');
      canvas?.off('mouse:over');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eraseType, canvas]);

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

  // NOTE: Register canvas actions with context.
  useEffect(() => {
    updateCanvasActions(actions);
  }, [actions, updateCanvasActions]);

  const canvasStyle: CSSProperties = {
    border: '2px blue solid',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
  };

  const pointerEventsStyle = pointerEvents ? undefined : 'none';

  return (
    <div
      className="canvas-wrapper"
      style={{
        ...canvasStyle,
        height,
        pointerEvents: pointerEventsStyle,
        display: display ? 'inline-block' : 'none',
      }}
      onClick={() => {
        actions.addShape();
      }}
    >
      {children}
      <canvas width="1024" height="1024" id={instanceId} />
    </div>
  );
};
