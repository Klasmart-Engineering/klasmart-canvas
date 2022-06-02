import { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { ICanvasMouseCordsEvent } from '../../../interfaces/canvas-events/canvas-mouse-event';

/**
 * Hook to use scroll canvas feature
 * @param clickThrough {boolean}
 * @param lowerCanvas {HTMLCanvasElement | undefined}
 * @param upperCanvas {HTMLCanvasElement | undefined}
 * @param wrapper {HTMLElement | undefined}
 * @param mouseXY {ICanvasMouseCordsEvent}
 * @param canvas {fabric.Canvas | undefined}
 * @returns {ICanvasMouseCordsEvent} The mouse cords scrolled to
 */
export const useScrollCanvas = (
  clickThrough: boolean,
  lowerCanvas: HTMLCanvasElement | undefined,
  upperCanvas: HTMLCanvasElement | undefined,
  wrapper: HTMLElement | undefined,
  mouseXY: ICanvasMouseCordsEvent,
  canvas: fabric.Canvas | undefined
) : ICanvasMouseCordsEvent => {
  const [tempScrollCord, setTempScrollCord] = useState<ICanvasMouseCordsEvent>({ x: 0, y: 0 });

  useEffect(() => {
    if (clickThrough && wrapper && lowerCanvas && upperCanvas) {
      if (mouseXY?.y && mouseXY.y !== tempScrollCord.y) {
        const pt = new fabric.Point(mouseXY.x, mouseXY.y);
        canvas?.relativePan(pt);
        setTempScrollCord(mouseXY);
      }
    }
  }, [
    clickThrough,
    lowerCanvas,
    tempScrollCord,
    upperCanvas,
    wrapper,
    mouseXY,
    canvas,
  ]);

  return tempScrollCord;
};
