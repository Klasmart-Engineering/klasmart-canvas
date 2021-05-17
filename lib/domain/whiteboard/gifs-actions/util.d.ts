import { fabric } from 'fabric';
/**
 * Function to create gif as object
 *
 * @param image Image to upload
 * @param userId User id
 * @param canvas Canvas instance
 */
export declare function createGif(image: string | File, userId: string, canvas: fabric.Canvas): Promise<void>;
/**
 * Function to create an image object
 *
 * @param image Image to upload
 * @param userId User id
 * @param canvas Canvas instance
 * @param laserIsActive Indicates if laser is active, if so, image will not be selectable
 */
export declare function createImageAsObject(image: string, userId: string, canvas: fabric.Canvas, laserIsActive: boolean): fabric.Image;
/**
 * Function to create a Background Image
 *
 * @param image Image to upload
 * @param userId User id
 * @param canvas Canvas instance
 */
export declare function createBackgroundImage(image: string, userId: string, canvas: fabric.Canvas): Promise<unknown>;
