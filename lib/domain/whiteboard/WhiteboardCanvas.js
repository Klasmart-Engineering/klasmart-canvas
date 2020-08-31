var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
import { fabric } from 'fabric';
import floodFillCursor from '../../assets/cursors/flood-fill.png';
import { v4 as uuidv4 } from 'uuid';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSharedEventSerializer } from './SharedEventSerializerProvider';
import { WhiteboardContext } from './WhiteboardContext';
import FontFaceObserver from 'fontfaceobserver';
import { useCanvasActions } from './canvas-actions/useCanvasActions';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import useSynchronizedAdded from './synchronization-hooks/useSynchronizedAdded';
import useSynchronizedMoved from './synchronization-hooks/useSynchronizedMoved';
import { isEmptyShape, isFreeDrawing, isShape } from './utils/shapes';
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
import useSynchronizedPointer from './synchronization-hooks/useSynchronizedPointer';
import useSynchronizedSetToolbarPermissions from './synchronization-hooks/useSynchronizedSetToolbarPermissions';
import useSynchronizedFontColorChanged from './synchronization-hooks/useSynchronizedFontColorChanged';
import { SET, SET_GROUP } from './reducers/undo-redo';
import useFixedAspectScaling from './utils/useFixedAspectScaling';
export var WhiteboardCanvas = function (_a) {
    var children = _a.children, instanceId = _a.instanceId, userId = _a.userId, initialStyle = _a.initialStyle, pointerEvents = _a.pointerEvents, pixelWidth = _a.pixelWidth, pixelHeight = _a.pixelHeight, display = _a.display, scaleMode = _a.scaleMode;
    var _b = useState(), canvas = _b[0], setCanvas = _b[1];
    var _c = useState(), wrapper = _c[0], setWrapper = _c[1];
    var _d = useState(), lowerCanvas = _d[0], setLowerCanvas = _d[1];
    var _e = useState(), upperCanvas = _e[0], setUpperCanvas = _e[1];
    var _f = useFixedAspectScaling(wrapper === null || wrapper === void 0 ? void 0 : wrapper.parentElement, (pixelWidth / pixelHeight), scaleMode || "ScaleToFit"), width = _f.width, height = _f.height, top = _f.top, left = _f.left;
    // Event serialization for synchronizing whiteboard state.
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    var undoRedoDispatch = UndoRedo(canvas, eventSerializer, userId).dispatch;
    var _g = useContext(WhiteboardContext), text = _g.text, brushIsActive = _g.brushIsActive, textIsActive = _g.textIsActive, shapeIsActive = _g.shapeIsActive, fontFamily = _g.fontFamily, updateFontFamily = _g.updateFontFamily, fontColor = _g.fontColor, updateFontColor = _g.updateFontColor, penColor = _g.penColor, isLocalObject = _g.isLocalObject, eraseType = _g.eraseType, shape = _g.shape, shapeColor = _g.shapeColor, lineWidth = _g.lineWidth, updateCanvasActions = _g.updateCanvasActions, shapesAreSelectable = _g.shapesAreSelectable, shapesAreEvented = _g.shapesAreEvented, eventedObjects = _g.eventedObjects, floodFillIsActive = _g.floodFillIsActive, updatePenColor = _g.updatePenColor, updateLineWidth = _g.updateLineWidth, updateShape = _g.updateShape, updateShapeColor = _g.updateShapeColor, floodFill = _g.floodFill, laserIsActive = _g.laserIsActive, allowPointer = _g.allowPointer, universalPermits = _g.universalPermits, toolbarIsEnabled = _g.toolbarIsEnabled, setToolbarIsEnabled = _g.setToolbarIsEnabled;
    var _h = useCanvasActions(canvas, undoRedoDispatch, instanceId, eventSerializer, userId), actions = _h.actions, mouseDown = _h.mouseDown;
    /**
     * Creates Canvas/Whiteboard instance
     */
    useEffect(function () {
        var canvasInstance = new fabric.Canvas(instanceId, {
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
    useEffect(function () {
        if (!canvas)
            return;
        var lowerCanvas = document.getElementById(instanceId);
        var wrapper = lowerCanvas === null || lowerCanvas === void 0 ? void 0 : lowerCanvas.parentElement;
        var upperCanvas = wrapper === null || wrapper === void 0 ? void 0 : wrapper.getElementsByClassName('upper-canvas')[0];
        if (wrapper) {
            setWrapper(wrapper);
            // TODO: We may want to make the position style
            // controlled by property or variable.
            wrapper.style.position = "absolute";
        }
        ;
        if (lowerCanvas)
            setLowerCanvas(lowerCanvas);
        if (upperCanvas)
            setUpperCanvas(upperCanvas);
    }, [canvas, instanceId]);
    /**
     * Update wrapper display state.
     */
    useEffect(function () {
        if (!wrapper)
            return;
        if (display === false) {
            wrapper.style.display = "none";
        }
        else {
            wrapper.style.removeProperty("display");
        }
    }, [wrapper, display]);
    /**
     * Update the CSS Width/Height
     */
    useEffect(function () {
        if (wrapper && lowerCanvas && upperCanvas) {
            var widthStyle = width + "px";
            wrapper.style.width = widthStyle;
            lowerCanvas.style.width = widthStyle;
            upperCanvas.style.width = widthStyle;
            var heightStyle = height + "px";
            wrapper.style.height = heightStyle;
            lowerCanvas.style.height = heightStyle;
            upperCanvas.style.height = heightStyle;
            var wrapperTransform = "translate(" + left + "px, " + top + "px)";
            wrapper.style.transform = wrapperTransform;
            wrapper.style.top = "0px";
            wrapper.style.left = "0px";
        }
    }, [wrapper, lowerCanvas, upperCanvas, width, height, left, top]);
    /**
     * Update the pointer events to make canvas click through.
     */
    useEffect(function () {
        if (wrapper && lowerCanvas && upperCanvas) {
            var pointerEventsStyle = pointerEvents ? 'auto' : 'none';
            wrapper.style.pointerEvents = pointerEventsStyle;
            lowerCanvas.style.pointerEvents = pointerEventsStyle;
            upperCanvas.style.pointerEvents = pointerEventsStyle;
        }
      }
    },
    [wrapper, lowerCanvas, upperCanvas, cssWidth, cssHeight]
  );
  /**
   * Update the pointer events to make canvas click through.
   */
  useEffect(
    function () {
      if (wrapper && lowerCanvas && upperCanvas) {
        var pointerEventsStyle = pointerEvents ? 'auto' : 'none';
        wrapper.style.pointerEvents = pointerEventsStyle;
        lowerCanvas.style.pointerEvents = pointerEventsStyle;
        upperCanvas.style.pointerEvents = pointerEventsStyle;
      }
    },
    [lowerCanvas, pointerEvents, upperCanvas, wrapper]
  );
  /** Update objects selectable/evented state. */
  useEffect(
    function () {
      if (!canvas) {
        return;
      }
      canvas.getObjects().forEach(function (object) {
        if ((object.id && isLocalObject(object.id, userId)) || !object.id) {
          object.set({
            selectable: shapesAreSelectable,
            evented: shapesAreSelectable || shapesAreEvented,
          });
        }
      });
      canvas.selection = shapesAreSelectable;
      canvas.renderAll();
    },
    [canvas, isLocalObject, shapesAreEvented, shapesAreSelectable, userId]
  );
  /**
   * Handles the logic to write text on the whiteboard
   * */
  useEffect(
    function () {
      if (textIsActive) {
        canvas === null || canvas === void 0
          ? void 0
          : canvas.on('mouse:down', function (e) {
              var _a, _b, _c;
              if (e.target === null && e) {
                var text_1 = new fabric.IText(' ', {
                  fontFamily: fontFamily,
                  fontSize: 30,
                  fontWeight: 400,
                  fill: fontColor,
                  fontStyle: 'normal',
                  top:
                    (_a = e.pointer) === null || _a === void 0 ? void 0 : _a.y,
                  left:
                    (_b = e.pointer) === null || _b === void 0 ? void 0 : _b.x,
                  cursorDuration: 500,
                });
                canvas.add(text_1);
                canvas.setActiveObject(text_1);
                text_1.enterEditing();
                (_c =
                  text_1 === null || text_1 === void 0
                    ? void 0
                    : text_1.hiddenTextarea) === null || _c === void 0
                  ? void 0
                  : _c.focus();
                text_1.on('editing:exited', function () {
                  var _a;
                  var textCopy = text_1.text;
                  var toObject = text_1.toObject();
                  delete toObject.text;
                  delete toObject.type;
                  var clonedTextObj = JSON.parse(JSON.stringify(toObject));
                  clonedTextObj.id = userId + ':' + uuidv4();
                  if (typeof textCopy === 'string') {
                    text_1 = new fabric.Textbox(textCopy, clonedTextObj);
                  }
                  canvas.remove(canvas.getActiveObject());
                  canvas.add(text_1);
                  canvas.setActiveObject(text_1);
                  if (
                    ((_a =
                      text_1 === null || text_1 === void 0
                        ? void 0
                        : text_1.text) === null || _a === void 0
                      ? void 0
                      : _a.replace(/\s/g, '').length) === 0
                  ) {
                    canvas.remove(canvas.getActiveObject());
                    return;
                  }
                  text_1.on('modified', function () {
                    var _a;
                    if (
                      ((_a =
                        text_1 === null || text_1 === void 0
                          ? void 0
                          : text_1.text) === null || _a === void 0
                        ? void 0
                        : _a.replace(/\s/g, '').length) === 0
                    ) {
                      canvas.remove(canvas.getActiveObject());
                    }
                  });
                });
              }
            });
      }
      return function () {
        if (!eraseType) {
          canvas === null || canvas === void 0
            ? void 0
            : canvas.off('mouse:down');
        }
      };
    },
    [
      canvas,
      textIsActive,
      fontColor,
      fontFamily,
      updateFontFamily,
      updateFontColor,
      userId,
      eraseType,
    ]
  );
  /**
   * Is executed when textIsActive changes its value,
   * basically to deselect any selected object
   */
  useEffect(
    function () {
      if (!textIsActive) {
        canvas === null || canvas === void 0
          ? void 0
          : canvas.discardActiveObject();
        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
      }
    },
    [canvas, pointerEvents, textIsActive]
  );
  /**
   * Activates or deactivates drawing mode.
   */
  useEffect(
    function () {
      var pathCreated = function (e) {
        if (e.path) {
          e.path.strokeUniform = true;
          canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        }
      };
      if (brushIsActive && canvas) {
        canvas.freeDrawingBrush = new fabric.PencilBrush();
        canvas.freeDrawingBrush.canvas = canvas;
        canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
        canvas.freeDrawingBrush.width = lineWidth;
        canvas.isDrawingMode = toolbarIsEnabled;
        canvas.on('path:created', pathCreated);
      } else if (canvas && !brushIsActive) {
        canvas.isDrawingMode = false;
      }
      return function () {
        canvas === null || canvas === void 0
          ? void 0
          : canvas.off('path:created');
      };
    },
    [brushIsActive, canvas, lineWidth, penColor, toolbarIsEnabled]
  );
  /**
   * Disables shape canvas mouse events.
   */
  useEffect(
    function () {
      if (!shapeIsActive && canvas) {
        canvas.off('mouse:move');
        canvas.off('mouse:up');
      }
    },
    [shapeIsActive, canvas]
  );
  /**
   * Activates the mouseDown event if shape exists and shapeIsActive is true
   */
  useEffect(
    function () {
      if (shape && shapeIsActive) {
        actions.discardActiveObject();
        canvas === null || canvas === void 0
          ? void 0
          : canvas.forEachObject(function (object) {
              if (object.id && isLocalObject(object.id, userId)) {
                object.set({
                  evented: false,
                  selectable: false,
                });
              }
            });
        actions.addShape(shape);
      }
      return function () {
        if (!textIsActive && !floodFillIsActive && !shapesAreEvented) {
          canvas === null || canvas === void 0
            ? void 0
            : canvas.off('mouse:down');
        }
        if (eraseType !== 'object') {
          canvas === null || canvas === void 0
            ? void 0
            : canvas.off('mouse:up');
        }
        if (!laserIsActive) {
          canvas === null || canvas === void 0
            ? void 0
            : canvas.off('mouse:move');
        }
      };
    },
    [
      canvas,
      shape,
      shapeIsActive,
      mouseDown,
      penColor,
      shapeColor,
      actions,
      textIsActive,
      userId,
      floodFillIsActive,
      shapesAreSelectable,
      eraseType,
      shapesAreEvented,
      isLocalObject,
      laserIsActive,
    ]
  );
  /**
   * General handler for keyboard events
   * 'Backspace' event for removing selected element from whiteboard
   * 'Escape' event for deselect active objects
   * */
  var keyDownHandler = useCallback(
    function (e) {
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
        var objects = canvas.getActiveObjects();
        objects.forEach(function (object) {
          var _a;
          if (
            !((_a = object) === null || _a === void 0 ? void 0 : _a.isEditing)
          ) {
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
  var fontFamilyLoader = useCallback(
    function (font) {
      var myFont = new FontFaceObserver(font);
      myFont
        .load()
        .then(function () {
          if (
            canvas === null || canvas === void 0
              ? void 0
              : canvas.getActiveObject()
          ) {
            canvas.getActiveObject().set('fontFamily', font);
            canvas.requestRenderAll();
            var objects =
              canvas === null || canvas === void 0
                ? void 0
                : canvas.getActiveObjects();
            if (objects && objects.length) {
              objects.forEach(function (obj) {
                if (obj.id && isLocalObject(obj.id, userId)) {
                  var type = obj.get('type');
                  if (type === 'textbox') {
                    var target = {
                      fontFamily: obj.fontFamily,
                    };
                    var payload = {
                      type: type,
                      target: target,
                      id: obj.id,
                    };
                    eventSerializer === null || eventSerializer === void 0
                      ? void 0
                      : eventSerializer.push('fontFamilyChanged', payload);
                  }
                }
              });
            }
          }
        })
        .catch(function (e) {
          console.log(e);
        });
    },
    [canvas, eventSerializer, isLocalObject, userId]
  );
  /**
   * Get the color of the clicked area in the Whiteboard
   * and returns it in hexadecimal code
   * @param {IEvent} event - click event
   */
  var getColorInCoord = useCallback(
    function (x, y) {
      if (canvas) {
        var colorData = canvas
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
  var reorderShapes = useCallback(
    function () {
      canvas === null || canvas === void 0
        ? void 0
        : canvas.forEachObject(function (actual) {
            canvas.forEachObject(function (compare) {
              if (actual.isContainedWithinObject(compare)) {
                canvas.bringForward(actual);
              }
            });
          });
    },
    [canvas]
  );
  /**
   * Trigger the changes in the required variables
   * when a certain object is selected
   * @param {IEvent} event - event that contains the selected object
   */
  var manageChanges = useCallback(
    function (event) {
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
        if (event.target.shapeType === 'shape') {
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
  useEffect(
    function () {
      if (!canvas) return;
      canvas.on('selection:created', manageChanges);
      canvas.on('selection:updated', manageChanges);
      return function () {
        canvas.off('selection:created', manageChanges);
        canvas.off('selection:updated', manageChanges);
      };
    },
    [canvas, manageChanges]
  );
  /**
   * Make a mouse down event below of the clicked shape
   * @param {IEvent} event - Contains the x, y coords of the clicked point
   */
  var manageShapeOutsideClick = useCallback(
    function (event) {
      var foundShape = null;
      canvas === null || canvas === void 0
        ? void 0
        : canvas.forEachObject(function (object) {
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
        canvas === null || canvas === void 0
          ? void 0
          : canvas.trigger('mouse:down', {
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
  useEffect(
    function () {
      if (eventedObjects) {
        canvas === null || canvas === void 0
          ? void 0
          : canvas.forEachObject(function (object) {
              if (object.id && isLocalObject(object.id, userId)) {
                object.set({
                  evented: true,
                  selectable: true,
                });
              }
            });
        actions.setHoverCursorObjects('move');
      }
    },
    [actions, canvas, eventedObjects, isLocalObject, userId]
  );
  /**
   * Manages the logic for Flood-fill Feature
   */
  useEffect(
    function () {
      var originalStroke = null;
      var originalFill = null;
      var originalBackground = null;
      var clickedColor = null;
      var differentFill = '#dcdcdc';
      var differentStroke = '#dbdbdb';
      var differentBackground = '#dadada';
      var isLocalShape = function (shape) {
        return shape.id && isLocalObject(shape.id, userId);
      };
      if (floodFillIsActive && canvas) {
        canvas.defaultCursor = 'url("' + floodFillCursor + '") 2 15, default';
        canvas.forEachObject(function (object) {
          object.set({
            evented: true,
            hoverCursor: isLocalShape(object)
              ? 'url("' + floodFillCursor + '") 2 15, default'
              : 'not-allowed',
            perPixelTargetFind: isShape(object) ? false : true,
          });
        });
        reorderShapes();
        canvas.renderAll();
        canvas.on('mouse:down', function (event) {
          // Click out of any object
          if (!event.target) {
            canvas.backgroundColor = floodFill;
            var payload = {
              type: 'background',
              target: {
                fill: floodFill,
              },
              id: '',
            };
            var eventState = {
              event: __assign(__assign({}, payload), {
                id: userId + ':background',
              }),
              type: 'colorChanged',
            };
            undoRedoDispatch({
              type: SET,
              payload: canvas.getObjects(),
              canvasId: userId,
              event: eventState,
            });
            eventSerializer === null || eventSerializer === void 0
              ? void 0
              : eventSerializer.push('colorChanged', payload);
          }
          // Click on object shape
          if (
            event.target &&
            event.pointer &&
            isEmptyShape(event.target) &&
            event.target.id
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
            if (clickedColor === differentFill && event.target.id) {
              // If user click inside of the shape
              event.target.set({
                fill: floodFill,
                stroke: originalStroke,
              });
              canvas.backgroundColor = originalBackground;
              var payload = {
                type: 'shape',
                target: {
                  fill: event.target.fill,
                  objectsOrdering: canvas
                    .getObjects()
                    .map(function (obj, index) {
                      return { id: obj.id, index: index };
                    }),
                },
                id: event.target.id || '',
              };
              var eventState = {
                event: payload,
                type: 'colorChanged',
              };
              undoRedoDispatch({
                type: SET,
                payload: canvas.getObjects(),
                canvasId: userId,
                event: eventState,
              });
              eventSerializer === null || eventSerializer === void 0
                ? void 0
                : eventSerializer.push('colorChanged', payload);
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
      return function () {
        if (canvas) {
          canvas.defaultCursor = 'default';
        }
        if (!floodFillIsActive && eraseType !== 'object') {
          canvas === null || canvas === void 0
            ? void 0
            : canvas.forEachObject(function (object) {
                object.set({
                  hoverCursor: 'default',
                  evented: false,
                  perPixelTargetFind: false,
                });
              });
        }
        if (!textIsActive && eraseType !== 'object') {
          canvas === null || canvas === void 0
            ? void 0
            : canvas.off('mouse:down');
        }
      };
    },
    [
      actions,
      canvas,
      floodFill,
      floodFillIsActive,
      getColorInCoord,
      isLocalObject,
      manageShapeOutsideClick,
      userId,
      textIsActive,
      eventSerializer,
      reorderShapes,
      eraseType,
      undoRedoDispatch,
    ]
  );
  /**
   * If the input field (text) has length
   * will unselect whiteboard active objects
   * */
  useEffect(
    function () {
      if (text.length) {
        actions.discardActiveObject();
      }
    },
    [actions, text]
  );
  /**
   * Add keyboard keydown event listener. It listen keyDownHandler function
   * Invokes fontFamilyLoader to set default and selected font family
   * */
  useEffect(
    function () {
      document.addEventListener('keydown', keyDownHandler, false);
      fontFamilyLoader(fontFamily);
      return function () {
        document.removeEventListener('keydown', keyDownHandler);
      };
    },
    [fontFamily, keyDownHandler, fontFamilyLoader]
  );
  var filterOutgoingEvents = useCallback(
    function (id) {
      if (!id) return false;
      var apply = isLocalObject(id, userId);
      if (apply) {
        //console.log(`send local event ${id} to remote`);
        return apply;
      }
      return false;
    },
    [isLocalObject, userId]
  );
  var filterIncomingEvents = useCallback(
    function (id) {
      if (!id) return false;
      // TODO: isLocalObject will not work in case we're reloading
      // the page and server resends all our events. They would be
      // discarded when they shouldn't be discarded. Another solution
      // could be to keep track of all 'local' objects we've created
      // this session and only filter those.
      // TODO: Filter based on the filterUsers list. We should only
      // display events coming from users in that list if the list
      // isn't undefined.
      var apply = !isLocalObject(id, userId);
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
  useSynchronizedModified(
    canvas,
    filterOutgoingEvents,
    filterIncomingEvents,
    userId,
    undoRedoDispatch
  );
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
    allowPointer
  );
  useSynchronizedSetToolbarPermissions(
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
  /**
   * Send synchronization event for penColor changes.
   * */
  useEffect(
    function () {
      var objects =
        canvas === null || canvas === void 0
          ? void 0
          : canvas.getActiveObjects();
      if (objects && objects.length) {
        objects.forEach(function (obj) {
          var type = obj.get('type');
          if (obj.id && isLocalObject(obj.id, userId)) {
            var target = function () {
              return { stroke: obj.stroke, strokeWidth: obj.strokeWidth };
            };
            var payload = {
              type: type,
              target: target(),
              id: obj.id,
            };
            eventSerializer === null || eventSerializer === void 0
              ? void 0
              : eventSerializer.push('colorChanged', payload);
          }
        });
      }
    },
    [
      canvas,
      eventSerializer,
      userId,
      penColor,
      fontColor,
      undoRedoDispatch,
      isLocalObject,
    ]
  );
  useEffect(
    function () {
      if (fontColor && canvas) {
        var obj = canvas.getActiveObject();
        if (!obj) return;
        var type = obj === null || obj === void 0 ? void 0 : obj.get('type');
        if (type !== 'textbox') return;
        var payload = {
          type: type,
          target: { fill: obj === null || obj === void 0 ? void 0 : obj.fill },
          id: obj === null || obj === void 0 ? void 0 : obj.id,
        };
        var event_1 = { event: payload, type: 'colorChanged' };
        undoRedoDispatch({
          type: SET,
          payload:
            canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
          canvasId: userId,
          event: event_1,
        });
      }
    },
    [fontColor, canvas, undoRedoDispatch, userId]
  );
  useEffect(
    function () {
      if (penColor && canvas) {
        var obj = canvas.getActiveObject();
        if (!obj) return;
        var type = obj === null || obj === void 0 ? void 0 : obj.get('type');
        if (type === 'textbox') return;
        var payload = {
          type: type,
          target: {
            stroke: obj === null || obj === void 0 ? void 0 : obj.stroke,
          },
          id: obj === null || obj === void 0 ? void 0 : obj.id,
        };
        var event_2 = { event: payload, type: 'colorChanged' };
        undoRedoDispatch({
          type: SET,
          payload:
            canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
          canvasId: userId,
          event: event_2,
        });
      }
    },
    [penColor, canvas, undoRedoDispatch, userId]
  );
  useEffect(
    function () {
      if (lineWidth && canvas) {
        var obj = canvas.getActiveObject();
        if (!obj) return;
        var type = obj === null || obj === void 0 ? void 0 : obj.get('type');
        if (type === 'textbox') return;
        if (
          (obj === null || obj === void 0 ? void 0 : obj.strokeWidth) ===
          lineWidth
        )
          return;
        var payload = {
          type: type,
          target: {
            strokeWidth:
              obj === null || obj === void 0 ? void 0 : obj.strokeWidth,
          },
          id: obj === null || obj === void 0 ? void 0 : obj.id,
        };
        var event_3 = { event: payload, type: 'colorChanged' };
        undoRedoDispatch({
          type: SET,
          payload:
            canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
          canvasId: userId,
          event: event_3,
        });
      }
    },
    [lineWidth, canvas, undoRedoDispatch, userId]
  );
  useEffect(
    function () {
      var _a;
      if (canvas && fontFamily) {
        var obj =
          canvas === null || canvas === void 0
            ? void 0
            : canvas.getActiveObject();
        var type_1 = obj === null || obj === void 0 ? void 0 : obj.get('type');
        if (type_1 === 'textbox' && obj) {
          var target = {
            fontFamily: fontFamily,
          };
          var payload = {
            type: type_1,
            target: target,
            id: obj === null || obj === void 0 ? void 0 : obj.id,
          };
          var event_4 = { event: payload, type: 'fontFamilyChanged' };
          obj.set({ fontFamily: fontFamily });
          undoRedoDispatch({
            type: SET,
            payload:
              canvas === null || canvas === void 0
                ? void 0
                : canvas.getObjects(),
            canvasId: userId,
            event: event_4,
          });
        } else if (
          (obj === null || obj === void 0 ? void 0 : obj.type) ===
          'activeSelection'
        ) {
          var events_1 = [];
          var eventId_1 = uuidv4();
          (_a = obj._objects) === null || _a === void 0
            ? void 0
            : _a.forEach(function (object) {
                var payload = {
                  type: type_1,
                  target: { fontFamily: fontFamily },
                  id: object.id,
                };
                var event = {
                  event: payload,
                  type: 'activeSelection',
                  eventId: eventId_1,
                };
                events_1.push(event);
                object.set({ fontFamily: fontFamily });
              });
          var mappedObjects =
            canvas === null || canvas === void 0
              ? void 0
              : canvas.getObjects().map(function (object) {
                  if (!object.group) {
                    return object.toJSON([
                      'strokeUniform',
                      'id',
                      'selectable',
                      'evented',
                      'shapeType',
                    ]);
                  }
                  var matrix = object.calcTransformMatrix();
                  var options = fabric.util.qrDecompose(matrix);
                  var transformed = object.toJSON([
                    'strokeUniform',
                    'id',
                    'selectable',
                    'evented',
                    'shapeType',
                  ]);
                  var top =
                    object.group.height / 2 + object.top + object.group.top;
                  var left =
                    object.group.width / 2 + object.left + object.group.left;
                  events_1.forEach(function (event) {
                    if (event.event.id === object.id) {
                      event.event.target.top = top;
                      event.event.target.left = left;
                    }
                  });
                  return __assign(__assign({}, transformed), {
                    top: top,
                    left: left,
                    scaleX: options.scaleX,
                    scaleY: options.scaleY,
                  });
                });
          undoRedoDispatch({
            type: SET_GROUP,
            payload: mappedObjects,
            canvasId: userId,
            event: events_1,
          });
        }
      }
    },
    [canvas, fontFamily, undoRedoDispatch, userId]
  );
  /**
   * If pointerEvents changes to false, all the selected objects
   * will be unselected
   */
  useEffect(
    function () {
      if (!pointerEvents && canvas) {
        canvas.discardActiveObject().renderAll();
      }
    },
    [pointerEvents, canvas]
  );
  /**
   * When eraseType value changes, listeners and states
   * necessaries to erase objects are setted or removed
   */
  useEffect(
    function () {
      if (eraseType === 'object' && canvas && toolbarIsEnabled) {
        actions.eraseObject();
        if (canvas.getActiveObjects().length === 1) {
          canvas.discardActiveObject().renderAll();
        }
      }
      return function () {
        if (!textIsActive) {
          canvas === null || canvas === void 0
            ? void 0
            : canvas.off('mouse:down');
        }
        canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:up');
        canvas === null || canvas === void 0
          ? void 0
          : canvas.off('mouse:over');
      };
    },
    [eraseType, canvas, actions, textIsActive, toolbarIsEnabled]
  );
  useEffect(
    function () {
      if (shape && shapeIsActive) {
        mouseDown(shape, shapeColor);
      }
      return function () {
        if (!textIsActive) {
          canvas === null || canvas === void 0
            ? void 0
            : canvas.off('mouse:down');
        }
        canvas === null || canvas === void 0
          ? void 0
          : canvas.off('mouse:move');
        canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:up');
      };
    },
    [canvas, shape, shapeIsActive, mouseDown, shapeColor, textIsActive]
  );
  /**
   * If lineWidth variable changes and a free line drawing is selected
   * that drawing line width will changes to the selected width on Toolbar
   */
  useEffect(
    function () {
      if (
        canvas === null || canvas === void 0
          ? void 0
          : canvas.getActiveObjects()
      ) {
        canvas.getActiveObjects().forEach(function (object) {
          if (isEmptyShape(object) || isFreeDrawing(object)) {
            object.set('strokeWidth', lineWidth);
          }
        });
        canvas.renderAll();
      }
    },
    [lineWidth, canvas]
  );
  // NOTE: Register canvas actions with context.
  useEffect(
    function () {
      updateCanvasActions(actions);
    },
    [actions, updateCanvasActions]
  );
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
    useEffect(function () {
        canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject();
        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
            if (object.id && isLocalObject(object.id, userId)) {
                object.set({
                    evented: toolbarIsEnabled,
                    selectable: toolbarIsEnabled,
                });
            }
        });
    }, [canvas, toolbarIsEnabled, isLocalObject, userId]);
    return (React.createElement("canvas", { width: pixelWidth, height: pixelHeight, id: instanceId, style: initialStyle, tabIndex: 0, onClick: function () {
            actions.addShape(shape);
        } }, children));
};
//# sourceMappingURL=WhiteboardCanvas.js.map
