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

import { useCanvasActions } from './canvas-actions/useCanvasActions';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import useSynchronizedAdded from './synchronization-hooks/useSynchronizedAdded';
import useSynchronizedMoved from './synchronization-hooks/useSynchronizedMoved';
import { isEmptyShape, isFreeDrawing, isShape } from './utils/shapes';
import { TypedShape } from '../../interfaces/shapes/shapes';

import '../../assets/style/whiteboard.css';
import { UndoRedo } from './hooks/useUndoRedoEffect';
import useSynchronizedColorChanged from './synchronization-hooks/useSynchronizedColorChanged';
import useSynchronizedFontFamilyChanged from './synchronization-hooks/useSynchronizedFontFamilyChanged';
import useSynchronizedModified from './synchronization-hooks/useSynchronizedModified';
import useSynchronizedRemoved from './synchronization-hooks/useSynchronizedRemoved';
import useSynchronizedRotated from './synchronization-hooks/useSynchronizedRotated';
import useSynchronizedScaled from './synchronization-hooks/useSynchronizedScaled';
import useSynchronizedSkewed from './synchronization-hooks/useSynchronizedSkewed';
import useSynchronizedReconstruct from './synchronization-hooks/useSynchronizedReconstruct';
import { SET, SET_GROUP, UNDO, REDO } from './reducers/undo-redo';

/**
 * @field instanceId: Unique ID for this canvas. This enables fabricjs canvas to know which target to use.
 * @field userId: The user's ID, events originating from this canvas will contain this ID.
 * @field style: How the canvas should be styled.
 * @field pointerEvents: Enable or disable pointer interaction.
 * @field width: The width of this canvas.
 * @field height: The height of this canvas.
 * @field filterUsers: Only render remote events originating from userId's in this list.
 */
export type Props = {
  children?: ReactChild | ReactChildren | null | any;
  instanceId: string;
  userId: string;
  initialStyle?: CSSProperties;
  pointerEvents: boolean;
  width?: string | number;
  height: string | number;
  cssWidth?: string | number;
  cssHeight?: string | number;
  filterUsers?: string[];
};

export const WhiteboardCanvas: FunctionComponent<Props> = ({
  children,
  instanceId,
  userId,
  initialStyle,
  pointerEvents,
  width,
  height,
  cssWidth,
  cssHeight,
}: Props): JSX.Element => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  const [wrapper, setWrapper] = useState<HTMLElement>();
  const [lowerCanvas, setLowerCanvas] = useState<HTMLCanvasElement>();
  const [upperCanvas, setUpperCanvas] = useState<HTMLCanvasElement>();

  // Event serialization for synchronizing whiteboard state.
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  const { dispatch: undoRedoDispatch } = UndoRedo(
    canvas as fabric.Canvas,
    eventSerializer,
    userId
  );

  const {
    text,
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
    lineWidth,
    updateCanvasActions,
    shapesAreSelectable,
    shapesAreEvented,
    eventedObjects,
    floodFillIsActive,
    updatePenColor,
    updateLineWidth,
    updateShape,
    updateShapeColor,
    floodFill,
  } = useContext(WhiteboardContext);

  const { actions, mouseDown } = useCanvasActions(
    canvas,
    undoRedoDispatch,
    instanceId,
    eventSerializer,
    userId
  );

  /**
   * Creates Canvas/Whiteboard instance
   */
  useEffect(() => {
    // @ts-ignore
    const canvasInstance = new fabric.Canvas(instanceId, {
      backgroundColor: undefined,
      isDrawingMode: false,
      selectionBorderColor: 'rgba(100, 100, 255, 1)',
      selectionLineWidth: 2,
      selectionColor: 'rgba(100, 100, 255, 0.1)',
      selectionDashArray: [10],
    });

    setCanvas(canvasInstance);
  }, [instanceId]);

  /**
   * Retrieve references to elements created by fabricjs. We'll need these to
   * tweak the style after canvas have been initialized.
   */
  useEffect(() => {
    if (!canvas) return;

    const lowerCanvas = document.getElementById(instanceId);
    const wrapper = lowerCanvas?.parentElement;
    const upperCanvas = wrapper?.getElementsByClassName('upper-canvas')[0];

    if (wrapper) setWrapper(wrapper);
    if (lowerCanvas) setLowerCanvas(lowerCanvas as HTMLCanvasElement);
    if (upperCanvas) setUpperCanvas(upperCanvas as HTMLCanvasElement);
  }, [canvas, instanceId]);

  /**
   * Update the CSS Width/Height
   */
  useEffect(() => {
    if (wrapper && lowerCanvas && upperCanvas) {
      if (cssWidth) {
        wrapper.style.width = String(cssWidth);
        lowerCanvas.style.width = String(cssWidth);
        upperCanvas.style.width = String(cssWidth);
      }

      if (cssHeight) {
        wrapper.style.height = String(cssHeight);
        lowerCanvas.style.height = String(cssHeight);
        upperCanvas.style.height = String(cssHeight);
      }
    }
  }, [wrapper, lowerCanvas, upperCanvas, cssWidth, cssHeight]);

  /**
   * Update the pointer events to make canvas click through.
   */
  useEffect(() => {
    if (wrapper && lowerCanvas && upperCanvas) {
      const pointerEventsStyle = pointerEvents ? 'auto' : 'none';

      wrapper.style.pointerEvents = pointerEventsStyle;
      lowerCanvas.style.pointerEvents = pointerEventsStyle;
      upperCanvas.style.pointerEvents = pointerEventsStyle;
    }
  }, [lowerCanvas, pointerEvents, upperCanvas, wrapper]);

  /** Update objects selectable/evented state. */
  useEffect(() => {
    if (!canvas) {
      return;
    }

    canvas.getObjects().forEach((object: any) => {
      if ((object.id && isLocalObject(object.id, userId)) || !object.id) {
        object.set({
          selectable: shapesAreSelectable,
          evented: shapesAreSelectable || shapesAreEvented,
        });
      }
    });

    canvas.selection = shapesAreSelectable;
    canvas.renderAll();
  }, [canvas, isLocalObject, shapesAreEvented, shapesAreSelectable, userId]);

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
    const pathCreated = (e: any) => {
      e.path.strokeUniform = true;
      canvas?.renderAll();
    };

    if (brushIsActive && canvas) {
      canvas.freeDrawingBrush = new fabric.PencilBrush();

      //@ts-ignore
      canvas.freeDrawingBrush.canvas = canvas;
      canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
      canvas.freeDrawingBrush.width = lineWidth;
      canvas.isDrawingMode = true;

      canvas.on('path:created', pathCreated);
    } else if (canvas && !brushIsActive) {
      canvas.isDrawingMode = false;
    }

    return () => {
      canvas?.off('path:created');
    };
  }, [brushIsActive, canvas, lineWidth, penColor]);

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
   * Activates the mouseDown event if shape exists and shapeIsActive is true
   */
  useEffect(() => {
    if (shape && shapeIsActive) {
      actions.discardActiveObject();
      canvas?.forEachObject((object) => {
        // @ts-ignore
        if (object.id && isLocalObject(object.id, userId)) {
          object.set({
            evented: false,
            selectable: false,
          });
        }
      });

      actions.addShape(shape);
    }

    return () => {
      if (!textIsActive && !floodFillIsActive && !shapesAreEvented) {
        canvas?.off('mouse:down');
      }

      if (eraseType !== 'object') {
        canvas?.off('mouse:up');
      }

      canvas?.off('mouse:move');
    };
  }, [
    canvas,
    shape,
    shapeIsActive,
    mouseDown,
    penColor,
    shapeColor,
    actions,
    textIsActive,
    isLocalObject,
    userId,
    floodFillIsActive,
    shapesAreSelectable,
    eraseType,
    shapesAreEvented,
  ]);

  /**
   * General handler for keyboard events
   * 'Backspace' event for removing selected element from whiteboard
   * 'Escape' event for deselect active objects
   * */
  const keyDownHandler = useCallback(
    (e: {
      key: any;
      which?: number;
      ctrlKey?: boolean;
      shiftKey?: boolean;
    }) => {
      // The following two blocks, used for undo and redo, can not
      // be integrated while there are two boards in the canvas.
      // if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
      //   dispatch({ type: UNDO, canvasId });
      //   return;
      // }

      // if (e.which === 89 && e.ctrlKey) {
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
   * Get the color of the clicked area in the Whiteboard
   * and returns it in hexadecimal code
   * @param {IEvent} event - click event
   */
  const getColorInCoord = useCallback(
    (x: number, y: number): string | null => {
      if (canvas) {
        const colorData = canvas
          .getContext()
          .getImageData(x, y, 1, 1)
          .data.slice(0, 3);
        return (
          '#' +
          (
            (1 << 24) +
            (colorData[0] << 16) +
            (colorData[1] << 8) +
            colorData[2]
          )
            .toString(16)
            .slice(1)
        );
      }

      return null;
    },
    [canvas]
  );

  /**
   * Reorder the current shapes letting the shapes over their container shape
   */
  const reorderShapes = useCallback(() => {
    canvas?.forEachObject((actual) => {
      canvas.forEachObject((compare) => {
        if (actual.isContainedWithinObject(compare)) {
          canvas.bringForward(actual);
        }
      });
    });
  }, [canvas]);

  /**
   * Trigger the changes in the required variables
   * when a certain object is selected
   * @param {IEvent} event - event that contains the selected object
   */
  const manageChanges = useCallback(
    (event: fabric.IEvent) => {
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
          updateLineWidth(
            event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH
          );
        } else if (event.target.fill) {
          updateShapeColor(
            event.target.fill.toString() || DEFAULT_VALUES.SHAPE_COLOR
          );
        }
      }
    },
    [updateLineWidth, updatePenColor, updateShape, updateShapeColor]
  );

  /** Set up mangeChanges callback. */
  useEffect(() => {
    if (!canvas) return;

    canvas.on('selection:created', manageChanges);
    canvas.on('selection:updated', manageChanges);

    return () => {
      canvas.off('selection:created', manageChanges);
      canvas.off('selection:updated', manageChanges);
    };
  }, [canvas, manageChanges]);

  /**
   * Make a mouse down event below of the clicked shape
   * @param {IEvent} event - Contains the x, y coords of the clicked point
   */
  const manageShapeOutsideClick = useCallback(
    (event: fabric.IEvent) => {
      let foundShape: fabric.Object | null = null;

      canvas?.forEachObject((object: fabric.Object) => {
        if (
          event.pointer &&
          isEmptyShape(object) &&
          object.containsPoint(event.pointer) &&
          object !== event.target
        ) {
          foundShape = object;
        }
      });

      if (event.pointer) {
        canvas?.trigger('mouse:down', {
          target: foundShape,
          pointer: {
            x: event.pointer.x,
            y: event.pointer.y,
          },
        });
      }
    },
    [canvas]
  );

  /**
   * Set the objects like evented if you select pointer or move tool
   */
  useEffect(() => {
    if (eventedObjects) {
      canvas?.forEachObject((object: any) => {
        if (object.id && isLocalObject(object.id, userId)) {
          object.set({
            evented: true,
            selectable: true,
          });
        }
      });

      actions.setHoverCursorObjects('move');
    }
  }, [actions, canvas, eventedObjects, isLocalObject, userId]);

  /**
   * Manages the logic for Flood-fill Feature
   */
  useEffect(() => {
    let originalStroke = null;
    let originalFill = null;
    let clickedColor: string | null = null;
    const differentFill = '#dcdcdc';
    const differentStroke = '#c8c8c8';

    if (floodFillIsActive) {
      canvas?.forEachObject((object: TypedShape) => {
        object.set({
          perPixelTargetFind: isEmptyShape(object) ? false : true,
          hoverCursor: 'auto',
        });
      });

      reorderShapes();
      canvas?.renderAll();

      canvas?.on('mouse:down', (event: fabric.IEvent) => {
        // Click out of any object
        if (!event.target) {
          canvas.backgroundColor = floodFill;
        }

        // Click on object shape
        if (event.target && event.pointer && isEmptyShape(event.target)) {
          // Store the current stroke and fill colors to reset them
          originalStroke = event.target.stroke;
          originalFill = event.target.fill;

          // Change stroke to a provisional color to be identified
          event.target.set({
            stroke: differentStroke,
            fill: differentFill,
          });
          canvas.renderAll();

          clickedColor = getColorInCoord(event.pointer.x, event.pointer.y);

          if (clickedColor === differentFill) {
            // If user click inside of the shape
            event.target.set({
              fill: floodFill,
              stroke: originalStroke,
            });
          } else if (clickedColor === differentStroke) {
            // If user click in the border of the shape
            event.target.set({
              stroke: originalStroke,
              fill: originalFill,
            });
          } else {
            // If user click outside of the shape
            event.target.set({
              stroke: originalStroke,
              fill: originalFill,
            });

            if (event.e) {
              manageShapeOutsideClick(event);
            }
          }
        }

        canvas.renderAll();
      });
    }
  }, [
    actions,
    canvas,
    floodFill,
    floodFillIsActive,
    getColorInCoord,
    manageShapeOutsideClick,
    reorderShapes,
  ]);

  /**
   * If the input field (text) has length
   * will unselect whiteboard active objects
   * */
  useEffect(() => {
    if (text.length) {
      actions.discardActiveObject();
    }
  }, [actions, text]);

  /**
   * Add keyboard keydown event listener. It listen keyDownHandler function
   * Invokes fontFamilyLoader to set default and selected font family
   * */
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler, false);
    fontFamilyLoader(fontFamily);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [fontFamily, keyDownHandler, fontFamilyLoader]);

  const filterOutgoingEvents = useCallback(
    (id: string): boolean => {
      if (!id) return false;

      const apply = isLocalObject(id, userId);
      if (apply) {
        //console.log(`send local event ${id} to remote`);
      }
      return apply;
    },
    [isLocalObject, userId]
  );

  const filterIncomingEvents = useCallback(
    (id: string): boolean => {
      if (!id) return false;

      // TODO: isLocalObject will not work in case we're reloading
      // the page and server resends all our events. They would be
      // discarded when they shouldn't be discarded. Another solution
      // could be to keep track of all 'local' objects we've created
      // this session and only filter those.
      // TODO: Filter based on the filterUsers list. We should only
      // display events coming from users in that list if the list
      // isn't undefined.
      const apply = !isLocalObject(id, userId);
      if (apply) {
        // console.log(`apply remote event ${id} locally.`);
      }
      return apply;
    },
    [isLocalObject, userId]
  );

  useSynchronizedAdded(
    canvas,
    userId,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedMoved(
    canvas,
    userId,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedModified(canvas, filterOutgoingEvents, filterIncomingEvents);
  useSynchronizedRemoved(
    canvas,
    userId,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedRotated(
    canvas,
    userId,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedScaled(
    canvas,
    userId,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedSkewed(canvas, filterOutgoingEvents, filterIncomingEvents);
  useSynchronizedReconstruct(canvas, filterIncomingEvents, userId, undoRedoDispatch);
  useSynchronizedColorChanged(
    canvas,
    userId,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedFontFamilyChanged(canvas, filterIncomingEvents);

  /**
   * Send synchronization event for penColor and fontColor changes.
   * */
  useEffect(() => {
    const objects = canvas?.getActiveObjects();

    if (objects && objects.length) {
      objects.forEach((obj: any) => {
        const type = obj.get('type');

        if (obj.id && isLocalObject(obj.id, userId)) {
          const target = (type: string) => {
            return type === 'textbox'
              ? { fill: obj.fill }
              : { stroke: obj.stroke, strokeWidth: obj.strokeWidth };
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
  }, [
    isLocalObject,
    canvas,
    eventSerializer,
    userId,
    penColor,
    fontColor,
    undoRedoDispatch,
  ]);

  useEffect(() => {
    if (fontColor && canvas) {
      const obj = canvas.getActiveObject() as any;
   
      if (!obj) return;
  
      const type = obj?.get('type');

      if (type !== 'textbox') return;
      
      const payload = {
        type,
        target: { fill: obj?.fill },
        id: obj?.id,
      };

      const event = { event: payload, type: 'colorChanged' };

      undoRedoDispatch({
        type: SET,
        payload: (canvas?.getObjects() as unknown) as TypedShape[],
        canvasId: userId,
        event,
      });
    }
  }, [fontColor, canvas, undoRedoDispatch, userId]);


  useEffect(() => {
    if (penColor && canvas) {
      const obj = canvas.getActiveObject() as any;

      if (!obj) return;

      const type = obj?.get('type');

      if (type === 'textbox') return;
      
      const payload = {
        type,
        target: { stroke: obj?.stroke },
        id: obj?.id,
      };

      const event = { event: payload, type: 'colorChanged' };

      undoRedoDispatch({
        type: SET,
        payload: (canvas?.getObjects() as unknown) as TypedShape[],
        canvasId: userId,
        event,
      });
    }
  }, [penColor, canvas, undoRedoDispatch, userId]);

  useEffect(() => {
    if (lineWidth && canvas) {
      const obj = canvas.getActiveObject() as any;

      if (!obj) return;

      const type = obj?.get('type');

      if (type === 'textbox') return;
      
      const payload = {
        type,
        target: { strokeWidth: obj?.strokeWidth },
        id: obj?.id,
      };
      
      const event = { event: payload, type: 'colorChanged' };

      undoRedoDispatch({
        type: SET,
        payload: (canvas?.getObjects() as unknown) as TypedShape[],
        canvasId: userId,
        event,
      });
    }
  }, [lineWidth, canvas, undoRedoDispatch, userId]);

  /**
   * Send synchronization event for fontFamily changes.
   * */
  useEffect(() => {
    const objects = canvas?.getActiveObjects();

    if (objects && objects.length) {
      objects.forEach((obj: any) => {
        if (obj.id && isLocalObject(obj.id, userId)) {
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


  useEffect(() => {
    if (canvas && fontFamily) {  
      const obj = canvas?.getActiveObject() as any;
      const type = obj?.get('type');

      if (type === 'textbox' && obj) {

        const target = {
          fontFamily,
        };

        const payload = {
          type,
          target,
          id: obj?.id,
        };
        
        const event = { event: payload, type: 'fontFamilyChanged' };

        obj.set({ fontFamily });

        undoRedoDispatch({
          type: SET,
          payload: (canvas?.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
          event,
        });
      } else if (obj?.type === 'activeSelection') {
        let events: any[] = [];
        const eventId: string = uuidv4();

        obj._objects.forEach((object: any) => {
          const payload = {
            type,
            target: { fontFamily },
            id: object.id,
          };
  
          const event = { event: payload, type: 'activeSelection', eventId };
          events.push(event);
          object.set({ fontFamily });
        });

        let mappedObjects = canvas?.getObjects().map((object: any) => {
          if (!object.group) {
            return object.toJSON(['strokeUniform', 'id']);
          }
          const matrix = object.calcTransformMatrix();
          const options = fabric.util.qrDecompose(matrix);
          const transformed = object.toJSON(['strokeUniform', 'id']);
          let top = (object.group.height / 2 + object.top) + object.group.top;
          let left = (object.group.width / 2 + object.left) + object.group.left;
  
          events.forEach((event: any) => {
            if (event.event.id === object.id) {
              event.event.target.top = top;
              event.event.target.left = left;
            }
          });
  
          return {
            ...transformed,
            top,
            left,
            scaleX: options.scaleX,
            scaleY: options.scaleY,
          }
        });

        undoRedoDispatch({
          type: SET_GROUP,
          payload: mappedObjects as TypedShape[],
          canvasId: userId,
          event: events,
        });
      }
    }

  }, [canvas, fontFamily, undoRedoDispatch, userId]);

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
    }

    return () => {
      if (!textIsActive) {
        canvas?.off('mouse:down');
      }

      canvas?.off('mouse:up');
      canvas?.off('mouse:over');
    };
  }, [eraseType, canvas, actions, textIsActive]);

  useEffect(() => {
    if (shape && shapeIsActive) {
      mouseDown(shape, shapeColor);
    }

    return () => {
      if (!textIsActive) {
        canvas?.off('mouse:down');
      }
      canvas?.off('mouse:move');
      canvas?.off('mouse:up');
    };
  }, [canvas, shape, shapeIsActive, mouseDown, shapeColor, textIsActive]);

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
  }, [lineWidth, canvas]);

  // NOTE: Register canvas actions with context.
  useEffect(() => {
    updateCanvasActions(actions);
  }, [actions, updateCanvasActions]);


  // Will be modified once only one board is visible.
  const keyDown = (e: any) => {
    if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
      undoRedoDispatch({ type: UNDO, canvasId: instanceId });
      return;
    }

    if (e.which === 89 && e.ctrlKey) {
      undoRedoDispatch({ type: REDO, canvasId: instanceId });
      return;
    }
  }

  // TODO: Possible to have dynamically sized canvas? With raw canvas it's
  // possible to set the "pixel (background)" size separately from the
  // style size. So we can have a fixed resolution draw buffer and it will
  // be scaled based on the style size. This might be important to make
  // the canvas size adopt to the content behind it. The content behind
  // canvas doesn't have a fixed size and could vary between different
  // activities etc. For now the user will have to pass in the exact
  // width and height they want to have the canvas in.
  // Note: Added div wrapper to execute onKeyDown. Once canvas final form
  // takes place, this may or may not be modified.

  return (
    <div
      tabIndex={0}
      onKeyDown={keyDown}
      style={{ backgroundColor: 'transparent '}}
    >
      <canvas
        width={width}
        height={height}
        id={instanceId}
        style={initialStyle}
        tabIndex={0}
        onClick={() => {
          actions.addShape(shape);
        }}
      >
        {children}
      </canvas>
    </div>
  );
};
