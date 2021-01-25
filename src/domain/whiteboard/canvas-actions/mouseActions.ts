import { useCallback } from "react";
import { IBrushType } from "../../../interfaces/brushes/brush-type";
import { TypedShape } from "../../../interfaces/shapes/shapes";
import { CanvasAction } from "../reducers/undo-redo";
import { setCircleSize, setSize, setPathSize } from "../utils/scaling";

interface IPropsMouseMove {
  shape: fabric.Object | fabric.Rect | fabric.Ellipse;
  coordsStart: fabric.Point;
  specific?: string | undefined;
  canvas?: fabric.Canvas | undefined;
  brushType?: "pencil" | "pen" | "felt" | "crayon" | "chalk" | "paintbrush" | "marker" | "dashed" | undefined;
}

/**
 * Mouse Move event handler
 * @param shape Shape that was added to canvas.
 * @param coordsStart Coordinates of initial click on canvas.
 * @param isCircle Indicates if shape added is a circle.
 */
export function useMouseMove() {
  const value = useCallback((
    shape: fabric.Object | fabric.Rect | fabric.Ellipse,
    coordsStart: fabric.Point,
    specific?: string,
    canvas?: fabric.Canvas,
    brushType?: IBrushType,
  ): void => {
    const mouseMove = (e: fabric.IEvent): void => {
      if (!e.pointer || !canvas) return;

      canvas.selection = false;

      if (specific === 'filledCircle' || specific === 'circle') {
        setCircleSize(
          shape as fabric.Ellipse,
          coordsStart,
          e.pointer,
          brushType === 'pencil' || brushType === 'dashed'
        );
      } else if (
        specific === 'filledRectangle' ||
        specific === 'filledTriangle' ||
        specific === 'rectangle' ||
        specific === 'triangle'
      ) {
        setSize(
          shape,
          coordsStart,
          e.pointer,
          brushType === 'pencil' || brushType === 'dashed'
        );
      } else {
        setPathSize(shape, coordsStart, e.pointer);
      }

      let anchor = { ...coordsStart, originX: 'left', originY: 'top' };

      if (e.pointer && coordsStart.x > e.pointer.x) {
        anchor = { ...anchor, originX: 'right' };
      }

      if (e.pointer && coordsStart.y > e.pointer.y) {
        anchor = { ...anchor, originY: 'bottom' };
      }

      shape.set(anchor);
      canvas.renderAll();
    }

    canvas?.on('mouse:move', mouseMove);
  }, []);

  return value;
}

/**
 * Mouse up event handler
 * @param dispatch React dispatch method
 */
export function useMouseUp(dispatch: React.Dispatch<CanvasAction>) {
  const value = useCallback((
    shape: fabric.Object | fabric.Rect | fabric.Ellipse,
    coordsStart: fabric.Point,
    specific?: string,
    canvas?: fabric.Canvas,
    brushType?: IBrushType,
  ): void => {
    canvas?.on('mouse:up', (e: fabric.IEvent): void => {
      if (!e.pointer) return;

      let size;

      if (specific === 'filledCircle' || specific === 'circle') {
        size = setCircleSize(
          shape as fabric.Ellipse,
          coordsStart,
          e.pointer,
          brushType === 'pencil' || brushType === 'dashed'
        );
      } else if (
        specific === 'filledRectangle' ||
        specific === 'filledTriangle' ||
        specific === 'rectangle' ||
        specific === 'triangle'
      ) {
        size = setSize(
          shape,
          coordsStart,
          e.pointer,
          brushType === 'pencil' || brushType === 'dashed'
        );
      } else {
        size = setPathSize(shape, coordsStart, e.pointer);
      }

      if (size.width <= 2 && size.height <= 2) {
        canvas.remove(shape);
      } else {
        shape.setCoords();
        canvas.renderAll();

        dispatch({ type: 'CANVAS_SET', payload: canvas.getObjects() });
      }
    });
  }, [])

  return value;
}

export const useMouseDown = (
  canvas: fabric.Canvas,
  shapeSelector: (args: string) => fabric.Object | TypedShape,
  clearOnMouseEvent: () => void,
  mouseMove: (...args: Array<any>) => void,
  mouseUp: (...args: Array<any>) => void,
  brushType: string,
  shapeColor: string
) => (useCallback(
  (specific: string, color?: string): void => {
    canvas?.on('mouse:down', (e: fabric.IEvent): void => {
      if (e.target || !e.pointer) {
        return;
      }

      let shape;
      shape = shapeSelector(specific);

      if (e.pointer) {
        (shape as unknown as TypedShape).set({
          top: e.pointer.y,
          left: e.pointer.x,
          shapeType: 'shape',
          name: specific,
          strokeUniform: true,
        });
      }

      // fill and type properties just can be resetted if is an filled shape
      if (shape.fill !== 'transparent') {
        shape.set({
          shapeType: 'filledShape',
          fill: color || shapeColor,
        });
      }

      clearOnMouseEvent();
      // @ts-ignore
      mouseMove(shape, e.pointer, specific, canvas, brushType);
      // @ts-ignore
      mouseUp(shape, e.pointer, specific);
      canvas.add(shape);
    });
  },
  [canvas, clearOnMouseEvent, mouseMove, mouseUp, shapeColor, shapeSelector]
));
