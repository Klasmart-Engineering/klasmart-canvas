import { IBrushType } from "../brushes/brush-type";

/**
 * Interface for specialShapeSelector used for selecting shape to draw on canvas.
 */
export interface ISpecialShapeSelectorPropsType {
  canvas: fabric.Canvas;
  shape: string;
  brushType: IBrushType;
  lineWidth: number;
  penColor: string;
};
