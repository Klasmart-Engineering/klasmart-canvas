import shape from "@material-ui/core/styles/shape";
import { ICanvasBrush } from "../../../interfaces/brushes/canvas-brush";
import { ICanvasObject } from "../../../interfaces/objects/canvas-object";
import { ChalkBrush } from "../brushes/classes/chalkBrush";
import { MarkerBrush } from "../brushes/classes/markerBrush";
import { PaintBrush } from "../brushes/classes/paintBrush";
import { PenBrush } from "../brushes/classes/penBrush";

export function setCustomBrush(brushType: string, userId: string, canvas: fabric.Canvas, lineWidth: number, points: any[]) {
  let brush: PenBrush | MarkerBrush | PaintBrush | ChalkBrush;
  let newPath;
  
  switch (brushType) {
    case 'pen':
      brush = new PenBrush(canvas, userId);
      const { min, max } = brush.setMinMaxWidth(lineWidth);
      const penPoints = points.map((point) => {
        return {
          x: point.x,
          y: point.y,
          width: (brush as PenBrush).getRandomInt(min, max),
        };
      });

      newPath = (brush as PenBrush).createPenPath(
        String((shape as ICanvasObject).id),
        penPoints,
        lineWidth,
        penColor
      );
      break;

    case 'marker':
    case 'felt':
      brush = new MarkerBrush(canvas, userId, brushType);

      newPath = (brush as MarkerBrush).createMarkerPath(
        String((shape as ICanvasObject).id),
        points,
        lineWidth,
        penColor
      );
      break;

    case 'paintbrush':
      brush = new PaintBrush(canvas, userId);

      const bristles = (brush as PaintBrush).makeBrush(
        penColor,
        lineWidth
      );

      newPath = (brush as PaintBrush).modifyPaintBrushPath(
        String((shape as ICanvasObject).id),
        points,
        lineWidth,
        penColor,
        bristles
      );
      break;

    case 'chalk':
    case 'crayon':
      brush = new ChalkBrush(canvas, userId, brushType);

      const clearRects = (brush as ChalkBrush).createChalkEffect(
        points,
        lineWidth
      );

      await (brush as ChalkBrush)
        .createChalkPath(
          String((shape as ICanvasObject).id),
          points,
          lineWidth,
          penColor,
          clearRects
        )
        .then((image: ICanvasBrush) => {
          newPath = image;
        })
        .catch((error: string) => {
          console.warn(error);
        });
      break;
  }
}