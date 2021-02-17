import { CANVAS_OBJECT_PROPS } from '../../../config/undo-redo-values';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { ICanvasPathBrush } from '../../../interfaces/brushes/canvas-path-brush';
import { ICanvasShapeBrush } from '../../../interfaces/brushes/canvas-shape-brush';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { requiredEllipseProps, requiredPencilDashedProps, requiredProps } from '../canvas-actions/shapeProps';
import { ObjectEvent, ObjectType } from '../event-serializer/PaintEventSerializer';
import { SET } from '../reducers/undo-redo';

export const objectSerializerFormatter = (shape: ICanvasObject, brushType: string, id?: string) => {
  const type: ObjectType = (shape.get('type') || 'path') as ObjectType;

  if (shape.shapeType === 'shape') {
    if (brushType !== 'pencil' && brushType !== 'dashed') {
      let type = shape.type;
      let payload = {};
      let target = {
        type,
        id: id ? id : shape.id,
      };

      const requiredProps = requiredPencilDashedProps;

      requiredProps.forEach((prop: string) => {
        if (shape && (shape as any)[prop]) {
          target = { ...target, [prop]: (shape as any)[prop] };
        }
      });

      payload = {
        type,
        target,
        id,
      };

      return payload;
    } else {
      let type = shape.type;
      let payload = {};
      let target = {
        type,
        id,
      };

      if (type !== 'ellipse') {
        requiredProps.forEach((prop: string) => {
          if (shape && (shape as any)[prop]) {
            target = { ...target, [prop]: (shape as any)[prop] };
          }
        });

        payload = {
          type,
          target,
          id,
        };

        return payload;
      } else {
        requiredEllipseProps.forEach((prop: string) => {
          if (shape && (shape as any)[prop]) {
            target = { ...target, [prop]: (shape as any)[prop] };
          }
        });

        payload = {
          type,
          target,
          id,
        };

        return payload;
      }
    }
  } else  {
      let target = shape;

      const payload: ObjectEvent = {
        type,
        target: {
          ...target.toJSON(CANVAS_OBJECT_PROPS),
          top: 0,
          left: 0,
        } as ICanvasObject,
        id: id ? id : shape.id as string,
      };

      return payload;
  }
}
