import { fabric } from 'fabric';
import floodFillCursor from '../../assets/cursors/flood-fill.png';

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
import FontFaceObserver from 'fontfaceobserver';
import { useCanvasActions } from './canvas-actions/useCanvasActions';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import useSynchronizedAdded from './synchronization-hooks/useSynchronizedAdded';
import useSynchronizedMoved from './synchronization-hooks/useSynchronizedMoved';
import { isEmptyShape, isFreeDrawing, isShape, isText } from './utils/shapes';
import { TypedShape } from '../../interfaces/shapes/shapes';

import '../../assets/style/whiteboard.css';
import { UndoRedo } from './hooks/useUndoRedoEffect';
import useSynchronizedColorChanged from './synchronization-hooks/useSynchronizedColorChanged';
import useSynchronizedFontFamilyChanged from './synchronization-hooks/useSynchronizedFontFamilyChanged';
import useSynchronizedRemoved from './synchronization-hooks/useSynchronizedRemoved';
import useSynchronizedRotated from './synchronization-hooks/useSynchronizedRotated';
import useSynchronizedScaled from './synchronization-hooks/useSynchronizedScaled';
import useSynchronizedSkewed from './synchronization-hooks/useSynchronizedSkewed';
import useSynchronizedReconstruct from './synchronization-hooks/useSynchronizedReconstruct';
import useSynchronizedPointer from './synchronization-hooks/useSynchronizedPointer';
import useSynchronizedSetToolbarPermissions from './synchronization-hooks/useSynchronizedSetToolbarPermissions';
import useSynchronizedFontColorChanged from './synchronization-hooks/useSynchronizedFontColorChanged';
import { SET, SET_GROUP } from './reducers/undo-redo';
import { ICanvasFreeDrawingBrush } from '../../interfaces/free-drawing/canvas-free-drawing-brush';
import { ICanvasObject } from '../../interfaces/objects/canvas-object';
import { IEvent, ITextOptions, Canvas } from 'fabric/fabric-impl';
import {
  ObjectEvent,
  ObjectType,
} from './event-serializer/PaintEventSerializer';
import { ICanvasDrawingEvent } from '../../interfaces/canvas-events/canvas-drawing-event';
import { IWhiteboardContext } from '../../interfaces/whiteboard-context/whiteboard-context';
import { IUndoRedoEvent } from '../../interfaces/canvas-events/undo-redo-event';
import useSynchronizedLineWidthChanged from './synchronization-hooks/useSynchronizedLineWidthChanged';
import useFixedAspectScaling, {
  ScaleMode,
} from './utils/useFixedAspectScaling';
import { PainterEvents } from './event-serializer/PainterEvents';
import useSynchronizedModified from './synchronization-hooks/useSynchronizedModified';

/**
 * @field instanceId: Unique ID for this canvas. This enables fabricjs canvas to know which target to use.
 * @field userId: The user's ID, events originating from this canvas will contain this ID.
 * @field style: How the canvas should be styled.
 * @field pointerEvents: Enable or disable pointer interaction.
 * @field pixelWidth: The width of this canvas buffer in pixels.
 * @field pixelHeight: The height of this canvas buffer in pixels.
 * @field filterUsers: Only render remote events originating from userId's in this list.
 * @field scaleMode: Determines how the canvas should scale if parent element doesn't match aspect ratio.
 */
export type Props = {
  children?: ReactChild | ReactChildren | null;
  instanceId: string;
  userId: string;
  initialStyle?: CSSProperties;
  pointerEvents: boolean;
  pixelWidth: number;
  pixelHeight: number;
  filterUsers?: string[];
  display?: boolean;
  scaleMode?: ScaleMode;
  centerHorizontally?: boolean;
  centerVertically?: boolean;
};

export type EventFilterFunction = (id: string, generatedBy?: string) => boolean;

export const WhiteboardCanvas: FunctionComponent<Props> = ({
  children,
  instanceId,
  userId,
  initialStyle,
  pointerEvents,
  pixelWidth,
  pixelHeight,
  display,
  scaleMode,
  centerHorizontally,
  centerVertically,
}: Props): JSX.Element => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [wrapper, setWrapper] = useState<HTMLElement>();
  const [lowerCanvas, setLowerCanvas] = useState<HTMLCanvasElement>();
  const [upperCanvas, setUpperCanvas] = useState<HTMLCanvasElement>();
  const [generatedBy] = useState<string>(uuidv4());

  const { width, height, top, left } = useFixedAspectScaling(
    wrapper?.parentElement,
    pixelWidth / pixelHeight,
    scaleMode || 'ScaleToFit',
    centerHorizontally || false,
    centerVertically || false
  );

  // Event serialization for synchronizing whiteboard state.
  const {
    state: { eventSerializer, eventController },
    requestAllEvents,
  } = useSharedEventSerializer();

  const { dispatch: undoRedoDispatch } = UndoRedo(
    canvas as fabric.Canvas,
    eventSerializer,
    generatedBy,
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
    laserIsActive,
    allowPointer,
    universalPermits,
    toolbarIsEnabled,
    setToolbarIsEnabled,
  } = useContext(WhiteboardContext) as IWhiteboardContext;

  const { actions, mouseDown } = useCanvasActions(
    userId,
    instanceId,
    generatedBy,
    canvas,
    undoRedoDispatch,
    eventSerializer,
  );

  /**
   * Creates Canvas/Whiteboard instance
   */
  useEffect(() => {
    const canvasInstance = new fabric.Canvas(instanceId, {
      backgroundColor: undefined,
      isDrawingMode: false,
      allowTouchScrolling: false,
      selectionBorderColor: 'rgba(100, 100, 255, 1)',
      selectionLineWidth: 2,
      selectionColor: 'rgba(100, 100, 255, 0.1)',
      selectionDashArray: [10],
    });

    setCanvas(canvasInstance);
  }, [instanceId]);

  /** 
   * Reset the canvas state in case the event controller will replay all events.
   */
  useEffect(() => {
    if (!canvas) return;
    if (!eventController) return;

    const reset = () => {
      canvas.clear();
    };

    eventController.on('aboutToReplayAll', reset);

    return () => {
      eventController.removeListener('aboutToReplayAll', reset);
    }

  }, [canvas, eventController]);

  /**
   * Enable or disable allow touch scroll based on pointer events.
   */
  useEffect(() => {
    if (!canvas) return;
    canvas.allowTouchScrolling = !pointerEvents;
  }, [pointerEvents, canvas]);

  /**
   * Retrieve references to elements created by fabricjs. We'll need these to
   * tweak the style after canvas have been initialized.
   */
  useEffect(() => {
    if (!canvas) return;

    const lowerCanvas = document.getElementById(instanceId);
    const wrapper = lowerCanvas?.parentElement;
    const upperCanvas = wrapper?.getElementsByClassName('upper-canvas')[0];

    if (wrapper) {
      setWrapper(wrapper);

      // TODO: We may want to make the position style
      // controlled by property or variable.
      wrapper.style.position = 'absolute';

      if (initialStyle && initialStyle.zIndex) {
        wrapper.style.zIndex = String(initialStyle.zIndex);
      }
    }
    if (lowerCanvas) setLowerCanvas(lowerCanvas as HTMLCanvasElement);
    if (upperCanvas) setUpperCanvas(upperCanvas as HTMLCanvasElement);
  }, [canvas, initialStyle, instanceId]);

  /**
   * Update wrapper display state.
   */
  useEffect(() => {
    if (!wrapper) return;

    if (display === false) {
      wrapper.style.display = 'none';
    } else {
      wrapper.style.removeProperty('display');
    }
  }, [wrapper, display]);

  /**
   * Update the CSS Width/Height
   */
  useEffect(() => {
    if (wrapper && lowerCanvas && upperCanvas) {
      const widthStyle = `${width}px`;
      wrapper.style.width = widthStyle;
      lowerCanvas.style.width = widthStyle;
      upperCanvas.style.width = widthStyle;

      const heightStyle = `${height}px`;
      wrapper.style.height = heightStyle;
      lowerCanvas.style.height = heightStyle;
      upperCanvas.style.height = heightStyle;

      const wrapperTransform = `translate(${left}px, ${top}px)`;
      wrapper.style.transform = wrapperTransform;

      wrapper.style.top = '0px';
      wrapper.style.left = '0px';
    }
  }, [wrapper, lowerCanvas, upperCanvas, width, height, left, top]);

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

    canvas.getObjects().forEach((object: ICanvasObject) => {
      if ((object.id && PainterEvents.isCreatedWithId(object.id, userId)) || !object.id) {
        object.set({
          selectable: shapesAreSelectable,
          evented: shapesAreSelectable || shapesAreEvented,
        });
      }
    });

    canvas.selection = shapesAreSelectable;
    canvas.renderAll();
  }, [canvas, shapesAreEvented, shapesAreSelectable, userId]);

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
          text.hiddenTextarea?.focus();

          text.on('editing:exited', () => {
            const textCopy = text.text;
            const toObject = text.toObject();
            delete toObject.text;
            delete toObject.type;
            const clonedTextObj = JSON.parse(JSON.stringify(toObject));

            if (typeof textCopy === 'string') {
              text = new fabric.Textbox(textCopy, clonedTextObj);
            }

            canvas.remove(canvas.getActiveObject());

            const canvasObject = text as ICanvasObject;
            canvasObject.set('generatedBy', generatedBy);

            canvas.add(canvasObject);
            canvas.setActiveObject(canvasObject);

            if (canvasObject.text?.replace(/\s/g, '').length === 0) {
              canvas.remove(canvasObject);
              return;
            }

            canvasObject.on('modified', () => {
              if (canvasObject.text?.replace(/\s/g, '').length === 0) {
                canvas.remove(canvasObject);
              }
            });
          });
        }
      });
    }

    return () => {
      if (!eraseType) {
        canvas?.off('mouse:down');
      }
    };
  }, [canvas, textIsActive, fontColor, fontFamily, updateFontFamily, updateFontColor, userId, eraseType, generatedBy]);

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
    const pathCreated = (e: ICanvasDrawingEvent) => {
      if (!e.path) throw new Error('path:created event without path object.');

      e.path.strokeUniform = true;
      canvas?.renderAll();
    };

    if (brushIsActive && canvas) {
      canvas.freeDrawingBrush = new fabric.PencilBrush();

      (canvas.freeDrawingBrush as ICanvasFreeDrawingBrush).canvas = canvas;
      canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
      canvas.freeDrawingBrush.width = lineWidth;
      canvas.isDrawingMode = toolbarIsEnabled;

      canvas.on('path:created', pathCreated);
    } else if (canvas && !brushIsActive) {
      canvas.isDrawingMode = false;
    }

    return () => {
      canvas?.off('path:created', pathCreated);
    };
  }, [brushIsActive, canvas, lineWidth, penColor, toolbarIsEnabled]);

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
    if (shape && shapeIsActive && toolbarIsEnabled) {
      actions.discardActiveObject();
      canvas?.forEachObject((object: ICanvasObject) => {
        if (object.id && PainterEvents.isCreatedWithId(object.id, userId)) {
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

      if (!laserIsActive) {
        canvas?.off('mouse:move');
      }
    };
  }, [canvas, shape, shapeIsActive, mouseDown, penColor, shapeColor, actions, textIsActive, userId, floodFillIsActive, shapesAreSelectable, eraseType, shapesAreEvented, laserIsActive, toolbarIsEnabled]);

  /**
   * General handler for keyboard events
   * 'Backspace' event for removing selected element from whiteboard
   * 'Escape' event for deselect active objects
   * */
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
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

        objects.forEach((object: fabric.Object) => {
          if (!(object as ITextOptions)?.isEditing) {
            e.preventDefault();
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
   * Send synchronization event for fontFamily changes.
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

            const objects = canvas?.getActiveObjects();

            if (objects && objects.length) {
              objects.forEach((obj: ICanvasObject) => {
                if (obj.id && PainterEvents.isCreatedWithId(obj.id, userId)) {
                  const type = obj.get('type');

                  if (type === 'textbox') {
                    const target = {
                      fontFamily: obj.fontFamily,
                    } as ICanvasObject;

                    const payload: ObjectEvent = {
                      type,
                      target,
                      id: obj.id,
                    };

                    eventSerializer?.push('fontFamilyChanged', generatedBy, payload);
                  }
                }
              });
            }
          }
        })
        .catch((e: IEvent) => {
          console.log(e);
        });
    },
    [canvas, eventSerializer, generatedBy, userId]
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
          .getImageData(
            x * window.devicePixelRatio,
            y * window.devicePixelRatio,
            1,
            1
          )
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
    let temporal;
    let actualIndex;
    let compareIndex;

    const getObjectIndex = (object: ICanvasObject, canvas: Canvas) => {
      return canvas.getObjects().indexOf(object);
    };

    canvas?.forEachObject((actual) => {
      canvas.forEachObject((compare) => {
        actualIndex = getObjectIndex(actual, canvas);
        compareIndex = getObjectIndex(compare, canvas);

        if (
          actual.isContainedWithinObject(compare) &&
          actualIndex < compareIndex
        ) {
          temporal = getObjectIndex(actual, canvas);
          actual.moveTo(compareIndex);
          compare.moveTo(temporal);
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
      reorderShapes();

      // Free Drawing Line Selected
      if (
        !shapeIsActive &&
        !brushIsActive &&
        ((event.target && isFreeDrawing(event.target)) ||
          (event.target && isEmptyShape(event.target)))
      ) {
        const canvasObject = event.target as ICanvasObject;
        canvasObject.set('generatedBy', generatedBy);

        updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
        updateLineWidth(event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH);
      }

      // Shape Selected
      if (event.target && isShape(event.target) && !shapeIsActive) {
        updateShape(event.target.name || DEFAULT_VALUES.SHAPE);

        const canvasObject = event.target as ICanvasObject;
        canvasObject.set('generatedBy', generatedBy);

        if (
          (event.target as TypedShape).shapeType === 'shape' &&
          !brushIsActive
        ) {
          updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
          updateLineWidth(
            event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH
          );
        } else if (event.target.fill && !brushIsActive) {
          updateShapeColor(
            event.target.fill.toString() || DEFAULT_VALUES.SHAPE_COLOR
          );
        }
      }

      // Text Selected
      if (event.target && isText(event.target)) {
        const canvasObject = event.target as ICanvasObject;
        canvasObject.set('generatedBy', generatedBy);

        const newFont = (event.target as ITextOptions).fontFamily;
        const newFontColor = event.target.fill;

        if (newFont && newFontColor) {
          updateFontFamily(newFont);
          updateFontColor(newFontColor.toString());
        }
      }
    },
    [reorderShapes, shapeIsActive, brushIsActive, generatedBy, updatePenColor, updateLineWidth, updateShape, updateShapeColor, updateFontFamily, updateFontColor]
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
   * Set the given visibility in all the controls in the given object.
   * @param {ICanvasObject} object - Object to set controls visibility.
   * @param {boolean} visibility - Visibility state.
   */
  const setObjectControlsVisibility = (
    object: ICanvasObject,
    visibility: boolean
  ) => {
    object.setControlsVisibility({
      bl: visibility,
      br: visibility,
      mb: visibility,
      ml: visibility,
      mr: visibility,
      mt: visibility,
      tl: visibility,
      tr: visibility,
      mtr: visibility,
    });
  };

  /**
   * Set the objects like evented if you select pointer or move tool
   */
  useEffect(() => {
    if (eventedObjects) {
      canvas?.forEachObject((object: ICanvasObject) => {
        if (object.id && PainterEvents.isCreatedWithId(object.id, userId)) {
          setObjectControlsVisibility(object, true);
          object.set({
            evented: true,
            selectable: true,
            lockMovementX: false,
            lockMovementY: false,
            hasBorders: true,

            // TODO: This might not be the best place to set the generatedBy property. It might be better
            // to set it whenever any object has been selected. It's required to be set because otherwise
            // the events for movement wont be sent (because the generatedBy will either be outdated or not
            // set at all).
            generatedBy,
          });
        }
      });

      actions.setHoverCursorObjects('move');
    }
  }, [actions, canvas, eventedObjects, generatedBy, userId]);

  /**
   * Manages the logic for Flood-fill Feature
   */
  useEffect(() => {
    let originalStroke = null;
    let originalFill = null;
    let originalBackground = null;
    let clickedColor: string | null = null;
    const differentFill = '#dcdcdc';
    const differentStroke = '#dbdbdb';
    const differentBackground = '#dadada';

    const isLocalShape = (shape: TypedShape) => {
      return shape.id && PainterEvents.isCreatedWithId(shape.id, userId);
    };

    if (floodFillIsActive && canvas && toolbarIsEnabled) {
      canvas.defaultCursor = `url("${floodFillCursor}") 2 15, default`;
      canvas.forEachObject((object: TypedShape) => {
        setObjectControlsVisibility(object as ICanvasObject, false);
        object.set({
          selectable: false,
          evented: true,
          lockMovementX: true,
          lockMovementY: true,
          hasBorders: false,
          hoverCursor: isLocalShape(object)
            ? `url("${floodFillCursor}") 2 15, default`
            : 'not-allowed',
          perPixelTargetFind: isShape(object) ? false : true,
        });
      });

      reorderShapes();
      canvas.renderAll();

      canvas.on('mouse:down', (event: fabric.IEvent) => {
        // Click out of any object
        if (!event.target) {
          canvas.backgroundColor = floodFill;

          const payload: ObjectEvent = {
            type: 'background',
            target: {
              fill: floodFill,
            } as ICanvasObject,
            id: '',
          };

          const eventState = {
            event: { ...payload, id: `${userId}:background` },
            type: 'colorChanged',
          } as IUndoRedoEvent;

          undoRedoDispatch({
            type: SET,
            payload: canvas.getObjects(),
            canvasId: userId,
            event: eventState,
          });

          eventSerializer?.push('colorChanged', generatedBy, payload);
        }

        // Click on object shape
        if (
          event.target &&
          event.pointer &&
          isEmptyShape(event.target) &&
          (event.target as ICanvasObject).id
        ) {
          // Store the current stroke and fill colors to reset them
          originalStroke = event.target.stroke;
          originalFill = event.target.fill;
          originalBackground = canvas.backgroundColor;

          // Change stroke to a provisional color to be identified
          event.target.set({
            stroke: differentStroke,
            fill: differentFill,
          });
          canvas.backgroundColor = differentBackground;
          canvas.renderAll();

          clickedColor = getColorInCoord(event.pointer.x, event.pointer.y);

          if (
            clickedColor === differentFill &&
            (event.target as ICanvasObject).id
          ) {
            // If user click inside of the shape
            event.target.set({
              fill: floodFill,
              stroke: originalStroke,
            });

            canvas.discardActiveObject();
            canvas.backgroundColor = originalBackground;

            const payload: ObjectEvent = {
              type: 'shape',
              target: {
                fill: event.target.fill,
                objectsOrdering: canvas
                  .getObjects()
                  .map((obj: ICanvasObject, index) => {
                    return { id: obj.id, index: index };
                  }),
              } as ICanvasObject,
              id: (event.target as ICanvasObject).id || '',
            };

            const eventState = {
              event: payload,
              type: 'colorChanged',
            } as IUndoRedoEvent;

            undoRedoDispatch({
              type: SET,
              payload: canvas.getObjects(),
              canvasId: userId,
              event: eventState,
            });

            eventSerializer?.push('colorChanged', generatedBy, payload);
          } else if (clickedColor === differentStroke) {
            // If user click in the border of the shape
            event.target.set({
              stroke: originalStroke,
              fill: originalFill,
            });
            canvas.backgroundColor = originalBackground;
          } else {
            // If user click outside of the shape
            event.target.set({
              stroke: originalStroke,
              fill: originalFill,
            });
            canvas.backgroundColor = originalBackground;

            if (event.e) {
              manageShapeOutsideClick(event);
            }
          }
        }

        canvas.renderAll();
      });
    }

    return () => {
      if (canvas) {
        canvas.defaultCursor = 'default';
      }

      if (!floodFillIsActive && eraseType !== 'object') {
        canvas?.forEachObject((object: ICanvasObject) => {
          object.set({
            hoverCursor: 'default',
            evented: false,
            perPixelTargetFind: false,
          });
        });
      }

      if (!textIsActive && eraseType !== 'object') {
        canvas?.off('mouse:down');
      }
    };
  }, [actions, canvas, floodFill, floodFillIsActive, getColorInCoord, manageShapeOutsideClick, userId, textIsActive, eventSerializer, reorderShapes, eraseType, undoRedoDispatch, toolbarIsEnabled, generatedBy]);

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
    (_id: string, eventGeneratedBy?: string): boolean => {
      // NOTE: If there's no generatedBy it's assumed the event originated from a change made 
      // in the local canvas, in that case the event will always be sent. This way it's just 
      // important to make sure every remote change assigns the generatedBy value. Important
      // to note is that objects generatedBy value will remain. So if it's set from before
      // the event might not be sent.

      if (!eventGeneratedBy) {
        return true;
      };

      return eventGeneratedBy === generatedBy;
    },
    [generatedBy]
  );

  const filterIncomingEvents = useCallback(
    (_id: string, eventGeneratedBy?: string): boolean => {
      if (!eventGeneratedBy) return false;

      // NOTE: No event serializer means the event must have originated
      // from somewhere else and it should be applied.
      if (!eventSerializer) return true;

      // TODO: Filter based on the filterUsers list. We should only
      // display events coming from users in that list if the list
      // isn't undefined.

      return eventGeneratedBy !== generatedBy;
    },
    [eventSerializer, generatedBy]
  );

  useSynchronizedAdded(
    canvas,
    userId,
    generatedBy,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedMoved(
    canvas,
    userId,
    generatedBy,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedRemoved(
    canvas,
    userId,
    generatedBy,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedRotated(
    canvas,
    userId,
    generatedBy,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedScaled(
    canvas,
    userId,
    generatedBy,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedSkewed(canvas, generatedBy, filterOutgoingEvents, filterIncomingEvents);
  useSynchronizedReconstruct(
    canvas,
    filterIncomingEvents,
    userId,
    undoRedoDispatch
  );
  useSynchronizedColorChanged(
    canvas,
    userId,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedFontFamilyChanged(canvas, filterIncomingEvents);
  useSynchronizedPointer(
    canvas,
    !allowPointer,
    universalPermits,
    filterIncomingEvents,
    userId,
    penColor,
    laserIsActive,
    allowPointer,
    generatedBy
  );
  useSynchronizedSetToolbarPermissions(
    canvas,
    userId,
    filterIncomingEvents,
    setToolbarIsEnabled
  );
  useSynchronizedFontColorChanged(
    canvas,
    userId,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedLineWidthChanged(
    canvas,
    userId,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedModified(
    canvas,
    generatedBy,
    filterOutgoingEvents,
    filterIncomingEvents,
    userId,
    undoRedoDispatch
  );

  /**
   * Send synchronization event for penColor changes.
   * */
  useEffect(() => {
    const objects = canvas?.getActiveObjects();
    if (objects && objects.length) {
      objects.forEach((obj: ICanvasObject) => {
        const type: ObjectType = obj.get('type') as ObjectType;

        if (obj.id && PainterEvents.isCreatedWithId(obj.id, userId) && type !== 'textbox') {
          const target = () => {
            return { stroke: obj.stroke };
          };

          const payload: ObjectEvent = {
            type,
            target: target() as ICanvasObject,
            id: obj.id,
          };

          eventSerializer?.push('colorChanged', generatedBy, payload);
        }
      });
    }
    /* If isLocalObject is added on dependencies,
    an unecessary colorChange event is triggered */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, eventSerializer, userId, penColor, fontColor, undoRedoDispatch]);

  /**
   * Send synchronization event for lineWidth changes
   */
  useEffect(() => {
    const objects = canvas?.getActiveObjects();
    const validTypes: string[] = [
      'rect',
      'ellipse',
      'triangle',
      'polygon',
      'path',
    ];

    if (objects && objects.length) {
      objects.forEach((obj: ICanvasObject) => {
        const type: ObjectType = obj.get('type') as ObjectType;

        if (
          obj.id &&
          PainterEvents.isCreatedWithId(obj.id, userId) &&
          validTypes.includes(type)
        ) {
          const target = () => {
            return { strokeWidth: lineWidth };
          };

          const payload: ObjectEvent = {
            type,
            target: target() as ICanvasObject,
            id: obj.id,
          };

          eventSerializer?.push('lineWidthChanged', generatedBy, payload);
        }
      });
    }
  }, [canvas, eventSerializer, generatedBy, lineWidth, userId]);

  useEffect(() => {
    if (fontColor && canvas) {
      const obj = canvas.getActiveObject() as ICanvasObject;

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
        payload: canvas?.getObjects() as TypedShape[],
        canvasId: userId,
        event: (event as unknown) as IUndoRedoEvent,
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
        payload: canvas?.getObjects() as TypedShape[],
        canvasId: userId,
        event: (event as unknown) as IUndoRedoEvent,
      });
    }
  }, [penColor, canvas, undoRedoDispatch, userId]);

  useEffect(() => {
    if (lineWidth && canvas) {
      const obj = canvas.getActiveObject() as ICanvasObject;

      if (!obj) return;

      const type = obj?.get('type');

      if (type === 'textbox') return;

      if (obj?.strokeWidth === lineWidth) return;

      const payload = {
        type,
        target: { strokeWidth: obj?.strokeWidth },
        id: obj?.id,
      };

      const event = { event: payload, type: 'lineWidthChanged' };

      undoRedoDispatch({
        type: SET,
        payload: canvas?.getObjects() as TypedShape[],
        canvasId: userId,
        event: (event as unknown) as IUndoRedoEvent,
      });
    }
  }, [lineWidth, canvas, undoRedoDispatch, userId]);

  useEffect(() => {
    if (canvas && fontFamily) {
      const obj = canvas?.getActiveObject() as ICanvasObject;
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
          payload: canvas?.getObjects() as TypedShape[],
          canvasId: userId,
          event: (event as unknown) as IUndoRedoEvent,
        });
      } else if (obj?.type === 'activeSelection') {
        let events: any[] = [];
        const eventId: string = uuidv4();

        obj._objects?.forEach((object: any) => {
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
            return object.toJSON([
              'strokeUniform',
              'id',
              'selectable',
              'evented',
              'shapeType',
            ]);
          }
          const matrix = object.calcTransformMatrix();
          const options = fabric.util.qrDecompose(matrix);
          const transformed = object.toJSON([
            'strokeUniform',
            'id',
            'selectable',
            'evented',
            'shapeType',
          ]);
          let top = object.group.height / 2 + object.top + object.group.top;
          let left = object.group.width / 2 + object.left + object.group.left;

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
          };
        });

        undoRedoDispatch({
          type: SET_GROUP,
          payload: mappedObjects as TypedShape[],
          canvasId: userId,
          event: (events as unknown) as IUndoRedoEvent,
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
    if (eraseType === 'object' && canvas && toolbarIsEnabled) {
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
  }, [eraseType, canvas, actions, textIsActive, toolbarIsEnabled]);

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

  // TODO: Will be re-added once only one board is visible.
  /*
  const keyDown = (e: any) => {
    if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
      undoRedoDispatch({ type: UNDO, canvasId: instanceId });
      return;
    }

    if (e.which === 89 && e.ctrlKey) {
      undoRedoDispatch({ type: REDO, canvasId: instanceId });
      return;
    }
  };
  */

  /**
   * Makes local objects unselectable when toolbar is disabled by the teacher.
   * */

  useEffect(() => {
    canvas?.forEachObject((object: ICanvasObject) => {
      if (object.id && PainterEvents.isCreatedWithId(object.id, userId)) {
        object.set({
          evented: toolbarIsEnabled,
          selectable: toolbarIsEnabled,
        });
      }
    });
  }, [canvas, toolbarIsEnabled, userId]);

  /**
   * Request all events to be resent after canvas is created.
   */
  useEffect(() => {
    if (!canvas) return;

    requestAllEvents();

  }, [canvas, requestAllEvents, userId]);

  return (
    <canvas
      width={pixelWidth}
      height={pixelHeight}
      id={instanceId}
      style={initialStyle}
      tabIndex={0}
      onClick={() => {
        actions.addShape(shape);
      }}
    >
      {children}
    </canvas>
  );
};
