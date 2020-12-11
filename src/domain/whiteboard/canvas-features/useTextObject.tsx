import { fabric } from 'fabric';
import { IEvent, IText, Textbox } from 'fabric/fabric-impl';
import { useCallback, useContext, useEffect } from 'react';
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import {
  ObjectEvent,
  PaintEventSerializer,
} from '../event-serializer/PaintEventSerializer';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import { useKeyHandlers } from './useKeyHandlers';
import { CanvasAction } from '../reducers/undo-redo';
import FontFaceObserver from 'fontfaceobserver';

export const useTextObject = (
  canvas: fabric.Canvas,
  instanceId: string,
  userId: string,
  eventSerializer: PaintEventSerializer,
  actions: ICanvasActions,
  undoRedoDispatch: (action: CanvasAction) => void
) => {
  const {
    allToolbarIsEnabled,
    textIsActive,
    toolbarIsEnabled,
    serializerToolbarState,
    fontFamily,
    fontColor,
    eraseType,
    isLocalObject,
    text,
  } = useContext(WhiteboardContext);

  const { keyUpHandler, keyDownHandler } = useKeyHandlers(
    canvas,
    instanceId,
    undoRedoDispatch
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
              });
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
    const teacherHasPermission = allToolbarIsEnabled && textIsActive;
    const studentHasPermission =
      toolbarIsEnabled && serializerToolbarState.text && textIsActive;

    if (teacherHasPermission || studentHasPermission) {
      canvas.on('mouse:down', (e: fabric.IEvent) => {
        if (
          e.target === null ||
          (e.target?.type !== 'textbox' && e.target?.type !== 'i-text')
        ) {
          let text = new fabric.IText(' ', {
            fontFamily: fontFamily,
            fontSize: 30,
            fontWeight: 400,
            fill: fontColor,
            fontStyle: 'normal',
            top: e.pointer?.y,
            left: e.pointer?.x,
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
      if (!eraseType) {
        canvas?.off('mouse:down');
      }
    };
  }, [
    canvas,
    textIsActive,
    fontColor,
    fontFamily,
    userId,
    eraseType,
    toolbarIsEnabled,
    allToolbarIsEnabled,
    serializerToolbarState.text,
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
          currentTextbox.set('isEditing', true);
          textboxCopy.set('visible', false);
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      });
    }

    return () => {
      canvas?.off('text:editing:entered');
      canvas?.off('text:editing:exited');
    };
  }, [canvas, textIsActive]);

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
    document.addEventListener('keyup', keyUpHandler, false);
    fontFamilyLoader(fontFamily);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [fontFamily, fontFamilyLoader, keyDownHandler, keyUpHandler]);
};
