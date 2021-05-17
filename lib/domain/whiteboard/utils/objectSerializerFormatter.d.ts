import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
/**
 * Formats payload for a cloned object for real time features.
 * @param shape Shape or object that is being cloned
 * @param brushType Brush type used for object
 * @param id Object id.
 */
export declare const objectSerializerFormatter: (shape: ICanvasObject, brushType: string, id?: string | undefined, fromGroup?: boolean | undefined) => {
    type: string | undefined;
    target: {
        [key: string]: any;
    };
    id: string | undefined;
} | ObjectEvent;
