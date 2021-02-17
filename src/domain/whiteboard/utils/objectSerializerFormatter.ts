import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { requiredEllipseProps, requiredPencilDashedProps, requiredProps } from '../canvas-actions/shapeProps';

export const objectSerializerFormatter = (shape: ICanvasObject, brushType: string, id?: string) => {
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
}
