import { fabric } from 'fabric';
import { IEvent, IText, Textbox } from 'fabric/fabric-impl';
import { useCallback, useContext, useEffect } from 'react';
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { useKeyHandlers } from './useKeyHandlers';
import { SET } from '../reducers/undo-redo';
import FontFaceObserver from 'fontfaceobserver';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { UndoRedo } from '../hooks/useUndoRedoEffect';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import { getToolbarIsEnabled } from '../redux/utils';
import ICanvasActions from '../canvas-actions/ICanvasActions';

/**
 * Manages the logic for text object creation and edition
 * @param {fabric.Canvas} canvas - Canvas in which text object will be created
 * @param {string} instanceId - Canvas instance identifier
 * @param {string} userId - User that will create/edit the text objects
 * @param {ICanvasActions} actions - Shared functions for canvas
 * @param {IPermissions} permissions - User permissions in whiteboard tools
 */
export const useTextObject = (
  canvas: fabric.Canvas,
  instanceId: string,
  userId: string,
  actions: ICanvasActions,
  permissions: IPermissions
) => {
  // Getting context data
  const {
    allToolbarIsEnabled,
    textIsActive,
    fontFamily,
    fontColor,
    eraseType,
    isLocalObject,
    text,
  } = useContext(WhiteboardContext);

  // Getting Event Serializer
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  // Getting Undo/Redo Dispatcher
  const { dispatch: undoRedoDispatch } = UndoRedo(
    canvas as fabric.Canvas,
    eventSerializer,
    userId
  );

  // Getting Key Handlers
  const { keyUpHandler, keyDownHandler } = useKeyHandlers(
    canvas,
    instanceId,
    permissions,
    allToolbarIsEnabled
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
          const activeObject = canvas?.getActiveObject() as fabric.IText;

          if (activeObject && activeObject.fontFamily !== font) {
            activeObject.set({ fontFamily: font });
            canvas.requestRenderAll();

            const objects = canvas?.getActiveObjects();

            canvas.discardActiveObject();

            if (objects && objects.length) {
              objects.forEach((obj: ICanvasObject) => {
                if (obj.id && isLocalObject(obj.id, userId)) {
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

                    eventSerializer?.push('fontFamilyChanged', payload);
                  }
                }

                if (objects.length === 1) {
                  const target = {
                    fontFamily,
                  };

                  const payload = {
                    type: obj.type,
                    target,
                    id: obj?.id,
                  };

                  const event = { event: payload, type: 'fontFamilyChanged' };

                  undoRedoDispatch({
                    type: SET,
                    payload: canvas?.getObjects() as TypedShape[],
                    canvasId: userId,
                    event: (event as unknown) as IUndoRedoEvent,
                  });
                }
              });
            }

            if (objects.length === 1) {
              canvas?.setActiveObject(objects[0]);
            } else if (objects.length >= 2) {
              const activesGroup = new fabric.ActiveSelection(objects);
              canvas?.setActiveObject(activesGroup);
            }
          }
        })
        .catch((e: IEvent) => {
          console.log(e);
        });
    },
    /* If isLocalObject is added on dependencies,
    an unecessary event is triggered */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canvas, eventSerializer, userId]
  );

  /**
   * Handles the logic to write text on the whiteboard
   * */
  useEffect(() => {
    const toolbarIsEnabled = getToolbarIsEnabled();
    const teacherHasPermission = allToolbarIsEnabled && textIsActive;
    const studentHasPermission =
      toolbarIsEnabled && permissions.text && textIsActive;

    const mouseDown = (e: fabric.IEvent) => {
      if (!e.pointer) return;

      const { target, pointer } = e;
      const type = target?.type;

      // If Click is made over anything except a text object
      if (!target || (type !== 'textbox' && type !== 'i-text')) {
        let text = new fabric.IText(' ', {
          fontFamily: fontFamily,
          fontSize: 30,
          fontWeight: 400,
          fill: fontColor,
          fontStyle: 'normal',
          top: pointer.y,
          left: pointer.x,
          cursorDuration: 500,
          lockMovementX: true,
          lockMovementY: true,
          hasRotatingPoint: false,
          hoverCursor: 'default',
        });

        canvas.add(text);
        canvas.setActiveObject(text);
        text.enterEditing();
        text?.hiddenTextarea?.focus();

        // When text edition is out
        text.on('editing:exited', () => {
          const textCopy = text.text?.trim();
          const toObject = text.toObject();

          delete toObject.text;
          delete toObject.type;

          const clonedTextObj = JSON.parse(JSON.stringify(toObject));

          clonedTextObj.id = `${userId}:${uuidv4()}`;
          clonedTextObj.lockMovementX = true;
          clonedTextObj.lockMovementY = true;
          clonedTextObj.hasRotatingPoint = false;
          clonedTextObj.hoverCursor = 'default';

          // IText is converted to Textbox to could resise it
          if (typeof textCopy === 'string') {
            text = new fabric.Textbox(textCopy, clonedTextObj);
          }

          // IText object is removed
          canvas.remove(canvas.getActiveObject());

          // Textbox is added is setted like active object
          canvas.add(text);
          canvas.setActiveObject(text);

          // If Textbox is empty, it will be removed from canvas
          if (text?.text?.replace(/\s/g, '').length === 0) {
            canvas.remove(canvas.getActiveObject());
            return;
          }

          /* If a created Textbox is modified,
            it will be removed because a new Textbox object was be created */
          text.on('modified', () => {
            if (text?.text?.replace(/\s/g, '').length === 0) {
              canvas.remove(canvas.getActiveObject());
            }
          });
        });
      }
    };

    if (teacherHasPermission || studentHasPermission) {
      canvas.on('mouse:down', mouseDown);
    } else {
      const active = canvas?.getActiveObject() as fabric.IText;

      if (active && active.isEditing) {
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    }

    return () => {
      if (!eraseType) {
        canvas?.off('mouse:down', mouseDown);
      }
    };
  }, [
    allToolbarIsEnabled,
    canvas,
    eraseType,
    fontColor,
    fontFamily,
    permissions.text,
    textIsActive,
    userId,
  ]);

  /**
   * Handles the logic to set the Textbox auto grownable and text responsive
   */
  useEffect(() => {
    let currentTextbox: Textbox;
    let textboxCopy: IText;

    if (textIsActive) {
      /**
       * Entering to edit a text object
       * Textbox transformed in IText
       */
      canvas?.on('text:editing:entered', (e: IEvent) => {
        if (e.target?.type === 'textbox') {
          let counter = 0;
          let textCopy = '';

          /**
           * Emulates the aspect of a Textbox keeping the lines
           * that this had in the new IText object
           */
          const setLines = () => {
            currentTextbox.textLines.forEach((line, index) => {
              let separator =
                currentTextbox.text?.charCodeAt(counter + line.length) === 10
                  ? '\n'
                  : ' \n';

              if (index === currentTextbox.textLines.length - 1) {
                separator = '';
              }

              textCopy += `${line}${separator}`;
              counter += line.length + 1;
            });
          };

          canvas.remove(textboxCopy);
          currentTextbox = e.target as Textbox;
          setLines();

          // Preparing Textbox properties to be setted in IText object
          const textboxProps = JSON.parse(JSON.stringify(currentTextbox));
          delete textboxProps.text;
          delete textboxProps.type;
          textboxProps.type = 'i-text';
          textboxProps.visible = true;
          textboxProps.width = currentTextbox.width;
          textboxProps.height = currentTextbox.height;

          if ((currentTextbox as TypedShape).id) {
            textboxProps.id = (currentTextbox as TypedShape).id;
          }

          // Adding the IText and hiding the Textbox
          if (typeof textCopy === 'string') {
            textboxCopy = new fabric.IText(textCopy.trim(), textboxProps);
            canvas.add(textboxCopy);
            canvas.setActiveObject(textboxCopy);
            textboxCopy.enterEditing();
            currentTextbox.set({
              visible: false,
            });

            canvas.renderAll();
          }
        }
      });

      /**
       * Text has been changed is some Text Object in canvas
       */
      canvas?.on('text:changed', (e: IEvent) => {
        if (!(e?.target as TypedShape).id) {
          // use native canvas to show new text box in realtime
          const payload: ObjectEvent = {
            type: 'textbox',
            target: e.target,
            id: 'teacher',
          };
          eventSerializer.push('textEdit', payload);
        } else {
          const payload: ObjectEvent = {
            type: 'textbox',
            target: e.target,
            id: (e.target as ICanvasObject).id as string,
          };

          eventSerializer.push('modified', payload);
        }
      });

      /**
       * Text Edition finished on IText object
       * IText transformed in Textbox
       */
      canvas?.on('text:editing:exited', (e: IEvent) => {
        if (!textboxCopy || !textboxCopy.width) return;

        const textboxWidth: number = textboxCopy.width;

        // Updating/showing the Textbox and hiding the IText
        if (currentTextbox && e.target?.type === 'i-text') {
          textboxCopy.set('isEditing', false);
          currentTextbox.set({
            width: textboxWidth + 10,
            height: textboxCopy.height,
            visible: true,
            text: textboxCopy.text?.trim(),
          });

          canvas.setActiveObject(currentTextbox);
          currentTextbox.set({ isEditing: true });
          textboxCopy.set({ visible: false });
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      });
    }

    return () => {
      canvas?.off('text:editing:entered');
      canvas?.off('text:editing:exited');
    };
  }, [canvas, eventSerializer, textIsActive]);

  /**
   * Is executed when textIsActive changes its value,
   * basically to deselect any selected object
   */
  useEffect(() => {
    if (!textIsActive) {
      canvas?.discardActiveObject();
      canvas?.renderAll();
    }
  }, [canvas, textIsActive]);

  /**
   * If the input field (text) has length
   * will unselect whiteboard active objects
   * */
  useEffect(() => {
    if (text?.length) {
      actions.discardActiveObject();
    }
  }, [actions, text, textIsActive]);

  /**
   * Add keyboard keydown event listener. It listen keyDownHandler function
   * Invokes fontFamilyLoader to set default and selected font family
   * */
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    fontFamilyLoader(fontFamily);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [fontFamily, fontFamilyLoader, keyDownHandler, keyUpHandler]);
};
