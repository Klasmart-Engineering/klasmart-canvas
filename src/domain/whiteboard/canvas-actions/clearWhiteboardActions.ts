import { useCallback } from 'react';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import {
  ObjectEvent,
  PaintEventSerializer,
} from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET } from '../reducers/undo-redo';
import store from '../redux/store';
import { getToolbarIsEnabled } from '../redux/utils';

/**
 *
 * @param canvas Canvas
 * @param userId user Id
 * @param localBackground Flag to know if background color is applied
 * @param clearBackground Function that clears background color
 * @param isCursorObject Function to know which is a cursor and which isn't
 * @param closeModal Close modal method
 * @param dispatch Dispatch method
 * @param isLocalObject Method to check if object is local
 * @param allToolbarIsEnabled Indicates if all toolbar tools are enabled
 * @param localImage Image to display as background or cavnas
 * @param eventSerializer Paint event serializer
 * @param updateClearIsActive Method to activate clear canvas functionality
 * @param canvasId Canvas ID
 * @param backgroundImage background image
 */
export const useClearWhiteboardSelf = (
  canvas: fabric.Canvas,
  userId: string,
  localBackground: boolean,
  clearBackground: () => void,
  isCursorObject: (object: ICanvasObject) => boolean,
  closeModal: () => void,
  dispatch: (action: CanvasAction) => void,
  isLocalObject: (
    id: string,
    canvasId: string | undefined
  ) => boolean | undefined,
  allToolbarIsEnabled: boolean,
  localImage: string | File,
  eventSerializer: PaintEventSerializer,
  updateClearIsActive: (arg: boolean) => void,
  canvasId: string,
  backgroundImage: any
) =>
  useCallback(async () => {
    const toolbarIsEnabled = getToolbarIsEnabled();
    const serializerToolbarState = store.getState()
      .permissionsState as IPermissions;
    const teacherHasPermission = allToolbarIsEnabled;
    const studentHasPermission =
      toolbarIsEnabled && serializerToolbarState.clearWhiteboard;
    if (teacherHasPermission || studentHasPermission) {
      if (localBackground) {
        clearBackground();
      }

      if (typeof localImage === 'string' && localImage.length) {
        const target = {
          id: '',
          target: {
            strategy: 'allowClearMyself',
            isLocalImage: true,
          },
        };

        eventSerializer?.push('removed', target as ObjectEvent);
      }
      await updateClearIsActive(true);
      await canvas?.getObjects().forEach((obj: ICanvasObject) => {
        if (
          obj.id &&
          isLocalObject(obj.id, userId) &&
          !isCursorObject(obj) &&
          !obj.stampObject
        ) {
          const target = {
            id: obj.id,
            target: {
              strategy: 'allowClearMyself',
            },
          };

          obj.set({ groupClear: true });
          canvas?.remove(obj);
          eventSerializer?.push('removed', target as ObjectEvent);
        }
      });

      if (canvas?.backgroundImage) {
        const target = {
          // @ts-ignore
          id: canvas.backgroundImage.id,
          target: {
            strategy: 'allowClearMyself',
            isBackgroundImage: true,
          },
        };

        eventSerializer?.push('removed', target as ObjectEvent);

        // In order to remove background you need to add 0 to the first argument.
        // An empty string unfortunately doesnt work.
        // https://stackoverflow.com/a/14171884
        // @ts-ignore
        canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
      }

      closeModal();

      const event = {
        event: { id: `${userId}:clearWhiteboard` },
        type: 'clearedWhiteboard',
      } as IUndoRedoEvent;

      // Add cleared whiteboard to undo / redo state.
      dispatch({
        type: SET,
        payload: canvas?.getObjects(),
        canvasId: userId,
        event,
      });

      await updateClearIsActive(false);
    }
    // If isLocalObject is added in dependencies an infinity loop happens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allToolbarIsEnabled,
    localBackground,
    localImage,
    updateClearIsActive,
    canvas,
    closeModal,
    userId,
    dispatch,
    clearBackground,
    eventSerializer,
    eventSerializer,
    isCursorObject,
  ]);

/**
 * Method to clear other clearboards besides teacher
 * @param canvas Fabric canvas
 * @param localBackground Flag to know if background color is applied
 * @param clearBackground Function that clears background color
 * @param isCursorObject Function to know which is a cursor and which isn't
 * @param updateClearIsActive Updates clear is active
 * @param eventSerializer Pain event serializer
 */
export const useClearWhiteboardOthers = (
  canvas: fabric.Canvas,
  localBackground: boolean,
  clearBackground: () => void,
  isCursorObject: (object: ICanvasObject) => boolean,
  updateClearIsActive: (arg: boolean) => void,
  eventSerializer: PaintEventSerializer
) =>
  /**
   * Clears all whiteboard with allowClearOthers strategy
   * */
  useCallback(
    async (userId: string) => {
      if (localBackground) {
        clearBackground();
      }

      await updateClearIsActive(true);
      await canvas?.getObjects().forEach((obj: ICanvasObject) => {
        if (obj.id) {
          const object = obj.id.split(':');

          if (!object.length) {
            throw new Error('Invalid ID');
          }

          if (
            object[0] === userId &&
            !isCursorObject(obj) &&
            !obj.stampObject
          ) {
            canvas?.remove(obj);
          }

          const target = {
            id: obj.id,
            target: {
              strategy: 'allowClearOthers',
              userId,
            },
          };

          eventSerializer?.push('removed', target as ObjectEvent);
        }
      });
      await updateClearIsActive(false);
    },
    [
      canvas,
      clearBackground,
      eventSerializer,
      localBackground,
      isCursorObject,
      updateClearIsActive,
    ]
  );

export const useClearWhiteboardClearAll = (
  canvas: fabric.Canvas,
  userId: string,
  localBackground: boolean,
  clearBackground: () => void,
  isCursorObject: (object: ICanvasObject) => boolean,
  updateClearIsActive: any,
  eventSerializer: PaintEventSerializer,
  dispatch: any
) =>
  useCallback(async () => {
    if (localBackground) {
      clearBackground();
    }

    await updateClearIsActive(true);
    await canvas?.getObjects().forEach((obj: ICanvasObject) => {
      if (obj.id && !isCursorObject(obj) && !obj.stampObject) {
        obj.set({ groupClear: true });
        canvas?.remove(obj);
      }
    });

    const target = {
      target: {
        strategy: 'allowClearAll',
      },
    };

    eventSerializer?.push('removed', target as ObjectEvent);

    // Add cleared whiteboard to undo / redo state.
    const event = {
      event: { id: `${userId}:clearWhiteboard` },
      type: 'clearedWhiteboard',
    } as IUndoRedoEvent;

    // Add cleared whiteboard to undo / redo state.

    dispatch({
      type: SET,
      payload: canvas?.getObjects(),
      canvasId: userId,
      event,
    });

    await updateClearIsActive(false);
  }, [
    localBackground,
    updateClearIsActive,
    canvas,
    eventSerializer,
    userId,
    dispatch,
    clearBackground,
    isCursorObject,
  ]);
