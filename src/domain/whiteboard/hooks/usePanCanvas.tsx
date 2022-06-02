import { useCallback, useEffect } from 'react';
import { fabric } from 'fabric';
import { ICanvasMouseCordsEvent } from '../../../interfaces/canvas-events/canvas-mouse-event';

/**
 * Hook to pan the canvas
 * @param moveCanvasIsActive {boolean} If moveCanvas tool is active or not
 * @param canvas {fabric.Canvas | undefined} The canvas to work on
 * @param toolbarIsEnabled {boolean} If the toolbar is enabled
 * @param mouseXY {ICanvasMouseCordsEvent | undefined} The mouseXY cords
 * @param updateMouseXY {Function} hook to update the mouseXY cords
 */
export const usePanCanvas = (
  moveCanvasIsActive: boolean,
  canvas: fabric.Canvas | undefined,
  toolbarIsEnabled: boolean,
  mouseXY: ICanvasMouseCordsEvent | undefined,
  updateMouseXY: React.Dispatch<ICanvasMouseCordsEvent>
) => {
  const updateCanvas = useCallback(
    (clickEvent: fabric.IEvent, event: fabric.IEvent) => {
      const x = event.absolutePointer?.x;
      const y = event.absolutePointer?.y;
      if (
        !x ||
        !y ||
        !moveCanvasIsActive ||
        !clickEvent ||
        !clickEvent.absolutePointer
      )
        return;
      const relx = x - clickEvent?.absolutePointer?.x;
      const rely = y - clickEvent?.absolutePointer?.y;
      const pt = new fabric.Point(relx, rely);
      canvas?.relativePan(pt);
      updateMouseXY({ x: pt.x, y: pt.y });
    },
    [moveCanvasIsActive, canvas, updateMouseXY]
  );

  const updateMouse = useCallback(
    (clickEvent: fabric.IEvent) => {
      if (
        !clickEvent.absolutePointer?.x ||
        !clickEvent.absolutePointer?.y ||
        !moveCanvasIsActive
      )
        return;

      // If is used only to satisfy null check for types, did not want to force with !!
      if (clickEvent.absolutePointer) {
        updateMouseXY(clickEvent.absolutePointer);
      }
      canvas?.on('mouse:move', (event: fabric.IEvent) => {
        updateCanvas(clickEvent, event);
      });
      canvas?.on('mouse:up', (): void => {
        canvas?.off('mouse:move');
      });
    },
    [moveCanvasIsActive, canvas, updateMouseXY, updateCanvas]
  );

  /**
   * Enables the canvas to be moved/panned
   */
  useEffect(() => {
    if (moveCanvasIsActive && canvas) {
      canvas?.on('mouse:down', (event: fabric.IEvent): void => {
        updateMouse(event);
      });
    }
    return () => {
      canvas?.off('mouse:down');
    };
  }, [
    moveCanvasIsActive,
    canvas,
    toolbarIsEnabled,
    mouseXY,
    updateCanvas,
    updateMouse,
    updateMouseXY,
  ]);
};
