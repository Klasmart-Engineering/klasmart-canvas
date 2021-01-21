import { useCallback } from 'react';
import { shapePoints } from '../../../assets/shapes-points';
import { IBrushType } from '../../../interfaces/brushes/brush-type';
import { IShapePointsIndex } from '../../../interfaces/brushes/shape-points-index';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { ChalkBrush } from '../brushes/classes/chalkBrush';
import { MarkerBrush } from '../brushes/classes/markerBrush';
import { PaintBrush } from '../brushes/classes/paintBrush';
import { PenBrush } from '../brushes/classes/penBrush';
import * as shapes from '../shapes/shapes';

export const shapeSelector = (props: any, specific: keyof typeof shapes | string): TypedShape => {
  const { brushType, lineWidth, penColor, shape, shapeColor } = props;
  const value: keyof typeof shapes | string = (specific || shape as string) === 'chatBubble' ? 'chat' : specific || shape;

  switch (value) {
    case 'rectangle':
    case 'circle':
    case 'triangle':
    case 'star':
    case 'arrow':
    case 'chat':
      return shapes[value](
        2,
        2,
        penColor,
        false,
        lineWidth,
        brushType === 'dashed'
      );
    case 'pentagon':
    case 'hexagon':
      return shapes[value](
        penColor,
        false,
        lineWidth,
        brushType === 'dashed'
      );
    case 'filledRectangle':
    case 'filledCircle':
    case 'filledArrow':
    case 'filledStar':
    case 'filledChatBubble': {
      const key: 'rectangle' | 'circle' | 'arrow' | 'star' | 'chat'=
        value.replace('filled', '').toLowerCase() as 'rectangle' | 'circle' | 'arrow' | 'star' | 'chat';

      return shapes[key](
        2,
        2,
        shapeColor,
        true,
        0,
        brushType === 'dashed'
      );
    }
    case 'filledTriangle':
      return shapes.triangle(
        2,
        4,
        shapeColor,
        true,
        0,
        brushType === 'dashed'
      );
    case 'filledPentagon':
    case 'filledHexagon': {
      const key = value === 'filledPentagon' ? 'pentagon' : 'hexagon';
      return shapes[key](shapeColor, true, 0, brushType === 'dashed');
    }
    default:
      return shapes.circle(
        2,
        2,
        penColor,
        false,
        lineWidth,
        brushType === 'dashed'
      );
  }
};

export function useShapeSelector(props: any) {
  const { brushType, lineWidth, penColor, shape, shapeColor } = props;
  const value = useCallback(
    (specific: keyof typeof shapes | string): TypedShape => {

      const value: keyof typeof shapes | string = (specific || shape as string) === 'chatBubble' ? 'chat' : specific || shape;

      switch (value) {
        case 'rectangle':
        case 'circle':
        case 'triangle':
        case 'star':
        case 'arrow':
        case 'chat':
          return shapes[value](
            2,
            2,
            penColor,
            false,
            lineWidth,
            brushType === 'dashed'
          );
        case 'pentagon':
        case 'hexagon':
          return shapes[value](
            penColor,
            false,
            lineWidth,
            brushType === 'dashed'
          );
        case 'filledRectangle':
        case 'filledCircle':
        case 'filledArrow':
        case 'filledStar':
        case 'filledChatBubble': {
          const key: 'rectangle' | 'circle' | 'arrow' | 'star' | 'chat'=
            value.replace('filled', '').toLowerCase() as 'rectangle' | 'circle' | 'arrow' | 'star' | 'chat';

          return shapes[key](
            2,
            2,
            shapeColor,
            true,
            0,
            brushType === 'dashed'
          );
        }
        case 'filledTriangle':
          return shapes.triangle(
            2,
            4,
            shapeColor,
            true,
            0,
            brushType === 'dashed'
          );
        case 'filledPentagon':
        case 'filledHexagon': {
          const key = value === 'filledPentagon' ? 'pentagon' : 'hexagon';
          return shapes[key](shapeColor, true, 0, brushType === 'dashed');
        }
        default:
          return shapes.circle(
            2,
            2,
            penColor,
            false,
            lineWidth,
            brushType === 'dashed'
          );
      }
    },
    [
      brushType, lineWidth, penColor, shape, shapeColor
    ]
  );

  return value;
}

export function useSpecialShapeSelector(userId: string) {
  const value = useCallback(async (useProps: any) => {
    const { canvas, shape, brushType, lineWidth, penColor } = useProps;
    const original = shapePoints[shape as keyof IShapePointsIndex];
    let brush: PenBrush | MarkerBrush | PaintBrush | ChalkBrush;
    let newShape;

    if (!canvas) {
      return;
    }

    switch (brushType) {
      case 'pen':
        brush = new PenBrush(canvas, userId);

        const { min, max } = brush.setMinMaxWidth(lineWidth);
        const penPoints = original.points.map((point) => {
          return {
            x: point.x,
            y: point.y,
            width: (brush as PenBrush).getRandomInt(min, max),
          };
        });

        newShape = brush.createPenPath(
          'provisional',
          penPoints,
          lineWidth,
          penColor
        );
        break;

      case 'marker':
      case 'felt':
        brush = new MarkerBrush(canvas, userId, brushType);
        newShape = brush.createMarkerPath(
          'provisional',
          original.points,
          lineWidth,
          penColor
        );
        break;

      case 'paintbrush':
        brush = new PaintBrush(canvas, userId);
        const bristles = brush.makeBrush(penColor, lineWidth);
        newShape = brush.modifyPaintBrushPath(
          'provisional',
          original.points,
          lineWidth,
          penColor,
          bristles
        );
        break;

      case 'chalk':
      case 'crayon':
        brush = new ChalkBrush(canvas, userId, brushType);
        const clearRects = brush.createChalkEffect(
          original.points,
          lineWidth
        );

        try {
          newShape = await brush.createChalkPath(
              'provisional',
              original.points,
              lineWidth,
              penColor,
              clearRects
            );
          break;
        } catch(e) {
          return;
        }
      }

    if (!newShape) return;

    const scaleX = Number(newShape.width) / 2;
    const scaleY = Number(newShape.width) / 2;

    newShape.set({
      scaleX: 1 / scaleX,
      scaleY: 1 / scaleY,
    });

    return newShape;
  }, []);

  return value;
}
  