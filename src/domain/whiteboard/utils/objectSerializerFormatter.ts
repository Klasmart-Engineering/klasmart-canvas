import { CANVAS_OBJECT_PROPS } from '../../../config/undo-redo-values';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { requiredEllipseProps, requiredPencilDashedProps, requiredProps } from '../canvas-actions/shapeProps';
import { ObjectEvent, ObjectType } from '../event-serializer/PaintEventSerializer';

/**
 * Customizes payload for shape or object.
 * @param shape Canvas shape or object
 * @param target Custom props to emit
 * @param type Shape type
 * @param id Object Id.
 */
const formatShape = (shape: ICanvasObject, target: { [key: string]: any }, type: string | undefined, id: string | undefined) => {
  requiredProps.forEach((prop: string) => {
    if (shape && (shape as any)[prop]) {
      target = { ...target, [prop]: (shape as any)[prop] };
    }
  });

  return {
    type,
    target,
    id,
  };
};

/**
 * Customizes payload for shape or object.
 * @param shape Canvas shape or object
 * @param target Custom props to emit
 * @param type Shape type
 * @param id Object Id.
 */
const formatEllipse = (shape: ICanvasObject, target: { [key: string]: any }, type: string | undefined, id: string | undefined) => {
  requiredEllipseProps.forEach((prop: string) => {
    if (shape && (shape as any)[prop]) {
      target = { ...target, [prop]: (shape as any)[prop] };
    }
  });

  return {
    type,
    target,
    id,
  };
}

/**
 * Customizes payload for shape or object.
 * @param shape Canvas shape or object
 * @param target Custom props to emit
 * @param type Shape type
 * @param id Object Id.
 */
const formatNonStandardBrush = (shape: ICanvasObject, target: { [key: string]: any }, type: string | undefined, id: string | undefined) => {
  requiredPencilDashedProps.forEach((prop: string) => {
    if (shape && (shape as any)[prop]) {
      target = { ...target, [prop]: (shape as any)[prop] };
    }
  });

  return {
    type,
    target,
    id,
  };
}

/**
 * Formats payload for a cloned object for real time features.
 * @param shape Shape or object that is being cloned
 * @param brushType Brush type used for object
 * @param id Object id.
 */
export const objectSerializerFormatter = (shape: ICanvasObject, brushType: string, id?: string, fromGroup?: boolean) => {
  const type: ObjectType = (shape.get('type') || 'path') as ObjectType;

  if (shape.shapeType === 'shape') {
    let type = shape.type;
    let target = {
      type,
      id: id ? id : shape.id,
    };
    if (brushType !== 'pencil' && brushType !== 'dashed') {
      return formatNonStandardBrush(shape, target, type, id);
    } else {
      if (type !== 'ellipse') {
        return formatShape(shape, target, type, id);
      } else {
        return formatEllipse(shape, target, type, id);
      }
    }
  } else {
    let target = shape;

    const payload: ObjectEvent = {
      type,
      target: {
        ...target.toJSON(CANVAS_OBJECT_PROPS),
        top: !fromGroup ? 0 : target.top,
        left: !fromGroup ? 0 : target.left,
        originX: 'left',
        originY: 'top',
      } as ICanvasObject,
      id: id ? id : shape.id as string,
    };

    return payload;
  }
}
